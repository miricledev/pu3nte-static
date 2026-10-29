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

const courseId = "andalusian-spanish-b1-heat-summer-plans";
const sectionName = "Andalusian Spanish - B1 Talking About Heat and Summer Plans";

const heatVocab: VocabItem[] = [
  { id: "vaya-tela-calor", term: "¡Vaya tela de calor!", meaning: "Bloody hell, it's absolutely roasting!", note: "Vaya tela expresses surprise, frustration, or disbelief and is especially recognisable in Andalusian conversation.", example: "¡Vaya tela de calor! No se puede ni andar.", translation: "It's absolutely roasting! You can barely walk." },
  { id: "la-calor-que-hace", term: "Con la calor que hace...", meaning: "With this heat...", note: "La calor is a regional feminine usage heard in parts of Andalusia.", example: "Con la calor que hace, mejor esperamos.", translation: "With this heat, we'd better wait." },
  { id: "no-hay-quien-pare", term: "No hay quien pare fuera", meaning: "It's too hot for anyone to stay outside", note: "No hay quien plus subjunctive describes something practically impossible.", example: "A mediodía no hay quien pare fuera.", translation: "At midday it's too hot for anyone to stay outside." },
  { id: "pega-sol", term: "A estas horas pega el sol", meaning: "The sun really beats down at this time of day", note: "Pegar el sol describes strong direct sunshine.", example: "No salgas ahora; a estas horas pega el sol.", translation: "Don't go out now; the sun beats down at this time." },
  { id: "hecho-polvo", term: "Estoy hecho polvo", meaning: "I'm absolutely knackered / Exhausted", note: "A woman says hecha polvo; the adjective agrees with the speaker.", example: "Después de caminar al sol, estoy hecho polvo.", translation: "After walking in the sun, I'm exhausted." },
  { id: "sin-fuerzas", term: "Me ha dejado sin fuerzas", meaning: "It's completely drained my energy", note: "Useful when heat or effort has left someone with no energy.", example: "El bochorno me ha dejado sin fuerzas.", translation: "The muggy heat has drained my energy." },
  { id: "buscar-sombrita", term: "Vamos a buscar una sombrita", meaning: "Let's find a nice little spot in the shade", note: "The diminutive makes the suggestion friendly and comfortable rather than literally tiny.", example: "Vamos a buscar una sombrita debajo de los árboles.", translation: "Let's find some shade under the trees." },
  { id: "corre-aire", term: "Aquí corre un poquito de aire", meaning: "There's a little breeze here", note: "Correr aire naturally describes air moving through a place.", example: "Quédate aquí, que corre un poquito de aire.", translation: "Stay here; there's a little breeze." },
  { id: "sentamos-ratillo", term: "¿Nos sentamos un ratillo?", meaning: "Shall we sit down for a little while?", note: "Ratillo softens the pause and makes it sound short and relaxed.", example: "¿Nos sentamos un ratillo a la sombra?", translation: "Shall we sit in the shade for a little while?" },
  { id: "algo-fresquito", term: "Me apetece algo fresquito", meaning: "I fancy something nice and cold", note: "Me apetece expresses a present desire naturally.", example: "Me apetece algo fresquito para beber.", translation: "I fancy something cold to drink." },
  { id: "agua-fria", term: "¿Pillamos agua bien fría?", meaning: "Shall we grab some really cold water?", note: "Pillar is an informal Spain Spanish verb meaning get or grab.", example: "Antes de seguir, ¿pillamos agua bien fría?", translation: "Before continuing, shall we get some very cold water?" },
  { id: "vaso-hielo", term: "¿Me pones un vaso con hielo?", meaning: "Can you get me a glass with ice?", note: "Ponme is direct but normal when ordering in a bar or café.", example: "¿Me pones un vaso con hielo y una botella de agua?", translation: "Can I have a glass with ice and a bottle of water?" },
  { id: "gota-gorda", term: "Estoy sudando la gota gorda", meaning: "I'm sweating buckets", note: "A widespread idiom for sweating heavily from heat or effort.", example: "Después de cinco minutos andando, estoy sudando la gota gorda.", translation: "After five minutes walking, I'm sweating buckets." },
  { id: "bochorno", term: "Hace un bochorno tremendo", meaning: "It's unbearably hot and muggy", note: "Bochorno is oppressive, often humid heat rather than heat in general.", example: "Hoy hace un bochorno tremendo en la ciudad.", translation: "It's unbearably muggy in the city today." },
  { id: "pleno-sol", term: "Mejor no andar a pleno sol", meaning: "Better not walk in direct sunlight", note: "A pleno sol means fully exposed to direct sun.", example: "Mejor no andar a pleno sol después de comer.", translation: "Better not walk in direct sunlight after lunch." },
  { id: "con-calma", term: "Vamos a tomárnoslo con calma", meaning: "Let's take it easy", note: "A transferable phrase for slowing down without stress.", example: "Hace mucho calor; vamos a tomárnoslo con calma.", translation: "It's very hot; let's take it easy." },
  { id: "paseo-luego", term: "Dejamos el paseo para luego", meaning: "Let's leave the walk until later", note: "Dejar algo para luego postpones it without cancelling it.", example: "Dejamos el paseo para luego y descansamos ahora.", translation: "Let's leave the walk until later and rest now." },
  { id: "afloje-calor", term: "Cuando afloje el calor", meaning: "When the heat lets up", note: "Afloje is subjunctive because the future easing has not happened yet.", example: "Salimos cuando afloje el calor.", translation: "We'll go out when the heat eases." },
  { id: "ultima-hora", term: "¿Quedamos a última hora de la tarde?", meaning: "Shall we meet towards the end of the afternoon?", note: "A practical hot-weather meeting time after the harshest hours.", example: "¿Quedamos a última hora de la tarde en la terraza?", translation: "Shall we meet late in the afternoon on the terrace?" },
  { id: "a-ver-refresca", term: "A ver si refresca", meaning: "Hopefully it'll cool down", note: "A ver si plus present expresses hope about what may happen.", example: "Esperamos un poco, a ver si refresca.", translation: "We'll wait a little and hope it cools down." },
  { id: "si-te-parece", term: "Si te parece, nos vemos en la terraza", meaning: "If that sounds good, I'll see you on the terrace", note: "Si te parece politely checks agreement before confirming the plan.", example: "Si te parece, nos vemos en la terraza a las ocho.", translation: "If that works, I'll see you on the terrace at eight." },
  { id: "con-la-fresca", term: "Ya saldremos con la fresca", meaning: "We'll head out once it's cooled down", note: "Con la fresca evokes going out during the cooler evening period.", example: "Ahora descansamos; ya saldremos con la fresca.", translation: "We'll rest now and head out when it's cooler." },
  { id: "uf-bochorno", term: "Uf, hace un bochorno tremendo", meaning: "Ugh, it's absolutely sweltering and muggy", note: "Uf adds an immediate physical reaction to the oppressive heat.", example: "Uf, hace un bochorno tremendo dentro y fuera.", translation: "Ugh, it's unbearably muggy indoors and outdoors." },
  { id: "ya-ves", term: "Ya ves", meaning: "Tell me about it / Exactly", note: "A compact conversational agreement with what someone has just said.", example: "—Hace muchísimo calor. —Ya ves.", translation: "—It's extremely hot. —Tell me about it." },
  { id: "dar-vuelta", term: "¿Salimos a dar una vuelta?", meaning: "Shall we go for a wander?", note: "Dar una vuelta suggests a relaxed walk without a strict destination.", example: "Cuando baje el sol, ¿salimos a dar una vuelta?", translation: "When the sun goes down, shall we go for a wander?" },
  { id: "dejamos-afloje", term: "¿O lo dejamos para cuando afloje el calor?", meaning: "Or shall we leave it until the heat dies down?", note: "The future time clause uses subjunctive afloje.", example: "¿Salimos ya o lo dejamos para cuando afloje el calor?", translation: "Shall we go now or leave it until the heat eases?" },
  { id: "mejor-luego", term: "Mejor luego, que estoy hecho polvo", meaning: "Better later, I'm absolutely knackered", note: "Que introduces the reason for postponing the plan.", example: "Mejor luego, que estoy hecho polvo con este calor.", translation: "Better later; this heat has exhausted me." },
  { id: "sombra", term: "Nos sentamos a la sombra", meaning: "Let's sit in the shade", note: "A la sombra gives the practical location for resting.", example: "Nos sentamos a la sombra hasta que baje el sol.", translation: "We'll sit in the shade until the sun lowers." },
  { id: "pillamos-fresquito", term: "Pillamos algo fresquito", meaning: "Let's grab something cold", note: "A casual way to propose a cold drink or snack.", example: "Pillamos algo fresquito en el bar.", translation: "Let's get something cold at the bar." },
  { id: "donde-corra", term: "Donde corra un poquito de aire", meaning: "Somewhere there's a little breeze", note: "The subjunctive corra describes an unspecified place with the desired quality.", example: "Buscamos una mesa donde corra un poquito de aire.", translation: "Let's find a table where there's a little breeze." },
  { id: "perfecto-refresca", term: "Perfecto, a ver si refresca", meaning: "Perfect, hopefully it'll cool down", note: "Combines agreement with a natural expression of hope.", example: "Quedamos a las ocho. Perfecto, a ver si refresca.", translation: "We'll meet at eight. Perfect, hopefully it'll cool down." },
  { id: "salimos-fresca", term: "Salimos con la fresca", meaning: "We'll head out when it's cooler", note: "A concise summer plan for avoiding the hottest hours.", example: "Descansamos ahora y salimos con la fresca.", translation: "We'll rest now and go out when it's cooler." },
  { id: "la-calor", term: "La calor", meaning: "The heat (regional feminine usage)", note: "Regional and informal; standard Spanish usually uses el calor.", example: "La calor de agosto es fuerte.", translation: "The August heat is intense." },
  { id: "bochorno-vocab", term: "Bochorno", meaning: "Oppressive, muggy heat", note: "More specific than general calor.", example: "El bochorno no deja dormir.", translation: "The muggy heat makes it impossible to sleep." },
  { id: "sombrita", term: "Sombrita", meaning: "A little patch of shade", note: "A friendly diminutive often used when seeking comfort.", example: "Aquí hay una sombrita buena.", translation: "There's a nice patch of shade here." },
  { id: "fresquito", term: "Fresquito", meaning: "Pleasantly cool / Nice and cold", note: "Can describe weather, air, drinks, or food.", example: "El agua está fresquita.", translation: "The water is nice and cold." },
  { id: "ratillo", term: "Un ratillo", meaning: "A little while", note: "A relaxed diminutive for a short period.", example: "Descansamos un ratillo.", translation: "We'll rest for a little while." },
  { id: "pleno-sol-vocab", term: "A pleno sol", meaning: "In direct sunlight", note: "Describes complete exposure to the sun.", example: "La terraza está a pleno sol.", translation: "The terrace is in direct sunlight." },
  { id: "aflojar", term: "Aflojar el calor", meaning: "For the heat to ease off", note: "Aflojar figuratively means become less intense.", example: "El calor suele aflojar al atardecer.", translation: "The heat often eases around sunset." },
  { id: "refrescar", term: "Refrescar", meaning: "To become cooler", note: "Used for weather becoming less hot.", example: "Por la noche empieza a refrescar.", translation: "At night it starts to cool down." },
  { id: "fresca", term: "Con la fresca", meaning: "During the cooler part of the day", note: "A culturally resonant hot-weather timing expression.", example: "La gente sale con la fresca.", translation: "People go out when it's cooler." },
  { id: "paseo", term: "Paseo", meaning: "Walk / Stroll", note: "A relaxed social or recreational walk.", example: "Damos un paseo por el paseo marítimo.", translation: "We'll take a walk along the promenade." },
  { id: "vaso-hielo-vocab", term: "Vaso con hielo", meaning: "Glass with ice", note: "A practical café request in hot weather.", example: "Ponme un vaso con hielo, por favor.", translation: "Give me a glass with ice, please." },
  { id: "gota-gorda-vocab", term: "La gota gorda", meaning: "Literally the big drop, used in the sweating idiom", note: "Normally appears in sudar la gota gorda.", example: "Subiendo la cuesta sudé la gota gorda.", translation: "I sweated buckets climbing the hill." },
  { id: "ultima-hora-vocab", term: "A última hora de la tarde", meaning: "Towards the end of the afternoon", note: "Later than media tarde and useful for summer plans.", example: "Nos vemos a última hora de la tarde.", translation: "We'll meet towards the end of the afternoon." },
  { id: "sin-fuerzas-vocab", term: "Sin fuerzas", meaning: "With no energy / Exhausted", note: "A compact state description after dejar or quedarse.", example: "He terminado el día sin fuerzas.", translation: "I've finished the day with no energy." },
];

