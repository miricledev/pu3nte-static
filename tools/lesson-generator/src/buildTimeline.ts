import type { GeneratedAudioClip, LessonTimeline, TimelineSegment } from "./types";
import type { LessonScript, LessonSegment, VisualMode } from "./validateScript";

const visualModeBySegmentType: Record<LessonSegment["type"], VisualMode> = {
  intro: "intro",
  explanation: "listen",
  prompt: "your_turn",
  response_pause: "your_turn",
  answer: "answer",
  repeat: "repeat",
  shadow: "shadow",
  dialogue: "dialogue",
  review: "review",
  final_challenge: "final_challenge",
  outro: "outro",
};

function getPauseDurationMs(script: LessonScript, segment: LessonSegment): number {
  if (segment.responsePauseMs !== undefined) {
    return segment.responsePauseMs;
  }

  if (segment.showTimer) {
    return script.settings.defaultResponsePauseMs;
  }

  return segment.pauseAfterMs ?? script.settings.defaultPauseAfterMs;
}

export function buildTimeline(script: LessonScript, clips: GeneratedAudioClip[]): LessonTimeline {
  const clipsBySegment = new Map(clips.map((clip) => [clip.segmentId, clip]));
  let cursorMs = 0;
  const segments: TimelineSegment[] = [];

  for (const segment of script.segments) {
    const clip = clipsBySegment.get(segment.id);

    if (!clip) {
      throw new Error(`Missing generated audio clip for segment ${segment.id}.`);
    }

    const pauseDurationMs = getPauseDurationMs(script, segment);
    const audioStartMs = cursorMs;
    const audioEndMs = audioStartMs + clip.durationMs;
    const pauseStartMs = audioEndMs;
    const pauseEndMs = pauseStartMs + pauseDurationMs;
    const showTimer = segment.showTimer ?? false;
    const timerStartMs = showTimer && pauseDurationMs > 0 ? pauseStartMs : null;
    const timerEndMs = showTimer && pauseDurationMs > 0 ? pauseEndMs : null;

    segments.push({
      id: segment.id,
      type: segment.type,
      role: segment.role,
      text: segment.text,
      subtitle: segment.subtitle ?? segment.text,
      voiceId: clip.voiceId,
      audioFilePath: clip.filePath,
      audioStartMs,
      audioEndMs,
      pauseStartMs,
      pauseEndMs,
      segmentStartMs: audioStartMs,
      segmentEndMs: pauseEndMs,
      showTimer,
      timerStartMs,
      timerEndMs,
      visualMode: segment.visualMode ?? visualModeBySegmentType[segment.type],
      visualTitle: segment.visualTitle,
      visualSubtitle: segment.visualSubtitle,
      timerLabel: segment.timerLabel,
      speakerName: segment.speakerName,
      showOnScreenText: segment.showOnScreenText,
      targetAnswer: segment.targetAnswer,
      nativePrompt: segment.nativePrompt,
    });

    cursorMs = pauseEndMs;
  }

  return {
    lesson: {
      id: script.id,
      title: script.title,
      subtitle: script.subtitle,
      course: script.course,
      level: script.level,
      targetLanguage: script.targetLanguage,
      learnerNativeLanguage: script.learnerNativeLanguage,
      estimatedMinutes: script.estimatedMinutes,
      outputSlug: script.outputSlug,
      branding: script.branding,
    },
    totalDurationMs: cursorMs,
    fps: script.settings.fps,
    videoWidth: script.settings.videoWidth,
    videoHeight: script.settings.videoHeight,
    segments,
  };
}
