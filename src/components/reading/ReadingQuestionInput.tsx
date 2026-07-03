import type { CheckpointQuestion } from "../../types";
import { useShuffledOptions } from "../../hooks/useShuffledOptions";
import { TypedLanguageInput } from "../practice/TypedLanguageInput";
import { QuizOption } from "../quiz/QuizOption";
import { OrderWordsInput } from "./OrderWordsInput";

export function ReadingQuestionInput({
  question,
  value,
  onChange,
  characters,
  answerLabel = "Answer",
  answerPlaceholder = "Type your answer...",
  orderWordsEmptyLabel,
}: {
  question: CheckpointQuestion;
  value: string;
  onChange: (value: string) => void;
  characters: string[];
  answerLabel?: string;
  answerPlaceholder?: string;
  orderWordsEmptyLabel?: string;
}) {
  const shuffledOptions = useShuffledOptions(question.options ?? [], question.id);

  if (question.type === "multiple-choice" || question.type === "true-false") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-pu3nte-secondary">{question.prompt}</p>
        <div className="grid gap-2">
          {shuffledOptions.map((option) => (
            <QuizOption
              key={option}
              option={option}
              selected={value === option}
              correct={option === question.correctAnswer}
              onClick={() => onChange(option)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "order-words") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-pu3nte-secondary">{question.prompt}</p>
        <OrderWordsInput
          words={question.wordBank ?? question.correctAnswer?.split(/\s+/) ?? []}
          selectedWords={value ? value.split(/\s+/) : []}
          onChange={(words) => onChange(words.join(" "))}
          emptyLabel={orderWordsEmptyLabel}
        />
      </div>
    );
  }

  return (
    <TypedLanguageInput
      id={`reading-answer-${question.id}`}
      label={`${question.prompt} · ${answerLabel}`}
      value={value}
      onChange={onChange}
      characters={characters}
      placeholder={answerPlaceholder}
    />
  );
}
