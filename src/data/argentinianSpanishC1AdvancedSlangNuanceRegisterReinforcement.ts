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

const courseId = "argentinian-spanish-c1-advanced-slang-nuance-register";
const sectionName = "Argentinian Spanish - C1 Advanced Slang, Nuance and Register";

const registerVocab: VocabItem[] = [
  { id: "ponele", term: "Ponele", meaning: "let’s say / suppose / roughly", matchingMeaning: "let’s say / suppose", note: "Very Argentine. It can introduce a hypothetical example or signal an approximate amount.", example: "Ponele que llegamos a las nueve.", translation: "Let’s say we arrive at nine." },
  { id: "medio-que", term: "Medio que…", meaning: "kind of / sort of…", matchingMeaning: "kind of / sort of", note: "A conversational hedge that makes a judgment sound less absolute.", example: "Medio que la explicación no alcanza.", translation: "The explanation kind of isn’t enough." },
  { id: "no-me-termina-de-cerrar", term: "No me termina de cerrar", meaning: "I’m still not fully convinced / it doesn’t quite add up", matchingMeaning: "it doesn’t quite add up", note: "Excellent for nuanced skepticism without directly accusing anyone of lying.", example: "Hay algo que no me termina de cerrar.", translation: "There’s something that doesn’t quite add up for me." },
  { id: "me-hace-ruido", term: "Me hace ruido", meaning: "something about it feels off", note: "Signals suspicion or discomfort while leaving room for another explanation.", example: "Ese cambio de fecha me hace ruido.", translation: "That change of date feels off to me." },
  { id: "no-da", term: "No da", meaning: "that’s not okay / that’s not a good look", note: "Highly context-dependent social judgment: inappropriate, unfair, or simply not workable.", example: "Cobrarle de nuevo sin avisar no da.", translation: "Charging them again without warning isn’t okay." },
  { id: "la-veo-dificil", term: "La veo difícil", meaning: "I think it’s unlikely / difficult", note: "A natural way to express pessimism without making an absolute prediction.", example: "¿Resolverlo hoy? La veo difícil.", translation: "Sort it out today? I think that’s unlikely." },
  { id: "de-ultima", term: "De última", meaning: "as a last resort / worst case", note: "Introduces the fallback option if the preferred plan fails.", example: "De última, pedimos el reintegro mañana.", translation: "Worst case, we ask for the refund tomorrow." },
  { id: "ni-a-palos", term: "Ni a palos", meaning: "absolutely not / no chance", note: "Strongly informal and emphatic. Natural with friends, unsuitable in formal settings.", example: "¿Transferir sin recibo? Ni a palos.", translation: "Transfer money without a receipt? Absolutely not." },
  { id: "te-la-compro", term: "Te la compro", meaning: "I’ll give you that / I buy that argument", note: "Figurative acceptance of a point, not a literal purchase.", example: "Esa parte te la compro.", translation: "I’ll give you that part of the argument." },
  { id: "hasta-ahi-nomas", term: "Hasta ahí nomás", meaning: "only up to a point", note: "Limits agreement: one part is acceptable, but the speaker will not go further.", example: "Te la compro, pero hasta ahí nomás.", translation: "I’ll give you that, but only up to a point." },
  { id: "por-ahi", term: "Por ahí…", meaning: "maybe / perhaps…", matchingMeaning: "maybe / perhaps", note: "In Argentine conversation, por ahí frequently marks possibility rather than physical location.", example: "Por ahí hubo un problema con el permiso.", translation: "Maybe there was a problem with the permit." },
  { id: "capaz-que", term: "Capaz que…", meaning: "maybe / perhaps…", matchingMeaning: "maybe / perhaps", note: "A very common Argentine possibility marker followed by the indicative in everyday speech.", example: "Capaz que hay algo más.", translation: "Maybe there’s something else." },
  { id: "me-da-cosa", term: "Me da cosa", meaning: "it makes me feel awkward / uneasy", note: "Can express embarrassment, discomfort, hesitation, or mild concern depending on context.", example: "Me da cosa preguntárselo en la cara.", translation: "I feel awkward asking them to their face." },
  { id: "me-la-baja", term: "Me la baja", meaning: "it kills my mood / turns me off", note: "Very colloquial and emotional; something lowers your enthusiasm immediately.", example: "Que cambien todo a último momento me la baja.", translation: "Changing everything at the last minute kills my mood." },
  { id: "me-saca", term: "Me saca", meaning: "it drives me crazy / really annoys me", note: "Stronger irritation than me molesta and strongly dependent on tone.", example: "La gente que presiona así me saca.", translation: "People who pressure others like that drive me crazy." },
  { id: "se-fue-al-pasto", term: "Se fue al pasto", meaning: "he/she went too far", note: "Marks a clear boundary crossing in a comment, reaction, demand, or joke.", example: "Con ese audio se fue al pasto.", translation: "They went too far with that voice note." },
  { id: "tirado-de-los-pelos", term: "Está tirado de los pelos", meaning: "it’s far-fetched / a stretch", note: "Used for explanations or arguments that feel forced and poorly supported.", example: "Ese argumento está tirado de los pelos.", translation: "That argument is pretty far-fetched." },
  { id: "a-esta-altura", term: "A esta altura…", meaning: "at this point…", matchingMeaning: "at this point", note: "Frames a conclusion after enough time, evidence, or failed attempts have accumulated.", example: "A esta altura, necesitamos una respuesta clara.", translation: "At this point, we need a clear answer." },
  { id: "que-se-yo", term: "Qué sé yo", meaning: "I don’t know / what do I know", note: "A casual Argentine hedge expressing uncertainty, resignation, or reduced commitment to a claim.", example: "Capaz lo arreglan, qué sé yo.", translation: "Maybe they’ll fix it, I don’t know." },
  { id: "que-queres-que-te-diga", term: "Qué querés que te diga", meaning: "what can I tell you / honestly, what can I say", note: "Often introduces a frank, resigned, or mildly critical opinion rather than a literal question.", example: "Qué querés que te diga, a mí no me convence.", translation: "What can I tell you, I’m not convinced." },
  { id: "para-mi-va-por-ahi", term: "Para mí va por ahí", meaning: "I think that’s basically the right idea", note: "Signals that an explanation or line of reasoning is probably on the right track.", example: "Para mí, el problema va por ahí.", translation: "I think that’s basically where the problem lies." },
  { id: "igual", term: "Igual…", meaning: "still / anyway / even so…", matchingMeaning: "still / even so", note: "Common Argentine connector that qualifies, contrasts, or returns to the main point.", example: "Igual, quiero escuchar su versión.", translation: "Still, I want to hear their side." },
  { id: "encima", term: "Encima…", meaning: "on top of that / to make matters worse…", matchingMeaning: "to make matters worse", note: "Adds another fact, often one that worsens the speaker’s evaluation.", example: "Encima, pidieron más plata.", translation: "On top of that, they asked for more money." },
  { id: "sin-avisar", term: "sin avisar", meaning: "without letting anyone know", note: "A useful chunk for criticizing an unexpected action or last-minute change.", example: "Cambió el lugar sin avisar.", translation: "They changed the venue without letting anyone know." },
  { id: "a-ultimo-momento", term: "a último momento", meaning: "at the last minute", note: "Describes something done very late, often creating pressure or inconvenience.", example: "Mandó las condiciones a último momento.", translation: "They sent the conditions at the last minute." },
  { id: "en-la-cara", term: "en la cara", meaning: "to someone’s face", note: "Makes a confrontation or direct comment explicit and socially stronger.", example: "No me da cosa decírselo en la cara.", translation: "I don’t feel awkward saying it to their face." },
  { id: "por-otro-lado", term: "por otro lado", meaning: "somewhere else / from another angle", matchingMeaning: "from another angle", note: "Can point to another physical place or introduce a different perspective or cause.", example: "Capaz que el problema viene por otro lado.", translation: "Maybe the problem lies somewhere else." },
];

