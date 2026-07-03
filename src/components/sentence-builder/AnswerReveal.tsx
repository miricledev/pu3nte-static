export function AnswerReveal({ answer, explanation, label = "Answer" }: { answer: string; explanation?: string; label?: string }) {
  return (
    <div className="rounded-lg border border-pu3nte-success/30 bg-pu3nte-success/10 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-100">{label}</p>
      <p className="mt-2 text-2xl font-bold">{answer}</p>
      {explanation && <p className="mt-3 text-sm text-pu3nte-secondary">{explanation}</p>}
    </div>
  );
}
