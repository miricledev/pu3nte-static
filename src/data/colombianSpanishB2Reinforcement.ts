import type {
  CheckpointQuestion,
  CheckpointQuiz,
  FlashcardDeck,
  FlashcardItem,
  ReadingComprehension,
  StoryMessage,
  WhatsAppStory,
} from "../types";

type VocabItem = {
  id: string;
  term: string;
  meaning: string;
  example: string;
  translation: string;
  note?: string;
  starred?: boolean;
};

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const colombianVocab: VocabItem[] = [
  { id: "que-mas", term: "¿Qué más?", meaning: "What's up? / How's it going?", example: "¿Qué más, parce? ¿Todo bien?", translation: "What's up, mate? Everything good?", starred: true },
  { id: "parce", term: "parce", meaning: "mate / bro / buddy", example: "Parce, te cuento una vuelta rapidito.", translation: "Mate, let me tell you something real quick.", starred: true },
  { id: "parcero", term: "parcero", meaning: "friend / mate / buddy", example: "Mi parcero llegó empapado por el aguacero.", translation: "My friend arrived soaked because of the downpour." },
  { id: "te-cuento-una-vuelta", term: "te cuento una vuelta", meaning: "let me tell you something / let me tell you a story", example: "Te cuento una vuelta: me cogió la tarde y empezó el caos.", translation: "Let me tell you something: I ended up running late and the chaos started.", starred: true },
  { id: "una-vuelta", term: "una vuelta", meaning: "a thing / situation / matter", example: "La vuelta es que olvidé mandar la ubicación.", translation: "The thing is I forgot to send the location." },
  { id: "rapidito", term: "rapidito", meaning: "real quick / quickly", example: "Pásame la ubicación rapidito, porfa.", translation: "Send me the location real quick, please." },
  { id: "resulta-que", term: "resulta que…", meaning: "it turns out that…", example: "Resulta que la buseta estaba llenísima.", translation: "It turns out that the small bus was completely full.", starred: true },
  { id: "tinto", term: "tinto", meaning: "black coffee / small coffee", example: "Salí por un tinto y terminé con una aventura.", translation: "I went out for a coffee and ended up with an adventure.", starred: true },
  { id: "tintico", term: "tintico", meaning: "little coffee / small black coffee", example: "Pedí un tintico mientras escampaba.", translation: "I ordered a little coffee while the rain stopped." },
  { id: "tranqui", term: "tranqui", meaning: "chill / calm / relaxed", example: "Tranqui, no se preocupe, yo espero.", translation: "Chill, don't worry, I'll wait.", starred: true },
  { id: "sin-afan", term: "sin afán", meaning: "without rushing / no rush", example: "Venga sin afán; el aguacero está berraco.", translation: "Come with no rush; the downpour is intense." },
  { id: "aguacero", term: "aguacero", meaning: "heavy rain / downpour", example: "Se vino un aguacero horrible justo al salir.", translation: "A horrible downpour started right when I left.", starred: true },
  { id: "aguacero-berraco", term: "aguacero berraco", meaning: "really heavy rain / brutal downpour", example: "Se está cayendo un aguacero berraco.", translation: "A brutal downpour is coming down.", starred: true },
  { id: "berraco", term: "berraco", meaning: "intense / tough / serious / impressive, depending on context", example: "Ese trancón estaba berraco.", translation: "That traffic jam was intense." },
  { id: "tiendita", term: "tiendita", meaning: "little shop / corner shop", example: "Me metí a una tiendita mientras escampaba.", translation: "I went into a little corner shop while the rain stopped." },
  { id: "bien-pueda", term: "bien pueda", meaning: "go ahead / come in / feel free", example: "La señora dijo: bien pueda, mijo.", translation: "The lady said: go ahead, dear.", starred: true },
  { id: "a-la-orden", term: "a la orden", meaning: "at your service / how can I help?", example: "En la tiendita me dijeron: a la orden.", translation: "At the little shop they said: at your service." },
  { id: "que-pena", term: "qué pena", meaning: "sorry / excuse me / I'm embarrassed", example: "Qué pena molestarte, ¿me regalas la ubicación?", translation: "Sorry to bother you, can you send me the location?", starred: true },
  { id: "me-regala", term: "¿me regala…?", meaning: "could I have…? / can you give me…?", example: "¿Me regala un tintico mientras escampa?", translation: "Could I have a little coffee while the rain stops?", starred: true },
  { id: "mientras-escampa", term: "mientras escampa", meaning: "while the rain stops", example: "Nos quedamos en la tiendita mientras escampa.", translation: "We stayed in the shop while the rain stops." },
  { id: "de-una", term: "de una", meaning: "sure / absolutely / right away", example: "¿Nos mandas la ubicación? De una.", translation: "Can you send us the location? Sure.", starred: true },
  { id: "mijo-mija", term: "mijo / mija", meaning: "dear / son / love, warm informal term", example: "Fresco, mijo, espere aquí sin afán.", translation: "Don't worry, dear, wait here with no rush." },
  { id: "con-mucho-gusto", term: "con mucho gusto", meaning: "with pleasure / of course", example: "Con mucho gusto, querida, ya le traigo el tinto.", translation: "With pleasure, dear, I'll bring you the coffee now." },
  { id: "lucas", term: "lucas", meaning: "thousand pesos", example: "El tintico vale dos lucas.", translation: "The little coffee costs two thousand pesos." },
  { id: "dos-lucas", term: "dos lucas", meaning: "two thousand pesos", example: "Pagué dos lucas en efectivo.", translation: "I paid two thousand pesos in cash." },
  { id: "en-efectivo", term: "en efectivo", meaning: "in cash", example: "¿Puedo pagar en efectivo?", translation: "Can I pay in cash?" },
  { id: "me-dio-pena", term: "me dio pena", meaning: "I felt embarrassed", example: "Me dio pena entrar empapado a la oficina.", translation: "I felt embarrassed walking into the office soaked." },
  { id: "querida-querido", term: "querida / querido", meaning: "kind / sweet / lovely", example: "La señora fue muy querida conmigo.", translation: "The lady was very kind to me." },
  { id: "fresco-fresca", term: "fresco / fresca", meaning: "don't worry / relax / it's fine", example: "Fresco, no se preocupe, eso le pasa a cualquiera.", translation: "Don't worry, it's fine, that happens to anyone.", starred: true },
  { id: "no-se-preocupe", term: "no se preocupe", meaning: "don't worry", example: "No se preocupe, yo le mando la nota de voz.", translation: "Don't worry, I'll send you the voice note." },
  { id: "me-cogio-la-tarde", term: "me cogió la tarde", meaning: "I ended up running late", example: "Me cogió la tarde por el trancón.", translation: "I ended up running late because of the traffic jam.", starred: true },
  { id: "empapado", term: "empapado", meaning: "soaked", example: "Llegué empapado y todo estresado.", translation: "I arrived soaked and really stressed." },
  { id: "ese-man", term: "ese man", meaning: "that guy", example: "Ese man sí la pasó mal en el aguacero.", translation: "That guy really had a rough time in the downpour." },
  { id: "uy", term: "uy", meaning: "wow / damn / oof", example: "Uy, ese aguacero está horrible.", translation: "Oof, that downpour is awful.", starred: true },
  { id: "si-la-paso-mal", term: "sí la pasó mal", meaning: "he really had a rough time", example: "El mensajero sí la pasó mal en el trancón.", translation: "The delivery guy really had a rough time in traffic." },
  { id: "trancon", term: "trancón", meaning: "traffic jam", example: "Había un trancón horrible por la lluvia.", translation: "There was an awful traffic jam because of the rain.", starred: true },
  { id: "horrible", term: "horrible", meaning: "awful / terrible", example: "El clima estaba horrible y la buseta llenísima.", translation: "The weather was awful and the bus was completely full." },
  { id: "ahi-fue-cuando", term: "ahí fue cuando…", meaning: "that was when…", example: "Ahí fue cuando me di cuenta de que no tenía efectivo.", translation: "That was when I realized I didn't have cash." },
  { id: "me-di-cuenta-de-que", term: "me di cuenta de que…", meaning: "I realized that…", example: "Me di cuenta de que había mandado mal la ubicación.", translation: "I realized that I had sent the wrong location." },
  { id: "la-vuelta-es-que", term: "la vuelta es que…", meaning: "the thing is… / the issue is…", example: "La vuelta es que el celular se me descargó.", translation: "The thing is my phone died.", starred: true },
  { id: "pelada", term: "pelada", meaning: "girl / young woman", example: "La pelada de la oficina mandó una nota de voz.", translation: "The girl from the office sent a voice note." },
  { id: "oficina", term: "oficina", meaning: "office", example: "Tenía que llegar a la oficina antes de las nueve.", translation: "I had to arrive at the office before nine." },
  { id: "nota-de-voz", term: "nota de voz", meaning: "voice note", example: "Mandé una nota de voz porque estaba caminando.", translation: "I sent a voice note because I was walking." },
  { id: "oye", term: "oye", meaning: "hey", example: "Oye, qué pena molestarte.", translation: "Hey, sorry to bother you." },
  { id: "que-pena-molestarte", term: "qué pena molestarte", meaning: "sorry to bother you", example: "Qué pena molestarte, ¿nos mandas la ubicación?", translation: "Sorry to bother you, can you send us the location?", starred: true },
  { id: "nos-mandas", term: "¿nos mandas…?", meaning: "can you send us…?", example: "¿Nos mandas la ubicación rapidito?", translation: "Can you send us the location real quick?" },
  { id: "ubicacion", term: "ubicación", meaning: "location", example: "Listo, se la mando ya.", translation: "Okay, I'll send it to you now." },
  { id: "listo", term: "listo", meaning: "okay / done / got it", example: "Listo, de una, ya salgo.", translation: "Okay, sure, I'm leaving now.", starred: true },
  { id: "se-la-mando-ya", term: "se la mando ya", meaning: "I'll send it to you now", example: "La ubicación se la mando ya.", translation: "I'll send you the location now." },
  { id: "ojo", term: "ojo", meaning: "careful / watch out", example: "Ojo con el celular en esa esquina.", translation: "Watch out with your phone on that corner." },
  { id: "pilas", term: "pilas", meaning: "be careful / stay sharp", example: "Pilas, no dé papaya con el celular.", translation: "Stay sharp, don't make yourself an easy target with your phone.", starred: true },
  { id: "no-dar-papaya", term: "no dar papaya", meaning: "don't make yourself an easy target / don't expose yourself unnecessarily", example: "En el centro, pilas con no dar papaya.", translation: "Downtown, be careful not to make yourself an easy target.", starred: true },
  { id: "celular", term: "celular", meaning: "phone", example: "Guardé el celular cuando empezó el trancón.", translation: "I put away my phone when the traffic jam started." },
  { id: "nos-toco-esperar", term: "nos tocó esperar", meaning: "we had to wait", example: "Nos tocó esperar mientras escampaba.", translation: "We had to wait while the rain stopped." },
  { id: "mas-bien", term: "más bien", meaning: "rather / kind of / actually", example: "Más bien esperemos en la tiendita.", translation: "Actually, let's wait in the little shop." },
  { id: "buseta", term: "buseta", meaning: "small bus / local bus", example: "La buseta llegó llenísima.", translation: "The small bus arrived completely full." },
  { id: "llenisima", term: "llenísima", meaning: "completely full", example: "La buseta estaba llenísima por el aguacero.", translation: "The bus was completely full because of the downpour." },
  { id: "mientras-tanto", term: "mientras tanto", meaning: "meanwhile", example: "Mientras tanto, compramos una arepita.", translation: "Meanwhile, we bought a little arepa." },
  { id: "arepita", term: "arepita", meaning: "little arepa", example: "Una arepita caliente nos subió el ánimo.", translation: "A hot little arepa lifted our mood." },
  { id: "nos-subio-el-animo", term: "nos subió el ánimo", meaning: "it lifted our mood", example: "El tintico nos subió el ánimo.", translation: "The little coffee lifted our mood." },
  { id: "imaginate-que", term: "imagínate que…", meaning: "imagine this / guess what", example: "Imagínate que al final llegó el jefe empapado.", translation: "Imagine this: in the end the boss arrived soaked." },
  { id: "al-final", term: "al final", meaning: "in the end", example: "Al final, todo salió bacano.", translation: "In the end, everything turned out cool." },
  { id: "atrapado-en-el-trancon", term: "atrapado en el trancón", meaning: "stuck in traffic", example: "El jefe estaba atrapado en el trancón.", translation: "The boss was stuck in traffic." },
  { id: "ni-modo", term: "ni modo", meaning: "what can you do / oh well", example: "Ni modo, nos tocó esperar.", translation: "Oh well, we had to wait." },
  { id: "por-lo-menos", term: "por lo menos", meaning: "at least", example: "Por lo menos había tinto y arepita.", translation: "At least there was coffee and a little arepa." },
  { id: "medio-mundo", term: "medio mundo", meaning: "everyone / half the world", example: "Medio mundo estaba muerto de la risa.", translation: "Everyone was cracking up." },
  { id: "muerto-de-la-risa", term: "muerto de la risa", meaning: "laughing a lot / cracking up", example: "El parcero quedó muerto de la risa.", translation: "The friend ended up cracking up." },
  { id: "tranquilos", term: "tranquilos", meaning: "relax / don't worry", example: "Tranquilos, fresco, ya llego.", translation: "Relax, don't worry, I'm arriving now." },
  { id: "me-hizo-el-dia", term: "me hizo el día", meaning: "it made my day", example: "La señora de la tiendita me hizo el día.", translation: "The lady from the little shop made my day." },
  { id: "todo-estresado", term: "todo estresado", meaning: "really stressed", example: "Llegué todo estresado, pero con una historia buenísima.", translation: "I arrived really stressed, but with a great story." },
  { id: "que-nota", term: "qué nota", meaning: "how cool / that's cool", example: "Qué nota que todos ayudaron.", translation: "How cool that everyone helped." },
  { id: "parece-una-novela", term: "parece una novela", meaning: "it's like a soap opera", example: "Todo esto parece una novela.", translation: "All of this is like a soap opera." },
  { id: "remate-diciendo", term: "rematé diciendo", meaning: "I finished by saying / I wrapped up by saying", example: "Rematé diciendo que Colombia te cambia el día en cinco minutos.", translation: "I wrapped up by saying Colombia changes your day in five minutes." },
  { id: "uno-sale-por", term: "uno sale por…", meaning: "you go out for… / people go out for…", example: "Uno sale por un tinto y termina con una aventura.", translation: "You go out for a coffee and end up with an adventure.", starred: true },
  { id: "termina-con-una-aventura", term: "termina con una aventura", meaning: "ends up with an adventure", example: "En Bogotá uno sale por un tinto y termina con una aventura.", translation: "In Bogotá you go out for coffee and end up with an adventure." },
  { id: "canson", term: "cansón", meaning: "annoying / tiring / a pain", example: "El trancón fue cansón, pero la historia quedó bacana.", translation: "The traffic jam was annoying, but the story turned out cool." },
  { id: "bacano-bacana", term: "bacano / bacana", meaning: "cool / nice / great", example: "Al final fue una tarde bacana.", translation: "In the end it was a great afternoon.", starred: true },
];

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
  };
}

