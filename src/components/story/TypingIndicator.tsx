export function TypingIndicator() {
  return (
    <div className="flex gap-1 rounded-full bg-white/[0.07] px-4 py-3" aria-label="Typing">
      {[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 animate-pulse rounded-full bg-pu3nte-secondary" style={{ animationDelay: `${dot * 120}ms` }} />)}
    </div>
  );
}
