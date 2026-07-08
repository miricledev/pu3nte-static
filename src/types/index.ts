export type LanguageTarget = "spanish" | "english";
export type LearnerNativeLanguage = "spanish" | "english" | "mixed";
export type Level = "beginner" | "elementary" | "intermediate" | "upper-intermediate" | "advanced";
export type ActivityType = "flashcards" | "sentence-builder" | "verb-trainer" | "story" | "quiz" | "reading" | "grammar";

export interface ContentMeta<T extends ActivityType, TData> {
  id: string;
  title: string;
  subtitle: string;
  languageTarget: LanguageTarget;
  learnerNativeLanguage?: LearnerNativeLanguage;
  level: Level;
  tags: string[];
  estimatedMinutes: number;
  skoolSectionName?: string;
  skoolReturnUrl?: string;
  relatedCourse?: string;
  activityType: T;
  data: TData;
}

export interface FlashcardItem {
  id: string;
  term: string;
  definition: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  audioUrl?: string;
  imageUrl?: string;
  acceptedAnswers?: string[];
  languageFrom: LanguageTarget | "mixed";
  languageTo: LanguageTarget | "mixed";
  difficulty?: "easy" | "medium" | "hard";
  notes?: string;
  specialCharacters?: string[];
  starred?: boolean;
}

export type FlashcardDeck = ContentMeta<"flashcards", {
  cards: FlashcardItem[];
  specialCharacters?: string[];
}>;

export interface SentenceStage {
  id: string;
  title: string;
  newVocab: string[];
  fullVocab: string[];
  vocabGuide?: Array<{
    word: string;
    translation: string;
    exampleSentences?: Array<{ source: string; translation: string }>;
    note?: string;
  }>;
  prompt: string;
  targetAnswer: string;
  acceptedAnswers?: string[];
  answerCatches?: Array<{ pattern: string; explanation: string }>;
  hints?: string[];
  explanation?: string;
  audioUrl?: string;
  wordBreakdown?: Array<{ source: string; target: string; note?: string }>;
}

export type SentenceBuilderLesson = ContentMeta<"sentence-builder", {
  stages: SentenceStage[];
  finalChallenge: string;
}>;

export type SpanishPerson = "yo" | "tu" | "elEllaUsted" | "nosotros" | "vosotros" | "ellosEllasUstedes";
export type SpanishTense =
  | "present"
  | "preterite"
  | "imperfect"
  | "future"
  | "conditional"
  | "presentPerfect"
  | "pastPerfect"
  | "presentSubjunctive"
  | "imperfectSubjunctive"
  | "imperative"
  | "gerund"
  | "pastParticiple";

export interface SpanishVerb {
  infinitive: string;
  translation: string;
  language: "spanish";
  regularity: "regular" | "irregular" | "stem-changing" | "reflexive" | "mixed";
  endingsGroup: "ar" | "er" | "ir" | null;
  conjugations: Partial<Record<SpanishTense, Partial<Record<SpanishPerson, string>>>>;
  acceptedAlternatives?: Record<string, string[]>;
  notes?: string[];
  examples?: string[];
}

export type EnglishPerson = "I" | "you" | "heSheIt" | "we" | "they";

export interface EnglishVerb {
  base: string;
  translation: string;
  language: "english";
  regularity: "regular" | "irregular";
  forms: {
    base: string;
    thirdPersonSingular: string;
    pastSimple: string;
    pastParticiple: string;
    presentParticiple: string;
  };
  tensePatterns: Partial<Record<string, Partial<Record<EnglishPerson, string>>>>;
  notes?: string[];
  examples?: string[];
}

export type VerbTrainerSet = ContentMeta<"verb-trainer", {
  verbs: Array<SpanishVerb | EnglishVerb>;
  tenses: string[];
  persons: string[];
}>;

export interface StoryCharacter {
  id: string;
  name: string;
  initials: string;
  side: "left" | "right";
  color?: "red" | "gold" | "blue" | "cyan" | "green" | "violet";
}

export interface Highlight {
  phrase: string;
  meaning?: string;
  note?: string;
  explanation?: string;
}

export interface StoryChoice {
  id: string;
  text: string;
  feedback?: string;
}

export interface StoryMessage {
  id: string;
  speakerId: string;
  messageType?: "text" | "narrator" | "voice-note";
  text: string;
  translation?: string;
  vocabHighlights?: Highlight[];
  grammarHighlights?: Highlight[];
  audioUrl?: string;
  requiresUserChoice?: boolean;
  choices?: StoryChoice[];
  challenge?: string;
}

export interface StoryComprehensionCheck {
  id: string;
  afterMessageId: string;
  question: CheckpointQuestion;
}

export type WhatsAppStory = ContentMeta<"story", {
  targetLanguage: LanguageTarget;
  nativeLanguage: LearnerNativeLanguage;
  characters: StoryCharacter[];
  messages: StoryMessage[];
  comprehensionChecks?: StoryComprehensionCheck[];
  endQuiz?: CheckpointQuestion[];
  learnedVocab?: string[];
  finalReview?: {
    keyPhrases: string[];
    grammarPatterns: string[];
    speakingPrompts: string[];
  };
  completionTask?: {
    title: string;
    instructions: string;
  };
}>;

