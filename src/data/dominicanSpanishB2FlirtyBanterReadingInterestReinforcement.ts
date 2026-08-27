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

const courseId = "dominican-spanish-b2-flirty-banter-reading-interest";
const sectionName = "Dominican Spanish - B2 Flirty Banter and Reading Interest";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const flirtingVocab: VocabItem[] = [
  { id: "dar-cotorra", term: "dar cotorra", meaning: "to sweet-talk / charm someone with words", matchingMeaning: "sweet-talk someone", note: "Dominican phrase for charming talk; it can be playful, flirty, or persuasive.", example: "Le está dando cotorra.", translation: "He’s sweet-talking her.", starred: true },
  { id: "cotorra", term: "cotorra", meaning: "smooth talk / flirtatious talk / spiel", matchingMeaning: "smooth talk", note: "The talk itself; not always romantic, but very useful for flirtatious situations.", example: "Esa cotorra está fuerte.", translation: "That smooth talk is strong.", starred: true },
  { id: "chulear", term: "chulear a alguien", meaning: "to flirt with / try to win someone over", matchingMeaning: "try to win someone over", note: "Informal and local; often about playful romantic effort.", example: "Lo está chuleando.", translation: "She’s flirting with him.", starred: true },
  { id: "tirarle-los-perros", term: "tirarle los perros", meaning: "to hit on someone / openly flirt with them", matchingMeaning: "hit on someone", note: "More open and direct than subtle flirting.", example: "Me está tirando los perros.", translation: "He/she is hitting on me.", starred: true },
  { id: "chulambrico", term: "chulámbrico", meaning: "cute / attractive / good-looking", matchingMeaning: "good-looking", note: "Playful Dominican compliment; keep it casual.", example: "Tú sí estás chulámbrico hoy.", translation: "You’re looking really good today.", starred: true },
  { id: "estar-acabando", term: "estar acabando", meaning: "to be killing it / getting lots of attention", matchingMeaning: "be killing it", note: "Dominican praise for looking great or standing out.", example: "Tú estás acabando.", translation: "You’re killing it.", starred: true },
  { id: "hacer-cocote", term: "hacer cocote", meaning: "to think something over / overthink it", matchingMeaning: "overthink it", note: "Literally suggests using your head; socially it can mean overanalyzing.", example: "Me tiene haciendo cocote.", translation: "He/she has me overthinking.", starred: true },
  { id: "seguirle-el-juego", term: "seguirle el juego", meaning: "to play along / go along with the flirting", matchingMeaning: "play along", note: "Useful when someone responds to playful flirting.", example: "Me sigue el juego.", translation: "He/she plays along with me.", starred: true },
  { id: "dar-senales", term: "dar señales", meaning: "to give signs / show signs of interest", matchingMeaning: "show signs of interest", note: "A neutral phrase for reading interest without exaggerating.", example: "Me está dando señales.", translation: "He/she is giving me signs.", starred: true },
  { id: "panos-y-manteles", term: "estar a paños y manteles", meaning: "to be very close / familiar / clearly getting along", matchingMeaning: "be very close lately", note: "Dominican phrase for people who are noticeably close or cozy.", example: "Están a paños y manteles.", translation: "Those two are very close lately.", starred: true },
  { id: "no-ser-maiz", term: "no ser maíz", meaning: "to not be easy / not be easy to win over", matchingMeaning: "not be easy to win over", note: "A playful way to say someone is not easily convinced romantically.", example: "Esa muchacha no es maíz.", translation: "That girl isn’t easy to win over.", starred: true },
  { id: "dar-banda", term: "dar banda", meaning: "to leave someone alone / stop giving attention", matchingMeaning: "leave someone alone", note: "Can mean backing off before you become annoying.", example: "Dale banda.", translation: "Leave it/her/him alone.", starred: true },
  { id: "soltar-en-banda", term: "soltar en banda", meaning: "to completely leave someone alone / stop pursuing them", matchingMeaning: "leave someone alone completely", note: "Stronger than dar banda; fully drop the pursuit.", example: "Te suelto en banda.", translation: "I’ll leave you alone completely.", starred: true },
  { id: "dame-banda", term: "dame banda", meaning: "leave me alone / stop bothering me", matchingMeaning: "leave me alone", note: "Direct boundary phrase. It can sound irritated depending on tone.", example: "Dame banda.", translation: "Leave me alone.", starred: true },
  { id: "quillarse", term: "quillarse", meaning: "to get angry / annoyed", matchingMeaning: "get annoyed", note: "Dominican informal verb for getting mad or annoyed.", example: "No quiero que se quille.", translation: "I don’t want him to get mad.", starred: true },
  { id: "no-te-quilles", term: "no te quilles", meaning: "don’t get mad", matchingMeaning: "don’t get mad", note: "Softens a joke or boundary, but still needs respectful tone.", example: "No te quilles.", translation: "Don’t get mad.", starred: true },
  { id: "gufeo", term: "gufeo", meaning: "joking around / playful messing about", matchingMeaning: "playful joking", note: "Dominican casual joking; usually not serious.", example: "Eso es gufeo nada más.", translation: "It’s just joking around.", starred: true },
  { id: "funir", term: "fuñir", meaning: "to annoy / bother / keep pestering someone", matchingMeaning: "keep pestering someone", note: "Use when someone’s flirting or joking becomes irritating.", example: "No me fuñas.", translation: "Stop bothering me.", starred: true },
  { id: "baila-solo", term: "estar que baila solo", meaning: "to be ridiculously excited / over the moon", matchingMeaning: "be ridiculously excited", note: "Colorful phrase for someone visibly excited.", example: "Está que baila solo.", translation: "He’s ridiculously excited.", starred: true },
  { id: "cucaracha-con-mecha", term: "estar como cucaracha con mecha", meaning: "to be restless / anxious / unable to sit still", matchingMeaning: "be unable to sit still", note: "Very vivid Dominican image for nervous excitement or restlessness.", example: "Está como cucaracha con mecha.", translation: "He/she can’t sit still.", starred: true },
  { id: "por-la-maceta", term: "estar por la maceta", meaning: "to be excellent / look amazing / be really good", matchingMeaning: "look amazing", note: "Dominican praise for something or someone looking great.", example: "Ese look está por la maceta.", translation: "That look is amazing.", starred: true },
  { id: "mangos-bajitos", term: "coger los mangos bajitos", meaning: "to take the easy opportunity / go for the easy option", matchingMeaning: "go for the easy option", note: "Useful when someone wants a low-effort win.", example: "Tú quieres coger los mangos bajitos.", translation: "You just want to go for the easy option.", starred: true },
];

