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

const agreementVocab: VocabItem[] = [
  { id: "hey-quick-question", term: "Hey, quick question", meaning: "Oye, una pregunta rápida", example: "Hey, quick question: are we still picking the rooftop spot?", translation: "Oye, una pregunta rápida: ¿todavía vamos a escoger el lugar de la terraza?", starred: true },
  { id: "honestly", term: "Honestly", meaning: "Sinceramente / La verdad", example: "Honestly, I think the place is kind of overpriced.", translation: "La verdad, creo que el lugar es un poco caro para lo que es.", starred: true },
  { id: "my-take-is", term: "My take is…", meaning: "Mi opinión es… / Yo lo veo así…", example: "My take is… we should keep it casual.", translation: "Mi opinión es… deberíamos mantenerlo casual.", starred: true },
  { id: "it-depends", term: "It depends", meaning: "Depende", example: "It depends on how many people are actually coming.", translation: "Depende de cuánta gente realmente vaya." },
  { id: "fair-point", term: "Fair point", meaning: "Buen punto / Punto válido", example: "Fair point. The location is better than the cheaper spots.", translation: "Buen punto. La ubicación es mejor que los lugares más baratos.", starred: true },
  { id: "thats-a-fair-point", term: "That’s a fair point", meaning: "Ese es un buen punto", example: "That’s a fair point, but fifty bucks is still a lot.", translation: "Ese es un buen punto, pero cincuenta dólares sigue siendo mucho." },
  { id: "im-with-you-on-that", term: "I’m with you on that", meaning: "Estoy de acuerdo contigo en eso", example: "I’m with you on that. We need somewhere easy.", translation: "Estoy de acuerdo contigo en eso. Necesitamos un sitio fácil.", starred: true },
  { id: "im-with-you-on-that-part", term: "I’m with you on that part", meaning: "Estoy de acuerdo contigo en esa parte", example: "I’m with you on that part, but not on the price.", translation: "Estoy de acuerdo contigo en esa parte, pero no en el precio." },
  { id: "stay-on-the-same-page", term: "Stay on the same page", meaning: "Estar alineados / estar en la misma página", example: "Let’s stay on the same page before we book it.", translation: "Mantengámonos alineados antes de reservar." },
  { id: "were-on-the-same-page", term: "We’re on the same page", meaning: "Estamos de acuerdo / estamos alineados", example: "Okay, we’re on the same page about the budget.", translation: "Bueno, estamos alineados sobre el presupuesto.", starred: true },
  { id: "i-hear-you", term: "I hear you", meaning: "Te entiendo / entiendo tu punto", example: "I hear you. You want a nicer place.", translation: "Te entiendo. Quieres un lugar más bonito.", starred: true },
  { id: "i-get-what-youre-saying", term: "I get what you’re saying", meaning: "Entiendo lo que quieres decir", example: "I get what you’re saying, but I still think it is too expensive.", translation: "Entiendo lo que quieres decir, pero sigo pensando que es demasiado caro." },
  { id: "i-see-what-you-mean", term: "I see what you mean", meaning: "Ya veo lo que quieres decir", example: "I see what you mean about the vibe.", translation: "Ya veo lo que quieres decir sobre el ambiente." },
  { id: "i-see-it-differently", term: "I see it a little differently", meaning: "Yo lo veo un poco diferente", example: "I see it a little differently because people are watching their money.", translation: "Yo lo veo un poco diferente porque la gente está cuidando su dinero.", starred: true },
  { id: "i-hear-you-but", term: "I hear you, but…", meaning: "Te entiendo, pero…", example: "I hear you, but we do not need the fancy package.", translation: "Te entiendo, pero no necesitamos el paquete elegante." },
  { id: "heres-the-thing", term: "Here’s the thing…", meaning: "La cosa es que… / El tema es que…", example: "Here’s the thing… the place is awesome, but the menu is overpriced.", translation: "La cosa es que… el lugar es buenísimo, pero el menú es demasiado caro.", starred: true },
  { id: "doesnt-work-that-way", term: "It doesn’t always work that way", meaning: "No siempre funciona así", example: "It doesn’t always work that way with big groups.", translation: "No siempre funciona así con grupos grandes." },
  { id: "not-totally-sold", term: "I’m not totally sold on that", meaning: "No estoy totalmente convencido de eso", example: "I’m not totally sold on that plan.", translation: "No estoy totalmente convencido de ese plan.", starred: true },
  { id: "awesome", term: "Awesome", meaning: "Buenísimo / genial / brutal", example: "The patio looks awesome.", translation: "El patio se ve buenísimo." },
  { id: "place-is-awesome", term: "The place is awesome", meaning: "El lugar es buenísimo", example: "The place is awesome, for sure.", translation: "El lugar es buenísimo, seguro." },
  { id: "kind-of", term: "Kind of", meaning: "Un poco / como que / medio", example: "It is kind of far from everyone.", translation: "Está un poco lejos para todos." },
  { id: "kind-of-overpriced", term: "It’s kind of overpriced", meaning: "Es un poco caro para lo que es", example: "It’s kind of overpriced for a casual dinner.", translation: "Es un poco caro para una cena casual.", starred: true },
  { id: "overpriced", term: "Overpriced", meaning: "Demasiado caro / sobrevalorado en precio", example: "That brunch place is overpriced.", translation: "Ese lugar de brunch es demasiado caro." },
  { id: "at-the-same-time", term: "At the same time…", meaning: "Al mismo tiempo… / Pero también…", example: "At the same time… the location is convenient.", translation: "Al mismo tiempo… la ubicación es conveniente.", starred: true },
  { id: "true-but", term: "True, but…", meaning: "Es verdad, pero…", example: "True, but we still need to think about the budget.", translation: "Es verdad, pero igual tenemos que pensar en el presupuesto." },
  { id: "wouldnt-say-that-exactly", term: "I wouldn’t say that exactly", meaning: "No lo diría exactamente así", example: "I wouldn’t say that exactly; I just think it is risky.", translation: "No lo diría exactamente así; solo creo que es arriesgado." },
  { id: "wouldnt-say-worth", term: "I wouldn’t say it was worth…", meaning: "No diría que valía…", example: "I wouldn’t say it was worth fifty bucks.", translation: "No diría que valía cincuenta dólares." },
  { id: "bucks", term: "Bucks", meaning: "Dólares, informal", example: "Twenty bucks is fine; fifty bucks is a lot.", translation: "Veinte dólares está bien; cincuenta dólares es mucho." },
  { id: "fifty-bucks", term: "Fifty bucks", meaning: "Cincuenta dólares", example: "Fifty bucks for dinner is not cheap.", translation: "Cincuenta dólares por cena no es barato." },
  { id: "fair-enough", term: "Fair enough", meaning: "Vale / está bien / tiene sentido", example: "Fair enough. Let’s pick a cheaper spot.", translation: "Vale. Escojamos un lugar más barato.", starred: true },
  { id: "pick-cheaper-spot", term: "Pick a cheaper spot", meaning: "Escoger un lugar más barato", example: "We should probably pick a cheaper spot.", translation: "Probablemente deberíamos escoger un lugar más barato." },
  { id: "spot", term: "Spot", meaning: "Lugar / sitio", example: "That taco spot is close to the train.", translation: "Ese lugar de tacos está cerca del tren." },
  { id: "sounds-good-to-me", term: "Sounds good to me", meaning: "Me parece bien / suena bien para mí", example: "Sounds good to me if everyone agrees.", translation: "Me parece bien si todos están de acuerdo.", starred: true },
  { id: "could-be-wrong", term: "I could be wrong, but…", meaning: "Puede que me equivoque, pero…", example: "I could be wrong, but the intro feels too long.", translation: "Puede que me equivoque, pero la introducción se siente demasiado larga." },
  { id: "different-take", term: "I have a different take", meaning: "Tengo otra opinión / lo veo diferente", example: "I have a different take on the video.", translation: "Tengo otra opinión sobre el video.", starred: true },
  { id: "push-back-little", term: "I’d push back a little on that", meaning: "Discreparía un poco con eso", example: "I’d push back a little on that because the intro explains the problem.", translation: "Discreparía un poco con eso porque la intro explica el problema.", starred: true },
  { id: "push-back-on-something", term: "Push back on something", meaning: "Cuestionar / discrepar / oponerse suavemente", example: "It is okay to push back on something politely.", translation: "Está bien discrepar con algo de forma educada." },
  { id: "to-be-fair", term: "To be fair…", meaning: "Para ser justos… / siendo justo…", example: "To be fair… the first version was clearer.", translation: "Para ser justos… la primera versión era más clara." },
  { id: "see-other-side", term: "I do see the other side", meaning: "Sí entiendo la otra postura", example: "I do see the other side, but I still prefer the shorter cut.", translation: "Sí entiendo la otra postura, pero aún prefiero el corte más corto." },
  { id: "other-side", term: "The other side", meaning: "La otra postura / el otro punto de vista", example: "The other side is that the long intro gives context.", translation: "La otra postura es que la intro larga da contexto." },
  { id: "agree-up-to-point", term: "I agree up to a point", meaning: "Estoy de acuerdo hasta cierto punto", example: "I agree up to a point, but we need a clearer ending.", translation: "Estoy de acuerdo hasta cierto punto, pero necesitamos un final más claro.", starred: true },
  { id: "not-against-idea", term: "I’m not against the idea", meaning: "No estoy en contra de la idea", example: "I’m not against the idea; I just want a smaller version.", translation: "No estoy en contra de la idea; solo quiero una versión más pequeña." },
  { id: "i-just-think", term: "I just think…", meaning: "Solo creo que…", example: "I just think we gotta think it through.", translation: "Solo creo que tenemos que pensarlo bien." },
  { id: "gotta", term: "Gotta", meaning: "Tengo que / tenemos que, reducción casual de got to", example: "We gotta decide today.", translation: "Tenemos que decidir hoy.", starred: true },
  { id: "think-through", term: "We gotta think it through", meaning: "Tenemos que pensarlo bien", example: "We gotta think it through before spending the money.", translation: "Tenemos que pensarlo bien antes de gastar el dinero." },
  { id: "think-it-through", term: "Think it through", meaning: "Pensarlo bien / analizarlo bien", example: "Let’s think it through and not rush.", translation: "Pensémoslo bien y no nos apresuremos." },
  { id: "what-do-you-mean", term: "What do you mean by that?", meaning: "¿Qué quieres decir con eso?", example: "What do you mean by that? Too formal or too long?", translation: "¿Qué quieres decir con eso? ¿Demasiado formal o demasiado largo?", starred: true },
  { id: "say-more", term: "Can you say a little more about that?", meaning: "¿Puedes explicar un poco más eso?", example: "Can you say a little more about that? I want to understand.", translation: "¿Puedes explicar un poco más eso? Quiero entender." },
  { id: "not-gonna-lie", term: "Not gonna lie", meaning: "La verdad / no te voy a mentir", example: "Not gonna lie, I like the short intro.", translation: "La verdad, me gusta la introducción corta.", starred: true },
  { id: "gonna", term: "Gonna", meaning: "Voy a / vas a / va a, reducción casual de going to", example: "I’m gonna send both versions.", translation: "Voy a mandar ambas versiones." },
  { id: "not-gonna-lie-i-think", term: "Not gonna lie, I think…", meaning: "La verdad, creo que…", example: "Not gonna lie, I think the second version is stronger.", translation: "La verdad, creo que la segunda versión es más fuerte." },
  { id: "kind-of-agree", term: "I kind of agree", meaning: "Estoy medio de acuerdo / estoy un poco de acuerdo", example: "I kind of agree with cutting the intro.", translation: "Estoy medio de acuerdo con recortar la introducción." },
  { id: "we-should-probably", term: "We should probably…", meaning: "Probablemente deberíamos…", example: "We should probably vote before booking.", translation: "Probablemente deberíamos votar antes de reservar." },
  { id: "cut-the-intro", term: "Cut the intro", meaning: "Recortar / quitar la introducción", example: "Maybe we should cut the intro by ten seconds.", translation: "Quizá deberíamos recortar la introducción diez segundos.", starred: true },
  { id: "at-end-of-day", term: "At the end of the day…", meaning: "Al final del día / en últimas / al final", example: "At the end of the day… we need something everyone can afford.", translation: "Al final del día… necesitamos algo que todos puedan pagar.", starred: true },
  { id: "for-sure", term: "For sure", meaning: "Seguro / claro / de una", example: "For sure. I can message the group.", translation: "Claro. Puedo escribirle al grupo." },
  { id: "agree-to-disagree", term: "We can agree to disagree", meaning: "Podemos aceptar que no estamos de acuerdo", example: "We can agree to disagree about the rooftop.", translation: "Podemos aceptar que no estamos de acuerdo sobre la terraza.", starred: true },
  { id: "im-down-to", term: "I’m down to…", meaning: "Me apunto a… / estoy dispuesto a…", example: "I’m down to try the cheaper place.", translation: "Me apunto a probar el lugar más barato." },
  { id: "down-to-go-out", term: "I’m down to go out", meaning: "Me apunto a salir", example: "I’m down to go out, just not somewhere expensive.", translation: "Me apunto a salir, solo no a un lugar caro.", starred: true },
  { id: "wanna", term: "Wanna", meaning: "Quiero / quieres, reducción casual de want to", example: "Do you wanna ask the others?", translation: "¿Quieres preguntarles a los demás?" },
  { id: "dont-wanna", term: "I don’t wanna…", meaning: "No quiero…", example: "I don’t wanna spend a ton of money.", translation: "No quiero gastar un montón de dinero.", starred: true },
  { id: "spend-ton-money", term: "Spend a ton of money", meaning: "Gastar un montón de plata/dinero", example: "Nobody wants to spend a ton of money on Tuesday.", translation: "Nadie quiere gastar un montón de dinero un martes." },
  { id: "ton-of-money", term: "A ton of money", meaning: "Muchísima plata / mucho dinero", example: "That is a ton of money for snacks.", translation: "Eso es muchísima plata por snacks." },
  { id: "no-worries", term: "No worries", meaning: "No pasa nada / tranquilo", example: "No worries if you disagree.", translation: "No pasa nada si no estás de acuerdo.", starred: true },
  { id: "either-way-fine", term: "Either way is fine with me", meaning: "De cualquier forma me parece bien", example: "Either way is fine with me as long as we decide today.", translation: "De cualquier forma me parece bien siempre que decidamos hoy." },
  { id: "mostly-same-page", term: "Mostly on the same page", meaning: "Más o menos estamos de acuerdo / casi estamos alineados", example: "We are mostly on the same page now.", translation: "Ya estamos más o menos de acuerdo.", starred: true },
  { id: "if-not-fully-agree", term: "If we don’t fully agree, no worries", meaning: "Si no estamos totalmente de acuerdo, no pasa nada", example: "If we don’t fully agree, no worries. We can still pick something.", translation: "Si no estamos totalmente de acuerdo, no pasa nada. Igual podemos escoger algo." },
];

