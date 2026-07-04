import fs from "node:fs/promises";
import type { LessonTimeline } from "./types";
import { formatTimestamp } from "./utils";

function speakerLabel(role: string, speakerName?: string): string {
  return speakerName ?? role.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function createTranscript(timeline: LessonTimeline): string {
  const lines = [
    `# ${timeline.lesson.title}`,
    "",
    timeline.lesson.subtitle ? `${timeline.lesson.subtitle}\n` : "",
    `- Course: ${timeline.lesson.course}`,
    `- Level: ${timeline.lesson.level}`,
    `- Direction: ${timeline.lesson.learnerNativeLanguage} to ${timeline.lesson.targetLanguage}`,
    `- Duration: ${formatTimestamp(timeline.totalDurationMs)}`,
    "",
    "## Script",
    "",
  ].filter(Boolean);

  for (const segment of timeline.segments) {
    lines.push(
      `### ${formatTimestamp(segment.segmentStartMs)} - ${speakerLabel(segment.role, segment.speakerName)}`,
      "",
      `- Type: ${segment.type}`,
      `- Mode: ${segment.visualMode}`,
      `- Spoken: ${segment.text}`,
      `- Subtitle: ${segment.subtitle}`,
    );

    if (segment.targetAnswer) {
      lines.push(`- Target answer: ${segment.targetAnswer}`);
    }

    if (segment.timerStartMs !== null && segment.timerEndMs !== null) {
      lines.push(`- Response pause: ${formatTimestamp(segment.timerStartMs)} to ${formatTimestamp(segment.timerEndMs)}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

export async function writeTranscript(timeline: LessonTimeline, outputPath: string): Promise<void> {
  await fs.writeFile(outputPath, createTranscript(timeline), "utf8");
}
