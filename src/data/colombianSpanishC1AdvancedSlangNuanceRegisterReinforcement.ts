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

const courseId = "colombian-spanish-c1-advanced-slang-nuance-register";
const sectionName = "Colombian Spanish - C1 Advanced Slang, Nuance and Register";

const colombianRegisterVocab: VocabItem[] = [
  { id: "hablar-en-plata-blanca", term: "hablar en plata blanca", meaning: "to speak plainly / be completely direct", matchingMeaning: "speak plainly", note: "Used when you want to stop softening and say the real point clearly.", example: "Le hablo en plata blanca: esto no puede seguir así.", translation: "I’m going to be straight with you: this can’t continue like this.", starred: true },
  { id: "mamar-gallo", term: "mamar gallo", meaning: "to joke around / mess around / not take something seriously / stall through joking", matchingMeaning: "mess around / stall by joking", note: "Can be playful or evasive depending on the situation.", example: "No me mame gallo con eso.", translation: "Don’t mess me around with that.", starred: true },
  { id: "darse-garra", term: "darse garra", meaning: "to go too far / overdo it / cross the line", matchingMeaning: "go too far", note: "A strong Colombian judgment when someone overdoes a joke, demand, or criticism.", example: "Una cosa es mamar gallo y otra darse garra.", translation: "Joking is one thing; going too far is another.", starred: true },
  { id: "poner-pereque", term: "poner pereque", meaning: "to make a fuss / pester / create unnecessary hassle", matchingMeaning: "make a fuss", note: "Informal; often used when someone complicates a simple situation.", example: "No ponga tanto pereque por una firma.", translation: "Don’t make such a fuss over a signature.", starred: true },
  { id: "dar-lidia", term: "dar lidia", meaning: "to cause trouble / be a hassle / give someone a hard time", matchingMeaning: "be a hassle", note: "Very useful for tasks, people, systems, or processes that are troublesome.", example: "Esto está dando mucha lidia.", translation: "This is causing a lot of hassle.", starred: true },
  { id: "hablar-carreta", term: "hablar carreta", meaning: "to talk nonsense / waffle / make things up", matchingMeaning: "talk nonsense", note: "Stronger than just talking a lot; it suggests empty or invented talk.", example: "No hable carreta si no sabe qué pasó.", translation: "Don’t talk nonsense if you don’t know what happened.", starred: true },
  { id: "sacar-el-cuerpo", term: "sacar el cuerpo", meaning: "to dodge responsibility / avoid dealing with something", matchingMeaning: "dodge responsibility", note: "Used when someone avoids an issue instead of facing it.", example: "Usted le está sacando el cuerpo al problema.", translation: "You’re dodging the issue.", starred: true },
  { id: "cantaletear", term: "cantaletear", meaning: "to nag / repeatedly complain or lecture", matchingMeaning: "nag repeatedly", note: "Very Colombian family/workplace tone; can sound dismissive if used badly.", example: "No me cantaletee tanto.", translation: "Don’t keep nagging me.", starred: true },
  { id: "cantaleta", term: "cantaleta", meaning: "nagging / repeated complaining", matchingMeaning: "nagging", note: "The noun for repeated lecturing or complaints.", example: "Otra vez la misma cantaleta.", translation: "The same nagging again.", starred: true },
  { id: "sacarle-la-chispa", term: "sacarle la chispa a alguien", meaning: "to irritate someone / get on someone’s nerves", matchingMeaning: "get on someone’s nerves", note: "Signals that someone is close to losing patience.", example: "Me va a sacar la chispa.", translation: "You’re going to get on my nerves.", starred: true },
  { id: "poner-sebo", term: "poner sebo", meaning: "to keep bothering or pestering someone", matchingMeaning: "keep pestering", note: "Informal and vivid; use with people who keep pushing.", example: "No me ponga más sebo con ese tema.", translation: "Stop bothering me about that topic.", starred: true },
  { id: "quedarse-viendo-un-chispero", term: "quedarse viendo un chispero", meaning: "to end up disappointed / get nothing after expecting something", matchingMeaning: "end up with nothing", note: "Used after someone expected a result and got nothing.", example: "Prometieron ayuda y quedé viendo un chispero.", translation: "They promised help and I ended up with nothing.", starred: true },
  { id: "dejar-metido", term: "dejar metido", meaning: "to stand someone up / leave someone waiting", matchingMeaning: "stand someone up", note: "Can be romantic, social, or work-related.", example: "Me dejó metido en la reunión.", translation: "He left me waiting in the meeting.", starred: true },
  { id: "quedarse-con-los-crespos-hechos", term: "quedarse con los crespos hechos", meaning: "to be left all ready for something that never happens", matchingMeaning: "get ready for nothing", note: "Classic Colombian image: you got ready, but the event never happened.", example: "Nos quedamos con los crespos hechos.", translation: "We got all ready for nothing.", starred: true },
  { id: "quedarse-de-ese-tamano", term: "quedarse de ese tamaño", meaning: "for something to remain unresolved / leave it there without a solution", matchingMeaning: "remain unresolved", note: "Says the issue stopped there and never got fixed.", example: "Eso se quedó de ese tamaño.", translation: "That was left unresolved.", starred: true },
  { id: "quedarse-deteniendo-la-pena", term: "quedarse deteniendo la peña", meaning: "to be left carrying the whole responsibility alone", matchingMeaning: "carry the whole burden alone", note: "Regional/colloquial; use it to describe being abandoned with the responsibility.", example: "Quedé deteniendo la peña mientras todos se fueron.", translation: "I got left carrying the whole burden while everyone left.", starred: true },
  { id: "descrestar", term: "descrestar", meaning: "to impress / amaze / wow someone", matchingMeaning: "impress someone", note: "Often used for trying too hard to impress.", example: "No tiene que descrestar a nadie.", translation: "You don’t have to impress anybody.", starred: true },
  { id: "ponerse-de-ruana", term: "ponerse de ruana", meaning: "to take over something and do whatever you want with it", matchingMeaning: "take over and do whatever", note: "Strong Colombian phrase for abusing control or acting like the rules don’t apply.", example: "Se puso de ruana con todo el proyecto.", translation: "He took over the whole project and did whatever he wanted.", starred: true },
  { id: "tirar-caja", term: "tirar caja", meaning: "to laugh hard / crack up — especially Antioquia/Medellín usage", matchingMeaning: "laugh hard", note: "Regional flavor; especially Paisa/Medellín usage.", example: "Tiramos caja con esa historia.", translation: "We laughed our heads off at that story.", starred: true },
  { id: "ser-para-los-de-ruana", term: "ser para los de ruana", meaning: "to be a rule/burden that mainly affects ordinary people", matchingMeaning: "burden ordinary people", note: "Social/political register: rules or burdens fall on regular people, not the powerful.", example: "Eso siempre es para los de ruana.", translation: "That always ends up falling on ordinary people.", starred: true },
  { id: "lora-mojada", term: "hablar más que una lora mojada", meaning: "to talk endlessly / talk someone’s ear off", matchingMeaning: "talk endlessly", note: "Colorful and humorous, but can sound mocking.", example: "Habla más que una lora mojada.", translation: "He never stops talking.", starred: true },
  { id: "estar-como-un-chupo", term: "estar como un chupo", meaning: "to be completely exhausted / worn out", matchingMeaning: "be exhausted", note: "Informal Colombian way to say you are drained.", example: "Quedé como un chupo después de todo eso.", translation: "I was completely exhausted after all that.", starred: true },
];

