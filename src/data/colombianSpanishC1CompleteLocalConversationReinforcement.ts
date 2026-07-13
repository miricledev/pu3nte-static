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
  note: string;
  example: string;
  translation: string;
  starred?: boolean;
};

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const localConversationVocab: VocabItem[] = [
  { id: "quiubo-bien-o-que", term: "¿Quiubo, bien o qué?", meaning: "What's up, all good?", note: "Casual Colombian opener from ¿qué hubo?", example: "¿Quiubo, bien o qué? ¿Sí llegó?", translation: "What's up, all good? Did it arrive?", starred: true },
  { id: "venga-le-cuento", term: "Venga le cuento", meaning: "Listen, I'll tell you", note: "Natural way to start explaining a story or situation.", example: "Venga le cuento cómo fue la vuelta.", translation: "Listen, I'll tell you how the situation went.", starred: true },
  { id: "regaleme-un-segundo", term: "Regáleme un segundo", meaning: "Give me one second", note: "Very Colombian polite-service style; not literally gift me.", example: "Regáleme un segundo y reviso el chat.", translation: "Give me one second and I'll check the chat.", starred: true },
  { id: "no-hay-afan", term: "No hay afán", meaning: "There's no rush", note: "Very common Colombian softener.", example: "No hay afán, pero sí toca cuadrarlo bien.", translation: "There's no rush, but we do need to sort it out properly.", starred: true },
  { id: "no-le-de-tanta-vuelta", term: "No le dé tanta vuelta", meaning: "Don't overthink it", note: "Used when someone is complicating something.", example: "No le dé tanta vuelta; camine y miramos.", translation: "Don't overthink it; come on, let's check.", starred: true },
  { id: "eso-esta-enredado", term: "Eso está como enredado", meaning: "That's kind of messy / complicated", note: "Enredado means tangled or complicated.", example: "El pedido está como enredado.", translation: "The order is kind of messy.", starred: true },
  { id: "vaina", term: "vaina", meaning: "thing / situation / issue / stuff", note: "Very common informal Colombian word.", example: "La vaina está enredada.", translation: "The situation is messy.", starred: true },
  { id: "me-tiene-mamado", term: "Esto ya me tiene mamado", meaning: "I'm fed up with this", note: "Informal and slightly strong.", example: "Este problema ya me tiene mamado.", translation: "This problem has me fed up.", starred: true },
  { id: "me-hace-un-cruce", term: "¿Me hace un cruce?", meaning: "Can you help me out? / Can you do me a favor?", note: "Local-feeling Colombian phrase for asking help.", example: "¿Me hace un cruce y llama al proveedor?", translation: "Can you help me out and call the supplier?", starred: true },
  { id: "me-regala-eso", term: "¿Me regala eso, porfa?", meaning: "Could you pass/sell/give me that, please?", note: "Common in shops and restaurants; it does not mean for free.", example: "¿Me regala eso, porfa? Es para revisar la factura.", translation: "Could you pass me that, please? It's to check the invoice.", starred: true },
  { id: "la-embarre", term: "La embarré", meaning: "I messed up", note: "Very common way to admit a mistake.", example: "La embarré mandando la dirección vieja.", translation: "I messed up by sending the old address.", starred: true },
  { id: "que-oso", term: "Qué oso", meaning: "How embarrassing / that's so awkward", note: "Used for social embarrassment.", example: "Qué oso con el cliente.", translation: "How embarrassing with the client.", starred: true },
  { id: "paila", term: "Paila", meaning: "That sucks / too bad / we're screwed", note: "Colombian reaction to a bad outcome.", example: "Si no llega hoy, paila.", translation: "If it doesn't arrive today, we're screwed.", starred: true },
  { id: "me-hizo-quedar-mal", term: "Me hizo quedar mal", meaning: "He/she made me look bad", note: "Social embarrassment phrase.", example: "Ese man me hizo quedar mal con todos.", translation: "That guy made me look bad in front of everyone.", starred: true },
  { id: "ese-man", term: "ese man", meaning: "that guy / that dude", note: "Very common Colombian informal way to say that guy.", example: "Ese man no respondió nunca.", translation: "That guy never answered.", starred: true },
  { id: "le-caigo-mas-tarde", term: "Le caigo más tarde", meaning: "I'll come by later / I'll pull up later", note: "Used for visiting, joining plans, or showing up.", example: "Le caigo más tarde y miramos la vaina.", translation: "I'll come by later and we'll check the situation.", starred: true },
  { id: "cuadre-bien-eso", term: "Cuadre bien eso", meaning: "Sort that out properly", note: "From cuadrar: arrange, organize, fix.", example: "Cuadre bien eso antes de confirmar.", translation: "Sort that out properly before confirming.", starred: true },
  { id: "camine-y-miramos", term: "Camine y miramos", meaning: "Come on, let's check / let's go and see", note: "Very Colombian spoken command.", example: "Camine y miramos si todavía está abierto.", translation: "Come on, let's check if it's still open.", starred: true },
  { id: "estoy-que-no-doy-mas", term: "Estoy que no doy más", meaning: "I can't take any more / I'm exhausted", note: "Strong phrase for tiredness or overwhelm.", example: "Estoy que no doy más con este corre-corre.", translation: "I can't take any more of this rush.", starred: true },
  { id: "tengo-filo", term: "Tengo filo", meaning: "I'm starving", note: "Colombian slang for being very hungry.", example: "Tengo filo; paremos por algo.", translation: "I'm starving; let's stop for something.", starred: true },
  { id: "me-toca-mirar", term: "Me toca mirar", meaning: "I have to check / I need to see", note: "Me toca means I have to / I'm forced to.", example: "Me toca mirar si la reserva quedó bien.", translation: "I need to check if the reservation was set properly.", starred: true },
  { id: "no-sea-sapo", term: "No sea sapo", meaning: "Don't be nosy / don't snitch", note: "Risky teasing; only with friends or informal contexts.", example: "No sea sapo, eso no era para el grupo.", translation: "Don't be nosy, that wasn't for the group.", starred: true },
  { id: "no-me-mame-gallo", term: "No me mame gallo", meaning: "Don't wind me up / stop joking with me", note: "Colombian phrase for teasing, messing around, or not being serious.", example: "No me mame gallo, ¿sí llegó o no?", translation: "Stop messing with me, did it arrive or not?", starred: true },
  { id: "no-se-ponga-intenso", term: "No se ponga intenso", meaning: "Don't get intense / don't overreact", note: "Used to calm someone down.", example: "No se ponga intenso; ya lo estamos arreglando.", translation: "Don't overreact; we're already fixing it.", starred: true },
  { id: "no-coma-cuento", term: "No coma cuento", meaning: "Don't believe that story / don't fall for it", note: "Used for scams, excuses, gossip, or lies.", example: "No coma cuento, ese descuento es falso.", translation: "Don't fall for it, that discount is fake.", starred: true },
  { id: "eso-quedo-vuelto-nada", term: "Eso quedó vuelto nada", meaning: "That got ruined / destroyed / messed up", note: "Vuelto nada means left in a terrible state.", example: "El archivo quedó vuelto nada.", translation: "The file got totally messed up.", starred: true },
  { id: "le-paso-el-dato", term: "Le paso el dato", meaning: "I'll send/pass you the info", note: "Used for recommendations, tips, addresses, contacts, etc.", example: "Ahí sí le paso el dato del técnico.", translation: "Then I'll send you the technician's info.", starred: true },
  { id: "fresco", term: "Fresco", meaning: "Relax / don't worry", note: "Colombian casual reassurance.", example: "Fresco, yo respondo por eso.", translation: "Relax, I'll answer for that.", starred: true },
  { id: "a-la-carrera", term: "A la carrera", meaning: "In a rush / rushed", note: "Used when something is done too quickly.", example: "Si lo hacemos a la carrera, sale mal.", translation: "If we do it in a rush, it goes wrong.", starred: true },
  { id: "me-toca-responder", term: "Me toca responder", meaning: "I'll have to answer for it / be responsible", note: "Used when consequences fall on you.", example: "Si queda mal, me toca responder a mí.", translation: "If it turns out badly, I'll have to answer for it.", starred: true },
  { id: "cara-de-filo", term: "Tiene una cara de filo horrible", meaning: "You look starving", note: "Humorous teasing: you have a terrible hungry face.", example: "Tiene una cara de filo horrible; coma algo.", translation: "You look starving; eat something.", starred: true },
  { id: "ahi-si", term: "Ahí sí", meaning: "Then / only then / after that", note: "Useful sequencing phrase.", example: "Ahí sí le paso el dato.", translation: "Then I'll pass you the info.", starred: true },
  { id: "vaina-enredada", term: "La vaina está enredada", meaning: "The situation is messy / complicated", note: "Very natural informal Colombian phrasing.", example: "La vaina está enredada, pero se puede arreglar.", translation: "The situation is messy, but it can be fixed.", starred: true },
  { id: "quedo-vuelto-nada", term: "Quedó vuelto nada", meaning: "It ended up ruined", note: "Shorter version of eso quedó vuelto nada.", example: "El plan quedó vuelto nada por hacerlo a la carrera.", translation: "The plan ended up ruined because we did it in a rush.", starred: true },
];

