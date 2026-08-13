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
const courseId = "dominican-spanish-b2-phone-calls-voice-notes";
const skoolSectionName = "Dominican Spanish - B2 Phone Calls and Voice Notes";

const phoneVocab: VocabItem[] = [
  { id: "dame-luz", term: "Dame luz", meaning: "Give me the update / fill me in / let me know what’s going on", note: "Casual Dominican way to ask for information.", example: "Dame luz con lo de la llamada.", translation: "Fill me in on the call.", starred: true },
  { id: "dime-a-ver", term: "Dime a ver", meaning: "Tell me / let’s hear it / so, what happened?", note: "Useful when inviting someone to explain.", example: "Dime a ver, ¿qué se hizo?", translation: "Tell me, what ended up happening?", starred: true },
  { id: "que-tu-dices", term: "¿Qué tú dices?", meaning: "What’s up? / What are you saying? / How’s it going?", note: "Very Dominican casual opener.", example: "¿Qué tú dices, Vale?", translation: "What’s up, Vale?", starred: true },
  { id: "tu-me-oyes-bien", term: "¿Tú me oyes bien?", meaning: "Can you hear me properly?", note: "Phone-call clarity check.", example: "¿Tú me oyes bien o se corta?", translation: "Can you hear me properly or is it cutting out?", starred: true },
  { id: "como-fue", term: "¿Cómo fue?", meaning: "What was that? / What did you say? / Come again?", note: "Used when you did not catch something.", example: "¿Cómo fue? No agarré esa parte.", translation: "Come again? I didn’t catch that part.", starred: true },
  { id: "esperate-ahi", term: "Espérate ahí", meaning: "Hold on / wait there a second", note: "Direct but normal in casual calls.", example: "Espérate ahí, que estoy entrando.", translation: "Hold on, I’m joining.", starred: true },
  { id: "dame-un-chance", term: "Dame un chance", meaning: "Give me a second / give me a moment", note: "Borrowed-feeling but common informal phrase.", example: "Dame un chance y reviso.", translation: "Give me a second and I’ll check.", starred: true },
  { id: "tirame", term: "Tírame", meaning: "Hit me up / call me / message me", note: "Can mean call or message depending on context.", example: "Tírame cuando salgas.", translation: "Hit me up when you leave.", starred: true },
  { id: "te-me-fuiste", term: "Te me fuiste", meaning: "I lost you / you cut out", note: "Very natural when the audio drops.", example: "Te me fuiste; repite eso.", translation: "I lost you; repeat that.", starred: true },
  { id: "ya-te-oigo-nitido", term: "Ya te oigo nítido", meaning: "I can hear you clearly now", note: "Use when the signal improves.", example: "Ya te oigo nítido, sigue.", translation: "I can hear you clearly now, continue.", starred: true },
  { id: "nitido", term: "nítido", meaning: "clear / perfect / all good", note: "Dominican everyday approval or clarity word.", example: "Nítido, quedamos en eso.", translation: "Perfect, that’s the plan.", starred: true },
  { id: "estar-en-una-vuelta", term: "estar en una vuelta", meaning: "to be out handling something / dealing with an errand or situation", note: "Useful for explaining why you cannot talk long.", example: "Estoy en una vuelta ahora mismo.", translation: "I’m out handling something right now.", starred: true },
  { id: "una-vuelta", term: "una vuelta", meaning: "an errand / thing you have to handle / situation you’re sorting out", note: "Context decides whether it is an errand or a broader situation.", example: "Tengo una vuelta cerca del banco.", translation: "I have an errand near the bank.", starred: true },
  { id: "estar-resolviendo", term: "estar resolviendo", meaning: "to be sorting things out / handling business", note: "Ongoing action of making things work.", example: "Estoy resolviendo lo del sonido.", translation: "I’m sorting out the sound issue.", starred: true },
  { id: "resolver", term: "resolver", meaning: "to sort something out / make things work / handle a problem", note: "Core Dominican practical verb.", example: "Eso se resuelve hoy.", translation: "That gets sorted out today.", starred: true },
  { id: "ahorita-te-digo", term: "Ahorita te digo", meaning: "I’ll tell you in a bit / I’ll let you know later", note: "Keeps the answer open while you check.", example: "Ahorita te digo si puedo.", translation: "I’ll let you know in a bit if I can.", starred: true },
  { id: "ahorita-te-confirmo", term: "Ahorita te confirmo", meaning: "I’ll confirm it with you in a bit", note: "Useful for plans and pending details.", example: "Ahorita te confirmo la hora.", translation: "I’ll confirm the time with you in a bit.", starred: true },
  { id: "no-me-dejes-en-el-aire", term: "No me dejes en el aire", meaning: "Don’t leave me hanging", note: "Used when you need someone to answer or confirm.", example: "No me dejes en el aire con eso.", translation: "Don’t leave me hanging with that.", starred: true },
  { id: "tu-me-avisas", term: "Tú me avisas", meaning: "Let me know / you let me know", note: "Casual handoff phrase.", example: "Tú me avisas cuando llegues.", translation: "Let me know when you arrive.", starred: true },
  { id: "cualquier-cosa-me-tiras", term: "Cualquier cosa me tiras", meaning: "If anything comes up, hit me up", note: "Warm flexible closing.", example: "Cualquier cosa me tiras.", translation: "If anything comes up, hit me up.", starred: true },
  { id: "tener-un-corre-corre", term: "tener un corre-corre", meaning: "to be running around like crazy / be in a hectic rush", note: "Busy, chaotic movement.", example: "Tengo un corre-corre desde temprano.", translation: "I’ve been running around like crazy since early.", starred: true },
  { id: "un-corre-corre", term: "un corre-corre", meaning: "a hectic rush / running around dealing with things", note: "Noun form for a chaotic rush.", example: "Hoy ha sido un corre-corre.", translation: "Today has been a hectic rush.", starred: true },
  { id: "cuadrar-algo", term: "cuadrar algo", meaning: "to arrange / organize / sort out the details", note: "Very useful for plans and logistics.", example: "Tenemos que cuadrar eso antes de las seis.", translation: "We have to sort that out before six.", starred: true },
  { id: "dejame-cuadrar-eso", term: "Déjame cuadrar eso", meaning: "Let me sort that out / let me arrange that", note: "Says you will handle the detail.", example: "Déjame cuadrar eso con Laura.", translation: "Let me sort that out with Laura.", starred: true },
  { id: "no-me-cojas-presion", term: "No me cojas presión", meaning: "Don’t pressure me / don’t rush me", note: "Dominican-style boundary around urgency.", example: "No me cojas presión, que lo estoy resolviendo.", translation: "Don’t pressure me; I’m sorting it out.", starred: true },
  { id: "no-te-me-pierdas", term: "No te me pierdas", meaning: "Don’t disappear on me / stay in touch", note: "Friendly but slightly urgent.", example: "No te me pierdas después de la llamada.", translation: "Don’t disappear on me after the call.", starred: true },
  { id: "mandame-audio", term: "mándame un audio por ahí", meaning: "Send me a voice note", note: "Casual request for a voice note.", example: "Mándame un audio por ahí cuando salgas.", translation: "Send me a voice note when you leave.", starred: true },
  { id: "dejame-eso-en-un-audio", term: "déjame eso en un audio", meaning: "Leave/send me that in a voice note", note: "Good when you cannot listen live.", example: "Si no entro, déjame eso en un audio.", translation: "If I don’t answer, leave that in a voice note.", starred: true },
  { id: "no-la-agarre", term: "no la agarré", meaning: "I didn’t catch it / I didn’t understand that part", note: "Informal comprehension repair.", example: "No la agarré, repite.", translation: "I didn’t catch it, repeat it.", starred: true },
  { id: "esa-parte-no-la-agarre", term: "esa parte no la agarré", meaning: "I didn’t catch that part", note: "Specific version of not catching something.", example: "Esa parte no la agarré por la señal.", translation: "I didn’t catch that part because of the signal.", starred: true },
  { id: "como-fue-que-tu-dijiste", term: "¿Cómo fue que tú dijiste…?", meaning: "What was it you said...? / How did you say that again?", note: "Asks someone to repeat the wording.", example: "¿Cómo fue que tú dijiste lo de la dirección?", translation: "How did you say the address again?", starred: true },
  { id: "dame-luz-cuando-termines", term: "dame luz cuando termines", meaning: "Update me when you’re done", note: "Follow-up request after someone finishes.", example: "Dame luz cuando termines la vuelta.", translation: "Update me when you finish the errand.", starred: true },
  { id: "que-se-hizo", term: "¿qué se hizo?", meaning: "What ended up happening? / What did you guys decide?", note: "Asks for the final result.", example: "¿Qué se hizo con la hora?", translation: "What ended up happening with the time?", starred: true },
  { id: "tirame-otra-vez", term: "tírame otra vez", meaning: "Call/message me again / send it again", note: "After missed calls or bad signal.", example: "Tírame otra vez, que se cayó.", translation: "Call me again, it dropped.", starred: true },
  { id: "yo-te-tiro", term: "yo te tiro", meaning: "I’ll hit you up / I’ll call or message you", note: "Casual promise to contact later.", example: "Yo te tiro cuando salga.", translation: "I’ll hit you up when I leave.", starred: true },
  { id: "te-tire-y-no-entraste", term: "te tiré y no entraste", meaning: "I called you and you didn’t answer", note: "Literally: I threw/called you and you did not enter.", example: "Te tiré y no entraste, por eso mandé audio.", translation: "I called you and you didn’t answer, so I sent a voice note.", starred: true },
  { id: "dale", term: "Dale", meaning: "Alright / okay / cool", note: "Extremely common confirmation.", example: "Dale, quedamos en eso.", translation: "Alright, that’s the plan.", starred: true },
  { id: "quedamos-en-eso", term: "Quedamos en eso", meaning: "That’s the plan / we’ll leave it at that / agreed", note: "Confirms the final arrangement.", example: "Dale, quedamos en eso.", translation: "Okay, that’s the plan.", starred: true },
  { id: "senal-yendo", term: "como que se te está yendo la señal", meaning: "Looks like your signal is going", note: "Natural signal warning.", example: "Como que se te está yendo la señal.", translation: "Looks like your signal is going.", starred: true },
  { id: "se-te-esta-cortando", term: "se te está cortando", meaning: "You’re cutting out", note: "Phone audio is breaking up.", example: "Se te está cortando; habla más lento.", translation: "You’re cutting out; speak slower.", starred: true },
  { id: "se-cayo-la-llamada", term: "se cayó la llamada", meaning: "The call dropped", note: "Very common call problem phrase.", example: "Se cayó la llamada otra vez.", translation: "The call dropped again.", starred: true },
  { id: "una-pelicula", term: "una película", meaning: "a whole movie / an insanely long story", note: "Used jokingly about a long voice note or story.", example: "Ese audio era una película.", translation: "That voice note was a whole movie.", starred: true },
  { id: "me-mandaste-una-pelicula", term: "me mandaste una película", meaning: "You sent me a whole movie / that voice note was ridiculously long", note: "Playful complaint about a long audio.", example: "Me mandaste una película de cinco minutos.", translation: "You sent me a whole movie of five minutes.", starred: true },
  { id: "cual-es-el-punto", term: "¿Cuál es el punto?", meaning: "What’s the point? / Get to the point", note: "Can sound impatient; use with care.", example: "¿Cuál es el punto del audio?", translation: "What’s the point of the voice note?", starred: true },
];

