type ProgressBarProps = {
  progress: number;
  current: number;
  total: number;
  language: string;
};

export const ProgressBar = ({ progress, current, total, language }: ProgressBarProps) => {
  return (
    <footer style={{ display: "grid", gap: 18 }}>
      <div
        style={{
          height: 12,
          borderRadius: 8,
          overflow: "hidden",
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            width: `${Math.max(0, Math.min(1, progress)) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ee2c36, #ffd447, #00baf2)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "rgba(255,255,255,0.68)",
          fontSize: 23,
          textTransform: "uppercase",
          letterSpacing: 0,
        }}
      >
        <span>
          Segment {current} / {total}
        </span>
        <span>{language}</span>
      </div>
    </footer>
  );
};
