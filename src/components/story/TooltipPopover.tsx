import type { Highlight } from "../../types";

export function TooltipPopover({ highlight }: { highlight: Highlight }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-[70] w-auto max-w-none translate-x-0 rounded-lg border border-pu3nte-cyan/30 bg-[#050814] p-3 text-left text-xs shadow-glow sm:absolute sm:inset-x-auto sm:bottom-full sm:left-1/2 sm:mb-2 sm:w-56 sm:max-w-[calc(100vw-2rem)] sm:-translate-x-1/2"
    >
      <strong className="block text-pu3nte-text">{highlight.phrase}</strong>
      <span className="mt-1 block leading-relaxed text-pu3nte-text">
        {highlight.meaning ?? highlight.explanation}
      </span>
      {highlight.note && (
        <span className="mt-1.5 block leading-relaxed text-pu3nte-secondary">
          {highlight.note}
        </span>
      )}
    </span>
  );
}
