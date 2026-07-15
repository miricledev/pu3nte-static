import { HighlightedPhrase } from "../story/HighlightedPhrase";
import type { Highlight } from "../../types";

export function GlossaryTooltip({ text, highlights }: { text: string; highlights: Highlight[] }) {
  return <HighlightedPhrase text={text} highlights={highlights} quoteHighlights caseInsensitive />;
}
