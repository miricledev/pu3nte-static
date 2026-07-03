import { Sparkles } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <GlassCard className="text-center">
      <Sparkles className="mx-auto mb-3 text-pu3nte-cyan" />
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-2 text-sm text-pu3nte-secondary">{body}</p>
    </GlassCard>
  );
}
