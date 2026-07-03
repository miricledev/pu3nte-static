import { ExternalLink, Sparkles, Trophy } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";
import { allActivities } from "../data";
import { PageContainer } from "../components/layout/PageContainer";
import { BrandLogo } from "../components/ui/BrandLogo";
import { BridgeDivider } from "../components/ui/BridgeDivider";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useProgress } from "../hooks/useProgress";
import { getUiLanguage, uiText } from "../utils/uiText";

const fallbackSkoolUrl = "https://www.skool.com/";

export function CompletionPage() {
  const { activityId } = useParams();
  const [searchParams] = useSearchParams();
  const { progress } = useProgress();
  const activity = allActivities.find((item) => item.id === activityId);
  const score = searchParams.get("score");
  const percentage = activity ? (score ? Number(score) : progress.percentages[activity.id] ?? 100) : 100;
  const skoolUrl = activity?.skoolReturnUrl ?? fallbackSkoolUrl;
  const copy = activity ? uiText(getUiLanguage(activity.languageTarget, activity.learnerNativeLanguage)) : uiText("en");

  return (
    <PageContainer className="grid min-h-[calc(100vh-80px)] place-items-center">
      <GlassCard className="w-full max-w-3xl overflow-hidden p-0">
        <div className="relative p-6 sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-bridge" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BrandLogo />
            <span className="inline-flex items-center gap-2 rounded-full border border-pu3nte-success/40 bg-pu3nte-success/10 px-3 py-1 text-xs font-bold text-green-100">
              <Trophy size={14} />
              {copy.lessonComplete}
            </span>
          </div>
          <BridgeDivider />
          <div className="text-center">
            <Sparkles className="mx-auto text-pu3nte-cyan" size={36} />
            <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-[0.06em] sm:text-5xl">
              {copy.bridgeCrossed}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-pu3nte-secondary">
              {activity ? `${activity.title} — ${copy.returnCommunityMessage}` : copy.returnCommunityMessage}
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <ProgressBar value={Math.max(0, Math.min(100, percentage))} label={score ? `Score ${score}%` : copy.activityProgress} />
          </div>
          <div className="mx-auto mt-8 max-w-sm">
            <a href={skoolUrl} className="contents">
              <GradientButton className="w-full gap-2">
                {copy.returnSkool}
                <ExternalLink size={16} />
              </GradientButton>
            </a>
          </div>
        </div>
      </GlassCard>
    </PageContainer>
  );
}
