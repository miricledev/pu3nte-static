import type { Level, SentenceBuilderLesson, SentenceStage } from "../../types";

const skoolReturnUrl = "https://www.skool.com/agedown-transform-after-50-7367/classroom/8382e0b9?md=overview";

type StageSpec = {
  title: string;
  prompt: string;
  targetAnswer: string;
  explanation: string;
  hints?: string[];
  acceptedAnswers?: string[];
  answerCatches?: NonNullable<SentenceStage["answerCatches"]>;
  wordBreakdown?: NonNullable<SentenceStage["wordBreakdown"]>;
};

function coreSlices(coreVocab: string[], index: number) {
  const end = index === 0 ? 5 : 5 + index * 2;
  const start = index === 0 ? 0 : end - 2;
  return {
    newVocab: coreVocab.slice(start, end),
    fullVocab: coreVocab.slice(0, end),
  };
}

function makeStages(coreVocab: string[], specs: StageSpec[]): SentenceStage[] {
  return specs.map((spec, index) => {
    const vocab = coreSlices(coreVocab, index);
    return {
      id: `stage-${index + 1}`,
      title: spec.title,
      ...vocab,
      prompt: spec.prompt,
      targetAnswer: spec.targetAnswer,
      acceptedAnswers: spec.acceptedAnswers,
      answerCatches: spec.answerCatches,
      hints: spec.hints,
      explanation: spec.explanation,
      wordBreakdown: spec.wordBreakdown,
    };
  });
}

function lesson(
  id: string,
  title: string,
  subtitle: string,
  level: Level,
  tags: string[],
  finalChallenge: string,
  coreVocab: string[],
  stages: StageSpec[],
): SentenceBuilderLesson {
  return {
    id,
    title,
    subtitle,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level,
    tags: ["spanish", "sentence-builder", ...tags],
    estimatedMinutes: 14,
    skoolReturnUrl,
    relatedCourse: "Spanish Sentence Builder: From A1 to C2",
    activityType: "sentence-builder",
    data: {
      finalChallenge,
      stages: makeStages(coreVocab, stages),
    },
  };
}

const a1DailyLife = [
  "I want = quiero",
  "to practise = practicar",
  "Spanish = español",
  "today = hoy",
  "because = porque",
  "I work = trabajo",
  "I need = necesito",
  "more = más",
  "after = después de",
  "class = clase",
  "I can = puedo",
  "to speak = hablar",
  "with = con",
  "people = gente",
  "every day = todos los días",
];

const a2PlansPlaces = [
  "we are going to = vamos a",
  "buy = comprar",
  "food = comida",
  "tomorrow = mañana",
  "before = antes de",
  "the class = la clase",
  "then = luego",
  "meet = encontrarnos con",
  "friends = amigos",
  "at = en",
  "the park = el parque",
  "but = pero",
  "go home = ir a casa",
  "early = temprano",
  "later = más tarde",
];

const a2PeopleOpinions = [
  "I like = me gusta",
  "to learn = aprender",
  "with = con",
  "friendly people = gente amable",
  "because = porque",
  "they help me = me ayudan",
  "a lot = mucho",
  "when = cuando",
  "I don't understand = no entiendo",
  "I prefer = prefiero",
  "simple conversations = conversaciones simples",
  "at first = al principio",
  "but = pero",
  "I want = quiero",
  "to improve = mejorar",
];

const b1ProgressProblems = [
  "I have been trying to = he estado intentando",
  "improve = mejorar",
  "my Spanish = mi español",
  "for months = durante meses",
  "but = pero",
  "I still = todavía",
  "make mistakes = cometo errores",
  "when = cuando",
  "I speak quickly = hablo rápido",
  "so = así que",
  "I record myself = me grabo",
  "every day = todos los días",
  "until = hasta que",
  "I feel confident = me sienta seguro",
  "in conversations = en conversaciones",
];

