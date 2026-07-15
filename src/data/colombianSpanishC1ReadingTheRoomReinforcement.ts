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

const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const readingRoomVocab: VocabItem[] = [
  { id: "bien-o-que", term: "¿Bien o qué?", meaning: "All good? / You good?", note: "Very Colombian casual opener.", example: "¿Bien o qué? Te noto raro.", translation: "You good? You seem off.", starred: true },
  { id: "canson-cansona", term: "cansón / cansona", meaning: "annoying / irritating / too much", note: "Can be friendly or critical depending on tone.", example: "No seas tan cansón con ella.", translation: "Do not be so annoying with her.", starred: true },
  { id: "mamar-gallo", term: "mamar gallo", meaning: "to joke around / mess with someone", note: "Very Colombian; often means I am not being serious.", example: "Yo solo estaba mamando gallo.", translation: "I was just joking around.", starred: true },
  { id: "estar-mamando-gallo", term: "estar mamando gallo", meaning: "to be joking / winding someone up", note: "Useful for reading whether someone is serious.", example: "¿Estás mamando gallo o hablando en serio?", translation: "Are you joking or speaking seriously?", starred: true },
  { id: "recocha", term: "recocha", meaning: "banter / joking around / messing about", note: "Very Colombian social slang.", example: "La reunión empezó con mucha recocha.", translation: "The meeting started with a lot of banter.", starred: true },
  { id: "estar-de-recocha", term: "estar de recocha", meaning: "to be in a joking mood / not serious", note: "Casual and friendly.", example: "Hoy están de recocha, no te lo tomes tan personal.", translation: "Today they are joking around; do not take it so personally." },
  { id: "hablar-en-serio", term: "hablar en serio", meaning: "to speak seriously", note: "Contrasts joking with real intent.", example: "Hablemos en serio un segundo.", translation: "Let us speak seriously for a second.", starred: true },
  { id: "pilas", term: "pilas", meaning: "watch out / pay attention / be careful", note: "Very common Colombian warning or advice.", example: "Pilas con ese comentario delante del jefe.", translation: "Careful with that comment in front of the boss.", starred: true },
  { id: "fresco-fresca", term: "fresco / fresca", meaning: "chill / relax / do not worry", note: "Very Colombian softener.", example: "Fresco, no fue tan grave.", translation: "Relax, it was not that serious.", starred: true },
  { id: "no-dar-papaya", term: "no dar papaya", meaning: "do not expose yourself / do not make yourself an easy target", note: "Famous Colombian saying and street-smart advice.", example: "No des papaya contando eso en el grupo.", translation: "Do not expose yourself by saying that in the group.", starred: true },
  { id: "me-saco-la-piedra", term: "me sacó la piedra", meaning: "it really annoyed me / it pissed me off", note: "Colombian idiom for anger.", example: "Ese comentario sí me sacó la piedra.", translation: "That comment really pissed me off.", starred: true },
  { id: "intenso-intensa", term: "intenso / intensa", meaning: "too much / pushy / overly intense", note: "Common social judgment.", example: "Sonó intenso pedirle respuesta tres veces.", translation: "It sounded pushy to ask for an answer three times.", starred: true },
  { id: "no-hay-tanta-confianza", term: "no hay tanta confianza", meaning: "we are not that close / there is not that level of trust", note: "Important for register and social distance.", example: "Con ella no hay tanta confianza para ese chiste.", translation: "With her there is not enough trust for that joke.", starred: true },
  { id: "depende-del-tono", term: "depende del tono", meaning: "it depends on the tone", note: "Key phrase for indirect meaning.", example: "La frase puede sonar bien o mal; depende del tono.", translation: "The phrase can sound good or bad; it depends on the tone.", starred: true },
  { id: "me-da-cosa", term: "me da cosa", meaning: "I feel awkward / unsure about it", note: "Colombian-style softening phrase.", example: "Me da cosa escribirle tan directo.", translation: "I feel awkward writing to him so directly.", starred: true },
  { id: "que-pena", term: "qué pena", meaning: "sorry / excuse me / that is awkward", note: "Very Colombian politeness phrase.", example: "Qué pena, no quería sonar intensa.", translation: "Sorry, I did not want to sound pushy.", starred: true },
  { id: "se-paso", term: "se pasó", meaning: "he/she/it went too far", note: "Used when someone crosses a social line.", example: "Ese chiste se pasó.", translation: "That joke went too far.", starred: true },
  { id: "no-me-vengas-con-cuentos", term: "no me vengas con cuentos", meaning: "do not give me excuses / do not come at me with stories", note: "Direct and informal.", example: "No me vengas con cuentos; yo vi el chat.", translation: "Do not give me excuses; I saw the chat.", starred: true },
  { id: "dejate-de-vainas", term: "déjate de vainas", meaning: "cut it out / stop messing around / stop with that nonsense", note: "Very informal; can sound strong.", example: "Déjate de vainas y habla claro.", translation: "Cut it out and speak clearly.", starred: true },
  { id: "vaina-vainas", term: "vaina / vainas", meaning: "thing / stuff / nonsense", note: "Extremely common informal Colombian word.", example: "Esa vaina no se dice así en una reunión.", translation: "That thing is not said like that in a meeting." },
  { id: "tampoco-es-para-tanto", term: "tampoco es para tanto", meaning: "it is not that serious / it is not a big deal", note: "Used to reduce tension.", example: "Sí fue incómodo, pero tampoco es para tanto.", translation: "Yes, it was awkward, but it is not that serious.", starred: true },
  { id: "no-se-me-vaya-a-emberracar", term: "no se me vaya a emberracar", meaning: "do not go getting angry at me", note: "Playful but cautious Colombian phrasing.", example: "Le digo algo, pero no se me vaya a emberracar.", translation: "I will tell you something, but do not go getting angry at me.", starred: true },
  { id: "emberracarse", term: "emberracarse", meaning: "to get angry / pissed off", note: "Strong Colombian word.", example: "Se emberracó cuando le dijeron cansón.", translation: "He got angry when they called him annoying." },
  { id: "sapo-sapa", term: "sapo / sapa", meaning: "snitch / meddler / someone who interferes", note: "Insulting; use carefully.", example: "Le dijeron sapo por meterse en la pelea.", translation: "They called him a meddler for getting into the fight." },
  { id: "no-seas-sapo", term: "no seas sapo", meaning: "do not be a snitch / do not meddle", note: "Very informal and can be offensive.", example: "No seas sapo; eso no te toca.", translation: "Do not meddle; that is not your business." },
  { id: "se-puso-delicado", term: "se puso delicado / delicada", meaning: "he/she got touchy or sensitive", note: "Can sound dismissive depending on tone.", example: "Se puso delicado con un comentario pequeño.", translation: "He got touchy over a small comment." },
  { id: "captar-la-indirecta", term: "captar la indirecta", meaning: "to catch the hint / understand the indirect message", note: "Useful for subtle social situations.", example: "No captó la indirecta y siguió molestando.", translation: "He did not catch the hint and kept bothering her.", starred: true },
  { id: "la-indirecta", term: "la indirecta", meaning: "the hint / indirect comment", note: "Common in social tension or flirting.", example: "La indirecta era clarísima.", translation: "The hint was very clear." },
  { id: "sono-medio-pesado", term: "sonó medio pesado", meaning: "it sounded kind of harsh/heavy", note: "Natural way to soften criticism.", example: "Lo que dijiste sonó medio pesado.", translation: "What you said sounded kind of harsh.", starred: true },
  { id: "fue-de-recocha", term: "fue de recocha", meaning: "it was just banter / only a joke", note: "Good phrase for explaining intention.", example: "Fue de recocha, pero ella no lo sintió así.", translation: "It was just banter, but she did not feel it that way.", starred: true },
  { id: "mejor-bajemosle", term: "mejor bajémosle", meaning: "better tone it down / let us calm it down", note: "Very natural Colombian de-escalation phrase.", example: "Mejor bajémosle antes de que se vuelva pelea.", translation: "Let us tone it down before it becomes a fight.", starred: true },
  { id: "leyo-el-ambiente", term: "leyó el ambiente", meaning: "read the room", note: "Modern natural phrase for social awareness.", example: "Ella sí leyó el ambiente y cambió el tema.", translation: "She read the room and changed the topic.", starred: true },
  { id: "no-leyo-el-ambiente", term: "no leyó el ambiente", meaning: "he/she did not read the room", note: "Useful C1 social phrase.", example: "No leyó el ambiente y siguió con el chiste.", translation: "He did not read the room and kept the joke going.", starred: true },
  { id: "sonar-demasiado-casual", term: "sonar demasiado casual", meaning: "to sound too casual", note: "Register-awareness phrase.", example: "Con gente nueva puede sonar demasiado casual.", translation: "With new people it can sound too casual." },
  { id: "sonar-intenso", term: "sonar intenso", meaning: "to sound pushy / too much", note: "Very useful Colombian social judgment.", example: "Si insistes otra vez, vas a sonar intenso.", translation: "If you insist again, you are going to sound pushy.", starred: true },
  { id: "pasarse", term: "pasarse", meaning: "to go too far / cross the line", note: "Common spoken phrase.", example: "Una cosa es bromear y otra pasarse.", translation: "One thing is joking and another is going too far." },
  { id: "ese-chiste-se-paso", term: "ese chiste se pasó", meaning: "that joke went too far", note: "Natural social correction.", example: "Parce, ese chiste se pasó.", translation: "Mate, that joke went too far.", starred: true },
  { id: "con-gente-nueva", term: "con gente nueva", meaning: "with new people / people you do not know well", note: "Useful for explaining register and social distance.", example: "Con gente nueva, mejor no mames tanto gallo.", translation: "With new people, better not joke around so much." },
];

