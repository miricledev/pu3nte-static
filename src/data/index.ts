import { demoFlashcardDecks } from "./demo/demoFlashcards";
import { demoSentenceBuilderLessons } from "./demo/demoSentenceBuilder";
import { englishSentenceBuilderLessons } from "./sentence-builder/englishSentenceBuilderLessons";
import { spanishSentenceBuilderLessons } from "./sentence-builder/spanishSentenceBuilderLessons";
import { demoVerbSets } from "./demo/demoVerbs";
import { demoStories } from "./demo/demoStories";
import { englishTextingStories } from "./stories/englishTextingStories";
import { spanishTextingStories } from "./stories/spanishTextingStories";
import { demoQuizzes } from "./demo/demoQuizzes";
import { demoReadings } from "./demo/demoReadings";
import { demoGrammarLessons } from "./demo/demoGrammar";
import { spanishGrammarLesson1MasculineFeminine } from "./grammar/spanishGrammarLesson1MasculineFeminine";
import { spanishGrammarLesson1VocabularyDeck } from "./flashcards/spanishGrammarLesson1Vocabulary";
import { englishTextingStoryFlashcards } from "./flashcards/englishTextingStoryFlashcards";
import { spanishTextingStoryFlashcards } from "./flashcards/spanishTextingStoryFlashcards";
import {
  colombianSpanishB2FlashcardDeck,
  colombianSpanishB2Quiz,
  colombianSpanishB2Reading,
  colombianSpanishB2WhatsAppStory,
} from "./colombianSpanishB2Reinforcement";
import {
  colombianSpanishB2PracticalFlashcardDeck,
  colombianSpanishB2PracticalQuiz,
  colombianSpanishB2PracticalReading,
  colombianSpanishB2PracticalWhatsAppStory,
} from "./colombianSpanishB2PracticalReinforcement";
import {
  americanEnglishB2FlashcardDeck,
  americanEnglishB2Quiz,
  americanEnglishB2Reading,
  americanEnglishB2WhatsAppStory,
} from "./americanEnglishB2Reinforcement";
import {
  americanEnglishB2AgreementsFlashcardDeck,
  americanEnglishB2AgreementsQuiz,
  americanEnglishB2AgreementsReading,
  americanEnglishB2AgreementsWhatsAppStory,
} from "./americanEnglishB2AgreementsReinforcement";
import type { ActivityType } from "../types";

export const flashcardDecks = [
  ...demoFlashcardDecks,
  spanishGrammarLesson1VocabularyDeck,
  ...spanishTextingStoryFlashcards,
  ...englishTextingStoryFlashcards,
  colombianSpanishB2FlashcardDeck,
  colombianSpanishB2PracticalFlashcardDeck,
  americanEnglishB2FlashcardDeck,
  americanEnglishB2AgreementsFlashcardDeck,
];
export const sentenceBuilderLessons = [...demoSentenceBuilderLessons, ...englishSentenceBuilderLessons, ...spanishSentenceBuilderLessons];
export const verbTrainerSets = [...demoVerbSets];
export const whatsappStories = [...demoStories, ...spanishTextingStories, ...englishTextingStories, colombianSpanishB2WhatsAppStory, colombianSpanishB2PracticalWhatsAppStory, americanEnglishB2WhatsAppStory, americanEnglishB2AgreementsWhatsAppStory];
export const checkpointQuizzes = [...demoQuizzes, colombianSpanishB2Quiz, colombianSpanishB2PracticalQuiz, americanEnglishB2Quiz, americanEnglishB2AgreementsQuiz];
export const readingComprehensions = [...demoReadings, colombianSpanishB2Reading, colombianSpanishB2PracticalReading, americanEnglishB2Reading, americanEnglishB2AgreementsReading];
export const grammarMasteryLessons = [...demoGrammarLessons, spanishGrammarLesson1MasculineFeminine];

export const allActivities = [
  ...flashcardDecks,
  ...sentenceBuilderLessons,
  ...verbTrainerSets,
  ...whatsappStories,
  ...checkpointQuizzes,
  ...readingComprehensions,
  ...grammarMasteryLessons,
];

export function getActivityById(type: ActivityType, id: string) {
  return allActivities.find((activity) => activity.activityType === type && activity.id === id);
}
