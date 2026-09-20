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

const courseId = "cuban-spanish-b1-taking-guagua-almendron";
const sectionName = "Cuban Spanish - B1 Taking a Guagua or Almendrón";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const transportVocab: VocabItem[] = [
  { id: "coger-la-guagua", term: "coger la guagua", meaning: "to take/catch the bus", note: "In Cuban Spanish, guagua is the everyday word for bus.", example: "Tengo que coger la guagua para ir para Vedado.", translation: "I have to take the bus to go to Vedado.", starred: true },
  { id: "esta-guagua-pasa", term: "¿esta guagua pasa por…?", meaning: "does this bus go past / through…?", note: "Use this before boarding when you are not sure about the route.", example: "¿Esta guagua pasa por Centro Habana?", translation: "Does this bus go through Centro Habana?", starred: true },
  { id: "donde-esta-la-parada", term: "¿dónde está la parada?", meaning: "where is the bus stop?", note: "Parada is the bus stop.", example: "Perdona, ¿dónde está la parada?", translation: "Excuse me, where is the bus stop?", starred: true },
  { id: "voy-para", term: "voy para…", meaning: "I’m heading to…", note: "Very common Caribbean-style direction phrase.", example: "Voy para La Habana Vieja.", translation: "I’m heading to Old Havana.", starred: true },
  { id: "me-sirve-esta-guagua", term: "¿me sirve esta guagua?", meaning: "does this bus work for where I’m going?", note: "A practical route question.", example: "Voy para el Malecón, ¿me sirve esta guagua?", translation: "I’m heading to the Malecón; does this bus work for me?", starred: true },
  { id: "donde-cojo", term: "¿dónde cojo la guagua para…?", meaning: "where do I catch the bus to…?", note: "Use coger normally for taking transport in Cuba.", example: "¿Dónde cojo la guagua para Miramar?", translation: "Where do I catch the bus to Miramar?", starred: true },
  { id: "hasta-donde-llega", term: "¿hasta dónde llega?", meaning: "how far does it go? / where does it end?", note: "Useful when the route is unclear.", example: "¿Hasta dónde llega esta guagua?", translation: "How far does this bus go?", starred: true },
  { id: "cuanto-pasaje", term: "¿cuánto cuesta el pasaje?", meaning: "how much is the fare?", note: "Pasaje means fare or ticket price.", example: "¿Cuánto cuesta el pasaje hasta allá?", translation: "How much is the fare to there?", starred: true },
  { id: "en-que-parada", term: "¿en qué parada me bajo?", meaning: "which stop do I get off at?", note: "Core phrase for not missing your stop.", example: "Para el museo, ¿en qué parada me bajo?", translation: "For the museum, which stop do I get off at?", starred: true },
  { id: "me-avisa", term: "me avisa cuando lleguemos", meaning: "let me know when we get there", note: "Polite request to a driver or passenger.", example: "Por favor, me avisa cuando lleguemos a la próxima parada.", translation: "Please let me know when we get to the next stop.", starred: true },
  { id: "permiso-me-bajo", term: "permiso, que me bajo", meaning: "excuse me, I’m getting off", note: "Use this when moving through a crowded vehicle.", example: "Permiso, que me bajo aquí.", translation: "Excuse me, I’m getting off here.", starred: true },
  { id: "esta-lleno", term: "está lleno", meaning: "it’s full", note: "Basic crowding phrase.", example: "La guagua está llena.", translation: "The bus is full.", starred: true },
  { id: "no-cabe-nadie", term: "no cabe nadie más", meaning: "there’s no room for anyone else", note: "Stronger than está lleno.", example: "No cabe nadie más, esperamos el próximo.", translation: "There’s no room for anyone else; we’ll wait for the next one.", starred: true },
  { id: "hay-puesto", term: "¿hay puesto?", meaning: "is there a seat / any room?", note: "Puesto can mean a seat or space in transport.", example: "¿Hay puesto o está lleno?", translation: "Is there a seat/room or is it full?", starred: true },
  { id: "coger-almendron", term: "coger un almendrón", meaning: "to take an almendrón", note: "An almendrón is an old American car often used as a shared taxi.", example: "Si la guagua demora, cogemos un almendrón.", translation: "If the bus takes long, we’ll take an almendrón.", starred: true },
  { id: "esto-va-para", term: "¿esto va para…?", meaning: "is this going to…?", note: "Very practical for checking a taxi or shared car route.", example: "¿Esto va para Centro Habana?", translation: "Is this going to Centro Habana?", starred: true },
  { id: "cuanto-es-hasta", term: "¿cuánto es hasta…?", meaning: "how much is it to…?", note: "Use for taxi or shared-car price questions.", example: "¿Cuánto es hasta el Capitolio?", translation: "How much is it to the Capitolio?", starred: true },
  { id: "me-deja-en", term: "me deja en…", meaning: "drop me off at…", note: "Direct but polite enough with a driver.", example: "Me deja en la esquina, por favor.", translation: "Drop me off at the corner, please.", starred: true },
  { id: "donde-piquera", term: "¿dónde está la piquera?", meaning: "where is the taxi stand?", note: "Piquera is a taxi stand or place where cars wait for passengers.", example: "¿Dónde está la piquera de los almendrones?", translation: "Where is the almendrón taxi stand?", starred: true },
  { id: "vamos-apretados", term: "vamos apretados", meaning: "we’re squeezed in / cramped", note: "Natural phrase for crowded shared transport.", example: "Vamos apretados, pero llegamos rápido.", translation: "We’re cramped, but we’ll arrive quickly.", starred: true },
  { id: "si-lleno-proximo", term: "si está muy lleno, espero el próximo", meaning: "if it’s too full, I’ll wait for the next one", note: "A safe B1 backup-plan phrase.", example: "Si está muy lleno, espero el próximo.", translation: "If it’s too full, I’ll wait for the next one.", starred: true },
  { id: "aqui-mismo", term: "aquí mismo me bajo", meaning: "I’ll get off right here", note: "Useful when you suddenly recognize the place.", example: "Aquí mismo me bajo, gracias.", translation: "I’ll get off right here, thanks.", starred: true },
  { id: "proxima-parada", term: "la próxima parada", meaning: "the next stop", note: "Core transport phrase.", example: "Me bajo en la próxima parada.", translation: "I get off at the next stop.", starred: true },
  { id: "espero-proximo", term: "espero el próximo", meaning: "I’ll wait for the next one", note: "Use when a vehicle is full or not useful for your route.", example: "No, gracias, espero el próximo.", translation: "No, thanks, I’ll wait for the next one.", starred: true },
];

