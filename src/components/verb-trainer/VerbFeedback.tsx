export function VerbFeedback({ message, correct }: { message: string; correct?: boolean }) {
  if (!message) return null;
  return (
    <div className={`rounded-lg border p-4 text-sm ${correct ? "border-pu3nte-success/40 bg-pu3nte-success/10" : "border-pu3nte-error/40 bg-pu3nte-error/10"}`} aria-live="polite">
      {message}
    </div>
  );
}
