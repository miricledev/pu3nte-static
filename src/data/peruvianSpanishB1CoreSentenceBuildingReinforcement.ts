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

const peruvianCoreVocab: VocabItem[] = [
  { id: "habla-causa", term: "Habla, causa", meaning: "What’s up, mate? / Hey, bro", note: "Very informal Peruvian opener, best with friends.", example: "Habla, causa, ¿todo bacán?", translation: "What’s up, mate, everything good?", starred: true },
  { id: "causa", term: "causa", meaning: "mate / bro / friend", note: "Informal friend word, common in Peru.", example: "Mi causa viene al toque.", translation: "My mate is coming right away.", starred: true },
  { id: "oye", term: "oye", meaning: "hey / listen", note: "Casual attention-getter.", example: "Oye, pásame la voz si sales.", translation: "Hey, let me know if you leave.", starred: true },
  { id: "pata", term: "pata", meaning: "friend / mate", note: "Very informal friend word.", example: "Un pata me espera en la esquina.", translation: "A friend is waiting for me on the corner.", starred: true },
  { id: "mi-pata", term: "mi pata", meaning: "my friend / my mate", note: "Possessive form of pata.", example: "Voy al jato de mi pata.", translation: "I’m going to my friend’s place.", starred: true },
  { id: "bacan", term: "bacán", meaning: "cool / great", note: "Positive reaction, informal.", example: "Bacán, nos vemos luego.", translation: "Cool, see you later.", starred: true },
  { id: "todo-bacan", term: "todo bacán", meaning: "everything’s good / all cool", note: "Casual reassurance.", example: "Tranquilo, todo bacán.", translation: "Relax, everything’s good.", starred: true },
  { id: "al-toque", term: "al toque", meaning: "right away / immediately / very soon", note: "Very useful Peruvian timing phrase.", example: "Lo vemos al toque.", translation: "We’ll check it right away.", starred: true },
  { id: "vuelvo-al-toque", term: "vuelvo al toque", meaning: "I’ll be back right away", note: "Natural quick-exit phrase.", example: "Voy a comprar agua y vuelvo al toque.", translation: "I’m going to buy water and I’ll be back right away.", starred: true },
  { id: "la-chamba", term: "la chamba", meaning: "work / job", note: "Informal word for work.", example: "Hoy salgo tarde de la chamba.", translation: "Today I leave work late.", starred: true },
  { id: "chamba", term: "chamba", meaning: "work / job", note: "Base noun without article.", example: "Tengo chamba temprano.", translation: "I have work early.", starred: true },
  { id: "estar-full", term: "estar full", meaning: "to be really busy / packed with things to do", note: "Informal phrase with English full.", example: "Estar full no significa estar lleno de comida aquí.", translation: "To be full does not mean full from food here.", starred: true },
  { id: "estoy-full", term: "estoy full", meaning: "I’m really busy", note: "Common casual work/study excuse.", example: "Estoy full con la chamba.", translation: "I’m really busy with work.", starred: true },
  { id: "normal-nomas", term: "normal nomás", meaning: "it’s all good / no worries / fine, no problem", note: "Relaxed Peruvian reassurance.", example: "Si llegas tarde, normal nomás.", translation: "If you arrive late, no worries.", starred: true },
  { id: "manyas", term: "¿manyas?", meaning: "you know? / do you get me? / understand?", note: "Very informal check for understanding.", example: "La combi demora un montón, ¿manyas?", translation: "The van takes ages, you know?", starred: true },
  { id: "pucha", term: "pucha", meaning: "damn / oh no / wow / seriously?", note: "Soft informal reaction.", example: "Pucha, olvidé mi billetera.", translation: "Damn, I forgot my wallet.", starred: true },
  { id: "que-palta", term: "qué palta", meaning: "how embarrassing / that’s embarrassing", note: "Informal expression for embarrassment.", example: "Qué palta, llegué tardísimo.", translation: "How embarrassing, I arrived super late.", starred: true },
  { id: "la-combi", term: "la combi", meaning: "shared van / small local bus", note: "Common urban transport word in Peru.", example: "La combi demora un montón.", translation: "The shared van takes ages.", starred: true },
  { id: "latear", term: "latear", meaning: "to walk / go on foot", note: "Informal Peruvian verb.", example: "Prefiero latear hasta la plaza.", translation: "I prefer to walk to the square.", starred: true },
  { id: "voy-lateando", term: "voy lateando", meaning: "I’m walking / I’m going on foot", note: "Progressive form used as an update.", example: "Voy lateando porque no pasa la combi.", translation: "I’m walking because the van isn’t coming.", starred: true },
  { id: "ir-lateando", term: "ir lateando", meaning: "to go walking", note: "General phrase for going on foot.", example: "Podemos ir lateando si está cerca.", translation: "We can go walking if it’s nearby.", starred: true },
  { id: "pasame-la-voz", term: "pásame la voz", meaning: "let me know / give me a heads-up", note: "Very common informal coordination phrase.", example: "Pásame la voz cuando salgas.", translation: "Let me know when you leave.", starred: true },
  { id: "jamear", term: "jamear", meaning: "to eat", note: "Very informal; use with friends.", example: "Vamos a jamear algo cerca.", translation: "Let’s eat something nearby.", starred: true },
  { id: "jameamos", term: "jameamos", meaning: "we’ll eat / we eat", note: "Friendly plan phrase.", example: "Jameamos al toque cuando llegues.", translation: "We’ll eat right away when you arrive.", starred: true },
  { id: "no-hay-bronca", term: "no hay bronca", meaning: "no problem / no worries", note: "Informal reassurance.", example: "No hay bronca si vienes tarde.", translation: "No problem if you come late.", starred: true },
  { id: "hacer-la-taba", term: "hacer la taba", meaning: "to accompany someone / go with someone", note: "Informal Peruvian phrase; best with friends.", example: "Mi pata me hace la taba.", translation: "My friend goes with me.", starred: true },
  { id: "te-hago-la-taba", term: "te hago la taba", meaning: "I’ll go with you / I’ll keep you company", note: "Friendly offer to accompany someone.", example: "Si vas lateando, te hago la taba.", translation: "If you’re walking, I’ll go with you.", starred: true },
  { id: "de-repente", term: "de repente", meaning: "maybe / perhaps", note: "In Peru, often means maybe, not suddenly.", example: "De repente voy más tarde.", translation: "Maybe I’ll go later.", starred: true },
  { id: "jato", term: "jato", meaning: "house / place, depending on context", note: "Very informal word for house/place.", example: "Estoy en mi jato.", translation: "I’m at my place.", starred: true },
  { id: "mi-jato", term: "mi jato", meaning: "my place / my house", note: "Informal, among friends.", example: "Ven a mi jato después.", translation: "Come to my place later.", starred: true },
  { id: "al-jato-de-mi-pata", term: "al jato de mi pata", meaning: "to my friend’s place", note: "Full phrase for destination.", example: "Voy al jato de mi pata.", translation: "I’m going to my friend’s place.", starred: true },
  { id: "estar-misio-misia", term: "estar misio / misia", meaning: "to be broke", note: "Informal money phrase; misio masculine, misia feminine.", example: "Estar misio no ayuda cuando quieres salir.", translation: "Being broke does not help when you want to go out.", starred: true },
  { id: "estoy-misio", term: "estoy misio", meaning: "I’m broke, said by a male speaker", note: "Masculine form.", example: "Estoy misio, causa.", translation: "I’m broke, mate.", starred: true },
  { id: "estoy-misia", term: "estoy misia", meaning: "I’m broke, said by a female speaker", note: "Feminine form.", example: "Estoy misia, pero puedo latear.", translation: "I’m broke, but I can walk.", starred: true },
  { id: "me-quede-jato", term: "me quedé jato", meaning: "I fell asleep", note: "Informal phrase; can be embarrassing if you missed a plan.", example: "Qué palta, me quedé jato.", translation: "How embarrassing, I fell asleep.", starred: true },
  { id: "una-chela", term: "una chela", meaning: "a beer", note: "Informal word for beer.", example: "Compramos una chela para compartir.", translation: "We’ll buy a beer to share.", starred: true },
  { id: "demora-un-monton", term: "demora un montón", meaning: "it takes ages / it’s taking forever", note: "Common complaint about waiting.", example: "La combi demora un montón.", translation: "The van takes ages.", starred: true },
  { id: "pucha-la-combi-demora", term: "pucha, la combi demora un montón", meaning: "damn, the bus/van is taking forever", note: "Useful full transport complaint.", example: "Pucha, la combi demora un montón; voy lateando.", translation: "Damn, the van is taking forever; I’m walking.", starred: true },
  { id: "lo-vemos-al-toque", term: "lo vemos al toque", meaning: "we’ll sort it out soon / we’ll check it right away", note: "Practical problem-solving phrase.", example: "Llega y lo vemos al toque.", translation: "Arrive and we’ll check it right away.", starred: true },
  { id: "pasame-la-voz-si-sales", term: "pásame la voz si sales", meaning: "let me know if you leave", note: "Coordination phrase for plans.", example: "Pásame la voz si sales de la chamba.", translation: "Let me know if you leave work.", starred: true },
  { id: "no-hay-bronca-jameamos", term: "no hay bronca, jameamos al toque", meaning: "no problem, we’ll eat soon", note: "Relaxed response when timing is messy.", example: "No hay bronca, jameamos al toque cuando llegues.", translation: "No problem, we’ll eat soon when you arrive.", starred: true },
  { id: "de-repente-voy", term: "de repente voy…", meaning: "maybe I’ll go…", note: "Useful hesitant plan opener.", example: "De repente voy al jato de mi pata.", translation: "Maybe I’ll go to my friend’s place.", starred: true },
  { id: "que-palta-me-quede-jato", term: "qué palta, me quedé jato", meaning: "how embarrassing, I fell asleep", note: "Full apology/explanation chunk.", example: "Qué palta, me quedé jato y no respondí.", translation: "How embarrassing, I fell asleep and didn’t reply.", starred: true },
];

