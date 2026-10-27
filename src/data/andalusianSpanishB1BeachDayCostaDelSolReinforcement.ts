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

const courseId = "andalusian-spanish-b1-beach-day-costa-del-sol";
const sectionName = "Andalusian Spanish - B1 Beach Day on the Costa del Sol";

const beachVocab: VocabItem[] = [
  { id: "apetece-playa", term: "¿Os apetece ir a la playa?", meaning: "Do you lot fancy going to the beach?", note: "Os and the plural verb address a group informally with vosotros.", example: "¿Os apetece ir a la playa mañana?", translation: "Do you all fancy going to the beach tomorrow?" },
  { id: "pillamos-cercanias", term: "Pillamos el Cercanías", meaning: "Let's catch the local train", note: "Pillar is informal Spain Spanish for catching transport.", example: "Pillamos el Cercanías de las nueve.", translation: "Let's catch the nine o'clock commuter train." },
  { id: "estacion", term: "Quedamos en la estación", meaning: "Let's meet at the station", note: "A simple practical arrangement before travelling together.", example: "Quedamos en la estación a las ocho y media.", translation: "Let's meet at the station at half past eight." },
  { id: "playa-tempranito", term: "Tiramos para la playa tempranito", meaning: "Let's head to the beach nice and early", note: "Tirar para means heading somewhere; tempranito makes the early start sound friendly.", example: "Tiramos para la playa tempranito y cogemos buen sitio.", translation: "Let's head to the beach nice and early and get a good spot." },
  { id: "antes-calor", term: "Antes de que apriete el calor", meaning: "Before the heat really kicks in", note: "Apretar describes heat becoming stronger or more intense.", example: "Llegamos antes de que apriete el calor.", translation: "We'll arrive before the heat really kicks in." },
  { id: "llevais-sombrilla", term: "¿Lleváis sombrilla?", meaning: "Are you bringing a beach umbrella?", note: "Lleváis is the informal plural vosotros form.", example: "¿Lleváis sombrilla o alquilamos una?", translation: "Are you bringing a beach umbrella, or shall we rent one?" },
  { id: "echaos-crema", term: "Echaos crema, ¿eh?", meaning: "Make sure you put some suncream on, yeah?", note: "Echaos is an informal plural affirmative command with a friendly reminder tag.", example: "Echaos crema, ¿eh?, que hoy pega fuerte.", translation: "Put some suncream on, yeah, because the sun is strong today." },
  { id: "pega-sol", term: "No veas cómo pega el sol", meaning: "Bloody hell, the sun's absolutely blazing!", note: "No veas intensifies pegar el sol, meaning the sun beats down strongly.", example: "A mediodía no veas cómo pega el sol.", translation: "At midday the sun is absolutely blazing." },
  { id: "sombra", term: "Nos ponemos a la sombra", meaning: "Let's get ourselves into the shade", note: "Ponerse a la sombra means moving into a shaded position.", example: "Después del baño nos ponemos a la sombra.", translation: "After the swim we'll get into the shade." },
  { id: "hasta-arriba", term: "Está hasta arriba", meaning: "It's absolutely packed / Rammed", note: "A versatile informal phrase for a completely full place.", example: "La playa está hasta arriba desde primera hora.", translation: "The beach has been packed since early morning." },
  { id: "paseito", term: "Damos un paseíto", meaning: "Let's have a little wander", note: "The diminutive makes the walk sound relaxed and pleasant.", example: "Damos un paseíto por la orilla.", translation: "Let's have a little walk along the shore." },
  { id: "damos-bano", term: "¿Nos damos un baño?", meaning: "Shall we go for a dip?", note: "In Spain, darse un baño commonly means going for a swim.", example: "Hace mucho calor; ¿nos damos un baño?", translation: "It's very hot; shall we go for a dip?" },
  { id: "rato-agua", term: "Me quedo un rato en el agua", meaning: "I'm staying in the water for a bit", note: "Un rato indicates an imprecise but limited period.", example: "Vosotros salid; yo me quedo un rato en el agua.", translation: "You all get out; I'm staying in the water for a bit." },
  { id: "algo-picar", term: "¿Lleváis algo de picar?", meaning: "Have you brought anything to snack on?", note: "Algo de picar means snacks or something small to eat.", example: "¿Lleváis algo de picar para después del baño?", translation: "Have you brought any snacks for after the swim?" },
  { id: "paramos-chiringuito", term: "Paramos en el chiringuito", meaning: "Let's stop at the beach bar", note: "A chiringuito is a beachside bar or restaurant.", example: "A la una paramos en el chiringuito.", translation: "At one we'll stop at the beach bar." },
  { id: "pedimos-espetos", term: "Pedimos unos espetos", meaning: "Let's order some grilled sardine skewers", note: "Espetos are strongly associated with the Málaga coast.", example: "En el chiringuito pedimos unos espetos recién hechos.", translation: "At the beach bar we'll order some freshly made sardine skewers." },
  { id: "apetece-pescaito", term: "¿Os apetece pescaíto frito?", meaning: "Do you fancy some fried fish?", note: "Pescaíto reflects a characteristic Andalusian pronunciation.", example: "Además de los espetos, ¿os apetece pescaíto frito?", translation: "Besides the sardine skewers, do you fancy some fried fish?" },
  { id: "racion-compartir", term: "Una ración para compartir", meaning: "One portion to share", note: "A useful way to order one plate for the whole group.", example: "Pedimos una ración para compartir entre cuatro.", translation: "We'll order one portion to share between four people." },
  { id: "sale-cabeza", term: "¿Cuánto sale por cabeza?", meaning: "How much is it per person?", note: "Salir asks the resulting price; por cabeza means per person.", example: "Con las bebidas, ¿cuánto sale por cabeza?", translation: "Including the drinks, how much is it per person?" },
  { id: "pagamos-todos", term: "Lo pagamos entre todos", meaning: "We'll split the cost between us", note: "Entre todos frames the group as sharing the total expense.", example: "No te preocupes, lo pagamos entre todos.", translation: "Don't worry; we'll split the cost between us." },
  { id: "recogiendo", term: "Vamos recogiendo", meaning: "Let's start packing up", note: "The progressive form makes the departure gradual rather than abrupt.", example: "Son casi las siete; vamos recogiendo.", translation: "It's almost seven; let's start packing up." },
  { id: "no-haga-tarde", term: "Que no se nos haga tarde", meaning: "So we don't end up leaving too late", note: "Se nos haga tarde expresses time getting away from the group.", example: "Vamos recogiendo, que no se nos haga tarde.", translation: "Let's start packing up so we don't end up leaving too late." },
  { id: "que-hacemos", term: "¿Qué hacemos?", meaning: "What shall we do?", note: "An open group question used to choose the next activity.", example: "Ya hemos comido; ¿qué hacemos ahora?", translation: "We've eaten now; what shall we do?" },
  { id: "quedamos-aqui", term: "¿Nos quedamos por aquí?", meaning: "Shall we hang around here?", note: "Por aquí keeps the location approximate and relaxed.", example: "Hay sombra y sitio; ¿nos quedamos por aquí?", translation: "There's shade and room; shall we stay around here?" },
  { id: "pillamos-comer", term: "¿Pillamos algo de comer?", meaning: "Shall we grab something to eat?", note: "Pillar algo is an informal suggestion to get food.", example: "Después del baño, ¿pillamos algo de comer?", translation: "After the swim, shall we grab something to eat?" },
  { id: "ya-hora", term: "Que ya va siendo hora", meaning: "Because it's about time / We're getting hungry", note: "A conversational reason for finally doing something.", example: "Vamos al chiringuito, que ya va siendo hora.", translation: "Let's go to the beach bar because it's about time." },
  { id: "tempranito", term: "Tempranito", meaning: "Nice and early", note: "The diminutive softens temprano and sounds conversational.", example: "Mañana salimos tempranito.", translation: "Tomorrow we'll leave nice and early." },
  { id: "no-veas-como", term: "No veas cómo...", meaning: "You wouldn't believe how...", note: "An emphatic lead-in completed by an action or condition.", example: "No veas cómo se ha llenado la playa.", translation: "You wouldn't believe how crowded the beach has become." },
  { id: "un-rato", term: "Un rato", meaning: "A little while", note: "An intentionally imprecise short period.", example: "Descansamos un rato a la sombra.", translation: "We'll rest in the shade for a little while." },
  { id: "por-cabeza", term: "Por cabeza", meaning: "Per person / A head", note: "Useful for dividing restaurant, travel, or accommodation costs.", example: "Son doce euros por cabeza.", translation: "It's twelve euros per person." },
  { id: "para-compartir", term: "Para compartir", meaning: "To share", note: "Common when ordering a dish for the table rather than one person.", example: "Queremos dos platos para compartir.", translation: "We want two dishes to share." },
  { id: "cercanias", term: "Cercanías", meaning: "Commuter train service", note: "The local rail network connects Málaga with several Costa del Sol towns.", example: "El Cercanías nos deja cerca de la playa.", translation: "The commuter train drops us near the beach." },
  { id: "chiringuito", term: "Chiringuito", meaning: "Beach bar or beachside restaurant", note: "A characteristic place for drinks, fish, and relaxed coastal meals.", example: "Ese chiringuito hace espetos junto a la arena.", translation: "That beach bar grills sardine skewers beside the sand." },
  { id: "espetos", term: "Espetos", meaning: "Sardines traditionally grilled on skewers", note: "A Málaga coastal speciality cooked over an open fire.", example: "Los espetos llegan calientes a la mesa.", translation: "The grilled sardine skewers arrive hot at the table." },
  { id: "pescaito", term: "Pescaíto frito", meaning: "Andalusian-style fried fish", note: "A classic coastal dish often ordered for sharing.", example: "Compartimos pescaíto frito en el chiringuito.", translation: "We shared fried fish at the beach bar." },
  { id: "sombrilla", term: "Sombrilla", meaning: "Beach umbrella", note: "Used to create shade on the sand.", example: "Clavamos la sombrilla cerca de la orilla.", translation: "We put up the beach umbrella near the shore." },
  { id: "crema", term: "Crema", meaning: "Suncream, in this context", note: "The beach context makes the shortened meaning clear.", example: "Trae crema de protección alta.", translation: "Bring high-factor suncream." },
  { id: "paseito-noun", term: "Paseíto", meaning: "Little walk / Stroll", note: "A warm diminutive commonly used for a relaxed walk.", example: "Nos damos un paseíto por el paseo marítimo.", translation: "We'll take a little walk along the seafront." },
  { id: "racion", term: "Una ración", meaning: "A serving or portion", note: "A full plate often intended for sharing in a group.", example: "Una ración suele ser más grande que una tapa.", translation: "A portion is usually larger than a tapa." },
  { id: "sombra-noun", term: "La sombra", meaning: "Shade", note: "An important practical resource during intense coastal heat.", example: "A mediodía buscamos la sombra.", translation: "At midday we look for shade." },
];

