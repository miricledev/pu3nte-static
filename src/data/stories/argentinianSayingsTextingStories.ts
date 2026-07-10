import type { CheckpointQuestion, Highlight, Level, StoryCharacter, StoryComprehensionCheck, StoryMessage, WhatsAppStory } from "../../types";

export type ArgentinianSaying = {
  id: string;
  number: number;
  saying: string;
  explanation: string;
};

export const argentinianSayings: ArgentinianSaying[] = [
  { id: "chancho-san-martin", number: 1, saying: "A cada chancho le llega su San Martín.", explanation: "Everyone eventually pays for what they did." },
  { id: "matrero-no-caiga", number: 2, saying: "A la corta o a la larga, no hay matrero que no caiga.", explanation: "Sooner or later, every wrongdoer gets caught." },
  { id: "quinta-pata-gato", number: 3, saying: "No busques la quinta pata al gato.", explanation: "Do not invent problems where there are none." },
  { id: "trote-dure", number: 4, saying: "Más vale trote que dure y no galope que canse.", explanation: "Slow and steady is better than rushing and burning out." },
  { id: "palabras-viento", number: 5, saying: "A las palabras se las lleva el viento.", explanation: "Words disappear; action or written proof matters more." },
  { id: "le-dicen-zapata", number: 6, saying: "A este le dicen Zapata: si no la gana, la empata.", explanation: "Someone never admits losing and twists every argument into a draw." },
  { id: "pan-migas", number: 7, saying: "Donde se come pan, migas quedan.", explanation: "Where something happened or there was abundance, traces remain." },
  { id: "locos-razon", number: 8, saying: "A los locos hay que darles siempre la razón.", explanation: "Some people are not worth arguing with." },
  { id: "gato-ratones-fiesta", number: 9, saying: "Cuando el gato no está, los ratones hacen fiesta.", explanation: "When authority is absent, people start misbehaving." },
  { id: "burro-adelante", number: 10, saying: "El burro adelante para que no se espante.", explanation: "Said when someone rudely puts themselves first." },
  { id: "jarabe-pico", number: 11, saying: "Es puro jarabe de pico.", explanation: "It is empty talk or fake promises with no action." },
  { id: "palito-yerba", number: 12, saying: "Le dio palito por yerba.", explanation: "Someone tricked him by giving something bad as if it were good." },
  { id: "chancho-chifle", number: 13, saying: "Difícil que el chancho chifle.", explanation: "That is very unlikely or almost impossible." },
  { id: "bola-sin-manija", number: 14, saying: "Andar como bola sin manija.", explanation: "To be lost, directionless, or not know what to do." },
  { id: "caballo-regalado", number: 15, saying: "A caballo regalado no se le miran los dientes.", explanation: "Do not criticize a gift." },
  { id: "carancho-rancho", number: 16, saying: "Cada carancho en su rancho.", explanation: "Everyone should stay in their own place or mind their own space." },
  { id: "cuenta-feria", number: 17, saying: "Cada cual cuenta la feria según le fue.", explanation: "Everyone tells the story according to how it affected them." },
  { id: "caballo-alcanza", number: 18, saying: "Caballo que alcanza, ganar quiere.", explanation: "If someone catches up, they are trying to win." },
  { id: "buey-solo-lame", number: 19, saying: "Buey solo bien se lame.", explanation: "Sometimes it is better to do things alone." },
  { id: "buey-cogote", number: 20, saying: "Buey solo se lame, pero no en el cogote.", explanation: "Independence is good, but sometimes you still need help." },
  { id: "cabe-sayo", number: 21, saying: "Al que le cabe el sayo, que se lo ponga.", explanation: "If the criticism fits you, accept it." },
  { id: "arbol-torcido", number: 22, saying: "Árbol que crece torcido, no se endereza jamás.", explanation: "Bad habits learned early are hard to change." },
  { id: "pisa-poncho", number: 23, saying: "A mí nadie me pisa el poncho.", explanation: "Nobody intimidates or dominates me." },
  { id: "no-levantes-perdiz", number: 24, saying: "No levantes la perdiz.", explanation: "Do not reveal the secret or draw attention to what should stay hidden." },
  { id: "vuelta-taba", number: 25, saying: "Dar vuelta la taba.", explanation: "Luck changed completely." },
  { id: "plata-mano", number: 26, saying: "Plata en mano, culo en tierra.", explanation: "Secure the money first; get paid immediately." },
  { id: "plata-baila-mono", number: 27, saying: "Por la plata baila el mono.", explanation: "People will do things for money." },
  { id: "teta-no-vaca", number: 28, saying: "Por una teta no fue vaca.", explanation: "It almost happened but failed because of one small missing detail." },
  { id: "diablo-poncho", number: 29, saying: "Donde el diablo perdió el poncho.", explanation: "A very remote place, the middle of nowhere." },
  { id: "bajo-poncho", number: 30, saying: "Traerse algo bajo el poncho.", explanation: "To have hidden intentions or be secretly planning something." },
  { id: "dios-castiga", number: 31, saying: "Dios castiga sin palo y sin rebenque.", explanation: "Karma punishes without needing visible force." },
  { id: "verdades-porotos", number: 32, saying: "De la boca salen las verdades como los porotos de la chaucha.", explanation: "People naturally reveal truths when they talk." },
  { id: "comen-dos-tres", number: 33, saying: "Donde comen dos, comen tres.", explanation: "There is always room to share food with one more person." },
  { id: "come-no-caga", number: 34, saying: "Donde se come, no se caga.", explanation: "Do not create problems where you work, live, or depend on people." },
  { id: "carne-asador", number: 35, saying: "Poner toda la carne en el asador.", explanation: "Give everything you have; use all your resources." },
  { id: "billete-tres-pesos", number: 36, saying: "Más falso que billete de tres pesos.", explanation: "Extremely fake." },
  { id: "recular-chancleta", number: 37, saying: "Más difícil que recular en chancleta.", explanation: "Very difficult." },
  { id: "turco-neblina", number: 38, saying: "Más perdido que turco en la neblina.", explanation: "Completely lost or confused; dated old-school phrase." },
  { id: "largo-esperanza", number: 39, saying: "Más largo que esperanza de pobre.", explanation: "Very long or taking forever." },
  { id: "nervioso-testigo", number: 40, saying: "Más nervioso que testigo falso.", explanation: "Extremely nervous." },
  { id: "collar-melones", number: 41, saying: "Más pesado que collar de melones.", explanation: "Very annoying or hard to deal with." },
  { id: "pirana-inodoro", number: 42, saying: "Más peligroso que piraña en inodoro.", explanation: "Extremely dangerous, in a humorous exaggerated way." },
  { id: "lento-esperanza", number: 43, saying: "Más lento que esperanza de pobre.", explanation: "Very slow." },
  { id: "duro-gallo-asado", number: 44, saying: "Más duro que gallo asado.", explanation: "Very tough, stiff, or difficult." },
  { id: "pelea-pulpos", number: 45, saying: "Más enredado que pelea de pulpos.", explanation: "Extremely complicated or messy." },
  { id: "chupete-culo", number: 46, saying: "Más desubicado que chupete en el culo.", explanation: "Very out of place or socially inappropriate; vulgar." },
  { id: "gargaras-dulce", number: 47, saying: "Más incómodo que hacer gárgaras con dulce de leche.", explanation: "Extremely awkward or uncomfortable." },
  { id: "mentiroso-cojo-ar", number: 48, saying: "Más rápido se agarra a un mentiroso que a un cojo.", explanation: "Liars get caught quickly." },
  { id: "perro-ladra", number: 49, saying: "Perro que ladra no muerde.", explanation: "People who threaten loudly often do not act." },
  { id: "piano-piano", number: 50, saying: "Piano piano se va lontano.", explanation: "Slowly and steadily, you go far." },
];

