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

const courseId = "cuban-spanish-b2-havana-music-night";
const sectionName = "Cuban Spanish - B2 Havana Music Night";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const musicVocab: VocabItem[] = [
  { id: "musica-en-vivo", term: "esta noche hay música en vivo", meaning: "there’s live music tonight", note: "Natural way to announce a live-music plan.", example: "Esta noche hay música en vivo cerca del Malecón.", translation: "There’s live music tonight near the Malecón.", starred: true },
  { id: "echar-un-pie", term: "vamos a echar un pie", meaning: "let’s go dance", note: "Cuban informal phrase for dancing.", example: "Si la banda se pone buena, vamos a echar un pie.", translation: "If the band gets good, let’s go dance.", starred: true },
  { id: "tremendo-ambiente", term: "hay tremendo ambiente", meaning: "there’s a great atmosphere", note: "Tremendo intensifies the praise.", example: "Hay tremendo ambiente en este lugar.", translation: "There’s a great atmosphere in this place.", starred: true },
  { id: "se-puso-bueno", term: "esto se puso bueno", meaning: "this got good / things are getting good", note: "Use when the night suddenly improves.", example: "Entró la banda y esto se puso bueno.", translation: "The band came in and this got good.", starred: true },
  { id: "te-embullas", term: "¿te embullas?", meaning: "are you up for it? / are you getting excited about it?", note: "Embullarse means to get enthusiastic or agree to join.", example: "Hay música en vivo, ¿te embullas?", translation: "There’s live music; are you up for it?", starred: true },
  { id: "se-formo", term: "se formó", meaning: "things really kicked off", note: "Very useful for when a party suddenly becomes lively.", example: "Cuando empezó el son, se formó.", translation: "When the son started, things kicked off.", starred: true },
  { id: "vamos-a-gozar", term: "vamos a gozar", meaning: "let’s enjoy ourselves / have a great time", note: "Core Cuban phrase for enjoying the moment.", example: "Olvídate del estrés; vamos a gozar.", translation: "Forget the stress; let’s have a great time.", starred: true },
  { id: "vacilon", term: "esto es un vacilón", meaning: "this is a real party / a lot of fun", note: "Vacilón describes a fun, lively situation.", example: "Esta noche es un vacilón completo.", translation: "Tonight is a total blast.", starred: true },
  { id: "gente-encendida", term: "la gente está encendida", meaning: "people are really fired up / into it", note: "Describes a crowd with strong energy.", example: "La gente está encendida con la música.", translation: "People are really into the music.", starred: true },
  { id: "se-lleno", term: "esto se llenó", meaning: "this place filled up", note: "For a venue or street that becomes packed.", example: "Llegamos temprano, pero esto se llenó rápido.", translation: "We arrived early, but this place filled up fast.", starred: true },
  { id: "no-cabe-un-alma", term: "no cabe un alma", meaning: "there isn’t room for another soul", note: "Stronger than está lleno.", example: "No cabe un alma frente a la tarima.", translation: "There isn’t room for another soul in front of the stage.", starred: true },
  { id: "movernos-para-alla", term: "vamos a movernos para allá", meaning: "let’s move over there", note: "Useful in crowds when choosing a better spot.", example: "Aquí no se ve nada; vamos a movernos para allá.", translation: "You can’t see anything here; let’s move over there.", starred: true },
  { id: "acercarnos", term: "vamos a acercarnos un poco", meaning: "let’s get a little closer", note: "Softer than pushing directly through the crowd.", example: "Vamos a acercarnos un poco para escuchar mejor.", translation: "Let’s get a little closer to hear better.", starred: true },
  { id: "que-clase-ambiente", term: "qué clase de ambiente", meaning: "what an atmosphere", note: "Expressive Cuban reaction to a strong vibe.", example: "Qué clase de ambiente hay aquí esta noche.", translation: "What an atmosphere there is here tonight.", starred: true },
  { id: "musica-buenisima", term: "la música está buenísima", meaning: "the music is really good", note: "Everyday reaction to a band or DJ.", example: "La música está buenísima; no me quiero ir.", translation: "The music is really good; I don’t want to leave.", starred: true },
  { id: "en-candela", term: "esto está en candela", meaning: "this is on fire / intense", note: "Energetic phrase for a scene with heat and excitement.", example: "La pista está en candela ahora mismo.", translation: "The dance floor is on fire right now.", starred: true },
  { id: "dar-una-vuelta", term: "vamos a dar una vuelta", meaning: "let’s take a walk / make a lap", note: "Useful when moving around a venue or street party.", example: "Vamos a dar una vuelta y vemos dónde hay menos gente.", translation: "Let’s take a lap and see where there are fewer people.", starred: true },
  { id: "rato-mas", term: "me quedo un rato más", meaning: "I’m staying a little longer", note: "Soft way to extend the night.", example: "Estoy cansada, pero me quedo un rato más.", translation: "I’m tired, but I’m staying a little longer.", starred: true },
  { id: "afuera-un-momento", term: "vamos afuera un momento", meaning: "let’s step outside for a moment", note: "Useful when a place is crowded, hot, or loud.", example: "Hay mucho ruido; vamos afuera un momento.", translation: "There’s a lot of noise; let’s step outside for a moment.", starred: true },
  { id: "volvemos-a-entrar", term: "ahora volvemos a entrar", meaning: "we’ll go back inside now", note: "Reassures the group that stepping outside is temporary.", example: "Respiramos aire y ahora volvemos a entrar.", translation: "We’ll get some air and then go back inside.", starred: true },
  { id: "se-esta-gozando", term: "aquí se está gozando", meaning: "people are really having a good time here", note: "Focuses on collective enjoyment.", example: "Aquí se está gozando de verdad.", translation: "People are really having a good time here.", starred: true },
  { id: "hasta-que-se-acabe", term: "nos quedamos hasta que se acabe", meaning: "we’ll stay until it finishes", note: "Commitment to stay until the music ends.", example: "Si sigue así, nos quedamos hasta que se acabe.", translation: "If it keeps going like this, we’ll stay until it finishes.", starred: true },
  { id: "todo-mundo-bailar", term: "todo el mundo quiere bailar", meaning: "everyone wants to dance", note: "Describes the crowd’s mood.", example: "Con esta canción, todo el mundo quiere bailar.", translation: "With this song, everyone wants to dance.", starred: true },
  { id: "quedarnos-rato-mas", term: "vamos a quedarnos un rato más", meaning: "let’s stay a little longer", note: "Group suggestion to extend the plan.", example: "La música está buenísima; vamos a quedarnos un rato más.", translation: "The music is really good; let’s stay a little longer.", starred: true },
];