const highlightMap = Object.fromEntries(phoneVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

export const dominicanSpanishB2PhoneCallsVoiceNotesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B2: Phone Calls & Voice Notes Flashcards",
  subtitle: "Dominican phrases for calls, bad signal, missed calls, voice notes, updates, confirmations, and chaotic errands.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "flashcards", "phone-calls", "voice-notes"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: phoneVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué tú dices? = what’s up?",
  "Dame luz = fill me in",
  "Dime a ver = tell me",
  "¿Tú me oyes bien? = can you hear me properly?",
  "Te me fuiste = I lost you",
  "Ya te oigo nítido = I can hear you clearly now",
  "Espérate ahí = hold on",
  "Dame un chance = give me a second",
  "estar en una vuelta = be handling an errand",
  "estar resolviendo = be sorting things out",
  "Ahorita te confirmo = I’ll confirm in a bit",
  "No me dejes en el aire = don’t leave me hanging",
  "Tú me avisas = let me know",
  "Cualquier cosa me tiras = hit me up if anything comes up",
  "yo te tiro = I’ll hit you up",
  "tener un corre-corre = be running around like crazy",
  "cuadrar algo = sort out details",
  "Déjame cuadrar eso = let me sort that out",
  "No me cojas presión = don’t pressure me",
  "mándame un audio por ahí = send me a voice note",
  "déjame eso en un audio = leave that in a voice note",
  "esa parte no la agarré = I didn’t catch that part",
  "¿Cómo fue que tú dijiste...? = how did you say that again?",
  "se te está cortando = you’re cutting out",
  "se cayó la llamada = the call dropped",
  "me mandaste una película = you sent me a whole movie",
  "¿Cuál es el punto? = what’s the point?",
];

