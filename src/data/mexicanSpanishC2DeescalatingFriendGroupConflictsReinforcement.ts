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

const courseId = "mexican-spanish-c2-deescalating-friend-group-conflicts";
const skoolSectionName = "Mexican Spanish - C2 De-escalating Friend-Group Conflicts";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const conflictVocab: VocabItem[] = [
  { id: "meter-cizana", term: "meter cizaña", meaning: "to stir trouble / sow discord", matchingMeaning: "to stir trouble", note: "Used when someone plants tension between people instead of helping.", example: "No metas cizaña entre ellos.", translation: "Don’t stir trouble between them.", starred: true },
  { id: "echarle-tierra", term: "echarle tierra a alguien", meaning: "to bad-mouth someone", matchingMeaning: "to bad-mouth someone", note: "Informal phrase for damaging someone’s image through negative comments.", example: "No le eches tierra si no está aquí para responder.", translation: "Don’t bad-mouth him if he’s not here to respond.", starred: true },
  { id: "cargarle-el-muerto", term: "cargarle el muerto a alguien", meaning: "to dump the blame on someone", matchingMeaning: "to dump the blame on someone", note: "Strong idiom for unfairly putting responsibility on one person.", example: "No le carguen el muerto a Pau por todo.", translation: "Don’t dump all the blame on Pau.", starred: true },
  { id: "tirar-piedra-esconder-mano", term: "tirar la piedra y esconder la mano", meaning: "to cause trouble and then pretend you had nothing to do with it", matchingMeaning: "to cause trouble and hide involvement", note: "Classic expression for indirect provocation plus denial.", example: "Eso fue tirar la piedra y esconder la mano.", translation: "That was causing trouble and then pretending you had nothing to do with it.", starred: true },
  { id: "armar-la-bronca", term: "armar la bronca", meaning: "to start a fight / create a problem", matchingMeaning: "to start a fight", note: "Bronca is a conflict, fight, or tense problem.", example: "No armes la bronca en el grupo.", translation: "Don’t start a fight in the group.", starred: true },
  { id: "echarse-la-bolita", term: "echarse la bolita", meaning: "to pass the blame back and forth", matchingMeaning: "to pass the blame back and forth", note: "Used when nobody takes responsibility and everyone deflects.", example: "Ya llevan media hora echándose la bolita.", translation: "They’ve been passing the blame around for half an hour.", starred: true },
  { id: "sacar-trapitos-sol", term: "sacar los trapitos al sol", meaning: "to air someone’s dirty laundry", matchingMeaning: "to air dirty laundry", note: "Means exposing private issues publicly.", example: "No saquen los trapitos al sol en el chat.", translation: "Don’t air dirty laundry in the chat.", starred: true },
  { id: "echar-de-cabeza", term: "echar de cabeza a alguien", meaning: "to expose / rat someone out", matchingMeaning: "to rat someone out", note: "Can be protective truth-telling or disloyal exposure depending on context.", example: "No la eches de cabeza si lo puedes hablar aparte.", translation: "Don’t rat her out if you can talk about it separately.", starred: true },
  { id: "hacerla-de-pedo", term: "hacerla de pedo", meaning: "to make a huge fuss / start shit — vulgar", matchingMeaning: "to make a huge fuss", note: "Very informal and vulgar; useful to recognize, but avoid in polite settings.", example: "No quiero hacerla de pedo, pero esto sí estuvo mal.", translation: "I don’t want to make a huge fuss, but this really was wrong.", starred: true },
  { id: "echar-mas-lena", term: "echarle más leña al fuego", meaning: "to add fuel to the fire", matchingMeaning: "to add fuel to the fire", note: "A de-escalation staple: don’t intensify a conflict that is already hot.", example: "Ese audio solo le echa más leña al fuego.", translation: "That voice note only adds fuel to the fire.", starred: true },
  { id: "calentarle-la-cabeza", term: "calentarle la cabeza a alguien", meaning: "to fill someone’s head with ideas / rile them up", matchingMeaning: "to rile someone up", note: "Used when someone influences another person into anger or suspicion.", example: "No le calientes la cabeza con versiones incompletas.", translation: "Don’t rile her up with incomplete versions.", starred: true },
  { id: "quedar-bien-dios-diablo", term: "quedar bien con Dios y con el diablo", meaning: "to try to stay on good terms with both opposing sides", matchingMeaning: "to stay on good terms with both sides", note: "Critical phrase for false neutrality in a conflict.", example: "No puedes quedar bien con Dios y con el diablo todo el tiempo.", translation: "You can’t stay on good terms with both sides all the time.", starred: true },
  { id: "hablar-derecho", term: "hablar derecho", meaning: "to speak plainly / be straight with someone", matchingMeaning: "to speak plainly", note: "Direct Mexican phrase for dropping hints and speaking honestly.", example: "Mejor hablemos derecho antes de que crezca.", translation: "Let’s speak plainly before this grows.", starred: true },
  { id: "no-comprar-broncas-ajenas", term: "no comprar broncas ajenas", meaning: "don’t take on other people’s problems/fights", matchingMeaning: "don’t take on other people’s fights", note: "Very useful for refusing to be recruited into drama.", example: "Yo no voy a comprar broncas ajenas.", translation: "I’m not going to take on other people’s fights.", starred: true },
  { id: "poner-cartas-mesa", term: "poner las cartas sobre la mesa", meaning: "to put everything out in the open", matchingMeaning: "to put everything out in the open", note: "Useful for transparent group repair.", example: "Pongamos las cartas sobre la mesa sin atacar.", translation: "Let’s put everything out in the open without attacking.", starred: true },
  { id: "hacerse-cargo", term: "hacerse cargo de lo que te toca", meaning: "to take responsibility for your part", matchingMeaning: "to take responsibility for your part", note: "Mature accountability phrase for group conflict.", example: "Cada quien tiene que hacerse cargo de lo que le toca.", translation: "Everyone has to take responsibility for their part.", starred: true },
  { id: "dar-la-cara", term: "dar la cara", meaning: "to face the situation / own what you did", matchingMeaning: "to face the situation", note: "Means showing up and taking responsibility instead of hiding.", example: "Si mandaste el mensaje, da la cara.", translation: "If you sent the message, face the situation.", starred: true },
  { id: "no-hacer-bandos", term: "no hacer bandos", meaning: "not to split into opposing sides", matchingMeaning: "not to split into sides", note: "Key phrase for de-escalating friend-group conflict.", example: "No hagamos bandos por algo que se puede hablar.", translation: "Let’s not split into sides over something we can talk through.", starred: true },
  { id: "llevar-fiesta-paz", term: "llevar la fiesta en paz", meaning: "to keep the peace / avoid unnecessary conflict", matchingMeaning: "to keep the peace", note: "Classic Mexican phrase for choosing calm and coexistence.", example: "Quiero llevar la fiesta en paz, no tapar el problema.", translation: "I want to keep the peace, not hide the problem.", starred: true },
  { id: "no-engancharse", term: "no engancharse", meaning: "not to get sucked into the argument/provocation", matchingMeaning: "not to get sucked into the argument", note: "Useful when someone is baiting you into drama.", example: "No te enganches con indirectas.", translation: "Don’t get sucked into indirect jabs.", starred: true },
  { id: "ahi-muere", term: "ahí muere", meaning: "let it end there / drop it / that’s the end of it", matchingMeaning: "let it end there", note: "Very Mexican way to close a minor conflict or stop escalation.", example: "Se aclaró el punto y ahí muere.", translation: "The point was clarified and that’s where it ends.", starred: true },
  { id: "ya-estuvo", term: "ya estuvo", meaning: "enough already / that’s enough", matchingMeaning: "that’s enough", note: "Can be firm; useful when the conflict needs a hard stop.", example: "Ya estuvo, no sigan subiendo audios.", translation: "That’s enough, stop uploading voice notes.", starred: true },
  { id: "nomas", term: "nomás", meaning: "just / only — extremely common conversational Mexican usage", matchingMeaning: "just / only", note: "Mexican rhythm word that softens or limits a statement.", example: "Dilo claro, nomás sin atacar.", translation: "Say it clearly, just without attacking.", starred: true },
  { id: "cada-quien-dijo-lo-suyo", term: "cada quien dijo lo suyo", meaning: "everyone said their piece", matchingMeaning: "everyone said their piece", note: "Useful for closing a group discussion after everyone has spoken.", example: "Cada quien dijo lo suyo; ya no hace falta repetir.", translation: "Everyone said their piece; there’s no need to repeat it.", starred: true },
  { id: "cada-quien-se-haga-cargo", term: "cada quien se haga cargo de lo suyo", meaning: "everyone should own their part", matchingMeaning: "everyone should own their part", note: "Group accountability without dumping blame on one person.", example: "Cada quien se haga cargo de lo suyo y seguimos.", translation: "Everyone should own their part and we move on.", starred: true },
];

