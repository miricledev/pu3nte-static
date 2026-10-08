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

type VocabItem = { id: string; term: string; meaning: string; note: string; example: string; translation: string; starred?: boolean };
type Highlight = { phrase: string; meaning: string; note: string };

const courseId = "colombian-spanish-c1-professional-networking-over-coffee-in-bogota";
const sectionName = "Colombian Spanish - C1 Professional Networking Over Coffee in Bogotá";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const networkingVocab: VocabItem[] = [
  { id: "le-soy-franco", term: "le soy franco", meaning: "let me be frank / I’ll be straight with you", note: "Polite usted-register directness, useful in Colombian professional conversations.", example: "Le soy franco: me interesa entender mejor el proyecto.", translation: "Let me be frank: I’m interested in understanding the project better.", starred: true },
  { id: "me-queda-sonando", term: "me queda sonando", meaning: "it sticks with me / it keeps me thinking", note: "Good for showing genuine interest without overcommitting.", example: "Eso que dijo me queda sonando.", translation: "What you said keeps me thinking.", starred: true },
  { id: "por-ahi-puede-haber-algo", term: "por ahí puede haber algo", meaning: "there might be something there", note: "Soft Colombian way to signal potential without promising too much.", example: "Por ahí puede haber algo entre su equipo y el nuestro.", translation: "There might be something there between your team and ours.", starred: true },
  { id: "cuenteme-como-lo-ve", term: "cuénteme cómo lo ve", meaning: "tell me how you see it", note: "Invites the other person’s view in a professional, relationship-building way.", example: "Cuénteme cómo lo ve desde su lado.", translation: "Tell me how you see it from your side.", starred: true },
  { id: "no-echar-carreta", term: "no le voy a echar carreta", meaning: "I’m not going to give you a sales pitch / talk your ear off", note: "Disarms a meeting by promising clarity instead of empty talk.", example: "No le voy a echar carreta; prefiero ir al punto.", translation: "I’m not going to give you a sales pitch; I’d rather get to the point.", starred: true },
  { id: "apostar-conocernos", term: "yo le apuesto más a conocernos primero", meaning: "I’d rather focus on getting to know each other first", note: "Relationship-first Colombian networking: trust before the transaction.", example: "Yo le apuesto más a conocernos primero y luego vemos.", translation: "I’d rather focus on getting to know each other first and then we’ll see.", starred: true },
  { id: "entender-por-donde-van", term: "me interesa entender por dónde van", meaning: "I’m interested in understanding where you’re headed", note: "Shows strategic curiosity about a project, company, or team direction.", example: "Me interesa entender por dónde van este año.", translation: "I’m interested in understanding where you’re headed this year.", starred: true },
  { id: "puede-servir", term: "de pronto le puede servir", meaning: "maybe it could be useful to you", note: "Soft offer; useful for suggesting help without sounding pushy.", example: "Tengo un contacto que de pronto le puede servir.", translation: "I have a contact that maybe could be useful to you.", starred: true },
  { id: "si-le-cuadra", term: "si le cuadra", meaning: "if it works for you / if it suits you", note: "Colombian professional softener for proposing next steps.", example: "Si le cuadra, le mando una propuesta corta.", translation: "If it works for you, I’ll send you a short proposal.", starred: true },
  { id: "miramos-con-calma", term: "lo miramos con calma", meaning: "we can look at it calmly", note: "Signals no pressure and thoughtful review.", example: "Le paso el documento y lo miramos con calma.", translation: "I’ll send you the document and we can look at it calmly.", starred: true },
  { id: "no-hay-afan", term: "no hay afán", meaning: "there’s no rush", note: "Very Colombian phrase for lowering pressure.", example: "No hay afán; prefiero que lo revise bien.", translation: "There’s no rush; I’d rather you review it properly.", starred: true },
  { id: "me-cuenta-que-le-parece", term: "me cuenta qué le parece", meaning: "let me know what you think", note: "Natural follow-up phrase after sending an idea, intro, or proposal.", example: "Revíselo y me cuenta qué le parece.", translation: "Review it and let me know what you think.", starred: true },
  { id: "le-veo-sentido", term: "yo le veo sentido", meaning: "I see the logic / value in it", note: "Professional agreement without sounding exaggerated.", example: "Yo le veo sentido a empezar pequeño.", translation: "I see the logic in starting small.", starred: true },
  { id: "por-ese-lado-suena", term: "por ese lado sí me suena", meaning: "from that angle, that sounds good to me", note: "Partial agreement phrase: one angle works even if not everything is settled.", example: "Por ese lado sí me suena, habría que revisar tiempos.", translation: "From that angle, that sounds good to me; we’d need to review timing.", starred: true },
  { id: "aterrizar-idea", term: "podemos aterrizar la idea", meaning: "we can flesh the idea out / make it concrete", note: "Common Colombian professional phrase for moving from general to practical.", example: "Podemos aterrizar la idea en una llamada de media hora.", translation: "We can flesh the idea out in a half-hour call.", starred: true },
  { id: "cuadramos-espacio", term: "cuadramos un espacio", meaning: "we arrange a time / set up a slot", note: "Cuadrar is essential Colombian planning language.", example: "La otra semana cuadramos un espacio.", translation: "Next week we’ll set up a time.", starred: true },
  { id: "otro-cafecito", term: "nos tomamos otro cafecito", meaning: "we can have another coffee", note: "Warm Colombian networking follow-up; relationship-first and low pressure.", example: "Si le parece, nos tomamos otro cafecito y lo vemos.", translation: "If that works for you, we can have another coffee and look at it.", starred: true },
  { id: "paso-contacto", term: "le paso el contacto", meaning: "I’ll send you the contact", note: "Practical networking promise; make sure the context is appropriate.", example: "Le paso el contacto de la persona que maneja alianzas.", translation: "I’ll send you the contact of the person who handles partnerships.", starred: true },
  { id: "conectar-con-alguien", term: "lo puedo conectar con alguien", meaning: "I can connect you with someone", note: "Offer of an introduction; in Colombian networking, trust matters.", example: "Lo puedo conectar con alguien que conoce ese sector.", translation: "I can connect you with someone who knows that sector.", starred: true },
  { id: "abrir-puerta", term: "por ahí se puede abrir una puerta", meaning: "that might open a door / create an opportunity", note: "Soft opportunity language, not a guarantee.", example: "Si hablan, por ahí se puede abrir una puerta.", translation: "If you talk, that might open a door.", starred: true },
  { id: "quedamos-pendientes", term: "quedamos pendientes", meaning: "we’ll stay in touch / keep it pending", note: "Flexible Colombian closer; can be sincere if paired with follow-up.", example: "Quedamos pendientes de esa llamada.", translation: "We’ll stay in touch about that call.", starred: true },
  { id: "hagamosle-seguimiento", term: "hagámosle seguimiento", meaning: "let’s follow up on it", note: "Moves a conversation from friendly interest to professional action.", example: "Hagámosle seguimiento la próxima semana.", translation: "Let’s follow up on it next week.", starred: true },
  { id: "sin-meterle-afan", term: "sin meterle afán", meaning: "without rushing it / without putting pressure on it", note: "A Colombian way to protect momentum without pressure.", example: "Hagámosle seguimiento, pero sin meterle afán.", translation: "Let’s follow up, but without rushing it.", starred: true },
];

