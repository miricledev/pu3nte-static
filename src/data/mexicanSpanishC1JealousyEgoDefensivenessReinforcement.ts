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

const courseId = "mexican-spanish-c1-jealousy-ego-defensiveness";
const skoolSectionName = "Mexican Spanish - C1 Jealousy, Ego, and Defensiveness";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const jealousyVocab: VocabItem[] = [
  { id: "andar-medio-ardido", term: "andar medio ardido", meaning: "to be a bit bitter / sore / resentful", matchingMeaning: "to be a bit bitter", note: "Informal Mexican phrase for resentment after feeling hurt or exposed.", example: "Desde que vio la foto, anda medio ardido.", translation: "Since he saw the photo, he’s been a bit bitter.", starred: true },
  { id: "si-te-calo", term: "sí te caló", meaning: "it really got to you / hit a nerve", matchingMeaning: "it hit a nerve", note: "Used when someone’s reaction reveals that a comment affected them.", example: "No grites; sí te caló lo que dijo.", translation: "Don’t yell; what she said really got to you.", starred: true },
  { id: "calar", term: "calar", meaning: "to hurt emotionally / get under someone’s skin", matchingMeaning: "to hurt emotionally", note: "In this emotional sense, calar means something lands painfully.", example: "Ese comentario me caló más de lo que pensé.", translation: "That comment hurt me more than I thought.", starred: true },
  { id: "te-pego-en-el-ego", term: "te pegó en el ego", meaning: "it bruised your ego", matchingMeaning: "it bruised your ego", note: "Names ego injury directly without necessarily calling it jealousy.", example: "No fue por ella; te pegó en el ego.", translation: "It wasn’t about her; it bruised your ego.", starred: true },
  { id: "te-gano-el-orgullo", term: "te ganó el orgullo", meaning: "your pride got the better of you", matchingMeaning: "your pride got the better of you", note: "Used when pride drives someone’s reaction more than reason.", example: "Querías disculparte, pero te ganó el orgullo.", translation: "You wanted to apologize, but your pride got the better of you.", starred: true },
  { id: "hacerse-el-digno", term: "hacerse el digno", meaning: "to act aloof / proud / above it after being hurt", matchingMeaning: "to act aloof after being hurt", note: "Often implies the person is pretending not to care.", example: "No te hagas el digno; sí querías ir.", translation: "Don’t act above it; you did want to go.", starred: true },
  { id: "no-te-hagas", term: "no te hagas", meaning: "come on, don’t pretend / don’t play dumb", matchingMeaning: "don’t pretend", note: "Very common Mexican phrase to call out avoidance or denial.", example: "No te hagas, te molestó verla con él.", translation: "Don’t pretend, it bothered you to see her with him.", starred: true },
  { id: "te-quedo-el-saco", term: "te quedó el saco", meaning: "the comment hit home / if the shoe fits", matchingMeaning: "the comment hit home", note: "Used when someone reacts because the criticism applies to them.", example: "Si te enojaste tanto, igual y te quedó el saco.", translation: "If you got that angry, maybe the comment hit home.", starred: true },
  { id: "quedarse-con-la-espinita", term: "quedarse con la espinita", meaning: "to be left with a lingering doubt, annoyance, or unresolved feeling", matchingMeaning: "to be left with a lingering doubt", note: "Useful for subtle emotional residue after a conflict.", example: "Me quedé con la espinita de preguntarle qué quiso decir.", translation: "I was left with the lingering doubt of asking what she meant.", starred: true },
  { id: "lo-traes-atravesado", term: "lo traes atravesado", meaning: "you really resent him / you’ve got him stuck in your craw", matchingMeaning: "you really resent him", note: "Strong phrase for unresolved resentment toward someone.", example: "Acepta que lo traes atravesado desde la fiesta.", translation: "Admit you’ve resented him since the party.", starred: true },
  { id: "se-te-salio-lo-celoso", term: "se te salió lo celoso", meaning: "your jealous side came out", matchingMeaning: "your jealous side came out", note: "Points to jealousy surfacing despite someone trying to hide it.", example: "Cuando preguntaste quién era, se te salió lo celoso.", translation: "When you asked who he was, your jealous side came out.", starred: true },
  { id: "marcar-territorio", term: "marcar territorio", meaning: "to mark territory / behave possessively", matchingMeaning: "to behave possessively", note: "Critical phrase for possessive behavior in relationships or flirting.", example: "Llegaste a marcar territorio, no a saludar.", translation: "You came to mark territory, not to say hi.", starred: true },
  { id: "ponerse-al-brinco", term: "ponerse al brinco", meaning: "to get defensive / confrontational / defiant", matchingMeaning: "to get defensive", note: "Mexican informal phrase for reacting ready to fight back.", example: "Apenas te preguntó algo y te pusiste al brinco.", translation: "She barely asked you something and you got defensive.", starred: true },
  { id: "andar-enchilado", term: "andar enchilado", meaning: "to be annoyed / worked up / pissed off", matchingMeaning: "to be annoyed", note: "Informal Mexican expression for being irritated or heated.", example: "Anda enchilado porque nadie le dio la razón.", translation: "He’s annoyed because nobody agreed with him.", starred: true },
  { id: "bajale-dos-rayitas", term: "bájale dos rayitas", meaning: "tone it down a couple of notches", matchingMeaning: "tone it down", note: "Useful for de-escalating someone who is reacting too intensely.", example: "Bájale dos rayitas antes de contestarle.", translation: "Tone it down a couple of notches before answering her.", starred: true },
  { id: "no-me-hagas-menos", term: "no me hagas menos", meaning: "don’t belittle me / don’t treat me as less important", matchingMeaning: "don’t belittle me", note: "Vulnerable defensive phrase when someone feels diminished.", example: "No me hagas menos solo porque te fue mejor.", translation: "Don’t belittle me just because things went better for you.", starred: true },
  { id: "me-pego-donde-me-duele", term: "me pegó donde me duele", meaning: "it hit me where it hurts", matchingMeaning: "it hit me where it hurts", note: "Honest phrase for admitting emotional impact.", example: "Lo que dijo me pegó donde me duele.", translation: "What he said hit me where it hurts.", starred: true },
  { id: "me-entro-la-inseguridad", term: "me entró la inseguridad", meaning: "my insecurity kicked in", matchingMeaning: "my insecurity kicked in", note: "Self-aware phrase for naming insecurity instead of blaming others.", example: "Cuando no contestaste, me entró la inseguridad.", translation: "When you didn’t answer, my insecurity kicked in.", starred: true },
  { id: "me-pudo-mas-el-orgullo", term: "me pudo más el orgullo", meaning: "my pride got the better of me", matchingMeaning: "my pride got the better of me", note: "First-person accountability phrase.", example: "Quise hablar, pero me pudo más el orgullo.", translation: "I wanted to talk, but my pride got the better of me.", starred: true },
  { id: "tragarse-el-orgullo", term: "tragarse el orgullo", meaning: "to swallow your pride", matchingMeaning: "to swallow your pride", note: "Common phrase for choosing humility over defensiveness.", example: "A veces toca tragarse el orgullo y pedir perdón.", translation: "Sometimes you have to swallow your pride and apologize.", starred: true },
  { id: "mejor-me-trago-el-orgullo", term: "mejor me trago el orgullo", meaning: "I’d better swallow my pride", matchingMeaning: "I’d better swallow my pride", note: "Personal decision to de-escalate and repair.", example: "Mejor me trago el orgullo y le escribo bien.", translation: "I’d better swallow my pride and text her properly.", starred: true },
  { id: "no-le-busques", term: "no le busques por donde no hay", meaning: "don’t look for problems that aren’t there / don’t read too much into it", matchingMeaning: "don’t look for problems that aren’t there", note: "De-escalating phrase when jealousy creates imaginary meanings.", example: "No le busques por donde no hay; solo estaban hablando.", translation: "Don’t look for problems that aren’t there; they were just talking.", starred: true },
  { id: "te-lo-tomaste-personal", term: "te lo tomaste demasiado personal", meaning: "you took it way too personally", matchingMeaning: "you took it too personally", note: "Can sound confrontational, so soften it when needed.", example: "Creo que te lo tomaste demasiado personal.", translation: "I think you took it way too personally.", starred: true },
  { id: "no-fue-para-tanto", term: "no fue para tanto", meaning: "it wasn’t that serious / it wasn’t such a big deal", matchingMeaning: "it wasn’t that serious", note: "Useful but risky if it dismisses real feelings.", example: "No fue para tanto, pero entiendo que te dolió.", translation: "It wasn’t that serious, but I understand that it hurt you.", starred: true },
  { id: "decirlo-de-frente", term: "decirlo de frente", meaning: "to say it directly / say it to someone’s face", matchingMeaning: "to say it directly", note: "Clear alternative to passive-aggressive reactions.", example: "Si te molestó, dilo de frente.", translation: "If it bothered you, say it directly.", starred: true },
  { id: "nomas-complica-todo", term: "nomás complica todo", meaning: "it just makes everything more complicated", matchingMeaning: "it just complicates everything", note: "Mexican nomás adds natural casual rhythm.", example: "Contestar así nomás complica todo.", translation: "Answering like that just makes everything more complicated.", starred: true },
  { id: "no-fue-nomas-por-celos", term: "no fue nomás por celos", meaning: "it wasn’t just jealousy", matchingMeaning: "it wasn’t just jealousy", note: "Adds nuance when jealousy is part of the issue, not the whole story.", example: "No fue nomás por celos; también me sentí ignorado.", translation: "It wasn’t just jealousy; I also felt ignored.", starred: true },
  { id: "quedarse-ardido", term: "quedarse ardido", meaning: "to remain bitter / resentful after being hurt", matchingMeaning: "to remain bitter", note: "Describes the aftermath when someone does not process the hurt.", example: "Si no lo hablas, te vas a quedar ardido.", translation: "If you don’t talk about it, you’re going to stay bitter.", starred: true },
  { id: "por-algo-fue", term: "por algo fue", meaning: "there must have been a reason / it happened for a reason", matchingMeaning: "there must have been a reason", note: "Can be reflective or defensive depending on tone.", example: "Si reaccioné así, por algo fue, pero igual me pasé.", translation: "If I reacted like that, there was a reason, but I still went too far.", starred: true },
];

