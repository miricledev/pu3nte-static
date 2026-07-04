import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

export async function ensureDir(directory: string): Promise<void> {
  await fs.mkdir(directory, { recursive: true });
}

export function sha256Short(value: string, length = 12): string {
  return crypto.createHash("sha256").update(value).digest("hex").slice(0, length);
}

export function formatTimestamp(ms: number): string {
  const safeMs = Math.max(0, Math.round(ms));
  const totalSeconds = Math.floor(safeMs / 1000);
  const milliseconds = safeMs % 1000;
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(3, "0")}`;
}

export function formatSrtTimestamp(ms: number): string {
  return formatTimestamp(ms).replace(".", ",");
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function resolveMaybeEnv(value: string, label: string): string {
  if (!value.startsWith("env:")) {
    return value;
  }

  const envName = value.slice("env:".length);
  const envValue = process.env[envName];

  if (!envValue) {
    throw new Error(`Missing ${envName}. Required by ${label}. Add it to your local env file.`);
  }

  return envValue;
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function runCommand(command: string, args: string[], cwd?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: false,
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(new Error(`Failed to run ${command}. Is it installed and available on PATH?\n${error.message}`));
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout.trim());
        return;
      }

      reject(new Error(`${command} exited with code ${code}.\n${stderr.trim()}`));
    });
  });
}

export function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}
