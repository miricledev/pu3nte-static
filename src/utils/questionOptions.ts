import type { CheckpointQuestion } from "../types";

export function getQuestionOptions(question: CheckpointQuestion) {
  const options = question.options?.filter(Boolean) ?? [];
  if (options.length) return options;
  if (question.type === "true-false") return ["True", "False"];
  return [];
}

export function isQuestionOptionCorrect(question: CheckpointQuestion, option: string) {
  const correctAnswer = question.correctAnswer ?? question.correctAnswers?.[0] ?? "";
  if (question.type === "true-false") {
    return option.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }
  return option === correctAnswer || Boolean(question.correctAnswers?.includes(option));
}
