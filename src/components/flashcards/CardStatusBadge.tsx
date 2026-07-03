import type { CardProgress } from "../../types";

export function CardStatusBadge({ status = "new", labels }: { status?: CardProgress["status"]; labels?: Record<string, string> }) {
  const styles = {
    new: "border-white/10 bg-white/[0.04] text-pu3nte-secondary",
    learning: "border-pu3nte-warning/40 bg-pu3nte-warning/10 text-amber-100",
    reviewing: "border-pu3nte-blue/40 bg-pu3nte-blue/10 text-blue-100",
    mastered: "border-pu3nte-success/40 bg-pu3nte-success/10 text-green-100",
  };
  const labelByStatus: Record<CardProgress["status"], string> = {
    new: labels?.new ?? "new",
    learning: labels?.learning ?? "learning",
    reviewing: labels?.reviewing ?? "reviewing",
    mastered: labels?.masteredStatus ?? "mastered",
  };
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${styles[status]}`}>{labelByStatus[status]}</span>;
}
