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

const courseId = "mexican-spanish-b1-work-daily-routine";
const skoolSectionName = "Mexican Spanish - B1 Work and Daily Routine";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const workVocab: VocabItem[] = [
  { id: "tener-mucha-chamba", term: "tener mucha chamba", meaning: "to have a lot of work", matchingMeaning: "to have a lot of work", note: "Very common informal Mexican way to say you have lots of work.", example: "Hoy tengo mucha chamba.", translation: "Today I have a lot of work.", starred: true },
  { id: "chamba", term: "chamba", meaning: "work / job", matchingMeaning: "work", note: "Informal Mexican word for work or a job.", example: "Mi chamba queda cerca del metro.", translation: "My job is near the metro.", starred: true },
  { id: "entro-a-las", term: "entro a las…", meaning: "I start work at…", matchingMeaning: "I start work at…", note: "Useful daily-routine phrase for work schedules.", example: "Entro a las ocho.", translation: "I start work at eight.", starred: true },
  { id: "salgo-a-las", term: "salgo a las…", meaning: "I finish / leave work at…", matchingMeaning: "I finish work at…", note: "Use it for leaving work, class, or another regular activity.", example: "Salgo a las seis.", translation: "I finish at six.", starred: true },
  { id: "me-toca", term: "me toca…", meaning: "it’s my turn to… / I have to…", matchingMeaning: "I have to…", note: "Natural way to talk about assigned tasks or obligations.", example: "Me toca abrir la tienda.", translation: "I have to open the shop.", starred: true },
  { id: "me-encargo-de", term: "me encargo de…", meaning: "I’m responsible for… / I handle…", matchingMeaning: "I handle…", note: "Useful for explaining responsibilities simply.", example: "Me encargo de los pedidos.", translation: "I handle the orders.", starred: true },
  { id: "traer-un-pendiente", term: "traer un pendiente", meaning: "to have something unfinished / pending", matchingMeaning: "to have something pending", note: "A pendiente is an unfinished task or loose end.", example: "Traigo un pendiente con la factura.", translation: "I have something pending with the invoice.", starred: true },
  { id: "estar-al-pendiente", term: "estar al pendiente", meaning: "to keep an eye on something / stay on top of it", matchingMeaning: "to keep an eye on it", note: "Mexican phrase for watching or following up on something.", example: "Estoy al pendiente del correo.", translation: "I’m keeping an eye on the email.", starred: true },
  { id: "echar-una-mano", term: "echar una mano", meaning: "to lend a hand / help out", matchingMeaning: "to lend a hand", note: "Friendly informal phrase for helping someone.", example: "¿Me echas una mano con esto?", translation: "Can you lend me a hand with this?", starred: true },
  { id: "andar-a-las-carreras", term: "andar a las carreras", meaning: "to be rushing around", matchingMeaning: "to be rushing around", note: "Used when you are moving quickly and stressed.", example: "Ando a las carreras desde la mañana.", translation: "I’ve been rushing around since the morning.", starred: true },
  { id: "se-me-hizo-tarde", term: "se me hizo tarde", meaning: "I ended up running late", matchingMeaning: "I ended up running late", note: "Very common explanation for being late.", example: "Perdón, se me hizo tarde.", translation: "Sorry, I ended up running late.", starred: true },
  { id: "no-me-da-tiempo", term: "no me da tiempo", meaning: "I don’t have enough time", matchingMeaning: "I don’t have enough time", note: "Useful for explaining limits without sounding dramatic.", example: "No me da tiempo de ir por café.", translation: "I don’t have enough time to get coffee.", starred: true },
  { id: "se-me-junta-el-trabajo", term: "se me junta el trabajo", meaning: "my work piles up", matchingMeaning: "my work piles up", note: "Says tasks accumulate and become hard to manage.", example: "Si no contesto correos, se me junta el trabajo.", translation: "If I don’t answer emails, my work piles up.", starred: true },
  { id: "ponerse-al-corriente", term: "ponerse al corriente", meaning: "to catch up", matchingMeaning: "to catch up", note: "Useful when you are behind and need to get updated.", example: "Hoy quiero ponerme al corriente.", translation: "Today I want to catch up.", starred: true },
  { id: "sacar-pendientes", term: "sacar pendientes", meaning: "to clear / finish pending tasks", matchingMeaning: "to clear pending tasks", note: "Mexican work phrase for finishing loose ends.", example: "Voy a sacar pendientes en la tarde.", translation: "I’m going to clear pending tasks in the afternoon.", starred: true },
  { id: "tengo-que-entregar", term: "tengo que entregar…", meaning: "I have to hand in / deliver…", matchingMeaning: "I have to deliver…", note: "Use for documents, reports, packages, or projects.", example: "Tengo que entregar el reporte hoy.", translation: "I have to deliver the report today.", starred: true },
  { id: "ya-voy-de-salida", term: "ya voy de salida", meaning: "I’m just leaving / on my way out", matchingMeaning: "I’m just leaving", note: "Common message when leaving work or home soon.", example: "Ya voy de salida, nos vemos allá.", translation: "I’m just leaving, see you there.", starred: true },
  { id: "me-toco-trafico", term: "me tocó mucho tráfico", meaning: "I got stuck with a lot of traffic", matchingMeaning: "I got stuck in traffic", note: "Natural Mexican way to explain a traffic delay.", example: "Me tocó mucho tráfico en Insurgentes.", translation: "I got stuck with a lot of traffic on Insurgentes.", starred: true },
  { id: "echarle-ganas", term: "echarle ganas", meaning: "to put in effort / keep at it / give it your best", matchingMeaning: "to put in effort", note: "Very Mexican encouragement phrase.", example: "Hay que echarle ganas esta semana.", translation: "We have to give it our best this week.", starred: true },
  { id: "ya-casi-queda", term: "ya casi queda", meaning: "it’s almost ready / nearly done", matchingMeaning: "it’s almost ready", note: "Useful when a task is close to finished.", example: "Ya casi queda la presentación.", translation: "The presentation is almost ready.", starred: true },
  { id: "me-queda-de-paso", term: "me queda de paso", meaning: "it’s on my way", matchingMeaning: "it’s on my way", note: "Useful for errands, pickups, and work routes.", example: "La papelería me queda de paso.", translation: "The stationery shop is on my way.", starred: true },
  { id: "si-se-complica-te-aviso", term: "si se complica, te aviso", meaning: "if things get complicated, I’ll let you know", matchingMeaning: "if things get complicated, I’ll let you know", note: "Polite phrase for warning someone about possible delays.", example: "Salgo a las seis; si se complica, te aviso.", translation: "I finish at six; if things get complicated, I’ll let you know.", starred: true },
  { id: "sacar-la-chamba", term: "sacar la chamba", meaning: "to get the work done successfully", matchingMeaning: "to get the work done", note: "Informal phrase for completing the job despite pressure.", example: "Entre todos sacamos la chamba.", translation: "Together we got the work done.", starred: true },
  { id: "traer-mucha-chamba", term: "traer mucha chamba", meaning: "to have a heavy workload", matchingMeaning: "to have a heavy workload", note: "Similar to tener mucha chamba, with the feeling of carrying work around.", example: "Esta semana traigo mucha chamba.", translation: "This week I have a heavy workload.", starred: true },
  { id: "echarse-una-mano", term: "echarse una mano", meaning: "to help each other", matchingMeaning: "to help each other", note: "Reciprocal version: people support one another.", example: "Si nos echamos una mano, salimos temprano.", translation: "If we help each other, we leave early.", starred: true },
];

