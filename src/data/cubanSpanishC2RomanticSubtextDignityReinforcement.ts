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

type VocabItem = { id: string; term: string; meaning: string; note: string; example: string; translation: string; starred?: boolean };
type Highlight = { phrase: string; meaning: string; note: string };

const courseId = "cuban-spanish-c2-advanced-romantic-subtext-dignity";
const sectionName = "Cuban Spanish - C2 Advanced Romantic Subtext and Dignity";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const romanticVocab: VocabItem[] = [
  { id: "llamas-atencion", term: "me llamas la atención", meaning: "you catch my interest / I’m attracted to you", note: "Direct but still respectful: interest without forcing intensity.", example: "Te lo digo claro: me llamas la atención.", translation: "I’ll say it clearly: you catch my interest.", starred: true },
  { id: "bajando-muela", term: "me estás bajando muela", meaning: "you’re chatting me up / flirting with me", note: "Muela can mean persuasive or flirtatious talk; tone decides whether it feels playful or fake.", example: "No sé si hablas en serio o me estás bajando muela.", translation: "I don’t know if you mean it or if you’re chatting me up.", starred: true },
  { id: "no-te-hagas-duro", term: "no te hagas el duro / la dura", meaning: "don’t play hard to get", note: "Teasing phrase that needs warmth; otherwise it can sound pushy.", example: "No te hagas la dura, yo sé que te dio risa.", translation: "Don’t play hard to get; I know it made you laugh.", starred: true },
  { id: "dame-chance", term: "dame un chance", meaning: "give me a little time / give me a chance", note: "Can ask for patience or an opportunity, depending on context.", example: "Dame un chance para explicarte bien.", translation: "Give me a little time to explain properly.", starred: true },
  { id: "vamos-suave", term: "vamos suave", meaning: "let’s take it easy / slow it down", note: "A boundary-setting phrase that keeps attraction from becoming pressure.", example: "Me gustas, pero vamos suave.", translation: "I like you, but let’s take it easy.", starred: true },
  { id: "no-te-cojas-pa-eso", term: "no te me cojas pa’ eso", meaning: "don’t take this as more than it is / don’t get carried away", note: "Warns someone not to overread a signal; very context-sensitive.", example: "Te sonreí, pero no te me cojas pa’ eso.", translation: "I smiled at you, but don’t take that as more than it is.", starred: true },
  { id: "no-te-instales", term: "no te instales", meaning: "don’t get too comfortable / don’t assume you’re already in", note: "Playful but firm: you can show interest while defending your space.", example: "Te di conversación, pero no te instales.", translation: "I talked with you, but don’t assume you’re already in.", starred: true },
  { id: "capta-senales", term: "capta las señales", meaning: "read the signals", note: "Used when someone needs to notice interest, discomfort, distance, or consent cues.", example: "Si ella se aparta, capta las señales.", translation: "If she moves away, read the signals.", starred: true },
  { id: "no-vengas-muela", term: "no me vengas con muela", meaning: "don’t come at me with smooth talk", note: "Rejects exaggerated flirting or manipulative charm.", example: "Háblame claro; no me vengas con muela.", translation: "Speak clearly; don’t come at me with smooth talk.", starred: true },
  { id: "no-pa-brete", term: "no estoy pa’ brete", meaning: "I’m not here for drama / gossip / complications", note: "Brete can be drama, conflict, gossip, or messy complications.", example: "Si esto trae chisme, no estoy pa’ brete.", translation: "If this brings gossip, I’m not here for drama.", starred: true },
  { id: "no-eches-palante", term: "no me eches pa’lante", meaning: "don’t expose me / put me on blast", note: "Requests discretion when attraction or private talk could become public.", example: "No me eches pa’lante delante de todo el mundo.", translation: "Don’t expose me in front of everyone.", starred: true },
  { id: "cuchareta", term: "que nadie meta la cuchareta", meaning: "nobody needs to stick their nose in", note: "A vivid Cuban way to protect privacy from outside meddling.", example: "Esto lo hablamos tú y yo; que nadie meta la cuchareta.", translation: "We’ll discuss this between us; nobody needs to stick their nose in.", starred: true },
  { id: "entre-nosotros", term: "esto queda entre nosotros", meaning: "this stays between us", note: "A privacy phrase; can sound intimate, serious, or protective.", example: "Lo que te dije queda entre nosotros.", translation: "What I told you stays between us.", starred: true },
  { id: "no-tires-chiste", term: "no tires esto a chiste", meaning: "don’t turn this into a joke", note: "Protects a vulnerable moment from being laughed off.", example: "Te estoy hablando en serio; no tires esto a chiste.", translation: "I’m speaking seriously; don’t turn this into a joke.", starred: true },
  { id: "no-caer-eso", term: "no quiero caer en eso", meaning: "I don’t want to go there / stoop to that", note: "Useful for refusing gossip, games, jealousy, or emotional bait.", example: "Podría responderte feo, pero no quiero caer en eso.", translation: "I could answer harshly, but I don’t want to go there.", starred: true },
  { id: "no-pa-relajo", term: "no estoy pa’ relajo", meaning: "I’m not here to mess around / play games", note: "Clearer and stronger than no estoy pa’ brete; it rejects unseriousness.", example: "Si vas a jugar, no estoy pa’ relajo.", translation: "If you’re going to play games, I’m not here for that.", starred: true },
  { id: "si-se-da", term: "si se da, se da", meaning: "if it happens naturally, it happens", note: "Low-pressure romantic phrasing; avoids forcing a connection.", example: "No hay que empujar nada: si se da, se da.", translation: "No need to push anything: if it happens naturally, it happens.", starred: true },
  { id: "das-verde", term: "si me das la verde, sigo", meaning: "if you give me the green light, I’ll continue", note: "Explicit consent-aware flirting; the other person controls whether it continues.", example: "Si me das la verde, sigo; si no, paro.", translation: "If you give me the green light, I’ll continue; if not, I stop.", starred: true },
  { id: "no-cuadra-paramos", term: "si no te cuadra, paramos", meaning: "if it doesn’t feel right to you, we stop", note: "A clean boundary and consent phrase.", example: "Vamos suave; si no te cuadra, paramos.", translation: "Let’s take it easy; if it doesn’t feel right, we stop.", starred: true },
  { id: "marca-paso", term: "tú marca el paso", meaning: "you set the pace", note: "Gives the other person control without withdrawing interest.", example: "Yo tengo interés, pero tú marca el paso.", translation: "I’m interested, but you set the pace.", starred: true },
  { id: "incomoda-paramos", term: "si te incomoda, paramos ahí", meaning: "if it makes you uncomfortable, we stop there", note: "Even clearer than general low-pressure language; names discomfort directly.", example: "Te lo digo con respeto: si te incomoda, paramos ahí.", translation: "I say it respectfully: if it makes you uncomfortable, we stop there.", starred: true },
  { id: "sin-formar-brete", term: "sin formar brete", meaning: "without creating drama / gossip", note: "Protects dignity and privacy around romantic tension.", example: "Hablemos claro, sin formar brete.", translation: "Let’s talk clearly, without creating drama.", starred: true },
  { id: "hay-quimica", term: "hay química", meaning: "there’s chemistry", note: "Simple phrase, but in C2 it appears with boundaries, subtext, and consent.", example: "No voy a negar que hay química.", translation: "I won’t deny that there’s chemistry.", starred: true },
  { id: "sin-presion", term: "sin presión", meaning: "no pressure", note: "Essential softener for ethical romantic interest.", example: "Te lo digo sin presión.", translation: "I’m saying it with no pressure.", starred: true },
];