export const colombianSpanishB2FlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b2-aguacero-flashcards",
  title: "Colombian Spanish B2: Aguacero Adventure Vocab",
  subtitle: "All the Colombian expressions from the speaking lesson, drilled before the story.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "dialect", "speaking lesson reinforcement", "slang"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-aguacero-adventure",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: colombianVocab.map(cardFromVocab),
  },
};

const storyHighlights = Object.fromEntries(
  colombianVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning }]),
);

function message(
  id: string,
  speakerId: string,
  text: string,
  translation: string,
  phrases: string[],
): StoryMessage {
  return {
    id,
    speakerId,
    text,
    translation,
    vocabHighlights: phrases.map((phrase) => storyHighlights[phrase]).filter(Boolean),
  };
}

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "story-q1",
    type: "multiple-choice",
    prompt: "Why does Nico first enter the tiendita?",
    options: ["To wait while the rain stops", "To buy a new phone", "To meet his boss", "To hide from a friend"],
    correctAnswer: "To wait while the rain stops",
    explanation: "He says he enters the tiendita mientras escampa because there is an aguacero berraco.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "story-q2",
    type: "multiple-choice",
    prompt: "What does the shopkeeper mean by bien pueda?",
    options: ["Go ahead / come in", "Leave quickly", "Pay first", "Call later"],
    correctAnswer: "Go ahead / come in",
    explanation: "Bien pueda is a warm Colombian service phrase inviting someone in or letting them proceed.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "story-q3",
    type: "multiple-choice",
    prompt: "Why does everyone warn Nico: ojo, pilas, no dar papaya?",
    options: ["Because he is using his phone in public", "Because he ordered coffee", "Because he is too early", "Because he forgot Spanish"],
    correctAnswer: "Because he is using his phone in public",
    explanation: "They warn him not to expose his celular unnecessarily while sending the ubicación.",
    points: 1,
    skillTag: "inference",
  },
  {
    id: "story-q4",
    type: "multiple-choice",
    prompt: "What makes the situation feel like una novela?",
    options: ["Rain, traffic, voice notes, delays, and everyone laughing", "A formal meeting with no problem", "A silent bus ride", "A planned coffee tasting"],
    correctAnswer: "Rain, traffic, voice notes, delays, and everyone laughing",
    explanation: "The story piles up comic complications: aguacero, trancón, buseta llenísima, notes, and delays.",
    points: 1,
    skillTag: "summary",
  },
  {
    id: "story-q5",
    type: "typed",
    prompt: "Type the Colombian phrase from the story meaning 'I ended up running late'.",
    correctAnswer: "me cogió la tarde",
    correctAnswers: ["me cogio la tarde", "me cogió la tarde"],
    explanation: "Me cogió la tarde is a very Colombian-sounding way to say you ended up running late.",
    points: 1,
    skillTag: "vocabulary",
  },
];