export const dominicanSpanishB2PhoneCallsVoiceNotesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Dominican Phone Calls & Voice Notes",
  subtitle: "Build practical Dominican Spanish for calls, bad signal, updates, voice notes, missed calls, and confirmations.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "sentence-builder", "calls", "voice-notes"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short voice note explaining that the call dropped, asking for the missing detail, and confirming the final plan.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Ask for the update",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "What’s up? Fill me in; tell me what happened.",
        "¿Qué tú dices? Dame luz; dime a ver qué pasó.",
        "This is a very Dominican way to open a call and ask for the situation.",
        breakdown([["What’s up?", "¿Qué tú dices?"], ["Fill me in", "Dame luz"], ["tell me", "dime a ver"], ["what happened", "qué pasó"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Fix the signal",
        sentenceVocab.slice(3, 6),
        sentenceVocab.slice(0, 6),
        "Can you hear me properly? I lost you, but now I can hear you clearly.",
        "¿Tú me oyes bien? Te me fuiste, pero ya te oigo nítido.",
        "Use this when a call cuts out and then comes back clearly.",
        breakdown([["Can you hear me properly?", "¿Tú me oyes bien?"], ["I lost you", "Te me fuiste"], ["now I can hear you clearly", "ya te oigo nítido"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Ask for a moment",
        sentenceVocab.slice(6, 9),
        sentenceVocab.slice(0, 9),
        "Hold on, give me a second; I’m handling an errand.",
        "Espérate ahí, dame un chance; estoy en una vuelta.",
        "This keeps the person on the line while explaining why you are busy.",
        breakdown([["Hold on", "Espérate ahí"], ["give me a second", "dame un chance"], ["I’m handling an errand", "estoy en una vuelta"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Confirm later",
        sentenceVocab.slice(9, 12),
        sentenceVocab.slice(0, 12),
        "I’m sorting things out. I’ll confirm in a bit; don’t leave me hanging.",
        "Estoy resolviendo. Ahorita te confirmo; no me dejes en el aire.",
        "This balances delay with responsibility: you are working on it, but you still need follow-up.",
        breakdown([["I’m sorting things out", "Estoy resolviendo"], ["I’ll confirm in a bit", "ahorita te confirmo"], ["don’t leave me hanging", "no me dejes en el aire"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Keep contact open",
        sentenceVocab.slice(12, 15),
        sentenceVocab.slice(0, 15),
        "Let me know. If anything comes up, hit me up; I’ll hit you up too.",
        "Tú me avisas. Cualquier cosa me tiras; yo te tiro también.",
        "These are flexible Dominican contact phrases for plan coordination.",
        breakdown([["Let me know", "Tú me avisas"], ["If anything comes up, hit me up", "Cualquier cosa me tiras"], ["I’ll hit you up too", "yo te tiro también"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Manage pressure",
        sentenceVocab.slice(15, 19),
        sentenceVocab.slice(0, 19),
        "I’m running around like crazy, but let me sort that out. Don’t pressure me.",
        "Tengo un corre-corre, pero déjame cuadrar eso. No me cojas presión.",
        "This is a practical boundary: you will handle it, but not under pressure.",
        breakdown([["I’m running around like crazy", "Tengo un corre-corre"], ["let me sort that out", "déjame cuadrar eso"], ["don’t pressure me", "no me cojas presión"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Use voice notes",
        sentenceVocab.slice(19, 23),
        sentenceVocab.slice(0, 23),
        "Send me a voice note, because I didn’t catch that part. How did you say it again?",
        "Mándame un audio por ahí, porque esa parte no la agarré. ¿Cómo fue que tú dijiste?",
        "This handles missed information without blaming the other person.",
        breakdown([["Send me a voice note", "Mándame un audio por ahí"], ["I didn’t catch that part", "esa parte no la agarré"], ["How did you say it again?", "¿Cómo fue que tú dijiste?"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Get to the point",
        sentenceVocab.slice(23, 27),
        sentenceVocab.slice(0, 27),
        "You’re cutting out, the call dropped, and you sent me a whole movie. What’s the point?",
        "Se te está cortando, se cayó la llamada y me mandaste una película. ¿Cuál es el punto?",
        "This is playful but direct. “¿Cuál es el punto?” can sound impatient, so use it carefully.",
        breakdown([["You’re cutting out", "Se te está cortando"], ["the call dropped", "se cayó la llamada"], ["you sent me a whole movie", "me mandaste una película"], ["what’s the point?", "¿cuál es el punto?"]]),
      ),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyMessages: StoryMessage[] = [
  message("m1", "valeria", "¿Qué tú dices, Andrés? Dame luz con lo del salón.", "What’s up, Andrés? Fill me in about the event room.", ["¿Qué tú dices?", "Dame luz"], "voice-note", `${storyAudioBase}/m1.mp3`),
  message("m2", "andres", "Estoy en una vuelta ahora mismo, pero estoy resolviendo.", "I’m handling an errand right now, but I’m sorting things out.", ["estar en una vuelta", "una vuelta", "estar resolviendo"]),
  message("m3", "valeria", "Dime a ver, porque te tiré y no entraste.", "Tell me, because I called you and you didn’t answer.", ["Dime a ver", "te tiré y no entraste"]),
  message("m4", "andres", "Tengo un corre-corre desde temprano. El dueño cambió la hora.", "I’ve been running around like crazy since early. The owner changed the time.", ["tener un corre-corre", "un corre-corre"]),
  message("m5", "valeria", "No me dejes en el aire con eso, que yo tengo que avisarle a la gente.", "Don’t leave me hanging with that, because I have to tell people.", ["No me dejes en el aire"]),
  message("m6", "andres", "¿Tú me oyes bien? Como que se te está yendo la señal.", "Can you hear me properly? Looks like your signal is going.", ["¿Tú me oyes bien?", "como que se te está yendo la señal"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "valeria", "¿Cómo fue? Esa parte no la agarré.", "What was that? I didn’t catch that part.", ["¿Cómo fue?", "esa parte no la agarré"]),
  message("m8", "andres", "Te me fuiste. Espérate ahí, me voy a mover para la ventana.", "I lost you. Hold on, I’m going to move to the window.", ["Te me fuiste", "Espérate ahí"]),
  message("m9", "valeria", "Dale, ahora sí te oigo mejor.", "Alright, now I hear you better.", ["Dale"]),
  message("m10", "andres", "Ya te oigo nítido. El salón está libre a las siete, no a las seis.", "I can hear you clearly now. The room is free at seven, not six.", ["Ya te oigo nítido", "nítido"]),
  message("m11", "valeria", "Ok, déjame cuadrar eso con la comida.", "Okay, let me sort that out with the food.", ["Déjame cuadrar eso", "cuadrar algo"], "voice-note", `${storyAudioBase}/m11.mp3`),
  message("m12", "andres", "No me cojas presión, que el tipo todavía no confirma el depósito.", "Don’t pressure me, because the guy still hasn’t confirmed the deposit.", ["No me cojas presión"]),
  message("m13", "valeria", "No te estoy presionando, pero ahorita te confirmo si el chef puede a las siete.", "I’m not pressuring you, but I’ll confirm in a bit if the chef can do seven.", ["Ahorita te confirmo"]),
  message("m14", "andres", "Tú me avisas. Cualquier cosa me tiras.", "Let me know. If anything comes up, hit me up.", ["Tú me avisas", "Cualquier cosa me tiras"]),
  message("m15", "valeria", "Si se cae otra vez, mándame un audio por ahí.", "If it drops again, send me a voice note.", ["se cayó la llamada", "mándame un audio por ahí"]),
  message("m16", "andres", "Se te está cortando otra vez. Déjame eso en un audio si no entra la llamada.", "You’re cutting out again. Leave that in a voice note if the call doesn’t go through.", ["se te está cortando", "déjame eso en un audio"], "voice-note", `${storyAudioBase}/m16.mp3`),
  message("m17", "valeria", "Se cayó la llamada. Te escribo mejor.", "The call dropped. I’ll text you instead.", ["se cayó la llamada"]),
  message("m18", "andres", "Tírame otra vez en dos minutos; voy cruzando una avenida.", "Call me again in two minutes; I’m crossing an avenue.", ["tírame otra vez"]),
  message("m19", "valeria", "Ahorita te digo lo del chef. No te me pierdas.", "I’ll tell you in a bit about the chef. Don’t disappear on me.", ["Ahorita te digo", "No te me pierdas"]),
  message("m20", "andres", "Yo te tiro cuando llegue al salón.", "I’ll hit you up when I get to the room.", ["yo te tiro"]),
  message("m21", "valeria", "Andrés, me mandaste una película de tres minutos. ¿Cuál es el punto?", "Andrés, you sent me a whole movie of three minutes. What’s the point?", ["me mandaste una película", "una película", "¿Cuál es el punto?"], "voice-note", `${storyAudioBase}/m21.mp3`),
  message("m22", "andres", "Jajaja perdón. El punto: hay que cambiar la invitación a las siete.", "Haha sorry. The point: we have to change the invitation to seven.", ["¿Cuál es el punto?"]),
  message("m23", "valeria", "Eso era todo. ¿Cómo fue que tú dijiste el nombre del salón?", "That was everything. How did you say the room name again?", ["¿Cómo fue que tú dijiste…?"]),
  message("m24", "andres", "Salón Brisa. Te lo dejo en un audio corto ahora.", "Salón Brisa. I’ll leave it in a short voice note now.", ["déjame eso en un audio"]),
  message("m25", "valeria", "Perfecto. ¿Qué se hizo con el depósito?", "Perfect. What ended up happening with the deposit?", ["¿qué se hizo?"]),
  message("m26", "andres", "Lo resolví. Pagué la mitad y quedamos en eso para asegurar la fecha.", "I sorted it out. I paid half and that’s the plan to secure the date.", ["resolver", "Quedamos en eso"], "voice-note", `${storyAudioBase}/m26.mp3`),
  message("m27", "valeria", "Nítido. Dame luz cuando termines con el dueño.", "Perfect. Update me when you finish with the owner.", ["nítido", "dame luz cuando termines"]),
  message("m28", "andres", "Dale. Y si Laura pregunta, dile que todo va para las siete.", "Alright. And if Laura asks, tell her everything is moving to seven.", ["Dale"]),
  message("m29", "valeria", "Ok, yo cuadro el mensaje y tú confirmas el salón.", "Okay, I’ll arrange the message and you confirm the room.", ["cuadrar algo"]),
  message("m30", "andres", "Quedamos en eso. Cualquier cosa me tiras y yo te tiro al salir.", "That’s the plan. If anything comes up, hit me up and I’ll message you when I leave.", ["Quedamos en eso", "Cualquier cosa me tiras", "yo te tiro"]),
];

const storyChecks: NonNullable<WhatsAppStory["data"]["comprehensionChecks"]> = [
  { id: "check-1", afterMessageId: "m3", question: { id: "story-q1", type: "multiple-choice", prompt: "Why is Valeria asking Andrés for an update?", options: ["She called him and he didn’t answer", "She lost the venue keys", "She cancelled the event", "She forgot his name"], correctAnswer: "She called him and he didn’t answer", explanation: "Valeria says “te tiré y no entraste.”", points: 1, skillTag: "detail" } },
  { id: "check-2", afterMessageId: "m6", question: { id: "story-q2", type: "multiple-choice", prompt: "What problem happens during the call?", options: ["The signal is going", "The chef arrives early", "The venue closes forever", "Andrés loses his phone"], correctAnswer: "The signal is going", explanation: "Andrés says “como que se te está yendo la señal.”", points: 1, skillTag: "call-problem" } },
  { id: "check-3", afterMessageId: "m9", question: { id: "story-q3", type: "true-false", prompt: "Valeria catches every detail in message 7.", correctAnswer: "false", explanation: "She says “esa parte no la agarré.”", points: 1, skillTag: "comprehension-repair" } },
  { id: "check-4", afterMessageId: "m12", question: { id: "story-q4", type: "multiple-choice", prompt: "What is the new time for the room?", options: ["Seven", "Six", "Five", "Eight-thirty"], correctAnswer: "Seven", explanation: "Andrés says the room is free at seven, not six.", points: 1, skillTag: "detail" } },
  { id: "check-5", afterMessageId: "m15", question: { id: "story-q5", type: "multiple-choice", prompt: "What does Valeria ask Andrés to do if the call drops again?", options: ["Send a voice note", "Cancel the room", "Pay the chef", "Turn off the phone"], correctAnswer: "Send a voice note", explanation: "She says “mándame un audio por ahí.”", points: 1, skillTag: "voice-note" } },
  { id: "check-6", afterMessageId: "m18", question: { id: "story-q6", type: "multiple-choice", prompt: "Why does Andrés ask Valeria to call again in two minutes?", options: ["He is crossing an avenue", "He is eating dinner", "He is recording music", "He is deleting messages"], correctAnswer: "He is crossing an avenue", explanation: "He says he is crossing an avenue.", points: 1, skillTag: "detail" } },
  { id: "check-7", afterMessageId: "m21", question: { id: "story-q7", type: "multiple-choice", prompt: "Why does Valeria call Andrés’s audio “una película”?", options: ["It is ridiculously long", "It has actors in it", "It is about a cinema", "It has no sound"], correctAnswer: "It is ridiculously long", explanation: "She says it was a three-minute voice note and asks for the point.", points: 1, skillTag: "figurative-language" } },
  { id: "check-8", afterMessageId: "m24", question: { id: "story-q8", type: "multiple-choice", prompt: "What specific information does Valeria ask Andrés to repeat?", options: ["The name of the room", "The chef’s phone number", "Laura’s address", "The deposit amount"], correctAnswer: "The name of the room", explanation: "She asks how he said the name of the room.", points: 1, skillTag: "detail" } },
  { id: "check-9", afterMessageId: "m27", question: { id: "story-q9", type: "true-false", prompt: "Andrés solves the deposit by paying half.", correctAnswer: "true", explanation: "He says “Lo resolví. Pagué la mitad.”", points: 1, skillTag: "resolution" } },
  { id: "check-10", afterMessageId: "m30", question: { id: "story-q10", type: "multiple-choice", prompt: "What is the final plan?", options: ["Valeria updates the message and Andrés confirms the room", "They cancel everything", "Laura confirms the room", "The event moves to six"], correctAnswer: "Valeria updates the message and Andrés confirms the room", explanation: "Message 29 sets those roles, and message 30 confirms the plan.", points: 1, skillTag: "gist" } },
];

export const dominicanSpanishB2PhoneCallsVoiceNotesWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican Spanish B2: The Call Keeps Dropping",
  subtitle: "A realistic Dominican chat about bad signal, missed calls, voice notes, updates, and saving an event plan.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "story", "calls", "voice-notes"],
  estimatedMinutes: 25,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "valeria", name: "Valeria", initials: "V", side: "left", color: "violet" },
      { id: "andres", name: "Andrés", initials: "A", side: "right", color: "cyan" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyChecks,
    learnedVocab: phoneVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["Dame luz.", "¿Tú me oyes bien?", "Te me fuiste.", "Ahorita te confirmo.", "Quedamos en eso."],
      grammarPatterns: ["Phone-call repair phrases", "Casual Dominican contact verbs with tirar", "Plan confirmation with quedar/cuadrar/resolver"],
      speakingPrompts: ["Explain that the call dropped and ask for a voice note.", "Tell someone not to leave you hanging.", "Confirm a plan after chaotic back-and-forth."],
    },
    completionTask: {
      title: "Record a call-repair voice note",
      instructions: "Record 30-45 seconds saying the call dropped, what detail you missed, and what the final plan is.",
    },
  },
};

export const dominicanSpanishB2PhoneCallsVoiceNotesReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Dominican Calls, Voice Notes, and Bad Signal",
  subtitle: "A synced reading about real Dominican phone phrases for dropped calls, unclear audio, updates, and voice-note etiquette.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "reading", "calls", "voice-notes"],
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
        text: "El español dominicano por teléfono es rápido, práctico y lleno de frases para reparar la comunicación. Una llamada puede empezar con “¿Qué tú dices?” y pasar rápido a “Dame luz” o “Dime a ver” cuando alguien necesita la actualización. Son formas casuales y cercanas de pedir que te cuenten qué está pasando.",
        highlights: highlights(["¿Qué tú dices?", "Dame luz", "Dime a ver"]),
        shadowLine: "¿Qué tú dices? Dame luz, dime a ver.",
      },
      {
        id: "p2",
        text: "Cuando la señal está mala, frases como “¿Tú me oyes bien?”, “te me fuiste” y “ya te oigo nítido” mantienen la conversación viva. “Nítido” puede significar claro, perfecto o todo bien, así que el contexto manda.",
        highlights: highlights(["¿Tú me oyes bien?", "Te me fuiste", "Ya te oigo nítido", "nítido"]),
        shadowLine: "¿Tú me oyes bien? Te me fuiste, pero ya te oigo nítido.",
      },
      {
        id: "p3",
        text: "Si no entendiste algo, puedes decir “¿Cómo fue?”, “no la agarré” o “esa parte no la agarré”. Para pedir una repetición más específica, usa “¿Cómo fue que tú dijiste...?” Son frases menos formales que “no entendí”, pero muy útiles en llamadas reales.",
        highlights: highlights(["¿Cómo fue?", "no la agarré", "esa parte no la agarré", "¿Cómo fue que tú dijiste…?"]),
        shadowLine: "¿Cómo fue? Esa parte no la agarré.",
      },
      {
        id: "p4",
        text: "Muchas veces, un dominicano explica que está ocupado con “estoy en una vuelta”, “estoy resolviendo” o “tengo un corre-corre”. Esas frases muestran que la persona anda moviéndose, cuadrando o manejando algo, no simplemente ignorando la llamada.",
        highlights: highlights(["estar en una vuelta", "una vuelta", "estar resolviendo", "tener un corre-corre", "un corre-corre"]),
        shadowLine: "Estoy en una vuelta y tengo un corre-corre.",
      },
      {
        id: "p5",
        text: "Para hacer planes, “cuadrar algo”, “déjame cuadrar eso” y “ahorita te confirmo” son claves. Dejan espacio para arreglar detalles. Pero si la otra persona necesita una respuesta, puede decir “no me dejes en el aire”.",
        highlights: highlights(["cuadrar algo", "Déjame cuadrar eso", "Ahorita te confirmo", "No me dejes en el aire"]),
        shadowLine: "Déjame cuadrar eso y ahorita te confirmo.",
      },
      {
        id: "p6",
        text: "Los audios resuelven mucho cuando la llamada falla. Puedes decir “mándame un audio por ahí” o “déjame eso en un audio”. Pero si el audio es demasiado largo, alguien puede bromear: “me mandaste una película”. En ese caso, “¿Cuál es el punto?” significa: ve al grano.",
        highlights: highlights(["mándame un audio por ahí", "déjame eso en un audio", "me mandaste una película", "una película", "¿Cuál es el punto?"]),
        shadowLine: "Mándame un audio por ahí, pero no una película.",
      },
      {
        id: "p7",
        text: "Para cerrar la conversación, el español dominicano usa frases flexibles de contacto: “tú me avisas”, “cualquier cosa me tiras”, “yo te tiro” y “quedamos en eso”. Juntas, indican que el plan sigue vivo, los detalles están suficientemente claros y cada quien sabe quién le avisa a quién.",
        highlights: highlights(["Tú me avisas", "Cualquier cosa me tiras", "yo te tiro", "Quedamos en eso"]),
        shadowLine: "Quedamos en eso. Cualquier cosa me tiras.",
      },
    ],
    glossary: highlights(phoneVocab.map((item) => item.term)),
    questions: [
      { id: "reading-q1", type: "multiple-choice", prompt: "Which phrase asks someone to fill you in?", options: ["Dame luz", "Se cayó la llamada", "Una película", "No la agarré"], correctAnswer: "Dame luz", explanation: "“Dame luz” means give me the update or fill me in.", points: 1, skillTag: "meaning" },
      { id: "reading-q2", type: "multiple-choice", prompt: "What does “te me fuiste” mean on a call?", options: ["I lost you / you cut out", "You arrived early", "You sent a long audio", "You confirmed the plan"], correctAnswer: "I lost you / you cut out", explanation: "It is used when the audio or signal drops.", points: 1, skillTag: "call-repair" },
      { id: "reading-q3", type: "true-false", prompt: "“Me mandaste una película” is a joke about a very long voice note.", correctAnswer: "true", explanation: "The reading says it refers to a voice note that is too long.", points: 1, skillTag: "figurative-language" },
      { id: "reading-q4", type: "multiple-choice", prompt: "Which phrase closes a plan by saying “that’s the plan”?", options: ["Quedamos en eso", "¿Cómo fue?", "Dame un chance", "Se te está cortando"], correctAnswer: "Quedamos en eso", explanation: "“Quedamos en eso” confirms the final arrangement.", points: 1, skillTag: "confirmation" },
      { id: "reading-q5", type: "fill-blank", prompt: "Complete: “Esa parte no la ____.”", options: ["agarré", "tiré", "oigo", "cuadro"], correctAnswer: "agarré", explanation: "“Esa parte no la agarré” means I didn’t catch that part.", points: 1, skillTag: "repair" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "quiz-q1", type: "multiple-choice", prompt: "You need someone to update you on what happened. Choose the phrase.", options: ["Dame luz", "Te me fuiste", "Una película", "Se cayó la llamada"], correctAnswer: "Dame luz", explanation: "“Dame luz” asks for the update.", points: 1, skillTag: "context" },
  { id: "quiz-q2", type: "multiple-choice", prompt: "The phone audio disappears for a second. What do you say?", options: ["Te me fuiste", "Quedamos en eso", "Dale", "Estoy resolviendo"], correctAnswer: "Te me fuiste", explanation: "It means I lost you / you cut out.", points: 1, skillTag: "call-problem" },
  { id: "quiz-q3", type: "multiple-choice", prompt: "You need someone to send the info as a voice note. Choose the best phrase.", options: ["Déjame eso en un audio", "No me cojas presión", "Ahorita te confirmo", "¿Qué se hizo?"], correctAnswer: "Déjame eso en un audio", explanation: "This means leave/send me that in a voice note.", points: 1, skillTag: "voice-note" },
  { id: "quiz-q4", type: "multiple-choice", prompt: "Someone sends a voice note that is way too long. What playful complaint fits?", options: ["Me mandaste una película", "Ya te oigo nítido", "Estoy en una vuelta", "Tú me avisas"], correctAnswer: "Me mandaste una película", explanation: "It means the voice note was ridiculously long.", points: 1, skillTag: "voice-note" },
  { id: "quiz-q5", type: "fill-blank", prompt: "Complete: “¿Tú me ____ bien?”", options: ["oyes", "tiras", "cuadras", "agarras"], correctAnswer: "oyes", explanation: "“¿Tú me oyes bien?” means can you hear me properly?", points: 1, skillTag: "call-repair" },
  { id: "quiz-q6", type: "fill-blank", prompt: "Complete: “No me dejes en el ____.”", options: ["aire", "audio", "chance", "punto"], correctAnswer: "aire", explanation: "“No me dejes en el aire” means don’t leave me hanging.", points: 1, skillTag: "pressure" },
  { id: "quiz-q7", type: "fill-blank", prompt: "Complete: “Ahorita te ____ la hora.”", options: ["confirmo", "fuiste", "cayó", "película"], correctAnswer: "confirmo", explanation: "“Ahorita te confirmo” means I’ll confirm in a bit.", points: 1, skillTag: "planning" },
  { id: "quiz-q8", type: "fill-blank", prompt: "Complete: “Se ____ la llamada.”", options: ["cayó", "fuiste", "agarré", "dices"], correctAnswer: "cayó", explanation: "“Se cayó la llamada” means the call dropped.", points: 1, skillTag: "call-problem" },
  { id: "quiz-q9", type: "true-false", prompt: "“No me cojas presión” means don’t pressure me.", correctAnswer: "true", explanation: "It is a Dominican-style way to ask someone not to rush you.", points: 1, skillTag: "meaning" },
  { id: "quiz-q10", type: "true-false", prompt: "“Tírame” can mean call me or message me depending on context.", correctAnswer: "true", explanation: "In phone/chat contexts, “tírame” means hit me up.", points: 1, skillTag: "meaning" },
  { id: "quiz-q11", type: "true-false", prompt: "“Nítido” can mean clear or perfect/all good.", correctAnswer: "true", explanation: "The meaning depends on context.", points: 1, skillTag: "meaning" },
  { id: "quiz-q12", type: "true-false", prompt: "“Quedamos en eso” means the plan is still completely unknown.", correctAnswer: "false", explanation: "It means that’s the plan / agreed.", points: 1, skillTag: "confirmation" },
  { id: "quiz-q13", type: "match-pairs", prompt: "Match the call phrase to its meaning.", pairs: [{ left: "se te está cortando", right: "you’re cutting out" }, { left: "te me fuiste", right: "I lost you" }, { left: "ya te oigo nítido", right: "I hear you clearly now" }, { left: "se cayó la llamada", right: "the call dropped" }], explanation: "These all manage bad signal and dropped calls.", points: 4, skillTag: "call-repair" },
  { id: "quiz-q14", type: "match-pairs", prompt: "Match the planning phrase to its function.", pairs: [{ left: "déjame cuadrar eso", right: "let me arrange that" }, { left: "ahorita te confirmo", right: "I’ll confirm in a bit" }, { left: "tú me avisas", right: "let me know" }, { left: "quedamos en eso", right: "that’s the plan" }], explanation: "These phrases coordinate and close plans.", points: 4, skillTag: "planning" },
  { id: "quiz-q15", type: "order-words", prompt: "Put the words in order: “Can you hear me properly?”", wordBank: ["¿Tú", "me", "oyes", "bien?"], correctAnswer: "¿Tú me oyes bien?", explanation: "The full question is “¿Tú me oyes bien?”", points: 1, skillTag: "word-order" },
  { id: "quiz-q16", type: "order-words", prompt: "Put the words in order: “Don’t leave me hanging.”", wordBank: ["No", "me", "dejes", "en", "el", "aire"], correctAnswer: "No me dejes en el aire", explanation: "This is the fixed expression for don’t leave me hanging.", points: 1, skillTag: "word-order" },
  { id: "quiz-q17", type: "order-words", prompt: "Put the words in order: “If anything comes up, hit me up.”", wordBank: ["Cualquier", "cosa", "me", "tiras"], correctAnswer: "Cualquier cosa me tiras", explanation: "This keeps communication open.", points: 1, skillTag: "word-order" },
  { id: "quiz-q18", type: "order-words", prompt: "Put the words in order: “That’s the plan.”", wordBank: ["Quedamos", "en", "eso"], correctAnswer: "Quedamos en eso", explanation: "This confirms the arrangement.", points: 1, skillTag: "word-order" },
  { id: "quiz-q19", type: "multiple-choice", prompt: "You want to say you are busy handling an errand. Choose the phrase.", options: ["Estoy en una vuelta", "Me mandaste una película", "No la agarré", "Ya te oigo nítido"], correctAnswer: "Estoy en una vuelta", explanation: "“Estar en una vuelta” means to be out handling an errand or situation.", points: 1, skillTag: "context" },
  { id: "quiz-q20", type: "multiple-choice", prompt: "You need someone to repeat only the part you missed. Choose the phrase.", options: ["Esa parte no la agarré", "Quedamos en eso", "Tú me avisas", "Dale"], correctAnswer: "Esa parte no la agarré", explanation: "It means I didn’t catch that part.", points: 1, skillTag: "comprehension-repair" },
];

export const dominicanSpanishB2PhoneCallsVoiceNotesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Quiz: Dominican B2 Phone Calls & Voice Notes",
  subtitle: "Choose the right Dominican phrase for bad signal, voice notes, missed calls, updates, and final confirmations.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "quiz", "phone-calls", "voice-notes"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Test whether you can choose the correct Dominican phone or voice-note phrase in realistic communication contexts.",
    passScore: 14,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