const highlightMap = Object.fromEntries(musicVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const storyAudioBase = `/audio/stories/${courseId}`;

type Highlight = { phrase: string; meaning: string; note: string };

function highlights(phrases: string[]) {
  return phrases.map((phrase) => highlightMap[phrase]).filter((item): item is Highlight => Boolean(item));
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

export const cubanSpanishB2HavanaMusicNightFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Cuban Spanish B2: Havana Music Night Flashcards",
  subtitle: "Cuban phrases for live music, dancing, crowded venues, moving around, and extending the night naturally.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Cuban Spanish", "B2", "flashcards", "music", "Havana", "nightlife"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: musicVocab.map(cardFromVocab) },
};

const sentenceVocab = [
  "esta noche hay música en vivo = there’s live music tonight",
  "¿te embullas? = are you up for it?",
  "vamos a echar un pie = let’s go dance",
  "hay tremendo ambiente = there’s a great atmosphere",
  "esto se puso bueno = this got good",
  "se formó = things kicked off",
  "vamos a gozar = let’s enjoy ourselves",
  "esto es un vacilón = this is a lot of fun",
  "esto se llenó = this place filled up",
  "no cabe un alma = there isn’t room for another soul",
  "vamos a movernos para allá = let’s move over there",
  "vamos a acercarnos un poco = let’s get a little closer",
  "la música está buenísima = the music is really good",
  "esto está en candela = this is on fire",
  "vamos afuera un momento = let’s step outside for a moment",
  "ahora volvemos a entrar = we’ll go back inside now",
  "aquí se está gozando = people are having a good time here",
  "nos quedamos hasta que se acabe = we’ll stay until it finishes",
  "vamos a quedarnos un rato más = let’s stay a little longer",
];

