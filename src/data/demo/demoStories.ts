import type { WhatsAppStory } from "../../types";

// Demo only. Add future WhatsApp-style stories by extending this typed object.
export const demoStories: WhatsAppStory[] = [
  {
    id: "demo-whatsapp-cafe-story",
    title: "Demo WhatsApp Story",
    subtitle: "A tiny group chat with audio, vocab highlights, and mid-story comprehension checks.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "conversation"],
    estimatedMinutes: 4,
    activityType: "story",
    data: {
      targetLanguage: "spanish",
      nativeLanguage: "english",
      characters: [
        { id: "ana", name: "Ana", initials: "A", side: "left", color: "red" },
        { id: "leo", name: "Leo", initials: "L", side: "right", color: "blue" },
        { id: "maya", name: "Maya", initials: "M", side: "left", color: "gold" },
      ],
      messages: [
        {
          id: "m1",
          speakerId: "ana",
          text: "Hola, Leo.",
          translation: "Hi, Leo.",
          vocabHighlights: [{ phrase: "Hola", meaning: "Hello" }],
        },
        {
          id: "m2",
          speakerId: "leo",
          text: "Hola, Ana. ¿Café?",
          translation: "Hi, Ana. Coffee?",
          vocabHighlights: [{ phrase: "¿Café?", meaning: "Coffee?" }],
        },
        {
          id: "m3",
          speakerId: "maya",
          text: "Sí, por favor. Yo también.",
          translation: "Yes, please. Me too.",
          vocabHighlights: [{ phrase: "por favor", meaning: "please" }],
          grammarHighlights: [{ phrase: "también", explanation: "Also / too." }],
        },
        {
          id: "m4",
          speakerId: "leo",
          text: "Perfecto. Quiero uno ahora.",
          translation: "Perfect. I want one now.",
          vocabHighlights: [{ phrase: "quiero", meaning: "I want" }],
        },
        {
          id: "m5",
          speakerId: "ana",
          text: "Vamos al café pequeño.",
          translation: "Let's go to the small cafe.",
          vocabHighlights: [{ phrase: "pequeño", meaning: "small" }],
        },
        {
          id: "m6",
          speakerId: "maya",
          text: "¡Vamos! Practiquemos en español.",
          translation: "Let's go! Let's practice in Spanish.",
          challenge: "Shadow this message aloud.",
        },
      ],
      comprehensionChecks: [
        {
          id: "check-1",
          afterMessageId: "m3",
          question: {
            id: "story-q1",
            type: "multiple-choice",
            prompt: "Who also wants coffee?",
            options: ["Maya", "The teacher", "Nobody"],
            correctAnswer: "Maya",
            explanation: "Maya says, Sí, por favor. Yo también.",
            points: 1,
            skillTag: "gist",
          },
        },
        {
          id: "check-2",
          afterMessageId: "m6",
          question: {
            id: "story-q2",
            type: "multiple-choice",
            prompt: "What should they practice in?",
            options: ["Spanish", "French", "Silence"],
            correctAnswer: "Spanish",
            explanation: "Maya says, Practiquemos en español.",
            points: 1,
            skillTag: "detail",
          },
        },
      ],
      learnedVocab: ["hola", "café", "por favor", "también", "quiero", "pequeño", "vamos"],
    },
  },
];
