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
  note?: string;
  starred?: boolean;
};

const diplomaticVocab: VocabItem[] = [
  { id: "hey-quick-thought", term: "Hey, quick thought.", meaning: "Oye, una idea rápida. / Oye, un comentario rápido.", example: "Hey, quick thought. Could we maybe test this first?", translation: "Oye, una idea rápida. ¿Podríamos quizá probar esto primero?", starred: true },
  { id: "i-hear-you", term: "I hear you.", meaning: "Te entiendo. / Te escucho.", example: "I hear you. That deadline matters.", translation: "Te entiendo. Esa fecha límite importa.", starred: true },
  { id: "fair-point", term: "Fair point.", meaning: "Buen punto. / Tienes razón en eso.", example: "Fair point. The client does want speed.", translation: "Buen punto. El cliente sí quiere rapidez.", starred: true },
  { id: "that-said", term: "That said.", meaning: "Dicho eso. / Aun así.", example: "That said, I'm not totally sold.", translation: "Dicho eso, no estoy del todo convencido.", starred: true },
  { id: "not-totally-sold", term: "I'm not totally sold.", meaning: "No estoy del todo convencido.", example: "I'm not totally sold on this plan yet.", translation: "Todavía no estoy del todo convencido con este plan.", starred: true },
  { id: "see-where-coming-from", term: "I see where you're coming from.", meaning: "Entiendo de dónde vienes. / Entiendo tu punto de vista.", example: "I see where you're coming from, but the risk still feels high.", translation: "Entiendo tu punto de vista, pero el riesgo todavía se siente alto.", starred: true },
  { id: "get-the-concern", term: "I get the concern.", meaning: "Entiendo la preocupación.", example: "I get the concern about moving too slowly.", translation: "Entiendo la preocupación de avanzar demasiado lento.", starred: true },
  { id: "could-we-maybe", term: "Could we maybe...?", meaning: "¿Podríamos quizá...? / ¿Qué tal si...?", example: "Could we maybe test it with a smaller group first?", translation: "¿Podríamos quizá probarlo primero con un grupo más pequeño?", starred: true },
  { id: "same-page", term: "We're on the same page.", meaning: "Estamos en la misma página. / Estamos de acuerdo en lo básico.", example: "We're on the same page about the goal.", translation: "Estamos de acuerdo en lo básico sobre el objetivo.", starred: true },
  { id: "honestly", term: "Honestly.", meaning: "Sinceramente. / La verdad.", example: "Honestly, I don't wanna rush this.", translation: "Sinceramente, no quiero apresurar esto.", starred: true },
  { id: "not-best-move", term: "I'm not sure that's the best move.", meaning: "No estoy seguro de que sea la mejor decisión.", example: "I'm not sure that's the best move for launch day.", translation: "No estoy seguro de que esa sea la mejor decisión para el día del lanzamiento.", starred: true },
  { id: "little-bit-stretch", term: "That's a little bit of a stretch.", meaning: "Eso es un poco exagerado. / Eso suena algo forzado.", example: "Saying this will double sales is a little bit of a stretch.", translation: "Decir que esto duplicará las ventas es un poco exagerado.", starred: true },
  { id: "not-overcomplicate", term: "Let's not overcomplicate it.", meaning: "No compliquemos demasiado esto.", example: "Let's not overcomplicate it with five extra steps.", translation: "No compliquemos demasiado esto con cinco pasos extra.", starred: true },
  { id: "take-step-back", term: "Can we take a step back?", meaning: "¿Podemos tomar distancia un momento? / ¿Podemos verlo con más calma?", example: "Can we take a step back before we decide?", translation: "¿Podemos verlo con más calma antes de decidir?", starred: true },
  { id: "dont-wanna-push-back", term: "I don't wanna push back just to push back.", meaning: "No quiero discrepar solo por discrepar.", example: "I don't wanna push back just to push back, but I do see a risk.", translation: "No quiero discrepar solo por discrepar, pero sí veo un riesgo.", starred: true },
  { id: "push-back", term: "Push back", meaning: "Cuestionar / oponerse / discrepar", example: "It's okay to push back if the idea needs work.", translation: "Está bien cuestionar si la idea necesita trabajo." },
  { id: "thats-on-me", term: "That's on me if I missed something.", meaning: "Es culpa mía si se me escapó algo.", example: "That's on me if I missed something in the numbers.", translation: "Es culpa mía si se me escapó algo en los números.", starred: true },
  { id: "pressure-test", term: "Let's pressure-test it.", meaning: "Pongámoslo a prueba. / Probemos si la idea aguanta.", example: "Let's pressure-test it before we pitch it.", translation: "Pongámoslo a prueba antes de presentarlo.", starred: true },
  { id: "before-we-decide", term: "Before we decide.", meaning: "Antes de decidir.", example: "Before we decide, let's pressure-test both options.", translation: "Antes de decidir, probemos ambas opciones.", starred: true },
  { id: "for-what-its-worth", term: "For what it's worth.", meaning: "Por lo que vale. / Por si sirve de algo.", example: "For what it's worth, I think the smaller test is safer.", translation: "Por si sirve de algo, creo que la prueba más pequeña es más segura.", starred: true },
  { id: "happy-to-be-wrong", term: "I'm happy to be wrong.", meaning: "Acepto estar equivocado. / No tengo problema en estar equivocado.", example: "I'm happy to be wrong if the data says otherwise.", translation: "Acepto estar equivocado si los datos dicen otra cosa.", starred: true },
  { id: "not-trying-difficult", term: "I'm not trying to be difficult.", meaning: "No estoy intentando ser difícil. / No quiero poner problemas.", example: "I'm not trying to be difficult; I just want us to lower the risk.", translation: "No quiero poner problemas; solo quiero que bajemos el riesgo.", starred: true },
  { id: "meet-middle", term: "Can we meet in the middle?", meaning: "¿Podemos llegar a un punto medio?", example: "Can we meet in the middle and test one smaller group?", translation: "¿Podemos llegar a un punto medio y probar con un grupo más pequeño?", starred: true },
  { id: "meet-in-middle", term: "Meet in the middle", meaning: "Llegar a un acuerdo intermedio", example: "The goal is to meet in the middle, not win the argument.", translation: "El objetivo es llegar a un punto medio, no ganar la discusión." },
  { id: "call-it-a-day", term: "Let's call it a day.", meaning: "Dejémoslo por hoy. / Cerremos por hoy.", example: "We made a decision. Let's call it a day.", translation: "Tomamos una decisión. Cerremos por hoy.", starred: true },
  { id: "no-worries", term: "No worries.", meaning: "Tranquilo. / No pasa nada.", example: "No worries. I know you're trying to protect the timeline.", translation: "No pasa nada. Sé que intentas proteger el cronograma.", starred: true },
  { id: "totally-fair", term: "Totally fair.", meaning: "Totalmente válido. / Muy justo.", example: "Totally fair. Speed does matter here.", translation: "Totalmente válido. La rapidez sí importa aquí.", starred: true },
  { id: "rush-this", term: "Rush this", meaning: "Apresurar esto", example: "If we rush this, we may miss the risk.", translation: "Si apresuramos esto, podemos pasar por alto el riesgo." },
  { id: "dont-wanna-rush", term: "I don't wanna rush this.", meaning: "No quiero apresurar esto.", example: "I don't wanna rush this before we test it.", translation: "No quiero apresurar esto antes de probarlo.", starred: true },
  { id: "try-another-option", term: "Try another option", meaning: "Probar otra opción", example: "Could we try another option with less risk?", translation: "¿Podríamos probar otra opción con menos riesgo?" },
  { id: "lower-risk", term: "Lower the risk a bit", meaning: "Bajar un poco el riesgo", example: "Testing first would lower the risk a bit.", translation: "Probar primero bajaría un poco el riesgo.", starred: true },
  { id: "rushing-this", term: "Rushing this", meaning: "Apresurar esto", example: "Rushing this could make the launch messy.", translation: "Apresurar esto podría volver desordenado el lanzamiento." },
  { id: "smaller-group", term: "Test it with a smaller group first", meaning: "Probarlo primero con un grupo más pequeño", example: "Let's test it with a smaller group first.", translation: "Probémoslo primero con un grupo más pequeño.", starred: true },
  { id: "traffic-brutal", term: "Traffic was brutal.", meaning: "El tráfico estuvo brutal / terrible.", example: "Sorry I'm late. Traffic was brutal.", translation: "Perdón por llegar tarde. El tráfico estuvo brutal." },
  { id: "best-move", term: "The best move", meaning: "La mejor decisión / la mejor jugada", example: "I'm not sure that's the best move.", translation: "No estoy seguro de que esa sea la mejor decisión." },
  { id: "quick-thought", term: "A quick thought", meaning: "Una idea rápida / un comentario breve", example: "A quick thought: can we test this first?", translation: "Una idea rápida: ¿podemos probar esto primero?" },
  { id: "sold-on-plan", term: "Sold on this plan", meaning: "Convencido con este plan", example: "I'm not sold on this plan yet.", translation: "Todavía no estoy convencido con este plan." },
  { id: "not-sold-plan", term: "Not totally sold on this plan", meaning: "No del todo convencido con este plan", example: "I'm not totally sold on this plan.", translation: "No estoy del todo convencido con este plan." },
  { id: "pressure-test-both", term: "Pressure-test both options", meaning: "Probar ambas opciones para ver cuál aguanta mejor", example: "Let's pressure-test both options before we decide.", translation: "Probemos ambas opciones antes de decidir.", starred: true },
  { id: "keep-rapport", term: "Keep rapport", meaning: "Mantener buena relación / mantener buena vibra", example: "Diplomatic disagreement helps you keep rapport.", translation: "El desacuerdo diplomático te ayuda a mantener buena relación.", starred: true },
  { id: "soften-criticism", term: "Soften criticism", meaning: "Suavizar una crítica", example: "Use 'I hear you' to soften criticism.", translation: "Usa 'te entiendo' para suavizar una crítica.", starred: true },
  { id: "challenge-ideas", term: "Challenge ideas", meaning: "Cuestionar ideas", example: "You can challenge ideas without attacking people.", translation: "Puedes cuestionar ideas sin atacar a las personas.", starred: true },
  { id: "diplomatic-disagreement", term: "Diplomatic disagreement", meaning: "Desacuerdo diplomático", example: "Diplomatic disagreement protects the relationship and the decision.", translation: "El desacuerdo diplomático protege la relación y la decisión.", starred: true },
];

