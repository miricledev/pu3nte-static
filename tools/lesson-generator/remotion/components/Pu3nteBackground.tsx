type Pu3nteBackgroundProps = {
  progress: number;
  backgroundImageSrc?: string;
};

export const Pu3nteBackground = ({ progress, backgroundImageSrc }: Pu3nteBackgroundProps) => {
  const drift = Math.round(progress * 120);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(circle at 18% 22%, rgba(238,44,54,0.24), transparent 28%), radial-gradient(circle at 86% 18%, rgba(0,186,242,0.18), transparent 30%), linear-gradient(135deg, #050814 0%, #07111f 48%, #02030a 100%)",
      }}
    >
      {backgroundImageSrc ? (
        <div
          style={{
            position: "absolute",
            inset: "-2%",
            backgroundImage: `linear-gradient(135deg, rgba(5,8,20,0.72), rgba(5,8,20,0.54)), url("${backgroundImageSrc}")`,
            backgroundSize: "cover",
            backgroundPosition: `${50 + Math.sin(progress * Math.PI * 2) * 1.6}% ${50 + Math.cos(progress * Math.PI * 2) * 1.2}%`,
            filter: "saturate(1.08) contrast(1.08)",
            opacity: 0.82,
            transform: `scale(1.035) translateX(${-drift * 0.12}px)`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: "12% -8%",
          transform: `translateX(${-drift}px) rotate(-8deg)`,
          opacity: 0.32,
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 96px, rgba(255,255,255,0.16) 97px 99px, transparent 100px 152px)",
          maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "7%",
          right: "7%",
          bottom: "16%",
          height: 2,
          opacity: 0.55,
          background: "linear-gradient(90deg, #ee2c36, #ffd447, #00baf2)",
          boxShadow: "0 0 32px rgba(0,186,242,0.35)",
        }}
      />
    </div>
  );
};
