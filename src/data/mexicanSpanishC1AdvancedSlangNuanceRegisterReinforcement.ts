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

const courseId = "mexican-spanish-c1-advanced-slang-nuance-and-register";
const skoolSectionName = "Mexican Spanish - C1 Advanced Slang, Nuance and Register";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const nuanceVocab: VocabItem[] = [
  { id: "dar-el-avion", term: "dar el avión", meaning: "to pretend to listen / brush someone off while acting agreeable", matchingMeaning: "pretend to listen", note: "Informal phrase for fake agreement or polite dismissal.", example: "No me des el avión; dime si sí te interesa.", translation: "Don’t pretend to listen; tell me if you’re actually interested.", starred: true },
  { id: "me-dio-el-avion", term: "me dio el avión", meaning: "he/she pretended to listen to me / brushed me off", matchingMeaning: "brushed me off", note: "Past form when someone acted agreeable but ignored you.", example: "Le expliqué todo y me dio el avión.", translation: "I explained everything and he brushed me off.", starred: true },
  { id: "pasarse-de-lanza", term: "pasarse de lanza", meaning: "to go too far / take unfair advantage", matchingMeaning: "go too far", note: "Strong informal phrase for crossing a fairness boundary.", example: "Cobrarle doble fue pasarse de lanza.", translation: "Charging her double was going too far.", starred: true },
  { id: "hacerla-de-pedo", term: "hacerla de pedo", meaning: "to make a big fuss / kick up a stink", matchingMeaning: "make a big fuss", note: "Vulgar and very informal; avoid in formal settings.", example: "No la hagas de pedo en la oficina.", translation: "Don’t make a big fuss at the office.", starred: true },
  { id: "echarle-crema", term: "echarle mucha crema a sus tacos", meaning: "to exaggerate / boast / oversell yourself", matchingMeaning: "exaggerate or boast", note: "Mexican idiom for making something sound bigger than it is.", example: "Dice que salvó todo el proyecto, pero le echó mucha crema a sus tacos.", translation: "He says he saved the whole project, but he exaggerated.", starred: true },
  { id: "sacar-de-onda", term: "sacar de onda", meaning: "to confuse / unsettle / throw someone off", matchingMeaning: "throw someone off", note: "Useful for emotional or social disorientation.", example: "Su comentario me pudo sacar de onda.", translation: "His comment could throw me off.", starred: true },
  { id: "me-saco-de-onda", term: "me sacó de onda", meaning: "it threw me off / confused me", matchingMeaning: "it threw me off", note: "Past-form reaction to something odd or unsettling.", example: "Me sacó de onda que cambiara la versión.", translation: "It threw me off that he changed the story.", starred: true },
  { id: "echar-carrilla", term: "echar carrilla", meaning: "to tease / rib someone / give someone a hard time", matchingMeaning: "tease someone", note: "Can be friendly, but context and repetition matter.", example: "Solo estábamos echando carrilla.", translation: "We were just teasing.", starred: true },
  { id: "no-te-claves", term: "no te claves", meaning: "don’t get hung up on it / don’t obsess over it", matchingMeaning: "don’t get hung up on it", note: "Casual advice to stop fixating on something.", example: "No te claves con ese mensaje.", translation: "Don’t get hung up on that message.", starred: true },
  { id: "clavarse", term: "clavarse", meaning: "to get overly invested / fixated / hung up", matchingMeaning: "get fixated", note: "Useful for emotional overinvestment.", example: "Se clavó con una crítica mínima.", translation: "He got fixated on one tiny criticism.", starred: true },
  { id: "se-me-hace-que", term: "se me hace que…", meaning: "I think… / I get the feeling that… / it seems to me…", matchingMeaning: "I get the feeling that", note: "Soft opinion marker, less blunt than creo que.", example: "Se me hace que no está diciendo todo.", translation: "I get the feeling he isn’t saying everything.", starred: true },
  { id: "salir-con-que", term: "salir con que…", meaning: "to suddenly come out with… / claim something unexpectedly", matchingMeaning: "suddenly claim", note: "Often used when someone unexpectedly changes the story.", example: "Ahora sale con que nunca prometió nada.", translation: "Now he suddenly claims he never promised anything.", starred: true },
  { id: "hacer-un-pancho", term: "hacer un pancho", meaning: "to make a scene / make a dramatic fuss", matchingMeaning: "make a scene", note: "Informal and dismissive; use carefully.", example: "Hizo un pancho por una corrección mínima.", translation: "He made a scene over a tiny correction.", starred: true },
  { id: "pura-pantalla", term: "pura pantalla", meaning: "all for show / just appearances", matchingMeaning: "all for show", note: "Skeptical phrase for fake image or performance.", example: "Su disculpa sonó a pura pantalla.", translation: "His apology sounded all for show.", starred: true },
  { id: "de-plano", term: "de plano", meaning: "really / outright / seriously / simply", matchingMeaning: "outright / seriously", note: "Strong emphasis depending on context.", example: "De plano no quiso responder.", translation: "He outright didn’t want to answer.", starred: true },
  { id: "para-acabarla-de-amolar", term: "para acabarla de amolar", meaning: "to make matters worse", matchingMeaning: "to make matters worse", note: "Adds another problem to an already tense story.", example: "Para acabarla de amolar, llegó tarde a la junta.", translation: "To make matters worse, he arrived late to the meeting.", starred: true },
  { id: "no-seas-mandado", term: "no seas mandado", meaning: "don’t take liberties / don’t push your luck / don’t be presumptuous", matchingMeaning: "don’t push your luck", note: "Warns someone not to overstep socially.", example: "No seas mandado pidiendo otra cosa.", translation: "Don’t push your luck by asking for something else.", starred: true },
  { id: "dar-atole-con-el-dedo", term: "dar atole con el dedo", meaning: "to string someone along / deceive them with empty promises", matchingMeaning: "string someone along", note: "Mexican idiom for placating someone with nonsense.", example: "Nos están dando atole con el dedo con tantas promesas.", translation: "They’re stringing us along with so many promises.", starred: true },
  { id: "agarrar-en-curva", term: "agarrar en curva", meaning: "to catch someone off guard / catch them unprepared", matchingMeaning: "catch someone off guard", note: "Use when someone is surprised and not ready.", example: "Esa pregunta me pudo agarrar en curva.", translation: "That question could catch me off guard.", starred: true },
  { id: "me-agarraron-en-curva", term: "me agarraron en curva", meaning: "they caught me off guard", matchingMeaning: "they caught me off guard", note: "Past-form chunk for being surprised in the moment.", example: "Me agarraron en curva con el cambio de tema.", translation: "They caught me off guard with the topic change.", starred: true },
  { id: "echarle-tierra", term: "echarle tierra a alguien", meaning: "to badmouth someone / speak negatively about them", matchingMeaning: "badmouth someone", note: "Informal phrase for damaging someone’s image.", example: "No le eches tierra a tu compañera en público.", translation: "Don’t badmouth your coworker in public.", starred: true },
  { id: "regarla", term: "regarla", meaning: "to mess up / screw up / make a mistake", matchingMeaning: "mess up", note: "Common Mexican phrase for making a mistake.", example: "Puedes regarla si respondes en caliente.", translation: "You can mess up if you answer while angry.", starred: true },
  { id: "la-regue", term: "la regué", meaning: "I messed up / I screwed up", matchingMeaning: "I messed up", note: "Accountability phrase after a mistake.", example: "La regué al mandar ese audio.", translation: "I messed up by sending that voice note.", starred: true },
  { id: "aguas-con-eso", term: "aguas con eso", meaning: "watch out with that / be careful with that", matchingMeaning: "watch out with that", note: "Mexican warning marker before a risky action.", example: "Aguas con eso, porque se puede malinterpretar.", translation: "Watch out with that, because it can be misunderstood.", starred: true },
  { id: "hacerse-ojo-de-hormiga", term: "hacerse ojo de hormiga", meaning: "to conveniently disappear / avoid dealing with something", matchingMeaning: "conveniently disappear", note: "Idiomatic way to say someone vanished to avoid responsibility.", example: "Cuando pidieron pruebas, se hizo ojo de hormiga.", translation: "When they asked for proof, he conveniently disappeared.", starred: true },
  { id: "salirse-con-la-suya", term: "salirse con la suya", meaning: "to get one’s own way / get away with what one wanted", matchingMeaning: "get away with it", note: "Used when someone succeeds despite being unfair.", example: "Si nadie dice nada, se sale con la suya.", translation: "If nobody says anything, he gets away with it.", starred: true },
  { id: "nomas-era-carrilla", term: "nomás era carrilla", meaning: "it was just teasing / just banter", matchingMeaning: "it was just teasing", note: "Explains intent, but can minimize impact if used badly.", example: "Nomás era carrilla, pero sonó pesado.", translation: "It was just teasing, but it sounded harsh.", starred: true },
  { id: "la-cosa-se-puso-rara", term: "la cosa se puso rara", meaning: "things got awkward / weird", matchingMeaning: "things got awkward", note: "Useful for naming an uncomfortable social shift.", example: "Después de su comentario, la cosa se puso rara.", translation: "After his comment, things got awkward.", starred: true },
  { id: "una-cosa-es-carrilla", term: "una cosa es echar carrilla y otra incomodar", meaning: "teasing is one thing; making someone uncomfortable is another", matchingMeaning: "teasing is one thing; making someone uncomfortable is another", note: "Boundary phrase for teasing that crosses a line.", example: "Una cosa es echar carrilla y otra incomodar a todo el equipo.", translation: "Teasing is one thing; making the whole team uncomfortable is another.", starred: true },
];

