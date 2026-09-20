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

const courseId = "mexican-spanish-b1-street-food-late-night-snacks";
const skoolSectionName = "Mexican Spanish - B1 Street Food and Late-Night Snacks";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const foodVocab: VocabItem[] = [
  { id: "me-da", term: "¿me da…?", meaning: "could I have…?", matchingMeaning: "could I have…?", note: "Polite and very useful when ordering food in Mexico.", example: "¿Me da dos tacos, por favor?", translation: "Could I have two tacos, please?", starred: true },
  { id: "me-pone", term: "¿me pone…?", meaning: "could you make/give me…?", matchingMeaning: "could you make me…?", note: "Common Mexican ordering phrase, especially at food stands.", example: "¿Me pone una quesadilla?", translation: "Could you make me a quesadilla?", starred: true },
  { id: "dos-de-pastor", term: "dos de pastor", meaning: "two al pastor tacos", matchingMeaning: "two al pastor tacos", note: "Short natural way to order two tacos al pastor.", example: "Me da dos de pastor.", translation: "Could I have two al pastor tacos?", starred: true },
  { id: "con-todo", term: "con todo", meaning: "with everything", matchingMeaning: "with everything", note: "Usually means onion, cilantro, salsa, and normal toppings.", example: "Los tacos van con todo.", translation: "The tacos come with everything.", starred: true },
  { id: "sin-cebolla", term: "sin cebolla", meaning: "without onion", matchingMeaning: "without onion", note: "Important customization phrase for tacos and street food.", example: "El mío sin cebolla, por favor.", translation: "Mine without onion, please.", starred: true },
  { id: "con-todo-menos-cilantro", term: "con todo menos cilantro", meaning: "with everything except cilantro", matchingMeaning: "with everything except cilantro", note: "Useful when you want most toppings but one thing removed.", example: "Lo quiero con todo menos cilantro.", translation: "I want it with everything except cilantro.", starred: true },
  { id: "salsa-aparte", term: "la salsa aparte", meaning: "salsa on the side", matchingMeaning: "salsa on the side", note: "Use when you want to control the spice yourself.", example: "Me pone la salsa aparte.", translation: "Could you put the salsa on the side?", starred: true },
  { id: "pica-mucho", term: "¿pica mucho?", meaning: "is it very spicy?", matchingMeaning: "is it very spicy?", note: "Essential Mexican food phrase before trying salsa.", example: "¿La roja pica mucho?", translation: "Is the red one very spicy?", starred: true },
  { id: "cual-pica-menos", term: "¿cuál pica menos?", meaning: "which one is less spicy?", matchingMeaning: "which one is less spicy?", note: "Very practical question when there are several salsas.", example: "¿Cuál pica menos, la verde o la roja?", translation: "Which one is less spicy, the green or the red?", starred: true },
  { id: "para-aqui", term: "para aquí", meaning: "for here", matchingMeaning: "for here", note: "Use when eating at the stand or restaurant.", example: "Es para aquí.", translation: "It’s for here.", starred: true },
  { id: "para-llevar", term: "para llevar", meaning: "to go / takeaway", matchingMeaning: "to go", note: "Use when you want the food packed to take away.", example: "Dos tortas para llevar.", translation: "Two sandwiches to go.", starred: true },
  { id: "cuanto-es", term: "¿cuánto es?", meaning: "how much is it?", matchingMeaning: "how much is it?", note: "Simple payment question after ordering.", example: "¿Cuánto es por todo?", translation: "How much is it for everything?", starred: true },
  { id: "a-como-estan", term: "¿a cómo están?", meaning: "how much are they?", matchingMeaning: "how much are they?", note: "Mexican price question for items being sold.", example: "¿A cómo están los tacos?", translation: "How much are the tacos?", starred: true },
  { id: "cuanto-te-debo", term: "¿cuánto te debo?", meaning: "how much do I owe you?", matchingMeaning: "how much do I owe you?", note: "Natural phrase when paying a person directly.", example: "Listo, ¿cuánto te debo?", translation: "Alright, how much do I owe you?", starred: true },
  { id: "se-me-antojaron", term: "se me antojaron unos tacos", meaning: "I suddenly felt like having tacos", matchingMeaning: "I suddenly felt like tacos", note: "Mexican way to say a craving suddenly appeared.", example: "Se me antojaron unos tacos saliendo del cine.", translation: "I suddenly felt like tacos after leaving the movie theater.", starred: true },
  { id: "traigo-antojo-de", term: "traigo antojo de…", meaning: "I’m craving…", matchingMeaning: "I’m craving…", note: "Casual phrase for saying what food you want.", example: "Traigo antojo de elote.", translation: "I’m craving corn.", starred: true },
  { id: "echame-otro", term: "échame otro", meaning: "give me another one", matchingMeaning: "give me another one", note: "Very casual, friendly phrase at a food stand.", example: "Está buenísimo, échame otro.", translation: "It’s really good, give me another one.", starred: true },
  { id: "uno-mas-y-ya", term: "uno más y ya", meaning: "one more and that’s it", matchingMeaning: "one more and that’s it", note: "Useful when you are tempted but trying to stop.", example: "Uno más y ya, ahora sí.", translation: "One more and that’s it, for real now.", starred: true },
  { id: "bien-buenos", term: "están bien buenos", meaning: "they’re really good", matchingMeaning: "they’re really good", note: "Informal Mexican praise for food.", example: "Estos tacos están bien buenos.", translation: "These tacos are really good.", starred: true },
  { id: "bien-servido", term: "está bien servido", meaning: "it’s generously filled / a good portion", matchingMeaning: "it’s a good portion", note: "Use when the portion is generous.", example: "El taco está bien servido.", translation: "The taco is generously filled.", starred: true },
  { id: "ya-quede-lleno", term: "ya quedé lleno", meaning: "I’m full now", matchingMeaning: "I’m full now", note: "Natural phrase after eating enough.", example: "Con tres tacos ya quedé lleno.", translation: "With three tacos I’m full now.", starred: true },
  { id: "uno-de-cada", term: "uno de cada", meaning: "one of each", matchingMeaning: "one of each", note: "Useful when you want to try different items.", example: "Me da uno de cada.", translation: "Could I have one of each?", starred: true },
  { id: "ponme-tres", term: "ponme tres…", meaning: "give/make me three…", matchingMeaning: "give me three…", note: "Very common casual ordering phrase.", example: "Ponme tres de suadero.", translation: "Give me three suadero tacos.", starred: true },
  { id: "esa-pero-aparte", term: "esa, pero aparte", meaning: "that one, but on the side", matchingMeaning: "that one, but on the side", note: "Useful for salsa or toppings you want separately.", example: "Esa, pero aparte, por favor.", translation: "That one, but on the side, please.", starred: true },
];

