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

const courseId = "argentinian-spanish-b1-plans-invitations";
const sectionName = "Argentinian Spanish - B1 Plans and Invitations";

const plansVocab: VocabItem[] = [
  { id: "te-pinta", term: "¿Te pinta...?", meaning: "Do you feel like…?", note: "Very natural informal Argentine invitation opener.", example: "¿Te pinta hacer algo este finde?", translation: "Do you feel like doing something this weekend?" },
  { id: "hacer-algo", term: "hacer algo", meaning: "do something", note: "A flexible phrase when the activity is not decided yet.", example: "Podemos hacer algo mañana.", translation: "We can do something tomorrow." },
  { id: "este-finde", term: "este finde", meaning: "this weekend", note: "Finde is the common informal shortening of fin de semana.", example: "¿Tenés planes este finde?", translation: "Do you have plans this weekend?" },
  { id: "tomar-algo", term: "tomar algo", meaning: "go for a drink / have something", matchingMeaning: "go for a drink", note: "Can mean having coffee, a soft drink, or an alcoholic drink depending on context.", example: "¿Te pinta tomar algo?", translation: "Do you feel like going for a drink?" },
  { id: "tenes-planes", term: "¿Tenés planes?", meaning: "Do you have plans?", note: "Uses Argentine voseo: tenés instead of tienes.", example: "Che, ¿tenés planes mañana?", translation: "Hey, do you have plans tomorrow?" },
  { id: "dale", term: "Dale", meaning: "Sure / sounds good / okay", matchingMeaning: "sounds good", note: "Extremely common Argentine agreement word; tone changes the nuance.", example: "Dale, nos vemos mañana.", translation: "Sounds good, we’ll meet tomorrow." },
  { id: "me-copa", term: "Me copa", meaning: "I like it / I’m into it", matchingMeaning: "I’m into it", note: "Informal Argentine way to show enthusiasm for an idea.", example: "Ese plan me copa.", translation: "I’m into that plan." },
  { id: "de-una", term: "De una", meaning: "Definitely / absolutely / I’m in", matchingMeaning: "I’m in", note: "A strong, enthusiastic acceptance.", example: "¿Vamos? De una.", translation: "Shall we go? Definitely." },
  { id: "a-que-hora", term: "¿A qué hora?", meaning: "What time?", note: "Short time question when the plan is already clear.", example: "Dale. ¿A qué hora?", translation: "Sounds good. What time?" },
  { id: "hora-nos-vemos", term: "¿A qué hora nos vemos?", meaning: "What time shall we meet?", note: "A complete question for arranging the meeting time.", example: "¿A qué hora nos vemos mañana?", translation: "What time shall we meet tomorrow?" },
  { id: "nos-vemos", term: "Nos vemos", meaning: "We’ll meet / see each other", note: "Can confirm a meeting or serve as a casual goodbye.", example: "Nos vemos en el centro.", translation: "We’ll meet downtown." },
  { id: "tipo-ocho", term: "tipo ocho", meaning: "around eight", note: "Tipo before a time means approximately or around.", example: "Nos vemos tipo ocho.", translation: "We’ll meet around eight." },
  { id: "hoy-complica", term: "Hoy se me complica", meaning: "Today is difficult for me / I can’t really today", matchingMeaning: "I can’t really today", note: "A soft, natural way to say today does not work.", example: "Hoy se me complica, perdón.", translation: "I can’t really today, sorry." },
  { id: "ya-planes", term: "Ya tengo planes", meaning: "I already have plans", note: "A clear but neutral reason for declining.", example: "Hoy ya tengo planes.", translation: "I already have plans today." },
  { id: "mejor-otro-dia", term: "Mejor otro día", meaning: "Better another day", note: "Suggests postponing without rejecting the person.", example: "Hoy no puedo; mejor otro día.", translation: "I can’t today; better another day." },
  { id: "te-va-manana", term: "¿Te va mañana?", meaning: "Does tomorrow work for you?", note: "Te va asks whether a time or plan suits the other person.", example: "Mejor otro día. ¿Te va mañana?", translation: "Better another day. Does tomorrow work for you?" },
  { id: "si-queres", term: "Si querés", meaning: "If you want", note: "Argentine voseo form of si quieres.", example: "Podemos ir mañana, si querés.", translation: "We can go tomorrow, if you want." },
  { id: "me-encantaria", term: "Me encantaría, pero…", meaning: "I’d love to, but…", note: "A warm way to soften a refusal before giving the reason.", example: "Me encantaría, pero hoy trabajo.", translation: "I’d love to, but I work today." },
  { id: "podemos-ir", term: "Podemos ir a…", meaning: "We can go to…", note: "Use it to suggest a destination.", example: "Podemos ir a un bar nuevo.", translation: "We can go to a new bar." },
  { id: "tranqui", term: "tranqui", meaning: "relaxed / chill / no worries", matchingMeaning: "chill", note: "Informal shortening of tranquilo/tranquila; the meaning depends on context.", example: "Busquemos algo tranqui.", translation: "Let’s find something chill." },
  { id: "lugar-tranqui", term: "algún lugar tranqui", meaning: "somewhere chill", note: "A useful suggestion when you want a relaxed venue.", example: "Podemos ir a algún lugar tranqui.", translation: "We can go somewhere chill." },
  { id: "te-aviso", term: "Te aviso", meaning: "I’ll let you know", note: "Promises an update without fixing a time yet.", example: "Te aviso cuando salga.", translation: "I’ll let you know when I leave." },
  { id: "aviso-mas-tarde", term: "Te aviso más tarde", meaning: "I’ll let you know later", note: "Useful when you need time before confirming.", example: "No sé todavía; te aviso más tarde.", translation: "I don’t know yet; I’ll let you know later." },
  { id: "sobre-marcha", term: "Vemos sobre la marcha", meaning: "We’ll decide as we go", note: "Keeps the details flexible until the plan is happening.", example: "Nos encontramos y vemos sobre la marcha.", translation: "We’ll meet and decide as we go." },
  { id: "que-pinta", term: "¿Qué pinta?", meaning: "What’s the plan? / What are you thinking?", matchingMeaning: "What’s the plan?", note: "Informal Argentine question asking what is happening or what people feel like doing.", example: "Che, ¿qué pinta para esta noche?", translation: "Hey, what’s the plan for tonight?" },
  { id: "por-ahora-no", term: "Por ahora no", meaning: "Not for now / not at the moment", matchingMeaning: "not at the moment", note: "Leaves open the possibility that the answer may change.", example: "¿Tenés planes? Por ahora no.", translation: "Do you have plans? Not at the moment." },
  { id: "manana-me-va", term: "mañana me va", meaning: "tomorrow works for me", note: "Natural confirmation that tomorrow suits you.", example: "Sí, mañana me va.", translation: "Yes, tomorrow works for me." },
  { id: "a-la-tarde", term: "a la tarde", meaning: "in the afternoon", note: "Common Argentine usage; elsewhere speakers may prefer por la tarde.", example: "Nos vemos mañana a la tarde.", translation: "We’ll meet tomorrow afternoon." },
  { id: "che", term: "Che", meaning: "hey / mate / used to get someone’s attention", matchingMeaning: "hey", note: "Iconic Argentine attention-getter used naturally with friends.", example: "Che, ¿tenés planes?", translation: "Hey, do you have plans?" },
];

