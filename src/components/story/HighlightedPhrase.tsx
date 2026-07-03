import { useState } from "react";
import type { Highlight } from "../../types";
import { TooltipPopover } from "./TooltipPopover";

export function HighlightedPhrase({ text, highlights }: { text: string; highlights: Highlight[] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!highlights.length) return <>{text}</>;
  let rendered: React.ReactNode[] = [text];
  highlights.forEach((highlight) => {
    rendered = rendered.flatMap((part) => {
      if (typeof part !== "string" || !part.includes(highlight.phrase)) return [part];
      const pieces = part.split(highlight.phrase);
      return pieces.flatMap((piece, index) => [
        piece,
        index < pieces.length - 1 ? (
          <button key={`${highlight.phrase}-${index}`} type="button" className="relative font-bold text-pu3nte-cyan underline decoration-pu3nte-cyan/40" onClick={() => setOpen(open === highlight.phrase ? null : highlight.phrase)}>
            {highlight.phrase}
            {open === highlight.phrase && <TooltipPopover highlight={highlight} />}
          </button>
        ) : null,
      ]);
    });
  });
  return <>{rendered}</>;
}
