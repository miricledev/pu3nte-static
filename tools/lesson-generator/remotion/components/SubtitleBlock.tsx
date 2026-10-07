type SubtitleBlockProps = {
  title?: string;
  subtitle?: string;
  text: string;
  phaseProgress: number;
};

export const SubtitleBlock = ({ title, subtitle, text, phaseProgress }: SubtitleBlockProps) => {
  const opacity = Math.min(1, 0.72 + phaseProgress * 0.28);

  return (
    <div style={{ marginTop: 22, opacity }}>
      {title ? (
        <div style={{ fontSize: 48, lineHeight: 1.05, fontWeight: 800, marginBottom: 14, textShadow: "0 4px 22px rgba(0,0,0,0.82)" }}>{title}</div>
      ) : null}
      {subtitle ? (
        <div style={{ fontSize: 28, lineHeight: 1.2, color: "rgba(255,255,255,0.76)", marginBottom: 26, textShadow: "0 3px 16px rgba(0,0,0,0.78)" }}>
          {subtitle}
        </div>
      ) : null}
      <div
        style={{
          fontSize: title ? 46 : 58,
          lineHeight: 1.12,
          fontWeight: 760,
          overflowWrap: "break-word",
          textShadow: "0 5px 26px rgba(0,0,0,0.86)",
        }}
      >
        {text}
      </div>
    </div>
  );
};
