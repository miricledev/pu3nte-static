import { useEffect, useState } from "react";

export function TimerCircle({ seconds, active, onDone }: { seconds: number; active: boolean; onDone?: () => void }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!active || seconds === 0) return;
    const id = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(id);
          onDone?.();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [active, onDone, seconds]);

  if (seconds === 0) return <span className="text-sm text-pu3nte-secondary">No timer</span>;
  const progress = (remaining / seconds) * 100;
  return (
    <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]" style={{ background: `conic-gradient(#00C8FF ${progress}%, rgba(255,255,255,0.08) 0)` }}>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-pu3nte-bg text-sm font-bold">{remaining}s</span>
    </div>
  );
}
