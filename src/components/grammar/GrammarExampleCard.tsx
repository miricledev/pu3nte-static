import type { GrammarExample } from "../../types";

export function GrammarExampleCard({ example }: { example: GrammarExample }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      {example.sourceText && <p className="text-sm text-pu3nte-secondary">{example.sourceText}</p>}
      <p className="text-xl font-bold">{example.targetText}</p>
      {example.translation && <p className="mt-2 text-sm text-pu3nte-secondary">{example.translation}</p>}
      {example.highlightedParts?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {example.highlightedParts.map((part) => (
            <span key={`${part.text}-${part.label}`} className="rounded-full border border-pu3nte-gold/30 bg-pu3nte-gold/10 px-3 py-1 text-xs font-bold text-yellow-100" title={part.explanation}>
              {part.text} · {part.label}
            </span>
          ))}
        </div>
      ) : null}
      {example.note && <p className="mt-3 text-xs text-pu3nte-muted">{example.note}</p>}
    </div>
  );
}