const highlightMap = Object.fromEntries(heatVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = heatVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1HeatSummerPlansFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Heat and Summer Plans Flashcards", subtitle: "Describe intense Andalusian heat, find shade and cold drinks, explain exhaustion, postpone a walk, and arrange an evening plan once temperatures fall.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "summer", "heat", "plans"], estimatedMinutes: 23,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: heatVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1HeatSummerPlansSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Cuando Afloje la Calor", subtitle: "Build a summer plan from reacting to midday heat to finding shade, cooling down, postponing the walk, and meeting again with the evening breeze.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "summer"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "React to oppressive heat, explain why walking now is difficult, describe exhaustion, find shade and a breeze, order cold water, suggest taking it easy, postpone the walk, and arrange a terrace meeting for the cooler evening.",
    stages: [
      stage("stage-1", "React to the heat", sentenceVocab.slice(0, 4), sentenceVocab.slice(32, 35), "Bloody hell, it's roasting. With this heat nobody can stay outside; the sun beats down at this time.", "¡Vaya tela de calor! Con la calor que hace, no hay quien pare fuera; a estas horas pega el sol.", "The regional la calor and no hay quien plus subjunctive make the reaction especially natural.", breakdown([["bloody hell, it's roasting", "¡Vaya tela de calor!"], ["with this heat", "Con la calor que hace"], ["nobody can stay outside", "no hay quien pare fuera"], ["the sun beats down now", "a estas horas pega el sol"]])),
      stage("stage-2", "Explain exhaustion", sentenceVocab.slice(4, 6), sentenceVocab.slice(33, 46), "I'm absolutely exhausted. This muggy heat has completely drained my energy.", "Estoy hecho polvo. Este bochorno me ha dejado sin fuerzas.", "Hecho or hecha agrees with the speaker, while dejar sin fuerzas describes the result.", breakdown([["I'm absolutely exhausted", "Estoy hecho polvo"], ["this muggy heat", "Este bochorno"], ["has drained my energy", "me ha dejado sin fuerzas"]])),
      stage("stage-3", "Find shade and air", sentenceVocab.slice(6, 9), sentenceVocab.slice(34, 38), "Let's find some shade. There's a little breeze here. Shall we sit for a little while?", "Vamos a buscar una sombrita. Aquí corre un poquito de aire. ¿Nos sentamos un ratillo?", "The diminutives sombrita and ratillo make the pause sound relaxed and friendly.", breakdown([["let's find some shade", "Vamos a buscar una sombrita"], ["there's a little breeze here", "Aquí corre un poquito de aire"], ["shall we sit for a little while?", "¿Nos sentamos un ratillo?"]])),
      stage("stage-4", "Get something cold", sentenceVocab.slice(9, 12), sentenceVocab.slice(28, 44), "I fancy something cold. Shall we grab very cold water? Can I have a glass with ice?", "Me apetece algo fresquito. ¿Pillamos agua bien fría? ¿Me pones un vaso con hielo?", "The sequence moves from desire to a shared suggestion and a café request.", breakdown([["I fancy something cold", "Me apetece algo fresquito"], ["shall we grab cold water?", "¿Pillamos agua bien fría?"], ["can I have a glass with ice?", "¿Me pones un vaso con hielo?"]])),
      stage("stage-5", "Describe the conditions", sentenceVocab.slice(12, 15), sentenceVocab.slice(33, 44), "I'm sweating buckets. It's unbearably muggy, so we'd better not walk in direct sunlight.", "Estoy sudando la gota gorda. Hace un bochorno tremendo, así que mejor no andar a pleno sol.", "The idiom intensifies the physical reaction and leads to practical advice.", breakdown([["I'm sweating buckets", "Estoy sudando la gota gorda"], ["it's unbearably muggy", "Hace un bochorno tremendo"], ["better not walk", "mejor no andar"], ["in direct sunlight", "a pleno sol"]])),
      stage("stage-6", "Slow down and postpone", sentenceVocab.slice(15, 18), sentenceVocab.slice(39, 43), "Let's take it easy. We'll leave the walk until later, when the heat lets up.", "Vamos a tomárnoslo con calma. Dejamos el paseo para luego, cuando afloje el calor.", "Cuando afloje uses the subjunctive for a future change that has not happened yet.", breakdown([["let's take it easy", "Vamos a tomárnoslo con calma"], ["we'll leave the walk until later", "Dejamos el paseo para luego"], ["when the heat lets up", "cuando afloje el calor"]])),
      stage("stage-7", "Arrange a cooler meeting", sentenceVocab.slice(18, 21), sentenceVocab.slice(39, 45), "Shall we meet late in the afternoon? Hopefully it'll cool down. If that works, see you on the terrace.", "¿Quedamos a última hora de la tarde? A ver si refresca. Si te parece, nos vemos en la terraza.", "The time avoids the hottest hours, and si te parece checks agreement politely.", breakdown([["shall we meet late in the afternoon?", "¿Quedamos a última hora de la tarde?"], ["hopefully it'll cool down", "A ver si refresca"], ["if that works", "Si te parece"], ["see you on the terrace", "nos vemos en la terraza"]])),
      stage("stage-8", "Confirm the summer plan", sentenceVocab.slice(21, 32), sentenceVocab.slice(40, 46), "Perfect. We'll rest now and go for a wander once it's cooler.", "Perfecto. Ahora descansamos y ya saldremos a dar una vuelta con la fresca.", "Con la fresca frames the outing around the cooler part of the day.", breakdown([["perfect", "Perfecto"], ["now we'll rest", "Ahora descansamos"], ["we'll go for a wander", "saldremos a dar una vuelta"], ["once it's cooler", "con la fresca"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "heat-story-q1", type: "multiple-choice", prompt: "Why does Marta reject the midday walk?", options: ["The heat and direct sun are unbearable", "She has lost her shoes", "The park is closed", "It is raining heavily"], correctAnswer: "The heat and direct sun are unbearable", explanation: "She reacts to the heat and says nobody can stay outside.", points: 1, skillTag: "conditions" },
  { id: "heat-story-q2", type: "true-false", prompt: "True or false: Dani feels energetic after walking in the sun.", options: ["True", "False"], correctAnswer: "False", explanation: "He says he is exhausted and has no strength.", points: 1, skillTag: "condition" },
  { id: "heat-story-q3", type: "multiple-choice", prompt: "Where do they decide to rest?", options: ["In a patch of shade where there is a breeze", "In direct sunlight", "Inside a parked car", "At the top of a hill"], correctAnswer: "In a patch of shade where there is a breeze", explanation: "They look for shade and moving air.", points: 1, skillTag: "comfort" },
  { id: "heat-story-q4", type: "multiple-choice", prompt: "What do they get to cool down?", options: ["Cold water and a glass with ice", "Hot soup", "Coffee without water", "A heavy coat"], correctAnswer: "Cold water and a glass with ice", explanation: "They order water bien fría and a glass with ice.", points: 1, skillTag: "refreshment" },
  { id: "heat-story-q5", type: "true-false", prompt: "True or false: Dani wants to continue walking in direct sun immediately.", options: ["True", "False"], correctAnswer: "False", explanation: "He says it is better not to walk in direct sunlight.", points: 1, skillTag: "advice" },
  { id: "heat-story-q6", type: "multiple-choice", prompt: "What happens to the original walk?", options: ["They postpone it until the heat eases", "They cancel every future plan", "They finish it at midday", "They replace it with a run"], correctAnswer: "They postpone it until the heat eases", explanation: "They decide to take it easy and leave the walk until later.", points: 1, skillTag: "planning" },
  { id: "heat-story-q7", type: "multiple-choice", prompt: "When do Marta and Dani propose meeting again?", options: ["Towards the end of the afternoon", "At midday", "At dawn tomorrow", "Next winter"], correctAnswer: "Towards the end of the afternoon", explanation: "They choose a cooler time later that day.", points: 1, skillTag: "time" },
  { id: "heat-story-q8", type: "true-false", prompt: "True or false: They choose a terrace that still sits in full sun.", options: ["True", "False"], correctAnswer: "False", explanation: "They choose a shaded terrace where some air moves.", points: 1, skillTag: "location" },
  { id: "heat-story-q9", type: "multiple-choice", prompt: "What weather change do they hope for?", options: ["That it cools down", "That it becomes hotter", "That snow begins", "That the wind disappears"], correctAnswer: "That it cools down", explanation: "They say a ver si refresca.", points: 1, skillTag: "hope" },
  { id: "heat-story-q10", type: "multiple-choice", prompt: "What is the final plan?", options: ["Rest now and go out when it is cooler", "Walk immediately at midday", "Stay home for the entire summer", "Meet in direct sunlight"], correctAnswer: "Rest now and go out when it is cooler", explanation: "They save the stroll for con la fresca.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1HeatSummerPlansWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: El Paseo Puede Esperar", subtitle: "Marta and Dani abandon a midday walk, cool down in the shade, and rebuild the plan around a breezy terrace and the evening fresca.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "summer", "heat"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "marta", name: "Marta", initials: "M", side: "right", color: "blue" },
      { id: "dani", name: "Dani", initials: "D", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "marta", "¡Vaya tela de calor! Con la calor que hace, no me apetece andar ahora.", "It's absolutely roasting! With this heat, I don't feel like walking now.", ["¡Vaya tela de calor!", "Con la calor que hace...", "La calor"]),
      message("m2", "dani", "Ya ves. A estas horas pega el sol con fuerza.", "Tell me about it. The sun beats down strongly at this time.", ["Ya ves", "A estas horas pega el sol"]),
      message("m3", "marta", "No hay quien pare fuera. ¿De verdad salimos a dar una vuelta?", "It's too hot for anyone to stay outside. Are we really going for a walk?", ["No hay quien pare fuera", "¿Salimos a dar una vuelta?"], "voice-note"),
      message("m4", "dani", "Yo estoy hecho polvo desde que he cruzado la plaza.", "I'm exhausted after crossing the square.", ["Estoy hecho polvo"]),
      message("m5", "marta", "A mí este bochorno me ha dejado sin fuerzas.", "This muggy heat has drained my energy too.", ["Me ha dejado sin fuerzas", "Bochorno", "Sin fuerzas"]),
      message("m6", "dani", "Mejor luego, que estoy hecho polvo. Ahora no puedo con el paseo.", "Better later; I'm exhausted. I can't manage the walk now.", ["Mejor luego, que estoy hecho polvo", "Estoy hecho polvo", "Paseo"], "voice-note"),
      message("m7", "marta", "Vamos a buscar una sombrita debajo de esos árboles.", "Let's find some shade under those trees.", ["Vamos a buscar una sombrita", "Sombrita"]),
      message("m8", "dani", "Sí, aquí corre un poquito de aire.", "Yes, there's a little breeze here.", ["Aquí corre un poquito de aire"]),
      message("m9", "marta", "¿Nos sentamos un ratillo a la sombra?", "Shall we sit in the shade for a little while?", ["¿Nos sentamos un ratillo?", "Nos sentamos a la sombra", "Un ratillo"]),
      message("m10", "dani", "Me apetece algo fresquito. Tengo la boca seca.", "I fancy something cold. My mouth is dry.", ["Me apetece algo fresquito", "Fresquito"]),
      message("m11", "marta", "En el bar de la esquina venden botellas de agua.", "The bar on the corner sells bottles of water.", []),
      message("m12", "dani", "¿Pillamos agua bien fría? Yo voy pidiendo.", "Shall we get some very cold water? I'll order.", ["¿Pillamos agua bien fría?"], "voice-note"),
      message("m13", "marta", "Para mí una botella. ¿Me pones un vaso con hielo también?", "A bottle for me. Can I have a glass with ice too?", ["¿Me pones un vaso con hielo?", "Vaso con hielo"]),
      message("m14", "dani", "Yo quiero lo mismo. Estoy sudando la gota gorda.", "I want the same. I'm sweating buckets.", ["Estoy sudando la gota gorda", "La gota gorda"]),
      message("m15", "marta", "Uf, hace un bochorno tremendo incluso a la sombra.", "It's unbearably muggy even in the shade.", ["Uf, hace un bochorno tremendo", "Hace un bochorno tremendo", "Bochorno"]),
      message("m16", "dani", "Mejor no andar a pleno sol. No merece la pena.", "Better not to walk in direct sunlight. It isn't worth it.", ["Mejor no andar a pleno sol", "A pleno sol"]),
      message("m17", "marta", "Totalmente. Vamos a tomárnoslo con calma.", "Absolutely. Let's take it easy.", ["Vamos a tomárnoslo con calma"]),
      message("m18", "dani", "Dejamos el paseo para luego, cuando afloje el calor.", "Let's leave the walk until later when the heat lets up.", ["Dejamos el paseo para luego", "Cuando afloje el calor", "Aflojar el calor", "Paseo"], "voice-note"),
      message("m19", "marta", "¿Quedamos a última hora de la tarde?", "Shall we meet towards the end of the afternoon?", ["¿Quedamos a última hora de la tarde?", "A última hora de la tarde"]),
      message("m20", "dani", "Sí, a eso de las ocho puede estar bien.", "Yes, around eight could work.", []),
      message("m21", "marta", "Si te parece, nos vemos en la terraza de la Alameda.", "If that works, I'll see you on the Alameda terrace.", ["Si te parece, nos vemos en la terraza"]),
      message("m22", "dani", "¿La que tiene toldo y árboles alrededor?", "The one with an awning and trees around it?", []),
      message("m23", "marta", "Esa misma. Buscamos una mesa donde corra un poquito de aire.", "That's the one. We'll find a table where there's a little breeze.", ["Donde corra un poquito de aire"]),
      message("m24", "dani", "Perfecto, a ver si refresca y no estamos a pleno sol.", "Perfect, hopefully it'll cool down and we won't be in direct sunlight.", ["Perfecto, a ver si refresca", "A ver si refresca", "A pleno sol"], "voice-note"),
      message("m25", "marta", "La previsión dice que baja la temperatura al atardecer.", "The forecast says the temperature will fall at sunset.", []),
      message("m26", "dani", "Entonces descansamos ahora y salimos con la fresca.", "Then we'll rest now and go out when it's cooler.", ["Salimos con la fresca", "Con la fresca"]),
      message("m27", "marta", "Sí. Ya saldremos con la fresca, sin ninguna prisa.", "Yes. We'll head out when it's cooler, with no rush.", ["Ya saldremos con la fresca", "Con la fresca"]),
      message("m28", "dani", "Tomamos algo fresquito y después damos el paseo.", "We'll have something cold and then take the walk.", ["Pillamos algo fresquito", "Paseo"]),
      message("m29", "marta", "Mucho mejor. A mediodía, sombra y agua; por la tarde, paseo.", "Much better. At midday, shade and water; in the evening, a walk.", ["Sombrita", "Paseo"]),
      message("m30", "dani", "Trato hecho. Nos vemos en la terraza a las ocho, a ver si refresca.", "Deal. See you on the terrace at eight; hopefully it'll cool down.", ["Si te parece, nos vemos en la terraza", "A ver si refresca"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-heat-summer-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: heatVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: heatVocab.map((item) => item.term),
      grammarPatterns: ["Regional feminine usage la calor alongside standard el calor.", "Future time clauses with subjunctive: cuando afloje el calor.", "Hope and polite planning with a ver si and si te parece."],
      speakingPrompts: ["React to extreme heat and describe your energy.", "Find shade, a breeze, and a cold drink.", "Explain why walking in direct sun is a bad idea.", "Postpone the walk and arrange a cooler evening meeting."],
    },
    completionTask: { title: "Rebuild a summer plan", instructions: "Record a 75-second voice message. React to the heat, describe how it affects you, suggest shade and cold water, postpone the walk, and arrange a terrace meeting once the temperature drops." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una tarde de verano, «¡vaya tela de calor!» expresa sorpresa y frustración. En algunas zonas de Andalucía también se oye «con la calor que hace», con el uso regional femenino de «la calor». Si el exterior resulta insoportable, «no hay quien pare fuera» presenta la situación como prácticamente imposible.", translation: "The reading opens with strong reactions to Andalusian summer heat and regional la calor.", highlights: highlights(["¡Vaya tela de calor!", "Con la calor que hace...", "La calor", "No hay quien pare fuera"]), shadowLine: "¡Vaya tela de calor! Con la calor que hace, no hay quien pare fuera." },
  { id: "p2", text: "«A estas horas pega el sol» advierte que la radiación es especialmente fuerte en ese momento. Tras caminar, alguien puede decir «estoy hecho polvo» o «me ha dejado sin fuerzas». Una mujer diría «estoy hecha polvo», porque la forma concuerda con quien habla.", translation: "The sun's intensity leads to natural expressions of exhaustion and gender agreement.", highlights: highlights(["A estas horas pega el sol", "Estoy hecho polvo", "Me ha dejado sin fuerzas", "Sin fuerzas"]), shadowLine: "A estas horas pega el sol. Estoy hecho polvo." },
  { id: "p3", text: "La primera solución es «vamos a buscar una sombrita». El diminutivo no indica necesariamente un espacio pequeño; añade cercanía y comodidad. Si el lugar funciona, «aquí corre un poquito de aire» describe una brisa ligera, y «¿nos sentamos un ratillo?» propone una pausa breve.", translation: "Shade, moving air, and a short sit-down provide immediate relief.", highlights: highlights(["Vamos a buscar una sombrita", "Sombrita", "Aquí corre un poquito de aire", "¿Nos sentamos un ratillo?", "Un ratillo"]), shadowLine: "Vamos a buscar una sombrita. Aquí corre un poquito de aire." },
  { id: "p4", text: "El calor también cambia lo que apetece beber. «Me apetece algo fresquito» expresa un deseo inmediato. «¿Pillamos agua bien fría?» convierte ese deseo en un plan compartido. En el bar, «¿me pones un vaso con hielo?» es una petición directa y natural.", translation: "The group turns a desire for something cold into a shared plan and café request.", highlights: highlights(["Me apetece algo fresquito", "Fresquito", "¿Pillamos agua bien fría?", "¿Me pones un vaso con hielo?", "Vaso con hielo"]), shadowLine: "Me apetece algo fresquito. ¿Pillamos agua bien fría?" },
  { id: "p5", text: "«Estoy sudando la gota gorda» significa sudar muchísimo. Si además hay humedad, «hace un bochorno tremendo» describe un calor pesado y opresivo. Por eso «mejor no andar a pleno sol» recomienda evitar la exposición directa durante las horas más duras.", translation: "Heavy sweating and muggy heat justify avoiding direct sunlight.", highlights: highlights(["Estoy sudando la gota gorda", "La gota gorda", "Hace un bochorno tremendo", "Bochorno", "Mejor no andar a pleno sol", "A pleno sol"]), shadowLine: "Hace un bochorno tremendo. Mejor no andar a pleno sol." },
  { id: "p6", text: "No hace falta cancelar todo el día. «Vamos a tomárnoslo con calma» reduce el ritmo. «Dejamos el paseo para luego» aplaza la actividad, y «cuando afloje el calor» señala el momento futuro adecuado. «Afloje» aparece en subjuntivo porque esa bajada todavía no ha ocurrido.", translation: "The plan slows down and moves the walk to the uncertain future moment when the heat eases.", highlights: highlights(["Vamos a tomárnoslo con calma", "Dejamos el paseo para luego", "Paseo", "Cuando afloje el calor", "Aflojar el calor"]), shadowLine: "Dejamos el paseo para luego, cuando afloje el calor." },
  { id: "p7", text: "«¿Quedamos a última hora de la tarde?» evita las horas centrales. «A ver si refresca» expresa la esperanza de que baje la temperatura. La propuesta «si te parece, nos vemos en la terraza» confirma lugar y plan sin imponerlos, y permite buscar una mesa donde corra aire.", translation: "A later meeting time, hope for cooler weather, and a breezy terrace create a flexible plan.", highlights: highlights(["¿Quedamos a última hora de la tarde?", "A última hora de la tarde", "A ver si refresca", "Refrescar", "Si te parece, nos vemos en la terraza", "Donde corra un poquito de aire"]), shadowLine: "A ver si refresca. Si te parece, nos vemos en la terraza." },
  { id: "p8", text: "Por último, «ya saldremos con la fresca» resume una costumbre lógica de los lugares calurosos: descansar durante las horas más intensas y volver a la calle cuando baja el sol. «Con la fresca» no fija una hora exacta; identifica la parte agradable y más fresca del día.", translation: "Going out con la fresca reflects adapting daily life to the cooler evening period.", highlights: highlights(["Ya saldremos con la fresca", "Salimos con la fresca", "Con la fresca"]), shadowLine: "Ya saldremos con la fresca." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "heat-reading-q1", type: "multiple-choice", prompt: "What regional feature appears in “la calor”?", options: ["Feminine gender for calor", "A future tense", "A plural command", "A diminutive"], correctAnswer: "Feminine gender for calor", explanation: "It is a regional informal usage heard in parts of Andalusia.", points: 1, skillTag: "regional-usage" },
  { id: "heat-reading-q2", type: "multiple-choice", prompt: "What is “bochorno”?", options: ["Oppressive, often muggy heat", "A light winter breeze", "A cold drink", "A shaded bench"], correctAnswer: "Oppressive, often muggy heat", explanation: "It is more specific than general calor.", points: 1, skillTag: "weather" },
  { id: "heat-reading-q3", type: "true-false", prompt: "True or false: “cuando afloje el calor” uses the subjunctive because the future easing has not happened yet.", options: ["True", "False"], correctAnswer: "True", explanation: "The time clause refers to a pending future event.", points: 1, skillTag: "grammar" },
  { id: "heat-reading-q4", type: "order-words", prompt: "Order the suggestion to take things slowly.", nativePrompt: "Let's take it easy.", wordBank: ["Vamos", "a", "tomárnoslo", "con", "calma."], correctAnswer: "Vamos a tomárnoslo con calma.", explanation: "The pronouns are attached to the infinitive tomárnoslo.", points: 2, skillTag: "suggestion" },
  { id: "heat-reading-q5", type: "multiple-choice", prompt: "What does “salir con la fresca” mean?", options: ["Go out during the cooler part of the day", "Carry fresh food outside", "Leave before sunrise only", "Go out in winter"], correctAnswer: "Go out during the cooler part of the day", explanation: "It usually refers to going out once summer temperatures have fallen.", points: 1, skillTag: "culture" },
];

export const andalusianSpanishB1HeatSummerPlansReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Salir con la Fresca", subtitle: "A synced Spanish reading about la calor, bochorno, shade, cold drinks, exhaustion, future time clauses, postponing plans, and going out during the cooler evening.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "summer", "culture"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: heatVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1HeatSummerPlansQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Heat and Summer Plans", subtitle: "Test reactions to heat, physical effects, shade, cold drinks, safer timing, postponement, evening arrangements, and Andalusian summer expressions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "summer", "plans"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for reacting to summer heat and adapting plans safely.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "heat-quiz-q1", type: "multiple-choice", prompt: "Which exclamation strongly reacts to unbearable heat?", options: ["¡Vaya tela de calor!", "A ver si refresca", "Un ratillo", "Vaso con hielo"], correctAnswer: "¡Vaya tela de calor!", explanation: "Vaya tela intensifies surprise or frustration.", points: 1, skillTag: "reaction" },
      { id: "heat-quiz-q2", type: "true-false", prompt: "True or false: “la calor” is a regional feminine usage heard in parts of Andalusia.", options: ["True", "False"], correctAnswer: "True", explanation: "Standard Spanish generally uses el calor, but regional la calor adds local flavour.", points: 1, skillTag: "regional-usage" },
      { id: "heat-quiz-q3", type: "multiple-choice", prompt: "What does “estoy hecho polvo” mean?", options: ["I'm absolutely exhausted", "I'm pleasantly cool", "I'm in the shade", "I'm ready to run"], correctAnswer: "I'm absolutely exhausted", explanation: "The expression describes severe tiredness.", points: 1, skillTag: "condition" },
      { id: "heat-quiz-q4", type: "order-words", prompt: "Order the suggestion to find shade.", nativePrompt: "Let's find a little shade.", wordBank: ["Vamos", "a", "buscar", "una", "sombrita."], correctAnswer: "Vamos a buscar una sombrita.", explanation: "Sombrita makes the suggestion warm and informal.", points: 2, skillTag: "comfort" },
      { id: "heat-quiz-q5", type: "multiple-choice", prompt: "Which phrase means you are sweating heavily?", options: ["Estoy sudando la gota gorda", "Aquí corre un poco de aire", "Me apetece algo fresquito", "A ver si refresca"], correctAnswer: "Estoy sudando la gota gorda", explanation: "Sudar la gota gorda is the idiom for sweating buckets.", points: 1, skillTag: "idiom" },
      { id: "heat-quiz-q6", type: "multiple-choice", prompt: "Which condition does “bochorno” describe?", options: ["Oppressive muggy heat", "Dry winter cold", "Light rain", "Fresh evening air"], correctAnswer: "Oppressive muggy heat", explanation: "Bochorno is heavy, uncomfortable heat, often with humidity.", points: 1, skillTag: "weather" },
      { id: "heat-quiz-q7", type: "true-false", prompt: "True or false: “dejamos el paseo para luego” postpones the walk rather than cancelling it.", options: ["True", "False"], correctAnswer: "True", explanation: "Para luego keeps the plan for later.", points: 1, skillTag: "planning" },
      { id: "heat-quiz-q8", type: "order-words", prompt: "Order the future heat condition.", nativePrompt: "When the heat lets up.", wordBank: ["Cuando", "afloje", "el", "calor."], correctAnswer: "Cuando afloje el calor.", explanation: "Afloje is subjunctive because the future event is pending.", points: 2, skillTag: "grammar" },
      { id: "heat-quiz-q9", type: "multiple-choice", prompt: "How do you politely confirm a terrace plan?", options: ["Si te parece, nos vemos en la terraza", "No hay quien pare fuera", "Estoy hecho polvo", "A pleno sol"], correctAnswer: "Si te parece, nos vemos en la terraza", explanation: "Si te parece checks that the plan suits the other person.", points: 1, skillTag: "arrangement" },
      { id: "heat-quiz-q10", type: "multiple-choice", prompt: "What does “a ver si refresca” express?", options: ["Hope that it cools down", "Certainty that it is freezing", "A request for ice", "A cancelled plan"], correctAnswer: "Hope that it cools down", explanation: "A ver si expresses a hopeful possibility.", points: 1, skillTag: "hope" },
      { id: "heat-quiz-q11", type: "multiple-choice", prompt: "When do people go out “con la fresca”?", options: ["During the cooler part of the day", "At the hottest midday hour", "Only during winter", "Before any daylight"], correctAnswer: "During the cooler part of the day", explanation: "The phrase reflects adapting plans to summer temperatures.", points: 1, skillTag: "culture" },
      { id: "heat-quiz-q12", type: "match-pairs", prompt: "Match each heat phrase to its meaning.", pairs: [{ left: "Sombrita", right: "A little patch of shade" }, { left: "Bochorno", right: "Oppressive muggy heat" }, { left: "Fresquito", right: "Pleasantly cool" }], explanation: "These terms describe three important summer conditions.", points: 3, skillTag: "vocabulary" },
      { id: "heat-quiz-q13", type: "match-pairs", prompt: "Match each phrase to its function.", pairs: [{ left: "Vamos a tomárnoslo con calma", right: "Slow the pace" }, { left: "Dejamos el paseo para luego", right: "Postpone the activity" }, { left: "Ya saldremos con la fresca", right: "Move the plan to cooler hours" }], explanation: "The phrases adapt the day's rhythm safely and naturally.", points: 3, skillTag: "functions" },
    ],
  },
};
