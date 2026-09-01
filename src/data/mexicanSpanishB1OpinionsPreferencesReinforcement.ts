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

const courseId = "mexican-spanish-b1-opinions-preferences";
const skoolSectionName = "Mexican Spanish - B1 Opinions and Preferences";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const opinionsVocab: VocabItem[] = [
  { id: "me-late", term: "me late", meaning: "I’m into it / sounds good to me", matchingMeaning: "sounds good to me", note: "Very common informal Mexican way to say you like an idea.", example: "Sí, me late ese plan.", translation: "Yeah, that plan sounds good to me.", starred: true },
  { id: "no-me-late-tanto", term: "no me late tanto", meaning: "I’m not that into it", matchingMeaning: "I’m not that into it", note: "Soft way to reject an idea without sounding too harsh.", example: "La película no me late tanto.", translation: "I’m not that into the movie.", starred: true },
  { id: "se-me-hace-buena-idea", term: "se me hace buena idea", meaning: "it seems like a good idea to me", matchingMeaning: "it seems like a good idea", note: "Natural Mexican opinion phrase; softer than saying it is definitely good.", example: "Se me hace buena idea salir temprano.", translation: "It seems like a good idea to leave early.", starred: true },
  { id: "yo-digo-que", term: "yo digo que", meaning: "I think / I’d say that", matchingMeaning: "I think", note: "Casual way to introduce your opinion or suggestion.", example: "Yo digo que vayamos por tacos.", translation: "I think we should go get tacos.", starred: true },
  { id: "la-verdad-prefiero", term: "la verdad, prefiero…", meaning: "honestly, I prefer…", matchingMeaning: "honestly, I prefer", note: "Polite, direct way to state a preference.", example: "La verdad, prefiero algo más tranquilo.", translation: "Honestly, I prefer something calmer.", starred: true },
  { id: "se-me-antoja", term: "se me antoja", meaning: "I feel like having it / I’m in the mood for it", matchingMeaning: "I feel like having it", note: "Used especially for food, drinks, or activities you crave.", example: "Se me antoja un café.", translation: "I feel like having a coffee.", starred: true },
  { id: "traigo-antojo-de", term: "traigo antojo de…", meaning: "I’m craving…", matchingMeaning: "I’m craving", note: "Very natural Mexican food-preference phrase.", example: "Traigo antojo de tacos al pastor.", translation: "I’m craving tacos al pastor.", starred: true },
  { id: "mejor-vamos-por", term: "mejor vamos por…", meaning: "we’d better go get… / let’s go for… instead", matchingMeaning: "let’s go for instead", note: "Useful for changing the plan gently.", example: "Mejor vamos por tortas.", translation: "Let’s go for tortas instead.", starred: true },
  { id: "por-mi-esta-bien", term: "por mí está bien", meaning: "that’s fine by me", matchingMeaning: "that’s fine by me", note: "Shows agreement without strong enthusiasm.", example: "Si quieren pizza, por mí está bien.", translation: "If you want pizza, that’s fine by me.", starred: true },
  { id: "a-mi-me-da-igual", term: "a mí me da igual", meaning: "I don’t mind / either is fine with me", matchingMeaning: "I don’t mind", note: "Neutral preference phrase; can sound indifferent depending on tone.", example: "A mí me da igual, ustedes escojan.", translation: "I don’t mind, you all choose.", starred: true },
  { id: "depende-de", term: "depende de…", meaning: "it depends on…", matchingMeaning: "it depends on", note: "Helps give a conditional opinion.", example: "Depende de cuánto cueste.", translation: "It depends on how much it costs.", starred: true },
  { id: "no-soy-muy-fan-de", term: "no soy muy fan de…", meaning: "I’m not a big fan of…", matchingMeaning: "I’m not a big fan of", note: "Soft negative opinion, useful for tastes.", example: "No soy muy fan de ese lugar.", translation: "I’m not a big fan of that place.", starred: true },
  { id: "me-convence-mas", term: "me convence más", meaning: "I prefer it / it convinces me more", matchingMeaning: "I prefer it", note: "Useful when comparing two options.", example: "Me convence más el lugar del centro.", translation: "I prefer the place downtown.", starred: true },
  { id: "no-me-convence-del-todo", term: "no me convence del todo", meaning: "I’m not completely convinced", matchingMeaning: "I’m not completely convinced", note: "B1-friendly phrase for hesitation.", example: "La idea no me convence del todo.", translation: "I’m not completely convinced by the idea.", starred: true },
  { id: "si-me-gusta-pero", term: "sí me gusta, pero…", meaning: "I do like it, but…", matchingMeaning: "I do like it, but", note: "Lets you agree partly before giving a concern.", example: "Sí me gusta, pero está lejos.", translation: "I do like it, but it’s far.", starred: true },
  { id: "puede-ser", term: "puede ser", meaning: "maybe / that could work", matchingMeaning: "that could work", note: "Flexible phrase for weak agreement.", example: "Puede ser, si no está lleno.", translation: "That could work, if it isn’t full.", starred: true },
  { id: "no-esta-mal", term: "no está mal", meaning: "it’s not bad", matchingMeaning: "it’s not bad", note: "Mild positive opinion; not very enthusiastic.", example: "La opción no está mal.", translation: "The option isn’t bad.", starred: true },
  { id: "yo-me-quedo-con", term: "yo me quedo con…", meaning: "I’ll go with… / I choose…", matchingMeaning: "I’ll go with", note: "Useful for making a final choice.", example: "Yo me quedo con los tacos.", translation: "I’ll go with the tacos.", starred: true },
  { id: "se-me-hace-mejor", term: "se me hace mejor", meaning: "it seems better to me", matchingMeaning: "it seems better to me", note: "Natural way to compare options.", example: "Se me hace mejor salir a las siete.", translation: "It seems better to me to leave at seven.", starred: true },
  { id: "que-tal-si", term: "¿qué tal si…?", meaning: "how about if we…?", matchingMeaning: "how about if we", note: "Friendly way to suggest an alternative.", example: "¿Qué tal si pedimos algo cerca?", translation: "How about if we order something nearby?", starred: true },
  { id: "yo-no-lo-veo-asi", term: "yo no lo veo así", meaning: "I don’t see it that way", matchingMeaning: "I don’t see it that way", note: "Polite disagreement phrase.", example: "Yo no lo veo así; creo que está bien.", translation: "I don’t see it that way; I think it’s fine.", starred: true },
  { id: "en-eso-si-estamos-de-acuerdo", term: "en eso sí estamos de acuerdo", meaning: "on that, we do agree", matchingMeaning: "on that, we agree", note: "Useful for finding common ground.", example: "En eso sí estamos de acuerdo: no debe estar lejos.", translation: "On that, we do agree: it shouldn’t be far.", starred: true },
  { id: "traemos-prisa", term: "traemos prisa", meaning: "we’re in a hurry", matchingMeaning: "we’re in a hurry", note: "Mexican casual way to explain why a fast option matters.", example: "Traemos prisa, mejor algo rápido.", translation: "We’re in a hurry, better something quick.", starred: true },
  { id: "preferiria-algo-mas-cerca", term: "preferiría algo más cerca", meaning: "I’d prefer something closer", matchingMeaning: "I’d prefer something closer", note: "Polite preference, useful for plans.", example: "Preferiría algo más cerca de aquí.", translation: "I’d prefer something closer to here.", starred: true },
  { id: "algo-que-nos-funcione", term: "algo que nos funcione a todos", meaning: "something that works for everyone", matchingMeaning: "something that works for everyone", note: "Collaborative phrase for group decisions.", example: "Busquemos algo que nos funcione a todos.", translation: "Let’s look for something that works for everyone.", starred: true },
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

const sentenceVocab = opinionsVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB1OpinionsPreferencesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B1: Opinions and Preferences Flashcards",
  subtitle: "Everyday Mexican phrases for saying what you like, prefer, hesitate about, or agree on with friends.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "flashcards", "opinions", "preferences"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: opinionsVocab.map(cardFromVocab) },
};

