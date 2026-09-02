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

const courseId = "mexican-spanish-c1-complete-local-conversation";
const skoolSectionName = "Mexican Spanish - C1 Complete Local Conversation";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const conversationVocab: VocabItem[] = [
  { id: "andar-en-friega", term: "andar en friega", meaning: "to be insanely busy / under heavy pressure", matchingMeaning: "to be insanely busy", note: "Very Mexican informal phrase for being under intense pressure or nonstop work.", example: "Ando en friega desde temprano con el evento.", translation: "I’ve been insanely busy since early with the event.", starred: true },
  { id: "traer-un-pendiente", term: "traer un pendiente", meaning: "to have something pending / unresolved", matchingMeaning: "to have something pending", note: "Used for a task, worry, or loose end still sitting in your head.", example: "Traigo un pendiente con el proveedor.", translation: "I have something pending with the supplier.", starred: true },
  { id: "ponerse-las-pilas", term: "ponerse las pilas", meaning: "to get moving / get your act together / focus", matchingMeaning: "to get moving", note: "Common Mexican push to focus, hurry up, or take responsibility.", example: "Nos tenemos que poner las pilas antes de que llegue la gente.", translation: "We need to get moving before people arrive.", starred: true },
  { id: "no-dar-pie-con-bola", term: "no dar pie con bola", meaning: "to get everything wrong / make no progress", matchingMeaning: "to get everything wrong", note: "Describes someone who keeps missing the mark or cannot make progress.", example: "El equipo no está dando pie con bola con la logística.", translation: "The team is getting everything wrong with the logistics.", starred: true },
  { id: "sacar-el-buey", term: "sacar el buey de la barranca", meaning: "to rescue a difficult situation", matchingMeaning: "to rescue a difficult situation", note: "Idiomatic phrase for pulling a messy situation out of trouble.", example: "A ver cómo sacamos el buey de la barranca.", translation: "Let’s see how we rescue this situation.", starred: true },
  { id: "ponerse-color-hormiga", term: "ponerse color de hormiga", meaning: "to start getting serious / difficult / ugly", matchingMeaning: "to get serious", note: "Used when a situation begins to look risky or complicated.", example: "Si no llega el permiso, esto se pone color de hormiga.", translation: "If the permit doesn’t arrive, this gets serious.", starred: true },
  { id: "no-es-mi-boleto", term: "no es mi boleto", meaning: "it’s not my problem / responsibility", matchingMeaning: "it’s not my responsibility", note: "Informal boundary-setting phrase; can sound dismissive if used coldly.", example: "La música no es mi boleto, pero puedo revisar el contacto.", translation: "The music isn’t my responsibility, but I can check the contact.", starred: true },
  { id: "de-volada", term: "de volada", meaning: "very quickly / right away", matchingMeaning: "right away", note: "Natural Mexican phrase for doing something immediately or very fast.", example: "Mándame el archivo y lo reviso de volada.", translation: "Send me the file and I’ll review it right away.", starred: true },
  { id: "al-pie-del-canon", term: "estar al pie del cañón", meaning: "to stay fully committed / be there when needed", matchingMeaning: "to stay fully committed", note: "Means being present, reliable, and ready to help under pressure.", example: "Aquí sigo al pie del cañón hasta que terminemos.", translation: "I’m still here fully committed until we finish.", starred: true },
  { id: "me-trae-de-cabeza", term: "me trae de cabeza", meaning: "it’s driving me crazy / causing constant trouble", matchingMeaning: "it’s driving me crazy", note: "Used for a problem that keeps taking mental energy.", example: "El audio me trae de cabeza desde ayer.", translation: "The audio has been driving me crazy since yesterday.", starred: true },
  { id: "ahi-te-encargo", term: "ahí te encargo", meaning: "I’m leaving that with you / please take care of that", matchingMeaning: "please take care of that", note: "Very Mexican way to assign responsibility, sometimes with pressure underneath.", example: "La lista de invitados, ahí te encargo.", translation: "The guest list, please take care of that.", starred: true },
  { id: "se-me-hace-gacho", term: "se me hace gacho", meaning: "that seems unfair / harsh / crappy to me", matchingMeaning: "that seems unfair", note: "Informal value judgment when something feels rough or unfair.", example: "Se me hace gacho cancelarles a última hora.", translation: "It seems unfair to cancel on them at the last minute.", starred: true },
  { id: "no-le-busques", term: "no le busques tres pies al gato", meaning: "don’t overcomplicate it / don’t look for problems that aren’t there", matchingMeaning: "don’t overcomplicate it", note: "Useful when someone is inventing complications or suspicious meanings.", example: "No le busques tres pies al gato; cambiemos la sede y ya.", translation: "Don’t overcomplicate it; let’s change the venue and that’s it.", starred: true },
  { id: "me-cae-que", term: "me cae que…", meaning: "I swear / I really think that…", matchingMeaning: "I swear", note: "Mexican conversational intensifier used before a strong personal statement.", example: "Me cae que hoy sí lo sacamos.", translation: "I swear we’ll get it done today.", starred: true },
  { id: "no-hay-bronca", term: "no hay bronca", meaning: "no problem / all good", matchingMeaning: "no problem", note: "Informal reassurance that something is okay or manageable.", example: "Si llegas tarde, no hay bronca.", translation: "If you arrive late, no problem.", starred: true },
  { id: "ni-modo", term: "ni modo", meaning: "oh well / nothing we can do", matchingMeaning: "oh well", note: "Accepts an inconvenient reality without fighting it further.", example: "Si no contestan, ni modo, buscamos otra opción.", translation: "If they don’t answer, oh well, we’ll look for another option.", starred: true },
  { id: "hacerle-la-lucha", term: "hacerle la lucha", meaning: "to keep trying / give it a real effort", matchingMeaning: "to keep trying", note: "Mexican phrase for persisting even when the situation is hard.", example: "Vamos a hacerle la lucha con el presupuesto que queda.", translation: "We’re going to keep trying with the budget we have left.", starred: true },
  { id: "salir-del-atolladero", term: "salir del atolladero", meaning: "to get out of a difficult situation", matchingMeaning: "to get out of a difficult situation", note: "More elevated but natural phrase for escaping a mess or jam.", example: "Necesitamos una decisión para salir del atolladero.", translation: "We need a decision to get out of this jam.", starred: true },
  { id: "nos-cayo-del-cielo", term: "nos cayó del cielo", meaning: "it came at exactly the right moment / it was a lifesaver", matchingMeaning: "it was a lifesaver", note: "Used when unexpected help appears at the perfect time.", example: "Ese contacto nos cayó del cielo.", translation: "That contact was a lifesaver.", starred: true },
  { id: "de-buenas-a-primeras", term: "de buenas a primeras", meaning: "suddenly / out of nowhere", matchingMeaning: "suddenly", note: "Describes something that happens abruptly without warning.", example: "De buenas a primeras nos cambiaron la hora.", translation: "Out of nowhere they changed the time.", starred: true },
  { id: "no-echar-campanas", term: "no está para echar campanas al vuelo", meaning: "it’s too early to celebrate / don’t get carried away yet", matchingMeaning: "too early to celebrate", note: "Cautious phrase when there is progress but no final guarantee.", example: "Ya tenemos permiso, pero no está para echar campanas al vuelo.", translation: "We have permission now, but it’s too early to celebrate.", starred: true },
  { id: "a-la-mera-hora", term: "a la mera hora", meaning: "at the last minute / when the moment actually came", matchingMeaning: "at the last minute", note: "Very Mexican timing phrase for when something changes or happens at the decisive moment.", example: "A la mera hora faltó el DJ.", translation: "At the last minute the DJ was missing.", starred: true },
  { id: "echar-la-mano", term: "echar la mano", meaning: "to help out / lend a hand", matchingMeaning: "to help out", note: "Friendly Mexican phrase for offering practical help.", example: "Si puedes echarme la mano con las sillas, te lo agradezco.", translation: "If you can help me with the chairs, I’d appreciate it.", starred: true },
  { id: "todavia-falta-chamba", term: "todavía falta chamba", meaning: "there’s still work to do", matchingMeaning: "there’s still work to do", note: "Chamba is informal Mexican Spanish for work; this phrase keeps people realistic.", example: "Quedó mejor, pero todavía falta chamba.", translation: "It looks better, but there’s still work to do.", starred: true },
  { id: "se-nos-complico", term: "se nos complicó", meaning: "things got complicated for us", matchingMeaning: "things got complicated", note: "Natural way to explain that a situation became harder than expected.", example: "Se nos complicó con la lluvia y el cambio de sede.", translation: "Things got complicated with the rain and the venue change.", starred: true },
];

