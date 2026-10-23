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

type VocabItem = { id: string; term: string; meaning: string; matchingMeaning?: string; note: string; example: string; translation: string };

const courseId = "argentinian-spanish-b2-boliche-plans-late-night-timing";
const sectionName = "Argentinian Spanish - B2 Boliche Plans and Late-Night Timing";

const bolicheVocab: VocabItem[] = [
  { id: "que-pinta-hoy", term: "¿Qué pinta para hoy?", meaning: "What’s the plan for tonight? / What’s the move?", note: "Informal Argentine opener asking what plan feels likely or appealing.", example: "Che, ¿qué pinta para hoy?", translation: "Hey, what’s the move tonight?" },
  { id: "pinta-boliche", term: "¿Pinta ir al boliche?", meaning: "Fancy going clubbing?", note: "Pintar + infinitive asks whether an activity sounds appealing.", example: "Después de la previa, ¿pinta ir al boliche?", translation: "After pre-drinks, fancy going clubbing?" },
  { id: "boliche", term: "Boliche", meaning: "nightclub / club", note: "In Argentina, boliche commonly means nightclub.", example: "El boliche abre tarde.", translation: "The nightclub opens late." },
  { id: "la-previa", term: "La previa", meaning: "pregame / pre-drinks", note: "The social gathering before going to the main venue.", example: "Primero hacemos la previa.", translation: "First we’re having pre-drinks." },
  { id: "lo-de-mica", term: "En lo de Mica", meaning: "at Mica’s place", note: "Lo de + name means that person’s home or place.", example: "La previa es en lo de Mica.", translation: "Pre-drinks are at Mica’s place." },
  { id: "cae-tipo-doce", term: "Caé tipo doce", meaning: "show up around midnight", note: "Caé is a voseo imperative; tipo marks an approximate time.", example: "Caé tipo doce, no hace falta antes.", translation: "Show up around midnight; there’s no need to come earlier." },
  { id: "me-prendo", term: "Me prendo", meaning: "I’m down / count me in", note: "Informal acceptance of a social plan.", example: "Si van al boliche, me prendo.", translation: "If you’re going clubbing, count me in." },
  { id: "vemos-que-onda", term: "Vemos qué onda", meaning: "we’ll see what’s up / see how it goes", note: "Keeps the plan flexible until the situation becomes clearer.", example: "Arrancamos en la previa y vemos qué onda.", translation: "We’ll start at pre-drinks and see how it goes." },
  { id: "arranquemos-tranqui", term: "Arranquemos tranqui", meaning: "let’s start off chill / take it easy", note: "Tranqui softens the pace and keeps the opening relaxed.", example: "Arranquemos tranqui y después decidimos.", translation: "Let’s start off chill and decide later." },
  { id: "no-da-temprano", term: "No da caer tan temprano", meaning: "there’s no point showing up so early", note: "No da evaluates the timing as socially unsuitable or pointless.", example: "El lugar se llena tarde; no da caer tan temprano.", translation: "The place fills up late; there’s no point showing up so early." },
  { id: "movemos-tipo-dos", term: "Nos movemos tipo dos", meaning: "we’ll head out around two", note: "Moverse means leaving one place for the next part of the night.", example: "Hacemos la previa y nos movemos tipo dos.", translation: "We’ll have pre-drinks and head out around two." },
  { id: "pasame-ubi", term: "Pasame la ubi", meaning: "send me your location / drop your pin", note: "Ubi is informal shortening of ubicación; pasame is voseo.", example: "Pasame la ubi de la previa.", translation: "Send me the location for pre-drinks." },
  { id: "caigo-mas-tarde", term: "Caigo más tarde", meaning: "I’ll show up later", note: "Caer means arriving or dropping by informally.", example: "Arranquen ustedes; yo caigo más tarde.", translation: "You start; I’ll show up later." },
  { id: "me-re-colgue", term: "Me re colgué", meaning: "I totally lost track of time / completely forgot", note: "Re intensifies colgarse, a very Argentine informal admission.", example: "Perdón, me re colgué mirando una serie.", translation: "Sorry, I totally lost track of time watching a series." },
  { id: "saliendo-recien", term: "Estoy saliendo recién", meaning: "I’m only just leaving now", note: "Recién emphasizes that the departure is happening later than expected.", example: "Estoy saliendo recién; llego tarde.", translation: "I’m only just leaving now; I’ll be late." },
  { id: "llego-medio-tarde", term: "Llego medio tarde", meaning: "I’m going to be a bit late", note: "Medio softens the degree of lateness.", example: "Llego medio tarde, pero voy.", translation: "I’ll be a bit late, but I’m coming." },
  { id: "no-me-esperen", term: "No me esperen", meaning: "don’t wait for me", note: "Plural command telling the group to continue without the speaker.", example: "No me esperen para salir.", translation: "Don’t wait for me to head out." },
  { id: "voy-directo", term: "Voy directo para allá", meaning: "I’m heading straight there", note: "Skips the earlier meeting point and goes to the main destination.", example: "No llego a la previa; voy directo para allá.", translation: "I won’t make pre-drinks; I’m heading straight there." },
  { id: "ojo-que", term: "Ojo que…", meaning: "watch out / bear in mind that…", note: "Introduces an important warning or practical constraint.", example: "Ojo que la lista cierra temprano.", translation: "Bear in mind that the guest list closes early." },
  { id: "fila-tremenda", term: "Hay una fila tremenda", meaning: "there’s a massive queue", note: "Tremenda intensifies the size or seriousness of the queue.", example: "Apúrense, hay una fila tremenda.", translation: "Hurry up; there’s a massive queue." },
  { id: "vence-lista", term: "Se nos vence la lista", meaning: "our guest-list entry is about to expire", note: "Se nos marks a deadline affecting the whole group.", example: "Se nos vence la lista en veinte minutos.", translation: "Our guest-list entry expires in twenty minutes." },
  { id: "bajaron-dos", term: "Se bajaron dos", meaning: "two people bailed / dropped out", note: "Bajarse de un plan means withdrawing from it.", example: "Se bajaron dos a último momento.", translation: "Two people bailed at the last minute." },
  { id: "somos-cuatro", term: "Al final somos cuatro", meaning: "turns out there are only four of us", note: "Al final reports the final result after plans change.", example: "Se bajaron dos; al final somos cuatro.", translation: "Two bailed; turns out there are only four of us." },
  { id: "pincho-plan", term: "Se pinchó el plan", meaning: "the plan fell through / the plan’s dead", note: "Very informal phrase for a plan losing momentum or becoming impossible.", example: "Cerraron el lugar y se pinchó el plan.", translation: "The venue closed and the plan fell through." },
  { id: "ultimo-momento", term: "A último momento", meaning: "at the last minute", note: "Describes a late change or cancellation.", example: "Cambió de idea a último momento.", translation: "They changed their mind at the last minute." },
  { id: "cada-uno-lado", term: "Cada uno por su lado", meaning: "everyone goes separately / their own way", note: "The group stops travelling or coordinating together.", example: "Vamos cada uno por su lado y nos vemos allá.", translation: "We’ll each go separately and meet there." },
  { id: "y-listo", term: "Y listo", meaning: "and that’s that / sorted", note: "Closes a simple decision or solution.", example: "Nos vemos en la puerta y listo.", translation: "We’ll meet at the entrance, and that’s that." },
  { id: "pasamos-bien-igual", term: "La pasamos bien igual", meaning: "we’ll have a good time anyway", note: "Igual reassures the group despite a change or setback.", example: "Somos menos, pero la pasamos bien igual.", translation: "There are fewer of us, but we’ll have a good time anyway." },
  { id: "apurense", term: "Apúrense", meaning: "hurry up, you lot", note: "Plural command used with a group of friends.", example: "Apúrense que cierra la lista.", translation: "Hurry up; the guest list is closing." },
  { id: "salgamos-antes", term: "Salgamos antes", meaning: "let’s head out earlier", note: "First-person plural suggestion used to adjust timing.", example: "Hay mucha fila; salgamos antes.", translation: "There’s a long queue; let’s head out earlier." },
  { id: "estoy-saliendo", term: "Estoy saliendo", meaning: "I’m leaving now / on my way out", note: "Signals that departure has started now.", example: "Estoy saliendo; llego en media hora.", translation: "I’m leaving now; I’ll arrive in half an hour." },
  { id: "estamos-lista", term: "Estamos en la lista", meaning: "we’re on the guest list", note: "Confirms that the group has registered entry.", example: "Quedate tranqui, estamos en la lista.", translation: "Don’t worry, we’re on the guest list." },
  { id: "lista-cierra", term: "La lista cierra a la una y media", meaning: "the guest list closes at 1:30", note: "A specific deadline that affects the night’s timing.", example: "Apurémonos: la lista cierra a la una y media.", translation: "Let’s hurry: the guest list closes at 1:30." },
  { id: "vemos-puerta", term: "Nos vemos en la puerta", meaning: "see you at the entrance", note: "Useful when the group travels separately.", example: "Voy directo; nos vemos en la puerta.", translation: "I’m going straight there; see you at the entrance." },
  { id: "previa-mica", term: "Hacemos la previa en lo de Mica", meaning: "we’re having pre-drinks at Mica’s", note: "Combines the cultural idea of la previa with lo de + person.", example: "Hacemos la previa en lo de Mica y después salimos.", translation: "We’re having pre-drinks at Mica’s and heading out afterwards." },
  { id: "no-esperen-arrancar", term: "No me esperen para arrancar", meaning: "don’t wait for me to get started", note: "Tells the group to begin the plan without the late person.", example: "Llego tarde; no me esperen para arrancar.", translation: "I’ll be late; don’t wait for me to get started." },
  { id: "cuando-mas-gente", term: "Cuando haya más gente", meaning: "when more people turn up", note: "Uses present subjunctive after cuando for a future uncertain moment.", example: "Salimos cuando haya más gente.", translation: "We’ll head out when more people turn up." },
  { id: "quedamos-previa", term: "Nos quedamos en la previa", meaning: "we’ll stay at the pregame", note: "A backup plan when moving to the club no longer works.", example: "Si llueve, nos quedamos en la previa.", translation: "If it rains, we’ll stay at pre-drinks." },
  { id: "siguen-previa", term: "¿Siguen en la previa?", meaning: "are you guys still at the pregame?", note: "Checks whether the group has already moved on.", example: "Estoy llegando, ¿siguen en la previa?", translation: "I’m arriving; are you still at pre-drinks?" },
  { id: "movemos-juntos", term: "¿Nos movemos juntos?", meaning: "are we heading out together?", note: "Checks whether the group will travel to the next venue as one unit.", example: "¿Nos movemos juntos o cada uno por su lado?", translation: "Are we heading out together or separately?" },
];

