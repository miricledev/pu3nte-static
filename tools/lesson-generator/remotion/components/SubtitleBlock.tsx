type SubtitleBlockProps = {
  title?: string;
  subtitle?: string;
  text: string;
  phaseProgress: number;
};

export const SubtitleBlock = ({ title, subtitle, text, phaseProgress }: SubtitleBlockProps) => {
  const opacity = Math.min(1, 0.72 + phaseProgress * 0.28);

  return (
    <div style={{ marginTop: 30, opacity }}>
      {title ? (
        <div style={{ fontSize: 58, lineHeight: 1.05, fontWeight: 800, marginBottom: 18 }}>{title}</div>
      ) : null}
      {subtitle ? (
        <div style={{ fontSize: 34, lineHeight: 1.2, color: "rgba(255,255,255,0.68)", marginBottom: 38 }}>
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          fontSize: title ? 54 : 70,
          lineHeight: 1.12,
          fontWeight: 760,
          overflowWrap: "break-word",
        }}
      >
        {text}
      </div>
    </div>
  );
};