const highlightMap = Object.fromEntries(romanticVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const storyAudioBase = `/audio/stories/${courseId}`;
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is Highlight => Boolean(item));

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

export const cubanSpanishC2RomanticSubtextDignityFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Cuban Spanish C2: Advanced Romantic Subtext and Dignity Flashcards",
  subtitle: "Cuban C2 phrases for attraction, privacy, boundaries, consent, and emotional dignity.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Cuban Spanish", "C2", "flashcards", "romance", "subtext"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: romanticVocab.map(cardFromVocab) },
};

const sentenceVocab = [
  "me llamas la atención = you catch my interest",
  "me estás bajando muela = you’re chatting me up",
  "dame un chance = give me a little time",
  "vamos suave = let’s take it easy",
  "no te me cojas pa’ eso = don’t get carried away",
  "no te instales = don’t assume you’re already in",
  "capta las señales = read the signals",
  "no me vengas con muela = don’t come with smooth talk",
  "no estoy pa’ brete = I’m not here for drama",
  "no me eches pa’lante = don’t expose me",
  "esto queda entre nosotros = this stays between us",
  "no tires esto a chiste = don’t turn this into a joke",
  "no estoy pa’ relajo = I’m not here to play games",
  "si se da, se da = if it happens naturally, it happens",
  "si me das la verde, sigo = if you give me the green light, I continue",
  "si no te cuadra, paramos = if it doesn’t feel right, we stop",
  "tú marca el paso = you set the pace",
  "si te incomoda, paramos ahí = if it makes you uncomfortable, we stop there",
  "sin formar brete = without creating drama",
  "hay química = there’s chemistry",
  "sin presión = no pressure",
];

