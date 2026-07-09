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

const plansVocab: VocabItem[] = [
  { id: "que-mas", term: "¿Qué más?", meaning: "What’s up? / How’s it going?", matchingMeaning: "What’s up? / How’s it going? (greeting)", note: "Casual Colombian opener before making plans.", example: "¿Qué más? ¿Cuadramos algo?", translation: "What’s up? Shall we arrange something?", starred: true },
  { id: "cuadrar", term: "cuadrar", meaning: "to arrange / sort out / plan", note: "Very useful Colombian planning verb.", example: "Tenemos que cuadrar el parche.", translation: "We need to arrange the hangout.", starred: true },
  { id: "cuadremos-algo", term: "cuadremos algo", meaning: "let’s arrange something", note: "Friendly way to suggest making a plan.", example: "Cuadremos algo para mañana.", translation: "Let’s arrange something for tomorrow.", starred: true },
  { id: "cuadremos-un-parche", term: "cuadremos un parche", meaning: "let’s plan a hangout", note: "Local-sounding way to plan a casual meetup.", example: "Cuadremos un parche tipo siete.", translation: "Let’s plan a hangout around seven.", starred: true },
  { id: "parchar", term: "parchar", meaning: "to hang out / chill", note: "Informal Colombian social verb.", example: "¿Te animas a parchar?", translation: "Are you up for hanging out?", starred: true },
  { id: "parchamos", term: "parchamos", meaning: "let’s hang out / we’ll hang out", note: "Can suggest or confirm the plan.", example: "Parchamos mañana, sin afán.", translation: "We’ll hang out tomorrow, no pressure.", starred: true },
  { id: "el-parche", term: "el parche", meaning: "the hangout / the plan / the group", note: "In Colombia it can mean the plan, group, or hangout vibe.", example: "El parche va a ser tranquilo.", translation: "The hangout is going to be chill.", starred: true },
  { id: "te-animas", term: "¿Te animas?", meaning: "Are you up for it? / Do you feel like it?", note: "Natural invitation question.", example: "¿Te animas mañana?", translation: "Are you up for it tomorrow?", starred: true },
  { id: "te-animas-parchar", term: "¿Te animas a parchar?", meaning: "Are you up for hanging out?", note: "Casual invitation with parchar.", example: "¿Te animas a parchar tipo siete?", translation: "Are you up for hanging out around seven?", starred: true },
  { id: "me-apunto", term: "me apunto", meaning: "I’m in / count me in", note: "Natural way to accept an invitation.", example: "Me apunto al parche.", translation: "I’m in for the hangout.", starred: true },
  { id: "tipo-siete", term: "tipo siete", meaning: "around seven / seven-ish", note: "Tipo + time makes it approximate and casual.", example: "Nos vemos tipo siete.", translation: "See you around seven.", starred: true },
  { id: "cae-a-mi-casa", term: "cae a mi casa", meaning: "come over to my place / swing by my place", note: "Casual invitation; literally, drop by my house.", example: "Cae a mi casa y parchamos.", translation: "Come over to my place and we’ll hang out.", starred: true },
  { id: "cae-casa-siete", term: "cae a mi casa tipo siete", meaning: "come over to my place around seven", note: "Complete casual invitation phrase.", example: "Cae a mi casa tipo siete, sin afán.", translation: "Come over to my place around seven, no rush.", starred: true },
  { id: "por-ahi", term: "por ahí", meaning: "around there / somewhere nearby / roughly", note: "Flexible casual phrase for approximate places or times.", example: "Tipo siete por ahí.", translation: "Around seven-ish.", starred: true },
  { id: "me-suena", term: "me suena", meaning: "sounds good to me / I’m interested", note: "Natural soft acceptance.", example: "Me suena el parche.", translation: "The plan sounds good to me.", starred: true },
  { id: "me-queda-dificil", term: "me queda un poquito difícil", meaning: "it’s a little difficult for me / that’s a bit tricky for me", note: "Soft way to decline or negotiate.", example: "A esa hora me queda un poquito difícil.", translation: "That time is a bit tricky for me.", starred: true },
  { id: "hoy-me-queda-dificil", term: "hoy me queda un poquito difícil", meaning: "today is a bit difficult for me", note: "Polite way to say today does not work.", example: "Hoy me queda un poquito difícil; mejor mañana.", translation: "Today is a bit difficult for me; better tomorrow.", starred: true },
  { id: "me-toca-madrugar", term: "me toca madrugar", meaning: "I have to get up early", note: "Me toca + infinitive means I have to / I’m forced to.", example: "Me toca madrugar, entonces mejor mañana.", translation: "I have to get up early, so better tomorrow.", starred: true },
  { id: "mejor-manana", term: "mejor mañana", meaning: "better tomorrow", note: "Short natural reschedule phrase.", example: "Mejor mañana, si te queda bien.", translation: "Better tomorrow, if that works for you.", starred: true },
  { id: "si-te-queda-bien", term: "si te queda bien", meaning: "if that works for you", note: "Softener when suggesting a new plan.", example: "Tipo siete, si te queda bien.", translation: "Around seven, if that works for you.", starred: true },
  { id: "mejor-manana-queda-bien", term: "mejor mañana, si te queda bien", meaning: "better tomorrow, if that works for you", note: "Polite full reschedule phrase.", example: "Hoy no puedo; mejor mañana, si te queda bien.", translation: "I can’t today; better tomorrow, if that works for you.", starred: true },
  { id: "lleva-algo-tomar", term: "lleva algo de tomar", meaning: "bring something to drink", note: "Casual invite detail.", example: "Cae a mi casa y lleva algo de tomar.", translation: "Come over to my place and bring something to drink.", starred: true },
  { id: "algo-para-compartir", term: "algo para compartir", meaning: "something to share", note: "Food/drink/group-plan phrase.", example: "Trae algo para compartir.", translation: "Bring something to share.", starred: true },
  { id: "lleva-algo-compartir", term: "lleva algo para compartir", meaning: "bring something to share", note: "Natural instruction for a casual hangout.", example: "Si puedes, lleva algo para compartir.", translation: "If you can, bring something to share.", starred: true },
  { id: "sin-afan", term: "sin afán", meaning: "no rush / no pressure", note: "Very common Colombian softener.", example: "Sin afán, me avisas.", translation: "No rush, let me know.", starred: true },
  { id: "me-avisas", term: "me avisas", meaning: "let me know", note: "Useful for plans and changes.", example: "Me avisas si cambia algo.", translation: "Let me know if anything changes.", starred: true },
  { id: "me-avisas-si-cambia", term: "me avisas si cambia algo", meaning: "let me know if anything changes", note: "Perfect for confirming plans politely.", example: "Perfecto. Me avisas si cambia algo.", translation: "Perfect. Let me know if anything changes.", starred: true },
  { id: "si-cambia-algo", term: "si cambia algo", meaning: "if anything changes", note: "Common closing phrase for plans.", example: "Si cambia algo, me avisas.", translation: "If anything changes, let me know.", starred: true },
  { id: "nos-vemos-ahorita", term: "nos vemos ahorita", meaning: "see you in a bit / see you soon", note: "In Colombia, ahorita often means soon or in a bit.", example: "Listo, nos vemos ahorita.", translation: "Okay, see you in a bit.", starred: true },
  { id: "voy-saliendo", term: "voy saliendo", meaning: "I’m heading out / I’m leaving now", note: "Very common voice-note/texting update.", example: "Voy saliendo, nos vemos ahorita.", translation: "I’m heading out, see you in a bit.", starred: true },
  { id: "perfecto-me-avisas", term: "Perfecto. Me avisas si cambia algo, sin afán.", meaning: "Perfect. Let me know if anything changes, no pressure.", note: "Useful full confirmation message.", example: "Perfecto. Me avisas si cambia algo, sin afán.", translation: "Perfect. Let me know if anything changes, no pressure.", starred: true },
];

