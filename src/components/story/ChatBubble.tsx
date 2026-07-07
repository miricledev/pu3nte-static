import { useEffect, useMemo, useRef, useState } from "react";
import type { StoryCharacter, StoryMessage } from "../../types";
import { HighlightedPhrase } from "./HighlightedPhrase";

const characterStyles = {
  red: {
    avatar: "bg-pu3nte-red text-white",
    bubble: "border-pu3nte-red/25 bg-pu3nte-red/10",
    name: "text-red-100",
  },
  gold: {
    avatar: "bg-pu3nte-gold text-pu3nte-bg",
    bubble: "border-pu3nte-gold/25 bg-pu3nte-gold/10",
    name: "text-yellow-100",
  },
  blue: {
    avatar: "bg-pu3nte-blue text-white",
    bubble: "border-pu3nte-blue/25 bg-pu3nte-blue/15",
    name: "text-blue-100",
  },
  cyan: {
    avatar: "bg-pu3nte-cyan text-pu3nte-bg",
    bubble: "border-pu3nte-cyan/25 bg-pu3nte-cyan/10",
    name: "text-cyan-100",
  },
  green: {
    avatar: "bg-pu3nte-success text-pu3nte-bg",
    bubble: "border-pu3nte-success/25 bg-pu3nte-success/10",
    name: "text-green-100",
  },
  violet: {
    avatar: "bg-violet-500 text-white",
    bubble: "border-violet-400/25 bg-violet-500/10",
    name: "text-violet-100",
  },
};

