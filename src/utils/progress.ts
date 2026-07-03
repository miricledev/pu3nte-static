import type { ActivityType, CardProgress, ProgressRecord } from "../types";

const storageKey = "pu3nte-progress-v1";

export const emptyProgress = (): ProgressRecord => ({
  version: 1,
  completedActivities: [],
  lastOpened: [],
  percentages: {},
  flashcards: {},
  quizScores: {},
  sentenceBuilder: {},
  verbTrainer: {},
  readingScores: {},
  grammarMastery: {},
  storyProgress: {},
  dailyActivity: {},
  updatedAt: new Date().toISOString(),
});

function safeParse(value: string | null): ProgressRecord {
  if (!value) return emptyProgress();
  try {
    const parsed = JSON.parse(value) as Partial<ProgressRecord>;
    if (parsed.version !== 1) return emptyProgress();
    return { ...emptyProgress(), ...parsed, updatedAt: parsed.updatedAt ?? new Date().toISOString() };
  } catch {
    return emptyProgress();
  }
}

export function getProgress() {
  return safeParse(window.localStorage.getItem(storageKey));
}

export function saveProgress(progress: ProgressRecord) {
  const next = { ...progress, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("pu3nte-progress", { detail: next }));
  return next;
}

export function resetProgress() {
  const next = emptyProgress();
  window.localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("pu3nte-progress", { detail: next }));
  return next;
}

export function exportProgress() {
  return JSON.stringify(getProgress(), null, 2);
}

export function importProgress(json: string) {
  const imported = safeParse(json);
  return saveProgress(imported);
}

export function markOpened(activityId: string, activityType: ActivityType, title: string) {
  const progress = getProgress();
  const nextRecent = [
    { activityId, activityType, openedAt: new Date().toISOString(), title },
    ...progress.lastOpened.filter((item) => item.activityId !== activityId),
  ].slice(0, 8);
  return saveProgress({ ...progress, lastOpened: nextRecent });
}

export function markCompleted(activityId: string, percentage = 100) {
  const progress = getProgress();
  return saveProgress({
    ...progress,
    completedActivities: Array.from(new Set([...progress.completedActivities, activityId])),
    percentages: { ...progress.percentages, [activityId]: percentage },
  });
}

export function updateFlashcardProgress(deckId: string, cardId: string, update: Partial<CardProgress>) {
  const progress = getProgress();
  const deck = progress.flashcards[deckId] ?? { cards: {}, cardsMastered: 0, cardsLearning: 0 };
  const previous: CardProgress = deck.cards[cardId] ?? {
    status: "new",
    correctCount: 0,
    incorrectCount: 0,
    typedCorrectCount: 0,
  };
  const cards = { ...deck.cards, [cardId]: { ...previous, ...update, lastSeen: new Date().toISOString() } };
  const values = Object.values(cards);
  return saveProgress({
    ...progress,
    flashcards: {
      ...progress.flashcards,
      [deckId]: {
        cards,
        cardsMastered: values.filter((card) => card.status === "mastered").length,
        cardsLearning: values.filter((card) => card.status !== "mastered").length,
      },
    },
  });
}

export function recordDailyActivity(amount = 1) {
  const progress = getProgress();
  const key = new Date().toISOString().slice(0, 10);
  return saveProgress({
    ...progress,
    dailyActivity: { ...progress.dailyActivity, [key]: (progress.dailyActivity[key] ?? 0) + amount },
  });
}
