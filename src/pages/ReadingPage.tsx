import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readingComprehensions } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { ReadingText } from "../components/reading/ReadingText";
import { ReadingSettings } from "../components/reading/ReadingSettings";
import { ReadingQuestionInput } from "../components/reading/ReadingQuestionInput";
import { SyncedReadingAudioPlayer } from "../components/reading/SyncedReadingAudioPlayer";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { NotFoundPage } from "./NotFoundPage";
import { compareAnswers, getSpecialCharactersForLanguage } from "../utils/answer";
import { getUiLanguage, uiText } from "../utils/uiText";
import type { CheckpointQuestion } from "../types";

function isReadingAnswerCorrect(question: CheckpointQuestion, answer: string) {
  const expected = question.correctAnswer ?? question.correctAnswers?.[0] ?? "";
  const result = compareAnswers(answer, expected, {
    acceptedAnswers: question.correctAnswers,
    accentSensitive: "forgiving",
    punctuationSensitive: question.type === "order-words" ? "ignore" : "forgiving",
  });
  return result.isCorrect || result.isAlmostCorrect;
}

export function ReadingPage() {
  const { readingId } = useParams();
  const navigate = useNavigate();
  const reading = readingComprehensions.find((item) => item.id === readingId);
  const [fontSize, setFontSize] = useState(18);
  const [focus, setFocus] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (reading) markOpened(reading.id, reading.activityType, reading.title);
  }, [reading]);

  if (!reading) return <NotFoundPage />;
  const copy = uiText(getUiLanguage(reading.languageTarget, reading.learnerNativeLanguage));
  const specialCharacters = getSpecialCharactersForLanguage(reading.languageTarget);

  function check() {
    const activeReading = reading!;
    const nextResults = Object.fromEntries(
      activeReading.data.questions.map((question) => [question.id, isReadingAnswerCorrect(question, answers[question.id] ?? "")]),
    );
    setResults(nextResults);
    const correct = Object.values(nextResults).filter(Boolean).length;
    const nextScore = Math.round((correct / activeReading.data.questions.length) * 100);
    setScore(nextScore);
    const progress = getProgress();
    saveProgress({
      ...progress,
      readingScores: { ...progress.readingScores, [activeReading.id]: { bestScore: Math.max(progress.readingScores[activeReading.id]?.bestScore ?? 0, nextScore), lastScore: nextScore, updatedAt: new Date().toISOString() } },
      percentages: { ...progress.percentages, [activeReading.id]: nextScore },
    });
    if (nextScore >= 70) markCompleted(activeReading.id, nextScore);
    navigate(`/complete/${activeReading.id}?score=${nextScore}`);
  }

  return (
    <PageContainer className={focus ? "max-w-3xl" : ""}>
      <ActivityHeader {...reading} />
      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <GlassCard className="min-w-0 space-y-5 overflow-hidden">
          <InstructionPanel title={copy.instructions} body={copy.readingGuide} />
          <ReadingSettings fontSize={fontSize} setFontSize={setFontSize} focus={focus} setFocus={setFocus} labels={{ focusMode: copy.focusMode }} />
          {reading.data.audioUrl && reading.data.audioAlignmentUrl && (
            <SyncedReadingAudioPlayer audioUrl={reading.data.audioUrl} alignmentUrl={reading.data.audioAlignmentUrl} />
          )}
          <ReadingText paragraphs={reading.data.paragraphs} fontSize={fontSize} labels={{ showTranslation: copy.showTranslation, hideTranslation: copy.hideTranslation, shadow: copy.shadow }} />
          <div className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <h2 className="font-bold">{copy.comprehension}</h2>
            <div className="mt-4 grid gap-4">
              {reading.data.questions.map((question) => (
                <div key={question.id} className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <ReadingQuestionInput
                  key={question.id}
                  question={question}
                  value={answers[question.id] ?? ""}
                  onChange={(next) => setAnswers((value) => ({ ...value, [question.id]: next }))}
                  characters={specialCharacters}
                  answerLabel={copy.answer}
                  answerPlaceholder={copy.typeAnswer}
                  orderWordsEmptyLabel={copy.tapWordTiles}
                />
                {score !== null && (
                  <div className={`mt-3 rounded-md border p-3 text-sm ${results[question.id] ? "border-pu3nte-success/40 bg-pu3nte-success/10" : "border-pu3nte-error/40 bg-pu3nte-error/10"}`}>
                    <p className="font-bold text-pu3nte-text">{results[question.id] ? copy.correct : copy.incorrect}</p>
                    <p className="mt-1 text-pu3nte-secondary">{question.explanation}</p>
                    {!results[question.id] && question.correctAnswer && <p className="mt-1 text-pu3nte-secondary">{copy.answer}: {question.correctAnswer}</p>}
                  </div>
                )}
                </div>
              ))}
            </div>
            <GradientButton className="mt-4" onClick={check}>{copy.checkAnswers}</GradientButton>
            {score !== null && <p className="mt-3 text-sm text-pu3nte-secondary" aria-live="polite">Reading score: {score}%</p>}
          </div>
        </GlassCard>
        <GlassCard className="min-w-0 overflow-hidden">
          <h2 className="font-bold">{copy.newVocabulary}</h2>
          <ul className="mt-3 grid min-w-0 gap-2 text-sm text-pu3nte-secondary">
            {reading.data.glossary.map((item) => <li key={item.phrase} className="min-w-0 break-words"><strong className="text-pu3nte-text">{item.phrase}</strong>: {item.meaning}</li>)}
          </ul>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
