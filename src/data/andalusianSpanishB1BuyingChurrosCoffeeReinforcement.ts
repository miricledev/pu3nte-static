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

const courseId = "andalusian-spanish-b1-buying-churros-coffee";
const sectionName = "Andalusian Spanish - B1 Buying Churros and Coffee";

const cafeVocab: VocabItem[] = [
  { id: "quedan-tejeringos", term: "Buenas, ¿te quedan tejeringos?", meaning: "Hi, have you got any churros left?", note: "A natural Málaga café opener using the local word tejeringos.", example: "Buenas, ¿te quedan tejeringos recién hechos?", translation: "Hi, have you got any freshly made Málaga-style churros left?" },
  { id: "ponme-cuatro", term: "Ponme cuatro, porfa", meaning: "I'll have four, please", note: "Ponme is direct but normal in a friendly café interaction.", example: "Ponme cuatro tejeringos, porfa.", translation: "I'll have four tejeringos, please." },
  { id: "haceis-momento", term: "¿Los hacéis al momento?", meaning: "Do you make them fresh to order?", note: "Al momento means prepared on the spot rather than waiting ready-made.", example: "¿Los hacéis al momento o ya están hechos?", translation: "Do you make them fresh to order, or are they already prepared?" },
  { id: "mitad-para-mi", term: "Un mitad para mí", meaning: "I'll have a half-coffee, half-milk coffee", note: "Un mitad belongs to Málaga's distinctive local coffee-ordering system.", example: "Un mitad para mí, sin azúcar.", translation: "A half-coffee, half-milk coffee for me, without sugar." },
  { id: "quiero-sombra", term: "Yo quiero un sombra", meaning: "I'll have a very milky coffee with a little coffee", note: "A Málaga sombra contains much more milk than coffee.", example: "Yo quiero un sombra bien caliente.", translation: "I'll have a very milky coffee, nice and hot." },
  { id: "chocolate-taza-question", term: "¿Tenéis chocolate a la taza?", meaning: "Do you have thick hot chocolate?", note: "Chocolate a la taza is thick drinking chocolate often served with churros.", example: "¿Tenéis chocolate a la taza para mojar los tejeringos?", translation: "Do you have thick hot chocolate for dipping the tejeringos?" },
  { id: "por-unidad-question", term: "¿Se piden por unidad?", meaning: "Do you order them individually?", note: "Por unidad asks whether each piece is priced or ordered separately.", example: "¿Se piden por unidad o por ración?", translation: "Do you order them individually or by the portion?" },
  { id: "cuantos-pillamos", term: "¿Cuántos pillamos?", meaning: "How many shall we grab?", note: "Pillar is informal Spain Spanish for getting or grabbing something.", example: "Somos tres; ¿cuántos pillamos?", translation: "There are three of us; how many shall we get?" },
  { id: "racion-compartir", term: "Mejor una ración para compartir", meaning: "Better get a portion to share", note: "A practical alternative to deciding individual quantities.", example: "En vez de seis sueltos, mejor una ración para compartir.", translation: "Instead of six separate ones, better get a portion to share." },
  { id: "sale-racion", term: "¿Cuánto sale la ración?", meaning: "How much is a portion?", note: "Salir is conversationally natural for asking the resulting price.", example: "¿Cuánto sale la ración de tejeringos?", translation: "How much is the portion of tejeringos?" },
  { id: "chocolate-aparte", term: "¿El chocolate va aparte?", meaning: "Is the hot chocolate charged separately?", note: "Ir aparte checks whether something is outside the listed price.", example: "¿El chocolate va aparte o entra con la ración?", translation: "Is the hot chocolate separate, or is it included with the portion?" },
  { id: "llevas-mesa", term: "¿Me lo llevas a la mesa?", meaning: "Can you bring it over to my table?", note: "Lo refers to the order already discussed.", example: "Cuando esté listo, ¿me lo llevas a la mesa?", translation: "When it's ready, can you bring it to my table?" },
  { id: "sitio-terraza", term: "¿Queda sitio en la terraza?", meaning: "Is there any room left on the terrace?", note: "Quedar sitio asks whether seating remains available.", example: "¿Queda sitio en la terraza para dos?", translation: "Is there room left on the terrace for two?" },
  { id: "todo-hasta-arriba", term: "Está todo hasta arriba", meaning: "The whole place is absolutely rammed", note: "Hasta arriba describes a completely full café or public space.", example: "Es domingo y está todo hasta arriba.", translation: "It's Sunday and the whole place is packed." },
  { id: "sentamos-dentro", term: "¿Nos sentamos dentro?", meaning: "Shall we sit inside?", note: "A natural alternative when the terrace has no room.", example: "No queda terraza; ¿nos sentamos dentro?", translation: "There is no terrace space; shall we sit inside?" },
  { id: "buena-pinta", term: "No veas qué buena pinta tienen", meaning: "Bloody hell, they look amazing!", note: "No veas intensifies tener buena pinta, meaning to look appealing.", example: "No veas qué buena pinta tienen esos tejeringos.", translation: "Those tejeringos look absolutely amazing." },
  { id: "de-lujo", term: "¡Están de lujo!", meaning: "They're absolutely brilliant!", note: "De lujo informally means excellent, not necessarily luxurious.", example: "Recién hechos y crujientes: ¡están de lujo!", translation: "Freshly made and crispy: they're fantastic!" },
  { id: "ojo-queman", term: "Ojo, que queman", meaning: "Careful, they're piping hot!", note: "Ojo, que... is a transferable warning pattern.", example: "No los cojas todavía; ojo, que queman.", translation: "Don't pick them up yet; careful, they're piping hot." },
  { id: "otros-dos-llevar", term: "¿Me pones otros dos para llevar?", meaning: "Can I get another two to take away?", note: "Otros dos adds two more to the existing order; para llevar means takeaway.", example: "Antes de pagar, ¿me pones otros dos para llevar?", translation: "Before I pay, can I get another two to take away?" },
  { id: "cobras-puedas", term: "¿Me cobras cuando puedas?", meaning: "Can you take my payment when you get a chance?", note: "Cuando puedas softens the request when staff are busy.", example: "Perdona, ¿me cobras cuando puedas?", translation: "Excuse me, can you take my payment when you get a chance?" },
  { id: "tarjeta", term: "¿Podemos pagar con tarjeta?", meaning: "Can we pay by card?", note: "A standard group payment question.", example: "¿Podemos pagar con tarjeta o solo en efectivo?", translation: "Can we pay by card or only in cash?" },
  { id: "justo-tiempo", term: "Voy justo de tiempo", meaning: "I'm a bit pushed for time", note: "Ir justo de algo means having little of it available.", example: "Voy justo de tiempo porque entro a trabajar a las diez.", translation: "I'm pushed for time because I start work at ten." },
  { id: "salen-ahora", term: "Sí, salen ahora", meaning: "Yeah, they're coming out fresh now", note: "Salen refers to a fresh batch coming out of the fryer or kitchen.", example: "¿Están recién hechos? Sí, salen ahora.", translation: "Are they freshly made? Yes, they're coming out now." },
  { id: "cuantos-os-pongo", term: "¿Cuántos os pongo?", meaning: "How many can I get you lot?", note: "Os addresses the whole group informally.", example: "Hay una tanda nueva; ¿cuántos os pongo?", translation: "There's a new batch; how many can I get you all?" },
  { id: "beber-os-pongo", term: "¿Y para beber qué os pongo?", meaning: "And what can I get you to drink?", note: "A natural server question after the food order.", example: "Ya tengo los tejeringos; ¿y para beber qué os pongo?", translation: "I've got the tejeringos; and what can I get you to drink?" },
  { id: "recien-hechos", term: "Recién hechos", meaning: "Freshly made", note: "Describes food prepared very recently.", example: "Los tejeringos están recién hechos.", translation: "The tejeringos are freshly made." },
  { id: "para-amiga", term: "Para mi amiga", meaning: "For my female friend", note: "A compact way to assign one item in a group order.", example: "Un sombra para mi amiga.", translation: "A very milky coffee for my friend." },
  { id: "para-compartir", term: "Para compartir", meaning: "To share", note: "Marks food intended for the whole table.", example: "Queremos una ración para compartir.", translation: "We want a portion to share." },
  { id: "para-llevar", term: "Para llevar", meaning: "To take away", note: "The standard Spain Spanish café expression for takeaway.", example: "Estos dos son para llevar.", translation: "These two are to take away." },
  { id: "al-momento", term: "Al momento", meaning: "Freshly made / On the spot", note: "Emphasizes preparation when the customer orders.", example: "Los hacemos al momento.", translation: "We make them fresh to order." },
  { id: "cuando-puedas", term: "Cuando puedas", meaning: "Whenever you get a chance", note: "A useful softener that removes urgency.", example: "Cuando puedas, nos traes la cuenta.", translation: "Whenever you get a chance, bring us the bill." },
  { id: "terraza-hasta-arriba", term: "La terraza está hasta arriba", meaning: "The terrace is absolutely packed", note: "A specific application of estar hasta arriba.", example: "Con este sol, la terraza está hasta arriba.", translation: "With this sunshine, the terrace is absolutely packed." },
  { id: "si-queda-sitio", term: "Si queda sitio", meaning: "If there's any space left", note: "A condition often used when requesting seating.", example: "Nos sentamos fuera, si queda sitio.", translation: "We'll sit outside if there is any space left." },
  { id: "porfa", term: "Porfa", meaning: "Please", note: "Casual shortening of por favor.", example: "Un mitad, porfa.", translation: "A mitad coffee, please." },
  { id: "tejeringos", term: "Tejeringos", meaning: "Málaga-style looped or spiral churros", note: "A strongly local Málaga breakfast word.", example: "Los tejeringos se sirven calientes y crujientes.", translation: "Málaga-style churros are served hot and crispy." },
  { id: "mitad", term: "Un mitad", meaning: "Málaga coffee with roughly half coffee and half milk", note: "The local coffee name is masculine: un mitad.", example: "Pido un mitad cada mañana.", translation: "I order a half-coffee, half-milk coffee every morning." },
  { id: "sombra", term: "Un sombra", meaning: "Málaga coffee with a little coffee and mostly milk", note: "A sombra is considerably milkier than a mitad.", example: "Si quieres poco café, pide un sombra.", translation: "If you want only a little coffee, order a sombra." },
  { id: "chocolate-taza", term: "Chocolate a la taza", meaning: "Thick drinking chocolate", note: "Often ordered for dipping churros or tejeringos.", example: "El chocolate a la taza viene muy espeso.", translation: "The drinking chocolate comes very thick." },
  { id: "racion", term: "Una ración", meaning: "A serving or portion", note: "One grouped quantity, often suitable for sharing.", example: "Una ración trae suficientes tejeringos para dos.", translation: "One portion brings enough tejeringos for two." },
  { id: "terraza", term: "La terraza", meaning: "Outdoor seating area", note: "A popular café area that can fill quickly in good weather.", example: "Desayunamos en la terraza al sol.", translation: "We have breakfast outside in the sun." },
  { id: "por-unidad", term: "Por unidad", meaning: "Individually / Per piece", note: "A pricing or ordering method based on each individual item.", example: "Los venden por unidad y por ración.", translation: "They sell them individually and by the portion." },
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

export const andalusianSpanishB1BuyingChurrosCoffeeFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Buying Churros and Coffee Flashcards", subtitle: "Order Málaga tejeringos, local coffee styles, thick chocolate, seating, takeaway, and payment using natural café language.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "Málaga", "coffee", "tejeringos"], estimatedMinutes: 22,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: cafeVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1BuyingChurrosCoffeeSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Tejeringos y Café Malagueño", subtitle: "Build a complete Málaga breakfast order from checking the fresh batch to paying and taking two more away.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "malaga-cafe"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Ask whether tejeringos remain and are made fresh, choose a quantity or shared portion, order local Málaga coffee and chocolate, find seating, react to the food, request takeaway, and pay politely despite being short on time.",
    stages: [
      stage("stage-1", "Check the fresh batch", sentenceVocab.slice(0, 3), sentenceVocab.slice(22, 31), "Hi, have you got any tejeringos left? Do you make them fresh to order?", "Buenas, ¿te quedan tejeringos? ¿Los hacéis al momento?", "The opening checks both availability and whether the food is prepared on demand.", breakdown([["hi", "Buenas"], ["have you got any tejeringos left?", "¿te quedan tejeringos?"], ["do you make them fresh to order?", "¿Los hacéis al momento?"]])),
      stage("stage-2", "Choose the amount", sentenceVocab.slice(1, 10), sentenceVocab.slice(23, 29), "How many shall we get? Better a portion to share. How much is the portion?", "¿Cuántos pillamos? Mejor una ración para compartir. ¿Cuánto sale la ración?", "The group moves from quantity to a shared order and then checks the price.", breakdown([["how many shall we get?", "¿Cuántos pillamos?"], ["better a portion", "Mejor una ración"], ["to share", "para compartir"], ["how much is the portion?", "¿Cuánto sale la ración?"]])),
      stage("stage-3", "Order Málaga coffee", sentenceVocab.slice(3, 6), sentenceVocab.slice(34, 38), "A mitad for me, and my friend wants a sombra. Do you have thick hot chocolate?", "Un mitad para mí y un sombra para mi amiga. ¿Tenéis chocolate a la taza?", "The full sentence gives the local coffee names enough context for natural pronunciation.", breakdown([["a mitad for me", "Un mitad para mí"], ["and a sombra", "y un sombra"], ["for my friend", "para mi amiga"], ["do you have thick hot chocolate?", "¿Tenéis chocolate a la taza?"]])),
      stage("stage-4", "Clarify the order", sentenceVocab.slice(6, 12), sentenceVocab.slice(38, 41), "Are they ordered individually? Is the chocolate separate? Can you bring it to my table?", "¿Se piden por unidad? ¿El chocolate va aparte? ¿Me lo llevas a la mesa?", "The questions clarify pricing, inclusion, and table service.", breakdown([["are they ordered individually?", "¿Se piden por unidad?"], ["is the chocolate separate?", "¿El chocolate va aparte?"], ["can you bring it to my table?", "¿Me lo llevas a la mesa?"]])),
      stage("stage-5", "Find somewhere to sit", sentenceVocab.slice(12, 15), sentenceVocab.slice(31, 34), "Is there space on the terrace? It's completely packed. Shall we sit inside?", "¿Queda sitio en la terraza? Está todo hasta arriba. ¿Nos sentamos dentro?", "The sequence checks outside seating, reacts to the crowd, and chooses the indoor alternative.", breakdown([["is there space on the terrace?", "¿Queda sitio en la terraza?"], ["everything is packed", "Está todo hasta arriba"], ["shall we sit inside?", "¿Nos sentamos dentro?"]])),
      stage("stage-6", "React to the tejeringos", sentenceVocab.slice(15, 18), sentenceVocab.slice(25, 27), "You wouldn't believe how good they look. They're brilliant. Careful, they're piping hot.", "No veas qué buena pinta tienen. ¡Están de lujo! Ojo, que queman.", "The stage combines an excited visual reaction, praise, and a practical warning.", breakdown([["they look amazing", "No veas qué buena pinta tienen"], ["they're brilliant", "¡Están de lujo!"], ["careful", "Ojo"], ["they're piping hot", "que queman"]])),
      stage("stage-7", "Add takeaway", sentenceVocab.slice(18, 19), sentenceVocab.slice(28, 30), "Can I get another two to take away? I'm short on time.", "¿Me pones otros dos para llevar? Voy justo de tiempo.", "Para llevar marks the new items as takeaway, while the second sentence explains the urgency.", breakdown([["can I get another two", "¿Me pones otros dos"], ["to take away", "para llevar?"], ["I'm short on time", "Voy justo de tiempo"]])),
      stage("stage-8", "Pay politely", sentenceVocab.slice(19, 22), sentenceVocab.slice(30, 34), "Can you take my payment when you get a chance? Can we pay by card?", "¿Me cobras cuando puedas? ¿Podemos pagar con tarjeta?", "Cuando puedas keeps the request polite despite the speaker's limited time.", breakdown([["can you take my payment", "¿Me cobras"], ["when you get a chance", "cuando puedas?"], ["can we pay", "¿Podemos pagar"], ["by card", "con tarjeta?"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "churros-story-q1", type: "multiple-choice", prompt: "What does the server say about the tejeringos?", options: ["A fresh batch is coming out now", "They sold out yesterday", "They are only frozen", "They are not served today"], correctAnswer: "A fresh batch is coming out now", explanation: "The response “Sí, salen ahora” confirms a fresh batch.", points: 1, skillTag: "freshness" },
  { id: "churros-story-q2", type: "multiple-choice", prompt: "How do Inés and Álvaro decide to order the tejeringos?", options: ["One shared portion", "One each only", "Ten takeaway portions", "They do not order any"], correctAnswer: "One shared portion", explanation: "They choose a ración para compartir instead of ordering by unit.", points: 1, skillTag: "quantity" },
  { id: "churros-story-q3", type: "multiple-choice", prompt: "Which drinks do they order?", options: ["A mitad, a sombra, and thick hot chocolate", "Two teas", "Only water", "Three black coffees"], correctAnswer: "A mitad, a sombra, and thick hot chocolate", explanation: "The order includes both Málaga coffee styles and chocolate for dipping.", points: 1, skillTag: "drinks" },
  { id: "churros-story-q4", type: "true-false", prompt: "True or false: They find an available table on the terrace.", options: ["True", "False"], correctAnswer: "False", explanation: "The terrace is packed, so they sit inside.", points: 1, skillTag: "seating" },
  { id: "churros-story-q5", type: "multiple-choice", prompt: "What warning follows their enthusiastic reaction?", options: ["The tejeringos are piping hot", "The coffee is cold", "The table is reserved", "The café is closing"], correctAnswer: "The tejeringos are piping hot", explanation: "After praising their appearance, Álvaro warns “Ojo, que queman.”", points: 1, skillTag: "warning" },
  { id: "churros-story-q6", type: "multiple-choice", prompt: "Why does Álvaro request takeaway tejeringos?", options: ["He wants two for later and is short on time", "The café refuses table service", "Inés dislikes them", "The chocolate is unavailable"], correctAnswer: "He wants two for later and is short on time", explanation: "He adds two takeaway items and explains his time pressure.", points: 1, skillTag: "takeaway" },
  { id: "churros-story-q7", type: "true-false", prompt: "True or false: The chocolate is included free with the tejeringo portion.", options: ["True", "False"], correctAnswer: "False", explanation: "They learn that the chocolate is charged separately.", points: 1, skillTag: "price" },
  { id: "churros-story-q8", type: "multiple-choice", prompt: "How will they pay?", options: ["By card", "With a voucher", "One person leaves without paying", "Only in coins"], correctAnswer: "By card", explanation: "The café accepts their requested card payment.", points: 1, skillTag: "payment" },
  { id: "churros-story-q9", type: "multiple-choice", prompt: "What does Inés say about the Málaga coffee system?", options: ["The mitad and sombra make sense now", "It is impossible to understand", "Both drinks are identical", "She ordered the wrong café"], correctAnswer: "The mitad and sombra make sense now", explanation: "Tasting both helps her understand the local coffee ratios.", points: 1, skillTag: "culture" },
  { id: "churros-story-q10", type: "multiple-choice", prompt: "How does the breakfast end?", options: ["They pay, take two tejeringos away, and leave on time", "They order another full meal", "They move to the terrace", "They miss work"], correctAnswer: "They pay, take two tejeringos away, and leave on time", explanation: "The final messages resolve the payment, takeaway order, and time pressure.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1BuyingChurrosCoffeeWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: La Última Tanda de Tejeringos", subtitle: "Inés and Álvaro catch a fresh batch, decode Málaga coffee names, handle a packed terrace, add takeaway, and pay before work.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "Málaga", "café"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "ines", name: "Inés", initials: "I", side: "right", color: "blue" },
      { id: "alvaro", name: "Álvaro", initials: "Á", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "ines", "Buenas, ¿te quedan tejeringos?", "Hi, have you got any tejeringos left?", ["Buenas, ¿te quedan tejeringos?", "Tejeringos"]),
      message("m2", "alvaro", "Y una cosa: ¿los hacéis al momento?", "And one thing: do you make them fresh to order?", ["¿Los hacéis al momento?", "Al momento"]),
      message("m3", "ines", "Sí, salen ahora. Esta tanda está recién hecha.", "Yes, they're coming out now. This batch is freshly made.", ["Sí, salen ahora", "Recién hechos"], "voice-note"),
      message("m4", "alvaro", "Perfecto. ¿Se piden por unidad?", "Perfect. Do you order them individually?", ["¿Se piden por unidad?", "Por unidad"]),
      message("m5", "ines", "También hay raciones. Somos dos, ¿cuántos pillamos?", "There are portions too. There are two of us; how many shall we get?", ["Una ración", "¿Cuántos pillamos?"]),
      message("m6", "alvaro", "Mejor una ración para compartir. Ponla, porfa.", "Better get a portion to share. Order it, please.", ["Mejor una ración para compartir", "Para compartir", "Porfa"], "voice-note"),
      message("m7", "ines", "¿Y para beber qué os pongo?", "And what can I get you to drink?", ["¿Y para beber qué os pongo?"]),
      message("m8", "alvaro", "Un mitad para mí y un sombra para mi amiga.", "A mitad for me and a sombra for my friend.", ["Un mitad para mí", "Un mitad", "Yo quiero un sombra", "Un sombra", "Para mi amiga"]),
      message("m9", "ines", "Y ¿tenéis chocolate a la taza? Queremos mojar algunos.", "And do you have thick hot chocolate? We want to dip some.", ["¿Tenéis chocolate a la taza?", "Chocolate a la taza"]),
      message("m10", "alvaro", "¿Queda sitio en la terraza, si queda alguna mesa?", "Is there space on the terrace, if any table remains?", ["¿Queda sitio en la terraza?", "La terraza", "Si queda sitio"]),
      message("m11", "ines", "Qué va, la terraza está hasta arriba.", "No way, the terrace is absolutely packed.", ["La terraza está hasta arriba", "Está todo hasta arriba"]),
      message("m12", "alvaro", "Entonces, ¿nos sentamos dentro? ¿Me lo llevas a la mesa?", "Then shall we sit inside? Can you bring it to my table?", ["¿Nos sentamos dentro?", "¿Me lo llevas a la mesa?"], "voice-note"),
      message("m13", "ines", "Ya vienen. No veas qué buena pinta tienen.", "They're coming now. You wouldn't believe how good they look.", ["No veas qué buena pinta tienen"]),
      message("m14", "alvaro", "He probado uno: ¡están de lujo!", "I've tried one: they're absolutely brilliant!", ["¡Están de lujo!"]),
      message("m15", "ines", "Espera un segundo. Ojo, que queman muchísimo.", "Wait a second. Careful, they're extremely hot.", ["Ojo, que queman"]),
      message("m16", "alvaro", "Me llevaría algunos después. ¿Me pones otros dos para llevar?", "I'd take some away afterwards. Can I get another two to take away?", ["¿Me pones otros dos para llevar?", "Para llevar"]),
      message("m17", "ines", "Claro. Los preparo aparte para que no se mezclen.", "Of course. I'll prepare them separately so they don't get mixed up.", []),
      message("m18", "alvaro", "Gracias. Voy justo de tiempo porque luego entro a trabajar.", "Thanks. I'm short on time because I start work afterwards.", ["Voy justo de tiempo"], "voice-note"),
      message("m19", "ines", "Por cierto, ¿cuánto sale la ración?", "By the way, how much is the portion?", ["¿Cuánto sale la ración?", "Una ración"]),
      message("m20", "alvaro", "La ración son seis euros. ¿El chocolate va aparte?", "The portion is six euros. Is the hot chocolate separate?", ["¿El chocolate va aparte?", "Chocolate a la taza"]),
      message("m21", "ines", "Sí, el chocolate se cobra aparte; son tres euros más.", "Yes, the chocolate is charged separately; it's three euros more.", []),
      message("m22", "alvaro", "Vale. ¿Me cobras cuando puedas?", "Okay. Can you take my payment when you get a chance?", ["¿Me cobras cuando puedas?", "Cuando puedas"]),
      message("m23", "ines", "Claro. ¿Vais a pagar juntos o por separado?", "Of course. Are you paying together or separately?", []),
      message("m24", "alvaro", "Juntos. ¿Podemos pagar con tarjeta?", "Together. Can we pay by card?", ["¿Podemos pagar con tarjeta?"], "voice-note"),
      message("m25", "ines", "Sí, sin problema. Mientras tanto, terminad el chocolate.", "Yes, no problem. Meanwhile, finish the chocolate.", ["Chocolate a la taza"]),
      message("m26", "alvaro", "Ahora entiendo el sistema: el mitad tiene más café que el sombra.", "Now I understand the system: the mitad has more coffee than the sombra.", ["Un mitad", "Un sombra"]),
      message("m27", "ines", "Exacto. Para mi gusto, el sombra es más suave.", "Exactly. For my taste, the sombra is milder.", ["Un sombra"]),
      message("m28", "alvaro", "Listo, tarjeta aceptada. ¿Están preparados los dos para llevar?", "Done, card accepted. Are the two takeaway ones ready?", ["Para llevar"]),
      message("m29", "ines", "Sí, aquí los tienes, recién hechos y bien envueltos.", "Yes, here you are, freshly made and well wrapped.", ["Recién hechos"]),
      message("m30", "alvaro", "Perfecto: desayuno terminado, tejeringos para después y llego a tiempo al trabajo.", "Perfect: breakfast finished, tejeringos for later, and I'll get to work on time.", ["Tejeringos", "Voy justo de tiempo"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-churros-coffee-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: cafeVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: cafeVocab.map((item) => item.term),
      grammarPatterns: ["Vosotros service language with hacéis, tenéis, os pongo and podéis.", "Natural requests with ponme, me lo llevas and me cobras.", "Polite softening with porfa and cuando puedas."],
      speakingPrompts: ["Check whether tejeringos remain and are freshly made.", "Order a shared portion, a mitad, a sombra, and chocolate.", "Find seating and react to the fresh food.", "Add takeaway items and pay politely while short on time."],
    },
    completionTask: { title: "Order a Málaga breakfast", instructions: "Record a 75-second café interaction. Ask for fresh tejeringos, choose a quantity, order two local coffees and chocolate, ask about seating, react to the food, add takeaway, and pay." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Málaga, un desayuno local puede empezar con “Buenas, ¿te quedan tejeringos?”. Los “tejeringos” son churros de forma enlazada o espiral. La pregunta “¿los hacéis al momento?” comprueba si se preparan cuando llega el pedido. Si la respuesta es “sí, salen ahora”, la nueva tanda está “recién hecha”.", translation: "A Málaga breakfast can begin by checking whether local tejeringos remain and whether a fresh batch is being made now.", highlights: highlights(["Buenas, ¿te quedan tejeringos?", "Tejeringos", "¿Los hacéis al momento?", "Al momento", "Sí, salen ahora", "Recién hechos"]), shadowLine: "Buenas, ¿te quedan tejeringos? ¿Los hacéis al momento?" },
  { id: "p2", text: "Para elegir la cantidad, “¿se piden por unidad?” pregunta si cada pieza se vende separada. El grupo también puede decir “¿cuántos pillamos?”. Si no quiere calcular uno por uno, “mejor una ración para compartir” resuelve el pedido, y “¿cuánto sale la ración?” comprueba el precio.", translation: "Customers can order by the piece or choose one shared portion and check its price.", highlights: highlights(["¿Se piden por unidad?", "Por unidad", "¿Cuántos pillamos?", "Mejor una ración para compartir", "Una ración", "Para compartir", "¿Cuánto sale la ración?"]), shadowLine: "Mejor una ración para compartir. ¿Cuánto sale la ración?" },
  { id: "p3", text: "El café malagueño tiene nombres propios. “Un mitad para mí” pide una mezcla aproximada de mitad café y mitad leche. “Yo quiero un sombra” pide mucha leche y poco café. Tanto “un mitad” como “un sombra” son nombres locales, por lo que no funcionan igual en todas las ciudades españolas.", translation: "Málaga's local coffee system distinguishes a roughly half-and-half mitad from the milkier sombra.", highlights: highlights(["Un mitad para mí", "Un mitad", "Yo quiero un sombra", "Un sombra"]), shadowLine: "Un mitad para mí y un sombra para mi amiga." },
  { id: "p4", text: "“¿Tenéis chocolate a la taza?” añade una bebida espesa para mojar los tejeringos. Antes de pedirla conviene preguntar “¿el chocolate va aparte?”, porque puede cobrarse fuera del precio de la ración. “¿Y para beber qué os pongo?” es la pregunta natural del personal al terminar el pedido de comida.", translation: "Thick drinking chocolate may be charged separately, and the server asks what the group wants to drink.", highlights: highlights(["¿Tenéis chocolate a la taza?", "Chocolate a la taza", "¿El chocolate va aparte?", "¿Y para beber qué os pongo?"]), shadowLine: "¿Tenéis chocolate a la taza? ¿El chocolate va aparte?" },
  { id: "p5", text: "El buen tiempo llena las mesas exteriores. “¿Queda sitio en la terraza?” pregunta por una mesa fuera. Si “la terraza está hasta arriba”, “¿nos sentamos dentro?” ofrece la alternativa. Después, “¿me lo llevas a la mesa?” confirma que el pedido llegará al lugar elegido.", translation: "When the terrace is packed, the group sits inside and asks for the order to be brought to the table.", highlights: highlights(["¿Queda sitio en la terraza?", "La terraza", "La terraza está hasta arriba", "Está todo hasta arriba", "¿Nos sentamos dentro?", "¿Me lo llevas a la mesa?"]), shadowLine: "¿Queda sitio en la terraza? Si no, ¿nos sentamos dentro?" },
  { id: "p6", text: "Al llegar la comida, “no veas qué buena pinta tienen” expresa entusiasmo por su aspecto. Después de probarlos, “¡están de lujo!” los elogia con fuerza. Sin embargo, si acaban de salir, “ojo, que queman” recuerda que hay que esperar antes de cogerlos o morderlos.", translation: "The group praises how the fresh tejeringos look and taste, but warns that they are piping hot.", highlights: highlights(["No veas qué buena pinta tienen", "¡Están de lujo!", "Ojo, que queman"]), shadowLine: "No veas qué buena pinta tienen. Ojo, que queman." },
  { id: "p7", text: "Para añadir comida después, “¿me pones otros dos para llevar?” pide dos unidades más en formato “para llevar”. Esta opción ayuda a quien dice “voy justo de tiempo” y no puede quedarse mucho. El personal puede envolverlos mientras la persona termina su café.", translation: "A customer who is short on time can request two additional tejeringos to take away.", highlights: highlights(["¿Me pones otros dos para llevar?", "Para llevar", "Voy justo de tiempo"]), shadowLine: "¿Me pones otros dos para llevar? Voy justo de tiempo." },
  { id: "p8", text: "Al final, “¿me cobras cuando puedas?” solicita la cuenta sin exigir atención inmediata. “Cuando puedas” suaviza la petición incluso si el cliente tiene prisa. Por último, “¿podemos pagar con tarjeta?” confirma el método de pago y cierra un desayuno típicamente malagueño.", translation: "The final phrases request payment politely and confirm whether the group may pay by card.", highlights: highlights(["¿Me cobras cuando puedas?", "Cuando puedas", "¿Podemos pagar con tarjeta?"]), shadowLine: "¿Me cobras cuando puedas? ¿Podemos pagar con tarjeta?" },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "churros-reading-q1", type: "multiple-choice", prompt: "What are tejeringos?", options: ["Málaga-style looped or spiral churros", "A type of coffee", "Outdoor café tables", "A card payment"], correctAnswer: "Málaga-style looped or spiral churros", explanation: "They are a specifically local churro style associated with Málaga.", points: 1, skillTag: "culture" },
  { id: "churros-reading-q2", type: "multiple-choice", prompt: "Which Málaga coffee contains more milk?", options: ["Un sombra", "Un mitad", "Both contain no milk", "Chocolate a la taza"], correctAnswer: "Un sombra", explanation: "A sombra contains little coffee and mostly milk.", points: 1, skillTag: "coffee" },
  { id: "churros-reading-q3", type: "true-false", prompt: "True or false: “al momento” means prepared fresh when ordered.", options: ["True", "False"], correctAnswer: "True", explanation: "It emphasizes on-the-spot preparation.", points: 1, skillTag: "freshness" },
  { id: "churros-reading-q4", type: "order-words", prompt: "Order the polite payment request.", nativePrompt: "Can you take my payment when you get a chance?", wordBank: ["¿Me", "cobras", "cuando", "puedas?"], correctAnswer: "¿Me cobras cuando puedas?", explanation: "Cuando puedas softens the request.", points: 2, skillTag: "payment" },
  { id: "churros-reading-q5", type: "multiple-choice", prompt: "What does “de lujo” mean informally here?", options: ["Excellent", "Too expensive", "Very cold", "Sold out"], correctAnswer: "Excellent", explanation: "It enthusiastically praises the food.", points: 1, skillTag: "reaction" },
];

export const andalusianSpanishB1BuyingChurrosCoffeeReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Tejeringos, Mitad y Sombra", subtitle: "A synced Spanish reading about Málaga churros, local coffee ratios, fresh preparation, shared portions, seating, reactions, takeaway, and payment.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "Málaga", "coffee"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: cafeVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1BuyingChurrosCoffeeQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Buying Churros and Coffee", subtitle: "Test Málaga tejeringos, local coffee names, fresh orders, seating, food reactions, takeaway, and payment language.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "Málaga", "café"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for a Málaga breakfast of tejeringos, coffee, and chocolate.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "churros-quiz-q1", type: "multiple-choice", prompt: "Which opener checks whether Málaga-style churros remain?", options: ["Buenas, ¿te quedan tejeringos?", "¿Podemos pagar con tarjeta?", "¿Nos sentamos dentro?", "Voy justo de tiempo"], correctAnswer: "Buenas, ¿te quedan tejeringos?", explanation: "Tejeringos is the local Málaga word central to the order.", points: 1, skillTag: "ordering" },
      { id: "churros-quiz-q2", type: "multiple-choice", prompt: "How do you ask whether they are made fresh to order?", options: ["¿Los hacéis al momento?", "¿Se piden por unidad?", "¿Cuánto sale la ración?", "¿Queda sitio en la terraza?"], correctAnswer: "¿Los hacéis al momento?", explanation: "Al momento means prepared on the spot.", points: 1, skillTag: "freshness" },
      { id: "churros-quiz-q3", type: "order-words", prompt: "Order the shared-portion suggestion.", nativePrompt: "Better get a portion to share.", wordBank: ["Mejor", "una", "ración", "para", "compartir."], correctAnswer: "Mejor una ración para compartir.", explanation: "The phrase chooses one grouped order for the table.", points: 2, skillTag: "quantity" },
      { id: "churros-quiz-q4", type: "multiple-choice", prompt: "Which Málaga coffee is roughly half coffee and half milk?", options: ["Un mitad", "Un sombra", "Chocolate a la taza", "Un té"], correctAnswer: "Un mitad", explanation: "Mitad names the roughly equal coffee-and-milk ratio.", points: 1, skillTag: "coffee" },
      { id: "churros-quiz-q5", type: "true-false", prompt: "True or false: A sombra normally contains more coffee than a mitad.", options: ["True", "False"], correctAnswer: "False", explanation: "A sombra contains less coffee and more milk.", points: 1, skillTag: "coffee" },
      { id: "churros-quiz-q6", type: "multiple-choice", prompt: "The terrace is packed. What alternative do you suggest?", options: ["¿Nos sentamos dentro?", "¿El chocolate va aparte?", "Ponme cuatro, porfa", "Ojo, que queman"], correctAnswer: "¿Nos sentamos dentro?", explanation: "It proposes indoor seating when no terrace space remains.", points: 1, skillTag: "seating" },
      { id: "churros-quiz-q7", type: "multiple-choice", prompt: "Which phrase strongly praises how the tejeringos look?", options: ["No veas qué buena pinta tienen", "Voy justo de tiempo", "¿Cuántos os pongo?", "Para llevar"], correctAnswer: "No veas qué buena pinta tienen", explanation: "Tener buena pinta means looking appealing, intensified by no veas.", points: 1, skillTag: "reaction" },
      { id: "churros-quiz-q8", type: "multiple-choice", prompt: "What warning should you give about food straight from the fryer?", options: ["Ojo, que queman", "Están de lujo", "Cuando puedas", "Si queda sitio"], correctAnswer: "Ojo, que queman", explanation: "It warns that the food is piping hot.", points: 1, skillTag: "warning" },
      { id: "churros-quiz-q9", type: "multiple-choice", prompt: "Which request adds two takeaway items?", options: ["¿Me pones otros dos para llevar?", "¿Cuánto sale la ración?", "¿Me lo llevas a la mesa?", "¿Cuántos pillamos?"], correctAnswer: "¿Me pones otros dos para llevar?", explanation: "Otros dos adds two more, marked for takeaway.", points: 1, skillTag: "takeaway" },
      { id: "churros-quiz-q10", type: "true-false", prompt: "True or false: “cuando puedas” makes a payment request less demanding.", options: ["True", "False"], correctAnswer: "True", explanation: "It tells the server there is no need to respond immediately.", points: 1, skillTag: "politeness" },
      { id: "churros-quiz-q11", type: "multiple-choice", prompt: "What does “voy justo de tiempo” communicate?", options: ["I do not have much time", "I have no money", "I am very hungry", "I want an exact coffee ratio"], correctAnswer: "I do not have much time", explanation: "Ir justo de tiempo means being pushed for time.", points: 1, skillTag: "timing" },
      { id: "churros-quiz-q12", type: "match-pairs", prompt: "Match each Málaga item to its description.", pairs: [{ left: "Tejeringos", right: "Málaga-style churros" }, { left: "Un mitad", right: "Half coffee and half milk" }, { left: "Un sombra", right: "Mostly milk with a little coffee" }], explanation: "These three names are central to a local Málaga breakfast.", points: 3, skillTag: "culture" },
      { id: "churros-quiz-q13", type: "match-pairs", prompt: "Match each phrase to its function.", pairs: [{ left: "¿Se piden por unidad?", right: "Clarify quantity format" }, { left: "¿El chocolate va aparte?", right: "Clarify an extra charge" }, { left: "¿Podemos pagar con tarjeta?", right: "Confirm payment method" }], explanation: "The questions clarify how the order is sold, priced, and paid.", points: 3, skillTag: "functions" },
    ],
  },
};
