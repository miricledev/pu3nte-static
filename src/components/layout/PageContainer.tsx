import type { PropsWithChildren } from "react";

export function PageContainer({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <main className={`mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 ${className}`}>{children}</main>;
}
