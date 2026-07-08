import type { CheckpointQuestion } from "../../types";

export function QuizQuestion({ question, pointLabel = "point" }: { question: CheckpointQuestion; pointLabel?: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{question.skillTag} · {question.points} {pointLabel}</p>
      <h2 className="mt-3 text-2xl font-extrabold">{question.prompt}</h2>
      {question.nativePrompt && (
        <p className="mt-3 rounded-lg border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-3 text-sm font-semibold text-pu3nte-secondary">
          Meaning: <span className="text-pu3nte-text">{question.nativePrompt}</span>
        </p>
      )}
    </div>
  );
}
