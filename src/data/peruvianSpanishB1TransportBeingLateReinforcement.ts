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

const transportVocab: VocabItem[] = [
  { id: "oye", term: "Oye", meaning: "Hey / Listen", note: "Casual attention-getter.", example: "Oye, ¿dónde estás?", translation: "Hey, where are you?", starred: true },
  { id: "causa", term: "Causa", meaning: "Mate / Bro / Buddy", note: "Very Peruvian and informal.", example: "Causa, el tráfico está bravo.", translation: "Mate, traffic is really bad.", starred: true },
  { id: "oye-causa", term: "Oye, causa", meaning: "Hey, mate", note: "Informal opener with friends.", example: "Oye, causa, ¿dónde estás?", translation: "Hey, mate, where are you?", starred: true },
  { id: "al-toque", term: "Al toque", meaning: "Right away / Immediately / Very soon", note: "Very common Peruvian timing phrase.", example: "Voy al toque.", translation: "I’m coming right away.", starred: true },
  { id: "pucha", term: "Pucha", meaning: "Damn / Oh no / Geez", note: "A mild, non-vulgar reaction.", example: "Pucha, se me hizo tarde.", translation: "Damn, I ended up running late.", starred: true },
  { id: "trafico-bravo", term: "El tráfico está bravo", meaning: "The traffic is really bad/intense", note: "Bravo here means intense or rough.", example: "El tráfico está bravo, causa.", translation: "Traffic is really bad, mate.", starred: true },
  { id: "paradero", term: "Paradero", meaning: "Bus stop", note: "Common transport word in Peru.", example: "Estoy por el paradero.", translation: "I’m near the bus stop.", starred: true },
  { id: "la-combi", term: "La combi", meaning: "A small public transport van/minibus", note: "Common informal transport option.", example: "La combi me dejó.", translation: "I missed the combi.", starred: true },
  { id: "el-micro", term: "El micro", meaning: "Bus / Minibus", note: "Common public transport word.", example: "El micro está full.", translation: "The bus is packed.", starred: true },
  { id: "el-corredor", term: "El corredor", meaning: "A bus operating on one of Lima’s designated corridor routes", note: "Lima-specific transport reference.", example: "Voy en el corredor.", translation: "I’m taking the corridor bus.", starred: true },
  { id: "el-metropolitano", term: "El Metropolitano", meaning: "Lima’s rapid-transit bus system", note: "Specific Lima transit system.", example: "El Metropolitano está full.", translation: "The Metropolitano is packed.", starred: true },
  { id: "esta-full", term: "Está full", meaning: "It’s packed / It’s completely full", note: "Casual transport crowding phrase.", example: "El micro está full.", translation: "The bus is packed.", starred: true },
  { id: "pasa-la-voz", term: "Pasa la voz", meaning: "Let me know / Give me a heads-up / Spread the word", note: "Useful coordination phrase.", example: "Pasa la voz cuando llegues.", translation: "Let me know when you arrive.", starred: true },
  { id: "manyas", term: "Manyas", meaning: "Do you know? / Do you understand? / Do you get it?", note: "Very informal Peruvian slang.", example: "Manyas dónde queda el paradero?", translation: "Do you know where the bus stop is?", starred: true },
  { id: "manyas-question", term: "¿Manyas?", meaning: "Do you get it? / You know?", note: "Informal check for understanding.", example: "Sigue de frente, ¿manyas?", translation: "Keep going straight, you know?", starred: true },
  { id: "manyas-donde-queda", term: "¿Manyas dónde queda…?", meaning: "Do you know where … is?", note: "Useful for asking directions informally.", example: "¿Manyas dónde queda el paradero?", translation: "Do you know where the bus stop is?", starred: true },
  { id: "ya-pe", term: "Ya pe", meaning: "Alright then / Come on then / Okay, fine", note: "Pe is a Peruvian reduction of pues.", example: "Ya pe, ponte las pilas.", translation: "Come on then, get moving.", starred: true },
  { id: "nomas", term: "Nomás", meaning: "Just / Simply / Go ahead", note: "Makes phrases relaxed and conversational.", example: "Espera nomás.", translation: "Just wait.", starred: true },
  { id: "espera-nomas", term: "Espera nomás", meaning: "Just wait / Wait there", note: "Relaxed instruction.", example: "Espera nomás en el paradero.", translation: "Just wait at the bus stop.", starred: true },
  { id: "normal-nomas", term: "Normal nomás", meaning: "It’s fine / No problem / Don’t worry about it", note: "Relaxed reassurance.", example: "Normal nomás, causa.", translation: "It’s all good, mate.", starred: true },
  { id: "no-te-paltees", term: "No te paltees", meaning: "Don’t panic / Don’t get embarrassed / Don’t feel awkward", note: "Informal reassurance.", example: "No te paltees, ya llego.", translation: "Don’t panic, I’m arriving now.", starred: true },
  { id: "ponte-las-pilas", term: "Ponte las pilas", meaning: "Get moving / Hurry up / Get your act together", note: "Friendly pressure to move faster.", example: "Ya pe, ponte las pilas.", translation: "Come on then, get moving.", starred: true },
  { id: "fijo", term: "Fijo", meaning: "Definitely / For sure", note: "Confirmation phrase.", example: "Sí, fijo.", translation: "Yeah, for sure.", starred: true },
  { id: "ahorita", term: "Ahorita", meaning: "Right now / In a moment", note: "Timing depends on context.", example: "Ya estoy yendo ahorita.", translation: "I’m on my way right now.", starred: true },
  { id: "de-frente", term: "De frente", meaning: "Straight ahead", note: "Direction phrase.", example: "Sigue de frente.", translation: "Keep going straight.", starred: true },
  { id: "a-la-vuelta", term: "A la vuelta", meaning: "Around the corner / Nearby", note: "Direction phrase.", example: "El paradero está a la vuelta.", translation: "The bus stop is around the corner.", starred: true },
  { id: "donde-estas", term: "¿Dónde estás?", meaning: "Where are you?", note: "Core late-arrival question.", example: "Oye, causa, ¿dónde estás?", translation: "Hey, mate, where are you?", starred: true },
  { id: "ya-estoy-yendo", term: "Ya estoy yendo", meaning: "I’m already on my way", note: "Very useful delay update.", example: "Ya estoy yendo, causa.", translation: "I’m already on my way, mate.", starred: true },
  { id: "se-me-hizo-tarde", term: "Se me hizo tarde", meaning: "I ended up running late", note: "Natural late excuse.", example: "Pucha, se me hizo tarde.", translation: "Damn, I ended up running late.", starred: true },
  { id: "voy-al-toque", term: "Voy al toque", meaning: "I’m coming right away", note: "Urgent arrival promise.", example: "Se me hizo tarde, pero voy al toque.", translation: "I ended up running late, but I’m coming right away.", starred: true },
  { id: "estoy-por", term: "Estoy por…", meaning: "I’m near… / I’m around…", note: "Location update pattern.", example: "Estoy por el paradero.", translation: "I’m near the bus stop.", starred: true },
  { id: "estoy-por-el-paradero", term: "Estoy por el paradero", meaning: "I’m near the bus stop", note: "Specific location update.", example: "Estoy por el paradero de la avenida.", translation: "I’m near the avenue bus stop.", starred: true },
  { id: "ya-yendo-micro", term: "Ya estoy yendo en el micro", meaning: "I’m already on my way on the bus", note: "Transport update.", example: "Ya estoy yendo en el micro.", translation: "I’m already on my way on the bus.", starred: true },
  { id: "voy-corredor", term: "Voy en el corredor", meaning: "I’m taking the corridor bus", note: "Lima corridor bus phrase.", example: "Voy en el corredor y me bajo en Javier Prado.", translation: "I’m taking the corridor bus and I get off at Javier Prado.", starred: true },
  { id: "me-bajo-en", term: "Me bajo en…", meaning: "I get off at…", note: "Transit stop phrase.", example: "Me bajo en Javier Prado.", translation: "I get off at Javier Prado.", starred: true },
  { id: "me-bajo-javier-prado", term: "Me bajo en Javier Prado", meaning: "I get off at Javier Prado", note: "Specific Lima location phrase.", example: "Me bajo en Javier Prado y camino.", translation: "I get off at Javier Prado and walk.", starred: true },
  { id: "metropolitano-full", term: "El Metropolitano está full", meaning: "The Metropolitano is packed", note: "Crowding complaint.", example: "Pucha, el Metropolitano está full.", translation: "Damn, the Metropolitano is packed.", starred: true },
  { id: "combi-me-dejo", term: "La combi me dejó", meaning: "I missed the combi / The combi left without me", note: "Transport problem phrase.", example: "Pucha, la combi me dejó.", translation: "Damn, I missed the combi.", starred: true },
  { id: "micro-full", term: "El micro está full", meaning: "The bus is packed", note: "Common delay reason.", example: "La combi me dejó y el micro está full.", translation: "I missed the combi and the bus is packed.", starred: true },
  { id: "sigue-de-frente", term: "Sigue de frente", meaning: "Keep going straight", note: "Direction instruction.", example: "Sigue de frente hasta la esquina.", translation: "Keep going straight until the corner.", starred: true },
  { id: "cruzando-la-avenida", term: "Cruzando la avenida", meaning: "Across the avenue / After crossing the avenue", note: "Direction/location phrase.", example: "El paradero está cruzando la avenida.", translation: "The bus stop is across the avenue.", starred: true },
  { id: "paradero-vuelta", term: "El paradero está a la vuelta", meaning: "The bus stop is around the corner", note: "Helpful direction phrase.", example: "El paradero está a la vuelta, causa.", translation: "The bus stop is around the corner, mate.", starred: true },
  { id: "paradero-cruzando", term: "El paradero está cruzando la avenida", meaning: "The bus stop is across the avenue", note: "Helpful direction phrase.", example: "El paradero está cruzando la avenida.", translation: "The bus stop is across the avenue.", starred: true },
  { id: "pasa-voz-llegues", term: "Pasa la voz cuando llegues", meaning: "Let me know when you arrive", note: "Arrival check-in.", example: "Pasa la voz cuando llegues al paradero.", translation: "Let me know when you arrive at the bus stop.", starred: true },
  { id: "esperame-paradero", term: "Espérame nomás en el paradero", meaning: "Just wait for me at the bus stop", note: "Relaxed instruction while late.", example: "Espérame nomás en el paradero, voy al toque.", translation: "Just wait for me at the bus stop; I’m coming right away.", starred: true },
  { id: "oye-causa-donde-estas", term: "Oye, causa, ¿dónde estás?", meaning: "Hey, mate, where are you?", note: "Complete local check-in.", example: "Oye, causa, ¿dónde estás? Ya empezó la cola.", translation: "Hey, mate, where are you? The line already started.", starred: true },
  { id: "ya-yendo-causa", term: "Ya estoy yendo, causa.", meaning: "I’m already on my way, mate.", note: "Complete informal update.", example: "Ya estoy yendo, causa. No te paltees.", translation: "I’m already on my way, mate. Don’t panic.", starred: true },
  { id: "tarde-voy-toque", term: "Se me hizo tarde, pero voy al toque.", meaning: "I ended up running late, but I’m coming right away.", note: "Complete delay apology.", example: "Se me hizo tarde, pero voy al toque.", translation: "I ended up running late, but I’m coming right away.", starred: true },
  { id: "pucha-tarde", term: "Pucha, se me hizo tarde.", meaning: "Damn, I ended up running late.", note: "Mild late reaction.", example: "Pucha, se me hizo tarde otra vez.", translation: "Damn, I ended up running late again.", starred: true },
  { id: "trafico-bravo-causa", term: "El tráfico está bravo, causa.", meaning: "The traffic is really bad, mate.", note: "Complete traffic complaint.", example: "El tráfico está bravo, causa.", translation: "Traffic is really bad, mate.", starred: true },
  { id: "metropolitano-full-yendo", term: "Pucha, el Metropolitano está full, pero ya estoy yendo.", meaning: "Damn, the Metropolitano is packed, but I’m already on my way.", note: "Complete Lima transport delay update.", example: "Pucha, el Metropolitano está full, pero ya estoy yendo.", translation: "Damn, the Metropolitano is packed, but I’m already on my way.", starred: true },
  { id: "combi-dejo-micro-full", term: "Pucha, la combi me dejó y el micro está full.", meaning: "Damn, I missed the combi, and the bus is packed.", note: "Complete transport problem.", example: "Pucha, la combi me dejó y el micro está full.", translation: "Damn, I missed the combi, and the bus is packed.", starred: true },
  { id: "ya-pe-pilas", term: "Ya pe, ponte las pilas. Ven al toque.", meaning: "Come on then, get moving. Come right away.", note: "Friendly pressure among friends.", example: "Ya pe, ponte las pilas. Ven al toque.", translation: "Come on then, get moving. Come right away.", starred: true },
  { id: "si-fijo-yendo", term: "Sí, fijo. Ya estoy yendo ahorita.", meaning: "Yeah, definitely. I’m on my way right now.", note: "Strong confirmation.", example: "Sí, fijo. Ya estoy yendo ahorita.", translation: "Yeah, definitely. I’m on my way right now.", starred: true },
  { id: "manyas-paradero", term: "¿Manyas dónde queda el paradero?", meaning: "Do you know where the bus stop is?", note: "Informal direction question.", example: "Oye, ¿manyas dónde queda el paradero?", translation: "Hey, do you know where the bus stop is?", starred: true },
  { id: "espera-yendo", term: "Espera nomás, ya estoy yendo.", meaning: "Just wait; I’m already on my way.", note: "Reassuring delay update.", example: "Espera nomás, ya estoy yendo.", translation: "Just wait; I’m already on my way.", starred: true },
  { id: "normal-no-paltees", term: "Normal nomás, causa, no te paltees.", meaning: "It’s all good, mate; don’t panic.", note: "Complete reassurance.", example: "Normal nomás, causa, no te paltees.", translation: "It’s all good, mate; don’t panic.", starred: true },
  { id: "oye-manyas-paradero", term: "Oye, ¿manyas dónde está el paradero?", meaning: "Hey, do you know where the bus stop is?", note: "Complete informal direction question.", example: "Oye, ¿manyas dónde está el paradero?", translation: "Hey, do you know where the bus stop is?", starred: true },
  { id: "ya-pe-pasa-voz-avenida", term: "Ya pe, pasa la voz cuando estés cruzando la avenida.", meaning: "Alright then, let me know when you’re crossing the avenue.", note: "Complete local coordination phrase.", example: "Ya pe, pasa la voz cuando estés cruzando la avenida.", translation: "Alright then, let me know when you’re crossing the avenue.", starred: true },
];

