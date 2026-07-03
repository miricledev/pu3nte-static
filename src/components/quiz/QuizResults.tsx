import { GradientButton } from "../ui/GradientButton";

export function QuizResults({
  score,
  passed,
  onRetry,
  labels,
}: {
  score: number;
  passed: boolean;
  onRetry: () => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className={`rounded-lg border p-6 ${passed ? "border-pu3nte-success/40 bg-pu3nte-success/10" : "border-pu3nte-warning/40 bg-pu3nte-warning/10"}`}>
      <h2 className="text-2xl font-extrabold">{passed ? labels?.checkpointPassed ?? "Checkpoint passed" : labels?.keepPracticing ?? "Keep practicing"}</h2>
      <p className="mt-2 text-pu3nte-secondary">{labels?.score ?? "Score"}: {score}%</p>
      {passed && <p className="mt-3 text-sm text-pu3nte-secondary">{labels?.celebration ?? "A little celebration glow, saved locally."}</p>}
      <GradientButton className="mt-4" onClick={onRetry}>{labels?.retryQuiz ?? "Retry quiz"}</GradientButton>
    </div>
  );
}
