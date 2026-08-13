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

const courseId = "colombian-spanish-c1-emotional-honesty-difficult-conversations";
const sectionName = "Colombian Spanish - C1 Emotional Honesty and Difficult Conversations";

const emotionalVocab: VocabItem[] = [
  { id: "me-dio-duro", term: "me dio duro", meaning: "it hit me hard / it affected me deeply", matchingMeaning: "it hit me hard", note: "Used when something emotionally affected you more than expected.", example: "Eso que dijiste me dio duro.", translation: "What you said hit me hard.", starred: true },
  { id: "me-quedo-sonando", term: "me quedó sonando", meaning: "it stayed on my mind / I kept thinking about it", matchingMeaning: "it stayed on my mind", note: "Natural for something that keeps echoing mentally.", example: "Tu mensaje me quedó sonando toda la noche.", translation: "Your message stayed on my mind all night.", starred: true },
  { id: "me-dejo-un-sinsabor", term: "me dejó un sinsabor", meaning: "it left a bad taste / unpleasant feeling", matchingMeaning: "left a bad feeling", note: "More reflective than angry; it names emotional residue.", example: "La forma como terminó todo me dejó un sinsabor.", translation: "The way everything ended left a bad feeling.", starred: true },
  { id: "me-saco-la-piedra", term: "me sacó la piedra", meaning: "it really annoyed me / pissed me off", matchingMeaning: "really annoyed me", note: "Strong Colombian phrase for anger or irritation.", example: "Que hablaras así me sacó la piedra.", translation: "The way you spoke really annoyed me.", starred: true },
  { id: "no-me-la-monte", term: "no me la monte", meaning: "don’t pick on me / don’t give me a hard time", matchingMeaning: "don’t give me a hard time", note: "Informal boundary when someone keeps pushing or blaming you.", example: "No me la monte con eso; ya estoy hablando claro.", translation: "Don’t give me a hard time about that; I’m already speaking clearly.", starred: true },
  { id: "un-resto", term: "un resto", meaning: "a lot / loads — informal Colombian intensifier", matchingMeaning: "a lot", note: "Very Colombian intensifier, warm or emotional depending on context.", example: "Eso importa un resto.", translation: "That matters a lot.", starred: true },
  { id: "me-importa-un-resto", term: "me importa un resto", meaning: "I care about it/you a lot", matchingMeaning: "I care a lot", note: "Can sound very sincere in close relationships.", example: "Usted me importa un resto, por eso estoy aquí.", translation: "I care about you a lot; that’s why I’m here.", starred: true },
  { id: "me-dolio-un-resto", term: "me dolió un resto", meaning: "it hurt me a lot", matchingMeaning: "it hurt me a lot", note: "Emotional and informal; stronger than just me dolió.", example: "Me dolió un resto que no me defendieras.", translation: "It hurt me a lot that you didn’t defend me.", starred: true },
  { id: "no-me-cuadra", term: "no me cuadra", meaning: "it doesn’t sit right with me / it doesn’t add up", matchingMeaning: "it doesn’t sit right", note: "Useful for suspicion, discomfort, or emotional inconsistency.", example: "Eso que me cuentas no me cuadra.", translation: "What you’re telling me doesn’t sit right with me.", starred: true },
  { id: "no-me-venga-con-cuentos", term: "no me venga con cuentos", meaning: "don’t give me excuses / don’t come at me with stories", matchingMeaning: "don’t give me excuses", note: "Direct and informal; use carefully in tense conversations.", example: "No me venga con cuentos; yo necesito claridad.", translation: "Don’t give me excuses; I need clarity.", starred: true },
  { id: "echarle-cabeza", term: "echarle cabeza", meaning: "to think something through carefully", matchingMeaning: "think it through", note: "Colombian everyday phrase for reflecting before deciding.", example: "Déjeme echarle cabeza antes de responder.", translation: "Let me think it through before answering.", starred: true },
  { id: "no-me-nace", term: "no me nace", meaning: "I genuinely don’t feel like it / it doesn’t come naturally to me", matchingMeaning: "I genuinely don’t feel like it", note: "Names lack of genuine emotional willingness.", example: "No me nace hacer como si nada.", translation: "I don’t genuinely feel like pretending nothing happened.", starred: true },
  { id: "estar-mamado-de-algo", term: "estar mamado de algo", meaning: "to be fed up with something", matchingMeaning: "be fed up with something", note: "Informal and strong; mamado/mamada changes with speaker gender.", example: "Estoy mamado de repetir lo mismo.", translation: "I’m fed up with repeating the same thing.", starred: true },
  { id: "estoy-mamado-de-eso", term: "estoy mamado de eso", meaning: "I’m sick/fed up with that", matchingMeaning: "I’m fed up with that", note: "Male form; a female speaker would usually say estoy mamada.", example: "Estoy mamado de eso y necesito un cambio.", translation: "I’m fed up with that and need a change.", starred: true },
  { id: "bajele-dos-rayitas", term: "bájele dos rayitas", meaning: "tone it down / take it down a notch", matchingMeaning: "tone it down", note: "Colombian de-escalation phrase; direct but not necessarily aggressive.", example: "Bájele dos rayitas, que sí podemos hablar.", translation: "Tone it down; we can talk.", starred: true },
  { id: "no-se-me-haga", term: "no se me haga", meaning: "don’t play dumb with me / don’t pretend you don’t know", matchingMeaning: "don’t play dumb with me", note: "A tense phrase when someone is avoiding responsibility.", example: "No se me haga; usted sabe qué pasó.", translation: "Don’t play dumb with me; you know what happened.", starred: true },
  { id: "seguir-en-las-mismas", term: "seguir en las mismas", meaning: "to keep repeating the same situation/pattern", matchingMeaning: "keep repeating the same pattern", note: "Useful for relationship or friendship cycles.", example: "No podemos seguir en las mismas cada mes.", translation: "We can’t keep repeating the same pattern every month.", starred: true },
  { id: "no-quiero-seguir-en-las-mismas", term: "no quiero seguir en las mismas", meaning: "I don’t want to keep going through the same thing", matchingMeaning: "I don’t want the same pattern", note: "Clear emotional boundary without ending everything immediately.", example: "No quiero seguir en las mismas con usted.", translation: "I don’t want to keep going through the same thing with you.", starred: true },
  { id: "dejemos-asi", term: "dejemos así", meaning: "let’s leave it there / let’s just leave it", matchingMeaning: "let’s leave it there", note: "Can end a conversation, avoid escalation, or close a relationship chapter.", example: "Si vamos a tratarnos así, dejemos así.", translation: "If we’re going to treat each other like this, let’s leave it there.", starred: true },
  { id: "quedemos-bien", term: "quedemos bien", meaning: "let’s end on good terms", matchingMeaning: "let’s end on good terms", note: "A warm closing phrase when there is care but also a limit.", example: "Quedemos bien, sin hacernos más daño.", translation: "Let’s end on good terms, without hurting each other more.", starred: true },
  { id: "hasta-ahi-llego-yo", term: "hasta ahí llego yo", meaning: "that’s where I draw the line / that’s as far as I’m willing to go", matchingMeaning: "that’s where I draw the line", note: "Strong boundary phrase; firm but calm.", example: "Yo puedo escuchar, pero hasta ahí llego yo.", translation: "I can listen, but that’s where I draw the line.", starred: true },
  { id: "no-hay-necesidad-de-eso", term: "no hay necesidad de eso", meaning: "there’s no need for that", matchingMeaning: "there’s no need for that", note: "Useful to stop cruelty, sarcasm, or escalation.", example: "No hay necesidad de tratarnos mal.", translation: "There’s no need for us to treat each other badly.", starred: true },
  { id: "me-quedo-con-lo-bueno", term: "me quedo con lo bueno", meaning: "I’ll remember/focus on the good", matchingMeaning: "I’ll hold on to the good", note: "A mature, emotionally generous closing phrase.", example: "Con todo y eso, me quedo con lo bueno.", translation: "Even with all that, I’ll hold on to the good.", starred: true },
  { id: "con-todo-y-eso", term: "con todo y eso", meaning: "even with all that / despite everything", matchingMeaning: "even with all that", note: "Sets up contrast after pain, conflict, or complexity.", example: "Con todo y eso, yo no le deseo nada malo.", translation: "Even with all that, I don’t wish you anything bad.", starred: true },
  { id: "me-cogio-fuera-de-base", term: "me cogió fuera de base", meaning: "it caught me off guard / took me by surprise", matchingMeaning: "it caught me off guard", note: "Very Colombian-sounding way to say something surprised you emotionally.", example: "Su llamada me cogió fuera de base.", translation: "Your call caught me off guard.", starred: true },
  { id: "eso-me-dio-duro", term: "Eso me dio duro.", meaning: "That hit me hard.", matchingMeaning: "that hit me hard", note: "Memorize as a complete emotional chunk.", example: "Eso me dio duro, pero quería decírselo bien.", translation: "That hit me hard, but I wanted to tell you properly." },
  { id: "eso-me-quedo-sonando", term: "Eso me quedó sonando.", meaning: "That stayed on my mind.", matchingMeaning: "that stayed on my mind", note: "Useful after a message, comment, or argument.", example: "Eso me quedó sonando desde ayer.", translation: "That stayed on my mind since yesterday." },
  { id: "me-dejo-un-sinsabor-chunk", term: "Me dejó un sinsabor.", meaning: "It left a bad feeling.", matchingMeaning: "it left a bad feeling", note: "Complete phrase for emotional aftertaste.", example: "La conversación me dejó un sinsabor.", translation: "The conversation left a bad feeling." },
  { id: "me-saco-la-piedra-chunk", term: "Me sacó la piedra.", meaning: "It really pissed me off.", matchingMeaning: "it really pissed me off", note: "Strong complete reaction phrase.", example: "La mentira me sacó la piedra.", translation: "The lie really pissed me off." },
  { id: "no-me-la-monte-con-eso", term: "No me la monte con eso.", meaning: "Don’t give me a hard time about that.", matchingMeaning: "don’t give me a hard time about that", note: "Useful when someone keeps blaming or pushing.", example: "No me la monte con eso; yo también estoy intentando.", translation: "Don’t give me a hard time about that; I’m trying too." },
  { id: "usted-me-importa-un-resto", term: "Usted me importa un resto.", meaning: "I care about you a lot.", matchingMeaning: "I care about you a lot", note: "Strongly Colombian and sincere.", example: "Usted me importa un resto, aunque estemos mal.", translation: "I care about you a lot, even if things are bad between us." },
  { id: "me-dolio-un-resto-chunk", term: "Me dolió un resto.", meaning: "It hurt me a lot.", matchingMeaning: "it hurt me a lot", note: "Complete vulnerable chunk.", example: "Me dolió un resto que no apareciera.", translation: "It hurt me a lot that you didn’t show up." },
  { id: "eso-no-me-cuadra", term: "Eso no me cuadra.", meaning: "That doesn’t sit right with me.", matchingMeaning: "that doesn’t sit right", note: "Useful for emotional logic that does not add up.", example: "Eso no me cuadra y prefiero hablarlo.", translation: "That doesn’t sit right with me and I’d rather talk about it." },
  { id: "no-me-venga-con-cuentos-chunk", term: "No me venga con cuentos.", meaning: "Don’t give me excuses.", matchingMeaning: "don’t give me excuses", note: "Direct complete chunk.", example: "No me venga con cuentos; yo vi lo que pasó.", translation: "Don’t give me excuses; I saw what happened." },
  { id: "dejeme-echarle-cabeza", term: "Déjeme echarle cabeza.", meaning: "Let me think it through.", matchingMeaning: "let me think it through", note: "A useful pause before a serious answer.", example: "Déjeme echarle cabeza y mañana hablamos.", translation: "Let me think it through and we’ll talk tomorrow." },
  { id: "no-me-nace-hacer-como-si-nada", term: "No me nace hacer como si nada.", meaning: "I don’t genuinely feel like pretending nothing happened.", matchingMeaning: "I don’t feel like pretending nothing happened", note: "Advanced emotional honesty without exaggeration.", example: "No me nace hacer como si nada después de eso.", translation: "I don’t feel like pretending nothing happened after that." },
  { id: "estoy-mamado-de-lo-mismo", term: "Estoy mamado de lo mismo.", meaning: "I’m fed up with the same thing.", matchingMeaning: "I’m fed up with the same thing", note: "Male speaker form; useful for repeated patterns.", example: "Estoy mamado de lo mismo cada vez que discutimos.", translation: "I’m fed up with the same thing every time we argue." },
  { id: "bajele-dos-rayitas-chunk", term: "Bájele dos rayitas.", meaning: "Tone it down a bit.", matchingMeaning: "tone it down a bit", note: "Complete de-escalation chunk.", example: "Bájele dos rayitas y hablamos bien.", translation: "Tone it down a bit and let’s talk properly." },
  { id: "no-se-me-haga-chunk", term: "No se me haga.", meaning: "Don’t play dumb with me.", matchingMeaning: "don’t play dumb with me", note: "Firm and tense; use carefully.", example: "No se me haga, que usted sabía.", translation: "Don’t play dumb with me; you knew." },
  { id: "no-quiero-seguir-en-las-mismas-chunk", term: "No quiero seguir en las mismas.", meaning: "I don’t want to keep repeating this same pattern.", matchingMeaning: "I don’t want to keep repeating this", note: "Core boundary phrase for difficult conversations.", example: "No quiero seguir en las mismas, de verdad.", translation: "I really don’t want to keep repeating this." },
  { id: "dejemos-asi-chunk", term: "Dejemos así.", meaning: "Let’s leave it there.", matchingMeaning: "let’s leave it there", note: "Short but heavy; context decides whether it means pause or ending.", example: "Si no vamos a escucharnos, dejemos así.", translation: "If we’re not going to listen to each other, let’s leave it there." },
  { id: "quedemos-bien-chunk", term: "Quedemos bien.", meaning: "Let’s end on good terms.", matchingMeaning: "let’s end on good terms", note: "Mature close to a tense relationship conversation.", example: "Quedemos bien, sin tirarnos más duro.", translation: "Let’s end on good terms, without hurting each other more." },
  { id: "hasta-ahi-llego-yo-chunk", term: "Hasta ahí llego yo.", meaning: "That’s where I draw the line.", matchingMeaning: "that’s where I draw the line", note: "Firm emotional limit.", example: "Puedo entender muchas cosas, pero hasta ahí llego yo.", translation: "I can understand many things, but that’s where I draw the line." },
  { id: "no-hay-necesidad-de-tratarnos-mal", term: "No hay necesidad de tratarnos mal.", meaning: "There’s no need for us to treat each other badly.", matchingMeaning: "no need to treat each other badly", note: "Excellent de-escalation line.", example: "No hay necesidad de tratarnos mal por estar dolidos.", translation: "There’s no need for us to treat each other badly because we’re hurt." },
  { id: "me-quedo-con-lo-bueno-chunk", term: "Me quedo con lo bueno.", meaning: "I’ll hold on to the good.", matchingMeaning: "I’ll hold on to the good", note: "Warm closing phrase.", example: "Me quedo con lo bueno y le deseo paz.", translation: "I’ll hold on to the good and wish you peace." },
  { id: "con-todo-y-eso-chunk", term: "Con todo y eso…", meaning: "Even with all that…", matchingMeaning: "even with all that", note: "Useful phrase before a generous or complex contrast.", example: "Con todo y eso, yo sí lo quise mucho.", translation: "Even with all that, I did care about you a lot." },
  { id: "me-cogio-fuera-de-base-chunk", term: "Me cogió fuera de base.", meaning: "It caught me off guard.", matchingMeaning: "it caught me off guard", note: "Complete Colombian surprise phrase.", example: "Su mensaje me cogió fuera de base.", translation: "Your message caught me off guard." },
];

