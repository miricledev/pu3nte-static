import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verbTrainerSets } from "../data";
import { ActivityHeader } from "../components/practice/ActivityHeader";
import { PageContainer } from "../components/layout/PageContainer";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientButton } from "../components/ui/GradientButton";
import { InstructionPanel } from "../components/ui/InstructionPanel";
import { VerbPromptCard } from "../components/verb-trainer/VerbPromptCard";
import { ConjugationInput } from "../components/verb-trainer/ConjugationInput";
import { TenseSelector } from "../components/verb-trainer/TenseSelector";
import { PronounSelector } from "../components/verb-trainer/PronounSelector";
import { VerbFeedback } from "../components/verb-trainer/VerbFeedback";
import { DrillResults } from "../components/verb-trainer/DrillResults";
import { WeakVerbsPanel } from "../components/verb-trainer/WeakVerbsPanel";
import { compareAnswers, getSpecialCharactersForLanguage } from "../utils/answer";
import { getProgress, markCompleted, markOpened, saveProgress } from "../utils/progress";
import { getUiLanguage, uiText } from "../utils/uiText";
import { NotFoundPage } from "./NotFoundPage";
import type { EnglishVerb, SpanishPerson, SpanishTense, SpanishVerb } from "../types";

function getVerbName(verb: SpanishVerb | EnglishVerb) {
  return verb.language === "spanish" ? verb.infinitive : verb.base;
}

export function VerbTrainerPage() {
  const { setId } = useParams();
  const navigate = useNavigate();
  const set = verbTrainerSets.find((item) => item.id === setId);
  const [verbIndex, setVerbIndex] = useState(0);
  const [tense, setTense] = useState("present");
  const [person, setPerson] = useState("yo");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [wasCorrect, setWasCorrect] = useState<boolean | undefined>();
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  useEffect(() => {
    if (set) markOpened(set.id, set.activityType, set.title);
  }, [set]);

  useEffect(() => {
    if (!set) return;
    setVerbIndex(0);
    setTense(set.data.tenses[0] ?? "present");
    setPerson(set.data.persons[0] ?? "yo");
    setAnswer("");
    setFeedback("");
    setWasCorrect(undefined);
  }, [set?.id]);

  const available = useMemo(() => set?.data.verbs ?? [], [set]);
  if (!set || available.length === 0) return <NotFoundPage />;

  const copy = uiText(getUiLanguage(set.languageTarget, set.learnerNativeLanguage));
  const verb = available[verbIndex % available.length];
  const specialCharacters = getSpecialCharactersForLanguage(verb.language);
  const hasChecked = Boolean(feedback);
  const expected =
    verb.language === "spanish"
      ? verb.conjugations[tense as SpanishTense]?.[person as SpanishPerson]
      : verb.tensePatterns[tense]?.[person as keyof EnglishVerb["tensePatterns"][string]];

  function submit() {
    const activeSet = set!;
    if (hasChecked || !answer.trim()) return;
    if (!expected) {
      setFeedback("This demo verb does not have that tense/person yet. Add it to the data object later.");
      setWasCorrect(false);
      return;
    }
    const result = compareAnswers(answer, expected, { accentSensitive: "forgiving", punctuationSensitive: "ignore" });
    const correct = result.isCorrect || result.isAlmostCorrect;
    setFeedback(correct ? `${copy.correct} ${expected}` : `${copy.answer}: ${expected}`);
    setWasCorrect(correct);
    setStats((value) => ({ correct: value.correct + (correct ? 1 : 0), incorrect: value.incorrect + (correct ? 0 : 1) }));
    const progress = getProgress();
    const previous = progress.verbTrainer[activeSet.id] ?? { correct: 0, incorrect: 0, weakVerbs: {}, weakTenses: {}, updatedAt: new Date().toISOString() };
    saveProgress({
      ...progress,
      verbTrainer: {
        ...progress.verbTrainer,
        [activeSet.id]: {
          correct: previous.correct + (correct ? 1 : 0),
          incorrect: previous.incorrect + (correct ? 0 : 1),
          weakVerbs: correct ? previous.weakVerbs : { ...previous.weakVerbs, [getVerbName(verb)]: (previous.weakVerbs[getVerbName(verb)] ?? 0) + 1 },
          weakTenses: correct ? previous.weakTenses : { ...previous.weakTenses, [tense]: (previous.weakTenses[tense] ?? 0) + 1 },
          updatedAt: new Date().toISOString(),
        },
      },
    });
  }

  const saved = getProgress().verbTrainer[set.id];
  const accuracy = stats.correct + stats.incorrect ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) : 0;

  return (
    <PageContainer>
      <ActivityHeader {...set} />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <GlassCard className="space-y-5">
          <InstructionPanel title={copy.instructions} body={copy.verbGuide} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TenseSelector tenses={set.data.tenses} value={tense} onChange={setTense} label={copy.tense} />
            <PronounSelector persons={set.data.persons} value={person} onChange={setPerson} label={copy.person} />
          </div>
          <VerbPromptCard prompt={`${person} / ${getVerbName(verb)} / ${tense}`} meta={`${verb.language} · ${verb.regularity}`} />
          <ConjugationInput
            value={answer}
            onChange={setAnswer}
            onSubmit={submit}
            characters={specialCharacters}
            label={copy.conjugation}
            placeholder={copy.typeConjugation}
          />
          <div className="flex flex-wrap gap-3">
            {!hasChecked ? (
              <GradientButton disabled={!answer.trim()} onClick={submit}>{copy.check}</GradientButton>
            ) : (
              <GradientButton onClick={() => { setVerbIndex((value) => value + 1); setAnswer(""); setFeedback(""); setWasCorrect(undefined); }}>{copy.nextPrompt}</GradientButton>
            )}
            <GradientButton variant="ghost" onClick={() => { markCompleted(set.id, accuracy); navigate(`/complete/${set.id}?score=${accuracy}`); }}>{copy.finishDrill}</GradientButton>
          </div>
          <VerbFeedback message={feedback} correct={wasCorrect} />
          <DrillResults correct={stats.correct} incorrect={stats.incorrect} labels={copy} />
        </GlassCard>
        <WeakVerbsPanel verbs={saved?.weakVerbs ?? {}} tenses={saved?.weakTenses ?? {}} labels={copy} />
      </div>
    </PageContainer>
  );
}
