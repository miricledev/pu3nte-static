export function BrandLogoText({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 font-extrabold tracking-[0.28em] text-pu3nte-text">
      <span>PU</span>
      <span className="bg-bridge bg-clip-text text-transparent">3</span>
      <span>NTE</span>
      {!compact && <span className="ml-2 hidden text-xs font-semibold tracking-[0.18em] text-pu3nte-secondary sm:inline">LAB</span>}
    </span>
  );
}
