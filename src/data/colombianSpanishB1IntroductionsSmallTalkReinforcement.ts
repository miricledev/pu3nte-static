import type {
  CheckpointQuestion,
  CheckpointQuiz,
  FlashcardDeck,
  FlashcardItem,
  ReadingComprehension,
  SentenceBuilderLesson,
  SentenceStage,
  StoryMessage,
  WhatsAppStory,
} from "../types";

type VocabItem = {
  id: string;
  term: string;
  meaning: string;
  matchingMeaning?: string;
  note: string;
  example: string;
  translation: string;
  starred?: boolean;
};

const introSmallTalkVocab: VocabItem[] = [
  { id: "que-mas", term: "¿Qué más?", meaning: "What’s up? / How’s it going?", matchingMeaning: "What’s up? / How’s it going? (basic greeting)", note: "Very common Colombian greeting.", example: "¿Qué más? ¿Todo bien?", translation: "What’s up? All good?", starred: true },
  { id: "que-mas-parce", term: "¿Qué más, parce?", meaning: "What’s up, mate?", matchingMeaning: "What’s up, mate? (with parce)", note: "Casual and friendly, especially urban/Paisa style.", example: "¿Qué más, parce? ¿Tomamos un tinto?", translation: "What’s up, mate? Shall we have a coffee?", starred: true },
  { id: "parce", term: "parce", meaning: "mate / bro / friend", matchingMeaning: "mate / bro / friend (short form)", note: "Informal; similar to dude or mate.", example: "Tranqui, parce. Me avisas.", translation: "No worries, mate. Let me know.", starred: true },
  { id: "todo-bien", term: "¿Todo bien?", meaning: "All good? / Everything okay?", note: "Common casual check-in.", example: "¿Todo bien por acá?", translation: "Everything okay around here?", starred: true },
  { id: "listo", term: "listo", meaning: "okay / ready / got it / done", note: "Super common in Colombia; used constantly.", example: "Listo, nos vemos por acá.", translation: "Okay, we’ll meet around here.", starred: true },
  { id: "vivo-por-aca", term: "vivo por acá", meaning: "I live around here", note: "Natural spoken phrasing.", example: "Me llamo Dani y vivo por acá.", translation: "My name is Dani and I live around here.", starred: true },
  { id: "por-aca", term: "por acá", meaning: "around here / over here", note: "Very common everyday phrase.", example: "¿Quieres tomar un tinto por acá?", translation: "Do you want to have a coffee around here?", starred: true },
  { id: "que-pena", term: "qué pena", meaning: "sorry / excuse me / my bad", note: "Used a lot in Colombia as a polite softener.", example: "Qué pena, ¿me repites tu nombre?", translation: "Sorry, can you repeat your name?", starred: true },
  { id: "que-pena-repites", term: "Qué pena, ¿me repites tu nombre?", meaning: "Sorry, can you repeat your name?", note: "Natural polite Colombian phrasing.", example: "Qué pena, ¿me repites tu nombre? Me cogió la tarde.", translation: "Sorry, can you repeat your name? I got delayed.", starred: true },
  { id: "me-repites-tu-nombre", term: "¿Me repites tu nombre?", meaning: "Can you repeat your name?", note: "Friendly spoken question.", example: "¿Me repites tu nombre, porfa?", translation: "Can you repeat your name, please?", starred: true },
  { id: "de-una", term: "de una", meaning: "sure / absolutely / let’s do it / straight away", note: "Very Colombian casual agreement.", example: "De una, tomamos un tinto.", translation: "Sure, let’s have a coffee.", starred: true },
  { id: "bacano", term: "bacano", meaning: "cool / nice / great", note: "Common Colombian positive reaction.", example: "Bacano, de una.", translation: "Cool, let’s do it.", starred: true },
  { id: "bacano-de-una", term: "Bacano, de una", meaning: "Cool, let’s do it", note: "Very natural casual combo.", example: "Bacano, de una. Nos vemos por acá.", translation: "Cool, let’s do it. We’ll meet around here.", starred: true },
  { id: "un-tinto", term: "un tinto", meaning: "a small black coffee", note: "In Colombia, tinto usually means black coffee, not red wine.", example: "Tomamos un tinto y hablamos.", translation: "We’ll have a coffee and talk.", starred: true },
  { id: "tomar-un-tinto", term: "tomar un tinto", meaning: "to have a small black coffee", note: "Common coffee-plan phrase.", example: "¿Quieres tomar un tinto?", translation: "Do you want to have a coffee?", starred: true },
  { id: "quieres-tomar-tinto", term: "¿Quieres tomar un tinto por acá?", meaning: "Do you want to have a coffee around here?", note: "Natural Colombian small-talk invitation.", example: "¿Quieres tomar un tinto por acá después?", translation: "Do you want to have a coffee around here later?", starred: true },
  { id: "hacer-una-vuelta", term: "hacer una vuelta", meaning: "to run an errand / sort something out", note: "Very Colombian everyday phrase.", example: "Tengo que hacer una vuelta antes del tinto.", translation: "I have to run an errand before coffee.", starred: true },
  { id: "tengo-que-hacer-vuelta", term: "Tengo que hacer una vuelta", meaning: "I have to run an errand", note: "Common informal phrasing.", example: "Tengo que hacer una vuelta, pero vuelvo rápido.", translation: "I have to run an errand, but I’ll be back quickly.", starred: true },
  { id: "tranqui", term: "tranqui", meaning: "no worries / relax / it’s okay", note: "Casual shortened form of tranquilo/tranquila.", example: "Tranqui, no pasa nada.", translation: "No worries, it’s okay.", starred: true },
  { id: "tranqui-parce", term: "Tranqui, parce", meaning: "No worries, mate", note: "Friendly Colombian-style reassurance.", example: "Tranqui, parce. Me avisas cuando llegues.", translation: "No worries, mate. Let me know when you arrive.", starred: true },
  { id: "me-avisas", term: "me avisas", meaning: "let me know", note: "Very common for plans and texting.", example: "Me avisas si cambias de plan.", translation: "Let me know if you change plans.", starred: true },
  { id: "me-avisas-cuando-llegues", term: "Me avisas cuando llegues", meaning: "Let me know when you arrive", note: "Natural voice-note/texting phrase.", example: "Listo, me avisas cuando llegues.", translation: "Okay, let me know when you arrive.", starred: true },
  { id: "me-cogio-la-tarde", term: "me cogió la tarde", meaning: "I got delayed / I ran late", note: "Very Colombian/natural Latin phrase. Literally: the afternoon caught me.", example: "Qué pena, me cogió la tarde.", translation: "Sorry, I got delayed.", starred: true },
  { id: "me-cogio-trafico", term: "Me cogió la tarde por el tráfico", meaning: "I got delayed because of traffic", note: "Everyday excuse or soft explanation.", example: "Me cogió la tarde por el tráfico, pero ya voy.", translation: "I got delayed because of traffic, but I’m on my way.", starred: true },
  { id: "a-la-orden", term: "a la orden", meaning: "at your service / you’re welcome / how can I help?", note: "Common in shops, taxis, and service situations.", example: "A la orden, ¿qué necesita?", translation: "At your service, how can I help?", starred: true },
  { id: "nos-vemos-por-aca", term: "nos vemos por acá", meaning: "see you around here / we’ll meet around here", note: "Natural casual planning phrase.", example: "Listo, nos vemos por acá.", translation: "Okay, we’ll meet around here.", starred: true },
  { id: "tomamos-un-tinto", term: "tomamos un tinto", meaning: "we’ll have a coffee / let’s have a coffee", note: "Casual Colombian phrasing.", example: "Después tomamos un tinto.", translation: "Later we’ll have a coffee.", starred: true },
  { id: "si-no-llueve", term: "si no llueve más, tomamos un tinto", meaning: "if it doesn’t rain more, we’ll have a coffee", note: "Natural small-talk plus plan phrase.", example: "Si no llueve más, tomamos un tinto por acá.", translation: "If it doesn’t rain more, we’ll have a coffee around here.", starred: true },
];