const highlightMap = Object.fromEntries(networkingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const storyAudioBase = `/audio/stories/${courseId}`;
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is Highlight => Boolean(item));

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

export const colombianSpanishC1ProfessionalNetworkingCoffeeBogotaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Colombian Spanish C1: Professional Networking Over Coffee in Bogotá Flashcards",
  subtitle: "Colombian C1 phrases for polite directness, coffee meetings, soft opportunity language, intros, and follow-up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "flashcards", "networking", "Bogotá"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: networkingVocab.map(cardFromVocab) },
};

const sentenceVocab = networkingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const colombianSpanishC1ProfessionalNetworkingCoffeeBogotaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Bogotá Coffee Networking",
  subtitle: "Build professional Colombian Spanish for low-pressure coffee meetings, ideas, intros, and follow-up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["colombian-spanish", "c1", "sentence-builder", "networking", "bogota"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a Colombian-style professional voice note after a coffee meeting: be frank, show interest, avoid pressure, suggest an intro, and propose follow-up.",
    stages: [
      stage("stage-1", "Stage 1: Honest opener", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "Let me be frank: what you said keeps me thinking, and there might be something there.", "Le soy franco: lo que dijo me queda sonando y por ahí puede haber algo.", "Use frankness without sounding aggressive.", breakdown([["let me be frank", "le soy franco"], ["keeps me thinking", "me queda sonando"], ["there might be something there", "por ahí puede haber algo"]])),
      stage("stage-2", "Stage 2: Invite their view", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "Tell me how you see it. I’m not going to give you a sales pitch; I’d rather get to know each other first.", "Cuénteme cómo lo ve. No le voy a echar carreta; yo le apuesto más a conocernos primero.", "This is relationship-first networking.", breakdown([["tell me how you see it", "cuénteme cómo lo ve"], ["sales pitch", "carreta"], ["getting to know each other first", "conocernos primero"]])),
      stage("stage-3", "Stage 3: Strategic curiosity", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "I’m interested in understanding where you’re headed, because maybe it could be useful to you if it works for you.", "Me interesa entender por dónde van, porque de pronto le puede servir si le cuadra.", "Show curiosity, then soften the offer.", breakdown([["where you’re headed", "por dónde van"], ["maybe it could be useful", "de pronto le puede servir"], ["if it works for you", "si le cuadra"]])),
      stage("stage-4", "Stage 4: No pressure review", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "We can look at it calmly. There’s no rush; let me know what you think.", "Lo miramos con calma. No hay afán; me cuenta qué le parece.", "This lowers pressure and invites a real answer.", breakdown([["look at it calmly", "lo miramos con calma"], ["there’s no rush", "no hay afán"], ["let me know what you think", "me cuenta qué le parece"]])),
      stage("stage-5", "Stage 5: Partial agreement", sentenceVocab.slice(12, 15), sentenceVocab.slice(0, 15), "I see the logic in it. From that angle, it sounds good, and we can make the idea concrete.", "Yo le veo sentido. Por ese lado sí me suena y podemos aterrizar la idea.", "Useful when you like the direction but still need details.", breakdown([["I see the logic", "yo le veo sentido"], ["from that angle", "por ese lado"], ["make the idea concrete", "aterrizar la idea"]])),
      stage("stage-6", "Stage 6: Warm next step", sentenceVocab.slice(15, 17), sentenceVocab.slice(0, 17), "We’ll arrange a time and have another coffee.", "Cuadramos un espacio y nos tomamos otro cafecito.", "This sounds warmer than a cold calendar invite.", breakdown([["arrange a time", "cuadramos un espacio"], ["another coffee", "otro cafecito"]])),
      stage("stage-7", "Stage 7: Offer a connection", sentenceVocab.slice(17, 20), sentenceVocab.slice(0, 20), "I’ll send you the contact; I can connect you with someone, and that might open a door.", "Le paso el contacto; lo puedo conectar con alguien y por ahí se puede abrir una puerta.", "Offer help without promising the outcome.", breakdown([["send you the contact", "le paso el contacto"], ["connect you with someone", "lo puedo conectar con alguien"], ["open a door", "abrir una puerta"]])),
      stage("stage-8", "Stage 8: Follow up calmly", sentenceVocab.slice(20), sentenceVocab, "We’ll stay in touch and follow up on it, without rushing it.", "Quedamos pendientes y hagámosle seguimiento, sin meterle afán.", "Close with momentum and no pressure.", breakdown([["stay in touch", "quedamos pendientes"], ["follow up on it", "hagámosle seguimiento"], ["without rushing it", "sin meterle afán"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "col-c1-networking-story-q1", type: "multiple-choice", prompt: "After message 3, what is Santiago signaling?", options: ["Genuine interest, but not a firm commitment yet", "A rejected job offer", "A complaint about coffee", "A rushed contract"], correctAnswer: "Genuine interest, but not a firm commitment yet", explanation: "He says the idea keeps him thinking and that there might be something there.", points: 1, skillTag: "subtext" },
  { id: "col-c1-networking-story-q2", type: "multiple-choice", prompt: "After message 6, what is Paola trying to avoid?", options: ["Sounding like she is giving a sales pitch", "Making a calendar invite", "Introducing a friend", "Ending the meeting"], correctAnswer: "Sounding like she is giving a sales pitch", explanation: "She says she is not going to echar carreta.", points: 1, skillTag: "tone" },
  { id: "col-c1-networking-story-q3", type: "multiple-choice", prompt: "After message 9, why does Santiago ask where they are headed?", options: ["He wants to understand their direction before suggesting anything", "He wants to cancel the conversation", "He needs directions in Bogotá", "He is asking for lunch"], correctAnswer: "He wants to understand their direction before suggesting anything", explanation: "He says he wants to understand por dónde van.", points: 1, skillTag: "intent" },
  { id: "col-c1-networking-story-q4", type: "multiple-choice", prompt: "After message 12, what tone are they keeping?", options: ["Calm and low-pressure", "Urgent and demanding", "Angry", "Romantic"], correctAnswer: "Calm and low-pressure", explanation: "They use lo miramos con calma and no hay afán.", points: 1, skillTag: "tone" },
  { id: "col-c1-networking-story-q5", type: "true-false", prompt: "True or false: By message 15, Santiago thinks the idea has some value.", options: ["True", "False"], correctAnswer: "True", explanation: "He says yo le veo sentido and por ese lado sí me suena.", points: 1, skillTag: "gist" },
  { id: "col-c1-networking-story-q6", type: "multiple-choice", prompt: "After message 18, what next step do they mention?", options: ["Arranging another coffee or a time to talk", "Dropping the project", "Calling a taxi", "Arguing about payment"], correctAnswer: "Arranging another coffee or a time to talk", explanation: "They mention cuadramos un espacio and nos tomamos otro cafecito.", points: 1, skillTag: "next-step" },
  { id: "col-c1-networking-story-q7", type: "multiple-choice", prompt: "After message 21, what does Paola offer?", options: ["To send a contact and possibly connect Santiago with someone", "To close the deal immediately", "To hire him", "To stop following up"], correctAnswer: "To send a contact and possibly connect Santiago with someone", explanation: "She says le paso el contacto and lo puedo conectar con alguien.", points: 1, skillTag: "networking" },
  { id: "col-c1-networking-story-q8", type: "multiple-choice", prompt: "After message 24, what does “abrir una puerta” mean in context?", options: ["Create a possible opportunity", "Open the café door", "Start a complaint", "Reject an introduction"], correctAnswer: "Create a possible opportunity", explanation: "They use it for a possible professional opportunity.", points: 1, skillTag: "idiom" },
  { id: "col-c1-networking-story-q9", type: "multiple-choice", prompt: "After message 27, what is the follow-up style?", options: ["Stay in touch and follow up without pressure", "Push for an answer tonight", "Ignore the contact", "Ask for a discount"], correctAnswer: "Stay in touch and follow up without pressure", explanation: "They use quedamos pendientes, hagámosle seguimiento, and sin meterle afán.", points: 1, skillTag: "follow-up" },
  { id: "col-c1-networking-story-q10", type: "multiple-choice", prompt: "By message 30, what has been agreed?", options: ["A low-pressure follow-up and possible introduction", "A signed contract", "A cancelled meeting", "A social party"], correctAnswer: "A low-pressure follow-up and possible introduction", explanation: "They agree to follow up calmly and keep the door open.", points: 1, skillTag: "gist" },
];

export const colombianSpanishC1ProfessionalNetworkingCoffeeBogotaWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Colombian C1 Text Story: Coffee, Contacts, and Open Doors",
  subtitle: "A Colombian Spanish chat after a Bogotá coffee meeting, focused on soft opportunity language and professional follow-up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "WhatsApp", "networking", "Bogotá"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "paola", name: "Paola", initials: "P", side: "left", color: "green" },
      { id: "santiago", name: "Santiago", initials: "S", side: "right", color: "cyan" },
    ],
    messages: [
      message("m1", "santiago", "Paola, gracias por el café. Le soy franco: la conversación me quedó sonando.", "Paola, thanks for the coffee. Let me be frank: the conversation stuck with me.", ["le soy franco", "me queda sonando"], "voice-note", `${storyAudioBase}/m1.mp3`),
      message("m2", "paola", "A mí también. Cuando habló de alianzas con universidades, pensé: por ahí puede haber algo.", "Same here. When you talked about partnerships with universities, I thought: there might be something there.", ["por ahí puede haber algo"]),
      message("m3", "santiago", "Sí, pero quiero entender bien el contexto antes de proponer cualquier cosa.", "Yes, but I want to understand the context well before proposing anything.", []),
      message("m4", "paola", "Total. Cuénteme cómo lo ve desde su lado.", "Totally. Tell me how you see it from your side.", ["cuénteme cómo lo ve"]),
      message("m5", "santiago", "No le voy a echar carreta: todavía no tengo una propuesta cerrada.", "I’m not going to give you a sales pitch: I still don’t have a fixed proposal.", ["no le voy a echar carreta"], "voice-note", `${storyAudioBase}/m5.mp3`),
      message("m6", "paola", "Eso me gusta más. Yo le apuesto más a conocernos primero.", "I like that better. I’d rather focus on getting to know each other first.", ["yo le apuesto más a conocernos primero"]),
      message("m7", "santiago", "Exacto. Me interesa entender por dónde van este semestre.", "Exactly. I’m interested in understanding where you’re headed this semester.", ["me interesa entender por dónde van"]),
      message("m8", "paola", "Vamos a abrir un programa piloto con empresas pequeñas.", "We’re going to open a pilot program with small companies.", []),
      message("m9", "santiago", "Eso de pronto le puede servir a una persona que conozco en innovación social.", "That maybe could be useful to someone I know in social innovation.", ["de pronto le puede servir"]),
      message("m10", "paola", "Si le cuadra, me cuenta más. Pero sin afán.", "If it works for you, tell me more. But no rush.", ["si le cuadra", "no hay afán"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "santiago", "Claro. Yo le paso una nota corta y lo miramos con calma.", "Of course. I’ll send you a short note and we can look at it calmly.", ["lo miramos con calma"]),
      message("m12", "paola", "Perfecto. Me la manda y me cuenta qué le parece el enfoque.", "Perfect. Send it to me and let me know what you think of the approach.", ["me cuenta qué le parece"]),
      message("m13", "santiago", "De entrada, yo le veo sentido a empezar pequeño.", "At first glance, I see the logic in starting small.", ["yo le veo sentido"]),
      message("m14", "paola", "Por ese lado sí me suena, porque no queremos arrancar sobredimensionados.", "From that angle, that sounds good to me, because we don’t want to start oversized.", ["por ese lado sí me suena"]),
      message("m15", "santiago", "Podemos aterrizar la idea con dos casos concretos y una llamada corta.", "We can make the idea concrete with two specific cases and a short call.", ["podemos aterrizar la idea"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "paola", "Sí. La otra semana cuadramos un espacio de media hora.", "Yes. Next week we’ll set up a half-hour slot.", ["cuadramos un espacio"]),
      message("m17", "santiago", "O si prefiere, nos tomamos otro cafecito por Chapinero.", "Or if you prefer, we can have another coffee in Chapinero.", ["nos tomamos otro cafecito"]),
      message("m18", "paola", "Me suena. En persona se leen mejor esos matices.", "Sounds good. Those nuances are easier to read in person.", []),
      message("m19", "santiago", "Además, le paso el contacto de Camila; ella trabaja justo en ese cruce.", "Also, I’ll send you Camila’s contact; she works exactly in that overlap.", ["le paso el contacto"]),
      message("m20", "paola", "Buenísimo. Si la conoce bien, de pronto me puede hacer la introducción.", "Great. If you know her well, maybe you can make the introduction.", ["de pronto le puede servir"], "voice-note", `${storyAudioBase}/m20.mp3`),
      message("m21", "santiago", "Sí, lo puedo conectar con alguien de su equipo también.", "Yes, I can connect you with someone from her team too.", ["lo puedo conectar con alguien"]),
      message("m22", "paola", "Eso por ahí se puede abrir una puerta interesante.", "That might open an interesting door.", ["por ahí se puede abrir una puerta"]),
      message("m23", "santiago", "Exacto, aunque prefiero no venderlo como algo seguro.", "Exactly, although I’d rather not sell it as a sure thing.", []),
      message("m24", "paola", "Sí, mejor manejarlo como posibilidad y no como promesa.", "Yes, better to handle it as a possibility and not a promise.", []),
      message("m25", "santiago", "Entonces quedamos pendientes de la nota y del contacto.", "Then we’ll stay in touch about the note and the contact.", ["quedamos pendientes"]),
      message("m26", "paola", "De una. Hagámosle seguimiento la próxima semana.", "Absolutely. Let’s follow up on it next week.", ["hagámosle seguimiento"]),
      message("m27", "santiago", "Pero sin meterle afán. Prefiero que avance bien y no rápido.", "But without rushing it. I’d rather it move well than fast.", ["sin meterle afán"]),
      message("m28", "paola", "Me gusta ese enfoque. En Bogotá todo el mundo corre y nadie escucha.", "I like that approach. In Bogotá everyone rushes and nobody listens.", []),
      message("m29", "santiago", "Por eso el cafecito ayuda: baja el ritmo y abre conversación.", "That’s why coffee helps: it slows the rhythm and opens conversation.", ["nos tomamos otro cafecito"]),
      message("m30", "paola", "Listo. Quedamos pendientes, entonces. Gracias por no echar carreta.", "Done. We’ll stay in touch, then. Thanks for not giving me a sales pitch.", ["quedamos pendientes", "no le voy a echar carreta"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: [
      { id: "col-c1-networking-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "col-c1-networking-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "col-c1-networking-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "col-c1-networking-check-4", afterMessageId: "m12", question: storyQuestions[3] },
      { id: "col-c1-networking-check-5", afterMessageId: "m15", question: storyQuestions[4] },
      { id: "col-c1-networking-check-6", afterMessageId: "m18", question: storyQuestions[5] },
      { id: "col-c1-networking-check-7", afterMessageId: "m21", question: storyQuestions[6] },
      { id: "col-c1-networking-check-8", afterMessageId: "m24", question: storyQuestions[7] },
      { id: "col-c1-networking-check-9", afterMessageId: "m27", question: storyQuestions[8] },
      { id: "col-c1-networking-check-10", afterMessageId: "m30", question: storyQuestions[9] },
    ],
    learnedVocab: networkingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: networkingVocab.map((item) => item.term),
      grammarPatterns: [
        "Polite directness with usted: le soy franco / cuénteme / me cuenta.",
        "Low-pressure Colombian follow-up: no hay afán / lo miramos con calma / sin meterle afán.",
        "Soft opportunity language: por ahí puede haber algo / de pronto le puede servir / por ahí se puede abrir una puerta.",
      ],
      speakingPrompts: [
        "Summarize a coffee meeting and suggest a low-pressure next step.",
        "Offer to connect someone with a contact without promising results.",
        "Explain why an idea sounds useful but still needs to be made concrete.",
      ],
    },
    completionTask: {
      title: "Your Bogotá networking follow-up voice note",
      instructions: "Record a 45-second follow-up after a professional coffee, using at least six phrases from the lesson.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text: "En Bogotá, un café profesional no siempre es una reunión para cerrar algo de una vez. Muchas veces es una forma de medir confianza, entender el contexto y ver si “por ahí puede haber algo”. Por eso frases como “le soy franco” y “me queda sonando” funcionan bien: muestran interés real sin sonar desesperado.",
    translation: "In Bogotá, a professional coffee is often about trust, context, and seeing whether there might be something there.",
    highlights: highlights(["por ahí puede haber algo", "le soy franco", "me queda sonando"]),
    shadowLine: "Le soy franco: esto me queda sonando.",
  },
  {
    id: "p2",
    text: "La frase “no le voy a echar carreta” baja la guardia de la otra persona. En vez de sonar como vendedor, usted se presenta como alguien que quiere conversar con claridad. Por eso también sirve decir “yo le apuesto más a conocernos primero”: en muchos espacios colombianos, la relación viene antes del negocio.",
    translation: "Not giving a sales pitch lowers the other person’s guard and makes the exchange feel clearer.",
    highlights: highlights(["no le voy a echar carreta", "yo le apuesto más a conocernos primero"]),
    shadowLine: "No le voy a echar carreta; le apuesto a conocernos primero.",
  },
  {
    id: "p3",
    text: "Una buena conversación de networking no empuja demasiado. “Si le cuadra”, “lo miramos con calma” y “no hay afán” mantienen la puerta abierta sin meter presión. Son frases útiles cuando hay interés, pero todavía falta aterrizar detalles, tiempos y expectativas.",
    translation: "Good networking keeps the door open without applying pressure.",
    highlights: highlights(["si le cuadra", "lo miramos con calma", "no hay afán"]),
    shadowLine: "Si le cuadra, lo miramos con calma. No hay afán.",
  },
  {
    id: "p4",
    text: "Cuando una idea ya empieza a sonar viable, aparecen frases como “yo le veo sentido”, “por ese lado sí me suena” y “podemos aterrizar la idea”. Estas expresiones no prometen demasiado; ayudan a pasar de la intuición a un siguiente paso concreto.",
    translation: "When an idea seems viable, these phrases move from intuition toward a concrete next step.",
    highlights: highlights(["yo le veo sentido", "por ese lado sí me suena", "podemos aterrizar la idea"]),
    shadowLine: "Yo le veo sentido; podemos aterrizar la idea.",
  },
  {
    id: "p5",
    text: "El cierre también tiene su estilo. “Le paso el contacto”, “lo puedo conectar con alguien” y “por ahí se puede abrir una puerta” ofrecen ayuda sin vender humo. Después, “quedamos pendientes”, “hagámosle seguimiento” y “sin meterle afán” convierten el café en una relación profesional que puede crecer con calma.",
    translation: "The closing offers help without overselling and turns the coffee into a relationship that can grow calmly.",
    highlights: highlights(["le paso el contacto", "lo puedo conectar con alguien", "por ahí se puede abrir una puerta", "quedamos pendientes", "hagámosle seguimiento", "sin meterle afán"]),
    shadowLine: "Quedamos pendientes y le hacemos seguimiento sin meterle afán.",
  },
];

export const colombianSpanishC1ProfessionalNetworkingCoffeeBogotaReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Colombian C1 Professional Networking Over Coffee in Bogotá",
  subtitle: "Understand Colombian Spanish for coffee meetings, trust-building, soft offers, introductions, and follow-up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading", "networking", "Bogotá"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: networkingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: [
      { id: "col-c1-networking-reading-q1", type: "multiple-choice", prompt: "According to the reading, what is a Bogotá professional coffee often for?", options: ["Measuring trust and context", "Closing a deal immediately", "Avoiding all follow-up", "Complaining about traffic"], correctAnswer: "Measuring trust and context", explanation: "The reading says it often measures trust, context, and possible opportunity.", points: 1, skillTag: "context" },
      { id: "col-c1-networking-reading-q2", type: "multiple-choice", prompt: "What does “no le voy a echar carreta” help you avoid?", options: ["Sounding like a salesperson", "Sounding polite", "Scheduling a meeting", "Offering a contact"], correctAnswer: "Sounding like a salesperson", explanation: "The reading contrasts it with sounding like a seller.", points: 1, skillTag: "tone" },
      { id: "col-c1-networking-reading-q3", type: "true-false", prompt: "True or false: “no hay afán” increases pressure on the other person.", options: ["True", "False"], correctAnswer: "False", explanation: "It lowers pressure and says there is no rush.", points: 1, skillTag: "meaning" },
      { id: "col-c1-networking-reading-q4", type: "multiple-choice", prompt: "Which phrase moves an idea from general to concrete?", options: ["Podemos aterrizar la idea", "No hay afán", "Le paso el contacto", "Me queda sonando"], correctAnswer: "Podemos aterrizar la idea", explanation: "Aterrizar la idea means making the idea concrete.", points: 1, skillTag: "phrase" },
      { id: "col-c1-networking-reading-q5", type: "multiple-choice", prompt: "How does the reading describe “por ahí se puede abrir una puerta”?", options: ["Offering possibility without overselling", "Promising a guaranteed result", "Ending the conversation", "Refusing help"], correctAnswer: "Offering possibility without overselling", explanation: "It offers help without selling smoke or guaranteeing the outcome.", points: 1, skillTag: "subtext" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "col-c1-networking-quiz-1", type: "multiple-choice", prompt: "You want to begin with polite directness in a professional coffee. What fits?", options: ["Le soy franco", "No hay afán", "Quedamos pendientes", "Le paso el contacto"], correctAnswer: "Le soy franco", explanation: "Le soy franco is a polite direct opener.", points: 1, skillTag: "opener" },
  { id: "col-c1-networking-quiz-2", type: "multiple-choice", prompt: "An idea stayed in your mind after the meeting. What do you say?", options: ["Me queda sonando", "No le voy a echar carreta", "Cuadramos un espacio", "Sin meterle afán"], correctAnswer: "Me queda sonando", explanation: "This means it keeps you thinking.", points: 1, skillTag: "interest" },
  { id: "col-c1-networking-quiz-3", type: "fill-blank", prompt: "Complete: Por ahí puede haber ____.", nativePrompt: "There might be something there.", correctAnswer: "algo", explanation: "Por ahí puede haber algo signals soft potential.", points: 1, skillTag: "opportunity" },
  { id: "col-c1-networking-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Tell me how you see it.", wordBank: ["Cuénteme", "cómo", "lo", "ve"], correctAnswer: "Cuénteme cómo lo ve", explanation: "This invites the other person’s perspective.", points: 1, skillTag: "question" },
  { id: "col-c1-networking-quiz-5", type: "true-false", prompt: "True or false: “no le voy a echar carreta” means you will give a long sales pitch.", options: ["True", "False"], correctAnswer: "False", explanation: "It means the opposite: you won’t give a sales pitch or empty talk.", points: 1, skillTag: "meaning" },
  { id: "col-c1-networking-quiz-6", type: "multiple-choice", prompt: "You prefer trust before business. What fits?", options: ["Yo le apuesto más a conocernos primero", "Le paso el contacto", "Hagámosle seguimiento", "Podemos aterrizar la idea"], correctAnswer: "Yo le apuesto más a conocernos primero", explanation: "This says you prefer getting to know each other first.", points: 1, skillTag: "relationship" },
  { id: "col-c1-networking-quiz-7", type: "multiple-choice", prompt: "You want to ask about the project’s direction. What fits?", options: ["Me interesa entender por dónde van", "No hay afán", "Por ese lado sí me suena", "Quedamos pendientes"], correctAnswer: "Me interesa entender por dónde van", explanation: "This asks where they are headed.", points: 1, skillTag: "strategy" },
  { id: "col-c1-networking-quiz-8", type: "multiple-choice", prompt: "You want to offer something softly, without pushing. What fits?", options: ["De pronto le puede servir", "Le soy franco", "No le voy a echar carreta", "Cuénteme cómo lo ve"], correctAnswer: "De pronto le puede servir", explanation: "This means maybe it could be useful to you.", points: 1, skillTag: "offer" },
  { id: "col-c1-networking-quiz-9", type: "fill-blank", prompt: "Complete: Si le ____.", nativePrompt: "If it works for you.", correctAnswer: "cuadra", explanation: "Si le cuadra means if it works for you.", points: 1, skillTag: "softener" },
  { id: "col-c1-networking-quiz-10", type: "multiple-choice", prompt: "You want to lower pressure and say there is no rush. What fits?", options: ["No hay afán", "Le paso el contacto", "Me cuenta qué le parece", "Yo le veo sentido"], correctAnswer: "No hay afán", explanation: "No hay afán directly means there’s no rush.", points: 1, skillTag: "pressure" },
  { id: "col-c1-networking-quiz-11", type: "multiple-choice", prompt: "You like one angle of the idea, but not necessarily every detail. What fits?", options: ["Por ese lado sí me suena", "No le voy a echar carreta", "Quedamos pendientes", "Sin meterle afán"], correctAnswer: "Por ese lado sí me suena", explanation: "It expresses partial agreement from that angle.", points: 1, skillTag: "agreement" },
  { id: "col-c1-networking-quiz-12", type: "order-words", prompt: "Order the phrase.", nativePrompt: "We can make the idea concrete.", wordBank: ["Podemos", "aterrizar", "la", "idea"], correctAnswer: "Podemos aterrizar la idea", explanation: "Aterrizar la idea means making it practical or concrete.", points: 1, skillTag: "planning" },
  { id: "col-c1-networking-quiz-13", type: "multiple-choice", prompt: "You want to offer an introduction. What fits?", options: ["Lo puedo conectar con alguien", "No hay afán", "Le soy franco", "Me queda sonando"], correctAnswer: "Lo puedo conectar con alguien", explanation: "This means I can connect you with someone.", points: 1, skillTag: "intro" },
  { id: "col-c1-networking-quiz-14", type: "multiple-choice", prompt: "Which phrase means “let’s follow up on it”?", options: ["Hagámosle seguimiento", "Nos tomamos otro cafecito", "Le paso el contacto", "Cuénteme cómo lo ve"], correctAnswer: "Hagámosle seguimiento", explanation: "This is the direct follow-up phrase.", points: 1, skillTag: "follow-up" },
  { id: "col-c1-networking-quiz-15", type: "true-false", prompt: "True or false: “sin meterle afán” means without rushing it or pressuring it.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a low-pressure follow-up phrase.", points: 1, skillTag: "pressure" },
];

export const colombianSpanishC1ProfessionalNetworkingCoffeeBogotaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Colombian Spanish C1: Professional Networking Over Coffee in Bogotá Quiz",
  subtitle: "Choose the right Colombian phrase for coffee meetings, soft offers, intros, and follow-up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "quiz", "networking", "Bogotá"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: { description: "Practice Colombian professional networking phrases in realistic Bogotá coffee-meeting contexts.", passScore: 75, feedbackMode: "immediate", questions: quizQuestions },
};
