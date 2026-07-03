import type { CheckpointQuiz } from "../../types";

// Demo only. Add future checkpoint quizzes to this registry.
export const demoQuizzes: CheckpointQuiz[] = [
  {
    id: "demo-checkpoint-quiz",
    title: "Demo Checkpoint Quiz",
    subtitle: "Four placeholder questions with scoring, matching, and mistake review.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "checkpoint"],
    estimatedMinutes: 3,
    activityType: "quiz",
    data: {
      description: "A tiny checkpoint to prove the reusable quiz engine.",
      passScore: 70,
      feedbackMode: "immediate",
      questions: [
        { id: "q1", type: "multiple-choice", prompt: "What does hola mean?", options: ["hello", "goodbye", "please"], correctAnswer: "hello", explanation: "Hola means hello.", points: 1, skillTag: "vocab" },
        { id: "q2", type: "typed", prompt: "Type the Spanish for bridge.", correctAnswer: "puente", explanation: "Puente means bridge.", points: 1, skillTag: "vocab" },
        { id: "q3", type: "true-false", prompt: "Gracias means thank you.", options: ["True", "False"], correctAnswer: "True", explanation: "Gracias is thank you.", points: 1, skillTag: "vocab" },
        {
          id: "q4",
          type: "match-pairs",
          prompt: "Match each Spanish word to English.",
          pairs: [
            { left: "hola", right: "hello" },
            { left: "gracias", right: "thank you" },
            { left: "puente", right: "bridge" },
          ],
          explanation: "These are core demo vocabulary items.",
          points: 3,
          skillTag: "matching",
        },
      ],
    },
  },
];
