import { useRef, useState } from "react";
import type { FlashcardItem } from "../../types";
import { compareAnswers, type SensitivityMode } from "../../utils/answer";
import { GradientButton } from "../ui/GradientButton";
import { SpecialCharacterKeyboard } from "./SpecialCharacterKeyboard";

export function TypedAnswerQuestion({
  card,
  direction,
  characters,
  accentMode,
  punctuationMode,
  onResult,
  labels,
}: {
  card: FlashcardItem;
  direction: "term-definition" | "definition-term";
  characters: string[];
  accentMode: SensitivityMode;
  punctuationMode: SensitivityMode;
  onResult: (correct: boolean) => void;
  labels?: {
    typeAnswer?: string;
    yourAnswer?: string;
    check?: string;
    correctOverride?: string;
    dontKnow?: string;
    correct?: string;
    almostCheckPunctuation?: string;
    almostCheckAccents?: string;
    incorrectReviewAnswer?: string;
  };
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const prompt = direction === "term-definition" ? card.term : card.definition;
  const correct = direction === "term-definition" ? card.definition : card.term;

  function submit() {
    const result = compareAnswers(answer, correct, {
      acceptedAnswers: card.acceptedAnswers,
      accentSensitive: accentMode,
      punctuationSensitive: punctuationMode,
    });
    setFeedback(
      result.isCorrect
        ? labels?.correct ?? result.feedbackMessage
        : result.isAlmostCorrect && result.punctuationIssues.length
          ? labels?.almostCheckPunctuation ?? result.feedbackMessage
          : result.isAlmostCorrect && result.missingAccents.length
            ? labels?.almostCheckAccents ?? result.feedbackMessage
            : labels?.incorrectReviewAnswer ?? result.feedbackMessage,
    );
    onResult(result.isCorrect || result.isAlmostCorrect);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{labels?.typeAnswer ?? "Type the answer"}</p>
      <h2 className="text-3xl font-extrabold">{prompt}</h2>
      <label className="block text-sm font-semibold text-pu3nte-secondary" htmlFor="typed-answer">{labels?.yourAnswer ?? "Your answer"}</label>
      <input
        ref={inputRef}
        id="typed-answer"
        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-lg text-pu3nte-text"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && submit()}
      />
      <SpecialCharacterKeyboard characters={characters} inputRef={inputRef} onChange={setAnswer} />
      <div className="flex flex-wrap gap-3">
        <GradientButton onClick={submit}>{labels?.check ?? "Check"}</GradientButton>
        <GradientButton variant="ghost" onClick={() => onResult(true)}>{labels?.correctOverride ?? "I was correct"}</GradientButton>
        <GradientButton variant="ghost" onClick={() => onResult(false)}>{labels?.dontKnow ?? "I don't know"}</GradientButton>
      </div>
      {feedback && <p className="rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-pu3nte-secondary" aria-live="polite">{feedback}</p>}
    </div>
  );
}
