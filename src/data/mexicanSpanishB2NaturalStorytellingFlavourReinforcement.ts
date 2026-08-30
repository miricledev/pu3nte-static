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

const courseId = "mexican-spanish-b2-natural-storytelling-with-flavour";
const skoolSectionName = "Mexican Spanish - B2 Natural Storytelling with Flavour";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const storytellingVocab: VocabItem[] = [
  { id: "haz-de-cuenta-que", term: "haz de cuenta que", meaning: "picture it like this / imagine that / basically", matchingMeaning: "picture it like this", note: "Sets up a scene in a lively spoken story.", example: "Haz de cuenta que todo empezó normal.", translation: "Picture it like this: everything started normally.", starred: true },
  { id: "resulta-que", term: "resulta que", meaning: "it turns out that", matchingMeaning: "it turns out that", note: "Introduces the twist or real explanation.", example: "Resulta que la dirección estaba mal.", translation: "It turns out the address was wrong.", starred: true },
  { id: "el-chiste-es-que", term: "el chiste es que", meaning: "the point is / the thing is", matchingMeaning: "the thing is", note: "Not about a joke here; it means the key point.", example: "El chiste es que nadie traía batería.", translation: "The thing is nobody had battery.", starred: true },
  { id: "segun-yo", term: "según yo", meaning: "as far as I knew / according to me", matchingMeaning: "as far as I knew", note: "Signals the speaker’s version, often before being corrected.", example: "Según yo, la fiesta era a las ocho.", translation: "As far as I knew, the party was at eight.", starred: true },
  { id: "y-en-eso", term: "y en eso", meaning: "and right then / just at that moment", matchingMeaning: "and right then", note: "Adds movement and timing to a spoken story.", example: "Y en eso empezó a llover.", translation: "And right then it started raining.", starred: true },
  { id: "de-volada", term: "de volada", meaning: "really quickly / in a flash", matchingMeaning: "really quickly", note: "Very Mexican way to say something happened fast.", example: "Le marqué de volada.", translation: "I called him really quickly.", starred: true },
  { id: "ni-en-cuenta", term: "ni en cuenta", meaning: "completely unaware / without even noticing", matchingMeaning: "without even noticing", note: "Useful when someone missed an obvious detail.", example: "Yo iba manejando y ni en cuenta.", translation: "I was driving and didn’t even notice.", starred: true },
  { id: "me-cayo-el-veinte", term: "me cayó el veinte", meaning: "it clicked / I suddenly realized", matchingMeaning: "I suddenly realized", note: "Classic Mexican phrase for a delayed realization.", example: "Ahí me cayó el veinte: era otra colonia.", translation: "Then it clicked: it was another neighborhood.", starred: true },
  { id: "para-acabarla-de-amolar", term: "para acabarla de amolar", meaning: "to make matters worse", matchingMeaning: "to make matters worse", note: "Adds dramatic frustration before another problem.", example: "Para acabarla de amolar, se apagó el celular.", translation: "To make matters worse, the phone died.", starred: true },
  { id: "sepa-la-bola", term: "sepa la bola", meaning: "who knows / I have no idea", matchingMeaning: "who knows", note: "Colloquial Mexican phrase for uncertainty.", example: "Dónde quedaron las llaves, sepa la bola.", translation: "Where the keys ended up, who knows.", starred: true },
  { id: "de-plano", term: "de plano", meaning: "seriously / definitely / flat-out", matchingMeaning: "seriously", note: "Emphasizes a reaction or conclusion.", example: "De plano, ese día todo salió mal.", translation: "Seriously, everything went wrong that day.", starred: true },
  { id: "fue-un-relajo", term: "fue un relajo", meaning: "it was a whole mess / chaotic situation", matchingMeaning: "it was a whole mess", note: "Natural summary for a messy situation.", example: "Mover a todos de lugar fue un relajo.", translation: "Moving everyone to another place was a whole mess.", starred: true },
  { id: "relajo", term: "relajo", meaning: "mess / chaos / commotion", matchingMeaning: "mess or chaos", note: "Mexican everyday word for disorder or chaos.", example: "Se armó un relajo afuera del salón.", translation: "A whole mess broke out outside the venue.", starred: true },
  { id: "ya-de-ahi", term: "ya de ahí", meaning: "from there / after that", matchingMeaning: "after that", note: "Moves the story forward naturally.", example: "Ya de ahí nos fuimos caminando.", translation: "After that we left walking.", starred: true },
  { id: "a-todo-esto", term: "a todo esto", meaning: "meanwhile / in all of this / by the way", matchingMeaning: "meanwhile", note: "Brings in a side detail or parallel action.", example: "A todo esto, mi hermana seguía esperando.", translation: "Meanwhile, my sister was still waiting.", starred: true },
  { id: "para-variar", term: "para variar", meaning: "as usual / for a change, often sarcastically", matchingMeaning: "as usual", note: "Often sarcastic when the same problem repeats.", example: "Para variar, Pedro llegó tarde.", translation: "As usual, Pedro arrived late.", starred: true },
  { id: "nomas-veia-que", term: "nomás veía que…", meaning: "all I could see was…", matchingMeaning: "all I could see was", note: "Useful for describing a confusing scene.", example: "Nomás veía que todos corrían.", translation: "All I could see was everyone running.", starred: true },
  { id: "ahi-fue-cuando", term: "ahí fue cuando…", meaning: "that was when…", matchingMeaning: "that was when", note: "Marks the key moment or realization in a story.", example: "Ahí fue cuando entendí todo.", translation: "That was when I understood everything.", starred: true },
  { id: "total-que", term: "total que…", meaning: "so in the end / long story short", matchingMeaning: "so in the end", note: "Wraps up a messy story or jumps to the conclusion.", example: "Total que llegamos sin pastel.", translation: "So in the end, we arrived without the cake.", starred: true },
  { id: "con-razon", term: "con razón", meaning: "no wonder / that explains it", matchingMeaning: "no wonder", note: "Reaction after a mystery is explained.", example: "Con razón nadie contestaba.", translation: "No wonder nobody was answering.", starred: true },
  { id: "a-fin-de-cuentas", term: "a fin de cuentas", meaning: "at the end of the day / when all is said and done", matchingMeaning: "at the end of the day", note: "Adds reflection after the facts.", example: "A fin de cuentas, sí nos salió bien.", translation: "At the end of the day, it did turn out well.", starred: true },
  { id: "y-ahi-quedo-la-cosa", term: "y ahí quedó la cosa", meaning: "and that was that / that’s where things ended", matchingMeaning: "and that was that", note: "Closes a story with a simple ending.", example: "Nos reímos, pagamos la cuenta y ahí quedó la cosa.", translation: "We laughed, paid the bill, and that was that.", starred: true },
  { id: "se-fue-la-luz", term: "se fue la luz", meaning: "the power went out", matchingMeaning: "the power went out", note: "Common problem in a story about chaos.", example: "Justo antes de cantar, se fue la luz.", translation: "Right before singing, the power went out.", starred: true },
  { id: "se-descompuso-el-coche", term: "se descompuso el coche", meaning: "the car broke down", matchingMeaning: "the car broke down", note: "Mexican everyday transport problem.", example: "En plena avenida se descompuso el coche.", translation: "The car broke down in the middle of the avenue.", starred: true },
  { id: "llegamos-tardisimo", term: "llegamos tardísimo", meaning: "we arrived really late", matchingMeaning: "we arrived really late", note: "Useful ending or consequence in a chaotic story.", example: "Llegamos tardísimo, pero todavía alcanzamos pastel.", translation: "We arrived really late, but we still got cake.", starred: true },
];

