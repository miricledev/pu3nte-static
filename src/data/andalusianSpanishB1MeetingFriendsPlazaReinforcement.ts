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

type VocabItem = { id: string; term: string; meaning: string; note: string; example: string; translation: string };

const courseId = "andalusian-spanish-b1-meeting-friends-plaza";
const sectionName = "Andalusian Spanish - B1 Meeting Friends in a Plaza";

const plazaVocab: VocabItem[] = [
  { id: "quedamos-plaza", term: "¿Qué, quedamos luego en la plaza?", meaning: "So, shall we meet at the square later?", note: "Opening with ¿qué...? makes the invitation casual and spontaneous.", example: "¿Qué, quedamos luego en la plaza después de cenar?", translation: "So, shall we meet in the square after dinner?" },
  { id: "hora-os-viene", term: "¿A qué hora os viene bien?", meaning: "What time works for you lot?", note: "Os and viene bien arrange a convenient time for several friends.", example: "¿A qué hora os viene bien quedar?", translation: "What time works for you all to meet?" },
  { id: "eso-ocho", term: "A eso de las ocho", meaning: "Around eight-ish", note: "A eso de makes a time deliberately approximate.", example: "Nos vemos a eso de las ocho.", translation: "We'll meet around eight." },
  { id: "junto-fuente", term: "Junto a la fuente", meaning: "By the fountain", note: "Junto a identifies a nearby meeting landmark.", example: "Quedamos junto a la fuente grande.", translation: "Let's meet by the large fountain." },
  { id: "voy-camino", term: "Yo voy de camino", meaning: "I'm on my way", note: "A natural status update while travelling to the meeting point.", example: "Yo voy de camino; llego pronto.", translation: "I'm on my way; I'll arrive soon." },
  { id: "paso-ubicacion", term: "Te paso la ubicación", meaning: "I'll send you my location", note: "Pasar can mean send or share digital information.", example: "Te paso la ubicación exacta por WhatsApp.", translation: "I'll send you the exact location on WhatsApp." },
  { id: "entretenido", term: "Me he entretenido un poco", meaning: "I got a bit held up", note: "Suggests distraction or a small delay rather than a major problem.", example: "Perdonad, me he entretenido un poco en casa.", translation: "Sorry, I got held up a little at home." },
  { id: "diez-minutillos", term: "Llego en diez minutillos", meaning: "I'll be there in ten minutes or so", note: "The Andalusian-friendly diminutive minutillos softens the delay.", example: "No os preocupéis, llego en diez minutillos.", translation: "Don't worry, I'll be there in ten minutes or so." },
  { id: "no-os-movais", term: "No os mováis de allí", meaning: "Don't you lot move from there", note: "A negative vosotros command used for a group.", example: "No os mováis de allí, que ya llego.", translation: "Don't move from there; I'm nearly there." },
  { id: "tirad-plaza", term: "Tirad vosotros para la plaza", meaning: "You lot head to the square without me", note: "Tirar para means head towards somewhere in informal Spain Spanish.", example: "Tirad vosotros para la plaza y os alcanzo.", translation: "You lot head to the square and I'll catch up." },
  { id: "donde-andais", term: "¿Dónde andáis?", meaning: "Where are you lot? / Whereabouts are you?", note: "An informal alternative to ¿dónde estáis? when locating friends.", example: "Ya estoy cerca, ¿dónde andáis?", translation: "I'm nearby now; where are you?" },
  { id: "lado-quiosco", term: "Estamos al lado del quiosco", meaning: "We're next to the kiosk", note: "A useful landmark-based location update.", example: "Estamos al lado del quiosco de prensa.", translation: "We're next to the news kiosk." },
  { id: "pilla-dos-pasos", term: "Me pilla a dos pasos", meaning: "It's just a stone's throw away for me", note: "Me pilla describes how conveniently located something is for the speaker.", example: "La plaza me pilla a dos pasos de casa.", translation: "The square is only a few steps from my house." },
  { id: "nada-estoy", term: "En nada estoy ahí", meaning: "I'll be there in no time", note: "En nada presents the remaining wait as very short.", example: "Seguid allí; en nada estoy ahí.", translation: "Stay there; I'll be with you in no time." },
  { id: "ambientazo", term: "Hay un ambientazo", meaning: "There's an amazing atmosphere", note: "The augmentative -azo intensifies ambiente positively.", example: "La plaza está llena y hay un ambientazo.", translation: "The square is full and the atmosphere is amazing." },
  { id: "fresquito", term: "Nos ponemos al fresquito", meaning: "Let's sit somewhere nice and cool", note: "Evokes the pleasant cooler air of an Andalusian evening.", example: "Nos ponemos al fresquito debajo de los árboles.", translation: "Let's sit somewhere cool under the trees." },
  { id: "pillo-terraza", term: "¿Os pillo sitio en la terraza?", meaning: "Shall I grab you lot a spot outside?", note: "Pillar sitio means secure a place before others arrive.", example: "¿Os pillo sitio en la terraza mientras venís?", translation: "Shall I get you a terrace table while you come over?" },
  { id: "vueltecita", term: "Damos una vueltecita", meaning: "Let's have a little wander", note: "The diminutive makes the walk sound relaxed and short.", example: "Después damos una vueltecita por el centro.", translation: "Afterwards we'll have a little wander around the centre." },
  { id: "cambiamos-sitio", term: "¿Y si nos cambiamos de sitio?", meaning: "What if we move somewhere else?", note: "¿Y si...? proposes an alternative without sounding forceful.", example: "Aquí hay mucho ruido; ¿y si nos cambiamos de sitio?", translation: "It's noisy here; what if we move?" },
  { id: "mas-a-gusto", term: "Ahí se está más a gusto", meaning: "It's more comfortable over there", note: "The impersonal se está describes how a place feels generally.", example: "Debajo de los árboles se está más a gusto.", translation: "It's more comfortable under the trees." },
  { id: "ea-alli", term: "Ea, pues allí nos vemos", meaning: "Right then, see you there", note: "Ea is an expressive Andalusian interjection of agreement or conclusion.", example: "Ea, pues allí nos vemos a las ocho.", translation: "Right then, see you there at eight." },
  { id: "tomamos-algo", term: "Después nos tomamos algo", meaning: "Afterwards, we'll grab a drink or something", note: "Tomar algo usually means having a drink or light food socially.", example: "Damos una vuelta y después nos tomamos algo.", translation: "We'll have a walk and then grab a drink." },
  { id: "buenas", term: "Buenas", meaning: "Hey / Hi there", note: "A relaxed greeting usable throughout the day.", example: "Buenas, ¿lleváis mucho esperando?", translation: "Hi, have you been waiting long?" },
  { id: "donde-quedamos", term: "¿Dónde quedamos?", meaning: "Where shall we meet?", note: "A direct question for choosing a meeting point.", example: "¿Dónde quedamos, en la fuente o en el quiosco?", translation: "Where shall we meet, at the fountain or kiosk?" },
  { id: "ya-plaza", term: "Ya estoy en la plaza", meaning: "I'm already at the square", note: "Ya marks that arrival has happened sooner or is now complete.", example: "Ya estoy en la plaza, junto a la fuente.", translation: "I'm already in the square by the fountain." },
  { id: "aqui", term: "¡Aquí!", meaning: "Over here!", note: "A short call used when friends are searching nearby.", example: "¡Aquí, al lado del quiosco!", translation: "Over here, next to the kiosk!" },
  { id: "hombre-fin", term: "¡Hombre, por fin!", meaning: "Ah, finally! / There you are at last!", note: "Hombre adds friendly emphasis when someone finally arrives.", example: "¡Hombre, por fin! Pensaba que te habías perdido.", translation: "There you are at last! I thought you'd got lost." },
  { id: "quedamos-aqui", term: "¿Qué, nos quedamos aquí?", meaning: "So, are we staying here?", note: "A casual opener for deciding whether the current spot works.", example: "¿Qué, nos quedamos aquí o buscamos una terraza?", translation: "So, do we stay here or find a terrace?" },
  { id: "mira", term: "Mira...", meaning: "Look... / Listen...", note: "Introduces a suggestion, observation, or change of plan.", example: "Mira, allí hay una mesa libre.", translation: "Look, there's a free table over there." },
  { id: "que-opener", term: "¿Qué...?", meaning: "So...?", note: "A casual conversational opener before a proposal or check.", example: "¿Qué, damos una vuelta?", translation: "So, shall we have a walk?" },
  { id: "pues", term: "Pues...", meaning: "Well... / In that case...", note: "Links a response naturally to what was just said.", example: "Pues vamos a la terraza.", translation: "Well then, let's go to the terrace." },
  { id: "terraza", term: "En la terraza", meaning: "Outside, at the café terrace", note: "A terraza is the outdoor seating area of a café or bar.", example: "Nos sentamos en la terraza.", translation: "We'll sit outside on the terrace." },
  { id: "estoy-lado", term: "Estoy al lado de...", meaning: "I'm next to...", note: "A reusable location frame completed with a landmark.", example: "Estoy al lado de la fuente.", translation: "I'm next to the fountain." },
  { id: "dos-pasos", term: "A dos pasos", meaning: "Just a few steps away / Very close", note: "A vivid everyday expression for a very short distance.", example: "El bar está a dos pasos.", translation: "The bar is just a few steps away." },
  { id: "venir-bien", term: "Venirle bien a alguien", meaning: "To suit someone / Work for someone", note: "An essential construction for times, dates, and arrangements.", example: "¿Te viene bien a las ocho?", translation: "Does eight o'clock work for you?" },
  { id: "a-eso-de", term: "A eso de...", meaning: "Approximately / Around a particular time", note: "Softens a clock time into an approximation.", example: "Llegaré a eso de las nueve.", translation: "I'll arrive at around nine." },
  { id: "ubicacion", term: "Ubicación", meaning: "Location / Location pin", note: "Common digital vocabulary for a shared map location.", example: "Mándame la ubicación.", translation: "Send me the location." },
  { id: "entretenerse", term: "Entretenerse", meaning: "To get distracted or held up", note: "Often explains an unplanned but minor delay.", example: "Me entretuve hablando con un vecino.", translation: "I got held up talking to a neighbour." },
  { id: "minutillos", term: "Minutillos", meaning: "A few minutes, with a friendly diminutive", note: "The -illo ending can make a delay sound smaller or warmer.", example: "Espérame cinco minutillos.", translation: "Wait for me five minutes or so." },
  { id: "quiosco", term: "Quiosco", meaning: "Kiosk / Small outdoor stall", note: "A useful visible landmark in many plazas.", example: "El quiosco está en una esquina de la plaza.", translation: "The kiosk is in one corner of the square." },
  { id: "ambientazo-vocab", term: "Ambientazo", meaning: "Brilliant atmosphere / Great vibe", note: "A strongly positive augmentative of ambiente.", example: "Esta noche hay ambientazo.", translation: "The atmosphere is brilliant tonight." },
  { id: "al-fresquito", term: "Al fresquito", meaning: "Somewhere pleasantly cool", note: "Especially natural on warm southern evenings.", example: "Vamos a sentarnos al fresquito.", translation: "Let's sit somewhere pleasantly cool." },
  { id: "pillar-sitio", term: "Pillar sitio", meaning: "To grab or secure a spot", note: "A common informal Spain Spanish collocation.", example: "Voy antes para pillar sitio.", translation: "I'll go early to get a spot." },
  { id: "dar-vuelta", term: "Dar una vuelta", meaning: "To have a walk / Wander around", note: "Can describe a relaxed social walk without a fixed destination.", example: "Vamos a dar una vuelta por la plaza.", translation: "Let's have a walk around the square." },
  { id: "estar-gusto", term: "Estar a gusto", meaning: "To feel comfortable or relaxed", note: "Describes physical or social comfort.", example: "Aquí estamos muy a gusto.", translation: "We're very comfortable here." },
  { id: "tomar-algo", term: "Tomar algo", meaning: "To have a drink or something to eat", note: "A flexible social-plan expression.", example: "¿Nos tomamos algo después?", translation: "Shall we grab a drink afterwards?" },
  { id: "ea", term: "Ea", meaning: "Right then / There we go", note: "A recognisable Andalusian interjection with several conversational functions.", example: "Ea, vámonos para la plaza.", translation: "Right then, let's head to the square." },
];

