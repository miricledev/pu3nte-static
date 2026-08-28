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

const courseId = "peruvian-spanish-c1-professional-boundaries-and-negotiation";
const skoolSectionName = "Peruvian Spanish - C1 Professional Boundaries and Negotiation";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const negotiationVocab: VocabItem[] = [
  { id: "no-me-termina-de-cuadrar", term: "no me termina de cuadrar", meaning: "it doesn’t quite work for me / it doesn’t quite add up for me", matchingMeaning: "it doesn’t quite add up", note: "Soft but clear objection when something feels off.", example: "La propuesta no me termina de cuadrar.", translation: "The proposal doesn’t quite work for me.", starred: true },
  { id: "prefiero-dejarlo-claro-desde-el-arranque", term: "prefiero dejarlo claro desde el arranque", meaning: "I prefer to make it clear from the outset", matchingMeaning: "make it clear from the outset", note: "Professional boundary phrase with Peruvian/Andean-style arranque for the beginning.", example: "Prefiero dejarlo claro desde el arranque para evitar malentendidos.", translation: "I prefer to make it clear from the outset to avoid misunderstandings.", starred: true },
  { id: "por-ahi-podemos-ajustar-el-alcance", term: "por ahí podemos ajustar el alcance", meaning: "maybe we can adjust the scope", matchingMeaning: "maybe adjust the scope", note: "Por ahí softens the proposal without sounding weak.", example: "Por ahí podemos ajustar el alcance y mantener la tarifa.", translation: "Maybe we can adjust the scope and keep the fee.", starred: true },
  { id: "de-repente-lo-podemos-aterrizar", term: "de repente lo podemos aterrizar", meaning: "maybe we can make it more concrete / realistic", matchingMeaning: "maybe make it more concrete", note: "In Peru, de repente often means maybe; aterrizar means make practical.", example: "De repente lo podemos aterrizar con dos entregables claros.", translation: "Maybe we can make it more concrete with two clear deliverables.", starred: true },
  { id: "ahi-si-se-me-complica", term: "ahí sí se me complica", meaning: "that’s where it gets difficult for me", matchingMeaning: "that is where it gets difficult", note: "Useful for drawing a boundary around a specific condition.", example: "Si quieren reuniones los domingos, ahí sí se me complica.", translation: "If they want Sunday meetings, that’s where it gets difficult for me.", starred: true },
  { id: "hasta-ahi-podria-llegar", term: "hasta ahí podría llegar", meaning: "that’s about as far as I could go", matchingMeaning: "that is as far as I could go", note: "Diplomatic limit-setting without slamming the door.", example: "Con dos revisiones, hasta ahí podría llegar.", translation: "With two revisions, that’s about as far as I could go.", starred: true },
  { id: "si-hablamos-de-ese-monto", term: "si hablamos de ese monto", meaning: "if we’re talking about that amount", matchingMeaning: "if we are talking about that amount", note: "Frames negotiation around price before accepting obligations.", example: "Si hablamos de ese monto, el soporte no puede ser ilimitado.", translation: "If we’re talking about that amount, support cannot be unlimited.", starred: true },
  { id: "no-quisiera-comprometerme-de-mas", term: "no quisiera comprometerme de más", meaning: "I wouldn’t want to overcommit", matchingMeaning: "I would not want to overcommit", note: "Polite boundary around capacity and responsibility.", example: "No quisiera comprometerme de más y luego quedar mal.", translation: "I wouldn’t want to overcommit and then fail to deliver.", starred: true },
  { id: "por-ese-lado-si-hay-margen", term: "por ese lado sí hay margen", meaning: "there’s some room on that front", matchingMeaning: "there is room on that front", note: "Signals flexibility in one area while protecting another.", example: "En fechas, por ese lado sí hay margen.", translation: "On dates, there’s some room on that front.", starred: true },
  { id: "no-me-cierro-a-conversarlo", term: "no me cierro a conversarlo", meaning: "I’m open to discussing it", matchingMeaning: "I am open to discussing it", note: "Keeps negotiation alive without committing yet.", example: "No me cierro a conversarlo si definimos bien el rol.", translation: "I’m open to discussing it if we define the role well.", starred: true },
  { id: "eso-ya-seria-otro-escenario", term: "eso ya sería otro escenario", meaning: "that would be a different situation / scenario", matchingMeaning: "that would be another scenario", note: "Use when the other side adds new conditions.", example: "Si quieren soporte diario, eso ya sería otro escenario.", translation: "If they want daily support, that would be a different scenario.", starred: true },
  { id: "me-parece-mas-aterrizado", term: "me parece más aterrizado", meaning: "that seems more realistic / workable", matchingMeaning: "that seems more realistic", note: "Approves a more practical version of the idea.", example: "Con menos reuniones, me parece más aterrizado.", translation: "With fewer meetings, that seems more realistic.", starred: true },
  { id: "podemos-encontrarle-la-vuelta", term: "podemos encontrarle la vuelta", meaning: "we can find a way to make it work", matchingMeaning: "find a way to make it work", note: "Collaborative problem-solving phrase.", example: "Podemos encontrarle la vuelta si ordenamos prioridades.", translation: "We can find a way to make it work if we organize priorities.", starred: true },
  { id: "esto-ya-se-sale-de-lo-conversado", term: "esto ya se sale de lo conversado", meaning: "this goes beyond what we discussed", matchingMeaning: "goes beyond what we discussed", note: "Professional scope-control phrase.", example: "Ese pedido ya se sale de lo conversado.", translation: "That request already goes beyond what we discussed.", starred: true },
  { id: "tendria-que-reflejarse-en-la-tarifa", term: "tendría que reflejarse en la tarifa", meaning: "that would have to be reflected in the fee/rate", matchingMeaning: "reflected in the fee", note: "Firm but fair way to price extra work.", example: "Si sumamos soporte, tendría que reflejarse en la tarifa.", translation: "If we add support, that would have to be reflected in the fee.", starred: true },
  { id: "no-quisiera-que-se-desdibuje-el-rol", term: "no quisiera que se desdibuje el rol", meaning: "I wouldn’t want the role to become blurred", matchingMeaning: "not want the role to become blurred", note: "Advanced phrase for protecting responsibilities and boundaries.", example: "No quisiera que se desdibuje el rol entre consultoría y ejecución.", translation: "I wouldn’t want the role to become blurred between consulting and execution.", starred: true },
  { id: "pongamos-eso-sobre-la-mesa", term: "pongamos eso sobre la mesa", meaning: "let’s put that on the table", matchingMeaning: "put that on the table", note: "Invites direct discussion of a sensitive issue.", example: "Pongamos eso sobre la mesa antes de cerrar.", translation: "Let’s put that on the table before closing.", starred: true },
  { id: "veamos-donde-podemos-ceder-ambos", term: "veamos dónde podemos ceder ambos", meaning: "let’s see where we can both compromise", matchingMeaning: "where we can both compromise", note: "Collaborative phrase for mutual concessions.", example: "Veamos dónde podemos ceder ambos sin perder claridad.", translation: "Let’s see where we can both compromise without losing clarity.", starred: true },
  { id: "con-eso-si-podriamos-cerrar", term: "con eso sí podríamos cerrar", meaning: "with that, we could reach an agreement / close the deal", matchingMeaning: "we could close the deal", note: "Signals a conditional yes.", example: "Si ajustan el alcance, con eso sí podríamos cerrar.", translation: "If they adjust the scope, with that we could reach an agreement.", starred: true },
  { id: "de-ahi-ya-no-me-moveria", term: "de ahí ya no me movería", meaning: "beyond that, I wouldn’t budge", matchingMeaning: "I would not budge beyond that", note: "Final boundary after showing flexibility.", example: "Puedo aceptar dos revisiones; de ahí ya no me movería.", translation: "I can accept two revisions; beyond that, I wouldn’t budge.", starred: true },
  { id: "te-soy-bien-franco", term: "te soy bien franco", meaning: "I’ll be very frank with you / to be quite frank", matchingMeaning: "to be very frank", note: "Direct but relational; useful before a difficult truth.", example: "Te soy bien franco: ese plazo no es realista.", translation: "To be very frank with you: that deadline is not realistic.", starred: true },
];

