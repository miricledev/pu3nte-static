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

const shortResponsePauseMs = 2_400;
const minimumResponsePauseMs = 3_200;
const maximumResponsePauseMs = 12_000;

function countResponseUnits(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const punctuationPauses = (text.match(/[,:;.!?¿¡]/g) ?? []).length;

  return words + punctuationPauses * 0.45;
}

function getResponseText(segment: LessonSegment, previousSegment?: LessonSegment): string {
  if (segment.targetAnswer?.trim()) return segment.targetAnswer;
  if (segment.showOnScreenText?.trim()) return segment.showOnScreenText;

  if (segment.type === "response_pause" && previousSegment) {
    if (previousSegment.targetAnswer?.trim()) return previousSegment.targetAnswer;
    if (previousSegment.showOnScreenText?.trim()) return previousSegment.showOnScreenText;
    if (["answer", "repeat", "shadow"].includes(previousSegment.type)) return previousSegment.text;
  }

  return segment.text;
}

function getDynamicResponsePauseMs(segment: LessonSegment, previousSegment?: LessonSegment): number {
  const responseText = getResponseText(segment, previousSegment);
  const responseUnits = countResponseUnits(responseText);

  if (responseUnits <= 3) {
    return shortResponsePauseMs;
  }

  const baseMs = 1_200;
  const perUnitMs = 620;
  return Math.min(maximumResponsePauseMs, Math.max(minimumResponsePauseMs, Math.round(baseMs + responseUnits * perUnitMs)));
}

function getPauseDurationMs(script: LessonScript, segment: LessonSegment, previousSegment?: LessonSegment): number {
  if (segment.responsePauseMs !== undefined) {
    return segment.responsePauseMs;
  }

  if (segment.showTimer) {
    return getDynamicResponsePauseMs(segment, previousSegment);
  }

  return segment.pauseAfterMs ?? script.settings.defaultPauseAfterMs;
}

export function buildTimeline(script: LessonScript, clips: GeneratedAudioClip[]): LessonTimeline {
  const clipsBySegment = new Map(clips.map((clip) => [clip.segmentId, clip]));
  let cursorMs = 0;
  const segments: TimelineSegment[] = [];

  for (const [index, segment] of script.segments.entries()) {
    const clip = clipsBySegment.get(segment.id);
    const previousSegment = index > 0 ? script.segments[index - 1] : undefined;

    if (!clip) {
      throw new Error(`Missing generated audio clip for segment ${segment.id}.`);
    }

    const pauseDurationMs = getPauseDurationMs(script, segment, previousSegment);
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
