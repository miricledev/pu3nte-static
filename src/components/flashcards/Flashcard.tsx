import { RotateCcw } from "lucide-react";
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
  };
}) {
  return (
    <div className="space-y-4">
      <button
        className="glass-panel min-h-64 w-full rounded-lg p-6 text-left transition hover:border-pu3nte-cyan/40"
        onClick={onFlip}
        type="button"
        aria-label={labels?.flipFlashcard ?? "Flip flashcard"}
      >
        <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">
          <span>{flipped ? labels?.back ?? "Back" : labels?.front ?? "Front"}</span>
          <RotateCcw size={16} />
        </div>
        <motion.div initial={false} animate={{ rotateX: flipped ? 0 : 0 }} className="grid min-h-40 place-items-center text-center">
          <div>
            <p className="text-4xl font-extrabold">{flipped ? card.definition : card.term}</p>
            {flipped && card.exampleSentence && <p className="mt-4 text-pu3nte-secondary">{card.exampleSentence}</p>}
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