const highlightMap = Object.fromEntries(localConversationVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    specialCharacters,
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

export const colombianSpanishC1CompleteLocalConversationFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-c1-complete-local-conversation-flashcards",
  title: "Colombian Spanish C1: Complete Local Conversation Flashcards",
  subtitle: "Advanced everyday Colombian phrases for favors, mistakes, rushed plans, hunger, responsibility, and local problem-solving.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "local conversation", "slang", "problem-solving"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Complete Local Conversation",
  relatedCourse: "colombian-spanish-c1-complete-local-conversation",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: localConversationVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Quiubo, bien o qué? = What's up, all good?",
  "Venga le cuento = Listen, I'll tell you",
  "Regáleme un segundo = Give me one second",
  "No hay afán = There's no rush",
  "No le dé tanta vuelta = Don't overthink it",
  "La vaina está enredada = The situation is messy",
  "¿Me hace un cruce? = Can you help me out?",
  "La embarré = I messed up",
  "Qué oso = How embarrassing",
  "Paila = That sucks / we're screwed",
  "Cuadre bien eso = Sort that out properly",
  "Camine y miramos = Come on, let's check",
  "No me mame gallo = Stop joking with me",
  "No se ponga intenso = Don't overreact",
  "No coma cuento = Don't fall for it",
  "Fresco = Relax",
  "A la carrera = In a rush",
  "Me toca responder = I'll have to answer for it",
  "Le paso el dato = I'll send you the info",
  "Ahí sí = Then / after that",
];

