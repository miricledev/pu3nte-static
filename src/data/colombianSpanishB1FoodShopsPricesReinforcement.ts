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

const colombianFoodVocab: VocabItem[] = [
  { id: "que-mas", term: "¿Qué más?", meaning: "What’s up? / How’s it going?", note: "Very Colombian casual opener.", example: "¿Qué más? ¿Qué necesita?", translation: "What’s up? What do you need?", starred: true },
  { id: "que-mas-parce", term: "¿Qué más, parce?", meaning: "What’s up, mate? / What’s up, bro?", note: "Friendly and informal.", example: "¿Qué más, parce? ¿Vamos por un tintico?", translation: "What’s up, bro? Shall we go for coffee?", starred: true },
  { id: "parce", term: "parce", meaning: "mate / bro / dude", note: "Very Colombian, especially urban and informal.", example: "Parce, está cayendo un aguacero.", translation: "Bro, it’s pouring rain.", starred: true },
  { id: "parcero", term: "parcero", meaning: "mate / buddy / friend", note: "Slightly fuller form of parce.", example: "Listo, parcero, de una.", translation: "Okay, buddy, for sure." },
  { id: "me-regala", term: "¿Me regala…?", meaning: "Can I get…? / Could you give me…?", note: "Very Colombian polite ordering phrase.", example: "¿Me regala un tintico?", translation: "Can I get a small black coffee?", starred: true },
  { id: "un-tintico", term: "un tintico", meaning: "a small black coffee", note: "Colombian way to refer to coffee.", example: "¿Me regala un tintico, porfa?", translation: "Can I get a little coffee, please?", starred: true },
  { id: "cuanto-vale", term: "¿Cuánto vale?", meaning: "How much is it?", note: "Common for prices.", example: "¿Cuánto vale el pandebono?", translation: "How much is the pandebono?", starred: true },
  { id: "cuanto-es", term: "¿Cuánto es?", meaning: "How much is it? / What’s the total?", note: "Common when paying.", example: "Listo, ¿cuánto es?", translation: "Okay, what’s the total?", starred: true },
  { id: "listo", term: "listo", meaning: "okay / sorted / ready / done", note: "Super common Colombian filler/agreement word.", example: "Listo, le pago en efectivo.", translation: "Okay, I’ll pay in cash.", starred: true },
  { id: "pa-llevar", term: "pa’ llevar", meaning: "to take away / to go", note: "Spoken contraction of para llevar.", example: "¿Me lo regala pa’ llevar?", translation: "Can I get it to go?", starred: true },
  { id: "en-efectivo", term: "en efectivo", meaning: "in cash", note: "Payment phrase.", example: "Le pago en efectivo.", translation: "I’ll pay in cash." },
  { id: "con-tarjeta", term: "con tarjeta", meaning: "by card / with card", note: "Payment phrase.", example: "¿Se puede con tarjeta?", translation: "Can I pay by card?" },
  { id: "le-pago-en-efectivo", term: "le pago en efectivo", meaning: "I’ll pay in cash", note: "Polite, useful shop phrase.", example: "Listo, le pago en efectivo.", translation: "Okay, I’ll pay in cash.", starred: true },
  { id: "le-pago-con-tarjeta", term: "le pago con tarjeta", meaning: "I’ll pay by card", note: "Polite, useful shop phrase.", example: "Qué pena, le pago con tarjeta.", translation: "Sorry, I’ll pay by card.", starred: true },
  { id: "que-pena", term: "qué pena", meaning: "excuse me / sorry / my bad", note: "Very Colombian softener used before requests.", example: "Qué pena, ¿cuánto vale?", translation: "Excuse me, how much is it?", starred: true },
  { id: "bacano", term: "bacano", meaning: "cool / nice / great", note: "Common Colombian positive reaction.", example: "Qué bacano ese sitio.", translation: "That place is really nice.", starred: true },
  { id: "de-una", term: "de una", meaning: "for sure / sounds good / straight away", note: "Informal agreement.", example: "De una, vamos por un tintico.", translation: "For sure, let’s go for coffee.", starred: true },
  { id: "un-pandebono", term: "un pandebono", meaning: "a Colombian cheese bread", note: "Very common bakery item.", example: "¿Me regala un pandebono?", translation: "Can I get a pandebono?", starred: true },
  { id: "un-juguito", term: "un juguito", meaning: "a little juice", note: "Diminutive makes it softer and more casual.", example: "¿Tiene un juguito de mora?", translation: "Do you have a little blackberry juice?" },
  { id: "tiene", term: "¿Tiene…?", meaning: "Do you have…?", note: "Useful in shops.", example: "¿Tiene pandebono?", translation: "Do you have pandebono?", starred: true },
  { id: "esta-carito", term: "Está carito", meaning: "It’s a bit expensive", note: "Softer than saying está caro.", example: "Uy, está carito, ¿no?", translation: "Oof, it’s a bit expensive, isn’t it?", starred: true },
  { id: "no-me-alcanza", term: "No me alcanza", meaning: "I don’t have enough money", note: "Literally: it doesn’t reach me.", example: "Qué pena, no me alcanza.", translation: "Sorry, I don’t have enough money.", starred: true },
  { id: "a-la-orden", term: "a la orden", meaning: "at your service / how can I help?", note: "Very common in shops, restaurants, and street sellers.", example: "A la orden, vecino.", translation: "How can I help, neighbor?", starred: true },
  { id: "con-gusto", term: "con gusto", meaning: "my pleasure / gladly", note: "Very Colombian-sounding polite response.", example: "Claro, con gusto.", translation: "Of course, my pleasure.", starred: true },
  { id: "aguacero", term: "Se está cayendo un aguacero", meaning: "It’s pouring rain", note: "Everyday Colombian weather saying.", example: "Se está cayendo un aguacero; mejor pa’ llevar.", translation: "It’s pouring rain; better to go.", starred: true },
  { id: "porfa", term: "porfa", meaning: "please", note: "Short casual form of por favor.", example: "Un tintico, porfa.", translation: "A little coffee, please.", starred: true },
  { id: "vecino", term: "vecino", meaning: "neighbour / mate / sir", note: "Used casually by shopkeepers, not always literally neighbour.", example: "Vecino, ¿qué necesita?", translation: "Neighbor/sir, what do you need?", starred: true },
  { id: "que-necesita", term: "¿Qué necesita?", meaning: "What do you need? / How can I help?", note: "Common shop/service phrase.", example: "A la orden, ¿qué necesita?", translation: "At your service, what do you need?", starred: true },
  { id: "claro-con-gusto", term: "Claro, con gusto", meaning: "Of course, my pleasure", note: "Warm service phrase.", example: "Claro, con gusto, ya se lo empaco.", translation: "Of course, my pleasure, I’ll pack it for you.", starred: true },
  { id: "son-ocho-mil", term: "Son ocho mil", meaning: "It’s eight thousand", note: "Common way to give a price.", example: "Son ocho mil en total.", translation: "It’s eight thousand total.", starred: true },
  { id: "me-lo-regala-pa-llevar", term: "¿Me lo regala pa’ llevar?", meaning: "Can I get it to go?", note: "Natural Colombian ordering phrase.", example: "¿Me lo regala pa’ llevar, porfa?", translation: "Can I get it to go, please?", starred: true },
];