const highlightMap = Object.fromEntries(storytellingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = storytellingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishB2NaturalStorytellingFlavourFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish B2: Natural Storytelling with Flavour Flashcards",
  subtitle: "Mexican connectors and reaction phrases for telling chaotic stories with timing, twists, and personality.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "flashcards", "storytelling", "connectors"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: storytellingVocab.map(cardFromVocab) },
};

export const mexicanSpanishB2NaturalStorytellingFlavourSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Mexican Storytelling Flow",
  subtitle: "Build natural Mexican Spanish story chunks for setup, chaos, twists, realization, and conclusion.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["mexican-spanish", "b2", "sentence-builder", "storytelling", "spoken-flow"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish story about a plan that went wrong, using setup, twist, chaos, realization, and conclusion phrases.",
    stages: [
      stage("stage-1", "Set the scene", sentenceVocab.slice(0, 4), sentenceVocab.slice(0, 4), "Picture it like this: it turns out that, as far as I knew, the party was at eight.", "Haz de cuenta que resulta que, según yo, la fiesta era a las ocho.", "This opens a spoken story and frames the speaker’s version.", breakdown([["picture it like this", "haz de cuenta que"], ["it turns out that", "resulta que"], ["as far as I knew", "según yo"]])),
      stage("stage-2", "Add timing", sentenceVocab.slice(4, 8), sentenceVocab.slice(0, 8), "And right then I called really quickly, but I was completely unaware.", "Y en eso marqué de volada, pero yo iba ni en cuenta.", "This adds movement while showing the speaker missed something.", breakdown([["and right then", "y en eso"], ["really quickly", "de volada"], ["completely unaware", "ni en cuenta"]])),
      stage("stage-3", "Realization and problems", sentenceVocab.slice(7, 11), sentenceVocab.slice(0, 11), "Then it clicked, and to make matters worse, who knows where the keys were.", "Ahí me cayó el veinte y, para acabarla de amolar, las llaves sepa la bola.", "This marks the delayed realization and adds chaos.", breakdown([["it clicked", "me cayó el veinte"], ["to make matters worse", "para acabarla de amolar"], ["who knows", "sepa la bola"]])),
      stage("stage-4", "Summarize the mess", sentenceVocab.slice(10, 14), sentenceVocab.slice(0, 14), "Seriously, it was a whole mess; after that, everything became chaos.", "De plano, fue un relajo; ya de ahí todo se volvió un relajo.", "This gives the story an emotional summary.", breakdown([["seriously", "de plano"], ["it was a whole mess", "fue un relajo"], ["after that", "ya de ahí"]])),
      stage("stage-5", "Bring in side details", sentenceVocab.slice(14, 18), sentenceVocab.slice(0, 18), "Meanwhile, as usual, all I could see was that everyone was running.", "A todo esto, para variar, nomás veía que todos corrían.", "This adds parallel action and sarcastic commentary.", breakdown([["meanwhile", "a todo esto"], ["as usual", "para variar"], ["all I could see was", "nomás veía que"]])),
      stage("stage-6", "Key moment", sentenceVocab.slice(17, 21), sentenceVocab.slice(0, 21), "That was when I understood; so in the end, no wonder everything failed.", "Ahí fue cuando entendí; total que, con razón, todo salió mal.", "This turns the story into a clear realization and conclusion.", breakdown([["that was when", "ahí fue cuando"], ["so in the end", "total que"], ["no wonder", "con razón"]])),
      stage("stage-7", "Reflect and close", sentenceVocab.slice(20, 23), sentenceVocab.slice(0, 23), "At the end of the day, we laughed, and that was that.", "A fin de cuentas, nos reímos y ahí quedó la cosa.", "This closes the story with reflection instead of more drama.", breakdown([["at the end of the day", "a fin de cuentas"], ["we laughed", "nos reímos"], ["and that was that", "y ahí quedó la cosa"]])),
      stage("stage-8", "Full chaotic ending", sentenceVocab.slice(22, 25), sentenceVocab, "The power went out, the car broke down, and we arrived really late.", "Se fue la luz, se descompuso el coche y llegamos tardísimo.", "This gives a concrete messy ending with common storytelling events.", breakdown([["the power went out", "se fue la luz"], ["the car broke down", "se descompuso el coche"], ["we arrived really late", "llegamos tardísimo"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-storytelling-story-q1", type: "multiple-choice", prompt: "After message 3, what is Sofía asking Luis to do?", options: ["Tell her what happened last night", "Drive her to work", "Buy a new phone", "Cancel a class"], correctAnswer: "Tell her what happened last night", explanation: "Sofía asks Luis to tell the story properly because she only saw his messages.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-storytelling-story-q2", type: "multiple-choice", prompt: "After message 6, what did Luis think?", options: ["The dinner was at 8:00 in Coyoacán", "The dinner was canceled", "He had no car", "Sofía had the keys"], correctAnswer: "The dinner was at 8:00 in Coyoacán", explanation: "Luis says según yo, la cena era a las ocho en Coyoacán.", points: 1, skillTag: "detail" },
  { id: "mexican-b2-storytelling-story-q3", type: "true-false", prompt: "After message 9, true or false: Luis realized he had the wrong place.", options: ["True", "False"], correctAnswer: "True", explanation: "He says me cayó el veinte: era Coyoacán Centro, not the place he had gone.", points: 1, skillTag: "realization" },
  { id: "mexican-b2-storytelling-story-q4", type: "multiple-choice", prompt: "After message 12, what made the situation worse?", options: ["The power went out and the car broke down", "They won a prize", "The dinner started early", "Sofía forgot the story"], correctAnswer: "The power went out and the car broke down", explanation: "Luis mentions se fue la luz and se descompuso el coche.", points: 1, skillTag: "problem" },
  { id: "mexican-b2-storytelling-story-q5", type: "multiple-choice", prompt: "After message 15, what was happening with Diego?", options: ["As usual, he was not answering", "He was already at home asleep", "He was cooking dinner", "He sent the correct address"], correctAnswer: "As usual, he was not answering", explanation: "Sofía says para variar, Diego no contestaba.", points: 1, skillTag: "side-detail" },
  { id: "mexican-b2-storytelling-story-q6", type: "multiple-choice", prompt: "After message 18, what could Luis see?", options: ["Everyone running with candles and phone flashlights", "A quiet empty street", "The car working perfectly", "A bus arriving"], correctAnswer: "Everyone running with candles and phone flashlights", explanation: "Luis says nomás veía que todos corrían con velas y luces de celular.", points: 1, skillTag: "scene" },
  { id: "mexican-b2-storytelling-story-q7", type: "true-false", prompt: "After message 21, true or false: Sofía understands why nobody answered.", options: ["True", "False"], correctAnswer: "True", explanation: "She says con razón nadie contestaba.", points: 1, skillTag: "inference" },
  { id: "mexican-b2-storytelling-story-q8", type: "multiple-choice", prompt: "After message 24, what happened in the end?", options: ["They arrived really late with melted ice cream", "They arrived early with perfect food", "The power never came back", "Luis left the city"], correctAnswer: "They arrived really late with melted ice cream", explanation: "Luis says llegamos tardísimo and the ice cream was like soup.", points: 1, skillTag: "result" },
  { id: "mexican-b2-storytelling-story-q9", type: "multiple-choice", prompt: "After message 27, how does Luis summarize the night?", options: ["It was chaos, but the grandma laughed", "It was boring", "Nobody noticed", "They never found the house"], correctAnswer: "It was chaos, but the grandma laughed", explanation: "Luis says fue un relajo, but his grandma laughed when the lights came back.", points: 1, skillTag: "summary" },
  { id: "mexican-b2-storytelling-story-q10", type: "multiple-choice", prompt: "By message 30, why is the story useful for learners?", options: ["It shows Mexican phrases for telling a story with twists and personality", "It teaches formal business writing", "It only teaches car vocabulary", "It explains verb conjugation rules"], correctAnswer: "It shows Mexican phrases for telling a story with twists and personality", explanation: "Sofía says Luis told it with drama and useful connectors.", points: 1, skillTag: "lesson-purpose" },
];

export const mexicanSpanishB2NaturalStorytellingFlavourWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican B2 Story: The Dinner That Became Chaos",
  subtitle: "Luis tells Sofía how one wrong address turned a family dinner into a full Mexican storytelling disaster.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "WhatsApp", "storytelling", "chaos"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "sofia", name: "Sofía", initials: "SO", side: "right", color: "violet" },
      { id: "luis", name: "Luis", initials: "LU", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "sofia", "Luis, necesito que me cuentes bien lo de ayer.", "Luis, I need you to properly tell me what happened yesterday.", []),
      message("m2", "luis", "¿Lo de la cena de mi abuela? Fue un relajo.", "The thing with my grandma’s dinner? It was a whole mess.", ["fue un relajo", "relajo"]),
      message("m3", "sofia", "Sí, porque solo vi tus mensajes de 'ayuda' y luego silencio total.", "Yes, because I only saw your 'help' messages and then total silence.", [], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "luis", "Haz de cuenta que todo empezó normal: yo salí temprano con el pastel.", "Picture it like this: everything started normally. I left early with the cake.", ["haz de cuenta que"]),
      message("m5", "sofia", "Eso ya suena sospechoso.", "That already sounds suspicious.", []),
      message("m6", "luis", "Resulta que, según yo, la cena era a las ocho en Coyoacán.", "It turns out that, as far as I knew, the dinner was at eight in Coyoacán.", ["resulta que", "según yo"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "sofia", "¿Según tú? Uf, ahí viene el problema.", "As far as you knew? Oof, here comes the problem.", []),
      message("m8", "luis", "El chiste es que nadie confirmó la dirección nueva.", "The thing is nobody confirmed the new address.", ["el chiste es que"]),
      message("m9", "luis", "Y en eso me cayó el veinte: era Coyoacán Centro, no el lugar al que yo iba.", "And right then it clicked: it was Coyoacán Centro, not the place I was going to.", ["y en eso", "me cayó el veinte"]),
      message("m10", "sofia", "No manches, ¿y no revisaste el chat?", "No way, and you didn’t check the chat?", []),
      message("m11", "luis", "Iba manejando y ni en cuenta. De volada le marqué a mi primo.", "I was driving and completely unaware. I quickly called my cousin.", ["ni en cuenta", "de volada"]),
      message("m12", "luis", "Para acabarla de amolar, se fue la luz en la casa y se descompuso el coche de mi tío.", "To make matters worse, the power went out at the house and my uncle’s car broke down.", ["para acabarla de amolar", "se fue la luz", "se descompuso el coche"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "sofia", "O sea, todos perdidos, sin luz y sin coche.", "So everyone was lost, without power, and without a car.", []),
      message("m14", "luis", "Exacto. Y las llaves del portón, sepa la bola.", "Exactly. And the gate keys? Who knows.", ["sepa la bola"]),
      message("m15", "sofia", "A todo esto, para variar, Diego no contestaba, ¿verdad?", "Meanwhile, as usual, Diego wasn’t answering, right?", ["a todo esto", "para variar"]),
      message("m16", "luis", "Obvio. De plano desapareció media hora.", "Obviously. Seriously, he disappeared for half an hour.", ["de plano"]),
      message("m17", "sofia", "¿Y tú qué veías desde afuera?", "And what could you see from outside?", []),
      message("m18", "luis", "Nomás veía que todos corrían con velas y luces de celular como si fuera película de misterio.", "All I could see was everyone running with candles and phone flashlights like it was a mystery movie.", ["nomás veía que…"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "sofia", "Jajaja, pobre de tu abuela.", "Hahaha, poor your grandma.", []),
      message("m20", "luis", "Ahí fue cuando mi mamá gritó que el pastel seguía en mi coche.", "That was when my mom shouted that the cake was still in my car.", ["ahí fue cuando…"]),
      message("m21", "sofia", "Con razón nadie contestaba: todos estaban apagando incendios.", "No wonder nobody was answering: everyone was putting out fires.", ["con razón"]),
      message("m22", "luis", "Ya de ahí, movimos la cena al patio del vecino.", "After that, we moved the dinner to the neighbor’s patio.", ["ya de ahí"]),
      message("m23", "sofia", "Eso sí ya parece final de telenovela.", "That really sounds like a soap-opera ending.", []),
      message("m24", "luis", "Total que llegamos tardísimo, con el helado hecho sopa y todos riéndose.", "So in the end, we arrived really late, with the ice cream like soup and everyone laughing.", ["total que…", "llegamos tardísimo"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "sofia", "¿Y tu abuela qué dijo?", "And what did your grandma say?", []),
      message("m26", "luis", "Dijo: 'a fin de cuentas, sí llegaron'. Y ahí quedó la cosa.", "She said: 'At the end of the day, you did arrive.' And that was that.", ["a fin de cuentas", "y ahí quedó la cosa"]),
      message("m27", "sofia", "Qué historia. Fue caos, pero con abuela feliz.", "What a story. It was chaos, but with a happy grandma.", []),
      message("m28", "luis", "Sí. A fin de cuentas, el relajo terminó mejor de lo esperado.", "Yes. At the end of the day, the mess ended better than expected.", ["a fin de cuentas", "relajo"]),
      message("m29", "sofia", "Y ahora tienes una historia buenísima para contar.", "And now you have a great story to tell.", []),
      message("m30", "luis", "Exacto: haz de cuenta que sobrevivimos a una cena, un apagón y dos direcciones falsas.", "Exactly: picture it like this, we survived a dinner, a blackout, and two false addresses.", ["haz de cuenta que"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-b2-storytelling-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: storytellingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: storytellingVocab.map((item) => item.term),
      grammarPatterns: [
        "Story setup: haz de cuenta que, resulta que, según yo.",
        "Twist timing: y en eso, ahí fue cuando, me cayó el veinte.",
        "Conclusion flow: total que, a fin de cuentas, y ahí quedó la cosa.",
      ],
      speakingPrompts: [
        "Tell a chaotic story using at least five Mexican storytelling connectors.",
        "Explain a delayed realization using me cayó el veinte.",
        "Summarize a messy situation with total que and a fin de cuentas.",
      ],
    },
    completionTask: {
      title: "Your Mexican B2 storytelling voice note",
      instructions: "Record a 60-second Mexican Spanish story about a plan that went wrong. Use setup, twist, chaos, realization, and conclusion phrases.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Contar una historia en español mexicano no es solo ordenar eventos. También es crear ritmo. Puedes abrir con «haz de cuenta que» para meter a la otra persona en la escena, o con «resulta que» cuando vas a revelar el verdadero problema.", translation: "Telling a story in Mexican Spanish is not only about ordering events. It is also about creating rhythm. You can open with haz de cuenta que to pull the other person into the scene, or with resulta que when you are about to reveal the real problem.", highlights: highlights(["haz de cuenta que", "resulta que"]), shadowLine: "Haz de cuenta que todo empezó normal, pero resulta que no." },
  { id: "p2", text: "Cuando quieres aclarar tu versión, «según yo» es muy útil. No significa que tengas razón; significa que así entendías la situación. Luego puedes decir «el chiste es que» para llegar al punto central sin sonar demasiado formal.", translation: "When you want to clarify your version, según yo is very useful. It does not mean you are right; it means that is how you understood the situation. Then you can say el chiste es que to get to the main point without sounding too formal.", highlights: highlights(["según yo", "el chiste es que"]), shadowLine: "Según yo, todo estaba claro; el chiste es que nadie confirmó." },
  { id: "p3", text: "Para darle movimiento a la historia, «y en eso» marca el momento exacto en que algo cambia. Si reaccionaste rápido, puedes decir «de volada». Pero si no notaste algo obvio, «ni en cuenta» muestra que ibas completamente distraído.", translation: "To give movement to the story, y en eso marks the exact moment when something changes. If you reacted fast, you can say de volada. But if you did not notice something obvious, ni en cuenta shows you were completely distracted.", highlights: highlights(["y en eso", "de volada", "ni en cuenta"]), shadowLine: "Y en eso marqué de volada, pero yo iba ni en cuenta." },
  { id: "p4", text: "Una buena historia casi siempre tiene una realización. En México, «me cayó el veinte» significa que por fin entendiste algo. Después, si llega otro problema, «para acabarla de amolar» prepara al oyente para una complicación más.", translation: "A good story almost always has a realization. In Mexico, me cayó el veinte means you finally understood something. Then, if another problem arrives, para acabarla de amolar prepares the listener for one more complication.", highlights: highlights(["me cayó el veinte", "para acabarla de amolar"]), shadowLine: "Me cayó el veinte y, para acabarla de amolar, todo empeoró." },
  { id: "p5", text: "Cuando nadie sabe explicar algo, «sepa la bola» funciona perfecto. Y si quieres resumir la frustración, puedes decir «de plano, fue un relajo». «Relajo» no es solo desorden: también comunica ruido, confusión y gente tratando de resolver todo al mismo tiempo.", translation: "When nobody knows how to explain something, sepa la bola works perfectly. And if you want to summarize the frustration, you can say de plano, fue un relajo. Relajo is not only disorder: it also communicates noise, confusion, and people trying to solve everything at the same time.", highlights: highlights(["sepa la bola", "de plano", "fue un relajo", "relajo"]), shadowLine: "Sepa la bola qué pasó; de plano, fue un relajo." },
  { id: "p6", text: "Para mover la historia hacia adelante, «ya de ahí» conecta la siguiente etapa. Si quieres meter una acción paralela, usa «a todo esto». Y si algo pasa como siempre, «para variar» agrega un tono medio sarcástico.", translation: "To move the story forward, ya de ahí connects the next stage. If you want to bring in a parallel action, use a todo esto. And if something happens as usual, para variar adds a somewhat sarcastic tone.", highlights: highlights(["ya de ahí", "a todo esto", "para variar"]), shadowLine: "Ya de ahí salimos; a todo esto, para variar, nadie contestaba." },
  { id: "p7", text: "Las imágenes también hacen que una historia suene viva. «Nomás veía que…» te ayuda a describir una escena desde tu punto de vista. Luego «ahí fue cuando…» marca el momento clave, y «con razón» muestra que algo por fin tiene sentido.", translation: "Images also make a story sound alive. Nomás veía que helps you describe a scene from your point of view. Then ahí fue cuando marks the key moment, and con razón shows that something finally makes sense.", highlights: highlights(["nomás veía que…", "ahí fue cuando…", "con razón"]), shadowLine: "Nomás veía que todos corrían; ahí fue cuando entendí." },
  { id: "p8", text: "Para cerrar, «total que…» resume una historia larga. «A fin de cuentas» agrega una conclusión más reflexiva, y «y ahí quedó la cosa» baja la cortina. Si además dices «se fue la luz», «se descompuso el coche» o «llegamos tardísimo», ya tienes detalles concretos para que la historia se sienta real.", translation: "To close, total que summarizes a long story. A fin de cuentas adds a more reflective conclusion, and y ahí quedó la cosa brings the curtain down. If you also say se fue la luz, se descompuso el coche, or llegamos tardísimo, you have concrete details that make the story feel real.", highlights: highlights(["total que…", "a fin de cuentas", "y ahí quedó la cosa", "se fue la luz", "se descompuso el coche", "llegamos tardísimo"]), shadowLine: "Total que llegamos tardísimo y ahí quedó la cosa." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-b2-storytelling-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Using Mexican Spanish to tell stories naturally", "Ordering food in Mexico", "Writing a formal email", "Practicing verb conjugations only"], correctAnswer: "Using Mexican Spanish to tell stories naturally", explanation: "The reading explains Mexican setup, twist, realization, chaos, and closing phrases.", points: 1, skillTag: "gist" },
  { id: "mexican-b2-storytelling-reading-q2", type: "multiple-choice", prompt: "Which phrase means “I suddenly realized”?", options: ["Me cayó el veinte", "Sepa la bola", "A fin de cuentas", "Ni en cuenta"], correctAnswer: "Me cayó el veinte", explanation: "Me cayó el veinte is the Mexican phrase for when something finally clicks.", points: 1, skillTag: "meaning" },
  { id: "mexican-b2-storytelling-reading-q3", type: "true-false", prompt: "True or false: “según yo” can introduce the speaker’s understanding before it turns out to be wrong.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says it shows how the speaker understood the situation.", points: 1, skillTag: "nuance" },
  { id: "mexican-b2-storytelling-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "To make matters worse, the car broke down.", wordBank: ["Para", "acabarla", "de", "amolar,", "se", "descompuso", "el", "coche."], correctAnswer: "Para acabarla de amolar, se descompuso el coche.", explanation: "This combines a complication marker with a concrete problem.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-b2-storytelling-reading-q5", type: "multiple-choice", prompt: "Which phrase is used to close a story with “and that was that”?", options: ["Y ahí quedó la cosa", "Y en eso", "Nomás veía que", "De volada"], correctAnswer: "Y ahí quedó la cosa", explanation: "Y ahí quedó la cosa closes the story simply.", points: 1, skillTag: "closing" },
];

export const mexicanSpanishB2NaturalStorytellingFlavourReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican B2 Reading: Contar el Relajo con Sabor",
  subtitle: "A synced Spanish reading about Mexican storytelling rhythm, twists, realizations, chaos, and endings.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "reading", "storytelling", "spoken Spanish"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: storytellingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican B2 natural-storytelling vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishB2NaturalStorytellingFlavourQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish B2: Natural Storytelling with Flavour Quiz",
  subtitle: "Choose the right Mexican phrase for story setup, twists, chaos, realizations, and endings.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Mexican Spanish", "B2", "quiz", "storytelling", "connectors"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Mexican B2 storytelling phrases for opening a story, adding chaos, marking realizations, and closing naturally.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-b2-storytelling-quiz-1", type: "multiple-choice", prompt: "You want to start a story with “picture it like this.” What fits?", options: ["Haz de cuenta que", "Y ahí quedó la cosa", "Sepa la bola", "Con razón"], correctAnswer: "Haz de cuenta que", explanation: "This phrase sets up the listener to imagine the scene.", points: 1, skillTag: "setup" },
      { id: "mexican-b2-storytelling-quiz-2", type: "fill-blank", prompt: "Complete: Resulta ____ la dirección estaba mal.", nativePrompt: "It turns out the address was wrong.", correctAnswer: "que", explanation: "Resulta que introduces the twist or real situation.", points: 1, skillTag: "twist" },
      { id: "mexican-b2-storytelling-quiz-3", type: "multiple-choice", prompt: "The speaker finally realizes the problem. Which phrase fits?", options: ["Me cayó el veinte", "Ni en cuenta", "Para variar", "Fue un relajo"], correctAnswer: "Me cayó el veinte", explanation: "Me cayó el veinte means it clicked or I suddenly realized.", points: 1, skillTag: "realization" },
      { id: "mexican-b2-storytelling-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "To make matters worse, the power went out.", wordBank: ["Para", "acabarla", "de", "amolar,", "se", "fue", "la", "luz."], correctAnswer: "Para acabarla de amolar, se fue la luz.", explanation: "This adds a new complication to the story.", points: 1, skillTag: "complication" },
      { id: "mexican-b2-storytelling-quiz-5", type: "true-false", prompt: "True or false: “ni en cuenta” means someone was completely unaware.", options: ["True", "False"], correctAnswer: "True", explanation: "Ni en cuenta means the person did not even notice.", points: 1, skillTag: "meaning" },
      { id: "mexican-b2-storytelling-quiz-6", type: "multiple-choice", prompt: "You want to say “as usual” with a sarcastic feel. What fits?", options: ["Para variar", "De volada", "A fin de cuentas", "Y en eso"], correctAnswer: "Para variar", explanation: "Para variar often adds sarcastic repetition: as usual, this happened again.", points: 1, skillTag: "tone" },
      { id: "mexican-b2-storytelling-quiz-7", type: "fill-blank", prompt: "Complete: Fue un ____.", nativePrompt: "It was a whole mess.", correctAnswer: "relajo", explanation: "Fue un relajo summarizes a chaotic situation.", points: 1, skillTag: "chaos" },
      { id: "mexican-b2-storytelling-quiz-8", type: "multiple-choice", prompt: "You want to say “so in the end” before the conclusion. What fits?", options: ["Total que", "Haz de cuenta que", "Ni en cuenta", "Sepa la bola"], correctAnswer: "Total que", explanation: "Total que jumps to the final result or summary.", points: 1, skillTag: "conclusion" },
      { id: "mexican-b2-storytelling-quiz-9", type: "true-false", prompt: "True or false: “sepa la bola” is used when the speaker has no idea.", options: ["True", "False"], correctAnswer: "True", explanation: "Sepa la bola means who knows or I have no idea.", points: 1, skillTag: "uncertainty" },
      { id: "mexican-b2-storytelling-quiz-10", type: "multiple-choice", prompt: "Which phrase means “no wonder”?", options: ["Con razón", "De plano", "Ya de ahí", "A todo esto"], correctAnswer: "Con razón", explanation: "Con razón reacts to an explanation that suddenly makes sense.", points: 1, skillTag: "reaction" },
      pairQuestion("mexican-b2-storytelling-pairs-1", "Match setup and early-story phrases.", storytellingVocab.slice(0, 9)),
      pairQuestion("mexican-b2-storytelling-pairs-2", "Match chaos and transition phrases.", storytellingVocab.slice(9, 18)),
      pairQuestion("mexican-b2-storytelling-pairs-3", "Match conclusion and concrete event phrases.", storytellingVocab.slice(18)),
    ],
  },
};
