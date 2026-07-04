import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { ensureDir, runCommand } from "./utils";

export async function assertFfmpegAvailable(): Promise<void> {
  try {
    await runCommand("ffmpeg", ["-version"]);
    await runCommand("ffprobe", ["-version"]);
  } catch (error) {
    throw new Error(
      `FFmpeg and ffprobe are required for audio assembly and duration probing.\n${(error as Error).message}`,
    );
  }
}

export async function getAudioDurationMs(filePath: string): Promise<number> {
  const output = await runCommand("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
    filePath,
  ]);

  const seconds = Number.parseFloat(output);

  if (!Number.isFinite(seconds)) {
    throw new Error(`Could not determine audio duration for ${filePath}.`);
  }

  return Math.round(seconds * 1000);
}

export async function createSilenceMp3(durationMs: number, outputPath: string): Promise<void> {
  await ensureDir(path.dirname(outputPath));

  if (durationMs <= 0) {
    return;
  }

  await runCommand("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-t",
    (durationMs / 1000).toFixed(3),
    "-q:a",
    "9",
    "-acodec",
    "libmp3lame",
    outputPath,
  ]);
}

export async function createSilenceWav(durationMs: number, outputPath: string): Promise<void> {
  await ensureDir(path.dirname(outputPath));

  if (durationMs <= 0) {
    return;
  }

  await runCommand("ffmpeg", [
    "-y",
    "-f",
    "lavfi",
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=44100",
    "-t",
    (durationMs / 1000).toFixed(3),
    "-ar",
    "44100",
    "-ac",
    "2",
    "-c:a",
    "pcm_s16le",
    outputPath,
  ]);
}

export async function convertAudioToWav(inputPath: string, outputPath: string): Promise<void> {
  await ensureDir(path.dirname(outputPath));

  await runCommand("ffmpeg", [
    "-y",
    "-i",
    inputPath,
    "-ar",
    "44100",
    "-ac",
    "2",
    "-c:a",
    "pcm_s16le",
    outputPath,
  ]);
}

export async function getDecodedAudioDurationMs(filePath: string): Promise<number> {
  const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "pu3nte-audio-duration-"));
  const wavPath = path.join(tempDirectory, "decoded.wav");

  try {
    await convertAudioToWav(filePath, wavPath);
    try {
      await fs.access(wavPath);
    } catch {
      throw new Error(`Decoded WAV was not created for ${filePath}. Expected ${wavPath}`);
    }
    return await getAudioDurationMs(wavPath);
  } finally {
    await fs.rm(tempDirectory, { recursive: true, force: true });
  }
}

function encodePowerShellCommand(command: string): string {
  return Buffer.from(command, "utf16le").toString("base64");
}

function getLocalVoiceName(language: string): string {
  const normalized = language.toLowerCase();

  if (normalized.startsWith("es") || normalized === "spanish") {
    return process.env.LOCAL_TTS_SPANISH_VOICE_NAME ?? "";
  }

  if (normalized.startsWith("en") || normalized === "english") {
    return process.env.LOCAL_TTS_ENGLISH_VOICE_NAME ?? "";
  }

  return "";
}

function getCulturePrefix(language: string): string {
  const normalized = language.toLowerCase();

  if (normalized.startsWith("es") || normalized === "spanish") {
    return "es";
  }

  if (normalized.startsWith("en") || normalized === "english") {
    return "en";
  }

  return normalized.slice(0, 2);
}

export async function createLocalTtsMp3(text: string, language: string, outputPath: string): Promise<void> {
  await ensureDir(path.dirname(outputPath));

  const wavPath = outputPath.replace(/\.mp3$/i, ".wav");
  const encodedText = Buffer.from(text, "utf8").toString("base64");
  const encodedOutput = Buffer.from(wavPath, "utf8").toString("base64");
  const encodedVoiceName = Buffer.from(getLocalVoiceName(language), "utf8").toString("base64");
  const culturePrefix = getCulturePrefix(language);

  const command = `
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Speech
$Text = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("${encodedText}"))
$OutWav = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("${encodedOutput}"))
$PreferredVoice = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("${encodedVoiceName}"))
$CulturePrefix = "${culturePrefix}"
$Synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  if ($PreferredVoice) {
    $Synth.SelectVoice($PreferredVoice)
  } else {
    $Voice = $Synth.GetInstalledVoices() |
      Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.Name.ToLower().StartsWith($CulturePrefix) } |
      Select-Object -First 1

    if ($Voice) {
      $Synth.SelectVoice($Voice.VoiceInfo.Name)
    }
  }

  $Synth.Rate = 0
  $Synth.Volume = 100
  $Synth.SetOutputToWaveFile($OutWav)
  $Synth.Speak($Text)
} finally {
  $Synth.Dispose()
}
`;

  try {
    await runCommand("powershell", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-EncodedCommand",
      encodePowerShellCommand(command),
    ]);
  } catch (error) {
    throw new Error(
      `Local system TTS failed for ${language}. On Windows, install an ${culturePrefix.toUpperCase()} speech voice or set LOCAL_TTS_${culturePrefix === "es" ? "SPANISH" : "ENGLISH"}_VOICE_NAME.\n${(error as Error).message}`,
    );
  }

  try {
    await runCommand("ffmpeg", ["-y", "-i", wavPath, "-codec:a", "libmp3lame", "-b:a", "128k", outputPath]);
  } finally {
    await fs.rm(wavPath, { force: true });
  }
}

export async function concatenateMp3Files(inputFiles: string[], outputPath: string): Promise<void> {
  if (inputFiles.length === 0) {
    throw new Error("Cannot assemble final audio because no audio clips were provided.");
  }

  await ensureDir(path.dirname(outputPath));

  const listPath = path.join(path.dirname(outputPath), "concat-list.txt");
  const concatList = inputFiles
    .map((filePath) => `file '${filePath.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`)
    .join("\n");

  await fs.writeFile(listPath, concatList, "utf8");

  try {
    await runCommand("ffmpeg", [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      listPath,
      "-c:a",
      "libmp3lame",
      "-b:a",
      "128k",
      outputPath,
    ]);
  } finally {
    await fs.rm(listPath, { force: true });
  }
}

export async function concatenateWavFiles(inputFiles: string[], outputPath: string): Promise<void> {
  if (inputFiles.length === 0) {
    throw new Error("Cannot assemble final audio because no audio clips were provided.");
  }

  await ensureDir(path.dirname(outputPath));

  const listPath = path.join(path.dirname(outputPath), "wav-concat-list.txt");
  const concatList = inputFiles
    .map((filePath) => `file '${filePath.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`)
    .join("\n");

  await fs.writeFile(listPath, concatList, "utf8");

  try {
    await runCommand("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listPath, "-c", "copy", outputPath]);
  } finally {
    await fs.rm(listPath, { force: true });
  }
}

export async function encodeWavToMp3(inputPath: string, outputPath: string): Promise<void> {
  await ensureDir(path.dirname(outputPath));

  await runCommand("ffmpeg", ["-y", "-i", inputPath, "-codec:a", "libmp3lame", "-b:a", "128k", outputPath]);
}
