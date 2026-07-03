import { X } from "lucide-react";
import type { SentenceStage } from "../../types";
import { GradientButton } from "../ui/GradientButton";

type VocabGuide = NonNullable<SentenceStage["vocabGuide"]>[number];

export function VocabGuideModal({
  guide,
  onClose,
  labels,
}: {
  guide?: VocabGuide;
  onClose: () => void;
  labels?: { miniGuide?: string; closeMiniGuide?: string; examples?: string; backToSentence?: string };
}) {
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true">
      <div className="glass-panel w-full max-w-lg rounded-lg p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-pu3nte-cyan">{labels?.miniGuide ?? "Mini guide"}</p>
            <h2 className="mt-2 text-3xl font-extrabold">{guide.word}</h2>
            <p className="mt-2 text-lg font-semibold text-pu3nte-gold">{guide.translation}</p>
          </div>
          <button type="button" className="rounded-md border border-white/10 p-2 text-pu3nte-secondary hover:text-pu3nte-text" onClick={onClose} aria-label={labels?.closeMiniGuide ?? "Close mini guide"}>
            <X size={18} />
          </button>
        </div>
        {guide.note && <p className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm text-pu3nte-secondary">{guide.note}</p>}
        {guide.exampleSentences?.length ? (
          <div className="mt-5">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-pu3nte-secondary">{labels?.examples ?? "Examples"}</h3>
            <div className="mt-3 grid gap-3">
              {guide.exampleSentences.map((example) => (
                <div key={`${example.source}-${example.translation}`} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                  <p className="font-bold">{example.source}</p>
                  <p className="mt-1 text-sm text-pu3nte-secondary">{example.translation}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <GradientButton className="mt-6 w-full" onClick={onClose}>{labels?.backToSentence ?? "Back to sentence"}</GradientButton>
      </div>
    </div>
  );
}
