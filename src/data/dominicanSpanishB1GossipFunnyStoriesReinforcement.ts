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

const courseId = "dominican-spanish-b1-reacting-to-gossip-and-funny-stories";
const skoolSectionName = "Dominican Spanish - B1 Reacting to Gossip and Funny Stories";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const gossipVocab: VocabItem[] = [
  { id: "que-lo-que", term: "¿Qué lo qué?", meaning: "What’s up? / What’s going on?", matchingMeaning: "what’s up?", note: "Very common Dominican informal greeting.", example: "¿Qué lo qué? ¿Qué pasó?", translation: "What’s up? What happened?", starred: true },
  { id: "dime-a-ver", term: "Dime a ver", meaning: "Tell me / Let me hear it", matchingMeaning: "tell me", note: "Use when you want someone to start the story.", example: "Dime a ver, ¿qué fue?", translation: "Tell me, what happened?", starred: true },
  { id: "y-entonces", term: "¿Y entonces?", meaning: "And then? / So what happened?", matchingMeaning: "and then?", note: "Keeps the story moving.", example: "¿Y entonces? ¿Qué dijo ella?", translation: "And then? What did she say?", starred: true },
  { id: "como-fue", term: "¿Cómo fue?", meaning: "How did it happen? / What happened?", matchingMeaning: "what happened?", note: "Ask for the details of the story.", example: "¿Cómo fue que se cayó el micrófono?", translation: "How did the microphone fall?", starred: true },
  { id: "no-relajes", term: "No relajes", meaning: "Seriously? / Don’t joke around", matchingMeaning: "seriously?", note: "Reaction when something sounds unbelievable.", example: "No relajes, ¿eso pasó de verdad?", translation: "Seriously? Did that really happen?", starred: true },
  { id: "dizque", term: "dizque", meaning: "supposedly / apparently / allegedly", matchingMeaning: "supposedly", note: "Useful when repeating gossip without fully believing it.", example: "Dizque él no sabía nada.", translation: "Supposedly he didn’t know anything.", starred: true },
  { id: "un-rebu", term: "un rebú", meaning: "a mess / commotion / chaotic situation", matchingMeaning: "a mess or commotion", note: "Dominican word for a messy, loud, confusing situation.", example: "Eso fue un rebú.", translation: "That was a mess.", starred: true },
  { id: "se-armo-un-rebu", term: "se armó un rebú", meaning: "a commotion broke out / things got chaotic", matchingMeaning: "things got chaotic", note: "Use when a calm situation suddenly turns messy.", example: "En la fiesta se armó un rebú.", translation: "At the party, things got chaotic.", starred: true },
  { id: "hablar-disparate", term: "hablar disparate", meaning: "to talk nonsense / say ridiculous things", matchingMeaning: "talk nonsense", note: "Good for calling out an exaggerated story.", example: "Tú estás hablando disparate.", translation: "You’re talking nonsense.", starred: true },
  { id: "un-embuste", term: "un embuste", meaning: "a lie / made-up story", matchingMeaning: "a lie", note: "Common Dominican word for a made-up story.", example: "Eso suena a embuste.", translation: "That sounds like a lie.", starred: true },
  { id: "no-me-vengas-embuste", term: "no me vengas con ese embuste", meaning: "don’t come to me with that nonsense/story", matchingMeaning: "don’t come to me with that lie", note: "Direct phrase when you do not believe the story.", example: "No me vengas con ese embuste.", translation: "Don’t come to me with that nonsense.", starred: true },
  { id: "coger-cuerda", term: "coger cuerda", meaning: "to get worked up / take the bait / get provoked", matchingMeaning: "get worked up", note: "Useful when someone reacts too strongly to gossip.", example: "No quiero coger cuerda.", translation: "I don’t want to get worked up.", starred: true },
  { id: "no-cojas-cuerda", term: "no cojas cuerda", meaning: "don’t get worked up / don’t take the bait", matchingMeaning: "don’t get worked up", note: "Calms someone down before gossip becomes drama.", example: "No cojas cuerda por eso.", translation: "Don’t get worked up about that.", starred: true },
  { id: "me-dio-un-pique", term: "me dio un pique", meaning: "it annoyed me / it made me angry", matchingMeaning: "it annoyed me", note: "Say this when something bothered you.", example: "Ese comentario me dio un pique.", translation: "That comment annoyed me.", starred: true },
  { id: "funir", term: "fuñir", meaning: "to bother / annoy / pester", matchingMeaning: "bother or annoy", note: "Informal and very useful when someone keeps bothering you.", example: "No me fuñas con eso.", translation: "Don’t bother me with that.", starred: true },
  { id: "estar-en-el-cuento", term: "estar en el cuento", meaning: "to know what’s going on / be in the know", matchingMeaning: "be in the know", note: "Use for someone who knows the story or gossip.", example: "Ella sí está en el cuento.", translation: "She really knows what’s going on.", starred: true },
  { id: "cuentame-bien", term: "cuéntame bien", meaning: "tell me the whole story / tell me properly", matchingMeaning: "tell me the whole story", note: "Ask for a clear version of the story.", example: "Cuéntame bien desde el principio.", translation: "Tell me the whole story from the start.", starred: true },
  { id: "una-pila", term: "una pila", meaning: "a lot / loads of", matchingMeaning: "a lot", note: "Dominican intensifier for quantity.", example: "Había una pila de gente.", translation: "There were loads of people.", starred: true },
  { id: "se-paso", term: "se pasó", meaning: "they went too far / that’s too much", matchingMeaning: "went too far", note: "Use when someone crosses the line.", example: "Ahí sí se pasó.", translation: "There they went too far.", starred: true },
  { id: "que-fuerte", term: "¡Qué fuerte!", meaning: "That’s crazy! / Wow! / That’s intense!", matchingMeaning: "that’s crazy", note: "Reaction to surprising or intense news.", example: "¡Qué fuerte! No sabía eso.", translation: "That’s crazy! I didn’t know that.", starred: true },
  { id: "y-esa-vaina", term: "¿Y esa vaina?", meaning: "What’s that about? / What the hell is that?", matchingMeaning: "what’s that about?", note: "Very informal reaction when something sounds strange.", example: "¿Y esa vaina? ¿Quién dijo eso?", translation: "What’s that about? Who said that?", starred: true },
  { id: "relajar", term: "relajar", meaning: "to joke around / mess around", matchingMeaning: "joke around", note: "Basic verb behind several Dominican reaction phrases.", example: "A mí me gusta relajar.", translation: "I like joking around.", starred: true },
  { id: "estar-relajando", term: "estar relajando", meaning: "to be joking / messing around", matchingMeaning: "be joking", note: "Use when someone is not being serious.", example: "Tú estás relajando.", translation: "You’re joking.", starred: true },
];

