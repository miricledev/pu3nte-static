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

const courseId = "mexican-spanish-b2-invitations-backup-plans";
const skoolSectionName = "Mexican Spanish - B2 Invitations with Backup Plans";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const invitationVocab: VocabItem[] = [
  { id: "como-ves-si", term: "¿cómo ves si…?", meaning: "how about if we…? / what do you think about…?", matchingMeaning: "how about if we…?", note: "A natural Mexican way to propose a plan without sounding too direct.", example: "¿Cómo ves si vamos por café después?", translation: "How about if we go for coffee later?", starred: true },
  { id: "traigo-ganas-de", term: "traigo ganas de…", meaning: "I feel like… / I’ve been wanting to…", matchingMeaning: "I feel like…", note: "Casual Mexican phrasing for wanting to do something.", example: "Traigo ganas de ver una peli tranquila.", translation: "I feel like watching a chill movie.", starred: true },
  { id: "si-te-acomoda", term: "si te acomoda", meaning: "if that works for you", matchingMeaning: "if that works for you", note: "Softens an invitation by making room for the other person's schedule.", example: "Pasamos por ti a las ocho, si te acomoda.", translation: "We’ll pick you up at eight, if that works for you.", starred: true },
  { id: "dejame-ver-como-ando", term: "déjame ver cómo ando", meaning: "let me see how my schedule looks", matchingMeaning: "let me see how my schedule looks", note: "A polite delay when you cannot confirm immediately.", example: "Déjame ver cómo ando y te digo.", translation: "Let me see how my schedule looks and I’ll tell you.", starred: true },
  { id: "te-confirmo-mas-tarde", term: "te confirmo más tarde", meaning: "I’ll confirm later", matchingMeaning: "I’ll confirm later", note: "Useful for keeping a plan open without committing too early.", example: "Te confirmo más tarde si sí alcanzo.", translation: "I’ll confirm later if I can make it.", starred: true },
  { id: "si-se-arma", term: "si se arma", meaning: "if the plan comes together / if it happens", matchingMeaning: "if the plan comes together", note: "Mexican phrase for a plan that may or may not happen.", example: "Si se arma, llevo botanas.", translation: "If the plan comes together, I’ll bring snacks.", starred: true },
  { id: "si-no-se-arma", term: "si no se arma", meaning: "if it doesn’t work out", matchingMeaning: "if it doesn’t work out", note: "Keeps the mood relaxed when a plan may fall through.", example: "Si no se arma, lo dejamos para mañana.", translation: "If it doesn’t work out, we’ll leave it for tomorrow.", starred: true },
  { id: "a-ver-si-se-hace", term: "a ver si se hace", meaning: "let’s see if it actually happens", matchingMeaning: "let’s see if it happens", note: "A realistic Mexican phrase for uncertain plans.", example: "A ver si se hace lo del karaoke.", translation: "Let’s see if the karaoke actually happens.", starred: true },
  { id: "como-plan-b", term: "como plan B", meaning: "as a backup plan", matchingMeaning: "as a backup plan", note: "Clear phrase for naming an alternate option.", example: "Como plan B, cenamos cerca de tu casa.", translation: "As a backup plan, we’ll have dinner near your place.", starred: true },
  { id: "chance-y", term: "chance y…", meaning: "maybe / there’s a chance that…", matchingMeaning: "maybe", note: "Very Mexican casual way to suggest a possibility.", example: "Chance y consigo boletos más baratos.", translation: "Maybe I’ll get cheaper tickets.", starred: true },
  { id: "igual-y", term: "igual y…", meaning: "maybe / perhaps", matchingMeaning: "maybe", note: "Mexican spoken phrase for a soft possibility.", example: "Igual y llueve, mejor checamos el clima.", translation: "Maybe it rains, we’d better check the weather.", starred: true },
  { id: "si-se-complica", term: "si se complica", meaning: "if things get complicated", matchingMeaning: "if things get complicated", note: "Useful for planning gracefully around problems.", example: "Si se complica, nos vemos otro día.", translation: "If things get complicated, we’ll meet another day.", starred: true },
  { id: "mejor-lo-movemos", term: "mejor lo movemos", meaning: "we’d better reschedule it", matchingMeaning: "we’d better reschedule it", note: "Natural Mexican phrase for moving a plan to another time.", example: "Si sales tarde, mejor lo movemos.", translation: "If you leave late, we’d better reschedule it.", starred: true },
  { id: "para-la-otra", term: "para la otra", meaning: "for next time", matchingMeaning: "for next time", note: "Keeps the door open after a plan falls through.", example: "Para la otra vamos con más calma.", translation: "Next time we’ll go with more time.", starred: true },
  { id: "por-si-las-dudas", term: "por si las dudas", meaning: "just in case", matchingMeaning: "just in case", note: "Common Mexican phrase for preparing a backup.", example: "Lleva chamarra por si las dudas.", translation: "Bring a jacket just in case.", starred: true },
  { id: "de-una-vez", term: "de una vez", meaning: "right now / while we’re at it", matchingMeaning: "right now", note: "Used to handle something immediately while the topic is open.", example: "Reservamos de una vez y ya queda.", translation: "Let’s reserve right now and it’s settled.", starred: true },
  { id: "vemos-sobre-la-marcha", term: "vemos sobre la marcha", meaning: "we’ll decide as we go", matchingMeaning: "we’ll decide as we go", note: "Flexible planning phrase when not everything is certain.", example: "Llegamos al centro y vemos sobre la marcha.", translation: "We’ll get downtown and decide as we go.", starred: true },
  { id: "si-se-presta", term: "si se presta", meaning: "if circumstances allow / if the moment is right", matchingMeaning: "if circumstances allow", note: "Softer than promising; depends on mood, timing, and context.", example: "Si se presta, nos quedamos a bailar.", translation: "If the moment is right, we’ll stay to dance.", starred: true },
  { id: "sin-bronca", term: "sin bronca", meaning: "no problem / no worries", matchingMeaning: "no problem", note: "Informal reassurance that there is no issue.", example: "Si no puedes, sin bronca.", translation: "If you can’t, no problem.", starred: true },
  { id: "no-pasa-nada", term: "no pasa nada", meaning: "no worries / it’s fine", matchingMeaning: "no worries", note: "Friendly phrase to remove pressure or awkwardness.", example: "Llegas cuando puedas, no pasa nada.", translation: "Come when you can, no worries.", starred: true },
  { id: "nos-ponemos-de-acuerdo", term: "nos ponemos de acuerdo", meaning: "we’ll work out the details / agree on it", matchingMeaning: "we’ll work out the details", note: "Useful for plans that still need coordination.", example: "Mañana nos ponemos de acuerdo con la hora.", translation: "Tomorrow we’ll work out the time.", starred: true },
  { id: "quedamos-pendientes", term: "quedamos pendientes", meaning: "let’s keep it open / we’ll follow up", matchingMeaning: "let’s keep it open", note: "Keeps a plan alive without forcing a final answer.", example: "Quedamos pendientes y me dices qué onda.", translation: "Let’s keep it open and you tell me what’s up.", starred: true },
  { id: "lo-dejamos-para-la-otra", term: "lo dejamos para la otra", meaning: "we’ll leave it for next time", matchingMeaning: "we’ll leave it for next time", note: "A relaxed way to cancel or postpone without drama.", example: "Si estás cansada, lo dejamos para la otra.", translation: "If you’re tired, we’ll leave it for next time.", starred: true },
  { id: "no-hay-que-forzar", term: "no hay que forzar el plan", meaning: "no need to force the plan", matchingMeaning: "no need to force the plan", note: "Keeps social plans healthy by removing pressure.", example: "Si todos andan ocupados, no hay que forzar el plan.", translation: "If everyone is busy, no need to force the plan.", starred: true },
];