const highlightMap = Object.fromEntries(plansVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    acceptedAnswers: [item.meaning.split("/")[0].trim()],
    languageFrom: "spanish",
    languageTo: "english",
    difficulty: item.starred ? "hard" : "medium",
    notes: item.note,
    starred: item.starred,
  };
}

function message(
  id: string,
  speakerId: string,
  text: string,
  translation: string,
  phrases: string[],
  messageType: StoryMessage["messageType"] = "text",
  audioUrl?: string,
): StoryMessage {
  return {
    id,
    speakerId,
    messageType,
    text,
    translation,
    ...(audioUrl ? { audioUrl } : {}),
    vocabHighlights: highlights(phrases),
  };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(
  id: string,
  title: string,
  newVocab: string[],
  fullVocab: string[],
  prompt: string,
  targetAnswer: string,
  explanation: string,
  wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>,
  hints: string[] = [],
  acceptedAnswers: string[] = [],
): SentenceStage {
  return {
    id,
    title,
    newVocab,
    fullVocab,
    prompt,
    targetAnswer,
    acceptedAnswers,
    hints,
    explanation,
    wordBreakdown,
  };
}

export const colombianSpanishB1PlansInvitationsFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b1-plans-invitations-flashcards",
  title: "Colombian Spanish B1: Plans & Invitations Flashcards",
  subtitle: "Colombian chunks for arranging hangouts, accepting, rescheduling, bringing things, and confirming plans.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "flashcards", "plans", "invitations"],
  estimatedMinutes: 15,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-plans-invitations-sentence-builder",
  activityType: "flashcards",
  data: {
    cards: plansVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué más? = What’s up?",
  "cuadrar = to arrange",
  "cuadremos algo = let’s arrange something",
  "parchar = to hang out",
  "el parche = the hangout / plan",
  "¿Te animas? = are you up for it?",
  "me apunto = I’m in",
  "tipo siete = around seven",
  "cae a mi casa = come over to my place",
  "por ahí = around there / roughly",
  "me suena = sounds good to me",
  "me queda un poquito difícil = that’s a bit tricky",
  "me toca madrugar = I have to get up early",
  "mejor mañana = better tomorrow",
  "si te queda bien = if that works for you",
  "lleva algo de tomar = bring something to drink",
  "algo para compartir = something to share",
  "sin afán = no rush",
  "me avisas = let me know",
  "si cambia algo = if anything changes",
  "nos vemos ahorita = see you in a bit",
  "voy saliendo = I’m heading out",
];

export const colombianSpanishB1PlansInvitationsSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-b1-plans-invitations-sentence-builder",
  title: "B1 Sentence Builder: Colombian Plans & Invitations",
  subtitle: "Build text-based Colombian Spanish sentences for making plans, accepting, rescheduling, and confirming details.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["colombian-spanish", "b1", "sentence-builder", "plans", "invitations"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-plans-invitations-sentence-builder",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Write or say a Colombian-style voice note arranging a hangout, accepting or rescheduling softly, asking someone to bring something, and closing with no pressure.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Arrange something",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "What’s up? Let’s arrange something.",
        "¿Qué más? Cuadremos algo.",
        "Cuadrar is the core planning verb here: arrange, sort out, or plan.",
        breakdown([["What’s up?", "¿Qué más?"], ["Let’s arrange", "Cuadremos"], ["something", "algo"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Plan a hangout",
        sentenceVocab.slice(3, 5),
        sentenceVocab.slice(0, 5),
        "Let’s plan a hangout.",
        "Cuadremos un parche.",
        "Parche can be the hangout, plan, or group. It makes the invitation sound local and casual.",
        breakdown([["Let’s plan", "Cuadremos"], ["a hangout", "un parche"]]),
        ["Use cuadremos.", "Use un parche for the hangout/plan."],
      ),
      stage(
        "stage-3",
        "Stage 3: Invite someone",
        sentenceVocab.slice(5, 7),
        sentenceVocab.slice(0, 7),
        "Are you up for hanging out? I’m in.",
        "¿Te animas a parchar? Me apunto.",
        "¿Te animas? invites softly. Me apunto accepts with energy.",
        breakdown([["Are you up for", "¿Te animas a"], ["hanging out", "parchar"], ["I’m in", "Me apunto"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Time and place",
        sentenceVocab.slice(7, 10),
        sentenceVocab.slice(0, 10),
        "Come over to my place around seven.",
        "Cae a mi casa tipo siete.",
        "Cae a mi casa is casual and friendly. Tipo siete makes the time approximate.",
        breakdown([["Come over to my place", "Cae a mi casa"], ["around seven", "tipo siete"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Accept softly",
        sentenceVocab.slice(10, 11),
        sentenceVocab.slice(0, 11),
        "That sounds good to me. We’ll hang out around there.",
        "Me suena. Parchamos por ahí.",
        "Me suena is a natural interested yes. Por ahí keeps the plan casual.",
        breakdown([["Sounds good to me", "Me suena"], ["We’ll hang out", "Parchamos"], ["around there", "por ahí"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Reschedule politely",
        sentenceVocab.slice(11, 15),
        sentenceVocab.slice(0, 15),
        "Today is a bit difficult for me. I have to get up early. Better tomorrow, if that works for you.",
        "Hoy me queda un poquito difícil. Me toca madrugar. Mejor mañana, si te queda bien.",
        "This declines without sounding cold: reason, alternative, softener.",
        breakdown([["Today is a bit difficult", "Hoy me queda un poquito difícil"], ["I have to get up early", "Me toca madrugar"], ["Better tomorrow", "Mejor mañana"], ["if that works for you", "si te queda bien"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Bring something",
        sentenceVocab.slice(15, 17),
        sentenceVocab.slice(0, 17),
        "Bring something to drink and something to share.",
        "Lleva algo de tomar y algo para compartir.",
        "This is practical invitation language for a house hangout.",
        breakdown([["Bring", "Lleva"], ["something to drink", "algo de tomar"], ["something to share", "algo para compartir"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: No pressure",
        sentenceVocab.slice(17, 20),
        sentenceVocab.slice(0, 20),
        "No rush. Let me know if anything changes.",
        "Sin afán. Me avisas si cambia algo.",
        "Sin afán makes the message feel relaxed instead of pushy.",
        breakdown([["No rush", "Sin afán"], ["Let me know", "Me avisas"], ["if anything changes", "si cambia algo"]]),
      ),
      stage(
        "stage-9",
        "Stage 9: Heading out",
        sentenceVocab.slice(20, 22),
        sentenceVocab,
        "I’m heading out. See you in a bit.",
        "Voy saliendo. Nos vemos ahorita.",
        "Voy saliendo is a very common update when you are leaving now.",
        breakdown([["I’m heading out", "Voy saliendo"], ["See you in a bit", "Nos vemos ahorita"]]),
      ),
      stage(
        "stage-10",
        "Stage 10: Full plan",
        [],
        sentenceVocab,
        "What’s up? Let’s plan a hangout. Come over to my place around seven, bring something to drink, and let me know if anything changes. No pressure.",
        "¿Qué más? Cuadremos un parche. Cae a mi casa tipo siete, lleva algo de tomar y me avisas si cambia algo. Sin afán.",
        "This is a complete B1 Colombian invitation: opener, plan, time/place, detail, and relaxed close.",
        breakdown([["What’s up?", "¿Qué más?"], ["Let’s plan a hangout", "Cuadremos un parche"], ["Come over to my place around seven", "Cae a mi casa tipo siete"], ["bring something to drink", "lleva algo de tomar"], ["let me know if anything changes", "me avisas si cambia algo"], ["No pressure", "Sin afán"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/colombian-spanish-b1-plans-invitations/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-plans-story-q1",
    type: "multiple-choice",
    prompt: "What does Dani want to arrange?",
    options: ["A casual hangout", "A job interview", "A doctor appointment", "A flight"],
    correctAnswer: "A casual hangout",
    explanation: "Dani says cuadremos un parche, meaning let’s plan a hangout.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-b1-plans-story-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'Come over to my place around seven'.",
    nativePrompt: "Come over to my place around seven.",
    wordBank: ["Cae", "a", "mi", "casa", "tipo", "siete"],
    correctAnswer: "Cae a mi casa tipo siete",
    explanation: "This is the complete casual invite phrase.",
    points: 1,
    skillTag: "invitation",
  },
  {
    id: "colombian-b1-plans-story-q3",
    type: "multiple-choice",
    prompt: "Why does Vale suggest tomorrow instead?",
    options: ["Today is tricky and she has to get up early", "She dislikes the group", "She is already at Dani’s house", "She forgot the address"],
    correctAnswer: "Today is tricky and she has to get up early",
    explanation: "Vale says hoy me queda un poquito difícil and me toca madrugar.",
    points: 1,
    skillTag: "reason",
  },
  {
    id: "colombian-b1-plans-story-q4",
    type: "order-words",
    prompt: "Order the relaxed confirmation message.",
    nativePrompt: "Perfect. Let me know if anything changes, no pressure.",
    wordBank: ["Perfecto.", "Me", "avisas", "si", "cambia", "algo,", "sin", "afán."],
    correctAnswer: "Perfecto. Me avisas si cambia algo, sin afán.",
    explanation: "This is the full confirmation phrase from the lesson.",
    points: 2,
    skillTag: "confirmation",
  },
];

export const colombianSpanishB1PlansInvitationsWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b1-plans-invitations",
  title: "Colombian B1 Story: Cuadremos un Parche",
  subtitle: "A WhatsApp-style story about making a relaxed Colombian hangout plan without pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "WhatsApp", "plans", "invitations"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-plans-invitations-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "dani", name: "Dani", initials: "D", side: "right", color: "blue" },
      { id: "vale", name: "Vale", initials: "V", side: "left", color: "green" },
      { id: "mateo", name: "Mateo", initials: "M", side: "left", color: "violet" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Dani, Vale, and Mateo are trying to arrange a relaxed hangout without pressuring anyone.", "Guide: Dani, Vale, and Mateo are trying to arrange a relaxed hangout without pressuring anyone.", [], "narrator"),
      message("m1", "dani", "¿Qué más? ¿Cuadremos algo esta semana?", "What’s up? Shall we arrange something this week?", ["¿Qué más?", "cuadremos algo", "cuadrar"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m1.mp3"),
      message("m2", "mateo", "Me suena. ¿Qué tienes en mente?", "Sounds good to me. What do you have in mind?", ["me suena"]),
      message("m3", "dani", "Cuadremos un parche tranquilo en mi casa.", "Let’s plan a relaxed hangout at my place.", ["cuadremos un parche", "el parche"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m3.mp3"),
      message("m4", "vale", "¿Te animas a parchar mañana, Mateo?", "Are you up for hanging out tomorrow, Mateo?", ["¿Te animas a parchar?", "¿Te animas?", "parchar"]),
      message("m5", "mateo", "Me apunto. ¿A qué hora?", "I’m in. What time?", ["me apunto"]),
      message("m6", "dani", "Cae a mi casa tipo siete, o por ahí.", "Come over to my place around seven, or somewhere around then.", ["cae a mi casa", "cae a mi casa tipo siete", "tipo siete", "por ahí"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m6.mp3"),
      message("m7", "vale", "Hoy me queda un poquito difícil.", "Today is a bit difficult for me.", ["hoy me queda un poquito difícil", "me queda un poquito difícil"]),
      message("m8", "vale", "Me toca madrugar, entonces mejor mañana, si te queda bien.", "I have to get up early, so better tomorrow, if that works for you.", ["me toca madrugar", "mejor mañana", "si te queda bien", "mejor mañana, si te queda bien"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m8.mp3"),
      message("m9", "dani", "Listo, sin afán. Parchamos mañana.", "Okay, no pressure. We’ll hang out tomorrow.", ["sin afán", "parchamos"]),
      message("m10", "mateo", "Lleva algo de tomar, ¿sí? Yo llevo algo para compartir.", "Bring something to drink, okay? I’ll bring something to share.", ["lleva algo de tomar", "algo para compartir", "lleva algo para compartir"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m10.mp3"),
      message("m11", "vale", "Perfecto. Me avisas si cambia algo, sin afán.", "Perfect. Let me know if anything changes, no pressure.", ["Perfecto. Me avisas si cambia algo, sin afán.", "me avisas si cambia algo", "si cambia algo", "sin afán"]),
      message("m12", "dani", "De una. Nos vemos ahorita por el grupo para confirmar.", "For sure. See you in a bit in the group chat to confirm.", ["nos vemos ahorita"]),
      message("m13", "mateo", "Voy saliendo de la oficina. Me avisas si cambio la hora.", "I’m heading out from the office. Let me know if I change the time.", ["voy saliendo", "me avisas", "si cambia algo"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m13.mp3"),
      message("m14", "vale", "Me suena el plan. Cae a mi casa primero si quieres.", "The plan sounds good to me. Come over to my place first if you want.", ["me suena", "cae a mi casa"]),
      message("m15", "dani", "Bacano. Entonces el parche queda para mañana tipo siete.", "Cool. So the hangout is set for tomorrow around seven.", ["el parche", "tipo siete"]),
      message("m16", "mateo", "Sin afán, pero me avisan si necesitan algo más.", "No pressure, but let me know if you need anything else.", ["sin afán", "me avisas"], "voice-note", "/audio/stories/colombian-spanish-b1-plans-invitations/m16.mp3"),
    ],
    comprehensionChecks: [
      { id: "colombian-b1-plans-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "colombian-b1-plans-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "colombian-b1-plans-check-3", afterMessageId: "m8", question: storyQuestions[2] },
      { id: "colombian-b1-plans-check-4", afterMessageId: "m11", question: storyQuestions[3] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: plansVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: plansVocab.map((item) => item.term),
      grammarPatterns: ["Invitation: ¿Te animas a...? + infinitive.", "Casual planning: cuadrar / cuadremos / parche.", "Soft refusal: me queda un poquito difícil + reason.", "Relaxed confirmation: me avisas si cambia algo, sin afán."],
      speakingPrompts: ["Invite someone to hang out around seven.", "Accept a plan naturally.", "Reschedule politely because you have to wake up early.", "Ask someone to bring something to drink or share."],
    },
    completionTask: {
      title: "Your Colombian plan voice note",
      instructions: "Record a 60-second voice note arranging a hangout. Include a time, a place, what to bring, one soft reschedule option, and a no-pressure closing.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "El viernes en la tarde, Dani mandó una nota al grupo: ¿Qué más? Cuadremos algo. Al principio nadie respondió, pero después Mateo escribió: me suena. Dani propuso: cuadremos un parche tranquilo en mi casa, tipo siete por ahí.",
    translation:
      "On Friday afternoon, Dani sent a note to the group: What’s up? Let’s arrange something. At first nobody replied, but then Mateo wrote: sounds good to me. Dani suggested: let’s plan a relaxed hangout at my place, around seven-ish.",
    highlights: highlights(["¿Qué más?", "cuadremos algo", "me suena", "cuadremos un parche", "el parche", "tipo siete", "por ahí"]),
    shadowLine: "Cuadremos un parche tipo siete por ahí.",
  },
  {
    id: "p2",
    text:
      "Vale quería ir, pero no podía ese día. Escribió: hoy me queda un poquito difícil porque me toca madrugar. Mejor mañana, si te queda bien. La frase sonó amable porque no cerró la puerta; solo cambió el plan.",
    translation:
      "Vale wanted to go, but she couldn’t that day. She wrote: today is a bit difficult for me because I have to get up early. Better tomorrow, if that works for you. The phrase sounded kind because it didn’t close the door; it only changed the plan.",
    highlights: highlights(["hoy me queda un poquito difícil", "me queda un poquito difícil", "me toca madrugar", "mejor mañana", "si te queda bien", "mejor mañana, si te queda bien"]),
    shadowLine: "Mejor mañana, si te queda bien.",
  },
  {
    id: "p3",
    text:
      "Mateo aceptó de una: me apunto. Luego preguntó si tenía que llevar algo de tomar o algo para compartir. Dani dijo: sí, lleva algo para compartir, pero sin afán. Me avisas si cambia algo.",
    translation:
      "Mateo accepted right away: I’m in. Then he asked if he had to bring something to drink or something to share. Dani said: yes, bring something to share, but no pressure. Let me know if anything changes.",
    highlights: highlights(["me apunto", "lleva algo de tomar", "algo para compartir", "lleva algo para compartir", "sin afán", "me avisas si cambia algo", "si cambia algo"]),
    shadowLine: "Me avisas si cambia algo, sin afán.",
  },
  {
    id: "p4",
    text:
      "Al día siguiente, Vale mandó: voy saliendo. Nos vemos ahorita. Dani respondió: perfecto. Me avisas si cambia algo, sin afán. Cuando llegaron, no fue una fiesta grande, pero sí fue un buen parche: hablaron, comieron algo y parchamos hasta tarde.",
    translation:
      "The next day, Vale sent: I’m heading out. See you in a bit. Dani answered: perfect. Let me know if anything changes, no pressure. When they arrived, it wasn’t a big party, but it was a good hangout: they talked, ate something, and hung out until late.",
    highlights: highlights(["voy saliendo", "nos vemos ahorita", "Perfecto. Me avisas si cambia algo, sin afán.", "el parche", "parchamos"]),
    shadowLine: "Voy saliendo. Nos vemos ahorita.",
  },
  {
    id: "p5",
    text:
      "Lo más útil de la conversación fue el tono. ¿Te animas? invita sin presionar. Me queda un poquito difícil rechaza sin sonar seco. Sin afán baja la presión. Y me avisas mantiene el plan abierto si algo cambia.",
    translation:
      "The most useful part of the conversation was the tone. Are you up for it? invites without pressuring. That’s a bit tricky for me declines without sounding dry. No pressure lowers the pressure. And let me know keeps the plan open if something changes.",
    highlights: highlights(["¿Te animas?", "me queda un poquito difícil", "sin afán", "me avisas", "si cambia algo"]),
    shadowLine: "¿Te animas? Sin afán, me avisas.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b1-plans-reading-q1",
    type: "multiple-choice",
    prompt: "What kind of plan does Dani suggest?",
    options: ["A relaxed hangout at his place", "A formal job interview", "A trip to the airport", "A morning class"],
    correctAnswer: "A relaxed hangout at his place",
    explanation: "Dani says cuadremos un parche tranquilo en mi casa.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-plans-reading-q2",
    type: "order-words",
    prompt: "Order the phrase meaning 'better tomorrow, if that works for you'.",
    nativePrompt: "Better tomorrow, if that works for you.",
    wordBank: ["mejor", "mañana,", "si", "te", "queda", "bien"],
    correctAnswer: "mejor mañana, si te queda bien",
    explanation: "This is the soft reschedule phrase from the reading.",
    points: 1,
    skillTag: "reschedule",
  },
  {
    id: "colombian-b1-plans-reading-q3",
    type: "multiple-choice",
    prompt: "What does Mateo ask about bringing?",
    options: ["Something to drink or share", "A passport", "A laptop charger", "Formal clothes"],
    correctAnswer: "Something to drink or share",
    explanation: "He asks about algo de tomar and algo para compartir.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "colombian-b1-plans-reading-q4",
    type: "order-words",
    prompt: "Order the phrase meaning 'I’m heading out. See you in a bit.'",
    nativePrompt: "I’m heading out. See you in a bit.",
    wordBank: ["Voy", "saliendo.", "Nos", "vemos", "ahorita."],
    correctAnswer: "Voy saliendo. Nos vemos ahorita.",
    explanation: "This is a natural Colombian text/voice-note update.",
    points: 2,
    skillTag: "update",
  },
  {
    id: "colombian-b1-plans-reading-q5",
    type: "multiple-choice",
    prompt: "Why is sin afán useful?",
    options: ["It lowers pressure", "It cancels the plan", "It asks for money", "It gives an exact time"],
    correctAnswer: "It lowers pressure",
    explanation: "The reading says sin afán baja la presión.",
    points: 1,
    skillTag: "tone",
  },
];

export const colombianSpanishB1PlansInvitationsReading: ReadingComprehension = {
  id: "colombian-spanish-b1-reading-plans-invitations",
  title: "Colombian B1 Reading: Cuadrar el Parche",
  subtitle: "A first-person reading about arranging a Colombian hangout, rescheduling politely, and confirming without pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "reading", "plans", "invitations"],
  estimatedMinutes: 14,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-plans-invitations-sentence-builder",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-b1-reading-plans-invitations/full.mp3",
    paragraphs: readingParagraphs,
    glossary: plansVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })),
    explanation: "These phrases come directly from the Colombian B1 plans and invitations speaking lesson.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

export const colombianSpanishB1PlansInvitationsQuiz: CheckpointQuiz = {
  id: "colombian-spanish-b1-plans-invitations-quiz",
  title: "Colombian Spanish B1: Plans & Invitations Quiz",
  subtitle: "Check Colombian chunks for arranging, accepting, rescheduling, bringing things, and confirming plans.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Colombian Spanish", "B1", "quiz", "plans", "invitations"],
  estimatedMinutes: 15,
  skoolSectionName: "Colombian Spanish - B1 Sentence Builder Reinforcement",
  relatedCourse: "colombian-spanish-b1-plans-invitations-builder",
  activityType: "quiz",
  data: {
    description: "Practice the Colombian B1 plans and invitations phrases from the speaking builder.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-b1-plans-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase means 'let’s plan a hangout'?",
        options: ["cuadremos un parche", "me toca madrugar", "sin afán", "voy saliendo"],
        correctAnswer: "cuadremos un parche",
        explanation: "Cuadremos un parche means let’s plan a hangout.",
        points: 1,
        skillTag: "planning",
      },
      {
        id: "colombian-b1-plans-quiz-2",
        type: "fill-blank",
        prompt: "Complete: Me toca ______.",
        nativePrompt: "I have to get up early.",
        correctAnswer: "madrugar",
        explanation: "Me toca madrugar means I have to get up early.",
        points: 1,
        skillTag: "reason",
      },
      {
        id: "colombian-b1-plans-quiz-3",
        type: "multiple-choice",
        prompt: "Which phrase accepts an invitation naturally?",
        options: ["me apunto", "me queda un poquito difícil", "mejor mañana", "si cambia algo"],
        correctAnswer: "me apunto",
        explanation: "Me apunto means I’m in or count me in.",
        points: 1,
        skillTag: "accepting",
      },
      {
        id: "colombian-b1-plans-quiz-4",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "Bring something to share.",
        wordBank: ["lleva", "algo", "para", "compartir"],
        correctAnswer: "lleva algo para compartir",
        explanation: "This is the complete phrase for bring something to share.",
        points: 1,
        skillTag: "invitation-detail",
      },
      {
        id: "colombian-b1-plans-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "No rush. Let me know if anything changes.",
        wordBank: ["Sin", "afán.", "Me", "avisas", "si", "cambia", "algo."],
        correctAnswer: "Sin afán. Me avisas si cambia algo.",
        explanation: "This is a relaxed way to close plan details.",
        points: 2,
        skillTag: "confirmation",
      },
      pairQuestion("colombian-b1-plans-pairs-1", "Match Colombian plans and invitations phrases set 1.", plansVocab.slice(0, 8)),
      pairQuestion("colombian-b1-plans-pairs-2", "Match Colombian plans and invitations phrases set 2.", plansVocab.slice(8, 16)),
      pairQuestion("colombian-b1-plans-pairs-3", "Match Colombian plans and invitations phrases set 3.", plansVocab.slice(16, 24)),
      pairQuestion("colombian-b1-plans-pairs-4", "Match Colombian plans and invitations phrases set 4.", plansVocab.slice(24)),
    ],
  },
};
