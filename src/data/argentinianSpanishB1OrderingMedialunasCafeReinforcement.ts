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

const courseId = "argentinian-spanish-b1-ordering-medialunas-cafe";
const sectionName = "Argentinian Spanish - B1 Ordering Medialunas at a Café";

const cafeVocab: VocabItem[] = [
  { id: "buenas-tenes", term: "Buenas, ¿tenés medialunas?", meaning: "Hi, have you got any medialunas?", note: "Natural casual opener with Argentine voseo.", example: "Buenas, ¿tenés medialunas recién hechas?", translation: "Hi, have you got any freshly made medialunas?" },
  { id: "manteca-porfa", term: "De manteca, porfa", meaning: "The buttery ones, please", note: "Compact café answer when the product is already understood.", example: "Dame dos de manteca, porfa.", translation: "Give me two buttery ones, please." },
  { id: "cortado-jarrito", term: "Un cortado en jarrito", meaning: "A cortado served in a small mug", note: "Classic Argentine café order: espresso softened with a little milk.", example: "Para mí, un cortado en jarrito.", translation: "For me, a cortado in a small mug." },
  { id: "tomar-aca", term: "Para tomar acá", meaning: "For here", note: "Tells the server you will consume the order at the café.", example: "El café es para tomar acá.", translation: "The coffee is for here." },
  { id: "sentamos-alla", term: "¿Nos sentamos allá?", meaning: "Shall we sit over there?", note: "Voseo-based everyday suggestion between companions.", example: "¿Nos sentamos allá, junto a la ventana?", translation: "Shall we sit over there, by the window?" },
  { id: "quedan-grasa", term: "¿Te quedan de grasa?", meaning: "Have you got any of the flakier kind left?", note: "De grasa identifies the less sweet, often crispier variety.", example: "¿Te quedan de grasa o solamente de manteca?", translation: "Have you got any fat-based ones left, or only buttery ones?" },
  { id: "recien-hechas", term: "¿Están recién hechas?", meaning: "Are they freshly made?", note: "Practical question about freshness.", example: "¿Están recién hechas las medialunas?", translation: "Are the medialunas freshly made?" },
  { id: "una-cada", term: "Mejor una de cada", meaning: "Actually, one of each", note: "Mejor naturally revises the first choice.", example: "Iba a pedir dos de manteca, pero mejor una de cada.", translation: "I was going to order two buttery ones, but actually one of each." },
  { id: "calentas-toque", term: "¿Me las calentás un toque?", meaning: "Can you warm them up a bit?", note: "Calentás is voseo; un toque means a little bit.", example: "¿Me las calentás un toque, porfa?", translation: "Can you warm them up a bit, please?" },
  { id: "promo-desayuno", term: "¿Tenés promo de desayuno?", meaning: "Have you got any breakfast deals?", note: "Promo is a very common shortening of promoción.", example: "¿Tenés promo de desayuno con café?", translation: "Have you got a breakfast deal with coffee?" },
  { id: "cuanto-combo", term: "¿Cuánto sale el combo?", meaning: "How much is the meal deal?", note: "Salir is commonly used to ask the price in Argentina.", example: "¿Cuánto sale el combo con cortado?", translation: "How much is the combo with a cortado?" },
  { id: "viene-dos", term: "¿Viene con dos medialunas?", meaning: "Does it come with two medialunas?", note: "Viene con asks what is included in a deal.", example: "¿Viene con dos medialunas y un café?", translation: "Does it come with two medialunas and a coffee?" },
  { id: "me-conviene", term: "Ah, me conviene", meaning: "Oh, that’s a better deal for me", note: "Convenient financially or practically, not only physically convenient.", example: "Si incluye dos, ah, me conviene.", translation: "If it includes two, that’s a better deal for me." },
  { id: "mesa-libre", term: "¿Hay alguna mesa libre?", meaning: "Is there a free table?", note: "Mesa libre means an available table.", example: "¿Hay alguna mesa libre para dos?", translation: "Is there an available table for two?" },
  { id: "fondo-ventana", term: "Al fondo, junto a la ventana", meaning: "At the back, by the window", note: "Useful location phrase inside a café or restaurant.", example: "Hay una mesa al fondo, junto a la ventana.", translation: "There’s a table at the back, by the window." },
  { id: "otro-cortado", term: "¿Me traés otro cortado?", meaning: "Can you bring me another cortado?", note: "Traés is the Argentine voseo form.", example: "Cuando puedas, ¿me traés otro cortado?", translation: "Whenever you can, can you bring me another cortado?" },
  { id: "sin-azucar", term: "Sin azúcar, porfa", meaning: "No sugar, please", note: "Short natural modification after ordering a drink.", example: "El segundo también sin azúcar, porfa.", translation: "The second one without sugar too, please." },
  { id: "cobras-aca", term: "¿Me cobrás por acá?", meaning: "Can I pay here?", note: "Natural request for the server to take payment where you are seated or standing.", example: "Disculpá, ¿me cobrás por acá?", translation: "Excuse me, can I pay here?" },
  { id: "pagar-qr", term: "¿Se puede pagar con QR?", meaning: "Can I pay using a QR code?", note: "Common practical payment question in Argentina.", example: "¿Se puede pagar con QR desde la mesa?", translation: "Can I pay by QR from the table?" },
  { id: "armas-media-docena", term: "¿Me armás media docena?", meaning: "Can you put together half a dozen for me?", note: "Armar means preparing or assembling a takeaway order.", example: "¿Me armás media docena para la oficina?", translation: "Can you put together half a dozen for the office?" },
  { id: "para-llevar", term: "Para llevar", meaning: "To take away", note: "Contrasts with para tomar acá.", example: "La media docena es para llevar.", translation: "The half-dozen is to take away." },
  { id: "estan-tremendas", term: "Están tremendas", meaning: "They’re incredibly good", note: "Here tremendas is a strong compliment, not criticism.", example: "Estas medialunas están tremendas.", translation: "These medialunas are incredibly good." },
  { id: "das-dos", term: "¿Me das dos de manteca?", meaning: "Can I get two buttery ones?", note: "Direct but normal café request in this context.", example: "¿Me das dos de manteca y una de grasa?", translation: "Can I get two buttery ones and one fat-based one?" },
  { id: "porfa", term: "Porfa", meaning: "Please", note: "Casual shortening of por favor.", example: "Un cortado, porfa.", translation: "A cortado, please." },
  { id: "un-toque", term: "Un toque", meaning: "A little bit / a moment", note: "Very common informal Argentine expression.", example: "Calentalas un toque, nada más.", translation: "Warm them up just a little." },
  { id: "promo", term: "Promo", meaning: "Deal / special offer", note: "Everyday shortening of promoción.", example: "La promo incluye café y dos medialunas.", translation: "The deal includes coffee and two medialunas." },
  { id: "combo", term: "El combo", meaning: "Combo deal / meal deal", note: "A grouped food-and-drink offer.", example: "El combo de desayuno sale menos.", translation: "The breakfast combo costs less." },
  { id: "cuantas-queres", term: "¿Cuántas querés?", meaning: "How many do you want?", note: "Querés is the voseo form used in Argentina.", example: "¿Cuántas querés para llevar?", translation: "How many do you want to take away?" },
  { id: "conviene-mas", term: "Me conviene más", meaning: "It works out better for me", note: "Compares practical or financial value.", example: "La promo me conviene más que pedir todo separado.", translation: "The deal works out better for me than ordering separately." },
  { id: "disculpa", term: "Disculpá", meaning: "Excuse me / sorry", note: "Argentine voseo command used to get attention politely.", example: "Disculpá, ¿hay una mesa libre?", translation: "Excuse me, is there a free table?" },
  { id: "cuando-puedas", term: "Cuando puedas", meaning: "Whenever you get a chance", note: "Softens a request and removes pressure.", example: "Cuando puedas, ¿me traés la cuenta?", translation: "Whenever you can, can you bring me the bill?" },
  { id: "sentate", term: "Sentate ahí si querés", meaning: "Sit there if you want", note: "Sentate and querés are characteristic voseo forms.", example: "Sentate ahí si querés; yo hago el pedido.", translation: "Sit there if you want; I’ll place the order." },
  { id: "media-docena", term: "Media docena", meaning: "Half a dozen / six", note: "Common quantity for bakery takeaway orders.", example: "Llevo media docena para compartir.", translation: "I’m taking half a dozen to share." },
  { id: "aceptan-qr", term: "¿Aceptan QR?", meaning: "Do you accept QR payments?", note: "Short alternative to ¿Se puede pagar con QR?.", example: "Disculpá, ¿aceptan QR?", translation: "Excuse me, do you accept QR payments?" },
  { id: "mitad-mitad", term: "Mitad de manteca y mitad de grasa", meaning: "Half buttery ones and half the other kind", note: "Useful split for a mixed bakery order.", example: "Armame media docena: mitad de manteca y mitad de grasa.", translation: "Put together half a dozen: half buttery and half fat-based." },
  { id: "medialunas", term: "Medialunas", meaning: "Argentine crescent-shaped pastries", note: "A classic Argentine café and breakfast food.", example: "Pedimos café con medialunas.", translation: "We ordered coffee with medialunas." },
  { id: "medialunas-manteca", term: "Medialunas de manteca", meaning: "Butter-based medialunas, usually softer and sweeter", note: "One of the two common café varieties.", example: "Las medialunas de manteca están brillantes y dulces.", translation: "The butter medialunas are glossy and sweet." },
  { id: "medialunas-grasa", term: "Medialunas de grasa", meaning: "Fat-based medialunas, usually less sweet and crispier", note: "Often selected when someone prefers a less sweet pastry.", example: "Prefiero las medialunas de grasa porque son menos dulces.", translation: "I prefer the fat-based medialunas because they’re less sweet." },
  { id: "cortado", term: "Cortado", meaning: "Espresso with a little milk", note: "A standard café drink across Argentina.", example: "Tomó un cortado después del desayuno.", translation: "He had a cortado after breakfast." },
  { id: "jarrito", term: "Jarrito", meaning: "Small mug", note: "The diminutive identifies the small handled mug used for some coffee orders.", example: "El cortado vino en jarrito.", translation: "The cortado came in a small mug." },
  { id: "desayuno", term: "Desayuno", meaning: "Breakfast", note: "Often appears in café promos combining coffee and pastries.", example: "La promo de desayuno incluye dos medialunas.", translation: "The breakfast deal includes two medialunas." },
  { id: "mesa-libre-term", term: "Mesa libre", meaning: "Available table", note: "Libre means unoccupied in this café context.", example: "Encontramos una mesa libre al fondo.", translation: "We found an available table at the back." },
  { id: "qr", term: "QR", meaning: "QR code used for digital payment", note: "Usually pronounced as the Spanish letter names when spoken.", example: "El QR está pegado en la mesa.", translation: "The QR code is attached to the table." },
];

