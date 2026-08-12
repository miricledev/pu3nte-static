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
const courseId = "dominican-spanish-c2-emotional-conversations";
const skoolSectionName = "Dominican Spanish - C2 Emotional Conversations";

const emotionalVocab: VocabItem[] = [
  { id: "hablar-claro", term: "hablar claro / Yo te voy a hablar claro", meaning: "to speak frankly / I’m going to be straight with you", note: "High-trust opener before a serious truth.", example: "Yo te voy a hablar claro: eso me dolió.", translation: "I’m going to be straight with you: that hurt me.", starred: true },
  { id: "darle-mente", term: "darle mente a algo", meaning: "to overthink something / dwell on it / keep thinking about it", note: "Emotional rumination phrase.", example: "Anoche le di demasiada mente a eso.", translation: "Last night I overthought that too much.", starred: true },
  { id: "coger-un-quille", term: "coger un quille", meaning: "to get angry / get really annoyed", note: "Informal emotional escalation.", example: "Cogí un quille cuando vi el mensaje.", translation: "I got really annoyed when I saw the message.", starred: true },
  { id: "quille", term: "quille", meaning: "anger / irritation / being pissed off", note: "Noun for anger or irritation.", example: "Ese quille no era por dinero.", translation: "That anger was not about money.", starred: true },
  { id: "estar-quillao", term: "estar quillao / quillá", meaning: "to be angry / pissed off", note: "Gendered adjective: quillao, quillá.", example: "Ella está quillá, pero no quiere hablar.", translation: "She is angry, but she does not want to talk.", starred: true },
  { id: "no-relaje-conmigo", term: "No relaje conmigo, oíte", meaning: "Don’t play with me / don’t mess around with me, you hear?", note: "Strong, confrontational boundary.", example: "No relaje conmigo, oíte; esto es serio.", translation: "Don’t play with me, you hear; this is serious.", starred: true },
  { id: "relajar-con-alguien", term: "relajar con alguien", meaning: "to joke around with / mess with someone", note: "Can be playful or confrontational depending on context.", example: "No estoy relajando contigo.", translation: "I’m not messing around with you.", starred: true },
  { id: "oite", term: "oíte", meaning: "you hear? / understand?", note: "Emphatic spoken tag.", example: "Esto queda entre nosotros, oíte.", translation: "This stays between us, you hear?", starred: true },
  { id: "mareo", term: "mareo", meaning: "runaround / evasiveness / going in circles", note: "Emotional frustration with evasive speech.", example: "Ese mareo me cansó.", translation: "That runaround wore me out.", starred: true },
  { id: "no-quiero-mareo", term: "No quiero mareo", meaning: "I don’t want the runaround / stop going in circles", note: "Demand for directness.", example: "No quiero mareo: dime qué pasó.", translation: "I don’t want the runaround: tell me what happened.", starred: true },
  { id: "meter-un-bobo", term: "meter un bobo", meaning: "to make up or feed someone a convincing excuse/story", note: "Usually accusatory: a smooth excuse hiding reality.", example: "No me metas un bobo ahora.", translation: "Don’t feed me some excuse now.", starred: true },
  { id: "un-bobo", term: "un bobo", meaning: "an excuse/story used to cover or smooth over what really happened", note: "The excuse itself.", example: "Eso suena a un bobo.", translation: "That sounds like an excuse.", starred: true },
  { id: "bajarle-el-quille", term: "bajarle el quille a alguien", meaning: "to calm someone’s anger down", note: "Repair phrase after tension rises.", example: "Déjame bajarle el quille antes de seguir.", translation: "Let me calm his anger down before continuing.", starred: true },
  { id: "allante", term: "allante", meaning: "bluff / show / false display / putting on appearances", note: "A performance that may not match reality.", example: "Todo eso fue allante.", translation: "All of that was a bluff.", starred: true },
  { id: "hacer-un-allante", term: "hacer un allante", meaning: "to put on a show / bluff / make something look more serious than it is", note: "Making a situation look different from reality.", example: "Él hizo un allante para no quedar mal.", translation: "He put on a show so he would not look bad.", starred: true },
  { id: "suena-a-allante", term: "eso me suena a allante", meaning: "that sounds like an act/bluff to me", note: "A suspicious reaction to someone’s performance.", example: "Ese discurso me suena a allante.", translation: "That speech sounds like an act to me.", starred: true },
  { id: "maco", term: "maco", meaning: "hidden problem / catch / suspicious detail", note: "A suspicious catch under the surface.", example: "Hay un maco en esa historia.", translation: "There is a catch in that story.", starred: true },
  { id: "hay-un-maco", term: "hay un maco ahí", meaning: "something’s fishy there / there’s something hidden going on", note: "Use when you sense a hidden problem.", example: "Si nadie quiere hablar, hay un maco ahí.", translation: "If nobody wants to talk, something is fishy there.", starred: true },
  { id: "ponerse-guapo", term: "ponerse guapo", meaning: "to get angry, aggressive, or confrontational", note: "Not about looking handsome here.", example: "No hace falta ponerse guapo.", translation: "There is no need to get aggressive.", starred: true },
  { id: "no-te-pongas-guapo", term: "No te pongas guapo", meaning: "Don’t get aggressive with me / don’t start getting mad", note: "De-escalation command.", example: "No te pongas guapo, que estamos hablando.", translation: "Don’t get aggressive; we are talking.", starred: true },
  { id: "coger-un-pique", term: "coger un pique", meaning: "to get pissed off / become irritated", note: "Similar to coger un quille, often resentment-driven.", example: "Cogí un pique por cómo lo dijiste.", translation: "I got pissed off because of how you said it.", starred: true },
  { id: "pique", term: "pique", meaning: "anger / annoyance / resentment", note: "Can imply hurt pride or resentment.", example: "Ese pique venía de antes.", translation: "That resentment came from before.", starred: true },
  { id: "pique-del-diablo", term: "un pique del diablo", meaning: "one hell of an anger / being seriously pissed off", note: "Very intense anger phrase.", example: "Tenía un pique del diablo.", translation: "He was seriously pissed off.", starred: true },
  { id: "enfogonarse", term: "enfogonarse", meaning: "to get extremely angry / heated / worked up", note: "Strong emotional escalation.", example: "No vale la pena enfogonarse por eso.", translation: "It is not worth getting heated over that.", starred: true },
  { id: "no-te-enfogones", term: "No te enfogones", meaning: "Don’t get all worked up / don’t get heated", note: "De-escalation phrase.", example: "No te enfogones; escucha primero.", translation: "Don’t get heated; listen first.", starred: true },
  { id: "dar-un-boche", term: "dar un boche", meaning: "to tell someone off / give them a verbal dressing-down", note: "Dominican scolding phrase.", example: "Me dio un boche delante de todos.", translation: "He told me off in front of everyone.", starred: true },
  { id: "boche", term: "boche", meaning: "reprimand / telling-off / scolding", note: "The scolding itself.", example: "Ese boche fue innecesario.", translation: "That telling-off was unnecessary.", starred: true },
  { id: "tener-dema", term: "tener dema con alguien", meaning: "to have beef / bad blood / hostility toward someone", note: "Personal hostility or tension.", example: "Yo no tengo dema contigo.", translation: "I don’t have beef with you.", starred: true },
  { id: "dema", term: "dema", meaning: "beef / hostility / ill will", note: "Noun form of bad blood.", example: "Aquí no hay dema, solo una conversación pendiente.", translation: "There is no beef here, just a pending conversation.", starred: true },
  { id: "no-te-tengo-dema", term: "Yo no te tengo dema", meaning: "I’ve got no beef with you / I don’t hold anything against you", note: "Repair phrase before honesty.", example: "Yo no te tengo dema, pero me dolió.", translation: "I’ve got no beef with you, but it hurt me.", starred: true },
  { id: "caer-en-gancho", term: "caer en gancho", meaning: "to fall into a trap / take the bait", note: "Emotional bait or setup.", example: "No quiero caer en gancho otra vez.", translation: "I don’t want to fall into the trap again.", starred: true },
  { id: "gancho", term: "gancho", meaning: "trap / setup / bait", note: "The bait itself.", example: "Ese comentario era un gancho.", translation: "That comment was bait.", starred: true },
  { id: "no-voy-a-caer", term: "No voy a caer en gancho", meaning: "I’m not falling for that / I’m not taking the bait", note: "Boundary against manipulation.", example: "No voy a caer en gancho con ese mensaje.", translation: "I’m not taking the bait with that message.", starred: true },
  { id: "comprar-un-pleito", term: "comprar un pleito", meaning: "to get yourself involved in an unnecessary conflict", note: "Literally buying a fight you did not need.", example: "No compres un pleito que no es tuyo.", translation: "Don’t get involved in a conflict that is not yours.", starred: true },
  { id: "no-voy-a-comprar", term: "No voy a comprar ese pleito", meaning: "I’m not getting dragged into that fight", note: "Refusal to enter unnecessary conflict.", example: "No voy a comprar ese pleito por un comentario.", translation: "I’m not getting dragged into that fight over a comment.", starred: true },
  { id: "culipandearse", term: "culipandearse", meaning: "to back out / change your position / fail to stand by what you said", note: "Very informal, accusatory.", example: "No empieces a culipandearte ahora.", translation: "Don’t start backing out now.", starred: true },
  { id: "no-te-culipandees", term: "No te me culipandees", meaning: "Don’t back out on me now / don’t switch up now", note: "Direct pressure to stand by what was said.", example: "No te me culipandees a última hora.", translation: "Don’t back out on me at the last minute.", starred: true },
  { id: "a-ultima-hora", term: "a última hora", meaning: "at the last minute", note: "Common timing phrase.", example: "Cambiaste todo a última hora.", translation: "You changed everything at the last minute.", starred: true },
  { id: "meter-la-pata", term: "meter la pata", meaning: "to mess up / screw up / say or do the wrong thing", note: "Common across Spanish, used here in emotional repair.", example: "Metí la pata con lo que dije.", translation: "I messed up with what I said.", starred: true },
  { id: "yo-meti-la-pata", term: "Yo metí la pata", meaning: "I messed up / I screwed up", note: "Accountability phrase.", example: "Yo metí la pata y te pido perdón.", translation: "I messed up and I apologize.", starred: true },
  { id: "pasar-la-de-cain", term: "pasar la de Caín", meaning: "to go through hell / have an extremely hard time", note: "Strong phrase for suffering.", example: "Ella pasó la de Caín con ese problema.", translation: "She went through hell with that problem.", starred: true },
  { id: "he-pasado-la-de-cain", term: "He pasado la de Caín", meaning: "I’ve been through hell", note: "Personal suffering phrase.", example: "He pasado la de Caín este mes.", translation: "I’ve been through hell this month.", starred: true },
  { id: "decricajao", term: "estar decricajao / decricajá", meaning: "to be completely worn out / wrecked / emotionally or physically drained", note: "Very local-feeling exhaustion phrase.", example: "Después de eso quedé decricajá.", translation: "After that I was completely drained.", starred: true },
  { id: "estoy-decricajao", term: "Estoy decricajao", meaning: "I’m completely drained / I’m a wreck", note: "Male speaker form; female would be decricajá.", example: "Estoy decricajao, pero quiero hablar.", translation: "I’m completely drained, but I want to talk.", starred: true },
  { id: "aguaje", term: "aguaje", meaning: "swagger / bluff / putting on a front", note: "A front that hides what is really felt.", example: "Eso fue aguaje, tú estabas dolido.", translation: "That was a front; you were hurt.", starred: true },
  { id: "hacer-aguaje", term: "hacer aguaje", meaning: "to put on a front / pretend to be tougher or less affected than you are", note: "Emotional masking phrase.", example: "Deja de hacer aguaje y habla claro.", translation: "Stop putting on a front and speak frankly.", starred: true },
  { id: "hacer-aguaje-no-importa", term: "hacer aguaje como que no me importa", meaning: "to act like I don’t care when I actually do", note: "Specific emotional defense mechanism.", example: "Yo hice aguaje como que no me importa.", translation: "I acted like I didn’t care.", starred: true },
  { id: "mismo-pleito", term: "comprar el mismo pleito", meaning: "to keep getting dragged into the same conflict", note: "Repeating the same emotional conflict pattern.", example: "No quiero comprar el mismo pleito otra vez.", translation: "I don’t want to get dragged into the same fight again.", starred: true },
  { id: "se-pone-feo", term: "se pone feo", meaning: "it gets ugly / things get nasty", note: "Warning about escalation.", example: "Si seguimos así, se pone feo.", translation: "If we keep going like this, it gets ugly.", starred: true },
  { id: "maco-mas-feo", term: "el maco se pone más feo", meaning: "the underlying problem gets even worse", note: "The hidden issue worsens when ignored.", example: "Si no hablamos, el maco se pone más feo.", translation: "If we don’t talk, the underlying problem gets worse.", starred: true },
  { id: "paciencia", term: "me están acabando la paciencia", meaning: "they’re wearing my patience thin / I’m running out of patience", note: "Strong but not yet explosive warning.", example: "Me están acabando la paciencia con tanto mareo.", translation: "They’re wearing my patience thin with so much runaround.", starred: true },
  { id: "sin-allante-ni-mareo", term: "sin allante ni mareo", meaning: "no performances and no runaround / just be straight with me", note: "Demand for emotional directness.", example: "Háblame sin allante ni mareo.", translation: "Talk to me with no performances and no runaround.", starred: true },
];

