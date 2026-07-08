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
  example: string;
  translation: string;
  starred?: boolean;
};

const workRoutineVocab: VocabItem[] = [
  { id: "hey-real-quick", term: "Hey, real quick", meaning: "Oye, rapidito / Una cosa rápida", example: "Hey, real quick, can you cover me?", translation: "Oye, rapidito, ¿me puedes cubrir?", starred: true },
  { id: "i-gotta", term: "I gotta", meaning: "Tengo que", example: "I gotta get to work.", translation: "Tengo que llegar al trabajo.", starred: true },
  { id: "gotta", term: "gotta", meaning: "have got to / have to → tengo que", example: "I gotta send a quick text.", translation: "Tengo que enviar un mensaje rápido." },
  { id: "get-to-work", term: "get to work", meaning: "llegar al trabajo", example: "I gotta get to work before eight.", translation: "Tengo que llegar al trabajo antes de las ocho.", starred: true },
  { id: "after-that", term: "after that", meaning: "después de eso", example: "After that, I need to grab coffee.", translation: "Después de eso, necesito tomar un café." },
  { id: "i-need-to", term: "I need to", meaning: "necesito / tengo que", example: "I need to run errands.", translation: "Necesito hacer mandados.", starred: true },
  { id: "run-errands", term: "run errands", meaning: "hacer mandados / hacer vueltas / hacer diligencias", example: "I need to run errands before work.", translation: "Necesito hacer mandados antes del trabajo.", starred: true },
  { id: "grab-coffee", term: "grab coffee", meaning: "tomar un café / ir por un café", example: "Let’s grab coffee after the meeting.", translation: "Tomemos un café después de la reunión.", starred: true },
  { id: "before-work", term: "before work", meaning: "antes del trabajo", example: "I need to grab coffee before work.", translation: "Necesito tomar un café antes del trabajo." },
  { id: "im-gonna", term: "I’m gonna", meaning: "voy a", example: "I’m gonna work from home today.", translation: "Voy a trabajar desde casa hoy.", starred: true },
  { id: "gonna", term: "gonna", meaning: "going to → voy a", example: "I’m gonna take a break.", translation: "Voy a tomar un descanso." },
  { id: "work-from-home", term: "work from home", meaning: "trabajar desde casa", example: "I’m gonna work from home tomorrow.", translation: "Voy a trabajar desde casa mañana.", starred: true },
  { id: "sounds-good", term: "sounds good", meaning: "suena bien / me parece bien / listo", example: "Sounds good, just send me a quick text.", translation: "Suena bien, solo mándame un mensajito rápido.", starred: true },
  { id: "no-worries", term: "No worries", meaning: "no pasa nada / tranquilo/a / todo bien", example: "No worries. Sounds good.", translation: "No pasa nada. Suena bien.", starred: true },
  { id: "im-running-late", term: "I’m running late", meaning: "voy tarde / se me está haciendo tarde", example: "I’m running late because traffic is a mess.", translation: "Voy tarde porque el tráfico está terrible.", starred: true },
  { id: "traffic-is-a-mess", term: "traffic is a mess", meaning: "el tráfico está terrible / el tráfico está hecho un desastre", example: "Traffic is a mess this morning.", translation: "El tráfico está terrible esta mañana.", starred: true },
  { id: "i-have-a-meeting", term: "I have a meeting", meaning: "tengo una reunión", example: "I have a meeting at eight.", translation: "Tengo una reunión a las ocho." },
  { id: "send-a-quick-text", term: "send a quick text", meaning: "enviar un mensaje rápido", example: "Can you send a quick text?", translation: "¿Puedes enviar un mensaje rápido?" },
  { id: "quick-text", term: "quick text", meaning: "mensajito rápido", example: "Just send me a quick text.", translation: "Solo mándame un mensajito rápido." },
  { id: "im-down", term: "I’m down", meaning: "me apunto / estoy dispuesto/a / de una", example: "I’m down if you want to grab coffee.", translation: "Me apunto si quieres tomar un café.", starred: true },
  { id: "im-down-to", term: "I’m down to…", meaning: "me apunto a… / estoy dispuesto/a a…", example: "I’m down to take a break.", translation: "Me apunto a tomar un descanso." },
  { id: "take-a-break", term: "take a break", meaning: "tomar un descanso / hacer una pausa", example: "Let’s take a break by the end of the day.", translation: "Tomemos un descanso para el final del día.", starred: true },
  { id: "im-wiped", term: "I’m wiped", meaning: "estoy agotado/a / estoy reventado/a / estoy fundido/a", example: "I’m wiped, but I’m down to take a break.", translation: "Estoy agotado, pero me apunto a tomar un descanso.", starred: true },
  { id: "by-the-end-of-the-day", term: "by the end of the day", meaning: "para el final del día / antes de que termine el día", example: "I’ll send it by the end of the day.", translation: "Lo mando para el final del día." },
  { id: "can-you-cover-me", term: "Can you cover me?", meaning: "¿Me puedes cubrir? / ¿Me puedes hacer el favor de cubrirme?", example: "Can you cover me? I have a meeting at eight.", translation: "¿Me puedes cubrir? Tengo una reunión a las ocho.", starred: true },
  { id: "thanks-a-lot", term: "thanks a lot", meaning: "muchas gracias / mil gracias", example: "Thanks a lot. I owe you one.", translation: "Muchas gracias. Te debo una." },
  { id: "just-send-me-a-quick-text", term: "Just send me a quick text", meaning: "Solo mándame un mensajito rápido", example: "Just send me a quick text when you get there.", translation: "Solo mándame un mensajito rápido cuando llegues.", starred: true },
  { id: "i-gotta-get-to-work", term: "I gotta get to work", meaning: "Tengo que llegar al trabajo", example: "I gotta get to work before the meeting.", translation: "Tengo que llegar al trabajo antes de la reunión.", starred: true },
  { id: "i-need-to-run-errands", term: "I need to run errands", meaning: "Necesito hacer mandados", example: "I need to run errands after that.", translation: "Necesito hacer mandados después de eso.", starred: true },
  { id: "after-that-grab-coffee", term: "After that, I need to grab coffee", meaning: "Después de eso, necesito tomar un café", example: "After that, I need to grab coffee before work.", translation: "Después de eso, necesito tomar un café antes del trabajo." },
  { id: "im-gonna-work-from-home", term: "I’m gonna work from home", meaning: "Voy a trabajar desde casa", example: "I’m gonna work from home by the end of the day.", translation: "Voy a trabajar desde casa para el final del día.", starred: true },
  { id: "running-late-traffic-mess", term: "I’m running late because traffic is a mess", meaning: "Voy tarde porque el tráfico está terrible", example: "I’m running late because traffic is a mess, but I’ll send a quick text.", translation: "Voy tarde porque el tráfico está terrible, pero mandaré un mensaje rápido.", starred: true },
  { id: "no-worries-sounds-good", term: "No worries. Sounds good.", meaning: "No pasa nada. Suena bien. / Tranquilo, listo.", example: "No worries. Sounds good. Thanks a lot.", translation: "No pasa nada. Suena bien. Muchas gracias.", starred: true },
  { id: "wiped-down-break", term: "I’m wiped, but I’m down to take a break", meaning: "Estoy agotado/a, pero me apunto a tomar un descanso", example: "I’m wiped, but I’m down to take a break before the last call.", translation: "Estoy agotado, pero me apunto a tomar un descanso antes de la última llamada.", starred: true },
  { id: "cover-me-meeting-eight", term: "Can you cover me? I have a meeting at eight.", meaning: "¿Me puedes cubrir? Tengo una reunión a las ocho.", example: "Can you cover me? I have a meeting at eight.", translation: "¿Me puedes cubrir? Tengo una reunión a las ocho.", starred: true },
];

