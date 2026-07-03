import { useMemo } from "react";
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
  labels?: { chooseMatch?: string; correctAnswer?: string; correct?: string; incorrect?: string };
}) {
  const prompt = direction === "term-definition" ? card.term : card.definition;
  const correct = direction === "term-definition" ? card.definition : card.term;
  const options = useMemo(() => generateMultipleChoiceOptions(card, cards, direction), [card, cards, direction]);
  const selectedIsCorrect = selected === correct;
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
                selected && isCorrect
                  ? "border-pu3nte-success bg-pu3nte-success/15 text-white shadow-[0_0_24px_rgba(34,197,94,0.16)]"
                  : wasSelected
                    ? "border-pu3nte-error bg-pu3nte-error/15 text-white shadow-[0_0_24px_rgba(239,68,68,0.16)]"
                  : "border-white/10 bg-white/[0.04] hover:border-pu3nte-cyan/50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected && (
        <div
          className={`rounded-xl border p-4 ${
            selectedIsCorrect
              ? "border-pu3nte-success/60 bg-pu3nte-success/10"
              : "border-pu3nte-error/60 bg-pu3nte-error/10"
          }`}
          aria-live="polite"
        >
          <p className={`text-lg font-black ${selectedIsCorrect ? "text-pu3nte-success" : "text-pu3nte-error"}`}>
            {selectedIsCorrect ? labels?.correct ?? "Correct." : labels?.incorrect ?? "Incorrect."}
          </p>
          {!selectedIsCorrect && (
            <p className="mt-2 text-pu3nte-secondary">
              {labels?.correctAnswer ?? "Correct answer"}: <span className="font-bold text-white">{correct}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