const highlightMap = Object.fromEntries(readingRoomVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
    difficulty: item.starred ? "hard" : "medium",
    notes: item.note,
    starred: item.starred,
    specialCharacters,
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
  acceptedAnswers: string[] = [],
): SentenceStage {
  return {
    id,
    title,
    newVocab,
    fullVocab,
    prompt,
    targetAnswer,
    acceptedAnswers,
    hints,
    explanation,
    wordBreakdown,
  };
}

export const colombianSpanishC1ReadingTheRoomFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-c1-reading-the-room-flashcards",
  title: "Colombian Spanish C1: Reading the Room Flashcards",
  subtitle: "Advanced Colombian expressions for tone, banter, boundaries, indirect hints, and social awareness.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading the room", "tone", "slang"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Reading the Room",
  relatedCourse: "colombian-spanish-c1-reading-the-room",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: readingRoomVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Bien o qué? = All good? / You good?",
  "mamar gallo = to joke around",
  "hablar en serio = to speak seriously",
  "depende del tono = it depends on the tone",
  "no hay tanta confianza = we are not that close",
  "me da cosa = I feel awkward",
  "sonó medio pesado = it sounded kind of harsh",
  "fue de recocha = it was just banter",
  "mejor bajémosle = let us tone it down",
  "leyó el ambiente = read the room",
  "no leyó el ambiente = did not read the room",
  "sonar intenso = to sound pushy",
  "no dar papaya = do not expose yourself",
  "déjate de vainas = cut it out",
  "no me vengas con cuentos = do not give me excuses",
  "con gente nueva = with new people",
];