const highlightMap = Object.fromEntries(workRoutineVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.example }]));

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
    languageFrom: "english",
    languageTo: "spanish",
    difficulty: item.starred ? "hard" : "medium",
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

function guide(word: string, translation: string, source: string, target: string, note?: string) {
  return {
    word,
    translation,
    exampleSentences: [{ source, translation: target }],
    note,
  };
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
  vocabGuide: NonNullable<SentenceStage["vocabGuide"]> = [],
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
    vocabGuide,
  };
}

export const americanEnglishB1WorkRoutineFlashcardDeck: FlashcardDeck = {
  id: "american-english-b1-work-daily-routine-flashcards",
  title: "American English B1: Work & Daily Routine Flashcards",
  subtitle: "Natural spoken chunks for work mornings, errands, coffee, lateness, meetings, and quick favors.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "intermediate",
  tags: ["American English", "B1", "work", "daily routine", "speaking lesson reinforcement"],
  estimatedMinutes: 14,
  skoolSectionName: "American English - B1 Sentence Builder Reinforcement",
  relatedCourse: "american-english-b1-work-daily-routine",
  activityType: "flashcards",
  data: {
    cards: workRoutineVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "Hey, real quick = Oye, rapidito",
  "I gotta = Tengo que",
  "get to work = llegar al trabajo",
  "after that = después de eso",
  "I need to = necesito",
  "run errands = hacer mandados",
  "grab coffee = tomar un café",
  "before work = antes del trabajo",
  "I’m gonna = voy a",
  "work from home = trabajar desde casa",
  "sounds good = suena bien",
  "No worries = no pasa nada",
  "I’m running late = voy tarde",
  "traffic is a mess = el tráfico está terrible",
  "I have a meeting = tengo una reunión",
  "send a quick text = enviar un mensaje rápido",
  "I’m down to = me apunto a",
  "take a break = tomar un descanso",
  "I’m wiped = estoy agotado",
  "by the end of the day = para el final del día",
  "Can you cover me? = ¿Me puedes cubrir?",
  "thanks a lot = muchas gracias",
];

export const americanEnglishB1WorkRoutineSentenceBuilder: SentenceBuilderLesson = {
  id: "american-english-b1-work-daily-routine-sentence-builder",
  title: "B1 Sentence Builder: American Work & Daily Routine",
  subtitle: "Construye frases habladas naturales sobre trabajo, mandados, café, tráfico, reuniones y descansos.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "intermediate",
  tags: ["american-english", "b1", "sentence-builder", "work", "daily-routine"],
  estimatedMinutes: 16,
  skoolSectionName: "American English - B1 Sentence Builder Reinforcement",
  relatedCourse: "american-english-b1-work-daily-routine-flashcards",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Reto final: di o escribe 5 frases sobre tu mañana de trabajo usando I gotta, I’m gonna, run errands, traffic is a mess, I’m wiped y Can you cover me?",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Tengo que llegar al trabajo",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "Tengo que llegar al trabajo.",
        "I gotta get to work.",
        "Gotta es una forma hablada y casual de have to. En conversaciones normales suena natural, pero en escritura formal usa have to.",
        breakdown([["Tengo que", "I gotta"], ["llegar al trabajo", "get to work"]]),
        ["Empieza con I gotta.", "Get to work significa llegar al trabajo."],
        ["I have to get to work."],
        [
          guide("I gotta", "Tengo que", "I gotta go.", "Tengo que irme.", "Muy hablado/casual."),
          guide("get to work", "llegar al trabajo", "I get to work at eight.", "Llego al trabajo a las ocho."),
        ],
      ),
      stage(
        "stage-2",
        "Stage 2: Después de eso necesito hacer mandados",
        sentenceVocab.slice(3, 6),
        sentenceVocab.slice(0, 6),
        "Después de eso, necesito hacer mandados.",
        "After that, I need to run errands.",
        "Run errands significa hacer mandados o vueltas. After that conecta los pasos de tu rutina.",
        breakdown([["Después de eso", "After that"], ["necesito", "I need to"], ["hacer mandados", "run errands"]]),
        ["After that va al principio.", "Necesito hacer = I need to + verbo."],
      ),
      stage(
        "stage-3",
        "Stage 3: Café antes del trabajo",
        sentenceVocab.slice(6, 8),
        sentenceVocab.slice(0, 8),
        "Después de eso, necesito tomar un café antes del trabajo.",
        "After that, I need to grab coffee before work.",
        "Grab coffee es más natural y conversacional que drink a coffee cuando hablas de ir por café.",
        breakdown([["Después de eso", "After that"], ["necesito tomar un café", "I need to grab coffee"], ["antes del trabajo", "before work"]]),
        ["Usa grab coffee.", "Before work va al final."],
      ),
      stage(
        "stage-4",
        "Stage 4: Voy a trabajar desde casa",
        sentenceVocab.slice(8, 10),
        sentenceVocab.slice(0, 10),
        "Voy a trabajar desde casa.",
        "I’m gonna work from home.",
        "Gonna es la reducción hablada de going to. Para B1 es muy útil porque aparece todo el tiempo en inglés americano.",
        breakdown([["Voy a", "I’m gonna"], ["trabajar desde casa", "work from home"]]),
        ["I’m gonna = voy a.", "Work from home queda junto."],
        ["I am going to work from home."],
      ),
      stage(
        "stage-5",
        "Stage 5: Tráfico y llegar tarde",
        sentenceVocab.slice(10, 14),
        sentenceVocab.slice(0, 14),
        "Voy tarde porque el tráfico está terrible.",
        "I’m running late because traffic is a mess.",
        "I’m running late es una frase fija para decir que vas tarde. Traffic is a mess suena muy natural en Estados Unidos.",
        breakdown([["Voy tarde", "I’m running late"], ["porque", "because"], ["el tráfico está terrible", "traffic is a mess"]]),
        ["No digas I am late si todavía vas en camino: I’m running late.", "Traffic is a mess = el tráfico está terrible."],
      ),
      stage(
        "stage-6",
        "Stage 6: Mensajito rápido",
        sentenceVocab.slice(14, 16),
        sentenceVocab.slice(0, 16),
        "No pasa nada. Suena bien. Solo mándame un mensajito rápido.",
        "No worries. Sounds good. Just send me a quick text.",
        "No worries y sounds good son respuestas cortas muy americanas. Quick text es un mensajito rápido.",
        breakdown([["No pasa nada", "No worries"], ["Suena bien", "Sounds good"], ["Solo mándame", "Just send me"], ["un mensajito rápido", "a quick text"]]),
        ["No worries va con s.", "Text también puede ser sustantivo: a quick text."],
      ),
      stage(
        "stage-7",
        "Stage 7: Descanso al final del día",
        sentenceVocab.slice(16, 20),
        sentenceVocab.slice(0, 20),
        "Estoy agotado, pero me apunto a tomar un descanso para el final del día.",
        "I’m wiped, but I’m down to take a break by the end of the day.",
        "I’m wiped es informal para estar agotado. I’m down to significa me apunto a o estoy dispuesto a.",
        breakdown([["Estoy agotado", "I’m wiped"], ["pero me apunto a", "but I’m down to"], ["tomar un descanso", "take a break"], ["para el final del día", "by the end of the day"]]),
        ["I’m down to + verbo.", "By the end of the day = para antes de terminar el día."],
      ),
      stage(
        "stage-8",
        "Stage 8: Cubrir una reunión",
        sentenceVocab.slice(20, 22),
        sentenceVocab,
        "¿Me puedes cubrir? Tengo una reunión a las ocho. Muchas gracias.",
        "Can you cover me? I have a meeting at eight. Thanks a lot.",
        "Can you cover me? sirve cuando necesitas que alguien te cubra un turno, una tarea o una responsabilidad.",
        breakdown([["¿Me puedes cubrir?", "Can you cover me?"], ["Tengo una reunión", "I have a meeting"], ["a las ocho", "at eight"], ["Muchas gracias", "Thanks a lot"]]),
        ["Cover me = cubrirme.", "At eight = a las ocho."],
      ),
      stage(
        "stage-9",
        "Stage 9: Rutina completa",
        [],
        sentenceVocab,
        "Oye, rapidito: tengo que llegar al trabajo antes del trabajo, después necesito hacer mandados y tomar un café, y voy a trabajar desde casa para el final del día.",
        "Hey, real quick: I gotta get to work before work, after that I need to run errands and grab coffee, and I’m gonna work from home by the end of the day.",
        "Esta frase combina casi toda la rutina. Suena como una nota de voz real, no como una frase de libro.",
        breakdown([
          ["Oye, rapidito", "Hey, real quick"],
          ["tengo que llegar al trabajo", "I gotta get to work"],
          ["antes del trabajo", "before work"],
          ["después de eso necesito", "after that I need to"],
          ["hacer mandados y tomar un café", "run errands and grab coffee"],
          ["voy a trabajar desde casa", "I’m gonna work from home"],
          ["para el final del día", "by the end of the day"],
        ]),
        ["Construye por bloques.", "No traduzcas palabra por palabra: usa chunks."],
      ),
      stage(
        "stage-10",
        "Stage 10: Día complicado",
        [],
        sentenceVocab,
        "Voy tarde porque el tráfico está terrible, tengo una reunión a las ocho, ¿me puedes cubrir? Solo mándame un mensajito rápido.",
        "I’m running late because traffic is a mess, I have a meeting at eight, can you cover me? Just send me a quick text.",
        "Este es el tipo de mensaje real que alguien mandaría por WhatsApp o Slack cuando va tarde.",
        breakdown([
          ["Voy tarde porque", "I’m running late because"],
          ["el tráfico está terrible", "traffic is a mess"],
          ["tengo una reunión a las ocho", "I have a meeting at eight"],
          ["¿me puedes cubrir?", "can you cover me?"],
          ["solo mándame un mensajito rápido", "Just send me a quick text"],
        ]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/american-english-b1-work-daily-routine/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "american-b1-work-story-q1",
    type: "multiple-choice",
    prompt: "Why is Maya texting Jordan?",
    options: ["She is running late because traffic is a mess", "She lost her coffee", "She is quitting her job", "She forgot her name"],
    correctAnswer: "She is running late because traffic is a mess",
    explanation: "Maya says: I’m running late because traffic is a mess.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "american-b1-work-story-q2",
    type: "typed",
    prompt: "Type the phrase meaning '¿Me puedes cubrir?'",
    correctAnswer: "Can you cover me?",
    correctAnswers: ["Can you cover me?", "can you cover me"],
    explanation: "Can you cover me? asks someone to cover your task, shift, or responsibility.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "american-b1-work-story-q3",
    type: "multiple-choice",
    prompt: "What does Jordan say to show the plan is okay?",
    options: ["No worries. Sounds good.", "Traffic is a mess", "I have a meeting", "I’m wiped"],
    correctAnswer: "No worries. Sounds good.",
    explanation: "No worries and sounds good are natural short replies.",
    points: 1,
    skillTag: "phrases",
  },
  {
    id: "american-b1-work-story-q4",
    type: "multiple-choice",
    prompt: "What does Maya want to do after work?",
    options: ["Take a break", "Start another meeting", "Drive in traffic again", "Cancel coffee forever"],
    correctAnswer: "Take a break",
    explanation: "She says she is wiped but down to take a break.",
    points: 1,
    skillTag: "gist",
  },
];

export const americanEnglishB1WorkRoutineWhatsAppStory: WhatsAppStory = {
  id: "american-english-b1-work-daily-routine",
  title: "American B1 Story: Running Late Before Work",
  subtitle: "A workday text-message story with errands, coffee, traffic, meetings, and quick favors.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "intermediate",
  tags: ["American English", "B1", "WhatsApp", "work", "daily routine"],
  estimatedMinutes: 18,
  skoolSectionName: "American English - B1 Sentence Builder Reinforcement",
  relatedCourse: "american-english-b1-work-daily-routine-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "english",
    nativeLanguage: "spanish",
    characters: [
      { id: "maya", name: "Maya", initials: "M", side: "right", color: "blue" },
      { id: "jordan", name: "Jordan", initials: "J", side: "left", color: "green" },
      { id: "nina", name: "Nina", initials: "N", side: "left", color: "violet" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: this chat reinforces B1 American workday chunks from the speaking sentence-builder lesson.", "Guía: este chat refuerza chunks B1 de rutina laboral americana del speaking sentence-builder.", [], "narrator"),
      message("m1", "maya", "Hey, real quick, I gotta get to work early today.", "Oye, rapidito, tengo que llegar temprano al trabajo hoy.", ["Hey, real quick", "I gotta", "gotta", "I gotta get to work", "get to work"], "voice-note", "/audio/stories/american-english-b1-work-daily-routine/m1.mp3"),
      message("m2", "jordan", "No worries. What’s the plan?", "No pasa nada. ¿Cuál es el plan?", ["No worries"]),
      message("m3", "maya", "After that, I need to run errands and grab coffee before work.", "Después de eso, necesito hacer mandados y tomar un café antes del trabajo.", ["after that", "I need to", "I need to run errands", "run errands", "grab coffee", "before work"]),
      message("m4", "nina", "That is a full morning already.", "Eso ya es toda una mañana.", []),
      message("m5", "maya", "I’m gonna work from home by the end of the day if my meeting finishes on time.", "Voy a trabajar desde casa para el final del día si mi reunión termina a tiempo.", ["I’m gonna", "gonna", "I’m gonna work from home", "work from home", "by the end of the day"], "voice-note", "/audio/stories/american-english-b1-work-daily-routine/m5.mp3"),
      message("m6", "jordan", "Sounds good. Just send me a quick text if anything changes.", "Suena bien. Solo mándame un mensajito rápido si algo cambia.", ["sounds good", "Just send me a quick text", "send a quick text", "quick text"]),
      message("m7", "maya", "Actually, I’m running late because traffic is a mess.", "De hecho, voy tarde porque el tráfico está terrible.", ["I’m running late", "traffic is a mess", "I’m running late because traffic is a mess"]),
      message("m8", "maya", "Can you cover me? I have a meeting at eight.", "¿Me puedes cubrir? Tengo una reunión a las ocho.", ["Can you cover me?", "I have a meeting", "Can you cover me? I have a meeting at eight."], "voice-note", "/audio/stories/american-english-b1-work-daily-routine/m8.mp3"),
      message("m9", "jordan", "Yeah, I’m down. No worries. Sounds good.", "Sí, me apunto. No pasa nada. Suena bien.", ["I’m down", "No worries", "No worries. Sounds good.", "sounds good"]),
      message("m10", "maya", "Thanks a lot. I’ll send a quick text when I park.", "Muchas gracias. Enviaré un mensaje rápido cuando estacione.", ["thanks a lot", "send a quick text"]),
      message("m11", "nina", "By the end of the day, you’re going to be tired.", "Para el final del día, vas a estar cansada.", ["by the end of the day"]),
      message("m12", "maya", "I’m wiped, but I’m down to take a break later.", "Estoy agotada, pero me apunto a tomar un descanso más tarde.", ["I’m wiped", "I’m down to…", "take a break", "I’m wiped, but I’m down to take a break"], "voice-note", "/audio/stories/american-english-b1-work-daily-routine/m12.mp3"),
      message("m13", "jordan", "Same. I’m down to grab coffee after the last meeting.", "Igual. Me apunto a tomar un café después de la última reunión.", ["I’m down to…", "grab coffee"]),
      message("m14", "maya", "Perfect. No worries if you can’t. Just send me a quick text.", "Perfecto. No pasa nada si no puedes. Solo mándame un mensajito rápido.", ["No worries", "Just send me a quick text", "quick text"]),
    ],
    comprehensionChecks: [
      { id: "american-b1-work-check-1", afterMessageId: "m7", question: storyQuestions[0] },
      { id: "american-b1-work-check-2", afterMessageId: "m8", question: storyQuestions[1] },
      { id: "american-b1-work-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "american-b1-work-check-4", afterMessageId: "m12", question: storyQuestions[3] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: workRoutineVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: workRoutineVocab.map((item) => item.term),
      grammarPatterns: ["Casual reductions: gotta and gonna.", "Need to + verb: I need to run errands.", "Going late: I’m running late because...", "Quick favors: Can you cover me?"],
      speakingPrompts: ["Describe your work morning.", "Ask someone to cover you.", "Explain why you are running late.", "Suggest coffee or a break."],
    },
    completionTask: {
      title: "Your workday voice note",
      instructions: "Record a 60-second voice note about your workday using at least 10 phrases from this story.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Hey, real quick, I gotta get to work early today. My morning is simple, but busy. First, I gotta get to work. After that, I need to run errands. I also need to grab coffee before work because I have a long day.",
    translation:
      "Oye, rapidito, tengo que llegar temprano al trabajo hoy. Mi mañana es simple, pero ocupada. Primero, tengo que llegar al trabajo. Después de eso, necesito hacer mandados. También necesito tomar un café antes del trabajo porque tengo un día largo.",
    highlights: highlights(["Hey, real quick", "I gotta", "gotta", "I gotta get to work", "get to work", "after that", "I need to", "I need to run errands", "run errands", "grab coffee", "before work"]),
    shadowLine: "I gotta get to work.",
  },
  {
    id: "p2",
    text:
      "My coworker Jordan texts me: Sounds good. Just send me a quick text if anything changes. A quick text is easier than a long call in the morning. I say, No worries, I’m gonna work from home by the end of the day.",
    translation:
      "Mi compañero Jordan me escribe: Suena bien. Solo mándame un mensajito rápido si algo cambia. Un mensajito rápido es más fácil que una llamada larga por la mañana. Digo: No pasa nada, voy a trabajar desde casa para el final del día.",
    highlights: highlights(["sounds good", "Just send me a quick text", "send a quick text", "quick text", "No worries", "I’m gonna", "gonna", "I’m gonna work from home", "work from home", "by the end of the day"]),
    shadowLine: "Just send me a quick text.",
  },
  {
    id: "p3",
    text:
      "Then the morning changes. I’m running late because traffic is a mess. I have a meeting at eight, so I text Jordan: Can you cover me? I have a meeting at eight. He says he is down to help.",
    translation:
      "Luego la mañana cambia. Voy tarde porque el tráfico está terrible. Tengo una reunión a las ocho, así que le escribo a Jordan: ¿Me puedes cubrir? Tengo una reunión a las ocho. Él dice que se apunta a ayudar.",
    highlights: highlights(["I’m running late", "traffic is a mess", "I’m running late because traffic is a mess", "I have a meeting", "Can you cover me?", "Can you cover me? I have a meeting at eight.", "I’m down"]),
    shadowLine: "I’m running late because traffic is a mess.",
  },
  {
    id: "p4",
    text:
      "By lunch, I’m wiped. I tell Nina, I’m wiped, but I’m down to take a break. She laughs and says, No worries. Sounds good. We can grab coffee after that. I say, thanks a lot, because honestly, I need the break.",
    translation:
      "Para el almuerzo, estoy agotada. Le digo a Nina: Estoy agotada, pero me apunto a tomar un descanso. Ella se ríe y dice: No pasa nada. Suena bien. Podemos tomar un café después de eso. Digo muchas gracias porque, sinceramente, necesito el descanso.",
    highlights: highlights(["I’m wiped", "I’m down to…", "take a break", "I’m wiped, but I’m down to take a break", "No worries. Sounds good.", "grab coffee", "after that", "thanks a lot"]),
    shadowLine: "I’m wiped, but I’m down to take a break.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "american-b1-work-reading-q1",
    type: "multiple-choice",
    prompt: "Why does the speaker need Jordan’s help?",
    options: ["She is running late and has a meeting", "She wants to quit", "She lost her coffee", "She forgot how to text"],
    correctAnswer: "She is running late and has a meeting",
    explanation: "The speaker says she is running late because traffic is a mess and has a meeting at eight.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "american-b1-work-reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'Estoy agotado/a'.",
    correctAnswer: "I’m wiped",
    correctAnswers: ["I’m wiped", "I'm wiped", "im wiped"],
    explanation: "I’m wiped is a casual American phrase for being exhausted.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "american-b1-work-reading-q3",
    type: "multiple-choice",
    prompt: "What does 'grab coffee' mean?",
    options: ["Tomar un café / ir por un café", "Cubrir una reunión", "Llegar tarde", "Trabajar desde casa"],
    correctAnswer: "Tomar un café / ir por un café",
    explanation: "Grab coffee is a natural casual way to say go get coffee.",
    points: 1,
    skillTag: "phrase",
  },
  {
    id: "american-b1-work-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the sentence.",
    wordBank: ["I’m", "running", "late", "because", "traffic", "is", "a", "mess"],
    correctAnswer: "I’m running late because traffic is a mess",
    explanation: "This is the full phrase from the speaking lesson.",
    points: 1,
    skillTag: "sentence-order",
  },
];

export const americanEnglishB1WorkRoutineReading: ReadingComprehension = {
  id: "american-english-b1-reading-work-daily-routine",
  title: "American B1 Reading: A Busy Work Morning",
  subtitle: "A short first-person reading using every work and routine phrase from the sentence-builder speaking lesson.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "intermediate",
  tags: ["American English", "B1", "reading", "work", "daily routine"],
  estimatedMinutes: 12,
  skoolSectionName: "American English - B1 Sentence Builder Reinforcement",
  relatedCourse: "american-english-b1-work-daily-routine",
  activityType: "reading",
  data: {
    targetLanguage: "english",
    audioUrl: "/audio/readings/american-english-b1-reading-work-daily-routine/full.mp3",
    audioAlignmentUrl: "/audio/readings/american-english-b1-reading-work-daily-routine/timings.json",
    paragraphs: readingParagraphs,
    glossary: workRoutineVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the B1 American English work and daily routine speaking lesson.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

export const americanEnglishB1WorkRoutineQuiz: CheckpointQuiz = {
  id: "american-english-b1-work-daily-routine-quiz",
  title: "American English B1: Work & Daily Routine Quiz",
  subtitle: "Check the key chunks for work mornings, errands, traffic, meetings, coffee, and quick favors.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "intermediate",
  tags: ["American English", "B1", "quiz", "work", "daily routine"],
  estimatedMinutes: 15,
  skoolSectionName: "American English - B1 Sentence Builder Reinforcement",
  relatedCourse: "american-english-b1-work-daily-routine",
  activityType: "quiz",
  data: {
    description: "Practice the B1 American English chunks from the speaking sentence-builder lesson.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "american-b1-work-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase means 'voy tarde'?",
        options: ["I’m running late", "I’m wiped", "I’m down", "sounds good"],
        correctAnswer: "I’m running late",
        explanation: "I’m running late means you are late or becoming late.",
        points: 1,
        skillTag: "vocabulary",
      },
      {
        id: "american-b1-work-quiz-2",
        type: "fill-blank",
        prompt: "Complete: I gotta get to ____.",
        correctAnswer: "work",
        explanation: "I gotta get to work means tengo que llegar al trabajo.",
        points: 1,
        skillTag: "chunk",
      },
      {
        id: "american-b1-work-quiz-3",
        type: "typed",
        prompt: "Type the phrase meaning '¿Me puedes cubrir?'",
        correctAnswer: "Can you cover me?",
        correctAnswers: ["Can you cover me?", "can you cover me"],
        explanation: "This asks someone to cover you for a task, meeting, or responsibility.",
        points: 1,
        skillTag: "work-phrase",
      },
      {
        id: "american-b1-work-quiz-4",
        type: "order-words",
        prompt: "Order the words.",
        wordBank: ["No", "worries.", "Sounds", "good."],
        correctAnswer: "No worries. Sounds good.",
        explanation: "This is a natural short reply in American English.",
        points: 1,
        skillTag: "sentence-order",
      },
      pairQuestion("american-b1-work-pairs-1", "Match workday phrases set 1.", workRoutineVocab.slice(0, 9)),
      pairQuestion("american-b1-work-pairs-2", "Match workday phrases set 2.", workRoutineVocab.slice(9, 18)),
      pairQuestion("american-b1-work-pairs-3", "Match workday phrases set 3.", workRoutineVocab.slice(18, 27)),
      pairQuestion("american-b1-work-pairs-4", "Match workday phrases set 4.", workRoutineVocab.slice(27)),
    ],
  },
};
