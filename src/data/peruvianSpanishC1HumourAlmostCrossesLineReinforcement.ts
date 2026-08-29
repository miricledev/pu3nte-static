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

const courseId = "peruvian-spanish-c1-humour-that-almost-crosses-the-line";
const skoolSectionName = "Peruvian Spanish - C1 Humour that Almost Crosses the Line";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const humourVocab: VocabItem[] = [
  { id: "agarrar-de-punto", term: "agarrar de punto a alguien", meaning: "to keep making someone the target of jokes / pick on someone", matchingMeaning: "pick on someone as the joke target", note: "Used when banter becomes repeated targeting.", example: "No lo agarren de punto toda la noche.", translation: "Don’t make him the target of jokes all night.", starred: true },
  { id: "lo-agarraron-de-punto", term: "lo agarraron de punto", meaning: "they made him the butt of the jokes", matchingMeaning: "they made him the butt of the jokes", note: "Past-form chunk for describing what happened.", example: "A Diego lo agarraron de punto desde que llegó.", translation: "They made Diego the butt of the jokes from the moment he arrived.", starred: true },
  { id: "seguirle-la-corriente", term: "seguirle la corriente", meaning: "to play along with someone / go along with the joke", matchingMeaning: "play along with someone", note: "Useful when someone joins the joke instead of resisting it.", example: "Le seguí la corriente para no cortar el ambiente.", translation: "I played along so I wouldn’t kill the vibe.", starred: true },
  { id: "se-te-paso-la-mano", term: "se te pasó la mano", meaning: "you went too far / you overdid it", matchingMeaning: "you went too far", note: "Direct but common way to tell someone they crossed the line.", example: "Con ese comentario sí se te pasó la mano.", translation: "With that comment, you really went too far.", starred: true },
  { id: "se-me-paso-la-mano", term: "se me pasó la mano", meaning: "I went too far", matchingMeaning: "I went too far", note: "Accountability phrase after a joke lands badly.", example: "Creo que se me pasó la mano con la broma.", translation: "I think I went too far with the joke.", starred: true },
  { id: "era-chacota-nomas", term: "era chacota, nomás", meaning: "it was just messing around / only banter", matchingMeaning: "it was just banter", note: "Explains intent, but it does not automatically repair impact.", example: "Era chacota, nomás, pero igual pidió disculpas.", translation: "It was just banter, but he still apologized.", starred: true },
  { id: "chacota", term: "chacota", meaning: "joking around / messing about / playful banter", matchingMeaning: "playful banter", note: "Peruvian informal word for messing around.", example: "La chacota empezó tranquila y luego se puso pesada.", translation: "The banter started calmly and then got heavy.", starred: true },
  { id: "vacilar", term: "vacilar", meaning: "to joke around / tease / have a laugh", matchingMeaning: "joke around", note: "Can be friendly teasing depending on tone.", example: "Una cosa es vacilar entre patas.", translation: "Joking around among friends is one thing.", starred: true },
  { id: "una-cosa-es-vacilar", term: "una cosa es vacilar y otra pasarse", meaning: "joking is one thing; going too far is another", matchingMeaning: "joking is one thing; going too far is another", note: "Boundary-setting phrase when humour has limits.", example: "Una cosa es vacilar y otra pasarse con temas personales.", translation: "Joking is one thing; going too far with personal topics is another.", starred: true },
  { id: "ya-no-da-risa", term: "ya no da risa", meaning: "it’s not funny anymore", matchingMeaning: "it’s not funny anymore", note: "Clear phrase when the joke has expired socially.", example: "Si ya no da risa, mejor párala.", translation: "If it’s not funny anymore, better stop it.", starred: true },
  { id: "picarse", term: "picarse", meaning: "to get annoyed / take teasing personally", matchingMeaning: "take teasing personally", note: "Often used when someone reacts to a joke.", example: "No todos se pican por lo mismo.", translation: "Not everyone gets annoyed by the same thing.", starred: true },
  { id: "se-pico-un-poquito", term: "se picó un poquito", meaning: "they got a little annoyed / took it a bit personally", matchingMeaning: "they got a little annoyed", note: "Soft observation after someone’s face or tone changes.", example: "Creo que se picó un poquito cuando mencionaste su ex.", translation: "I think he got a little annoyed when you mentioned his ex.", starred: true },
  { id: "no-fue-con-mala-intencion", term: "no fue con mala intención", meaning: "it wasn’t meant badly / there was no bad intention", matchingMeaning: "it wasn’t meant badly", note: "Useful repair phrase, but it should be paired with accountability.", example: "No fue con mala intención, pero igual estuvo fuerte.", translation: "It wasn’t meant badly, but it was still intense.", starred: true },
  { id: "bajale-un-cambio", term: "bájale un cambio", meaning: "tone it down / ease up / dial it back", matchingMeaning: "tone it down", note: "Borrowed-sounding but very natural regional boundary phrase.", example: "Bájale un cambio antes de que se incomode.", translation: "Tone it down before they get uncomfortable.", starred: true },
  { id: "mejor-cortala-ahi", term: "mejor córtala ahí", meaning: "better stop it there / cut it out there", matchingMeaning: "better stop it there", note: "Direct instruction to stop before the joke worsens.", example: "Mejor córtala ahí, ya no da risa.", translation: "Better stop it there; it’s not funny anymore.", starred: true },
  { id: "tomarselo-personal", term: "tomárselo personal", meaning: "to take something personally", matchingMeaning: "take it personally", note: "Useful when distinguishing joke from impact.", example: "No quería que se lo tomara personal.", translation: "I didn’t want him to take it personally.", starred: true },
  { id: "te-lo-tomo-personal", term: "te lo tomó personal", meaning: "they took what you said personally", matchingMeaning: "they took it personally", note: "Names how the joke landed for the other person.", example: "Te lo tomó personal porque sonó medio pesado.", translation: "He took it personally because it sounded kind of harsh.", starred: true },
  { id: "se-puso-medio-tensa", term: "se puso medio tensa la cosa", meaning: "things got a bit tense / the situation became awkward", matchingMeaning: "things got a bit tense", note: "C1-level room-reading phrase after humour shifts.", example: "Después del tercer chiste se puso medio tensa la cosa.", translation: "After the third joke, things got a bit tense.", starred: true },
  { id: "no-le-eches-lena", term: "no le eches más leña al fuego", meaning: "don’t add fuel to the fire", matchingMeaning: "don’t add fuel to the fire", note: "Warns someone not to worsen a tense moment.", example: "No le eches más leña al fuego con otro comentario.", translation: "Don’t add fuel to the fire with another comment.", starred: true },
  { id: "mejor-cambia-de-tema", term: "mejor cambia de tema", meaning: "better change the subject", matchingMeaning: "change the subject", note: "Clean redirect when the joke is losing control.", example: "Mejor cambia de tema y deja que respire.", translation: "Better change the subject and let him breathe.", starred: true },
  { id: "hay-bromas-y-bromas", term: "hay bromas y bromas", meaning: "some jokes are one thing and some are another / not all jokes are equal", matchingMeaning: "not all jokes are equal", note: "Nuanced phrase for humour boundaries.", example: "Hay bromas y bromas; esa fue demasiado personal.", translation: "Not all jokes are equal; that one was too personal.", starred: true },
  { id: "tampoco-era-para-tanto", term: "tampoco era para tanto", meaning: "it wasn’t that serious / it wasn’t such a big deal", matchingMeaning: "it wasn’t that serious", note: "Can calm things down, but can also minimize someone’s feelings if misused.", example: "Tampoco era para tanto, pero entiendo que le molestó.", translation: "It wasn’t that serious, but I understand it bothered him.", starred: true },
  { id: "si-ya-viste-que-incomodo", term: "si ya viste que incomodó, déjala ahí", meaning: "if you saw it made them uncomfortable, leave it there", matchingMeaning: "if it made them uncomfortable, leave it there", note: "High-value boundary phrase for repeated jokes.", example: "Si ya viste que incomodó, déjala ahí y ya.", translation: "If you saw it made them uncomfortable, leave it there.", starred: true },
  { id: "toca-medir-el-terreno", term: "toca medir el terreno", meaning: "you need to read the room / test the waters", matchingMeaning: "you need to read the room", note: "Great C1 phrase for social calibration.", example: "Antes de bromear con eso, toca medir el terreno.", translation: "Before joking about that, you need to read the room.", starred: true },
  { id: "medir-el-terreno", term: "medir el terreno", meaning: "to gauge the situation / test the waters", matchingMeaning: "gauge the situation", note: "Useful for checking if humour is welcome.", example: "Hay que medir el terreno antes de soltar sarcasmo.", translation: "You have to gauge the situation before using sarcasm.", starred: true },
  { id: "hacerla-larga", term: "hacerla larga", meaning: "to drag something out / overcomplicate it", matchingMeaning: "drag it out", note: "Used when an apology or explanation becomes too long.", example: "No la hagas larga si vas a disculparte.", translation: "Don’t drag it out if you’re going to apologize.", starred: true },
  { id: "pide-disculpas-sin-hacerla-larga", term: "pide disculpas sin hacerla larga", meaning: "apologize without dragging it out", matchingMeaning: "apologize without dragging it out", note: "Clean repair move after crossing the line.", example: "Pide disculpas sin hacerla larga y cambia de tema.", translation: "Apologize without dragging it out and change the subject.", starred: true },
  { id: "reconoce-que-te-excediste", term: "reconoce que te excediste", meaning: "acknowledge that you overstepped / went too far", matchingMeaning: "acknowledge you overstepped", note: "Direct accountability phrase for mature repair.", example: "Reconoce que te excediste y no lo justifiques tanto.", translation: "Acknowledge that you overstepped and don’t justify it so much.", starred: true },
  { id: "bajale-al-tono", term: "bájale al tono", meaning: "soften your tone / tone it down", matchingMeaning: "soften your tone", note: "Focuses on delivery, not only content.", example: "Bájale al tono, que ya sonó medio agresivo.", translation: "Soften your tone; that already sounded a bit aggressive.", starred: true },
  { id: "sarcasmo-pesado", term: "el sarcasmo se pone pesado", meaning: "the sarcasm starts getting too much / too harsh", matchingMeaning: "the sarcasm gets too harsh", note: "Names the moment sarcasm stops feeling playful.", example: "Con ese tema, el sarcasmo se pone pesado rápido.", translation: "With that topic, sarcasm gets harsh quickly.", starred: true },
  { id: "pasarse", term: "pasarse", meaning: "to cross the line / go too far", matchingMeaning: "cross the line", note: "Core verb for humour that stops being harmless.", example: "Vacilar está bien, pero no hay que pasarse.", translation: "Joking around is fine, but you shouldn’t go too far.", starred: true },
];