const highlightMap = Object.fromEntries(gossipVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = gossipVocab.map((item) => `${item.term} = ${item.meaning}`);

export const dominicanSpanishB1GossipFunnyStoriesFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Dominican Spanish B1: Reacting to Gossip & Funny Stories Flashcards",
  subtitle: "Dominican reactions for gossip, funny stories, surprise, chaos, teasing, and not getting worked up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "flashcards", "gossip", "funny stories"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: gossipVocab.map(cardFromVocab) },
};

export const dominicanSpanishB1GossipFunnyStoriesSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B1 Sentence Builder: Dominican Gossip Reactions",
  subtitle: "Build simple Dominican Spanish reactions for gossip, funny stories, surprise, and drama.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["dominican-spanish", "b1", "sentence-builder", "gossip", "stories"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 45-second Dominican Spanish voice note reacting to a funny story: ask what happened, react with surprise, and tell your friend not to get worked up.",
    stages: [
      stage("stage-1", "Open the story", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "What’s up? Tell me. And then?", "¿Qué lo qué? Dime a ver. ¿Y entonces?", "These are simple Dominican openers for asking someone to start and continue a story.", breakdown([["What’s up?", "¿Qué lo qué?"], ["Tell me", "Dime a ver"], ["And then?", "¿Y entonces?"]])),
      stage("stage-2", "Ask for details", sentenceVocab.slice(3, 5), sentenceVocab.slice(0, 5), "What happened? Seriously?", "¿Cómo fue? No relajes.", "Use ¿Cómo fue? to ask for details. No relajes reacts when the story sounds unbelievable.", breakdown([["What happened?", "¿Cómo fue?"], ["Seriously?", "No relajes"]])),
      stage("stage-3", "The rumor begins", sentenceVocab.slice(5, 8), sentenceVocab.slice(0, 8), "Supposedly, a commotion broke out at the party.", "Dizque se armó un rebú en la fiesta.", "Dizque shows you are reporting what people say. Rebú names the mess.", breakdown([["Supposedly", "Dizque"], ["a commotion broke out", "se armó un rebú"], ["at the party", "en la fiesta"]])),
      stage("stage-4", "Reject nonsense", sentenceVocab.slice(8, 11), sentenceVocab.slice(0, 11), "Don’t talk nonsense. Don’t come to me with that lie.", "No hables disparate. No me vengas con ese embuste.", "This is direct but natural when a story sounds fake.", breakdown([["Don’t talk nonsense", "No hables disparate"], ["Don’t come to me with", "No me vengas con"], ["that lie", "ese embuste"]])),
      stage("stage-5", "Stay calm", sentenceVocab.slice(11, 15), sentenceVocab.slice(0, 15), "Don’t get worked up. That annoyed me, but don’t bother me.", "No cojas cuerda. Eso me dio un pique, pero no me fuñas.", "This stage combines reaction, emotion, and a light boundary.", breakdown([["Don’t get worked up", "No cojas cuerda"], ["that annoyed me", "eso me dio un pique"], ["don’t bother me", "no me fuñas"]])),
      stage("stage-6", "Get the full story", sentenceVocab.slice(15, 18), sentenceVocab.slice(0, 18), "You are in the know, so tell me the whole story.", "Tú estás en el cuento, así que cuéntame bien.", "Estar en el cuento means knowing what happened. Cuéntame bien asks for the full version.", breakdown([["You are in the know", "Tú estás en el cuento"], ["so", "así que"], ["tell me the whole story", "cuéntame bien"]])),
      stage("stage-7", "React strongly", sentenceVocab.slice(18, 21), sentenceVocab.slice(0, 21), "There were loads of people. He went too far. That’s crazy!", "Había una pila de gente. Se pasó. ¡Qué fuerte!", "Use una pila for a lot, se pasó for too much, and ¡Qué fuerte! for surprise.", breakdown([["There were loads of people", "Había una pila de gente"], ["He went too far", "Se pasó"], ["That’s crazy!", "¡Qué fuerte!"]])),
      stage("stage-8", "Joking or serious", sentenceVocab.slice(21), sentenceVocab, "What’s that about? Are you joking or messing around?", "¿Y esa vaina? ¿Tú estás relajando o qué?", "¿Y esa vaina? reacts to something strange. Estar relajando means joking around.", breakdown([["What’s that about?", "¿Y esa vaina?"], ["Are you joking?", "¿Tú estás relajando?"], ["or what?", "¿o qué?"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "dominican-b1-gossip-story-q1", type: "multiple-choice", prompt: "After message 3, what does Mari want Junior to do?", options: ["Tell her the story", "Buy food", "Cancel a trip", "Study grammar"], correctAnswer: "Tell her the story", explanation: "Mari says Dime a ver and asks what happened at the party.", points: 1, skillTag: "gist" },
  { id: "dominican-b1-gossip-story-q2", type: "multiple-choice", prompt: "After message 6, what funny thing did Pipo bring as a gift?", options: ["An old mug with a ribbon", "A new guitar", "A birthday cake", "A pair of shoes"], correctAnswer: "An old mug with a ribbon", explanation: "Junior says the gift was an old mug with a ribbon.", points: 1, skillTag: "detail" },
  { id: "dominican-b1-gossip-story-q3", type: "true-false", prompt: "After message 9, true or false: the party became chaotic.", options: ["True", "False"], correctAnswer: "True", explanation: "Junior says se armó un rebú.", points: 1, skillTag: "chaos" },
  { id: "dominican-b1-gossip-story-q4", type: "multiple-choice", prompt: "After message 12, what does Mari think about the rumor?", options: ["It sounds like a made-up story", "It is completely boring", "It is about transport", "It is about shopping"], correctAnswer: "It sounds like a made-up story", explanation: "Mari says no me vengas con ese embuste.", points: 1, skillTag: "rumor" },
  { id: "dominican-b1-gossip-story-q5", type: "multiple-choice", prompt: "After message 15, what does Junior tell Mari not to do?", options: ["Get worked up", "Leave the chat", "Tell Pipo everything", "Sing karaoke"], correctAnswer: "Get worked up", explanation: "Junior says no cojas cuerda.", points: 1, skillTag: "calm" },
  { id: "dominican-b1-gossip-story-q6", type: "multiple-choice", prompt: "After message 18, why does Mari ask Junior for the full story?", options: ["Because he is in the know", "Because he was not at the party", "Because he forgot everything", "Because he does not like gossip"], correctAnswer: "Because he is in the know", explanation: "Mari says Junior está en el cuento.", points: 1, skillTag: "context" },
  { id: "dominican-b1-gossip-story-q7", type: "true-false", prompt: "After message 21, true or false: many people recorded the moment.", options: ["True", "False"], correctAnswer: "True", explanation: "Junior says una pila de gente was recording.", points: 1, skillTag: "detail" },
  { id: "dominican-b1-gossip-story-q8", type: "multiple-choice", prompt: "After message 24, what does Mari learn about Pipo?", options: ["He was joking around and acting dramatic", "He was angry all night", "He never arrived", "He bought a phone"], correctAnswer: "He was joking around and acting dramatic", explanation: "Junior says Pipo estaba relajando and acting like a singer.", points: 1, skillTag: "tone" },
  { id: "dominican-b1-gossip-story-q9", type: "multiple-choice", prompt: "After message 27, why does Mari want the video?", options: ["To laugh, not to create drama", "To start a fight", "To send it to a teacher", "To delete the chat"], correctAnswer: "To laugh, not to create drama", explanation: "Mari says she wants to laugh but not fuñir Pipo.", points: 1, skillTag: "purpose" },
  { id: "dominican-b1-gossip-story-q10", type: "multiple-choice", prompt: "By message 30, what is the main lesson?", options: ["Enjoy funny stories but do not turn them into drama", "Never ask questions", "Believe every rumor", "Always take the bait"], correctAnswer: "Enjoy funny stories but do not turn them into drama", explanation: "They end with laughing at the story but not forming a bigger rebú.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const dominicanSpanishB1GossipFunnyStoriesWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Dominican B1 Story: The Karaoke Gossip",
  subtitle: "Mari and Junior unpack a funny party rumor before it turns into unnecessary drama.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "WhatsApp", "gossip", "funny stories"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mari", name: "Mari", initials: "MA", side: "right", color: "violet" },
      { id: "junior", name: "Junior", initials: "JU", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "mari", "¿Qué lo qué, Junior?", "What’s up, Junior?", ["¿Qué lo qué?"]),
      message("m2", "mari", "Dime a ver, ¿qué fue lo que pasó en el cumpleaños de Laura?", "Tell me, what happened at Laura’s birthday?", ["Dime a ver"]),
      message("m3", "junior", "Ay, Mari, tú no sabes. Eso empezó tranquilo y terminó como novela.", "Oh, Mari, you have no idea. It started calmly and ended like a soap opera.", [], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "mari", "¿Y entonces? Cuéntame desde el principio.", "And then? Tell me from the beginning.", ["¿Y entonces?"]),
      message("m5", "junior", "Pipo llegó tarde, dizque porque estaba comprando un regalo fino.", "Pipo arrived late, supposedly because he was buying a fancy gift.", ["dizque"]),
      message("m6", "junior", "Pero el regalo era una taza vieja con un lazo. No relajes.", "But the gift was an old mug with a ribbon. Seriously?", ["No relajes"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "mari", "¿Cómo fue? ¿Una taza vieja?", "What happened? An old mug?", ["¿Cómo fue?"]),
      message("m8", "junior", "Sí. Y después agarró el micrófono del karaoke.", "Yes. And then he grabbed the karaoke microphone.", []),
      message("m9", "junior", "Dizque iba a cantar bonito, pero se armó un rebú.", "Supposedly he was going to sing nicely, but things got chaotic.", ["dizque", "se armó un rebú"]),
      message("m10", "mari", "¡Qué fuerte! Yo sabía que esa fiesta no iba a ser normal.", "That’s crazy! I knew that party wasn’t going to be normal.", ["¡Qué fuerte!"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "junior", "La gente empezó a decir que Pipo estaba borracho, pero eso era disparate.", "People started saying Pipo was drunk, but that was nonsense.", ["hablar disparate"]),
      message("m12", "mari", "No me vengas con ese embuste. Pipo casi no bebe.", "Don’t come to me with that lie. Pipo barely drinks.", ["no me vengas con ese embuste", "un embuste"]),
      message("m13", "junior", "Exacto. La verdad es que él estaba nervioso.", "Exactly. The truth is that he was nervous.", []),
      message("m14", "mari", "Pero si alguien dijo eso, me dio un pique.", "But if someone said that, it annoyed me.", ["me dio un pique"]),
      message("m15", "junior", "No cojas cuerda, Mari. La mitad estaba relajando.", "Don’t get worked up, Mari. Half of them were joking.", ["no cojas cuerda", "estar relajando"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "mari", "Es que a veces la gente fuñe demasiado con un chisme.", "It’s just that sometimes people bother too much with gossip.", ["fuñir"]),
      message("m17", "junior", "Sí, pero tú quieres estar en el cuento completo.", "Yeah, but you want to be fully in the know.", ["estar en el cuento"]),
      message("m18", "mari", "Obvio. Cuéntame bien, que tú estabas ahí.", "Obviously. Tell me the whole story, because you were there.", ["cuéntame bien"]),
      message("m19", "junior", "Bueno, había una pila de gente grabando.", "Well, there were loads of people recording.", ["una pila"]),
      message("m20", "mari", "¿Y Pipo siguió cantando?", "And did Pipo keep singing?", []),
      message("m21", "junior", "Sí, y ahí sí se pasó: cantó el coro mirando a la mamá de Laura.", "Yes, and there he went too far: he sang the chorus looking at Laura’s mom.", ["se pasó"], "voice-note", `${storyAudioBase}/m21.mp3`),
      message("m22", "mari", "¿Y esa vaina? ¿Él estaba relajando?", "What’s that about? Was he joking?", ["¿Y esa vaina?", "estar relajando"]),
      message("m23", "junior", "Sí, estaba relajando, pero la mamá no entendió el chiste.", "Yes, he was joking, but her mom didn’t understand the joke.", ["relajar", "estar relajando"]),
      message("m24", "mari", "No relajes. Ahí cualquiera se confunde.", "Seriously? Anyone would get confused there.", ["No relajes"]),
      message("m25", "junior", "Después Pipo explicó todo y pidió perdón.", "Then Pipo explained everything and apologized.", []),
      message("m26", "mari", "Bien. Porque si no, eso era otro rebú.", "Good. Because if not, that was another mess.", ["un rebú"]),
      message("m27", "mari", "Mándame el video, pero para reírme, no para fuñir a Pipo.", "Send me the video, but to laugh, not to bother Pipo.", ["fuñir"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "junior", "Dale. Pero no cojas cuerda con los comentarios.", "Okay. But don’t get worked up with the comments.", ["no cojas cuerda"]),
      message("m29", "mari", "Tranquilo. Yo solo quiero el cuento, no el drama.", "Relax. I only want the story, not the drama.", ["estar en el cuento"]),
      message("m30", "junior", "Exacto. Chisme con risa sí; rebú por gusto no.", "Exactly. Gossip with laughter yes; pointless drama no.", ["un rebú"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `dominican-b1-gossip-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: gossipVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: gossipVocab.map((item) => item.term),
      grammarPatterns: [
        "Story openers: ¿Qué lo qué?, Dime a ver, ¿Y entonces?, ¿Cómo fue?",
        "Reported gossip: dizque, un embuste, hablar disparate.",
        "Calm reactions: no cojas cuerda, no relajes, cuéntame bien.",
      ],
      speakingPrompts: [
        "Ask a friend to tell you a funny story.",
        "React when a rumor sounds fake.",
        "Tell someone not to get worked up about gossip.",
      ],
    },
    completionTask: {
      title: "Your Dominican B1 gossip reaction voice note",
      instructions: "Record a 45-second Dominican Spanish voice note reacting to a funny rumor. Ask what happened, react with surprise, and tell your friend not to get worked up.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Cuando un amigo trae un chisme o una historia graciosa, puedes empezar con “¿Qué lo qué?” y “Dime a ver”. Son frases simples y muy dominicanas. Abren la conversación sin sonar formal. Si quieres más detalles, puedes decir “¿Y entonces?” para que la otra persona siga hablando.", translation: "When a friend brings gossip or a funny story, you can start with ¿Qué lo qué? and Dime a ver. They are simple and very Dominican phrases. They open the conversation without sounding formal. If you want more details, you can say ¿Y entonces? so the other person keeps talking.", highlights: highlights(["¿Qué lo qué?", "Dime a ver", "¿Y entonces?"]), shadowLine: "¿Qué lo qué? Dime a ver, ¿y entonces?" },
  { id: "p2", text: "Si la historia suena rara, pregunta “¿Cómo fue?”. Esa frase pide la explicación completa. También puedes reaccionar con “No relajes” cuando algo parece imposible o demasiado gracioso. No siempre significa enojo; muchas veces es una forma de decir: ¿eso pasó de verdad?", translation: "If the story sounds strange, ask ¿Cómo fue? That phrase asks for the full explanation. You can also react with No relajes when something seems impossible or too funny. It does not always mean anger; often it means: did that really happen?", highlights: highlights(["¿Cómo fue?", "No relajes"]), shadowLine: "¿Cómo fue? No relajes." },
  { id: "p3", text: "Para contar rumores, “dizque” es muy útil. Si dices “dizque pasó algo”, no estás diciendo que lo sabes con seguridad. Solo estás repitiendo lo que otros dijeron. Cuando muchas personas hablan al mismo tiempo y nadie entiende bien, puedes decir que hubo “un rebú” o que “se armó un rebú”.", translation: "To tell rumors, dizque is very useful. If you say dizque something happened, you are not saying you know it for sure. You are only repeating what others said. When many people talk at the same time and nobody understands clearly, you can say there was a mess or things got chaotic.", highlights: highlights(["dizque", "un rebú", "se armó un rebú"]), shadowLine: "Dizque se armó un rebú." },
  { id: "p4", text: "A veces una historia parece falsa. En ese caso, puedes decir “estás hablando disparate” o “eso es un embuste”. Si quieres ser más directo, dices “no me vengas con ese embuste”. Son frases fuertes, así que úsalas con amigos o cuando el tono sea de confianza.", translation: "Sometimes a story seems false. In that case, you can say estás hablando disparate or eso es un embuste. If you want to be more direct, you say no me vengas con ese embuste. These are strong phrases, so use them with friends or when the tone is trusting.", highlights: highlights(["hablar disparate", "un embuste", "no me vengas con ese embuste"]), shadowLine: "No me vengas con ese embuste." },
  { id: "p5", text: "El chisme puede hacer que alguien “coja cuerda”. Eso significa que la persona se molesta, se provoca o se pone demasiado seria. Por eso un amigo puede decir “no cojas cuerda”. Si algo sí te molestó, puedes decir “me dio un pique”, pero sin convertir la conversación en pelea.", translation: "Gossip can make someone get worked up. That means the person gets annoyed, provoked, or too serious. That is why a friend can say no cojas cuerda. If something did annoy you, you can say me dio un pique, but without turning the conversation into a fight.", highlights: highlights(["coger cuerda", "no cojas cuerda", "me dio un pique"]), shadowLine: "No cojas cuerda, aunque te dé un pique." },
  { id: "p6", text: "También hay límites. “Fuñir” es molestar o fastidiar demasiado. Si alguien sigue con el mismo cuento todo el día, puedes decir “no me fuñas”. Pero si la persona sí sabe lo que pasó, está “en el cuento”. Entonces tiene sentido pedirle: “cuéntame bien”.", translation: "There are also limits. Fuñir means to bother or annoy too much. If someone keeps going with the same story all day, you can say no me fuñas. But if the person really knows what happened, they are in the know. Then it makes sense to ask: cuéntame bien.", highlights: highlights(["fuñir", "estar en el cuento", "cuéntame bien"]), shadowLine: "Tú estás en el cuento, así que cuéntame bien." },
  { id: "p7", text: "Para reaccionar, “una pila” significa mucho o muchos. Puedes decir “había una pila de gente”. Si alguien hizo algo demasiado fuerte, dices “se pasó”. Y si escuchas algo sorprendente, “¡Qué fuerte!” funciona muy bien como reacción corta.", translation: "To react, una pila means a lot or many. You can say había una pila de gente. If someone did something too intense, you say se pasó. And if you hear something surprising, ¡Qué fuerte! works very well as a short reaction.", highlights: highlights(["una pila", "se pasó", "¡Qué fuerte!"]), shadowLine: "Había una pila de gente. Se pasó. ¡Qué fuerte!" },
  { id: "p8", text: "Por último, “¿Y esa vaina?” sirve cuando algo suena extraño. “Relajar” significa bromear, y “estar relajando” significa que alguien está jugando o no habla en serio. En una buena historia dominicana, lo importante es escuchar, reírse y no formar un rebú por gusto.", translation: "Finally, ¿Y esa vaina? is useful when something sounds strange. Relajar means to joke around, and estar relajando means someone is joking or not speaking seriously. In a good Dominican story, the important thing is to listen, laugh, and not create drama for no reason.", highlights: highlights(["¿Y esa vaina?", "relajar", "estar relajando", "un rebú"]), shadowLine: "¿Y esa vaina? ¿Tú estás relajando?" },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "dominican-b1-gossip-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Reacting to gossip and funny stories in Dominican Spanish", "Buying fruit in a shop", "Talking about work experience", "Giving directions"], correctAnswer: "Reacting to gossip and funny stories in Dominican Spanish", explanation: "The reading explains story openers, reactions, rumors, and calming phrases.", points: 1, skillTag: "gist" },
  { id: "dominican-b1-gossip-reading-q2", type: "multiple-choice", prompt: "What does “dizque” show?", options: ["You are repeating what people say, not confirming it", "You are asking for a price", "You are inviting someone out", "You are saying goodbye"], correctAnswer: "You are repeating what people say, not confirming it", explanation: "Dizque is used for supposedly or apparently.", points: 1, skillTag: "reported-speech" },
  { id: "dominican-b1-gossip-reading-q3", type: "true-false", prompt: "True or false: “no cojas cuerda” tells someone not to get worked up.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explains that no cojas cuerda calms someone down.", points: 1, skillTag: "calm" },
  { id: "dominican-b1-gossip-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Tell me the whole story.", wordBank: ["Cuéntame", "bien."], correctAnswer: "Cuéntame bien.", explanation: "Cuéntame bien asks someone to tell the story properly.", points: 1, skillTag: "phrase-building" },
  { id: "dominican-b1-gossip-reading-q5", type: "multiple-choice", prompt: "Which phrase means someone is joking or not being serious?", options: ["Está relajando", "Me dio un pique", "Un embuste", "Una pila"], correctAnswer: "Está relajando", explanation: "Estar relajando means to be joking or messing around.", points: 1, skillTag: "meaning" },
];

export const dominicanSpanishB1GossipFunnyStoriesReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Dominican B1 Reading: Dime a Ver el Chisme",
  subtitle: "A synced Spanish reading about reacting to gossip, funny stories, rumors, surprise, and not getting worked up.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "reading", "gossip", "funny stories"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: gossipVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Dominican B1 gossip and funny stories vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const dominicanSpanishB1GossipFunnyStoriesQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Dominican Spanish B1: Reacting to Gossip & Funny Stories Quiz",
  subtitle: "Choose the right Dominican phrase for asking about stories, reacting to rumors, and calming drama.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "intermediate",
  tags: ["Dominican Spanish", "B1", "quiz", "gossip", "funny stories"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Dominican B1 phrases for funny stories, surprise, rumors, chaos, and not getting worked up.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "dominican-b1-gossip-quiz-1", type: "multiple-choice", prompt: "You want your friend to start telling the story. What do you say?", options: ["Dime a ver", "Se pasó", "No me fuñas", "Una pila"], correctAnswer: "Dime a ver", explanation: "Dime a ver means tell me or let me hear it.", points: 1, skillTag: "opener" },
      { id: "dominican-b1-gossip-quiz-2", type: "fill-blank", prompt: "Complete: ¿Y ____?", nativePrompt: "And then?", correctAnswer: "entonces", explanation: "¿Y entonces? keeps the story moving.", points: 1, skillTag: "story-flow" },
      { id: "dominican-b1-gossip-quiz-3", type: "multiple-choice", prompt: "A story sounds fake. Which phrase fits?", options: ["No me vengas con ese embuste", "Estoy en el cuento", "Había una pila", "Dime a ver"], correctAnswer: "No me vengas con ese embuste", explanation: "This means don’t come to me with that made-up story.", points: 1, skillTag: "doubt" },
      { id: "dominican-b1-gossip-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t get worked up.", wordBank: ["No", "cojas", "cuerda."], correctAnswer: "No cojas cuerda.", explanation: "No cojas cuerda tells someone not to get provoked.", points: 1, skillTag: "calm" },
      { id: "dominican-b1-gossip-quiz-5", type: "true-false", prompt: "True or false: “dizque” means supposedly or apparently.", options: ["True", "False"], correctAnswer: "True", explanation: "Dizque is used when repeating something people say.", points: 1, skillTag: "rumor" },
      { id: "dominican-b1-gossip-quiz-6", type: "multiple-choice", prompt: "A party suddenly becomes chaotic. Which phrase fits?", options: ["Se armó un rebú", "Cuéntame bien", "No relajes", "Está relajando"], correctAnswer: "Se armó un rebú", explanation: "Se armó un rebú means things got chaotic.", points: 1, skillTag: "chaos" },
      { id: "dominican-b1-gossip-quiz-7", type: "fill-blank", prompt: "Complete: Eso me dio un ____.", nativePrompt: "That annoyed me.", correctAnswer: "pique", explanation: "Me dio un pique means it annoyed me or made me angry.", points: 1, skillTag: "emotion" },
      { id: "dominican-b1-gossip-quiz-8", type: "multiple-choice", prompt: "Someone knows the whole situation. Which phrase fits?", options: ["Está en el cuento", "Está hablando disparate", "Se pasó", "No relajes"], correctAnswer: "Está en el cuento", explanation: "Estar en el cuento means to be in the know.", points: 1, skillTag: "context" },
      { id: "dominican-b1-gossip-quiz-9", type: "true-false", prompt: "True or false: “una pila” can mean a lot or loads of something.", options: ["True", "False"], correctAnswer: "True", explanation: "Una pila is a Dominican way to say a lot.", points: 1, skillTag: "quantity" },
      { id: "dominican-b1-gossip-quiz-10", type: "multiple-choice", prompt: "Your friend is clearly joking. Which phrase fits?", options: ["Está relajando", "Me dio un pique", "Un embuste", "No cojas cuerda"], correctAnswer: "Está relajando", explanation: "Estar relajando means the person is joking or messing around.", points: 1, skillTag: "joking" },
      pairQuestion("dominican-b1-gossip-pairs-1", "Match story opener and reaction phrases.", gossipVocab.slice(0, 8)),
      pairQuestion("dominican-b1-gossip-pairs-2", "Match rumor, drama, and annoyance phrases.", gossipVocab.slice(8, 16)),
      pairQuestion("dominican-b1-gossip-pairs-3", "Match story-detail and funny reaction phrases.", gossipVocab.slice(16)),
    ],
  },
};
