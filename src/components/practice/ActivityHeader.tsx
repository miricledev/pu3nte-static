import type { ActivityType, LanguageTarget, LearnerNativeLanguage, Level } from "../../types";
import { getUiLanguage, uiText } from "../../utils/uiText";
import { BridgeDivider } from "../ui/BridgeDivider";
import { LanguagePill } from "../ui/LanguagePill";
import { LevelBadge } from "../ui/LevelBadge";

export function ActivityHeader({
  title,
  subtitle,
  activityType,
  languageTarget,
  learnerNativeLanguage,
  level,
  estimatedMinutes,
}: {
  title: string;
  subtitle: string;
  activityType: ActivityType;
  languageTarget: LanguageTarget;
  learnerNativeLanguage?: LearnerNativeLanguage;
  level: Level;
  estimatedMinutes: number;
}) {
  const copy = uiText(getUiLanguage(languageTarget, learnerNativeLanguage));

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <LanguagePill language={languageTarget} />
        <LevelBadge level={level} />
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-pu3nte-secondary">
          {copy.activity}: {activityType.replace("-", " ")} · {estimatedMinutes} {copy.minutes}
        </span>
      </div>
      <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-[0.06em] sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-3xl text-pu3nte-secondary">{subtitle}</p>
      <BridgeDivider />
    </div>
  );
}
