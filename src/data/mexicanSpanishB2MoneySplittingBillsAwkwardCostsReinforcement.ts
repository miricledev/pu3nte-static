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

const courseId = "mexican-spanish-b2-money-splitting-bills-awkward-costs";
const skoolSectionName = "Mexican Spanish - B2 Money, Splitting Bills, and Awkward Costs";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const moneyVocab: VocabItem[] = [
  { id: "andar-corto-de-lana", term: "andar corto de lana", meaning: "to be short on cash", matchingMeaning: "to be short on cash", note: "Informal Mexican way to explain you do not have much money right now.", example: "Ando corto de lana esta semana.", translation: "I’m short on cash this week.", starred: true },
  { id: "lana", term: "lana", meaning: "money / cash", matchingMeaning: "money", note: "Very common informal Mexican word for money.", example: "No quiero gastar tanta lana.", translation: "I don’t want to spend that much money.", starred: true },
  { id: "no-ajusto-para", term: "no ajusto para…", meaning: "I don’t quite have enough for…", matchingMeaning: "I don’t quite have enough for…", note: "Useful when your money does not reach the full amount.", example: "No ajusto para el taxi.", translation: "I don’t quite have enough for the taxi.", starred: true },
  { id: "cada-quien-paga-lo-suyo", term: "cada quien paga lo suyo", meaning: "everyone pays for their own", matchingMeaning: "everyone pays for their own", note: "Clear, fair phrase for splitting individual costs.", example: "Mejor cada quien paga lo suyo.", translation: "Better if everyone pays for their own.", starred: true },
  { id: "lo-dividimos", term: "lo dividimos en partes iguales", meaning: "we split it equally", matchingMeaning: "we split it equally", note: "Use for splitting one total bill evenly.", example: "La cuenta la dividimos en partes iguales.", translation: "We split the bill equally.", starred: true },
  { id: "yo-pongo-la-mitad", term: "yo pongo la mitad", meaning: "I’ll put in / cover half", matchingMeaning: "I’ll cover half", note: "Simple phrase for offering half of the money.", example: "Yo pongo la mitad del depósito.", translation: "I’ll cover half of the deposit.", starred: true },
  { id: "hacer-una-vaquita", term: "hacer una vaquita", meaning: "to pool money together", matchingMeaning: "to pool money together", note: "Mexican phrase for everyone contributing money to one shared cost.", example: "Hacemos una vaquita para el regalo.", translation: "We’ll pool money for the gift.", starred: true },
  { id: "cooperamos-entre-todos", term: "cooperamos entre todos", meaning: "we all chip in", matchingMeaning: "we all chip in", note: "Friendly group phrase for sharing a cost.", example: "Cooperamos entre todos para la comida.", translation: "We all chip in for the food.", starred: true },
  { id: "traes-feria", term: "¿traes feria?", meaning: "do you have change / cash?", matchingMeaning: "do you have change?", note: "Informal Mexican question, especially for small cash or change.", example: "¿Traes feria para el parquímetro?", translation: "Do you have change for the parking meter?", starred: true },
  { id: "feria", term: "feria", meaning: "change / cash — informal Mexican usage", matchingMeaning: "change / cash", note: "In Mexico, feria can mean small cash or change.", example: "Solo traigo feria.", translation: "I only have change.", starred: true },
  { id: "te-transfiero", term: "te transfiero", meaning: "I’ll transfer you the money", matchingMeaning: "I’ll transfer you the money", note: "Common modern phrase for paying digitally.", example: "Paga tú y te transfiero.", translation: "You pay and I’ll transfer you the money.", starred: true },
  { id: "cuanto-te-debo", term: "¿cuánto te debo?", meaning: "how much do I owe you?", matchingMeaning: "how much do I owe you?", note: "Essential phrase after someone covers a cost.", example: "Gracias por pagar. ¿Cuánto te debo?", translation: "Thanks for paying. How much do I owe you?", starred: true },
  { id: "luego-te-pago", term: "luego te pago", meaning: "I’ll pay you later", matchingMeaning: "I’ll pay you later", note: "Useful but can sound vague; add timing if needed.", example: "Luego te pago cuando me depositen.", translation: "I’ll pay you later when they deposit my money.", starred: true },
  { id: "me-prestas-una-lana", term: "¿me prestas una lana?", meaning: "can you lend me some money?", matchingMeaning: "can you lend me some money?", note: "Very informal request; use with people you trust.", example: "¿Me prestas una lana para completar?", translation: "Can you lend me some money to cover the rest?", starred: true },
  { id: "te-lo-repongo", term: "te lo repongo", meaning: "I’ll pay you back / replace what you covered", matchingMeaning: "I’ll pay you back", note: "Reassures someone you will return what they covered.", example: "Cúbrelo hoy y mañana te lo repongo.", translation: "Cover it today and tomorrow I’ll pay you back.", starred: true },
  { id: "me-quede-corto", term: "me quedé corto", meaning: "I came up short", matchingMeaning: "I came up short", note: "Used when you did not bring or have enough money.", example: "Traía efectivo, pero me quedé corto.", translation: "I had cash, but I came up short.", starred: true },
  { id: "se-nos-fue-la-mano", term: "se nos fue la mano", meaning: "we overdid it / went overboard", matchingMeaning: "we went overboard", note: "Useful when a bill or plan became more expensive than expected.", example: "Con los postres se nos fue la mano.", translation: "We went overboard with the desserts.", starred: true },
  { id: "salio-en-una-lana", term: "salió en una lana", meaning: "it ended up costing a lot", matchingMeaning: "it ended up costing a lot", note: "Very Mexican way to say something was expensive.", example: "La cena salió en una lana.", translation: "Dinner ended up costing a lot.", starred: true },
  { id: "soltar-la-lana", term: "soltar la lana", meaning: "to fork over / hand over the money", matchingMeaning: "to fork over the money", note: "Informal and slightly playful phrase for paying.", example: "Tocó soltar la lana por el estacionamiento.", translation: "We had to fork over the money for parking.", starred: true },
  { id: "ponemos-para-la-propina", term: "ponemos para la propina", meaning: "we all put something toward the tip", matchingMeaning: "we put in for the tip", note: "Useful at restaurants when splitting the tip.", example: "Ponemos para la propina y ya.", translation: "We all put something toward the tip and that’s it.", starred: true },
  { id: "me-quede-sin-lana", term: "me quedé sin lana", meaning: "I ran out of money", matchingMeaning: "I ran out of money", note: "Informal phrase for having no money left.", example: "Después del súper me quedé sin lana.", translation: "After grocery shopping I ran out of money.", starred: true },
  { id: "ahi-me-lo-das-despues", term: "ahí me lo das después", meaning: "just give/pay it to me later", matchingMeaning: "pay it to me later", note: "Relaxed phrase when you trust the person to pay later.", example: "No te preocupes, ahí me lo das después.", translation: "Don’t worry, just pay it to me later.", starred: true },
  { id: "cada-quien-pone-lo-que-le-toca", term: "cada quien pone lo que le toca", meaning: "everyone contributes their fair share", matchingMeaning: "everyone contributes their fair share", note: "Fairness phrase for shared expenses.", example: "Cada quien pone lo que le toca y listo.", translation: "Everyone contributes their fair share and that’s it.", starred: true },
  { id: "cubreme-hoy", term: "cúbreme hoy", meaning: "cover me today", matchingMeaning: "cover me today", note: "Direct request when someone pays your part temporarily.", example: "Cúbreme hoy y mañana te pago.", translation: "Cover me today and I’ll pay you tomorrow.", starred: true },
  { id: "pongo-lo-que-pueda", term: "pongo lo que pueda", meaning: "I’ll put in what I can", matchingMeaning: "I’ll put in what I can", note: "Honest phrase when you cannot cover an equal share.", example: "Ahorita pongo lo que pueda.", translation: "Right now I’ll put in what I can.", starred: true },
  { id: "resto-te-lo-transfiero", term: "el resto te lo transfiero", meaning: "I’ll transfer you the rest", matchingMeaning: "I’ll transfer you the rest", note: "Useful when paying partly now and the rest digitally later.", example: "Te doy efectivo y el resto te lo transfiero.", translation: "I’ll give you cash and transfer you the rest.", starred: true },
];

