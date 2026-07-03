import type { FlashcardItem } from "../../types";
import { generateMultipleChoiceOptions } from "../../utils/study";

export function MultipleChoiceQuestion({
  card,
  cards,
  direction,
  selected,
  onAnswer,
  labels,
}: {
  card: FlashcardItem;
  cards: FlashcardItem[];
  direction: "term-definition" | "definition-term";
  selected?: string;
  onAnswer: (answer: string, correct: boolean) => void;
  labels?: { chooseMatch?: string; correctAnswer?: string };
}) {
  const prompt = direction === "term-definition" ? card.term : card.definition;
  const correct = direction === "term-definition" ? card.definition : card.term;
  const options = generateMultipleChoiceOptions(card, cards, direction);
  return (
    <div className="space-y-4">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{labels?.chooseMatch ?? "Choose the match"}</p>
      <h2 className="text-3xl font-extrabold">{prompt}</h2>
      <div className="grid gap-3">
        {options.map((option) => {
          const wasSelected = selected === option;
          const isCorrect = option === correct;
          return (
            <button
              key={option}
              type="button"
              disabled={Boolean(selected)}
              onClick={() => onAnswer(option, isCorrect)}
              className={`rounded-lg border p-4 text-left font-semibold transition ${
                wasSelected
                  ? isCorrect
                    ? "border-pu3nte-success bg-pu3nte-success/10"
                    : "border-pu3nte-error bg-pu3nte-error/10"
                  : "border-white/10 bg-white/[0.04] hover:border-pu3nte-cyan/50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && <p className="text-sm text-pu3nte-secondary">{labels?.correctAnswer ?? "Correct answer"}: {correct}</p>}
    </div>
  );
}
