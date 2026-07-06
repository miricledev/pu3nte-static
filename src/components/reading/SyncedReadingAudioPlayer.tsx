import { useEffect, useMemo, useRef, useState } from "react";

type TimedWord = {
  text: string;
  start: number;
  end: number;
};

const playbackRates = [0.5, 0.8, 1, 1.1, 1.25, 1.5];

export function SyncedReadingAudioPlayer({
  audioUrl,
  alignmentUrl,
}: {
  audioUrl: string;
  alignmentUrl: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeWordRef = useRef<HTMLSpanElement | null>(null);
  const [words, setWords] = useState<TimedWord[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rateIndex, setRateIndex] = useState(2);
  const [loadError, setLoadError] = useState(false);

  const activeWordIndex = useMemo(() => {
    if (!words.length) return -1;
    const index = words.findIndex((word) => currentTime >= word.start && currentTime < word.end);
    if (index !== -1) return index;
    for (let i = words.length - 1; i >= 0; i -= 1) {
      if (currentTime >= words[i].start) return i;
    }
    return -1;
  }, [currentTime, words]);

  useEffect(() => {
    let cancelled = false;
    setLoadError(false);
    fetch(alignmentUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not load reading alignment: ${response.status}`);
        return response.json() as Promise<TimedWord[]>;
      })
      .then((nextWords) => {
        if (!cancelled) setWords(nextWords);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [alignmentUrl]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = playbackRates[rateIndex];
  }, [rateIndex]);

  useEffect(() => {
    activeWordRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  }, [activeWordIndex]);

  function syncTime() {
    setCurrentTime(audioRef.current?.currentTime ?? 0);
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.playbackRate = playbackRates[rateIndex];
      void audio.play();
    } else {
      audio.pause();
    }
  }

  function jump(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || Number.POSITIVE_INFINITY, audio.currentTime + seconds));
    syncTime();
  }

  return (
    <div className="rounded-2xl border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-4 shadow-inner">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-cyan">Synced audio reading</p>
          <h2 className="mt-1 text-lg font-black text-pu3nte-text">Listen and follow the highlighted word</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-pu3nte-secondary transition hover:bg-white/[0.08] hover:text-pu3nte-text" onClick={() => jump(-5)}>
            -5s
          </button>
          <button type="button" className="rounded-full bg-pu3nte-cyan px-5 py-2 text-sm font-black text-pu3nte-bg transition hover:scale-105" onClick={togglePlayback}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-pu3nte-secondary transition hover:bg-white/[0.08] hover:text-pu3nte-text" onClick={() => jump(5)}>
            +5s
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onTimeUpdate={syncTime}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="mt-4 w-full"
        controls
      />

      <div className="mt-4 rounded-xl border border-white/10 bg-black/15 p-3">
        <label htmlFor="reading-playback-speed" className="text-sm font-bold text-pu3nte-text">
          Speed: {playbackRates[rateIndex]}x
        </label>
        <input
          id="reading-playback-speed"
          type="range"
          min={0}
          max={playbackRates.length - 1}
          step={1}
          value={rateIndex}
          onChange={(event) => setRateIndex(Number(event.target.value))}
          className="mt-2 w-full accent-pu3nte-cyan"
        />
        <div className="mt-1 flex justify-between text-[11px] font-bold text-pu3nte-secondary">
          {playbackRates.map((rate) => <span key={rate}>{rate}x</span>)}
        </div>
      </div>

      {loadError ? (
        <p className="mt-4 rounded-lg border border-pu3nte-error/40 bg-pu3nte-error/10 p-3 text-sm text-pu3nte-secondary">
          Audio loaded, but the word timing file could not be loaded.
        </p>
      ) : (
        <div className="mt-4 max-h-56 overflow-y-auto rounded-xl border border-white/10 bg-pu3nte-bg/70 p-4 leading-8">
          {words.map((word, index) => (
            <span
              key={`${word.text}-${word.start}-${index}`}
              ref={index === activeWordIndex ? activeWordRef : undefined}
              className={`mx-0.5 rounded-md px-1 transition ${index === activeWordIndex ? "bg-pu3nte-gold text-pu3nte-bg shadow-lg shadow-pu3nte-gold/20" : "text-pu3nte-secondary"}`}
            >
              {word.text}
            </span>
          ))}
          {!words.length && <span className="text-sm text-pu3nte-secondary">Loading synced transcript...</span>}
        </div>
      )}
    </div>
  );
}
