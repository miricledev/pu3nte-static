export function QuizOption({ option, selected, correct, onClick }: { option: string; selected: boolean; correct?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`rounded-lg border p-4 text-left font-semibold transition ${selected ? (correct ? "border-pu3nte-success bg-pu3nte-success/10" : "border-pu3nte-error bg-pu3nte-error/10") : "border-white/10 bg-white/[0.04] hover:border-pu3nte-cyan/50"}`}
      onClick={onClick}
    >
      {option}
    </button>
  );
}
