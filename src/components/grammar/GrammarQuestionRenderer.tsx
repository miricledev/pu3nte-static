import type { GrammarExerciseItem, GrammarExerciseType, LanguageTarget } from "../../types";
import { compareAnswers, getSpecialCharactersForLanguage, type AnswerComparison } from "../../utils/answer";
import { useShuffledOptions } from "../../hooks/useShuffledOptions";
import { TypedLanguageInput } from "../practice/TypedLanguageInput";
import { QuizOption } from "../quiz/QuizOption";
import { MatchPairsQuestion } from "../quiz/MatchPairsQuestion";
import { OrderWordsInput } from "../reading/OrderWordsInput";

export type GrammarQuestionResult = {
  correct: boolean;
  almost: boolean;
  message: string;
};

function choiceTypes(type: GrammarExerciseType) {
  return ["recognition", "multiple-choice", "choose-explanation", "context-choice", "dialogue-completion"].includes(type);
}

function typedTypes(type: GrammarExerciseType) {
  return [
    "fill-blank",
    "typed-answer",
    "sentence-transform",
    "error-correction",
    "mini-translation",
    "tense-shift",
    "pronoun-swap",
    "negative-question-transform",
    "speed-drill",
  ].includes(type);
}

function localizedComparisonMessage(result: AnswerComparison, labels?: Record<string, string>) {
  if (result.isCorrect) return labels?.correct ?? result.feedbackMessage;
  if (result.isAlmostCorrect && result.punctuationIssues.length) return labels?.almostCheckPunctuation ?? result.feedbackMessage;
  if (result.isAlmostCorrect && result.missingAccents.length) return labels?.almostCheckAccents ?? result.feedbackMessage;
  return labels?.incorrectReviewAnswer ?? result.feedbackMessage;
}

function feedbackFromComparison(result: AnswerComparison, item: GrammarExerciseItem, labels?: Record<string, string>): GrammarQuestionResult {
  if (result.isCorrect) return { correct: true, almost: false, message: item.feedback?.correct ?? localizedComparisonMessage(result, labels) };
  if (result.isAlmostCorrect) return { correct: true, almost: true, message: item.feedback?.almost ?? localizedComparisonMessage(result, labels) };
  return { correct: false, almost: false, message: item.feedback?.incorrect ?? localizedComparisonMessage(result, labels) };
}

export function GrammarQuestionRenderer({
  item,
  sectionType,
  targetLanguage,
  value,
  disabled,
  onValueChange,
  onResult,
  labels,
}: {
  item: GrammarExerciseItem;
  sectionType: GrammarExerciseType;
  targetLanguage: LanguageTarget;
  value: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
  onResult: (result: GrammarQuestionResult) => void;
  labels?: Record<string, string>;
}) {
  const options = useShuffledOptions(item.options ?? item.correctOptions ?? [], item.id);
  const characters = getSpecialCharactersForLanguage(targetLanguage);
  const inferredType = sectionType === "mixed-review"
    ? item.pairs
      ? "match-pairs"
      : item.words
        ? "word-order"
        : item.options
          ? "multiple-choice"
          : "typed-answer"
    : sectionType;

  function checkTyped(nextValue = value) {
    const expected = item.targetAnswer ?? item.correctOption ?? item.correctOptions?.[0] ?? "";
    const result = compareAnswers(nextValue, expected, {
      acceptedAnswers: item.acceptedAnswers,
      accentSensitive: "forgiving",
      punctuationSensitive: "forgiving",
    });
    onResult(feedbackFromComparison(result, item, labels));
  }

  function choose(option: string) {
    if (disabled) return;
    onValueChange(option);
    const correctOptions = item.correctOptions ?? (item.correctOption ? [item.correctOption] : []);
    const correct = correctOptions.includes(option);
    onResult({
      correct,
      almost: false,
      message: correct ? item.feedback?.correct ?? labels?.correct ?? "Correct." : item.feedback?.incorrect ?? labels?.incorrect ?? "Incorrect.",
    });
  }

  if (inferredType === "match-pairs") {
    return (
      <MatchPairsQuestion
        question={{
          id: item.id,
          type: "match-pairs",
          prompt: item.prompt,
          pairs: item.pairs,
          explanation: item.explanation ?? "",
          points: 1,
          skillTag: item.skillTag ?? "grammar",
        }}
        labels={{ guide: labels?.matchPairsGuide, matched: labels?.matched, complete: labels?.allPairsMatched }}
        onAnswer={(correct) => onResult({ correct, almost: false, message: correct ? labels?.correct ?? "Correct." : labels?.incorrect ?? "Incorrect." })}
      />
    );
  }

  if (inferredType === "word-order") {
    return (
      <OrderWordsInput
        words={item.words ?? item.targetAnswer?.split(/\s+/) ?? []}
        selectedWords={value ? value.split(/\s+/) : []}
        onChange={(words) => onValueChange(words.join(" "))}
        emptyLabel={labels?.tapWordTiles}
      />
    );
  }

  if (choiceTypes(inferredType) && options.length) {
    return (
      <div className="grid gap-3">
        {options.map((option) => (
          <QuizOption
            key={option}
            option={option}
            selected={value === option}
            correct={(item.correctOptions ?? [item.correctOption ?? ""]).includes(option)}
            onClick={() => choose(option)}
          />
        ))}
      </div>
    );
  }

  if (typedTypes(inferredType)) {
    return (
      <TypedLanguageInput
        id={`grammar-answer-${item.id}`}
        label={labels?.yourAnswer ?? "Your answer"}
        value={value}
        onChange={onValueChange}
        onSubmit={() => checkTyped()}
        characters={characters}
        placeholder={labels?.typeAnswer ?? "Type your answer..."}
      />
    );
  }

  return (
    <TypedLanguageInput
      id={`grammar-answer-${item.id}`}
      label={labels?.yourAnswer ?? "Your answer"}
      value={value}
      onChange={onValueChange}
      onSubmit={() => checkTyped()}
      characters={characters}
      placeholder={labels?.typeAnswer ?? "Type your answer..."}
    />
  );
}

export function checkGrammarItem(item: GrammarExerciseItem, answer: string, labels?: Record<string, string>) {
  const expected = item.targetAnswer ?? item.correctOption ?? item.correctOptions?.[0] ?? "";
  const result = compareAnswers(answer, expected, {
    acceptedAnswers: item.acceptedAnswers,
    accentSensitive: "forgiving",
    punctuationSensitive: "forgiving",
  });
  return feedbackFromComparison(result, item, labels);
}
