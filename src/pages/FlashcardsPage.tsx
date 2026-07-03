import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flashcardDecks } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Flashcard } from "../components/flashcards/Flashcard";
import { MultipleChoiceQuestion } from "../components/flashcards/MultipleChoiceQuestion";
import { TypedAnswerQuestion } from "../components/flashcards/TypedAnswerQuestion";
import { StudySettingsPanel, type StudySettings } from "../components/flashcards/StudySettingsPanel";
import { LearnResults } from "../components/flashcards/LearnResults";
import { CardStatusBadge } from "../components/flashcards/CardStatusBadge";
import { getSpecialCharactersForLanguage } from "../utils/answer";
import { calculateAccuracy } from "../utils/answer";
import { calculateCardPriority, shuffleArray } from "../utils/study";
import { getProgress, markCompleted, markOpened, resetProgress, updateFlashcardProgress } from "../utils/progress";
import { getUiLanguage, uiText } from "../utils/uiText";
import { NotFoundPage } from "./NotFoundPage";

export function FlashcardsPage() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const deck = flashcardDecks.find((item) => item.id === deckId);
  const [mode, setMode] = useState<"flashcards" | "learn" | "results">("flashcards");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string>();
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [missed, setMissed] = useState<string[]>([]);
  const [settings, setSettings] = useState<StudySettings>({
    direction: "term-definition",
    multipleChoice: true,
    typed: true,
    accentMode: "forgiving",
    punctuationMode: "forgiving",
    shuffle: false,
    starredOnly: false,
  });

  useEffect(() => {
    if (deck) markOpened(deck.id, deck.activityType, deck.title);
  }, [deck]);

  const cards = useMemo(() => {
    if (!deck) return [];
    const base = settings.starredOnly ? deck.data.cards.filter((card) => card.starred) : deck.data.cards;
    const sorted = mode === "learn"
      ? [...base].sort((left, right) => calculateCardPriority(getProgress().flashcards[deck.id]?.cards[right.id]) - calculateCardPriority(getProgress().flashcards[deck.id]?.cards[left.id]))
      : base;
    return settings.shuffle ? shuffleArray(sorted) : sorted;
  }, [deck, mode, settings.shuffle, settings.starredOnly]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement) return;
      if (event.code === "Space") {
        event.preventDefault();
        setFlipped((value) => !value);
      }
      if (event.key === "1") markCard(false);
      if (event.key === "2") markCard(true);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  if (!deck || cards.length === 0) return <NotFoundPage />;
  const copy = uiText(getUiLanguage(deck.languageTarget, deck.learnerNativeLanguage));
  const card = cards[index] ?? cards[0];
  const deckProgress = getProgress().flashcards[deck.id];
  const mastered = deckProgress?.cardsMastered ?? 0;
  const progressValue = Math.round((mastered / deck.data.cards.length) * 100);
  const direction = settings.direction === "random" ? (Math.random() > 0.5 ? "term-definition" : "definition-term") : settings.direction;
  const cardProgress = deckProgress?.cards[card.id];
  const useTyped = settings.typed && (!settings.multipleChoice || (cardProgress?.correctCount ?? 0) > 0);

  function next() {
    setSelected(undefined);
    setFlipped(false);
    if (index >= cards.length - 1) {
      if (mode === "learn") setMode("results");
      setIndex(0);
    } else {
      setIndex((value) => value + 1);
    }
  }

  function markCard(correct: boolean, typed = false) {
    const activeDeck = deck!;
    const previous = getProgress().flashcards[activeDeck.id]?.cards[card.id];
    const correctCount = (previous?.correctCount ?? 0) + (correct ? 1 : 0);
    const incorrectCount = (previous?.incorrectCount ?? 0) + (correct ? 0 : 1);
    const typedCorrectCount = (previous?.typedCorrectCount ?? 0) + (correct && typed ? 1 : 0);
    const status = typedCorrectCount >= 2 ? "mastered" : correctCount > 1 ? "reviewing" : correct ? "learning" : "learning";
    updateFlashcardProgress(activeDeck.id, card.id, { correctCount, incorrectCount, typedCorrectCount, status });
    setStats((value) => ({ correct: value.correct + (correct ? 1 : 0), incorrect: value.incorrect + (correct ? 0 : 1) }));
    if (!correct) setMissed((value) => Array.from(new Set([...value, card.id])));
    if (correct && status === "mastered" && getProgress().flashcards[activeDeck.id]?.cardsMastered === activeDeck.data.cards.length) markCompleted(activeDeck.id);
    next();
  }

  return (
    <PageContainer>
      <ActivityHeader {...deck} />
      <div className="mb-4 grid gap-2 sm:flex sm:flex-wrap">
        {(["flashcards", "learn"] as const).map((tab) => (
          <GradientButton key={tab} variant={mode === tab ? "primary" : "ghost"} onClick={() => { setMode(tab); setIndex(0); }}>
            {tab === "flashcards" ? copy.reviewFlashcards : copy.practiceRecall}
          </GradientButton>
        ))}
      </div>
      <InstructionPanel title={copy.instructions} body={copy.flashcardGuide} />
      <div className="mt-4">
        <ProgressBar value={progressValue} label={copy.deckMastery} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
        <GlassCard>
          <div className="mb-4 flex justify-end"><CardStatusBadge status={cardProgress?.status} labels={copy} /></div>
          {mode === "flashcards" && (
            <Flashcard
              card={card}
              flipped={flipped}
              onFlip={() => setFlipped((value) => !value)}
              onKnow={() => markCard(true)}
              onLearning={() => markCard(false)}
              labels={{
                flipFlashcard: copy.flipFlashcard,
                front: copy.front,
                back: copy.back,
                stillLearning: copy.stillLearning,
                know: copy.know,
                shortcuts: copy.flashcardShortcuts,
                flashcardReviewStepFront: copy.flashcardReviewStepFront,
                flashcardReviewStepBack: copy.flashcardReviewStepBack,
                englishMeaning: copy.englishMeaning,
                exampleInSpanish: copy.exampleInSpanish,
                exampleInEnglish: copy.exampleInEnglish,
              }}
            />
          )}
          {mode === "learn" && !useTyped && (
            <div className="space-y-4">
              <MultipleChoiceQuestion
                card={card}
                cards={cards}
                direction={direction}
                selected={selected}
                labels={{ chooseMatch: copy.chooseMatch, correctAnswer: copy.correctAnswer }}
                onAnswer={(answer, correct) => { setSelected(answer); setTimeout(() => markCard(correct), 500); }}
              />
            </div>
          )}
          {mode === "learn" && useTyped && (
            <TypedAnswerQuestion
              card={card}
              direction={direction}
              characters={getSpecialCharactersForLanguage(deck.languageTarget, deck.data.specialCharacters)}
              accentMode={settings.accentMode}
              punctuationMode={settings.punctuationMode}
              labels={{
                typeAnswer: copy.typeAnswer,
                yourAnswer: copy.yourAnswer,
                check: copy.check,
                correctOverride: copy.iWasCorrect,
                dontKnow: copy.dontKnow,
                correct: copy.correct,
                almostCheckPunctuation: copy.almostCheckPunctuation,
                almostCheckAccents: copy.almostCheckAccents,
                incorrectReviewAnswer: copy.incorrectReviewAnswer,
              }}
              onResult={(correct) => markCard(correct, true)}
            />
          )}
          {mode === "results" && (
            <LearnResults
              mastered={mastered}
              learning={deck.data.cards.length - mastered}
              accuracy={calculateAccuracy(stats.correct, stats.incorrect)}
              missedCards={deck.data.cards.filter((item) => missed.includes(item.id))}
              labels={copy}
              onRetry={() => { setMode("learn"); setIndex(0); }}
              onFinish={() => { markCompleted(deck.id, progressValue); navigate(`/complete/${deck.id}`); }}
            />
          )}
          {mode === "flashcards" && (
            <div className="mt-5 flex justify-center">
              <GradientButton onClick={() => { setMode("learn"); setIndex(0); setFlipped(false); }}>
                {copy.startRecallPractice}
              </GradientButton>
            </div>
          )}
        </GlassCard>
        <StudySettingsPanel settings={settings} onChange={setSettings} hasStarred={deck.data.cards.some((item) => item.starred)} labels={copy} onReset={() => resetProgress()} />
      </div>
    </PageContainer>
  );
}
