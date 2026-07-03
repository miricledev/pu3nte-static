import type { CheckpointQuestion } from "../../types";

export function QuizQuestion({ question, pointLabel = "point" }: { question: CheckpointQuestion; pointLabel?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{question.skillTag} · {question.points} {pointLabel}</p>
      <h2 className="mt-3 text-2xl font-extrabold">{question.prompt}</h2>
    </div>
  );
}
