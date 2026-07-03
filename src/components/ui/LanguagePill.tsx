import type { LanguageTarget } from "../../types";

export function LanguagePill({ language }: { language: LanguageTarget | "mixed" }) {
  const label = language === "spanish" ? "Learn Spanish" : language === "english" ? "Learn English" : "Mixed";
  const style =
    language === "spanish"
      ? "border-pu3nte-red/35 bg-pu3nte-red/10 text-red-100"
      : language === "english"
        ? "border-pu3nte-cyan/35 bg-pu3nte-cyan/10 text-cyan-100"
        : "border-white/15 bg-white/5 text-pu3nte-secondary";
  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${style}`}>{label}</span>;
}
