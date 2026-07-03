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
  return (
    <div className="glass-panel rounded-lg p-4">
      <h2 className="font-bold">{labels?.studySettings ?? "Study Settings"}</h2>
      <p className="mt-1 text-sm text-pu3nte-muted">
        {labels?.studySettingsHelp ?? "You can ignore these. They only change how the practice quiz behaves."}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-sm text-pu3nte-secondary">
          {labels?.direction ?? "Direction"}
          <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={settings.direction} onChange={(event) => onChange({ ...settings, direction: event.target.value as StudySettings["direction"] })}>
            <option value="term-definition">{labels?.termToDefinition ?? "Term to definition"}</option>
            <option value="definition-term">{labels?.definitionToTerm ?? "Definition to term"}</option>
            <option value="random">{labels?.random ?? "Random"}</option>
          </select>
        </label>
        <label className="text-sm text-pu3nte-secondary">
          {labels?.accentSensitivity ?? "Accent sensitivity"}
          <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={settings.accentMode} onChange={(event) => onChange({ ...settings, accentMode: event.target.value as SensitivityMode })}>
            <option value="strict">{labels?.strict ?? "Strict"}</option>
            <option value="forgiving">{labels?.forgiving ?? "Forgiving"}</option>
            <option value="ignore">{labels?.ignore ?? "Ignore"}</option>
          </select>
        </label>
        <label className="text-sm text-pu3nte-secondary">
          {labels?.punctuation ?? "Punctuation"}
          <select className="mt-1 w-full rounded-md border border-white/10 bg-pu3nte-card p-2" value={settings.punctuationMode} onChange={(event) => onChange({ ...settings, punctuationMode: event.target.value as SensitivityMode })}>
            <option value="strict">{labels?.strict ?? "Strict"}</option>
            <option value="forgiving">{labels?.forgiving ?? "Forgiving"}</option>
            <option value="ignore">{labels?.ignore ?? "Ignore"}</option>
          </select>
        </label>
        {[
          ["multipleChoice", labels?.multipleChoice ?? "Multiple choice"],
          ["typed", labels?.typedRecall ?? "Typed recall"],
          ["shuffle", labels?.shuffleCards ?? "Shuffle cards"],
          ["starredOnly", labels?.starredOnly ?? "Starred only"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm text-pu3nte-secondary">
            <input
              type="checkbox"
              disabled={key === "starredOnly" && !hasStarred}
              checked={Boolean(settings[key as keyof StudySettings])}
              onChange={(event) => onChange({ ...settings, [key]: event.target.checked })}
            />
            {label}
          </label>
        ))}
      </div>
      <button className="mt-4 text-sm font-bold text-pu3nte-cyan" type="button" onClick={onReset}>
        {labels?.resetDeckProgress ?? "Reset this deck progress"}
      </button>
    </div>
  );
}
