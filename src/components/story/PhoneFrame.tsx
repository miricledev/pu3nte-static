import type { PropsWithChildren } from "react";

export function PhoneFrame({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto h-[620px] max-h-[calc(100dvh-120px)] min-h-[500px] w-full max-w-[640px] rounded-[1.5rem] border border-white/10 bg-pu3nte-bg2 p-2 shadow-glow sm:h-[680px] sm:rounded-[2rem] sm:p-3">
      <div className="h-full overflow-hidden rounded-[1.15rem] border border-white/10 bg-pu3nte-card p-3 sm:rounded-[1.5rem] sm:p-4">
        {children}
      </div>
    </div>
  );
}
