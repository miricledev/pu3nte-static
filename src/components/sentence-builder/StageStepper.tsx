export function StageStepper({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2" aria-label="Stage progress">
      {Array.from({ length: total }, (_, index) => (
        <div key={index} className={`h-2 flex-1 rounded-full ${index <= current ? "bg-bridge" : "bg-white/10"}`} />
      ))}
    </div>
  );
}