const highlightMap = Object.fromEntries(nuanceVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = nuanceVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC1AdvancedSlangNuanceRegisterFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C1: Advanced Slang, Nuance and Register Flashcards",
  subtitle: "Advanced Mexican Spanish for fake agreement, overstepping, teasing, image, excuses, and social repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "flashcards", "slang", "register"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: nuanceVocab.map(cardFromVocab) },
};

export const mexicanSpanishC1AdvancedSlangNuanceRegisterSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Mexican Slang and Register",
  subtitle: "Build nuanced Mexican Spanish for calling out fake agreement, overstepping, teasing, and awkward shifts.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "sentence-builder", "slang", "register"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 75-second Mexican Spanish voice note describing a socially awkward work situation, using register-aware slang without sounding reckless.",
    stages: [
      stage("stage-1", "Fake agreement", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2), "He brushed me off; he pretended to listen to me.", "Me dio el avión; solo hizo como que me escuchaba.", "This names fake agreement without immediately escalating.", breakdown([["brushed me off", "me dio el avión"], ["pretended", "hizo como que"], ["listened to me", "me escuchaba"]])),
      stage("stage-2", "Overstepping", sentenceVocab.slice(2, 5), sentenceVocab.slice(0, 5), "Making a fuss is one thing, but he went too far and oversold himself.", "Una cosa es hacerla de pedo, pero se pasó de lanza y le echó mucha crema a sus tacos.", "This contrasts complaint, unfair overstepping, and exaggeration.", breakdown([["make a big fuss", "hacerla de pedo"], ["went too far", "se pasó de lanza"], ["oversold himself", "le echó mucha crema a sus tacos"]])),
      stage("stage-3", "Feeling unsettled", sentenceVocab.slice(5, 11), sentenceVocab.slice(0, 11), "It threw me off, but don’t get hung up on it; I get the feeling there is something else.", "Me sacó de onda, pero no te claves; se me hace que hay algo más.", "This gives an emotional reaction and a softer inference.", breakdown([["it threw me off", "me sacó de onda"], ["don’t get hung up on it", "no te claves"], ["I get the feeling that", "se me hace que"]])),
      stage("stage-4", "Unexpected claim", sentenceVocab.slice(11, 16), sentenceVocab.slice(0, 16), "Now he suddenly claims it was all for show, and to make matters worse, things got awkward.", "Ahora sale con que era pura pantalla y, para acabarla de amolar, la cosa se puso rara.", "This narrates a sudden change of story plus social tension.", breakdown([["suddenly claims", "sale con que"], ["all for show", "pura pantalla"], ["things got awkward", "la cosa se puso rara"]])),
      stage("stage-5", "Warning a friend", sentenceVocab.slice(16, 20), sentenceVocab.slice(0, 20), "Don’t push your luck; watch out with that, because they can catch you off guard.", "No seas mandado; aguas con eso, porque te pueden agarrar en curva.", "This is protective advice before someone oversteps.", breakdown([["don’t push your luck", "no seas mandado"], ["watch out with that", "aguas con eso"], ["catch you off guard", "agarrar en curva"]])),
      stage("stage-6", "Empty promises", sentenceVocab.slice(17, 21), sentenceVocab.slice(0, 21), "They’re stringing us along, and when we asked for proof, he disappeared.", "Nos están dando atole con el dedo y, cuando pedimos pruebas, se hizo ojo de hormiga.", "This calls out evasive behavior and empty promises.", breakdown([["stringing us along", "dando atole con el dedo"], ["asked for proof", "pedimos pruebas"], ["disappeared", "se hizo ojo de hormiga"]])),
      stage("stage-7", "Own the mistake", sentenceVocab.slice(21, 24), sentenceVocab.slice(0, 24), "I messed up; I can mess things up if I answer while angry.", "La regué; puedo regarla si respondo en caliente.", "This turns slang into accountability, not just criticism.", breakdown([["I messed up", "la regué"], ["mess things up", "regarla"], ["while angry", "en caliente"]])),
      stage("stage-8", "Carrilla boundary", sentenceVocab.slice(24), sentenceVocab, "It was just teasing, but teasing is one thing and making someone uncomfortable is another.", "Nomás era carrilla, pero una cosa es echar carrilla y otra incomodar.", "This sets a mature register boundary around banter.", breakdown([["just teasing", "nomás era carrilla"], ["teasing", "echar carrilla"], ["making someone uncomfortable", "incomodar"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-nuance-story-q1", type: "multiple-choice", prompt: "After message 3, what problem does Andrea describe?", options: ["Mateo presented her idea as his own", "Mateo lost his phone", "Andrea missed a bus", "They are choosing a taco place"], correctAnswer: "Mateo presented her idea as his own", explanation: "Andrea says Mateo repeated her idea in the meeting as if he had invented it.", points: 1, skillTag: "gist" },
  { id: "mexican-c1-nuance-story-q2", type: "multiple-choice", prompt: "After message 6, how did Mateo treat Andrea earlier?", options: ["He pretended to listen and brushed her off", "He gave her full credit", "He apologized immediately", "He canceled the meeting"], correctAnswer: "He pretended to listen and brushed her off", explanation: "Andrea says me dio el avión when she explained the idea.", points: 1, skillTag: "detail" },
  { id: "mexican-c1-nuance-story-q3", type: "true-false", prompt: "After message 9, true or false: Diego thinks Mateo may have gone too far and exaggerated his role.", options: ["True", "False"], correctAnswer: "True", explanation: "Diego mentions pasarse de lanza and echarle crema a sus tacos.", points: 1, skillTag: "inference" },
  { id: "mexican-c1-nuance-story-q4", type: "multiple-choice", prompt: "After message 12, why should Andrea avoid making a scene?", options: ["It could make the situation look emotional instead of clear", "The meeting has not happened yet", "Mateo already fixed everything", "She is not involved"], correctAnswer: "It could make the situation look emotional instead of clear", explanation: "Diego warns against hacer un pancho or hacerla de pedo in the chat.", points: 1, skillTag: "register" },
  { id: "mexican-c1-nuance-story-q5", type: "multiple-choice", prompt: "After message 15, what does Andrea suspect?", options: ["Mateo is using appearances and empty promises", "Diego made the mistake", "The project is canceled", "Nobody heard the presentation"], correctAnswer: "Mateo is using appearances and empty promises", explanation: "She says it sounds like pura pantalla and dar atole con el dedo.", points: 1, skillTag: "subtext" },
  { id: "mexican-c1-nuance-story-q6", type: "multiple-choice", prompt: "After message 18, what does Diego advise Andrea not to do?", options: ["Badmouth Mateo publicly", "Save her notes", "Write a calm message", "Ask for credit"], correctAnswer: "Badmouth Mateo publicly", explanation: "Diego says not to echarle tierra in public.", points: 1, skillTag: "risk" },
  { id: "mexican-c1-nuance-story-q7", type: "true-false", prompt: "After message 21, true or false: Andrea admits that the situation caught her off guard.", options: ["True", "False"], correctAnswer: "True", explanation: "She says me agarraron en curva.", points: 1, skillTag: "emotion" },
  { id: "mexican-c1-nuance-story-q8", type: "multiple-choice", prompt: "After message 24, what line should Andrea use about the joking?", options: ["Teasing is one thing; making someone uncomfortable is another", "Everything was perfect", "She wants more teasing", "She forgot the meeting"], correctAnswer: "Teasing is one thing; making someone uncomfortable is another", explanation: "Diego suggests una cosa es echar carrilla y otra incomodar.", points: 1, skillTag: "boundary" },
  { id: "mexican-c1-nuance-story-q9", type: "multiple-choice", prompt: "After message 27, what does Andrea decide to do?", options: ["Send a calm message with receipts and no scene", "Start a public fight", "Disappear from work", "Let Mateo get away with everything"], correctAnswer: "Send a calm message with receipts and no scene", explanation: "Andrea drafts a calm message asking to clarify credit.", points: 1, skillTag: "outcome" },
  { id: "mexican-c1-nuance-story-q10", type: "multiple-choice", prompt: "By message 30, what is Diego’s final advice?", options: ["Stay firm without turning the situation into a mess", "Forget the project", "Make a bigger scene", "Only use jokes"], correctAnswer: "Stay firm without turning the situation into a mess", explanation: "Diego says firm without hacer un pancho and without giving him space to salirse con la suya.", points: 1, skillTag: "summary" },
];

export const mexicanSpanishC1AdvancedSlangNuanceRegisterWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C1 Story: The Idea He Tried to Steal",
  subtitle: "Andrea asks Diego how to call out a coworker who brushed her off, copied her idea, and made the room awkward.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "WhatsApp", "slang", "register"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "andrea", name: "Andrea", initials: "AN", side: "right", color: "violet" },
      { id: "diego", name: "Diego", initials: "DI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "andrea", "Diego, necesito filtro antes de contestar en el chat del equipo.", "Diego, I need a filter before answering in the team chat.", []),
      message("m2", "diego", "Aguas con eso. ¿Qué pasó?", "Watch out with that. What happened?", ["aguas con eso"]),
      message("m3", "andrea", "Mateo presentó mi idea como si fuera suya. De plano me sacó de onda.", "Mateo presented my idea as if it were his. Seriously, it threw me off.", ["de plano", "me sacó de onda", "sacar de onda"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "diego", "Uf. ¿Y tú ya se la habías explicado?", "Oof. And had you already explained it to him?", []),
      message("m5", "andrea", "Sí. La semana pasada le mandé notas y me dio el avión.", "Yes. Last week I sent him notes and he brushed me off.", ["me dio el avión", "dar el avión"]),
      message("m6", "andrea", "Literal dijo 'sí, sí, lo reviso' y luego salió con que él lo había pensado.", "He literally said 'yeah, yeah, I’ll review it' and then suddenly claimed he had thought of it.", ["salir con que…"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "diego", "Se me hace que te quiso medir, pero se pasó de lanza.", "I get the feeling he wanted to test you, but he went too far.", ["se me hace que…", "pasarse de lanza"]),
      message("m8", "andrea", "Y encima le echó mucha crema a sus tacos frente al jefe.", "And on top of that he oversold himself in front of the boss.", ["echarle mucha crema a sus tacos"]),
      message("m9", "diego", "Sí, una cosa es vender bien una idea y otra colgarse una que no es tuya.", "Yes, selling an idea well is one thing; taking credit for one that isn’t yours is another.", []),
      message("m10", "andrea", "Quiero escribir: 'no seas mandado, esa idea no era tuya'.", "I want to write: don’t push your luck, that idea wasn’t yours.", ["no seas mandado"]),
      message("m11", "diego", "No la hagas de pedo en el chat. Suena rico, pero te puede jugar en contra.", "Don’t make a big fuss in the chat. It sounds tempting, but it can work against you.", ["hacerla de pedo"]),
      message("m12", "diego", "Tampoco hagas un pancho. Mejor deja pruebas y pide aclarar el crédito.", "Don’t make a scene either. Better leave proof and ask to clarify the credit.", ["hacer un pancho"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "andrea", "Me molesta porque su disculpa después fue pura pantalla.", "It annoys me because his apology afterward was all for show.", ["pura pantalla"]),
      message("m14", "diego", "¿Te prometió corregirlo?", "Did he promise to fix it?", []),
      message("m15", "andrea", "Sí, pero siento que nos está dando atole con el dedo.", "Yes, but I feel like he’s stringing us along with empty promises.", ["dar atole con el dedo"]),
      message("m16", "diego", "Para acabarla de amolar, si no lo paras, se sale con la suya.", "To make matters worse, if you don’t stop it, he gets away with it.", ["para acabarla de amolar", "salirse con la suya"]),
      message("m17", "andrea", "Exacto. Pero no quiero verme intensa.", "Exactly. But I don’t want to look intense.", []),
      message("m18", "diego", "Entonces no le eches tierra en público. Habla del proceso, no de su persona.", "Then don’t badmouth him publicly. Talk about the process, not him as a person.", ["echarle tierra a alguien"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "andrea", "Buena. Puedo decir que el punto me agarró en curva.", "Good. I can say the point caught me off guard.", ["agarrar en curva"]),
      message("m20", "diego", "Sí. 'Me agarraron en curva porque esa propuesta venía de mis notas'.", "Yes. 'They caught me off guard because that proposal came from my notes.'", ["me agarraron en curva"]),
      message("m21", "andrea", "Me gusta. Así no digo directo: la regaste.", "I like it. That way I don’t directly say: you messed up.", ["la regué", "regarla"]),
      message("m22", "diego", "Exacto. Y no te claves con demostrar que él es malo; demuestra que el crédito importa.", "Exactly. And don’t get hung up on proving he’s bad; show that credit matters.", ["no te claves", "clavarse"]),
      message("m23", "andrea", "También estuvo echándome carrilla por preguntar.", "He was also teasing me for asking.", ["echar carrilla"]),
      message("m24", "diego", "Ahí sí: una cosa es echar carrilla y otra incomodar. Pon ese límite.", "There yes: teasing is one thing; making someone uncomfortable is another. Set that boundary.", ["una cosa es echar carrilla y otra incomodar"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "andrea", "Él seguro va a decir que nomás era carrilla.", "He’s definitely going to say it was just teasing.", ["nomás era carrilla"]),
      message("m26", "diego", "Y tú contestas: 'puede ser, pero la cosa se puso rara'.", "And you answer: 'maybe, but things got awkward.'", ["la cosa se puso rara"]),
      message("m27", "andrea", "Voy a mandar algo calmado con capturas y pedir que se aclare en la próxima junta.", "I’m going to send something calm with screenshots and ask that it be clarified in the next meeting.", []),
      message("m28", "diego", "Perfecto. Firme, sin hacer pancho y sin dejar que se haga ojo de hormiga.", "Perfect. Firm, without making a scene and without letting him conveniently disappear.", ["hacer un pancho", "hacerse ojo de hormiga"]),
      message("m29", "andrea", "Ya lo mandé. Corto, claro y sin insultos.", "I sent it. Short, clear, and without insults.", []),
      message("m30", "diego", "Bien. Eso es poner límite sin regalarle chance de salirse con la suya.", "Good. That’s setting a boundary without giving him a chance to get away with it.", ["salirse con la suya"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-c1-nuance-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: nuanceVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: nuanceVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft inference: se me hace que…",
        "Register control: hacerla de pedo, hacer un pancho, no seas mandado.",
        "Accountability and repair: la regué, aguas con eso, una cosa es echar carrilla y otra incomodar.",
      ],
      speakingPrompts: [
        "Describe a situation where someone brushed you off but later copied your idea.",
        "Warn a friend not to overreact in a public chat.",
        "Explain the difference between teasing and making someone uncomfortable.",
      ],
    },
    completionTask: {
      title: "Your Mexican C1 register-control voice note",
      instructions: "Record a 75-second Mexican Spanish voice note about someone overstepping. Use advanced slang, but control the tone so it sounds socially intelligent.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En español mexicano avanzado, muchas frases no solo dicen qué pasó: también muestran cómo lo estás evaluando. Si alguien te escucha con cara amable pero no toma en serio lo que dices, puedes decir que te «dio el avión». No es lo mismo que ignorarte abiertamente; es una forma más suave, y a veces más molesta, de hacer como que sí.", translation: "In advanced Mexican Spanish, many phrases do not only say what happened: they also show how you are evaluating it. If someone listens with a friendly face but does not take you seriously, you can say they gave you el avión. It is not the same as openly ignoring you; it is a softer, and sometimes more annoying, way of acting agreeable.", highlights: highlights(["dar el avión", "me dio el avión"]), shadowLine: "Me dio el avión, pero yo sí noté lo que estaba haciendo." },
  { id: "p2", text: "Cuando alguien cruza un límite de confianza, «pasarse de lanza» suena fuerte, pero muy natural. Si además arma drama, «hacerla de pedo» o «hacer un pancho» pueden describir la escena. Ojo: «hacerla de pedo» es vulgar y conviene reservarla para confianza o para analizar la frase, no para hablar en una junta.", translation: "When someone crosses a trust boundary, pasarse de lanza sounds strong, but very natural. If they also create drama, hacerla de pedo or hacer un pancho can describe the scene. Careful: hacerla de pedo is vulgar and should be reserved for close contexts or for analyzing the phrase, not for speaking in a meeting.", highlights: highlights(["pasarse de lanza", "hacerla de pedo", "hacer un pancho"]), shadowLine: "Se pasó de lanza, pero no conviene hacerla de pedo." },
  { id: "p3", text: "También existen frases para detectar exageración e imagen. «Echarle mucha crema a sus tacos» significa venderse de más, presumir o inflar una historia. Si todo parece actuación, puedes decir «pura pantalla». Estas frases sirven cuando alguien cuida más cómo se ve que lo que realmente hizo.", translation: "There are also phrases for detecting exaggeration and image. Echarle mucha crema a sus tacos means overselling yourself, boasting, or inflating a story. If everything seems like a performance, you can say pura pantalla. These phrases help when someone cares more about how they look than what they actually did.", highlights: highlights(["echarle mucha crema a sus tacos", "pura pantalla"]), shadowLine: "Le echó mucha crema a sus tacos y sonó a pura pantalla." },
  { id: "p4", text: "Para hablar de intuición, «se me hace que…» baja la intensidad. No acusa; sugiere. En cambio, «salir con que…» marca sorpresa o molestia porque alguien aparece con una versión inesperada. Si eso te descoloca, puedes decir «me sacó de onda» o «me agarraron en curva».", translation: "To talk about intuition, se me hace que lowers the intensity. It does not accuse; it suggests. By contrast, salir con que marks surprise or annoyance because someone comes out with an unexpected version. If that throws you off, you can say me sacó de onda or me agarraron en curva.", highlights: highlights(["se me hace que…", "salir con que…", "me sacó de onda", "sacar de onda", "me agarraron en curva", "agarrar en curva"]), shadowLine: "Se me hace que salió con otra versión y me sacó de onda." },
  { id: "p5", text: "En conflictos, «dar atole con el dedo» es una frase muy mexicana para promesas vacías. La persona te calma, te da largas y no resuelve. Si después desaparece, puedes decir que «se hizo ojo de hormiga». Y si nadie lo frena, quizá «se sale con la suya».", translation: "In conflicts, dar atole con el dedo is a very Mexican phrase for empty promises. The person calms you down, stalls, and does not solve anything. If they later disappear, you can say they made themselves ojo de hormiga. And if nobody stops them, maybe they get away with it.", highlights: highlights(["dar atole con el dedo", "hacerse ojo de hormiga", "salirse con la suya"]), shadowLine: "Nos dio atole con el dedo y luego se hizo ojo de hormiga." },
  { id: "p6", text: "No todo tiene que volverse ataque personal. «Aguas con eso» advierte antes de que alguien la riegue. «No seas mandado» frena a alguien que está tomando demasiadas libertades. Y si tú cometiste el error, «la regué» es una forma directa de reconocerlo.", translation: "Not everything has to become a personal attack. Aguas con eso warns before someone messes up. No seas mandado stops someone who is taking too many liberties. And if you made the mistake, la regué is a direct way to own it.", highlights: highlights(["aguas con eso", "no seas mandado", "regarla", "la regué"]), shadowLine: "Aguas con eso: si respondes así, la puedes regar." },
  { id: "p7", text: "La «carrilla» puede ser cariño, pero también puede incomodar. Decir «nomás era carrilla» explica la intención, no borra el efecto. Por eso una frase clave es «una cosa es echar carrilla y otra incomodar». Ahí el hablante pone un límite sin decir que toda broma está prohibida.", translation: "Carrilla can be affection, but it can also make someone uncomfortable. Saying it was just teasing explains the intention; it does not erase the effect. That is why a key phrase is teasing is one thing and making someone uncomfortable is another. There the speaker sets a boundary without saying every joke is forbidden.", highlights: highlights(["echar carrilla", "nomás era carrilla", "una cosa es echar carrilla y otra incomodar"]), shadowLine: "Una cosa es echar carrilla y otra incomodar." },
  { id: "p8", text: "A nivel C1, el reto es elegir el registro. Puedes pensar «de plano se pasó», pero quizá no conviene decirlo así frente al jefe. Puedes notar que «la cosa se puso rara» y bajar el tono. La meta no es saber más groserías; es usar el español local con precisión social.", translation: "At C1 level, the challenge is choosing the register. You may think de plano he went too far, but maybe it is not wise to say it like that in front of the boss. You can notice that things got awkward and soften the tone. The goal is not knowing more vulgar words; it is using local Spanish with social precision.", highlights: highlights(["de plano", "la cosa se puso rara"]), shadowLine: "La cosa se puso rara, así que toca cuidar el registro." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-nuance-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Using advanced Mexican slang with social and register control", "Making spontaneous taco plans", "Telling a beginner travel story", "Learning formal grammar only"], correctAnswer: "Using advanced Mexican slang with social and register control", explanation: "The reading explains slang, nuance, conflict, teasing, and when a phrase is too informal.", points: 1, skillTag: "gist" },
  { id: "mexican-c1-nuance-reading-q2", type: "multiple-choice", prompt: "Which phrase means someone pretended to listen or brushed you off?", options: ["Me dio el avión", "La regué", "Aguas con eso", "Con razón"], correctAnswer: "Me dio el avión", explanation: "Me dio el avión means the person acted like they listened but brushed you off.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-nuance-reading-q3", type: "true-false", prompt: "True or false: “hacerla de pedo” is vulgar and should be avoided in formal settings.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explicitly says it is vulgar and not for a meeting.", points: 1, skillTag: "register" },
  { id: "mexican-c1-nuance-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Teasing is one thing; making someone uncomfortable is another.", wordBank: ["Una", "cosa", "es", "echar", "carrilla", "y", "otra", "incomodar."], correctAnswer: "Una cosa es echar carrilla y otra incomodar.", explanation: "This phrase sets a boundary around teasing.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-c1-nuance-reading-q5", type: "multiple-choice", prompt: "Which phrase means empty promises or stringing someone along?", options: ["Dar atole con el dedo", "Echar carrilla", "Sacar de onda", "Hacer un pancho"], correctAnswer: "Dar atole con el dedo", explanation: "Dar atole con el dedo means placating or deceiving someone with empty promises.", points: 1, skillTag: "meaning" },
];

export const mexicanSpanishC1AdvancedSlangNuanceRegisterReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C1 Reading: Slang con Registro",
  subtitle: "A synced Spanish reading about Mexican slang, social risk, fake agreement, teasing, and register control.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "reading", "slang", "register"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: nuanceVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican C1 advanced-slang vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishC1AdvancedSlangNuanceRegisterQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish C1: Advanced Slang, Nuance and Register Quiz",
  subtitle: "Choose the right Mexican phrase for fake agreement, fuss, overstepping, teasing, awkwardness, and accountability.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "quiz", "slang", "register"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican C1 slang with attention to register, tone, social risk, and context.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-c1-nuance-quiz-1", type: "multiple-choice", prompt: "Someone acts like they agree but ignores your point. What fits?", options: ["Dar el avión", "Regarla", "Echar carrilla", "Salirse con la suya"], correctAnswer: "Dar el avión", explanation: "Dar el avión means pretending to listen or brushing someone off.", points: 1, skillTag: "fake-agreement" },
      { id: "mexican-c1-nuance-quiz-2", type: "fill-blank", prompt: "Complete: Se pasó de ____.", nativePrompt: "He went too far / took unfair advantage.", correctAnswer: "lanza", explanation: "Pasarse de lanza means to overstep or go too far.", points: 1, skillTag: "overstep" },
      { id: "mexican-c1-nuance-quiz-3", type: "multiple-choice", prompt: "Which phrase is vulgar and means to make a big fuss?", options: ["Hacerla de pedo", "Se me hace que", "Pura pantalla", "Aguas con eso"], correctAnswer: "Hacerla de pedo", explanation: "It is vulgar and very informal, so register matters.", points: 1, skillTag: "register" },
      { id: "mexican-c1-nuance-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "It threw me off.", wordBank: ["Me", "sacó", "de", "onda."], correctAnswer: "Me sacó de onda.", explanation: "This describes feeling confused or unsettled.", points: 1, skillTag: "reaction" },
      { id: "mexican-c1-nuance-quiz-5", type: "true-false", prompt: "True or false: “pura pantalla” means something is all for show.", options: ["True", "False"], correctAnswer: "True", explanation: "Pura pantalla points to appearances or performance.", points: 1, skillTag: "image" },
      { id: "mexican-c1-nuance-quiz-6", type: "multiple-choice", prompt: "Someone gives empty promises to keep people calm. What fits?", options: ["Dar atole con el dedo", "Clavarse", "Echar carrilla", "Agarrar en curva"], correctAnswer: "Dar atole con el dedo", explanation: "This idiom means stringing someone along with empty promises.", points: 1, skillTag: "deception" },
      { id: "mexican-c1-nuance-quiz-7", type: "fill-blank", prompt: "Complete: Aguas ____ eso.", nativePrompt: "Watch out with that.", correctAnswer: "con", explanation: "Aguas con eso is a Mexican warning phrase.", points: 1, skillTag: "warning" },
      { id: "mexican-c1-nuance-quiz-8", type: "multiple-choice", prompt: "You want to admit you messed up. Which phrase fits?", options: ["La regué", "Me dio el avión", "Pura pantalla", "No seas mandado"], correctAnswer: "La regué", explanation: "La regué means I messed up.", points: 1, skillTag: "accountability" },
      { id: "mexican-c1-nuance-quiz-9", type: "true-false", prompt: "True or false: “nomás era carrilla” can explain intention, but it may still minimize impact.", options: ["True", "False"], correctAnswer: "True", explanation: "The phrase says it was just teasing, but context still matters.", points: 1, skillTag: "nuance" },
      { id: "mexican-c1-nuance-quiz-10", type: "multiple-choice", prompt: "Which phrase means things got awkward or weird?", options: ["La cosa se puso rara", "Echarle tierra", "De plano", "No te claves"], correctAnswer: "La cosa se puso rara", explanation: "This names the awkward shift in the situation.", points: 1, skillTag: "awkwardness" },
      pairQuestion("mexican-c1-nuance-pairs-1", "Match fake-agreement, overstepping, and reaction phrases.", nuanceVocab.slice(0, 10)),
      pairQuestion("mexican-c1-nuance-pairs-2", "Match image, surprise, and empty-promise phrases.", nuanceVocab.slice(10, 20)),
      pairQuestion("mexican-c1-nuance-pairs-3", "Match accountability, teasing, and awkwardness phrases.", nuanceVocab.slice(20)),
    ],
  },
};