const highlightMap = Object.fromEntries(transportVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const storyAudioBase = `/audio/stories/${courseId}`;

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

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text", audioUrl?: string): StoryMessage {
  return { id, speakerId, messageType, text, translation, ...(audioUrl ? { audioUrl } : {}), vocabHighlights: highlights(phrases) };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers: [targetAnswer], explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

export const cubanSpanishB1TakingGuaguaAlmendronFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Cuban Spanish B1: Taking a Guagua or Almendrón Flashcards",
  subtitle: "Cuban transport phrases for buses, almendrones, routes, fares, crowded vehicles, and getting off in the right place.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Cuban Spanish", "B1", "flashcards", "transport", "guagua", "almendrón"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: transportVocab.map(cardFromVocab) },
};

const sentenceVocab = [
  "coger la guagua = to take the bus",
  "¿dónde está la parada? = where is the bus stop?",
  "voy para… = I’m heading to…",
  "¿me sirve esta guagua? = does this bus work for me?",
  "¿hasta dónde llega? = how far does it go?",
  "¿cuánto cuesta el pasaje? = how much is the fare?",
  "¿en qué parada me bajo? = which stop do I get off at?",
  "me avisa cuando lleguemos = let me know when we get there",
  "está lleno = it’s full",
  "no cabe nadie más = there’s no room for anyone else",
  "coger un almendrón = take an almendrón",
  "¿esto va para…? = is this going to…?",
  "¿cuánto es hasta…? = how much is it to…?",
  "me deja en… = drop me off at…",
  "¿dónde está la piquera? = where is the taxi stand?",
  "vamos apretados = we’re cramped",
  "si está muy lleno, espero el próximo = if it’s too full, I’ll wait for the next one",
  "aquí mismo me bajo = I’ll get off right here",
  "la próxima parada = the next stop",
  "permiso, que me bajo = excuse me, I’m getting off",
];

