import fs from "node:fs/promises";
import type { LessonTimeline } from "./types";
import { formatSrtTimestamp } from "./utils";

export function createSrt(timeline: LessonTimeline): string {
  return timeline.segments
    .map((segment, index) => {
      return [
        String(index + 1),
        `${formatSrtTimestamp(segment.audioStartMs)} --> ${formatSrtTimestamp(segment.audioEndMs)}`,
        segment.subtitle,
      ].join("\n");
    })
    .join("\n\n")
    .concat("\n");
}

export async function writeSubtitles(timeline: LessonTimeline, outputPath: string): Promise<void> {
  await fs.writeFile(outputPath, createSrt(timeline), "utf8");
}
