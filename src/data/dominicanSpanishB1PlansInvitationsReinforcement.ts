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

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];
const courseId = "dominican-spanish-b1-plans-invitations";
const skoolSectionName = "Dominican Spanish - B1 Plans and Invitations";

const plansVocab: VocabItem[] = [
  { id: "que-lo-que", term: "¿Qué lo qué?", meaning: "What’s up? / What’s good?", note: "Very informal Dominican greeting.", example: "¿Qué lo qué, manito?", translation: "What’s up, bro?", starred: true },
  { id: "tamo-activo", term: "¿Tamo activo?", meaning: "Are we on? / Are we doing this? / Are we ready?", note: "Spoken Dominican reduction of estamos.", example: "¿Tamo activo pa’l coro?", translation: "Are we on for the hangout?", starred: true },
  { id: "hacer-coro", term: "Hacer coro", meaning: "to hang out / chill / spend time together", note: "Common Dominican social phrase.", example: "Vamos a hacer coro un rato.", translation: "We’re going to hang out for a bit.", starred: true },
  { id: "el-coro", term: "El coro", meaning: "the hangout / gathering / crew activity", note: "Can mean the plan or the group activity.", example: "El coro es en casa de Leo.", translation: "The hangout is at Leo’s place.", starred: true },
  { id: "dime-a-ve", term: "Dime a ve’", meaning: "Tell me what’s up / what’s going on?", note: "Informal Dominican phrase; ve’ reflects spoken style.", example: "Dime a ve’, ¿qué hacemos?", translation: "Tell me what’s up, what are we doing?", starred: true },
  { id: "manito", term: "Manito", meaning: "bro / mate / my guy", note: "Friendly informal address.", example: "Manito, tírame por WhatsApp.", translation: "Bro, hit me up on WhatsApp.", starred: true },
  { id: "de-una", term: "De una", meaning: "definitely / for sure / I’m down", note: "Natural acceptance phrase.", example: "De una, me apunto.", translation: "For sure, I’m in.", starred: true },
  { id: "ta-jevi", term: "Tá jevi", meaning: "it’s cool / it’s nice / sounds good", note: "Tá is a spoken shortening of está.", example: "Tá jevi, hacemos coro mañana.", translation: "Sounds good, we’ll hang out tomorrow.", starred: true },
  { id: "jevi", term: "Jevi", meaning: "cool / great / nice", note: "Informal positive reaction.", example: "Ese plan está jevi.", translation: "That plan is cool.", starred: true },
  { id: "tirame", term: "Tírame", meaning: "hit me up / message me", note: "Informal messaging phrase.", example: "Tírame cuando salgas.", translation: "Hit me up when you leave.", starred: true },
  { id: "tirame-whatsapp", term: "Tírame por WhatsApp", meaning: "hit me up on WhatsApp", note: "Useful plan coordination phrase.", example: "Tírame por WhatsApp y cuadramos.", translation: "Hit me up on WhatsApp and we’ll arrange it.", starred: true },
  { id: "cae-por-aqui", term: "Cae por aquí", meaning: "come by / swing by here", note: "Casual invitation.", example: "Cae por aquí después del trabajo.", translation: "Swing by here after work.", starred: true },
  { id: "vaina", term: "Vaina", meaning: "thing / situation / stuff / problem", note: "Very flexible informal Dominican word; meaning depends on context.", example: "Tengo una vaina ahora.", translation: "I’ve got something going on right now.", starred: true },
  { id: "tengo-una-vaina", term: "Tengo una vaina", meaning: "I’ve got something going on / I’ve got this thing to deal with", note: "Soft way to say something is happening.", example: "Tengo una vaina en casa.", translation: "I’ve got something going on at home.", starred: true },
  { id: "se-me-complico-vaina", term: "Se me complicó una vaina", meaning: "Something came up / something got complicated", note: "Natural Dominican-style explanation for changing plans.", example: "Se me complicó una vaina y salgo tarde.", translation: "Something came up and I’m leaving late.", starred: true },
  { id: "pa", term: "Pa’", meaning: "spoken shortening of para — for / to", note: "Very common in speech; avoid in formal writing.", example: "Pa’ mañana está mejor.", translation: "For tomorrow is better.", starred: true },
  { id: "ta", term: "Tá", meaning: "spoken shortening of está — is", note: "Informal written representation of speech.", example: "Tá jevi.", translation: "It’s cool.", starred: true },
  { id: "tamo", term: "Tamo", meaning: "spoken reduction of estamos — we are", note: "Informal Dominican speech spelling.", example: "Tamo activo.", translation: "We’re on.", starred: true },
  { id: "dejalo-pa-manana", term: "Déjalo pa’ mañana", meaning: "leave it for tomorrow / let’s do it tomorrow", note: "Soft reschedule phrase.", example: "Si se complica, déjalo pa’ mañana.", translation: "If it gets complicated, leave it for tomorrow.", starred: true },
  { id: "y-si-mejor", term: "¿Y si mejor…?", meaning: "What if we… instead? / How about we… instead?", note: "Useful for suggesting an alternative.", example: "¿Y si mejor hacemos coro mañana?", translation: "What if we hang out tomorrow instead?", starred: true },
  { id: "ahorita-te-digo", term: "Ahorita te digo", meaning: "I’ll tell you in a bit / I’ll let you know shortly", note: "Keeps the plan open while you check.", example: "Ahorita te digo si puedo.", translation: "I’ll let you know shortly if I can.", starred: true },
  { id: "no-cojas-lucha", term: "No cojas lucha", meaning: "don’t stress / don’t worry about it / don’t give yourself a hard time", note: "Warm Dominican reassurance.", example: "No cojas lucha, manito.", translation: "Don’t stress, bro.", starred: true },
  { id: "un-chin", term: "Un chin", meaning: "a little bit", note: "Common Dominican phrase for a small amount.", example: "Espérame un chin.", translation: "Wait for me a little bit.", starred: true },
  { id: "esperame-un-chin", term: "Espérame un chin", meaning: "wait for me a little bit", note: "Friendly waiting phrase.", example: "Espérame un chin, voy llegando.", translation: "Wait for me a little bit, I’m almost there.", starred: true },
  { id: "voy-llegando", term: "Voy llegando", meaning: "I’m almost there / I’m on my way and nearly there", note: "Natural arrival update.", example: "Voy llegando al coro.", translation: "I’m almost at the hangout.", starred: true },
  { id: "me-apunto", term: "Me apunto", meaning: "I’m in / count me in", note: "Clear acceptance phrase.", example: "De una, me apunto.", translation: "For sure, count me in.", starred: true },
  { id: "dale", term: "Dale", meaning: "okay / sounds good / go ahead / deal", note: "Very common confirmation.", example: "Dale, mándame tu ubicación.", translation: "Okay, send me your location.", starred: true },
  { id: "mandame-ubicacion", term: "Mándame tu ubicación", meaning: "send me your location", note: "Practical planning phrase.", example: "Mándame tu ubicación y caigo.", translation: "Send me your location and I’ll come by.", starred: true },
  { id: "no-puedo-hoy", term: "No puedo hoy", meaning: "I can’t today", note: "Direct but neutral refusal.", example: "No puedo hoy, se me complicó.", translation: "I can’t today, something came up.", starred: true },
  { id: "se-me-complico", term: "Se me complicó", meaning: "something came up / things got complicated", note: "Short version for explaining a change.", example: "Se me complicó, pero mañana puedo.", translation: "Something came up, but I can tomorrow.", starred: true },
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
    acceptedAnswers: [item.meaning.split("/")[0].trim()],
    languageFrom: "spanish",
    languageTo: "english",
    difficulty: item.starred ? "hard" : "medium",
    notes: item.note,
    starred: item.starred,
    specialCharacters,
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
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, explanation, wordBreakdown, hints };
}