export const cubanSpanishB1TakingGuaguaAlmendronSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Cuban Guagua & Almendrón Transport",
  subtitle: "Build practical Cuban Spanish for asking routes, fares, stops, crowding, and drop-off points.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["cuban-spanish", "b1", "sentence-builder", "transport"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short Cuban Spanish voice note explaining where you are going, whether you will take a guagua or almendrón, and where you need to get off.",
    stages: [
      stage("stage-1", "Stage 1: Ask for the stop", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Where is the bus stop? I’m heading to Old Havana.", "¿Dónde está la parada? Voy para La Habana Vieja.", "Start with the location and destination.", breakdown([["Where is the bus stop?", "¿Dónde está la parada?"], ["I’m heading to", "Voy para"], ["Old Havana", "La Habana Vieja"]])),
      stage("stage-2", "Stage 2: Check the route", sentenceVocab.slice(3, 5), sentenceVocab.slice(0, 5), "Does this bus work for me, or how far does it go?", "¿Me sirve esta guagua o hasta dónde llega?", "This checks if the guagua route is useful before boarding.", breakdown([["Does this bus work for me?", "¿Me sirve esta guagua?"], ["or", "o"], ["how far does it go?", "¿hasta dónde llega?"]])),
      stage("stage-3", "Stage 3: Ask fare and stop", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "How much is the fare, and which stop do I get off at?", "¿Cuánto cuesta el pasaje y en qué parada me bajo?", "This combines money and route information.", breakdown([["How much is the fare?", "¿Cuánto cuesta el pasaje?"], ["which stop", "en qué parada"], ["do I get off at?", "me bajo?"]])),
      stage("stage-4", "Stage 4: Ask for help", sentenceVocab.slice(7, 10), sentenceVocab.slice(0, 10), "Let me know when we get there, because the bus is full.", "Me avisa cuando lleguemos, porque la guagua está llena.", "A simple polite request in a crowded guagua.", breakdown([["Let me know", "Me avisa"], ["when we get there", "cuando lleguemos"], ["the bus is full", "la guagua está llena"]])),
      stage("stage-5", "Stage 5: Switch to an almendrón", sentenceVocab.slice(10, 13), sentenceVocab.slice(0, 13), "If the bus is full, we’ll take an almendrón. How much is it to the Capitolio?", "Si la guagua está llena, cogemos un almendrón. ¿Cuánto es hasta el Capitolio?", "This gives a natural backup plan.", breakdown([["If the bus is full", "Si la guagua está llena"], ["we’ll take an almendrón", "cogemos un almendrón"], ["how much is it to", "¿cuánto es hasta"]])),
      stage("stage-6", "Stage 6: Ask for drop-off", sentenceVocab.slice(13, 16), sentenceVocab.slice(0, 16), "Drop me off at the corner, please. We’re squeezed in, but it’s fine.", "Me deja en la esquina, por favor. Vamos apretados, pero está bien.", "Use this with a driver when the shared car is cramped.", breakdown([["Drop me off", "Me deja"], ["at the corner", "en la esquina"], ["we’re squeezed in", "vamos apretados"]])),
      stage("stage-7", "Stage 7: Wait for the next one", sentenceVocab.slice(16, 18), sentenceVocab.slice(0, 18), "If it’s too full, I’ll wait for the next one.", "Si está muy lleno, espero el próximo.", "This is the cleanest safe choice when transport is packed.", breakdown([["If it’s too full", "Si está muy lleno"], ["I’ll wait", "espero"], ["for the next one", "el próximo"]])),
      stage("stage-8", "Stage 8: Get off clearly", sentenceVocab.slice(18), sentenceVocab, "Excuse me, I’m getting off at the next stop. I’ll get off right here.", "Permiso, que me bajo en la próxima parada. Aquí mismo me bajo.", "This helps you move through a crowded vehicle and not miss your stop.", breakdown([["Excuse me", "Permiso"], ["I’m getting off", "que me bajo"], ["at the next stop", "en la próxima parada"], ["right here", "aquí mismo"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "cuban-b1-guagua-story-q1", type: "multiple-choice", prompt: "After message 3, where is Leo heading?", options: ["La Habana Vieja", "The airport", "A restaurant in Miramar", "His house"], correctAnswer: "La Habana Vieja", explanation: "Leo says: Voy para La Habana Vieja.", points: 1, skillTag: "gist" },
  { id: "cuban-b1-guagua-story-q2", type: "multiple-choice", prompt: "After message 6, what does Leo need to know?", options: ["Whether the bus works for his route", "What food to order", "Who owns the car", "The weather tomorrow"], correctAnswer: "Whether the bus works for his route", explanation: "He asks: ¿me sirve esta guagua?", points: 1, skillTag: "route" },
  { id: "cuban-b1-guagua-story-q3", type: "multiple-choice", prompt: "After message 9, what should Leo ask next?", options: ["Which stop he gets off at", "Whether Sara wants coffee", "How to say good night", "Where to buy fruit"], correctAnswer: "Which stop he gets off at", explanation: "Sara says he should ask: ¿en qué parada me bajo?", points: 1, skillTag: "getting-off" },
  { id: "cuban-b1-guagua-story-q4", type: "true-false", prompt: "True or false: By message 12, the guagua has plenty of space.", options: ["True", "False"], correctAnswer: "False", explanation: "Leo says it is full and no cabe nadie más.", points: 1, skillTag: "crowding" },
  { id: "cuban-b1-guagua-story-q5", type: "multiple-choice", prompt: "After message 15, what should Leo ask at the piquera?", options: ["¿Esto va para el Capitolio?", "¿Dónde está la farmacia?", "¿Hay café?", "¿Me avisa cuando lleguemos?"], correctAnswer: "¿Esto va para el Capitolio?", explanation: "Sara tells him to ask whether the almendrón goes to the Capitolio.", points: 1, skillTag: "route" },
  { id: "cuban-b1-guagua-story-q6", type: "multiple-choice", prompt: "After message 18, what price question has Leo understood?", options: ["¿Cuánto es hasta el Capitolio?", "¿Dónde está la parada?", "¿Hay puesto?", "¿Hasta dónde llega?"], correctAnswer: "¿Cuánto es hasta el Capitolio?", explanation: "Leo asks the fare to the Capitolio.", points: 1, skillTag: "fare" },
  { id: "cuban-b1-guagua-story-q7", type: "multiple-choice", prompt: "After message 21, why is the almendrón uncomfortable?", options: ["They are squeezed in", "It has no driver", "It is going to the beach", "It is too cold"], correctAnswer: "They are squeezed in", explanation: "Sara says: van apretados.", points: 1, skillTag: "crowding" },
  { id: "cuban-b1-guagua-story-q8", type: "multiple-choice", prompt: "After message 24, what should Leo say to get out politely?", options: ["Permiso, que me bajo", "¿Hay puesto?", "¿Cuánto cuesta el pasaje?", "Coger la guagua"], correctAnswer: "Permiso, que me bajo", explanation: "This phrase helps him move through people when getting off.", points: 1, skillTag: "politeness" },
  { id: "cuban-b1-guagua-story-q9", type: "multiple-choice", prompt: "After message 27, where will Sara wait for Leo?", options: ["At the entrance", "At the beach", "Inside the guagua", "At the airport"], correctAnswer: "At the entrance", explanation: "Sara says: Te espero en la entrada.", points: 1, skillTag: "detail" },
  { id: "cuban-b1-guagua-story-q10", type: "multiple-choice", prompt: "Which phrase from the story means 'I’ll wait for the next one'?", options: ["Espero el próximo", "Voy para", "¿Hay puesto?", "Aquí mismo me bajo"], correctAnswer: "Espero el próximo", explanation: "Espero el próximo is the phrase for waiting for the next vehicle.", points: 1, skillTag: "phrase-meaning" },
];

export const cubanSpanishB1TakingGuaguaAlmendronWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Cuban B1 Text Story: The Wrong Guagua",
  subtitle: "A Cuban Spanish chat about catching a guagua, checking the route, switching to an almendrón, and getting off in the right place.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Cuban Spanish", "B1", "WhatsApp", "transport", "guagua", "almendrón"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sara", name: "Sara", initials: "S", side: "left", color: "cyan" },
      { id: "leo", name: "Leo", initials: "L", side: "right", color: "blue" },
    ],
    messages: [
      message("n1", "sara", "Story guide: Leo is trying to reach Sara in La Habana Vieja, but he is not sure which guagua or almendrón to take.", "Guide: Leo is trying to reach Sara in Old Havana, but he is not sure which bus or almendrón to take.", [], "narrator"),
      message("m1", "leo", "Sara, estoy en la esquina y no veo la parada.", "Sara, I’m on the corner and I don’t see the stop.", ["¿dónde está la parada?"], "voice-note", `${storyAudioBase}/m1.mp3`),
      message("m2", "sara", "¿Vas para La Habana Vieja todavía?", "Are you still heading to Old Havana?", ["voy para…"]),
      message("m3", "leo", "Sí, voy para La Habana Vieja, pero no sé dónde cojo la guagua.", "Yes, I’m heading to Old Havana, but I don’t know where to catch the bus.", ["voy para…", "¿dónde cojo la guagua para…?", "coger la guagua"]),
      message("m4", "sara", "La parada está frente a la farmacia, cruzando la calle.", "The stop is in front of the pharmacy, across the street.", ["¿dónde está la parada?"]),
      message("m5", "leo", "Ya la vi. Hay una guagua llegando, pero está llenísima.", "I see it now. A bus is arriving, but it’s really full.", ["está lleno"], "voice-note", `${storyAudioBase}/m5.mp3`),
      message("m6", "leo", "Voy a preguntar: ¿me sirve esta guagua para La Habana Vieja?", "I’m going to ask: does this bus work for Old Havana?", ["¿me sirve esta guagua?", "voy para…"]),
      message("m7", "sara", "Pregunta también hasta dónde llega, por si acaso.", "Also ask how far it goes, just in case.", ["¿hasta dónde llega?"]),
      message("m8", "leo", "El chofer dijo que pasa cerca, pero no llega hasta el Capitolio.", "The driver said it passes nearby, but it doesn’t go all the way to the Capitolio.", ["¿esta guagua pasa por…?", "¿hasta dónde llega?"]),
      message("m9", "sara", "Entonces pregunta en qué parada te bajas.", "Then ask which stop you get off at.", ["¿en qué parada me bajo?"]),
      message("m10", "leo", "Le dije: ¿en qué parada me bajo? Y una señora me va a avisar.", "I said: which stop do I get off at? And a lady is going to let me know.", ["¿en qué parada me bajo?", "me avisa cuando lleguemos"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "sara", "Perfecto. Si está demasiado lleno, no te montes.", "Perfect. If it’s too full, don’t get on.", ["está lleno"]),
      message("m12", "leo", "Está lleno de verdad. No cabe nadie más.", "It’s really full. There’s no room for anyone else.", ["está lleno", "no cabe nadie más"]),
      message("m13", "sara", "Entonces espera el próximo o coge un almendrón.", "Then wait for the next one or take an almendrón.", ["espero el próximo", "coger un almendrón"]),
      message("m14", "leo", "Creo que mejor cojo un almendrón. ¿Dónde está la piquera?", "I think I’ll better take an almendrón. Where is the taxi stand?", ["coger un almendrón", "¿dónde está la piquera?"]),
      message("m15", "sara", "La piquera está al lado del parque. Pregunta: ¿esto va para el Capitolio?", "The taxi stand is next to the park. Ask: is this going to the Capitolio?", ["¿dónde está la piquera?", "¿esto va para…?"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "leo", "Ya pregunté. Sí va para allá, pero primero da una vuelta.", "I already asked. It does go there, but first it takes a detour.", ["¿esto va para…?"]),
      message("m17", "sara", "Pregunta cuánto es hasta el Capitolio antes de montarte.", "Ask how much it is to the Capitolio before getting in.", ["¿cuánto es hasta…?"]),
      message("m18", "leo", "Listo. ¿Cuánto es hasta el Capitolio? Eso sí lo entendí.", "Done. How much is it to the Capitolio? I understood that part.", ["¿cuánto es hasta…?"]),
      message("m19", "sara", "Bien. Y dile: me deja en el Capitolio, por favor.", "Good. And tell him: drop me off at the Capitolio, please.", ["me deja en…"]),
      message("m20", "leo", "Me deja en el Capitolio, por favor. Vamos apretados, pero arranca ya.", "Drop me off at the Capitolio, please. We’re squeezed in, but it’s leaving now.", ["me deja en…", "vamos apretados"], "voice-note", `${storyAudioBase}/m20.mp3`),
      message("m21", "sara", "Jajaja, los almendrones a veces van apretados, pero resuelven.", "Haha, almendrones are sometimes cramped, but they solve the problem.", ["coger un almendrón", "vamos apretados"]),
      message("m22", "leo", "Creo que ya estoy cerca. Veo el Capitolio por la ventana.", "I think I’m close now. I see the Capitolio through the window.", []),
      message("m23", "sara", "Entonces prepárate. La próxima parada te sirve.", "Then get ready. The next stop works for you.", ["la próxima parada"]),
      message("m24", "leo", "¿Digo permiso, que me bajo? Hay mucha gente.", "Do I say excuse me, I’m getting off? There are a lot of people.", ["permiso, que me bajo"]),
      message("m25", "sara", "Sí. Dilo claro: permiso, que me bajo.", "Yes. Say it clearly: excuse me, I’m getting off.", ["permiso, que me bajo"]),
      message("m26", "leo", "Listo. Aquí mismo me bajo.", "Done. I’ll get off right here.", ["aquí mismo me bajo"]),
      message("m27", "sara", "Camina dos cuadras y ya llegas. Te espero en la entrada.", "Walk two blocks and you’ll arrive. I’ll wait for you at the entrance.", []),
      message("m28", "leo", "Aprendí bastante hoy: guagua, piquera, almendrón y parada.", "I learned a lot today: bus, taxi stand, almendrón, and stop.", ["coger la guagua", "¿dónde está la piquera?", "coger un almendrón", "¿dónde está la parada?"]),
      message("m29", "sara", "Y también aprendiste cuándo esperar el próximo.", "And you also learned when to wait for the next one.", ["espero el próximo"]),
      message("m30", "leo", "Sí. Si está muy lleno, espero el próximo. Pero hoy resolví.", "Yes. If it’s too full, I’ll wait for the next one. But today I figured it out.", ["si está muy lleno, espero el próximo"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: [
      { id: "cuban-b1-guagua-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "cuban-b1-guagua-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "cuban-b1-guagua-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "cuban-b1-guagua-check-4", afterMessageId: "m12", question: storyQuestions[3] },
      { id: "cuban-b1-guagua-check-5", afterMessageId: "m15", question: storyQuestions[4] },
      { id: "cuban-b1-guagua-check-6", afterMessageId: "m18", question: storyQuestions[5] },
      { id: "cuban-b1-guagua-check-7", afterMessageId: "m21", question: storyQuestions[6] },
      { id: "cuban-b1-guagua-check-8", afterMessageId: "m24", question: storyQuestions[7] },
      { id: "cuban-b1-guagua-check-9", afterMessageId: "m27", question: storyQuestions[8] },
      { id: "cuban-b1-guagua-check-10", afterMessageId: "m30", question: storyQuestions[9] },
    ],
    learnedVocab: transportVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: transportVocab.map((item) => item.term),
      grammarPatterns: ["Route question: ¿esta guagua pasa por…? / ¿esto va para…?", "Transport choice: coger la guagua / coger un almendrón.", "Getting off: permiso, que me bajo / aquí mismo me bajo."],
      speakingPrompts: ["Ask where to catch the guagua.", "Ask the fare and where to get off.", "Explain that the vehicle is full and you will wait for the next one."],
    },
    completionTask: { title: "Your Cuban transport voice note", instructions: "Record a 45-second voice note asking how to get somewhere by guagua or almendrón, including the fare and where to get off." },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text: "Moverse en Cuba puede empezar con una pregunta simple: “¿dónde está la parada?”. Si vas en bus, dices “voy para La Habana Vieja” y preguntas “¿me sirve esta guagua?”. Así no te montas en una guagua que no pasa por donde necesitas.",
    translation: "Getting around Cuba can start with a simple question: where is the stop? If you go by bus, you say you are heading to Old Havana and ask whether this bus works for you.",
    highlights: highlights(["¿dónde está la parada?", "voy para…", "¿me sirve esta guagua?", "¿esta guagua pasa por…?"]),
    shadowLine: "Voy para La Habana Vieja. ¿Me sirve esta guagua?",
  },
  {
    id: "p2",
    text: "Cuando no conoces la ruta, necesitas dos frases muy claras: “¿hasta dónde llega?” y “¿en qué parada me bajo?”. También puedes pedir ayuda: “me avisa cuando lleguemos”. Esa frase suena sencilla, amable y práctica.",
    translation: "When you do not know the route, you need two very clear phrases: how far does it go, and which stop do I get off at? You can also ask someone to let you know when you arrive.",
    highlights: highlights(["¿hasta dónde llega?", "¿en qué parada me bajo?", "me avisa cuando lleguemos"]),
    shadowLine: "¿En qué parada me bajo? Me avisa cuando lleguemos.",
  },
  {
    id: "p3",
    text: "A veces la guagua está llena. Si “no cabe nadie más”, puedes decir “espero el próximo”. Si necesitas otra opción, puedes “coger un almendrón”. Antes de montarte, pregunta “¿esto va para…?” y “¿cuánto es hasta…?”.",
    translation: "Sometimes the bus is full. If there is no room for anyone else, you can say you will wait for the next one. If you need another option, you can take an almendrón.",
    highlights: highlights(["está lleno", "no cabe nadie más", "espero el próximo", "coger un almendrón", "¿esto va para…?", "¿cuánto es hasta…?"]),
    shadowLine: "Si está muy lleno, espero el próximo.",
  },
  {
    id: "p4",
    text: "En un almendrón o una guagua llena, el espacio puede ser pequeño. Puedes decir “vamos apretados”, pero cuando llega tu lugar, necesitas hablar claro: “permiso, que me bajo”. Si el punto exacto es ahí, dices “aquí mismo me bajo”.",
    translation: "In an almendrón or a full bus, space can be small. You can say we are squeezed in, but when your place arrives, you need to speak clearly: excuse me, I’m getting off.",
    highlights: highlights(["vamos apretados", "permiso, que me bajo", "aquí mismo me bajo", "la próxima parada"]),
    shadowLine: "Permiso, que me bajo. Aquí mismo me bajo.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "cuban-b1-guagua-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Using Cuban Spanish for guaguas, almendrones, routes, fares, and getting off", "Ordering Cuban food", "Arguing about music", "Introducing your family"], correctAnswer: "Using Cuban Spanish for guaguas, almendrones, routes, fares, and getting off", explanation: "The reading focuses on Cuban transport phrases.", points: 1, skillTag: "gist" },
  { id: "cuban-b1-guagua-reading-q2", type: "multiple-choice", prompt: "What does '¿me sirve esta guagua?' ask?", options: ["Whether this bus works for where you are going", "Whether the bus has music", "Whether someone is hungry", "Whether the fare is free"], correctAnswer: "Whether this bus works for where you are going", explanation: "Servir here means to be useful for your route.", points: 1, skillTag: "route" },
  { id: "cuban-b1-guagua-reading-q3", type: "true-false", prompt: "True or false: 'no cabe nadie más' means the vehicle has plenty of space.", options: ["True", "False"], correctAnswer: "False", explanation: "It means there is no room for anyone else.", points: 1, skillTag: "crowding" },
  { id: "cuban-b1-guagua-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Excuse me, I’m getting off.", wordBank: ["Permiso,", "que", "me", "bajo."], correctAnswer: "Permiso, que me bajo.", explanation: "This is the polite phrase for getting off in a crowded vehicle.", points: 2, skillTag: "phrase-building" },
  { id: "cuban-b1-guagua-reading-q5", type: "fill-blank", prompt: "Complete: Aquí mismo me ______.", nativePrompt: "I’ll get off right here.", correctAnswer: "bajo", explanation: "Aquí mismo me bajo means I’ll get off right here.", points: 1, skillTag: "getting-off" },
];

export const cubanSpanishB1TakingGuaguaAlmendronReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Cuban B1 Reading: La guagua y el almendrón",
  subtitle: "A Spanish-only reading about Cuban transport, route questions, crowded vehicles, and getting off clearly.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Cuban Spanish", "B1", "reading", "transport", "guagua", "almendrón"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: transportVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "These pairs come directly from the Cuban B1 guagua and almendrón vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const cubanSpanishB1TakingGuaguaAlmendronQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Cuban Spanish B1: Taking a Guagua or Almendrón Quiz",
  subtitle: "Choose the right Cuban phrase for buses, almendrones, fares, routes, crowded vehicles, and getting off.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Cuban Spanish", "B1", "quiz", "transport", "guagua", "almendrón"],
  estimatedMinutes: 20,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Use this after the speaking lesson, flashcards, sentence builder, story, and reading to test practical Cuban transport phrases in context.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "cuban-b1-guagua-quiz-1", type: "multiple-choice", prompt: "You want to know where to catch the bus to Miramar. Which phrase fits?", options: ["¿Dónde cojo la guagua para Miramar?", "Aquí mismo me bajo", "No cabe nadie más", "Vamos apretados"], correctAnswer: "¿Dónde cojo la guagua para Miramar?", explanation: "This asks where to catch the bus to a destination.", points: 1, skillTag: "route" },
      { id: "cuban-b1-guagua-quiz-2", type: "multiple-choice", prompt: "Which phrase asks whether the bus works for your route?", options: ["¿Me sirve esta guagua?", "¿Hay puesto?", "Me deja en…", "Espero el próximo"], correctAnswer: "¿Me sirve esta guagua?", explanation: "Servir means it works/is useful for your route.", points: 1, skillTag: "route" },
      { id: "cuban-b1-guagua-quiz-3", type: "fill-blank", prompt: "Complete: ¿Cuánto cuesta el ______?", nativePrompt: "How much is the fare?", correctAnswer: "pasaje", explanation: "Pasaje means fare.", points: 1, skillTag: "fare" },
      { id: "cuban-b1-guagua-quiz-4", type: "true-false", prompt: "True or false: 'coger un almendrón' means to take a shared old-car taxi option.", options: ["True", "False"], correctAnswer: "True", explanation: "An almendrón is an old American car often used as a shared taxi.", points: 1, skillTag: "transport" },
      { id: "cuban-b1-guagua-quiz-5", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Does this bus go through Centro Habana?", wordBank: ["¿Esta", "guagua", "pasa", "por", "Centro", "Habana?"], correctAnswer: "¿Esta guagua pasa por Centro Habana?", explanation: "This checks a bus route.", points: 2, skillTag: "word-order" },
      { id: "cuban-b1-guagua-quiz-6", type: "multiple-choice", prompt: "The vehicle is too full. What can you say?", options: ["Si está muy lleno, espero el próximo", "Me avisa cuando lleguemos", "Voy para", "¿Esto va para…?"], correctAnswer: "Si está muy lleno, espero el próximo", explanation: "This means if it is too full, I’ll wait for the next one.", points: 1, skillTag: "crowding" },
      { id: "cuban-b1-guagua-quiz-7", type: "fill-blank", prompt: "Complete: Me deja en la esquina, por ______.", nativePrompt: "Drop me off at the corner, please.", correctAnswer: "favor", explanation: "Por favor keeps the request polite.", points: 1, skillTag: "driver-request" },
      { id: "cuban-b1-guagua-quiz-8", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll get off at the next stop.", wordBank: ["Me", "bajo", "en", "la", "próxima", "parada."], correctAnswer: "Me bajo en la próxima parada.", explanation: "This uses me bajo en + stop.", points: 2, skillTag: "getting-off" },
      pairQuestion("cuban-b1-guagua-match-1", "Match Cuban bus-route phrases.", transportVocab.slice(0, 8)),
      pairQuestion("cuban-b1-guagua-match-2", "Match getting-off and crowding phrases.", transportVocab.slice(8, 16)),
      pairQuestion("cuban-b1-guagua-match-3", "Match almendrón and backup-plan phrases.", transportVocab.slice(16, 24)),
    ],
  },
};
