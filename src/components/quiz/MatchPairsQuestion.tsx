import { useMemo, useState } from "react";
import type { CheckpointQuestion } from "../../types";
import { shuffleArray } from "../../utils/study";

const pairStyles = [
  "border-pu3nte-cyan bg-pu3nte-cyan/15 text-cyan-50",
  "border-pu3nte-gold bg-pu3nte-gold/15 text-yellow-50",
  "border-pu3nte-blue bg-pu3nte-blue/15 text-blue-50",
  "border-pu3nte-success bg-pu3nte-success/15 text-green-50",
  "border-violet-400 bg-violet-500/15 text-violet-50",
  "border-pu3nte-orange bg-pu3nte-orange/15 text-orange-50",
];

const wrongStyle = "border-pu3nte-error bg-pu3nte-error/20 text-red-50";

export function MatchPairsQuestion({
  question,
  onAnswer,
  labels,
}: {
  question: CheckpointQuestion;
  onAnswer: (correct: boolean) => void;
  labels?: { guide?: string; matched?: string; complete?: string };
}) {
  const pairs = question.pairs ?? [];
  const leftItems = useMemo(() => shuffleArray(pairs.map((pair) => pair.left)), [question.id]);
  const rightItems = useMemo(() => shuffleArray(pairs.map((pair) => pair.right)), [question.id]);
  const pairColorByLeft = useMemo(
    () => Object.fromEntries(pairs.map((pair, index) => [pair.left, pairStyles[index % pairStyles.length]])),
    [question.id],
  );
  const [activeLeft, setActiveLeft] = useState<string>();
  const [correctMatches, setCorrectMatches] = useState<Record<string, string>>({});
  const [wrongFlash, setWrongFlash] = useState<{ left: string; right: string }>();
  const complete = pairs.length > 0 && Object.keys(correctMatches).length === pairs.length;

  function getLeftForRight(right: string) {
    return pairs.find((pair) => pair.right === right)?.left;
  }

  function chooseRight(right: string) {
    if (!activeLeft || complete || Object.values(correctMatches).includes(right)) return;
    const expected = pairs.find((pair) => pair.left === activeLeft)?.right;

    if (expected === right) {
      const nextMatches = { ...correctMatches, [activeLeft]: right };
      setCorrectMatches(nextMatches);
      setActiveLeft(undefined);
      if (Object.keys(nextMatches).length === pairs.length) onAnswer(true);
      return;
    }

    const failedLeft = activeLeft;
    setWrongFlash({ left: failedLeft, right });
    setActiveLeft(undefined);
    window.setTimeout(() => setWrongFlash(undefined), 650);
  }

  function buttonStyle(base: string, lockedStyle?: string, flashing = false, selected = false) {
    if (flashing) return `${base} ${wrongStyle}`;
    if (lockedStyle) return `${base} ${lockedStyle} cursor-default`;
    if (selected) return `${base} border-pu3nte-cyan bg-pu3nte-cyan/10`;
    return `${base} border-white/10 bg-white/[0.04] hover:border-pu3nte-cyan/40`;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-pu3nte-secondary">{labels?.guide ?? "Tap a word on the left, then tap its match on the right. Correct pairs lock into matching colors."}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          {leftItems.map((left) => {
            const locked = correctMatches[left];
            const lockedStyle = locked ? pairColorByLeft[left] : undefined;
            const flashing = wrongFlash?.left === left;
            return (
              <button
                key={left}
                type="button"
                disabled={Boolean(locked) || complete}
                className={buttonStyle("rounded-lg border p-3 text-left font-bold transition", lockedStyle, flashing, activeLeft === left)}
                onClick={() => setActiveLeft(left)}
              >
                <span>{left}</span>
                {locked && <span className="ml-2 text-sm font-semibold">→ {locked}</span>}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2">
          {rightItems.map((right) => {
            const correctLeft = getLeftForRight(right);
            const lockedLeft = Object.entries(correctMatches).find(([, matchedRight]) => matchedRight === right)?.[0];
            const lockedStyle = lockedLeft ? pairColorByLeft[lockedLeft] : undefined;
            const flashing = wrongFlash?.right === right;
            return (
              <button
                key={right}
                type="button"
                disabled={!activeLeft || Boolean(lockedLeft) || complete}
                className={buttonStyle("rounded-lg border p-3 text-left font-bold transition", lockedStyle, flashing)}
                onClick={() => chooseRight(right)}
              >
                {right}
                {lockedLeft && correctLeft && <span className="ml-2 text-xs font-semibold opacity-80">{labels?.matched ?? "matched"}</span>}
              </button>
            );
          })}
        </div>
      </div>
      {complete && (
        <p className="rounded-md border border-pu3nte-success/40 bg-pu3nte-success/10 p-3 text-sm font-semibold text-green-50" aria-live="polite">
          {labels?.complete ?? "Correct. All pairs matched."}
        </p>
      )}
    </div>
  );
}
