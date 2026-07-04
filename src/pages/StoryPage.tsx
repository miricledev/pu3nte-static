import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { whatsappStories } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { PhoneFrame } from "../components/story/PhoneFrame";
import { ChatBubble } from "../components/story/ChatBubble";
import { StoryProgress } from "../components/story/StoryProgress";
import { StorySummary } from "../components/story/StorySummary";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { shuffleArray } from "../utils/study";
import { canUseSpeech, primeSpeech, speakText, stopSpeech } from "../utils/speech";
import { getUiLanguage, uiText } from "../utils/uiText";
import { NotFoundPage } from "./NotFoundPage";

function getLearnerReadingDelay(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const punctuationPauses = (text.match(/[.,!?¿¡;]/g) ?? []).length * 350;
  return Math.min(14000, Math.max(3500, words * 850 + punctuationPauses + 1800));
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = story?.data.messages.slice(0, visible) ?? [];
  const activeCheck = story?.data.comprehensionChecks?.find((check) => {
    const lastVisibleMessage = story.data.messages[visible - 1];
    return lastVisibleMessage?.id === check.afterMessageId && !answeredChecks[check.id];
  });

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
    const correct = option === activeCheck.question.correctAnswer;
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

  return (
    <PageContainer>
      <ActivityHeader {...story} />
      <div className="mb-5">
        <InstructionPanel title={copy.instructions} body={copy.storyGuide} />
      </div>
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
                  {checkFeedback && <p className="mt-3 text-sm text-pu3nte-secondary" aria-live="polite">{checkFeedback}</p>}
                  <GradientButton className="mt-3 w-full" disabled={!selectedCheckOption} onClick={continueAfterCheck}>
                    {copy.continueStory}
                  </GradientButton>
                </div>
              ) : visible < story.data.messages.length ? (
                <GradientButton onClick={revealNext}>{copy.revealNextMessage}</GradientButton>
              ) : (
                <StorySummary
                  learnedVocab={story.data.learnedVocab}
                  labels={copy}
                  onPracticeFlashcards={() => navigate(`/flashcards/${story.id}-flashcards`)}
                  onFinish={() => navigate(`/complete/${story.id}`)}
                />
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
          <GradientButton className="mt-5 w-full" variant="ghost" onClick={() => { setVisible(1); setAnsweredChecks({}); setSelectedCheckOption(undefined); setCheckFeedback(""); setShuffledCheckOptions({}); saveStory(1); }}>{copy.restartStory}</GradientButton>
        </div>
      </div>
    </PageContainer>
  );
}
