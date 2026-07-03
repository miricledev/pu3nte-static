export function BridgeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pu3nte-red to-pu3nte-gold" />
      <div className="h-2 w-2 rounded-full bg-bridge shadow-glow" />
      <div className="h-px flex-1 bg-gradient-to-r from-pu3nte-blue via-pu3nte-cyan to-transparent" />
    </div>
  );
}
