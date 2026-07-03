import { Hand, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { GradientButton } from "../ui/GradientButton";
import type { FlashcardItem } from "../../types";

export function Flashcard({
  card,
  flipped,
  onFlip,
  onKnow,
  onLearning,
  labels,
}: {
  card: FlashcardItem;
  flipped: boolean;
  onFlip: () => void;
  onKnow: () => void;
  onLearning: () => void;
  labels?: {
    flipFlashcard?: string;
    front?: string;
    back?: string;
    stillLearning?: string;
    know?: string;
    shortcuts?: string;
    flashcardReviewStepFront?: string;
    flashcardReviewStepBack?: string;
    englishMeaning?: string;
    exampleInSpanish?: string;
    exampleInEnglish?: string;
    tapCardToFlip?: string;
  };
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-cyan">
          {labels?.flipFlashcard ?? "Flip flashcard"}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {flipped
            ? labels?.flashcardReviewStepBack ?? "Check the meaning, read the example, then choose if you knew it."
            : labels?.flashcardReviewStepFront ?? "Read the card. Try to remember the meaning before you flip it."}
        </p>
      </div>
      <button
        className="glass-panel group relative min-h-64 w-full overflow-hidden rounded-lg p-6 text-left transition hover:border-pu3nte-cyan/40"
        onClick={onFlip}
        type="button"
        aria-label={labels?.flipFlashcard ?? "Flip flashcard"}
      >
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-pu3nte-cyan/30 bg-pu3nte-bg/85 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-pu3nte-cyan shadow-glow transition group-hover:scale-105">
          <Hand size={16} />
          <span>{labels?.tapCardToFlip ?? "Tap card to flip"}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">
          <span>{flipped ? labels?.back ?? "Back" : labels?.front ?? "Front"}</span>
          <RotateCcw className="mr-36 sm:mr-40" size={16} />
        </div>
        <motion.div initial={false} animate={{ rotateX: flipped ? 0 : 0 }} className="grid min-h-40 place-items-center text-center">
          <div className="w-full">
            {flipped && (
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-pu3nte-gold">
                {labels?.englishMeaning ?? "English meaning"}
              </p>
            )}
            <p className="text-4xl font-extrabold">{flipped ? card.definition : card.term}</p>
            {flipped && card.exampleSentence && (
              <div className="mx-auto mt-5 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-pu3nte-cyan">
                    {labels?.exampleInSpanish ?? "Spanish example"}
                  </p>
                  <p className="mt-2 text-pu3nte-secondary">{card.exampleSentence}</p>
                </div>
                {card.exampleTranslation && (
                  <div className="rounded-lg border border-pu3nte-gold/20 bg-pu3nte-gold/10 p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-pu3nte-gold">
                      {labels?.exampleInEnglish ?? "English translation"}
                    </p>
                    <p className="mt-2 text-pu3nte-secondary">{card.exampleTranslation}</p>
                  </div>
                )}
              </div>
            )}
            {flipped && card.notes && <p className="mt-2 text-sm text-pu3nte-muted">{card.notes}</p>}
          </div>
        </motion.div>
      </button>
      <div className="grid gap-3 sm:grid-cols-2">
        <GradientButton variant="ghost" onClick={onLearning}>{labels?.stillLearning ?? "Still learning"}</GradientButton>
        <GradientButton onClick={onKnow}>{labels?.know ?? "Know"}</GradientButton>
      </div>
      <p className="text-center text-xs text-pu3nte-muted">{labels?.shortcuts ?? "Shortcuts: space flips, 1 marks learning, 2 marks know."}</p>
    </div>
  );
}