export const cubanSpanishC2RomanticSubtextDignitySentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C2 Sentence Builder: Advanced Romantic Subtext and Dignity",
  subtitle: "Build Cuban Spanish for attraction, privacy, boundaries, and consent without pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["cuban-spanish", "c2", "sentence-builder", "romance", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a respectful Cuban Spanish voice note where you express attraction, protect privacy, and give the other person control of the pace.",
    stages: [
      stage("stage-1", "Stage 1: Name the attraction", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "I’ll be honest: you catch my interest, but give me a little time.", "Te voy a ser sincero: me llamas la atención, pero dame un chance.", "Open directly, then slow the pace.", breakdown([["I’ll be honest", "te voy a ser sincero"], ["you catch my interest", "me llamas la atención"], ["give me a little time", "dame un chance"]])),
      stage("stage-2", "Stage 2: Slow the rhythm", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "I like the vibe, but let’s take it easy. Don’t get carried away and don’t get too comfortable.", "Me gusta la vibra, pero vamos suave. No te me cojas pa’ eso y no te instales.", "This keeps attraction playful but bounded.", breakdown([["I like the vibe", "me gusta la vibra"], ["let’s take it easy", "vamos suave"], ["don’t get carried away", "no te me cojas pa’ eso"], ["don’t get too comfortable", "no te instales"]])),
      stage("stage-3", "Stage 3: Reject empty charm", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "Read the signals. Don’t come at me with smooth talk, because I’m not here for drama.", "Capta las señales. No me vengas con muela, porque no estoy pa’ brete.", "Use this when flirtation risks becoming manipulation or mess.", breakdown([["read the signals", "capta las señales"], ["don’t come with smooth talk", "no me vengas con muela"], ["I’m not here for drama", "no estoy pa’ brete"]])),
      stage("stage-4", "Stage 4: Protect privacy", sentenceVocab.slice(9, 11), sentenceVocab.slice(0, 11), "Don’t expose me. This stays between us.", "No me eches pa’lante. Esto queda entre nosotros.", "Short phrases can carry a lot of dignity and privacy.", breakdown([["don’t expose me", "no me eches pa’lante"], ["this stays", "esto queda"], ["between us", "entre nosotros"]])),
      stage("stage-5", "Stage 5: Don’t laugh off seriousness", sentenceVocab.slice(11, 13), sentenceVocab.slice(0, 13), "Don’t turn this into a joke; I’m not here to play games.", "No tires esto a chiste; no estoy pa’ relajo.", "This protects vulnerability from being mocked or minimized.", breakdown([["don’t turn this into a joke", "no tires esto a chiste"], ["I’m not here", "no estoy"], ["to play games", "pa’ relajo"]])),
      stage("stage-6", "Stage 6: Natural chemistry", sentenceVocab.slice(13, 16), sentenceVocab.slice(0, 16), "If it happens naturally, it happens. If you give me the green light, I continue; if it doesn’t feel right, we stop.", "Si se da, se da. Si me das la verde, sigo; si no te cuadra, paramos.", "This is clear, consent-aware romantic language.", breakdown([["if it happens naturally", "si se da"], ["green light", "la verde"], ["I continue", "sigo"], ["we stop", "paramos"]])),
      stage("stage-7", "Stage 7: Let them set the pace", sentenceVocab.slice(16, 18), sentenceVocab.slice(0, 18), "You set the pace. If it makes you uncomfortable, we stop there.", "Tú marca el paso. Si te incomoda, paramos ahí.", "This gives control without making the moment cold.", breakdown([["you set", "tú marca"], ["the pace", "el paso"], ["if it makes you uncomfortable", "si te incomoda"], ["we stop there", "paramos ahí"]])),
      stage("stage-8", "Stage 8: Chemistry without pressure", sentenceVocab.slice(18), sentenceVocab, "There’s chemistry, but let’s talk without creating drama and with no pressure.", "Hay química, pero hablemos sin formar brete y sin presión.", "End with attraction plus emotional responsibility.", breakdown([["there’s chemistry", "hay química"], ["without creating drama", "sin formar brete"], ["no pressure", "sin presión"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "cuban-c2-romance-story-q1", type: "multiple-choice", prompt: "After message 3, what is Daniela asking Ernesto to understand?", options: ["She noticed his interest but wants clarity", "She wants him to invite everyone", "She is angry about transport", "She wants to gossip"], correctAnswer: "She noticed his interest but wants clarity", explanation: "She says he catches her attention, but asks whether he is just bajando muela.", points: 1, skillTag: "subtext" },
  { id: "cuban-c2-romance-story-q2", type: "multiple-choice", prompt: "After message 6, what boundary does Daniela set?", options: ["Take it slowly and don’t assume too much", "Stop speaking forever", "Tell the whole group", "Make it a joke"], correctAnswer: "Take it slowly and don’t assume too much", explanation: "She says vamos suave, no te me cojas pa’ eso, and no te instales.", points: 1, skillTag: "boundaries" },
  { id: "cuban-c2-romance-story-q3", type: "multiple-choice", prompt: "After message 9, what does Ernesto promise?", options: ["To read the signals and avoid smooth talk", "To pressure her", "To post about it", "To make drama"], correctAnswer: "To read the signals and avoid smooth talk", explanation: "He says he can capta las señales and does not want to come with muela.", points: 1, skillTag: "consent" },
  { id: "cuban-c2-romance-story-q4", type: "multiple-choice", prompt: "After message 12, why does Daniela mention brete?", options: ["She wants privacy and no drama", "She wants a bigger party", "She is talking about work", "She wants him to argue"], correctAnswer: "She wants privacy and no drama", explanation: "No estoy pa’ brete means she does not want complications or gossip.", points: 1, skillTag: "privacy" },
  { id: "cuban-c2-romance-story-q5", type: "true-false", prompt: "True or false: By message 15, they agree other people should interfere.", options: ["True", "False"], correctAnswer: "False", explanation: "They say nobody should meter la cuchareta and this stays between them.", points: 1, skillTag: "gist" },
  { id: "cuban-c2-romance-story-q6", type: "multiple-choice", prompt: "After message 18, what is Daniela protecting?", options: ["A serious vulnerable moment", "A bus route", "A beach plan", "A food order"], correctAnswer: "A serious vulnerable moment", explanation: "She says not to turn it into a joke and that she is not here for games.", points: 1, skillTag: "tone" },
  { id: "cuban-c2-romance-story-q7", type: "multiple-choice", prompt: "After message 21, which phrase shows low-pressure attraction?", options: ["Si se da, se da", "No me eches pa’lante", "No tires esto a chiste", "Que nadie meta la cuchareta"], correctAnswer: "Si se da, se da", explanation: "It means if it happens naturally, it happens.", points: 1, skillTag: "phrase" },
  { id: "cuban-c2-romance-story-q8", type: "multiple-choice", prompt: "After message 24, who controls the pace?", options: ["Daniela", "The group chat", "A stranger", "Nobody"], correctAnswer: "Daniela", explanation: "Ernesto says tú marca el paso and si te incomoda, paramos ahí.", points: 1, skillTag: "consent" },
  { id: "cuban-c2-romance-story-q9", type: "multiple-choice", prompt: "After message 27, what do both people recognize?", options: ["There is chemistry but they should avoid drama", "There is no interest at all", "They should expose it publicly", "They should stop being respectful"], correctAnswer: "There is chemistry but they should avoid drama", explanation: "They mention hay química and sin formar brete.", points: 1, skillTag: "subtext" },
  { id: "cuban-c2-romance-story-q10", type: "multiple-choice", prompt: "By message 30, what is the final tone?", options: ["Mutual interest with no pressure", "Angry rejection", "Public gossip", "A joke at someone’s expense"], correctAnswer: "Mutual interest with no pressure", explanation: "They finish with sin presión and a plan to talk in person.", points: 1, skillTag: "tone" },
];

export const cubanSpanishC2RomanticSubtextDignityWhatsAppStory: WhatsAppStory = {
  id: courseId,
  title: "Cuban C2 Text Story: The Green Light",
  subtitle: "A Cuban Spanish chat about attraction, privacy, dignity, signals, consent, and romantic subtext.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Cuban Spanish", "C2", "WhatsApp", "romance", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "daniela", name: "Daniela", initials: "D", side: "left", color: "violet" },
      { id: "ernesto", name: "Ernesto", initials: "E", side: "right", color: "cyan" },
    ],
    messages: [
      message("m1", "ernesto", "Daniela, te voy a decir algo sin rodeo: me llamas la atención.", "Daniela, I’m going to tell you something directly: you catch my interest.", ["me llamas la atención"], "voice-note", `${storyAudioBase}/m1.mp3`),
      message("m2", "daniela", "Yo me di cuenta, Ernesto. Pero dime si hablas claro o si me estás bajando muela.", "I noticed, Ernesto. But tell me whether you’re speaking clearly or just chatting me up.", ["me estás bajando muela"]),
      message("m3", "ernesto", "Hablo claro. No te voy a venir con muela barata.", "I’m speaking clearly. I’m not going to come at you with cheap smooth talk.", ["no me vengas con muela"]),
      message("m4", "daniela", "Bueno, no te hagas el duro ahora, que tú fuiste quien empezó.", "Well, don’t play hard to get now, because you’re the one who started.", ["no te hagas el duro / la dura"]),
      message("m5", "ernesto", "No me hago el duro. Solo te pido: dame un chance para hacerlo bien.", "I’m not playing hard to get. I’m just asking: give me a chance to do it properly.", ["dame un chance"], "voice-note", `${storyAudioBase}/m5.mp3`),
      message("m6", "daniela", "Chance puede ser, pero vamos suave. No te me cojas pa’ eso.", "A chance maybe, but let’s take it easy. Don’t get carried away with it.", ["vamos suave", "no te me cojas pa’ eso"]),
      message("m7", "ernesto", "Tranquila, no me instalo. Una conversación no me da derecho a nada.", "Relax, I won’t assume I’m already in. One conversation doesn’t give me a right to anything.", ["no te instales"]),
      message("m8", "daniela", "Exacto. Capta las señales, porque yo soy directa cuando algo no me cuadra.", "Exactly. Read the signals, because I’m direct when something doesn’t feel right.", ["capta las señales"]),
      message("m9", "ernesto", "Eso me gusta. Si no te cuadra algo, me lo dices y yo paro.", "I like that. If something doesn’t feel right, tell me and I stop.", ["si no te cuadra, paramos"]),
      message("m10", "daniela", "Y otra cosa: no estoy pa’ brete con nadie del grupo.", "And another thing: I’m not here for drama with anyone in the group.", ["no estoy pa’ brete"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "ernesto", "Ni yo. De hecho, no quiero que nadie meta la cuchareta.", "Neither am I. Actually, I don’t want anybody sticking their nose in.", ["que nadie meta la cuchareta"]),
      message("m12", "daniela", "Bien. Porque si me echas pa’lante, se acaba la gracia.", "Good. Because if you put me on blast, the charm is over.", ["no me eches pa’lante"]),
      message("m13", "ernesto", "No te voy a echar pa’lante. Esto queda entre nosotros.", "I’m not going to expose you. This stays between us.", ["no me eches pa’lante", "esto queda entre nosotros"]),
      message("m14", "daniela", "Me gusta que lo digas así. Hay cosas que no son para el público.", "I like that you say it that way. Some things are not for the public.", ["esto queda entre nosotros"]),
      message("m15", "ernesto", "Totalmente. Si esto se habla, se habla con respeto y en privado.", "Totally. If we talk about this, we talk about it respectfully and in private.", ["esto queda entre nosotros"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "daniela", "Y no tires esto a chiste, ¿sí? A veces tú te escondes detrás del relajo.", "And don’t turn this into a joke, okay? Sometimes you hide behind joking.", ["no tires esto a chiste"]),
      message("m17", "ernesto", "Tienes razón. No quiero caer en eso, menos contigo.", "You’re right. I don’t want to go there, especially not with you.", ["no quiero caer en eso"]),
      message("m18", "daniela", "Porque yo no estoy pa’ relajo. Si hablamos, hablamos de verdad.", "Because I’m not here to play games. If we talk, we talk for real.", ["no estoy pa’ relajo"]),
      message("m19", "ernesto", "Entonces lo digo simple: si se da, se da. No voy a empujar nada.", "Then I’ll say it simply: if it happens naturally, it happens. I won’t push anything.", ["si se da, se da"]),
      message("m20", "daniela", "Eso sí me suena mejor. Menos presión, más respeto.", "That sounds better to me. Less pressure, more respect.", ["sin presión"], "voice-note", `${storyAudioBase}/m20.mp3`),
      message("m21", "ernesto", "Si me das la verde, sigo. Si no, me quedo tranquilo.", "If you give me the green light, I’ll continue. If not, I’ll stay calm.", ["si me das la verde, sigo"]),
      message("m22", "daniela", "La verde no se exige, se nota. Por eso te digo: capta las señales.", "The green light isn’t demanded; it’s noticed. That’s why I’m saying: read the signals.", ["capta las señales"]),
      message("m23", "ernesto", "Entonces tú marca el paso. Yo no voy a correr.", "Then you set the pace. I’m not going to rush.", ["tú marca el paso"]),
      message("m24", "daniela", "Y si te digo que algo me incomoda, paramos ahí.", "And if I tell you something makes me uncomfortable, we stop there.", ["si te incomoda, paramos ahí"]),
      message("m25", "ernesto", "Sin discusión. Si te incomoda, paramos ahí.", "No argument. If it makes you uncomfortable, we stop there.", ["si te incomoda, paramos ahí"]),
      message("m26", "daniela", "Mira, no voy a negar que hay química.", "Look, I’m not going to deny that there’s chemistry.", ["hay química"]),
      message("m27", "ernesto", "Yo tampoco. Pero prefiero que sea sin formar brete.", "Me neither. But I’d rather it be without creating drama.", ["sin formar brete"]),
      message("m28", "daniela", "Así sí. Algo tranquilo, sin presión y sin que nadie opine.", "That works. Something calm, no pressure, and without everyone giving opinions.", ["sin presión", "que nadie meta la cuchareta"]),
      message("m29", "ernesto", "Mañana hablamos en persona. Si se da, se da.", "Tomorrow we’ll talk in person. If it happens naturally, it happens.", ["si se da, se da"]),
      message("m30", "daniela", "Dale. Y si no se da, también quedamos bien. Esa es la idea.", "Okay. And if it doesn’t happen, we still end well. That’s the idea.", ["si se da, se da"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: [
      { id: "cuban-c2-romance-check-1", afterMessageId: "m3", question: storyQuestions[0] },
      { id: "cuban-c2-romance-check-2", afterMessageId: "m6", question: storyQuestions[1] },
      { id: "cuban-c2-romance-check-3", afterMessageId: "m9", question: storyQuestions[2] },
      { id: "cuban-c2-romance-check-4", afterMessageId: "m12", question: storyQuestions[3] },
      { id: "cuban-c2-romance-check-5", afterMessageId: "m15", question: storyQuestions[4] },
      { id: "cuban-c2-romance-check-6", afterMessageId: "m18", question: storyQuestions[5] },
      { id: "cuban-c2-romance-check-7", afterMessageId: "m21", question: storyQuestions[6] },
      { id: "cuban-c2-romance-check-8", afterMessageId: "m24", question: storyQuestions[7] },
      { id: "cuban-c2-romance-check-9", afterMessageId: "m27", question: storyQuestions[8] },
      { id: "cuban-c2-romance-check-10", afterMessageId: "m30", question: storyQuestions[9] },
    ],
    learnedVocab: romanticVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: romanticVocab.map((item) => item.term),
      grammarPatterns: [
        "Low-pressure attraction: me llamas la atención / si se da, se da / sin presión.",
        "Consent and pacing: tú marca el paso / si te incomoda, paramos ahí / si me das la verde, sigo.",
        "Privacy and dignity: esto queda entre nosotros / sin formar brete / que nadie meta la cuchareta.",
      ],
      speakingPrompts: [
        "Express attraction while giving the other person control.",
        "Set a romantic boundary without sounding cold.",
        "Ask for privacy and avoid gossip around a romantic situation.",
      ],
    },
    completionTask: {
      title: "Your Cuban romantic subtext voice note",
      instructions: "Record a 45-second respectful voice note where you show interest, protect privacy, and give the other person the option to slow down or stop.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text: "En una conversación romántica cubana, “me llamas la atención” puede abrir una puerta sin tumbarla. No es lo mismo decir interés que exigir respuesta. A nivel C2, la clave está en leer el tono: una frase puede sonar bonita, intensa o pesada según cómo se combine con “sin presión”.",
    translation: "In a Cuban romantic conversation, saying someone catches your interest can open a door without forcing it.",
    highlights: highlights(["me llamas la atención", "sin presión"]),
    shadowLine: "Me llamas la atención, pero te lo digo sin presión.",
  },
  {
    id: "p2",
    text: "También hay que distinguir entre coqueteo y muela. Si alguien dice “me estás bajando muela”, no siempre está rechazando; puede estar probando si la otra persona habla claro o solo está tirando palabras lindas. Por eso “no me vengas con muela” pide honestidad, no espectáculo.",
    translation: "The reading distinguishes between genuine flirting and empty smooth talk.",
    highlights: highlights(["me estás bajando muela", "no me vengas con muela"]),
    shadowLine: "No me vengas con muela; háblame claro.",
  },
  {
    id: "p3",
    text: "La dignidad aparece en frases como “vamos suave”, “no te me cojas pa’ eso” y “no te instales”. No cortan la química; la ordenan. Sirven para decir: puede haber interés, pero todavía no hay permiso para asumir demasiado.",
    translation: "Dignity appears in phrases that slow attraction down without killing it.",
    highlights: highlights(["vamos suave", "no te me cojas pa’ eso", "no te instales", "hay química"]),
    shadowLine: "Hay química, pero vamos suave.",
  },
  {
    id: "p4",
    text: "La privacidad también importa. “No me eches pa’lante”, “esto queda entre nosotros” y “que nadie meta la cuchareta” protegen una conversación de la mirada del grupo. En contextos románticos, exponer a alguien puede romper la confianza más rápido que una mala frase.",
    translation: "Privacy phrases protect the conversation from group pressure and gossip.",
    highlights: highlights(["no me eches pa’lante", "esto queda entre nosotros", "que nadie meta la cuchareta"]),
    shadowLine: "Esto queda entre nosotros; que nadie meta la cuchareta.",
  },
  {
    id: "p5",
    text: "El lenguaje más maduro de esta lección está en el consentimiento: “si me das la verde, sigo”, “tú marca el paso” y “si te incomoda, paramos ahí”. Estas frases mantienen el deseo, pero le quitan la presión. No se trata de sonar frío; se trata de que la otra persona pueda decir sí, no o todavía no sin perder dignidad.",
    translation: "The most mature language here is consent-aware: desire without pressure.",
    highlights: highlights(["si me das la verde, sigo", "tú marca el paso", "si te incomoda, paramos ahí", "sin presión"]),
    shadowLine: "Tú marca el paso. Si te incomoda, paramos ahí.",
  },
];

export const cubanSpanishC2RomanticSubtextDignityReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Reading: Cuban C2 Advanced Romantic Subtext and Dignity",
  subtitle: "Understand Cuban Spanish for attraction, privacy, boundaries, consent, and emotional dignity.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Cuban Spanish", "C2", "reading", "romance", "consent"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: romanticVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: [
      { id: "cuban-c2-romance-reading-q1", type: "multiple-choice", prompt: "According to the reading, what does “me llamas la atención” do when used well?", options: ["Opens a door without forcing it", "Ends the conversation", "Creates public gossip", "Means there is no attraction"], correctAnswer: "Opens a door without forcing it", explanation: "The reading says it can open a door without demanding an answer.", points: 1, skillTag: "meaning" },
      { id: "cuban-c2-romance-reading-q2", type: "multiple-choice", prompt: "What does “no me vengas con muela” ask for?", options: ["Honesty instead of empty smooth talk", "A joke in public", "A bus ticket", "More gossip"], correctAnswer: "Honesty instead of empty smooth talk", explanation: "The reading says it asks for honesty, not spectacle.", points: 1, skillTag: "tone" },
      { id: "cuban-c2-romance-reading-q3", type: "true-false", prompt: "True or false: The reading says “vamos suave” kills chemistry completely.", options: ["True", "False"], correctAnswer: "False", explanation: "It says these phrases do not kill chemistry; they organize it.", points: 1, skillTag: "subtext" },
      { id: "cuban-c2-romance-reading-q4", type: "multiple-choice", prompt: "Why are privacy phrases important in the reading?", options: ["They protect trust from group pressure", "They make the relationship public", "They avoid learning vocabulary", "They mean the person is joking"], correctAnswer: "They protect trust from group pressure", explanation: "The reading says exposing someone can break trust quickly.", points: 1, skillTag: "privacy" },
      { id: "cuban-c2-romance-reading-q5", type: "multiple-choice", prompt: "Which phrase lets the other person set the pace?", options: ["Tú marca el paso", "No me eches pa’lante", "No te instales", "No tires esto a chiste"], correctAnswer: "Tú marca el paso", explanation: "It directly means you set the pace.", points: 1, skillTag: "consent" },
    ],
  },
};

const quizQuestions: CheckpointQuestion[] = [
  { id: "cuban-c2-romance-quiz-1", type: "multiple-choice", prompt: "You want to express attraction without sounding aggressive. What fits?", options: ["Me llamas la atención", "No estoy pa’ brete", "No me eches pa’lante", "Que nadie meta la cuchareta"], correctAnswer: "Me llamas la atención", explanation: "This names interest directly but respectfully.", points: 1, skillTag: "interest" },
  { id: "cuban-c2-romance-quiz-2", type: "multiple-choice", prompt: "Someone is using exaggerated flirtatious talk and you want honesty. What fits?", options: ["No me vengas con muela", "Si se da, se da", "Tú marca el paso", "Hay química"], correctAnswer: "No me vengas con muela", explanation: "This rejects empty smooth talk.", points: 1, skillTag: "honesty" },
  { id: "cuban-c2-romance-quiz-3", type: "fill-blank", prompt: "Complete: Vamos ____.", nativePrompt: "Let’s take it easy / slow it down.", correctAnswer: "suave", explanation: "Vamos suave slows the rhythm without ending the interaction.", points: 1, skillTag: "pacing" },
  { id: "cuban-c2-romance-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "If it happens naturally, it happens.", wordBank: ["Si", "se", "da,", "se", "da"], correctAnswer: "Si se da, se da", explanation: "This phrase keeps the tone natural and low pressure.", points: 1, skillTag: "subtext" },
  { id: "cuban-c2-romance-quiz-5", type: "true-false", prompt: "True or false: “esto queda entre nosotros” is about privacy.", options: ["True", "False"], correctAnswer: "True", explanation: "It means this stays between us.", points: 1, skillTag: "privacy" },
  { id: "cuban-c2-romance-quiz-6", type: "multiple-choice", prompt: "You want to tell someone not to assume they already have romantic access. What fits?", options: ["No te instales", "Hay química", "Dame un chance", "Sin presión"], correctAnswer: "No te instales", explanation: "No te instales warns someone not to get too comfortable or assume too much.", points: 1, skillTag: "boundary" },
  { id: "cuban-c2-romance-quiz-7", type: "multiple-choice", prompt: "Someone is about to expose a private flirtation in front of friends. What do you say?", options: ["No me eches pa’lante", "Me llamas la atención", "Si se da, se da", "Capta las señales"], correctAnswer: "No me eches pa’lante", explanation: "This means don’t expose me or put me on blast.", points: 1, skillTag: "privacy" },
  { id: "cuban-c2-romance-quiz-8", type: "multiple-choice", prompt: "You want outsiders not to interfere. What fits?", options: ["Que nadie meta la cuchareta", "No te hagas el duro", "Me estás bajando muela", "Dame un chance"], correctAnswer: "Que nadie meta la cuchareta", explanation: "It means nobody needs to stick their nose in.", points: 1, skillTag: "interference" },
  { id: "cuban-c2-romance-quiz-9", type: "fill-blank", prompt: "Complete: No estoy pa’ ____.", nativePrompt: "I’m not here for drama / complications.", correctAnswer: "brete", explanation: "Brete is drama, gossip, or complications in this context.", points: 1, skillTag: "drama" },
  { id: "cuban-c2-romance-quiz-10", type: "multiple-choice", prompt: "Someone wants to continue flirting only if the other person clearly welcomes it. What fits?", options: ["Si me das la verde, sigo", "No te instales", "No tires esto a chiste", "No estoy pa’ brete"], correctAnswer: "Si me das la verde, sigo", explanation: "The green light controls whether the flirting continues.", points: 1, skillTag: "consent" },
  { id: "cuban-c2-romance-quiz-11", type: "multiple-choice", prompt: "You want to tell the other person they control the pace. What fits?", options: ["Tú marca el paso", "No te me cojas pa’ eso", "No quiero caer en eso", "Hay química"], correctAnswer: "Tú marca el paso", explanation: "This directly means you set the pace.", points: 1, skillTag: "pacing" },
  { id: "cuban-c2-romance-quiz-12", type: "true-false", prompt: "True or false: “si te incomoda, paramos ahí” gives the other person a clear stop option.", options: ["True", "False"], correctAnswer: "True", explanation: "It says if it makes you uncomfortable, we stop there.", points: 1, skillTag: "consent" },
  { id: "cuban-c2-romance-quiz-13", type: "multiple-choice", prompt: "You want to say there is attraction but avoid gossip. What fits best?", options: ["Hay química, pero sin formar brete", "No me vengas con muela y punto", "No te instales en la guagua", "Dame una jaba"], correctAnswer: "Hay química, pero sin formar brete", explanation: "This combines attraction with no drama/gossip.", points: 1, skillTag: "subtext" },
  { id: "cuban-c2-romance-quiz-14", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Don’t turn this into a joke.", wordBank: ["No", "tires", "esto", "a", "chiste"], correctAnswer: "No tires esto a chiste", explanation: "This protects a serious moment from being joked away.", points: 1, skillTag: "dignity" },
  { id: "cuban-c2-romance-quiz-15", type: "multiple-choice", prompt: "You want to stop yourself from getting pulled into games or drama. What fits?", options: ["No quiero caer en eso", "Me estás bajando muela", "No te hagas la dura", "Me llamas la atención"], correctAnswer: "No quiero caer en eso", explanation: "This means you do not want to go there or stoop to that.", points: 1, skillTag: "self-control" },
];

export const cubanSpanishC2RomanticSubtextDignityQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Cuban Spanish C2: Advanced Romantic Subtext and Dignity Quiz",
  subtitle: "Choose the right Cuban phrase for attraction, consent, privacy, drama, and emotional dignity.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Cuban Spanish", "C2", "quiz", "romance", "subtext"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: { description: "Practice Cuban C2 romantic subtext phrases in realistic emotional and social situations.", passScore: 75, feedbackMode: "immediate", questions: quizQuestions },
};