const b1StoriesExperiences = [
  "yesterday = ayer",
  "I went = fui",
  "to a café = a un café",
  "to study = a estudiar",
  "because = porque",
  "I had = tenía",
  "a lot of work = mucho trabajo",
  "but = pero",
  "I met = conocí",
  "someone = a alguien",
  "who = que",
  "spoke = hablaba",
  "very clearly = muy claro",
  "and = y",
  "helped me = me ayudó",
];

const b2OpinionsAdvice = [
  "people = la gente",
  "should = debería",
  "practise = practicar",
  "Spanish = español",
  "in real situations = en situaciones reales",
  "not only = no solo",
  "with apps = con aplicaciones",
  "because = porque",
  "confidence = la confianza",
  "comes from = viene de",
  "using the language = usar el idioma",
  "making mistakes = cometer errores",
  "receiving feedback = recibir correcciones",
  "consistently = de forma constante",
  "every week = cada semana",
];

const c1Arguments = [
  "technology = la tecnología",
  "can speed up = puede acelerar",
  "language learning = el aprendizaje de idiomas",
  "significantly = significativamente",
  "nowadays = hoy en día",
  "however = sin embargo",
  "it cannot replace = no puede reemplazar",
  "real interaction = la interacción real",
  "because = porque",
  "fluency = la fluidez",
  "depends on = depende de",
  "pressure = la presión",
  "feedback = las correcciones",
  "nuance = el matiz",
  "adaptation = la adaptación",
];

const c1EmotionsIdentity = [
  "sometimes = a veces",
  "I feel = siento que",
  "I am changing = estoy cambiando",
  "faster than = más rápido de lo que",
  "I expected = esperaba",
  "especially = especialmente",
  "when = cuando",
  "I realise = me doy cuenta de que",
  "my priorities = mis prioridades",
  "no longer = ya no",
  "are the same = son las mismas",
  "as before = de antes",
  "and = y",
  "that scares me = eso me asusta",
  "but also motivates me = pero también me motiva",
];

const c2Diplomacy = [
  "I understand = entiendo",
  "your point = tu punto",
  "to some extent = hasta cierto punto",
  "but = pero",
  "I would say that = diría que",
  "the issue = el asunto",
  "is more complex = es más complejo",
  "than it seems = de lo que parece",
  "especially when = especialmente cuando",
  "we consider = consideramos",
  "long-term consequences = las consecuencias a largo plazo",
  "instead of = en vez de",
  "focusing only on = centrarnos solo en",
  "short-term results = los resultados a corto plazo",
  "we need a broader perspective = necesitamos una perspectiva más amplia",
];

