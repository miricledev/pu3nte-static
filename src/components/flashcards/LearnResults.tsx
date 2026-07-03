import type { FlashcardItem } from "../../types";
import { GradientButton } from "../ui/GradientButton";

export function LearnResults({
  mastered,
  learning,
  accuracy,
  missedCards,
  onRetry,
  onFinish,
  labels,
}: {
  mastered: number;
  learning: number;
  accuracy: number;
  missedCards: FlashcardItem[];
  onRetry: () => void;
  onFinish?: () => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="glass-panel rounded-lg p-6">
      <h2 className="text-2xl font-extrabold">{labels?.sessionResults ?? "Session Results"}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-3xl font-bold">{mastered}</p><p className="text-sm text-pu3nte-secondary">{labels?.mastered ?? "Mastered"}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-3xl font-bold">{learning}</p><p className="text-sm text-pu3nte-secondary">{labels?.stillLearning ?? "Still learning"}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-3xl font-bold">{accuracy}%</p><p className="text-sm text-pu3nte-secondary">{labels?.accuracy ?? "Accuracy"}</p></div>
      </div>
      {missedCards.length > 0 && (
        <div className="mt-5">
          <h3 className="font-bold">{labels?.missedCards ?? "Missed cards"}</h3>
          <ul className="mt-2 grid gap-2 text-sm text-pu3nte-secondary">
            {missedCards.map((card) => <li key={card.id}>{card.term} · {card.definition}</li>)}
          </ul>
          <GradientButton className="mt-4" onClick={onRetry}>{labels?.retryMissedCards ?? "Retry missed cards"}</GradientButton>
        </div>
      )}
      {onFinish && <GradientButton className="mt-5 w-full" onClick={onFinish}>{labels?.finishReturnSkool ?? "Finish and return to Skool"}</GradientButton>}
    </div>
  );
}
