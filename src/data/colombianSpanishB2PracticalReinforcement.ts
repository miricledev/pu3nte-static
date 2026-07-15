import type {
  CheckpointQuestion,
  CheckpointQuiz,
  FlashcardDeck,
  FlashcardItem,
  ReadingComprehension,
  StoryMessage,
  WhatsAppStory,
} from "../types";

type VocabItem = {
  id: string;
  term: string;
  meaning: string;
  example: string;
  translation: string;
  starred?: boolean;
};

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const practicalVocab: VocabItem[] = [
  { id: "que-mas", term: "Qué más", meaning: "What's up? / How's it going?", example: "Qué más, parce, ¿todo bien?", translation: "What's up, mate, everything good?", starred: true },
  { id: "quiubo", term: "Quiubo", meaning: "What's up? / Hey", example: "Quiubo, veci, qué pena molestarlo.", translation: "Hey, neighbour, sorry to bother you.", starred: true },
  { id: "parce", term: "Parce", meaning: "Mate / bro / dude", example: "Parce, tengo un problemita con el pedido.", translation: "Mate, I have a small problem with the order.", starred: true },
  { id: "parcero", term: "Parcero", meaning: "Mate / buddy / bro", example: "Mi parcero me ayudó a revisar la vuelta.", translation: "My buddy helped me check the situation." },
  { id: "uy", term: "Uy", meaning: "Oof / wow / oh man", example: "Uy, eso se embolató más de lo que pensé.", translation: "Oof, that got messier than I thought." },
  { id: "listo", term: "Listo", meaning: "Okay / sorted / done / alright", example: "Listo, quedamos en eso.", translation: "Okay, that's settled.", starred: true },
  { id: "de-una", term: "De una", meaning: "For sure / straight away / absolutely", example: "Te la mando de una.", translation: "I'll send it to you right away.", starred: true },
  { id: "dale", term: "Dale", meaning: "Okay / go ahead / sure", example: "Dale, mirémoslo con calma.", translation: "Okay, let's look at it calmly." },
  { id: "hagamosle", term: "Hagámosle", meaning: "Let's do it / let's go for it", example: "Hagámosle, arreglémoslo bien.", translation: "Let's do it, let's fix it properly.", starred: true },
  { id: "que-pena", term: "Qué pena", meaning: "Sorry / excuse me / my bad", example: "Qué pena, de pronto me expliqué mal.", translation: "Sorry, maybe I explained myself badly.", starred: true },
  { id: "que-pena-con-usted", term: "Qué pena con usted", meaning: "Sorry to bother you / apologies", example: "Qué pena con usted, creo que hubo un errorcito.", translation: "Sorry to bother you, I think there was a small mistake." },
  { id: "me-colaboras", term: "¿Me colaboras?", meaning: "Can you help me?", example: "Parce, ¿me colaboras un minutico?", translation: "Mate, can you help me for a quick minute?", starred: true },
  { id: "me-colabora-con-esto", term: "¿Me colabora con esto?", meaning: "Could you help me with this?", example: "Don Pedro, ¿me colabora con esto?", translation: "Don Pedro, could you help me with this?" },
  { id: "un-minutico", term: "Un minutico", meaning: "A quick minute / just a sec", example: "Espéreme un minutico y le aclaro.", translation: "Wait just a second and I'll clarify." },
  { id: "me-regalas-un-minuto", term: "¿Me regalas un minuto?", meaning: "Can you give me a minute?", example: "¿Me regalas un minuto para revisar el recibo?", translation: "Can you give me a minute to check the receipt?" },
  { id: "sera-que", term: "¿Será que…?", meaning: "Could you possibly…? / Do you think…?", example: "¿Será que lo revisamos hoy?", translation: "Could we possibly review it today?", starred: true },
  { id: "sera-que-revisas-que-paso", term: "¿Será que revisas qué pasó?", meaning: "Could you check what happened?", example: "¿Será que revisas qué pasó con el precio?", translation: "Could you check what happened with the price?" },
  { id: "sera-que-me-colabora-con-esto", term: "¿Será que me colabora con esto?", meaning: "Could you help me with this?", example: "¿Será que me colabora con esto sin armar problema?", translation: "Could you help me with this without making a fuss?" },
  { id: "sera-que-lo-corremos-diez-minuticos", term: "¿Será que lo corremos diez minuticos?", meaning: "Could we move it back ten minutes?", example: "¿Será que lo corremos diez minuticos por el trancón?", translation: "Could we move it back ten minutes because of traffic?" },
  { id: "fresco", term: "Fresco", meaning: "No worries / chill / it's okay", example: "Fresco, no pasa nada.", translation: "No worries, it's okay.", starred: true },
  { id: "tranquilo", term: "Tranquilo", meaning: "Relax / no worries / it's fine", example: "Tranquilo, buscamos otra solución.", translation: "Relax, we'll find another solution." },
  { id: "no-pasa-nada", term: "No pasa nada", meaning: "No worries / it's okay", example: "No pasa nada, yo me acomodo.", translation: "No worries, I'll adapt." },
  { id: "lo-que-pasa-es-que", term: "Lo que pasa es que…", meaning: "The thing is…", example: "Lo que pasa es que me salió con otro precio.", translation: "The thing is it came out with a different price.", starred: true },
  { id: "tengo-un-problemita", term: "Tengo un problemita", meaning: "I have a small problem", example: "Tengo un problemita con el paquete.", translation: "I have a small problem with the package." },
  { id: "errorcito", term: "Errorcito", meaning: "Small mistake", example: "Fue un errorcito de dirección.", translation: "It was a small address mistake." },
  { id: "creo-que-hubo-un-errorcito", term: "Creo que hubo un errorcito", meaning: "I think there was a small mistake", example: "Creo que hubo un errorcito en la factura.", translation: "I think there was a small mistake on the bill.", starred: true },
  { id: "no-quiero-armar-problema", term: "No quiero armar problema", meaning: "I don't want to make a fuss/problem", example: "No quiero armar problema, solo cuadrarlo bien.", translation: "I don't want to make a fuss, just sort it out properly." },
  { id: "miremoslo-con-calma", term: "Mirémoslo con calma", meaning: "Let's look at it calmly", example: "Mirémoslo con calma antes de decidir.", translation: "Let's look at it calmly before deciding." },
  { id: "revisemos-la-vuelta", term: "Revisemos la vuelta", meaning: "Let's check the situation / let's look into it", example: "Revisemos la vuelta y buscamos otra solución.", translation: "Let's check the situation and find another solution.", starred: true },
  { id: "la-vuelta", term: "La vuelta", meaning: "The thing / the situation / the matter", example: "La vuelta se embolató por el precio.", translation: "The situation got messy because of the price." },
  { id: "cuadrar", term: "Cuadrar", meaning: "To sort out / arrange / make work", example: "Tenemos que cuadrar la hora.", translation: "We need to arrange the time.", starred: true },
  { id: "cuadrarlo-bien", term: "Cuadrarlo bien", meaning: "Sort it out properly", example: "Quiero cuadrarlo bien para que quede claro.", translation: "I want to sort it out properly so it's clear." },
  { id: "cuadramos-la-hora", term: "Cuadramos la hora", meaning: "We'll arrange/fix the time", example: "Cuadramos la hora cuando llegue Mario.", translation: "We'll arrange the time when Mario arrives." },
  { id: "quedamos-en-eso", term: "Quedamos en eso", meaning: "We agree on that / that's settled", example: "Listo, quedamos en eso.", translation: "Okay, that's settled." },
  { id: "bacano", term: "Bacano", meaning: "Cool / great / nice", example: "Bacano que lo resolvimos sin pelear.", translation: "Cool that we solved it without fighting." },
  { id: "me-salio-con-otro-precio", term: "Me salió con otro precio", meaning: "It came out with a different price", example: "El arreglo me salió con otro precio.", translation: "The repair came out with a different price.", starred: true },
  { id: "me-devuelves-esta-parte", term: "Me devuelves esta parte", meaning: "You refund me this part", example: "Me devuelves esta parte y yo pago el resto.", translation: "You refund me this part and I'll pay the rest." },
  { id: "yo-pago-el-resto", term: "Yo pago el resto", meaning: "I'll pay the rest", example: "Si fue mi error, yo pago el resto.", translation: "If it was my mistake, I'll pay the rest." },
  { id: "de-pronto", term: "De pronto", meaning: "Maybe / perhaps", example: "De pronto lo podemos arreglar hoy.", translation: "Maybe we can fix it today." },
  { id: "de-pronto-me-explique-mal", term: "De pronto me expliqué mal", meaning: "Maybe I explained myself badly", example: "De pronto me expliqué mal en la nota.", translation: "Maybe I explained myself badly in the note." },
  { id: "dejeme-le-aclaro", term: "Déjeme le aclaro", meaning: "Let me clarify for you", example: "Déjeme le aclaro lo del precio.", translation: "Let me clarify the price for you.", starred: true },
  { id: "le-mande-una-nota-de-voz", term: "Le mandé una nota de voz", meaning: "I sent you a voice note", example: "Le mandé una nota de voz con los detalles.", translation: "I sent you a voice note with the details." },
  { id: "se-me-embolato", term: "Se me embolató", meaning: "It got mixed up / messy / lost in the process", example: "Se me embolató el recibo entre tantos mensajes.", translation: "The receipt got mixed up among so many messages.", starred: true },
  { id: "eso-se-embolato", term: "Eso se embolató", meaning: "That got complicated/messy", example: "Eso se embolató cuando cambiaron la hora.", translation: "That got messy when they changed the time." },
  { id: "arreglemoslo-bien", term: "Arreglémoslo bien", meaning: "Let's fix it properly", example: "Arreglémoslo bien y quedamos tranquilos.", translation: "Let's fix it properly and be at ease.", starred: true },
  { id: "me-cogio-la-tarde", term: "Me cogió la tarde", meaning: "I got caught running late / time got away from me", example: "Me cogió la tarde por una llamada.", translation: "I ended up running late because of a call." },
  { id: "trancon", term: "Trancón", meaning: "Traffic jam", example: "Hay trancón cerca de la portería.", translation: "There's traffic near the gate." },
  { id: "un-trancon-ni-el-berraco", term: "Un trancón ni el berraco", meaning: "A crazy/heavy traffic jam", example: "Me agarró un trancón ni el berraco.", translation: "I got stuck in a crazy traffic jam." },
  { id: "ni-el-berraco", term: "Ni el berraco", meaning: "Really intense / crazy / huge", example: "Ese enredo quedó ni el berraco.", translation: "That mess got really intense." },
  { id: "ya-voy-saliendo", term: "Ya voy saliendo", meaning: "I'm just heading out now", example: "Ya voy saliendo para recoger el paquete.", translation: "I'm just heading out to pick up the package." },
  { id: "ya-casi-llego", term: "Ya casi llego", meaning: "I'm almost there", example: "Ya casi llego, espéreme un minutico.", translation: "I'm almost there, wait a quick minute." },
  { id: "esta-cayendo-un-aguacero", term: "Está cayendo un aguacero", meaning: "It's pouring rain", example: "Está cayendo un aguacero, pero igual voy.", translation: "It's pouring rain, but I'm still going." },
  { id: "empapado", term: "Empapado", meaning: "Soaked", example: "Llegué empapado, pero con el paquete.", translation: "I arrived soaked, but with the package." },
  { id: "no-me-mames-gallo", term: "No me mames gallo", meaning: "Don't mess with me / don't tease me / don't pull my leg", example: "No me mames gallo, ¿sí cambió el precio?", translation: "Don't mess with me, did the price really change?", starred: true },
  { id: "fuera-de-charla", term: "Fuera de charla", meaning: "Jokes aside / seriously", example: "Fuera de charla, necesito una solución práctica.", translation: "Jokes aside, I need a practical solution.", starred: true },
  { id: "yo-me-acomodo", term: "Yo me acomodo", meaning: "I'll adapt / I'll make it work", example: "Si toca recogerlo mañana, yo me acomodo.", translation: "If I have to pick it up tomorrow, I'll adapt." },
  { id: "veci", term: "Veci", meaning: "Neighbour / short for vecino/vecina", example: "Veci, me llegó su paquete por error.", translation: "Neighbour, your package arrived at my place by mistake.", starred: true },
  { id: "que-pena-molestarlo", term: "Qué pena molestarlo", meaning: "Sorry to bother you", example: "Qué pena molestarlo tan temprano.", translation: "Sorry to bother you so early." },
  { id: "me-llego-su-paquete-por-error", term: "Me llegó su paquete por error", meaning: "Your package arrived at my place by mistake", example: "Me llegó su paquete por error en recepción.", translation: "Your package arrived at my place by mistake at reception.", starred: true },
  { id: "se-lo-guardo-aca", term: "Se lo guardo acá", meaning: "I'll keep it here for you", example: "Se lo guardo acá hasta que venga.", translation: "I'll keep it here for you until you come." },
  { id: "me-avisa-cuando-venga", term: "Me avisa cuando venga", meaning: "Let me know when you come", example: "Me avisa cuando venga y se lo bajo.", translation: "Let me know when you come and I'll bring it down." },
  { id: "mil-gracias", term: "Mil gracias", meaning: "Thanks a lot", example: "Mil gracias por guardarlo.", translation: "Thanks a lot for keeping it." },
  { id: "con-mucho-gusto", term: "Con mucho gusto", meaning: "With pleasure / you're welcome", example: "Con mucho gusto, veci.", translation: "With pleasure, neighbour." },
  { id: "a-la-orden", term: "A la orden", meaning: "At your service / happy to help", example: "A la orden, para eso estamos.", translation: "Happy to help, that's what we're here for." },
  { id: "a-la-orden-para-lo-que-necesite", term: "A la orden para lo que necesite", meaning: "At your service for anything you need", example: "A la orden para lo que necesite con el paquete.", translation: "At your service for anything you need with the package." },
  { id: "te-la-mando-de-una", term: "Te la mando de una", meaning: "I'll send it to you right away", example: "Te la mando de una por WhatsApp.", translation: "I'll send it to you right away on WhatsApp." },
  { id: "buscamos-otra-solucion", term: "Buscamos otra solución", meaning: "We'll find another solution", example: "Si no funciona, buscamos otra solución.", translation: "If it doesn't work, we'll find another solution." },
  { id: "necesito-una-solucion-practica", term: "Necesito una solución práctica", meaning: "I need a practical solution", example: "Fuera de charla, necesito una solución práctica.", translation: "Jokes aside, I need a practical solution.", starred: true },
];

