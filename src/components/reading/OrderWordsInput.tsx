import { useMemo } from "react";
import { shuffleArray } from "../../utils/study";

export function OrderWordsInput({
  words,
  selectedWords,
  onChange,
  emptyLabel = "Tap word tiles below to build the sentence.",
}: {
  words: string[];
  selectedWords: string[];
  onChange: (words: string[]) => void;
  emptyLabel?: string;
}) {
  const shuffledWords = useMemo(() => shuffleArray(words), [words.join("|")]);
  const usedCounts = selectedWords.reduce<Record<string, number>>((counts, word) => {
    counts[word] = (counts[word] ?? 0) + 1;
    return counts;
  }, {});
  const wordCounts = words.reduce<Record<string, number>>((counts, word) => {
    counts[word] = (counts[word] ?? 0) + 1;
    return counts;
  }, {});

  function addWord(word: string) {
    const used = usedCounts[word] ?? 0;
    const available = wordCounts[word] ?? 0;
    if (used >= available) return;
    onChange([...selectedWords, word]);
  }

  function removeAt(index: number) {
    onChange(selectedWords.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="min-w-0 max-w-full space-y-3 overflow-hidden">
      <div className="min-h-16 min-w-0 max-w-full overflow-hidden rounded-lg border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-3">
        {selectedWords.length ? (
          <div className="flex min-w-0 max-w-full flex-wrap gap-2">
            {selectedWords.map((word, index) => (
              <button
                key={`${word}-${index}`}
                type="button"
                className="max-w-full whitespace-normal break-words rounded-md border border-pu3nte-cyan/40 bg-pu3nte-cyan/15 px-3 py-2 text-sm font-bold [overflow-wrap:anywhere]"
                onClick={() => removeAt(index)}
              >
                {word}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-pu3nte-secondary">{emptyLabel}</p>
        )}
      </div>
      <div className="flex min-w-0 max-w-full flex-wrap gap-2 overflow-hidden">
        {shuffledWords.map((word, index) => {
          const used = (usedCounts[word] ?? 0) >= (wordCounts[word] ?? 0);
          return (
            <button
              key={`${word}-${index}`}
              type="button"
              disabled={used}
              className="max-w-full whitespace-normal break-words rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-bold [overflow-wrap:anywhere] disabled:cursor-not-allowed disabled:opacity-35"
              onClick={() => addWord(word)}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
