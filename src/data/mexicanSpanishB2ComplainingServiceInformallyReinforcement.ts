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

const courseId = "mexican-spanish-b2-complaining-about-service-informally";
const skoolSectionName = "Mexican Spanish - B2 Complaining about Service Informally";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const serviceVocab: VocabItem[] = [
  { id: "que-onda-con-el-servicio", term: "¿qué onda con el servicio?", meaning: "what’s going on with the service?", matchingMeaning: "what’s going on with the service?", note: "Informal complaint opener; useful with friends or casual support.", example: "¿Qué onda con el servicio? Nadie contesta.", translation: "What’s going on with the service? Nobody is answering.", starred: true },
  { id: "se-tardaron-un-buen", term: "se tardaron un buen", meaning: "they took forever / they took a long time", matchingMeaning: "they took forever", note: "Mexican informal way to say the wait was long.", example: "Se tardaron un buen en traer la comida.", translation: "They took forever to bring the food.", starred: true },
  { id: "un-buen", term: "un buen", meaning: "a lot / quite a while", matchingMeaning: "a lot / quite a while", note: "Very common intensifier in Mexico.", example: "Esperamos un buen afuera.", translation: "We waited quite a while outside.", starred: true },
  { id: "me-dejaron-esperando", term: "me dejaron esperando", meaning: "they left me waiting", matchingMeaning: "they left me waiting", note: "Useful when service promises a time and does not show up.", example: "Me dejaron esperando desde las seis.", translation: "They left me waiting since six.", starred: true },
  { id: "nomas-no-llegaba", term: "nomás no llegaba", meaning: "it just wasn’t arriving", matchingMeaning: "it just wasn’t arriving", note: "Shows frustration after repeated waiting.", example: "El pedido nomás no llegaba.", translation: "The order just wasn’t arriving.", starred: true },
  { id: "segun-llegaba-a-las-seis", term: "según llegaba a las seis", meaning: "supposedly it was arriving at six", matchingMeaning: "supposedly arriving at six", note: "Según adds doubt or contrast with what actually happened.", example: "Según llegaba a las seis y apareció a las ocho.", translation: "Supposedly it was arriving at six and it showed up at eight.", starred: true },
  { id: "me-quedaron-mal-con-el-pedido", term: "me quedaron mal con el pedido", meaning: "they let me down with the order / failed to deliver what they promised", matchingMeaning: "they let me down with the order", note: "Core phrase for failed service or broken promise.", example: "Me quedaron mal con el pedido otra vez.", translation: "They let me down with the order again.", starred: true },
  { id: "quedarle-mal-a-alguien", term: "quedarle mal a alguien", meaning: "to let someone down", matchingMeaning: "let someone down", note: "General phrase for failing someone socially or practically.", example: "No me gusta quedarle mal al cliente.", translation: "I don’t like letting the client down.", starred: true },
  { id: "a-la-mera-hora", term: "a la mera hora", meaning: "at the last minute / when the moment came", matchingMeaning: "at the last minute", note: "Common Mexican phrase for a late change or failure.", example: "A la mera hora cancelaron la entrega.", translation: "At the last minute they canceled the delivery.", starred: true },
  { id: "se-hicieron-bolas", term: "se hicieron bolas", meaning: "they got confused / mixed things up", matchingMeaning: "they got confused", note: "Informal way to describe service confusion.", example: "Se hicieron bolas con la dirección.", translation: "They got confused with the address.", starred: true },
  { id: "hacerse-bolas", term: "hacerse bolas", meaning: "to get confused / get things mixed up", matchingMeaning: "get things mixed up", note: "Can describe a person, team, or company mixing details.", example: "No te hagas bolas con los números.", translation: "Don’t get confused with the numbers.", starred: true },
  { id: "me-trajeron-otra-cosa", term: "me trajeron otra cosa", meaning: "they brought me something else", matchingMeaning: "they brought me something else", note: "Simple service complaint for incorrect items.", example: "Pedí enchiladas y me trajeron otra cosa.", translation: "I ordered enchiladas and they brought me something else.", starred: true },
  { id: "faltaba-la-mitad", term: "faltaba la mitad del pedido", meaning: "half the order was missing", matchingMeaning: "half the order was missing", note: "Concrete complaint detail.", example: "Cuando abrí la bolsa, faltaba la mitad del pedido.", translation: "When I opened the bag, half the order was missing.", starred: true },
  { id: "me-cobraron-de-mas", term: "me cobraron de más", meaning: "they overcharged me", matchingMeaning: "they overcharged me", note: "Useful for prices, receipts, and delivery apps.", example: "Me cobraron de más por la salsa.", translation: "They overcharged me for the sauce.", starred: true },
  { id: "se-pasaron-con-el-precio", term: "se pasaron con el precio", meaning: "they went too far with the price", matchingMeaning: "they went too far with the price", note: "Informal but strong price complaint.", example: "Se pasaron con el precio de envío.", translation: "They went too far with the delivery price.", starred: true },
  { id: "esta-carisimo", term: "está carísimo para lo que es", meaning: "it’s way too expensive for what it is", matchingMeaning: "too expensive for what it is", note: "Natural value-for-money complaint.", example: "Está carísimo para lo que es.", translation: "It’s way too expensive for what it is.", starred: true },
  { id: "no-se-vale", term: "no se vale", meaning: "that’s not fair / that’s not okay", matchingMeaning: "that’s not fair", note: "Clear but not too formal way to object.", example: "No se vale que cobren doble.", translation: "It’s not fair that they charge double.", starred: true },
  { id: "que-mal-plan", term: "qué mal plan", meaning: "that sucks / that’s really disappointing / bad move", matchingMeaning: "that’s disappointing", note: "Casual reaction to bad treatment.", example: "Qué mal plan que ni avisaron.", translation: "That sucks that they didn’t even let us know.", starred: true },
  { id: "me-dieron-largas", term: "me dieron largas", meaning: "they kept stalling me / gave me the runaround", matchingMeaning: "they kept stalling me", note: "Common phrase for repeated delays and excuses.", example: "Me dieron largas toda la tarde.", translation: "They kept stalling me all afternoon.", starred: true },
  { id: "dar-largas", term: "dar largas", meaning: "to stall someone / keep delaying", matchingMeaning: "stall someone", note: "Useful when support avoids resolving the issue.", example: "No me des largas; dime cuándo llega.", translation: "Don’t stall me; tell me when it arrives.", starred: true },
  { id: "me-traen-a-vuelta-y-vuelta", term: "me traen a vuelta y vuelta", meaning: "they keep sending me back and forth", matchingMeaning: "they keep sending me back and forth", note: "Describes being passed between people or steps.", example: "Me traen a vuelta y vuelta entre soporte y la tienda.", translation: "They keep sending me back and forth between support and the store.", starred: true },
  { id: "ni-sus-luces", term: "ni sus luces", meaning: "still no sign of them / it hasn’t shown up at all", matchingMeaning: "still no sign of it", note: "Mexican idiom for something or someone not appearing.", example: "El repartidor, ni sus luces.", translation: "The delivery driver? Still no sign of him.", starred: true },
  { id: "no-quiero-hacerla-de-tos", term: "no quiero hacerla de tos, pero…", meaning: "I don’t want to make a fuss, but…", matchingMeaning: "I don’t want to make a fuss, but", note: "Softens a complaint before stating the issue.", example: "No quiero hacerla de tos, pero faltan dos cosas.", translation: "I don’t want to make a fuss, but two things are missing.", starred: true },
  { id: "hacerla-de-tos", term: "hacerla de tos", meaning: "to make a fuss / make an issue out of something", matchingMeaning: "make a fuss", note: "Informal, less vulgar than hacerla de pedo.", example: "No quiero hacerla de tos por nada.", translation: "I don’t want to make a fuss over nothing.", starred: true },
  { id: "me-echas-la-mano", term: "¿me echas la mano con esto?", meaning: "can you give me a hand with this?", matchingMeaning: "can you give me a hand?", note: "Friendly support request, not aggressive.", example: "¿Me echas la mano con esto, porfa?", translation: "Can you give me a hand with this, please?", starred: true },
  { id: "echar-la-mano", term: "echar la mano", meaning: "to help / give someone a hand", matchingMeaning: "help someone", note: "Very common Mexican help phrase.", example: "Gracias por echarme la mano.", translation: "Thanks for giving me a hand.", starred: true },
  { id: "a-ver-si-me-lo-pueden-resolver", term: "a ver si me lo pueden resolver", meaning: "let’s see if you can sort this out for me", matchingMeaning: "see if you can sort this out", note: "Informal but service-appropriate request.", example: "A ver si me lo pueden resolver hoy.", translation: "Let’s see if you can sort this out for me today.", starred: true },
  { id: "con-que-me-lo-cambien", term: "con que me lo cambien, está bien", meaning: "if you just replace it for me, that’s fine", matchingMeaning: "if you replace it, that’s fine", note: "Shows a clear, reasonable desired solution.", example: "Con que me lo cambien, está bien.", translation: "If you just replace it for me, that’s fine.", starred: true },
  { id: "porfa", term: "porfa", meaning: "please, casually", matchingMeaning: "please", note: "Casual shortening of por favor.", example: "Revísalo, porfa.", translation: "Check it, please.", starred: true },
];