const highlightMap = Object.fromEntries(humourVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = humourVocab.map((item) => `${item.term} = ${item.meaning}`);

export const peruvianSpanishC1HumourAlmostCrossesLineFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Peruvian Spanish C1: Humour that Almost Crosses the Line Flashcards",
  subtitle: "Advanced Peruvian phrases for teasing, reading discomfort, backing off, apologizing, and saving the vibe.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "flashcards", "humour", "social boundaries"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: humourVocab.map(cardFromVocab) },
};

export const peruvianSpanishC1HumourAlmostCrossesLineSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Peruvian Humour Boundaries",
  subtitle: "Build nuanced Peruvian Spanish for teasing, noticing tension, stopping a joke, and repairing it well.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["peruvian-spanish", "c1", "sentence-builder", "humour", "boundaries"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 75-second Peruvian Spanish voice note explaining how to tell a friend their joke crossed the line without killing the friendship.",
    stages: [
      stage("stage-1", "When banter targets someone", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "They made him the butt of the jokes, and at first he played along.", "Lo agarraron de punto y al inicio él les siguió la corriente.", "This describes a joke dynamic before it turns uncomfortable.", breakdown([["they made him the butt of the jokes", "lo agarraron de punto"], ["at first", "al inicio"], ["played along", "les siguió la corriente"]])),
      stage("stage-2", "Call the line", sentenceVocab.slice(3, 10), sentenceVocab.slice(0, 10), "You went too far. Joking is one thing; going too far is another.", "Se te pasó la mano. Una cosa es vacilar y otra pasarse.", "A clean boundary without overexplaining.", breakdown([["you went too far", "se te pasó la mano"], ["joking", "vacilar"], ["going too far", "pasarse"]])),
      stage("stage-3", "Intent versus impact", sentenceVocab.slice(5, 13), sentenceVocab.slice(0, 13), "It was just banter, but he got a little annoyed and took it personally.", "Era chacota, nomás, pero se picó un poquito y se lo tomó personal.", "This balances intent with how the other person received it.", breakdown([["just banter", "chacota, nomás"], ["got a little annoyed", "se picó un poquito"], ["took it personally", "se lo tomó personal"]])),
      stage("stage-4", "Stop the escalation", sentenceVocab.slice(13, 20), sentenceVocab.slice(0, 20), "Tone it down; better stop it there and change the subject.", "Bájale un cambio; mejor córtala ahí y cambia de tema.", "This stops the joke before the group atmosphere breaks.", breakdown([["tone it down", "bájale un cambio"], ["stop it there", "córtala ahí"], ["change the subject", "cambia de tema"]])),
      stage("stage-5", "Read the discomfort", sentenceVocab.slice(18, 25), sentenceVocab.slice(0, 25), "Don’t add fuel to the fire. If you saw it made them uncomfortable, leave it there.", "No le eches más leña al fuego. Si ya viste que incomodó, déjala ahí.", "This is the key C1 social-control move.", breakdown([["don’t add fuel to the fire", "no le eches más leña al fuego"], ["if you saw it made them uncomfortable", "si ya viste que incomodó"], ["leave it there", "déjala ahí"]])),
      stage("stage-6", "Gauge before joking", sentenceVocab.slice(21, 25), sentenceVocab.slice(0, 25), "Not all jokes are equal; you need to read the room.", "Hay bromas y bromas; toca medir el terreno.", "This explains why humour depends on topic, relationship, and setting.", breakdown([["not all jokes are equal", "hay bromas y bromas"], ["you need to", "toca"], ["read the room", "medir el terreno"]])),
      stage("stage-7", "Repair without dragging it out", sentenceVocab.slice(25, 31), sentenceVocab, "Apologize without dragging it out and acknowledge that you overstepped.", "Pide disculpas sin hacerla larga y reconoce que te excediste.", "A mature repair phrase after a joke lands badly.", breakdown([["apologize", "pide disculpas"], ["without dragging it out", "sin hacerla larga"], ["acknowledge that you overstepped", "reconoce que te excediste"]])),
      stage("stage-8", "Soften the tone", sentenceVocab.slice(28, 31), sentenceVocab, "Soften your tone, because the sarcasm is getting too harsh.", "Bájale al tono, porque el sarcasmo se está poniendo pesado.", "This focuses on delivery when the words may be technically joking.", breakdown([["soften your tone", "bájale al tono"], ["because", "porque"], ["the sarcasm is getting too harsh", "el sarcasmo se está poniendo pesado"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-humour-story-q1", type: "multiple-choice", prompt: "After message 3, what is Bruno doing?", options: ["Repeating jokes about Nico in the group", "Trying to buy concert tickets", "Asking Ana for directions", "Planning a job interview"], correctAnswer: "Repeating jokes about Nico in the group", explanation: "Ana says he keeps posting clips and turning Nico into the joke.", points: 1, skillTag: "gist" },
  { id: "peruvian-c1-humour-story-q2", type: "multiple-choice", prompt: "After message 6, why is Ana worried?", options: ["The teasing is starting to target Nico too much", "Nico asked for more jokes", "Bruno apologized already", "The party was canceled"], correctAnswer: "The teasing is starting to target Nico too much", explanation: "Ana says lo agarraron de punto and se te pasó la mano.", points: 1, skillTag: "social-boundary" },
  { id: "peruvian-c1-humour-story-q3", type: "true-false", prompt: "After message 9, true or false: Nico played along at first, but the joke stopped being funny.", options: ["True", "False"], correctAnswer: "True", explanation: "He followed the joke at first, but then Ana says ya no da risa.", points: 1, skillTag: "sequence" },
  { id: "peruvian-c1-humour-story-q4", type: "multiple-choice", prompt: "After message 12, what changed in the chat?", options: ["Things got a bit tense", "Everyone ordered food", "Nico invited more people", "Ana started a quiz"], correctAnswer: "Things got a bit tense", explanation: "Ana says se puso medio tensa la cosa.", points: 1, skillTag: "tone-shift" },
  { id: "peruvian-c1-humour-story-q5", type: "multiple-choice", prompt: "After message 15, what does Ana suggest?", options: ["Stop there and change the subject", "Send three more jokes", "Ignore Nico forever", "Blame Nico publicly"], correctAnswer: "Stop there and change the subject", explanation: "She says mejor córtala ahí and mejor cambia de tema.", points: 1, skillTag: "repair" },
  { id: "peruvian-c1-humour-story-q6", type: "multiple-choice", prompt: "After message 18, what does Bruno understand?", options: ["He went too far and should not make the apology too long", "Nico wants a longer joke thread", "Ana dislikes humour completely", "The chat needs more sarcasm"], correctAnswer: "He went too far and should not make the apology too long", explanation: "He says se me pasó la mano and asks whether to apologize without dragging it out.", points: 1, skillTag: "accountability" },
  { id: "peruvian-c1-humour-story-q7", type: "true-false", prompt: "After message 21, true or false: Ana says Bruno should acknowledge he overstepped.", options: ["True", "False"], correctAnswer: "True", explanation: "Ana says reconoce que te excediste.", points: 1, skillTag: "repair" },
  { id: "peruvian-c1-humour-story-q8", type: "multiple-choice", prompt: "After message 24, what boundary does Ana explain?", options: ["Not all jokes are equal, and you need to read the room", "Nico must laugh at every joke", "Sarcasm always works", "Apologies should be dramatic"], correctAnswer: "Not all jokes are equal, and you need to read the room", explanation: "Ana says hay bromas y bromas and toca medir el terreno.", points: 1, skillTag: "nuance" },
  { id: "peruvian-c1-humour-story-q9", type: "multiple-choice", prompt: "After message 27, what will Bruno send?", options: ["A short apology that admits he overstepped", "Another sarcastic clip", "A message blaming Nico", "A voice note about transport"], correctAnswer: "A short apology that admits he overstepped", explanation: "Bruno drafts a short apology: se me pasó la mano.", points: 1, skillTag: "outcome" },
  { id: "peruvian-c1-humour-story-q10", type: "multiple-choice", prompt: "By message 30, what is the final lesson?", options: ["Humour needs calibration, tone control, and repair when it crosses a line", "Never joke with friends", "Always keep joking until everyone laughs", "Ignore tense messages"], correctAnswer: "Humour needs calibration, tone control, and repair when it crosses a line", explanation: "They finish by naming tone, sarcasm, and knowing when to stop.", points: 1, skillTag: "summary" },
];

export const peruvianSpanishC1HumourAlmostCrossesLineWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Peruvian C1 Story: The Joke That Got Heavy",
  subtitle: "Ana helps Bruno repair a group-chat joke before the banter turns into a real problem.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "WhatsApp", "humour", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ana", name: "Ana", initials: "AN", side: "right", color: "violet" },
      { id: "bruno", name: "Bruno", initials: "BR", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "ana", "Bruno, vi el chat del grupo. ¿Sigues con lo de Nico?", "Bruno, I saw the group chat. Are you still doing the Nico thing?", []),
      message("m2", "bruno", "Era chacota, nomás. Él también se ríe.", "It was just banter. He laughs too.", ["era chacota, nomás", "chacota"]),
      message("m3", "ana", "Ya, pero subiste tres stickers y dos audios imitándolo. Ahí ya parece que lo agarraron de punto.", "Sure, but you posted three stickers and two voice notes imitating him. Now it looks like they made him the butt of the jokes.", ["lo agarraron de punto", "agarrar de punto a alguien"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "bruno", "No seas grave, Ana. Nico me siguió la corriente al inicio.", "Don’t be so serious, Ana. Nico played along with me at first.", ["seguirle la corriente"]),
      message("m5", "ana", "Sí, al inicio. Pero una cosa es vacilar y otra pasarse.", "Yes, at first. But joking is one thing; going too far is another.", ["una cosa es vacilar y otra pasarse", "vacilar", "pasarse"]),
      message("m6", "ana", "Con el audio de su ex, se te pasó la mano.", "With the voice note about his ex, you went too far.", ["se te pasó la mano"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "bruno", "Pucha, ¿tanto así? Yo pensé que ya no le importaba.", "Damn, that much? I thought he didn’t care anymore.", []),
      message("m8", "ana", "Justo por eso toca medir el terreno. Hay temas que parecen suaves, pero no lo son.", "That’s exactly why you need to read the room. Some topics seem light, but they aren’t.", ["toca medir el terreno", "medir el terreno"]),
      message("m9", "bruno", "Ahora que lo dices, después del segundo sticker ya no contestó.", "Now that you mention it, after the second sticker he stopped replying.", []),
      message("m10", "ana", "Exacto. Si ya no da risa, mejor no seguir.", "Exactly. If it’s not funny anymore, better not continue.", ["ya no da risa"]),
      message("m11", "bruno", "Quizás se picó un poquito.", "Maybe he got a little annoyed.", ["se picó un poquito", "picarse"]),
      message("m12", "ana", "Más que eso: te lo tomó personal y se puso medio tensa la cosa.", "More than that: he took it personally and things got a bit tense.", ["te lo tomó personal", "tomárselo personal", "se puso medio tensa la cosa"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "bruno", "No fue con mala intención, de verdad.", "It wasn’t meant badly, seriously.", ["no fue con mala intención"]),
      message("m14", "ana", "Lo sé. Pero no le eches más leña al fuego defendiendo la broma.", "I know. But don’t add fuel to the fire by defending the joke.", ["no le eches más leña al fuego"]),
      message("m15", "ana", "Mejor córtala ahí y cambia de tema antes de que todos se incomoden.", "Better stop it there and change the subject before everyone gets uncomfortable.", ["mejor córtala ahí", "mejor cambia de tema"]),
      message("m16", "bruno", "Ya. Entonces no mando el meme que hice recién.", "Okay. Then I won’t send the meme I just made.", []),
      message("m17", "ana", "Gracias. Bájale un cambio, que todavía estás a tiempo.", "Thanks. Tone it down; you still have time.", ["bájale un cambio"]),
      message("m18", "bruno", "Creo que se me pasó la mano. ¿Le pido disculpas sin hacerla larga?", "I think I went too far. Should I apologize without dragging it out?", ["se me pasó la mano", "pide disculpas sin hacerla larga", "hacerla larga"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "ana", "Sí. Corto, directo y sin justificarte veinte veces.", "Yes. Short, direct, and without justifying yourself twenty times.", []),
      message("m20", "bruno", "¿Algo como: 'oe, no fue con mala intención, pero creo que me excedí'?", "Something like: hey, it wasn’t meant badly, but I think I overstepped?", ["no fue con mala intención"]),
      message("m21", "ana", "Eso. Reconoce que te excediste y ya. No hagas la disculpa otro show.", "That. Acknowledge that you overstepped and that’s it. Don’t turn the apology into another show.", ["reconoce que te excediste"]),
      message("m22", "bruno", "Igual me parece que tampoco era para tanto.", "I still think it wasn’t that serious.", ["tampoco era para tanto"]),
      message("m23", "ana", "Puede ser, pero hay bromas y bromas. No todos cargan lo mismo.", "Maybe, but not all jokes are equal. Not everyone carries the same thing.", ["hay bromas y bromas"]),
      message("m24", "ana", "Si ya viste que incomodó, déjala ahí. Eso salva más amistades que ganar la broma.", "If you saw it made him uncomfortable, leave it there. That saves more friendships than winning the joke.", ["si ya viste que incomodó, déjala ahí"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "bruno", "Ya entendí. El sarcasmo se pone pesado cuando todos se suben al mismo chiste.", "I get it now. Sarcasm gets too harsh when everyone piles onto the same joke.", ["el sarcasmo se pone pesado"]),
      message("m26", "ana", "Tal cual. Y tú marcas el tono porque empezaste la chacota.", "Exactly. And you set the tone because you started the banter.", ["chacota"]),
      message("m27", "bruno", "Voy a escribirle: 'Nico, se me pasó la mano. Mala mía, no fue con mala intención'.", "I’m going to write: Nico, I went too far. My bad, it wasn’t meant badly.", ["se me pasó la mano", "no fue con mala intención"]),
      message("m28", "ana", "Perfecto. Bájale al tono y después suelta otro tema más neutro.", "Perfect. Soften the tone and then bring up another more neutral topic.", ["bájale al tono"]),
      message("m29", "bruno", "Ya lo mandé. Y borré el meme, por siaca.", "I sent it. And I deleted the meme, just in case.", []),
      message("m30", "ana", "Bien. Vacilar está buenazo, pero saber cuándo parar también es parte del humor.", "Good. Joking around is great, but knowing when to stop is also part of humour.", ["vacilar"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `peruvian-c1-humour-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: humourVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: humourVocab.map((item) => item.term),
      grammarPatterns: [
        "Boundary warnings: se te pasó la mano, mejor córtala ahí, bájale un cambio.",
        "Impact language: se picó, te lo tomó personal, se puso medio tensa la cosa.",
        "Repair language: pide disculpas sin hacerla larga, reconoce que te excediste.",
      ],
      speakingPrompts: [
        "Tell a friend their joke went too far without attacking them.",
        "Explain why intent does not erase impact.",
        "Give advice for repairing a tense group-chat moment.",
      ],
    },
    completionTask: {
      title: "Your Peruvian C1 humour repair voice note",
      instructions: "Record a 75-second Peruvian Spanish voice note telling a friend that a joke crossed the line, explaining the social cue, and suggesting a clean apology.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Perú, bromear entre patas puede crear confianza, pero también puede romperla. Si un grupo empieza a «agarrar de punto a alguien», la risa deja de ser compartida y se vuelve presión. Por eso no basta decir «era chacota, nomás»; también hay que mirar cómo cayó la broma.", translation: "In Peru, joking among friends can build trust, but it can also break it. If a group starts making someone the target of jokes, the laughter stops being shared and becomes pressure. That is why it is not enough to say it was just banter; you also need to see how the joke landed.", highlights: highlights(["agarrar de punto a alguien", "era chacota, nomás", "chacota"]), shadowLine: "No basta decir: «era chacota, nomás»." },
  { id: "p2", text: "Una señal importante es cuando alguien primero «sigue la corriente», pero luego cambia la cara, se calla o responde más seco. Ahí puede que «se picó un poquito» o que «te lo tomó personal». En C1, la clave no es traducir la frase, sino leer el cambio de energía.", translation: "An important sign is when someone first plays along, but then their face changes, they go quiet, or answer more dryly. Then maybe they got a little annoyed or took it personally. At C1, the key is not translating the phrase, but reading the shift in energy.", highlights: highlights(["seguirle la corriente", "se picó un poquito", "picarse", "te lo tomó personal", "tomárselo personal"]), shadowLine: "Primero siguió la corriente, pero después se picó." },
  { id: "p3", text: "Cuando una broma cruza el límite, puedes decir «se te pasó la mano». Es directo, pero no necesariamente agresivo. También puedes suavizarlo con «bájale un cambio» o «bájale al tono». Estas frases corrigen la intensidad sin convertir todo en pelea.", translation: "When a joke crosses the line, you can say se te pasó la mano. It is direct, but not necessarily aggressive. You can also soften it with bájale un cambio or bájale al tono. These phrases correct the intensity without turning everything into a fight.", highlights: highlights(["se te pasó la mano", "bájale un cambio", "bájale al tono"]), shadowLine: "Se te pasó la mano; bájale un cambio." },
  { id: "p4", text: "La frontera se nota cuando alguien dice «ya no da risa». Esa frase no prohíbe el humor; avisa que el momento cambió. Por eso «una cosa es vacilar y otra pasarse». El humor inteligente sabe cuándo parar antes de que la sala se cierre.", translation: "The boundary is noticeable when someone says it is not funny anymore. That phrase does not forbid humour; it warns that the moment has changed. That is why joking is one thing and going too far is another. Intelligent humour knows when to stop before the room closes.", highlights: highlights(["ya no da risa", "una cosa es vacilar y otra pasarse", "vacilar", "pasarse"]), shadowLine: "Una cosa es vacilar y otra pasarse." },
  { id: "p5", text: "Si «se puso medio tensa la cosa», no conviene defender el chiste como abogado. Mejor decir «no le eches más leña al fuego» y «mejor cambia de tema». En esos segundos, insistir puede hacer más daño que la broma original.", translation: "If things got a bit tense, it is not useful to defend the joke like a lawyer. It is better to say don’t add fuel to the fire and better change the subject. In those seconds, insisting can do more harm than the original joke.", highlights: highlights(["se puso medio tensa la cosa", "no le eches más leña al fuego", "mejor cambia de tema"]), shadowLine: "No le eches más leña al fuego; mejor cambia de tema." },
  { id: "p6", text: "También hay que aceptar que «hay bromas y bromas». Un comentario sobre ropa no pesa igual que uno sobre una ruptura, una inseguridad o un problema familiar. Por eso «toca medir el terreno»: relación, confianza, público y tema cambian totalmente el efecto.", translation: "You also have to accept that not all jokes are equal. A comment about clothing does not weigh the same as one about a breakup, an insecurity, or a family problem. That is why you need to read the room: relationship, trust, audience, and topic totally change the effect.", highlights: highlights(["hay bromas y bromas", "toca medir el terreno", "medir el terreno"]), shadowLine: "Hay bromas y bromas; toca medir el terreno." },
  { id: "p7", text: "Cuando ya viste incomodidad, la mejor frase es «si ya viste que incomodó, déjala ahí». No hace falta «hacerla larga». Puedes decir «pide disculpas sin hacerla larga» y luego «reconoce que te excediste». Eso repara mejor que explicar diez veces tu intención.", translation: "When you already saw discomfort, the best phrase is if you saw it made them uncomfortable, leave it there. You do not need to drag it out. You can say apologize without dragging it out and then acknowledge that you overstepped. That repairs better than explaining your intention ten times.", highlights: highlights(["si ya viste que incomodó, déjala ahí", "hacerla larga", "pide disculpas sin hacerla larga", "reconoce que te excediste"]), shadowLine: "Pide disculpas sin hacerla larga y reconoce que te excediste." },
  { id: "p8", text: "El sarcasmo es útil, pero «el sarcasmo se pone pesado» cuando se repite sobre la misma persona. Puedes pensar «tampoco era para tanto», pero si la otra persona se cerró, toca cuidar el vínculo. En conversaciones reales, tener humor no es solo hacer reír; también es saber no herir.", translation: "Sarcasm is useful, but it gets too harsh when it repeats over the same person. You may think it was not that serious, but if the other person closed off, you need to protect the relationship. In real conversations, having humour is not just making people laugh; it is also knowing how not to hurt.", highlights: highlights(["el sarcasmo se pone pesado", "tampoco era para tanto"]), shadowLine: "El sarcasmo se pone pesado si no sabes parar." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-humour-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Managing humour when a joke starts crossing a social line", "Buying food at a Peruvian market", "Giving directions in Lima", "Talking about work experience"], correctAnswer: "Managing humour when a joke starts crossing a social line", explanation: "The reading focuses on banter, discomfort, boundaries, and repair.", points: 1, skillTag: "gist" },
  { id: "peruvian-c1-humour-reading-q2", type: "multiple-choice", prompt: "Which phrase means “you went too far”?", options: ["Se te pasó la mano", "Mejor cambia de tema", "Toca medir el terreno", "Era chacota, nomás"], correctAnswer: "Se te pasó la mano", explanation: "Se te pasó la mano directly tells someone they overdid it.", points: 1, skillTag: "meaning" },
  { id: "peruvian-c1-humour-reading-q3", type: "true-false", prompt: "True or false: “era chacota, nomás” explains intent, but it does not automatically repair impact.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says you still need to see how the joke landed.", points: 1, skillTag: "nuance" },
  { id: "peruvian-c1-humour-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t add fuel to the fire.", wordBank: ["No", "le", "eches", "más", "leña", "al", "fuego."], correctAnswer: "No le eches más leña al fuego.", explanation: "This tells someone not to worsen a tense moment.", points: 1, skillTag: "phrase-building" },
  { id: "peruvian-c1-humour-reading-q5", type: "multiple-choice", prompt: "Which phrase is best after you notice the joke made someone uncomfortable?", options: ["Si ya viste que incomodó, déjala ahí", "Sigue con el mismo chiste", "Tampoco era para tanto", "Lo agarraron de punto"], correctAnswer: "Si ya viste que incomodó, déjala ahí", explanation: "This phrase tells the person to stop once discomfort is visible.", points: 1, skillTag: "repair" },
];

export const peruvianSpanishC1HumourAlmostCrossesLineReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Peruvian C1 Reading: Cuando la Chacota se Pone Pesada",
  subtitle: "A synced Spanish reading about banter, discomfort, sarcasm, boundaries, and clean repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "reading", "humour", "social nuance"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: humourVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Peruvian C1 humour-that-almost-crosses-the-line vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const peruvianSpanishC1HumourAlmostCrossesLineQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Peruvian Spanish C1: Humour that Almost Crosses the Line Quiz",
  subtitle: "Choose the right Peruvian phrase for banter, discomfort, tone, repair, and social boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "quiz", "humour", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Peruvian C1 phrases for humour that almost crosses the line: teasing, reading discomfort, stopping escalation, and repairing the vibe.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "peruvian-c1-humour-quiz-1", type: "multiple-choice", prompt: "A group keeps making one person the target of jokes. What fits?", options: ["Agarrar de punto a alguien", "Medir el terreno", "Bájale al tono", "Hacerla larga"], correctAnswer: "Agarrar de punto a alguien", explanation: "This means repeatedly targeting someone with jokes.", points: 1, skillTag: "targeting" },
      { id: "peruvian-c1-humour-quiz-2", type: "fill-blank", prompt: "Complete: Se te pasó la ____.", nativePrompt: "You went too far.", correctAnswer: "mano", explanation: "Se te pasó la mano means you overdid it or went too far.", points: 1, skillTag: "boundary" },
      { id: "peruvian-c1-humour-quiz-3", type: "multiple-choice", prompt: "Someone says the joke was only banter. Which phrase fits?", options: ["Era chacota, nomás", "Se puso medio tensa la cosa", "Te lo tomó personal", "No le eches más leña al fuego"], correctAnswer: "Era chacota, nomás", explanation: "Chacota means messing around or playful banter.", points: 1, skillTag: "intent" },
      { id: "peruvian-c1-humour-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Joking is one thing; going too far is another.", wordBank: ["Una", "cosa", "es", "vacilar", "y", "otra", "pasarse."], correctAnswer: "Una cosa es vacilar y otra pasarse.", explanation: "This sets a boundary around humour.", points: 1, skillTag: "phrase-building" },
      { id: "peruvian-c1-humour-quiz-5", type: "true-false", prompt: "True or false: “ya no da risa” means the joke is not funny anymore.", options: ["True", "False"], correctAnswer: "True", explanation: "This phrase marks the moment humour stops working.", points: 1, skillTag: "meaning" },
      { id: "peruvian-c1-humour-quiz-6", type: "multiple-choice", prompt: "The chat gets awkward after a joke. Which phrase fits?", options: ["Se puso medio tensa la cosa", "Seguirle la corriente", "Era chacota, nomás", "Tampoco era para tanto"], correctAnswer: "Se puso medio tensa la cosa", explanation: "This describes the situation becoming tense or awkward.", points: 1, skillTag: "tone-shift" },
      { id: "peruvian-c1-humour-quiz-7", type: "fill-blank", prompt: "Complete: No le eches más leña al ____.", nativePrompt: "Don’t add fuel to the fire.", correctAnswer: "fuego", explanation: "This warns someone not to make the tension worse.", points: 1, skillTag: "escalation" },
      { id: "peruvian-c1-humour-quiz-8", type: "multiple-choice", prompt: "You notice the joke made someone uncomfortable. What is the best phrase?", options: ["Si ya viste que incomodó, déjala ahí", "Sigue vacilando", "Tampoco era para tanto", "Hazla larga"], correctAnswer: "Si ya viste que incomodó, déjala ahí", explanation: "This tells someone to stop once discomfort is visible.", points: 1, skillTag: "respect" },
      { id: "peruvian-c1-humour-quiz-9", type: "true-false", prompt: "True or false: “pide disculpas sin hacerla larga” means apologize without dragging it out.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a clean repair phrase after overstepping.", points: 1, skillTag: "repair" },
      { id: "peruvian-c1-humour-quiz-10", type: "multiple-choice", prompt: "The sarcasm is getting too harsh. Which phrase fits?", options: ["El sarcasmo se pone pesado", "Lo agarraron de punto", "No fue con mala intención", "Toca medir el terreno"], correctAnswer: "El sarcasmo se pone pesado", explanation: "This names the point where sarcasm becomes too much.", points: 1, skillTag: "tone" },
      pairQuestion("peruvian-c1-humour-pairs-1", "Match targeting, banter, and crossing-the-line phrases.", humourVocab.slice(0, 11)),
      pairQuestion("peruvian-c1-humour-pairs-2", "Match discomfort, escalation, and changing-topic phrases.", humourVocab.slice(11, 22)),
      pairQuestion("peruvian-c1-humour-pairs-3", "Match reading-the-room and repair phrases.", humourVocab.slice(22)),
    ],
  },
};
