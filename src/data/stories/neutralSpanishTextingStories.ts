import type { CheckpointQuestion, Highlight, Level, StoryCharacter, StoryComprehensionCheck, StoryMessage, WhatsAppStory } from "../../types";

type HighlightSeed = [phrase: string, meaning: string, note?: string];
type MessageSeed = {
  speakerId: string;
  text: string;
  translation: string;
  vocab: HighlightSeed[];
  grammar?: HighlightSeed[];
};
type CheckSeed = {
  question: string;
  options: [string, string, string, string];
  correct: string;
  explanation: string;
  skill: string;
  afterMessageId?: string;
};

function highlights(seeds: HighlightSeed[]): Highlight[] {
  return seeds.map(([phrase, meaning, note]) => ({ phrase, meaning, note }));
}

function grammarHighlights(seeds?: HighlightSeed[]): Highlight[] | undefined {
  return seeds?.map(([phrase, meaning, note]) => ({ phrase, explanation: `${meaning}${note ? ` ${note}` : ""}` }));
}

function messages(storyId: string, title: string, seeds: MessageSeed[]): StoryMessage[] {
  const chatMessages = seeds.map((seed, index) => ({
    id: `m${index + 1}`,
    speakerId: seed.speakerId,
    messageType: (index + 1) % 5 === 0 ? "voice-note" as const : "text" as const,
    text: seed.text,
    translation: seed.translation,
    audioUrl: (index + 1) % 5 === 0 ? `/audio/stories/${storyId}/m${index + 1}.mp3` : undefined,
    vocabHighlights: highlights(seed.vocab),
    grammarHighlights: grammarHighlights(seed.grammar),
  }));

  return [
    {
      id: "n1",
      speakerId: "narrator",
      messageType: "narrator",
      text: `Guía de historia: ${title}. Lee el chat como una conversación real. Algunas burbujas son notas de voz; toca play primero, o Aa si necesitas ver el texto.`,
      translation: `Story guide: ${title}. Read the chat like a real conversation. Some bubbles are voice notes; tap play first, or Aa if you need to see the text.`,
    },
    ...chatMessages.slice(0, 12),
    {
      id: "n2",
      speakerId: "narrator",
      messageType: "narrator",
      text: "Pausa rápida: mira quién sabe qué, qué problema aparece y qué solución proponen.",
      translation: "Quick pause: notice who knows what, what problem appears, and what solution they suggest.",
    },
    ...chatMessages.slice(12),
  ];
}