const practicalHighlights = Object.fromEntries(
  practicalVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning }]),
);

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
    starred: item.starred,
  };
}

function highlights(phrases: string[]) {
  return phrases.map((phrase) => practicalHighlights[phrase]).filter((item): item is { phrase: string; meaning: string } => Boolean(item));
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

export const colombianSpanishB2PracticalFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b2-practical-problem-solving-flashcards",
  title: "Colombian Spanish B2: Practical Problem-Solving Vocab",
  subtitle: "Colombian phrases for asking for help, fixing mix-ups, rescheduling, refunds, and neighbour chats.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "dialect", "problem-solving", "speaking lesson reinforcement"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-package-price-mixup",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: practicalVocab.map(cardFromVocab),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "practical-story-q1",
    type: "multiple-choice",
    prompt: "What is the first problem in the chat?",
    options: ["A package arrived at the wrong apartment", "A restaurant order is late", "Someone lost a passport", "The lift is broken"],
    correctAnswer: "A package arrived at the wrong apartment",
    explanation: "Mario tells Camila: Me llegó su paquete por error.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "practical-story-q2",
    type: "multiple-choice",
    prompt: "Why does Camila want to review the situation calmly?",
    options: ["The price changed and the receipt got messy", "She wants a new job", "She dislikes Mario", "She wants to cancel everything"],
    correctAnswer: "The price changed and the receipt got messy",
    explanation: "The phrases me salió con otro precio and se me embolató show a price/receipt mix-up.",
    points: 1,
    skillTag: "inference",
  },
  {
    id: "practical-story-q3",
    type: "typed",
    prompt: "Type the phrase meaning 'I need a practical solution'.",
    correctAnswer: "necesito una solución práctica",
    correctAnswers: ["necesito una solucion practica", "necesito una solución práctica"],
    explanation: "Necesito una solución práctica is the direct phrase for asking for a workable fix.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "practical-story-q4",
    type: "multiple-choice",
    prompt: "What does ¿Será que lo corremos diez minuticos? mean?",
    options: ["Could we move it back ten minutes?", "Could we pay ten thousand?", "Could we cancel it?", "Could we send ten photos?"],
    correctAnswer: "Could we move it back ten minutes?",
    explanation: "Correr una hora/reunión means to move or shift the time.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "practical-story-q5",
    type: "multiple-choice",
    prompt: "How does the story end?",
    options: ["They agree on a calm practical solution", "They block each other", "They lose the package", "They ignore the price problem"],
    correctAnswer: "They agree on a calm practical solution",
    explanation: "The ending uses arreglémoslo bien, quedamos en eso, and buscamos otra solución.",
    points: 1,
    skillTag: "summary",
  },
];

