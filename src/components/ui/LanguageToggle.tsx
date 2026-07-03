import type { LanguageTarget } from "../../types";

export function LanguageToggle({
  value,
  onChange,
}: {
  value: LanguageTarget | "all";
  onChange: (value: LanguageTarget | "all") => void;
}) {
  const options: Array<{ value: LanguageTarget | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "spanish", label: "Spanish" },
    { value: "english", label: "English" },
  ];
  return (
    <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.04] p-1">
      {options.map((option) => (
        <button
          key={option.value}
          className={`rounded-md px-3 py-2 text-xs font-bold transition ${value === option.value ? "bg-bridge text-pu3nte-bg" : "text-pu3nte-secondary hover:text-pu3nte-text"}`}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
