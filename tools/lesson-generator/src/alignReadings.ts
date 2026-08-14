import fs from "node:fs/promises";
import path from "node:path";
import { loadLocalEnv, projectRoot, requireElevenLabsApiKey } from "./config";
import { textToSpeechWithTimestampsMp3, type CharacterAlignment } from "./elevenLabsClient";
import { ensureDir, pathExists } from "./utils";
import { readingComprehensions } from "../../../src/data";
import type { ReadingComprehension } from "../../../src/types";

type TimedWord = {
  text: string;
  start: number;
  end: number;
  loss?: number;
};

type AlignmentResponse = {
  characters?: Array<{ text?: string; start?: number; end?: number } | string>;
  words?: Array<{ text?: string; word?: string; start?: number; end?: number; loss?: number }>;
  loss?: number;
};

type CliOptions = {
  all: boolean;
  dryRun: boolean;
  force: boolean;
  ids: Set<string>;
  max?: number;
  regenerateWithTimestamps: boolean;
};

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    all: false,
    dryRun: false,
    force: false,
    ids: new Set(),
    regenerateWithTimestamps: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--all") {
      options.all = true;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--regenerate-with-timestamps") {
      options.regenerateWithTimestamps = true;
      continue;
    }

    if (arg === "--max") {
      const next = args[index + 1];
      const parsed = Number(next);
      if (!Number.isInteger(parsed) || parsed < 1) {
        throw new Error("--max requires a positive integer.");
      }
      options.max = parsed;
      index += 1;
      continue;
    }

    if (arg === "--id") {
      const next = args[index + 1];
      if (!next) throw new Error("--id requires a reading id.");
      options.ids.add(next);
      index += 1;
      continue;
    }

    if (arg.startsWith("--id=")) {
      options.ids.add(arg.slice("--id=".length));
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.all && options.ids.size === 0) {
    throw new Error("Pass --all or one or more --id <reading-id> values.");
  }

  return options;
}

function printHelp(): void {
  console.log(`Usage:
  npm run align:readings -- --all --dry-run
  npm run align:readings -- --all
  npm run align:readings -- --id colombian-spanish-b2-example-reading

Options:
  --all       Check every reading with audioUrl + audioAlignmentUrl.
  --id        Align one reading id. Can be repeated.
  --dry-run   Show what would be aligned without calling ElevenLabs.
  --force     Replace timing files even if they do not look evenly estimated.
  --regenerate-with-timestamps
              If forced alignment is not permitted, regenerate reading audio
              through ElevenLabs TTS-with-timestamps and replace both files.
  --max N     Align at most N readings in this run.
`);
}