const highlightMap = Object.fromEntries(conflictVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = conflictVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC2DeescalatingFriendGroupConflictsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C2: De-escalating Friend-Group Conflicts Flashcards",
  subtitle: "Advanced Mexican phrases for blame, gossip, taking sides, accountability, and keeping group conflict from exploding.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "flashcards", "conflict", "de-escalation"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: conflictVocab.map(cardFromVocab) },
};

export const mexicanSpanishC2DeescalatingFriendGroupConflictsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C2 Sentence Builder: De-escalating Friend-Group Conflicts",
  subtitle: "Build high-stakes Mexican phrases for stopping blame games, naming gossip, and restoring accountability.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c2", "sentence-builder", "conflict", "friends"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note calming down a friend-group conflict without taking sides or hiding the real issue.",
    stages: [
      stage("stage-1", "Call out trouble-stirring", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "Don’t stir trouble or bad-mouth someone who isn’t here.", "No metas cizaña ni le eches tierra a alguien que no está aquí.", "This stops gossip before the conflict grows.", breakdown([["don’t stir trouble", "no metas cizaña"], ["or bad-mouth someone", "ni le eches tierra a alguien"], ["who isn’t here", "que no está aquí"]])),
      stage("stage-2", "Reject blame dumping", sentenceVocab.slice(2, 7), sentenceVocab.slice(0, 7), "Don’t dump the blame on her while everyone passes it back and forth.", "No le carguen el muerto mientras todos se echan la bolita.", "This names the blame game without choosing a side.", breakdown([["don’t dump the blame on her", "no le carguen el muerto"], ["while everyone", "mientras todos"], ["passes it back and forth", "se echan la bolita"]])),
      stage("stage-3", "Stop hidden provocation", sentenceVocab.slice(3, 10), sentenceVocab.slice(0, 10), "You can’t cause trouble and hide your hand, then make a huge fuss.", "No puedes tirar la piedra y esconder la mano, y luego hacerla de pedo.", "This calls out indirect provocation and public escalation.", breakdown([["cause trouble and hide your hand", "tirar la piedra y esconder la mano"], ["then", "luego"], ["make a huge fuss", "hacerla de pedo", "Very informal/vulgar."]])),
      stage("stage-4", "Avoid airing dirty laundry", sentenceVocab.slice(6, 11), sentenceVocab.slice(0, 11), "If we air dirty laundry, we only add fuel to the fire.", "Si sacamos los trapitos al sol, nomás le echamos más leña al fuego.", "This explains why private details should stay out of the group chat.", breakdown([["air dirty laundry", "sacamos los trapitos al sol"], ["just", "nomás"], ["add fuel to the fire", "echamos más leña al fuego"]])),
      stage("stage-5", "Don’t recruit sides", sentenceVocab.slice(10, 15), sentenceVocab.slice(0, 15), "Don’t rile her up; I’m not taking on other people’s fights.", "No le calientes la cabeza; yo no voy a comprar broncas ajenas.", "This refuses to be pulled into drama.", breakdown([["don’t rile her up", "no le calientes la cabeza"], ["I’m not going to", "yo no voy a"], ["take on other people’s fights", "comprar broncas ajenas"]])),
      stage("stage-6", "Push for transparent repair", sentenceVocab.slice(12, 17), sentenceVocab.slice(0, 17), "Let’s speak plainly and put everything out in the open.", "Hablemos derecho y pongamos las cartas sobre la mesa.", "This turns gossip into direct repair.", breakdown([["let’s speak plainly", "hablemos derecho"], ["put everything out in the open", "pongamos las cartas sobre la mesa"]])),
      stage("stage-7", "Ask for ownership", sentenceVocab.slice(15, 20), sentenceVocab.slice(0, 20), "Everyone should take responsibility for their part and not split into sides.", "Cada quien se haga cargo de lo suyo y no hagamos bandos.", "This creates accountability without polarizing the group.", breakdown([["everyone should own their part", "cada quien se haga cargo de lo suyo"], ["and", "y"], ["let’s not split into sides", "no hagamos bandos"]])),
      stage("stage-8", "End the loop", sentenceVocab.slice(19), sentenceVocab, "Everyone said their piece; that’s enough, let it end there.", "Cada quien dijo lo suyo; ya estuvo, ahí muere.", "This closes the conflict firmly after people have spoken.", breakdown([["everyone said their piece", "cada quien dijo lo suyo"], ["that’s enough", "ya estuvo"], ["let it end there", "ahí muere"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-conflict-story-q1", type: "multiple-choice", prompt: "After message 3, what is Renata worried about?", options: ["Someone is stirring trouble in the friend group", "Someone is late for work", "Someone wants to flirt", "Someone ordered the wrong food"], correctAnswer: "Someone is stirring trouble in the friend group", explanation: "Renata says alguien está metiendo cizaña.", points: 1, skillTag: "context" },
  { id: "mexican-c2-conflict-story-q2", type: "multiple-choice", prompt: "After message 6, what does Renata say about blaming Pau?", options: ["They are dumping the blame on Pau", "Pau solved everything alone", "Pau started a party", "Nobody mentioned Pau"], correctAnswer: "They are dumping the blame on Pau", explanation: "She says le están cargando el muerto a Pau.", points: 1, skillTag: "blame" },
  { id: "mexican-c2-conflict-story-q3", type: "true-false", prompt: "After message 9, true or false: Iván thinks someone caused trouble and then acted innocent.", options: ["True", "False"], correctAnswer: "True", explanation: "He says eso fue tirar la piedra y esconder la mano.", points: 1, skillTag: "inference" },
  { id: "mexican-c2-conflict-story-q4", type: "multiple-choice", prompt: "After message 12, why does Renata not want screenshots in the chat?", options: ["They would air dirty laundry and add fuel to the fire", "They would fix the issue instantly", "They would make everyone laugh", "They would help plan dinner"], correctAnswer: "They would air dirty laundry and add fuel to the fire", explanation: "Renata mentions sacar los trapitos al sol and echarle más leña al fuego.", points: 1, skillTag: "de-escalation" },
  { id: "mexican-c2-conflict-story-q5", type: "multiple-choice", prompt: "After message 15, what does Iván refuse to do?", options: ["Take on other people’s fights", "Speak honestly", "Keep the peace", "Face the situation"], correctAnswer: "Take on other people’s fights", explanation: "He says no voy a comprar broncas ajenas.", points: 1, skillTag: "boundary" },
  { id: "mexican-c2-conflict-story-q6", type: "multiple-choice", prompt: "After message 18, what repair strategy do they choose?", options: ["Speak plainly and put everything on the table", "Hide the problem", "Make two opposing sides", "Send more screenshots"], correctAnswer: "Speak plainly and put everything on the table", explanation: "They use hablar derecho and poner las cartas sobre la mesa.", points: 1, skillTag: "repair" },
  { id: "mexican-c2-conflict-story-q7", type: "true-false", prompt: "After message 21, true or false: Renata says they should split into sides.", options: ["True", "False"], correctAnswer: "False", explanation: "She says no hagamos bandos.", points: 1, skillTag: "group-dynamics" },
  { id: "mexican-c2-conflict-story-q8", type: "multiple-choice", prompt: "After message 24, what does Iván want people to do?", options: ["Own their part", "Start another fight", "Bad-mouth Pau", "Hide their messages"], correctAnswer: "Own their part", explanation: "He says cada quien se haga cargo de lo suyo.", points: 1, skillTag: "accountability" },
  { id: "mexican-c2-conflict-story-q9", type: "multiple-choice", prompt: "After message 27, why does Renata say “ya estuvo”?", options: ["Enough has been said and they need to stop the loop", "The party just started", "They forgot the issue", "Pau asked for money"], correctAnswer: "Enough has been said and they need to stop the loop", explanation: "She says cada quien dijo lo suyo and ya estuvo.", points: 1, skillTag: "closure" },
  { id: "mexican-c2-conflict-story-q10", type: "multiple-choice", prompt: "After message 30, what is the final agreement?", options: ["Talk directly, stop taking sides, and let the conflict end there", "Choose a side publicly", "Expose private messages", "Keep arguing all night"], correctAnswer: "Talk directly, stop taking sides, and let the conflict end there", explanation: "They close with hablar derecho, no hacer bandos, and ahí muere.", points: 1, skillTag: "resolution" },
];

export const mexicanSpanishC2DeescalatingFriendGroupConflictsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C2 Story: The Screenshot War",
  subtitle: "Renata and Iván try to calm a friend-group conflict before screenshots, blame, and side-taking blow it up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "story", "conflict", "friends"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ivan", name: "Iván", initials: "I", side: "left", color: "blue" },
      { id: "renata", name: "Renata", initials: "R", side: "right", color: "violet" },
    ],
    messages: [
      message("m1", "renata", "Iván, ¿viste el chat del grupo?", "Iván, did you see the group chat?", []),
      message("m2", "ivan", "Sí. Ya se está poniendo rarísimo.", "Yeah. It’s getting really weird now.", []),
      message("m3", "renata", "Alguien está metiendo cizaña entre Pau y Fer, y todos están cayendo.", "Someone is stirring trouble between Pau and Fer, and everyone is falling for it.", ["meter cizaña"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "ivan", "También le están echando tierra a Fer desde que no llegó.", "They’re also bad-mouthing Fer since he didn’t show up.", ["echarle tierra a alguien"]),
      message("m5", "renata", "Sí, pero nadie sabe la versión completa.", "Yes, but nobody knows the full version.", []),
      message("m6", "renata", "Y aun así ya le están cargando el muerto a Pau.", "And even so, they’re already dumping the blame on Pau.", ["cargarle el muerto a alguien"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "ivan", "Lo peor es que Memo soltó el comentario y luego se hizo inocente.", "The worst part is Memo dropped the comment and then acted innocent.", []),
      message("m8", "renata", "Eso fue lo que prendió todo.", "That’s what lit everything up.", []),
      message("m9", "ivan", "Sí, eso fue tirar la piedra y esconder la mano.", "Yeah, that was causing trouble and pretending he had nothing to do with it.", ["tirar la piedra y esconder la mano"]),
      message("m10", "renata", "Si siguen así, van a armar la bronca en serio.", "If they keep going like this, they’re going to start a real fight.", ["armar la bronca"]),
      message("m11", "ivan", "Y ahorita todos se están echando la bolita.", "And right now everyone is passing the blame around.", ["echarse la bolita"]),
      message("m12", "renata", "Por eso no quiero que suban capturas. Eso es sacar los trapitos al sol y echarle más leña al fuego.", "That’s why I don’t want them uploading screenshots. That’s airing dirty laundry and adding fuel to the fire.", ["sacar los trapitos al sol", "echarle más leña al fuego"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "ivan", "Lau dice que va a echar de cabeza a Memo.", "Lau says she’s going to rat Memo out.", ["echar de cabeza a alguien"]),
      message("m14", "renata", "Si lo hace en el grupo, van a hacerla de pedo todos.", "If she does it in the group, everyone is going to make a huge fuss.", ["hacerla de pedo"]),
      message("m15", "ivan", "Yo no voy a comprar broncas ajenas. Menos si no tengo todo el contexto.", "I’m not going to take on other people’s fights. Especially if I don’t have all the context.", ["no comprar broncas ajenas"]),
      message("m16", "renata", "Exacto. Además Sandra le está calentando la cabeza a Pau.", "Exactly. Besides, Sandra is riling Pau up.", ["calentarle la cabeza a alguien"]),
      message("m17", "ivan", "Y Memo quiere quedar bien con Dios y con el diablo.", "And Memo wants to stay on good terms with both sides.", ["quedar bien con Dios y con el diablo"]),
      message("m18", "renata", "Mejor hablemos derecho y pongamos las cartas sobre la mesa.", "Let’s speak plainly and put everything out in the open.", ["hablar derecho", "poner las cartas sobre la mesa"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "ivan", "¿Pero en el grupo o aparte?", "But in the group or separately?", []),
      message("m20", "renata", "Primero aparte. En el grupo todos actúan para público.", "Separately first. In the group everyone performs for an audience.", []),
      message("m21", "renata", "Y no hagamos bandos. Si se parte el grupo, esto se vuelve peor.", "And let’s not split into sides. If the group splits, this gets worse.", ["no hacer bandos"]),
      message("m22", "ivan", "Va. Hay que llevar la fiesta en paz, pero no tapar lo que pasó.", "Okay. We need to keep the peace, but not hide what happened.", ["llevar la fiesta en paz"]),
      message("m23", "renata", "Sí. Paz no es fingir que nadie la regó.", "Yes. Peace doesn’t mean pretending nobody messed up.", []),
      message("m24", "ivan", "Cada quien se haga cargo de lo suyo. Si Memo metió cizaña, que dé la cara.", "Everyone should own their part. If Memo stirred trouble, he should face it.", ["cada quien se haga cargo de lo suyo", "dar la cara", "meter cizaña"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "renata", "Y Pau también puede decir lo suyo sin engancharse.", "And Pau can also say her piece without getting sucked in.", ["no engancharse"]),
      message("m26", "ivan", "Voy a mandar: 'Díganlo claro, nomás sin ataques'.", "I’m going to send: 'Say it clearly, just without attacks.'", ["nomás"]),
      message("m27", "renata", "Pon también: 'cada quien dijo lo suyo; ya estuvo'.", "Also put: 'everyone said their piece; that’s enough.'", ["cada quien dijo lo suyo", "ya estuvo"]),
      message("m28", "ivan", "Y cierro con 'ahí muere' para que no sigan repitiendo lo mismo.", "And I’ll close with 'let it end there' so they don’t keep repeating the same thing.", ["ahí muere"]),
      message("m29", "renata", "Perfecto. Hablar derecho, no hacer bandos, y que cada quien dé la cara.", "Perfect. Speak plainly, don’t split into sides, and everyone should face their part.", ["hablar derecho", "no hacer bandos", "dar la cara"]),
      message("m30", "ivan", "Va. Lo mando tranquilo: si ya se aclaró, ahí muere.", "Okay. I’ll send it calmly: if it’s already been clarified, let it end there.", ["ahí muere"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-c2-conflict-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: conflictVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: conflictVocab.map((item) => item.term),
      grammarPatterns: [
        "Naming escalation: meter cizaña, armar la bronca, echarle más leña al fuego.",
        "Stopping blame games: cargarle el muerto, echarse la bolita, hacerse cargo.",
        "Repairing group dynamics: hablar derecho, no hacer bandos, ahí muere.",
      ],
      speakingPrompts: [
        "Stop a friend from stirring trouble between two people.",
        "Tell a group not to air private details in a public chat.",
        "Close a conflict after everyone has said their piece.",
      ],
    },
    completionTask: {
      title: "Your friend-group de-escalation note",
      instructions: "Record a 60-second Mexican Spanish voice note calming down a friend-group conflict. Name the blame game, stop side-taking, and propose a direct repair.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En un conflicto de grupo, la chispa casi nunca es una sola frase. Alguien puede «meter cizaña», otro puede «echarle tierra a alguien» y de pronto todos sienten que tienen que opinar. En C2, entender el español mexicano implica leer quién está calmando el problema y quién lo está alimentando.", translation: "In a group conflict, the spark is almost never just one phrase. Someone can meter cizaña, another can echarle tierra a alguien, and suddenly everyone feels they have to comment. At C2, understanding Mexican Spanish means reading who is calming the problem and who is feeding it.", highlights: highlights(["meter cizaña", "echarle tierra a alguien"]), shadowLine: "No metas cizaña ni le eches tierra a alguien." },
  { id: "p2", text: "Cuando nadie quiere asumir responsabilidad, aparece «echarse la bolita». Si además todos culpan a una sola persona, le están «cargando el muerto». Esta dinámica es peligrosa porque simplifica demasiado la historia: convierte un problema compartido en una condena para alguien.", translation: "When nobody wants to take responsibility, echarse la bolita appears. If everyone also blames one single person, they are cargándole el muerto. This dynamic is dangerous because it oversimplifies the story: it turns a shared problem into a sentence for one person.", highlights: highlights(["echarse la bolita", "cargarle el muerto a alguien"]), shadowLine: "No se echen la bolita ni le carguen el muerto a uno solo." },
  { id: "p3", text: "«Tirar la piedra y esconder la mano» describe a quien provoca y luego se hace inocente. A veces esa persona no grita ni insulta; solo suelta una frase para «armar la bronca». Si los demás no lo detectan, terminan peleándose por una tensión que alguien sembró desde atrás.", translation: "Tirar la piedra y esconder la mano describes someone who provokes and then acts innocent. Sometimes that person does not shout or insult; they simply drop a phrase to armar la bronca. If the others do not detect it, they end up fighting over tension someone planted from behind.", highlights: highlights(["tirar la piedra y esconder la mano", "armar la bronca"]), shadowLine: "Eso fue tirar la piedra y esconder la mano." },
  { id: "p4", text: "En los chats de amigos, las capturas pueden destruir la calma. «Sacar los trapitos al sol» y «echar de cabeza a alguien» pueden sentirse justos en el momento, pero también pueden «echarle más leña al fuego». Y si alguien dice «no quiero hacerla de pedo», recuerda que esa frase es vulgar y muy informal.", translation: "In friend group chats, screenshots can destroy calm. Sacar los trapitos al sol and echar de cabeza a alguien can feel fair in the moment, but they can also echarle más leña al fuego. And if someone says no quiero hacerla de pedo, remember that phrase is vulgar and very informal.", highlights: highlights(["sacar los trapitos al sol", "echar de cabeza a alguien", "echarle más leña al fuego", "hacerla de pedo"]), shadowLine: "No saques los trapitos al sol; le echas más leña al fuego." },
  { id: "p5", text: "Otra forma de escalar es «calentarle la cabeza a alguien» con una versión incompleta. También pasa cuando alguien intenta «quedar bien con Dios y con el diablo»: no toma postura clara, pero queda bien con todos. Para no caer ahí, sirve decir «yo no compro broncas ajenas».", translation: "Another way to escalate is calentarle la cabeza a alguien with an incomplete version. It also happens when someone tries to quedar bien con Dios y con el diablo: they take no clear position, but try to stay good with everyone. To avoid falling into that, it helps to say yo no compro broncas ajenas.", highlights: highlights(["calentarle la cabeza a alguien", "quedar bien con Dios y con el diablo", "no comprar broncas ajenas"]), shadowLine: "No le calientes la cabeza; yo no compro broncas ajenas." },
  { id: "p6", text: "La salida madura empieza con «hablar derecho» y «poner las cartas sobre la mesa». No significa atacar; significa dejar de mandar indirectas. Después, cada persona necesita «hacerse cargo de lo que le toca» y, si participó en el problema, «dar la cara».", translation: "The mature way out starts with hablar derecho and poner las cartas sobre la mesa. It does not mean attacking; it means stopping the indirect comments. Then each person needs hacerse cargo de lo que le toca and, if they participated in the problem, dar la cara.", highlights: highlights(["hablar derecho", "poner las cartas sobre la mesa", "hacerse cargo de lo que te toca", "dar la cara"]), shadowLine: "Hablemos derecho y pongamos las cartas sobre la mesa." },
  { id: "p7", text: "Para cuidar al grupo, conviene «no hacer bandos». Puedes «llevar la fiesta en paz» sin fingir que no pasó nada. También puedes «no engancharte» cuando alguien busca una reacción. En México, ese equilibrio entre claridad y calma es una habilidad social muy fina.", translation: "To protect the group, it helps to no hacer bandos. You can llevar la fiesta en paz without pretending nothing happened. You can also no engancharte when someone is looking for a reaction. In Mexico, that balance between clarity and calm is a very fine social skill.", highlights: highlights(["no hacer bandos", "llevar la fiesta en paz", "no engancharse"]), shadowLine: "No hagamos bandos; llevemos la fiesta en paz." },
  { id: "p8", text: "El cierre también tiene lenguaje. «Cada quien dijo lo suyo» reconoce que todos hablaron. «Ya estuvo» pone un límite. «Ahí muere» cierra el ciclo. Y «nomás» puede suavizar la instrucción: díganlo claro, nomás sin atacar. Así el conflicto no se esconde, pero tampoco se vuelve espectáculo.", translation: "The closing also has language. Cada quien dijo lo suyo recognizes that everyone spoke. Ya estuvo sets a limit. Ahí muere closes the cycle. And nomás can soften the instruction: say it clearly, just without attacking. This way, the conflict is not hidden, but it also does not become a spectacle.", highlights: highlights(["cada quien dijo lo suyo", "ya estuvo", "ahí muere", "nomás", "cada quien se haga cargo de lo suyo"]), shadowLine: "Cada quien dijo lo suyo; ya estuvo, ahí muere." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-conflict-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["De-escalating friend-group conflict in Mexican Spanish", "Planning a casual date", "Complaining about service", "Understanding public transport"], correctAnswer: "De-escalating friend-group conflict in Mexican Spanish", explanation: "The reading focuses on gossip, blame, screenshots, side-taking, and repair.", points: 1, skillTag: "gist" },
  { id: "mexican-c2-conflict-reading-q2", type: "multiple-choice", prompt: "Which phrase means to pass blame back and forth?", options: ["Echarse la bolita", "Ahí muere", "Llevar la fiesta en paz", "Nomás"], correctAnswer: "Echarse la bolita", explanation: "Echarse la bolita describes passing responsibility around.", points: 1, skillTag: "meaning" },
  { id: "mexican-c2-conflict-reading-q3", type: "true-false", prompt: "True or false: The reading describes “hacerla de pedo” as vulgar and very informal.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explicitly marks it as vulgar and very informal.", points: 1, skillTag: "register" },
  { id: "mexican-c2-conflict-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Let’s speak plainly.", wordBank: ["Hablemos", "derecho."], correctAnswer: "Hablemos derecho.", explanation: "Hablar derecho means to speak plainly or directly.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-c2-conflict-reading-q5", type: "multiple-choice", prompt: "Which phrase closes the conflict cycle?", options: ["Ahí muere", "Meter cizaña", "Echarle tierra", "Calentarle la cabeza"], correctAnswer: "Ahí muere", explanation: "Ahí muere means let it end there or drop it.", points: 1, skillTag: "closure" },
];

export const mexicanSpanishC2DeescalatingFriendGroupConflictsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C2 Reading: Cómo Bajarle a una Bronca de Grupo",
  subtitle: "A synced Mexican Spanish reading about gossip, blame games, side-taking, accountability, and closing conflict cleanly.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "reading", "conflict", "de-escalation"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: conflictVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican C2 friend-group conflict vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishC2DeescalatingFriendGroupConflictsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish C2: De-escalating Friend-Group Conflicts Quiz",
  subtitle: "Choose the right Mexican phrase for gossip, blame, screenshots, side-taking, accountability, and closure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "quiz", "conflict", "friends"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice C2 Mexican Spanish phrases for calming friend-group conflict without pretending the issue does not exist.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-c2-conflict-quiz-1", type: "multiple-choice", prompt: "Someone is planting tension between two friends. What fits?", options: ["Meter cizaña", "Ahí muere", "Dar la cara", "Nomás"], correctAnswer: "Meter cizaña", explanation: "Meter cizaña means to stir trouble or sow discord.", points: 1, skillTag: "gossip" },
      { id: "mexican-c2-conflict-quiz-2", type: "fill-blank", prompt: "Complete: No le carguen el ____.", nativePrompt: "Don’t dump the blame on him/her.", correctAnswer: "muerto", explanation: "Cargarle el muerto means to dump the blame on someone.", points: 1, skillTag: "blame" },
      { id: "mexican-c2-conflict-quiz-3", type: "multiple-choice", prompt: "Someone provokes conflict and then acts innocent. Which phrase fits?", options: ["Tirar la piedra y esconder la mano", "Llevar la fiesta en paz", "No hacer bandos", "Cada quien dijo lo suyo"], correctAnswer: "Tirar la piedra y esconder la mano", explanation: "This phrase describes causing trouble and hiding your involvement.", points: 1, skillTag: "provocation" },
      { id: "mexican-c2-conflict-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Let’s put everything on the table.", wordBank: ["Pongamos", "las", "cartas", "sobre", "la", "mesa."], correctAnswer: "Pongamos las cartas sobre la mesa.", explanation: "This means to put everything out in the open.", points: 1, skillTag: "repair" },
      { id: "mexican-c2-conflict-quiz-5", type: "true-false", prompt: "True or false: “echarle más leña al fuego” means to add fuel to the fire.", options: ["True", "False"], correctAnswer: "True", explanation: "It describes making an already tense conflict worse.", points: 1, skillTag: "escalation" },
      { id: "mexican-c2-conflict-quiz-6", type: "multiple-choice", prompt: "You refuse to get dragged into a conflict that is not yours. What fits?", options: ["No compro broncas ajenas", "Saco los trapitos al sol", "Le echo tierra", "Armo la bronca"], correctAnswer: "No compro broncas ajenas", explanation: "No comprar broncas ajenas means not taking on other people’s fights.", points: 1, skillTag: "boundary" },
      { id: "mexican-c2-conflict-quiz-7", type: "fill-blank", prompt: "Complete: Cada quien se haga cargo de lo ____.", nativePrompt: "Everyone should own their part.", correctAnswer: "suyo", explanation: "Cada quien se haga cargo de lo suyo asks everyone to take responsibility for their part.", points: 1, skillTag: "accountability" },
      { id: "mexican-c2-conflict-quiz-8", type: "multiple-choice", prompt: "You want the group not to split into opposing sides. What fits?", options: ["No hagamos bandos", "Hagámosla de pedo", "Echémosle tierra", "Calienta la cabeza"], correctAnswer: "No hagamos bandos", explanation: "No hacer bandos means not splitting into sides.", points: 1, skillTag: "group-dynamics" },
      { id: "mexican-c2-conflict-quiz-9", type: "true-false", prompt: "True or false: “ahí muere” can mean let it end there or drop it.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a Mexican closing phrase for ending the matter.", points: 1, skillTag: "closure" },
      { id: "mexican-c2-conflict-quiz-10", type: "multiple-choice", prompt: "Someone keeps riling up a friend with incomplete versions. Which phrase fits?", options: ["Calentarle la cabeza a alguien", "Dar la cara", "Hablar derecho", "Ya estuvo"], correctAnswer: "Calentarle la cabeza a alguien", explanation: "This means filling someone’s head with ideas or riling them up.", points: 1, skillTag: "influence" },
      pairQuestion("mexican-c2-conflict-pairs-1", "Match gossip and blame phrases.", conflictVocab.slice(0, 9)),
      pairQuestion("mexican-c2-conflict-pairs-2", "Match escalation and transparency phrases.", conflictVocab.slice(9, 17)),
      pairQuestion("mexican-c2-conflict-pairs-3", "Match group repair and closure phrases.", conflictVocab.slice(17)),
    ],
  },
};
