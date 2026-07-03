import type { SensitivityMode } from "../../utils/answer";

export interface StudySettings {
  direction: "term-definition" | "definition-term" | "random";
  multipleChoice: boolean;
  typed: boolean;
  accentMode: SensitivityMode;
  punctuationMode: SensitivityMode;
  shuffle: boolean;
  starredOnly: boolean;
}

export function StudySettingsPanel({
  settings,
  onChange,
  hasStarred,
  onReset,
  labels,
}: {
  settings: StudySettings;
  onChange: (settings: StudySettings) => void;
  hasStarred: boolean;
  onReset: () => void;
  labels?: Record<string, string>;
}) {
  const toggleOptions: Array<[keyof Pick<StudySettings, "multipleChoice" | "typed" | "shuffle" | "starredOnly">, string]> = [
    ["multipleChoice", labels?.multipleChoice ?? "Multiple choice"],
    ["typed", labels?.typedRecall ?? "Typed recall"],
    ["shuffle", labels?.shuffleCards ?? "Shuffle cards"],
    ["starredOnly", labels?.starredOnly ?? "Starred only"],
  ];

  return (
    <details className="glass-panel rounded-lg p-4">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold">{labels?.studySettings ?? "Optional practice settings"}</h2>
            <p className="mt-1 text-sm text-pu3nte-muted">
              {labels?.studySettingsHelp ?? "You can ignore these. They only change how the practice quiz behaves."}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-pu3nte-cyan">
            {labels?.openSettings ?? "Open"}
          </span>
        </div>
      </summary>

      <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-pu3nte-secondary">
            {labels?.direction ?? "Direction"}
          </p>
          <div className="grid gap-2">
            {[
              ["term-definition", labels?.termToDefinition ?? "Spanish to English"],
              ["definition-term", labels?.definitionToTerm ?? "English to Spanish"],
              ["random", labels?.random ?? "Random"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                  settings.direction === value ? "border-pu3nte-cyan bg-pu3nte-cyan/10 text-white" : "border-white/10 bg-white/[0.04] text-pu3nte-secondary"
                }`}
                onClick={() => onChange({ ...settings, direction: value as StudySettings["direction"] })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {toggleOptions.map(([key, label]) => (
            <label
              key={key}
              className={`flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm font-bold ${
                key === "starredOnly" && !hasStarred ? "opacity-50" : ""
              }`}
            >
              <span>{label}</span>
              <input
                type="checkbox"
                disabled={key === "starredOnly" && !hasStarred}
                checked={Boolean(settings[key])}
                onChange={(event) => onChange({ ...settings, [key]: event.target.checked })}
              />
            </label>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-bold text-pu3nte-secondary">
            {labels?.accentSensitivity ?? "Accent sensitivity"}
            <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={settings.accentMode} onChange={(event) => onChange({ ...settings, accentMode: event.target.value as SensitivityMode })}>
              <option value="strict">{labels?.strict ?? "Strict"}</option>
              <option value="forgiving">{labels?.forgiving ?? "Forgiving"}</option>
              <option value="ignore">{labels?.ignore ?? "Ignore"}</option>
            </select>
          </label>
          <label className="text-sm font-bold text-pu3nte-secondary">
            {labels?.punctuation ?? "Punctuation"}
            <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={settings.punctuationMode} onChange={(event) => onChange({ ...settings, punctuationMode: event.target.value as SensitivityMode })}>
              <option value="strict">{labels?.strict ?? "Strict"}</option>
              <option value="forgiving">{labels?.forgiving ?? "Forgiving"}</option>
              <option value="ignore">{labels?.ignore ?? "Ignore"}</option>
            </select>
          </label>
        </div>

        <button className="text-sm font-bold text-pu3nte-cyan" type="button" onClick={onReset}>
          {labels?.resetDeckProgress ?? "Reset this deck progress"}
        </button>
      </div>
    </details>
  );
}
