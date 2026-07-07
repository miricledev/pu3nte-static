import type {
  CheckpointQuestion,
  CheckpointQuiz,
  FlashcardDeck,
  FlashcardItem,
  ReadingComprehension,
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

const rawVocab = [
  ["Hey, real quick...", "Oye, rapidito... / Una cosa rápida..."],
  ["Can we talk about something?", "¿Podemos hablar de algo?"],
  ["What’s up?", "¿Qué pasa? / ¿Qué hubo? / ¿Qué fue?"],
  ["Honestly...", "La verdad... / Sinceramente..."],
  ["I’ve been feeling a little off", "Me he sentido un poco raro / fuera de lugar"],
  ["I’m not mad. I’m just hurt.", "No estoy enojado/a. Solo me sentí herido/a."],
  ["I get where you’re coming from", "Entiendo tu punto / Entiendo de dónde vienes"],
  ["I hear you", "Te entiendo / Te escucho / Entiendo lo que dices"],
  ["I don’t wanna...", "No quiero..."],
  ["wanna", "want to → querer / querer hacer algo"],
  ["gonna", "going to → voy a / va a"],
  ["gotta", "have to → tengo que / hay que"],
  ["I don’t wanna leave things weird between us", "No quiero que las cosas queden raras entre nosotros"],
  ["I don’t wanna make it a whole thing", "No quiero hacer un drama de esto / No quiero agrandarlo"],
  ["That rubbed me the wrong way", "Eso me cayó mal / Eso me incomodó"],
  ["I felt brushed off", "Sentí que me ignoraste / que no me diste importancia"],
  ["For what it’s worth...", "Por lo que valga... / No sé si te sirva, pero..."],
  ["I really care about you", "De verdad me importas"],
  ["I should’ve handled that better", "Debí manejar eso mejor"],
  ["That’s on me", "Eso fue culpa mía / Eso va por mi cuenta / Eso es responsabilidad mía"],
  ["My bad", "Perdón, fue mi culpa / Mala mía"],
  ["being short with someone", "responder seco / ser cortante"],
  ["I was stressed, but that’s not an excuse", "Estaba estresado/a, pero eso no es excusa"],
  ["To be fair...", "Para ser justos... / Siendo justo..."],
  ["I gotta set a boundary here", "Tengo que poner un límite aquí"],
  ["I’m not okay with that", "Eso no me parece bien / No estoy bien con eso"],
  ["Even if you didn’t mean it", "Aunque no lo hayas hecho con mala intención"],
  ["I need some space", "Necesito espacio"],
  ["We’re good", "Estamos bien / Todo bien entre nosotros"],
  ["Traffic was a nightmare", "El tráfico estaba horrible / terrible"],
  ["running late", "ir tarde / estar retrasado"],
  ["I shouldn’t have snapped at you", "No debí hablarte así / No debí explotar contigo"],
  ["snap at someone", "responder mal / explotar / hablarle feo a alguien"],
  ["I appreciate that", "Te lo agradezco / Valoro eso"],
  ["I don’t have the bandwidth", "No tengo la energía mental / No me da la cabeza ahora"],
  ["I’m down to...", "Me apunto a... / Estoy dispuesto/a a..."],
  ["talk this through", "hablarlo bien / resolverlo hablando"],
  ["I’m not trying to win the argument", "No estoy intentando ganar la discusión"],
  ["I own my part in it", "Reconozco mi parte / Asumo mi responsabilidad"],
  ["upfront", "directo/a, claro/a, sincero/a desde el principio"],
  ["I wish I had been more upfront", "Ojalá hubiera sido más claro/a desde el principio"],
  ["awkward conversation", "conversación incómoda"],
  ["That wasn’t fair to you", "Eso no fue justo contigo"],
  ["No hard feelings", "Sin resentimientos / Sin malos rollos"],
  ["where this is going", "hacia dónde va esto"],
  ["I can’t keep doing this", "No puedo seguir con esto"],
  ["back-and-forth", "ese ida y vuelta / esa dinámica repetida"],
  ["errands", "vueltas / diligencias / mandados"],
  ["deadlines", "fechas límite / entregas"],
  ["Totally", "Total / Sí, claro / De una"],
  ["No worries", "No pasa nada / Tranquilo/a / Todo bien"],
  ["grab coffee", "tomar un café / ir por un café"],
  ["circle back", "retomarlo luego / volver al tema después"],
  ["step back for a bit", "tomar distancia por un tiempo"],
  ["I hope you get where I’m coming from", "Espero que entiendas mi punto / de dónde vengo"],
  ["Thanks for hearing me out", "Gracias por escucharme hasta el final / gracias por dejarme explicarme"],
  ["made you feel like you didn’t matter", "hacerte sentir que no importabas"],
  ["Let’s be real", "Seamos honestos / Hablemos claro"],
  ["walking on eggshells", "andar con pies de plomo / caminar sobre cáscaras de huevo"],
  ["ghost someone", "desaparecerle a alguien / dejar de responder sin explicación"],
  ["I don’t wanna ghost you", "No quiero desaparecerte / No quiero dejar de responder sin explicación"],
  ["I’d rather be upfront", "Prefiero ser claro/a / directo/a"],
  ["closure", "cierre emocional / cierre"],
  ["not a fight", "no es una pelea"],
  ["Take care of yourself", "Cuídate"],
  ["Seriously", "En serio"],
  ["Fair enough", "Justo / Está bien / Me parece razonable"],
  ["move on", "seguir adelante / pasar página"],
  ["check in", "preguntar cómo estás / estar pendiente"],
  ["I should’ve checked in", "Debí haber preguntado cómo estabas / debí haber estado más pendiente"],
  ["kind of", "como / un poco / medio"],
  ["still—", "aun así / igual"],
  ["last night", "anoche"],
  ["earlier", "antes / hace rato"],
  ["right now", "ahora mismo"],
  ["for sure", "claro / de una / seguro"],
  ["We can...", "Podemos... / Hagamos..."],
] as const;

const starredTerms = new Set([
  "I’m not mad. I’m just hurt.",
  "I don’t wanna leave things weird between us",
  "That rubbed me the wrong way",
  "I felt brushed off",
  "I gotta set a boundary here",
  "I don’t have the bandwidth",
  "I’m not trying to win the argument",
  "I own my part in it",
  "I’d rather be upfront",
  "Thanks for hearing me out",
  "I don’t wanna ghost you",
  "I should’ve checked in",
]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const emotionalHonestyVocab: VocabItem[] = rawVocab.map(([term, meaning]) => ({
  id: slugify(term),
  term,
  meaning,
  example: `In a difficult conversation, you could say: “${term}”`,
  translation: `En una conversación difícil: “${meaning}”`,
  starred: starredTerms.has(term),
}));

const emotionalHighlights = Object.fromEntries(
  emotionalHonestyVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.example }]),
);

