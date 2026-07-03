import type { Level } from "../../types";

export function LevelBadge({ level }: { level: Level }) {
  return <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold capitalize text-pu3nte-secondary">{level}</span>;
}