export const colombianSpanishC1ReadingTheRoomSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-c1-reading-the-room-sentence-builder",
  title: "C1 Sentence Builder: Colombian Reading the Room",
  subtitle: "Build nuanced Colombian Spanish sentences for joking, de-escalating, and judging tone without sounding rude.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["colombian-spanish", "c1", "sentence-builder", "tone", "social nuance"],
  estimatedMinutes: 16,
  skoolSectionName: "Colombian Spanish - C1 Reading the Room",
  relatedCourse: "colombian-spanish-c1-reading-the-room",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a Colombian-style voice note explaining when a joke went too far, using tone softeners, one boundary phrase, and one de-escalation phrase.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Joke or serious?",
        sentenceVocab.slice(0, 3),
        sentenceVocab.slice(0, 3),
        "Ask: You good? Are you joking around or speaking seriously?",
        "¿Bien o qué? ¿Estás mamando gallo o hablando en serio?",
        "This sentence contrasts a casual opener with the difference between joking and speaking seriously.",
        breakdown([
          ["¿Bien o qué?", "You good?", "Colombian casual opener"],
          ["estás mamando gallo", "are you joking around", "estar + gerund for what is happening now"],
          ["o hablando en serio", "or speaking seriously"],
        ]),
        ["Start with ¿Bien o qué?", "Use estás mamando gallo"],
      ),
      stage(
        "stage-2",
        "Stage 2: Tone and trust",
        sentenceVocab.slice(3, 6),
        sentenceVocab.slice(0, 6),
        "Say: It depends on the tone; with new people there is not that much trust.",
        "Depende del tono; con gente nueva no hay tanta confianza.",
        "This explains register and social distance without attacking the person.",
        breakdown([
          ["Depende del tono", "It depends on the tone"],
          ["con gente nueva", "with new people"],
          ["no hay tanta confianza", "there is not that much trust"],
        ]),
      ),
      stage(
        "stage-3",
        "Stage 3: Soft criticism",
        sentenceVocab.slice(5, 8),
        sentenceVocab.slice(0, 8),
        "Say: I feel awkward saying it, but that sounded kind of harsh.",
        "Me da cosa decirlo, pero eso sonó medio pesado.",
        "Me da cosa softens the criticism before naming the tone problem.",
        breakdown([
          ["Me da cosa decirlo", "I feel awkward saying it"],
          ["pero", "but"],
          ["eso sonó medio pesado", "that sounded kind of harsh"],
        ]),
      ),
      stage(
        "stage-4",
        "Stage 4: Intention versus impact",
        sentenceVocab.slice(7, 10),
        sentenceVocab.slice(0, 10),
        "Say: It was just banter, but better tone it down.",
        "Fue de recocha, pero mejor bajémosle.",
        "This separates intention from impact and de-escalates.",
        breakdown([
          ["Fue de recocha", "It was just banter"],
          ["pero", "but"],
          ["mejor bajémosle", "better let us tone it down"],
        ]),
      ),
      stage(
        "stage-5",
        "Stage 5: Read the room",
        sentenceVocab.slice(9, 12),
        sentenceVocab.slice(0, 12),
        "Say: She read the room, but he did not and sounded pushy.",
        "Ella leyó el ambiente, pero él no lo leyó y sonó intenso.",
        "This stage describes social awareness and how someone came across.",
        breakdown([
          ["Ella leyó el ambiente", "She read the room"],
          ["él no lo leyó", "he did not read it"],
          ["sonó intenso", "he sounded pushy"],
        ]),
      ),
      stage(
        "stage-6",
        "Stage 6: Strong boundary",
        sentenceVocab.slice(12, 15),
        sentenceVocab.slice(0, 15),
        "Say: Do not expose yourself with that thing; cut it out and do not give me excuses.",
        "No des papaya con esa vaina; déjate de vainas y no me vengas con cuentos.",
        "This is strong, informal Colombian Spanish. Use it only with enough trust or when the situation is tense.",
        breakdown([
          ["No des papaya", "Do not expose yourself"],
          ["con esa vaina", "with that thing"],
          ["déjate de vainas", "cut it out"],
          ["no me vengas con cuentos", "do not give me excuses"],
        ]),
      ),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-c1-room-story-q1",
    type: "multiple-choice",
    prompt: "Why is Mariana worried after the work dinner?",
    options: ["Because Felipe's joke may have sounded too harsh with new people", "Because she lost her phone", "Because nobody came to dinner", "Because the food was too expensive"],
    correctAnswer: "Because Felipe's joke may have sounded too harsh with new people",
    explanation: "She says the problem is tone, trust, and reading the room with new people.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-c1-room-story-q2",
    type: "multiple-choice",
    prompt: "What does 'depende del tono' mean in the conversation?",
    options: ["The same words can land differently depending on how they are said", "The speaker is changing languages", "The dinner was too quiet", "The joke was written down"],
    correctAnswer: "The same words can land differently depending on how they are said",
    explanation: "The phrase is used to explain why social meaning changes with tone.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "colombian-c1-room-story-q3",
    type: "multiple-choice",
    prompt: "Why does Mariana say 'no hay tanta confianza'?",
    options: ["They do not know the new client well enough for that joke", "They are best friends", "They never met Felipe", "The client forgot their name"],
    correctAnswer: "They do not know the new client well enough for that joke",
    explanation: "No hay tanta confianza means the relationship is not close enough for that level of joking.",
    points: 1,
    skillTag: "social-distance",
  },
  {
    id: "colombian-c1-room-story-q4",
    type: "multiple-choice",
    prompt: "What does Mariana suggest with 'mejor bajémosle'?",
    options: ["They should tone it down and de-escalate", "They should joke more loudly", "They should cancel the project", "They should ask for more money"],
    correctAnswer: "They should tone it down and de-escalate",
    explanation: "Mejor bajémosle is used to lower the intensity before it becomes a conflict.",
    points: 1,
    skillTag: "de-escalation",
  },
  {
    id: "colombian-c1-room-story-q5",
    type: "multiple-choice",
    prompt: "What does Felipe finally understand?",
    options: ["Intention does not erase impact", "Voice notes are always rude", "Clients never joke", "Colombian slang is formal"],
    correctAnswer: "Intention does not erase impact",
    explanation: "He accepts that it may have been de recocha, but still sounded too heavy.",
    points: 1,
    skillTag: "inference",
  },
];