const highlightMap = Object.fromEntries(transportVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, explanation, wordBreakdown };
}

export const peruvianSpanishB1TransportBeingLateFlashcardDeck: FlashcardDeck = {
  id: "peruvian-spanish-b1-transport-being-late-flashcards",
  title: "Peruvian Spanish B1: Transport & Being Late Flashcards",
  subtitle: "Peruvian transport, bus-stop, direction, delay, and reassurance phrases for everyday Lima-style coordination.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "flashcards", "transport", "being late"],
  estimatedMinutes: 20,
  skoolSectionName: "Peruvian Spanish - B1 Transport and Being Late",
  relatedCourse: "peruvian-spanish-b1-transport-being-late",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: transportVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "Oye, causa = Hey, mate",
  "¿Dónde estás? = Where are you?",
  "Ya estoy yendo = I’m already on my way",
  "Se me hizo tarde = I ended up running late",
  "voy al toque = I’m coming right away",
  "El tráfico está bravo = Traffic is really bad",
  "estoy por el paradero = I’m near the bus stop",
  "la combi me dejó = I missed the combi",
  "el micro está full = the bus is packed",
  "voy en el corredor = I’m taking the corridor bus",
  "me bajo en Javier Prado = I get off at Javier Prado",
  "El Metropolitano está full = the Metropolitano is packed",
  "¿manyas dónde queda el paradero? = do you know where the bus stop is?",
  "sigue de frente = keep going straight",
  "cruzando la avenida = across the avenue",
  "el paradero está a la vuelta = the bus stop is around the corner",
  "espera nomás = just wait",
  "normal nomás = no problem",
  "no te paltees = don’t panic",
  "ponte las pilas = get moving",
  "pasa la voz cuando llegues = let me know when you arrive",
  "ahorita = right now / in a moment",
];

