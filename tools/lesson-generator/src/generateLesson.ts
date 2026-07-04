import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { outputRoot, loadLocalEnv } from "./config";
import {
  assertFfmpegAvailable,
  concatenateWavFiles,
  convertAudioToWav,
  createSilenceWav,
  encodeWavToMp3,
  getAudioDurationMs,
} from "./audioUtils";
import { buildEstimatedAudioClips, generateAudioClips } from "./generateAudio";
import { buildTimeline } from "./buildTimeline";
import { writeMetadata } from "./generateMetadata";
import { writeSubtitles } from "./generateSubtitles";
import { writeTranscript } from "./generateTranscript";
import { renderLessonVideo } from "./renderVideo";
import type { GeneratedAudioClip, GeneratorCallbacks, GeneratorOptions, LessonTimeline } from "./types";
import { validateLessonScript, type LessonScript } from "./validateScript";
import { ensureDir, formatDuration } from "./utils";

const defaultGeneratorOptions: GeneratorOptions = {
  dryRun: false,
  audioOnly: false,
  videoOnly: false,
  skipTts: false,
  forceTts: false,
};

export type GenerateLessonResult = {
  script: LessonScript;
  timeline: LessonTimeline;
  outputDirectory: string;
  files: {
    finalAudioPath: string;
    finalVideoPath: string;
    timelinePath: string;
    subtitlesPath: string;
    transcriptPath: string;
    metadataPath: string;
  };
};

function parseArgs(argv: string[]): { scriptPath?: string; options: GeneratorOptions } {
  const options: GeneratorOptions = {
    ...defaultGeneratorOptions,
  };

  const paths: string[] = [];

  for (const arg of argv) {
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--audio-only") {
      options.audioOnly = true;
    } else if (arg === "--video-only") {
      options.videoOnly = true;
    } else if (arg === "--skip-tts") {
      options.skipTts = true;
    } else if (arg === "--force-tts") {
      options.forceTts = true;
    } else {
      paths.push(arg);
    }
  }

  return { scriptPath: paths[0], options };
}

