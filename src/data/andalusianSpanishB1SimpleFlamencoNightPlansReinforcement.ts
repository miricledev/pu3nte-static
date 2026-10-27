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

type VocabItem = { id: string; term: string; meaning: string; note: string; example: string; translation: string };

const courseId = "andalusian-spanish-b1-simple-flamenco-night-plans";
const sectionName = "Andalusian Spanish - B1 Simple Flamenco Night Plans";

const flamencoVocab: VocabItem[] = [
  { id: "venis-flamenco", term: "¿Os venís a escuchar flamenco?", meaning: "Are you lot coming to listen to some flamenco?", note: "Os venís addresses a group informally with vosotros.", example: "¿Os venís a escuchar flamenco esta noche?", translation: "Are you all coming to listen to flamenco tonight?" },
  { id: "me-apunto", term: "Yo me apunto", meaning: "I'm in! / Count me in", note: "An enthusiastic and natural acceptance of a social plan.", example: "Si hay cante en directo, yo me apunto.", translation: "If there's live flamenco singing, count me in." },
  { id: "sobre-nueve", term: "¿Quedamos sobre las nueve?", meaning: "Shall we meet around nine?", note: "Sobre makes the time approximate rather than exact.", example: "¿Quedamos sobre las nueve delante del local?", translation: "Shall we meet around nine outside the venue?" },
  { id: "pena-tablao", term: "¿Es en una peña o en un tablao?", meaning: "Is it at a flamenco club or a performance venue?", note: "The question distinguishes two different flamenco settings.", example: "¿Es en una peña o en un tablao del centro?", translation: "Is it at a flamenco club or a tablao in the centre?" },
  { id: "hay-reservar", term: "Miramos si hay que reservar", meaning: "Let's check if we need to book", note: "Hay que plus infinitive expresses necessity.", example: "Antes de salir, miramos si hay que reservar.", translation: "Before going out, let's check whether we need to book." },
  { id: "quien-canta", term: "¿Quién canta esta noche?", meaning: "Who's singing tonight?", note: "Cantar refers to the flamenco singer performing that night.", example: "¿Quién canta esta noche en la peña?", translation: "Who's singing at the flamenco club tonight?" },
  { id: "tira-cante", term: "Me tira más el cante en directo", meaning: "I'm more into live flamenco singing", note: "Me tira más expresses attraction or preference naturally.", example: "El baile está bien, pero me tira más el cante en directo.", translation: "The dancing is good, but I'm more drawn to live singing." },
  { id: "hay-guitarra", term: "¿Hay guitarra también?", meaning: "Is there guitar playing too?", note: "A concise question about the performance lineup.", example: "¿Canta solo o hay guitarra también?", translation: "Is the singer alone, or is there guitar too?" },
  { id: "pillamos-sitio", term: "A ver si pillamos sitio", meaning: "Hopefully we can get a spot", note: "A ver si adds hope or uncertainty; pillar means get or grab.", example: "Vamos temprano, a ver si pillamos sitio cerca.", translation: "Let's go early and hopefully get a nearby spot." },
  { id: "hora-pase", term: "¿A qué hora empieza el pase?", meaning: "What time does the performance start?", note: "Pase refers to a show or performance segment.", example: "¿A qué hora empieza el primer pase?", translation: "What time does the first performance start?" },
  { id: "que-voz", term: "No veas qué voz tiene", meaning: "Bloody hell, what a voice!", note: "No veas intensifies admiration in informal Andalusian conversation.", example: "No veas qué voz tiene la cantaora.", translation: "The singer has an incredible voice." },
  { id: "pelos-punta", term: "Se me ponen los pelos de punta", meaning: "It gives me goosebumps", note: "A common expression for a strong emotional or physical reaction.", example: "Con esa voz se me ponen los pelos de punta.", translation: "That voice gives me goosebumps." },
  { id: "quejio-llegado", term: "Ese quejío me ha llegado", meaning: "That soulful cry really moved me", note: "Me ha llegado means it touched the speaker emotionally.", example: "Ese último quejío me ha llegado de verdad.", translation: "That last soulful cry really moved me." },
  { id: "cuesta-compas", term: "Me cuesta seguir el compás", meaning: "I struggle to keep up with the rhythm", note: "Costar plus infinitive expresses difficulty doing something.", example: "Me gusta escuchar, pero me cuesta seguir el compás.", translation: "I like listening, but I struggle to follow the rhythm." },
  { id: "escuchamos-sin-hablar", term: "Mejor escuchamos sin hablar", meaning: "Better to just listen without talking", note: "A considerate suggestion during a focused performance moment.", example: "Empieza el cante; mejor escuchamos sin hablar.", translation: "The singing is starting; we'd better listen without talking." },
  { id: "viene-cante", term: "Espera, que viene el cante", meaning: "Hang on, the singing's about to start", note: "Que introduces the reason for waiting or stopping.", example: "No pidas ahora; espera, que viene el cante.", translation: "Don't order now; wait, the singing's about to start." },
  { id: "que-arte", term: "¡Qué arte tiene!", meaning: "What talent! / They've got such flair!", note: "Arte praises artistry, presence, charm, or a special way of doing something.", example: "Mira cómo entra en el compás: ¡qué arte tiene!", translation: "Look how they enter the rhythm: what talent!" },
  { id: "cortar-momento", term: "No quiero cortar el momento", meaning: "I don't want to ruin the moment", note: "Cortar el momento means interrupting a special atmosphere.", example: "Luego te contesto; no quiero cortar el momento.", translation: "I'll answer you later; I don't want to ruin the moment." },
  { id: "ratito-mas-question", term: "¿Nos quedamos un ratito más?", meaning: "Shall we stay a little longer?", note: "Ratito makes the extension sound small and manageable.", example: "Queda otro pase; ¿nos quedamos un ratito más?", translation: "There's another performance; shall we stay a little longer?" },
  { id: "manana-madrugo", term: "Mañana madrugo", meaning: "I've got to be up early tomorrow", note: "A concise reason for setting a limit on a late plan.", example: "Me quedaría, pero mañana madrugo.", translation: "I'd stay, but I have to get up early tomorrow." },
  { id: "merecido-pena", term: "Ha merecido la pena", meaning: "It was worth it", note: "A versatile evaluation of time, money, or effort.", example: "Hemos esperado bastante, pero ha merecido la pena.", translation: "We waited quite a while, but it was worth it." },
  { id: "comentamos-calma", term: "Luego lo comentamos con calma", meaning: "We'll talk about it properly afterwards", note: "Con calma postpones the discussion until a less intense moment.", example: "Ahora escucha; luego lo comentamos con calma.", translation: "Listen now; we'll discuss it properly afterwards." },
  { id: "igual-hasta-arriba", term: "Que igual está hasta arriba", meaning: "Because it might be absolutely packed", note: "Igual can mean perhaps or maybe in informal Spain Spanish.", example: "Vamos temprano, que igual está hasta arriba.", translation: "Let's go early because it might be packed." },
  { id: "no-llegamos-tarde", term: "Así no llegamos tarde", meaning: "That way we won't arrive late", note: "Así refers back to a practical arrangement or earlier departure.", example: "Cogemos el autobús anterior y así no llegamos tarde.", translation: "We'll take the earlier bus so we won't arrive late." },
  { id: "justo-ahora", term: "Justo ahora", meaning: "Right now / At this very moment", note: "Justo emphasizes exact timing.", example: "El primer pase empieza justo ahora.", translation: "The first performance starts right now." },
  { id: "un-ratito-mas", term: "Un ratito más", meaning: "Just a little longer", note: "A compact answer when negotiating how long to remain.", example: "Vale, un ratito más y nos vamos.", translation: "Okay, a little longer and then we'll go." },
  { id: "con-calma", term: "Con calma", meaning: "Without rushing / Properly, in our own time", note: "Signals a relaxed pace or fuller later discussion.", example: "Después hablamos con calma.", translation: "We'll talk properly afterwards." },
  { id: "en-directo", term: "En directo", meaning: "Live / In person", note: "Used for music, broadcasts, or performances happening live.", example: "Nunca había escuchado esta voz en directo.", translation: "I'd never heard this voice live." },
  { id: "sin-hablar", term: "Sin hablar", meaning: "Without talking", note: "A concise manner phrase used after a verb.", example: "Nos quedamos escuchando sin hablar.", translation: "We stay listening without talking." },
  { id: "aunque-madrugo", term: "Aunque mañana madrugo", meaning: "Even though I've got to be up early tomorrow", note: "Aunque introduces a concession that does not completely block the plan.", example: "Me quedo al segundo pase, aunque mañana madrugo.", translation: "I'll stay for the second performance even though I have to get up early." },
  { id: "a-ver-si", term: "A ver si...", meaning: "Let's see if... / Hopefully...", note: "Introduces a hopeful or uncertain possibility.", example: "A ver si empieza pronto.", translation: "Hopefully it starts soon." },
  { id: "pillar-sitio", term: "Pillar sitio", meaning: "To find or grab a spot", note: "Pillar is a very common informal verb in Spain.", example: "Llegamos temprano para pillar sitio.", translation: "We arrive early to get a spot." },
  { id: "pena-flamenca", term: "Peña flamenca", meaning: "Flamenco association or club", note: "Often connected to traditional, community-based flamenco activity.", example: "La peña flamenca organiza actuaciones pequeñas.", translation: "The flamenco club organizes small performances." },
  { id: "tablao", term: "Tablao", meaning: "Venue specialising in staged flamenco performances", note: "A tablao typically presents a structured show for an audience.", example: "El tablao tiene dos pases cada noche.", translation: "The tablao has two performances each night." },
  { id: "cante", term: "Cante", meaning: "Flamenco singing", note: "The flamenco-specific term for vocal performance.", example: "El cante empieza sin presentación.", translation: "The flamenco singing starts without an introduction." },
  { id: "quejio", term: "Quejío", meaning: "Expressive plaintive vocal cry or inflection", note: "A deeply expressive feature of flamenco singing.", example: "El quejío abrió un momento de silencio.", translation: "The soulful cry opened a moment of silence." },
  { id: "compas", term: "Compás", meaning: "Rhythmic structure or cycle of flamenco", note: "More than a simple beat, it organizes the musical form.", example: "Las palmas siguen el compás.", translation: "The handclaps follow the rhythm." },
  { id: "pase", term: "Pase", meaning: "Performance / Show segment", note: "A venue may offer more than one pase in an evening.", example: "El segundo pase empieza a las once.", translation: "The second performance starts at eleven." },
  { id: "guitarra", term: "Guitarra", meaning: "Guitar", note: "A central instrument in many flamenco performances.", example: "La guitarra acompaña el cante con suavidad.", translation: "The guitar accompanies the singing gently." },
  { id: "cante-directo", term: "Cante en directo", meaning: "Live flamenco singing", note: "Highlights the immediate experience of a live voice.", example: "El cante en directo cambia por completo el ambiente.", translation: "Live flamenco singing completely changes the atmosphere." },
  { id: "arte", term: "Arte", meaning: "Artistry, flair, or special talent", note: "In Andalusian praise, arte can include presence, wit, and expressive ability.", example: "Tiene mucho arte para contar historias.", translation: "They have real flair for telling stories." },
];