const highlightMap = Object.fromEntries(emotionalVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: "hard",
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

export const dominicanSpanishC2EmotionalConversationsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish C2: Emotional Conversations Flashcards",
  subtitle: "Advanced Dominican phrases for frankness, anger, evasiveness, bait, apology, emotional exhaustion, and conflict de-escalation.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c2", "flashcards", "emotional-conversations", "conflict"],
  estimatedMinutes: 24,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: emotionalVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "hablar claro = speak frankly",
  "sin allante ni mareo = no performances and no runaround",
  "darle mente a algo = overthink something",
  "coger un quille = get angry",
  "No relaje conmigo, oíte = don’t play with me, you hear?",
  "No quiero mareo = I don’t want the runaround",
  "meter un bobo = feed someone an excuse",
  "hay un maco ahí = something’s fishy there",
  "No te pongas guapo = don’t get aggressive",
  "No te enfogones = don’t get heated",
  "bajarle el quille = calm someone’s anger down",
  "Yo no te tengo dema = I have no beef with you",
  "No voy a caer en gancho = I won’t take the bait",
  "No voy a comprar ese pleito = I won’t get dragged into that fight",
  "No te me culipandees = don’t back out on me",
  "a última hora = at the last minute",
  "Yo metí la pata = I messed up",
  "He pasado la de Caín = I’ve been through hell",
  "Estoy decricajao = I’m completely drained",
  "hacer aguaje = put on a front",
  "hacer aguaje como que no me importa = act like I don’t care",
  "se pone feo = it gets ugly",
  "el maco se pone más feo = the hidden problem gets worse",
  "me están acabando la paciencia = they’re wearing my patience thin",
];