export const colombianSpanishB2PracticalWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b2-package-price-mixup",
  title: "Colombian B2 Story: El Paquete y el Precio Raro",
  subtitle: "A practical WhatsApp story about a wrong package, a rescheduled meeting, and fixing a price mix-up calmly.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "WhatsApp", "problem-solving", "neighbour chat"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-practical-problem-solving-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "camila", name: "Camila", initials: "C", side: "right", color: "blue" },
      { id: "mario", name: "Mario", initials: "M", side: "left", color: "green" },
      { id: "laura", name: "Laura", initials: "L", side: "left", color: "violet" },
      { id: "don-pedro", name: "Don Pedro", initials: "P", side: "left", color: "gold" },
      { id: "javi", name: "Javi", initials: "J", side: "left", color: "cyan" },
    ],
    messages: [
      message("n1", "narrator", "Scene 1: the story starts with a neighbour message, not a dramatic adventure. Listen for soft Colombian ways to ask for help.", "Scene 1: the story starts with a neighbour message, not a dramatic adventure. Listen for soft Colombian ways to ask for help.", [], "narrator"),
      message("m1", "mario", "Quiubo, veci. Qué pena molestarlo, ¿usted es Camila del 503?", "Hey, neighbour. Sorry to bother you, are you Camila from 503?", ["Quiubo", "Veci", "Qué pena molestarlo"]),
      message("m2", "camila", "Qué más, sí señor. Dígame, ¿todo bien?", "What's up, yes sir. Tell me, everything okay?", ["Qué más"]),
      message("m3", "mario", "Me llegó su paquete por error. Se lo guardo acá, fresco.", "Your package arrived at my place by mistake. I'll keep it here for you, no worries.", ["Me llegó su paquete por error", "Se lo guardo acá", "Fresco"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m3.mp3"),
      message("m4", "camila", "Uy, mil gracias. Qué pena con usted, de pronto puse mal el apartamento.", "Oof, thanks a lot. Sorry to bother you, maybe I put the wrong apartment.", ["Uy", "Mil gracias", "Qué pena con usted", "De pronto"]),
      message("m5", "mario", "No pasa nada. Me avisa cuando venga y se lo bajo a portería.", "No worries. Let me know when you come and I'll bring it down to reception.", ["No pasa nada", "Me avisa cuando venga"]),
      message("m6", "camila", "De una. Ya voy saliendo, pero me cogió la tarde por una llamada.", "For sure. I'm just heading out now, but I ended up running late because of a call.", ["De una", "Ya voy saliendo", "Me cogió la tarde"]),
      message("m7", "laura", "Parce, acuérdate de la reunión con Don Pedro. ¿Será que lo corremos diez minuticos?", "Mate, remember the meeting with Don Pedro. Could we move it back ten minutes?", ["Parce", "¿Será que lo corremos diez minuticos?"]),
      message("m8", "camila", "Dale. Cuadramos la hora y quedamos en eso.", "Okay. We'll arrange the time and that's settled.", ["Dale", "Cuadramos la hora", "Quedamos en eso"]),
      message("n2", "narrator", "Scene 2: one small mistake becomes three practical problems: a package, a meeting time, and a price that does not match.", "Scene 2: one small mistake becomes three practical problems: a package, a meeting time, and a price that does not match.", ["La vuelta"], "narrator"),
      message("m9", "camila", "Javi, ¿me colaboras? Tengo un problemita con el recibo.", "Javi, can you help me? I have a small problem with the receipt.", ["¿Me colaboras?", "Tengo un problemita"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m9.mp3"),
      message("m10", "javi", "Listo, parcera. ¿Qué pasó?", "Okay, buddy. What happened?", ["Listo", "Parcero"]),
      message("m11", "camila", "Lo que pasa es que el arreglo me salió con otro precio.", "The thing is the repair came out with a different price.", ["Lo que pasa es que…", "Me salió con otro precio"]),
      message("m12", "javi", "¿Será que revisas qué pasó con la cotización?", "Could you check what happened with the quote?", ["¿Será que revisas qué pasó?"]),
      message("m13", "camila", "Sí. Creo que hubo un errorcito, pero no quiero armar problema.", "Yes. I think there was a small mistake, but I don't want to make a fuss.", ["Creo que hubo un errorcito", "Errorcito", "No quiero armar problema"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m13.mp3"),
      message("m14", "javi", "Mirémoslo con calma. Revisemos la vuelta antes de escribirle bravo.", "Let's look at it calmly. Let's check the situation before writing to him angrily.", ["Mirémoslo con calma", "Revisemos la vuelta", "La vuelta"]),
      message("m15", "camila", "Se me embolató todo: eso se embolató porque le mandé una nota de voz y después cambié una parte.", "Everything got mixed up on me: that got messy because I sent him a voice note and then changed one part.", ["Se me embolató", "Eso se embolató", "Le mandé una nota de voz"]),
      message("m16", "laura", "De pronto me expliqué mal en el grupo. Déjeme le aclaro a Don Pedro.", "Maybe I explained myself badly in the group. Let me clarify it for Don Pedro.", ["De pronto me expliqué mal", "Déjeme le aclaro"]),
      message("m17", "don-pedro", "Qué pena, Camila. ¿Me colabora con esto? ¿Será que me colabora con esto y me manda el pantallazo?", "Sorry, Camila. Could you help me with this? Could you help me with this and send me the screenshot?", ["Qué pena", "¿Me colabora con esto?", "¿Será que me colabora con esto?"]),
      message("m18", "camila", "Claro. Te la mando de una. Un minutico.", "Of course. I'll send it to you right away. Just a sec.", ["Te la mando de una", "Un minutico"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m18.mp3"),
      message("m19", "don-pedro", "Con mucho gusto reviso. A la orden para lo que necesite.", "I'll review it with pleasure. At your service for anything you need.", ["Con mucho gusto", "A la orden para lo que necesite"]),
      message("m20", "camila", "Gracias. No me mames gallo, ¿sí quedó tan caro o fue error?", "Thanks. Don't mess with me, did it really end up that expensive or was it a mistake?", ["No me mames gallo"]),
      message("m21", "don-pedro", "Fuera de charla, sí hay una parte mal cobrada.", "Jokes aside, yes, one part was charged incorrectly.", ["Fuera de charla"]),
      message("m22", "camila", "Entonces me devuelves esta parte y yo pago el resto.", "Then you refund me this part and I'll pay the rest.", ["Me devuelves esta parte", "Yo pago el resto"]),
      message("n3", "narrator", "Scene 3: the tone stays firm but not aggressive. Notice how Colombian Spanish softens direct requests while still solving the problem.", "Scene 3: the tone stays firm but not aggressive. Notice how Colombian Spanish softens direct requests while still solving the problem.", ["Cuadrar", "Cuadrarlo bien"], "narrator"),
      message("m23", "don-pedro", "Hagámosle. Arreglémoslo bien para que no quede raro.", "Let's do it. Let's fix it properly so it doesn't stay weird.", ["Hagámosle", "Arreglémoslo bien"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m23.mp3"),
      message("m24", "camila", "Bacano. La idea es cuadrarlo bien, no pelear.", "Great. The idea is to sort it out properly, not fight.", ["Bacano", "Cuadrarlo bien"]),
      message("m25", "laura", "Don Pedro dice que puede cuadrar todo hoy, pero viene tarde.", "Don Pedro says he can sort everything out today, but he's coming late.", ["Cuadrar"]),
      message("m26", "don-pedro", "Me agarró un trancón ni el berraco. Ya casi llego.", "I got caught in a crazy traffic jam. I'm almost there.", ["Un trancón ni el berraco", "Trancón", "Ni el berraco", "Ya casi llego"]),
      message("m27", "camila", "Tranquilo. Está cayendo un aguacero por acá, igual llego empapada.", "No worries. It's pouring rain around here, I'll arrive soaked anyway.", ["Tranquilo", "Está cayendo un aguacero", "Empapado"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m27.mp3"),
      message("m28", "mario", "Camila, acá tengo el paquete. A la orden.", "Camila, I have the package here. Happy to help.", ["A la orden"]),
      message("m29", "camila", "Mil gracias, veci. ¿Me regalas un minuto mientras subo?", "Thanks a lot, neighbour. Can you give me a minute while I come up?", ["Mil gracias", "Veci", "¿Me regalas un minuto?"]),
      message("m30", "mario", "Con mucho gusto. Yo me acomodo, no hay afán.", "With pleasure. I'll adapt, there's no rush.", ["Con mucho gusto", "Yo me acomodo"]),
      message("m31", "javi", "Parce, la vuelta ya va mejor. Necesitas una solución práctica, no una novela.", "Mate, the situation is already improving. You need a practical solution, not a soap opera.", ["Parce", "La vuelta", "Necesito una solución práctica"]),
      message("m32", "camila", "Total. Necesito una solución práctica. Si algo no cuadra, buscamos otra solución.", "Totally. I need a practical solution. If something doesn't work, we'll find another solution.", ["Necesito una solución práctica", "Buscamos otra solución"]),
      message("m33", "don-pedro", "Listo, me devuelvo por la herramienta y lo dejamos cuadrado.", "Okay, I'll go back for the tool and we'll leave it sorted.", ["Listo", "Cuadrar"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m33.mp3"),
      message("m34", "camila", "¿Será que… lo dejamos para las seis y media?", "Could we possibly leave it for six thirty?", ["¿Será que…?"]),
      message("m35", "don-pedro", "Dale, quedamos en eso. Fresco, no pasa nada.", "Okay, that's settled. No worries, it's okay.", ["Dale", "Quedamos en eso", "Fresco", "No pasa nada"]),
      message("m36", "mario", "Paquete entregado, recibo claro, reunión movida. Eso sí fue práctico.", "Package delivered, receipt clear, meeting moved. That really was practical.", []),
      message("m37", "camila", "A la orden para lo que necesiten ustedes también. Hoy aprendimos a no armar problema.", "At your service for anything you need too. Today we learned not to make a fuss.", ["A la orden para lo que necesite", "No quiero armar problema"]),
      message("m38", "javi", "Hagámosle a una regla nueva: primero calma, después solución.", "Let's go for a new rule: calm first, solution after.", ["Hagámosle"], "voice-note", "/audio/stories/colombian-spanish-b2-package-price-mixup/m38.mp3"),
    ],
    comprehensionChecks: [
      { id: "practical-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "practical-check-2", afterMessageId: "m8", question: storyQuestions[3] },
      { id: "practical-check-3", afterMessageId: "m15", question: storyQuestions[1] },
      { id: "practical-check-4", afterMessageId: "m32", question: storyQuestions[2] },
      { id: "practical-check-5", afterMessageId: "m38", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: practicalVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: practicalVocab.map((item) => item.term),
      grammarPatterns: [
        "¿Será que...? softens requests so they sound polite and Colombian.",
        "Diminutives like problemita, errorcito, minutico soften tension.",
        "Lo que pasa es que... introduces the real issue without sounding aggressive.",
        "Quedamos en eso and cuadramos la hora close practical arrangements.",
        "No quiero armar problema frames a firm complaint as cooperative.",
      ],
      speakingPrompts: [
        "Explain a wrong delivery using veci, me llegó su paquete por error, and se lo guardo acá.",
        "Ask politely for help using ¿será que...?, ¿me colaboras?, and un minutico.",
        "Fix a billing problem using me salió con otro precio, me devuelves esta parte, and yo pago el resto.",
        "Reschedule a meeting using me cogió la tarde, trancón, and ¿será que lo corremos diez minuticos?",
      ],
    },
    completionTask: {
      title: "Your practical Colombian voice note",
      instructions:
        "Record a 90-second voice note solving a small mix-up. Use at least 15 expressions from this story, including one greeting, one apology, one soft request, one payment phrase, and one closing phrase.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "Quiubo, te cuento una vuelta práctica, de esas que no son graves pero sí enseñan mucho español colombiano. Ese día yo estaba trabajando desde la casa cuando Mario, el veci del 502, me escribió: 'Qué pena molestarlo, ¿usted es Camila? Me llegó su paquete por error. Se lo guardo acá y me avisa cuando venga'. Yo le respondí: 'Qué más, Mario, sí soy yo. Uy, mil gracias. Qué pena con usted; de pronto puse mal el apartamento'. Él, muy amable, me dijo: 'Fresco, no pasa nada. Con mucho gusto, a la orden'.",
    translation:
      "Hey, let me tell you a practical situation, the kind that is not serious but teaches a lot of Colombian Spanish. That day I was working from home when Mario, the neighbour from 502, wrote to me: 'Sorry to bother you, are you Camila? Your package arrived at my place by mistake. I'll keep it here for you and let me know when you come.' I replied: 'What's up, Mario, yes that's me. Oof, thanks a lot. Sorry to bother you; maybe I put the wrong apartment.' He kindly told me: 'No worries, it's okay. With pleasure, happy to help.'",
    highlights: highlights(["Quiubo", "La vuelta", "Veci", "Qué pena molestarlo", "Me llegó su paquete por error", "Se lo guardo acá", "Me avisa cuando venga", "Qué más", "Uy", "Mil gracias", "Qué pena con usted", "De pronto", "Fresco", "No pasa nada", "Con mucho gusto", "A la orden"]),
    shadowLine: "Me llegó su paquete por error; se lo guardo acá.",
  },
  {
    id: "p2",
    text:
      "Mientras salía a recogerlo, Laura me recordó otra vuelta: teníamos que cuadrar una hora con Don Pedro para revisar un arreglo. Yo iba tarde, así que escribí: 'Parce, me cogió la tarde. ¿Será que lo corremos diez minuticos?'. Laura contestó: 'Dale, cuadramos la hora y quedamos en eso'. Me gustó porque nadie armó problema. Fue un ejemplo perfecto de cómo en Colombia puedes sonar amable sin dejar de ser claro: un minutico, ¿me regalas un minuto?, ¿será que...? Todo baja la tensión.",
    translation:
      "While I was leaving to pick it up, Laura reminded me of another situation: we had to arrange a time with Don Pedro to review a repair. I was late, so I wrote: 'Mate, I ended up running late. Could we move it back ten minutes?' Laura replied: 'Okay, we'll arrange the time and that's settled.' I liked it because nobody made a fuss. It was a perfect example of how in Colombia you can sound kind without stopping being clear: just a sec, can you give me a minute, could you possibly...? Everything lowers the tension.",
    highlights: highlights(["Cuadrar", "Me cogió la tarde", "¿Será que lo corremos diez minuticos?", "Dale", "Cuadramos la hora", "Quedamos en eso", "No quiero armar problema", "Un minutico", "¿Me regalas un minuto?", "¿Será que…?", "Parce"]),
    shadowLine: "¿Será que lo corremos diez minuticos?",
  },
  {
    id: "p3",
    text:
      "Después apareció el problemita grande: el arreglo me salió con otro precio. Yo no quería sonar agresiva, entonces le escribí a Javi: '¿Me colaboras? Creo que hubo un errorcito y no quiero armar problema'. Él me dijo: 'Mirémoslo con calma, revisemos la vuelta'. Ahí me di cuenta de que se me embolató todo porque le mandé una nota de voz a Don Pedro, luego Laura cambió una parte y eso se embolató en el chat. Laura dijo: 'De pronto me expliqué mal. Déjeme le aclaro'.",
    translation:
      "Then the bigger little problem appeared: the repair came out with a different price. I didn't want to sound aggressive, so I wrote to Javi: 'Can you help me? I think there was a small mistake and I don't want to make a fuss.' He told me: 'Let's look at it calmly, let's check the situation.' That was when I realized everything got mixed up because I sent Don Pedro a voice note, then Laura changed one part, and that got messy in the chat. Laura said: 'Maybe I explained myself badly. Let me clarify it.'",
    highlights: highlights(["Tengo un problemita", "Me salió con otro precio", "¿Me colaboras?", "Creo que hubo un errorcito", "Errorcito", "No quiero armar problema", "Mirémoslo con calma", "Revisemos la vuelta", "Se me embolató", "Le mandé una nota de voz", "Eso se embolató", "De pronto me expliqué mal", "Déjeme le aclaro"]),
    shadowLine: "Mirémoslo con calma; revisemos la vuelta.",
  },
  {
    id: "p4",
    text:
      "Don Pedro respondió con muy buen tono: 'Qué pena, Camila. ¿Será que me colabora con esto y me manda el pantallazo?'. Yo contesté: 'Listo, te la mando de una'. Luego fui más directa: 'Fuera de charla, necesito una solución práctica. Si una parte está mal, me devuelves esta parte y yo pago el resto'. Él no se molestó. Dijo: 'Hagámosle, arreglémoslo bien'. Para mí esa fue la clave: no decir todo con rabia, sino cuadrarlo bien.",
    translation:
      "Don Pedro replied with a very good tone: 'Sorry, Camila. Could you help me with this and send me the screenshot?' I answered: 'Okay, I'll send it to you right away.' Then I was more direct: 'Jokes aside, I need a practical solution. If one part is wrong, you refund me this part and I'll pay the rest.' He didn't get upset. He said: 'Let's do it, let's fix it properly.' For me that was the key: not saying everything with anger, but sorting it out properly.",
    highlights: highlights(["Qué pena", "¿Será que me colabora con esto?", "Listo", "Te la mando de una", "Fuera de charla", "Necesito una solución práctica", "Me devuelves esta parte", "Yo pago el resto", "Hagámosle", "Arreglémoslo bien", "Cuadrarlo bien"]),
    shadowLine: "Necesito una solución práctica.",
  },
  {
    id: "p5",
    text:
      "El final tuvo un poquito de caos, pero nada parecido a la otra historia del aguacero. Don Pedro dijo que había un trancón ni el berraco y que ya casi llegaba. Yo le dije: 'Tranquilo, está cayendo un aguacero por acá y voy a llegar empapada igual'. Mario esperó con el paquete, Laura ayudó a revisar el recibo y Javi remató: 'Si algo no cuadra, buscamos otra solución'. Al final quedó bacano: paquete entregado, precio corregido, reunión movida y todos a la orden para lo que necesite el otro.",
    translation:
      "The ending had a little chaos, but nothing like the other rain story. Don Pedro said there was a crazy traffic jam and that he was almost there. I told him: 'Relax, it's pouring rain here and I'm going to arrive soaked anyway.' Mario waited with the package, Laura helped review the receipt, and Javi wrapped it up: 'If something doesn't fit, we'll find another solution.' In the end it turned out cool: package delivered, price corrected, meeting moved, and everyone at each other's service for anything they needed.",
    highlights: highlights(["Trancón", "Un trancón ni el berraco", "Ni el berraco", "Ya casi llego", "Tranquilo", "Está cayendo un aguacero", "Empapado", "Buscamos otra solución", "Bacano", "A la orden para lo que necesite", "Yo me acomodo"]),
    shadowLine: "Si algo no cuadra, buscamos otra solución.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "practical-reading-q1",
    type: "multiple-choice",
    prompt: "What practical problem starts the reading?",
    options: ["A wrong package delivery", "A cancelled flight", "A broken laptop", "A missed exam"],
    correctAnswer: "A wrong package delivery",
    explanation: "Mario says the package arrived at his place by mistake.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "practical-reading-q2",
    type: "typed",
    prompt: "Type the phrase meaning 'Let's check the situation'.",
    correctAnswer: "revisemos la vuelta",
    correctAnswers: ["revisemos la vuelta"],
    explanation: "Revisemos la vuelta is used when Javi suggests checking the situation calmly.",
    points: 1,
    skillTag: "vocabulary",
  },
  {
    id: "practical-reading-q3",
    type: "multiple-choice",
    prompt: "Why does Camila use phrases like no quiero armar problema and mirémoslo con calma?",
    options: ["To stay firm but cooperative", "To avoid solving anything", "To insult Don Pedro", "To cancel the package"],
    correctAnswer: "To stay firm but cooperative",
    explanation: "The reading shows how the phrases lower tension while still solving the issue.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "practical-reading-q4",
    type: "true-false",
    prompt: "Camila refuses to pay anything after the price error.",
    options: ["True", "False"],
    correctAnswer: "False",
    explanation: "She says me devuelves esta parte y yo pago el resto.",
    points: 1,
    skillTag: "detail",
  },
  {
    id: "practical-reading-q5",
    type: "order-words",
    prompt: "Order the words to make the practical closing phrase.",
    wordBank: ["Buscamos", "otra", "solución"],
    correctAnswer: "Buscamos otra solución",
    explanation: "This is the final practical fallback phrase.",
    points: 1,
    skillTag: "sentence-order",
  },
];

export const colombianSpanishB2PracticalReading: ReadingComprehension = {
  id: "colombian-spanish-b2-reading-package-price-mixup",
  title: "Colombian B2 Reading: El Paquete y el Precio",
  subtitle: "A long first-person practical story about solving a delivery and price mix-up without sounding aggressive.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "reading", "problem-solving", "dialect"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-package-price-mixup",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-b2-reading-package-price-mixup/full.mp3",
    audioAlignmentUrl: "/audio/readings/colombian-spanish-b2-reading-package-price-mixup/timings.json",
    paragraphs: readingParagraphs,
    glossary: practicalVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.example })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the second Colombian speaking lesson vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  practicalVocab.slice(0, 9),
  practicalVocab.slice(9, 18),
  practicalVocab.slice(18, 27),
  practicalVocab.slice(27, 36),
  practicalVocab.slice(36, 45),
  practicalVocab.slice(45, 54),
  practicalVocab.slice(54, 62),
  practicalVocab.slice(62),
];

export const colombianSpanishB2PracticalQuiz: CheckpointQuiz = {
  id: "colombian-spanish-b2-practical-problem-solving-quiz",
  title: "Colombian Spanish B2: Practical Problem-Solving Quiz",
  subtitle: "A quiz covering every phrase from the second Colombian speaking lesson.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "quiz", "problem-solving", "dialect"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - B2 Dialect Reinforcement",
  relatedCourse: "colombian-spanish-b2-package-price-mixup",
  activityType: "quiz",
  data: {
    description:
      "Practice soft requests, apologies, neighbour phrases, rescheduling, refunds, and practical Colombian problem-solving language.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "practical-quiz-context-1",
        type: "multiple-choice",
        prompt: "Which phrase best softens 'Can you help me with this?' in Colombian Spanish?",
        options: ["¿Será que me colabora con esto?", "No me mames gallo", "Me salió con otro precio", "Ya casi llego"],
        correctAnswer: "¿Será que me colabora con esto?",
        explanation: "¿Será que...? is a very useful softener for polite requests.",
        points: 1,
        skillTag: "context",
      },
      {
        id: "practical-quiz-context-2",
        type: "multiple-choice",
        prompt: "Which phrase fits a neighbour saying they will keep your package?",
        options: ["Se lo guardo acá", "Me devuelves esta parte", "Un trancón ni el berraco", "Cuadramos la hora"],
        correctAnswer: "Se lo guardo acá",
        explanation: "Se lo guardo acá means I'll keep it here for you.",
        points: 1,
        skillTag: "context",
      },
      {
        id: "practical-quiz-context-3",
        type: "typed",
        prompt: "Type the phrase meaning 'Maybe I explained myself badly'.",
        correctAnswer: "de pronto me expliqué mal",
        correctAnswers: ["de pronto me explique mal", "de pronto me expliqué mal"],
        explanation: "De pronto me expliqué mal softens the correction by accepting possible responsibility.",
        points: 1,
        skillTag: "vocabulary",
      },
      {
        id: "practical-quiz-context-4",
        type: "fill-blank",
        prompt: "Complete: No quiero ______ problema.",
        nativePrompt: "I don’t want to make a fuss / cause a problem.",
        correctAnswer: "armar",
        explanation: "No quiero armar problema means I don't want to make a fuss.",
        points: 1,
        skillTag: "chunk",
      },
      {
        id: "practical-quiz-context-5",
        type: "multiple-choice",
        prompt: "Which phrase is the firmest but still practical?",
        options: ["Necesito una solución práctica", "Qué más", "Quiubo", "Uy"],
        correctAnswer: "Necesito una solución práctica",
        explanation: "It clearly asks for a workable solution without insulting anyone.",
        points: 1,
        skillTag: "tone",
      },
      ...vocabChunks.map((items, index) => pairQuestion(`practical-pairs-${index + 1}`, `Match Colombian problem-solving vocab set ${index + 1}.`, items)),
    ],
  },
};
