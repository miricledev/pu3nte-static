import type { LanguageTarget } from "../../types";
import { isSafeOptionalSpanishSubjectPronounToken, normalizePunctuation, removeAccents } from "../../utils/answer";

type DiffStatus = "same" | "different" | "missing" | "optional";

interface DiffPair {
  user?: string;
  correct?: string;
  status: DiffStatus;
}

function tokenize(value: string) {
  return value.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)?|[^\s\p{L}\p{N}]/gu) ?? [];
}

function normalizeToken(value: string) {
  return normalizePunctuation(removeAccents(value.toLocaleLowerCase())).trim();
}

function tokensMatch(left: string, right: string) {
  return normalizeToken(left) === normalizeToken(right);
}

function alignTokens(userAnswer: string, correctAnswer: string, languageTarget?: LanguageTarget): DiffPair[] {
  const userTokens = tokenize(userAnswer);
  const correctTokens = tokenize(correctAnswer);
  const table = Array.from({ length: userTokens.length + 1 }, () => Array(correctTokens.length + 1).fill(0) as number[]);

  for (let userIndex = userTokens.length - 1; userIndex >= 0; userIndex -= 1) {
    for (let correctIndex = correctTokens.length - 1; correctIndex >= 0; correctIndex -= 1) {
      table[userIndex][correctIndex] = tokensMatch(userTokens[userIndex], correctTokens[correctIndex])
        ? table[userIndex + 1][correctIndex + 1] + 1
        : Math.max(table[userIndex + 1][correctIndex], table[userIndex][correctIndex + 1]);
    }
  }

  const pairs: DiffPair[] = [];
  let userIndex = 0;
  let correctIndex = 0;

  while (userIndex < userTokens.length || correctIndex < correctTokens.length) {
    if (userIndex < userTokens.length && correctIndex < correctTokens.length && tokensMatch(userTokens[userIndex], correctTokens[correctIndex])) {
      pairs.push({ user: userTokens[userIndex], correct: correctTokens[correctIndex], status: "same" });
      userIndex += 1;
      correctIndex += 1;
    } else if (correctIndex < correctTokens.length && (userIndex === userTokens.length || table[userIndex][correctIndex + 1] >= table[userIndex + 1]?.[correctIndex])) {
      pairs.push({ correct: correctTokens[correctIndex], status: "missing" });
      correctIndex += 1;
    } else if (userIndex < userTokens.length) {
      if (languageTarget === "spanish" && isSafeOptionalSpanishSubjectPronounToken(userTokens[userIndex], correctAnswer)) {
        pairs.push({ user: userTokens[userIndex], status: "optional" });
        userIndex += 1;
        continue;
      }
      pairs.push({ user: userTokens[userIndex], status: "different" });
      userIndex += 1;
    }
  }

  return pairs;
}

function TokenSpan({ token, status, side, highlight }: { token?: string; status: DiffStatus; side: "user" | "correct"; highlight: boolean }) {
  if (!token) {
    if (status === "optional") {
      return <span className="rounded border border-pu3nte-warning/30 bg-pu3nte-warning/10 px-1.5 py-1 text-pu3nte-warning">optional</span>;
    }
    return <span className="rounded px-1.5 py-1 text-pu3nte-muted opacity-60">∅</span>;
  }

  const shouldHighlight = highlight && status !== "same";
  const color =
    !shouldHighlight
      ? "bg-white/[0.04] text-pu3nte-text"
      : status === "optional"
        ? "border border-pu3nte-warning/40 bg-pu3nte-warning/10 text-white"
        : side === "user" && status === "different"
          ? "border border-pu3nte-error/40 bg-pu3nte-error/15 text-white"
          : "border border-pu3nte-success/40 bg-pu3nte-success/15 text-white";

  return <span className={`inline-block rounded px-1.5 py-1 ${color}`}>{token}</span>;
}

function SmartAnswerComparison({
  userAnswer,
  correctAnswer,
  labels,
  highlightDifferences,
  languageTarget,
}: {
  userAnswer: string;
  correctAnswer: string;
  labels: { yourAnswer: string; correctAnswer: string; answerComparison: string };
  highlightDifferences: boolean;
  languageTarget?: LanguageTarget;
}) {
  const pairs = alignTokens(userAnswer, correctAnswer, languageTarget);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{labels.answerComparison}</p>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <div className="rounded-lg border border-pu3nte-error/20 bg-pu3nte-error/5 p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-pu3nte-secondary">{labels.yourAnswer}</p>
          <div className="flex flex-wrap gap-1.5 text-sm">
            {pairs.map((pair, index) => (
              <TokenSpan key={`user-${index}-${pair.user ?? pair.correct}`} token={pair.user} status={pair.status} side="user" highlight={highlightDifferences} />
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-pu3nte-success/20 bg-pu3nte-success/5 p-3">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-pu3nte-secondary">{labels.correctAnswer}</p>
          <div className="flex flex-wrap gap-1.5 text-sm">
            {pairs.map((pair, index) => (
              <TokenSpan key={`correct-${index}-${pair.correct ?? pair.user}`} token={pair.correct} status={pair.status} side="correct" highlight={highlightDifferences} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnswerReveal({
  answer,
  explanation,
  label = "Answer",
  userAnswer,
  userLabel = "Your answer",
  correctLabel = "Correct answer",
  comparisonLabel = "Compare your answer",
  highlightDifferences = true,
  catchNotes = [],
  catchLabel = "Catch to notice",
  languageTarget,
}: {
  answer: string;
  explanation?: string;
  label?: string;
  userAnswer?: string;
  userLabel?: string;
  correctLabel?: string;
  comparisonLabel?: string;
  highlightDifferences?: boolean;
  catchNotes?: string[];
  catchLabel?: string;
  languageTarget?: LanguageTarget;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-pu3nte-success/30 bg-pu3nte-success/10 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-100">{label}</p>
      <p className="mt-2 text-2xl font-bold">{answer}</p>
      {userAnswer && (
        <SmartAnswerComparison
          userAnswer={userAnswer}
          correctAnswer={answer}
          labels={{ yourAnswer: userLabel, correctAnswer: correctLabel, answerComparison: comparisonLabel }}
          highlightDifferences={highlightDifferences}
          languageTarget={languageTarget}
        />
      )}
      {catchNotes.length > 0 && (
        <div className="rounded-lg border border-pu3nte-warning/35 bg-pu3nte-warning/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-warning">{catchLabel}</p>
          <div className="mt-2 space-y-2 text-sm text-pu3nte-secondary">
            {catchNotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      )}
      {explanation && <p className="mt-3 text-sm text-pu3nte-secondary">{explanation}</p>}
    </div>
  );
}