const highlightMap = Object.fromEntries(diplomaticVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.example }]));

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

export const americanEnglishC1DiplomaticDisagreementFlashcardDeck: FlashcardDeck = {
  id: "american-english-c1-diplomatic-disagreement-flashcards",
  title: "American English C1: Diplomatic Disagreement Flashcards",
  subtitle: "Advanced phrases for pushing back, softening criticism, pressure-testing ideas, and keeping rapport.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "diplomatic disagreement", "workplace", "speaking lesson reinforcement"],
  estimatedMinutes: 18,
  skoolSectionName: "American English - C1 Diplomatic Disagreement",
  relatedCourse: "american-english-c1-diplomatic-disagreement",
  activityType: "flashcards",
  data: {
    cards: diplomaticVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "Hey, quick thought = Oye, una idea rápida",
  "I hear you = Te entiendo",
  "Fair point = Buen punto",
  "That said = Dicho eso",
  "I'm not totally sold = No estoy del todo convencido",
  "I see where you're coming from = Entiendo tu punto de vista",
  "Could we maybe...? = ¿Podríamos quizá...?",
  "Can we take a step back? = ¿Podemos verlo con más calma?",
  "I don't wanna push back just to push back = No quiero discrepar solo por discrepar",
  "Let's pressure-test it = Pongámoslo a prueba",
  "I'm happy to be wrong = Acepto estar equivocado",
  "Can we meet in the middle? = ¿Podemos llegar a un punto medio?",
  "I don't wanna rush this = No quiero apresurar esto",
  "Lower the risk a bit = Bajar un poco el riesgo",
  "Test it with a smaller group first = Probarlo primero con un grupo más pequeño",
  "Let's call it a day = Cerremos por hoy",
];

export const americanEnglishC1DiplomaticDisagreementSentenceBuilder: SentenceBuilderLesson = {
  id: "american-english-c1-diplomatic-disagreement-sentence-builder",
  title: "C1 Sentence Builder: Diplomatic Disagreement",
  subtitle: "Build high-level disagreement sentences that validate, soften, challenge, and propose a compromise.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["american-english", "c1", "sentence-builder", "disagreement", "diplomacy"],
  estimatedMinutes: 16,
  skoolSectionName: "American English - C1 Diplomatic Disagreement",
  relatedCourse: "american-english-c1-diplomatic-disagreement",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short workplace voice note where you validate an idea, diplomatically push back, pressure-test it, and suggest a lower-risk compromise.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Open softly",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "Di: Oye, una idea rápida. Te entiendo, y buen punto.",
        "Hey, quick thought. I hear you, and fair point.",
        "This starts disagreement with rapport instead of confrontation.",
        breakdown([
          ["Hey, quick thought", "Oye, una idea rápida", "soft opener"],
          ["I hear you", "Te entiendo", "validation"],
          ["fair point", "buen punto", "acknowledges merit"],
        ]),
      ),
      stage(
        "stage-2",
        "Stage 2: Disagree gently",
        sentenceVocab.slice(3, 6),
        sentenceVocab.slice(0, 6),
        "Di: Dicho eso, no estoy del todo convencido, pero entiendo tu punto de vista.",
        "That said, I'm not totally sold, but I see where you're coming from.",
        "That said pivots into disagreement without erasing the other person's point.",
        breakdown([
          ["That said", "Dicho eso / aun así"],
          ["I'm not totally sold", "No estoy del todo convencido"],
          ["I see where you're coming from", "Entiendo tu punto de vista"],
        ]),
      ),
      stage(
        "stage-3",
        "Stage 3: Suggest a softer option",
        sentenceVocab.slice(6, 8),
        sentenceVocab.slice(0, 8),
        "Di: ¿Podríamos quizá tomar distancia antes de decidir?",
        "Could we maybe take a step back before we decide?",
        "Could we maybe makes the suggestion collaborative rather than commanding.",
        breakdown([
          ["Could we maybe", "¿Podríamos quizá?", "soft suggestion"],
          ["take a step back", "tomar distancia / verlo con calma"],
          ["before we decide", "antes de decidir"],
        ]),
      ),
      stage(
        "stage-4",
        "Stage 4: Name your intent",
        sentenceVocab.slice(8, 11),
        sentenceVocab.slice(0, 11),
        "Di: No quiero discrepar solo por discrepar. Pongámoslo a prueba, y acepto estar equivocado.",
        "I don't wanna push back just to push back. Let's pressure-test it, and I'm happy to be wrong.",
        "This frames disagreement as protecting the decision, not winning.",
        breakdown([
          ["I don't wanna push back just to push back", "No quiero discrepar solo por discrepar"],
          ["Let's pressure-test it", "Pongámoslo a prueba"],
          ["I'm happy to be wrong", "Acepto estar equivocado"],
        ]),
      ),
      stage(
        "stage-5",
        "Stage 5: Propose compromise",
        sentenceVocab.slice(11, 15),
        sentenceVocab.slice(0, 15),
        "Di: ¿Podemos llegar a un punto medio y probarlo primero con un grupo más pequeño para bajar un poco el riesgo?",
        "Can we meet in the middle and test it with a smaller group first to lower the risk a bit?",
        "This turns pushback into a constructive compromise.",
        breakdown([
          ["Can we meet in the middle", "¿Podemos llegar a un punto medio?"],
          ["test it with a smaller group first", "probarlo primero con un grupo más pequeño"],
          ["lower the risk a bit", "bajar un poco el riesgo"],
        ]),
      ),
      stage(
        "stage-6",
        "Stage 6: Close cleanly",
        sentenceVocab.slice(12, 16),
        sentenceVocab.slice(0, 16),
        "Di: No quiero apresurar esto. Probemos una opción, bajemos un poco el riesgo y cerremos por hoy.",
        "I don't wanna rush this. Let's test one option, lower the risk a bit, and call it a day.",
        "This closes with a clear next step and keeps the tone calm.",
        breakdown([
          ["I don't wanna rush this", "No quiero apresurar esto"],
          ["test one option", "probar una opción"],
          ["lower the risk a bit", "bajar un poco el riesgo"],
          ["call it a day", "cerrar por hoy"],
        ]),
      ),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "american-c1-diplomatic-story-q1",
    type: "multiple-choice",
    prompt: "What is the team disagreeing about?",
    options: ["Whether to launch the campaign to everyone or test it first", "Whether to cancel lunch", "Whether to hire a designer", "Whether traffic was bad"],
    correctAnswer: "Whether to launch the campaign to everyone or test it first",
    explanation: "The conflict is about speed versus risk before launching.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-c1-diplomatic-story-q2",
    type: "multiple-choice",
    prompt: "Why does Maya say 'I don't wanna push back just to push back'?",
    options: ["To show her disagreement is constructive, not argumentative", "To end the call immediately", "To blame Jordan", "To avoid giving any opinion"],
    correctAnswer: "To show her disagreement is constructive, not argumentative",
    explanation: "She clarifies that her goal is to improve the decision, not be difficult.",
    points: 1,
    skillTag: "intent",
  },
  {
    id: "american-c1-diplomatic-story-q3",
    type: "multiple-choice",
    prompt: "What compromise do they choose?",
    options: ["Test it with a smaller group first", "Launch to everyone immediately", "Drop the whole plan", "Wait six months"],
    correctAnswer: "Test it with a smaller group first",
    explanation: "They meet in the middle by lowering risk with a smaller test.",
    points: 1,
    skillTag: "compromise",
  },
  {
    id: "american-c1-diplomatic-story-q4",
    type: "multiple-choice",
    prompt: "What does 'I'm happy to be wrong' do socially?",
    options: ["It makes the pushback less ego-driven", "It proves she has no opinion", "It attacks the other person", "It changes the topic"],
    correctAnswer: "It makes the pushback less ego-driven",
    explanation: "It leaves room for evidence and reduces defensiveness.",
    points: 1,
    skillTag: "diplomacy",
  },
  {
    id: "american-c1-diplomatic-story-q5",
    type: "multiple-choice",
    prompt: "How does the conversation end?",
    options: ["They agree on a smaller test and call it a day", "They keep arguing", "They cancel the project", "They ignore the risk"],
    correctAnswer: "They agree on a smaller test and call it a day",
    explanation: "The story ends with a compromise and a clean close.",
    points: 1,
    skillTag: "summary",
  },
];

