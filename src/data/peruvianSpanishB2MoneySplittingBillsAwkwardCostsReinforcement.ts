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

const courseId = "peruvian-spanish-b2-money-splitting-bills-and-awkward-costs";
const skoolSectionName = "Peruvian Spanish - B2 Money, Splitting Bills, and Awkward Costs";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const moneyVocab: VocabItem[] = [
  { id: "hacer-una-chancha", term: "hacer una chancha", meaning: "to pool money / chip in together", matchingMeaning: "pool money", note: "Common Peruvian way to say everyone contributes money.", example: "Ya fue, hacemos una chancha para pagar la cuenta.", translation: "Fine, we’ll pool money to pay the bill.", starred: true },
  { id: "unas-lucas", term: "unas lucas", meaning: "a few soles / a few bucks", matchingMeaning: "a few soles", note: "Informal money phrase; lucas can mean soles or bucks depending on context.", example: "Me faltan unas lucas.", translation: "I’m a few soles short.", starred: true },
  { id: "estar-misio", term: "estar misio", meaning: "to be broke / short on money", matchingMeaning: "be broke", note: "Very informal; misio is masculine and misia is feminine.", example: "Carlos está misio esta semana.", translation: "Carlos is broke this week.", starred: true },
  { id: "que-roche", term: "qué roche", meaning: "how embarrassing / how awkward", matchingMeaning: "how awkward", note: "Useful when money talk feels socially uncomfortable.", example: "Qué roche pedirle plata delante de todos.", translation: "How awkward to ask him for money in front of everyone.", starred: true },
  { id: "te-yapeo", term: "te yapeo", meaning: "I’ll send you the money by Yape", matchingMeaning: "I’ll Yape you", note: "Yape is a common Peruvian mobile payment app.", example: "Te yapeo en la noche.", translation: "I’ll send you the money by Yape tonight.", starred: true },
  { id: "al-toque", term: "al toque", meaning: "right away / immediately", matchingMeaning: "right away", note: "Very common Peruvian timing phrase.", example: "Te lo devuelvo al toque.", translation: "I’ll pay you back right away.", starred: true },
  { id: "no-te-hagas-paltas", term: "no te hagas paltas", meaning: "don’t stress / don’t overthink it / don’t get worked up", matchingMeaning: "don’t stress", note: "Great for lowering the pressure when someone feels awkward.", example: "No te hagas paltas por la cuenta.", translation: "Don’t stress about the bill.", starred: true },
  { id: "mitad-y-mitad-pe", term: "mitad y mitad, pe", meaning: "half and half, then / let’s just split it half and half", matchingMeaning: "half and half", note: "Pe adds Peruvian conversational flavor from pues.", example: "Mitad y mitad, pe, así nadie se complica.", translation: "Half and half, then, so nobody gets complicated.", starred: true },
  { id: "cada-uno-pone-lo-suyo-nomas", term: "cada uno pone lo suyo, nomás", meaning: "everyone just puts in their share", matchingMeaning: "everyone pays their share", note: "A relaxed way to make splitting costs fair.", example: "Cada uno pone lo suyo, nomás.", translation: "Everyone just puts in their share.", starred: true },
  { id: "me-faltan-unas-lucas", term: "me faltan unas lucas", meaning: "I’m a few soles short", matchingMeaning: "I’m a few soles short", note: "Useful when you almost have enough but not quite.", example: "Pucha, me faltan unas lucas para la cuenta.", translation: "Damn, I’m a few soles short for the bill.", starred: true },
  { id: "estar-aguja", term: "estar aguja", meaning: "to be broke / really short on cash", matchingMeaning: "be really short on cash", note: "Informal and vivid; stronger than just being short a little.", example: "Estoy aguja hasta fin de mes.", translation: "I’m really short on cash until the end of the month.", starred: true },
  { id: "pasame-tu-yape", term: "pásame tu Yape", meaning: "send me your Yape details / give me your Yape number", matchingMeaning: "send me your Yape details", note: "Very practical phrase for paying friends back in Peru.", example: "Pásame tu Yape y te pago.", translation: "Send me your Yape details and I’ll pay you.", starred: true },
  { id: "te-lo-devuelvo-al-toque", term: "te lo devuelvo al toque", meaning: "I’ll pay you back right away", matchingMeaning: "I’ll pay you back right away", note: "Reassures someone when they cover you.", example: "Cúbreme esta y te lo devuelvo al toque.", translation: "Cover me this one and I’ll pay you back right away.", starred: true },
  { id: "quedamos-a-mano", term: "quedamos a mano", meaning: "we’re even / we’re square", matchingMeaning: "we’re even", note: "Use once debts or favors are balanced.", example: "Con este Yape quedamos a mano.", translation: "With this Yape we’re even.", starred: true },
  { id: "ya-pe", term: "ya pe", meaning: "alright then / come on then / okay, fine", matchingMeaning: "alright then", note: "Very Peruvian particle; tone decides if it sounds friendly, resigned, or insistent.", example: "Ya pe, lo pagamos juntos.", translation: "Alright then, we’ll pay it together.", starred: true },
  { id: "normal-nomas", term: "normal nomás", meaning: "it’s fine / no big deal / all good", matchingMeaning: "it’s fine", note: "Makes the situation feel relaxed and less awkward.", example: "Si pagas mañana, normal nomás.", translation: "If you pay tomorrow, it’s fine.", starred: true },
  { id: "hazme-una-gauchada", term: "hazme una gauchada", meaning: "do me a favor / help me out", matchingMeaning: "do me a favor", note: "Borrowed regional-sounding phrase used conversationally for a favor.", example: "Hazme una gauchada y revisa la cuenta.", translation: "Do me a favor and check the bill.", starred: true },
  { id: "yo-cubro-esta", term: "yo cubro esta", meaning: "I’ll cover this one", matchingMeaning: "I’ll cover this one", note: "Useful when one person pays for the current bill or round.", example: "Yo cubro esta y tú me yapeas luego.", translation: "I’ll cover this one and you Yape me later.", starred: true },
  { id: "tu-cubres-la-otra-pe", term: "tú cubres la otra, pe", meaning: "you cover the other one, then", matchingMeaning: "you cover the other one", note: "A casual way to balance turns paying.", example: "Yo cubro esta; tú cubres la otra, pe.", translation: "I’ll cover this one; you cover the other one, then.", starred: true },
  { id: "pucha", term: "pucha", meaning: "damn / shoot / man / wow", matchingMeaning: "damn", note: "Mild Peruvian reaction for surprise, frustration, or awkwardness.", example: "Pucha, salió carísimo.", translation: "Damn, it came out really expensive.", starred: true },
  { id: "se-nos-fue-la-mano", term: "se nos fue la mano", meaning: "we went overboard / we overdid it", matchingMeaning: "we went overboard", note: "Use when spending or ordering more than planned.", example: "Con los postres se nos fue la mano.", translation: "We went overboard with the desserts.", starred: true },
  { id: "ya-fue", term: "ya fue", meaning: "fine, it’s settled / forget it / let’s just do it", matchingMeaning: "fine, it’s settled", note: "Can close a discussion and move to action.", example: "Ya fue, yo pago ahora.", translation: "Fine, it’s settled, I’ll pay now.", starred: true },
  { id: "ya-fue-hacemos-chancha", term: "ya fue, hacemos chancha", meaning: "alright, let’s just pool the money", matchingMeaning: "let’s pool the money", note: "A practical phrase when the group needs to solve the bill quickly.", example: "Ya fue, hacemos chancha y nadie queda mal.", translation: "Alright, let’s pool the money and nobody looks bad.", starred: true },
];

