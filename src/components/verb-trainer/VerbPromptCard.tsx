export function VerbPromptCard({ prompt, meta }: { prompt: string; meta: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-secondary">{meta}</p>
      <h2 className="mt-3 text-3xl font-extrabold">{prompt}</h2>
    </div>
  );
}