const highlightMap = Object.fromEntries(negotiationVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = negotiationVocab.map((item) => `${item.term} = ${item.meaning}`);

export const peruvianSpanishC1ProfessionalBoundariesNegotiationFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Peruvian Spanish C1: Professional Boundaries & Negotiation Flashcards",
  subtitle: "Advanced Peruvian professional chunks for scope, fees, limits, compromise, and diplomatic boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "flashcards", "negotiation", "professional boundaries"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: negotiationVocab.map(cardFromVocab) },
};

export const peruvianSpanishC1ProfessionalBoundariesNegotiationSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Peruvian Professional Boundaries",
  subtitle: "Build polished Peruvian Spanish for scope control, pricing extra work, and negotiating without sounding rigid.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["peruvian-spanish", "c1", "sentence-builder", "negotiation", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 75-second Peruvian Spanish voice note where you negotiate scope, set a pricing boundary, and offer one workable compromise.",
    stages: [
      stage("stage-1", "Open the boundary", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2), "It doesn’t quite work for me, and I prefer to make it clear from the outset.", "No me termina de cuadrar y prefiero dejarlo claro desde el arranque.", "This is direct but professional: you state discomfort before the agreement becomes blurry.", breakdown([["It doesn’t quite work for me", "No me termina de cuadrar"], ["I prefer to make it clear", "prefiero dejarlo claro"], ["from the outset", "desde el arranque"]])),
      stage("stage-2", "Make it concrete", sentenceVocab.slice(2, 4), sentenceVocab.slice(0, 4), "Maybe we can adjust the scope and make it more concrete.", "Por ahí podemos ajustar el alcance y de repente lo podemos aterrizar.", "Por ahí and de repente soften the suggestion while keeping the negotiation moving.", breakdown([["Maybe we can", "Por ahí podemos"], ["adjust the scope", "ajustar el alcance"], ["make it more concrete", "aterrizarlo"]])),
      stage("stage-3", "Draw the price line", sentenceVocab.slice(4, 8), sentenceVocab.slice(0, 8), "If we’re talking about that amount, that’s where it gets difficult and I wouldn’t want to overcommit.", "Si hablamos de ese monto, ahí sí se me complica y no quisiera comprometerme de más.", "This connects money, capacity, and risk without sounding emotional.", breakdown([["If we’re talking about that amount", "Si hablamos de ese monto"], ["that’s where it gets difficult", "ahí sí se me complica"], ["I wouldn’t want to overcommit", "no quisiera comprometerme de más"]])),
      stage("stage-4", "Show flexible limits", sentenceVocab.slice(5, 10), sentenceVocab.slice(0, 10), "That’s as far as I could go, but there’s room on that front and I’m open to discussing it.", "Hasta ahí podría llegar, pero por ese lado sí hay margen y no me cierro a conversarlo.", "You protect your limit while still sounding collaborative.", breakdown([["That’s as far as I could go", "Hasta ahí podría llegar"], ["there’s room on that front", "por ese lado sí hay margen"], ["I’m open to discussing it", "no me cierro a conversarlo"]])),
      stage("stage-5", "Name scope creep", sentenceVocab.slice(10, 16), sentenceVocab.slice(0, 16), "That would be a different scenario; this goes beyond what we discussed and would have to be reflected in the fee.", "Eso ya sería otro escenario; esto ya se sale de lo conversado y tendría que reflejarse en la tarifa.", "This is the core scope-creep sentence: new work means a new rate.", breakdown([["That would be a different scenario", "Eso ya sería otro escenario"], ["goes beyond what we discussed", "se sale de lo conversado"], ["reflected in the fee", "reflejarse en la tarifa"]])),
      stage("stage-6", "Protect the role", sentenceVocab.slice(15, 18), sentenceVocab.slice(0, 18), "I wouldn’t want the role to become blurred, so let’s put that on the table.", "No quisiera que se desdibuje el rol, así que pongamos eso sobre la mesa.", "Use this when responsibilities start mixing and you need explicit boundaries.", breakdown([["I wouldn’t want", "No quisiera"], ["the role to become blurred", "que se desdibuje el rol"], ["let’s put that on the table", "pongamos eso sobre la mesa"]])),
      stage("stage-7", "Compromise toward closing", sentenceVocab.slice(17, 20), sentenceVocab, "Let’s see where we can both compromise; with that, we could close.", "Veamos dónde podemos ceder ambos; con eso sí podríamos cerrar.", "This creates a conditional yes, not a vague promise.", breakdown([["where we can both compromise", "dónde podemos ceder ambos"], ["with that", "con eso"], ["we could close", "podríamos cerrar"]])),
      stage("stage-8", "Final non-negotiable", sentenceVocab.slice(19, 21), sentenceVocab, "To be very frank, beyond that I wouldn’t budge.", "Te soy bien franco: de ahí ya no me movería.", "This is a firm closing boundary after you have already shown flexibility.", breakdown([["To be very frank", "Te soy bien franco"], ["beyond that", "de ahí"], ["I wouldn’t budge", "ya no me movería"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-boundaries-story-q1", type: "multiple-choice", prompt: "After message 3, what is Camila’s main concern?", options: ["The amount does not justify overcommitting", "Martín forgot the meeting", "The client already paid too much", "The project has no deadline"], correctAnswer: "The amount does not justify overcommitting", explanation: "Camila says si hablamos de ese monto and no quisiera comprometerme de más.", points: 1, skillTag: "boundary" },
  { id: "peruvian-c1-boundaries-story-q2", type: "multiple-choice", prompt: "After message 6, where does Camila say there is room?", options: ["Adjusting scope and making deliverables concrete", "Adding Sunday support", "Dropping the contract completely", "Letting the role blur"], correctAnswer: "Adjusting scope and making deliverables concrete", explanation: "They discuss ajustar el alcance and aterrizar the proposal, while Sunday support complicates things.", points: 1, skillTag: "scope" },
  { id: "peruvian-c1-boundaries-story-q3", type: "true-false", prompt: "After message 9, true or false: Camila says extra work should be reflected in the fee.", options: ["True", "False"], correctAnswer: "True", explanation: "She says tendría que reflejarse en la tarifa.", points: 1, skillTag: "pricing" },
  { id: "peruvian-c1-boundaries-story-q4", type: "multiple-choice", prompt: "After message 12, what problem does Martín identify?", options: ["The client is mixing coordination with execution", "The client refuses all meetings", "Camila wants to lower the fee", "The project has already ended"], correctAnswer: "The client is mixing coordination with execution", explanation: "Martín says the client is mezclando coordinación con ejecución.", points: 1, skillTag: "role-clarity" },
  { id: "peruvian-c1-boundaries-story-q5", type: "multiple-choice", prompt: "After message 15, what could help them close the deal?", options: ["Fewer deliverables and clear communication channels", "Unlimited support", "A lower fee with more work", "No written scope"], correctAnswer: "Fewer deliverables and clear communication channels", explanation: "Camila says they can compromise, and Martín says con eso sí podríamos cerrar.", points: 1, skillTag: "compromise" },
  { id: "peruvian-c1-boundaries-story-q6", type: "multiple-choice", prompt: "After message 18, what practical solution does Martín suggest?", options: ["Two deliverables and one weekly review meeting", "Daily meetings forever", "Canceling the project", "Letting the director contact Camila anytime"], correctAnswer: "Two deliverables and one weekly review meeting", explanation: "He says they can find a way with two deliverables and one weekly meeting.", points: 1, skillTag: "solution" },
  { id: "peruvian-c1-boundaries-story-q7", type: "true-false", prompt: "After message 21, true or false: Camila accepts unlimited new support for the same amount.", options: ["True", "False"], correctAnswer: "False", explanation: "She says the new request goes beyond what was discussed and the amount only covers the current role.", points: 1, skillTag: "scope-creep" },
  { id: "peruvian-c1-boundaries-story-q8", type: "multiple-choice", prompt: "After message 24, what specific condition is difficult for Camila?", options: ["Answering directly to the board", "Using one channel", "Having one weekly meeting", "Writing the proposal"], correctAnswer: "Answering directly to the board", explanation: "Camila says ahí sí se me complica if they want her to respond directly to the board.", points: 1, skillTag: "boundary" },
  { id: "peruvian-c1-boundaries-story-q9", type: "multiple-choice", prompt: "After message 27, what does Martín find more workable?", options: ["One channel and one weekly meeting", "No boundaries at all", "More deliverables for the same fee", "Sunday support"], correctAnswer: "One channel and one weekly meeting", explanation: "Martín says that version seems más aterrizado.", points: 1, skillTag: "workable-plan" },
  { id: "peruvian-c1-boundaries-story-q10", type: "multiple-choice", prompt: "By message 30, what is the final agreement?", options: ["Formalize scope, fee, and limits from the outset", "Accept every request verbally", "Avoid discussing the role", "Leave the fee undefined"], correctAnswer: "Formalize scope, fee, and limits from the outset", explanation: "They agree to leave everything clear from the beginning: scope, fee, and limits.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const peruvianSpanishC1ProfessionalBoundariesNegotiationWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Peruvian C1 Story: The Scope Creep Call",
  subtitle: "Camila and Martín negotiate boundaries when a client quietly expands the role without expanding the fee.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "WhatsApp", "negotiation", "professional boundaries"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "camila", name: "Camila", initials: "CA", side: "right", color: "violet" },
      { id: "martin", name: "Martín", initials: "MA", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "camila", "Martín, revisé la propuesta y no me termina de cuadrar.", "Martín, I reviewed the proposal and it doesn’t quite work for me.", ["no me termina de cuadrar"]),
      message("m2", "martin", "¿Por el monto o por el alcance?", "Because of the amount or because of the scope?", []),
      message("m3", "camila", "Ambos. Prefiero dejarlo claro desde el arranque: si hablamos de ese monto, no quisiera comprometerme de más.", "Both. I prefer to make it clear from the outset: if we’re talking about that amount, I wouldn’t want to overcommit.", ["prefiero dejarlo claro desde el arranque", "si hablamos de ese monto", "no quisiera comprometerme de más"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "martin", "Claro. Por ahí podemos ajustar el alcance.", "Of course. Maybe we can adjust the scope.", ["por ahí podemos ajustar el alcance"]),
      message("m5", "camila", "Sí, de repente lo podemos aterrizar con entregables más concretos.", "Yes, maybe we can make it more concrete with clearer deliverables.", ["de repente lo podemos aterrizar"]),
      message("m6", "camila", "Por ese lado sí hay margen, pero ahí sí se me complica si también quieren soporte los domingos.", "There’s some room on that front, but that’s where it gets difficult if they also want Sunday support.", ["por ese lado sí hay margen", "ahí sí se me complica"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "martin", "Entonces hasta ahí podría llegar: revisión de lunes a viernes.", "Then that’s about as far as I could go: review from Monday to Friday.", ["hasta ahí podría llegar"]),
      message("m8", "camila", "Exacto. Si entra soporte de fin de semana, eso ya sería otro escenario.", "Exactly. If weekend support comes in, that would be a different scenario.", ["eso ya sería otro escenario"]),
      message("m9", "camila", "Y tendría que reflejarse en la tarifa.", "And it would have to be reflected in the fee.", ["tendría que reflejarse en la tarifa"]),
      message("m10", "martin", "Pongamos eso sobre la mesa antes de la llamada.", "Let’s put that on the table before the call.", ["pongamos eso sobre la mesa"]),
      message("m11", "camila", "Sí, porque no quisiera que se desdibuje el rol.", "Yes, because I wouldn’t want the role to become blurred.", ["no quisiera que se desdibuje el rol"]),
      message("m12", "martin", "Te soy bien franco: el cliente está mezclando coordinación con ejecución.", "To be very frank with you: the client is mixing coordination with execution.", ["te soy bien franco"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "camila", "Totalmente. Y ahí nacen los problemas después.", "Totally. And that’s where problems appear later.", []),
      message("m14", "martin", "Veamos dónde podemos ceder ambos sin perder claridad.", "Let’s see where we can both compromise without losing clarity.", ["veamos dónde podemos ceder ambos"]),
      message("m15", "martin", "Si bajan a dos entregables y un canal formal, con eso sí podríamos cerrar.", "If they lower it to two deliverables and one formal channel, with that we could close.", ["con eso sí podríamos cerrar"]),
      message("m16", "camila", "Pero de ahí ya no me movería.", "But beyond that, I wouldn’t budge.", ["de ahí ya no me movería"]),
      message("m17", "martin", "Me parece más aterrizado.", "That seems more realistic.", ["me parece más aterrizado"]),
      message("m18", "martin", "Podemos encontrarle la vuelta: dos entregas, una reunión semanal y nada de mensajes sueltos a cualquier hora.", "We can find a way to make it work: two deliveries, one weekly meeting, and no random messages at any hour.", ["podemos encontrarle la vuelta"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "camila", "Por ahí podemos ajustar el alcance así.", "Maybe we can adjust the scope like that.", ["por ahí podemos ajustar el alcance"]),
      message("m20", "camila", "Pero si piden seguimiento diario, esto ya se sale de lo conversado.", "But if they ask for daily follow-up, this goes beyond what we discussed.", ["esto ya se sale de lo conversado"]),
      message("m21", "camila", "Si hablamos de ese monto, cubre consultoría, no soporte operativo.", "If we’re talking about that amount, it covers consulting, not operational support.", ["si hablamos de ese monto"]),
      message("m22", "martin", "No me cierro a conversarlo, pero tienen que entender esa diferencia.", "I’m open to discussing it, but they need to understand that difference.", ["no me cierro a conversarlo"]),
      message("m23", "camila", "De repente lo podemos aterrizar con un anexo simple.", "Maybe we can make it more concrete with a simple addendum.", ["de repente lo podemos aterrizar"]),
      message("m24", "camila", "Ahí sí se me complica si quieren que yo responda directo al directorio.", "That’s where it gets difficult if they want me to answer directly to the board.", ["ahí sí se me complica"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "martin", "Sí, no quisiera que se desdibuje el rol tampoco.", "Yes, I wouldn’t want the role to become blurred either.", ["no quisiera que se desdibuje el rol"]),
      message("m26", "camila", "Te soy bien franca: prefiero perder el proyecto antes que entrar mal parada.", "To be very frank with you: I’d rather lose the project than start from a bad position.", ["te soy bien franco"]),
      message("m27", "martin", "Con un solo canal y una reunión semanal, me parece más aterrizado.", "With one single channel and one weekly meeting, that seems more realistic.", ["me parece más aterrizado"]),
      message("m28", "camila", "Con eso sí podríamos cerrar.", "With that, we could reach an agreement.", ["con eso sí podríamos cerrar"]),
      message("m29", "camila", "Pero si vuelven a sumar cosas, de ahí ya no me movería.", "But if they add things again, beyond that I wouldn’t budge.", ["de ahí ya no me movería"]),
      message("m30", "martin", "Perfecto. Dejamos alcance, tarifa y límites claros desde el arranque.", "Perfect. We’ll leave scope, fee, and limits clear from the outset.", ["prefiero dejarlo claro desde el arranque"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `peruvian-c1-boundaries-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: negotiationVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: negotiationVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft objections: no me termina de cuadrar, ahí sí se me complica.",
        "Scope control: ajustar el alcance, se sale de lo conversado, reflejarse en la tarifa.",
        "Diplomatic boundaries: no quisiera comprometerme de más, de ahí ya no me movería.",
      ],
      speakingPrompts: [
        "Set a boundary around extra work.",
        "Explain why a new request changes the fee.",
        "Offer one compromise while keeping the role clear.",
      ],
    },
    completionTask: {
      title: "Your Peruvian C1 negotiation voice note",
      instructions: "Record a 75-second Peruvian Spanish voice note negotiating a professional boundary: mention scope, fee, role clarity, and one compromise.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una negociación profesional, decir “no” no siempre significa cerrar la puerta. A veces basta con decir “no me termina de cuadrar”. Esa frase permite marcar una duda sin sonar agresivo. Si quieres evitar malentendidos, puedes añadir “prefiero dejarlo claro desde el arranque”.", translation: "In a professional negotiation, saying no does not always mean closing the door. Sometimes it is enough to say no me termina de cuadrar. That phrase lets you mark a doubt without sounding aggressive. If you want to avoid misunderstandings, you can add prefiero dejarlo claro desde el arranque.", highlights: highlights(["no me termina de cuadrar", "prefiero dejarlo claro desde el arranque"]), shadowLine: "No me termina de cuadrar; prefiero dejarlo claro desde el arranque." },
  { id: "p2", text: "Cuando la idea todavía puede funcionar, “por ahí podemos ajustar el alcance” mantiene la conversación abierta. En Perú, “por ahí” y “de repente” suavizan la propuesta. Por eso “de repente lo podemos aterrizar” suena colaborativo: no rechaza la idea, la vuelve más realista.", translation: "When the idea can still work, por ahí podemos ajustar el alcance keeps the conversation open. In Peru, por ahí and de repente soften the proposal. That is why de repente lo podemos aterrizar sounds collaborative: it does not reject the idea, it makes it more realistic.", highlights: highlights(["por ahí podemos ajustar el alcance", "de repente lo podemos aterrizar"]), shadowLine: "Por ahí podemos ajustar el alcance y aterrizarlo." },
  { id: "p3", text: "El dinero también necesita precisión. “Si hablamos de ese monto” enmarca la conversación alrededor de la tarifa. Después puedes decir “ahí sí se me complica” o “no quisiera comprometerme de más”. Así explicas que el problema no es falta de voluntad, sino capacidad y límites.", translation: "Money also needs precision. Si hablamos de ese monto frames the conversation around the fee. Then you can say ahí sí se me complica or no quisiera comprometerme de más. That way you explain that the problem is not lack of willingness, but capacity and limits.", highlights: highlights(["si hablamos de ese monto", "ahí sí se me complica", "no quisiera comprometerme de más"]), shadowLine: "Si hablamos de ese monto, no quisiera comprometerme de más." },
  { id: "p4", text: "Un buen límite no tiene que sonar duro. “Hasta ahí podría llegar” muestra flexibilidad con una frontera clara. Si hay espacio para negociar, “por ese lado sí hay margen” ayuda a separar lo negociable de lo no negociable. Y “no me cierro a conversarlo” evita que la otra parte se ponga a la defensiva.", translation: "A good limit does not have to sound harsh. Hasta ahí podría llegar shows flexibility with a clear boundary. If there is room to negotiate, por ese lado sí hay margen helps separate what is negotiable from what is not. And no me cierro a conversarlo prevents the other side from getting defensive.", highlights: highlights(["hasta ahí podría llegar", "por ese lado sí hay margen", "no me cierro a conversarlo"]), shadowLine: "Hasta ahí podría llegar, pero no me cierro a conversarlo." },
  { id: "p5", text: "Cuando aparece trabajo nuevo, conviene nombrarlo sin rodeos. “Eso ya sería otro escenario” indica que las condiciones cambiaron. “Esto ya se sale de lo conversado” protege el alcance inicial. Y “tendría que reflejarse en la tarifa” conecta el pedido adicional con una consecuencia justa.", translation: "When new work appears, it is useful to name it directly. Eso ya sería otro escenario indicates that the conditions changed. Esto ya se sale de lo conversado protects the original scope. And tendría que reflejarse en la tarifa connects the additional request with a fair consequence.", highlights: highlights(["eso ya sería otro escenario", "esto ya se sale de lo conversado", "tendría que reflejarse en la tarifa"]), shadowLine: "Esto ya se sale de lo conversado y tendría que reflejarse en la tarifa." },
  { id: "p6", text: "Los roles también se pueden volver confusos. “No quisiera que se desdibuje el rol” sirve cuando una consultoría empieza a parecer ejecución, soporte o coordinación diaria. Para tratar el tema con madurez, puedes decir “pongamos eso sobre la mesa”.", translation: "Roles can also become confusing. No quisiera que se desdibuje el rol is useful when consulting starts to look like execution, support, or daily coordination. To handle the issue maturely, you can say pongamos eso sobre la mesa.", highlights: highlights(["no quisiera que se desdibuje el rol", "pongamos eso sobre la mesa"]), shadowLine: "No quisiera que se desdibuje el rol; pongamos eso sobre la mesa." },
  { id: "p7", text: "Negociar no es imponer. “Veamos dónde podemos ceder ambos” invita a buscar equilibrio. Si la otra parte acepta una condición clave, “con eso sí podríamos cerrar” funciona como un sí condicionado. No prometes todo; muestras el camino para llegar a un acuerdo.", translation: "Negotiating is not imposing. Veamos dónde podemos ceder ambos invites both sides to look for balance. If the other side accepts a key condition, con eso sí podríamos cerrar works as a conditional yes. You do not promise everything; you show the path to an agreement.", highlights: highlights(["veamos dónde podemos ceder ambos", "con eso sí podríamos cerrar"]), shadowLine: "Veamos dónde podemos ceder ambos; con eso sí podríamos cerrar." },
  { id: "p8", text: "Al final, después de mostrar apertura, también puedes cerrar con firmeza. “Te soy bien franco” prepara una verdad incómoda. “De ahí ya no me movería” comunica un límite final. La clave está en ser claro, profesional y consistente desde el arranque.", translation: "Finally, after showing openness, you can also close firmly. Te soy bien franco prepares an uncomfortable truth. De ahí ya no me movería communicates a final limit. The key is to be clear, professional, and consistent from the outset.", highlights: highlights(["te soy bien franco", "de ahí ya no me movería"]), shadowLine: "Te soy bien franco: de ahí ya no me movería." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-boundaries-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Negotiating scope and professional boundaries in Peruvian Spanish", "Planning a casual dinner", "Reacting to gossip", "Asking for transport directions"], correctAnswer: "Negotiating scope and professional boundaries in Peruvian Spanish", explanation: "The reading focuses on scope, fees, role clarity, compromise, and limits.", points: 1, skillTag: "gist" },
  { id: "peruvian-c1-boundaries-reading-q2", type: "multiple-choice", prompt: "Which phrase protects the original scope?", options: ["Esto ya se sale de lo conversado", "Me parece más aterrizado", "No me cierro a conversarlo", "Te soy bien franco"], correctAnswer: "Esto ya se sale de lo conversado", explanation: "This phrase says the new request goes beyond what was discussed.", points: 1, skillTag: "scope" },
  { id: "peruvian-c1-boundaries-reading-q3", type: "true-false", prompt: "True or false: “con eso sí podríamos cerrar” is a conditional yes.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says it works when the other side accepts a key condition.", points: 1, skillTag: "agreement" },
  { id: "peruvian-c1-boundaries-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Let’s see where we can both compromise.", wordBank: ["Veamos", "dónde", "podemos", "ceder", "ambos."], correctAnswer: "Veamos dónde podemos ceder ambos.", explanation: "This phrase invites mutual compromise.", points: 1, skillTag: "phrase-building" },
  { id: "peruvian-c1-boundaries-reading-q5", type: "multiple-choice", prompt: "Which phrase communicates a final boundary after flexibility?", options: ["De ahí ya no me movería", "Por ese lado sí hay margen", "No me cierro a conversarlo", "De repente lo podemos aterrizar"], correctAnswer: "De ahí ya no me movería", explanation: "This means beyond that, I wouldn’t budge.", points: 1, skillTag: "boundary" },
];

export const peruvianSpanishC1ProfessionalBoundariesNegotiationReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Peruvian C1 Reading: Negociar Sin Desdibujar el Rol",
  subtitle: "A synced Spanish reading about setting scope, fee, and role boundaries while staying collaborative.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "reading", "negotiation", "boundaries"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: negotiationVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Peruvian C1 professional boundaries and negotiation vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const peruvianSpanishC1ProfessionalBoundariesNegotiationQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Peruvian Spanish C1: Professional Boundaries & Negotiation Quiz",
  subtitle: "Choose the right Peruvian professional phrase for scope, rates, compromise, and firm boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "quiz", "negotiation", "professional boundaries"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice C1 Peruvian Spanish for professional negotiation: objections, scope creep, role clarity, fees, compromise, and final limits.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "peruvian-c1-boundaries-quiz-1", type: "multiple-choice", prompt: "A proposal feels off, but you want to sound professional. What fits?", options: ["No me termina de cuadrar", "Con eso sí podríamos cerrar", "De ahí ya no me movería", "Por ese lado sí hay margen"], correctAnswer: "No me termina de cuadrar", explanation: "This softly communicates that something does not quite add up.", points: 1, skillTag: "objection" },
      { id: "peruvian-c1-boundaries-quiz-2", type: "fill-blank", prompt: "Complete: Prefiero dejarlo claro desde el ____.", nativePrompt: "I prefer to make it clear from the outset.", correctAnswer: "arranque", explanation: "Desde el arranque means from the outset or from the beginning.", points: 1, skillTag: "boundary" },
      { id: "peruvian-c1-boundaries-quiz-3", type: "multiple-choice", prompt: "The client adds weekend support. Which phrase names the new situation?", options: ["Eso ya sería otro escenario", "No me cierro a conversarlo", "Me parece más aterrizado", "Por ese lado sí hay margen"], correctAnswer: "Eso ya sería otro escenario", explanation: "This signals that the conditions have changed.", points: 1, skillTag: "scope-creep" },
      { id: "peruvian-c1-boundaries-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "This goes beyond what we discussed.", wordBank: ["Esto", "ya", "se", "sale", "de", "lo", "conversado."], correctAnswer: "Esto ya se sale de lo conversado.", explanation: "This protects the original scope.", points: 1, skillTag: "scope" },
      { id: "peruvian-c1-boundaries-quiz-5", type: "true-false", prompt: "True or false: “no me cierro a conversarlo” keeps the negotiation open.", options: ["True", "False"], correctAnswer: "True", explanation: "It means you are open to discussing it.", points: 1, skillTag: "openness" },
      { id: "peruvian-c1-boundaries-quiz-6", type: "multiple-choice", prompt: "Extra responsibilities are added. Which phrase connects that to the fee?", options: ["Tendría que reflejarse en la tarifa", "Hasta ahí podría llegar", "Te soy bien franco", "De repente lo podemos aterrizar"], correctAnswer: "Tendría que reflejarse en la tarifa", explanation: "This means the extra work should be reflected in the rate.", points: 1, skillTag: "pricing" },
      { id: "peruvian-c1-boundaries-quiz-7", type: "fill-blank", prompt: "Complete: No quisiera que se ____ el rol.", nativePrompt: "I wouldn’t want the role to become blurred.", correctAnswer: "desdibuje", explanation: "Desdibujar el rol means to blur the role.", points: 1, skillTag: "role-clarity" },
      { id: "peruvian-c1-boundaries-quiz-8", type: "multiple-choice", prompt: "You want both sides to compromise. What do you say?", options: ["Veamos dónde podemos ceder ambos", "De ahí ya no me movería", "No me termina de cuadrar", "Eso ya sería otro escenario"], correctAnswer: "Veamos dónde podemos ceder ambos", explanation: "This directly invites mutual compromise.", points: 1, skillTag: "compromise" },
      { id: "peruvian-c1-boundaries-quiz-9", type: "true-false", prompt: "True or false: “de ahí ya no me movería” is a flexible opening offer.", options: ["True", "False"], correctAnswer: "False", explanation: "It communicates a final boundary after flexibility.", points: 1, skillTag: "firmness" },
      { id: "peruvian-c1-boundaries-quiz-10", type: "multiple-choice", prompt: "You want to be direct before saying something uncomfortable. Which opener fits?", options: ["Te soy bien franco", "Me parece más aterrizado", "Por ese lado sí hay margen", "Con eso sí podríamos cerrar"], correctAnswer: "Te soy bien franco", explanation: "This prepares a frank statement while keeping a relational tone.", points: 1, skillTag: "directness" },
      pairQuestion("peruvian-c1-boundaries-pairs-1", "Match soft objection and clarification phrases.", negotiationVocab.slice(0, 7)),
      pairQuestion("peruvian-c1-boundaries-pairs-2", "Match flexibility, scope, and pricing phrases.", negotiationVocab.slice(7, 14)),
      pairQuestion("peruvian-c1-boundaries-pairs-3", "Match role clarity, compromise, and firm closing phrases.", negotiationVocab.slice(14)),
    ],
  },
};
