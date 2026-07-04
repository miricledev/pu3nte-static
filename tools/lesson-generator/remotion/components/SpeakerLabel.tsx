import type { TimelineSegment } from "../../src/types";

type SpeakerLabelProps = {
  role: TimelineSegment["role"];
  speakerName?: string;
};

export const SpeakerLabel = ({ role, speakerName }: SpeakerLabelProps) => {
  const label = speakerName ?? role.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <div
      style={{
        marginTop: 44,
        color: "rgba(255,255,255,0.58)",
        fontSize: 24,
        textTransform: "uppercase",
        letterSpacing: 0,
      }}
    >
      {label}
    </div>
  );
};
