import { useState } from "react";
import type { Highlight } from "../../types";
import { TooltipPopover } from "./TooltipPopover";

type HighlightedPhraseProps = {
  text: string;
  highlights: Highlight[];
  quoteHighlights?: boolean;
  caseInsensitive?: boolean;
};

const openingQuotes = new Set(['"', "'", "“", "‘"]);
const closingQuotes = new Set(['"', "'", "”", "’"]);

function isAlreadyQuoted(text: string, start: number, end: number) {
  const before = text[start - 1];
  const after = text[end];
  return Boolean(before && after && openingQuotes.has(before) && closingQuotes.has(after));
}

function renderHighlightedText(text: string, showQuotes: boolean) {
  if (!showQuotes) return text;
  return (
    <>
      <span className="text-pu3nte-gold">“</span>
      {text}
      <span className="text-pu3nte-gold">”</span>
    </>
  );
}

export function HighlightedPhrase({ text, highlights, quoteHighlights = false, caseInsensitive = false }: HighlightedPhraseProps) {
  const [open, setOpen] = useState<string | null>(null);
  if (!highlights.length) return <>{text}</>;
  let rendered: React.ReactNode[] = [text];
  [...highlights]
    .filter((highlight) => highlight.phrase)
    .sort((first, second) => second.phrase.length - first.phrase.length)
    .forEach((highlight) => {
    rendered = rendered.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const searchablePart = caseInsensitive ? part.toLocaleLowerCase() : part;
      const searchablePhrase = caseInsensitive ? highlight.phrase.toLocaleLowerCase() : highlight.phrase;
      if (!searchablePart.includes(searchablePhrase)) return [part];

      const pieces: React.ReactNode[] = [];
      let cursor = 0;
      let matchIndex = searchablePart.indexOf(searchablePhrase, cursor);

      while (matchIndex >= 0) {
        if (matchIndex > cursor) pieces.push(part.slice(cursor, matchIndex));
        const matchEnd = matchIndex + highlight.phrase.length;
        const matchedText = part.slice(matchIndex, matchEnd);
        const shouldQuote = quoteHighlights && !isAlreadyQuoted(part, matchIndex, matchEnd);
        pieces.push(
          <button
            key={`${highlight.phrase}-${matchIndex}-${cursor}`}
            type="button"
            className={`relative font-bold text-pu3nte-cyan underline decoration-pu3nte-cyan/40 ${quoteHighlights ? "rounded-md bg-pu3nte-cyan/5 px-0.5" : ""}`}
            onClick={() => setOpen(open === highlight.phrase ? null : highlight.phrase)}
          >
            {renderHighlightedText(matchedText, shouldQuote)}
            {open === highlight.phrase && <TooltipPopover highlight={highlight} />}
          </button>,
        );
        cursor = matchEnd;
        matchIndex = searchablePart.indexOf(searchablePhrase, cursor);
      }

      if (cursor < part.length) pieces.push(part.slice(cursor));
      return pieces;
    });
  });
  return <>{rendered}</>;
}