export async function readScript(scriptPath: string): Promise<LessonScript> {
  let raw: string;

  try {
    raw = await fs.readFile(scriptPath, "utf8");
  } catch (error) {
    throw new Error(`Could not read lesson script at ${scriptPath}.\n${(error as Error).message}`);
  }

  try {
    return validateLessonScript(JSON.parse(raw));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${scriptPath}: ${error.message}`);
    }

    throw error;
  }
}

async function writeTimeline(timeline: LessonTimeline, outputPath: string): Promise<void> {
  await fs.writeFile(outputPath, JSON.stringify(timeline, null, 2), "utf8");
}

async function assembleFinalAudio(
  timeline: LessonTimeline,
  outputDirectory: string,
  callbacks: GeneratorCallbacks = {},
): Promise<string> {
  const tempDirectory = path.join(outputDirectory, ".tmp-audio");
  await ensureDir(tempDirectory);

  const inputFiles: string[] = [];
  const totalSteps = timeline.segments.length * 2 + 2;
  let step = 0;

  for (const [index, segment] of timeline.segments.entries()) {
    const spokenWavPath = path.join(tempDirectory, `${segment.id}-spoken.wav`);
    step += 1;
    callbacks.onProgress?.({
      stage: "audio",
      message: `Normalizing spoken clip ${index + 1}/${timeline.segments.length}`,
      percent: 48 + (step / totalSteps) * 6,
      current: index + 1,
      total: timeline.segments.length,
      raw: `[audio-normalize] ${segment.id}: ${segment.audioFilePath}`,
    });
    await convertAudioToWav(segment.audioFilePath, spokenWavPath);
    inputFiles.push(spokenWavPath);

    const pauseDurationMs = segment.pauseEndMs - segment.pauseStartMs;

    if (pauseDurationMs > 0) {
      const silencePath = path.join(tempDirectory, `${segment.id}-silence-${pauseDurationMs}.wav`);
      step += 1;
      callbacks.onProgress?.({
        stage: "audio",
        message: `Creating exact silence ${index + 1}/${timeline.segments.length}`,
        percent: 48 + (step / totalSteps) * 6,
        current: index + 1,
        total: timeline.segments.length,
        raw: `[audio-silence] ${segment.id}: ${pauseDurationMs}ms`,
      });
      await createSilenceWav(pauseDurationMs, silencePath);
      inputFiles.push(silencePath);
    }
  }

  const finalWavPath = path.join(tempDirectory, "final-audio.wav");
  const finalAudioPath = path.join(outputDirectory, "final-audio.mp3");
  callbacks.onProgress?.({
    stage: "audio",
    message: "Concatenating WAV audio on exact PCM sample boundaries",
    percent: 55,
    raw: `[audio-concat] ${inputFiles.length} WAV chunks`,
  });
  await concatenateWavFiles(inputFiles, finalWavPath);
  callbacks.onProgress?.({
    stage: "audio",
    message: "Encoding final MP3 from drift-safe WAV master",
    percent: 57,
    raw: `[audio-encode] ${finalWavPath} -> ${finalAudioPath}`,
  });
  await encodeWavToMp3(finalWavPath, finalAudioPath);

  const expectedDurationMs = timeline.totalDurationMs;
  const actualDurationMs = await getAudioDurationMs(finalAudioPath);
  const driftMs = actualDurationMs - expectedDurationMs;
  callbacks.onProgress?.({
    stage: "audio",
    message: `Final audio duration check: drift ${driftMs}ms`,
    percent: 58,
    raw: `[audio-duration] expected=${expectedDurationMs}ms actual=${actualDurationMs}ms drift=${driftMs}ms`,
  });

  await fs.rm(tempDirectory, { recursive: true, force: true });

  return finalAudioPath;
}

export function printDryRun(script: LessonScript, timeline: LessonTimeline): void {
  console.log(`Dry run OK: ${script.title}`);
  console.log(`Segments: ${script.segments.length}`);
  console.log(`Approx duration: ${formatDuration(timeline.totalDurationMs)}`);

  for (const segment of timeline.segments) {
    const timer =
      segment.timerStartMs === null || segment.timerEndMs === null
        ? ""
        : ` timer ${formatDuration(segment.timerEndMs - segment.timerStartMs)}`;
    console.log(
      `${segment.id.padStart(3, "0")} ${segment.type.padEnd(15)} ${segment.role.padEnd(14)} ${formatDuration(
        segment.segmentEndMs - segment.segmentStartMs,
      )}${timer} - ${segment.subtitle}`,
    );
  }
}

export function warnAboutDuration(script: LessonScript, timeline: LessonTimeline): void {
  const targetMinutes = script.durationGoalMinutes;

  if (!targetMinutes) {
    return;
  }

  const generatedMinutes = timeline.totalDurationMs / 60_000;
  const difference = Math.abs(generatedMinutes - targetMinutes);

  if (difference >= Math.max(2, targetMinutes * 0.15)) {
    console.warn(
      `Warning: target duration was ${targetMinutes} minutes, generated duration is ${formatDuration(
        timeline.totalDurationMs,
      )}.`,
    );
  }
}

export async function generateLessonFromScriptPath(
  scriptPath: string,
  options: Partial<GeneratorOptions> = {},
  callbacks: GeneratorCallbacks = {},
): Promise<GenerateLessonResult> {
  loadLocalEnv();

  const absoluteScriptPath = path.resolve(scriptPath);
  const script = await readScript(absoluteScriptPath);
  return generateLessonFromScript(script, options, callbacks);
}

export async function generateLessonFromScript(
  script: LessonScript,
  optionsInput: Partial<GeneratorOptions> = {},
  callbacks: GeneratorCallbacks = {},
): Promise<GenerateLessonResult> {
  const options: GeneratorOptions = {
    ...defaultGeneratorOptions,
    ...optionsInput,
  };
  const outputDirectory = path.join(outputRoot, script.outputSlug);
  const timelinePath = path.join(outputDirectory, "timeline.json");
  const subtitlesPath = path.join(outputDirectory, "subtitles.srt");
  const transcriptPath = path.join(outputDirectory, "transcript.md");
  const metadataPath = path.join(outputDirectory, "metadata.json");
  const finalAudioPath = path.join(outputDirectory, "final-audio.mp3");
  const finalVideoPath = path.join(outputDirectory, "final-video.mp4");

  if (options.dryRun) {
    callbacks.onProgress?.({ stage: "dry-run", message: "Validating script and estimating timeline", percent: 20 });
    const timeline = buildTimeline(script, buildEstimatedAudioClips(script));
    printDryRun(script, timeline);
    warnAboutDuration(script, timeline);
    callbacks.onProgress?.({ stage: "dry-run", message: "Dry run complete", percent: 100 });
    return {
      script,
      timeline,
      outputDirectory,
      files: {
        finalAudioPath,
        finalVideoPath,
        timelinePath,
        subtitlesPath,
        transcriptPath,
        metadataPath,
      },
    };
  }

  await ensureDir(outputDirectory);
  callbacks.onProgress?.({ stage: "setup", message: "Checking FFmpeg and output folders", percent: 3 });
  await assertFfmpegAvailable();

  if (options.videoOnly) {
    callbacks.onProgress?.({ stage: "video", message: "Loading existing timeline for video-only render", percent: 55 });
    const timeline = JSON.parse(await fs.readFile(timelinePath, "utf8")) as LessonTimeline;
    await renderLessonVideo(timeline, finalAudioPath, finalVideoPath, callbacks);
    console.log(`Video written to ${finalVideoPath}`);
    callbacks.onProgress?.({ stage: "done", message: `Video written to ${finalVideoPath}`, percent: 100 });
    return {
      script,
      timeline,
      outputDirectory,
      files: {
        finalAudioPath,
        finalVideoPath,
        timelinePath,
        subtitlesPath,
        transcriptPath,
        metadataPath,
      },
    };
  }

  const clips: GeneratedAudioClip[] = await generateAudioClips(script, options, callbacks);
  callbacks.onProgress?.({ stage: "timeline", message: "Building synced timeline", percent: 45 });
  const timeline = buildTimeline(script, clips);
  callbacks.onProgress?.({ stage: "audio", message: "Assembling final MP3 with exact pauses", percent: 48 });
  const assembledAudioPath = await assembleFinalAudio(timeline, outputDirectory, callbacks);

  callbacks.onProgress?.({ stage: "files", message: "Writing timeline, subtitles, transcript, and metadata", percent: 54 });
  await writeTimeline(timeline, timelinePath);
  await writeSubtitles(timeline, subtitlesPath);
  await writeTranscript(timeline, transcriptPath);
  await writeMetadata(script, timeline, clips, metadataPath);

  warnAboutDuration(script, timeline);
  console.log(`Audio written to ${assembledAudioPath}`);
  callbacks.onProgress?.({ stage: "audio", message: `Audio written to ${assembledAudioPath}`, percent: 58 });

  if (!options.audioOnly) {
    await renderLessonVideo(timeline, assembledAudioPath, finalVideoPath, callbacks);
    console.log(`Video written to ${finalVideoPath}`);
  }

  callbacks.onProgress?.({
    stage: "done",
    message: options.audioOnly ? "Audio package complete" : "MP4 and audio package complete",
    percent: 100,
  });

  return {
    script,
    timeline,
    outputDirectory,
    files: {
      finalAudioPath: assembledAudioPath,
      finalVideoPath,
      timelinePath,
      subtitlesPath,
      transcriptPath,
      metadataPath,
    },
  };
}

async function runCli(): Promise<void> {
  const { scriptPath, options } = parseArgs(process.argv.slice(2));

  if (!scriptPath) {
    throw new Error(
      "Usage: npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json",
    );
  }

  await generateLessonFromScriptPath(scriptPath, options);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  runCli().catch((error) => {
    console.error((error as Error).message);
    process.exitCode = 1;
  });
}