const highlightMap = Object.fromEntries(foodVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: "medium",
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

const sentenceVocab = foodVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB1StreetFoodLateNightSnacksFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B1: Street Food and Late-Night Snacks Flashcards",
  subtitle: "Mexican food-stand phrases for ordering tacos, asking about salsa, prices, portions, cravings, and takeaway food.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Mexican Spanish", "B1", "flashcards", "street food", "tacos"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: foodVocab.map(cardFromVocab) },
};

export const mexicanSpanishB1StreetFoodLateNightSnacksSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Street Food and Late-Night Snacks",
  subtitle: "Build natural Mexican Spanish for ordering tacos, customizing toppings, asking prices, and talking about cravings.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "sentence-builder", "food", "tacos"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Mexican Spanish voice note ordering late-night food: ask for tacos, customize toppings, ask about salsa and price, and say if it is for here or to go.",
    stages: [
      stage("stage-1", "Order politely", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "Could I have two al pastor tacos with everything?", "¿Me da dos de pastor con todo?", "This is a short, realistic taco-stand order.", breakdown([["could I have", "¿me da…?"], ["two al pastor tacos", "dos de pastor"], ["with everything", "con todo"]])),
      stage("stage-2", "Customize toppings", sentenceVocab.slice(4, 7), sentenceVocab.slice(0, 7), "Could you make mine without onion and with everything except cilantro?", "¿Me pone el mío sin cebolla y con todo menos cilantro?", "This lets you customize food clearly.", breakdown([["could you make me", "¿me pone…?"], ["without onion", "sin cebolla"], ["with everything except cilantro", "con todo menos cilantro"]])),
      stage("stage-3", "Ask about salsa", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "Put the salsa on the side. Is it very spicy? Which one is less spicy?", "La salsa aparte. ¿Pica mucho? ¿Cuál pica menos?", "This is essential for Mexican salsa survival. Tiny heroic moment.", breakdown([["salsa on the side", "la salsa aparte"], ["is it very spicy", "¿pica mucho?"], ["which one is less spicy", "¿cuál pica menos?"]])),
      stage("stage-4", "For here or to go", sentenceVocab.slice(9, 12), sentenceVocab.slice(0, 12), "Is it for here or to go? How much is it?", "¿Es para aquí o para llevar? ¿Cuánto es?", "This handles the basic checkout moment.", breakdown([["for here", "para aquí"], ["to go", "para llevar"], ["how much is it", "¿cuánto es?"]])),
      stage("stage-5", "Ask prices", sentenceVocab.slice(12, 15), sentenceVocab.slice(0, 15), "How much are the tacos? How much do I owe you?", "¿A cómo están los tacos? ¿Cuánto te debo?", "This practices two natural ways to ask price/payment.", breakdown([["how much are they", "¿a cómo están?"], ["the tacos", "los tacos"], ["how much do I owe you", "¿cuánto te debo?"]])),
      stage("stage-6", "Talk cravings", sentenceVocab.slice(14, 18), sentenceVocab.slice(0, 18), "I suddenly felt like tacos; I’m craving one more.", "Se me antojaron unos tacos; traigo antojo de uno más.", "This is the food-craving brain speaking fluent Mexican Spanish.", breakdown([["I suddenly felt like tacos", "se me antojaron unos tacos"], ["I’m craving", "traigo antojo de"], ["one more", "uno más"]])),
      stage("stage-7", "Praise and stop", sentenceVocab.slice(17, 21), sentenceVocab.slice(0, 21), "Give me another one. One more and that’s it; they’re really good, but I’m full now.", "Échame otro. Uno más y ya; están bien buenos, pero ya quedé lleno.", "This captures the dangerous late-night taco loop.", breakdown([["give me another one", "échame otro"], ["one more and that’s it", "uno más y ya"], ["they’re really good", "están bien buenos"], ["I’m full now", "ya quedé lleno"]])),
      stage("stage-8", "Try a mix", sentenceVocab.slice(19), sentenceVocab, "It’s a good portion. Give me one of each and three to go; that one, but on the side.", "Está bien servido. Dame uno de cada y ponme tres para llevar; esa, pero aparte.", "This combines portion, variety, takeaway, and side sauce.", breakdown([["good portion", "bien servido"], ["one of each", "uno de cada"], ["give me three", "ponme tres"], ["to go", "para llevar"], ["that one, but on the side", "esa, pero aparte"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-street-food-story-q1", type: "multiple-choice", prompt: "After message 3, what does Diego want to eat?", options: ["Tacos al pastor", "Pizza", "Ice cream", "Soup"], correctAnswer: "Tacos al pastor", explanation: "Diego asks for two al pastor tacos.", points: 1, skillTag: "context" },
  { id: "mexican-b1-street-food-story-q2", type: "multiple-choice", prompt: "After message 6, what topping does Ana want to avoid?", options: ["Cilantro", "Cheese", "Beans", "Rice"], correctAnswer: "Cilantro", explanation: "Ana says con todo menos cilantro.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-street-food-story-q3", type: "true-false", prompt: "After message 9, true or false: Ana asks for salsa on the side because she is checking the spice.", options: ["True", "False"], correctAnswer: "True", explanation: "She asks for the salsa aparte and then asks which salsa is less spicy.", points: 1, skillTag: "inference" },
  { id: "mexican-b1-street-food-story-q4", type: "multiple-choice", prompt: "After message 12, what does Diego ask about the food?", options: ["Whether it is for here or to go", "Whether the place is open tomorrow", "Whether Ana is working", "Whether there is dessert"], correctAnswer: "Whether it is for here or to go", explanation: "He asks if they are eating para aquí or taking it para llevar.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-street-food-story-q5", type: "multiple-choice", prompt: "After message 15, what does Ana ask the taco seller?", options: ["How much the tacos cost", "Where the bus stop is", "What time work starts", "Why the salsa is green"], correctAnswer: "How much the tacos cost", explanation: "Ana asks ¿a cómo están?", points: 1, skillTag: "context" },
  { id: "mexican-b1-street-food-story-q6", type: "true-false", prompt: "After message 18, true or false: Diego suddenly felt like tacos after seeing the stand.", options: ["True", "False"], correctAnswer: "True", explanation: "He says se me antojaron unos tacos when he saw the trompo.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-street-food-story-q7", type: "multiple-choice", prompt: "After message 21, why does Diego order another taco?", options: ["Because they are really good", "Because he hates them", "Because Ana asked him to leave", "Because the seller forgot the order"], correctAnswer: "Because they are really good", explanation: "He says están bien buenos and asks for another.", points: 1, skillTag: "reason" },
  { id: "mexican-b1-street-food-story-q8", type: "multiple-choice", prompt: "After message 24, how does Ana feel?", options: ["Full", "Angry", "Lost", "Late for work"], correctAnswer: "Full", explanation: "Ana says ya quedé llena.", points: 1, skillTag: "detail" },
  { id: "mexican-b1-street-food-story-q9", type: "true-false", prompt: "After message 27, true or false: They decide to take extra food to go.", options: ["True", "False"], correctAnswer: "True", explanation: "They order three to go.", points: 1, skillTag: "sequence" },
  { id: "mexican-b1-street-food-story-q10", type: "multiple-choice", prompt: "After message 30, what is the final plan?", options: ["Pay, take the food, and go home full", "Order breakfast for tomorrow", "Complain about the tacos", "Invite the seller to a party"], correctAnswer: "Pay, take the food, and go home full", explanation: "They ask what they owe and leave with food to go.", points: 1, skillTag: "gist" },
];

const storyMessages: StoryMessage[] = [
  message("m1", "ana", "Diego, saliendo del concierto se me antojaron unos tacos.", "Diego, after leaving the concert I suddenly felt like tacos.", ["se me antojaron unos tacos"]),
  message("m2", "diego", "Yo también traigo antojo de algo de madrugada.", "I’m also craving something late at night.", ["traigo antojo de…"]),
  message("m3", "diego", "Buenas, ¿me da dos de pastor con todo?", "Hi, could I have two al pastor tacos with everything?", ["¿me da…?", "dos de pastor", "con todo"], "voice-note", `${storyAudioBase}/m3.mp3`),
  message("m4", "ana", "A mí ¿me pone uno sin cebolla, por favor?", "For me, could you make one without onion, please?", ["¿me pone…?", "sin cebolla"]),
  message("m5", "diego", "¿Sin cebolla? Eso sí es decisión fuerte.", "Without onion? That is a strong decision.", []),
  message("m6", "ana", "Sí, y el mío con todo menos cilantro. No me juzgues.", "Yes, and mine with everything except cilantro. Don’t judge me.", ["con todo menos cilantro"], "voice-note", `${storyAudioBase}/m6.mp3`),
  message("m7", "diego", "Oiga, la salsa aparte para ella, porfa.", "Excuse me, salsa on the side for her, please.", ["la salsa aparte"]),
  message("m8", "ana", "Gracias. ¿La roja pica mucho?", "Thanks. Is the red one very spicy?", ["¿pica mucho?"]),
  message("m9", "ana", "Mejor dígame, ¿cuál pica menos?", "Better tell me, which one is less spicy?", ["¿cuál pica menos?"]),
  message("m10", "diego", "¿Los comemos para aquí? La mesa todavía está libre.", "Are we eating them here? The table is still free.", ["para aquí"]),
  message("m11", "ana", "Uno aquí y unos para llevar, porque mañana no voy a cocinar.", "One here and some to go, because tomorrow I’m not cooking.", ["para llevar"]),
  message("m12", "diego", "Buena estrategia. Primero cenamos para aquí y luego pedimos para llevar.", "Good strategy. First we eat here and then we order to go.", ["para aquí", "para llevar"], "voice-note", `${storyAudioBase}/m12.mp3`),
  message("m13", "ana", "Oiga, ¿a cómo están los de suadero?", "Excuse me, how much are the suadero tacos?", ["¿a cómo están?"]),
  message("m14", "diego", "Y por todo esto, ¿cuánto es?", "And for all this, how much is it?", ["¿cuánto es?"]),
  message("m15", "ana", "Diego, si pagas ahorita, ¿cuánto te debo?", "Diego, if you pay right now, how much do I owe you?", ["¿cuánto te debo?"]),
  message("m16", "diego", "Ahorita vemos. Primero prueba el taco antes de hacer cuentas.", "We’ll see in a moment. First try the taco before doing math.", []),
  message("m17", "ana", "Uy, están bien buenos. Ahora entiendo la fila.", "Wow, they’re really good. Now I understand the line.", ["están bien buenos"]),
  message("m18", "diego", "Te dije. Échame otro de pastor, porfa.", "I told you. Give me another al pastor, please.", ["échame otro"], "voice-note", `${storyAudioBase}/m18.mp3`),
  message("m19", "ana", "Diego, dijiste que solo eran dos.", "Diego, you said it was only two.", []),
  message("m20", "diego", "Uno más y ya. Palabra de persona casi responsable.", "One more and that’s it. Word of an almost responsible person.", ["uno más y ya"]),
  message("m21", "ana", "Bueno, la verdad el taco está bien servido.", "Well, honestly the taco is generously filled.", ["está bien servido"]),
  message("m22", "diego", "¿Ves? No es antojo, es investigación gastronómica.", "See? It’s not a craving, it’s gastronomic research.", []),
  message("m23", "ana", "Yo ya quedé llena, pero sí quiero llevarle algo a mi hermana.", "I’m full now, but I do want to take something to my sister.", ["ya quedé lleno"]),
  message("m24", "ana", "¿Me pone uno de cada para llevar?", "Could you make me one of each to go?", ["¿me pone…?", "uno de cada", "para llevar"], "voice-note", `${storyAudioBase}/m24.mp3`),
  message("m25", "diego", "Y a mí ponme tres de pastor para mañana.", "And give me three al pastor for tomorrow.", ["ponme tres…"]),
  message("m26", "ana", "¿Tres? Tu mañana empieza con tacos fríos, qué elegante.", "Three? Your morning starts with cold tacos, how elegant.", []),
  message("m27", "diego", "La salsa verde, esa, pero aparte, para no sufrir mañana.", "The green salsa, that one, but on the side, so I don’t suffer tomorrow.", ["esa, pero aparte"]),
  message("m28", "ana", "Perfecto. Ahora sí, ¿cuánto es por todo?", "Perfect. Now yes, how much is it for everything?", ["¿cuánto es?"]),
  message("m29", "diego", "Yo pago y luego me dices cuánto me debes de tu parte.", "I’ll pay and then you tell me how much you owe me for your part.", ["¿cuánto te debo?"]),
  message("m30", "ana", "Listo, ya quedé llena y con comida para llevar. Noche ganada.", "Done, I’m full now and with food to go. Night won.", ["ya quedé lleno", "para llevar"], "voice-note", `${storyAudioBase}/m30.mp3`),
];

export const mexicanSpanishB1StreetFoodLateNightSnacksWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B1 | After-Concert Tacos",
  subtitle: "A late-night Mexican taco stand chat where two friends order, ask about salsa, split payment, and take food home.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "story", "street-food", "tacos"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "ana", name: "Ana", initials: "A", side: "left", color: "violet" },
      { id: "diego", name: "Diego", initials: "D", side: "right", color: "blue" },
    ],
    messages: storyMessages,
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `${question.id}-check`, afterMessageId: `m${(index + 1) * 3}`, question })),
    learnedVocab: foodVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: foodVocab.slice(0, 12).map((item) => item.term),
      grammarPatterns: ["Ordering with me da and me pone", "Food customization with con / sin / menos", "Price questions with cuánto and a cómo"],
      speakingPrompts: ["Order tacos at a Mexican food stand.", "Ask which salsa is less spicy.", "Say whether your order is for here or to go."],
    },
    completionTask: {
      title: "Order late-night tacos",
      instructions: "Record a Mexican Spanish voice note ordering tacos, customizing salsa/toppings, asking the price, and saying if the food is for here or to go.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En México, pedir comida en la calle puede ser muy sencillo si usas frases cortas. «¿Me da…?» funciona para pedir algo de forma amable. «¿Me pone…?» también es común, especialmente cuando quieres que te preparen algo al momento.", translation: "In Mexico, ordering street food can be very simple if you use short phrases. Me da works to ask for something politely. Me pone is also common, especially when you want someone to prepare something for you in the moment.", highlights: highlights(["¿me da…?", "¿me pone…?"]), shadowLine: "¿Me da dos tacos, por favor?" },
  { id: "p2", text: "En una taquería, puedes pedir «dos de pastor» y agregar «con todo». Si no quieres algo, dices «sin cebolla». Si quieres casi todo, pero no una cosa, puedes decir «con todo menos cilantro».", translation: "At a taco stand, you can ask for dos de pastor and add con todo. If you do not want something, you say sin cebolla. If you want almost everything, but not one thing, you can say con todo menos cilantro.", highlights: highlights(["dos de pastor", "con todo", "sin cebolla", "con todo menos cilantro"]), shadowLine: "Dos de pastor con todo, por favor." },
  { id: "p3", text: "La salsa es parte importante de la experiencia. Si no estás seguro, pide «la salsa aparte». Antes de probar, pregunta «¿pica mucho?» o «¿cuál pica menos?». Así disfrutas la comida sin sufrir de más.", translation: "Salsa is an important part of the experience. If you are not sure, ask for la salsa aparte. Before trying it, ask pica mucho or cuál pica menos. That way you enjoy the food without suffering too much.", highlights: highlights(["la salsa aparte", "¿pica mucho?", "¿cuál pica menos?"]), shadowLine: "La salsa aparte, ¿cuál pica menos?" },
  { id: "p4", text: "Después te pueden preguntar si quieres comer «para aquí» o «para llevar». «Para aquí» significa que comes en el lugar. «Para llevar» significa que te empacan la comida y te la llevas.", translation: "Afterwards they may ask if you want to eat para aquí or para llevar. Para aquí means you eat at the place. Para llevar means they pack the food and you take it away.", highlights: highlights(["para aquí", "para llevar"]), shadowLine: "Es para aquí, pero quiero uno para llevar." },
  { id: "p5", text: "Para pagar, hay varias preguntas útiles. «¿Cuánto es?» pregunta el total. «¿A cómo están?» pregunta el precio de un producto. Y si otra persona paga primero, dices «¿cuánto te debo?» para saber tu parte.", translation: "To pay, there are several useful questions. Cuánto es asks for the total. A cómo están asks the price of a product. And if another person pays first, you say cuánto te debo to know your part.", highlights: highlights(["¿cuánto es?", "¿a cómo están?", "¿cuánto te debo?"]), shadowLine: "¿Cuánto es? ¿Cuánto te debo?" },
  { id: "p6", text: "Los antojos mandan mucho en la comida mexicana. Puedes decir «se me antojaron unos tacos» cuando la idea aparece de repente. También puedes decir «traigo antojo de…» para explicar qué comida quieres en ese momento.", translation: "Cravings matter a lot in Mexican food. You can say se me antojaron unos tacos when the idea appears suddenly. You can also say traigo antojo de to explain what food you want in that moment.", highlights: highlights(["se me antojaron unos tacos", "traigo antojo de…"]), shadowLine: "Se me antojaron unos tacos." },
  { id: "p7", text: "Cuando algo está muy rico, puedes decir «están bien buenos». Si quieres repetir, dices «échame otro». Pero cuidado: muchas veces termina en «uno más y ya», aunque ese uno más no siempre sea el último.", translation: "When something is very tasty, you can say están bien buenos. If you want to repeat, you say échame otro. But careful: it often ends in uno más y ya, even though that one more is not always the last one.", highlights: highlights(["están bien buenos", "échame otro", "uno más y ya"]), shadowLine: "Están bien buenos; échame otro." },
  { id: "p8", text: "Para terminar, puedes hablar de cantidad y porciones. «Está bien servido» significa que trae buena cantidad. «Ya quedé lleno» dice que comiste suficiente. Si quieres probar variedad, pide «uno de cada», «ponme tres…» o «esa, pero aparte».", translation: "To finish, you can talk about quantity and portions. Está bien servido means it has a good amount. Ya quedé lleno says you ate enough. If you want to try variety, ask for uno de cada, ponme tres, or esa, pero aparte.", highlights: highlights(["está bien servido", "ya quedé lleno", "uno de cada", "ponme tres…", "esa, pero aparte"]), shadowLine: "Ya quedé lleno, pero ponme uno para llevar." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-street-food-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Ordering Mexican street food", "Talking about work", "Splitting a restaurant bill", "Making backup plans"], correctAnswer: "Ordering Mexican street food", explanation: "The reading covers ordering, toppings, salsa, prices, cravings, and takeaway food.", points: 1, skillTag: "gist" },
  { id: "mexican-b1-street-food-reading-q2", type: "multiple-choice", prompt: "Which phrase means salsa on the side?", options: ["La salsa aparte", "Con todo", "Para aquí", "Uno más y ya"], correctAnswer: "La salsa aparte", explanation: "La salsa aparte means salsa on the side.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-street-food-reading-q3", type: "true-false", prompt: "True or false: Para llevar means to go or takeaway.", options: ["True", "False"], correctAnswer: "True", explanation: "Para llevar means the food is packed so you can take it away.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-street-food-reading-q4", type: "multiple-choice", prompt: "Which question asks for the total price?", options: ["¿Cuánto es?", "¿Pica mucho?", "¿Cuál pica menos?", "¿Me pone…?"], correctAnswer: "¿Cuánto es?", explanation: "¿Cuánto es? asks how much it is in total.", points: 1, skillTag: "payment" },
  { id: "mexican-b1-street-food-reading-q5", type: "multiple-choice", prompt: "What does ya quedé lleno mean?", options: ["I’m full now", "It is very spicy", "Give me three", "It is to go"], correctAnswer: "I’m full now", explanation: "Ya quedé lleno means you have eaten enough.", points: 1, skillTag: "meaning" },
];

