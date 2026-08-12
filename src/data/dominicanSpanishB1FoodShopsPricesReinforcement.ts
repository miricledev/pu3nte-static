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

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡", "’"];
const courseId = "dominican-spanish-b1-food-shops-prices";
const skoolSectionName = "Dominican Spanish - B1 Food Shops and Prices";

const foodVocab: VocabItem[] = [
  { id: "buenas", term: "Buenas", meaning: "Hi / good day", note: "Casual greeting when entering a shop.", example: "Buenas, ¿qué tú tienes fresco?", translation: "Hi, what do you have fresh?", starred: true },
  { id: "que-tienes-fresco", term: "¿Qué tú tienes fresco?", meaning: "What do you have fresh?", note: "Natural shop question in Dominican Spanish.", example: "Buenas, ¿qué tú tienes fresco hoy?", translation: "Hi, what do you have fresh today?", starred: true },
  { id: "a-como-esta", term: "¿A cómo está?", meaning: "How much is it? / What’s the price?", note: "Dominican-style price question.", example: "¿A cómo está la lechosa?", translation: "How much is the papaya?", starred: true },
  { id: "a-como-esta-eso", term: "¿A cómo está eso?", meaning: "How much is that?", note: "Use when pointing to an item.", example: "¿A cómo está eso, jefe?", translation: "How much is that, boss?", starred: true },
  { id: "dame-un-chin", term: "Dame un chin de…", meaning: "Give me a little bit of...", note: "Useful for asking for a small amount.", example: "Dame un chin de chinola.", translation: "Give me a little bit of passion fruit.", starred: true },
  { id: "un-chin", term: "un chin", meaning: "a little bit / a small amount", note: "Very common Dominican phrase.", example: "Solo quiero un chin.", translation: "I only want a little bit.", starred: true },
  { id: "colmado", term: "colmado", meaning: "Dominican neighborhood corner shop / convenience store", note: "Everyday local shopping place.", example: "Voy al colmado ahora.", translation: "I’m going to the corner shop now.", starred: true },
  { id: "funda", term: "funda", meaning: "bag / plastic shopping bag", note: "Common Dominican word for bag.", example: "Dame una funda, por favor.", translation: "Give me a bag, please.", starred: true },
  { id: "cuarto", term: "cuarto", meaning: "money / cash", note: "Colloquial Dominican money word.", example: "No ando con mucho cuarto.", translation: "I don’t have much money on me.", starred: true },
  { id: "andar-con-cuarto", term: "andar con cuarto", meaning: "to have money on you", note: "Literally to walk around with money.", example: "Hoy sí ando con cuarto.", translation: "Today I do have money on me.", starred: true },
  { id: "no-ando-con-mucho-cuarto", term: "no ando con mucho cuarto", meaning: "I don’t have much money on me", note: "Useful before negotiating or buying less.", example: "No ando con mucho cuarto, dame un chin.", translation: "I don’t have much money on me, give me a little bit.", starred: true },
  { id: "napa", term: "ñapa", meaning: "a little extra given free with a purchase / bonus portion", note: "Cultural shopping word.", example: "¿Y la ñapa?", translation: "And the little extra?", starred: true },
  { id: "echame-napa", term: "échame la ñapa", meaning: "Give me a little extra / throw in the extra bit", note: "Friendly request after buying.", example: "Échame la ñapa, que soy cliente.", translation: "Throw in a little extra, I’m a customer.", starred: true },
  { id: "chinola", term: "chinola", meaning: "passion fruit", note: "Dominican food word.", example: "La chinola está fresca.", translation: "The passion fruit is fresh.", starred: true },
  { id: "lechosa", term: "lechosa", meaning: "papaya", note: "Dominican word for papaya.", example: "Dame una lechosa madura.", translation: "Give me a ripe papaya.", starred: true },
  { id: "guineo", term: "guineo", meaning: "banana", note: "Dominican word for banana.", example: "Dame dos guineos.", translation: "Give me two bananas.", starred: true },
  { id: "viveres", term: "víveres", meaning: "root vegetables and starchy staples", note: "Includes yuca, plantain, yautía, and similar staples.", example: "¿Tienes víveres frescos?", translation: "Do you have fresh root vegetables/staples?", starred: true },
  { id: "echame", term: "Échame…", meaning: "Give me / put me some / serve me some", note: "Very common food-ordering verb.", example: "Échame una funda de víveres.", translation: "Give me a bag of root vegetables.", starred: true },
  { id: "echame-funda", term: "Échame una funda de…", meaning: "Give me a bag of...", note: "Use with produce or shop items.", example: "Échame una funda de guineos.", translation: "Give me a bag of bananas.", starred: true },
  { id: "pica-pollo", term: "pica pollo", meaning: "Dominican-style fried chicken", note: "Very common Dominican fast food.", example: "Dame un pica pollo.", translation: "Give me an order of fried chicken.", starred: true },
  { id: "chimi", term: "un chimi", meaning: "a chimi / Dominican street-style burger", note: "Dominican street burger.", example: "Quiero un chimi con to’.", translation: "I want a chimi with everything.", starred: true },
  { id: "con-to", term: "con to’", meaning: "with everything / with all the toppings", note: "Spoken reduction of con todo.", example: "Échame un chimi con to’.", translation: "Give me a chimi with everything.", starred: true },
  { id: "sin-mucha-salsa", term: "sin mucha salsa", meaning: "without too much sauce", note: "Useful topping preference.", example: "Con to’, pero sin mucha salsa.", translation: "With everything, but without too much sauce.", starred: true },
  { id: "dame-pica-pollo", term: "Dame un pica pollo", meaning: "Give me an order of pica pollo", note: "Simple street-food order.", example: "Dame un pica pollo y una chinola.", translation: "Give me fried chicken and a passion fruit juice.", starred: true },
  { id: "echame-chimi", term: "Échame un chimi con to’", meaning: "Give me a chimi with everything", note: "Natural street-food request.", example: "Échame un chimi con to’, sin mucha salsa.", translation: "Give me a chimi with everything, without too much sauce.", starred: true },
  { id: "dame-dos", term: "Dame dos de esos", meaning: "Give me two of those", note: "Useful when pointing at items.", example: "Dame dos de esos guineos.", translation: "Give me two of those bananas.", starred: true },
  { id: "me-lo-llevo", term: "Me lo llevo", meaning: "I’ll take it", note: "Use for one item.", example: "Está bien, me lo llevo.", translation: "Okay, I’ll take it.", starred: true },
  { id: "me-los-llevo", term: "Me los llevo", meaning: "I’ll take them", note: "Use for multiple items.", example: "Dame dos; me los llevo.", translation: "Give me two; I’ll take them.", starred: true },
  { id: "dejame-en", term: "Déjamelo en…", meaning: "Let me have it for... / give it to me for [price]", note: "Negotiating phrase.", example: "Déjamelo en quinientos.", translation: "Let me have it for five hundred.", starred: true },
  { id: "no-me-lo-deja", term: "¿No me lo deja en…?", meaning: "Could you do it for...? / Could you give it to me for [price]?", note: "Polite negotiation question.", example: "¿No me lo deja en quinientos?", translation: "Could you do it for five hundred?", starred: true },
  { id: "caro", term: "Está un poco caro", meaning: "It’s a little expensive", note: "Soft negotiation phrase.", example: "Está un poco caro para mí.", translation: "It’s a little expensive for me.", starred: true },
  { id: "quinientos", term: "Déjamelo en quinientos", meaning: "Let me have it for five hundred", note: "Concrete bargaining phrase.", example: "Jefe, déjamelo en quinientos.", translation: "Boss, let me have it for five hundred.", starred: true },
  { id: "dale", term: "Dale", meaning: "Alright / okay / deal", note: "Common agreement or acceptance.", example: "Dale, me lo llevo.", translation: "Okay, I’ll take it.", starred: true },
  { id: "echamelo-funda", term: "Échamelo en una funda", meaning: "Put it in a bag for me", note: "Final practical shop request.", example: "Dale, échamelo en una funda.", translation: "Okay, put it in a bag for me.", starred: true },
];

