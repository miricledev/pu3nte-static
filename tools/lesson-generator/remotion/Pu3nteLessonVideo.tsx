import { AbsoluteFill, Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CountdownCircle } from "./components/CountdownCircle";
import { LessonHeader } from "./components/LessonHeader";
import { ModeBadge } from "./components/ModeBadge";
import { ProgressBar } from "./components/ProgressBar";
import { Pu3nteBackground } from "./components/Pu3nteBackground";
import { SpeakerLabel } from "./components/SpeakerLabel";
import { SubtitleBlock } from "./components/SubtitleBlock";
import type { RemotionLessonProps } from "./Root";
import type { TimelineSegment } from "../src/types";

function findActiveSegment(segments: TimelineSegment[], currentMs: number): TimelineSegment {
  return (
    segments.find((segment) => currentMs >= segment.segmentStartMs && currentMs < segment.segmentEndMs) ??
    segments[segments.length - 1]
  );
}

function getModeLabel(segment: TimelineSegment): string {
  const labels: Record<TimelineSegment["visualMode"], string> = {
    intro: "LISTEN",
    listen: "LISTEN",
    your_turn: "YOUR TURN",
    answer: "ANSWER",
    repeat: "REPEAT",
    shadow: "SHADOW",
    dialogue: "DIALOGUE",
    review: "REVIEW",
    final_challenge: "FINAL CHALLENGE",
    outro: "COMPLETE",
  };

  return labels[segment.visualMode];
}

function getDisplayText(segment: TimelineSegment): string {
  if (segment.showOnScreenText) {
    return segment.showOnScreenText;
  }

  if (segment.targetAnswer && ["answer", "repeat", "shadow"].includes(segment.visualMode)) {
    return segment.targetAnswer;
  }

  return segment.subtitle;
}

export const Pu3nteLessonVideo = ({ timeline, audioSrc }: RemotionLessonProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const activeSegment = findActiveSegment(timeline.segments, currentMs);
  const segmentProgress = interpolate(
    currentMs,
    [activeSegment.segmentStartMs, activeSegment.segmentEndMs],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const timerIsVisible =
    activeSegment.timerStartMs !== null &&
    activeSegment.timerEndMs !== null &&
    currentMs >= activeSegment.timerStartMs &&
    currentMs < activeSegment.timerEndMs;
  const timerTotalMs =
    activeSegment.timerStartMs !== null && activeSegment.timerEndMs !== null
      ? activeSegment.timerEndMs - activeSegment.timerStartMs
      : 0;
  const timerRemainingMs =
    timerIsVisible && activeSegment.timerEndMs !== null ? Math.max(0, activeSegment.timerEndMs - currentMs) : 0;
  const overallProgress = currentMs / timeline.totalDurationMs;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050814", color: "white", fontFamily: "Inter, Arial, sans-serif" }}>
      {audioSrc ? <Audio src={audioSrc} /> : null}
      <Pu3nteBackground progress={overallProgress} />
      <AbsoluteFill
        style={{
          padding: 72,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gap: 42,
        }}
      >
        <LessonHeader timeline={timeline} />

        <main
          style={{
            display: "grid",
            gridTemplateColumns: timerIsVisible ? "1fr 420px" : "1fr",
            alignItems: "center",
            gap: 72,
          }}
        >
          <section
            style={{
              minWidth: 0,
              padding: "60px 64px",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 8,
              background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035))",
              boxShadow: "0 28px 90px rgba(0,0,0,0.34)",
              backdropFilter: "blur(18px)",
            }}
          >
            <ModeBadge mode={getModeLabel(activeSegment)} visualMode={activeSegment.visualMode} />
            <SubtitleBlock
              title={activeSegment.visualTitle}
              subtitle={activeSegment.visualSubtitle}
              text={getDisplayText(activeSegment)}
              phaseProgress={segmentProgress}
            />
            <SpeakerLabel role={activeSegment.role} speakerName={activeSegment.speakerName} />
          </section>

          {timerIsVisible ? (
            <CountdownCircle
              totalMs={timerTotalMs}
              remainingMs={timerRemainingMs}
              label={activeSegment.timerLabel ?? "Respond out loud"}
            />
          ) : null}
        </main>

        <ProgressBar
          progress={overallProgress}
          current={timeline.segments.findIndex((segment) => segment.id === activeSegment.id) + 1}
          total={timeline.segments.length}
          language={`${timeline.lesson.learnerNativeLanguage} to ${timeline.lesson.targetLanguage}`}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