export const dominicanSpanishB1PlansInvitationsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B1: Plans & Invitations Flashcards",
  subtitle: "Dominican Spanish phrases for greetings, making plans, accepting, rescheduling, location sharing, and low-pressure invitations.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "flashcards", "plans", "invitations"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: plansVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué lo qué? = What’s up?",
  "manito = bro / my guy",
  "¿Tamo activo? = Are we on?",
  "hacer coro = hang out",
  "el coro = the hangout",
  "de una = for sure",
  "me apunto = I’m in",
  "tá jevi = sounds good / it’s cool",
  "tírame por WhatsApp = hit me up on WhatsApp",
  "cae por aquí = come by here",
  "mándame tu ubicación = send me your location",
  "tengo una vaina = I’ve got something going on",
  "se me complicó = something came up",
  "no puedo hoy = I can’t today",
  "déjalo pa’ mañana = leave it for tomorrow",
  "¿Y si mejor...? = what if we instead...?",
  "ahorita te digo = I’ll let you know in a bit",
  "no cojas lucha = don’t stress",
  "espérame un chin = wait for me a little bit",
  "voy llegando = I’m almost there",
];

export const dominicanSpanishB1PlansInvitationsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Dominican Plans & Invitations",
  subtitle: "Build friendly Dominican Spanish for making plans, accepting, changing details, and keeping things low-pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "sentence-builder", "plans", "invitations"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short Dominican-style voice note inviting a friend to hang out, accepting or changing the plan, asking for a location, and reassuring them.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Open the plan",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "What’s up, bro? Are we on to hang out?",
        "¿Qué lo qué, manito? ¿Tamo activo pa’ hacer coro?",
        "This is very informal and friendly. Use it with friends, not in formal settings.",
        breakdown([["What’s up?", "¿Qué lo qué?"], ["bro", "manito"], ["Are we on?", "¿Tamo activo?"], ["to hang out", "pa’ hacer coro"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Accept",
        sentenceVocab.slice(4, 8),
        sentenceVocab.slice(0, 8),
        "The hangout sounds good. For sure, I’m in.",
        "El coro tá jevi. De una, me apunto.",
        "“Tá jevi” gives a positive reaction, and “me apunto” confirms you are in.",
        breakdown([["The hangout", "El coro"], ["sounds good", "tá jevi"], ["for sure", "de una"], ["I’m in", "me apunto"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Coordinate",
        sentenceVocab.slice(8, 11),
        sentenceVocab.slice(0, 11),
        "Hit me up on WhatsApp, come by here, and send me your location.",
        "Tírame por WhatsApp, cae por aquí y mándame tu ubicación.",
        "This bundles common coordination phrases for casual plans.",
        breakdown([["Hit me up on WhatsApp", "Tírame por WhatsApp"], ["come by here", "cae por aquí"], ["send me your location", "mándame tu ubicación"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Something came up",
        sentenceVocab.slice(11, 14),
        sentenceVocab.slice(0, 14),
        "I’ve got something going on. Something came up, and I can’t today.",
        "Tengo una vaina. Se me complicó y no puedo hoy.",
        "“Vaina” is flexible; here it means a thing/situation that got complicated.",
        breakdown([["I’ve got something going on", "Tengo una vaina"], ["something came up", "se me complicó"], ["I can’t today", "no puedo hoy"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Reschedule",
        sentenceVocab.slice(14, 16),
        sentenceVocab.slice(0, 16),
        "Leave it for tomorrow. What if we hang out tomorrow instead?",
        "Déjalo pa’ mañana. ¿Y si mejor hacemos coro mañana?",
        "“Pa’” is spoken para. It sounds local and casual.",
        breakdown([["Leave it for tomorrow", "Déjalo pa’ mañana"], ["What if we instead", "¿Y si mejor"], ["we hang out tomorrow", "hacemos coro mañana"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Keep it open",
        sentenceVocab.slice(16, 18),
        sentenceVocab.slice(0, 18),
        "I’ll let you know in a bit. Don’t stress.",
        "Ahorita te digo. No cojas lucha.",
        "This keeps the plan open and reassures the other person.",
        breakdown([["I’ll let you know in a bit", "Ahorita te digo"], ["Don’t stress", "No cojas lucha"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Arrival",
        sentenceVocab.slice(18, 20),
        sentenceVocab,
        "Wait for me a little bit. I’m almost there.",
        "Espérame un chin. Voy llegando.",
        "“Un chin” means a little bit, and “voy llegando” means you are almost there.",
        breakdown([["Wait for me a little bit", "Espérame un chin"], ["I’m almost there", "Voy llegando"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Full message",
        [],
        sentenceVocab,
        "What’s up, bro? Are we on to hang out? If something came up, don’t stress. Leave it for tomorrow and hit me up on WhatsApp.",
        "¿Qué lo qué, manito? ¿Tamo activo pa’ hacer coro? Si se te complicó una vaina, no cojas lucha. Déjalo pa’ mañana y tírame por WhatsApp.",
        "This is a full B1 Dominican-style plan message: greeting, invitation, soft reschedule, reassurance, and follow-up.",
        breakdown([
          ["What’s up, bro?", "¿Qué lo qué, manito?"],
          ["Are we on to hang out?", "¿Tamo activo pa’ hacer coro?"],
          ["If something came up", "Si se te complicó una vaina"],
          ["don’t stress", "no cojas lucha"],
          ["leave it for tomorrow", "déjalo pa’ mañana"],
          ["hit me up on WhatsApp", "tírame por WhatsApp"],
        ]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/${courseId}/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "dominican-b1-plans-story-q1",
    type: "multiple-choice",
    prompt: "What is Leo asking Camila at the start?",
    options: ["If they are still on to hang out", "If she needs a new phone", "If she studied for an exam", "If she bought groceries"],
    correctAnswer: "If they are still on to hang out",
    explanation: "Leo says “¿Tamo activo pa’ hacer coro?”",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "dominican-b1-plans-story-q2",
    type: "multiple-choice",
    prompt: "What does Camila say to accept the plan?",
    options: ["De una, me apunto", "No puedo hoy", "Se me complicó", "Déjalo pa’ mañana"],
    correctAnswer: "De una, me apunto",
    explanation: "“De una, me apunto” means she is definitely in.",
    points: 1,
    skillTag: "accepting",
  },
  {
    id: "dominican-b1-plans-story-q3",
    type: "order-words",
    prompt: "Order the phrase meaning “Hit me up on WhatsApp.”",
    wordBank: ["Tírame", "por", "WhatsApp"],
    correctAnswer: "Tírame por WhatsApp",
    explanation: "This is the messaging phrase from the story.",
    points: 1,
    skillTag: "coordination",
  },
  {
    id: "dominican-b1-plans-story-q4",
    type: "multiple-choice",
    prompt: "What problem happens with the terrace?",
    options: ["Something came up with the owner", "It is too cold", "Nobody knows the address", "The music is too quiet"],
    correctAnswer: "Something came up with the owner",
    explanation: "Leo says the terrace owner has a “vaina” and the plan got complicated.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "dominican-b1-plans-story-q5",
    type: "fill-blank",
    prompt: "Complete: No cojas ______.",
    nativePrompt: "Don’t stress.",
    correctAnswer: "lucha",
    explanation: "“No cojas lucha” means don’t stress.",
    points: 1,
    skillTag: "reassurance",
  },
  {
    id: "dominican-b1-plans-story-q6",
    type: "multiple-choice",
    prompt: "What alternative does Camila suggest?",
    options: ["Doing it tomorrow", "Canceling forever", "Going to the airport", "Studying alone"],
    correctAnswer: "Doing it tomorrow",
    explanation: "She says “¿Y si mejor lo dejamos pa’ mañana?”",
    points: 1,
    skillTag: "reschedule",
  },
  {
    id: "dominican-b1-plans-story-q7",
    type: "true-false",
    prompt: "True or false: Leo asks Camila to send her location.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "He says “mándame tu ubicación.”",
    points: 1,
    skillTag: "location",
  },
  {
    id: "dominican-b1-plans-story-q8",
    type: "multiple-choice",
    prompt: "What does “Espérame un chin” mean?",
    options: ["Wait for me a little bit", "Send me money", "Leave now", "Cancel the plan"],
    correctAnswer: "Wait for me a little bit",
    explanation: "“Un chin” means a little bit.",
    points: 1,
    skillTag: "meaning",
  },
  {
    id: "dominican-b1-plans-story-q9",
    type: "multiple-choice",
    prompt: "Where do they decide to meet first?",
    options: ["By the colmado near Camila", "At the airport", "At a school", "In another city"],
    correctAnswer: "By the colmado near Camila",
    explanation: "Camila shares a nearby location and says the colmado has space.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "dominican-b1-plans-story-q10",
    type: "multiple-choice",
    prompt: "How does the story end?",
    options: ["They keep the plan alive and Leo is almost there", "They stop being friends", "They move the plan to next year", "They forget the location"],
    correctAnswer: "They keep the plan alive and Leo is almost there",
    explanation: "Leo says “Voy llegando” and Camila says the coro survived.",
    points: 1,
    skillTag: "ending",
  },
];

export const dominicanSpanishB1PlansInvitationsWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican B1 Story: The Coro Almost Falls Apart",
  subtitle: "A WhatsApp-style story about a simple hangout that gets complicated, then turns into a better plan.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "WhatsApp", "plans", "invitations"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "leo", name: "Leo", initials: "L", side: "right", color: "blue" },
      { id: "camila", name: "Camila", initials: "C", side: "left", color: "green" },
    ],
    messages: [
      message("m1", "leo", "¿Qué lo qué, Camila?", "What’s up, Camila?", ["¿Qué lo qué?"], "voice-note", `/audio/stories/${courseId}/m1.mp3`),
      message("m2", "leo", "¿Tamo activo pa’ hacer coro hoy?", "Are we on to hang out today?", ["¿Tamo activo?", "Tamo", "Pa’", "Hacer coro"]),
      message("m3", "camila", "Dime a ve’, ¿a qué hora es el coro?", "Tell me what’s up, what time is the hangout?", ["Dime a ve’", "El coro"]),
      message("m4", "leo", "Tipo siete. Cae por aquí primero.", "Around seven. Come by here first.", ["Cae por aquí"]),
      message("m5", "camila", "De una, me apunto.", "For sure, I’m in.", ["De una", "Me apunto"]),
      message("m6", "leo", "Tá jevi, manito. Tírame por WhatsApp cuando salgas.", "Sounds good, bro. Hit me up on WhatsApp when you leave.", ["Tá jevi", "Tá", "Jevi", "Manito", "Tírame por WhatsApp", "Tírame"], "voice-note", `/audio/stories/${courseId}/m6.mp3`),
      message("m7", "camila", "Dale. Pero tengo una vaina antes.", "Okay. But I’ve got something going on first.", ["Dale", "Tengo una vaina", "Vaina"]),
      message("m8", "leo", "¿Una vaina grande o una vaina chiquita?", "A big thing or a small thing?", ["Vaina"]),
      message("m9", "camila", "No sé todavía. Ahorita te digo.", "I don’t know yet. I’ll tell you in a bit.", ["Ahorita te digo"]),
      message("m10", "leo", "No cojas lucha, revisa tranquila.", "Don’t stress, check calmly.", ["No cojas lucha"]),
      message("m11", "camila", "Gracias. Espérame un chin y confirmo.", "Thanks. Wait for me a little bit and I’ll confirm.", ["Espérame un chin", "Un chin"], "voice-note", `/audio/stories/${courseId}/m11.mp3`),
      message("m12", "leo", "Dale, yo mientras hablo con el dueño de la terraza.", "Okay, meanwhile I’ll talk to the terrace owner.", ["Dale"]),
      message("m13", "leo", "Ay, se me complicó una vaina.", "Oh, something came up.", ["Se me complicó una vaina", "Vaina"]),
      message("m14", "camila", "¿Qué pasó ahora?", "What happened now?", []),
      message("m15", "leo", "El dueño dice que no puede hoy.", "The owner says he can’t today.", ["No puedo hoy"]),
      message("m16", "camila", "Entonces déjalo pa’ mañana.", "Then leave it for tomorrow.", ["Déjalo pa’ mañana", "Pa’"], "voice-note", `/audio/stories/${courseId}/m16.mp3`),
      message("m17", "leo", "Pero ya invité a dos amigos.", "But I already invited two friends.", []),
      message("m18", "camila", "¿Y si mejor hacemos coro cerca de mi casa?", "What if we hang out near my place instead?", ["¿Y si mejor…?", "Hacer coro"]),
      message("m19", "leo", "Eso tá jevi. ¿Dónde exactamente?", "That sounds good. Where exactly?", ["Tá jevi", "Tá", "Jevi"]),
      message("m20", "camila", "Hay un colmado con mesas afuera.", "There’s a corner store with tables outside.", []),
      message("m21", "leo", "Mándame tu ubicación y caigo por ahí.", "Send me your location and I’ll come by there.", ["Mándame tu ubicación"], "voice-note", `/audio/stories/${courseId}/m21.mp3`),
      message("m22", "camila", "Ya te la mandé por WhatsApp.", "I already sent it to you on WhatsApp.", ["Tírame por WhatsApp"]),
      message("m23", "leo", "Perfecto. El coro no se cayó, solo cambió de sitio.", "Perfect. The hangout didn’t fall apart, it just changed places.", ["El coro"]),
      message("m24", "camila", "Exacto. No cojas lucha.", "Exactly. Don’t stress.", ["No cojas lucha"]),
      message("m25", "leo", "Voy saliendo ahora.", "I’m leaving now.", []),
      message("m26", "camila", "Avísame cuando vayas llegando.", "Let me know when you’re almost there.", ["Voy llegando"], "voice-note", `/audio/stories/${courseId}/m26.mp3`),
      message("m27", "leo", "Voy llegando. Espérame un chin.", "I’m almost there. Wait for me a little bit.", ["Voy llegando", "Espérame un chin", "Un chin"]),
      message("m28", "camila", "Dale, estoy afuera con una mesa.", "Okay, I’m outside with a table.", ["Dale"]),
      message("m29", "leo", "De una. El coro salió mejor así.", "For sure. The hangout turned out better this way.", ["De una", "El coro"]),
      message("m30", "camila", "Tá jevi. Al final la vaina se resolvió.", "Cool. In the end the thing got solved.", ["Tá jevi", "Jevi", "Vaina"]),
    ],
    comprehensionChecks: [
      { id: "dominican-b1-plans-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "dominican-b1-plans-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "dominican-b1-plans-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "dominican-b1-plans-check-4", afterMessageId: "m12", question: storyQuestions[4] },
      { id: "dominican-b1-plans-check-5", afterMessageId: "m15", question: storyQuestions[3] },
      { id: "dominican-b1-plans-check-6", afterMessageId: "m18", question: storyQuestions[5] },
      { id: "dominican-b1-plans-check-7", afterMessageId: "m21", question: storyQuestions[6] },
      { id: "dominican-b1-plans-check-8", afterMessageId: "m24", question: storyQuestions[8] },
      { id: "dominican-b1-plans-check-9", afterMessageId: "m27", question: storyQuestions[7] },
      { id: "dominican-b1-plans-check-10", afterMessageId: "m30", question: storyQuestions[9] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: plansVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: plansVocab.map((item) => item.term),
      grammarPatterns: [
        "Spoken reductions: tá = está, tamo = estamos, pa’ = para.",
        "Invitation: ¿Tamo activo pa’ hacer coro?",
        "Soft problem: se me complicó / se me complicó una vaina.",
        "Low-pressure reassurance: no cojas lucha.",
      ],
      speakingPrompts: [
        "Invite a friend to hang out today.",
        "Accept a plan and ask for the location.",
        "Explain that something came up and suggest tomorrow.",
        "Tell someone you are almost there.",
      ],
    },
    completionTask: {
      title: "Your Dominican plan voice note",
      instructions: "Record a 60-second Dominican-style voice note making a plan with a friend. Include a greeting, one invitation, one problem, one alternative, and one reassurance.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "En el español dominicano informal, un plan puede empezar con energía: “¿Qué lo qué?” o “¿Qué lo qué, manito?” Son saludos de confianza, no español formal. Después, la invitación puede ser corta: “¿Tamo activo pa’ hacer coro?” En una conversación real, eso suena ligero, cercano y muy de panas.",
    translation:
      "In informal Dominican Spanish, a plan can start with energy: What’s up? or What’s up, bro? These are friendly greetings, not formal Spanish. Then the real invitation can be short: Are we on to hang out? In standard Spanish, this would be closer to Are we ready to spend time together?, but in real casual speech it sounds much lighter.",
    highlights: highlights(["¿Qué lo qué?", "Manito", "¿Tamo activo?", "Tamo", "Pa’", "Hacer coro"]),
    shadowLine: "¿Qué lo qué, manito? ¿Tamo activo pa’ hacer coro?",
  },
  {
    id: "p2",
    text:
      "Si el plan te suena bien, puedes responder: “De una, me apunto.” También puedes decir: “Tá jevi.” Aquí, “tá” es una forma hablada de “está”, y “jevi” significa que algo está bueno, cool o agradable. Son frases útiles para aceptar sin sonar rígido.",
    translation:
      "If the plan sounds good, you can answer: For sure, I’m in. You might also say: Sounds good. Here, tá is a spoken shortening of está, and jevi means cool or nice. These phrases are useful when you want to accept without sounding stiff.",
    highlights: highlights(["De una", "Me apunto", "Tá jevi", "Tá", "Jevi"]),
    shadowLine: "De una, me apunto. Tá jevi.",
  },
  {
    id: "p3",
    text:
      "Para coordinar, el habla dominicana entre amigos puede ser muy directa: “Tírame por WhatsApp”, “cae por aquí” o “mándame tu ubicación”. Son frases prácticas. No explican demasiado; mantienen el plan en movimiento.",
    translation:
      "For coordination, Dominican friend talk can be very direct: Hit me up on WhatsApp, come by here, or send me your location. These are practical phrases. They do not explain too much; they keep the plan moving.",
    highlights: highlights(["Tírame por WhatsApp", "Tírame", "Cae por aquí", "Mándame tu ubicación"]),
    shadowLine: "Tírame por WhatsApp y mándame tu ubicación.",
  },
  {
    id: "p4",
    text:
      "Cuando el plan cambia, “vaina” se vuelve útil. Puede significar cosa, situación, asunto o problema, según el contexto. Si dices: “Tengo una vaina”, estás diciendo que tienes algo pasando. Si dices: “Se me complicó una vaina”, explicas que algo se complicó.",
    translation:
      "When the plan changes, vaina becomes useful. It can mean thing, situation, stuff, or problem. If you say: I’ve got something going on, you are saying that something is happening. If you say: Something came up, you are explaining that something got complicated.",
    highlights: highlights(["Vaina", "Tengo una vaina", "Se me complicó una vaina", "Se me complicó"]),
    shadowLine: "Se me complicó una vaina.",
  },
  {
    id: "p5",
    text:
      "Un buen amigo no mete presión de más. “No cojas lucha” significa que no te estreses. Si el plan no se puede hacer hoy, puedes decir: “No puedo hoy” o “Déjalo pa’ mañana.” Otra alternativa suave es: “¿Y si mejor hacemos coro mañana?”",
    translation:
      "A good friend does not add pressure. Don’t stress means don’t worry about it. If the plan cannot happen today, you can say: I can’t today or leave it for tomorrow. Another soft alternative is: What if we hang out tomorrow instead?",
    highlights: highlights(["No cojas lucha", "No puedo hoy", "Déjalo pa’ mañana", "Pa’", "¿Y si mejor…?", "Hacer coro"]),
    shadowLine: "No cojas lucha. Déjalo pa’ mañana.",
  },
  {
    id: "p6",
    text:
      "Al final del plan, las frases pequeñas de tiempo importan mucho. “Ahorita te digo” deja la respuesta abierta. “Espérame un chin” pide un poquito de paciencia. “Voy llegando” le dice a la otra persona que ya estás cerca. Esas frases hacen que la conversación suene humana, local y relajada.",
    translation:
      "At the end of the plan, small timing phrases matter. I’ll tell you in a bit keeps the answer open. Wait for me a little bit asks for a little patience. I’m almost there tells the other person you are nearly arriving. These phrases make the conversation sound human, local, and relaxed.",
    highlights: highlights(["Ahorita te digo", "Espérame un chin", "Un chin", "Voy llegando"]),
    shadowLine: "Espérame un chin. Voy llegando.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "dominican-b1-plans-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Making casual plans in Dominican Spanish", "Formal Dominican business writing", "Ordering hotel room service", "Talking about historical dates"],
    correctAnswer: "Making casual plans in Dominican Spanish",
    explanation: "The reading explains greetings, invitations, accepting, rescheduling, and timing phrases.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "dominican-b1-plans-reading-q2",
    type: "multiple-choice",
    prompt: "What does “¿Tamo activo pa’ hacer coro?” ask?",
    options: ["Are we on to hang out?", "Are we studying grammar?", "Are we buying clothes?", "Are we leaving the country?"],
    correctAnswer: "Are we on to hang out?",
    explanation: "Tamo activo asks if the plan is on, and hacer coro means to hang out.",
    points: 1,
    skillTag: "invitation",
  },
  {
    id: "dominican-b1-plans-reading-q3",
    type: "true-false",
    prompt: "True or false: “vaina” can change meaning depending on context.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading says vaina can mean thing, situation, stuff, or problem.",
    points: 1,
    skillTag: "meaning",
  },
  {
    id: "dominican-b1-plans-reading-q4",
    type: "order-words",
    prompt: "Order the reassurance phrase.",
    nativePrompt: "Don’t stress.",
    wordBank: ["No", "cojas", "lucha"],
    correctAnswer: "No cojas lucha",
    explanation: "This is the Dominican reassurance phrase from the reading.",
    points: 1,
    skillTag: "reassurance",
  },
  {
    id: "dominican-b1-plans-reading-q5",
    type: "fill-blank",
    prompt: "Complete: Espérame un ______.",
    nativePrompt: "Wait for me a little bit.",
    correctAnswer: "chin",
    explanation: "Un chin means a little bit.",
    points: 1,
    skillTag: "timing",
  },
];

export const dominicanSpanishB1PlansInvitationsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Dominican B1 Reading: ¿Tamo activo pa’ hacer coro?",
  subtitle: "A reading about Dominican friend plans, spoken reductions, soft rescheduling, and arrival updates.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "reading", "plans", "invitations"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
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
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the Dominican B1 plans and invitations vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [plansVocab.slice(0, 6), plansVocab.slice(6, 12), plansVocab.slice(12, 18), plansVocab.slice(18, 24), plansVocab.slice(24)];

export const dominicanSpanishB1PlansInvitationsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Dominican Spanish B1: Plans & Invitations Quiz",
  subtitle: "Practice choosing Dominican phrases for greetings, invitations, accepting, rescheduling, location sharing, and reassurance.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "quiz", "plans", "invitations"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Use this after the Dominican Spanish B1 speaking lesson and surrounding activities to test plan-making phrases in context.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "dominican-b1-plans-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is a very informal Dominican way to say “What’s up?”",
        options: ["¿Qué lo qué?", "Mucho gusto", "Con permiso", "Buenas tardes, señor"],
        correctAnswer: "¿Qué lo qué?",
        explanation: "¿Qué lo qué? is a Dominican informal greeting.",
        points: 1,
        skillTag: "greeting",
      },
      {
        id: "dominican-b1-plans-quiz-2",
        type: "multiple-choice",
        prompt: "You want to ask if the hangout is still on. Which phrase fits?",
        options: ["¿Tamo activo?", "Se me complicó", "No puedo hoy", "Un chin"],
        correctAnswer: "¿Tamo activo?",
        explanation: "¿Tamo activo? asks if the plan is on or if everyone is ready.",
        points: 1,
        skillTag: "invitation",
      },
      {
        id: "dominican-b1-plans-quiz-3",
        type: "fill-blank",
        prompt: "Complete: De una, me ______.",
        nativePrompt: "For sure, I’m in.",
        correctAnswer: "apunto",
        explanation: "Me apunto means I’m in.",
        points: 1,
        skillTag: "accepting",
      },
      {
        id: "dominican-b1-plans-quiz-4",
        type: "order-words",
        prompt: "Order the phrase.",
        nativePrompt: "Hit me up on WhatsApp.",
        wordBank: ["Tírame", "por", "WhatsApp"],
        correctAnswer: "Tírame por WhatsApp",
        explanation: "This is a direct coordination phrase.",
        points: 1,
        skillTag: "coordination",
      },
      {
        id: "dominican-b1-plans-quiz-5",
        type: "multiple-choice",
        prompt: "Something came up and you can’t today. Which phrase fits best?",
        options: ["Se me complicó una vaina", "Tá jevi", "Voy llegando", "Me apunto"],
        correctAnswer: "Se me complicó una vaina",
        explanation: "This means something came up or got complicated.",
        points: 1,
        skillTag: "problem",
      },
      {
        id: "dominican-b1-plans-quiz-6",
        type: "true-false",
        prompt: "True or false: “pa’” is a spoken shortening of “para.”",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Pa’ is a common spoken shortening of para.",
        points: 1,
        skillTag: "reduction",
      },
      {
        id: "dominican-b1-plans-quiz-7",
        type: "order-words",
        prompt: "Order the reschedule phrase.",
        nativePrompt: "Leave it for tomorrow.",
        wordBank: ["Déjalo", "pa’", "mañana"],
        correctAnswer: "Déjalo pa’ mañana",
        explanation: "This softly moves the plan to tomorrow.",
        points: 1,
        skillTag: "reschedule",
      },
      {
        id: "dominican-b1-plans-quiz-8",
        type: "multiple-choice",
        prompt: "Which phrase asks for a little patience?",
        options: ["Espérame un chin", "Cae por aquí", "El coro", "Dime a ve’"],
        correctAnswer: "Espérame un chin",
        explanation: "Un chin means a little bit.",
        points: 1,
        skillTag: "timing",
      },
      {
        id: "dominican-b1-plans-quiz-9",
        type: "fill-blank",
        prompt: "Complete: Mándame tu ______.",
        nativePrompt: "Send me your location.",
        correctAnswer: "ubicación",
        explanation: "Mándame tu ubicación means send me your location.",
        points: 1,
        skillTag: "location",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`dominican-b1-plans-match-${index + 1}`, `Match Dominican plans and invitations phrases set ${index + 1}.`, chunk),
      ),
    ],
  },
};
