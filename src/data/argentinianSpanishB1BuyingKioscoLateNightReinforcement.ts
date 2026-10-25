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

const courseId = "argentinian-spanish-b1-buying-kiosco-late-night";
const sectionName = "Argentinian Spanish - B1 Buying at a Kiosco Late at Night";

const kioscoVocab: VocabItem[] = [
  { id: "seguis-abierto", term: "Buenas, ¿seguís abierto?", meaning: "Hey, are you still open?", note: "Natural late-night opener using Argentine voseo.", example: "Buenas, ¿seguís abierto un rato más?", translation: "Hey, are you still open a little longer?" },
  { id: "tenes-alfajores", term: "¿Tenés alfajores?", meaning: "Have you got any alfajores?", note: "Tenés is the voseo form of tener.", example: "¿Tenés alfajores de chocolate?", translation: "Have you got any chocolate alfajores?" },
  { id: "das-chocolate", term: "¿Me das uno de chocolate?", meaning: "Can I have a chocolate one?", note: "A direct but friendly shop request.", example: "¿Me das uno de chocolate, porfa?", translation: "Can I have a chocolate one, please?" },
  { id: "algo-picar", term: "¿Tenés algo para picar?", meaning: "Have you got anything to snack on?", note: "Picar means eating a small snack here.", example: "¿Tenés algo salado para picar?", translation: "Have you got anything savoury to snack on?" },
  { id: "cuanto-sale", term: "¿Cuánto sale?", meaning: "How much is it?", note: "Salir is commonly used for prices in Argentina.", example: "¿Cuánto sale este alfajor?", translation: "How much is this alfajor?" },
  { id: "quedan-papas", term: "¿Te quedan papas fritas?", meaning: "Have you got any crisps left?", note: "In this kiosco context, papas fritas means packaged crisps.", example: "¿Te quedan papas fritas chicas?", translation: "Have you got any small packets of crisps left?" },
  { id: "mas-barato", term: "¿Tenés alguno más barato?", meaning: "Have you got anything cheaper?", note: "Useful when comparing products without sounding demanding.", example: "Está medio caro; ¿tenés alguno más barato?", translation: "It is a bit pricey; have you got anything cheaper?" },
  { id: "paquete-chico", term: "Mejor el paquete chico", meaning: "Actually, I’ll take the small packet", note: "Mejor naturally revises a choice.", example: "Ando corto de guita, mejor el paquete chico.", translation: "I am short on cash, so I will take the small packet." },
  { id: "llevo-este", term: "Me llevo este", meaning: "I’ll take this one", note: "Natural phrase for confirming a visible item.", example: "Este no es tan caro; me llevo este.", translation: "This one is not so expensive; I will take it." },
  { id: "haces-recargas", term: "¿Hacés recargas?", meaning: "Do you do phone top-ups?", note: "Hacés is the Argentine voseo form.", example: "Disculpá, ¿hacés recargas acá?", translation: "Excuse me, do you do top-ups here?" },
  { id: "cargas-saldo", term: "¿Me cargás saldo al celu?", meaning: "Can you top up my phone?", note: "Cargás is voseo; celu is informal celular.", example: "¿Me cargás saldo al celu antes de cerrar?", translation: "Can you top up my phone before closing?" },
  { id: "personal", term: "Es de Personal", meaning: "It’s on Personal", note: "Personal is an Argentine mobile network provider.", example: "Mi celu es de Personal.", translation: "My phone is on Personal." },
  { id: "paso-numero", term: "¿Te paso el número?", meaning: "Shall I give you the number?", note: "Everyday voseo question for offering information.", example: "¿Te paso el número ahora?", translation: "Shall I give you the number now?" },
  { id: "acredita-toque", term: "¿Se acredita al toque?", meaning: "Does the credit go through straight away?", note: "Al toque means immediately or very quickly.", example: "¿Se acredita al toque la recarga?", translation: "Does the top-up go through immediately?" },
  { id: "pagar-qr", term: "¿Puedo pagar con QR?", meaning: "Can I pay by QR code?", note: "A common practical payment question in Argentina.", example: "No tengo efectivo; ¿puedo pagar con QR?", translation: "I do not have cash; can I pay by QR?" },
  { id: "llego-pago", term: "¿Te llegó el pago?", meaning: "Did the payment come through?", note: "Llegar describes a digital payment appearing for the seller.", example: "Escaneé el código; ¿te llegó el pago?", translation: "I scanned the code; did the payment come through?" },
  { id: "das-bolsita", term: "¿Me das una bolsita?", meaning: "Can I have a little bag?", note: "The diminutive sounds ordinary and practical here.", example: "¿Me das una bolsita para llevar todo?", translation: "Can I have a little bag to carry everything?" },
  { id: "recomendas", term: "¿Qué me recomendás?", meaning: "What would you recommend?", note: "Recomendás is the voseo form.", example: "Quiero algo dulce, ¿qué me recomendás?", translation: "I want something sweet; what would you recommend?" },
  { id: "que-onda-alfajor", term: "¿Qué onda ese alfajor?", meaning: "What’s that alfajor like?", note: "¿Qué onda...? informally asks for an opinion or description.", example: "¿Qué onda ese alfajor nuevo?", translation: "What is that new alfajor like?" },
  { id: "corto-guita", term: "Ando medio corto de guita", meaning: "I’m a bit strapped for cash", note: "Informal and natural with friends or in relaxed situations.", example: "Ando medio corto de guita esta semana.", translation: "I am a bit strapped for cash this week." },
  { id: "tenes-cambio", term: "¿Tenés cambio?", meaning: "Have you got any change?", note: "Common cash-payment question using voseo.", example: "¿Tenés cambio de diez mil?", translation: "Have you got change for ten thousand?" },
  { id: "de-una", term: "De una", meaning: "For sure / sounds good", note: "Enthusiastic informal agreement.", example: "¿Querés el de chocolate? De una.", translation: "Do you want the chocolate one? Definitely." },
  { id: "no-hay-drama", term: "No hay drama", meaning: "No worries / no problem", note: "Relaxed reassurance used widely in Argentina.", example: "Si tarda la recarga, no hay drama.", translation: "If the top-up takes a while, no worries." },
  { id: "buenisimo", term: "Buenísimo", meaning: "Brilliant / great", note: "Strong positive everyday reaction.", example: "¿Entró el pago? Buenísimo.", translation: "Did the payment arrive? Great." },
  { id: "porfa", term: "Porfa", meaning: "Please", note: "Casual shortening of por favor.", example: "Una bolsita, porfa.", translation: "A little bag, please." },
  { id: "al-toque", term: "Al toque", meaning: "Straight away / very quickly", note: "Frequent informal timing expression.", example: "La recarga entra al toque.", translation: "The top-up goes through straight away." },
  { id: "un-rato", term: "Un rato", meaning: "A little while", note: "An imprecise short period of time.", example: "El kiosco sigue abierto un rato más.", translation: "The kiosco stays open a little longer." },
  { id: "medio-caro", term: "Medio caro", meaning: "A bit pricey", note: "Medio softens the evaluation.", example: "Ese alfajor está medio caro.", translation: "That alfajor is a bit pricey." },
  { id: "mas-barato-term", term: "El más barato", meaning: "The cheapest one", note: "Useful shortcut when price is the main criterion.", example: "Dame el más barato, porfa.", translation: "Give me the cheapest one, please." },
  { id: "no-sea-caro", term: "No sea tan caro", meaning: "That isn’t so expensive", note: "Reassures the customer about the alternative price.", example: "Tengo uno más chico que no es tan caro.", translation: "I have a smaller one that is not so expensive." },
  { id: "queda-paquete", term: "Me queda solo el paquete chico", meaning: "I’ve only got the small packet left", note: "Me queda describes remaining stock.", example: "De esas papas me queda solo el paquete chico.", translation: "I only have the small packet of those crisps left." },
  { id: "necesito-saldo", term: "Necesito cargarle saldo al celu", meaning: "I need to put credit on my phone", note: "Natural explanation of the practical need.", example: "Necesito cargarle saldo al celu para avisar que llego tarde.", translation: "I need to top up my phone to say I will be late." },
  { id: "pasame-numero", term: "Pasame el número", meaning: "Give me the number", note: "Voseo command; the stress falls on pa.", example: "Pasame el número y la empresa.", translation: "Give me the number and the network." },
  { id: "decime-cuanto", term: "Decime cuánto querés cargar", meaning: "Tell me how much you want to top up", note: "Two voseo forms appear together: decime and querés.", example: "Pasame el número y decime cuánto querés cargar.", translation: "Give me the number and tell me how much you want to top up." },
  { id: "llevo-ese", term: "Me llevo ese", meaning: "I’ll take that one", note: "Ese points to an item farther from the speaker.", example: "El de la derecha está bien; me llevo ese.", translation: "The one on the right is fine; I will take that one." },
  { id: "kiosco", term: "Kiosco", meaning: "Convenience shop / corner shop", note: "A central part of everyday neighbourhood life in Argentina.", example: "El kiosco de la esquina cierra tarde.", translation: "The corner kiosco closes late." },
  { id: "alfajor", term: "Alfajor", meaning: "Filled sweet biscuit, often chocolate-coated", note: "An iconic Argentine sweet sold in kioscos.", example: "Compré un alfajor para el viaje.", translation: "I bought an alfajor for the journey." },
  { id: "papas-fritas", term: "Papas fritas", meaning: "Crisps", note: "In a packaged-snack context, this means crisps.", example: "Quedan pocas papas fritas.", translation: "There are only a few crisps left." },
  { id: "celu", term: "Celu", meaning: "Mobile phone", note: "Casual shortening of celular.", example: "Me quedé sin saldo en el celu.", translation: "I ran out of credit on my phone." },
  { id: "saldo", term: "Saldo", meaning: "Phone credit / balance", note: "Used for prepaid mobile credit and account balances.", example: "Todavía no apareció el saldo.", translation: "The credit has not appeared yet." },
  { id: "recarga", term: "Recarga", meaning: "Phone top-up", note: "The transaction that adds prepaid phone credit.", example: "La recarga tarda un minuto.", translation: "The top-up takes a minute." },
  { id: "guita", term: "Guita", meaning: "Money / cash", note: "Strongly informal Argentine word for money.", example: "No traje mucha guita.", translation: "I did not bring much cash." },
  { id: "bolsita", term: "Bolsita", meaning: "Small bag", note: "Useful when several small purchases need carrying.", example: "Puso todo en una bolsita.", translation: "He put everything in a small bag." },
  { id: "paquete-chico-term", term: "Paquete chico", meaning: "Small packet", note: "Useful for choosing the cheaper or smaller snack size.", example: "El paquete chico alcanza para el viaje.", translation: "The small packet is enough for the journey." },
  { id: "cambio", term: "Cambio", meaning: "Change", note: "Money returned after a cash payment.", example: "No tengo cambio de ese billete.", translation: "I do not have change for that note." },
  { id: "personal-term", term: "Personal", meaning: "Argentine mobile network provider", note: "A proper name; give it inside a complete phrase when speaking.", example: "La línea es de Personal.", translation: "The line is on Personal." },
];