const highlightMap = Object.fromEntries(
  emotionalVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]),
);

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
    difficulty: item.starred ? "hard" : "medium",
    notes: item.note,
    starred: item.starred,
  };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text", audioUrl?: string): StoryMessage {
  return { id, speakerId, messageType, text, translation, ...(audioUrl ? { audioUrl } : {}), vocabHighlights: highlights(phrases) };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

const sentenceVocab = emotionalVocab.slice(0, 25).map((item) => `${item.term} = ${item.meaning}`);

export const colombianSpanishC1EmotionalHonestyDifficultConversationsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Colombian Spanish C1: Emotional Honesty & Difficult Conversations Flashcards",
  subtitle: "Advanced Colombian phrases for hurt, anger, reflection, boundaries, closure, and ending on good terms.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "flashcards", "emotional honesty", "difficult conversations"],
  estimatedMinutes: 20,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { cards: emotionalVocab.map(cardFromVocab) },
};

export const colombianSpanishC1EmotionalHonestyDifficultConversationsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Colombian Emotional Honesty",
  subtitle: "Build Colombian C1 sentences for saying what hurt, setting limits, de-escalating, and closing with maturity.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["colombian-spanish", "c1", "sentence-builder", "emotions", "boundaries"],
  estimatedMinutes: 17,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 90-second Colombian-style voice note about a difficult relationship conversation. Say what hurt, what stayed on your mind, what boundary you need, and how you want to close.",
    stages: [
      stage("stage-1", "What hit you", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Say: That hit me hard, stayed on my mind, and left a bad feeling.", "Eso me dio duro, me quedó sonando y me dejó un sinsabor.", "These three phrases move from immediate impact to lingering emotional residue.", breakdown([["That hit me hard", "Eso me dio duro"], ["stayed on my mind", "me quedó sonando"], ["left a bad feeling", "me dejó un sinsabor"]])),
      stage("stage-2", "Anger without chaos", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "Say: It really annoyed me, but don’t give me a hard time; tone it down.", "Me sacó la piedra, pero no me la monte; bájele dos rayitas.", "This names anger while also asking for a calmer tone.", breakdown([["It really annoyed me", "Me sacó la piedra"], ["don’t give me a hard time", "no me la monte"], ["tone it down", "bájele dos rayitas"]])),
      stage("stage-3", "Care and hurt", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "Say: I care about you a lot, and that’s why it hurt me so much.", "Usted me importa un resto, y por eso me dolió un resto.", "Un resto intensifies both care and hurt in a very Colombian way.", breakdown([["I care about you a lot", "Usted me importa un resto"], ["and that’s why", "y por eso"], ["it hurt me a lot", "me dolió un resto"]])),
      stage("stage-4", "Need clarity", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "Say: That doesn’t sit right with me; don’t give me excuses. Let me think it through.", "Eso no me cuadra; no me venga con cuentos. Déjeme echarle cabeza.", "No me cuadra names discomfort, while echarle cabeza creates space before reacting.", breakdown([["That doesn’t sit right", "Eso no me cuadra"], ["don’t give me excuses", "no me venga con cuentos"], ["Let me think it through", "Déjeme echarle cabeza"]])),
      stage("stage-5", "No pretending", sentenceVocab.slice(12, 18), sentenceVocab.slice(0, 18), "Say: I don’t feel like pretending nothing happened; I’m fed up with the same thing.", "No me nace hacer como si nada; estoy mamado de lo mismo.", "No me nace is honest without drama. Estoy mamado is informal and strong.", breakdown([["I don’t feel like", "No me nace"], ["pretending nothing happened", "hacer como si nada"], ["I’m fed up with the same thing", "estoy mamado de lo mismo"]])),
      stage("stage-6", "Draw the line", sentenceVocab.slice(15, 21), sentenceVocab.slice(0, 21), "Say: Don’t play dumb with me. I don’t want to keep repeating this; that’s where I draw the line.", "No se me haga. No quiero seguir en las mismas; hasta ahí llego yo.", "This is firm boundary language: direct, but still controlled.", breakdown([["Don’t play dumb with me", "No se me haga"], ["I don’t want to keep repeating this", "No quiero seguir en las mismas"], ["that’s where I draw the line", "hasta ahí llego yo"]])),
      stage("stage-7", "De-escalate closure", sentenceVocab.slice(18, 23), sentenceVocab.slice(0, 23), "Say: If we’re going to hurt each other, let’s leave it there, but let’s end on good terms.", "Si vamos a hacernos daño, dejemos así, pero quedemos bien.", "Dejemos así can pause or end a conversation. Quedemos bien keeps dignity.", breakdown([["If we’re going to hurt each other", "Si vamos a hacernos daño"], ["let’s leave it there", "dejemos así"], ["let’s end on good terms", "quedemos bien"]])),
      stage("stage-8", "Hold on to the good", sentenceVocab.slice(21, 25), sentenceVocab, "Say: There’s no need to treat each other badly. Even with all that, I’ll hold on to the good.", "No hay necesidad de tratarnos mal. Con todo y eso, me quedo con lo bueno.", "This stage closes with emotional precision: a boundary plus generosity.", breakdown([["There’s no need", "No hay necesidad"], ["to treat each other badly", "de tratarnos mal"], ["Even with all that", "Con todo y eso"], ["I’ll hold on to the good", "me quedo con lo bueno"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "colombian-c1-emotional-story-q1", type: "multiple-choice", prompt: "After message 3, what is Laura trying to do?", options: ["Talk honestly instead of pretending nothing happened", "Invite Mateo to a party", "Ask for directions", "Complain about a restaurant"], correctAnswer: "Talk honestly instead of pretending nothing happened", explanation: "By message 3, Laura says she did not want to disappear and that the previous conversation hit her hard.", points: 1, skillTag: "gist" },
  { id: "colombian-c1-emotional-story-q2", type: "multiple-choice", prompt: "After message 6, what stayed on Laura’s mind?", options: ["Mateo saying she was exaggerating", "A missed bus", "A work invoice", "A family recipe"], correctAnswer: "Mateo saying she was exaggerating", explanation: "Laura says that phrase me quedó sonando and me dejó un sinsabor.", points: 1, skillTag: "detail" },
  { id: "colombian-c1-emotional-story-q3", type: "multiple-choice", prompt: "After message 9, why does Laura say it hurt a lot?", options: ["Because Mateo did not defend her when his friends mocked her", "Because he forgot coffee", "Because she lost her phone", "Because the plan was expensive"], correctAnswer: "Because Mateo did not defend her when his friends mocked her", explanation: "She says it hurt un resto that Mateo stayed quiet when his friends mocked her.", points: 1, skillTag: "cause" },
  { id: "colombian-c1-emotional-story-q4", type: "true-false", prompt: "After message 12, true or false: Mateo accepts that staying silent was wrong.", options: ["True", "False"], correctAnswer: "True", explanation: "Mateo says it does not sit right with him either and says he was a coward.", points: 1, skillTag: "repair" },
  { id: "colombian-c1-emotional-story-q5", type: "multiple-choice", prompt: "After message 15, what does Laura need before answering?", options: ["Time to think it through", "A taxi", "A new apartment", "A different group chat"], correctAnswer: "Time to think it through", explanation: "She says déjeme echarle cabeza.", points: 1, skillTag: "reflection" },
  { id: "colombian-c1-emotional-story-q6", type: "multiple-choice", prompt: "After message 18, what pattern does Laura reject?", options: ["Pretending nothing happened and repeating the same conflict", "Cooking every weekend", "Using voice notes", "Arriving early"], correctAnswer: "Pretending nothing happened and repeating the same conflict", explanation: "She says no me nace hacer como si nada and no quiero seguir en las mismas.", points: 1, skillTag: "pattern" },
  { id: "colombian-c1-emotional-story-q7", type: "multiple-choice", prompt: "After message 21, what boundary does Laura set?", options: ["She can listen, but she will not accept being mocked again", "She will never speak Spanish again", "She wants Mateo to move cities", "She wants to cancel a class"], correctAnswer: "She can listen, but she will not accept being mocked again", explanation: "She says hasta ahí llego yo after saying she will not accept more jokes at her expense.", points: 1, skillTag: "boundary" },
  { id: "colombian-c1-emotional-story-q8", type: "true-false", prompt: "After message 24, true or false: They both agree there is no need to treat each other badly.", options: ["True", "False"], correctAnswer: "True", explanation: "Mateo says there is no need to treat each other badly, and Laura agrees.", points: 1, skillTag: "de-escalation" },
  { id: "colombian-c1-emotional-story-q9", type: "multiple-choice", prompt: "After message 27, what does Laura want to keep?", options: ["The good parts of what they had", "Only the argument", "Mateo’s jacket", "A bus ticket"], correctAnswer: "The good parts of what they had", explanation: "She says con todo y eso, me quedo con lo bueno.", points: 1, skillTag: "closure" },
  { id: "colombian-c1-emotional-story-q10", type: "multiple-choice", prompt: "By message 30, what kind of ending do they choose?", options: ["A painful but respectful pause on good terms", "A public fight", "A surprise birthday plan", "A business negotiation"], correctAnswer: "A painful but respectful pause on good terms", explanation: "They agree to breathe, not punish each other, and try to quedemos bien.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const colombianSpanishC1EmotionalHonestyDifficultConversationsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Colombian C1 Story: The Conversation We Avoided",
  subtitle: "A tense but caring WhatsApp exchange where Laura and Mateo talk honestly, set limits, and try to end well.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "WhatsApp", "emotions", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "laura", name: "Laura", initials: "L", side: "right", color: "red" },
      { id: "mateo", name: "Mateo", initials: "M", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "laura", "Mateo, ¿tiene un momento? No quiero desaparecer otra vez.", "Mateo, do you have a moment? I don’t want to disappear again.", []),
      message("m2", "mateo", "Sí. Su mensaje me cogió fuera de base, pero aquí estoy.", "Yes. Your message caught me off guard, but I’m here.", ["me cogió fuera de base"], "voice-note", `${storyAudioBase}/m2.mp3`),
      message("m3", "laura", "Gracias. La conversación del domingo me dio duro.", "Thanks. Sunday’s conversation hit me hard.", ["me dio duro"]),
      message("m4", "mateo", "Yo sé que terminé hablando mal. No era mi intención.", "I know I ended up speaking badly. That wasn’t my intention.", []),
      message("m5", "laura", "La frase de que yo estaba exagerando me quedó sonando.", "The line about me exaggerating stayed on my mind.", ["me quedó sonando"]),
      message("m6", "laura", "Y, la verdad, me dejó un sinsabor todo el día.", "And honestly, it left a bad feeling all day.", ["me dejó un sinsabor"]),
      message("m7", "mateo", "Entiendo. A mí me sacó la piedra sentir que nada de lo que decía servía.", "I get it. It really annoyed me to feel that nothing I said helped.", ["me sacó la piedra"], "voice-note", `${storyAudioBase}/m7.mp3`),
      message("m8", "laura", "Pero no me la monte con eso. Yo también estaba intentando hablar bien.", "But don’t give me a hard time about that. I was also trying to speak properly.", ["no me la monte"]),
      message("m9", "laura", "Usted me importa un resto, por eso me dolió un resto que se quedara callado cuando sus amigos se burlaron.", "I care about you a lot, so it hurt me a lot that you stayed quiet when your friends mocked me.", ["me importa un resto", "me dolió un resto", "un resto"]),
      message("m10", "mateo", "Eso no me cuadra ni a mí cuando lo pienso. Me dio pena reconocerlo.", "That doesn’t sit right with me either when I think about it. I felt ashamed admitting it.", ["no me cuadra"]),
      message("m11", "laura", "Entonces no me venga con cuentos de que fue solo un chiste.", "Then don’t give me excuses that it was just a joke.", ["no me venga con cuentos"]),
      message("m12", "mateo", "Tiene razón. Me dio miedo quedar mal con ellos y fui cobarde.", "You’re right. I was afraid of looking bad with them, and I was a coward.", [], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "laura", "Aprecio que lo diga. Pero déjeme echarle cabeza porque no quiero responder desde la rabia.", "I appreciate you saying that. But let me think it through because I don’t want to answer from anger.", ["echarle cabeza", "Déjeme echarle cabeza."]),
      message("m14", "mateo", "Claro. Solo le pido que no cierre todo de una.", "Of course. I’m just asking you not to close everything immediately.", []),
      message("m15", "laura", "No me nace hacer como si nada, Mateo.", "I don’t genuinely feel like pretending nothing happened, Mateo.", ["no me nace", "No me nace hacer como si nada."]),
      message("m16", "mateo", "Lo entiendo. Yo también estoy mamado de eso: peleamos, dejamos pasar, y vuelve lo mismo.", "I understand. I’m fed up with that too: we fight, let it pass, and the same thing comes back.", ["estoy mamado de eso", "estar mamado de algo"]),
      message("m17", "laura", "Exacto. No quiero seguir en las mismas cada vez que algo incómodo pasa.", "Exactly. I don’t want to keep repeating the same thing every time something uncomfortable happens.", ["seguir en las mismas", "no quiero seguir en las mismas"], "voice-note", `${storyAudioBase}/m17.mp3`),
      message("m18", "mateo", "No se me haga: yo sé que también he evitado hablar cuando toca.", "Don’t play dumb with me: I know I’ve also avoided talking when it matters.", ["no se me haga"]),
      message("m19", "laura", "Gracias por decirlo. Y bájele dos rayitas si siente que le estoy cobrando todo.", "Thank you for saying it. And tone it down if you feel I’m charging you for everything.", ["bájele dos rayitas"]),
      message("m20", "mateo", "Sí. Perdón. Me puse a la defensiva.", "Yes. Sorry. I got defensive.", []),
      message("m21", "laura", "Yo puedo escuchar, pero no acepto otra burla a costa mía. Hasta ahí llego yo.", "I can listen, but I won’t accept another joke at my expense. That’s where I draw the line.", ["hasta ahí llego yo", "Hasta ahí llego yo."]),
      message("m22", "mateo", "No hay necesidad de tratarnos mal para probar quién tiene más razón.", "There’s no need for us to treat each other badly to prove who is more right.", ["no hay necesidad de eso", "No hay necesidad de tratarnos mal."], "voice-note", `${storyAudioBase}/m22.mp3`),
      message("m23", "laura", "Sí. Si vamos a lastimarnos por orgullo, mejor dejemos así.", "Yes. If we’re going to hurt each other because of pride, it’s better to leave it there.", ["dejemos así", "Dejemos así."]),
      message("m24", "mateo", "Me duele, pero prefiero quedemos bien a seguir dañándonos.", "It hurts, but I’d rather end on good terms than keep hurting each other.", ["quedemos bien", "Quedemos bien."]),
      message("m25", "laura", "Con todo y eso, no quiero borrar lo bonito.", "Even with all that, I don’t want to erase the beautiful parts.", ["con todo y eso"]),
      message("m26", "mateo", "Yo tampoco. Usted fue muy importante para mí.", "Me neither. You were very important to me.", []),
      message("m27", "laura", "Entonces me quedo con lo bueno, pero hoy necesito distancia.", "Then I’ll hold on to the good, but today I need distance.", ["me quedo con lo bueno", "Me quedo con lo bueno."], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "mateo", "La respeto. No la voy a presionar.", "I respect that. I won’t pressure you.", []),
      message("m29", "laura", "Gracias. Eso también ayuda a que quedemos bien.", "Thank you. That also helps us end on good terms.", ["quedemos bien"]),
      message("m30", "mateo", "Respiremos entonces. Me duele un resto, pero no quiero castigarla por ser honesta.", "Let’s breathe then. It hurts me a lot, but I don’t want to punish you for being honest.", ["un resto"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `colombian-c1-emotional-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: emotionalVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: emotionalVocab.map((item) => item.term),
      grammarPatterns: [
        "Emotional impact: me dio duro, me quedó sonando, me dejó un sinsabor.",
        "Boundaries: no me la monte, bájele dos rayitas, hasta ahí llego yo.",
        "Repeated patterns: estoy mamado de eso, seguir en las mismas, no quiero seguir en las mismas.",
        "Closure: dejemos así, quedemos bien, me quedo con lo bueno.",
      ],
      speakingPrompts: [
        "Say what hit you hard without attacking the other person.",
        "Set a clear boundary with hasta ahí llego yo.",
        "Close a difficult conversation with quedemos bien and me quedo con lo bueno.",
      ],
    },
    completionTask: {
      title: "Your Colombian C1 emotional honesty voice note",
      instructions: "Record a 90-second Colombian Spanish voice note about a difficult conversation. Use at least ten phrases from this lesson and keep the tone honest, firm, and respectful.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una conversación difícil, decir “me dio duro” abre la puerta sin atacar. No significa solamente que algo molestó; significa que algo tocó una parte sensible. Si además “me quedó sonando”, la frase, el gesto o el silencio siguió dando vueltas en la cabeza después de hablar.", translation: "In a difficult conversation, saying it hit me hard opens the door without attacking. It does not only mean something bothered you; it means something touched a sensitive place. If it also stayed on your mind, the phrase, gesture, or silence kept turning in your head after speaking.", highlights: highlights(["me dio duro", "me quedó sonando"]), shadowLine: "Eso me dio duro y me quedó sonando." },
  { id: "p2", text: "Cuando una situación “me dejó un sinsabor”, no necesariamente hubo una pelea grande. Puede ser una sensación amarga: algo no cerró, algo faltó, algo quedó raro. En Colombia, “no me cuadra” también sirve para decir que una explicación no encaja emocionalmente o que una actitud no se siente coherente.", translation: "When a situation left a bad feeling, there was not necessarily a big fight. It can be a bitter feeling: something did not close, something was missing, something felt weird. In Colombia, it does not sit right also says an explanation does not fit emotionally or an attitude does not feel coherent.", highlights: highlights(["me dejó un sinsabor", "no me cuadra"]), shadowLine: "Eso no me cuadra y me dejó un sinsabor." },
  { id: "p3", text: "La rabia también se puede nombrar sin perder el control. “Me sacó la piedra” es fuerte, pero honesto. Si la otra persona empieza a culpar o presionar, “no me la monte” marca un límite. Y si el tono sube demasiado, “bájele dos rayitas” ayuda a pedir calma sin sonar demasiado formal.", translation: "Anger can also be named without losing control. Me sacó la piedra is strong, but honest. If the other person starts blaming or pressuring, no me la monte marks a limit. And if the tone gets too high, bájele dos rayitas helps ask for calm without sounding too formal.", highlights: highlights(["me sacó la piedra", "no me la monte", "bájele dos rayitas"]), shadowLine: "Me sacó la piedra, pero bájele dos rayitas." },
  { id: "p4", text: "“Un resto” intensifica lo que se siente. “Usted me importa un resto” no es una frase fría; suena cercana y sincera. Por eso “me dolió un resto” pesa tanto: muestra que el dolor viene precisamente de que la persona sí importa.", translation: "Un resto intensifies what is felt. I care about you a lot is not a cold phrase; it sounds close and sincere. That is why it hurt me a lot carries so much weight: it shows the pain comes precisely because the person matters.", highlights: highlights(["un resto", "me importa un resto", "me dolió un resto"]), shadowLine: "Usted me importa un resto, y por eso me dolió un resto." },
  { id: "p5", text: "No toda honestidad necesita respuesta inmediata. “Déjeme echarle cabeza” permite pensar antes de herir. También puede aparecer “no me nace”, que expresa falta de ganas genuinas: “no me nace hacer como si nada” dice que fingir normalidad sería falso.", translation: "Not all honesty needs an immediate answer. Let me think it through allows reflection before hurting someone. No me nace can also appear; it expresses a genuine lack of willingness: I don’t feel like pretending nothing happened says normality would be fake.", highlights: highlights(["echarle cabeza", "Déjeme echarle cabeza.", "no me nace", "No me nace hacer como si nada."]), shadowLine: "No me nace hacer como si nada; déjeme echarle cabeza." },
  { id: "p6", text: "Cuando una relación repite el mismo conflicto, alguien puede decir: “estoy mamado de eso” o “no quiero seguir en las mismas”. Son frases informales, pero muy claras. Si alguien evade lo evidente, “no se me haga” corta la vuelta y pide responsabilidad.", translation: "When a relationship repeats the same conflict, someone can say I’m fed up with that or I don’t want to keep repeating this same pattern. They are informal phrases, but very clear. If someone avoids the obvious, don’t play dumb with me cuts through the detour and asks for responsibility.", highlights: highlights(["estoy mamado de eso", "no quiero seguir en las mismas", "seguir en las mismas", "no se me haga"]), shadowLine: "Estoy mamado de eso; no quiero seguir en las mismas." },
  { id: "p7", text: "Los límites sanos no siempre suenan suaves. “Hasta ahí llego yo” es firme: muestra hasta dónde una persona está dispuesta a acompañar, perdonar o negociar. Aun así, se puede decir junto a “no hay necesidad de tratarnos mal”, para que el límite no se vuelva crueldad.", translation: "Healthy limits do not always sound soft. That’s where I draw the line is firm: it shows how far a person is willing to accompany, forgive, or negotiate. Still, it can be said together with there is no need to treat each other badly, so the limit does not become cruelty.", highlights: highlights(["hasta ahí llego yo", "No hay necesidad de tratarnos mal.", "no hay necesidad de eso"]), shadowLine: "Hasta ahí llego yo; no hay necesidad de tratarnos mal." },
  { id: "p8", text: "Al final, “dejemos así” puede ser una pausa o una despedida. “Quedemos bien” intenta proteger la dignidad de los dos. Y “con todo y eso, me quedo con lo bueno” permite reconocer el dolor sin borrar lo que sí fue valioso.", translation: "At the end, let’s leave it there can be a pause or a goodbye. Let’s end on good terms tries to protect both people’s dignity. And even with all that, I’ll hold on to the good allows someone to recognize pain without erasing what was valuable.", highlights: highlights(["dejemos así", "quedemos bien", "con todo y eso", "me quedo con lo bueno"]), shadowLine: "Con todo y eso, me quedo con lo bueno." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "colombian-c1-emotional-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Using Colombian phrases to be honest, set limits, and close difficult conversations", "Basic food ordering", "Formal legal Spanish", "Travel vocabulary"], correctAnswer: "Using Colombian phrases to be honest, set limits, and close difficult conversations", explanation: "The reading explains emotional impact, anger, care, boundaries, repeated patterns, and closure.", points: 1, skillTag: "gist" },
  { id: "colombian-c1-emotional-reading-q2", type: "multiple-choice", prompt: "Why does “me dolió un resto” feel especially strong?", options: ["Because the pain comes from caring a lot", "Because it is only about traffic", "Because it is a greeting", "Because it means the speaker is bored"], correctAnswer: "Because the pain comes from caring a lot", explanation: "The reading links me dolió un resto with usted me importa un resto.", points: 1, skillTag: "emotion" },
  { id: "colombian-c1-emotional-reading-q3", type: "true-false", prompt: "True or false: “hasta ahí llego yo” is a firm boundary phrase.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says it shows how far someone is willing to go.", points: 1, skillTag: "boundary" },
  { id: "colombian-c1-emotional-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I don’t want to keep repeating this same pattern.", wordBank: ["No", "quiero", "seguir", "en", "las", "mismas."], correctAnswer: "No quiero seguir en las mismas.", explanation: "This phrase rejects a repeated emotional pattern.", points: 2, skillTag: "phrase-building" },
  { id: "colombian-c1-emotional-reading-q5", type: "multiple-choice", prompt: "Which phrase tries to end with dignity?", options: ["quedemos bien", "me sacó la piedra", "no se me haga", "no me venga con cuentos"], correctAnswer: "quedemos bien", explanation: "Quedemos bien means let’s end on good terms.", points: 1, skillTag: "closure" },
];

export const colombianSpanishC1EmotionalHonestyDifficultConversationsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Colombian C1 Reading: Hablar sin Hacerse Daño",
  subtitle: "A synced Spanish reading about emotional honesty, anger, repeated patterns, boundaries, and closure in Colombian Spanish.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading", "emotions", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: emotionalVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Colombian C1 emotional honesty and difficult conversations vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const colombianSpanishC1EmotionalHonestyDifficultConversationsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Colombian Spanish C1: Emotional Honesty & Difficult Conversations Quiz",
  subtitle: "Choose the right Colombian phrase for emotional impact, anger, reflection, repeated patterns, and closure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "quiz", "emotional honesty", "boundaries"],
  estimatedMinutes: 20,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Colombian C1 emotional phrases for the right tense, caring, or boundary-setting situation.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "colombian-c1-emotional-quiz-1", type: "multiple-choice", prompt: "Something affected you deeply. Which phrase fits?", options: ["me dio duro", "quedemos bien", "bájele dos rayitas", "no se me haga"], correctAnswer: "me dio duro", explanation: "Me dio duro means it hit me hard.", points: 1, skillTag: "impact" },
      { id: "colombian-c1-emotional-quiz-2", type: "fill-blank", prompt: "Complete: Eso me quedó ______.", nativePrompt: "That stayed on my mind.", correctAnswer: "sonando", explanation: "Me quedó sonando means it stayed on my mind.", points: 1, skillTag: "memory" },
      { id: "colombian-c1-emotional-quiz-3", type: "multiple-choice", prompt: "You want to say a situation left a bad emotional feeling. Which phrase fits?", options: ["me dejó un sinsabor", "me cogió fuera de base", "un resto", "no hay necesidad de eso"], correctAnswer: "me dejó un sinsabor", explanation: "Sinsabor is the unpleasant emotional aftertaste.", points: 1, skillTag: "aftertaste" },
      { id: "colombian-c1-emotional-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t give me excuses.", wordBank: ["No", "me", "venga", "con", "cuentos."], correctAnswer: "No me venga con cuentos.", explanation: "This is a direct informal phrase for rejecting excuses.", points: 1, skillTag: "directness" },
      { id: "colombian-c1-emotional-quiz-5", type: "true-false", prompt: "True or false: “un resto” can intensify emotional phrases like care or hurt.", options: ["True", "False"], correctAnswer: "True", explanation: "Me importa un resto and me dolió un resto both use un resto as an intensifier.", points: 1, skillTag: "intensifier" },
      { id: "colombian-c1-emotional-quiz-6", type: "multiple-choice", prompt: "Someone is escalating the tone. What do you say?", options: ["Bájele dos rayitas", "Me quedo con lo bueno", "Me dio duro", "Déjeme echarle cabeza"], correctAnswer: "Bájele dos rayitas", explanation: "Bájele dos rayitas asks someone to tone it down.", points: 1, skillTag: "de-escalation" },
      { id: "colombian-c1-emotional-quiz-7", type: "fill-blank", prompt: "Complete: No se me ______.", nativePrompt: "Don’t play dumb with me.", correctAnswer: "haga", explanation: "No se me haga means don’t play dumb with me.", points: 1, skillTag: "avoidance" },
      { id: "colombian-c1-emotional-quiz-8", type: "multiple-choice", prompt: "You need time before responding to a serious issue. Which phrase fits?", options: ["Déjeme echarle cabeza", "No me la monte", "Me sacó la piedra", "Con todo y eso"], correctAnswer: "Déjeme echarle cabeza", explanation: "Echarle cabeza means to think it through carefully.", points: 1, skillTag: "reflection" },
      { id: "colombian-c1-emotional-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "That’s where I draw the line.", wordBank: ["Hasta", "ahí", "llego", "yo."], correctAnswer: "Hasta ahí llego yo.", explanation: "This is the firm boundary phrase.", points: 1, skillTag: "boundary" },
      { id: "colombian-c1-emotional-quiz-10", type: "multiple-choice", prompt: "You want to close warmly after conflict. Which phrase fits?", options: ["Me quedo con lo bueno", "No me venga con cuentos", "Me sacó la piedra", "No se me haga"], correctAnswer: "Me quedo con lo bueno", explanation: "Me quedo con lo bueno means I’ll hold on to the good.", points: 1, skillTag: "closure" },
      pairQuestion("colombian-c1-emotional-pairs-1", "Match impact and hurt phrases.", emotionalVocab.slice(0, 9)),
      pairQuestion("colombian-c1-emotional-pairs-2", "Match reflection, frustration, and repeated-pattern phrases.", emotionalVocab.slice(9, 18)),
      pairQuestion("colombian-c1-emotional-pairs-3", "Match boundary and closure phrases.", emotionalVocab.slice(18, 25)),
    ],
  },
};