const highlightMap = Object.fromEntries(moneyVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = moneyVocab.map((item) => `${item.term} = ${item.meaning}`);

export const peruvianSpanishB2MoneySplittingBillsAwkwardCostsFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Peruvian Spanish B2: Money, Splitting Bills & Awkward Costs Flashcards",
  subtitle: "Peruvian money phrases for pooling cash, Yape payments, awkward bills, being broke, and keeping things fair.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "flashcards", "money", "bills"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: moneyVocab.map(cardFromVocab) },
};

export const peruvianSpanishB2MoneySplittingBillsAwkwardCostsSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Peruvian Money & Splitting Bills",
  subtitle: "Build natural Peruvian Spanish for awkward bills, Yape payments, paying someone back, and pooling money.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["peruvian-spanish", "b2", "sentence-builder", "money", "splitting bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Peruvian Spanish voice note explaining an awkward group bill, offering to cover someone, and agreeing how everyone will pay back.",
    stages: [
      stage("stage-1", "The bill got big", sentenceVocab.slice(19, 21), sentenceVocab.slice(19, 21), "Damn, we went overboard with the bill.", "Pucha, se nos fue la mano con la cuenta.", "Use pucha for a mild reaction and se nos fue la mano when the group spent too much.", breakdown([["Damn", "Pucha"], ["we went overboard", "se nos fue la mano"], ["with the bill", "con la cuenta"]])),
      stage("stage-2", "Pool money", sentenceVocab.slice(0, 2), sentenceVocab.slice(0, 2).concat(sentenceVocab.slice(21, 23)), "Alright, let’s just pool the money; everyone puts in a few soles.", "Ya fue, hacemos chancha; cada uno pone unas lucas.", "Hacer una chancha means the group chips in together.", breakdown([["Alright, let’s just", "Ya fue"], ["pool the money", "hacemos chancha"], ["a few soles", "unas lucas"]])),
      stage("stage-3", "Someone is short", sentenceVocab.slice(2, 4).concat(sentenceVocab.slice(9, 11)), sentenceVocab.slice(0, 11), "How awkward, I’m broke and I’m a few soles short.", "Qué roche, estoy misio y me faltan unas lucas.", "This is honest but informal; use it with friends, not formal situations.", breakdown([["How awkward", "Qué roche"], ["I’m broke", "estoy misio"], ["I’m a few soles short", "me faltan unas lucas"]])),
      stage("stage-4", "Use Yape", sentenceVocab.slice(4, 6).concat(sentenceVocab.slice(11, 13)), sentenceVocab.slice(0, 13), "Send me your Yape and I’ll pay you back right away.", "Pásame tu Yape y te lo devuelvo al toque.", "This is a practical repayment phrase for Peru.", breakdown([["Send me your Yape", "Pásame tu Yape"], ["I’ll pay it back to you", "te lo devuelvo"], ["right away", "al toque"]])),
      stage("stage-5", "Lower the awkwardness", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 16), "Don’t stress; half and half, then, or everyone pays their share.", "No te hagas paltas; mitad y mitad, pe, o cada uno pone lo suyo, nomás.", "Use these phrases to make an awkward bill feel fair and low-pressure.", breakdown([["Don’t stress", "No te hagas paltas"], ["half and half, then", "mitad y mitad, pe"], ["everyone pays their share", "cada uno pone lo suyo, nomás"]])),
      stage("stage-6", "Cover and balance it", sentenceVocab.slice(13, 19), sentenceVocab.slice(0, 19), "I’ll cover this one; you cover the other one, then, and we’re even.", "Yo cubro esta; tú cubres la otra, pe, y quedamos a mano.", "Quedamos a mano means the debt or favor is balanced.", breakdown([["I’ll cover this one", "Yo cubro esta"], ["you cover the other one, then", "tú cubres la otra, pe"], ["we’re even", "quedamos a mano"]])),
      stage("stage-7", "Ask for help", sentenceVocab.slice(16, 18).concat(sentenceVocab.slice(15, 16)), sentenceVocab, "Do me a favor and cover this one. It’s fine, no big deal.", "Hazme una gauchada y cubre esta. Normal nomás.", "This combines a favor request with a relaxed tone.", breakdown([["Do me a favor", "Hazme una gauchada"], ["cover this one", "cubre esta"], ["It’s fine", "Normal nomás"]])),
      stage("stage-8", "Final agreement", sentenceVocab.slice(20, 23), sentenceVocab, "We went overboard, but fine, it’s settled: let’s pool the money.", "Se nos fue la mano, pero ya fue: hacemos chancha.", "This closes the money discussion and moves everyone toward a solution.", breakdown([["We went overboard", "Se nos fue la mano"], ["fine, it’s settled", "ya fue"], ["let’s pool the money", "hacemos chancha"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "peruvian-b2-money-story-q1", type: "multiple-choice", prompt: "After message 3, why does the bill feel awkward?", options: ["Lucía is broke and a few soles short", "Diego lost his phone", "Sofía canceled the dinner", "The restaurant is closed"], correctAnswer: "Lucía is broke and a few soles short", explanation: "Sofía says Lucía está misia and me faltan unas lucas.", points: 1, skillTag: "detail" },
  { id: "peruvian-b2-money-story-q2", type: "multiple-choice", prompt: "After message 6, what does Diego offer?", options: ["He covers this bill and Sofía covers the other one", "He refuses to pay anything", "He orders more food", "He leaves the group chat"], correctAnswer: "He covers this bill and Sofía covers the other one", explanation: "Diego says yo cubro esta y tú cubres la otra, pe.", points: 1, skillTag: "solution" },
  { id: "peruvian-b2-money-story-q3", type: "true-false", prompt: "After message 9, true or false: Sofía asks Diego for his Yape details.", options: ["True", "False"], correctAnswer: "True", explanation: "Sofía says pásame tu Yape.", points: 1, skillTag: "payment" },
  { id: "peruvian-b2-money-story-q4", type: "multiple-choice", prompt: "After message 12, what new problem appears?", options: ["Marcos is also short on cash", "Lucía found extra money", "The waiter paid the bill", "They forgot where they parked"], correctAnswer: "Marcos is also short on cash", explanation: "Diego says Marcos está aguja.", points: 1, skillTag: "detail" },
  { id: "peruvian-b2-money-story-q5", type: "multiple-choice", prompt: "After message 15, what favor does Diego ask Sofía to do?", options: ["Check whether the waiter charged two desserts", "Call a taxi", "Invite more people", "Buy another dessert"], correctAnswer: "Check whether the waiter charged two desserts", explanation: "Diego says hazme una gauchada and asks her to review the bill.", points: 1, skillTag: "favor" },
  { id: "peruvian-b2-money-story-q6", type: "multiple-choice", prompt: "After message 18, what will Diego do if Sofía pays with her card?", options: ["Pay her back right away", "Ask for another bill", "Order more food", "Cancel Yape"], correctAnswer: "Pay her back right away", explanation: "Diego says te lo devuelvo al toque.", points: 1, skillTag: "repayment" },
  { id: "peruvian-b2-money-story-q7", type: "true-false", prompt: "After message 21, true or false: Sofía feels awkward charging everyone at the table.", options: ["True", "False"], correctAnswer: "True", explanation: "She says qué roche cobrarle a todos delante de la mesa.", points: 1, skillTag: "social-tone" },
  { id: "peruvian-b2-money-story-q8", type: "multiple-choice", prompt: "After message 24, what should people do if they are short a few soles?", options: ["Tell Sofía privately", "Stay silent forever", "Leave the restaurant", "Pay for everyone"], correctAnswer: "Tell Sofía privately", explanation: "Diego suggests adding that they can message privately if they are short.", points: 1, skillTag: "solution" },
  { id: "peruvian-b2-money-story-q9", type: "multiple-choice", prompt: "After message 27, when can Marcos pay?", options: ["On Friday", "Immediately", "Next year", "Never"], correctAnswer: "On Friday", explanation: "Sofía says Marcos has nothing until Friday.", points: 1, skillTag: "detail" },
  { id: "peruvian-b2-money-story-q10", type: "multiple-choice", prompt: "By message 30, what do they decide for next time?", options: ["Order less so the bill does not get out of hand", "Never use Yape again", "Stop being friends", "Always make Lucía pay"], correctAnswer: "Order less so the bill does not get out of hand", explanation: "Diego says next time they should order less because se nos fue la mano.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const peruvianSpanishB2MoneySplittingBillsAwkwardCostsWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Peruvian B2 Story: The Expensive Dinner",
  subtitle: "Sofía and Diego handle an awkward group bill with Yape, favors, and a little social tact.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "WhatsApp", "money", "bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sofia", name: "Sofía", initials: "SO", side: "right", color: "violet" },
      { id: "diego", name: "Diego", initials: "DI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "sofia", "Diego, pucha, se nos fue la mano con la cena.", "Diego, damn, we went overboard with dinner.", ["pucha", "se nos fue la mano"]),
      message("m2", "diego", "Sí, la cuenta está brava. ¿Hacemos una chancha?", "Yeah, the bill is rough. Should we pool money?", ["hacer una chancha"]),
      message("m3", "sofia", "Dale, pero Lucía me escribió: está misia y le faltan unas lucas.", "Okay, but Lucía texted me: she’s broke and a few soles short.", ["estar misio", "me faltan unas lucas", "unas lucas"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "diego", "Qué roche, pero no te hagas paltas.", "How awkward, but don’t stress.", ["qué roche", "no te hagas paltas"]),
      message("m5", "sofia", "Ella dice: te yapeo al toque si alguien me cubre.", "She says: I’ll Yape you right away if someone covers me.", ["te yapeo", "al toque"]),
      message("m6", "diego", "Normal nomás. Yo cubro esta y tú cubres la otra, pe.", "It’s fine. I’ll cover this one and you cover the other one, then.", ["normal nomás", "yo cubro esta", "tú cubres la otra, pe"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "sofia", "Ya pe, pero mitad y mitad, pe, para que sea justo.", "Alright then, but half and half, then, so it’s fair.", ["ya pe", "mitad y mitad, pe"]),
      message("m8", "diego", "Cada uno pone lo suyo, nomás; lo demás lo arreglamos por Yape.", "Everyone just puts in their share; we sort the rest out by Yape.", ["cada uno pone lo suyo, nomás"]),
      message("m9", "sofia", "Perfecto. Pásame tu Yape y te mando lo mío.", "Perfect. Send me your Yape and I’ll send you my part.", ["pásame tu Yape"]),
      message("m10", "diego", "Espera, también Marcos está aguja.", "Wait, Marcos is also really short on cash.", ["estar aguja"]),
      message("m11", "sofia", "¿Otro? Pucha, entonces hacemos una chancha más grande.", "Another one? Damn, then we’ll make a bigger money pool.", ["pucha", "hacer una chancha"]),
      message("m12", "diego", "Ya fue, hacemos chancha, pero sin que nadie se sienta mal.", "Alright, let’s just pool the money, but without making anyone feel bad.", ["ya fue, hacemos chancha"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "sofia", "Te soy sincera: me faltan unas lucas a mí también.", "Honestly: I’m a few soles short too.", ["me faltan unas lucas"]),
      message("m14", "diego", "Hazme una gauchada: revisa si el mozo cobró dos postres.", "Do me a favor: check whether the waiter charged two desserts.", ["hazme una gauchada"]),
      message("m15", "sofia", "Buena voz. Sí, hay un postre extra en la cuenta.", "Good call. Yes, there’s an extra dessert on the bill.", []),
      message("m16", "diego", "Si corrigen eso, quedamos a mano más fácil.", "If they correct that, we’ll be even more easily.", ["quedamos a mano"]),
      message("m17", "sofia", "El mozo dice que sí, fue error.", "The waiter says yes, it was a mistake.", []),
      message("m18", "diego", "Bacán. Te lo devuelvo al toque si pagas con tarjeta.", "Cool. I’ll pay you back right away if you pay by card.", ["te lo devuelvo al toque"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "sofia", "Ya pagué. Diego, pásame tu Yape para coordinar con todos.", "I already paid. Diego, send me your Yape to coordinate with everyone.", ["pásame tu Yape"]),
      message("m20", "diego", "Te mando el QR. No te hagas paltas, normal nomás.", "I’ll send you the QR. Don’t stress, it’s all good.", ["no te hagas paltas", "normal nomás"]),
      message("m21", "sofia", "Igual, qué roche cobrarle a todos delante de la mesa.", "Still, how awkward to charge everyone in front of the table.", ["qué roche"], "voice-note", `${storyAudioBase}/m21.mp3`),
      message("m22", "diego", "Por eso mejor escribimos al grupo suave.", "That’s why it’s better to write softly in the group chat.", []),
      message("m23", "sofia", "Pongo: gente, cada uno pone lo suyo, nomás.", "I’ll write: people, everyone just puts in their share.", ["cada uno pone lo suyo, nomás"]),
      message("m24", "diego", "Y agrega: si a alguien le faltan unas lucas, nos avisa por privado.", "And add: if anyone is a few soles short, they can tell us privately.", ["unas lucas"]),
      message("m25", "sofia", "Lucía respondió: gracias, te yapeo mañana temprano.", "Lucía answered: thanks, I’ll Yape you tomorrow morning.", ["te yapeo"]),
      message("m26", "diego", "Ya pe. Tú cubres la otra, pe, y yo arreglo con Marcos.", "Alright then. You cover the other one, then, and I’ll sort it out with Marcos.", ["ya pe", "tú cubres la otra, pe"]),
      message("m27", "sofia", "Pero Marcos dice que no tiene nada hasta el viernes.", "But Marcos says he has nothing until Friday.", []),
      message("m28", "diego", "Normal nomás. Yo cubro esta. Él me lo devuelve después.", "It’s fine. I’ll cover this one. He’ll pay me back later.", ["normal nomás", "yo cubro esta"]),
      message("m29", "sofia", "Entonces quedamos a mano cuando todos hagan su Yape.", "Then we’re even when everyone makes their Yape payment.", ["quedamos a mano"]),
      message("m30", "diego", "Exacto. La próxima pedimos menos, porque hoy sí se nos fue la mano.", "Exactly. Next time we order less, because today we really went overboard.", ["se nos fue la mano"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `peruvian-b2-money-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: moneyVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: moneyVocab.map((item) => item.term),
      grammarPatterns: [
        "Cost splitting: hacer una chancha, mitad y mitad, cada uno pone lo suyo.",
        "Repayment with Yape: pásame tu Yape, te yapeo, te lo devuelvo al toque.",
        "Awkward money tone: qué roche, no te hagas paltas, normal nomás.",
      ],
      speakingPrompts: [
        "Explain that the dinner got too expensive.",
        "Ask a friend for their Yape and promise to pay back.",
        "Suggest a fair way to split a bill without making it awkward.",
      ],
    },
    completionTask: {
      title: "Your Peruvian B2 awkward bill voice note",
      instructions: "Record a 60-second Peruvian Spanish voice note about a group bill. Say what went wrong, who is short on money, and how the group will settle it.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Hablar de plata con amigos puede ser más difícil que pagar la cuenta. Si la cena salió más cara de lo esperado, puedes decir “pucha, se nos fue la mano”. La frase suena natural porque reconoce el problema sin echarle la culpa a una sola persona.", translation: "Talking about money with friends can be harder than paying the bill. If dinner came out more expensive than expected, you can say pucha, se nos fue la mano. The phrase sounds natural because it recognizes the problem without blaming one person.", highlights: highlights(["pucha", "se nos fue la mano"]), shadowLine: "Pucha, se nos fue la mano." },
  { id: "p2", text: "Cuando varias personas tienen que aportar, en Perú se puede decir “hacemos una chancha”. También funciona “ya fue, hacemos chancha” cuando el grupo ya habló demasiado y necesita una solución rápida. No es elegante, pero sí es práctico y muy conversacional.", translation: "When several people need to contribute, in Peru you can say hacemos una chancha. Ya fue, hacemos chancha also works when the group has talked too much and needs a quick solution. It is not elegant, but it is practical and very conversational.", highlights: highlights(["hacer una chancha", "ya fue, hacemos chancha", "ya fue"]), shadowLine: "Ya fue, hacemos chancha." },
  { id: "p3", text: "Si alguien no tiene suficiente dinero, puede decir “me faltan unas lucas”. Si la situación es más seria, “estoy misio” o “estoy aguja” comunican que la persona está corta de plata. Son frases informales, así que funcionan mejor entre patas o gente de confianza.", translation: "If someone does not have enough money, they can say me faltan unas lucas. If the situation is more serious, estoy misio or estoy aguja communicate that the person is short on cash. They are informal phrases, so they work best among friends or trusted people.", highlights: highlights(["me faltan unas lucas", "unas lucas", "estar misio", "estar aguja"]), shadowLine: "Me faltan unas lucas; estoy aguja." },
  { id: "p4", text: "El momento social puede sentirse incómodo. Por eso “qué roche” es una reacción muy útil: muestra vergüenza o incomodidad sin hacer un drama. Para tranquilizar a la otra persona, puedes decir “no te hagas paltas” o “normal nomás”. Ambas frases bajan la tensión.", translation: "The social moment can feel awkward. That is why qué roche is a very useful reaction: it shows embarrassment or discomfort without creating drama. To calm the other person, you can say no te hagas paltas or normal nomás. Both phrases lower the tension.", highlights: highlights(["qué roche", "no te hagas paltas", "normal nomás"]), shadowLine: "Qué roche, pero no te hagas paltas." },
  { id: "p5", text: "Para pagar entre amigos, Yape aparece muchísimo. “Pásame tu Yape” pide los datos para transferir. “Te yapeo” promete mandar el dinero por la aplicación. Y “te lo devuelvo al toque” añade confianza, porque la persona entiende que no tendrá que perseguirte.", translation: "To pay among friends, Yape appears a lot. Pásame tu Yape asks for the details to transfer. Te yapeo promises to send the money through the app. And te lo devuelvo al toque adds trust, because the person understands they will not have to chase you.", highlights: highlights(["pásame tu Yape", "te yapeo", "te lo devuelvo al toque", "al toque"]), shadowLine: "Pásame tu Yape y te lo devuelvo al toque." },
  { id: "p6", text: "Si el grupo quiere dividir de forma simple, puede decir “mitad y mitad, pe”. Si quiere ser más exacto, “cada uno pone lo suyo, nomás” deja claro que cada persona paga su parte. Estas frases ayudan cuando nadie quiere quedar como el complicado.", translation: "If the group wants to split simply, it can say mitad y mitad, pe. If it wants to be more exact, cada uno pone lo suyo, nomás makes clear that each person pays their share. These phrases help when nobody wants to look like the difficult one.", highlights: highlights(["mitad y mitad, pe", "cada uno pone lo suyo, nomás"]), shadowLine: "Mitad y mitad, pe; cada uno pone lo suyo, nomás." },
  { id: "p7", text: "También puedes ofrecerte a cubrir algo: “yo cubro esta”. Para equilibrar después, dices “tú cubres la otra, pe” o “quedamos a mano”. Así la ayuda no se siente como deuda eterna, sino como un acuerdo claro entre amigos.", translation: "You can also offer to cover something: yo cubro esta. To balance things later, you say tú cubres la otra, pe or quedamos a mano. That way the help does not feel like eternal debt, but like a clear agreement among friends.", highlights: highlights(["yo cubro esta", "tú cubres la otra, pe", "quedamos a mano"]), shadowLine: "Yo cubro esta y tú cubres la otra, pe." },
  { id: "p8", text: "Finalmente, si necesitas pedir ayuda, “hazme una gauchada” suaviza el pedido. No borra la incomodidad, pero hace que la frase suene humana. En conversaciones de dinero, el objetivo no es solo pagar: también es cuidar la relación.", translation: "Finally, if you need to ask for help, hazme una gauchada softens the request. It does not erase the awkwardness, but it makes the phrase sound human. In money conversations, the goal is not only to pay: it is also to protect the relationship.", highlights: highlights(["hazme una gauchada"]), shadowLine: "Hazme una gauchada y lo arreglamos." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "peruvian-b2-money-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Handling awkward money and bill-splitting conversations in Peruvian Spanish", "Ordering transport in Lima", "Flirting at a party", "Telling a ghost story"], correctAnswer: "Handling awkward money and bill-splitting conversations in Peruvian Spanish", explanation: "The reading explains money, Yape, bill splitting, and awkward cost phrases.", points: 1, skillTag: "gist" },
  { id: "peruvian-b2-money-reading-q2", type: "multiple-choice", prompt: "Which phrase means the group should pool money?", options: ["Hacer una chancha", "Qué roche", "Pásame tu Yape", "Normal nomás"], correctAnswer: "Hacer una chancha", explanation: "Hacer una chancha means to chip in together or pool money.", points: 1, skillTag: "money" },
  { id: "peruvian-b2-money-reading-q3", type: "true-false", prompt: "True or false: “no te hagas paltas” helps reduce pressure or stress.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says it calms the other person and lowers tension.", points: 1, skillTag: "tone" },
  { id: "peruvian-b2-money-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Send me your Yape and I’ll pay you back right away.", wordBank: ["Pásame", "tu", "Yape", "y", "te", "lo", "devuelvo", "al", "toque."], correctAnswer: "Pásame tu Yape y te lo devuelvo al toque.", explanation: "This combines the payment request with a promise to repay quickly.", points: 1, skillTag: "phrase-building" },
  { id: "peruvian-b2-money-reading-q5", type: "multiple-choice", prompt: "Which phrase means “we’re even”?", options: ["Quedamos a mano", "Estoy aguja", "Se nos fue la mano", "Unas lucas"], correctAnswer: "Quedamos a mano", explanation: "Quedamos a mano means the payment or favor is balanced.", points: 1, skillTag: "meaning" },
];

export const peruvianSpanishB2MoneySplittingBillsAwkwardCostsReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Peruvian B2 Reading: La Cuenta Incómoda",
  subtitle: "A synced Spanish reading about Yape, chanchas, awkward bills, and keeping money talk friendly.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "reading", "money", "bills"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: moneyVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Peruvian B2 money and bill-splitting vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const peruvianSpanishB2MoneySplittingBillsAwkwardCostsQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Peruvian Spanish B2: Money, Splitting Bills & Awkward Costs Quiz",
  subtitle: "Choose the right Peruvian phrase for Yape payments, being broke, awkward bills, and fair splitting.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Peruvian Spanish", "B2", "quiz", "money", "bills"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Peruvian Spanish phrases for splitting bills, paying people back, talking about being broke, and reducing awkwardness.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "peruvian-b2-money-quiz-1", type: "multiple-choice", prompt: "The group needs everyone to chip in for the bill. What fits?", options: ["Hacer una chancha", "Qué roche", "Estoy aguja", "Te yapeo"], correctAnswer: "Hacer una chancha", explanation: "Hacer una chancha means to pool money together.", points: 1, skillTag: "pooling" },
      { id: "peruvian-b2-money-quiz-2", type: "fill-blank", prompt: "Complete: Me faltan unas ____.", nativePrompt: "I’m a few soles short.", correctAnswer: "lucas", explanation: "Unas lucas means a few soles or a few bucks.", points: 1, skillTag: "money" },
      { id: "peruvian-b2-money-quiz-3", type: "multiple-choice", prompt: "Someone feels embarrassed about asking for money. Which reaction fits?", options: ["Qué roche", "Ya fue", "Al toque", "Pásame tu Yape"], correctAnswer: "Qué roche", explanation: "Qué roche means how embarrassing or how awkward.", points: 1, skillTag: "awkwardness" },
      { id: "peruvian-b2-money-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I’ll pay you back right away.", wordBank: ["Te", "lo", "devuelvo", "al", "toque."], correctAnswer: "Te lo devuelvo al toque.", explanation: "This reassures someone who covers you.", points: 1, skillTag: "repayment" },
      { id: "peruvian-b2-money-quiz-5", type: "true-false", prompt: "True or false: “estar aguja” means to be really short on cash.", options: ["True", "False"], correctAnswer: "True", explanation: "Estar aguja is informal and means being broke or very short on cash.", points: 1, skillTag: "meaning" },
      { id: "peruvian-b2-money-quiz-6", type: "multiple-choice", prompt: "You want the group to pay fairly. What sounds natural?", options: ["Cada uno pone lo suyo, nomás", "No te hagas paltas", "Pucha", "Hazme una gauchada"], correctAnswer: "Cada uno pone lo suyo, nomás", explanation: "This means everyone pays their own share.", points: 1, skillTag: "fairness" },
      { id: "peruvian-b2-money-quiz-7", type: "fill-blank", prompt: "Complete: Pásame tu ____.", nativePrompt: "Send me your Yape details.", correctAnswer: "Yape", explanation: "Pásame tu Yape asks for the payment details.", points: 1, skillTag: "payment" },
      { id: "peruvian-b2-money-quiz-8", type: "multiple-choice", prompt: "A friend is stressed about owing you money. What helps reduce pressure?", options: ["No te hagas paltas", "Se nos fue la mano", "Estoy misio", "Tú cubres la otra, pe"], correctAnswer: "No te hagas paltas", explanation: "No te hagas paltas means don’t stress or don’t overthink it.", points: 1, skillTag: "tone" },
      { id: "peruvian-b2-money-quiz-9", type: "true-false", prompt: "True or false: “quedamos a mano” means the debt or favor is balanced.", options: ["True", "False"], correctAnswer: "True", explanation: "Quedamos a mano means we’re even or square.", points: 1, skillTag: "balance" },
      { id: "peruvian-b2-money-quiz-10", type: "multiple-choice", prompt: "The group ordered too much and spent more than planned. Which phrase fits?", options: ["Se nos fue la mano", "Te yapeo", "Unas lucas", "Normal nomás"], correctAnswer: "Se nos fue la mano", explanation: "Se nos fue la mano means we went overboard.", points: 1, skillTag: "overspending" },
      pairQuestion("peruvian-b2-money-pairs-1", "Match pooling and being-broke phrases.", moneyVocab.slice(0, 8)),
      pairQuestion("peruvian-b2-money-pairs-2", "Match payment and fairness phrases.", moneyVocab.slice(8, 16)),
      pairQuestion("peruvian-b2-money-pairs-3", "Match covering, reactions, and final-decision phrases.", moneyVocab.slice(16)),
    ],
  },
};
