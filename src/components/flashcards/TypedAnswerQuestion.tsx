import { useEffect, useRef, useState } from "react";
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
    correctAnswer?: string;
    next?: string;
    typeCorrectToContinue?: string;
    correctionPracticePlaceholder?: string;
    correctionNotYet?: string;
  };
}) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [checkedResult, setCheckedResult] = useState<boolean | null>(null);
  const [correctionAnswer, setCorrectionAnswer] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const correctionInputRef = useRef<HTMLInputElement>(null);
  const prompt = direction === "term-definition" ? card.term : card.definition;
  const correct = direction === "term-definition" ? card.definition : card.term;
  const correctionComparison = compareAnswers(correctionAnswer, correct, {
    accentSensitive: accentMode,
    punctuationSensitive: punctuationMode,
  });
  const needsCorrectionPractice = checkedResult === false;
  const correctionAccepted = !needsCorrectionPractice || correctionComparison.isCorrect || correctionComparison.isAlmostCorrect;

  useEffect(() => {
    setAnswer("");
    setFeedback("");
    setCheckedResult(null);
    setCorrectionAnswer("");
  }, [card.id, direction]);

  function submit() {
    if (!answer.trim()) return;
    const result = compareAnswers(answer, correct, {
      acceptedAnswers: direction === "term-definition" ? card.acceptedAnswers : undefined,
      accentSensitive: accentMode,
      punctuationSensitive: punctuationMode,
    });
    const accepted = result.isCorrect || result.isAlmostCorrect;
    setFeedback(
      result.isCorrect
        ? labels?.correct ?? result.feedbackMessage
        : result.isAlmostCorrect && result.punctuationIssues.length
          ? labels?.almostCheckPunctuation ?? result.feedbackMessage
          : result.isAlmostCorrect && result.missingAccents.length
            ? labels?.almostCheckAccents ?? result.feedbackMessage
            : labels?.incorrectReviewAnswer ?? result.feedbackMessage,
    );
    setCheckedResult(accepted);
    if (accepted) setCorrectionAnswer("");
  }

  function revealDontKnow() {
    setFeedback(labels?.incorrectReviewAnswer ?? "Incorrect. Review the correct answer and try it again later.");
    setCheckedResult(false);
    setCorrectionAnswer("");
    requestAnimationFrame(() => correctionInputRef.current?.focus());
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
        disabled={checkedResult !== null}
      />
      <SpecialCharacterKeyboard characters={characters} inputRef={inputRef} onChange={setAnswer} />
      <div className="flex flex-wrap gap-3">
        {checkedResult === null ? (
          <>
            <GradientButton onClick={submit} disabled={!answer.trim()}>{labels?.check ?? "Check"}</GradientButton>
            <GradientButton variant="ghost" onClick={() => onResult(true)}>{labels?.correctOverride ?? "I was correct"}</GradientButton>
            <GradientButton variant="ghost" onClick={revealDontKnow}>{labels?.dontKnow ?? "I don't know"}</GradientButton>
          </>
        ) : (
          <GradientButton onClick={() => onResult(checkedResult)} disabled={!correctionAccepted}>{labels?.next ?? "Next"}</GradientButton>
        )}
      </div>
      {feedback && (
        <div
          className={`rounded-xl border p-4 ${
            checkedResult ? "border-pu3nte-success/60 bg-pu3nte-success/10" : "border-pu3nte-error/60 bg-pu3nte-error/10"
          }`}
          aria-live="polite"
        >
          <p className={`text-lg font-black ${checkedResult ? "text-pu3nte-success" : "text-pu3nte-error"}`}>{feedback}</p>
          {!checkedResult && (
            <div className="mt-3 space-y-3">
              <p className="text-pu3nte-secondary">
                {labels?.correctAnswer ?? "Correct answer"}: <span className="font-bold text-white">{correct}</span>
              </p>
              <label className="block text-sm font-bold text-pu3nte-secondary" htmlFor="correction-answer">
                {labels?.typeCorrectToContinue ?? "Type the correct answer once to unlock Next."}
              </label>
              <input
                ref={correctionInputRef}
                id="correction-answer"
                className={`w-full rounded-lg border bg-white/[0.06] px-4 py-3 text-lg text-pu3nte-text ${
                  correctionAnswer && !correctionAccepted ? "border-pu3nte-error" : "border-white/10"
                }`}
                value={correctionAnswer}
                onChange={(event) => setCorrectionAnswer(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && correctionAccepted && onResult(false)}
                placeholder={labels?.correctionPracticePlaceholder ?? "Type the correct answer here..."}
              />
              <SpecialCharacterKeyboard characters={characters} inputRef={correctionInputRef} onChange={setCorrectionAnswer} />
              {correctionAnswer && !correctionAccepted && (
                <p className="text-sm font-semibold text-pu3nte-error">
                  {labels?.correctionNotYet ?? "Not yet — copy the correct answer exactly, then press Next."}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
