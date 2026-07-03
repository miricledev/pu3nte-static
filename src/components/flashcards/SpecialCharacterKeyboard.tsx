import type { RefObject } from "react";
import { insertAtCursor } from "../../utils/answer";

export function SpecialCharacterKeyboard({
  characters,
  inputRef,
  onChange,
}: {
  characters: string[];
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
}) {
  if (characters.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2" aria-label="Special characters">
      {characters.map((character) => (
        <button
          key={character}
          type="button"
          className="min-h-10 min-w-10 rounded-md border border-white/10 bg-white/[0.05] text-sm font-bold text-pu3nte-text"
          onClick={() => onChange(insertAtCursor(inputRef.current, character))}
        >
          {character}
        </button>
      ))}
    </div>
  );
}
