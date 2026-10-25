import type { Highlight } from "../../types";

export function TooltipPopover({ highlight }: { highlight: Highlight }) {
  return (
    <span className="fixed inset-x-3 bottom-3 z-50 w-auto max-w-none translate-x-0 rounded-md border border-white/10 bg-pu3nte-bg p-3 text-left text-xs text-pu3nte-secondary shadow-glow sm:absolute sm:inset-x-auto sm:bottom-full sm:left-1/2 sm:mb-2 sm:w-48 sm:-translate-x-1/2">
      <strong className="block text-pu3nte-text">{highlight.phrase}</strong>
      {highlight.meaning ?? highlight.explanation}
      {highlight.note && <span className="mt-1 block">{highlight.note}</span>}
    </span>
  );
}
