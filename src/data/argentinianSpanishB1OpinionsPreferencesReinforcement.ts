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

const courseId = "argentinian-spanish-b1-opinions-preferences";
const sectionName = "Argentinian Spanish - B1 Opinions and Preferences";

const opinionsVocab: VocabItem[] = [
  { id: "me-gusta", term: "Me gusta", meaning: "I like it", note: "A basic positive opinion.", example: "Me gusta esta opción.", translation: "I like this option." },
  { id: "me-encanta", term: "Me encanta", meaning: "I love it", note: "Stronger and more enthusiastic than me gusta.", example: "Me encanta este lugar.", translation: "I love this place." },
  { id: "no-me-gusta-tanto", term: "No me gusta tanto", meaning: "I don't like it that much", note: "A softer negative preference than no me gusta.", example: "La primera opción no me gusta tanto.", translation: "I don't like the first option that much." },
  { id: "prefiero", term: "Prefiero…", meaning: "I prefer…", note: "Use it to choose one option over another.", example: "Prefiero el café al té.", translation: "I prefer coffee to tea." },
  { id: "que-opinas", term: "¿Qué opinás?", meaning: "What do you think?", note: "Argentine voseo form of ¿Qué opinas?.", example: "¿Qué opinás de esta idea?", translation: "What do you think about this idea?" },
  { id: "para-mi", term: "Para mí…", meaning: "For me / in my opinion…", matchingMeaning: "in my opinion", note: "Introduces a personal point of view.", example: "Para mí, está bueno.", translation: "In my opinion, it's good." },
  { id: "me-parece", term: "Me parece que…", meaning: "It seems to me that…", matchingMeaning: "it seems to me that", note: "A useful way to present an opinion without sounding too absolute.", example: "Me parece que la idea está buena.", translation: "I think the idea is good." },
  { id: "esta-bueno", term: "Está bueno", meaning: "It's good / it's nice / sounds good", matchingMeaning: "sounds good", note: "Extremely common in Argentina for things, experiences, and ideas.", example: "El plan está bueno.", translation: "The plan sounds good." },
  { id: "tenes-razon", term: "Tenés razón", meaning: "You're right", note: "Argentine voseo form of tienes razón.", example: "Tenés razón con eso.", translation: "You're right about that." },
  { id: "puede-ser", term: "Puede ser", meaning: "Maybe / could be", matchingMeaning: "could be", note: "Can show cautious agreement or uncertainty.", example: "Puede ser, no lo había pensado.", translation: "Could be, I hadn't thought about it." },
  { id: "banco-idea", term: "Banco esa idea", meaning: "I support that idea / I'm on board with it", matchingMeaning: "I'm on board with it", note: "Very Argentine informal use of bancar meaning to support.", example: "Tenés razón. Banco esa idea.", translation: "You're right. I'm on board with that idea." },
  { id: "depende", term: "Depende", meaning: "It depends", note: "Useful when the answer changes according to the situation.", example: "Para mí, depende de la situación.", translation: "For me, it depends on the situation." },
  { id: "no-convence", term: "No me convence", meaning: "It doesn't convince me / I'm not sold on it", matchingMeaning: "I'm not sold on it", note: "A natural way to reject an idea without saying it is bad.", example: "La propuesta no me convence.", translation: "I'm not sold on the proposal." },
  { id: "no-convence-todo", term: "No me convence del todo", meaning: "I'm not completely convinced", note: "Softer and more nuanced than no me convence.", example: "La verdad, no me convence del todo.", translation: "Honestly, I'm not completely convinced." },
  { id: "no-tan-acuerdo", term: "No estoy tan de acuerdo", meaning: "I don't totally agree", note: "A measured disagreement that leaves room for discussion.", example: "Puede ser, pero no estoy tan de acuerdo.", translation: "Maybe, but I don't totally agree." },
  { id: "no-lo-veo-asi", term: "No lo veo así", meaning: "I don't see it that way", note: "Direct but still conversational disagreement.", example: "Entiendo tu punto, pero no lo veo así.", translation: "I understand your point, but I don't see it that way." },
  { id: "la-verdad", term: "La verdad…", meaning: "Honestly / the truth is…", matchingMeaning: "honestly", note: "Introduces a sincere opinion or a gentle disagreement.", example: "La verdad, prefiero la segunda opción.", translation: "Honestly, I prefer the second option." },
  { id: "me-va-mas", term: "Me va más…", meaning: "I'm more into… / I prefer…", matchingMeaning: "I prefer", note: "Natural informal preference phrase.", example: "Me va más la segunda opción.", translation: "I prefer the second option." },
  { id: "no-es-lo-mio", term: "No es lo mío", meaning: "It's not really my thing", note: "Rejects something as a personal preference rather than criticising it.", example: "El karaoke no es lo mío.", translation: "Karaoke isn't really my thing." },
  { id: "capaz-que", term: "Capaz que…", meaning: "Maybe…", note: "Very common Argentine way to express possibility.", example: "Capaz que está bueno.", translation: "Maybe it's good." },
  { id: "en-general", term: "En general…", meaning: "In general…", note: "Useful for stating a broad tendency before adding details.", example: "En general, me gustan esos lugares.", translation: "In general, I like those places." },
  { id: "que-se-yo", term: "Qué sé yo", meaning: "I don't know / what do I know", matchingMeaning: "I don't know", note: "Casual Argentine filler showing uncertainty or softening a claim.", example: "Capaz funciona, qué sé yo.", translation: "Maybe it works, I don't know." },
  { id: "gusta-bastante", term: "Me gusta bastante", meaning: "I quite like it", note: "Positive, but less intense than me encanta.", example: "La segunda propuesta me gusta bastante.", translation: "I quite like the second proposal." },
  { id: "no-convencio", term: "A mí no me convenció tanto", meaning: "I wasn't that convinced by it", note: "Past-tense reaction to an experience, film, place, or idea.", example: "A mí la película no me convenció tanto.", translation: "I wasn't that convinced by the film." },
  { id: "igual", term: "Igual…", meaning: "Still / anyway / even so…", matchingMeaning: "even so", note: "Common Argentine connector that adds a contrast or qualification.", example: "No es lo mío. Igual, estuvo bien.", translation: "It's not my thing. Even so, it was good." },
  { id: "obvio", term: "Obvio", meaning: "Obviously / of course", matchingMeaning: "of course", note: "Informal strong agreement or confirmation.", example: "Obvio, banco esa idea.", translation: "Of course, I'm on board with that idea." },
  { id: "veo-distinto", term: "Lo veo distinto", meaning: "I see it differently", note: "A concise way to signal another perspective.", example: "Yo solamente lo veo distinto.", translation: "I just see it differently." },
  { id: "estuvo-buenisima", term: "Estuvo buenísima", meaning: "It was really good / great", matchingMeaning: "it was great", note: "Enthusiastic past-tense evaluation; the feminine ending can refer to an idea, film, party, or experience.", example: "La película estuvo buenísima.", translation: "The film was great." },
];

