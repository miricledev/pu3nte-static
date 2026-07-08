import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkpointQuizzes } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { ProgressBar } from "../components/ui/ProgressBar";
import { QuizQuestion } from "../components/quiz/QuizQuestion";
import { QuizOption } from "../components/quiz/QuizOption";
import { FillBlankInput } from "../components/quiz/FillBlankInput";
import { MatchPairsQuestion } from "../components/quiz/MatchPairsQuestion";
import { OrderWordsInput } from "../components/reading/OrderWordsInput";
import { QuizResults } from "../components/quiz/QuizResults";
import { MistakeReview } from "../components/quiz/MistakeReview";
import { compareAnswers, getSpecialCharactersForLanguage, type AnswerComparison } from "../utils/answer";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { getUiLanguage, uiText } from "../utils/uiText";
import { useShuffledOptions } from "../hooks/useShuffledOptions";
import { NotFoundPage } from "./NotFoundPage";

function getFeedbackFromComparison(result: AnswerComparison, copy: ReturnType<typeof uiText>) {
  const message = result.isCorrect
    ? copy.correct
    : result.isAlmostCorrect && result.punctuationIssues.length
      ? copy.almostCheckPunctuation
      : result.isAlmostCorrect && result.missingAccents.length
        ? copy.almostCheckAccents
        : copy.incorrectReviewAnswer;
  if (result.isCorrect) {
    return { tone: "correct" as const, title: copy.correct, message };
  }
  if (result.isAlmostCorrect) {
    return { tone: "almost" as const, title: copy.almost, message };
  }
  return { tone: "incorrect" as const, title: copy.incorrect, message };
}

export function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = checkpointQuizzes.find((item) => item.id === quizId);
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<string>();
  const [quizFeedback, setQuizFeedback] = useState<{
    tone: "correct" | "almost" | "incorrect";
    title: string;
    message: string;
  }>();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (quiz) markOpened(quiz.id, quiz.activityType, quiz.title);
  }, [quiz]);

  if (!quiz) return <NotFoundPage />;
  const copy = uiText(getUiLanguage(quiz.languageTarget, quiz.learnerNativeLanguage));
  const question = quiz.data.questions[index];
  const correctCount = Object.values(answers).filter(Boolean).length;
  const score = Math.round((correctCount / quiz.data.questions.length) * 100);
  const passed = score >= quiz.data.passScore;
  const mistakes = quiz.data.questions.filter((item) => answers[item.id] === false);
  const specialCharacters = getSpecialCharactersForLanguage(quiz.languageTarget);
  const isTypedQuestion = question.type !== "match-pairs" && !question.options;
  const shuffledOptions = useShuffledOptions(question.options ?? [], question.id);
  const selectedWordTiles = typed ? typed.split(/\s+/).filter(Boolean) : [];

  function answer(value: string) {
    const correctAnswer = question.correctAnswer ?? question.correctAnswers?.[0] ?? "";
    const result = compareAnswers(value, correctAnswer, { acceptedAnswers: question.correctAnswers, accentSensitive: "forgiving", punctuationSensitive: "ignore" });
    setAnswers((previous) => ({ ...previous, [question.id]: result.isCorrect || result.isAlmostCorrect }));
    setSelected(value);
    setQuizFeedback(getFeedbackFromComparison(result, copy));
  }

  function answerBoolean(correct: boolean) {
    setAnswers((previous) => ({ ...previous, [question.id]: correct }));
    setSelected(correct ? "correct" : "incorrect");
    setQuizFeedback({
      tone: correct ? "correct" : "incorrect",
      title: correct ? copy.correct : copy.incorrect,
      message: correct ? copy.niceMatch : copy.review,
    });
  }

  function checkTypedAnswer() {
    if (!typed.trim()) return;
    answer(typed);
  }

  function next() {
    const activeQuiz = quiz!;
    setTyped("");
    setSelected(undefined);
    setQuizFeedback(undefined);
    if (index === activeQuiz.data.questions.length - 1) {
      setDone(true);
      const progress = getProgress();
      saveProgress({
        ...progress,
        quizScores: { ...progress.quizScores, [activeQuiz.id]: { bestScore: Math.max(progress.quizScores[activeQuiz.id]?.bestScore ?? 0, score), lastScore: score, passed, updatedAt: new Date().toISOString() } },
      });
      if (passed) markCompleted(activeQuiz.id);
      navigate(`/complete/${activeQuiz.id}?score=${score}`);
    } else setIndex((value) => value + 1);
  }

  return (
    <PageContainer>
      <ActivityHeader {...quiz} subtitle={quiz.data.description} />
      <GlassCard className="space-y-5">
        <InstructionPanel title={copy.instructions} body={copy.quizGuide} />
        {done ? (
          <>
            <QuizResults score={score} passed={passed} labels={copy} onRetry={() => { setIndex(0); setAnswers({}); setQuizFeedback(undefined); setDone(false); }} />
            <MistakeReview mistakes={mistakes} title={copy.reviewMistakes} />
          </>
        ) : (
          <>
            <ProgressBar value={Math.round(((index + 1) / quiz.data.questions.length) * 100)} label={`${copy.question} ${index + 1} / ${quiz.data.questions.length}`} />
            <QuizQuestion question={question} pointLabel={copy.point} />
            {question.type === "match-pairs" ? (
              <MatchPairsQuestion
                key={question.id}
                question={question}
                labels={{ guide: copy.matchPairsGuide, matched: copy.matched, complete: copy.allPairsMatched }}
                onAnswer={answerBoolean}
              />
            ) : question.options ? (
              <div className="grid gap-3">
                {shuffledOptions.map((option) => <QuizOption key={option} option={option} selected={selected === option} correct={option === question.correctAnswer} onClick={() => answer(option)} />)}
              </div>
            ) : question.type === "order-words" ? (
              <OrderWordsInput
                words={question.wordBank ?? question.correctAnswer?.split(/\s+/) ?? []}
                selectedWords={selectedWordTiles}
                onChange={(words) => setTyped(words.join(" "))}
                emptyLabel={copy.tapWordTiles}
              />
            ) : (
              <FillBlankInput value={typed} onChange={setTyped} onSubmit={checkTypedAnswer} characters={specialCharacters} label={copy.answer} placeholder={copy.typeAnswer} />
            )}
            {quizFeedback && (
              <div
                className={`rounded-md border p-3 text-sm ${
                  quizFeedback.tone === "correct"
                    ? "border-pu3nte-success/40 bg-pu3nte-success/10"
                    : quizFeedback.tone === "almost"
                      ? "border-pu3nte-warning/40 bg-pu3nte-warning/10"
                      : "border-pu3nte-error/40 bg-pu3nte-error/10"
                }`}
                aria-live="polite"
              >
                <p className="font-bold text-pu3nte-text">{quizFeedback.title}</p>
                <p className="mt-1 text-pu3nte-secondary">{quizFeedback.message}</p>
                <p className="mt-2 text-pu3nte-secondary">{question.explanation}</p>
              </div>
            )}
            {isTypedQuestion && !selected ? (
              <GradientButton disabled={!typed.trim()} onClick={checkTypedAnswer}>{copy.check}</GradientButton>
            ) : (
              <GradientButton disabled={!selected} onClick={next}>{index === quiz.data.questions.length - 1 ? copy.finishQuiz : copy.next}</GradientButton>
            )}
          </>
        )}
      </GlassCard>
    </PageContainer>
  );
}