const highlightMap = Object.fromEntries(kioscoVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = kioscoVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB1BuyingKioscoLateNightFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B1: Late-Night Kiosco Flashcards", subtitle: "Practical voseo and local vocabulary for snacks, prices, phone credit, QR payments, and closing-time decisions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "kiosco", "shopping", "voseo"], estimatedMinutes: 24,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: kioscoVocab.map(cardFromVocab) },
};

export const argentinianSpanishB1BuyingKioscoLateNightSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: A Late-Night Kiosco Run", subtitle: "Build a complete shop interaction before closing, from choosing snacks to topping up a phone and checking a QR payment.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["argentinian-spanish", "b1", "sentence-builder", "kiosco"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Enter a kiosco before closing, choose an affordable snack and alfajor, request a phone top-up, pay by QR, confirm the payment, and ask for a bag.",
    stages: [
      stage("stage-1", "Check the shop is open", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "Hey, are you still open? Have you got alfajores and anything to snack on?", "Buenas, ¿seguís abierto? ¿Tenés alfajores y algo para picar?", "The complete opening gives seguís, tenés, and picar clear conversational context.", breakdown([["are you still open?", "¿seguís abierto?"], ["have you got alfajores?", "¿tenés alfajores?"], ["anything to snack on", "algo para picar"]])),
      stage("stage-2", "Choose an alfajor", sentenceVocab.slice(17, 20), sentenceVocab.slice(17, 20), "What would you recommend? What is that alfajor like? Can I have a chocolate one?", "¿Qué me recomendás? ¿Qué onda ese alfajor? ¿Me das uno de chocolate, porfa?", "The questions move from recommendation to a specific purchase.", breakdown([["what would you recommend?", "¿Qué me recomendás?"], ["what is that alfajor like?", "¿Qué onda ese alfajor?"], ["can I have a chocolate one?", "¿Me das uno de chocolate?"], ["please", "porfa"]])),
      stage("stage-3", "Compare snack prices", sentenceVocab.slice(4, 9), sentenceVocab.slice(4, 9), "How much is it? That is a bit pricey. Have you got anything cheaper? Actually, I will take the small packet.", "¿Cuánto sale? Está medio caro. ¿Tenés alguno más barato? Mejor el paquete chico; me llevo este.", "Mejor marks a natural change after comparing prices.", breakdown([["how much is it?", "¿Cuánto sale?"], ["a bit pricey", "medio caro"], ["anything cheaper?", "¿tenés alguno más barato?"], ["actually, the small packet", "mejor el paquete chico"], ["I'll take this one", "me llevo este"]])),
      stage("stage-4", "Explain the budget", sentenceVocab.slice(19, 21), sentenceVocab.slice(27, 31), "I am a bit strapped for cash. Have you got any crisps left that are not so expensive?", "Ando medio corto de guita. ¿Te quedan papas fritas que no sean tan caras?", "The budget explanation makes the cheaper request sound natural rather than abrupt.", breakdown([["I am a bit strapped for cash", "Ando medio corto de guita"], ["have you got any crisps left?", "¿Te quedan papas fritas?"], ["that are not so expensive", "que no sean tan caras"]])),
      stage("stage-5", "Ask for a phone top-up", sentenceVocab.slice(9, 14), sentenceVocab.slice(31, 35), "Do you do top-ups? I need credit on my phone. It is on Personal. Shall I give you the number?", "¿Hacés recargas? Necesito cargarle saldo al celu. Es de Personal. ¿Te paso el número?", "Full sentences protect the pronunciation of recarga, celu, and Personal.", breakdown([["do you do top-ups?", "¿Hacés recargas?"], ["I need to top up my phone", "Necesito cargarle saldo al celu"], ["it is on Personal", "Es de Personal"], ["shall I give you the number?", "¿Te paso el número?"]])),
      stage("stage-6", "Confirm the top-up", sentenceVocab.slice(12, 14), sentenceVocab.slice(25, 34), "Give me the number and tell me how much you want to top up. Does it go through straight away?", "Pasame el número y decime cuánto querés cargar. ¿Se acredita al toque?", "The stage groups four characteristic voseo forms into a realistic exchange.", breakdown([["give me the number", "Pasame el número"], ["tell me", "decime"], ["how much you want to top up", "cuánto querés cargar"], ["does it go through immediately?", "¿Se acredita al toque?"]])),
      stage("stage-7", "Pay and verify", sentenceVocab.slice(14, 16), sentenceVocab.slice(20, 25), "Can I pay by QR? Did the payment come through? Great, no worries.", "¿Puedo pagar con QR? ¿Te llegó el pago? Buenísimo, no hay drama.", "The sequence covers the small pause between scanning and seller confirmation.", breakdown([["can I pay by QR?", "¿Puedo pagar con QR?"], ["did the payment come through?", "¿Te llegó el pago?"], ["great", "Buenísimo"], ["no worries", "no hay drama"]])),
      stage("stage-8", "Pack up and leave", sentenceVocab.slice(16), sentenceVocab, "Can I have a little bag? I will take that one and the small packet. I need to leave right away.", "¿Me das una bolsita? Me llevo ese y el paquete chico. Me tengo que ir al toque.", "The closing stage combines the bag request, final choice, and late-night urgency.", breakdown([["can I have a little bag?", "¿Me das una bolsita?"], ["I'll take that one", "Me llevo ese"], ["the small packet", "el paquete chico"], ["right away", "al toque"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-kiosco-story-q1", type: "multiple-choice", prompt: "How much longer will Nico keep the kiosco open?", options: ["Ten minutes", "One hour", "Until morning", "It is already closed"], correctAnswer: "Ten minutes", explanation: "By message 3 Nico says he will stay open for ten more minutes.", points: 1, skillTag: "opening" },
  { id: "arg-kiosco-story-q2", type: "multiple-choice", prompt: "Which sweet does Mica choose?", options: ["The cheaper chocolate alfajor", "A cereal bar", "A packet of biscuits", "Nothing sweet"], correctAnswer: "The cheaper chocolate alfajor", explanation: "She asks for the cheaper option and confirms it in message 6.", points: 1, skillTag: "choice" },
  { id: "arg-kiosco-story-q3", type: "multiple-choice", prompt: "Why does Nico recommend the second alfajor?", options: ["It has more filling and is not much more expensive", "It is the last product in the shop", "It comes with a drink", "It is sugar-free"], correctAnswer: "It has more filling and is not much more expensive", explanation: "Nico describes the difference before Mica chooses it.", points: 1, skillTag: "recommendation" },
  { id: "arg-kiosco-story-q4", type: "multiple-choice", prompt: "Which packet of crisps is still available?", options: ["Only the small packet", "Only the family packet", "Only the spicy packet", "No crisps remain"], correctAnswer: "Only the small packet", explanation: "By message 12 Nico says only the small packet remains.", points: 1, skillTag: "stock" },
  { id: "arg-kiosco-story-q5", type: "true-false", prompt: "True or false: Mica decides not to top up her phone.", options: ["True", "False"], correctAnswer: "False", explanation: "She needs phone credit to message her friend and asks Nico to do a top-up.", points: 1, skillTag: "top-up" },
  { id: "arg-kiosco-story-q6", type: "multiple-choice", prompt: "Which mobile network and amount does Mica give Nico?", options: ["Personal and two thousand", "Movistar and five thousand", "Claro and one thousand", "Personal and ten thousand"], correctAnswer: "Personal and two thousand", explanation: "The network and amount are both confirmed by message 18.", points: 1, skillTag: "details" },
  { id: "arg-kiosco-story-q7", type: "multiple-choice", prompt: "What does Nico say about the top-up timing?", options: ["It usually appears straight away", "It takes twenty-four hours", "It only works tomorrow", "He cannot check it"], correctAnswer: "It usually appears straight away", explanation: "He explains that the balance normally credits al toque.", points: 1, skillTag: "timing" },
  { id: "arg-kiosco-story-q8", type: "multiple-choice", prompt: "What happens immediately after Mica scans the QR?", options: ["The payment takes a moment to appear", "The payment is rejected permanently", "Her phone switches off", "Nico closes the shop"], correctAnswer: "The payment takes a moment to appear", explanation: "At message 24 Nico is still waiting for the notification.", points: 1, skillTag: "payment" },
  { id: "arg-kiosco-story-q9", type: "multiple-choice", prompt: "What does Nico put in the bag?", options: ["The alfajor and the small packet of crisps", "Only the phone receipt", "Two drinks", "A large packet of crisps"], correctAnswer: "The alfajor and the small packet of crisps", explanation: "The items and the bag are confirmed before message 27.", points: 1, skillTag: "packing" },
  { id: "arg-kiosco-story-q10", type: "multiple-choice", prompt: "How does the story end?", options: ["Mica leaves with credit and snacks before her bus", "Mica misses the bus and returns everything", "The top-up never works", "Nico keeps the shop open all night"], correctAnswer: "Mica leaves with credit and snacks before her bus", explanation: "The final voice note confirms the top-up, the purchases, and her timely departure.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishB1BuyingKioscoLateNightWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B1 Story: Ten Minutes Before the Kiosco Closes", subtitle: "Mica races against closing time to choose affordable snacks, restore her phone credit, and make sure a QR payment arrives before her bus.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "WhatsApp", "kiosco", "shopping"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "mica", name: "Mica", initials: "M", side: "left", color: "violet" }, { id: "nico", name: "Nico", initials: "N", side: "right", color: "blue" }],
    messages: [
      message("m1", "mica", "Buenas, ¿seguís abierto?", "Hey, are you still open?", ["Buenas, ¿seguís abierto?"]),
      message("m2", "nico", "Sí, cierro en un rato. ¿Qué necesitás?", "Yes, I am closing in a little while. What do you need?", ["Un rato"]),
      message("m3", "nico", "Me quedo diez minutos más, pero después bajo la persiana.", "I will stay open ten more minutes, but then I am pulling down the shutter.", [], "voice-note"),
      message("m4", "mica", "Buenísimo. ¿Tenés alfajores?", "Great. Have you got any alfajores?", ["Buenísimo", "¿Tenés alfajores?", "Alfajor"]),
      message("m5", "mica", "Ando medio corto de guita. ¿Tenés alguno más barato?", "I am a bit strapped for cash. Have you got anything cheaper?", ["Ando medio corto de guita", "Guita", "¿Tenés alguno más barato?"]),
      message("m6", "nico", "Sí, este de chocolate es el más barato. Sale menos que los otros.", "Yes, this chocolate one is the cheapest. It costs less than the others.", ["El más barato"], "voice-note"),
      message("m7", "mica", "¿Qué onda ese alfajor de al lado?", "What is that alfajor beside it like?", ["¿Qué onda ese alfajor?"]),
      message("m8", "nico", "Tiene más relleno y no es tan caro.", "It has more filling and is not so expensive.", ["No sea tan caro"]),
      message("m9", "mica", "Entonces, ¿qué me recomendás entre los dos?", "So, what would you recommend between the two?", ["¿Qué me recomendás?"]),
      message("m10", "nico", "El segundo. Por la diferencia de precio, está mejor.", "The second one. For the price difference, it is better.", []),
      message("m11", "mica", "De una. ¿Me das uno de chocolate? Me llevo ese.", "Definitely. Can I have a chocolate one? I will take that one.", ["De una", "¿Me das uno de chocolate?", "Me llevo ese"]),
      message("m12", "nico", "¿Querés algo para picar? De papas fritas me queda solo el paquete chico.", "Do you want something to snack on? I only have the small packet of crisps left.", ["¿Tenés algo para picar?", "Papas fritas", "Me queda solo el paquete chico", "Paquete chico"], "voice-note"),
      message("m13", "mica", "¿Cuánto sale?", "How much is it?", ["¿Cuánto sale?"]),
      message("m14", "nico", "El grande ya no queda; el chico sale bastante menos.", "The large one is gone; the small one costs quite a bit less.", []),
      message("m15", "mica", "Está bien, mejor el paquete chico. También necesito cargarle saldo al celu.", "Okay, actually I will take the small packet. I also need to top up my phone.", ["Mejor el paquete chico", "Necesito cargarle saldo al celu", "Celu", "Saldo"]),
      message("m16", "mica", "¿Hacés recargas?", "Do you do phone top-ups?", ["¿Hacés recargas?", "Recarga"]),
      message("m17", "nico", "Sí. Pasame el número y decime cuánto querés cargar.", "Yes. Give me the number and tell me how much you want to top up.", ["Pasame el número", "Decime cuánto querés cargar"]),
      message("m18", "mica", "Es de Personal. Cargame dos mil, porfa. ¿Te paso el número ahora?", "It is on Personal. Top up two thousand, please. Shall I give you the number now?", ["Es de Personal", "Personal", "Porfa", "¿Te paso el número?"], "voice-note"),
      message("m19", "mica", "Listo: once, cinco, cuatro… Ya te mandé el número completo.", "Done: eleven, five, four... I have sent you the full number.", []),
      message("m20", "nico", "Perfecto, ya hice la recarga.", "Perfect, I have done the top-up.", ["Recarga"]),
      message("m21", "mica", "¿Se acredita al toque? Tengo que avisar que llego al colectivo.", "Does it go through straight away? I need to say that I am reaching the bus.", ["¿Se acredita al toque?", "Al toque"]),
      message("m22", "nico", "Sí, normalmente entra al toque. Si tarda, esperá un minuto.", "Yes, it normally appears immediately. If it is delayed, wait a minute.", ["Al toque"]),
      message("m23", "mica", "Buenísimo. ¿Puedo pagar con QR? No traje efectivo.", "Great. Can I pay by QR? I did not bring cash.", ["Buenísimo", "¿Puedo pagar con QR?"]),
      message("m24", "nico", "Sí, escaneá este. Todavía no me llegó la notificación; esperemos un segundo.", "Yes, scan this one. The notification has not arrived yet; let us wait a second.", [], "voice-note"),
      message("m25", "mica", "Ahí lo mandé. ¿Te llegó el pago?", "I have sent it now. Did the payment come through?", ["¿Te llegó el pago?"]),
      message("m26", "nico", "Ahora sí, entró. No hay drama.", "Now it has arrived. No worries.", ["No hay drama"]),
      message("m27", "mica", "Perfecto. ¿Me das una bolsita para el alfajor y las papas?", "Perfect. Can I have a little bag for the alfajor and the crisps?", ["¿Me das una bolsita?", "Bolsita", "Alfajor", "Papas fritas"]),
      message("m28", "nico", "Sí, acá tenés. También revisá el celu: el saldo ya tendría que aparecer.", "Yes, here you are. Also check your phone: the credit should already be visible.", ["Celu", "Saldo"]),
      message("m29", "mica", "Sí, ya apareció. Llegué justo con la guita y con el tiempo.", "Yes, it has appeared. I had just enough money and time.", ["Guita"]),
      message("m30", "mica", "Buenísimo, me voy al toque. Tengo saldo, algo para picar y todavía llego al colectivo.", "Great, I am leaving right away. I have credit, a snack, and I can still catch the bus.", ["Buenísimo", "Al toque", "¿Tenés algo para picar?"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-kiosco-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: kioscoVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: kioscoVocab.map((item) => item.term),
      grammarPatterns: ["Voseo questions: seguís, tenés, hacés, cargás and recomendás.", "Voseo commands: pasame and decime.", "Shop requests with ¿me das…?, ¿tenés…? and me llevo…"],
      speakingPrompts: ["Ask whether a kiosco is still open and what snacks remain.", "Compare two products and choose the cheaper option.", "Request a phone top-up and provide the network details.", "Pay by QR, confirm receipt, and ask for a bag."],
    },
    completionTask: { title: "Your late-night kiosco stop", instructions: "Record a 75-second interaction. Check whether the kiosco is open, buy two affordable snacks, top up your phone, pay digitally, and confirm everything before leaving." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Argentina, un “kiosco” puede resolver muchas necesidades cotidianas: algo dulce, “papas fritas”, una bebida, una “recarga” o una compra rápida cuando otros negocios ya cerraron. De noche, entrar con “Buenas, ¿seguís abierto?” permite confirmar con naturalidad si todavía hay tiempo para comprar.", translation: "An Argentine kiosco is useful for snacks, drinks, phone top-ups, and quick late-night purchases. The opening checks whether the shop is still serving.", highlights: highlights(["Kiosco", "Papas fritas", "Recarga", "Buenas, ¿seguís abierto?"]), shadowLine: "Buenas, ¿seguís abierto un rato más?" },
  { id: "p2", text: "Para preguntar por productos, el voseo aparece constantemente: “¿tenés alfajores?”, “¿te quedan papas fritas?” y “¿tenés algo para picar?”. Un “alfajor” suele tener dos tapas, un relleno y, muchas veces, una cobertura de chocolate. Si hay varias opciones, “¿qué onda ese alfajor?” pide una opinión informal sobre una de ellas.", translation: "Voseo questions are central when asking what remains. The paragraph also explains what an alfajor is and how to ask casually about one.", highlights: highlights(["¿Tenés alfajores?", "¿Te quedan papas fritas?", "¿Tenés algo para picar?", "Alfajor", "¿Qué onda ese alfajor?"]), shadowLine: "¿Tenés alfajores? ¿Qué onda ese de chocolate?" },
  { id: "p3", text: "Si no conocés los productos, “¿qué me recomendás?” invita al kiosquero a comparar sabor, tamaño y precio. Después, “¿me das uno de chocolate?” hace el pedido. Para señalar una elección visible se puede decir “me llevo este” o “me llevo ese”. La palabra “porfa” mantiene el tono breve y amable.", translation: "These phrases move from asking for advice to selecting and requesting a visible product.", highlights: highlights(["¿Qué me recomendás?", "¿Me das uno de chocolate?", "Me llevo este", "Me llevo ese", "Porfa"]), shadowLine: "¿Qué me recomendás? Me llevo ese, porfa." },
  { id: "p4", text: "El precio puede cambiar la decisión. “¿Cuánto sale?” pregunta cuánto cuesta algo. Si está “medio caro”, es normal consultar “¿tenés alguno más barato?”. Alguien que dice “ando medio corto de guita” explica informalmente que tiene poco dinero. “Guita” significa plata, y “mejor el paquete chico” permite cambiar a una opción más económica.", translation: "This paragraph explains asking prices, softening criticism, describing a tight budget, and changing to a smaller option.", highlights: highlights(["¿Cuánto sale?", "Medio caro", "¿Tenés alguno más barato?", "Ando medio corto de guita", "Guita", "Mejor el paquete chico"]), shadowLine: "Ando medio corto de guita; mejor el paquete chico." },
  { id: "p5", text: "Muchos kioscos también hacen “recargas”. La pregunta “¿hacés recargas?” usa voseo, igual que “¿me cargás saldo al celu?”. “Celu” es la forma abreviada y cotidiana de celular, mientras que “saldo” es el crédito disponible. Para completar la operación, el vendedor puede decir “pasame el número” y “decime cuánto querés cargar”.", translation: "Kioscos often handle prepaid phone top-ups. The paragraph introduces the key nouns and voseo instructions needed for the transaction.", highlights: highlights(["Recarga", "¿Hacés recargas?", "¿Me cargás saldo al celu?", "Celu", "Saldo", "Pasame el número", "Decime cuánto querés cargar"]), shadowLine: "¿Me cargás saldo al celu? Pasame el número." },
  { id: "p6", text: "Antes de confirmar, hay que indicar la empresa: por ejemplo, “es de Personal”. La pregunta “¿te paso el número?” ofrece el dato, y “¿se acredita al toque?” averigua si el crédito llega inmediatamente. “Al toque” es informal y significa enseguida. Si tarda “un rato”, todavía puede no haber ningún problema.", translation: "The customer provides the network and number, then checks whether the top-up should arrive immediately.", highlights: highlights(["Es de Personal", "Personal", "¿Te paso el número?", "¿Se acredita al toque?", "Al toque", "Un rato"]), shadowLine: "Es de Personal. ¿Se acredita al toque?" },
  { id: "p7", text: "Para pagar, “¿puedo pagar con QR?” pregunta por una opción digital muy común. Después de escanear, “¿te llegó el pago?” confirma que el vendedor recibió la transferencia. Si la notificación tarda unos segundos, “no hay drama” evita crear tensión. Cuando aparece, “buenísimo” marca alivio y satisfacción.", translation: "The payment sequence includes asking for QR, confirming receipt, and reacting calmly to a brief delay.", highlights: highlights(["¿Puedo pagar con QR?", "¿Te llegó el pago?", "No hay drama", "Buenísimo"]), shadowLine: "¿Te llegó el pago? Buenísimo, no hay drama." },
  { id: "p8", text: "Al final, “¿me das una bolsita?” sirve para llevar varias compras pequeñas. Si se paga en efectivo, también puede hacer falta “¿tenés cambio?”. Una visita completa al kiosco combina decisiones rápidas, precios, voseo y servicios prácticos. Dominar estas frases permite comprar sin recurrir siempre al español formal del manual.", translation: "The final step covers carrying the purchase and asking for change. Together, the phrases create a complete natural kiosco interaction.", highlights: highlights(["¿Me das una bolsita?", "Bolsita", "¿Tenés cambio?", "Cambio"]), shadowLine: "¿Me das una bolsita? ¿Tenés cambio?" },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-kiosco-reading-q1", type: "multiple-choice", prompt: "Besides snacks, which service can an Argentine kiosco often provide?", options: ["A prepaid phone top-up", "Passport renewal", "Train reservations", "Medical treatment"], correctAnswer: "A prepaid phone top-up", explanation: "The reading describes recargas as a common practical kiosco service.", points: 1, skillTag: "culture" },
  { id: "arg-kiosco-reading-q2", type: "multiple-choice", prompt: "What does “ando medio corto de guita” communicate?", options: ["Money is a little tight", "The shop is closing", "The customer lost a phone", "The product is sold out"], correctAnswer: "Money is a little tight", explanation: "Guita is informal Argentine Spanish for money.", points: 1, skillTag: "meaning" },
  { id: "arg-kiosco-reading-q3", type: "true-false", prompt: "True or false: “¿se acredita al toque?” asks whether phone credit appears quickly.", options: ["True", "False"], correctAnswer: "True", explanation: "Al toque means straight away or very quickly.", points: 1, skillTag: "top-up" },
  { id: "arg-kiosco-reading-q4", type: "order-words", prompt: "Order the natural price question.", nativePrompt: "Have you got anything cheaper?", wordBank: ["¿Tenés", "alguno", "más", "barato?"], correctAnswer: "¿Tenés alguno más barato?", explanation: "The sentence uses the Argentine voseo form tenés.", points: 2, skillTag: "voseo" },
  { id: "arg-kiosco-reading-q5", type: "multiple-choice", prompt: "Why might someone ask “¿te llegó el pago?” after scanning a QR?", options: ["To confirm the seller received the digital payment", "To ask for a product recommendation", "To check phone credit", "To request change"], correctAnswer: "To confirm the seller received the digital payment", explanation: "Llegó refers to the payment appearing for the seller.", points: 1, skillTag: "payment" },
];

export const argentinianSpanishB1BuyingKioscoLateNightReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B1 Reading: Una Parada Nocturna en el Kiosco", subtitle: "A synced Spanish reading about late opening hours, alfajores, snack prices, voseo, phone top-ups, QR payments, and everyday kiosco culture.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "reading", "kiosco", "shopping"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: kioscoVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const argentinianSpanishB1BuyingKioscoLateNightQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian B1 Quiz: Buying at a Kiosco Late at Night", subtitle: "Test natural voseo, snack choices, prices, phone credit, QR payment, and relaxed Argentine reactions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "quiz", "kiosco"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Argentine phrases for a complete late-night kiosco visit.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-kiosco-quiz-q1", type: "multiple-choice", prompt: "You arrive near closing time. Which opener fits?", options: ["Buenas, ¿seguís abierto?", "¿Te llegó el pago?", "Me llevo este", "Es de Personal"], correctAnswer: "Buenas, ¿seguís abierto?", explanation: "Seguís is the voseo form and directly checks whether service continues.", points: 1, skillTag: "opening" },
      { id: "arg-kiosco-quiz-q2", type: "multiple-choice", prompt: "You want a small snack but have not chosen one. What do you ask?", options: ["¿Tenés algo para picar?", "¿Hacés recargas?", "¿Tenés cambio?", "¿Te paso el número?"], correctAnswer: "¿Tenés algo para picar?", explanation: "Picar refers to having a small snack.", points: 1, skillTag: "snack" },
      { id: "arg-kiosco-quiz-q3", type: "fill-blank", prompt: "Complete: Ando medio corto de _____.", nativePrompt: "I am a bit strapped for cash.", correctAnswer: "guita", explanation: "Guita is informal Argentine Spanish for money.", points: 1, skillTag: "money" },
      { id: "arg-kiosco-quiz-q4", type: "multiple-choice", prompt: "A product is beyond your budget. Which question asks for a cheaper option?", options: ["¿Tenés alguno más barato?", "¿Te quedan papas fritas?", "¿Me das una bolsita?", "¿Se acredita al toque?"], correctAnswer: "¿Tenés alguno más barato?", explanation: "This directly requests a lower-priced alternative.", points: 1, skillTag: "price" },
      { id: "arg-kiosco-quiz-q5", type: "true-false", prompt: "True or false: “mejor el paquete chico” can revise your original choice.", options: ["True", "False"], correctAnswer: "True", explanation: "Mejor frequently introduces a changed preference.", points: 1, skillTag: "choice" },
      { id: "arg-kiosco-quiz-q6", type: "multiple-choice", prompt: "Which phrase asks for a prepaid phone service?", options: ["¿Hacés recargas?", "¿Cuánto sale?", "¿Qué me recomendás?", "¿Tenés cambio?"], correctAnswer: "¿Hacés recargas?", explanation: "Recargas are prepaid phone top-ups.", points: 1, skillTag: "top-up" },
      { id: "arg-kiosco-quiz-q7", type: "order-words", prompt: "Order the top-up instruction.", nativePrompt: "Give me the number and tell me how much you want to top up.", wordBank: ["Pasame", "el", "número", "y", "decime", "cuánto", "querés", "cargar."], correctAnswer: "Pasame el número y decime cuánto querés cargar.", explanation: "Pasame, decime, and querés are voseo forms.", points: 2, skillTag: "voseo" },
      { id: "arg-kiosco-quiz-q8", type: "multiple-choice", prompt: "What does “¿se acredita al toque?” ask?", options: ["Whether the balance appears immediately", "Whether the shop accepts cash", "Whether the snack is fresh", "Whether the bag costs extra"], correctAnswer: "Whether the balance appears immediately", explanation: "Acreditarse describes the credit appearing; al toque means immediately.", points: 1, skillTag: "timing" },
      { id: "arg-kiosco-quiz-q9", type: "multiple-choice", prompt: "After scanning the shop’s QR, what can you ask the seller?", options: ["¿Te llegó el pago?", "¿Qué onda ese alfajor?", "¿Seguís abierto?", "¿Te quedan papas fritas?"], correctAnswer: "¿Te llegó el pago?", explanation: "It checks that the seller received the payment.", points: 1, skillTag: "payment" },
      { id: "arg-kiosco-quiz-q10", type: "multiple-choice", prompt: "Which phrase asks for a recommendation informally?", options: ["¿Qué me recomendás?", "No hay drama", "Me llevo este", "Me queda solo el paquete chico"], correctAnswer: "¿Qué me recomendás?", explanation: "Recomendás is the voseo form addressed to vos.", points: 1, skillTag: "recommendation" },
      { id: "arg-kiosco-quiz-q11", type: "true-false", prompt: "True or false: “no hay drama” reassures someone that the situation is not a problem.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a relaxed everyday reassurance.", points: 1, skillTag: "reaction" },
      { id: "arg-kiosco-quiz-q12", type: "multiple-choice", prompt: "You have several small purchases. What do you request?", options: ["¿Me das una bolsita?", "¿Te paso el número?", "¿Tenés alfajores?", "Me llevo ese"], correctAnswer: "¿Me das una bolsita?", explanation: "Bolsita is a small carrying bag.", points: 1, skillTag: "packing" },
      { id: "arg-kiosco-quiz-q13", type: "multiple-choice", prompt: "Which set contains only voseo forms from this lesson?", options: ["seguís, tenés, hacés, cargás", "sigues, tienes, haces, cargas", "siga, tenga, haga, cargue", "seguir, tener, hacer, cargar"], correctAnswer: "seguís, tenés, hacés, cargás", explanation: "These forms address vos in Rioplatense Spanish.", points: 1, skillTag: "voseo" },
    ],
  },
};