const highlightMap = Object.fromEntries(invitationVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = invitationVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB2InvitationsBackupPlansFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B2: Invitations with Backup Plans Flashcards",
  subtitle: "Mexican phrases for flexible invitations, soft confirmations, backup plans, and no-pressure rescheduling.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "flashcards", "invitations", "backup plans"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: invitationVocab.map(cardFromVocab) },
};

export const mexicanSpanishB2InvitationsBackupPlansSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Invitations with Backup Plans",
  subtitle: "Build flexible Mexican invitations that leave room for schedule changes without killing the vibe.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "sentence-builder", "plans", "invitations"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note inviting someone to a plan, giving a backup option, and removing pressure if it does not work out.",
    stages: [
      stage("stage-1", "Suggest the plan", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "How about if we go for tacos? I feel like something chill, if that works for you.", "¿Cómo ves si vamos por tacos? Traigo ganas de algo tranquilo, si te acomoda.", "This sounds interested but not pushy.", breakdown([["how about if we", "¿cómo ves si…?"], ["I feel like", "traigo ganas de"], ["if that works for you", "si te acomoda"]])),
      stage("stage-2", "Delay confirmation", sentenceVocab.slice(3, 5), sentenceVocab.slice(0, 5), "Let me see how my schedule looks and I’ll confirm later.", "Déjame ver cómo ando y te confirmo más tarde.", "This keeps the plan open without saying yes too soon.", breakdown([["let me see how my schedule looks", "déjame ver cómo ando"], ["I’ll confirm later", "te confirmo más tarde"]])),
      stage("stage-3", "Keep it uncertain", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "If the plan comes together, great; if it doesn’t work out, let’s see if it happens another day.", "Si se arma, perfecto; si no se arma, a ver si se hace otro día.", "This makes uncertainty feel normal, not awkward.", breakdown([["if it comes together", "si se arma"], ["if it doesn’t work out", "si no se arma"], ["let’s see if it happens", "a ver si se hace"]])),
      stage("stage-4", "Offer a backup", sentenceVocab.slice(8, 12), sentenceVocab.slice(0, 12), "As a backup plan, maybe we can meet closer if things get complicated.", "Como plan B, chance y nos vemos más cerca si se complica.", "This gives a practical alternative before the original plan breaks.", breakdown([["as a backup plan", "como plan B"], ["maybe", "chance y"], ["if things get complicated", "si se complica"]])),
      stage("stage-5", "Reschedule kindly", sentenceVocab.slice(12, 15), sentenceVocab.slice(0, 15), "Maybe we’d better reschedule it for next time, just in case.", "Igual y mejor lo movemos para la otra, por si las dudas.", "This postpones without sounding annoyed.", breakdown([["maybe", "igual y"], ["we’d better reschedule it", "mejor lo movemos"], ["for next time", "para la otra"], ["just in case", "por si las dudas"]])),
      stage("stage-6", "Decide flexibly", sentenceVocab.slice(15, 18), sentenceVocab.slice(0, 18), "Let’s book right now and decide as we go if the moment is right.", "Reservamos de una vez y vemos sobre la marcha si se presta.", "This mixes preparation with flexibility.", breakdown([["right now", "de una vez"], ["we’ll decide as we go", "vemos sobre la marcha"], ["if the moment is right", "si se presta"]])),
      stage("stage-7", "Remove pressure", sentenceVocab.slice(18, 21), sentenceVocab.slice(0, 21), "If you can’t, no problem; no worries, we’ll work out the details.", "Si no puedes, sin bronca; no pasa nada, nos ponemos de acuerdo.", "This reassures the other person and keeps the connection easy.", breakdown([["no problem", "sin bronca"], ["no worries", "no pasa nada"], ["we’ll work out the details", "nos ponemos de acuerdo"]])),
      stage("stage-8", "Leave it open", sentenceVocab.slice(21), sentenceVocab, "Let’s keep it open; if it doesn’t happen, we’ll leave it for next time. No need to force the plan.", "Quedamos pendientes; si no se hace, lo dejamos para la otra. No hay que forzar el plan.", "This is the healthiest close for uncertain social plans.", breakdown([["let’s keep it open", "quedamos pendientes"], ["we’ll leave it for next time", "lo dejamos para la otra"], ["no need to force the plan", "no hay que forzar el plan"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-backup-story-q1", type: "multiple-choice", prompt: "After message 3, what does Valeria suggest?", options: ["A chill taco plan after work", "Canceling the weekend completely", "Booking a hotel", "Changing jobs"], correctAnswer: "A chill taco plan after work", explanation: "She asks how about tacos and says she feels like something relaxed.", points: 1, skillTag: "context" },
  { id: "mexican-b2-backup-story-q2", type: "multiple-choice", prompt: "After message 6, why can’t Mateo fully confirm yet?", options: ["He needs to check his schedule", "He lost his phone", "He already ate tacos", "He is angry at Valeria"], correctAnswer: "He needs to check his schedule", explanation: "Mateo says déjame ver cómo ando and te confirmo más tarde.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-backup-story-q3", type: "true-false", prompt: "After message 9, true or false: Valeria is okay if the plan does not come together.", options: ["True", "False"], correctAnswer: "True", explanation: "She says if it happens, great, and if not, they will see if it happens another day.", points: 1, skillTag: "inference" },
  { id: "mexican-b2-backup-story-q4", type: "multiple-choice", prompt: "After message 12, what backup plan does Mateo suggest?", options: ["Meeting closer to Valeria's place", "Going to another city", "Inviting twenty people", "Doing nothing ever again"], correctAnswer: "Meeting closer to Valeria's place", explanation: "He suggests meeting somewhere closer if things get complicated.", points: 1, skillTag: "sequence" },
  { id: "mexican-b2-backup-story-q5", type: "multiple-choice", prompt: "After message 15, why does Valeria mention rain?", options: ["To prepare just in case", "To say she hates all plans", "To explain she is already at the restaurant", "To reject Mateo"], correctAnswer: "To prepare just in case", explanation: "She says por si las dudas because it may rain.", points: 1, skillTag: "reason" },
  { id: "mexican-b2-backup-story-q6", type: "true-false", prompt: "After message 18, true or false: Mateo wants to force a fixed plan no matter what.", options: ["True", "False"], correctAnswer: "False", explanation: "He says they can decide as they go and only stay if the moment is right.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-backup-story-q7", type: "multiple-choice", prompt: "After message 21, how does Valeria remove pressure?", options: ["She says sin bronca and no pasa nada", "She demands an answer immediately", "She blocks Mateo", "She changes the topic to work"], correctAnswer: "She says sin bronca and no pasa nada", explanation: "Those phrases reassure Mateo that there is no problem.", points: 1, skillTag: "tone" },
  { id: "mexican-b2-backup-story-q8", type: "multiple-choice", prompt: "After message 24, what do they decide about details?", options: ["They will work them out later", "They will never discuss them", "Valeria must decide alone", "Mateo must pay for everyone"], correctAnswer: "They will work them out later", explanation: "They use nos ponemos de acuerdo and quedamos pendientes.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-backup-story-q9", type: "true-false", prompt: "After message 27, true or false: Mateo says they can leave it for next time if needed.", options: ["True", "False"], correctAnswer: "True", explanation: "He says lo dejamos para la otra if the plan does not work.", points: 1, skillTag: "context" },
  { id: "mexican-b2-backup-story-q10", type: "multiple-choice", prompt: "After message 30, what is the final agreement?", options: ["They will try the plan but not force it", "They cancel angrily", "They invite strangers", "They make the plan more complicated"], correctAnswer: "They will try the plan but not force it", explanation: "They close with flexibility and the idea that there is no need to force the plan.", points: 1, skillTag: "gist" },
];

const storyMessages: StoryMessage[] = [
  message("m1", "valeria", "Oye, ¿cómo ves si salimos el viernes después del trabajo?", "Hey, how about if we go out Friday after work?", ["¿cómo ves si…?"]),
  message("m2", "mateo", "Suena bien. ¿Qué traes en mente?", "Sounds good. What do you have in mind?", []),
  message("m3", "valeria", "Traigo ganas de tacos y algo tranqui, si te acomoda.", "I feel like tacos and something chill, if that works for you.", ["traigo ganas de…", "si te acomoda"], "voice-note", `${storyAudioBase}/m3.mp3`),
  message("m4", "mateo", "Me late, pero déjame ver cómo ando porque ese día tengo junta tarde.", "I’m into it, but let me see how my schedule looks because I have a late meeting that day.", ["déjame ver cómo ando"]),
  message("m5", "valeria", "Va, no te preocupes. Tampoco quiero meterte presión.", "Okay, don’t worry. I don’t want to pressure you either.", []),
  message("m6", "mateo", "Te confirmo más tarde, saliendo de la junta, y vemos si todavía da tiempo.", "I’ll confirm later, after the meeting, and we’ll see if there’s still time.", ["te confirmo más tarde"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "valeria", "Perfecto. Si se arma, yo aparto mesa en el lugar de siempre.", "Perfect. If the plan comes together, I’ll reserve a table at the usual place.", ["si se arma"]),
  message("m8", "mateo", "Y si no se arma, tampoco pasa nada, ¿no?", "And if it doesn’t work out, it’s fine too, right?", ["si no se arma", "no pasa nada"]),
  message("m9", "valeria", "Sí, cero drama. A ver si se hace; si no, lo movemos.", "Yeah, no drama. Let’s see if it actually happens; if not, we move it.", ["a ver si se hace"]),
  message("m10", "mateo", "Como plan B, podríamos vernos por tu colonia y no cruzar toda la ciudad.", "As a backup plan, we could meet around your neighborhood and not cross the whole city.", ["como plan B"]),
  message("m11", "valeria", "Chance y eso conviene más, porque el viernes siempre se pone pesado el tráfico.", "Maybe that works better, because traffic always gets heavy on Fridays.", ["chance y"]),
  message("m12", "mateo", "Igual y salgo tarde; si se complica, mejor nos vemos más cerca.", "Maybe I’ll leave late; if things get complicated, we’d better meet closer.", ["igual y…", "si se complica"], "voice-note", `${storyAudioBase}/m12.mp3`),
  message("m13", "valeria", "Sí, o mejor lo movemos para la otra si ves que vas muy justo.", "Yeah, or we’d better reschedule it for next time if you see you’ll be too tight.", ["mejor lo movemos", "para la otra"]),
  message("m14", "mateo", "No, sí quiero ir. Nomás necesito no prometer algo que a la mera hora no pueda cumplir.", "No, I do want to go. I just need not to promise something I can’t do at the last minute.", []),
  message("m15", "valeria", "Claro. Llevo paraguas por si las dudas, porque también dijeron que igual llueve.", "Of course. I’ll bring an umbrella just in case, because they also said maybe it’ll rain.", ["por si las dudas"]),
  message("m16", "mateo", "¿Reservamos de una vez o esperamos a que yo salga?", "Should we reserve right now or wait until I leave?", ["de una vez"]),
  message("m17", "valeria", "Reservemos ligero. Si cambia algo, vemos sobre la marcha.", "Let’s make a loose reservation. If anything changes, we’ll decide as we go.", ["vemos sobre la marcha"]),
  message("m18", "mateo", "Va. Y si se presta, después caminamos por un café; si no, cenamos y ya.", "Okay. And if the moment is right, afterwards we’ll walk for coffee; if not, we’ll just eat and that’s it.", ["si se presta"], "voice-note", `${storyAudioBase}/m18.mp3`),
  message("m19", "valeria", "Me gusta. Si al final no puedes, sin bronca, de verdad.", "I like it. If in the end you can’t, no problem, seriously.", ["sin bronca"]),
  message("m20", "mateo", "Gracias. Luego la gente se ofende si uno no confirma rápido.", "Thanks. People sometimes get offended if you don’t confirm quickly.", []),
  message("m21", "valeria", "No pasa nada. Prefiero que me digas claro y no que andes corriendo.", "No worries. I’d rather you tell me clearly than have you running around.", ["no pasa nada"]),
  message("m22", "mateo", "Entonces nos ponemos de acuerdo cuando salga de la junta.", "Then we’ll work out the details when I leave the meeting.", ["nos ponemos de acuerdo"]),
  message("m23", "valeria", "Sí, quedamos pendientes. Yo mientras checo dos lugares cerca de aquí.", "Yeah, let’s keep it open. Meanwhile I’ll check two places near here.", ["quedamos pendientes"]),
  message("m24", "mateo", "Perfecto. Si uno está lleno, usamos el otro como plan B.", "Perfect. If one is full, we’ll use the other as a backup plan.", ["como plan B"], "voice-note", `${storyAudioBase}/m24.mp3`),
  message("m25", "valeria", "Y si todo se pone imposible, lo dejamos para la otra sin drama.", "And if everything becomes impossible, we’ll leave it for next time with no drama.", ["lo dejamos para la otra"]),
  message("m26", "mateo", "Sí, no hay que forzar el plan si los dos acabamos cansados.", "Yeah, no need to force the plan if we both end up tired.", ["no hay que forzar el plan"]),
  message("m27", "valeria", "Exacto. La idea es vernos a gusto, no llegar muertos.", "Exactly. The idea is to see each other comfortably, not arrive dead tired.", []),
  message("m28", "mateo", "Me late cómo lo estás planteando: plan principal, plan B y salida elegante.", "I like how you’re framing it: main plan, backup plan, and graceful exit.", []),
  message("m29", "valeria", "Así sí se antoja. Sin presión y con opciones.", "That makes it appealing. No pressure and with options.", []),
  message("m30", "mateo", "Va, entonces quedamos pendientes y te confirmo más tarde. Si se arma, se arma.", "Okay, then let’s keep it open and I’ll confirm later. If it happens, it happens.", ["quedamos pendientes", "te confirmo más tarde", "si se arma"], "voice-note", `${storyAudioBase}/m30.mp3`),
];

export const mexicanSpanishB2InvitationsBackupPlansWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B2 | If It Comes Together",
  subtitle: "A realistic Mexican Spanish chat where two friends make a Friday plan with backup options and no pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "story", "invitations", "backup-plans"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "valeria", name: "Valeria", initials: "V", side: "left", color: "violet" },
      { id: "mateo", name: "Mateo", initials: "M", side: "right", color: "blue" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `${question.id}-check`, afterMessageId: `m${(index + 1) * 3}`, question })),
    learnedVocab: invitationVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: invitationVocab.slice(0, 12).map((item) => item.term),
      grammarPatterns: ["Soft invitations with cómo ves si", "Conditional planning with si se arma / si se complica", "No-pressure closings with sin bronca and no pasa nada"],
      speakingPrompts: ["Invite a friend to a plan and offer a backup option.", "Explain that you need to confirm later without sounding cold.", "Cancel or reschedule a plan while keeping the door open."],
    },
    completionTask: {
      title: "Send a flexible invitation",
      instructions: "Record a Mexican Spanish voice note inviting someone out, giving one plan B, and saying what happens if the plan does not work out.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En México, una invitación natural muchas veces empieza suave: «¿cómo ves si…?» abre la puerta sin imponer. Si agregas «traigo ganas de…», suena más personal, como una idea que nace de ti. Y con «si te acomoda», le das espacio a la otra persona para aceptar sin presión.", translation: "In Mexico, a natural invitation often starts softly: cómo ves si opens the door without imposing. If you add traigo ganas de, it sounds more personal, like an idea that comes from you. And with si te acomoda, you give the other person space to accept without pressure.", highlights: highlights(["¿cómo ves si…?", "traigo ganas de…", "si te acomoda"]), shadowLine: "¿Cómo ves si vamos, si te acomoda?" },
  { id: "p2", text: "Cuando alguien no puede responder en el momento, «déjame ver cómo ando» funciona mejor que un sí falso. Después puedes decir «te confirmo más tarde» para mostrar interés sin prometer de más. Es una forma muy útil de cuidar el plan y también cuidar tu tiempo.", translation: "When someone cannot answer in the moment, déjame ver cómo ando works better than a fake yes. Afterwards you can say te confirmo más tarde to show interest without overpromising. It is a very useful way to protect the plan and also protect your time.", highlights: highlights(["déjame ver cómo ando", "te confirmo más tarde"]), shadowLine: "Déjame ver cómo ando y te confirmo más tarde." },
  { id: "p3", text: "Las frases «si se arma» y «si no se arma» hacen que el plan se sienta flexible. No hay drama: «a ver si se hace» reconoce que hay interés, pero también realidad. Para B2, esto ayuda a sonar menos rígido y más mexicano en conversaciones casuales.", translation: "The phrases si se arma and si no se arma make the plan feel flexible. There is no drama: a ver si se hace recognizes that there is interest, but also reality. At B2, this helps you sound less rigid and more Mexican in casual conversations.", highlights: highlights(["si se arma", "si no se arma", "a ver si se hace"]), shadowLine: "Si se arma, bien; si no, a ver si se hace después." },
  { id: "p4", text: "Un buen plan también necesita salida. «Como plan B» presenta una alternativa clara. «Chance y…» e «igual y…» sirven para proponer posibilidades sin asegurarlas. Si dices «si se complica», ya estás preparando una solución antes de que el problema arruine el ambiente.", translation: "A good plan also needs an exit. Como plan B presents a clear alternative. Chance y and igual y are used to suggest possibilities without guaranteeing them. If you say si se complica, you are already preparing a solution before the problem ruins the vibe.", highlights: highlights(["como plan B", "chance y…", "igual y…", "si se complica"]), shadowLine: "Como plan B, chance y lo movemos." },
  { id: "p5", text: "Para cambiar un plan sin sonar seco, puedes decir «mejor lo movemos» o «para la otra». Si agregas «por si las dudas», pareces prevenido, no negativo. Y con «de una vez», resuelves algo al momento para que no quede flotando.", translation: "To change a plan without sounding cold, you can say mejor lo movemos or para la otra. If you add por si las dudas, you seem prepared, not negative. And with de una vez, you solve something in the moment so it does not stay floating.", highlights: highlights(["mejor lo movemos", "para la otra", "por si las dudas", "de una vez"]), shadowLine: "Mejor lo movemos para la otra, por si las dudas." },
  { id: "p6", text: "No todos los planes necesitan estar cerrados desde el principio. «Vemos sobre la marcha» significa que van decidiendo mientras pasan las cosas. «Si se presta» añade una condición social: si el ambiente, el tiempo y la energía ayudan, entonces siguen.", translation: "Not every plan needs to be fixed from the beginning. Vemos sobre la marcha means you decide as things happen. Si se presta adds a social condition: if the vibe, time, and energy help, then you continue.", highlights: highlights(["vemos sobre la marcha", "si se presta"]), shadowLine: "Vemos sobre la marcha, si se presta." },
  { id: "p7", text: "Para quitar presión, «sin bronca» y «no pasa nada» son esenciales. No solo significan que todo está bien; también protegen la relación. En vez de castigar a alguien por no poder ir, dices que todavía hay confianza.", translation: "To remove pressure, sin bronca and no pasa nada are essential. They do not only mean everything is fine; they also protect the relationship. Instead of punishing someone for not being able to go, you say there is still trust.", highlights: highlights(["sin bronca", "no pasa nada"]), shadowLine: "Si no puedes, sin bronca, no pasa nada." },
  { id: "p8", text: "Al cerrar, «nos ponemos de acuerdo» deja claro que faltan detalles. «Quedamos pendientes» mantiene vivo el plan sin forzarlo. Si de plano no se puede, «lo dejamos para la otra» y «no hay que forzar el plan» hacen que la invitación termine con madurez.", translation: "At the close, nos ponemos de acuerdo makes it clear that details are still missing. Quedamos pendientes keeps the plan alive without forcing it. If it simply cannot happen, lo dejamos para la otra and no hay que forzar el plan make the invitation end maturely.", highlights: highlights(["nos ponemos de acuerdo", "quedamos pendientes", "lo dejamos para la otra", "no hay que forzar el plan"]), shadowLine: "Quedamos pendientes; no hay que forzar el plan." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-backup-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly teaching?", options: ["How to make flexible Mexican invitations", "How to argue at work", "How to tell a dramatic story", "How to order food"], correctAnswer: "How to make flexible Mexican invitations", explanation: "The reading focuses on invitations, backup plans, confirmation, and no-pressure language.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-backup-reading-q2", type: "multiple-choice", prompt: "Which phrase is best for not confirming immediately?", options: ["Déjame ver cómo ando", "Si se presta", "De una vez", "No hay que forzar el plan"], correctAnswer: "Déjame ver cómo ando", explanation: "This phrase means let me see how my schedule looks.", points: 1, skillTag: "vocab" },
  { id: "mexican-b2-backup-reading-q3", type: "true-false", prompt: "True or false: Si se arma means the plan is already 100% confirmed.", options: ["True", "False"], correctAnswer: "False", explanation: "Si se arma means if the plan comes together, so it is still uncertain.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-backup-reading-q4", type: "multiple-choice", prompt: "Why are sin bronca and no pasa nada useful?", options: ["They remove pressure and protect the relationship", "They make the invitation formal", "They force the other person to go", "They mean the plan is canceled forever"], correctAnswer: "They remove pressure and protect the relationship", explanation: "The reading says these phrases show everything is okay and preserve trust.", points: 1, skillTag: "tone" },
  { id: "mexican-b2-backup-reading-q5", type: "multiple-choice", prompt: "Which phrase keeps a plan open without forcing it?", options: ["Quedamos pendientes", "De una vez", "Traigo ganas de", "Por si las dudas"], correctAnswer: "Quedamos pendientes", explanation: "Quedamos pendientes means let’s keep it open or we’ll follow up.", points: 1, skillTag: "vocab" },
];

export const mexicanSpanishB2InvitationsBackupPlansReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B2 Reading: Keeping the Plan Flexible",
  subtitle: "A synced audio reading on Mexican invitation phrases, backup plans, and no-pressure rescheduling.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "reading", "shadowing", "plans"],
  estimatedMinutes: 14,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: invitationVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-backup-quiz-q1", type: "multiple-choice", prompt: "You want to suggest a plan softly. Which phrase fits best?", options: ["¿Cómo ves si vamos?", "No pasa nada", "Para la otra", "Si no se arma"], correctAnswer: "¿Cómo ves si vamos?", explanation: "¿Cómo ves si…? is a soft invitation opener.", points: 1, skillTag: "invitation" },
  { id: "mexican-b2-backup-quiz-q2", type: "fill-blank", prompt: "Complete: ___ ganas de ir por un café.", correctAnswer: "Traigo", explanation: "Traigo ganas de means I feel like or I’ve been wanting to.", points: 1, skillTag: "phrase" },
  { id: "mexican-b2-backup-quiz-q3", type: "multiple-choice", prompt: "Your friend needs to check their schedule. What should they say?", options: ["Déjame ver cómo ando", "Si se presta", "De una vez", "Lo dejamos para la otra"], correctAnswer: "Déjame ver cómo ando", explanation: "It means let me see how my schedule looks.", points: 1, skillTag: "context" },
  { id: "mexican-b2-backup-quiz-q4", type: "true-false", prompt: "True or false: Te confirmo más tarde is useful when you are interested but cannot fully commit yet.", options: ["True", "False"], correctAnswer: "True", explanation: "It lets you delay confirmation while keeping the plan alive.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-backup-quiz-q5", type: "order-words", prompt: "Order the words: if the plan comes together.", wordBank: ["si", "se", "arma"], correctAnswer: "si se arma", explanation: "Si se arma means if it happens or if the plan comes together.", points: 1, skillTag: "syntax" },
  { id: "mexican-b2-backup-quiz-q6", type: "multiple-choice", prompt: "Which phrase means as a backup plan?", options: ["Como plan B", "Por si las dudas", "No pasa nada", "Si te acomoda"], correctAnswer: "Como plan B", explanation: "Como plan B directly names the backup option.", points: 1, skillTag: "vocab" },
  { id: "mexican-b2-backup-quiz-q7", type: "fill-blank", prompt: "Complete: ___ y salgo tarde, entonces mejor lo movemos.", correctAnswer: "Igual", explanation: "Igual y means maybe or perhaps in Mexican Spanish.", points: 1, skillTag: "phrase" },
  { id: "mexican-b2-backup-quiz-q8", type: "true-false", prompt: "True or false: No hay que forzar el plan removes pressure from the invitation.", options: ["True", "False"], correctAnswer: "True", explanation: "It means there is no need to force the plan.", points: 1, skillTag: "tone" },
  { id: "mexican-b2-backup-quiz-q9", type: "order-words", prompt: "Order the words: we’ll decide as we go.", wordBank: ["vemos", "sobre", "la", "marcha"], correctAnswer: "vemos sobre la marcha", explanation: "Vemos sobre la marcha is the fixed flexible-planning phrase.", points: 1, skillTag: "syntax" },
  { id: "mexican-b2-backup-quiz-q10", type: "multiple-choice", prompt: "You want to say you’ll leave it for next time. Which is best?", options: ["Lo dejamos para la otra", "Si te acomoda", "De una vez", "Traigo ganas de"], correctAnswer: "Lo dejamos para la otra", explanation: "Lo dejamos para la otra means we’ll leave it for next time.", points: 1, skillTag: "context" },
  { id: "mexican-b2-backup-quiz-q11", type: "match-pairs", prompt: "Match the invitation phrases.", pairs: [{ left: "¿cómo ves si…?", right: "how about if we…?" }, { left: "si te acomoda", right: "if that works for you" }, { left: "traigo ganas de…", right: "I feel like…" }, { left: "de una vez", right: "right now" }], explanation: "These phrases open and shape an invitation.", points: 4, skillTag: "matching" },
  { id: "mexican-b2-backup-quiz-q12", type: "match-pairs", prompt: "Match the uncertainty phrases.", pairs: [{ left: "si se arma", right: "if it comes together" }, { left: "si no se arma", right: "if it doesn’t work out" }, { left: "a ver si se hace", right: "let’s see if it happens" }, { left: "si se complica", right: "if things get complicated" }], explanation: "These phrases help manage uncertain plans naturally.", points: 4, skillTag: "uncertainty" },
  { id: "mexican-b2-backup-quiz-q13", type: "match-pairs", prompt: "Match the no-pressure closings.", pairs: [{ left: "sin bronca", right: "no problem" }, { left: "no pasa nada", right: "no worries" }, { left: "quedamos pendientes", right: "let’s keep it open" }, { left: "no hay que forzar el plan", right: "no need to force the plan" }], explanation: "These phrases keep the relationship comfortable even if the plan changes.", points: 4, skillTag: "tone" },
];

export const mexicanSpanishB2InvitationsBackupPlansQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican B2 Quiz: Invitations with Backup Plans",
  subtitle: "Test whether you can choose the right Mexican phrase for flexible invites, plan B options, and soft rescheduling.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "quiz", "invitations", "backup-plans"],
  estimatedMinutes: 12,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B2 invitation phrases in realistic planning situations.",
    passScore: 80,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
