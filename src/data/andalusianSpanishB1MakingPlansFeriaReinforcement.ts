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

const courseId = "andalusian-spanish-b1-making-plans-feria";
const sectionName = "Andalusian Spanish - B1 Making Plans for Feria";

const feriaVocab: VocabItem[] = [
  { id: "vienes-feria", term: "¿Te vienes a la feria?", meaning: "You coming to the fair?", note: "A natural informal invitation using venir with tú.", example: "¿Te vienes a la feria con nosotros esta tarde?", translation: "Are you coming to the fair with us this afternoon?" },
  { id: "me-apunto", term: "Yo me apunto", meaning: "I'm in! / Count me in", note: "An enthusiastic way to accept a plan.", example: "Si vais al Real, yo me apunto.", translation: "If you're going to the fairground, count me in." },
  { id: "hora-quedamos", term: "¿A qué hora quedamos?", meaning: "What time are we meeting?", note: "Quedar is the everyday verb for arranging to meet.", example: "Perfecto, ¿a qué hora quedamos mañana?", translation: "Perfect, what time are we meeting tomorrow?" },
  { id: "junto-portada", term: "Quedamos junto a la portada", meaning: "Let's meet by the main entrance arch", note: "La portada is the large decorated entrance to the Feria de Sevilla.", example: "Quedamos junto a la portada a las ocho.", translation: "Let's meet by the entrance arch at eight." },
  { id: "mando-ubicacion", term: "Te mando la ubicación", meaning: "I'll send you my location", note: "Useful when the fairground is crowded and landmarks are not enough.", example: "Si no me ves, te mando la ubicación.", translation: "If you can't see me, I'll send you my location." },
  { id: "tirando-real", term: "Voy tirando para el Real", meaning: "I'm heading over to the fairground", note: "Ir tirando sounds relaxed and means setting off or gradually heading somewhere.", example: "Ya estoy listo; voy tirando para el Real.", translation: "I'm ready now; I'm heading to the fairground." },
  { id: "vueltecita", term: "Damos una vueltecita", meaning: "Let's have a little wander around", note: "The diminutive makes the suggestion relaxed and social.", example: "Primero damos una vueltecita por el Real.", translation: "First we'll have a little wander around the fairground." },
  { id: "hasta-arriba", term: "Se pone hasta arriba", meaning: "It gets absolutely packed", note: "A vivid informal way to describe a place becoming completely full.", example: "Después de las diez, esto se pone hasta arriba.", translation: "After ten, this place gets absolutely packed." },
  { id: "avisa-llegues", term: "Avísame cuando llegues", meaning: "Give me a shout when you arrive", note: "A practical request when meeting in a busy place.", example: "Avísame cuando llegues a la portada.", translation: "Let me know when you reach the entrance arch." },
  { id: "vas-flamenca", term: "¿Vas de flamenca?", meaning: "Are you wearing a flamenco dress?", note: "Ir de flamenca means attending dressed in traditional Feria clothing.", example: "¿Este año vas de flamenca o con ropa cómoda?", translation: "Are you wearing a flamenco dress this year or comfortable clothes?" },
  { id: "ropa-comoda", term: "Yo voy con ropa cómoda", meaning: "I'm going in something comfortable", note: "A practical contrast to traditional Feria clothing.", example: "Yo voy con ropa cómoda porque vamos a andar mucho.", translation: "I'm wearing comfortable clothes because we're going to walk a lot." },
  { id: "zapatos-comodos", term: "Ponte zapatos cómodos", meaning: "Make sure you wear comfy shoes", note: "The affirmative tú command ponte gives friendly advice.", example: "Ponte zapatos cómodos, que el Real es enorme.", translation: "Wear comfortable shoes because the fairground is huge." },
  { id: "calor-no-veas", term: "Hace un calor que no veas", meaning: "It's absolutely roasting!", note: "Que no veas is an expressive intensifier common in Andalusian conversation.", example: "A esta hora hace un calor que no veas.", translation: "At this time it's unbelievably hot." },
  { id: "bailamos-sevillanas", term: "¿Bailamos unas sevillanas?", meaning: "Shall we dance some sevillanas?", note: "A natural social invitation inside a caseta.", example: "Cuando empiece la música, ¿bailamos unas sevillanas?", translation: "When the music starts, shall we dance some sevillanas?" },
  { id: "lio-pasos", term: "Me hago un lío con los pasos", meaning: "I always get the dance steps mixed up", note: "Hacerse un lío means becoming confused or muddled.", example: "Yo quiero bailar, pero me hago un lío con los pasos.", translation: "I want to dance, but I get the steps mixed up." },
  { id: "no-cortes", term: "No te cortes", meaning: "Don't be shy! / Don't hold back", note: "An informal encouragement to relax and join in.", example: "No te cortes; aquí baila todo el mundo.", translation: "Don't be shy; everyone dances here." },
  { id: "caseta-publica-question", term: "¿Esa caseta es pública?", meaning: "Is that fair tent open to everyone?", note: "Some Feria casetas are private, so this is a practical question.", example: "Antes de entrar, pregunta: ¿esa caseta es pública?", translation: "Before going in, ask whether that fair tent is public." },
  { id: "pillamos-comer", term: "¿Pillamos algo de comer?", meaning: "Shall we grab something to eat?", note: "Pillar is informal Spain Spanish for getting or grabbing something.", example: "Antes de bailar, ¿pillamos algo de comer?", translation: "Before dancing, shall we grab something to eat?" },
  { id: "apetece-pescaito", term: "Me apetece pescaíto frito", meaning: "I fancy some fried fish", note: "Pescaíto reflects a characteristic southern pronunciation and spelling.", example: "Con este ambiente, me apetece pescaíto frito.", translation: "With this atmosphere, I fancy some fried fish." },
  { id: "montadito-order", term: "Ponme un montadito, porfa", meaning: "Get me a little sandwich, please", note: "A direct but ordinary friendly food order.", example: "Ponme un montadito de pringá, porfa.", translation: "Get me a little pringá sandwich, please." },
  { id: "ratito-mas", term: "Nos quedamos un ratito más", meaning: "Let's stay a little longer", note: "Ratito softens the extension and makes it feel small.", example: "La música está genial; nos quedamos un ratito más.", translation: "The music is great; let's stay a little longer." },
  { id: "manana-madrugo", term: "Mañana madrugo", meaning: "I've gotta be up early tomorrow", note: "A concise reason for limiting a late-night plan.", example: "Me encantaría quedarme, pero mañana madrugo.", translation: "I'd love to stay, but I have to get up early tomorrow." },
  { id: "ambientazo", term: "¡Qué ambientazo!", meaning: "What an amazing atmosphere! / This place is buzzing!", note: "The suffix -azo intensifies ambiente enthusiastically.", example: "¡Qué ambientazo hay esta noche en el Real!", translation: "What an amazing atmosphere there is at the fairground tonight!" },
  { id: "esto-hasta-arriba", term: "Que esto se pone hasta arriba", meaning: "Because this place gets absolutely rammed", note: "Que introduces an informal explanation or warning.", example: "Vamos temprano, que esto se pone hasta arriba.", translation: "Let's go early because this place gets absolutely packed." },
  { id: "entramos-caseta", term: "¿Entramos en esa caseta?", meaning: "Shall we go into that fair tent?", note: "A spontaneous suggestion while walking around the Real.", example: "Hay música dentro; ¿entramos en esa caseta?", translation: "There's music inside; shall we go into that fair tent?" },
  { id: "venga", term: "Venga", meaning: "Come on then / Alright, let's do it", note: "Highly flexible encouragement or acceptance in Spain.", example: "Venga, damos una vueltecita primero.", translation: "Alright, let's have a little wander first." },
  { id: "miramos-publica", term: "Primero miramos si es pública", meaning: "Let's check if it's open to everyone first", note: "A sensible Feria step because many casetas require an invitation.", example: "Primero miramos si es pública y después entramos.", translation: "First we'll check if it's public and then we'll go in." },
  { id: "despues-sevillanas", term: "Después, unas sevillanas, ¿no?", meaning: "Then a bit of sevillanas dancing, yeah?", note: "The tag ¿no? seeks easy agreement with the plan.", example: "Comemos algo y después, unas sevillanas, ¿no?", translation: "We'll eat something and then dance some sevillanas, yeah?" },
  { id: "antes-bailar", term: "Antes de bailar", meaning: "Before dancing", note: "A useful sequencing chunk followed by an infinitive.", example: "Antes de bailar, vamos a beber agua.", translation: "Before dancing, let's drink some water." },
  { id: "vemos-alli", term: "Nos vemos allí", meaning: "See you there", note: "A compact way to confirm the meeting place.", example: "A las ocho junto a la portada; nos vemos allí.", translation: "At eight by the entrance arch; see you there." },
  { id: "un-ratito-mas", term: "Un ratito más", meaning: "A little while longer", note: "A compact response when negotiating how long to stay.", example: "Vale, un ratito más y luego nos vamos.", translation: "Okay, a little while longer and then we'll go." },
  { id: "porfa", term: "Porfa", meaning: "Please", note: "Casual shortening of por favor.", example: "Te mando la ubicación; avísame, porfa.", translation: "I'll send my location; let me know, please." },
  { id: "feria", term: "La feria", meaning: "Local festival or fair", note: "Here it refers to the Andalusian fair tradition, especially Seville's Feria.", example: "La feria reúne casetas, música, comida y baile.", translation: "The fair brings together tents, music, food, and dancing." },
  { id: "real", term: "El Real", meaning: "The designated fairground", note: "In Feria context, El Real is the main fairground area.", example: "El Real se llena por la noche.", translation: "The fairground fills up at night." },
  { id: "portada", term: "La portada", meaning: "Large decorative entrance arch", note: "A major landmark and common meeting point at the Feria de Sevilla.", example: "Cada año cambia el diseño de la portada.", translation: "The design of the entrance arch changes every year." },
  { id: "caseta", term: "Una caseta", meaning: "Fair tent or pavilion with food, drink, and music", note: "Casetas are central social spaces at the Feria.", example: "Dentro de la caseta hay música y comida.", translation: "Inside the fair tent there is music and food." },
  { id: "caseta-publica", term: "Caseta pública", meaning: "Fair tent open to the general public", note: "Unlike a private caseta, it does not require a member invitation.", example: "Buscamos una caseta pública para entrar todos.", translation: "We're looking for a public tent so everyone can enter." },
  { id: "de-flamenca", term: "De flamenca", meaning: "Dressed in traditional flamenco-style clothing", note: "Usually describes traditional dress worn by women at Feria.", example: "Ella va de flamenca el sábado.", translation: "She's wearing a flamenco dress on Saturday." },
  { id: "sevillanas", term: "Sevillanas", meaning: "Traditional Andalusian song and dance style", note: "Closely associated with Feria celebrations.", example: "Están tocando sevillanas dentro de la caseta.", translation: "They're playing sevillanas inside the tent." },
  { id: "pescaito", term: "Pescaíto frito", meaning: "Andalusian-style fried fish", note: "A well-known local food, with pescaíto reflecting southern speech.", example: "Compartimos una ración de pescaíto frito.", translation: "We shared a portion of fried fish." },
  { id: "montadito", term: "Montadito", meaning: "Small filled sandwich or bread roll", note: "A practical snack sold in bars and casetas.", example: "Un montadito es fácil de comer de pie.", translation: "A small sandwich is easy to eat while standing." },
  { id: "ambientazo-noun", term: "Ambientazo", meaning: "Brilliant, lively atmosphere", note: "An emphatic colloquial noun built from ambiente.", example: "Hay un ambientazo en esa caseta.", translation: "That tent has an amazing atmosphere." },
];

