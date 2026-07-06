type AudioMixerProps = {
  frame: number;
  intensity: number;
};

export const AudioMixer = ({ frame, intensity }: AudioMixerProps) => {
  const bars = Array.from({ length: 28 }, (_, index) => {
    const wave = Math.sin(frame / 8 + index * 0.75);
    const secondaryWave = Math.sin(frame / 17 + index * 1.25);
    const height = 34 + (wave * 0.5 + secondaryWave * 0.5 + 1) * 58 * intensity;
    const color = index % 3 === 0 ? "#ee2c36" : index % 3 === 1 ? "#ffd447" : "#00baf2";

    return (
      <div
        key={index}
        style={{
          width: 8,
          height,
          borderRadius: 999,
          background: color,
          opacity: 0.38 + intensity * 0.4,
          boxShadow: `0 0 ${12 + intensity * 20}px ${color}`,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: "auto 0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        opacity: 0.72,
      }}
    >
      {bars}
    </div>
  );
};
