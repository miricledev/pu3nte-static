import type { CheckpointQuestion, Highlight, Level, StoryCharacter, StoryComprehensionCheck, StoryMessage, WhatsAppStory } from "../../types";

type HighlightSeed = [phrase: string, meaning: string, note?: string];
type MessageSeed = {
  speakerId: string;
  text: string;
  translation: string;
  vocab: HighlightSeed[];
};
type SceneSeed = {
  a: MessageSeed;
  b: MessageSeed;
  c: MessageSeed;
  d: MessageSeed;
  e: MessageSeed;
};
type CheckSeed = {
  question: string;
  options: [string, string, string, string];
  correct: string;
  explanation: string;
  skill: string;
};

function msg(speakerId: string, text: string, translation: string, phrase: string, meaning: string): MessageSeed {
  return { speakerId, text, translation, vocab: [[phrase, meaning]] };
}

function check(question: string, correct: string, wrong1: string, wrong2: string, wrong3: string, explanation: string, skill: string): CheckSeed {
  return { question, options: [correct, wrong1, wrong2, wrong3], correct, explanation, skill };
}

function highlights(seeds: HighlightSeed[]): Highlight[] {
  return seeds.map(([phrase, meaning, note]) => ({ phrase, meaning, note }));
}

function sceneMessages(storyId: string, title: string, scenes: SceneSeed[]): StoryMessage[] {
  const chatMessages = scenes.flatMap((scene) => [scene.a, scene.b, scene.c, scene.d, scene.e]).map((seed, index) => ({
    id: `m${index + 1}`,
    speakerId: seed.speakerId,
    messageType: (index + 1) % 5 === 0 ? "voice-note" as const : "text" as const,
    text: seed.text,
    translation: seed.translation,
    audioUrl: (index + 1) % 5 === 0 ? `/audio/stories/${storyId}/m${index + 1}.mp3` : undefined,
    vocabHighlights: highlights(seed.vocab),
  }));

  return [
    {
      id: "n1",
      speakerId: "narrator",
      messageType: "narrator",
      text: `Guía de historia: ${title}. Lee el chat como una conversación real. Hay una nota de voz al final de cada escena.`,
      translation: `Story guide: ${title}. Read the chat like a real conversation. There is a voice note at the end of each scene.`,
    },
    ...chatMessages.slice(0, 20),
    {
      id: "n2",
      speakerId: "narrator",
      messageType: "narrator",
      text: "Pausa rápida: resume el problema, la pista más importante y lo que falta resolver.",
      translation: "Quick pause: summarize the problem, the most important clue, and what still needs to be solved.",
    },
    ...chatMessages.slice(20),
  ];
}

function checks(seeds: CheckSeed[]): StoryComprehensionCheck[] {
  return seeds.map((seed, index) => ({
    id: `check-${index + 1}`,
    afterMessageId: `m${(index + 1) * 3}`,
    question: {
      id: `q-${index + 1}`,
      type: "multiple-choice",
      prompt: seed.question,
      options: seed.options,
      correctAnswer: seed.correct,
      explanation: seed.explanation,
      points: 1,
      skillTag: seed.skill,
    } satisfies CheckpointQuestion,
  }));
}

function story({
  id,
  title,
  subtitle,
  level,
  tags,
  characters,
  scenes,
  checkSeeds,
  learnedVocab,
}: {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  tags: string[];
  characters: WhatsAppStory["data"]["characters"];
  scenes: SceneSeed[];
  checkSeeds: CheckSeed[];
  learnedVocab: string[];
}): WhatsAppStory {
  return {
    id,
    title,
    subtitle,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level,
    tags: ["Spanish Texting Stories", "neutral Spanish", "whatsapp-style-chat", ...tags],
    estimatedMinutes: 14,
    skoolSectionName: "Spanish Texting Stories - A1 to C2",
    activityType: "story",
    data: {
      targetLanguage: "spanish",
      nativeLanguage: "english",
      characters,
      messages: sceneMessages(id, title, scenes),
      comprehensionChecks: checks(checkSeeds),
      learnedVocab,
      finalReview: {
        keyPhrases: learnedVocab.slice(0, 8),
        grammarPatterns: ["Follow the eight-scene story arc.", "Use the context before each question.", "Notice how the voice notes summarize key turns."],
        speakingPrompts: ["Retell the story in Spanish.", "Record what you would write next.", "Explain the final twist in two sentences."],
      },
      completionTask: {
        title: "Final voice note",
        instructions: "Record a short Spanish voice note retelling the story and naming the key decision.",
      },
    },
  };
}

function characters(a: [string, string, string, "left" | "right", "red" | "gold" | "blue" | "cyan" | "green" | "violet"], b: [string, string, string, "left" | "right", "red" | "gold" | "blue" | "cyan" | "green" | "violet"], c?: [string, string, string, "left" | "right", "red" | "gold" | "blue" | "cyan" | "green" | "violet"]): StoryCharacter[] {
  return [a, b, c].filter((item): item is NonNullable<typeof item> => Boolean(item)).map(([id, name, initials, side, color]) => ({ id, name, initials, side, color }));
}

