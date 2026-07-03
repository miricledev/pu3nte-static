import { InfoTip } from "./InfoTip";

export function InstructionPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border border-pu3nte-cyan/20 bg-pu3nte-cyan/10 p-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-cyan">{title}</p>
        <p className="mt-1 text-sm text-pu3nte-secondary">{body}</p>
      </div>
      <InfoTip label={title}>{body}</InfoTip>
    </div>
  );
}