const highlightMap = Object.fromEntries(plansVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

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
    difficulty: "medium",
    notes: item.note,
    starred: true,
  };
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

const sentenceVocab = plansVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB1PlansInvitationsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Argentinian Spanish B1: Plans and Invitations Flashcards",
  subtitle: "Natural voseo phrases for suggesting plans, accepting warmly, declining softly, and arranging another time.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Argentinian Spanish", "B1", "flashcards", "plans", "invitations"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { cards: plansVocab.map(cardFromVocab) },
};

export const argentinianSpanishB1PlansInvitationsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Make Plans in Argentinian Spanish",
  subtitle: "Build invitations, enthusiastic answers, soft refusals, alternative plans, and flexible confirmations.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["argentinian-spanish", "b1", "sentence-builder", "plans", "invitations"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Invite a friend out this weekend, react to a soft refusal, suggest tomorrow afternoon, agree on an approximate time, and leave one detail flexible.",
    stages: [
      stage("stage-1", "Open the invitation", sentenceVocab.slice(0, 5), sentenceVocab.slice(0, 5), "Hey, do you feel like doing something this weekend?", "Che, ¿te pinta hacer algo este finde?", "Che gets attention naturally, while ¿te pinta...? makes the invitation friendly and informal.", breakdown([["Hey", "Che"], ["do you feel like", "¿te pinta...?"], ["doing something", "hacer algo"], ["this weekend", "este finde"]])),
      stage("stage-2", "Ask about availability", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "Do you have plans? Do you feel like going for a drink?", "¿Tenés planes? ¿Te pinta tomar algo?", "Tenés is the Argentine voseo form. Tomar algo leaves the exact drink open.", breakdown([["Do you have plans?", "¿Tenés planes?"], ["Do you feel like...?", "¿Te pinta...?"], ["going for a drink", "tomar algo"]])),
      stage("stage-3", "Accept enthusiastically", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "Definitely. I’m into it. Sounds good.", "De una. Me copa. Dale.", "These three answers accept the invitation, but De una is the strongest and most enthusiastic.", breakdown([["Definitely / I’m in", "De una"], ["I’m into it", "Me copa"], ["Sounds good", "Dale"]])),
      stage("stage-4", "Choose a relaxed plan", sentenceVocab.slice(18, 21), sentenceVocab.slice(0, 21), "We can go somewhere chill, if you want.", "Podemos ir a algún lugar tranqui, si querés.", "Si querés is the voseo form and keeps the suggestion low-pressure.", breakdown([["We can go to", "Podemos ir a"], ["somewhere chill", "algún lugar tranqui"], ["if you want", "si querés"]])),
      stage("stage-5", "Arrange the time", sentenceVocab.slice(8, 12), sentenceVocab.slice(0, 21), "What time shall we meet? We’ll meet around eight.", "¿A qué hora nos vemos? Nos vemos tipo ocho.", "Tipo before a time means around or approximately.", breakdown([["What time", "¿A qué hora...?"], ["shall we meet", "nos vemos"], ["around eight", "tipo ocho"]])),
      stage("stage-6", "Decline without sounding cold", sentenceVocab.slice(12, 18), sentenceVocab.slice(0, 21), "I’d love to, but today is difficult for me. I already have plans. Better another day.", "Me encantaría, pero hoy se me complica. Ya tengo planes. Mejor otro día.", "This sequence shows interest, gives a reason, and keeps the relationship warm by suggesting another day.", breakdown([["I’d love to, but", "Me encantaría, pero"], ["today is difficult for me", "hoy se me complica"], ["I already have plans", "ya tengo planes"], ["better another day", "mejor otro día"]])),
      stage("stage-7", "Offer another time", sentenceVocab.slice(15, 18), sentenceVocab.slice(26, 28), "Does tomorrow work for you? Tomorrow afternoon works for me.", "¿Te va mañana? Mañana me va, a la tarde.", "Te va asks whether tomorrow suits the other person; me va confirms that it suits you.", breakdown([["Does tomorrow work for you?", "¿Te va mañana?"], ["tomorrow works for me", "Mañana me va"], ["in the afternoon", "a la tarde"]])),
      stage("stage-8", "Keep the plan flexible", sentenceVocab.slice(21, 26), sentenceVocab, "Not at the moment. I’ll let you know later, and we’ll decide as we go.", "Por ahora no. Te aviso más tarde y vemos sobre la marcha.", "This is useful when you are interested but cannot confirm every detail yet.", breakdown([["Not at the moment", "Por ahora no"], ["I’ll let you know later", "Te aviso más tarde"], ["we’ll decide as we go", "vemos sobre la marcha"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "arg-plans-story-q1", type: "multiple-choice", prompt: "What does Lucía invite Nico to do?", options: ["Do something this weekend", "Study on Monday", "Take a morning train", "Buy a new phone"], correctAnswer: "Do something this weekend", explanation: "She asks: ¿Te pinta hacer algo este finde?", points: 1, skillTag: "invitation" },
  { id: "arg-plans-story-q2", type: "multiple-choice", prompt: "How does Nico react to the rooftop film idea?", options: ["He is enthusiastic", "He refuses immediately", "He does not understand", "He changes the subject"], correctAnswer: "He is enthusiastic", explanation: "He says De una and Me copa.", points: 1, skillTag: "acceptance" },
  { id: "arg-plans-story-q3", type: "true-false", prompt: "True or false: The original plan is for Friday night.", options: ["True", "False"], correctAnswer: "True", explanation: "Lucía suggests Friday and Nico asks what time they will meet.", points: 1, skillTag: "time" },
  { id: "arg-plans-story-q4", type: "multiple-choice", prompt: "Why can’t Lucía meet on Friday?", options: ["She already has family plans", "She is leaving the country", "She dislikes the film", "She has no money"], correctAnswer: "She already has family plans", explanation: "She says hoy se me complica and ya tengo planes con mi familia.", points: 1, skillTag: "soft-refusal" },
  { id: "arg-plans-story-q5", type: "multiple-choice", prompt: "Which alternative day does Lucía suggest?", options: ["Saturday", "Monday", "Thursday", "Next month"], correctAnswer: "Saturday", explanation: "She asks ¿Te va mañana? and clarifies Saturday afternoon.", points: 1, skillTag: "rescheduling" },
  { id: "arg-plans-story-q6", type: "true-false", prompt: "True or false: Saturday afternoon works for Nico.", options: ["True", "False"], correctAnswer: "True", explanation: "Nico says Mañana me va, a la tarde.", points: 1, skillTag: "availability" },
  { id: "arg-plans-story-q7", type: "multiple-choice", prompt: "What kind of place do they want before the film?", options: ["Somewhere chill", "A formal restaurant", "A crowded nightclub", "A shopping centre"], correctAnswer: "Somewhere chill", explanation: "They agree on algún lugar tranqui.", points: 1, skillTag: "venue" },
  { id: "arg-plans-story-q8", type: "multiple-choice", prompt: "What time do they tentatively choose?", options: ["Around eight", "Exactly noon", "Six in the morning", "After midnight"], correctAnswer: "Around eight", explanation: "Nico suggests tipo ocho.", points: 1, skillTag: "time" },
  { id: "arg-plans-story-q9", type: "multiple-choice", prompt: "What detail remains flexible?", options: ["The exact café", "The day", "Whether Nico is coming", "The city"], correctAnswer: "The exact café", explanation: "Lucía will send options later and they will decide as they go.", points: 1, skillTag: "flexibility" },
  { id: "arg-plans-story-q10", type: "multiple-choice", prompt: "What is the final plan?", options: ["Meet Saturday around eight, have something somewhere chill, then watch the film", "Cancel everything", "Meet Friday at noon", "Only exchange messages"], correctAnswer: "Meet Saturday around eight, have something somewhere chill, then watch the film", explanation: "The last messages confirm Saturday, around eight, a relaxed place, and the rooftop film.", points: 1, skillTag: "sequence" },
];

export const argentinianSpanishB1PlansInvitationsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Argentinian B1 Story: The Rooftop Plan",
  subtitle: "Lucía and Nico turn a failed Friday invitation into a relaxed Saturday plan without making the refusal awkward.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Argentinian Spanish", "B1", "WhatsApp", "plans", "invitations"],
  estimatedMinutes: 17,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "lucia", name: "Lucía", initials: "L", side: "left", color: "violet" },
      { id: "nico", name: "Nico", initials: "N", side: "right", color: "blue" },
    ],
    messages: [
      message("m1", "lucia", "Che, ¿tenés planes este finde?", "Hey, do you have plans this weekend?", ["Che", "¿Tenés planes?", "este finde"]),
      message("m2", "nico", "Por ahora no. ¿Qué pinta?", "Not at the moment. What’s the plan?", ["Por ahora no", "¿Qué pinta?"]),
      message("m3", "lucia", "¿Te pinta hacer algo? Dan una película en una terraza.", "Do you feel like doing something? They’re showing a film on a rooftop.", ["¿Te pinta...?", "hacer algo"], "voice-note"),
      message("m4", "nico", "De una. Ese plan me copa.", "Definitely. I’m into that plan.", ["De una", "Me copa"]),
      message("m5", "lucia", "También podemos tomar algo antes.", "We can also go for a drink beforehand.", ["tomar algo"]),
      message("m6", "nico", "Dale. ¿A qué hora nos vemos?", "Sounds good. What time shall we meet?", ["Dale", "¿A qué hora nos vemos?"], "voice-note"),
      message("m7", "lucia", "La película es el viernes a la noche.", "The film is on Friday night.", []),
      message("m8", "nico", "Podemos encontrarnos tipo ocho.", "We can meet around eight.", ["tipo ocho"]),
      message("m9", "lucia", "Pará... recién me acordé de algo.", "Wait... I just remembered something.", []),
      message("m10", "nico", "¿Qué pasó?", "What happened?", []),
      message("m11", "lucia", "Hoy se me complica. Ya tengo planes con mi familia.", "Today is difficult for me. I already have plans with my family.", ["Hoy se me complica", "Ya tengo planes"]),
      message("m12", "lucia", "Me encantaría, pero el viernes no llego. Mejor otro día.", "I’d love to, but I can’t make it on Friday. Better another day.", ["Me encantaría, pero…", "Mejor otro día"], "voice-note"),
      message("m13", "nico", "Tranqui, no pasa nada.", "No worries, it’s fine.", ["tranqui"]),
      message("m14", "nico", "¿Te va mañana? También la pasan el sábado.", "Does tomorrow work for you? They’re showing it on Saturday too.", ["¿Te va mañana?"]),
      message("m15", "lucia", "Sí, el sábado puede ser. ¿A la tarde?", "Yes, Saturday could work. In the afternoon?", ["a la tarde"]),
      message("m16", "nico", "Mañana me va, a la tarde o a la noche.", "Tomorrow works for me, in the afternoon or at night.", ["mañana me va", "a la tarde"]),
      message("m17", "lucia", "Buenísimo. Podemos ir a tomar algo primero.", "Great. We can go for a drink first.", ["Podemos ir a…", "tomar algo"]),
      message("m18", "nico", "Sí, algún lugar tranqui, si querés.", "Yes, somewhere chill, if you want.", ["algún lugar tranqui", "Si querés"], "voice-note"),
      message("m19", "lucia", "Me copa. Cerca de la terraza hay varios cafés.", "I’m into it. There are several cafés near the rooftop.", ["Me copa"]),
      message("m20", "nico", "¿A qué hora?", "What time?", ["¿A qué hora?"]),
      message("m21", "lucia", "Nos vemos tipo ocho, ¿te parece?", "We’ll meet around eight, does that work?", ["Nos vemos", "tipo ocho"]),
      message("m22", "nico", "Dale. ¿Ya sabés a qué café vamos?", "Sounds good. Do you already know which café we’re going to?", ["Dale"]),
      message("m23", "lucia", "Por ahora no. Estoy mirando dos opciones.", "Not at the moment. I’m looking at two options.", ["Por ahora no"]),
      message("m24", "lucia", "Te aviso más tarde y vemos sobre la marcha.", "I’ll let you know later and we’ll decide as we go.", ["Te aviso más tarde", "Vemos sobre la marcha"], "voice-note"),
      message("m25", "nico", "Perfecto. Si querés, elegimos cuando lleguemos.", "Perfect. If you want, we’ll choose when we arrive.", ["Si querés"]),
      message("m26", "lucia", "Sí. Quiero algo tranqui, no un lugar lleno.", "Yes. I want something chill, not a packed place.", ["tranqui"]),
      message("m27", "nico", "Entonces ya está: sábado, tipo ocho.", "Then it’s settled: Saturday, around eight.", ["tipo ocho"]),
      message("m28", "lucia", "Dale. Te aviso cuál de los dos cafés parece mejor.", "Sounds good. I’ll let you know which of the two cafés looks better.", ["Dale", "Te aviso"]),
      message("m29", "nico", "De una. Nos vemos mañana.", "Definitely. See you tomorrow.", ["De una", "Nos vemos"]),
      message("m30", "lucia", "Nos vemos. Café tranqui y después la película.", "See you. A chill café and then the film.", ["Nos vemos", "tranqui"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `arg-plans-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: plansVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["¿Te pinta...?", "¿Tenés planes?", "De una", "Hoy se me complica", "¿Te va mañana?", "Vemos sobre la marcha"],
      grammarPatterns: ["Voseo: tenés / querés", "Invitation: ¿Te pinta + infinitive...?", "Soft refusal + alternative: Hoy se me complica. ¿Te va mañana?"],
      speakingPrompts: ["Invite a friend to do something this weekend.", "Accept a plan enthusiastically.", "Decline today softly and suggest tomorrow.", "Agree on an approximate time and keep the venue flexible."],
    },
    completionTask: { title: "Make and adjust a plan", instructions: "Record 60 seconds in Argentinian Spanish: invite a friend, respond to a scheduling problem, suggest another day, choose an approximate time, and leave one detail open." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Argentina, una invitación informal puede empezar con «Che, ¿tenés planes este finde?» o «¿Te pinta hacer algo?». Estas preguntas suenan cercanas y naturales entre amigos.", translation: "In Argentina, an informal invitation can begin with ‘Hey, do you have plans this weekend?’ or ‘Do you feel like doing something?’. These questions sound friendly and natural between friends.", highlights: highlights(["Che", "¿Tenés planes?", "este finde", "¿Te pinta...?", "hacer algo"]), shadowLine: "Che, ¿te pinta hacer algo este finde?" },
  { id: "p2", text: "Si todavía no hay una actividad concreta, alguien puede preguntar «¿Qué pinta?». La respuesta puede proponer «tomar algo» o decir «Podemos ir a algún lugar tranqui».", translation: "If there is no specific activity yet, someone can ask ‘What’s the plan?’. The answer can suggest going for a drink or going somewhere chill.", highlights: highlights(["¿Qué pinta?", "tomar algo", "Podemos ir a…", "algún lugar tranqui"]), shadowLine: "¿Qué pinta? Podemos ir a algún lugar tranqui." },
  { id: "p3", text: "Para aceptar con entusiasmo, «De una» es más fuerte que un simple «Dale». «Me copa» muestra que la idea realmente te gusta, no solo que estás disponible.", translation: "To accept enthusiastically, ‘De una’ is stronger than a simple ‘Dale’. ‘Me copa’ shows that you genuinely like the idea, not only that you are available.", highlights: highlights(["De una", "Dale", "Me copa"]), shadowLine: "De una. Me copa. Dale." },
  { id: "p4", text: "Después de aceptar, hay que concretar. «¿A qué hora nos vemos?» pide una hora, y «Nos vemos tipo ocho» propone aproximadamente las ocho, no necesariamente las ocho en punto.", translation: "After accepting, the details need to be arranged. ‘What time shall we meet?’ asks for a time, and ‘We’ll meet around eight’ suggests approximately eight, not necessarily exactly eight.", highlights: highlights(["¿A qué hora nos vemos?", "Nos vemos", "tipo ocho"]), shadowLine: "¿A qué hora nos vemos? Nos vemos tipo ocho." },
  { id: "p5", text: "A veces una persona quiere aceptar, pero no puede. «Me encantaría, pero hoy se me complica» demuestra interés antes de explicar el problema. «Ya tengo planes» da una razón clara.", translation: "Sometimes a person wants to accept but cannot. ‘I’d love to, but today is difficult for me’ shows interest before explaining the problem. ‘I already have plans’ gives a clear reason.", highlights: highlights(["Me encantaría, pero…", "Hoy se me complica", "Ya tengo planes"]), shadowLine: "Me encantaría, pero hoy se me complica." },
  { id: "p6", text: "Una negativa suena menos fría si ofrece otra posibilidad: «Mejor otro día. ¿Te va mañana?». La otra persona puede confirmar: «Sí, mañana me va, a la tarde».", translation: "A refusal sounds less cold if it offers another possibility: ‘Better another day. Does tomorrow work for you?’. The other person can confirm: ‘Yes, tomorrow afternoon works for me.’", highlights: highlights(["Mejor otro día", "¿Te va mañana?", "mañana me va", "a la tarde"]), shadowLine: "Mejor otro día. ¿Te va mañana?" },
  { id: "p7", text: "No siempre hace falta decidir todo inmediatamente. «Te aviso más tarde» promete una actualización, mientras que «Vemos sobre la marcha» deja algunos detalles para el momento.", translation: "It is not always necessary to decide everything immediately. ‘I’ll let you know later’ promises an update, while ‘We’ll decide as we go’ leaves some details until the moment.", highlights: highlights(["Te aviso más tarde", "Vemos sobre la marcha"]), shadowLine: "Te aviso más tarde y vemos sobre la marcha." },
  { id: "p8", text: "Un plan natural puede quedar así: «Che, ¿te pinta tomar algo mañana a la tarde?». «De una. Nos vemos tipo ocho». El tono es informal, flexible y claro.", translation: "A natural plan can end up like this: ‘Hey, do you feel like going for a drink tomorrow afternoon?’. ‘Definitely. We’ll meet around eight.’ The tone is informal, flexible, and clear.", highlights: highlights(["Che", "¿Te pinta...?", "tomar algo", "a la tarde", "De una", "Nos vemos", "tipo ocho"]), shadowLine: "De una. Nos vemos tipo ocho." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "arg-plans-reading-q1", type: "multiple-choice", prompt: "Which phrase is a natural Argentine invitation opener?", options: ["¿Te pinta hacer algo?", "Pague aquí", "¿Por dónde pasa?", "No me alcanza"], correctAnswer: "¿Te pinta hacer algo?", explanation: "¿Te pinta...? asks whether the other person feels like doing something.", points: 1, skillTag: "invitation" },
  { id: "arg-plans-reading-q2", type: "multiple-choice", prompt: "Which response shows the strongest enthusiasm?", options: ["De una", "Por ahora no", "Te aviso", "Mejor otro día"], correctAnswer: "De una", explanation: "De una communicates a strong, immediate yes.", points: 1, skillTag: "acceptance" },
  { id: "arg-plans-reading-q3", type: "true-false", prompt: "True or false: ‘tipo ocho’ means exactly eight o’clock.", options: ["True", "False"], correctAnswer: "False", explanation: "Tipo ocho means around eight.", points: 1, skillTag: "time" },
  { id: "arg-plans-reading-q4", type: "multiple-choice", prompt: "Why is ‘Me encantaría, pero…’ useful?", options: ["It shows interest before a refusal", "It demands an immediate answer", "It cancels all future plans", "It gives an exact location"], correctAnswer: "It shows interest before a refusal", explanation: "It softens the refusal by showing that the invitation is appreciated.", points: 1, skillTag: "pragmatics" },
  { id: "arg-plans-reading-q5", type: "multiple-choice", prompt: "What does ‘Vemos sobre la marcha’ do?", options: ["Leaves details flexible", "Confirms an exact booking", "Rejects the invitation", "Changes the language"], correctAnswer: "Leaves details flexible", explanation: "It means the people will decide as the situation develops.", points: 1, skillTag: "flexibility" },
];

export const argentinianSpanishB1PlansInvitationsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Argentinian B1 Reading: From Invitation to Real Plan",
  subtitle: "Follow a fully Spanish guide to inviting, accepting, declining warmly, rescheduling, and keeping details flexible.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Argentinian Spanish", "B1", "reading", "plans", "invitations"],
  estimatedMinutes: 14,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: plansVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "Match each Argentinian expression with its natural English meaning.", points: items.length, skillTag: "matching" };
}

export const argentinianSpanishB1PlansInvitationsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Argentinian B1 Final Quiz: Plans and Invitations",
  subtitle: "Choose the most natural expression for new invitations, scheduling problems, alternatives, and flexible plans.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Argentinian Spanish", "B1", "quiz", "plans", "invitations"],
  estimatedMinutes: 14,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "This quiz tests the phrases in fresh situations rather than asking you to remember the rooftop story.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "arg-plans-quiz-1", type: "multiple-choice", prompt: "You want to casually invite a friend out. Which opener sounds most Argentinian?", options: ["¿Te pinta tomar algo?", "Usted debe venir", "Quiero que confirmes", "¿Cuál es el precio?"], correctAnswer: "¿Te pinta tomar algo?", explanation: "¿Te pinta...? is a friendly, low-pressure invitation.", points: 1, skillTag: "invitation" },
      { id: "arg-plans-quiz-2", type: "multiple-choice", prompt: "Your friend suggests a plan you genuinely like. What can you say?", options: ["Me copa", "Hoy se me complica", "Por ahora no", "Mejor otro día"], correctAnswer: "Me copa", explanation: "Me copa means you are into the idea.", points: 1, skillTag: "acceptance" },
      { id: "arg-plans-quiz-3", type: "order-words", prompt: "Build the invitation.", nativePrompt: "Do you feel like doing something this weekend?", wordBank: ["¿Te", "pinta", "hacer", "algo", "este", "finde?"], correctAnswer: "¿Te pinta hacer algo este finde?", explanation: "¿Te pinta + infinitive...? forms the invitation.", points: 1, skillTag: "sentence-building" },
      { id: "arg-plans-quiz-4", type: "true-false", prompt: "True or false: ‘De una’ can communicate an enthusiastic yes.", options: ["True", "False"], correctAnswer: "True", explanation: "De una is a strong informal acceptance.", points: 1, skillTag: "acceptance" },
      { id: "arg-plans-quiz-5", type: "multiple-choice", prompt: "You cannot meet today but want to sound warm. Which answer is best?", options: ["Me encantaría, pero hoy se me complica", "No", "No me interesa", "Nunca"], correctAnswer: "Me encantaría, pero hoy se me complica", explanation: "It shows interest before explaining that today does not work.", points: 1, skillTag: "soft-refusal" },
      { id: "arg-plans-quiz-6", type: "fill-blank", prompt: "Complete: ¿Te va ______?", nativePrompt: "Does tomorrow work for you?", correctAnswer: "mañana", explanation: "¿Te va mañana? proposes tomorrow as an alternative.", points: 1, skillTag: "rescheduling" },
      { id: "arg-plans-quiz-7", type: "multiple-choice", prompt: "You want a relaxed venue. Which suggestion fits?", options: ["Podemos ir a algún lugar tranqui", "Ya tengo planes", "¿A qué hora?", "Por ahora no"], correctAnswer: "Podemos ir a algún lugar tranqui", explanation: "Algún lugar tranqui means somewhere relaxed or chill.", points: 1, skillTag: "venue" },
      { id: "arg-plans-quiz-8", type: "multiple-choice", prompt: "You mean approximately eight, not exactly eight. What do you say?", options: ["tipo ocho", "a las ocho exactas", "ocho horas tarde", "por ahora no"], correctAnswer: "tipo ocho", explanation: "Tipo before a time means around.", points: 1, skillTag: "time" },
      { id: "arg-plans-quiz-9", type: "true-false", prompt: "True or false: ‘Te aviso más tarde’ is a final rejection.", options: ["True", "False"], correctAnswer: "False", explanation: "It promises a later update; it does not reject the plan.", points: 1, skillTag: "confirmation" },
      { id: "arg-plans-quiz-10", type: "multiple-choice", prompt: "You prefer not to decide the exact activity yet. Which phrase fits?", options: ["Vemos sobre la marcha", "Ya tengo planes", "¿Tenés planes?", "Me encantaría, pero"], correctAnswer: "Vemos sobre la marcha", explanation: "It means you will decide as the plan develops.", points: 1, skillTag: "flexibility" },
      pairQuestion("arg-plans-quiz-11", "Match the invitation phrases.", [plansVocab[0], plansVocab[3], plansVocab[4], plansVocab[24]]),
      pairQuestion("arg-plans-quiz-12", "Match the acceptance and refusal phrases.", [plansVocab[6], plansVocab[7], plansVocab[12], plansVocab[17]]),
      pairQuestion("arg-plans-quiz-13", "Match the scheduling and flexibility phrases.", [plansVocab[11], plansVocab[15], plansVocab[22], plansVocab[23]]),
    ],
  },
};
