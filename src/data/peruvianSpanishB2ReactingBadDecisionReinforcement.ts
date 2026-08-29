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

const courseId = "peruvian-spanish-b2-reacting-to-a-bad-decision";
const skoolSectionName = "Peruvian Spanish - B2 Reacting to a Bad Decision";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const badDecisionVocab: VocabItem[] = [
  { id: "no-pises-el-palito", term: "no pises el palito", meaning: "don’t fall for it / don’t take the bait / don’t fall into the trap", matchingMeaning: "don’t take the bait", note: "Warning when someone is about to be provoked or tricked.", example: "No pises el palito con ese comentario.", translation: "Don’t take the bait with that comment.", starred: true },
  { id: "te-vas-a-complicar-por-gusto", term: "te vas a complicar por gusto", meaning: "you’re going to make life difficult for yourself for no reason", matchingMeaning: "make life difficult for yourself", note: "Very useful Peruvian warning when the problem is avoidable.", example: "Si firmas hoy, te vas a complicar por gusto.", translation: "If you sign today, you’ll make life difficult for yourself for no reason.", starred: true },
  { id: "ponte-mosca", term: "ponte mosca", meaning: "stay sharp / be alert / wise up", matchingMeaning: "stay sharp", note: "Informal advice to pay attention before something goes wrong.", example: "Ponte mosca con esas condiciones.", translation: "Stay sharp with those conditions.", starred: true },
  { id: "mira-no-me-parece-buena-idea-ah", term: "mira, no me parece buena idea, ah", meaning: "look, I don’t think it’s a good idea", matchingMeaning: "I don’t think it’s a good idea", note: "Soft but clear Peruvian-style warning; ah adds spoken emphasis.", example: "Mira, no me parece buena idea, ah.", translation: "Look, I don’t think it’s a good idea.", starred: true },
  { id: "piensalo-bien-pe", term: "piénsalo bien, pe", meaning: "think it through carefully", matchingMeaning: "think it through", note: "Pe adds informal Peruvian emphasis.", example: "Piénsalo bien, pe, antes de responder.", translation: "Think it through carefully before answering.", starred: true },
  { id: "quedar-mal-parado", term: "quedar mal parado", meaning: "to come out looking bad / end up in a bad position", matchingMeaning: "end up looking bad", note: "Useful for warning about reputation or consequences.", example: "Puedes quedar mal parado con el equipo.", translation: "You can end up looking bad with the team.", starred: true },
  { id: "vas-a-quedar-mal-parado", term: "vas a quedar mal parado", meaning: "you’re going to come out looking bad", matchingMeaning: "you’re going to look bad", note: "Direct warning before someone makes a public mistake.", example: "Si escribes eso, vas a quedar mal parado.", translation: "If you write that, you’re going to look bad.", starred: true },
  { id: "meter-las-cuatro", term: "meter las cuatro", meaning: "to mess up badly / put your foot in it", matchingMeaning: "mess up badly", note: "Peruvian idiom for making a serious mistake.", example: "No quiero meter las cuatro en la reunión.", translation: "I don’t want to mess up badly in the meeting.", starred: true },
  { id: "no-metas-las-cuatro", term: "no metas las cuatro", meaning: "don’t mess it up / don’t put your foot in it", matchingMeaning: "don’t mess it up", note: "Warning when someone is about to say or do the wrong thing.", example: "No metas las cuatro por responder caliente.", translation: "Don’t mess it up by replying while angry.", starred: true },
  { id: "por-siaca", term: "por siaca", meaning: "just in case", matchingMeaning: "just in case", note: "Very common Peruvian shortening of por si acaso.", example: "Guarda el mensaje, por siaca.", translation: "Save the message, just in case.", starred: true },
  { id: "por-siaca-espera-un-poco", term: "por siaca, espera un poco", meaning: "just in case, wait a bit", matchingMeaning: "wait a bit just in case", note: "Practical delay phrase before a risky decision.", example: "Por siaca, espera un poco antes de aceptar.", translation: "Just in case, wait a bit before accepting.", starred: true },
  { id: "darle-una-vuelta", term: "darle una vuelta", meaning: "to think something over / reconsider it", matchingMeaning: "think it over", note: "Suggests reconsidering without ordering someone around.", example: "Dale una vuelta a la propuesta.", translation: "Think the proposal over.", starred: true },
  { id: "mejor-dale-una-vuelta-nomas", term: "mejor dale una vuelta, nomás", meaning: "better just think it over", matchingMeaning: "better think it over", note: "Soft advice with nomás to reduce pressure.", example: "Mejor dale una vuelta, nomás.", translation: "Better just think it over.", starred: true },
  { id: "no-la-hagas-larga", term: "no la hagas larga", meaning: "don’t drag it out / don’t make it complicated", matchingMeaning: "don’t drag it out", note: "Can mean simplify the situation or stop overcomplicating it.", example: "No la hagas larga: espera y pregunta bien.", translation: "Don’t drag it out: wait and ask properly.", starred: true },
  { id: "dejate-de-cosas", term: "déjate de cosas", meaning: "come on, stop messing around / be serious", matchingMeaning: "be serious", note: "Friendly but firm correction when someone is acting impulsively.", example: "Déjate de cosas y lee el contrato.", translation: "Be serious and read the contract.", starred: true },
  { id: "te-puede-salir-caro", term: "te puede salir caro", meaning: "it could cost you later / it could backfire badly", matchingMeaning: "it could backfire", note: "Warning about consequences, not just money.", example: "Responder así te puede salir caro.", translation: "Answering like that could cost you later.", starred: true },
  { id: "ojo", term: "ojo", meaning: "watch out / bear in mind / careful", matchingMeaning: "watch out", note: "Short warning marker before important information.", example: "Ojo, eso no está firmado.", translation: "Watch out, that isn’t signed.", starred: true },
  { id: "por-las-puras", term: "por las puras", meaning: "for no reason / unnecessarily / for nothing", matchingMeaning: "for no reason", note: "Peruvian phrase for pointless effort or trouble.", example: "Te estás molestando por las puras.", translation: "You’re getting upset for no reason.", starred: true },
  { id: "no-te-busques-problemas", term: "no te busques problemas por las puras", meaning: "don’t make trouble for yourself for no reason", matchingMeaning: "don’t make trouble for yourself", note: "Clear protective advice before someone enters a mess.", example: "No te busques problemas por las puras.", translation: "Don’t make trouble for yourself for no reason.", starred: true },
  { id: "me-vas-a-sacar-canas-verdes", term: "me vas a sacar canas verdes", meaning: "you’re going to give me gray hairs / you’re going to stress me out", matchingMeaning: "you’re going to stress me out", note: "Humorous emotional reaction to someone’s risky choices.", example: "Con tus ideas me vas a sacar canas verdes.", translation: "With your ideas you’re going to stress me out.", starred: true },
  { id: "yo-que-tu", term: "yo que tú…", meaning: "if I were you…", matchingMeaning: "if I were you", note: "Advice frame before giving a recommendation.", example: "Yo que tú, esperaría.", translation: "If I were you, I’d wait.", starred: true },
  { id: "yo-que-tu-no-me-meteria", term: "yo que tú, no me metería ahí, ah", meaning: "if I were you, I wouldn’t get involved in that", matchingMeaning: "I wouldn’t get involved", note: "Strong but friendly warning against entering a problem.", example: "Yo que tú, no me metería ahí, ah.", translation: "If I were you, I wouldn’t get involved in that.", starred: true },
  { id: "de-repente", term: "de repente", meaning: "maybe / perhaps, in common Peruvian usage", matchingMeaning: "maybe", note: "In Peru, de repente often works like maybe.", example: "De repente conviene esperar.", translation: "Maybe it’s better to wait.", starred: true },
  { id: "de-repente-mejor-espera", term: "de repente mejor espera", meaning: "maybe it’s better to wait", matchingMeaning: "maybe better wait", note: "Soft alternative to telling someone no.", example: "De repente mejor espera hasta mañana.", translation: "Maybe it’s better to wait until tomorrow.", starred: true },
  { id: "no-te-conviene-meterte", term: "no te conviene meterte en ese lío, pe", meaning: "it’s not in your interest to get involved in that mess", matchingMeaning: "it’s not in your interest to get involved", note: "Warns someone about entering a messy situation.", example: "No te conviene meterte en ese lío, pe.", translation: "It’s not in your interest to get involved in that mess.", starred: true },
  { id: "mandarse", term: "mandarse", meaning: "to go for it / take the plunge / do something bold or risky", matchingMeaning: "go for it", note: "Can be positive or risky depending on context.", example: "Si te vas a mandar, piensa primero.", translation: "If you’re going to go for it, think first.", starred: true },
  { id: "si-igual-te-vas-a-mandar", term: "si igual te vas a mandar…", meaning: "if you’re going to go ahead with it anyway…", matchingMeaning: "if you go ahead anyway", note: "Advice when the person probably won’t listen.", example: "Si igual te vas a mandar, hazlo con cabeza.", translation: "If you’re going to go ahead anyway, use your head.", starred: true },
  { id: "hazlo-con-cabeza", term: "hazlo con cabeza", meaning: "do it sensibly / use your head", matchingMeaning: "use your head", note: "Practical final warning before a risky choice.", example: "Hazlo con cabeza y guarda pruebas.", translation: "Use your head and save proof.", starred: true },
  { id: "te-lo-dije", term: "te lo dije", meaning: "I told you so", matchingMeaning: "I told you so", note: "After-the-fact phrase; can sound teasing or harsh.", example: "Te lo dije, pero no quisiste escuchar.", translation: "I told you so, but you didn’t want to listen.", starred: true },
  { id: "mejor-busca-otra-salida", term: "mejor busca otra salida, nomás", meaning: "better just look for another option / another way out", matchingMeaning: "look for another option", note: "Redirects the person toward a safer solution.", example: "Mejor busca otra salida, nomás.", translation: "Better just look for another option.", starred: true },
  { id: "roche", term: "roche", meaning: "embarrassment / awkwardness / an embarrassing situation", matchingMeaning: "embarrassment", note: "Very Peruvian social embarrassment word.", example: "Qué roche si todo sale mal.", translation: "How embarrassing if everything goes wrong.", starred: true },
  { id: "ahorrarse-el-roche", term: "ahorrarse el roche", meaning: "to save yourself the embarrassment", matchingMeaning: "save yourself the embarrassment", note: "Useful when avoiding a public mistake.", example: "Puedes ahorrarte el roche si esperas.", translation: "You can save yourself the embarrassment if you wait.", starred: true },
  { id: "asi-te-ahorras-el-roche", term: "así te ahorras el roche", meaning: "that way you save yourself the embarrassment", matchingMeaning: "that way you save the embarrassment", note: "Gives a practical reason to choose the safer option.", example: "Pregunta primero; así te ahorras el roche.", translation: "Ask first; that way you save yourself the embarrassment.", starred: true },
];

