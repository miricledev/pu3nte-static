import { useState } from "react";
import type { ReadingParagraph } from "../../types";
import { GlossaryTooltip } from "./GlossaryTooltip";

export function ReadingText({
  paragraphs,
  fontSize,
  labels,
}: {
  paragraphs: ReadingParagraph[];
  fontSize: number;
  labels?: { showTranslation?: string; hideTranslation?: string; shadow?: string };
}) {
  const [translations, setTranslations] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph) => (
        <div key={paragraph.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="leading-8" style={{ fontSize }}><GlossaryTooltip text={paragraph.text} highlights={paragraph.highlights ?? []} /></p>
          {paragraph.translation && (
            <button type="button" className="mt-3 text-sm font-bold text-pu3nte-cyan" onClick={() => setTranslations((value) => ({ ...value, [paragraph.id]: !value[paragraph.id] }))}>
              {translations[paragraph.id] ? labels?.hideTranslation ?? "Hide translation" : labels?.showTranslation ?? "Show translation"}
            </button>
          )}
          {translations[paragraph.id] && <p className="mt-3 text-sm text-pu3nte-secondary">{paragraph.translation}</p>}
          {paragraph.shadowLine && <p className="mt-3 rounded-md border border-pu3nte-gold/30 bg-pu3nte-gold/10 p-3 text-sm">{labels?.shadow ?? "Shadow"}: {paragraph.shadowLine}</p>}
        </div>
      ))}
    </div>
  );
}