export type QuestionType =
  | "multiple-choice"
  | "typed"
  | "true-false"
  | "match-pairs"
  | "order-words"
  | "fill-blank"
  | "self-check";

export interface CheckpointQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  nativePrompt?: string;
  options?: string[];
  pairs?: Array<{ left: string; right: string }>;
  wordBank?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  explanation: string;
  points: number;
  skillTag: string;
}

export type CheckpointQuiz = ContentMeta<"quiz", {
  description: string;
  passScore: number;
  feedbackMode: "immediate" | "end";
  questions: CheckpointQuestion[];
}>;

export interface ReadingParagraph {
  id: string;
  text: string;
  translation?: string;
  highlights?: Highlight[];
  shadowLine?: string;
}

export type ReadingComprehension = ContentMeta<"reading", {
  targetLanguage: LanguageTarget;
  paragraphs: ReadingParagraph[];
  glossary: Highlight[];
  questions: CheckpointQuestion[];
  audioUrl?: string;
  audioAlignmentUrl?: string;
}>;

export interface GrammarHighlight {
  text: string;
  label: string;
  explanation: string;
}

export interface GrammarExample {
  sourceText?: string;
  targetText: string;
  translation?: string;
  note?: string;
  highlightedParts?: GrammarHighlight[];
}

export interface GrammarCommonMistake {
  wrong: string;
  correct: string;
  explanation: string;
}

export interface GrammarIntro {
  shortExplanation: string;
  pattern?: string;
  examples: GrammarExample[];
  commonMistakes?: GrammarCommonMistake[];
  quickRules?: string[];
}

export type GrammarExerciseType =
  | "recognition"
  | "multiple-choice"
  | "fill-blank"
  | "typed-answer"
  | "sentence-transform"
  | "error-correction"
  | "word-order"
  | "match-pairs"
  | "choose-explanation"
  | "mini-translation"
  | "context-choice"
  | "dialogue-completion"
  | "tense-shift"
  | "pronoun-swap"
  | "negative-question-transform"
  | "speed-drill"
  | "mixed-review";

export interface GrammarExerciseItem {
  id: string;
  prompt: string;
  context?: string;
  sourceSentence?: string;
  targetAnswer?: string;
  acceptedAnswers?: string[];
  options?: string[];
  correctOption?: string;
  correctOptions?: string[];
  explanation?: string;
  hint?: string;
  difficulty?: "easy" | "medium" | "hard";
  skillTag?: string;
  grammarFocus?: string;
  nativeLanguagePrompt?: string;
  targetLanguagePrompt?: string;
  words?: string[];
  pairs?: { left: string; right: string }[];
  transformation?: {
    from: string;
    to: string;
    instruction: string;
  };
  dialogue?: {
    speakerA?: string;
    speakerB?: string;
    before?: string;
    after?: string;
  };
  feedback?: {
    correct?: string;
    incorrect?: string;
    almost?: string;
  };
}

export interface GrammarPracticeSection {
  id: string;
  title: string;
  instructions: string;
  type: GrammarExerciseType;
  items: GrammarExerciseItem[];
  requiredScoreToPass?: number;
  timerSeconds?: number;
  allowRetry?: boolean;
  showExplanations?: "immediate" | "end" | "manual";
}

export type GrammarMasteryLesson = ContentMeta<"grammar", {
  grammarTopic: string;
  grammarFamily?: string;
  intro: GrammarIntro;
  sections: GrammarPracticeSection[];
  finalChallenge?: GrammarPracticeSection;
  completionMessage?: string;
}>;

export interface CardProgress {
  status: "new" | "learning" | "reviewing" | "mastered";
  correctCount: number;
  incorrectCount: number;
  typedCorrectCount: number;
  lastSeen?: string;
}

export interface ProgressRecord {
  version: 1;
  completedActivities: string[];
  lastOpened: Array<{ activityId: string; activityType: ActivityType; openedAt: string; title: string }>;
  percentages: Record<string, number>;
  flashcards: Record<string, { cards: Record<string, CardProgress>; cardsMastered: number; cardsLearning: number }>;
  quizScores: Record<string, { bestScore: number; lastScore: number; passed: boolean; updatedAt: string }>;
  sentenceBuilder: Record<string, { attempts: number; completedStages: string[]; updatedAt: string }>;
  verbTrainer: Record<string, {
    correct: number;
    incorrect: number;
    weakVerbs: Record<string, number>;
    weakTenses: Record<string, number>;
    updatedAt: string;
  }>;
  readingScores: Record<string, { bestScore: number; lastScore: number; updatedAt: string }>;
  grammarMastery: Record<string, {
    startedAt: string;
    completedAt?: string;
    currentSection?: string;
    completedSections: string[];
    itemAttempts: Record<string, number>;
    correct: number;
    incorrect: number;
    bestScore: number;
    latestScore: number;
    weakSkillTags: Record<string, number>;
    weakGrammarFocus: Record<string, number>;
    updatedAt: string;
  }>;
  storyProgress: Record<string, { visibleMessages: number; completed: boolean; updatedAt: string }>;
  dailyActivity: Record<string, number>;
  updatedAt: string;
}