const highlightMap = Object.fromEntries(moneyVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    acceptedAnswers: [item.matchingMeaning ?? item.meaning.split("/")[0].trim()],
    languageFrom: "spanish",
    languageTo: "english",
    difficulty: "medium",
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

const sentenceVocab = moneyVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB2MoneySplittingBillsAwkwardCostsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B2: Money, Splitting Bills, and Awkward Costs Flashcards",
  subtitle: "Mexican phrases for being short on cash, splitting fairly, borrowing money, transfers, and awkward restaurant bills.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "flashcards", "money", "splitting bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: moneyVocab.map(cardFromVocab) },
};

export const mexicanSpanishB2MoneySplittingBillsAwkwardCostsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Money and Awkward Costs",
  subtitle: "Build natural Mexican Spanish for splitting bills, asking to be covered, and paying people back.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "sentence-builder", "money", "bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note where a bill is higher than expected, you explain what you can pay now, and arrange the rest fairly.",
    stages: [
      stage("stage-1", "Short on cash", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "I’m short on cash and I don’t quite have enough for the taxi.", "Ando corto de lana y no ajusto para el taxi.", "This gives a clear, informal money problem.", breakdown([["I’m short on cash", "ando corto de lana"], ["money", "lana"], ["I don’t quite have enough for", "no ajusto para"]])),
      stage("stage-2", "Split fairly", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "Everyone pays for their own, or we split it equally and I cover half.", "Cada quien paga lo suyo, o lo dividimos en partes iguales y yo pongo la mitad.", "This compares individual payment with equal splitting.", breakdown([["everyone pays for their own", "cada quien paga lo suyo"], ["we split it equally", "lo dividimos en partes iguales"], ["I cover half", "yo pongo la mitad"]])),
      stage("stage-3", "Pool money", sentenceVocab.slice(6, 10), sentenceVocab.slice(0, 10), "We can pool money together; we all chip in. Do you have change?", "Podemos hacer una vaquita; cooperamos entre todos. ¿Traes feria?", "This is useful for group gifts, taxis, food, or shared costs.", breakdown([["pool money", "hacer una vaquita"], ["we all chip in", "cooperamos entre todos"], ["do you have change", "¿traes feria?"]])),
      stage("stage-4", "Pay back digitally", sentenceVocab.slice(10, 15), sentenceVocab.slice(0, 15), "How much do I owe you? I’ll transfer it, or I’ll pay you later if you lend me some money.", "¿Cuánto te debo? Te transfiero, o luego te pago si me prestas una lana.", "This covers modern payments and a trusted borrowing situation.", breakdown([["how much do I owe you", "¿cuánto te debo?"], ["I’ll transfer you", "te transfiero"], ["I’ll pay you later", "luego te pago"], ["lend me some money", "me prestas una lana"]])),
      stage("stage-5", "Admit the awkward part", sentenceVocab.slice(14, 19), sentenceVocab.slice(0, 19), "I’ll pay you back, but I came up short; we went overboard and it ended up costing a lot.", "Te lo repongo, pero me quedé corto; se nos fue la mano y salió en una lana.", "This practices embarrassment without making it too dramatic.", breakdown([["I’ll pay you back", "te lo repongo"], ["I came up short", "me quedé corto"], ["we went overboard", "se nos fue la mano"], ["it cost a lot", "salió en una lana"]])),
      stage("stage-6", "Handle tip and payment", sentenceVocab.slice(18, 22), sentenceVocab.slice(0, 22), "We have to fork over the money and put something toward the tip, but I ran out of money.", "Hay que soltar la lana y ponemos para la propina, pero me quedé sin lana.", "This uses common restaurant-payment language.", breakdown([["fork over the money", "soltar la lana"], ["put in for the tip", "ponemos para la propina"], ["I ran out of money", "me quedé sin lana"]])),
      stage("stage-7", "Trust and fairness", sentenceVocab.slice(21, 24), sentenceVocab.slice(0, 24), "Just pay it to me later; everyone contributes their fair share.", "Ahí me lo das después; cada quien pone lo que le toca.", "This sounds relaxed but still fair.", breakdown([["pay it to me later", "ahí me lo das después"], ["everyone contributes their fair share", "cada quien pone lo que le toca"]])),
      stage("stage-8", "Cover me today", sentenceVocab.slice(23), sentenceVocab, "Cover me today. I’ll put in what I can, and I’ll transfer you the rest.", "Cúbreme hoy. Pongo lo que pueda y el resto te lo transfiero.", "This gives a full solution when someone cannot pay everything right now.", breakdown([["cover me today", "cúbreme hoy"], ["I’ll put in what I can", "pongo lo que pueda"], ["I’ll transfer you the rest", "el resto te lo transfiero"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-money-story-q1", type: "multiple-choice", prompt: "After message 3, what does Mariana say about her money?", options: ["She is short on cash this week", "She already paid for everyone", "She lost her job", "She wants to buy a car"], correctAnswer: "She is short on cash this week", explanation: "Mariana says she is corto de lana.", points: 1, skillTag: "context" },
  { id: "mexican-b2-money-story-q2", type: "multiple-choice", prompt: "After message 6, how do they first plan to split the dinner?", options: ["Each person pays their own or they split equally", "Daniel pays everything", "They leave without paying", "They ask the waiter to choose"], correctAnswer: "Each person pays their own or they split equally", explanation: "They mention cada quien paga lo suyo and dividirlo en partes iguales.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-money-story-q3", type: "true-false", prompt: "After message 9, true or false: They discuss pooling money and checking for cash/change.", options: ["True", "False"], correctAnswer: "True", explanation: "They mention hacer una vaquita, cooperar entre todos, and feria.", points: 1, skillTag: "context" },
  { id: "mexican-b2-money-story-q4", type: "multiple-choice", prompt: "After message 12, what does Mariana ask Daniel?", options: ["How much she owes him", "Where the restaurant is", "Why he is late", "Whether he speaks English"], correctAnswer: "How much she owes him", explanation: "She asks ¿cuánto te debo?", points: 1, skillTag: "detail" },
  { id: "mexican-b2-money-story-q5", type: "multiple-choice", prompt: "After message 15, why is the situation awkward?", options: ["Mariana may need to borrow money and pay it back later", "Daniel refuses to speak", "The restaurant is closed", "Everyone has already gone home"], correctAnswer: "Mariana may need to borrow money and pay it back later", explanation: "She asks for a loan and says she will pay it back.", points: 1, skillTag: "inference" },
  { id: "mexican-b2-money-story-q6", type: "true-false", prompt: "After message 18, true or false: The bill ended up more expensive than expected.", options: ["True", "False"], correctAnswer: "True", explanation: "They say they went overboard and it salió en una lana.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-money-story-q7", type: "multiple-choice", prompt: "After message 21, what do they still need to include?", options: ["The tip", "A movie ticket", "A taxi to the airport", "A birthday cake"], correctAnswer: "The tip", explanation: "Daniel says they need to put something toward the tip.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-money-story-q8", type: "multiple-choice", prompt: "After message 24, how does Daniel reduce the pressure?", options: ["He says she can give it to him later", "He asks her to leave", "He gets angry", "He cancels the transfer"], correctAnswer: "He says she can give it to him later", explanation: "He says ahí me lo das después.", points: 1, skillTag: "tone" },
  { id: "mexican-b2-money-story-q9", type: "true-false", prompt: "After message 27, true or false: Mariana can pay part now and transfer the rest later.", options: ["True", "False"], correctAnswer: "True", explanation: "She says pongo lo que pueda and el resto te lo transfiero.", points: 1, skillTag: "sequence" },
  { id: "mexican-b2-money-story-q10", type: "multiple-choice", prompt: "After message 30, what agreement do they reach?", options: ["They split fairly and Daniel covers Mariana temporarily", "They stop being friends", "Mariana pays for everyone", "They refuse to leave a tip"], correctAnswer: "They split fairly and Daniel covers Mariana temporarily", explanation: "They agree on fair shares, a temporary cover, and a later transfer.", points: 1, skillTag: "gist" },
];

const storyMessages: StoryMessage[] = [
  message("m1", "mariana", "Daniel, antes de pedir otra ronda: ando corta de lana esta semana.", "Daniel, before ordering another round: I’m short on cash this week.", ["andar corto de lana"]),
  message("m2", "daniel", "Gracias por decirme. ¿Cuánta lana traes más o menos?", "Thanks for telling me. About how much money do you have?", ["lana"]),
  message("m3", "mariana", "No ajusto para cena grande y taxi, la neta.", "I don’t quite have enough for a big dinner and a taxi, honestly.", ["no ajusto para…"], "voice-note", `${storyAudioBase}/m3.mp3`),
  message("m4", "daniel", "Sin problema. Podemos decir que cada quien paga lo suyo.", "No problem. We can say everyone pays for their own.", ["cada quien paga lo suyo"]),
  message("m5", "mariana", "Sí, aunque si piden entradas al centro, lo dividimos en partes iguales.", "Yeah, although if they order appetizers for the table, we split it equally.", ["lo dividimos en partes iguales"]),
  message("m6", "daniel", "Va. Si se arma lo del pastel, yo pongo la mitad y ya.", "Okay. If the cake plan happens, I’ll cover half and that’s it.", ["yo pongo la mitad"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "mariana", "Para el regalo podemos hacer una vaquita, ¿no?", "For the gift we can pool money together, right?", ["hacer una vaquita"]),
  message("m8", "daniel", "Sí, cooperamos entre todos y no le carga a una sola persona.", "Yeah, we all chip in and it doesn’t fall on one person.", ["cooperamos entre todos"]),
  message("m9", "mariana", "¿Traes feria? La mesera dijo que la propina en efectivo sale más fácil.", "Do you have cash/change? The waitress said the tip is easier in cash.", ["¿traes feria?", "feria"]),
  message("m10", "daniel", "Traigo poquito. Si pago con tarjeta, tú me transfieres después.", "I have a little. If I pay by card, you can transfer me later.", ["te transfiero"]),
  message("m11", "mariana", "Va, pero dime bien: ¿cuánto te debo hasta ahorita?", "Okay, but tell me clearly: how much do I owe you so far?", ["¿cuánto te debo?"]),
  message("m12", "daniel", "Ahorita nada. Luego te pago yo lo del Uber y ajustamos al final.", "Right now nothing. I’ll pay the Uber later and we’ll adjust at the end.", ["luego te pago"], "voice-note", `${storyAudioBase}/m12.mp3`),
  message("m13", "mariana", "Oye, si se sube mucho, ¿me prestas una lana para completar?", "Hey, if it goes up too much, can you lend me some money to cover the rest?", ["¿me prestas una lana?"]),
  message("m14", "daniel", "Sí, pero tranqui. Me lo repones mañana y listo.", "Yeah, but relax. You pay me back tomorrow and that’s it.", ["te lo repongo"]),
  message("m15", "mariana", "Gracias. Me da pena, pero me quedé corta con lo del cumpleaños.", "Thanks. I feel embarrassed, but I came up short with the birthday stuff.", ["me quedé corto"]),
  message("m16", "daniel", "La verdad sí se nos fue la mano con tanta entrada.", "Honestly, we did go overboard with so many appetizers.", ["se nos fue la mano"]),
  message("m17", "mariana", "Sí, la cena salió en una lana y todavía falta la propina.", "Yeah, dinner ended up costing a lot and the tip is still missing.", ["salió en una lana"]),
  message("m18", "daniel", "Ni modo, toca soltar la lana, pero sin hacer drama.", "Oh well, we have to fork over the money, but without making drama.", ["soltar la lana"], "voice-note", `${storyAudioBase}/m18.mp3`),
  message("m19", "mariana", "Ponemos para la propina entre todos, ¿va?", "We all put something toward the tip, okay?", ["ponemos para la propina"]),
  message("m20", "daniel", "Sí. ¿Tú sí alcanzas o ya te quedaste sin lana?", "Yeah. Do you have enough or did you already run out of money?", ["me quedé sin lana"]),
  message("m21", "mariana", "Casi me quedé sin lana, por eso prefiero hablarlo claro.", "I almost ran out of money, that’s why I prefer to talk about it clearly.", ["me quedé sin lana"]),
  message("m22", "daniel", "No hay bronca. Ahí me lo das después, cuando te depositen.", "No problem. Just pay it to me later, when they deposit your money.", ["ahí me lo das después"]),
  message("m23", "mariana", "Gracias. Igual cada quien pone lo que le toca para que sea justo.", "Thanks. Still, everyone contributes their fair share so it’s fair.", ["cada quien pone lo que le toca"]),
  message("m24", "daniel", "Exacto. Yo no quiero que nadie pague de más por pena.", "Exactly. I don’t want anyone to overpay out of embarrassment.", [], "voice-note", `${storyAudioBase}/m24.mp3`),
  message("m25", "mariana", "Entonces, cúbreme hoy con lo que falta y mañana te lo repongo.", "Then cover me today for what’s missing and tomorrow I’ll pay you back.", ["cúbreme hoy", "te lo repongo"]),
  message("m26", "daniel", "Va, pero pon lo que puedas ahorita y ya no te estreses.", "Okay, but put in what you can right now and don’t stress anymore.", ["pongo lo que pueda"]),
  message("m27", "mariana", "Pongo lo que pueda en efectivo y el resto te lo transfiero.", "I’ll put in what I can in cash and transfer you the rest.", ["pongo lo que pueda", "el resto te lo transfiero"]),
  message("m28", "daniel", "Listo. Así queda claro y nadie se siente raro.", "Done. That way it’s clear and nobody feels weird.", []),
  message("m29", "mariana", "Gracias por no hacerlo incómodo. La lana entre amigos puede ser delicada.", "Thanks for not making it awkward. Money between friends can be delicate.", ["lana"]),
  message("m30", "daniel", "Por eso mejor hablarlo: cada quien pone lo que le toca y nos vamos tranquilos.", "That’s why it’s better to talk about it: everyone contributes their fair share and we leave calmly.", ["cada quien pone lo que le toca"], "voice-note", `${storyAudioBase}/m30.mp3`),
];

export const mexicanSpanishB2MoneySplittingBillsAwkwardCostsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B2 | The Birthday Bill",
  subtitle: "A realistic Mexican Spanish chat where two friends handle a birthday dinner bill without making it awkward.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "story", "money", "bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mariana", name: "Mariana", initials: "M", side: "left", color: "violet" },
      { id: "daniel", name: "Daniel", initials: "D", side: "right", color: "blue" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `${question.id}-check`, afterMessageId: `m${(index + 1) * 3}`, question })),
    learnedVocab: moneyVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: moneyVocab.slice(0, 12).map((item) => item.term),
      grammarPatterns: ["Shared costs with cada quien and entre todos", "Money limits with no ajusto and me quedé corto", "Payback language with te transfiero and te lo repongo"],
      speakingPrompts: ["Explain that you are short on cash.", "Suggest a fair way to split a bill.", "Ask a friend to cover you and promise to pay them back."],
    },
    completionTask: {
      title: "Send the bill-splitting voice note",
      instructions: "Record a Mexican Spanish voice note explaining what you can pay now, what you owe, and how you will transfer the rest.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En México, hablar de dinero entre amigos puede sentirse delicado. Por eso frases como «ando corto de lana» y «no ajusto para…» ayudan a decir la verdad sin hacer una escena. «Lana» es informal, pero muy común para hablar de dinero en confianza.", translation: "In Mexico, talking about money between friends can feel delicate. That is why phrases like ando corto de lana and no ajusto para help you tell the truth without making a scene. Lana is informal, but very common for talking about money with trust.", highlights: highlights(["andar corto de lana", "lana", "no ajusto para…"]), shadowLine: "Ando corto de lana y no ajusto para todo." },
  { id: "p2", text: "Para dividir una cuenta, puedes decir «cada quien paga lo suyo» si cada persona consumió diferente. Si todos compartieron lo mismo, «lo dividimos en partes iguales» suena más justo. Y si quieres ofrecerte, «yo pongo la mitad» es directo y claro.", translation: "To split a bill, you can say cada quien paga lo suyo if each person consumed something different. If everyone shared the same thing, lo dividimos en partes iguales sounds fairer. And if you want to offer, yo pongo la mitad is direct and clear.", highlights: highlights(["cada quien paga lo suyo", "lo dividimos en partes iguales", "yo pongo la mitad"]), shadowLine: "Cada quien paga lo suyo o lo dividimos igual." },
  { id: "p3", text: "Cuando hay un regalo, una propina o una compra común, «hacer una vaquita» es muy mexicano. También puedes decir «cooperamos entre todos» para que nadie cargue solo con el gasto. Si hace falta efectivo, preguntas «¿traes feria?» porque «feria» puede ser cambio o cash.", translation: "When there is a gift, tip, or shared purchase, hacer una vaquita is very Mexican. You can also say cooperamos entre todos so nobody carries the expense alone. If cash is needed, you ask traes feria because feria can mean change or cash.", highlights: highlights(["hacer una vaquita", "cooperamos entre todos", "¿traes feria?", "feria"]), shadowLine: "Hacemos una vaquita y cooperamos entre todos." },
  { id: "p4", text: "Hoy muchas cuentas se arreglan con transferencias. «Te transfiero» funciona cuando alguien paga primero. Después preguntas «¿cuánto te debo?» para cerrar claro. Si no puedes pagar al momento, «luego te pago» sirve, pero es mejor decir cuándo.", translation: "Today many bills are settled with transfers. Te transfiero works when someone pays first. Then you ask cuánto te debo to close clearly. If you cannot pay at the moment, luego te pago works, but it is better to say when.", highlights: highlights(["te transfiero", "¿cuánto te debo?", "luego te pago"]), shadowLine: "¿Cuánto te debo? Te transfiero ahorita." },
  { id: "p5", text: "Pedir dinero prestado requiere confianza. «¿Me prestas una lana?» es informal y directo. Para tranquilizar a la otra persona, dices «te lo repongo». Si calculaste mal, «me quedé corto» explica que no te alcanzó sin sonar como excusa larga.", translation: "Borrowing money requires trust. Me prestas una lana is informal and direct. To reassure the other person, you say te lo repongo. If you miscalculated, me quedé corto explains that you did not have enough without sounding like a long excuse.", highlights: highlights(["¿me prestas una lana?", "te lo repongo", "me quedé corto"]), shadowLine: "¿Me prestas una lana? Te lo repongo mañana." },
  { id: "p6", text: "Cuando una salida cuesta más de lo esperado, puedes decir «se nos fue la mano» o «salió en una lana». Si toca pagar, «soltar la lana» suena informal y un poco resignado. En un restaurante, «ponemos para la propina» evita olvidar ese gasto.", translation: "When an outing costs more than expected, you can say se nos fue la mano or salió en una lana. If you have to pay, soltar la lana sounds informal and a little resigned. In a restaurant, ponemos para la propina avoids forgetting that expense.", highlights: highlights(["se nos fue la mano", "salió en una lana", "soltar la lana", "ponemos para la propina"]), shadowLine: "Se nos fue la mano y salió en una lana." },
  { id: "p7", text: "Si alguien dice «me quedé sin lana», no siempre está pidiendo que le regalen algo. A veces solo necesita tiempo. «Ahí me lo das después» baja la presión, pero «cada quien pone lo que le toca» mantiene la idea de justicia.", translation: "If someone says me quedé sin lana, they are not always asking for something free. Sometimes they only need time. Ahí me lo das después lowers the pressure, but cada quien pone lo que le toca keeps the idea of fairness.", highlights: highlights(["me quedé sin lana", "ahí me lo das después", "cada quien pone lo que le toca"]), shadowLine: "Ahí me lo das después; cada quien pone lo que le toca." },
  { id: "p8", text: "Para cerrar sin incomodidad, puedes decir «cúbreme hoy» si necesitas ayuda momentánea. Luego agrega «pongo lo que pueda» y «el resto te lo transfiero». Así la conversación no se vuelve rara: hay honestidad, plan y respeto.", translation: "To close without awkwardness, you can say cúbreme hoy if you need temporary help. Then add pongo lo que pueda and el resto te lo transfiero. That way the conversation does not become weird: there is honesty, a plan, and respect.", highlights: highlights(["cúbreme hoy", "pongo lo que pueda", "el resto te lo transfiero"]), shadowLine: "Cúbreme hoy y el resto te lo transfiero." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-money-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Talking about money and splitting costs in Mexican Spanish", "Inviting someone to a party", "Fixing a work problem", "Describing public transport"], correctAnswer: "Talking about money and splitting costs in Mexican Spanish", explanation: "The reading covers bills, cash, transfers, borrowing, and fair shares.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-money-reading-q2", type: "multiple-choice", prompt: "Which phrase means everyone pays for their own?", options: ["Cada quien paga lo suyo", "Salió en una lana", "Te lo repongo", "¿Traes feria?"], correctAnswer: "Cada quien paga lo suyo", explanation: "Cada quien paga lo suyo means each person pays their own part.", points: 1, skillTag: "vocab" },
  { id: "mexican-b2-money-reading-q3", type: "true-false", prompt: "True or false: Hacer una vaquita means pooling money together.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says hacer una vaquita is used for shared purchases like gifts or tips.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-money-reading-q4", type: "multiple-choice", prompt: "Why is te lo repongo useful?", options: ["It reassures someone you will pay them back", "It says you refuse to pay", "It means the bill is free", "It asks for change"], correctAnswer: "It reassures someone you will pay them back", explanation: "Te lo repongo tells the person you will return what they covered.", points: 1, skillTag: "tone" },
  { id: "mexican-b2-money-reading-q5", type: "multiple-choice", prompt: "Which phrase is best when you can pay part now and the rest later?", options: ["Pongo lo que pueda y el resto te lo transfiero", "Cada quien paga lo suyo", "Se nos fue la mano", "¿Traes feria?"], correctAnswer: "Pongo lo que pueda y el resto te lo transfiero", explanation: "This phrase gives a clear partial-payment plan.", points: 1, skillTag: "context" },
];

export const mexicanSpanishB2MoneySplittingBillsAwkwardCostsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B2 Reading: Talking About the Bill",
  subtitle: "A synced Spanish reading about Mexican money phrases, splitting bills, transfers, and awkward costs.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "reading", "shadowing", "money"],
  estimatedMinutes: 14,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: moneyVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-money-quiz-q1", type: "multiple-choice", prompt: "You want to say you're short on cash. Which phrase fits?", options: ["Ando corto de lana", "Te transfiero", "Ponemos para la propina", "Salió en una lana"], correctAnswer: "Ando corto de lana", explanation: "Ando corto de lana means I’m short on cash.", points: 1, skillTag: "vocab" },
  { id: "mexican-b2-money-quiz-q2", type: "fill-blank", prompt: "Complete: No ___ para el taxi.", correctAnswer: "ajusto", explanation: "No ajusto para… means I don’t quite have enough for…", points: 1, skillTag: "phrase" },
  { id: "mexican-b2-money-quiz-q3", type: "multiple-choice", prompt: "The table shared everything equally. Which phrase is best?", options: ["Lo dividimos en partes iguales", "Cada quien paga lo suyo", "Me quedé sin lana", "¿Traes feria?"], correctAnswer: "Lo dividimos en partes iguales", explanation: "This means we split it equally.", points: 1, skillTag: "context" },
  { id: "mexican-b2-money-quiz-q4", type: "true-false", prompt: "True or false: Feria can mean change or cash in informal Mexican Spanish.", options: ["True", "False"], correctAnswer: "True", explanation: "Feria is commonly used for cash or change.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-money-quiz-q5", type: "order-words", prompt: "Order the words: we all chip in.", wordBank: ["cooperamos", "entre", "todos"], correctAnswer: "cooperamos entre todos", explanation: "Cooperamos entre todos means everyone contributes.", points: 1, skillTag: "syntax" },
  { id: "mexican-b2-money-quiz-q6", type: "multiple-choice", prompt: "Someone paid first and you want to ask the amount. What do you say?", options: ["¿Cuánto te debo?", "¿Traes feria?", "Me quedé corto", "Soltar la lana"], correctAnswer: "¿Cuánto te debo?", explanation: "This means how much do I owe you?", points: 1, skillTag: "context" },
  { id: "mexican-b2-money-quiz-q7", type: "fill-blank", prompt: "Complete: Mañana te lo ___.", correctAnswer: "repongo", explanation: "Te lo repongo means I’ll pay you back or replace what you covered.", points: 1, skillTag: "phrase" },
  { id: "mexican-b2-money-quiz-q8", type: "true-false", prompt: "True or false: Salió en una lana means it ended up costing a lot.", options: ["True", "False"], correctAnswer: "True", explanation: "The phrase means something was expensive.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-money-quiz-q9", type: "order-words", prompt: "Order the words: cover me today.", wordBank: ["cúbreme", "hoy"], correctAnswer: "cúbreme hoy", explanation: "Cúbreme hoy asks someone to cover your cost today.", points: 1, skillTag: "syntax" },
  { id: "mexican-b2-money-quiz-q10", type: "multiple-choice", prompt: "Which phrase means everyone contributes their fair share?", options: ["Cada quien pone lo que le toca", "Me quedé corto", "Luego te pago", "Soltar la lana"], correctAnswer: "Cada quien pone lo que le toca", explanation: "This phrase emphasizes fairness in shared costs.", points: 1, skillTag: "vocab" },
  { id: "mexican-b2-money-quiz-q11", type: "match-pairs", prompt: "Match the cash phrases.", pairs: [{ left: "lana", right: "money / cash" }, { left: "feria", right: "change / cash" }, { left: "andar corto de lana", right: "to be short on cash" }, { left: "me quedé sin lana", right: "I ran out of money" }], explanation: "These phrases describe cash and money limits.", points: 4, skillTag: "matching" },
  { id: "mexican-b2-money-quiz-q12", type: "match-pairs", prompt: "Match the splitting phrases.", pairs: [{ left: "cada quien paga lo suyo", right: "everyone pays for their own" }, { left: "lo dividimos en partes iguales", right: "we split it equally" }, { left: "hacer una vaquita", right: "to pool money together" }, { left: "ponemos para la propina", right: "we put in toward the tip" }], explanation: "These expressions cover fair bill splitting.", points: 4, skillTag: "splitting" },
  { id: "mexican-b2-money-quiz-q13", type: "match-pairs", prompt: "Match the payback phrases.", pairs: [{ left: "te transfiero", right: "I’ll transfer you" }, { left: "luego te pago", right: "I’ll pay you later" }, { left: "te lo repongo", right: "I’ll pay you back" }, { left: "el resto te lo transfiero", right: "I’ll transfer you the rest" }], explanation: "These phrases help arrange repayment clearly.", points: 4, skillTag: "payback" },
];

export const mexicanSpanishB2MoneySplittingBillsAwkwardCostsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican B2 Quiz: Money, Splitting Bills, and Awkward Costs",
  subtitle: "Test Mexican Spanish phrases for cash, fair shares, borrowing, transfers, and awkward bill moments.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "quiz", "money", "bills"],
  estimatedMinutes: 12,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B2 money and bill-splitting phrases in realistic social situations.",
    passScore: 80,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