type Speaker = "male" | "female";
type MessageSeed = { speaker: Speaker; text: string; translation: string; highlights: string[] };
type CheckSeed = { question: string; correct: string; wrong: [string, string, string]; explanation: string; skill: string };
type StorySeed = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  maleName: string;
  femaleName: string;
  setting: string;
  problem: string;
  twist: string;
  goal: string;
  sayings: [number, number, number, number, number];
};

const level: Level = "upper-intermediate";

function getSaying(number: number) {
  return argentinianSayings[number - 1];
}

function h(phrases: string[]): Highlight[] {
  return phrases.map((phrase) => {
    const saying = argentinianSayings.find((item) => item.saying === phrase);
    return { phrase, meaning: saying?.explanation ?? phrase };
  });
}

function buildMessages(storyId: string, seed: StorySeed): StoryMessage[] {
  const [s1, s2, s3, s4, s5] = seed.sayings.map((number) => getSaying(number).saying);
  const messages: MessageSeed[] = [
    { speaker: "female", text: `Che, ¿viste lo de ${seed.setting}? Se armó un lío bárbaro.`, translation: `Hey, did you see what happened with ${seed.setting}? A huge mess started.`, highlights: [] },
    { speaker: "male", text: `Sí, y todo empezó por ${seed.problem}.`, translation: `Yes, and it all started because of ${seed.problem}.`, highlights: [] },
    { speaker: "female", text: "Lo peor es que nadie quiere hacerse cargo.", translation: "The worst part is that nobody wants to take responsibility.", highlights: [] },
    { speaker: "male", text: `${s1} Tarde o temprano se sabe quién hizo qué.`, translation: `${s1} Sooner or later people know who did what.`, highlights: [s1] },
    { speaker: "female", text: `Te mando nota: si seguimos con vueltas, ${seed.goal} se nos cae antes de empezar.`, translation: `I am sending a note: if we keep going in circles, ${seed.goal} falls apart before starting.`, highlights: [] },
    { speaker: "male", text: `Encima apareció ${seed.twist}, como si faltara drama.`, translation: `On top of that, ${seed.twist} appeared, as if we needed more drama.`, highlights: [] },
    { speaker: "female", text: "No me sorprende. Venían esquivando el problema hace rato.", translation: "I am not surprised. They had been dodging the problem for a while.", highlights: [] },
    { speaker: "male", text: `${s2} Nadie puede esconderse para siempre.`, translation: `${s2} Nobody can hide forever.`, highlights: [s2] },
    { speaker: "female", text: "Igual no quiero que inventemos una novela donde no la hay.", translation: "Still, I do not want us to invent a whole novel where there is none.", highlights: [] },
    { speaker: "male", text: `Exacto. ${s3} Miremos los hechos y nada más.`, translation: `Exactly. ${s3} Let us look at the facts and nothing else.`, highlights: [s3] },
    { speaker: "female", text: "Entonces: lista corta, mensajes claros y cero paranoia.", translation: "Then: short list, clear messages, and zero paranoia.", highlights: [] },
    { speaker: "male", text: "Y nada de correr como locos para quedar bien en cinco minutos.", translation: "And no running around like crazy just to look good for five minutes.", highlights: [] },
    { speaker: "female", text: `${s4} Prefiero avanzar firme aunque sea más lento.`, translation: `${s4} I prefer moving steadily even if it is slower.`, highlights: [s4] },
    { speaker: "male", text: "Me gusta. Primero confirmamos quién prometió qué.", translation: "I like it. First we confirm who promised what.", highlights: [] },
    { speaker: "female", text: `Te dejo otra nota: si alguien prometió algo, que lo ponga por escrito.`, translation: `I am leaving you another note: if someone promised something, they should put it in writing.`, highlights: [] },
    { speaker: "male", text: `${s5} Después nadie se acuerda de lo que dijo.`, translation: `${s5} Later nobody remembers what they said.`, highlights: [s5] },
    { speaker: "female", text: "Ya le escribí a todos con tres preguntas concretas.", translation: "I already wrote everyone with three concrete questions.", highlights: [] },
    { speaker: "male", text: "¿Respondieron?", translation: "Did they answer?", highlights: [] },
    { speaker: "female", text: "Dos sí. Uno mandó un audio larguísimo sin decir nada.", translation: "Two did. One sent a super long audio without saying anything.", highlights: [] },
    { speaker: "male", text: `Te resumo por voz: si no hay respuesta concreta, no cuenta como compromiso.`, translation: `I will summarize by voice: if there is no concrete answer, it does not count as a commitment.`, highlights: [] },
    { speaker: "female", text: "Buenísimo. También voy a separar chisme de dato.", translation: "Great. I will also separate gossip from facts.", highlights: [] },
    { speaker: "male", text: "Eso salva la situación. El chisme prende fuego todo.", translation: "That saves the situation. Gossip sets everything on fire.", highlights: [] },
    { speaker: "female", text: `Tenemos fecha, presupuesto y responsables. Falta cerrar ${seed.goal}.`, translation: `We have date, budget, and responsible people. We still need to close ${seed.goal}.`, highlights: [] },
    { speaker: "male", text: "Entonces les damos una hora para confirmar por escrito.", translation: "Then we give them one hour to confirm in writing.", highlights: [] },
    { speaker: "female", text: `Nota rápida: si responden con humo, seguimos sin ellos.`, translation: `Quick note: if they answer with smoke, we continue without them.`, highlights: [] },
    { speaker: "male", text: "Ahí está. Sin pelea, pero con límites.", translation: "There it is. No fight, but with limits.", highlights: [] },
    { speaker: "female", text: "Me encanta cuando un plan deja de ser drama y vuelve a ser plan.", translation: "I love when a plan stops being drama and becomes a plan again.", highlights: [] },
    { speaker: "male", text: "Y cuando los dichos sirven para pensar, no solo para sonar gracioso.", translation: "And when sayings help us think, not just sound funny.", highlights: [] },
    { speaker: "female", text: `Cierro con audio: hoy aprendimos a no correr, no inventar y pedir pruebas.`, translation: `I will close with audio: today we learned not to rush, not to invent, and to ask for proof.`, highlights: [] },
    { speaker: "male", text: `Listo. ${seed.goal} sigue en pie, pero ahora con reglas claras.`, translation: `Done. ${seed.goal} is still alive, but now with clear rules.`, highlights: [] },
  ];

  const chatMessages = messages.map((message, index) => ({
    id: `m${index + 1}`,
    speakerId: message.speaker,
    messageType: (index + 1) % 5 === 0 ? "voice-note" as const : "text" as const,
    text: message.text,
    translation: message.translation,
    audioUrl: (index + 1) % 5 === 0 ? `/audio/stories/${storyId}/m${index + 1}.mp3` : undefined,
    vocabHighlights: h(message.highlights),
  }));

  return [
    {
      id: "n1",
      speakerId: "narrator",
      messageType: "narrator",
      text: `Guía de historia: ${seed.title}. Esta conversación usa cinco dichos argentinos en contexto.`,
      translation: `Story guide: ${seed.title}. This conversation uses five Argentinian sayings in context.`,
    },
    ...chatMessages.slice(0, 15),
    {
      id: "n2",
      speakerId: "narrator",
      messageType: "narrator",
      text: "Pausa rápida: fijate qué dicho resume el conflicto, cuál da una advertencia y cuál propone una solución.",
      translation: "Quick pause: notice which saying summarizes the conflict, which gives a warning, and which proposes a solution.",
    },
    ...chatMessages.slice(15),
  ];
}