const highlightMap = Object.fromEntries(feriaVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = feriaVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1MakingPlansFeriaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Making Plans for Feria Flashcards", subtitle: "Plan a Feria outing using natural language for meeting at the portada, navigating the Real, choosing clothes, entering casetas, dancing, eating, and deciding when to leave.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "Seville", "Feria", "plans"], estimatedMinutes: 23,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: feriaVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1MakingPlansFeriaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Una Noche en la Feria", subtitle: "Build a complete Feria plan from the first invitation to the final decision about staying a little longer.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "feria"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Invite a friend to Feria, arrange a meeting at the portada, discuss clothing and heat, navigate a crowded Real, find a public caseta, dance sevillanas, order local food, and agree how long to stay.",
    stages: [
      stage("stage-1", "Invite and accept", sentenceVocab.slice(0, 3), sentenceVocab.slice(22, 27), "Are you coming to the fair? I'm in. What time are we meeting?", "¿Te vienes a la feria? Yo me apunto. ¿A qué hora quedamos?", "The invitation, enthusiastic acceptance, and time question form a natural opening sequence.", breakdown([["are you coming to the fair?", "¿Te vienes a la feria?"], ["I'm in", "Yo me apunto"], ["what time are we meeting?", "¿A qué hora quedamos?"]])),
      stage("stage-2", "Fix the meeting point", sentenceVocab.slice(3, 6), sentenceVocab.slice(33, 36), "Let's meet by the entrance arch. I'll send my location. Let me know when you arrive.", "Quedamos junto a la portada. Te mando la ubicación. Avísame cuando llegues.", "La portada is a clear Feria landmark, while location sharing helps once it becomes crowded.", breakdown([["let's meet", "Quedamos"], ["by the entrance arch", "junto a la portada"], ["I'll send you my location", "Te mando la ubicación"], ["let me know when you arrive", "Avísame cuando llegues"]])),
      stage("stage-3", "Choose what to wear", sentenceVocab.slice(9, 13), sentenceVocab.slice(37, 39), "Are you wearing a flamenco dress? I'm going in comfortable clothes. Wear comfortable shoes because it's unbelievably hot.", "¿Vas de flamenca? Yo voy con ropa cómoda. Ponte zapatos cómodos, que hace un calor que no veas.", "The advice uses ponte, and que no veas strongly intensifies the heat.", breakdown([["are you wearing a flamenco dress?", "¿Vas de flamenca?"], ["I'm wearing comfortable clothes", "Yo voy con ropa cómoda"], ["wear comfortable shoes", "Ponte zapatos cómodos"], ["it's unbelievably hot", "hace un calor que no veas"]])),
      stage("stage-4", "Head into the Real", sentenceVocab.slice(5, 9), sentenceVocab.slice(33, 35), "I'm heading to the fairground. We'll have a little wander, but let's go early because it gets absolutely packed.", "Voy tirando para el Real. Damos una vueltecita, pero vamos temprano, que esto se pone hasta arriba.", "Ir tirando makes the departure relaxed, while hasta arriba warns about the crowd.", breakdown([["I'm heading", "Voy tirando"], ["to the fairground", "para el Real"], ["we'll have a little wander", "Damos una vueltecita"], ["it gets absolutely packed", "esto se pone hasta arriba"]])),
      stage("stage-5", "Find a public caseta", sentenceVocab.slice(16, 18), sentenceVocab.slice(24, 28), "Shall we enter that tent? First let's check whether it's public.", "¿Entramos en esa caseta? Primero miramos si es pública.", "This avoids assuming every caseta is open to the general public.", breakdown([["shall we enter", "¿Entramos"], ["that tent", "en esa caseta?"], ["first we check", "Primero miramos"], ["whether it's public", "si es pública"]])),
      stage("stage-6", "Join the dancing", sentenceVocab.slice(13, 16), sentenceVocab.slice(27, 30), "Then some sevillanas, yeah? I get the steps mixed up. Don't be shy.", "Después, unas sevillanas, ¿no? Me hago un lío con los pasos. No te cortes.", "No te cortes reassures a friend who feels self-conscious about dancing.", breakdown([["then some sevillanas, yeah?", "Después, unas sevillanas, ¿no?"], ["I get confused", "Me hago un lío"], ["with the steps", "con los pasos"], ["don't be shy", "No te cortes"]])),
      stage("stage-7", "Get Feria food", sentenceVocab.slice(17, 20), sentenceVocab.slice(39, 42), "Before dancing, shall we grab something to eat? I fancy fried fish. Get me a little sandwich, please.", "Antes de bailar, ¿pillamos algo de comer? Me apetece pescaíto frito. Ponme un montadito, porfa.", "Pillar and apetecer keep the food plan informal and spontaneous.", breakdown([["before dancing", "Antes de bailar"], ["shall we grab something to eat?", "¿Pillamos algo de comer?"], ["I fancy fried fish", "Me apetece pescaíto frito"], ["get me a little sandwich, please", "Ponme un montadito, porfa"]])),
      stage("stage-8", "Negotiate leaving", sentenceVocab.slice(20, 22), sentenceVocab.slice(29, 32), "What an atmosphere! Let's stay a little longer, although I have to get up early tomorrow.", "¡Qué ambientazo! Nos quedamos un ratito más, aunque mañana madrugo.", "Ratito makes the extension feel limited, while mañana madrugo explains the boundary.", breakdown([["what an atmosphere!", "¡Qué ambientazo!"], ["let's stay", "Nos quedamos"], ["a little longer", "un ratito más"], ["although tomorrow I get up early", "aunque mañana madrugo"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "feria-story-q1", type: "multiple-choice", prompt: "What plan has Álvaro accepted?", options: ["Going to Feria with Inés", "Going to the beach", "Working late", "Visiting a museum"], correctAnswer: "Going to Feria with Inés", explanation: "He says “Yo me apunto” after the Feria invitation.", points: 1, skillTag: "invitation" },
  { id: "feria-story-q2", type: "multiple-choice", prompt: "Where and when will they meet?", options: ["At eight by the portada", "At nine inside a private caseta", "At seven at the station", "At midnight by the river"], correctAnswer: "At eight by the portada", explanation: "They choose the entrance arch as their meeting point at eight.", points: 1, skillTag: "meeting" },
  { id: "feria-story-q3", type: "true-false", prompt: "True or false: Inés is going dressed as a flamenca, while Álvaro chooses comfortable clothes.", options: ["True", "False"], correctAnswer: "True", explanation: "Their clothing choices are stated before this checkpoint.", points: 1, skillTag: "clothing" },
  { id: "feria-story-q4", type: "multiple-choice", prompt: "What does Álvaro do after setting off for the Real?", options: ["He sends his location", "He goes home", "He buys food immediately", "He changes the meeting time"], correctAnswer: "He sends his location", explanation: "He is heading over and shares his location to help them meet.", points: 1, skillTag: "location" },
  { id: "feria-story-q5", type: "multiple-choice", prompt: "Why are they glad they arrived early?", options: ["The Real is already filling up and later gets packed", "The fair is closing", "It is raining", "They have work there"], correctAnswer: "The Real is already filling up and later gets packed", explanation: "They comment on the crowd and the huge atmosphere.", points: 1, skillTag: "crowds" },
  { id: "feria-story-q6", type: "true-false", prompt: "True or false: They confirm the caseta is public before entering.", options: ["True", "False"], correctAnswer: "True", explanation: "They check access rather than assuming everyone can enter.", points: 1, skillTag: "caseta" },
  { id: "feria-story-q7", type: "multiple-choice", prompt: "Why does Álvaro hesitate about dancing?", options: ["He gets confused by the steps", "He dislikes the music", "His shoes are broken", "The caseta is empty"], correctAnswer: "He gets confused by the steps", explanation: "He says “Me hago un lío con los pasos.”", points: 1, skillTag: "dancing" },
  { id: "feria-story-q8", type: "multiple-choice", prompt: "What food do they decide to get?", options: ["Fried fish and a montadito", "Pizza and chips", "Only dessert", "Nothing"], correctAnswer: "Fried fish and a montadito", explanation: "Inés fancies pescaíto frito and Álvaro orders a montadito.", points: 1, skillTag: "food" },
  { id: "feria-story-q9", type: "multiple-choice", prompt: "Why can Álvaro not stay extremely late?", options: ["He has to get up early tomorrow", "He has lost his phone", "The caseta is private", "He is waiting for a taxi"], correctAnswer: "He has to get up early tomorrow", explanation: "He says “Mañana madrugo.”", points: 1, skillTag: "leaving" },
  { id: "feria-story-q10", type: "multiple-choice", prompt: "What final compromise do they make?", options: ["One more little wander and then they leave", "They stay until morning", "They leave without dancing", "They change to another city"], correctAnswer: "One more little wander and then they leave", explanation: "They agree on a limited final walk before heading home.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1MakingPlansFeriaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: ¿Dónde Estáis en el Real?", subtitle: "Inés and Álvaro arrange their Feria night, find each other in the crowd, check caseta access, dance, eat, and negotiate when to leave.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "Seville", "Feria"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "ines", name: "Inés", initials: "I", side: "right", color: "blue" },
      { id: "alvaro", name: "Álvaro", initials: "Á", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "ines", "Álvaro, ¿te vienes a la feria esta tarde?", "Álvaro, are you coming to the fair this afternoon?", ["¿Te vienes a la feria?", "La feria"]),
      message("m2", "alvaro", "¡Yo me apunto! Llevo toda la semana con ganas.", "I'm in! I've been looking forward to it all week.", ["Yo me apunto"]),
      message("m3", "ines", "Genial. Entonces ya tenemos plan de feria.", "Great. Then we've got our fair plan.", ["La feria"], "voice-note"),
      message("m4", "alvaro", "¿A qué hora quedamos? Quiero llegar antes de que se llene.", "What time are we meeting? I want to arrive before it fills up.", ["¿A qué hora quedamos?"]),
      message("m5", "ines", "A las ocho. Quedamos junto a la portada.", "At eight. Let's meet by the entrance arch.", ["Quedamos junto a la portada", "La portada"]),
      message("m6", "alvaro", "Perfecto, nos vemos allí a las ocho.", "Perfect, see you there at eight.", ["Nos vemos allí"], "voice-note"),
      message("m7", "alvaro", "Una pregunta: ¿vas de flamenca este año?", "One question: are you wearing a flamenco dress this year?", ["¿Vas de flamenca?", "De flamenca"]),
      message("m8", "ines", "Sí, estreno vestido. Pero tú ponte zapatos cómodos.", "Yes, I'm wearing a new dress. But you should wear comfortable shoes.", ["Ponte zapatos cómodos"]),
      message("m9", "alvaro", "Yo voy con ropa cómoda, que vamos a andar una barbaridad.", "I'm going in comfortable clothes because we'll walk loads.", ["Yo voy con ropa cómoda"]),
      message("m10", "alvaro", "Ya he salido. Voy tirando para el Real.", "I've left now. I'm heading over to the fairground.", ["Voy tirando para el Real", "El Real"]),
      message("m11", "ines", "Avísame cuando llegues, porfa. Hay muchísima gente.", "Let me know when you arrive, please. There are loads of people.", ["Avísame cuando llegues", "Porfa"]),
      message("m12", "alvaro", "Estoy cerca. Te mando la ubicación para que me encuentres.", "I'm nearby. I'll send you my location so you can find me.", ["Te mando la ubicación"], "voice-note"),
      message("m13", "ines", "Ya te veo. Menos mal que hemos venido temprano.", "I can see you now. Good thing we came early.", []),
      message("m14", "alvaro", "Sí, que esto se pone hasta arriba dentro de un rato.", "Yes, because this place gets absolutely packed in a little while.", ["Que esto se pone hasta arriba", "Se pone hasta arriba"]),
      message("m15", "ines", "¡Qué ambientazo! Aunque hace un calor que no veas.", "What an atmosphere! Although it's unbelievably hot.", ["¡Qué ambientazo!", "Ambientazo", "Hace un calor que no veas"]),
      message("m16", "alvaro", "Damos una vueltecita y buscamos música.", "Let's have a little wander and look for music.", ["Damos una vueltecita"]),
      message("m17", "ines", "Mira esa de allí. ¿Entramos en esa caseta?", "Look at that one over there. Shall we enter that tent?", ["¿Entramos en esa caseta?", "Una caseta"]),
      message("m18", "alvaro", "Primero miramos si es pública. Sí, pone caseta pública.", "First let's check whether it's public. Yes, it says public tent.", ["Primero miramos si es pública", "Caseta pública", "¿Esa caseta es pública?"], "voice-note"),
      message("m19", "ines", "Venga, entramos. Están tocando sevillanas.", "Come on then, let's go in. They're playing sevillanas.", ["Venga", "Sevillanas"]),
      message("m20", "alvaro", "¿Bailamos unas sevillanas? Aunque me hago un lío con los pasos.", "Shall we dance some sevillanas? Although I get the steps mixed up.", ["¿Bailamos unas sevillanas?", "Me hago un lío con los pasos"]),
      message("m21", "ines", "No te cortes. Yo te sigo y vamos despacio.", "Don't be shy. I'll follow you and we'll go slowly.", ["No te cortes"]),
      message("m22", "alvaro", "Antes de bailar, ¿pillamos algo de comer?", "Before dancing, shall we grab something to eat?", ["Antes de bailar", "¿Pillamos algo de comer?"]),
      message("m23", "ines", "Sí, me apetece pescaíto frito.", "Yes, I fancy some fried fish.", ["Me apetece pescaíto frito", "Pescaíto frito"]),
      message("m24", "alvaro", "Y a mí ponme un montadito, porfa. Después, unas sevillanas, ¿no?", "And get me a little sandwich, please. Then some sevillanas, yeah?", ["Ponme un montadito, porfa", "Montadito", "Después, unas sevillanas, ¿no?"], "voice-note"),
      message("m25", "ines", "La comida estaba buenísima. ¿Nos quedamos un ratito más?", "The food was delicious. Shall we stay a little longer?", ["Nos quedamos un ratito más"]),
      message("m26", "alvaro", "Vale, un ratito más, pero mañana madrugo.", "Okay, a little while longer, but I have to get up early tomorrow.", ["Un ratito más", "Mañana madrugo"]),
      message("m27", "ines", "Trato hecho. Bailamos una y luego empezamos a salir.", "Deal. We'll dance one and then start heading out.", []),
      message("m28", "alvaro", "Al final no me he liado tanto con los pasos.", "In the end I didn't get that confused with the steps.", ["Me hago un lío con los pasos"]),
      message("m29", "ines", "¿Ves? No había que cortarse. Última vueltecita y nos vamos.", "See? There was no need to be shy. One last little wander and we'll go.", ["No te cortes", "Damos una vueltecita"]),
      message("m30", "alvaro", "Venga, una vuelta por el Real y para casa. Ha sido una noche buenísima.", "Alright, one walk around the fairground and then home. It's been a brilliant night.", ["Venga", "El Real"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-feria-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: feriaVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: feriaVocab.map((item) => item.term),
      grammarPatterns: ["Invitations and suggestions with ¿te vienes...?, ¿entramos...? and ¿bailamos...?", "Friendly commands with avísame, ponte and no te cortes.", "Sequencing a social plan with primero, antes de, después and luego."],
      speakingPrompts: ["Invite a friend and arrange to meet at the portada.", "Discuss Feria clothes, shoes, heat, and crowds.", "Check whether a caseta is public and suggest dancing.", "Order local food and negotiate a sensible leaving time."],
    },
    completionTask: { title: "Plan your Feria night", instructions: "Record a 75-second voice message inviting a friend to Feria. Set the time and meeting point, give clothing advice, plan a caseta, food and dancing, then explain when you need to leave." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Organizar una noche en la Feria de Sevilla empieza con una invitación sencilla: “¿te vienes a la feria?”. Si la respuesta es “yo me apunto”, el siguiente paso es concretar “¿a qué hora quedamos?”. Esta combinación permite proponer el plan, aceptarlo con entusiasmo y pasar rápidamente a los detalles.", translation: "Planning a Feria night starts with an invitation, an enthusiastic acceptance, and agreeing on the time.", highlights: highlights(["¿Te vienes a la feria?", "Yo me apunto", "¿A qué hora quedamos?", "La feria"]), shadowLine: "¿Te vienes a la feria? Yo me apunto. ¿A qué hora quedamos?" },
  { id: "p2", text: "En un recinto tan grande, elegir un punto reconocible evita confusiones. “Quedamos junto a la portada” usa la gran entrada decorativa como referencia. Cuando el lugar empieza a llenarse, “te mando la ubicación” y “avísame cuando llegues” ayudan a encontrarse entre la gente. Después basta cerrar con “nos vemos allí”.", translation: "The entrance arch is a useful landmark, supported by location sharing and an arrival message.", highlights: highlights(["Quedamos junto a la portada", "La portada", "Te mando la ubicación", "Avísame cuando llegues", "Nos vemos allí"]), shadowLine: "Quedamos junto a la portada. Avísame cuando llegues." },
  { id: "p3", text: "La ropa también forma parte del plan. “¿Vas de flamenca?” pregunta si alguien llevará el traje tradicional. Otra persona puede responder “yo voy con ropa cómoda”. El consejo “ponte zapatos cómodos” resulta práctico porque se camina y se baila durante horas, especialmente cuando “hace un calor que no veas”.", translation: "The clothing discussion contrasts traditional dress with comfortable clothes and practical shoes for heat and walking.", highlights: highlights(["¿Vas de flamenca?", "De flamenca", "Yo voy con ropa cómoda", "Ponte zapatos cómodos", "Hace un calor que no veas"]), shadowLine: "Yo voy con ropa cómoda. Ponte zapatos cómodos." },
  { id: "p4", text: "Decir “voy tirando para el Real” indica que uno ya se dirige con calma hacia “el Real”, el recinto principal. Conviene llegar pronto, “que esto se pone hasta arriba”. Una vez reunido el grupo, “damos una vueltecita” permite mirar las luces, orientarse y sentir el “ambientazo” antes de elegir dónde entrar.", translation: "Heading to the Real early helps avoid the biggest crowds and leaves time for a first walk around.", highlights: highlights(["Voy tirando para el Real", "El Real", "Que esto se pone hasta arriba", "Se pone hasta arriba", "Damos una vueltecita", "Ambientazo"]), shadowLine: "Voy tirando para el Real, que esto se pone hasta arriba." },
  { id: "p5", text: "Las “casetas” reúnen comida, bebida, conversación y música, pero no todas permiten la entrada libre. Por eso, antes de decir “¿entramos en esa caseta?”, conviene preguntar “¿esa caseta es pública?” o decidir “primero miramos si es pública”. Una “caseta pública” está abierta al público general y no exige una invitación privada.", translation: "Because not every tent is open to everyone, checking whether it is public is an important Feria skill.", highlights: highlights(["Una caseta", "¿Entramos en esa caseta?", "¿Esa caseta es pública?", "Primero miramos si es pública", "Caseta pública"]), shadowLine: "¿Entramos en esa caseta? Primero miramos si es pública." },
  { id: "p6", text: "Dentro puede surgir la propuesta “¿bailamos unas sevillanas?”. Quien no domina el baile quizá admita “me hago un lío con los pasos”. La respuesta “no te cortes” no significa cortar algo: anima a perder la vergüenza y participar. Así, las “sevillanas” se convierten en una experiencia social, no en un examen perfecto de baile.", translation: "The dancing language encourages participation even when someone gets confused by the steps.", highlights: highlights(["¿Bailamos unas sevillanas?", "Me hago un lío con los pasos", "No te cortes", "Sevillanas"]), shadowLine: "Me hago un lío con los pasos, pero no me voy a cortar." },
  { id: "p7", text: "La comida ayuda a recuperar fuerzas. “Antes de bailar, ¿pillamos algo de comer?” propone una pausa informal. Una persona puede decir “me apetece pescaíto frito”, mientras otra pide “ponme un montadito, porfa”. Tanto el “pescaíto frito” como el “montadito” encajan en una noche con mucho movimiento.", translation: "Before dancing, the group can grab typical fried fish or a small sandwich.", highlights: highlights(["Antes de bailar", "¿Pillamos algo de comer?", "Me apetece pescaíto frito", "Pescaíto frito", "Ponme un montadito, porfa", "Montadito", "Porfa"]), shadowLine: "Antes de bailar, ¿pillamos algo de comer?" },
  { id: "p8", text: "Al final llega la negociación. “¡Qué ambientazo!” invita a continuar, y “nos quedamos un ratito más” alarga la noche sin prometer horas. Sin embargo, “mañana madrugo” marca un límite razonable. Acordar “un ratito más” permite disfrutar de una última vuelta sin convertir el plan en un problema para el día siguiente.", translation: "The final exchange balances the great atmosphere with the practical need to get up early.", highlights: highlights(["¡Qué ambientazo!", "Nos quedamos un ratito más", "Un ratito más", "Mañana madrugo"]), shadowLine: "Nos quedamos un ratito más, aunque mañana madrugo." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "feria-reading-q1", type: "multiple-choice", prompt: "Why is la portada useful in a Feria plan?", options: ["It is a recognizable meeting landmark", "It is a private tent", "It sells shoes", "It is the final dance"], correctAnswer: "It is a recognizable meeting landmark", explanation: "The decorated entrance arch helps friends find the same place.", points: 1, skillTag: "culture" },
  { id: "feria-reading-q2", type: "true-false", prompt: "True or false: Every caseta at Feria is automatically open to the general public.", options: ["True", "False"], correctAnswer: "False", explanation: "The reading explains why learners should check whether a caseta is public.", points: 1, skillTag: "casetas" },
  { id: "feria-reading-q3", type: "multiple-choice", prompt: "What does “no te cortes” do in the dance situation?", options: ["Encourages someone not to be shy", "Tells someone to stop the music", "Asks someone to leave", "Warns about the heat"], correctAnswer: "Encourages someone not to be shy", explanation: "It reassures the person who feels unsure about the steps.", points: 1, skillTag: "encouragement" },
  { id: "feria-reading-q4", type: "order-words", prompt: "Order the sentence for heading to the fairground.", nativePrompt: "I'm heading over to the fairground.", wordBank: ["Voy", "tirando", "para", "el", "Real."], correctAnswer: "Voy tirando para el Real.", explanation: "Ir tirando conveys a relaxed departure or gradual movement toward a place.", points: 2, skillTag: "movement" },
  { id: "feria-reading-q5", type: "multiple-choice", prompt: "Why does “un ratito más” work as a compromise?", options: ["It extends the night for a limited time", "It cancels the plan", "It changes the meeting point", "It makes the caseta public"], correctAnswer: "It extends the night for a limited time", explanation: "The diminutive presents the extension as small and manageable.", points: 1, skillTag: "planning" },
];

export const andalusianSpanishB1MakingPlansFeriaReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Una Noche en el Real", subtitle: "A synced Spanish reading about arranging a Feria meeting, choosing clothes, navigating crowds, entering public casetas, dancing sevillanas, eating, and leaving sensibly.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "Seville", "Feria"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: feriaVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1MakingPlansFeriaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Making Plans for Feria", subtitle: "Test invitations, meeting arrangements, Feria landmarks, clothing, crowds, casetas, dancing, food, and leaving-time compromises.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "Seville", "Feria"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for arranging and enjoying a Feria night in Seville.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "feria-quiz-q1", type: "multiple-choice", prompt: "Which phrase naturally invites a friend to Feria?", options: ["¿Te vienes a la feria?", "Mañana madrugo", "Se pone hasta arriba", "Me hago un lío"], correctAnswer: "¿Te vienes a la feria?", explanation: "It directly but casually asks whether the friend is coming.", points: 1, skillTag: "invitation" },
      { id: "feria-quiz-q2", type: "multiple-choice", prompt: "How do you enthusiastically accept the plan?", options: ["Yo me apunto", "No te cortes", "Porfa", "Antes de bailar"], correctAnswer: "Yo me apunto", explanation: "Me apunto means count me in.", points: 1, skillTag: "acceptance" },
      { id: "feria-quiz-q3", type: "order-words", prompt: "Order the meeting arrangement.", nativePrompt: "Let's meet by the entrance arch.", wordBank: ["Quedamos", "junto", "a", "la", "portada."], correctAnswer: "Quedamos junto a la portada.", explanation: "La portada is the decorated Feria entrance and a clear landmark.", points: 2, skillTag: "meeting" },
      { id: "feria-quiz-q4", type: "multiple-choice", prompt: "You have already left for the fairground. What sounds relaxed and natural?", options: ["Voy tirando para el Real", "Me apetece pescaíto frito", "¿Vas de flamenca?", "Mañana madrugo"], correctAnswer: "Voy tirando para el Real", explanation: "Ir tirando means heading off or making your way somewhere.", points: 1, skillTag: "movement" },
      { id: "feria-quiz-q5", type: "true-false", prompt: "True or false: “se pone hasta arriba” means a place becomes extremely crowded.", options: ["True", "False"], correctAnswer: "True", explanation: "Hasta arriba describes a completely packed venue.", points: 1, skillTag: "crowds" },
      { id: "feria-quiz-q6", type: "multiple-choice", prompt: "Which question checks whether everyone may enter a tent?", options: ["¿Esa caseta es pública?", "¿A qué hora quedamos?", "¿Vas de flamenca?", "¿Pillamos algo de comer?"], correctAnswer: "¿Esa caseta es pública?", explanation: "Some casetas are private, so public access needs checking.", points: 1, skillTag: "caseta" },
      { id: "feria-quiz-q7", type: "multiple-choice", prompt: "A friend is embarrassed about dancing. What encourages them?", options: ["No te cortes", "Mañana madrugo", "Se pone hasta arriba", "Te mando la ubicación"], correctAnswer: "No te cortes", explanation: "It means don't be shy or hold back.", points: 1, skillTag: "encouragement" },
      { id: "feria-quiz-q8", type: "fill-blank", prompt: "Complete: Me hago un _____ con los pasos.", nativePrompt: "I get the dance steps mixed up.", correctAnswer: "lío", explanation: "Hacerse un lío means to get confused.", points: 1, skillTag: "dance" },
      { id: "feria-quiz-q9", type: "multiple-choice", prompt: "Which suggestion means 'Shall we grab something to eat?'", options: ["¿Pillamos algo de comer?", "¿Bailamos unas sevillanas?", "¿Te vienes a la feria?", "¿A qué hora quedamos?"], correctAnswer: "¿Pillamos algo de comer?", explanation: "Pillar is informal Spain Spanish for getting or grabbing something.", points: 1, skillTag: "food" },
      { id: "feria-quiz-q10", type: "multiple-choice", prompt: "What does “¡Qué ambientazo!” communicate?", options: ["The atmosphere is brilliant", "The venue is empty", "The weather is cold", "The plan is cancelled"], correctAnswer: "The atmosphere is brilliant", explanation: "Ambientazo enthusiastically intensifies ambiente.", points: 1, skillTag: "reaction" },
      { id: "feria-quiz-q11", type: "true-false", prompt: "True or false: “mañana madrugo” gives a practical reason not to stay extremely late.", options: ["True", "False"], correctAnswer: "True", explanation: "It means the speaker must get up early tomorrow.", points: 1, skillTag: "boundary" },
      { id: "feria-quiz-q12", type: "match-pairs", prompt: "Match each Feria term to its meaning.", pairs: [{ left: "El Real", right: "The fairground" }, { left: "La portada", right: "The entrance arch" }, { left: "Caseta pública", right: "A tent open to everyone" }], explanation: "These three terms help learners navigate the physical and social layout of Feria.", points: 3, skillTag: "culture" },
      { id: "feria-quiz-q13", type: "match-pairs", prompt: "Match each social phrase to its function.", pairs: [{ left: "Yo me apunto", right: "Accept enthusiastically" }, { left: "No te cortes", right: "Encourage someone" }, { left: "Nos quedamos un ratito más", right: "Extend the plan briefly" }], explanation: "The phrases accept, reassure, and negotiate the social plan.", points: 3, skillTag: "functions" },
    ],
  },
};
