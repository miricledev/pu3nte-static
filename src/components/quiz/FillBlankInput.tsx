import { TypedLanguageInput } from "../practice/TypedLanguageInput";

export function FillBlankInput({
  value,
  onChange,
  onSubmit,
  characters,
  label = "Answer",
  placeholder = "Type your answer...",
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
      id="quiz-typed-answer"
      label={label}
      value={value}
      onChange={onChange}
      onSubmit={onSubmit}
      characters={characters}
      placeholder={placeholder}
    />
  );
}