export const colombianSpanishB2WhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b2-aguacero-adventure",
  title: "Colombian B2 Story: El Aguacero, el Tinto y la Vuelta",
  subtitle: "A long WhatsApp-style story packed with Colombian greetings, weather phrases, errands, traffic, voice notes, and banter.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "WhatsApp", "slang", "dialect"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-aguacero-adventure",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "nico", name: "Nico", initials: "N", side: "right", color: "blue" },
      { id: "vale", name: "Vale", initials: "V", side: "left", color: "cyan" },
      { id: "dona-marta", name: "Doña Marta", initials: "M", side: "left", color: "gold" },
      { id: "andres", name: "Andrés", initials: "A", side: "left", color: "green" },
      { id: "laura", name: "Laura", initials: "L", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "nico", "¿Qué más, Vale? Parce, te cuento una vuelta rapidito antes de entrar a la oficina.", "What's up, Vale? Mate, let me tell you something real quick before going into the office.", ["¿Qué más?", "parce", "te cuento una vuelta", "rapidito", "oficina"]),
      message("m2", "vale", "Dime, parcero. Pero sin afán, que yo también estoy con un tinto.", "Tell me, buddy. But no rush, I'm also having a coffee.", ["parcero", "sin afán", "tinto"]),
      message("m3", "nico", "Resulta que salí por un tintico y se vino un aguacero berraco.", "It turns out I went out for a little coffee and a brutal downpour started.", ["resulta que…", "tintico", "aguacero berraco"]),
      message("m4", "vale", "Uy, ¿un aguacero de esos que vuelven todo horrible?", "Oof, one of those downpours that makes everything awful?", ["uy", "aguacero", "horrible"]),
      message("m5", "nico", "Tal cual. Se está cayendo un aguacero y me metí a una tiendita mientras escampa.", "Exactly. A downpour is coming down and I went into a little shop while it stops.", ["tiendita", "mientras escampa"]),
      message("m6", "dona-marta", "Bien pueda, mijo. A la orden. ¿Me le provoca un tintico?", "Come in, dear. At your service. Would you like a little coffee?", ["bien pueda", "mijo / mija", "a la orden", "tintico"]),
      message("m7", "nico", "Qué pena, señora, ¿me regala un tinto? Pago en efectivo.", "Excuse me, ma'am, could I have a coffee? I'll pay in cash.", ["qué pena", "¿me regala…?", "tinto", "en efectivo"]),
      message("m8", "dona-marta", "Con mucho gusto, querido. Son dos lucas.", "With pleasure, dear. It's two thousand pesos.", ["con mucho gusto", "querida / querido", "dos lucas"]),
      message("m9", "nico", "Ahí fue cuando me di cuenta de que no tenía ni una luca suelta.", "That was when I realized I didn't even have one thousand pesos loose.", ["ahí fue cuando…", "me di cuenta de que…", "lucas"]),
      message("m10", "dona-marta", "Fresco, no se preocupe. Me paga después, mijo.", "Don't worry, it's fine. Pay me later, dear.", ["fresco / fresca", "no se preocupe", "mijo / mija"]),
      message("m11", "nico", "Me dio pena, parce. La señora fue demasiado querida.", "I felt embarrassed, mate. The lady was incredibly kind.", ["me dio pena", "parce", "querida / querido"]),
      message("m12", "vale", "Qué nota. Esa tiendita ya nos cayó bien.", "That's so cool. We already like that little shop.", ["qué nota", "tiendita"]),
      message("m13", "nico", "La vuelta es que me cogió la tarde y llegué empapado.", "The thing is I ended up running late and arrived soaked.", ["la vuelta es que…", "me cogió la tarde", "empapado"]),
      message("m14", "andres", "Ese man sí la pasó mal. Yo también estoy atrapado en el trancón.", "That guy really had a rough time. I'm stuck in traffic too.", ["ese man", "sí la pasó mal", "atrapado en el trancón"]),
      message("m15", "vale", "¿Trancón horrible por la lluvia?", "Awful traffic jam because of the rain?", ["trancón", "horrible"]),
      message("m16", "andres", "Horrible. La buseta venía llenísima y nos tocó esperar media hora.", "Awful. The small bus was completely full and we had to wait half an hour.", ["buseta", "llenísima", "nos tocó esperar"]),
      message("m17", "laura", "Oye, qué pena molestarte, ¿nos mandas la ubicación? La pelada nueva no sabe llegar.", "Hey, sorry to bother you, can you send us the location? The new girl doesn't know how to get there.", ["oye", "qué pena molestarte", "¿nos mandas…?", "ubicación", "pelada"]),
      message("m18", "nico", "Listo, se la mando ya. Pero ojo, pilas con el celular en esa esquina.", "Okay, I'll send it now. But watch out, be careful with your phone on that corner.", ["listo", "se la mando ya", "ojo", "pilas", "celular"]),
      message("m19", "vale", "Sí, no dar papaya. Guarde ese celular, parcero.", "Yes, don't make yourself an easy target. Put away that phone, buddy.", ["no dar papaya", "celular", "parcero"]),
      message("m20", "nico", "Mientras tanto, Doña Marta me dio una arepita y eso nos subió el ánimo.", "Meanwhile, Doña Marta gave me a little arepa and that lifted our mood.", ["mientras tanto", "arepita", "nos subió el ánimo"]),
      message("m21", "dona-marta", "Tranquilos, mijos. Más bien se toman el tinto sin afán.", "Relax, dears. Actually, drink your coffee without rushing.", ["tranquilos", "mijo / mija", "más bien", "tinto", "sin afán"]),
      message("m22", "nico", "Imagínate que al final medio mundo terminó en la tiendita.", "Imagine this: in the end everyone ended up in the little shop.", ["imagínate que…", "al final", "medio mundo", "tiendita"]),
      message("m23", "andres", "Yo llegué todo estresado, pero la arepita me hizo el día.", "I arrived really stressed, but the little arepa made my day.", ["todo estresado", "arepita", "me hizo el día"]),
      message("m24", "vale", "Jajaja, medio mundo muerto de la risa por un tintico.", "Haha, everyone cracking up because of a little coffee.", ["medio mundo", "muerto de la risa", "tintico"]),
      message("m25", "laura", "Esto parece una novela: aguacero, trancón, tiendita, nota de voz y jefe perdido.", "This is like a soap opera: downpour, traffic jam, little shop, voice note, and lost boss.", ["parece una novela", "aguacero", "trancón", "tiendita", "nota de voz"]),
      message("m26", "nico", "Rematé diciendo en una nota de voz: uno sale por un tinto y termina con una aventura.", "I wrapped up by saying in a voice note: you go out for a coffee and end up with an adventure.", ["rematé diciendo", "nota de voz", "uno sale por…", "tinto", "termina con una aventura"]),
      message("m27", "dona-marta", "Bacano, ¿sí ve? Hasta un día cansón puede terminar bonito.", "Cool, see? Even an annoying day can end nicely.", ["bacano / bacana", "cansón"]),
      message("m28", "nico", "De una. Ni modo por el trancón, pero por lo menos aprendimos media Colombia en una tarde.", "Absolutely. Oh well about the traffic, but at least we learned half of Colombia in one afternoon.", ["de una", "ni modo", "trancón", "por lo menos"]),
      message("m29", "vale", "Y todo porque un parcero pidió un tintico mientras escampaba.", "And all because a buddy ordered a little coffee while the rain stopped.", ["parcero", "tintico", "mientras escampa"]),
      message("m30", "nico", "Al final fue bacano. Me cogió la tarde, sí, pero me llevé una historia brutal.", "In the end it was cool. I was late, yes, but I got a great story out of it.", ["al final", "bacano / bacana", "me cogió la tarde"]),
    ],
    comprehensionChecks: [
      { id: "check-1", afterMessageId: "m6", question: storyQuestions[0] },
      { id: "check-2", afterMessageId: "m12", question: storyQuestions[1] },
      { id: "check-3", afterMessageId: "m19", question: storyQuestions[2] },
      { id: "check-4", afterMessageId: "m25", question: storyQuestions[3] },
      { id: "check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: colombianVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: colombianVocab.map((item) => item.term),
      grammarPatterns: [
        "Resulta que... for setting up a story.",
        "Ahí fue cuando... for the turning point.",
        "La vuelta es que... for the real issue.",
        "Me di cuenta de que... for realization.",
        "Uno sale por... y termina con... for a general life observation.",
      ],
      speakingPrompts: [
        "Tell a story about getting caught in a downpour using aguacero, empapado, and mientras escampa.",
        "Explain a late arrival using me cogió la tarde, trancón, buseta, and ni modo.",
        "Order something in a Colombian tiendita using bien pueda, a la orden, ¿me regala...?, and con mucho gusto.",
        "Send a WhatsApp update using listo, se la mando ya, ojo, pilas, and no dar papaya.",
      ],
    },
    completionTask: {
      title: "Your Colombian voice-note challenge",
      instructions:
        "Record a 90-second voice note retelling Nico's day. Use at least 15 expressions from the story, including one greeting, one weather phrase, one tiendita/service phrase, one traffic phrase, and one ending phrase.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "¿Qué más? Te cuento una vuelta, parce, porque todavía me da risa. Esa mañana salí rapidito de la casa para llegar temprano a la oficina, pero resulta que apenas puse un pie en la calle se vino un aguacero. No era una lluviecita normal: era un aguacero berraco, de esos que vuelven el día horrible en dos minutos. Yo iba por un tinto, nada más, un tintico antes del trabajo, pero la lluvia me obligó a meterme en una tiendita mientras escampa. La señora me vio empapado, con cara de todo estresado, y me dijo: 'Bien pueda, mijo, a la orden'.",
    translation:
      "What's up? Let me tell you something, mate, because it still makes me laugh. That morning I left home real quick to arrive early at the office, but it turns out that as soon as I stepped outside, a downpour started. It was not normal rain: it was a brutal downpour, the kind that makes the day awful in two minutes. I was going out for a coffee, nothing more, a little coffee before work, but the rain forced me into a little shop while it stopped. The lady saw me soaked, looking really stressed, and said: 'Come in, dear, at your service.'",
    highlights: ["¿Qué más?", "te cuento una vuelta", "parce", "rapidito", "oficina", "resulta que…", "aguacero", "aguacero berraco", "horrible", "tinto", "tintico", "tiendita", "mientras escampa", "empapado", "todo estresado", "bien pueda", "mijo / mija", "a la orden"].map((phrase) => storyHighlights[phrase]).filter(Boolean),
    shadowLine: "Resulta que salí por un tintico y se vino un aguacero berraco.",
  },
  {
    id: "p2",
    text:
      "Me dio pena entrar así, chorreando agua por todas partes, pero la señora fue muy querida. Le dije: 'Qué pena, ¿me regala un tintico?'. Ella respondió: 'Con mucho gusto, querido'. Yo saqué la billetera y ahí fue cuando me di cuenta de que no tenía efectivo. La vuelta es que había dejado las lucas en la otra chaqueta. El tintico costaba dos lucas, que no era nada, pero en ese momento yo no tenía ni una moneda. La señora se rió y dijo: 'Fresco, no se preocupe; me paga después'. Eso me hizo el día.",
    translation:
      "I felt embarrassed entering like that, dripping water everywhere, but the lady was very kind. I said: 'Excuse me, could I have a little coffee?' She answered: 'With pleasure, dear.' I took out my wallet and that was when I realized I had no cash. The thing is I had left my money in my other jacket. The coffee cost two thousand pesos, which was nothing, but at that moment I didn't even have a coin. The lady laughed and said: 'Don't worry, it's fine; pay me later.' That made my day.",
    highlights: ["me dio pena", "querida / querido", "qué pena", "¿me regala…?", "con mucho gusto", "ahí fue cuando…", "me di cuenta de que…", "en efectivo", "la vuelta es que…", "lucas", "dos lucas", "fresco / fresca", "no se preocupe", "me hizo el día"].map((phrase) => storyHighlights[phrase]).filter(Boolean),
    shadowLine: "La vuelta es que había dejado las lucas en la otra chaqueta.",
  },
  {
    id: "p3",
    text:
      "Mientras tanto, mi celular empezó a vibrar. Era Laura, la pelada nueva de la oficina: 'Oye, qué pena molestarte, ¿nos mandas la ubicación?'. Yo le respondí: 'Listo, se la mando ya'. Pero Doña Marta, la señora de la tiendita, me miró seria y dijo: 'Ojo, pilas con ese celular; por acá toca no dar papaya'. Guardé el celular de una, porque tenía razón. En la esquina había medio mundo corriendo por el aguacero y uno todo distraído con el mapa se vuelve presa fácil.",
    translation:
      "Meanwhile, my phone started vibrating. It was Laura, the new girl from the office: 'Hey, sorry to bother you, can you send us the location?' I replied: 'Okay, I'll send it now.' But Doña Marta, the lady from the little shop, looked at me seriously and said: 'Watch out, be careful with that phone; around here you can't make yourself an easy target.' I put away the phone right away, because she was right. On the corner everyone was running because of the downpour and someone distracted with a map becomes an easy target.",
    highlights: ["mientras tanto", "celular", "pelada", "oficina", "oye", "qué pena molestarte", "¿nos mandas…?", "ubicación", "listo", "se la mando ya", "tiendita", "ojo", "pilas", "no dar papaya", "de una", "medio mundo", "aguacero"].map((phrase) => storyHighlights[phrase]).filter(Boolean),
    shadowLine: "Ojo, pilas con ese celular; por acá toca no dar papaya.",
  },
  {
    id: "p4",
    text:
      "Después Andrés mandó una nota de voz todo agitado. 'Parce, me cogió la tarde. Estoy atrapado en el trancón y la buseta viene llenísima'. Yo pensé: ese man sí la pasó mal. Primero el aguacero, luego el trancón, después la buseta imposible. Nos tocó esperar, ni modo. Más bien nos acomodamos en la tiendita. Doña Marta nos dio una arepita caliente y, te juro, esa arepita nos subió el ánimo. Por lo menos estábamos secos, con tinto, y no en medio de la calle.",
    translation:
      "Then Andrés sent a voice note, all worked up. 'Mate, I ended up running late. I'm stuck in traffic and the small bus is completely full.' I thought: that guy really had a rough time. First the downpour, then the traffic jam, then the impossible bus. We had to wait, oh well. Actually, we settled into the little shop. Doña Marta gave us a hot little arepa and, I swear, that little arepa lifted our mood. At least we were dry, with coffee, and not in the middle of the street.",
    highlights: ["nota de voz", "parce", "me cogió la tarde", "atrapado en el trancón", "buseta", "llenísima", "ese man", "sí la pasó mal", "aguacero", "trancón", "nos tocó esperar", "ni modo", "más bien", "tiendita", "arepita", "nos subió el ánimo", "por lo menos", "tinto"].map((phrase) => storyHighlights[phrase]).filter(Boolean),
    shadowLine: "Nos tocó esperar, ni modo; más bien nos quedamos en la tiendita.",
  },
  {
    id: "p5",
    text:
      "Imagínate que al final llegaron Laura, Andrés y hasta mi jefe, todos empapados, todos con cara de novela. Medio mundo quedó muerto de la risa cuando Andrés contó que había corrido tres cuadras detrás de una buseta llenísima. Doña Marta dijo: 'Tranquilos, mijos, aquí caben'. Laura miró la escena y soltó: 'Esto parece una novela'. Yo rematé diciendo: 'Uno sale por un tinto y termina con una aventura'. Todos dijeron: 'Qué nota'. Fue un día cansón, sí, pero también muy bacano.",
    translation:
      "Imagine this: in the end Laura, Andrés, and even my boss arrived, all soaked, all looking like a soap opera. Everyone was cracking up when Andrés said he had run three blocks after a completely full bus. Doña Marta said: 'Relax, dears, there's room here.' Laura looked at the scene and said: 'This is like a soap opera.' I wrapped up by saying: 'You go out for a coffee and end up with an adventure.' Everyone said: 'That's cool.' It was an annoying day, yes, but also very great.",
    highlights: ["imagínate que…", "al final", "empapado", "medio mundo", "muerto de la risa", "buseta", "llenísima", "tranquilos", "mijo / mija", "parece una novela", "rematé diciendo", "uno sale por…", "tinto", "termina con una aventura", "qué nota", "cansón", "bacano / bacana"].map((phrase) => storyHighlights[phrase]).filter(Boolean),
    shadowLine: "Uno sale por un tinto y termina con una aventura.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "reading-q1",
    type: "multiple-choice",
    prompt: "What is the main event of the story?",
    options: ["A normal coffee trip turns into a rainy Colombian adventure", "A person studies alone at home", "A formal office presentation", "A planned bus tour"],
    correctAnswer: "A normal coffee trip turns into a rainy Colombian adventure",
    explanation: "The narrator says he went out for a tintico and the day became an adventure with rain, traffic, and people gathering in a shop.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'A brutal downpour is coming down.'",
    correctAnswer: "se está cayendo un aguacero berraco",
    correctAnswers: ["se esta cayendo un aguacero berraco", "se está cayendo un aguacero berraco"],
    explanation: "The reading uses the Colombian-style weather expression aguacero berraco for a very heavy rain.",
    points: 2,
    skillTag: "vocabulary",
  },
  {
    id: "reading-q3",
    type: "multiple-choice",
    prompt: "Why does Doña Marta say ojo, pilas, no dar papaya?",
    options: ["To warn him about using his phone in public", "To ask for more money", "To invite him to dance", "To complain about coffee"],
    correctAnswer: "To warn him about using his phone in public",
    explanation: "She warns him to protect his celular and not expose himself unnecessarily.",
    points: 1,
    skillTag: "inference",
  },
  {
    id: "reading-q4",
    type: "true-false",
    prompt: "The narrator has enough cash to pay for the tintico immediately.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "He realizes he has no efectivo and left his lucas in another jacket.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "reading-q5",
    type: "order-words",
    prompt: "Order the words to recreate the final lesson.",
    wordBank: ["Uno", "sale", "por", "un", "tinto", "y", "termina", "con", "una", "aventura"],
    correctAnswer: "Uno sale por un tinto y termina con una aventura",
    explanation: "This sentence summarizes the whole reading.",
    points: 2,
    skillTag: "sentence-order",
  },
];