function buildChecks(seed: StorySeed): StoryComprehensionCheck[] {
  const sayings = seed.sayings.map((number) => getSaying(number).saying);
  const questions: CheckSeed[] = [
    { question: `What started the conflict in ${seed.title}?`, correct: seed.problem, wrong: ["A surprise birthday", "A football match", "A lost passport"], explanation: `The story starts with ${seed.problem}.`, skill: "gist" },
    { question: `Which saying is used to show that people eventually face consequences?`, correct: sayings[0], wrong: [sayings[2], sayings[3], sayings[4]], explanation: `${sayings[0]} points to eventual consequences.`, skill: "saying meaning" },
    { question: "What extra complication appears?", correct: seed.twist, wrong: ["A free vacation", "A new teacher", "A broken guitar"], explanation: `${seed.twist} adds pressure to the situation.`, skill: "detail" },
    { question: `Which saying warns that the truth or wrongdoer eventually comes out?`, correct: sayings[1], wrong: [sayings[0], sayings[3], sayings[4]], explanation: `${sayings[1]} is used as a warning about getting caught or revealed.`, skill: "saying meaning" },
    { question: "What does the third saying tell them not to do?", correct: "Invent problems or overcomplicate the facts", wrong: ["Spend all the money", "Cancel without thinking", "Invite more people"], explanation: `${sayings[2]} tells them not to invent problems.`, skill: "saying meaning" },
    { question: "What approach do they choose instead of rushing?", correct: "Move steadily with a short list and clear messages", wrong: ["Ignore everyone", "Start a public fight", "Change the whole plan"], explanation: "They choose a calm, steady plan.", skill: "summary" },
    { question: `Which saying supports slow, sustainable progress?`, correct: sayings[3], wrong: [sayings[0], sayings[1], sayings[4]], explanation: `${sayings[3]} favors steady effort over burning out.`, skill: "saying meaning" },
    { question: "What do they ask people to confirm?", correct: "Who promised what, in writing", wrong: ["What food they want", "Which song to play", "The weather forecast"], explanation: "They want written confirmation so promises are clear.", skill: "detail" },
    { question: `Why does "${sayings[4]}" fit the story?`, correct: "Because spoken promises can disappear without proof", wrong: ["Because the weather is windy", "Because nobody can read", "Because they dislike voice notes"], explanation: `${sayings[4]} means words need action or written proof.`, skill: "saying meaning" },
    { question: "What is the final result?", correct: `${seed.goal} continues with clear rules`, wrong: ["They cancel forever", "They lose all the messages", "They leave the city"], explanation: "The plan survives because they create limits and clarity.", skill: "theme" },
  ];

  return questions.map((item, index) => ({
    id: `check-${index + 1}`,
    afterMessageId: `m${(index + 1) * 3}`,
    question: {
      id: `q-${index + 1}`,
      type: "multiple-choice",
      prompt: item.question,
      options: [item.correct, ...item.wrong],
      correctAnswer: item.correct,
      explanation: item.explanation,
      points: 1,
      skillTag: item.skill,
    } satisfies CheckpointQuestion,
  }));
}

