import type { CardProgress, FlashcardItem } from "../types";

export function shuffleArray<T>(items: T[]) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((left, right) => left.sort - right.sort)
    .map(({ item }) => item);
}

export function generateMultipleChoiceOptions(card: FlashcardItem, cards: FlashcardItem[], direction: "term-definition" | "definition-term") {
  const correct = direction === "term-definition" ? card.definition : card.term;
  const wrongAnswers = cards
    .filter((candidate) => candidate.id !== card.id)
    .map((candidate) => (direction === "term-definition" ? candidate.definition : candidate.term))
    .filter((answer) => answer !== correct);
  return shuffleArray(Array.from(new Set([correct, ...shuffleArray(wrongAnswers).slice(0, 3)])));
}

export function calculateCardPriority(cardProgress?: CardProgress) {
  if (!cardProgress) return 100;
  const statusWeight = {
    new: 90,
    learning: 80,
    reviewing: 45,
    mastered: 5,
  }[cardProgress.status];
  const mistakeWeight = cardProgress.incorrectCount * 18;
  const typedNeed = Math.max(0, 2 - cardProgress.typedCorrectCount) * 12;
  return statusWeight + mistakeWeight + typedNeed;
}
