import type { CheckpointQuestion } from "../../types";

export function MistakeReview({ mistakes, title = "Review mistakes" }: { mistakes: CheckpointQuestion[]; title?: string }) {
  if (!mistakes.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-3 grid gap-3 text-sm text-pu3nte-secondary">
        {mistakes.map((question) => <li key={question.id}><strong className="text-pu3nte-text">{question.prompt}</strong><br />{question.explanation}</li>)}
      </ul>
    </div>
  );
}