function makeStory(seed: StorySeed): WhatsAppStory {
  const learnedVocab = seed.sayings.map((number) => getSaying(number).saying);

  return {
    id: seed.id,
    title: seed.title,
    subtitle: seed.subtitle,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level,
    tags: ["Argentinian Sayings", "text-message-story", ...seed.tags],
    estimatedMinutes: 12,
    skoolSectionName: "Argentinian Sayings Stories",
    relatedCourse: "argentinian-sayings-50-flashcards",
    activityType: "story",
    data: {
      targetLanguage: "spanish",
      nativeLanguage: "english",
      characters: [
        { id: "female", name: seed.femaleName, initials: seed.femaleName[0], side: "right", color: "red" },
        { id: "male", name: seed.maleName, initials: seed.maleName[0], side: "left", color: "blue" },
      ] satisfies StoryCharacter[],
      messages: buildMessages(seed.id, seed),
      comprehensionChecks: buildChecks(seed),
      learnedVocab,
      finalReview: {
        keyPhrases: learnedVocab,
        grammarPatterns: ["Notice how sayings compress a whole social judgment.", "Pay attention to tone: warning, teasing, advice, or boundary.", "Retell the story using one saying naturally."],
        speakingPrompts: ["Explain which saying best fits the conflict.", "Send a short voice note using one of the five sayings.", "Invent a new situation for one saying."],
      },
      completionTask: {
        title: "Use one saying",
        instructions: "Record a short Argentinian Spanish voice note retelling the story and using one of the five sayings naturally.",
      },
    },
  };
}

