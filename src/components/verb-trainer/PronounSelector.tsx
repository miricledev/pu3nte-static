export function PronounSelector({
  persons,
  value,
  onChange,
  label = "Person",
}: {
  persons: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <label className="text-sm text-pu3nte-secondary">
      {label}
      <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {persons.map((person) => <option key={person}>{person}</option>)}
      </select>
    </label>
  );
}