const highlightMap = Object.fromEntries(bolicheVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.matchingMeaning ?? item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "medium", notes: item.note, starred: true };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return { id, speakerId, text, translation, vocabHighlights: highlights(phrases), messageType, audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers: [], explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

const sentenceVocab = bolicheVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB2BolichePlansLateNightTimingFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B2: Boliche Plans & Late-Night Timing Flashcards", subtitle: "Natural Argentine planning language for pre-drinks, clubs, late arrivals, guest lists, queues, dropouts, and backup plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "flashcards", "nightlife", "timing"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: bolicheVocab.map(cardFromVocab) },
};

export const argentinianSpanishB2BolichePlansLateNightTimingSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B2 Sentence Builder: Argentine Boliche Plans", subtitle: "Build flexible nightlife plans, communicate delays, react to dropouts, and save a night when the original plan fails.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["argentinian-spanish", "b2", "sentence-builder", "boliche", "timing"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Organise a night out: suggest pre-drinks and a club, set approximate times, handle a late friend and guest-list deadline, then propose a backup if the plan falls through.",
    stages: [
      stage("stage-1", "Suggest the night’s plan", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "What’s the move tonight? Fancy going clubbing?", "¿Qué pinta para hoy? ¿Pinta ir al boliche?", "Pintar + infinitive asks whether a plan sounds appealing.", breakdown([["What's the move tonight?", "¿Qué pinta para hoy?"], ["Fancy going", "¿Pinta ir"], ["clubbing", "al boliche"]])),
      stage("stage-2", "Arrange pre-drinks", sentenceVocab.slice(3, 7), sentenceVocab.slice(3, 7), "We’re having pre-drinks at Mica’s. Show up around midnight; I’m down.", "Hacemos la previa en lo de Mica. Caé tipo doce; me prendo.", "Lo de Mica means Mica’s place; tipo makes midnight approximate.", breakdown([["We're having pre-drinks", "Hacemos la previa"], ["at Mica's", "en lo de Mica"], ["Show up around midnight", "Caé tipo doce"], ["I'm down", "me prendo"]])),
      stage("stage-3", "Keep the start flexible", sentenceVocab.slice(7, 11), sentenceVocab.slice(7, 11), "Let’s start off chill and see how it goes. There’s no point showing up so early; we’ll head out around two.", "Arranquemos tranqui y vemos qué onda. No da caer tan temprano; nos movemos tipo dos.", "These phrases keep the plan flexible while establishing typical late timing.", breakdown([["Let's start off chill", "Arranquemos tranqui"], ["we'll see how it goes", "vemos qué onda"], ["there's no point showing up so early", "No da caer tan temprano"], ["we'll head out around two", "nos movemos tipo dos"]])),
      stage("stage-4", "Explain a late arrival", sentenceVocab.slice(11, 18), sentenceVocab.slice(11, 18), "Send me your location. I totally lost track of time and I’m only just leaving. Don’t wait for me; I’m heading straight there.", "Pasame la ubi. Me re colgué y estoy saliendo recién. No me esperen; voy directo para allá.", "Re intensifies the mistake; directo para allá skips the earlier meeting point.", breakdown([["Send me your location", "Pasame la ubi"], ["I totally lost track of time", "Me re colgué"], ["I'm only just leaving", "estoy saliendo recién"], ["Don't wait for me", "No me esperen"], ["I'm heading straight there", "voy directo para allá"]])),
      stage("stage-5", "Warn about the deadline", sentenceVocab.slice(18, 21), sentenceVocab.slice(31, 33), "Bear in mind that there’s a massive queue. We’re on the guest list, but it closes at 1:30.", "Ojo que hay una fila tremenda. Estamos en la lista, pero la lista cierra a la una y media.", "Ojo que introduces a constraint; the list deadline changes the group’s timing.", breakdown([["Bear in mind that", "Ojo que"], ["there's a massive queue", "hay una fila tremenda"], ["we're on the guest list", "Estamos en la lista"], ["it closes at 1:30", "la lista cierra a la una y media"]])),
      stage("stage-6", "React to dropouts", sentenceVocab.slice(21, 24), sentenceVocab.slice(21, 24), "Two people bailed at the last minute. Turns out there are only four of us, but the plan isn’t dead.", "Se bajaron dos a último momento. Al final somos cuatro, pero no se pinchó el plan.", "Bajarse means dropping out; pincharse describes a plan losing momentum or failing.", breakdown([["Two people bailed", "Se bajaron dos"], ["at the last minute", "a último momento"], ["Turns out there are only four of us", "Al final somos cuatro"], ["the plan isn't dead", "no se pinchó el plan"]])),
      stage("stage-7", "Coordinate movement", sentenceVocab.slice(25, 30), sentenceVocab.slice(33, 40), "Are we heading out together? If not, everyone goes separately and we meet at the entrance. Sorted.", "¿Nos movemos juntos? Si no, cada uno por su lado, nos vemos en la puerta y listo.", "This turns a fragmented group into a clear meeting plan.", breakdown([["Are we heading out together?", "¿Nos movemos juntos?"], ["everyone goes separately", "cada uno por su lado"], ["we meet at the entrance", "nos vemos en la puerta"], ["Sorted", "y listo"]])),
      stage("stage-8", "Save the night", sentenceVocab.slice(23, 30), sentenceVocab, "If the plan falls through, we’ll stay at pre-drinks or find another place. We’ll have a good time anyway.", "Si se pincha el plan, nos quedamos en la previa o buscamos otro lugar. La pasamos bien igual.", "A practical backup prevents one failed venue from ending the whole night.", breakdown([["If the plan falls through", "Si se pincha el plan"], ["we'll stay at pre-drinks", "nos quedamos en la previa"], ["we find another place", "buscamos otro lugar"], ["we'll have a good time anyway", "La pasamos bien igual"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-boliche-story-q1", type: "multiple-choice", prompt: "What is the original plan?", options: ["Pre-drinks at Mica’s followed by a club", "Dinner at a restaurant", "A house party only", "A morning concert"], correctAnswer: "Pre-drinks at Mica’s followed by a club", explanation: "The plan is established in the first three messages.", points: 1, skillTag: "plan" },
  { id: "arg-boliche-story-q2", type: "multiple-choice", prompt: "When do they initially plan to leave pre-drinks?", options: ["Around two", "At midnight", "At ten", "At three-thirty"], correctAnswer: "Around two", explanation: "Sol says they can move around two because arriving very early is not worthwhile.", points: 1, skillTag: "timing" },
  { id: "arg-boliche-story-q3", type: "multiple-choice", prompt: "What does Fede ask Sol to send?", options: ["Mica’s location", "A ticket", "A music playlist", "Money"], correctAnswer: "Mica’s location", explanation: "He asks pasame la ubi before saying he will arrive later.", points: 1, skillTag: "location" },
  { id: "arg-boliche-story-q4", type: "multiple-choice", prompt: "Why is Fede late?", options: ["He lost track of time", "His train was cancelled", "He went to the wrong club", "He forgot his ID"], correctAnswer: "He lost track of time", explanation: "He says me re colgué and is only just leaving.", points: 1, skillTag: "delay" },
  { id: "arg-boliche-story-q5", type: "multiple-choice", prompt: "What new timing problem appears?", options: ["The guest list closes at 1:30 and there is a huge queue", "The club closes at midnight", "Mica asks everyone to leave", "The music starts early"], correctAnswer: "The guest list closes at 1:30 and there is a huge queue", explanation: "Both facts are revealed before message 15.", points: 1, skillTag: "deadline" },
  { id: "arg-boliche-story-q6", type: "multiple-choice", prompt: "How many people remain after two friends bail?", options: ["Four", "Two", "Six", "Eight"], correctAnswer: "Four", explanation: "Sol says two bailed and now they are four.", points: 1, skillTag: "group-size" },
  { id: "arg-boliche-story-q7", type: "multiple-choice", prompt: "Why does the group split up?", options: ["Some want to leave early while others want to stay at pre-drinks", "They are going to different cities", "The club rejects half the group", "Fede goes home"], correctAnswer: "Some want to leave early while others want to stay at pre-drinks", explanation: "The disagreement about departure time is clear by message 21.", points: 1, skillTag: "decision" },
  { id: "arg-boliche-story-q8", type: "multiple-choice", prompt: "Where is Fede waiting by message 24?", options: ["At the club entrance", "At Mica’s", "At home", "Inside the club"], correctAnswer: "At the club entrance", explanation: "He goes directly there and reports the queue from the entrance.", points: 1, skillTag: "location-update" },
  { id: "arg-boliche-story-q9", type: "multiple-choice", prompt: "What happens to the original club plan?", options: ["They miss the guest-list deadline", "They enter immediately", "The queue disappears", "Everyone returns home"], correctAnswer: "They miss the guest-list deadline", explanation: "The list closes while they are still outside, so the original plan falls through.", points: 1, skillTag: "setback" },
  { id: "arg-boliche-story-q10", type: "multiple-choice", prompt: "How does the night end?", options: ["The four friends find a nearby bar with live music", "They cancel everything", "Only Fede goes dancing", "They return to Mica’s and sleep"], correctAnswer: "The four friends find a nearby bar with live music", explanation: "The final messages show that the backup succeeds and they enjoy the night anyway.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishB2BolichePlansLateNightTimingWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B2 Story: The Guest-List Countdown", subtitle: "Sol and Fede organise pre-drinks and a boliche, then race a closing guest list while late arrivals and dropouts reshape the night.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "WhatsApp", "boliche", "nightlife"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "sol", name: "Sol", initials: "S", side: "left", color: "violet" }, { id: "fede", name: "Fede", initials: "F", side: "right", color: "blue" }],
    messages: [
      message("m1", "sol", "Che, ¿qué pinta para hoy?", "Hey, what’s the move tonight?", ["¿Qué pinta para hoy?"]),
      message("m2", "sol", "Hacemos la previa en lo de Mica y después, ¿pinta ir al boliche?", "We’re having pre-drinks at Mica’s and then, fancy going clubbing?", ["Hacemos la previa en lo de Mica", "La previa", "En lo de Mica", "¿Pinta ir al boliche?", "Boliche"]),
      message("m3", "fede", "De una, me prendo. Arranquemos tranqui y vemos qué onda.", "Absolutely, I’m down. Let’s start off chill and see how it goes.", ["Me prendo", "Arranquemos tranqui", "Vemos qué onda"], "voice-note"),
      message("m4", "sol", "Caé tipo doce. Antes no va a haber nadie.", "Show up around midnight. There won’t be anyone before that.", ["Caé tipo doce"]),
      message("m5", "fede", "Sí, no da caer tan temprano al boliche.", "Yes, there’s no point showing up at the club so early.", ["No da caer tan temprano"]),
      message("m6", "sol", "Entonces nos movemos tipo dos, cuando haya más gente.", "Then we’ll head out around two, when more people have arrived.", ["Nos movemos tipo dos", "Cuando haya más gente"], "voice-note"),
      message("m7", "fede", "Pasame la ubi de Mica, que no tengo guardada la dirección.", "Send me Mica’s location; I don’t have the address saved.", ["Pasame la ubi"]),
      message("m8", "sol", "Ahí te la mandé. Estamos en la lista del boliche también.", "I’ve just sent it. We’re on the club’s guest list too.", ["Estamos en la lista"]),
      message("m9", "fede", "Genial. Igual caigo más tarde porque antes tengo una cena.", "Great. I’ll still show up later because I have dinner first.", ["Caigo más tarde"]),
      message("m10", "fede", "Perdón, me re colgué con la sobremesa.", "Sorry, I totally lost track of time after dinner.", ["Me re colgué"]),
      message("m11", "fede", "Estoy saliendo recién y llego medio tarde.", "I’m only just leaving now and I’ll be a bit late.", ["Estoy saliendo recién", "Llego medio tarde"]),
      message("m12", "fede", "No me esperen para arrancar; voy directo para allá.", "Don’t wait for me to get started; I’m heading straight there.", ["No me esperen para arrancar", "Voy directo para allá"], "voice-note"),
      message("m13", "sol", "Ojo que la lista cierra a la una y media, no a las dos.", "Bear in mind that the guest list closes at 1:30, not two.", ["Ojo que...", "La lista cierra a la una y media"]),
      message("m14", "sol", "Y me dijeron que hay una fila tremenda.", "And they told me there’s a massive queue.", ["Hay una fila tremenda"]),
      message("m15", "sol", "Apúrense, porque se nos vence la lista.", "Hurry up, because our guest-list entry is about to expire.", ["Apúrense", "Se nos vence la lista"]),
      message("m16", "fede", "Voy directo a la puerta. No paso por la previa.", "I’m going straight to the entrance. I’m not stopping at pre-drinks.", ["Voy directo para allá", "Nos vemos en la puerta"]),
      message("m17", "sol", "Cambio de número: se bajaron dos a último momento.", "Change in numbers: two people bailed at the last minute.", ["Se bajaron dos", "A último momento"]),
      message("m18", "sol", "Al final somos cuatro, pero la pasamos bien igual.", "Turns out there are only four of us, but we’ll have a good time anyway.", ["Al final somos cuatro", "La pasamos bien igual"], "voice-note"),
      message("m19", "sol", "Yo digo que salgamos antes para cuidar la lista.", "I say we should head out earlier to protect our guest-list entry.", ["Salgamos antes"]),
      message("m20", "fede", "¿Y Mica? ¿Siguen en la previa?", "And Mica? Are you still at pre-drinks?", ["¿Siguen en la previa?"]),
      message("m21", "sol", "Mica quiere esperar. Así que no nos movemos juntos: algunos salen y otros se quedan.", "Mica wants to wait. So we’re not heading out together: some leave and others stay.", ["¿Nos movemos juntos?", "Nos quedamos en la previa"]),
      message("m22", "fede", "Llegué a la puerta. Son la una y veinte.", "I’ve arrived at the entrance. It’s 1:20.", ["Nos vemos en la puerta"]),
      message("m23", "fede", "La fila da toda la vuelta a la esquina.", "The queue goes all the way around the corner.", []),
      message("m24", "fede", "Apúrense: quedan diez minutos y la fila no avanza.", "Hurry up: there are ten minutes left and the queue isn’t moving.", ["Apúrense", "Hay una fila tremenda"], "voice-note"),
      message("m25", "sol", "Llegamos, pero cerraron la lista mientras estábamos afuera.", "We arrived, but they closed the guest list while we were outside.", []),
      message("m26", "fede", "Bueno, se pinchó el plan del boliche.", "Well, the club plan fell through.", ["Se pinchó el plan"]),
      message("m27", "sol", "Hay un bar con música en vivo a tres cuadras. Vamos cada uno por su lado y nos vemos ahí, y listo.", "There’s a bar with live music three blocks away. We’ll each go separately and meet there, sorted.", ["Cada uno por su lado", "Y listo"]),
      message("m28", "fede", "Ya entré. Está buenísimo y no hay fila.", "I’m already inside. It’s great and there’s no queue.", []),
      message("m29", "sol", "Llegamos los cuatro. Menos mal que no nos quedamos peleando con la lista.", "All four of us arrived. Good thing we didn’t stay fighting with the guest list.", []),
      message("m30", "fede", "Al final la pasamos bien igual. Cambió el lugar, no la noche.", "In the end we had a good time anyway. The venue changed, not the night.", ["La pasamos bien igual", "Al final somos cuatro"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-boliche-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: bolicheVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: bolicheVocab.map((item) => item.term),
      grammarPatterns: ["Pintar + infinitive for appealing plans.", "Caer for arriving informally and tipo + time for approximation.", "Re and medio as informal intensifiers or softeners."],
      speakingPrompts: ["Suggest a boliche plan with pre-drinks.", "Explain that you are running late and tell friends not to wait.", "Warn the group about a guest-list deadline.", "Save the night after the original plan falls through."],
    },
    completionTask: { title: "Your Argentine B2 night-out voice note", instructions: "Record a 90-second voice note organising a late-night plan. Include the previa, approximate times, one delay, a guest-list warning, and a backup plan." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Argentina, una noche puede empezar con “¿qué pinta para hoy?” o “¿pinta ir al boliche?”. “Pintar” presenta una posibilidad que resulta atractiva, no una obligación. El “boliche” es el club nocturno, pero muchas veces el primer punto del plan es “la previa”, una reunión más chica antes de salir.", translation: "In Argentina, a night may begin by asking what plan sounds appealing. Boliche is the nightclub, while la previa is the smaller gathering beforehand.", highlights: highlights(["¿Qué pinta para hoy?", "¿Pinta ir al boliche?", "Boliche", "La previa"]), shadowLine: "¿Qué pinta para hoy? ¿Pinta ir al boliche?" },
  { id: "p2", text: "La previa puede ser “en lo de Mica”: “lo de” más un nombre significa la casa o el lugar de esa persona. “Hacemos la previa en lo de Mica” fija el punto de encuentro. Si alguien acepta, dice “me prendo”; si el plan todavía está abierto, agrega “vemos qué onda”.", translation: "Lo de + name means that person’s place. Me prendo accepts the plan, while vemos qué onda keeps it flexible.", highlights: highlights(["En lo de Mica", "Hacemos la previa en lo de Mica", "Me prendo", "Vemos qué onda"]), shadowLine: "Hacemos la previa en lo de Mica y vemos qué onda." },
  { id: "p3", text: "Los horarios nocturnos suelen expresarse con “tipo”: “caé tipo doce” o “nos movemos tipo dos”. “Tipo” significa aproximadamente. “Arranquemos tranqui” propone un comienzo relajado, mientras que “no da caer tan temprano” evalúa que llegar antes no tiene sentido social o práctico.", translation: "Tipo marks an approximate time. The other phrases establish a relaxed start and explain why arriving early is not worthwhile.", highlights: highlights(["Caé tipo doce", "Nos movemos tipo dos", "Arranquemos tranqui", "No da caer tan temprano"]), shadowLine: "Caé tipo doce y nos movemos tipo dos." },
  { id: "p4", text: "Cuando alguien se atrasa, puede pedir “pasame la ubi”, avisar “caigo más tarde” o admitir “me re colgué”. “Re” intensifica el descuido. “Estoy saliendo recién” deja claro que la salida empezó demasiado tarde; “llego medio tarde” suaviza la demora. Si el grupo no debe esperar, aparece “no me esperen para arrancar” o “voy directo para allá”.", translation: "These phrases manage a late arrival, from requesting the location to admitting lost time and telling the group to continue.", highlights: highlights(["Pasame la ubi", "Caigo más tarde", "Me re colgué", "Estoy saliendo recién", "Llego medio tarde", "No me esperen para arrancar", "Voy directo para allá"]), shadowLine: "Me re colgué; estoy saliendo recién. No me esperen." },
  { id: "p5", text: "Las listas cambian el ritmo de la noche. “Estamos en la lista” confirma la entrada registrada, pero “la lista cierra a la una y media” impone un límite. “Ojo que…” introduce la advertencia. Si además “hay una fila tremenda”, alguien dirá “apúrense” o propondrá “salgamos antes” porque “se nos vence la lista”.", translation: "Guest lists impose a deadline. These expressions warn the group about registration, queues, urgency, and leaving earlier.", highlights: highlights(["Estamos en la lista", "La lista cierra a la una y media", "Ojo que...", "Hay una fila tremenda", "Apúrense", "Salgamos antes", "Se nos vence la lista"]), shadowLine: "Ojo que hay una fila tremenda y se nos vence la lista." },
  { id: "p6", text: "El grupo también puede achicarse. “Se bajaron dos” significa que dos personas abandonaron el plan, muchas veces “a último momento”. Después se recalcula: “al final somos cuatro”. Si ya no se puede hacer lo acordado, “se pinchó el plan”. La expresión es informal y comunica que la idea perdió fuerza o dejó de funcionar.", translation: "People may bail at the last minute, changing the final group size. Se pinchó el plan says the original plan has fallen through.", highlights: highlights(["Se bajaron dos", "A último momento", "Al final somos cuatro", "Se pinchó el plan"]), shadowLine: "Se bajaron dos; al final somos cuatro y se pinchó el plan." },
  { id: "p7", text: "Mover a todos juntos no siempre es posible. “¿Nos movemos juntos?” pregunta por la coordinación; “cada uno por su lado” acepta que viajen separados. Para simplificar: “nos vemos en la puerta y listo”. Quien llega tarde también puede preguntar “¿siguen en la previa?”, mientras otros deciden “nos quedamos en la previa” hasta que haya más gente.", translation: "These phrases coordinate travelling together, separately, meeting at the entrance, or staying at pre-drinks.", highlights: highlights(["¿Nos movemos juntos?", "Cada uno por su lado", "Nos vemos en la puerta", "Y listo", "¿Siguen en la previa?", "Nos quedamos en la previa", "Cuando haya más gente"]), shadowLine: "Cada uno por su lado, nos vemos en la puerta y listo." },
  { id: "p8", text: "Un plan nocturno flexible no depende de un solo lugar. Aunque falle el boliche, “la pasamos bien igual” cambia el foco del problema a la compañía. “Estoy saliendo” mantiene informado al grupo, y una alternativa clara evita que una demora o una lista vencida termine toda la noche.", translation: "A flexible night does not depend on one venue. La pasamos bien igual focuses on the company, while clear updates and alternatives keep the night alive.", highlights: highlights(["La pasamos bien igual", "Estoy saliendo"]), shadowLine: "Cambió el lugar, pero la pasamos bien igual." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-boliche-reading-q1", type: "multiple-choice", prompt: "What does “pintar + infinitive” express here?", options: ["A plan that sounds appealing", "A fixed obligation", "A past habit", "A formal order"], correctAnswer: "A plan that sounds appealing", explanation: "Pintar introduces an attractive possibility rather than a commitment.", points: 1, skillTag: "pattern" },
  { id: "arg-boliche-reading-q2", type: "multiple-choice", prompt: "What does “tipo dos” mean?", options: ["Around two", "Exactly two", "Two places", "Two people"], correctAnswer: "Around two", explanation: "Tipo makes the time approximate.", points: 1, skillTag: "timing" },
  { id: "arg-boliche-reading-q3", type: "true-false", prompt: "True or false: “Se bajaron dos” means two more people joined.", options: ["True", "False"], correctAnswer: "False", explanation: "It means two people withdrew from the plan.", points: 1, skillTag: "slang" },
  { id: "arg-boliche-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I totally lost track of time and I’m only just leaving now.", wordBank: ["Me", "re", "colgué", "y", "estoy", "saliendo", "recién."], correctAnswer: "Me re colgué y estoy saliendo recién.", explanation: "Re intensifies colgarse; recién emphasizes the delayed departure.", points: 2, skillTag: "delay" },
  { id: "arg-boliche-reading-q5", type: "multiple-choice", prompt: "Which phrase keeps the night positive after the venue plan fails?", options: ["La pasamos bien igual", "Se nos vence la lista", "Hay una fila tremenda", "No me esperen"], correctAnswer: "La pasamos bien igual", explanation: "It reassures the group that they can still enjoy themselves.", points: 1, skillTag: "backup" },
];

export const argentinianSpanishB2BolichePlansLateNightTimingReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B2 Reading: De la Previa al Plan B", subtitle: "A synced Spanish reading about Argentine nightlife planning, approximate timing, guest lists, delays, dropouts, and flexible backup plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "reading", "boliche", "nightlife"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: bolicheVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Argentinian B2 boliche plans and late-night timing vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const argentinianSpanishB2BolichePlansLateNightTimingQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian Spanish B2: Boliche Plans & Late-Night Timing Quiz", subtitle: "Choose the right Argentine expression for nightlife plans, delays, guest lists, dropouts, and backup decisions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "quiz", "boliche", "timing"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Practice choosing natural Argentine nightlife expressions in fresh situations.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-boliche-quiz-1", type: "multiple-choice", prompt: "You want to ask friends what the plan is tonight. What do you say?", options: ["¿Qué pinta para hoy?", "Se pinchó el plan", "Se nos vence la lista", "Caigo más tarde"], correctAnswer: "¿Qué pinta para hoy?", explanation: "This naturally asks what the move is tonight.", points: 1, skillTag: "planning" },
      { id: "arg-boliche-quiz-2", type: "fill-blank", prompt: "Complete: Si van al boliche, me ______.", nativePrompt: "If you’re going clubbing, count me in.", correctAnswer: "prendo", explanation: "Me prendo means I’m down or count me in.", points: 1, skillTag: "accepting" },
      { id: "arg-boliche-quiz-3", type: "multiple-choice", prompt: "You need the pin for your friend’s house. Which phrase fits?", options: ["Pasame la ubi", "Nos vemos en la puerta", "Apúrense", "Vemos qué onda"], correctAnswer: "Pasame la ubi", explanation: "Ubi is informal shortening of ubicación.", points: 1, skillTag: "location" },
      { id: "arg-boliche-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I totally lost track of time and I’m only just leaving.", wordBank: ["Me", "re", "colgué", "y", "estoy", "saliendo", "recién."], correctAnswer: "Me re colgué y estoy saliendo recién.", explanation: "This is a natural informal late-arrival update.", points: 2, skillTag: "lateness" },
      { id: "arg-boliche-quiz-5", type: "true-false", prompt: "True or false: “Tipo doce” means exactly midnight with no flexibility.", options: ["True", "False"], correctAnswer: "False", explanation: "Tipo makes the time approximate.", points: 1, skillTag: "timing" },
      { id: "arg-boliche-quiz-6", type: "multiple-choice", prompt: "The guest list closes soon. What warning fits?", options: ["Ojo que se nos vence la lista", "La pasamos bien igual", "Me prendo", "Caigo más tarde"], correctAnswer: "Ojo que se nos vence la lista", explanation: "Ojo que introduces the important deadline.", points: 1, skillTag: "warning" },
      { id: "arg-boliche-quiz-7", type: "fill-blank", prompt: "Complete: Se ______ dos a último momento.", nativePrompt: "Two people bailed at the last minute.", correctAnswer: "bajaron", explanation: "Bajarse de un plan means withdrawing from it.", points: 1, skillTag: "dropout" },
      { id: "arg-boliche-quiz-8", type: "multiple-choice", prompt: "The original venue is no longer possible. Which phrase describes this?", options: ["Se pinchó el plan", "Me re colgué", "Nos movemos tipo dos", "Estamos en la lista"], correctAnswer: "Se pinchó el plan", explanation: "The phrase means the plan fell through or died.", points: 1, skillTag: "setback" },
      { id: "arg-boliche-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Everyone goes separately and we meet at the entrance.", wordBank: ["Cada", "uno", "por", "su", "lado", "y", "nos", "vemos", "en", "la", "puerta."], correctAnswer: "Cada uno por su lado y nos vemos en la puerta.", explanation: "This coordinates a group that is no longer travelling together.", points: 2, skillTag: "coordination" },
      { id: "arg-boliche-quiz-10", type: "multiple-choice", prompt: "Two people cancel, but you want to reassure the group. What do you say?", options: ["Al final somos cuatro, pero la pasamos bien igual", "No me esperen para arrancar", "Hay una fila tremenda", "Estoy saliendo recién"], correctAnswer: "Al final somos cuatro, pero la pasamos bien igual", explanation: "This acknowledges the smaller group while keeping the mood positive.", points: 1, skillTag: "reassurance" },
      pairQuestion("arg-boliche-pairs-1", "Match plans, places, timing, and flexible decisions.", bolicheVocab.slice(0, 14)),
      pairQuestion("arg-boliche-pairs-2", "Match delays, warnings, dropouts, and backup reactions.", bolicheVocab.slice(14, 27)),
      pairQuestion("arg-boliche-pairs-3", "Match guest-list, meeting, and movement phrases.", bolicheVocab.slice(27)),
    ],
  },
};