const highlightMap = Object.fromEntries(conversationVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = conversationVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC1CompleteLocalConversationFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C1: Complete Local Conversation Flashcards",
  subtitle: "Mexican phrases for pressure, problem-solving, responsibility, last-minute chaos, and realistic teamwork.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C1", "flashcards", "conversation", "problem-solving"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: conversationVocab.map(cardFromVocab) },
};

export const mexicanSpanishC1CompleteLocalConversationSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Complete Local Conversation",
  subtitle: "Build advanced Mexican phrases for rescuing a messy real-life situation without losing the local rhythm.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "sentence-builder", "local-conversation", "pressure"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note where a plan gets complicated, you set one boundary, ask for help, and explain the next move.",
    stages: [
      stage("stage-1", "Name the pressure", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "I’m insanely busy, I have something pending, and we need to get moving.", "Ando en friega, traigo un pendiente y nos tenemos que poner las pilas.", "This opens a high-pressure conversation naturally without sounding dramatic.", breakdown([["I’m insanely busy", "ando en friega"], ["I have something pending", "traigo un pendiente"], ["get moving", "ponernos las pilas"]])),
      stage("stage-2", "Rescue the mess", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "We’re getting everything wrong, so we have to rescue this situation before it gets ugly.", "No estamos dando pie con bola, así que hay que sacar el buey de la barranca antes de que se ponga color de hormiga.", "This combines failure, recovery, and escalating risk.", breakdown([["we’re getting everything wrong", "no estamos dando pie con bola"], ["rescue the situation", "sacar el buey de la barranca"], ["gets ugly", "se ponga color de hormiga"]])),
      stage("stage-3", "Set responsibility", sentenceVocab.slice(6, 11), sentenceVocab.slice(0, 11), "That isn’t my responsibility, but I’ll review it right away because I’m still fully committed.", "Eso no es mi boleto, pero lo reviso de volada porque sigo al pie del cañón.", "This sets a boundary while still showing commitment.", breakdown([["it isn’t my responsibility", "no es mi boleto"], ["right away", "de volada"], ["fully committed", "al pie del cañón"]])),
      stage("stage-4", "Assign the loose end", sentenceVocab.slice(9, 13), sentenceVocab.slice(0, 13), "The permit is driving me crazy; please take care of that, because canceling seems unfair to me.", "El permiso me trae de cabeza; ahí te encargo, porque cancelar se me hace gacho.", "This practices a Mexican-style responsibility handoff.", breakdown([["driving me crazy", "me trae de cabeza"], ["please take care of that", "ahí te encargo"], ["seems unfair", "se me hace gacho"]])),
      stage("stage-5", "Avoid overthinking", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "Don’t overcomplicate it; I swear there’s no problem if we change the plan.", "No le busques tres pies al gato; me cae que no hay bronca si cambiamos el plan.", "This gives reassurance while stopping unnecessary complications.", breakdown([["don’t overcomplicate it", "no le busques tres pies al gato"], ["I swear", "me cae que"], ["no problem", "no hay bronca"]])),
      stage("stage-6", "Keep trying", sentenceVocab.slice(15, 20), sentenceVocab.slice(0, 20), "Oh well, we’ll keep trying until we get out of this jam; that contact was a lifesaver.", "Ni modo, vamos a hacerle la lucha hasta salir del atolladero; ese contacto nos cayó del cielo.", "This shifts from frustration to practical hope.", breakdown([["oh well", "ni modo"], ["keep trying", "hacerle la lucha"], ["get out of the jam", "salir del atolladero"], ["was a lifesaver", "nos cayó del cielo"]])),
      stage("stage-7", "Stay realistic", sentenceVocab.slice(19, 23), sentenceVocab.slice(0, 23), "Out of nowhere it changed at the last minute, but it’s too early to celebrate.", "De buenas a primeras cambió a la mera hora, pero no está para echar campanas al vuelo.", "This stage practices cautious optimism in Mexican Spanish.", breakdown([["out of nowhere", "de buenas a primeras"], ["at the last minute", "a la mera hora"], ["too early to celebrate", "no está para echar campanas al vuelo"]])),
      stage("stage-8", "Ask for help", sentenceVocab.slice(22), sentenceVocab, "Can you lend me a hand? There’s still work to do because things got complicated for us.", "¿Me echas la mano? Todavía falta chamba porque se nos complicó.", "This closes with a practical request and realistic summary.", breakdown([["lend me a hand", "echarme la mano"], ["there’s still work to do", "todavía falta chamba"], ["things got complicated", "se nos complicó"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-complete-story-q1", type: "multiple-choice", prompt: "After message 3, what is happening to Sofía?", options: ["She is under pressure and has an unresolved issue", "She is calmly celebrating the event", "She is asking for a date", "She is complaining about a restaurant bill"], correctAnswer: "She is under pressure and has an unresolved issue", explanation: "Sofía says she is en friega and has a pendiente with the venue.", points: 1, skillTag: "context" },
  { id: "mexican-c1-complete-story-q2", type: "multiple-choice", prompt: "After message 6, what problem does Diego identify?", options: ["The team is making no progress and the situation could get serious", "Everyone already arrived", "The venue is too fancy", "Sofía wants to cancel because she is bored"], correctAnswer: "The team is making no progress and the situation could get serious", explanation: "Diego says they are not giving pie con bola and it may get color de hormiga.", points: 1, skillTag: "gist" },
  { id: "mexican-c1-complete-story-q3", type: "true-false", prompt: "After message 9, true or false: Sofía sets a boundary but still agrees to help quickly.", options: ["True", "False"], correctAnswer: "True", explanation: "She says the music is not her boleto, but she will check the backup de volada.", points: 1, skillTag: "inference" },
  { id: "mexican-c1-complete-story-q4", type: "multiple-choice", prompt: "After message 12, what is driving Diego crazy?", options: ["The audio and the missing microphone cable", "The weather forecast only", "A late guest", "A confusing flirting situation"], correctAnswer: "The audio and the missing microphone cable", explanation: "Diego says the audio trae him de cabeza and mentions the cable.", points: 1, skillTag: "detail" },
  { id: "mexican-c1-complete-story-q5", type: "multiple-choice", prompt: "After message 15, why does Sofía think canceling is a bad move?", options: ["Because it seems unfair after people rearranged their afternoon", "Because she wants to avoid all work", "Because the event already finished", "Because Diego bought decorations"], correctAnswer: "Because it seems unfair after people rearranged their afternoon", explanation: "She says canceling se me hace gacho because people moved their afternoon.", points: 1, skillTag: "reason" },
  { id: "mexican-c1-complete-story-q6", type: "true-false", prompt: "After message 18, true or false: Diego tells Sofía to overcomplicate the problem and panic.", options: ["True", "False"], correctAnswer: "False", explanation: "He says not to look for three feet on the cat and that there is no bronca if they change the format.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-complete-story-q7", type: "multiple-choice", prompt: "After message 21, what unexpected help appears?", options: ["Nora offers a projector and two speakers", "A guest offers to cook dinner", "The venue doubles the price", "Diego finds a new job"], correctAnswer: "Nora offers a projector and two speakers", explanation: "Sofía says Nora has a projector and speakers, and that it fell from the sky.", points: 1, skillTag: "detail" },
  { id: "mexican-c1-complete-story-q8", type: "multiple-choice", prompt: "After message 24, what changes at the last minute?", options: ["The room is no longer available and they need a courtyard", "The event gets canceled by the police", "Sofía loses the guest list", "Diego decides to leave"], correctAnswer: "The room is no longer available and they need a courtyard", explanation: "Diego says that de buenas a primeras the room is unavailable and it changed a la mera hora.", points: 1, skillTag: "sequence" },
  { id: "mexican-c1-complete-story-q9", type: "true-false", prompt: "After message 27, true or false: Diego says there is no more work left to do.", options: ["True", "False"], correctAnswer: "False", explanation: "He says todavía falta chamba, meaning there is still work to do.", points: 1, skillTag: "detail" },
  { id: "mexican-c1-complete-story-q10", type: "multiple-choice", prompt: "After message 30, what is the final mood?", options: ["The plan got complicated, but they are committed and moving forward", "They quit and blame each other", "They decide it is not their responsibility anymore", "They celebrate as if everything is already guaranteed"], correctAnswer: "The plan got complicated, but they are committed and moving forward", explanation: "They admit se nos complicó, but they remain al pie del cañón and keep working.", points: 1, skillTag: "gist" },
];

const storyMessages: StoryMessage[] = [
  message("m1", "sofia", "Diego, ¿estás por ahí? Ando en friega con lo del foro y apenas voy viendo los mensajes.", "Diego, are you around? I’m insanely busy with the forum and I’m only just checking the messages.", ["andar en friega"]),
  message("m2", "diego", "Sí, aquí estoy. ¿Qué pasó? Te noto medio acelerada desde la mañana.", "Yeah, I’m here. What happened? You’ve seemed kind of rushed since this morning.", []),
  message("m3", "sofia", "Traigo un pendiente con la sede: dicen que el salón quizá no está confirmado.", "I have something pending with the venue: they say the room might not be confirmed.", ["traer un pendiente"], "voice-note", `${storyAudioBase}/m3.mp3`),
  message("m4", "diego", "Entonces sí hay que ponerse las pilas, porque ya invitamos a medio mundo.", "Then we really need to get moving, because we already invited half the world.", ["ponerse las pilas"]),
  message("m5", "sofia", "Exacto. Y la agencia no está dando pie con bola; cada persona me dice algo distinto.", "Exactly. And the agency is getting everything wrong; every person tells me something different.", ["no dar pie con bola"]),
  message("m6", "diego", "Va. Respira. Primero sacamos el buey de la barranca y luego vemos a quién le reclamamos.", "Okay. Breathe. First we rescue the situation and then we see who we complain to.", ["sacar el buey de la barranca"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "sofia", "Si no nos contestan en una hora, esto se pone color de hormiga.", "If they don’t answer us in an hour, this gets serious.", ["ponerse color de hormiga"]),
  message("m8", "diego", "La parte de música no es mi boleto, pero puedo buscar el contacto del DJ de respaldo.", "The music part isn’t my responsibility, but I can find the backup DJ contact.", ["no es mi boleto"]),
  message("m9", "sofia", "Hazlo de volada, porfa. Si falla el audio, se nos cae toda la dinámica.", "Do it right away, please. If the audio fails, the whole activity falls apart.", ["de volada"]),
  message("m10", "diego", "No te preocupes, sigo al pie del cañón. No te voy a dejar sola con este relajo.", "Don’t worry, I’m still fully committed. I’m not going to leave you alone with this mess.", ["estar al pie del cañón"]),
  message("m11", "sofia", "Gracias. El permiso del patio me trae de cabeza porque nadie firma nada.", "Thanks. The courtyard permit is driving me crazy because nobody signs anything.", ["me trae de cabeza"]),
  message("m12", "diego", "El permiso, ahí te encargo tú, porque a ti ya te conocen en administración.", "The permit, I’m leaving that with you, because they already know you in admin.", ["ahí te encargo"], "voice-note", `${storyAudioBase}/m12.mp3`),
  message("m13", "sofia", "Va, pero se me hace gacho cancelarles a los ponentes si todos movieron su tarde.", "Okay, but it seems unfair to cancel on the speakers if everyone rearranged their afternoon.", ["se me hace gacho"]),
  message("m14", "diego", "No le busques tres pies al gato: cambiamos el formato y usamos patio si hace falta.", "Don’t overcomplicate it: we change the format and use the courtyard if needed.", ["no le busques tres pies al gato"]),
  message("m15", "sofia", "Me cae que si nos organizamos bien, todavía sale algo digno.", "I swear that if we organize ourselves well, something decent can still come out of this.", ["me cae que…"]),
  message("m16", "diego", "Claro. Y si alguien llega tarde por el cambio, no hay bronca; avisamos en el grupo.", "Sure. And if someone arrives late because of the change, no problem; we’ll tell the group.", ["no hay bronca"]),
  message("m17", "sofia", "Ni modo, tocó improvisar. Pero no quiero que parezca evento hecho al vapor.", "Oh well, we had to improvise. But I don’t want it to look like a rushed event.", ["ni modo"]),
  message("m18", "diego", "Pues vamos a hacerle la lucha: yo veo audio, tú ves permiso y cerramos agenda.", "Well, we’ll keep trying: I’ll handle audio, you handle the permit, and we close the schedule.", ["hacerle la lucha"], "voice-note", `${storyAudioBase}/m18.mp3`),
  message("m19", "sofia", "Con eso podemos salir del atolladero sin quemar la relación con la sede.", "With that, we can get out of the jam without burning the relationship with the venue.", ["salir del atolladero"]),
  message("m20", "diego", "Oye, Nora acaba de escribir: tiene proyector y dos bocinas. Eso nos cayó del cielo.", "Hey, Nora just wrote: she has a projector and two speakers. That was a lifesaver.", ["nos cayó del cielo"]),
  message("m21", "sofia", "Buenísimo. Entonces el plan B ya no suena tan triste.", "Great. Then plan B doesn’t sound so sad anymore.", []),
  message("m22", "diego", "Pero de buenas a primeras administración dice que el salón principal está cerrado por mantenimiento.", "But out of nowhere admin says the main room is closed for maintenance.", ["de buenas a primeras"]),
  message("m23", "sofia", "¿Neta? A la mera hora salen con eso. Ahora sí necesito café.", "Seriously? At the last minute they come out with that. Now I really need coffee.", ["a la mera hora"]),
  message("m24", "diego", "Sí, pero no está para echar campanas al vuelo ni para rendirnos: patio, bocinas y sillas.", "Yes, but it’s too early to celebrate and too early to give up: courtyard, speakers, and chairs.", ["no está para echar campanas al vuelo"], "voice-note", `${storyAudioBase}/m24.mp3`),
  message("m25", "sofia", "¿Me echas la mano con las sillas? Son veinte, y yo voy por las listas.", "Can you help me with the chairs? There are twenty, and I’ll go get the lists.", ["echar la mano"]),
  message("m26", "diego", "Va, pero todavía falta chamba: señalética, QR, agua y confirmar a Nora.", "Okay, but there’s still work to do: signage, QR, water, and confirming with Nora.", ["todavía falta chamba"]),
  message("m27", "sofia", "Sí, se nos complicó más de lo esperado, pero ya hay ruta.", "Yeah, things got more complicated than expected, but now there’s a path.", ["se nos complicó"]),
  message("m28", "diego", "Me late. Si la gente ve que resolvimos rápido, hasta puede sentirse más cercano.", "I like that. If people see we solved it quickly, it might even feel more intimate.", []),
  message("m29", "sofia", "Exacto. Nada de pánico en el chat, ¿va? Mensaje corto y seguro.", "Exactly. No panic in the chat, okay? Short and confident message.", []),
  message("m30", "diego", "Va. Tú manda el aviso y yo sigo al pie del cañón hasta que arranque.", "Okay. You send the notice and I’ll stay fully committed until it starts.", ["estar al pie del cañón"], "voice-note", `${storyAudioBase}/m30.mp3`),
];

export const mexicanSpanishC1CompleteLocalConversationWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C1 | Saving the Forum",
  subtitle: "A tense but practical Mexican Spanish chat where two organizers rescue a last-minute event problem.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "story", "problem-solving", "local-conversation"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sofia", name: "Sofía", initials: "S", side: "left", color: "violet" },
      { id: "diego", name: "Diego", initials: "D", side: "right", color: "blue" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `${question.id}-check`, afterMessageId: `m${(index + 1) * 3}`, question })),
    learnedVocab: conversationVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: conversationVocab.slice(0, 12).map((item) => item.term),
      grammarPatterns: ["Using se nos to soften shared responsibility", "Mexican idioms for pressure and repair", "Boundary-setting without abandoning the team"],
      speakingPrompts: ["Explain a plan that got complicated at the last minute.", "Ask a friend for help while still sounding calm.", "Set one responsibility boundary and offer one solution."],
    },
    completionTask: {
      title: "Send the rescue-plan voice note",
      instructions: "Record a Mexican Spanish voice note explaining what went wrong, what changed, who handles each task, and why the plan can still work.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una conversación mexicana real, no siempre empiezas perfecto y ordenado. A veces dices «ando en friega» porque traes mil cosas encima, o «traigo un pendiente» porque hay algo sin resolver que no te deja pensar bien. En C1, la clave es sonar natural bajo presión sin perder claridad.", translation: "In a real Mexican conversation, you do not always start perfectly and neatly. Sometimes you say ando en friega because you have a thousand things on you, or traigo un pendiente because there is something unresolved that will not let you think clearly. At C1, the key is sounding natural under pressure without losing clarity.", highlights: highlights(["andar en friega", "traer un pendiente"]), shadowLine: "Ando en friega y traigo un pendiente." },
  { id: "p2", text: "Cuando el plan empieza mal, alguien tiene que decir «hay que ponerse las pilas». Si el equipo «no da pie con bola», no sirve buscar culpables de inmediato. Primero toca «sacar el buey de la barranca»: ver qué sigue, qué se puede salvar y qué decisión evita que todo se caiga.", translation: "When the plan starts badly, someone has to say hay que ponerse las pilas. If the team no da pie con bola, it is not useful to look for blame immediately. First you need to sacar el buey de la barranca: see what is next, what can be saved, and what decision keeps everything from collapsing.", highlights: highlights(["ponerse las pilas", "no dar pie con bola", "sacar el buey de la barranca"]), shadowLine: "Hay que sacar el buey de la barranca." },
  { id: "p3", text: "También hay momentos en que la cosa «se pone color de hormiga». Esa frase no significa que todo esté perdido; significa que el riesgo ya se siente real. Por eso puedes marcar límites con «no es mi boleto» y aun así ofrecer ayuda «de volada». El tono decide si suena solidario o cortante.", translation: "There are also moments when things se ponen color de hormiga. That phrase does not mean everything is lost; it means the risk already feels real. That is why you can set limits with no es mi boleto and still offer help de volada. The tone decides whether it sounds supportive or harsh.", highlights: highlights(["ponerse color de hormiga", "no es mi boleto", "de volada"]), shadowLine: "No es mi boleto, pero te ayudo de volada." },
  { id: "p4", text: "«Estar al pie del cañón» comunica presencia. Es más fuerte que decir simplemente que estás disponible. Si algo «me trae de cabeza», agradezco que alguien se quede conmigo y diga «ahí te encargo» solo cuando de verdad confía en que puedo resolver esa parte.", translation: "Estar al pie del cañón communicates presence. It is stronger than simply saying you are available. If something me trae de cabeza, I appreciate when someone stays with me and says ahí te encargo only when they truly trust I can handle that part.", highlights: highlights(["estar al pie del cañón", "me trae de cabeza", "ahí te encargo"]), shadowLine: "Sigo al pie del cañón, aunque esto me trae de cabeza." },
  { id: "p5", text: "Hay decisiones que «se me hacen gachas» porque afectan a otros. En vez de exagerar, un mexicano puede decir «no le busques tres pies al gato» para cortar vueltas innecesarias. Y si quiere sonar firme, puede rematar con «me cae que no hay bronca» cuando la solución sí es manejable.", translation: "There are decisions that se me hacen gachas because they affect others. Instead of exaggerating, a Mexican can say no le busques tres pies al gato to cut unnecessary overthinking. And if they want to sound firm, they can finish with me cae que no hay bronca when the solution is manageable.", highlights: highlights(["se me hace gacho", "no le busques tres pies al gato", "me cae que…", "no hay bronca"]), shadowLine: "No le busques tres pies al gato; no hay bronca." },
  { id: "p6", text: "«Ni modo» no siempre es rendición. Muchas veces es aceptar lo que ya no puedes cambiar para empezar a «hacerle la lucha». Esa combinación es muy mexicana: reconocer el golpe, respirar y buscar cómo «salir del atolladero» sin convertir cada obstáculo en tragedia.", translation: "Ni modo is not always surrender. Often it is accepting what you can no longer change so you can start hacerle la lucha. That combination is very Mexican: acknowledge the hit, breathe, and look for how to salir del atolladero without turning every obstacle into tragedy.", highlights: highlights(["ni modo", "hacerle la lucha", "salir del atolladero"]), shadowLine: "Ni modo, hay que hacerle la lucha." },
  { id: "p7", text: "Cuando aparece una ayuda inesperada, dices «nos cayó del cielo». Pero cuidado: si algo cambia «de buenas a primeras» o «a la mera hora», todavía «no está para echar campanas al vuelo». Hay avance, sí, pero celebrar antes de cerrar todo puede hacerte perder foco.", translation: "When unexpected help appears, you say nos cayó del cielo. But careful: if something changes de buenas a primeras or a la mera hora, it is still no está para echar campanas al vuelo. There is progress, yes, but celebrating before everything is closed can make you lose focus.", highlights: highlights(["nos cayó del cielo", "de buenas a primeras", "a la mera hora", "no está para echar campanas al vuelo"]), shadowLine: "Nos cayó del cielo, pero no está para echar campanas al vuelo." },
  { id: "p8", text: "Al final, una conversación completa necesita acción. «Échame la mano» pide apoyo sin hacerlo solemne. «Todavía falta chamba» mantiene los pies en la tierra. Y «se nos complicó» reparte la carga: no culpa a una sola persona, pero tampoco niega que el problema se volvió más grande.", translation: "In the end, a complete conversation needs action. Échame la mano asks for support without making it solemn. Todavía falta chamba keeps feet on the ground. And se nos complicó shares the load: it does not blame one person, but it also does not deny that the problem became bigger.", highlights: highlights(["echar la mano", "todavía falta chamba", "se nos complicó"]), shadowLine: "Échame la mano; todavía falta chamba." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-complete-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Managing pressure and problem-solving in Mexican Spanish", "Ordering food in a Mexican market", "Explaining romantic jealousy", "Telling a childhood story"], correctAnswer: "Managing pressure and problem-solving in Mexican Spanish", explanation: "The reading explains phrases for pressure, responsibility, sudden changes, and practical teamwork.", points: 1, skillTag: "gist" },
  { id: "mexican-c1-complete-reading-q2", type: "multiple-choice", prompt: "According to paragraph 3, what matters when saying no es mi boleto?", options: ["Tone, because it can sound supportive or harsh", "The number of people in the room", "Whether the phrase is written in formal Spanish", "The speaker's age"], correctAnswer: "Tone, because it can sound supportive or harsh", explanation: "The paragraph says the tone decides whether the boundary sounds solidary or cutting.", points: 1, skillTag: "tone" },
  { id: "mexican-c1-complete-reading-q3", type: "true-false", prompt: "True or false: Ni modo always means giving up completely.", options: ["True", "False"], correctAnswer: "False", explanation: "The reading says ni modo can mean accepting what cannot be changed before trying again.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-complete-reading-q4", type: "multiple-choice", prompt: "Which phrase asks for help in an informal Mexican way?", options: ["Échame la mano", "No está para echar campanas al vuelo", "A la mera hora", "No dar pie con bola"], correctAnswer: "Échame la mano", explanation: "Échame la mano means lend me a hand or help me out.", points: 1, skillTag: "vocab" },
  { id: "mexican-c1-complete-reading-q5", type: "multiple-choice", prompt: "Why is se nos complicó useful?", options: ["It shares responsibility without blaming one person", "It says the plan was easy", "It means one person caused everything", "It celebrates the final success"], correctAnswer: "It shares responsibility without blaming one person", explanation: "The reading says it distributes the burden while admitting the problem grew.", points: 1, skillTag: "nuance" },
];

export const mexicanSpanishC1CompleteLocalConversationReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C1 Reading: Solving It Without Panicking",
  subtitle: "A synced audio reading on Mexican phrases for pressure, sudden problems, boundaries, and practical help.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "reading", "shadowing", "problem-solving"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: conversationVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "mexican-c1-complete-quiz-q1", type: "multiple-choice", prompt: "Your friend says they have been running around all morning under pressure. Which phrase fits best?", options: ["Ando en friega", "No hay bronca", "Nos cayó del cielo", "A la mera hora"], correctAnswer: "Ando en friega", explanation: "Ando en friega means I’m insanely busy or under pressure.", points: 1, skillTag: "vocab" },
  { id: "mexican-c1-complete-quiz-q2", type: "fill-blank", prompt: "Complete the Mexican phrase: Hay que ponernos las ___ antes de que llegue el cliente.", correctAnswer: "pilas", explanation: "Ponerse las pilas means to get moving or focus.", points: 1, skillTag: "phrase" },
  { id: "mexican-c1-complete-quiz-q3", type: "multiple-choice", prompt: "Which phrase means a situation is starting to look serious or ugly?", options: ["Se pone color de hormiga", "Se nos cayó del cielo", "No es mi boleto", "Me cae que"], correctAnswer: "Se pone color de hormiga", explanation: "Ponerse color de hormiga describes a situation becoming difficult or risky.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-complete-quiz-q4", type: "true-false", prompt: "True or false: No es mi boleto can set a responsibility boundary.", options: ["True", "False"], correctAnswer: "True", explanation: "It means something is not your responsibility, though tone matters.", points: 1, skillTag: "boundary" },
  { id: "mexican-c1-complete-quiz-q5", type: "order-words", prompt: "Order the words into a natural phrase meaning: Don't overcomplicate it.", wordBank: ["no", "le", "busques", "tres", "pies", "al", "gato"], correctAnswer: "no le busques tres pies al gato", explanation: "No le busques tres pies al gato is the fixed idiom.", points: 1, skillTag: "syntax" },
  { id: "mexican-c1-complete-quiz-q6", type: "multiple-choice", prompt: "A new contact appears exactly when your plan is falling apart. What do you say?", options: ["Nos cayó del cielo", "No dimos pie con bola", "Todavía falta chamba", "Se me hace gacho"], correctAnswer: "Nos cayó del cielo", explanation: "Nos cayó del cielo means it came at the perfect time.", points: 1, skillTag: "context" },
  { id: "mexican-c1-complete-quiz-q7", type: "fill-blank", prompt: "Complete: Todavía falta ___, así que no celebremos todavía.", correctAnswer: "chamba", explanation: "Todavía falta chamba means there is still work to do.", points: 1, skillTag: "vocab" },
  { id: "mexican-c1-complete-quiz-q8", type: "true-false", prompt: "True or false: No está para echar campanas al vuelo means the final result is already guaranteed.", options: ["True", "False"], correctAnswer: "False", explanation: "It means it is too early to celebrate.", points: 1, skillTag: "meaning" },
  { id: "mexican-c1-complete-quiz-q9", type: "multiple-choice", prompt: "Which phrase means to stay reliable and present under pressure?", options: ["Estar al pie del cañón", "Salir del atolladero", "No dar pie con bola", "De buenas a primeras"], correctAnswer: "Estar al pie del cañón", explanation: "Estar al pie del cañón means being fully committed and present.", points: 1, skillTag: "vocab" },
  { id: "mexican-c1-complete-quiz-q10", type: "order-words", prompt: "Order the words into a phrase meaning: Things got complicated for us.", wordBank: ["se", "nos", "complicó"], correctAnswer: "se nos complicó", explanation: "Se nos complicó is a natural way to say things got complicated for us.", points: 1, skillTag: "syntax" },
  { id: "mexican-c1-complete-quiz-q11", type: "match-pairs", prompt: "Match each phrase to its meaning.", pairs: [{ left: "de volada", right: "right away" }, { left: "ni modo", right: "oh well" }, { left: "a la mera hora", right: "at the last minute" }, { left: "echar la mano", right: "to help out" }], explanation: "These phrases cover speed, acceptance, timing, and help.", points: 4, skillTag: "matching" },
  { id: "mexican-c1-complete-quiz-q12", type: "match-pairs", prompt: "Match each problem-solving phrase.", pairs: [{ left: "sacar el buey de la barranca", right: "rescue a difficult situation" }, { left: "salir del atolladero", right: "get out of a jam" }, { left: "no dar pie con bola", right: "make no progress" }, { left: "hacerle la lucha", right: "keep trying" }], explanation: "These expressions describe a messy situation and the effort to fix it.", points: 4, skillTag: "problem-solving" },
  { id: "mexican-c1-complete-quiz-q13", type: "match-pairs", prompt: "Match each nuance phrase.", pairs: [{ left: "se me hace gacho", right: "it seems unfair or harsh" }, { left: "me trae de cabeza", right: "it is driving me crazy" }, { left: "ahí te encargo", right: "please take care of that" }, { left: "me cae que…", right: "I swear / I really think that" }], explanation: "These phrases add personal stance, frustration, delegation, and emphasis.", points: 4, skillTag: "nuance" },
];

export const mexicanSpanishC1CompleteLocalConversationQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican C1 Quiz: Complete Local Conversation",
  subtitle: "Check whether you can choose the right Mexican phrase for pressure, responsibility, sudden changes, and practical repair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c1", "quiz", "local-conversation", "idioms"],
  estimatedMinutes: 12,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Choose, complete, order, and match Mexican C1 expressions used in realistic problem-solving conversations.",
    passScore: 80,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
