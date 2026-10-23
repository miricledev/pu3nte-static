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

type VocabItem = { id: string; term: string; meaning: string; matchingMeaning?: string; note: string; example: string; translation: string };

const courseId = "argentinian-spanish-b1-sharing-mate-first-time";
const sectionName = "Argentinian Spanish - B1 Sharing Mate for the First Time";

const mateVocab: VocabItem[] = [
  { id: "che", term: "Che", meaning: "hey / mate / listen", note: "Very common Argentine attention-getter used with people you know.", example: "Che, ¿querés un mate?", translation: "Hey, do you want some mate?" },
  { id: "de-una", term: "De una", meaning: "absolutely / I’m down / for sure", note: "An enthusiastic informal acceptance.", example: "¿Tomamos unos mates? De una.", translation: "Shall we have some mate? Absolutely." },
  { id: "queres-un-mate", term: "¿Querés un mate?", meaning: "Do you want some mate?", note: "Querés is the Argentine voseo form.", example: "Che, ¿querés un mate amargo?", translation: "Hey, do you want an unsweetened mate?" },
  { id: "me-cebas-uno", term: "¿Me cebás uno?", meaning: "Can you make me a mate?", note: "Cebar means preparing and serving each round of mate.", example: "¿Me cebás uno cuando puedas?", translation: "Can you make me one when you can?" },
  { id: "amargo-porfa", term: "Amargo, porfa", meaning: "Unsweetened, please", note: "A compact natural answer when choosing mate without sugar.", example: "¿Dulce? No, amargo, porfa.", translation: "Sweet? No, unsweetened, please." },
  { id: "esta-buenisimo", term: "Está buenísimo", meaning: "It’s really good / it’s amazing", note: "Strong positive evaluation in everyday Argentine speech.", example: "Este mate está buenísimo.", translation: "This mate is really good." },
  { id: "paso-gracias", term: "Paso, gracias", meaning: "I’ll pass, thanks", note: "Politely refuses the offer before joining the round.", example: "Ahora paso, gracias.", translation: "I’ll pass for now, thanks." },
  { id: "bancame-un-toque", term: "Bancame un toque", meaning: "Give me a sec / hang on a bit", note: "Informal Argentine request to wait briefly.", example: "Bancame un toque que caliento el agua.", translation: "Give me a sec while I heat the water." },
  { id: "me-pasas-el-termo", term: "¿Me pasás el termo?", meaning: "Can you pass me the thermos?", note: "Pasás is the voseo form used for a casual request.", example: "Che, ¿me pasás el termo?", translation: "Hey, can you pass me the thermos?" },
  { id: "lo-queres-dulce", term: "¿Lo querés dulce?", meaning: "Do you want it sweet?", note: "Asks whether the person wants sugar added.", example: "¿Lo querés dulce o amargo?", translation: "Do you want it sweet or unsweetened?" },
  { id: "te-cebo-uno", term: "Te cebo uno", meaning: "I’ll make you a mate", note: "The cebador prepares and passes each serving.", example: "Sentate y te cebo uno.", translation: "Sit down and I’ll make you a mate." },
  { id: "ojo-que-quema", term: "Ojo que quema", meaning: "Careful, it’s burning hot", note: "Ojo means watch out or be careful here.", example: "Tomalo despacio; ojo que quema.", translation: "Drink it slowly; careful, it’s burning hot." },
  { id: "no-muevas-bombilla", term: "No me muevas la bombilla", meaning: "Don’t move the mate straw", note: "Moving the bombilla can disturb the yerba and clog the filter.", example: "No me muevas la bombilla, que se tapa.", translation: "Don’t move the mate straw because it gets clogged." },
  { id: "esta-re-fuerte", term: "Está re fuerte", meaning: "It’s really strong", note: "Re is a very common Argentine intensifier.", example: "Al principio está re fuerte.", translation: "At first it’s really strong." },
  { id: "se-lavo", term: "Se lavó", meaning: "It’s lost its flavour", note: "Mate-specific expression for yerba that no longer gives much flavour.", example: "Este mate ya se lavó.", translation: "This mate has already lost its flavour." },
  { id: "se-lavo-mal", term: "Se lavó mal", meaning: "It’s really lost its flavour", note: "Mal intensifies the result in informal Argentine speech.", example: "Cambiemos la yerba; se lavó mal.", translation: "Let’s change the yerba; it has really lost its flavour." },
  { id: "dame-otro", term: "Dame otro", meaning: "Give me another one", note: "Direct informal request; dame is natural with friends.", example: "Está buenísimo; dame otro.", translation: "It’s really good; give me another one." },
  { id: "ando-a-las-corridas", term: "Ando medio a las corridas", meaning: "I’m kind of rushing around", note: "A las corridas means hurriedly or rushing between tasks.", example: "Hoy ando medio a las corridas.", translation: "Today I’m kind of rushing around." },
  { id: "proxima-me-sumo", term: "La próxima me sumo", meaning: "I’ll join in next time", note: "Me sumo means I’ll join the activity or group.", example: "Hoy paso, pero la próxima me sumo.", translation: "I’ll pass today, but I’ll join next time." },
  { id: "ya-estoy-gracias", term: "Ya estoy, gracias", meaning: "I’m done, thanks", note: "Returning the mate with gracias signals that you do not want another round.", example: "Ya estoy, gracias. Estaba buenísimo.", translation: "I’m done, thanks. It was really good." },
  { id: "me-voy-acostumbrando", term: "Me voy acostumbrando", meaning: "I’m getting used to it", note: "Expresses a gradual adjustment over time.", example: "Al principio era fuerte, pero me voy acostumbrando.", translation: "At first it was strong, but I’m getting used to it." },
  { id: "quedo-de-diez", term: "Quedó de diez", meaning: "It turned out great / spot on", note: "De diez is a strongly positive Argentine evaluation.", example: "Con la yerba nueva quedó de diez.", translation: "With the new yerba it turned out great." },
  { id: "tranqui", term: "Tranqui", meaning: "chill / relaxed / no rush", note: "Informal shortening of tranquilo or tranquila.", example: "Tranqui, tomalo despacio.", translation: "No rush, drink it slowly." },
  { id: "me-cebas-otro", term: "¿Me cebás otro?", meaning: "Can you make me another one?", note: "Natural request to stay in the mate round.", example: "¿Me cebás otro? Me gustó.", translation: "Can you make me another one? I liked it." },
  { id: "que-se-tapa", term: "Que se tapa", meaning: "Because it gets clogged", note: "Explains why the bombilla should not be moved.", example: "No muevas la bombilla, que se tapa.", translation: "Don’t move the straw because it gets clogged." },
  { id: "ya-voy", term: "Ya voy", meaning: "I’m coming / I’ll be right there", note: "Common response when someone calls you over.", example: "Guardame un lugar, ya voy.", translation: "Save me a place; I’ll be right there." },
  { id: "por-ahora-estoy-bien", term: "Por ahora estoy bien", meaning: "I’m good for now", note: "Temporarily declines another serving without necessarily leaving the round permanently.", example: "Por ahora estoy bien; después te pido otro.", translation: "I’m good for now; I’ll ask for another later." },
  { id: "igual", term: "Igual", meaning: "still / anyway / even so", note: "Common Argentine connector that adds contrast or qualification.", example: "Está fuerte. Igual, me gusta.", translation: "It’s strong. Still, I like it." },
  { id: "al-principio", term: "Al principio", meaning: "At first", note: "Useful for comparing a first reaction with later adjustment.", example: "Al principio no me gustaba.", translation: "At first I didn’t like it." },
  { id: "tomamos-unos-mates", term: "Tomamos unos mates", meaning: "We’ll have some mate together", note: "Often describes the social activity, not a precise number of drinks.", example: "Después tomamos unos mates en la plaza.", translation: "Later we’ll have some mate together in the square." },
  { id: "mate", term: "Mate", meaning: "traditional yerba mate drink / drinking vessel", note: "The word names both the drink and the vessel used to serve it.", example: "Preparé el mate para compartir.", translation: "I prepared the mate to share." },
  { id: "cebar-mate", term: "Cebar mate", meaning: "to prepare and serve mate", note: "Includes pouring the water and managing each turn.", example: "Hoy me toca cebar mate.", translation: "Today it’s my turn to prepare and serve mate." },
  { id: "cebador", term: "Cebador / cebadora", meaning: "person serving the mate", note: "The cebador or cebadora controls the order and prepares each serving.", example: "Sofi es la cebadora de esta ronda.", translation: "Sofi is serving this round of mate." },
  { id: "bombilla", term: "Bombilla", meaning: "metal drinking straw", note: "It contains a filter that keeps most yerba leaves out.", example: "La bombilla está bien puesta.", translation: "The mate straw is positioned correctly." },
  { id: "yerba", term: "Yerba", meaning: "yerba mate leaves", note: "The dried leaves used to prepare the drink.", example: "Hay que cambiar la yerba.", translation: "We need to change the yerba." },
  { id: "termo", term: "Termo", meaning: "thermos flask", note: "Holds the hot water used throughout the mate round.", example: "El termo está lleno de agua caliente.", translation: "The thermos is full of hot water." },
  { id: "mate-amargo", term: "Mate amargo", meaning: "unsweetened mate", note: "Mate served without sugar.", example: "Yo tomo mate amargo.", translation: "I drink unsweetened mate." },
  { id: "mate-dulce", term: "Mate dulce", meaning: "sweetened mate", note: "Mate prepared with sugar or another sweetener.", example: "Ella prefiere el mate dulce.", translation: "She prefers sweetened mate." },
  { id: "cambiar-yerba", term: "Cambiar la yerba", meaning: "change the yerba mate leaves", note: "Done when the mate has washed out and lost its flavour.", example: "Se lavó; vamos a cambiar la yerba.", translation: "It has lost its flavour; let’s change the yerba." },
];

