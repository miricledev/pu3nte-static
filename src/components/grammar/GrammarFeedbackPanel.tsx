export function GrammarFeedbackPanel({
  tone,
  title,
  message,
  explanation,
}: {
  tone: "correct" | "almost" | "incorrect";
  title: string;
  message: string;
  explanation?: string;
}) {
  const style =
    tone === "correct"
      ? "border-pu3nte-success/40 bg-pu3nte-success/10"
      : tone === "almost"
        ? "border-pu3nte-warning/40 bg-pu3nte-warning/10"
        : "border-pu3nte-error/40 bg-pu3nte-error/10";

  return (
    <div className={`rounded-lg border p-4 ${style}`} aria-live="polite">
      <p className="font-bold">{title}</p>
      <p className="mt-1 text-sm text-pu3nte-secondary">{message}</p>
      {explanation && <p className="mt-2 text-sm text-pu3nte-secondary">{explanation}</p>}
    </div>
  );
}
