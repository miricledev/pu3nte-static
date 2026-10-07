import type { LessonTimeline } from "../../src/types";

type LessonHeaderProps = {
  timeline: LessonTimeline;
};

export const LessonHeader = ({ timeline }: LessonHeaderProps) => {
  return (
    <header
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 36,
        padding: "18px 22px",
        borderRadius: 22,
        background: "linear-gradient(135deg, rgba(2,6,23,0.82), rgba(2,6,23,0.52))",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 20px 70px rgba(0,0,0,0.34)",
        backdropFilter: "blur(16px)",
      }}
    >
      {timeline.lesson.branding.showLogo ? (
        <div
          style={{
            fontSize: 38,
            fontWeight: 900,
            padding: "16px 22px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          {timeline.lesson.branding.logoText}
        </div>
      ) : null}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.12, textShadow: "0 3px 18px rgba(0,0,0,0.78)" }}>{timeline.lesson.title}</div>
        <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 24, marginTop: 8, textShadow: "0 2px 12px rgba(0,0,0,0.74)" }}>{timeline.lesson.course}</div>
      </div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          padding: "14px 20px",
          borderRadius: 8,
          color: "#07111f",
          background: "#ffd447",
        }}
      >
        {timeline.lesson.level}
      </div>
    </header>
  );
};
