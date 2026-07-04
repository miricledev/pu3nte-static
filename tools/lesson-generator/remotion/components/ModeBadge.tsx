import type { TimelineSegment } from "../../src/types";

type ModeBadgeProps = {
  mode: string;
  visualMode: TimelineSegment["visualMode"];
};

const colorByMode: Record<TimelineSegment["visualMode"], string> = {
  intro: "#00baf2",
  listen: "#00baf2",
  your_turn: "#ffd447",
  answer: "#38e38b",
  repeat: "#ffd447",
  shadow: "#00baf2",
  dialogue: "#b9a7ff",
  review: "#ffd447",
  final_challenge: "#ee2c36",
  outro: "#38e38b",
};

export const ModeBadge = ({ mode, visualMode }: ModeBadgeProps) => {
  const color = colorByMode[visualMode];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        color,
        fontSize: 28,
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: 0,
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 24px ${color}`,
        }}
      />
      {mode}
    </div>
  );
};
