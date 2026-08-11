import type { LessonScript, LessonSegment } from "./validateScript";

type TtsContext = {
  previousText?: string;
  nextText?: string;
};

const contextualExamples: Array<{ pattern: RegExp; sentence: string }> = [
  { pattern: /^dale[.!?]?$/i, sentence: "Dale, nos vemos ahorita." },
  { pattern: /^parcero[.!?]?$/i, sentence: "Parcero, ¿todo bien?" },
  { pattern: /^jevi[.!?]?$/i, sentence: "Ese plan está jevi." },
  { pattern: /^bacán[.!?]?$/i, sentence: "Todo bacán, causa." },
  { pattern: /^causa[.!?]?$/i, sentence: "Habla, causa, ¿todo bien?" },
  { pattern: /^pata[.!?]?$/i, sentence: "Mi pata llega al toque." },
  { pattern: /^chévere[.!?]?$/i, sentence: "Está chévere el plan." },
  { pattern: /^chimba[.!?]?$/i, sentence: "Qué chimba de idea." },
  { pattern: /^vaina[.!?]?$/i, sentence: "Esa vaina está rara." },
  { pattern: /^tíguere[.!?]?$/i, sentence: "Ese tíguere sabe bregar." },
  { pattern: /^pucha[.!?]?$/i, sentence: "Pucha, se me hizo tarde." },
  { pattern: /^ahorita[.!?]?$/i, sentence: "Ahorita te llamo." },
  { pattern: /^órale[.!?]?$/i, sentence: "Órale, nos vemos allá." },
  { pattern: /^wey[.!?]?$/i, sentence: "Oye, wey, ven acá." },
  { pattern: /^che[.!?]?$/i, sentence: "Che, ¿cómo estás?" },
  { pattern: /^boludo[.!?]?$/i, sentence: "Che, boludo, escuchame." },
];

function cleanForCounting(text: string): string {
  return text
    .replace(/[“”"()[\]{}]/g, " ")
    .replace(/[¿¡,;:…]/g, " ")
    .trim();
}

function countWords(text: string): number {
  return cleanForCounting(text).split(/\s+/).filter(Boolean).length;
}

function isTargetLanguageClip(segment: LessonSegment): boolean {
  return (
    segment.type === "answer" ||
    segment.type === "repeat" ||
    segment.type === "shadow" ||
    segment.type === "dialogue" ||
    segment.role === "spanish_male" ||
    segment.role === "spanish_female" ||
    segment.role === "english_male" ||
    segment.role === "english_female" ||
    segment.role === "native_male" ||
    segment.role === "native_female" ||
    segment.role === "speaker_1" ||
    segment.role === "speaker_2"
  );
}

function isShortPronunciationRisk(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;
  return countWords(trimmed) <= 3 && trimmed.length <= 36;
}

function getLanguageContext(script: LessonScript): string {
  const course = script.course.trim();
  const targetLanguage = script.targetLanguage.trim();

  if (/spanish/i.test(targetLanguage)) {
    return `Pronunciación natural de ${course || "español"} en una conversación real:`;
  }

  if (/english/i.test(targetLanguage)) {
    return `Natural ${course || "English"} pronunciation in a real conversation:`;
  }

  return `Natural ${targetLanguage || course} pronunciation in a real conversation:`;
}

function getContextualExample(text: string): string | undefined {
  const normalized = cleanForCounting(text).toLocaleLowerCase("es");
  return contextualExamples.find((item) => item.pattern.test(normalized))?.sentence;
}

function getFallbackExample(script: LessonScript, text: string): string {
  if (/english/i.test(script.targetLanguage)) {
    return `Natural example: ${text.trim()} in a conversational sentence.`;
  }

  return `Ejemplo natural: ${text.trim()} en una frase conversacional.`;
}

export function getPronunciationContext(script: LessonScript, segment: LessonSegment): TtsContext {
  if (!isTargetLanguageClip(segment) || !isShortPronunciationRisk(segment.text)) {
    return {};
  }

  const example = getContextualExample(segment.text);
  const previousText = getLanguageContext(script);
  const nextText = example ?? getFallbackExample(script, segment.text);

  return { previousText, nextText };
}