const highlightMap = Object.fromEntries(workVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = workVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB1WorkDailyRoutineFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B1: Work and Daily Routine Flashcards",
  subtitle: "Mexican workday phrases for schedules, traffic, pending tasks, helping out, and getting the job done.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "flashcards", "work", "daily routine"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: workVocab.map(cardFromVocab) },
};

export const mexicanSpanishB1WorkDailyRoutineSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Work and Daily Routine",
  subtitle: "Build natural Mexican Spanish sentences about your job, schedule, traffic, and pending work.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "sentence-builder", "work", "routine"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note explaining your work schedule, one pending task, one delay, and how you will finish the work.",
    stages: [
      stage("stage-1", "Talk about work", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "I have a lot of work. I start at eight and leave at six.", "Tengo mucha chamba. Entro a las ocho y salgo a las seis.", "This gives a simple Mexican work routine.", breakdown([["a lot of work", "mucha chamba"], ["I start at", "entro a las"], ["I leave at", "salgo a las"]])),
      stage("stage-2", "Explain duties", sentenceVocab.slice(4, 8), sentenceVocab.slice(0, 8), "I have to check orders, and I handle one pending task.", "Me toca revisar pedidos y me encargo de un pendiente.", "This practices work responsibilities with me toca and me encargo de.", breakdown([["I have to", "me toca"], ["I handle", "me encargo de"], ["a pending task", "un pendiente"]])),
      stage("stage-3", "Offer help", sentenceVocab.slice(7, 10), sentenceVocab.slice(0, 10), "I’m keeping an eye on the email. Can you lend me a hand?", "Estoy al pendiente del correo. ¿Me echas una mano?", "This sounds collaborative and natural at work.", breakdown([["I’m keeping an eye on", "estoy al pendiente de"], ["the email", "el correo"], ["lend me a hand", "echar una mano"]])),
      stage("stage-4", "Explain a delay", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "I’m rushing around, I ended up running late, and I don’t have enough time.", "Ando a las carreras, se me hizo tarde y no me da tiempo.", "This is a very common message when your morning goes wrong.", breakdown([["I’m rushing around", "ando a las carreras"], ["I ended up running late", "se me hizo tarde"], ["I don’t have enough time", "no me da tiempo"]])),
      stage("stage-5", "Catch up", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "My work piles up, but today I’m going to catch up and clear pending tasks.", "Se me junta el trabajo, pero hoy me voy a poner al corriente y sacar pendientes.", "This practices a realistic catch-up plan.", breakdown([["my work piles up", "se me junta el trabajo"], ["catch up", "ponerme al corriente"], ["clear pending tasks", "sacar pendientes"]])),
      stage("stage-6", "Deliver and leave", sentenceVocab.slice(15, 19), sentenceVocab.slice(0, 19), "I have to deliver the report. I’m just leaving, but I got stuck with a lot of traffic.", "Tengo que entregar el reporte. Ya voy de salida, pero me tocó mucho tráfico.", "This combines deadline, movement, and a Mexican traffic excuse.", breakdown([["I have to deliver", "tengo que entregar"], ["I’m just leaving", "ya voy de salida"], ["I got stuck with traffic", "me tocó mucho tráfico"]])),
      stage("stage-7", "Almost finish", sentenceVocab.slice(18, 22), sentenceVocab.slice(0, 22), "We have to keep at it. It’s almost ready, and the office is on my way.", "Hay que echarle ganas. Ya casi queda y la oficina me queda de paso.", "This keeps the tone positive and practical.", breakdown([["keep at it", "echarle ganas"], ["it’s almost ready", "ya casi queda"], ["it’s on my way", "me queda de paso"]])),
      stage("stage-8", "Finish together", sentenceVocab.slice(21), sentenceVocab, "If things get complicated, I’ll let you know. If we help each other, we get the work done.", "Si se complica, te aviso. Si nos echamos una mano, sacamos la chamba.", "This closes with a practical team solution.", breakdown([["if things get complicated", "si se complica"], ["I’ll let you know", "te aviso"], ["we help each other", "nos echamos una mano"], ["we get the work done", "sacamos la chamba"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-work-story-q1", type: "multiple-choice", prompt: "After message 3, what kind of day is Ana having?", options: ["A very busy workday", "A vacation day", "A shopping day", "A quiet weekend"], correctAnswer: "A very busy workday", explanation: "Ana says she has a lot of chamba and starts at eight.", points: 1, skillTag: "context" },
  { id: "mexican-b1-work-story-q2", type: "multiple-choice", prompt: "After message 6, what does Ana handle at work?", options: ["Orders and an unfinished invoice", "Cooking lunch", "Buying concert tickets", "Cleaning her apartment"], correctAnswer: "Orders and an unfinished invoice", explanation: "She says she handles orders and has a pending invoice.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-work-story-q3", type: "true-false", prompt: "After message 9, true or false: Luis offers to help Ana.", options: ["True", "False"], correctAnswer: "True", explanation: "Luis asks if she wants him to lend a hand.", points: 1, skillTag: "inference" },
  { id: "mexican-b1-work-story-q4", type: "multiple-choice", prompt: "After message 12, why is Ana late?", options: ["She was rushing and the morning got away from her", "She slept all day", "She forgot she had work", "She went to the movies"], correctAnswer: "She was rushing and the morning got away from her", explanation: "Ana says she is rushing around and se me hizo tarde.", points: 1, skillTag: "reason" },
  { id: "mexican-b1-work-story-q5", type: "multiple-choice", prompt: "After message 15, what does Ana want to do before lunch?", options: ["Catch up and clear pending tasks", "Go home immediately", "Buy new shoes", "Cancel her job"], correctAnswer: "Catch up and clear pending tasks", explanation: "She says she wants to ponerse al corriente and sacar pendientes.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-work-story-q6", type: "true-false", prompt: "After message 18, true or false: Ana is already on her way out with the report.", options: ["True", "False"], correctAnswer: "True", explanation: "She says ya voy de salida with the report.", points: 1, skillTag: "sequence" },
  { id: "mexican-b1-work-story-q7", type: "multiple-choice", prompt: "After message 21, what caused Luis to arrive late?", options: ["A lot of traffic", "A broken phone", "A long lunch", "A canceled meeting"], correctAnswer: "A lot of traffic", explanation: "Luis says me tocó mucho tráfico.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-work-story-q8", type: "multiple-choice", prompt: "After message 24, what is almost ready?", options: ["The presentation", "The dinner", "The bus ticket", "The office keys"], correctAnswer: "The presentation", explanation: "Ana says the presentation is almost ready.", points: 1, skillTag: "context" },
  { id: "mexican-b1-work-story-q9", type: "true-false", prompt: "After message 27, true or false: Luis says the print shop is on his way.", options: ["True", "False"], correctAnswer: "True", explanation: "Luis says the print shop queda de paso.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-work-story-q10", type: "multiple-choice", prompt: "After message 30, how do Ana and Luis solve the work problem?", options: ["They help each other and get the work done", "They quit the project", "They ignore the pending tasks", "They blame another coworker"], correctAnswer: "They help each other and get the work done", explanation: "They say they help each other and sacan la chamba.", points: 1, skillTag: "gist" },
];

const storyMessages: StoryMessage[] = [
  message("m1", "ana", "Luis, ¿ya llegaste a la oficina? Hoy tengo mucha chamba.", "Luis, did you already get to the office? I have a lot of work today.", ["tener mucha chamba"]),
  message("m2", "luis", "Voy en camino. ¿Qué pasó con tu chamba?", "I’m on my way. What happened with your work?", ["chamba"]),
  message("m3", "ana", "Entro a las ocho y desde que llegué no he parado.", "I start at eight and since I arrived I haven’t stopped.", ["entro a las…"], "voice-note", `${storyAudioBase}/m3.mp3`),
  message("m4", "luis", "¿Y a qué hora sales hoy?", "And what time do you leave today?", []),
  message("m5", "ana", "Salgo a las seis, pero me toca cerrar el reporte antes.", "I leave at six, but I have to close the report first.", ["salgo a las…", "me toca…"]),
  message("m6", "ana", "También me encargo de los pedidos y traigo un pendiente con una factura.", "I also handle the orders and I have something pending with an invoice.", ["me encargo de…", "traer un pendiente"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "luis", "Va, yo puedo estar al pendiente del correo mientras llego.", "Okay, I can keep an eye on the email while I arrive.", ["estar al pendiente"]),
  message("m8", "ana", "Gracias. Si puedes echar una mano con eso, me salvas.", "Thanks. If you can lend a hand with that, you save me.", ["echar una mano"]),
  message("m9", "luis", "Claro, dime qué correo reviso primero.", "Of course, tell me which email I should check first.", []),
  message("m10", "ana", "El de ventas. Ando a las carreras desde temprano.", "The sales one. I’ve been rushing around since early.", ["andar a las carreras"]),
  message("m11", "luis", "¿Se te hizo tarde otra vez?", "Did you end up running late again?", ["se me hizo tarde"]),
  message("m12", "ana", "Sí, se me hizo tarde y ya no me da tiempo de ir por las copias.", "Yes, I ended up running late and now I don’t have enough time to get the copies.", ["se me hizo tarde", "no me da tiempo"], "voice-note", `${storyAudioBase}/m12.mp3`),
  message("m13", "luis", "No te preocupes. Si no sacas eso temprano, se te junta el trabajo.", "Don’t worry. If you don’t finish that early, your work piles up.", ["se me junta el trabajo"]),
  message("m14", "ana", "Exacto. Hoy quiero ponerme al corriente antes de comer.", "Exactly. Today I want to catch up before lunch.", ["ponerse al corriente"]),
  message("m15", "ana", "Si puedo sacar pendientes antes de la una, ya respiro.", "If I can clear pending tasks before one, I can breathe.", ["sacar pendientes"]),
  message("m16", "luis", "¿Qué tienes que entregar primero?", "What do you have to deliver first?", []),
  message("m17", "ana", "Tengo que entregar el reporte de clientes.", "I have to deliver the client report.", ["tengo que entregar…"]),
  message("m18", "ana", "Ya voy de salida con el archivo para imprimirlo.", "I’m just leaving with the file to print it.", ["ya voy de salida"], "voice-note", `${storyAudioBase}/m18.mp3`),
  message("m19", "luis", "Yo llego en diez, pero me tocó mucho tráfico.", "I’ll arrive in ten, but I got stuck with a lot of traffic.", ["me tocó mucho tráfico"]),
  message("m20", "ana", "Ni modo, hay que echarle ganas. Hoy sí está pesado.", "Oh well, we have to keep at it. Today really is heavy.", ["echarle ganas"]),
  message("m21", "luis", "Sí, pero ya casi queda lo del correo. Solo faltan dos respuestas.", "Yeah, but the email part is almost ready. Only two replies are missing.", ["ya casi queda"]),
  message("m22", "ana", "La papelería me queda de paso, pero no sé si alcance.", "The stationery shop is on my way, but I don’t know if I’ll make it.", ["me queda de paso"]),
  message("m23", "luis", "Si se complica, te aviso y paso yo por las copias.", "If things get complicated, I’ll let you know and I’ll pick up the copies.", ["si se complica, te aviso"]),
  message("m24", "ana", "Gracias. La presentación ya casi queda; solo falta imprimir.", "Thanks. The presentation is almost ready; only printing is left.", ["ya casi queda"], "voice-note", `${storyAudioBase}/m24.mp3`),
  message("m25", "luis", "Va, entre los dos sacamos la chamba.", "Okay, between the two of us we’ll get the work done.", ["sacar la chamba"]),
  message("m26", "ana", "Sí, porque esta semana traigo mucha chamba y ya estoy cansada.", "Yeah, because this week I have a heavy workload and I’m already tired.", ["traer mucha chamba"]),
  message("m27", "luis", "Entonces nos echamos una mano y salimos a tiempo.", "Then we help each other and leave on time.", ["echarse una mano"]),
  message("m28", "ana", "Me late. Tú correo, yo reporte, y luego copias.", "I like it. You handle email, I handle report, and then copies.", []),
  message("m29", "luis", "Listo. Así no se nos junta todo al final del día.", "Done. That way everything doesn’t pile up at the end of the day.", ["se me junta el trabajo"]),
  message("m30", "ana", "Gracias, Luis. Si nos organizamos así, sí sacamos la chamba.", "Thanks, Luis. If we organize ourselves like this, we really get the work done.", ["sacar la chamba"], "voice-note", `${storyAudioBase}/m30.mp3`),
];

export const mexicanSpanishB1WorkDailyRoutineWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B1 | The Busy Workday",
  subtitle: "A practical Mexican Spanish chat where two coworkers handle traffic, pending tasks, and a deadline together.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "story", "work", "routine"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ana", name: "Ana", initials: "A", side: "left", color: "violet" },
      { id: "luis", name: "Luis", initials: "L", side: "right", color: "blue" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `${question.id}-check`, afterMessageId: `m${(index + 1) * 3}`, question })),
    learnedVocab: workVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: workVocab.slice(0, 12).map((item) => item.term),
      grammarPatterns: ["Work schedules with entro a las / salgo a las", "Obligations with me toca and tengo que", "Delay explanations with se me hizo tarde and no me da tiempo"],
      speakingPrompts: ["Describe your work schedule.", "Explain one reason you are late.", "Ask a coworker for help with a pending task."],
    },
    completionTask: {
      title: "Send a workday update",
      instructions: "Record a Mexican Spanish voice note explaining your schedule, one pending task, and how you will get the work done.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En México, «chamba» es una palabra muy común para hablar del trabajo de forma informal. Puedes decir «tengo mucha chamba» cuando tu día está lleno, o «traigo mucha chamba» cuando sientes que cargas muchas tareas encima.", translation: "In Mexico, chamba is a very common word to talk about work informally. You can say tengo mucha chamba when your day is full, or traigo mucha chamba when you feel you are carrying many tasks.", highlights: highlights(["chamba", "tener mucha chamba", "traer mucha chamba"]), shadowLine: "Hoy tengo mucha chamba." },
  { id: "p2", text: "Para explicar tu horario, usa frases simples como «entro a las ocho» y «salgo a las seis». Estas frases son directas y útiles en una conversación diaria. También puedes decir «me toca cerrar» cuando es tu responsabilidad hacerlo.", translation: "To explain your schedule, use simple phrases like entro a las ocho and salgo a las seis. These phrases are direct and useful in daily conversation. You can also say me toca cerrar when it is your responsibility to do it.", highlights: highlights(["entro a las…", "salgo a las…", "me toca…"]), shadowLine: "Entro a las ocho y salgo a las seis." },
  { id: "p3", text: "Si quieres hablar de responsabilidades, «me encargo de…» es una frase muy clara. Por ejemplo: «me encargo de los pedidos». Cuando algo todavía no está terminado, puedes decir «traigo un pendiente» y pedir que alguien esté «al pendiente».", translation: "If you want to talk about responsibilities, me encargo de is a very clear phrase. For example: me encargo de los pedidos. When something is still not finished, you can say traigo un pendiente and ask someone to stay on top of it.", highlights: highlights(["me encargo de…", "traer un pendiente", "estar al pendiente"]), shadowLine: "Me encargo de los pedidos y traigo un pendiente." },
  { id: "p4", text: "En un día pesado, pedir ayuda es normal. «¿Me echas una mano?» suena amable y cercano. Si dos personas trabajan juntas, también puedes decir «nos echamos una mano», porque la ayuda va en las dos direcciones.", translation: "On a heavy day, asking for help is normal. Me echas una mano sounds friendly and close. If two people work together, you can also say nos echamos una mano, because help goes both ways.", highlights: highlights(["echar una mano", "echarse una mano"]), shadowLine: "¿Me echas una mano con esto?" },
  { id: "p5", text: "Cuando el día empieza mal, puedes decir «ando a las carreras». Si llegas tarde, «se me hizo tarde» explica la situación de forma natural. Y cuando no alcanzas a hacer algo, «no me da tiempo» es una frase muy útil.", translation: "When the day starts badly, you can say ando a las carreras. If you arrive late, se me hizo tarde explains the situation naturally. And when you cannot manage to do something, no me da tiempo is very useful.", highlights: highlights(["andar a las carreras", "se me hizo tarde", "no me da tiempo"]), shadowLine: "Ando a las carreras y no me da tiempo." },
  { id: "p6", text: "Si no organizas tus tareas, «se me junta el trabajo». Para recuperarte, necesitas «ponerte al corriente» y «sacar pendientes». Estas frases sirven mucho para hablar de una mañana ocupada sin usar español demasiado formal.", translation: "If you do not organize your tasks, se me junta el trabajo. To recover, you need to ponerte al corriente and sacar pendientes. These phrases are very useful to talk about a busy morning without using overly formal Spanish.", highlights: highlights(["se me junta el trabajo", "ponerse al corriente", "sacar pendientes"]), shadowLine: "Tengo que ponerme al corriente y sacar pendientes." },
  { id: "p7", text: "En la chamba, muchas veces dices «tengo que entregar…» antes de una fecha límite. Si ya te vas, puedes mandar «ya voy de salida». Y si llegas tarde por la ciudad, «me tocó mucho tráfico» explica el retraso de manera natural.", translation: "At work, you often say tengo que entregar before a deadline. If you are leaving, you can send ya voy de salida. And if you arrive late because of the city, me tocó mucho tráfico explains the delay naturally.", highlights: highlights(["tengo que entregar…", "ya voy de salida", "me tocó mucho tráfico"]), shadowLine: "Tengo que entregar el reporte y ya voy de salida." },
  { id: "p8", text: "Para cerrar bien, México tiene frases muy positivas. «Échale ganas» anima a alguien a seguir. «Ya casi queda» dice que falta poco. Y «sacar la chamba» significa lograr terminar el trabajo, especialmente cuando el día estuvo pesado.", translation: "To close well, Mexico has very positive phrases. Échale ganas encourages someone to keep going. Ya casi queda says there is little left. And sacar la chamba means managing to finish the work, especially when the day was heavy.", highlights: highlights(["echarle ganas", "ya casi queda", "sacar la chamba"]), shadowLine: "Échale ganas, ya casi queda." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-work-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Mexican phrases for work and daily routine", "How to flirt in Mexican Spanish", "How to complain at a restaurant", "How to describe a vacation"], correctAnswer: "Mexican phrases for work and daily routine", explanation: "The reading explains schedule, tasks, delays, help, and finishing work.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-work-reading-q2", type: "multiple-choice", prompt: "Which phrase means I start work at…?", options: ["Entro a las…", "Salgo a las…", "No me da tiempo", "Ya casi queda"], correctAnswer: "Entro a las…", explanation: "Entro a las… is used to say what time you start.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-work-reading-q3", type: "true-false", prompt: "True or false: Echar una mano means to help out.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says ¿me echas una mano? is a friendly way to ask for help.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-work-reading-q4", type: "multiple-choice", prompt: "Which phrase explains that your work piles up?", options: ["Se me junta el trabajo", "Me queda de paso", "Ya voy de salida", "Entro a las ocho"], correctAnswer: "Se me junta el trabajo", explanation: "Se me junta el trabajo means my work piles up.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-work-reading-q5", type: "multiple-choice", prompt: "What does ya casi queda mean?", options: ["It’s almost ready", "I start work at eight", "I got stuck in traffic", "It’s my turn"], correctAnswer: "It’s almost ready", explanation: "Ya casi queda means something is almost finished.", points: 1, skillTag: "meaning" },
];

export const mexicanSpanishB1WorkDailyRoutineReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B1 Reading: A Busy Day at Work",
  subtitle: "A synced Spanish reading about Mexican workday phrases, delays, help, and finishing tasks.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "reading", "shadowing", "work"],
  estimatedMinutes: 14,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: workVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-work-quiz-q1", type: "multiple-choice", prompt: "You want to say you have lots of work today. Which phrase fits?", options: ["Tengo mucha chamba", "Me queda de paso", "Ya casi queda", "Salgo a las seis"], correctAnswer: "Tengo mucha chamba", explanation: "Tener mucha chamba means to have a lot of work.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-work-quiz-q2", type: "fill-blank", prompt: "Complete: ___ a las ocho y salgo a las seis.", correctAnswer: "Entro", explanation: "Entro a las… means I start work at…", points: 1, skillTag: "schedule" },
  { id: "mexican-b1-work-quiz-q3", type: "multiple-choice", prompt: "You are responsible for the emails. What do you say?", options: ["Me encargo de los correos", "Se me hizo tarde", "Ya voy de salida", "Me tocó tráfico"], correctAnswer: "Me encargo de los correos", explanation: "Me encargo de… means I handle or I’m responsible for.", points: 1, skillTag: "responsibility" },
  { id: "mexican-b1-work-quiz-q4", type: "true-false", prompt: "True or false: Traer un pendiente means to have something unfinished.", options: ["True", "False"], correctAnswer: "True", explanation: "A pendiente is an unfinished or pending task.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-work-quiz-q5", type: "order-words", prompt: "Order the words: I ended up running late.", wordBank: ["se", "me", "hizo", "tarde"], correctAnswer: "se me hizo tarde", explanation: "Se me hizo tarde is the natural phrase for running late.", points: 1, skillTag: "syntax" },
  { id: "mexican-b1-work-quiz-q6", type: "multiple-choice", prompt: "You want help from a coworker. Which phrase fits best?", options: ["¿Me echas una mano?", "Me toca mucho tráfico", "Salgo a las…", "Ya casi queda"], correctAnswer: "¿Me echas una mano?", explanation: "Echar una mano means to lend a hand.", points: 1, skillTag: "context" },
  { id: "mexican-b1-work-quiz-q7", type: "fill-blank", prompt: "Complete: No me da ___ de ir por las copias.", correctAnswer: "tiempo", explanation: "No me da tiempo means I don’t have enough time.", points: 1, skillTag: "phrase" },
  { id: "mexican-b1-work-quiz-q8", type: "true-false", prompt: "True or false: Ya voy de salida means I’m just leaving.", options: ["True", "False"], correctAnswer: "True", explanation: "Ya voy de salida is a common message when you are on your way out.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-work-quiz-q9", type: "order-words", prompt: "Order the words: we get the work done.", wordBank: ["sacamos", "la", "chamba"], correctAnswer: "sacamos la chamba", explanation: "Sacar la chamba means to get the work done.", points: 1, skillTag: "syntax" },
  { id: "mexican-b1-work-quiz-q10", type: "multiple-choice", prompt: "Which phrase means it’s on my way?", options: ["Me queda de paso", "Me toca cerrar", "Se me junta el trabajo", "Traigo mucha chamba"], correctAnswer: "Me queda de paso", explanation: "Me queda de paso means the place is on your route.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-work-quiz-q11", type: "match-pairs", prompt: "Match the schedule phrases.", pairs: [{ left: "entro a las…", right: "I start work at…" }, { left: "salgo a las…", right: "I leave work at…" }, { left: "ya voy de salida", right: "I’m just leaving" }, { left: "me tocó mucho tráfico", right: "I got stuck with traffic" }], explanation: "These phrases explain schedules and movement.", points: 4, skillTag: "matching" },
  { id: "mexican-b1-work-quiz-q12", type: "match-pairs", prompt: "Match the work-task phrases.", pairs: [{ left: "me encargo de…", right: "I handle…" }, { left: "traer un pendiente", right: "to have something pending" }, { left: "sacar pendientes", right: "to clear pending tasks" }, { left: "tengo que entregar…", right: "I have to deliver…" }], explanation: "These expressions describe responsibilities and pending work.", points: 4, skillTag: "tasks" },
  { id: "mexican-b1-work-quiz-q13", type: "match-pairs", prompt: "Match the pressure and help phrases.", pairs: [{ left: "andar a las carreras", right: "to be rushing around" }, { left: "se me junta el trabajo", right: "my work piles up" }, { left: "echarle ganas", right: "to keep at it" }, { left: "echarse una mano", right: "to help each other" }], explanation: "These phrases describe stress, effort, and teamwork.", points: 4, skillTag: "workday" },
];

export const mexicanSpanishB1WorkDailyRoutineQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican B1 Quiz: Work and Daily Routine",
  subtitle: "Test Mexican Spanish phrases for work schedules, traffic, pending tasks, and helping coworkers.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "quiz", "work", "routine"],
  estimatedMinutes: 12,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B1 work and daily routine phrases in realistic situations.",
    passScore: 80,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