export const peruvianSpanishB1TransportBeingLateSentenceBuilder: SentenceBuilderLesson = {
  id: "peruvian-spanish-b1-transport-being-late-sentence-builder",
  title: "B1 Sentence Builder: Peruvian Transport & Being Late",
  subtitle: "Build practical Peruvian Spanish for late arrivals, crowded transport, bus stops, directions, and reassurance.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["peruvian-spanish", "b1", "sentence-builder", "transport", "being-late"],
  estimatedMinutes: 18,
  skoolSectionName: "Peruvian Spanish - B1 Transport and Being Late",
  relatedCourse: "peruvian-spanish-b1-transport-being-late",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short Peruvian-style voice note explaining where you are, why you are late, which transport you are using, and where your friend should wait.",
    stages: [
      stage("stage-1", "Stage 1: Ask where they are", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2), "Hey, mate, where are you?", "Oye, causa, ¿dónde estás?", "A local friendly check-in when someone is late.", breakdown([["Hey, mate", "Oye, causa"], ["where are you?", "¿dónde estás?"]])),
      stage("stage-2", "Stage 2: Say you are on the way", sentenceVocab.slice(2, 5), sentenceVocab.slice(0, 5), "I ended up running late, but I’m coming right away.", "Se me hizo tarde, pero voy al toque.", "This gives the reason and promises quick movement.", breakdown([["I ended up running late", "Se me hizo tarde"], ["but", "pero"], ["I’m coming right away", "voy al toque"]])),
      stage("stage-3", "Stage 3: Blame the traffic", sentenceVocab.slice(5, 7), sentenceVocab.slice(0, 7), "Traffic is really bad and I’m near the bus stop.", "El tráfico está bravo y estoy por el paradero.", "Bravo makes the traffic sound intense, not just normal.", breakdown([["Traffic is really bad", "El tráfico está bravo"], ["I’m near", "estoy por"], ["the bus stop", "el paradero"]])),
      stage("stage-4", "Stage 4: Transport chaos", sentenceVocab.slice(7, 9), sentenceVocab.slice(0, 9), "Damn, I missed the combi and the bus is packed.", "Pucha, la combi me dejó y el micro está full.", "A realistic local excuse with two transport problems.", breakdown([["Damn", "Pucha"], ["I missed the combi", "la combi me dejó"], ["the bus is packed", "el micro está full"]])),
      stage("stage-5", "Stage 5: Corridor route", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "I’m taking the corridor bus and I get off at Javier Prado, but the Metropolitano is packed.", "Voy en el corredor y me bajo en Javier Prado, pero el Metropolitano está full.", "This gives transport route, stop, and crowding.", breakdown([["I’m taking the corridor bus", "Voy en el corredor"], ["I get off at Javier Prado", "me bajo en Javier Prado"], ["the Metropolitano is packed", "el Metropolitano está full"]])),
      stage("stage-6", "Stage 6: Ask directions", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "Do you know where the bus stop is? Keep going straight; it is across the avenue and around the corner.", "¿Manyas dónde queda el paradero? Sigue de frente; está cruzando la avenida y a la vuelta.", "Manyas makes the direction question informal.", breakdown([["Do you know where", "¿Manyas dónde queda"], ["the bus stop", "el paradero"], ["keep going straight", "sigue de frente"], ["across the avenue", "cruzando la avenida"], ["around the corner", "a la vuelta"]])),
      stage("stage-7", "Stage 7: Reassure the person", sentenceVocab.slice(16, 19), sentenceVocab.slice(0, 19), "Just wait. No problem, don’t panic.", "Espera nomás. Normal nomás, no te paltees.", "A calm response when the other person is stressed.", breakdown([["Just wait", "Espera nomás"], ["No problem", "Normal nomás"], ["don’t panic", "no te paltees"]])),
      stage("stage-8", "Stage 8: Push them to move", sentenceVocab.slice(19, 22), sentenceVocab, "Come on then, get moving. Let me know when you arrive; I’m on my way right now.", "Ya pe, ponte las pilas. Pasa la voz cuando llegues; ya estoy yendo ahorita.", "This mixes friendly pressure, coordination, and a timing update.", breakdown([["Come on then", "Ya pe"], ["get moving", "ponte las pilas"], ["let me know when you arrive", "pasa la voz cuando llegues"], ["I’m on my way right now", "ya estoy yendo ahorita"]])),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/peruvian-spanish-b1-transport-being-late/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "peruvian-b1-transport-story-q1",
    type: "multiple-choice",
    prompt: "Why is Nico delayed at the start?",
    options: ["He ended up running late and traffic is really bad", "He forgot the restaurant", "He is at home asleep", "He lost his phone"],
    correctAnswer: "He ended up running late and traffic is really bad",
    explanation: "By this point, Nico has said se me hizo tarde and el tráfico está bravo.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "peruvian-b1-transport-story-q2",
    type: "multiple-choice",
    prompt: "Where should Nico wait or meet?",
    options: ["At or near the bus stop", "At the airport", "Inside a cinema", "At his office"],
    correctAnswer: "At or near the bus stop",
    explanation: "They keep coordinating around el paradero.",
    points: 1,
    skillTag: "location",
  },
  {
    id: "peruvian-b1-transport-story-q3",
    type: "multiple-choice",
    prompt: "What does 'no te paltees' mean here?",
    options: ["Don’t panic", "Buy a ticket", "Turn left", "Get off at Javier Prado"],
    correctAnswer: "Don’t panic",
    explanation: "It reassures the person not to stress or feel awkward.",
    points: 1,
    skillTag: "meaning",
  },
  {
    id: "peruvian-b1-transport-story-q4",
    type: "multiple-choice",
    prompt: "What direction does Vale give?",
    options: ["Keep going straight and cross the avenue", "Go back home", "Take a taxi to the airport", "Enter the mall"],
    correctAnswer: "Keep going straight and cross the avenue",
    explanation: "She says sigue de frente and cruzando la avenida.",
    points: 1,
    skillTag: "directions",
  },
  {
    id: "peruvian-b1-transport-story-q5",
    type: "multiple-choice",
    prompt: "What does 'pasa la voz cuando llegues' ask Nico to do?",
    options: ["Let Vale know when he arrives", "Call the driver", "Pay the fare", "Cancel the plan"],
    correctAnswer: "Let Vale know when he arrives",
    explanation: "Pasa la voz means let me know or give me a heads-up.",
    points: 1,
    skillTag: "coordination",
  },
];