export const neutralSpanishTextingStoriesBatch2: WhatsAppStory[] = [
  story({
    id: "spanish-neutral-a1-lost-recipe",
    title: "A1-A2 Story 7: La receta perdida",
    subtitle: "A simple kitchen mystery about a missing recipe, a family cake, and one surprising ingredient.",
    level: "elementary",
    tags: ["A1-A2", "food", "family"],
    characters: characters(["sofia", "Sofía", "S", "right", "red"], ["mateo", "Mateo", "M", "left", "blue"], ["abuela", "Abuela", "A", "left", "gold"]),
    scenes: [
      { a: msg("sofia", "Mateo, no encuentro la receta del pastel de la abuela.", "Mateo, I can't find Grandma's cake recipe.", "no encuentro", "I can't find"), b: msg("mateo", "Busca en el cajón azul.", "Look in the blue drawer.", "busca", "look for"), c: msg("sofia", "Hay muchas fotos, pero no hay receta.", "There are many photos, but there is no recipe.", "no hay", "there is no"), d: msg("mateo", "Mira detrás de las fotos viejas.", "Look behind the old photos.", "detrás de", "behind"), e: msg("sofia", "Encontré una nota pequeña con harina, huevos y azúcar.", "I found a small note with flour, eggs, and sugar.", "encontré", "I found") },
      { a: msg("sofia", "La nota no dice cuánta azúcar.", "The note does not say how much sugar.", "cuánta azúcar", "how much sugar"), b: msg("mateo", "Pregúntale a la abuela antes de inventar.", "Ask Grandma before inventing.", "antes de", "before"), c: msg("abuela", "Pongan una taza, pero no llena.", "Put one cup, but not full.", "una taza", "one cup"), d: msg("sofia", "¿Una taza casi llena?", "One almost full cup?", "casi llena", "almost full"), e: msg("abuela", "Exacto. La receta siempre fue un poco misteriosa.", "Exactly. The recipe was always a little mysterious.", "un poco misteriosa", "a little mysterious") },
      { a: msg("mateo", "Falta la leche.", "The milk is missing.", "falta", "is missing"), b: msg("sofia", "Solo tenemos leche de almendras.", "We only have almond milk.", "solo tenemos", "we only have"), c: msg("abuela", "Sirve. Antes usábamos lo que había.", "That works. Before, we used what there was.", "sirve", "that works"), d: msg("mateo", "Entonces no necesitamos ir a la tienda.", "Then we do not need to go to the store.", "no necesitamos", "we do not need"), e: msg("sofia", "Perfecto. El pastel sigue vivo.", "Perfect. The cake is still alive.", "sigue vivo", "is still alive") },
      { a: msg("sofia", "La masa está muy líquida.", "The batter is very liquid.", "muy líquida", "very liquid"), b: msg("mateo", "Pon un poco más de harina.", "Put a little more flour.", "un poco más", "a little more"), c: msg("abuela", "No demasiado. Tiene que quedar suave.", "Not too much. It has to stay soft.", "tiene que", "has to"), d: msg("sofia", "Ahora parece mejor.", "Now it looks better.", "parece mejor", "looks better"), e: msg("mateo", "La cocina parece laboratorio.", "The kitchen looks like a laboratory.", "parece laboratorio", "looks like a laboratory") },
      { a: msg("sofia", "El horno ya está caliente.", "The oven is already hot.", "ya está", "is already"), b: msg("abuela", "Treinta minutos y no abras la puerta.", "Thirty minutes and do not open the door.", "no abras", "do not open"), c: msg("mateo", "Sofía quiere mirar cada minuto.", "Sofía wants to look every minute.", "cada minuto", "every minute"), d: msg("sofia", "Es investigación importante.", "It is important research.", "investigación", "research"), e: msg("abuela", "La paciencia también es un ingrediente.", "Patience is also an ingredient.", "la paciencia", "patience") },
      { a: msg("mateo", "Huele muy bien.", "It smells very good.", "huele bien", "smells good"), b: msg("sofia", "Pero el centro está bajo.", "But the center is low.", "el centro", "the center"), c: msg("abuela", "Eso pasa cuando falta paciencia.", "That happens when patience is missing.", "eso pasa", "that happens"), d: msg("sofia", "No abrí la puerta. Solo miré mucho.", "I did not open the door. I only looked a lot.", "solo miré", "I only looked"), e: msg("mateo", "Mirar mucho también pesa.", "Looking a lot also has weight.", "también pesa", "also has weight") },
      { a: msg("sofia", "Encontré otra nota pegada bajo la mesa.", "I found another note stuck under the table.", "otra nota", "another note"), b: msg("abuela", "Ah, esa era la parte secreta.", "Ah, that was the secret part.", "parte secreta", "secret part"), c: msg("mateo", "Dice: una pizca de sal y ralladura de limón.", "It says: a pinch of salt and lemon zest.", "una pizca", "a pinch"), d: msg("sofia", "Eso explica el sabor de antes.", "That explains the old flavor.", "explica", "explains"), e: msg("abuela", "Sin limón, era pastel; con limón, era familia.", "Without lemon, it was cake; with lemon, it was family.", "era familia", "was family") },
      { a: msg("sofia", "Hicimos otro pastel pequeño con limón.", "We made another small cake with lemon.", "pastel pequeño", "small cake"), b: msg("mateo", "Ese sí salió perfecto.", "That one did come out perfect.", "salió perfecto", "came out perfect"), c: msg("abuela", "Ahora escriban la receta completa.", "Now write the full recipe.", "receta completa", "full recipe"), d: msg("sofia", "Y pondré: no mirar el horno con drama.", "And I will put: do not look at the oven dramatically.", "con drama", "dramatically"), e: msg("mateo", "Título final: pastel de limón y paciencia.", "Final title: lemon and patience cake.", "título final", "final title") },
    ],
    checkSeeds: [
      check("What is Sofía looking for?", "Grandma's cake recipe", "A phone", "A train ticket", "A drone", "Sofía says she cannot find Grandma's cake recipe.", "gist"),
      check("Where does Mateo tell her to look first?", "In the blue drawer", "On the roof", "At the station", "In the taxi", "Mateo says to look in the blue drawer.", "detail"),
      check("What is unclear about the sugar?", "How much to use", "Where to buy it", "Who ate it", "Why it is blue", "The note does not say how much sugar.", "detail"),
      check("What milk do they have?", "Almond milk", "Chocolate milk", "No milk", "Powdered milk", "Sofía says they only have almond milk.", "detail"),
      check("What is wrong with the batter?", "It is very liquid", "It is frozen", "It is too salty", "It is missing eggs", "Sofía says the batter is very liquid.", "detail"),
      check("What should Sofía not do while the cake bakes?", "Open the oven door", "Write the recipe", "Call Grandma", "Buy lemons", "Grandma says not to open the oven door.", "detail"),
      check("What does Grandma call an ingredient?", "Patience", "A phone", "A map", "A ticket", "Grandma says patience is also an ingredient.", "inference"),
      check("What does Sofía find under the table?", "Another note", "A key", "A wallet", "A candle", "Sofía finds another note under the table.", "detail"),
      check("What secret ingredient appears?", "Lemon zest", "Coffee", "Vanilla ice cream", "Tomato", "The note mentions lemon zest.", "detail"),
      check("Why is lemon important?", "It makes the cake feel like family", "It fixes the oven", "It replaces flour", "It burns the cake", "Grandma says with lemon, it was family.", "theme"),
      check("What do they make at the end?", "Another small cake with lemon", "A sandwich", "Soup", "Cookies only", "They make another small cake with lemon.", "detail"),
      check("What does Grandma ask them to write?", "The full recipe", "A train number", "A complaint", "A museum report", "Grandma says to write the full recipe.", "detail"),
      check("What is the final title?", "Lemon and patience cake", "The taxi cake", "The missing phone", "The museum cake", "Mateo gives the final title.", "summary"),
    ],
    learnedVocab: ["no encuentro", "busca", "no hay", "una taza", "sirve", "tiene que", "no abras", "la paciencia", "una pizca", "receta completa"],
  }),
  story({
    id: "spanish-neutral-a1-backpack-swap",
    title: "A1-A2 Story 8: La mochila cambiada",
    subtitle: "A school story about two identical backpacks, a missing notebook, and a kind apology.",
    level: "elementary",
    tags: ["A1-A2", "school", "mistake"],
    characters: characters(["lucas", "Lucas", "L", "right", "blue"], ["emma", "Emma", "E", "left", "gold"], ["nina", "Nina", "N", "left", "green"]),
    scenes: [
      { a: msg("lucas", "Emma, creo que tengo la mochila equivocada.", "Emma, I think I have the wrong backpack.", "mochila equivocada", "wrong backpack"), b: msg("emma", "¿Por qué?", "Why?", "¿por qué?", "why?"), c: msg("lucas", "Hay un cuaderno rosa y yo no tengo cuaderno rosa.", "There is a pink notebook and I do not have a pink notebook.", "cuaderno rosa", "pink notebook"), d: msg("emma", "Mira el nombre en la primera página.", "Look at the name on the first page.", "primera página", "first page"), e: msg("lucas", "Dice Nina. Definitivamente no soy Nina.", "It says Nina. I am definitely not Nina.", "definitivamente", "definitely") },
      { a: msg("emma", "Nina está en la clase de arte.", "Nina is in art class.", "clase de arte", "art class"), b: msg("lucas", "Mi clase empieza en diez minutos.", "My class starts in ten minutes.", "empieza", "starts"), c: msg("emma", "Escríbele al grupo.", "Write to the group.", "escríbele", "write to her/them"), d: msg("lucas", "No tengo su número.", "I do not have her number.", "no tengo", "I do not have"), e: msg("emma", "Entonces vamos a arte rápido.", "Then let's go to art quickly.", "vamos", "let's go") },
      { a: msg("nina", "Lucas, yo tengo una mochila igual y hay un libro de matemáticas.", "Lucas, I have an identical backpack and there is a math book.", "mochila igual", "identical backpack"), b: msg("lucas", "Ese libro es mío.", "That book is mine.", "es mío", "is mine"), c: msg("emma", "Problema resuelto.", "Problem solved.", "problema resuelto", "problem solved"), d: msg("nina", "Casi. También hay una banana aplastada.", "Almost. There is also a crushed banana.", "banana aplastada", "crushed banana"), e: msg("lucas", "Esa también es mía, lamentablemente.", "That is mine too, unfortunately.", "lamentablemente", "unfortunately") },
      { a: msg("nina", "Tu cuaderno tiene tarea para hoy.", "Your notebook has homework for today.", "tarea para hoy", "homework for today"), b: msg("lucas", "Necesito entregarla antes del recreo.", "I need to turn it in before break.", "antes del recreo", "before break"), c: msg("emma", "Hagamos el cambio en la puerta.", "Let's make the swap at the door.", "hagamos", "let's make"), d: msg("nina", "Voy saliendo de arte.", "I am leaving art class.", "voy saliendo", "I am leaving"), e: msg("lucas", "Estoy en la puerta con cara de emergencia.", "I am at the door with an emergency face.", "cara de emergencia", "emergency face") },
      { a: msg("nina", "Ya te veo.", "I see you now.", "ya te veo", "I see you now"), b: msg("lucas", "Yo veo mi mochila y mi futuro.", "I see my backpack and my future.", "mi futuro", "my future"), c: msg("emma", "Dramático, pero justo.", "Dramatic, but fair.", "justo", "fair"), d: msg("nina", "Aquí está tu tarea. Está limpia.", "Here is your homework. It is clean.", "está limpia", "is clean"), e: msg("lucas", "Gracias. La banana no destruyó mi vida académica.", "Thanks. The banana did not destroy my academic life.", "vida académica", "academic life") },
      { a: msg("emma", "Ahora revisa que tengas todo.", "Now check that you have everything.", "revisa", "check"), b: msg("lucas", "Libro, cuaderno, lápiz, banana triste.", "Book, notebook, pencil, sad banana.", "lápiz", "pencil"), c: msg("nina", "Falta tu botella de agua.", "Your water bottle is missing.", "falta", "is missing"), d: msg("lucas", "Está en tu mochila todavía.", "It is still in your backpack.", "todavía", "still"), e: msg("nina", "La botella también quería clase de arte.", "The bottle also wanted art class.", "quería", "wanted") },
      { a: msg("lucas", "Perdón por la confusión.", "Sorry for the confusion.", "perdón", "sorry"), b: msg("nina", "No pasa nada. Las mochilas son iguales.", "No problem. The backpacks are the same.", "no pasa nada", "no problem"), c: msg("emma", "Pongan una cinta de color.", "Put on a colored ribbon.", "cinta de color", "colored ribbon"), d: msg("lucas", "Yo tengo cinta azul.", "I have blue ribbon.", "cinta azul", "blue ribbon"), e: msg("nina", "Yo pondré una estrella verde.", "I will put a green star.", "estrella verde", "green star") },
      { a: msg("lucas", "Entregué la tarea a tiempo.", "I turned in the homework on time.", "a tiempo", "on time"), b: msg("emma", "Gran final.", "Great ending.", "gran final", "great ending"), c: msg("nina", "Y yo encontré mi cuaderno rosa.", "And I found my pink notebook.", "encontré", "I found"), d: msg("lucas", "La banana se jubiló.", "The banana retired.", "se jubiló", "retired"), e: msg("emma", "Mañana: mochila, cinta azul y cero frutas sueltas.", "Tomorrow: backpack, blue ribbon, and zero loose fruit.", "frutas sueltas", "loose fruit") },
    ],
    checkSeeds: [
      check("What makes Lucas think he has the wrong backpack?", "A pink notebook", "A train ticket", "A cake", "A museum key", "Lucas finds a pink notebook that is not his.", "detail"),
      check("Whose name is in the notebook?", "Nina", "Emma", "Lucas", "Mateo", "Lucas says the notebook says Nina.", "detail"),
      check("Where is Nina?", "In art class", "At home", "In a taxi", "At a station", "Emma says Nina is in art class.", "detail"),
      check("What does Nina find in Lucas's backpack?", "A math book", "A drone", "A recipe", "A wallet", "Nina says there is a math book.", "detail"),
      check("What unfortunate item is also Lucas's?", "A crushed banana", "A broken phone", "A wet map", "A red candle", "Lucas admits the crushed banana is his.", "tone"),
      check("What does Lucas need before break?", "His homework", "A birthday cake", "A train number", "A museum ticket", "Lucas needs to turn in homework before break.", "detail"),
      check("Where do they make the swap?", "At the door", "In the park", "On the roof", "In a cafe", "They plan to swap at the door.", "detail"),
      check("What survives the banana problem?", "Lucas's homework", "Nina's phone", "Emma's bag", "A cake recipe", "Lucas says the banana did not destroy his academic life.", "summary"),
      check("What is still in Nina's backpack?", "Lucas's water bottle", "Emma's notebook", "Nina's ribbon", "A green star", "Nina notices Lucas's water bottle is missing.", "detail"),
      check("What does Emma suggest?", "Use colored ribbons", "Buy new books", "Change schools", "Skip class", "Emma suggests putting colored ribbons on the backpacks.", "solution"),
      check("What color ribbon does Lucas have?", "Blue", "Green", "Red", "Yellow", "Lucas says he has blue ribbon.", "detail"),
      check("What does Nina choose?", "A green star", "A blue ribbon", "A red bag", "A yellow phone", "Nina says she will put a green star.", "detail"),
      check("What is the final rule?", "No loose fruit", "No notebooks", "No homework", "No art class", "Emma ends with zero loose fruit.", "summary"),
    ],
    learnedVocab: ["mochila equivocada", "cuaderno rosa", "clase de arte", "es mío", "antes del recreo", "voy saliendo", "revisa", "no pasa nada", "a tiempo", "frutas sueltas"],
  }),
  story({
    id: "spanish-neutral-a2-rainy-picnic",
    title: "A1-A2 Story 9: El picnic bajo techo",
    subtitle: "A rainy-day story about changing plans, saving snacks, and building a picnic indoors.",
    level: "elementary",
    tags: ["A1-A2", "plans", "weather"],
    characters: characters(["lia", "Lía", "L", "right", "violet"], ["tomas", "Tomás", "T", "left", "cyan"], ["marta", "Marta", "M", "left", "gold"]),
    scenes: [
      { a: msg("lia", "Tomás, está lloviendo mucho.", "Tomás, it is raining a lot.", "está lloviendo", "it is raining"), b: msg("tomas", "¿Cancelamos el picnic?", "Do we cancel the picnic?", "cancelamos", "do we cancel"), c: msg("lia", "No quiero cancelar. Ya hice sándwiches.", "I do not want to cancel. I already made sandwiches.", "ya hice", "I already made"), d: msg("marta", "Podemos hacer picnic bajo techo.", "We can have a picnic indoors.", "bajo techo", "indoors"), e: msg("lia", "Me gusta. El suelo de la sala será el parque.", "I like it. The living room floor will be the park.", "la sala", "living room") },
      { a: msg("tomas", "Tengo una manta grande.", "I have a big blanket.", "manta grande", "big blanket"), b: msg("lia", "Yo tengo jugo y fruta.", "I have juice and fruit.", "jugo y fruta", "juice and fruit"), c: msg("marta", "Yo llevo música tranquila.", "I will bring calm music.", "música tranquila", "calm music"), d: msg("tomas", "¿Y las hormigas?", "And the ants?", "hormigas", "ants"), e: msg("lia", "Hoy las hormigas no están invitadas.", "Today the ants are not invited.", "no están invitadas", "are not invited") },
      { a: msg("marta", "La lluvia está más fuerte.", "The rain is stronger.", "más fuerte", "stronger"), b: msg("tomas", "Entonces mejor no salimos.", "Then better we do not go out.", "mejor no", "better not"), c: msg("lia", "Pongo la manta cerca de la ventana.", "I put the blanket near the window.", "cerca de", "near"), d: msg("marta", "Así vemos la lluvia sin mojarnos.", "That way we see the rain without getting wet.", "sin mojarnos", "without getting wet"), e: msg("tomas", "Picnic con vista y sin barro.", "Picnic with a view and without mud.", "sin barro", "without mud") },
      { a: msg("lia", "Falta algo dulce.", "Something sweet is missing.", "falta", "is missing"), b: msg("marta", "Tengo galletas.", "I have cookies.", "galletas", "cookies"), c: msg("tomas", "Yo tengo chocolate.", "I have chocolate.", "chocolate", "chocolate"), d: msg("lia", "Esto ya parece fiesta.", "This already looks like a party.", "parece fiesta", "looks like a party"), e: msg("marta", "La lluvia hizo el plan mejor.", "The rain made the plan better.", "hizo mejor", "made better") },
      { a: msg("tomas", "La ventana se está empañando.", "The window is fogging up.", "se está empañando", "is fogging up"), b: msg("lia", "Podemos dibujar caras.", "We can draw faces.", "dibujar caras", "draw faces"), c: msg("marta", "Dibujo un sol.", "I draw a sun.", "un sol", "a sun"), d: msg("tomas", "Dibujo una nube triste.", "I draw a sad cloud.", "nube triste", "sad cloud"), e: msg("lia", "La nube triste ahora tiene un sándwich.", "The sad cloud now has a sandwich.", "tiene un sándwich", "has a sandwich") },
      { a: msg("marta", "Mi mamá pregunta por qué estamos en el suelo.", "My mom asks why we are on the floor.", "en el suelo", "on the floor"), b: msg("lia", "Dile que es cultura de picnic.", "Tell her it is picnic culture.", "dile que", "tell her that"), c: msg("tomas", "Y ciencia contra la lluvia.", "And science against the rain.", "contra la lluvia", "against the rain"), d: msg("marta", "Quiere un sándwich.", "She wants a sandwich.", "quiere", "wants"), e: msg("lia", "Aceptamos nuevos invitados si traen servilletas.", "We accept new guests if they bring napkins.", "nuevos invitados", "new guests") },
      { a: msg("tomas", "Se fue la luz por un segundo.", "The power went out for a second.", "se fue la luz", "the power went out"), b: msg("marta", "Tengo una linterna.", "I have a flashlight.", "linterna", "flashlight"), c: msg("lia", "Ahora es picnic de aventura.", "Now it is an adventure picnic.", "de aventura", "adventure"), d: msg("tomas", "Contemos una historia de lluvia.", "Let's tell a rain story.", "contemos", "let's tell"), e: msg("marta", "Empieza con tres amigos que no cancelan.", "It begins with three friends who do not cancel.", "no cancelan", "do not cancel") },
      { a: msg("lia", "Dejó de llover.", "It stopped raining.", "dejó de llover", "stopped raining"), b: msg("tomas", "¿Salimos ahora?", "Do we go out now?", "salimos", "we go out"), c: msg("marta", "No. El picnic bajo techo ya ganó.", "No. The indoor picnic already won.", "ya ganó", "already won"), d: msg("lia", "Mañana hacemos otro afuera.", "Tomorrow we do another one outside.", "mañana", "tomorrow"), e: msg("tomas", "Perfecto: dos picnics por culpa de una lluvia.", "Perfect: two picnics because of one rain.", "por culpa de", "because of") },
    ],
    checkSeeds: [
      check("Why might they cancel the picnic?", "It is raining a lot", "There is no food", "The park is closed forever", "Tomás is sick", "Lía says it is raining a lot.", "gist"),
      check("Why does Lía not want to cancel?", "She already made sandwiches", "She bought a train ticket", "She lost her bag", "She has homework", "Lía says she already made sandwiches.", "detail"),
      check("Where do they decide to picnic?", "Indoors", "At the station", "On the roof", "In a taxi", "Marta suggests a picnic under a roof.", "detail"),
      check("What does Tomás bring?", "A big blanket", "A drone", "A suitcase", "A museum map", "Tomás says he has a big blanket.", "detail"),
      check("Where does Lía put the blanket?", "Near the window", "In the kitchen sink", "Outside in the mud", "Under a car", "Lía puts the blanket near the window.", "detail"),
      check("What sweet food do they have?", "Cookies and chocolate", "Cake only", "No dessert", "Ice cream only", "Marta has cookies and Tomás has chocolate.", "detail"),
      check("What happens to the window?", "It fogs up", "It breaks", "It opens by itself", "It disappears", "The window is fogging up.", "detail"),
      check("What does the sad cloud get?", "A sandwich", "A phone", "A key", "A notebook", "Lía says the sad cloud now has a sandwich.", "tone"),
      check("What does Marta's mom want?", "A sandwich", "A blanket", "A train", "A phone", "Marta says her mom wants a sandwich.", "detail"),
      check("What happens to the power?", "It goes out for a second", "It stays off all day", "It gets louder", "It opens a door", "Tomás says the power went out for a second.", "detail"),
      check("What story do they start telling?", "A rain story about friends who do not cancel", "A museum story", "A taxi story", "A work story", "Marta starts a story about three friends who do not cancel.", "detail"),
      check("What happens to the rain at the end?", "It stops", "It gets worse forever", "It becomes snow", "It floods the room", "Lía says it stopped raining.", "detail"),
      check("Why do they get two picnics?", "Because rain changed the first plan", "Because they lost the food", "Because the park called", "Because Tomás moved", "Tomás says they get two picnics because of the rain.", "summary"),
    ],
    learnedVocab: ["está lloviendo", "cancelamos", "bajo techo", "manta", "sin mojarnos", "falta", "se fue la luz", "linterna", "dejó de llover", "por culpa de"],
  }),
  story({
    id: "spanish-neutral-a2-wrong-video-call",
    title: "A1-A2 Story 10: La videollamada equivocada",
    subtitle: "A comic remote-work story about joining the wrong video call and saving the meeting anyway.",
    level: "elementary",
    tags: ["A1-A2", "work", "video call"],
    characters: characters(["daniel", "Daniel", "D", "right", "blue"], ["paula", "Paula", "P", "left", "gold"], ["lara", "Lara", "L", "left", "green"]),
    scenes: [
      { a: msg("daniel", "Paula, creo que entré en la videollamada equivocada.", "Paula, I think I entered the wrong video call.", "videollamada equivocada", "wrong video call"), b: msg("paula", "¿Qué ves?", "What do you see?", "¿qué ves?", "what do you see?"), c: msg("daniel", "Veo a cinco personas y una presentación sobre plantas.", "I see five people and a presentation about plants.", "sobre plantas", "about plants"), d: msg("paula", "Nuestra reunión es sobre ventas, no plantas.", "Our meeting is about sales, not plants.", "sobre ventas", "about sales"), e: msg("daniel", "Sí, por eso estoy saludando muy despacio.", "Yes, that is why I am greeting very slowly.", "muy despacio", "very slowly") },
      { a: msg("lara", "Hola Daniel, ¿vienes por el taller de jardinería?", "Hi Daniel, are you here for the gardening workshop?", "taller de jardinería", "gardening workshop"), b: msg("daniel", "Creo que no, pero ahora tengo curiosidad.", "I think not, but now I am curious.", "tengo curiosidad", "I am curious"), c: msg("paula", "Sal de esa llamada y entra al enlace correcto.", "Leave that call and enter the correct link.", "enlace correcto", "correct link"), d: msg("daniel", "No quiero ser grosero.", "I do not want to be rude.", "ser grosero", "be rude"), e: msg("lara", "Tranquilo. A veces la tecnología planta personas en lugares raros.", "No worries. Sometimes technology plants people in strange places.", "lugares raros", "strange places") },
      { a: msg("daniel", "Lara hizo un chiste con plantas.", "Lara made a joke with plants.", "hizo un chiste", "made a joke"), b: msg("paula", "Bien, pero tu reunión real empieza ahora.", "Good, but your real meeting starts now.", "empieza ahora", "starts now"), c: msg("daniel", "Ya salí. Busco el enlace.", "I left already. I am looking for the link.", "ya salí", "I left already"), d: msg("paula", "Te lo mando otra vez.", "I will send it to you again.", "otra vez", "again"), e: msg("daniel", "Gracias. Hoy tengo dos carreras: ventas y jardinería.", "Thanks. Today I have two careers: sales and gardening.", "dos carreras", "two careers") },
      { a: msg("daniel", "Entré a la reunión correcta.", "I entered the correct meeting.", "reunión correcta", "correct meeting"), b: msg("paula", "Perfecto. ¿Tienes el informe?", "Perfect. Do you have the report?", "el informe", "the report"), c: msg("daniel", "Sí, pero mi cámara está apagada.", "Yes, but my camera is off.", "cámara apagada", "camera off"), d: msg("paula", "Mejor. Tu cara todavía dice plantas.", "Better. Your face still says plants.", "todavía", "still"), e: msg("daniel", "Voy a compartir pantalla sin mencionar hojas.", "I will share screen without mentioning leaves.", "compartir pantalla", "share screen") },
      { a: msg("paula", "El cliente pregunta por crecimiento.", "The client asks about growth.", "crecimiento", "growth"), b: msg("daniel", "No digas plantas.", "Do not say plants.", "no digas", "do not say"), c: msg("daniel", "Dije crecimiento de ventas. Sobreviví.", "I said sales growth. I survived.", "sobreviví", "I survived"), d: msg("paula", "Excelente autocontrol.", "Excellent self-control.", "autocontrol", "self-control"), e: msg("daniel", "Mi cerebro tenía una maceta, pero mi boca eligió ventas.", "My brain had a plant pot, but my mouth chose sales.", "eligió", "chose") },
      { a: msg("lara", "Daniel, te mandé por error el resumen del taller.", "Daniel, I sent you the workshop summary by mistake.", "por error", "by mistake"), b: msg("daniel", "Gracias. Ahora sé cuidar una planta pequeña.", "Thanks. Now I know how to care for a small plant.", "cuidar", "care for"), c: msg("paula", "Concéntrate.", "Focus.", "concéntrate", "focus"), d: msg("daniel", "Sí. También el cliente quiere una idea fresca.", "Yes. Also the client wants a fresh idea.", "idea fresca", "fresh idea"), e: msg("paula", "No uses la palabra fresca con demasiado entusiasmo.", "Do not use the word fresh with too much enthusiasm.", "demasiado entusiasmo", "too much enthusiasm") },
      { a: msg("daniel", "La idea funcionó. El cliente sonrió.", "The idea worked. The client smiled.", "funcionó", "worked"), b: msg("paula", "¿Qué dijiste?", "What did you say?", "¿qué dijiste?", "what did you say?"), c: msg("daniel", "Que había que cultivar relaciones con clientes.", "That we needed to cultivate client relationships.", "cultivar relaciones", "cultivate relationships"), d: msg("paula", "Eso era peligroso, pero salió bien.", "That was dangerous, but it came out well.", "salió bien", "came out well"), e: msg("daniel", "La jardinería salvó la reunión.", "Gardening saved the meeting.", "salvó la reunión", "saved the meeting") },
      { a: msg("lara", "Si quieren, les mando una planta para la oficina.", "If you want, I will send you a plant for the office.", "para la oficina", "for the office"), b: msg("paula", "Aceptamos una planta pequeña, no otra llamada equivocada.", "We accept a small plant, not another wrong call.", "aceptamos", "we accept"), c: msg("daniel", "Prometo revisar los enlaces dos veces.", "I promise to check the links twice.", "dos veces", "twice"), d: msg("paula", "Y yo prometo poner nombres más claros.", "And I promise to put clearer names.", "nombres más claros", "clearer names"), e: msg("daniel", "Final feliz: cliente contento, planta nueva y enlace correcto.", "Happy ending: happy client, new plant, and correct link.", "final feliz", "happy ending") },
    ],
    checkSeeds: [
      check("What mistake does Daniel make?", "He joins the wrong video call", "He loses a backpack", "He misses a train", "He burns a cake", "Daniel says he entered the wrong video call.", "gist"),
      check("What is the wrong call about?", "Plants", "Sales", "Museums", "Trains", "Daniel sees a presentation about plants.", "detail"),
      check("What is Daniel's real meeting about?", "Sales", "Gardening", "Cooking", "School", "Paula says their meeting is about sales.", "detail"),
      check("Why does Daniel not leave immediately?", "He does not want to be rude", "His camera is broken", "The client is there", "He likes plants too much", "Daniel says he does not want to be rude.", "cause"),
      check("Who sends the correct link?", "Paula", "Lara", "The client", "Daniel", "Paula says she will send the link again.", "detail"),
      check("Why is Daniel's camera better off?", "His face still says plants", "The camera is wet", "The client asked", "Lara turned it off", "Paula jokes that his face still says plants.", "tone"),
      check("What word does the client ask about?", "Growth", "Water", "Homework", "Tickets", "Paula says the client asks about growth.", "detail"),
      check("What does Daniel correctly say?", "Sales growth", "Plant growth", "Window growth", "Cake growth", "Daniel says crecimiento de ventas.", "detail"),
      check("What does Lara send by mistake?", "The workshop summary", "The sales report", "A phone number", "A recipe", "Lara sends the gardening workshop summary by mistake.", "detail"),
      check("What idea works with the client?", "Cultivating client relationships", "Buying plants for everyone", "Canceling the meeting", "Changing the link", "Daniel says they should cultivate client relationships.", "detail"),
      check("What saved the meeting?", "Gardening language", "A train ticket", "A backpack", "A cake", "Daniel says gardening saved the meeting.", "summary"),
      check("What does Lara offer to send?", "A plant for the office", "A new laptop", "A backpack", "A taxi", "Lara offers to send a plant.", "detail"),
      check("What does Daniel promise?", "To check links twice", "To stop working", "To buy ten plants", "To avoid cameras forever", "Daniel promises to review links twice.", "summary"),
    ],
    learnedVocab: ["videollamada equivocada", "¿qué ves?", "sobre ventas", "enlace correcto", "ser grosero", "compartir pantalla", "crecimiento", "por error", "salió bien", "dos veces"],
  }),
  story({
    id: "spanish-neutral-b1-subway-musician",
    title: "B1-B2 Story 4: El músico del metro",
    subtitle: "A city story about a lost violin case, a metro performer, and an unexpected concert.",
    level: "upper-intermediate",
    tags: ["B1-B2", "city", "music"],
    characters: characters(["valeria", "Valeria", "V", "right", "red"], ["nicolas", "Nicolás", "N", "left", "blue"], ["musico", "Músico", "M", "left", "gold"]),
    scenes: [
      { a: msg("valeria", "Nicolás, dejé mi violín en el metro.", "Nicolás, I left my violin on the metro.", "dejé", "I left"), b: msg("nicolas", "¿En qué línea?", "On which line?", "qué línea", "which line"), c: msg("valeria", "Línea verde, último vagón.", "Green line, last car.", "último vagón", "last car"), d: msg("nicolas", "Llama a objetos perdidos ahora.", "Call lost and found now.", "objetos perdidos", "lost and found"), e: msg("valeria", "Estoy llamando, pero nadie contesta.", "I am calling, but nobody answers.", "nadie contesta", "nobody answers") },
      { a: msg("nicolas", "¿Tiene tu nombre el estuche?", "Does the case have your name?", "el estuche", "the case"), b: msg("valeria", "Sí, y una cinta roja.", "Yes, and a red ribbon.", "cinta roja", "red ribbon"), c: msg("musico", "Disculpa, ¿buscas un violín con cinta roja?", "Excuse me, are you looking for a violin with a red ribbon?", "¿buscas?", "are you looking for?"), d: msg("valeria", "Sí. ¿Lo tienes?", "Yes. Do you have it?", "¿lo tienes?", "do you have it?"), e: msg("musico", "Lo encontré en el asiento y bajé en la siguiente estación.", "I found it on the seat and got off at the next station.", "lo encontré", "I found it") },
      { a: msg("nicolas", "No vayas sola si no estás segura.", "Do not go alone if you are not sure.", "no vayas sola", "do not go alone"), b: msg("valeria", "Estoy en una estación con seguridad.", "I am in a station with security.", "con seguridad", "with security"), c: msg("musico", "Puedo dejarlo con el guardia.", "I can leave it with the guard.", "el guardia", "the guard"), d: msg("valeria", "Gracias. Voy para allá.", "Thanks. I am heading there.", "voy para allá", "I am heading there"), e: msg("nicolas", "Mándame ubicación hasta que lo tengas.", "Send me location until you have it.", "hasta que", "until") },
      { a: msg("valeria", "Llegué. El músico está tocando una canción.", "I arrived. The musician is playing a song.", "está tocando", "is playing"), b: msg("nicolas", "¿Con tu violín?", "With your violin?", "con tu violín", "with your violin"), c: msg("valeria", "No, con el suyo. El mío está junto al guardia.", "No, with his. Mine is next to the guard.", "el mío", "mine"), d: msg("musico", "Solo quería asegurarme de que no se perdiera otra vez.", "I just wanted to make sure it did not get lost again.", "asegurarme", "make sure"), e: msg("valeria", "Lo tengo. Casi lloro de alivio.", "I have it. I almost cry with relief.", "de alivio", "with relief") },
      { a: msg("musico", "¿Tocas algo?", "Do you play something?", "¿tocas?", "do you play?"), b: msg("valeria", "Sí, pero hoy tengo las manos temblando.", "Yes, but today my hands are shaking.", "manos temblando", "shaking hands"), c: msg("nicolas", "Respira. Ya recuperaste el violín.", "Breathe. You already recovered the violin.", "recuperaste", "you recovered"), d: msg("musico", "Podemos tocar una pieza corta juntos.", "We can play a short piece together.", "pieza corta", "short piece"), e: msg("valeria", "Si toco, será para agradecer.", "If I play, it will be to say thanks.", "para agradecer", "to say thanks") },
      { a: msg("valeria", "Tocamos treinta segundos y la gente se quedó mirando.", "We played thirty seconds and people stayed watching.", "se quedó mirando", "stayed watching"), b: msg("nicolas", "Eso suena hermoso.", "That sounds beautiful.", "suena hermoso", "sounds beautiful"), c: msg("musico", "A veces el metro también escucha.", "Sometimes the metro also listens.", "también escucha", "also listens"), d: msg("valeria", "Una niña dejó una moneda en mi estuche.", "A girl left a coin in my case.", "una moneda", "a coin"), e: msg("nicolas", "Tu violín volvió con propina.", "Your violin came back with a tip.", "propina", "tip") },
      { a: msg("valeria", "El músico no quiere recompensa.", "The musician does not want a reward.", "recompensa", "reward"), b: msg("nicolas", "Entonces invítalo al concierto del sábado.", "Then invite him to Saturday's concert.", "invítalo", "invite him"), c: msg("musico", "¿Concierto?", "Concert?", "concierto", "concert"), d: msg("valeria", "Sí. Toco con mi grupo este sábado.", "Yes. I play with my group this Saturday.", "mi grupo", "my group"), e: msg("musico", "Acepto si puedo sentarme cerca.", "I accept if I can sit nearby.", "sentarme cerca", "sit nearby") },
      { a: msg("valeria", "Le mandé la invitación.", "I sent him the invitation.", "invitación", "invitation"), b: msg("nicolas", "Final inesperado.", "Unexpected ending.", "inesperado", "unexpected"), c: msg("valeria", "Perdí el violín por veinte minutos y gané público.", "I lost the violin for twenty minutes and gained an audience.", "gané público", "gained an audience"), d: msg("musico", "Y yo gané una historia para tocar mañana.", "And I gained a story to play tomorrow.", "una historia", "a story"), e: msg("valeria", "Nueva regla: etiqueta, cinta roja y mirar el asiento antes de bajar.", "New rule: label, red ribbon, and check the seat before getting off.", "antes de bajar", "before getting off") },
    ],
    checkSeeds: [
      check("What does Valeria lose?", "Her violin", "Her phone", "Her backpack", "Her recipe", "Valeria says she left her violin on the metro.", "gist"),
      check("Where did she leave it?", "On the green line, last car", "In a taxi", "At school", "At a museum", "She says green line, last car.", "detail"),
      check("What identifies the violin case?", "Her name and a red ribbon", "A blue sticker", "A broken lock", "A gold key", "Valeria says the case has her name and a red ribbon.", "detail"),
      check("Who finds the violin?", "A metro musician", "Nicolás", "A child", "A chef", "The musician says he found it on the seat.", "detail"),
      check("Where can the musician leave the violin?", "With the guard", "Under a bench", "Inside a shop", "In a taxi", "He offers to leave it with the guard.", "detail"),
      check("What is the musician doing when Valeria arrives?", "Playing a song", "Selling tickets", "Leaving the station", "Calling Nicolás", "Valeria says the musician is playing a song.", "detail"),
      check("How does Valeria feel when she gets the violin?", "Relieved", "Angry", "Bored", "Hungry", "She almost cries with relief.", "emotion"),
      check("Why does Valeria agree to play?", "To say thanks", "To earn money", "To test the case", "To find Nicolás", "She says if she plays, it will be to thank him.", "cause"),
      check("What happens when they play?", "People stop to watch", "The guard closes the station", "The violin breaks", "Nobody hears", "Valeria says people stayed watching.", "detail"),
      check("What does a girl put in the case?", "A coin", "A flower", "A ticket", "A note", "A girl leaves a coin in the case.", "detail"),
      check("What does Nicolás suggest as a reward?", "Invite the musician to Saturday's concert", "Give him the violin", "Buy a train", "Send flowers", "Nicolás suggests inviting him to the concert.", "solution"),
      check("What does Valeria gain?", "An audience", "A new backpack", "A cake", "A drone", "She says she lost the violin briefly and gained an audience.", "summary"),
      check("What is Valeria's new rule?", "Check the seat before getting off", "Never play music", "Never use the metro", "Always carry cake", "Valeria ends with checking the seat before getting off.", "summary"),
    ],
    learnedVocab: ["dejé", "último vagón", "objetos perdidos", "el estuche", "lo encontré", "con seguridad", "recuperaste", "propina", "invitación", "antes de bajar"],
  }),
  story({
    id: "spanish-neutral-b2-rooftop-garden",
    title: "B1-B2 Story 5: El jardín en la azotea",
    subtitle: "A community story about a secret rooftop garden, building rules, and choosing cooperation over blame.",
    level: "upper-intermediate",
    tags: ["B1-B2", "community", "rules"],
    characters: characters(["clara", "Clara", "C", "right", "green"], ["oscar", "Óscar", "O", "left", "blue"], ["admin", "Admin", "A", "left", "gold"]),
    scenes: [
      { a: msg("clara", "Óscar, encontré plantas de tomate en la azotea.", "Óscar, I found tomato plants on the rooftop.", "azotea", "rooftop"), b: msg("oscar", "¿Tomates? El edificio no permite jardines arriba.", "Tomatoes? The building does not allow gardens upstairs.", "no permite", "does not allow"), c: msg("clara", "Eso pensé, pero están muy cuidadas.", "That is what I thought, but they are very well cared for.", "muy cuidadas", "well cared for"), d: msg("oscar", "No las toques hasta saber de quién son.", "Do not touch them until we know whose they are.", "hasta saber", "until knowing"), e: msg("clara", "Hay una nota: riego los martes y viernes.", "There is a note: I water on Tuesdays and Fridays.", "riego", "I water") },
      { a: msg("admin", "Vecinos, ¿alguien sabe de unas plantas en la azotea?", "Neighbors, does anyone know about some plants on the rooftop?", "vecinos", "neighbors"), b: msg("clara", "Yo las vi, pero no sé quién las puso.", "I saw them, but I do not know who put them there.", "quién las puso", "who put them there"), c: msg("oscar", "Antes de quitarlas, revisemos si causan daño.", "Before removing them, let's check if they cause damage.", "causan daño", "cause damage"), d: msg("admin", "Buena idea. Necesito fotos y ubicación exacta.", "Good idea. I need photos and exact location.", "ubicación exacta", "exact location"), e: msg("clara", "Mando fotos. Están lejos de los desagües.", "I am sending photos. They are far from the drains.", "desagües", "drains") },
      { a: msg("oscar", "Alguien respondió en el grupo: son de la señora Elena.", "Someone answered in the group: they belong to Mrs. Elena.", "respondió", "answered"), b: msg("clara", "¿La vecina del quinto?", "The neighbor from the fifth floor?", "quinto", "fifth"), c: msg("admin", "Sí. Dice que las plantó durante su recuperación.", "Yes. She says she planted them during her recovery.", "recuperación", "recovery"), d: msg("oscar", "Eso cambia el tono, pero no las reglas.", "That changes the tone, but not the rules.", "cambia el tono", "changes the tone"), e: msg("clara", "Exacto. Podemos hablar sin acusar.", "Exactly. We can talk without accusing.", "sin acusar", "without accusing") },
      { a: msg("admin", "Elena dice que el jardín la ayudó a salir de casa.", "Elena says the garden helped her leave the house.", "la ayudó", "helped her"), b: msg("clara", "Entonces hay que buscar una solución, no solo retirar todo.", "Then we need to look for a solution, not just remove everything.", "buscar una solución", "look for a solution"), c: msg("oscar", "Podemos proponer macetas seguras y permiso por escrito.", "We can propose safe pots and written permission.", "permiso por escrito", "written permission"), d: msg("admin", "También hace falta acceso claro para mantenimiento.", "Clear access for maintenance is also needed.", "mantenimiento", "maintenance"), e: msg("clara", "Suena justo: jardín sí, riesgo no.", "Sounds fair: garden yes, risk no.", "suena justo", "sounds fair") },
      { a: msg("oscar", "Hay una reunión esta tarde.", "There is a meeting this afternoon.", "esta tarde", "this afternoon"), b: msg("clara", "Voy a llevar una propuesta.", "I will bring a proposal.", "propuesta", "proposal"), c: msg("admin", "Incluye horarios de riego.", "Include watering times.", "horarios", "schedules"), d: msg("clara", "Y una lista de plantas permitidas.", "And a list of permitted plants.", "plantas permitidas", "permitted plants"), e: msg("oscar", "Nunca pensé discutir tomates con tanta formalidad.", "I never thought I would discuss tomatoes with such formality.", "formalidad", "formality") },
      { a: msg("admin", "Elena aceptó mover dos macetas.", "Elena agreed to move two pots.", "aceptó", "agreed"), b: msg("clara", "¿Y las demás?", "And the others?", "las demás", "the others"), c: msg("admin", "Pueden quedarse si tienen bandejas contra filtraciones.", "They can stay if they have trays against leaks.", "filtraciones", "leaks"), d: msg("oscar", "Eso protege el techo y el jardín.", "That protects the roof and the garden.", "protege", "protects"), e: msg("clara", "Cuando una regla cuida a todos, deja de sentirse castigo.", "When a rule cares for everyone, it stops feeling like punishment.", "castigo", "punishment") },
      { a: msg("oscar", "Elena quiere compartir tomates cuando maduren.", "Elena wants to share tomatoes when they ripen.", "cuando maduren", "when they ripen"), b: msg("clara", "Eso va a cambiar la opinión del grupo.", "That will change the group's opinion.", "cambiar la opinión", "change the opinion"), c: msg("admin", "No prometamos tomates como argumento legal.", "Let's not promise tomatoes as a legal argument.", "argumento legal", "legal argument"), d: msg("oscar", "Pero como argumento emocional funciona.", "But as an emotional argument, it works.", "funciona", "works"), e: msg("clara", "Tomate no resuelve todo, pero ayuda.", "Tomato does not solve everything, but it helps.", "ayuda", "helps") },
      { a: msg("admin", "La propuesta quedó aprobada por mayoría.", "The proposal was approved by majority.", "por mayoría", "by majority"), b: msg("clara", "Entonces el jardín ya no es secreto.", "Then the garden is no longer secret.", "ya no es secreto", "is no longer secret"), c: msg("oscar", "Es comunitario, con reglas.", "It is community-based, with rules.", "comunitario", "community-based"), d: msg("clara", "Elena escribió gracias en el grupo.", "Elena wrote thanks in the group.", "escribió gracias", "wrote thanks"), e: msg("admin", "Final oficial: tomates legales y techo protegido.", "Official ending: legal tomatoes and protected roof.", "techo protegido", "protected roof") },
    ],
    checkSeeds: [
      check("What does Clara find on the rooftop?", "Tomato plants", "A violin", "A backpack", "A phone", "Clara finds tomato plants on the rooftop.", "gist"),
      check("What is the building rule?", "Gardens are not allowed upstairs", "Tomatoes are free", "No meetings allowed", "Only flowers allowed", "Óscar says the building does not allow gardens upstairs.", "detail"),
      check("What does the note say?", "Water on Tuesdays and Fridays", "Do not touch the roof", "Call the police", "Eat the tomatoes", "The note says watering happens Tuesdays and Fridays.", "detail"),
      check("What does Admin ask for?", "Photos and exact location", "Money", "A recipe", "A train number", "Admin asks for photos and exact location.", "detail"),
      check("Who planted the tomatoes?", "Mrs. Elena", "Clara", "Óscar", "Admin", "The group says they belong to Mrs. Elena.", "detail"),
      check("Why did Elena plant them?", "They helped during her recovery", "She wanted to break rules", "She was selling them", "She lost her keys", "Admin says the garden helped Elena during recovery.", "cause"),
      check("What solution do they propose?", "Safe pots and written permission", "Destroy everything", "Ignore maintenance", "Move away", "Óscar proposes safe pots and written permission.", "solution"),
      check("What must the proposal include?", "Watering times and permitted plants", "Cake flavors", "Phone labels", "Concert tickets", "Admin asks for watering times and Clara adds permitted plants.", "detail"),
      check("What does Elena agree to move?", "Two pots", "All elevators", "The roof door", "A violin", "Admin says Elena accepted moving two pots.", "detail"),
      check("What protects against leaks?", "Trays", "Tomatoes", "A blanket", "A receipt", "The remaining pots need trays against leaks.", "detail"),
      check("What does Elena offer later?", "To share tomatoes", "To cancel the garden", "To buy drones", "To paint the roof", "Elena wants to share tomatoes when they ripen.", "detail"),
      check("How is the proposal approved?", "By majority", "By one person only", "By accident", "By a child", "Admin says it was approved by majority.", "detail"),
      check("What is the final result?", "Legal tomatoes and a protected roof", "No plants and no rules", "A secret garden forever", "A broken roof", "Admin summarizes the official ending.", "summary"),
    ],
    learnedVocab: ["azotea", "no permite", "riego", "desagües", "recuperación", "sin acusar", "permiso por escrito", "filtraciones", "por mayoría", "techo protegido"],
  }),
  story({
    id: "spanish-neutral-b2-cafe-blackout",
    title: "B1-B2 Story 6: El apagón del café",
    subtitle: "A cafe story about a power outage, an unfinished proposal, and strangers helping each other.",
    level: "upper-intermediate",
    tags: ["B1-B2", "cafe", "community"],
    characters: characters(["ines", "Inés", "I", "right", "violet"], ["raul", "Raúl", "R", "left", "blue"], ["barista", "Barista", "B", "left", "gold"]),
    scenes: [
      { a: msg("ines", "Raúl, se fue la luz en el café y mi computadora tiene 8%.", "Raúl, the power went out in the cafe and my computer has 8%.", "se fue la luz", "the power went out"), b: msg("raul", "¿Guardaste la propuesta?", "Did you save the proposal?", "guardaste", "did you save"), c: msg("ines", "Sí, pero necesito enviarla antes de las cinco.", "Yes, but I need to send it before five.", "antes de las cinco", "before five"), d: msg("barista", "Tenemos wifi de respaldo, pero no enchufes.", "We have backup wifi, but no outlets.", "wifi de respaldo", "backup wifi"), e: msg("ines", "Eso es medio milagro y medio tragedia.", "That is half miracle and half tragedy.", "medio milagro", "half miracle") },
      { a: msg("raul", "Baja el brillo de la pantalla.", "Lower the screen brightness.", "baja el brillo", "lower the brightness"), b: msg("ines", "Hecho. Ahora tengo 7%.", "Done. Now I have 7%.", "hecho", "done"), c: msg("barista", "Una clienta tiene batería portátil.", "A customer has a portable battery.", "batería portátil", "portable battery"), d: msg("ines", "¿Puedo pedírsela?", "Can I ask her for it?", "pedírsela", "ask her for it"), e: msg("barista", "Ya le pregunté. Dice que sí si le prestas tu mesa.", "I already asked her. She says yes if you lend her your table.", "le pregunté", "I asked her") },
      { a: msg("ines", "Intercambio aceptado: mesa por batería.", "Exchange accepted: table for battery.", "intercambio", "exchange"), b: msg("raul", "Eso suena a economía de emergencia.", "That sounds like emergency economics.", "economía de emergencia", "emergency economics"), c: msg("ines", "La propuesta abrió, pero falta revisar una cifra.", "The proposal opened, but one number still needs checking.", "una cifra", "a number"), d: msg("raul", "Mándame foto de la página.", "Send me a photo of the page.", "mándame", "send me"), e: msg("ines", "Foto enviada. Si salvamos esto, compro café para todos.", "Photo sent. If we save this, I buy coffee for everyone.", "para todos", "for everyone") },
      { a: msg("raul", "La cifra correcta es 18.500, no 15.800.", "The correct number is 18,500, not 15,800.", "cifra correcta", "correct number"), b: msg("ines", "Eso cambia el presupuesto.", "That changes the budget.", "presupuesto", "budget"), c: msg("barista", "La luz vuelve en quince minutos, según el edificio.", "The power returns in fifteen minutes, according to the building.", "según", "according to"), d: msg("ines", "No puedo esperar tanto.", "I cannot wait that long.", "no puedo esperar", "I cannot wait"), e: msg("raul", "Entonces envía versión breve con nota de revisión.", "Then send a brief version with a review note.", "versión breve", "brief version") },
      { a: msg("ines", "Estoy escribiendo la nota: cifra actualizada pendiente de confirmación final.", "I am writing the note: updated number pending final confirmation.", "pendiente de confirmación", "pending confirmation"), b: msg("raul", "Suena profesional.", "Sounds professional.", "suena profesional", "sounds professional"), c: msg("barista", "La clienta pregunta si ganó café gratis.", "The customer asks if she won free coffee.", "café gratis", "free coffee"), d: msg("ines", "Sí. La batería salvó mi tarde.", "Yes. The battery saved my afternoon.", "salvó", "saved"), e: msg("barista", "Entonces hoy tenemos menú especial: espresso y solidaridad.", "Then today we have a special menu: espresso and solidarity.", "solidaridad", "solidarity") },
      { a: msg("ines", "Propuesta enviada con 2% de batería.", "Proposal sent with 2% battery.", "enviada", "sent"), b: msg("raul", "Eso fue demasiado cerca.", "That was too close.", "demasiado cerca", "too close"), c: msg("barista", "Volvió la luz justo ahora.", "The power came back just now.", "volvió la luz", "the power came back"), d: msg("ines", "Claro. Dramática hasta el final.", "Of course. Dramatic until the end.", "hasta el final", "until the end"), e: msg("raul", "La electricidad tiene sentido del humor.", "Electricity has a sense of humor.", "sentido del humor", "sense of humor") },
      { a: msg("ines", "El cliente respondió: recibido, gracias por avisar la cifra.", "The client replied: received, thanks for flagging the number.", "gracias por avisar", "thanks for flagging"), b: msg("raul", "Buena señal.", "Good sign.", "buena señal", "good sign"), c: msg("barista", "La clienta de la batería está aplaudiendo.", "The battery customer is applauding.", "aplaudiendo", "applauding"), d: msg("ines", "Ahora sí debo café.", "Now I really owe coffee.", "debo", "I owe"), e: msg("barista", "Anoto tres cafés en la cuenta de la heroicidad.", "I will put three coffees on the heroism tab.", "heroicidad", "heroism") },
      { a: msg("raul", "Aprendizaje: batería externa siempre.", "Lesson: always carry an external battery.", "aprendizaje", "lesson"), b: msg("ines", "Y guardar archivos cada cinco minutos.", "And save files every five minutes.", "guardar archivos", "save files"), c: msg("barista", "Y confiar un poco en desconocidos con cargador.", "And trust a little in strangers with chargers.", "desconocidos", "strangers"), d: msg("ines", "Hoy el café fue oficina, refugio y equipo técnico.", "Today the cafe was office, shelter, and technical team.", "refugio", "shelter"), e: msg("raul", "Título perfecto: propuesta con poca batería y mucha ayuda.", "Perfect title: proposal with low battery and lots of help.", "mucha ayuda", "lots of help") },
    ],
    checkSeeds: [
      check("What happens at the cafe?", "The power goes out", "A violin disappears", "A drone crashes", "A package arrives", "Inés says the power went out.", "gist"),
      check("What urgent task does Inés have?", "Send a proposal before five", "Bake a cake", "Catch a train", "Find a backpack", "She needs to send the proposal before five.", "detail"),
      check("What does the cafe still have?", "Backup wifi", "Many outlets", "No customers", "A printer", "The barista says they have backup wifi but no outlets.", "detail"),
      check("What does a customer lend Inés?", "A portable battery", "A violin", "A tomato plant", "A notebook", "The barista says a customer has a portable battery.", "detail"),
      check("What exchange does Inés accept?", "Table for battery", "Coffee for violin", "Cake for map", "Phone for taxi", "Inés calls it an exchange of table for battery.", "detail"),
      check("What number needs correction?", "18,500 instead of 15,800", "8 instead of 7", "5 instead of 3", "40 instead of 13", "Raúl says the correct number is 18,500.", "detail"),
      check("Why does Inés send a brief version?", "She cannot wait for the power", "The client canceled", "The cafe is closing", "The wifi is gone", "Raúl suggests a brief version because she cannot wait.", "solution"),
      check("What note does Inés add?", "The updated number is pending final confirmation", "The cafe has no coffee", "The client should wait a week", "The proposal is secret", "She writes a note about pending final confirmation.", "detail"),
      check("What saves Inés's afternoon?", "The battery", "The lights", "A train", "A recipe", "Inés says the battery saved her afternoon.", "detail"),
      check("How low is the battery when she sends?", "2%", "50%", "80%", "0%", "Inés sends the proposal with 2% battery.", "detail"),
      check("How does the client respond?", "Received, thanks for flagging the number", "Rejected forever", "Wrong email", "Call later", "The client thanks her for flagging the number.", "detail"),
      check("What does Inés owe now?", "Coffee", "A violin", "A backpack", "A tomato", "Inés says she owes coffee.", "detail"),
      check("What is the final lesson?", "Low battery, lots of help", "Never trust cafes", "Always cancel work", "Never save files", "Raúl summarizes the story as a proposal with low battery and much help.", "summary"),
    ],
    learnedVocab: ["se fue la luz", "guardaste", "wifi de respaldo", "batería portátil", "intercambio", "presupuesto", "versión breve", "solidaridad", "volvió la luz", "desconocidos"],
  }),
  story({
    id: "spanish-neutral-c1-ai-apology",
    title: "C1-C2 Story 4: La disculpa automática",
    subtitle: "An advanced work story about an AI-written apology, responsibility, and choosing a human voice.",
    level: "advanced",
    tags: ["C1-C2", "work", "ethics"],
    characters: characters(["andrea", "Andrea", "A", "right", "red"], ["simon", "Simón", "S", "left", "blue"], ["clienta", "Clienta", "C", "left", "gold"]),
    scenes: [
      { a: msg("andrea", "Simón, el sistema mandó una disculpa automática a la clienta equivocada.", "Simón, the system sent an automatic apology to the wrong client.", "disculpa automática", "automatic apology"), b: msg("simon", "¿Qué decía?", "What did it say?", "¿qué decía?", "what did it say?"), c: msg("andrea", "Gracias por su paciencia con el retraso. Pero no hubo retraso.", "Thank you for your patience with the delay. But there was no delay.", "no hubo retraso", "there was no delay"), d: msg("simon", "Entonces creamos un problema al pedir perdón por otro.", "Then we created a problem by apologizing for another one.", "creamos un problema", "we created a problem"), e: msg("andrea", "Exacto. La automatización acaba de sonar culpable sin contexto.", "Exactly. The automation just sounded guilty without context.", "sin contexto", "without context") },
      { a: msg("clienta", "Andrea, recibí una disculpa por un retraso. ¿Hay algo que deba saber?", "Andrea, I received an apology for a delay. Is there something I should know?", "deba saber", "should know"), b: msg("andrea", "Estoy revisándolo ahora. Gracias por avisarme.", "I am reviewing it now. Thank you for letting me know.", "revisándolo", "reviewing it"), c: msg("simon", "No respondas con otra plantilla.", "Do not respond with another template.", "plantilla", "template"), d: msg("andrea", "Sí. Necesita voz humana, no otra máquina pidiendo calma.", "Yes. It needs a human voice, not another machine asking for calm.", "voz humana", "human voice"), e: msg("simon", "Primero: reconoce la confusión sin inventar excusas.", "First: acknowledge the confusion without inventing excuses.", "reconoce", "acknowledge") },
      { a: msg("andrea", "Voy a decir que el mensaje se envió por error.", "I am going to say the message was sent by mistake.", "por error", "by mistake"), b: msg("simon", "Y que su proyecto no tiene retrasos.", "And that her project has no delays.", "no tiene retrasos", "has no delays"), c: msg("andrea", "También debo explicar qué haremos para que no se repita.", "I also must explain what we will do so it does not happen again.", "no se repita", "does not happen again"), d: msg("simon", "Eso ya es responsabilidad, no teatro.", "That is responsibility, not theater.", "responsabilidad", "responsibility"), e: msg("andrea", "Me gusta: claridad sin dramatizar.", "I like it: clarity without dramatizing.", "sin dramatizar", "without dramatizing") },
      { a: msg("clienta", "Gracias por responder rápido. Me preocupó porque tenemos fecha de lanzamiento.", "Thanks for responding quickly. It worried me because we have a launch date.", "fecha de lanzamiento", "launch date"), b: msg("andrea", "Lo entiendo. La fecha sigue igual.", "I understand. The date remains the same.", "sigue igual", "remains the same"), c: msg("simon", "Bien. Ahora explica la corrección interna.", "Good. Now explain the internal correction.", "corrección interna", "internal correction"), d: msg("andrea", "Desactivaremos esa regla hasta revisarla manualmente.", "We will deactivate that rule until manually reviewing it.", "desactivaremos", "we will deactivate"), e: msg("simon", "Eso suena concreto.", "That sounds concrete.", "concreto", "concrete") },
      { a: msg("andrea", "Me preocupa que parezca poco grave.", "I worry it may seem not serious enough.", "poco grave", "not serious enough"), b: msg("simon", "Grave no significa dramático. Significa tratado con cuidado.", "Serious does not mean dramatic. It means handled carefully.", "tratado con cuidado", "handled carefully"), c: msg("andrea", "Entonces no culpo al sistema como si fuera una persona.", "Then I do not blame the system as if it were a person.", "como si fuera", "as if it were"), d: msg("simon", "Exacto. La herramienta falló, pero nosotros respondemos.", "Exactly. The tool failed, but we respond.", "nosotros respondemos", "we respond"), e: msg("andrea", "Esa frase debería estar en nuestra política.", "That sentence should be in our policy.", "nuestra política", "our policy") },
      { a: msg("clienta", "Aprecio la aclaración. Lo importante es que el lanzamiento siga protegido.", "I appreciate the clarification. The important thing is that the launch remains protected.", "aprecio", "I appreciate"), b: msg("andrea", "Sí. Además, mañana le mandaremos una confirmación del cronograma.", "Yes. Also, tomorrow we will send you a timeline confirmation.", "cronograma", "timeline"), c: msg("simon", "Bien: reparación concreta.", "Good: concrete repair.", "reparación concreta", "concrete repair"), d: msg("andrea", "La clienta respondió mejor de lo que esperaba.", "The client responded better than I expected.", "de lo que esperaba", "than I expected"), e: msg("simon", "Porque no intentaste sonar perfecta; sonaste responsable.", "Because you did not try to sound perfect; you sounded responsible.", "sonaste responsable", "you sounded responsible") },
      { a: msg("andrea", "Voy a revisar todas las plantillas automáticas.", "I am going to review all automatic templates.", "plantillas automáticas", "automatic templates"), b: msg("simon", "Empieza por las que piden disculpas.", "Start with the ones that apologize.", "empieza por", "start with"), c: msg("andrea", "Las disculpas no deberían activarse sin datos suficientes.", "Apologies should not activate without enough data.", "datos suficientes", "enough data"), d: msg("simon", "Y ninguna disculpa debería borrar al responsable humano.", "And no apology should erase the human responsible person.", "borrar", "erase"), e: msg("andrea", "Voy a escribir eso como principio.", "I am going to write that as a principle.", "principio", "principle") },
      { a: msg("clienta", "Gracias por cuidar el tema sin hacerlo más grande de lo necesario.", "Thank you for handling the issue without making it bigger than necessary.", "sin hacerlo más grande", "without making it bigger"), b: msg("andrea", "Gracias por avisarnos en vez de asumir lo peor.", "Thank you for telling us instead of assuming the worst.", "asumir lo peor", "assume the worst"), c: msg("simon", "Crisis pequeña, aprendizaje grande.", "Small crisis, big lesson.", "aprendizaje grande", "big lesson"), d: msg("andrea", "La próxima disculpa automática tendrá una persona detrás.", "The next automatic apology will have a person behind it.", "persona detrás", "person behind it"), e: msg("simon", "Entonces ya no será solo automática; será responsable.", "Then it will no longer be only automatic; it will be responsible.", "será responsable", "will be responsible") },
    ],
    checkSeeds: [
      check("What goes wrong?", "An automatic apology goes to the wrong client", "A train is delayed", "A violin is lost", "A cake burns", "Andrea says the system sent an automatic apology to the wrong client.", "gist"),
      check("Why is the apology confusing?", "There was no delay", "The client asked for it", "It was in English", "It had no name", "The message apologized for a delay that did not exist.", "detail"),
      check("What does the client ask?", "Whether there is something she should know", "For a recipe", "For a train ticket", "For a backpack", "The client asks if there is something she should know.", "detail"),
      check("What does Simón warn against?", "Using another template", "Calling the client", "Explaining the facts", "Reviewing the system", "Simón says not to respond with another template.", "detail"),
      check("What should Andrea acknowledge?", "The confusion", "A fake delay", "Her resignation", "A lost file", "Simón says to acknowledge the confusion without excuses.", "detail"),
      check("What concrete fact does Andrea clarify?", "The project has no delays", "The project is canceled", "The launch moved", "The client owes money", "She clarifies that the date remains the same and there is no delay.", "detail"),
      check("What internal correction will they make?", "Deactivate the rule until manual review", "Delete the client", "Stop all emails", "Cancel the launch", "Andrea says they will deactivate the rule until reviewing it manually.", "solution"),
      check("What distinction does Simón make?", "Serious does not mean dramatic", "Automation is always wrong", "Clients always panic", "Templates are illegal", "Simón says serious means handled carefully, not dramatic.", "theme"),
      check("Who is responsible when the tool fails?", "The humans using it", "Only the software", "The client", "Nobody", "Simón says the tool failed, but they respond.", "inference"),
      check("What does the client care about most?", "The launch remains protected", "The wording is poetic", "The system sounds human", "The meeting is longer", "The client says the important thing is that the launch is protected.", "detail"),
      check("What templates will Andrea review first?", "The apology templates", "The sales reports", "The birthday messages", "The garden rules", "Simón tells her to start with apology templates.", "detail"),
      check("What principle does Andrea write?", "No apology should erase the human responsible", "All emails should be automatic", "Never apologize", "Always blame the client", "Andrea plans to write the responsibility principle.", "inference"),
      check("What is the final lesson?", "Automatic can still be responsible if a human stands behind it", "Never use technology", "Clients dislike honesty", "Templates are always better", "Simón says it will be responsible, not just automatic.", "summary"),
    ],
    learnedVocab: ["disculpa automática", "sin contexto", "plantilla", "voz humana", "por error", "responsabilidad", "desactivaremos", "cronograma", "datos suficientes", "será responsable"],
  }),
  story({
    id: "spanish-neutral-c1-locked-archive",
    title: "C1-C2 Story 5: El archivo bloqueado",
    subtitle: "An advanced academic story about access, authorship, and a hidden note in a blocked archive.",
    level: "advanced",
    tags: ["C1-C2", "research", "ethics"],
    characters: characters(["lara", "Lara", "L", "right", "violet"], ["diego", "Diego", "D", "left", "blue"], ["prof", "Profesora", "P", "left", "gold"]),
    scenes: [
      { a: msg("lara", "Diego, el archivo digital se bloqueó justo antes de mi presentación.", "Diego, the digital archive locked right before my presentation.", "se bloqueó", "locked"), b: msg("diego", "¿Tienes copia local?", "Do you have a local copy?", "copia local", "local copy"), c: msg("lara", "Solo de los primeros documentos.", "Only of the first documents.", "primeros documentos", "first documents"), d: msg("diego", "Respira. ¿Qué parte te falta?", "Breathe. What part are you missing?", "qué parte", "which part"), e: msg("lara", "La carta que prueba quién escribió el ensayo.", "The letter that proves who wrote the essay.", "quién escribió", "who wrote") },
      { a: msg("prof", "Lara, si no puedes abrirlo, no afirmes más de lo que puedes demostrar.", "Lara, if you cannot open it, do not claim more than you can prove.", "demostrar", "prove"), b: msg("lara", "Lo sé. Pero sin esa carta mi argumento queda incompleto.", "I know. But without that letter my argument is incomplete.", "queda incompleto", "remains incomplete"), c: msg("diego", "Podemos revisar metadatos.", "We can review metadata.", "metadatos", "metadata"), d: msg("lara", "Los metadatos muestran una nota añadida en 1982.", "The metadata shows a note added in 1982.", "nota añadida", "added note"), e: msg("prof", "Eso no prueba autoría, pero abre una pregunta legítima.", "That does not prove authorship, but opens a legitimate question.", "autoría", "authorship") },
      { a: msg("lara", "La pregunta es suficiente para no cerrar el tema.", "The question is enough to not close the topic.", "cerrar el tema", "close the topic"), b: msg("diego", "Exacto. Cambia afirmar por proponer.", "Exactly. Change claiming into proposing.", "proponer", "propose"), c: msg("lara", "Diré que la atribución necesita revisión.", "I will say the attribution needs review.", "atribución", "attribution"), d: msg("prof", "Eso es sólido y honesto.", "That is solid and honest.", "sólido", "solid"), e: msg("lara", "Me cuesta soltar la frase más fuerte.", "It is hard to let go of the stronger sentence.", "soltar", "let go") },
      { a: msg("diego", "La frase fuerte sin prueba se vuelve frágil.", "A strong sentence without proof becomes fragile.", "frágil", "fragile"), b: msg("lara", "Duele, pero sí.", "It hurts, but yes.", "duele", "it hurts"), c: msg("prof", "La investigación gana credibilidad cuando muestra sus límites.", "Research gains credibility when it shows its limits.", "credibilidad", "credibility"), d: msg("lara", "Voy a añadir una diapositiva de límites.", "I will add a slide about limits.", "diapositiva", "slide"), e: msg("diego", "Eso puede salvarte de una pregunta difícil.", "That can save you from a difficult question.", "pregunta difícil", "difficult question") },
      { a: msg("lara", "El archivo acaba de abrir parcialmente.", "The archive just opened partially.", "parcialmente", "partially"), b: msg("diego", "¿Puedes ver la carta?", "Can you see the letter?", "ver la carta", "see the letter"), c: msg("lara", "Solo la primera página.", "Only the first page.", "primera página", "first page"), d: msg("prof", "¿Hay firma?", "Is there a signature?", "firma", "signature"), e: msg("lara", "No, pero hay una frase tachada que menciona colaboración.", "No, but there is a crossed-out phrase that mentions collaboration.", "frase tachada", "crossed-out phrase") },
      { a: msg("diego", "Eso cambia mucho: no autor único, quizás trabajo compartido.", "That changes a lot: not sole author, maybe shared work.", "trabajo compartido", "shared work"), b: msg("lara", "La historia oficial borró a alguien.", "The official story erased someone.", "borró", "erased"), c: msg("prof", "Cuidado: di pudo haber borrado, no borró.", "Careful: say may have erased, not erased.", "pudo haber", "may have"), d: msg("lara", "Tienes razón. Precisión antes que impacto.", "You are right. Precision before impact.", "precisión", "precision"), e: msg("diego", "Y a veces la precisión impacta más.", "And sometimes precision has more impact.", "impacta más", "has more impact") },
      { a: msg("lara", "Presenté la versión prudente.", "I presented the careful version.", "versión prudente", "careful version"), b: msg("diego", "¿Cómo reaccionaron?", "How did they react?", "reaccionaron", "reacted"), c: msg("lara", "La primera pregunta fue justo sobre la carta bloqueada.", "The first question was exactly about the blocked letter.", "carta bloqueada", "blocked letter"), d: msg("prof", "¿Y?", "And?", "¿y?", "and?"), e: msg("lara", "Pude responder sin exagerar. Eso se sintió raro y bien.", "I could answer without exaggerating. That felt strange and good.", "sin exagerar", "without exaggerating") },
      { a: msg("prof", "Ese es el oficio: sostener dudas con rigor.", "That is the craft: holding doubts with rigor.", "rigor", "rigor"), b: msg("lara", "Después una investigadora me ofreció acceso a otra copia.", "Afterward a researcher offered me access to another copy.", "otra copia", "another copy"), c: msg("diego", "Entonces la prudencia abrió una puerta.", "Then prudence opened a door.", "abrió una puerta", "opened a door"), d: msg("lara", "Sí. No gané una conclusión final, pero gané camino.", "Yes. I did not gain a final conclusion, but I gained a path.", "gané camino", "gained a path"), e: msg("prof", "A veces una buena tesis no cierra; invita.", "Sometimes a good thesis does not close; it invites.", "invita", "invites") },
    ],
    checkSeeds: [
      check("What problem does Lara face?", "The digital archive locks before her presentation", "She loses a violin", "Her cafe loses power", "Her phone breaks", "Lara says the archive locked right before her presentation.", "gist"),
      check("What document does Lara need?", "A letter proving who wrote the essay", "A train ticket", "A recipe", "A drone permit", "She needs the letter about authorship.", "detail"),
      check("What does the professor warn Lara not to do?", "Claim more than she can prove", "Cancel the presentation", "Open all files", "Ignore metadata", "The professor says not to claim more than she can demonstrate.", "theme"),
      check("What do the metadata show?", "A note added in 1982", "A missing phone", "A payment", "A cafe menu", "The metadata show a note added in 1982.", "detail"),
      check("How should Lara change her argument?", "From claiming to proposing", "From Spanish to English", "From research to cooking", "From proof to silence", "Diego tells her to change afirmar into proponer.", "solution"),
      check("What slide does Lara add?", "A slide about limits", "A title slide only", "A photo of a train", "A recipe slide", "She decides to add a slide about limits.", "detail"),
      check("What part of the letter opens?", "Only the first page", "The last page", "All pages", "No page", "Lara can only see the first page.", "detail"),
      check("What phrase appears in the letter?", "A crossed-out phrase about collaboration", "A birthday message", "A shopping list", "A taxi note", "Lara sees a crossed-out phrase mentioning collaboration.", "detail"),
      check("What correction does the professor make?", "Say may have erased, not erased", "Say nothing happened", "Say everyone lied", "Say the archive is useless", "The professor corrects Lara's certainty.", "precision"),
      check("What kind of version does Lara present?", "A careful version", "An exaggerated version", "A canceled version", "A funny version", "Lara presents the prudent version.", "detail"),
      check("How does Lara answer the first question?", "Without exaggerating", "By inventing proof", "By refusing to answer", "By changing the topic", "Lara says she answered without exaggerating.", "detail"),
      check("What does another researcher offer?", "Access to another copy", "A job", "A violin", "A plant", "A researcher offers access to another copy.", "detail"),
      check("What is the final idea?", "A good thesis can invite rather than close", "Archives are useless", "Questions should be avoided", "Proof is not needed", "The professor says a good thesis sometimes invites.", "summary"),
    ],
    learnedVocab: ["se bloqueó", "copia local", "demostrar", "metadatos", "autoría", "atribución", "credibilidad", "frase tachada", "precisión", "rigor"],
  }),
  story({
    id: "spanish-neutral-c2-truth-dinner",
    title: "C1-C2 Story 6: La cena de la verdad",
    subtitle: "An advanced family story about an inheritance dinner, old silence, and telling the truth without destroying the table.",
    level: "advanced",
    tags: ["C1-C2", "family", "emotional nuance"],
    characters: characters(["noelia", "Noelia", "N", "right", "red"], ["hector", "Héctor", "H", "left", "blue"], ["tia", "Tía Luz", "L", "left", "gold"]),
    scenes: [
      { a: msg("noelia", "Héctor, esta cena por la herencia se siente como una obra de teatro.", "Héctor, this inheritance dinner feels like a play.", "herencia", "inheritance"), b: msg("hector", "¿Todos fingiendo calma?", "Everyone pretending calm?", "fingiendo calma", "pretending calm"), c: msg("noelia", "Exacto. Hay sonrisas, pero nadie toca el tema real.", "Exactly. There are smiles, but nobody touches the real topic.", "tema real", "real topic"), d: msg("hector", "No empieces con acusaciones.", "Do not start with accusations.", "acusaciones", "accusations"), e: msg("noelia", "No quiero acusar. Quiero dejar de actuar.", "I do not want to accuse. I want to stop acting.", "dejar de actuar", "stop acting") },
      { a: msg("tia", "Noelia, tu madre quería que todos estuviéramos juntos hoy.", "Noelia, your mother wanted all of us together today.", "estuviéramos juntos", "we were together"), b: msg("noelia", "Lo sé, tía. También quería que habláramos con honestidad.", "I know, Aunt. She also wanted us to speak honestly.", "con honestidad", "honestly"), c: msg("hector", "Buen inicio. No rompe nada todavía.", "Good start. It does not break anything yet.", "buen inicio", "good start"), d: msg("noelia", "La mesa se quedó callada.", "The table went silent.", "se quedó callada", "went silent"), e: msg("tia", "A veces el silencio es la primera respuesta honesta.", "Sometimes silence is the first honest answer.", "primera respuesta", "first answer") },
      { a: msg("noelia", "Mi primo quiere vender la casa rápido.", "My cousin wants to sell the house quickly.", "vender la casa", "sell the house"), b: msg("hector", "¿Y tú?", "And you?", "¿y tú?", "and you?"), c: msg("noelia", "No me opongo a vender. Me opongo a fingir que no duele.", "I am not against selling. I am against pretending it does not hurt.", "no me opongo", "I am not against"), d: msg("tia", "Eso es distinto.", "That is different.", "es distinto", "is different"), e: msg("noelia", "Sí. Necesito que el duelo tenga silla en la mesa.", "Yes. I need grief to have a chair at the table.", "duelo", "grief") },
      { a: msg("hector", "Esa frase es fuerte, pero justa.", "That phrase is strong, but fair.", "fuerte pero justa", "strong but fair"), b: msg("tia", "Tu madre también decía cosas así.", "Your mother also said things like that.", "decía", "used to say"), c: msg("noelia", "Entonces tal vez no estoy arruinando la cena.", "Then maybe I am not ruining the dinner.", "arruinando", "ruining"), d: msg("hector", "Estás nombrando lo que ya estaba sentado ahí.", "You are naming what was already sitting there.", "nombrando", "naming"), e: msg("tia", "La casa no es solo paredes; por eso cuesta decidir.", "The house is not only walls; that is why deciding is hard.", "cuesta decidir", "is hard to decide") },
      { a: msg("noelia", "Mi primo acaba de decir que hablar de dolor no paga impuestos.", "My cousin just said that talking about pain does not pay taxes.", "no paga impuestos", "does not pay taxes"), b: msg("hector", "Uf. Respira antes de responder.", "Oof. Breathe before answering.", "antes de responder", "before answering"), c: msg("noelia", "Le dije: tienes razón, pero tampoco compra paz.", "I told him: you are right, but it also does not buy peace.", "compra paz", "buys peace"), d: msg("tia", "La mesa volvió a callarse.", "The table went silent again.", "volvió a callarse", "went silent again"), e: msg("hector", "Silencio dos. Esta vez con más verdad.", "Silence two. This time with more truth.", "más verdad", "more truth") },
      { a: msg("tia", "Propongo vender, pero guardar una tarde para despedirnos de la casa.", "I propose selling, but keeping one afternoon to say goodbye to the house.", "despedirnos", "say goodbye"), b: msg("noelia", "Eso sí puedo aceptarlo.", "That I can accept.", "puedo aceptarlo", "I can accept it"), c: msg("hector", "Ahí está el puente.", "There is the bridge.", "el puente", "the bridge"), d: msg("noelia", "Mi primo no dijo no. Solo bajó la mirada.", "My cousin did not say no. He just lowered his gaze.", "bajó la mirada", "lowered his gaze"), e: msg("tia", "A veces bajar la mirada es dejar de pelear.", "Sometimes lowering the gaze is stopping the fight.", "dejar de pelear", "stop fighting") },
      { a: msg("noelia", "Estamos eligiendo fecha para esa despedida.", "We are choosing a date for that goodbye.", "eligiendo fecha", "choosing a date"), b: msg("hector", "Eso ya es mucho.", "That is already a lot.", "ya es mucho", "is already a lot"), c: msg("tia", "Cada quien llevará un objeto que quiera recordar.", "Each person will bring an object they want to remember.", "cada quien", "each person"), d: msg("noelia", "Yo llevaré la taza azul de mi madre.", "I will bring my mother's blue cup.", "taza azul", "blue cup"), e: msg("hector", "La herencia empieza a parecer memoria, no solo trámite.", "The inheritance starts to look like memory, not just paperwork.", "trámite", "paperwork") },
      { a: msg("noelia", "La cena terminó sin abrazos grandes, pero sin gritos.", "The dinner ended without big hugs, but without shouting.", "sin gritos", "without shouting"), b: msg("tia", "Eso también es victoria en esta familia.", "That is also victory in this family.", "victoria", "victory"), c: msg("hector", "¿Cómo estás?", "How are you?", "¿cómo estás?", "how are you?"), d: msg("noelia", "Cansada. Pero no traicioné mi verdad para cuidar la comodidad de todos.", "Tired. But I did not betray my truth to protect everyone's comfort.", "traicioné mi verdad", "betrayed my truth"), e: msg("tia", "Tu madre habría reconocido esa valentía en silencio.", "Your mother would have recognized that courage in silence.", "valentía", "courage") },
    ],
    checkSeeds: [
      check("Why does the dinner feel tense?", "It is about inheritance and everyone is pretending calm", "The food is late", "A train is missing", "A phone is broken", "Noelia says the inheritance dinner feels like theater.", "gist"),
      check("What does Noelia want?", "To stop acting", "To accuse everyone", "To cancel the dinner", "To sell immediately", "She says she does not want to accuse; she wants to stop acting.", "theme"),
      check("What did Noelia's mother want?", "For everyone to be together", "For the house to burn", "For no one to talk", "For Héctor to leave", "Aunt Luz says Noelia's mother wanted them together.", "detail"),
      check("What does Noelia oppose?", "Pretending the sale does not hurt", "Selling under any condition", "Speaking honestly", "Keeping memories", "Noelia says she opposes pretending it does not hurt.", "detail"),
      check("What does Noelia want grief to have?", "A chair at the table", "A legal document", "A taxi", "A locked archive", "Noelia says grief needs a chair at the table.", "metaphor"),
      check("What does Aunt Luz say about the house?", "It is not only walls", "It is only money", "It is already sold", "It has no memories", "Aunt Luz says the house is not just walls.", "inference"),
      check("What harsh comment does the cousin make?", "Talking about pain does not pay taxes", "The house is ugly", "Noelia is late", "The dinner is over", "He says speaking about pain does not pay taxes.", "detail"),
      check("How does Noelia answer?", "It also does not buy peace", "She leaves immediately", "She agrees to silence", "She starts shouting", "Noelia responds that it does not buy peace either.", "tone"),
      check("What does Aunt Luz propose?", "Sell, but keep an afternoon to say goodbye", "Never sell", "Sell without talking", "Cancel the goodbye", "Aunt Luz proposes a goodbye afternoon.", "solution"),
      check("How does the cousin respond to the proposal?", "He does not say no and lowers his gaze", "He shouts", "He leaves", "He signs immediately", "Noelia says he lowered his gaze and did not say no.", "inference"),
      check("What will each person bring?", "An object they want to remember", "A legal bill", "A new chair", "A train ticket", "Aunt Luz says each person will bring an object.", "detail"),
      check("How does the dinner end?", "Without big hugs, but without shouting", "With a fight", "With a sale contract only", "With everyone leaving angry", "Noelia says it ended without hugs but without shouting.", "summary"),
      check("What does Noelia not betray?", "Her truth", "Her cousin", "The house key", "The food", "She says she did not betray her truth to protect comfort.", "theme"),
    ],
    learnedVocab: ["herencia", "fingiendo calma", "tema real", "con honestidad", "duelo", "nombrando", "despedirnos", "trámite", "traicioné mi verdad", "valentía"],
  }),
];
