type CountdownCircleProps = {
  totalMs: number;
  remainingMs: number;
  label: string;
  size?: number;
  dimmed?: boolean;
};

export const CountdownCircle = ({ totalMs, remainingMs, label, size = 360, dimmed = false }: CountdownCircleProps) => {
  const radius = size * 0.45;
  const circumference = 2 * Math.PI * radius;
  const progress = totalMs <= 0 ? 0 : remainingMs / totalMs;
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const center = size / 2;

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
          width: size,
          height: size,
          position: "relative",
          display: "grid",
          placeItems: "center",
          filter: dimmed ? "saturate(0.82)" : "saturate(1.1)",
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", inset: 0 }}>
          <circle cx={center} cy={center} r={radius * 0.72} stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
          <circle cx={center} cy={center} r={radius * 0.86} stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
          <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.12)" strokeWidth="18" fill="rgba(5,8,20,0.34)" />
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="url(#timerGradient)"
            strokeWidth="18"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            transform={`rotate(-90 ${center} ${center})`}
            opacity={dimmed ? 0.62 : 1}
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
            fontSize: size * 0.29,
            fontWeight: 800,
            lineHeight: 1,
            textShadow: "0 0 26px rgba(0,186,242,0.45)",
          }}
        >
          {seconds}
        </div>
      </div>
      <div
        style={{
          color: "rgba(255,255,255,0.74)",
          fontSize: size * 0.072,
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