function checks(seeds: CheckSeed[]): StoryComprehensionCheck[] {
  return seeds.map((seed, index) => ({
    id: `check-${index + 1}`,
    afterMessageId: seed.afterMessageId ?? `m${Math.min((index + 1) * 3, 15)}`,
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
  messageSeeds,
  checkSeeds,
  learnedVocab,
}: {
  id: string;
  title: string;
  subtitle: string;
  level: Level;
  tags: string[];
  characters: StoryCharacter[];
  messageSeeds: MessageSeed[];
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
    estimatedMinutes: 8,
    skoolSectionName: "Spanish Texting Stories - A1 to C2",
    activityType: "story",
    data: {
      targetLanguage: "spanish",
      nativeLanguage: "english",
      characters,
      messages: messages(id, title, messageSeeds),
      comprehensionChecks: checks(checkSeeds),
      learnedVocab,
      finalReview: {
        keyPhrases: learnedVocab.slice(0, 8),
        grammarPatterns: ["Follow the timeline of the chat.", "Use context before choosing an answer.", "Notice repeated useful chunks."],
        speakingPrompts: ["Retell the problem in two or three sentences.", "Say what each person decides to do.", "Record one message you would send next."],
      },
      completionTask: {
        title: "Final voice note",
        instructions: "Record a short Spanish voice note summarizing the story and one phrase you want to reuse.",
      },
    },
  };
}

export const neutralSpanishTextingStories: WhatsAppStory[] = [
  story({
    id: "spanish-neutral-a1-library-key",
    title: "A1-A2 Story 3: La llave de la biblioteca",
    subtitle: "A simple mystery about a lost key, a closed library, and a note under a plant.",
    level: "elementary",
    tags: ["A1-A2", "mystery", "places"],
    characters: [
      { id: "mia", name: "Mia", initials: "M", side: "right", color: "blue" },
      { id: "leo", name: "Leo", initials: "L", side: "left", color: "gold" },
    ],
    messageSeeds: [
      { speakerId: "mia", text: "Leo, estoy en la biblioteca, pero la puerta está cerrada.", translation: "Leo, I am at the library, but the door is closed.", vocab: [["estoy en", "I am at", "Use estar for location."], ["la puerta está cerrada", "the door is closed", "Basic place problem."]], grammar: [["está cerrada", "is closed.", "Estar + adjective describes a state."]] },
      { speakerId: "leo", text: "Qué raro. La biblioteca abre a las nueve.", translation: "How strange. The library opens at nine.", vocab: [["qué raro", "how strange", "Useful reaction."], ["abre a las nueve", "opens at nine", "Time with a las."]] },
      { speakerId: "mia", text: "Son las nueve y diez. No veo a nadie.", translation: "It is nine ten. I do not see anyone.", vocab: [["son las nueve y diez", "it is nine ten", "Time expression."], ["no veo a nadie", "I don't see anyone", "Negative with nadie."]] },
      { speakerId: "leo", text: "Busca una nota en la ventana.", translation: "Look for a note in the window.", vocab: [["busca", "look for", "Informal command."], ["una nota", "a note", "Simple object."]] },
      { speakerId: "mia", text: "Hay una nota. Dice: la llave está debajo de la planta.", translation: "There is a note. It says: the key is under the plant.", vocab: [["hay una nota", "there is a note", "Hay for existence."], ["debajo de la planta", "under the plant", "Location phrase."]] },
      { speakerId: "leo", text: "Mira la planta grande, no la pequeña.", translation: "Look at the big plant, not the small one.", vocab: [["la planta grande", "the big plant", "Adjective after noun."], ["no la pequeña", "not the small one", "La replaces planta."]] },
      { speakerId: "mia", text: "Encontré una llave, pero es muy pequeña.", translation: "I found a key, but it is very small.", vocab: [["encontré", "I found", "Preterite for completed action."], ["muy pequeña", "very small", "Muy + adjective."]] },
      { speakerId: "leo", text: "Puede ser para la caja azul del escritorio.", translation: "It might be for the blue box on the desk.", vocab: [["puede ser", "it might be", "Simple possibility."], ["la caja azul", "the blue box", "Color after noun."]] },
      { speakerId: "mia", text: "Entré por la puerta lateral. La caja está aquí.", translation: "I entered through the side door. The box is here.", vocab: [["puerta lateral", "side door", "Useful place phrase."], ["está aquí", "is here", "Location with estar."]] },
      { speakerId: "mia", text: "Dentro de la caja hay otra nota: gracias por abrir; hoy hay club de lectura.", translation: "Inside the box there is another note: thanks for opening; today there is book club.", vocab: [["dentro de la caja", "inside the box", "Location phrase."], ["club de lectura", "book club", "Simple event."]] },
      { speakerId: "leo", text: "Entonces no es un robo. Es una sorpresa.", translation: "So it is not a robbery. It is a surprise.", vocab: [["entonces", "so / then", "Connects ideas."], ["una sorpresa", "a surprise", "Story twist."]] },
      { speakerId: "mia", text: "Hay cinco personas esperando con libros.", translation: "There are five people waiting with books.", vocab: [["cinco personas", "five people", "Number + noun."], ["esperando", "waiting", "Gerund form."]] },
      { speakerId: "leo", text: "La bibliotecaria está enferma, y tú tienes la llave.", translation: "The librarian is sick, and you have the key.", vocab: [["está enferma", "is sick", "State with estar."], ["tienes la llave", "you have the key", "Tener for possession."]] },
      { speakerId: "mia", text: "Ahora soy la jefa de la biblioteca por una hora.", translation: "Now I am the boss of the library for one hour.", vocab: [["ahora soy", "now I am", "Ser for role/identity."], ["por una hora", "for one hour", "Duration with por."]] },
      { speakerId: "leo", text: "Perfecto. Lee el primer capítulo y no pierdas la llave.", translation: "Perfect. Read the first chapter and don't lose the key.", vocab: [["lee", "read", "Informal command."], ["no pierdas", "don't lose", "Negative command."]] },
    ],
    checkSeeds: [
      { question: "Where is Mia at the start?", options: ["At the library", "At the airport", "At Leo's house", "At a restaurant"], correct: "At the library", explanation: "Mia says she is at the library.", skill: "gist", afterMessageId: "m1" },
      { question: "What does the first note say?", options: ["The key is under the plant", "The library is closed forever", "Call the police", "Go to the cafe"], correct: "The key is under the plant", explanation: "The note says the key is under the plant.", skill: "detail", afterMessageId: "m5" },
      { question: "What is inside the blue box?", options: ["Another note", "Money", "A phone", "A sandwich"], correct: "Another note", explanation: "Mia says there is another note inside the box.", skill: "detail", afterMessageId: "m10" },
      { question: "Why is Mia suddenly important?", options: ["She has the key", "She wrote all the books", "She is a police officer", "She owns the building"], correct: "She has the key", explanation: "Leo says the librarian is sick and Mia has the key.", skill: "inference" },
      { question: "What should Mia not lose?", options: ["The key", "Her bag", "The plant", "Her ticket"], correct: "The key", explanation: "Leo says: no pierdas la llave.", skill: "vocabulary" },
    ],
    learnedVocab: ["estoy en", "la puerta está cerrada", "hay una nota", "debajo de", "encontré", "puede ser", "dentro de", "entonces", "esperando", "no pierdas"],
  }),
  story({
    id: "spanish-neutral-a1-secret-birthday-map",
    title: "A1-A2 Story 4: El mapa del cumpleaños",
    subtitle: "A light birthday story about a simple map, a wrong park, and a hidden cake.",
    level: "elementary",
    tags: ["A1-A2", "birthday", "directions"],
    characters: [
      { id: "ana", name: "Ana", initials: "A", side: "right", color: "red" },
      { id: "pablo", name: "Pablo", initials: "P", side: "left", color: "cyan" },
    ],
    messageSeeds: [
      { speakerId: "ana", text: "Pablo, tengo el mapa, pero no entiendo el dibujo.", translation: "Pablo, I have the map, but I don't understand the drawing.", vocab: [["tengo el mapa", "I have the map", "Tener for possession."], ["no entiendo", "I don't understand", "Useful survival phrase."]] },
      { speakerId: "pablo", text: "Es fácil. Primero busca la fuente.", translation: "It is easy. First look for the fountain.", vocab: [["es fácil", "it is easy", "Basic adjective."], ["primero", "first", "Sequence word."]] },
      { speakerId: "ana", text: "Veo dos fuentes. Una está en el parque grande.", translation: "I see two fountains. One is in the big park.", vocab: [["veo dos", "I see two", "Basic count."], ["parque grande", "big park", "Noun + adjective."]] },
      { speakerId: "pablo", text: "No, necesitamos el parque pequeño, cerca del cine.", translation: "No, we need the small park, near the cinema.", vocab: [["necesitamos", "we need", "Nosotros form."], ["cerca del cine", "near the cinema", "Del = de + el."]] },
      { speakerId: "ana", text: "Ah, ya veo el cine. Camino cinco minutos.", translation: "Ah, now I see the cinema. I walk five minutes.", vocab: [["ya veo", "now I see", "Ya can mean now/already."], ["camino cinco minutos", "I walk five minutes", "Simple action."]] },
      { speakerId: "pablo", text: "Después mira detrás del árbol con flores.", translation: "After that, look behind the tree with flowers.", vocab: [["después", "after that", "Sequence word."], ["detrás del árbol", "behind the tree", "Location phrase."]] },
      { speakerId: "ana", text: "Encontré una caja, pero dice: no abrir todavía.", translation: "I found a box, but it says: do not open yet.", vocab: [["encontré una caja", "I found a box", "Completed action."], ["todavía", "yet / still", "Time word."]] },
      { speakerId: "pablo", text: "Muy bien. Espera a Clara.", translation: "Very good. Wait for Clara.", vocab: [["muy bien", "very good", "Common reaction."], ["espera a Clara", "wait for Clara", "Esperar a + person."]] },
      { speakerId: "ana", text: "Clara está llegando con globos amarillos.", translation: "Clara is arriving with yellow balloons.", vocab: [["está llegando", "is arriving", "Present continuous."], ["globos amarillos", "yellow balloons", "Color after noun."]] },
      { speakerId: "clara", text: "Sorpresa, Ana. El mapa era para tu pastel.", translation: "Surprise, Ana. The map was for your cake.", vocab: [["sorpresa", "surprise", "Birthday word."], ["tu pastel", "your cake", "Possessive tu."]] },
      { speakerId: "ana", text: "¿Mi pastel? Pensé que yo ayudaba a otra persona.", translation: "My cake? I thought I was helping another person.", vocab: [["pensé que", "I thought that", "Past belief."], ["otra persona", "another person", "Basic noun phrase."]] },
      { speakerId: "pablo", text: "Esa era la idea. Si lo sabías, no era sorpresa.", translation: "That was the idea. If you knew it, it was not a surprise.", vocab: [["esa era la idea", "that was the idea", "Explains a plan."], ["si lo sabías", "if you knew it", "Condition in past."]] },
      { speakerId: "ana", text: "Estoy feliz, pero también tengo hambre.", translation: "I am happy, but I am also hungry.", vocab: [["estoy feliz", "I am happy", "Feeling with estar."], ["tengo hambre", "I am hungry", "Spanish uses tener."]] },
      { speakerId: "clara", text: "Entonces abre la caja. Hay pastel de chocolate.", translation: "Then open the box. There is chocolate cake.", vocab: [["abre la caja", "open the box", "Command."], ["pastel de chocolate", "chocolate cake", "De describes flavor."]] },
      { speakerId: "ana", text: "Este es el mejor mapa del mundo.", translation: "This is the best map in the world.", vocab: [["el mejor", "the best", "Superlative."], ["del mundo", "in the world", "Common phrase."]] },
    ],
    checkSeeds: [
      { question: "What does Ana have?", options: ["A map", "A train ticket", "A new phone", "A blue key"], correct: "A map", explanation: "Ana says: tengo el mapa.", skill: "detail", afterMessageId: "m1" },
      { question: "Which park does Ana need?", options: ["The small park near the cinema", "The big park", "The park near the school", "No park"], correct: "The small park near the cinema", explanation: "Pablo says they need the small park near the cinema.", skill: "detail" },
      { question: "What does the box say?", options: ["Do not open yet", "Open tomorrow", "Call Pablo", "Go home"], correct: "Do not open yet", explanation: "Ana reads: no abrir todavía.", skill: "vocabulary" },
      { question: "What was the map really for?", options: ["Ana's cake", "A lost dog", "A work meeting", "A bus route"], correct: "Ana's cake", explanation: "Clara says the map was for Ana's cake.", skill: "gist", afterMessageId: "m10" },
      { question: "How does Ana feel near the end?", options: ["Happy and hungry", "Angry and tired", "Lost and sad", "Afraid and cold"], correct: "Happy and hungry", explanation: "Ana says she is happy but also hungry.", skill: "detail" },
    ],
    learnedVocab: ["tengo el mapa", "no entiendo", "primero", "cerca de", "después", "detrás de", "todavía", "sorpresa", "tengo hambre", "el mejor"],
  }),
  story({
    id: "spanish-neutral-a2-phone-in-taxi",
    title: "A1-A2 Story 5: El teléfono en el taxi",
    subtitle: "A clear survival chat about losing a phone, calling the driver, and getting lucky.",
    level: "elementary",
    tags: ["A1-A2", "lost item", "taxi"],
    characters: [
      { id: "marco", name: "Marco", initials: "M", side: "right", color: "green" },
      { id: "elena", name: "Elena", initials: "E", side: "left", color: "violet" },
      { id: "driver", name: "Conductor", initials: "C", side: "left", color: "gold" },
    ],
    messageSeeds: [
      { speakerId: "marco", text: "Elena, tengo un problema. No encuentro mi teléfono.", translation: "Elena, I have a problem. I can't find my phone.", vocab: [["tengo un problema", "I have a problem", "Useful opener."], ["no encuentro", "I can't find", "From encontrar."]] },
      { speakerId: "elena", text: "Pero estás escribiendo desde tu teléfono.", translation: "But you are writing from your phone.", vocab: [["estás escribiendo", "you are writing", "Action now."], ["desde tu teléfono", "from your phone", "Desde for source."]] },
      { speakerId: "marco", text: "No, este es mi teléfono viejo. El nuevo quedó en el taxi.", translation: "No, this is my old phone. The new one stayed in the taxi.", vocab: [["teléfono viejo", "old phone", "Adjective after noun."], ["quedó en el taxi", "stayed in the taxi", "Quedar for left behind."]] },
      { speakerId: "elena", text: "Respira. ¿Tienes el número del conductor?", translation: "Breathe. Do you have the driver's number?", vocab: [["respira", "breathe", "Command."], ["el número del conductor", "the driver's number", "Useful travel phrase."]] },
      { speakerId: "marco", text: "Sí, está en el recibo. Lo llamo ahora.", translation: "Yes, it is on the receipt. I am calling him now.", vocab: [["está en el recibo", "it is on the receipt", "Location with estar."], ["lo llamo", "I call him", "Lo refers to the driver."]] },
      { speakerId: "driver", text: "Hola, señor. Sí, encontré un teléfono negro atrás.", translation: "Hello, sir. Yes, I found a black phone in the back.", vocab: [["encontré", "I found", "Past completed action."], ["atrás", "in the back", "Place word."]] },
      { speakerId: "marco", text: "¡Ese es! Tiene una foto de mi perro en la pantalla.", translation: "That is it! It has a photo of my dog on the screen.", vocab: [["ese es", "that's it", "Identifying object."], ["en la pantalla", "on the screen", "Phone word."]] },
      { speakerId: "driver", text: "Correcto. Estoy cerca de la estación central.", translation: "Correct. I am near the central station.", vocab: [["correcto", "correct", "Confirmation."], ["cerca de la estación", "near the station", "Location phrase."]] },
      { speakerId: "elena", text: "Marco, la estación está a diez minutos de aquí.", translation: "Marco, the station is ten minutes from here.", vocab: [["a diez minutos", "ten minutes away", "Distance/time phrase."], ["de aquí", "from here", "Starting point."]] },
      { speakerId: "marco", text: "Voy para allá. Señor, ¿puede esperarme diez minutos?", translation: "I am going there. Sir, can you wait for me ten minutes?", vocab: [["voy para allá", "I am going there", "Natural direction phrase."], ["¿puede esperarme?", "can you wait for me?", "Polite request."]] },
      { speakerId: "driver", text: "Sí, pero estoy en la entrada norte.", translation: "Yes, but I am at the north entrance.", vocab: [["entrada norte", "north entrance", "Precise place."], ["pero", "but", "Contrast."]] },
      { speakerId: "marco", text: "Perfecto. Llevo una chaqueta gris.", translation: "Perfect. I am wearing a gray jacket.", vocab: [["llevo", "I am wearing", "For clothes."], ["chaqueta gris", "gray jacket", "Color after noun."]] },
      { speakerId: "elena", text: "Mándame tu ubicación cuando llegues.", translation: "Send me your location when you arrive.", vocab: [["mándame", "send me", "Informal command."], ["cuando llegues", "when you arrive", "Future-oriented time phrase."]] },
      { speakerId: "marco", text: "Ya tengo el teléfono. El conductor fue muy amable.", translation: "I have the phone now. The driver was very kind.", vocab: [["ya tengo", "I have now", "Ya marks result."], ["muy amable", "very kind", "Polite adjective."]] },
      { speakerId: "elena", text: "Buen final. Ahora ponle sonido al teléfono nuevo.", translation: "Good ending. Now turn sound on for the new phone.", vocab: [["buen final", "good ending", "Story ending."], ["ponle sonido", "put sound on it", "Practical command."]] },
    ],
    checkSeeds: [
      { question: "Where is Marco's new phone?", options: ["In the taxi", "In his kitchen", "At the airport", "In Elena's bag"], correct: "In the taxi", explanation: "Marco says the new phone stayed in the taxi.", skill: "detail", afterMessageId: "m3" },
      { question: "Where does Marco find the driver's number?", options: ["On the receipt", "On a poster", "In an email", "On Elena's phone"], correct: "On the receipt", explanation: "Marco says the number is on the receipt.", skill: "detail" },
      { question: "How does the driver identify the phone?", options: ["It is black and in the back", "It is red and broken", "It is inside a bag", "It has no screen"], correct: "It is black and in the back", explanation: "The driver found a black phone in the back.", skill: "detail" },
      { question: "Where should Marco meet the driver?", options: ["At the north entrance", "At the south bridge", "Inside a cafe", "At Elena's office"], correct: "At the north entrance", explanation: "The driver says he is at the north entrance.", skill: "detail" },
      { question: "What does Elena advise at the end?", options: ["Turn on sound for the new phone", "Buy a taxi", "Delete the photos", "Take a bus"], correct: "Turn on sound for the new phone", explanation: "Elena says to put sound on the new phone.", skill: "summary" },
    ],
    learnedVocab: ["no encuentro", "quedó en el taxi", "recibo", "lo llamo", "atrás", "ese es", "voy para allá", "¿puede esperarme?", "entrada norte", "ya tengo"],
  }),
  story({
    id: "spanish-neutral-a2-package-without-name",
    title: "A1-A2 Story 6: El paquete sin nombre",
    subtitle: "A beginner-friendly apartment chat about a mysterious package and a sweet mistake.",
    level: "elementary",
    tags: ["A1-A2", "neighbors", "package"],
    characters: [
      { id: "nora", name: "Nora", initials: "N", side: "right", color: "blue" },
      { id: "samu", name: "Samu", initials: "S", side: "left", color: "green" },
      { id: "luz", name: "Luz", initials: "L", side: "left", color: "gold" },
    ],
    messageSeeds: [
      { speakerId: "nora", text: "Samu, hay un paquete en la puerta.", translation: "Samu, there is a package at the door.", vocab: [["hay un paquete", "there is a package", "Hay for existence."], ["en la puerta", "at the door", "Place phrase."]] },
      { speakerId: "samu", text: "¿Tiene nombre?", translation: "Does it have a name?", vocab: [["tiene nombre", "has a name", "Tener for labels."]] },
      { speakerId: "nora", text: "No. Solo dice: para la persona del tercer piso.", translation: "No. It only says: for the person on the third floor.", vocab: [["solo dice", "it only says", "Common reading phrase."], ["tercer piso", "third floor", "Ordinal with piso."]] },
      { speakerId: "samu", text: "Vivimos en el tercer piso. Puede ser nuestro.", translation: "We live on the third floor. It could be ours.", vocab: [["vivimos", "we live", "Nosotros form."], ["puede ser nuestro", "it could be ours", "Possibility + possession."]] },
      { speakerId: "nora", text: "Es muy ligero y huele a vainilla.", translation: "It is very light and smells like vanilla.", vocab: [["muy ligero", "very light", "Weight adjective."], ["huele a vainilla", "smells like vanilla", "Oler a + smell."]] },
      { speakerId: "luz", text: "Hola vecinos. ¿Vieron un paquete pequeño?", translation: "Hi neighbors. Did you see a small package?", vocab: [["vecinos", "neighbors", "Apartment word."], ["paquete pequeño", "small package", "Noun + adjective."]] },
      { speakerId: "nora", text: "Sí. ¿Es tuyo? No tiene nombre.", translation: "Yes. Is it yours? It has no name.", vocab: [["¿es tuyo?", "is it yours?", "Possession question."], ["no tiene nombre", "it has no name", "Negative with tener."]] },
      { speakerId: "luz", text: "Creo que sí. Es para mi abuela, pero olvidé escribir mi nombre.", translation: "I think so. It is for my grandmother, but I forgot to write my name.", vocab: [["mi abuela", "my grandmother", "Family word."], ["olvidé escribir", "I forgot to write", "Olvidar + infinitive."]] },
      { speakerId: "samu", text: "Entonces no lo abrimos.", translation: "Then we do not open it.", vocab: [["entonces", "then / so", "Conclusion word."], ["no lo abrimos", "we do not open it", "Lo = el paquete."]] },
      { speakerId: "luz", text: "Pueden abrirlo conmigo. Son galletas para todos.", translation: "You can open it with me. They are cookies for everyone.", vocab: [["pueden abrirlo", "you can open it", "Poder + infinitive."], ["para todos", "for everyone", "Inclusive phrase."]] },
      { speakerId: "nora", text: "Ahora entiendo el olor a vainilla.", translation: "Now I understand the vanilla smell.", vocab: [["ahora entiendo", "now I understand", "Result phrase."], ["olor a vainilla", "vanilla smell", "Noun + a + smell."]] },
      { speakerId: "samu", text: "Yo estaba listo para una investigación seria.", translation: "I was ready for a serious investigation.", vocab: [["estaba listo", "I was ready", "Imperfect state."], ["investigación seria", "serious investigation", "Playful phrase."]] },
      { speakerId: "luz", text: "La investigación termina con galletas.", translation: "The investigation ends with cookies.", vocab: [["termina con", "ends with", "Verb + con."], ["galletas", "cookies", "Food word."]] },
      { speakerId: "nora", text: "Me parece un final perfecto.", translation: "It seems like a perfect ending to me.", vocab: [["me parece", "it seems to me", "Opinion phrase."], ["final perfecto", "perfect ending", "Story phrase."]] },
      { speakerId: "samu", text: "Acepto el caso y una galleta.", translation: "I accept the case and a cookie.", vocab: [["acepto", "I accept", "Simple present."], ["una galleta", "a cookie", "Food noun."]] },
    ],
    checkSeeds: [
      { question: "Where is the package?", options: ["At the door", "In the kitchen", "In the elevator", "At the school"], correct: "At the door", explanation: "Nora says the package is at the door.", skill: "detail", afterMessageId: "m1" },
      { question: "What does the package say?", options: ["For the person on the third floor", "For Samu only", "Open tomorrow", "Return to store"], correct: "For the person on the third floor", explanation: "The package says it is for the person on the third floor.", skill: "detail" },
      { question: "Why does Luz think it is hers?", options: ["She forgot to write her name", "It has her photo", "It is very heavy", "Samu bought it"], correct: "She forgot to write her name", explanation: "Luz says she forgot to write her name.", skill: "cause" },
      { question: "What is inside the package?", options: ["Cookies", "A phone", "A key", "A book"], correct: "Cookies", explanation: "Luz says they are cookies for everyone.", skill: "detail", afterMessageId: "m10" },
      { question: "What is the tone of the ending?", options: ["Friendly and funny", "Angry", "Scary", "Very sad"], correct: "Friendly and funny", explanation: "The mystery ends with cookies and jokes.", skill: "tone" },
    ],
    learnedVocab: ["hay un paquete", "tiene nombre", "tercer piso", "puede ser nuestro", "huele a", "vecinos", "¿es tuyo?", "olvidé escribir", "pueden abrirlo", "me parece"],
  }),
  story({
    id: "spanish-neutral-b1-last-train",
    title: "B1-B2 Story 1: El último tren",
    subtitle: "A tense but practical story about a delayed train, a stranger's clue, and a small act of trust.",
    level: "upper-intermediate",
    tags: ["B1-B2", "travel", "suspense"],
    characters: [
      { id: "iris", name: "Iris", initials: "I", side: "right", color: "violet" },
      { id: "david", name: "David", initials: "D", side: "left", color: "cyan" },
      { id: "woman", name: "Mujer", initials: "M", side: "left", color: "gold" },
    ],
    messageSeeds: [
      { speakerId: "iris", text: "David, estoy en la estación y acaban de cambiar la vía del último tren.", translation: "David, I am at the station and they just changed the platform for the last train.", vocab: [["acaban de cambiar", "they just changed", "Acabar de + infinitive means just did."], ["la vía", "the platform/track", "Train station word."]] },
      { speakerId: "david", text: "¿Anunciaron la nueva vía o solo lo pusieron en la pantalla?", translation: "Did they announce the new platform or only put it on the screen?", vocab: [["anunciaron", "they announced", "Past action."], ["la pantalla", "the screen", "Public information sign."]] },
      { speakerId: "iris", text: "La pantalla dice vía ocho, pero todos corren hacia la dos.", translation: "The screen says platform eight, but everyone is running toward two.", vocab: [["todos corren", "everyone runs", "Action around her."], ["hacia", "toward", "Direction preposition."]] },
      { speakerId: "david", text: "No sigas a la multitud sin confirmar. Pregunta a alguien con uniforme.", translation: "Do not follow the crowd without confirming. Ask someone in uniform.", vocab: [["la multitud", "the crowd", "Group noun."], ["sin confirmar", "without confirming", "Sin + infinitive."]] },
      { speakerId: "iris", text: "No veo personal, solo una mujer mayor que dice que viaja cada viernes.", translation: "I don't see staff, only an older woman who says she travels every Friday.", vocab: [["personal", "staff", "Institution workers."], ["cada viernes", "every Friday", "Frequency phrase."]] },
      { speakerId: "woman", text: "Si vas al norte, no corras. Ese tren siempre sale por la vía ocho.", translation: "If you are going north, do not run. That train always leaves from platform eight.", vocab: [["si vas al norte", "if you are going north", "Condition."], ["siempre sale", "always leaves", "Habitual action."]] },
      { speakerId: "iris", text: "Ella parece tranquila. Los demás parecen perdidos.", translation: "She seems calm. The others seem lost.", vocab: [["parece tranquila", "she seems calm", "Parecer + adjective."], ["perdidos", "lost", "State adjective."]] },
      { speakerId: "david", text: "Quédate donde estás, pero revisa el número del tren.", translation: "Stay where you are, but check the train number.", vocab: [["quédate", "stay", "Reflexive command."], ["revisa", "check", "Informal command."]] },
      { speakerId: "iris", text: "Número 417. En mi boleto también dice 417.", translation: "Number 417. My ticket also says 417.", vocab: [["mi boleto", "my ticket", "Travel word."], ["también dice", "also says", "Detail confirmation."]] },
      { speakerId: "iris", text: "El tren acaba de entrar en la vía ocho. La mujer tenía razón.", translation: "The train just entered platform eight. The woman was right.", vocab: [["acaba de entrar", "just entered", "Acabar de + infinitive."], ["tenía razón", "was right", "Common phrase."]] },
      { speakerId: "david", text: "Entonces aprendimos dos cosas: mirar el número y no entrar en pánico.", translation: "So we learned two things: look at the number and do not panic.", vocab: [["aprendimos", "we learned", "Past nosotros."], ["entrar en pánico", "panic", "Emotional phrase."]] },
      { speakerId: "iris", text: "La mujer me acaba de guardar un asiento junto a la ventana.", translation: "The woman just saved me a seat by the window.", vocab: [["guardar un asiento", "save a seat", "Travel favor."], ["junto a la ventana", "by the window", "Location phrase."]] },
      { speakerId: "david", text: "Dale las gracias. Y quizá compra dos cafés si el vagón tiene cafetería.", translation: "Thank her. And maybe buy two coffees if the carriage has a cafe.", vocab: [["dale las gracias", "thank her", "Indirect object le."], ["quizá", "maybe", "Possibility word."]] },
      { speakerId: "iris", text: "Ya se las di. Dice que una vez perdió un tren por seguir a todos.", translation: "I already thanked her. She says once she missed a train by following everyone.", vocab: [["ya se las di", "I already gave them to her", "Las gracias = them."], ["por seguir a todos", "by following everyone", "Cause with por + infinitive."]] },
      { speakerId: "iris", text: "Voy sentada, con café, y con una nueva regla: confirmar antes de correr.", translation: "I am seated, with coffee, and with a new rule: confirm before running.", vocab: [["voy sentada", "I am riding seated", "Ir + adjective/state."], ["antes de correr", "before running", "Antes de + infinitive."]] },
    ],
    checkSeeds: [
      { question: "What changed at the station?", options: ["The train platform", "The ticket price", "The destination city", "The date"], correct: "The train platform", explanation: "Iris says they changed the platform for the last train.", skill: "gist", afterMessageId: "m1" },
      { question: "Why does David tell Iris not to follow the crowd?", options: ["The crowd may be wrong", "The crowd is dangerous", "The train is canceled", "He dislikes stations"], correct: "The crowd may be wrong", explanation: "The screen and the crowd point to different platforms, so he says to confirm.", skill: "inference" },
      { question: "What clue makes Iris trust the older woman?", options: ["She travels every Friday and seems calm", "She has Iris's ticket", "She works with David", "She is running fast"], correct: "She travels every Friday and seems calm", explanation: "The woman says she travels every Friday and Iris notes she seems calm.", skill: "detail", afterMessageId: "m7" },
      { question: "What number confirms the train?", options: ["417", "218", "802", "909"], correct: "417", explanation: "Iris checks that both the train and ticket say 417.", skill: "detail" },
      { question: "What happened to the woman in the past?", options: ["She missed a train by following everyone", "She lost her coffee", "She bought the wrong ticket", "She forgot her suitcase"], correct: "She missed a train by following everyone", explanation: "She says she once missed a train by following everyone.", skill: "detail" },
      { question: "What rule does Iris learn?", options: ["Confirm before running", "Never take trains", "Always follow the crowd", "Buy coffee first"], correct: "Confirm before running", explanation: "Iris ends with the rule: confirmar antes de correr.", skill: "summary" },
    ],
    learnedVocab: ["acaban de cambiar", "la vía", "hacia", "la multitud", "sin confirmar", "si vas al norte", "quédate", "tenía razón", "guardar un asiento", "antes de correr"],
  }),
  story({
    id: "spanish-neutral-b2-museum-alarm",
    title: "B1-B2 Story 2: La alarma del museo",
    subtitle: "A museum night shift story where a false alarm reveals a real secret.",
    level: "upper-intermediate",
    tags: ["B1-B2", "mystery", "museum"],
    characters: [
      { id: "vera", name: "Vera", initials: "V", side: "right", color: "red" },
      { id: "tomas", name: "Tomás", initials: "T", side: "left", color: "blue" },
      { id: "guard", name: "Guardia", initials: "G", side: "left", color: "green" },
    ],
    messageSeeds: [
      { speakerId: "vera", text: "Tomás, la alarma de la sala tres se activó otra vez.", translation: "Tomás, the alarm in room three went off again.", vocab: [["se activó", "went off / activated", "Pronominal event."], ["otra vez", "again", "Repetition."]] },
      { speakerId: "tomas", text: "¿La misma vitrina de las monedas antiguas?", translation: "The same case with the ancient coins?", vocab: [["la misma vitrina", "the same display case", "Museum noun."], ["monedas antiguas", "ancient coins", "Noun + adjective."]] },
      { speakerId: "vera", text: "Sí. Pero la vitrina está cerrada y no falta nada.", translation: "Yes. But the case is closed and nothing is missing.", vocab: [["no falta nada", "nothing is missing", "Important detail."], ["cerrada", "closed", "State."]] },
      { speakerId: "tomas", text: "Entonces no suena a robo. ¿Hay cambios de temperatura?", translation: "Then it doesn't sound like a robbery. Are there temperature changes?", vocab: [["no suena a", "doesn't sound like", "Inference phrase."], ["cambios de temperatura", "temperature changes", "Technical clue."]] },
      { speakerId: "guard", text: "El sensor marca frío cerca de la pared, no cerca de la vitrina.", translation: "The sensor marks cold near the wall, not near the case.", vocab: [["el sensor marca", "the sensor indicates", "Device language."], ["cerca de la pared", "near the wall", "Location phrase."]] },
      { speakerId: "vera", text: "Acabo de ver una línea detrás del cuadro grande.", translation: "I just saw a line behind the big painting.", vocab: [["acabo de ver", "I just saw", "Acabar de + infinitive."], ["detrás del cuadro", "behind the painting", "Location clue."]] },
      { speakerId: "tomas", text: "No lo muevas todavía. Toma una foto y llama a restauración.", translation: "Do not move it yet. Take a photo and call restoration.", vocab: [["no lo muevas", "do not move it", "Negative command."], ["todavía", "yet", "Caution word."]] },
      { speakerId: "vera", text: "La foto muestra una puerta pequeña pintada del mismo color.", translation: "The photo shows a small door painted the same color.", vocab: [["muestra", "shows", "Photo/document verb."], ["del mismo color", "the same color", "Comparison phrase."]] },
      { speakerId: "guard", text: "Eso no aparece en el plano del museo.", translation: "That does not appear on the museum plan.", vocab: [["no aparece", "does not appear", "Absence in document."], ["el plano", "the floor plan", "Building word."]] },
      { speakerId: "vera", text: "Abrimos la puerta con cuidado. Hay una caja metálica adentro.", translation: "We opened the door carefully. There is a metal box inside.", vocab: [["con cuidado", "carefully", "Safety phrase."], ["caja metálica", "metal box", "Object description."]] },
      { speakerId: "tomas", text: "Eso explica el frío: quizá hay un conducto de aire antiguo.", translation: "That explains the cold: maybe there is an old air duct.", vocab: [["eso explica", "that explains", "Cause phrase."], ["conducto de aire", "air duct", "Technical object."]] },
      { speakerId: "vera", text: "La caja tiene cartas de 1924 y una etiqueta con el nombre del primer director.", translation: "The box has letters from 1924 and a label with the name of the first director.", vocab: [["cartas de 1924", "letters from 1924", "Historical clue."], ["primer director", "first director", "Ordinal."]] },
      { speakerId: "guard", text: "La alarma falsa acaba de encontrar un archivo perdido.", translation: "The false alarm just found a lost archive.", vocab: [["alarma falsa", "false alarm", "Core twist."], ["archivo perdido", "lost archive", "Discovery."]] },
      { speakerId: "tomas", text: "No lo abran más. Mañana lo registramos oficialmente.", translation: "Do not open it more. Tomorrow we register it officially.", vocab: [["lo registramos", "we register it", "Formal process."], ["oficialmente", "officially", "Adverb."]] },
      { speakerId: "vera", text: "Perfecto. Hoy el museo no perdió monedas; ganó una historia.", translation: "Perfect. Today the museum did not lose coins; it gained a story.", vocab: [["no perdió", "did not lose", "Past negative."], ["ganó una historia", "gained a story", "Metaphorical ending."]] },
    ],
    checkSeeds: [
      { question: "Which room has the alarm problem?", options: ["Room three", "Room one", "The cafe", "The office"], correct: "Room three", explanation: "Vera says the alarm in room three activated again.", skill: "detail", afterMessageId: "m1" },
      { question: "Why does Tomás doubt it is a robbery?", options: ["Nothing is missing", "The museum is closed forever", "The guard confessed", "The coins are fake"], correct: "Nothing is missing", explanation: "Vera says the case is closed and nothing is missing.", skill: "inference" },
      { question: "Where is the cold reading?", options: ["Near the wall", "Near the entrance", "Inside Vera's bag", "Under the coins"], correct: "Near the wall", explanation: "The guard says the sensor marks cold near the wall.", skill: "detail" },
      { question: "What is hidden behind the painting?", options: ["A small painted door", "A broken window", "A second painting", "A phone"], correct: "A small painted door", explanation: "The photo shows a small door painted the same color.", skill: "detail", afterMessageId: "m8" },
      { question: "What is inside the metal box?", options: ["Letters from 1924", "Missing coins", "A modern laptop", "Food"], correct: "Letters from 1924", explanation: "Vera says the box has letters from 1924.", skill: "detail" },
      { question: "What is the story's twist?", options: ["A false alarm reveals a lost archive", "The coins disappear", "The museum burns down", "Tomás quits"], correct: "A false alarm reveals a lost archive", explanation: "The guard summarizes that the false alarm found a lost archive.", skill: "summary" },
    ],
    learnedVocab: ["se activó", "no falta nada", "no suena a", "sensor", "acabo de ver", "no lo muevas", "el plano", "con cuidado", "alarma falsa", "oficialmente"],
  }),
  story({
    id: "spanish-neutral-b2-neighbor-drone",
    title: "B1-B2 Story 3: El dron del vecino",
    subtitle: "A neighbor dispute turns into a useful rescue when a drone sees smoke on a rooftop.",
    level: "upper-intermediate",
    tags: ["B1-B2", "neighbors", "problem solving"],
    characters: [
      { id: "julia", name: "Julia", initials: "J", side: "right", color: "gold" },
      { id: "ivan", name: "Iván", initials: "I", side: "left", color: "cyan" },
      { id: "rene", name: "René", initials: "R", side: "left", color: "green" },
    ],
    messageSeeds: [
      { speakerId: "julia", text: "Iván, el vecino volvió a volar el dron sobre mi terraza.", translation: "Iván, the neighbor flew the drone over my terrace again.", vocab: [["volvió a volar", "flew again", "Volver a + infinitive."], ["sobre mi terraza", "over my terrace", "Place relation."]] },
      { speakerId: "ivan", text: "¿Otra vez? Eso ya no es curioso; es invasivo.", translation: "Again? That is not curious anymore; it is invasive.", vocab: [["otra vez", "again", "Repetition."], ["invasivo", "invasive", "Tone word."]] },
      { speakerId: "julia", text: "Le escribí con calma, pero dice que solo estaba probando la cámara.", translation: "I wrote to him calmly, but he says he was only testing the camera.", vocab: [["con calma", "calmly", "Manner phrase."], ["probando la cámara", "testing the camera", "Gerund."]] },
      { speakerId: "ivan", text: "Pídele que no grabe hacia tu casa y deja todo por escrito.", translation: "Ask him not to record toward your house and leave everything in writing.", vocab: [["pídele que no grabe", "ask him not to record", "Subjunctive after pedir."], ["por escrito", "in writing", "Practical protection."]] },
      { speakerId: "rene", text: "Julia, perdón. Acabo de ver humo en el techo del edificio de al lado.", translation: "Julia, sorry. I just saw smoke on the roof of the building next door.", vocab: [["perdón", "sorry", "Apology."], ["humo en el techo", "smoke on the roof", "Emergency clue."]] },
      { speakerId: "julia", text: "¿Humo? ¿Estás seguro o es una sombra?", translation: "Smoke? Are you sure or is it a shadow?", vocab: [["¿estás seguro?", "are you sure?", "Checking certainty."], ["una sombra", "a shadow", "Possible mistake."]] },
      { speakerId: "rene", text: "Estoy seguro. Puedo mandar la imagen, pero no quiero invadir más.", translation: "I am sure. I can send the image, but I do not want to invade more.", vocab: [["puedo mandar", "I can send", "Poder + infinitive."], ["invadir más", "invade more", "Respecting boundary."]] },
      { speakerId: "ivan", text: "Para una emergencia, manda la imagen y llamen a seguridad.", translation: "For an emergency, send the image and call security.", vocab: [["para una emergencia", "for an emergency", "Context phrase."], ["llamen a seguridad", "call security", "Plural command."]] },
      { speakerId: "julia", text: "Ya vi la imagen. Sí hay humo, cerca de las antenas.", translation: "I saw the image. Yes, there is smoke, near the antennas.", vocab: [["ya vi", "I saw already", "Completed confirmation."], ["cerca de las antenas", "near the antennas", "Location detail."]] },
      { speakerId: "julia", text: "Seguridad subió y encontró una caja eléctrica quemándose.", translation: "Security went up and found an electrical box burning.", vocab: [["subió", "went up", "Movement upward."], ["quemándose", "burning", "Pronominal gerund."]] },
      { speakerId: "rene", text: "No quería molestarte. Solo pensé que era peligroso.", translation: "I did not want to bother you. I just thought it was dangerous.", vocab: [["no quería molestarte", "I did not want to bother you", "Soft intention."], ["peligroso", "dangerous", "Risk adjective."]] },
      { speakerId: "julia", text: "Aprecio que avisaras, pero necesitamos una regla clara.", translation: "I appreciate that you warned us, but we need a clear rule.", vocab: [["aprecio que avisaras", "I appreciate that you warned", "Subjunctive after appreciation."], ["regla clara", "clear rule", "Boundary phrase."]] },
      { speakerId: "ivan", text: "Regla: no grabar casas. Excepción: emergencia real y aviso inmediato.", translation: "Rule: do not record homes. Exception: real emergency and immediate warning.", vocab: [["excepción", "exception", "Formal condition."], ["aviso inmediato", "immediate warning", "Practical rule."]] },
      { speakerId: "rene", text: "Acepto. Y mañana llevo una copia del permiso del dron.", translation: "I accept. And tomorrow I will bring a copy of the drone permit.", vocab: [["acepto", "I accept", "Agreement."], ["permiso del dron", "drone permit", "Official document."]] },
      { speakerId: "julia", text: "Gracias. Hoy el dron fue útil, pero la confianza también necesita mantenimiento.", translation: "Thanks. Today the drone was useful, but trust also needs maintenance.", vocab: [["fue útil", "was useful", "Past evaluation."], ["la confianza", "trust", "Theme word."]] },
    ],
    checkSeeds: [
      { question: "Why is Julia upset at first?", options: ["The neighbor flew a drone over her terrace", "The neighbor broke her door", "Iván lost a key", "There is no internet"], correct: "The neighbor flew a drone over her terrace", explanation: "Julia says the neighbor flew the drone over her terrace again.", skill: "gist", afterMessageId: "m1" },
      { question: "What does Iván suggest for protection?", options: ["Leave everything in writing", "Delete all messages", "Ignore the neighbor", "Buy another drone"], correct: "Leave everything in writing", explanation: "Iván tells her to leave everything in writing.", skill: "detail" },
      { question: "What does René see with the drone?", options: ["Smoke on the roof", "A party", "A lost phone", "A broken car"], correct: "Smoke on the roof", explanation: "René says he sees smoke on the roof of the building next door.", skill: "detail", afterMessageId: "m5" },
      { question: "What causes the smoke?", options: ["An electrical box burning", "A barbecue", "A candle", "A train"], correct: "An electrical box burning", explanation: "Security finds an electrical box burning.", skill: "detail" },
      { question: "What rule do they agree on?", options: ["No recording homes except for real emergencies", "Record everything every day", "Never call security", "Only fly at night"], correct: "No recording homes except for real emergencies", explanation: "Iván states the rule and the emergency exception.", skill: "summary" },
      { question: "What is the main balance in the story?", options: ["Privacy and safety", "Money and shopping", "Travel and food", "School and exams"], correct: "Privacy and safety", explanation: "The drone invades privacy but also helps detect an emergency.", skill: "theme" },
    ],
    learnedVocab: ["volvió a", "invasivo", "por escrito", "humo en el techo", "¿estás seguro?", "llamen a seguridad", "quemándose", "aprecio que", "excepción", "la confianza"],
  }),
  story({
    id: "spanish-neutral-c1-voice-from-future",
    title: "C1-C2 Story 1: La voz del futuro",
    subtitle: "An advanced speculative chat about a scheduled voice note that sounds impossible.",
    level: "advanced",
    tags: ["C1-C2", "speculative", "emotional nuance"],
    characters: [
      { id: "alba", name: "Alba", initials: "A", side: "right", color: "violet" },
      { id: "mateo", name: "Mateo", initials: "M", side: "left", color: "cyan" },
    ],
    messageSeeds: [
      { speakerId: "alba", text: "Mateo, recibí una nota de voz programada por mi padre antes de morir.", translation: "Mateo, I received a voice note scheduled by my father before he died.", vocab: [["nota de voz programada", "scheduled voice note", "Core premise."], ["antes de morir", "before dying", "Temporal phrase."]] },
      { speakerId: "mateo", text: "¿La escuchaste completa o te detuviste a la mitad?", translation: "Did you listen to it completely or stop halfway?", vocab: [["completa", "completely", "Entire message."], ["a la mitad", "halfway", "Point in process."]] },
      { speakerId: "alba", text: "La escuché dos veces. Dice cosas que no podía saber hace seis meses.", translation: "I listened twice. It says things he could not know six months ago.", vocab: [["no podía saber", "could not know", "Imperfect ability."], ["hace seis meses", "six months ago", "Time reference."]] },
      { speakerId: "mateo", text: "Puede que haya dejado varias versiones, según lo que ocurriera.", translation: "He may have left several versions, depending on what happened.", vocab: [["puede que haya dejado", "he may have left", "Subjunctive perfect after puede que."], ["según lo que ocurriera", "depending on what happened", "Hypothetical condition."]] },
      { speakerId: "alba", text: "Menciona mi renuncia, y renuncié ayer. Nadie de la familia lo sabía.", translation: "He mentions my resignation, and I resigned yesterday. No one in the family knew.", vocab: [["mi renuncia", "my resignation", "Formal noun."], ["nadie lo sabía", "no one knew it", "Negative pronoun."]] },
      { speakerId: "mateo", text: "Eso cambia la explicación. ¿Alguien más tenía acceso a su cuenta?", translation: "That changes the explanation. Did anyone else have access to his account?", vocab: [["cambia la explicación", "changes the explanation", "Reasoning phrase."], ["tenía acceso", "had access", "Account/security phrase."]] },
      { speakerId: "alba", text: "Mi hermano administraba el correo, pero jura que no tocó nada.", translation: "My brother managed the email, but he swears he did not touch anything.", vocab: [["administraba el correo", "managed the email", "Background role."], ["jura que", "he swears that", "Claim phrase."]] },
      { speakerId: "mateo", text: "Antes de pensar en algo sobrenatural, revisa la fecha exacta del archivo.", translation: "Before thinking of something supernatural, check the exact date of the file.", vocab: [["algo sobrenatural", "something supernatural", "Speculative word."], ["fecha exacta", "exact date", "Evidence phrase."]] },
      { speakerId: "alba", text: "La fecha original es de marzo, pero el envío automático fue hoy a las 8:00.", translation: "The original date is from March, but the automatic sending was today at 8:00.", vocab: [["envío automático", "automatic sending", "Technical phrase."], ["fue hoy", "was today", "Past event."]] },
      { speakerId: "alba", text: "Hay otra cosa: al final dice 'no confundas intuición con magia'.", translation: "There is something else: at the end he says 'do not confuse intuition with magic.'", vocab: [["hay otra cosa", "there is something else", "Adding key detail."], ["intuición", "intuition", "Abstract noun."]] },
      { speakerId: "mateo", text: "Suena a que te conocía demasiado bien, no necesariamente a que predijo el futuro.", translation: "It sounds like he knew you too well, not necessarily that he predicted the future.", vocab: [["te conocía demasiado bien", "he knew you too well", "Emotional inference."], ["no necesariamente", "not necessarily", "Careful qualification."]] },
      { speakerId: "alba", text: "También dice que si dejaba ese trabajo, no debía sentir culpa por elegir paz.", translation: "He also says that if I left that job, I should not feel guilty for choosing peace.", vocab: [["no debía sentir culpa", "should not feel guilt", "Emotional advice."], ["elegir paz", "choose peace", "Abstract object."]] },
      { speakerId: "mateo", text: "Quizá no sabía la fecha; sabía el patrón que te estaba haciendo daño.", translation: "Maybe he did not know the date; he knew the pattern that was hurting you.", vocab: [["sabía el patrón", "knew the pattern", "Deep explanation."], ["te estaba haciendo daño", "was hurting you", "Ongoing harm."]] },
      { speakerId: "alba", text: "Eso me rompe un poco. No adivinó mi futuro; me vio cuando yo no quería verme.", translation: "That breaks me a little. He did not guess my future; he saw me when I did not want to see myself.", vocab: [["me rompe un poco", "breaks me a little", "Emotional metaphor."], ["no quería verme", "did not want to see myself", "Reflexive emotional phrase."]] },
      { speakerId: "mateo", text: "Entonces guarda la nota. No como prueba de magia, sino como una forma tardía de cuidado.", translation: "Then keep the note. Not as proof of magic, but as a late form of care.", vocab: [["prueba de magia", "proof of magic", "Reframed idea."], ["forma tardía de cuidado", "late form of care", "Advanced emotional phrase."]] },
    ],
    checkSeeds: [
      { question: "Who scheduled the voice note?", options: ["Alba's father", "Mateo", "Alba's boss", "Her brother"], correct: "Alba's father", explanation: "Alba says the note was scheduled by her father before he died.", skill: "detail", afterMessageId: "m1" },
      { question: "Why does the note seem impossible?", options: ["It mentions Alba's resignation from yesterday", "It is in another language", "It has no sound", "It came from a museum"], correct: "It mentions Alba's resignation from yesterday", explanation: "Alba says the note mentions her resignation, which happened yesterday.", skill: "gist", afterMessageId: "m5" },
      { question: "What practical thing does Mateo suggest checking?", options: ["The exact file date", "The price of the phone", "The weather", "A train number"], correct: "The exact file date", explanation: "Mateo tells Alba to check the exact date of the file.", skill: "detail" },
      { question: "What phrase changes the interpretation of the message?", options: ["Do not confuse intuition with magic", "Open the door", "Buy two coffees", "Call security"], correct: "Do not confuse intuition with magic", explanation: "Alba says the note ends with that sentence.", skill: "detail", afterMessageId: "m10" },
      { question: "What does Mateo think Alba's father understood?", options: ["A harmful pattern in Alba's life", "The lottery numbers", "A museum secret", "A train schedule"], correct: "A harmful pattern in Alba's life", explanation: "Mateo says he knew the pattern that was hurting her.", skill: "inference" },
      { question: "How does Mateo reframe the note at the end?", options: ["As a late form of care", "As a legal document", "As a joke", "As proof of a crime"], correct: "As a late form of care", explanation: "Mateo says to keep it as a late form of care, not proof of magic.", skill: "summary" },
    ],
    learnedVocab: ["nota de voz programada", "a la mitad", "no podía saber", "puede que haya dejado", "mi renuncia", "tenía acceso", "algo sobrenatural", "intuición", "no necesariamente", "forma tardía de cuidado"],
  }),
  story({
    id: "spanish-neutral-c1-invisible-contract",
    title: "C1-C2 Story 2: El contrato invisible",
    subtitle: "A professional story about unclear expectations, friendship, and naming the agreement nobody wrote.",
    level: "advanced",
    tags: ["C1-C2", "professional boundaries", "friendship"],
    characters: [
      { id: "ines", name: "Inés", initials: "I", side: "right", color: "red" },
      { id: "raquel", name: "Raquel", initials: "R", side: "left", color: "gold" },
      { id: "luis", name: "Luis", initials: "L", side: "left", color: "blue" },
    ],
    messageSeeds: [
      { speakerId: "ines", text: "Raquel, Luis me pidió revisar su proyecto 'como favor' y ya van doce horas de trabajo.", translation: "Raquel, Luis asked me to review his project 'as a favor' and it is already twelve hours of work.", vocab: [["como favor", "as a favor", "Boundary setup."], ["ya van doce horas", "it is already twelve hours", "Accumulated time."]] },
      { speakerId: "raquel", text: "Eso dejó de ser favor cuando empezó a tener entregables.", translation: "That stopped being a favor when it started having deliverables.", vocab: [["dejó de ser", "stopped being", "Change of category."], ["entregables", "deliverables", "Professional noun."]] },
      { speakerId: "ines", text: "Me cuesta decirlo porque somos amigos desde la universidad.", translation: "It is hard for me to say it because we have been friends since university.", vocab: [["me cuesta decirlo", "it is hard for me to say it", "Emotional difficulty."], ["desde la universidad", "since university", "Starting point."]] },
      { speakerId: "raquel", text: "Precisamente por eso conviene decirlo con cuidado, no con resentimiento acumulado.", translation: "Exactly because of that, it is best to say it carefully, not with accumulated resentment.", vocab: [["conviene decirlo", "it is advisable to say it", "Soft recommendation."], ["resentimiento acumulado", "accumulated resentment", "Emotional risk."]] },
      { speakerId: "luis", text: "Inés, ¿pudiste mirar los cambios nuevos? Son solo unas páginas más.", translation: "Inés, were you able to look at the new changes? It is just a few more pages.", vocab: [["pudiste mirar", "were you able to look", "Past ability."], ["solo unas páginas más", "just a few more pages", "Minimizing phrase."]] },
      { speakerId: "ines", text: "Ahí está el problema: 'solo unas páginas más' ya cambió tres veces.", translation: "There is the problem: 'just a few more pages' has already changed three times.", vocab: [["ahí está el problema", "there is the problem", "Naming issue."], ["cambió tres veces", "changed three times", "Pattern."]] },
      { speakerId: "raquel", text: "Puedes agradecer la confianza y separar amistad de alcance.", translation: "You can appreciate the trust and separate friendship from scope.", vocab: [["agradecer la confianza", "appreciate the trust", "Professional warmth."], ["separar amistad de alcance", "separate friendship from scope", "Boundary frame."]] },
      { speakerId: "ines", text: "Voy a escribir: quiero ayudarte, pero necesito definir hasta dónde llega mi ayuda.", translation: "I am going to write: I want to help you, but I need to define how far my help goes.", vocab: [["hasta dónde llega", "how far it goes", "Limit phrase."], ["definir", "define", "Clarity verb."]] },
      { speakerId: "raquel", text: "Bien. Eso no acusa; ordena.", translation: "Good. That does not accuse; it organizes.", vocab: [["no acusa", "does not accuse", "Tone control."], ["ordena", "organizes", "Clarifies structure."]] },
      { speakerId: "ines", text: "Luis respondió que pensó que yo disfrutaba revisar textos.", translation: "Luis answered that he thought I enjoyed reviewing texts.", vocab: [["pensó que", "he thought that", "Reported thought."], ["disfrutaba revisar", "enjoyed reviewing", "Imperfect habit/state."]] },
      { speakerId: "raquel", text: "Puede ser cierto y aun así no convertirte en recurso ilimitado.", translation: "That may be true and still not turn you into an unlimited resource.", vocab: [["puede ser cierto", "it may be true", "Concession."], ["recurso ilimitado", "unlimited resource", "Boundary metaphor."]] },
      { speakerId: "ines", text: "Le dije que puedo hacer una última revisión breve o cotizar el resto.", translation: "I told him I can do one final brief review or quote the rest.", vocab: [["última revisión breve", "final brief review", "Concrete option."], ["cotizar el resto", "quote the rest", "Professional next step."]] },
      { speakerId: "luis", text: "Tienes razón. No medí el tiempo que te estaba pidiendo.", translation: "You are right. I did not measure the time I was asking from you.", vocab: [["no medí el tiempo", "I did not measure the time", "Acknowledgment."], ["te estaba pidiendo", "I was asking from you", "Ongoing request."]] },
      { speakerId: "ines", text: "Me alivió que lo entendiera. El límite no rompió la amistad.", translation: "It relieved me that he understood it. The boundary did not break the friendship.", vocab: [["me alivió", "it relieved me", "Emotional result."], ["no rompió la amistad", "did not break the friendship", "Key outcome."]] },
      { speakerId: "raquel", text: "Solo hizo visible el contrato que ya existía, aunque nadie lo hubiera escrito.", translation: "It only made visible the contract that already existed, even though nobody had written it.", vocab: [["hizo visible", "made visible", "Revealed."], ["aunque nadie lo hubiera escrito", "even though nobody had written it", "Advanced concession."]] },
    ],
    checkSeeds: [
      { question: "What problem does Inés have?", options: ["A favor has become many hours of work", "She lost a train", "She cannot open a package", "She broke a museum case"], correct: "A favor has become many hours of work", explanation: "Inés says Luis's favor has already become twelve hours of work.", skill: "gist", afterMessageId: "m1" },
      { question: "Why is the situation emotionally difficult?", options: ["Luis is her longtime friend", "Luis is a stranger", "Raquel is angry", "The project is secret"], correct: "Luis is her longtime friend", explanation: "Inés says they have been friends since university.", skill: "cause" },
      { question: "What phrase has changed three times?", options: ["Just a few more pages", "I lost my phone", "The platform is eight", "Do not open yet"], correct: "Just a few more pages", explanation: "Inés points to 'solo unas páginas más' as the problem.", skill: "detail", afterMessageId: "m6" },
      { question: "What boundary does Inés propose?", options: ["Define how far her help goes", "End the friendship", "Do all work free", "Avoid answering"], correct: "Define how far her help goes", explanation: "She plans to say she needs to define the limit of her help.", skill: "detail" },
      { question: "What options does Inés offer Luis?", options: ["One final brief review or a quote for the rest", "No help ever", "A museum tour", "A phone call only"], correct: "One final brief review or a quote for the rest", explanation: "Inés offers a last brief review or quoting the rest.", skill: "detail" },
      { question: "What does the 'invisible contract' mean?", options: ["Unspoken expectations about work and help", "A hidden legal crime", "A message from the future", "A museum document"], correct: "Unspoken expectations about work and help", explanation: "Raquel says the boundary made visible the contract that already existed but nobody wrote.", skill: "inference" },
    ],
    learnedVocab: ["como favor", "entregables", "me cuesta decirlo", "resentimiento acumulado", "ahí está el problema", "alcance", "hasta dónde llega", "recurso ilimitado", "cotizar el resto", "aunque nadie lo hubiera escrito"],
  }),
  story({
    id: "spanish-neutral-c2-last-message-before-silence",
    title: "C1-C2 Story 3: El último mensaje antes del silencio",
    subtitle: "A nuanced emotional story about an unsent message, dignity, and choosing not to reopen a wound.",
    level: "advanced",
    tags: ["C1-C2", "closure", "emotional nuance"],
    characters: [
      { id: "noa", name: "Noa", initials: "N", side: "right", color: "violet" },
      { id: "sara", name: "Sara", initials: "S", side: "left", color: "cyan" },
      { id: "elia", name: "Elia", initials: "E", side: "left", color: "gold" },
    ],
    messageSeeds: [
      { speakerId: "noa", text: "Sara, Elia acaba de escribirme después de un año de silencio.", translation: "Sara, Elia just wrote to me after a year of silence.", vocab: [["después de un año de silencio", "after a year of silence", "Emotional time frame."], ["acaba de escribirme", "just wrote to me", "Acabar de + infinitive."]] },
      { speakerId: "sara", text: "Respira antes de responder. Un mensaje tardío puede mover mucho.", translation: "Breathe before answering. A late message can move a lot inside.", vocab: [["antes de responder", "before answering", "Antes de + infinitive."], ["mensaje tardío", "late message", "Timing nuance."]] },
      { speakerId: "elia", text: "Noa, sé que desaparecí mal. No espero que me perdones de inmediato.", translation: "Noa, I know I disappeared badly. I don't expect you to forgive me immediately.", vocab: [["desaparecí mal", "I disappeared badly", "Admission."], ["de inmediato", "immediately", "Time phrase."]] },
      { speakerId: "noa", text: "Lo peor es que suena sincera, y eso me desordena más.", translation: "The worst part is that she sounds sincere, and that unsettles me more.", vocab: [["suena sincera", "sounds sincere", "Perception."], ["me desordena", "unsettles me", "Emotional metaphor."]] },
      { speakerId: "sara", text: "La sinceridad no borra el daño; solo cambia la forma de mirarlo.", translation: "Sincerity does not erase the harm; it only changes the way of looking at it.", vocab: [["no borra el daño", "does not erase the harm", "Boundary idea."], ["cambia la forma", "changes the way", "Reframing."]] },
      { speakerId: "noa", text: "Quiero preguntarle por qué no tuvo el valor de despedirse.", translation: "I want to ask her why she did not have the courage to say goodbye.", vocab: [["no tuvo el valor", "did not have the courage", "Emotional judgment."], ["despedirse", "say goodbye", "Reflexive infinitive."]] },
      { speakerId: "sara", text: "Puedes preguntarlo, pero pregúntate primero qué harías con la respuesta.", translation: "You can ask that, but first ask yourself what you would do with the answer.", vocab: [["pregúntate primero", "ask yourself first", "Reflective command."], ["qué harías", "what you would do", "Conditional."]] },
      { speakerId: "noa", text: "Tal vez busco una explicación que no arreglaría nada.", translation: "Maybe I am looking for an explanation that would not fix anything.", vocab: [["tal vez busco", "maybe I am looking for", "Self-awareness."], ["no arreglaría nada", "would not fix anything", "Conditional negative."]] },
      { speakerId: "elia", text: "No escribo para volver. Escribo porque debía reconocer que fui injusta.", translation: "I am not writing to come back. I am writing because I needed to acknowledge that I was unfair.", vocab: [["no escribo para volver", "I am not writing to come back", "Clarifies intent."], ["reconocer", "acknowledge", "Repair language."]] },
      { speakerId: "noa", text: "Eso me calma y me duele al mismo tiempo.", translation: "That calms me and hurts me at the same time.", vocab: [["me calma", "calms me", "Emotional effect."], ["al mismo tiempo", "at the same time", "Contrast phrase."]] },
      { speakerId: "sara", text: "Entonces quizá tu respuesta puede ser breve: recibí tu mensaje y necesito cuidarme.", translation: "Then maybe your answer can be brief: I received your message and I need to take care of myself.", vocab: [["puede ser breve", "can be brief", "Boundary style."], ["necesito cuidarme", "I need to take care of myself", "Self-protection."]] },
      { speakerId: "noa", text: "Me da miedo que suene cruel no abrir una conversación larga.", translation: "I am afraid it will sound cruel not to open a long conversation.", vocab: [["me da miedo", "I am afraid", "Emotion phrase."], ["conversación larga", "long conversation", "Boundary risk."]] },
      { speakerId: "sara", text: "Cruel habría sido usar su culpa para castigarla. Claro no es cruel.", translation: "Cruel would be using her guilt to punish her. Clear is not cruel.", vocab: [["habría sido", "would have been", "Conditional perfect."], ["claro no es cruel", "clear is not cruel", "Theme sentence."]] },
      { speakerId: "noa", text: "Escribí: agradezco que lo reconozcas, pero no quiero retomar el vínculo.", translation: "I wrote: I appreciate that you acknowledge it, but I don't want to resume the bond.", vocab: [["agradezco que lo reconozcas", "I appreciate that you acknowledge it", "Subjunctive after appreciation."], ["retomar el vínculo", "resume the bond", "Advanced relationship phrase."]] },
      { speakerId: "noa", text: "Lo envié. No cerró todo, pero dejó de pedirme que volviera a abrirlo.", translation: "I sent it. It did not close everything, but it stopped asking me to reopen it.", vocab: [["lo envié", "I sent it", "Completed action."], ["volviera a abrirlo", "reopen it", "Advanced emotional metaphor."]] },
    ],
    checkSeeds: [
      { question: "Who writes to Noa after a year?", options: ["Elia", "Sara", "Mateo", "Luis"], correct: "Elia", explanation: "Noa says Elia just wrote after a year of silence.", skill: "detail", afterMessageId: "m1" },
      { question: "What does Elia say she does not expect?", options: ["Immediate forgiveness", "Money", "A train ticket", "A new job"], correct: "Immediate forgiveness", explanation: "Elia says she does not expect Noa to forgive her immediately.", skill: "detail" },
      { question: "What does Sara say sincerity cannot do?", options: ["Erase the harm", "Send a message", "Open a door", "Change a phone"], correct: "Erase the harm", explanation: "Sara says sincerity does not erase the harm.", skill: "inference", afterMessageId: "m5" },
      { question: "Why does Noa hesitate to ask for an explanation?", options: ["It might not fix anything", "She forgot Spanish", "Elia blocked her", "Sara told her to travel"], correct: "It might not fix anything", explanation: "Noa says she may be seeking an explanation that would not fix anything.", skill: "inference" },
      { question: "What does Elia clarify?", options: ["She is not writing to come back", "She wants a job", "She lost a package", "She needs a password"], correct: "She is not writing to come back", explanation: "Elia says: No escribo para volver.", skill: "detail", afterMessageId: "m9" },
      { question: "What response does Noa finally send?", options: ["She appreciates the acknowledgment but does not want to resume the bond", "She invites Elia to dinner", "She asks for money", "She sends nothing"], correct: "She appreciates the acknowledgment but does not want to resume the bond", explanation: "Noa writes a brief boundary: she appreciates it but does not want to resume the bond.", skill: "summary" },
    ],
    learnedVocab: ["mensaje tardío", "desaparecí mal", "me desordena", "no borra el daño", "no tuvo el valor", "qué harías", "no arreglaría nada", "necesito cuidarme", "habría sido", "retomar el vínculo"],
  }),
];
