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

const courseId = "colombian-spanish-b2-teasing-without-crossing-the-line";
const sectionName = "Colombian Spanish - B2 Teasing Without Crossing the Line";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const teasingVocab: VocabItem[] = [
  { id: "recochar", term: "recochar", meaning: "to joke around / mess around with friends", matchingMeaning: "joke around with friends", note: "Informal Colombian verb for friendly banter, usually in a group.", example: "Estábamos recochando.", translation: "We were just messing around.", starred: true },
  { id: "recocha", term: "recocha", meaning: "joking around / banter / messing about", matchingMeaning: "banter", note: "The noun for playful joking. Tone matters: too much recocha can become annoying.", example: "La recocha estaba buena al principio.", translation: "The banter was fun at first.", starred: true },
  { id: "tomar-del-pelo", term: "tomar del pelo", meaning: "to pull someone’s leg / tease them", matchingMeaning: "pull someone’s leg", note: "Light teasing, usually not meant seriously.", example: "Lo estaba tomando del pelo.", translation: "I was just pulling his leg.", starred: true },
  { id: "montarsela-a-alguien", term: "montársela a alguien", meaning: "to pick on someone / keep teasing or hassling them", matchingMeaning: "pick on someone", note: "Stronger than simple teasing; it can feel targeted.", example: "Se la montaron.", translation: "They started picking on him.", starred: true },
  { id: "coger-de-recocha", term: "coger de recocha a alguien", meaning: "to make someone the target of the group’s jokes", matchingMeaning: "make someone the target of jokes", note: "Useful for spotting when the group dynamic stops being harmless.", example: "Lo cogieron de recocha.", translation: "They made him the target of the jokes.", starred: true },
  { id: "dar-papaya", term: "dar papaya", meaning: "to make yourself an easy target / give someone an obvious opportunity", matchingMeaning: "make yourself an easy target", note: "Very Colombian; often said when someone leaves an opening for jokes or trouble.", example: "Usted también dio papaya.", translation: "You made yourself an easy target too.", starred: true },
  { id: "no-de-papaya", term: "no dé papaya", meaning: "don’t make yourself such an easy target", matchingMeaning: "don’t make yourself an easy target", note: "Common Colombian warning: don’t give people an obvious opening.", example: "No dé papaya.", translation: "Don’t make yourself such an easy target.", starred: true },
  { id: "emberracarse", term: "emberracarse", meaning: "to get really angry / pissed off", matchingMeaning: "get really angry", note: "Strong informal Colombian verb for getting mad.", example: "Juan se emberracó.", translation: "Juan got really angry.", starred: true },
  { id: "no-se-me-emberraque", term: "no se me emberraque", meaning: "don’t get mad at me", matchingMeaning: "don’t get mad at me", note: "Playful or calming phrase after a joke lands badly.", example: "No se me emberraque.", translation: "Don’t get mad at me.", starred: true },
  { id: "se-paso", term: "se pasó", meaning: "he/she went too far / crossed the line", matchingMeaning: "went too far", note: "Direct way to say a joke crossed a limit.", example: "Ahí sí se pasó.", translation: "Okay, there you really went too far.", starred: true },
  { id: "se-paso-de-confianza", term: "se pasó de confianza", meaning: "he/she got too familiar / crossed a familiarity boundary", matchingMeaning: "got too familiar", note: "Used when someone acts as if they have more closeness than they really do.", example: "Se pasó de confianza.", translation: "He got too familiar.", starred: true },
  { id: "no-era-pa-tanto", term: "no era pa’ tanto", meaning: "it wasn’t that serious / that reaction was a bit much", matchingMeaning: "it wasn’t that serious", note: "Can calm things down, but can also sound dismissive if the other person is hurt.", example: "Tampoco era pa’ tanto.", translation: "It wasn’t that serious either.", starred: true },
  { id: "era-molestando", term: "era molestando", meaning: "I was only joking / messing around", matchingMeaning: "I was only joking", note: "Explains intention, but it does not erase impact.", example: "Era molestando.", translation: "I was only joking.", starred: true },
  { id: "no-se-lo-tome-a-mal", term: "no se lo tome a mal", meaning: "don’t take it the wrong way", matchingMeaning: "don’t take it the wrong way", note: "Softens a comment when you sense it may land badly.", example: "No se lo tome a mal.", translation: "Don’t take it the wrong way.", starred: true },
  { id: "no-me-de-tan-duro", term: "no me dé tan duro", meaning: "don’t roast me so hard / go so hard on me", matchingMeaning: "don’t roast me so hard", note: "A natural way to ask someone to reduce the teasing.", example: "No me dé tan duro.", translation: "Don’t roast me so hard.", starred: true },
  { id: "bajele-a-la-recocha", term: "bájele a la recocha", meaning: "tone down the joking", matchingMeaning: "tone down the joking", note: "Clear boundary phrase without sounding too formal.", example: "Bájele a la recocha.", translation: "Tone down the joking.", starred: true },
  { id: "dejelo-quieto", term: "déjelo quieto", meaning: "leave him alone / stop bothering him", matchingMeaning: "leave him alone", note: "Used to protect someone when the group keeps pushing.", example: "Déjelo quieto un rato.", translation: "Leave him alone for a bit.", starred: true },
  { id: "que-boleta", term: "qué boleta", meaning: "how embarrassing / what a cringe moment", matchingMeaning: "how embarrassing", note: "Colombian reaction to something awkward or cringey.", example: "Uy, qué boleta.", translation: "Damn, that’s embarrassing.", starred: true },
  { id: "fue-sin-mala-intencion", term: "fue sin mala intención", meaning: "it wasn’t meant badly / there was no bad intention", matchingMeaning: "there was no bad intention", note: "Useful for repairing a joke while taking responsibility.", example: "Fue sin mala intención.", translation: "It wasn’t meant badly.", starred: true },
  { id: "todo-bien-no-paso-nada", term: "todo bien, no pasó nada", meaning: "it’s all good / no harm done", matchingMeaning: "it’s all good", note: "A reassuring phrase after tension passes.", example: "Todo bien, no pasó nada.", translation: "It’s all good, no harm done.", starred: true },
  { id: "dejemola-ahi", term: "dejémosla ahí", meaning: "let’s leave it there / let’s drop it", matchingMeaning: "let’s drop it", note: "Good phrase when continuing would make things worse.", example: "Dejémosla ahí y ya.", translation: "Let’s just leave it there.", starred: true },
  { id: "papaya-servida", term: "a papaya servida, papaya partida", meaning: "if you give people an obvious opportunity, they’ll take it", matchingMeaning: "if you give the chance, people take it", note: "Classic Colombian saying about not giving others an easy opening.", example: "A papaya servida, papaya partida.", translation: "If you hand people the opportunity, they’re going to take it.", starred: true },
];

