import { TypedLanguageInput } from "../practice/TypedLanguageInput";

export function ConjugationInput({
  value,
  onChange,
  onSubmit,
  characters,
  label = "Conjugation",
  placeholder = "Type the conjugation...",
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  characters: string[];
  label?: string;
  placeholder?: string;
}) {
  return (
    <TypedLanguageInput
      id="verb-conjugation-answer"
      label={label}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      characters={characters}
      placeholder={placeholder}
    />
  );
}
