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

const courseId = "argentinian-spanish-b2-flirty-banter-reading-interest";
const sectionName = "Argentinian Spanish - B2 Flirty Banter and Reading Interest";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const flirtingVocab: VocabItem[] = [
  { id: "tirar-onda", term: "tirar onda", meaning: "to flirt / show romantic interest", matchingMeaning: "flirt or show interest", note: "Very common in Argentina for sending flirtatious signals.", example: "Me está tirando onda.", translation: "He/she is flirting with me.", starred: true },
  { id: "chamuyar", term: "chamuyar", meaning: "to flirt through talk / smooth-talk someone", matchingMeaning: "smooth-talk flirtatiously", note: "Can be charming, exaggerated, or a little suspicious depending on tone.", example: "La está chamuyando.", translation: "He’s smooth-talking her.", starred: true },
  { id: "dar-bola", term: "dar bola", meaning: "to pay attention / respond positively / show interest", matchingMeaning: "pay attention or show interest", note: "Argentinian informal phrase; not always romantic, but often used that way in dating talk.", example: "Le está dando bola.", translation: "She’s showing interest.", starred: true },
  { id: "tener-onda", term: "tener onda", meaning: "to have chemistry / have a vibe", matchingMeaning: "have chemistry", note: "Onda is about vibe, chemistry, or natural connection.", example: "Me parece que tenemos onda.", translation: "I think we have chemistry.", starred: true },
  { id: "encarar", term: "encarar", meaning: "to approach someone / make a move", matchingMeaning: "make a move", note: "Direct but casual; often used when someone decides to actually approach.", example: "Si hay onda, encarala.", translation: "If there’s chemistry, make a move.", starred: true },
  { id: "hacerse-el-dificil", term: "hacerse el difícil / la difícil", meaning: "to play hard to get", matchingMeaning: "play hard to get", note: "Use el/la depending on the person. It can be playful or annoying.", example: "Te estás haciendo el difícil.", translation: "You’re playing hard to get.", starred: true },
  { id: "histeriquear", term: "histeriquear", meaning: "to give hot-and-cold signals / flirt while making someone chase", matchingMeaning: "give hot-and-cold signals", note: "Informal and judgmental; use carefully because it can sound critical.", example: "Me está histeriqueando.", translation: "He/she is giving me hot-and-cold signals.", starred: true },
  { id: "remarla", term: "remarla", meaning: "to keep an interaction going through effort / do all the work", matchingMeaning: "do all the work in the interaction", note: "Literally like rowing; socially, it means carrying the conversation or effort.", example: "La estoy remando yo solo.", translation: "I’m doing all the work here.", starred: true },
  { id: "chapar", term: "chapar", meaning: "to kiss / make out", matchingMeaning: "make out", note: "Very informal Argentinian dating word.", example: "¿Al final chaparon?", translation: "Did you two end up kissing?", starred: true },
  { id: "estar-en-algo", term: "estar en algo", meaning: "to have something romantic going on", matchingMeaning: "have something romantic going on", note: "Useful when the relationship is undefined.", example: "Esos dos están en algo.", translation: "Those two have something going on.", starred: true },
  { id: "levantarse-a-alguien", term: "levantarse a alguien", meaning: "to pick someone up / successfully get with someone", matchingMeaning: "successfully get with someone", note: "Informal; can sound boastful, so context matters.", example: "Se levantó a alguien.", translation: "He/she managed to get with someone.", starred: true },
  { id: "me-copa", term: "me copa", meaning: "I like it / I’m into it", matchingMeaning: "I’m into it", note: "Natural Argentinian way to say something appeals to you.", example: "Sí, me copa.", translation: "Yeah, I’m into that.", starred: true },
  { id: "me-copas", term: "me copás", meaning: "I like you / I’m into you", matchingMeaning: "I’m into you", note: "Direct and flirtatious; the accent reflects voseo.", example: "La verdad, me copás.", translation: "Honestly, I’m into you.", starred: true },
  { id: "pinto-vernos", term: "pintó vernos", meaning: "we ended up meeting / it felt right to meet", matchingMeaning: "we ended up meeting", note: "Pintó suggests something happened naturally or spontaneously.", example: "Al final pintó vernos.", translation: "In the end we ended up meeting.", starred: true },
  { id: "si-pinta", term: "si pinta…", meaning: "if it happens naturally / if we feel like it", matchingMeaning: "if it happens naturally", note: "Low-pressure way to leave a plan open.", example: "Si pinta, nos vemos.", translation: "If it feels right, we’ll meet.", starred: true },
  { id: "da-para", term: "da para…", meaning: "it’s suitable for / it’s worth / it makes sense to", matchingMeaning: "it makes sense to", note: "Very common for judging whether a plan or moment works.", example: "Da para tomar algo.", translation: "It’s worth grabbing a drink.", starred: true },
  { id: "no-da", term: "no da", meaning: "it’s not appropriate / it doesn’t make sense", matchingMeaning: "it doesn’t make sense", note: "Short, extremely useful Argentinian boundary phrase.", example: "No da seguir insistiendo.", translation: "It doesn’t make sense to keep insisting.", starred: true },
  { id: "ponerse-denso", term: "ponerse denso", meaning: "to become too intense / pushy / clingy", matchingMeaning: "become too intense", note: "Used when someone’s energy starts feeling too heavy.", example: "Se puso medio denso.", translation: "He got a bit too intense.", starred: true },
  { id: "baja-un-cambio", term: "bajá un cambio", meaning: "calm down / take it down a notch", matchingMeaning: "take it down a notch", note: "Voseo command; useful for slowing someone down.", example: "Bajá un cambio.", translation: "Take it down a notch.", starred: true },
  { id: "no-flashees", term: "no flashees", meaning: "don’t imagine too much / don’t get carried away", matchingMeaning: "don’t get carried away", note: "Very Argentinian informal warning against overreading the situation.", example: "No flashees.", translation: "Don’t get carried away.", starred: true },
  { id: "hacerse-la-pelicula", term: "hacerse la película", meaning: "to create a whole story in your head", matchingMeaning: "create a whole story in your head", note: "Often used when someone overinterprets small signals.", example: "No te hagas la película.", translation: "Don’t create a whole story in your head.", starred: true },
  { id: "cortar-el-mambo", term: "cortar el mambo", meaning: "to kill the vibe / ruin the mood", matchingMeaning: "kill the vibe", note: "Mambo here is the mood or vibe of the interaction.", example: "Cortó el mambo.", translation: "He/she killed the vibe.", starred: true },
  { id: "todo-bien-cero-drama", term: "todo bien, cero drama", meaning: "all good, no drama", matchingMeaning: "all good, no drama", note: "Casual reassurance when interest is not mutual or plans change.", example: "Todo bien, cero drama.", translation: "All good, no drama.", starred: true },
];

