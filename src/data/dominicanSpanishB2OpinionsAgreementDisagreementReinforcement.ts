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
const courseId = "dominican-spanish-b2-opinions-agreement-disagreement";
const skoolSectionName = "Dominican Spanish - B2 Opinions Agreement and Disagreement";

const opinionsVocab: VocabItem[] = [
  { id: "que-lo-que", term: "¿Qué lo qué?", meaning: "What’s up? / What’s good?", note: "Very Dominican, very informal greeting.", example: "¿Qué lo qué? Dímelo.", translation: "What’s up? Tell me.", starred: true },
  { id: "dimelo", term: "Dímelo", meaning: "What’s up? / Tell me / What’s good?", note: "Common casual opener.", example: "Dímelo, ¿qué tú piensas?", translation: "Tell me, what do you think?", starred: true },
  { id: "vaina", term: "vaina", meaning: "thing / situation / stuff / issue", note: "Extremely flexible Dominican and Caribbean word.", example: "Esa vaina se puso rara.", translation: "That situation got weird.", starred: true },
  { id: "esa-vaina", term: "esa vaina", meaning: "that thing / that situation / that whole thing", note: "Meaning depends heavily on context.", example: "Pa’ mí, esa vaina no está clara.", translation: "For me, that whole thing is not clear.", starred: true },
  { id: "coro", term: "coro", meaning: "hangout / gathering / crew / social plan", note: "Ir pa’l coro means to go to the hangout.", example: "El coro era tranquilo, no caro.", translation: "The hangout was chill, not expensive.", starred: true },
  { id: "jevi", term: "jevi", meaning: "cool / great / nice / awesome", note: "From English heavy; very common Dominican slang.", example: "La idea está jevi.", translation: "The idea is cool.", starred: true },
  { id: "un-chin", term: "un chin", meaning: "a little bit", note: "Very characteristic Dominican expression.", example: "Baja un chin el precio.", translation: "Lower the price a little bit.", starred: true },
  { id: "dique", term: "dique", meaning: "supposedly / apparently / like...", note: "Often shows doubt, irony, or reporting what someone claims.", example: "Dique era barato, pero no.", translation: "Supposedly it was cheap, but no.", starred: true },
  { id: "esa-vuelta", term: "esa vuelta", meaning: "that situation / that plan / that whole thing", note: "Informal and context-dependent.", example: "Yo no entiendo esa vuelta.", translation: "I don’t understand that situation.", starred: true },
  { id: "tiguere", term: "tíguere", meaning: "dude / guy / street-smart guy", note: "Can be neutral or suggest a slick streetwise guy.", example: "Ese tíguere sabe negociar.", translation: "That guy knows how to negotiate.", starred: true },
  { id: "ese-tiguere", term: "ese tíguere", meaning: "that guy / that dude", note: "Informal way to refer to a man.", example: "Ese tíguere cambió el precio.", translation: "That dude changed the price.", starred: true },
  { id: "andar-en-olla", term: "andar en olla", meaning: "to be broke / have no money", note: "Ando en olla means I’m broke.", example: "Ando en olla esta semana.", translation: "I’m broke this week.", starred: true },
  { id: "los-cuartos", term: "los cuartos / lo’ cuarto", meaning: "money / cash", note: "Colloquial Dominican way to talk about money.", example: "No tengo lo’ cuarto ahora mismo.", translation: "I don’t have the money right now.", starred: true },
  { id: "no-coja-lucha", term: "no coja lucha", meaning: "don’t stress / don’t worry about it", note: "Very useful Dominican everyday saying.", example: "No coja lucha, lo resolvemos.", translation: "Don’t stress, we’ll solve it.", starred: true },
  { id: "bregar-con-algo", term: "bregar con algo", meaning: "to deal with something / sort something out", note: "Bregamo’ con eso means we’ll deal with it.", example: "Podemos bregar con eso mañana.", translation: "We can deal with that tomorrow.", starred: true },
  { id: "ta-to", term: "ta’ to’", meaning: "it’s all good / sorted / everything’s fine", note: "Reduction of está todo.", example: "Si todos pagan menos, ta’ to’.", translation: "If everyone pays less, it’s all good.", starred: true },
  { id: "pa-mi", term: "pa’ mí", meaning: "for me / in my opinion", note: "Spoken reduction of para mí.", example: "Pa’ mí, falta hablar claro.", translation: "In my opinion, we need to speak clearly.", starred: true },
  { id: "tamo-de-acuerdo", term: "tamo’ de acuerdo", meaning: "we agree / we’re on the same page", note: "Reduction of estamos de acuerdo.", example: "Tamo’ de acuerdo en no gastar tanto.", translation: "We agree on not spending so much.", starred: true },
  { id: "vamo-a-dejarlo-ahi", term: "vamo’ a dejarlo ahí", meaning: "let’s leave it there", note: "Good way to end a disagreement.", example: "Si seguimos igual, vamo’ a dejarlo ahí.", translation: "If we keep going the same way, let’s leave it there.", starred: true },
  { id: "por-un-lao", term: "por un lao", meaning: "on one hand", note: "Spoken por un lado.", example: "Por un lao, quiero ir.", translation: "On one hand, I want to go.", starred: true },
  { id: "por-otro-lao", term: "por otro lao", meaning: "on the other hand", note: "Spoken por otro lado.", example: "Por otro lao, está muy caro.", translation: "On the other hand, it’s very expensive.", starred: true },
  { id: "no-e-por-llevarte-la-contraria", term: "no e’ por llevarte la contraria", meaning: "I’m not trying to disagree with you", note: "Softens disagreement before giving another view.", example: "No e’ por llevarte la contraria, pero falta información.", translation: "I’m not trying to disagree with you, but information is missing.", starred: true },
  { id: "tu-me-entiendes", term: "tú me entiendes", meaning: "you know what I mean / you get me", note: "Common conversational tag.", example: "No quiero sonar pesado, tú me entiendes.", translation: "I don’t want to sound difficult, you know what I mean.", starred: true },
  { id: "en-verdad", term: "en verdad", meaning: "honestly / really / truthfully", note: "Very common conversational opinion marker.", example: "En verdad, yo prefiero algo sencillo.", translation: "Honestly, I prefer something simple.", starred: true },
  { id: "como-que-no", term: "como que no", meaning: "not really / I don’t think so / kinda no", note: "Soft, less absolute disagreement.", example: "Pagar más, como que no.", translation: "Paying more, not really.", starred: true },
  { id: "yo-la-veo-distinto", term: "yo la veo distinto", meaning: "I see it differently", note: "Natural disagreement phrase.", example: "Yo la veo distinto: el problema es el precio.", translation: "I see it differently: the problem is the price.", starred: true },
  { id: "yo-no-lo-veo-asi", term: "yo no lo veo así", meaning: "I don’t see it that way", note: "Direct but not necessarily rude.", example: "Yo no lo veo así, Camila.", translation: "I don’t see it that way, Camila.", starred: true },
  { id: "no-te-voy-a-negar", term: "no te voy a negar...", meaning: "I’m not going to deny... / I’ll admit...", note: "Useful before conceding a point.", example: "No te voy a negar que la música está jevi.", translation: "I’ll admit that the music is cool.", starred: true },
  { id: "claro-que-si", term: "claro que sí", meaning: "of course / definitely", note: "Strong agreement.", example: "Claro que sí, esa parte está bien.", translation: "Of course, that part is fine.", starred: true },
  { id: "pero-ven-aca", term: "pero ven acá...", meaning: "hold on / wait a second / but listen...", note: "Often used before reacting or challenging something.", example: "Pero ven acá, ¿y el transporte?", translation: "Wait a second, what about transport?", starred: true },
  { id: "va-pal-coro", term: "va’ pa’l coro", meaning: "you’re going to the hangout", note: "Reduced speech for vas para el coro.", example: "¿Tú va’ pa’l coro ahora mismo?", translation: "Are you going to the hangout right now?", starred: true },
  { id: "ahorita", term: "ahorita", meaning: "in a little while / soon / right now", note: "Exact timing depends on context.", example: "Ahorita te llamo.", translation: "I’ll call you in a little while.", starred: true },
  { id: "ahora-mismo", term: "ahora mismo", meaning: "right now", note: "More explicit than ahorita.", example: "Ahora mismo no puedo decidir.", translation: "Right now I can’t decide.", starred: true },
  { id: "medio-raro", term: "medio raro", meaning: "kinda weird / a bit strange", note: "Lo veo medio raro means it seems kinda weird to me.", example: "Ese cambio está medio raro.", translation: "That change is kinda weird.", starred: true },
];

