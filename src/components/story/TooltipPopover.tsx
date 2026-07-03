import type { Highlight } from "../../types";

export function TooltipPopover({ highlight }: { highlight: Highlight }) {
  return (
    <span className="absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-md border border-white/10 bg-pu3nte-bg p-3 text-xs text-pu3nte-secondary shadow-glow">
      <strong className="block text-pu3nte-text">{highlight.phrase}</strong>
      {highlight.meaning ?? highlight.explanation}
      {highlight.note && <span className="mt-1 block">{highlight.note}</span>}
    </span>
  );
}