const highlightMap = Object.fromEntries(opinionsVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>, acceptedAnswers: string[] = []): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers, explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

const sentenceVocab = opinionsVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB1OpinionsPreferencesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish B1: Opinions and Preferences Flashcards", subtitle: "Natural voseo phrases for likes, preferences, agreement, uncertainty, and respectful disagreement.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "flashcards", "opinions", "preferences"], estimatedMinutes: 15,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: opinionsVocab.map(cardFromVocab) },
};

export const argentinianSpanishB1OpinionsPreferencesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Argentinian Opinions and Preferences", subtitle: "Build nuanced reactions, ask for opinions, agree naturally, and disagree without sounding harsh.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["argentinian-spanish", "b1", "sentence-builder", "opinions", "preferences"], estimatedMinutes: 15,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Compare two plans, ask your friend’s opinion, agree with one point, disagree with another, and finish with a balanced personal preference.",
    stages: [
      stage("stage-1", "Express different levels of liking", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "I like this place, but I love the other one.", "Me gusta este lugar, pero me encanta el otro.", "Me encanta is stronger than me gusta, while no me gusta tanto softens a negative opinion.", breakdown([["I like", "Me gusta"], ["this place", "este lugar"], ["but", "pero"], ["I love", "me encanta"]])),
      stage("stage-2", "State a preference", sentenceVocab.slice(3, 5), sentenceVocab.slice(0, 5), "I like both, but I prefer the second option. What do you think?", "Me gustan las dos, pero prefiero la segunda opción. ¿Qué opinás?", "¿Qué opinás? uses Argentine voseo and invites the other person into the discussion.", breakdown([["I like both", "Me gustan las dos"], ["I prefer", "prefiero"], ["the second option", "la segunda opción"], ["What do you think?", "¿Qué opinás?"]])),
      stage("stage-3", "Frame your opinion", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "In my opinion, it’s good. I think the idea is good.", "Para mí, está bueno. Me parece que la idea está buena.", "Para mí marks a personal view; me parece que makes the opinion less absolute.", breakdown([["In my opinion", "Para mí"], ["it's good", "está bueno"], ["I think", "Me parece que"], ["the idea is good", "la idea está buena"]])),
      stage("stage-4", "Agree naturally", sentenceVocab.slice(8, 11), sentenceVocab.slice(0, 11), "You’re right. I’m on board with that idea. Of course.", "Tenés razón. Banco esa idea. Obvio.", "Banco esa idea is distinctly Argentine and means you support the proposal.", breakdown([["You're right", "Tenés razón"], ["I'm on board with that idea", "Banco esa idea"], ["Of course", "Obvio"]])),
      stage("stage-5", "Show uncertainty", sentenceVocab.slice(9, 12), sentenceVocab.slice(19, 22), "Maybe. It depends on the situation. I don’t know.", "Puede ser. Depende de la situación. Qué sé yo.", "Puede ser and qué sé yo keep the answer tentative rather than definite.", breakdown([["Maybe", "Puede ser"], ["It depends", "Depende"], ["on the situation", "de la situación"], ["I don't know", "Qué sé yo"]])),
      stage("stage-6", "Disagree softly", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "Honestly, I’m not completely convinced, and I don’t totally agree.", "La verdad, no me convence del todo y no estoy tan de acuerdo.", "This disagrees clearly but avoids attacking the other person’s idea.", breakdown([["Honestly", "La verdad"], ["I'm not completely convinced", "no me convence del todo"], ["I don't totally agree", "no estoy tan de acuerdo"]])),
      stage("stage-7", "Make it personal, not critical", sentenceVocab.slice(16, 20), sentenceVocab.slice(0, 20), "Honestly, it’s not my thing. I’m more into the second option.", "La verdad, no es lo mío. Me va más la segunda opción.", "No es lo mío frames the issue as personal taste. Me va más compares preferences naturally.", breakdown([["Honestly", "La verdad"], ["it's not my thing", "no es lo mío"], ["I'm more into", "me va más"], ["the second option", "la segunda opción"]])),
      stage("stage-8", "Give a balanced final reaction", sentenceVocab.slice(20), sentenceVocab, "In general, I quite like it. I see it differently, but it was great.", "En general, me gusta bastante. Lo veo distinto, pero estuvo buenísima.", "This combines an overall evaluation, a different perspective, and a positive final reaction.", breakdown([["In general", "En general"], ["I quite like it", "me gusta bastante"], ["I see it differently", "Lo veo distinto"], ["it was great", "estuvo buenísima"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-opinions-story-q1", type: "multiple-choice", prompt: "What are Lara and Mati choosing between?", options: ["Karaoke and a rooftop film", "Two train routes", "Coffee and tea", "Two job offers"], correctAnswer: "Karaoke and a rooftop film", explanation: "Lara presents those two birthday options before asking Mati’s opinion.", points: 1, skillTag: "gist" },
  { id: "arg-opinions-story-q2", type: "multiple-choice", prompt: "Which option does Lara initially prefer?", options: ["The rooftop film", "Karaoke", "Neither option", "A restaurant"], correctAnswer: "The rooftop film", explanation: "She says me va más la terraza.", points: 1, skillTag: "preference" },
  { id: "arg-opinions-story-q3", type: "multiple-choice", prompt: "Why is Mati unsure about the rooftop film?", options: ["The weather may be bad", "He dislikes films", "It is too far away", "There are no tickets"], correctAnswer: "The weather may be bad", explanation: "He says it depends on the weather and the forecast may include rain.", points: 1, skillTag: "reason" },
  { id: "arg-opinions-story-q4", type: "true-false", prompt: "True or false: Lara supports having an indoor backup plan.", options: ["True", "False"], correctAnswer: "True", explanation: "She says Tenés razón. Banco esa idea.", points: 1, skillTag: "agreement" },
  { id: "arg-opinions-story-q5", type: "multiple-choice", prompt: "Which karaoke venue does Mati prefer?", options: ["The second, simpler venue", "The first expensive venue", "Neither venue", "The rooftop"], correctAnswer: "The second, simpler venue", explanation: "He says me gusta bastante la segunda and the first is not his thing.", points: 1, skillTag: "comparison" },
  { id: "arg-opinions-story-q6", type: "multiple-choice", prompt: "Why does Lara still consider the first venue?", options: ["It has a larger private room", "It is free", "Camila owns it", "It is outdoors"], correctAnswer: "It has a larger private room", explanation: "Lara says the larger room may work better for the group.", points: 1, skillTag: "different-view" },
  { id: "arg-opinions-story-q7", type: "true-false", prompt: "True or false: Mati agrees that the larger room automatically makes the first venue better.", options: ["True", "False"], correctAnswer: "False", explanation: "He says no lo veo así because the price also matters.", points: 1, skillTag: "disagreement" },
  { id: "arg-opinions-story-q8", type: "multiple-choice", prompt: "What changes their decision?", options: ["Rain is confirmed and the second karaoke venue offers a discount", "The rooftop becomes free", "Camila cancels her birthday", "They decide not to celebrate"], correctAnswer: "Rain is confirmed and the second karaoke venue offers a discount", explanation: "By message 24, the weather and discount make the second venue stronger.", points: 1, skillTag: "decision" },
  { id: "arg-opinions-story-q9", type: "multiple-choice", prompt: "Which venue do they finally book?", options: ["The second karaoke venue", "The rooftop", "The first karaoke venue", "A café"], correctAnswer: "The second karaoke venue", explanation: "Lara books the second option after the discount is confirmed.", points: 1, skillTag: "outcome" },
  { id: "arg-opinions-story-q10", type: "multiple-choice", prompt: "How does Lara feel after the party?", options: ["She loved it and says it was great", "She regrets the plan", "She remains completely unconvinced", "She did not attend"], correctAnswer: "She loved it and says it was great", explanation: "She says Estuvo buenísima and Me encantó.", points: 1, skillTag: "final-reaction" },
];

export const argentinianSpanishB1OpinionsPreferencesWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian B1 Story: Karaoke or Rooftop?", subtitle: "Lara and Mati compare two birthday plans, disagree without arguing, and change their minds when new information arrives.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "WhatsApp", "opinions", "preferences"], estimatedMinutes: 17,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "lara", name: "Lara", initials: "L", side: "left", color: "violet" }, { id: "mati", name: "Mati", initials: "M", side: "right", color: "blue" }],
    messages: [
      message("m1", "lara", "Tenemos dos ideas para el cumpleaños de Cami.", "We have two ideas for Cami’s birthday.", []),
      message("m2", "lara", "Karaoke o una película en una terraza.", "Karaoke or a film on a rooftop.", []),
      message("m3", "lara", "¿Qué opinás?", "What do you think?", ["¿Qué opinás?"], "voice-note"),
      message("m4", "mati", "Me encanta la idea del karaoke.", "I love the karaoke idea.", ["Me encanta"]),
      message("m5", "mati", "La terraza está buena, pero no me gusta tanto.", "The rooftop is nice, but I don’t like it that much.", ["Está bueno", "No me gusta tanto"]),
      message("m6", "lara", "A mí me gustan las dos, pero me va más la terraza.", "I like both, but I prefer the rooftop.", ["Me gusta", "Me va más…"], "voice-note"),
      message("m7", "mati", "Puede ser. Depende del clima.", "Could be. It depends on the weather.", ["Puede ser", "Depende"]),
      message("m8", "lara", "Obvio. Si llueve, no sirve.", "Of course. If it rains, it won’t work.", ["Obvio"]),
      message("m9", "mati", "Capaz que llueve el sábado, qué sé yo.", "Maybe it’ll rain on Saturday, I don’t know.", ["Capaz que…", "Qué sé yo"]),
      message("m10", "lara", "Entonces necesitamos una opción bajo techo.", "Then we need an indoor option.", []),
      message("m11", "mati", "Para mí, podemos reservar karaoke como plan B.", "In my opinion, we can book karaoke as a backup plan.", ["Para mí…"]),
      message("m12", "lara", "Tenés razón. Banco esa idea.", "You’re right. I’m on board with that idea.", ["Tenés razón", "Banco esa idea"], "voice-note"),
      message("m13", "lara", "Encontré dos lugares de karaoke.", "I found two karaoke venues.", []),
      message("m14", "lara", "El primero es moderno, pero bastante caro.", "The first is modern, but quite expensive.", []),
      message("m15", "lara", "El segundo es más simple y queda en el centro.", "The second is simpler and is downtown.", []),
      message("m16", "mati", "Me gusta bastante la segunda opción.", "I quite like the second option.", ["Me gusta bastante"]),
      message("m17", "mati", "El primero no me convence. No es lo mío.", "The first doesn’t convince me. It’s not my thing.", ["No me convence", "No es lo mío"]),
      message("m18", "mati", "La verdad, prefiero el segundo.", "Honestly, I prefer the second one.", ["La verdad…", "Prefiero…"], "voice-note"),
      message("m19", "lara", "Yo lo veo distinto. El primero tiene una sala más grande.", "I see it differently. The first has a larger room.", ["Lo veo distinto"]),
      message("m20", "mati", "Puede ser, pero no estoy tan de acuerdo.", "Maybe, but I don’t totally agree.", ["Puede ser", "No estoy tan de acuerdo"]),
      message("m21", "mati", "No lo veo así: el precio también importa.", "I don’t see it that way: the price matters too.", ["No lo veo así"]),
      message("m22", "lara", "La verdad, no me convence del todo pagar tanto.", "Honestly, I’m not completely convinced about paying that much.", ["La verdad…", "No me convence del todo"]),
      message("m23", "mati", "Igual, capaz que el segundo nos hace descuento.", "Even so, maybe the second venue will give us a discount.", ["Igual…", "Capaz que…"]),
      message("m24", "lara", "Les escribí: hacen descuento y además confirmaron lluvia.", "I messaged them: they offer a discount, and rain has also been confirmed.", [], "voice-note"),
      message("m25", "mati", "Entonces banco la segunda opción.", "Then I’m on board with the second option.", ["Banco esa idea"]),
      message("m26", "lara", "Obvio. Ya reservé la sala.", "Of course. I’ve already booked the room.", ["Obvio"]),
      message("m27", "mati", "Perfecto. Cami no sospecha nada.", "Perfect. Cami doesn’t suspect anything.", []),
      message("m28", "lara", "Bueno, pasó la fiesta. ¿Qué opinás ahora?", "Well, the party happened. What do you think now?", ["¿Qué opinás?"]),
      message("m29", "mati", "Estuvo buenísima. Tenías razón con la sala.", "It was great. You were right about the room.", ["Estuvo buenísima", "Tenés razón"]),
      message("m30", "lara", "Sí, me encantó. Al final, elegimos bien.", "Yes, I loved it. In the end, we chose well.", ["Me encanta"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-opinions-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions, learnedVocab: opinionsVocab.map((item) => item.term),
    finalReview: { keyPhrases: ["¿Qué opinás?", "Para mí…", "Banco esa idea", "No me convence del todo", "No lo veo así", "Lo veo distinto"], grammarPatterns: ["Voseo: opinás / tenés", "Opinion frame: Para mí / Me parece que", "Soft disagreement: Puede ser, pero…"], speakingPrompts: ["Compare two plans.", "Agree with one point and disagree with another.", "Explain that something is not your thing.", "Give a balanced final opinion."] },
    completionTask: { title: "Compare two options", instructions: "Record 60 seconds in Argentinian Spanish comparing two choices. Ask for an opinion, state your preference, disagree softly, and finish with a balanced conclusion." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Para expresar una preferencia básica, podés decir «Me gusta», «Me encanta» o «No me gusta tanto». La intensidad cambia, pero las tres frases hablan de tu reacción personal.", translation: "To express a basic preference, you can say ‘I like it’, ‘I love it’, or ‘I don’t like it that much’. The intensity changes, but all three describe your personal reaction.", highlights: highlights(["Me gusta", "Me encanta", "No me gusta tanto"]), shadowLine: "Me gusta, pero no me encanta." },
  { id: "p2", text: "Cuando comparás opciones, «Prefiero la segunda» es claro. En una conversación argentina también podés decir «Me va más la segunda opción», que suena más informal.", translation: "When comparing options, ‘I prefer the second one’ is clear. In an Argentine conversation, you can also say ‘I’m more into the second option’, which sounds more informal.", highlights: highlights(["Prefiero…", "Me va más…"]), shadowLine: "Me va más la segunda opción." },
  { id: "p3", text: "Para incluir a la otra persona, preguntá «¿Qué opinás?». Las formas «Para mí…» y «Me parece que…» presentan tu opinión sin convertirla en una verdad absoluta.", translation: "To include the other person, ask ‘What do you think?’. ‘In my opinion…’ and ‘It seems to me that…’ present your view without turning it into an absolute truth.", highlights: highlights(["¿Qué opinás?", "Para mí…", "Me parece que…"]), shadowLine: "¿Qué opinás? Para mí, está bueno." },
  { id: "p4", text: "Si estás de acuerdo, «Tenés razón» reconoce el punto de la otra persona. «Banco esa idea» agrega apoyo activo, y «Obvio» expresa una confirmación fuerte e informal.", translation: "If you agree, ‘You’re right’ acknowledges the other person’s point. ‘I’m on board with that idea’ adds active support, and ‘Of course’ expresses strong informal confirmation.", highlights: highlights(["Tenés razón", "Banco esa idea", "Obvio"]), shadowLine: "Tenés razón. Banco esa idea." },
  { id: "p5", text: "No todas las respuestas son definitivas. «Puede ser», «Depende» y «Capaz que…» dejan espacio para otras posibilidades. «Qué sé yo» agrega incertidumbre de una manera muy conversacional.", translation: "Not every answer is definite. ‘Could be’, ‘It depends’, and ‘Maybe…’ leave room for other possibilities. ‘I don’t know’ adds uncertainty in a very conversational way.", highlights: highlights(["Puede ser", "Depende", "Capaz que…", "Qué sé yo"]), shadowLine: "Puede ser. Depende. Qué sé yo." },
  { id: "p6", text: "Para disentir con cuidado, «No me convence del todo» es más suave que un rechazo total. También podés decir «No estoy tan de acuerdo» o «No lo veo así».", translation: "To disagree carefully, ‘I’m not completely convinced’ is softer than a total rejection. You can also say ‘I don’t totally agree’ or ‘I don’t see it that way’.", highlights: highlights(["No me convence del todo", "No estoy tan de acuerdo", "No lo veo así"]), shadowLine: "Puede ser, pero no estoy tan de acuerdo." },
  { id: "p7", text: "«No es lo mío» evita criticar el gusto de otra persona: simplemente explica que algo no coincide con tu preferencia. «Igual…» permite agregar un aspecto positivo después.", translation: "‘It’s not my thing’ avoids criticising another person’s taste: it simply explains that something does not match your preference. ‘Even so…’ lets you add a positive aspect afterwards.", highlights: highlights(["No es lo mío", "Igual…"]), shadowLine: "No es lo mío. Igual, está bueno." },
  { id: "p8", text: "Después de una experiencia, podés decir «A mí no me convenció tanto» o «Estuvo buenísima». Si tu interpretación es diferente, «Lo veo distinto» mantiene el desacuerdo centrado en la perspectiva.", translation: "After an experience, you can say ‘I wasn’t that convinced by it’ or ‘It was great’. If your interpretation is different, ‘I see it differently’ keeps the disagreement focused on perspective.", highlights: highlights(["A mí no me convenció tanto", "Estuvo buenísima", "Lo veo distinto"]), shadowLine: "Lo veo distinto, pero estuvo buenísima." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-opinions-reading-q1", type: "multiple-choice", prompt: "Which phrase expresses the strongest positive reaction?", options: ["Me encanta", "Me gusta", "Puede ser", "Depende"], correctAnswer: "Me encanta", explanation: "Me encanta is stronger than me gusta.", points: 1, skillTag: "intensity" },
  { id: "arg-opinions-reading-q2", type: "multiple-choice", prompt: "Which Argentine phrase informally expresses a preference?", options: ["Me va más…", "¿Qué opinás?", "Tenés razón", "Qué sé yo"], correctAnswer: "Me va más…", explanation: "Me va más means you are more into one option.", points: 1, skillTag: "preference" },
  { id: "arg-opinions-reading-q3", type: "true-false", prompt: "True or false: ‘Banco esa idea’ means you support the idea.", options: ["True", "False"], correctAnswer: "True", explanation: "Bancar is used informally in Argentina to mean supporting something or someone.", points: 1, skillTag: "agreement" },
  { id: "arg-opinions-reading-q4", type: "multiple-choice", prompt: "Which phrase offers a soft disagreement?", options: ["No me convence del todo", "Me encanta", "Obvio", "Estuvo buenísima"], correctAnswer: "No me convence del todo", explanation: "It communicates doubt without rejecting the idea aggressively.", points: 1, skillTag: "disagreement" },
  { id: "arg-opinions-reading-q5", type: "multiple-choice", prompt: "Why is ‘No es lo mío’ socially useful?", options: ["It frames the dislike as personal taste", "It proves the other person is wrong", "It expresses total agreement", "It asks for a price"], correctAnswer: "It frames the dislike as personal taste", explanation: "The phrase avoids criticising the thing as objectively bad.", points: 1, skillTag: "pragmatics" },
];

export const argentinianSpanishB1OpinionsPreferencesReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian B1 Reading: Say What You Think Naturally", subtitle: "Follow a fully Spanish guide to preferences, agreement, uncertainty, and respectful disagreement.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "reading", "opinions", "preferences"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: opinionsVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "Match each Argentinian expression with its natural English meaning.", points: items.length, skillTag: "matching" };
}

export const argentinianSpanishB1OpinionsPreferencesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian B1 Final Quiz: Opinions and Preferences", subtitle: "Choose the most natural phrase for new situations involving preference, uncertainty, agreement, and disagreement.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Argentinian Spanish", "B1", "quiz", "opinions", "preferences"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "quiz",
  data: {
    description: "This quiz tests the expressions in fresh contexts rather than asking you to remember the birthday story.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-opinions-quiz-1", type: "multiple-choice", prompt: "You want to ask an Argentine friend for their view. What do you say?", options: ["¿Qué opinás?", "¿A qué hora?", "¿Te pinta?", "¿Cuánto es?"], correctAnswer: "¿Qué opinás?", explanation: "Opinás is the voseo form used with vos.", points: 1, skillTag: "asking-opinion" },
      { id: "arg-opinions-quiz-2", type: "multiple-choice", prompt: "You strongly love a new café. Which reaction fits?", options: ["Me encanta", "No me convence", "Depende", "Qué sé yo"], correctAnswer: "Me encanta", explanation: "Me encanta expresses strong enthusiasm.", points: 1, skillTag: "positive-opinion" },
      { id: "arg-opinions-quiz-3", type: "order-words", prompt: "Build the preference.", nativePrompt: "Honestly, I prefer the second option.", wordBank: ["La", "verdad,", "prefiero", "la", "segunda", "opción."], correctAnswer: "La verdad, prefiero la segunda opción.", explanation: "La verdad introduces the sincere preference.", points: 1, skillTag: "sentence-building" },
      { id: "arg-opinions-quiz-4", type: "true-false", prompt: "True or false: ‘Está bueno’ can describe a good idea, not only an object.", options: ["True", "False"], correctAnswer: "True", explanation: "In Argentina it commonly evaluates ideas, plans, places, and experiences.", points: 1, skillTag: "usage" },
      { id: "arg-opinions-quiz-5", type: "multiple-choice", prompt: "You actively support your friend’s proposal. What sounds especially Argentine?", options: ["Banco esa idea", "No es lo mío", "No lo veo así", "Por ahora no"], correctAnswer: "Banco esa idea", explanation: "Bancar informally means to support or back something.", points: 1, skillTag: "agreement" },
      { id: "arg-opinions-quiz-6", type: "fill-blank", prompt: "Complete: No me convence del ______.", nativePrompt: "I'm not completely convinced.", correctAnswer: "todo", explanation: "Del todo means completely.", points: 1, skillTag: "soft-disagreement" },
      { id: "arg-opinions-quiz-7", type: "multiple-choice", prompt: "Your answer changes according to the circumstances. What do you say?", options: ["Depende", "Obvio", "Me encanta", "Tenés razón"], correctAnswer: "Depende", explanation: "Depende means it depends.", points: 1, skillTag: "uncertainty" },
      { id: "arg-opinions-quiz-8", type: "multiple-choice", prompt: "You dislike karaoke personally but do not want to criticise it. What fits?", options: ["No es lo mío", "Es horrible", "Nadie debería ir", "Tenés razón"], correctAnswer: "No es lo mío", explanation: "It frames the issue as your personal taste.", points: 1, skillTag: "preference" },
      { id: "arg-opinions-quiz-9", type: "true-false", prompt: "True or false: ‘Capaz que…’ commonly means ‘maybe’ in Argentina.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a very common Argentine possibility marker.", points: 1, skillTag: "possibility" },
      { id: "arg-opinions-quiz-10", type: "multiple-choice", prompt: "You understand the other opinion but have another perspective. What can you say?", options: ["Lo veo distinto", "Me encanta", "Obvio", "Banco esa idea"], correctAnswer: "Lo veo distinto", explanation: "It keeps the disagreement focused on perspective.", points: 1, skillTag: "disagreement" },
      pairQuestion("arg-opinions-quiz-11", "Match the positive opinion phrases.", [opinionsVocab[0], opinionsVocab[1], opinionsVocab[7], opinionsVocab[22]]),
      pairQuestion("arg-opinions-quiz-12", "Match the uncertainty and agreement phrases.", [opinionsVocab[8], opinionsVocab[9], opinionsVocab[10], opinionsVocab[11]]),
      pairQuestion("arg-opinions-quiz-13", "Match the disagreement and preference phrases.", [opinionsVocab[13], opinionsVocab[15], opinionsVocab[17], opinionsVocab[18]]),
    ],
  },
};
