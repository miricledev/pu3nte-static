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
  const mine = character?.side === "right";
  const styles = characterStyles[character?.color ?? (mine ? "blue" : "cyan")];
  return (
    <div className={`flex items-end gap-2 ${mine ? "justify-end" : "justify-start"}`}>
      {!mine && <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${styles.avatar}`}>{character?.initials}</span>}
      <div className={`max-w-[84%] rounded-2xl border px-3 py-3 sm:max-w-[78%] sm:px-4 ${styles.bubble} ${mine ? "rounded-br-sm" : "rounded-bl-sm"}`}>
        <div className="mb-1 flex items-center justify-between gap-3">
          <p className={`text-xs font-extrabold ${styles.name}`}>{character?.name}</p>
          {onSpeak && (
            <button type="button" className="rounded-full border border-white/10 px-2 py-1 text-[11px] font-bold text-pu3nte-secondary hover:text-pu3nte-text" onClick={() => onSpeak(message.text)}>
              {audioLabel}
            </button>
          )}
        </div>
        <p className="leading-relaxed"><HighlightedPhrase text={message.text} highlights={[...(message.vocabHighlights ?? []), ...(message.grammarHighlights ?? [])]} /></p>
        {showTranslation && message.translation && <p className="mt-2 text-xs text-pu3nte-secondary">{message.translation}</p>}
        {message.challenge && <p className="mt-2 rounded-md border border-pu3nte-gold/30 bg-pu3nte-gold/10 p-2 text-xs">{message.challenge}</p>}
      </div>
      {mine && <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-extrabold ${styles.avatar}`}>{character?.initials}</span>}
    </div>
  );
}
