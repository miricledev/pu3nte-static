import fs from "node:fs/promises";
import type { LessonScript } from "./validateScript";
import type { GeneratedAudioClip, LessonTimeline } from "./types";
import { formatDuration } from "./utils";

export function createMetadata(script: LessonScript, timeline: LessonTimeline, clips: GeneratedAudioClip[]) {
  return {
    id: script.id,
    title: script.title,
    outputSlug: script.outputSlug,
    course: script.course,
    level: script.level,
    targetLanguage: script.targetLanguage,
    learnerNativeLanguage: script.learnerNativeLanguage,
    durationMs: timeline.totalDurationMs,
    duration: formatDuration(timeline.totalDurationMs),
    fps: timeline.fps,
    video: {
      width: timeline.videoWidth,
      height: timeline.videoHeight,
    },
    segments: timeline.segments.length,
    cachedAudioClips: clips.filter((clip) => clip.cacheHit).length,
    generatedAudioClips: clips.filter((clip) => !clip.cacheHit).length,
    createdAt: new Date().toISOString(),
  };
}

export async function writeMetadata(
  script: LessonScript,
  timeline: LessonTimeline,
  clips: GeneratedAudioClip[],
  outputPath: string,
): Promise<void> {
  await fs.writeFile(outputPath, JSON.stringify(createMetadata(script, timeline, clips), null, 2), "utf8");
}
