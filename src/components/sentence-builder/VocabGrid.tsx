import { shuffleArray } from "../../utils/study";
import type { SentenceStage } from "../../types";
import { VocabChip } from "./VocabChip";

export function VocabGrid({
  words,
  freshWords = [],
  vocabGuide = [],
  onOpenGuide,
  guideLabel,
}: {
  words: string[];
  freshWords?: string[];
  vocabGuide?: NonNullable<SentenceStage["vocabGuide"]>;
  onOpenGuide?: (word: string) => void;
  guideLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {shuffleArray(words).map((word) => (
        <VocabChip
          key={word}
          word={word}
          fresh={freshWords.includes(word)}
          hasGuide={vocabGuide.some((item) => item.word === word)}
          guideLabel={guideLabel}
          onOpenGuide={() => onOpenGuide?.(word)}
        />
      ))}
    </div>
  );
}