const highlightMap = Object.fromEntries(foodVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: item.starred ? "medium" : "easy",
    notes: item.note,
    specialCharacters,
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
): SentenceStage {
  return {
    id,
    title,
    newVocab,
    fullVocab,
    prompt,
    targetAnswer,
    acceptedAnswers: [targetAnswer],
    explanation,
    wordBreakdown,
    audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3`,
  };
}

export const dominicanSpanishB1FoodShopsPricesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B1: Food, Shops & Prices Flashcards",
  subtitle: "Dominican Spanish for colmados, fresh fruit, víveres, street food, bargaining, bags, and asking for ñapa.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "flashcards", "food", "shops", "prices"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: foodVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "Buenas = hi / good day",
  "¿Qué tú tienes fresco? = what do you have fresh?",
  "¿A cómo está? = how much is it?",
  "Dame un chin de = give me a little bit of",
  "chinola = passion fruit",
  "lechosa = papaya",
  "guineo = banana",
  "víveres = root vegetables / staples",
  "no ando con mucho cuarto = I don’t have much money on me",
  "Échame una funda de = give me a bag of",
  "pica pollo = Dominican fried chicken",
  "un chimi = Dominican street burger",
  "con to’ = with everything",
  "sin mucha salsa = without too much sauce",
  "Dame dos de esos = give me two of those",
  "Me los llevo = I’ll take them",
  "Está un poco caro = it’s a little expensive",
  "Déjamelo en quinientos = let me have it for five hundred",
  "Dale = okay / deal",
  "Échamelo en una funda = put it in a bag for me",
];

export const dominicanSpanishB1FoodShopsPricesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Dominican Food, Shops & Prices",
  subtitle: "Build practical Dominican shopping sentences for asking prices, ordering street food, bargaining, and asking for a bag.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "sentence-builder", "food", "shopping"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short shop order: greet, ask what is fresh, ask a price, buy fruit or street food, negotiate once, and ask for a bag.",
    stages: [
      stage("stage-1", "Stage 1: Enter the shop", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Hi. What do you have fresh? How much is it?", "Buenas. ¿Qué tú tienes fresco? ¿A cómo está?", "A simple B1 shop opening: greet, ask what is fresh, and ask price.", breakdown([["Hi", "Buenas"], ["What do you have fresh?", "¿Qué tú tienes fresco?"], ["How much is it?", "¿A cómo está?"]])),
      stage("stage-2", "Stage 2: Ask for fruit", sentenceVocab.slice(3, 7), sentenceVocab.slice(0, 7), "Give me a little bit of passion fruit, papaya, and banana.", "Dame un chin de chinola, lechosa y guineo.", "Use “un chin” to ask for a small amount.", breakdown([["Give me a little bit of", "Dame un chin de"], ["passion fruit", "chinola"], ["papaya", "lechosa"], ["banana", "guineo"]])),
      stage("stage-3", "Stage 3: Buy staples", sentenceVocab.slice(7, 10), sentenceVocab.slice(0, 10), "I don’t have much money on me. Give me a bag of root vegetables.", "No ando con mucho cuarto. Échame una funda de víveres.", "This combines money limits with a practical shop request.", breakdown([["I don’t have much money on me", "No ando con mucho cuarto"], ["Give me a bag of", "Échame una funda de"], ["root vegetables / staples", "víveres"]])),
      stage("stage-4", "Stage 4: Order fried chicken", sentenceVocab.slice(10, 11), sentenceVocab.slice(0, 11), "Give me an order of Dominican fried chicken.", "Dame un pica pollo.", "A direct street-food order.", breakdown([["Give me", "Dame"], ["Dominican fried chicken", "un pica pollo"]])),
      stage("stage-5", "Stage 5: Order a chimi", sentenceVocab.slice(11, 14), sentenceVocab.slice(0, 14), "Give me a chimi with everything, without too much sauce.", "Échame un chimi con to’, sin mucha salsa.", "This adds topping preferences naturally.", breakdown([["Give me a chimi", "Échame un chimi"], ["with everything", "con to’"], ["without too much sauce", "sin mucha salsa"]])),
      stage("stage-6", "Stage 6: Take more than one", sentenceVocab.slice(14, 16), sentenceVocab.slice(0, 16), "Give me two of those. I’ll take them.", "Dame dos de esos. Me los llevo.", "Use “me los llevo” for plural items.", breakdown([["Give me two of those", "Dame dos de esos"], ["I’ll take them", "Me los llevo"]])),
      stage("stage-7", "Stage 7: Bargain softly", sentenceVocab.slice(16, 19), sentenceVocab.slice(0, 19), "It’s a little expensive. Let me have it for five hundred. Deal?", "Está un poco caro. Déjamelo en quinientos. ¿Dale?", "A soft Dominican bargaining move, not aggressive.", breakdown([["It’s a little expensive", "Está un poco caro"], ["Let me have it for five hundred", "Déjamelo en quinientos"], ["Deal?", "¿Dale?"]])),
      stage("stage-8", "Stage 8: Finish the purchase", sentenceVocab.slice(18, 20), sentenceVocab.slice(0, 20), "Okay. Put it in a bag for me.", "Dale. Échamelo en una funda.", "Close the transaction with agreement and a bag request.", breakdown([["Okay", "Dale"], ["Put it in a bag for me", "Échamelo en una funda"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyMessages: StoryMessage[] = [
  message("m1", "sofia", "Buenas, don Ramón. ¿Qué tú tienes fresco hoy?", "Hi, Don Ramón. What do you have fresh today?", ["Buenas", "¿Qué tú tienes fresco?"], "voice-note", `${storyAudioBase}/m1.mp3`),
  message("m2", "ramon", "Llegó chinola buena, lechosa dulce y guineo maduro.", "Good passion fruit arrived, sweet papaya, and ripe bananas.", ["chinola", "lechosa", "guineo"]),
  message("m3", "sofia", "¿A cómo está la lechosa?", "How much is the papaya?", ["¿A cómo está?", "lechosa"]),
  message("m4", "ramon", "La grande está a doscientos cincuenta.", "The big one is two hundred fifty.", []),
  message("m5", "sofia", "Está un poco caro. No ando con mucho cuarto.", "It’s a little expensive. I don’t have much money on me.", ["Está un poco caro", "no ando con mucho cuarto", "cuarto"]),
  message("m6", "ramon", "Entonces dame tu presupuesto y le buscamos la vuelta.", "Then give me your budget and we’ll figure it out.", [], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "sofia", "Dame un chin de chinola y una lechosa pequeña.", "Give me a little bit of passion fruit and a small papaya.", ["Dame un chin de…", "un chin", "chinola", "lechosa"]),
  message("m8", "ramon", "Dale. ¿Quieres víveres también? Están frescos.", "Okay. Do you want root vegetables too? They’re fresh.", ["Dale", "víveres"]),
  message("m9", "sofia", "Sí, échame una funda de víveres, pero pequeña.", "Yes, give me a bag of root vegetables, but a small one.", ["Échame una funda de…", "funda", "víveres"]),
  message("m10", "ramon", "Te pongo yuca y plátano. Eso llena.", "I’ll put yuca and plantain. That fills you up.", []),
  message("m11", "sofia", "¿A cómo está eso junto?", "How much is that together?", ["¿A cómo está eso?"], "voice-note", `${storyAudioBase}/m11.mp3`),
  message("m12", "ramon", "Todo junto serían seiscientos.", "All together would be six hundred.", []),
  message("m13", "sofia", "¿No me lo deja en quinientos?", "Could you do it for five hundred?", ["¿No me lo deja en…?", "Déjamelo en quinientos"]),
  message("m14", "ramon", "Mira, quinientos cincuenta y te echo la ñapa.", "Look, five hundred fifty and I’ll throw in the extra bit.", ["ñapa", "échame la ñapa"]),
  message("m15", "sofia", "Dale, pero échame la ñapa buena, que mañana vuelvo.", "Deal, but give me a good extra bit, I’m coming back tomorrow.", ["Dale", "échame la ñapa"]),
  message("m16", "ramon", "Jajaja, tú sabes negociar. Te echo dos guineos más.", "Haha, you know how to negotiate. I’ll add two more bananas.", ["guineo"], "voice-note", `${storyAudioBase}/m16.mp3`),
  message("m17", "sofia", "Perfecto. Me los llevo.", "Perfect. I’ll take them.", ["Me los llevo"]),
  message("m18", "ramon", "¿Algo más del colmado?", "Anything else from the corner shop?", ["colmado"]),
  message("m19", "sofia", "Mi hermano quiere pica pollo, pero no sé si me alcanza.", "My brother wants fried chicken, but I don’t know if I have enough.", ["pica pollo"]),
  message("m20", "ramon", "El pica pollo está al lado. Pregunta primero.", "The fried chicken spot is next door. Ask first.", ["pica pollo"]),
  message("m21", "sofia", "Voy rápido. Si está barato, me lo llevo.", "I’ll go quickly. If it’s cheap, I’ll take it.", ["Me lo llevo"], "voice-note", `${storyAudioBase}/m21.mp3`),
  message("m22", "ramon", "Y si compras chimi, pídelo sin mucha salsa. Ahí se emocionan.", "And if you buy a chimi, ask for it without too much sauce. They get excited there.", ["un chimi", "sin mucha salsa"]),
  message("m23", "sofia", "Jajaja, sí. Ayer me dieron un chimi con to’ y casi nadaba.", "Haha, yes. Yesterday they gave me a chimi with everything and it was almost swimming.", ["un chimi", "con to’"]),
  message("m24", "ramon", "Eso es normal. Tú di: échame un chimi con to’, sin mucha salsa.", "That’s normal. You say: give me a chimi with everything, without too much sauce.", ["Échame un chimi con to’", "con to’", "sin mucha salsa"]),
  message("m25", "sofia", "Buenas. Dame un pica pollo y dame dos de esos jugos.", "Hi. Give me fried chicken and give me two of those juices.", ["Buenas", "Dame un pica pollo", "Dame dos de esos"]),
  message("m26", "ramon", "¿Ves? Ya volviste con cena completa.", "See? You came back with a full dinner already.", [], "voice-note", `${storyAudioBase}/m26.mp3`),
  message("m27", "sofia", "Sí, pero échamelo en una funda, que tengo mucha cosa.", "Yes, but put it in a bag for me, I have a lot of stuff.", ["Échamelo en una funda", "funda"]),
  message("m28", "ramon", "Aquí tienes. Chinola, lechosa, víveres, ñapa y cena.", "Here you go. Passion fruit, papaya, root vegetables, extra bit, and dinner.", ["chinola", "lechosa", "víveres", "ñapa"]),
  message("m29", "sofia", "Así sí. Entré sin mucho cuarto y salí resuelta.", "Now that’s good. I came in without much money and left sorted.", ["cuarto"]),
  message("m30", "ramon", "Dale, vecina. Vuelve mañana por guineo fresco.", "Alright, neighbor. Come back tomorrow for fresh bananas.", ["Dale", "guineo"]),
];

const storyChecks: NonNullable<WhatsAppStory["data"]["comprehensionChecks"]> = [
  { id: "check-1", afterMessageId: "m3", question: { id: "story-q1", type: "multiple-choice", prompt: "What fresh fruit does Don Ramón mention first?", options: ["Chinola, lechosa, and guineo", "Mango, orange, and apple", "Rice, beans, and chicken", "Only papaya"], correctAnswer: "Chinola, lechosa, and guineo", explanation: "He says chinola, lechosa, and guineo arrived fresh.", points: 1, skillTag: "detail" } },
  { id: "check-2", afterMessageId: "m6", question: { id: "story-q2", type: "multiple-choice", prompt: "Why does Sofía not want the big papaya at first?", options: ["It is a little expensive and she does not have much cash", "It is not ripe", "She hates papaya", "The shop is closed"], correctAnswer: "It is a little expensive and she does not have much cash", explanation: "She says it is a little expensive and she does not have much money on her.", points: 1, skillTag: "inference" } },
  { id: "check-3", afterMessageId: "m9", question: { id: "story-q3", type: "multiple-choice", prompt: "What does Sofía ask for in message 9?", options: ["A small bag of víveres", "A large chimi", "Two fried chickens", "A plastic chair"], correctAnswer: "A small bag of víveres", explanation: "She says “échame una funda de víveres, pero pequeña.”", points: 1, skillTag: "detail" } },
  { id: "check-4", afterMessageId: "m12", question: { id: "story-q4", type: "multiple-choice", prompt: "What price does Don Ramón first give for everything together?", options: ["Six hundred", "Five hundred", "Two hundred", "One thousand"], correctAnswer: "Six hundred", explanation: "He says everything together would be seiscientos.", points: 1, skillTag: "price" } },
  { id: "check-5", afterMessageId: "m15", question: { id: "story-q5", type: "multiple-choice", prompt: "What deal does Don Ramón offer?", options: ["Five hundred fifty with ñapa", "Five hundred with no bag", "Free chicken", "Two chimis for one"], correctAnswer: "Five hundred fifty with ñapa", explanation: "He says quinientos cincuenta and he will add ñapa.", points: 1, skillTag: "negotiation" } },
  { id: "check-6", afterMessageId: "m18", question: { id: "story-q6", type: "true-false", prompt: "Sofía decides to take the fruit and víveres.", correctAnswer: "true", explanation: "She says “Me los llevo.”", points: 1, skillTag: "gist" } },
  { id: "check-7", afterMessageId: "m21", question: { id: "story-q7", type: "multiple-choice", prompt: "What does Sofía’s brother want?", options: ["Pica pollo", "A bag of bananas", "Papaya juice", "A colmado"], correctAnswer: "Pica pollo", explanation: "Sofía says her brother wants pica pollo.", points: 1, skillTag: "detail" } },
  { id: "check-8", afterMessageId: "m24", question: { id: "story-q8", type: "multiple-choice", prompt: "What warning does Don Ramón give about chimi?", options: ["Ask for it without too much sauce", "Never buy it with meat", "Only eat it in the morning", "It costs five hundred"], correctAnswer: "Ask for it without too much sauce", explanation: "He tells her to ask for it “sin mucha salsa.”", points: 1, skillTag: "food-ordering" } },
  { id: "check-9", afterMessageId: "m27", question: { id: "story-q9", type: "multiple-choice", prompt: "Why does Sofía ask for a bag?", options: ["She has a lot of things", "She wants to return everything", "She lost her money", "The bag is the ñapa"], correctAnswer: "She has a lot of things", explanation: "She says “tengo mucha cosa.”", points: 1, skillTag: "detail" } },
  { id: "check-10", afterMessageId: "m30", question: { id: "story-q10", type: "multiple-choice", prompt: "What does Don Ramón invite Sofía to buy tomorrow?", options: ["Fresh guineo", "A new bag", "Pica pollo", "A bigger lechosa"], correctAnswer: "Fresh guineo", explanation: "He says to come back tomorrow for fresh guineo.", points: 1, skillTag: "detail" } },
];

export const dominicanSpanishB1FoodShopsPricesWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican Spanish B1: The Ñapa Negotiation",
  subtitle: "A friendly colmado chat where Sofía buys fruit, víveres, pica pollo, and negotiates a little extra.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "story", "food", "shopping"],
  estimatedMinutes: 24,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sofia", name: "Sofía", initials: "S", side: "left", color: "violet" },
      { id: "ramon", name: "Don Ramón", initials: "R", side: "right", color: "cyan" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyChecks,
    learnedVocab: foodVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["Buenas.", "¿A cómo está?", "Dame un chin de...", "¿No me lo deja en...?", "Échamelo en una funda."],
      grammarPatterns: ["Shop requests with dame/échame", "Singular vs plural me lo llevo / me los llevo", "Soft bargaining with déjamelo en..."],
      speakingPrompts: ["Order fruit at a colmado.", "Ask for a small bag of víveres.", "Negotiate a price and ask for ñapa."],
    },
    completionTask: {
      title: "Make a colmado order",
      instructions: "Record 30-45 seconds buying fruit, asking a price, negotiating once, and asking for a bag.",
    },
  },
};

export const dominicanSpanishB1FoodShopsPricesReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Shopping at a Dominican Colmado",
  subtitle: "A synced reading about greeting, asking prices, buying fruit and víveres, ordering street food, and asking for ñapa.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "reading", "food", "shops"],
  estimatedMinutes: 17,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: [
      { id: "p1", text: "When you enter a Dominican colmado, a simple “Buenas” sounds natural. Then you can ask “¿Qué tú tienes fresco?” if you want fruit or produce. A “colmado” is a neighborhood corner shop, and it is part store, part local meeting point.", highlights: highlights(["Buenas", "¿Qué tú tienes fresco?", "colmado"]), shadowLine: "Buenas, ¿qué tú tienes fresco?" },
      { id: "p2", text: "To ask price, use “¿A cómo está?” or “¿A cómo está eso?” These phrases are practical and direct. If the price feels high, “Está un poco caro” lets you negotiate softly without sounding rude.", highlights: highlights(["¿A cómo está?", "¿A cómo está eso?", "Está un poco caro"]), shadowLine: "¿A cómo está eso? Está un poco caro." },
      { id: "p3", text: "Dominican fruit names matter. “Chinola” is passion fruit, “lechosa” is papaya, and “guineo” is banana. If you only want a small amount, say “Dame un chin de...” because “un chin” means a little bit.", highlights: highlights(["chinola", "lechosa", "guineo", "Dame un chin de…", "un chin"]), shadowLine: "Dame un chin de chinola y guineo." },
      { id: "p4", text: "For staples, you might hear “víveres”. This means root vegetables and starchy foods like yuca, plantain, or yautía. You can say “Échame una funda de víveres” if you want a bag of those foods.", highlights: highlights(["víveres", "Échame una funda de…", "funda"]), shadowLine: "Échame una funda de víveres." },
      { id: "p5", text: "Street food has its own rhythm. “Dame un pica pollo” orders Dominican fried chicken. “Échame un chimi con to’” orders a Dominican street burger with everything. If you want less sauce, add “sin mucha salsa”.", highlights: highlights(["Dame un pica pollo", "pica pollo", "Échame un chimi con to’", "un chimi", "con to’", "sin mucha salsa"]), shadowLine: "Échame un chimi con to’, sin mucha salsa." },
      { id: "p6", text: "Money language is also local. “Cuarto” means money or cash, and “no ando con mucho cuarto” means you do not have much money on you. To negotiate, say “¿No me lo deja en...?” or “Déjamelo en quinientos”.", highlights: highlights(["cuarto", "no ando con mucho cuarto", "¿No me lo deja en…?", "Déjamelo en quinientos"]), shadowLine: "No ando con mucho cuarto. ¿No me lo deja en quinientos?" },
      { id: "p7", text: "To finish, “Me lo llevo” means I’ll take it, while “Me los llevo” means I’ll take them. “Dale” confirms the deal. Then you can ask “Échamelo en una funda” so the seller puts it in a bag.", highlights: highlights(["Me lo llevo", "Me los llevo", "Dale", "Échamelo en una funda"]), shadowLine: "Dale, me lo llevo. Échamelo en una funda." },
    ],
    glossary: highlights(foodVocab.map((item) => item.term)),
    questions: [
      { id: "reading-q1", type: "multiple-choice", prompt: "What is a colmado?", options: ["A Dominican neighborhood corner shop", "A type of fried chicken", "A plastic bag", "A fruit"], correctAnswer: "A Dominican neighborhood corner shop", explanation: "The reading defines a colmado as a neighborhood corner shop.", points: 1, skillTag: "vocab" },
      { id: "reading-q2", type: "multiple-choice", prompt: "Which phrase asks for the price?", options: ["¿A cómo está?", "Me los llevo", "Buenas", "Échame la ñapa"], correctAnswer: "¿A cómo está?", explanation: "Use “¿A cómo está?” to ask how much something costs.", points: 1, skillTag: "price" },
      { id: "reading-q3", type: "true-false", prompt: "“Chinola” means passion fruit.", correctAnswer: "true", explanation: "The reading lists chinola as passion fruit.", points: 1, skillTag: "food-vocab" },
      { id: "reading-q4", type: "multiple-choice", prompt: "What does “ñapa” mean?", options: ["A little extra given free", "A high price", "A street burger", "A banana"], correctAnswer: "A little extra given free", explanation: "Ñapa is a little bonus portion or extra.", points: 1, skillTag: "culture" },
      { id: "reading-q5", type: "fill-blank", prompt: "Complete: “Échamelo en una ____.”", options: ["funda", "chinola", "ñapa", "salsa"], correctAnswer: "funda", explanation: "“Échamelo en una funda” means put it in a bag for me.", points: 1, skillTag: "shop-request" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "quiz-q1", type: "multiple-choice", prompt: "You enter a Dominican shop. What do you say first?", options: ["Buenas", "Me los llevo", "Está caro", "Con to’"], correctAnswer: "Buenas", explanation: "“Buenas” is a casual shop greeting.", points: 1, skillTag: "context" },
  { id: "quiz-q2", type: "multiple-choice", prompt: "You want to ask what fruit is fresh. Choose the phrase.", options: ["¿Qué tú tienes fresco?", "Échamelo en una funda", "No ando con mucho cuarto", "Me lo llevo"], correctAnswer: "¿Qué tú tienes fresco?", explanation: "This asks what the shop has fresh.", points: 1, skillTag: "shop-question" },
  { id: "quiz-q3", type: "multiple-choice", prompt: "You want a small amount of passion fruit. Choose the phrase.", options: ["Dame un chin de chinola", "Dame dos de esos", "Me los llevo", "Échame la ñapa"], correctAnswer: "Dame un chin de chinola", explanation: "“Un chin” means a little bit, and “chinola” is passion fruit.", points: 1, skillTag: "food-ordering" },
  { id: "quiz-q4", type: "multiple-choice", prompt: "You want a chimi with all toppings but not too much sauce. Choose the phrase.", options: ["Échame un chimi con to’, sin mucha salsa", "Dame una lechosa sin funda", "¿A cómo está la ñapa?", "Me los llevo con cuarto"], correctAnswer: "Échame un chimi con to’, sin mucha salsa", explanation: "This orders a chimi with everything and limits the sauce.", points: 1, skillTag: "street-food" },
  { id: "quiz-q5", type: "fill-blank", prompt: "Complete: “¿A cómo ____?”", options: ["está", "llevo", "funda", "cuarto"], correctAnswer: "está", explanation: "“¿A cómo está?” asks the price.", points: 1, skillTag: "price" },
  { id: "quiz-q6", type: "fill-blank", prompt: "Complete: “No ando con mucho ____.”", options: ["cuarto", "guineo", "chimi", "to’"], correctAnswer: "cuarto", explanation: "“Cuarto” means money/cash.", points: 1, skillTag: "money" },
  { id: "quiz-q7", type: "fill-blank", prompt: "Complete: “Échame una ____ de víveres.”", options: ["funda", "salsa", "ñapa", "lechosa"], correctAnswer: "funda", explanation: "A “funda” is a bag.", points: 1, skillTag: "shop-request" },
  { id: "quiz-q8", type: "fill-blank", prompt: "Complete: “Échame la ____.”", options: ["ñapa", "fresco", "cuarto", "chimi"], correctAnswer: "ñapa", explanation: "“Échame la ñapa” asks for the little extra.", points: 1, skillTag: "culture" },
  { id: "quiz-q9", type: "true-false", prompt: "“Lechosa” means papaya in Dominican Spanish.", correctAnswer: "true", explanation: "Lechosa is papaya.", points: 1, skillTag: "food-vocab" },
  { id: "quiz-q10", type: "true-false", prompt: "“Me lo llevo” is used for multiple items.", correctAnswer: "false", explanation: "For multiple items use “me los llevo.”", points: 1, skillTag: "grammar" },
  { id: "quiz-q11", type: "true-false", prompt: "“Pica pollo” is Dominican-style fried chicken.", correctAnswer: "true", explanation: "Pica pollo means Dominican fried chicken.", points: 1, skillTag: "food-vocab" },
  { id: "quiz-q12", type: "true-false", prompt: "“Con to’” means without toppings.", correctAnswer: "false", explanation: "It means with everything / all toppings.", points: 1, skillTag: "street-food" },
  { id: "quiz-q13", type: "match-pairs", prompt: "Match the food word to English.", pairs: [{ left: "chinola", right: "passion fruit" }, { left: "lechosa", right: "papaya" }, { left: "guineo", right: "banana" }, { left: "víveres", right: "root vegetables / staples" }], explanation: "These are core Dominican food words.", points: 4, skillTag: "food-match" },
  { id: "quiz-q14", type: "match-pairs", prompt: "Match the shop phrase to its function.", pairs: [{ left: "¿A cómo está?", right: "ask price" }, { left: "Me lo llevo", right: "I’ll take it" }, { left: "Dale", right: "deal / okay" }, { left: "Échamelo en una funda", right: "put it in a bag" }], explanation: "These phrases move a shop interaction forward.", points: 4, skillTag: "function-match" },
  { id: "quiz-q15", type: "order-words", prompt: "Put the words in order: “What do you have fresh?”", wordBank: ["¿Qué", "tú", "tienes", "fresco?"], correctAnswer: "¿Qué tú tienes fresco?", explanation: "This is the shop question from the lesson.", points: 1, skillTag: "word-order" },
  { id: "quiz-q16", type: "order-words", prompt: "Put the words in order: “Give me two of those.”", wordBank: ["Dame", "dos", "de", "esos"], correctAnswer: "Dame dos de esos", explanation: "Use it when pointing to items.", points: 1, skillTag: "word-order" },
  { id: "quiz-q17", type: "order-words", prompt: "Put the words in order: “Let me have it for five hundred.”", wordBank: ["Déjamelo", "en", "quinientos"], correctAnswer: "Déjamelo en quinientos", explanation: "This is a bargaining phrase.", points: 1, skillTag: "word-order" },
  { id: "quiz-q18", type: "order-words", prompt: "Put the words in order: “Put it in a bag for me.”", wordBank: ["Échamelo", "en", "una", "funda"], correctAnswer: "Échamelo en una funda", explanation: "Use this at the end of the purchase.", points: 1, skillTag: "word-order" },
  { id: "quiz-q19", type: "multiple-choice", prompt: "You think the price is high but want to say it softly. Choose the phrase.", options: ["Está un poco caro", "Me los llevo", "Buenas", "Con to’"], correctAnswer: "Está un poco caro", explanation: "This says it is a little expensive.", points: 1, skillTag: "negotiation" },
  { id: "quiz-q20", type: "multiple-choice", prompt: "You want to ask if the seller can do it for a lower price. Choose the phrase.", options: ["¿No me lo deja en quinientos?", "¿Qué tú tienes fresco?", "Échame una funda de víveres", "Dame dos de esos"], correctAnswer: "¿No me lo deja en quinientos?", explanation: "This politely asks if the seller can give it to you for that price.", points: 1, skillTag: "negotiation" },
];

export const dominicanSpanishB1FoodShopsPricesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Quiz: Dominican B1 Food, Shops & Prices",
  subtitle: "Choose the right Dominican phrase for colmado shopping, fruit, street food, prices, bargaining, and bags.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "quiz", "food", "shops", "prices"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Test practical Dominican shopping language for food, prices, quantities, bargaining, and street-food orders.",
    passScore: 14,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