const highlightMap = Object.fromEntries(teasingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = teasingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const colombianSpanishB2TeasingWithoutCrossingLineFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Colombian Spanish B2: Teasing Without Crossing the Line Flashcards",
  subtitle: "Colombian phrases for friendly teasing, group banter, crossed boundaries, and repairing a joke.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "flashcards", "teasing", "boundaries"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: teasingVocab.map(cardFromVocab) },
};

export const colombianSpanishB2TeasingWithoutCrossingLineSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Colombian Teasing Boundaries",
  subtitle: "Build Colombian Spanish sentences for joking around, noticing when banter goes too far, and repairing tension.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["colombian-spanish", "b2", "sentence-builder", "banter", "recocha"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Colombian Spanish voice note about a joke that almost went too far: explain the teasing, the boundary, and how everyone fixed it.",
    stages: [
      stage("stage-1", "Friendly banter", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "We were just joking around, and I was pulling him/her leg.", "Estábamos recochando, y lo estaba tomando del pelo.", "Recochar and tomar del pelo keep the teasing light and friendly.", breakdown([["We were joking around", "Estábamos recochando"], ["and", "y"], ["I was pulling his/her leg", "lo estaba tomando del pelo"]])),
      stage("stage-2", "Target of jokes", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "They started picking on him because he made himself an easy target.", "Se la montaron porque él dio papaya.", "Montársela names repeated teasing. Dar papaya explains why he became an easy target.", breakdown([["They started picking on him", "Se la montaron"], ["because", "porque"], ["he made himself an easy target", "él dio papaya"]])),
      stage("stage-3", "Warn someone", sentenceVocab.slice(5, 9), sentenceVocab.slice(0, 9), "Don’t make yourself such an easy target, but don’t get mad at me.", "No dé papaya, pero no se me emberraque.", "No dé papaya is a Colombian warning. No se me emberraque softens the tone.", breakdown([["Don’t make yourself an easy target", "No dé papaya"], ["but", "pero"], ["don’t get mad at me", "no se me emberraque"]])),
      stage("stage-4", "Crossing the line", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "There you really went too far; you got too familiar.", "Ahí sí se pasó; se pasó de confianza.", "Se pasó marks the limit. Se pasó de confianza names a familiarity boundary.", breakdown([["There", "Ahí"], ["you really went too far", "sí se pasó"], ["you got too familiar", "se pasó de confianza"]])),
      stage("stage-5", "Explain intention", sentenceVocab.slice(11, 15), sentenceVocab.slice(0, 15), "I was only joking; don’t take it the wrong way, but don’t roast me so hard.", "Era molestando; no se lo tome a mal, pero no me dé tan duro.", "This stage explains intent but also asks for a softer tone.", breakdown([["I was only joking", "Era molestando"], ["don’t take it the wrong way", "no se lo tome a mal"], ["don’t roast me so hard", "no me dé tan duro"]])),
      stage("stage-6", "Protect the person", sentenceVocab.slice(15, 18), sentenceVocab.slice(0, 18), "Tone down the joking and leave him alone for a bit.", "Bájele a la recocha y déjelo quieto un rato.", "Bájele a la recocha reduces the group energy. Déjelo quieto protects the person.", breakdown([["Tone down the joking", "Bájele a la recocha"], ["and", "y"], ["leave him alone for a bit", "déjelo quieto un rato"]])),
      stage("stage-7", "Repair awkwardness", sentenceVocab.slice(18, 21), sentenceVocab.slice(0, 21), "It was embarrassing, but it wasn’t meant badly. It’s all good, no harm done.", "Qué boleta, pero fue sin mala intención. Todo bien, no pasó nada.", "This models a repair after a joke creates awkwardness.", breakdown([["How embarrassing", "Qué boleta"], ["but", "pero"], ["it wasn’t meant badly", "fue sin mala intención"], ["it’s all good", "todo bien"], ["no harm done", "no pasó nada"]])),
      stage("stage-8", "Drop it", sentenceVocab.slice(20), sentenceVocab, "Let’s leave it there. If you give people the opportunity, they’ll take it.", "Dejémosla ahí. A papaya servida, papaya partida.", "Dejémosla ahí ends the tension. The saying adds the Colombian lesson: avoid giving obvious openings.", breakdown([["Let’s leave it there", "Dejémosla ahí"], ["if the papaya is served", "a papaya servida"], ["the papaya is split", "papaya partida"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "colombian-b2-teasing-story-q1", type: "multiple-choice", prompt: "After message 3, what was happening in the group chat?", options: ["They were joking around about Camilo’s presentation", "They were planning a trip", "They were ordering lunch", "They were arguing about money"], correctAnswer: "They were joking around about Camilo’s presentation", explanation: "Lina says they were in pura recocha about Camilo’s rehearsal.", points: 1, skillTag: "gist" },
  { id: "colombian-b2-teasing-story-q2", type: "multiple-choice", prompt: "After message 6, why does Lina say Camilo gave papaya?", options: ["He sent the wrong slide with a giant selfie", "He arrived two hours late", "He forgot Mateo’s name", "He lost his phone"], correctAnswer: "He sent the wrong slide with a giant selfie", explanation: "The wrong slide gave everyone an obvious opportunity to joke.", points: 1, skillTag: "detail" },
  { id: "colombian-b2-teasing-story-q3", type: "true-false", prompt: "After message 9, true or false: Lina thinks everyone should keep teasing Camilo harder.", options: ["True", "False"], correctAnswer: "False", explanation: "Lina says they should not cogerlo de recocha all day.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-teasing-story-q4", type: "multiple-choice", prompt: "After message 12, what does Lina think Andrés did wrong?", options: ["He got too familiar and crossed a line", "He helped Camilo too much", "He left the office early", "He forgot the meeting link"], correctAnswer: "He got too familiar and crossed a line", explanation: "Lina says Andrés se pasó de confianza.", points: 1, skillTag: "social-line" },
  { id: "colombian-b2-teasing-story-q5", type: "multiple-choice", prompt: "After message 15, what does Camilo ask the group to do?", options: ["Not roast him so hard", "Cancel the project", "Send more memes", "Ignore the client"], correctAnswer: "Not roast him so hard", explanation: "Camilo says: no me den tan duro.", points: 1, skillTag: "repair" },
  { id: "colombian-b2-teasing-story-q6", type: "multiple-choice", prompt: "After message 18, what does Nico suggest?", options: ["Tone down the joking and leave Camilo alone for a bit", "Keep sending jokes every minute", "Make Camilo present alone", "Tell the client everything"], correctAnswer: "Tone down the joking and leave Camilo alone for a bit", explanation: "Nico says bájenle a la recocha and dejémoslo quieto.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-teasing-story-q7", type: "true-false", prompt: "After message 21, true or false: Camilo accepts that it was awkward but says no harm was done.", options: ["True", "False"], correctAnswer: "True", explanation: "Camilo says qué boleta, but also todo bien, no pasó nada.", points: 1, skillTag: "tone" },
  { id: "colombian-b2-teasing-story-q8", type: "multiple-choice", prompt: "After message 24, what did Andrés do?", options: ["He apologized and said it had no bad intention", "He doubled down on the joke", "He quit the chat", "He blamed Lina"], correctAnswer: "He apologized and said it had no bad intention", explanation: "Lina says Andrés wrote: fue sin mala intención.", points: 1, skillTag: "repair" },
  { id: "colombian-b2-teasing-story-q9", type: "multiple-choice", prompt: "After message 27, what does Lina decide?", options: ["They should drop the issue and stop pushing it", "They should make another meme", "They should cancel practice", "They should tease Andrés next"], correctAnswer: "They should drop the issue and stop pushing it", explanation: "Lina says dejémosla ahí.", points: 1, skillTag: "resolution" },
  { id: "colombian-b2-teasing-story-q10", type: "multiple-choice", prompt: "By message 30, what lesson does the group take from the situation?", options: ["Banter is fine, but don’t turn someone into the whole group’s target", "Never joke with friends again", "Presentations are impossible", "Embarrassing moments must be hidden forever"], correctAnswer: "Banter is fine, but don’t turn someone into the whole group’s target", explanation: "The chat ends by separating friendly recocha from picking on someone.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const colombianSpanishB2TeasingWithoutCrossingLineWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Colombian B2 Story: The Joke That Almost Went Too Far",
  subtitle: "A group joke about a presentation turns awkward, and Lina and Nico work out where friendly banter becomes too much.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "WhatsApp", "teasing", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "lina", name: "Lina", initials: "LI", side: "right", color: "red" },
      { id: "nico", name: "Nico", initials: "NI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "lina", "¿Vio el chat del grupo? Lo de Camilo se salió de control.", "Did you see the group chat? The thing with Camilo got out of control.", []),
      message("m2", "nico", "Vi como treinta mensajes, pero no entendí bien. ¿Estaban peleando?", "I saw like thirty messages, but I didn’t understand. Were they fighting?", []),
      message("m3", "lina", "No, al principio era pura recocha. Estábamos recochando por la presentación.", "No, at first it was pure banter. We were joking around about the presentation.", ["recocha", "recochar"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "nico", "Ah, normal. A Camilo siempre lo toman del pelo por hablar como gerente.", "Ah, normal. They always pull Camilo’s leg for talking like a manager.", ["tomar del pelo"]),
      message("m5", "lina", "Sí, pero hoy dio papaya durísimo.", "Yeah, but today he made himself a huge easy target.", ["dar papaya"]),
      message("m6", "lina", "Mandó la diapositiva equivocada y salió una selfie gigante en vez del presupuesto.", "He sent the wrong slide and a giant selfie appeared instead of the budget.", [], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "nico", "Uy no, ahí sí aplica: a papaya servida, papaya partida.", "Oh no, that’s when the saying applies: if you give the chance, people take it.", ["a papaya servida, papaya partida"]),
      message("m8", "lina", "Obvio nos reímos. Pero después se la montaron demasiado.", "Obviously we laughed. But then they picked on him too much.", ["montársela a alguien"]),
      message("m9", "lina", "Una cosa es molestarlo cinco minutos y otra cogerlo de recocha todo el día.", "It’s one thing to tease him for five minutes and another to make him the target all day.", ["coger de recocha a alguien"]),
      message("m10", "nico", "Total. Si todos siguen, deja de ser chiste y empieza a sentirse pesado.", "Totally. If everyone keeps going, it stops being a joke and starts feeling heavy.", [], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "lina", "Andrés dijo algo de la ex de Camilo. Ahí sí se pasó.", "Andrés said something about Camilo’s ex. There he really went too far.", ["se pasó"]),
      message("m12", "nico", "Sí, eso ya es pasarse de confianza. No todo tema sirve para recocha.", "Yeah, that’s getting too familiar. Not every topic works for banter.", ["se pasó de confianza", "recocha"]),
      message("m13", "lina", "Camilo respondió: era molestando, pero no me den tan duro.", "Camilo answered: I know it was joking, but don’t roast me so hard.", ["era molestando", "no me dé tan duro"]),
      message("m14", "nico", "Bien dicho. No toca emberracarse para poner un límite.", "Well said. You don’t need to get really angry to set a limit.", ["emberracarse"]),
      message("m15", "lina", "Igual se le notaba incómodo. Como que no quería emberracarse delante de todos.", "Still, he looked uncomfortable. Like he didn’t want to get mad in front of everyone.", ["emberracarse"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "nico", "Yo habría dicho: no se me emberraque, pero bájele a la recocha.", "I would’ve said: don’t get mad at me, but tone down the joking.", ["no se me emberraque", "bájele a la recocha"]),
      message("m17", "lina", "Exacto. Yo escribí: déjenlo quieto un rato, que ya entendimos el chiste.", "Exactly. I wrote: leave him alone for a bit, we already got the joke.", ["déjelo quieto"]),
      message("m18", "nico", "Eso era lo mejor. Bajen la energía antes de que el man explote.", "That was the best thing. Lower the energy before the guy explodes.", []),
      message("m19", "lina", "Después Camilo mandó un sticker llorando y dijo: uy, qué boleta.", "Then Camilo sent a crying sticker and said: damn, how embarrassing.", ["qué boleta"]),
      message("m20", "nico", "Jajaja, al menos pudo reírse un poquito de sí mismo.", "Haha, at least he could laugh at himself a little.", []),
      message("m21", "lina", "Sí. Luego dijo: todo bien, no pasó nada, pero no me la monten más.", "Yeah. Then he said: it’s all good, no harm done, but don’t keep picking on me.", ["todo bien, no pasó nada", "montársela a alguien"]),
      message("m22", "nico", "Eso es maduro. No negó que dolió, pero tampoco armó drama.", "That’s mature. He didn’t deny it hurt, but he didn’t create drama either.", [], "voice-note", `${storyAudioBase}/m22.mp3`),
      message("m23", "lina", "Andrés se disculpó. Dijo: fue sin mala intención.", "Andrés apologized. He said: it wasn’t meant badly.", ["fue sin mala intención"]),
      message("m24", "nico", "Esa frase ayuda, pero mejor si también cambia el comportamiento.", "That phrase helps, but it’s better if the behavior changes too.", []),
      message("m25", "lina", "Tal cual. Porque decir no se lo tome a mal no arregla todo.", "Exactly. Because saying don’t take it the wrong way doesn’t fix everything.", ["no se lo tome a mal"]),
      message("m26", "nico", "Claro. La intención importa, pero el efecto también.", "Of course. Intention matters, but the effect matters too.", []),
      message("m27", "lina", "Entonces cerré con: dejémosla ahí y ensayemos otra vez.", "So I closed with: let’s leave it there and rehearse again.", ["dejémosla ahí"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "nico", "Perfecto. Se salva la amistad y también la presentación.", "Perfect. The friendship is saved, and so is the presentation.", []),
      message("m29", "lina", "Mañana le digo a Camilo: no dé papaya con selfies gigantes.", "Tomorrow I’ll tell Camilo: don’t make yourself an easy target with giant selfies.", ["no dé papaya"]),
      message("m30", "nico", "Jajaja, pero suave. Recocha sí, volverlo el blanco de todos no.", "Haha, but gently. Banter yes, turning him into everyone’s target no.", ["recocha"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `colombian-b2-teasing-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: teasingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: teasingVocab.map((item) => item.term),
      grammarPatterns: [
        "Friendly joking: recochar, recocha, tomar del pelo.",
        "Crossing the line: montársela, coger de recocha, se pasó.",
        "Repairing: fue sin mala intención, todo bien, dejémosla ahí.",
      ],
      speakingPrompts: [
        "Describe a joke that was funny at first but then went too far.",
        "Ask someone to tone down teasing without sounding too formal.",
        "Repair a joke by explaining intention and accepting the other person’s limit.",
      ],
    },
    completionTask: {
      title: "Your Colombian B2 teasing boundary voice note",
      instructions: "Record a 60-second Colombian Spanish voice note about a teasing moment: explain what happened, where the line was, and how the group repaired it.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Colombia, la “recocha” puede ser una parte normal de la confianza. Cuando un grupo empieza a “recochar”, la idea suele ser relajarse, reírse y no tomar todo tan en serio. Pero la misma energía que une a un grupo también puede incomodar si alguien queda siempre como el blanco del chiste.", translation: "In Colombia, banter can be a normal part of trust. When a group starts joking around, the idea is usually to relax, laugh, and not take everything so seriously. But the same energy that brings a group together can also make someone uncomfortable if they always become the target of the joke.", highlights: highlights(["recocha", "recochar"]), shadowLine: "La recocha es buena cuando todos se sienten incluidos." },
  { id: "p2", text: "“Tomar del pelo” suena más suave que “montársela a alguien”. Si yo te tomo del pelo, probablemente estoy jugando. Si yo “se la monto” a alguien, la broma ya puede sentirse repetida, pesada o injusta. La diferencia no está solo en las palabras: está en cuántas veces pasa y cómo reacciona la otra persona.", translation: "Tomar del pelo sounds softer than montársela a alguien. If I pull your leg, I am probably playing. If I pick on someone, the joke can already feel repeated, heavy, or unfair. The difference is not only in the words: it is in how many times it happens and how the other person reacts.", highlights: highlights(["tomar del pelo", "montársela a alguien"]), shadowLine: "Una cosa es tomar del pelo y otra montársela a alguien." },
  { id: "p3", text: "Cuando una persona “da papaya”, deja una oportunidad demasiado fácil para que los demás hagan un comentario. Por eso se dice “no dé papaya”. El dicho “a papaya servida, papaya partida” explica esa lógica: si la oportunidad está servida, alguien la va a aprovechar. Aun así, que alguien dé papaya no significa que el grupo tenga derecho a humillarlo.", translation: "When a person makes themselves an easy target, they leave an opportunity that is too easy for others to comment on. That is why people say don’t make yourself an easy target. The saying explains the logic: if the opportunity is served, someone will take it. Even so, someone giving the chance does not mean the group has the right to humiliate them.", highlights: highlights(["dar papaya", "no dé papaya", "a papaya servida, papaya partida"]), shadowLine: "No dé papaya, pero tampoco humille a nadie." },
  { id: "p4", text: "Hay señales de que la recocha se está pasando. Si alguien se queda callado, cambia la cara o dice “no me dé tan duro”, ya hay que bajar el tono. También se puede decir “bájele a la recocha” o “déjelo quieto” para proteger a la persona sin convertir todo en una pelea.", translation: "There are signs that the banter is going too far. If someone goes quiet, their face changes, or they say don’t roast me so hard, it is time to lower the tone. You can also say tone down the joking or leave him alone to protect the person without turning everything into a fight.", highlights: highlights(["no me dé tan duro", "bájele a la recocha", "déjelo quieto"]), shadowLine: "Bájele a la recocha y déjelo quieto un rato." },
  { id: "p5", text: "“Emberracarse” es ponerse muy bravo. A veces alguien dice “no se me emberraque” para suavizar el momento, pero hay que tener cuidado: si la otra persona está herida, esa frase puede sonar como si uno no estuviera tomando en serio lo que pasó. Mejor combinarla con una reparación real.", translation: "Emberracarse means getting very angry. Sometimes someone says don’t get mad at me to soften the moment, but you have to be careful: if the other person is hurt, that phrase can sound as if you are not taking what happened seriously. It is better to combine it with a real repair.", highlights: highlights(["emberracarse", "no se me emberraque"]), shadowLine: "No se me emberraque, pero sí entiendo que me pasé." },
  { id: "p6", text: "Cuando una broma cruza el límite, se puede decir “se pasó” o “se pasó de confianza”. La segunda frase es especialmente útil cuando alguien habla de un tema demasiado personal o actúa como si tuviera más confianza de la que realmente tiene. No todo se puede usar como material de chiste.", translation: "When a joke crosses the limit, you can say they went too far or got too familiar. The second phrase is especially useful when someone talks about a topic that is too personal or acts as if they have more closeness than they really do. Not everything can be used as joke material.", highlights: highlights(["se pasó", "se pasó de confianza"]), shadowLine: "Ahí sí se pasó de confianza." },
  { id: "p7", text: "Para reparar, no basta con decir “era molestando” o “no se lo tome a mal”. Esas frases explican la intención, pero no borran el efecto. Una reparación más completa suena así: “fue sin mala intención, pero entiendo que se sintió pesado”. Así la persona no queda obligada a fingir que todo fue gracioso.", translation: "To repair, it is not enough to say I was only joking or don’t take it the wrong way. Those phrases explain the intention, but they do not erase the effect. A more complete repair sounds like this: it was not meant badly, but I understand that it felt heavy. That way the person is not forced to pretend everything was funny.", highlights: highlights(["era molestando", "no se lo tome a mal", "fue sin mala intención"]), shadowLine: "Fue sin mala intención, pero entiendo que se sintió pesado." },
  { id: "p8", text: "Cuando la tensión baja, frases como “todo bien, no pasó nada” y “dejémosla ahí” ayudan a cerrar. No significan que el límite no importó; significan que el grupo puede seguir sin repetir lo mismo. La mejor recocha no deja a nadie humillado: deja a todos con ganas de seguir en la conversación.", translation: "When the tension goes down, phrases like it’s all good and let’s leave it there help close. They do not mean the limit did not matter; they mean the group can continue without repeating the same thing. The best banter does not leave anyone humiliated: it leaves everyone wanting to stay in the conversation.", highlights: highlights(["todo bien, no pasó nada", "dejémosla ahí", "recocha"]), shadowLine: "Todo bien, no pasó nada; dejémosla ahí." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "colombian-b2-teasing-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["How Colombian teasing can be playful but needs limits", "How to write a formal contract", "How to order at a restaurant", "How to plan a trip by bus"], correctAnswer: "How Colombian teasing can be playful but needs limits", explanation: "The reading explains recocha, teasing, crossed boundaries, and repair phrases.", points: 1, skillTag: "gist" },
  { id: "colombian-b2-teasing-reading-q2", type: "multiple-choice", prompt: "Why is “montársela a alguien” stronger than “tomar del pelo”?", options: ["It can feel repeated, targeted, or unfair", "It means buying someone lunch", "It is only used in formal meetings", "It means apologizing"], correctAnswer: "It can feel repeated, targeted, or unfair", explanation: "The reading explains that montársela can feel heavier than light teasing.", points: 1, skillTag: "contrast" },
  { id: "colombian-b2-teasing-reading-q3", type: "true-false", prompt: "True or false: if someone “da papaya”, the group has the right to humiliate them.", options: ["True", "False"], correctAnswer: "False", explanation: "The reading says giving an opening does not justify humiliation.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-teasing-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Tone down the joking.", wordBank: ["Bájele", "a", "la", "recocha."], correctAnswer: "Bájele a la recocha.", explanation: "This is a natural Colombian phrase for reducing the intensity of banter.", points: 1, skillTag: "phrase-building" },
  { id: "colombian-b2-teasing-reading-q5", type: "multiple-choice", prompt: "Which phrase best repairs a joke that landed badly?", options: ["Fue sin mala intención, pero entiendo que se sintió pesado", "A papaya servida, papaya partida", "No dé papaya", "Qué boleta"], correctAnswer: "Fue sin mala intención, pero entiendo que se sintió pesado", explanation: "This explains intention while acknowledging the impact.", points: 1, skillTag: "repair" },
];

export const colombianSpanishB2TeasingWithoutCrossingLineReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Colombian B2 Reading: Recocha con Límites",
  subtitle: "A synced Spanish reading about Colombian teasing, group banter, crossed lines, and repairing a joke.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "reading", "teasing", "recocha"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: teasingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Colombian B2 teasing without crossing the line vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const colombianSpanishB2TeasingWithoutCrossingLineQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Colombian Spanish B2: Teasing Without Crossing the Line Quiz",
  subtitle: "Choose the right Colombian phrase for joking around, crossed boundaries, and repairing awkward moments.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "quiz", "teasing", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Colombian B2 phrases for friendly teasing, group dynamics, boundaries, and repair.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "colombian-b2-teasing-quiz-1", type: "multiple-choice", prompt: "Friends are joking around in a relaxed way. Which phrase fits?", options: ["Están recochando", "Se pasó de confianza", "Déjelo quieto", "Fue sin mala intención"], correctAnswer: "Están recochando", explanation: "Recochar means to joke around or mess around with friends.", points: 1, skillTag: "friendly-banter" },
      { id: "colombian-b2-teasing-quiz-2", type: "fill-blank", prompt: "Complete: Lo estaba tomando del ____.", nativePrompt: "I was pulling his leg.", correctAnswer: "pelo", explanation: "Tomar del pelo means to pull someone’s leg.", points: 1, skillTag: "teasing" },
      { id: "colombian-b2-teasing-quiz-3", type: "multiple-choice", prompt: "The group keeps making the same person the joke target. Which phrase fits?", options: ["Lo cogieron de recocha", "Todo bien, no pasó nada", "No se lo tome a mal", "Qué boleta"], correctAnswer: "Lo cogieron de recocha", explanation: "Coger de recocha a alguien means to make someone the target of jokes.", points: 1, skillTag: "targeting" },
      { id: "colombian-b2-teasing-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t make yourself such an easy target.", wordBank: ["No", "dé", "papaya."], correctAnswer: "No dé papaya.", explanation: "No dé papaya warns someone not to give others an easy opening.", points: 1, skillTag: "warning" },
      { id: "colombian-b2-teasing-quiz-5", type: "true-false", prompt: "True or false: “se pasó de confianza” can mean someone crossed a familiarity boundary.", options: ["True", "False"], correctAnswer: "True", explanation: "Se pasó de confianza means someone got too familiar or crossed a line.", points: 1, skillTag: "boundary" },
      { id: "colombian-b2-teasing-quiz-6", type: "multiple-choice", prompt: "Someone is getting angry after a joke. Which phrase can soften the moment?", options: ["No se me emberraque", "A papaya servida", "Coger de recocha", "Qué boleta"], correctAnswer: "No se me emberraque", explanation: "No se me emberraque means don’t get mad at me.", points: 1, skillTag: "de-escalation" },
      { id: "colombian-b2-teasing-quiz-7", type: "fill-blank", prompt: "Complete: Bájele a la ____.", nativePrompt: "Tone down the joking.", correctAnswer: "recocha", explanation: "Bájele a la recocha means tone down the joking.", points: 1, skillTag: "limit" },
      { id: "colombian-b2-teasing-quiz-8", type: "multiple-choice", prompt: "A joke went too far, but you want to explain you meant no harm. Which phrase fits?", options: ["Fue sin mala intención", "No dé papaya", "Se la montaron", "A papaya partida"], correctAnswer: "Fue sin mala intención", explanation: "Fue sin mala intención means it was not meant badly.", points: 1, skillTag: "repair" },
      { id: "colombian-b2-teasing-quiz-9", type: "true-false", prompt: "True or false: “no era pa’ tanto” can sometimes sound dismissive if the other person is hurt.", options: ["True", "False"], correctAnswer: "True", explanation: "The phrase can calm things down, but it can also minimize someone’s reaction.", points: 1, skillTag: "tone" },
      { id: "colombian-b2-teasing-quiz-10", type: "multiple-choice", prompt: "You want everyone to stop discussing the awkward joke. What do you say?", options: ["Dejémosla ahí", "Se la montaron", "Dé papaya", "Era recocha"], correctAnswer: "Dejémosla ahí", explanation: "Dejémosla ahí means let’s leave it there or drop it.", points: 1, skillTag: "closure" },
      pairQuestion("colombian-b2-teasing-pairs-1", "Match friendly teasing and target phrases.", teasingVocab.slice(0, 8)),
      pairQuestion("colombian-b2-teasing-pairs-2", "Match crossed-line and limit phrases.", teasingVocab.slice(8, 16)),
      pairQuestion("colombian-b2-teasing-pairs-3", "Match repair and closure phrases.", teasingVocab.slice(16)),
    ],
  },
};