const highlightMap = Object.fromEntries(plazaVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return { id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation, acceptedAnswers: [item.meaning.split("/")[0].trim()], languageFrom: "spanish", languageTo: "english", difficulty: "medium", notes: item.note, starred: true };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return { id, speakerId, text, translation, vocabHighlights: highlights(phrases), messageType, audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined };
}

function breakdown(items: Array<[string, string, string?]>): NonNullable<SentenceStage["wordBreakdown"]> {
  return items.map(([source, target, note]) => ({ source, target, note }));
}

function stage(id: string, title: string, newVocab: string[], fullVocab: string[], prompt: string, targetAnswer: string, explanation: string, wordBreakdown: NonNullable<SentenceStage["wordBreakdown"]>): SentenceStage {
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers: [], explanation, wordBreakdown, audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3` };
}

const sentenceVocab = plazaVocab.map((item) => `${item.term} = ${item.meaning}`);

export const andalusianSpanishB1MeetingFriendsPlazaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "Andalusian Spanish B1: Meeting Friends in a Plaza Flashcards", subtitle: "Arrange a plaza meetup using approximate times, landmarks, location updates, friendly delay language, terraces, cooler evening spots, and spontaneous follow-up plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "plaza", "plans", "friends"], estimatedMinutes: 23,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: plazaVocab.map(cardFromVocab) },
};

export const andalusianSpanishB1MeetingFriendsPlazaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "B1 Sentence Builder: Quedamos en la Plaza", subtitle: "Build a complete friend meetup from setting the time and landmark to handling delays, finding everyone, moving to a terrace, and extending the evening.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["andalusian-spanish", "b1", "sentence-builder", "plaza"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "sentence-builder",
  data: {
    finalChallenge: "Invite friends to meet in a plaza, agree an approximate time and landmark, share a location, explain a short delay, locate the group, describe the atmosphere, secure a cool terrace spot, suggest moving, and make a follow-up plan.",
    stages: [
      stage("stage-1", "Propose the meetup", sentenceVocab.slice(0, 4), sentenceVocab.slice(34, 36), "So, shall we meet at the square later? What time works for you all? Around eight by the fountain.", "¿Qué, quedamos luego en la plaza? ¿A qué hora os viene bien? A eso de las ocho, junto a la fuente.", "The casual opener, group-friendly time question, approximation, and landmark form a complete arrangement.", breakdown([["shall we meet later in the square?", "¿quedamos luego en la plaza?"], ["what time works for you all?", "¿A qué hora os viene bien?"], ["around eight", "A eso de las ocho"], ["by the fountain", "junto a la fuente"]])),
      stage("stage-2", "Send a journey update", sentenceVocab.slice(4, 6), sentenceVocab.slice(24, 37), "I'm on my way. I'll send you my location; I'm next to the station.", "Yo voy de camino. Te paso la ubicación; estoy al lado de la estación.", "Pasar la ubicación and estar al lado de provide a clear digital and physical location update.", breakdown([["I'm on my way", "Yo voy de camino"], ["I'll send you my location", "Te paso la ubicación"], ["I'm next to", "estoy al lado de"], ["the station", "la estación"]])),
      stage("stage-3", "Explain the delay", sentenceVocab.slice(6, 10), sentenceVocab.slice(37, 39), "I got a little held up. I'll arrive in ten minutes or so. Don't move from there; you all head to the square.", "Me he entretenido un poco. Llego en diez minutillos. No os mováis de allí; tirad vosotros para la plaza.", "Minutillos softens the delay, while the two vosotros commands coordinate the group.", breakdown([["I got a little held up", "Me he entretenido un poco"], ["I'll arrive in ten minutes or so", "Llego en diez minutillos"], ["don't move from there", "No os mováis de allí"], ["you all head to the square", "tirad vosotros para la plaza"]])),
      stage("stage-4", "Find the group", sentenceVocab.slice(10, 14), sentenceVocab.slice(39, 41), "Where are you all? We're next to the kiosk. It's two steps away for me; I'll be there in no time.", "¿Dónde andáis? Estamos al lado del quiosco. Me pilla a dos pasos; en nada estoy ahí.", "Landmarks and distance expressions resolve the final arrival clearly.", breakdown([["where are you all?", "¿Dónde andáis?"], ["we're next to the kiosk", "Estamos al lado del quiosco"], ["it's two steps away for me", "Me pilla a dos pasos"], ["I'll be there in no time", "en nada estoy ahí"]])),
      stage("stage-5", "React to the plaza", sentenceVocab.slice(14, 17), sentenceVocab.slice(40, 43), "There's an amazing atmosphere. Let's sit somewhere cool. Shall I grab you all a spot on the terrace?", "Hay un ambientazo. Nos ponemos al fresquito. ¿Os pillo sitio en la terraza?", "Ambientazo celebrates the mood, while al fresquito and pillar sitio make a practical evening plan.", breakdown([["there's an amazing atmosphere", "Hay un ambientazo"], ["let's sit somewhere cool", "Nos ponemos al fresquito"], ["shall I grab you all a spot", "¿Os pillo sitio"], ["on the terrace?", "en la terraza?"]])),
      stage("stage-6", "Move somewhere better", sentenceVocab.slice(18, 20), sentenceVocab.slice(27, 33), "It's noisy here. What if we move? It's more comfortable over there.", "Aquí hay mucho ruido. ¿Y si nos cambiamos de sitio? Ahí se está más a gusto.", "¿Y si...? proposes the change gently, and impersonal se está evaluates the other place.", breakdown([["what if", "¿Y si"], ["we move somewhere else?", "nos cambiamos de sitio?"], ["over there", "Ahí"], ["it's more comfortable", "se está más a gusto"]])),
      stage("stage-7", "Take a short walk", sentenceVocab.slice(17, 18), sentenceVocab.slice(42, 45), "Shall we have a little wander around the square? The bar is only a few steps away.", "¿Damos una vueltecita por la plaza? El bar está a dos pasos.", "The diminutive vueltecita keeps the walk casual and manageable.", breakdown([["shall we have a little wander", "¿Damos una vueltecita"], ["around the square", "por la plaza?"], ["the bar is", "El bar está"], ["a few steps away", "a dos pasos"]])),
      stage("stage-8", "Confirm the evening plan", sentenceVocab.slice(20, 22), sentenceVocab.slice(43, 47), "Right then, see you there. Afterwards we'll grab a drink somewhere comfortable.", "Ea, pues allí nos vemos. Después nos tomamos algo en un sitio donde estemos a gusto.", "Ea and pues close the arrangement with Andalusian warmth before the follow-up plan.", breakdown([["right then", "Ea, pues"], ["see you there", "allí nos vemos"], ["afterwards we'll grab a drink", "Después nos tomamos algo"], ["somewhere comfortable", "en un sitio donde estemos a gusto"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "plaza-story-q1", type: "multiple-choice", prompt: "What meeting plan do Lucía and Pablo make?", options: ["Around eight by the fountain", "At noon in a museum", "At the station tomorrow", "At home after midnight"], correctAnswer: "Around eight by the fountain", explanation: "They agree on an approximate time and clear landmark.", points: 1, skillTag: "planning" },
  { id: "plaza-story-q2", type: "true-false", prompt: "True or false: Pablo is already on his way and sends his location.", options: ["True", "False"], correctAnswer: "True", explanation: "He says he is on his way and shares his location.", points: 1, skillTag: "journey" },
  { id: "plaza-story-q3", type: "multiple-choice", prompt: "Why will Pablo arrive later than expected?", options: ["He got a little held up", "The plaza is closed", "He forgot the day", "He is leaving the city"], correctAnswer: "He got a little held up", explanation: "He uses me he entretenido un poco to explain the delay.", points: 1, skillTag: "delay" },
  { id: "plaza-story-q4", type: "multiple-choice", prompt: "Where are Lucía and Marta waiting?", options: ["Next to the kiosk", "Inside a taxi", "Behind the cathedral", "At Pablo's house"], correctAnswer: "Next to the kiosk", explanation: "They change from the fountain to the nearby kiosk because it is easier to see.", points: 1, skillTag: "location" },
  { id: "plaza-story-q5", type: "true-false", prompt: "True or false: The plaza is empty and completely silent.", options: ["True", "False"], correctAnswer: "False", explanation: "Lucía says there is an amazing atmosphere.", points: 1, skillTag: "atmosphere" },
  { id: "plaza-story-q6", type: "multiple-choice", prompt: "What does Pablo offer to secure?", options: ["A terrace table in a cooler spot", "Concert tickets", "A hotel room", "A parking fine"], correctAnswer: "A terrace table in a cooler spot", explanation: "He offers to grab a terrace spot where they can sit al fresquito.", points: 1, skillTag: "terrace" },
  { id: "plaza-story-q7", type: "multiple-choice", prompt: "Why do they consider moving?", options: ["Their first spot is noisy and warm", "They dislike each other", "The square is too far away", "It starts snowing"], correctAnswer: "Their first spot is noisy and warm", explanation: "They see a more comfortable place under the trees.", points: 1, skillTag: "decision" },
  { id: "plaza-story-q8", type: "true-false", prompt: "True or false: They decide the other side of the plaza is more comfortable.", options: ["True", "False"], correctAnswer: "True", explanation: "They explicitly say ahí se está más a gusto.", points: 1, skillTag: "comfort" },
  { id: "plaza-story-q9", type: "multiple-choice", prompt: "What do the friends do before having a drink?", options: ["Take a little wander around the plaza", "Go straight home", "Catch a train", "Buy groceries"], correctAnswer: "Take a little wander around the plaza", explanation: "They decide on a vueltecita first.", points: 1, skillTag: "activity" },
  { id: "plaza-story-q10", type: "multiple-choice", prompt: "How does the plan end?", options: ["They meet at the new spot and will grab a drink", "They cancel the evening", "Pablo never arrives", "They leave without speaking"], correctAnswer: "They meet at the new spot and will grab a drink", explanation: "The final messages confirm the new location and follow-up plan.", points: 1, skillTag: "resolution" },
];

export const andalusianSpanishB1MeetingFriendsPlazaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "Andalusian B1 Story: De la Fuente a la Terraza", subtitle: "Lucía and Pablo arrange a plaza meetup, manage a friendly delay, locate each other by the kiosk, move somewhere cooler, and extend the evening.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "story", "plaza", "friends"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "english",
    characters: [
      { id: "lucia", name: "Lucía", initials: "L", side: "right", color: "blue" },
      { id: "pablo", name: "Pablo", initials: "P", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "lucia", "¿Qué, quedamos luego en la plaza? Marta también se apunta.", "So, shall we meet in the square later? Marta is joining too.", ["¿Qué, quedamos luego en la plaza?", "¿Qué...?"]),
      message("m2", "pablo", "Claro. ¿A qué hora os viene bien?", "Of course. What time works for you all?", ["¿A qué hora os viene bien?", "Venirle bien a alguien"]),
      message("m3", "lucia", "A eso de las ocho, junto a la fuente grande.", "Around eight, by the large fountain.", ["A eso de las ocho", "Junto a la fuente", "A eso de..."], "voice-note"),
      message("m4", "pablo", "Perfecto. Yo voy de camino desde casa.", "Perfect. I'm on my way from home.", ["Yo voy de camino"]),
      message("m5", "lucia", "¿Sabes cuál es la fuente? Si no, te paso la ubicación.", "Do you know which fountain? If not, I'll send you the location.", ["Te paso la ubicación", "Ubicación"]),
      message("m6", "pablo", "Pásamela, porfa. La plaza me pilla a dos pasos, pero hay varias fuentes.", "Send it please. The square is very close to me, but there are several fountains.", ["Me pilla a dos pasos", "A dos pasos"], "voice-note"),
      message("m7", "pablo", "Oye, me he entretenido un poco hablando con un vecino.", "Hey, I got a little held up talking to a neighbour.", ["Me he entretenido un poco", "Entretenerse"]),
      message("m8", "lucia", "No pasa nada. ¿Cuánto te queda?", "No problem. How long have you got left?", []),
      message("m9", "pablo", "Llego en diez minutillos. Tirad vosotros para la plaza.", "I'll be there in ten minutes or so. You all head to the square.", ["Llego en diez minutillos", "Tirad vosotros para la plaza", "Minutillos"]),
      message("m10", "lucia", "Ya estamos en la plaza, pero la fuente está llena de gente.", "We're already in the square, but the fountain is crowded.", ["Ya estoy en la plaza"]),
      message("m11", "pablo", "Vale. ¿Dónde andáis exactamente?", "Okay. Where exactly are you all?", ["¿Dónde andáis?"]),
      message("m12", "lucia", "Estamos al lado del quiosco. No os mováis de allí cuando llegues.", "We're next to the kiosk. Don't move from there when you arrive.", ["Estamos al lado del quiosco", "No os mováis de allí", "Quiosco"], "voice-note"),
      message("m13", "pablo", "Ya veo el quiosco. En nada estoy ahí.", "I can see the kiosk now. I'll be there in no time.", ["En nada estoy ahí", "Quiosco"]),
      message("m14", "lucia", "¡Aquí! Estamos debajo del árbol.", "Over here! We're under the tree.", ["¡Aquí!"]),
      message("m15", "pablo", "¡Hombre, por fin! La plaza está llenísima.", "There you are at last! The square is absolutely packed.", ["¡Hombre, por fin!"]),
      message("m16", "lucia", "Sí, hay un ambientazo esta noche.", "Yes, there's an amazing atmosphere tonight.", ["Hay un ambientazo", "Ambientazo"]),
      message("m17", "pablo", "¿Qué, nos quedamos aquí o buscamos una mesa?", "So, do we stay here or look for a table?", ["¿Qué, nos quedamos aquí?", "¿Qué...?"]),
      message("m18", "lucia", "Mejor nos ponemos al fresquito. Aquí todavía hace calor.", "Better to sit somewhere cool. It's still warm here.", ["Nos ponemos al fresquito", "Al fresquito"], "voice-note"),
      message("m19", "pablo", "Mira, en la terraza de enfrente hay una mesa libre.", "Look, there's a free table on the terrace opposite.", ["Mira...", "En la terraza"]),
      message("m20", "lucia", "¿Os pillo sitio en la terraza mientras viene Marta?", "Shall I get you all a terrace spot while Marta arrives?", ["¿Os pillo sitio en la terraza?", "Pillar sitio", "En la terraza"]),
      message("m21", "pablo", "Sí, porfa. Yo espero a Marta al lado del quiosco.", "Yes, please. I'll wait for Marta next to the kiosk.", ["Estoy al lado de...", "Quiosco"]),
      message("m22", "lucia", "Esta mesa está cerca de los músicos y hay mucho ruido.", "This table is close to the musicians and it's very noisy.", []),
      message("m23", "pablo", "Pues al otro lado hay árboles y corre más aire.", "Well, on the other side there are trees and more breeze.", ["Pues..."]),
      message("m24", "lucia", "¿Y si nos cambiamos de sitio? Ahí se está más a gusto.", "What if we move? It's more comfortable over there.", ["¿Y si nos cambiamos de sitio?", "Ahí se está más a gusto", "Estar a gusto"], "voice-note"),
      message("m25", "pablo", "Buena idea. Marta ya ha llegado también.", "Good idea. Marta has arrived too.", []),
      message("m26", "lucia", "Antes de sentarnos, ¿damos una vueltecita por la plaza?", "Before sitting down, shall we have a little wander around the square?", ["Damos una vueltecita", "Dar una vuelta"]),
      message("m27", "pablo", "Sí. El puesto de helados está a dos pasos.", "Yes. The ice cream stand is just a few steps away.", ["A dos pasos"]),
      message("m28", "lucia", "Después nos tomamos algo en la terraza nueva.", "Afterwards we'll grab a drink on the new terrace.", ["Después nos tomamos algo", "Tomar algo", "En la terraza"]),
      message("m29", "pablo", "Y allí estaremos al fresquito y más a gusto.", "And there we'll be cooler and more comfortable.", ["Al fresquito", "Estar a gusto"]),
      message("m30", "lucia", "Ea, pues allí nos vemos después de la vueltecita.", "Right then, see you there after the little wander.", ["Ea, pues allí nos vemos", "Ea", "Damos una vueltecita"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `andalusian-plaza-meetup-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: plazaVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: plazaVocab.map((item) => item.term),
      grammarPatterns: ["Group planning with os and vosotros commands.", "Approximate time with a eso de and friendly diminutives such as minutillos.", "Place evaluation with impersonal se está and convenience with me pilla."],
      speakingPrompts: ["Arrange a meeting time and landmark.", "Explain a short delay and share your location.", "Locate friends using a plaza landmark.", "Suggest a cooler place, short walk, and drink afterwards."],
    },
    completionTask: { title: "Arrange a plaza meetup", instructions: "Record a 75-second voice message. Suggest the plaza, agree a time and landmark, give a journey update, explain a delay, locate your friends, react to the atmosphere, choose a comfortable terrace, and suggest what to do afterwards." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Un plan informal puede empezar con «¿qué, quedamos luego en la plaza?». Ese «¿qué...?» convierte la propuesta en algo espontáneo. Después, «¿a qué hora os viene bien?» busca una hora cómoda para varias personas. «A eso de las ocho» no fija las ocho en punto, sino una hora aproximada.", translation: "A casual plaza plan begins with a spontaneous proposal and an approximate group-friendly time.", highlights: highlights(["¿Qué, quedamos luego en la plaza?", "¿Qué...?", "¿A qué hora os viene bien?", "Venirle bien a alguien", "A eso de las ocho", "A eso de..."]), shadowLine: "¿Qué, quedamos luego en la plaza? ¿A qué hora os viene bien?" },
  { id: "p2", text: "Para evitar confusiones, «junto a la fuente» utiliza un punto visible como referencia. Si hay varias fuentes, «te paso la ubicación» comparte un punto exacto en el mapa. Al salir de casa, «yo voy de camino» informa al grupo de que el desplazamiento ya ha empezado.", translation: "The group uses a landmark, a location pin, and an on-my-way update.", highlights: highlights(["Junto a la fuente", "Te paso la ubicación", "Ubicación", "Yo voy de camino"]), shadowLine: "Yo voy de camino. Te paso la ubicación." },
  { id: "p3", text: "Un pequeño retraso se puede explicar con «me he entretenido un poco». La frase sugiere que algo te distrajo o te retuvo brevemente. «Llego en diez minutillos» añade el diminutivo «minutillos», que hace la espera más cercana y menos dramática. Mientras tanto, «tirad vosotros para la plaza» permite que el grupo avance.", translation: "A friendly delay explanation uses entretenido, minutillos, and a group command.", highlights: highlights(["Me he entretenido un poco", "Entretenerse", "Llego en diez minutillos", "Minutillos", "Tirad vosotros para la plaza"]), shadowLine: "Me he entretenido un poco. Llego en diez minutillos." },
  { id: "p4", text: "Al acercarte, «¿dónde andáis?» pregunta por el paradero de tus amigos. La respuesta «estamos al lado del quiosco» utiliza otro punto visible. Si la plaza está cerca, «me pilla a dos pasos» expresa que te resulta muy conveniente, y «en nada estoy ahí» promete una llegada casi inmediata.", translation: "The friends locate one another with a kiosk landmark and very-short-distance expressions.", highlights: highlights(["¿Dónde andáis?", "Estamos al lado del quiosco", "Quiosco", "Me pilla a dos pasos", "A dos pasos", "En nada estoy ahí"]), shadowLine: "¿Dónde andáis? Estamos al lado del quiosco." },
  { id: "p5", text: "Al llegar, «¡hombre, por fin!» recibe con humor a quien venía tarde. Si la plaza está animada, «hay un ambientazo» elogia la energía del lugar. En una noche cálida, «nos ponemos al fresquito» propone sentarse donde corre el aire y baja la temperatura.", translation: "Arrival brings a friendly reaction, praise for the atmosphere, and a search for cooler evening air.", highlights: highlights(["¡Hombre, por fin!", "Hay un ambientazo", "Ambientazo", "Nos ponemos al fresquito", "Al fresquito"]), shadowLine: "Hay un ambientazo. Nos ponemos al fresquito." },
  { id: "p6", text: "«¿Os pillo sitio en la terraza?» ofrece asegurar una mesa exterior para el grupo. «Pillar sitio» es informal y práctico. Si la primera mesa tiene demasiado ruido, «¿y si nos cambiamos de sitio?» propone una alternativa con suavidad. «Ahí se está más a gusto» explica que el otro lugar resulta más cómodo.", translation: "The group secures an outdoor table and gently proposes moving to a more comfortable place.", highlights: highlights(["¿Os pillo sitio en la terraza?", "Pillar sitio", "En la terraza", "¿Y si nos cambiamos de sitio?", "Ahí se está más a gusto", "Estar a gusto"]), shadowLine: "¿Y si nos cambiamos de sitio? Ahí se está más a gusto." },
  { id: "p7", text: "Una plaza invita a continuar sin un horario rígido. «Damos una vueltecita» sugiere un paseo corto y relajado. La «vueltecita» puede pasar por un quiosco, un puesto o una calle cercana. Después, «nos tomamos algo» abre la posibilidad de pedir una bebida o una comida ligera.", translation: "A relaxed wander can lead naturally to a drink or light bite.", highlights: highlights(["Damos una vueltecita", "Dar una vuelta", "Quiosco", "Después nos tomamos algo", "Tomar algo"]), shadowLine: "Damos una vueltecita y después nos tomamos algo." },
  { id: "p8", text: "Para cerrar el acuerdo, «ea, pues allí nos vemos» combina dos elementos muy conversacionales. «Ea» puede señalar aceptación o conclusión, y «pues» conecta la decisión con lo hablado. El resultado no es solo una cita práctica: es una tarde flexible, al aire libre y adaptada al ritmo del grupo.", translation: "Ea and pues close the arrangement with a flexible, sociable Andalusian rhythm.", highlights: highlights(["Ea, pues allí nos vemos", "Ea", "Pues..."]), shadowLine: "Ea, pues allí nos vemos." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "plaza-reading-q1", type: "multiple-choice", prompt: "What does “a eso de las ocho” communicate?", options: ["An approximate time around eight", "Exactly eight with no flexibility", "Eight days later", "A location near a fountain"], correctAnswer: "An approximate time around eight", explanation: "A eso de makes a time approximate.", points: 1, skillTag: "time" },
  { id: "plaza-reading-q2", type: "multiple-choice", prompt: "What nuance does “minutillos” add?", options: ["A friendly diminutive that softens the delay", "A formal legal meaning", "A much longer wait", "Anger at the group"], correctAnswer: "A friendly diminutive that softens the delay", explanation: "The -illo ending makes the delay sound smaller and warmer.", points: 1, skillTag: "nuance" },
  { id: "plaza-reading-q3", type: "true-false", prompt: "True or false: “al fresquito” means sitting somewhere pleasantly cool on a warm evening.", options: ["True", "False"], correctAnswer: "True", explanation: "It evokes comfortable cool air, not freezing weather.", points: 1, skillTag: "culture" },
  { id: "plaza-reading-q4", type: "order-words", prompt: "Order the proposal to change places.", nativePrompt: "What if we move somewhere else?", wordBank: ["¿Y", "si", "nos", "cambiamos", "de", "sitio?"], correctAnswer: "¿Y si nos cambiamos de sitio?", explanation: "¿Y si...? introduces a gentle alternative.", points: 2, skillTag: "suggestion" },
  { id: "plaza-reading-q5", type: "multiple-choice", prompt: "What is the function of “ea” in the final phrase?", options: ["It signals agreement or conclusion", "It names a drink", "It asks for directions", "It indicates a precise time"], correctAnswer: "It signals agreement or conclusion", explanation: "Ea helps move the conversation to an agreed ending.", points: 1, skillTag: "discourse" },
];

