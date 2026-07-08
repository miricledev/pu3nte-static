import fs from "node:fs/promises";
import path from "node:path";
import { audioCacheRoot, getElevenLabsModelId } from "./config";
import { textToSpeechMp3 } from "./elevenLabsClient";
import { adjustAudioSpeedMp3, createLocalTtsMp3, getDecodedAudioDurationMs } from "./audioUtils";
import type { GeneratedAudioClip, GeneratorCallbacks, GeneratorOptions, VoiceSettings } from "./types";
import type { LessonScript, LessonSegment } from "./validateScript";
import { ensureDir, pathExists, resolveMaybeEnv, sha256Short } from "./utils";

function getSegmentVoiceSettings(script: LessonScript, segment: LessonSegment): VoiceSettings | undefined {
  return {
    ...script.voiceSettings,
    ...segment.voiceSettings,
    stability: segment.stability ?? segment.voiceSettings?.stability ?? script.voiceSettings?.stability,
    similarityBoost:
      segment.similarityBoost ?? segment.voiceSettings?.similarityBoost ?? script.voiceSettings?.similarityBoost,
    style: segment.style ?? segment.voiceSettings?.style ?? script.voiceSettings?.style,
    useSpeakerBoost:
      segment.useSpeakerBoost ?? segment.voiceSettings?.useSpeakerBoost ?? script.voiceSettings?.useSpeakerBoost,
  };
}

export function resolveVoiceId(script: LessonScript, segment: LessonSegment): string {
  const voiceReference = segment.voiceId ?? script.voices[segment.role];

  if (!voiceReference) {
    throw new Error(`Missing voice mapping for segment ${segment.id} role "${segment.role}".`);
  }

  if (voiceReference.startsWith("local:")) {
    return voiceReference;
  }

  return resolveMaybeEnv(voiceReference, `segment ${segment.id}`);
}

function isLocalTtsVoice(voiceId: string): boolean {
  return voiceId.startsWith("local:");
}

function getSegmentSpeed(segment: LessonSegment): number {
  return segment.speed ?? 1;
}

function getLocalTtsLanguage(voiceId: string, script: LessonScript): string {
  const localLanguage = voiceId.slice("local:".length);

  if (localLanguage === "native") {
    return script.learnerNativeLanguage;
  }

  return localLanguage;
}

export function getAudioCachePath(script: LessonScript, segment: LessonSegment): string {
  const voiceId = resolveVoiceId(script, segment);
  const modelId = isLocalTtsVoice(voiceId) ? "local-system-tts" : getElevenLabsModelId();
  const voiceSettings = getSegmentVoiceSettings(script, segment);
  const speed = getSegmentSpeed(segment);
  const hash = sha256Short(JSON.stringify({ text: segment.text, voiceId, modelId, voiceSettings, speed }));

  return path.join(audioCacheRoot, script.id, `${segment.id}-${hash}.mp3`);
}

export function estimateSpokenDurationMs(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(900, Math.round((words / 145) * 60_000));
}

export async function generateAudioClips(
  script: LessonScript,
  options: Pick<GeneratorOptions, "forceTts" | "skipTts">,
  callbacks: GeneratorCallbacks = {},
): Promise<GeneratedAudioClip[]> {
  const clips: GeneratedAudioClip[] = [];
  const total = script.segments.length;

  callbacks.onProgress?.({
    stage: "tts",
    message: `Checking ${total} audio clips`,
    percent: 8,
    current: 0,
    total,
  });

  for (const [index, segment] of script.segments.entries()) {
    const voiceId = resolveVoiceId(script, segment);
    const cachePath = getAudioCachePath(script, segment);
    const exists = await pathExists(cachePath);
    const current = index + 1;

    if (options.skipTts && !exists) {
      throw new Error(`Missing cached audio for segment ${segment.id}. Expected ${cachePath}`);
    }

    if (!exists || options.forceTts) {
      const speed = getSegmentSpeed(segment);
      const shouldAdjustSpeed = Math.abs(speed - 1) >= 0.001;
      const speechOutputPath = shouldAdjustSpeed ? cachePath.replace(/\.mp3$/i, ".source.mp3") : cachePath;

      if (isLocalTtsVoice(voiceId)) {
        callbacks.onProgress?.({
          stage: "tts",
          message: `Generating local narrator clip ${current}/${total} (${segment.id})`,
          percent: 8 + (current / total) * 34,
          current,
          total,
          raw: `[local-tts] ${segment.id} ${segment.role}: ${segment.text}`,
        });
        await createLocalTtsMp3(segment.text, getLocalTtsLanguage(voiceId, script), speechOutputPath);
      } else {
        callbacks.onProgress?.({
          stage: "tts",
          message: `Calling ElevenLabs for clip ${current}/${total} (${segment.id})`,
          percent: 8 + (current / total) * 34,
          current,
          total,
          raw: `[elevenlabs] ${segment.id} ${segment.role}: ${segment.text}`,
        });
        const voiceSettings = getSegmentVoiceSettings(script, segment);
        const audio = await textToSpeechMp3({
          text: segment.text,
          voiceId,
          voiceSettings,
        });

        await ensureDir(path.dirname(cachePath));
        await fs.writeFile(speechOutputPath, Buffer.from(audio));
      }

      if (shouldAdjustSpeed) {
        callbacks.onProgress?.({
          stage: "tts",
          message: `Adjusting clip speed to ${speed}x (${segment.id})`,
          percent: 8 + (current / total) * 34,
          current,
          total,
          raw: `[audio-speed] ${segment.id}: ${speed}x`,
        });
        try {
          await adjustAudioSpeedMp3(speechOutputPath, cachePath, speed);
        } finally {
          await fs.rm(speechOutputPath, { force: true });
        }
      }
    } else {
      callbacks.onProgress?.({
        stage: "tts",
        message: `Using cached clip ${current}/${total} (${segment.id})`,
        percent: 8 + (current / total) * 34,
        current,
        total,
        raw: `[cache-hit] ${segment.id}: ${cachePath}`,
      });
    }

    clips.push({
      segmentId: segment.id,
      voiceId,
      filePath: cachePath,
      durationMs: await getDecodedAudioDurationMs(cachePath),
      cacheHit: exists && !options.forceTts,
    });
  }

  callbacks.onProgress?.({
    stage: "tts",
    message: "Audio clips ready",
    percent: 42,
    current: total,
    total,
  });

  return clips;
}

export function buildEstimatedAudioClips(script: LessonScript): GeneratedAudioClip[] {
  return script.segments.map((segment) => ({
    segmentId: segment.id,
    voiceId: segment.voiceId ?? script.voices[segment.role] ?? segment.role,
    filePath: "",
    durationMs: Math.round(estimateSpokenDurationMs(segment.text) / getSegmentSpeed(segment)),
    cacheHit: false,
  }));
}
