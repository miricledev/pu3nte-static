import type { GrammarCommonMistake } from "../../types";

export function GrammarCommonMistakes({ mistakes, title = "Common mistake" }: { mistakes: GrammarCommonMistake[]; title?: string }) {
  if (!mistakes.length) return null;

  return (
    <div className="rounded-lg border border-pu3nte-red/25 bg-pu3nte-red/10 p-4">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-3 grid gap-3">
        {mistakes.map((mistake) => (
          <div key={`${mistake.wrong}-${mistake.correct}`} className="text-sm">
            <p className="text-red-100 line-through">{mistake.wrong}</p>
            <p className="mt-1 font-bold text-green-100">{mistake.correct}</p>
            <p className="mt-1 text-pu3nte-secondary">{mistake.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
