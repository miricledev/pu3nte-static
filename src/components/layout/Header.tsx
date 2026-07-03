import { ExternalLink } from "lucide-react";
import { BrandLogo } from "../ui/BrandLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pu3nte-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="bridge-line flex items-center gap-3 pb-1" aria-label="PU3NTE Interactive Lab">
          <BrandLogo />
          <span className="hidden text-xs font-semibold tracking-[0.18em] text-pu3nte-secondary sm:inline">INTERACTIVE LAB</span>
        </div>
        <a
          href="https://www.skool.com/"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-pu3nte-text transition hover:bg-white/[0.08]"
        >
          Skool
          <ExternalLink size={14} />
        </a>
      </div>
    </header>
  );
}
