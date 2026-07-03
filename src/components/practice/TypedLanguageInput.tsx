import { useRef } from "react";
import { SpecialCharacterKeyboard } from "../flashcards/SpecialCharacterKeyboard";

export function TypedLanguageInput({
  id,
  label,
  value,
  onChange,
  onSubmit,
  characters,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  characters: string[];
  placeholder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-pu3nte-secondary" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-pu3nte-text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSubmit?.()}
      />
      <SpecialCharacterKeyboard characters={characters} inputRef={inputRef} onChange={onChange} />
    </div>
  );
}