const stories: StorySeed[] = [
  {
    id: "argentinian-sayings-1-the-festival-plan",
    title: "Argentinian Sayings 1 | The Festival Plan",
    subtitle: "A neighborhood festival almost collapses when promises, shortcuts, and suspicion replace clear planning.",
    tags: ["sayings-1-5", "planning", "accountability"],
    maleName: "Mateo",
    femaleName: "Lucía",
    setting: "la feria del barrio",
    problem: "un proveedor que prometió escenario, luces y sonido sin contrato",
    twist: "un audio donde se contradice con lo que dijo ayer",
    goal: "la feria",
    sayings: [1, 2, 3, 4, 5],
  },
  {
    id: "argentinian-sayings-2-the-rooftop-party",
    title: "Argentinian Sayings 2 | The Rooftop Party",
    subtitle: "A rooftop party turns into a comic power struggle when one friend vanishes and everyone tests the limits.",
    tags: ["sayings-6-10", "party", "boundaries"],
    maleName: "Tomi",
    femaleName: "Sofía",
    setting: "la fiesta en la terraza",
    problem: "un invitado que quiere ganar todas las discusiones y ponerse primero en todo",
    twist: "los chicos usando la parrilla del encargado sin pedir permiso",
    goal: "la fiesta",
    sayings: [6, 7, 8, 9, 10],
  },
  {
    id: "argentinian-sayings-3-the-market-scam",
    title: "Argentinian Sayings 3 | The Market Scam",
    subtitle: "A cheap mate set at a street market looks perfect until the bargain starts smelling like a trap.",
    tags: ["sayings-11-15", "market", "scam"],
    maleName: "Nacho",
    femaleName: "Valentina",
    setting: "el puesto de antigüedades",
    problem: "un vendedor que promete una bombilla de plata por precio ridículo",
    twist: "una caja de yerba trucha escondida abajo del mostrador",
    goal: "la compra",
    sayings: [11, 12, 13, 14, 15],
  },
  {
    id: "argentinian-sayings-4-the-coworking-race",
    title: "Argentinian Sayings 4 | The Coworking Race",
    subtitle: "Two freelancers compete for a client until independence, rivalry, and teamwork all collide.",
    tags: ["sayings-16-20", "freelance", "teamwork"],
    maleName: "Julián",
    femaleName: "Camila",
    setting: "el coworking de Palermo",
    problem: "dos propuestas para el mismo cliente y una competencia medio absurda",
    twist: "un competidor que empezó último pero alcanzó a todos",
    goal: "la presentación",
    sayings: [16, 17, 18, 19, 20],
  },
  {
    id: "argentinian-sayings-5-the-secret-rehearsal",
    title: "Argentinian Sayings 5 | The Secret Rehearsal",
    subtitle: "A surprise band rehearsal nearly gets exposed when ego, old habits, and luck change places.",
    tags: ["sayings-21-25", "music", "secret"],
    maleName: "Fede",
    femaleName: "Martina",
    setting: "el ensayo sorpresa",
    problem: "un guitarrista que llega tarde siempre y se ofende cuando se lo dicen",
    twist: "un vecino que casi revela la sorpresa en el grupo familiar",
    goal: "el recital secreto",
    sayings: [21, 22, 23, 24, 25],
  },
  {
    id: "argentinian-sayings-6-the-hidden-investor",
    title: "Argentinian Sayings 6 | The Hidden Investor",
    subtitle: "A tiny food startup gets an investor offer that sounds great until the hidden conditions appear.",
    tags: ["sayings-26-30", "startup", "money"],
    maleName: "Bruno",
    femaleName: "Rocío",
    setting: "el emprendimiento de empanadas",
    problem: "un inversor que quiere probar el producto sin pagar adelanto",
    twist: "una cláusula rara escondida en el contrato",
    goal: "el acuerdo",
    sayings: [26, 27, 28, 29, 30],
  },
  {
    id: "argentinian-sayings-7-the-asado-rescue",
    title: "Argentinian Sayings 7 | The Asado Rescue",
    subtitle: "An asado for neighbors becomes a test of hospitality, loyalty, and not making trouble where everyone eats.",
    tags: ["sayings-31-35", "asado", "community"],
    maleName: "Santi",
    femaleName: "Flor",
    setting: "el asado del consorcio",
    problem: "un vecino que critica todo pero quiere comer gratis",
    twist: "una familia nueva que llega sin estar anotada",
    goal: "el asado",
    sayings: [31, 32, 33, 34, 35],
  },
  {
    id: "argentinian-sayings-8-the-bogus-tour",
    title: "Argentinian Sayings 8 | The Bogus Tour",
    subtitle: "A tourist route through Buenos Aires goes sideways when the guide, the map, and the schedule all look suspicious.",
    tags: ["sayings-36-40", "tour", "confusion"],
    maleName: "Leo",
    femaleName: "Agustina",
    setting: "el tour alternativo por Buenos Aires",
    problem: "un guía con reseñas raras y un mapa imposible de seguir",
    twist: "una parada que queda lejísimos y no aparece en ningún lado",
    goal: "el tour",
    sayings: [36, 37, 38, 39, 40],
  },
  {
    id: "argentinian-sayings-9-the-family-bureaucracy",
    title: "Argentinian Sayings 9 | The Family Bureaucracy",
    subtitle: "A simple paperwork errand becomes dangerous, slow, tough, and unbelievably tangled.",
    tags: ["sayings-41-45", "family", "bureaucracy"],
    maleName: "Pablo",
    femaleName: "Carla",
    setting: "el trámite de la herencia",
    problem: "un primo que complica cada papel y llama cada diez minutos",
    twist: "una oficina nueva con requisitos contradictorios",
    goal: "el trámite",
    sayings: [41, 42, 43, 44, 45],
  },
  {
    id: "argentinian-sayings-10-the-stage-comeback",
    title: "Argentinian Sayings 10 | The Stage Comeback",
    subtitle: "A comedy night almost dies from awkward behavior, threats, lies, and the need to keep moving slowly.",
    tags: ["sayings-46-50", "comedy", "comeback"],
    maleName: "Ramiro",
    femaleName: "Mica",
    setting: "la noche de stand-up",
    problem: "un comediante que hace chistes fuera de lugar y después amenaza con irse",
    twist: "una mentira sobre entradas vendidas que se descubre enseguida",
    goal: "el show",
    sayings: [46, 47, 48, 49, 50],
  },
];

export const argentinianSayingsTextingStories: WhatsAppStory[] = stories.map(makeStory);