export const spanishSentenceBuilderLessons: SentenceBuilderLesson[] = [
  lesson(
    "spanish-sb-a1-daily-life-needs",
    "A1-A2 Sentence Builder 1: Daily Life, Needs & Simple Speaking",
    "Build your first useful Spanish sentences with wants, needs, ability, and basic daily language.",
    "elementary",
    ["a1-a2", "daily-life", "needs"],
    "Record a voice note using 5 sentences from this lesson. Now use these sentences in your Skool voice-note task.",
    a1DailyLife,
    [
      {
        title: "Stage 1: I want to practise today",
        prompt: "I want to practise Spanish today because it is important.",
        targetAnswer: "Quiero practicar español hoy porque es importante.",
        acceptedAnswers: ["Quiero practicar el español hoy porque es importante."],
        explanation: "After quiero, use the infinitive directly: quiero practicar. You normally do not need yo because quiero already means I want.",
        wordBreakdown: [
          { source: "I want", target: "quiero" },
          { source: "to practise Spanish", target: "practicar español" },
          { source: "today because", target: "hoy porque" },
        ],
      },
      {
        title: "Stage 2: I work and I need it",
        prompt: "I work today because I need and want to practise Spanish.",
        targetAnswer: "Trabajo hoy porque necesito y quiero practicar español.",
        explanation: "Necesito and quiero can both go before the infinitive practicar. Spanish does not need a separate word for to after these verbs.",
        wordBreakdown: [
          { source: "I work today", target: "trabajo hoy" },
          { source: "because I need and want", target: "porque necesito y quiero" },
          { source: "to practise Spanish", target: "practicar español" },
        ],
      },
      {
        title: "Stage 3: More Spanish after work",
        prompt: "After work today, I need and want to practise more Spanish because it helps me.",
        targetAnswer: "Después de mi trabajo hoy, necesito y quiero practicar más español porque me ayuda.",
        explanation: "Después de means after. Más usually goes before the thing you want more of: más español.",
        answerCatches: [
          {
            pattern: "después de trabajar hoy",
            explanation:
              "Catch: “Después de trabajar hoy” means “After working today.” The prompt says “After work today,” where work is a noun, so “Después de mi trabajo hoy” is closer. Your sentence is understandable, but it changes the structure slightly.",
          },
        ],
        hints: ["Use después de before the noun phrase.", "Más español = more Spanish."],
      },
      {
        title: "Stage 4: After class, I can practise",
        prompt: "After class today, I can practise more Spanish because I work and I need to improve.",
        targetAnswer: "Después de clase hoy, puedo practicar más español porque trabajo y necesito mejorar.",
        explanation: "Puedo also takes the infinitive directly: puedo practicar. Do not say puedo a practicar.",
        wordBreakdown: [
          { source: "after class today", target: "después de clase hoy" },
          { source: "I can practise more Spanish", target: "puedo practicar más español" },
          { source: "because I work and I need to improve", target: "porque trabajo y necesito mejorar" },
        ],
      },
      {
        title: "Stage 5: I can speak with someone",
        prompt: "After class today, I can practise and speak more Spanish with my teacher because I need it for work.",
        targetAnswer: "Después de clase hoy, puedo practicar y hablar más español con mi profesor porque lo necesito para el trabajo.",
        explanation: "Hablar is another infinitive. Con means with. Lo necesito means I need it.",
      },
      {
        title: "Stage 6: Speak with people every day",
        prompt: "After class, I can practise and speak more Spanish with people every day because I want and need to improve for work.",
        targetAnswer: "Después de clase, puedo practicar y hablar más español con gente todos los días porque quiero y necesito mejorar para el trabajo.",
        acceptedAnswers: ["Después de clase, puedo practicar y hablar más español con personas todos los días porque quiero y necesito mejorar para el trabajo."],
        explanation: "Gente sounds natural for people in this context. The whole sentence uses Spanish word order instead of copying English word by word.",
      },
    ],
  ),
  lesson(
    "spanish-sb-a2-plans-places",
    "A1-A2 Sentence Builder 2: Plans, Places & Making Arrangements",
    "Practise saying where you are going, what you are going to do, and how to make simple plans.",
    "elementary",
    ["a1-a2", "plans", "places"],
    "Record a voice note using 5 sentences from this lesson. Now use these sentences in your Skool voice-note task.",
    a2PlansPlaces,
    [
      {
        title: "Stage 1: We are going to buy food",
        prompt: "We are going to buy food tomorrow before going out.",
        targetAnswer: "Vamos a comprar comida mañana antes de salir.",
        explanation: "Vamos a + infinitive is the basic future pattern: vamos a comprar.",
      },
      {
        title: "Stage 2: Before class, then study",
        prompt: "Tomorrow we are going to buy food before class, then study.",
        targetAnswer: "Mañana vamos a comprar comida antes de la clase, luego vamos a estudiar.",
        explanation: "Luego means then. Antes de la clase means before the class.",
      },
      {
        title: "Stage 3: Meet friends",
        prompt: "Tomorrow we are going to buy food before class, then meet friends.",
        targetAnswer: "Mañana vamos a comprar comida antes de la clase, luego vamos a encontrarnos con amigos.",
        explanation: "Encontrarnos con means to meet up with. The nos is part of the reflexive form here.",
      },
      {
        title: "Stage 4: At the park",
        prompt: "Tomorrow we are going to buy food before class, then meet friends at the park.",
        targetAnswer: "Mañana vamos a comprar comida antes de la clase, luego vamos a encontrarnos con amigos en el parque.",
        explanation: "Use en for at/in a place: en el parque.",
      },
      {
        title: "Stage 5: But go home",
        prompt: "Tomorrow we are going to buy food before class, then meet friends at the park, but we are going to go home.",
        targetAnswer: "Mañana vamos a comprar comida antes de la clase, luego vamos a encontrarnos con amigos en el parque, pero vamos a ir a casa.",
        explanation: "Pero introduces a contrast or change in the plan. Ir a casa means go home.",
      },
      {
        title: "Stage 6: Later and early",
        prompt: "Tomorrow we are going to buy food before class, then meet friends at the park, but later we are going to go home early.",
        targetAnswer: "Mañana vamos a comprar comida antes de la clase, luego vamos a encontrarnos con amigos en el parque, pero más tarde vamos a ir a casa temprano.",
        explanation: "Más tarde means later. Temprano usually goes after the action: ir a casa temprano.",
      },
    ],
  ),
  lesson(
    "spanish-sb-a2-people-opinions",
    "A1-A2 Sentence Builder 3: People, Opinions & Preferences",
    "Learn to describe people, say what you like, and give simple opinions in Spanish.",
    "elementary",
    ["a1-a2", "people", "opinions"],
    "Record a voice note using 5 sentences from this lesson. Now use these sentences in your Skool voice-note task.",
    a2PeopleOpinions,
    [
      {
        title: "Stage 1: I like learning",
        prompt: "I like to learn with friendly people because it is easier.",
        targetAnswer: "Me gusta aprender con gente amable porque es más fácil.",
        explanation: "Me gusta + infinitive means I like to do something. Gente is singular grammatically, even though it means people.",
      },
      {
        title: "Stage 2: They help me a lot",
        prompt: "I like to learn with friendly people because they help me a lot.",
        targetAnswer: "Me gusta aprender con gente amable porque me ayudan mucho.",
        acceptedAnswers: ["Me gusta aprender con personas amables porque me ayudan mucho."],
        explanation: "Me ayudan means they help me. Mucho means a lot.",
      },
      {
        title: "Stage 3: When I don't understand",
        prompt: "I like to learn with friendly people because they help me a lot when I don't understand.",
        targetAnswer: "Me gusta aprender con gente amable porque me ayudan mucho cuando no entiendo.",
        explanation: "Cuando connects the situation. No entiendo means I don't understand.",
      },
      {
        title: "Stage 4: I prefer simple conversations",
        prompt: "I prefer simple conversations when I don't understand because I like to learn with friendly people who help me a lot.",
        targetAnswer: "Prefiero conversaciones simples cuando no entiendo porque me gusta aprender con gente amable que me ayuda mucho.",
        explanation: "Prefiero means I prefer. Conversaciones simples is plural, so the adjective also ends in -s.",
      },
      {
        title: "Stage 5: At first, but...",
        prompt: "At first I prefer simple conversations when I don't understand, but I like to learn with friendly people because they help me a lot.",
        targetAnswer: "Al principio prefiero conversaciones simples cuando no entiendo, pero me gusta aprender con gente amable porque me ayudan mucho.",
        explanation: "Al principio means at first. Pero joins two different ideas naturally.",
      },
      {
        title: "Stage 6: I want to improve",
        prompt: "At first I prefer simple conversations when I don't understand, but I like to learn with friendly people because they help me a lot and I want to improve.",
        targetAnswer: "Al principio prefiero conversaciones simples cuando no entiendo, pero me gusta aprender con gente amable porque me ayudan mucho y quiero mejorar.",
        explanation: "Quiero mejorar follows the same pattern as quiero practicar: querer + infinitive.",
      },
    ],
  ),
  lesson(
    "spanish-sb-b1-progress-problems",
    "B1-B2 Sentence Builder 1: Progress, Problems & Confidence",
    "Explain your Spanish-learning journey, your problems, and what you are trying to improve.",
    "intermediate",
    ["b1-b2", "progress", "confidence"],
    "Record a voice note explaining your progress with Spanish and what you are doing to improve. Now use these sentences in your Skool voice-note task.",
    b1ProgressProblems,
    [
      {
        title: "Stage 1: I have been trying",
        prompt: "I have been trying to improve my Spanish for months, but I need more practice.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero necesito más práctica.",
        explanation: "He estado intentando + infinitive is useful for I have been trying to. It shows an effort over time.",
      },
      {
        title: "Stage 2: I still make mistakes",
        prompt: "I have been trying to improve my Spanish for months, but I still make mistakes.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero todavía cometo errores.",
        explanation: "Todavía means still. Cometo errores is the natural phrase for I make mistakes.",
      },
      {
        title: "Stage 3: When I speak quickly",
        prompt: "I have been trying to improve my Spanish for months, but I still make mistakes when I speak quickly.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero todavía cometo errores cuando hablo rápido.",
        explanation: "Cuando connects a real situation: cuando hablo rápido.",
      },
      {
        title: "Stage 4: So I record myself",
        prompt: "I have been trying to improve my Spanish for months, but I still make mistakes when I speak quickly, so I record myself.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero todavía cometo errores cuando hablo rápido, así que me grabo.",
        explanation: "Así que means so / therefore. Me grabo means I record myself.",
      },
      {
        title: "Stage 5: Every day until...",
        prompt: "I have been trying to improve my Spanish for months, but I still make mistakes when I speak quickly, so I record myself every day until I improve.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero todavía cometo errores cuando hablo rápido, así que me grabo todos los días hasta que mejore.",
        explanation: "Hasta que can trigger the subjunctive when the result is not certain yet. Mejore is an introductory example of that.",
      },
      {
        title: "Stage 6: Until I feel confident",
        prompt: "I have been trying to improve my Spanish for months, but I still make mistakes when I speak quickly, so I record myself every day until I feel confident in conversations.",
        targetAnswer: "He estado intentando mejorar mi español durante meses, pero todavía cometo errores cuando hablo rápido, así que me grabo todos los días hasta que me sienta seguro en conversaciones.",
        explanation: "Me sienta seguro is used after hasta que because this confidence is a future goal, not a current fact.",
      },
    ],
  ),
  lesson(
    "spanish-sb-b1-stories-experiences",
    "B1-B2 Sentence Builder 2: Stories, Experiences & Past Actions",
    "Build stronger Spanish sentences about what happened, what you did, and what you learned.",
    "intermediate",
    ["b1-b2", "stories", "past"],
    "Record a voice note explaining your progress with Spanish and what you are doing to improve. Now use these sentences in your Skool voice-note task.",
    b1StoriesExperiences,
    [
      {
        title: "Stage 1: Yesterday I went",
        prompt: "Yesterday I went to a café to study because I wanted to practise.",
        targetAnswer: "Ayer fui a un café a estudiar porque quería practicar.",
        explanation: "Fui a + place means I went to a place. A estudiar means in order to study.",
      },
      {
        title: "Stage 2: I had a lot of work",
        prompt: "Yesterday I went to a café to study because I had a lot of work.",
        targetAnswer: "Ayer fui a un café a estudiar porque tenía mucho trabajo.",
        explanation: "Tenía describes the situation/background: I had a lot of work.",
      },
      {
        title: "Stage 3: But I met...",
        prompt: "Yesterday I went to a café to study because I had a lot of work, but I met a teacher.",
        targetAnswer: "Ayer fui a un café a estudiar porque tenía mucho trabajo, pero conocí a un profesor.",
        explanation: "Conocí is used for meeting someone for the first time. Spanish uses a before a specific person.",
      },
      {
        title: "Stage 4: Someone who...",
        prompt: "Yesterday I went to a café to study because I had a lot of work, but I met someone who was patient.",
        targetAnswer: "Ayer fui a un café a estudiar porque tenía mucho trabajo, pero conocí a alguien que era paciente.",
        explanation: "Alguien que means someone who. Que connects the description.",
      },
      {
        title: "Stage 5: Spoke very clearly",
        prompt: "Yesterday I went to a café to study because I had a lot of work, but I met someone who spoke very clearly.",
        targetAnswer: "Ayer fui a un café a estudiar porque tenía mucho trabajo, pero conocí a alguien que hablaba muy claro.",
        explanation: "Hablaba describes how the person spoke as background or ongoing description.",
      },
      {
        title: "Stage 6: And helped me",
        prompt: "Yesterday I went to a café to study because I had a lot of work, but I met someone who spoke very clearly and helped me.",
        targetAnswer: "Ayer fui a un café a estudiar porque tenía mucho trabajo, pero conocí a alguien que hablaba muy claro y me ayudó.",
        explanation: "Me ayudó is a completed past action: helped me. This is a simple, natural storytelling sentence.",
      },
    ],
  ),
  lesson(
    "spanish-sb-b2-opinions-advice",
    "B1-B2 Sentence Builder 3: Opinions, Advice & Real-Life Decisions",
    "Practise giving advice, explaining opinions, and talking about decisions naturally.",
    "upper-intermediate",
    ["b1-b2", "opinions", "advice"],
    "Record a voice note explaining your progress with Spanish and what you are doing to improve. Now use these sentences in your Skool voice-note task.",
    b2OpinionsAdvice,
    [
      {
        title: "Stage 1: People should practise",
        prompt: "People should practise Spanish in real situations.",
        targetAnswer: "La gente debería practicar español en situaciones reales.",
        explanation: "Debería + infinitive gives advice. La gente is singular in Spanish, so use debería.",
      },
      {
        title: "Stage 2: Not only with apps",
        prompt: "People should practise Spanish in real situations, not only with apps.",
        targetAnswer: "La gente debería practicar español en situaciones reales, no solo con aplicaciones.",
        explanation: "No solo introduces a contrast and prepares a fuller opinion.",
      },
      {
        title: "Stage 3: Because confidence...",
        prompt: "People should practise Spanish in real situations, not only with apps, because confidence is important.",
        targetAnswer: "La gente debería practicar español en situaciones reales, no solo con aplicaciones, porque la confianza es importante.",
        explanation: "Porque gives the reason behind your advice.",
      },
      {
        title: "Stage 4: Comes from using",
        prompt: "People should practise Spanish in real situations, not only with apps, because confidence comes from using the language.",
        targetAnswer: "La gente debería practicar español en situaciones reales, no solo con aplicaciones, porque la confianza viene de usar el idioma.",
        explanation: "Spanish often uses an infinitive where English uses -ing: using the language = usar el idioma.",
      },
      {
        title: "Stage 5: Mistakes and feedback",
        prompt: "People should practise Spanish in real situations, not only with apps, because confidence comes from using the language, making mistakes, and receiving feedback.",
        targetAnswer: "La gente debería practicar español en situaciones reales, no solo con aplicaciones, porque la confianza viene de usar el idioma, cometer errores y recibir correcciones.",
        explanation: "Keep the list parallel with infinitives: usar, cometer, recibir.",
      },
      {
        title: "Stage 6: Consistently every week",
        prompt: "People should practise Spanish in real situations, not only with apps, because confidence comes from using the language, making mistakes, and receiving feedback consistently every week.",
        targetAnswer: "La gente debería practicar español en situaciones reales, no solo con aplicaciones, porque la confianza viene de usar el idioma, cometer errores y recibir correcciones de forma constante cada semana.",
        explanation: "De forma constante sounds natural for consistently. Cada semana adds a realistic rhythm.",
      },
    ],
  ),
  lesson(
    "spanish-sb-c1-nuanced-arguments",
    "C1-C2 Sentence Builder 1: Nuanced Opinions & Complex Arguments",
    "Build advanced Spanish sentences for expressing balanced ideas, causes, consequences, and nuance.",
    "advanced",
    ["c1-c2", "arguments", "technology"],
    "Record a voice note using one advanced sentence to express a nuanced opinion. Now use these sentences in your Skool voice-note task.",
    c1Arguments,
    [
      {
        title: "Stage 1: Technology can accelerate",
        prompt: "Nowadays, technology can significantly speed up language learning.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas.",
        explanation: "This sounds advanced because it uses abstract nouns and a precise verb: acelerar.",
      },
      {
        title: "Stage 2: However, it cannot replace",
        prompt: "Nowadays, technology can significantly speed up language learning; however, it cannot replace human practice.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas; sin embargo, no puede reemplazar la práctica humana.",
        explanation: "Sin embargo is a mature connector. A semicolon is optional, but useful for linking two balanced ideas.",
      },
      {
        title: "Stage 3: Real interaction",
        prompt: "Nowadays, technology can significantly speed up language learning; however, it cannot replace real interaction because we need people.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas; sin embargo, no puede reemplazar la interacción real porque necesitamos personas.",
        explanation: "La interacción real is more abstract and precise than just la práctica.",
      },
      {
        title: "Stage 4: Fluency depends on...",
        prompt: "Nowadays, technology can significantly speed up language learning; however, it cannot replace real interaction because fluency depends on human practice.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas; sin embargo, no puede reemplazar la interacción real porque la fluidez depende de la práctica humana.",
        explanation: "Depende de is the fixed phrase for depends on. Do not translate it as depende en.",
      },
      {
        title: "Stage 5: Pressure and feedback",
        prompt: "Nowadays, technology can significantly speed up language learning; however, it cannot replace real interaction because fluency depends on pressure and feedback.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas; sin embargo, no puede reemplazar la interacción real porque la fluidez depende de la presión y las correcciones.",
        explanation: "Abstract nouns like la presión and las correcciones make the argument more specific.",
      },
      {
        title: "Stage 6: Nuance and adaptation",
        prompt: "Nowadays, technology can significantly speed up language learning; however, it cannot replace real interaction because fluency depends on pressure, feedback, nuance, and adaptation.",
        targetAnswer: "Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas; sin embargo, no puede reemplazar la interacción real porque la fluidez depende de la presión, las correcciones, el matiz y la adaptación.",
        acceptedAnswers: ["Hoy en día, la tecnología puede acelerar significativamente el aprendizaje de idiomas, sin embargo, no puede reemplazar la interacción real porque la fluidez depende de la presión, las correcciones, el matiz y la adaptación."],
        explanation: "This is a C1-style sentence: balanced claim, connector, limitation, and abstract reasons.",
      },
    ],
  ),
  lesson(
    "spanish-sb-c1-emotions-identity",
    "C1-C2 Sentence Builder 2: Emotions, Identity & Deep Conversation",
    "Practise deeper Spanish for feelings, motivation, identity, relationships, and personal change.",
    "advanced",
    ["c1-c2", "emotions", "identity"],
    "Record a voice note using one advanced sentence to express a nuanced opinion. Now use these sentences in your Skool voice-note task.",
    c1EmotionsIdentity,
    [
      {
        title: "Stage 1: I feel I am changing",
        prompt: "Sometimes I feel that I am changing faster than I expected.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba.",
        explanation: "Siento que introduces an inner feeling. Más rápido de lo que esperaba means faster than I expected.",
      },
      {
        title: "Stage 2: Especially when",
        prompt: "Sometimes I feel that I am changing faster than I expected, especially when I am alone.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando estoy solo.",
        acceptedAnswers: ["A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando estoy sola."],
        explanation: "Especialmente cuando adds emotional context and makes the sentence more reflective.",
      },
      {
        title: "Stage 3: I realise my priorities",
        prompt: "Sometimes I feel that I am changing faster than I expected, especially when I realise that my priorities are different.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando me doy cuenta de que mis prioridades son diferentes.",
        explanation: "Me doy cuenta de que is the natural pattern for I realise that.",
      },
      {
        title: "Stage 4: No longer the same",
        prompt: "Sometimes I feel that I am changing faster than I expected, especially when I realise that my priorities are no longer the same.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando me doy cuenta de que mis prioridades ya no son las mismas.",
        explanation: "Ya no means no longer. Las mismas agrees with prioridades.",
      },
      {
        title: "Stage 5: As before, and...",
        prompt: "Sometimes I feel that I am changing faster than I expected, especially when I realise that my priorities are no longer the same as before, and that is difficult.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando me doy cuenta de que mis prioridades ya no son las mismas de antes, y eso es difícil.",
        explanation: "De antes means from before / as before. Eso points back to the whole idea.",
      },
      {
        title: "Stage 6: Scares and motivates me",
        prompt: "Sometimes I feel that I am changing faster than I expected, especially when I realise that my priorities are no longer the same as before, and that scares me but also motivates me.",
        targetAnswer: "A veces siento que estoy cambiando más rápido de lo que esperaba, especialmente cuando me doy cuenta de que mis prioridades ya no son las mismas de antes, y eso me asusta pero también me motiva.",
        explanation: "Me asusta and me motiva express emotional nuance. This is deeper, more personal Spanish.",
      },
    ],
  ),
  lesson(
    "spanish-sb-c2-diplomacy-precision",
    "C1-C2 Sentence Builder 3: Diplomacy, Precision & Advanced Communication",
    "Learn to disagree politely, express uncertainty, and speak with more precision in advanced Spanish.",
    "advanced",
    ["c1-c2", "diplomacy", "precision"],
    "Record a voice note using one advanced sentence to express a nuanced opinion. Now use these sentences in your Skool voice-note task.",
    c2Diplomacy,
    [
      {
        title: "Stage 1: I understand your point",
        prompt: "I understand your point to some extent, but I would say that we need more context.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que necesitamos más contexto.",
        explanation: "This softens disagreement. Diría que sounds more diplomatic than saying estás equivocado.",
      },
      {
        title: "Stage 2: The issue is complex",
        prompt: "I understand your point to some extent, but I would say that the issue is more complex.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo.",
        explanation: "El asunto sounds professional and neutral. It avoids making the disagreement personal.",
      },
      {
        title: "Stage 3: Than it seems",
        prompt: "I understand your point to some extent, but I would say that the issue is more complex than it seems, especially when information is missing.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo de lo que parece, especialmente cuando falta información.",
        explanation: "De lo que parece means than it seems. Especialmente cuando adds precision.",
      },
      {
        title: "Stage 4: Long-term consequences",
        prompt: "I understand your point to some extent, but I would say that the issue is more complex than it seems, especially when we consider long-term consequences.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo de lo que parece, especialmente cuando consideramos las consecuencias a largo plazo.",
        explanation: "Consideramos sounds analytical. Las consecuencias a largo plazo is formal but clear.",
      },
      {
        title: "Stage 5: Instead of focusing only on...",
        prompt: "I understand your point to some extent, but I would say that the issue is more complex than it seems, especially when we consider long-term consequences instead of focusing only on speed.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo de lo que parece, especialmente cuando consideramos las consecuencias a largo plazo en vez de centrarnos solo en la rapidez.",
        explanation: "En vez de is followed by an infinitive in Spanish: centrarnos. This is a common advanced pattern.",
      },
      {
        title: "Stage 6: A broader perspective",
        prompt: "I understand your point to some extent, but I would say that the issue is more complex than it seems, especially when we consider long-term consequences; instead of focusing only on short-term results, we need a broader perspective.",
        targetAnswer: "Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo de lo que parece, especialmente cuando consideramos las consecuencias a largo plazo; en vez de centrarnos solo en los resultados a corto plazo, necesitamos una perspectiva más amplia.",
        acceptedAnswers: ["Entiendo tu punto hasta cierto punto, pero diría que el asunto es más complejo de lo que parece, especialmente cuando consideramos las consecuencias a largo plazo, en vez de centrarnos solo en los resultados a corto plazo, necesitamos una perspectiva más amplia."],
        explanation: "This sentence is diplomatic: it validates the other person, softens disagreement, and proposes a broader perspective.",
      },
    ],
  ),
];