export const dominicanSpanishC2EmotionalConversationsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C2 Sentence Builder: Dominican Emotional Conversations",
  subtitle: "Build advanced Dominican phrases for directness, anger, apology, emotional fatigue, suspicion, and conflict boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c2", "sentence-builder", "emotions", "conflict"],
  estimatedMinutes: 24,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second emotional conversation repair: speak frankly, name the hurt, refuse the bait, admit one mistake, and ask for directness.",
    stages: [
      stage("stage-1", "Stage 1: Ask for directness", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2), "I’m going to be straight with you: talk to me with no performance and no runaround.", "Yo te voy a hablar claro: háblame sin allante ni mareo.", "This frames a serious conversation with directness but not immediate aggression.", breakdown([["I’m going to be straight with you", "Yo te voy a hablar claro"], ["talk to me", "háblame"], ["with no performance and no runaround", "sin allante ni mareo"]])),
      stage("stage-2", "Stage 2: Name the anger", sentenceVocab.slice(2, 5), sentenceVocab.slice(0, 5), "I overthought it, got angry, and now I’m telling you: don’t play with me, you hear?", "Le di mente, cogí un quille y ahora te digo: no relaje conmigo, oíte.", "This is intense. It belongs to a high-emotion conversation, not a casual correction.", breakdown([["I overthought it", "Le di mente"], ["I got angry", "cogí un quille"], ["don’t play with me, you hear?", "no relaje conmigo, oíte"]])),
      stage("stage-3", "Stage 3: Reject evasiveness", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "I don’t want the runaround. Don’t feed me an excuse, because something’s fishy there.", "No quiero mareo. No me metas un bobo, porque hay un maco ahí.", "This demands clarity when the explanation feels evasive or suspicious.", breakdown([["I don’t want the runaround", "No quiero mareo"], ["don’t feed me an excuse", "no me metas un bobo"], ["something’s fishy there", "hay un maco ahí"]])),
      stage("stage-4", "Stage 4: De-escalate", sentenceVocab.slice(8, 11), sentenceVocab.slice(0, 11), "Don’t get aggressive and don’t get heated; let me calm the anger down.", "No te pongas guapo y no te enfogones; déjame bajarte el quille.", "This is repair language: it names escalation and asks for space to lower it.", breakdown([["Don’t get aggressive", "No te pongas guapo"], ["don’t get heated", "no te enfogones"], ["let me calm your anger down", "déjame bajarte el quille"]])),
      stage("stage-5", "Stage 5: Refuse the bait", sentenceVocab.slice(11, 14), sentenceVocab.slice(0, 14), "I have no beef with you, but I’m not falling for that and I’m not getting dragged into that fight.", "Yo no te tengo dema, pero no voy a caer en gancho y no voy a comprar ese pleito.", "This keeps a boundary without declaring war.", breakdown([["I have no beef with you", "Yo no te tengo dema"], ["I’m not falling for that", "no voy a caer en gancho"], ["I’m not getting dragged into that fight", "no voy a comprar ese pleito"]])),
      stage("stage-6", "Stage 6: Call out backing out", sentenceVocab.slice(14, 16), sentenceVocab.slice(0, 16), "Don’t back out on me at the last minute.", "No te me culipandees a última hora.", "This is very direct and accusatory; it should be used carefully.", breakdown([["Don’t back out on me", "No te me culipandees"], ["at the last minute", "a última hora"]])),
      stage("stage-7", "Stage 7: Admit hurt and exhaustion", sentenceVocab.slice(16, 19), sentenceVocab.slice(0, 19), "I messed up, but I’ve been through hell and I’m completely drained.", "Yo metí la pata, pero he pasado la de Caín y estoy decricajao.", "This combines accountability with emotional context.", breakdown([["I messed up", "Yo metí la pata"], ["I’ve been through hell", "he pasado la de Caín"], ["I’m completely drained", "estoy decricajao"]])),
      stage("stage-8", "Stage 8: Stop the front", sentenceVocab.slice(19, 24), sentenceVocab.slice(0, 24), "I was acting like I didn’t care, but if we keep going like this, it gets ugly and the hidden problem gets worse.", "Yo estaba haciendo aguaje como que no me importa, pero si seguimos así, se pone feo y el maco se pone más feo.", "This C2 line names an emotional defense and the cost of avoiding the real problem.", breakdown([["I was acting like I didn’t care", "Yo estaba haciendo aguaje como que no me importa"], ["it gets ugly", "se pone feo"], ["the hidden problem gets worse", "el maco se pone más feo"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyMessages: StoryMessage[] = [
  message("m1", "mariela", "Yo te voy a hablar claro, José: no quiero mareo esta vez.", "I’m going to be straight with you, José: I don’t want the runaround this time.", ["hablar claro / Yo te voy a hablar claro", "No quiero mareo"], "voice-note", `${storyAudioBase}/m1.mp3`),
  message("m2", "jose", "Está bien. Háblame sin allante ni mareo.", "Okay. Talk to me with no performances and no runaround.", ["sin allante ni mareo", "mareo"]),
  message("m3", "mariela", "Anoche le di mente a lo que dijiste y cogí un quille fuerte.", "Last night I overthought what you said and got really angry.", ["darle mente a algo", "coger un quille", "quille"]),
  message("m4", "jose", "Yo sabía que estabas quillá, pero no sabía que era por eso.", "I knew you were angry, but I didn’t know it was because of that.", ["estar quillao / quillá"]),
  message("m5", "mariela", "No relaje conmigo, oíte. Tú sabes exactamente por qué fue.", "Don’t play with me, you hear? You know exactly why it happened.", ["No relaje conmigo, oíte", "relajar con alguien", "oíte"]),
  message("m6", "jose", "No te pongas guapa. No estoy metiéndote un bobo; yo metí la pata.", "Don’t get aggressive. I’m not feeding you an excuse; I messed up.", ["No te pongas guapo", "meter un bobo", "un bobo", "Yo metí la pata"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "mariela", "Eso me suena a allante, porque primero dijiste una cosa y después otra.", "That sounds like an act to me, because first you said one thing and then another.", ["eso me suena a allante", "allante"]),
  message("m8", "jose", "No fue allante. Fue miedo de aceptar que me culipandeé a última hora.", "It was not an act. It was fear of admitting that I backed out at the last minute.", ["allante", "culipandearse", "a última hora"]),
  message("m9", "mariela", "Ahí es que está el maco. Si había miedo, ¿por qué inventar?", "That’s where the hidden problem is. If there was fear, why make things up?", ["maco", "hay un maco ahí"]),
  message("m10", "jose", "Porque pensé que si hablaba claro, tú ibas a coger un pique del diablo.", "Because I thought that if I spoke frankly, you would get seriously pissed off.", ["hablar claro / Yo te voy a hablar claro", "coger un pique", "un pique del diablo"]),
  message("m11", "mariela", "Me dio pique, sí. Pero más me dolió el boche que me diste delante de ellos.", "I was annoyed, yes. But what hurt more was the telling-off you gave me in front of them.", ["pique", "dar un boche", "boche"], "voice-note", `${storyAudioBase}/m11.mp3`),
  message("m12", "jose", "Ese boche fue injusto. Yo no tenía derecho a hablarte así.", "That scolding was unfair. I had no right to speak to you like that.", ["boche"]),
  message("m13", "mariela", "Por eso digo que hay dema, aunque tú digas que no.", "That’s why I say there’s beef, even if you say there isn’t.", ["dema", "tener dema con alguien"]),
  message("m14", "jose", "Yo no te tengo dema. Lo que tengo es vergüenza.", "I have no beef with you. What I have is shame.", ["Yo no te tengo dema"]),
  message("m15", "mariela", "Entonces no caigas en gancho cuando los demás te meten presión.", "Then don’t take the bait when the others pressure you.", ["caer en gancho", "gancho"]),
  message("m16", "jose", "No voy a caer en gancho otra vez, ni voy a comprar ese pleito.", "I’m not taking the bait again, and I’m not getting dragged into that fight.", ["No voy a caer en gancho", "No voy a comprar ese pleito", "comprar un pleito"], "voice-note", `${storyAudioBase}/m16.mp3`),
  message("m17", "mariela", "Porque si compras el mismo pleito, se pone feo entre nosotros.", "Because if you keep getting dragged into the same conflict, things get ugly between us.", ["comprar el mismo pleito", "se pone feo"]),
  message("m18", "jose", "Lo sé. Y si no hablamos, el maco se pone más feo.", "I know. And if we don’t talk, the hidden problem gets worse.", ["el maco se pone más feo"]),
  message("m19", "mariela", "Me están acabando la paciencia con tanto cambio de versión.", "They’re wearing my patience thin with so many changed versions.", ["me están acabando la paciencia"]),
  message("m20", "jose", "No te enfogones. Déjame bajarte el quille sin justificarme.", "Don’t get heated. Let me calm your anger down without justifying myself.", ["No te enfogones", "enfogonarse", "bajarle el quille a alguien"]),
  message("m21", "mariela", "No es solo quille. He pasado la de Caín este mes y estoy decricajá.", "It’s not just anger. I’ve been through hell this month and I’m completely drained.", ["quille", "He pasado la de Caín", "pasar la de Caín", "estar decricajao / decricajá"], "voice-note", `${storyAudioBase}/m21.mp3`),
  message("m22", "jose", "Yo también estoy decricajao, pero eso no excusa lo que hice.", "I’m completely drained too, but that does not excuse what I did.", ["Estoy decricajao"]),
  message("m23", "mariela", "A veces tú haces aguaje como que no te importa, pero sí te importa.", "Sometimes you put on a front like you don’t care, but you do care.", ["hacer aguaje", "hacer aguaje como que no me importa", "aguaje"]),
  message("m24", "jose", "Sí. Hice aguaje como que no me importa porque me sentí atacado.", "Yes. I acted like I didn’t care because I felt attacked.", ["hacer aguaje como que no me importa"]),
  message("m25", "mariela", "Pues habla claro desde el principio. No te me culipandees cuando toque responder.", "Then speak frankly from the beginning. Don’t back out on me when it’s time to answer.", ["hablar claro / Yo te voy a hablar claro", "No te me culipandees"]),
  message("m26", "jose", "Tienes razón. Yo metí la pata, y esta vez no voy a relajar con eso.", "You’re right. I messed up, and this time I’m not going to joke around with that.", ["Yo metí la pata", "relajar con alguien"], "voice-note", `${storyAudioBase}/m26.mp3`),
  message("m27", "mariela", "Yo no quiero pelear; quiero que no me vendan otro bobo.", "I don’t want to fight; I want them not to sell me another excuse.", ["un bobo"]),
  message("m28", "jose", "No hay bobo. Mañana les digo la verdad sin allante.", "There is no excuse. Tomorrow I’ll tell them the truth with no bluff.", ["un bobo", "allante"]),
  message("m29", "mariela", "Si haces eso, podemos bajarle el quille a todo el mundo.", "If you do that, we can calm everyone’s anger down.", ["bajarle el quille a alguien"]),
  message("m30", "jose", "Quedamos así: hablar claro, sin mareo, sin gancho y sin comprar pleitos ajenos.", "That’s the agreement: speak frankly, no runaround, no bait, and no getting dragged into other people’s fights.", ["hablar claro / Yo te voy a hablar claro", "mareo", "gancho", "comprar un pleito"]),
];

const storyChecks: NonNullable<WhatsAppStory["data"]["comprehensionChecks"]> = [
  { id: "check-1", afterMessageId: "m3", question: { id: "story-q1", type: "multiple-choice", prompt: "Why did Mariela get angry?", options: ["She overthought what José said", "She lost her phone", "José forgot her birthday", "The call dropped"], correctAnswer: "She overthought what José said", explanation: "She says she gave it too much thought and got angry.", points: 1, skillTag: "gist" } },
  { id: "check-2", afterMessageId: "m6", question: { id: "story-q2", type: "multiple-choice", prompt: "What does José admit in message 6?", options: ["He messed up", "He never heard the story", "He wants to leave", "He has no signal"], correctAnswer: "He messed up", explanation: "He says “yo metí la pata.”", points: 1, skillTag: "accountability" } },
  { id: "check-3", afterMessageId: "m9", question: { id: "story-q3", type: "multiple-choice", prompt: "What does Mariela think is suspicious?", options: ["José changed his explanation", "José arrived too early", "The restaurant was closed", "The audio was too short"], correctAnswer: "José changed his explanation", explanation: "She says first he said one thing and then another.", points: 1, skillTag: "inference" } },
  { id: "check-4", afterMessageId: "m12", question: { id: "story-q4", type: "true-false", prompt: "José says the boche he gave Mariela was fair.", correctAnswer: "false", explanation: "He says it was unfair and he had no right to speak to her that way.", points: 1, skillTag: "detail" } },
  { id: "check-5", afterMessageId: "m15", question: { id: "story-q5", type: "multiple-choice", prompt: "What does Mariela tell José not to do when others pressure him?", options: ["Fall into the bait", "Pay for dinner", "Ignore every message", "Send a long voice note"], correctAnswer: "Fall into the bait", explanation: "She says not to “caer en gancho.”", points: 1, skillTag: "vocab" } },
  { id: "check-6", afterMessageId: "m18", question: { id: "story-q6", type: "multiple-choice", prompt: "What happens if they do not talk honestly?", options: ["The hidden problem gets worse", "The problem disappears", "Everyone apologizes immediately", "José forgets everything"], correctAnswer: "The hidden problem gets worse", explanation: "José says “el maco se pone más feo.”", points: 1, skillTag: "inference" } },
  { id: "check-7", afterMessageId: "m21", question: { id: "story-q7", type: "multiple-choice", prompt: "How does Mariela describe her emotional state?", options: ["She has been through hell and is drained", "She is excited about a trip", "She is only sleepy", "She feels nothing"], correctAnswer: "She has been through hell and is drained", explanation: "She says “he pasado la de Caín” and “estoy decricajá.”", points: 1, skillTag: "emotion" } },
  { id: "check-8", afterMessageId: "m24", question: { id: "story-q8", type: "true-false", prompt: "José admits he acted like he did not care because he felt attacked.", correctAnswer: "true", explanation: "He says he made aguaje like he did not care because he felt attacked.", points: 1, skillTag: "emotion" } },
  { id: "check-9", afterMessageId: "m27", question: { id: "story-q9", type: "multiple-choice", prompt: "What does Mariela want to avoid?", options: ["Another excuse/story", "A sincere apology", "A clear answer", "A private conversation"], correctAnswer: "Another excuse/story", explanation: "She says she does not want another “bobo.”", points: 1, skillTag: "vocab" } },
  { id: "check-10", afterMessageId: "m30", question: { id: "story-q10", type: "multiple-choice", prompt: "What final agreement do they make?", options: ["Speak frankly and avoid runaround, bait, and outside fights", "Stop talking forever", "Let others decide everything", "Pretend nothing happened"], correctAnswer: "Speak frankly and avoid runaround, bait, and outside fights", explanation: "José summarizes: hablar claro, sin mareo, sin gancho, and no buying other people’s fights.", points: 1, skillTag: "resolution" } },
];

export const dominicanSpanishC2EmotionalConversationsWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican Spanish C2: No More Runaround",
  subtitle: "A raw but repair-focused Dominican conversation about anger, evasiveness, bait, apology, and emotional exhaustion.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c2", "story", "emotional-conversations", "conflict"],
  estimatedMinutes: 28,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mariela", name: "Mariela", initials: "M", side: "left", color: "violet" },
      { id: "jose", name: "José", initials: "J", side: "right", color: "cyan" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyChecks,
    learnedVocab: emotionalVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["Yo te voy a hablar claro.", "No quiero mareo.", "No voy a caer en gancho.", "Yo metí la pata.", "Sin allante ni mareo."],
      grammarPatterns: ["Direct emotional imperatives", "Conflict refusal with no voy a...", "Accountability and emotional-state phrasing"],
      speakingPrompts: ["Tell someone you want honesty without evasiveness.", "Admit you messed up while explaining your emotional state.", "Refuse to get dragged into someone else’s fight."],
    },
    completionTask: {
      title: "Repair the conversation",
      instructions: "Record 45-60 seconds speaking frankly, naming one emotion, refusing one conflict trap, and ending with a clear repair request.",
    },
  },
};

export const dominicanSpanishC2EmotionalConversationsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Speaking Frankly Without Buying the Fight",
  subtitle: "A synced reading on Dominican emotional register: frankness, anger, evasiveness, bait, apology, exhaustion, and repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c2", "reading", "emotion", "register"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: [
      { id: "p1", text: "In a serious Dominican conversation, “Yo te voy a hablar claro” announces directness. It is not just vocabulary; it is a social move. When someone adds “sin allante ni mareo”, they are asking for honesty with no performance and no runaround.", highlights: highlights(["hablar claro / Yo te voy a hablar claro", "sin allante ni mareo", "allante", "mareo"]), shadowLine: "Yo te voy a hablar claro: sin allante ni mareo." },
      { id: "p2", text: "Anger has many layers. “Quille” and “pique” can both refer to anger or irritation, but “un pique del diablo” is much stronger. “Estar quillao” or “estar quillá” names the state, while “coger un quille” names the moment anger starts.", highlights: highlights(["quille", "pique", "un pique del diablo", "estar quillao / quillá", "coger un quille"]), shadowLine: "Cogí un quille y todavía estoy quillao." },
      { id: "p3", text: "De-escalation is just as important as confrontation. “No te pongas guapo” means do not get aggressive. “No te enfogones” means do not get heated. “Bajarle el quille a alguien” means to calm someone’s anger down before the conversation gets worse.", highlights: highlights(["No te pongas guapo", "ponerse guapo", "No te enfogones", "enfogonarse", "bajarle el quille a alguien"]), shadowLine: "No te enfogones; déjame bajarte el quille." },
      { id: "p4", text: "Evasiveness creates suspicion. “No quiero mareo” rejects circular explanations. “Meter un bobo” means feeding someone a smooth excuse. If the excuse feels suspicious, “hay un maco ahí” means there is a hidden problem or catch under the surface.", highlights: highlights(["No quiero mareo", "meter un bobo", "un bobo", "hay un maco ahí", "maco"]), shadowLine: "No quiero mareo; eso me suena a un bobo." },
      { id: "p5", text: "Some phrases are about not entering conflict. “Caer en gancho” is falling into a trap, and “comprar un pleito” is getting dragged into an unnecessary fight. “No voy a caer en gancho” and “No voy a comprar ese pleito” protect your emotional control.", highlights: highlights(["caer en gancho", "gancho", "comprar un pleito", "No voy a caer en gancho", "No voy a comprar ese pleito"]), shadowLine: "No voy a caer en gancho ni a comprar ese pleito." },
      { id: "p6", text: "Repair requires accountability. “Yo metí la pata” admits you messed up. “Yo no te tengo dema” says there is no beef, even if there is pain. “He pasado la de Caín” and “Estoy decricajao” explain emotional exhaustion without pretending everything is fine.", highlights: highlights(["Yo metí la pata", "meter la pata", "Yo no te tengo dema", "dema", "He pasado la de Caín", "Estoy decricajao"]), shadowLine: "Yo metí la pata, pero no te tengo dema." },
      { id: "p7", text: "At C2, the hardest nuance is emotional masking. “Hacer aguaje como que no me importa” means acting like you do not care when you actually do. If people keep performing, “se pone feo”, and “el maco se pone más feo”. Directness can be the kindest option.", highlights: highlights(["hacer aguaje", "hacer aguaje como que no me importa", "se pone feo", "el maco se pone más feo"]), shadowLine: "Deja el aguaje, porque si no, se pone feo." },
    ],
    glossary: highlights(emotionalVocab.map((item) => item.term)),
    questions: [
      { id: "reading-q1", type: "multiple-choice", prompt: "What does “sin allante ni mareo” ask for?", options: ["Honesty with no performance or runaround", "A joke in a group chat", "A delayed answer", "A formal apology letter"], correctAnswer: "Honesty with no performance or runaround", explanation: "The reading says it asks for honesty with no performance and no runaround.", points: 1, skillTag: "register" },
      { id: "reading-q2", type: "multiple-choice", prompt: "Which phrase means not getting dragged into an unnecessary fight?", options: ["No voy a comprar ese pleito", "Yo metí la pata", "Estoy decricajao", "No quiero mareo"], correctAnswer: "No voy a comprar ese pleito", explanation: "It refuses to enter a conflict that does not need to be yours.", points: 1, skillTag: "conflict-boundary" },
      { id: "reading-q3", type: "true-false", prompt: "“Hacer aguaje como que no me importa” means acting unaffected when you actually care.", correctAnswer: "true", explanation: "The reading describes it as emotional masking.", points: 1, skillTag: "nuance" },
      { id: "reading-q4", type: "multiple-choice", prompt: "What does “hay un maco ahí” suggest?", options: ["Something hidden or suspicious is going on", "The person is completely calm", "Everyone agreed already", "The apology is finished"], correctAnswer: "Something hidden or suspicious is going on", explanation: "A maco is a hidden problem, catch, or suspicious detail.", points: 1, skillTag: "suspicion" },
      { id: "reading-q5", type: "fill-blank", prompt: "Complete: “Yo ____ la pata.”", options: ["metí", "compré", "caí", "bajé"], correctAnswer: "metí", explanation: "“Yo metí la pata” means I messed up.", points: 1, skillTag: "accountability" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "quiz-q1", type: "multiple-choice", prompt: "You want to begin a serious honest conversation. Choose the best phrase.", options: ["Yo te voy a hablar claro", "Un bobo", "Gancho", "Coger un pique"], correctAnswer: "Yo te voy a hablar claro", explanation: "This announces frankness before a serious point.", points: 1, skillTag: "context" },
  { id: "quiz-q2", type: "multiple-choice", prompt: "Someone keeps giving evasive explanations. What do you say?", options: ["No quiero mareo", "Estoy decricajao", "Yo no te tengo dema", "No te enfogones"], correctAnswer: "No quiero mareo", explanation: "“Mareo” means runaround or going in circles.", points: 1, skillTag: "evasion" },
  { id: "quiz-q3", type: "multiple-choice", prompt: "You want to admit responsibility. Choose the phrase.", options: ["Yo metí la pata", "Me están acabando la paciencia", "Hay un maco ahí", "No relaje conmigo"], correctAnswer: "Yo metí la pata", explanation: "It means I messed up.", points: 1, skillTag: "accountability" },
  { id: "quiz-q4", type: "multiple-choice", prompt: "Someone is trying to bait you into a conflict. Choose the boundary.", options: ["No voy a caer en gancho", "Hacer un allante", "Dar un boche", "Coger un quille"], correctAnswer: "No voy a caer en gancho", explanation: "This means I’m not taking the bait.", points: 1, skillTag: "bait" },
  { id: "quiz-q5", type: "fill-blank", prompt: "Complete: “No te me ____ a última hora.”", options: ["culipandees", "mareo", "bobo", "quille"], correctAnswer: "culipandees", explanation: "“No te me culipandees” means don’t back out on me now.", points: 1, skillTag: "phrase-building" },
  { id: "quiz-q6", type: "fill-blank", prompt: "Complete: “Hay un ____ ahí.”", options: ["maco", "pique", "boche", "aguaje"], correctAnswer: "maco", explanation: "“Hay un maco ahí” means something is fishy there.", points: 1, skillTag: "suspicion" },
  { id: "quiz-q7", type: "fill-blank", prompt: "Complete: “No voy a comprar ese ____.”", options: ["pleito", "quille", "mareo", "gancho"], correctAnswer: "pleito", explanation: "“Comprar un pleito” means getting dragged into a fight.", points: 1, skillTag: "conflict" },
  { id: "quiz-q8", type: "fill-blank", prompt: "Complete: “Estoy ____.”", options: ["decricajao", "gancho", "allante", "bobo"], correctAnswer: "decricajao", explanation: "“Estoy decricajao” means I’m completely drained.", points: 1, skillTag: "emotion" },
  { id: "quiz-q9", type: "true-false", prompt: "“No relaje conmigo, oíte” is a strong confrontational boundary.", correctAnswer: "true", explanation: "It means don’t play with me / don’t mess around with me, you hear?", points: 1, skillTag: "register" },
  { id: "quiz-q10", type: "true-false", prompt: "“Meter un bobo” means to give a clear sincere apology.", correctAnswer: "false", explanation: "It means to feed someone a convincing excuse or cover story.", points: 1, skillTag: "meaning" },
  { id: "quiz-q11", type: "true-false", prompt: "“No te enfogones” is used to de-escalate someone who is getting heated.", correctAnswer: "true", explanation: "It means don’t get all worked up.", points: 1, skillTag: "de-escalation" },
  { id: "quiz-q12", type: "true-false", prompt: "“Yo no te tengo dema” means I still have beef with you.", correctAnswer: "false", explanation: "It means I’ve got no beef with you.", points: 1, skillTag: "repair" },
  { id: "quiz-q13", type: "match-pairs", prompt: "Match the emotional phrase to its meaning.", pairs: [{ left: "quille", right: "anger" }, { left: "mareo", right: "runaround" }, { left: "maco", right: "hidden problem" }, { left: "aguaje", right: "front/bluff" }], explanation: "These are core C2 emotional nouns from the lesson.", points: 4, skillTag: "vocab-match" },
  { id: "quiz-q14", type: "match-pairs", prompt: "Match the repair/boundary phrase to its function.", pairs: [{ left: "Yo metí la pata", right: "admits a mistake" }, { left: "No te pongas guapo", right: "de-escalates aggression" }, { left: "No voy a comprar ese pleito", right: "refuses conflict" }, { left: "bajarle el quille", right: "calm anger down" }], explanation: "These phrases help manage conflict and repair.", points: 4, skillTag: "function-match" },
  { id: "quiz-q15", type: "order-words", prompt: "Put the words in order: “I don’t want the runaround.”", wordBank: ["No", "quiero", "mareo"], correctAnswer: "No quiero mareo", explanation: "This fixed phrase rejects evasiveness.", points: 1, skillTag: "word-order" },
  { id: "quiz-q16", type: "order-words", prompt: "Put the words in order: “I’m not taking the bait.”", wordBank: ["No", "voy", "a", "caer", "en", "gancho"], correctAnswer: "No voy a caer en gancho", explanation: "This phrase refuses emotional bait.", points: 1, skillTag: "word-order" },
  { id: "quiz-q17", type: "order-words", prompt: "Put the words in order: “I messed up.”", wordBank: ["Yo", "metí", "la", "pata"], correctAnswer: "Yo metí la pata", explanation: "Use this to admit responsibility.", points: 1, skillTag: "word-order" },
  { id: "quiz-q18", type: "order-words", prompt: "Put the words in order: “No performances and no runaround.”", wordBank: ["sin", "allante", "ni", "mareo"], correctAnswer: "sin allante ni mareo", explanation: "This demands directness without performance.", points: 1, skillTag: "word-order" },
  { id: "quiz-q19", type: "multiple-choice", prompt: "You want to say someone is acting like they don’t care, but they do. Choose the phrase.", options: ["hacer aguaje como que no me importa", "pasar la de Caín", "dar un boche", "ponerse guapo"], correctAnswer: "hacer aguaje como que no me importa", explanation: "This describes pretending not to care.", points: 1, skillTag: "nuance" },
  { id: "quiz-q20", type: "multiple-choice", prompt: "You want to say the underlying hidden problem is getting worse. Choose the phrase.", options: ["el maco se pone más feo", "me están acabando la paciencia", "un pique del diablo", "No relaje conmigo"], correctAnswer: "el maco se pone más feo", explanation: "This means the hidden problem gets even worse.", points: 1, skillTag: "nuance" },
];

export const dominicanSpanishC2EmotionalConversationsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Quiz: Dominican C2 Emotional Conversations",
  subtitle: "Choose the right Dominican phrase for frankness, anger, evasiveness, apology, bait, and emotional repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c2", "quiz", "emotional-conversations", "register"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Test whether you can choose C2 Dominican emotional phrases according to context, intensity, and register.",
    passScore: 14,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
