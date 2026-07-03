import type { GrammarExerciseItem } from "../../types";
import { calculateAccuracy } from "../../utils/answer";
import { GlassCard } from "../ui/GlassCard";
import { GradientButton } from "../ui/GradientButton";

export function GrammarResultsScreen({
  correct,
  incorrect,
  completedSections,
  mistakes,
  weakSkillTags,
  completionMessage,
  onRetryWeak,
  onRestart,
  onFinish,
  labels,
}: {
  correct: number;
  incorrect: number;
  completedSections: number;
  mistakes: GrammarExerciseItem[];
  weakSkillTags: Record<string, number>;
  completionMessage?: string;
  onRetryWeak: () => void;
  onRestart: () => void;
  onFinish: () => void;
  labels?: Record<string, string>;
}) {
  const accuracy = calculateAccuracy(correct, incorrect);
  const strongest = correct > 0 ? labels?.grammarProgress ?? "Completed practice" : labels?.keepPracticing ?? "Keep warming up";
  const weakEntries = Object.entries(weakSkillTags).sort((left, right) => right[1] - left[1]);

  return (
    <GlassCard className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-pu3nte-cyan">{labels?.grammarResults ?? "Grammar results"}</p>
        <h2 className="mt-2 text-3xl font-extrabold">{accuracy}% {labels?.accuracy ?? "accuracy"}</h2>
        <p className="mt-2 text-pu3nte-secondary">{completionMessage ?? labels?.returnCommunityMessage ?? "Now use this grammar in your Skool speaking task."}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{correct}</p><p className="text-sm text-pu3nte-secondary">{labels?.correct ?? "Correct"}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{incorrect}</p><p className="text-sm text-pu3nte-secondary">{labels?.incorrect ?? "Incorrect"}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-2xl font-bold">{completedSections}</p><p className="text-sm text-pu3nte-secondary">{labels?.sections ?? "Sections"}</p></div>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4"><p className="text-lg font-bold">{strongest}</p><p className="text-sm text-pu3nte-secondary">{labels?.strongestArea ?? "Strongest area"}</p></div>
      </div>
      {weakEntries.length ? (
        <div className="rounded-lg border border-pu3nte-warning/30 bg-pu3nte-warning/10 p-4">
          <h3 className="font-bold">{labels?.weakTags ?? "Weak tags"}</h3>
          <p className="mt-2 text-sm text-pu3nte-secondary">{weakEntries.map(([tag, count]) => `${tag} (${count})`).join(", ")}</p>
        </div>
      ) : null}
      {mistakes.length ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <h3 className="font-bold">{labels?.mistakesReview ?? "Mistakes review"}</h3>
          <ul className="mt-3 grid gap-2 text-sm text-pu3nte-secondary">
            {mistakes.map((item) => <li key={item.id}><strong className="text-pu3nte-text">{item.prompt}</strong> · {item.explanation}</li>)}
          </ul>
        </div>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-3">
        <GradientButton variant="ghost" onClick={onRetryWeak}>{labels?.retryWeakAreas ?? "Retry weak areas"}</GradientButton>
        <GradientButton variant="ghost" onClick={onRestart}>{labels?.restartLesson ?? "Restart lesson"}</GradientButton>
        <GradientButton onClick={onFinish}>{labels?.finishReturnSkool ?? "Finish and return to Skool"}</GradientButton>
      </div>
    </GlassCard>
  );
}
