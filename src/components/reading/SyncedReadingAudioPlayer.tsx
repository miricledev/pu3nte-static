import { useEffect, useMemo, useRef, useState } from "react";

type TimedWord = {
  text: string;
  start: number;
  end: number;
};

type AlignmentPayload =
  | TimedWord[]
  | {
      words?: Array<Partial<TimedWord> & { word?: string }>;
    };

const playbackRates = [0.5, 0.8, 1, 1.1, 1.25, 1.5];

function normalizeTimedWords(payload: AlignmentPayload): TimedWord[] {
  const rawWords: Array<Partial<TimedWord> & { word?: string }> = Array.isArray(payload) ? payload : payload.words ?? [];
  return rawWords
    .map((word) => ({
      text: word.text ?? word.word ?? "",
      start: Number(word.start),
      end: Number(word.end),
    }))
    .filter((word) => word.text && Number.isFinite(word.start) && Number.isFinite(word.end));
}

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
  const [duration, setDuration] = useState(0);
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
        return response.json() as Promise<AlignmentPayload>;
      })
      .then((payload) => {
        if (!cancelled) setWords(normalizeTimedWords(payload));
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
    activeWordRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
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

  function seek(nextTime: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-pu3nte-cyan/25 bg-pu3nte-cyan/10 p-3 shadow-inner sm:p-4">
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pu3nte-cyan">Synced audio reading</p>
          <h2 className="mt-1 break-words text-base font-black text-pu3nte-text sm:text-lg">Listen and follow the highlighted word</h2>
        </div>
        <div className="grid w-full min-w-0 grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
          <button type="button" className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold text-pu3nte-secondary transition hover:bg-white/[0.08] hover:text-pu3nte-text" onClick={() => jump(-5)}>
            -5s
          </button>
          <button type="button" className="rounded-full bg-pu3nte-cyan px-4 py-2 text-sm font-black text-pu3nte-bg transition hover:scale-105" onClick={togglePlayback}>
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
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <div className="mt-4 min-w-0 rounded-xl border border-white/10 bg-black/15 p-3">
        <div className="flex items-center gap-3">
          <span className="w-10 shrink-0 text-xs font-bold tabular-nums text-pu3nte-secondary">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.05}
            value={Math.min(currentTime, duration || currentTime)}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Reading audio position"
            className="min-w-0 flex-1 accent-pu3nte-cyan"
          />
          <span className="w-10 shrink-0 text-right text-xs font-bold tabular-nums text-pu3nte-secondary">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-3 min-w-0 rounded-xl border border-white/10 bg-black/15 p-3">
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
        <div className="mt-1 grid grid-cols-6 text-center text-[10px] font-bold text-pu3nte-secondary sm:text-[11px]">
          {playbackRates.map((rate) => <span key={rate}>{rate}x</span>)}
        </div>
      </div>

      {loadError ? (
        <p className="mt-4 rounded-lg border border-pu3nte-error/40 bg-pu3nte-error/10 p-3 text-sm text-pu3nte-secondary">
          Audio loaded, but the word timing file could not be loaded.
        </p>
      ) : (
        <div className="mt-4 max-h-56 min-w-0 overflow-y-auto overflow-x-hidden rounded-xl border border-white/10 bg-pu3nte-bg/70 p-3 leading-8 sm:p-4">
          {words.map((word, index) => (
            <span
              key={`${word.text}-${word.start}-${index}`}
              ref={index === activeWordIndex ? activeWordRef : undefined}
              className={`mx-0.5 inline-block max-w-full break-words rounded-md px-1 transition ${index === activeWordIndex ? "bg-pu3nte-gold text-pu3nte-bg shadow-lg shadow-pu3nte-gold/20" : "text-pu3nte-secondary"}`}
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
