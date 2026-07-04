import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
export const generatorRoot = path.resolve(path.dirname(currentFile), "..");
export const projectRoot = path.resolve(generatorRoot, "..", "..");
export const outputRoot = path.join(generatorRoot, "output");
export const audioCacheRoot = path.join(generatorRoot, "cache", "audio");
export const remotionEntry = path.join(generatorRoot, "remotion", "index.tsx");

export function loadLocalEnv(): void {
  const envFiles = [
    path.join(projectRoot, ".env"),
    path.join(projectRoot, ".env.local"),
    path.join(projectRoot, ".env.lesson-generator"),
    path.join(projectRoot, ".env.lesson.generator"),
    path.join(generatorRoot, ".env"),
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      dotenv.config({ path: envFile, override: false });
    }
  }
}

export function getElevenLabsModelId(): string {
  return process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";
}

export function requireElevenLabsApiKey(): string {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing ELEVENLABS_API_KEY. Add it to your .env.lesson-generator or .env file.");
  }

  return apiKey;
}
