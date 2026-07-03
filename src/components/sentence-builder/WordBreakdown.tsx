import type { SentenceStage } from "../../types";

export function WordBreakdown({ items = [] }: { items?: SentenceStage["wordBreakdown"] }) {
  if (!items?.length) return null;
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={`${item.source}-${item.target}`} className="grid gap-1 rounded-md border border-white/10 bg-white/[0.04] p-3 sm:grid-cols-2">
          <span className="text-pu3nte-secondary">{item.source}</span>
          <span className="font-bold">{item.target}</span>
        </div>
      ))}
    </div>
  );
}