export const mexicanSpanishB1StreetFoodLateNightSnacksReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B1 Reading: Ordering at a Taco Stand",
  subtitle: "A synced Spanish reading about ordering Mexican street food, asking about salsa, and paying at a taco stand.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "reading", "shadowing", "street-food"],
  estimatedMinutes: 14,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    paragraphs: readingParagraphs,
    glossary: foodVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "mexican-b1-street-food-quiz-q1", type: "multiple-choice", prompt: "You want to politely order two tacos. Which phrase fits?", options: ["¿Me da dos de pastor?", "Ya quedé lleno", "¿Cuál pica menos?", "La salsa aparte"], correctAnswer: "¿Me da dos de pastor?", explanation: "¿Me da…? is used to ask for food politely.", points: 1, skillTag: "ordering" },
  { id: "mexican-b1-street-food-quiz-q2", type: "fill-blank", prompt: "Complete: Lo quiero con todo menos ___.", correctAnswer: "cilantro", explanation: "Con todo menos cilantro means with everything except cilantro.", points: 1, skillTag: "customization" },
  { id: "mexican-b1-street-food-quiz-q3", type: "multiple-choice", prompt: "You do not want onion. What do you say?", options: ["Sin cebolla", "Con todo", "Para aquí", "Uno de cada"], correctAnswer: "Sin cebolla", explanation: "Sin cebolla means without onion.", points: 1, skillTag: "vocab" },
  { id: "mexican-b1-street-food-quiz-q4", type: "true-false", prompt: "True or false: ¿Pica mucho? asks if something is very spicy.", options: ["True", "False"], correctAnswer: "True", explanation: "Picar means to be spicy in this food context.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-street-food-quiz-q5", type: "order-words", prompt: "Order the words: salsa on the side.", wordBank: ["la", "salsa", "aparte"], correctAnswer: "la salsa aparte", explanation: "La salsa aparte is the phrase for salsa on the side.", points: 1, skillTag: "syntax" },
  { id: "mexican-b1-street-food-quiz-q6", type: "multiple-choice", prompt: "You want food to take home. Which phrase do you use?", options: ["Para llevar", "Para aquí", "Con todo", "Están bien buenos"], correctAnswer: "Para llevar", explanation: "Para llevar means to go or takeaway.", points: 1, skillTag: "context" },
  { id: "mexican-b1-street-food-quiz-q7", type: "fill-blank", prompt: "Complete: ¿___ es por todo?", correctAnswer: "Cuánto", explanation: "¿Cuánto es? asks how much it is.", points: 1, skillTag: "payment" },
  { id: "mexican-b1-street-food-quiz-q8", type: "true-false", prompt: "True or false: Se me antojaron unos tacos means I suddenly felt like having tacos.", options: ["True", "False"], correctAnswer: "True", explanation: "Se me antojaron describes a sudden craving.", points: 1, skillTag: "meaning" },
  { id: "mexican-b1-street-food-quiz-q9", type: "order-words", prompt: "Order the words: one more and that's it.", wordBank: ["uno", "más", "y", "ya"], correctAnswer: "uno más y ya", explanation: "Uno más y ya is a natural phrase when ordering one last item.", points: 1, skillTag: "syntax" },
  { id: "mexican-b1-street-food-quiz-q10", type: "multiple-choice", prompt: "The tacos are delicious. Which phrase fits?", options: ["Están bien buenos", "¿A cómo están?", "¿Cuánto te debo?", "Para llevar"], correctAnswer: "Están bien buenos", explanation: "Están bien buenos means they are really good.", points: 1, skillTag: "context" },
  { id: "mexican-b1-street-food-quiz-q11", type: "match-pairs", prompt: "Match the ordering phrases.", pairs: [{ left: "¿me da…?", right: "could I have…?" }, { left: "¿me pone…?", right: "could you make/give me…?" }, { left: "dos de pastor", right: "two al pastor tacos" }, { left: "ponme tres…", right: "give me three…" }], explanation: "These are direct food-stand ordering phrases.", points: 4, skillTag: "matching" },
  { id: "mexican-b1-street-food-quiz-q12", type: "match-pairs", prompt: "Match the customization phrases.", pairs: [{ left: "con todo", right: "with everything" }, { left: "sin cebolla", right: "without onion" }, { left: "la salsa aparte", right: "salsa on the side" }, { left: "esa, pero aparte", right: "that one, but on the side" }], explanation: "These phrases customize toppings and salsa.", points: 4, skillTag: "customization" },
  { id: "mexican-b1-street-food-quiz-q13", type: "match-pairs", prompt: "Match the food situation phrases.", pairs: [{ left: "para aquí", right: "for here" }, { left: "para llevar", right: "to go" }, { left: "ya quedé lleno", right: "I’m full now" }, { left: "uno de cada", right: "one of each" }], explanation: "These phrases cover eating location, fullness, and variety.", points: 4, skillTag: "food" },
];

export const mexicanSpanishB1StreetFoodLateNightSnacksQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican B1 Quiz: Street Food and Late-Night Snacks",
  subtitle: "Test Mexican Spanish phrases for ordering tacos, salsa, prices, portions, and late-night cravings.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["mexican-spanish", "b1", "quiz", "street-food", "tacos"],
  estimatedMinutes: 12,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B1 street-food phrases in realistic taco-stand situations.",
    passScore: 80,
    feedbackMode: "immediate",
    questions: quizQuestions,
  },
};
