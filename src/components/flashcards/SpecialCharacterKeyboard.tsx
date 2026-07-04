import type { RefObject } from "react";
import { insertAtCursor } from "../../utils/answer";

export function SpecialCharacterKeyboard({
  characters,
  inputRef,
  onChange,
  label,
}: {
  characters: string[];
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  label?: string;
}) {
  if (characters.length === 0) return null;
  return (
    <div className="space-y-2" aria-label={label ?? "Special characters"}>
      {label && <p className="text-xs font-semibold text-pu3nte-muted">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {characters.map((character) => (
          <button
            key={character}
            type="button"
            className="min-h-11 min-w-11 rounded-md border border-white/10 bg-white/[0.05] px-3 text-base font-bold text-pu3nte-text transition hover:border-pu3nte-cyan/40 hover:bg-white/[0.08]"
            onClick={() => onChange(insertAtCursor(inputRef.current, character))}
          >
            {character}
          </button>
        ))}
      </div>
    </div>
  );
}
