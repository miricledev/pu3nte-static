import { useEffect, useRef, useState } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isNarrator = message.messageType === "narrator" || (!character && message.speakerId === "narrator");
  const isVoiceNote = message.messageType === "voice-note";

  function playVoiceNote() {
    if (!message.audioUrl) return;
    audioRef.current?.pause();
    const audio = new Audio(message.audioUrl);
    audioRef.current = audio;
    setIsPlayingVoiceNote(true);
    audio.addEventListener("ended", () => setIsPlayingVoiceNote(false), { once: true });
    audio.addEventListener("error", () => setIsPlayingVoiceNote(false), { once: true });
    void audio.play().catch(() => setIsPlayingVoiceNote(false));
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
          <div className="rounded-xl border border-white/10 bg-black/15 p-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pu3nte-cyan text-sm font-black text-pu3nte-bg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={playVoiceNote}
                disabled={!message.audioUrl}
                aria-label={message.audioUrl ? "Play voice note" : "Voice note audio not available yet"}
              >
                {isPlayingVoiceNote ? "Ⅱ" : "▶"}
              </button>
              <div className="h-8 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.05]">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-pu3nte-cyan/70 via-pu3nte-gold/70 to-pu3nte-red/70 opacity-70" />
              </div>
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
