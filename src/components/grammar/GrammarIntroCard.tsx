import type { GrammarIntro } from "../../types";
import { BridgeDivider } from "../ui/BridgeDivider";
import { GlassCard } from "../ui/GlassCard";
import { GradientButton } from "../ui/GradientButton";
import { GrammarCommonMistakes } from "./GrammarCommonMistakes";
import { GrammarExampleCard } from "./GrammarExampleCard";

export function GrammarIntroCard({
  intro,
  onStart,
  labels,
}: {
  intro: GrammarIntro;
  onStart: () => void;
  labels?: { understandPattern?: string; grammarSnapshot?: string; startPractice?: string; commonMistake?: string };
}) {
  return (
    <GlassCard className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-pu3nte-cyan">{labels?.understandPattern ?? "Understand the pattern"}</p>
        <h2 className="mt-2 text-2xl font-extrabold">{labels?.grammarSnapshot ?? "Grammar Snapshot"}</h2>
        <p className="mt-3 text-pu3nte-secondary">{intro.shortExplanation}</p>
      </div>
      {intro.pattern && <div className="rounded-lg border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-4 font-bold">{intro.pattern}</div>}
      {intro.quickRules?.length ? (
        <div className="grid gap-2 sm:grid-cols-3">
          {intro.quickRules.map((rule) => <div key={rule} className="rounded-lg border border-white/10 bg-white/[0.04] p-3 text-sm text-pu3nte-secondary">{rule}</div>)}
        </div>
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {intro.examples.map((example) => <GrammarExampleCard key={example.targetText} example={example} />)}
      </div>
      <GrammarCommonMistakes mistakes={intro.commonMistakes ?? []} title={labels?.commonMistake} />
      <BridgeDivider />
      <GradientButton onClick={onStart}>{labels?.startPractice ?? "Start practice"}</GradientButton>
    </GlassCard>
  );
}