const highlightMap = Object.fromEntries(mateVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.matchingMeaning ?? item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "medium", notes: item.note, starred: true };
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

const sentenceVocab = mateVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB1SharingMateFirstTimeFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B1: Sharing Mate for the First Time Flashcards", subtitle: "Mate etiquette, essential objects, voseo requests, taste reactions, and joining or leaving the round naturally.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "flashcards", "mate", "culture"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: mateVocab.map(cardFromVocab) },
};

export const argentinianSpanishB1SharingMateFirstTimeSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Sharing Mate in Argentina", subtitle: "Build natural invitations, preferences, warnings, etiquette reminders, and responses during a mate round.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["argentinian-spanish", "b1", "sentence-builder", "mate", "culture"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Join a mate round, choose sweet or unsweetened, react to the flavour, follow bombilla etiquette, request another, and signal when you are finished.",
    stages: [
      stage("stage-1", "Accept an invitation", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Hey, do you want some mate? Absolutely, I’m in.", "Che, ¿querés un mate? De una, me sumo.", "Querés is voseo; de una gives an enthusiastic yes.", breakdown([["Hey", "Che"], ["do you want some mate?", "¿querés un mate?"], ["Absolutely", "De una"], ["I'm in", "me sumo"]])),
      stage("stage-2", "Request your first mate", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "Can you make me one? Unsweetened, please. It’s really good.", "¿Me cebás uno? Amargo, porfa. Está buenísimo.", "Cebás is voseo and amargo means without sugar in this context.", breakdown([["Can you make me one?", "¿Me cebás uno?"], ["Unsweetened, please", "Amargo, porfa"], ["It's really good", "Está buenísimo"]])),
      stage("stage-3", "Handle the thermos", sentenceVocab.slice(7, 11), sentenceVocab.slice(7, 11), "Give me a sec. Can you pass me the thermos? I’ll make you one.", "Bancame un toque. ¿Me pasás el termo? Te cebo uno.", "These phrases manage a casual turn as the cebador or cebadora.", breakdown([["Give me a sec", "Bancame un toque"], ["Can you pass me the thermos?", "¿Me pasás el termo?"], ["I'll make you one", "Te cebo uno"]])),
      stage("stage-4", "Choose sweet or unsweetened", sentenceVocab.slice(9, 11), sentenceVocab.slice(36, 38), "Do you want it sweet? No, I prefer unsweetened mate.", "¿Lo querés dulce? No, prefiero el mate amargo.", "Mate dulce contains sugar; mate amargo does not.", breakdown([["Do you want it sweet?", "¿Lo querés dulce?"], ["I prefer", "prefiero"], ["unsweetened mate", "el mate amargo"]])),
      stage("stage-5", "Give an etiquette warning", sentenceVocab.slice(11, 13), sentenceVocab.slice(24, 25), "Careful, it’s hot. Don’t move the straw because it gets clogged.", "Ojo que quema. No me muevas la bombilla, que se tapa.", "The bombilla normally stays in place so the yerba does not block it.", breakdown([["Careful, it's hot", "Ojo que quema"], ["Don't move the straw", "No me muevas la bombilla"], ["because it gets clogged", "que se tapa"]])),
      stage("stage-6", "React to the flavour", sentenceVocab.slice(13, 17), sentenceVocab.slice(20, 21), "At first it’s really strong, but I’m getting used to it. Give me another one.", "Al principio está re fuerte, pero me voy acostumbrando. Dame otro.", "Re fuerte is an Argentine intensifier; me voy acostumbrando shows gradual adjustment.", breakdown([["At first", "Al principio"], ["it's really strong", "está re fuerte"], ["I'm getting used to it", "me voy acostumbrando"], ["Give me another one", "Dame otro"]])),
      stage("stage-7", "Refresh a washed-out mate", sentenceVocab.slice(14, 16), sentenceVocab.slice(21, 22), "It has really lost its flavour. Let’s change the yerba; then it’ll be spot on.", "Se lavó mal. Cambiemos la yerba y va a quedar de diez.", "When the flavour is gone, the cebador changes the yerba.", breakdown([["It has really lost its flavour", "Se lavó mal"], ["Let's change the yerba", "Cambiemos la yerba"], ["it'll be spot on", "va a quedar de diez"]])),
      stage("stage-8", "Pause or finish the round", sentenceVocab.slice(18, 30), sentenceVocab, "I’m good for now. I’m done, thanks. Next time I’ll join and we’ll have some mate together.", "Por ahora estoy bien. Ya estoy, gracias. La próxima me sumo y tomamos unos mates.", "Gracias while returning the mate signals that you are finished, not just being polite.", breakdown([["I'm good for now", "Por ahora estoy bien"], ["I'm done, thanks", "Ya estoy, gracias"], ["Next time I'll join", "La próxima me sumo"], ["we'll have some mate", "tomamos unos mates"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-mate-story-q1", type: "multiple-choice", prompt: "What is Clara about to try for the first time?", options: ["Sharing mate", "Playing football", "Making coffee", "Taking the subway"], correctAnswer: "Sharing mate", explanation: "Tomi offers mate and Clara says she has never tried sharing it.", points: 1, skillTag: "setup" },
  { id: "arg-mate-story-q2", type: "multiple-choice", prompt: "How does Clara want her first mate?", options: ["Unsweetened", "Very sweet", "Cold", "With milk"], correctAnswer: "Unsweetened", explanation: "She answers amargo, porfa before Tomi serves it.", points: 1, skillTag: "preference" },
  { id: "arg-mate-story-q3", type: "multiple-choice", prompt: "What mistake does Clara make?", options: ["She moves the bombilla", "She spills the thermos", "She adds coffee", "She leaves immediately"], correctAnswer: "She moves the bombilla", explanation: "Tomi explains that moving it can clog the mate.", points: 1, skillTag: "etiquette" },
  { id: "arg-mate-story-q4", type: "true-false", prompt: "True or false: Clara finds the mate strong but asks for another one.", options: ["True", "False"], correctAnswer: "True", explanation: "She says it is very strong, but she is getting used to it and asks for another.", points: 1, skillTag: "reaction" },
  { id: "arg-mate-story-q5", type: "multiple-choice", prompt: "Why does Tomi ask Clara to serve?", options: ["He has to print their presentation", "He dislikes mate", "The thermos is empty", "Clara is leaving"], correctAnswer: "He has to print their presentation", explanation: "He briefly leaves Clara in charge while he prints.", points: 1, skillTag: "task" },
  { id: "arg-mate-story-q6", type: "multiple-choice", prompt: "What problem develops with the mate?", options: ["It loses its flavour", "It becomes too sweet", "The vessel breaks", "The water gets cold"], correctAnswer: "It loses its flavour", explanation: "Clara notices that it se lavó and Tomi tells her to change the yerba.", points: 1, skillTag: "mate-vocab" },
  { id: "arg-mate-story-q7", type: "multiple-choice", prompt: "How does Tomi rate Clara’s first mate as cebadora?", options: ["It turned out great", "It is undrinkable", "It is too sweet", "It needs more water"], correctAnswer: "It turned out great", explanation: "He says quedó de diez.", points: 1, skillTag: "evaluation" },
  { id: "arg-mate-story-q8", type: "multiple-choice", prompt: "What does Clara accidentally communicate by saying gracias?", options: ["That she is finished with the round", "That she wants sugar", "That she wants the thermos", "That the mate is too hot"], correctAnswer: "That she is finished with the round", explanation: "Tomi explains this cultural signal by message 24.", points: 1, skillTag: "cultural-rule" },
  { id: "arg-mate-story-q9", type: "multiple-choice", prompt: "What does Clara say after learning the rule?", options: ["¿Me cebás otro?", "Paso, gracias", "Se lavó mal", "Ojo que quema"], correctAnswer: "¿Me cebás otro?", explanation: "She corrects the misunderstanding by directly requesting another mate.", points: 1, skillTag: "repair" },
  { id: "arg-mate-story-q10", type: "multiple-choice", prompt: "What is Clara’s final plan?", options: ["Join the next round and help serve", "Never drink mate again", "Buy coffee instead", "Take the thermos home"], correctAnswer: "Join the next round and help serve", explanation: "The final message shows she is comfortable enough to join and serve next time.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishB1SharingMateFirstTimeWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B1 Story: Clara’s First Mate Round", subtitle: "Clara joins a study-group mate round, learns the bombilla rule, takes a turn serving, and makes one revealing etiquette mistake.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "WhatsApp", "mate", "culture"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "clara", name: "Clara", initials: "C", side: "left", color: "violet" }, { id: "tomi", name: "Tomi", initials: "T", side: "right", color: "blue" }],
    messages: [
      message("m1", "tomi", "Che, ya llegamos a la plaza. ¿Querés un mate?", "Hey, we’ve arrived at the square. Do you want some mate?", ["Che", "¿Querés un mate?"]),
      message("m2", "clara", "De una. Nunca compartí mate con un grupo.", "Absolutely. I’ve never shared mate with a group.", ["De una"]),
      message("m3", "tomi", "Tranqui, yo te explico mientras preparamos la presentación.", "No worries, I’ll explain while we prepare the presentation.", ["Tranqui"], "voice-note"),
      message("m4", "tomi", "¿Lo querés dulce o amargo?", "Do you want it sweet or unsweetened?", ["¿Lo querés dulce?"]),
      message("m5", "clara", "Amargo, porfa. Quiero probarlo como lo toman ustedes.", "Unsweetened, please. I want to try it the way you drink it.", ["Amargo, porfa", "Mate amargo"]),
      message("m6", "tomi", "Listo, te cebo uno. Ojo que quema.", "Okay, I’ll make you one. Careful, it’s hot.", ["Te cebo uno", "Ojo que quema"], "voice-note"),
      message("m7", "clara", "¿Puedo acomodar esta parte de metal?", "Can I adjust this metal part?", []),
      message("m8", "tomi", "No me muevas la bombilla, que se tapa.", "Don’t move the mate straw because it gets clogged.", ["No me muevas la bombilla", "Que se tapa", "Bombilla"]),
      message("m9", "clara", "Uy, menos mal que pregunté antes de tocarla.", "Oh, good thing I asked before touching it.", []),
      message("m10", "clara", "Está re fuerte al principio.", "It’s really strong at first.", ["Está re fuerte", "Al principio"]),
      message("m11", "tomi", "Sí, pero después te vas acostumbrando.", "Yes, but afterwards you get used to it.", []),
      message("m12", "clara", "Me voy acostumbrando. Está buenísimo; dame otro.", "I’m getting used to it. It’s really good; give me another.", ["Me voy acostumbrando", "Está buenísimo", "Dame otro"], "voice-note"),
      message("m13", "tomi", "Bancame un toque, tengo que imprimir la presentación.", "Give me a sec; I have to print the presentation.", ["Bancame un toque"]),
      message("m14", "tomi", "¿Te animás a cebar mientras vuelvo?", "Are you up for serving while I’m gone?", ["Cebar mate"]),
      message("m15", "clara", "Bueno. ¿Me pasás el termo antes de irte?", "Okay. Can you pass me the thermos before you go?", ["¿Me pasás el termo?", "Termo"]),
      message("m16", "clara", "Tomi, creo que este mate se lavó.", "Tomi, I think this mate has lost its flavour.", ["Se lavó", "Mate"]),
      message("m17", "tomi", "Ya voy. Si se lavó mal, cambiá la yerba.", "I’m coming. If it has really lost its flavour, change the yerba.", ["Ya voy", "Se lavó mal", "Cambiar la yerba", "Yerba"]),
      message("m18", "clara", "Perfecto, cambio la yerba y preparo la próxima ronda.", "Perfect, I’ll change the yerba and prepare the next round.", ["Cambiar la yerba"], "voice-note"),
      message("m19", "tomi", "Volví. A ver cómo quedó el primero de la nueva cebadora.", "I’m back. Let’s see how the new server’s first one turned out.", ["Cebador / cebadora"]),
      message("m20", "clara", "Probalo y decime la verdad.", "Try it and tell me the truth.", []),
      message("m21", "tomi", "Quedó de diez. Ya entendiste cómo repartir el agua.", "It turned out great. You’ve understood how to distribute the water.", ["Quedó de diez"]),
      message("m22", "clara", "Gracias.", "Thanks.", []),
      message("m23", "tomi", "¿Ya estás? Pensé que querías seguir tomando.", "Are you done? I thought you wanted to keep drinking.", []),
      message("m24", "clara", "No, lo dije por educación. ¿Decir gracias significa que termino?", "No, I said it to be polite. Does saying thanks mean I’m finished?", ["Ya estoy, gracias"], "voice-note"),
      message("m25", "tomi", "Exacto. Si querés seguir, devolvés el mate sin decir gracias.", "Exactly. If you want to continue, you return the mate without saying thanks.", []),
      message("m26", "clara", "Entendido. Entonces, ¿me cebás otro?", "Understood. So, can you make me another one?", ["¿Me cebás otro?"]),
      message("m27", "tomi", "Obvio. Igual, si necesitás una pausa, podés decir: por ahora estoy bien.", "Of course. Still, if you need a break, you can say: I’m good for now.", ["Igual", "Por ahora estoy bien"]),
      message("m28", "clara", "Hoy no ando a las corridas, así que me quedo.", "I’m not rushing around today, so I’m staying.", ["Ando medio a las corridas"]),
      message("m29", "tomi", "Buenísimo. Después terminamos la presentación y tomamos unos mates más.", "Great. Later we’ll finish the presentation and have some more mate.", ["Tomamos unos mates"]),
      message("m30", "clara", "De una. La próxima me sumo desde el principio y también cebo yo.", "Absolutely. Next time I’ll join from the beginning and I’ll serve too.", ["De una", "La próxima me sumo", "Al principio", "Cebar mate"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-mate-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: mateVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: mateVocab.map((item) => item.term),
      grammarPatterns: ["Voseo questions: querés, cebás, pasás.", "Voseo imperatives: bancame, dame, cambiá.", "Gradual change with me voy acostumbrando."],
      speakingPrompts: ["Accept or refuse an offer of mate.", "Choose mate dulce or mate amargo.", "Warn someone not to move the bombilla.", "Signal that you want another round or that you are finished."],
    },
    completionTask: { title: "Your first mate-round voice note", instructions: "Record a 90-second explanation of joining a mate round for the first time. Use at least eight target expressions and explain the gracias rule." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Argentina, compartir “mate” es mucho más que tomar una bebida. La palabra nombra tanto la infusión como el recipiente. Una invitación simple —“Che, ¿querés un mate?”— puede abrir una conversación, acompañar el estudio o convertir una pausa en un momento social. Responder “de una” muestra entusiasmo; “paso, gracias” rechaza la invitación con amabilidad.", translation: "In Argentina, sharing mate is more than drinking something. The word names both the infusion and vessel. The invitation can open a social moment; de una accepts enthusiastically and paso, gracias politely refuses.", highlights: highlights(["Mate", "Che", "¿Querés un mate?", "De una", "Paso, gracias"]), shadowLine: "Che, ¿querés un mate? De una." },
  { id: "p2", text: "La persona que prepara y reparte cada turno es el “cebador” o la “cebadora”. “Cebar mate” significa controlar el agua, cuidar la “yerba” y pasar el recipiente en orden. Por eso son naturales preguntas como “¿me cebás uno?” o propuestas como “te cebo uno”. El “termo” mantiene el agua caliente durante toda la ronda.", translation: "The cebador or cebadora prepares each turn, manages the water and yerba, and passes the mate. The thermos keeps the water hot.", highlights: highlights(["Cebador / cebadora", "Cebar mate", "Yerba", "¿Me cebás uno?", "Te cebo uno", "Termo"]), shadowLine: "¿Me cebás uno? Te paso el termo." },
  { id: "p3", text: "Cada persona puede elegir entre “mate amargo” y “mate dulce”. Para pedirlo sin azúcar alcanza con decir “amargo, porfa”; para preguntar por azúcar se usa “¿lo querés dulce?”. Si alguien necesita unos segundos para preparar el agua, puede decir “bancame un toque” o pedir “¿me pasás el termo?”.", translation: "People may choose unsweetened or sweetened mate. The remaining phrases request that preference and manage the preparation naturally.", highlights: highlights(["Mate amargo", "Mate dulce", "Amargo, porfa", "¿Lo querés dulce?", "Bancame un toque", "¿Me pasás el termo?"]), shadowLine: "Amargo, porfa. ¿Me pasás el termo?" },
  { id: "p4", text: "La “bombilla” es el sorbete metálico con filtro. Una regla básica es no moverla: “no me muevas la bombilla, que se tapa”. También conviene escuchar “ojo que quema”, porque el agua está caliente. Estas advertencias no son retos; protegen la preparación y evitan una primera experiencia incómoda.", translation: "The bombilla is the filtered metal straw. Do not move it because it may clog, and pay attention when someone warns that the mate is hot.", highlights: highlights(["Bombilla", "No me muevas la bombilla", "Que se tapa", "Ojo que quema"]), shadowLine: "Ojo que quema; no me muevas la bombilla, que se tapa." },
  { id: "p5", text: "El primer mate puede parecer “re fuerte”. “Al principio” el sabor sorprende, pero mucha gente dice “me voy acostumbrando”. Si le gusta, puede reaccionar con “está buenísimo”, pedir “dame otro” o preguntar “¿me cebás otro?”. “Tranqui” recuerda que no hace falta tomarlo rápido.", translation: "The first mate may taste very strong, but people gradually get used to it. These expressions praise it, request another, or keep the pace relaxed.", highlights: highlights(["Está re fuerte", "Al principio", "Me voy acostumbrando", "Está buenísimo", "Dame otro", "¿Me cebás otro?", "Tranqui"]), shadowLine: "Al principio está re fuerte, pero me voy acostumbrando." },
  { id: "p6", text: "Con varios turnos, la yerba pierde intensidad. Entonces se dice “se lavó” o, si ya no tiene casi sabor, “se lavó mal”. La solución es “cambiar la yerba”. Cuando la preparación nueva sale bien, un comentario muy argentino es “quedó de diez”.", translation: "After several turns, the yerba loses flavour: se lavó or se lavó mal. The solution is changing the yerba, and quedó de diez praises the result.", highlights: highlights(["Se lavó", "Se lavó mal", "Cambiar la yerba", "Quedó de diez"]), shadowLine: "Se lavó mal; cambiemos la yerba y va a quedar de diez." },
  { id: "p7", text: "El turno también se negocia con frases cotidianas. “Ya voy” anuncia que alguien se acerca; “ando medio a las corridas” explica que tiene poco tiempo. Si hoy no participa, puede decir “la próxima me sumo”. Si solo necesita una pausa, “por ahora estoy bien” deja abierta la posibilidad de volver después.", translation: "These everyday phrases manage joining, being busy, postponing participation, or taking a temporary pause.", highlights: highlights(["Ya voy", "Ando medio a las corridas", "La próxima me sumo", "Por ahora estoy bien"]), shadowLine: "Hoy ando a las corridas; la próxima me sumo." },
  { id: "p8", text: "La regla cultural más importante aparece al devolver el mate. Decir “gracias” suele indicar que la persona terminó y no quiere otro. Por eso “ya estoy, gracias” cierra la participación. Si quiere seguir, devuelve el mate sin agradecer y espera el próximo turno. “Igual”, cada grupo tiene su ritmo: lo importante es observar, preguntar y disfrutar cuando “tomamos unos mates”.", translation: "The key cultural rule is that saying thanks when returning the mate normally means you are finished. If continuing, return it without thanks and wait for the next turn.", highlights: highlights(["Ya estoy, gracias", "Igual", "Tomamos unos mates"]), shadowLine: "Ya estoy, gracias. La próxima tomamos unos mates." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-mate-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Mate vocabulary, preparation, and sharing etiquette", "Coffee-shop service", "Football rules", "Formal introductions"], correctAnswer: "Mate vocabulary, preparation, and sharing etiquette", explanation: "The reading explains the objects, roles, expressions, and social rules of mate.", points: 1, skillTag: "gist" },
  { id: "arg-mate-reading-q2", type: "multiple-choice", prompt: "Who controls the water and serves each turn?", options: ["The cebador or cebadora", "The newest guest", "The person holding the thermos", "Everyone simultaneously"], correctAnswer: "The cebador or cebadora", explanation: "That person prepares and manages the round.", points: 1, skillTag: "role" },
  { id: "arg-mate-reading-q3", type: "true-false", prompt: "True or false: Moving the bombilla is recommended to improve the flavour.", options: ["True", "False"], correctAnswer: "False", explanation: "Moving it can disturb the yerba and clog the filter.", points: 1, skillTag: "etiquette" },
  { id: "arg-mate-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "At first it’s really strong, but I’m getting used to it.", wordBank: ["Al", "principio", "está", "re", "fuerte,", "pero", "me", "voy", "acostumbrando."], correctAnswer: "Al principio está re fuerte, pero me voy acostumbrando.", explanation: "The sentence contrasts the first reaction with gradual adjustment.", points: 2, skillTag: "phrase-building" },
  { id: "arg-mate-reading-q5", type: "multiple-choice", prompt: "What does gracias usually signal when returning the mate?", options: ["You are finished", "You want sugar", "The water is cold", "You want another immediately"], correctAnswer: "You are finished", explanation: "This is the central cultural etiquette rule in the reading.", points: 1, skillTag: "culture" },
];

export const argentinianSpanishB1SharingMateFirstTimeReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B1 Reading: La Ronda de Mate", subtitle: "A synced Spanish cultural reading about preparing mate, sharing turns, taste, essential objects, and the meaning of gracias.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "reading", "mate", "culture"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: mateVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Argentinian B1 sharing mate vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const argentinianSpanishB1SharingMateFirstTimeQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian Spanish B1: Sharing Mate for the First Time Quiz", subtitle: "Choose the right phrase for mate preferences, preparation, etiquette, taste, and ending your turn.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "quiz", "mate", "culture"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Practice choosing natural Argentine expressions for each stage of a shared mate round.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-mate-quiz-1", type: "multiple-choice", prompt: "Someone offers you mate and you enthusiastically accept. What do you say?", options: ["De una", "Paso, gracias", "Se lavó", "Ya estoy"], correctAnswer: "De una", explanation: "De una is an enthusiastic informal acceptance.", points: 1, skillTag: "accepting" },
      { id: "arg-mate-quiz-2", type: "fill-blank", prompt: "Complete: ¿Me ______ uno?", nativePrompt: "Can you make me a mate?", correctAnswer: "cebás", explanation: "Cebás is the voseo form of cebar.", points: 1, skillTag: "voseo" },
      { id: "arg-mate-quiz-3", type: "multiple-choice", prompt: "You want mate without sugar. Which answer fits?", options: ["Amargo, porfa", "Dulce, porfa", "Se lavó mal", "Por ahora estoy bien"], correctAnswer: "Amargo, porfa", explanation: "Mate amargo is unsweetened mate.", points: 1, skillTag: "preference" },
      { id: "arg-mate-quiz-4", type: "order-words", prompt: "Order the warning.", nativePrompt: "Don’t move the straw because it gets clogged.", wordBank: ["No", "me", "muevas", "la", "bombilla,", "que", "se", "tapa."], correctAnswer: "No me muevas la bombilla, que se tapa.", explanation: "This teaches the central bombilla etiquette rule.", points: 2, skillTag: "etiquette" },
      { id: "arg-mate-quiz-5", type: "true-false", prompt: "True or false: “Se lavó” means the mate has lost its flavour.", options: ["True", "False"], correctAnswer: "True", explanation: "It describes yerba that no longer gives much flavour.", points: 1, skillTag: "mate-vocab" },
      { id: "arg-mate-quiz-6", type: "multiple-choice", prompt: "The flavour is almost completely gone. What should the cebador do?", options: ["Cambiar la yerba", "Mover la bombilla", "Add cold water", "Say paso, gracias"], correctAnswer: "Cambiar la yerba", explanation: "Changing the yerba refreshes a washed-out mate.", points: 1, skillTag: "preparation" },
      { id: "arg-mate-quiz-7", type: "fill-blank", prompt: "Complete: Al principio está re fuerte, pero me voy ______.", nativePrompt: "At first it’s really strong, but I’m getting used to it.", correctAnswer: "acostumbrando", explanation: "Me voy acostumbrando expresses gradual adjustment.", points: 1, skillTag: "reaction" },
      { id: "arg-mate-quiz-8", type: "multiple-choice", prompt: "You want one more round. Which phrase fits?", options: ["¿Me cebás otro?", "Ya estoy, gracias", "Paso, gracias", "La próxima me sumo"], correctAnswer: "¿Me cebás otro?", explanation: "This directly requests another mate.", points: 1, skillTag: "request" },
      { id: "arg-mate-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "With the new yerba it turned out great.", wordBank: ["Con", "la", "yerba", "nueva", "quedó", "de", "diez."], correctAnswer: "Con la yerba nueva quedó de diez.", explanation: "Quedó de diez strongly praises the result.", points: 2, skillTag: "evaluation" },
      { id: "arg-mate-quiz-10", type: "multiple-choice", prompt: "You return the mate and want no more. What should you say?", options: ["Ya estoy, gracias", "Dame otro", "¿Me cebás uno?", "De una"], correctAnswer: "Ya estoy, gracias", explanation: "Gracias signals that you are leaving the round.", points: 1, skillTag: "culture" },
      pairQuestion("arg-mate-pairs-1", "Match invitations, preferences, and everyday responses.", mateVocab.slice(0, 13)),
      pairQuestion("arg-mate-pairs-2", "Match flavour, timing, and participation phrases.", mateVocab.slice(13, 26)),
      pairQuestion("arg-mate-pairs-3", "Match mate objects, roles, preparation, and final responses.", mateVocab.slice(26)),
    ],
  },
};
