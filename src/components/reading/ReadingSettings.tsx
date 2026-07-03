export function ReadingSettings({
  fontSize,
  setFontSize,
  focus,
  setFocus,
  labels,
}: {
  fontSize: number;
  setFontSize: (value: number) => void;
  focus: boolean;
  setFocus: (value: boolean) => void;
  labels?: { focusMode?: string };
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <button type="button" className="rounded-md border border-white/10 px-3 py-2 text-sm" onClick={() => setFontSize(Math.max(16, fontSize - 2))}>A-</button>
      <button type="button" className="rounded-md border border-white/10 px-3 py-2 text-sm" onClick={() => setFontSize(Math.min(24, fontSize + 2))}>A+</button>
      <label className="flex items-center gap-2 text-sm text-pu3nte-secondary">
        <input type="checkbox" checked={focus} onChange={(event) => setFocus(event.target.checked)} />
        {labels?.focusMode ?? "Focus mode"}
      </label>
    </div>
  );
}