const highlightMap = Object.fromEntries(registerVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.matchingMeaning ?? item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "hard", notes: item.note, starred: true };
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

const sentenceVocab = registerVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishC1AdvancedSlangNuanceRegisterFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Argentinian Spanish C1: Advanced Slang, Nuance & Register Flashcards", subtitle: "Advanced Argentine hedging, skepticism, emotional reactions, social judgment, and register control.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "advanced", tags: ["Argentinian Spanish", "C1", "flashcards", "slang", "register"], estimatedMinutes: 17,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: registerVocab.map(cardFromVocab) },
};

export const argentinianSpanishC1AdvancedSlangNuanceRegisterSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "C1 Sentence Builder: Argentine Nuance and Register", subtitle: "Build skeptical reactions, partial agreement, strong refusal, emotional judgments, and carefully hedged conclusions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "advanced", tags: ["argentinian-spanish", "c1", "sentence-builder", "slang", "nuance"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "React to a suspicious last-minute proposal: hedge your first impression, identify what feels wrong, concede one point, reject another, and suggest a fallback.",
    stages: [
      stage("stage-1", "Open a hypothetical", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2), "Let’s say it’s true. Even so, it’s kind of strange.", "Ponele que es verdad. Igual, medio que es raro.", "Ponele opens the hypothetical; medio que reduces the force of the judgment.", breakdown([["Let's say", "Ponele que"], ["it's true", "es verdad"], ["Even so", "Igual"], ["it's kind of strange", "medio que es raro"]])),
      stage("stage-2", "Signal careful suspicion", sentenceVocab.slice(2, 4), sentenceVocab.slice(0, 4), "There’s something that doesn’t quite add up. That detail feels off to me.", "Hay algo que no me termina de cerrar. Ese detalle me hace ruido.", "Both phrases express doubt without directly accusing anyone.", breakdown([["There's something", "Hay algo"], ["that doesn't quite add up", "que no me termina de cerrar"], ["That detail", "Ese detalle"], ["feels off to me", "me hace ruido"]])),
      stage("stage-3", "Judge feasibility and conduct", sentenceVocab.slice(4, 6), sentenceVocab.slice(0, 6), "Changing everything without warning isn’t okay. Finishing today? I think that’s unlikely.", "Cambiar todo sin avisar no da. ¿Terminar hoy? La veo difícil.", "No da judges the behavior; la veo difícil evaluates likelihood.", breakdown([["Changing everything", "Cambiar todo"], ["without warning", "sin avisar"], ["isn't okay", "no da"], ["I think that's unlikely", "La veo difícil"]])),
      stage("stage-4", "Offer a fallback and refuse strongly", sentenceVocab.slice(6, 8), sentenceVocab.slice(0, 8), "Worst case, we finish tomorrow. Go out in this storm? Absolutely not.", "De última, terminamos mañana. ¿Salir con esta tormenta? Ni a palos.", "De última offers a fallback; ni a palos is an emphatic informal refusal.", breakdown([["Worst case", "De última"], ["we finish tomorrow", "terminamos mañana"], ["Go out in this storm?", "¿Salir con esta tormenta?"], ["Absolutely not", "Ni a palos"]])),
      stage("stage-5", "Agree only partly", sentenceVocab.slice(8, 10), sentenceVocab.slice(0, 10), "I’ll give you that, but only up to a point. The rest still feels off.", "Te la compro, pero hasta ahí nomás. El resto me sigue haciendo ruido.", "Te la compro accepts an argument; hasta ahí nomás places a clear limit on that agreement.", breakdown([["I'll give you that", "Te la compro"], ["but only up to a point", "pero hasta ahí nomás"], ["The rest", "El resto"], ["still feels off", "me sigue haciendo ruido"]])),
      stage("stage-6", "Suggest possibilities", sentenceVocab.slice(10, 13), sentenceVocab.slice(0, 13), "Maybe they arrived late because of traffic. Maybe there’s something else, but I feel awkward asking.", "Por ahí llegaron tarde por el tráfico. Capaz que hay algo más, pero me da cosa preguntar.", "Por ahí and capaz que introduce possibilities; me da cosa explains social hesitation.", breakdown([["Maybe", "Por ahí"], ["they arrived late", "llegaron tarde"], ["Maybe there's something else", "Capaz que hay algo más"], ["I feel awkward asking", "me da cosa preguntar"]])),
      stage("stage-7", "Express emotional impact", sentenceVocab.slice(13, 17), sentenceVocab.slice(0, 17), "Changing everything at the last minute kills my mood. That voice note drives me crazy; they went too far, and the excuse is far-fetched.", "Cambiar todo a último momento me la baja. Ese audio me saca; se fue al pasto y la excusa está tirada de los pelos.", "These are increasingly strong reactions, from lost enthusiasm to boundary crossing and disbelief.", breakdown([["at the last minute", "a último momento"], ["kills my mood", "me la baja"], ["drives me crazy", "me saca"], ["went too far", "se fue al pasto"], ["is far-fetched", "está tirada de los pelos"]])),
      stage("stage-8", "Reach a nuanced conclusion", sentenceVocab.slice(17), sentenceVocab, "At this point, what can I tell you? I think the problem lies there, or maybe it comes from another angle.", "A esta altura, qué querés que te diga. Para mí, el problema va por ahí, o capaz que viene por otro lado.", "This closes with resignation, a probable interpretation, and room for an alternative explanation.", breakdown([["At this point", "A esta altura"], ["what can I tell you", "qué querés que te diga"], ["I think the problem lies there", "Para mí, el problema va por ahí"], ["maybe it comes from another angle", "capaz que viene por otro lado"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-register-story-q1", type: "multiple-choice", prompt: "What initially worries Lucía about the event?", options: ["The venue changed at the last minute", "The concert was cancelled", "Fran lost the tickets", "The event is outdoors"], correctAnswer: "The venue changed at the last minute", explanation: "By message 3, Lucía says the last-minute venue change does not quite add up.", points: 1, skillTag: "initial-clue" },
  { id: "arg-register-story-q2", type: "multiple-choice", prompt: "Which additional detail feels suspicious to Fran?", options: ["There is no official address", "The band changed its name", "Lucía invited too many people", "The event starts early"], correctAnswer: "There is no official address", explanation: "Fran says the lack of an official address feels off.", points: 1, skillTag: "detail" },
  { id: "arg-register-story-q3", type: "multiple-choice", prompt: "What does the organizer request by message 9?", options: ["Another transfer that night without a receipt", "A new song list", "Everyone’s passport", "A later arrival time"], correctAnswer: "Another transfer that night without a receipt", explanation: "Lucía reports the new payment request before this checkpoint.", points: 1, skillTag: "request" },
  { id: "arg-register-story-q4", type: "true-false", prompt: "True or false: Fran suggests asking for an invoice as a fallback.", options: ["True", "False"], correctAnswer: "True", explanation: "At message 12, Fran says they can request an invoice as a last resort.", points: 1, skillTag: "fallback" },
  { id: "arg-register-story-q5", type: "multiple-choice", prompt: "How does the organizer pressure the group?", options: ["He says anyone who does not pay by midnight is out", "He cancels the band", "He refuses to share the time", "He threatens to call the police"], correctAnswer: "He says anyone who does not pay by midnight is out", explanation: "That ultimatum appears in message 15.", points: 1, skillTag: "pressure" },
  { id: "arg-register-story-q6", type: "multiple-choice", prompt: "Who has already paid?", options: ["Cami", "Fran", "Lucía", "The venue owner"], correctAnswer: "Cami", explanation: "Lucía says Cami transferred the money because she trusted the organizer.", points: 1, skillTag: "person" },
  { id: "arg-register-story-q7", type: "multiple-choice", prompt: "What do they discover about the original venue?", options: ["It publicly says it was never available that night", "It has doubled its capacity", "It is giving refunds", "It moved to another city"], correctAnswer: "It publicly says it was never available that night", explanation: "Fran finds the venue’s public post by message 21.", points: 1, skillTag: "evidence" },
  { id: "arg-register-story-q8", type: "multiple-choice", prompt: "What alternative does the organizer offer?", options: ["A warehouse two hours away", "A free theatre downtown", "An online concert", "A restaurant nearby"], correctAnswer: "A warehouse two hours away", explanation: "The alternative location is revealed before message 24.", points: 1, skillTag: "alternative" },
  { id: "arg-register-story-q9", type: "multiple-choice", prompt: "What does the organizer finally admit?", options: ["The permit failed and the original deposit was lost", "There was never a band", "Cami organised the event", "The new venue is free"], correctAnswer: "The permit failed and the original deposit was lost", explanation: "He admits both facts during the group call by message 27.", points: 1, skillTag: "admission" },
  { id: "arg-register-story-q10", type: "multiple-choice", prompt: "What final option does the organizer give the group?", options: ["Accept the new plan or request a refund", "Pay double or leave", "Attend without tickets", "Wait another month"], correctAnswer: "Accept the new plan or request a refund", explanation: "In the final messages, the organizer offers a refund to anyone who does not accept the change.", points: 1, skillTag: "outcome" },
];

export const argentinianSpanishC1AdvancedSlangNuanceRegisterWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Argentinian C1 Story: The Event That Didn’t Add Up", subtitle: "Lucía and Fran decode a suspicious last-minute event change without jumping to conclusions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "advanced", tags: ["Argentinian Spanish", "C1", "WhatsApp", "slang", "register"], estimatedMinutes: 19,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [{ id: "lucia", name: "Lucía", initials: "L", side: "left", color: "violet" }, { id: "fran", name: "Fran", initials: "F", side: "right", color: "blue" }],
    messages: [
      message("m1", "lucia", "¿Viste lo del evento de Nico?", "Did you see the news about Nico’s event?", []),
      message("m2", "lucia", "Cambió el lugar a último momento y sin avisar.", "He changed the venue at the last minute without warning.", ["a último momento", "sin avisar"]),
      message("m3", "lucia", "Ponele que tuvo un problema, pero no me termina de cerrar.", "Let’s say he had a problem, but it still doesn’t quite add up.", ["Ponele", "No me termina de cerrar"], "voice-note"),
      message("m4", "fran", "A mí tampoco. La explicación está tirada de los pelos.", "Me neither. The explanation is far-fetched.", ["Está tirado de los pelos"]),
      message("m5", "fran", "Encima, todavía no mandó una dirección oficial.", "On top of that, he still hasn’t sent an official address.", ["Encima…"]),
      message("m6", "fran", "Ese detalle me hace ruido.", "That detail feels off to me.", ["Me hace ruido"], "voice-note"),
      message("m7", "lucia", "Por ahí se demoró el permiso del lugar.", "Maybe the venue permit was delayed.", ["Por ahí…"]),
      message("m8", "fran", "Esa posibilidad te la compro, pero hasta ahí nomás.", "I’ll give you that possibility, but only up to a point.", ["Te la compro", "Hasta ahí nomás"]),
      message("m9", "lucia", "Ahora pide otra transferencia para esta noche y no ofrece recibo.", "Now he’s asking for another transfer tonight and isn’t offering a receipt.", []),
      message("m10", "fran", "No, cobrar de nuevo así no da.", "No, charging people again like that isn’t okay.", ["No da"]),
      message("m11", "lucia", "Me da cosa preguntárselo en la cara porque es amigo de Cami.", "I feel awkward asking him to his face because he’s Cami’s friend.", ["Me da cosa", "en la cara"]),
      message("m12", "fran", "De última, le pedimos una factura antes de pagar.", "Worst case, we ask him for an invoice before paying.", ["De última"], "voice-note"),
      message("m13", "lucia", "Mandó un audio re caliente al grupo.", "He sent a really angry voice note to the group.", []),
      message("m14", "fran", "Medio que se fue al pasto con el tono.", "He kind of went too far with his tone.", ["Medio que…", "Se fue al pasto"]),
      message("m15", "lucia", "Dijo que el que no paga antes de medianoche queda afuera.", "He said anyone who doesn’t pay before midnight is out.", []),
      message("m16", "fran", "¿Transferir bajo presión? Ni a palos. Esa actitud me saca.", "Transfer under pressure? Absolutely not. That attitude drives me crazy.", ["Ni a palos", "Me saca"]),
      message("m17", "lucia", "El problema es que Cami ya pagó porque confía en él.", "The problem is that Cami has already paid because she trusts him.", []),
      message("m18", "lucia", "Si esto se cancela, me la baja por ella más que por el evento.", "If this gets cancelled, it kills my mood more for her sake than because of the event.", ["Me la baja"], "voice-note"),
      message("m19", "fran", "Esperá: encontré una publicación del lugar original.", "Wait: I found a post from the original venue.", []),
      message("m20", "fran", "Dicen que nunca estuvieron disponibles para esa fecha.", "They say they were never available on that date.", []),
      message("m21", "lucia", "A esta altura, capaz que el problema viene por otro lado.", "At this point, maybe the problem lies somewhere else.", ["A esta altura…", "Capaz que…", "por otro lado"]),
      message("m22", "fran", "Nico acaba de ofrecer un galpón a dos horas de la ciudad.", "Nico has just offered a warehouse two hours from the city.", []),
      message("m23", "lucia", "¿Mover a todos hasta allá mañana? La veo difícil.", "Move everyone all the way there tomorrow? I think that’s unlikely.", ["La veo difícil"]),
      message("m24", "fran", "Qué querés que te diga: cambiar todo otra vez me sigue haciendo ruido.", "What can I tell you: changing everything again still feels off to me.", ["Qué querés que te diga", "Me hace ruido"], "voice-note"),
      message("m25", "lucia", "Propuse una videollamada con todo el grupo y aceptó.", "I proposed a video call with the whole group, and he accepted.", []),
      message("m26", "fran", "Bien. Que explique las fechas y la plata, sin vueltas.", "Good. Let him explain the dates and the money clearly.", []),
      message("m27", "lucia", "Admitió que falló el permiso y que perdió la seña original. Para mí, el problema va por ahí.", "He admitted the permit failed and he lost the original deposit. I think that’s basically where the problem lies.", ["Para mí va por ahí"]),
      message("m28", "fran", "Una parte te la compro. Igual, presionar al grupo no da.", "I’ll give you part of that. Still, pressuring the group isn’t okay.", ["Te la compro", "Igual…", "No da"]),
      message("m29", "lucia", "Aceptó devolver la plata a quien no quiera el galpón.", "He agreed to return the money to anyone who doesn’t want the warehouse plan.", []),
      message("m30", "fran", "Bueno, capaz que lo resuelven. Qué sé yo. Yo pediría el reintegro.", "Well, maybe they’ll solve it. I don’t know. I’d ask for the refund.", ["Capaz que…", "Qué sé yo"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-register-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: registerVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: registerVocab.map((item) => item.term),
      grammarPatterns: ["Hedging with ponele, medio que, por ahí, and capaz que.", "Partial agreement with te la compro and hasta ahí nomás.", "Social judgment with no da and emotional evaluation with me la baja or me saca."],
      speakingPrompts: ["Explain why a proposal does not quite add up.", "Accept one part of an argument but reject the rest.", "React to an inappropriate last-minute change.", "Offer a fallback without sounding overly certain."],
    },
    completionTask: { title: "Your Argentine C1 nuance voice note", instructions: "Record a 90-second reaction to a suspicious plan. Use at least eight target expressions and move from cautious doubt to a clear final recommendation." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En la conversación argentina, “ponele” permite imaginar una situación sin afirmarla como cierta. Puede equivaler a ‘supongamos’ o indicar una cifra aproximada. Si después aparece “medio que”, el hablante reduce todavía más la fuerza de lo que dice: “Ponele que es verdad; igual, medio que es raro”.", translation: "In Argentine conversation, ponele lets speakers imagine a situation without declaring it true. It can mean suppose or indicate an approximate figure. Medio que then softens the claim even further.", highlights: highlights(["Ponele", "Medio que…", "Igual…"]), shadowLine: "Ponele que es verdad; igual, medio que es raro." },
  { id: "p2", text: "Cuando una historia genera dudas, “no me termina de cerrar” comunica que las piezas todavía no encajan. “Me hace ruido” es parecido, aunque suele señalar un detalle concreto que despierta sospecha o incomodidad. Las dos expresiones permiten cuestionar algo sin acusar directamente a nadie.", translation: "When a story creates doubt, no me termina de cerrar says the pieces still do not fit. Me hace ruido often points to a specific suspicious or uncomfortable detail. Both allow questioning without a direct accusation.", highlights: highlights(["No me termina de cerrar", "Me hace ruido"]), shadowLine: "Hay algo que no me termina de cerrar; ese detalle me hace ruido." },
  { id: "p3", text: "“No da” juzga una conducta según el contexto social: puede significar que algo no corresponde, no es justo o simplemente no funciona. En cambio, “la veo difícil” evalúa una posibilidad. “Cambiar todo sin avisar no da” critica la decisión; “¿terminar hoy? La veo difícil” expresa una expectativa negativa.", translation: "No da judges conduct according to social context: something may be inappropriate, unfair, or unworkable. La veo difícil evaluates likelihood instead.", highlights: highlights(["No da", "La veo difícil", "sin avisar"]), shadowLine: "Cambiar todo sin avisar no da; resolverlo hoy la veo difícil." },
  { id: "p4", text: "Para negociar una salida aparecen “de última” y “ni a palos”. La primera introduce el plan de reserva: “De última, lo hacemos mañana”. La segunda cierra una opción de manera enfática: “¿Pagar sin recibo? Ni a palos”. Esta última es muy informal y no pertenece a un registro profesional.", translation: "De última introduces a fallback, while ni a palos rejects an option emphatically. Ni a palos is strongly informal and unsuitable for professional register.", highlights: highlights(["De última", "Ni a palos"]), shadowLine: "De última, esperamos; pagar sin recibo, ni a palos." },
  { id: "p5", text: "Aceptar una parte no obliga a aceptar todo. “Te la compro” reconoce que un argumento tiene valor, mientras que “hasta ahí nomás” marca el límite. Juntas forman una respuesta muy útil: “Te la compro, pero hasta ahí nomás”. El desacuerdo queda claro sin borrar el punto válido de la otra persona.", translation: "Te la compro recognizes a valid argument, while hasta ahí nomás marks the limit. Together they create clear partial agreement.", highlights: highlights(["Te la compro", "Hasta ahí nomás"]), shadowLine: "Te la compro, pero hasta ahí nomás." },
  { id: "p6", text: "La posibilidad se expresa mucho con “por ahí” y “capaz que”. En Argentina, “por ahí” no siempre habla de un lugar: también puede significar ‘quizás’. “Me da cosa”, por otro lado, introduce una reacción social o emocional: vergüenza, incomodidad o reparo frente a una acción.", translation: "Por ahí and capaz que often express possibility in Argentina. Me da cosa introduces embarrassment, discomfort, or hesitation.", highlights: highlights(["Por ahí…", "Capaz que…", "Me da cosa", "por otro lado"]), shadowLine: "Por ahí hay otra explicación, pero me da cosa preguntar." },
  { id: "p7", text: "Las reacciones coloquiales cambian de intensidad. “Me la baja” describe una pérdida de entusiasmo; “me saca” indica irritación fuerte; “se fue al pasto” afirma que alguien cruzó un límite. Si además la explicación parece forzada, se puede decir que “está tirada de los pelos”.", translation: "These colloquial reactions increase in intensity: me la baja marks lost enthusiasm, me saca strong irritation, se fue al pasto a crossed boundary, and tirado de los pelos a forced explanation.", highlights: highlights(["Me la baja", "Me saca", "Se fue al pasto", "Está tirado de los pelos"]), shadowLine: "Me la baja, me saca y, con ese comentario, se fue al pasto." },
  { id: "p8", text: "Para cerrar una evaluación aparecen “a esta altura”, “qué sé yo” y “qué querés que te diga”. La primera reúne la evidencia acumulada; las otras expresan incertidumbre o resignación. “Para mí va por ahí” propone una interpretación probable, pero “encima”, “a último momento” o “en la cara” pueden agregar detalles que cambian el tono y la gravedad.", translation: "A esta altura gathers accumulated evidence; qué sé yo and qué querés que te diga express uncertainty or resignation. Para mí va por ahí offers a probable interpretation, while the remaining chunks add consequential details.", highlights: highlights(["A esta altura…", "Qué sé yo", "Qué querés que te diga", "Para mí va por ahí", "Encima…", "a último momento", "en la cara"]), shadowLine: "A esta altura, qué querés que te diga: para mí va por ahí." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-register-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly explaining?", options: ["How Argentine speakers hedge, judge, react, and control register", "How to conjugate the future tense", "How to order food", "How to write a formal contract"], correctAnswer: "How Argentine speakers hedge, judge, react, and control register", explanation: "The reading focuses on nuanced conversational functions and register.", points: 1, skillTag: "gist" },
  { id: "arg-register-reading-q2", type: "multiple-choice", prompt: "Which phrase questions an explanation without directly accusing anyone?", options: ["No me termina de cerrar", "Ni a palos", "De última", "En la cara"], correctAnswer: "No me termina de cerrar", explanation: "It communicates that the pieces do not fully fit.", points: 1, skillTag: "nuance" },
  { id: "arg-register-reading-q3", type: "true-false", prompt: "True or false: “Ni a palos” is suitable for a formal professional meeting.", options: ["True", "False"], correctAnswer: "False", explanation: "The reading explicitly marks it as strongly informal.", points: 1, skillTag: "register" },
  { id: "arg-register-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll give you that, but only up to a point.", wordBank: ["Te", "la", "compro,", "pero", "hasta", "ahí", "nomás."], correctAnswer: "Te la compro, pero hasta ahí nomás.", explanation: "This combines partial agreement with a clear limit.", points: 2, skillTag: "phrase-building" },
  { id: "arg-register-reading-q5", type: "multiple-choice", prompt: "Which expression says something destroys your enthusiasm?", options: ["Me la baja", "Me da cosa", "Ponele", "Por ahí"], correctAnswer: "Me la baja", explanation: "Me la baja means something kills your mood or enthusiasm.", points: 1, skillTag: "emotion" },
];

export const argentinianSpanishC1AdvancedSlangNuanceRegisterReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Argentinian C1 Reading: Cuando Algo No Cierra", subtitle: "A synced Spanish reading on Argentine hedging, skepticism, emotional reactions, partial agreement, and register.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "advanced", tags: ["Argentinian Spanish", "C1", "reading", "slang", "register"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: registerVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Argentinian C1 advanced slang, nuance and register vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const argentinianSpanishC1AdvancedSlangNuanceRegisterQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Argentinian Spanish C1: Advanced Slang, Nuance & Register Quiz", subtitle: "Choose the right Argentine expression for skepticism, partial agreement, social judgment, and emotional reactions.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "advanced", tags: ["Argentinian Spanish", "C1", "quiz", "slang", "register"], estimatedMinutes: 20,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Practice choosing advanced Argentine expressions according to meaning, intensity, context, and register.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "arg-register-quiz-1", type: "multiple-choice", prompt: "You want to introduce a hypothetical assumption. Which opening fits?", options: ["Ponele que es verdad", "Ni a palos", "Me la baja", "En la cara"], correctAnswer: "Ponele que es verdad", explanation: "Ponele que introduces a hypothetical or approximate scenario.", points: 1, skillTag: "hypothesis" },
      { id: "arg-register-quiz-2", type: "fill-blank", prompt: "Complete: Hay algo que no me termina de ______.", nativePrompt: "There’s something that doesn’t quite add up.", correctAnswer: "cerrar", explanation: "No me termina de cerrar expresses unresolved doubt.", points: 1, skillTag: "skepticism" },
      { id: "arg-register-quiz-3", type: "multiple-choice", prompt: "A small detail creates suspicion, but you do not want to accuse anyone. What do you say?", options: ["Ese detalle me hace ruido", "Ese detalle me la baja", "Ese detalle ni a palos", "Ese detalle de última"], correctAnswer: "Ese detalle me hace ruido", explanation: "Me hace ruido flags a suspicious or uncomfortable detail.", points: 1, skillTag: "nuance" },
      { id: "arg-register-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Changing everything without warning isn’t okay.", wordBank: ["Cambiar", "todo", "sin", "avisar", "no", "da."], correctAnswer: "Cambiar todo sin avisar no da.", explanation: "No da gives a context-sensitive negative social judgment.", points: 2, skillTag: "social-judgment" },
      { id: "arg-register-quiz-5", type: "true-false", prompt: "True or false: “La veo difícil” makes an absolute statement that something is impossible.", options: ["True", "False"], correctAnswer: "False", explanation: "It expresses a pessimistic assessment, not absolute impossibility.", points: 1, skillTag: "probability" },
      { id: "arg-register-quiz-6", type: "multiple-choice", prompt: "You want to accept one point but reject the rest. Which phrase works best?", options: ["Te la compro, pero hasta ahí nomás", "Ni a palos, de última", "Me da cosa y me saca", "Ponele, a esta altura"], correctAnswer: "Te la compro, pero hasta ahí nomás", explanation: "This is a natural partial-agreement formula.", points: 1, skillTag: "partial-agreement" },
      { id: "arg-register-quiz-7", type: "fill-blank", prompt: "Complete: ¿Pagar sin recibo? Ni a ______.", nativePrompt: "Pay without a receipt? Absolutely not.", correctAnswer: "palos", explanation: "Ni a palos is a strong informal refusal.", points: 1, skillTag: "refusal" },
      { id: "arg-register-quiz-8", type: "multiple-choice", prompt: "A sudden change ruins your enthusiasm. Which reaction fits?", options: ["Me la baja", "Me da cosa", "Por ahí", "Te la compro"], correctAnswer: "Me la baja", explanation: "Me la baja means it kills your mood or turns you off.", points: 1, skillTag: "emotion" },
      { id: "arg-register-quiz-9", type: "order-words", prompt: "Order the phrase.", nativePrompt: "That explanation is far-fetched.", wordBank: ["Esa", "explicación", "está", "tirada", "de", "los", "pelos."], correctAnswer: "Esa explicación está tirada de los pelos.", explanation: "Tirado de los pelos describes a forced or poorly supported explanation.", points: 2, skillTag: "evaluation" },
      { id: "arg-register-quiz-10", type: "multiple-choice", prompt: "Which expression often introduces a frank or resigned opinion?", options: ["Qué querés que te diga", "Sin avisar", "Hasta ahí nomás", "Por otro lado"], correctAnswer: "Qué querés que te diga", explanation: "It commonly frames a frank or resigned view rather than asking a literal question.", points: 1, skillTag: "register" },
      pairQuestion("arg-register-pairs-1", "Match the hedging and skeptical expressions.", registerVocab.slice(0, 9)),
      pairQuestion("arg-register-pairs-2", "Match possibility, emotion, and boundary expressions.", registerVocab.slice(9, 18)),
      pairQuestion("arg-register-pairs-3", "Match conclusions, connectors, and contextual chunks.", registerVocab.slice(18)),
    ],
  },
};
