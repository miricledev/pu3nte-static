import type { FlashcardDeck, FlashcardItem, Level } from "../../types";

type StoryDeckSeed = {
  storyId: string;
  title: string;
  subtitle: string;
  level: Level;
  cards: Array<{
    id: string;
    term: string;
    definition: string;
    exampleSentence: string;
    exampleTranslation: string;
    acceptedAnswers?: string[];
    starred?: boolean;
  }>;
};

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

function makeCards(cards: StoryDeckSeed["cards"]): FlashcardItem[] {
  return cards.map((card) => ({
    ...card,
    languageFrom: "spanish",
    languageTo: "english",
  }));
}

function makeDeck(seed: StoryDeckSeed): FlashcardDeck {
  return {
    id: `${seed.storyId}-flashcards`,
    title: seed.title,
    subtitle: seed.subtitle,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: seed.level,
    tags: ["Spanish Texting Stories", "story vocab", seed.storyId],
    estimatedMinutes: 5,
    skoolSectionName: "Spanish Texting Stories - A1 to C2",
    relatedCourse: seed.storyId,
    activityType: "flashcards",
    data: {
      specialCharacters,
      cards: makeCards(seed.cards),
    },
  };
}

export const spanishTextingStoryFlashcards: FlashcardDeck[] = [
  makeDeck({
    storyId: "spanish-text-a1-wrong-cafe",
    title: "The Wrong Cafe: Vocabulary Prep",
    subtitle: "Learn the key phrases before reading the wrong-cafe texting story.",
    level: "elementary",
    cards: [
      { id: "ya-estoy", term: "ya estoy", definition: "I'm already", exampleSentence: "Ya estoy en el cafe.", exampleTranslation: "I'm already at the cafe.", starred: true },
      { id: "donde-estas", term: "¿Dónde estás?", definition: "Where are you?", exampleSentence: "Dani pregunta: ¿Dónde estás?", exampleTranslation: "Dani asks: Where are you?", acceptedAnswers: ["where are you"] },
      { id: "creo-que", term: "creo que", definition: "I think that", exampleSentence: "Creo que estoy cerca.", exampleTranslation: "I think I'm close." },
      { id: "no-pasa-nada", term: "no pasa nada", definition: "it's okay / no problem", exampleSentence: "No pasa nada, estas cerca.", exampleTranslation: "It's okay, you're close.", starred: true },
      { id: "cerca-de", term: "cerca de", definition: "near / close to", exampleSentence: "Estoy cerca de la puerta.", exampleTranslation: "I'm near the door." },
      { id: "enfrente-de", term: "enfrente de", definition: "across from / in front of", exampleSentence: "El cafe esta enfrente de la tienda.", exampleTranslation: "The cafe is across from the store." },
      { id: "voy-para-alla", term: "voy para allá", definition: "I'm heading there", exampleSentence: "Voy para alla ahora.", exampleTranslation: "I'm heading there now.", starred: true },
      { id: "tengo-hambre", term: "tengo hambre", definition: "I'm hungry", exampleSentence: "Tengo hambre tambien.", exampleTranslation: "I'm hungry too." },
      { id: "gracias-por-ayudarme", term: "gracias por ayudarme", definition: "thanks for helping me", exampleSentence: "Gracias por ayudarme.", exampleTranslation: "Thanks for helping me." },
      { id: "nos-vemos", term: "nos vemos", definition: "see you", exampleSentence: "Nos vemos en diez segundos.", exampleTranslation: "See you in ten seconds." },
      { id: "hola", term: "hola", definition: "hello / hi", exampleSentence: "Hola, ya estoy en el cafe.", exampleTranslation: "Hi, I'm already at the cafe." },
      { id: "en-el-cafe", term: "en el cafe", definition: "at the cafe", exampleSentence: "Estoy en el cafe.", exampleTranslation: "I'm at the cafe." },
      { id: "en-cual", term: "Â¿En cuÃ¡l?", definition: "in which one? / which one?", exampleSentence: "Â¿En cual cafe estas?", exampleTranslation: "Which cafe are you in?" },
      { id: "al-lado-de", term: "al lado de", definition: "next to", exampleSentence: "El cafe esta al lado de la tienda.", exampleTranslation: "The cafe is next to the store.", starred: true },
      { id: "ese-no-es", term: "ese no es", definition: "that's not it / that isn't", exampleSentence: "Ese no es el cafe correcto.", exampleTranslation: "That's not the right cafe." },
      { id: "hay", term: "hay", definition: "there is / there are", exampleSentence: "Hay dos cafes con ese nombre.", exampleTranslation: "There are two cafes with that name.", starred: true },
      { id: "se-llama", term: "se llama", definition: "it's called / his or her name is", exampleSentence: "El cafe se llama Cafe Luna.", exampleTranslation: "The cafe is called Cafe Luna." },
      { id: "lejos", term: "lejos", definition: "far", exampleSentence: "No esta lejos.", exampleTranslation: "It's not far." },
      { id: "cinco-minutos", term: "cinco minutos", definition: "five minutes", exampleSentence: "Esta como cinco minutos de aqui.", exampleTranslation: "It's about five minutes from here." },
      { id: "camina-derecho", term: "camina derecho", definition: "walk straight", exampleSentence: "Camina derecho hasta la esquina.", exampleTranslation: "Walk straight to the corner.", starred: true },
      { id: "la-esquina", term: "la esquina", definition: "the corner", exampleSentence: "La tienda roja esta en la esquina.", exampleTranslation: "The red store is on the corner." },
      { id: "veo", term: "veo", definition: "I see", exampleSentence: "Veo la tienda roja.", exampleTranslation: "I see the red store." },
      { id: "espera", term: "espera", definition: "wait", exampleSentence: "Espera en la puerta.", exampleTranslation: "Wait at the door." },
      { id: "dentro", term: "dentro", definition: "inside", exampleSentence: "Estoy dentro del cafe.", exampleTranslation: "I'm inside the cafe." },
      { id: "afuera", term: "afuera", definition: "outside", exampleSentence: "Estoy afuera, cerca de la puerta.", exampleTranslation: "I'm outside, near the door." },
      { id: "mesa", term: "mesa", definition: "table", exampleSentence: "Estoy en una mesa afuera.", exampleTranslation: "I'm at a table outside." },
      { id: "puerta", term: "puerta", definition: "door", exampleSentence: "Estoy cerca de la puerta.", exampleTranslation: "I'm near the door." },
      { id: "camisa-azul", term: "camisa azul", definition: "blue shirt", exampleSentence: "Â¿Tienes camisa azul?", exampleTranslation: "Do you have a blue shirt?" },
      { id: "perdon", term: "perdon", definition: "sorry", exampleSentence: "Perdon, estoy en el cafe equivocado.", exampleTranslation: "Sorry, I'm at the wrong cafe." },
      { id: "mira-la-direccion", term: "mira la direccion", definition: "look at the address", exampleSentence: "Mira la direccion antes de salir.", exampleTranslation: "Look at the address before leaving.", starred: true },
    ],
  }),
  makeDeck({
    storyId: "spanish-text-a2-voice-note-challenge",
    title: "The Voice Note Challenge: Vocabulary Prep",
    subtitle: "Practice confidence phrases before the Spanish voice-note story.",
    level: "elementary",
    cards: [
      { id: "quiero-practicar", term: "quiero practicar", definition: "I want to practice", exampleSentence: "Quiero practicar mi español.", exampleTranslation: "I want to practice my Spanish.", starred: true },
      { id: "me-da-pena", term: "me da pena", definition: "I'm embarrassed / shy", exampleSentence: "Me da pena mandar una nota.", exampleTranslation: "I'm embarrassed to send a note.", starred: true },
      { id: "no-te-preocupes", term: "no te preocupes", definition: "don't worry", exampleSentence: "No te preocupes. Habla despacio.", exampleTranslation: "Don't worry. Speak slowly." },
      { id: "habla-despacio", term: "habla despacio", definition: "speak slowly", exampleSentence: "Habla despacio en la nota.", exampleTranslation: "Speak slowly in the note." },
      { id: "estoy-aprendiendo", term: "estoy aprendiendo", definition: "I'm learning", exampleSentence: "Estoy aprendiendo español.", exampleTranslation: "I'm learning Spanish." },
      { id: "necesito-practicar-mas", term: "necesito practicar más", definition: "I need to practice more", exampleSentence: "Necesito practicar mas cada dia.", exampleTranslation: "I need to practice more every day." },
      { id: "puedes-repetir", term: "¿puedes repetir?", definition: "can you repeat?", exampleSentence: "No entiendo. ¿Puedes repetir?", exampleTranslation: "I don't understand. Can you repeat?", starred: true },
      { id: "voy-a-mandar", term: "voy a mandar", definition: "I'm going to send", exampleSentence: "Voy a mandar la nota ahora.", exampleTranslation: "I'm going to send the note now." },
      { id: "poco-a-poco", term: "poco a poco", definition: "little by little", exampleSentence: "Poco a poco, cada dia.", exampleTranslation: "Little by little, every day." },
      { id: "de-verdad", term: "de verdad", definition: "really / honestly", exampleSentence: "Eso ayuda mucho, de verdad.", exampleTranslation: "That helps a lot, really." },
      { id: "nota-de-voz", term: "nota de voz", definition: "voice note", exampleSentence: "Quiero mandar una nota de voz.", exampleTranslation: "I want to send a voice note.", starred: true },
      { id: "mi-pronunciacion", term: "mi pronunciacion", definition: "my pronunciation", exampleSentence: "Quiero practicar mi pronunciacion.", exampleTranslation: "I want to practice my pronunciation." },
      { id: "puedo-decir", term: "Â¿puedo decir?", definition: "can I say?", exampleSentence: "Â¿Puedo decir: estoy aprendiendo espaÃ±ol?", exampleTranslation: "Can I say: I'm learning Spanish?" },
      { id: "algo-mal", term: "algo mal", definition: "something wrong", exampleSentence: "Si digo algo mal, me corriges.", exampleTranslation: "If I say something wrong, you correct me." },
      { id: "no-te-rias", term: "no te rias", definition: "don't laugh", exampleSentence: "No te rias de mi nota.", exampleTranslation: "Don't laugh at my note." },
      { id: "contigo", term: "contigo", definition: "with you", exampleSentence: "Quiero practicar contigo.", exampleTranslation: "I want to practice with you." },
      { id: "primero", term: "primero", definition: "first", exampleSentence: "Primero, respira.", exampleTranslation: "First, breathe." },
      { id: "luego", term: "luego", definition: "then / later", exampleSentence: "Luego, manda el mensaje.", exampleTranslation: "Then, send the message." },
      { id: "estoy-grabando", term: "estoy grabando", definition: "I'm recording", exampleSentence: "Estoy grabando la nota ahora.", exampleTranslation: "I'm recording the note now." },
      { id: "borre-todo", term: "borre todo", definition: "I deleted everything", exampleSentence: "Espera, borre todo.", exampleTranslation: "Wait, I deleted everything." },
      { id: "intenta-otra-vez", term: "intenta otra vez", definition: "try again", exampleSentence: "No pasa nada, intenta otra vez.", exampleTranslation: "It's okay, try again.", starred: true },
      { id: "dije", term: "dije", definition: "I said", exampleSentence: "Dije la frase despacio.", exampleTranslation: "I said the phrase slowly." },
      { id: "entiendo-un-poco", term: "entiendo un poco", definition: "I understand a little", exampleSentence: "Entiendo un poco cuando hablas despacio.", exampleTranslation: "I understand a little when you speak slowly.", starred: true },
      { id: "si-no-entiendes", term: "si no entiendes", definition: "if you don't understand", exampleSentence: "Si no entiendes, puedes repetir.", exampleTranslation: "If you don't understand, you can repeat." },
      { id: "la-mande", term: "la mande", definition: "I sent it", exampleSentence: "La mande. Quiero esconderme.", exampleTranslation: "I sent it. I want to hide." },
      { id: "muy-bien", term: "muy bien", definition: "very good / very well", exampleSentence: "La nota esta muy bien.", exampleTranslation: "The note is very good." },
      { id: "se-entendio-todo", term: "se entendio todo", definition: "everything was understood", exampleSentence: "Se entendio todo en la nota.", exampleTranslation: "Everything was understood in the note." },
      { id: "manana", term: "manana", definition: "tomorrow", exampleSentence: "MaÃ±ana mando otra nota.", exampleTranslation: "Tomorrow I send another note." },
      { id: "cada-dia", term: "cada dia", definition: "every day", exampleSentence: "Cada dia hablas mejor.", exampleTranslation: "Every day you speak better." },
    ],
  }),
  makeDeck({
    storyId: "spanish-text-b1-apartment-without-water",
    title: "Apartment Without Water: Vocabulary Prep",
    subtitle: "Useful polite complaint phrases before the apartment problem story.",
    level: "intermediate",
    cards: [
      { id: "no-hay-agua", term: "no hay agua", definition: "there is no water", exampleSentence: "No hay agua en el apartamento.", exampleTranslation: "There is no water in the apartment.", starred: true },
      { id: "desde-esta-manana", term: "desde esta mañana", definition: "since this morning", exampleSentence: "No hay agua desde esta mañana.", exampleTranslation: "There has been no water since this morning." },
      { id: "acabo-de-darme-cuenta", term: "acabo de darme cuenta", definition: "I just realized", exampleSentence: "Acabo de darme cuenta del problema.", exampleTranslation: "I just realized the problem.", starred: true },
      { id: "deberias-escribirle", term: "deberías escribirle", definition: "you should write to him/her", exampleSentence: "Deberias escribirle al anfitrion.", exampleTranslation: "You should write to the host." },
      { id: "que-pena-molestar", term: "qué pena molestar", definition: "sorry to bother you", exampleSentence: "Que pena molestar, pero no hay agua.", exampleTranslation: "Sorry to bother you, but there is no water.", starred: true },
      { id: "mientras-tanto", term: "mientras tanto", definition: "meanwhile", exampleSentence: "Mientras tanto necesito una solucion.", exampleTranslation: "Meanwhile I need a solution." },
      { id: "me-dijo-que", term: "me dijo que", definition: "he/she told me that", exampleSentence: "Me dijo que van a arreglarlo.", exampleTranslation: "He told me they are going to fix it." },
      { id: "van-a-arreglarlo", term: "van a arreglarlo", definition: "they are going to fix it", exampleSentence: "Van a arreglarlo hoy.", exampleTranslation: "They are going to fix it today." },
      { id: "le-aviso", term: "le aviso", definition: "I'll let you know", exampleSentence: "Le aviso si necesito algo mas.", exampleTranslation: "I'll let you know if I need anything else." },
      { id: "quejarse-con-respeto", term: "quejarse con respeto", definition: "to complain respectfully", exampleSentence: "Quejarse con respeto tambien es español real.", exampleTranslation: "Complaining respectfully is also real Spanish." },
      { id: "el-anfitrion", term: "el anfitrion", definition: "the host", exampleSentence: "Voy a escribirle al anfitrion.", exampleTranslation: "I'm going to write to the host." },
      { id: "el-dueno", term: "el dueno", definition: "the owner", exampleSentence: "El dueno puede mandar un tecnico.", exampleTranslation: "The owner can send a technician." },
      { id: "solucion-temporal", term: "solucion temporal", definition: "temporary solution", exampleSentence: "Necesito una solucion temporal.", exampleTranslation: "I need a temporary solution.", starred: true },
      { id: "podria-usar", term: "podria usar", definition: "I could use", exampleSentence: "Podria usar la ducha de la vecina.", exampleTranslation: "I could use the neighbor's shower." },
      { id: "la-vecina", term: "la vecina", definition: "the neighbor", exampleSentence: "La vecina tiene una llave.", exampleTranslation: "The neighbor has a key." },
      { id: "la-llave", term: "la llave", definition: "the key", exampleSentence: "La llave esta con la vecina.", exampleTranslation: "The key is with the neighbor." },
      { id: "el-tecnico", term: "el tecnico", definition: "the technician", exampleSentence: "El tecnico llega por la tarde.", exampleTranslation: "The technician arrives in the afternoon." },
      { id: "firme", term: "firme", definition: "firm", exampleSentence: "El mensaje puede ser amable y firme.", exampleTranslation: "The message can be kind and firm." },
    ],
  }),
  makeDeck({
    storyId: "spanish-text-b2-last-minute-invitation",
    title: "Last-Minute Invitation: Vocabulary Prep",
    subtitle: "Social Spanish for invitations, nerves, and party plans.",
    level: "upper-intermediate",
    cards: [
      { id: "me-acaban-de-invitar", term: "me acaban de invitar", definition: "they just invited me", exampleSentence: "Me acaban de invitar al cumpleaños.", exampleTranslation: "They just invited me to the birthday.", starred: true },
      { id: "me-da-nervios", term: "me da nervios", definition: "it makes me nervous", exampleSentence: "Me da un poco de nervios.", exampleTranslation: "It makes me a little nervous." },
      { id: "casi-nadie", term: "casi nadie", definition: "almost nobody / barely anyone", exampleSentence: "No conozco a casi nadie.", exampleTranslation: "I barely know anyone.", starred: true },
      { id: "deberias-venir", term: "deberías venir", definition: "you should come", exampleSentence: "Deberias venir a la fiesta.", exampleTranslation: "You should come to the party." },
      { id: "va-a-estar-tranquilo", term: "va a estar tranquilo", definition: "it will be chill", exampleSentence: "Va a estar tranquilo.", exampleTranslation: "It will be chill." },
      { id: "no-hace-falta", term: "no hace falta", definition: "it's not necessary", exampleSentence: "No hace falta llevar nada.", exampleTranslation: "It's not necessary to bring anything.", starred: true },
      { id: "si-te-sientes-incomoda", term: "si te sientes incómoda", definition: "if you feel uncomfortable", exampleSentence: "Si te sientes incomoda, te puedes ir.", exampleTranslation: "If you feel uncomfortable, you can leave." },
      { id: "no-tienes-que", term: "no tienes que", definition: "you don't have to", exampleSentence: "No tienes que hablar perfecto.", exampleTranslation: "You don't have to speak perfectly." },
      { id: "trato-hecho", term: "trato hecho", definition: "deal", exampleSentence: "Trato hecho.", exampleTranslation: "Deal." },
      { id: "nos-vemos-alla", term: "nos vemos allá", definition: "see you there", exampleSentence: "Nos vemos alla.", exampleTranslation: "See you there." },
      { id: "y-si", term: "¿Y si...?", definition: "what if...?", exampleSentence: "¿Y si me quedo callada toda la noche?", exampleTranslation: "What if I stay quiet all night?" },
      { id: "me-quedo-callada", term: "me quedo callada", definition: "I stay quiet", exampleSentence: "Me quedo callada cuando estoy nerviosa.", exampleTranslation: "I stay quiet when I'm nervous." },
      { id: "tambien-cuenta", term: "tambien cuenta", definition: "it also counts", exampleSentence: "Escuchar tambien cuenta.", exampleTranslation: "Listening also counts.", starred: true },
      { id: "frases-de-emergencia", term: "frases de emergencia", definition: "emergency phrases", exampleSentence: "Necesito frases de emergencia para la fiesta.", exampleTranslation: "I need emergency phrases for the party." },
      { id: "como-conoces-a", term: "¿como conoces a...?", definition: "how do you know...?", exampleSentence: "¿Como conoces a Mateo?", exampleTranslation: "How do you know Mateo?" },
      { id: "voy-lento", term: "voy lento", definition: "I'm going slowly", exampleSentence: "Voy lento porque estoy aprendiendo.", exampleTranslation: "I'm going slowly because I'm learning." },
      { id: "me-salva-la-vida", term: "me salva la vida", definition: "it saves my life", exampleSentence: "Esa frase me salva la vida.", exampleTranslation: "That phrase saves my life." },
      { id: "te-puedes-ir-temprano", term: "te puedes ir temprano", definition: "you can leave early", exampleSentence: "Si quieres, te puedes ir temprano.", exampleTranslation: "If you want, you can leave early." },
    ],
  }),
  makeDeck({
    storyId: "spanish-text-c1-startup-offer",
    title: "Startup Offer: Vocabulary Prep",
    subtitle: "Advanced decision-making phrases before the startup offer story.",
    level: "advanced",
    cards: [
      { id: "me-ofrecieron-un-puesto", term: "me ofrecieron un puesto", definition: "they offered me a position", exampleSentence: "Me ofrecieron un puesto en la startup.", exampleTranslation: "They offered me a position at the startup.", starred: true },
      { id: "no-me-convence-del-todo", term: "no me convence del todo", definition: "it doesn't fully convince me", exampleSentence: "El sueldo no me convence del todo.", exampleTranslation: "The salary doesn't fully convince me.", starred: true },
      { id: "a-largo-plazo", term: "a largo plazo", definition: "long term", exampleSentence: "A largo plazo podria darme libertad.", exampleTranslation: "Long term it could give me freedom." },
      { id: "a-corto-plazo", term: "a corto plazo", definition: "short term", exampleSentence: "A corto plazo pierdo estabilidad.", exampleTranslation: "Short term I lose stability." },
      { id: "tomar-una-decision-impulsiva", term: "tomar una decisión impulsiva", definition: "make an impulsive decision", exampleSentence: "No quiero tomar una decision impulsiva.", exampleTranslation: "I don't want to make an impulsive decision." },
      { id: "si-fuera-tu", term: "si fuera tú", definition: "if I were you", exampleSentence: "Si fuera tu, pediria eso por escrito.", exampleTranslation: "If I were you, I would ask for that in writing.", starred: true },
      { id: "dejar-pasar-la-oportunidad", term: "dejar pasar la oportunidad", definition: "let the opportunity pass", exampleSentence: "No quiero dejar pasar la oportunidad.", exampleTranslation: "I don't want to let the opportunity pass." },
      { id: "asumir-el-riesgo", term: "asumir el riesgo", definition: "take on the risk", exampleSentence: "Asumir el riesgo no significa aceptar todo.", exampleTranslation: "Taking on the risk doesn't mean accepting everything." },
      { id: "limites-claros", term: "límites claros", definition: "clear boundaries", exampleSentence: "Necesito limites claros.", exampleTranslation: "I need clear boundaries." },
      { id: "desde-claridad", term: "desde claridad", definition: "from clarity", exampleSentence: "Decide desde claridad, no desde urgencia.", exampleTranslation: "Decide from clarity, not from urgency." },
      { id: "lo-que-representa", term: "lo que representa", definition: "what it represents", exampleSentence: "No es solo el puesto, es lo que representa.", exampleTranslation: "It's not just the position, it's what it represents." },
      { id: "una-apuesta", term: "una apuesta", definition: "a bet / a gamble", exampleSentence: "La startup es una apuesta.", exampleTranslation: "The startup is a gamble." },
      { id: "valga-la-pena", term: "valga la pena", definition: "be worth it", exampleSentence: "Quiero saber si valga la pena.", exampleTranslation: "I want to know if it's worth it." },
      { id: "por-escrito", term: "por escrito", definition: "in writing", exampleSentence: "Pide las condiciones por escrito.", exampleTranslation: "Ask for the conditions in writing.", starred: true },
      { id: "promesas-bonitas", term: "promesas bonitas", definition: "nice promises", exampleSentence: "Las promesas bonitas no pagan el alquiler.", exampleTranslation: "Nice promises don't pay rent." },
      { id: "aclarar-dudas", term: "aclarar dudas", definition: "clarify doubts / questions", exampleSentence: "Quiero aclarar dudas antes de decidir.", exampleTranslation: "I want to clarify questions before deciding." },
      { id: "buena-senal", term: "buena senal", definition: "good sign", exampleSentence: "Si responden bien, es buena senal.", exampleTranslation: "If they respond well, it's a good sign." },
      { id: "cuidar-tu-futuro", term: "cuidar tu futuro", definition: "protect your future", exampleSentence: "Negociar tambien es cuidar tu futuro.", exampleTranslation: "Negotiating is also protecting your future." },
    ],
  }),
  makeDeck({
    storyId: "spanish-text-c2-message-that-changed-everything",
    title: "Message That Changed Everything: Vocabulary Prep",
    subtitle: "Advanced emotional Spanish before the closure and boundaries story.",
    level: "advanced",
    cards: [
      { id: "siento-haber-desaparecido", term: "siento haber desaparecido", definition: "I'm sorry for disappearing", exampleSentence: "Siento haber desaparecido.", exampleTranslation: "I'm sorry for disappearing.", starred: true },
      { id: "despues-de-tanto-tiempo", term: "después de tanto tiempo", definition: "after so much time", exampleSentence: "Despues de tanto tiempo, me sorprendio.", exampleTranslation: "After so much time, it surprised me." },
      { id: "me-removio-muchas-cosas", term: "me removió muchas cosas", definition: "it stirred up a lot in me", exampleSentence: "Ese mensaje me removio muchas cosas.", exampleTranslation: "That message stirred up a lot in me.", starred: true },
      { id: "una-parte-de-mi", term: "una parte de mí", definition: "one part of me", exampleSentence: "Una parte de mi quiere responder.", exampleTranslation: "One part of me wants to respond." },
      { id: "desde-la-herida", term: "desde la herida", definition: "from the wound / hurt place", exampleSentence: "No respondas desde la herida.", exampleTranslation: "Don't respond from the wound.", starred: true },
      { id: "desde-la-calma", term: "desde la calma", definition: "from calm", exampleSentence: "Responde desde la calma.", exampleTranslation: "Respond from calm." },
      { id: "poner-limites", term: "poner límites", definition: "set boundaries", exampleSentence: "Poner limites no es guardar rencor.", exampleTranslation: "Setting boundaries is not holding a grudge." },
      { id: "guardar-rencor", term: "guardar rencor", definition: "hold a grudge", exampleSentence: "No guardo rencor.", exampleTranslation: "I don't hold a grudge." },
      { id: "retomar-el-vinculo", term: "retomar el vínculo", definition: "resume the relationship/bond", exampleSentence: "No estoy disponible para retomar el vinculo.", exampleTranslation: "I'm not available to resume the relationship." },
      { id: "mantener-la-distancia", term: "mantener la distancia", definition: "maintain distance", exampleSentence: "Necesito mantener la distancia.", exampleTranslation: "I need to maintain distance." },
      { id: "no-esperaba-recibir", term: "no esperaba recibir", definition: "I wasn't expecting to receive", exampleSentence: "No esperaba recibir ese mensaje.", exampleTranslation: "I wasn't expecting to receive that message." },
      { id: "tiene-sentido", term: "tiene sentido", definition: "it makes sense", exampleSentence: "Tiene sentido que te sientas asi.", exampleTranslation: "It makes sense that you feel that way." },
      { id: "abrir-esa-puerta", term: "abrir esa puerta", definition: "open that door", exampleSentence: "No se si quiero abrir esa puerta.", exampleTranslation: "I don't know if I want to open that door." },
      { id: "necesito-cuidarme", term: "necesito cuidarme", definition: "I need to protect/take care of myself", exampleSentence: "Necesito cuidarme antes de responder.", exampleTranslation: "I need to take care of myself before replying.", starred: true },
      { id: "reconocer-el-dano", term: "reconocer el dano", definition: "acknowledge the harm", exampleSentence: "Gracias por reconocer el dano.", exampleTranslation: "Thank you for acknowledging the harm." },
      { id: "no-borra-lo-que-paso", term: "no borra lo que paso", definition: "it doesn't erase what happened", exampleSentence: "Eso no borra lo que paso.", exampleTranslation: "That doesn't erase what happened." },
      { id: "sin-abrir-una-conversacion-larga", term: "sin abrir una conversacion larga", definition: "without opening a long conversation", exampleSentence: "Quiero responder sin abrir una conversacion larga.", exampleTranslation: "I want to reply without opening a long conversation." },
      { id: "lo-envie", term: "lo envie", definition: "I sent it", exampleSentence: "Lo envie y cerre el chat.", exampleTranslation: "I sent it and closed the chat." },
    ],
  }),
];