const highlightMap = Object.fromEntries(peruvianCoreVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
  acceptedAnswers: string[] = [],
): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers, hints, explanation, wordBreakdown };
}

export const peruvianSpanishB1CoreSentenceBuildingFlashcardDeck: FlashcardDeck = {
  id: "peruvian-spanish-b1-core-sentence-building-flashcards",
  title: "Peruvian Spanish B1: Core Sentence Building Flashcards",
  subtitle: "Peruvian everyday chunks for friends, work, transport, quick plans, eating, money, and informal reactions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "flashcards", "core sentence building", "local phrases"],
  estimatedMinutes: 18,
  skoolSectionName: "Peruvian Spanish - B1 Core Sentence Building",
  relatedCourse: "peruvian-spanish-b1-core-sentence-building",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: peruvianCoreVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "Habla, causa = What’s up, mate?",
  "todo bacán = everything’s good",
  "oye = hey / listen",
  "mi pata = my friend",
  "al toque = right away",
  "vuelvo al toque = I’ll be back right away",
  "la chamba = work",
  "estoy full = I’m really busy",
  "normal nomás = no worries",
  "¿manyas? = you know?",
  "pucha = damn / oh no",
  "la combi = the shared van",
  "demora un montón = takes ages",
  "voy lateando = I’m walking",
  "pásame la voz = let me know",
  "jameamos = we’ll eat",
  "no hay bronca = no problem",
  "te hago la taba = I’ll go with you",
  "de repente voy = maybe I’ll go",
  "al jato de mi pata = to my friend’s place",
  "estoy misio = I’m broke",
  "una chela = a beer",
  "qué palta = how embarrassing",
  "me quedé jato = I fell asleep",
];