export const mexicanSpanishB1OpinionsPreferencesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Mexican Opinions and Preferences",
  subtitle: "Build simple Mexican Spanish phrases for choosing plans, food, places, and shared options.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "sentence-builder", "opinions", "preferences"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note choosing where to eat with friends. Give your opinion, compare two options, and suggest something that works for everyone.",
    stages: [
      stage("stage-1", "Say what sounds good", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "I think it seems like a good idea. I’m into it.", "Yo digo que se me hace buena idea. Me late.", "This starts with a clear but casual opinion.", breakdown([["I think", "yo digo que"], ["it seems like a good idea", "se me hace buena idea"], ["I’m into it", "me late"]])),
      stage("stage-2", "Softly reject", sentenceVocab.slice(1, 5), sentenceVocab.slice(0, 5), "Honestly, I prefer something else. I’m not that into it.", "La verdad, prefiero otra cosa. No me late tanto.", "This rejects an idea without sounding too direct.", breakdown([["honestly, I prefer", "la verdad, prefiero"], ["something else", "otra cosa"], ["I’m not that into it", "no me late tanto"]])),
      stage("stage-3", "Talk cravings", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "I’m craving tacos. Let’s go for that instead.", "Traigo antojo de tacos. Mejor vamos por eso.", "Mexican Spanish often uses antojo for food cravings.", breakdown([["I’m craving", "traigo antojo de"], ["tacos", "tacos"], ["let’s go for that instead", "mejor vamos por eso"]])),
      stage("stage-4", "Neutral agreement", sentenceVocab.slice(8, 11), sentenceVocab.slice(0, 11), "That’s fine by me. I don’t mind; it depends on the price.", "Por mí está bien. A mí me da igual; depende del precio.", "This combines neutral agreement with a condition.", breakdown([["that’s fine by me", "por mí está bien"], ["I don’t mind", "a mí me da igual"], ["it depends on the price", "depende del precio"]])),
      stage("stage-5", "Compare options", sentenceVocab.slice(11, 15), sentenceVocab.slice(0, 15), "I’m not a big fan of that place. This one convinces me more.", "No soy muy fan de ese lugar. Este me convence más.", "This compares two options naturally.", breakdown([["I’m not a big fan of", "no soy muy fan de"], ["that place", "ese lugar"], ["this one convinces me more", "este me convence más"]])),
      stage("stage-6", "Hesitate politely", sentenceVocab.slice(13, 18), sentenceVocab.slice(0, 18), "I do like it, but I’m not completely convinced. It’s not bad.", "Sí me gusta, pero no me convence del todo. No está mal.", "This gives a balanced opinion, not a hard no.", breakdown([["I do like it, but", "sí me gusta, pero"], ["I’m not completely convinced", "no me convence del todo"], ["it’s not bad", "no está mal"]])),
      stage("stage-7", "Make a final choice", sentenceVocab.slice(16, 21), sentenceVocab.slice(0, 21), "How about if we choose the closer place? It seems better to me.", "¿Qué tal si nos quedamos con el lugar más cerca? Se me hace mejor.", "This suggests a practical final choice.", breakdown([["how about if", "qué tal si"], ["we choose", "nos quedamos con"], ["the closer place", "el lugar más cerca"], ["it seems better to me", "se me hace mejor"]])),
      stage("stage-8", "Find common ground", sentenceVocab.slice(21), sentenceVocab, "On that, we agree: we’re in a hurry and we need something that works for everyone.", "En eso sí estamos de acuerdo: traemos prisa y necesitamos algo que nos funcione a todos.", "This closes the decision with shared agreement.", breakdown([["on that, we agree", "en eso sí estamos de acuerdo"], ["we’re in a hurry", "traemos prisa"], ["something that works for everyone", "algo que nos funcione a todos"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-opinions-story-q1", type: "multiple-choice", prompt: "After message 3, what are Ana and Luis trying to choose?", options: ["Where to eat", "Which bus to take", "A movie time", "A new apartment"], correctAnswer: "Where to eat", explanation: "Ana says they need to decide where to eat.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-opinions-story-q2", type: "multiple-choice", prompt: "After message 6, what does Ana want?", options: ["Tacos", "Coffee only", "A formal meeting", "Nothing"], correctAnswer: "Tacos", explanation: "Ana says se me antojan tacos and traigo antojo de tacos.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-opinions-story-q3", type: "true-false", prompt: "After message 9, true or false: Luis is completely against tacos.", options: ["True", "False"], correctAnswer: "False", explanation: "Luis says puede ser and no está mal, so he is not completely against it.", points: 1, skillTag: "inference" },
  { id: "mexican-b1-opinions-story-q4", type: "multiple-choice", prompt: "After message 12, why does Ana prefer another place?", options: ["The first place is far and they are in a hurry", "She hates Luis", "The restaurant is closed forever", "She forgot her phone"], correctAnswer: "The first place is far and they are in a hurry", explanation: "Ana says it is far and they traen prisa.", points: 1, skillTag: "reason" },
  { id: "mexican-b1-opinions-story-q5", type: "multiple-choice", prompt: "After message 15, what does Luis say about the burger place?", options: ["He is not a big fan of it", "It is his favorite place", "It is free today", "It is too close"], correctAnswer: "He is not a big fan of it", explanation: "Luis says no soy muy fan de ese lugar.", points: 1, skillTag: "preference" },
  { id: "mexican-b1-opinions-story-q6", type: "multiple-choice", prompt: "After message 18, which option convinces Ana more?", options: ["The taco place near the office", "The far restaurant", "Cooking at home", "Skipping lunch"], correctAnswer: "The taco place near the office", explanation: "Ana says the taco place near the office me convence más.", points: 1, skillTag: "choice" },
  { id: "mexican-b1-opinions-story-q7", type: "true-false", prompt: "After message 21, true or false: Luis agrees that they need something quick.", options: ["True", "False"], correctAnswer: "True", explanation: "He says en eso sí estamos de acuerdo and mentions they need something quick.", points: 1, skillTag: "agreement" },
  { id: "mexican-b1-opinions-story-q8", type: "multiple-choice", prompt: "After message 24, what solution do they choose?", options: ["Something close that works for everyone", "A long trip across town", "No lunch", "A surprise party"], correctAnswer: "Something close that works for everyone", explanation: "They use preferiría algo más cerca and algo que nos funcione a todos.", points: 1, skillTag: "solution" },
  { id: "mexican-b1-opinions-story-q9", type: "multiple-choice", prompt: "After message 27, what is Ana’s final choice?", options: ["Tacos", "Burgers", "Pizza", "Coffee"], correctAnswer: "Tacos", explanation: "Ana says yo me quedo con tacos.", points: 1, skillTag: "final-choice" },
  { id: "mexican-b1-opinions-story-q10", type: "multiple-choice", prompt: "After message 30, what is their final plan?", options: ["Go for tacos close by", "Cancel the plan", "Wait two hours", "Ask another group"], correctAnswer: "Go for tacos close by", explanation: "Luis closes with tacos cerca and a plan that works for everyone.", points: 1, skillTag: "resolution" },
];

export const mexicanSpanishB1OpinionsPreferencesWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B1 Story: The Lunch Debate",
  subtitle: "Ana and Luis choose where to eat by sharing opinions, cravings, preferences, and common ground.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "story", "opinions", "preferences"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "luis", name: "Luis", initials: "L", side: "left", color: "blue" },
      { id: "ana", name: "Ana", initials: "A", side: "right", color: "violet" },
    ],
    messages: [
      message("m1", "luis", "Ana, ¿qué comemos saliendo?", "Ana, what are we eating when we leave?", []),
      message("m2", "ana", "No sé, pero hay que decidir rápido.", "I don’t know, but we need to decide quickly.", []),
      message("m3", "ana", "Yo digo que elijamos algo cerca para comer.", "I think we should choose somewhere close to eat.", ["yo digo que"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "luis", "Se me hace buena idea. ¿Te late la fonda?", "That seems like a good idea to me. Are you into the small restaurant?", ["se me hace buena idea", "me late"]),
      message("m5", "ana", "No me late tanto hoy.", "I’m not that into it today.", ["no me late tanto"]),
      message("m6", "ana", "La verdad, prefiero tacos. Se me antojan mucho.", "Honestly, I prefer tacos. I’m really in the mood for them.", ["la verdad, prefiero…", "se me antoja"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "luis", "¿Otra vez tacos?", "Tacos again?", []),
      message("m8", "ana", "Sí, traigo antojo de tacos al pastor.", "Yes, I’m craving tacos al pastor.", ["traigo antojo de…"]),
      message("m9", "luis", "Puede ser. No está mal, pero también hay hamburguesas.", "That could work. It’s not bad, but there are also burgers.", ["puede ser", "no está mal"]),
      message("m10", "ana", "Las hamburguesas están lejos.", "The burgers are far.", []),
      message("m11", "luis", "Depende de cuánto tiempo tengamos.", "It depends on how much time we have.", ["depende de…"]),
      message("m12", "ana", "Traemos prisa, entonces preferiría algo más cerca.", "We’re in a hurry, so I’d prefer something closer.", ["traemos prisa", "preferiría algo más cerca"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "luis", "Por mí está bien si es rápido.", "That’s fine by me if it’s quick.", ["por mí está bien"]),
      message("m14", "ana", "A mí me da igual cuál puesto, mientras esté bueno.", "I don’t mind which stand, as long as it’s good.", ["a mí me da igual"]),
      message("m15", "luis", "No soy muy fan del puesto de la esquina.", "I’m not a big fan of the stand on the corner.", ["no soy muy fan de…"]),
      message("m16", "ana", "Sí me gusta, pero a veces tarda mucho.", "I do like it, but sometimes it takes too long.", ["sí me gusta, pero…"]),
      message("m17", "luis", "Entonces ese no nos conviene.", "Then that one isn’t good for us.", []),
      message("m18", "ana", "El de enfrente de la oficina me convence más.", "The one across from the office convinces me more.", ["me convence más"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "luis", "No me convence del todo porque siempre hay fila.", "I’m not completely convinced because there’s always a line.", ["no me convence del todo"]),
      message("m20", "ana", "¿Qué tal si pedimos para llevar?", "How about if we order to go?", ["¿qué tal si…?"]),
      message("m21", "luis", "En eso sí estamos de acuerdo: necesitamos algo rápido.", "On that, we do agree: we need something quick.", ["en eso sí estamos de acuerdo"]),
      message("m22", "ana", "Yo no lo veo tan complicado.", "I don’t see it as that complicated.", ["yo no lo veo así"]),
      message("m23", "luis", "Yo tampoco, pero busquemos algo que nos funcione a todos.", "Me neither, but let’s look for something that works for everyone.", ["algo que nos funcione a todos"]),
      message("m24", "ana", "Sí, algo cerca, rápido y que no salga carísimo.", "Yes, something close, quick, and not super expensive.", [], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "luis", "Entonces tenemos dos opciones: tacos o tortas.", "So we have two options: tacos or tortas.", []),
      message("m26", "ana", "Mejor vamos por tacos.", "Let’s go for tacos instead.", ["mejor vamos por…"]),
      message("m27", "ana", "Yo me quedo con tacos, la verdad.", "I’ll go with tacos, honestly.", ["yo me quedo con…"]),
      message("m28", "luis", "Va, se me hace mejor que ir lejos.", "Okay, that seems better to me than going far.", ["se me hace mejor"]),
      message("m29", "ana", "Perfecto, entonces quedamos en eso.", "Perfect, then that’s what we agreed.", []),
      message("m30", "luis", "Tacos cerca, rápido y para todos. Me late.", "Tacos nearby, quick, and for everyone. Sounds good to me.", ["me late"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-b1-opinions-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: opinionsVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: opinionsVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft opinions: se me hace buena idea, yo digo que, puede ser.",
        "Preferences: la verdad, prefiero, se me antoja, yo me quedo con.",
        "Group agreement: por mí está bien, en eso sí estamos de acuerdo, algo que nos funcione a todos.",
      ],
      speakingPrompts: [
        "Say which food option you prefer and why.",
        "Disagree politely with a friend’s suggestion.",
        "Choose a plan that works for everyone.",
      ],
    },
    completionTask: {
      title: "Your Mexican B1 preference voice note",
      instructions: "Record a 45-second Mexican Spanish voice note choosing between two food plans. Say what you like, what you prefer, and what works for the group.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Para dar opiniones en español mexicano, «me late» es una frase muy útil. Significa que algo te gusta o te suena bien. Si no quieres rechazar una idea de forma fuerte, puedes decir «no me late tanto». Así das tu opinión sin sonar pesado.", translation: "To give opinions in Mexican Spanish, me late is very useful. It means that you like something or it sounds good to you. If you do not want to reject an idea strongly, you can say no me late tanto. That way, you give your opinion without sounding harsh.", highlights: highlights(["me late", "no me late tanto"]), shadowLine: "Me late, pero no me late tanto hoy." },
  { id: "p2", text: "También puedes empezar con «se me hace buena idea» o «yo digo que». Estas frases son buenas para sugerir un plan. No suenan demasiado formales y ayudan a abrir una conversación con amigos, compañeros o gente de confianza.", translation: "You can also start with se me hace buena idea or yo digo que. These phrases are good for suggesting a plan. They do not sound too formal and help open a conversation with friends, classmates, coworkers, or trusted people.", highlights: highlights(["se me hace buena idea", "yo digo que"]), shadowLine: "Yo digo que se me hace buena idea." },
  { id: "p3", text: "Cuando hablas de comida, «se me antoja» y «traigo antojo de…» suenan muy naturales en México. Puedes decir «se me antoja un café» o «traigo antojo de tacos». Si quieres cambiar el plan, «mejor vamos por…» te ayuda a proponer otra opción.", translation: "When you talk about food, se me antoja and traigo antojo de sound very natural in Mexico. You can say se me antoja un café or traigo antojo de tacos. If you want to change the plan, mejor vamos por helps you suggest another option.", highlights: highlights(["se me antoja", "traigo antojo de…", "mejor vamos por…"]), shadowLine: "Traigo antojo de tacos; mejor vamos por eso." },
  { id: "p4", text: "Para aceptar sin mucha emoción, usa «por mí está bien». Si de verdad no tienes una preferencia fuerte, «a mí me da igual» funciona bien. Y si necesitas más información antes de decidir, puedes decir «depende de…», por ejemplo: depende del precio o depende del tiempo.", translation: "To accept without much excitement, use por mí está bien. If you truly do not have a strong preference, a mí me da igual works well. And if you need more information before deciding, you can say depende de, for example: it depends on the price or it depends on the time.", highlights: highlights(["por mí está bien", "a mí me da igual", "depende de…"]), shadowLine: "Por mí está bien; depende del precio." },
  { id: "p5", text: "No siempre tienes que decir no de forma directa. «No soy muy fan de…» suaviza una opinión negativa. «No me convence del todo» muestra duda. Y «sí me gusta, pero…» te permite reconocer algo positivo antes de explicar el problema.", translation: "You do not always need to say no directly. No soy muy fan de softens a negative opinion. No me convence del todo shows doubt. And sí me gusta, pero lets you recognize something positive before explaining the problem.", highlights: highlights(["no soy muy fan de…", "no me convence del todo", "sí me gusta, pero…"]), shadowLine: "Sí me gusta, pero no me convence del todo." },
  { id: "p6", text: "Cuando comparas opciones, «me convence más» y «se me hace mejor» son muy útiles. No dicen que la otra opción sea mala; solo muestran cuál prefieres. Para elegir, puedes decir «yo me quedo con…»: yo me quedo con tacos, yo me quedo con esta opción.", translation: "When you compare options, me convence más and se me hace mejor are very useful. They do not say the other option is bad; they only show which one you prefer. To choose, you can say yo me quedo con: I’ll go with tacos, I’ll go with this option.", highlights: highlights(["me convence más", "se me hace mejor", "yo me quedo con…"]), shadowLine: "Me convence más; yo me quedo con esta opción." },
  { id: "p7", text: "Para sugerir sin mandar, «¿qué tal si…?» es una frase excelente. Puedes decir «¿qué tal si vamos más cerca?» Si otra persona no está de acuerdo contigo, «yo no lo veo así» expresa desacuerdo de manera clara. Después, «en eso sí estamos de acuerdo» ayuda a encontrar un punto común.", translation: "To suggest without ordering, qué tal si is an excellent phrase. You can say how about if we go somewhere closer? If another person disagrees with you, yo no lo veo así expresses disagreement clearly. Then en eso sí estamos de acuerdo helps find common ground.", highlights: highlights(["¿qué tal si…?", "yo no lo veo así", "en eso sí estamos de acuerdo"]), shadowLine: "¿Qué tal si buscamos algo cerca? En eso estamos de acuerdo." },
  { id: "p8", text: "En planes reales, el contexto importa. Si «traemos prisa», tal vez necesitas decir «preferiría algo más cerca». Y cuando hay varias personas, la mejor frase puede ser «algo que nos funcione a todos». Así no solo das tu opinión; también cuidas el plan del grupo.", translation: "In real plans, context matters. If traemos prisa, maybe you need to say preferiría algo más cerca. And when there are several people, the best phrase might be algo que nos funcione a todos. That way, you do not only give your opinion; you also take care of the group plan.", highlights: highlights(["traemos prisa", "preferiría algo más cerca", "algo que nos funcione a todos"]), shadowLine: "Traemos prisa; preferiría algo que nos funcione a todos." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-opinions-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Giving opinions and preferences in Mexican Spanish", "Arguing with a friend group", "Complaining about delivery service", "Talking about jealousy"], correctAnswer: "Giving opinions and preferences in Mexican Spanish", explanation: "The reading explains phrases for opinions, preferences, disagreement, and group decisions.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-opinions-reading-q2", type: "multiple-choice", prompt: "Which phrase means “I’m not that into it”?", options: ["No me late tanto", "Me convence más", "Por mí está bien", "Traemos prisa"], correctAnswer: "No me late tanto", explanation: "No me late tanto softly rejects an idea.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-opinions-reading-q3", type: "true-false", prompt: "True or false: “se me antoja” is useful for food cravings.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explains that se me antoja and traigo antojo de are natural for food.", points: 1, skillTag: "food" },
  { id: "mexican-b1-opinions-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "That’s fine by me.", wordBank: ["Por", "mí", "está", "bien."], correctAnswer: "Por mí está bien.", explanation: "This phrase accepts a suggestion neutrally.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-b1-opinions-reading-q5", type: "multiple-choice", prompt: "Which phrase means “something that works for everyone”?", options: ["Algo que nos funcione a todos", "No soy muy fan de", "Yo no lo veo así", "No está mal"], correctAnswer: "Algo que nos funcione a todos", explanation: "This phrase is useful for group decisions.", points: 1, skillTag: "group" },
];

export const mexicanSpanishB1OpinionsPreferencesReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B1 Reading: Opiniones y Preferencias sin Sonar Pesado",
  subtitle: "A synced Mexican Spanish reading about likes, preferences, disagreement, food cravings, and choosing plans with friends.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "reading", "opinions", "preferences"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: opinionsVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican B1 opinions and preferences vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishB1OpinionsPreferencesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish B1: Opinions and Preferences Quiz",
  subtitle: "Choose the right Mexican phrase for likes, preferences, hesitation, disagreement, and group decisions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "quiz", "opinions", "preferences"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B1 phrases for giving opinions and choosing plans naturally with friends.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-b1-opinions-quiz-1", type: "multiple-choice", prompt: "A plan sounds good to you. What can you say?", options: ["Me late", "No soy muy fan de", "Depende de", "Yo no lo veo así"], correctAnswer: "Me late", explanation: "Me late means sounds good to me or I’m into it.", points: 1, skillTag: "agreement" },
      { id: "mexican-b1-opinions-quiz-2", type: "fill-blank", prompt: "Complete: No me late ____.", nativePrompt: "I’m not that into it.", correctAnswer: "tanto", explanation: "No me late tanto is a soft negative opinion.", points: 1, skillTag: "soft-no" },
      { id: "mexican-b1-opinions-quiz-3", type: "multiple-choice", prompt: "You are craving tacos. What fits?", options: ["Traigo antojo de tacos", "A mí me da igual", "No está mal", "En eso sí estamos de acuerdo"], correctAnswer: "Traigo antojo de tacos", explanation: "Traigo antojo de means I’m craving.", points: 1, skillTag: "food" },
      { id: "mexican-b1-opinions-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Honestly, I prefer tacos.", wordBank: ["La", "verdad,", "prefiero", "tacos."], correctAnswer: "La verdad, prefiero tacos.", explanation: "La verdad, prefiero introduces a clear preference.", points: 1, skillTag: "preference" },
      { id: "mexican-b1-opinions-quiz-5", type: "true-false", prompt: "True or false: “por mí está bien” means that’s fine by me.", options: ["True", "False"], correctAnswer: "True", explanation: "Por mí está bien is neutral agreement.", points: 1, skillTag: "meaning" },
      { id: "mexican-b1-opinions-quiz-6", type: "multiple-choice", prompt: "You are not sure because the price matters. What can you say?", options: ["Depende del precio", "Me late", "Yo me quedo con", "No fue para tanto"], correctAnswer: "Depende del precio", explanation: "Depende de lets you explain a condition.", points: 1, skillTag: "condition" },
      { id: "mexican-b1-opinions-quiz-7", type: "fill-blank", prompt: "Complete: No soy muy fan ____ ese lugar.", nativePrompt: "I’m not a big fan of that place.", correctAnswer: "de", explanation: "No soy muy fan de is the full phrase.", points: 1, skillTag: "taste" },
      { id: "mexican-b1-opinions-quiz-8", type: "multiple-choice", prompt: "You want to suggest another plan politely. What fits?", options: ["¿Qué tal si vamos por tacos?", "A mí me da igual", "No soy muy fan", "Traemos prisa"], correctAnswer: "¿Qué tal si vamos por tacos?", explanation: "¿Qué tal si...? is a friendly suggestion.", points: 1, skillTag: "suggestion" },
      { id: "mexican-b1-opinions-quiz-9", type: "true-false", prompt: "True or false: “yo no lo veo así” is a way to disagree.", options: ["True", "False"], correctAnswer: "True", explanation: "It means I don’t see it that way.", points: 1, skillTag: "disagreement" },
      { id: "mexican-b1-opinions-quiz-10", type: "multiple-choice", prompt: "The group needs a plan everyone can accept. What phrase fits?", options: ["Algo que nos funcione a todos", "No me convence del todo", "Se me antoja", "No me late tanto"], correctAnswer: "Algo que nos funcione a todos", explanation: "This phrase focuses on a shared option.", points: 1, skillTag: "group-decision" },
      pairQuestion("mexican-b1-opinions-pairs-1", "Match basic opinion phrases.", opinionsVocab.slice(0, 8)),
      pairQuestion("mexican-b1-opinions-pairs-2", "Match neutral and hesitant phrases.", opinionsVocab.slice(8, 17)),
      pairQuestion("mexican-b1-opinions-pairs-3", "Match choice and group-decision phrases.", opinionsVocab.slice(17)),
    ],
  },
};
