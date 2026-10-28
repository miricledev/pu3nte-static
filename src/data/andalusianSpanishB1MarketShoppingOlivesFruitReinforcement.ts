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

type VocabItem = { id: string; term: string; meaning: string; note: string; example: string; translation: string };

const courseId = "andalusian-spanish-b1-market-shopping-olives-fruit";
const sectionName = "Andalusian Spanish - B1 Market Shopping for Olives and Fruit";

const marketVocab: VocabItem[] = [
  { id: "aceitunas-teneis", term: "Buenas, ¿qué aceitunas tenéis?", meaning: "Hi, what kind of olives have you got?", note: "Tenéis is the informal plural vosotros form used naturally in Spain.", example: "Buenas, ¿qué aceitunas tenéis hoy?", translation: "Hi, what kind of olives have you got today?" },
  { id: "tenéis-alinadas", term: "¿Las tenéis aliñadas?", meaning: "Have you got them seasoned?", note: "Las replaces aceitunas and avoids repeating the noun.", example: "¿Las tenéis aliñadas con ajo y hierbas?", translation: "Have you got them seasoned with garlic and herbs?" },
  { id: "cuarto-kilo", term: "Ponme un cuarto de kilo", meaning: "Give me a quarter of a kilo, please", note: "Ponme is a direct but normal market request in Spain.", example: "Ponme un cuarto de kilo de aceitunas.", translation: "Give me a quarter kilo of olives." },
  { id: "cuanto-kilo", term: "¿A cuánto está el kilo?", meaning: "How much is it per kilo?", note: "A cuánto está is a standard way to ask the unit price.", example: "¿A cuánto está el kilo de naranjas?", translation: "How much are the oranges per kilo?" },
  { id: "probar-una", term: "¿Me dejas probar una?", meaning: "Can I try one?", note: "Dejar plus infinitive asks permission casually.", example: "¿Me dejas probar una antes de pedir?", translation: "Can I try one before ordering?" },
  { id: "aloreñas", term: "¿Tenéis aloreñas?", meaning: "Have you got Aloreña olives?", note: "Aloreñas are a protected local olive variety associated with Málaga's Guadalhorce Valley.", example: "¿Tenéis aloreñas de la zona?", translation: "Have you got local Aloreña olives?" },
  { id: "pican-mucho", term: "¿Pican mucho?", meaning: "Are they very spicy?", note: "Picar describes spicy heat or a sharp seasoned taste.", example: "Estas aceitunas, ¿pican mucho?", translation: "Are these olives very spicy?" },
  { id: "sin-hueso", term: "Mejor sin hueso", meaning: "Preferably without the stones", note: "Mejor plus a short preference sounds efficient and natural.", example: "Para los niños, mejor sin hueso.", translation: "For the children, preferably pitted." },
  { id: "poquito-mas", term: "Échame un poquito más", meaning: "Give me just a little bit more", note: "Echar is common when asking a vendor to add more product.", example: "Échame un poquito más, que somos cuatro.", translation: "Give me a little more because there are four of us." },
  { id: "fruta-temporada", term: "¿Qué fruta está de temporada?", meaning: "What fruit is in season?", note: "De temporada identifies produce at its natural seasonal moment.", example: "¿Qué fruta está de temporada ahora?", translation: "What fruit is in season now?" },
  { id: "buena-pinta", term: "Esas naranjas tienen buena pinta", meaning: "Those oranges look really good", note: "Tener buena pinta says something looks appetising or promising.", example: "Esas naranjas tienen buena pinta y huelen muy bien.", translation: "Those oranges look good and smell lovely." },
  { id: "estan-dulces", term: "¿Están dulces?", meaning: "Are they sweet?", note: "A short produce question whose subject is understood from context.", example: "Las naranjas, ¿están dulces?", translation: "Are the oranges sweet?" },
  { id: "medio-kilo", term: "Me llevo medio kilo", meaning: "I'll take half a kilo", note: "Me llevo confirms the amount the customer chooses to buy.", example: "Si están dulces, me llevo medio kilo.", translation: "If they're sweet, I'll take half a kilo." },
  { id: "para-hoy", term: "Las quiero para hoy", meaning: "I want them for today", note: "Useful when the ripeness needed depends on when the fruit will be eaten.", example: "Las quiero para hoy, no para la semana que viene.", translation: "I want them for today, not next week." },
  { id: "mas-maduras", term: "¿Tienes otras más maduras?", meaning: "Have you got any riper ones?", note: "Otras replaces the fruit already being discussed.", example: "Estas están duras; ¿tienes otras más maduras?", translation: "These are hard; have you got riper ones?" },
  { id: "en-su-punto", term: "¿Me escoges unas que estén en su punto?", meaning: "Can you pick me some that are just ripe?", note: "En su punto means at the ideal stage of ripeness.", example: "¿Me escoges unas que estén en su punto para esta tarde?", translation: "Can you choose some that will be perfectly ripe this afternoon?" },
  { id: "salen-melocotones", term: "¿A cuánto salen los melocotones?", meaning: "How much are the peaches?", note: "A cuánto salen asks what a particular product works out at.", example: "¿A cuánto salen los melocotones por kilo?", translation: "How much do the peaches cost per kilo?" },
  { id: "va-precio", term: "Se me va un poco de precio", meaning: "That's a little out of my price range", note: "A polite, indirect way to say the price is too high for you.", example: "La caja entera se me va un poco de precio.", translation: "The whole box is a little beyond my budget." },
  { id: "ponme-menos", term: "Pues ponme menos", meaning: "Well, give me a bit less then", note: "Pues links the adjustment naturally to the price just mentioned.", example: "Si sale tan caro, pues ponme menos.", translation: "If it costs that much, give me less then." },
  { id: "de-la-zona", term: "¿Son de aquí, de la zona?", meaning: "Are they local, from around here?", note: "A friendly question about where produce comes from.", example: "Estas naranjas, ¿son de aquí, de la zona?", translation: "Are these oranges local?" },
  { id: "misma-bolsa", term: "¿Me lo pones todo en la misma bolsa?", meaning: "Can you put everything in the same bag?", note: "Lo refers to the whole order as one group.", example: "Si cabe, ¿me lo pones todo en la misma bolsa?", translation: "If it fits, can you put it all in the same bag?" },
  { id: "cuanto-todo", term: "¿Cuánto es todo?", meaning: "How much is everything altogether?", note: "A concise final question before paying.", example: "Perfecto, ¿cuánto es todo?", translation: "Perfect, how much is everything?" },
  { id: "que-te-pongo", term: "Buenas, ¿qué te pongo?", meaning: "Hi there, what can I get you?", note: "A very common vendor's opening at a market counter.", example: "Buenas, ¿qué te pongo hoy?", translation: "Hi, what can I get you today?" },
  { id: "cuarto-alinadas", term: "Un cuarto de aceitunas aliñadas, porfa", meaning: "A quarter kilo of seasoned olives, please", note: "A compact complete order using porfa informally.", example: "Un cuarto de aceitunas aliñadas, porfa, y que no piquen.", translation: "A quarter kilo of seasoned olives, please, not spicy." },
  { id: "si-tienes", term: "Y, si tienes...", meaning: "And, if you've got any...", note: "A natural bridge when adding another item to an order.", example: "Y, si tienes, ponme también unas aloreñas.", translation: "And if you have any, give me some Aloreña olives too." },
  { id: "no-piquen", term: "Que no piquen mucho", meaning: "Ones that aren't too spicy", note: "Que plus subjunctive describes the kind of product wanted.", example: "Escógeme unas que no piquen mucho.", translation: "Choose some that aren't too spicy." },
  { id: "me-pones-cuarto", term: "¿Me pones un cuarto de kilo...?", meaning: "Can you give me a quarter kilo of...?", note: "A friendly request that can be completed with any market product.", example: "¿Me pones un cuarto de kilo de aloreñas?", translation: "Can you give me a quarter kilo of Aloreña olives?" },
  { id: "si-para-hoy", term: "Si las quieres para hoy...", meaning: "If you want them for today...", note: "A vendor uses this to recommend the right ripeness.", example: "Si las quieres para hoy, estas están perfectas.", translation: "If you want them for today, these are perfect." },
  { id: "escojo-maduras", term: "Te escojo unas maduras", meaning: "I'll pick out some ripe ones for you", note: "The vendor offers to select suitable fruit personally.", example: "Te escojo unas maduras y otras para mañana.", translation: "I'll pick some ripe ones and some for tomorrow." },
  { id: "muy-buena-pinta", term: "Tienen muy buena pinta", meaning: "They look really good", note: "Muy strengthens the positive impression.", example: "Esos melocotones tienen muy buena pinta.", translation: "Those peaches look really good." },
  { id: "van-precio", term: "Se me van un poco de precio", meaning: "They're a little too expensive for me", note: "Plural agreement is used when the subject is several items.", example: "Los melocotones se me van un poco de precio.", translation: "The peaches are a little too expensive for me." },
  { id: "escogeme-hoy", term: "Escógeme unos que estén para hoy", meaning: "Pick me some that'll be ready to eat today", note: "The imperative and relative clause make a precise but natural request.", example: "Escógeme unos que estén para hoy y no muy blandos.", translation: "Pick me some for today that aren't too soft." },
  { id: "estupendo", term: "Estupendo", meaning: "Brilliant / Great", note: "A common positive response in Spain.", example: "Estupendo, entonces me llevo medio kilo.", translation: "Great, then I'll take half a kilo." },
  { id: "bien-alinadas", term: "Bien aliñadas", meaning: "Nicely seasoned", note: "Bien can intensify an adjective or participle in food descriptions.", example: "Están bien aliñadas, con ajo y tomillo.", translation: "They're nicely seasoned with garlic and thyme." },
  { id: "bien-dulces", term: "Bien dulces", meaning: "Really sweet", note: "A concise vendor description of ripe fruit.", example: "Estas naranjas están bien dulces.", translation: "These oranges are really sweet." },
  { id: "aqui-zona", term: "De aquí, de la zona", meaning: "Local, from around here", note: "Repetition emphasizes the local origin.", example: "Son de aquí, de la zona del Guadalhorce.", translation: "They're local, from the Guadalhorce area." },
  { id: "aceitunas-alorenas", term: "Aceitunas aloreñas", meaning: "Aloreña olives", note: "A traditional Málaga olive with protected designation of origin.", example: "Las aceitunas aloreñas son típicas del Valle del Guadalhorce.", translation: "Aloreña olives are typical of the Guadalhorce Valley." },
  { id: "aceitunas-alinadas", term: "Aceitunas aliñadas", meaning: "Seasoned or marinated olives", note: "They may be dressed with garlic, herbs, citrus, or spices.", example: "Las aceitunas aliñadas llevan ajo y hierbas.", translation: "The seasoned olives contain garlic and herbs." },
  { id: "sin-hueso-vocab", term: "Sin hueso", meaning: "Pitted / Without the stone", note: "Useful for olives and stone fruit.", example: "Prefiero las aceitunas sin hueso.", translation: "I prefer pitted olives." },
  { id: "cuarto-vocab", term: "Un cuarto de kilo", meaning: "250 grams", note: "A very common market quantity.", example: "Un cuarto de kilo son doscientos cincuenta gramos.", translation: "A quarter kilo is 250 grams." },
  { id: "medio-vocab", term: "Medio kilo", meaning: "500 grams", note: "Another standard market quantity.", example: "Medio kilo de naranjas, por favor.", translation: "Half a kilo of oranges, please." },
  { id: "de-temporada", term: "De temporada", meaning: "Seasonal / In season", note: "Often suggests better flavour, availability, or value.", example: "La fruta de temporada suele tener más sabor.", translation: "Seasonal fruit often has more flavour." },
  { id: "estar-punto", term: "Estar en su punto", meaning: "To be just right / Ideally ripe", note: "The ideal state for eating or serving something.", example: "Estos melocotones están en su punto.", translation: "These peaches are perfectly ripe." },
  { id: "maduras", term: "Maduras", meaning: "Ripe", note: "Feminine plural here because it commonly describes frutas or naranjas.", example: "Quiero dos piezas maduras.", translation: "I want two ripe pieces of fruit." },
  { id: "melocotones", term: "Melocotones", meaning: "Peaches", note: "A common seasonal market fruit.", example: "Los melocotones huelen muy bien.", translation: "The peaches smell lovely." },
  { id: "naranjas", term: "Naranjas", meaning: "Oranges", note: "A major fruit crop in southern Spain.", example: "Estas naranjas son de la zona.", translation: "These oranges are local." },
  { id: "misma-bolsa-vocab", term: "La misma bolsa", meaning: "The same bag", note: "Used when consolidating several purchases.", example: "Ponlo todo en la misma bolsa.", translation: "Put it all in the same bag." },
  { id: "porfa", term: "Porfa", meaning: "Please (informal)", note: "A shortened informal form of por favor.", example: "Ponme medio kilo, porfa.", translation: "Give me half a kilo, please." },
];