const highlightMap = Object.fromEntries(introSmallTalkVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

function highlights(phrases: string[]) {
  return phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
}

function cardFromVocab(item: VocabItem): FlashcardItem {
  return {
    id: item.id,
    term: item.term,
    definition: item.meaning,
    exampleSentence: item.example,
    exampleTranslation: item.translation,
    acceptedAnswers: [item.meaning.split("/")[0].trim()],
    languageFrom: "spanish",
    languageTo: "english",
    difficulty: item.starred ? "hard" : "medium",
    notes: item.note,
    starred: item.starred,
  };
}

function message(
  id: string,
  speakerId: string,
  text: string,
  translation: string,
  phrases: string[],
  messageType: StoryMessage["messageType"] = "text",
  audioUrl?: string,
): StoryMessage {
  return {
    id,
    speakerId,
    messageType,
    text,
    translation,
    ...(audioUrl ? { audioUrl } : {}),
    vocabHighlights: highlights(phrases),
  };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(
  id: string,
  title: string,
  newVocab: string[],
  fullVocab: string[],
  prompt: string,
  targetAnswer: string,
  explanation: string,
  wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>,
  hints: string[] = [],
  acceptedAnswers: string[] = [],
): SentenceStage {
  return {
    id,
    title,
    newVocab,
    fullVocab,
    prompt,
    targetAnswer,
    acceptedAnswers,
    hints,
    explanation,
    wordBreakdown,
  };
}

export const colombianSpanishB1IntroductionsSmallTalkFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b1-introductions-small-talk-flashcards",
  title: "Colombian Spanish B1: Introductions & Small Talk Flashcards",
  subtitle: "Core Colombian greetings, softeners, coffee plans, delays, and casual follow-up chunks from the speaking builder.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "flashcards", "introductions", "small talk"],
  estimatedMinutes: 14,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-introductions-small-talk-builder",
  activityType: "flashcards",
  data: {
    cards: introSmallTalkVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué más? = What’s up?",
  "parce = mate / bro",
  "¿Todo bien? = All good?",
  "vivo por acá = I live around here",
  "qué pena = sorry / excuse me",
  "¿me repites tu nombre? = can you repeat your name?",
  "de una = sure / let’s do it",
  "bacano = cool / nice",
  "un tinto = a small black coffee",
  "tomar un tinto = to have a coffee",
  "hacer una vuelta = to run an errand",
  "tranqui = no worries",
  "me avisas = let me know",
  "me cogió la tarde = I got delayed",
  "por el tráfico = because of traffic",
  "a la orden = at your service",
  "nos vemos por acá = we’ll meet around here",
  "si no llueve más = if it doesn’t rain more",
];

export const colombianSpanishB1IntroductionsSmallTalkSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-b1-introductions-small-talk-sentence-builder",
  title: "B1 Sentence Builder: Colombian Introductions & Small Talk",
  subtitle: "Build text-based Colombian Spanish sentences for greetings, names, coffee plans, delays, and casual meetups.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["colombian-spanish", "b1", "sentence-builder", "introductions", "small-talk"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-introductions-small-talk-builder",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Write or say a friendly Colombian voice note introducing yourself, asking someone to repeat their name, explaining you got delayed, and suggesting coffee around here.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Friendly check-in",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "What’s up, mate? All good?",
        "¿Qué más, parce? ¿Todo bien?",
        "This is a compact Colombian opener: warm, casual, and useful before almost any small-talk exchange.",
        breakdown([["What’s up?", "¿Qué más?"], ["mate", "parce"], ["All good?", "¿Todo bien?"]]),
        ["Start with ¿Qué más?", "Add parce to make it friendly and informal."],
      ),
      stage(
        "stage-2",
        "Stage 2: Say where you live",
        sentenceVocab.slice(3, 4),
        sentenceVocab.slice(0, 4),
        "What’s up? I live around here.",
        "¿Qué más? Vivo por acá.",
        "Por acá sounds more conversational than a stiff literal location phrase.",
        breakdown([["What’s up?", "¿Qué más?"], ["I live", "vivo"], ["around here", "por acá"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Ask for a name again",
        sentenceVocab.slice(4, 6),
        sentenceVocab.slice(0, 6),
        "Sorry, can you repeat your name?",
        "Qué pena, ¿me repites tu nombre?",
        "Qué pena softens the request and makes it sound polite without becoming formal.",
        breakdown([["Sorry / excuse me", "Qué pena"], ["can you repeat", "¿me repites"], ["your name", "tu nombre"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: React naturally",
        sentenceVocab.slice(6, 8),
        sentenceVocab.slice(0, 8),
        "Cool, let’s do it.",
        "Bacano, de una.",
        "Bacano reacts positively; de una accepts the plan immediately.",
        breakdown([["Cool", "Bacano"], ["let’s do it", "de una"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Coffee plan",
        sentenceVocab.slice(8, 10),
        sentenceVocab.slice(0, 10),
        "Do you want to have a coffee around here?",
        "¿Quieres tomar un tinto por acá?",
        "In Colombia, un tinto is a small black coffee. This is an easy small-talk invitation.",
        breakdown([["Do you want", "¿Quieres"], ["to have a coffee", "tomar un tinto"], ["around here", "por acá"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Errand first",
        sentenceVocab.slice(10, 11),
        sentenceVocab.slice(0, 11),
        "I have to run an errand, but we’ll have a coffee later.",
        "Tengo que hacer una vuelta, pero después tomamos un tinto.",
        "Hacer una vuelta is a very Colombian everyday way to say you have to sort something out.",
        breakdown([["I have to", "Tengo que"], ["run an errand", "hacer una vuelta"], ["we’ll have a coffee", "tomamos un tinto"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Reassure and text",
        sentenceVocab.slice(11, 13),
        sentenceVocab.slice(0, 13),
        "No worries, mate. Let me know when you arrive.",
        "Tranqui, parce. Me avisas cuando llegues.",
        "This sounds like a natural Colombian text or voice note.",
        breakdown([["No worries", "Tranqui"], ["mate", "parce"], ["Let me know", "Me avisas"], ["when you arrive", "cuando llegues"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Explain a delay",
        sentenceVocab.slice(13, 15),
        sentenceVocab.slice(0, 15),
        "Sorry, I got delayed because of traffic.",
        "Qué pena, me cogió la tarde por el tráfico.",
        "Me cogió la tarde is an idiomatic way to say you ran late or got delayed.",
        breakdown([["Sorry", "Qué pena"], ["I got delayed", "me cogió la tarde"], ["because of traffic", "por el tráfico"]]),
      ),
      stage(
        "stage-9",
        "Stage 9: Service phrase and plan",
        sentenceVocab.slice(15, 17),
        sentenceVocab.slice(0, 17),
        "At your service. We’ll meet around here.",
        "A la orden. Nos vemos por acá.",
        "A la orden can be service language, a polite response, or a friendly helpful phrase.",
        breakdown([["At your service", "A la orden"], ["we’ll meet", "nos vemos"], ["around here", "por acá"]]),
      ),
      stage(
        "stage-10",
        "Stage 10: Full small-talk voice note",
        sentenceVocab.slice(17),
        sentenceVocab,
        "What’s up, mate? Sorry, I got delayed because of traffic. If it doesn’t rain more, we’ll have a coffee around here.",
        "¿Qué más, parce? Qué pena, me cogió la tarde por el tráfico. Si no llueve más, tomamos un tinto por acá.",
        "This combines greeting, soft apology, reason, and a relaxed plan.",
        breakdown([["What’s up, mate?", "¿Qué más, parce?"], ["Sorry", "Qué pena"], ["I got delayed", "me cogió la tarde"], ["If it doesn’t rain more", "Si no llueve más"], ["we’ll have a coffee", "tomamos un tinto"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/colombian-spanish-b1-introductions-small-talk/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-intro-story-q1",
    type: "multiple-choice",
    prompt: "Why does Nico arrive late?",
    options: ["He got delayed because of traffic", "He forgot the name", "He had no money", "He was buying shoes"],
    correctAnswer: "He got delayed because of traffic",
    explanation: "Nico says he got delayed because of traffic before suggesting coffee.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-intro-story-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'Sorry, can you repeat your name?'",
    nativePrompt: "Sorry, can you repeat your name?",
    wordBank: ["Qué", "pena,", "¿me", "repites", "tu", "nombre?"],
    correctAnswer: "Qué pena, ¿me repites tu nombre?",
    explanation: "This is a polite Colombian way to ask for the name again.",
    points: 1,
    skillTag: "softener",
  },
  {
    id: "colombian-b1-intro-story-q3",
    type: "multiple-choice",
    prompt: "Which phrase does Sara use to accept the coffee plan?",
    options: ["Bacano, de una", "A la orden", "Me cogió la tarde", "Vivo por acá"],
    correctAnswer: "Bacano, de una",
    explanation: "Bacano, de una means cool, let’s do it.",
    points: 1,
    skillTag: "reaction",
  },
  {
    id: "colombian-b1-intro-story-q4",
    type: "order-words",
    prompt: "Order the phrase meaning 'Let me know when you arrive'.",
    nativePrompt: "Let me know when you arrive.",
    wordBank: ["Me", "avisas", "cuando", "llegues"],
    correctAnswer: "Me avisas cuando llegues",
    explanation: "This is a natural texting or voice-note phrase.",
    points: 1,
    skillTag: "texting",
  },
];

export const colombianSpanishB1IntroductionsSmallTalkWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b1-introductions-small-talk",
  title: "Colombian B1 Story: Tinto After the Meetup",
  subtitle: "A WhatsApp-style story for Colombian introductions, small talk, name repetition, delays, and coffee plans.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "WhatsApp", "introductions", "small talk"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-introductions-small-talk-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sara", name: "Sara", initials: "S", side: "right", color: "blue" },
      { id: "nico", name: "Nico", initials: "N", side: "left", color: "green" },
      { id: "camila", name: "Camila", initials: "C", side: "left", color: "violet" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Sara is new at a language meetup in Medellín. Notice how small talk turns into a relaxed coffee plan.", "Guide: Sara is new at a language meetup in Medellín. Notice how small talk turns into a relaxed coffee plan.", [], "narrator"),
      message("m1", "nico", "¿Qué más? ¿Todo bien por acá?", "What’s up? Everything okay around here?", ["¿Qué más?", "¿Todo bien?", "por acá"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m1.mp3"),
      message("m2", "sara", "Sí, todo bien. Me llamo Sara y vivo por acá.", "Yes, all good. My name is Sara and I live around here.", ["vivo por acá", "por acá"]),
      message("m3", "nico", "Bacano. Yo soy Nico. Si necesitas algo, a la orden.", "Cool. I’m Nico. If you need anything, at your service.", ["bacano", "a la orden"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m3.mp3"),
      message("m4", "sara", "Qué pena, ¿me repites tu nombre?", "Sorry, can you repeat your name?", ["qué pena", "Qué pena, ¿me repites tu nombre?", "¿Me repites tu nombre?"]),
      message("m5", "nico", "Nico. Tranqui, parce, a todos nos pasa.", "Nico. No worries, mate, it happens to everyone.", ["tranqui", "Tranqui, parce", "parce"]),
      message("m6", "sara", "Listo, Nico. ¿Quieres tomar un tinto por acá después?", "Okay, Nico. Do you want to have a coffee around here later?", ["listo", "¿Quieres tomar un tinto por acá?", "tomar un tinto", "un tinto", "por acá"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m6.mp3"),
      message("m7", "camila", "Me meto al plan: tomamos un tinto y practicamos un rato.", "I’m joining the plan: we’ll have a coffee and practise for a bit.", ["tomamos un tinto", "un tinto"]),
      message("m8", "nico", "De una. Pero primero tengo que hacer una vuelta.", "Sure. But first I have to run an errand.", ["de una", "Tengo que hacer una vuelta", "hacer una vuelta"]),
      message("m9", "sara", "Tranqui. Me avisas cuando llegues.", "No worries. Let me know when you arrive.", ["tranqui", "Me avisas cuando llegues", "me avisas"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m9.mp3"),
      message("m10", "nico", "Listo. Si me demoro, me avisas dónde están.", "Okay. If I’m delayed, let me know where you are.", ["listo", "me avisas"]),
      message("m11", "camila", "Nos vemos por acá, al lado de la entrada.", "We’ll meet around here, next to the entrance.", ["nos vemos por acá", "por acá"]),
      message("m12", "nico", "Qué pena, me cogió la tarde por el tráfico.", "Sorry, I got delayed because of traffic.", ["qué pena", "Me cogió la tarde por el tráfico", "me cogió la tarde"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m12.mp3"),
      message("m13", "sara", "Tranqui, parce. Igual estamos por acá.", "No worries, mate. We’re still around here.", ["Tranqui, parce", "parce", "por acá"]),
      message("m14", "nico", "Bacano, de una. Si no llueve más, tomamos un tinto.", "Cool, let’s do it. If it doesn’t rain more, we’ll have a coffee.", ["Bacano, de una", "si no llueve más, tomamos un tinto", "tomamos un tinto"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m14.mp3"),
      message("m15", "camila", "A la orden con el café. Yo conozco un sitio bueno por acá.", "At your service with the coffee. I know a good place around here.", ["a la orden", "por acá"]),
      message("m16", "sara", "Qué más, parce: ya me siento menos perdida.", "What’s up, mate: I already feel less lost.", ["¿Qué más, parce?", "parce"]),
      message("m17", "nico", "Listo, nos vemos por acá y después hacemos la vuelta.", "Okay, we’ll meet around here and then sort out the errand.", ["listo", "nos vemos por acá", "hacer una vuelta"], "voice-note", "/audio/stories/colombian-spanish-b1-introductions-small-talk/m17.mp3"),
    ],
    comprehensionChecks: [
      { id: "colombian-b1-intro-check-1", afterMessageId: "m4", question: storyQuestions[1] },
      { id: "colombian-b1-intro-check-2", afterMessageId: "m8", question: storyQuestions[2] },
      { id: "colombian-b1-intro-check-3", afterMessageId: "m12", question: storyQuestions[0] },
      { id: "colombian-b1-intro-check-4", afterMessageId: "m14", question: storyQuestions[3] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: introSmallTalkVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: introSmallTalkVocab.map((item) => item.term),
      grammarPatterns: ["Informal greeting: ¿Qué más? / ¿Qué más, parce?", "Soft request: Qué pena, ¿me repites...?", "Plan language: tomamos un tinto / nos vemos por acá.", "Delay explanation: me cogió la tarde por el tráfico."],
      speakingPrompts: ["Introduce yourself and say you live around here.", "Ask someone to repeat their name politely.", "Explain you got delayed because of traffic.", "Suggest having a coffee around here."],
    },
    completionTask: {
      title: "Your meetup voice note",
      instructions: "Record a 60-second Colombian-style voice note introducing yourself, asking a name again, explaining a delay, and suggesting coffee. Use at least 10 phrases from the story.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Llegué a un intercambio de idiomas en Medellín y no conocía a nadie. Un man me saludó con ¿Qué más? ¿Todo bien? Yo respiré, sonreí y dije: sí, todo bien; me llamo Sara y vivo por acá. La frase vivo por acá me salvó porque sonaba sencilla, local y natural.",
    translation:
      "I arrived at a language exchange in Medellín and didn’t know anyone. A guy greeted me with What’s up? All good? I breathed, smiled, and said: yes, all good; my name is Sara and I live around here. The phrase I live around here saved me because it sounded simple, local, and natural.",
    highlights: highlights(["¿Qué más?", "¿Todo bien?", "vivo por acá", "por acá"]),
    shadowLine: "Me llamo Sara y vivo por acá.",
  },
  {
    id: "p2",
    text:
      "El man se presentó muy rápido. Me dio pena, pero necesitaba entender. Entonces dije: Qué pena, ¿me repites tu nombre? Él se rió y respondió: Nico. Tranqui, parce, a todos nos pasa. Esa respuesta me relajó de una.",
    translation:
      "The guy introduced himself very quickly. I felt awkward, but I needed to understand. So I said: Sorry, can you repeat your name? He laughed and answered: Nico. No worries, mate, it happens to everyone. That answer relaxed me immediately.",
    highlights: highlights(["qué pena", "Qué pena, ¿me repites tu nombre?", "¿Me repites tu nombre?", "tranqui", "Tranqui, parce", "parce", "de una"]),
    shadowLine: "Qué pena, ¿me repites tu nombre?",
  },
  {
    id: "p3",
    text:
      "Después llegó Camila y dijo que conocía una cafetería buena por acá. Yo pregunté: ¿Quieres tomar un tinto por acá? Nico dijo: Bacano, de una, pero primero tengo que hacer una vuelta. Camila contestó: listo, nos vemos por acá cuando termines.",
    translation:
      "Then Camila arrived and said she knew a good coffee place around here. I asked: Do you want to have a coffee around here? Nico said: Cool, let’s do it, but first I have to run an errand. Camila answered: okay, we’ll meet around here when you finish.",
    highlights: highlights(["por acá", "¿Quieres tomar un tinto por acá?", "tomar un tinto", "un tinto", "Bacano, de una", "bacano", "de una", "Tengo que hacer una vuelta", "hacer una vuelta", "listo", "nos vemos por acá"]),
    shadowLine: "¿Quieres tomar un tinto por acá?",
  },
  {
    id: "p4",
    text:
      "Nico mandó una nota de voz más tarde: Qué pena, me cogió la tarde por el tráfico. Yo le escribí: tranqui, parce, me avisas cuando llegues. Camila agregó: a la orden, yo pido la mesa. Si no llueve más, tomamos un tinto afuera.",
    translation:
      "Nico sent a voice note later: Sorry, I got delayed because of traffic. I wrote back: no worries, mate, let me know when you arrive. Camila added: at your service, I’ll get the table. If it doesn’t rain more, we’ll have a coffee outside.",
    highlights: highlights(["qué pena", "Me cogió la tarde por el tráfico", "me cogió la tarde", "tranqui", "parce", "Me avisas cuando llegues", "me avisas", "a la orden", "si no llueve más, tomamos un tinto", "tomamos un tinto"]),
    shadowLine: "Tranqui, parce. Me avisas cuando llegues.",
  },
  {
    id: "p5",
    text:
      "Al final, el intercambio no fue perfecto, pero fue bacano. Aprendí que una conversación pequeña puede abrir una puerta: ¿Qué más, parce? ¿Todo bien? Qué pena, ¿me repites tu nombre? Listo, nos vemos por acá. Y si hay tiempo, tomamos un tinto.",
    translation:
      "In the end, the exchange wasn’t perfect, but it was cool. I learned that a small conversation can open a door: What’s up, mate? All good? Sorry, can you repeat your name? Okay, we’ll meet around here. And if there’s time, we’ll have a coffee.",
    highlights: highlights(["bacano", "¿Qué más, parce?", "¿Todo bien?", "Qué pena, ¿me repites tu nombre?", "listo", "nos vemos por acá", "tomamos un tinto"]),
    shadowLine: "Listo, nos vemos por acá.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-intro-reading-q1",
    type: "multiple-choice",
    prompt: "Where is the narrator at the start?",
    options: ["At a language exchange", "At a hospital", "At the airport", "At a football match"],
    correctAnswer: "At a language exchange",
    explanation: "The reading starts at an intercambio de idiomas in Medellín.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-intro-reading-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'I live around here'.",
    nativePrompt: "I live around here.",
    wordBank: ["vivo", "por", "acá"],
    correctAnswer: "vivo por acá",
    explanation: "Vivo por acá is a natural way to say you live around here.",
    points: 1,
    skillTag: "sentence-order",
  },
  {
    id: "colombian-b1-intro-reading-q3",
    type: "multiple-choice",
    prompt: "What does Nico need to do before coffee?",
    options: ["Run an errand", "Repeat his name", "Buy a plane ticket", "Call his boss"],
    correctAnswer: "Run an errand",
    explanation: "He says he first has to run an errand: hacer una vuelta.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "colombian-b1-intro-reading-q4",
    type: "order-words",
    prompt: "Order the phrase meaning 'No worries, mate'.",
    nativePrompt: "No worries, mate.",
    wordBank: ["Tranqui,", "parce"],
    correctAnswer: "Tranqui, parce",
    explanation: "Tranqui, parce is a friendly Colombian reassurance.",
    points: 1,
    skillTag: "reassurance",
  },
  {
    id: "colombian-b1-intro-reading-q5",
    type: "multiple-choice",
    prompt: "Which phrase means 'let me know when you arrive'?",
    options: ["Me avisas cuando llegues", "Nos vemos por acá", "A la orden", "¿Todo bien?"],
    correctAnswer: "Me avisas cuando llegues",
    explanation: "Me avisas cuando llegues is common for texting and voice notes.",
    points: 1,
    skillTag: "texting",
  },
];

export const colombianSpanishB1IntroductionsSmallTalkReading: ReadingComprehension = {
  id: "colombian-spanish-b1-reading-introductions-small-talk",
  title: "Colombian B1 Reading: First Meetup, First Tinto",
  subtitle: "A first-person story using Colombian greetings, name repetition, delays, and coffee-plan language.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "reading", "introductions", "small talk"],
  estimatedMinutes: 14,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-introductions-small-talk-builder",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-b1-reading-introductions-small-talk/full.mp3",
    paragraphs: readingParagraphs,
    glossary: introSmallTalkVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })),
    explanation: "These phrases come directly from the Colombian B1 introductions and small-talk speaking lesson.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

export const colombianSpanishB1IntroductionsSmallTalkQuiz: CheckpointQuiz = {
  id: "colombian-spanish-b1-introductions-small-talk-quiz",
  title: "Colombian Spanish B1: Introductions & Small Talk Quiz",
  subtitle: "Check Colombian greetings, softeners, coffee plans, delays, and casual meetup language.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "quiz", "introductions", "small talk"],
  estimatedMinutes: 15,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-introductions-small-talk-builder",
  activityType: "quiz",
  data: {
    description: "Practice the Colombian B1 phrases from the introductions and small-talk speaking builder.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-b1-intro-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase means 'Can you repeat your name?'",
        options: ["¿Me repites tu nombre?", "A la orden", "Tomamos un tinto", "Vivo por acá"],
        correctAnswer: "¿Me repites tu nombre?",
        explanation: "¿Me repites tu nombre? is the direct question.",
        points: 1,
        skillTag: "question",
      },
      {
        id: "colombian-b1-intro-quiz-2",
        type: "fill-blank",
        prompt: "Complete: Me avisas cuando ______.",
        nativePrompt: "Let me know when you arrive.",
        correctAnswer: "llegues",
        explanation: "Me avisas cuando llegues means let me know when you arrive.",
        points: 1,
        skillTag: "texting",
      },
      {
        id: "colombian-b1-intro-quiz-3",
        type: "multiple-choice",
        prompt: "Which phrase means 'I got delayed because of traffic'?",
        options: ["Me cogió la tarde por el tráfico", "Bacano, de una", "A la orden", "¿Todo bien?"],
        correctAnswer: "Me cogió la tarde por el tráfico",
        explanation: "This is the delay excuse from the lesson.",
        points: 1,
        skillTag: "delay",
      },
      {
        id: "colombian-b1-intro-quiz-4",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Do you want to have a coffee around here?",
        wordBank: ["¿Quieres", "tomar", "un", "tinto", "por", "acá?"],
        correctAnswer: "¿Quieres tomar un tinto por acá?",
        explanation: "This is a natural Colombian coffee invitation.",
        points: 1,
        skillTag: "plan",
      },
      {
        id: "colombian-b1-intro-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Sorry, I got delayed because of traffic.",
        wordBank: ["Qué", "pena,", "me", "cogió", "la", "tarde", "por", "el", "tráfico"],
        correctAnswer: "Qué pena, me cogió la tarde por el tráfico",
        explanation: "This combines the softener with the delay reason.",
        points: 2,
        skillTag: "sentence-order",
      },
      pairQuestion("colombian-b1-intro-pairs-1", "Match Colombian introductions and small-talk phrases set 1.", introSmallTalkVocab.slice(0, 7)),
      pairQuestion("colombian-b1-intro-pairs-2", "Match Colombian introductions and small-talk phrases set 2.", introSmallTalkVocab.slice(7, 14)),
      pairQuestion("colombian-b1-intro-pairs-3", "Match Colombian introductions and small-talk phrases set 3.", introSmallTalkVocab.slice(14, 21)),
      pairQuestion("colombian-b1-intro-pairs-4", "Match Colombian introductions and small-talk phrases set 4.", introSmallTalkVocab.slice(21)),
    ],
  },
};