const highlightMap = Object.fromEntries(
  colombianRegisterVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]),
);

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
    acceptedAnswers,
    hints,
    prompt,
    targetAnswer,
    explanation,
    wordBreakdown,
    audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3`,
  };
}

const sentenceVocab = colombianRegisterVocab.map((item) => `${item.term} = ${item.meaning}`);

export const colombianSpanishC1AdvancedSlangNuanceRegisterFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Colombian Spanish C1: Advanced Slang, Nuance & Register Flashcards",
  subtitle: "Advanced Colombian chunks for directness, joking, hassle, disappointment, exhaustion, and social register.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "flashcards", "slang", "register"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { cards: colombianRegisterVocab.map(cardFromVocab) },
};

export const colombianSpanishC1AdvancedSlangNuanceRegisterSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Colombian Slang, Nuance & Register",
  subtitle: "Build Colombian C1 sentences for being direct, calling out avoidance, managing fuss, and naming disappointment.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["colombian-spanish", "c1", "sentence-builder", "slang", "register"],
  estimatedMinutes: 17,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 90-second Colombian-style voice note about a messy group project: be direct, call out joking/avoidance, describe the hassle, and explain how you ended up exhausted.",
    stages: [
      stage("stage-1", "Speak plainly", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "I’ll be straight with you: don’t mess me around with that.", "Le hablo en plata blanca: no me mame gallo con eso.", "Plata blanca marks directness. Mamar gallo can mean joking or stalling through jokes.", breakdown([["I’ll be straight with you", "Le hablo en plata blanca"], ["don’t mess me around", "no me mame gallo"], ["with that", "con eso"]])),
      stage("stage-2", "Call out going too far", sentenceVocab.slice(1, 5), sentenceVocab.slice(0, 5), "Joking is one thing; going too far is another. Don’t make such a fuss.", "Una cosa es mamar gallo y otra darse garra. No ponga tanto pereque.", "Darse garra judges excess. Poner pereque means creating unnecessary hassle.", breakdown([["Joking is one thing", "Una cosa es mamar gallo"], ["going too far is another", "otra darse garra"], ["Don’t make such a fuss", "No ponga tanto pereque"]])),
      stage("stage-3", "Name the hassle", sentenceVocab.slice(4, 7), sentenceVocab.slice(0, 7), "This is causing a lot of hassle. Don’t talk nonsense, and don’t dodge the issue.", "Esto está dando mucha lidia. No hable carreta y no le saque el cuerpo al tema.", "Dar lidia names the burden. Hablar carreta and sacar el cuerpo call out empty talk and avoidance.", breakdown([["This is causing a lot of hassle", "Esto está dando mucha lidia"], ["Don’t talk nonsense", "No hable carreta"], ["don’t dodge the issue", "no le saque el cuerpo al tema"]])),
      stage("stage-4", "Stop the nagging", sentenceVocab.slice(7, 11), sentenceVocab.slice(0, 11), "Don’t keep nagging me; you’re going to get on my nerves. Stop pestering me.", "No me cantaletee tanto; me va a sacar la chispa. No me ponga más sebo.", "Cantaletear is repeated lecturing. Sacar la chispa means pushing someone toward irritation.", breakdown([["Don’t keep nagging me", "No me cantaletee tanto"], ["you’re going to get on my nerves", "me va a sacar la chispa"], ["Stop pestering me", "No me ponga más sebo"]])),
      stage("stage-5", "Describe disappointment", sentenceVocab.slice(11, 15), sentenceVocab.slice(0, 15), "I ended up with nothing. He stood me up, and we got ready for nothing.", "Quedé viendo un chispero. Me dejó metido y nos quedamos con los crespos hechos.", "These phrases describe expectation followed by disappointment or abandonment.", breakdown([["I ended up with nothing", "Quedé viendo un chispero"], ["He stood me up", "Me dejó metido"], ["we got ready for nothing", "nos quedamos con los crespos hechos"]])),
      stage("stage-6", "Unresolved burden", sentenceVocab.slice(14, 17), sentenceVocab.slice(0, 17), "That was left unresolved, and I got left carrying the whole burden.", "Eso se quedó de ese tamaño y quedé deteniendo la peña.", "Quedarse de ese tamaño says the issue stayed unresolved. Deteniendo la peña means carrying the responsibility alone.", breakdown([["That was left unresolved", "Eso se quedó de ese tamaño"], ["I got left", "quedé"], ["carrying the whole burden", "deteniendo la peña"]])),
      stage("stage-7", "Power and ordinary people", sentenceVocab.slice(16, 20), sentenceVocab.slice(0, 20), "You don’t have to impress anybody. He took over everything, and that always falls on ordinary people.", "No tiene que descrestar a nadie. Se puso de ruana con todo, y eso siempre es para los de ruana.", "Descrestar is impressing. Ponerse de ruana means taking over; para los de ruana adds social commentary.", breakdown([["You don’t have to impress anybody", "No tiene que descrestar a nadie"], ["He took over everything", "Se puso de ruana con todo"], ["that always falls on ordinary people", "eso siempre es para los de ruana"]])),
      stage("stage-8", "Laugh, talk, exhaustion", sentenceVocab.slice(18), sentenceVocab, "We laughed our heads off, but he talks endlessly and I ended up exhausted.", "Tiramos caja, pero habla más que una lora mojada y quedé como un chupo.", "Tirar caja is especially Paisa/Medellín. Como un chupo means completely worn out.", breakdown([["We laughed our heads off", "Tiramos caja"], ["he talks endlessly", "habla más que una lora mojada"], ["I ended up exhausted", "quedé como un chupo"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "colombian-c1-register-story-q1", type: "multiple-choice", prompt: "What is the main problem in the chat?", options: ["A group project became messy and people avoided responsibility", "A restaurant order was wrong", "Someone lost a passport", "A bus was delayed"], correctAnswer: "A group project became messy and people avoided responsibility", explanation: "The chat is about a project where people joke, avoid responsibility, and leave others carrying the burden.", points: 1, skillTag: "gist" },
  { id: "colombian-c1-register-story-q2", type: "multiple-choice", prompt: "Why does Ana say “no me mame gallo”?", options: ["Because Juan is joking instead of taking the issue seriously", "Because Juan is tired", "Because she wants coffee", "Because the meeting ended well"], correctAnswer: "Because Juan is joking instead of taking the issue seriously", explanation: "Mamar gallo can mean messing around or stalling through jokes.", points: 1, skillTag: "tone" },
  { id: "colombian-c1-register-story-q3", type: "true-false", prompt: "True or false: “darse garra” means going too far.", correctAnswer: "true", explanation: "Ana uses it to say the joking crossed the line.", points: 1, skillTag: "excess" },
  { id: "colombian-c1-register-story-q4", type: "multiple-choice", prompt: "What does Juan do when he “le saca el cuerpo” to the topic?", options: ["He dodges the responsibility", "He solves the problem", "He laughs hard", "He impresses everyone"], correctAnswer: "He dodges the responsibility", explanation: "Sacar el cuerpo means to avoid dealing with a responsibility or issue.", points: 1, skillTag: "avoidance" },
  { id: "colombian-c1-register-story-q5", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Stop pestering me.", wordBank: ["No", "me", "ponga", "más", "sebo."], correctAnswer: "No me ponga más sebo.", explanation: "Poner sebo means to keep pestering or bothering someone.", points: 1, skillTag: "pestering" },
  { id: "colombian-c1-register-story-q6", type: "multiple-choice", prompt: "What happened when the client did not arrive?", options: ["They got ready for nothing", "They finished early", "They changed cities", "They laughed at a movie"], correctAnswer: "They got ready for nothing", explanation: "Ana says they quedaron con los crespos hechos.", points: 1, skillTag: "disappointment" },
  { id: "colombian-c1-register-story-q7", type: "multiple-choice", prompt: "Who is left carrying the burden?", options: ["Ana", "The client", "Nobody", "The intern only"], correctAnswer: "Ana", explanation: "Ana says she quedó deteniendo la peña.", points: 1, skillTag: "responsibility" },
  { id: "colombian-c1-register-story-q8", type: "true-false", prompt: "True or false: “ponerse de ruana” describes taking over and acting as if everything belongs to you.", correctAnswer: "true", explanation: "That is the meaning used in the chat.", points: 1, skillTag: "power" },
  { id: "colombian-c1-register-story-q9", type: "multiple-choice", prompt: "Which phrase means laughing hard?", options: ["tirar caja", "hablar carreta", "dar lidia", "poner pereque"], correctAnswer: "tirar caja", explanation: "Tirar caja means to laugh hard, especially in Antioquia/Medellín usage.", points: 1, skillTag: "regional" },
  { id: "colombian-c1-register-story-q10", type: "multiple-choice", prompt: "How does Ana feel at the end?", options: ["Completely exhausted", "Very formal", "Lost in traffic", "Ready to party"], correctAnswer: "Completely exhausted", explanation: "She says quedó como un chupo.", points: 1, skillTag: "exhaustion" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const colombianSpanishC1AdvancedSlangNuanceRegisterWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Colombian C1 Story: The Project That Gave Lidia",
  subtitle: "A two-person chat about a group project, evasive joking, social friction, disappointment, and Colombian register control.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "WhatsApp", "slang", "register"],
  estimatedMinutes: 20,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ana", name: "Ana", initials: "A", side: "left", color: "violet" },
      { id: "juan", name: "Juan", initials: "J", side: "right", color: "blue" },
    ],
    messages: [
      message("m1", "ana", "Juan, le hablo en plata blanca: el proyecto está dando mucha lidia.", "Juan, I’ll be straight with you: the project is causing a lot of hassle.", ["hablar en plata blanca", "dar lidia"], "voice-note", `${storyAudioBase}/m1.mp3`),
      message("m2", "juan", "¿Tan grave? Yo pensé que era un pereque normal de cliente.", "That serious? I thought it was normal client fuss.", ["poner pereque"]),
      message("m3", "ana", "No, esto ya no es pereque normal. Nos están cambiando todo a última hora.", "No, this is not normal fuss anymore. They are changing everything at the last minute.", ["poner pereque"]),
      message("m4", "juan", "Bueno, respire. Tampoco nos demos garra con el drama.", "Well, breathe. Let’s not overdo the drama either.", ["darse garra"]),
      message("m5", "ana", "No me mame gallo con eso. Una cosa es mamar gallo y otra darse garra.", "Don’t mess me around with that. Joking is one thing; going too far is another.", ["mamar gallo", "darse garra"]),
      message("m6", "juan", "Listo, tiene razón. Hablemos serio entonces.", "Okay, you’re right. Let’s talk seriously then.", [], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "ana", "El proveedor está hablando carreta. Promete fechas que no puede cumplir.", "The provider is talking nonsense. He promises dates he can’t meet.", ["hablar carreta"]),
      message("m8", "juan", "Y Camilo le está sacando el cuerpo al tema, ¿cierto?", "And Camilo is dodging the issue, right?", ["sacar el cuerpo"]),
      message("m9", "ana", "Total. Cada vez que pregunto, sale con un chiste.", "Totally. Every time I ask, he comes out with a joke.", []),
      message("m10", "juan", "No quiero cantaletear, pero eso toca frenarlo hoy.", "I don’t want to nag, but we have to stop that today.", ["cantaletear"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "ana", "Sí, pero sin la misma cantaleta de siempre porque ahí nadie escucha.", "Yes, but without the same nagging as always because then nobody listens.", ["cantaleta"]),
      message("m12", "juan", "Entiendo. Igual Camilo me va a sacar la chispa.", "I get it. Still, Camilo is going to get on my nerves.", ["sacarle la chispa a alguien"]),
      message("m13", "ana", "A mí también. Y el cliente no deja de poner sebo por WhatsApp.", "Mine too. And the client won’t stop pestering us on WhatsApp.", ["poner sebo"]),
      message("m14", "juan", "No me ponga más sebo, le voy a decir así tal cual.", "Stop pestering me, I’m going to tell him exactly that.", ["poner sebo"]),
      message("m15", "ana", "Suave. En plata blanca, sí; grosero, no.", "Careful. Plainly, yes; rude, no.", ["hablar en plata blanca"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "juan", "Bueno. ¿Y la reunión de las dos?", "Okay. And the two o’clock meeting?", []),
      message("m17", "ana", "El cliente me dejó metida. Me conecté, preparé todo y nada.", "The client stood me up. I logged in, prepared everything, and nothing.", ["dejar metido"]),
      message("m18", "juan", "Qué piedra. Quedó viendo un chispero.", "How annoying. You ended up with nothing.", ["quedarse viendo un chispero"]),
      message("m19", "ana", "Peor: nos quedamos con los crespos hechos con toda la presentación lista.", "Worse: we got all ready for nothing with the whole presentation ready.", ["quedarse con los crespos hechos"]),
      message("m20", "juan", "Y seguro eso se quedó de ese tamaño si nadie reclama.", "And I bet that was left unresolved if nobody complains.", ["quedarse de ese tamaño"], "voice-note", `${storyAudioBase}/m20.mp3`),
      message("m21", "ana", "Exacto. Y adivine quién quedó deteniendo la peña.", "Exactly. And guess who was left carrying the burden.", ["quedarse deteniendo la peña"]),
      message("m22", "juan", "Usted, obvio. Siempre le dejan la peña a la más juiciosa.", "You, obviously. They always leave the burden to the most responsible one.", ["quedarse deteniendo la peña"]),
      message("m23", "ana", "Y después quieren que uno descreste con resultados imposibles.", "And then they want you to impress everyone with impossible results.", ["descrestar"]),
      message("m24", "juan", "No tiene que descrestar a nadie. Toca poner límites.", "You don’t have to impress anybody. We need to set limits.", ["descrestar"]),
      message("m25", "ana", "Camilo se puso de ruana con el cronograma y ahora todos pagamos.", "Camilo took over the schedule and did whatever he wanted, and now we all pay.", ["ponerse de ruana"], "voice-note", `${storyAudioBase}/m25.mp3`),
      message("m26", "juan", "Eso siempre es para los de ruana: el error arriba, el trabajo abajo.", "That always falls on ordinary people: the mistake up top, the work below.", ["ser para los de ruana"]),
      message("m27", "ana", "Tal cual. Y cuando uno reclama, dicen que uno habla más que una lora mojada.", "Exactly. And when you complain, they say you talk endlessly.", ["hablar más que una lora mojada"]),
      message("m28", "juan", "Bueno, al menos con esa frase tiramos caja un rato.", "Well, at least with that phrase we laughed hard for a bit.", ["tirar caja"]),
      message("m29", "ana", "Sí, tiramos caja, pero quedé como un chupo.", "Yes, we laughed hard, but I ended up exhausted.", ["tirar caja", "estar como un chupo"]),
      message("m30", "juan", "Mañana hablamos en plata blanca, sin carreta y sin sacar el cuerpo.", "Tomorrow we speak plainly, no nonsense, and no dodging responsibility.", ["hablar en plata blanca", "hablar carreta", "sacar el cuerpo"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `colombian-c1-register-check-${index + 1}`,
      afterMessageId: `m${Math.min((index + 1) * 3, 30)}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: colombianRegisterVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: colombianRegisterVocab.map((item) => item.term),
      grammarPatterns: ["Register contrast: direct but not rude with hablar en plata blanca.", "Negative command patterns: no me mame gallo, no ponga pereque, no hable carreta.", "Result phrases: quedé viendo un chispero, quedamos con los crespos hechos, quedé como un chupo."],
      speakingPrompts: ["Call out someone who is dodging responsibility.", "Explain a situation that gave you lidia.", "Describe being left ready for something that never happened.", "Set a direct boundary without sounding rude."],
    },
    completionTask: {
      title: "Your Colombian C1 register voice note",
      instructions: "Record a 90-second voice note about a messy responsibility problem. Use at least eight Colombian C1 expressions and control the tone: direct, but not rude.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Colombia, “hablar en plata blanca” no es insultar; es quitarle vueltas al asunto. Sirve cuando alguien lleva mucho rato “mamando gallo”, haciendo chistes o evitando hablar en serio. El matiz está en el tono: una cosa es hablar claro y otra “darse garra” con la dureza.", translation: "In Colombia, speaking plainly is not insulting; it means removing the extra turns around the issue. It helps when someone has been joking around or avoiding serious talk. The nuance is tone: speaking clearly is one thing, going too far with harshness is another.", highlights: highlights(["hablar en plata blanca", "mamar gallo", "darse garra"]), shadowLine: "Le hablo en plata blanca: no me mame gallo con eso." },
  { id: "p2", text: "Cuando una situación se complica sin necesidad, la gente puede decir que alguien “pone pereque” o que algo “da lidia”. “Pereque” apunta al alboroto innecesario; “lidia” describe la carga de tener que manejar un problema que no se deja resolver fácil.", translation: "When a situation gets unnecessarily complicated, people can say someone makes a fuss or that something is a hassle. Pereque points to unnecessary fuss; lidia describes the burden of handling a problem that is not easy to solve.", highlights: highlights(["poner pereque", "dar lidia"]), shadowLine: "No ponga tanto pereque; esto ya está dando mucha lidia." },
  { id: "p3", text: "En discusiones de trabajo, “hablar carreta” y “sacar el cuerpo” son acusaciones fuertes. La primera dice que alguien está llenando el espacio con palabras vacías. La segunda dice que evita responder por lo que le toca. Por eso hay que usarlas con cuidado.", translation: "In work discussions, talking nonsense and dodging responsibility are strong accusations. The first says someone is filling the space with empty words. The second says they are avoiding what they are responsible for. That is why you need to use them carefully.", highlights: highlights(["hablar carreta", "sacar el cuerpo"]), shadowLine: "No hable carreta y no le saque el cuerpo al tema." },
  { id: "p4", text: "La paciencia también tiene vocabulario. “Cantaletear” es repetir la queja o la lección una y otra vez; la “cantaleta” es esa repetición. Si alguien sigue insistiendo, puede “sacarle la chispa” a otra persona o “poner sebo” hasta volver el ambiente pesado.", translation: "Patience also has vocabulary. Cantaletear means repeating the complaint or lecture again and again; cantaleta is that repetition. If someone keeps insisting, they can get on someone’s nerves or keep pestering until the atmosphere gets heavy.", highlights: highlights(["cantaletear", "cantaleta", "sacarle la chispa a alguien", "poner sebo"]), shadowLine: "No me cantaletee tanto; me va a sacar la chispa." },
  { id: "p5", text: "La decepción tiene imágenes muy colombianas. Si esperaba algo y no recibió nada, puede decir: “quedé viendo un chispero”. Si alguien no llegó, “me dejó metido”. Y si todos estaban listos para un plan que nunca pasó, “nos quedamos con los crespos hechos”.", translation: "Disappointment has very Colombian images. If you expected something and received nothing, you can say you were left with nothing. If someone did not show up, they stood you up. And if everyone was ready for a plan that never happened, you got ready for nothing.", highlights: highlights(["quedarse viendo un chispero", "dejar metido", "quedarse con los crespos hechos"]), shadowLine: "Me dejó metido y quedé viendo un chispero." },
  { id: "p6", text: "A veces el problema ni siquiera se resuelve: “eso se quedó de ese tamaño”. Y si además una sola persona termina respondiendo por todos, puede decir: “quedé deteniendo la peña”. Son frases de cansancio social: no solo pasó algo malo, sino que alguien quedó cargando el desorden.", translation: "Sometimes the problem is not even solved: it was left there unresolved. And if one person ends up answering for everyone, they can say they were left carrying the burden. These are phrases of social exhaustion: not only did something bad happen, but someone was left carrying the mess.", highlights: highlights(["quedarse de ese tamaño", "quedarse deteniendo la peña"]), shadowLine: "Eso se quedó de ese tamaño y quedé deteniendo la peña." },
  { id: "p7", text: "En otro registro aparecen “descrestar” y “ponerse de ruana”. Descrestar es impresionar, a veces de manera legítima y a veces por puro show. Ponerse de ruana es más crítico: alguien toma control y actúa como si todo fuera suyo. De ahí también sale “eso es para los de ruana”, cuando la carga cae sobre la gente común.", translation: "In another register we get impressing someone and taking over. Descrestar means to impress, sometimes legitimately and sometimes as pure show. Ponerse de ruana is more critical: someone takes control and acts as if everything belongs to them. From there comes the phrase that something falls on ordinary people, when the burden lands on regular people.", highlights: highlights(["descrestar", "ponerse de ruana", "ser para los de ruana"]), shadowLine: "Se puso de ruana con todo, y eso siempre es para los de ruana." },
  { id: "p8", text: "Por último, el cansancio y el humor conviven. En Medellín y Antioquia se oye “tirar caja” para reírse duro. Pero después de tanto hablar, pelear y resolver, alguien puede decir que otro “habla más que una lora mojada” o que quedó “como un chupo”: completamente agotado.", translation: "Finally, tiredness and humor coexist. In Medellín and Antioquia, tirar caja means laughing hard. But after so much talking, fighting, and solving, someone can say another person talks endlessly or that they ended up completely exhausted.", highlights: highlights(["tirar caja", "hablar más que una lora mojada", "estar como un chupo"]), shadowLine: "Tiramos caja, pero quedé como un chupo." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "colombian-c1-register-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Advanced Colombian phrases for directness, hassle, disappointment, and register", "Basic greetings only", "Ordering food formally", "Airport announcements"], correctAnswer: "Advanced Colombian phrases for directness, hassle, disappointment, and register", explanation: "The reading explains C1 Colombian expressions and the situations/registers where they fit.", points: 1, skillTag: "gist" },
  { id: "colombian-c1-register-reading-q2", type: "multiple-choice", prompt: "Why should “hablar carreta” and “sacar el cuerpo” be used carefully?", options: ["They are strong accusations", "They are formal greetings", "They only describe weather", "They mean the same as thanks"], correctAnswer: "They are strong accusations", explanation: "The reading says they call out empty talk and avoiding responsibility.", points: 1, skillTag: "register" },
  { id: "colombian-c1-register-reading-q3", type: "true-false", prompt: "True or false: “tirar caja” is linked especially to Antioquia/Medellín usage.", correctAnswer: "true", explanation: "The reading marks tirar caja as heard in Medellín and Antioquia.", points: 1, skillTag: "regional" },
  { id: "colombian-c1-register-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t talk nonsense and don’t dodge the issue.", wordBank: ["No", "hable", "carreta", "y", "no", "le", "saque", "el", "cuerpo", "al", "tema."], correctAnswer: "No hable carreta y no le saque el cuerpo al tema.", explanation: "This combines two strong C1 call-out phrases.", points: 2, skillTag: "phrase-building" },
  { id: "colombian-c1-register-reading-q5", type: "multiple-choice", prompt: "Which phrase means getting ready for something that never happens?", options: ["quedarse con los crespos hechos", "poner sebo", "descrestar", "tirar caja"], correctAnswer: "quedarse con los crespos hechos", explanation: "This phrase describes being all ready for nothing.", points: 1, skillTag: "disappointment" },
];

