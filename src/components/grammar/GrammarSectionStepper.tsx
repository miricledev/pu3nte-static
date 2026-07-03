import type { GrammarPracticeSection } from "../../types";

export function GrammarSectionStepper({
  sections,
  currentIndex,
  stepLabel = "Step",
}: {
  sections: GrammarPracticeSection[];
  currentIndex: number;
  stepLabel?: string;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {sections.map((section, index) => (
        <div key={section.id} className={`rounded-lg border p-3 ${index === currentIndex ? "border-pu3nte-cyan/40 bg-pu3nte-cyan/10" : index < currentIndex ? "border-pu3nte-success/40 bg-pu3nte-success/10" : "border-white/10 bg-white/[0.04]"}`}>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-pu3nte-secondary">{stepLabel} {index + 1}</p>
          <p className="mt-1 text-sm font-bold">{section.title}</p>
        </div>
      ))}
    </div>
  );
}
