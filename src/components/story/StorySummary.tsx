import { GradientButton } from "../ui/GradientButton";

export function StorySummary({
  learnedVocab = [],
  finalReview,
  completionTask,
  skoolReturnUrl,
  onFinish,
  onPracticeFlashcards,
  labels,
}: {
  learnedVocab?: string[];
  finalReview?: {
    keyPhrases: string[];
    grammarPatterns: string[];
    speakingPrompts: string[];
  };
  completionTask?: {
    title: string;
    instructions: string;
  };
  skoolReturnUrl?: string;
  onFinish?: () => void;
  onPracticeFlashcards?: () => void;
  labels?: Record<string, string>;
}) {
  return (
    <div className="rounded-lg border border-pu3nte-success/30 bg-pu3nte-success/10 p-4">
      <h3 className="font-bold">{labels?.storyComplete ?? "Story Complete"}</h3>
      <p className="mt-2 text-sm text-pu3nte-secondary">{labels?.learnedPhrases ?? "Learned phrases"}: {learnedVocab.join(", ") || (labels?.addVocabularyLater ?? "Add vocabulary later.")}</p>
      {finalReview && (
        <div className="mt-4 grid gap-3 text-sm">
          <div>
            <p className="font-bold text-pu3nte-text">Frases clave</p>
            <p className="mt-1 text-pu3nte-secondary">{finalReview.keyPhrases.join(", ")}</p>
          </div>
          <div>
            <p className="font-bold text-pu3nte-text">Patrones de gramática</p>
            <ul className="mt-1 list-inside list-disc text-pu3nte-secondary">
              {finalReview.grammarPatterns.map((pattern) => <li key={pattern}>{pattern}</li>)}
            </ul>
          </div>
          <div>
            <p className="font-bold text-pu3nte-text">Prompts de speaking</p>
            <ul className="mt-1 list-inside list-disc text-pu3nte-secondary">
              {finalReview.speakingPrompts.map((prompt) => <li key={prompt}>{prompt}</li>)}
            </ul>
          </div>
        </div>
      )}
      {completionTask && (
        <div className="mt-4 rounded-md border border-pu3nte-gold/30 bg-pu3nte-gold/10 p-3 text-sm">
          <p className="font-bold text-pu3nte-text">{completionTask.title}</p>
          <p className="mt-1 text-pu3nte-secondary">{completionTask.instructions}</p>
        </div>
      )}
      <div className="mt-4 grid gap-2">
        <GradientButton variant="ghost" onClick={onPracticeFlashcards}>{labels?.practiceStoryFlashcards ?? "Practice flashcards from this story"}</GradientButton>
        <GradientButton onClick={onFinish}>{labels?.finishReturnSkool ?? "Finish and return to Skool"}</GradientButton>
        {skoolReturnUrl && (
          <a className="inline-flex justify-center rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-bold text-pu3nte-text transition hover:bg-white/[0.08]" href={skoolReturnUrl} target="_blank" rel="noreferrer">
            Volver a Skool
          </a>
        )}
      </div>
    </div>
  );
}
