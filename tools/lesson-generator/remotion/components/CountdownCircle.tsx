type CountdownCircleProps = {
  totalMs: number;
  remainingMs: number;
  label: string;
};

export const CountdownCircle = ({ totalMs, remainingMs, label }: CountdownCircleProps) => {
  const radius = 162;
  const circumference = 2 * Math.PI * radius;
  const progress = totalMs <= 0 ? 0 : remainingMs / totalMs;
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));

  return (
    <aside
      style={{
        display: "grid",
        placeItems: "center",
        gap: 28,
      }}
    >
      <div
        style={{
          width: 360,
          height: 360,
          position: "relative",
          display: "grid",
          placeItems: "center",
        }}
      >
        <svg width="360" height="360" viewBox="0 0 360 360" style={{ position: "absolute", inset: 0 }}>
          <circle cx="180" cy="180" r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="18" fill="none" />
          <circle
            cx="180"
            cy="180"
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform="rotate(-90 180 180)"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ee2c36" />
              <stop offset="52%" stopColor="#ffd447" />
              <stop offset="100%" stopColor="#00baf2" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {seconds}
        </div>
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.74)",
          fontSize: 26,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 0,
        }}
      >
        {label}
      </div>
    </aside>
  );
};
