import { demoFlashcardDecks } from "./demo/demoFlashcards";
import { demoSentenceBuilderLessons } from "./demo/demoSentenceBuilder";
import { demoVerbSets } from "./demo/demoVerbs";
import { demoStories } from "./demo/demoStories";
import { demoQuizzes } from "./demo/demoQuizzes";
import { demoReadings } from "./demo/demoReadings";
import { demoGrammarLessons } from "./demo/demoGrammar";
import { spanishGrammarLesson1MasculineFeminine } from "./grammar/spanishGrammarLesson1MasculineFeminine";
import { spanishGrammarLesson1VocabularyDeck } from "./flashcards/spanishGrammarLesson1Vocabulary";
import type { ActivityType } from "../types";

export const flashcardDecks = [...demoFlashcardDecks, spanishGrammarLesson1VocabularyDeck];
export const sentenceBuilderLessons = [...demoSentenceBuilderLessons];
export const verbTrainerSets = [...demoVerbSets];
export const whatsappStories = [...demoStories];
export const checkpointQuizzes = [...demoQuizzes];
export const readingComprehensions = [...demoReadings];
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
