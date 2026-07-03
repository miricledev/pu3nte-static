import { calculateAccuracy } from "../../utils/answer";

export function DrillResults({ correct, incorrect, labels }: { correct: number; incorrect: number; labels?: Record<string, string> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{correct}</p><p className="text-sm text-pu3nte-secondary">{labels?.correct ?? "Correct"}</p></div>
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{incorrect}</p><p className="text-sm text-pu3nte-secondary">{labels?.incorrect ?? "Incorrect"}</p></div>
      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{calculateAccuracy(correct, incorrect)}%</p><p className="text-sm text-pu3nte-secondary">{labels?.accuracy ?? "Accuracy"}</p></div>
    </div>
  );
}
