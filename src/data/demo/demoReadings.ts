import type { ReadingComprehension } from "../../types";

// Demo only. Replace with real readings by adding more ReadingComprehension objects.
export const demoReadings: ReadingComprehension[] = [
  {
    id: "demo-reading-bridge",
    title: "Demo Reading",
    subtitle: "One paragraph with glossary, translation toggle, and mixed question types.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "reading"],
    estimatedMinutes: 4,
    activityType: "reading",
    data: {
      targetLanguage: "spanish",
      paragraphs: [
        {
          id: "p1",
          text: "Ana estudia inglés y español. Cada día cruza un puente pequeño entre dos idiomas.",
          translation: "Ana studies English and Spanish. Every day she crosses a small bridge between two languages.",
          highlights: [
            { phrase: "puente", meaning: "bridge" },
            { phrase: "idiomas", meaning: "languages" },
            { phrase: "pequeño", meaning: "small" },
          ],
          shadowLine: "Cada día cruza un puente pequeño.",
        },
      ],
      glossary: [
        { phrase: "estudia", meaning: "studies" },
        { phrase: "cruza", meaning: "crosses" },
        { phrase: "puente", meaning: "bridge" },
        { phrase: "pequeño", meaning: "small" },
      ],
      questions: [
        {
          id: "r1",
          type: "multiple-choice",
          prompt: "What does Ana study?",
          options: ["English and Spanish", "Music and math", "Only English"],
          correctAnswer: "English and Spanish",
          explanation: "The text says Ana studies English and Spanish.",
          points: 1,
          skillTag: "gist",
        },
        {
          id: "r2",
          type: "typed",
          prompt: "Type the Spanish word for bridge.",
          correctAnswer: "puente",
          explanation: "Puente means bridge.",
          points: 1,
          skillTag: "vocab",
        },
        {
          id: "r3",
          type: "true-false",
          prompt: "The bridge is large.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation: "The text says pequeño, small.",
          points: 1,
          skillTag: "detail",
        },
        {
          id: "r4",
          type: "order-words",
          prompt: "Order the words to match: Every day she crosses a small bridge.",
          wordBank: ["Cada", "día", "cruza", "un", "puente", "pequeño"],
          correctAnswer: "Cada día cruza un puente pequeño",
          explanation: "This sentence follows the order from the reading.",
          points: 2,
          skillTag: "sentence-order",
        },
      ],
    },
  },
];