export const andalusianSpanishB1MeetingFriendsPlazaReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "Andalusian B1 Reading: Una Tarde al Fresquito", subtitle: "A synced Spanish reading about arranging a plaza meetup, friendly delays, landmarks, ambientazo, cool evening terraces, moving somewhere more comfortable, and extending the plan.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "reading", "plaza", "social plans"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: plazaVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

export const andalusianSpanishB1MeetingFriendsPlazaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "Andalusian B1 Quiz: Meeting Friends in a Plaza", subtitle: "Test meeting arrangements, times, locations, delays, group commands, plaza atmosphere, terraces, comfortable spots, walks, and follow-up plans.",
  languageTarget: "spanish", learnerNativeLanguage: "english", level: "intermediate", tags: ["Andalusian Spanish", "B1", "quiz", "plaza", "plans"], estimatedMinutes: 13,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "Choose and build natural Andalusian Spanish for arranging and enjoying a meetup in a plaza.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "plaza-quiz-q1", type: "multiple-choice", prompt: "Which phrase casually suggests meeting later in the square?", options: ["¿Qué, quedamos luego en la plaza?", "¿Dónde andáis?", "En nada estoy ahí", "Hay un ambientazo"], correctAnswer: "¿Qué, quedamos luego en la plaza?", explanation: "The casual ¿qué...? opener makes the invitation spontaneous.", points: 1, skillTag: "invitation" },
      { id: "plaza-quiz-q2", type: "multiple-choice", prompt: "How do you ask several friends what time suits them?", options: ["¿A qué hora os viene bien?", "¿Dónde quedamos?", "¿Os pillo sitio?", "¿Y si nos cambiamos?"], correctAnswer: "¿A qué hora os viene bien?", explanation: "Os refers to the group, and venir bien means suit.", points: 1, skillTag: "time" },
      { id: "plaza-quiz-q3", type: "order-words", prompt: "Order the short delay update.", nativePrompt: "I'll be there in ten minutes or so.", wordBank: ["Llego", "en", "diez", "minutillos."], correctAnswer: "Llego en diez minutillos.", explanation: "Minutillos gives the delay an informal, friendly tone.", points: 2, skillTag: "delay" },
      { id: "plaza-quiz-q4", type: "multiple-choice", prompt: "What does “¿dónde andáis?” ask?", options: ["Whereabouts are you all?", "What are you eating?", "When are you leaving?", "Why are you angry?"], correctAnswer: "Whereabouts are you all?", explanation: "Andar is used informally to locate friends.", points: 1, skillTag: "location" },
      { id: "plaza-quiz-q5", type: "true-false", prompt: "True or false: “me pilla a dos pasos” means the place is very close and convenient for me.", options: ["True", "False"], correctAnswer: "True", explanation: "A dos pasos means only a few steps away.", points: 1, skillTag: "distance" },
      { id: "plaza-quiz-q6", type: "multiple-choice", prompt: "Which phrase praises a lively plaza atmosphere?", options: ["Hay un ambientazo", "Me he entretenido", "No os mováis", "A eso de las ocho"], correctAnswer: "Hay un ambientazo", explanation: "The -azo augmentative intensifies ambiente positively.", points: 1, skillTag: "atmosphere" },
      { id: "plaza-quiz-q7", type: "multiple-choice", prompt: "What does “nos ponemos al fresquito” suggest?", options: ["Sitting somewhere pleasantly cool", "Going inside a freezer", "Cancelling the plan", "Running home"], correctAnswer: "Sitting somewhere pleasantly cool", explanation: "It is especially evocative of warm Andalusian evenings.", points: 1, skillTag: "culture" },
      { id: "plaza-quiz-q8", type: "order-words", prompt: "Order the offer to secure an outdoor spot.", nativePrompt: "Shall I grab you lot a spot on the terrace?", wordBank: ["¿Os", "pillo", "sitio", "en", "la", "terraza?"], correctAnswer: "¿Os pillo sitio en la terraza?", explanation: "Pillar sitio means secure a place.", points: 2, skillTag: "terrace" },
      { id: "plaza-quiz-q9", type: "multiple-choice", prompt: "Which phrase gently proposes moving elsewhere?", options: ["¿Y si nos cambiamos de sitio?", "No os mováis de allí", "Yo voy de camino", "Te paso la ubicación"], correctAnswer: "¿Y si nos cambiamos de sitio?", explanation: "¿Y si...? introduces a suggestion without pressure.", points: 1, skillTag: "suggestion" },
      { id: "plaza-quiz-q10", type: "true-false", prompt: "True or false: “ahí se está más a gusto” describes the other place as more comfortable.", options: ["True", "False"], correctAnswer: "True", explanation: "The impersonal se está evaluates how the place feels.", points: 1, skillTag: "comfort" },
      { id: "plaza-quiz-q11", type: "multiple-choice", prompt: "Which phrase closes the arrangement with Andalusian flavour?", options: ["Ea, pues allí nos vemos", "¿Dónde andáis?", "Junto a la fuente", "Estoy al lado de"], correctAnswer: "Ea, pues allí nos vemos", explanation: "Ea signals acceptance or conclusion.", points: 1, skillTag: "discourse" },
      { id: "plaza-quiz-q12", type: "match-pairs", prompt: "Match each phrase to its function.", pairs: [{ left: "Te paso la ubicación", right: "Share a location pin" }, { left: "Me he entretenido un poco", right: "Explain a small delay" }, { left: "En nada estoy ahí", right: "Promise a quick arrival" }], explanation: "The phrases coordinate location, delay, and arrival.", points: 3, skillTag: "functions" },
      { id: "plaza-quiz-q13", type: "match-pairs", prompt: "Match each local expression to its meaning.", pairs: [{ left: "Ambientazo", right: "Amazing atmosphere" }, { left: "Al fresquito", right: "Somewhere pleasantly cool" }, { left: "Damos una vueltecita", right: "Let's have a little wander" }], explanation: "These expressions describe the social atmosphere and relaxed evening activities.", points: 3, skillTag: "vocabulary" },
    ],
  },
};