const highlightMap = Object.fromEntries(colombianFoodVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    starred: item.starred,
    notes: item.note,
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

export const colombianSpanishB1FoodShopsPricesFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b1-food-shops-prices-flashcards",
  title: "Colombian Spanish B1: Food, Shops & Prices Flashcards",
  subtitle: "Useful Colombian shop phrases for ordering, prices, payment, rain, and polite service.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "food", "shops", "prices", "sentence builder reinforcement"],
  estimatedMinutes: 14,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-food-shops-prices",
  activityType: "flashcards",
  data: {
    cards: colombianFoodVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué más? = What’s up?",
  "parce = mate / bro",
  "¿Me regala…? = Can I get…?",
  "un tintico = a small black coffee",
  "¿Cuánto vale? = How much is it?",
  "listo = okay / sorted",
  "pa’ llevar = to go",
  "en efectivo = in cash",
  "con tarjeta = by card",
  "qué pena = excuse me / sorry",
  "bacano = cool / nice",
  "de una = for sure",
  "un pandebono = Colombian cheese bread",
  "un juguito = a little juice",
  "¿Tiene…? = Do you have…?",
  "Está carito = It’s a bit expensive",
  "No me alcanza = I don’t have enough money",
  "a la orden = at your service",
  "con gusto = my pleasure",
  "porfa = please",
  "vecino = neighbour / sir",
  "Son ocho mil = It’s eight thousand",
];

export const colombianSpanishB1FoodShopsPricesSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-b1-food-shops-prices-sentence-builder",
  title: "B1 Sentence Builder: Colombian Food, Shops & Prices",
  subtitle: "Build natural Colombian shop sentences for cafés, bakeries, payment, prices, and takeout.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["colombian-spanish", "b1", "sentence-builder", "food", "shops", "prices"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-food-shops-prices-flashcards",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Final challenge: order food to go in a Colombian bakery, ask the price, choose cash or card, and react politely.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Greet and order coffee",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "What’s up, bro? Can I get a small black coffee?",
        "¿Qué más, parce? ¿Me regala un tintico?",
        "Colombians often use ¿Me regala...? as a polite ordering phrase. It does not literally mean the item is free.",
        breakdown([["What’s up, bro?", "¿Qué más, parce?"], ["Can I get", "¿Me regala"], ["a small black coffee", "un tintico"]]),
        ["Start with ¿Qué más, parce?", "Use ¿Me regala...? to order politely."],
      ),
      stage(
        "stage-2",
        "Stage 2: Ask the price",
        sentenceVocab.slice(4, 6),
        sentenceVocab.slice(0, 6),
        "Okay, how much is the small coffee?",
        "Listo, ¿cuánto vale el tintico?",
        "Listo is a very common Colombian filler. It can mean okay, ready, sorted, or done.",
        breakdown([["Okay", "Listo"], ["how much is", "cuánto vale"], ["the small coffee", "el tintico"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Take it to go",
        sentenceVocab.slice(6, 9),
        sentenceVocab.slice(0, 9),
        "Can I get it to go? I’ll pay in cash.",
        "¿Me lo regala pa’ llevar? Le pago en efectivo.",
        "Pa’ llevar is the spoken form of para llevar. Le pago... sounds polite in a shop.",
        breakdown([["Can I get it", "¿Me lo regala"], ["to go", "pa’ llevar"], ["I’ll pay in cash", "Le pago en efectivo"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Pay by card",
        sentenceVocab.slice(8, 10),
        sentenceVocab.slice(0, 10),
        "Excuse me, I’ll pay by card.",
        "Qué pena, le pago con tarjeta.",
        "Qué pena is a very Colombian softener before requests, corrections, or small apologies.",
        breakdown([["Excuse me / sorry", "Qué pena"], ["I’ll pay", "le pago"], ["by card", "con tarjeta"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Positive reaction",
        sentenceVocab.slice(10, 14),
        sentenceVocab.slice(0, 14),
        "Cool, for sure. Can I get a pandebono and a little juice?",
        "Bacano, de una. ¿Me regala un pandebono y un juguito?",
        "Bacano and de una make the sentence sound friendly and Colombian.",
        breakdown([["Cool", "Bacano"], ["for sure", "de una"], ["a pandebono", "un pandebono"], ["a little juice", "un juguito"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Ask if they have it",
        sentenceVocab.slice(14, 17),
        sentenceVocab.slice(0, 17),
        "Do you have a little juice? It’s a bit expensive, and I don’t have enough money.",
        "¿Tiene un juguito? Está carito y no me alcanza.",
        "Carito softens caro. No me alcanza is the natural way to say you do not have enough money.",
        breakdown([["Do you have", "¿Tiene"], ["a little juice", "un juguito"], ["It’s a bit expensive", "Está carito"], ["I don’t have enough money", "no me alcanza"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Service phrases",
        sentenceVocab.slice(17, 20),
        sentenceVocab.slice(0, 20),
        "At your service. Of course, my pleasure. A little coffee, please.",
        "A la orden. Claro, con gusto. Un tintico, porfa.",
        "A la orden and con gusto are warm service phrases you hear constantly in Colombia.",
        breakdown([["At your service", "A la orden"], ["Of course, my pleasure", "Claro, con gusto"], ["please", "porfa"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Complete bakery order",
        sentenceVocab.slice(20, 22),
        sentenceVocab,
        "Neighbor, what do you need? Can I get it to go? It’s eight thousand.",
        "Vecino, ¿qué necesita? ¿Me lo regala pa’ llevar? Son ocho mil.",
        "Vecino is often friendly shop language, even when the person is not literally your neighbour.",
        breakdown([["Neighbor / sir", "Vecino"], ["what do you need?", "¿qué necesita?"], ["Can I get it to go?", "¿Me lo regala pa’ llevar?"], ["It’s eight thousand", "Son ocho mil"]]),
      ),
      stage(
        "stage-9",
        "Stage 9: Rainy shop situation",
        [],
        sentenceVocab,
        "Bro, it’s pouring rain. Can I get a pandebono and a little coffee to go, please?",
        "Parce, se está cayendo un aguacero. ¿Me regala un pandebono y un tintico pa’ llevar, porfa?",
        "This combines the weather saying with a natural Colombian bakery order.",
        breakdown([["Bro", "Parce"], ["it’s pouring rain", "se está cayendo un aguacero"], ["Can I get", "¿Me regala"], ["to go, please", "pa’ llevar, porfa"]]),
      ),
      stage(
        "stage-10",
        "Stage 10: Full purchase",
        [],
        sentenceVocab,
        "Excuse me, can I get a little coffee and a pandebono to go? How much is it? I’ll pay by card.",
        "Qué pena, ¿me regala un tintico y un pandebono pa’ llevar? ¿Cuánto es? Le pago con tarjeta.",
        "This is a complete B1 Colombian shop interaction: softener, order, takeout, total, and payment.",
        breakdown([["Excuse me", "Qué pena"], ["Can I get", "¿me regala"], ["to go", "pa’ llevar"], ["What’s the total?", "¿Cuánto es?"], ["I’ll pay by card", "Le pago con tarjeta"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/colombian-spanish-b1-food-shops-prices/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-food-story-q1",
    type: "multiple-choice",
    prompt: "What does Vale want first?",
    options: ["Un tintico", "A taxi", "A phone charger", "A meeting room"],
    correctAnswer: "Un tintico",
    explanation: "Vale asks for un tintico, a small black coffee.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-food-story-q2",
    type: "typed",
    prompt: "Type the Colombian phrase meaning 'Can I get it to go?'",
    correctAnswer: "¿Me lo regala pa’ llevar?",
    correctAnswers: ["¿Me lo regala pa’ llevar?", "Me lo regala pa llevar", "¿Me lo regala pa llevar?"],
    explanation: "This is a natural Colombian ordering phrase for takeout.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "colombian-b1-food-story-q3",
    type: "multiple-choice",
    prompt: "Why does Vale change the order?",
    options: ["No me alcanza", "She hates coffee", "The shop is closed", "She already paid"],
    correctAnswer: "No me alcanza",
    explanation: "No me alcanza means she does not have enough money.",
    points: 1,
    skillTag: "money",
  },
  {
    id: "colombian-b1-food-story-q4",
    type: "multiple-choice",
    prompt: "How much is the final order?",
    options: ["Son ocho mil", "Son cien mil", "Es gratis", "Son dos dólares"],
    correctAnswer: "Son ocho mil",
    explanation: "The shopkeeper says Son ocho mil.",
    points: 1,
    skillTag: "price",
  },
];

export const colombianSpanishB1FoodShopsPricesWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b1-food-shops-prices",
  title: "Colombian B1 Story: Pa’ Llevar Before the Rain",
  subtitle: "A WhatsApp-style Colombian bakery story about coffee, pandebono, prices, payment, and a sudden aguacero.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "WhatsApp", "food", "shops", "prices"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-food-shops-prices-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "vale", name: "Vale", initials: "V", side: "right", color: "blue" },
      { id: "shopkeeper", name: "Doña Marta", initials: "M", side: "left", color: "green" },
      { id: "nico", name: "Nico", initials: "N", side: "left", color: "violet" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: this B1 Colombian chat practices ordering food, asking prices, and paying naturally.", "Guía: este chat B1 colombiano practica pedir comida, preguntar precios y pagar naturalmente.", [], "narrator"),
      message("m1", "vale", "¿Qué más, parce? Estoy al lado de la panadería.", "What’s up, bro? I’m next to the bakery.", ["¿Qué más, parce?", "parce"], "voice-note", "/audio/stories/colombian-spanish-b1-food-shops-prices/m1.mp3"),
      message("m2", "nico", "De una. ¿Me trae un tintico?", "For sure. Can you bring me a little coffee?", ["de una", "un tintico"]),
      message("m3", "shopkeeper", "A la orden, vecino. ¿Qué necesita?", "At your service, neighbour/sir. What do you need?", ["a la orden", "vecino", "¿Qué necesita?"], "voice-note", "/audio/stories/colombian-spanish-b1-food-shops-prices/m3.mp3"),
      message("m4", "vale", "Qué pena, ¿me regala un tintico y un pandebono?", "Excuse me, can I get a little coffee and a pandebono?", ["qué pena", "¿Me regala…?", "un tintico", "un pandebono"]),
      message("m5", "shopkeeper", "Claro, con gusto. ¿Lo quiere pa’ llevar?", "Of course, my pleasure. Do you want it to go?", ["Claro, con gusto", "con gusto", "pa’ llevar"]),
      message("m6", "vale", "Sí, ¿me lo regala pa’ llevar, porfa?", "Yes, can I get it to go, please?", ["¿Me lo regala pa’ llevar?", "pa’ llevar", "porfa"], "voice-note", "/audio/stories/colombian-spanish-b1-food-shops-prices/m6.mp3"),
      message("m7", "vale", "¿Cuánto vale el juguito?", "How much is the little juice?", ["¿Cuánto vale?", "un juguito"]),
      message("m8", "shopkeeper", "El juguito está bacano, pero está carito hoy.", "The little juice is nice, but it is a bit expensive today.", ["un juguito", "bacano", "Está carito"]),
      message("m9", "vale", "Uy, no me alcanza. Entonces solo el tintico y el pandebono.", "Oof, I don’t have enough money. Then just the coffee and the pandebono.", ["No me alcanza", "un tintico", "un pandebono"]),
      message("m10", "shopkeeper", "Listo. Son ocho mil.", "Okay. It’s eight thousand.", ["listo", "Son ocho mil"], "voice-note", "/audio/stories/colombian-spanish-b1-food-shops-prices/m10.mp3"),
      message("m11", "vale", "Listo, le pago en efectivo.", "Okay, I’ll pay in cash.", ["listo", "le pago en efectivo", "en efectivo"]),
      message("m12", "shopkeeper", "También puede ser con tarjeta, si quiere.", "It can also be by card, if you want.", ["con tarjeta"]),
      message("m13", "vale", "Gracias. Se está cayendo un aguacero, mejor salgo ya.", "Thanks. It’s pouring rain, I’d better leave now.", ["Se está cayendo un aguacero"]),
      message("m14", "nico", "Bacano, parcero. Tráigalo de una.", "Great, buddy. Bring it straight away.", ["bacano", "parcero", "de una"], "voice-note", "/audio/stories/colombian-spanish-b1-food-shops-prices/m14.mp3"),
      message("m15", "vale", "Claro. Si falta algo, le pago con tarjeta después.", "Of course. If anything is missing, I’ll pay by card later.", ["le pago con tarjeta", "con tarjeta"]),
      message("m16", "shopkeeper", "Con gusto. Vuelva cuando quiera.", "My pleasure. Come back whenever you want.", ["con gusto"]),
    ],
    comprehensionChecks: [
      { id: "colombian-b1-food-check-1", afterMessageId: "m4", question: storyQuestions[0] },
      { id: "colombian-b1-food-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "colombian-b1-food-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "colombian-b1-food-check-4", afterMessageId: "m10", question: storyQuestions[3] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: colombianFoodVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: colombianFoodVocab.map((item) => item.term),
      grammarPatterns: ["Polite ordering: ¿Me regala...?", "Payment: le pago en efectivo / le pago con tarjeta.", "Prices: ¿Cuánto vale? / ¿Cuánto es? / Son ocho mil.", "Softeners: qué pena, porfa, con gusto."],
      speakingPrompts: ["Order coffee and pandebono to go.", "Ask how much something costs.", "Say you will pay in cash or by card.", "React if something is too expensive."],
    },
    completionTask: {
      title: "Your Colombian bakery order",
      instructions: "Record a 60-second voice note ordering food to go in a Colombian bakery. Use at least 10 phrases from this story.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "¿Qué más? I walked into a small bakery in Bogotá because se está cayendo un aguacero outside. The shopkeeper smiled and said, A la orden, vecino. ¿Qué necesita? I answered, Qué pena, ¿me regala un tintico?",
    translation:
      "What’s up? I walked into a small bakery in Bogotá because it’s pouring rain outside. The shopkeeper smiled and said, At your service, neighbour/sir. What do you need? I answered, Excuse me, can I get a little coffee?",
    highlights: highlights(["¿Qué más?", "Se está cayendo un aguacero", "a la orden", "vecino", "¿Qué necesita?", "qué pena", "¿Me regala…?", "un tintico"]),
    shadowLine: "Qué pena, ¿me regala un tintico?",
  },
  {
    id: "p2",
    text:
      "Then I saw un pandebono and un juguito. I asked, ¿Tiene pandebono? ¿Cuánto vale? She said the juice was bacano, but está carito today. I checked my cash and thought, no me alcanza, so I chose only the coffee and the pandebono.",
    translation:
      "Then I saw a pandebono and a little juice. I asked, Do you have pandebono? How much is it? She said the juice was nice, but a bit expensive today. I checked my cash and thought, I don’t have enough money, so I chose only the coffee and the pandebono.",
    highlights: highlights(["un pandebono", "un juguito", "¿Tiene…?", "¿Cuánto vale?", "bacano", "Está carito", "No me alcanza"]),
    shadowLine: "Está carito y no me alcanza.",
  },
  {
    id: "p3",
    text:
      "I said, listo, ¿me lo regala pa’ llevar, porfa? She answered, claro, con gusto. When I asked ¿cuánto es?, she said, son ocho mil. I replied, listo, le pago en efectivo. She told me I could also pay con tarjeta.",
    translation:
      "I said, okay, can I get it to go, please? She answered, of course, my pleasure. When I asked what’s the total, she said, it’s eight thousand. I replied, okay, I’ll pay in cash. She told me I could also pay by card.",
    highlights: highlights(["listo", "¿Me lo regala pa’ llevar?", "pa’ llevar", "porfa", "Claro, con gusto", "con gusto", "¿Cuánto es?", "Son ocho mil", "le pago en efectivo", "en efectivo", "con tarjeta"]),
    shadowLine: "¿Me lo regala pa’ llevar, porfa?",
  },
  {
    id: "p4",
    text:
      "My friend texted, ¿Qué más, parce? I wrote back, de una, parcero, I’m coming. The order was simple, but it sounded very Colombian: qué pena, ¿me regala un tintico y un pandebono pa’ llevar? Son ocho mil. Le pago con tarjeta.",
    translation:
      "My friend texted, what’s up, bro? I wrote back, for sure, buddy, I’m coming. The order was simple, but it sounded very Colombian: excuse me, can I get a little coffee and a pandebono to go? It’s eight thousand. I’ll pay by card.",
    highlights: highlights(["¿Qué más, parce?", "parce", "de una", "parcero", "qué pena", "¿Me regala…?", "un tintico", "un pandebono", "pa’ llevar", "Son ocho mil", "le pago con tarjeta"]),
    shadowLine: "Le pago con tarjeta.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-food-reading-q1",
    type: "multiple-choice",
    prompt: "Why does the speaker enter the bakery?",
    options: ["Because it is pouring rain", "Because the bakery is closed", "Because they need a bus ticket", "Because they lost a card"],
    correctAnswer: "Because it is pouring rain",
    explanation: "The reading says: se está cayendo un aguacero outside.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-food-reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'I don’t have enough money'.",
    correctAnswer: "No me alcanza",
    correctAnswers: ["No me alcanza", "no me alcanza"],
    explanation: "No me alcanza literally means the money does not reach.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "colombian-b1-food-reading-q3",
    type: "multiple-choice",
    prompt: "Which phrase is a polite Colombian way to order?",
    options: ["¿Me regala…?", "Está carito", "Son ocho mil", "parce"],
    correctAnswer: "¿Me regala…?",
    explanation: "¿Me regala...? is used politely to order or request something.",
    points: 1,
    skillTag: "ordering",
  },
  {
    id: "colombian-b1-food-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the takeout phrase.",
    wordBank: ["¿Me", "lo", "regala", "pa’", "llevar?"],
    correctAnswer: "¿Me lo regala pa’ llevar?",
    explanation: "This means Can I get it to go?",
    points: 1,
    skillTag: "sentence-order",
  },
];

export const colombianSpanishB1FoodShopsPricesReading: ReadingComprehension = {
  id: "colombian-spanish-b1-reading-food-shops-prices",
  title: "Colombian B1 Reading: A Bakery Order in the Rain",
  subtitle: "A short first-person reading using Colombian food, shop, price, and payment phrases.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "reading", "food", "shops", "prices"],
  estimatedMinutes: 12,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-food-shops-prices",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-b1-reading-food-shops-prices/full.mp3",
    audioAlignmentUrl: "/audio/readings/colombian-spanish-b1-reading-food-shops-prices/timings.json",
    paragraphs: readingParagraphs,
    glossary: colombianFoodVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These phrases come directly from the Colombian B1 food, shops, and prices speaking lesson.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

export const colombianSpanishB1FoodShopsPricesQuiz: CheckpointQuiz = {
  id: "colombian-spanish-b1-food-shops-prices-quiz",
  title: "Colombian Spanish B1: Food, Shops & Prices Quiz",
  subtitle: "Check Colombian ordering, prices, payment, shop softeners, and everyday service phrases.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "quiz", "food", "shops", "prices"],
  estimatedMinutes: 15,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-food-shops-prices",
  activityType: "quiz",
  data: {
    description: "Practice Colombian B1 phrases for ordering food, asking prices, paying, and reacting naturally in shops.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-b1-food-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase means 'Can I get it to go?'",
        options: ["¿Me lo regala pa’ llevar?", "Está carito", "No me alcanza", "A la orden"],
        correctAnswer: "¿Me lo regala pa’ llevar?",
        explanation: "This is a natural Colombian takeout phrase.",
        points: 1,
        skillTag: "ordering",
      },
      {
        id: "colombian-b1-food-quiz-2",
        type: "fill-blank",
        prompt: "Complete: Le pago en ______.",
        correctAnswer: "efectivo",
        explanation: "Le pago en efectivo means I’ll pay in cash.",
        points: 1,
        skillTag: "payment",
      },
      {
        id: "colombian-b1-food-quiz-3",
        type: "typed",
        prompt: "Type the Colombian softener meaning excuse me / sorry.",
        correctAnswer: "qué pena",
        correctAnswers: ["qué pena", "Que pena", "qué pena"],
        explanation: "Qué pena is a very common Colombian softener.",
        points: 1,
        skillTag: "softener",
      },
      {
        id: "colombian-b1-food-quiz-4",
        type: "order-words",
        prompt: "Order the words.",
        wordBank: ["Son", "ocho", "mil"],
        correctAnswer: "Son ocho mil",
        explanation: "This is a common way to give a price.",
        points: 1,
        skillTag: "price",
      },
      pairQuestion("colombian-b1-food-pairs-1", "Match Colombian food/shop phrases set 1.", colombianFoodVocab.slice(0, 8)),
      pairQuestion("colombian-b1-food-pairs-2", "Match Colombian food/shop phrases set 2.", colombianFoodVocab.slice(8, 16)),
      pairQuestion("colombian-b1-food-pairs-3", "Match Colombian food/shop phrases set 3.", colombianFoodVocab.slice(16, 24)),
      pairQuestion("colombian-b1-food-pairs-4", "Match Colombian food/shop phrases set 4.", colombianFoodVocab.slice(24)),
    ],
  },
};