const highlightMap = Object.fromEntries(opinionsVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: item.starred ? "hard" : "medium",
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
  hints: string[] = [],
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
    hints,
    audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3`,
  };
}

export const dominicanSpanishB2OpinionsAgreementDisagreementFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B2: Opinions, Agreement & Disagreement Flashcards",
  subtitle: "Dominican Spanish phrases for giving opinions, softening disagreement, agreeing, talking about money, and closing tension naturally.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "flashcards", "opinions", "agreement", "disagreement"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: opinionsVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué lo qué? = What’s up?",
  "Dímelo = Tell me / what’s good?",
  "tamo’ de acuerdo = we agree",
  "esa vaina = that situation",
  "pa’ mí = in my opinion",
  "esa vuelta = that whole thing",
  "medio raro = kinda weird",
  "por un lao = on one hand",
  "coro = hangout",
  "jevi = cool",
  "por otro lao = on the other hand",
  "andar en olla = to be broke",
  "no e’ por llevarte la contraria = I’m not trying to disagree with you",
  "yo la veo distinto = I see it differently",
  "no te voy a negar = I’ll admit",
  "ese tíguere = that dude",
  "claro que sí = of course",
  "pero ven acá = wait a second",
  "vamo’ a dejarlo ahí = let’s leave it there",
  "bregar con algo = deal with something",
  "no coja lucha = don’t stress",
  "ahorita = soon / in a bit",
  "ta’ to’ = it’s all good",
];

export const dominicanSpanishB2OpinionsAgreementDisagreementSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Dominican Opinions & Disagreement",
  subtitle: "Build Dominican Spanish for opinion markers, soft disagreement, compromise, and ending tension without sounding harsh.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "sentence-builder", "opinions", "disagreement"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short voice note where you disagree politely about a social plan, give one concession, and end with a calm compromise.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Open the opinion",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "What’s up? Tell me, do we agree with that situation?",
        "¿Qué lo qué? Dímelo, ¿tamo’ de acuerdo con esa vaina?",
        "This opens casually and invites the other person’s opinion without sounding formal.",
        breakdown([["What’s up?", "¿Qué lo qué?"], ["Tell me", "Dímelo"], ["do we agree?", "¿tamo’ de acuerdo?"], ["with that situation", "con esa vaina"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Give your view",
        sentenceVocab.slice(4, 7),
        sentenceVocab.slice(0, 7),
        "In my opinion, that whole thing is kinda weird.",
        "Pa’ mí, esa vuelta está medio rara.",
        "“Pa’ mí” softens the opinion, and “medio rara” avoids sounding too absolute.",
        breakdown([["In my opinion", "Pa’ mí"], ["that whole thing", "esa vuelta"], ["is kinda weird", "está medio rara"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Balance two sides",
        sentenceVocab.slice(7, 12),
        sentenceVocab.slice(0, 12),
        "On one hand, the hangout is cool; on the other hand, I’m broke.",
        "Por un lao, el coro está jevi; por otro lao, ando en olla.",
        "This gives both sides: the plan is attractive, but money is a real problem.",
        breakdown([["On one hand", "Por un lao"], ["the hangout is cool", "el coro está jevi"], ["on the other hand", "por otro lao"], ["I’m broke", "ando en olla"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Disagree softly",
        sentenceVocab.slice(12, 14),
        sentenceVocab.slice(0, 14),
        "I’m not trying to disagree with you, but I see it differently.",
        "No e’ por llevarte la contraria, pero yo la veo distinto.",
        "This is a very useful soft-disagreement frame: respect first, then your perspective.",
        breakdown([["I’m not trying to disagree with you", "No e’ por llevarte la contraria"], ["but", "pero"], ["I see it differently", "yo la veo distinto"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Concede a point",
        sentenceVocab.slice(14, 16),
        sentenceVocab.slice(0, 16),
        "I’ll admit that that dude has a point.",
        "No te voy a negar que ese tíguere tiene un punto.",
        "“No te voy a negar...” helps you concede without abandoning your full opinion.",
        breakdown([["I’ll admit", "No te voy a negar"], ["that that dude", "que ese tíguere"], ["has a point", "tiene un punto"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Agree clearly",
        sentenceVocab.slice(16, 18),
        sentenceVocab.slice(0, 18),
        "Of course, we agree on that.",
        "Claro que sí, tamo’ de acuerdo en eso.",
        "This gives strong agreement after the disagreement, which keeps the conversation collaborative.",
        breakdown([["Of course", "Claro que sí"], ["we agree", "tamo’ de acuerdo"], ["on that", "en eso"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Close the tension",
        sentenceVocab.slice(18, 20),
        sentenceVocab.slice(0, 20),
        "Wait a second, let’s leave it there and deal with that.",
        "Pero ven acá, vamo’ a dejarlo ahí y bregamo’ con eso.",
        "This stops the argument and moves toward solving the practical issue.",
        breakdown([["Wait a second", "Pero ven acá"], ["let’s leave it there", "vamo’ a dejarlo ahí"], ["we’ll deal with that", "bregamo’ con eso"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Reassure",
        sentenceVocab.slice(20, 23),
        sentenceVocab.slice(0, 23),
        "Don’t stress. We’ll talk in a bit and it’s all good.",
        "No coja lucha. Ahorita hablamos y ta’ to’.",
        "A warm Dominican closing: reassure the person and keep the relationship good.",
        breakdown([["Don’t stress", "No coja lucha"], ["we’ll talk in a bit", "ahorita hablamos"], ["it’s all good", "ta’ to’"]]),
      ),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyMessages: StoryMessage[] = [
  message("m1", "camila", "¿Qué lo qué, Leo? Dímelo: ¿tú va’ pa’l coro de Rafa ahora mismo?", "What’s up, Leo? Tell me: are you going to Rafa’s hangout right now?", ["¿Qué lo qué?", "Dímelo", "va’ pa’l coro", "coro", "ahora mismo"], "voice-note", `${storyAudioBase}/m1.mp3`),
  message("m2", "leo", "Pa’ mí sí, pero esa vaina cambió un chin desde ayer.", "In my opinion yes, but that situation changed a little bit since yesterday.", ["pa’ mí", "esa vaina", "un chin"]),
  message("m3", "camila", "¿Cambió cómo? Rafa dijo dique que era algo sencillo y jevi.", "Changed how? Rafa said supposedly it was something simple and cool.", ["dique", "jevi"]),
  message("m4", "leo", "Por un lao, el coro suena jevi; por otro lao, ahora quieren cobrar una entrada.", "On one hand, the hangout sounds cool; on the other hand, now they want to charge an entry fee.", ["por un lao", "coro", "jevi", "por otro lao"]),
  message("m5", "camila", "Ah, como que no. Yo pensaba llevar solo algo de tomar.", "Ah, not really. I thought I was only bringing something to drink.", ["como que no"]),
  message("m6", "leo", "Exacto. Y yo ando en olla esta semana; no tengo lo’ cuarto para esa vuelta.", "Exactly. And I’m broke this week; I don’t have the money for that whole thing.", ["andar en olla", "los cuartos / lo’ cuarto", "esa vuelta"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "camila", "No e’ por llevarte la contraria, pero quizás Rafa solo está cubriendo comida.", "I’m not trying to disagree with you, but maybe Rafa is just covering food.", ["no e’ por llevarte la contraria"]),
  message("m8", "leo", "Claro que sí, eso lo entiendo. Pero ven acá: ¿por qué avisar a última hora?", "Of course, I understand that. But wait a second: why say it at the last minute?", ["claro que sí", "pero ven acá"]),
  message("m9", "camila", "Tú me entiendes, eso sí está medio raro.", "You know what I mean, that part is kinda weird.", ["tú me entiendes", "medio raro"]),
  message("m10", "leo", "Ese tíguere siempre organiza cosas buenas, pero a veces no explica bien los detalles.", "That dude always organizes good things, but sometimes he doesn’t explain the details well.", ["ese tíguere"]),
  message("m11", "camila", "En verdad, yo la veo distinto: si hablamos claro, podemos bregar con eso sin drama.", "Honestly, I see it differently: if we speak clearly, we can deal with it without drama.", ["en verdad", "yo la veo distinto", "bregar con algo"], "voice-note", `${storyAudioBase}/m11.mp3`),
  message("m12", "leo", "Tamo’ de acuerdo en hablar claro. Yo no quiero dañar el ambiente.", "We agree on speaking clearly. I don’t want to ruin the vibe.", ["tamo’ de acuerdo"]),
  message("m13", "camila", "Entonces dile: “Rafa, la idea está jevi, pero ¿cuánto es exactamente?”", "Then tell him: “Rafa, the idea is cool, but how much is it exactly?”", ["jevi"]),
  message("m14", "leo", "No te voy a negar que esa frase suena mejor que quejarme en el grupo.", "I’ll admit that phrase sounds better than complaining in the group.", ["no te voy a negar..."]),
  message("m15", "camila", "Exacto. No coja lucha; pregunta tranquilo.", "Exactly. Don’t stress; ask calmly.", ["no coja lucha"]),
  message("m16", "leo", "Le escribí. Dice dique que no es entrada, es para comprar hielo, vasos y picadera.", "I wrote to him. He says supposedly it’s not entry, it’s to buy ice, cups, and snacks.", ["dique"], "voice-note", `${storyAudioBase}/m16.mp3`),
  message("m17", "camila", "Ah, si es así, ta’ to’. Pero debería decirlo así desde el principio.", "Ah, if that’s the case, it’s all good. But he should say it like that from the beginning.", ["ta’ to’"]),
  message("m18", "leo", "Yo no lo veo así del todo. Aunque sea para comida, cada quien tiene su presupuesto.", "I don’t see it that way completely. Even if it’s for food, everyone has their budget.", ["yo no lo veo así"]),
  message("m19", "camila", "Claro que sí. Podemos proponer que cada quien lleve algo pequeño.", "Of course. We can suggest that everyone bring something small.", ["claro que sí"]),
  message("m20", "leo", "Eso me gusta. Por un lao nadie se siente obligado; por otro lao el coro sigue.", "I like that. On one hand nobody feels forced; on the other hand the hangout continues.", ["por un lao", "por otro lao", "coro"]),
  message("m21", "camila", "Dale, escribe eso. Algo como: “Rafa, pa’ mí es mejor que cada quien lleve algo”.", "Okay, write that. Something like: “Rafa, in my opinion it’s better that everyone brings something.”", ["pa’ mí"], "voice-note", `${storyAudioBase}/m21.mp3`),
  message("m22", "leo", "Lo puse. Él respondió rápido: “sí, bregamo’ con eso”.", "I put it. He answered quickly: “yes, we’ll deal with that.”", ["bregar con algo"]),
  message("m23", "camila", "Viste, no era pelea. Era solo hablar sin sonar pesado.", "See, it wasn’t a fight. It was just speaking without sounding difficult.", []),
  message("m24", "leo", "Sí, porque si uno entra duro, la gente se cierra.", "Yes, because if you come in too harsh, people shut down.", []),
  message("m25", "camila", "¿Entonces va’ pa’l coro o vamo’ a dejarlo ahí?", "So are you going to the hangout or are we leaving it there?", ["va’ pa’l coro", "vamo’ a dejarlo ahí"]),
  message("m26", "leo", "Voy, pero ahorita. Ahora mismo estoy terminando una vuelta en casa.", "I’m going, but in a little while. Right now I’m finishing something at home.", ["ahorita", "ahora mismo", "esa vuelta"], "voice-note", `${storyAudioBase}/m26.mp3`),
  message("m27", "camila", "Ok, pero dime claro, que tú dices ahorita y apareces mañana.", "Okay, but tell me clearly, because you say ahorita and appear tomorrow.", ["ahorita"]),
  message("m28", "leo", "Jajaja, no. En verdad salgo en veinte minutos.", "Haha, no. Honestly I leave in twenty minutes.", ["en verdad"]),
  message("m29", "camila", "Perfecto. Tamo’ de acuerdo: tú llevas hielo y yo llevo vasos.", "Perfect. We agree: you bring ice and I bring cups.", ["tamo’ de acuerdo"]),
  message("m30", "leo", "Ta’ to’. Y si alguien pregunta por lo’ cuarto, tú explicas la idea suave.", "It’s all good. And if someone asks about the money, you explain the idea gently.", ["ta’ to’", "los cuartos / lo’ cuarto"]),
];

const storyChecks: NonNullable<WhatsAppStory["data"]["comprehensionChecks"]> = [
  { id: "check-1", afterMessageId: "m3", question: { id: "story-q1", type: "multiple-choice", prompt: "What does Camila think Rafa originally said about the hangout?", options: ["That it was simple and cool", "That it was cancelled", "That Leo had to pay for everyone", "That nobody could bring food"], correctAnswer: "That it was simple and cool", explanation: "She says Rafa said “dique” it was something simple and “jevi”.", points: 1, skillTag: "gist" } },
  { id: "check-2", afterMessageId: "m6", question: { id: "story-q2", type: "multiple-choice", prompt: "Why is Leo worried about the new plan?", options: ["He is broke and does not have money for it", "He does not know Rafa", "He forgot the address", "He dislikes music"], correctAnswer: "He is broke and does not have money for it", explanation: "Leo says he “ando en olla” and does not have “lo’ cuarto”.", points: 1, skillTag: "detail" } },
  { id: "check-3", afterMessageId: "m9", question: { id: "story-q3", type: "true-false", prompt: "Camila agrees that the last-minute change feels a bit strange.", correctAnswer: "true", explanation: "She says “eso sí está medio raro”.", points: 1, skillTag: "inference" } },
  { id: "check-4", afterMessageId: "m12", question: { id: "story-q4", type: "multiple-choice", prompt: "What do Leo and Camila agree about?", options: ["They should speak clearly", "They should cancel the group chat", "They should ignore Rafa", "They should arrive tomorrow"], correctAnswer: "They should speak clearly", explanation: "Leo says “Tamo’ de acuerdo en hablar claro.”", points: 1, skillTag: "agreement" } },
  { id: "check-5", afterMessageId: "m15", question: { id: "story-q5", type: "multiple-choice", prompt: "What does Camila recommend Leo do?", options: ["Ask calmly", "Block Rafa", "Pay without asking", "Leave immediately"], correctAnswer: "Ask calmly", explanation: "She says “No coja lucha; pregunta tranquilo.”", points: 1, skillTag: "detail" } },
  { id: "check-6", afterMessageId: "m18", question: { id: "story-q6", type: "true-false", prompt: "Rafa explains the money is for ice, cups, and snacks, not an entrance fee.", correctAnswer: "true", explanation: "Leo reports Rafa’s explanation in message 16.", points: 1, skillTag: "detail" } },
  { id: "check-7", afterMessageId: "m21", question: { id: "story-q7", type: "multiple-choice", prompt: "What solution do they start forming?", options: ["Everyone brings something small", "Only Leo pays", "They cancel the hangout", "They move the hangout to a restaurant"], correctAnswer: "Everyone brings something small", explanation: "Camila suggests everyone can bring something, and Leo likes that.", points: 1, skillTag: "solution" } },
  { id: "check-8", afterMessageId: "m24", question: { id: "story-q8", type: "multiple-choice", prompt: "What lesson does Leo mention about disagreement?", options: ["If you enter too harshly, people shut down", "Never ask questions", "Always speak only in the group", "Money is never important"], correctAnswer: "If you enter too harshly, people shut down", explanation: "Leo says people close off when someone enters the conversation too harshly.", points: 1, skillTag: "inference" } },
  { id: "check-9", afterMessageId: "m27", question: { id: "story-q9", type: "multiple-choice", prompt: "Why does Camila joke about “ahorita”?", options: ["Because Leo may use it vaguely", "Because she hates the word", "Because Rafa asked for it", "Because the party is formal"], correctAnswer: "Because Leo may use it vaguely", explanation: "She jokes that Leo says “ahorita” and appears tomorrow.", points: 1, skillTag: "vocab" } },
  { id: "check-10", afterMessageId: "m30", question: { id: "story-q10", type: "multiple-choice", prompt: "What final arrangement do they make?", options: ["Leo brings ice and Camila brings cups", "Rafa brings nothing", "Camila pays everyone’s share", "Leo does not go"], correctAnswer: "Leo brings ice and Camila brings cups", explanation: "Camila says Leo brings ice and she brings cups.", points: 1, skillTag: "detail" } },
];

export const dominicanSpanishB2OpinionsAgreementDisagreementWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican Spanish B2: The Price of the Hangout",
  subtitle: "A realistic Dominican chat where two friends disagree about money, clarify a group plan, and find a respectful compromise.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "story", "opinions", "agreement", "disagreement"],
  estimatedMinutes: 24,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "camila", name: "Camila", initials: "C", side: "left", color: "violet" },
      { id: "leo", name: "Leo", initials: "L", side: "right", color: "cyan" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyChecks,
    learnedVocab: opinionsVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["Pa’ mí...", "No e’ por llevarte la contraria...", "Yo la veo distinto.", "Tamo’ de acuerdo.", "Vamo’ a dejarlo ahí."],
      grammarPatterns: ["Soft disagreement before opinion", "Balancing two sides with por un lao / por otro lao", "Dominican reductions in casual writing"],
      speakingPrompts: ["Explain why a plan feels expensive without sounding rude.", "Concede one point, then give your real opinion.", "End a disagreement calmly with a practical solution."],
    },
    completionTask: {
      title: "Send a calm disagreement voice note",
      instructions: "Record 30-45 seconds disagreeing politely about a social plan. Use one concession, one money phrase, and one closing phrase.",
    },
  },
};

export const dominicanSpanishB2OpinionsAgreementDisagreementReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: How Dominicans Disagree Without Killing the Vibe",
  subtitle: "Read and shadow a short explanation of Dominican opinion markers, soft disagreement, money talk, and friendly repair phrases.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "reading", "shadowing", "opinions"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: [
      {
        id: "p1",
        text: "In casual Dominican Spanish, a disagreement often begins with warmth. A friend might open with “¿Qué lo qué?” or “Dímelo” before asking what you think. These phrases lower the tension before the real opinion appears. If the topic is a social plan, “esa vaina” or “esa vuelta” can refer to the whole situation, not just one object.",
        highlights: highlights(["¿Qué lo qué?", "Dímelo", "esa vaina", "esa vuelta"]),
        shadowLine: "¿Qué lo qué? Dímelo, ¿qué tú piensas de esa vaina?",
      },
      {
        id: "p2",
        text: "To give an opinion without sounding aggressive, use “pa’ mí” or “en verdad”. For example: “Pa’ mí, esa vuelta está medio rara.” The phrase “medio raro” is useful because it sounds softer than saying something is completely wrong. It leaves space for the other person to explain.",
        highlights: highlights(["pa’ mí", "en verdad", "esa vuelta", "medio raro"]),
        shadowLine: "Pa’ mí, esa vuelta está medio rara.",
      },
      {
        id: "p3",
        text: "When both sides have a point, Dominicans may balance ideas with “por un lao” and “por otro lao”. You can say: “Por un lao, el coro está jevi; por otro lao, ando en olla.” This means the hangout sounds good, but the money situation is real. “Los cuartos” or “lo’ cuarto” means money or cash.",
        highlights: highlights(["por un lao", "por otro lao", "coro", "jevi", "andar en olla", "los cuartos / lo’ cuarto"]),
        shadowLine: "Por un lao, el coro está jevi; por otro lao, ando en olla.",
      },
      {
        id: "p4",
        text: "A direct disagreement can still feel respectful if you soften it first. “No e’ por llevarte la contraria” means you are not trying to contradict the other person just to fight. After that, you can add “yo la veo distinto” or “yo no lo veo así”. These phrases help you disagree while keeping the relationship intact.",
        highlights: highlights(["no e’ por llevarte la contraria", "yo la veo distinto", "yo no lo veo así"]),
        shadowLine: "No e’ por llevarte la contraria, pero yo la veo distinto.",
      },
      {
        id: "p5",
        text: "Good disagreement also includes agreement. “No te voy a negar...” lets you admit part of the other person’s point, and “claro que sí” gives clear agreement. If the conversation starts going in circles, “vamo’ a dejarlo ahí” can end the tension without sounding cold.",
        highlights: highlights(["no te voy a negar...", "claro que sí", "vamo’ a dejarlo ahí"]),
        shadowLine: "No te voy a negar que tienes un punto; claro que sí.",
      },
      {
        id: "p6",
        text: "Dominican repair phrases keep the vibe friendly. “No coja lucha” tells someone not to stress. “Bregar con algo” means to deal with or sort something out. If someone says “ahorita”, listen to the context: it can mean soon, in a bit, or right now. If they say “ahora mismo”, the timing is clearer.",
        highlights: highlights(["no coja lucha", "bregar con algo", "ahorita", "ahora mismo"]),
        shadowLine: "No coja lucha. Ahorita hablamos y bregamo’ con eso.",
      },
      {
        id: "p7",
        text: "In a real chat, you might hear “dique” when someone reports a claim with doubt: “Dique era barato.” You might also hear “pero ven acá...” before a challenge, like “Pero ven acá, ¿por qué avisar ahora?” These small phrases make the conversation sound local, alive, and socially careful.",
        highlights: highlights(["dique", "pero ven acá"]),
        shadowLine: "Pero ven acá, dique era barato, ¿y ahora quieren cobrar?",
      },
    ],
    glossary: highlights(opinionsVocab.map((item) => item.term)),
    questions: [
      { id: "reading-q1", type: "multiple-choice", prompt: "Why might someone open with “¿Qué lo qué?” or “Dímelo” before disagreeing?", options: ["To lower the tension first", "To make the conversation formal", "To ask for directions", "To end the conversation immediately"], correctAnswer: "To lower the tension first", explanation: "The reading says these warm openers lower the tension before the opinion appears.", points: 1, skillTag: "reading-gist" },
      { id: "reading-q2", type: "multiple-choice", prompt: "Which phrase gives a softer opinion?", options: ["Pa’ mí", "Ahora mismo", "Los cuartos", "Ese tíguere"], correctAnswer: "Pa’ mí", explanation: "“Pa’ mí” means in my opinion and softens the statement.", points: 1, skillTag: "opinion-marker" },
      { id: "reading-q3", type: "true-false", prompt: "“Por un lao / por otro lao” helps balance two sides of an issue.", correctAnswer: "true", explanation: "The reading explains these phrases balance two ideas.", points: 1, skillTag: "discourse" },
      { id: "reading-q4", type: "multiple-choice", prompt: "What does “No e’ por llevarte la contraria” do in a disagreement?", options: ["It softens the disagreement", "It demands money", "It confirms arrival time", "It invites someone to dance"], correctAnswer: "It softens the disagreement", explanation: "It says you are not contradicting just to fight.", points: 1, skillTag: "soft-disagreement" },
      { id: "reading-q5", type: "fill-blank", prompt: "Complete the repair phrase: “No coja ____.”", options: ["lucha", "coro", "cuarto", "lao"], correctAnswer: "lucha", explanation: "“No coja lucha” means don’t stress.", points: 1, skillTag: "repair" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "quiz-q1", type: "multiple-choice", prompt: "You want to say “in my opinion” casually in Dominican Spanish. Choose the best phrase.", options: ["pa’ mí", "lo’ cuarto", "coro", "tíguere"], correctAnswer: "pa’ mí", explanation: "“Pa’ mí” is the reduced casual form of “para mí”.", points: 1, skillTag: "opinion-marker" },
  { id: "quiz-q2", type: "multiple-choice", prompt: "A friend says the plan is too expensive, but you want to partly agree first. Choose the best opener.", options: ["No te voy a negar...", "Va’ pa’l coro", "Ahorita", "Dique"], correctAnswer: "No te voy a negar...", explanation: "This lets you concede a point before giving your own view.", points: 1, skillTag: "concession" },
  { id: "quiz-q3", type: "multiple-choice", prompt: "Someone is stressed about a disagreement. What Dominican phrase reassures them?", options: ["No coja lucha", "Como que no", "Ese tíguere", "Por otro lao"], correctAnswer: "No coja lucha", explanation: "“No coja lucha” means don’t stress or don’t worry about it.", points: 1, skillTag: "repair" },
  { id: "quiz-q4", type: "multiple-choice", prompt: "You think a situation feels a little strange, but you don’t want to sound too harsh. Choose the phrase.", options: ["Está medio raro", "Tamo’ de acuerdo", "Claro que sí", "Ta’ to’"], correctAnswer: "Está medio raro", explanation: "“Medio raro” means kinda weird or a bit strange.", points: 1, skillTag: "soft-opinion" },
  { id: "quiz-q5", type: "fill-blank", prompt: "Complete: “No e’ por llevarte la ____, pero yo la veo distinto.”", options: ["contraria", "vaina", "olla", "coro"], correctAnswer: "contraria", explanation: "This phrase softens disagreement: “I’m not trying to disagree with you.”", points: 1, skillTag: "soft-disagreement" },
  { id: "quiz-q6", type: "fill-blank", prompt: "Complete: “Por un ____, quiero ir; por otro lao, está caro.”", options: ["lao", "chin", "cuarto", "coro"], correctAnswer: "lao", explanation: "“Por un lao / por otro lao” balances two sides.", points: 1, skillTag: "discourse" },
  { id: "quiz-q7", type: "fill-blank", prompt: "Complete: “Ando en ____ esta semana.”", options: ["olla", "jevi", "vuelta", "lucha"], correctAnswer: "olla", explanation: "“Andar en olla” means to be broke.", points: 1, skillTag: "money" },
  { id: "quiz-q8", type: "fill-blank", prompt: "Complete: “Ahorita hablamos y ta’ ____.”", options: ["to’", "mí", "dique", "lao"], correctAnswer: "to’", explanation: "“Ta’ to’” means it’s all good or everything’s fine.", points: 1, skillTag: "repair" },
  { id: "quiz-q9", type: "true-false", prompt: "“Dique” can show that you are reporting something with doubt or irony.", correctAnswer: "true", explanation: "The note says “dique” often shows doubt, irony, or reporting what someone claims.", points: 1, skillTag: "meaning" },
  { id: "quiz-q10", type: "true-false", prompt: "“Ahora mismo” is usually less explicit than “ahorita”.", correctAnswer: "false", explanation: "“Ahora mismo” is more explicit; “ahorita” depends more on context.", points: 1, skillTag: "time" },
  { id: "quiz-q11", type: "true-false", prompt: "“Yo no lo veo así” is a way to disagree.", correctAnswer: "true", explanation: "It means “I don’t see it that way.”", points: 1, skillTag: "disagreement" },
  { id: "quiz-q12", type: "true-false", prompt: "“Los cuartos / lo’ cuarto” refers to the location of the party.", correctAnswer: "false", explanation: "It means money or cash.", points: 1, skillTag: "money" },
  { id: "quiz-q13", type: "match-pairs", prompt: "Match the Dominican phrase to its meaning.", pairs: [{ left: "pa’ mí", right: "in my opinion" }, { left: "un chin", right: "a little bit" }, { left: "coro", right: "hangout" }, { left: "jevi", right: "cool" }], explanation: "These are core conversational words from the lesson.", points: 4, skillTag: "vocab-match" },
  { id: "quiz-q14", type: "match-pairs", prompt: "Match the disagreement phrase to its function.", pairs: [{ left: "no e’ por llevarte la contraria", right: "softens disagreement" }, { left: "yo la veo distinto", right: "gives another perspective" }, { left: "tamo’ de acuerdo", right: "shows agreement" }, { left: "vamo’ a dejarlo ahí", right: "ends the tension" }], explanation: "These phrases control the social tone of disagreement.", points: 4, skillTag: "function-match" },
  { id: "quiz-q15", type: "order-words", prompt: "Put the words in order: “I see it differently.”", wordBank: ["yo", "la", "veo", "distinto"], correctAnswer: "yo la veo distinto", explanation: "The full phrase is “yo la veo distinto.”", points: 1, skillTag: "word-order" },
  { id: "quiz-q16", type: "order-words", prompt: "Put the words in order: “On the other hand, I’m broke.”", wordBank: ["por", "otro", "lao", "ando", "en", "olla"], correctAnswer: "por otro lao ando en olla", explanation: "Use “por otro lao” to introduce the second side.", points: 1, skillTag: "word-order" },
  { id: "quiz-q17", type: "order-words", prompt: "Put the words in order: “We agree on that.”", wordBank: ["tamo’", "de", "acuerdo", "en", "eso"], correctAnswer: "tamo’ de acuerdo en eso", explanation: "“Tamo’ de acuerdo” means “we agree.”", points: 1, skillTag: "word-order" },
  { id: "quiz-q18", type: "order-words", prompt: "Put the words in order: “Let’s leave it there.”", wordBank: ["vamo’", "a", "dejarlo", "ahí"], correctAnswer: "vamo’ a dejarlo ahí", explanation: "This is a useful phrase to stop a circular disagreement.", points: 1, skillTag: "word-order" },
  { id: "quiz-q19", type: "multiple-choice", prompt: "You suspect someone’s claim is questionable: “____ era barato, pero ahora cobran más.”", options: ["Dique", "Claro que sí", "Ta’ to’", "Ahora mismo"], correctAnswer: "Dique", explanation: "“Dique” fits when reporting something with doubt or irony.", points: 1, skillTag: "context" },
  { id: "quiz-q20", type: "multiple-choice", prompt: "You want to challenge a point conversationally before asking a question. Choose the opener.", options: ["Pero ven acá...", "Ando en olla", "Un chin", "Coro"], correctAnswer: "Pero ven acá...", explanation: "“Pero ven acá...” means hold on / wait a second / but listen.", points: 1, skillTag: "context" },
];

export const dominicanSpanishB2OpinionsAgreementDisagreementQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Quiz: Dominican B2 Opinions, Agreement & Disagreement",
  subtitle: "Choose the right Dominican phrase for opinion, agreement, disagreement, money talk, and social repair contexts.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "quiz", "opinions", "disagreement"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Test whether you can choose and build the right Dominican phrase in realistic opinion and disagreement situations.",
    passScore: 14,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
