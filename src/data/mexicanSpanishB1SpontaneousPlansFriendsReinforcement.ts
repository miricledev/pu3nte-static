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

const courseId = "mexican-spanish-b1-spontaneous-plans-with-friends";
const skoolSectionName = "Mexican Spanish - B1 Spontaneous Plans with Friends";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const plansVocab: VocabItem[] = [
  { id: "que-onda", term: "¿qué onda?", meaning: "what’s up? / what’s going on?", matchingMeaning: "what’s up?", note: "Very common casual Mexican greeting.", example: "¿Qué onda? ¿Sí vas a salir?", translation: "What’s up? Are you going out?", starred: true },
  { id: "que-haces-al-rato", term: "¿qué haces al rato?", meaning: "what are you doing later?", matchingMeaning: "what are you doing later?", note: "Natural way to open a spontaneous plan.", example: "¿Qué haces al rato? Vamos por algo.", translation: "What are you doing later? Let’s go get something.", starred: true },
  { id: "jalas", term: "¿jalas?", meaning: "are you in? / wanna come?", matchingMeaning: "are you in?", note: "Mexican informal invite; short and friendly.", example: "Vamos por tacos, ¿jalas?", translation: "Let’s go get tacos, are you in?", starred: true },
  { id: "jalar", term: "jalar", meaning: "to be up for something / join in", matchingMeaning: "be up for something", note: "Used casually for agreeing to join a plan.", example: "Yo sí jalo si es cerca.", translation: "I’m up for it if it’s nearby.", starred: true },
  { id: "vamos-por-unos-tacos", term: "vamos por unos tacos", meaning: "let’s go get some tacos", matchingMeaning: "let’s go get some tacos", note: "Classic casual Mexican plan phrase.", example: "Al rato vamos por unos tacos.", translation: "Later let’s go get some tacos.", starred: true },
  { id: "te-late", term: "¿te late?", meaning: "does that sound good to you? / are you into it?", matchingMeaning: "does that sound good?", note: "Friendly way to check interest.", example: "Hay un lugar nuevo, ¿te late?", translation: "There’s a new place, does that sound good?", starred: true },
  { id: "como-a-las-seis", term: "como a las seis", meaning: "around six", matchingMeaning: "around six", note: "Approximate time phrase for casual plans.", example: "Nos vemos como a las seis.", translation: "Let’s meet around six.", starred: true },
  { id: "nos-vemos-por-el-centro", term: "nos vemos por el centro", meaning: "let’s meet around downtown", matchingMeaning: "let’s meet downtown", note: "Por el centro sounds approximate and relaxed.", example: "Nos vemos por el centro y de ahí decidimos.", translation: "Let’s meet around downtown and decide from there.", starred: true },
  { id: "ahi-te-caigo", term: "ahí te caigo", meaning: "I’ll meet you there / I’ll show up there", matchingMeaning: "I’ll show up there", note: "Casual Mexican way to say you’ll go to that place.", example: "Mándame la ubicación y ahí te caigo.", translation: "Send me the location and I’ll show up there.", starred: true },
  { id: "caerle-a-un-lugar", term: "caerle a un lugar", meaning: "to show up / come by", matchingMeaning: "show up somewhere", note: "Informal but common for social arrivals.", example: "Vamos a caerle al centro.", translation: "We’re going to show up downtown.", starred: true },
  { id: "te-mando-la-ubicacion", term: "te mando la ubicación", meaning: "I’ll send you the location", matchingMeaning: "I’ll send the location", note: "Practical planning phrase.", example: "Te mando la ubicación en WhatsApp.", translation: "I’ll send you the location on WhatsApp.", starred: true },
  { id: "paso-por-ti", term: "paso por ti", meaning: "I’ll come pick you up", matchingMeaning: "I’ll pick you up", note: "Used when offering to collect a friend.", example: "Si quieres, paso por ti.", translation: "If you want, I’ll come pick you up.", starred: true },
  { id: "voy-saliendo", term: "voy saliendo", meaning: "I’m heading out now", matchingMeaning: "I’m heading out", note: "Present-progressive style update for leaving now.", example: "Voy saliendo de mi casa.", translation: "I’m heading out from my house.", starred: true },
  { id: "se-me-hizo-tarde", term: "se me hizo tarde", meaning: "I ended up running late", matchingMeaning: "I ended up running late", note: "Natural excuse when time got away from you.", example: "Perdón, se me hizo tarde.", translation: "Sorry, I ended up running late.", starred: true },
  { id: "llego-en-veinte", term: "llego en veinte", meaning: "I’ll be there in twenty minutes", matchingMeaning: "I’ll be there in twenty", note: "Short casual arrival update.", example: "Ya voy en camino, llego en veinte.", translation: "I’m on my way, I’ll be there in twenty.", starred: true },
  { id: "esperame-tantito", term: "espérame tantito", meaning: "wait for me a little bit", matchingMeaning: "wait for me a little bit", note: "Tantito softens the request.", example: "Espérame tantito, ya casi llego.", translation: "Wait for me a little bit, I’m almost there.", starred: true },
  { id: "tantito", term: "tantito", meaning: "a little bit / a moment", matchingMeaning: "a little bit", note: "Mexican diminutive that sounds soft and friendly.", example: "Dame tantito tiempo.", translation: "Give me a little bit of time.", starred: true },
  { id: "ando-por-la-zona", term: "ando por la zona", meaning: "I’m around the area", matchingMeaning: "I’m around the area", note: "Andar is very natural for location/movement updates.", example: "Ando por la zona, ¿dónde estás?", translation: "I’m around the area, where are you?", starred: true },
  { id: "me-queda-cerca", term: "me queda cerca", meaning: "it’s close/convenient for me", matchingMeaning: "it’s close for me", note: "Useful when choosing a meeting point.", example: "Ese lugar me queda cerca.", translation: "That place is close for me.", starred: true },
  { id: "si-quieres-nos-vemos-ahi", term: "si quieres, nos vemos ahí", meaning: "if you want, we can meet there", matchingMeaning: "if you want, we can meet there", note: "Low-pressure suggestion.", example: "Si quieres, nos vemos ahí mejor.", translation: "If you want, we can meet there instead.", starred: true },
  { id: "a-eso-de-las-siete", term: "a eso de las siete", meaning: "around seven or so", matchingMeaning: "around seven", note: "Casual approximate time phrase.", example: "Llego a eso de las siete.", translation: "I’ll arrive around seven or so.", starred: true },
  { id: "sale", term: "sale", meaning: "okay / deal / sounds good", matchingMeaning: "okay / deal", note: "Very common Mexican agreement marker.", example: "Sale, nos vemos allá.", translation: "Okay, see you there.", starred: true },
  { id: "sale-entonces-quedamos-asi", term: "sale, entonces quedamos así", meaning: "alright, then that’s the plan", matchingMeaning: "alright, that’s the plan", note: "Confirms the plan clearly.", example: "Sale, entonces quedamos así.", translation: "Alright, then that’s the plan.", starred: true },
  { id: "quedamos-asi", term: "quedamos así", meaning: "that’s what we agreed / that’s the plan", matchingMeaning: "that’s the plan", note: "Plan confirmation phrase.", example: "Quedamos así: tacos a las siete.", translation: "That’s the plan: tacos at seven.", starred: true },
  { id: "te-aviso-cuando-llegue", term: "te aviso cuando llegue", meaning: "I’ll let you know when I get there", matchingMeaning: "I’ll let you know when I arrive", note: "Common arrival update.", example: "Te aviso cuando llegue al centro.", translation: "I’ll let you know when I get downtown.", starred: true },
  { id: "al-rato-nos-vemos", term: "al rato nos vemos", meaning: "see you later", matchingMeaning: "see you later", note: "Friendly casual goodbye before meeting.", example: "Sale, al rato nos vemos.", translation: "Okay, see you later.", starred: true },
  { id: "al-rato", term: "al rato", meaning: "later / later on", matchingMeaning: "later", note: "Can mean later today, depending on context.", example: "Te marco al rato.", translation: "I’ll call you later.", starred: true },
  { id: "si-cambia-algo-me-dices", term: "si cambia algo, me dices", meaning: "if anything changes, let me know", matchingMeaning: "if anything changes, let me know", note: "Keeps a casual plan flexible.", example: "Si cambia algo, me dices.", translation: "If anything changes, let me know.", starred: true },
];