export const americanEnglishC1DiplomaticDisagreementWhatsAppStory: WhatsAppStory = {
  id: "american-english-c1-diplomatic-disagreement",
  title: "American C1 Story: Diplomatic Disagreement",
  subtitle: "A two-person workplace chat about challenging an idea without damaging rapport.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "WhatsApp", "diplomatic disagreement", "workplace"],
  estimatedMinutes: 18,
  skoolSectionName: "American English - C1 Diplomatic Disagreement",
  relatedCourse: "american-english-c1-diplomatic-disagreement-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "english",
    nativeLanguage: "spanish",
    characters: [
      { id: "maya", name: "Maya", initials: "M", side: "right", color: "blue" },
      { id: "jordan", name: "Jordan", initials: "J", side: "left", color: "green" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: this C1 chat shows diplomatic disagreement: validate, push back, pressure-test, compromise, and keep rapport.", "Guía: este chat C1 muestra desacuerdo diplomático: validar, discrepar, probar la idea, negociar y mantener buena relación.", [], "narrator"),
      message("m1", "maya", "Hey, quick thought. Are we definitely launching the campaign to everyone tomorrow?", "Oye, una idea rápida. ¿Seguro vamos a lanzar la campaña a todos mañana?", ["Hey, quick thought.", "A quick thought"], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m1.mp3"),
      message("m2", "jordan", "That's the plan. The client wants speed.", "Ese es el plan. El cliente quiere rapidez.", []),
      message("m3", "maya", "I hear you. Fair point. Speed does matter here.", "Te entiendo. Buen punto. La rapidez sí importa aquí.", ["I hear you.", "Fair point."]),
      message("m4", "maya", "That said, I'm not totally sold on this plan yet.", "Dicho eso, todavía no estoy del todo convencida con este plan.", ["That said.", "I'm not totally sold.", "Not totally sold on this plan"]),
      message("m5", "jordan", "Okay, what's the concern?", "Vale, ¿cuál es la preocupación?", [], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m5.mp3"),
      message("m6", "maya", "I see where you're coming from, and I get the concern about moving too slowly.", "Entiendo tu punto de vista, y entiendo la preocupación de avanzar demasiado lento.", ["I see where you're coming from.", "I get the concern."]),
      message("m7", "maya", "But honestly, I'm not sure that's the best move for launch day.", "Pero sinceramente, no estoy segura de que esa sea la mejor decisión para el día del lanzamiento.", ["Honestly.", "I'm not sure that's the best move.", "The best move"]),
      message("m8", "jordan", "Do you think the forecast is that bad?", "¿Crees que la proyección es tan mala?", []),
      message("m9", "maya", "Saying we'll double signups by Friday feels like a little bit of a stretch.", "Decir que duplicaremos registros para el viernes se siente un poco exagerado.", ["That's a little bit of a stretch."]),
      message("m10", "jordan", "Totally fair. I don't want fake confidence either.", "Totalmente válido. Tampoco quiero confianza falsa.", ["Totally fair."], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m10.mp3"),
      message("m11", "maya", "Let's not overcomplicate it, but can we take a step back before we decide?", "No compliquemos demasiado esto, pero ¿podemos verlo con más calma antes de decidir?", ["Let's not overcomplicate it.", "Can we take a step back?", "Before we decide."]),
      message("m12", "jordan", "Sure. I don't want us rushing this just because we're tired.", "Claro. No quiero que apresuremos esto solo porque estamos cansados.", ["Rushing this"]),
      message("m13", "maya", "Exactly. I don't wanna push back just to push back.", "Exacto. No quiero discrepar solo por discrepar.", ["I don't wanna push back just to push back.", "Push back"]),
      message("m14", "maya", "That's on me if I missed something in the data.", "Es culpa mía si se me escapó algo en los datos.", ["That's on me if I missed something."]),
      message("m15", "jordan", "No worries. Let's pressure-test it.", "No pasa nada. Pongámoslo a prueba.", ["No worries.", "Let's pressure-test it."], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m15.mp3"),
      message("n2", "narrator", "Pause: Maya is challenging the plan, but every challenge is softened with validation, ownership, or a concrete alternative.", "Pausa: Maya está cuestionando el plan, pero cada desacuerdo se suaviza con validación, responsabilidad o una alternativa concreta.", [], "narrator"),
      message("m16", "maya", "For what it's worth, I'm happy to be wrong if the test says we're ready.", "Por si sirve de algo, acepto estar equivocada si la prueba dice que estamos listos.", ["For what it's worth.", "I'm happy to be wrong."]),
      message("m17", "jordan", "I appreciate that. You're not trying to be difficult.", "Valoro eso. No estás intentando poner problemas.", ["I'm not trying to be difficult."]),
      message("m18", "maya", "Could we maybe try another option and lower the risk a bit?", "¿Podríamos quizá probar otra opción y bajar un poco el riesgo?", ["Could we maybe...?", "Try another option", "Lower the risk a bit"]),
      message("m19", "jordan", "Like what?", "¿Como qué?", []),
      message("m20", "maya", "Test it with a smaller group first. If it works, we launch wider on Monday.", "Probarlo primero con un grupo más pequeño. Si funciona, lanzamos más amplio el lunes.", ["Test it with a smaller group first"], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m20.mp3"),
      message("m21", "jordan", "That might actually keep rapport with the client too.", "Eso incluso podría mantener buena relación con el cliente.", ["Keep rapport"]),
      message("m22", "maya", "Right. We challenge ideas without making it personal.", "Exacto. Cuestionamos ideas sin volverlo personal.", ["Challenge ideas"]),
      message("m23", "jordan", "Can we meet in the middle? Small group tomorrow, wider launch Monday if metrics look good.", "¿Podemos llegar a un punto medio? Grupo pequeño mañana, lanzamiento más amplio el lunes si las métricas se ven bien.", ["Can we meet in the middle?", "Meet in the middle"]),
      message("m24", "maya", "That works. We're on the same page about the goal.", "Eso funciona. Estamos de acuerdo en lo básico sobre el objetivo.", ["We're on the same page."]),
      message("m25", "jordan", "Great. Pressure-test both options tonight, pick the safer path, and call it a day?", "Genial. ¿Probamos ambas opciones esta noche, elegimos el camino más seguro y cerramos por hoy?", ["Pressure-test both options", "Let's call it a day."], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m25.mp3"),
      message("m26", "maya", "Yes. And sorry I'm late to this thread. Traffic was brutal.", "Sí. Y perdón por llegar tarde al hilo. El tráfico estuvo brutal.", ["Traffic was brutal."]),
      message("m27", "jordan", "All good. This was useful.", "Todo bien. Esto fue útil.", []),
      message("m28", "maya", "Diplomatic disagreement: tiny bit awkward, very worth it.", "Desacuerdo diplomático: un poquito incómodo, muy valioso.", ["Diplomatic disagreement"]),
      message("m29", "jordan", "Agreed. You softened the criticism without watering down the point.", "De acuerdo. Suavizaste la crítica sin diluir el punto.", ["Soften criticism"]),
      message("m30", "maya", "Perfect. Smaller test tomorrow, no rushing this, and then we call it a day.", "Perfecto. Prueba pequeña mañana, sin apresurar esto, y luego cerramos por hoy.", ["I don't wanna rush this.", "Let's call it a day."], "voice-note", "/audio/stories/american-english-c1-diplomatic-disagreement/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "american-c1-diplomatic-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "american-c1-diplomatic-check-2", afterMessageId: "m15", question: storyQuestions[1] },
      { id: "american-c1-diplomatic-check-3", afterMessageId: "m20", question: storyQuestions[2] },
      { id: "american-c1-diplomatic-check-4", afterMessageId: "m25", question: storyQuestions[3] },
      { id: "american-c1-diplomatic-check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: diplomaticVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: diplomaticVocab.map((item) => item.term),
      grammarPatterns: [
        "Validation before disagreement: I hear you, fair point, I see where you're coming from.",
        "Soft pivots: That said, Honestly, For what it's worth.",
        "Constructive pushback: I don't wanna push back just to push back; let's pressure-test it.",
        "Compromise language: Can we meet in the middle? Test it with a smaller group first.",
      ],
      speakingPrompts: [
        "Disagree with a risky plan while keeping rapport.",
        "Suggest a lower-risk compromise using Could we maybe...? and Can we meet in the middle?",
        "Pressure-test an idea while saying you're happy to be wrong.",
      ],
    },
    completionTask: {
      title: "Your diplomatic disagreement voice note",
      instructions:
        "Record a 90-second workplace voice note. Validate the other person, push back gently, propose a smaller test, and close with a compromise.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Diplomatic disagreement is not about hiding your opinion. It is about protecting the relationship while still challenging ideas. In American English, a phrase like Hey, quick thought can open the door gently. Then I hear you or Fair point shows that you understood the other person before you disagree. That small validation helps keep rapport, especially in a workplace conversation.",
    translation:
      "El desacuerdo diplomático no se trata de esconder tu opinión. Se trata de proteger la relación mientras cuestionas ideas. En inglés estadounidense, una frase como 'Oye, una idea rápida' puede abrir la puerta suavemente. Luego 'te entiendo' o 'buen punto' muestra que entendiste a la otra persona antes de discrepar. Esa pequeña validación ayuda a mantener buena relación, especialmente en una conversación laboral.",
    highlights: highlights(["Diplomatic disagreement", "Hey, quick thought.", "I hear you.", "Fair point.", "Keep rapport", "Challenge ideas"]),
    shadowLine: "I hear you. Fair point. That said, I see one risk.",
  },
  {
    id: "p2",
    text:
      "The phrase That said is a useful pivot. It means: I accept what you said, and now I want to add another view. For example: That said, I'm not totally sold. That sounds much more diplomatic than saying your plan is bad. If you add I see where you're coming from or I get the concern, the pushback feels collaborative instead of personal.",
    translation:
      "La frase 'dicho eso' es un giro útil. Significa: acepto lo que dijiste, y ahora quiero agregar otra perspectiva. Por ejemplo: 'Dicho eso, no estoy del todo convencido'. Eso suena mucho más diplomático que decir que tu plan es malo. Si agregas 'entiendo tu punto de vista' o 'entiendo la preocupación', la discrepancia se siente colaborativa en vez de personal.",
    highlights: highlights(["That said.", "I'm not totally sold.", "I see where you're coming from.", "I get the concern.", "Push back"]),
    shadowLine: "That said, I'm not totally sold yet.",
  },
  {
    id: "p3",
    text:
      "At C1 level, disagreement often includes ownership. You can say: I don't wanna push back just to push back. That's on me if I missed something. I'm happy to be wrong. These phrases reduce ego. They tell the other person: I am not trying to be difficult; I am trying to protect the decision. That is why Let's pressure-test it is such a powerful phrase.",
    translation:
      "En nivel C1, el desacuerdo a menudo incluye responsabilidad personal. Puedes decir: 'No quiero discrepar solo por discrepar'. 'Es culpa mía si se me escapó algo'. 'Acepto estar equivocado'. Estas frases reducen el ego. Le dicen a la otra persona: no estoy intentando ser difícil; estoy tratando de proteger la decisión. Por eso 'pongámoslo a prueba' es una frase tan poderosa.",
    highlights: highlights(["I don't wanna push back just to push back.", "That's on me if I missed something.", "I'm happy to be wrong.", "I'm not trying to be difficult.", "Let's pressure-test it."]),
    shadowLine: "I'm happy to be wrong; let's pressure-test it.",
  },
  {
    id: "p4",
    text:
      "A diplomatic speaker does not only criticize. They offer a path forward. Could we maybe test it with a smaller group first? Can we meet in the middle? Could we try another option and lower the risk a bit? These questions soften criticism because they turn disagreement into shared problem-solving. The goal is not to win. The goal is the best move.",
    translation:
      "Una persona diplomática no solo critica. Ofrece un camino a seguir. ¿Podríamos quizá probarlo primero con un grupo más pequeño? ¿Podemos llegar a un punto medio? ¿Podríamos probar otra opción y bajar un poco el riesgo? Estas preguntas suavizan la crítica porque convierten el desacuerdo en resolución compartida. El objetivo no es ganar. El objetivo es la mejor decisión.",
    highlights: highlights(["Could we maybe...?", "Test it with a smaller group first", "Can we meet in the middle?", "Try another option", "Lower the risk a bit", "Soften criticism", "The best move"]),
    shadowLine: "Can we meet in the middle and lower the risk a bit?",
  },
  {
    id: "p5",
    text:
      "Rushing this and I don't wanna rush this are useful when the team feels pressure. If someone says the client wants speed, you can answer: Totally fair. That said, rushing this could create more risk. Let's not overcomplicate it, but can we take a step back before we decide? Notice how the speaker validates speed, names the risk, and asks for a calmer view.",
    translation:
      "'Apresurar esto' y 'no quiero apresurar esto' son útiles cuando el equipo siente presión. Si alguien dice que el cliente quiere velocidad, puedes responder: 'Totalmente válido. Dicho eso, apresurar esto podría crear más riesgo. No compliquemos demasiado esto, pero ¿podemos verlo con más calma antes de decidir?' Nota cómo la persona valida la velocidad, nombra el riesgo y pide una mirada más calmada.",
    highlights: highlights(["Rushing this", "I don't wanna rush this.", "Totally fair.", "That said.", "Let's not overcomplicate it.", "Can we take a step back?", "Before we decide."]),
    shadowLine: "Totally fair. That said, I don't wanna rush this.",
  },
  {
    id: "p6",
    text:
      "A clean close matters too. If the team has reached a compromise, you can say: We're on the same page. Let's pressure-test both options, choose the safer path, and call it a day. Even a human detail like Traffic was brutal can soften the tone because it reminds everyone that the conversation is happening between people, not positions.",
    translation:
      "Un cierre limpio también importa. Si el equipo llegó a un acuerdo intermedio, puedes decir: 'Estamos de acuerdo en lo básico. Probemos ambas opciones, elijamos el camino más seguro y cerremos por hoy'. Incluso un detalle humano como 'el tráfico estuvo brutal' puede suavizar el tono porque recuerda que la conversación ocurre entre personas, no posiciones.",
    highlights: highlights(["We're on the same page.", "Pressure-test both options", "Let's call it a day.", "Traffic was brutal.", "Meet in the middle"]),
    shadowLine: "We're on the same page. Let's call it a day.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "american-c1-diplomatic-reading-q1",
    type: "multiple-choice",
    prompt: "What is the main purpose of diplomatic disagreement?",
    options: ["To challenge ideas while keeping rapport", "To hide every opinion", "To win the argument quickly", "To avoid all decisions"],
    correctAnswer: "To challenge ideas while keeping rapport",
    explanation: "The reading says diplomatic disagreement protects the relationship while still challenging ideas.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-c1-diplomatic-reading-q2",
    type: "multiple-choice",
    prompt: "What does 'That said' do?",
    options: ["It pivots from validation into another view", "It ends the meeting", "It rejects all previous points", "It means traffic was bad"],
    correctAnswer: "It pivots from validation into another view",
    explanation: "That said lets you accept a point and then add a different view.",
    points: 1,
    skillTag: "discourse-marker",
  },
  {
    id: "american-c1-diplomatic-reading-q3",
    type: "true-false",
    prompt: "True or false: 'I'm happy to be wrong' makes disagreement less ego-driven.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading says this phrase reduces ego and leaves room for evidence.",
    points: 1,
    skillTag: "pragmatics",
  },
  {
    id: "american-c1-diplomatic-reading-q4",
    type: "order-words",
    prompt: "Order the words to make a compromise question.",
    wordBank: ["Can", "we", "meet", "in", "the", "middle?"],
    correctAnswer: "Can we meet in the middle?",
    explanation: "This asks for a compromise.",
    points: 2,
    skillTag: "sentence-order",
  },
  {
    id: "american-c1-diplomatic-reading-q5",
    type: "fill-blank",
    prompt: "Complete: Let's pressure-test both ______.",
    nativePrompt: "Probemos ambas opciones.",
    correctAnswer: "options",
    explanation: "Pressure-test both options means test both choices to see which holds up better.",
    points: 1,
    skillTag: "collocation",
  },
];

export const americanEnglishC1DiplomaticDisagreementReading: ReadingComprehension = {
  id: "american-english-c1-diplomatic-disagreement-reading",
  title: "American C1 Reading: Push Back Without Burning Rapport",
  subtitle: "A nuanced reading about validating, challenging ideas, pressure-testing options, and compromising diplomatically.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "reading", "diplomatic disagreement", "workplace"],
  estimatedMinutes: 18,
  skoolSectionName: "American English - C1 Diplomatic Disagreement",
  relatedCourse: "american-english-c1-diplomatic-disagreement",
  activityType: "reading",
  data: {
    targetLanguage: "english",
    audioUrl: "/audio/readings/american-english-c1-diplomatic-disagreement/full.mp3",
    audioAlignmentUrl: "/audio/readings/american-english-c1-diplomatic-disagreement/timings.json",
    paragraphs: readingParagraphs,
    glossary: diplomaticVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the C1 diplomatic disagreement vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  diplomaticVocab.slice(0, 9),
  diplomaticVocab.slice(9, 18),
  diplomaticVocab.slice(18, 27),
  diplomaticVocab.slice(27, 36),
  diplomaticVocab.slice(36),
];

export const americanEnglishC1DiplomaticDisagreementQuiz: CheckpointQuiz = {
  id: "american-english-c1-diplomatic-disagreement-quiz",
  title: "American English C1: Diplomatic Disagreement Quiz",
  subtitle: "Practice choosing the right diplomatic phrase for workplace disagreement, compromise, and risk reduction.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "quiz", "diplomatic disagreement"],
  estimatedMinutes: 20,
  skoolSectionName: "American English - C1 Diplomatic Disagreement",
  relatedCourse: "american-english-c1-diplomatic-disagreement",
  activityType: "quiz",
  data: {
    description: "Use this after the flashcards, sentence builder, story, and reading to test diplomatic disagreement language.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "american-c1-diplomatic-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase validates before disagreeing?",
        options: ["I hear you.", "Let's call it a day.", "Traffic was brutal.", "Rush this"],
        correctAnswer: "I hear you.",
        explanation: "I hear you validates the other person before you add your view.",
        points: 1,
        skillTag: "validation",
      },
      {
        id: "american-c1-diplomatic-quiz-2",
        type: "multiple-choice",
        prompt: "Which phrase means you are not fully convinced?",
        options: ["I'm not totally sold.", "We're on the same page.", "No worries.", "Fair point."],
        correctAnswer: "I'm not totally sold.",
        explanation: "I'm not totally sold is a soft way to express doubt.",
        points: 1,
        skillTag: "soft-disagreement",
      },
      {
        id: "american-c1-diplomatic-quiz-3",
        type: "fill-blank",
        prompt: "Complete: Can we meet in the ______?",
        nativePrompt: "¿Podemos llegar a un punto medio?",
        correctAnswer: "middle",
        explanation: "Meet in the middle means compromise.",
        points: 1,
        skillTag: "compromise",
      },
      {
        id: "american-c1-diplomatic-quiz-4",
        type: "true-false",
        prompt: "True or false: 'I don't wanna push back just to push back' makes disagreement sound more constructive.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "It clarifies that the pushback has a purpose.",
        points: 1,
        skillTag: "intent",
      },
      {
        id: "american-c1-diplomatic-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        wordBank: ["Let's", "pressure-test", "it"],
        correctAnswer: "Let's pressure-test it",
        explanation: "This means let's test whether the idea holds up.",
        points: 1,
        skillTag: "sentence-order",
      },
      {
        id: "american-c1-diplomatic-quiz-6",
        type: "multiple-choice",
        prompt: "Which phrase suggests a lower-risk pilot?",
        options: ["Test it with a smaller group first", "Let's call it a day", "Traffic was brutal", "Fair point"],
        correctAnswer: "Test it with a smaller group first",
        explanation: "A smaller group test lowers risk before a full launch.",
        points: 1,
        skillTag: "risk",
      },
      {
        id: "american-c1-diplomatic-quiz-7",
        type: "multiple-choice",
        prompt: "Which phrase keeps the tone open to evidence?",
        options: ["I'm happy to be wrong.", "That's a little bit of a stretch.", "Rush this", "A quick thought"],
        correctAnswer: "I'm happy to be wrong.",
        explanation: "It shows flexibility and reduces ego.",
        points: 1,
        skillTag: "humility",
      },
      {
        id: "american-c1-diplomatic-quiz-8",
        type: "fill-blank",
        prompt: "Complete: I don't wanna ______ this.",
        nativePrompt: "No quiero apresurar esto.",
        correctAnswer: "rush",
        explanation: "I don't wanna rush this means I do not want to move too fast.",
        points: 1,
        skillTag: "risk",
      },
      {
        id: "american-c1-diplomatic-quiz-9",
        type: "true-false",
        prompt: "True or false: 'That's a little bit of a stretch' means the claim sounds somewhat exaggerated.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "A stretch is something that feels exaggerated or hard to accept.",
        points: 1,
        skillTag: "idiom",
      },
      {
        id: "american-c1-diplomatic-quiz-10",
        type: "order-words",
        prompt: "Order the words to make the soft suggestion.",
        wordBank: ["Could", "we", "maybe", "try", "another", "option?"],
        correctAnswer: "Could we maybe try another option?",
        explanation: "Could we maybe softens the suggestion.",
        points: 2,
        skillTag: "sentence-order",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`american-c1-diplomatic-match-${index + 1}`, `Match diplomatic disagreement expressions set ${index + 1}.`, chunk),
      ),
    ],
  },
};