function publicPathFromUrl(url: string): string {
  return path.join(projectRoot, "public", url.replace(/^\//, ""));
}

async function readExistingTimings(filePath: string): Promise<TimedWord[] | null> {
  if (!(await pathExists(filePath))) return null;

  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as TimedWord[] | { words?: TimedWord[] };
  const words = Array.isArray(parsed) ? parsed : parsed.words ?? [];

  return words
    .map((word) => ({
      text: String((word as TimedWord).text ?? (word as unknown as { word?: string }).word ?? ""),
      start: Number(word.start),
      end: Number(word.end),
    }))
    .filter((word) => word.text && Number.isFinite(word.start) && Number.isFinite(word.end));
}

function isLikelyEvenlyEstimated(words: TimedWord[]): boolean {
  if (words.length < 30) return false;

  const durations = words.map((word) => word.end - word.start).filter((duration) => Number.isFinite(duration) && duration > 0);
  if (durations.length !== words.length) return true;

  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);
  const maxGap = Math.max(...words.slice(1).map((word, index) => Math.abs(word.start - words[index].end)));

  return maxDuration - minDuration < 0.01 && maxGap < 0.01;
}

function wordsFromCharacters(characters: NonNullable<AlignmentResponse["characters"]>): TimedWord[] {
  const words: TimedWord[] = [];
  let text = "";
  let start: number | undefined;
  let end: number | undefined;

  function flush(): void {
    if (!text || start === undefined || end === undefined) {
      text = "";
      start = undefined;
      end = undefined;
      return;
    }

    words.push({
      text,
      start: Number(start.toFixed(3)),
      end: Number(end.toFixed(3)),
    });
    text = "";
    start = undefined;
    end = undefined;
  }

  for (const character of characters) {
    const charText = typeof character === "string" ? character : character.text ?? "";
    const charStart = typeof character === "string" ? Number.NaN : Number(character.start);
    const charEnd = typeof character === "string" ? Number.NaN : Number(character.end);

    if (!charText || /\s/.test(charText)) {
      flush();
      continue;
    }

    text += charText;
    if (Number.isFinite(charStart)) start = start === undefined ? charStart : Math.min(start, charStart);
    if (Number.isFinite(charEnd)) end = end === undefined ? charEnd : Math.max(end, charEnd);
  }

  flush();
  return words;
}

function wordsFromResponse(response: AlignmentResponse): TimedWord[] {
  if (response.characters?.length) {
    const characterWords = wordsFromCharacters(response.characters);
    if (characterWords.length) return characterWords;
  }

  return (response.words ?? [])
    .map((word) => ({
      text: word.text ?? word.word ?? "",
      start: Number(word.start),
      end: Number(word.end),
      loss: word.loss,
    }))
    .filter((word) => word.text && Number.isFinite(word.start) && Number.isFinite(word.end))
    .map((word) => ({
      ...word,
      start: Number(word.start.toFixed(3)),
      end: Number(word.end.toFixed(3)),
    }));
}

function wordsFromCharacterAlignment(alignment?: CharacterAlignment): TimedWord[] {
  const characters = alignment?.characters ?? alignment?.chars ?? [];
  const secondStarts = alignment?.character_start_times_seconds;
  const secondEnds = alignment?.character_end_times_seconds;
  const millisecondStarts = alignment?.char_start_times_ms;
  const millisecondEnds = alignment?.char_end_times_ms;

  if (!characters.length) return [];

  return wordsFromCharacters(
    characters.map((text, index) => ({
      text,
      start: secondStarts?.[index] ?? (millisecondStarts?.[index] !== undefined ? millisecondStarts[index] / 1000 : undefined),
      end: secondEnds?.[index] ?? (millisecondEnds?.[index] !== undefined ? millisecondEnds[index] / 1000 : undefined),
    })),
  );
}

function isMissingForcedAlignmentPermission(error: unknown): boolean {
  return error instanceof Error && error.message.includes("forced_alignment");
}

function inferReadingVoiceEnv(reading: ReadingComprehension): string {
  const id = reading.id.toLowerCase();

  if (id.includes("argentinian-spanish")) return "ELEVENLABS_ARGENTINIAN_SPANISH_FEMALE_VOICE_ID";
  if (id.includes("colombian-spanish")) return "ELEVENLABS_COLOMBIAN_SPANISH_FEMALE_VOICE_ID";
  if (id.includes("dominican-spanish")) return "ELEVENLABS_DOMINICAN_SPANISH_FEMALE_VOICE_ID";
  if (id.includes("peruvian-spanish")) return "ELEVENLABS_PERUVIAN_SPANISH_FEMALE_VOICE_ID";
  if (id.includes("mexican-spanish")) return "ELEVENLABS_MEXICAN_SPANISH_FEMALE_VOICE_ID";
  if (id.includes("american-english")) return "ELEVENLABS_AMERICAN_ENGLISH_FEMALE_VOICE_ID";
  if (reading.languageTarget === "english") return "ELEVENLABS_ENGLISH_FEMALE_VOICE_ID";

  return "ELEVENLABS_SPANISH_NARRATOR_VOICE_ID";
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Required to regenerate timestamped reading audio.`);
  return value;
}

async function regenerateAudioWithTimestamps(reading: ReadingComprehension, audioPath: string, text: string): Promise<TimedWord[]> {
  const voiceEnv = inferReadingVoiceEnv(reading);
  const voiceId = requireEnv(voiceEnv);
  const response = await textToSpeechWithTimestampsMp3({
    text,
    voiceId,
    voiceSettings: {
      stability: 0.5,
      similarityBoost: 0.82,
      style: 0.25,
      useSpeakerBoost: true,
    },
  });
  const words = wordsFromCharacterAlignment(response.alignment);
  const fallbackWords = words.length ? words : wordsFromCharacterAlignment(response.normalizedAlignment);

  if (!fallbackWords.length) {
    throw new Error(`Timestamped TTS for ${reading.id} did not return usable character alignment.`);
  }

  await ensureDir(path.dirname(audioPath));
  await fs.writeFile(audioPath, Buffer.from(response.audioBase64, "base64"));
  console.log(`[wrote] ${path.relative(projectRoot, audioPath)} (${voiceEnv})`);

  return fallbackWords;
}

async function alignAudioToText(audioPath: string, text: string): Promise<AlignmentResponse> {
  const apiKey = requireElevenLabsApiKey();
  const audio = await fs.readFile(audioPath);
  const formData = new FormData();
  formData.append("file", new Blob([audio], { type: "audio/mpeg" }), path.basename(audioPath));
  formData.append("text", text);

  const response = await fetch("https://api.elevenlabs.io/v1/forced-alignment", {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    if (response.status === 401 && body.includes("forced_alignment")) {
      throw new Error(
        `ElevenLabs forced alignment is not enabled for this API key.\n` +
          `Enable the forced_alignment permission on the ElevenLabs API key, then rerun:\n` +
          `npm run align:readings -- --all\n\n${body}`,
      );
    }
    throw new Error(`ElevenLabs forced alignment failed for ${path.basename(audioPath)}: ${response.status} ${response.statusText}\n${body}`);
  }

  return (await response.json()) as AlignmentResponse;
}

async function main(): Promise<void> {
  loadLocalEnv();
  const options = parseArgs(process.argv.slice(2));
  let alignedCount = 0;
  let checkedCount = 0;
  let forcedAlignmentUnavailable = false;

  for (const reading of readingComprehensions) {
    if (!reading.data.audioUrl || !reading.data.audioAlignmentUrl) continue;
    if (!options.all && !options.ids.has(reading.id)) continue;

    checkedCount += 1;

    const audioPath = publicPathFromUrl(reading.data.audioUrl);
    const alignmentPath = publicPathFromUrl(reading.data.audioAlignmentUrl);
    const text = reading.data.paragraphs.map((paragraph) => paragraph.text).join("\n\n");

    if (!(await pathExists(audioPath))) {
      console.warn(`[skip] ${reading.id}: missing audio ${path.relative(projectRoot, audioPath)}`);
      continue;
    }

    const existing = await readExistingTimings(alignmentPath);
    const needsAlignment = options.force || !existing || isLikelyEvenlyEstimated(existing);

    if (!needsAlignment) {
      console.log(`[skip] ${reading.id}: timing file does not look evenly estimated`);
      continue;
    }

    console.log(`${options.dryRun ? "[would align]" : "[align]"} ${reading.id}`);

    if (options.dryRun) {
      alignedCount += 1;
    } else {
      let words: TimedWord[];
      let responseLoss: number | string | undefined;

      if (forcedAlignmentUnavailable && options.regenerateWithTimestamps) {
        words = await regenerateAudioWithTimestamps(reading, audioPath, text);
        responseLoss = "n/a";
      } else {
        try {
          const response = await alignAudioToText(audioPath, text);
          words = wordsFromResponse(response);
          responseLoss = response.loss ?? "n/a";
        } catch (error) {
          if (!options.regenerateWithTimestamps || !isMissingForcedAlignmentPermission(error)) {
            throw error;
          }

          forcedAlignmentUnavailable = true;
          console.warn(`[fallback] ${reading.id}: forced alignment permission missing, regenerating with timestamped TTS`);
          words = await regenerateAudioWithTimestamps(reading, audioPath, text);
          responseLoss = "n/a";
        }
      }

      if (words.length < 10) {
        throw new Error(`Alignment for ${reading.id} returned too few timed words (${words.length}).`);
      }

      await ensureDir(path.dirname(alignmentPath));
      await fs.writeFile(alignmentPath, JSON.stringify(words, null, 2));
      console.log(`[wrote] ${path.relative(projectRoot, alignmentPath)} (${words.length} tokens, loss ${responseLoss})`);
      alignedCount += 1;
    }

    if (options.max && alignedCount >= options.max) break;
  }

  if (options.ids.size > 0) {
    for (const id of options.ids) {
      if (!readingComprehensions.some((reading) => reading.id === id)) {
        console.warn(`[missing] no reading found with id ${id}`);
      }
    }
  }

  console.log(`${options.dryRun ? "Would align" : "Aligned"} ${alignedCount} of ${checkedCount} checked readings.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
