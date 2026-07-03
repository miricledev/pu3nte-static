export function SentencePrompt({ prompt }: { prompt: string }) {
  return (
    <div className="rounded-lg border border-pu3nte-cyan/20 bg-pu3nte-cyan/10 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-pu3nte-cyan">Translate</p>
      <p className="mt-2 text-2xl font-extrabold">{prompt}</p>
    </div>
  );
}