export const colombianSpanishC1CompleteLocalConversationSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-c1-complete-local-conversation-sentence-builder",
  title: "C1 Sentence Builder: Complete Colombian Local Conversation",
  subtitle: "Build natural Colombian Spanish for starting a story, asking favors, admitting mistakes, and fixing a messy situation.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["colombian-spanish", "c1", "sentence-builder", "local conversation"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - C1 Complete Local Conversation",
  relatedCourse: "colombian-spanish-c1-complete-local-conversation",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a Colombian-style voice note explaining a messy situation, asking for one favor, admitting one mistake, and saying how you will fix it.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Open the story",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "Say: What's up, all good? Listen, I'll tell you, give me one second; there's no rush.",
        "¿Quiubo, bien o qué? Venga le cuento, regáleme un segundo; no hay afán.",
        "This starts a local Colombian explanation with warmth and a softener.",
        breakdown([
          ["¿Quiubo, bien o qué?", "What's up, all good?", "casual Colombian opener"],
          ["Venga le cuento", "Listen, I'll tell you"],
          ["regáleme un segundo", "give me one second", "polite Colombian request"],
          ["no hay afán", "there is no rush"],
        ]),
      ),
      stage(
        "stage-2",
        "Stage 2: Explain the mess",
        sentenceVocab.slice(4, 6),
        sentenceVocab.slice(0, 6),
        "Say: Don't overthink it, but the situation is messy.",
        "No le dé tanta vuelta, pero la vaina está enredada.",
        "This combines a de-complicating phrase with a clear problem statement.",
        breakdown([
          ["No le dé tanta vuelta", "Don't overthink it"],
          ["pero", "but"],
          ["la vaina está enredada", "the situation is messy"],
        ]),
      ),
      stage(
        "stage-3",
        "Stage 3: Ask for help",
        sentenceVocab.slice(6, 9),
        sentenceVocab.slice(0, 9),
        "Say: Can you help me out? I messed up and, honestly, how embarrassing.",
        "¿Me hace un cruce? La embarré y, la verdad, qué oso.",
        "This asks for help while owning the mistake socially.",
        breakdown([
          ["¿Me hace un cruce?", "Can you help me out?"],
          ["La embarré", "I messed up"],
          ["qué oso", "how embarrassing"],
        ]),
      ),
      stage(
        "stage-4",
        "Stage 4: Fix it properly",
        sentenceVocab.slice(9, 12),
        sentenceVocab.slice(0, 12),
        "Say: If we don't sort that out properly, we're screwed. Come on, let's check.",
        "Si no cuadramos bien eso, paila. Camine y miramos.",
        "This uses paila for consequences and camine y miramos for action.",
        breakdown([
          ["si no cuadramos bien eso", "if we don't sort that out properly"],
          ["paila", "we're screwed / too bad"],
          ["Camine y miramos", "Come on, let's check"],
        ]),
      ),
      stage(
        "stage-5",
        "Stage 5: Calm the person down",
        sentenceVocab.slice(12, 16),
        sentenceVocab.slice(0, 16),
        "Say: Stop joking with me, but don't overreact; don't fall for that story. Relax.",
        "No me mame gallo, pero no se ponga intenso; no coma cuento. Fresco.",
        "This stage mixes firm Colombian correction with reassurance.",
        breakdown([
          ["No me mame gallo", "Stop joking with me"],
          ["no se ponga intenso", "don't overreact"],
          ["no coma cuento", "don't fall for that story"],
          ["Fresco", "Relax"],
        ]),
      ),
      stage(
        "stage-6",
        "Stage 6: Take responsibility",
        sentenceVocab.slice(16, 20),
        sentenceVocab.slice(0, 20),
        "Say: If I do it in a rush, it ends up ruined and I'll have to answer for it; then I'll send you the info.",
        "Si lo hago a la carrera, queda vuelto nada y me toca responder; ahí sí le paso el dato.",
        "This combines rushed action, consequences, responsibility, and a follow-up promise.",
        breakdown([
          ["a la carrera", "in a rush"],
          ["queda vuelto nada", "it ends up ruined"],
          ["me toca responder", "I'll have to answer for it"],
          ["ahí sí le paso el dato", "then I'll send you the info"],
        ]),
      ),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-c1-local-story-q1",
    type: "multiple-choice",
    prompt: "What is the main problem in the story?",
    options: ["A catering reservation and address got mixed up", "A phone was stolen", "Someone missed a flight", "A concert was cancelled"],
    correctAnswer: "A catering reservation and address got mixed up",
    explanation: "Laura and Andrés are trying to fix a messy catering situation before a client meeting.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-c1-local-story-q2",
    type: "multiple-choice",
    prompt: "What does 'La embarré' show?",
    options: ["Laura admits she made a mistake", "Laura is hungry", "Andrés is joking", "The client paid early"],
    correctAnswer: "Laura admits she made a mistake",
    explanation: "La embarré is a direct Colombian way to say I messed up.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "colombian-c1-local-story-q3",
    type: "multiple-choice",
    prompt: "Why does Laura say 'No le dé tanta vuelta'?",
    options: ["Andrés is overthinking the problem", "The food is perfect", "The meeting is finished", "She wants him to leave"],
    correctAnswer: "Andrés is overthinking the problem",
    explanation: "The phrase tells him not to complicate the situation more than needed.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "colombian-c1-local-story-q4",
    type: "multiple-choice",
    prompt: "What does 'me toca responder' mean in context?",
    options: ["Laura will be responsible if it goes wrong", "Laura will answer a phone call", "Laura will eat first", "Laura will gossip"],
    correctAnswer: "Laura will be responsible if it goes wrong",
    explanation: "Me toca responder means the consequences fall on her.",
    points: 1,
    skillTag: "responsibility",
  },
  {
    id: "colombian-c1-local-story-q5",
    type: "multiple-choice",
    prompt: "How do they resolve the issue?",
    options: ["They check the order, contact the right person, and stop rushing", "They cancel everything", "They blame the client", "They ignore the messages"],
    correctAnswer: "They check the order, contact the right person, and stop rushing",
    explanation: "They move from panic to local problem-solving: camine y miramos, le paso el dato, and no doing it a la carrera.",
    points: 1,
    skillTag: "summary",
  },
];