const highlightMap = Object.fromEntries(jealousyVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = jealousyVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC1JealousyEgoDefensivenessFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C1: Jealousy, Ego, and Defensiveness Flashcards",
  subtitle: "Mexican phrases for resentment, insecurity, pride, jealousy, defensiveness, and mature repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "flashcards", "jealousy", "ego"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: jealousyVocab.map(cardFromVocab) },
};

export const mexicanSpanishC1JealousyEgoDefensivenessSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Jealousy and Ego in Mexican Spanish",
  subtitle: "Build nuanced Mexican phrases for calling out defensiveness, admitting insecurity, and repairing tension.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "sentence-builder", "jealousy", "emotion"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note where you admit jealousy or defensiveness, explain what hurt, and repair the conversation without blaming the other person.",
    stages: [
      stage("stage-1", "Call out resentment", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "Come on, you’re a bit bitter because it hit a nerve.", "No te hagas, andas medio ardido porque sí te caló.", "This names the reaction directly but still keeps a conversational Mexican tone.", breakdown([["don’t pretend", "no te hagas"], ["you’re a bit bitter", "andas medio ardido"], ["it hit a nerve", "sí te caló"]])),
      stage("stage-2", "Name the ego hit", sentenceVocab.slice(3, 8), sentenceVocab.slice(0, 8), "It bruised your ego, and your pride got the better of you.", "Te pegó en el ego y te ganó el orgullo.", "This separates the ego reaction from the actual situation.", breakdown([["it bruised your ego", "te pegó en el ego"], ["your pride got the better of you", "te ganó el orgullo"]])),
      stage("stage-3", "Stop pretending", sentenceVocab.slice(5, 10), sentenceVocab.slice(0, 10), "Don’t act aloof; the comment hit home and you were left with that lingering feeling.", "No te hagas el digno; te quedó el saco y te quedaste con la espinita.", "This captures hurt disguised as pride.", breakdown([["don’t act aloof", "no te hagas el digno"], ["the comment hit home", "te quedó el saco"], ["you were left with the lingering feeling", "te quedaste con la espinita"]])),
      stage("stage-4", "Jealousy surfaces", sentenceVocab.slice(9, 15), sentenceVocab.slice(0, 15), "You resent him, your jealous side came out, and you started marking territory.", "Lo traes atravesado, se te salió lo celoso y empezaste a marcar territorio.", "This is strong but accurate language for possessive behavior.", breakdown([["you resent him", "lo traes atravesado"], ["your jealous side came out", "se te salió lo celoso"], ["started marking territory", "empezaste a marcar territorio"]])),
      stage("stage-5", "De-escalate defensiveness", sentenceVocab.slice(12, 18), sentenceVocab.slice(0, 18), "You got defensive and worked up; tone it down a couple of notches.", "Te pusiste al brinco y andas enchilado; bájale dos rayitas.", "This is a natural Mexican de-escalation line.", breakdown([["you got defensive", "te pusiste al brinco"], ["you’re worked up", "andas enchilado"], ["tone it down", "bájale dos rayitas"]])),
      stage("stage-6", "Admit the insecurity", sentenceVocab.slice(15, 21), sentenceVocab.slice(0, 21), "Don’t belittle me; it hit me where it hurts and my insecurity kicked in.", "No me hagas menos; me pegó donde me duele y me entró la inseguridad.", "This shifts from accusation toward vulnerable explanation.", breakdown([["don’t belittle me", "no me hagas menos"], ["it hit me where it hurts", "me pegó donde me duele"], ["my insecurity kicked in", "me entró la inseguridad"]])),
      stage("stage-7", "Choose repair", sentenceVocab.slice(18, 25), sentenceVocab.slice(0, 25), "My pride got the better of me, but I’d better swallow my pride and say it directly.", "Me pudo más el orgullo, pero mejor me trago el orgullo y lo digo de frente.", "This stage practices accountability and repair.", breakdown([["my pride got the better of me", "me pudo más el orgullo"], ["I’d better swallow my pride", "mejor me trago el orgullo"], ["say it directly", "lo digo de frente"]])),
      stage("stage-8", "Add nuance", sentenceVocab.slice(21), sentenceVocab, "Don’t look for problems that aren’t there; it wasn’t just jealousy, but taking it personally just complicates everything.", "No le busques por donde no hay; no fue nomás por celos, pero tomártelo personal nomás complica todo.", "This gives nuance without excusing the defensive reaction.", breakdown([["don’t look for problems that aren’t there", "no le busques por donde no hay"], ["it wasn’t just jealousy", "no fue nomás por celos"], ["taking it personally", "tomártelo personal"], ["just complicates everything", "nomás complica todo"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-jealousy-story-q1", type: "multiple-choice", prompt: "After message 3, what does Mariana notice about Leo?", options: ["He reacted bitterly after seeing a photo", "He is late because of traffic", "He wants to complain about service", "He is planning a party"], correctAnswer: "He reacted bitterly after seeing a photo", explanation: "Mariana says Leo has been cold since he saw the photo and asks if he is medio ardido.", points: 1, skillTag: "context" },
  { id: "mexican-c1-jealousy-story-q2", type: "multiple-choice", prompt: "After message 6, what does Leo admit?", options: ["The situation hit his ego", "He missed the bus", "He forgot to call support", "He wants to move cities"], correctAnswer: "The situation hit his ego", explanation: "Leo says me pegó en el ego.", points: 1, skillTag: "emotion" },
  { id: "mexican-c1-jealousy-story-q3", type: "true-false", prompt: "After message 9, true or false: Mariana thinks Leo is pretending not to care.", options: ["True", "False"], correctAnswer: "True", explanation: "She says no te hagas el digno, which means not to act above it after being hurt.", points: 1, skillTag: "inference" },
  { id: "mexican-c1-jealousy-story-q4", type: "multiple-choice", prompt: "After message 12, what does Leo say about the other guy?", options: ["He resents him a little", "He wants to hire him", "He thinks he is very funny", "He does not know who he is"], correctAnswer: "He resents him a little", explanation: "Leo says sí lo traigo atravesado tantito.", points: 1, skillTag: "detail" },
  { id: "mexican-c1-jealousy-story-q5", type: "multiple-choice", prompt: "After message 15, what boundary does Mariana name?", options: ["She does not want Leo marking territory", "She wants Leo to pay for dinner", "She needs Leo to send a location", "She wants to stop learning Spanish"], correctAnswer: "She does not want Leo marking territory", explanation: "Mariana says no quiero que vengas a marcar territorio.", points: 1, skillTag: "boundary" },
  { id: "mexican-c1-jealousy-story-q6", type: "multiple-choice", prompt: "After message 18, how does Leo describe his reaction?", options: ["He got defensive and worked up", "He stayed totally calm", "He made a formal complaint", "He was joking the whole time"], correctAnswer: "He got defensive and worked up", explanation: "He says me puse al brinco and andaba enchilado.", points: 1, skillTag: "reaction" },
  { id: "mexican-c1-jealousy-story-q7", type: "true-false", prompt: "After message 21, true or false: Leo says insecurity played a role.", options: ["True", "False"], correctAnswer: "True", explanation: "Leo says me entró la inseguridad.", points: 1, skillTag: "self-awareness" },
  { id: "mexican-c1-jealousy-story-q8", type: "multiple-choice", prompt: "After message 24, what does Leo decide to do?", options: ["Swallow his pride and say things directly", "Pretend nothing happened forever", "Blame Mariana for everything", "Cancel a delivery order"], correctAnswer: "Swallow his pride and say things directly", explanation: "He says mejor me trago el orgullo and quiero decirlo de frente.", points: 1, skillTag: "repair" },
  { id: "mexican-c1-jealousy-story-q9", type: "multiple-choice", prompt: "After message 27, what does Mariana warn against?", options: ["Looking for problems where there are none", "Being too early", "Ordering too much food", "Taking the wrong bus"], correctAnswer: "Looking for problems where there are none", explanation: "She says no le busques por donde no hay.", points: 1, skillTag: "de-escalation" },
  { id: "mexican-c1-jealousy-story-q10", type: "multiple-choice", prompt: "After message 30, what do they agree on?", options: ["The reaction had a reason, but they should talk before things get bitter", "The relationship is over immediately", "Jealousy is always proof of love", "They should avoid every serious conversation"], correctAnswer: "The reaction had a reason, but they should talk before things get bitter", explanation: "They end with por algo fue, but also agree to talk before quedarse ardido.", points: 1, skillTag: "resolution" },
];

export const mexicanSpanishC1JealousyEgoDefensivenessWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C1 Story: The Photo That Hit a Nerve",
  subtitle: "Mariana and Leo unpack jealousy, pride, and defensiveness after a party photo creates tension.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "story", "jealousy", "defensiveness"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "leo", name: "Leo", initials: "L", side: "left", color: "blue" },
      { id: "mariana", name: "Mariana", initials: "M", side: "right", color: "violet" },
    ],
    messages: [
      message("m1", "mariana", "Leo, desde la foto de ayer estás rarísimo.", "Leo, since yesterday’s photo you’ve been acting super weird.", []),
      message("m2", "leo", "No estoy raro. Solo no tengo ganas de hablar.", "I’m not weird. I just don’t feel like talking.", []),
      message("m3", "mariana", "No te hagas. ¿Andas medio ardido o sí te caló?", "Don’t pretend. Are you a bit bitter or did it hit a nerve?", ["no te hagas", "andar medio ardido", "sí te caló", "calar"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "leo", "Pues no estuvo padre verte abrazada con ese güey.", "Well, it wasn’t nice seeing you hugged up with that guy.", []),
      message("m5", "mariana", "Era mi primo, Leo. Te lo dije en la fiesta.", "He was my cousin, Leo. I told you at the party.", []),
      message("m6", "leo", "Ya sé. Por eso me molesta más admitir que me pegó en el ego.", "I know. That’s why it annoys me more to admit it bruised my ego.", ["te pegó en el ego"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "mariana", "Gracias por decirlo, pero ayer te ganó el orgullo.", "Thanks for saying that, but yesterday your pride got the better of you.", ["te ganó el orgullo"]),
      message("m8", "leo", "Sí, me hice el tranquilo y luego contesté seco.", "Yeah, I acted calm and then answered coldly.", []),
      message("m9", "mariana", "Te estabas haciendo el digno. Y cuando te dije que exagerabas, te quedó el saco.", "You were acting aloof. And when I said you were exaggerating, the comment hit home.", ["hacerse el digno", "te quedó el saco"]),
      message("m10", "leo", "No voy a negar que me quedé con la espinita.", "I won’t deny I was left with that lingering feeling.", ["quedarse con la espinita"]),
      message("m11", "mariana", "¿La espinita conmigo o con él?", "A lingering feeling about me or about him?", []),
      message("m12", "leo", "Con él también. Sí lo traigo atravesado tantito.", "About him too. I do resent him a little.", ["lo traes atravesado"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "mariana", "Ahí se te salió lo celoso.", "That’s where your jealous side came out.", ["se te salió lo celoso"]),
      message("m14", "leo", "Puede ser. Pero sentí que me hiciste menos enfrente de todos.", "Maybe. But I felt like you made me look less important in front of everyone.", []),
      message("m15", "mariana", "Eso lo podemos hablar, pero no quiero que vengas a marcar territorio.", "We can talk about that, but I don’t want you coming to mark territory.", ["marcar territorio"]),
      message("m16", "leo", "Tienes razón. Me puse al brinco en vez de preguntar.", "You’re right. I got defensive instead of asking.", ["ponerse al brinco"]),
      message("m17", "mariana", "Y andabas enchilado, aunque decías que no pasaba nada.", "And you were worked up, even though you said nothing was wrong.", ["andar enchilado"]),
      message("m18", "leo", "Sí. Me tuve que haber bajado dos rayitas antes de hablarte.", "Yeah. I should have toned it down a couple of notches before talking to you.", ["bájale dos rayitas"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "mariana", "Lo que sí necesito es que no me hagas responsable de tu inseguridad.", "What I do need is for you not to make me responsible for your insecurity.", []),
      message("m20", "leo", "No quiero hacerte menos a ti tampoco. Me pegó donde me duele.", "I don’t want to belittle you either. It hit me where it hurts.", ["no me hagas menos", "me pegó donde me duele"]),
      message("m21", "leo", "Me entró la inseguridad y reaccioné feo.", "My insecurity kicked in and I reacted badly.", ["me entró la inseguridad"]),
      message("m22", "mariana", "Eso sí lo puedo escuchar. Lo otro nomás complica todo.", "That I can listen to. The other stuff just makes everything more complicated.", ["nomás complica todo"]),
      message("m23", "leo", "Me pudo más el orgullo. Quería pedirte calma y terminé atacando.", "My pride got the better of me. I wanted to ask for reassurance and ended up attacking.", ["me pudo más el orgullo"]),
      message("m24", "leo", "Mejor me trago el orgullo y te lo digo de frente: me dio miedo perder mi lugar contigo.", "I’d better swallow my pride and say it directly: I got scared of losing my place with you.", ["mejor me trago el orgullo", "tragarse el orgullo", "decirlo de frente"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "mariana", "Eso es muy distinto a hacerme caras toda la noche.", "That’s very different from giving me looks all night.", []),
      message("m26", "leo", "Ya sé. No fue nomás por celos; también me sentí fuera.", "I know. It wasn’t just jealousy; I also felt left out.", ["no fue nomás por celos"]),
      message("m27", "mariana", "Lo entiendo, pero no le busques por donde no hay. Si algo duele, pregúntame.", "I understand, but don’t look for problems that aren’t there. If something hurts, ask me.", ["no le busques por donde no hay"]),
      message("m28", "leo", "Sí. Me lo tomé demasiado personal y no fue para tanto como para cerrarme.", "Yeah. I took it way too personally, and it wasn’t serious enough for me to shut down.", ["te lo tomaste demasiado personal", "no fue para tanto"]),
      message("m29", "mariana", "Tampoco quiero que te quedes ardido y luego explote peor.", "I also don’t want you to stay resentful and then explode worse later.", ["quedarse ardido"]),
      message("m30", "leo", "Va. Si algo me mueve así, por algo fue, pero lo hablo antes de ponerme defensivo.", "Okay. If something moves me like that, there was a reason, but I’ll talk about it before getting defensive.", ["por algo fue"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-c1-jealousy-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: jealousyVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: jealousyVocab.map((item) => item.term),
      grammarPatterns: [
        "Calling out denial: no te hagas, sí te caló, te quedó el saco.",
        "Naming ego and jealousy: te pegó en el ego, se te salió lo celoso, marcar territorio.",
        "Repairing defensiveness: bájale dos rayitas, mejor me trago el orgullo, decirlo de frente.",
      ],
      speakingPrompts: [
        "Admit that your jealousy came from insecurity.",
        "Tell someone their pride is making the conversation worse.",
        "Repair a defensive reaction without dismissing your own feelings.",
      ],
    },
    completionTask: {
      title: "Your jealousy and ego repair note",
      instructions: "Record a 60-second Mexican Spanish voice note where you explain what hit your ego, admit defensiveness, and choose a calmer repair.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En español mexicano, los celos rara vez aparecen solos. Muchas veces vienen mezclados con orgullo, inseguridad y ego. Si alguien «anda medio ardido», quizá no quiere admitir que algo «sí le caló». En C1, lo importante no es solo entender la frase, sino detectar qué emoción está escondida debajo de la reacción.", translation: "In Mexican Spanish, jealousy rarely appears alone. It is often mixed with pride, insecurity, and ego. If someone anda medio ardido, maybe they do not want to admit that something sí le caló. At C1, the important thing is not only understanding the phrase, but detecting what emotion is hidden underneath the reaction.", highlights: highlights(["andar medio ardido", "sí te caló", "calar"]), shadowLine: "Anda medio ardido porque sí le caló." },
  { id: "p2", text: "Cuando dices «te pegó en el ego» o «te ganó el orgullo», estás nombrando una reacción defensiva. No necesariamente acusas a la persona de ser mala; señalas que su orgullo tomó el volante. Por eso estas frases pueden ser útiles, pero también delicadas si la otra persona ya está sensible.", translation: "When you say te pegó en el ego or te ganó el orgullo, you are naming a defensive reaction. You are not necessarily accusing the person of being bad; you are pointing out that pride took the wheel. That is why these phrases can be useful, but also delicate if the other person is already sensitive.", highlights: highlights(["te pegó en el ego", "te ganó el orgullo"]), shadowLine: "Te pegó en el ego y te ganó el orgullo." },
  { id: "p3", text: "«Hacerse el digno» describe a alguien que actúa como si estuviera por encima del asunto, aunque en realidad está herido. «No te hagas» empuja a la persona a dejar de negar lo obvio. Y «te quedó el saco» sugiere que el comentario dolió porque algo de verdad tocó.", translation: "Hacerse el digno describes someone who acts as if they are above the situation, even though they are actually hurt. No te hagas pushes the person to stop denying the obvious. And te quedó el saco suggests that the comment hurt because something true landed.", highlights: highlights(["hacerse el digno", "no te hagas", "te quedó el saco"]), shadowLine: "No te hagas el digno; te quedó el saco." },
  { id: "p4", text: "Después del golpe emocional, queda residuo. «Quedarse con la espinita» habla de una duda o molestia que sigue ahí. «Lo traes atravesado» es más fuerte: significa que alguien se quedó atorado emocionalmente para ti. Si no lo hablas, puedes «quedarte ardido» por mucho más tiempo.", translation: "After the emotional hit, residue remains. Quedarse con la espinita talks about a doubt or annoyance that is still there. Lo traes atravesado is stronger: it means someone is emotionally stuck in your resentment. If you do not talk about it, you can quedarte ardido for much longer.", highlights: highlights(["quedarse con la espinita", "lo traes atravesado", "quedarse ardido"]), shadowLine: "Me quedé con la espinita y lo traigo atravesado." },
  { id: "p5", text: "Los celos se vuelven visibles con frases como «se te salió lo celoso» o «marcar territorio». La segunda es especialmente crítica, porque describe una actitud posesiva. No es lo mismo decir «me dio inseguridad» que actuar como si la otra persona fuera una propiedad.", translation: "Jealousy becomes visible with phrases like se te salió lo celoso or marcar territorio. The second one is especially critical because it describes a possessive attitude. Saying me dio inseguridad is not the same as acting as if the other person were property.", highlights: highlights(["se te salió lo celoso", "marcar territorio", "me entró la inseguridad"]), shadowLine: "Se te salió lo celoso y empezaste a marcar territorio." },
  { id: "p6", text: "Cuando alguien «se pone al brinco» o «anda enchilado», la conversación puede escalar rápido. Ahí sirve «bájale dos rayitas». No significa callarse ni tragarse todo; significa bajar la intensidad para poder decir lo que duele sin convertirlo en ataque.", translation: "When someone se pone al brinco or anda enchilado, the conversation can escalate quickly. That is where bájale dos rayitas helps. It does not mean staying silent or swallowing everything; it means lowering the intensity so you can say what hurts without turning it into an attack.", highlights: highlights(["ponerse al brinco", "andar enchilado", "bájale dos rayitas"]), shadowLine: "No te pongas al brinco; bájale dos rayitas." },
  { id: "p7", text: "La parte más madura aparece cuando alguien puede decir «no me hagas menos», «me pegó donde me duele» o «me entró la inseguridad». Estas frases no justifican una reacción fea, pero sí explican la herida. En vez de culpar, abren una puerta para reparar.", translation: "The most mature part appears when someone can say no me hagas menos, me pegó donde me duele, or me entró la inseguridad. These phrases do not justify a bad reaction, but they do explain the wound. Instead of blaming, they open a door to repair.", highlights: highlights(["no me hagas menos", "me pegó donde me duele", "me entró la inseguridad"]), shadowLine: "Me pegó donde me duele y me entró la inseguridad." },
  { id: "p8", text: "Para cerrar bien, necesitas responsabilidad. «Me pudo más el orgullo», «mejor me trago el orgullo» y «decirlo de frente» ayudan a salir de la defensa. También conviene recordar: «no le busques por donde no hay», «no fue para tanto» y «nomás complica todo» pueden calmar, pero solo funcionan si no borran lo que la otra persona sintió.", translation: "To close well, you need responsibility. Me pudo más el orgullo, mejor me trago el orgullo, and decirlo de frente help you leave defensiveness behind. It also helps to remember: no le busques por donde no hay, no fue para tanto, and nomás complica todo can calm things down, but only if they do not erase what the other person felt.", highlights: highlights(["me pudo más el orgullo", "mejor me trago el orgullo", "tragarse el orgullo", "decirlo de frente", "no le busques por donde no hay", "no fue para tanto", "nomás complica todo", "no fue nomás por celos"]), shadowLine: "Mejor me trago el orgullo y lo digo de frente." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-jealousy-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Jealousy mixed with ego, insecurity, defensiveness, and repair", "How to complain about bad service", "How to invite friends to dinner", "How to tell a funny travel story"], correctAnswer: "Jealousy mixed with ego, insecurity, defensiveness, and repair", explanation: "The reading focuses on emotional reactions, pride, possessiveness, and mature repair.", points: 1, skillTag: "gist" },
  { id: "mexican-c1-jealousy-reading-q2", type: "multiple-choice", prompt: "Which phrase means “your pride got the better of you”?", options: ["Te ganó el orgullo", "No le busques por donde no hay", "Te quedó el saco", "Andar enchilado"], correctAnswer: "Te ganó el orgullo", explanation: "This phrase says pride took over the reaction.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-jealousy-reading-q3", type: "true-false", prompt: "True or false: “marcar territorio” is described as possessive behavior.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says marcar territorio describes a possessive attitude.", points: 1, skillTag: "social-risk" },
  { id: "mexican-c1-jealousy-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Tone it down a couple of notches.", wordBank: ["Bájale", "dos", "rayitas."], correctAnswer: "Bájale dos rayitas.", explanation: "This is a Mexican de-escalation phrase.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-c1-jealousy-reading-q5", type: "multiple-choice", prompt: "Which phrase admits personal responsibility?", options: ["Me pudo más el orgullo", "Te quedó el saco", "Lo traes atravesado", "Se te salió lo celoso"], correctAnswer: "Me pudo más el orgullo", explanation: "It admits that pride got the better of the speaker.", points: 1, skillTag: "repair" },
];

export const mexicanSpanishC1JealousyEgoDefensivenessReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C1 Reading: Celos, Ego y Reacciones Defensivas",
  subtitle: "A synced Mexican Spanish reading about jealousy, pride, insecurity, possessiveness, and mature repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "reading", "jealousy", "ego"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: jealousyVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican C1 jealousy, ego, and defensiveness vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishC1JealousyEgoDefensivenessQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish C1: Jealousy, Ego, and Defensiveness Quiz",
  subtitle: "Choose the right Mexican phrase for insecurity, pride, possessiveness, defensiveness, and repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "quiz", "jealousy", "defensiveness"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican C1 phrases for emotional honesty when jealousy, ego, and defensiveness make a conversation tense.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-c1-jealousy-quiz-1", type: "multiple-choice", prompt: "Someone is acting resentful after being hurt. What fits?", options: ["Anda medio ardido", "No fue para tanto", "Decirlo de frente", "Por algo fue"], correctAnswer: "Anda medio ardido", explanation: "Andar medio ardido means to be a bit bitter or resentful.", points: 1, skillTag: "resentment" },
      { id: "mexican-c1-jealousy-quiz-2", type: "fill-blank", prompt: "Complete: Sí te ____.", nativePrompt: "It really hit a nerve.", correctAnswer: "caló", explanation: "Sí te caló means it got to you or hit a nerve.", points: 1, skillTag: "impact" },
      { id: "mexican-c1-jealousy-quiz-3", type: "multiple-choice", prompt: "You want to say someone’s pride took over. What fits?", options: ["Te ganó el orgullo", "Se te salió lo celoso", "No me hagas menos", "Te quedaste con la espinita"], correctAnswer: "Te ganó el orgullo", explanation: "This phrase means your pride got the better of you.", points: 1, skillTag: "ego" },
      { id: "mexican-c1-jealousy-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t pretend.", wordBank: ["No", "te", "hagas."], correctAnswer: "No te hagas.", explanation: "No te hagas calls out denial or pretending.", points: 1, skillTag: "denial" },
      { id: "mexican-c1-jealousy-quiz-5", type: "true-false", prompt: "True or false: “marcar territorio” can describe possessive behavior.", options: ["True", "False"], correctAnswer: "True", explanation: "It means to mark territory or behave possessively.", points: 1, skillTag: "possessiveness" },
      { id: "mexican-c1-jealousy-quiz-6", type: "multiple-choice", prompt: "Someone becomes defensive and confrontational. Which phrase fits?", options: ["Ponerse al brinco", "Quedarse con la espinita", "Tragarse el orgullo", "Decirlo de frente"], correctAnswer: "Ponerse al brinco", explanation: "Ponerse al brinco means to get defensive or confrontational.", points: 1, skillTag: "defensiveness" },
      { id: "mexican-c1-jealousy-quiz-7", type: "fill-blank", prompt: "Complete: Bájale dos ____.", nativePrompt: "Tone it down a couple of notches.", correctAnswer: "rayitas", explanation: "Bájale dos rayitas is a natural Mexican de-escalation phrase.", points: 1, skillTag: "de-escalation" },
      { id: "mexican-c1-jealousy-quiz-8", type: "multiple-choice", prompt: "You want to admit insecurity instead of blaming someone. What fits?", options: ["Me entró la inseguridad", "Te quedó el saco", "Lo traes atravesado", "No fue para tanto"], correctAnswer: "Me entró la inseguridad", explanation: "This means my insecurity kicked in.", points: 1, skillTag: "self-awareness" },
      { id: "mexican-c1-jealousy-quiz-9", type: "true-false", prompt: "True or false: “mejor me trago el orgullo” means I’d better swallow my pride.", options: ["True", "False"], correctAnswer: "True", explanation: "Tragarse el orgullo means to swallow your pride.", points: 1, skillTag: "repair" },
      { id: "mexican-c1-jealousy-quiz-10", type: "multiple-choice", prompt: "Someone is inventing problems from jealousy. Which phrase warns against that?", options: ["No le busques por donde no hay", "No me hagas menos", "Andar enchilado", "Por algo fue"], correctAnswer: "No le busques por donde no hay", explanation: "This means don’t look for problems that aren’t there.", points: 1, skillTag: "clarity" },
      pairQuestion("mexican-c1-jealousy-pairs-1", "Match jealousy and ego phrases.", jealousyVocab.slice(0, 10)),
      pairQuestion("mexican-c1-jealousy-pairs-2", "Match defensiveness and insecurity phrases.", jealousyVocab.slice(10, 20)),
      pairQuestion("mexican-c1-jealousy-pairs-3", "Match repair and nuance phrases.", jealousyVocab.slice(20)),
    ],
  },
};
