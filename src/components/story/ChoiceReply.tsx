import type { StoryChoice } from "../../types";

export function ChoiceReply({ choices, onChoose }: { choices: StoryChoice[]; onChoose: (choice: StoryChoice) => void }) {
  return (
    <div className="grid gap-2">
      {choices.map((choice) => (
        <button key={choice.id} type="button" className="rounded-full border border-pu3nte-cyan/30 bg-pu3nte-cyan/10 px-4 py-2 text-sm font-bold" onClick={() => onChoose(choice)}>
          {choice.text}
        </button>
      ))}
    </div>
  );
}