const agreementHighlights = Object.fromEntries(
  agreementVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.example }]),
);

function highlights(phrases: string[]) {
  return phrases.map((phrase) => agreementHighlights[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
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

export const americanEnglishB2AgreementsFlashcardDeck: FlashcardDeck = {
  id: "american-english-b2-agreements-opinions-flashcards",
  title: "American English B2: Agreements, Opinions & Disagreement Vocab",
  subtitle: "Colloquial chunks for agreeing, pushing back politely, clarifying, and making group decisions.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "upper-intermediate",
  tags: ["American English", "B2", "opinions", "disagreement", "speaking lesson reinforcement"],
  estimatedMinutes: 18,
  skoolSectionName: "American English - B2 Dialect Reinforcement",
  relatedCourse: "american-english-b2-agreements-opinions",
  activityType: "flashcards",
  data: {
    cards: agreementVocab.map(cardFromVocab),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "american-agreements-story-q1",
    type: "multiple-choice",
    prompt: "Why is Maya unsure about the rooftop spot?",
    options: ["It is kind of overpriced", "It is closed", "Nobody likes tacos", "It is too quiet"],
    correctAnswer: "It is kind of overpriced",
    explanation: "Maya says the place is awesome, but it is kind of overpriced.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "american-agreements-story-q2",
    type: "typed",
    prompt: "Type the phrase Ryan uses to politely disagree a little.",
    correctAnswer: "I’d push back a little on that",
    correctAnswers: ["I’d push back a little on that", "I'd push back a little on that", "i'd push back a little on that"],
    explanation: "This is a soft, polite way to disagree or challenge an idea.",
    points: 1,
    skillTag: "polite-disagreement",
  },
  {
    id: "american-agreements-story-q3",
    type: "multiple-choice",
    prompt: "What does the group decide about the video intro?",
    options: ["Cut the intro", "Delete the whole video", "Make it longer", "Record outside"],
    correctAnswer: "Cut the intro",
    explanation: "The group mostly agrees that they should probably cut the intro.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-agreements-story-q4",
    type: "multiple-choice",
    prompt: "Which phrase means the group accepts a remaining disagreement?",
    options: ["We can agree to disagree", "The place is awesome", "Fifty bucks", "Can you say a little more about that?"],
    correctAnswer: "We can agree to disagree",
    explanation: "We can agree to disagree means both sides accept that they do not fully agree.",
    points: 1,
    skillTag: "idiom",
  },
  {
    id: "american-agreements-story-q5",
    type: "multiple-choice",
    prompt: "How aligned are they at the end?",
    options: ["Mostly on the same page", "Completely angry", "Not talking anymore", "Starting over from zero"],
    correctAnswer: "Mostly on the same page",
    explanation: "The story ends with the group mostly on the same page, even if they do not fully agree.",
    points: 1,
    skillTag: "summary",
  },
];

export const americanEnglishB2AgreementsWhatsAppStory: WhatsAppStory = {
  id: "american-english-b2-agreements-opinions",
  title: "American B2 Story: Mostly on the Same Page",
  subtitle: "A WhatsApp-style group chat about choosing a spot, disagreeing politely, and editing a video intro.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "upper-intermediate",
  tags: ["American English", "B2", "WhatsApp", "opinions", "polite disagreement"],
  estimatedMinutes: 20,
  skoolSectionName: "American English - B2 Dialect Reinforcement",
  relatedCourse: "american-english-b2-agreements-opinions-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "english",
    nativeLanguage: "spanish",
    characters: [
      { id: "maya", name: "Maya", initials: "M", side: "right", color: "blue" },
      { id: "ryan", name: "Ryan", initials: "R", side: "left", color: "green" },
      { id: "zoe", name: "Zoe", initials: "Z", side: "left", color: "violet" },
      { id: "leo", name: "Leo", initials: "L", side: "left", color: "gold" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: this chat practices casual American ways to agree, disagree softly, ask for clarification, and keep a group decision friendly.", "Guía: este chat practica formas casuales estadounidenses de estar de acuerdo, discrepar suavemente, pedir aclaración y mantener una decisión grupal amable.", [], "narrator"),
      message("m1", "maya", "Hey, quick question: are we still doing dinner after filming?", "Oye, una pregunta rápida: ¿todavía vamos a cenar después de grabar?", ["Hey, quick question"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m1.mp3"),
      message("m2", "ryan", "I’m down to go out, but I don’t wanna spend a ton of money.", "Me apunto a salir, pero no quiero gastar un montón de dinero.", ["I’m down to go out", "I’m down to…", "I don’t wanna…", "Wanna", "Spend a ton of money"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m2.mp3"),
      message("m3", "zoe", "Honestly, the rooftop taco spot is awesome.", "La verdad, el lugar de tacos en la terraza es buenísimo.", ["Honestly", "Spot", "Awesome"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m3.mp3"),
      message("m4", "maya", "The place is awesome, fair point, but it’s kind of overpriced.", "El lugar es buenísimo, buen punto, pero es un poco caro para lo que es.", ["The place is awesome", "Fair point", "It’s kind of overpriced", "Kind of", "Overpriced"]),
      message("m5", "leo", "That’s a fair point. Fifty bucks for tacos is wild, even if the patio is nice.", "Ese es un buen punto. Cincuenta dólares por tacos es una locura, aunque el patio sea bonito.", ["That’s a fair point", "Fifty bucks", "Bucks"]),
      message("m6", "zoe", "I hear you, but the location works for everybody.", "Te entiendo, pero la ubicación le sirve a todos.", ["I hear you, but…", "I hear you"]),
      message("m7", "ryan", "I get what you’re saying. At the same time… a cheaper spot would be easier.", "Entiendo lo que quieres decir. Al mismo tiempo… un lugar más barato sería más fácil.", ["I get what you’re saying", "At the same time…", "Spot"]),
      message("m8", "maya", "My take is… we should pick a cheaper spot and stay on the same page about the budget.", "Mi opinión es… deberíamos escoger un lugar más barato y estar alineados sobre el presupuesto.", ["My take is…", "Pick a cheaper spot", "Stay on the same page"]),
      message("m9", "zoe", "Fair enough. Sounds good to me if the food is still good.", "Vale. Me parece bien si la comida sigue siendo buena.", ["Fair enough", "Sounds good to me"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m9.mp3"),
      message("n2", "narrator", "Checkpoint: notice how they disagree without attacking each other. They validate first, then add a different opinion.", "Punto de control: fíjate cómo discrepan sin atacarse. Primero validan, luego añaden otra opinión.", [], "narrator"),
      message("m10", "leo", "Okay, dinner is mostly fine. But what about the video? I have a different take.", "Bueno, la cena está casi resuelta. Pero ¿qué pasa con el video? Tengo otra opinión.", ["I have a different take"]),
      message("m11", "maya", "What do you mean by that?", "¿Qué quieres decir con eso?", ["What do you mean by that?"]),
      message("m12", "leo", "I could be wrong, but the intro feels slow.", "Puede que me equivoque, pero la introducción se siente lenta.", ["I could be wrong, but…"]),
      message("m13", "zoe", "Can you say a little more about that? Too slow or too formal?", "¿Puedes explicar un poco más eso? ¿Demasiado lenta o demasiado formal?", ["Can you say a little more about that?"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m13.mp3"),
      message("m14", "leo", "Not gonna lie, I think we should probably cut the intro.", "La verdad, creo que probablemente deberíamos recortar la introducción.", ["Not gonna lie", "Not gonna lie, I think…", "We should probably…", "Cut the intro"]),
      message("m15", "ryan", "I kind of agree. The hook starts after twenty seconds.", "Estoy medio de acuerdo. El gancho empieza después de veinte segundos.", ["I kind of agree"]),
      message("m16", "maya", "I see what you mean, but I wouldn’t say it was worth cutting everything.", "Ya veo lo que quieres decir, pero no diría que valía la pena cortar todo.", ["I see what you mean", "I wouldn’t say it was worth…"]),
      message("m17", "zoe", "True, but at the end of the day… people decide fast if they’ll keep watching.", "Es verdad, pero al final del día… la gente decide rápido si va a seguir viendo.", ["True, but…", "At the end of the day…", "Gonna"]),
      message("m18", "maya", "I wouldn’t say that exactly. I’m not against the idea; I just think we gotta think it through.", "No lo diría exactamente así. No estoy en contra de la idea; solo creo que tenemos que pensarlo bien.", ["I wouldn’t say that exactly", "I’m not against the idea", "I just think…", "Gotta", "We gotta think it through", "Think it through"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m18.mp3"),
      message("m19", "ryan", "I’m with you on that part. We need context, just less of it.", "Estoy de acuerdo contigo en esa parte. Necesitamos contexto, solo menos.", ["I’m with you on that part"]),
      message("m20", "leo", "I’d push back a little on that. The context is good, but the first joke doesn’t land.", "Discreparía un poco con eso. El contexto está bien, pero el primer chiste no funciona.", ["I’d push back a little on that", "Push back on something"]),
      message("m21", "zoe", "To be fair… I do see the other side. The other side is that the longer intro shows personality.", "Para ser justos… sí entiendo la otra postura. La otra postura es que la intro larga muestra personalidad.", ["To be fair…", "I do see the other side", "The other side"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m21.mp3"),
      message("m22", "maya", "I agree up to a point. But here’s the thing… it doesn’t always work that way online.", "Estoy de acuerdo hasta cierto punto. Pero la cosa es que… no siempre funciona así en internet.", ["I agree up to a point", "Here’s the thing…", "It doesn’t always work that way"]),
      message("m23", "ryan", "I see it a little differently. The intro can be short and still have personality.", "Yo lo veo un poco diferente. La intro puede ser corta y aun así tener personalidad.", ["I see it a little differently"]),
      message("m24", "zoe", "I’m not totally sold on that, but I’m with you on that: shorter is safer.", "No estoy totalmente convencida de eso, pero estoy de acuerdo contigo en eso: más corto es más seguro.", ["I’m not totally sold on that", "I’m with you on that"]),
      message("m25", "leo", "For sure. We’re on the same page: cut ten seconds, not the whole intro.", "Claro. Estamos alineados: recortar diez segundos, no toda la introducción.", ["For sure", "We’re on the same page"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m25.mp3"),
      message("m26", "maya", "Either way is fine with me. If we don’t fully agree, no worries.", "De cualquier forma me parece bien. Si no estamos totalmente de acuerdo, no pasa nada.", ["Either way is fine with me", "If we don’t fully agree, no worries", "No worries"]),
      message("m27", "ryan", "We can agree to disagree on the rooftop, but we’re mostly on the same page for the video.", "Podemos aceptar que no estamos de acuerdo sobre la terraza, pero casi estamos alineados sobre el video.", ["We can agree to disagree", "Mostly on the same page"]),
      message("m28", "zoe", "Awesome. I’m gonna send two dinner options and a shorter cut tonight.", "Genial. Voy a mandar dos opciones de cena y un corte más corto esta noche.", ["Awesome", "Gonna"], "voice-note", "/audio/stories/american-english-b2-agreements-opinions/m28.mp3"),
    ],
    comprehensionChecks: [
      { id: "american-agreements-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "american-agreements-check-2", afterMessageId: "m20", question: storyQuestions[1] },
      { id: "american-agreements-check-3", afterMessageId: "m25", question: storyQuestions[2] },
      { id: "american-agreements-check-4", afterMessageId: "m27", question: storyQuestions[3] },
      { id: "american-agreements-check-5", afterMessageId: "m28", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: agreementVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: agreementVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft disagreement: I hear you, but..., I see it a little differently, I’d push back a little on that.",
        "Opinion framing: My take is..., I have a different take, I could be wrong, but...",
        "Clarifying questions: What do you mean by that? Can you say a little more about that?",
        "Agreement language: Fair point, I’m with you on that, We’re on the same page.",
        "Casual reductions: gonna, wanna, gotta.",
      ],
      speakingPrompts: [
        "Disagree politely about an expensive restaurant using I hear you, but... and It’s kind of overpriced.",
        "Ask for clarification using What do you mean by that? and Can you say a little more about that?",
        "Give an opinion about a video edit using My take is..., I have a different take, and Cut the intro.",
        "End a disagreement kindly using We can agree to disagree and No worries.",
      ],
    },
    completionTask: {
      title: "Your polite disagreement voice note",
      instructions:
        "Record a 90-second voice note where you agree partly, disagree politely, ask one clarifying question, and end with a friendly compromise. Use at least 18 phrases from this story.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Hey, quick question: how do you disagree with friends in English without sounding rude? Honestly, my take is… you need a few soft phrases before you give the real opinion. If someone says a rooftop spot is perfect, you do not have to say, 'That is a terrible idea.' You can say, 'Fair point' or 'That’s a fair point.' Then you can add, 'I’m with you on that part, but I see it a little differently.' That sounds much more natural.",
    translation:
      "Oye, una pregunta rápida: ¿cómo discrepas con amigos en inglés sin sonar grosero? La verdad, mi opinión es que necesitas unas frases suaves antes de dar la opinión real. Si alguien dice que un lugar de terraza es perfecto, no tienes que decir: 'Esa es una idea terrible.' Puedes decir: 'Buen punto' o 'Ese es un buen punto.' Luego puedes añadir: 'Estoy de acuerdo contigo en esa parte, pero yo lo veo un poco diferente.' Eso suena mucho más natural.",
    highlights: highlights(["Hey, quick question", "Honestly", "My take is…", "Spot", "Fair point", "That’s a fair point", "I’m with you on that part", "I see it a little differently"]),
    shadowLine: "I’m with you on that part, but I see it a little differently.",
  },
  {
    id: "p2",
    text:
      "In my group, we were trying to stay on the same page about dinner. Zoe said, 'The place is awesome.' I said, 'I hear you. I get what you’re saying, and I see what you mean about the view. Here’s the thing… it’s kind of overpriced.' It was not an attack. It was just a budget point. At the same time… I do see the other side: a nice place can make the whole night feel special.",
    translation:
      "En mi grupo, intentábamos estar alineados sobre la cena. Zoe dijo: 'El lugar es buenísimo.' Yo dije: 'Te entiendo. Entiendo lo que quieres decir, y ya veo tu punto sobre la vista. La cosa es que… es un poco caro para lo que es.' No fue un ataque. Solo fue un punto de presupuesto. Al mismo tiempo… sí entiendo la otra postura: un lugar bonito puede hacer que toda la noche se sienta especial.",
    highlights: highlights(["Stay on the same page", "The place is awesome", "I hear you", "I get what you’re saying", "I see what you mean", "Here’s the thing…", "It’s kind of overpriced", "Overpriced", "At the same time…", "I do see the other side", "The other side"]),
    shadowLine: "I hear you, but here’s the thing…",
  },
  {
    id: "p3",
    text:
      "Ryan said, 'True, but fifty bucks is not crazy for that neighborhood.' I answered, 'I wouldn’t say that exactly. I wouldn’t say it was worth fifty bucks, especially if we can pick a cheaper spot.' He laughed and said, 'Fair enough. Sounds good to me.' That small exchange taught me something: bucks sounds casual, spot sounds natural, and fair enough keeps the conversation friendly.",
    translation:
      "Ryan dijo: 'Es verdad, pero cincuenta dólares no es una locura para ese barrio.' Yo respondí: 'No lo diría exactamente así. No diría que valía cincuenta dólares, especialmente si podemos escoger un lugar más barato.' Él se rió y dijo: 'Vale. Me parece bien.' Ese pequeño intercambio me enseñó algo: bucks suena casual, spot suena natural, y fair enough mantiene la conversación amable.",
    highlights: highlights(["True, but…", "Fifty bucks", "Bucks", "I wouldn’t say that exactly", "I wouldn’t say it was worth…", "Pick a cheaper spot", "Spot", "Fair enough", "Sounds good to me"]),
    shadowLine: "Fair enough. Sounds good to me.",
  },
  {
    id: "p4",
    text:
      "Then we argued about a video edit. I said, 'I could be wrong, but I have a different take.' Leo said, 'I’d push back a little on that.' He was not being rude; to push back on something can mean to disagree softly. To be fair… he had a good reason. I agree up to a point, and I’m not against the idea of a longer intro. I just think we gotta think it through because online attention is short.",
    translation:
      "Luego discutimos sobre una edición de video. Dije: 'Puede que me equivoque, pero tengo otra opinión.' Leo dijo: 'Discreparía un poco con eso.' No estaba siendo grosero; push back on something puede significar discrepar suavemente. Para ser justos… tenía una buena razón. Estoy de acuerdo hasta cierto punto, y no estoy en contra de la idea de una intro más larga. Solo creo que tenemos que pensarlo bien porque la atención en internet es corta.",
    highlights: highlights(["I could be wrong, but…", "I have a different take", "I’d push back a little on that", "Push back on something", "To be fair…", "I agree up to a point", "I’m not against the idea", "I just think…", "Gotta", "We gotta think it through", "Think it through"]),
    shadowLine: "I’d push back a little on that.",
  },
  {
    id: "p5",
    text:
      "When someone gave a vague opinion, we asked, 'What do you mean by that?' and 'Can you say a little more about that?' Those questions changed everything. Not gonna lie, I think clarification is underrated. Someone might say, 'I kind of agree,' but you do not know if they mean yes, no, or maybe. So we said, 'We should probably cut the intro, but not remove all the context.'",
    translation:
      "Cuando alguien dio una opinión vaga, preguntamos: '¿Qué quieres decir con eso?' y '¿Puedes explicar un poco más eso?' Esas preguntas cambiaron todo. La verdad, creo que pedir aclaración está infravalorado. Alguien puede decir: 'Estoy medio de acuerdo', pero no sabes si quiere decir sí, no o tal vez. Entonces dijimos: 'Probablemente deberíamos recortar la introducción, pero no quitar todo el contexto.'",
    highlights: highlights(["What do you mean by that?", "Can you say a little more about that?", "Not gonna lie", "Not gonna lie, I think…", "I kind of agree", "We should probably…", "Cut the intro"]),
    shadowLine: "Can you say a little more about that?",
  },
  {
    id: "p6",
    text:
      "At the end of the day… we wanted a decision, not a fight. Zoe said, 'For sure, we can agree to disagree about the rooftop.' I said, 'I’m down to go out, and I’m down to try the cheaper place.' Ryan added, 'I don’t wanna spend a ton of money either. A ton of money for dinner is too much.' Either way is fine with me became our compromise phrase.",
    translation:
      "Al final del día… queríamos una decisión, no una pelea. Zoe dijo: 'Claro, podemos aceptar que no estamos de acuerdo sobre la terraza.' Yo dije: 'Me apunto a salir, y me apunto a probar el lugar más barato.' Ryan añadió: 'Yo tampoco quiero gastar un montón de dinero. Muchísimo dinero para cenar es demasiado.' De cualquier forma me parece bien se volvió nuestra frase de compromiso.",
    highlights: highlights(["At the end of the day…", "For sure", "We can agree to disagree", "I’m down to go out", "I’m down to…", "I don’t wanna…", "Wanna", "Spend a ton of money", "A ton of money", "Either way is fine with me"]),
    shadowLine: "At the end of the day… we can agree to disagree.",
  },
  {
    id: "p7",
    text:
      "By the end, we were on the same page, or at least mostly on the same page. If we don’t fully agree, no worries. In casual American English, that ending matters. You can disagree, push back, clarify, and still sound friendly. The goal is not to win every point. The goal is to keep the conversation moving, make a decision, and leave people feeling respected.",
    translation:
      "Al final, estábamos de acuerdo, o al menos casi alineados. Si no estamos totalmente de acuerdo, no pasa nada. En inglés estadounidense casual, ese cierre importa. Puedes discrepar, cuestionar suavemente, aclarar y aun así sonar amable. La meta no es ganar cada punto. La meta es mantener la conversación avanzando, tomar una decisión y dejar a la gente sintiéndose respetada.",
    highlights: highlights(["We’re on the same page", "Mostly on the same page", "If we don’t fully agree, no worries", "No worries"]),
    shadowLine: "If we don’t fully agree, no worries.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "american-agreements-reading-q1",
    type: "multiple-choice",
    prompt: "What is the main skill in the reading?",
    options: ["Disagreeing politely while keeping the conversation friendly", "Ordering food quickly", "Writing formal emails", "Giving a public speech"],
    correctAnswer: "Disagreeing politely while keeping the conversation friendly",
    explanation: "The reading focuses on soft disagreement, clarification, and compromise.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "american-agreements-reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'Discreparía un poco con eso'.",
    correctAnswer: "I’d push back a little on that",
    correctAnswers: ["I’d push back a little on that", "I'd push back a little on that"],
    explanation: "This phrase lets you disagree softly without sounding aggressive.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "american-agreements-reading-q3",
    type: "multiple-choice",
    prompt: "Why do the friends ask clarification questions?",
    options: ["To understand the real meaning before disagreeing", "To end the chat immediately", "To avoid choosing dinner", "To make the video longer"],
    correctAnswer: "To understand the real meaning before disagreeing",
    explanation: "Questions like What do you mean by that? help avoid misunderstanding.",
    points: 1,
    skillTag: "clarification",
  },
  {
    id: "american-agreements-reading-q4",
    type: "true-false",
    prompt: "The group fully agrees on everything by the end.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "They are mostly on the same page, but they can agree to disagree.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "american-agreements-reading-q5",
    type: "order-words",
    prompt: "Order the words to make the compromise phrase.",
    wordBank: ["Either", "way", "is", "fine", "with", "me"],
    correctAnswer: "Either way is fine with me",
    explanation: "This phrase keeps a disagreement flexible and friendly.",
    points: 1,
    skillTag: "sentence-order",
  },
];

export const americanEnglishB2AgreementsReading: ReadingComprehension = {
  id: "american-english-b2-reading-agreements-opinions",
  title: "American B2 Reading: Agreeing Without Giving In",
  subtitle: "A long first-person reading about casual disagreement, group decisions, and compromise in American English.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "upper-intermediate",
  tags: ["American English", "B2", "reading", "opinions", "polite disagreement"],
  estimatedMinutes: 20,
  skoolSectionName: "American English - B2 Dialect Reinforcement",
  relatedCourse: "american-english-b2-agreements-opinions",
  activityType: "reading",
  data: {
    targetLanguage: "english",
    audioUrl: "/audio/readings/american-english-b2-reading-agreements-opinions/full.mp3",
    audioAlignmentUrl: "/audio/readings/american-english-b2-reading-agreements-opinions/timings.json",
    paragraphs: readingParagraphs,
    glossary: agreementVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the American English agreements and opinions speaking lesson vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  agreementVocab.slice(0, 10),
  agreementVocab.slice(10, 20),
  agreementVocab.slice(20, 30),
  agreementVocab.slice(30, 40),
  agreementVocab.slice(40, 50),
  agreementVocab.slice(50, 60),
  agreementVocab.slice(60),
];

export const americanEnglishB2AgreementsQuiz: CheckpointQuiz = {
  id: "american-english-b2-agreements-opinions-quiz",
  title: "American English B2: Agreements & Opinions Quiz",
  subtitle: "Practice casual agreement, clarification, polite disagreement, compromise, and reductions.",
  languageTarget: "english",
  learnerNativeLanguage: "spanish",
  level: "upper-intermediate",
  tags: ["American English", "B2", "quiz", "opinions", "disagreement"],
  estimatedMinutes: 20,
  skoolSectionName: "American English - B2 Dialect Reinforcement",
  relatedCourse: "american-english-b2-agreements-opinions",
  activityType: "quiz",
  data: {
    description:
      "Use this after the flashcards, story, and reading to check whether you can recognize and produce natural American phrases for opinions, disagreement, and compromise.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "american-agreements-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is the softest way to disagree?",
        options: ["I’d push back a little on that", "You are completely wrong", "No chance", "Stop talking"],
        correctAnswer: "I’d push back a little on that",
        explanation: "This phrase signals disagreement without sounding aggressive.",
        points: 1,
        skillTag: "polite-disagreement",
      },
      {
        id: "american-agreements-quiz-2",
        type: "fill-blank",
        prompt: "Complete: I’m not totally ______ on that.",
        correctAnswer: "sold",
        explanation: "I’m not totally sold on that means you are not fully convinced.",
        points: 1,
        skillTag: "idiom",
      },
      {
        id: "american-agreements-quiz-3",
        type: "typed",
        prompt: "Type the phrase meaning '¿Puedes explicar un poco más eso?'",
        correctAnswer: "Can you say a little more about that?",
        correctAnswers: ["Can you say a little more about that?", "can you say a little more about that"],
        explanation: "This is a useful clarification question before agreeing or disagreeing.",
        points: 1,
        skillTag: "clarification",
      },
      {
        id: "american-agreements-quiz-4",
        type: "multiple-choice",
        prompt: "Which phrase means the decision is acceptable both ways?",
        options: ["Either way is fine with me", "It’s kind of overpriced", "What do you mean by that?", "I have a different take"],
        correctAnswer: "Either way is fine with me",
        explanation: "This phrase shows flexibility between two options.",
        points: 1,
        skillTag: "compromise",
      },
      {
        id: "american-agreements-quiz-5",
        type: "order-words",
        prompt: "Order the words to make a natural American disagreement opener.",
        wordBank: ["I", "see", "it", "a", "little", "differently"],
        correctAnswer: "I see it a little differently",
        explanation: "This frames disagreement as a different perspective, not an attack.",
        points: 1,
        skillTag: "sentence-order",
      },
      ...vocabChunks.map((items, index) => pairQuestion(`american-agreements-pairs-${index + 1}`, `Match American English agreement/opinion vocab set ${index + 1}.`, items)),
    ],
  },
};