export const peruvianSpanishB1TransportBeingLateWhatsAppStory: WhatsAppStory = {
  id: "peruvian-spanish-b1-transport-being-late",
  title: "Peruvian B1 Story: The Packed Metropolitano",
  subtitle: "A WhatsApp-style story about running late, crowded transport, finding the bus stop, and staying calm.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "WhatsApp", "transport", "being late"],
  estimatedMinutes: 20,
  skoolSectionName: "Peruvian Spanish - B1 Transport and Being Late",
  relatedCourse: "peruvian-spanish-b1-transport-being-late-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "nico", name: "Nico", initials: "N", side: "right", color: "blue" },
      { id: "vale", name: "Vale", initials: "V", side: "left", color: "green" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Nico is late to meet Vale. He has to explain traffic, crowded transport, and where he is.", "Guide: Nico is late to meet Vale. He has to explain traffic, crowded transport, and where he is.", [], "narrator"),
      message("m1", "vale", "Oye, causa, ¿dónde estás?", "Hey, mate, where are you?", ["Oye, causa", "Causa", "¿Dónde estás?", "Oye, causa, ¿dónde estás?"], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m1.mp3"),
      message("m2", "nico", "Pucha, se me hizo tarde.", "Damn, I ended up running late.", ["Pucha", "Se me hizo tarde", "Pucha, se me hizo tarde."]),
      message("m3", "nico", "Pero ya estoy yendo, causa.", "But I’m already on my way, mate.", ["Ya estoy yendo", "Causa", "Ya estoy yendo, causa."]),
      message("m4", "vale", "Ya pe, ponte las pilas. Ven al toque.", "Come on then, get moving. Come right away.", ["Ya pe", "Ponte las pilas", "Al toque", "Ya pe, ponte las pilas. Ven al toque."]),
      message("m5", "nico", "El tráfico está bravo, causa.", "Traffic is really bad, mate.", ["El tráfico está bravo", "Causa", "El tráfico está bravo, causa."], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m5.mp3"),
      message("m6", "vale", "¿Estás en combi, micro o Metropolitano?", "Are you in a combi, bus, or Metropolitano?", ["La combi", "El micro", "El Metropolitano"]),
      message("m7", "nico", "Pucha, el Metropolitano está full, pero ya estoy yendo.", "Damn, the Metropolitano is packed, but I’m already on my way.", ["Pucha", "El Metropolitano está full", "Está full", "Ya estoy yendo", "Pucha, el Metropolitano está full, pero ya estoy yendo."]),
      message("m8", "vale", "Normal nomás, causa, no te paltees.", "It’s all good, mate, don’t panic.", ["Normal nomás", "Causa", "No te paltees", "Normal nomás, causa, no te paltees."]),
      message("m9", "nico", "Me bajo en Javier Prado y camino.", "I get off at Javier Prado and walk.", ["Me bajo en…", "Me bajo en Javier Prado"]),
      message("m10", "vale", "Fijo. Pasa la voz cuando llegues.", "For sure. Let me know when you arrive.", ["Fijo", "Pasa la voz", "Pasa la voz cuando llegues"], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m10.mp3"),
      message("m11", "nico", "Oye, ¿manyas dónde está el paradero?", "Hey, do you know where the bus stop is?", ["Oye", "Manyas", "¿Manyas dónde queda…?", "Oye, ¿manyas dónde está el paradero?"]),
      message("m12", "vale", "Sí, sigue de frente.", "Yes, keep going straight.", ["Sigue de frente", "De frente"]),
      message("m13", "vale", "El paradero está cruzando la avenida.", "The bus stop is across the avenue.", ["Paradero", "Cruzando la avenida", "El paradero está cruzando la avenida"]),
      message("m14", "nico", "¿A la vuelta del grifo?", "Around the corner from the gas station?", ["A la vuelta"]),
      message("m15", "vale", "Sí, el paradero está a la vuelta.", "Yes, the bus stop is around the corner.", ["El paradero está a la vuelta", "A la vuelta"], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m15.mp3"),
      message("m16", "nico", "Ya, espera nomás. Voy al toque.", "Okay, just wait. I’m coming right away.", ["Espera nomás", "Nomás", "Voy al toque"]),
      message("m17", "vale", "Estoy por el paradero. Te espero ahí.", "I’m near the bus stop. I’ll wait for you there.", ["Estoy por…", "Estoy por el paradero", "Paradero"]),
      message("m18", "nico", "La combi me dejó y el micro está full.", "I missed the combi and the bus is packed.", ["La combi me dejó", "El micro está full", "Está full"]),
      message("m19", "vale", "Pucha, qué roche. Pero normal nomás.", "Damn, awkward. But no problem.", ["Pucha", "Normal nomás"]),
      message("m20", "nico", "Sí, fijo. Ya estoy yendo ahorita.", "Yeah, definitely. I’m on my way right now.", ["Fijo", "Ahorita", "Sí, fijo. Ya estoy yendo ahorita."], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m20.mp3"),
      message("m21", "vale", "Ya pe, pasa la voz cuando estés cruzando la avenida.", "Alright then, let me know when you’re crossing the avenue.", ["Ya pe", "Pasa la voz", "Cruzando la avenida", "Ya pe, pasa la voz cuando estés cruzando la avenida."]),
      message("m22", "nico", "Estoy cruzando la avenida ahora.", "I’m crossing the avenue now.", ["Cruzando la avenida"]),
      message("m23", "vale", "Entonces sigue de frente y mira a la derecha.", "Then keep going straight and look to the right.", ["Sigue de frente", "De frente"]),
      message("m24", "nico", "Ya veo el paradero.", "I already see the bus stop.", ["Paradero"]),
      message("m25", "vale", "Espérame nomás en el paradero.", "Just wait for me at the bus stop.", ["Espérame nomás en el paradero", "Espera nomás", "Paradero"], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m25.mp3"),
      message("m26", "nico", "Listo. No me palteo, pero sí llegué tarde.", "Done. I’m not panicking, but I did arrive late.", ["No te paltees"]),
      message("m27", "vale", "Normal nomás. El tráfico está bravo para todos.", "No problem. Traffic is really bad for everyone.", ["Normal nomás", "El tráfico está bravo"]),
      message("m28", "nico", "Gracias, causa. Ya estoy en el paradero.", "Thanks, mate. I’m already at the bus stop.", ["Causa", "Paradero"]),
      message("m29", "vale", "Bacán. Ahora ven de frente a la entrada.", "Cool. Now come straight to the entrance.", ["De frente"]),
      message("m30", "nico", "Voy al toque. Pasa la voz si se mueven.", "I’m coming right away. Let me know if you move.", ["Voy al toque", "Pasa la voz"], "voice-note", "/audio/stories/peruvian-spanish-b1-transport-being-late/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "peruvian-b1-transport-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "peruvian-b1-transport-check-2", afterMessageId: "m8", question: storyQuestions[2] },
      { id: "peruvian-b1-transport-check-3", afterMessageId: "m10", question: storyQuestions[4] },
      { id: "peruvian-b1-transport-check-4", afterMessageId: "m15", question: storyQuestions[3] },
      { id: "peruvian-b1-transport-check-5", afterMessageId: "m25", question: storyQuestions[1] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: transportVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: transportVocab.map((item) => item.term),
      grammarPatterns: [
        "Late excuse: se me hizo tarde + pero voy al toque.",
        "Location update: estoy por + place.",
        "Transit route: voy en + transport; me bajo en + stop.",
        "Directions: sigue de frente, cruzando la avenida, a la vuelta.",
      ],
      speakingPrompts: [
        "Explain that traffic is bad and you are on your way.",
        "Ask where the bus stop is and understand directions.",
        "Tell someone to wait at the bus stop and let you know when they arrive.",
      ],
    },
    completionTask: {
      title: "Your late transport voice note",
      instructions: "Record a 60-second Peruvian Spanish voice note explaining that you are late, naming the transport problem, giving your location, and asking your friend to wait.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Llegar tarde en Lima no siempre significa que alguien salió con mala intención. A veces el tráfico está bravo, el Metropolitano está full o la combi te deja. Por eso una conversación real empieza rápido: Oye, causa, ¿dónde estás? La respuesta puede ser simple: pucha, se me hizo tarde, pero ya estoy yendo.",
    translation:
      "Arriving late in Lima does not always mean someone left with bad intentions. Sometimes traffic is really bad, the Metropolitano is packed, or the combi leaves without you. That is why a real conversation starts quickly: Hey, mate, where are you? The answer can be simple: damn, I ended up running late, but I’m already on my way.",
    highlights: highlights(["El tráfico está bravo", "El Metropolitano está full", "La combi me dejó", "Oye, causa, ¿dónde estás?", "Pucha", "Se me hizo tarde", "Ya estoy yendo"]),
    shadowLine: "Pucha, se me hizo tarde, pero ya estoy yendo.",
  },
  {
    id: "p2",
    text:
      "Para explicar dónde estás, puedes decir estoy por el paradero o ya estoy yendo en el micro. Si usas el corredor, puedes decir voy en el corredor y me bajo en Javier Prado. Estas frases son prácticas porque le dan a la otra persona una idea clara de tu ruta, sin explicar demasiado.",
    translation:
      "To explain where you are, you can say I’m near the bus stop or I’m already on my way on the bus. If you use the corridor bus, you can say I’m taking the corridor bus and I get off at Javier Prado. These phrases are practical because they give the other person a clear idea of your route without explaining too much.",
    highlights: highlights(["Estoy por el paradero", "Ya estoy yendo en el micro", "Voy en el corredor", "Me bajo en Javier Prado", "El corredor", "El micro"]),
    shadowLine: "Voy en el corredor y me bajo en Javier Prado.",
  },
  {
    id: "p3",
    text:
      "Cuando hay confusión, manyas ayuda en preguntas informales. Oye, ¿manyas dónde está el paradero? significa: hey, do you know where the bus stop is? La respuesta puede usar direcciones simples: sigue de frente, cruzando la avenida, o el paradero está a la vuelta. Son frases cortas, pero resuelven la situación.",
    translation:
      "When there is confusion, manyas helps in informal questions. Hey, do you know where the bus stop is? means: hey, do you know where the bus stop is? The answer can use simple directions: keep going straight, across the avenue, or the bus stop is around the corner. They are short phrases, but they solve the situation.",
    highlights: highlights(["Manyas", "Oye, ¿manyas dónde está el paradero?", "Sigue de frente", "Cruzando la avenida", "El paradero está a la vuelta"]),
    shadowLine: "Oye, ¿manyas dónde está el paradero?",
  },
  {
    id: "p4",
    text:
      "La persona que espera también puede hablar con calma. Normal nomás, causa, no te paltees significa que no hay problema y que la otra persona no debe entrar en pánico. Espera nomás o espérame nomás en el paradero suena más relajado que una orden fuerte. Nomás suaviza la instrucción.",
    translation:
      "The person waiting can also speak calmly. It’s all good, mate, don’t panic means there is no problem and the other person should not panic. Just wait or just wait for me at the bus stop sounds more relaxed than a strong order. Nomás softens the instruction.",
    highlights: highlights(["Normal nomás, causa, no te paltees.", "Normal nomás", "No te paltees", "Espera nomás", "Espérame nomás en el paradero", "Nomás"]),
    shadowLine: "Normal nomás, causa, no te paltees.",
  },
  {
    id: "p5",
    text:
      "A veces sí toca apurar al amigo. Ya pe, ponte las pilas. Ven al toque no es formal, pero entre amigos puede sonar natural. Ya pe empuja la conversación, ponte las pilas pide acción y al toque marca urgencia. Si la persona confirma, puede decir: sí, fijo, ya estoy yendo ahorita.",
    translation:
      "Sometimes you really do need to hurry your friend up. Come on then, get moving. Come right away is not formal, but among friends it can sound natural. Ya pe pushes the conversation, ponte las pilas asks for action, and al toque marks urgency. If the person confirms, they can say: yes, for sure, I’m on my way right now.",
    highlights: highlights(["Ya pe", "Ponte las pilas", "Al toque", "Ya pe, ponte las pilas. Ven al toque.", "Fijo", "Ahorita", "Sí, fijo. Ya estoy yendo ahorita."]),
    shadowLine: "Ya pe, ponte las pilas. Ven al toque.",
  },
  {
    id: "p6",
    text:
      "La clave de esta conversación no es memorizar una ruta perfecta. La clave es poder decir dónde estás, qué transporte estás usando, por qué te demoraste y qué debe hacer la otra persona. Pasa la voz cuando llegues o pasa la voz cuando estés cruzando la avenida mantienen la coordinación viva hasta que todos se encuentren.",
    translation:
      "The key to this conversation is not memorizing a perfect route. The key is being able to say where you are, what transport you are using, why you were delayed, and what the other person should do. Let me know when you arrive or let me know when you are crossing the avenue keeps coordination alive until everyone meets.",
    highlights: highlights(["Pasa la voz", "Pasa la voz cuando llegues", "Ya pe, pasa la voz cuando estés cruzando la avenida.", "Cruzando la avenida"]),
    shadowLine: "Pasa la voz cuando llegues.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "peruvian-b1-transport-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Handling transport delays and directions in Peruvian Spanish", "Buying food in a market", "Introducing yourself at work", "Describing a vacation"],
    correctAnswer: "Handling transport delays and directions in Peruvian Spanish",
    explanation: "The reading explains late-arrival, transport, bus-stop, and direction phrases.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "peruvian-b1-transport-reading-q2",
    type: "multiple-choice",
    prompt: "What does 'estoy por el paradero' mean?",
    options: ["I’m near the bus stop", "I missed the bus", "I’m at work", "I’m going home"],
    correctAnswer: "I’m near the bus stop",
    explanation: "Estoy por means I’m near or around a place.",
    points: 1,
    skillTag: "location",
  },
  {
    id: "peruvian-b1-transport-reading-q3",
    type: "true-false",
    prompt: "True or false: 'nomás' can soften an instruction and make it sound more relaxed.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading explains that nomás makes espera nomás sound relaxed.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "peruvian-b1-transport-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the late-arrival update.",
    wordBank: ["Se", "me", "hizo", "tarde,", "pero", "voy", "al", "toque"],
    correctAnswer: "Se me hizo tarde, pero voy al toque",
    explanation: "This means I ended up running late, but I’m coming right away.",
    points: 2,
    skillTag: "sentence-order",
  },
  {
    id: "peruvian-b1-transport-reading-q5",
    type: "fill-blank",
    prompt: "Complete: Pasa la voz cuando ______.",
    nativePrompt: "Let me know when you arrive.",
    correctAnswer: "llegues",
    explanation: "Pasa la voz cuando llegues means let me know when you arrive.",
    points: 1,
    skillTag: "coordination",
  },
];

export const peruvianSpanishB1TransportBeingLateReading: ReadingComprehension = {
  id: "peruvian-spanish-b1-transport-being-late-reading",
  title: "Peruvian B1 Reading: El tráfico está bravo",
  subtitle: "A reading about Peruvian transport delays, bus stops, directions, and calm coordination.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "reading", "transport", "being late"],
  estimatedMinutes: 18,
  skoolSectionName: "Peruvian Spanish - B1 Transport and Being Late",
  relatedCourse: "peruvian-spanish-b1-transport-being-late",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/peruvian-spanish-b1-transport-being-late/full.mp3",
    audioAlignmentUrl: "/audio/readings/peruvian-spanish-b1-transport-being-late/timings.json",
    paragraphs: readingParagraphs,
    glossary: transportVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the Peruvian B1 transport and being late vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  transportVocab.slice(0, 10),
  transportVocab.slice(10, 20),
  transportVocab.slice(20, 30),
  transportVocab.slice(30, 40),
  transportVocab.slice(40, 50),
  transportVocab.slice(50),
];

export const peruvianSpanishB1TransportBeingLateQuiz: CheckpointQuiz = {
  id: "peruvian-spanish-b1-transport-being-late-quiz",
  title: "Peruvian Spanish B1: Transport & Being Late Quiz",
  subtitle: "Practice choosing Peruvian phrases for delays, crowded buses, bus stops, directions, and reassurance.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "quiz", "transport", "being late"],
  estimatedMinutes: 20,
  skoolSectionName: "Peruvian Spanish - B1 Transport and Being Late",
  relatedCourse: "peruvian-spanish-b1-transport-being-late",
  activityType: "quiz",
  data: {
    description: "Use this after the speaking lesson and surrounding activities to test transport and being-late phrases in context.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "peruvian-b1-transport-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase means 'I ended up running late'?",
        options: ["Se me hizo tarde", "Sigue de frente", "Está full", "A la vuelta"],
        correctAnswer: "Se me hizo tarde",
        explanation: "Se me hizo tarde is the natural late-arrival phrase.",
        points: 1,
        skillTag: "delay",
      },
      {
        id: "peruvian-b1-transport-quiz-2",
        type: "multiple-choice",
        prompt: "You are near the bus stop. Which phrase fits?",
        options: ["Estoy por el paradero", "La combi me dejó", "Ponte las pilas", "No te paltees"],
        correctAnswer: "Estoy por el paradero",
        explanation: "Estoy por el paradero means I’m near the bus stop.",
        points: 1,
        skillTag: "location",
      },
      {
        id: "peruvian-b1-transport-quiz-3",
        type: "fill-blank",
        prompt: "Complete: El micro está ______.",
        nativePrompt: "The bus is packed.",
        correctAnswer: "full",
        explanation: "Está full means it is packed or completely full.",
        points: 1,
        skillTag: "crowding",
      },
      {
        id: "peruvian-b1-transport-quiz-4",
        type: "true-false",
        prompt: "True or false: 'Ya pe' can sound like 'come on then' or 'alright then' in informal Peruvian speech.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Ya pe is informal and local, from ya pues.",
        points: 1,
        skillTag: "local-tone",
      },
      {
        id: "peruvian-b1-transport-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Hey, mate, where are you?",
        wordBank: ["Oye,", "causa,", "¿dónde", "estás?"],
        correctAnswer: "Oye, causa, ¿dónde estás?",
        explanation: "This is the full informal check-in.",
        points: 2,
        skillTag: "sentence-order",
      },
      {
        id: "peruvian-b1-transport-quiz-6",
        type: "multiple-choice",
        prompt: "Which phrase gives a direction?",
        options: ["Sigue de frente", "Estoy full", "Pucha", "Fijo"],
        correctAnswer: "Sigue de frente",
        explanation: "Sigue de frente means keep going straight.",
        points: 1,
        skillTag: "directions",
      },
      {
        id: "peruvian-b1-transport-quiz-7",
        type: "fill-blank",
        prompt: "Complete: No te ______.",
        nativePrompt: "Don’t panic / don’t feel awkward.",
        correctAnswer: "paltees",
        explanation: "No te paltees reassures someone not to panic or feel awkward.",
        points: 1,
        skillTag: "reassurance",
      },
      {
        id: "peruvian-b1-transport-quiz-8",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Let me know when you arrive.",
        wordBank: ["Pasa", "la", "voz", "cuando", "llegues"],
        correctAnswer: "Pasa la voz cuando llegues",
        explanation: "Pasa la voz means let me know or give me a heads-up.",
        points: 2,
        skillTag: "coordination",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`peruvian-b1-transport-match-${index + 1}`, `Match Peruvian transport phrases set ${index + 1}.`, chunk),
      ),
    ],
  },
};
