import { Info } from "lucide-react";
import type { PropsWithChildren } from "react";

export function InfoTip({ children, label }: PropsWithChildren<{ label: string }>) {
  return (
    <span className="group relative inline-flex items-center">
      <button
        type="button"
        className="inline-grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-pu3nte-secondary hover:text-pu3nte-text"
        aria-label={label}
      >
        <Info size={14} />
      </button>
      <span className="pointer-events-none absolute right-0 top-9 z-30 hidden w-64 rounded-md border border-white/10 bg-pu3nte-bg p-3 text-left text-xs leading-5 text-pu3nte-secondary shadow-glow group-hover:block group-focus-within:block">
        {children}
      </span>
    </span>
  );
}