export function ChatBubble({
  message,
  character,
  showTranslation,
  onSpeak,
  audioLabel = "Audio",
}: {
  message: StoryMessage;
  character?: StoryCharacter;
  showTranslation: boolean;
  onSpeak?: (text: string) => void;
  audioLabel?: string;
}) {
  const [showVoiceText, setShowVoiceText] = useState(false);
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState(false);
  const [voiceNoteRate, setVoiceNoteRate] = useState<0.5 | 1>(1);
  const [voiceNoteCurrentTime, setVoiceNoteCurrentTime] = useState(0);
  const [voiceNoteDuration, setVoiceNoteDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isNarrator = message.messageType === "narrator" || (!character && message.speakerId === "narrator");
  const isVoiceNote = message.messageType === "voice-note";
  const waveformBars = useMemo(
    () => Array.from({ length: 36 }, (_, index) => 8 + ((index * 13 + message.text.length * 7) % 24)),
    [message.text.length],
  );
  const voiceNoteProgress = voiceNoteDuration > 0 ? Math.min(1, voiceNoteCurrentTime / voiceNoteDuration) : 0;

  function getVoiceAudio() {
    if (!message.audioUrl) return;
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(message.audioUrl);
    audio.preload = "metadata";
    audio.playbackRate = voiceNoteRate;
    audio.addEventListener("loadedmetadata", () => setVoiceNoteDuration(audio.duration || 0));
    audio.addEventListener("timeupdate", () => setVoiceNoteCurrentTime(audio.currentTime || 0));
    audio.addEventListener("ended", () => {
      setIsPlayingVoiceNote(false);
      setVoiceNoteCurrentTime(0);
      audio.currentTime = 0;
    });
    audio.addEventListener("error", () => setIsPlayingVoiceNote(false));
    audioRef.current = audio;
    return audio;
  }

  function playVoiceNote() {
    const audio = getVoiceAudio();
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlayingVoiceNote(false);
      return;
    }

    audio.playbackRate = voiceNoteRate;
    setIsPlayingVoiceNote(true);
    void audio.play().catch(() => setIsPlayingVoiceNote(false));
  }

  function toggleVoiceNoteRate() {
    const nextRate = voiceNoteRate === 1 ? 0.5 : 1;
    setVoiceNoteRate(nextRate);
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
  }

  useEffect(() => {
    return () => audioRef.current?.pause();
  }, []);

  if (isNarrator) {
    return (
      <div className="flex justify-center px-2">
        <div className="max-w-[92%] rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm text-pu3nte-secondary shadow-inner">
          <p className="mb-1 text-[11px] font-black uppercase tracking-[0.18em] text-pu3nte-cyan">Narrator</p>
          <p className="leading-relaxed">
            <HighlightedPhrase text={message.text} highlights={[...(message.vocabHighlights ?? []), ...(message.grammarHighlights ?? [])]} />
          </p>
          {showTranslation && message.translation && <p className="mt-2 text-xs text-pu3nte-secondary">{message.translation}</p>}
        </div>
      </div>
    );
  }

  const mine = character?.side === "right";
  const styles = characterStyles[character?.color ?? (mine ? "blue" : "cyan")];
  return (
    <div className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${styles.avatar}`}>{character?.initials}</span>}
      <div className={`max-w-[84%] rounded-2xl border px-3 py-3 sm:max-w-[78%] sm:px-4 ${styles.bubble} ${mine ? "rounded-br-sm" : "rounded-bl-sm"}`}>
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className={`text-xs font-extrabold ${styles.name}`}>{character?.name}</p>
          {onSpeak && !isVoiceNote && (
            <button type="button" className="rounded-full border border-white/10 px-2 py-1 text-[11px] font-bold text-pu3nte-secondary hover:text-pu3nte-text" onClick={() => onSpeak(message.text)}>
              {audioLabel}
            </button>
          )}
        </div>
        {isVoiceNote ? (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3 shadow-inner">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-pu3nte-cyan text-sm font-black text-pu3nte-bg shadow-lg shadow-pu3nte-cyan/20 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={playVoiceNote}
                disabled={!message.audioUrl}
                aria-label={message.audioUrl ? "Play voice note" : "Voice note audio not available yet"}
              >
                {isPlayingVoiceNote ? "Ⅱ" : "▶"}
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex h-12 min-w-0 items-center gap-[3px] overflow-hidden rounded-full border border-white/10 bg-white/[0.06] px-3">
                  {waveformBars.map((height, index) => {
                    const isPlayed = index / waveformBars.length <= voiceNoteProgress;
                    const pulseHeight = isPlayingVoiceNote ? height + ((index % 3) - 1) * 4 : height;
                    return (
                      <span
                        key={`${message.id}-wave-${index}`}
                        className={`w-[3px] shrink-0 rounded-full transition-all duration-200 ${isPlayed ? "bg-pu3nte-cyan" : "bg-white/30"}`}
                        style={{ height: `${Math.max(6, pulseHeight)}px` }}
                      />
                    );
                  })}
                </div>
                <div className="mt-1 flex items-center justify-between gap-2 text-[10px] font-bold text-pu3nte-secondary">
                  <span>{voiceNoteRate === 0.5 ? "Half speed" : "Normal speed"}</span>
                  {voiceNoteDuration > 0 && <span>{Math.max(0, Math.ceil(voiceNoteDuration - voiceNoteCurrentTime))}s</span>}
                </div>
              </div>
              <button
                type="button"
                className={`rounded-full border px-2 py-1 text-[11px] font-black transition ${
                  voiceNoteRate === 0.5
                    ? "border-pu3nte-gold/60 bg-pu3nte-gold/20 text-pu3nte-gold"
                    : "border-white/10 text-pu3nte-secondary hover:bg-white/[0.08] hover:text-pu3nte-text"
                }`}
                onClick={toggleVoiceNoteRate}
                aria-label={voiceNoteRate === 0.5 ? "Play voice note at normal speed" : "Play voice note at half speed"}
              >
                0.5x
              </button>
              <button
                type="button"
                className="rounded-full border border-white/10 px-2 py-1 text-[11px] font-black text-pu3nte-secondary transition hover:bg-white/[0.08] hover:text-pu3nte-text"
                onClick={() => setShowVoiceText((value) => !value)}
                aria-label={showVoiceText ? "Hide voice note text" : "Show voice note text"}
              >
                Aa
              </button>
            </div>
            {!message.audioUrl && <p className="mt-2 text-xs text-pu3nte-warning">Voice-note audio can be added as an ElevenLabs MP3. Use Aa to read the transcript for now.</p>}
            {showVoiceText && (
              <p className="mt-3 leading-relaxed">
                <HighlightedPhrase text={message.text} highlights={[...(message.vocabHighlights ?? []), ...(message.grammarHighlights ?? [])]} />
              </p>
            )}
          </div>
        ) : (
          <p className="leading-relaxed"><HighlightedPhrase text={message.text} highlights={[...(message.vocabHighlights ?? []), ...(message.grammarHighlights ?? [])]} /></p>
        )}
        {showTranslation && message.translation && <p className="mt-2 text-xs text-pu3nte-secondary">{message.translation}</p>}
        {message.challenge && <p className="mt-2 rounded-md border border-pu3nte-gold/30 bg-pu3nte-gold/10 p-2 text-xs">{message.challenge}</p>}
      </div>
      {mine && <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${styles.avatar}`}>{character?.initials}</span>}
    </div>
  );
}
