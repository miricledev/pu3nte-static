import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flashcardDecks, whatsappStories } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { PhoneFrame } from "../components/story/PhoneFrame";
import { ChatBubble } from "../components/story/ChatBubble";
import { StoryProgress } from "../components/story/StoryProgress";
import { StorySummary } from "../components/story/StorySummary";
import { OrderWordsInput } from "../components/reading/OrderWordsInput";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { shuffleArray } from "../utils/study";
import { canUseSpeech, primeSpeech, speakText, stopSpeech } from "../utils/speech";
import { getUiLanguage, uiText } from "../utils/uiText";
import { compareAnswers } from "../utils/answer";
import { NotFoundPage } from "./NotFoundPage";

function getLearnerReadingDelay(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const punctuationPauses = (text.match(/[.,!?¿¡;]/g) ?? []).length * 350;
  return Math.min(14000, Math.max(3500, words * 850 + punctuationPauses + 1800));
}

function getQuestionWordBank(question: { correctAnswer?: string; correctAnswers?: string[]; wordBank?: string[] }) {
  return question.wordBank ?? (question.correctAnswer || question.correctAnswers?.[0] || "").split(/\s+/).filter(Boolean);
}

function getPreparationDeckId(storyId: string) {
  return storyId.startsWith("colombian-sayings-") ? "colombian-sayings-50-flashcards" : `${storyId}-flashcards`;
}

