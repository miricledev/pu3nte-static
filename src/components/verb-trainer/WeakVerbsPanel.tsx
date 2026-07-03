export function WeakVerbsPanel({ verbs, tenses, labels }: { verbs: Record<string, number>; tenses: Record<string, number>; labels?: Record<string, string> }) {
  const entries = [...Object.entries(verbs), ...Object.entries(tenses)];
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <h3 className="font-bold">{labels?.weakSpots ?? "Weak spots"}</h3>
      {entries.length === 0 ? <p className="mt-2 text-sm text-pu3nte-secondary">{labels?.noWeakSpots ?? "No weak verbs or tenses yet."}</p> : (
        <ul className="mt-2 grid gap-1 text-sm text-pu3nte-secondary">
          {entries.map(([key, value]) => <li key={key}>{key}: {value} {labels?.misses ?? "misses"}</li>)}
        </ul>
      )}
    </div>
  );
}
