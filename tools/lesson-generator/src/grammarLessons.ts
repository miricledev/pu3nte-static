import { z } from "zod";
import { lessonScriptSchema } from "./validateScript";

export const grammarCourses = [
  { id: "english-spanish", label: "English → Spanish", native: "english", target: "spanish", narrator: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID", male: "ELEVENLABS_SPANISH_MALE_VOICE_ID", female: "ELEVENLABS_SPANISH_FEMALE_VOICE_ID" },
  { id: "darija-andalusian", label: "Moroccan Darija → Andalusian Spanish", native: "darija", target: "spanish", narrator: "ELEVENLABS_DARIJA_NARRATOR_VOICE_ID", male: "ELEVENLABS_ANDALUSIAN_SPANISH_MALE_VOICE_ID", female: "ELEVENLABS_ANDALUSIAN_SPANISH_FEMALE_VOICE_ID" },
  { id: "english-darija", label: "British English → Moroccan Darija", native: "english", target: "darija", narrator: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID", male: "ELEVENLABS_DARIJA_MALE_VOICE_ID", female: "ELEVENLABS_DARIJA_FEMALE_VOICE_ID" },
] as const;

const spanishTopics = {
  A1: ["Personal pronouns and ser: introducing yourself", "Noun gender and articles: naming everyday things", "Plural nouns and adjective agreement", "Present regular AR verbs: daily actions", "Present ER and IR verbs: eating and living", "Ser, estar and hay: identity, state and existence", "Questions and simple negatives", "Tener and ir: needs and destinations"],
  A2: ["Present stem changes: querer, poder and pedir", "Reflexive daily routines", "Gustar: who likes what", "Ir a with infinitives: near-future plans", "Regular preterite: completed events", "Common irregular preterites: fui, tuve and hice", "Imperfect: habits and background", "Direct object pronouns in everyday requests"],
  B1: ["Preterite versus imperfect: telling a story", "Present perfect versus preterite: time frames", "Indirect objects and two-pronoun combinations", "Por versus para: purpose and cause", "Affirmative and negative commands", "Present subjunctive: wishes and requests", "Future and conditional: plans and polite proposals", "Relative clauses with que and donde"],
  B2: ["Indicative versus subjunctive: certainty and evaluation", "Imperfect subjunctive: hypothetical situations", "Si clauses: real and hypothetical conditions", "Reported speech and tense changes", "Impersonal and passive se", "Subjunctive after time expressions", "Past perfect: what had already happened", "Pronoun position with infinitives, gerunds and commands"],
  C1: ["Past counterfactuals: si hubiera and habría", "Perfect subjunctive: evaluating completed events", "Relative clauses: known versus sought referents", "Concessions with aunque: fact versus hypothesis", "Future and conditional for conjecture", "Ser and estar with changes of meaning", "Aspectual verb phrases: dejar de, seguir and llevar", "Focus and emphasis through word order"],
  C2: ["Mixed conditionals and their time relationships", "Subjunctive for distance, stance and reported claims", "Conditional perfect: inference versus reported uncertainty", "Negation scope and ambiguous interpretations", "Tense shifts for politeness and interpersonal distance", "Information structure: contrastive and neutral focus", "Reformulating complex clauses without changing meaning", "Register-sensitive grammar in nuanced conversation"],
};

const darijaTopics = {
  A1: ["Independent pronouns and present identity sentences", "Questions with shkun, shnu, fin and wash", "Noun gender and basic adjective agreement", "Definite nouns and the article", "Possession with dyal", "Present-tense person patterns: familiar actions", "Present habits with ka: what you do daily", "Basic negation with ma and sh"],
  A2: ["Past-tense person endings: regular everyday verbs", "Future plans with ghadi", "Having and needing: forms with 3nd", "Object suffixes with common verbs", "Commands for everyday situations", "Plural nouns: common patterns and exceptions", "Comparisons with ktr and mn", "Location and preposition suffixes"],
  B1: ["Past, present and future in a short story", "Kan plus present forms: past habits", "Negation of verbs versus identity and adjectives", "Questions with pronoun suffixes", "Bgha plus a verb: wants and intentions", "Relative clauses with lli", "Real conditions with ila", "Reasons and purpose: hit and bash"],
  B2: ["Habit, ongoing action and time context", "Unreal situations with kun", "Reported speech with gal and belli", "Combined object and preposition references", "Aspect with baqi, mazal and 3ad", "Impersonal meanings and generic subjects", "Verb patterns for doing and causing", "Narrative background versus main events"],
  C1: ["Counterfactual past situations in conversation", "Focus through pronouns and word order", "Negation scope: what exactly is denied", "Hedging and modal constructions", "Relative clauses with resumptive pronouns", "Time reference in reported speech", "Aspectual nuances with context and particles", "Complex purpose and consequence clauses"],
  C2: ["Layered conditions and implied alternatives", "Discourse particles and speaker stance", "Ellipsis: what context permits you to omit", "Contrastive focus and implied correction", "Reported claims and distance from a statement", "Modal scope and nuanced uncertainty", "Reformulation without changing implications", "Grammar and register shifts in sensitive conversations"],
};

export function getGrammarTopics(target: string) {
  return Object.entries(target === "darija" ? darijaTopics : spanishTopics).flatMap(([level, titles]) =>
    titles.map((title, index) => ({ id: `${target}-${level.toLowerCase()}-${index + 1}`, level, title })),
  );
}

export function getGrammarPrompt(courseId: string): string {
  const course = grammarCourses.find((candidate) => candidate.id === courseId);
  if (!course) throw new Error(`Unknown grammar course: ${courseId}`);
  const languageRules = course.native === "darija"
    ? `The learner is Moroccan. All learner-facing titles, instructions, explanations, table headings, meanings, feedback and timerLabel must be Moroccan Darija in ARABIC SCRIPT. No English or Latinised Darija on screen. The admin-selected English topic is only your briefing; translate its lesson title naturally for the learner. Narrator text is spoken Moroccan Darija, never MSA. Spanish forms retain correct Spanish spelling. Explain from familiar Darija usage without inventing one-to-one equivalences. Native examples use Andalusian Spanish voices with intelligible natural speech; do not misspell Spanish to imitate dropped sounds. Use Arabic instructions such as نوبتك، جرّب تجاوب، سمع مزيان، عاودها. Set course to الدارجة المغربية إلى الإسبانية الأندلسية.`
    : course.target === "darija"
    ? `Teach spoken Moroccan Darija from British English. Every Arabic target phrase on any board must have a phrase.latin transliteration and phrase.meaning English gloss, including table cells, pattern parts, example choices and timeline events. Use consistent beginner-readable Moroccan transliteration; explain 3 and 7 visually when first needed. The text sent to native voices must be Arabic script only, with no transliteration or English. Narrator text must be English only. Do not substitute Modern Standard Arabic grammar or impose Spanish-style tense tables. Darija has regional variation: choose a consistent widespread variety, distinguish variation from errors, and verify advanced constructions. Do not invent a construction just to fill a level.`
    : `Teach Spanish from English. Narration and instructions use clear English. Native voices model complete Spanish words in meaningful sentences. Show standard spelling and explain regional pronoun or tense differences only when relevant. Use a consistent pronoun set, explicitly labelling vosotros or ustedes where needed.`;

  return `You are creating a PU3NTE ten-minute grammar video JSON script. Return ONLY a valid JSON object, without Markdown fences, comments, placeholders or ellipses. Treat the selected topic as the scope of ONE lesson, not an entire grammar syllabus.

COURSE AND VOICES
Course: ${course.label}. learnerNativeLanguage: "${course.native}". targetLanguage: "${course.target}".
lessonFormat MUST be "grammar". estimatedMinutes and durationGoalMinutes MUST both be 10.
Use only these roles and mappings:
${JSON.stringify({ narrator: `env:${course.narrator}`, native_male: `env:${course.male}`, native_female: `env:${course.female}` }, null, 2)}
Do not override voiceId on individual segments. Use ElevenLabs for narration and target-language speech. Never silently fall back to another language or accent.
${languageRules}

TEN-MINUTE TEACHING PLAN
0:00–0:40: an interesting everyday mini-situation and a concrete outcome: what the learner will be able to say.
0:40–2:10: let them notice a meaningful contrast; explain one core pattern in plain language.
2:10–4:00: build two worked examples incrementally; highlight the relevant row or part while discussing it.
4:00–6:30: guided retrieval, choosing a form, completing a sentence and predicting what comes next.
6:30–8:10: one or two useful exceptions or common mistakes, then apply them to a new situation.
8:10–9:40: independent transfer and a short final challenge with model answers and helpful feedback.
9:40–10:00: concise recap and a real-world next use.
Aim for 9–11 minutes including all speech and response silences. Estimate at 145 spoken words per minute and add pauseAfterMs and responsePauseMs once per segment (responsePauseMs takes precedence). Aim around 1,100–1,250 spoken words with 80–120 seconds of response time; calculate the total, do not assume segment count guarantees duration. Vary rhythm with dialogue, prediction, spotting a mistake and short explanations. No long silent padding or repetitive filler. Keep individual speech segments under about 35 words, especially for target models.

VOICE-SAFE GRAMMAR
text is the ONLY field sent to TTS. grammarBoard is display-only. Never put literal endings such as -as, -amos, ka-, ma-...-sh, isolated consonants, formulas, arrows, plus signs, slash alternatives, Markdown, SSML or pronunciation tags in text.
Instead say a full explanation such as "For this form, add the letters a and s to the stem. Listen to the complete sentence." Put the written ending in grammarBoard, then give a separate native segment saying "Tú hablas español." For a Darija narrator explain the letters in natural Arabic-script Darija. If the sound of an ending is needed, model a complete inflected word in a short sentence; do not ask the voice to pronounce a naked suffix. Never make an English narrator read Spanish or Darija examples, even if the voice is bilingual. Never make a Darija narrator read Spanish examples. Keep each audio segment monolingual. Tables are not read out as dense lists.

VISUAL DESIGN: EVERY SEGMENT HAS A grammarBoard
Use several suitable visual layouts across the lesson. Do not force a conjugation table onto a topic about word order or meaning.
- table: 2–3 columns, up to 6 rows of plain cells, or at most 4 rows if any cell has latin or meaning support lines. Conjugations, noun agreement or compact paradigms. Each cell is {text, latin?, meaning?}; labels may be plain text objects. Cell limits: text 45 characters, latin 50, meaning 60. Rows must match the column count. highlightRow is a zero-based index. Split large tables into successive boards. Repeat the same table in successive segments while moving highlightRow to follow narration. Do not highlight a form before it is introduced.
- pattern: 2–5 parts, an optional result, and optional highlightPart. Build word order or stem/ending combinations. Each part: text at most 35 characters, latin 40, meaning 55. In Arabic, preserve reading order without reversing Spanish sequences.
- contrast: exactly two cards, each with label and phrase. Different meanings, affirmative versus negative, or a clearly labelled common mistake and correction. A wrong form is never presented as a good model to repeat.
- timeline: 2–3 events in chronological order, each with label and phrase; optional highlightEvent. Use only when time/aspect is relevant, with clear reference points.
- example: a short phrase, optional 2–3 choices. Mini-dialogues, worked examples, timed practice and recaps.
Each board has kind, title and optional note. A phrase is {text, latin?, meaning?}. Keep board titles under 90 characters, lesson titles under 110, notes under 180. Avoid walls of text. Put any longer explanation in narration and split segments. Captions (subtitle or text fallback) must be at most 280 characters. Formula symbols and endings belong only in board text. Use subtitle for what is actually spoken, never for an answer that has not been revealed.

TIMED YOU-TRY PRACTICE
At least SIX varied questions of type prompt or final_challenge. Every one has an example board with only the question, blank or unmarked choices, showTimer: true, responsePauseMs: 6000–20000 and a native-language timerLabel. Allow 8–12 seconds normally, up to 20 for complex construction. The prompt asks for something already taught. Do not show the correct answer in any displayed field, meaning, note, caption or visualTitle. Prefer omitting targetAnswer on prompts. The next segment MUST be type answer using a native voice, presenting the solution only after the timer. Follow with a separate narrator explanation of why it works where helpful. Subsequent examples should test transfer, not echo the last answer. Include a fresh final challenge and its answer before the outro. These are prerecorded practice pauses; never claim to hear or score the learner.

FACTUAL AND PEDAGOGICAL CHECK
Research the selected grammar using reliable grammars or primary educational references before writing. Check person, gender, number, tense, irregulars and exceptions. For Darija use Moroccan usage and acknowledge variable forms. Explain ONE manageable rule with prerequisites appropriate to the selected level. Use adults in relatable situations without relying on stereotypes. Meaning comes before terminology. Keep a small cast, light humour and a practical payoff. Do not introduce untaught vocabulary as the source of a grammar error.

OUTPUT CONTRACT
Use settings: {"defaultPauseAfterMs":500,"defaultResponsePauseMs":8000,"subtitleMode":"line","videoWidth":1920,"videoHeight":1080,"fps":30,"backgroundMusic":false,"includePauseSubtitles":false}.
Use unique safe ids and an English lowercase hyphenated outputSlug including grammar, course, level and topic. All screen content remains in the learner's required language. branding: {"logoText":"PU3NTE","theme":"default","showLogo":true}.
Use ONLY keys and types in the schema below. Never add durationSeconds, translations, narration, slides or other unsupported fields. Use visualMode: listen for explanations, your_turn for prompts, answer for answers; other values are in the schema. Do not add a separate response_pause segment: the timer is attached to its spoken prompt. Grammar boards persist for the entire segment including its pause. To synchronise changing highlights, create successive narrated segments with the corresponding board state. Optional fields may be omitted; never put null in them.
Before output, self-check JSON validity, all board bounds, Arabic-script rules, six prompt/answer pairs, speech-safe text and duration arithmetic. No contradictory 15-minute or 30-minute speaking-drill instructions apply to this grammar format.

SCHEMA (cross-field rules above also apply)
${JSON.stringify(z.toJSONSchema(lessonScriptSchema), null, 2)}
`;
}
