import type { FlashcardDeck, FlashcardItem } from "../../types";
import { argentinianSayings } from "../stories/argentinianSayingsTextingStories";

const specialCharacters = ["\u00e1", "\u00e9", "\u00ed", "\u00f3", "\u00fa", "\u00f1", "\u00bf", "\u00a1"];

const cards: FlashcardItem[] = argentinianSayings.map((saying) => ({
  id: saying.id,
  term: saying.saying,
  definition: saying.explanation,
  exampleSentence: saying.saying,
  exampleTranslation: saying.explanation,
  acceptedAnswers: [saying.explanation],
  languageFrom: "spanish",
  languageTo: "english",
  difficulty: saying.number <= 20 ? "medium" : "hard",
  notes: `Argentinian saying #${saying.number}`,
  specialCharacters,
  starred: saying.number <= 10,
}));

export const argentinianSayingsFlashcardDeck: FlashcardDeck = {
  id: "argentinian-sayings-50-flashcards",
  title: "Argentinian Sayings | 50 Essential Sayings",
  subtitle: "Review all 50 Argentinian sayings used across the texting story series.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Sayings", "Argentinian Spanish", "refranes", "story vocab"],
  estimatedMinutes: 20,
  skoolSectionName: "Argentinian Sayings",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards,
  },
};
