import { GradientButton } from "../ui/GradientButton";

export function StorySummary({
  learnedVocab = [],
  onFinish,
  labels,
}: {
  learnedVocab?: string[];
  onFinish?: () => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="rounded-lg border border-pu3nte-success/30 bg-pu3nte-success/10 p-4">
      <h3 className="font-bold">{labels?.storyComplete ?? "Story Complete"}</h3>
      <p className="mt-2 text-sm text-pu3nte-secondary">{labels?.learnedPhrases ?? "Learned phrases"}: {learnedVocab.join(", ") || (labels?.addVocabularyLater ?? "Add vocabulary later.")}</p>
      <div className="mt-4 grid gap-2">
        <GradientButton variant="ghost">{labels?.practiceStoryFlashcards ?? "Practice flashcards from this story"}</GradientButton>
        <GradientButton onClick={onFinish}>{labels?.finishReturnSkool ?? "Finish and return to Skool"}</GradientButton>
      </div>
    </div>
  );
}
