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

const argentinianStorytellingVocab: VocabItem[] = [
  { id: "che", term: "che", meaning: "hey / mate / used to get someone’s attention", matchingMeaning: "hey / mate / attention-getter", note: "Very common Argentine opener or attention marker.", example: "Che, ¿te cuento lo que pasó?", translation: "Hey, should I tell you what happened?", starred: true },
  { id: "mira", term: "mirá", meaning: "look / listen / so, listen…", matchingMeaning: "listen / so, look…", note: "Voseo imperative; great for starting a story.", example: "Mirá, fue todo medio raro.", translation: "Listen, it was all kind of weird.", starred: true },
  { id: "posta", term: "posta", meaning: "seriously / for real", note: "Adds sincerity or surprise.", example: "Posta, no lo podía creer.", translation: "Seriously, I couldn’t believe it.", starred: true },
  { id: "re", term: "re", meaning: "very / really / super", matchingMeaning: "very / super", note: "Argentine intensifier before adjectives.", example: "El lugar era re lindo.", translation: "The place was really nice.", starred: true },
  { id: "re-copado", term: "re copado", meaning: "really cool / really nice", matchingMeaning: "really cool / very good vibes", note: "Positive Argentine reaction.", example: "El grupo era re copado.", translation: "The group was really cool.", starred: true },
  { id: "copado", term: "copado", meaning: "cool / nice / good vibes", matchingMeaning: "cool / nice", note: "Describes a person, plan, place, or vibe.", example: "El plan estaba copado.", translation: "The plan was cool.", starred: true },
  { id: "laburo", term: "laburo", meaning: "work / job", note: "Informal Argentine word for work.", example: "Salí tarde del laburo.", translation: "I left work late.", starred: true },
  { id: "quilombo", term: "quilombo", meaning: "mess / chaos / complicated situation", matchingMeaning: "chaos / messy situation", note: "Very common but informal; use for a chaotic situation.", example: "El tránsito era un quilombo.", translation: "The traffic was chaos.", starred: true },
  { id: "un-quilombo", term: "un quilombo", meaning: "a mess / a total chaos", matchingMeaning: "a total mess", note: "Noun phrase for a chaotic event or place.", example: "La entrada era un quilombo.", translation: "The entrance was a total mess.", starred: true },
  { id: "que-bajon", term: "qué bajón", meaning: "what a shame / that sucks", matchingMeaning: "that sucks / what a shame", note: "Sympathetic reaction to bad news.", example: "Qué bajón, llegaste re tarde.", translation: "That sucks, you arrived really late.", starred: true },
  { id: "bajon", term: "bajón", meaning: "letdown / bad situation / disappointment", matchingMeaning: "letdown / disappointment", note: "Can describe the bad situation itself.", example: "Fue un bajón perder el tren.", translation: "Missing the train was a letdown.", starred: true },
  { id: "dale", term: "dale", meaning: "okay / go ahead / come on / sure", matchingMeaning: "okay / sure / come on", note: "Extremely useful Argentine response; tone changes meaning.", example: "Dale, contame.", translation: "Okay, tell me.", starred: true },
  { id: "de-una", term: "de una", meaning: "definitely / for sure / right away", matchingMeaning: "for sure / right away", note: "Agreement or immediacy.", example: "De una, te llamo al toque.", translation: "For sure, I’ll call you right away.", starred: true },
  { id: "al-toque", term: "al toque", meaning: "right away / immediately", note: "Common for fast action.", example: "Llegué al toque.", translation: "I arrived right away.", starred: true },
  { id: "un-toque", term: "un toque", meaning: "a little bit / one moment", note: "Useful for asking for a second or softening.", example: "Esperá un toque.", translation: "Wait a second.", starred: true },
  { id: "bancame-un-toque", term: "bancame un toque", meaning: "give me a second / wait for me a moment", note: "Very Argentine; bancar here means wait/support.", example: "Bancame un toque y te explico.", translation: "Give me a second and I’ll explain.", starred: true },
  { id: "cuestion-que", term: "cuestión que", meaning: "so basically / long story short", note: "Storytelling connector.", example: "Cuestión que terminé entrando igual.", translation: "Long story short, I ended up going in anyway.", starred: true },
  { id: "encima", term: "encima", meaning: "on top of that / besides that", note: "Adds another problem or detail.", example: "Encima empezó a llover.", translation: "On top of that, it started raining.", starred: true },
  { id: "viste", term: "viste", meaning: "you know / right?", note: "Argentine discourse marker for shared understanding.", example: "Era raro, viste.", translation: "It was weird, you know.", starred: true },
  { id: "me-mato", term: "me mató", meaning: "it killed me / it cracked me up / it shocked me", matchingMeaning: "it cracked me up / shocked me", note: "Can mean funny, intense, or surprising depending on context.", example: "Me contaron la historia y me mató.", translation: "They told me the story and it cracked me up.", starred: true },
  { id: "una-banda", term: "una banda", meaning: "a lot / loads", note: "Very common informal quantity phrase.", example: "Había una banda de gente.", translation: "There were loads of people.", starred: true },
  { id: "medio-raro", term: "medio raro", meaning: "kind of weird", note: "Medio softens adjectives.", example: "El ambiente estaba medio raro.", translation: "The vibe was kind of weird.", starred: true },
  { id: "no-daba", term: "no daba", meaning: "it didn’t feel right / it wasn’t appropriate", note: "Judgment phrase for something that felt off.", example: "Quedarme no daba.", translation: "Staying didn’t feel right.", starred: true },
  { id: "tranqui", term: "tranqui", meaning: "calm / relaxed / no worries", matchingMeaning: "relaxed / no worries", note: "Short for tranquilo/tranquila; very common.", example: "Tranqui, después te cuento.", translation: "No worries, I’ll tell you later.", starred: true },
  { id: "todo-tranqui", term: "todo tranqui", meaning: "everything’s fine / all good", note: "Reassuring phrase.", example: "Todo tranqui, porque llegué igual.", translation: "All good, because I arrived anyway.", starred: true },
  { id: "me-quede-re-colgado", term: "me quedé re colgado", meaning: "I got totally stuck / distracted / left hanging", note: "Useful for storytelling when you froze, got distracted, or were left waiting.", example: "Me quedé re colgado en la estación.", translation: "I got totally stuck at the station.", starred: true },
  { id: "colgado", term: "colgado", meaning: "distracted / spaced out / stuck", matchingMeaning: "spaced out / distracted", note: "Can describe a person or situation.", example: "Estaba colgado mirando el celular.", translation: "I was spaced out looking at my phone.", starred: true },
  { id: "boludo", term: "boludo", meaning: "dude / mate, but risky; can also mean idiot depending on tone", matchingMeaning: "dude / risky informal mate", note: "Very common in Argentina but register-sensitive. Avoid with strangers.", example: "Boludo, no sabés lo que pasó.", translation: "Dude, you don’t know what happened.", starred: true },
  { id: "sali-del-laburo", term: "salí del laburo", meaning: "I left work", note: "Useful story setup.", example: "Salí del laburo y fui al recital.", translation: "I left work and went to the gig.", starred: true },
  { id: "llegue-al-toque", term: "llegué al toque", meaning: "I arrived right away", note: "Past-tense arrival phrase.", example: "Tomé un taxi y llegué al toque.", translation: "I took a taxi and arrived right away.", starred: true },
  { id: "te-llamo-al-toque", term: "te llamo al toque", meaning: "I’ll call you right away", note: "Useful promise or update.", example: "De una, te llamo al toque.", translation: "For sure, I’ll call you right away.", starred: true },
  { id: "habia-una-banda", term: "había una banda de gente", meaning: "there were loads of people", note: "Natural crowd description.", example: "En la puerta había una banda de gente.", translation: "At the door there were loads of people.", starred: true },
  { id: "lugar-quilombo", term: "el lugar era un quilombo", meaning: "the place was a mess", note: "Place-description phrase.", example: "El lugar era un quilombo, pero divertido.", translation: "The place was a mess, but fun.", starred: true },
  { id: "transito-quilombo", term: "el tránsito era un quilombo", meaning: "the traffic was chaos", note: "Common reason for arriving late.", example: "Llegué tarde porque el tránsito era un quilombo.", translation: "I arrived late because the traffic was chaos.", starred: true },
  { id: "quedarme-no-daba", term: "quedarme no daba", meaning: "staying didn’t feel right", note: "Useful for explaining a decision.", example: "El ambiente cambió y quedarme no daba.", translation: "The vibe changed and staying didn’t feel right.", starred: true },
  { id: "historia-me-mato", term: "me contaron la historia y me mató", meaning: "they told me the story and it cracked me up", note: "Natural reaction to a story.", example: "Después me contaron la historia y me mató.", translation: "Afterwards they told me the story and it cracked me up.", starred: true },
  { id: "grupo-re-copado", term: "el grupo era re copado", meaning: "the group was really nice/cool", note: "Positive social description.", example: "No conocía a nadie, pero el grupo era re copado.", translation: "I didn’t know anyone, but the group was really cool.", starred: true },
  { id: "llegue-re-tarde", term: "llegué re tarde", meaning: "I arrived really late", note: "Common storytelling confession.", example: "Perdí el bondi y llegué re tarde.", translation: "I missed the bus and arrived really late.", starred: true },
  { id: "sali-tarde-laburo", term: "salí tarde del laburo", meaning: "I left work late", note: "Reason for delay.", example: "Salí tarde del laburo y encima llovía.", translation: "I left work late and on top of that it was raining.", starred: true },
  { id: "todo-tranqui-porque", term: "todo tranqui, porque…", meaning: "all good / no worries, because…", note: "Reassuring setup before an explanation.", example: "Todo tranqui, porque el grupo me esperó.", translation: "All good, because the group waited for me.", starred: true },
  { id: "che-mira", term: "Che, mirá…", meaning: "Hey, listen… / So, look…", matchingMeaning: "Hey, listen…", note: "Strong Argentine story opener.", example: "Che, mirá… fue una noche rarísima.", translation: "Hey, listen… it was a super weird night.", starred: true },
  { id: "posta-que-bajon", term: "Posta, qué bajón…", meaning: "Seriously, that sucks…", note: "Empathetic reaction.", example: "Posta, qué bajón… nadie te avisó.", translation: "Seriously, that sucks… nobody told you.", starred: true },
  { id: "mira-encima", term: "Mirá, encima…", meaning: "Listen, on top of that…", note: "Adds a new twist to the story.", example: "Mirá, encima el tren no pasaba.", translation: "Listen, on top of that the train wasn’t coming.", starred: true },
  { id: "cuestion-que-full", term: "Cuestión que…", meaning: "So basically… / Long story short…", matchingMeaning: "Long story short…", note: "Classic Argentine story transition.", example: "Cuestión que terminé caminando.", translation: "Long story short, I ended up walking.", starred: true },
];