export const colombianSpanishC1AdvancedSlangNuanceRegisterReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Colombian C1 Reading: Hablar en Plata Blanca",
  subtitle: "A synced Spanish reading about advanced Colombian slang, register, disappointment, burden, and social nuance.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading", "slang", "register"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: colombianRegisterVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Colombian C1 advanced slang, nuance and register vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const colombianSpanishC1AdvancedSlangNuanceRegisterQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Colombian Spanish C1: Advanced Slang, Nuance & Register Quiz",
  subtitle: "Choose the right Colombian C1 phrase for directness, joking, hassle, disappointment, and register.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "quiz", "slang", "register"],
  estimatedMinutes: 20,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Colombian C1 expressions for the right situation and register.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "colombian-c1-register-quiz-1", type: "multiple-choice", prompt: "You want to be completely direct without dancing around the issue. What do you say?", options: ["Le hablo en plata blanca", "Tiramos caja", "Me dejó metido", "Quedé como un chupo"], correctAnswer: "Le hablo en plata blanca", explanation: "Hablar en plata blanca means speaking plainly.", points: 1, skillTag: "directness" },
      { id: "colombian-c1-register-quiz-2", type: "fill-blank", prompt: "Complete: No me mame ______ con eso.", nativePrompt: "Don’t mess me around with that.", correctAnswer: "gallo", explanation: "Mamar gallo can mean messing around or stalling through joking.", points: 1, skillTag: "joking" },
      { id: "colombian-c1-register-quiz-3", type: "multiple-choice", prompt: "Someone creates unnecessary hassle over a simple task. Which phrase fits?", options: ["poner pereque", "descrestar", "tirar caja", "quedarse con los crespos hechos"], correctAnswer: "poner pereque", explanation: "Poner pereque means making unnecessary fuss or hassle.", points: 1, skillTag: "hassle" },
      { id: "colombian-c1-register-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "This is causing a lot of hassle.", wordBank: ["Esto", "está", "dando", "mucha", "lidia."], correctAnswer: "Esto está dando mucha lidia.", explanation: "Dar lidia means to be a hassle or cause trouble.", points: 1, skillTag: "burden" },
      { id: "colombian-c1-register-quiz-5", type: "true-false", prompt: "True or false: “sacar el cuerpo” means dodging responsibility.", correctAnswer: "true", explanation: "Sacar el cuerpo means avoiding responsibility or avoiding the issue.", points: 1, skillTag: "avoidance" },
      { id: "colombian-c1-register-quiz-6", type: "multiple-choice", prompt: "You expected something and got nothing. Which phrase fits?", options: ["quedarse viendo un chispero", "tirar caja", "descrestar", "cantaletear"], correctAnswer: "quedarse viendo un chispero", explanation: "Quedar viendo un chispero means ending up disappointed or with nothing.", points: 1, skillTag: "disappointment" },
      { id: "colombian-c1-register-quiz-7", type: "fill-blank", prompt: "Complete: No me ponga más ______.", nativePrompt: "Stop bothering me.", correctAnswer: "sebo", explanation: "Poner sebo means pestering or continuing to bother someone.", points: 1, skillTag: "pestering" },
      { id: "colombian-c1-register-quiz-8", type: "multiple-choice", prompt: "Which phrase means the burden falls on ordinary people?", options: ["ser para los de ruana", "darse garra", "hablar carreta", "dejar metido"], correctAnswer: "ser para los de ruana", explanation: "Para los de ruana means ordinary people end up carrying the rule or burden.", points: 1, skillTag: "social-register" },
      { id: "colombian-c1-register-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "We got all ready for nothing.", wordBank: ["Nos", "quedamos", "con", "los", "crespos", "hechos."], correctAnswer: "Nos quedamos con los crespos hechos.", explanation: "This phrase means getting ready for something that never happens.", points: 2, skillTag: "phrase-building" },
      { id: "colombian-c1-register-quiz-10", type: "multiple-choice", prompt: "You want to say you ended up completely exhausted. Which phrase fits?", options: ["Quedé como un chupo", "No hable carreta", "Tiramos caja", "No ponga pereque"], correctAnswer: "Quedé como un chupo", explanation: "Estar como un chupo means being completely worn out.", points: 1, skillTag: "exhaustion" },
      pairQuestion("colombian-c1-register-pairs-1", "Match directness, joking, hassle, and avoidance phrases.", colombianRegisterVocab.slice(0, 8)),
      pairQuestion("colombian-c1-register-pairs-2", "Match nagging, pestering, and disappointment phrases.", colombianRegisterVocab.slice(8, 16)),
      pairQuestion("colombian-c1-register-pairs-3", "Match power, humour, social register, and exhaustion phrases.", colombianRegisterVocab.slice(16)),
    ],
  },
};
