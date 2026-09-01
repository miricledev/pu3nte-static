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

const courseId = "mexican-spanish-c2-banter-irony-double-meaning";
const skoolSectionName = "Mexican Spanish - C2 Banter, Irony, and Double-Meaning";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const banterVocab: VocabItem[] = [
  { id: "agarrar-de-botana", term: "agarrar de botana", meaning: "to make someone the target of repeated jokes", matchingMeaning: "to make someone the target of repeated jokes", note: "Very Mexican informal phrase; can be playful or bullying depending on frequency and trust.", example: "No lo agarren de botana toda la noche.", translation: "Don’t make him the target of jokes all night.", starred: true },
  { id: "tirarle-una-pedrada", term: "tirarle una pedrada a alguien", meaning: "to aim an indirect sarcastic comment at someone", matchingMeaning: "to aim an indirect sarcastic comment", note: "A pedrada is a veiled jab; it lands without naming the person directly.", example: "Le tiraste una pedrada y luego te hiciste inocente.", translation: "You aimed an indirect jab at him and then acted innocent.", starred: true },
  { id: "balconear-a-alguien", term: "balconear a alguien", meaning: "to expose / embarrass someone publicly", matchingMeaning: "to expose someone publicly", note: "Useful for public embarrassment in a group chat, party, or social situation.", example: "No la balconees enfrente de todos.", translation: "Don’t expose her in front of everyone.", starred: true },
  { id: "alburear", term: "alburear", meaning: "to use Mexican double meanings, often sexual", matchingMeaning: "to use Mexican double meanings", note: "Cultural word for playful double meaning; this lesson keeps it non-explicit and focused on recognition.", example: "Ese tío alburea con todo, pero no siempre cae bien.", translation: "That guy turns everything into double meaning, but it doesn’t always land well.", starred: true },
  { id: "traer-doble-sentido", term: "traer doble sentido", meaning: "to carry a hidden / double meaning", matchingMeaning: "to carry a double meaning", note: "Used when a phrase sounds innocent but has another layer.", example: "Esa frase trae doble sentido, ¿verdad?", translation: "That phrase has a double meaning, right?", starred: true },
  { id: "cachar-el-doble-sentido", term: "cachar el doble sentido", meaning: "to catch the double meaning", matchingMeaning: "to catch the double meaning", note: "Cachar is common in Mexico for catching or understanding something.", example: "No caché el doble sentido hasta que todos se rieron.", translation: "I didn’t catch the double meaning until everyone laughed.", starred: true },
  { id: "luego-luego", term: "luego luego", meaning: "immediately / straight away", matchingMeaning: "immediately", note: "Mexican repetition that means right away, not later.", example: "Luego luego se rieron cuando soltó la frase.", translation: "They laughed immediately when he dropped the line.", starred: true },
  { id: "picar-la-cresta", term: "picar la cresta", meaning: "to deliberately provoke someone", matchingMeaning: "to deliberately provoke someone", note: "Means poking someone’s pride or temper to get a reaction.", example: "Solo le estás picando la cresta para que conteste.", translation: "You’re only provoking him so he answers.", starred: true },
  { id: "llevarse-pesado", term: "llevarse pesado", meaning: "to joke roughly / aggressively with each other", matchingMeaning: "to joke roughly with each other", note: "Common for friend groups with rough humor; outsiders may find it too much.", example: "Ellos se llevan pesado, pero se conocen desde niños.", translation: "They joke roughly with each other, but they’ve known each other since childhood.", starred: true },
  { id: "se-lleva-y-no-se-aguanta", term: "se lleva y no se aguanta", meaning: "they dish it out but can’t take it", matchingMeaning: "they dish it out but can’t take it", note: "Said about someone who jokes aggressively but gets offended when others joke back.", example: "No manches, se lleva y no se aguanta.", translation: "Come on, he dishes it out but can’t take it.", starred: true },
  { id: "aguantar-vara", term: "aguantar vara", meaning: "to take the teasing / consequences without complaining", matchingMeaning: "to take the teasing without complaining", note: "Can be playful, but can also pressure someone to tolerate too much.", example: "Si vas a echar carrilla, también te toca aguantar vara.", translation: "If you’re going to tease, you also have to take it.", starred: true },
  { id: "andar-de-llevado", term: "andar de llevado", meaning: "to be in a teasing, boundary-pushing mood", matchingMeaning: "to be in a boundary-pushing mood", note: "Describes someone taking liberties with jokes.", example: "Hoy andas de llevado, bájale tantito.", translation: "You’re in a boundary-pushing mood today, tone it down a bit.", starred: true },
  { id: "darle-cuerda-a-alguien", term: "darle cuerda a alguien", meaning: "to encourage someone to keep going", matchingMeaning: "to encourage someone to keep going", note: "Used when attention fuels someone’s joking, ranting, or performance.", example: "No le des cuerda porque no va a parar.", translation: "Don’t encourage him because he won’t stop.", starred: true },
  { id: "ponerse-de-pechito", term: "ponerse de pechito", meaning: "to give someone the perfect opening to roast you", matchingMeaning: "to give someone the perfect opening", note: "You accidentally make yourself easy to tease.", example: "Con ese comentario te pusiste de pechito.", translation: "With that comment you made yourself an easy target.", starred: true },
  { id: "hacerla-de-emocion", term: "hacerla de emoción", meaning: "to drag out the suspense / make a big production of revealing something", matchingMeaning: "to drag out the suspense", note: "Used when someone milks a reveal or makes unnecessary drama.", example: "Ya dilo, no la hagas de emoción.", translation: "Just say it, don’t drag out the suspense.", starred: true },
  { id: "echar-relajo", term: "echar relajo", meaning: "to joke around / mess about", matchingMeaning: "to joke around", note: "Broad Mexican phrase for playful messing around.", example: "Estamos echando relajo, pero sin balconear a nadie.", translation: "We’re joking around, but without exposing anyone.", starred: true },
  { id: "por-puro-relajo", term: "por puro relajo", meaning: "just for laughs / purely as a joke", matchingMeaning: "just for laughs", note: "Softens intent, but does not erase impact if someone feels exposed.", example: "Lo dije por puro relajo, no para herirte.", translation: "I said it just for laughs, not to hurt you.", starred: true },
  { id: "agarrar-de-bajada", term: "agarrar de bajada", meaning: "to repeatedly target someone / pile onto them", matchingMeaning: "to repeatedly target someone", note: "Often more negative than simple teasing.", example: "Ya lo agarraron de bajada y se está incómodo.", translation: "They’re piling onto him now and he’s getting uncomfortable.", starred: true },
  { id: "agarrar-de-barco", term: "agarrar de barco", meaning: "to take advantage of someone because they’re easygoing", matchingMeaning: "to take advantage of someone easygoing", note: "Means treating someone like they will accept everything.", example: "No me agarres de barco solo porque no me enojo.", translation: "Don’t take advantage of me just because I don’t get angry.", starred: true },
  { id: "hacerse-pato", term: "hacerse pato", meaning: "to play dumb / pretend not to understand", matchingMeaning: "to play dumb", note: "Mexican phrase for dodging responsibility by pretending confusion.", example: "No te hagas pato; sí entendiste el comentario.", translation: "Don’t play dumb; you did understand the comment.", starred: true },
  { id: "botarse-una-puntada", term: "botarse una puntada", meaning: "to come out with a clever or funny one-liner", matchingMeaning: "to come out with a funny one-liner", note: "A puntada is a witty line, joke, or spontaneous comment.", example: "Se botó una puntada y todos se rieron.", translation: "He came out with a funny one-liner and everyone laughed.", starred: true },
  { id: "pasarse-de-listo", term: "pasarse de listo", meaning: "to get too clever for your own good / take liberties", matchingMeaning: "to get too clever for your own good", note: "Used when wit becomes opportunistic or disrespectful.", example: "Te pasaste de listo con ese comentario.", translation: "You got too clever for your own good with that comment.", starred: true },
  { id: "dejarla-botando", term: "dejarla botando", meaning: "to leave the perfect opening for a comeback", matchingMeaning: "to leave the perfect opening", note: "Image of a ball left bouncing, ready to be hit.", example: "La dejaste botando y obvio te contestaron.", translation: "You left the perfect opening and obviously they answered back.", starred: true },
  { id: "te-la-dejaste-botando", term: "te la dejaste botando", meaning: "you practically handed them the comeback", matchingMeaning: "you handed them the comeback", note: "Said when someone sets themselves up for a joke.", example: "Con esa frase te la dejaste botando.", translation: "With that phrase you practically handed them the comeback.", starred: true },
  { id: "te-dieron-cuerda", term: "te dieron cuerda", meaning: "they encouraged you to keep going", matchingMeaning: "they encouraged you to keep going", note: "Can explain why someone kept joking past the right point.", example: "Te dieron cuerda y ya no supiste parar.", translation: "They encouraged you and then you didn’t know when to stop.", starred: true },
  { id: "te-pusiste-de-pechito", term: "te pusiste de pechito", meaning: "you made yourself an easy target", matchingMeaning: "you made yourself an easy target", note: "Direct second-person version of ponerse de pechito.", example: "No te enojes; tú te pusiste de pechito.", translation: "Don’t get mad; you made yourself an easy target.", starred: true },
  { id: "lo-agarraron-de-botana", term: "lo agarraron de botana", meaning: "they made him the butt of the jokes", matchingMeaning: "they made him the butt of the jokes", note: "Third-person result phrase for a group targeting someone.", example: "Lo agarraron de botana por llegar tarde.", translation: "They made him the butt of the jokes for arriving late.", starred: true },
  { id: "lo-balconearon", term: "lo balconearon", meaning: "they exposed / embarrassed him publicly", matchingMeaning: "they exposed him publicly", note: "A compact past-tense form of balconear.", example: "Lo balconearon en el chat del equipo.", translation: "They exposed him in the team chat.", starred: true },
  { id: "le-tiraron-una-pedrada", term: "le tiraron una pedrada", meaning: "they aimed an indirect dig at him", matchingMeaning: "they aimed an indirect dig at him", note: "Third-person form for indirect sarcasm aimed at someone.", example: "Le tiraron una pedrada y todos entendieron.", translation: "They aimed an indirect dig at him and everyone understood.", starred: true },
  { id: "no-te-hagas-pato", term: "no te hagas pato", meaning: "don’t play dumb", matchingMeaning: "don’t play dumb", note: "Useful when someone pretends not to catch the joke, double meaning, or responsibility.", example: "No te hagas pato, tú empezaste el relajo.", translation: "Don’t play dumb, you started the messing around.", starred: true },
];

