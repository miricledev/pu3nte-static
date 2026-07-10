import type { FlashcardDeck, FlashcardItem } from "../../types";
import { colombianSayings } from "../stories/colombianSayingsTextingStories";

const specialCharacters = ["\u00e1", "\u00e9", "\u00ed", "\u00f3", "\u00fa", "\u00f1", "\u00bf", "\u00a1"];

const cards: FlashcardItem[] = colombianSayings.map((saying) => ({
  id: saying.id,
  term: saying.saying,
  definition: saying.explanation,
  exampleSentence: saying.saying,
  exampleTranslation: saying.explanation,
  acceptedAnswers: [saying.explanation],
  languageFrom: "spanish",
  languageTo: "english",
  difficulty: saying.number <= 20 ? "medium" : "hard",
  notes: `Colombian saying #${saying.number}`,
  specialCharacters,
  starred: saying.number <= 10,
}));

export const colombianSayingsFlashcardDeck: FlashcardDeck = {
  id: "colombian-sayings-50-flashcards",
  title: "Colombian Sayings | 50 Essential Sayings",
  subtitle: "Review all 50 Colombian sayings used across the texting story series.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Sayings", "Colombian Spanish", "refranes", "story vocab"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Sayings",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards,
  },
};
