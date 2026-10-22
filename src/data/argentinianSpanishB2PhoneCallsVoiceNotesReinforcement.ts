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
};

const courseId = "argentinian-spanish-b2-phone-calls-voice-notes";
const sectionName = "Argentinian Spanish - B2 Phone Calls and Voice Notes";

const phoneVocab: VocabItem[] = [
  { id: "me-escuchas", term: "¿Me escuchás?", meaning: "Can you hear me?", note: "Argentine voseo form of ¿Me escuchas?.", example: "¿Me escuchás o se cortó otra vez?", translation: "Can you hear me, or did it drop again?" },
  { id: "ahi-te-escucho", term: "Ahí te escucho", meaning: "Now I can hear you", note: "Ahí marks the moment the sound starts working properly.", example: "Ahí te escucho, seguí.", translation: "Now I can hear you; go on." },
  { id: "se-corta", term: "Se corta", meaning: "It keeps cutting out", note: "Present tense describes an unstable connection that repeatedly cuts out.", example: "Hablá de nuevo porque se corta.", translation: "Speak again because it keeps cutting out." },
  { id: "se-escucha-medio-mal", term: "Se escucha medio mal", meaning: "It sounds a bit bad", note: "Medio softens the negative evaluation.", example: "Ahí te escucho, pero se escucha medio mal.", translation: "Now I can hear you, but it sounds a bit bad." },
  { id: "me-repetis", term: "¿Me repetís?", meaning: "Can you repeat that?", note: "Argentine voseo form of ¿Me repites?.", example: "¿Me repetís la dirección?", translation: "Can you repeat the address?" },
  { id: "no-te-entendi-bien", term: "No te entendí bien", meaning: "I didn’t understand you properly", note: "Useful when the problem may be sound quality or the message itself.", example: "No te entendí bien; se cortó justo al final.", translation: "I didn’t understand you properly; it cut out right at the end." },
  { id: "habla-mas-despacio", term: "Hablá un toque más despacio", meaning: "Speak a little more slowly", note: "Hablá is a voseo imperative; un toque means a little.", example: "¿Me repetís y hablás un toque más despacio?", translation: "Can you repeat it and speak a little more slowly?" },
  { id: "podes-hablar", term: "¿Podés hablar?", meaning: "Can you talk?", note: "Voseo form used to check whether it is a good time for a call.", example: "Che, ¿podés hablar dos minutos?", translation: "Hey, can you talk for two minutes?" },
  { id: "bancame-un-toque", term: "Bancame un toque", meaning: "Give me a sec / hang on a moment", note: "Very natural informal Argentine request to wait briefly.", example: "Bancame un toque que busco los auriculares.", translation: "Give me a sec while I find my headphones." },
  { id: "ahi-va", term: "Ahí va", meaning: "There we go / that’s better", note: "A natural reaction when the connection or setup starts working.", example: "Ahí va, ahora sí te escucho.", translation: "There we go, now I can hear you." },
  { id: "te-llamo-en-un-rato", term: "Te llamo en un rato", meaning: "I’ll call you in a bit", note: "En un rato is flexible and means after a short, unspecified interval.", example: "Ahora estoy ocupado; te llamo en un rato.", translation: "I’m busy right now; I’ll call you in a bit." },
  { id: "te-devuelvo-la-llamada", term: "Te devuelvo la llamada", meaning: "I’ll call you back", note: "Neutral and widely understood, suitable beyond informal chats too.", example: "Te devuelvo la llamada cuando salga.", translation: "I’ll call you back when I leave." },
  { id: "mandame-un-audio", term: "Mandame un audio", meaning: "Send me a voice note", note: "Mandame is a voseo imperative; audio is the everyday word for voice note.", example: "Si no podés hablar, mandame un audio.", translation: "If you can’t talk, send me a voice note." },
  { id: "te-mando-un-audio", term: "Te mando un audio", meaning: "I’ll send you a voice note", note: "Useful when a call is inconvenient or the connection is poor.", example: "Te mando un audio con todos los detalles.", translation: "I’ll send you a voice note with all the details." },
  { id: "estoy-en-la-calle", term: "Estoy en la calle", meaning: "I’m out / I’m on the street", note: "Often explains background noise or why a person cannot speak freely.", example: "Estoy en la calle y hay mucho ruido.", translation: "I’m out and there’s a lot of noise." },
  { id: "tengo-poca-senal", term: "Tengo poca señal", meaning: "I barely have any signal", note: "A natural explanation for unstable audio or messages arriving late.", example: "Acá tengo poca señal.", translation: "I barely have any signal here." },
  { id: "se-me-corto", term: "Se me cortó", meaning: "The call dropped on me", note: "The accidental se construction emphasizes that it happened unexpectedly.", example: "Se me cortó cuando dijiste la dirección.", translation: "The call dropped when you said the address." },
  { id: "sin-bateria", term: "Me quedé sin batería", meaning: "My battery died", note: "Literally, I was left without battery.", example: "Te quise llamar, pero me quedé sin batería.", translation: "I tried to call you, but my battery died." },
  { id: "te-cuento-rapido", term: "Te cuento rápido", meaning: "I’ll tell you quickly", note: "Introduces a short, compressed update when time is limited.", example: "Te cuento rápido porque estoy entrando al subte.", translation: "I’ll tell you quickly because I’m entering the subway." },
  { id: "era-para-decirte", term: "Era para decirte que…", meaning: "I just wanted to tell you that…", note: "Imperfect era softens the purpose of the call or voice note.", example: "Era para decirte que cambió la reunión.", translation: "I just wanted to tell you that the meeting changed." },
  { id: "avisame-cuando-puedas", term: "Avisame cuando puedas", meaning: "Let me know when you can", note: "Voseo imperative that removes immediate pressure.", example: "Avisame cuando puedas hablar.", translation: "Let me know when you can talk." },
  { id: "despues-hablamos-tranqui", term: "Después hablamos tranqui", meaning: "We’ll talk later, no rush", note: "Tranqui makes the message relaxed and reassuring.", example: "Ahora resolvé eso y después hablamos tranqui.", translation: "Sort that out now and we’ll talk later, no rush." },
  { id: "cuando-puedas-escuchalo", term: "Cuando puedas, escuchalo", meaning: "Listen to it when you can", note: "Escuchalo is the voseo affirmative imperative with the object pronoun attached.", example: "Cuando puedas, escuchalo y avisame.", translation: "Listen to it when you can and let me know." },
  { id: "despues-lo-escucho", term: "Después lo escucho", meaning: "I’ll listen to it later", note: "A neutral way to postpone listening to a voice note.", example: "Estoy en una reunión; después lo escucho.", translation: "I’m in a meeting; I’ll listen to it later." },
  { id: "despues-te-contesto", term: "Después te contesto", meaning: "I’ll reply later", note: "Can refer to replying by message, voice note, or call.", example: "Mandame todo y después te contesto.", translation: "Send me everything and I’ll reply later." },
  { id: "te-quise-llamar", term: "Te quise llamar", meaning: "I tried to call you", note: "Natural conversational use of querer in the preterite for an attempted call.", example: "Te quise llamar, pero no atendiste.", translation: "I tried to call you, but you didn’t answer." },
  { id: "ahora-no-puedo-hablar", term: "Ahora no puedo hablar", meaning: "I can’t talk right now", note: "A direct but neutral boundary; add mandame un audio to offer an alternative.", example: "Ahora no puedo hablar; mandame un audio.", translation: "I can’t talk right now; send me a voice note." },
  { id: "ahora-estoy-ocupado", term: "Ahora estoy ocupado", meaning: "I’m busy right now", note: "Use ocupada for a female speaker.", example: "Ahora estoy ocupado, pero te llamo después.", translation: "I’m busy right now, but I’ll call you later." },
  { id: "casi-no-te-escucho", term: "Casi no te escucho", meaning: "I can barely hear you", note: "Stronger connection problem than se escucha medio mal.", example: "Casi no te escucho y se corta.", translation: "I can barely hear you and it keeps cutting out." },
  { id: "cuando-puedas", term: "Cuando puedas…", meaning: "When you can…", note: "A flexible pressure-reducing opener for requests.", example: "Cuando puedas, llamame.", translation: "When you can, call me." },
  { id: "perdon-se-me-corto", term: "Perdón, se me cortó", meaning: "Sorry, the call dropped", note: "A complete repair phrase when reconnecting after a dropped call.", example: "Perdón, se me cortó justo cuando hablabas.", translation: "Sorry, the call dropped right when you were speaking." },
];