const highlightMap = Object.fromEntries(cafeVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = cafeVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB1OrderingMedialunasCafeFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B1: Ordering Medialunas at a Café Flashcards", subtitle: "Practical Rioplatense café language for pastry varieties, breakfast deals, tables, extra orders, takeaway boxes, and QR payments.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "café", "medialunas", "ordering"], estimatedMinutes: 22,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: cafeVocab.map(cardFromVocab) },
};

export const argentinianSpanishB1OrderingMedialunasCafeSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: An Argentine Café Order", subtitle: "Build a complete café visit using natural voseo, local pastry vocabulary, polite requests, prices, seating, and payment.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["argentinian-spanish", "b1", "sentence-builder", "café"], estimatedMinutes: 17,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Order two types of medialuna and a cortado, ask about a breakfast deal and a table, request a second drink, pay by QR, and prepare a mixed half-dozen to take away.",
    stages: [
      stage("stage-1", "Ask what is available", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Hi, have you got any medialunas? I’d like two buttery ones and a cortado in a small mug.", "Buenas, ¿tenés medialunas? ¿Me das dos de manteca, porfa, y un cortado en jarrito?", "The request uses Argentine voseo and gives the products enough context for natural pronunciation.", breakdown([["hi, have you got medialunas?", "Buenas, ¿tenés medialunas?"], ["can I get two buttery ones?", "¿Me das dos de manteca?"], ["please", "porfa"], ["a cortado in a small mug", "un cortado en jarrito"]])),
      stage("stage-2", "Choose both varieties", sentenceVocab.slice(5, 9), sentenceVocab.slice(5, 9), "Have you got any fat-based ones left? Are they freshly made? Actually, one of each, and warm them up a little.", "¿Te quedan de grasa? ¿Están recién hechas? Mejor una de cada. ¿Me las calentás un toque?", "Mejor shows a natural change of mind, while un toque keeps the warming request casual.", breakdown([["have you got any fat-based ones left?", "¿Te quedan de grasa?"], ["are they freshly made?", "¿Están recién hechas?"], ["actually, one of each", "Mejor una de cada"], ["can you warm them up a little?", "¿Me las calentás un toque?"]])),
      stage("stage-3", "Ask about the deal", sentenceVocab.slice(9, 13), sentenceVocab.slice(9, 13), "Have you got a breakfast deal? How much is the combo? Does it come with two medialunas? Oh, that works out better for me.", "¿Tenés promo de desayuno? ¿Cuánto sale el combo? ¿Viene con dos medialunas? Ah, me conviene.", "The sequence checks availability, price, contents, and value before confirming.", breakdown([["have you got a breakfast deal?", "¿Tenés promo de desayuno?"], ["how much is the combo?", "¿Cuánto sale el combo?"], ["does it come with two medialunas?", "¿Viene con dos medialunas?"], ["that works out better for me", "me conviene"]])),
      stage("stage-4", "Find a table", sentenceVocab.slice(3, 5), sentenceVocab.slice(13, 15), "It’s for here. Is there a free table? Shall we sit at the back, by the window?", "Es para tomar acá. ¿Hay alguna mesa libre? ¿Nos sentamos al fondo, junto a la ventana?", "The café location phrases turn the order into a complete sit-down interaction.", breakdown([["for here", "para tomar acá"], ["is there a free table?", "¿Hay alguna mesa libre?"], ["shall we sit", "¿Nos sentamos"], ["at the back, by the window", "al fondo, junto a la ventana?"]])),
      stage("stage-5", "Order another coffee", sentenceVocab.slice(15, 17), sentenceVocab.slice(29, 32), "Excuse me, whenever you can, can you bring me another cortado? No sugar, please.", "Disculpá, cuando puedas, ¿me traés otro cortado? Sin azúcar, porfa.", "Cuando puedas softens the request, while traés keeps the Argentine voseo form.", breakdown([["excuse me", "Disculpá"], ["whenever you can", "cuando puedas"], ["can you bring me another cortado?", "¿me traés otro cortado?"], ["no sugar, please", "Sin azúcar, porfa"]])),
      stage("stage-6", "Pay at the table", sentenceVocab.slice(17, 19), sentenceVocab.slice(33, 35), "Can I pay here? Do you accept QR payments?", "¿Me cobrás por acá? ¿Aceptan QR? ¿Se puede pagar con QR?", "The stage practises both the short and full versions of the QR-payment question.", breakdown([["can I pay here?", "¿Me cobrás por acá?"], ["do you accept QR?", "¿Aceptan QR?"], ["can I pay using QR?", "¿Se puede pagar con QR?"]])),
      stage("stage-7", "Prepare a takeaway box", sentenceVocab.slice(19, 22), sentenceVocab.slice(32, 35), "Can you put together half a dozen to take away, half buttery and half fat-based?", "¿Me armás media docena para llevar? Mitad de manteca y mitad de grasa.", "Armar is the natural verb for preparing the mixed takeaway order.", breakdown([["can you put together", "¿Me armás"], ["half a dozen", "media docena"], ["to take away", "para llevar"], ["half buttery and half fat-based", "mitad de manteca y mitad de grasa"]])),
      stage("stage-8", "Give a final reaction", sentenceVocab.slice(21), sentenceVocab, "These medialunas are incredibly good. The breakfast deal works out better for me, so I’ll take another half-dozen.", "Estas medialunas están tremendas. La promo de desayuno me conviene más, así que llevo otra media docena.", "Tremendas is a strong positive evaluation in this food context.", breakdown([["these medialunas", "Estas medialunas"], ["are incredibly good", "están tremendas"], ["the breakfast deal", "La promo de desayuno"], ["works out better for me", "me conviene más"], ["I'll take another half-dozen", "llevo otra media docena"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-cafe-story-q1", type: "multiple-choice", prompt: "Which medialunas are available and fresh?", options: ["Both manteca and grasa", "Only manteca", "Only grasa", "None"], correctAnswer: "Both manteca and grasa", explanation: "By message 3 Leo confirms both varieties have just come out.", points: 1, skillTag: "availability" },
  { id: "arg-cafe-story-q2", type: "multiple-choice", prompt: "Where is the available table?", options: ["At the back by the window", "Outside", "Beside the counter", "Upstairs"], correctAnswer: "At the back by the window", explanation: "Leo directs Sofía to the free table in message 6.", points: 1, skillTag: "location" },
  { id: "arg-cafe-story-q3", type: "multiple-choice", prompt: "What does the breakfast combo include?", options: ["A cortado and two medialunas", "Tea and toast", "One pastry only", "Coffee and a sandwich"], correctAnswer: "A cortado and two medialunas", explanation: "The offer is explained before Sofía says it works out better for her.", points: 1, skillTag: "deal" },
  { id: "arg-cafe-story-q4", type: "multiple-choice", prompt: "Which varieties does Sofía choose for the combo?", options: ["One manteca and one grasa", "Two manteca", "Two grasa", "No pastries"], correctAnswer: "One manteca and one grasa", explanation: "She changes her choice to one of each and asks for them warmed.", points: 1, skillTag: "order" },
  { id: "arg-cafe-story-q5", type: "true-false", prompt: "True or false: Sofía thinks the medialunas are excellent.", options: ["True", "False"], correctAnswer: "True", explanation: "By message 15 she says están tremendas.", points: 1, skillTag: "reaction" },
  { id: "arg-cafe-story-q6", type: "multiple-choice", prompt: "Why does Sofía order another cortado?", options: ["Her friend Vale has arrived", "Her first coffee was cold", "The café offers it free", "She spills the first one"], correctAnswer: "Her friend Vale has arrived", explanation: "Sofía explains that her friend has just arrived and orders another without sugar.", points: 1, skillTag: "reason" },
  { id: "arg-cafe-story-q7", type: "multiple-choice", prompt: "What takeaway order does Sofía request?", options: ["Half a dozen for the office", "One cortado", "A full dozen for home", "Two sandwiches"], correctAnswer: "Half a dozen for the office", explanation: "She asks Leo to prepare six medialunas for her coworkers.", points: 1, skillTag: "takeaway" },
  { id: "arg-cafe-story-q8", type: "multiple-choice", prompt: "How is the half-dozen divided?", options: ["Three manteca and three grasa", "Six manteca", "Four grasa and two manteca", "Five manteca and one grasa"], correctAnswer: "Three manteca and three grasa", explanation: "Sofía explicitly asks for half of each before message 24.", points: 1, skillTag: "quantity" },
  { id: "arg-cafe-story-q9", type: "multiple-choice", prompt: "How does Sofía pay?", options: ["By scanning a QR code", "With cash", "By card at the counter", "Her friend pays"], correctAnswer: "By scanning a QR code", explanation: "Leo confirms QR payment and Sofía completes it.", points: 1, skillTag: "payment" },
  { id: "arg-cafe-story-q10", type: "multiple-choice", prompt: "What is the final result of the café visit?", options: ["They enjoy breakfast and leave with the office order", "They cancel everything", "The café runs out before serving them", "They move to another café"], correctAnswer: "They enjoy breakfast and leave with the office order", explanation: "The last messages confirm payment, the prepared box, and their positive reaction.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishB1OrderingMedialunasCafeWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B1 Story: The Last Fresh Medialunas", subtitle: "Sofía orders breakfast, finds a window table, meets a late friend, pays by QR, and prepares a mixed box for the office.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "WhatsApp", "café", "medialunas"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "sofia", name: "Sofía", initials: "S", side: "left", color: "violet" }, { id: "leo", name: "Leo", initials: "L", side: "right", color: "blue" }],
    messages: [
      message("m1", "sofia", "Buenas, ¿tenés medialunas?", "Hi, have you got any medialunas?", ["Buenas, ¿tenés medialunas?", "Medialunas"]),
      message("m2", "leo", "Sí, tenemos de manteca y de grasa.", "Yes, we have buttery ones and fat-based ones.", ["Medialunas de manteca", "Medialunas de grasa"]),
      message("m3", "leo", "Las dos están recién hechas; salieron hace cinco minutos.", "Both are freshly made; they came out five minutes ago.", ["¿Están recién hechas?"], "voice-note"),
      message("m4", "sofia", "Genial. Primero iba a pedir dos de manteca.", "Great. At first I was going to order two buttery ones.", ["¿Me das dos de manteca?", "De manteca, porfa"]),
      message("m5", "sofia", "Es para tomar acá. ¿Hay alguna mesa libre?", "It’s for here. Is there a free table?", ["Para tomar acá", "¿Hay alguna mesa libre?", "Mesa libre"]),
      message("m6", "leo", "Sí, al fondo, junto a la ventana. Sentate ahí si querés.", "Yes, at the back, by the window. Sit there if you want.", ["Al fondo, junto a la ventana", "Sentate ahí si querés"], "voice-note"),
      message("m7", "sofia", "Antes de pedir: ¿tenés promo de desayuno?", "Before ordering: have you got a breakfast deal?", ["¿Tenés promo de desayuno?", "Promo", "Desayuno"]),
      message("m8", "leo", "Sí. El combo trae un cortado y dos medialunas.", "Yes. The combo comes with a cortado and two medialunas.", ["El combo", "Cortado", "¿Viene con dos medialunas?"]),
      message("m9", "sofia", "¿Cuánto sale el combo? Si incluye dos, me conviene más.", "How much is the combo? If it includes two, it works out better for me.", ["¿Cuánto sale el combo?", "Me conviene más", "Ah, me conviene"]),
      message("m10", "leo", "Sale menos que pedir todo separado. ¿Cuáles querés?", "It costs less than ordering everything separately. Which ones do you want?", ["¿Cuántas querés?"]),
      message("m11", "sofia", "Mejor una de cada y un cortado en jarrito.", "Actually, one of each and a cortado in a small mug.", ["Mejor una de cada", "Un cortado en jarrito", "Jarrito"]),
      message("m12", "sofia", "¿Me las calentás un toque? El cortado, sin azúcar, porfa.", "Can you warm them up a bit? The cortado without sugar, please.", ["¿Me las calentás un toque?", "Un toque", "Sin azúcar, porfa", "Porfa"], "voice-note"),
      message("m13", "leo", "Dale. Te llevo todo a la mesa.", "Sure. I’ll bring everything to the table.", []),
      message("m14", "sofia", "Llegó mi amiga Vale. ¿Nos sentamos allá, entonces?", "My friend Vale has arrived. Shall we sit over there, then?", ["¿Nos sentamos allá?"]),
      message("m15", "sofia", "Probamos las dos: están tremendas.", "We tried both: they’re incredibly good.", ["Están tremendas"]),
      message("m16", "sofia", "Disculpá, cuando puedas, ¿me traés otro cortado?", "Excuse me, whenever you can, can you bring me another cortado?", ["Disculpá", "Cuando puedas", "¿Me traés otro cortado?"]),
      message("m17", "sofia", "Es para Vale. También sin azúcar, porfa.", "It’s for Vale. Without sugar too, please.", ["Sin azúcar, porfa"]),
      message("m18", "leo", "Sí, ahora te lo llevo. Quedan pocos jarritos limpios, pero llegamos.", "Yes, I’ll bring it now. There are few clean small mugs left, but we’re fine.", ["Jarrito"], "voice-note"),
      message("m19", "sofia", "Además necesito algo para la oficina. ¿Me armás media docena?", "I also need something for the office. Can you put together half a dozen?", ["¿Me armás media docena?", "Media docena"]),
      message("m20", "leo", "Claro. ¿Cuántas querés de cada tipo?", "Of course. How many of each kind do you want?", ["¿Cuántas querés?"]),
      message("m21", "sofia", "Mitad de manteca y mitad de grasa, para llevar.", "Half buttery ones and half fat-based, to take away.", ["Mitad de manteca y mitad de grasa", "Para llevar"]),
      message("m22", "leo", "Perfecto: tres de manteca y tres de grasa.", "Perfect: three buttery ones and three fat-based ones.", ["Medialunas de manteca", "Medialunas de grasa"]),
      message("m23", "sofia", "Buenísimo. Disculpá, ¿me cobrás por acá?", "Great. Excuse me, can I pay here?", ["Disculpá", "¿Me cobrás por acá?"]),
      message("m24", "sofia", "¿Aceptan QR? ¿Se puede pagar con QR desde la mesa?", "Do you accept QR? Can I pay by QR from the table?", ["¿Aceptan QR?", "¿Se puede pagar con QR?", "QR"], "voice-note"),
      message("m25", "leo", "Sí, el QR está en el borde de la mesa.", "Yes, the QR code is on the edge of the table.", ["QR"]),
      message("m26", "sofia", "Listo, ya pagué el desayuno y la media docena.", "Done, I’ve paid for breakfast and the half-dozen.", ["Desayuno", "Media docena"]),
      message("m27", "leo", "Entró el pago. En un minuto te traigo la caja.", "The payment came through. I’ll bring you the box in a minute.", []),
      message("m28", "sofia", "Vale dice que la de grasa le gustó más.", "Vale says she preferred the fat-based one.", ["Medialunas de grasa"]),
      message("m29", "leo", "Entonces la próxima pedís más de grasa. Acá tenés la caja.", "Then next time order more fat-based ones. Here’s the box.", []),
      message("m30", "sofia", "Gracias. El combo me convino y las medialunas están tremendas. Volvemos seguro.", "Thanks. The combo was a good deal and the medialunas are incredible. We’ll definitely return.", ["Ah, me conviene", "Están tremendas", "Medialunas"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-cafe-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: cafeVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: cafeVocab.map((item) => item.term),
      grammarPatterns: ["Voseo questions: tenés, querés, traés, calentás, cobrás.", "Voseo commands: disculpá and sentate.", "Service requests with ¿me das…?, ¿me traés…?, and ¿me armás…?."],
      speakingPrompts: ["Order a breakfast combo and choose two pastry varieties.", "Ask whether the pastries are fresh and can be warmed.", "Find an available table and request another coffee.", "Prepare a mixed takeaway order and pay by QR."],
    },
    completionTask: { title: "Your Argentine café order", instructions: "Record a 60-second café interaction. Order a drink and two medialunas, ask about a deal and a table, then add a takeaway order and choose a payment method." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En un café argentino, entrar con “Buenas, ¿tenés medialunas?” abre la interacción de manera natural. Las medialunas son masas en forma de media luna y suelen acompañar el desayuno o la merienda. No son exactamente iguales a un croissant: tienen su propia textura, tamaño y lugar dentro de la cultura del café.", translation: "A natural café visit may begin by asking whether medialunas are available. They are a distinctive Argentine breakfast and afternoon snack pastry.", highlights: highlights(["Buenas, ¿tenés medialunas?", "Medialunas", "Desayuno"]), shadowLine: "Buenas, ¿tenés medialunas recién hechas?" },
  { id: "p2", text: "Las “medialunas de manteca” suelen ser más suaves, brillantes y dulces. Las “medialunas de grasa” suelen ser menos dulces y algo más crocantes. Por eso es útil preguntar “¿te quedan de grasa?” y “¿están recién hechas?”. Si cuesta elegir, “mejor una de cada” resuelve el problema.", translation: "The two common varieties differ in sweetness and texture. Asking what remains and choosing one of each is practical café language.", highlights: highlights(["Medialunas de manteca", "Medialunas de grasa", "¿Te quedan de grasa?", "¿Están recién hechas?", "Mejor una de cada"]), shadowLine: "¿Te quedan de grasa? Mejor una de cada." },
  { id: "p3", text: "Una orden muy reconocible es “un cortado en jarrito”. El “cortado” combina café expreso con un poco de leche, y el “jarrito” es una taza pequeña con asa. Para modificar el pedido, se puede agregar “sin azúcar, porfa” o pedir “¿me las calentás un toque?” si las medialunas necesitan un poco de calor.", translation: "A cortado in a small mug is a recognisable order. The remaining phrases customise sugar and warming.", highlights: highlights(["Un cortado en jarrito", "Cortado", "Jarrito", "Sin azúcar, porfa", "¿Me las calentás un toque?", "Un toque", "Porfa"]), shadowLine: "Un cortado en jarrito, sin azúcar, porfa." },
  { id: "p4", text: "Antes de pedir cada producto por separado, conviene consultar “¿tenés promo de desayuno?”. Una “promo” o “combo” puede incluir café y dos medialunas. “¿Cuánto sale el combo?” pregunta el precio, mientras “¿viene con dos medialunas?” confirma el contenido. Si el precio es mejor, la reacción puede ser “ah, me conviene”.", translation: "Breakfast deals may combine coffee and pastries. These questions check the price and contents before deciding whether the deal is worthwhile.", highlights: highlights(["¿Tenés promo de desayuno?", "Promo", "El combo", "¿Cuánto sale el combo?", "¿Viene con dos medialunas?", "Ah, me conviene"]), shadowLine: "¿Cuánto sale el combo? Si viene con dos medialunas, me conviene." },
  { id: "p5", text: "Para quedarse en el local, se dice “para tomar acá”. Después se puede preguntar “¿hay alguna mesa libre?”. Una respuesta como “al fondo, junto a la ventana” indica el lugar. Entre amigos, “¿nos sentamos allá?” propone una mesa, y “sentate ahí si querés” usa dos formas típicas del voseo argentino.", translation: "These expressions distinguish eating in, locate an available table, and show common Argentine voseo.", highlights: highlights(["Para tomar acá", "¿Hay alguna mesa libre?", "Mesa libre", "Al fondo, junto a la ventana", "¿Nos sentamos allá?", "Sentate ahí si querés"]), shadowLine: "¿Hay alguna mesa libre al fondo, junto a la ventana?" },
  { id: "p6", text: "Durante el desayuno, “disculpá” sirve para llamar la atención con cortesía. “Cuando puedas” evita apurar a la otra persona. Juntas forman una petición amable: “Disculpá, cuando puedas, ¿me traés otro cortado?”. Las formas “disculpá”, “podés”, “traés” y “querés” pertenecen al voseo rioplatense.", translation: "Disculpá and cuando puedas create a polite, unhurried request and illustrate Rioplatense voseo.", highlights: highlights(["Disculpá", "Cuando puedas", "¿Me traés otro cortado?"]), shadowLine: "Disculpá, cuando puedas, ¿me traés otro cortado?" },
  { id: "p7", text: "Para llevar comida, “¿me armás media docena?” pide que preparen seis unidades. El empleado puede preguntar “¿cuántas querés?”. Una respuesta clara es “mitad de manteca y mitad de grasa”. La expresión “para llevar” diferencia este pedido de lo que se consume en la mesa.", translation: "A takeaway order can be assembled as a half-dozen with an even split between the two varieties.", highlights: highlights(["¿Me armás media docena?", "Media docena", "¿Cuántas querés?", "Mitad de manteca y mitad de grasa", "Para llevar"]), shadowLine: "¿Me armás media docena para llevar, mitad de manteca y mitad de grasa?" },
  { id: "p8", text: "Al terminar, “¿me cobrás por acá?” pregunta si se puede pagar en la mesa. También son frecuentes “¿aceptan QR?” y “¿se puede pagar con QR?”. Si la experiencia fue muy buena, “están tremendas” funciona como un elogio fuerte para las medialunas. En este contexto, “tremendas” significa excelentes.", translation: "Payment may be requested at the table or completed by QR. Están tremendas is a strong positive reaction to the pastries.", highlights: highlights(["¿Me cobrás por acá?", "¿Aceptan QR?", "¿Se puede pagar con QR?", "QR", "Están tremendas"]), shadowLine: "¿Me cobrás por acá? ¿Se puede pagar con QR?" },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-cafe-reading-q1", type: "multiple-choice", prompt: "What is the usual difference described between the two medialuna varieties?", options: ["Manteca is sweeter and softer; grasa is less sweet and crispier", "Grasa always contains chocolate", "Manteca is a drink", "There is no difference"], correctAnswer: "Manteca is sweeter and softer; grasa is less sweet and crispier", explanation: "The reading presents the common practical distinction between the varieties.", points: 1, skillTag: "food" },
  { id: "arg-cafe-reading-q2", type: "multiple-choice", prompt: "What does “me conviene” mean when discussing a combo?", options: ["It is better value or more practical for me", "It is too expensive", "I have already paid", "I want to leave"], correctAnswer: "It is better value or more practical for me", explanation: "Convenient here refers to financial or practical advantage.", points: 1, skillTag: "value" },
  { id: "arg-cafe-reading-q3", type: "true-false", prompt: "True or false: “para tomar acá” means the order is for takeaway.", options: ["True", "False"], correctAnswer: "False", explanation: "It means the customer will consume the order at the café.", points: 1, skillTag: "service" },
  { id: "arg-cafe-reading-q4", type: "order-words", prompt: "Order the café request.", nativePrompt: "Whenever you can, can you bring me another cortado?", wordBank: ["Cuando", "puedas,", "¿me", "traés", "otro", "cortado?"], correctAnswer: "Cuando puedas, ¿me traés otro cortado?", explanation: "Cuando puedas softens the request before the voseo question.", points: 2, skillTag: "voseo" },
  { id: "arg-cafe-reading-q5", type: "multiple-choice", prompt: "What does “están tremendas” mean in this food context?", options: ["They are incredibly good", "They are frightening", "They are unavailable", "They are too cold"], correctAnswer: "They are incredibly good", explanation: "Tremendas functions as an enthusiastic compliment here.", points: 1, skillTag: "nuance" },
];

export const argentinianSpanishB1OrderingMedialunasCafeReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B1 Reading: Un Desayuno de Café Porteño", subtitle: "A synced Spanish reading about medialuna varieties, cortados, breakfast deals, voseo requests, takeaway quantities, and QR payment.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "reading", "café", "medialunas"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: cafeVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const argentinianSpanishB1OrderingMedialunasCafeQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian B1 Quiz: Ordering Medialunas at a Café", subtitle: "Test café vocabulary, voseo, breakfast deals, seating, takeaway orders, and payment.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "quiz", "café"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Argentine café phrases from arrival through payment.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-cafe-quiz-q1", type: "multiple-choice", prompt: "How do you naturally ask whether the café has medialunas?", options: ["Buenas, ¿tenés medialunas?", "Buenas, ¿sos medialunas?", "Traés la mesa", "¿Está el desayuno?"], correctAnswer: "Buenas, ¿tenés medialunas?", explanation: "Tenés is the Argentine voseo form.", points: 1, skillTag: "opening" },
      { id: "arg-cafe-quiz-q2", type: "multiple-choice", prompt: "You want to try both varieties. What do you say?", options: ["Mejor una de cada", "Dos mesas libres", "Para tomar allá", "Sin jarrito"], correctAnswer: "Mejor una de cada", explanation: "The phrase revises the order to one of each.", points: 1, skillTag: "choice" },
      { id: "arg-cafe-quiz-q3", type: "fill-blank", prompt: "Complete: ¿Me las calentás un _____?", nativePrompt: "Can you warm them up a bit?", correctAnswer: "toque", explanation: "Un toque means a little bit here.", points: 1, skillTag: "request" },
      { id: "arg-cafe-quiz-q4", type: "multiple-choice", prompt: "Which question checks the price of the breakfast deal?", options: ["¿Cuánto sale el combo?", "¿Nos sentamos allá?", "¿Me cobrás por acá?", "¿Están recién hechas?"], correctAnswer: "¿Cuánto sale el combo?", explanation: "Salir is commonly used to ask price.", points: 1, skillTag: "price" },
      { id: "arg-cafe-quiz-q5", type: "true-false", prompt: "True or false: ‘Ah, me conviene’ can mean the deal is better value for you.", options: ["True", "False"], correctAnswer: "True", explanation: "Convenience can be financial or practical.", points: 1, skillTag: "meaning" },
      { id: "arg-cafe-quiz-q6", type: "multiple-choice", prompt: "Which expression tells the server you will eat at the café?", options: ["Para tomar acá", "Para llevar", "Al fondo", "Media docena"], correctAnswer: "Para tomar acá", explanation: "It contrasts directly with para llevar.", points: 1, skillTag: "service" },
      { id: "arg-cafe-quiz-q7", type: "order-words", prompt: "Order the polite request.", nativePrompt: "Excuse me, whenever you can, can you bring me another cortado?", wordBank: ["Disculpá,", "cuando", "puedas,", "¿me", "traés", "otro", "cortado?"], correctAnswer: "Disculpá, cuando puedas, ¿me traés otro cortado?", explanation: "The request combines voseo with a no-pressure softener.", points: 2, skillTag: "production" },
      { id: "arg-cafe-quiz-q8", type: "multiple-choice", prompt: "What does ‘¿me armás media docena?’ ask the server to do?", options: ["Prepare six items", "Warm one coffee", "Find a table", "Split the bill"], correctAnswer: "Prepare six items", explanation: "Armar means assembling the takeaway order.", points: 1, skillTag: "quantity" },
      { id: "arg-cafe-quiz-q9", type: "multiple-choice", prompt: "How do you request an equal mixed box?", options: ["Mitad de manteca y mitad de grasa", "Todas recién hechas", "Una mesa de cada", "Un cortado y un QR"], correctAnswer: "Mitad de manteca y mitad de grasa", explanation: "The phrase divides the quantity equally between varieties.", points: 1, skillTag: "takeaway" },
      { id: "arg-cafe-quiz-q10", type: "multiple-choice", prompt: "Which phrase asks the server to take payment where you are?", options: ["¿Me cobrás por acá?", "¿Me las calentás?", "¿Te quedan de grasa?", "¿Nos sentamos allá?"], correctAnswer: "¿Me cobrás por acá?", explanation: "Cobrás is the relevant voseo form for taking payment.", points: 1, skillTag: "payment" },
      { id: "arg-cafe-quiz-q11", type: "true-false", prompt: "True or false: ‘¿Aceptan QR?’ asks whether the café accepts digital QR payment.", options: ["True", "False"], correctAnswer: "True", explanation: "It is the concise payment question.", points: 1, skillTag: "payment" },
      { id: "arg-cafe-quiz-q12", type: "multiple-choice", prompt: "In this context, what does ‘están tremendas’ mean?", options: ["They are incredibly good", "They are extremely expensive", "They are stale", "They are enormous"], correctAnswer: "They are incredibly good", explanation: "It is an enthusiastic compliment about the medialunas.", points: 1, skillTag: "reaction" },
      { id: "arg-cafe-quiz-q13", type: "multiple-choice", prompt: "Which set contains only Argentine voseo forms used in the lesson?", options: ["tenés, querés, traés, calentás", "tienes, quieres, traes, calientas", "tenga, quiera, traiga, caliente", "tener, querer, traer, calentar"], correctAnswer: "tenés, querés, traés, calentás", explanation: "These forms address vos in Rioplatense Spanish.", points: 1, skillTag: "voseo" },
    ],
  },
};