const highlightMap = Object.fromEntries(flirtingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = flirtingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const argentinianSpanishB2FlirtyBanterReadingInterestFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Argentinian Spanish B2: Flirty Banter & Reading Interest Flashcards",
  subtitle: "Argentinian phrases for flirting, chemistry, mixed signals, taking things naturally, and keeping boundaries relaxed.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "flashcards", "flirting", "boundaries"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: flirtingVocab.map(cardFromVocab) },
};

export const argentinianSpanishB2FlirtyBanterReadingInterestSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Argentinian Flirty Banter",
  subtitle: "Build Argentinian Spanish sentences for flirting, reading chemistry, avoiding pressure, and not overthinking signals.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["argentinian-spanish", "b2", "sentence-builder", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Argentinian Spanish voice note about someone flirting: say if there is chemistry, whether someone is overthinking, and how to keep it relaxed.",
    stages: [
      stage("stage-1", "Notice flirtation", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "He/she is flirting with me, and I think we have chemistry.", "Me está tirando onda, y me parece que tenemos onda.", "Tirar onda names the flirting. Tener onda describes the chemistry or vibe.", breakdown([["He/she is flirting with me", "Me está tirando onda"], ["I think", "me parece"], ["we have chemistry", "que tenemos onda"]])),
      stage("stage-2", "Talk and attention", sentenceVocab.slice(1, 5), sentenceVocab.slice(0, 5), "He is smooth-talking her, but she is showing interest.", "La está chamuyando, pero ella le está dando bola.", "Chamuyar is flirtatious talk; dar bola shows the other person is responding.", breakdown([["He is smooth-talking her", "La está chamuyando"], ["but", "pero"], ["she is showing interest", "ella le está dando bola"]])),
      stage("stage-3", "Make a move", sentenceVocab.slice(3, 7), sentenceVocab.slice(0, 7), "If there is chemistry, make a move, but don’t play hard to get.", "Si hay onda, encarala, pero no te hagas el difícil.", "Encarrar means making a move. Hacerse el difícil describes playing hard to get.", breakdown([["If there is chemistry", "Si hay onda"], ["make a move", "encarala"], ["don’t play hard to get", "no te hagas el difícil"]])),
      stage("stage-4", "Mixed signals", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "He/she is giving me hot-and-cold signals, and I’m doing all the work here.", "Me está histeriqueando, y la estoy remando yo solo.", "Histeriquear names hot-and-cold behavior; remarla means carrying the effort.", breakdown([["He/she is giving me hot-and-cold signals", "Me está histeriqueando"], ["I’m doing all the work", "la estoy remando"], ["by myself", "yo solo"]])),
      stage("stage-5", "Undefined situation", sentenceVocab.slice(8, 13), sentenceVocab.slice(0, 13), "Did you two end up kissing, or do you just have something going on?", "¿Al final chaparon, o solamente están en algo?", "Chapar is informal kissing/making out. Estar en algo keeps the situation undefined.", breakdown([["Did you two end up kissing?", "¿Al final chaparon?"], ["or", "o"], ["you just have something going on", "solamente están en algo"]])),
      stage("stage-6", "Natural plan", sentenceVocab.slice(11, 17), sentenceVocab.slice(0, 17), "I’m into you. If it feels right, we’ll meet; it’s worth grabbing a drink.", "Me copás. Si pinta, nos vemos; da para tomar algo.", "Me copás is direct interest. Si pinta and da para keep the plan low-pressure.", breakdown([["I’m into you", "Me copás"], ["if it feels right", "Si pinta"], ["we’ll meet", "nos vemos"], ["it’s worth grabbing a drink", "da para tomar algo"]])),
      stage("stage-7", "Boundary", sentenceVocab.slice(16, 20), sentenceVocab.slice(0, 20), "It doesn’t make sense to keep insisting. He got a bit too intense, so take it down a notch.", "No da seguir insistiendo. Se puso medio denso, así que bajá un cambio.", "No da sets a boundary; ponerse denso explains the pushy energy.", breakdown([["It doesn’t make sense", "No da"], ["to keep insisting", "seguir insistiendo"], ["he got a bit too intense", "Se puso medio denso"], ["take it down a notch", "bajá un cambio"]])),
      stage("stage-8", "Don’t overthink", sentenceVocab.slice(19), sentenceVocab, "Don’t get carried away or create a whole story in your head. All good, no drama.", "No flashees ni te hagas la película. Todo bien, cero drama.", "No flashees and no te hagas la película stop overreading. Todo bien, cero drama keeps things relaxed.", breakdown([["Don’t get carried away", "No flashees"], ["don’t create a whole story in your head", "ni te hagas la película"], ["all good, no drama", "Todo bien, cero drama"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "argentinian-b2-flirty-story-q1", type: "multiple-choice", prompt: "After message 3, what does Juli think happened at the birthday party?", options: ["Tomi was flirting with her", "Tomi was asking for money", "Fede cancelled the party", "Mica lost her phone"], correctAnswer: "Tomi was flirting with her", explanation: "Juli says Tomi me estuvo tirando onda.", points: 1, skillTag: "gist" },
  { id: "argentinian-b2-flirty-story-q2", type: "multiple-choice", prompt: "After message 6, why does Juli think there may be chemistry?", options: ["The conversation flowed and he kept looking for her", "He ignored her all night", "He left immediately", "He argued with Mica"], correctAnswer: "The conversation flowed and he kept looking for her", explanation: "Juli says they had onda and that Tomi gave her attention.", points: 1, skillTag: "detail" },
  { id: "argentinian-b2-flirty-story-q3", type: "true-false", prompt: "After message 9, true or false: Juli wants Fede to create a dramatic story in his head.", options: ["True", "False"], correctAnswer: "False", explanation: "Juli tells Fede not to flashear or hacerse la película.", points: 1, skillTag: "overthinking" },
  { id: "argentinian-b2-flirty-story-q4", type: "multiple-choice", prompt: "After message 12, what is Juli unsure about?", options: ["Whether Tomi is interested or just playing hard to get", "Whether the café exists", "Whether Fede is angry", "Whether she should move cities"], correctAnswer: "Whether Tomi is interested or just playing hard to get", explanation: "They discuss hacerse el difícil and possible histeriqueo.", points: 1, skillTag: "mixed-signals" },
  { id: "argentinian-b2-flirty-story-q5", type: "multiple-choice", prompt: "After message 15, what does Juli refuse to do?", options: ["Do all the work in the interaction", "Drink coffee", "Answer Fede", "Go home"], correctAnswer: "Do all the work in the interaction", explanation: "She says no voy a remarla yo sola.", points: 1, skillTag: "boundary" },
  { id: "argentinian-b2-flirty-story-q6", type: "multiple-choice", prompt: "After message 18, what kind of plan seems possible?", options: ["Grabbing a drink if it happens naturally", "Getting married immediately", "Blocking everyone", "Starting a work meeting"], correctAnswer: "Grabbing a drink if it happens naturally", explanation: "They use si pinta and da para tomar algo.", points: 1, skillTag: "plan" },
  { id: "argentinian-b2-flirty-story-q7", type: "true-false", prompt: "After message 21, true or false: Juli says she is into Tomi.", options: ["True", "False"], correctAnswer: "True", explanation: "She says me copa and even me copás in the message she is considering.", points: 1, skillTag: "interest" },
  { id: "argentinian-b2-flirty-story-q8", type: "multiple-choice", prompt: "After message 24, why does Juli want to be careful?", options: ["Because insisting too much or getting too intense would be wrong", "Because she hates voice notes", "Because Fede asked her for money", "Because the birthday was boring"], correctAnswer: "Because insisting too much or getting too intense would be wrong", explanation: "She says no da seguir insistiendo and worries about ponerse densa.", points: 1, skillTag: "pressure" },
  { id: "argentinian-b2-flirty-story-q9", type: "multiple-choice", prompt: "After message 27, what happened between Juli and Tomi?", options: ["They met naturally and kissed", "They had a fight", "They never spoke again", "They started a business"], correctAnswer: "They met naturally and kissed", explanation: "Juli says pintó vernos and chapamos.", points: 1, skillTag: "event" },
  { id: "argentinian-b2-flirty-story-q10", type: "multiple-choice", prompt: "By message 30, what is Juli’s final attitude?", options: ["Relaxed: if it continues, good; if not, no drama", "Panicked and demanding answers", "Angry at Fede", "Ready to chase Tomi all week"], correctAnswer: "Relaxed: if it continues, good; if not, no drama", explanation: "She ends with si pinta, buenísimo; si no, todo bien, cero drama.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const argentinianSpanishB2FlirtyBanterReadingInterestWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Argentinian B2 Story: Was That a Vibe or Just Chat?",
  subtitle: "Juli and Fede decode flirtation, chemistry, mixed signals, and how not to get carried away.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "WhatsApp", "flirting", "interest"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "juli", name: "Juli", initials: "JU", side: "right", color: "violet" },
      { id: "fede", name: "Fede", initials: "FE", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "juli", "Che, necesito que me ayudes a leer algo sin hacerme la película.", "Hey, I need you to help me read something without creating a whole story in my head.", ["hacerse la película"]),
      message("m2", "fede", "Uy, arrancamos fuerte. ¿Quién te escribió?", "Oof, strong start. Who messaged you?", []),
      message("m3", "juli", "Tomi, el del cumple de Mica. Me parece que me estuvo tirando onda toda la noche.", "Tomi, the guy from Mica’s birthday. I think he was flirting with me all night.", ["tirar onda"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "fede", "¿Tirar onda posta o chamuyo de fiesta?", "Real flirting or party smooth-talk?", ["tirar onda", "chamuyar"]),
      message("m5", "juli", "No sé. Chamuyaba bastante, pero también me escuchaba posta.", "I don’t know. He talked a lot, but he also really listened to me.", ["chamuyar"]),
      message("m6", "juli", "Cada vez que me iba a otro grupo, volvía y me daba bola.", "Every time I went to another group, he came back and paid attention to me.", ["dar bola"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "fede", "Bueno, eso suena a que tenían onda.", "Well, that sounds like you two had chemistry.", ["tener onda"]),
      message("m8", "juli", "Sí, había onda. Pero no quiero flashear por dos chistes y una mirada.", "Yeah, there was chemistry. But I don’t want to get carried away over two jokes and one look.", ["tener onda", "no flashees"]),
      message("m9", "fede", "Bien. No flashees, pero tampoco niegues todo si hubo onda.", "Good. Don’t get carried away, but don’t deny everything if there was a vibe.", ["no flashees", "tener onda"]),
      message("m10", "juli", "Encima Mica me dijo: si hay onda, encaralo. Como si fuera tan fácil.", "On top of that, Mica told me: if there’s chemistry, make a move. As if it were that easy.", ["encarar", "tener onda"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "fede", "¿Y vos querés encararlo o preferís que él mueva?", "And do you want to approach him, or would you rather he makes the move?", ["encarar"]),
      message("m12", "juli", "No sé si se está haciendo el difícil o si me está histeriqueando.", "I don’t know if he’s playing hard to get or giving me hot-and-cold signals.", ["hacerse el difícil / la difícil", "histeriquear"]),
      message("m13", "fede", "¿Por qué? ¿Te escribe y después desaparece?", "Why? Does he message you and then disappear?", []),
      message("m14", "juli", "Exacto. Me tira un chiste, me dice de vernos, y después tarda horas.", "Exactly. He sends me a joke, talks about meeting, and then takes hours.", []),
      message("m15", "juli", "Y yo no voy a remarla yo sola, ¿viste?", "And I’m not going to do all the work here, you know?", ["remarla"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "fede", "Perfecto. Si la estás remando sola, algo no cierra.", "Perfect. If you’re doing all the work alone, something doesn’t add up.", ["remarla"]),
      message("m17", "juli", "Igual me dijo: si pinta, nos vemos esta semana.", "Still, he told me: if it feels right, we’ll meet this week.", ["si pinta…"]),
      message("m18", "fede", "Eso está bien. Da para tomar algo, pero sin presión.", "That’s fine. It’s worth grabbing a drink, but without pressure.", ["da para…"]),
      message("m19", "juli", "Sí, me copa el plan. Tranqui, sin novela.", "Yeah, I’m into the plan. Relaxed, no drama story.", ["me copa"]),
      message("m20", "fede", "Bueno, entonces mandale algo simple. Nada de discurso.", "Well then send him something simple. No speech.", []),
      message("m21", "juli", "Pensaba poner: me copás, pero vamos viendo si pinta.", "I was thinking of writing: I’m into you, but let’s see if it happens naturally.", ["me copás", "si pinta…"]),
      message("m22", "fede", "Eso está bueno. Directa, pero sin ponerte intensa.", "That’s good. Direct, but without becoming intense.", [], "voice-note", `${storyAudioBase}/m22.mp3`),
      message("m23", "juli", "Claro. No da seguir insistiendo si después responde frío.", "Exactly. It doesn’t make sense to keep insisting if he replies coldly later.", ["no da"]),
      message("m24", "juli", "Y tampoco quiero ponerme densa por alguien que capaz solo chamuyaba.", "And I also don’t want to become intense over someone who maybe was just smooth-talking.", ["ponerse denso", "chamuyar"]),
      message("m25", "fede", "Ahí está. Bajá un cambio, mandá algo liviano y mirá qué hace.", "Exactly. Take it down a notch, send something light, and see what he does.", ["bajá un cambio"]),
      message("m26", "juli", "Listo. Si corta el mambo, ya fue.", "Done. If he kills the vibe, that’s it.", ["cortar el mambo"]),
      message("m27", "juli", "Actualización: pintó vernos después del laburo y chapamos.", "Update: we ended up meeting after work and kissed.", ["pintó vernos", "chapar"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "fede", "¡Pará! Entonces esos dos están en algo.", "Wait! So you two have something going on.", ["estar en algo"]),
      message("m29", "juli", "Tranqui, no digas que me levanté a alguien como si fuera campeonato.", "Relax, don’t say I picked someone up like it’s a championship.", ["levantarse a alguien"]),
      message("m30", "juli", "Si pinta seguir, buenísimo. Si no, todo bien, cero drama.", "If it naturally keeps going, great. If not, all good, no drama.", ["si pinta…", "todo bien, cero drama"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `argentinian-b2-flirty-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: flirtingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: flirtingVocab.map((item) => item.term),
      grammarPatterns: [
        "Reading chemistry: tirar onda, dar bola, tener onda.",
        "Mixed signals: hacerse el difícil, histeriquear, remarla.",
        "Boundaries and calm: no da, bajá un cambio, todo bien, cero drama.",
      ],
      speakingPrompts: [
        "Describe someone flirting at a party without sounding too intense.",
        "Say whether there is chemistry and whether it makes sense to make a move.",
        "Set a relaxed boundary if someone gives hot-and-cold signals.",
      ],
    },
    completionTask: {
      title: "Your Argentinian B2 flirty banter voice note",
      instructions: "Record a 60-second Argentinian Spanish voice note explaining whether someone is flirting, whether the other person seems interested, and how to keep it relaxed.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Argentina, decir que alguien “te tira onda” significa que está mostrando interés o coqueteando. No siempre es obvio: puede ser una mirada, un chiste, una pregunta de más o una forma especial de seguir la charla. Por eso, para leer bien la situación, no alcanza con una sola señal.", translation: "In Argentina, saying someone is flirting means they are showing interest. It is not always obvious: it can be a look, a joke, an extra question, or a special way of keeping the conversation going. That is why one signal is not enough to read the situation well.", highlights: highlights(["tirar onda"]), shadowLine: "Me parece que me está tirando onda." },
  { id: "p2", text: "“Chamuyar” puede ser divertido, pero también puede sonar vacío si la persona solo habla lindo. La diferencia aparece cuando el otro también “da bola”: escucha, responde, vuelve a buscarte y no deja que la conversación muera. Ahí ya no es solo chamuyo; puede haber interés real.", translation: "Chamuyar can be fun, but it can also sound empty if the person only talks nicely. The difference appears when the other person also pays attention: they listen, respond, come back to you, and do not let the conversation die. Then it is not only smooth talk; there may be real interest.", highlights: highlights(["chamuyar", "dar bola"]), shadowLine: "Me chamuyó, pero también me dio bola." },
  { id: "p3", text: "Cuando dos personas “tienen onda”, la charla fluye y se siente natural. En ese caso, alguien puede decir “si hay onda, encarala”. “Encarar” es animarse a acercarse o hacer un movimiento, pero no significa presionar. Si la otra persona no responde, insistir demasiado “no da”.", translation: "When two people have chemistry, the conversation flows and feels natural. In that case, someone can say if there is chemistry, make a move. Encarar means daring to approach or make a move, but it does not mean pressuring. If the other person does not respond, insisting too much does not make sense.", highlights: highlights(["tener onda", "encarar", "no da"]), shadowLine: "Si hay onda, encarala, pero no insistas si no da." },
  { id: "p4", text: "A veces el problema no es la falta de interés, sino las señales mezcladas. “Hacerse el difícil” puede ser un juego suave, pero “histeriquear” ya suena más cansador: aparecer, desaparecer, coquetear y hacer que el otro corra atrás. Si una sola persona está haciendo todo el esfuerzo, se dice que la está “remando”.", translation: "Sometimes the problem is not lack of interest, but mixed signals. Playing hard to get can be a light game, but histeriquear sounds more tiring: appearing, disappearing, flirting, and making the other person chase. If only one person is doing all the effort, they are remando it.", highlights: highlights(["hacerse el difícil / la difícil", "histeriquear", "remarla"]), shadowLine: "No quiero remarla si me está histeriqueando." },
  { id: "p5", text: "Hay frases para hablar de lo que pasa después. Si dos personas se besan, se puede decir que “chaparon”. Si todavía no son pareja, pero hay algo entre ellos, se dice que “están en algo”. Y si alguien logra conectar con otra persona en una salida, algunos dicen que “se levantó a alguien”, aunque esa frase puede sonar un poco canchera.", translation: "There are phrases for what happens afterward. If two people kiss, you can say they chaparon. If they are not a couple yet, but something is going on between them, you say están en algo. And if someone manages to connect with another person on a night out, some people say they got with someone, although that phrase can sound a bit cocky.", highlights: highlights(["chapar", "estar en algo", "levantarse a alguien"]), shadowLine: "Chaparon, pero todavía no sé si están en algo." },
  { id: "p6", text: "Para expresar interés sin ponerse pesado, sirven frases como “me copa” y “me copás”. La primera puede hablar de un plan; la segunda habla de una persona. También se puede decir “si pinta” o “pintó vernos” para mostrar que algo salió de manera natural, sin forzarlo.", translation: "To express interest without becoming heavy, phrases like me copa and me copás are useful. The first can talk about a plan; the second talks about a person. You can also say si pinta or pintó vernos to show that something happened naturally, without forcing it.", highlights: highlights(["me copa", "me copás", "si pinta…", "pintó vernos"]), shadowLine: "Me copás; si pinta, nos vemos." },
  { id: "p7", text: "La tensión aparece cuando alguien “se pone denso”. Eso puede pasar por insistir mucho, mandar demasiados mensajes o leer una señal mínima como si fuera una promesa. En ese momento, “bajá un cambio”, “no flashees” y “no te hagas la película” son frases útiles para volver a la realidad.", translation: "Tension appears when someone becomes too intense. That can happen by insisting too much, sending too many messages, or reading a tiny signal as if it were a promise. In that moment, take it down a notch, don’t get carried away, and don’t create a whole story in your head are useful phrases to return to reality.", highlights: highlights(["ponerse denso", "bajá un cambio", "no flashees", "hacerse la película"]), shadowLine: "Bajá un cambio y no te hagas la película." },
  { id: "p8", text: "El mejor coqueteo no necesita drama. Si alguien “corta el mambo”, la energía se enfría y listo. Si no hay respuesta, “todo bien, cero drama” mantiene la dignidad y baja la presión. Leer interés no es perseguir a nadie: es notar si la onda va y vuelve de los dos lados.", translation: "The best flirting does not need drama. If someone kills the vibe, the energy cools down and that is it. If there is no answer, all good, no drama keeps dignity and lowers pressure. Reading interest is not chasing anyone: it is noticing whether the vibe goes back and forth from both sides.", highlights: highlights(["cortar el mambo", "todo bien, cero drama", "tener onda"]), shadowLine: "Si corta el mambo, todo bien, cero drama." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "argentinian-b2-flirty-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Reading Argentinian flirting signals without overthinking or pressuring", "Formal job interviews", "Transport delays in Buenos Aires", "Ordering food at a café"], correctAnswer: "Reading Argentinian flirting signals without overthinking or pressuring", explanation: "The reading explains flirting, chemistry, mixed signals, natural plans, and relaxed boundaries.", points: 1, skillTag: "gist" },
  { id: "argentinian-b2-flirty-reading-q2", type: "multiple-choice", prompt: "Why is “dar bola” important in the reading?", options: ["It shows the other person is responding or paying attention", "It means the person is angry", "It means someone missed the bus", "It means someone is speaking formally"], correctAnswer: "It shows the other person is responding or paying attention", explanation: "The reading contrasts empty chamuyo with someone actually giving attention.", points: 1, skillTag: "meaning" },
  { id: "argentinian-b2-flirty-reading-q3", type: "true-false", prompt: "True or false: “histeriquear” sounds more tiring and negative than simply playing hard to get.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says histeriquear involves hot-and-cold signals and making someone chase.", points: 1, skillTag: "tone" },
  { id: "argentinian-b2-flirty-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t create a whole story in your head.", wordBank: ["No", "te", "hagas", "la", "película."], correctAnswer: "No te hagas la película.", explanation: "This phrase warns someone not to overinterpret the situation.", points: 1, skillTag: "phrase-building" },
  { id: "argentinian-b2-flirty-reading-q5", type: "multiple-choice", prompt: "Which phrase is best for keeping rejection or uncertainty relaxed?", options: ["todo bien, cero drama", "me copás", "se levantó a alguien", "encarala"], correctAnswer: "todo bien, cero drama", explanation: "Todo bien, cero drama lowers pressure and keeps dignity.", points: 1, skillTag: "boundary" },
];

export const argentinianSpanishB2FlirtyBanterReadingInterestReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Argentinian B2 Reading: Onda sin Drama",
  subtitle: "A synced Spanish reading about Argentinian flirting, chemistry, mixed signals, and staying relaxed.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "reading", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: flirtingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Argentinian B2 flirty banter and reading interest vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const argentinianSpanishB2FlirtyBanterReadingInterestQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Argentinian Spanish B2: Flirty Banter & Reading Interest Quiz",
  subtitle: "Choose the right Argentinian phrase for flirting, chemistry, mixed signals, relaxed plans, and boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Argentinian Spanish", "B2", "quiz", "flirting", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Argentinian B2 phrases for playful flirting, reading interest, and avoiding pressure.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "argentinian-b2-flirty-quiz-1", type: "multiple-choice", prompt: "Someone is clearly flirting with you. Which phrase fits?", options: ["Me está tirando onda", "Todo bien, cero drama", "No da", "Cortó el mambo"], correctAnswer: "Me está tirando onda", explanation: "Tirar onda means to flirt or show romantic interest.", points: 1, skillTag: "flirting" },
      { id: "argentinian-b2-flirty-quiz-2", type: "fill-blank", prompt: "Complete: La está ____.", nativePrompt: "He is smooth-talking/flirting with her.", correctAnswer: "chamuyando", explanation: "Chamuyar means to flirt through talk or smooth-talk someone.", points: 1, skillTag: "talk" },
      { id: "argentinian-b2-flirty-quiz-3", type: "multiple-choice", prompt: "The other person responds, listens, and gives attention. Which phrase fits?", options: ["Le está dando bola", "Se puso denso", "No flashees", "Cortó el mambo"], correctAnswer: "Le está dando bola", explanation: "Dar bola means to pay attention or show interest.", points: 1, skillTag: "signal" },
      { id: "argentinian-b2-flirty-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "If there is chemistry, make a move.", wordBank: ["Si", "hay", "onda,", "encarala."], correctAnswer: "Si hay onda, encarala.", explanation: "Tener onda is chemistry, and encarar is making a move.", points: 1, skillTag: "make-a-move" },
      { id: "argentinian-b2-flirty-quiz-5", type: "true-false", prompt: "True or false: “la estoy remando yo solo” means I’m doing all the work in the interaction.", options: ["True", "False"], correctAnswer: "True", explanation: "Remarla means carrying the effort to keep something going.", points: 1, skillTag: "effort" },
      { id: "argentinian-b2-flirty-quiz-6", type: "multiple-choice", prompt: "You want to say you are into someone directly. Which phrase fits?", options: ["Me copás", "No da", "Cortó el mambo", "Bajá un cambio"], correctAnswer: "Me copás", explanation: "Me copás means I’m into you in Argentinian voseo.", points: 1, skillTag: "interest" },
      { id: "argentinian-b2-flirty-quiz-7", type: "fill-blank", prompt: "Complete: No te hagas la ____.", nativePrompt: "Don’t create a whole story in your head.", correctAnswer: "película", explanation: "Hacerse la película means to create a whole story in your head.", points: 1, skillTag: "overthinking" },
      { id: "argentinian-b2-flirty-quiz-8", type: "multiple-choice", prompt: "Someone keeps pushing after weak replies. Which phrase sets a boundary?", options: ["No da seguir insistiendo", "Se levantó a alguien", "Pintó vernos", "Chaparon"], correctAnswer: "No da seguir insistiendo", explanation: "No da says it is not appropriate or does not make sense.", points: 1, skillTag: "boundary" },
      { id: "argentinian-b2-flirty-quiz-9", type: "true-false", prompt: "True or false: “pintó vernos” suggests the meeting happened naturally.", options: ["True", "False"], correctAnswer: "True", explanation: "Pintó suggests something happened spontaneously or naturally.", points: 1, skillTag: "natural-plan" },
      { id: "argentinian-b2-flirty-quiz-10", type: "multiple-choice", prompt: "Which phrase means the person killed the vibe?", options: ["Cortó el mambo", "Me copa", "Da para", "Dar bola"], correctAnswer: "Cortó el mambo", explanation: "Cortar el mambo means to kill the vibe or ruin the mood.", points: 1, skillTag: "vibe" },
      pairQuestion("argentinian-b2-flirty-pairs-1", "Match flirting and chemistry phrases.", flirtingVocab.slice(0, 8)),
      pairQuestion("argentinian-b2-flirty-pairs-2", "Match dating outcome and natural-plan phrases.", flirtingVocab.slice(8, 16)),
      pairQuestion("argentinian-b2-flirty-pairs-3", "Match boundary and overthinking phrases.", flirtingVocab.slice(16)),
    ],
  },
};