function highlights(phrases: string[]) {
  return phrases.map((phrase) => emotionalHighlights[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
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

export const americanEnglishC1EmotionalHonestyFlashcardDeck: FlashcardDeck = {
  id: "american-english-c1-emotional-honesty-flashcards",
  title: "American English C1: Emotional Honesty & Difficult Conversations Vocab",
  subtitle: "Advanced natural phrases for boundaries, accountability, repair, closure, and emotionally honest conversations.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "emotional honesty", "difficult conversations", "speaking lesson reinforcement"],
  estimatedMinutes: 20,
  skoolSectionName: "American English - C1 Dialect Reinforcement",
  relatedCourse: "american-english-c1-emotional-honesty",
  activityType: "flashcards",
  data: {
    cards: emotionalHonestyVocab.map(cardFromVocab),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "american-c1-emotional-story-q1",
    type: "multiple-choice",
    prompt: "Why does Maya start the conversation?",
    options: ["She does not want things to stay weird between them", "She wants to cancel a trip", "She forgot a deadline", "She wants to borrow money"],
    correctAnswer: "She does not want things to stay weird between them",
    explanation: "Maya says: I don’t wanna leave things weird between us.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-c1-emotional-story-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'No estoy enojada. Solo me sentí herida.'",
    correctAnswer: "I’m not mad. I’m just hurt.",
    correctAnswers: ["I’m not mad. I’m just hurt.", "I'm not mad. I'm just hurt", "I'm not mad. I'm just hurt."],
    explanation: "This phrase separates anger from emotional hurt.",
    points: 1,
    skillTag: "emotional-precision",
  },
  {
    id: "american-c1-emotional-story-q3",
    type: "multiple-choice",
    prompt: "Which phrase does Jordan use to take responsibility?",
    options: ["I own my part in it", "I need some space", "Traffic was a nightmare", "Let’s be real"],
    correctAnswer: "I own my part in it",
    explanation: "Jordan says he owns his part and admits he should have handled it better.",
    points: 1,
    skillTag: "accountability",
  },
  {
    id: "american-c1-emotional-story-q4",
    type: "multiple-choice",
    prompt: "What boundary does Maya set?",
    options: ["She cannot keep doing the back-and-forth", "She never wants coffee", "She wants more deadlines", "She refuses closure"],
    correctAnswer: "She cannot keep doing the back-and-forth",
    explanation: "Maya says: I can’t keep doing this back-and-forth.",
    points: 1,
    skillTag: "boundary",
  },
  {
    id: "american-c1-emotional-story-q5",
    type: "multiple-choice",
    prompt: "How does the conversation end?",
    options: ["With space, closure, and no hard feelings", "With a new argument", "With ghosting", "With a party invitation"],
    correctAnswer: "With space, closure, and no hard feelings",
    explanation: "They agree to step back, move on, and end with no hard feelings.",
    points: 1,
    skillTag: "summary",
  },
];

export const americanEnglishC1EmotionalHonestyWhatsAppStory: WhatsAppStory = {
  id: "american-english-c1-emotional-honesty",
  title: "American C1 Story: No Hard Feelings",
  subtitle: "A WhatsApp-style difficult conversation about hurt feelings, accountability, boundaries, and closure.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "WhatsApp", "emotional honesty", "boundaries"],
  estimatedMinutes: 22,
  skoolSectionName: "American English - C1 Dialect Reinforcement",
  relatedCourse: "american-english-c1-emotional-honesty-flashcards",
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
      message("n1", "narrator", "Story guide: this is advanced American English for repair conversations. Notice accountability, boundaries, and soft emotional honesty.", "Guía: esto es inglés estadounidense avanzado para conversaciones de reparación. Fíjate en responsabilidad, límites y honestidad emocional suave.", [], "narrator"),
      message("m1", "maya", "Hey, real quick... Can we talk about something?", "Oye, rapidito... ¿Podemos hablar de algo?", ["Hey, real quick...", "Can we talk about something?"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m1.mp3"),
      message("m2", "jordan", "Yeah. What’s up?", "Sí. ¿Qué pasa?", ["What’s up?"]),
      message("m3", "maya", "Honestly... I’ve been feeling a little off since last night.", "La verdad... me he sentido un poco rara desde anoche.", ["Honestly...", "I’ve been feeling a little off", "last night"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m3.mp3"),
      message("m4", "maya", "I’m not mad. I’m just hurt. That rubbed me the wrong way, and I felt brushed off.", "No estoy enojada. Solo me sentí herida. Eso me cayó mal, y sentí que me ignoraste.", ["I’m not mad. I’m just hurt.", "That rubbed me the wrong way", "I felt brushed off"]),
      message("m5", "jordan", "I hear you. I get where you’re coming from.", "Te entiendo. Entiendo tu punto.", ["I hear you", "I get where you’re coming from"]),
      message("m6", "maya", "I don’t wanna leave things weird between us, and I don’t wanna make it a whole thing.", "No quiero que las cosas queden raras entre nosotros, y no quiero hacer un drama de esto.", ["I don’t wanna leave things weird between us", "I don’t wanna make it a whole thing", "I don’t wanna...", "wanna"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m6.mp3"),
      message("m7", "jordan", "For what it’s worth... I really care about you.", "Por lo que valga... de verdad me importas.", ["For what it’s worth...", "I really care about you"]),
      message("m8", "jordan", "I should’ve handled that better. That’s on me. My bad.", "Debí manejar eso mejor. Eso fue culpa mía. Mala mía.", ["I should’ve handled that better", "That’s on me", "My bad"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m8.mp3"),
      message("m9", "jordan", "I was stressed, but that’s not an excuse for being short with someone.", "Estaba estresado, pero eso no es excusa para ser cortante.", ["I was stressed, but that’s not an excuse", "being short with someone"]),
      message("m10", "maya", "To be fair... traffic was a nightmare, you were running late, and you had deadlines.", "Para ser justos... el tráfico estaba horrible, ibas tarde y tenías fechas límite.", ["To be fair...", "Traffic was a nightmare", "running late", "deadlines"]),
      message("m11", "maya", "Still— I gotta set a boundary here. I’m not okay with that, even if you didn’t mean it.", "Aun así, tengo que poner un límite aquí. Eso no me parece bien, aunque no lo hayas hecho con mala intención.", ["still—", "I gotta set a boundary here", "gotta", "I’m not okay with that", "Even if you didn’t mean it"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m11.mp3"),
      message("m12", "jordan", "Totally. I shouldn’t have snapped at you.", "Total. No debí hablarte así.", ["Totally", "I shouldn’t have snapped at you", "snap at someone"]),
      message("m13", "maya", "I appreciate that. Right now, I don’t have the bandwidth to talk this through for hours.", "Te lo agradezco. Ahora mismo, no tengo la energía mental para hablarlo durante horas.", ["I appreciate that", "right now", "I don’t have the bandwidth", "talk this through"]),
      message("m14", "jordan", "No worries. I’m down to circle back tomorrow or grab coffee this weekend.", "No pasa nada. Me apunto a retomarlo mañana o tomar un café este fin de semana.", ["No worries", "I’m down to...", "circle back", "grab coffee"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m14.mp3"),
      message("m15", "maya", "I’m not trying to win the argument. I own my part in it too.", "No estoy intentando ganar la discusión. También reconozco mi parte.", ["I’m not trying to win the argument", "I own my part in it"]),
      message("m16", "maya", "I wish I had been more upfront earlier instead of turning this into an awkward conversation now.", "Ojalá hubiera sido más clara antes en vez de convertir esto en una conversación incómoda ahora.", ["I wish I had been more upfront", "upfront", "earlier", "awkward conversation"]),
      message("m17", "jordan", "That wasn’t fair to you. Seriously.", "Eso no fue justo contigo. En serio.", ["That wasn’t fair to you", "Seriously"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m17.mp3"),
      message("m18", "maya", "Let’s be real: I can’t keep doing this back-and-forth or wondering where this is going.", "Seamos honestos: no puedo seguir con este ida y vuelta ni preguntándome hacia dónde va esto.", ["Let’s be real", "I can’t keep doing this", "back-and-forth", "where this is going"]),
      message("m19", "maya", "It makes me feel like I’m walking on eggshells.", "Me hace sentir como si anduviera con pies de plomo.", ["walking on eggshells"]),
      message("m20", "jordan", "I should’ve checked in. I never wanted to make you feel like you didn’t matter.", "Debí haber preguntado cómo estabas. Nunca quise hacerte sentir que no importabas.", ["I should’ve checked in", "check in", "made you feel like you didn’t matter"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m20.mp3"),
      message("m21", "maya", "I don’t wanna ghost you. I’d rather be upfront and get closure.", "No quiero desaparecerte. Prefiero ser clara y tener cierre.", ["I don’t wanna ghost you", "ghost someone", "I’d rather be upfront", "closure"]),
      message("m22", "jordan", "Fair enough. This is not a fight. We can step back for a bit and move on with no hard feelings.", "Está bien. Esto no es una pelea. Podemos tomar distancia por un tiempo y seguir adelante sin resentimientos.", ["Fair enough", "not a fight", "We can...", "step back for a bit", "move on", "No hard feelings"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m22.mp3"),
      message("m23", "maya", "For sure. I hope you get where I’m coming from.", "Claro. Espero que entiendas mi punto.", ["for sure", "I hope you get where I’m coming from"]),
      message("m24", "jordan", "I do. Thanks for hearing me out. Take care of yourself.", "Sí. Gracias por escucharme hasta el final. Cuídate.", ["Thanks for hearing me out", "Take care of yourself"], "voice-note", "/audio/stories/american-english-c1-emotional-honesty/m24.mp3"),
      message("m25", "nina", "That was kind of painful to read, but also really mature.", "Eso fue un poco doloroso de leer, pero también muy maduro.", ["kind of"]),
      message("m26", "maya", "Yeah. Gonna be sad for a bit, but we’re good.", "Sí. Voy a estar triste un tiempo, pero estamos bien.", ["gonna", "We’re good"]),
    ],
    comprehensionChecks: [
      { id: "american-c1-emotional-check-1", afterMessageId: "m6", question: storyQuestions[0] },
      { id: "american-c1-emotional-check-2", afterMessageId: "m8", question: storyQuestions[1] },
      { id: "american-c1-emotional-check-3", afterMessageId: "m15", question: storyQuestions[2] },
      { id: "american-c1-emotional-check-4", afterMessageId: "m22", question: storyQuestions[3] },
      { id: "american-c1-emotional-check-5", afterMessageId: "m26", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: emotionalHonestyVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: emotionalHonestyVocab.map((item) => item.term),
      grammarPatterns: [
        "Emotional precision: I’m not mad. I’m just hurt.",
        "Accountability: That’s on me, I own my part in it, I should’ve handled that better.",
        "Boundary setting: I gotta set a boundary here, I’m not okay with that, I need some space.",
        "Repair and closure: talk this through, circle back, closure, no hard feelings.",
        "Casual reductions in serious contexts: wanna, gonna, gotta.",
      ],
      speakingPrompts: [
        "Start a difficult conversation without sounding dramatic.",
        "Take responsibility for being short with someone.",
        "Set a boundary while making it clear the conversation is not a fight.",
        "Ask for space and closure without ghosting someone.",
      ],
    },
    completionTask: {
      title: "Your emotionally honest repair message",
      instructions:
        "Write or record a message where you name one hurt feeling, own one part, set one boundary, and end with either repair or closure. Use at least 20 phrases from this lesson.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Hey, real quick... Can we talk about something? That sentence can feel tiny, but in American English it often opens the door to a serious conversation. Last night, I texted Jordan because honestly... I’ve been feeling a little off. I did not want to sound dramatic, so I said, I’m not mad. I’m just hurt. That was the most accurate sentence I had.",
    translation:
      "Oye, rapidito... ¿Podemos hablar de algo? Esa frase puede parecer pequeña, pero en inglés estadounidense suele abrir la puerta a una conversación seria. Anoche le escribí a Jordan porque la verdad me he sentido un poco raro. No quería sonar dramática, así que dije: No estoy enojada. Solo me sentí herida. Esa era la frase más precisa que tenía.",
    highlights: highlights(["Hey, real quick...", "Can we talk about something?", "last night", "Honestly...", "I’ve been feeling a little off", "I’m not mad. I’m just hurt."]),
    shadowLine: "I’m not mad. I’m just hurt.",
  },
  {
    id: "p2",
    text:
      "He answered, What’s up? I told him, I get where you’re coming from, and I hear you, but I don’t wanna leave things weird between us. I don’t wanna make it a whole thing either. Still, what happened earlier rubbed me the wrong way. I felt brushed off, and for what it’s worth... I really care about you, so I would rather say it than pretend everything is fine.",
    translation:
      "Él respondió: ¿Qué pasa? Le dije: Entiendo tu punto, y te escucho, pero no quiero que las cosas queden raras entre nosotros. Tampoco quiero hacer un drama de esto. Aun así, lo que pasó antes me cayó mal. Sentí que me ignoraste, y por lo que valga, de verdad me importas, así que prefiero decirlo antes que fingir que todo está bien.",
    highlights: highlights(["What’s up?", "I get where you’re coming from", "I hear you", "I don’t wanna...", "I don’t wanna leave things weird between us", "I don’t wanna make it a whole thing", "still—", "earlier", "That rubbed me the wrong way", "I felt brushed off", "For what it’s worth...", "I really care about you"]),
    shadowLine: "I don’t wanna leave things weird between us.",
  },
  {
    id: "p3",
    text:
      "Jordan did not get defensive. He said, I should’ve handled that better. That’s on me. My bad. He admitted that he had been short with someone because traffic was a nightmare, he was running late, and he had deadlines. Then he added, I was stressed, but that’s not an excuse. To be fair... that kind of accountability made the awkward conversation easier.",
    translation:
      "Jordan no se puso a la defensiva. Dijo: Debí manejar eso mejor. Eso fue culpa mía. Mala mía. Admitió que había sido cortante con alguien porque el tráfico estaba horrible, iba tarde y tenía entregas. Luego añadió: Estaba estresado, pero eso no es excusa. Para ser justos, ese tipo de responsabilidad hizo que la conversación incómoda fuera más fácil.",
    highlights: highlights(["I should’ve handled that better", "That’s on me", "My bad", "being short with someone", "Traffic was a nightmare", "running late", "deadlines", "I was stressed, but that’s not an excuse", "To be fair...", "kind of", "awkward conversation"]),
    shadowLine: "I was stressed, but that’s not an excuse.",
  },
  {
    id: "p4",
    text:
      "Then I said the hard part: I gotta set a boundary here. I’m not okay with that, even if you didn’t mean it. I need some space right now. He said, Totally. I shouldn’t have snapped at you. Nobody wants to hear that they snapped at someone, but saying it clearly helped. I appreciate that was my honest response.",
    translation:
      "Luego dije la parte difícil: Tengo que poner un límite aquí. Eso no me parece bien, aunque no lo hayas hecho con mala intención. Necesito espacio ahora mismo. Él dijo: Total. No debí hablarte así. Nadie quiere escuchar que explotó con alguien, pero decirlo claramente ayudó. Te lo agradezco fue mi respuesta honesta.",
    highlights: highlights(["I gotta set a boundary here", "gotta", "I’m not okay with that", "Even if you didn’t mean it", "I need some space", "right now", "Totally", "I shouldn’t have snapped at you", "snap at someone", "I appreciate that"]),
    shadowLine: "I gotta set a boundary here.",
  },
  {
    id: "p5",
    text:
      "I told him I don’t have the bandwidth to talk this through for hours. He said, No worries. I’m down to grab coffee later, or we can circle back after we both step back for a bit. I liked that. He understood I was not trying to win the argument. I own my part in it too, I said. I wish I had been more upfront.",
    translation:
      "Le dije que no tengo la energía mental para hablarlo durante horas. Él dijo: No pasa nada. Me apunto a tomar un café luego, o podemos retomarlo después de que ambos tomemos distancia un tiempo. Eso me gustó. Entendió que yo no estaba intentando ganar la discusión. También reconozco mi parte, dije. Ojalá hubiera sido más clara desde el principio.",
    highlights: highlights(["I don’t have the bandwidth", "talk this through", "No worries", "I’m down to...", "grab coffee", "We can...", "circle back", "step back for a bit", "I’m not trying to win the argument", "I own my part in it", "I wish I had been more upfront", "upfront"]),
    shadowLine: "I’m not trying to win the argument.",
  },
  {
    id: "p6",
    text:
      "The deeper truth was that I did not know where this is going anymore. Let’s be real: I can’t keep doing this back-and-forth. It had me walking on eggshells. I did not want to ghost someone, and I told him directly: I don’t wanna ghost you. I’d rather be upfront and get closure, even if closure is uncomfortable.",
    translation:
      "La verdad más profunda era que ya no sabía hacia dónde va esto. Seamos honestos: no puedo seguir con este ida y vuelta. Me tenía andando con pies de plomo. No quería desaparecerle a alguien, y se lo dije directamente: No quiero desaparecerte. Prefiero ser clara y tener cierre, aunque el cierre sea incómodo.",
    highlights: highlights(["where this is going", "Let’s be real", "I can’t keep doing this", "back-and-forth", "walking on eggshells", "ghost someone", "I don’t wanna ghost you", "wanna", "I’d rather be upfront", "closure"]),
    shadowLine: "I’d rather be upfront and get closure.",
  },
  {
    id: "p7",
    text:
      "He said, This is not a fight. No hard feelings. We can move on, but I should’ve checked in. I never meant to make you feel like you didn’t matter. I replied, I hope you get where I’m coming from. Thanks for hearing me out. Take care of yourself. Seriously. By the end, we were not pretending to be perfect. We were just honest. We’re good, in a quieter way.",
    translation:
      "Él dijo: Esto no es una pelea. Sin resentimientos. Podemos seguir adelante, pero debí haber preguntado cómo estabas. Nunca quise hacerte sentir que no importabas. Respondí: Espero que entiendas mi punto. Gracias por escucharme hasta el final. Cuídate. En serio. Al final, no fingíamos ser perfectos. Solo fuimos honestos. Estamos bien, de una forma más tranquila.",
    highlights: highlights(["not a fight", "No hard feelings", "move on", "I should’ve checked in", "check in", "made you feel like you didn’t matter", "I hope you get where I’m coming from", "Thanks for hearing me out", "Take care of yourself", "Seriously", "We’re good"]),
    shadowLine: "Thanks for hearing me out.",
  },
  {
    id: "p8",
    text:
      "For sure, conversations like this are heavy. You are gonna feel awkward. You are gonna second-guess yourself. But if you can be clear, own your part, and set a boundary without turning everything into a fight, you can protect the relationship or end it with respect. Fair enough does not always mean agreement. Sometimes it means: I understand, and we can leave it here.",
    translation:
      "Claro, conversaciones como esta pesan. Vas a sentirte incómodo. Vas a dudar de ti mismo. Pero si puedes ser claro, asumir tu parte y poner un límite sin convertir todo en una pelea, puedes proteger la relación o terminarla con respeto. Fair enough no siempre significa acuerdo. A veces significa: entiendo, y podemos dejarlo aquí.",
    highlights: highlights(["for sure", "gonna", "Fair enough", "We can..."]),
    shadowLine: "Fair enough. We can leave it here.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "american-c1-emotional-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Having an emotionally honest repair conversation", "Planning errands and deadlines", "Winning an argument", "Avoiding all awkward conversations"],
    correctAnswer: "Having an emotionally honest repair conversation",
    explanation: "The reading focuses on hurt feelings, accountability, boundaries, and closure.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-c1-emotional-reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'Prefiero ser claro/a'.",
    correctAnswer: "I’d rather be upfront",
    correctAnswers: ["I’d rather be upfront", "I'd rather be upfront"],
    explanation: "This phrase means you prefer direct honesty over avoidance.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "american-c1-emotional-reading-q3",
    type: "multiple-choice",
    prompt: "What does 'I don’t have the bandwidth' mean here?",
    options: ["I do not have the mental energy", "My internet is broken", "I forgot the deadline", "I want to win"],
    correctAnswer: "I do not have the mental energy",
    explanation: "Bandwidth is used metaphorically for emotional or mental capacity.",
    points: 1,
    skillTag: "idiom",
  },
  {
    id: "american-c1-emotional-reading-q4",
    type: "true-false",
    prompt: "The speaker wants to ghost Jordan instead of being upfront.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "The speaker says: I don’t wanna ghost you. I’d rather be upfront.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "american-c1-emotional-reading-q5",
    type: "order-words",
    prompt: "Order the words to make the accountability phrase.",
    wordBank: ["I", "own", "my", "part", "in", "it"],
    correctAnswer: "I own my part in it",
    explanation: "This phrase clearly accepts responsibility for your side of the conflict.",
    points: 1,
    skillTag: "sentence-order",
  },
];

export const americanEnglishC1EmotionalHonestyReading: ReadingComprehension = {
  id: "american-english-c1-reading-emotional-honesty",
  title: "American C1 Reading: The Conversation We Stopped Avoiding",
  subtitle: "A long first-person reading with advanced emotional repair language, synced audio, and comprehension checks.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "reading", "emotional honesty", "boundaries"],
  estimatedMinutes: 22,
  skoolSectionName: "American English - C1 Dialect Reinforcement",
  relatedCourse: "american-english-c1-emotional-honesty",
  activityType: "reading",
  data: {
    targetLanguage: "english",
    audioUrl: "/audio/readings/american-english-c1-reading-emotional-honesty/full.mp3",
    audioAlignmentUrl: "/audio/readings/american-english-c1-reading-emotional-honesty/timings.json",
    paragraphs: readingParagraphs,
    glossary: emotionalHonestyVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the C1 emotional honesty speaking lesson vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  emotionalHonestyVocab.slice(0, 11),
  emotionalHonestyVocab.slice(11, 22),
  emotionalHonestyVocab.slice(22, 33),
  emotionalHonestyVocab.slice(33, 44),
  emotionalHonestyVocab.slice(44, 55),
  emotionalHonestyVocab.slice(55, 66),
  emotionalHonestyVocab.slice(66),
];

export const americanEnglishC1EmotionalHonestyQuiz: CheckpointQuiz = {
  id: "american-english-c1-emotional-honesty-quiz",
  title: "American English C1: Emotional Honesty Quiz",
  subtitle: "Practice nuanced phrases for hurt feelings, repair, accountability, boundaries, space, and closure.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "advanced",
  tags: ["American English", "C1", "quiz", "emotional honesty", "difficult conversations"],
  estimatedMinutes: 22,
  skoolSectionName: "American English - C1 Dialect Reinforcement",
  relatedCourse: "american-english-c1-emotional-honesty",
  activityType: "quiz",
  data: {
    description:
      "Use this after the flashcards, story, and reading to test advanced emotional honesty language from the speaking lesson.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "american-c1-emotional-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase sets a boundary most directly?",
        options: ["I gotta set a boundary here", "What’s up?", "errands", "Totally"],
        correctAnswer: "I gotta set a boundary here",
        explanation: "This phrase explicitly introduces a personal limit.",
        points: 1,
        skillTag: "boundary",
      },
      {
        id: "american-c1-emotional-quiz-2",
        type: "fill-blank",
        prompt: "Complete: I’m not trying to win the ______.",
        correctAnswer: "argument",
        explanation: "This phrase reframes the conversation as repair, not competition.",
        points: 1,
        skillTag: "repair",
      },
      {
        id: "american-c1-emotional-quiz-3",
        type: "typed",
        prompt: "Type the phrase meaning 'Debí manejar eso mejor'.",
        correctAnswer: "I should’ve handled that better",
        correctAnswers: ["I should’ve handled that better", "I should've handled that better"],
        explanation: "This phrase shows accountability and regret.",
        points: 1,
        skillTag: "accountability",
      },
      {
        id: "american-c1-emotional-quiz-4",
        type: "multiple-choice",
        prompt: "Which phrase means avoiding someone by disappearing?",
        options: ["ghost someone", "circle back", "grab coffee", "check in"],
        correctAnswer: "ghost someone",
        explanation: "To ghost someone means to stop responding without explanation.",
        points: 1,
        skillTag: "idiom",
      },
      {
        id: "american-c1-emotional-quiz-5",
        type: "order-words",
        prompt: "Order the words to make the repair phrase.",
        wordBank: ["Thanks", "for", "hearing", "me", "out"],
        correctAnswer: "Thanks for hearing me out",
        explanation: "This phrase thanks someone for listening through a difficult explanation.",
        points: 1,
        skillTag: "sentence-order",
      },
      ...vocabChunks.map((items, index) => pairQuestion(`american-c1-emotional-pairs-${index + 1}`, `Match C1 emotional honesty vocab set ${index + 1}.`, items)),
    ],
  },
};