const highlightMap = Object.fromEntries(marketVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "medium", notes: item.note, starred: true };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return { id, speakerId, text, translation, vocabHighlights: highlights(phrases), messageType, audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers: [], explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

const sentenceVocab = marketVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1MarketShoppingOlivesFruitFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Market Shopping for Olives and Fruit Flashcards", subtitle: "Shop naturally for Málaga olives and seasonal fruit using quantities, prices, tasting requests, ripeness, local origin, and checkout language.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "market", "olives", "fruit"], estimatedMinutes: 24,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: marketVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1MarketShoppingOlivesFruitSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: En el Mercado de Málaga", subtitle: "Build a complete market exchange from choosing Aloreña olives to checking ripe fruit, adjusting the amount, and paying.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "market"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Greet a market vendor, ask about seasoned Aloreña olives, taste one, choose a quantity, ask about seasonal fruit and ripeness, check the price and local origin, adjust the order, request one bag, and ask the total.",
    stages: [
      stage("stage-1", "Ask about the olives", sentenceVocab.slice(0, 2), sentenceVocab.slice(22, 24), "Hi, what olives have you got? Have you got them seasoned?", "Buenas, ¿qué aceitunas tenéis? ¿Las tenéis aliñadas?", "The second question uses las to refer back to aceitunas.", breakdown([["hi", "Buenas"], ["what olives have you got?", "¿qué aceitunas tenéis?"], ["have you got them seasoned?", "¿Las tenéis aliñadas?"]])),
      stage("stage-2", "Choose the local variety", sentenceVocab.slice(4, 8), sentenceVocab.slice(36, 39), "Have you got Aloreña olives? Can I try one? Are they very spicy? Preferably pitted.", "¿Tenéis aloreñas? ¿Me dejas probar una? ¿Pican mucho? Mejor sin hueso.", "The sequence checks variety, taste, heat, and stone preference before ordering.", breakdown([["have you got Aloreña olives?", "¿Tenéis aloreñas?"], ["can I try one?", "¿Me dejas probar una?"], ["are they very spicy?", "¿Pican mucho?"], ["preferably pitted", "Mejor sin hueso"]])),
      stage("stage-3", "Order the amount", sentenceVocab.slice(2, 4), sentenceVocab.slice(23, 27), "Give me a quarter kilo of seasoned olives, please. Add just a little more.", "Ponme un cuarto de kilo de aceitunas aliñadas, porfa. Échame un poquito más.", "Ponme establishes the amount; échame asks the vendor to add a little.", breakdown([["give me a quarter kilo", "Ponme un cuarto de kilo"], ["of seasoned olives", "de aceitunas aliñadas"], ["please", "porfa"], ["add a little more", "Échame un poquito más"]])),
      stage("stage-4", "Ask about seasonal fruit", sentenceVocab.slice(9, 13), sentenceVocab.slice(41, 46), "What fruit is in season? Those oranges look good. Are they sweet? I'll take half a kilo.", "¿Qué fruta está de temporada? Esas naranjas tienen buena pinta. ¿Están dulces? Me llevo medio kilo.", "The stage moves from recommendation to appearance, taste, and purchase.", breakdown([["what fruit is in season?", "¿Qué fruta está de temporada?"], ["those oranges look good", "Esas naranjas tienen buena pinta"], ["are they sweet?", "¿Están dulces?"], ["I'll take half a kilo", "Me llevo medio kilo"]])),
      stage("stage-5", "Choose the right ripeness", sentenceVocab.slice(13, 16), sentenceVocab.slice(27, 32), "I want them for today. Have you got riper ones? Can you choose some that are just ripe?", "Las quiero para hoy. ¿Tienes otras más maduras? ¿Me escoges unas que estén en su punto?", "Para hoy explains the timing, and en su punto asks for ideal ripeness.", breakdown([["I want them for today", "Las quiero para hoy"], ["have you got riper ones?", "¿Tienes otras más maduras?"], ["can you choose some", "¿Me escoges unas"], ["that are just ripe?", "que estén en su punto?"]])),
      stage("stage-6", "Ask the price and adjust", sentenceVocab.slice(16, 19), sentenceVocab.slice(29, 33), "How much are the peaches? They're a little outside my price range, so give me less.", "¿A cuánto salen los melocotones? Se me van un poco de precio, pues ponme menos.", "Se me van de precio softens the objection, while pues introduces the adjustment.", breakdown([["how much are the peaches?", "¿A cuánto salen los melocotones?"], ["they're a little outside my price range", "Se me van un poco de precio"], ["so give me less", "pues ponme menos"]])),
      stage("stage-7", "Check local origin", sentenceVocab.slice(19, 20), sentenceVocab.slice(33, 46), "Are they local, from around here? Great; choose some for today.", "¿Son de aquí, de la zona? Estupendo; escógeme unos que estén para hoy.", "The buyer checks provenance and then lets the vendor select suitable fruit.", breakdown([["are they local?", "¿Son de aquí?"], ["from around here", "de la zona"], ["great", "Estupendo"], ["choose some for today", "escógeme unos que estén para hoy"]])),
      stage("stage-8", "Bag and pay", sentenceVocab.slice(20, 22), sentenceVocab.slice(46, 48), "Can you put everything in the same bag? How much is everything?", "¿Me lo pones todo en la misma bolsa? ¿Cuánto es todo?", "The final questions organize the purchase and request the total.", breakdown([["can you put it all", "¿Me lo pones todo"], ["in the same bag?", "en la misma bolsa?"], ["how much is everything?", "¿Cuánto es todo?"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "market-story-q1", type: "multiple-choice", prompt: "What does Carmen first want to buy?", options: ["Seasoned olives", "A whole watermelon", "Cheese", "Bread"], correctAnswer: "Seasoned olives", explanation: "She asks what olives the stall has and whether they are seasoned.", points: 1, skillTag: "shopping" },
  { id: "market-story-q2", type: "true-false", prompt: "True or false: The Aloreña olives are described as local and not very spicy.", options: ["True", "False"], correctAnswer: "True", explanation: "The vendor says they are local and only mildly spicy.", points: 1, skillTag: "details" },
  { id: "market-story-q3", type: "multiple-choice", prompt: "How many olives does Carmen initially order?", options: ["A quarter kilo", "One kilo", "Two kilos", "Half an olive"], correctAnswer: "A quarter kilo", explanation: "She orders a quarter kilo and then asks for a little more.", points: 1, skillTag: "quantity" },
  { id: "market-story-q4", type: "multiple-choice", prompt: "Which fruit does the vendor recommend as seasonal and sweet?", options: ["Oranges", "Apples", "Bananas", "Pears"], correctAnswer: "Oranges", explanation: "He recommends local seasonal oranges.", points: 1, skillTag: "produce" },
  { id: "market-story-q5", type: "true-false", prompt: "True or false: Carmen wants fruit that will only be ripe next week.", options: ["True", "False"], correctAnswer: "False", explanation: "She wants the fruit for today.", points: 1, skillTag: "ripeness" },
  { id: "market-story-q6", type: "multiple-choice", prompt: "What does the vendor offer to do with the peaches?", options: ["Choose ripe ones for today", "Freeze them", "Remove all the skin", "Deliver them next month"], correctAnswer: "Choose ripe ones for today", explanation: "He offers to select peaches that are ready to eat.", points: 1, skillTag: "service" },
  { id: "market-story-q7", type: "multiple-choice", prompt: "Why does Carmen reduce the peach order?", options: ["The price is a little high for her", "She dislikes peaches", "They are all unripe", "The stall is closing"], correctAnswer: "The price is a little high for her", explanation: "She says the price is a little beyond her budget.", points: 1, skillTag: "price" },
  { id: "market-story-q8", type: "true-false", prompt: "True or false: The oranges and olives are from outside Andalusia.", options: ["True", "False"], correctAnswer: "False", explanation: "The vendor confirms that both are local products.", points: 1, skillTag: "origin" },
  { id: "market-story-q9", type: "multiple-choice", prompt: "How does Carmen want the shopping packed?", options: ["Together in the same bag", "In four separate boxes", "Without a bag", "Sent by post"], correctAnswer: "Together in the same bag", explanation: "She asks for everything in the same bag if it fits.", points: 1, skillTag: "packing" },
  { id: "market-story-q10", type: "multiple-choice", prompt: "How does the exchange end?", options: ["Carmen asks the total and pays", "Carmen cancels everything", "The vendor has no produce", "They argue about the olives"], correctAnswer: "Carmen asks the total and pays", explanation: "The order is packed, totalled, and paid for.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1MarketShoppingOlivesFruitWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: La Compra para Esta Tarde", subtitle: "Carmen shops at a Málaga market stall, tastes local olives, asks about seasonal fruit, negotiates quantities, and leaves with produce ready for lunch.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "market", "Málaga"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "carmen", name: "Carmen", initials: "C", side: "right", color: "blue" },
      { id: "rafa", name: "Rafa", initials: "R", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "carmen", "Buenas, ¿qué aceitunas tenéis hoy?", "Hi, what kind of olives have you got today?", ["Buenas, ¿qué aceitunas tenéis?"]),
      message("m2", "rafa", "Buenas. Tengo aloreñas, verdes partidas y negras.", "Hi. I've got Aloreña, cracked green, and black olives.", ["Aceitunas aloreñas"]),
      message("m3", "carmen", "¿Las tenéis aliñadas? Busco unas bien aliñadas.", "Have you got them seasoned? I'm looking for nicely seasoned ones.", ["¿Las tenéis aliñadas?", "Bien aliñadas"], "voice-note"),
      message("m4", "rafa", "Sí. Las aloreñas son de aquí, de la zona, y llevan ajo y tomillo.", "Yes. The Aloreña olives are local and contain garlic and thyme.", ["Aceitunas aloreñas", "De aquí, de la zona"]),
      message("m5", "carmen", "¿Me dejas probar una? ¿Pican mucho?", "Can I try one? Are they very spicy?", ["¿Me dejas probar una?", "¿Pican mucho?"]),
      message("m6", "rafa", "Prueba esta. Está bien aliñada, pero no pica mucho.", "Try this one. It's nicely seasoned but not very spicy.", ["Bien aliñadas", "Que no piquen mucho"], "voice-note"),
      message("m7", "carmen", "Está buenísima. Ponme un cuarto de kilo, mejor sin hueso.", "It's delicious. Give me a quarter kilo, preferably pitted.", ["Ponme un cuarto de kilo", "Mejor sin hueso", "Un cuarto de kilo"]),
      message("m8", "rafa", "Sin problema. Un cuarto de aceitunas aliñadas.", "No problem. A quarter kilo of seasoned olives.", ["Un cuarto de aceitunas aliñadas, porfa", "Aceitunas aliñadas"]),
      message("m9", "carmen", "Échame un poquito más, que viene mi hermana a comer.", "Add a little more because my sister is coming for lunch.", ["Échame un poquito más"]),
      message("m10", "rafa", "Listo. ¿Algo de fruta también?", "Done. Any fruit as well?", []),
      message("m11", "carmen", "Sí. ¿Qué fruta está de temporada ahora?", "Yes. What fruit is in season now?", ["¿Qué fruta está de temporada?", "De temporada"]),
      message("m12", "rafa", "Las naranjas están bien dulces y son de aquí, de la zona.", "The oranges are really sweet and local.", ["Bien dulces", "De aquí, de la zona", "Naranjas"], "voice-note"),
      message("m13", "carmen", "Esas naranjas tienen buena pinta. ¿Están dulces de verdad?", "Those oranges look good. Are they really sweet?", ["Esas naranjas tienen buena pinta", "¿Están dulces?", "Naranjas"]),
      message("m14", "rafa", "Prueba un trocito. Son de esta semana y tienen mucho zumo.", "Try a piece. They're from this week and very juicy.", []),
      message("m15", "carmen", "Estupendo. Me llevo medio kilo.", "Great. I'll take half a kilo.", ["Estupendo", "Me llevo medio kilo", "Medio kilo"]),
      message("m16", "carmen", "Y, si tienes, quiero también unos melocotones.", "And if you have any, I'd also like some peaches.", ["Y, si tienes...", "Melocotones"]),
      message("m17", "rafa", "Claro. ¿Los quieres para hoy o para mañana?", "Of course. Do you want them for today or tomorrow?", []),
      message("m18", "carmen", "Las quiero para hoy. ¿Tienes otras más maduras?", "I want them for today. Have you got riper ones?", ["Las quiero para hoy", "¿Tienes otras más maduras?", "Maduras"], "voice-note"),
      message("m19", "rafa", "Sí. Te escojo unas maduras, pero firmes.", "Yes. I'll choose ripe but firm ones for you.", ["Te escojo unas maduras", "Maduras"]),
      message("m20", "carmen", "Gracias. ¿Me escoges unas que estén en su punto?", "Thanks. Can you select some that are perfectly ripe?", ["¿Me escoges unas que estén en su punto?", "Estar en su punto"]),
      message("m21", "rafa", "Claro. Estos tienen muy buena pinta y están para hoy.", "Of course. These look really good and are ready for today.", ["Tienen muy buena pinta", "Si las quieres para hoy..."]),
      message("m22", "carmen", "¿A cuánto salen los melocotones?", "How much are the peaches?", ["¿A cuánto salen los melocotones?", "Melocotones"]),
      message("m23", "rafa", "A cuatro euros con veinte el kilo.", "Four euros twenty per kilo.", ["¿A cuánto está el kilo?"]),
      message("m24", "carmen", "Uf, se me van un poco de precio. Pues ponme menos, unos tres.", "That's a little expensive for me. Give me less, about three.", ["Se me van un poco de precio", "Pues ponme menos"], "voice-note"),
      message("m25", "carmen", "Por cierto, ¿son de aquí, de la zona?", "By the way, are they local?", ["¿Son de aquí, de la zona?"]),
      message("m26", "rafa", "Sí. Los melocotones y las naranjas son de fincas cercanas.", "Yes. The peaches and oranges are from nearby farms.", ["Melocotones", "Naranjas", "De aquí, de la zona"]),
      message("m27", "carmen", "Perfecto. Escógeme unos que estén para hoy.", "Perfect. Choose some that are ready for today.", ["Escógeme unos que estén para hoy" ]),
      message("m28", "carmen", "¿Me lo pones todo en la misma bolsa, si cabe?", "Can you put everything in the same bag if it fits?", ["¿Me lo pones todo en la misma bolsa?", "La misma bolsa"]),
      message("m29", "rafa", "Claro. Aquí tienes las aceitunas, las naranjas y los melocotones.", "Of course. Here are the olives, oranges, and peaches.", ["Aceitunas aliñadas", "Naranjas", "Melocotones"]),
      message("m30", "carmen", "Estupendo. ¿Cuánto es todo? Pago con tarjeta.", "Great. How much is everything? I'll pay by card.", ["Estupendo", "¿Cuánto es todo?"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-market-shopping-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: marketVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: marketVocab.map((item) => item.term),
      grammarPatterns: ["Market requests with ponme, échame, and escógeme.", "Product descriptions with que plus subjunctive: que no piquen and que estén en su punto.", "Object pronouns that avoid repetition: las, lo, and unas."],
      speakingPrompts: ["Ask about olive varieties and taste one.", "Order a quarter kilo and adjust the amount.", "Ask which fruit is seasonal and ready for today.", "Check prices and local origin, then finish the purchase."],
    },
    completionTask: { title: "Shop at an Andalusian market", instructions: "Record a 75-second market exchange. Ask about local olives, taste and order them, choose seasonal fruit for today, react to the price, adjust the amount, request one bag, and ask the total." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En un mercado andaluz, una conversación puede empezar con «Buenas, ¿qué aceitunas tenéis?». El vendedor quizá responda «Buenas, ¿qué te pongo?». Si ya sabes que quieres producto preparado, «¿las tenéis aliñadas?» pregunta si las aceitunas llevan un aliño de ajo, hierbas, cítricos o especias.", translation: "A market exchange begins with a greeting and questions about available seasoned olives.", highlights: highlights(["Buenas, ¿qué aceitunas tenéis?", "Buenas, ¿qué te pongo?", "¿Las tenéis aliñadas?", "Aceitunas aliñadas"]), shadowLine: "Buenas, ¿qué aceitunas tenéis? ¿Las tenéis aliñadas?" },
  { id: "p2", text: "Las «aceitunas aloreñas» están especialmente vinculadas al Valle del Guadalhorce, en la provincia de Málaga. Preguntar «¿tenéis aloreñas?» muestra interés por un producto local. Antes de comprar, «¿me dejas probar una?» pide una muestra, y «¿pican mucho?» comprueba la intensidad del aliño.", translation: "Aloreña olives provide local Málaga context, while tasting helps the customer check the seasoning.", highlights: highlights(["Aceitunas aloreñas", "¿Tenéis aloreñas?", "¿Me dejas probar una?", "¿Pican mucho?"]), shadowLine: "¿Tenéis aloreñas? ¿Me dejas probar una?" },
  { id: "p3", text: "Para indicar la cantidad, «ponme un cuarto de kilo» pide doscientos cincuenta gramos. La frase «un cuarto de aceitunas aliñadas, porfa» forma un pedido completo y cercano. Si falta un poco, «échame un poquito más» invita al vendedor a añadir una pequeña cantidad. Si no quieres piedras, basta con decir «mejor sin hueso».", translation: "The customer orders a quarter kilo, asks for a little more, and chooses pitted olives.", highlights: highlights(["Ponme un cuarto de kilo", "Un cuarto de aceitunas aliñadas, porfa", "Un cuarto de kilo", "Échame un poquito más", "Mejor sin hueso", "Sin hueso", "Porfa"]), shadowLine: "Ponme un cuarto de kilo. Échame un poquito más." },
  { id: "p4", text: "Después puedes preguntar «¿qué fruta está de temporada?». Comprar fruta «de temporada» permite conocer lo que está en su mejor momento. Si unas piezas parecen apetecibles, «esas naranjas tienen buena pinta» comenta su aspecto. «¿Están dulces?» comprueba el sabor antes de decidir «me llevo medio kilo».", translation: "Seasonal fruit is assessed by appearance, sweetness, and the desired quantity.", highlights: highlights(["¿Qué fruta está de temporada?", "De temporada", "Esas naranjas tienen buena pinta", "Naranjas", "¿Están dulces?", "Me llevo medio kilo", "Medio kilo"]), shadowLine: "¿Qué fruta está de temporada? Esas naranjas tienen buena pinta." },
  { id: "p5", text: "El momento de consumo cambia la elección. «Las quiero para hoy» pide fruta lista para comer. Si las primeras piezas están duras, «¿tienes otras más maduras?» solicita otra opción. La petición «¿me escoges unas que estén en su punto?» deja que el vendedor seleccione fruta con la madurez ideal.", translation: "The customer explains when the fruit will be eaten and asks the vendor to choose ideal ripeness.", highlights: highlights(["Las quiero para hoy", "¿Tienes otras más maduras?", "Maduras", "¿Me escoges unas que estén en su punto?", "Estar en su punto"]), shadowLine: "Las quiero para hoy. ¿Me escoges unas que estén en su punto?" },
  { id: "p6", text: "El precio también modifica el pedido. «¿A cuánto está el kilo?» pregunta el precio por unidad de peso, mientras «¿a cuánto salen los melocotones?» pregunta por ese producto concreto. Si el coste supera tu presupuesto, «se me va un poco de precio» lo comunica con tacto. Entonces «pues ponme menos» reduce la cantidad sin criticar al vendedor.", translation: "Price questions lead to a polite budget objection and a smaller quantity.", highlights: highlights(["¿A cuánto está el kilo?", "¿A cuánto salen los melocotones?", "Melocotones", "Se me va un poco de precio", "Pues ponme menos"]), shadowLine: "Se me va un poco de precio, pues ponme menos." },
  { id: "p7", text: "En los mercados también importa el origen. «¿Son de aquí, de la zona?» pregunta si el producto procede de fincas cercanas. La respuesta «de aquí, de la zona» refuerza su carácter local. El vendedor puede añadir «te escojo unas maduras» o «escógeme unos que estén para hoy» para confirmar la selección adecuada.", translation: "The exchange checks local origin and confirms that the vendor will select suitable fruit.", highlights: highlights(["¿Son de aquí, de la zona?", "De aquí, de la zona", "Te escojo unas maduras", "Escógeme unos que estén para hoy"]), shadowLine: "¿Son de aquí, de la zona? Escógeme unos que estén para hoy." },
  { id: "p8", text: "Al terminar, «¿me lo pones todo en la misma bolsa?» organiza la compra y evita envases innecesarios cuando los productos pueden ir juntos. Finalmente, «¿cuánto es todo?» pide el total. Desde el saludo hasta el pago, estas fórmulas permiten comprar con precisión y mantener un trato cercano con quien atiende el puesto.", translation: "The purchase finishes by consolidating the items and asking for the total.", highlights: highlights(["¿Me lo pones todo en la misma bolsa?", "La misma bolsa", "¿Cuánto es todo?"]), shadowLine: "¿Me lo pones todo en la misma bolsa? ¿Cuánto es todo?" },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "market-reading-q1", type: "multiple-choice", prompt: "What are Aloreña olives especially associated with?", options: ["The Guadalhorce Valley in Málaga", "Northern France", "The Canary Islands only", "Central Madrid"], correctAnswer: "The Guadalhorce Valley in Málaga", explanation: "They are a culturally specific local Málaga product.", points: 1, skillTag: "culture" },
  { id: "market-reading-q2", type: "multiple-choice", prompt: "What does “estar en su punto” mean for fruit?", options: ["To be ideally ripe", "To be frozen", "To be sold out", "To be unwashed"], correctAnswer: "To be ideally ripe", explanation: "It identifies the ideal stage for eating.", points: 1, skillTag: "ripeness" },
  { id: "market-reading-q3", type: "true-false", prompt: "True or false: “se me va un poco de precio” politely indicates that something is beyond your budget.", options: ["True", "False"], correctAnswer: "True", explanation: "It avoids directly accusing the vendor of charging too much.", points: 1, skillTag: "price" },
  { id: "market-reading-q4", type: "order-words", prompt: "Order the request for fruit ready to eat today.", nativePrompt: "Can you choose some that are just ripe?", wordBank: ["¿Me", "escoges", "unas", "que", "estén", "en", "su", "punto?"], correctAnswer: "¿Me escoges unas que estén en su punto?", explanation: "Que estén uses the subjunctive to describe the desired fruit.", points: 2, skillTag: "request" },
  { id: "market-reading-q5", type: "multiple-choice", prompt: "Which phrase asks for the final total?", options: ["¿Cuánto es todo?", "¿Pican mucho?", "¿Están dulces?", "¿Son de aquí?"], correctAnswer: "¿Cuánto es todo?", explanation: "It asks the cost of the whole purchase.", points: 1, skillTag: "checkout" },
];

export const andalusianSpanishB1MarketShoppingOlivesFruitReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Del Puesto de Aceitunas a la Fruta", subtitle: "A synced Spanish reading about Aloreña olives, market quantities, tasting, seasonal produce, ideal ripeness, polite price limits, local origin, and checkout.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "market", "culture"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: marketVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1MarketShoppingOlivesFruitQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Market Shopping for Olives and Fruit", subtitle: "Test olive varieties, tasting, quantities, seasonal fruit, ripeness, price language, local origin, packing, and checkout.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "market", "food"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for buying olives and fruit at a local market.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "market-quiz-q1", type: "multiple-choice", prompt: "How do you ask what kinds of olives the stall has?", options: ["Buenas, ¿qué aceitunas tenéis?", "¿Cuánto es todo?", "¿Están dulces?", "Pues ponme menos"], correctAnswer: "Buenas, ¿qué aceitunas tenéis?", explanation: "Tenéis addresses the stall staff informally in Spain.", points: 1, skillTag: "opening" },
      { id: "market-quiz-q2", type: "multiple-choice", prompt: "Which local Málaga olives does the lesson feature?", options: ["Aloreñas", "Kalamata", "Manzanilla from Argentina", "Niçoise"], correctAnswer: "Aloreñas", explanation: "Aloreña olives are associated with the Guadalhorce Valley.", points: 1, skillTag: "culture" },
      { id: "market-quiz-q3", type: "order-words", prompt: "Order the tasting request.", nativePrompt: "Can I try one?", wordBank: ["¿Me", "dejas", "probar", "una?"], correctAnswer: "¿Me dejas probar una?", explanation: "Dejar plus infinitive asks permission.", points: 2, skillTag: "tasting" },
      { id: "market-quiz-q4", type: "multiple-choice", prompt: "What quantity is “un cuarto de kilo”?", options: ["250 grams", "500 grams", "750 grams", "One gram"], correctAnswer: "250 grams", explanation: "A quarter of a kilogram is 250 grams.", points: 1, skillTag: "quantity" },
      { id: "market-quiz-q5", type: "true-false", prompt: "True or false: “mejor sin hueso” expresses a preference for pitted olives.", options: ["True", "False"], correctAnswer: "True", explanation: "Sin hueso means without the stone.", points: 1, skillTag: "preference" },
      { id: "market-quiz-q6", type: "multiple-choice", prompt: "Which phrase asks what produce is currently seasonal?", options: ["¿Qué fruta está de temporada?", "¿Me dejas probar una?", "¿Las tenéis aliñadas?", "¿Cuánto es todo?"], correctAnswer: "¿Qué fruta está de temporada?", explanation: "De temporada means in season.", points: 1, skillTag: "seasonality" },
      { id: "market-quiz-q7", type: "multiple-choice", prompt: "What does “tener buena pinta” mean when discussing fruit?", options: ["To look appetising or promising", "To be very cheap", "To contain stones", "To come in a bag"], correctAnswer: "To look appetising or promising", explanation: "It evaluates appearance positively.", points: 1, skillTag: "description" },
      { id: "market-quiz-q8", type: "order-words", prompt: "Order the ideal-ripeness request.", nativePrompt: "Choose me some that are just right.", wordBank: ["Escógeme", "unos", "que", "estén", "en", "su", "punto."], correctAnswer: "Escógeme unos que estén en su punto.", explanation: "The clause specifies the desired ripeness.", points: 2, skillTag: "ripeness" },
      { id: "market-quiz-q9", type: "multiple-choice", prompt: "Which phrase politely says an item is beyond your budget?", options: ["Se me va un poco de precio", "Está en su punto", "Me llevo medio kilo", "Está de temporada"], correctAnswer: "Se me va un poco de precio", explanation: "It communicates a price limit indirectly.", points: 1, skillTag: "price" },
      { id: "market-quiz-q10", type: "true-false", prompt: "True or false: “pues ponme menos” can reduce the amount after hearing the price.", options: ["True", "False"], correctAnswer: "True", explanation: "Pues connects the smaller order to the price information.", points: 1, skillTag: "adjustment" },
      { id: "market-quiz-q11", type: "multiple-choice", prompt: "How do you ask whether produce is local?", options: ["¿Son de aquí, de la zona?", "¿Pican mucho?", "¿Están dulces?", "¿Qué te pongo?"], correctAnswer: "¿Son de aquí, de la zona?", explanation: "The question asks about nearby origin.", points: 1, skillTag: "origin" },
      { id: "market-quiz-q12", type: "match-pairs", prompt: "Match each market phrase to its function.", pairs: [{ left: "Échame un poquito más", right: "Add a small amount" }, { left: "Me llevo medio kilo", right: "Confirm a quantity" }, { left: "¿Cuánto es todo?", right: "Ask the final total" }], explanation: "The phrases adjust, confirm, and close the order.", points: 3, skillTag: "functions" },
      { id: "market-quiz-q13", type: "match-pairs", prompt: "Match each product term to its meaning.", pairs: [{ left: "Aceitunas aliñadas", right: "Seasoned olives" }, { left: "Melocotones", right: "Peaches" }, { left: "Sin hueso", right: "Pitted" }], explanation: "These terms identify preparation, fruit, and stone preference.", points: 3, skillTag: "vocabulary" },
    ],
  },
};