const highlightMap = Object.fromEntries(flirtingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = flirtingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const dominicanSpanishB2FlirtyBanterReadingInterestFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B2: Flirty Banter & Reading Interest Flashcards",
  subtitle: "Dominican phrases for sweet talk, reading signs, playful flirting, backing off, and avoiding pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Dominican Spanish", "B2", "flashcards", "flirting", "boundaries"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: flirtingVocab.map(cardFromVocab) },
};

export const dominicanSpanishB2FlirtyBanterReadingInterestSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Dominican Flirty Banter",
  subtitle: "Build Dominican Spanish sentences for cotorra, reading interest, playful joking, and knowing when to back off.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["dominican-spanish", "b2", "sentence-builder", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Dominican Spanish voice note about someone flirting: explain the signs, whether the other person is playing along, and when to give space.",
    stages: [
      stage("stage-1", "Sweet talk", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "He’s sweet-talking her, but maybe he is openly hitting on her.", "Le está dando cotorra, pero quizá le está tirando los perros.", "Dar cotorra can be charming; tirarle los perros is more open flirting.", breakdown([["He’s sweet-talking her", "Le está dando cotorra"], ["but maybe", "pero quizá"], ["he is hitting on her", "le está tirando los perros"]])),
      stage("stage-2", "Compliment the vibe", sentenceVocab.slice(4, 7), sentenceVocab.slice(0, 7), "You look really good today; you’re killing it, and now you have me overthinking.", "Tú sí estás chulámbrico hoy; estás acabando y me tienes haciendo cocote.", "Chulámbrico and estar acabando praise the look; hacer cocote shows overthinking.", breakdown([["You look really good today", "Tú sí estás chulámbrico hoy"], ["you’re killing it", "estás acabando"], ["you have me overthinking", "me tienes haciendo cocote"]])),
      stage("stage-3", "Read signs", sentenceVocab.slice(7, 10), sentenceVocab.slice(0, 10), "He/she plays along with me and gives me signs; we are clearly very close.", "Me sigue el juego y me da señales; estamos a paños y manteles.", "Seguirle el juego and dar señales show possible interest. A paños y manteles sounds close.", breakdown([["He/she plays along", "Me sigue el juego"], ["gives me signs", "me da señales"], ["we are very close", "estamos a paños y manteles"]])),
      stage("stage-4", "Not easy", sentenceVocab.slice(10, 14), sentenceVocab.slice(0, 14), "That girl isn’t easy to win over, so leave her alone if she asks for space.", "Esa muchacha no es maíz, así que dale banda si pide espacio.", "No ser maíz means not easy to win over. Dar banda means back off.", breakdown([["That girl isn’t easy to win over", "Esa muchacha no es maíz"], ["so", "así que"], ["leave her alone", "dale banda"], ["if she asks for space", "si pide espacio"]])),
      stage("stage-5", "Back off clearly", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "If you tell me leave me alone, I’ll leave you alone completely. Don’t get mad.", "Si me dices dame banda, te suelto en banda. No te quilles.", "Dame banda is direct; soltar en banda is fully backing off.", breakdown([["If you tell me", "Si me dices"], ["leave me alone", "dame banda"], ["I’ll leave you alone completely", "te suelto en banda"], ["don’t get mad", "No te quilles"]])),
      stage("stage-6", "Joking versus bothering", sentenceVocab.slice(16, 18), sentenceVocab.slice(0, 18), "It’s just joking around, but stop bothering me.", "Eso es gufeo nada más, pero no me fuñas.", "Gufeo keeps it playful; fuñir shows it has become annoying.", breakdown([["It’s just joking around", "Eso es gufeo nada más"], ["but", "pero"], ["stop bothering me", "no me fuñas"]])),
      stage("stage-7", "Excited energy", sentenceVocab.slice(18, 21), sentenceVocab.slice(0, 21), "He is ridiculously excited and restless because your look is amazing.", "Está que baila solo y como cucaracha con mecha porque ese look está por la maceta.", "These are vivid Dominican ways to describe visible excitement and attraction.", breakdown([["He is ridiculously excited", "Está que baila solo"], ["restless", "como cucaracha con mecha"], ["that look is amazing", "ese look está por la maceta"]])),
      stage("stage-8", "Easy option", sentenceVocab.slice(21), sentenceVocab, "You just want to go for the easy option, but she isn’t easy to win over.", "Tú quieres coger los mangos bajitos, pero ella no es maíz.", "Coger los mangos bajitos means going for the easy win; no ser maíz says the person is not easy.", breakdown([["You want", "Tú quieres"], ["to go for the easy option", "coger los mangos bajitos"], ["but", "pero"], ["she isn’t easy to win over", "ella no es maíz"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "dominican-b2-flirty-story-q1", type: "multiple-choice", prompt: "After message 3, what does Leo think Ana is doing?", options: ["Trying to read whether Rafa is flirting", "Planning a formal interview", "Buying food at a colmado", "Ignoring everyone"], correctAnswer: "Trying to read whether Rafa is flirting", explanation: "Ana says Rafa has her haciendo cocote after talking at the rooftop.", points: 1, skillTag: "gist" },
  { id: "dominican-b2-flirty-story-q2", type: "multiple-choice", prompt: "After message 6, why does Ana think Rafa may be flirting?", options: ["He praised her look and sweet-talked her", "He asked for directions", "He complained about traffic", "He blocked her"], correctAnswer: "He praised her look and sweet-talked her", explanation: "She says he called her chulámbrica and gave her cotorra.", points: 1, skillTag: "detail" },
  { id: "dominican-b2-flirty-story-q3", type: "true-false", prompt: "After message 9, true or false: Ana says she played along a little.", options: ["True", "False"], correctAnswer: "True", explanation: "Ana says le seguí el juego un chin.", points: 1, skillTag: "signal" },
  { id: "dominican-b2-flirty-story-q4", type: "multiple-choice", prompt: "After message 12, what do Leo and Ana think people noticed?", options: ["Ana and Rafa looked very close", "Rafa was angry", "Ana left early", "Nobody saw them"], correctAnswer: "Ana and Rafa looked very close", explanation: "Leo says they were a paños y manteles.", points: 1, skillTag: "reading-room" },
  { id: "dominican-b2-flirty-story-q5", type: "multiple-choice", prompt: "After message 15, what does Ana say about herself?", options: ["She is not easy to win over", "She wants to chase him all week", "She is mad at Leo", "She hates jokes"], correctAnswer: "She is not easy to win over", explanation: "Ana says yo no soy maíz.", points: 1, skillTag: "boundary" },
  { id: "dominican-b2-flirty-story-q6", type: "multiple-choice", prompt: "After message 18, what should Leo do if Meli asks for space?", options: ["Leave her alone completely", "Keep bothering her", "Tell everyone", "Send ten voice notes"], correctAnswer: "Leave her alone completely", explanation: "Ana says if she says dame banda, Leo should soltarla en banda.", points: 1, skillTag: "respect" },
  { id: "dominican-b2-flirty-story-q7", type: "true-false", prompt: "After message 21, true or false: Leo is nervous and excited about Meli.", options: ["True", "False"], correctAnswer: "True", explanation: "Ana says he is como cucaracha con mecha and que baila solo.", points: 1, skillTag: "emotion" },
  { id: "dominican-b2-flirty-story-q8", type: "multiple-choice", prompt: "After message 24, what does Ana warn Leo not to do?", options: ["Take the easy option and avoid real effort", "Speak Dominican Spanish", "Go to the rooftop", "Give a compliment"], correctAnswer: "Take the easy option and avoid real effort", explanation: "Ana says he wants to coger los mangos bajitos.", points: 1, skillTag: "effort" },
  { id: "dominican-b2-flirty-story-q9", type: "multiple-choice", prompt: "After message 27, how does Rafa respond to Ana’s boundary?", options: ["He says all good and stops pushing", "He gets angry", "He sends more pressure", "He ignores her completely"], correctAnswer: "He says all good and stops pushing", explanation: "Ana reports that Rafa said cero presión and didn’t fuñir.", points: 1, skillTag: "healthy-response" },
  { id: "dominican-b2-flirty-story-q10", type: "multiple-choice", prompt: "By message 30, what is the main lesson?", options: ["Flirting is fine when both people read signs and respect space", "Sweet talk always means love", "You should always chase harder", "Jokes are never okay"], correctAnswer: "Flirting is fine when both people read signs and respect space", explanation: "They end by separating cotorra from pressure and respecting banda.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const dominicanSpanishB2FlirtyBanterReadingInterestWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Dominican B2 Story: Cotorra or Real Signs?",
  subtitle: "Ana and Leo decode sweet talk, signs of interest, nervous excitement, and when to back off.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Dominican Spanish", "B2", "WhatsApp", "flirting", "interest"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ana", name: "Ana", initials: "AN", side: "right", color: "violet" },
      { id: "leo", name: "Leo", initials: "LE", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "ana", "Leo, necesito opinión seria, pero sin relajo.", "Leo, I need a serious opinion, but no joking around.", []),
      message("m2", "leo", "Eso ya suena a que alguien te puso a pensar.", "That already sounds like someone made you think.", []),
      message("m3", "ana", "Rafa me tiene haciendo cocote desde anoche en el rooftop.", "Rafa has me overthinking since last night on the rooftop.", ["hacer cocote"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "leo", "¿Haciendo cocote por qué? ¿Te dio cotorra?", "Overthinking why? Did he sweet-talk you?", ["hacer cocote", "dar cotorra"]),
      message("m5", "ana", "Cotorra fina. Me dijo: tú sí estás chulámbrica hoy.", "Smooth talk. He told me: you’re looking really good today.", ["cotorra", "chulámbrico"]),
      message("m6", "leo", "Ah no, ese tipo te estaba tirando los perros con luces largas.", "Oh no, that guy was openly hitting on you with high beams.", ["tirarle los perros"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "ana", "También dijo que yo estaba acabando, pero no sé si era gufeo.", "He also said I was killing it, but I don’t know if it was just joking.", ["estar acabando", "gufeo"]),
      message("m8", "leo", "Puede ser gufeo, pero si siguió ahí toda la noche, hay señales.", "It could be joking, but if he stayed there all night, there are signs.", ["gufeo", "dar señales"]),
      message("m9", "ana", "Yo le seguí el juego un chin, no te voy a mentir.", "I played along a little, I won’t lie.", ["seguirle el juego"]),
      message("m10", "leo", "Entonces tú también le diste señales. No me vengas ahora con misterio.", "Then you also gave him signs. Don’t come to me with mystery now.", ["dar señales"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "ana", "Pero una cosa es hablar y otra estar en algo.", "But talking is one thing and having something going on is another.", []),
      message("m12", "leo", "Sí, pero Meli dijo que ustedes estaban a paños y manteles.", "Yeah, but Meli said you two looked very close.", ["estar a paños y manteles"]),
      message("m13", "ana", "Meli exagera. Ella ve dos sonrisas y ya arma novela.", "Meli exaggerates. She sees two smiles and creates a whole drama.", []),
      message("m14", "leo", "Bueno, pero Rafa te está chuleando hace rato.", "Well, but Rafa has been trying to win you over for a while.", ["chulear a alguien"]),
      message("m15", "ana", "Que chulee, pero yo no soy maíz. No me gana con dos frases lindas.", "He can flirt, but I’m not easy. He won’t win me over with two nice lines.", ["chulear a alguien", "no ser maíz"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "leo", "Eso mismo debería decirle Meli a mí, ¿verdad?", "That’s exactly what Meli should say to me, right?", []),
      message("m17", "ana", "Si Meli te dice dame banda, tú la sueltas en banda.", "If Meli tells you leave me alone, you leave her alone completely.", ["dame banda", "soltar en banda"]),
      message("m18", "leo", "O sea, nada de fuñir con mensajes cada cinco minutos.", "So, no pestering with messages every five minutes.", ["fuñir"]),
      message("m19", "ana", "Exacto. Dar banda a tiempo también es tener flow.", "Exactly. Backing off on time is also having flow.", ["dar banda"]),
      message("m20", "leo", "No te quilles, pero tú estás hablando como coach romántica.", "Don’t get mad, but you’re talking like a romantic coach.", ["no te quilles"]),
      message("m21", "ana", "Y tú estás como cucaracha con mecha por Meli. Está que baila solo el muchacho.", "And you’re restless over Meli. The guy is ridiculously excited.", ["estar como cucaracha con mecha", "estar que baila solo"], "voice-note", `${storyAudioBase}/m21.mp3`),
      message("m22", "leo", "Es que Meli llegó con un vestido que estaba por la maceta.", "It’s because Meli arrived in a dress that looked amazing.", ["estar por la maceta"]),
      message("m23", "ana", "Eso se puede decir bonito, sin ponerse intenso.", "You can say that nicely, without getting intense.", []),
      message("m24", "ana", "Pero tú quieres coger los mangos bajitos: tirar un piropo y resolver todo.", "But you want the easy option: throw one compliment and solve everything.", ["coger los mangos bajitos"]),
      message("m25", "leo", "Ok, ok. Entonces primero veo si me sigue el juego.", "Okay, okay. So first I see if she plays along.", ["seguirle el juego"]),
      message("m26", "ana", "Y si no, le das banda. Sin quillarte.", "And if not, you leave her alone. Without getting mad.", ["dar banda", "quillarse"]),
      message("m27", "ana", "Actualización: Rafa me escribió y le dije que fuera suave. Dijo cero presión y no fuñó más.", "Update: Rafa texted me and I told him to go easy. He said no pressure and stopped bothering me.", ["fuñir"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "leo", "Eso es buena señal. El que respeta banda gana puntos.", "That’s a good sign. Someone who respects space earns points.", ["dar banda"]),
      message("m29", "ana", "Sí. Si sigue así, quizás le sigo el juego otro día.", "Yeah. If he keeps that up, maybe I’ll play along another day.", ["seguirle el juego"]),
      message("m30", "leo", "Mira qué fino: cotorra sí, presión no. Esa es la vuelta.", "Look how smooth: sweet talk yes, pressure no. That’s the thing.", ["cotorra"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `dominican-b2-flirty-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: flirtingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: flirtingVocab.map((item) => item.term),
      grammarPatterns: [
        "Sweet talk: dar cotorra, chulear, tirarle los perros.",
        "Reading interest: seguirle el juego, dar señales, estar a paños y manteles.",
        "Boundaries: dame banda, dar banda, soltar en banda.",
      ],
      speakingPrompts: [
        "Describe someone giving cotorra without being too pushy.",
        "Say whether another person is giving signs or only joking.",
        "Tell someone to back off respectfully if the interest is not mutual.",
      ],
    },
    completionTask: {
      title: "Your Dominican B2 flirty banter voice note",
      instructions: "Record a 60-second Dominican Spanish voice note explaining whether someone is flirting, what signs you notice, and when the person should back off.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En el español dominicano, la “cotorra” puede ser una forma de encanto. Si alguien “da cotorra”, usa palabras, humor y seguridad para acercarse. Pero no toda cotorra significa interés serio: a veces es puro juego, y por eso hay que mirar cómo responde la otra persona.", translation: "In Dominican Spanish, cotorra can be a form of charm. If someone gives cotorra, they use words, humor, and confidence to get closer. But not all cotorra means serious interest: sometimes it is pure play, and that is why you have to watch how the other person responds.", highlights: highlights(["cotorra", "dar cotorra"]), shadowLine: "Le está dando cotorra, pero mira si ella responde." },
  { id: "p2", text: "“Chulear a alguien” y “tirarle los perros” hablan de coqueteo, pero no tienen el mismo peso. Chulear puede sonar más juguetón, como intentar ganar a alguien poco a poco. Tirarle los perros es más abierto: la intención romántica se ve más clara y menos escondida.", translation: "Chulear a alguien and tirarle los perros talk about flirting, but they do not carry the same weight. Chulear can sound more playful, like trying to win someone over little by little. Tirarle los perros is more open: the romantic intention is clearer and less hidden.", highlights: highlights(["chulear a alguien", "tirarle los perros"]), shadowLine: "La está chuleando, pero no le está tirando los perros demasiado fuerte." },
  { id: "p3", text: "Los cumplidos también tienen su lugar. Decir “tú sí estás chulámbrico hoy” o “ese look está por la maceta” puede sonar natural si ya hay confianza. “Tú estás acabando” añade más energía: la persona se ve bien, llama la atención y sabe que está brillando.", translation: "Compliments also have their place. Saying you look really good today or that look is amazing can sound natural if there is already trust. Tú estás acabando adds more energy: the person looks good, gets attention, and knows they are shining.", highlights: highlights(["chulámbrico", "estar por la maceta", "estar acabando"]), shadowLine: "Tú estás acabando; ese look está por la maceta." },
  { id: "p4", text: "Para leer interés, hay que fijarse en las señales. Si alguien “te sigue el juego”, entra en la dinámica. Si además “da señales”, responde, busca conversación o se queda cerca. Cuando dos personas están “a paños y manteles”, los demás notan que hay confianza y cercanía.", translation: "To read interest, you need to notice the signs. If someone plays along, they enter the dynamic. If they also give signs, they respond, look for conversation, or stay close. When two people are a paños y manteles, others notice trust and closeness.", highlights: highlights(["seguirle el juego", "dar señales", "estar a paños y manteles"]), shadowLine: "Me sigue el juego y me da señales." },
  { id: "p5", text: "El problema empieza cuando uno se pone a “hacer cocote” demasiado. Pensar ayuda, pero sobrepensar cansa. Una mirada no es una promesa, una sonrisa no es una relación, y una cotorra buena no significa que la persona ya quiera algo serio.", translation: "The problem starts when someone overthinks too much. Thinking helps, but overthinking is tiring. A look is not a promise, a smile is not a relationship, and good smooth talk does not mean the person already wants something serious.", highlights: highlights(["hacer cocote", "cotorra"]), shadowLine: "No hagas tanto cocote por una sonrisa." },
  { id: "p6", text: "También existe el límite. “No ser maíz” significa que alguien no es fácil de ganar. Si la otra persona dice “dame banda”, hay que parar. “Dar banda” a tiempo muestra madurez, y “soltar en banda” es dejar de perseguir completamente cuando ya quedó claro que no hay interés.", translation: "There is also the limit. No ser maíz means someone is not easy to win over. If the other person says dame banda, you have to stop. Backing off on time shows maturity, and soltar en banda means completely stopping the pursuit when it is clear there is no interest.", highlights: highlights(["no ser maíz", "dame banda", "dar banda", "soltar en banda"]), shadowLine: "Si te dice dame banda, suéltala en banda." },
  { id: "p7", text: "El coqueteo dominicano puede tener mucho “gufeo”, pero el gufeo no debe convertirse en “fuñir”. Si alguien dice “no me fuñas” o se empieza a “quillar”, la energía ya cambió. En ese momento, “no te quilles” solo funciona si también bajas la presión.", translation: "Dominican flirting can include a lot of playful joking, but joking should not become pestering. If someone says stop bothering me or starts getting annoyed, the energy has changed. At that moment, don’t get mad only works if you also lower the pressure.", highlights: highlights(["gufeo", "fuñir", "quillarse", "no te quilles"]), shadowLine: "Eso es gufeo, pero no me fuñas." },
  { id: "p8", text: "Algunas imágenes dominicanas exageran la emoción con gracia. “Está que baila solo” muestra entusiasmo fuerte. “Está como cucaracha con mecha” muestra nervios o inquietud. Y “coger los mangos bajitos” advierte contra buscar solo lo fácil. Coquetear bien no es coger el camino más cómodo: es leer señales y respetar espacio.", translation: "Some Dominican images exaggerate emotion with humor. Está que baila solo shows strong excitement. Está como cucaracha con mecha shows nerves or restlessness. And coger los mangos bajitos warns against only looking for what is easy. Good flirting is not taking the easiest path: it is reading signs and respecting space.", highlights: highlights(["estar que baila solo", "estar como cucaracha con mecha", "coger los mangos bajitos"]), shadowLine: "No cojas los mangos bajitos: lee señales y respeta banda." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "dominican-b2-flirty-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Dominican flirting, signs of interest, playful talk, and boundaries", "Formal academic writing", "Dominican transport routes", "A cooking recipe"], correctAnswer: "Dominican flirting, signs of interest, playful talk, and boundaries", explanation: "The reading explains cotorra, chulear, signs, overthinking, joking, and backing off.", points: 1, skillTag: "gist" },
  { id: "dominican-b2-flirty-reading-q2", type: "multiple-choice", prompt: "Why is “tirarle los perros” stronger than “chulear”?", options: ["It is more open and direct flirting", "It means to leave someone alone", "It means to be nervous", "It means a joke failed"], correctAnswer: "It is more open and direct flirting", explanation: "The reading says tirarle los perros makes the romantic intention clearer.", points: 1, skillTag: "contrast" },
  { id: "dominican-b2-flirty-reading-q3", type: "true-false", prompt: "True or false: if someone says “dame banda”, you should keep pushing harder.", options: ["True", "False"], correctAnswer: "False", explanation: "Dame banda means leave me alone, so the respectful move is to stop.", points: 1, skillTag: "boundary" },
  { id: "dominican-b2-flirty-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Stop bothering me.", wordBank: ["No", "me", "fuñas."], correctAnswer: "No me fuñas.", explanation: "Fuñir means to bother or pester someone.", points: 1, skillTag: "phrase-building" },
  { id: "dominican-b2-flirty-reading-q5", type: "multiple-choice", prompt: "Which phrase means the person is restless or cannot sit still?", options: ["estar como cucaracha con mecha", "dar cotorra", "no ser maíz", "estar a paños y manteles"], correctAnswer: "estar como cucaracha con mecha", explanation: "This vivid phrase describes restless or anxious energy.", points: 1, skillTag: "imagery" },
];

export const dominicanSpanishB2FlirtyBanterReadingInterestReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Dominican B2 Reading: Cotorra con Banda",
  subtitle: "A synced Spanish reading about Dominican sweet talk, signs of interest, joking, and knowing when to back off.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Dominican Spanish", "B2", "reading", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: flirtingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Dominican B2 flirty banter and reading interest vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const dominicanSpanishB2FlirtyBanterReadingInterestQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Dominican Spanish B2: Flirty Banter & Reading Interest Quiz",
  subtitle: "Choose the right Dominican phrase for sweet talk, signs of interest, joking, excitement, and boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Dominican Spanish", "B2", "quiz", "flirting", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Dominican B2 phrases for flirty banter, reading interest, and backing off respectfully.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "dominican-b2-flirty-quiz-1", type: "multiple-choice", prompt: "Someone is charming another person with words. Which phrase fits?", options: ["Le está dando cotorra", "Dame banda", "Está como cucaracha con mecha", "No me fuñas"], correctAnswer: "Le está dando cotorra", explanation: "Dar cotorra means to sweet-talk or charm someone with words.", points: 1, skillTag: "sweet-talk" },
      { id: "dominican-b2-flirty-quiz-2", type: "fill-blank", prompt: "Complete: Me está tirando los ____.", nativePrompt: "He/she is hitting on me.", correctAnswer: "perros", explanation: "Tirarle los perros means to hit on someone openly.", points: 1, skillTag: "flirting" },
      { id: "dominican-b2-flirty-quiz-3", type: "multiple-choice", prompt: "Someone is playing along with your flirting. Which phrase fits?", options: ["Me sigue el juego", "Dale banda", "No es maíz", "Se quilló"], correctAnswer: "Me sigue el juego", explanation: "Seguirle el juego means to play along.", points: 1, skillTag: "signal" },
      { id: "dominican-b2-flirty-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "That girl isn’t easy to win over.", wordBank: ["Esa", "muchacha", "no", "es", "maíz."], correctAnswer: "Esa muchacha no es maíz.", explanation: "No ser maíz means not being easy to win over.", points: 1, skillTag: "phrase-building" },
      { id: "dominican-b2-flirty-quiz-5", type: "true-false", prompt: "True or false: “dame banda” means leave me alone.", options: ["True", "False"], correctAnswer: "True", explanation: "Dame banda is a direct request to stop bothering or pursuing.", points: 1, skillTag: "boundary" },
      { id: "dominican-b2-flirty-quiz-6", type: "multiple-choice", prompt: "You want to say someone looks amazing. Which phrase fits?", options: ["Ese look está por la maceta", "No te quilles", "Dale banda", "Haz cocote"], correctAnswer: "Ese look está por la maceta", explanation: "Estar por la maceta means to be excellent or look amazing.", points: 1, skillTag: "compliment" },
      { id: "dominican-b2-flirty-quiz-7", type: "fill-blank", prompt: "Complete: No me ____.", nativePrompt: "Stop bothering me.", correctAnswer: "fuñas", explanation: "Fuñir means to bother or pester someone.", points: 1, skillTag: "limit" },
      { id: "dominican-b2-flirty-quiz-8", type: "multiple-choice", prompt: "Someone is ridiculously excited. Which phrase fits?", options: ["Está que baila solo", "No es maíz", "Da señales", "Dame banda"], correctAnswer: "Está que baila solo", explanation: "Estar que baila solo means to be over the moon or visibly excited.", points: 1, skillTag: "emotion" },
      { id: "dominican-b2-flirty-quiz-9", type: "true-false", prompt: "True or false: “coger los mangos bajitos” means going for the easy option.", options: ["True", "False"], correctAnswer: "True", explanation: "It means taking the easy opportunity or easy route.", points: 1, skillTag: "idiom" },
      { id: "dominican-b2-flirty-quiz-10", type: "multiple-choice", prompt: "Two people are clearly very close and getting along. Which phrase fits?", options: ["Están a paños y manteles", "No te quilles", "Dame banda", "No me fuñas"], correctAnswer: "Están a paños y manteles", explanation: "Estar a paños y manteles means to be very close or familiar.", points: 1, skillTag: "closeness" },
      pairQuestion("dominican-b2-flirty-pairs-1", "Match sweet-talk and interest phrases.", flirtingVocab.slice(0, 8)),
      pairQuestion("dominican-b2-flirty-pairs-2", "Match signs, closeness, and boundary phrases.", flirtingVocab.slice(8, 16)),
      pairQuestion("dominican-b2-flirty-pairs-3", "Match joking, excitement, and idiom phrases.", flirtingVocab.slice(16)),
    ],
  },
};
