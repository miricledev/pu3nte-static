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
  note: string;
  example: string;
  translation: string;
  starred?: boolean;
};

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡", "’"];
const courseId = "dominican-spanish-c1-advanced-slang-nuance-register";
const skoolSectionName = "Dominican Spanish - C1 Advanced Slang Nuance and Register";

const slangVocab: VocabItem[] = [
  { id: "que-es-lo-que-se-mueve", term: "¿Qué es lo que se mueve?", meaning: "What’s going on? / What’s happening? / What’s the move?", note: "Very informal opener for asking what is happening or what the plan is.", example: "¿Qué es lo que se mueve con la reunión?", translation: "What’s going on with the meeting?", starred: true },
  { id: "dar-carpeta", term: "dar carpeta", meaning: "to hassle someone / nag someone / keep bothering someone", note: "Usually negative: repeated pressure or annoyance.", example: "No me des carpeta con eso ahora.", translation: "Don’t hassle me about that right now.", starred: true },
  { id: "coger-lucha", term: "coger lucha", meaning: "to struggle / stress yourself out / go through unnecessary hassle", note: "Often used as advice: do not make life harder than necessary.", example: "No vale la pena coger lucha por ese comentario.", translation: "It’s not worth stressing over that comment.", starred: true },
  { id: "buscarle-el-bajadero", term: "buscarle el bajadero", meaning: "to figure out how to deal with something / find a practical way around a problem", note: "Practical problem-solving phrase.", example: "Hay un problema, pero le buscamos el bajadero.", translation: "There is a problem, but we’ll find a way around it.", starred: true },
  { id: "aguantar-vaina", term: "aguantar vaina", meaning: "to put up with bullshit / tolerate nonsense", note: "Strong informal register; use carefully.", example: "Yo no voy a aguantar vaina en ese grupo.", translation: "I’m not going to put up with nonsense in that group.", starred: true },
  { id: "coger-cuerda", term: "coger cuerda", meaning: "to take the bait / get wound up / let someone provoke you", note: "Used when someone reacts to provocation.", example: "No cojas cuerda por lo que dijo.", translation: "Don’t take the bait because of what he said.", starred: true },
  { id: "tirar-pa-bajo", term: "tirar pa’bajo", meaning: "to bring someone down / discourage / undermine someone", note: "Informal criticism of negative energy.", example: "Él siempre quiere tirar pa’bajo los proyectos.", translation: "He always wants to undermine the projects.", starred: true },
  { id: "cubear", term: "cubear", meaning: "to fool / trick / deceive someone", note: "Informal and accusatory.", example: "No me vayas a cubear con esa historia.", translation: "Don’t try to fool me with that story.", starred: true },
  { id: "brechar", term: "brechar", meaning: "to snoop / lurk / spy on what someone is doing, especially online", note: "Often used for social media lurking.", example: "Deja de brechar el perfil de la gente.", translation: "Stop snooping on people’s profiles.", starred: true },
  { id: "un-enllave", term: "un enllave", meaning: "a close connection / trusted contact / someone who can hook you up", note: "Useful for social networks and favors.", example: "Tengo un enllave que puede ayudar.", translation: "I have a trusted contact who can help.", starred: true },
  { id: "boronear", term: "boronear", meaning: "to do little side jobs / hustle for extra money", note: "Informal money/work slang.", example: "Estoy boroneando los fines de semana.", translation: "I’m doing side jobs on weekends.", starred: true },
  { id: "un-boroneo", term: "un boroneo", meaning: "a little side hustle / small money-making job", note: "Small informal job or income stream.", example: "Ese diseño fue un boroneo rápido.", translation: "That design was a quick side hustle.", starred: true },
  { id: "dar-cotorra", term: "dar cotorra", meaning: "to smooth-talk / sweet-talk / chat someone up / talk your way into something", note: "Can be charming or manipulative depending on context.", example: "Entró dando cotorra para que lo dejaran pasar.", translation: "He came in smooth-talking so they would let him in.", starred: true },
  { id: "sacar-los-pies", term: "sacar los pies", meaning: "to distance yourself from someone / stop showing up for them / abandon them", note: "Often about social loyalty.", example: "Cuando llegó el problema, sacaron los pies.", translation: "When the problem arrived, they backed away.", starred: true },
  { id: "soltar-en-banda", term: "soltar en banda", meaning: "to leave someone alone / cut someone loose / stop dealing with them", note: "Stronger than simply taking distance.", example: "Lo solté en banda porque nunca respetaba nada.", translation: "I cut him loose because he never respected anything.", starred: true },
  { id: "subir-los-vidrios", term: "subir los vidrios", meaning: "to tune someone out / ignore them completely / mentally shut them out", note: "Figurative: close the car windows to stop hearing someone.", example: "Cuando empezó a gritar, le subí los vidrios.", translation: "When he started yelling, I tuned him out.", starred: true },
  { id: "hacer-un-serrucho", term: "hacer un serrucho", meaning: "to chip in together / pool money as a group", note: "Group money contribution.", example: "Hicimos un serrucho para pagar el salón.", translation: "We all chipped in to pay for the room.", starred: true },
  { id: "pasarse-de-contento", term: "pasarse de contento", meaning: "to get carried away / take things too far", note: "Used when excitement crosses a line.", example: "Se pasó de contento con los comentarios.", translation: "He got carried away with the comments.", starred: true },
  { id: "medalaganario", term: "medalaganario / medalaganaria", meaning: "arbitrary / doing whatever the hell you feel like / without order or proper reason", note: "Strong criticism of arbitrary behavior.", example: "No seas medalaganario con las reglas.", translation: "Don’t just make arbitrary rules.", starred: true },
  { id: "un-rebu", term: "un rebú", meaning: "a mess / commotion / chaotic situation / tangled drama", note: "Useful for describing social chaos.", example: "Se armó un rebú en el grupo.", translation: "A mess broke out in the group.", starred: true },
  { id: "plagosear", term: "plagosear", meaning: "to pester / beg annoyingly / keep bothering someone for something", note: "Annoying repeated asking.", example: "No me vengas a plagosear por la clave.", translation: "Don’t come pestering me for the password.", starred: true },
  { id: "vaina", term: "vaina", meaning: "thing / situation / crap / bullshit, depending heavily on context", note: "Extremely flexible Dominican word; register depends on tone.", example: "Esa vaina se puso complicada.", translation: "That situation got complicated.", starred: true },
  { id: "resolver", term: "resolver", meaning: "to sort something out / make it work / find a solution", note: "Core Dominican survival/problem-solving verb.", example: "Tranquilo, vamos a resolver.", translation: "Relax, we’re going to sort it out.", starred: true },
  { id: "le-busco-el-bajadero", term: "le busco el bajadero", meaning: "I’ll figure out how to handle it / I’ll find a way through it", note: "First-person practical promise.", example: "Dame un día y le busco el bajadero.", translation: "Give me one day and I’ll find a way through it.", starred: true },
  { id: "no-cojas-lucha", term: "no cojas lucha", meaning: "don’t stress yourself / don’t make life difficult for yourself", note: "Common Dominican advice.", example: "No cojas lucha por gente medalaganaria.", translation: "Don’t stress over arbitrary people.", starred: true },
  { id: "no-cojas-cuerda", term: "no cojas cuerda", meaning: "don’t take the bait / don’t let them wind you up", note: "Used when someone is provoking you.", example: "No cojas cuerda, eso es para sacarte de control.", translation: "Don’t take the bait; that’s to get you out of control.", starred: true },
  { id: "me-sacaron-los-pies", term: "me sacaron los pies", meaning: "they abandoned me / stopped backing me / distanced themselves from me", note: "Personal result of someone distancing themselves.", example: "Cuando pedí apoyo, me sacaron los pies.", translation: "When I asked for support, they abandoned me.", starred: true },
  { id: "lo-solte-en-banda", term: "lo solté en banda", meaning: "I cut him loose / stopped dealing with him", note: "First-person boundary phrase.", example: "Después de eso, lo solté en banda.", translation: "After that, I cut him loose.", starred: true },
  { id: "le-subi-los-vidrios", term: "le subí los vidrios", meaning: "I tuned him/her out / completely stopped paying attention", note: "First-person shutdown phrase.", example: "Cuando empezó con excusas, le subí los vidrios.", translation: "When he started with excuses, I tuned him out.", starred: true },
  { id: "andar-boroneando", term: "andar boroneando", meaning: "to be out hustling / doing side jobs for some extra cash", note: "Ongoing side-hustle activity.", example: "Estoy andando boroneando para cubrir el viaje.", translation: "I’m out doing side jobs to cover the trip.", starred: true },
  { id: "armar-un-rebu", term: "armar un rebú", meaning: "to cause a mess / create a commotion / start drama", note: "Drama creation phrase.", example: "No armes un rebú por una pregunta simple.", translation: "Don’t start drama over a simple question.", starred: true },
  { id: "no-aguanto-vaina", term: "no aguanto vaina", meaning: "I don’t put up with bullshit / I’m not taking that nonsense", note: "Strong boundary phrase; very informal.", example: "Hoy no aguanto vaina de nadie.", translation: "Today I’m not taking nonsense from anyone.", starred: true },
  { id: "se-paso-de-contento", term: "se pasó de contento", meaning: "he/she got carried away / crossed the line", note: "Use when excitement or joking goes too far.", example: "Con ese chiste, se pasó de contento.", translation: "With that joke, he crossed the line.", starred: true },
  { id: "no-seas-medalaganario", term: "no seas medalaganario", meaning: "don’t just do whatever you feel like / don’t be so arbitrary", note: "Direct correction; use with care.", example: "No seas medalaganario, avisa antes.", translation: "Don’t be so arbitrary, give notice first.", starred: true },
  { id: "vengas-a-plagosear", term: "vengas a plagosear", meaning: "come pestering/begging me / come bothering me repeatedly", note: "Usually appears in a warning like no me vengas a plagosear.", example: "No me vengas a plagosear si no leíste el mensaje.", translation: "Don’t come pestering me if you didn’t read the message.", starred: true },
  { id: "hacer-serrucho-entre-todos", term: "hacer un serrucho entre todos", meaning: "everybody chips in / we all put some money in", note: "Full group contribution phrase.", example: "Podemos hacer un serrucho entre todos.", translation: "We can all chip in together.", starred: true },
];

