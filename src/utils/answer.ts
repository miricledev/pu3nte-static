import type { LanguageTarget } from "../types";

export type SensitivityMode = "strict" | "forgiving" | "ignore";

export interface CompareAnswerOptions {
  caseSensitive?: boolean;
  accentSensitive?: SensitivityMode;
  punctuationSensitive?: SensitivityMode;
  whitespaceSensitive?: boolean;
  acceptedAnswers?: string[];
  allowMinorTypos?: boolean;
  languageTarget?: LanguageTarget;
  allowSpanishSubjectPronounFlex?: boolean;
}

export interface AnswerComparison {
  isCorrect: boolean;
  isAlmostCorrect: boolean;
  missingAccents: string[];
  punctuationIssues: string[];
  normalizedUserAnswer: string;
  normalizedCorrectAnswer: string;
  feedbackMessage: string;
}

const punctuationRegex = /[.,!?;:'"\u2019\u2018`()¿¡-]/g;
const terminalPunctuationRegex = /[.!?]+$/g;

export function removeAccents(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export function normalizePunctuation(value: string) {
  return value.replace(punctuationRegex, "");
}

function removeTerminalPunctuation(value: string) {
  return value.trim().replace(terminalPunctuationRegex, "").trim();
}

export function normalizeAnswer(value: string, options: CompareAnswerOptions = {}) {
  const {
    caseSensitive = false,
    accentSensitive = "strict",
    punctuationSensitive = "strict",
    whitespaceSensitive = false,
  } = options;

  let normalized = whitespaceSensitive ? value : value.trim().replace(/\s+/g, " ");
  if (!caseSensitive) normalized = normalized.toLocaleLowerCase();
  if (accentSensitive === "ignore" || accentSensitive === "forgiving") normalized = removeAccents(normalized);
  if (punctuationSensitive === "ignore" || punctuationSensitive === "forgiving") {
    normalized = normalizePunctuation(normalized).replace(/\s+/g, " ").trim();
  }
  return normalized;
}

function findAccentIssues(userAnswer: string, correctAnswer: string) {
  const comparableUser = removeAccents(userAnswer).toLocaleLowerCase();
  const comparableCorrect = removeAccents(correctAnswer).toLocaleLowerCase();
  if (comparableUser !== comparableCorrect || userAnswer.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase()) {
    return [];
  }

  return Array.from(
    new Set(
      [...Array.from(correctAnswer), ...Array.from(userAnswer)].filter((char) => removeAccents(char) !== char),
    ),
  );
}

function hasForgivenPunctuationIssue(userAnswer: string, correctAnswer: string, options: CompareAnswerOptions) {
  if (options.punctuationSensitive !== "forgiving") return false;

  const strictUser = normalizeAnswer(userAnswer, { ...options, punctuationSensitive: "strict" });
  const strictCorrect = normalizeAnswer(correctAnswer, { ...options, punctuationSensitive: "strict" });

  if (strictUser === strictCorrect) return false;
  if (removeTerminalPunctuation(strictUser) === removeTerminalPunctuation(strictCorrect)) return false;
  return true;
}

function normalizedForSpanishPronounRules(value: string) {
  return normalizeAnswer(value, { accentSensitive: "ignore", punctuationSensitive: "ignore" });
}

function hasCue(value: string, cues: string[]) {
  return cues.some((cue) => new RegExp(`(^|\\s)${cue}(\\s|$)`, "i").test(value));
}

function getSafeOptionalSpanishSubjectPronouns(correctAnswer: string) {
  const normalized = normalizedForSpanishPronounRules(correctAnswer);
  const allowed = new Set<string>();

  if (hasCue(normalized, [
    "quiero",
    "necesito",
    "puedo",
    "trabajo",
    "prefiero",
    "entiendo",
    "siento",
    "estoy",
    "soy",
    "he",
    "fui",
    "tenia",
    "tuve",
    "conoci",
    "hablo",
    "cometo",
    "diria",
    "voy",
    "tengo",
    "queria",
  ])) {
    allowed.add("yo");
  }

  if (hasCue(normalized, [
    "vamos",
    "necesitamos",
    "podemos",
    "queremos",
    "preferimos",
    "entendemos",
    "consideramos",
    "tenemos",
    "somos",
    "estamos",
  ])) {
    allowed.add("nosotros");
    allowed.add("nosotras");
  }

  if (hasCue(normalized, [
    "quieres",
    "necesitas",
    "puedes",
    "prefieres",
    "entiendes",
    "trabajas",
    "hablas",
    "tienes",
    "eres",
    "estas",
    "vas",
  ])) {
    allowed.add("tu");
    allowed.add("tú");
  }

  return allowed;
}

export function isSafeOptionalSpanishSubjectPronounToken(token: string, correctAnswer: string) {
  const allowedPronouns = getSafeOptionalSpanishSubjectPronouns(correctAnswer);
  if (!allowedPronouns.size) return false;
  return allowedPronouns.has(normalizedForSpanishPronounRules(token));
}

function stripSafeOptionalSpanishSubjectPronouns(userAnswer: string, correctAnswer: string, options: CompareAnswerOptions) {
  if (options.languageTarget !== "spanish" || !options.allowSpanishSubjectPronounFlex) return undefined;
  const allowedPronouns = getSafeOptionalSpanishSubjectPronouns(correctAnswer);
  if (!allowedPronouns.size) return undefined;

  const userTokens = userAnswer.trim().split(/\s+/);
  const strippedTokens = userTokens.filter((token) => {
    const normalizedToken = normalizedForSpanishPronounRules(token);
    return !allowedPronouns.has(normalizedToken);
  });

  if (strippedTokens.length === userTokens.length || strippedTokens.length === 0) return undefined;

  const strippedAnswer = strippedTokens.join(" ");
  if (normalizeAnswer(strippedAnswer, options) === normalizeAnswer(correctAnswer, options)) return strippedAnswer;
  return undefined;
}

export function compareAnswers(userAnswer: string, correctAnswer: string, options: CompareAnswerOptions = {}): AnswerComparison {
  const candidates = [correctAnswer, ...(options.acceptedAnswers ?? [])];
  const normalizedUserAnswer = normalizeAnswer(userAnswer, options);

  for (const candidate of candidates) {
    const normalizedCorrectAnswer = normalizeAnswer(candidate, options);
    const pronounFlexibleUserAnswer = stripSafeOptionalSpanishSubjectPronouns(userAnswer, candidate, options);
    if (normalizedUserAnswer === normalizedCorrectAnswer || pronounFlexibleUserAnswer) {
      const answerForIssueCheck = pronounFlexibleUserAnswer ?? userAnswer;
      const missingAccents = findAccentIssues(answerForIssueCheck, candidate);
      const almostAccent = missingAccents.length > 0 && options.accentSensitive === "forgiving";
      const punctuationIssues = hasForgivenPunctuationIssue(answerForIssueCheck, candidate, options) ? ["Check punctuation."] : [];
      const almostPunctuation = punctuationIssues.length > 0;

      return {
        isCorrect: !almostAccent && !almostPunctuation,
        isAlmostCorrect: almostAccent || almostPunctuation,
        missingAccents,
        punctuationIssues,
        normalizedUserAnswer,
        normalizedCorrectAnswer,
        feedbackMessage: almostAccent
          ? `Almost correct. Check the accent mark${missingAccents.length > 1 ? "s" : ""}: ${missingAccents.join(" ")}.`
          : almostPunctuation
            ? "Almost correct. Check the punctuation."
            : "Correct.",
      };
    }
  }

  return {
    isCorrect: false,
    isAlmostCorrect: false,
    missingAccents: [],
    punctuationIssues: [],
    normalizedUserAnswer,
    normalizedCorrectAnswer: normalizeAnswer(correctAnswer, options),
    feedbackMessage: "Incorrect. Review the correct answer and try it again later.",
  };
}

export function insertAtCursor(input: HTMLInputElement | HTMLTextAreaElement | null, character: string) {
  if (!input) return character;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const next = input.value.slice(0, start) + character + input.value.slice(end);
  input.value = next;
  requestAnimationFrame(() => {
    input.focus();
    input.setSelectionRange(start + character.length, start + character.length);
  });
  return next;
}

export function getSpecialCharactersForLanguage(language: LanguageTarget | "french" | "portuguese", custom: string[] = []) {
  const defaults: Record<string, string[]> = {
    spanish: ["\u00e1", "\u00e9", "\u00ed", "\u00f3", "\u00fa", "\u00fc", "\u00f1", "\u00bf", "\u00a1"],
    english: ["'"],
    french: ["\u00e0", "\u00e2", "\u00e7", "\u00e9", "\u00e8", "\u00ea", "\u00eb", "\u00ee", "\u00ef", "\u00f4", "\u00fb", "\u00f9", "\u00fc", "\u00ff", "\u0153"],
    portuguese: ["\u00e1", "\u00e2", "\u00e3", "\u00e0", "\u00e7", "\u00e9", "\u00ea", "\u00ed", "\u00f3", "\u00f4", "\u00f5", "\u00fa"],
  };
  return Array.from(new Set([...(defaults[language] ?? []), ...custom]));
}

export function calculateAccuracy(correct: number, incorrect: number) {
  const total = correct + incorrect;
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}