const highlightMap = Object.fromEntries(serviceVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: "hard",
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

const sentenceVocab = serviceVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB2ComplainingServiceInformallyFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B2: Complaining about Service Informally Flashcards",
  subtitle: "Informal Mexican phrases for delays, wrong orders, overcharging, runarounds, and asking for a fair fix.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "flashcards", "service", "complaints"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: serviceVocab.map(cardFromVocab) },
};

export const mexicanSpanishB2ComplainingServiceInformallySentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Mexican Service Complaints",
  subtitle: "Build informal but controlled Mexican complaints about delays, missing items, pricing, and getting help.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "sentence-builder", "complaints", "service"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note complaining about bad service while staying polite enough to get the issue solved.",
    stages: [
      stage("stage-1", "Open the complaint", sentenceVocab.slice(0, 6), sentenceVocab.slice(0, 6), "What’s going on with the service? They took forever and left me waiting.", "¿Qué onda con el servicio? Se tardaron un buen y me dejaron esperando.", "This opens the complaint informally but clearly.", breakdown([["what’s going on with the service?", "¿qué onda con el servicio?"], ["they took forever", "se tardaron un buen"], ["left me waiting", "me dejaron esperando"]])),
      stage("stage-2", "Say it never arrived", sentenceVocab.slice(4, 8), sentenceVocab.slice(0, 8), "Supposedly it was arriving at six, but it just wasn’t arriving.", "Según llegaba a las seis, pero nomás no llegaba.", "Según shows the promised time versus what happened.", breakdown([["supposedly", "según"], ["was arriving at six", "llegaba a las seis"], ["just wasn’t arriving", "nomás no llegaba"]])),
      stage("stage-3", "Broken promise", sentenceVocab.slice(6, 11), sentenceVocab.slice(0, 11), "They let me down with the order and, at the last minute, they got confused.", "Me quedaron mal con el pedido y, a la mera hora, se hicieron bolas.", "This names the failed promise and the last-minute confusion.", breakdown([["let me down with the order", "me quedaron mal con el pedido"], ["at the last minute", "a la mera hora"], ["got confused", "se hicieron bolas"]])),
      stage("stage-4", "Wrong and missing items", sentenceVocab.slice(11, 14), sentenceVocab.slice(0, 14), "They brought me something else and half the order was missing.", "Me trajeron otra cosa y faltaba la mitad del pedido.", "This gives specific, concrete complaint details.", breakdown([["brought me something else", "me trajeron otra cosa"], ["half was missing", "faltaba la mitad"], ["of the order", "del pedido"]])),
      stage("stage-5", "Price complaint", sentenceVocab.slice(13, 18), sentenceVocab.slice(0, 18), "They overcharged me; they went too far with the price. That’s not fair.", "Me cobraron de más; se pasaron con el precio. No se vale.", "This complains about price without losing control.", breakdown([["overcharged me", "me cobraron de más"], ["went too far with the price", "se pasaron con el precio"], ["that’s not fair", "no se vale"]])),
      stage("stage-6", "Runaround", sentenceVocab.slice(18, 22), sentenceVocab.slice(0, 22), "They kept stalling me and sending me back and forth. Still no sign of them.", "Me dieron largas y me traen a vuelta y vuelta. Ni sus luces.", "This describes the frustrating support loop.", breakdown([["kept stalling me", "me dieron largas"], ["sending me back and forth", "me traen a vuelta y vuelta"], ["still no sign", "ni sus luces"]])),
      stage("stage-7", "Soft but firm ask", sentenceVocab.slice(22, 27), sentenceVocab.slice(0, 27), "I don’t want to make a fuss, but can you give me a hand with this?", "No quiero hacerla de tos, pero ¿me echas la mano con esto?", "This softens the complaint before asking for help.", breakdown([["I don’t want to make a fuss", "no quiero hacerla de tos"], ["but", "pero"], ["can you give me a hand?", "¿me echas la mano?"]])),
      stage("stage-8", "Reasonable solution", sentenceVocab.slice(26), sentenceVocab, "Let’s see if you can sort this out for me. If you just replace it, that’s fine, please.", "A ver si me lo pueden resolver. Con que me lo cambien, está bien, porfa.", "This gives support a clear, reasonable solution.", breakdown([["sort this out for me", "me lo pueden resolver"], ["if you replace it", "con que me lo cambien"], ["please", "porfa"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-service-story-q1", type: "multiple-choice", prompt: "After message 3, what is Camila complaining about?", options: ["A delivery that is late", "A canceled class", "A broken car", "A family party"], correctAnswer: "A delivery that is late", explanation: "Camila says the order supposedly arrived at six, but it still has not arrived.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-service-story-q2", type: "multiple-choice", prompt: "After message 6, what did the company do?", options: ["Left Camila waiting and let her down with the order", "Delivered everything perfectly", "Gave her a free dessert", "Changed the address correctly"], correctAnswer: "Left Camila waiting and let her down with the order", explanation: "Camila says me dejaron esperando and me quedaron mal con el pedido.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-service-story-q3", type: "true-false", prompt: "After message 9, true or false: The company mixed up the order at the last minute.", options: ["True", "False"], correctAnswer: "True", explanation: "Camila says a la mera hora se hicieron bolas.", points: 1, skillTag: "sequence" },
  { id: "mexican-b2-service-story-q4", type: "multiple-choice", prompt: "After message 12, what was wrong with the order?", options: ["They brought something else and half the order was missing", "Everything was free", "The driver arrived early", "They sent two correct orders"], correctAnswer: "They brought something else and half the order was missing", explanation: "Camila says me trajeron otra cosa and faltaba la mitad del pedido.", points: 1, skillTag: "problem" },
  { id: "mexican-b2-service-story-q5", type: "multiple-choice", prompt: "After message 15, what price problem appears?", options: ["They overcharged her", "They forgot to charge her", "They paid her back immediately", "The price was lower than expected"], correctAnswer: "They overcharged her", explanation: "Camila says me cobraron de más.", points: 1, skillTag: "price" },
  { id: "mexican-b2-service-story-q6", type: "multiple-choice", prompt: "After message 18, what support problem does Camila describe?", options: ["They stall her and send her back and forth", "They solve it instantly", "They give her the manager directly", "They already replaced everything"], correctAnswer: "They stall her and send her back and forth", explanation: "She says me dieron largas and me traen a vuelta y vuelta.", points: 1, skillTag: "support" },
  { id: "mexican-b2-service-story-q7", type: "true-false", prompt: "After message 21, true or false: Javier suggests opening the complaint softly before asking for help.", options: ["True", "False"], correctAnswer: "True", explanation: "He suggests no quiero hacerla de tos, pero…", points: 1, skillTag: "tone" },
  { id: "mexican-b2-service-story-q8", type: "multiple-choice", prompt: "After message 24, what solution does Camila ask for?", options: ["A replacement", "A new phone", "A ride home", "A different restaurant"], correctAnswer: "A replacement", explanation: "She says con que me lo cambien, está bien.", points: 1, skillTag: "solution" },
  { id: "mexican-b2-service-story-q9", type: "multiple-choice", prompt: "After message 27, what does the company finally offer?", options: ["To replace the order and remove the extra charge", "To ignore the complaint", "To charge more", "To cancel her account"], correctAnswer: "To replace the order and remove the extra charge", explanation: "Camila says they will change it and adjust the extra charge.", points: 1, skillTag: "resolution" },
  { id: "mexican-b2-service-story-q10", type: "multiple-choice", prompt: "By message 30, what did Camila do well?", options: ["She complained clearly without making unnecessary drama", "She insulted support", "She gave up before asking", "She accepted the wrong order"], correctAnswer: "She complained clearly without making unnecessary drama", explanation: "Javier says she got it solved without doing a whole drama.", points: 1, skillTag: "summary" },
];

export const mexicanSpanishB2ComplainingServiceInformallyWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B2 Story: The Order That Never Showed Up",
  subtitle: "Camila asks Javier how to complain about a late, wrong, overpriced order without sounding too intense.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "WhatsApp", "service", "complaints"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "camila", name: "Camila", initials: "CA", side: "right", color: "violet" },
      { id: "javier", name: "Javier", initials: "JA", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "camila", "Javi, necesito que me ayudes a no sonar intensa con soporte.", "Javi, I need you to help me not sound intense with support.", []),
      message("m2", "javier", "A ver, ¿qué pasó ahora?", "Let’s see, what happened now?", []),
      message("m3", "camila", "¿Qué onda con el servicio? Según llegaba a las seis y ni sus luces.", "What’s going on with the service? Supposedly it was arriving at six and still no sign of it.", ["¿qué onda con el servicio?", "según llegaba a las seis", "ni sus luces"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "javier", "Uf, ¿pedido de comida?", "Oof, food order?", []),
      message("m5", "camila", "Sí. Se tardaron un buen y el pedido nomás no llegaba.", "Yes. They took forever and the order just wasn’t arriving.", ["se tardaron un buen", "un buen", "nomás no llegaba"]),
      message("m6", "camila", "Me dejaron esperando y siento que me quedaron mal con el pedido.", "They left me waiting and I feel like they let me down with the order.", ["me dejaron esperando", "me quedaron mal con el pedido", "quedarle mal a alguien"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "javier", "Eso sí se entiende. Pero escríbelo claro, sin atacar.", "That makes sense. But write it clearly, without attacking.", []),
      message("m8", "camila", "A la mera hora cambiaron el repartidor.", "At the last minute they changed the delivery driver.", ["a la mera hora"]),
      message("m9", "camila", "Y luego se hicieron bolas con mi dirección.", "And then they got confused with my address.", ["se hicieron bolas", "hacerse bolas"]),
      message("m10", "javier", "Entonces tienes varios puntos: retraso, dirección y pedido.", "So you have several points: delay, address, and order.", []),
      message("m11", "camila", "Exacto. Cuando llegó, me trajeron otra cosa.", "Exactly. When it arrived, they brought me something else.", ["me trajeron otra cosa"]),
      message("m12", "camila", "Y para acabarla, faltaba la mitad del pedido.", "And to top it off, half the order was missing.", ["faltaba la mitad del pedido"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "javier", "Qué mal plan. Eso sí no se vale.", "That sucks. That’s really not fair.", ["qué mal plan", "no se vale"]),
      message("m14", "camila", "Además me cobraron de más por algo que ni llegó.", "Also, they overcharged me for something that didn’t even arrive.", ["me cobraron de más"]),
      message("m15", "javier", "Ahí sí: se pasaron con el precio. Está carísimo para lo que es.", "There, yes: they went too far with the price. It’s way too expensive for what it is.", ["se pasaron con el precio", "está carísimo para lo que es"]),
      message("m16", "camila", "Les escribí y me dieron largas.", "I wrote to them and they kept stalling me.", ["me dieron largas", "dar largas"]),
      message("m17", "javier", "¿Te contestó una persona o puro bot?", "Did a person answer you or just bots?", []),
      message("m18", "camila", "Puro bot. Me traen a vuelta y vuelta entre la app y la tienda.", "Just bots. They keep sending me back and forth between the app and the store.", ["me traen a vuelta y vuelta"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "javier", "No quieres pelear, pero sí necesitas pedir solución.", "You don’t want to fight, but you do need to ask for a solution.", []),
      message("m20", "camila", "Sí. No quiero hacerla de tos por nada.", "Yes. I don’t want to make a fuss over nothing.", ["hacerla de tos"]),
      message("m21", "javier", "Pon: 'No quiero hacerla de tos, pero ¿me echas la mano con esto?'", "Write: 'I don’t want to make a fuss, but can you give me a hand with this?'", ["no quiero hacerla de tos, pero…", "¿me echas la mano con esto?", "echar la mano"]),
      message("m22", "camila", "Me gusta. Suena firme pero no agresivo.", "I like it. It sounds firm but not aggressive.", []),
      message("m23", "javier", "Luego pide algo concreto, no solo te quejes.", "Then ask for something concrete, don’t just complain.", []),
      message("m24", "camila", "Voy a poner: 'A ver si me lo pueden resolver. Con que me lo cambien, está bien, porfa'.", "I’m going to write: 'Let’s see if you can sort this out for me. If you just replace it, that’s fine, please.'", ["a ver si me lo pueden resolver", "con que me lo cambien, está bien", "porfa"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "javier", "Perfecto. Eso da salida y no suena como amenaza.", "Perfect. That gives a way forward and doesn’t sound like a threat.", []),
      message("m26", "camila", "Ya me respondieron. Dicen que lo cambian.", "They replied. They say they’ll replace it.", []),
      message("m27", "camila", "También van a ajustar lo que me cobraron de más.", "They’re also going to adjust what they overcharged me.", ["me cobraron de más"]),
      message("m28", "javier", "Ves. Reclamar claro funciona mejor que explotar.", "See. Complaining clearly works better than exploding.", []),
      message("m29", "camila", "Sí. Igual, qué mal plan todo el servicio.", "Yes. Still, the whole service was really disappointing.", ["qué mal plan"]),
      message("m30", "javier", "Totalmente. Pero lo resolviste sin hacerla de tos de más.", "Totally. But you solved it without making an unnecessary fuss.", ["hacerla de tos"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-b2-service-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: serviceVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: serviceVocab.map((item) => item.term),
      grammarPatterns: [
        "Informal complaint openers: ¿qué onda con el servicio?, no quiero hacerla de tos, pero…",
        "Service failures: me dejaron esperando, me quedaron mal, se hicieron bolas.",
        "Resolution requests: ¿me echas la mano?, a ver si me lo pueden resolver, con que me lo cambien.",
      ],
      speakingPrompts: [
        "Complain about a delayed order while staying calm.",
        "Explain that the order was wrong and overpriced.",
        "Ask support for a concrete solution in informal Mexican Spanish.",
      ],
    },
    completionTask: {
      title: "Your Mexican B2 service complaint",
      instructions: "Record a 60-second Mexican Spanish voice note complaining about a bad order. Mention the wait, what went wrong, the price issue, and the solution you want.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Quejarse en español mexicano no siempre significa sonar agresivo. Puedes empezar con «¿qué onda con el servicio?» cuando hablas de forma informal y quieres mostrar sorpresa o molestia. Si el problema fue la espera, frases como «se tardaron un buen», «me dejaron esperando» y «nomás no llegaba» explican la frustración sin insultar a nadie.", translation: "Complaining in Mexican Spanish does not always mean sounding aggressive. You can start with ¿qué onda con el servicio? when speaking informally and wanting to show surprise or annoyance. If the problem was the wait, phrases like se tardaron un buen, me dejaron esperando, and nomás no llegaba explain the frustration without insulting anyone.", highlights: highlights(["¿qué onda con el servicio?", "se tardaron un buen", "un buen", "me dejaron esperando", "nomás no llegaba"]), shadowLine: "¿Qué onda con el servicio? Se tardaron un buen." },
  { id: "p2", text: "Cuando hay una promesa que no se cumple, «según llegaba a las seis» marca la diferencia entre lo prometido y lo real. Si la empresa falla, puedes decir «me quedaron mal con el pedido». Esta frase viene de «quedarle mal a alguien», que significa fallarle a una persona.", translation: "When a promise is not kept, según llegaba a las seis marks the difference between what was promised and what actually happened. If the company fails, you can say me quedaron mal con el pedido. This phrase comes from quedarle mal a alguien, which means to let someone down.", highlights: highlights(["según llegaba a las seis", "me quedaron mal con el pedido", "quedarle mal a alguien"]), shadowLine: "Según llegaba a las seis, pero me quedaron mal." },
  { id: "p3", text: "Muchas quejas tienen un cambio de último minuto. «A la mera hora» sirve para eso. Si el equipo de la tienda se confunde, puedes decir «se hicieron bolas» o hablar de «hacerse bolas». Suena informal, pero describe muy bien cuando nadie coordina nada.", translation: "Many complaints involve a last-minute change. A la mera hora is useful for that. If the store team gets confused, you can say se hicieron bolas or talk about hacerse bolas. It sounds informal, but it describes very well when nobody coordinates anything.", highlights: highlights(["a la mera hora", "se hicieron bolas", "hacerse bolas"]), shadowLine: "A la mera hora se hicieron bolas." },
  { id: "p4", text: "Para explicar el error concreto, sé específico. «Me trajeron otra cosa» dice que recibiste algo incorrecto. «Faltaba la mitad del pedido» dice que no llegó todo. Y si el cobro no corresponde, «me cobraron de más» es directo y fácil de entender.", translation: "To explain the concrete error, be specific. Me trajeron otra cosa says you received something incorrect. Faltaba la mitad del pedido says not everything arrived. And if the charge does not match, me cobraron de más is direct and easy to understand.", highlights: highlights(["me trajeron otra cosa", "faltaba la mitad del pedido", "me cobraron de más"]), shadowLine: "Me trajeron otra cosa y faltaba la mitad del pedido." },
  { id: "p5", text: "Cuando el precio se siente injusto, «se pasaron con el precio» suena más emocional que formal. «Está carísimo para lo que es» habla de valor: no solo cuesta mucho, sino que no vale eso. Para cerrar la queja moral, «no se vale» o «qué mal plan» funcionan muy bien.", translation: "When the price feels unfair, se pasaron con el precio sounds more emotional than formal. Está carísimo para lo que es talks about value: it is not only expensive, it is not worth that. To close the moral complaint, no se vale or qué mal plan work very well.", highlights: highlights(["se pasaron con el precio", "está carísimo para lo que es", "no se vale", "qué mal plan"]), shadowLine: "Se pasaron con el precio; no se vale." },
  { id: "p6", text: "Si soporte no resuelve, aparecen frases de cansancio. «Me dieron largas» significa que te estuvieron retrasando con respuestas vagas. «Me traen a vuelta y vuelta» describe cuando te mandan de una persona a otra. Y si todavía no aparece nadie, «ni sus luces» resume la ausencia.", translation: "If support does not resolve the issue, tiredness phrases appear. Me dieron largas means they kept delaying you with vague answers. Me traen a vuelta y vuelta describes when they send you from one person to another. And if nobody has appeared yet, ni sus luces summarizes the absence.", highlights: highlights(["me dieron largas", "dar largas", "me traen a vuelta y vuelta", "ni sus luces"]), shadowLine: "Me dieron largas y me traen a vuelta y vuelta." },
  { id: "p7", text: "Para no sonar demasiado intenso, puedes abrir con «no quiero hacerla de tos, pero…». «Hacerla de tos» significa hacer un problema o quejarse mucho. Después, pedir ayuda con «¿me echas la mano con esto?» suena más humano que exigir de golpe.", translation: "To avoid sounding too intense, you can open with no quiero hacerla de tos, pero…. Hacerla de tos means making an issue or complaining a lot. Then asking for help with ¿me echas la mano con esto? sounds more human than demanding immediately.", highlights: highlights(["no quiero hacerla de tos, pero…", "hacerla de tos", "¿me echas la mano con esto?", "echar la mano"]), shadowLine: "No quiero hacerla de tos, pero ¿me echas la mano?" },
  { id: "p8", text: "La mejor queja termina con una solución clara. «A ver si me lo pueden resolver» pide acción sin sonar demasiado formal. Si quieres algo específico, «con que me lo cambien, está bien» muestra que tu petición es razonable. Y un «porfa» al final mantiene el tono casual.", translation: "The best complaint ends with a clear solution. A ver si me lo pueden resolver asks for action without sounding too formal. If you want something specific, con que me lo cambien, está bien shows that your request is reasonable. And a porfa at the end keeps the tone casual.", highlights: highlights(["a ver si me lo pueden resolver", "con que me lo cambien, está bien", "porfa"]), shadowLine: "A ver si me lo pueden resolver, porfa." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-service-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Complaining about bad service in informal Mexican Spanish", "Making spontaneous plans with friends", "Reading the room at a party", "Telling a family story"], correctAnswer: "Complaining about bad service in informal Mexican Spanish", explanation: "The reading explains delays, wrong orders, prices, runarounds, and polite solutions.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-service-reading-q2", type: "multiple-choice", prompt: "Which phrase means “they left me waiting”?", options: ["Me dejaron esperando", "Se hicieron bolas", "No se vale", "Porfa"], correctAnswer: "Me dejaron esperando", explanation: "Me dejaron esperando describes being left waiting.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-service-reading-q3", type: "true-false", prompt: "True or false: “a la mera hora” describes something happening or changing at the last minute.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says it is used for last-minute changes.", points: 1, skillTag: "time" },
  { id: "mexican-b2-service-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "They overcharged me.", wordBank: ["Me", "cobraron", "de", "más."], correctAnswer: "Me cobraron de más.", explanation: "This is the direct complaint for being overcharged.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-b2-service-reading-q5", type: "multiple-choice", prompt: "Which phrase asks for help with the issue?", options: ["¿Me echas la mano con esto?", "Ni sus luces", "Qué mal plan", "Se tardaron un buen"], correctAnswer: "¿Me echas la mano con esto?", explanation: "Echar la mano means to help or give someone a hand.", points: 1, skillTag: "help" },
];

export const mexicanSpanishB2ComplainingServiceInformallyReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B2 Reading: Quejarse sin Hacerla de Tos",
  subtitle: "A synced Spanish reading about informal Mexican complaints, delays, wrong orders, pricing, and getting help.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "reading", "service", "complaints"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: serviceVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican B2 informal-service-complaint vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishB2ComplainingServiceInformallyQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish B2: Complaining about Service Informally Quiz",
  subtitle: "Choose the right Mexican phrase for delays, wrong orders, overcharging, runarounds, and fair solutions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "quiz", "service", "complaints"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B2 phrases for complaining informally but effectively about service problems.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-b2-service-quiz-1", type: "multiple-choice", prompt: "Your order is very late. What can you say?", options: ["Se tardaron un buen", "Con que me lo cambien", "Echar la mano", "Porfa"], correctAnswer: "Se tardaron un buen", explanation: "This means they took forever or took a long time.", points: 1, skillTag: "delay" },
      { id: "mexican-b2-service-quiz-2", type: "fill-blank", prompt: "Complete: Me dejaron ____.", nativePrompt: "They left me waiting.", correctAnswer: "esperando", explanation: "Me dejaron esperando means they left me waiting.", points: 1, skillTag: "waiting" },
      { id: "mexican-b2-service-quiz-3", type: "multiple-choice", prompt: "The order was supposed to arrive at six. What fits?", options: ["Según llegaba a las seis", "Ni sus luces", "No se vale", "Qué mal plan"], correctAnswer: "Según llegaba a las seis", explanation: "Según marks the promised or supposed time.", points: 1, skillTag: "promise" },
      { id: "mexican-b2-service-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "They got confused.", wordBank: ["Se", "hicieron", "bolas."], correctAnswer: "Se hicieron bolas.", explanation: "This means they mixed things up.", points: 1, skillTag: "confusion" },
      { id: "mexican-b2-service-quiz-5", type: "true-false", prompt: "True or false: “me cobraron de más” means they overcharged me.", options: ["True", "False"], correctAnswer: "True", explanation: "This phrase is used for an incorrect or excessive charge.", points: 1, skillTag: "price" },
      { id: "mexican-b2-service-quiz-6", type: "multiple-choice", prompt: "Half the order is missing. Which phrase fits?", options: ["Faltaba la mitad del pedido", "A la mera hora", "Un buen", "Porfa"], correctAnswer: "Faltaba la mitad del pedido", explanation: "This gives the concrete missing-item complaint.", points: 1, skillTag: "missing-items" },
      { id: "mexican-b2-service-quiz-7", type: "fill-blank", prompt: "Complete: No quiero hacerla de ____.", nativePrompt: "I don’t want to make a fuss.", correctAnswer: "tos", explanation: "Hacerla de tos means to make a fuss.", points: 1, skillTag: "tone" },
      { id: "mexican-b2-service-quiz-8", type: "multiple-choice", prompt: "Support keeps delaying you with vague answers. What fits?", options: ["Me dieron largas", "Me trajeron otra cosa", "Con que me lo cambien", "Está carísimo para lo que es"], correctAnswer: "Me dieron largas", explanation: "Dar largas means to stall someone.", points: 1, skillTag: "runaround" },
      { id: "mexican-b2-service-quiz-9", type: "true-false", prompt: "True or false: “¿me echas la mano con esto?” asks someone to help with the issue.", options: ["True", "False"], correctAnswer: "True", explanation: "Echar la mano means to help.", points: 1, skillTag: "help" },
      { id: "mexican-b2-service-quiz-10", type: "multiple-choice", prompt: "You only want them to replace it. Which phrase fits?", options: ["Con que me lo cambien, está bien", "Ni sus luces", "Se pasaron con el precio", "Me traen a vuelta y vuelta"], correctAnswer: "Con que me lo cambien, está bien", explanation: "This gives a clear, reasonable solution.", points: 1, skillTag: "solution" },
      pairQuestion("mexican-b2-service-pairs-1", "Match delay and broken-promise phrases.", serviceVocab.slice(0, 10)),
      pairQuestion("mexican-b2-service-pairs-2", "Match wrong-order and price phrases.", serviceVocab.slice(10, 20)),
      pairQuestion("mexican-b2-service-pairs-3", "Match support and solution phrases.", serviceVocab.slice(20)),
    ],
  },
};