const highlightMap = Object.fromEntries(slangVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: "hard",
    notes: item.note,
    specialCharacters,
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
): SentenceStage {
  return {
    id,
    title,
    newVocab,
    fullVocab,
    prompt,
    targetAnswer,
    acceptedAnswers: [targetAnswer],
    explanation,
    wordBreakdown,
    hints,
    audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3`,
  };
}

export const dominicanSpanishC1AdvancedSlangNuanceRegisterFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish C1: Advanced Slang, Nuance & Register Flashcards",
  subtitle: "High-register awareness for strong Dominican slang: pressure, drama, boundaries, side hustles, loyalty, and practical problem-solving.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c1", "flashcards", "advanced-slang", "register"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: slangVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Qué es lo que se mueve? = what’s happening?",
  "vaina = situation / nonsense",
  "resolver = sort it out",
  "buscarle el bajadero = find a practical way through",
  "le busco el bajadero = I’ll figure it out",
  "no cojas lucha = don’t stress yourself",
  "no cojas cuerda = don’t take the bait",
  "tirar pa’bajo = bring someone down",
  "dar carpeta = hassle someone",
  "plagosear = pester",
  "vengas a plagosear = come pestering",
  "aguantar vaina = put up with nonsense",
  "no aguanto vaina = I don’t put up with nonsense",
  "hacer un serrucho = chip in together",
  "hacer un serrucho entre todos = everybody chips in",
  "un boroneo = side hustle",
  "andar boroneando = be hustling for extra cash",
  "un enllave = trusted contact",
  "dar cotorra = smooth-talk",
  "cubear = trick someone",
  "brechar = snoop / lurk",
  "sacar los pies = abandon / distance yourself",
  "soltar en banda = cut someone loose",
  "subir los vidrios = tune someone out",
  "medalaganario = arbitrary",
  "un rebú = a chaotic mess",
  "pasarse de contento = get carried away",
];

export const dominicanSpanishC1AdvancedSlangNuanceRegisterSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Dominican Slang, Nuance & Register",
  subtitle: "Build advanced Dominican phrases for drama, money, boundaries, manipulation, and social repair with register awareness.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c1", "sentence-builder", "slang", "register"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a Dominican-style voice note where you describe a messy situation, set one boundary, and propose a practical solution without escalating the drama.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Ask what is happening",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "What’s happening with that situation? Are we going to sort it out or not?",
        "¿Qué es lo que se mueve con esa vaina? ¿Vamos a resolver o no?",
        "This opens with local flavor but still points toward action.",
        breakdown([["What’s happening?", "¿Qué es lo que se mueve?"], ["with that situation", "con esa vaina"], ["are we going to sort it out?", "¿vamos a resolver?"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Find a way through",
        sentenceVocab.slice(3, 5),
        sentenceVocab.slice(0, 5),
        "Don’t worry, I’ll figure out how to handle it.",
        "Tranquilo, le busco el bajadero.",
        "“Le busco el bajadero” is practical and confident: not drama, just a path forward.",
        breakdown([["Don’t worry", "Tranquilo"], ["I’ll figure out how to handle it", "le busco el bajadero"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Do not take the bait",
        sentenceVocab.slice(5, 8),
        sentenceVocab.slice(0, 8),
        "Don’t stress yourself and don’t take the bait; he just wants to bring you down.",
        "No cojas lucha y no cojas cuerda; él solo quiere tirarte pa’bajo.",
        "This separates emotional control from the other person’s provocation.",
        breakdown([["Don’t stress yourself", "No cojas lucha"], ["don’t take the bait", "no cojas cuerda"], ["bring you down", "tirarte pa’bajo"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Stop pestering",
        sentenceVocab.slice(8, 11),
        sentenceVocab.slice(0, 11),
        "Don’t hassle me and don’t come pestering me with the same thing.",
        "No me des carpeta y no me vengas a plagosear con la misma vaina.",
        "This is direct and informal; it sets a boundary against repeated pressure.",
        breakdown([["Don’t hassle me", "No me des carpeta"], ["don’t come pestering me", "no me vengas a plagosear"], ["with the same thing", "con la misma vaina"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Set a hard boundary",
        sentenceVocab.slice(11, 13),
        sentenceVocab.slice(0, 13),
        "I don’t put up with nonsense, especially when people start drama for nothing.",
        "Yo no aguanto vaina, menos cuando la gente arma un rebú por nada.",
        "Very informal, strong boundary language. Good for recognizing register, not for formal settings.",
        breakdown([["I don’t put up with nonsense", "Yo no aguanto vaina"], ["when people start drama", "cuando la gente arma un rebú"], ["for nothing", "por nada"]]),
      ),
      stage(
        "stage-6",
        "Stage 6: Suggest shared money",
        sentenceVocab.slice(13, 17),
        sentenceVocab.slice(0, 17),
        "If there is no money, we can all chip in, or I can do a small side hustle.",
        "Si no hay cuarto, hacemos un serrucho entre todos, o yo hago un boroneo.",
        "This combines group support with informal side-hustle language.",
        breakdown([["if there is no money", "si no hay cuarto"], ["we all chip in", "hacemos un serrucho entre todos"], ["a small side hustle", "un boroneo"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Spot manipulation",
        sentenceVocab.slice(17, 21),
        sentenceVocab.slice(0, 21),
        "That trusted contact smooth-talks, but sometimes he tricks people and snoops online.",
        "Ese enllave da cotorra, pero a veces cubea a la gente y se pone a brechar.",
        "At C1, the nuance is not just meaning; it is whether the phrase sounds playful, suspicious, or accusatory.",
        breakdown([["that trusted contact", "ese enllave"], ["smooth-talks", "da cotorra"], ["tricks people", "cubea a la gente"], ["snoops online", "se pone a brechar"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Cut someone loose",
        sentenceVocab.slice(21, 27),
        sentenceVocab.slice(0, 27),
        "They abandoned me, so I cut him loose and tuned him out; he crossed the line.",
        "Me sacaron los pies, así que lo solté en banda y le subí los vidrios; se pasó de contento.",
        "This is strong social boundary language: loyalty broke, so attention and access end.",
        breakdown([["They abandoned me", "Me sacaron los pies"], ["I cut him loose", "lo solté en banda"], ["I tuned him out", "le subí los vidrios"], ["he crossed the line", "se pasó de contento"]]),
      ),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyMessages: StoryMessage[] = [
  message("m1", "lucia", "¿Qué es lo que se mueve con el evento de mañana? El grupo está raro.", "What’s happening with tomorrow’s event? The group feels weird.", ["¿Qué es lo que se mueve?"], "voice-note", `${storyAudioBase}/m1.mp3`),
  message("m2", "dario", "Se armó un rebú porque Alex cambió el precio sin avisar.", "A mess started because Alex changed the price without saying anything.", ["armar un rebú", "un rebú"]),
  message("m3", "lucia", "Ese muchacho es medio medalaganario con las reglas.", "That guy is kind of arbitrary with the rules.", ["medalaganario / medalaganaria"]),
  message("m4", "dario", "Sí, pero no cojas lucha. La idea es buscarle el bajadero.", "Yes, but don’t stress. The idea is to find a practical way through.", ["no cojas lucha", "buscarle el bajadero"]),
  message("m5", "lucia", "Yo no quiero aguantar vaina de nadie si después me dejan sola.", "I don’t want to put up with nonsense from anyone if they leave me alone later.", ["aguantar vaina"]),
  message("m6", "dario", "Te entiendo. Pero si coges cuerda, Alex gana y te pone como la intensa del grupo.", "I get you. But if you take the bait, Alex wins and makes you look like the intense one in the group.", ["coger cuerda"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "lucia", "Él siempre está tirando pa’bajo cuando alguien organiza algo mejor que él.", "He is always bringing people down when someone organizes something better than him.", ["tirar pa’bajo"]),
  message("m8", "dario", "Y a veces da cotorra para que la gente le crea cualquier cuento.", "And sometimes he smooth-talks so people believe any story he tells.", ["dar cotorra"]),
  message("m9", "lucia", "¿Tú crees que nos está tratando de cubear con lo del depósito?", "Do you think he is trying to trick us with the deposit?", ["cubear"]),
  message("m10", "dario", "Puede ser. Yo vi a Karla brechando el chat viejo para comparar precios.", "Could be. I saw Karla snooping through the old chat to compare prices.", ["brechar"]),
  message("m11", "lucia", "Karla es mi enllave; si ella encontró algo, hay que escucharla.", "Karla is my trusted contact; if she found something, we need to listen to her.", ["un enllave"], "voice-note", `${storyAudioBase}/m11.mp3`),
  message("m12", "dario", "Total. Ella no anda en chisme vacío; ella resuelve.", "Totally. She is not into empty gossip; she gets things sorted.", ["resolver"]),
  message("m13", "lucia", "También está boroneando para pagar su parte, así que sabe de números.", "She is also doing side jobs to pay her part, so she knows the numbers.", ["andar boroneando", "boronear"]),
  message("m14", "dario", "Entonces propongo hacer un serrucho entre todos para lo fijo, no para caprichos.", "Then I suggest everyone chips in for the fixed costs, not for whims.", ["hacer un serrucho entre todos", "hacer un serrucho"]),
  message("m15", "lucia", "Eso sí. Pero si Alex viene a plagosear con dinero extra, le digo que no.", "Exactly. But if Alex comes pestering for extra money, I’ll tell him no.", ["plagosear", "vengas a plagosear"]),
  message("m16", "dario", "Dile suave: “No seas medalaganario; manda la lista clara y después hablamos”.", "Tell him gently: “Don’t be arbitrary; send the clear list and then we’ll talk.”", ["no seas medalaganario"], "voice-note", `${storyAudioBase}/m16.mp3`),
  message("m17", "lucia", "Suave, pero firme. Porque la vez pasada me sacaron los pies cuando hubo problema.", "Gentle, but firm. Because last time they abandoned me when there was a problem.", ["me sacaron los pies", "sacar los pies"]),
  message("m18", "dario", "Yo me acuerdo. Por eso no tienes que aguantar vaina otra vez.", "I remember. That’s why you don’t have to put up with nonsense again.", ["aguantar vaina"]),
  message("m19", "lucia", "A Alex yo casi lo solté en banda después de eso.", "I almost cut Alex loose after that.", ["soltar en banda"]),
  message("m20", "dario", "Yo sí lo solté en banda cuando empezó a inventar excusas.", "I did cut him loose when he started inventing excuses.", ["lo solté en banda"]),
  message("m21", "lucia", "Y cuando manda audio de cinco minutos, yo le subo los vidrios mentalmente.", "And when he sends a five-minute voice note, I mentally tune him out.", ["le subí los vidrios", "subir los vidrios"], "voice-note", `${storyAudioBase}/m21.mp3`),
  message("m22", "dario", "Jajaja, normal. Ese tipo se pasa de contento cuando cree que controla el grupo.", "Haha, normal. That guy gets carried away when he thinks he controls the group.", ["pasarse de contento"]),
  message("m23", "lucia", "Ya puso otro mensaje: “el que no pague hoy, no entra”.", "He already posted another message: “whoever doesn’t pay today doesn’t enter.”", []),
  message("m24", "dario", "No cojas cuerda. Esa frase es para presionar.", "Don’t take the bait. That phrase is meant to pressure people.", ["no cojas cuerda"]),
  message("m25", "lucia", "Le respondo: “No aguanto vaina. Manda desglose o dejamos eso ahí”.", "I’ll answer: “I don’t put up with nonsense. Send a breakdown or we leave it there.”", ["no aguanto vaina"]),
  message("m26", "dario", "Perfecto. Y añade: “Si falta algo real, le busco el bajadero con Karla”.", "Perfect. And add: “If something real is missing, I’ll figure out how to handle it with Karla.”", ["le busco el bajadero"], "voice-note", `${storyAudioBase}/m26.mp3`),
  message("m27", "lucia", "Listo. Karla acaba de mandar el presupuesto viejo.", "Done. Karla just sent the old budget.", []),
  message("m28", "dario", "¿Y?", "And?", []),
  message("m29", "lucia", "Alex subió el precio para cubrir un boroneo de un primo. Nada que ver.", "Alex raised the price to cover a side hustle for a cousin. Totally unrelated.", ["un boroneo"]),
  message("m30", "dario", "Entonces resolvimos: serrucho para el evento, cero caprichos y cero rebú.", "Then we solved it: chip in for the event, zero whims and zero drama.", ["resolver", "hacer un serrucho", "un rebú"]),
];

const storyChecks: NonNullable<WhatsAppStory["data"]["comprehensionChecks"]> = [
  { id: "check-1", afterMessageId: "m3", question: { id: "story-q1", type: "multiple-choice", prompt: "Why does Lucía call Alex “medalaganario”?", options: ["Because he changes rules without order", "Because he is always early", "Because he speaks formally", "Because he refuses to join the event"], correctAnswer: "Because he changes rules without order", explanation: "She says he is arbitrary with the rules after he changes the price without warning.", points: 1, skillTag: "inference" } },
  { id: "check-2", afterMessageId: "m6", question: { id: "story-q2", type: "multiple-choice", prompt: "What does Darío warn Lucía not to do?", options: ["Take the bait and look intense", "Pay everyone’s share", "Delete Karla’s messages", "Cancel the venue"], correctAnswer: "Take the bait and look intense", explanation: "He says that if she “coge cuerda,” Alex wins socially.", points: 1, skillTag: "detail" } },
  { id: "check-3", afterMessageId: "m9", question: { id: "story-q3", type: "multiple-choice", prompt: "What suspicion does Lucía have about the deposit?", options: ["Alex may be tricking them", "Karla already paid it", "The event is free", "The venue disappeared"], correctAnswer: "Alex may be tricking them", explanation: "She asks if Alex is trying to “cubear” them with the deposit.", points: 1, skillTag: "vocab" } },
  { id: "check-4", afterMessageId: "m12", question: { id: "story-q4", type: "true-false", prompt: "Darío trusts Karla because she gets things sorted.", correctAnswer: "true", explanation: "He says Karla does not do empty gossip; she resolves.", points: 1, skillTag: "detail" } },
  { id: "check-5", afterMessageId: "m15", question: { id: "story-q5", type: "multiple-choice", prompt: "What money solution does Darío suggest?", options: ["Everyone chips in for fixed costs", "Alex pays nothing", "Lucía pays for Karla", "They borrow from the venue"], correctAnswer: "Everyone chips in for fixed costs", explanation: "He suggests a “serrucho entre todos” for fixed costs, not whims.", points: 1, skillTag: "solution" } },
  { id: "check-6", afterMessageId: "m18", question: { id: "story-q6", type: "multiple-choice", prompt: "Why is Lucía careful with Alex?", options: ["People abandoned her the last time there was a problem", "She lost the address", "She hates events", "Karla told her to stay quiet"], correctAnswer: "People abandoned her the last time there was a problem", explanation: "Lucía says “me sacaron los pies” during a previous problem.", points: 1, skillTag: "context" } },
  { id: "check-7", afterMessageId: "m21", question: { id: "story-q7", type: "multiple-choice", prompt: "What does Lucía mean by “le subo los vidrios”?", options: ["She tunes Alex out mentally", "She closes a real car window", "She records his audio", "She asks him for money"], correctAnswer: "She tunes Alex out mentally", explanation: "She uses it figuratively for ignoring long voice notes.", points: 1, skillTag: "figurative-language" } },
  { id: "check-8", afterMessageId: "m24", question: { id: "story-q8", type: "true-false", prompt: "Darío thinks Alex’s message is meant to pressure people.", correctAnswer: "true", explanation: "He says not to take the bait because the phrase is for pressure.", points: 1, skillTag: "inference" } },
  { id: "check-9", afterMessageId: "m27", question: { id: "story-q9", type: "multiple-choice", prompt: "What does Darío suggest adding to Lucía’s reply?", options: ["If something real is missing, they will find a practical way through it", "Everyone should leave the group", "Karla should stop helping", "Alex should keep the extra money"], correctAnswer: "If something real is missing, they will find a practical way through it", explanation: "He suggests “le busco el bajadero con Karla.”", points: 1, skillTag: "repair" } },
  { id: "check-10", afterMessageId: "m30", question: { id: "story-q10", type: "multiple-choice", prompt: "What was the real reason Alex raised the price?", options: ["To cover a cousin’s side hustle", "To pay for the room", "To buy food for everyone", "To refund Karla"], correctAnswer: "To cover a cousin’s side hustle", explanation: "Lucía says the extra money was for a cousin’s “boroneo.”", points: 1, skillTag: "detail" } },
];

export const dominicanSpanishC1AdvancedSlangNuanceRegisterWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Dominican Spanish C1: The Price Changed Again",
  subtitle: "A tense but realistic Dominican chat about group money, pressure, boundaries, side hustles, and not taking the bait.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c1", "story", "advanced-slang", "register"],
  estimatedMinutes: 26,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "lucia", name: "Lucía", initials: "L", side: "left", color: "violet" },
      { id: "dario", name: "Darío", initials: "D", side: "right", color: "cyan" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyChecks,
    learnedVocab: slangVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["No cojas lucha.", "No cojas cuerda.", "Le busco el bajadero.", "No aguanto vaina.", "Lo solté en banda."],
      grammarPatterns: ["Figurative slang for social boundaries", "Imperatives for advice and warnings", "Register-sensitive informal intensity"],
      speakingPrompts: ["Explain a messy group-money situation.", "Tell someone not to take the bait.", "Set a boundary without escalating the conflict."],
    },
    completionTask: {
      title: "Explain the rebú calmly",
      instructions: "Record 45-60 seconds explaining a messy situation, naming the real problem, and proposing a solution using at least five C1 Dominican phrases.",
    },
  },
};

export const dominicanSpanishC1AdvancedSlangNuanceRegisterReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Register, Drama, and Survival Slang",
  subtitle: "A synced reading about advanced Dominican slang, social boundaries, manipulation, and knowing when a phrase is too strong.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c1", "reading", "shadowing", "register"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: [
      {
        id: "p1",
        text: "El slang dominicano avanzado no es solo vocabulario; también es juicio social. Una frase como “¿Qué es lo que se mueve?” puede abrir una conversación casual, pero “no aguanto vaina” es mucho más fuerte. Según el tono, puede sonar como límite duro, frustración o advertencia.",
        highlights: highlights(["¿Qué es lo que se mueve?", "no aguanto vaina", "vaina"]),
        shadowLine: "¿Qué es lo que se mueve? Yo hoy no aguanto vaina.",
      },
      {
        id: "p2",
        text: "Algunas frases describen presión. “Dar carpeta” significa que alguien te está molestando o insistiendo demasiado, mientras “plagosear” es pedir o fastidiar de manera cansona. Si alguien dice “no me vengas a plagosear”, la relación ya está tensa; no es una petición neutral.",
        highlights: highlights(["dar carpeta", "plagosear", "vengas a plagosear"]),
        shadowLine: "No me des carpeta y no me vengas a plagosear.",
      },
      {
        id: "p3",
        text: "Otras frases tienen que ver con control emocional. “Coger lucha” es complicarte o estresarte sin necesidad. “Coger cuerda” es caer en la provocación cuando alguien te busca la reacción. Consejos como “no cojas lucha” y “no cojas cuerda” protegen tanto tu paz como tu imagen.",
        highlights: highlights(["coger lucha", "coger cuerda", "no cojas lucha", "no cojas cuerda"]),
        shadowLine: "No cojas lucha y no cojas cuerda.",
      },
      {
        id: "p4",
        text: "La forma dominicana de resolver muchas veces suena práctica. “Resolver” es hacer que algo funcione, y “buscarle el bajadero” es encontrarle una salida real al problema. Si alguien dice “le busco el bajadero”, no está prometiendo perfección; está prometiendo moverse.",
        highlights: highlights(["resolver", "buscarle el bajadero", "le busco el bajadero"]),
        shadowLine: "Tranquilo, le busco el bajadero y resolvemos.",
      },
      {
        id: "p5",
        text: "El dinero y la lealtad tienen su propio vocabulario. “Hacer un serrucho” significa que varias personas ponen dinero entre todos. “Boronear” o “andar boroneando” es hacer trabajitos para conseguir algo de efectivo. “Un enllave” es un contacto de confianza, alguien que te puede conectar con una solución.",
        highlights: highlights(["hacer un serrucho", "boronear", "andar boroneando", "un enllave"]),
        shadowLine: "Hacemos un serrucho y llamo a un enllave.",
      },
      {
        id: "p6",
        text: "Las frases de límite son poderosas. “Sacar los pies” significa alejarse o dejar a alguien solo. “Soltar en banda” es cortar con alguien o dejar de bregar con esa persona. “Subir los vidrios” es ignorar por completo. No son frases ligeras; describen distancia social volviéndose real.",
        highlights: highlights(["sacar los pies", "soltar en banda", "subir los vidrios"]),
        shadowLine: "Me sacaron los pies, así que lo solté en banda.",
      },
      {
        id: "p7",
        text: "Finalmente, algunas frases juzgan comportamientos. “Pasarse de contento” significa que alguien se emocionó demasiado y cruzó una línea. “Medalaganario” describe una conducta arbitraria, sin orden ni razón clara. “Armar un rebú” es crear un lío o una conmoción. En C1, la meta no es usar todo en todas partes; es sentir qué tan fuerte suena cada frase.",
        highlights: highlights(["pasarse de contento", "medalaganario / medalaganaria", "armar un rebú", "un rebú"]),
        shadowLine: "No seas medalaganario; no armes un rebú por nada.",
      },
    ],
    glossary: highlights(slangVocab.map((item) => item.term)),
    questions: [
      { id: "reading-q1", type: "multiple-choice", prompt: "Why is “no aguanto vaina” stronger than a neutral complaint?", options: ["It sets a hard informal boundary", "It asks for directions", "It is formal office language", "It means everyone should chip in"], correctAnswer: "It sets a hard informal boundary", explanation: "The reading says it can sound like a hard boundary, frustration, or warning.", points: 1, skillTag: "register" },
      { id: "reading-q2", type: "multiple-choice", prompt: "Which pair describes emotional control?", options: ["no cojas lucha / no cojas cuerda", "un boroneo / un enllave", "brechar / cubear", "serrucho / cuarto"], correctAnswer: "no cojas lucha / no cojas cuerda", explanation: "These advise someone not to stress and not to take the bait.", points: 1, skillTag: "meaning" },
      { id: "reading-q3", type: "true-false", prompt: "“Le busco el bajadero” promises a practical path, not necessarily a perfect solution.", correctAnswer: "true", explanation: "The reading says it promises movement rather than perfection.", points: 1, skillTag: "inference" },
      { id: "reading-q4", type: "multiple-choice", prompt: "Which phrase means everybody chips in?", options: ["hacer un serrucho entre todos", "tirar pa’bajo", "subir los vidrios", "dar carpeta"], correctAnswer: "hacer un serrucho entre todos", explanation: "A serrucho is a group contribution of money.", points: 1, skillTag: "money" },
      { id: "reading-q5", type: "fill-blank", prompt: "Complete the warning: “No cojas ____.”", options: ["cuerda", "vidrios", "enllave", "boroneo"], correctAnswer: "cuerda", explanation: "“No cojas cuerda” means don’t take the bait.", points: 1, skillTag: "phrase-building" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "quiz-q1", type: "multiple-choice", prompt: "Someone is provoking you in a group chat. Which phrase warns you not to react?", options: ["no cojas cuerda", "hacer un serrucho", "un boroneo", "dar cotorra"], correctAnswer: "no cojas cuerda", explanation: "“No cojas cuerda” means don’t take the bait.", points: 1, skillTag: "context" },
  { id: "quiz-q2", type: "multiple-choice", prompt: "A friend keeps asking for the same favor annoyingly. Which verb fits?", options: ["plagosear", "resolver", "boronear", "brechar"], correctAnswer: "plagosear", explanation: "“Plagosear” is to pester or beg annoyingly.", points: 1, skillTag: "context" },
  { id: "quiz-q3", type: "multiple-choice", prompt: "You need a practical way around a problem. Choose the best phrase.", options: ["buscarle el bajadero", "tirar pa’bajo", "subir los vidrios", "sacar los pies"], correctAnswer: "buscarle el bajadero", explanation: "It means to find a practical way through a problem.", points: 1, skillTag: "problem-solving" },
  { id: "quiz-q4", type: "multiple-choice", prompt: "A group pays together for a room. What did they do?", options: ["hicieron un serrucho", "cogieron cuerda", "cubearon", "brecharon"], correctAnswer: "hicieron un serrucho", explanation: "“Hacer un serrucho” means to pool money together.", points: 1, skillTag: "money" },
  { id: "quiz-q5", type: "fill-blank", prompt: "Complete: “No me des ____ con eso ahora.”", options: ["carpeta", "vidrios", "bajadero", "enllave"], correctAnswer: "carpeta", explanation: "“Dar carpeta” means to hassle or nag someone.", points: 1, skillTag: "pressure" },
  { id: "quiz-q6", type: "fill-blank", prompt: "Complete: “Yo no aguanto ____ de nadie.”", options: ["vaina", "enllave", "serrucho", "boroneo"], correctAnswer: "vaina", explanation: "“No aguanto vaina” is a strong informal boundary phrase.", points: 1, skillTag: "boundary" },
  { id: "quiz-q7", type: "fill-blank", prompt: "Complete: “Cuando empezó a inventar excusas, lo solté en ____.”", options: ["banda", "cuerda", "carpeta", "contento"], correctAnswer: "banda", explanation: "“Soltar en banda” means to cut someone loose.", points: 1, skillTag: "boundary" },
  { id: "quiz-q8", type: "fill-blank", prompt: "Complete: “No seas ____, manda la lista clara.”", options: ["medalaganario", "boroneo", "enllave", "rebú"], correctAnswer: "medalaganario", explanation: "“Medalaganario” criticizes arbitrary behavior.", points: 1, skillTag: "register" },
  { id: "quiz-q9", type: "true-false", prompt: "“Brechar” can mean snooping or lurking online.", correctAnswer: "true", explanation: "It means to snoop, lurk, or spy on what someone is doing.", points: 1, skillTag: "meaning" },
  { id: "quiz-q10", type: "true-false", prompt: "“Cubear” means to honestly explain something.", correctAnswer: "false", explanation: "“Cubear” means to fool, trick, or deceive someone.", points: 1, skillTag: "meaning" },
  { id: "quiz-q11", type: "true-false", prompt: "“Me sacaron los pies” means people stopped backing you.", correctAnswer: "true", explanation: "It means they abandoned you or distanced themselves from you.", points: 1, skillTag: "loyalty" },
  { id: "quiz-q12", type: "true-false", prompt: "“Pasarse de contento” means someone stayed perfectly calm.", correctAnswer: "false", explanation: "It means someone got carried away or crossed the line.", points: 1, skillTag: "behavior" },
  { id: "quiz-q13", type: "match-pairs", prompt: "Match the phrase to its meaning.", pairs: [{ left: "dar cotorra", right: "smooth-talk" }, { left: "tirar pa’bajo", right: "discourage" }, { left: "brechar", right: "snoop" }, { left: "cubear", right: "trick" }], explanation: "These phrases describe manipulation, undermining, or suspicious behavior.", points: 4, skillTag: "vocab-match" },
  { id: "quiz-q14", type: "match-pairs", prompt: "Match the boundary phrase to its function.", pairs: [{ left: "le subí los vidrios", right: "I tuned him out" }, { left: "lo solté en banda", right: "I cut him loose" }, { left: "me sacaron los pies", right: "they abandoned me" }, { left: "no aguanto vaina", right: "I reject nonsense" }], explanation: "These are strong social boundary phrases.", points: 4, skillTag: "function-match" },
  { id: "quiz-q15", type: "order-words", prompt: "Put the words in order: “Don’t stress yourself.”", wordBank: ["no", "cojas", "lucha"], correctAnswer: "no cojas lucha", explanation: "The phrase is “no cojas lucha.”", points: 1, skillTag: "word-order" },
  { id: "quiz-q16", type: "order-words", prompt: "Put the words in order: “I’ll find a way through it.”", wordBank: ["le", "busco", "el", "bajadero"], correctAnswer: "le busco el bajadero", explanation: "This phrase promises a practical solution.", points: 1, skillTag: "word-order" },
  { id: "quiz-q17", type: "order-words", prompt: "Put the words in order: “They abandoned me.”", wordBank: ["me", "sacaron", "los", "pies"], correctAnswer: "me sacaron los pies", explanation: "The fixed phrase is “me sacaron los pies.”", points: 1, skillTag: "word-order" },
  { id: "quiz-q18", type: "order-words", prompt: "Put the words in order: “Everybody chips in.”", wordBank: ["hacer", "un", "serrucho", "entre", "todos"], correctAnswer: "hacer un serrucho entre todos", explanation: "This means everyone contributes money.", points: 1, skillTag: "word-order" },
  { id: "quiz-q19", type: "multiple-choice", prompt: "Someone is doing little side jobs for extra cash. What are they doing?", options: ["andando boroneando", "subiendo los vidrios", "cogiendo cuerda", "dando carpeta"], correctAnswer: "andando boroneando", explanation: "“Andar boroneando” means hustling through small side jobs.", points: 1, skillTag: "money" },
  { id: "quiz-q20", type: "multiple-choice", prompt: "A situation becomes tangled drama in the group. What is it?", options: ["un rebú", "un enllave", "un boroneo", "un bajadero"], correctAnswer: "un rebú", explanation: "“Un rebú” is a mess, commotion, or chaotic drama.", points: 1, skillTag: "context" },
];

export const dominicanSpanishC1AdvancedSlangNuanceRegisterQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Quiz: Dominican C1 Advanced Slang, Nuance & Register",
  subtitle: "Choose the right high-level Dominican slang phrase for pressure, boundaries, money, loyalty, drama, and practical solutions.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["dominican-spanish", "c1", "quiz", "slang", "register"],
  estimatedMinutes: 15,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "Test whether you can choose advanced Dominican slang according to situation, register, and social meaning.",
    passScore: 14,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
