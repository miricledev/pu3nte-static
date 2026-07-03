import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { grammarMasteryLessons } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { ProgressBar } from "../components/ui/ProgressBar";
import { BridgeDivider } from "../components/ui/BridgeDivider";
import { GrammarIntroCard } from "../components/grammar/GrammarIntroCard";
import { GrammarSectionStepper } from "../components/grammar/GrammarSectionStepper";
import { GrammarFeedbackPanel } from "../components/grammar/GrammarFeedbackPanel";
import { GrammarQuestionRenderer, checkGrammarItem, type GrammarQuestionResult } from "../components/grammar/GrammarQuestionRenderer";
import { GrammarResultsScreen } from "../components/grammar/GrammarResultsScreen";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { getUiLanguage, uiText } from "../utils/uiText";
import { NotFoundPage } from "./NotFoundPage";
import type { GrammarExerciseItem } from "../types";

type GrammarStage = "intro" | "practice" | "results";

export function GrammarMasteryPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = grammarMasteryLessons.find((item) => item.id === lessonId);
  const [stage, setStage] = useState<GrammarStage>("intro");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<GrammarQuestionResult>();
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [mistakes, setMistakes] = useState<GrammarExerciseItem[]>([]);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [weakSkillTags, setWeakSkillTags] = useState<Record<string, number>>({});
  const [weakGrammarFocus, setWeakGrammarFocus] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>();

  useEffect(() => {
    if (lesson) {
      markOpened(lesson.id, lesson.activityType, lesson.title);
      saveGrammarProgress({ currentSection: lesson.data.sections[0]?.id });
    }
  }, [lesson]);

  const sections = useMemo(() => {
    if (!lesson) return [];
    return lesson.data.finalChallenge ? [...lesson.data.sections, lesson.data.finalChallenge] : lesson.data.sections;
  }, [lesson]);

  useEffect(() => {
    const section = sections[sectionIndex];
    setTimeLeft(section?.timerSeconds);
  }, [itemIndex, sectionIndex, sections]);

  useEffect(() => {
    if (stage !== "practice" || !timeLeft || feedback) return;
    const id = window.setTimeout(() => {
      setTimeLeft((value) => {
        if (!value || value <= 1) {
          recordResult({ correct: false, almost: false, message: "Time is up. Review the answer and keep going." });
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearTimeout(id);
  }, [feedback, stage, timeLeft]);

  if (!lesson || !sections.length) return <NotFoundPage />;

  const copy = uiText(getUiLanguage(lesson.languageTarget, lesson.learnerNativeLanguage));
  const currentSection = sections[sectionIndex];
  const currentItem = currentSection.items[itemIndex];
  const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0);
  const answeredItems = sections.slice(0, sectionIndex).reduce((sum, section) => sum + section.items.length, 0) + itemIndex;
  const progressValue = stage === "results" ? 100 : Math.round((answeredItems / Math.max(1, totalItems)) * 100);
  const score = Math.round((stats.correct / Math.max(1, stats.correct + stats.incorrect)) * 100);

  function saveGrammarProgress(update: Partial<NonNullable<ReturnType<typeof getProgress>["grammarMastery"][string]>>) {
    if (!lesson) return;
    const progress = getProgress();
    const previous = progress.grammarMastery[lesson.id] ?? {
      startedAt: new Date().toISOString(),
      completedSections: [],
      itemAttempts: {},
      correct: 0,
      incorrect: 0,
      bestScore: 0,
      latestScore: 0,
      weakSkillTags: {},
      weakGrammarFocus: {},
      updatedAt: new Date().toISOString(),
    };
    saveProgress({
      ...progress,
      grammarMastery: {
        ...progress.grammarMastery,
        [lesson.id]: {
          ...previous,
          ...update,
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }

  function recordResult(result: GrammarQuestionResult) {
    const activeLesson = lesson!;
    if (feedback) return;
    setFeedback(result);
    const correctIncrement = result.correct ? 1 : 0;
    const incorrectIncrement = result.correct ? 0 : 1;
    const nextStats = { correct: stats.correct + correctIncrement, incorrect: stats.incorrect + incorrectIncrement };
    const nextMistakes = result.correct ? mistakes : [...mistakes, currentItem];
    const nextWeakSkillTags = result.correct || !currentItem.skillTag
      ? weakSkillTags
      : { ...weakSkillTags, [currentItem.skillTag]: (weakSkillTags[currentItem.skillTag] ?? 0) + 1 };
    const nextWeakGrammarFocus = result.correct || !currentItem.grammarFocus
      ? weakGrammarFocus
      : { ...weakGrammarFocus, [currentItem.grammarFocus]: (weakGrammarFocus[currentItem.grammarFocus] ?? 0) + 1 };
    const latestScore = Math.round((nextStats.correct / Math.max(1, nextStats.correct + nextStats.incorrect)) * 100);

    setStats(nextStats);
    setMistakes(nextMistakes);
    setWeakSkillTags(nextWeakSkillTags);
    setWeakGrammarFocus(nextWeakGrammarFocus);
    const savedProgress = getProgress().grammarMastery[activeLesson.id];
    saveGrammarProgress({
      currentSection: currentSection.id,
      itemAttempts: {
        ...(savedProgress?.itemAttempts ?? {}),
        [currentItem.id]: (savedProgress?.itemAttempts[currentItem.id] ?? 0) + 1,
      },
      correct: nextStats.correct,
      incorrect: nextStats.incorrect,
      latestScore,
      bestScore: Math.max(savedProgress?.bestScore ?? 0, latestScore),
      weakSkillTags: nextWeakSkillTags,
      weakGrammarFocus: nextWeakGrammarFocus,
    });
  }

  function checkCurrentAnswer() {
    recordResult(checkGrammarItem(currentItem, answer, copy));
  }

  function overrideCorrect() {
    recordResult({ correct: true, almost: false, message: "Marked correct by learner override." });
  }

  function showAnswer() {
    setAnswer(currentItem.targetAnswer ?? currentItem.correctOption ?? currentItem.correctOptions?.[0] ?? "");
    setFeedback({ correct: false, almost: false, message: "Answer revealed. Review it, then continue." });
  }

  function goNext() {
    const activeLesson = lesson!;
    const sectionDone = itemIndex >= currentSection.items.length - 1;
    if (!sectionDone) {
      setItemIndex((value) => value + 1);
      setAnswer("");
      setFeedback(undefined);
      return;
    }

    const nextCompletedSections = Array.from(new Set([...completedSections, currentSection.id]));
    setCompletedSections(nextCompletedSections);
    saveGrammarProgress({ completedSections: nextCompletedSections });

    if (sectionIndex >= sections.length - 1) {
      const finalScore = Math.round((stats.correct / Math.max(1, stats.correct + stats.incorrect)) * 100);
      saveGrammarProgress({
        completedAt: new Date().toISOString(),
        completedSections: nextCompletedSections,
        latestScore: finalScore,
        bestScore: Math.max(getProgress().grammarMastery[activeLesson.id]?.bestScore ?? 0, finalScore),
      });
      markCompleted(activeLesson.id, finalScore);
      setStage("results");
      return;
    }

    setSectionIndex((value) => value + 1);
    setItemIndex(0);
    setAnswer("");
    setFeedback(undefined);
    saveGrammarProgress({ currentSection: sections[sectionIndex + 1].id, completedSections: nextCompletedSections });
  }

  function restart() {
    setStage("intro");
    setSectionIndex(0);
    setItemIndex(0);
    setAnswer("");
    setFeedback(undefined);
    setStats({ correct: 0, incorrect: 0 });
    setMistakes([]);
    setCompletedSections([]);
    setWeakSkillTags({});
    setWeakGrammarFocus({});
  }

  function retryWeak() {
    setStage("practice");
    setSectionIndex(0);
    setItemIndex(0);
    setAnswer("");
    setFeedback(undefined);
  }

  return (
    <PageContainer>
      <ActivityHeader {...lesson} />
      <InstructionPanel title={copy.instructions} body={lesson.data.intro.shortExplanation} />
      <div className="mt-4">
        <ProgressBar value={progressValue} label={stage === "intro" ? copy.readyToStart : `${copy.grammarProgress} · ${score}%`} />
      </div>
      <div className="mt-6">
        {stage === "intro" && (
          <GrammarIntroCard
            intro={lesson.data.intro}
            labels={{ understandPattern: copy.understandPattern, grammarSnapshot: copy.grammarSnapshot, startPractice: copy.startPractice, commonMistake: copy.commonMistake }}
            onStart={() => setStage("practice")}
          />
        )}
        {stage === "practice" && (
          <div className="space-y-5">
            <GrammarSectionStepper sections={sections} currentIndex={sectionIndex} stepLabel={copy.step} />
            <GlassCard className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-pu3nte-secondary">{currentSection.type}</span>
                  {currentSection.timerSeconds && <span className="rounded-full border border-pu3nte-warning/30 bg-pu3nte-warning/10 px-3 py-1 text-xs font-bold">{timeLeft ?? currentSection.timerSeconds}s left</span>}
                </div>
                <h2 className="mt-3 text-2xl font-extrabold">{currentSection.title}</h2>
                <p className="mt-2 text-pu3nte-secondary">{currentSection.instructions}</p>
              </div>
              <BridgeDivider />
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                {currentItem.context && <p className="mb-3 text-sm text-pu3nte-secondary">{currentItem.context}</p>}
                {currentItem.sourceSentence && <p className="mb-3 rounded-md border border-pu3nte-red/25 bg-pu3nte-red/10 p-3 font-bold">{currentItem.sourceSentence}</p>}
                {currentItem.dialogue && (
                  <div className="mb-3 rounded-md border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-3 text-sm">
                    {currentItem.dialogue.before && <p>{currentItem.dialogue.before}</p>}
                    {currentItem.dialogue.after && <p>{currentItem.dialogue.after}</p>}
                  </div>
                )}
                <h3 className="text-xl font-bold">{currentItem.prompt}</h3>
                {currentItem.hint && <p className="mt-2 text-sm text-pu3nte-muted">{copy.hint}: {currentItem.hint}</p>}
                <div className="mt-5">
                  <GrammarQuestionRenderer
                    item={currentItem}
                    sectionType={currentSection.type}
                    targetLanguage={lesson.languageTarget}
                    value={answer}
                    disabled={Boolean(feedback)}
                    onValueChange={setAnswer}
                    onResult={recordResult}
                    labels={copy}
                  />
                </div>
              </div>
              {!feedback && !currentItem.options?.length && !currentItem.pairs && (
                <div className="flex flex-wrap gap-3">
                  <GradientButton disabled={!answer.trim()} onClick={checkCurrentAnswer}>{copy.check}</GradientButton>
                  <GradientButton variant="ghost" onClick={showAnswer}>{copy.showAnswer}</GradientButton>
                </div>
              )}
              {feedback && (
                <>
                  <GrammarFeedbackPanel
                    tone={feedback.correct ? (feedback.almost ? "almost" : "correct") : "incorrect"}
                    title={feedback.correct ? (feedback.almost ? copy.almost : copy.correct) : copy.incorrect}
                    message={feedback.message}
                    explanation={currentItem.explanation}
                  />
                  <div className="flex flex-wrap gap-3">
                    {!feedback.correct && <GradientButton variant="ghost" onClick={overrideCorrect}>{copy.iWasCorrect}</GradientButton>}
                    <GradientButton onClick={goNext}>{sectionIndex === sections.length - 1 && itemIndex === currentSection.items.length - 1 ? copy.seeResults : copy.next}</GradientButton>
                  </div>
                </>
              )}
            </GlassCard>
          </div>
        )}
        {stage === "results" && (
          <GrammarResultsScreen
            correct={stats.correct}
            incorrect={stats.incorrect}
            completedSections={completedSections.length}
            mistakes={mistakes}
            weakSkillTags={weakSkillTags}
            completionMessage={lesson.data.completionMessage}
            labels={copy}
            onRetryWeak={retryWeak}
            onRestart={restart}
            onFinish={() => navigate(`/complete/${lesson.id}?score=${score}`)}
          />
        )}
      </div>
    </PageContainer>
  );
}
