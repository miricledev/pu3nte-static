export function TenseSelector({
  tenses,
  value,
  onChange,
  label = "Tense",
}: {
  tenses: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const labels: Record<string, string> = {
    present: "Present",
    preterite: "Preterite",
    imperfect: "Imperfect",
    future: "Future",
    conditional: "Conditional",
    presentPerfect: "Present perfect",
    pastPerfect: "Past perfect",
    presentSubjunctive: "Present subjunctive",
    imperfectSubjunctive: "Imperfect subjunctive",
    imperative: "Imperative",
    gerund: "Gerund",
    pastParticiple: "Past participle",
  };

  return (
    <label className="text-sm text-pu3nte-secondary">
      {label}
      <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {tenses.map((tense) => <option key={tense} value={tense}>{labels[tense] ?? tense}</option>)}
      </select>
    </label>
  );
}