const highlightMap = Object.fromEntries(banterVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = banterVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC2BanterIronyDoubleMeaningFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C2: Banter, Irony, and Double-Meaning Flashcards",
  subtitle: "High-nuance Mexican phrases for rough banter, indirect digs, double meanings, public exposure, and knowing when to stop.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "flashcards", "banter", "irony"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: banterVocab.map(cardFromVocab) },
};

export const mexicanSpanishC2BanterIronyDoubleMeaningSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C2 Sentence Builder: Mexican Banter and Double Meaning",
  subtitle: "Build Mexican Spanish phrases for indirect sarcasm, rough joking, albur awareness, and social boundary repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c2", "sentence-builder", "banter", "double-meaning"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note explaining when banter is funny, when it becomes exposure, and how to stop it without killing the mood.",
    stages: [
      stage("stage-1", "Targeted joking", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "They made him the target of repeated jokes and then exposed him publicly.", "Lo agarraron de botana y luego lo balconearon enfrente de todos.", "This distinguishes repeated joking from public embarrassment.", breakdown([["made him the target of jokes", "lo agarraron de botana"], ["then", "luego"], ["exposed him publicly", "lo balconearon"], ["in front of everyone", "enfrente de todos"]])),
      stage("stage-2", "Indirect sarcasm", sentenceVocab.slice(1, 8), sentenceVocab.slice(0, 8), "They aimed an indirect dig at him, and he caught it immediately.", "Le tiraron una pedrada y luego luego cachó el doble sentido.", "This combines indirect sarcasm with quick social interpretation.", breakdown([["aimed an indirect dig at him", "le tiraron una pedrada"], ["immediately", "luego luego"], ["caught the double meaning", "cachó el doble sentido"]])),
      stage("stage-3", "Name double meaning", sentenceVocab.slice(3, 8), sentenceVocab.slice(0, 8), "That joke has a double meaning, but they are only using it for playful banter.", "Ese chiste trae doble sentido, pero lo están usando por puro relajo.", "This keeps albur awareness educational and non-explicit.", breakdown([["that joke", "ese chiste"], ["has a double meaning", "trae doble sentido"], ["just for laughs", "por puro relajo"]])),
      stage("stage-4", "Rough humor limit", sentenceVocab.slice(8, 13), sentenceVocab.slice(0, 13), "They joke roughly with each other, but he dishes it out and can’t take it.", "Se llevan pesado, pero él se lleva y no se aguanta.", "This captures a very Mexican social judgment about rough banter.", breakdown([["they joke roughly", "se llevan pesado"], ["but", "pero"], ["he dishes it out and can’t take it", "él se lleva y no se aguanta"]])),
      stage("stage-5", "Fueling the joke", sentenceVocab.slice(10, 16), sentenceVocab.slice(0, 16), "If you encourage him, he gets boundary-pushing and makes a big production of it.", "Si le das cuerda, se pone de llevado y la hace de emoción.", "This explains how the group can fuel someone’s performance.", breakdown([["if you encourage him", "si le das cuerda"], ["gets boundary-pushing", "se pone de llevado"], ["makes a big production of it", "la hace de emoción"]])),
      stage("stage-6", "Easy target", sentenceVocab.slice(13, 20), sentenceVocab.slice(0, 20), "You handed them the comeback and made yourself an easy target.", "Te la dejaste botando y te pusiste de pechito.", "This says someone accidentally invited the roast.", breakdown([["handed them the comeback", "te la dejaste botando"], ["made yourself an easy target", "te pusiste de pechito"]])),
      stage("stage-7", "Call out avoidance", sentenceVocab.slice(18, 23), sentenceVocab.slice(0, 23), "Don’t play dumb; one thing is joking around and another is taking advantage of someone.", "No te hagas pato; una cosa es echar relajo y otra agarrar de barco a alguien.", "This calls out someone hiding behind humor.", breakdown([["don’t play dumb", "no te hagas pato"], ["to joke around", "echar relajo"], ["take advantage of someone", "agarrar de barco a alguien"]])),
      stage("stage-8", "Repair the excess", sentenceVocab.slice(20), sentenceVocab, "You came out with a funny one-liner, but you got too clever for your own good.", "Te botaste una puntada, pero te pasaste de listo.", "This handles the C2 line between wit and disrespect.", breakdown([["came out with a funny one-liner", "te botaste una puntada"], ["but", "pero"], ["got too clever for your own good", "te pasaste de listo"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-banter-story-q1", type: "multiple-choice", prompt: "After message 3, what is Valeria worried about?", options: ["Nico is becoming the repeated target of jokes", "Nico is late for a bus", "Nico forgot to order food", "Nico is refusing to study"], correctAnswer: "Nico is becoming the repeated target of jokes", explanation: "Valeria says they are agarrando de botana a Nico.", points: 1, skillTag: "context" },
  { id: "mexican-c2-banter-story-q2", type: "multiple-choice", prompt: "After message 6, what happened in the group chat?", options: ["Someone aimed an indirect dig and others caught the double meaning", "Everyone left the chat", "A delivery arrived late", "Nico asked for directions"], correctAnswer: "Someone aimed an indirect dig and others caught the double meaning", explanation: "Mateo says le tiraron una pedrada and todos cacharon el doble sentido.", points: 1, skillTag: "detail" },
  { id: "mexican-c2-banter-story-q3", type: "true-false", prompt: "After message 9, true or false: Valeria thinks albur can be funny but depends on who is present.", options: ["True", "False"], correctAnswer: "True", explanation: "She says alburear can be funny, but not everyone has the same trust.", points: 1, skillTag: "tone" },
  { id: "mexican-c2-banter-story-q4", type: "multiple-choice", prompt: "After message 12, how does Mateo describe Nico?", options: ["He jokes roughly but cannot take jokes back", "He is always silent", "He never jokes with anyone", "He wants to leave Mexico"], correctAnswer: "He jokes roughly but cannot take jokes back", explanation: "Mateo says Nico se lleva y no se aguanta.", points: 1, skillTag: "social-judgment" },
  { id: "mexican-c2-banter-story-q5", type: "multiple-choice", prompt: "After message 15, what does Valeria say the group is doing?", options: ["Encouraging Nico and pushing the joke too far", "Fixing the problem calmly", "Studying vocabulary", "Ignoring the whole chat"], correctAnswer: "Encouraging Nico and pushing the joke too far", explanation: "She says te dieron cuerda and you made a big production of it.", points: 1, skillTag: "escalation" },
  { id: "mexican-c2-banter-story-q6", type: "multiple-choice", prompt: "After message 18, why was Nico easy to roast?", options: ["He left the perfect opening", "He apologized immediately", "He caught a bus", "He stopped replying forever"], correctAnswer: "He left the perfect opening", explanation: "Mateo says se la dejó botando and se puso de pechito.", points: 1, skillTag: "cause" },
  { id: "mexican-c2-banter-story-q7", type: "true-false", prompt: "After message 21, true or false: Valeria thinks intent alone is enough to avoid harm.", options: ["True", "False"], correctAnswer: "False", explanation: "She says por puro relajo is not enough when someone feels exposed.", points: 1, skillTag: "impact" },
  { id: "mexican-c2-banter-story-q8", type: "multiple-choice", prompt: "After message 24, what boundary does Valeria draw?", options: ["Do not take advantage of someone just because they are easygoing", "Never joke with friends", "Always make every joke public", "Never use irony"], correctAnswer: "Do not take advantage of someone just because they are easygoing", explanation: "She says no lo agarren de barco.", points: 1, skillTag: "boundary" },
  { id: "mexican-c2-banter-story-q9", type: "multiple-choice", prompt: "After message 27, what does Mateo admit?", options: ["He got too clever with the joke", "He did nothing at all", "He missed the double meaning", "He wants to keep targeting Nico"], correctAnswer: "He got too clever with the joke", explanation: "Mateo says me pasé de listo.", points: 1, skillTag: "accountability" },
  { id: "mexican-c2-banter-story-q10", type: "multiple-choice", prompt: "After message 30, what is their solution?", options: ["Keep joking, but stop public exposure and targeted piling-on", "Delete every friend from the chat", "Let Nico stay embarrassed", "Make the jokes more aggressive"], correctAnswer: "Keep joking, but stop public exposure and targeted piling-on", explanation: "They want relajo without balconear or grabbing someone de bajada.", points: 1, skillTag: "resolution" },
];

export const mexicanSpanishC2BanterIronyDoubleMeaningWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C2 Story: The Joke That Went Public",
  subtitle: "Valeria and Mateo unpack a group-chat joke where irony, double meaning, and public exposure nearly cross the line.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "story", "banter", "double-meaning"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mateo", name: "Mateo", initials: "M", side: "left", color: "blue" },
      { id: "valeria", name: "Valeria", initials: "V", side: "right", color: "violet" },
    ],
    messages: [
      message("m1", "valeria", "Oye, ¿viste cómo se puso el chat después del meme de Nico?", "Hey, did you see how the chat got after Nico’s meme?", []),
      message("m2", "mateo", "Sí, pero empezó como relajo normal.", "Yeah, but it started as normal messing around.", ["echar relajo"]),
      message("m3", "valeria", "Sí, pero ya lo estaban agarrando de botana, no fue una sola broma.", "Yes, but they were making him the repeated target of jokes; it wasn’t just one joke.", ["agarrar de botana"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "mateo", "Es que Nico también se pone de pechito.", "It’s just that Nico also makes himself an easy target.", ["ponerse de pechito"]),
      message("m5", "valeria", "Te entiendo, pero eso no da permiso para balconearlo.", "I get you, but that doesn’t give permission to expose him.", ["balconear a alguien"]),
      message("m6", "mateo", "Bueno, sí. Le tiraron una pedrada y luego luego todos cacharon el doble sentido.", "Okay, yes. They aimed an indirect dig at him and everyone caught the double meaning immediately.", ["le tiraron una pedrada", "luego luego", "cachar el doble sentido"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "valeria", "Exacto. Una cosa es que el chiste traiga doble sentido.", "Exactly. It’s one thing for the joke to carry a double meaning.", ["traer doble sentido"]),
      message("m8", "mateo", "Y otra que lo usen para exhibirlo.", "And another thing for them to use it to expose him.", []),
      message("m9", "valeria", "Alburear puede ser gracioso, pero no todos traen la misma confianza.", "Using double meanings can be funny, but not everyone has the same level of trust.", ["alburear"]),
      message("m10", "mateo", "También él anda de llevado a veces.", "He also gets boundary-pushing sometimes.", ["andar de llevado"]),
      message("m11", "valeria", "Sí, y a veces pica la cresta para que le contesten.", "Yes, and sometimes he provokes people so they answer back.", ["picar la cresta"]),
      message("m12", "mateo", "Ajá. Se lleva pesado, pero se lleva y no se aguanta.", "Exactly. He jokes roughly, but he dishes it out and can’t take it.", ["llevarse pesado", "se lleva y no se aguanta"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "valeria", "Eso no significa que todos tengan que rematarlo.", "That doesn’t mean everyone has to finish him off.", []),
      message("m14", "mateo", "La banda le dio cuerda y se soltó.", "The group encouraged him and he went off.", ["darle cuerda a alguien"]),
      message("m15", "valeria", "Y luego la hicieron de emoción con la captura, como si fuera noticia.", "And then they made a big production of the screenshot, like it was news.", ["hacerla de emoción"]),
      message("m16", "mateo", "Sí estuvo de más subir la captura.", "Yeah, uploading the screenshot was too much.", []),
      message("m17", "valeria", "Eso ya fue agarrarlo de bajada.", "That was already piling onto him.", ["agarrar de bajada"]),
      message("m18", "mateo", "Pero también la dejó botando. Dijo justo la frase perfecta para que lo rostizaran.", "But he also left the perfect opening. He said exactly the phrase that made him roastable.", ["dejarla botando"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "valeria", "Puede ser, pero no se trata de ganar el chiste a toda costa.", "Maybe, but it’s not about winning the joke at all costs.", []),
      message("m20", "mateo", "Yo sí me boté una puntada, no lo niego.", "I did come out with a funny one-liner, I won’t deny it.", ["botarse una puntada"]),
      message("m21", "valeria", "Y estuvo buena, pero decir que fue por puro relajo no borra que lo balconearon.", "And it was good, but saying it was just for laughs doesn’t erase that they exposed him.", ["por puro relajo", "lo balconearon"]),
      message("m22", "mateo", "Entonces, ¿qué hago? ¿Me disculpo o ya ni le muevo?", "So what do I do? Apologize or not touch it anymore?", []),
      message("m23", "valeria", "Primero no te hagas pato. Sí entendiste que se incomodó.", "First, don’t play dumb. You did understand he got uncomfortable.", ["no te hagas pato", "hacerse pato"]),
      message("m24", "valeria", "Y dile que no era plan agarrarlo de barco solo porque aguanta vara.", "And tell him the plan wasn’t to take advantage of him just because he takes teasing.", ["agarrar de barco", "aguantar vara"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "mateo", "Va. Igual te la dejaste botando con eso de 'plan'.", "Okay. Still, you practically handed me the comeback with that 'plan' thing.", ["te la dejaste botando"]),
      message("m26", "valeria", "No empieces, Mateo.", "Don’t start, Mateo.", []),
      message("m27", "mateo", "Ya, ya. Me pasé de listo. Te dieron cuerda y luego uno cree que todo se vale.", "Okay, okay. I got too clever. They encouraged me and then you start thinking everything is fair game.", ["pasarse de listo", "te dieron cuerda"]),
      message("m28", "valeria", "Exacto. Echar relajo sí, humillar no.", "Exactly. Joking around, yes; humiliating, no.", ["echar relajo"]),
      message("m29", "mateo", "Entonces le escribo: 'me dio risa, pero no estuvo bien balconearte'.", "Then I’ll write: 'it made me laugh, but exposing you wasn’t okay.'", ["balconear a alguien"]),
      message("m30", "valeria", "Eso. Relajo con lectura social: si ya lo agarraron de botana, ahí se corta.", "That’s it. Banter with social awareness: if they already made him the target, that’s where it stops.", ["lo agarraron de botana"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-c2-banter-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: banterVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: banterVocab.map((item) => item.term),
      grammarPatterns: [
        "Targeting and exposure: agarrar de botana, agarrar de bajada, balconear.",
        "Double meaning and irony: traer doble sentido, cachar el doble sentido, tirar una pedrada.",
        "Escalation control: dar cuerda, pasarse de listo, no te hagas pato.",
      ],
      speakingPrompts: [
        "Explain when a joke becomes public embarrassment.",
        "Call out someone who is pretending not to understand the impact of a joke.",
        "Repair a group-chat joke that went too far without sounding stiff.",
      ],
    },
    completionTask: {
      title: "Your C2 banter repair note",
      instructions: "Record a 60-second Mexican Spanish voice note explaining that a joke was funny at first, but then became targeted or public, and propose a better boundary.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En México, el relajo puede ser una forma de cariño, pero también puede convertirse en presión social. «Echar relajo» no es lo mismo que «agarrar de botana» a alguien toda la noche. La diferencia está en la repetición, la confianza y si la persona todavía se está riendo o ya solo está aguantando.", translation: "In Mexico, joking around can be a form of affection, but it can also become social pressure. Echar relajo is not the same as agarrar de botana someone all night. The difference lies in repetition, trust, and whether the person is still laughing or only enduring it.", highlights: highlights(["echar relajo", "agarrar de botana"]), shadowLine: "Echar relajo no es agarrar de botana a alguien." },
  { id: "p2", text: "Una «pedrada» es una indirecta con filo. «Tirarle una pedrada a alguien» permite criticar sin nombrar de frente, pero todos pueden entender a quién va dirigida. Si además el comentario «trae doble sentido», la tensión sube porque el chiste opera en dos niveles al mismo tiempo.", translation: "A pedrada is a pointed indirect comment. Tirarle una pedrada a alguien lets you criticize without naming someone directly, but everyone can understand who it is aimed at. If the comment also trae doble sentido, the tension rises because the joke works on two levels at once.", highlights: highlights(["tirarle una pedrada a alguien", "traer doble sentido"]), shadowLine: "Le tiraron una pedrada y traía doble sentido." },
  { id: "p3", text: "«Alburear» pertenece a una tradición mexicana de doble sentido, muchas veces pícara. En una clase C2 no hace falta repetir chistes explícitos; lo importante es reconocer cuándo alguien está jugando con ambigüedad. Si puedes «cachar el doble sentido» «luego luego», entiendes no solo las palabras, sino el subtexto social.", translation: "Alburear belongs to a Mexican tradition of double meaning, often cheeky. In a C2 class, there is no need to repeat explicit jokes; the important thing is recognizing when someone is playing with ambiguity. If you can cachar el doble sentido luego luego, you understand not just the words, but the social subtext.", highlights: highlights(["alburear", "cachar el doble sentido", "luego luego"]), shadowLine: "Cachó el doble sentido luego luego." },
  { id: "p4", text: "Hay grupos que «se llevan pesado». Eso puede funcionar si todos tienen la misma confianza. El problema aparece con la frase «se lleva y no se aguanta»: alguien empuja la broma, pero se ofende cuando le contestan. Ahí «aguantar vara» se vuelve una regla implícita, y no siempre es justa.", translation: "Some groups joke roughly with each other. That can work if everyone shares the same trust. The problem appears with se lleva y no se aguanta: someone pushes the joke but gets offended when people answer back. There, aguantar vara becomes an implicit rule, and it is not always fair.", highlights: highlights(["llevarse pesado", "se lleva y no se aguanta", "aguantar vara"]), shadowLine: "Se lleva pesado, pero no siempre aguanta vara." },
  { id: "p5", text: "Cuando alguien «anda de llevado», conviene no «darle cuerda» si ya está pasando el límite. A veces una persona se «pone de pechito» sin querer y el grupo aprovecha. Pero que alguien dé la oportunidad no significa que el grupo tenga que exprimirla hasta balconearlo.", translation: "When someone anda de llevado, it is better not to darle cuerda if they are already crossing the line. Sometimes a person se pone de pechito without meaning to and the group takes advantage. But someone giving an opening does not mean the group has to squeeze it until exposing them.", highlights: highlights(["andar de llevado", "darle cuerda a alguien", "ponerse de pechito", "balconear a alguien"]), shadowLine: "Si anda de llevado, no le des cuerda." },
  { id: "p6", text: "«Hacerla de emoción» puede ser gracioso cuando se trata de contar una historia, pero pesado cuando se usa para exhibir a alguien. Lo mismo pasa con «agarrar de bajada» y «agarrar de barco»: ya no es una ocurrencia aislada, sino una dinámica donde alguien queda abajo y los demás se divierten desde arriba.", translation: "Hacerla de emoción can be funny when telling a story, but heavy when used to expose someone. The same happens with agarrar de bajada and agarrar de barco: it is no longer an isolated joke, but a dynamic where someone is placed below while others enjoy it from above.", highlights: highlights(["hacerla de emoción", "agarrar de bajada", "agarrar de barco"]), shadowLine: "No lo agarren de bajada ni de barco." },
  { id: "p7", text: "La inteligencia del relajo está en saber cuándo una «puntada» suma y cuándo alguien «se pasa de listo». «Botarse una puntada» puede levantar el ambiente, pero «dejarla botando» o decir «te la dejaste botando» también revela cómo una persona se volvió blanco fácil. Ser rápido no siempre significa ser fino.", translation: "The intelligence of banter lies in knowing when a puntada adds something and when someone se pasa de listo. Botarse una puntada can lift the mood, but dejarla botando or saying te la dejaste botando also reveals how a person became an easy target. Being quick is not always the same as being socially sharp.", highlights: highlights(["botarse una puntada", "pasarse de listo", "dejarla botando", "te la dejaste botando"]), shadowLine: "Te botaste una puntada, pero te pasaste de listo." },
  { id: "p8", text: "Para cerrar bien, hay que nombrar lo que pasó: «te dieron cuerda», «te pusiste de pechito», «lo agarraron de botana», «lo balconearon» o «le tiraron una pedrada». Y si alguien pretende no entender, «no te hagas pato» ayuda a cortar la evasión. C2 no es solo entender el chiste; es entender el costo social del chiste.", translation: "To close well, you need to name what happened: te dieron cuerda, te pusiste de pechito, lo agarraron de botana, lo balconearon, or le tiraron una pedrada. And if someone pretends not to understand, no te hagas pato helps stop the avoidance. C2 is not only understanding the joke; it is understanding the social cost of the joke.", highlights: highlights(["te dieron cuerda", "te pusiste de pechito", "lo agarraron de botana", "lo balconearon", "le tiraron una pedrada", "no te hagas pato"]), shadowLine: "No te hagas pato: lo balconearon." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-banter-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Mexican banter, double meaning, indirect jokes, and social limits", "Ordering food in a restaurant", "Making formal work plans", "Talking about transport delays"], correctAnswer: "Mexican banter, double meaning, indirect jokes, and social limits", explanation: "The reading explains relajo, albur, double meaning, repeated targeting, and public exposure.", points: 1, skillTag: "gist" },
  { id: "mexican-c2-banter-reading-q2", type: "multiple-choice", prompt: "Which phrase means to expose or embarrass someone publicly?", options: ["Balconear a alguien", "Aguantar vara", "Luego luego", "Hacerla de emoción"], correctAnswer: "Balconear a alguien", explanation: "Balconear means to publicly expose or embarrass someone.", points: 1, skillTag: "meaning" },
  { id: "mexican-c2-banter-reading-q3", type: "true-false", prompt: "True or false: The reading says recognizing albur can be taught without repeating explicit jokes.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says the lesson focuses on recognizing ambiguity and subtext, not repeating explicit jokes.", points: 1, skillTag: "subtext" },
  { id: "mexican-c2-banter-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t play dumb.", wordBank: ["No", "te", "hagas", "pato."], correctAnswer: "No te hagas pato.", explanation: "This calls out someone pretending not to understand.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-c2-banter-reading-q5", type: "multiple-choice", prompt: "Which phrase means they dish it out but cannot take it?", options: ["Se lleva y no se aguanta", "Te dieron cuerda", "Lo balconearon", "Por puro relajo"], correctAnswer: "Se lleva y no se aguanta", explanation: "It describes someone who jokes aggressively but gets offended when jokes come back.", points: 1, skillTag: "social-judgment" },
];

export const mexicanSpanishC2BanterIronyDoubleMeaningReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C2 Reading: Relajo, Albur y el Costo del Chiste",
  subtitle: "A synced Mexican Spanish reading about irony, double meaning, group teasing, public exposure, and social limits.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "reading", "banter", "albur"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: banterVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican C2 banter, irony, and double-meaning vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishC2BanterIronyDoubleMeaningQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish C2: Banter, Irony, and Double-Meaning Quiz",
  subtitle: "Choose the right Mexican phrase for rough joking, indirect digs, double meanings, and social boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "quiz", "banter", "double-meaning"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice C2 Mexican Spanish phrases for playful banter, indirect sarcasm, double meanings, and stopping jokes before they become public humiliation.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-c2-banter-quiz-1", type: "multiple-choice", prompt: "The group keeps making one person the target of jokes. What fits?", options: ["Lo agarraron de botana", "Luego luego", "No te hagas pato", "Por puro relajo"], correctAnswer: "Lo agarraron de botana", explanation: "Agarrar de botana means repeatedly making someone the target of jokes.", points: 1, skillTag: "targeting" },
      { id: "mexican-c2-banter-quiz-2", type: "fill-blank", prompt: "Complete: Le tiraron una ____.", nativePrompt: "They aimed an indirect dig at him.", correctAnswer: "pedrada", explanation: "Tirarle una pedrada means aiming an indirect sarcastic comment at someone.", points: 1, skillTag: "indirectness" },
      { id: "mexican-c2-banter-quiz-3", type: "multiple-choice", prompt: "A phrase sounds innocent but has another hidden meaning. What fits?", options: ["Trae doble sentido", "Aguanta vara", "Se lleva pesado", "La hace de emoción"], correctAnswer: "Trae doble sentido", explanation: "Traer doble sentido means to carry a hidden or double meaning.", points: 1, skillTag: "double-meaning" },
      { id: "mexican-c2-banter-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t play dumb.", wordBank: ["No", "te", "hagas", "pato."], correctAnswer: "No te hagas pato.", explanation: "This means don’t pretend not to understand.", points: 1, skillTag: "avoidance" },
      { id: "mexican-c2-banter-quiz-5", type: "true-false", prompt: "True or false: “se lleva y no se aguanta” describes someone who jokes but cannot take jokes back.", options: ["True", "False"], correctAnswer: "True", explanation: "It means someone dishes it out but cannot take it.", points: 1, skillTag: "social-judgment" },
      { id: "mexican-c2-banter-quiz-6", type: "multiple-choice", prompt: "Someone keeps encouraging the joker to continue. Which phrase fits?", options: ["Darle cuerda a alguien", "Balconear a alguien", "Cachar el doble sentido", "Agarrar de barco"], correctAnswer: "Darle cuerda a alguien", explanation: "Darle cuerda means to encourage someone to keep going.", points: 1, skillTag: "escalation" },
      { id: "mexican-c2-banter-quiz-7", type: "fill-blank", prompt: "Complete: Te la dejaste ____.", nativePrompt: "You practically handed them the comeback.", correctAnswer: "botando", explanation: "Te la dejaste botando means you left the perfect opening for a comeback.", points: 1, skillTag: "comeback" },
      { id: "mexican-c2-banter-quiz-8", type: "multiple-choice", prompt: "A person makes a clever one-liner. What phrase fits?", options: ["Se botó una puntada", "Lo agarraron de bajada", "Se hizo pato", "Aguantó vara"], correctAnswer: "Se botó una puntada", explanation: "Botarse una puntada means to come out with a clever or funny one-liner.", points: 1, skillTag: "wit" },
      { id: "mexican-c2-banter-quiz-9", type: "true-false", prompt: "True or false: “por puro relajo” can explain playful intent, but it does not automatically erase impact.", options: ["True", "False"], correctAnswer: "True", explanation: "The lesson treats intent and impact as separate social layers.", points: 1, skillTag: "impact" },
      { id: "mexican-c2-banter-quiz-10", type: "multiple-choice", prompt: "Someone takes advantage of an easygoing person. Which phrase fits?", options: ["Agarrar de barco", "Luego luego", "Hacerla de emoción", "Cachar el doble sentido"], correctAnswer: "Agarrar de barco", explanation: "Agarrar de barco means to take advantage of someone because they are easygoing.", points: 1, skillTag: "boundary" },
      pairQuestion("mexican-c2-banter-pairs-1", "Match targeting and exposure phrases.", banterVocab.slice(0, 10)),
      pairQuestion("mexican-c2-banter-pairs-2", "Match escalation and teasing phrases.", banterVocab.slice(10, 20)),
      pairQuestion("mexican-c2-banter-pairs-3", "Match wit, comeback, and repair phrases.", banterVocab.slice(20)),
    ],
  },
};