export function StoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const story = whatsappStories.find((item) => item.id === storyId);
  const saved = story ? getProgress().storyProgress[story.id] : undefined;
  const [visible, setVisible] = useState(saved?.visibleMessages ?? 1);
  const [translations, setTranslations] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [answeredChecks, setAnsweredChecks] = useState<Record<string, boolean>>({});
  const [selectedCheckOption, setSelectedCheckOption] = useState<string>();
  const [checkFeedback, setCheckFeedback] = useState("");
  const [shuffledCheckOptions, setShuffledCheckOptions] = useState<Record<string, string[]>>({});
  const [audioNotice, setAudioNotice] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = story?.data.messages.slice(0, visible) ?? [];
  const activeCheck = story?.data.comprehensionChecks?.find((check) => {
    const lastVisibleMessage = story.data.messages[visible - 1];
    return lastVisibleMessage?.id === check.afterMessageId && !answeredChecks[check.id];
  });
  const storyComplete = Boolean(story && visible >= story.data.messages.length && !activeCheck);

  useEffect(() => {
    if (story) markOpened(story.id, story.activityType, story.title);
  }, [story]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visible, activeCheck?.id]);

  useEffect(() => {
    if (!activeCheck || shuffledCheckOptions[activeCheck.id]) return;
    setShuffledCheckOptions((options) => ({
      ...options,
      [activeCheck.id]: shuffleArray(activeCheck.question.options ?? []),
    }));
  }, [activeCheck, shuffledCheckOptions]);

  useEffect(() => {
    if (!story || !audioEnabled || (autoPlay && !activeCheck)) return;
    const lastMessage = story.data.messages[visible - 1];
    if (lastMessage) speak(lastMessage.text);
    return () => stopSpeech();
  }, [activeCheck, audioEnabled, autoPlay, story, visible]);

  useEffect(() => {
    if (!story || !autoPlay || activeCheck || visible >= story.data.messages.length) return;
    const lastMessage = story.data.messages[visible - 1];
    if (!lastMessage) return;

    if (audioEnabled) {
      let nextTimer: number | undefined;
      const fallbackTimer = speak(lastMessage.text, () => {
        nextTimer = window.setTimeout(() => revealNext(), 900);
      });
      return () => {
        if (nextTimer) window.clearTimeout(nextTimer);
        fallbackTimer?.();
      };
    }

    const id = window.setTimeout(() => revealNext(), getLearnerReadingDelay(lastMessage.text));
    return () => window.clearTimeout(id);
  });

  useEffect(() => {
    if (storyComplete) setSummaryOpen(true);
  }, [storyComplete]);

  function speak(text: string, onDone?: () => void) {
    if (!story) return undefined;
    if (!canUseSpeech()) {
      setAudioNotice("This browser does not expose text-to-speech. Try Safari/Chrome, or enable speech/audio permissions.");
    } else {
      setAudioNotice("");
    }
    return speakText(text, {
      lang: story.data.targetLanguage === "spanish" ? "es-ES" : "en-US",
      rate: 0.78,
      onDone,
      fallbackDelayMs: getLearnerReadingDelay(text) + 2500,
    });
  }

  function saveStory(nextVisible: number) {
    const activeStory = story;
    if (!activeStory) return;
    const progress = getProgress();
    const lastMessage = activeStory.data.messages[nextVisible - 1];
    const pendingCheck = activeStory.data.comprehensionChecks?.find((check) => check.afterMessageId === lastMessage?.id && !answeredChecks[check.id]);
    const completed = nextVisible >= activeStory.data.messages.length && !pendingCheck;
    saveProgress({
      ...progress,
      storyProgress: { ...progress.storyProgress, [activeStory.id]: { visibleMessages: nextVisible, completed, updatedAt: new Date().toISOString() } },
      percentages: { ...progress.percentages, [activeStory.id]: Math.round((nextVisible / activeStory.data.messages.length) * 100) },
    });
    if (completed) markCompleted(activeStory.id);
  }

  function revealNext() {
    const activeStory = story;
    if (!activeStory) return;
    const next = Math.min(activeStory.data.messages.length, visible + 1);
    setSelectedCheckOption(undefined);
    setCheckFeedback("");
    setVisible(next);
    saveStory(next);
  }

  function answerCheck(option: string) {
    primeSpeech();
    if (!activeCheck) return;
    const correct =
      activeCheck.question.type === "multiple-choice" || activeCheck.question.type === "true-false"
        ? option === activeCheck.question.correctAnswer
        : compareAnswers(option, activeCheck.question.correctAnswer ?? "", {
            acceptedAnswers: activeCheck.question.correctAnswers,
            accentSensitive: "ignore",
            punctuationSensitive: "ignore",
            languageTarget: story?.languageTarget,
          }).isCorrect;
    setSelectedCheckOption(option);
    setCheckFeedback(correct ? activeCheck.question.explanation : `Not quite. ${activeCheck.question.explanation}`);
  }

  function continueAfterCheck() {
    if (!activeCheck || !story) return;
    const nextAnswered = { ...answeredChecks, [activeCheck.id]: true };
    setAnsweredChecks(nextAnswered);
    setSelectedCheckOption(undefined);
    setCheckFeedback("");
    if (visible >= story.data.messages.length) {
      const progress = getProgress();
      saveProgress({
        ...progress,
        storyProgress: { ...progress.storyProgress, [story.id]: { visibleMessages: visible, completed: true, updatedAt: new Date().toISOString() } },
        percentages: { ...progress.percentages, [story.id]: 100 },
      });
      markCompleted(story.id);
    } else {
      revealNext();
    }
  }

  if (!story) return <NotFoundPage />;
  const copy = uiText(getUiLanguage(story.languageTarget, story.learnerNativeLanguage));
  const preparationDeckId = getPreparationDeckId(story.id);
  const preparationDeck = flashcardDecks.find((deck) => deck.id === preparationDeckId || deck.relatedCourse === story.id);
  const isEnglishForSpanishSpeakers = story.languageTarget === "english" && story.learnerNativeLanguage === "spanish";

  return (
    <PageContainer>
      <ActivityHeader {...story} />
      <div className="mb-5">
        <InstructionPanel title={copy.instructions} body={copy.storyGuide} />
      </div>
      {preparationDeck && (
        <div className="mb-5 rounded-lg border border-pu3nte-gold/30 bg-pu3nte-gold/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-gold">
            {isEnglishForSpanishSpeakers ? "Historias por Chat en Inglés — A1 a C2" : "Vocabulary Prep"}
          </p>
          <h2 className="mt-2 text-xl font-bold">
            {isEnglishForSpanishSpeakers ? "Paso 1: Prepara el vocabulario" : "Step 1: Prepare the vocabulary"}
          </h2>
          <p className="mt-2 text-sm text-pu3nte-secondary">
            {isEnglishForSpanishSpeakers
              ? "Haz estas flashcards antes de leer la historia. No necesitas memorizar todo perfecto, pero intenta reconocer el vocabulario principal. Después verás estas frases dentro de la conversación."
              : "Practice these flashcards before reading the story so the key phrases feel familiar in context."}
          </p>
          <GradientButton className="mt-4" onClick={() => navigate(`/flashcards/${preparationDeck.id}`)}>
            {isEnglishForSpanishSpeakers ? "Abrir flashcards" : "Open flashcards"}
          </GradientButton>
        </div>
      )}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <PhoneFrame>
          <div className="flex h-full flex-col">
            <div className="mb-4"><StoryProgress visible={visible} total={story.data.messages.length} label={copy.messages} /></div>
            <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-2">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  character={story.data.characters.find((character) => character.id === message.speakerId)}
                  showTranslation={translations}
                  onSpeak={audioEnabled ? speak : undefined}
                  audioLabel="Audio"
                />
              ))}
            </div>
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
              {activeCheck ? (
                <div className="rounded-lg border border-pu3nte-cyan/30 bg-pu3nte-cyan/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-cyan">{copy.comprehensionCheck}</p>
                  <h3 className="mt-2 font-bold">{activeCheck.question.prompt}</h3>
                  {activeCheck.question.type === "multiple-choice" || activeCheck.question.type === "true-false" ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {(shuffledCheckOptions[activeCheck.id] ?? activeCheck.question.options ?? []).map((option) => {
                        const selected = selectedCheckOption === option;
                        const correct = option === activeCheck.question.correctAnswer;
                        return (
                          <button
                            key={option}
                            type="button"
                            className={`rounded-md border px-3 py-2 text-sm font-bold transition ${
                              selected
                                ? correct
                                  ? "border-pu3nte-success bg-pu3nte-success/15"
                                  : "border-pu3nte-error bg-pu3nte-error/15"
                                : "border-white/10 bg-white/[0.04] hover:border-pu3nte-cyan/40"
                            }`}
                            onClick={() => answerCheck(option)}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3">
                      <OrderWordsInput
                        words={getQuestionWordBank(activeCheck.question)}
                        selectedWords={selectedCheckOption ? selectedCheckOption.split(/\s+/) : []}
                        onChange={(words) => {
                          setSelectedCheckOption(words.join(" "));
                          setCheckFeedback("");
                        }}
                        emptyLabel={copy.tapWordTiles}
                      />
                    </div>
                  )}
                  {checkFeedback && <p className="mt-3 text-sm text-pu3nte-secondary" aria-live="polite">{checkFeedback}</p>}
                  <GradientButton
                    className="mt-3 w-full"
                    disabled={!selectedCheckOption?.trim()}
                    onClick={() => (checkFeedback ? continueAfterCheck() : answerCheck(selectedCheckOption ?? ""))}
                  >
                    {checkFeedback ? copy.continueStory : "Check answer"}
                  </GradientButton>
                </div>
              ) : visible < story.data.messages.length ? (
                <GradientButton onClick={revealNext}>{copy.revealNextMessage}</GradientButton>
              ) : (
                <div className="rounded-lg border border-pu3nte-success/30 bg-pu3nte-success/10 p-4">
                  <h3 className="font-bold">{copy.storyComplete}</h3>
                  <p className="mt-2 text-sm text-pu3nte-secondary">
                    {copy.learnedPhrases}: {(story.data.learnedVocab ?? []).slice(0, 6).join(", ")}
                    {(story.data.learnedVocab?.length ?? 0) > 6 ? "..." : ""}
                  </p>
                  <GradientButton className="mt-4 w-full" onClick={() => setSummaryOpen(true)}>
                    Ver resumen final
                  </GradientButton>
                </div>
              )}
            </div>
          </div>
        </PhoneFrame>
        <div className="glass-panel h-fit rounded-lg p-5">
          <h2 className="font-bold">{copy.storyControls}</h2>
          <label className="mt-4 flex items-center gap-2 text-sm text-pu3nte-secondary"><input type="checkbox" checked={translations} onChange={(event) => setTranslations(event.target.checked)} /> {copy.showTranslations}</label>
          <label className="mt-3 flex items-center gap-2 text-sm text-pu3nte-secondary"><input type="checkbox" checked={autoPlay} onChange={(event) => setAutoPlay(event.target.checked)} /> {copy.autoplay}</label>
          <label className="mt-3 flex items-center gap-2 text-sm text-pu3nte-secondary"><input type="checkbox" checked={audioEnabled} onChange={(event) => { setAudioEnabled(event.target.checked); if (event.target.checked && !primeSpeech()) setAudioNotice("This browser does not expose text-to-speech. Try Safari/Chrome, or enable speech/audio permissions."); }} /> {copy.readAloud}</label>
          {audioNotice && <p className="mt-3 rounded-md border border-pu3nte-warning/30 bg-pu3nte-warning/10 p-3 text-xs text-pu3nte-secondary">{audioNotice}</p>}
          <GradientButton className="mt-5 w-full" variant="ghost" onClick={() => { setVisible(1); setAnsweredChecks({}); setSelectedCheckOption(undefined); setCheckFeedback(""); setShuffledCheckOptions({}); setSummaryOpen(false); saveStory(1); }}>{copy.restartStory}</GradientButton>
        </div>
      </div>
      {storyComplete && summaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pu3nte-bg/85 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="story-summary-title">
          <div className="max-h-[88dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-pu3nte-card p-4 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-success">100% complete</p>
                <h2 id="story-summary-title" className="mt-1 text-2xl font-black">{copy.storyComplete}</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-pu3nte-secondary transition hover:bg-white/[0.08] hover:text-pu3nte-text"
                onClick={() => setSummaryOpen(false)}
                aria-label="Close story summary"
              >
                ✕
              </button>
            </div>
            <StorySummary
              learnedVocab={story.data.learnedVocab}
              finalReview={story.data.finalReview}
              completionTask={story.data.completionTask}
              skoolReturnUrl={story.skoolReturnUrl}
              labels={copy}
              onPracticeFlashcards={() => navigate(`/flashcards/${preparationDeck?.id ?? preparationDeckId}`)}
              onFinish={() => navigate(`/complete/${story.id}`)}
            />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