const highlightMap = Object.fromEntries(badDecisionVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = badDecisionVocab.map((item) => `${item.term} = ${item.meaning}`);

export const peruvianSpanishB2ReactingBadDecisionFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Peruvian Spanish B2: Reacting to a Bad Decision Flashcards",
  subtitle: "Peruvian warning phrases for bad ideas, traps, consequences, embarrassment, and smarter alternatives.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "flashcards", "bad decisions", "advice"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: badDecisionVocab.map(cardFromVocab) },
};

export const peruvianSpanishB2ReactingBadDecisionSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Peruvian Bad-Decision Warnings",
  subtitle: "Build natural Peruvian Spanish warnings for risky moves, public embarrassment, traps, and better exits.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["peruvian-spanish", "b2", "sentence-builder", "warnings", "decisions"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Peruvian Spanish voice note warning a friend against a bad decision, explaining the risk, and offering a safer alternative.",
    stages: [
      stage("stage-1", "Don’t take the bait", sentenceVocab.slice(0, 5), sentenceVocab.slice(0, 5), "Look, I don’t think it’s a good idea. Don’t take the bait and think it through.", "Mira, no me parece buena idea, ah. No pises el palito y piénsalo bien, pe.", "This is a direct but friendly warning before someone acts emotionally.", breakdown([["I don’t think it’s a good idea", "no me parece buena idea"], ["don’t take the bait", "no pises el palito"], ["think it through", "piénsalo bien, pe"]])),
      stage("stage-2", "Avoid looking bad", sentenceVocab.slice(5, 9), sentenceVocab.slice(0, 9), "You’re going to look bad, so don’t mess it up.", "Vas a quedar mal parado, así que no metas las cuatro.", "This warns about reputation and consequences.", breakdown([["you’re going to look bad", "vas a quedar mal parado"], ["so", "así que"], ["don’t mess it up", "no metas las cuatro"]])),
      stage("stage-3", "Wait just in case", sentenceVocab.slice(9, 13), sentenceVocab.slice(0, 13), "Just in case, wait a bit. Better just think it over.", "Por siaca, espera un poco. Mejor dale una vuelta, nomás.", "This slows down the decision without sounding bossy.", breakdown([["just in case", "por siaca"], ["wait a bit", "espera un poco"], ["think it over", "dale una vuelta"]])),
      stage("stage-4", "Name consequences", sentenceVocab.slice(13, 20), sentenceVocab.slice(0, 20), "Be serious: it could backfire. Don’t make trouble for yourself for no reason.", "Déjate de cosas: te puede salir caro. No te busques problemas por las puras.", "Use this when the risk is bigger than the benefit.", breakdown([["be serious", "déjate de cosas"], ["it could backfire", "te puede salir caro"], ["for no reason", "por las puras"]])),
      stage("stage-5", "Give personal advice", sentenceVocab.slice(20, 25), sentenceVocab.slice(0, 25), "If I were you, I wouldn’t get involved in that mess. Maybe it’s better to wait.", "Yo que tú, no me metería ahí, ah. De repente mejor espera.", "This gives strong advice while still sounding like a friend.", breakdown([["if I were you", "yo que tú"], ["I wouldn’t get involved", "no me metería ahí"], ["maybe it’s better to wait", "de repente mejor espera"]])),
      stage("stage-6", "If you go ahead", sentenceVocab.slice(25, 29), sentenceVocab.slice(0, 29), "If you’re going to go ahead anyway, use your head.", "Si igual te vas a mandar, hazlo con cabeza.", "This is the backup warning when the friend may ignore you.", breakdown([["if you go ahead anyway", "si igual te vas a mandar"], ["use your head", "hazlo con cabeza"]])),
      stage("stage-7", "Avoid embarrassment", sentenceVocab.slice(29, 33), sentenceVocab, "Better just look for another option. That way you save yourself the embarrassment.", "Mejor busca otra salida, nomás. Así te ahorras el roche.", "This redirects the person away from the bad choice.", breakdown([["look for another option", "busca otra salida"], ["that way", "así"], ["you save yourself the embarrassment", "te ahorras el roche"]])),
      stage("stage-8", "Final warning", sentenceVocab.slice(1, 4).concat(sentenceVocab.slice(16, 20)), sentenceVocab, "Watch out, you’re going to make life difficult for yourself for no reason and stress me out.", "Ojo, te vas a complicar por gusto y me vas a sacar canas verdes.", "This sounds protective and slightly humorous, not cold.", breakdown([["watch out", "ojo"], ["make life difficult for yourself", "te vas a complicar"], ["stress me out", "me vas a sacar canas verdes"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "peruvian-b2-bad-decision-story-q1", type: "multiple-choice", prompt: "After message 3, what does Diego want to do?", options: ["Answer his cousin publicly in the family chat", "Buy a new car", "Cancel a birthday party", "Ask Valeria for transport directions"], correctAnswer: "Answer his cousin publicly in the family chat", explanation: "Diego says he wants to answer in the family chat tonight.", points: 1, skillTag: "gist" },
  { id: "peruvian-b2-bad-decision-story-q2", type: "multiple-choice", prompt: "After message 6, why does Valeria warn Diego?", options: ["He might make life difficult for himself and look bad", "He has already solved everything", "His cousin apologized clearly", "The message is about food"], correctAnswer: "He might make life difficult for himself and look bad", explanation: "Valeria says te vas a complicar por gusto and vas a quedar mal parado.", points: 1, skillTag: "consequence" },
  { id: "peruvian-b2-bad-decision-story-q3", type: "true-false", prompt: "After message 9, true or false: Valeria tells Diego to wait and think it over.", options: ["True", "False"], correctAnswer: "True", explanation: "She says por siaca, espera un poco and mejor dale una vuelta, nomás.", points: 1, skillTag: "advice" },
  { id: "peruvian-b2-bad-decision-story-q4", type: "multiple-choice", prompt: "After message 12, what risk does Valeria mention?", options: ["The screenshot could backfire later", "The phone battery is low", "The cousin invited them to dinner", "Diego lost his keys"], correctAnswer: "The screenshot could backfire later", explanation: "Valeria says a screenshot te puede salir caro.", points: 1, skillTag: "risk" },
  { id: "peruvian-b2-bad-decision-story-q5", type: "multiple-choice", prompt: "After message 15, what does Diego admit?", options: ["He is angry and almost sent the message", "He already deleted the chat", "He wants to pay a bill", "He never saw the message"], correctAnswer: "He is angry and almost sent the message", explanation: "Diego says the comment gave him anger and he almost sent the message.", points: 1, skillTag: "emotion" },
  { id: "peruvian-b2-bad-decision-story-q6", type: "multiple-choice", prompt: "After message 18, what does Valeria advise if Diego acts anyway?", options: ["Use his head and keep proof", "Write in all caps", "Invite everyone to argue", "Forget the screenshots"], correctAnswer: "Use his head and keep proof", explanation: "Valeria says si igual te vas a mandar, hazlo con cabeza and guarda pruebas.", points: 1, skillTag: "backup-advice" },
  { id: "peruvian-b2-bad-decision-story-q7", type: "true-false", prompt: "After message 21, true or false: Diego has decided to call instead of writing publicly.", options: ["True", "False"], correctAnswer: "True", explanation: "Diego says he will call his aunt first, not write in the family chat.", points: 1, skillTag: "change-plan" },
  { id: "peruvian-b2-bad-decision-story-q8", type: "multiple-choice", prompt: "After message 24, what safer option does Valeria suggest?", options: ["Ask calmly and save himself the embarrassment", "Ignore the issue forever", "Post everything publicly", "Send money by Yape"], correctAnswer: "Ask calmly and save himself the embarrassment", explanation: "She says ask calmly and así te ahorras el roche.", points: 1, skillTag: "alternative" },
  { id: "peruvian-b2-bad-decision-story-q9", type: "multiple-choice", prompt: "After message 27, what does Diego realize?", options: ["He was about to make trouble for himself for no reason", "He needs to buy a new phone", "Valeria started the family fight", "The message was about a party"], correctAnswer: "He was about to make trouble for himself for no reason", explanation: "Diego says he was going to buscarse problemas por las puras.", points: 1, skillTag: "reflection" },
  { id: "peruvian-b2-bad-decision-story-q10", type: "multiple-choice", prompt: "By message 30, what is the final decision?", options: ["Diego waits, calls calmly, and avoids the public fight", "Diego sends the angry public message", "Valeria joins the argument", "They make the problem bigger"], correctAnswer: "Diego waits, calls calmly, and avoids the public fight", explanation: "They end with the safer plan: wait, call calmly, and avoid the roche.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const peruvianSpanishB2ReactingBadDecisionWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Peruvian B2 Story: The Family Chat Trap",
  subtitle: "Valeria tries to stop Diego from replying publicly to a messy family accusation.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "WhatsApp", "bad decisions", "advice"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "valeria", name: "Valeria", initials: "VA", side: "right", color: "violet" },
      { id: "diego", name: "Diego", initials: "DI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "diego", "Vale, mi primo acaba de soltar una acusación en el chat familiar.", "Vale, my cousin just dropped an accusation in the family chat.", []),
      message("m2", "valeria", "Ojo. ¿Qué dijo exactamente?", "Watch out. What exactly did he say?", ["ojo"]),
      message("m3", "diego", "Dijo que yo me quedé con plata de la rifa. Quiero responderle ahí mismo, delante de todos.", "He said I kept money from the raffle. I want to answer him right there, in front of everyone.", [], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "valeria", "Mira, no me parece buena idea, ah. No pises el palito.", "Look, I don’t think it’s a good idea. Don’t take the bait.", ["mira, no me parece buena idea, ah", "no pises el palito"]),
      message("m5", "diego", "Pero si me quedo callado, todos van a pensar que es verdad.", "But if I stay quiet, everyone will think it’s true.", []),
      message("m6", "valeria", "Te vas a complicar por gusto y vas a quedar mal parado si respondes caliente.", "You’re going to make life difficult for yourself for no reason and look bad if you answer angry.", ["te vas a complicar por gusto", "vas a quedar mal parado", "quedar mal parado"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "diego", "Ese pata me quiere provocar, clarísimo.", "That guy wants to provoke me, clearly.", []),
      message("m8", "valeria", "Por eso, ponte mosca. No metas las cuatro por orgullo.", "That’s why, stay sharp. Don’t mess it up because of pride.", ["ponte mosca", "no metas las cuatro", "meter las cuatro"]),
      message("m9", "valeria", "Por siaca, espera un poco. Mejor dale una vuelta, nomás.", "Just in case, wait a bit. Better just think it over.", ["por siaca, espera un poco", "por siaca", "mejor dale una vuelta, nomás", "darle una vuelta"]),
      message("m10", "diego", "No quiero hacerla larga, pero tampoco quiero quedar como culpable.", "I don’t want to drag it out, but I also don’t want to look guilty.", ["no la hagas larga"]),
      message("m11", "valeria", "Déjate de cosas: un pantallazo de tu respuesta te puede salir caro.", "Be serious: a screenshot of your answer could backfire later.", ["déjate de cosas", "te puede salir caro"]),
      message("m12", "diego", "Ya, pero me da roche que mi tía esté leyendo todo eso.", "Okay, but it embarrasses me that my aunt is reading all of that.", ["roche"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "valeria", "Te entiendo, pero no te busques problemas por las puras.", "I get you, but don’t make trouble for yourself for no reason.", ["no te busques problemas por las puras", "por las puras"]),
      message("m14", "diego", "Me vas a sacar canas verdes tú también con tanta calma.", "You’re also going to stress me out with so much calm.", ["me vas a sacar canas verdes"]),
      message("m15", "diego", "Estoy con cólera, ya tenía el mensaje escrito.", "I’m angry; I already had the message written.", []),
      message("m16", "valeria", "Yo que tú, no me metería ahí, ah. Ese lío viene de antes.", "If I were you, I wouldn’t get involved in that. That mess comes from before.", ["yo que tú, no me metería ahí, ah", "yo que tú…"]),
      message("m17", "diego", "De repente mejor espera, ¿no?", "Maybe it’s better to wait, right?", ["de repente mejor espera", "de repente"]),
      message("m18", "valeria", "Exacto. Y si igual te vas a mandar, hazlo con cabeza: guarda pruebas y habla directo.", "Exactly. And if you’re going to go ahead anyway, use your head: save proof and speak directly.", ["si igual te vas a mandar…", "mandarse", "hazlo con cabeza"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "diego", "No te conviene meterte en ese lío, pe... eso me dirías, ¿no?", "It’s not in your interest to get involved in that mess... that’s what you’d tell me, right?", ["no te conviene meterte en ese lío, pe"]),
      message("m20", "valeria", "Sí. No por miedo, sino porque responder en grupo te deja sin control.", "Yes. Not out of fear, but because replying in the group leaves you with no control.", []),
      message("m21", "diego", "Ya. Voy a llamar primero a mi tía, no al chat familiar.", "Okay. I’m going to call my aunt first, not the family chat.", []),
      message("m22", "valeria", "Mejor busca otra salida, nomás. Habla con ella y pide que revise las cuentas.", "Better just look for another option. Talk to her and ask her to check the accounts.", ["mejor busca otra salida, nomás"]),
      message("m23", "diego", "Así me ahorro el roche si al final todo fue una confusión.", "That way I save myself the embarrassment if everything was a misunderstanding in the end.", ["así te ahorras el roche", "ahorrarse el roche"]),
      message("m24", "valeria", "Eso. Pregunta tranquilo, por siaca guarda capturas y no entres al show.", "Exactly. Ask calmly, just in case save screenshots, and don’t enter the show.", ["por siaca"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "diego", "Pucha, casi mando el audio al grupo.", "Damn, I almost sent the voice note to the group.", []),
      message("m26", "valeria", "Te lo dije: estabas por pisar el palito.", "I told you so: you were about to take the bait.", ["te lo dije", "no pises el palito"]),
      message("m27", "diego", "Sí, me iba a buscar problemas por las puras.", "Yeah, I was going to make trouble for myself for no reason.", ["por las puras"]),
      message("m28", "valeria", "Respira. No la hagas larga: llama, aclara y listo.", "Breathe. Don’t drag it out: call, clarify, and done.", ["no la hagas larga"]),
      message("m29", "diego", "Ya. Piénsalo bien, pe, me decía mi abuela. Hoy le hago caso.", "Okay. Think it through carefully, my grandma used to tell me. Today I’ll listen.", ["piénsalo bien, pe"]),
      message("m30", "valeria", "Bien. Hoy no hay pelea pública. Así te ahorras el roche.", "Good. Today there’s no public fight. That way you save yourself the embarrassment.", ["así te ahorras el roche"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `peruvian-b2-bad-decision-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: badDecisionVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: badDecisionVocab.map((item) => item.term),
      grammarPatterns: [
        "Warning against traps: no pises el palito, ponte mosca, ojo.",
        "Consequences: te vas a complicar por gusto, vas a quedar mal parado, te puede salir caro.",
        "Safer advice: dale una vuelta, espera un poco, busca otra salida, hazlo con cabeza.",
      ],
      speakingPrompts: [
        "Warn a friend not to reply while angry.",
        "Explain why a public message could backfire.",
        "Give a safer alternative using Peruvian Spanish.",
      ],
    },
    completionTask: {
      title: "Your Peruvian B2 bad decision warning",
      instructions: "Record a 60-second Peruvian Spanish voice note warning a friend not to make a bad decision. Mention the risk, the embarrassment, and a better option.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Cuando un amigo está por tomar una mala decisión, lo primero es bajarle la velocidad. Puedes empezar con “mira, no me parece buena idea, ah”. No suena frío; suena como una advertencia honesta. Si la otra persona está reaccionando por orgullo, también sirve decir “no pises el palito”.", translation: "When a friend is about to make a bad decision, the first thing is to slow them down. You can start with mira, no me parece buena idea, ah. It does not sound cold; it sounds like an honest warning. If the other person is reacting out of pride, no pises el palito also works.", highlights: highlights(["mira, no me parece buena idea, ah", "no pises el palito"]), shadowLine: "Mira, no me parece buena idea, ah. No pises el palito." },
  { id: "p2", text: "En Perú, “ponte mosca” significa estar atento antes de que algo te gane. Si alguien va a responder caliente en público, puedes decir “piénsalo bien, pe”. La idea no es controlar a la persona, sino ayudarla a ver lo que todavía no está viendo.", translation: "In Peru, ponte mosca means to stay alert before something gets the better of you. If someone is going to respond angrily in public, you can say piénsalo bien, pe. The idea is not to control the person, but to help them see what they are not seeing yet.", highlights: highlights(["ponte mosca", "piénsalo bien, pe"]), shadowLine: "Ponte mosca y piénsalo bien, pe." },
  { id: "p3", text: "Muchas malas decisiones no parecen graves al inicio. Pero si actúas sin pensar, puedes “quedar mal parado” o “meter las cuatro”. Por eso una frase útil es “vas a quedar mal parado”. Suena directa, pero a veces un amigo necesita escuchar la consecuencia completa.", translation: "Many bad decisions do not seem serious at first. But if you act without thinking, you can end up looking bad or mess up badly. That is why vas a quedar mal parado is useful. It sounds direct, but sometimes a friend needs to hear the full consequence.", highlights: highlights(["quedar mal parado", "meter las cuatro", "vas a quedar mal parado"]), shadowLine: "Vas a quedar mal parado si metes las cuatro." },
  { id: "p4", text: "Para ganar tiempo, “por siaca” es perfecto. Puedes decir “por siaca, espera un poco” o “mejor dale una vuelta, nomás”. Ambas frases frenan el impulso sin humillar a la otra persona. También ayudan a evitar problemas “por las puras”.", translation: "To buy time, por siaca is perfect. You can say por siaca, espera un poco or mejor dale una vuelta, nomás. Both phrases slow the impulse without humiliating the other person. They also help avoid problems for no reason.", highlights: highlights(["por siaca", "por siaca, espera un poco", "mejor dale una vuelta, nomás", "darle una vuelta", "por las puras"]), shadowLine: "Por siaca, espera un poco y dale una vuelta." },
  { id: "p5", text: "Cuando el riesgo es serio, toca ser más claro. “Déjate de cosas” significa: basta de vueltas, sé serio. “Te puede salir caro” advierte que la decisión puede traer consecuencias después. Y “no te busques problemas por las puras” resume toda la idea.", translation: "When the risk is serious, you need to be clearer. Déjate de cosas means: enough messing around, be serious. Te puede salir caro warns that the decision can bring consequences later. And no te busques problemas por las puras sums up the whole idea.", highlights: highlights(["déjate de cosas", "te puede salir caro", "no te busques problemas por las puras", "ojo"]), shadowLine: "Déjate de cosas; te puede salir caro." },
  { id: "p6", text: "También puedes aconsejar desde tu punto de vista: “yo que tú…”. Si el problema es un lío ajeno, “yo que tú, no me metería ahí, ah” suena protector. En Perú, “de repente” muchas veces significa quizá, por eso “de repente mejor espera” baja la presión.", translation: "You can also advise from your point of view: yo que tú. If the problem is someone else’s mess, yo que tú, no me metería ahí, ah sounds protective. In Peru, de repente often means maybe, so de repente mejor espera lowers the pressure.", highlights: highlights(["yo que tú…", "yo que tú, no me metería ahí, ah", "de repente", "de repente mejor espera", "no te conviene meterte en ese lío, pe"]), shadowLine: "Yo que tú, no me metería ahí, ah." },
  { id: "p7", text: "A veces el amigo igual se va a mandar. “Mandarse” puede ser lanzarse o tomar una decisión arriesgada. En ese caso, no basta decir “no”. Puedes decir “si igual te vas a mandar, hazlo con cabeza”. Así dejas una salida más inteligente.", translation: "Sometimes the friend is going to go ahead anyway. Mandarse can mean taking the plunge or making a risky move. In that case, saying no is not enough. You can say si igual te vas a mandar, hazlo con cabeza. That way you leave a smarter way out.", highlights: highlights(["mandarse", "si igual te vas a mandar…", "hazlo con cabeza"]), shadowLine: "Si igual te vas a mandar, hazlo con cabeza." },
  { id: "p8", text: "Después de una mala decisión, “te lo dije” puede salir natural, pero úsalo con cuidado. Mejor ofrecer otra ruta: “mejor busca otra salida, nomás”. Si la persona evita una escena pública, puedes cerrar con “así te ahorras el roche”. En el fondo, estás cuidando su imagen y su calma.", translation: "After a bad decision, te lo dije can come out naturally, but use it carefully. It is better to offer another route: mejor busca otra salida, nomás. If the person avoids a public scene, you can close with así te ahorras el roche. Deep down, you are protecting their image and their calm.", highlights: highlights(["te lo dije", "mejor busca otra salida, nomás", "roche", "ahorrarse el roche", "así te ahorras el roche"]), shadowLine: "Mejor busca otra salida; así te ahorras el roche." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "peruvian-b2-bad-decision-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Warning someone before they make a bad decision", "Splitting a restaurant bill", "Reading social cues at a party", "Negotiating professional scope"], correctAnswer: "Warning someone before they make a bad decision", explanation: "The reading explains Peruvian phrases for slowing someone down and giving safer advice.", points: 1, skillTag: "gist" },
  { id: "peruvian-b2-bad-decision-reading-q2", type: "multiple-choice", prompt: "Which phrase means “don’t take the bait”?", options: ["No pises el palito", "Mejor busca otra salida", "Te lo dije", "Por siaca"], correctAnswer: "No pises el palito", explanation: "No pises el palito warns someone not to fall into the trap.", points: 1, skillTag: "meaning" },
  { id: "peruvian-b2-bad-decision-reading-q3", type: "true-false", prompt: "True or false: “por siaca, espera un poco” helps slow down an impulsive decision.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says this phrase buys time before acting.", points: 1, skillTag: "advice" },
  { id: "peruvian-b2-bad-decision-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "If I were you, I wouldn’t get involved there.", wordBank: ["Yo", "que", "tú,", "no", "me", "metería", "ahí,", "ah."], correctAnswer: "Yo que tú, no me metería ahí, ah.", explanation: "This gives protective advice against entering a mess.", points: 1, skillTag: "phrase-building" },
  { id: "peruvian-b2-bad-decision-reading-q5", type: "multiple-choice", prompt: "Which phrase means “that way you save yourself the embarrassment”?", options: ["Así te ahorras el roche", "No la hagas larga", "Ponte mosca", "Te vas a complicar por gusto"], correctAnswer: "Así te ahorras el roche", explanation: "Roche is embarrassment or awkwardness, and ahorrarse el roche means saving yourself from it.", points: 1, skillTag: "meaning" },
];

export const peruvianSpanishB2ReactingBadDecisionReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Peruvian B2 Reading: No Pises el Palito",
  subtitle: "A synced Spanish reading about warning a friend, avoiding public embarrassment, and choosing a smarter exit.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "reading", "bad decisions", "advice"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: badDecisionVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Peruvian B2 reacting-to-a-bad-decision vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const peruvianSpanishB2ReactingBadDecisionQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Peruvian Spanish B2: Reacting to a Bad Decision Quiz",
  subtitle: "Choose the right Peruvian phrase for traps, consequences, embarrassment, warnings, and safer options.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "quiz", "bad decisions", "advice"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Peruvian B2 phrases for warning someone before a bad decision, slowing them down, and suggesting a smarter alternative.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "peruvian-b2-bad-decision-quiz-1", type: "multiple-choice", prompt: "Your friend is about to react to a provocation. What fits?", options: ["No pises el palito", "Te lo dije", "Roche", "De repente"], correctAnswer: "No pises el palito", explanation: "This means don’t take the bait or fall into the trap.", points: 1, skillTag: "warning" },
      { id: "peruvian-b2-bad-decision-quiz-2", type: "fill-blank", prompt: "Complete: Ponte ____.", nativePrompt: "Stay sharp.", correctAnswer: "mosca", explanation: "Ponte mosca means stay sharp or be alert.", points: 1, skillTag: "alertness" },
      { id: "peruvian-b2-bad-decision-quiz-3", type: "multiple-choice", prompt: "Someone may look bad if they post publicly. Which phrase fits?", options: ["Vas a quedar mal parado", "Por siaca", "No la hagas larga", "Te lo dije"], correctAnswer: "Vas a quedar mal parado", explanation: "This warns that the person will come out looking bad.", points: 1, skillTag: "reputation" },
      { id: "peruvian-b2-bad-decision-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Just in case, wait a bit.", wordBank: ["Por", "siaca,", "espera", "un", "poco."], correctAnswer: "Por siaca, espera un poco.", explanation: "This slows a risky decision down.", points: 1, skillTag: "delay" },
      { id: "peruvian-b2-bad-decision-quiz-5", type: "true-false", prompt: "True or false: “te puede salir caro” can mean the decision could backfire later.", options: ["True", "False"], correctAnswer: "True", explanation: "It can refer to consequences, not only literal money.", points: 1, skillTag: "consequence" },
      { id: "peruvian-b2-bad-decision-quiz-6", type: "multiple-choice", prompt: "You want to advise someone not to enter a messy situation. What fits?", options: ["Yo que tú, no me metería ahí, ah", "Así te ahorras el roche", "Me vas a sacar canas verdes", "Te lo dije"], correctAnswer: "Yo que tú, no me metería ahí, ah", explanation: "This means if I were you, I wouldn’t get involved there.", points: 1, skillTag: "advice" },
      { id: "peruvian-b2-bad-decision-quiz-7", type: "fill-blank", prompt: "Complete: No te busques problemas por las ____.", nativePrompt: "Don’t make trouble for yourself for no reason.", correctAnswer: "puras", explanation: "Por las puras means for no reason or unnecessarily.", points: 1, skillTag: "avoid-trouble" },
      { id: "peruvian-b2-bad-decision-quiz-8", type: "multiple-choice", prompt: "Your friend will probably go ahead anyway. What backup advice fits?", options: ["Si igual te vas a mandar, hazlo con cabeza", "No la hagas larga", "Te lo dije", "Roche"], correctAnswer: "Si igual te vas a mandar, hazlo con cabeza", explanation: "This says if you go ahead anyway, use your head.", points: 1, skillTag: "backup-advice" },
      { id: "peruvian-b2-bad-decision-quiz-9", type: "true-false", prompt: "True or false: “roche” means embarrassment or an awkward situation.", options: ["True", "False"], correctAnswer: "True", explanation: "Roche is a key Peruvian word for embarrassment or awkwardness.", points: 1, skillTag: "meaning" },
      { id: "peruvian-b2-bad-decision-quiz-10", type: "multiple-choice", prompt: "You want to suggest a safer option instead. Which phrase fits?", options: ["Mejor busca otra salida, nomás", "Meter las cuatro", "Te vas a complicar por gusto", "Me vas a sacar canas verdes"], correctAnswer: "Mejor busca otra salida, nomás", explanation: "This redirects the person toward another way out.", points: 1, skillTag: "alternative" },
      pairQuestion("peruvian-b2-bad-decision-pairs-1", "Match warning and consequence phrases.", badDecisionVocab.slice(0, 11)),
      pairQuestion("peruvian-b2-bad-decision-pairs-2", "Match slowing-down and advice phrases.", badDecisionVocab.slice(11, 22)),
      pairQuestion("peruvian-b2-bad-decision-pairs-3", "Match risky-action and embarrassment phrases.", badDecisionVocab.slice(22)),
    ],
  },
};