const highlightMap = Object.fromEntries(flamencoVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "medium", notes: item.note, starred: true };
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

const sentenceVocab = flamencoVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1SimpleFlamencoNightPlansFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Simple Flamenco Night Plans Flashcards", subtitle: "Arrange a flamenco night using natural language for venues, reservations, performance times, live cante, emotional reactions, respectful listening, and leaving plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "flamenco", "plans", "nightlife"], estimatedMinutes: 22,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: flamencoVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1SimpleFlamencoNightPlansSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Una Noche de Cante", subtitle: "Build a flamenco-night plan from the invitation and reservation to reacting respectfully and deciding whether to stay for another pase.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "flamenco"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Invite friends to hear flamenco, choose between a peña and tablao, check reservations and performance time, discuss cante and guitar, find a place, listen respectfully, react emotionally, and negotiate staying longer.",
    stages: [
      stage("stage-1", "Invite and arrange", sentenceVocab.slice(0, 3), sentenceVocab.slice(22, 27), "Are you all coming to listen to flamenco? I'm in. Shall we meet around nine?", "¿Os venís a escuchar flamenco? Yo me apunto. ¿Quedamos sobre las nueve?", "The invitation, acceptance, and approximate meeting time create a natural group plan.", breakdown([["are you all coming to listen to flamenco?", "¿Os venís a escuchar flamenco?"], ["I'm in", "Yo me apunto"], ["shall we meet around nine?", "¿Quedamos sobre las nueve?"]])),
      stage("stage-2", "Choose the venue", sentenceVocab.slice(3, 5), sentenceVocab.slice(32, 35), "Is it at a peña or a tablao? Let's check whether we need to book because it might be packed.", "¿Es en una peña o en un tablao? Miramos si hay que reservar, que igual está hasta arriba.", "The stage distinguishes venue types and anticipates demand.", breakdown([["is it at a peña", "¿Es en una peña"], ["or at a tablao?", "o en un tablao?"], ["let's check whether we need to book", "Miramos si hay que reservar"], ["it might be packed", "igual está hasta arriba"]])),
      stage("stage-3", "Ask about the lineup", sentenceVocab.slice(5, 8), sentenceVocab.slice(34, 40), "Who's singing tonight? I'm more into live cante. Is there guitar too?", "¿Quién canta esta noche? Me tira más el cante en directo. ¿Hay guitarra también?", "The complete sentence states a preference and checks the musical lineup.", breakdown([["who's singing tonight?", "¿Quién canta esta noche?"], ["I'm more into", "Me tira más"], ["live cante", "el cante en directo"], ["is there guitar too?", "¿Hay guitarra también?"]])),
      stage("stage-4", "Find the time and a spot", sentenceVocab.slice(8, 10), sentenceVocab.slice(31, 39), "What time does the performance start? Let's go early and hopefully get a spot.", "¿A qué hora empieza el pase? Vamos temprano, a ver si pillamos sitio.", "A ver si frames getting a spot as a hope rather than a certainty.", breakdown([["what time does the performance start?", "¿A qué hora empieza el pase?"], ["let's go early", "Vamos temprano"], ["hopefully", "a ver si"], ["we get a spot", "pillamos sitio"]])),
      stage("stage-5", "Protect the moment", sentenceVocab.slice(14, 18), sentenceVocab.slice(28, 30), "Wait, the singing is about to start. Better listen without talking; I don't want to ruin the moment.", "Espera, que viene el cante. Mejor escuchamos sin hablar; no quiero cortar el momento.", "The group pauses conversation to respect the performance atmosphere.", breakdown([["wait, the singing is coming", "Espera, que viene el cante"], ["better we listen", "Mejor escuchamos"], ["without talking", "sin hablar"], ["I don't want to ruin the moment", "no quiero cortar el momento"]])),
      stage("stage-6", "React to the voice", sentenceVocab.slice(10, 13), sentenceVocab.slice(35, 41), "What a voice. It gives me goosebumps. That quejío really moved me.", "No veas qué voz tiene. Se me ponen los pelos de punta. Ese quejío me ha llegado.", "These phrases move from admiration to physical and emotional reaction.", breakdown([["what a voice", "No veas qué voz tiene"], ["it gives me goosebumps", "Se me ponen los pelos de punta"], ["that quejío", "Ese quejío"], ["really moved me", "me ha llegado"]])),
      stage("stage-7", "Discuss rhythm and artistry", sentenceVocab.slice(13, 17), sentenceVocab.slice(35, 41), "I struggle to follow the compás, but what talent they have!", "Me cuesta seguir el compás, pero ¡qué arte tiene!", "Costar expresses difficulty, while qué arte praises expressive ability.", breakdown([["I struggle", "Me cuesta"], ["to follow the compás", "seguir el compás"], ["but", "pero"], ["what talent!", "¡qué arte tiene!"]])),
      stage("stage-8", "Decide whether to stay", sentenceVocab.slice(18, 22), sentenceVocab.slice(25, 31), "Shall we stay a little longer, even though I have to get up early? It was worth it, and we'll discuss it properly later.", "¿Nos quedamos un ratito más, aunque mañana madrugo? Ha merecido la pena y luego lo comentamos con calma.", "The speaker balances one more short stay with tomorrow's responsibility.", breakdown([["shall we stay a little longer", "¿Nos quedamos un ratito más"], ["even though I get up early tomorrow", "aunque mañana madrugo?"], ["it was worth it", "Ha merecido la pena"], ["we'll discuss it properly later", "luego lo comentamos con calma"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "flamenco-story-q1", type: "multiple-choice", prompt: "What plan has Álvaro accepted?", options: ["Going to hear flamenco around nine", "Going to the beach", "Watching a film at home", "Having breakfast"], correctAnswer: "Going to hear flamenco around nine", explanation: "He accepts the invitation and confirms the approximate meeting time.", points: 1, skillTag: "invitation" },
  { id: "flamenco-story-q2", type: "multiple-choice", prompt: "Where is the performance, and what do they need to check?", options: ["At a peña, and whether booking is needed", "At a stadium, and parking", "At a café, and breakfast", "At home, and the television"], correctAnswer: "At a peña, and whether booking is needed", explanation: "The venue is identified as a peña flamenca and may require a reservation.", points: 1, skillTag: "venue" },
  { id: "flamenco-story-q3", type: "true-false", prompt: "True or false: Álvaro prefers live cante and asks whether there will also be guitar.", options: ["True", "False"], correctAnswer: "True", explanation: "Both his preference and the guitar question appear before this checkpoint.", points: 1, skillTag: "lineup" },
  { id: "flamenco-story-q4", type: "multiple-choice", prompt: "Why do they arrive early?", options: ["To avoid lateness and get a good spot", "To perform themselves", "To eat dinner there", "To change the singer"], correctAnswer: "To avoid lateness and get a good spot", explanation: "The peña may be packed, so they plan ahead.", points: 1, skillTag: "timing" },
  { id: "flamenco-story-q5", type: "multiple-choice", prompt: "What do they do when the cante is about to begin?", options: ["Stop talking and listen", "Leave the venue", "Order loudly", "Start filming"], correctAnswer: "Stop talking and listen", explanation: "They choose not to cut the moment.", points: 1, skillTag: "respect" },
  { id: "flamenco-story-q6", type: "multiple-choice", prompt: "How does the voice affect Inés?", options: ["It gives her goosebumps", "It makes her sleepy", "She cannot hear it", "She wants to leave"], correctAnswer: "It gives her goosebumps", explanation: "She says “Se me ponen los pelos de punta.”", points: 1, skillTag: "reaction" },
  { id: "flamenco-story-q7", type: "multiple-choice", prompt: "What does Álvaro find difficult?", options: ["Following the compás", "Finding the venue", "Understanding the bill", "Hearing the guitar"], correctAnswer: "Following the compás", explanation: "He says he struggles with the rhythmic cycle.", points: 1, skillTag: "rhythm" },
  { id: "flamenco-story-q8", type: "true-false", prompt: "True or false: Inés refuses to stay any longer because she works tomorrow.", options: ["True", "False"], correctAnswer: "False", explanation: "She agrees to a little longer despite having to get up early.", points: 1, skillTag: "planning" },
  { id: "flamenco-story-q9", type: "multiple-choice", prompt: "What especially moves Álvaro in the second pase?", options: ["A quejío in the live cante", "A recorded announcement", "The venue lights", "A conversation outside"], correctAnswer: "A quejío in the live cante", explanation: "He says the expressive cry reached him emotionally.", points: 1, skillTag: "emotion" },
  { id: "flamenco-story-q10", type: "multiple-choice", prompt: "What is their final evaluation of the night?", options: ["It was worth it, and they will discuss it calmly later", "It was disappointing", "They arrived too late", "They never heard any singing"], correctAnswer: "It was worth it, and they will discuss it calmly later", explanation: "The ending uses both target phrases directly.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1SimpleFlamencoNightPlansWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: El Segundo Pase", subtitle: "Inés and Álvaro arrange a peña flamenca visit, find a spot, protect the quiet moments, react to the cante, and decide whether to stay longer.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "flamenco", "nightlife"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "ines", name: "Inés", initials: "I", side: "right", color: "blue" },
      { id: "alvaro", name: "Álvaro", initials: "Á", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "ines", "Álvaro, ¿os venís a escuchar flamenco esta noche?", "Álvaro, are you all coming to listen to flamenco tonight?", ["¿Os venís a escuchar flamenco?"]),
      message("m2", "alvaro", "Yo me apunto. Hace tiempo que no voy a una actuación.", "I'm in. I haven't been to a performance for a while.", ["Yo me apunto"]),
      message("m3", "ines", "Genial. ¿Quedamos sobre las nueve delante del local?", "Great. Shall we meet around nine outside the venue?", ["¿Quedamos sobre las nueve?"], "voice-note"),
      message("m4", "alvaro", "¿Es en una peña o en un tablao?", "Is it at a peña or a tablao?", ["¿Es en una peña o en un tablao?", "Tablao"]),
      message("m5", "ines", "Es una peña flamenca pequeña. Miramos si hay que reservar.", "It's a small flamenco club. Let's check whether we need to book.", ["Peña flamenca", "Miramos si hay que reservar"]),
      message("m6", "alvaro", "Reserva para dos, que igual está hasta arriba.", "Book for two because it might be absolutely packed.", ["Que igual está hasta arriba"], "voice-note"),
      message("m7", "ines", "He visto el cartel. ¿Quién canta esta noche?", "I've seen the poster. Who's singing tonight?", ["¿Quién canta esta noche?"]),
      message("m8", "alvaro", "Canta una artista de Jerez. Me tira más el cante en directo.", "A singer from Jerez is performing. I'm more into live cante.", ["Me tira más el cante en directo", "Cante en directo", "En directo"]),
      message("m9", "ines", "A mí también. ¿Hay guitarra también o canta sola?", "Me too. Is there guitar as well, or is she singing alone?", ["¿Hay guitarra también?", "Guitarra"]),
      message("m10", "alvaro", "Hay guitarra y palmas. ¿A qué hora empieza el pase?", "There's guitar and handclapping. What time does the performance start?", ["¿A qué hora empieza el pase?", "Pase"]),
      message("m11", "ines", "A las nueve y media. Salimos antes y así no llegamos tarde.", "At half past nine. We'll leave earlier so we won't arrive late.", ["Así no llegamos tarde"]),
      message("m12", "alvaro", "Perfecto. A ver si pillamos sitio cerca, que la peña es pequeña.", "Perfect. Hopefully we get a nearby spot because the club is small.", ["A ver si pillamos sitio", "A ver si...", "Pillar sitio", "Peña flamenca"], "voice-note"),
      message("m13", "ines", "Ya estamos dentro. El primer pase empieza justo ahora.", "We're inside now. The first performance starts right now.", ["Justo ahora", "Pase"]),
      message("m14", "alvaro", "Espera, que viene el cante.", "Wait, the singing is about to start.", ["Espera, que viene el cante", "Cante"]),
      message("m15", "ines", "Sí, mejor escuchamos sin hablar. No quiero cortar el momento.", "Yes, we'd better listen without talking. I don't want to ruin the moment.", ["Mejor escuchamos sin hablar", "Sin hablar", "No quiero cortar el momento"]),
      message("m16", "alvaro", "No veas qué voz tiene. Llena toda la sala.", "What a voice. It fills the whole room.", ["No veas qué voz tiene"]),
      message("m17", "ines", "Totalmente. Se me ponen los pelos de punta.", "Absolutely. It gives me goosebumps.", ["Se me ponen los pelos de punta"]),
      message("m18", "alvaro", "La guitarra entra muy suave y deja todo el espacio al cante.", "The guitar enters very softly and leaves all the space to the singing.", ["Guitarra", "Cante"], "voice-note"),
      message("m19", "ines", "Me cuesta seguir el compás cuando cambian las palmas.", "I struggle to follow the compás when the handclapping changes.", ["Me cuesta seguir el compás", "Compás"]),
      message("m20", "alvaro", "A mí también, pero mira cómo lo hace: ¡qué arte tiene!", "Me too, but look how she does it: what talent!", ["¡Qué arte tiene!", "Arte"]),
      message("m21", "ines", "Luego lo comentamos. Ahora no quiero cortar el momento.", "We'll discuss it later. Right now I don't want to ruin the moment.", ["No quiero cortar el momento"]),
      message("m22", "alvaro", "Queda un segundo pase. ¿Nos quedamos un ratito más?", "There's a second performance left. Shall we stay a little longer?", ["Pase", "¿Nos quedamos un ratito más?"]),
      message("m23", "ines", "Vale, un ratito más, aunque mañana madrugo.", "Okay, a little longer, even though I have to get up early tomorrow.", ["Un ratito más", "Aunque mañana madrugo", "Mañana madrugo"]),
      message("m24", "alvaro", "Perfecto. Empieza en diez minutos y luego nos vamos.", "Perfect. It starts in ten minutes and then we'll leave.", ["Pase"], "voice-note"),
      message("m25", "ines", "Este segundo cante es más íntimo. Escucha ese principio.", "This second cante is more intimate. Listen to that opening.", ["Cante"]),
      message("m26", "alvaro", "Ese quejío me ha llegado. Ha cambiado toda la sala.", "That soulful cry really moved me. It changed the whole room.", ["Ese quejío me ha llegado", "Quejío"]),
      message("m27", "ines", "A mí también. Otra vez se me ponen los pelos de punta.", "Me too. I'm getting goosebumps again.", ["Se me ponen los pelos de punta"]),
      message("m28", "alvaro", "Ya ha terminado. Ha merecido la pena quedarse.", "It's finished now. It was worth staying.", ["Ha merecido la pena"]),
      message("m29", "ines", "Sí. Caminamos a casa y luego lo comentamos con calma.", "Yes. We'll walk home and then discuss it properly.", ["Luego lo comentamos con calma", "Con calma"]),
      message("m30", "alvaro", "Trato hecho. Una noche corta, pero con muchísimo arte.", "Deal. A short night, but with so much artistry.", ["Arte"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-flamenco-night-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: flamencoVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: flamencoVocab.map((item) => item.term),
      grammarPatterns: ["Group invitations with os venís and planning with quedamos.", "Preference and difficulty with me tira más and me cuesta plus infinitive.", "Emotional reactions with se me ponen and me ha llegado."],
      speakingPrompts: ["Invite friends and arrange the meeting time.", "Ask about the venue, booking, singer, guitar, and pase.", "Respond respectfully when the cante begins.", "Describe the voice, quejío, compás, and decision to stay longer."],
    },
    completionTask: { title: "Plan a flamenco night", instructions: "Record a 75-second voice message. Invite friends, choose a venue, check booking and time, describe your musical preference, explain respectful listening, react to the performance, and decide whether to stay." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Una noche de flamenco puede empezar con “¿os venís a escuchar flamenco?”. Si alguien responde “yo me apunto”, acepta el plan con entusiasmo. Después, “¿quedamos sobre las nueve?” propone una hora aproximada y deja un pequeño margen antes de la actuación.", translation: "A flamenco night starts with a group invitation, enthusiastic acceptance, and an approximate meeting time.", highlights: highlights(["¿Os venís a escuchar flamenco?", "Yo me apunto", "¿Quedamos sobre las nueve?"]), shadowLine: "¿Os venís a escuchar flamenco? Yo me apunto." },
  { id: "p2", text: "“¿Es en una peña o en un tablao?” distingue dos espacios. Una “peña flamenca” suele tener una relación comunitaria y tradicional con el flamenco. Un “tablao” presenta actuaciones organizadas para el público. En ambos casos, “miramos si hay que reservar” evita llegar sin entrada cuando el local puede estar lleno.", translation: "The reading distinguishes a community-based peña flamenca from a staged tablao and explains checking reservations.", highlights: highlights(["¿Es en una peña o en un tablao?", "Peña flamenca", "Tablao", "Miramos si hay que reservar"]), shadowLine: "¿Es en una peña o en un tablao? Miramos si hay que reservar." },
  { id: "p3", text: "Antes de salir, “¿quién canta esta noche?” pregunta por la voz principal. “Me tira más el cante en directo” expresa una preferencia más emocional que un simple “prefiero”. “¿Hay guitarra también?” completa la información sobre el acompañamiento y la formación del espectáculo.", translation: "The group asks about the singer and guitar while expressing a preference for live cante.", highlights: highlights(["¿Quién canta esta noche?", "Me tira más el cante en directo", "Cante en directo", "En directo", "¿Hay guitarra también?", "Guitarra"]), shadowLine: "Me tira más el cante en directo. ¿Hay guitarra también?" },
  { id: "p4", text: "“¿A qué hora empieza el pase?” comprueba la hora del segmento de actuación. Un local puede ofrecer más de un “pase”. Llegar pronto permite decir “a ver si pillamos sitio”, donde “a ver si” expresa esperanza y “pillar sitio” significa conseguir un lugar desde el que escuchar bien.", translation: "Checking the performance time and arriving early improves the chance of getting a good spot.", highlights: highlights(["¿A qué hora empieza el pase?", "Pase", "A ver si pillamos sitio", "A ver si...", "Pillar sitio"]), shadowLine: "¿A qué hora empieza el pase? A ver si pillamos sitio." },
  { id: "p5", text: "Cuando alguien avisa “espera, que viene el cante”, la voz está a punto de empezar. “Mejor escuchamos sin hablar” propone prestar atención. La frase “no quiero cortar el momento” explica que una conversación, un móvil o un pedido podrían romper una atmósfera especial.", translation: "When the singing begins, the group stops talking so they do not break the atmosphere.", highlights: highlights(["Espera, que viene el cante", "Cante", "Mejor escuchamos sin hablar", "Sin hablar", "No quiero cortar el momento"]), shadowLine: "Espera, que viene el cante. Mejor escuchamos sin hablar." },
  { id: "p6", text: "Las reacciones pueden ser intensas. “No veas qué voz tiene” expresa admiración. “Se me ponen los pelos de punta” describe una respuesta física a la emoción. Si una inflexión vocal conmueve especialmente, “ese quejío me ha llegado” indica que el “quejío” tocó al oyente de forma personal.", translation: "The voice can inspire admiration, goosebumps, and a personal emotional response to the quejío.", highlights: highlights(["No veas qué voz tiene", "Se me ponen los pelos de punta", "Ese quejío me ha llegado", "Quejío"]), shadowLine: "No veas qué voz tiene. Ese quejío me ha llegado." },
  { id: "p7", text: "El “compás” es la estructura rítmica del flamenco, no solo un golpe repetido. Por eso alguien puede admitir “me cuesta seguir el compás”. En cambio, “¡qué arte tiene!” no analiza la técnica: elogia el “arte”, la presencia y la manera especial de cantar, tocar o moverse.", translation: "The compás organizes flamenco rhythm, while qué arte praises the performer's broader expressive flair.", highlights: highlights(["Compás", "Me cuesta seguir el compás", "¡Qué arte tiene!", "Arte"]), shadowLine: "Me cuesta seguir el compás, pero ¡qué arte tiene!" },
  { id: "p8", text: "Al final surge la pregunta “¿nos quedamos un ratito más?”. “Aunque mañana madrugo” reconoce una responsabilidad, pero permite una breve extensión. Después del último pase, “ha merecido la pena” evalúa positivamente la experiencia y “luego lo comentamos con calma” reserva la conversación para un momento sin interrupciones.", translation: "The ending balances staying a little longer with tomorrow's responsibilities and concludes that the experience was worthwhile.", highlights: highlights(["¿Nos quedamos un ratito más?", "Un ratito más", "Aunque mañana madrugo", "Mañana madrugo", "Ha merecido la pena", "Luego lo comentamos con calma", "Con calma"]), shadowLine: "Ha merecido la pena. Luego lo comentamos con calma." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "flamenco-reading-q1", type: "multiple-choice", prompt: "What is a peña flamenca?", options: ["A flamenco association or club", "A commuter train", "A beach restaurant", "A coffee style"], correctAnswer: "A flamenco association or club", explanation: "It is often linked to traditional and community flamenco activity.", points: 1, skillTag: "culture" },
  { id: "flamenco-reading-q2", type: "multiple-choice", prompt: "What does “me tira más” express?", options: ["A natural attraction or preference", "A booking requirement", "A late arrival", "A rhythm error"], correctAnswer: "A natural attraction or preference", explanation: "It conveys that something appeals to the speaker more.", points: 1, skillTag: "preference" },
  { id: "flamenco-reading-q3", type: "true-false", prompt: "True or false: A quejío is an expressive vocal feature of flamenco singing.", options: ["True", "False"], correctAnswer: "True", explanation: "It is an emotionally charged vocal cry or inflection.", points: 1, skillTag: "flamenco-vocab" },
  { id: "flamenco-reading-q4", type: "order-words", prompt: "Order the respectful listening suggestion.", nativePrompt: "Better to listen without talking.", wordBank: ["Mejor", "escuchamos", "sin", "hablar."], correctAnswer: "Mejor escuchamos sin hablar.", explanation: "The phrase protects the performance atmosphere.", points: 2, skillTag: "respect" },
  { id: "flamenco-reading-q5", type: "multiple-choice", prompt: "What does “ha merecido la pena” mean?", options: ["It was worth it", "It started late", "It was too crowded", "It needs a reservation"], correctAnswer: "It was worth it", explanation: "The speaker values the experience despite the time or effort involved.", points: 1, skillTag: "evaluation" },
];

export const andalusianSpanishB1SimpleFlamencoNightPlansReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Cuando Viene el Cante", subtitle: "A synced Spanish reading about planning a flamenco night, peñas and tablaos, live cante, respectful listening, emotional reactions, compás, and staying for another pase.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "flamenco", "culture"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: flamencoVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1SimpleFlamencoNightPlansQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Simple Flamenco Night Plans", subtitle: "Test invitations, venue choices, reservations, performance vocabulary, respectful listening, emotional reactions, and leaving plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "flamenco", "plans"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for planning and experiencing a simple flamenco night.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "flamenco-quiz-q1", type: "multiple-choice", prompt: "Which phrase invites several friends to hear flamenco?", options: ["¿Os venís a escuchar flamenco?", "¿Quién canta esta noche?", "¿Hay guitarra también?", "Mañana madrugo"], correctAnswer: "¿Os venís a escuchar flamenco?", explanation: "Os venís addresses the group informally.", points: 1, skillTag: "invitation" },
      { id: "flamenco-quiz-q2", type: "multiple-choice", prompt: "Which question distinguishes two common flamenco settings?", options: ["¿Es en una peña o en un tablao?", "¿A qué hora empieza el pase?", "¿Nos quedamos un ratito más?", "¿Quién canta esta noche?"], correctAnswer: "¿Es en una peña o en un tablao?", explanation: "It contrasts a flamenco club with a staged performance venue.", points: 1, skillTag: "venue" },
      { id: "flamenco-quiz-q3", type: "order-words", prompt: "Order the reservation check.", nativePrompt: "Let's check whether we need to book.", wordBank: ["Miramos", "si", "hay", "que", "reservar."], correctAnswer: "Miramos si hay que reservar.", explanation: "Hay que plus infinitive expresses necessity.", points: 2, skillTag: "booking" },
      { id: "flamenco-quiz-q4", type: "multiple-choice", prompt: "How do you say live cante appeals to you more?", options: ["Me tira más el cante en directo", "Me cuesta seguir el compás", "No quiero cortar el momento", "Ha merecido la pena"], correctAnswer: "Me tira más el cante en directo", explanation: "Me tira más expresses a natural preference or attraction.", points: 1, skillTag: "preference" },
      { id: "flamenco-quiz-q5", type: "true-false", prompt: "True or false: “a ver si pillamos sitio” expresses certainty that seats are reserved.", options: ["True", "False"], correctAnswer: "False", explanation: "It expresses hope that the group can get a spot.", points: 1, skillTag: "planning" },
      { id: "flamenco-quiz-q6", type: "multiple-choice", prompt: "The cante is starting. Which suggestion is most respectful?", options: ["Mejor escuchamos sin hablar", "¿Quién canta esta noche?", "Yo me apunto", "Un ratito más"], correctAnswer: "Mejor escuchamos sin hablar", explanation: "It protects the focused performance moment.", points: 1, skillTag: "respect" },
      { id: "flamenco-quiz-q7", type: "multiple-choice", prompt: "Which phrase describes goosebumps?", options: ["Se me ponen los pelos de punta", "Me cuesta seguir el compás", "Me tira más", "No llegamos tarde"], correctAnswer: "Se me ponen los pelos de punta", explanation: "It describes a physical reaction to emotion.", points: 1, skillTag: "reaction" },
      { id: "flamenco-quiz-q8", type: "multiple-choice", prompt: "What does “ese quejío me ha llegado” communicate?", options: ["The vocal expression moved me emotionally", "The show started late", "I found a seat", "The guitar is missing"], correctAnswer: "The vocal expression moved me emotionally", explanation: "Me ha llegado means it touched the listener.", points: 1, skillTag: "emotion" },
      { id: "flamenco-quiz-q9", type: "multiple-choice", prompt: "Which word names flamenco's rhythmic structure?", options: ["Compás", "Pase", "Tablao", "Arte"], correctAnswer: "Compás", explanation: "Compás organizes the rhythmic cycle.", points: 1, skillTag: "flamenco-vocab" },
      { id: "flamenco-quiz-q10", type: "true-false", prompt: "True or false: “qué arte tiene” can praise someone's expressive flair.", options: ["True", "False"], correctAnswer: "True", explanation: "Arte can praise much more than technical skill alone.", points: 1, skillTag: "praise" },
      { id: "flamenco-quiz-q11", type: "multiple-choice", prompt: "How do you say the experience was worth the effort?", options: ["Ha merecido la pena", "Mañana madrugo", "Justo ahora", "Sin hablar"], correctAnswer: "Ha merecido la pena", explanation: "The phrase gives a positive final evaluation.", points: 1, skillTag: "evaluation" },
      { id: "flamenco-quiz-q12", type: "match-pairs", prompt: "Match each flamenco term to its meaning.", pairs: [{ left: "Cante", right: "Flamenco singing" }, { left: "Quejío", right: "Expressive vocal cry" }, { left: "Pase", right: "Performance segment" }], explanation: "These words identify the singing, an expressive vocal feature, and a show segment.", points: 3, skillTag: "flamenco-vocab" },
      { id: "flamenco-quiz-q13", type: "match-pairs", prompt: "Match each phrase to its function.", pairs: [{ left: "A ver si pillamos sitio", right: "Hope to find a place" }, { left: "No quiero cortar el momento", right: "Protect the atmosphere" }, { left: "Luego lo comentamos con calma", right: "Postpone discussion respectfully" }], explanation: "The phrases manage access, atmosphere, and later reflection.", points: 3, skillTag: "functions" },
    ],
  },
};
