import type { SentenceBuilderLesson } from "../../types";

// Demo only. Real lessons should add more staged objects without changing component logic.
export const demoSentenceBuilderLessons: SentenceBuilderLesson[] = [
  {
    id: "demo-sentence-builder-cafe",
    title: "Demo Sentence Builder",
    subtitle: "Two short stages for building a sentence from mixed vocabulary.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "speaking"],
    estimatedMinutes: 5,
    activityType: "sentence-builder",
    data: {
      finalChallenge: "Say one new sentence aloud using all demo vocabulary.",
      stages: [
        {
          id: "stage-1",
          title: "Stage 1: Five words",
          newVocab: ["quiero", "un", "café", "por", "favor"],
          fullVocab: ["quiero", "un", "café", "por", "favor"],
          vocabGuide: [
            {
              word: "quiero",
              translation: "I want",
              exampleSentences: [{ source: "Quiero agua.", translation: "I want water." }],
              note: "From querer. Useful for simple requests.",
            },
            {
              word: "un",
              translation: "a / one",
              exampleSentences: [{ source: "Un café, por favor.", translation: "A coffee, please." }],
            },
            {
              word: "café",
              translation: "coffee / cafe",
              exampleSentences: [{ source: "El café está caliente.", translation: "The coffee is hot." }],
              note: "Remember the accent: café.",
            },
            {
              word: "por",
              translation: "for / by",
              exampleSentences: [{ source: "Por favor.", translation: "Please." }],
            },
            {
              word: "favor",
              translation: "favor",
              exampleSentences: [{ source: "Por favor.", translation: "Please." }],
              note: "Por favor works as one phrase.",
            },
          ],
          prompt: "I want a coffee, please.",
          targetAnswer: "Quiero un café, por favor.",
          acceptedAnswers: ["quiero un café por favor", "quiero un cafe por favor"],
          hints: ["Start with quiero.", "Por favor can close the sentence."],
          explanation: "Quiero means I want. Spanish uses café with an accent.",
          wordBreakdown: [
            { source: "I want", target: "quiero" },
            { source: "a coffee", target: "un café" },
            { source: "please", target: "por favor" },
          ],
        },
        {
          id: "stage-2",
          title: "Stage 2: Seven words",
          newVocab: ["ahora", "también"],
          fullVocab: ["quiero", "un", "café", "por", "favor", "ahora", "también"],
          vocabGuide: [
            {
              word: "ahora",
              translation: "now",
              exampleSentences: [{ source: "Vamos ahora.", translation: "Let's go now." }],
            },
            {
              word: "también",
              translation: "also / too",
              exampleSentences: [{ source: "Yo también quiero café.", translation: "I also want coffee." }],
              note: "The accent goes on the e: también.",
            },
          ],
          prompt: "Now I also want a coffee, please.",
          targetAnswer: "Ahora también quiero un café, por favor.",
          acceptedAnswers: ["ahora también quiero un café por favor", "ahora tambien quiero un cafe por favor"],
          hints: ["Ahora means now.", "También means also."],
          explanation: "Adverbs can sit before quiero in this demo pattern.",
          wordBreakdown: [
            { source: "Now", target: "ahora" },
            { source: "also", target: "también" },
            { source: "I want a coffee", target: "quiero un café" },
          ],
        },
      ],
    },
  },
];