export const colombianSpanishC1CompleteLocalConversationWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-c1-complete-local-conversation",
  title: "Colombian C1 Story: Complete Local Conversation",
  subtitle: "A two-person WhatsApp story where a messy catering mistake turns into a natural Colombian problem-solving conversation.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "WhatsApp", "local conversation", "problem-solving"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Complete Local Conversation",
  relatedCourse: "colombian-spanish-c1-complete-local-conversation-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "laura", name: "Laura", initials: "L", side: "right", color: "red" },
      { id: "andres", name: "Andrés", initials: "A", side: "left", color: "blue" },
    ],
    messages: [
      message("n1", "narrator", "Guía: esta historia practica conversación colombiana C1 para explicar una vaina enredada, pedir ayuda, admitir errores y responder sin sonar rígido.", "Guide: this story practices C1 Colombian conversation for explaining a messy situation, asking for help, admitting mistakes, and answering naturally.", [], "narrator"),
      message("m1", "laura", "¿Quiubo, bien o qué? ¿Está ocupado?", "What's up, all good? Are you busy?", ["¿Quiubo, bien o qué?"]),
      message("m2", "andres", "Más o menos. ¿Qué pasó?", "Kind of. What happened?", []),
      message("m3", "laura", "Venga le cuento: la vaina del almuerzo está como enredada.", "Listen, I'll tell you: the lunch situation is kind of messy.", ["Venga le cuento", "vaina", "Eso está como enredado"]),
      message("m4", "andres", "Ay no. ¿Otra vez el proveedor?", "Oh no. The supplier again?", []),
      message("m5", "laura", "Regáleme un segundo y no se ponga intenso. No hay afán, pero sí necesito un cruce.", "Give me one second and don't overreact. There's no rush, but I do need a favor.", ["Regáleme un segundo", "No se ponga intenso", "No hay afán", "¿Me hace un cruce?"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m5.mp3"),
      message("m6", "andres", "Listo. Respire. ¿Qué se dañó?", "Okay. Breathe. What got messed up?", []),
      message("m7", "laura", "La embarré. Mandé la dirección vieja del cliente.", "I messed up. I sent the client's old address.", ["La embarré"]),
      message("m8", "andres", "Qué oso, pero se arregla.", "How embarrassing, but it can be fixed.", ["Qué oso"]),
      message("m9", "laura", "Si el pedido llega allá, paila. Me hizo quedar mal con todo el equipo.", "If the order arrives there, we're screwed. It made me look bad with the whole team.", ["Paila", "Me hizo quedar mal"]),
      message("m10", "andres", "No le dé tanta vuelta. Camine y miramos el recibo primero.", "Don't overthink it. Come on, let's check the receipt first.", ["No le dé tanta vuelta", "Camine y miramos"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m10.mp3"),
      message("m11", "laura", "Ese man del restaurante tampoco contesta.", "That guy from the restaurant isn't answering either.", ["ese man"]),
      message("m12", "andres", "¿Me regala eso, porfa? Mándeme captura de la factura.", "Could you pass me that, please? Send me a screenshot of the invoice.", ["¿Me regala eso, porfa?"]),
      message("m13", "laura", "Ya. Pero estoy que no doy más. Todo lo hice a la carrera.", "Done. But I can't take any more. I did everything in a rush.", ["Estoy que no doy más", "A la carrera"]),
      message("m14", "andres", "Por eso quedó vuelto nada. Pero fresco, todavía hay tiempo.", "That's why it ended up ruined. But relax, there is still time.", ["Quedó vuelto nada", "Fresco"]),
      message("m15", "laura", "No me mame gallo, Andrés. Si esto sale mal, me toca responder.", "Stop joking with me, Andrés. If this goes wrong, I'll have to answer for it.", ["No me mame gallo", "Me toca responder"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m15.mp3"),
      message("n2", "narrator", "Pausa: observa cómo Laura pasa de pánico a claridad. Primero explica la vaina, luego admite el error y después pide un cruce concreto.", "Pause: notice how Laura moves from panic to clarity. First she explains the situation, then admits the mistake, and then asks for a concrete favor.", [], "narrator"),
      message("m16", "andres", "No estoy mamando gallo. Le estoy diciendo que no coma cuento: el restaurante sí tiene otro WhatsApp.", "I'm not messing with you. I'm telling you not to fall for it: the restaurant does have another WhatsApp.", ["No me mame gallo", "No coma cuento"]),
      message("m17", "laura", "¿Cuál? Pásemelo ya.", "Which one? Send it to me now.", []),
      message("m18", "andres", "Ahí sí le paso el dato: escriba a este número y diga que es urgente.", "Now I'll send you the info: write to this number and say it's urgent.", ["Ahí sí", "Le paso el dato"]),
      message("m19", "laura", "Gracias. Y perdón por ponerme intensa.", "Thanks. And sorry for getting intense.", ["No se ponga intenso"]),
      message("m20", "andres", "Fresco. Usted tiene cara de filo horrible; seguro también es hambre.", "Relax. You look terribly hungry; it is probably hunger too.", ["Fresco", "Tiene una cara de filo horrible"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m20.mp3"),
      message("m21", "laura", "Sí, tengo filo y estrés. Mala combinación.", "Yes, I'm starving and stressed. Bad combination.", ["Tengo filo"]),
      message("m22", "andres", "No sea sapo con mi diagnóstico médico tan preciso.", "Don't be nosy about my very precise medical diagnosis.", ["No sea sapo"]),
      message("m23", "laura", "Jajaja. Bueno, ya escribí. Me toca mirar si responden rápido.", "Haha. Okay, I wrote. I need to check if they answer quickly.", ["Me toca mirar"]),
      message("m24", "andres", "Cuadre bien eso: dirección nueva, hora exacta y nombre de quien recibe.", "Sort that out properly: new address, exact time, and name of who receives it.", ["Cuadre bien eso"]),
      message("m25", "laura", "Listo. Si responden, le caigo más tarde con café como pago emocional.", "Done. If they answer, I'll come by later with coffee as emotional payment.", ["Le caigo más tarde"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m25.mp3"),
      message("m26", "andres", "Acepto. Pero no lo haga a la carrera, que después el café queda vuelto nada también.", "I accept. But don't do it in a rush, or then the coffee ends up ruined too.", ["A la carrera", "Quedó vuelto nada"]),
      message("m27", "laura", "Respondieron. Cambian la dirección y llegan en cuarenta.", "They answered. They're changing the address and arriving in forty.", []),
      message("m28", "andres", "¿Ve? No había que darle tanta vuelta.", "See? There was no need to overthink it.", ["No le dé tanta vuelta"]),
      message("m29", "laura", "Sí. La vaina estaba enredada, pero no imposible.", "Yes. The situation was messy, but not impossible.", ["La vaina está enredada"]),
      message("m30", "andres", "Ahí sí: almuerzo salvado, Laura viva y cero cuentos.", "There we go: lunch saved, Laura alive, and no nonsense.", ["Ahí sí", "No coma cuento"], "voice-note", "/audio/stories/colombian-spanish-c1-complete-local-conversation/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "colombian-c1-local-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "colombian-c1-local-check-2", afterMessageId: "m10", question: storyQuestions[1] },
      { id: "colombian-c1-local-check-3", afterMessageId: "m15", question: storyQuestions[2] },
      { id: "colombian-c1-local-check-4", afterMessageId: "m20", question: storyQuestions[3] },
      { id: "colombian-c1-local-check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: localConversationVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: localConversationVocab.map((item) => item.term),
      grammarPatterns: [
        "Polite Colombian requests: Regáleme un segundo, ¿Me regala eso, porfa?",
        "Obligation and consequence: me toca mirar, me toca responder.",
        "Problem framing: la vaina está enredada, eso quedó vuelto nada.",
        "Tone control: fresco, no se ponga intenso, no hay afán.",
      ],
      speakingPrompts: [
        "Explain a messy situation using la vaina está enredada and no le dé tanta vuelta.",
        "Ask for help with ¿Me hace un cruce? and ¿Me regala eso, porfa?",
        "Admit a mistake using la embarré, qué oso, and me toca responder.",
      ],
    },
    completionTask: {
      title: "Your complete local conversation voice note",
      instructions:
        "Record a 90-second Colombian Spanish voice note about a messy everyday problem. Use at least 12 phrases from this lesson, including one opener, one favor request, one mistake phrase, and one responsibility phrase.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "¿Quiubo, bien o qué? Venga le cuento una vaina que parece pequeña, pero en Colombia suena muy real. Laura tenía que coordinar un almuerzo para un cliente nuevo. No era un evento gigante, pero sí era de esos compromisos donde todo tiene que quedar bien: dirección, hora, comida, factura y quién recibe. Ella pensó que estaba todo listo, hasta que vio el mensaje del restaurante y se dio cuenta de que había mandado la dirección vieja.",
    translation:
      "What's up, all good? Listen, I'll tell you a situation that seems small, but sounds very real in Colombia. Laura had to coordinate a lunch for a new client. It was not a huge event, but it was one of those commitments where everything has to turn out right: address, time, food, invoice, and who receives it. She thought everything was ready, until she saw the restaurant message and realized she had sent the old address.",
    highlights: highlights(["¿Quiubo, bien o qué?", "Venga le cuento", "vaina"]),
    shadowLine: "Venga le cuento una vaina que se puso enredada.",
  },
  {
    id: "p2",
    text:
      "Lo primero que escribió fue: regáleme un segundo. Esa frase es clave porque suena amable incluso cuando uno está estresado. Después agregó: no hay afán, pero la vaina está enredada. Ahí aparece otro rasgo local: puedes decir que algo está grave sin sonar dramático. En vez de gritar, Laura explicó: la embarré, qué oso, mandé la dirección que no era.",
    translation:
      "The first thing she wrote was: give me one second. That phrase is key because it sounds polite even when you are stressed. Then she added: there is no rush, but the situation is messy. There another local feature appears: you can say something is serious without sounding dramatic. Instead of shouting, Laura explained: I messed up, how embarrassing, I sent the wrong address.",
    highlights: highlights(["Regáleme un segundo", "No hay afán", "La vaina está enredada", "La embarré", "Qué oso"]),
    shadowLine: "Regáleme un segundo; la vaina está enredada.",
  },
  {
    id: "p3",
    text:
      "Andrés, que la conoce bien, no se puso intenso. Le dijo: no le dé tanta vuelta, camine y miramos. Esa combinación es muy colombiana: primero le baja el volumen al drama y después propone acción. Cuando Laura dijo que el restaurante no contestaba, él pidió: ¿me regala eso, porfa? Mándeme la factura. En una tienda o restaurante, me regala no significa gratis; es una forma común de pedir algo.",
    translation:
      "Andrés, who knows her well, did not overreact. He said: do not overthink it, come on, let's check. That combination is very Colombian: first he lowers the drama and then proposes action. When Laura said the restaurant was not answering, he asked: could you pass me that, please? Send me the invoice. In a shop or restaurant, 'me regala' does not mean free; it is a common way to ask for something.",
    highlights: highlights(["No se ponga intenso", "No le dé tanta vuelta", "Camine y miramos", "¿Me regala eso, porfa?"]),
    shadowLine: "No le dé tanta vuelta; camine y miramos.",
  },
  {
    id: "p4",
    text:
      "La presión subió cuando Laura dijo: si esto sale mal, me toca responder. Esa frase no significa simplemente responder un mensaje; significa que la responsabilidad cae sobre ella. También dijo: esto ya me tiene mamada y estoy que no doy más. Ahí Andrés hizo lo que hacen muchos amigos cercanos: mezcló ayuda con recocha suave. Le dijo que tenía una cara de filo horrible y que tal vez necesitaba comer antes de seguir pensando.",
    translation:
      "The pressure rose when Laura said: if this goes wrong, I will have to answer for it. That phrase does not simply mean answering a message; it means the responsibility falls on her. She also said: I am fed up with this and I cannot take any more. Then Andrés did what many close friends do: he mixed help with gentle teasing. He told her she had a terrible hungry face and maybe needed to eat before continuing to think.",
    highlights: highlights(["Me toca responder", "Esto ya me tiene mamado", "Estoy que no doy más", "Tiene una cara de filo horrible", "Tengo filo"]),
    shadowLine: "Si esto sale mal, me toca responder.",
  },
  {
    id: "p5",
    text:
      "En medio del caos, también aparecen frases de confianza. No sea sapo puede ser una broma entre amigos, pero con otra persona puede sonar brusco. No me mame gallo sirve cuando alguien parece estar jugando con una situación seria. No coma cuento es distinto: se usa para advertir que alguien no debe creer una historia, una excusa o una estafa. Todas esas frases son útiles, pero dependen de la relación y del tono.",
    translation:
      "In the middle of the chaos, trust-based phrases also appear. 'Do not be nosy' can be a joke among friends, but with another person it can sound abrupt. 'Stop joking with me' works when someone seems to be playing with a serious situation. 'Do not fall for it' is different: it is used to warn that someone should not believe a story, an excuse, or a scam. All those phrases are useful, but they depend on the relationship and tone.",
    highlights: highlights(["No sea sapo", "No me mame gallo", "No coma cuento"]),
    shadowLine: "No coma cuento: no todo lo que dicen es cierto.",
  },
  {
    id: "p6",
    text:
      "Al final, Andrés le pasó el dato correcto y Laura pudo cuadrar bien eso. La comida llegó a la dirección nueva, aunque casi todo quedó vuelto nada por hacerlo a la carrera. La lección fue simple: cuando una vaina está enredada, no siempre hay que correr más. A veces toca mirar, pedir un cruce, hablar claro y moverse con calma. Ahí sí, la conversación suena local, completa y útil.",
    translation:
      "In the end, Andrés sent her the correct information and Laura was able to sort it out properly. The food arrived at the new address, although almost everything ended up ruined because it was done in a rush. The lesson was simple: when a situation is messy, you do not always have to run faster. Sometimes you need to check, ask for a favor, speak clearly, and move calmly. Then, the conversation sounds local, complete, and useful.",
    highlights: highlights(["Le paso el dato", "Cuadre bien eso", "Quedó vuelto nada", "A la carrera", "La vaina está enredada", "Me toca mirar", "¿Me hace un cruce?", "Ahí sí"]),
    shadowLine: "Ahí sí, la conversación suena local y útil.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-c1-local-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Fixing a messy everyday problem using natural Colombian phrases", "Ordering food in a formal restaurant", "Planning a vacation", "Learning only greetings"],
    correctAnswer: "Fixing a messy everyday problem using natural Colombian phrases",
    explanation: "The reading follows Laura fixing a messy catering situation with local Colombian phrasing.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-c1-local-reading-q2",
    type: "true-false",
    prompt: "In the reading, 'me regala' means the speaker expects something for free.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The reading explains that me regala is a common polite request in shops and restaurants; it does not mean free.",
    points: 1,
    skillTag: "pragmatics",
  },
  {
    id: "colombian-c1-local-reading-q3",
    type: "multiple-choice",
    prompt: "What does 'me toca responder' mean here?",
    options: ["The responsibility falls on me", "I need to answer a joke", "I am starving", "The address is old"],
    correctAnswer: "The responsibility falls on me",
    explanation: "The phrase means Laura will have to answer for the consequences if it goes wrong.",
    points: 1,
    skillTag: "responsibility",
  },
  {
    id: "colombian-c1-local-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the local action phrase.",
    wordBank: ["Camine", "y", "miramos", "la", "vaina"],
    correctAnswer: "Camine y miramos la vaina",
    explanation: "This means: come on, let's check the situation.",
    points: 2,
    skillTag: "sentence-order",
  },
  {
    id: "colombian-c1-local-reading-q5",
    type: "fill-blank",
    prompt: "Complete: No le dé tanta ______.",
    nativePrompt: "Don't overthink it.",
    correctAnswer: "vuelta",
    explanation: "No le dé tanta vuelta means do not overthink it or go around it too much.",
    points: 1,
    skillTag: "idiom",
  },
];

export const colombianSpanishC1CompleteLocalConversationReading: ReadingComprehension = {
  id: "colombian-spanish-c1-complete-local-conversation-reading",
  title: "Colombian C1 Reading: Una vaina enredada",
  subtitle: "A nuanced reading about fixing a messy local situation with natural Colombian phrasing.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading", "local conversation", "problem-solving"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Complete Local Conversation",
  relatedCourse: "colombian-spanish-c1-complete-local-conversation",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-c1-complete-local-conversation/full.mp3",
    audioAlignmentUrl: "/audio/readings/colombian-spanish-c1-complete-local-conversation/timings.json",
    paragraphs: readingParagraphs,
    glossary: localConversationVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the C1 complete local conversation vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  localConversationVocab.slice(0, 7),
  localConversationVocab.slice(7, 14),
  localConversationVocab.slice(14, 21),
  localConversationVocab.slice(21, 28),
  localConversationVocab.slice(28),
];

export const colombianSpanishC1CompleteLocalConversationQuiz: CheckpointQuiz = {
  id: "colombian-spanish-c1-complete-local-conversation-quiz",
  title: "Colombian Spanish C1: Complete Local Conversation Quiz",
  subtitle: "Practice choosing local Colombian phrases for favors, mistakes, rushed action, responsibility, and problem-solving.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "quiz", "local conversation"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - C1 Complete Local Conversation",
  relatedCourse: "colombian-spanish-c1-complete-local-conversation",
  activityType: "quiz",
  data: {
    description: "Use this after the flashcards, sentence builder, story, and reading to test complete local Colombian conversation skills.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-c1-local-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is a natural Colombian way to start explaining what happened?",
        options: ["Venga le cuento", "Paila", "Tengo filo", "No sea sapo"],
        correctAnswer: "Venga le cuento",
        explanation: "Venga le cuento opens a story or explanation naturally.",
        points: 1,
        skillTag: "opening",
      },
      {
        id: "colombian-c1-local-quiz-2",
        type: "multiple-choice",
        prompt: "You need a favor from someone. Which phrase fits best?",
        options: ["¿Me hace un cruce?", "Eso quedó vuelto nada", "Tengo filo", "No coma cuento"],
        correctAnswer: "¿Me hace un cruce?",
        explanation: "¿Me hace un cruce? asks someone to help you out.",
        points: 1,
        skillTag: "favor",
      },
      {
        id: "colombian-c1-local-quiz-3",
        type: "fill-blank",
        prompt: "Complete: La ______.",
        nativePrompt: "I messed up.",
        correctAnswer: "embarré",
        correctAnswers: ["embarré", "embarre"],
        explanation: "La embarré means I messed up.",
        points: 1,
        skillTag: "mistake",
      },
      {
        id: "colombian-c1-local-quiz-4",
        type: "true-false",
        prompt: "True or false: 'No coma cuento' warns someone not to believe a story, excuse, scam, or gossip.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "No coma cuento means do not fall for that story.",
        points: 1,
        skillTag: "warning",
      },
      {
        id: "colombian-c1-local-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        wordBank: ["No", "le", "dé", "tanta", "vuelta"],
        correctAnswer: "No le dé tanta vuelta",
        explanation: "This means do not overthink it.",
        points: 2,
        skillTag: "sentence-order",
      },
      {
        id: "colombian-c1-local-quiz-6",
        type: "multiple-choice",
        prompt: "Which phrase means the situation is messy or complicated?",
        options: ["La vaina está enredada", "Ahí sí", "Le caigo más tarde", "Fresco"],
        correctAnswer: "La vaina está enredada",
        explanation: "La vaina está enredada is a natural informal way to say the situation is messy.",
        points: 1,
        skillTag: "problem-framing",
      },
      {
        id: "colombian-c1-local-quiz-7",
        type: "multiple-choice",
        prompt: "Which phrase is risky teasing and should only be used with enough trust?",
        options: ["No sea sapo", "No hay afán", "Regáleme un segundo", "Le paso el dato"],
        correctAnswer: "No sea sapo",
        explanation: "No sea sapo can mean do not be nosy or do not snitch, and can sound offensive.",
        points: 1,
        skillTag: "register",
      },
      {
        id: "colombian-c1-local-quiz-8",
        type: "fill-blank",
        prompt: "Complete: Si lo hago a la ______, queda mal.",
        nativePrompt: "If I do it in a rush, it turns out badly.",
        correctAnswer: "carrera",
        explanation: "A la carrera means in a rush.",
        points: 1,
        skillTag: "collocation",
      },
      {
        id: "colombian-c1-local-quiz-9",
        type: "order-words",
        prompt: "Order the words to make the responsibility phrase.",
        wordBank: ["Me", "toca", "responder", "por", "eso"],
        correctAnswer: "Me toca responder por eso",
        explanation: "This means I will have to answer for that or be responsible for it.",
        points: 2,
        skillTag: "responsibility",
      },
      {
        id: "colombian-c1-local-quiz-10",
        type: "true-false",
        prompt: "True or false: '¿Me regala eso, porfa?' always means the item should be free.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "In Colombian service contexts, me regala is a polite request, not a demand for something free.",
        points: 1,
        skillTag: "pragmatics",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`colombian-c1-local-match-${index + 1}`, `Match C1 local conversation expressions set ${index + 1}.`, chunk),
      ),
    ],
  },
};
