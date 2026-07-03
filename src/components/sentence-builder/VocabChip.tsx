import { Info } from "lucide-react";

export function VocabChip({
  word,
  fresh = false,
  hasGuide = false,
  onOpenGuide,
  guideLabel = "Mini guide",
}: {
  word: string;
  fresh?: boolean;
  hasGuide?: boolean;
  onOpenGuide?: () => void;
  guideLabel?: string;
}) {
  const className = `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition ${
    fresh ? "border-pu3nte-gold/50 bg-pu3nte-gold/10 text-yellow-100" : "border-white/10 bg-white/[0.05] text-pu3nte-text"
  } ${hasGuide ? "hover:border-pu3nte-cyan/50" : ""}`;

  if (!hasGuide) {
    return <span className={className}>{word}</span>;
  }

  return (
    <button type="button" className={className} onClick={onOpenGuide} aria-label={`${guideLabel}: ${word}`}>
      {word}
      <Info size={14} />
    </button>
  );
}
