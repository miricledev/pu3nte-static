import type { CheckpointQuestion } from "../../types";
import { QuizQuestion } from "../quiz/QuizQuestion";

export function ComprehensionQuestion({ question }: { question: CheckpointQuestion }) {
  return <QuizQuestion question={question} />;
}