export const cubanSpanishB2HavanaMusicNightSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Havana Music Night",
  subtitle: "Build Cuban Spanish for live music plans, dancing, crowds, stepping outside, and staying longer.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["cuban-spanish", "b2", "sentence-builder", "music", "nightlife"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a Cuban Spanish voice note inviting a friend to a live-music night, describing the atmosphere, dealing with the crowd, and suggesting whether to stay longer.",
    stages: [
      stage("stage-1", "Stage 1: Invite them", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "There’s live music tonight. Are you up for it? Let’s go dance.", "Esta noche hay música en vivo. ¿Te embullas? Vamos a echar un pie.", "Start with the event, then the invitation, then the action.", breakdown([["There’s live music tonight", "Esta noche hay música en vivo"], ["Are you up for it?", "¿Te embullas?"], ["Let’s go dance", "Vamos a echar un pie"]])),
      stage("stage-2", "Stage 2: React to the vibe", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "There’s a great atmosphere, and this got good when the band started.", "Hay tremendo ambiente, y esto se puso bueno cuando empezó la banda.", "Use tremendo ambiente and se puso bueno for a changing night.", breakdown([["There’s a great atmosphere", "Hay tremendo ambiente"], ["this got good", "esto se puso bueno"], ["when the band started", "cuando empezó la banda"]])),
      stage("stage-3", "Stage 3: The night kicks off", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "Things kicked off. Let’s enjoy ourselves; this is a real party.", "Se formó. Vamos a gozar; esto es un vacilón.", "This gives the moment a strong Cuban party feel.", breakdown([["Things kicked off", "Se formó"], ["Let’s enjoy ourselves", "Vamos a gozar"], ["this is a real party", "esto es un vacilón"]])),
      stage("stage-4", "Stage 4: Handle the crowd", sentenceVocab.slice(8, 12), sentenceVocab.slice(0, 12), "This place filled up. There isn’t room for another soul, so let’s move over there.", "Esto se llenó. No cabe un alma, así que vamos a movernos para allá.", "Crowd phrases help explain why you want to move.", breakdown([["This place filled up", "Esto se llenó"], ["There isn’t room for another soul", "No cabe un alma"], ["let’s move over there", "vamos a movernos para allá"]])),
      stage("stage-5", "Stage 5: Get closer", sentenceVocab.slice(11, 14), sentenceVocab.slice(0, 14), "Let’s get a little closer because the music is really good and this is on fire.", "Vamos a acercarnos un poco porque la música está buenísima y esto está en candela.", "Use porque to connect the movement to the reason.", breakdown([["Let’s get a little closer", "Vamos a acercarnos un poco"], ["the music is really good", "la música está buenísima"], ["this is on fire", "esto está en candela"]])),
      stage("stage-6", "Stage 6: Step outside", sentenceVocab.slice(14, 16), sentenceVocab.slice(0, 16), "Let’s step outside for a moment, and then we’ll go back inside.", "Vamos afuera un momento, y ahora volvemos a entrar.", "This is useful when the place is too hot, loud, or crowded.", breakdown([["Let’s step outside", "Vamos afuera"], ["for a moment", "un momento"], ["we’ll go back inside", "volvemos a entrar"]])),
      stage("stage-7", "Stage 7: Stay until the end", sentenceVocab.slice(16, 18), sentenceVocab.slice(0, 18), "People are having a good time here, so we’ll stay until it finishes.", "Aquí se está gozando, así que nos quedamos hasta que se acabe.", "Así que introduces the decision after seeing the vibe.", breakdown([["People are having a good time here", "Aquí se está gozando"], ["so", "así que"], ["we’ll stay until it finishes", "nos quedamos hasta que se acabe"]])),
      stage("stage-8", "Stage 8: Extend the plan", sentenceVocab.slice(18), sentenceVocab, "The music is really good. Let’s stay a little longer and enjoy ourselves.", "La música está buenísima. Vamos a quedarnos un rato más y vamos a gozar.", "This combines evaluation, extension, and enjoyment.", breakdown([["The music is really good", "La música está buenísima"], ["Let’s stay a little longer", "Vamos a quedarnos un rato más"], ["let’s enjoy ourselves", "vamos a gozar"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "cuban-b2-music-story-q1", type: "multiple-choice", prompt: "After message 3, what does Daniela want Marco to do?", options: ["Join a live-music plan", "Leave Havana tonight", "Buy groceries", "Call a taxi home"], correctAnswer: "Join a live-music plan", explanation: "She says there is live music tonight and asks if he is up for it.", points: 1, skillTag: "gist" },
  { id: "cuban-b2-music-story-q2", type: "multiple-choice", prompt: "After message 6, what changed at the venue?", options: ["The night got lively", "The band cancelled", "The place closed", "They lost their phones"], correctAnswer: "The night got lively", explanation: "They say hay tremendo ambiente and esto se puso bueno.", points: 1, skillTag: "vibe" },
  { id: "cuban-b2-music-story-q3", type: "multiple-choice", prompt: "After message 9, why is Marco excited?", options: ["Things kicked off and people are fired up", "He found a quiet library", "He wants to go home", "The street is empty"], correctAnswer: "Things kicked off and people are fired up", explanation: "He says se formó and la gente está encendida.", points: 1, skillTag: "energy" },
  { id: "cuban-b2-music-story-q4", type: "true-false", prompt: "True or false: By message 12, the place is almost empty.", options: ["True", "False"], correctAnswer: "False", explanation: "Daniela says esto se llenó and no cabe un alma.", points: 1, skillTag: "crowd" },
  { id: "cuban-b2-music-story-q5", type: "multiple-choice", prompt: "After message 15, what do they decide to do in the crowd?", options: ["Move and get a little closer", "Cancel the plan", "Stop the music", "Order breakfast"], correctAnswer: "Move and get a little closer", explanation: "They use vamos a movernos para allá and vamos a acercarnos un poco.", points: 1, skillTag: "movement" },
  { id: "cuban-b2-music-story-q6", type: "multiple-choice", prompt: "After message 18, how does Daniela describe the music?", options: ["It is really good", "It is too formal", "It is boring", "It already finished"], correctAnswer: "It is really good", explanation: "She says la música está buenísima.", points: 1, skillTag: "opinion" },
  { id: "cuban-b2-music-story-q7", type: "multiple-choice", prompt: "After message 21, why do they step outside?", options: ["To breathe for a moment and then return", "To leave forever", "To find a bus route", "To complain about the food"], correctAnswer: "To breathe for a moment and then return", explanation: "They say vamos afuera un momento and ahora volvemos a entrar.", points: 1, skillTag: "plan" },
  { id: "cuban-b2-music-story-q8", type: "multiple-choice", prompt: "After message 24, what is happening inside?", options: ["People are really enjoying themselves", "Everyone is silent", "No one wants to dance", "The venue is closed"], correctAnswer: "People are really enjoying themselves", explanation: "Marco says aquí se está gozando.", points: 1, skillTag: "mood" },
  { id: "cuban-b2-music-story-q9", type: "multiple-choice", prompt: "After message 27, how long do they want to stay?", options: ["Until it finishes", "Only two minutes", "Until breakfast tomorrow", "They already left"], correctAnswer: "Until it finishes", explanation: "Daniela says nos quedamos hasta que se acabe.", points: 1, skillTag: "duration" },
  { id: "cuban-b2-music-story-q10", type: "multiple-choice", prompt: "Which phrase from the story means “let’s stay a little longer” naturally?", options: ["Vamos a quedarnos un rato más", "No cabe un alma", "Se formó", "Vamos afuera un momento"], correctAnswer: "Vamos a quedarnos un rato más", explanation: "This phrase suggests extending the night a little.", points: 1, skillTag: "phrase" },
];

export const cubanSpanishB2HavanaMusicNightWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Cuban B2 Text Story: Havana Music Night",
  subtitle: "A Cuban Spanish chat about live music, dancing, crowd energy, stepping outside, and staying until the end.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Cuban Spanish", "B2", "WhatsApp", "music", "Havana", "nightlife"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "daniela", name: "Daniela", initials: "D", side: "left", color: "cyan" },
      { id: "marco", name: "Marco", initials: "M", side: "right", color: "blue" },
    ],
    messages: [
      message("n1", "daniela", "Story guide: Daniela and Marco are deciding whether to go to a live music night in Havana. Follow how the plan changes as the venue gets crowded and the atmosphere improves.", "Guide: Daniela and Marco are deciding whether to go to a live music night in Havana.", [], "narrator"),
      message("m1", "daniela", "Marco, esta noche hay música en vivo cerca del Malecón.", "Marco, there’s live music tonight near the Malecón.", ["esta noche hay música en vivo"], "voice-note", `${storyAudioBase}/m1.mp3`),
      message("m2", "marco", "¿En serio? Yo estaba por quedarme en casa.", "Seriously? I was about to stay home.", []),
      message("m3", "daniela", "No, chico. ¿Te embullas? Vamos a echar un pie aunque sea un rato.", "No, man. Are you up for it? Let’s go dance even if it’s just for a while.", ["¿te embullas?", "vamos a echar un pie"]),
      message("m4", "marco", "Dale, me embullo. Pero si está muerto, nos vamos rápido.", "Okay, I’m in. But if it’s dead, we leave quickly.", ["¿te embullas?"]),
      message("m5", "daniela", "Ya llegué. Hay tremendo ambiente desde la esquina.", "I already arrived. There’s a great atmosphere from the corner.", ["hay tremendo ambiente"], "voice-note", `${storyAudioBase}/m5.mp3`),
      message("m6", "marco", "Entonces esto se puso bueno antes de yo llegar.", "So this got good before I even arrived.", ["esto se puso bueno"]),
      message("m7", "daniela", "Sí. La banda está probando sonido y la gente ya está bailando.", "Yes. The band is doing soundcheck and people are already dancing.", []),
      message("m8", "marco", "Estoy doblando la esquina. Si empieza el son, se formó.", "I’m turning the corner. If the son starts, things are kicking off.", ["se formó"]),
      message("m9", "daniela", "Pues se formó ya. La gente está encendida.", "Well, things have already kicked off. People are fired up.", ["se formó", "la gente está encendida"]),
      message("m10", "marco", "Qué clase de ambiente. Esto es un vacilón desde la puerta.", "What an atmosphere. This is a real party from the door.", ["qué clase de ambiente", "esto es un vacilón"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "daniela", "Entra con calma, porque esto se llenó en diez minutos.", "Come in calmly, because this place filled up in ten minutes.", ["esto se llenó"]),
      message("m12", "marco", "Lo veo. No cabe un alma aquí delante.", "I see it. There isn’t room for another soul up front.", ["no cabe un alma"]),
      message("m13", "daniela", "Por eso te decía que llegaras temprano.", "That’s why I told you to arrive early.", []),
      message("m14", "marco", "Bueno, vamos a movernos para allá, por el lado de la columna.", "Well, let’s move over there, by the column.", ["vamos a movernos para allá"]),
      message("m15", "daniela", "Sí, y vamos a acercarnos un poco sin empujar a nadie.", "Yes, and let’s get a little closer without pushing anyone.", ["vamos a acercarnos un poco"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "marco", "Ahora sí se oye mejor. La música está buenísima.", "Now you can hear better. The music is really good.", ["la música está buenísima"]),
      message("m17", "daniela", "Y mira la pista: esto está en candela.", "And look at the dance floor: this is on fire.", ["esto está en candela"]),
      message("m18", "marco", "Con esta canción todo el mundo quiere bailar.", "With this song everyone wants to dance.", ["todo el mundo quiere bailar"]),
      message("m19", "daniela", "Vamos a dar una vuelta primero, a ver dónde hay menos calor.", "Let’s take a lap first, to see where it’s less hot.", ["vamos a dar una vuelta"]),
      message("m20", "marco", "Buena idea. También podemos ir afuera un momento.", "Good idea. We can also step outside for a moment.", ["vamos afuera un momento"], "voice-note", `${storyAudioBase}/m20.mp3`),
      message("m21", "daniela", "Sí, vamos afuera un momento y ahora volvemos a entrar.", "Yes, let’s step outside for a moment and then go back inside.", ["vamos afuera un momento", "ahora volvemos a entrar"]),
      message("m22", "marco", "Afuera se respira mejor, pero se oye la música todavía.", "Outside you can breathe better, but you can still hear the music.", []),
      message("m23", "daniela", "Cuando entre el próximo tema, volvemos.", "When the next song starts, we’ll go back.", ["ahora volvemos a entrar"]),
      message("m24", "marco", "Ya empezó. Aquí se está gozando de verdad.", "It already started. People are really having a good time here.", ["aquí se está gozando"]),
      message("m25", "daniela", "Te dije. Vamos a gozar y ya mañana descansamos.", "I told you. Let’s enjoy ourselves and tomorrow we’ll rest.", ["vamos a gozar"]),
      message("m26", "marco", "Yo decía que me iba temprano, pero me quedo un rato más.", "I said I was leaving early, but I’m staying a little longer.", ["me quedo un rato más"]),
      message("m27", "daniela", "Así me gusta. Si sigue así, nos quedamos hasta que se acabe.", "That’s what I like. If it keeps going like this, we’ll stay until it finishes.", ["nos quedamos hasta que se acabe"]),
      message("m28", "marco", "La banda no baja la energía. Qué clase de noche.", "The band isn’t lowering the energy. What a night.", ["qué clase de ambiente"]),
      message("m29", "daniela", "Entonces decidido: vamos a quedarnos un rato más.", "Then it’s decided: let’s stay a little longer.", ["vamos a quedarnos un rato más"]),
      message("m30", "marco", "Dale. Aquí se está gozando y la música está buenísima.", "Okay. People are having a great time here and the music is really good.", ["aquí se está gozando", "la música está buenísima"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: [
      { id: "cuban-b2-music-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "cuban-b2-music-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "cuban-b2-music-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "cuban-b2-music-check-4", afterMessageId: "m12", question: storyQuestions[3] },
      { id: "cuban-b2-music-check-5", afterMessageId: "m15", question: storyQuestions[4] },
      { id: "cuban-b2-music-check-6", afterMessageId: "m18", question: storyQuestions[5] },
      { id: "cuban-b2-music-check-7", afterMessageId: "m21", question: storyQuestions[6] },
      { id: "cuban-b2-music-check-8", afterMessageId: "m24", question: storyQuestions[7] },
      { id: "cuban-b2-music-check-9", afterMessageId: "m27", question: storyQuestions[8] },
      { id: "cuban-b2-music-check-10", afterMessageId: "m30", question: storyQuestions[9] },
    ],
    learnedVocab: musicVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: musicVocab.map((item) => item.term),
      grammarPatterns: ["Invitation: ¿te embullas? / vamos a echar un pie.", "Crowd management: esto se llenó / no cabe un alma / vamos a movernos para allá.", "Extending the night: me quedo un rato más / nos quedamos hasta que se acabe."],
      speakingPrompts: ["Invite a friend to a live music night.", "Describe the atmosphere and crowd.", "Suggest stepping outside and then staying longer."],
    },
    completionTask: { title: "Your Havana music-night voice note", instructions: "Record a 45-second Cuban Spanish voice note inviting a friend to live music, describing the crowd, and deciding whether to stay longer." },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text: "Una noche de música en vivo en La Habana no es solo ir a escuchar una banda. También es leer el ambiente. Si alguien dice “esta noche hay música en vivo” y pregunta “¿te embullas?”, no está haciendo una invitación fría; está midiendo si tú te animas a entrar en el plan.",
    translation: "A live music night in Havana is not only going to hear a band. It is also reading the atmosphere.",
    highlights: highlights(["esta noche hay música en vivo", "¿te embullas?"]),
    shadowLine: "Esta noche hay música en vivo. ¿Te embullas?",
  },
  {
    id: "p2",
    text: "Cuando la música empieza y la gente reacciona, puedes decir “hay tremendo ambiente”, “esto se puso bueno” o “se formó”. Son frases que describen un cambio de energía. La noche dejó de estar tranquila y empezó el movimiento: la gente habla más alto, se ríe, canta y quiere bailar.",
    translation: "When the music starts and people react, these phrases describe a change of energy.",
    highlights: highlights(["hay tremendo ambiente", "esto se puso bueno", "se formó", "todo el mundo quiere bailar"]),
    shadowLine: "Hay tremendo ambiente y esto se puso bueno.",
  },
  {
    id: "p3",
    text: "En un lugar lleno, también necesitas frases prácticas. Si “esto se llenó” y “no cabe un alma”, puedes decir “vamos a movernos para allá” o “vamos a acercarnos un poco”. La idea es moverse sin empujar, sin sonar desesperado y sin romper el ambiente de la noche.",
    translation: "In a crowded place, you also need practical phrases for moving without being rude.",
    highlights: highlights(["esto se llenó", "no cabe un alma", "vamos a movernos para allá", "vamos a acercarnos un poco"]),
    shadowLine: "No cabe un alma. Vamos a movernos para allá.",
  },
  {
    id: "p4",
    text: "Si el calor, el ruido o la multitud pesan demasiado, una salida suave es decir “vamos afuera un momento”. Eso no significa que el plan terminó. Por eso puedes añadir “ahora volvemos a entrar”. Así cuidas la energía del grupo sin apagar la noche.",
    translation: "If heat, noise, or the crowd becomes too much, step outside without ending the plan.",
    highlights: highlights(["vamos afuera un momento", "ahora volvemos a entrar"]),
    shadowLine: "Vamos afuera un momento y ahora volvemos a entrar.",
  },
  {
    id: "p5",
    text: "Al final, si “aquí se está gozando” y “la música está buenísima”, tiene sentido decir “me quedo un rato más” o “nos quedamos hasta que se acabe”. En este contexto, quedarse no es solo una decisión de tiempo; es reconocer que la noche agarró vida.",
    translation: "At the end, staying longer means recognizing that the night has come alive.",
    highlights: highlights(["aquí se está gozando", "la música está buenísima", "me quedo un rato más", "nos quedamos hasta que se acabe"]),
    shadowLine: "Aquí se está gozando. Nos quedamos hasta que se acabe.",
  },
];

export const cubanSpanishB2HavanaMusicNightReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Cuban B2 Havana Music Night",
  subtitle: "Understand Cuban Spanish for live music, crowd energy, movement, stepping outside, and staying longer.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Cuban Spanish", "B2", "reading", "music", "nightlife"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: musicVocab.map((item) => ({ phrase: item.term, meaning: item.meaning })),
    questions: [
      { id: "cuban-b2-music-reading-q1", type: "multiple-choice", prompt: "In the reading, what does “¿te embullas?” check?", options: ["Whether someone is up for the plan", "Whether the venue is closed", "Whether the food is expensive", "Whether the bus is late"], correctAnswer: "Whether someone is up for the plan", explanation: "The reading says it measures whether you are excited to join the plan.", points: 1, skillTag: "meaning" },
      { id: "cuban-b2-music-reading-q2", type: "true-false", prompt: "True or false: “se formó” describes the moment when the night kicks off.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading groups it with phrases that describe a change in energy.", points: 1, skillTag: "vibe" },
      { id: "cuban-b2-music-reading-q3", type: "multiple-choice", prompt: "Why might someone say “vamos afuera un momento”?", options: ["Because the heat, noise, or crowd is too much", "Because they hate all music", "Because they are ordering coffee", "Because they missed the bus"], correctAnswer: "Because the heat, noise, or crowd is too much", explanation: "The reading explains it as a soft way to step outside without ending the plan.", points: 1, skillTag: "context" },
      { id: "cuban-b2-music-reading-q4", type: "multiple-choice", prompt: "Which phrase shows that people are really enjoying themselves?", options: ["Aquí se está gozando", "No cabe un alma", "Ahora volvemos a entrar", "Vamos a movernos para allá"], correctAnswer: "Aquí se está gozando", explanation: "This phrase means people are having a good time here.", points: 1, skillTag: "phrase" },
      { id: "cuban-b2-music-reading-q5", type: "true-false", prompt: "True or false: In the reading, staying longer can show that the night has come alive.", options: ["True", "False"], correctAnswer: "True", explanation: "The final paragraph says staying recognizes that the night grabbed life.", points: 1, skillTag: "inference" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "cuban-b2-music-quiz-1", type: "multiple-choice", prompt: "You want to tell a friend there is live music tonight. What fits?", options: ["Esta noche hay música en vivo", "No cabe un alma", "Ahora volvemos a entrar", "Me quedo un rato más"], correctAnswer: "Esta noche hay música en vivo", explanation: "This announces the live-music plan.", points: 1, skillTag: "invitation" },
  { id: "cuban-b2-music-quiz-2", type: "multiple-choice", prompt: "The venue suddenly gets exciting. What can you say?", options: ["Esto se puso bueno", "Vamos afuera un momento", "No cabe un alma", "Nos quedamos hasta que se acabe"], correctAnswer: "Esto se puso bueno", explanation: "This means things got good.", points: 1, skillTag: "vibe" },
  { id: "cuban-b2-music-quiz-3", type: "fill-blank", prompt: "Complete: ¿Te ____?", nativePrompt: "Are you up for it?", correctAnswer: "embullas", explanation: "¿Te embullas? asks whether someone is enthusiastic about joining.", points: 1, skillTag: "invitation" },
  { id: "cuban-b2-music-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "There isn’t room for another soul.", wordBank: ["No", "cabe", "un", "alma"], correctAnswer: "No cabe un alma", explanation: "This describes a place that is completely packed.", points: 1, skillTag: "crowd" },
  { id: "cuban-b2-music-quiz-5", type: "true-false", prompt: "True or false: “vamos a echar un pie” means “let’s go dance.”", options: ["True", "False"], correctAnswer: "True", explanation: "Echar un pie is a Cuban way to talk about dancing.", points: 1, skillTag: "meaning" },
  { id: "cuban-b2-music-quiz-6", type: "multiple-choice", prompt: "People are fired up and into the music. What fits?", options: ["La gente está encendida", "La gente está vacía", "Ahora volvemos a entrar", "Vamos afuera un momento"], correctAnswer: "La gente está encendida", explanation: "Encendida describes the crowd’s energy.", points: 1, skillTag: "crowd" },
  { id: "cuban-b2-music-quiz-7", type: "fill-blank", prompt: "Complete: Esto está en ____.", nativePrompt: "This is on fire.", correctAnswer: "candela", explanation: "En candela means intense or on fire in this context.", points: 1, skillTag: "intensity" },
  { id: "cuban-b2-music-quiz-8", type: "multiple-choice", prompt: "The place is too crowded and you want a better spot. What do you say?", options: ["Vamos a movernos para allá", "Nos quedamos hasta que se acabe", "Esta noche hay música en vivo", "Todo el mundo quiere bailar"], correctAnswer: "Vamos a movernos para allá", explanation: "This suggests moving to another spot.", points: 1, skillTag: "movement" },
  { id: "cuban-b2-music-quiz-9", type: "true-false", prompt: "True or false: “vamos afuera un momento” can be temporary if you add “ahora volvemos a entrar.”", options: ["True", "False"], correctAnswer: "True", explanation: "The second phrase shows the plan is to return inside.", points: 1, skillTag: "plan" },
  { id: "cuban-b2-music-quiz-10", type: "multiple-choice", prompt: "You want to say the music is really good. What fits?", options: ["La música está buenísima", "Esto se llenó", "No cabe un alma", "Vamos a dar una vuelta"], correctAnswer: "La música está buenísima", explanation: "Buenísima strongly praises the music.", points: 1, skillTag: "opinion" },
  { id: "cuban-b2-music-quiz-11", type: "order-words", prompt: "Order the phrase.", nativePrompt: "People are really having a good time here.", wordBank: ["Aquí", "se", "está", "gozando"], correctAnswer: "Aquí se está gozando", explanation: "This describes collective enjoyment.", points: 1, skillTag: "vibe" },
  { id: "cuban-b2-music-quiz-12", type: "multiple-choice", prompt: "You want to stay until the music ends. What fits?", options: ["Nos quedamos hasta que se acabe", "Vamos afuera un momento", "Esto se llenó", "No cabe un alma"], correctAnswer: "Nos quedamos hasta que se acabe", explanation: "This means we’ll stay until it finishes.", points: 1, skillTag: "duration" },
  { id: "cuban-b2-music-quiz-13", type: "multiple-choice", prompt: "Which phrase means “let’s stay a little longer”?", options: ["Vamos a quedarnos un rato más", "Vamos a dar una vuelta", "Se formó", "Qué clase de ambiente"], correctAnswer: "Vamos a quedarnos un rato más", explanation: "This extends the plan softly.", points: 1, skillTag: "duration" },
  { id: "cuban-b2-music-quiz-14", type: "true-false", prompt: "True or false: “qué clase de ambiente” is a natural reaction to a strong atmosphere.", options: ["True", "False"], correctAnswer: "True", explanation: "It is an expressive Cuban reaction to the vibe.", points: 1, skillTag: "reaction" },
  { id: "cuban-b2-music-quiz-15", type: "multiple-choice", prompt: "You want to take a lap around the place. What fits?", options: ["Vamos a dar una vuelta", "No cabe un alma", "Se formó", "Esta noche hay música en vivo"], correctAnswer: "Vamos a dar una vuelta", explanation: "Dar una vuelta means to take a walk or make a lap.", points: 1, skillTag: "movement" },
];

export const cubanSpanishB2HavanaMusicNightQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Cuban Spanish B2: Havana Music Night Quiz",
  subtitle: "Choose the right Cuban phrase for live music, dancing, crowd energy, moving around, and staying longer.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Cuban Spanish", "B2", "quiz", "music", "nightlife"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Cuban B2 music-night phrases in realistic Havana nightlife contexts.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
