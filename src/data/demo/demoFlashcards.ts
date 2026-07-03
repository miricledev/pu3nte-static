import type { FlashcardDeck } from "../../types";

// Demo only. Add future decks to this folder or a module registry using the same FlashcardDeck shape.
export const demoFlashcardDecks: FlashcardDeck[] = [
  {
    id: "demo-spanish-foundations-flashcards",
    title: "Demo Spanish Foundations",
    subtitle: "Five tiny cards proving flashcard, learn, and typed recall flows.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "foundations"],
    estimatedMinutes: 4,
    skoolSectionName: "Demo Lab",
    relatedCourse: "PU3NTE Foundations",
    activityType: "flashcards",
    data: {
      specialCharacters: ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"],
      cards: [
        { id: "hola", term: "hola", definition: "hello", acceptedAnswers: ["hello", "hi"], languageFrom: "spanish", languageTo: "english" },
        { id: "gracias", term: "gracias", definition: "thank you", acceptedAnswers: ["thanks", "thank you"], languageFrom: "spanish", languageTo: "english" },
        { id: "senor", term: "señor", definition: "sir", acceptedAnswers: ["sir", "mister"], languageFrom: "spanish", languageTo: "english" },
        { id: "puente", term: "puente", definition: "bridge", languageFrom: "spanish", languageTo: "english", starred: true },
        { id: "hasta-luego", term: "hasta luego", definition: "see you later", languageFrom: "spanish", languageTo: "english" },
      ],
    },
  },
];