const highlightMap = Object.fromEntries(
  argentinianStorytellingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]),
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
    acceptedAnswers: [item.meaning.split("/")[0].trim()],
    languageFrom: "spanish",
    languageTo: "english",
    difficulty: item.starred ? "hard" : "medium",
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
    prompt,
    targetAnswer,
    acceptedAnswers,
    hints,
    explanation,
    wordBreakdown,
  };
}

export const argentinianSpanishB2NaturalStorytellingFlashcardDeck: FlashcardDeck = {
  id: "argentinian-spanish-b2-natural-storytelling-local-flavour-flashcards",
  title: "Argentinian Spanish B2: Natural Storytelling Flashcards",
  subtitle: "Local Argentinian chunks for telling chaotic, funny, and natural personal stories.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "flashcards", "storytelling", "local flavour"],
  estimatedMinutes: 18,
  skoolSectionName: "Argentinian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "argentinian-spanish-b2-natural-storytelling-local-flavour",
  activityType: "flashcards",
  data: {
    cards: argentinianStorytellingVocab.map(cardFromVocab),
  },
};

const sentenceVocab = argentinianStorytellingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB2NaturalStorytellingSentenceBuilder: SentenceBuilderLesson = {
  id: "argentinian-spanish-b2-natural-storytelling-local-flavour-sentence-builder",
  title: "B2 Sentence Builder: Argentinian Natural Storytelling",
  subtitle: "Build local Argentinian Spanish sentences for telling a story with delays, chaos, reactions, and a punchline.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "sentence-builder", "storytelling", "local speech"],
  estimatedMinutes: 18,
  skoolSectionName: "Argentinian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "argentinian-spanish-b2-natural-storytelling-local-flavour",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Write or say a 90-second Argentinian-style story about leaving work late, hitting chaos, reacting naturally, and explaining why you decided to leave.",
    stages: [
      stage(
        "stage-1",
        "Open the story",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "Hey, listen… seriously, it was really weird.",
        "Che, mirá… posta, fue re raro.",
        "Che and mirá pull the listener in. Posta adds sincerity, and re intensifies the adjective.",
        breakdown([["Hey, listen…", "Che, mirá…"], ["seriously", "posta"], ["really", "re"], ["weird", "raro"]]),
      ),
      stage(
        "stage-2",
        "Set up work and chaos",
        sentenceVocab.slice(6, 10),
        sentenceVocab.slice(0, 10),
        "I left work late and the traffic was chaos.",
        "Salí tarde del laburo y el tránsito era un quilombo.",
        "Laburo is informal work. Quilombo frames the situation as chaotic.",
        breakdown([["I left late", "Salí tarde"], ["from work", "del laburo"], ["the traffic", "el tránsito"], ["was chaos", "era un quilombo"]]),
      ),
      stage(
        "stage-3",
        "React naturally",
        sentenceVocab.slice(9, 14),
        sentenceVocab.slice(0, 14),
        "Seriously, that sucks, but for sure I’ll call you right away.",
        "Posta, qué bajón, pero de una te llamo al toque.",
        "Qué bajón reacts to a bad situation. De una and al toque make the response sound fast and natural.",
        breakdown([["Seriously", "Posta"], ["that sucks", "qué bajón"], ["for sure", "de una"], ["I’ll call you right away", "te llamo al toque"]]),
      ),
      stage(
        "stage-4",
        "Ask for a second",
        sentenceVocab.slice(14, 18),
        sentenceVocab.slice(0, 18),
        "Give me a second. Long story short, on top of that, there were loads of people.",
        "Bancame un toque. Cuestión que, encima, había una banda de gente.",
        "Bancame un toque buys time. Cuestión que moves the story forward.",
        breakdown([["Give me a second", "Bancame un toque"], ["Long story short", "Cuestión que"], ["on top of that", "encima"], ["there were loads of people", "había una banda de gente"]]),
      ),
      stage(
        "stage-5",
        "Add listener markers",
        sentenceVocab.slice(18, 23),
        sentenceVocab.slice(0, 23),
        "The place was kind of weird, you know, and the story cracked me up.",
        "El lugar estaba medio raro, viste, y la historia me mató.",
        "Viste keeps the listener with you. Me mató can mean it shocked you or cracked you up.",
        breakdown([["the place", "el lugar"], ["kind of weird", "medio raro"], ["you know", "viste"], ["it cracked me up", "me mató"]]),
      ),
      stage(
        "stage-6",
        "Explain a decision",
        sentenceVocab.slice(22, 28),
        sentenceVocab.slice(0, 28),
        "Staying didn’t feel right, so I stayed relaxed, but I got totally stuck.",
        "Quedarme no daba, así que tranqui, pero me quedé re colgado.",
        "No daba explains social judgment. Me quedé re colgado says you got stuck, distracted, or left hanging.",
        breakdown([["staying", "quedarme"], ["didn’t feel right", "no daba"], ["relaxed / no worries", "tranqui"], ["I got totally stuck", "me quedé re colgado"]]),
      ),
      stage(
        "stage-7",
        "Use careful register",
        sentenceVocab.slice(27, 33),
        sentenceVocab.slice(0, 33),
        "Dude, I left work and arrived right away, but the entrance was a total mess.",
        "Boludo, salí del laburo y llegué al toque, pero la entrada era un quilombo.",
        "Boludo is common with friends but risky. Use it only when the relationship and tone are safe.",
        breakdown([["Dude", "Boludo", "Only with friends; can be insulting."], ["I left work", "salí del laburo"], ["I arrived right away", "llegué al toque"], ["was a total mess", "era un quilombo"]]),
      ),
      stage(
        "stage-8",
        "Describe the group",
        sentenceVocab.slice(33, 38),
        sentenceVocab.slice(0, 38),
        "I arrived really late, but the group was really cool and they told me the story.",
        "Llegué re tarde, pero el grupo era re copado y me contaron la historia.",
        "Re tarde and re copado are natural Argentine intensifier patterns.",
        breakdown([["I arrived really late", "Llegué re tarde"], ["the group", "el grupo"], ["was really cool", "era re copado"], ["they told me the story", "me contaron la historia"]]),
      ),
      stage(
        "stage-9",
        "Reassure and add cause",
        sentenceVocab.slice(38, 41),
        sentenceVocab.slice(0, 41),
        "All good, because I left work late, but they waited for me.",
        "Todo tranqui, porque salí tarde del laburo, pero me esperaron.",
        "Todo tranqui, porque… reassures the listener before giving the explanation.",
        breakdown([["all good, because", "todo tranqui, porque"], ["I left work late", "salí tarde del laburo"], ["they waited for me", "me esperaron"]]),
      ),
      stage(
        "stage-10",
        "Tell the full mini-story",
        sentenceVocab.slice(40),
        sentenceVocab,
        "Hey, listen. Long story short, I left work late, the traffic was chaos, on top of that there were loads of people, and staying didn’t feel right.",
        "Che, mirá. Cuestión que salí tarde del laburo, el tránsito era un quilombo, encima había una banda de gente y quedarme no daba.",
        "This combines opener, story connector, cause, chaos, extra complication, and decision.",
        breakdown([["Hey, listen", "Che, mirá"], ["Long story short", "Cuestión que"], ["I left work late", "salí tarde del laburo"], ["the traffic was chaos", "el tránsito era un quilombo"], ["on top of that", "encima"], ["there were loads of people", "había una banda de gente"], ["staying didn’t feel right", "quedarme no daba"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/argentinian-spanish-b2-natural-storytelling-local-flavour/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "argentinian-b2-storytelling-story-q1",
    type: "multiple-choice",
    prompt: "Why did Nico arrive late?",
    options: ["He left work late and traffic was chaos", "He forgot the address", "He was buying tickets", "He went to the wrong city"],
    correctAnswer: "He left work late and traffic was chaos",
    explanation: "Nico says salí tarde del laburo and el tránsito era un quilombo before arriving late.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "argentinian-b2-storytelling-story-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'Hey, listen… seriously, that sucks'.",
    nativePrompt: "Hey, listen… seriously, that sucks.",
    wordBank: ["Che,", "mirá…", "posta,", "qué", "bajón."],
    correctAnswer: "Che, mirá… posta, qué bajón.",
    explanation: "This combines the local opener with a natural reaction.",
    points: 1,
    skillTag: "reaction",
  },
  {
    id: "argentinian-b2-storytelling-story-q3",
    type: "multiple-choice",
    prompt: "What made the place feel chaotic?",
    options: ["There were loads of people and the place was a mess", "The music was too quiet", "Nobody wanted to talk", "The group cancelled"],
    correctAnswer: "There were loads of people and the place was a mess",
    explanation: "The story says había una banda de gente and el lugar era un quilombo.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "argentinian-b2-storytelling-story-q4",
    type: "order-words",
    prompt: "Order the phrase meaning 'staying didn’t feel right'.",
    nativePrompt: "Staying didn’t feel right.",
    wordBank: ["Quedarme", "no", "daba."],
    correctAnswer: "Quedarme no daba.",
    explanation: "No daba is a very useful judgment phrase when something feels inappropriate or off.",
    points: 1,
    skillTag: "decision",
  },
];

export const argentinianSpanishB2NaturalStorytellingWhatsAppStory: WhatsAppStory = {
  id: "argentinian-spanish-b2-natural-storytelling-local-flavour",
  title: "Argentinian B2 Story: Che, Mirá… Fue un Quilombo",
  subtitle: "A WhatsApp-style story about leaving work late, hitting chaos, and telling it naturally in Argentinian Spanish.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "WhatsApp", "storytelling", "local flavour"],
  estimatedMinutes: 20,
  skoolSectionName: "Argentinian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "argentinian-spanish-b2-natural-storytelling-local-flavour-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "nico", name: "Nico", initials: "N", side: "right", color: "blue" },
      { id: "luli", name: "Luli", initials: "L", side: "left", color: "green" },
      { id: "tomi", name: "Tomi", initials: "T", side: "left", color: "violet" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Nico is telling friends why a simple after-work plan turned into chaos.", "Guide: Nico is telling friends why a simple after-work plan turned into chaos.", [], "narrator"),
      message("m1", "nico", "Che, mirá… tengo una historia re rara del viernes.", "Hey, listen… I’ve got a really weird story from Friday.", ["Che, mirá…", "che", "mirá", "re"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m1.mp3"),
      message("m2", "luli", "Dale, contá. ¿Fue copado o fue un quilombo?", "Okay, tell us. Was it cool or was it a mess?", ["dale", "copado", "un quilombo"]),
      message("m3", "nico", "Salí tarde del laburo y el tránsito era un quilombo.", "I left work late and the traffic was chaos.", ["salí tarde del laburo", "laburo", "el tránsito era un quilombo", "quilombo"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m3.mp3"),
      message("m4", "tomi", "Posta, qué bajón… encima era viernes.", "Seriously, that sucks… on top of that it was Friday.", ["Posta, qué bajón…", "posta", "qué bajón", "encima"]),
      message("m5", "nico", "Sí, boludo, llegué re tarde, pero todo tranqui porque el grupo era re copado.", "Yeah, dude, I arrived really late, but all good because the group was really cool.", ["boludo", "llegué re tarde", "todo tranqui, porque…", "todo tranqui", "el grupo era re copado", "re copado"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m5.mp3"),
      message("m6", "luli", "Bueno, si el grupo era copado, zafaste.", "Well, if the group was cool, you got away with it.", ["copado"]),
      message("m7", "nico", "Mirá, encima había una banda de gente y el lugar era un quilombo.", "Listen, on top of that there were loads of people and the place was a mess.", ["Mirá, encima…", "había una banda de gente", "una banda", "el lugar era un quilombo"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m7.mp3"),
      message("m8", "tomi", "Qué bajón. Ahí yo me quedo re colgado y no sé qué hacer.", "That sucks. In that moment I get totally stuck and don’t know what to do.", ["bajón", "me quedé re colgado", "colgado"]),
      message("m9", "nico", "Tal cual. Me quedé re colgado en la puerta, medio raro todo, viste.", "Exactly. I got totally stuck at the door; everything was kind of weird, you know.", ["me quedé re colgado", "medio raro", "viste"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m9.mp3"),
      message("m10", "luli", "¿Y te quedaste igual?", "And did you stay anyway?", []),
      message("m11", "nico", "No, quedarme no daba. Bancame un toque que falta la mejor parte.", "No, staying didn’t feel right. Give me a second because the best part is coming.", ["quedarme no daba", "no daba", "bancame un toque", "un toque"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m11.mp3"),
      message("m12", "tomi", "Dale, dale. Te bancamos.", "Okay, okay. We’re waiting.", ["dale"]),
      message("m13", "nico", "Cuestión que salgo, camino dos cuadras, y me llaman: “che, volvé”.", "Long story short, I leave, walk two blocks, and they call me: “hey, come back.”", ["Cuestión que…", "cuestión que", "che"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m13.mp3"),
      message("m14", "luli", "¿Por qué? ¿Pasó algo?", "Why? Did something happen?", []),
      message("m15", "nico", "Me contaron la historia y me mató: la supuesta fila era para otro evento.", "They told me the story and it cracked me up: the supposed line was for another event.", ["me contaron la historia y me mató", "me mató"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m15.mp3"),
      message("m16", "tomi", "Jajaja, posta, eso es re de película.", "Haha, seriously, that’s straight out of a movie.", ["posta", "re"]),
      message("m17", "nico", "Al final llegué al toque a la puerta correcta y fue re copado.", "In the end I arrived right away at the right door and it was really cool.", ["llegué al toque", "al toque", "re copado"], "voice-note", "/audio/stories/argentinian-spanish-b2-natural-storytelling-local-flavour/m17.mp3"),
      message("m18", "luli", "De una. La próxima te llamo al toque si veo un quilombo así.", "For sure. Next time I’ll call you right away if I see chaos like that.", ["de una", "te llamo al toque", "quilombo"]),
      message("m19", "nico", "Tranqui, ya aprendí: si el plan está medio raro, pregunto antes de colgarme.", "No worries, I learned: if the plan is kind of weird, I ask before getting stuck.", ["tranqui", "medio raro", "colgado"]),
    ],
    comprehensionChecks: [
      { id: "argentinian-b2-storytelling-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "argentinian-b2-storytelling-check-2", afterMessageId: "m4", question: storyQuestions[1] },
      { id: "argentinian-b2-storytelling-check-3", afterMessageId: "m7", question: storyQuestions[2] },
      { id: "argentinian-b2-storytelling-check-4", afterMessageId: "m11", question: storyQuestions[3] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: argentinianStorytellingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: argentinianStorytellingVocab.map((item) => item.term),
      grammarPatterns: ["Argentinian voseo imperative: mirá, contá, bancame.", "Story connector: cuestión que + past event.", "Intensifier: re + adjective/adverb.", "Decision judgment: no daba / quedarme no daba."],
      speakingPrompts: ["Tell a story that starts with Che, mirá…", "Explain why you arrived late using laburo and quilombo.", "React to bad news with qué bajón and posta.", "Explain why staying didn’t feel right using no daba."],
    },
    completionTask: {
      title: "Your Argentinian voice-note story",
      instructions: "Record a 90-second story about a messy plan. Use at least ten local chunks, include one reaction, one delay, one twist, and one decision.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Che, mirá… el viernes salí tarde del laburo y pensé que igual iba a llegar al toque. Posta, me equivoqué feo. El tránsito era un quilombo, había una banda de gente por todos lados y yo ya venía medio colgado mirando el celular.",
    translation:
      "Hey, listen… on Friday I left work late and thought I was still going to arrive right away. Seriously, I was very wrong. Traffic was chaos, there were loads of people everywhere, and I was already kind of spaced out looking at my phone.",
    highlights: highlights(["Che, mirá…", "salí tarde del laburo", "laburo", "llegué al toque", "posta", "el tránsito era un quilombo", "quilombo", "había una banda de gente", "una banda", "colgado"]),
    shadowLine: "Che, mirá… salí tarde del laburo y el tránsito era un quilombo.",
  },
  {
    id: "p2",
    text:
      "Cuando llegué, la puerta del bar era un quilombo. Encima, la fila parecía eterna. Le escribí a Tomi: “Posta, qué bajón… llegué re tarde”. Él me respondió: “Tranqui, bancame un toque, te llamo al toque”.",
    translation:
      "When I arrived, the bar entrance was a mess. On top of that, the line looked endless. I wrote to Tomi: “Seriously, that sucks… I arrived really late.” He answered: “No worries, give me a second, I’ll call you right away.”",
    highlights: highlights(["un quilombo", "encima", "Posta, qué bajón…", "qué bajón", "llegué re tarde", "tranqui", "bancame un toque", "un toque", "te llamo al toque"]),
    shadowLine: "Posta, qué bajón… bancame un toque, te llamo al toque.",
  },
  {
    id: "p3",
    text:
      "Cuestión que me quedé re colgado en la vereda. El ambiente estaba medio raro, viste. Había gente discutiendo, otros entrando por otra puerta y nadie sabía bien qué pasaba. Quedarme no daba, pero irme también era un bajón.",
    translation:
      "Long story short, I got totally stuck on the sidewalk. The vibe was kind of weird, you know. People were arguing, others were going in through another door, and nobody really knew what was happening. Staying didn’t feel right, but leaving was also a letdown.",
    highlights: highlights(["Cuestión que…", "cuestión que", "me quedé re colgado", "medio raro", "viste", "quedarme no daba", "no daba", "bajón"]),
    shadowLine: "Cuestión que me quedé re colgado y quedarme no daba.",
  },
  {
    id: "p4",
    text:
      "Después apareció Luli y me dijo: “Dale, boludo, era por la otra entrada”. Ojo: boludo ahí sonó de confianza, no como insulto. Entramos de una y el grupo era re copado. En dos minutos ya estaba todo tranqui.",
    translation:
      "Then Luli showed up and said: “Come on, dude, it was through the other entrance.” Careful: boludo there sounded friendly, not like an insult. We went in right away and the group was really cool. In two minutes everything was fine.",
    highlights: highlights(["dale", "boludo", "de una", "el grupo era re copado", "re copado", "copado", "todo tranqui"]),
    shadowLine: "Dale, boludo, entramos de una y el grupo era re copado.",
  },
  {
    id: "p5",
    text:
      "Lo mejor fue el final. Me contaron la historia y me mató: la fila gigante era para una charla de marketing, no para el bar. Mirá, encima yo casi me iba por esa confusión. Al final fue re copado, pero empezó como un quilombo total.",
    translation:
      "The best part was the ending. They told me the story and it cracked me up: the huge line was for a marketing talk, not for the bar. Listen, on top of that I almost left because of that confusion. In the end it was really cool, but it started as total chaos.",
    highlights: highlights(["me contaron la historia y me mató", "me mató", "Mirá, encima…", "re copado", "quilombo"]),
    shadowLine: "Me contaron la historia y me mató.",
  },
  {
    id: "p6",
    text:
      "Por eso estas frases sirven tanto para contar historias: che y mirá abren la escena; cuestión que organiza el relato; encima agrega presión; qué bajón muestra empatía; y no daba explica una decisión sin sonar demasiado formal.",
    translation:
      "That’s why these phrases are so useful for storytelling: che and mirá open the scene; cuestión que organizes the story; encima adds pressure; qué bajón shows empathy; and no daba explains a decision without sounding too formal.",
    highlights: highlights(["che", "mirá", "cuestión que", "encima", "qué bajón", "no daba"]),
    shadowLine: "Cuestión que no daba, viste.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "argentinian-b2-storytelling-reading-q1",
    type: "multiple-choice",
    prompt: "What caused the first problem in the reading?",
    options: ["He left work late and traffic was chaotic", "The bar was closed", "His friends cancelled", "He lost his phone"],
    correctAnswer: "He left work late and traffic was chaotic",
    explanation: "The reading starts with salí tarde del laburo and el tránsito era un quilombo.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "argentinian-b2-storytelling-reading-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'give me a second, I’ll call you right away'.",
    nativePrompt: "Give me a second, I’ll call you right away.",
    wordBank: ["Bancame", "un", "toque,", "te", "llamo", "al", "toque."],
    correctAnswer: "Bancame un toque, te llamo al toque.",
    explanation: "Un toque means a moment, while al toque means right away.",
    points: 1,
    skillTag: "timing",
  },
  {
    id: "argentinian-b2-storytelling-reading-q3",
    type: "multiple-choice",
    prompt: "Why does the reading warn about boludo?",
    options: ["It can be friendly or insulting depending on tone", "It is always formal", "It only means traffic", "It is never used in Argentina"],
    correctAnswer: "It can be friendly or insulting depending on tone",
    explanation: "The reading says boludo sounded friendly there, not like an insult.",
    points: 1,
    skillTag: "register",
  },
  {
    id: "argentinian-b2-storytelling-reading-q4",
    type: "order-words",
    prompt: "Order the phrase meaning 'they told me the story and it cracked me up'.",
    nativePrompt: "They told me the story and it cracked me up.",
    wordBank: ["Me", "contaron", "la", "historia", "y", "me", "mató."],
    correctAnswer: "Me contaron la historia y me mató.",
    explanation: "Me mató is a natural reaction when something surprises you or cracks you up.",
    points: 1,
    skillTag: "reaction",
  },
  {
    id: "argentinian-b2-storytelling-reading-q5",
    type: "multiple-choice",
    prompt: "What does cuestión que do in a story?",
    options: ["It moves the story forward like 'long story short'", "It says goodbye", "It asks for a price", "It makes the sentence formal"],
    correctAnswer: "It moves the story forward like 'long story short'",
    explanation: "The reading explains that cuestión que organizes the story.",
    points: 1,
    skillTag: "storytelling",
  },
];

export const argentinianSpanishB2NaturalStorytellingReading: ReadingComprehension = {
  id: "argentinian-spanish-b2-reading-natural-storytelling-local-flavour",
  title: "Argentinian B2 Reading: La Fila Era Otro Quilombo",
  subtitle: "A long first-person story using Argentinian local storytelling chunks, reactions, register, and pacing.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "reading", "storytelling", "local flavour"],
  estimatedMinutes: 16,
  skoolSectionName: "Argentinian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "argentinian-spanish-b2-natural-storytelling-local-flavour-flashcards",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/argentinian-spanish-b2-reading-natural-storytelling-local-flavour/full.mp3",
    paragraphs: readingParagraphs,
    glossary: argentinianStorytellingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })),
    explanation: "These phrases come directly from the Argentinian B2 natural storytelling speaking lesson.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

export const argentinianSpanishB2NaturalStorytellingQuiz: CheckpointQuiz = {
  id: "argentinian-spanish-b2-natural-storytelling-local-flavour-quiz",
  title: "Argentinian Spanish B2: Natural Storytelling Quiz",
  subtitle: "Check local Argentinian storytelling chunks for openers, chaos, reactions, timing, and register.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "quiz", "storytelling", "local flavour"],
  estimatedMinutes: 16,
  skoolSectionName: "Argentinian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "argentinian-spanish-b2-natural-storytelling-local-flavour-flashcards",
  activityType: "quiz",
  data: {
    description: "Practice the Argentinian B2 natural storytelling phrases from the speaking builder.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "argentinian-b2-storytelling-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is the strongest local story opener?",
        options: ["Che, mirá…", "Hasta luego", "Buenas tardes, señor", "Con permiso"],
        correctAnswer: "Che, mirá…",
        explanation: "Che, mirá… pulls the listener into an informal Argentine story.",
        points: 1,
        skillTag: "opener",
      },
      {
        id: "argentinian-b2-storytelling-quiz-2",
        type: "fill-blank",
        prompt: "Complete: El tránsito era un ______.",
        nativePrompt: "The traffic was chaos.",
        correctAnswer: "quilombo",
        explanation: "El tránsito era un quilombo means the traffic was chaos.",
        points: 1,
        skillTag: "chaos",
      },
      {
        id: "argentinian-b2-storytelling-quiz-3",
        type: "multiple-choice",
        prompt: "Which phrase means 'give me a second'?",
        options: ["bancame un toque", "de una", "al toque", "re copado"],
        correctAnswer: "bancame un toque",
        explanation: "Un toque is a moment; bancame un toque asks someone to wait briefly.",
        points: 1,
        skillTag: "timing",
      },
      {
        id: "argentinian-b2-storytelling-quiz-4",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "On top of that, there were loads of people.",
        wordBank: ["Encima", "había", "una", "banda", "de", "gente."],
        correctAnswer: "Encima había una banda de gente.",
        explanation: "Encima adds the extra complication, and una banda means loads.",
        points: 1,
        skillTag: "complication",
      },
      {
        id: "argentinian-b2-storytelling-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Long story short, staying didn’t feel right.",
        wordBank: ["Cuestión", "que", "quedarme", "no", "daba."],
        correctAnswer: "Cuestión que quedarme no daba.",
        explanation: "Cuestión que moves the story forward; no daba explains why staying felt off.",
        points: 2,
        skillTag: "decision",
      },
      {
        id: "argentinian-b2-storytelling-quiz-6",
        type: "multiple-choice",
        prompt: "What is the safest teaching note for boludo?",
        options: ["Use it only with safe, friendly context because tone matters", "Use it with every stranger", "It is formal office language", "It only means 'traffic'"],
        correctAnswer: "Use it only with safe, friendly context because tone matters",
        explanation: "Boludo can be friendly among friends but insulting in the wrong tone or relationship.",
        points: 1,
        skillTag: "register",
      },
      pairQuestion("argentinian-b2-storytelling-pairs-1", "Match Argentinian story openers and reactions.", argentinianStorytellingVocab.slice(0, 11)),
      pairQuestion("argentinian-b2-storytelling-pairs-2", "Match timing, connectors, and listener markers.", argentinianStorytellingVocab.slice(11, 22)),
      pairQuestion("argentinian-b2-storytelling-pairs-3", "Match decisions, delay, and chaos phrases.", argentinianStorytellingVocab.slice(22, 33)),
      pairQuestion("argentinian-b2-storytelling-pairs-4", "Match full storytelling chunks.", argentinianStorytellingVocab.slice(33)),
    ],
  },
};