const highlightMap = Object.fromEntries(plansVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = plansVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB1SpontaneousPlansFriendsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B1: Spontaneous Plans with Friends Flashcards",
  subtitle: "Casual Mexican phrases for inviting friends, setting times, sharing locations, running late, and confirming plans.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "flashcards", "plans", "friends"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: plansVocab.map(cardFromVocab) },
};

export const mexicanSpanishB1SpontaneousPlansFriendsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Mexican Spontaneous Plans",
  subtitle: "Build casual Mexican Spanish for making plans, changing meeting points, running late, and confirming details.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "sentence-builder", "plans", "friends"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note inviting a friend out, confirming the place, and giving a late arrival update.",
    stages: [
      stage("stage-1", "Open the plan", sentenceVocab.slice(0, 6), sentenceVocab.slice(0, 6), "What’s up? What are you doing later? Let’s go get some tacos. Are you in?", "¿Qué onda? ¿Qué haces al rato? Vamos por unos tacos. ¿Jalas?", "This is a natural casual opening between friends.", breakdown([["what’s up?", "¿qué onda?"], ["what are you doing later?", "¿qué haces al rato?"], ["are you in?", "¿jalas?"]])),
      stage("stage-2", "Check interest", sentenceVocab.slice(3, 7), sentenceVocab.slice(0, 7), "I’m up for it if it sounds good to you around six.", "Yo sí jalo si te late como a las seis.", "Jalar means being up for the plan; te late checks if it sounds good.", breakdown([["I’m up for it", "yo sí jalo"], ["if it sounds good to you", "si te late"], ["around six", "como a las seis"]])),
      stage("stage-3", "Choose the place", sentenceVocab.slice(7, 12), sentenceVocab.slice(0, 12), "Let’s meet downtown. I’ll send you the location, and I’ll meet you there.", "Nos vemos por el centro. Te mando la ubicación y ahí te caigo.", "This confirms a loose meeting point and a location message.", breakdown([["let’s meet downtown", "nos vemos por el centro"], ["I’ll send you the location", "te mando la ubicación"], ["I’ll meet you there", "ahí te caigo"]])),
      stage("stage-4", "Offer a pickup", sentenceVocab.slice(9, 13), sentenceVocab.slice(0, 13), "If you want, I’ll come pick you up, and then we’ll show up there.", "Si quieres, paso por ti y luego le caemos ahí.", "This uses caerle to mean showing up at a place.", breakdown([["if you want", "si quieres"], ["I’ll pick you up", "paso por ti"], ["we’ll show up there", "le caemos ahí"]])),
      stage("stage-5", "Late update", sentenceVocab.slice(12, 17), sentenceVocab.slice(0, 17), "I’m heading out now, but I ended up running late. I’ll be there in twenty.", "Voy saliendo, pero se me hizo tarde. Llego en veinte.", "This is a useful real-time delay message.", breakdown([["I’m heading out", "voy saliendo"], ["I ended up running late", "se me hizo tarde"], ["I’ll be there in twenty", "llego en veinte"]])),
      stage("stage-6", "Ask for patience", sentenceVocab.slice(15, 21), sentenceVocab.slice(0, 21), "Wait for me a little bit. I’m around the area, and it’s close for me.", "Espérame tantito. Ando por la zona y me queda cerca.", "Tantito makes the wait sound small and friendly.", breakdown([["wait for me a little bit", "espérame tantito"], ["I’m around the area", "ando por la zona"], ["it’s close for me", "me queda cerca"]])),
      stage("stage-7", "New meeting option", sentenceVocab.slice(19, 24), sentenceVocab.slice(0, 24), "If you want, we can meet there around seven. Okay, then that’s the plan.", "Si quieres, nos vemos ahí a eso de las siete. Sale, entonces quedamos así.", "This confirms a flexible adjusted plan.", breakdown([["we can meet there", "nos vemos ahí"], ["around seven", "a eso de las siete"], ["that’s the plan", "quedamos así"]])),
      stage("stage-8", "Close the chat", sentenceVocab.slice(24), sentenceVocab, "I’ll let you know when I get there. See you later, and if anything changes, let me know.", "Te aviso cuando llegue. Al rato nos vemos y, si cambia algo, me dices.", "This is a natural final message before meeting.", breakdown([["I’ll let you know when I get there", "te aviso cuando llegue"], ["see you later", "al rato nos vemos"], ["if anything changes, let me know", "si cambia algo, me dices"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-plans-story-q1", type: "multiple-choice", prompt: "After message 3, what does Diego invite Mariana to do?", options: ["Go get tacos later", "Study at the library", "Buy a new phone", "Go to the airport"], correctAnswer: "Go get tacos later", explanation: "Diego asks what she is doing later and says vamos por unos tacos.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-plans-story-q2", type: "multiple-choice", prompt: "After message 6, where do they plan to meet first?", options: ["Around downtown", "At the airport", "At school", "At Diego’s office"], correctAnswer: "Around downtown", explanation: "Mariana suggests nos vemos por el centro.", points: 1, skillTag: "place" },
  { id: "mexican-b1-plans-story-q3", type: "true-false", prompt: "After message 9, true or false: Diego offers to send the location.", options: ["True", "False"], correctAnswer: "True", explanation: "He says te mando la ubicación.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-plans-story-q4", type: "multiple-choice", prompt: "After message 12, what does Mariana ask Diego to do?", options: ["Pick her up if possible", "Cancel the plan", "Order tacos online", "Wait until tomorrow"], correctAnswer: "Pick her up if possible", explanation: "She asks if he can pass by her place.", points: 1, skillTag: "request" },
  { id: "mexican-b1-plans-story-q5", type: "multiple-choice", prompt: "After message 15, what happens to Diego?", options: ["He ends up running late", "He arrives early", "He loses his wallet", "He changes cities"], correctAnswer: "He ends up running late", explanation: "Diego says se me hizo tarde.", points: 1, skillTag: "delay" },
  { id: "mexican-b1-plans-story-q6", type: "multiple-choice", prompt: "After message 18, what update does Diego give?", options: ["He is around the area and it is close for him", "He is still asleep", "He is leaving the country", "He cannot find his phone"], correctAnswer: "He is around the area and it is close for him", explanation: "He says ando por la zona and me queda cerca.", points: 1, skillTag: "location" },
  { id: "mexican-b1-plans-story-q7", type: "true-false", prompt: "After message 21, true or false: They adjust the plan to meet around seven.", options: ["True", "False"], correctAnswer: "True", explanation: "Mariana suggests a eso de las siete.", points: 1, skillTag: "time" },
  { id: "mexican-b1-plans-story-q8", type: "multiple-choice", prompt: "After message 24, what phrase confirms the plan?", options: ["Sale, entonces quedamos así", "Se me hizo tarde", "Espérame tantito", "¿Qué onda?"], correctAnswer: "Sale, entonces quedamos así", explanation: "That phrase means alright, then that’s the plan.", points: 1, skillTag: "confirmation" },
  { id: "mexican-b1-plans-story-q9", type: "multiple-choice", prompt: "After message 27, what will Diego do when he arrives?", options: ["Let Mariana know", "Leave without her", "Cancel the tacos", "Send no messages"], correctAnswer: "Let Mariana know", explanation: "He says te aviso cuando llegue.", points: 1, skillTag: "arrival" },
  { id: "mexican-b1-plans-story-q10", type: "multiple-choice", prompt: "By message 30, what is the final plan?", options: ["They will meet later for tacos and stay flexible if anything changes", "They canceled everything", "They decided to meet next month", "They are going to a formal dinner"], correctAnswer: "They will meet later for tacos and stay flexible if anything changes", explanation: "They close with al rato nos vemos and si cambia algo, me dices.", points: 1, skillTag: "summary" },
];

export const mexicanSpanishB1SpontaneousPlansFriendsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B1 Story: Tacos After Six",
  subtitle: "Diego and Mariana make a spontaneous taco plan, adjust the time, share the location, and handle being late.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "WhatsApp", "plans", "friends"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mariana", name: "Mariana", initials: "MA", side: "right", color: "violet" },
      { id: "diego", name: "Diego", initials: "DI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "diego", "¿Qué onda, Mariana?", "What’s up, Mariana?", ["¿qué onda?"]),
      message("m2", "mariana", "Todo bien. ¿Qué pasó?", "All good. What happened?", []),
      message("m3", "diego", "¿Qué haces al rato? Vamos por unos tacos, ¿jalas?", "What are you doing later? Let’s go get some tacos, are you in?", ["¿qué haces al rato?", "vamos por unos tacos", "¿jalas?"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "mariana", "Sí jalo. ¿A qué hora?", "I’m in. What time?", ["jalar"]),
      message("m5", "diego", "Como a las seis, si te late.", "Around six, if that sounds good to you.", ["como a las seis", "¿te late?"]),
      message("m6", "mariana", "Me late. Mejor nos vemos por el centro.", "Sounds good. Better let’s meet around downtown.", ["¿te late?", "nos vemos por el centro"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "diego", "Va, por el centro está bien.", "Okay, downtown is fine.", []),
      message("m8", "mariana", "¿Dónde exactamente?", "Where exactly?", []),
      message("m9", "diego", "Te mando la ubicación del lugar y ahí te caigo.", "I’ll send you the location of the place and I’ll meet you there.", ["te mando la ubicación", "ahí te caigo"]),
      message("m10", "mariana", "Perfecto. ¿Está cerca del metro?", "Perfect. Is it close to the metro?", []),
      message("m11", "diego", "Sí, me queda cerca y está fácil llegar.", "Yes, it’s close for me and easy to get to.", ["me queda cerca"]),
      message("m12", "mariana", "Oye, si puedes, ¿pasas por mí? Traigo una mochila enorme.", "Hey, if you can, could you pick me up? I have a huge backpack.", ["paso por ti"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "diego", "Sí, paso por ti antes de caerle al lugar.", "Yes, I’ll pick you up before showing up at the place.", ["paso por ti", "caerle a un lugar"]),
      message("m14", "mariana", "Gracias. Entonces salgo en un rato.", "Thanks. Then I’ll leave in a bit.", []),
      message("m15", "diego", "Cambio de plan: voy saliendo, pero se me hizo tarde.", "Change of plan: I’m heading out, but I ended up running late.", ["voy saliendo", "se me hizo tarde"]),
      message("m16", "mariana", "Jajaja, clásico. ¿Cuánto te falta?", "Hahaha, classic. How much longer?", []),
      message("m17", "diego", "Llego en veinte. Espérame tantito.", "I’ll be there in twenty. Wait for me a little bit.", ["llego en veinte", "espérame tantito", "tantito"]),
      message("m18", "diego", "Ya ando por la zona, entonces no me tardo.", "I’m already around the area, so I won’t take long.", ["ando por la zona"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "mariana", "Va, no hay problema. Yo también voy lenta.", "Okay, no problem. I’m moving slowly too.", []),
      message("m20", "diego", "Si quieres, nos vemos ahí mejor y ya no paso por ti.", "If you want, we can meet there instead and I won’t pick you up.", ["si quieres, nos vemos ahí"]),
      message("m21", "mariana", "Sí, mejor. A eso de las siete llego tranquila.", "Yes, better. I’ll arrive calmly around seven or so.", ["a eso de las siete"]),
      message("m22", "diego", "Sale. Entonces directo al local de tacos.", "Okay. Then straight to the taco place.", ["sale"]),
      message("m23", "mariana", "¿Quedamos así?", "Is that the plan?", ["quedamos así"]),
      message("m24", "diego", "Sale, entonces quedamos así: tú llegas al local y yo te veo ahí.", "Alright, then that’s the plan: you arrive at the place and I’ll see you there.", ["sale, entonces quedamos así", "quedamos así"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "mariana", "Mándame la ubicación otra vez, porfa.", "Send me the location again, please.", ["te mando la ubicación"]),
      message("m26", "diego", "Ahorita te la mando. Te aviso cuando llegue.", "I’ll send it to you now. I’ll let you know when I get there.", ["te aviso cuando llegue"]),
      message("m27", "mariana", "Va. Yo salgo al rato.", "Okay. I’ll leave later.", ["al rato"]),
      message("m28", "diego", "Al rato nos vemos. Si cambia algo, me dices.", "See you later. If anything changes, let me know.", ["al rato nos vemos", "si cambia algo, me dices"]),
      message("m29", "mariana", "Sale, tengo hambre, así que sí llego.", "Deal, I’m hungry, so I’m definitely going.", ["sale"]),
      message("m30", "diego", "Jajaja, perfecto. Plan espontáneo, tacos seguros.", "Hahaha, perfect. Spontaneous plan, guaranteed tacos.", [], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-b1-plans-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: plansVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: plansVocab.map((item) => item.term),
      grammarPatterns: [
        "Casual invitations: ¿qué haces al rato?, ¿jalas?, ¿te late?",
        "Planning details: como a las seis, nos vemos por el centro, te mando la ubicación.",
        "Updates and confirmation: voy saliendo, llego en veinte, quedamos así.",
      ],
      speakingPrompts: [
        "Invite a friend to get tacos later.",
        "Change the meeting time because you are running late.",
        "Confirm the plan and ask them to tell you if anything changes.",
      ],
    },
    completionTask: {
      title: "Your Mexican B1 spontaneous plan",
      instructions: "Record a 45-second Mexican Spanish voice note making a casual plan with a friend. Include the place, time, location, and a late update.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Para hacer planes con amigos en México, puedes empezar simple: «¿qué onda?» y luego «¿qué haces al rato?». Estas frases suenan naturales porque no parecen una invitación formal. Abren la conversación de forma relajada.", translation: "To make plans with friends in Mexico, you can start simply: ¿qué onda? and then ¿qué haces al rato?. These phrases sound natural because they do not feel like a formal invitation. They open the conversation in a relaxed way.", highlights: highlights(["¿qué onda?", "¿qué haces al rato?", "al rato"]), shadowLine: "¿Qué onda? ¿Qué haces al rato?" },
  { id: "p2", text: "Después viene la invitación: «vamos por unos tacos» o simplemente «¿jalas?». En este contexto, «jalar» significa aceptar el plan o sumarse. Si quieres sonar menos directo, puedes preguntar «¿te late?» para saber si la idea le gusta.", translation: "Then comes the invitation: vamos por unos tacos or simply ¿jalas?. In this context, jalar means accepting the plan or joining in. If you want to sound less direct, you can ask ¿te late? to know if the idea sounds good.", highlights: highlights(["vamos por unos tacos", "¿jalas?", "jalar", "¿te late?"]), shadowLine: "Vamos por unos tacos, ¿jalas?" },
  { id: "p3", text: "Los horarios casuales no siempre son exactos. Puedes decir «como a las seis» o «a eso de las siete». Las dos frases significan que la hora es aproximada. Sirven mucho cuando el plan todavía está medio abierto.", translation: "Casual times are not always exact. You can say como a las seis or a eso de las siete. Both phrases mean the time is approximate. They are very useful when the plan is still somewhat open.", highlights: highlights(["como a las seis", "a eso de las siete"]), shadowLine: "Nos vemos como a las seis o a eso de las siete." },
  { id: "p4", text: "Para elegir lugar, «nos vemos por el centro» suena flexible. Si ya tienes el punto exacto, di «te mando la ubicación». Y si vas a llegar tú al lugar, «ahí te caigo» es una forma muy mexicana y casual de confirmar.", translation: "To choose a place, nos vemos por el centro sounds flexible. If you already have the exact point, say te mando la ubicación. And if you are going to arrive there, ahí te caigo is a very Mexican and casual way to confirm.", highlights: highlights(["nos vemos por el centro", "te mando la ubicación", "ahí te caigo", "caerle a un lugar"]), shadowLine: "Te mando la ubicación y ahí te caigo." },
  { id: "p5", text: "Si quieres ayudar a tu amigo, puedes decir «paso por ti». Pero si el plan cambia, no pasa nada: «si quieres, nos vemos ahí» mantiene todo tranquilo. La idea es coordinar sin hacer mucho drama.", translation: "If you want to help your friend, you can say paso por ti. But if the plan changes, no problem: si quieres, nos vemos ahí keeps everything calm. The idea is to coordinate without making too much drama.", highlights: highlights(["paso por ti", "si quieres, nos vemos ahí"]), shadowLine: "Si quieres, paso por ti; si no, nos vemos ahí." },
  { id: "p6", text: "Cuando vas tarde, puedes avisar con «voy saliendo» y «se me hizo tarde». Luego das una estimación: «llego en veinte». Si necesitas que te esperen, «espérame tantito» suena más suave que solo decir espera.", translation: "When you are late, you can update with voy saliendo and se me hizo tarde. Then you give an estimate: llego en veinte. If you need them to wait, espérame tantito sounds softer than just saying wait.", highlights: highlights(["voy saliendo", "se me hizo tarde", "llego en veinte", "espérame tantito", "tantito"]), shadowLine: "Voy saliendo; se me hizo tarde, pero llego en veinte." },
  { id: "p7", text: "Para hablar de ubicación, «ando por la zona» significa que estás cerca o moviéndote por esa área. «Me queda cerca» explica que el lugar te conviene. Después puedes decir «te aviso cuando llegue» para cerrar la espera.", translation: "To talk about location, ando por la zona means you are nearby or moving around that area. Me queda cerca explains that the place is convenient for you. Then you can say te aviso cuando llegue to close the wait.", highlights: highlights(["ando por la zona", "me queda cerca", "te aviso cuando llegue"]), shadowLine: "Ando por la zona y te aviso cuando llegue." },
  { id: "p8", text: "Para confirmar, «sale» funciona como okay o deal. Si todo quedó claro, usa «sale, entonces quedamos así» o solo «quedamos así». Al final, «al rato nos vemos» y «si cambia algo, me dices» mantienen el plan flexible y natural.", translation: "To confirm, sale works like okay or deal. If everything is clear, use sale, entonces quedamos así or just quedamos así. At the end, al rato nos vemos and si cambia algo, me dices keep the plan flexible and natural.", highlights: highlights(["sale", "sale, entonces quedamos así", "quedamos así", "al rato nos vemos", "si cambia algo, me dices"]), shadowLine: "Sale, entonces quedamos así. Al rato nos vemos." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-plans-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Making casual spontaneous plans with friends in Mexican Spanish", "Telling a dramatic story", "Apologizing after a joke", "Negotiating work boundaries"], correctAnswer: "Making casual spontaneous plans with friends in Mexican Spanish", explanation: "The reading explains invitations, times, locations, late updates, and confirmations.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-plans-reading-q2", type: "multiple-choice", prompt: "Which phrase means “are you in?”", options: ["¿Jalas?", "Sale", "Al rato", "Tantito"], correctAnswer: "¿Jalas?", explanation: "¿Jalas? asks if the friend wants to join the plan.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-plans-reading-q3", type: "true-false", prompt: "True or false: “como a las seis” gives an approximate time.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says casual times like como a las seis are approximate.", points: 1, skillTag: "time" },
  { id: "mexican-b1-plans-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll send you the location.", wordBank: ["Te", "mando", "la", "ubicación."], correctAnswer: "Te mando la ubicación.", explanation: "This is the practical phrase for sharing the location.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-b1-plans-reading-q5", type: "multiple-choice", prompt: "Which phrase confirms the plan?", options: ["Sale, entonces quedamos así", "Se me hizo tarde", "Espérame tantito", "¿Qué haces al rato?"], correctAnswer: "Sale, entonces quedamos así", explanation: "This means alright, then that’s the plan.", points: 1, skillTag: "confirmation" },
];

export const mexicanSpanishB1SpontaneousPlansFriendsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B1 Reading: Planes al Rato",
  subtitle: "A synced Spanish reading about casual Mexican invitations, flexible times, location sharing, and late updates.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "reading", "plans", "friends"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: plansVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican B1 spontaneous-plans vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishB1SpontaneousPlansFriendsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish B1: Spontaneous Plans with Friends Quiz",
  subtitle: "Choose the right Mexican phrase for invitations, meeting points, delays, and confirmations.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "quiz", "plans", "friends"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B1 phrases for spontaneous plans with friends: inviting, checking interest, sending locations, running late, and confirming.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-b1-plans-quiz-1", type: "multiple-choice", prompt: "You want to ask a friend what they’re doing later. What fits?", options: ["¿Qué haces al rato?", "Quedamos así", "Llego en veinte", "Te aviso cuando llegue"], correctAnswer: "¿Qué haces al rato?", explanation: "This opens a casual plan for later.", points: 1, skillTag: "invitation" },
      { id: "mexican-b1-plans-quiz-2", type: "fill-blank", prompt: "Complete: Vamos por unos tacos, ¿____?", nativePrompt: "Let’s go get some tacos, are you in?", correctAnswer: "jalas", explanation: "¿Jalas? asks if the friend is in.", points: 1, skillTag: "invite" },
      { id: "mexican-b1-plans-quiz-3", type: "multiple-choice", prompt: "You want to ask if the plan sounds good. Which phrase fits?", options: ["¿Te late?", "Tantito", "Voy saliendo", "Al rato"], correctAnswer: "¿Te late?", explanation: "¿Te late? checks if the other person likes the idea.", points: 1, skillTag: "interest" },
      { id: "mexican-b1-plans-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll send you the location.", wordBank: ["Te", "mando", "la", "ubicación."], correctAnswer: "Te mando la ubicación.", explanation: "This phrase is used to share the meeting point.", points: 1, skillTag: "location" },
      { id: "mexican-b1-plans-quiz-5", type: "true-false", prompt: "True or false: “se me hizo tarde” means I ended up running late.", options: ["True", "False"], correctAnswer: "True", explanation: "This is the natural late-arrival explanation.", points: 1, skillTag: "delay" },
      { id: "mexican-b1-plans-quiz-6", type: "multiple-choice", prompt: "You want to say “I’ll pick you up.” What fits?", options: ["Paso por ti", "Ando por la zona", "Sale", "Me queda cerca"], correctAnswer: "Paso por ti", explanation: "Paso por ti means I’ll come pick you up.", points: 1, skillTag: "pickup" },
      { id: "mexican-b1-plans-quiz-7", type: "fill-blank", prompt: "Complete: Espérame ____.", nativePrompt: "Wait for me a little bit.", correctAnswer: "tantito", explanation: "Tantito softens the request.", points: 1, skillTag: "softening" },
      { id: "mexican-b1-plans-quiz-8", type: "multiple-choice", prompt: "You want to confirm “that’s the plan.” Which phrase fits?", options: ["Quedamos así", "¿Qué onda?", "Se me hizo tarde", "A eso de las siete"], correctAnswer: "Quedamos así", explanation: "Quedamos así confirms what was agreed.", points: 1, skillTag: "confirmation" },
      { id: "mexican-b1-plans-quiz-9", type: "true-false", prompt: "True or false: “ando por la zona” means I’m around the area.", options: ["True", "False"], correctAnswer: "True", explanation: "Ando por la zona is a natural location update.", points: 1, skillTag: "location" },
      { id: "mexican-b1-plans-quiz-10", type: "multiple-choice", prompt: "You want to keep the plan flexible. What fits?", options: ["Si cambia algo, me dices", "Vamos por unos tacos", "Como a las seis", "Me queda cerca"], correctAnswer: "Si cambia algo, me dices", explanation: "This means if anything changes, let me know.", points: 1, skillTag: "flexibility" },
      pairQuestion("mexican-b1-plans-pairs-1", "Match invitation and interest phrases.", plansVocab.slice(0, 10)),
      pairQuestion("mexican-b1-plans-pairs-2", "Match location and timing phrases.", plansVocab.slice(10, 20)),
      pairQuestion("mexican-b1-plans-pairs-3", "Match confirmation and closing phrases.", plansVocab.slice(20)),
    ],
  },
};