const highlightMap = Object.fromEntries(beachVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = beachVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1BeachDayCostaDelSolFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Beach Day on the Costa del Sol Flashcards", subtitle: "Plan a Málaga-area beach day with natural language for the Cercanías, sun protection, crowds, swimming, chiringuitos, local fish, sharing costs, and packing up.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "Costa del Sol", "Málaga", "beach"], estimatedMinutes: 22,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: beachVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1BeachDayCostaDelSolSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Un Día de Playa en Málaga", subtitle: "Build a complete coastal plan from catching the train early to sharing espetos and leaving before it gets late.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "beach"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Invite a group to the beach, arrange the train and meeting point, prepare for the heat, find shade on a crowded beach, swim and walk, eat Málaga specialities at a chiringuito, split the cost, and pack up on time.",
    stages: [
      stage("stage-1", "Make the beach plan", sentenceVocab.slice(0, 4), sentenceVocab.slice(26, 32), "Do you all fancy going to the beach? Let's catch the commuter train and meet at the station.", "¿Os apetece ir a la playa? Pillamos el Cercanías y quedamos en la estación.", "The vosotros invitation addresses the whole group before arranging transport and the meeting point.", breakdown([["do you all fancy going to the beach?", "¿Os apetece ir a la playa?"], ["let's catch the commuter train", "Pillamos el Cercanías"], ["and meet at the station", "y quedamos en la estación"]])),
      stage("stage-2", "Leave before the heat", sentenceVocab.slice(3, 5), sentenceVocab.slice(26, 28), "Let's head to the beach nice and early, before the heat really kicks in.", "Tiramos para la playa tempranito, antes de que apriete el calor.", "Tirar para sounds informal, while antes de que introduces the heat-related reason.", breakdown([["let's head to the beach", "Tiramos para la playa"], ["nice and early", "tempranito"], ["before", "antes de que"], ["the heat really kicks in", "apriete el calor"]])),
      stage("stage-3", "Prepare for the sun", sentenceVocab.slice(5, 9), sentenceVocab.slice(35, 40), "Are you bringing an umbrella? Put suncream on because the sun is absolutely blazing. Let's get into the shade.", "¿Lleváis sombrilla? Echaos crema, ¿eh?, que no veas cómo pega el sol. Nos ponemos a la sombra.", "The plural command echaos addresses the group, and no veas strongly intensifies the sun.", breakdown([["are you bringing an umbrella?", "¿Lleváis sombrilla?"], ["put suncream on", "Echaos crema, ¿eh?"], ["the sun is blazing", "no veas cómo pega el sol"], ["let's get into the shade", "Nos ponemos a la sombra"]])),
      stage("stage-4", "Handle a packed beach", sentenceVocab.slice(9, 11), sentenceVocab.slice(23, 29), "It's absolutely packed. Shall we stay around here or take a little walk?", "Está hasta arriba. ¿Nos quedamos por aquí o damos un paseíto?", "The sentence reacts to the crowd and presents two relaxed alternatives.", breakdown([["it's absolutely packed", "Está hasta arriba"], ["shall we stay around here", "¿Nos quedamos por aquí"], ["or take a little walk?", "o damos un paseíto?"]])),
      stage("stage-5", "Go for a swim", sentenceVocab.slice(11, 14), sentenceVocab.slice(28, 30), "Shall we go for a dip? I'm staying in the water for a bit. Have you brought any snacks?", "¿Nos damos un baño? Me quedo un rato en el agua. ¿Lleváis algo de picar?", "Darse un baño means taking a swim here, not bathing at home.", breakdown([["shall we go for a dip?", "¿Nos damos un baño?"], ["I'm staying for a bit", "Me quedo un rato"], ["in the water", "en el agua"], ["have you brought any snacks?", "¿Lleváis algo de picar?"]])),
      stage("stage-6", "Choose local food", sentenceVocab.slice(14, 18), sentenceVocab.slice(32, 35), "Let's stop at the beach bar and order some espetos. Do you fancy fried fish? One portion to share.", "Paramos en el chiringuito y pedimos unos espetos. ¿Os apetece pescaíto frito? Una ración para compartir.", "The stage joins two Málaga coastal specialities with a shared portion.", breakdown([["let's stop at the beach bar", "Paramos en el chiringuito"], ["and order some espetos", "y pedimos unos espetos"], ["do you fancy fried fish?", "¿Os apetece pescaíto frito?"], ["one portion to share", "Una ración para compartir"]])),
      stage("stage-7", "Split the bill", sentenceVocab.slice(18, 20), sentenceVocab.slice(29, 31), "How much is it per person? We'll split it between all of us.", "¿Cuánto sale por cabeza? Lo pagamos entre todos.", "Por cabeza calculates each person's share; entre todos explains the group arrangement.", breakdown([["how much is it", "¿Cuánto sale"], ["per person", "por cabeza?"], ["we'll pay it", "Lo pagamos"], ["between all of us", "entre todos"]])),
      stage("stage-8", "Pack up on time", sentenceVocab.slice(20, 22), sentenceVocab.slice(22, 27), "What shall we do? Let's start packing up so we don't end up leaving too late.", "¿Qué hacemos? Vamos recogiendo, que no se nos haga tarde.", "Vamos recogiendo makes the departure gradual, while the final clause explains the timing concern.", breakdown([["what shall we do?", "¿Qué hacemos?"], ["let's start packing up", "Vamos recogiendo"], ["so", "que"], ["we don't end up leaving too late", "no se nos haga tarde"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "beach-story-q1", type: "multiple-choice", prompt: "How will Inés and Álvaro travel to the beach?", options: ["By Cercanías train", "By taxi", "By bicycle", "By ferry"], correctAnswer: "By Cercanías train", explanation: "They agree to catch the local commuter train.", points: 1, skillTag: "transport" },
  { id: "beach-story-q2", type: "multiple-choice", prompt: "Why do they want to leave early?", options: ["To arrive before the strongest heat", "To work at the beach", "To avoid the train entirely", "To eat breakfast at home"], correctAnswer: "To arrive before the strongest heat", explanation: "They plan to head out before the heat really kicks in.", points: 1, skillTag: "timing" },
  { id: "beach-story-q3", type: "true-false", prompt: "True or false: They have a beach umbrella and remind each other to use suncream.", options: ["True", "False"], correctAnswer: "True", explanation: "Both sun-protection details appear before this checkpoint.", points: 1, skillTag: "sun-safety" },
  { id: "beach-story-q4", type: "multiple-choice", prompt: "What do they do because the beach is crowded?", options: ["Find a shaded place and settle there", "Return immediately", "Stand in the water", "Go to the station"], correctAnswer: "Find a shaded place and settle there", explanation: "They choose a nearby shaded spot despite the crowd.", points: 1, skillTag: "crowds" },
  { id: "beach-story-q5", type: "multiple-choice", prompt: "What happens after their walk?", options: ["They go for a swim", "They leave for home", "They order food first", "They miss the train"], correctAnswer: "They go for a swim", explanation: "They take a paseíto and then decide to get into the water.", points: 1, skillTag: "activities" },
  { id: "beach-story-q6", type: "multiple-choice", prompt: "Why do they go to the chiringuito?", options: ["They are hungry and have no snacks", "They need train tickets", "They want another umbrella", "The beach has closed"], correctAnswer: "They are hungry and have no snacks", explanation: "They did not bring anything to snack on, so they choose the beach bar.", points: 1, skillTag: "food" },
  { id: "beach-story-q7", type: "multiple-choice", prompt: "What do they order to share?", options: ["Espetos and fried fish", "Only drinks", "A single sandwich", "Ice cream"], correctAnswer: "Espetos and fried fish", explanation: "They select two Málaga/Andalusian fish specialities for sharing.", points: 1, skillTag: "local-food" },
  { id: "beach-story-q8", type: "true-false", prompt: "True or false: Álvaro pays the entire bill alone.", options: ["True", "False"], correctAnswer: "False", explanation: "They calculate the amount per person and split it between everyone.", points: 1, skillTag: "payment" },
  { id: "beach-story-q9", type: "multiple-choice", prompt: "Where do they rest after lunch?", options: ["In the shade by the promenade", "Inside the train", "In deep water", "At the station"], correctAnswer: "In the shade by the promenade", explanation: "They avoid the stronger afternoon sun and rest in shade.", points: 1, skillTag: "afternoon" },
  { id: "beach-story-q10", type: "multiple-choice", prompt: "Why do they start packing up?", options: ["So they do not leave too late and can catch the train", "Because it starts snowing", "Because they dislike the beach", "To order more food"], correctAnswer: "So they do not leave too late and can catch the train", explanation: "Their final decision protects the return journey.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1BeachDayCostaDelSolWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: Espetos Antes del Último Cercanías", subtitle: "Inés and Álvaro plan an early Costa del Sol beach day, manage the heat and crowds, swim, share local fish, split the bill, and leave in time for the train.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "Málaga", "Costa del Sol"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "ines", name: "Inés", initials: "I", side: "right", color: "blue" },
      { id: "alvaro", name: "Álvaro", initials: "Á", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "ines", "¿Os apetece ir a la playa mañana?", "Do you all fancy going to the beach tomorrow?", ["¿Os apetece ir a la playa?"]),
      message("m2", "alvaro", "Sí. Pillamos el Cercanías y no tenemos que conducir.", "Yes. Let's catch the commuter train so we don't have to drive.", ["Pillamos el Cercanías", "Cercanías"]),
      message("m3", "ines", "Perfecto. Quedamos en la estación a las ocho y media.", "Perfect. Let's meet at the station at half past eight.", ["Quedamos en la estación"], "voice-note"),
      message("m4", "alvaro", "Tiramos para la playa tempranito y cogemos buen sitio.", "Let's head to the beach nice and early and get a good spot.", ["Tiramos para la playa tempranito", "Tempranito"]),
      message("m5", "ines", "Eso, antes de que apriete el calor.", "Exactly, before the heat really kicks in.", ["Antes de que apriete el calor"]),
      message("m6", "alvaro", "El tren sale puntual, así que llegaremos temprano.", "The train leaves on time, so we'll arrive early.", ["Cercanías"], "voice-note"),
      message("m7", "ines", "¿Lleváis sombrilla? La mía cabe en la bolsa grande.", "Are you bringing a beach umbrella? Mine fits in the large bag.", ["¿Lleváis sombrilla?", "Sombrilla"]),
      message("m8", "alvaro", "Sí, y llevo crema. Echaos crema, ¿eh?", "Yes, and I'm bringing suncream. Make sure you all put some on, yeah?", ["Crema", "Echaos crema, ¿eh?"]),
      message("m9", "ines", "Buena idea, que hoy no veas cómo pega el sol.", "Good idea, because today the sun is absolutely blazing.", ["No veas cómo pega el sol", "No veas cómo..."]),
      message("m10", "alvaro", "Hemos llegado, pero la playa está hasta arriba.", "We've arrived, but the beach is absolutely packed.", ["Está hasta arriba"]),
      message("m11", "ines", "Hay un hueco cerca del paseo. ¿Nos quedamos por aquí?", "There's a space near the promenade. Shall we stay around here?", ["¿Nos quedamos por aquí?"]),
      message("m12", "alvaro", "Sí. Ponemos la sombrilla y nos ponemos a la sombra.", "Yes. We'll put up the umbrella and get into the shade.", ["Sombrilla", "Nos ponemos a la sombra", "La sombra"], "voice-note"),
      message("m13", "ines", "¿Qué hacemos primero? ¿Damos un paseíto por la orilla?", "What shall we do first? Shall we take a little walk along the shore?", ["¿Qué hacemos?", "Damos un paseíto", "Paseíto"]),
      message("m14", "alvaro", "Venga. Y después, ¿nos damos un baño?", "Alright. And afterwards, shall we go for a dip?", ["¿Nos damos un baño?"]),
      message("m15", "ines", "Sí. El agua está buenísima; entro ahora mismo.", "Yes. The water is lovely; I'm going in right now.", []),
      message("m16", "alvaro", "Yo voy saliendo. ¿Tú te quedas?", "I'm getting out. Are you staying?", []),
      message("m17", "ines", "Me quedo un rato en el agua. ¿Lleváis algo de picar?", "I'm staying in the water for a bit. Have you brought any snacks?", ["Me quedo un rato en el agua", "Un rato", "¿Lleváis algo de picar?"]),
      message("m18", "alvaro", "Nada de picar. Mejor paramos en el chiringuito, que ya va siendo hora.", "No snacks. Better stop at the beach bar because it's about time.", ["Paramos en el chiringuito", "Chiringuito", "Que ya va siendo hora"], "voice-note"),
      message("m19", "ines", "Ya estoy fuera. ¿Pillamos algo de comer?", "I'm out now. Shall we grab something to eat?", ["¿Pillamos algo de comer?"]),
      message("m20", "alvaro", "Pedimos unos espetos; aquí los hacen muy buenos.", "Let's order some grilled sardine skewers; they make them really well here.", ["Pedimos unos espetos", "Espetos"]),
      message("m21", "ines", "Y ¿os apetece pescaíto frito? Podemos pedir una ración para compartir.", "And do you fancy fried fish? We can order one portion to share.", ["¿Os apetece pescaíto frito?", "Pescaíto frito", "Una ración para compartir", "Una ración", "Para compartir"]),
      message("m22", "alvaro", "La cuenta son treinta y seis euros. ¿Cuánto sale por cabeza?", "The bill is thirty-six euros. How much is it per person?", ["¿Cuánto sale por cabeza?", "Por cabeza"]),
      message("m23", "ines", "Somos tres: doce euros por cabeza.", "There are three of us: twelve euros per person.", ["Por cabeza"]),
      message("m24", "alvaro", "Perfecto. Lo pagamos entre todos y listo.", "Perfect. We'll split the cost between all of us and that's sorted.", ["Lo pagamos entre todos"], "voice-note"),
      message("m25", "ines", "Después de comer, ¿qué hacemos? El sol sigue pegando fuerte.", "After eating, what shall we do? The sun is still very strong.", ["¿Qué hacemos?", "No veas cómo pega el sol"]),
      message("m26", "alvaro", "Nos ponemos a la sombra un rato y luego damos otro paseíto.", "We'll sit in the shade for a while and then take another little walk.", ["Nos ponemos a la sombra", "Un rato", "Damos un paseíto"]),
      message("m27", "ines", "Me parece bien. Aquí junto al paseo corre un poco de aire.", "Sounds good. Here by the promenade there's a little breeze.", []),
      message("m28", "alvaro", "Son casi las siete. Vamos recogiendo.", "It's almost seven. Let's start packing up.", ["Vamos recogiendo"]),
      message("m29", "ines", "Sí, que no se nos haga tarde para el Cercanías.", "Yes, so we don't end up too late for the commuter train.", ["Que no se nos haga tarde", "Cercanías"]),
      message("m30", "alvaro", "Sombrilla guardada, bolsas listas y rumbo a la estación. Día redondo.", "Umbrella packed, bags ready, and off to the station. A perfect day.", ["Sombrilla", "Quedamos en la estación"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-beach-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: beachVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: beachVocab.map((item) => item.term),
      grammarPatterns: ["Vosotros invitations and questions with os apetece, lleváis and echaos.", "Group suggestions with pillamos, tiramos, nos ponemos and vamos recogiendo.", "Timing and prevention with antes de que and que no se nos haga tarde."],
      speakingPrompts: ["Invite friends and arrange the Cercanías journey.", "Prepare the group for strong sun and a crowded beach.", "Suggest a walk, swim, snack, and chiringuito meal.", "Order Málaga fish, split the bill, and leave in time."],
    },
    completionTask: { title: "Plan your Costa del Sol beach day", instructions: "Record a 75-second voice message. Invite a group, arrange the train, mention sun protection, choose beach activities, order local food, split the cost, and decide when to pack up." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Un día de playa en la Costa del Sol puede empezar con “¿os apetece ir a la playa?”. El pronombre “os” incluye a todo el grupo. Para evitar el coche, “pillamos el Cercanías” propone usar el tren local y “quedamos en la estación” fija un punto de encuentro claro.", translation: "A Costa del Sol beach day can begin with a group invitation, the local train, and a clear station meeting point.", highlights: highlights(["¿Os apetece ir a la playa?", "Pillamos el Cercanías", "Cercanías", "Quedamos en la estación"]), shadowLine: "¿Os apetece ir a la playa? Pillamos el Cercanías." },
  { id: "p2", text: "La hora importa mucho. “Tiramos para la playa tempranito” usa la expresión informal “tirar para” y el diminutivo “tempranito”. El objetivo es llegar “antes de que apriete el calor”, encontrar sitio y disfrutar de la mañana antes de que la temperatura suba.", translation: "Leaving nice and early helps the group arrive before the strongest heat and find a good place.", highlights: highlights(["Tiramos para la playa tempranito", "Tempranito", "Antes de que apriete el calor"]), shadowLine: "Tiramos para la playa tempranito, antes de que apriete el calor." },
  { id: "p3", text: "La protección solar no es opcional. “¿Lleváis sombrilla?” comprueba si habrá “sombra”, mientras que “echaos crema, ¿eh?” recuerda a varias personas que usen “crema”. Cuando alguien dice “no veas cómo pega el sol”, expresa que el sol cae con muchísima intensidad.", translation: "The group checks for an umbrella, shade, and suncream because the sun is extremely strong.", highlights: highlights(["¿Lleváis sombrilla?", "Sombrilla", "La sombra", "Echaos crema, ¿eh?", "Crema", "No veas cómo pega el sol"]), shadowLine: "Echaos crema, ¿eh?, que no veas cómo pega el sol." },
  { id: "p4", text: "En verano la arena puede estar llena desde temprano. “Está hasta arriba” significa que no queda casi espacio. El grupo puede preguntar “¿nos quedamos por aquí?” y buscar “la sombra”. Si quiere explorar antes de instalarse, “damos un paseíto” propone un pequeño paseo sin convertirlo en una caminata larga.", translation: "When the beach is packed, the group can choose a nearby shaded place or take a short walk first.", highlights: highlights(["Está hasta arriba", "¿Nos quedamos por aquí?", "La sombra", "Damos un paseíto", "Paseíto"]), shadowLine: "Está hasta arriba. ¿Nos quedamos por aquí?" },
  { id: "p5", text: "“¿Nos damos un baño?” significa entrar al mar para nadar o refrescarse. Una persona puede responder “me quedo un rato en el agua”, donde “un rato” indica un periodo breve e impreciso. Al salir, “¿lleváis algo de picar?” comprueba si el grupo trajo algún tentempié.", translation: "The group goes for a dip, someone stays in the water briefly, and they check whether anyone brought snacks.", highlights: highlights(["¿Nos damos un baño?", "Me quedo un rato en el agua", "Un rato", "¿Lleváis algo de picar?"]), shadowLine: "¿Nos damos un baño? Me quedo un rato en el agua." },
  { id: "p6", text: "Si no hay comida, “paramos en el chiringuito” lleva al grupo al bar de playa. En la costa de Málaga, “pedimos unos espetos” introduce sardinas ensartadas y asadas al fuego. También se puede preguntar “¿os apetece pescaíto frito?” y pedir “una ración para compartir”.", translation: "At the beach bar, Málaga's grilled sardine skewers and Andalusian fried fish are natural shared choices.", highlights: highlights(["Paramos en el chiringuito", "Chiringuito", "Pedimos unos espetos", "Espetos", "¿Os apetece pescaíto frito?", "Pescaíto frito", "Una ración para compartir", "Una ración", "Para compartir"]), shadowLine: "Paramos en el chiringuito y pedimos unos espetos." },
  { id: "p7", text: "Cuando llega la cuenta, “¿cuánto sale por cabeza?” pregunta el precio individual. “Por cabeza” equivale a por persona. Si nadie invita al resto, “lo pagamos entre todos” acuerda repartir el total. Estas expresiones sirven también para viajes, alojamientos y otras comidas en grupo.", translation: "The group calculates the price per person and agrees to split the total between everyone.", highlights: highlights(["¿Cuánto sale por cabeza?", "Por cabeza", "Lo pagamos entre todos"]), shadowLine: "¿Cuánto sale por cabeza? Lo pagamos entre todos." },
  { id: "p8", text: "Al final del día, “vamos recogiendo” no exige marcharse en un segundo: propone empezar a guardar las cosas. La razón puede ser “que no se nos haga tarde”, sobre todo si hay que coger el último “Cercanías”. Así termina el plan con tiempo para guardar la “sombrilla”, recoger la basura y volver con calma.", translation: "Packing up gradually prevents the group from becoming late for the return train and encourages a tidy departure.", highlights: highlights(["Vamos recogiendo", "Que no se nos haga tarde", "Cercanías", "Sombrilla"]), shadowLine: "Vamos recogiendo, que no se nos haga tarde." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "beach-reading-q1", type: "multiple-choice", prompt: "Why does the group use the Cercanías?", options: ["To reach the coast without driving", "To travel to another country", "To avoid the beach", "To carry the umbrella"], correctAnswer: "To reach the coast without driving", explanation: "The local commuter train offers a practical coastal journey.", points: 1, skillTag: "transport" },
  { id: "beach-reading-q2", type: "true-false", prompt: "True or false: “echaos crema” addresses several friends informally.", options: ["True", "False"], correctAnswer: "True", explanation: "It is the plural informal command used with vosotros.", points: 1, skillTag: "vosotros" },
  { id: "beach-reading-q3", type: "multiple-choice", prompt: "What are espetos?", options: ["Sardines grilled on skewers", "A type of train ticket", "Beach umbrellas", "Cold sandwiches"], correctAnswer: "Sardines grilled on skewers", explanation: "They are a characteristic Málaga coastal speciality.", points: 1, skillTag: "culture" },
  { id: "beach-reading-q4", type: "order-words", prompt: "Order the group payment question.", nativePrompt: "How much is it per person?", wordBank: ["¿Cuánto", "sale", "por", "cabeza?"], correctAnswer: "¿Cuánto sale por cabeza?", explanation: "Por cabeza means per person.", points: 2, skillTag: "payment" },
  { id: "beach-reading-q5", type: "multiple-choice", prompt: "What does “vamos recogiendo” suggest?", options: ["Start packing up gradually", "Order another meal", "Enter the water", "Leave everything behind"], correctAnswer: "Start packing up gradually", explanation: "It begins the departure process without making it abrupt.", points: 1, skillTag: "departure" },
];

export const andalusianSpanishB1BeachDayCostaDelSolReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Del Cercanías al Chiringuito", subtitle: "A synced Spanish reading about travelling to the Costa del Sol, sun safety, crowded beaches, swimming, Málaga fish dishes, shared costs, and leaving on time.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "Málaga", "Costa del Sol"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: beachVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1BeachDayCostaDelSolQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Beach Day on the Costa del Sol", subtitle: "Test transport, sun protection, crowd language, beach activities, Málaga food, shared payments, and departure planning.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "Málaga", "Costa del Sol"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for a complete group beach day on the Costa del Sol.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "beach-quiz-q1", type: "multiple-choice", prompt: "Which question invites several friends to the beach?", options: ["¿Os apetece ir a la playa?", "¿Cuánto sale por cabeza?", "¿Lleváis algo de picar?", "¿Qué hacemos?"], correctAnswer: "¿Os apetece ir a la playa?", explanation: "Os apetece addresses the whole group informally.", points: 1, skillTag: "invitation" },
      { id: "beach-quiz-q2", type: "multiple-choice", prompt: "Which phrase suggests using Málaga's local commuter train?", options: ["Pillamos el Cercanías", "Damos un paseíto", "Vamos recogiendo", "Nos ponemos a la sombra"], correctAnswer: "Pillamos el Cercanías", explanation: "Pillar transport means to catch it in informal Spain Spanish.", points: 1, skillTag: "transport" },
      { id: "beach-quiz-q3", type: "order-words", prompt: "Order the heat-avoidance plan.", nativePrompt: "Let's head to the beach nice and early.", wordBank: ["Tiramos", "para", "la", "playa", "tempranito."], correctAnswer: "Tiramos para la playa tempranito.", explanation: "Tirar para means to head toward a place.", points: 2, skillTag: "planning" },
      { id: "beach-quiz-q4", type: "true-false", prompt: "True or false: “no veas cómo pega el sol” describes very intense sunshine.", options: ["True", "False"], correctAnswer: "True", explanation: "Pegar el sol means the sun is beating down, intensified by no veas.", points: 1, skillTag: "weather" },
      { id: "beach-quiz-q5", type: "multiple-choice", prompt: "What does “está hasta arriba” say about the beach?", options: ["It is completely packed", "It is closed", "It is very cold", "It is in the shade"], correctAnswer: "It is completely packed", explanation: "Hasta arriba means full to capacity.", points: 1, skillTag: "crowds" },
      { id: "beach-quiz-q6", type: "multiple-choice", prompt: "Which phrase proposes going for a swim?", options: ["¿Nos damos un baño?", "¿Nos quedamos por aquí?", "¿Pillamos algo de comer?", "¿Lleváis sombrilla?"], correctAnswer: "¿Nos damos un baño?", explanation: "Darse un baño means taking a dip in this beach context.", points: 1, skillTag: "swimming" },
      { id: "beach-quiz-q7", type: "multiple-choice", prompt: "Where would you naturally order espetos?", options: ["At a chiringuito", "At the train station", "Under the umbrella", "In the sea"], correctAnswer: "At a chiringuito", explanation: "The Málaga beach bar is the characteristic setting for grilled sardine skewers.", points: 1, skillTag: "culture" },
      { id: "beach-quiz-q8", type: "fill-blank", prompt: "Complete: Una ración para _____.", nativePrompt: "One portion to share.", correctAnswer: "compartir", explanation: "Para compartir indicates the group will share the dish.", points: 1, skillTag: "food" },
      { id: "beach-quiz-q9", type: "multiple-choice", prompt: "How do you ask each person's share of a bill?", options: ["¿Cuánto sale por cabeza?", "¿Qué hacemos?", "¿Os apetece pescaíto frito?", "¿Nos damos un baño?"], correctAnswer: "¿Cuánto sale por cabeza?", explanation: "Por cabeza means per person.", points: 1, skillTag: "payment" },
      { id: "beach-quiz-q10", type: "true-false", prompt: "True or false: “lo pagamos entre todos” means one person pays everything.", options: ["True", "False"], correctAnswer: "False", explanation: "It means the group shares the payment.", points: 1, skillTag: "payment" },
      { id: "beach-quiz-q11", type: "multiple-choice", prompt: "Which phrase starts the departure process gradually?", options: ["Vamos recogiendo", "Está hasta arriba", "Damos un paseíto", "Paramos en el chiringuito"], correctAnswer: "Vamos recogiendo", explanation: "It means starting to gather and pack the belongings.", points: 1, skillTag: "departure" },
      { id: "beach-quiz-q12", type: "match-pairs", prompt: "Match each Costa del Sol word to its meaning.", pairs: [{ left: "Cercanías", right: "Commuter train" }, { left: "Chiringuito", right: "Beach bar" }, { left: "Espetos", right: "Grilled sardine skewers" }], explanation: "These terms connect the journey and characteristic Málaga beach food.", points: 3, skillTag: "culture" },
      { id: "beach-quiz-q13", type: "match-pairs", prompt: "Match each phrase to its function.", pairs: [{ left: "Echaos crema, ¿eh?", right: "Remind the group about suncream" }, { left: "Nos ponemos a la sombra", right: "Move away from direct sun" }, { left: "Que no se nos haga tarde", right: "Avoid leaving too late" }], explanation: "The phrases manage protection, comfort, and timing.", points: 3, skillTag: "functions" },
    ],
  },
};
