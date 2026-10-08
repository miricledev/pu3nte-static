import { AbsoluteFill, Audio } from "remotion";
import type { RemotionLessonProps } from "./Root";
import type { TimelineSegment } from "../src/types";
import { GrammarBoard } from "./components/GrammarBoard";
import { CountdownCircle } from "./components/CountdownCircle";
import { LessonHeader } from "./components/LessonHeader";
import { Pu3nteBackground } from "./components/Pu3nteBackground";

export const GrammarLessonVideo = ({ timeline, audioSrc, backgroundImageSrc, segment, currentMs }: RemotionLessonProps & { segment: TimelineSegment; currentMs: number }) => {
  const darija = timeline.lesson.learnerNativeLanguage === "darija";
  const isPractice = segment.type === "prompt" || segment.type === "final_challenge";
  const inPause = segment.timerStartMs !== null && currentMs >= segment.timerStartMs && currentMs < (segment.timerEndMs ?? 0);
  const phase = isPractice ? (darija ? "نوبتك" : "YOU TRY") : segment.type === "answer" ? (darija ? "الجواب" : "MODEL ANSWER") : (darija ? "سمع وفهم" : "NOTICE THE PATTERN");
  const progress = currentMs / timeline.totalDurationMs;
  return <AbsoluteFill style={{ background: "#050814", color: "white", fontFamily: "Arial, sans-serif" }}>
    {audioSrc && <Audio src={audioSrc} />}
    <Pu3nteBackground progress={progress} backgroundImageSrc={backgroundImageSrc} />
    <AbsoluteFill style={{ padding: 48, display: "grid", gridTemplateRows: "auto minmax(0, 1fr) 30px", gap: 22 }}>
      <LessonHeader timeline={timeline} />
      <main style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 230px", gap: 22, minHeight: 0 }}>
        <section style={{ padding: "24px 30px", background: "rgba(4,12,28,0.96)", borderRadius: 24, border: "1px solid #33506a", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center", minWidth: 0 }}>
          {segment.grammarBoard && <GrammarBoard board={segment.grammarBoard} />}
          {segment.subtitle && <div dir="auto" style={{ fontSize: 24, lineHeight: 1.35, color: "#dce5f3", borderTop: "1px solid #33506a", paddingTop: 16, marginTop: "auto" }}>{segment.subtitle}</div>}
        </section>
        <aside style={{ borderRadius: 24, padding: "28px 12px", background: "rgba(4,12,28,0.94)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <div dir="auto" style={{ fontSize: 26, fontWeight: 800, textAlign: "center", color: isPractice ? "#ffd447" : "#69ddff" }}>{phase}</div>
          {inPause ? <CountdownCircle totalMs={(segment.timerEndMs ?? 0) - (segment.timerStartMs ?? 0)} remainingMs={Math.max(0, (segment.timerEndMs ?? 0) - currentMs)} label={segment.timerLabel ?? (darija ? "جرّب تجاوب" : "Try it aloud")} size={185} /> : <div style={{ fontSize: 64, color: "#b9a7ff" }}>{segment.type === "answer" ? "✓" : "…"}</div>}
          <div dir="auto" style={{ fontSize: 21, textAlign: "center", color: "#c6d4e9" }}>{darija ? "فهم · جرّب · استعمل" : "Understand · Try · Use"}</div>
        </aside>
      </main>
      <div style={{ alignSelf: "center", height: 9, background: "#243048", borderRadius: 9, overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.min(100, progress * 100)}%`, background: "linear-gradient(90deg, #b9a7ff, #00baf2, #ffd447)" }} /></div>
    </AbsoluteFill>
  </AbsoluteFill>;
};