export const colombianSpanishB2Reading: ReadingComprehension = {
  id: "colombian-spanish-b2-reading-aguacero",
  title: "Colombian B2 Reading: Salí por un tinto",
  subtitle: "A long first-person story using every expression from the Colombian speaking lesson.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "reading", "slang", "dialect"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-aguacero-adventure",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: colombianVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the Colombian speaking lesson vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  colombianVocab.slice(0, 10),
  colombianVocab.slice(10, 20),
  colombianVocab.slice(20, 30),
  colombianVocab.slice(30, 40),
  colombianVocab.slice(40, 50),
  colombianVocab.slice(50, 60),
  colombianVocab.slice(60, 70),
  colombianVocab.slice(70),
];

export const colombianSpanishB2Quiz: CheckpointQuiz = {
  id: "colombian-spanish-b2-aguacero-vocab-quiz",
  title: "Colombian Spanish B2: Aguacero Vocabulary Quiz",
  subtitle: "A checkpoint quiz covering every Colombian expression from the speaking lesson.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "quiz", "slang", "dialect"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-aguacero-adventure",
  activityType: "quiz",
  data: {
    description:
      "Match every Colombian expression, then answer context questions about rain, traffic, tiendas, voice notes, and casual storytelling.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "q-context-1",
        type: "multiple-choice",
        prompt: "Which phrase best fits a brutal Colombian rainstorm?",
        options: ["se está cayendo un aguacero berraco", "me hizo el día", "a la orden", "dos lucas"],
        correctAnswer: "se está cayendo un aguacero berraco",
        explanation: "Aguacero berraco describes a really heavy downpour.",
        points: 1,
        skillTag: "context",
      },
      {
        id: "q-context-2",
        type: "multiple-choice",
        prompt: "In a tiendita, which phrase sounds natural when asking for a coffee?",
        options: ["¿Me regala un tintico?", "No dar papaya", "Me cogió la tarde", "Parece una novela"],
        correctAnswer: "¿Me regala un tintico?",
        explanation: "¿Me regala...? is a common Colombian service/request formula.",
        points: 1,
        skillTag: "context",
      },
      {
        id: "q-context-3",
        type: "typed",
        prompt: "Type the phrase meaning 'don't make yourself an easy target'.",
        correctAnswer: "no dar papaya",
        explanation: "No dar papaya is an iconic Colombian warning about not exposing yourself unnecessarily.",
        points: 1,
        skillTag: "vocabulary",
      },
      {
        id: "q-context-4",
        type: "fill-blank",
        prompt: "Complete: Uno sale por un ______ y termina con una aventura.",
        correctAnswer: "tinto",
        explanation: "This sentence uses the final storytelling phrase from the lesson.",
        points: 1,
        skillTag: "collocation",
      },
      {
        id: "q-context-5",
        type: "multiple-choice",
        prompt: "Which phrase means 'I ended up running late'?",
        options: ["me cogió la tarde", "me dio pena", "nos subió el ánimo", "se la mando ya"],
        correctAnswer: "me cogió la tarde",
        explanation: "Me cogió la tarde means the day/time caught up with you and you ended up late.",
        points: 1,
        skillTag: "vocabulary",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`q-match-${index + 1}`, `Match Colombian expressions set ${index + 1}.`, chunk),
      ),
      {
        id: "q-context-6",
        type: "order-words",
        prompt: "Order the words: The thing is I had to wait.",
        wordBank: ["La", "vuelta", "es", "que", "nos", "tocó", "esperar"],
        correctAnswer: "La vuelta es que nos tocó esperar",
        explanation: "This combines la vuelta es que with nos tocó esperar.",
        points: 2,
        skillTag: "sentence-order",
      },
      {
        id: "q-context-7",
        type: "multiple-choice",
        prompt: "Which option best translates 'Qué nota, me hizo el día'?",
        options: ["How cool, it made my day", "How expensive, it cost two thousand", "Be careful, send the location", "No rush, it is raining"],
        correctAnswer: "How cool, it made my day",
        explanation: "Qué nota expresses that something is cool, and me hizo el día means it made my day.",
        points: 1,
        skillTag: "meaning",
      },
    ],
  },
};

