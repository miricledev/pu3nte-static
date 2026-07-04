import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sentenceBuilderLessons } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { SpecialCharacterKeyboard } from "../components/flashcards/SpecialCharacterKeyboard";
import { VocabGrid } from "../components/sentence-builder/VocabGrid";
import { TimerCircle } from "../components/sentence-builder/TimerCircle";
import { SentencePrompt } from "../components/sentence-builder/SentencePrompt";
import { AnswerReveal } from "../components/sentence-builder/AnswerReveal";
import { WordBreakdown } from "../components/sentence-builder/WordBreakdown";
import { StageStepper } from "../components/sentence-builder/StageStepper";
import { VocabGuideModal } from "../components/sentence-builder/VocabGuideModal";
import { compareAnswers, getSpecialCharactersForLanguage, type AnswerComparison } from "../utils/answer";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { getUiLanguage, uiText } from "../utils/uiText";
import { NotFoundPage } from "./NotFoundPage";

type StageFlow = "try" | "checked" | "shadow";

export function SentenceBuilderPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = sentenceBuilderLessons.find((item) => item.id === lessonId);
  const [stageIndex, setStageIndex] = useState(0);
  const [showVocab, setShowVocab] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(0);
  const [flow, setFlow] = useState<StageFlow>("try");
  const [checkResult, setCheckResult] = useState<AnswerComparison>();
  const [guideWord, setGuideWord] = useState<string>();
  const answerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (lesson) markOpened(lesson.id, lesson.activityType, lesson.title);
  }, [lesson]);

  if (!lesson) return <NotFoundPage />;

  const copy = uiText(getUiLanguage(lesson.languageTarget, lesson.learnerNativeLanguage));
  const stage = lesson.data.stages[stageIndex];
  const selectedGuide = stage.vocabGuide?.find((item) => item.word === guideWord);
  const specialCharacters = getSpecialCharactersForLanguage(lesson.languageTarget);

  function speakAnswer() {
    const activeLesson = lesson!;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stage.targetAnswer);
    utterance.lang = activeLesson.languageTarget === "spanish" ? "es-ES" : "en-US";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  function checkAnswer() {
    const activeLesson = lesson!;
    const result = compareAnswers(answer, stage.targetAnswer, {
      acceptedAnswers: stage.acceptedAnswers,
      accentSensitive: "forgiving",
      punctuationSensitive: "forgiving",
      languageTarget: activeLesson.languageTarget,
      allowSpanishSubjectPronounFlex: true,
    });
    setCheckResult(result);
    setShowAnswer(true);
    setFlow("checked");
    speakAnswer();
  }

  function completeStage(rating: "correct" | "almost" | "practice") {
    const activeLesson = lesson!;
    const progress = getProgress();
    const previous = progress.sentenceBuilder[activeLesson.id] ?? { attempts: 0, completedStages: [], updatedAt: new Date().toISOString() };
    const completedStages = rating === "practice" ? previous.completedStages : Array.from(new Set([...previous.completedStages, stage.id]));
    saveProgress({
      ...progress,
      sentenceBuilder: {
        ...progress.sentenceBuilder,
        [activeLesson.id]: { attempts: previous.attempts + 1, completedStages, updatedAt: new Date().toISOString() },
      },
      percentages: { ...progress.percentages, [activeLesson.id]: Math.round((completedStages.length / activeLesson.data.stages.length) * 100) },
    });
    if (stageIndex === activeLesson.data.stages.length - 1) {
      markCompleted(activeLesson.id);
      navigate(`/complete/${activeLesson.id}`);
    } else {
      setStageIndex((value) => value + 1);
      setShowVocab(false);
      setShowAnswer(false);
      setAnswer("");
      setCheckResult(undefined);
      setFlow("try");
      setGuideWord(undefined);
    }
  }

  function continueWithRating() {
    if (!checkResult) {
      completeStage("practice");
      return;
    }
    if (checkResult.isCorrect) completeStage("correct");
    else if (checkResult.isAlmostCorrect) completeStage("almost");
    else completeStage("practice");
  }

  function getLocalizedFeedbackMessage(result: AnswerComparison) {
    if (result.isCorrect) return copy.correct;
    if (result.isAlmostCorrect && result.punctuationIssues.length) return copy.almostCheckPunctuation;
    if (result.isAlmostCorrect && result.missingAccents.length) return copy.almostCheckAccents;
    return copy.incorrectReviewAnswer;
  }

  return (
    <PageContainer>
      <ActivityHeader {...lesson} />
      <GlassCard className="space-y-4 sm:space-y-5">
        <div className="hidden sm:block">
          <InstructionPanel title={copy.instructions} body={copy.sentenceGuide} />
        </div>
        <details className="rounded-lg border border-pu3nte-cyan/20 bg-pu3nte-cyan/10 p-3 sm:hidden">
          <summary className="cursor-pointer text-sm font-black text-pu3nte-cyan">{copy.instructions}</summary>
          <p className="mt-2 text-sm text-pu3nte-secondary">{copy.sentenceGuide}</p>
        </details>
        <StageStepper total={lesson.data.stages.length} current={stageIndex} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-gold">
              {copy.step} {stageIndex + 1} / {lesson.data.stages.length}
            </p>
            <h2 className="mt-1 text-xl font-bold sm:text-2xl">{stage.title}</h2>
            <p className="mt-1 text-sm text-pu3nte-secondary">
              {flow === "try" && copy.stepTry}
              {flow === "checked" && copy.stepChecked}
              {flow === "shadow" && copy.stepShadow}
            </p>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <select className="rounded-md border border-white/10 bg-pu3nte-card p-2 text-sm" value={timer} onChange={(event) => setTimer(Number(event.target.value))}>
              {[0, 10, 15, 20, 30].map((value) => <option key={value} value={value}>{value ? `${value}s` : copy.noTimer}</option>)}
            </select>
            <TimerCircle seconds={timer} active={timer > 0} />
          </div>
        </div>
        <details className="rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:hidden" open>
          <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.14em] text-pu3nte-gold">{copy.newWordsTip}</summary>
          <div className="mt-3">
            <VocabGrid words={stage.newVocab} freshWords={stage.newVocab} vocabGuide={stage.vocabGuide} guideLabel={copy.miniGuide} onOpenGuide={setGuideWord} />
          </div>
        </details>
        <div className="hidden sm:block">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-pu3nte-gold">{copy.newWordsTip}</p>
          <VocabGrid words={stage.newVocab} freshWords={stage.newVocab} vocabGuide={stage.vocabGuide} guideLabel={copy.miniGuide} onOpenGuide={setGuideWord} />
        </div>
        <SentencePrompt prompt={stage.prompt} />
        <p className="rounded-lg border border-pu3nte-gold/20 bg-pu3nte-gold/10 p-3 text-sm font-semibold text-pu3nte-secondary sm:border-0 sm:bg-transparent sm:p-0 sm:font-normal">{copy.speakThenType}</p>
        <label className="block text-sm font-semibold text-pu3nte-secondary" htmlFor="sentence-answer">{copy.yourTranslation}</label>
        <textarea
          ref={answerRef}
          id="sentence-answer"
          className="min-h-24 w-full rounded-lg border border-white/10 bg-white/[0.06] p-4 text-base text-pu3nte-text sm:min-h-28"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={copy.typeTranslation}
        />
        <SpecialCharacterKeyboard characters={specialCharacters} inputRef={answerRef} onChange={setAnswer} label={copy.specialChars} />
        <div className="grid gap-3 sm:flex sm:flex-wrap">
          <GradientButton className="w-full sm:w-auto" disabled={!answer.trim()} onClick={checkAnswer}>{copy.check}</GradientButton>
          <GradientButton className="w-full sm:w-auto" variant="ghost" onClick={() => setShowVocab(true)}>{showVocab ? copy.mixedVocabShown : copy.showMixedVocab}</GradientButton>
        </div>
        <details className="rounded-lg border border-white/10 bg-white/[0.04] p-3 sm:hidden">
          <summary className="cursor-pointer text-sm font-bold text-pu3nte-secondary">{copy.noTimer}</summary>
          <div className="mt-3 flex items-center gap-3">
            <select className="rounded-md border border-white/10 bg-pu3nte-card p-2 text-sm" value={timer} onChange={(event) => setTimer(Number(event.target.value))}>
              {[0, 10, 15, 20, 30].map((value) => <option key={value} value={value}>{value ? `${value}s` : copy.noTimer}</option>)}
            </select>
            <TimerCircle seconds={timer} active={timer > 0} />
          </div>
        </details>
        {showVocab && (
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{copy.mixedVocabBank}</p>
            <VocabGrid words={stage.fullVocab} freshWords={stage.newVocab} vocabGuide={stage.vocabGuide} guideLabel={copy.miniGuide} onOpenGuide={setGuideWord} />
          </div>
        )}
        {checkResult && (
          <div className={`rounded-lg border p-4 ${checkResult.isCorrect ? "border-pu3nte-success/40 bg-pu3nte-success/10" : checkResult.isAlmostCorrect ? "border-pu3nte-warning/40 bg-pu3nte-warning/10" : "border-pu3nte-error/40 bg-pu3nte-error/10"}`} aria-live="polite">
            <p className="font-bold">
              {checkResult.isCorrect ? copy.correct : checkResult.isAlmostCorrect ? copy.acceptedRemember : copy.notQuiteYet}
            </p>
            <p className="mt-1 text-sm text-pu3nte-secondary">{getLocalizedFeedbackMessage(checkResult)}</p>
          </div>
        )}
        {showAnswer && (
          <AnswerReveal
            answer={stage.targetAnswer}
            explanation={stage.explanation}
            label={copy.answer}
            userAnswer={answer}
            userLabel={copy.yourAnswer}
            correctLabel={copy.correctAnswer}
            comparisonLabel={copy.answerComparison}
            highlightDifferences={!checkResult?.isCorrect}
          />
        )}
        {showAnswer && <WordBreakdown items={stage.wordBreakdown} />}
        {showAnswer && (
          <div className="rounded-lg border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-4">
            <p className="font-bold">{copy.shadowingStep}</p>
            <p className="mt-1 text-sm text-pu3nte-secondary">{copy.shadowInstruction}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <GradientButton variant="ghost" onClick={speakAnswer}>{copy.playAudioAgain}</GradientButton>
              {flow !== "shadow" ? (
                <GradientButton onClick={() => setFlow("shadow")}>{copy.shadowedIt}</GradientButton>
              ) : (
                <GradientButton onClick={continueWithRating}>{copy.continueNextStage}</GradientButton>
              )}
              <GradientButton variant="ghost" onClick={() => completeStage("practice")}>{copy.markForPractice}</GradientButton>
            </div>
          </div>
        )}
      </GlassCard>
      <VocabGuideModal
        guide={selectedGuide}
        labels={{ miniGuide: copy.miniGuide, closeMiniGuide: copy.closeMiniGuide, examples: copy.examples, backToSentence: copy.backToSentence }}
        onClose={() => setGuideWord(undefined)}
      />
    </PageContainer>
  );
}