export const colombianSpanishC1ReadingTheRoomWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-c1-reading-the-room",
  title: "Colombian C1 Story: Reading the Room",
  subtitle: "A two-person WhatsApp story about tone, banter, indirect hints, and knowing when a joke went too far.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "WhatsApp", "reading the room", "tone"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Reading the Room",
  relatedCourse: "colombian-spanish-c1-reading-the-room-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "mariana", name: "Mariana", initials: "M", side: "right", color: "red" },
      { id: "felipe", name: "Felipe", initials: "F", side: "left", color: "blue" },
    ],
    messages: [
      message("n1", "narrator", "Guía: esta historia trabaja español colombiano C1 para leer el ambiente, manejar bromas y bajar tensión sin sonar rígido.", "Guide: this story practices C1 Colombian Spanish for reading the room, handling jokes, and lowering tension without sounding stiff.", [], "narrator"),
      message("m1", "mariana", "¿Bien o qué? ¿Llegaste bien después de la cena?", "You good? Did you get home okay after dinner?", ["¿Bien o qué?"]),
      message("m2", "felipe", "Sí, fresca. ¿Por qué? Te noto seria.", "Yes, relax. Why? You seem serious.", ["fresco / fresca"]),
      message("m3", "mariana", "Porque me da cosa decirte algo, pero creo que no leíste el ambiente.", "Because I feel awkward telling you something, but I think you did not read the room.", ["me da cosa", "no leyó el ambiente"]),
      message("m4", "felipe", "Uy, ¿por el comentario del cliente? Yo estaba mamando gallo.", "Oof, because of the client comment? I was joking around.", ["estar mamando gallo"]),
      message("m5", "mariana", "Sí, pero pilas: con gente nueva no hay tanta confianza. Depende del tono.", "Yes, but careful: with new people there is not that much trust. It depends on the tone.", ["pilas", "con gente nueva", "no hay tanta confianza", "depende del tono"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m5.mp3"),
      message("m6", "felipe", "Yo pensé que era recocha normal. Todos se estaban riendo.", "I thought it was normal banter. Everyone was laughing.", ["recocha"]),
      message("m7", "mariana", "Una cosa es estar de recocha y otra pasarse.", "One thing is being in a joking mood and another is going too far.", ["estar de recocha", "pasarse"]),
      message("m8", "felipe", "¿Tan grave sonó?", "Did it sound that bad?", []),
      message("m9", "mariana", "Sonó medio pesado. Ella se quedó callada después.", "It sounded kind of harsh. She went quiet after that.", ["sonó medio pesado"]),
      message("m10", "felipe", "Qué pena. Fue de recocha, pero no quería hacerla sentir incómoda.", "Sorry. It was just banter, but I did not want to make her feel uncomfortable.", ["qué pena", "fue de recocha"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m10.mp3"),
      message("m11", "mariana", "Yo sé. Pero cuando alguien no capta la indirecta, toca decirlo claro.", "I know. But when someone does not catch the hint, you have to say it clearly.", ["captar la indirecta", "la indirecta"]),
      message("m12", "felipe", "¿La indirecta fue cuando cambiaste el tema?", "Was the hint when you changed the topic?", ["la indirecta"]),
      message("m13", "mariana", "Exacto. Yo intenté salvarte con el tema del proyecto.", "Exactly. I tried to save you with the project topic.", []),
      message("m14", "felipe", "No la capté. Me embalé y seguí molestando.", "I did not catch it. I got carried away and kept teasing.", []),
      message("m15", "mariana", "Y ahí sonaste intenso. No malo, pero sí demasiado casual para esa mesa.", "And there you sounded pushy. Not bad, but too casual for that table.", ["sonar intenso", "sonar demasiado casual"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m15.mp3"),
      message("n2", "narrator", "Pausa: nota cómo Mariana separa intención de impacto: él quiso bromear, pero el tono y la confianza cambiaron el efecto.", "Pause: notice how Mariana separates intention from impact: he wanted to joke, but tone and trust changed the effect.", [], "narrator"),
      message("m16", "felipe", "Me sacó la piedra conmigo mismo. Quedé como cansón.", "I am annoyed at myself. I came off as annoying.", ["me sacó la piedra", "cansón / cansona"]),
      message("m17", "mariana", "Fresco. Tampoco es para tanto, pero sí mejor bajémosle para mañana.", "Relax. It is not that serious, but yes, better tone it down for tomorrow.", ["fresco / fresca", "tampoco es para tanto", "mejor bajémosle"]),
      message("m18", "felipe", "¿Crees que deba escribirle?", "Do you think I should write to her?", []),
      message("m19", "mariana", "Sí, algo simple: 'Qué pena si soné pesado, no era la idea'.", "Yes, something simple: 'Sorry if I sounded harsh, that was not the idea.'", ["qué pena", "sonó medio pesado"]),
      message("m20", "felipe", "Me da cosa, pero tienes razón. Mejor eso que dar papaya dejando la vaina rara.", "I feel awkward, but you are right. Better that than exposing myself by leaving the thing weird.", ["me da cosa", "no dar papaya", "vaina / vainas"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m20.mp3"),
      message("m21", "mariana", "Eso. Y no te me vayas a emberracar, pero también evita decirle 'sapa' a alguien nuevo.", "Exactly. And do not go getting angry at me, but also avoid calling someone a snitch when they are new.", ["no se me vaya a emberracar", "sapo / sapa"]),
      message("m22", "felipe", "Jajaja, sí, eso sí fue desubicado. Yo dije 'no seas sapo' como chiste.", "Haha, yes, that was out of place. I said 'do not meddle' as a joke.", ["no seas sapo"]),
      message("m23", "mariana", "Con amigos cercanos pasa. Con una clienta nueva, suena distinto.", "With close friends it can pass. With a new client, it sounds different.", ["con gente nueva"]),
      message("m24", "felipe", "Entonces la regla es: leer la mesa antes de soltar la recocha.", "So the rule is: read the table before dropping the banter.", ["recocha"]),
      message("m25", "mariana", "Tal cual. Si alguien se pone delicado o callado, cambias el tono.", "Exactly. If someone gets touchy or quiet, you change the tone.", ["se puso delicado / delicada", "depende del tono"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m25.mp3"),
      message("m26", "felipe", "Listo. Y si mañana intento justificarme demasiado, me dices: no me vengas con cuentos.", "Done. And if tomorrow I try to justify myself too much, tell me: do not give me excuses.", ["no me vengas con cuentos"]),
      message("m27", "mariana", "O déjate de vainas, según el nivel de drama.", "Or cut it out, depending on the drama level.", ["déjate de vainas", "vaina / vainas"]),
      message("m28", "felipe", "Gracias por decírmelo así, sin hacerme quedar como monstruo.", "Thanks for telling me like that, without making me look like a monster.", []),
      message("m29", "mariana", "Para eso estamos. Leer el ambiente también es saber corregir sin incendiar todo.", "That is what we are here for. Reading the room also means correcting without setting everything on fire.", ["leyó el ambiente"]),
      message("m30", "felipe", "Mañana escribo corto, bajo el tono y hablo en serio. Cero cuentos.", "Tomorrow I will write briefly, lower the tone, and speak seriously. No excuses.", ["hablar en serio", "depende del tono", "no me vengas con cuentos"], "voice-note", "/audio/stories/colombian-spanish-c1-reading-the-room/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "colombian-c1-room-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "colombian-c1-room-check-2", afterMessageId: "m10", question: storyQuestions[1] },
      { id: "colombian-c1-room-check-3", afterMessageId: "m15", question: storyQuestions[2] },
      { id: "colombian-c1-room-check-4", afterMessageId: "m25", question: storyQuestions[3] },
      { id: "colombian-c1-room-check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: readingRoomVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: readingRoomVocab.map((item) => item.term),
      grammarPatterns: [
        "Tone framing: depende del tono, sonó medio pesado, sonó intenso.",
        "Social distance: con gente nueva, no hay tanta confianza.",
        "Intention versus impact: fue de recocha, pero se pasó.",
        "De-escalation: fresco, tampoco es para tanto, mejor bajémosle.",
      ],
      speakingPrompts: [
        "Explain when mamar gallo is friendly and when it becomes too much.",
        "Tell someone gently that their joke went too far.",
        "Record a voice note using depende del tono, no hay tanta confianza, and mejor bajémosle.",
      ],
    },
    completionTask: {
      title: "Your C1 reading-the-room voice note",
      instructions:
        "Record a 90-second Colombian Spanish voice note explaining a moment when someone did not read the room. Use at least 12 expressions from this lesson.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "En Colombia, leer el ambiente no es solo entender las palabras. Es notar el tono, la confianza y el momento. Una persona puede decir ¿Bien o qué? con cariño, con preocupación o con ironía. Por eso, cuando alguien está mamando gallo, uno todavía tiene que preguntarse si la otra persona también está en la misma recocha. Con amigos cercanos, un comentario cansón puede sonar chistoso. Con gente nueva, puede sonar demasiado casual o medio pesado.",
    translation:
      "In Colombia, reading the room is not only understanding the words. It is noticing tone, trust, and timing. A person can say 'You good?' with affection, concern, or irony. That is why, when someone is joking around, you still have to ask whether the other person is in the same banter. With close friends, an annoying comment can sound funny. With new people, it can sound too casual or kind of harsh.",
    highlights: highlights(["leyó el ambiente", "depende del tono", "¿Bien o qué?", "estar mamando gallo", "recocha", "cansón / cansona", "con gente nueva", "sonar demasiado casual", "sonó medio pesado"]),
    shadowLine: "Leer el ambiente es entender tono, confianza y momento.",
  },
  {
    id: "p2",
    text:
      "La clave está en distinguir intención e impacto. Felipe puede decir: fue de recocha, yo solo quería mamar gallo. Pero Mariana puede responder: sí, fresco, pero ese chiste se pasó. Esa diferencia es C1 real: no basta con traducir el chiste; hay que captar la indirecta, notar si alguien se quedó callado y saber cuándo mejor bajémosle. A veces la frase más inteligente no es la más graciosa, sino la que evita que alguien se emberraque.",
    translation:
      "The key is distinguishing intention and impact. Felipe can say: it was just banter, I only wanted to joke around. But Mariana can answer: yes, relax, but that joke went too far. That difference is real C1: it is not enough to translate the joke; you have to catch the hint, notice if someone went quiet, and know when to tone it down. Sometimes the smartest phrase is not the funniest one, but the one that prevents someone from getting angry.",
    highlights: highlights(["fue de recocha", "mamar gallo", "fresco / fresca", "ese chiste se pasó", "captar la indirecta", "la indirecta", "mejor bajémosle", "emberracarse"]),
    shadowLine: "Fue de recocha, pero ese chiste se pasó.",
  },
  {
    id: "p3",
    text:
      "También importa la distancia social. No hay tanta confianza significa: todavía no tenemos permiso social para hablar así. Por eso expresiones como no seas sapo, déjate de vainas o no me vengas con cuentos pueden sonar naturales entre amigos, pero fuertes con un cliente, un jefe o alguien que acabas de conocer. No es que estén prohibidas; es que dependen del tono, de la relación y del momento.",
    translation:
      "Social distance also matters. 'There is not that much trust' means: we do not yet have the social permission to speak like that. That is why expressions like 'do not meddle,' 'cut it out,' or 'do not give me excuses' can sound natural among friends, but strong with a client, boss, or someone you just met. It is not that they are forbidden; it is that they depend on tone, relationship, and timing.",
    highlights: highlights(["no hay tanta confianza", "no seas sapo", "déjate de vainas", "no me vengas con cuentos", "depende del tono"]),
    shadowLine: "No hay tanta confianza para hablar así.",
  },
  {
    id: "p4",
    text:
      "En una conversación tensa, los suavizadores ayudan. Me da cosa decirlo permite criticar sin entrar atacando. Qué pena si soné intenso reconoce que uno pudo pasarse. Tampoco es para tanto baja la tensión, pero hay que usarlo con cuidado porque puede sonar como si minimizaras lo que la otra persona siente. La frase mejor bajémosle funciona muy bien porque invita a regular el tono entre todos, no solo a culpar a una persona.",
    translation:
      "In a tense conversation, softeners help. 'I feel awkward saying it' lets you criticize without attacking first. 'Sorry if I sounded pushy' recognizes that you may have gone too far. 'It is not that serious' lowers tension, but it must be used carefully because it can sound like you are minimizing what the other person feels. The phrase 'let us tone it down' works very well because it invites everyone to regulate the tone, not just blame one person.",
    highlights: highlights(["me da cosa", "qué pena", "sonar intenso", "pasarse", "tampoco es para tanto", "mejor bajémosle", "depende del tono"]),
    shadowLine: "Me da cosa decirlo, pero mejor bajémosle.",
  },
  {
    id: "p5",
    text:
      "Leer el ambiente también protege tu imagen. Si insistes demasiado, puedes sonar intenso. Si cuentas una vaina privada en un grupo grande, puedes dar papaya. Si te metes en una pelea que no es tuya, alguien te puede decir sapo. Y si respondes con excusas, alguien con confianza te puede decir: no me vengas con cuentos, déjate de vainas y habla en serio.",
    translation:
      "Reading the room also protects your image. If you insist too much, you can sound pushy. If you tell a private thing in a big group, you can expose yourself. If you get into a fight that is not yours, someone may call you a meddler. And if you respond with excuses, someone close enough may tell you: do not give me excuses, cut it out, and speak seriously.",
    highlights: highlights(["sonar intenso", "vaina / vainas", "no dar papaya", "sapo / sapa", "no me vengas con cuentos", "déjate de vainas", "hablar en serio"]),
    shadowLine: "No des papaya contando una vaina privada.",
  },
  {
    id: "p6",
    text:
      "La meta no es hablar perfecto ni evitar toda recocha. La meta es saber cuándo la recocha une al grupo y cuándo lo rompe. Una persona avanzada no solo sabe decir las palabras; sabe cuándo callarse, cuándo pedir perdón, cuándo decir fresco y cuándo hablar en serio. Eso es leer el ambiente: entender lo que se dijo, lo que no se dijo y lo que el tono dejó claro.",
    translation:
      "The goal is not to speak perfectly or avoid all banter. The goal is knowing when banter brings the group together and when it breaks it. An advanced speaker does not only know how to say the words; they know when to stay quiet, when to apologize, when to say relax, and when to speak seriously. That is reading the room: understanding what was said, what was not said, and what the tone made clear.",
    highlights: highlights(["recocha", "fresco / fresca", "hablar en serio", "leyó el ambiente", "depende del tono"]),
    shadowLine: "Leer el ambiente es entender lo que el tono dejó claro.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-c1-room-reading-q1",
    type: "multiple-choice",
    prompt: "What is the main idea of the reading?",
    options: ["Advanced Colombian Spanish requires reading tone, trust, and context", "All Colombian jokes are rude", "You should never use slang", "Formal Spanish is always better"],
    correctAnswer: "Advanced Colombian Spanish requires reading tone, trust, and context",
    explanation: "The reading explains that the same phrase can change meaning depending on tone, trust, and timing.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-c1-room-reading-q2",
    type: "multiple-choice",
    prompt: "Why can 'tampoco es para tanto' be risky?",
    options: ["It can sound like you are minimizing someone's feelings", "It is never Colombian", "It means someone is a snitch", "It is a greeting"],
    correctAnswer: "It can sound like you are minimizing someone's feelings",
    explanation: "The reading says this phrase lowers tension but can sound dismissive if used carelessly.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "colombian-c1-room-reading-q3",
    type: "true-false",
    prompt: "According to the reading, 'no hay tanta confianza' is about social permission and closeness.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading explicitly defines it as not yet having the social permission to speak a certain way.",
    points: 1,
    skillTag: "social-distance",
  },
  {
    id: "colombian-c1-room-reading-q4",
    type: "order-words",
    prompt: "Order the words to make the de-escalation phrase.",
    wordBank: ["Mejor", "bajémosle", "antes", "de", "que", "se", "vuelva", "pelea"],
    correctAnswer: "Mejor bajémosle antes de que se vuelva pelea",
    explanation: "This means: better tone it down before it becomes a fight.",
    points: 2,
    skillTag: "de-escalation",
  },
  {
    id: "colombian-c1-room-reading-q5",
    type: "fill-blank",
    prompt: "Complete: No des ______ contando una vaina privada.",
    nativePrompt: "Do not expose yourself by telling a private thing.",
    correctAnswer: "papaya",
    explanation: "No dar papaya means not to make yourself an easy target or expose yourself.",
    points: 1,
    skillTag: "idiom",
  },
];

export const colombianSpanishC1ReadingTheRoomReading: ReadingComprehension = {
  id: "colombian-spanish-c1-reading-the-room-reading",
  title: "Colombian C1 Reading: Leer el ambiente",
  subtitle: "A nuanced reading about tone, social distance, banter, hints, and de-escalation in Colombian Spanish.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "reading", "tone", "social nuance"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - C1 Reading the Room",
  relatedCourse: "colombian-spanish-c1-reading-the-room",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-c1-reading-the-room/full.mp3",
    audioAlignmentUrl: "/audio/readings/colombian-spanish-c1-reading-the-room/timings.json",
    paragraphs: readingParagraphs,
    glossary: readingRoomVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the C1 reading-the-room vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  readingRoomVocab.slice(0, 8),
  readingRoomVocab.slice(8, 16),
  readingRoomVocab.slice(16, 24),
  readingRoomVocab.slice(24, 32),
  readingRoomVocab.slice(32),
];

export const colombianSpanishC1ReadingTheRoomQuiz: CheckpointQuiz = {
  id: "colombian-spanish-c1-reading-the-room-quiz",
  title: "Colombian Spanish C1: Reading the Room Quiz",
  subtitle: "Practice choosing expressions for tone, trust, banter, indirect hints, and de-escalation.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Colombian Spanish", "C1", "quiz", "reading the room", "pragmatics"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - C1 Reading the Room",
  relatedCourse: "colombian-spanish-c1-reading-the-room",
  activityType: "quiz",
  data: {
    description: "Use this after the flashcards, sentence builder, story, and reading to test Colombian C1 social nuance.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-c1-room-quiz-1",
        type: "multiple-choice",
        prompt: "A coworker keeps joking with a new client who has stopped laughing. Which phrase best describes the problem?",
        options: ["No leyó el ambiente", "Fresco", "¿Bien o qué?", "A la orden"],
        correctAnswer: "No leyó el ambiente",
        explanation: "He did not read the room because the client's reaction changed.",
        points: 1,
        skillTag: "context",
      },
      {
        id: "colombian-c1-room-quiz-2",
        type: "multiple-choice",
        prompt: "Which phrase softens criticism before you say something uncomfortable?",
        options: ["Me da cosa decirlo", "No seas sapo", "Déjate de vainas", "No me vengas con cuentos"],
        correctAnswer: "Me da cosa decirlo",
        explanation: "Me da cosa decirlo prepares the other person for a delicate comment.",
        points: 1,
        skillTag: "softener",
      },
      {
        id: "colombian-c1-room-quiz-3",
        type: "fill-blank",
        prompt: "Complete: Ese chiste se ______.",
        nativePrompt: "That joke went too far.",
        correctAnswer: "pasó",
        correctAnswers: ["pasó", "paso"],
        explanation: "Se pasó means it crossed the line.",
        points: 1,
        skillTag: "idiom",
      },
      {
        id: "colombian-c1-room-quiz-4",
        type: "true-false",
        prompt: "True or false: 'No hay tanta confianza' means the relationship is not close enough for that tone.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "This phrase is about social distance and trust.",
        points: 1,
        skillTag: "social-distance",
      },
      {
        id: "colombian-c1-room-quiz-5",
        type: "order-words",
        prompt: "Order the words to make the register warning.",
        wordBank: ["Con", "gente", "nueva", "puede", "sonar", "demasiado", "casual"],
        correctAnswer: "Con gente nueva puede sonar demasiado casual",
        explanation: "This is a natural way to explain register risk.",
        points: 2,
        skillTag: "sentence-order",
      },
      {
        id: "colombian-c1-room-quiz-6",
        type: "multiple-choice",
        prompt: "Someone says 'I was only joking,' but the other person felt hurt. Which phrase explains intention?",
        options: ["Fue de recocha", "Me sacó la piedra", "Se puso delicado", "No dar papaya"],
        correctAnswer: "Fue de recocha",
        explanation: "Fue de recocha means it was intended as banter.",
        points: 1,
        skillTag: "intention",
      },
      {
        id: "colombian-c1-room-quiz-7",
        type: "multiple-choice",
        prompt: "Which phrase is strongest and most informal?",
        options: ["Déjate de vainas", "Depende del tono", "Me da cosa", "Qué pena"],
        correctAnswer: "Déjate de vainas",
        explanation: "Déjate de vainas can sound strong and should be used carefully.",
        points: 1,
        skillTag: "register",
      },
      {
        id: "colombian-c1-room-quiz-8",
        type: "fill-blank",
        prompt: "Complete: Mejor ______ antes de que se vuelva pelea.",
        nativePrompt: "Better tone it down before it becomes a fight.",
        correctAnswer: "bajémosle",
        correctAnswers: ["bajémosle", "bajemosle"],
        explanation: "Mejor bajémosle is a natural de-escalation phrase.",
        points: 1,
        skillTag: "de-escalation",
      },
      {
        id: "colombian-c1-room-quiz-9",
        type: "true-false",
        prompt: "True or false: 'No seas sapo' is safe and polite with a new client.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "It is very informal and can be offensive.",
        points: 1,
        skillTag: "register",
      },
      {
        id: "colombian-c1-room-quiz-10",
        type: "order-words",
        prompt: "Order the words.",
        wordBank: ["¿Estás", "mamando", "gallo", "o", "hablando", "en", "serio?"],
        correctAnswer: "¿Estás mamando gallo o hablando en serio?",
        explanation: "This asks whether someone is joking or serious.",
        points: 2,
        skillTag: "sentence-order",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`colombian-c1-room-match-${index + 1}`, `Match C1 reading-the-room expressions set ${index + 1}.`, chunk),
      ),
    ],
  },
};