const highlightMap = Object.fromEntries(phoneVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

const sentenceVocab = phoneVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB2PhoneCallsVoiceNotesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B2: Phone Calls & Voice Notes Flashcards", subtitle: "Natural voseo for bad connections, call-backs, voice notes, availability, and low-pressure follow-up.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "flashcards", "phone calls", "voice notes"], estimatedMinutes: 17,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: phoneVocab.map(cardFromVocab) },
};

export const argentinianSpanishB2PhoneCallsVoiceNotesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B2 Sentence Builder: Argentine Phone Calls and Voice Notes", subtitle: "Build natural call repairs, availability checks, voice-note requests, and asynchronous follow-up.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["argentinian-spanish", "b2", "sentence-builder", "phone", "voice-notes"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Handle a bad connection, ask for repetition, explain why you cannot talk, switch to a voice note, and arrange a relaxed follow-up.",
    stages: [
      stage("stage-1", "Check the connection", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Can you hear me? I can barely hear you and it keeps cutting out.", "¿Me escuchás? Casi no te escucho y se corta.", "Escuchás is voseo; se corta describes repeated connection loss.", breakdown([["Can you hear me?", "¿Me escuchás?"], ["I can barely hear you", "Casi no te escucho"], ["it keeps cutting out", "se corta"]])),
      stage("stage-2", "Notice an improvement", sentenceVocab.slice(1, 4), sentenceVocab.slice(0, 4), "There we go. Now I can hear you, but it still sounds a bit bad.", "Ahí va. Ahí te escucho, pero se escucha medio mal.", "Ahí va reacts to the improvement; medio softens the complaint.", breakdown([["There we go", "Ahí va"], ["Now I can hear you", "Ahí te escucho"], ["it sounds a bit bad", "se escucha medio mal"]])),
      stage("stage-3", "Ask for clarification", sentenceVocab.slice(4, 7), sentenceVocab.slice(0, 7), "Can you repeat that? I didn’t understand you properly. Speak a little more slowly.", "¿Me repetís? No te entendí bien. Hablá un toque más despacio.", "Repetís and hablá are voseo forms; un toque keeps the request casual.", breakdown([["Can you repeat that?", "¿Me repetís?"], ["I didn't understand you properly", "No te entendí bien"], ["Speak a little more slowly", "Hablá un toque más despacio"]])),
      stage("stage-4", "Check availability", sentenceVocab.slice(7, 10), sentenceVocab.slice(0, 10), "Hey, can you talk? Give me a sec. There we go.", "Che, ¿podés hablar? Bancame un toque. Ahí va.", "Podés is voseo; bancame un toque asks the caller to wait briefly.", breakdown([["Hey", "Che"], ["can you talk?", "¿podés hablar?"], ["Give me a sec", "Bancame un toque"], ["There we go", "Ahí va"]])),
      stage("stage-5", "Arrange a call-back", sentenceVocab.slice(10, 12), sentenceVocab.slice(10, 12), "I’m busy right now. I’ll call you back in a bit.", "Ahora estoy ocupado. Te devuelvo la llamada en un rato.", "This sets a boundary while offering a clear follow-up.", breakdown([["I'm busy right now", "Ahora estoy ocupado"], ["I'll call you back", "Te devuelvo la llamada"], ["in a bit", "en un rato"]])),
      stage("stage-6", "Switch to voice notes", sentenceVocab.slice(12, 14), sentenceVocab.slice(12, 14), "If you can’t talk, send me a voice note. I’ll send you one too.", "Si no podés hablar, mandame un audio. Yo también te mando uno.", "Mandame is the voseo imperative; audio means voice note in everyday speech.", breakdown([["If you can't talk", "Si no podés hablar"], ["send me a voice note", "mandame un audio"], ["I'll send you one too", "Yo también te mando uno"]])),
      stage("stage-7", "Explain the technical problem", sentenceVocab.slice(14, 18), sentenceVocab.slice(14, 18), "Sorry, the call dropped. I’m out, I barely have any signal, and my battery died.", "Perdón, se me cortó. Estoy en la calle, tengo poca señal y me quedé sin batería.", "The accidental se construction makes the dropped call sound unintentional.", breakdown([["Sorry, the call dropped", "Perdón, se me cortó"], ["I'm out", "Estoy en la calle"], ["I barely have any signal", "tengo poca señal"], ["my battery died", "me quedé sin batería"]])),
      stage("stage-8", "Leave an asynchronous update", sentenceVocab.slice(18), sentenceVocab, "I’ll tell you quickly: I just wanted to say the meeting changed. Listen when you can, let me know, and we’ll talk later, no rush.", "Te cuento rápido: era para decirte que cambió la reunión. Cuando puedas, escuchalo, avisame y después hablamos tranqui.", "This packages the purpose, request, and low-pressure follow-up into one natural voice note.", breakdown([["I'll tell you quickly", "Te cuento rápido"], ["I just wanted to say", "era para decirte"], ["Listen when you can", "Cuando puedas, escuchalo"], ["let me know", "avisame"], ["we'll talk later, no rush", "después hablamos tranqui"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-phone-story-q1", type: "multiple-choice", prompt: "What urgent change does Sofi announce?", options: ["The surprise dinner venue changed", "The birthday was cancelled", "The cake was lost", "Lean missed a flight"], correctAnswer: "The surprise dinner venue changed", explanation: "Sofi reveals the venue change by message 3.", points: 1, skillTag: "main-update" },
  { id: "arg-phone-story-q2", type: "multiple-choice", prompt: "Where is the dinner moving?", options: ["From San Telmo to Palermo", "From Palermo to Córdoba", "From Recoleta to San Telmo", "From a restaurant to Sofi’s house"], correctAnswer: "From San Telmo to Palermo", explanation: "Sofi repeats the move clearly in message 6.", points: 1, skillTag: "location" },
  { id: "arg-phone-story-q3", type: "multiple-choice", prompt: "Why can’t Lean speak freely?", options: ["Cami is beside him", "He is in a meeting", "His battery died", "He is driving"], correctAnswer: "Cami is beside him", explanation: "Lean cannot discuss her surprise while she is next to him.", points: 1, skillTag: "reason" },
  { id: "arg-phone-story-q4", type: "multiple-choice", prompt: "Where is Cami already heading?", options: ["San Telmo", "Palermo", "Home", "The airport"], correctAnswer: "San Telmo", explanation: "Lean says she is already on her way to the old venue.", points: 1, skillTag: "problem" },
  { id: "arg-phone-story-q5", type: "multiple-choice", prompt: "What does Sofi send Lean?", options: ["A voice note with the new address and an excuse", "A photo of the cake", "A train ticket", "A restaurant bill"], correctAnswer: "A voice note with the new address and an excuse", explanation: "She sends the information before the fifth checkpoint.", points: 1, skillTag: "solution" },
  { id: "arg-phone-story-q6", type: "true-false", prompt: "True or false: Sofi’s phone battery dies after she tries to call again.", options: ["True", "False"], correctAnswer: "True", explanation: "She explains this from WhatsApp Web at message 18.", points: 1, skillTag: "technical-problem" },
  { id: "arg-phone-story-q7", type: "multiple-choice", prompt: "How does Lean redirect Cami?", options: ["He says the reservation changed because of a kitchen problem", "He tells her the surprise", "He says the dinner is cancelled", "He asks her to go home"], correctAnswer: "He says the reservation changed because of a kitchen problem", explanation: "That excuse gets Cami to change direction without revealing the surprise.", points: 1, skillTag: "cover-story" },
  { id: "arg-phone-story-q8", type: "multiple-choice", prompt: "What important detail do they confirm by message 24?", options: ["The cake is waiting at the Palermo venue", "The cake is still in San Telmo", "Cami knows everything", "The restaurant has closed"], correctAnswer: "The cake is waiting at the Palermo venue", explanation: "Sofi confirms the cake is already at the new location.", points: 1, skillTag: "confirmation" },
  { id: "arg-phone-story-q9", type: "multiple-choice", prompt: "Why does Cami become suspicious?", options: ["She sees both restaurant names in a notification", "Lean says happy birthday too early", "Sofi calls her directly", "The cake arrives at her house"], correctAnswer: "She sees both restaurant names in a notification", explanation: "Lean reports the notification before message 27.", points: 1, skillTag: "new-obstacle" },
  { id: "arg-phone-story-q10", type: "multiple-choice", prompt: "What is the final outcome?", options: ["Cami is surprised and the party succeeds", "Cami goes to the wrong venue", "The dinner is cancelled", "Lean never hears the voice note"], correctAnswer: "Cami is surprised and the party succeeds", explanation: "The final voice note confirms the surprise worked.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishB2PhoneCallsVoiceNotesWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B2 Story: The Voice Note Nobody Could Hear", subtitle: "Sofi and Lean rescue a surprise dinner while calls drop, batteries die, and the guest of honour heads to the wrong venue.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "WhatsApp", "phone calls", "voice notes"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "sofi", name: "Sofi", initials: "S", side: "left", color: "violet" }, { id: "lean", name: "Lean", initials: "L", side: "right", color: "blue" }],
    messages: [
      message("m1", "sofi", "Lean, ¿me escuchás?", "Lean, can you hear me?", ["¿Me escuchás?"]),
      message("m2", "lean", "Casi no te escucho. Se corta un montón.", "I can barely hear you. It keeps cutting out badly.", ["Casi no te escucho", "Se corta"]),
      message("m3", "sofi", "Te cuento rápido: cambió el lugar de la cena sorpresa.", "I’ll tell you quickly: the surprise dinner venue changed.", ["Te cuento rápido"], "voice-note"),
      message("m4", "lean", "¿Me repetís? No te entendí bien.", "Can you repeat that? I didn’t understand you properly.", ["¿Me repetís?", "No te entendí bien"]),
      message("m5", "lean", "Y hablá un toque más despacio, porfa.", "And speak a little more slowly, please.", ["Hablá un toque más despacio"]),
      message("m6", "sofi", "La cena pasa de San Telmo a Palermo. ¿Ahí me escuchás?", "The dinner is moving from San Telmo to Palermo. Can you hear me now?", ["¿Me escuchás?"], "voice-note"),
      message("m7", "lean", "Sí, pero Cami está al lado mío. ¿Podés hablar después?", "Yes, but Cami is beside me. Can you talk later?", ["¿Podés hablar?"]),
      message("m8", "sofi", "Obvio. Mandame un audio cuando estés solo.", "Of course. Send me a voice note when you’re alone.", ["Mandame un audio"]),
      message("m9", "lean", "Bancame un toque que busco los auriculares.", "Give me a sec while I find my headphones.", ["Bancame un toque"]),
      message("m10", "lean", "Ahí va. Ahora sí, pero tengo dos por ciento de batería.", "There we go. Now it works, but I have two percent battery.", ["Ahí va"]),
      message("m11", "sofi", "¿Te llamo en un rato?", "Shall I call you in a bit?", ["Te llamo en un rato"]),
      message("m12", "lean", "No llegamos: Cami ya está yendo a San Telmo.", "We don’t have time: Cami is already heading to San Telmo.", [], "voice-note"),
      message("m13", "sofi", "Perdón, se me cortó justo al final.", "Sorry, the call dropped right at the end.", ["Perdón, se me cortó"]),
      message("m14", "sofi", "Te mando un audio con la dirección nueva.", "I’ll send you a voice note with the new address.", ["Te mando un audio"]),
      message("m15", "sofi", "También te dejo una excusa para que Cami cambie de rumbo sin sospechar.", "I’ll also give you an excuse so Cami changes direction without becoming suspicious.", []),
      message("m16", "lean", "Lo recibí, pero ahora no puedo hablar ni escucharlo con ella acá.", "I received it, but I can’t talk or listen to it now with her here.", ["Ahora no puedo hablar"]),
      message("m17", "lean", "Después lo escucho apenas se baje del auto.", "I’ll listen to it later as soon as she gets out of the car.", ["Después lo escucho"]),
      message("m18", "sofi", "Te quise llamar otra vez, pero me quedé sin batería. Estoy desde WhatsApp Web.", "I tried to call you again, but my battery died. I’m on WhatsApp Web.", ["Te quise llamar", "Me quedé sin batería"], "voice-note"),
      message("m19", "lean", "Listo, escuché el audio. La nueva dirección quedó clarísima.", "Okay, I heard the voice note. The new address was completely clear.", []),
      message("m20", "lean", "Le dije que cambiaron la reserva por un problema en la cocina.", "I told her the reservation changed because of a kitchen problem.", []),
      message("m21", "lean", "Lo creyó y ya estamos yendo a Palermo.", "She believed it and we’re already heading to Palermo.", []),
      message("m22", "sofi", "Genial. Recuperé el teléfono. ¿Me escuchás mejor ahora?", "Great. I got my phone working again. Can you hear me better now?", ["¿Me escuchás?"]),
      message("m23", "lean", "Ahí te escucho. Antes se escuchaba medio mal.", "Now I can hear you. Before, it sounded a bit bad.", ["Ahí te escucho", "Se escucha medio mal"]),
      message("m24", "sofi", "Perfecto. La torta ya está esperando en el salón de Palermo.", "Perfect. The cake is already waiting at the Palermo venue.", [], "voice-note"),
      message("m25", "lean", "Nuevo problema: Cami vio los dos nombres de restaurante en una notificación.", "New problem: Cami saw both restaurant names in a notification.", []),
      message("m26", "sofi", "Decile que era para comparar precios y que elegimos Palermo recién hoy.", "Tell her it was to compare prices and that we only chose Palermo today.", []),
      message("m27", "lean", "Funcionó. Igual me preguntó por qué estás mandando tantos audios.", "It worked. Still, she asked why you’re sending so many voice notes.", []),
      message("m28", "sofi", "Decile que después le contesto; ahora estoy ocupada con el trabajo.", "Tell her I’ll reply later; I’m busy with work right now.", ["Después te contesto", "Ahora estoy ocupado"]),
      message("m29", "lean", "Llegamos. Después hablamos tranqui y te cuento su reacción.", "We’ve arrived. We’ll talk later, no rush, and I’ll tell you her reaction.", ["Después hablamos tranqui"]),
      message("m30", "sofi", "¡Salió perfecto! Cuando puedas, escuchá su mensaje: no sospechó nada y quedó feliz.", "It worked perfectly! Listen to her message when you can: she suspected nothing and was delighted.", ["Cuando puedas…", "Cuando puedas, escuchalo"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-phone-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: phoneVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: phoneVocab.map((item) => item.term),
      grammarPatterns: ["Voseo questions: ¿me escuchás?, ¿me repetís?, ¿podés hablar?", "Voseo imperatives: hablá, mandame, avisame, escuchalo.", "Accidental se for technical problems: se me cortó."],
      speakingPrompts: ["Repair a call with bad sound.", "Say you cannot talk and request a voice note.", "Leave a short update with no pressure to reply immediately.", "Explain that the call dropped and arrange a call-back."],
    },
    completionTask: { title: "Your Argentine B2 voice-note exchange", instructions: "Record two short voice notes: explain a dropped call, give an urgent update, and arrange a relaxed follow-up using at least eight target phrases." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una llamada informal argentina, “¿me escuchás?” suele aparecer antes de entrar en tema. Si la conexión falla, “se corta” describe una interrupción repetida, mientras que “casi no te escucho” indica que el problema ya es serio. “Se escucha medio mal” suaviza la crítica y deja claro que todavía se entiende algo.", translation: "In an informal Argentine call, ¿me escuchás? often appears before the topic. Se corta describes repeated interruption, casi no te escucho a serious problem, and se escucha medio mal a softer complaint.", highlights: highlights(["¿Me escuchás?", "Se corta", "Casi no te escucho", "Se escucha medio mal"]), shadowLine: "¿Me escuchás? Casi no te escucho y se corta." },
  { id: "p2", text: "Cuando falta información, “¿me repetís?” y “no te entendí bien” reparan la conversación sin culpar a la otra persona. Si hace falta ajustar el ritmo, se puede sumar “hablá un toque más despacio”. Las formas “repetís” y “hablá” muestran el voseo rioplatense.", translation: "¿Me repetís? and no te entendí bien repair missing information without blame. Hablá un toque más despacio adjusts the pace, using River Plate voseo.", highlights: highlights(["¿Me repetís?", "No te entendí bien", "Hablá un toque más despacio"]), shadowLine: "¿Me repetís y hablás un toque más despacio?" },
  { id: "p3", text: "Antes de llamar conviene preguntar “¿podés hablar?”. Si la persona necesita unos segundos, responde “bancame un toque”. Cuando por fin conecta los auriculares o mejora el audio, “ahí va” y “ahí te escucho” marcan que el problema se resolvió.", translation: "¿Podés hablar? checks availability, bancame un toque requests a brief wait, and ahí va or ahí te escucho marks that the setup now works.", highlights: highlights(["¿Podés hablar?", "Bancame un toque", "Ahí va", "Ahí te escucho"]), shadowLine: "Bancame un toque. Ahí va, ahora sí te escucho." },
  { id: "p4", text: "No siempre se puede seguir hablando. “Ahora no puedo hablar” pone un límite directo; “ahora estoy ocupado” explica la causa. Para mantener el contacto, “te llamo en un rato” o “te devuelvo la llamada” ofrecen una continuación concreta en vez de cortar sin explicación.", translation: "Ahora no puedo hablar sets a boundary, ahora estoy ocupado explains it, and call-back phrases provide a clear continuation.", highlights: highlights(["Ahora no puedo hablar", "Ahora estoy ocupado", "Te llamo en un rato", "Te devuelvo la llamada"]), shadowLine: "Ahora no puedo hablar; te devuelvo la llamada en un rato." },
  { id: "p5", text: "En Argentina, un “audio” es una nota de voz. “Mandame un audio” pide que la otra persona cambie de canal; “te mando un audio” anuncia la solución. “Cuando puedas, escuchalo” reduce la presión, y “después lo escucho” o “después te contesto” confirma que el mensaje queda pendiente.", translation: "In Argentina, audio means voice note. These phrases switch channels and manage delayed listening or replying without pressure.", highlights: highlights(["Mandame un audio", "Te mando un audio", "Cuando puedas, escuchalo", "Después lo escucho", "Después te contesto"]), shadowLine: "Mandame un audio; cuando pueda, lo escucho y te contesto." },
  { id: "p6", text: "El contexto técnico también se explica. “Estoy en la calle” anticipa ruido y poca privacidad; “tengo poca señal” justifica los cortes. Si la comunicación termina de golpe, “se me cortó” presenta el fallo como accidental. Al volver, “perdón, se me cortó” repara la interrupción de inmediato.", translation: "Estoy en la calle and tengo poca señal explain the context. Se me cortó presents the failure as accidental, while the full apology repairs it on reconnecting.", highlights: highlights(["Estoy en la calle", "Tengo poca señal", "Se me cortó", "Perdón, se me cortó"]), shadowLine: "Perdón, se me cortó; acá tengo poca señal." },
  { id: "p7", text: "Otros problemas exigen más contexto. “Me quedé sin batería” explica por qué desapareció alguien, y “te quise llamar” aclara que hubo un intento. Para comunicar lo esencial antes de perder la conexión, “te cuento rápido” introduce un resumen y “era para decirte que…” presenta el motivo de la llamada.", translation: "Me quedé sin batería explains a disappearance, te quise llamar an attempt, and the remaining phrases introduce a compressed update and the reason for calling.", highlights: highlights(["Me quedé sin batería", "Te quise llamar", "Te cuento rápido", "Era para decirte que…"]), shadowLine: "Te cuento rápido: era para decirte que cambió el plan." },
  { id: "p8", text: "Finalmente, “avisame cuando puedas” y “cuando puedas…” dejan el tiempo de respuesta en manos de la otra persona. “Después hablamos tranqui” cierra con calma y sin urgencia. Estas fórmulas no solo transmiten información: también organizan la atención, cuidan los límites y evitan que un audio pendiente se convierta en presión social.", translation: "Avisame cuando puedas and cuando puedas leave response timing to the other person. Después hablamos tranqui closes calmly and without urgency.", highlights: highlights(["Avisame cuando puedas", "Cuando puedas…", "Después hablamos tranqui"]), shadowLine: "Avisame cuando puedas y después hablamos tranqui." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-phone-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Managing Argentine phone calls and voice notes naturally", "Writing formal emails", "Booking a hotel", "Using past tenses"], correctAnswer: "Managing Argentine phone calls and voice notes naturally", explanation: "The reading covers connection repair, availability, voice notes, and follow-up.", points: 1, skillTag: "gist" },
  { id: "arg-phone-reading-q2", type: "multiple-choice", prompt: "Which phrase softens a complaint about sound quality?", options: ["Se escucha medio mal", "Ni a palos", "Me quedé sin batería", "Te cuento rápido"], correctAnswer: "Se escucha medio mal", explanation: "Medio makes the negative evaluation less absolute.", points: 1, skillTag: "nuance" },
  { id: "arg-phone-reading-q3", type: "true-false", prompt: "True or false: “Se me cortó” presents the dropped call as accidental.", options: ["True", "False"], correctAnswer: "True", explanation: "The accidental se construction emphasizes that the failure happened unexpectedly.", points: 1, skillTag: "grammar" },
  { id: "arg-phone-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Listen to it when you can and let me know.", wordBank: ["Cuando", "puedas,", "escuchalo", "y", "avisame."], correctAnswer: "Cuando puedas, escuchalo y avisame.", explanation: "Both escuchalo and avisame are affirmative voseo imperatives.", points: 2, skillTag: "voseo" },
  { id: "arg-phone-reading-q5", type: "multiple-choice", prompt: "Which closing removes pressure from the conversation?", options: ["Después hablamos tranqui", "Casi no te escucho", "Te quise llamar", "Ahí va"], correctAnswer: "Después hablamos tranqui", explanation: "Tranqui makes the follow-up relaxed and non-urgent.", points: 1, skillTag: "register" },
];

export const argentinianSpanishB2PhoneCallsVoiceNotesReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B2 Reading: Entre Cortes y Audios", subtitle: "A synced Spanish reading about call repair, voseo, voice-note etiquette, availability, and relaxed follow-up.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "reading", "phone calls", "voice notes"], estimatedMinutes: 17,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: phoneVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Argentinian B2 phone calls and voice notes vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const argentinianSpanishB2PhoneCallsVoiceNotesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian Spanish B2: Phone Calls & Voice Notes Quiz", subtitle: "Choose the right Argentine phrase for bad connections, call-backs, voice notes, and availability.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "upper-intermediate", tags: ["Argentinian Spanish", "B2", "quiz", "phone calls", "voice notes"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Practice choosing natural Argentine phone and voice-note language in fresh situations.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-phone-quiz-1", type: "multiple-choice", prompt: "The other person’s sound repeatedly disappears. What do you say?", options: ["Se corta", "Ahí va", "Después te contesto", "Te cuento rápido"], correctAnswer: "Se corta", explanation: "Se corta describes a connection that repeatedly cuts out.", points: 1, skillTag: "connection" },
      { id: "arg-phone-quiz-2", type: "fill-blank", prompt: "Complete: ¿Me ______? No te entendí bien.", nativePrompt: "Can you repeat that? I didn’t understand you properly.", correctAnswer: "repetís", explanation: "¿Me repetís? is the Argentine voseo form.", points: 1, skillTag: "voseo" },
      { id: "arg-phone-quiz-3", type: "multiple-choice", prompt: "You need two seconds to connect your headphones. Which phrase fits?", options: ["Bancame un toque", "Me quedé sin batería", "Te quise llamar", "Después hablamos tranqui"], correctAnswer: "Bancame un toque", explanation: "It means hang on or give me a second.", points: 1, skillTag: "wait" },
      { id: "arg-phone-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll call you back in a bit.", wordBank: ["Te", "devuelvo", "la", "llamada", "en", "un", "rato."], correctAnswer: "Te devuelvo la llamada en un rato.", explanation: "This offers a clear follow-up after ending the current call.", points: 2, skillTag: "callback" },
      { id: "arg-phone-quiz-5", type: "true-false", prompt: "True or false: In this context, “audio” normally means a voice note.", options: ["True", "False"], correctAnswer: "True", explanation: "Audio is the everyday Argentine term for a voice note.", points: 1, skillTag: "usage" },
      { id: "arg-phone-quiz-6", type: "multiple-choice", prompt: "You cannot speak now but can listen later. What is the best reply?", options: ["Ahora no puedo hablar. Mandame un audio", "Se me cortó. Ahí va", "Te cuento rápido. ¿Me escuchás?", "Casi no te escucho. Bancame"], correctAnswer: "Ahora no puedo hablar. Mandame un audio", explanation: "It sets a boundary and offers an alternative channel.", points: 1, skillTag: "availability" },
      { id: "arg-phone-quiz-7", type: "fill-blank", prompt: "Complete: Perdón, se me ______.", nativePrompt: "Sorry, the call dropped.", correctAnswer: "cortó", explanation: "Se me cortó presents the failure as accidental.", points: 1, skillTag: "repair" },
      { id: "arg-phone-quiz-8", type: "multiple-choice", prompt: "Your phone turned off because it had no power. Which phrase fits?", options: ["Me quedé sin batería", "Tengo poca señal", "Se escucha medio mal", "Estoy en la calle"], correctAnswer: "Me quedé sin batería", explanation: "This means your battery died or you ran out of battery.", points: 1, skillTag: "technical-problem" },
      { id: "arg-phone-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I just wanted to tell you that the meeting changed.", wordBank: ["Era", "para", "decirte", "que", "cambió", "la", "reunión."], correctAnswer: "Era para decirte que cambió la reunión.", explanation: "Era para decirte que softly introduces the purpose of the call.", points: 2, skillTag: "purpose" },
      { id: "arg-phone-quiz-10", type: "multiple-choice", prompt: "You want the person to reply whenever convenient. What do you say?", options: ["Avisame cuando puedas", "Casi no te escucho", "Ahí va", "Te quise llamar"], correctAnswer: "Avisame cuando puedas", explanation: "This clearly removes immediate pressure.", points: 1, skillTag: "follow-up" },
      pairQuestion("arg-phone-pairs-1", "Match the connection and clarification phrases.", phoneVocab.slice(0, 10)),
      pairQuestion("arg-phone-pairs-2", "Match call-backs, voice notes, and technical problems.", phoneVocab.slice(10, 20)),
      pairQuestion("arg-phone-pairs-3", "Match follow-up, availability, and relaxed closing phrases.", phoneVocab.slice(20)),
    ],
  },
};
