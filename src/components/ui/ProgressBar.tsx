export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <div className="space-y-2" aria-label={label ?? "Progress"}>
      {label && (
        <div className="flex items-center justify-between text-xs text-pu3nte-secondary">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-bridge transition-all" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
