import type { PropsWithChildren } from "react";

export function GlassCard({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`glass-panel rounded-lg p-5 ${className}`}>{children}</section>;
}