export const peruvianSpanishB1CoreSentenceBuildingSentenceBuilder: SentenceBuilderLesson = {
  id: "peruvian-spanish-b1-core-sentence-building-sentence-builder",
  title: "B1 Sentence Builder: Peruvian Core Sentences",
  subtitle: "Build practical Peruvian Spanish sentences with informal but useful local flavour.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["peruvian-spanish", "b1", "sentence-builder", "local phrases"],
  estimatedMinutes: 18,
  skoolSectionName: "Peruvian Spanish - B1 Core Sentence Building",
  relatedCourse: "peruvian-spanish-b1-core-sentence-building",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a short Peruvian-style voice note explaining that you are busy, transport is slow, you are walking, and you will eat with your friend soon.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Greet a friend",
        sentenceVocab.slice(0, 2),
        sentenceVocab.slice(0, 2),
        "What’s up, mate? Everything’s good.",
        "Habla, causa. Todo bacán.",
        "This is a very informal Peruvian friend-to-friend opener.",
        breakdown([["What’s up, mate?", "Habla, causa"], ["Everything’s good", "Todo bacán"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Talk about your friend",
        sentenceVocab.slice(2, 4),
        sentenceVocab.slice(0, 4),
        "Hey, my friend is here.",
        "Oye, mi pata está acá.",
        "Oye gets attention; mi pata is a casual way to say my friend.",
        breakdown([["Hey / listen", "Oye"], ["my friend", "mi pata"], ["is here", "está acá"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Come back soon",
        sentenceVocab.slice(4, 6),
        sentenceVocab.slice(0, 6),
        "I’ll be back right away.",
        "Vuelvo al toque.",
        "Al toque means right away or very soon.",
        breakdown([["I’ll be back", "Vuelvo"], ["right away", "al toque"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Busy with work",
        sentenceVocab.slice(6, 10),
        sentenceVocab.slice(0, 10),
        "I’m really busy with work, but no worries, you know?",
        "Estoy full con la chamba, pero normal nomás, ¿manyas?",
        "This combines work pressure with a relaxed Peruvian tone.",
        breakdown([["I’m really busy", "Estoy full"], ["with work", "con la chamba"], ["no worries", "normal nomás"], ["you know?", "¿manyas?"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Transport problem",
        sentenceVocab.slice(10, 14),
        sentenceVocab.slice(0, 14),
        "Damn, the shared van is taking forever, so I’m walking.",
        "Pucha, la combi demora un montón, así que voy lateando.",
        "A useful transport update: problem plus solution.",
        breakdown([["Damn", "Pucha"], ["the shared van", "la combi"], ["is taking forever", "demora un montón"], ["I’m walking", "voy lateando"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Make food plans",
        sentenceVocab.slice(14, 17),
        sentenceVocab.slice(0, 17),
        "Let me know and we’ll eat soon. No problem.",
        "Pásame la voz y jameamos al toque. No hay bronca.",
        "Pásame la voz coordinates the plan; no hay bronca removes pressure.",
        breakdown([["Let me know", "Pásame la voz"], ["we’ll eat soon", "jameamos al toque"], ["No problem", "No hay bronca"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Accompany someone",
        sentenceVocab.slice(17, 20),
        sentenceVocab.slice(0, 20),
        "I’ll go with you. Maybe I’ll go to my friend’s place.",
        "Te hago la taba. De repente voy al jato de mi pata.",
        "This offers company and keeps the plan tentative.",
        breakdown([["I’ll go with you", "Te hago la taba"], ["Maybe I’ll go", "De repente voy"], ["to my friend’s place", "al jato de mi pata"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Money and beer",
        sentenceVocab.slice(20, 22),
        sentenceVocab.slice(0, 22),
        "I’m broke, but maybe we can buy one beer.",
        "Estoy misio, pero de repente compramos una chela.",
        "Use misia if the speaker is female.",
        breakdown([["I’m broke", "Estoy misio"], ["maybe", "de repente"], ["one beer", "una chela"]]),
        ["Use estoy misia for a female speaker."],
        ["Estoy misia, pero de repente compramos una chela."],
      ),
      stage(
        "stage-9",
        "Stage 9: Embarrassing mistake",
        sentenceVocab.slice(22, 24),
        sentenceVocab,
        "How embarrassing, I fell asleep.",
        "Qué palta, me quedé jato.",
        "This is a natural casual apology after missing a message or plan.",
        breakdown([["How embarrassing", "Qué palta"], ["I fell asleep", "me quedé jato"]]),
      ),
      stage(
        "stage-10",
        "Stage 10: Full update",
        [],
        sentenceVocab,
        "What’s up, mate? I’m really busy with work, the van is taking forever, and I’m walking. Let me know if you leave and we’ll eat soon.",
        "Habla, causa. Estoy full con la chamba, la combi demora un montón y voy lateando. Pásame la voz si sales y jameamos al toque.",
        "This combines greeting, work, transport, coordination, and food in one B1 Peruvian update.",
        breakdown([["What’s up, mate?", "Habla, causa"], ["I’m really busy with work", "Estoy full con la chamba"], ["the van is taking forever", "la combi demora un montón"], ["I’m walking", "voy lateando"], ["let me know if you leave", "pásame la voz si sales"], ["we’ll eat soon", "jameamos al toque"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/peruvian-spanish-b1-core-sentence-building/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "peruvian-b1-core-story-q1",
    type: "multiple-choice",
    prompt: "Why is Mateo late?",
    options: ["The combi is taking forever, so he is walking", "He is at the airport", "He forgot the address", "He is cooking at home"],
    correctAnswer: "The combi is taking forever, so he is walking",
    explanation: "Mateo says the combi demora un montón and then says voy lateando.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "peruvian-b1-core-story-q2",
    type: "multiple-choice",
    prompt: "What does 'normal nomás' mean in the story?",
    options: ["No worries / it’s all good", "Very expensive", "I fell asleep", "My job"],
    correctAnswer: "No worries / it’s all good",
    explanation: "Lucía uses normal nomás to reassure Mateo.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "peruvian-b1-core-story-q3",
    type: "multiple-choice",
    prompt: "What does Lucía offer when Mateo is walking?",
    options: ["To keep him company", "To cancel the plan", "To buy a new bus", "To go to work"],
    correctAnswer: "To keep him company",
    explanation: "She says te hago la taba, meaning I’ll go with you / keep you company.",
    points: 1,
    skillTag: "meaning",
  },
  {
    id: "peruvian-b1-core-story-q4",
    type: "multiple-choice",
    prompt: "Why does Mateo say he is misio?",
    options: ["He is broke", "He is asleep", "He is busy", "He is in a taxi"],
    correctAnswer: "He is broke",
    explanation: "Estoy misio means I’m broke for a male speaker.",
    points: 1,
    skillTag: "money",
  },
  {
    id: "peruvian-b1-core-story-q5",
    type: "multiple-choice",
    prompt: "What embarrassing thing happened to Diego?",
    options: ["He fell asleep and missed the messages", "He lost the food", "He bought too many beers", "He went to work"],
    correctAnswer: "He fell asleep and missed the messages",
    explanation: "Diego says qué palta, me quedé jato.",
    points: 1,
    skillTag: "gist",
  },
];

export const peruvianSpanishB1CoreSentenceBuildingWhatsAppStory: WhatsAppStory = {
  id: "peruvian-spanish-b1-core-sentence-building",
  title: "Peruvian B1 Story: The Combi Is Taking Forever",
  subtitle: "A WhatsApp-style story about work, transport, walking, eating, and informal Peruvian friend talk.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "WhatsApp", "core sentence building"],
  estimatedMinutes: 20,
  skoolSectionName: "Peruvian Spanish - B1 Core Sentence Building",
  relatedCourse: "peruvian-spanish-b1-core-sentence-building-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mateo", name: "Mateo", initials: "M", side: "right", color: "blue" },
      { id: "lucia", name: "Lucía", initials: "L", side: "left", color: "green" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Mateo and Lucía are trying to meet after work, but transport, money, and sleepy friends complicate the plan.", "Guide: Mateo and Lucía are trying to meet after work, but transport, money, and sleepy friends complicate the plan.", [], "narrator"),
      message("m1", "mateo", "Habla, causa. ¿Todo bacán?", "What’s up, mate. Everything good?", ["Habla, causa", "causa", "todo bacán"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m1.mp3"),
      message("m2", "lucia", "Todo bacán. Oye, ¿sales de la chamba ya?", "All good. Hey, are you leaving work now?", ["todo bacán", "oye", "la chamba"]),
      message("m3", "mateo", "Casi. Estoy full todavía.", "Almost. I’m still really busy.", ["estoy full", "estar full"]),
      message("m4", "lucia", "Normal nomás. Pásame la voz si sales.", "No worries. Let me know if you leave.", ["normal nomás", "pásame la voz si sales", "pásame la voz"]),
      message("m5", "mateo", "Ya salí. Pucha, la combi demora un montón.", "I already left. Damn, the van is taking forever.", ["pucha, la combi demora un montón", "pucha", "la combi", "demora un montón"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m5.mp3"),
      message("m6", "lucia", "¿Vas en combi o vas lateando?", "Are you in the van or are you walking?", ["la combi", "voy lateando"]),
      message("m7", "mateo", "Voy lateando. La combi nunca llegó, ¿manyas?", "I’m walking. The van never came, you know?", ["voy lateando", "latear", "¿manyas?"]),
      message("m8", "lucia", "Ya, no hay bronca. Si quieres, te hago la taba.", "Okay, no problem. If you want, I’ll keep you company.", ["no hay bronca", "te hago la taba", "hacer la taba"]),
      message("m9", "mateo", "Bacán. Voy por la avenida y vuelvo al toque a escribirte.", "Cool. I’m going along the avenue and I’ll write back right away.", ["bacán", "vuelvo al toque", "al toque"]),
      message("m10", "lucia", "Perfecto. Mi pata Diego también dijo que de repente va.", "Perfect. My friend Diego also said maybe he’ll go.", ["mi pata", "pata", "de repente voy…", "de repente"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m10.mp3"),
      message("m11", "mateo", "¿Al jato de tu pata o a tu jato?", "To your friend’s place or to your place?", ["al jato de mi pata", "jato", "mi jato"]),
      message("m12", "lucia", "Al jato de mi pata. Mi jato está lejos.", "To my friend’s place. My place is far.", ["al jato de mi pata", "mi jato"]),
      message("m13", "mateo", "Ya, causa. Pero estoy misio, aviso de una.", "Okay, mate. But I’m broke, just saying right away.", ["causa", "estoy misio", "estar misio / misia"]),
      message("m14", "lucia", "Normal nomás. Yo también estoy misia esta semana.", "No worries. I’m broke too this week.", ["normal nomás", "estoy misia"]),
      message("m15", "mateo", "Entonces nada caro. De repente una chela y ya.", "Then nothing expensive. Maybe one beer and that’s it.", ["de repente", "una chela"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m15.mp3"),
      message("m16", "lucia", "Sí, y jameamos algo barato cerca.", "Yes, and we’ll eat something cheap nearby.", ["jameamos", "jamear"]),
      message("m17", "mateo", "No hay bronca, jameamos al toque cuando llegue.", "No problem, we’ll eat soon when I arrive.", ["no hay bronca, jameamos al toque", "no hay bronca", "jameamos", "al toque"]),
      message("m18", "lucia", "Oye, Diego no responde.", "Hey, Diego isn’t replying.", ["oye"]),
      message("m19", "mateo", "Pucha, ese pata seguro se quedó jato.", "Damn, that mate probably fell asleep.", ["pucha", "pata", "me quedé jato"]),
      message("m20", "lucia", "Jajaja, qué palta si se quedó dormido otra vez.", "Haha, how embarrassing if he fell asleep again.", ["qué palta"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m20.mp3"),
      message("m21", "mateo", "Ya llegué cerca. Lo vemos al toque.", "I arrived nearby. We’ll sort it out right away.", ["lo vemos al toque", "al toque"]),
      message("m22", "lucia", "Bacán. Pásame la voz cuando estés en la puerta.", "Cool. Let me know when you’re at the door.", ["bacán", "pásame la voz"]),
      message("m23", "mateo", "Estoy en la esquina. Voy lateando dos cuadras más.", "I’m on the corner. I’m walking two more blocks.", ["voy lateando", "latear"]),
      message("m24", "lucia", "Te hago la taba hasta el jato de mi pata si quieres.", "I’ll go with you to my friend’s place if you want.", ["te hago la taba", "al jato de mi pata"]),
      message("m25", "mateo", "Bacán, gracias. Ando full cansado por la chamba.", "Cool, thanks. I’m super tired from work.", ["bacán", "estar full", "chamba"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m25.mp3"),
      message("m26", "lucia", "Normal nomás. Ir lateando con conversa pesa menos.", "No worries. Going walking with conversation feels less heavy.", ["normal nomás", "ir lateando"]),
      message("m27", "mateo", "Diego respondió: 'qué palta, me quedé jato'.", "Diego replied: 'how embarrassing, I fell asleep.'", ["qué palta, me quedé jato", "qué palta", "me quedé jato"]),
      message("m28", "lucia", "Clásico. Dile que venga al toque si puede.", "Classic. Tell him to come right away if he can.", ["al toque"]),
      message("m29", "mateo", "Le dije. Si viene, jameamos los tres.", "I told him. If he comes, the three of us will eat.", ["jameamos"]),
      message("m30", "lucia", "Listo, causa. No hay bronca: lo vemos al toque.", "Done, mate. No problem: we’ll sort it out right away.", ["causa", "no hay bronca", "lo vemos al toque"], "voice-note", "/audio/stories/peruvian-spanish-b1-core-sentence-building/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "peruvian-b1-core-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "peruvian-b1-core-check-2", afterMessageId: "m10", question: storyQuestions[1] },
      { id: "peruvian-b1-core-check-3", afterMessageId: "m15", question: storyQuestions[3] },
      { id: "peruvian-b1-core-check-4", afterMessageId: "m24", question: storyQuestions[2] },
      { id: "peruvian-b1-core-check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: peruvianCoreVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: peruvianCoreVocab.map((item) => item.term),
      grammarPatterns: [
        "Friend openers: Habla, causa; oye; pata; mi pata.",
        "Fast timing: al toque, vuelvo al toque, lo vemos al toque.",
        "Movement and transport: la combi, latear, voy lateando, ir lateando.",
        "Informal register: jamear, jato, misio/misia, hacer la taba are best with friends.",
      ],
      speakingPrompts: [
        "Send a voice note saying you are busy with work.",
        "Explain that the combi is late and you are walking.",
        "Invite a friend to eat soon and say there is no problem.",
      ],
    },
    completionTask: {
      title: "Your Peruvian update voice note",
      instructions: "Record a 60-second Peruvian Spanish voice note to a friend. Use at least 10 phrases from the lesson, including one greeting, one transport phrase, one food phrase, and one reassurance.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Habla, causa no es español formal. Es el tipo de frase que Mateo usa con un amigo después de la chamba. En la historia, escribe: Habla, causa, ¿todo bacán? No está dando un discurso; está abriendo un chat casual. Causa y pata significan amigo o mate, y mi pata significa mi amigo. Estas palabras son útiles, pero pertenecen a situaciones de confianza.",
    translation:
      "Habla, causa is not formal Spanish. It is the kind of phrase Mateo uses with a friend after work. In the story, he writes: Habla, causa, ¿todo bacán? He is not giving a speech; he is opening a casual chat. Causa and pata both mean friend or mate, and mi pata means my friend. These words are useful, but they belong in friendly situations.",
    highlights: highlights(["Habla, causa", "causa", "pata", "mi pata", "todo bacán"]),
    shadowLine: "Habla, causa, ¿todo bacán?",
  },
  {
    id: "p2",
    text:
      "Mateo está cansado por la chamba. Dice estoy full, que significa que está muy ocupado, no lleno de comida. Lucía responde normal nomás, una forma relajada de decir no worries. Luego dice pásame la voz si sales, porque quiere una actualización rápida cuando él salga del trabajo.",
    translation:
      "Mateo is tired because of work. He says estoy full, which means he is really busy, not full of food. Lucía answers normal nomás, a relaxed way to say no worries. Then she says pásame la voz si sales, because she wants a quick update when he leaves work.",
    highlights: highlights(["la chamba", "estoy full", "estar full", "normal nomás", "pásame la voz si sales", "pásame la voz"]),
    shadowLine: "Estoy full con la chamba, pero normal nomás.",
  },
  {
    id: "p3",
    text:
      "El problema de transporte es simple: pucha, la combi demora un montón. Pucha muestra frustración, la combi es la van compartida o bus local pequeño, y demora un montón significa que tarda muchísimo. Como la combi nunca llega, Mateo dice voy lateando. Latear significa caminar, e ir lateando significa ir caminando.",
    translation:
      "The transport problem is simple: damn, the combi is taking forever. Pucha shows frustration, la combi is the shared van or small local bus, and demora un montón means it takes ages. Because the combi never comes, Mateo says voy lateando. Latear means to walk, and ir lateando means to go walking.",
    highlights: highlights(["pucha, la combi demora un montón", "pucha", "la combi", "demora un montón", "voy lateando", "latear", "ir lateando"]),
    shadowLine: "Pucha, la combi demora un montón; voy lateando.",
  },
  {
    id: "p4",
    text:
      "Cuando Lucía dice te hago la taba, está ofreciendo acompañarlo. Eso es amistoso e informal. Después hablan de comida: jamear significa comer, y jameamos significa comemos o comeremos. No hay bronca, jameamos al toque significa no problem, we’ll eat soon. Al toque puede significar right away o very soon.",
    translation:
      "When Lucía says te hago la taba, she is offering to accompany him. That is friendly and informal. Later they talk about food: jamear means to eat, and jameamos means we eat or we’ll eat. No hay bronca, jameamos al toque means no problem, we’ll eat soon. Al toque can mean right away or very soon.",
    highlights: highlights(["te hago la taba", "hacer la taba", "jamear", "jameamos", "no hay bronca, jameamos al toque", "no hay bronca", "al toque"]),
    shadowLine: "No hay bronca, jameamos al toque.",
  },
  {
    id: "p5",
    text:
      "El dinero cambia el plan. Mateo dice estoy misio porque está sin plata. Si Lucía dice lo mismo, dice estoy misia. No planean una cena cara; de repente compran una chela y comen algo barato. En el español peruano, de repente muchas veces significa maybe, no suddenly.",
    translation:
      "Money changes the plan. Mateo says estoy misio because he is broke. If Lucía says the same thing, she says estoy misia. They do not plan an expensive dinner; maybe they buy one beer and eat something cheap. In Peruvian Spanish, de repente often means maybe, not suddenly.",
    highlights: highlights(["estoy misio", "estoy misia", "estar misio / misia", "de repente", "una chela"]),
    shadowLine: "Estoy misio, pero de repente compramos una chela.",
  },
  {
    id: "p6",
    text:
      "La historia termina con un mensaje vergonzoso de Diego: qué palta, me quedé jato. Qué palta significa how embarrassing, y me quedé jato significa I fell asleep. Lucía y Mateo no se molestan. Dicen lo vemos al toque y continúan con el plan. Esa es la habilidad principal: frases simples de B1, pero con sabor peruano real.",
    translation:
      "The story ends with an embarrassing message from Diego: qué palta, me quedé jato. Qué palta means how embarrassing, and me quedé jato means I fell asleep. Lucía and Mateo do not get angry. They say lo vemos al toque and continue with the plan. That is the main skill: simple B1 sentences, but with real Peruvian flavour.",
    highlights: highlights(["qué palta, me quedé jato", "qué palta", "me quedé jato", "lo vemos al toque"]),
    shadowLine: "Qué palta, me quedé jato.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "peruvian-b1-core-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Using simple Peruvian phrases in everyday friend plans", "Formal business Spanish", "Cooking instructions", "A travel visa problem"],
    correctAnswer: "Using simple Peruvian phrases in everyday friend plans",
    explanation: "The reading explains informal Peruvian B1 phrases in a friend-plan context.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "peruvian-b1-core-reading-q2",
    type: "multiple-choice",
    prompt: "What does 'estoy full' mean here?",
    options: ["I’m really busy", "I’m full of food", "I’m broke", "I’m walking"],
    correctAnswer: "I’m really busy",
    explanation: "The reading explains that estoy full means really busy in this context.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "peruvian-b1-core-reading-q3",
    type: "true-false",
    prompt: "True or false: 'de repente' often means maybe in Peruvian Spanish.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading says de repente often means maybe, not suddenly.",
    points: 1,
    skillTag: "meaning",
  },
  {
    id: "peruvian-b1-core-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the transport update.",
    wordBank: ["Voy", "lateando", "porque", "la", "combi", "demora"],
    correctAnswer: "Voy lateando porque la combi demora",
    explanation: "Voy lateando means I’m walking; la combi demora means the van/bus is delayed.",
    points: 2,
    skillTag: "sentence-order",
  },
  {
    id: "peruvian-b1-core-reading-q5",
    type: "fill-blank",
    prompt: "Complete: Qué palta, me quedé ______.",
    nativePrompt: "How embarrassing, I fell asleep.",
    correctAnswer: "jato",
    explanation: "Me quedé jato means I fell asleep.",
    points: 1,
    skillTag: "phrase-completion",
  },
];

export const peruvianSpanishB1CoreSentenceBuildingReading: ReadingComprehension = {
  id: "peruvian-spanish-b1-core-sentence-building-reading",
  title: "Peruvian B1 Reading: La combi demora un montón",
  subtitle: "A reading about simple Peruvian friend talk, work, transport, food, and informal reactions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "reading", "core sentence building"],
  estimatedMinutes: 18,
  skoolSectionName: "Peruvian Spanish - B1 Core Sentence Building",
  relatedCourse: "peruvian-spanish-b1-core-sentence-building",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/peruvian-spanish-b1-core-sentence-building/full.mp3",
    audioAlignmentUrl: "/audio/readings/peruvian-spanish-b1-core-sentence-building/timings.json",
    paragraphs: readingParagraphs,
    glossary: peruvianCoreVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the Peruvian B1 core sentence building vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  peruvianCoreVocab.slice(0, 8),
  peruvianCoreVocab.slice(8, 16),
  peruvianCoreVocab.slice(16, 24),
  peruvianCoreVocab.slice(24, 32),
  peruvianCoreVocab.slice(32),
];

export const peruvianSpanishB1CoreSentenceBuildingQuiz: CheckpointQuiz = {
  id: "peruvian-spanish-b1-core-sentence-building-quiz",
  title: "Peruvian Spanish B1: Core Sentence Building Quiz",
  subtitle: "Practice choosing the right Peruvian phrase for greetings, work, transport, food, money, and informal reactions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Peruvian Spanish", "B1", "quiz", "core sentence building"],
  estimatedMinutes: 20,
  skoolSectionName: "Peruvian Spanish - B1 Core Sentence Building",
  relatedCourse: "peruvian-spanish-b1-core-sentence-building",
  activityType: "quiz",
  data: {
    description: "Use this after the Peruvian B1 speaking lesson and reinforcement activities to test core local phrases in practical contexts.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "peruvian-b1-core-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is a very informal Peruvian way to say 'What’s up, mate'?",
        options: ["Habla, causa", "La combi", "Estoy misio", "Me quedé jato"],
        correctAnswer: "Habla, causa",
        explanation: "Habla, causa is an informal friend-to-friend opener.",
        points: 1,
        skillTag: "greeting",
      },
      {
        id: "peruvian-b1-core-quiz-2",
        type: "multiple-choice",
        prompt: "Your friend asks if work is busy. Which phrase means 'I’m really busy'?",
        options: ["Estoy full", "No hay bronca", "Una chela", "Voy lateando"],
        correctAnswer: "Estoy full",
        explanation: "Estoy full means I’m really busy.",
        points: 1,
        skillTag: "work",
      },
      {
        id: "peruvian-b1-core-quiz-3",
        type: "fill-blank",
        prompt: "Complete: Pásame la ______.",
        nativePrompt: "Let me know / give me a heads-up.",
        correctAnswer: "voz",
        explanation: "Pásame la voz means let me know.",
        points: 1,
        skillTag: "coordination",
      },
      {
        id: "peruvian-b1-core-quiz-4",
        type: "true-false",
        prompt: "True or false: 'jamear' is an informal way to say to eat.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Jamear means to eat and is very informal.",
        points: 1,
        skillTag: "food",
      },
      {
        id: "peruvian-b1-core-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Damn, the van is taking forever.",
        wordBank: ["Pucha,", "la", "combi", "demora", "un", "montón"],
        correctAnswer: "Pucha, la combi demora un montón",
        explanation: "This is the full transport complaint from the lesson.",
        points: 2,
        skillTag: "transport",
      },
      {
        id: "peruvian-b1-core-quiz-6",
        type: "multiple-choice",
        prompt: "A male speaker wants to say 'I’m broke.' Which phrase fits?",
        options: ["Estoy misio", "Estoy misia", "Todo bacán", "Al toque"],
        correctAnswer: "Estoy misio",
        explanation: "Misio is the masculine form; misia is the feminine form.",
        points: 1,
        skillTag: "gender-agreement",
      },
      {
        id: "peruvian-b1-core-quiz-7",
        type: "multiple-choice",
        prompt: "Which phrase means 'I’ll keep you company / I’ll go with you'?",
        options: ["Te hago la taba", "Vuelvo al toque", "Normal nomás", "De repente voy"],
        correctAnswer: "Te hago la taba",
        explanation: "Te hago la taba means I’ll accompany you or keep you company.",
        points: 1,
        skillTag: "social-support",
      },
      {
        id: "peruvian-b1-core-quiz-8",
        type: "fill-blank",
        prompt: "Complete: Qué ______, me quedé jato.",
        nativePrompt: "How embarrassing, I fell asleep.",
        correctAnswer: "palta",
        explanation: "Qué palta means how embarrassing.",
        points: 1,
        skillTag: "reaction",
      },
      {
        id: "peruvian-b1-core-quiz-9",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "No problem, we’ll eat soon.",
        wordBank: ["No", "hay", "bronca,", "jameamos", "al", "toque"],
        correctAnswer: "No hay bronca, jameamos al toque",
        explanation: "This is a relaxed food-plan response.",
        points: 2,
        skillTag: "food-plan",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`peruvian-b1-core-match-${index + 1}`, `Match Peruvian core phrases set ${index + 1}.`, chunk),
      ),
    ],
  },
};
