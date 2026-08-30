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

const courseId = "mexican-spanish-c2-advanced-ethical-attraction-seduction";
const skoolSectionName = "Mexican Spanish - C2 Advanced Ethical Attraction and Seduction";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const attractionVocab: VocabItem[] = [
  { id: "tirar-la-onda", term: "tirar la onda", meaning: "to flirt with someone / show romantic interest", matchingMeaning: "to flirt with someone", note: "Common Mexican phrase for showing romantic interest; tone depends on context.", example: "No sé si me está tirando la onda o solo es amable.", translation: "I don’t know if they’re flirting with me or just being friendly.", starred: true },
  { id: "me-estas-tirando-la-onda", term: "me estás tirando la onda", meaning: "you’re flirting with me", matchingMeaning: "you’re flirting with me", note: "Direct, playful way to name the flirtation.", example: "A ver, ¿me estás tirando la onda?", translation: "Wait, are you flirting with me?", starred: true },
  { id: "me-moviste-el-tapete", term: "me moviste el tapete", meaning: "you really got to me / you stirred something in me", matchingMeaning: "you really stirred something in me", note: "Figurative and emotionally loaded; stronger than simply liking someone.", example: "No lo esperaba, pero me moviste el tapete.", translation: "I wasn’t expecting it, but you really got to me.", starred: true },
  { id: "nos-traemos-ganas", term: "nos traemos ganas", meaning: "we’re both into each other / we both want each other", matchingMeaning: "we’re both into each other", note: "Mutual attraction; informal and intimate, but not explicit.", example: "No lo estamos diciendo, pero nos traemos ganas.", translation: "We’re not saying it, but we’re both into each other.", starred: true },
  { id: "se-nota-que-nos-traemos-ganas", term: "se nota que nos traemos ganas", meaning: "it’s obvious there’s mutual desire", matchingMeaning: "it’s obvious there’s mutual desire", note: "Names visible chemistry between two people.", example: "Se nota que nos traemos ganas, pero vamos despacio.", translation: "It’s obvious there’s mutual desire, but we’re going slowly.", starred: true },
  { id: "darle-entrada-a-alguien", term: "darle entrada a alguien", meaning: "to give someone an opening / reciprocate their interest", matchingMeaning: "to give someone an opening", note: "Important phrase for reading reciprocation, not assuming it.", example: "Si no te da entrada, no insistas.", translation: "If they don’t give you an opening, don’t insist.", starred: true },
  { id: "te-di-entrada", term: "te di entrada", meaning: "I gave you an opening / showed I was interested", matchingMeaning: "I gave you an opening", note: "Says there was a signal, but it still does not remove the need to check in.", example: "Te di entrada, sí, pero no dije que corrieras.", translation: "I gave you an opening, yes, but I didn’t say you should rush.", starred: true },
  { id: "darle-alas-a-alguien", term: "darle alas a alguien", meaning: "to encourage someone romantically / give them hope", matchingMeaning: "to encourage someone romantically", note: "Can be positive or risky if expectations are unclear.", example: "No quiero darle alas si no estoy segura.", translation: "I don’t want to give him hope if I’m not sure.", starred: true },
  { id: "no-quiero-darte-alas-de-mas", term: "no quiero darte alas de más", meaning: "I don’t want to lead you on", matchingMeaning: "I don’t want to lead you on", note: "Ethical boundary phrase when attraction exists but certainty does not.", example: "Me gustas, pero no quiero darte alas de más.", translation: "I like you, but I don’t want to lead you on.", starred: true },
  { id: "traigo-ganas-de-besarte", term: "traigo ganas de besarte", meaning: "I really feel like kissing you", matchingMeaning: "I really feel like kissing you", note: "Direct desire phrase; should be paired with consent language.", example: "Traigo ganas de besarte, pero tú marca el ritmo.", translation: "I really feel like kissing you, but you set the pace.", starred: true },
  { id: "si-te-late-me-acerco", term: "si te late, me acerco", meaning: "if you’re into it, I’ll come closer", matchingMeaning: "if you’re into it, I’ll come closer", note: "Consent-forward phrase: interest plus space for refusal.", example: "Si te late, me acerco; si no, todo bien.", translation: "If you’re into it, I’ll come closer; if not, it’s all good.", starred: true },
  { id: "te-late", term: "te late", meaning: "you’re into it / it feels right to you", matchingMeaning: "you’re into it", note: "Mexican informal way to ask whether something feels good or appealing.", example: "¿Te late vernos mañana?", translation: "Are you into meeting tomorrow?", starred: true },
  { id: "tu-marca-el-ritmo", term: "tú marca el ritmo", meaning: "you set the pace", matchingMeaning: "you set the pace", note: "Clear consent and comfort phrase.", example: "Me gustas, pero tú marca el ritmo.", translation: "I like you, but you set the pace.", starred: true },
  { id: "sin-presion-eh", term: "sin presión, eh", meaning: "no pressure", matchingMeaning: "no pressure", note: "Softens an invitation or romantic check-in.", example: "Si quieres salimos, sin presión, eh.", translation: "If you want, we can go out, no pressure.", starred: true },
  { id: "si-no-te-late-todo-bien", term: "si no te late, todo bien", meaning: "if you’re not into it, that’s totally fine", matchingMeaning: "if you’re not into it, that’s fine", note: "Key phrase for preserving comfort and dignity.", example: "Si no te late, todo bien; prefiero preguntarte.", translation: "If you’re not into it, that’s fine; I’d rather ask you.", starred: true },
  { id: "que-se-vaya-dando", term: "que se vaya dando", meaning: "let it develop naturally / see where it goes", matchingMeaning: "let it develop naturally", note: "Low-pressure phrase for gradual attraction.", example: "No corramos; que se vaya dando.", translation: "Let’s not rush; let it develop naturally.", starred: true },
  { id: "no-hay-que-forzar-nada", term: "no hay que forzar nada", meaning: "there’s no need to force anything", matchingMeaning: "there’s no need to force anything", note: "Boundary-friendly phrase that keeps the door open without pressure.", example: "Si fluye, bien; no hay que forzar nada.", translation: "If it flows, great; there’s no need to force anything.", starred: true },
  { id: "me-estas-tentando", term: "me estás tentando", meaning: "you’re tempting me", matchingMeaning: "you’re tempting me", note: "Playful but intimate; safest when mutual interest is clear.", example: "Con esa sonrisa me estás tentando.", translation: "With that smile, you’re tempting me.", starred: true },
  { id: "se-siente-que-hay-quimica", term: "se siente que hay química", meaning: "you can feel there’s chemistry", matchingMeaning: "you can feel there’s chemistry", note: "Names attraction without assuming what must happen next.", example: "Se siente que hay química, pero vayamos con calma.", translation: "You can feel there’s chemistry, but let’s take it calmly.", starred: true },
  { id: "me-traes-pensando-de-mas", term: "me traes pensando de más", meaning: "you’ve got me thinking about you too much", matchingMeaning: "you’ve got me thinking too much", note: "Flirty vulnerability with a slightly dramatic Mexican feel.", example: "No sé qué hiciste, pero me traes pensando de más.", translation: "I don’t know what you did, but you’ve got me thinking too much.", starred: true },
  { id: "no-quiero-asumir-de-mas", term: "no quiero asumir de más", meaning: "I don’t want to assume too much", matchingMeaning: "I don’t want to assume too much", note: "Essential C2 social-risk phrase for checking perception.", example: "No quiero asumir de más, por eso te pregunto.", translation: "I don’t want to assume too much, that’s why I’m asking you.", starred: true },
  { id: "mejor-te-pregunto-directo", term: "mejor te pregunto directo", meaning: "I’d rather ask you directly", matchingMeaning: "I’d rather ask you directly", note: "Turns ambiguity into respectful clarity.", example: "Mejor te pregunto directo: ¿te late?", translation: "I’d rather ask you directly: are you into it?", starred: true },
  { id: "hasta-donde-los-dos-queramos", term: "hasta donde los dos queramos", meaning: "only as far as we both want", matchingMeaning: "only as far as we both want", note: "Consent and mutual pacing in one phrase.", example: "Esto va hasta donde los dos queramos.", translation: "This goes only as far as we both want.", starred: true },
  { id: "si-algo-no-nos-late", term: "si algo no nos late, paramos y ya", meaning: "if something doesn’t feel right, we stop, simple as that", matchingMeaning: "if something doesn’t feel right, we stop", note: "Explicit mutual safety phrase.", example: "Si algo no nos late, paramos y ya.", translation: "If something doesn’t feel right, we stop, simple as that.", starred: true },
  { id: "si-cambias-de-idea", term: "si cambias de idea, me dices", meaning: "if you change your mind, tell me", matchingMeaning: "if you change your mind, tell me", note: "Keeps consent active and reversible.", example: "Si cambias de idea, me dices sin pena.", translation: "If you change your mind, tell me without feeling bad.", starred: true },
  { id: "nomas-si-los-dos-queremos", term: "nomás si los dos queremos", meaning: "only if we both want to", matchingMeaning: "only if we both want to", note: "Simple Mexican consent anchor.", example: "Nos vemos mañana, nomás si los dos queremos.", translation: "We’ll see each other tomorrow, only if we both want to.", starred: true },
  { id: "clavarse", term: "clavarse", meaning: "to get emotionally invested / get too attached", matchingMeaning: "to get emotionally invested", note: "Can mean becoming fixated, attached, or too emotionally involved.", example: "No quiero clavarme si apenas estamos empezando.", translation: "I don’t want to get too attached if we’re just starting.", starred: true },
  { id: "no-me-quiero-clavar-de-mas", term: "no me quiero clavar de más", meaning: "I don’t want to get too emotionally invested", matchingMeaning: "I don’t want to get too emotionally invested", note: "Vulnerable boundary phrase for attraction with caution.", example: "Me gustas, pero no me quiero clavar de más.", translation: "I like you, but I don’t want to get too emotionally invested.", starred: true },
  { id: "a-ver-que-se-da", term: "a ver qué se da", meaning: "let’s see what happens / see where this goes", matchingMeaning: "let’s see what happens", note: "Open-ended phrase; can be casual, hopeful, or intentionally undefined.", example: "Salgamos y a ver qué se da.", translation: "Let’s go out and see what happens.", starred: true },
  { id: "me-gustas", term: "me gustas", meaning: "I like you / I’m attracted to you", matchingMeaning: "I like you", note: "Direct and clear; the cleanest anchor for honest attraction.", example: "Me gustas, y por eso quiero hablar claro.", translation: "I like you, and that’s why I want to speak clearly.", starred: true },
];

const highlightMap = Object.fromEntries(attractionVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = attractionVocab.map((item) => `${item.term} = ${item.meaning}`);

export const mexicanSpanishC2AdvancedEthicalAttractionSeductionFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Mexican Spanish C2: Advanced Ethical Attraction and Seduction Flashcards",
  subtitle: "Mexican attraction language focused on chemistry, directness, consent, pacing, and avoiding pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "flashcards", "attraction", "consent"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: attractionVocab.map(cardFromVocab) },
};

export const mexicanSpanishC2AdvancedEthicalAttractionSeductionSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C2 Sentence Builder: Ethical Attraction in Mexican Spanish",
  subtitle: "Construct nuanced Mexican phrases for flirting, naming chemistry, checking consent, and keeping pressure low.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["mexican-spanish", "c2", "sentence-builder", "attraction", "boundaries"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Mexican Spanish voice note telling someone you like them while clearly making space for their pace, comfort, and changing their mind.",
    stages: [
      stage("stage-1", "Name the flirtation", sentenceVocab.slice(0, 5), sentenceVocab.slice(0, 5), "Wait, are you flirting with me, or am I assuming too much?", "A ver, ¿me estás tirando la onda o estoy asumiendo de más?", "This names attraction playfully without accusing the other person.", breakdown([["are you flirting with me", "me estás tirando la onda"], ["or", "o"], ["am I assuming too much", "estoy asumiendo de más"]])),
      stage("stage-2", "Say it affected you", sentenceVocab.slice(2, 6), sentenceVocab.slice(0, 6), "I wasn’t expecting it, but you really got to me, and you can feel there’s chemistry.", "No me lo esperaba, pero me moviste el tapete y se siente que hay química.", "This expresses attraction with emotional nuance.", breakdown([["I wasn’t expecting it", "no me lo esperaba"], ["you really got to me", "me moviste el tapete"], ["there’s chemistry", "hay química"]])),
      stage("stage-3", "Check the signal", sentenceVocab.slice(3, 9), sentenceVocab.slice(0, 9), "It’s obvious we’re both into each other, but I don’t want to lead you on.", "Se nota que nos traemos ganas, pero no quiero darte alas de más.", "This recognizes mutual attraction while protecting expectations.", breakdown([["it’s obvious", "se nota"], ["we’re both into each other", "nos traemos ganas"], ["I don’t want to lead you on", "no quiero darte alas de más"]])),
      stage("stage-4", "Ask before moving closer", sentenceVocab.slice(9, 16), sentenceVocab.slice(0, 16), "I really feel like kissing you; if you’re into it, I’ll come closer. No pressure.", "Traigo ganas de besarte; si te late, me acerco. Sin presión, eh.", "This pairs desire with a clear opt-in.", breakdown([["I really feel like kissing you", "traigo ganas de besarte"], ["if you’re into it", "si te late"], ["I’ll come closer", "me acerco"], ["no pressure", "sin presión, eh"]])),
      stage("stage-5", "Leave room for no", sentenceVocab.slice(12, 18), sentenceVocab.slice(0, 18), "You set the pace. If you’re not into it, that’s totally fine; there’s no need to force anything.", "Tú marca el ritmo. Si no te late, todo bien; no hay que forzar nada.", "This keeps the interaction safe and confident.", breakdown([["you set the pace", "tú marca el ritmo"], ["if you’re not into it", "si no te late"], ["that’s fine", "todo bien"], ["there’s no need to force anything", "no hay que forzar nada"]])),
      stage("stage-6", "Choose direct clarity", sentenceVocab.slice(18, 23), sentenceVocab.slice(0, 23), "You’ve got me thinking too much, but I don’t want to assume too much, so I’d rather ask you directly.", "Me traes pensando de más, pero no quiero asumir de más, así que mejor te pregunto directo.", "This handles ambiguity maturely instead of guessing.", breakdown([["you’ve got me thinking too much", "me traes pensando de más"], ["I don’t want to assume too much", "no quiero asumir de más"], ["I’d rather ask directly", "mejor te pregunto directo"]])),
      stage("stage-7", "Make consent reversible", sentenceVocab.slice(22, 27), sentenceVocab.slice(0, 27), "This goes only as far as we both want; if something doesn’t feel right, we stop.", "Esto va hasta donde los dos queramos; si algo no nos late, paramos y ya.", "This makes mutual consent active, clear, and reversible.", breakdown([["only as far as we both want", "hasta donde los dos queramos"], ["if something doesn’t feel right", "si algo no nos late"], ["we stop", "paramos y ya"]])),
      stage("stage-8", "Stay open without rushing", sentenceVocab.slice(24), sentenceVocab, "I like you, but I don’t want to get too emotionally invested too fast. Let’s see what happens.", "Me gustas, pero no me quiero clavar de más tan rápido. A ver qué se da.", "This says yes to attraction without pretending certainty.", breakdown([["I like you", "me gustas"], ["I don’t want to get too emotionally invested", "no me quiero clavar de más"], ["let’s see what happens", "a ver qué se da"]])),
    ],
  },
};

const storyAudioBase = `/audio/stories/${courseId}`;

const storyQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-attraction-story-q1", type: "multiple-choice", prompt: "After message 3, why does Sofía say she prefers to ask directly?", options: ["She does not want to assume too much", "She wants to end the conversation", "She is complaining about service", "She forgot Diego’s name"], correctAnswer: "She does not want to assume too much", explanation: "Sofía says no quiero asumir de más, so she checks directly.", points: 1, skillTag: "context" },
  { id: "mexican-c2-attraction-story-q2", type: "multiple-choice", prompt: "After message 6, how does Diego respond to Sofía’s question?", options: ["He admits he is flirting", "He says he is angry", "He changes the subject to work", "He rejects the idea harshly"], correctAnswer: "He admits he is flirting", explanation: "Diego says sí, te estoy tirando la onda.", points: 1, skillTag: "detail" },
  { id: "mexican-c2-attraction-story-q3", type: "true-false", prompt: "After message 9, true or false: Sofía says Diego affected her emotionally.", options: ["True", "False"], correctAnswer: "True", explanation: "She says me moviste el tapete.", points: 1, skillTag: "inference" },
  { id: "mexican-c2-attraction-story-q4", type: "multiple-choice", prompt: "After message 12, what does Diego want to avoid?", options: ["Giving Sofía false hope or pressure", "Being too polite to a waiter", "Missing a bus", "Arguing about money"], correctAnswer: "Giving Sofía false hope or pressure", explanation: "He says no quiero darte alas de más and sin presión.", points: 1, skillTag: "tone" },
  { id: "mexican-c2-attraction-story-q5", type: "multiple-choice", prompt: "After message 15, what does Sofía make clear?", options: ["She sets the pace", "She wants to leave immediately", "She is upset about a delivery", "She does not understand Spanish"], correctAnswer: "She sets the pace", explanation: "She says tú marca el ritmo, but then states her own pace too.", points: 1, skillTag: "boundary" },
  { id: "mexican-c2-attraction-story-q6", type: "multiple-choice", prompt: "After message 18, what does Diego ask before moving closer?", options: ["Whether Sofía is into it", "Whether the food arrived", "Whether she has cash", "Whether traffic is bad"], correctAnswer: "Whether Sofía is into it", explanation: "He says si te late, me acerco.", points: 1, skillTag: "consent" },
  { id: "mexican-c2-attraction-story-q7", type: "true-false", prompt: "After message 21, true or false: They agree not to force the situation.", options: ["True", "False"], correctAnswer: "True", explanation: "They use que se vaya dando and no hay que forzar nada.", points: 1, skillTag: "gist" },
  { id: "mexican-c2-attraction-story-q8", type: "multiple-choice", prompt: "After message 24, what safety rule do they establish?", options: ["If something does not feel right, they stop", "They must kiss immediately", "They cannot change their minds", "They should hide the conversation"], correctAnswer: "If something does not feel right, they stop", explanation: "Sofía says si algo no nos late, paramos y ya.", points: 1, skillTag: "safety" },
  { id: "mexican-c2-attraction-story-q9", type: "multiple-choice", prompt: "After message 27, what does Sofía worry about?", options: ["Getting too emotionally invested too fast", "Forgetting the address", "Paying too much", "Being late for a bus"], correctAnswer: "Getting too emotionally invested too fast", explanation: "She says no me quiero clavar de más.", points: 1, skillTag: "emotion" },
  { id: "mexican-c2-attraction-story-q10", type: "multiple-choice", prompt: "After message 30, what is their final agreement?", options: ["They like each other and will let things develop naturally", "They decide never to talk again", "They file a complaint", "They plan a formal meeting with a manager"], correctAnswer: "They like each other and will let things develop naturally", explanation: "They say me gustas and a ver qué se da.", points: 1, skillTag: "resolution" },
];

export const mexicanSpanishC2AdvancedEthicalAttractionSeductionWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Mexican C2 Story: The Balcony Conversation",
  subtitle: "A careful, high-chemistry conversation where Sofía and Diego name attraction without pressure.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "story", "attraction", "consent"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "diego", name: "Diego", initials: "D", side: "left", color: "blue" },
      { id: "sofia", name: "Sofía", initials: "S", side: "right", color: "violet" },
    ],
    messages: [
      message("m1", "sofia", "A ver, Diego, te voy a preguntar algo directo.", "Look, Diego, I’m going to ask you something directly.", []),
      message("m2", "diego", "Va. Me late más eso que andar adivinando.", "Go ahead. I’m more into that than guessing.", ["te late"]),
      message("m3", "sofia", "No quiero asumir de más: ¿me estás tirando la onda?", "I don’t want to assume too much: are you flirting with me?", ["no quiero asumir de más", "me estás tirando la onda", "tirar la onda"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "diego", "Sí. Pero no quería incomodarte enfrente de todos.", "Yes. But I didn’t want to make you uncomfortable in front of everyone.", []),
      message("m5", "sofia", "Eso lo noté. Por eso mejor te pregunto directo.", "I noticed that. That’s why I’d rather ask you directly.", ["mejor te pregunto directo"]),
      message("m6", "diego", "Entonces sí: te estoy tirando la onda, pero sin presión, eh.", "Then yes: I’m flirting with you, but no pressure.", ["tirar la onda", "sin presión, eh"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "sofia", "Me gusta que lo digas así.", "I like that you say it like that.", []),
      message("m8", "diego", "¿Así cómo?", "Like what?", []),
      message("m9", "sofia", "Sin empujar. Porque, la neta, me moviste el tapete.", "Without pushing. Because, honestly, you really got to me.", ["me moviste el tapete"]),
      message("m10", "diego", "Eso no me lo esperaba.", "I wasn’t expecting that.", []),
      message("m11", "sofia", "Pues se nota que nos traemos ganas, pero no quiero correr.", "Well, it’s obvious there’s mutual desire, but I don’t want to rush.", ["se nota que nos traemos ganas", "nos traemos ganas"]),
      message("m12", "diego", "Te entiendo. Tampoco quiero darte alas de más si hoy solo quieres tantear.", "I get you. I also don’t want to lead you on if tonight you only want to feel things out.", ["no quiero darte alas de más", "darle alas a alguien"], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "sofia", "No es solo tantear. Sí me gustas.", "It’s not only feeling things out. I do like you.", ["me gustas"]),
      message("m14", "diego", "Y tú también me estás tentando, no te voy a mentir.", "And you’re tempting me too, I’m not going to lie.", ["me estás tentando"]),
      message("m15", "sofia", "Pero tú marca el ritmo no significa que yo no tenga ritmo. Significa que lo hablamos.", "But you set the pace doesn’t mean I don’t have a pace. It means we talk about it.", ["tú marca el ritmo"]),
      message("m16", "diego", "Justo. Se siente que hay química, pero eso no nos obliga a nada.", "Exactly. You can feel there’s chemistry, but that doesn’t force us into anything.", ["se siente que hay química"]),
      message("m17", "sofia", "Gracias. Esa frase me baja la guardia.", "Thanks. That phrase helps me relax.", []),
      message("m18", "diego", "Traigo ganas de besarte; si te late, me acerco. Si no te late, todo bien.", "I really feel like kissing you; if you’re into it, I’ll come closer. If you’re not into it, that’s totally fine.", ["traigo ganas de besarte", "si te late, me acerco", "si no te late, todo bien", "te late"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "sofia", "Así sí. Me gusta que preguntes antes.", "That works. I like that you ask first.", []),
      message("m20", "diego", "No hay que forzar nada. Si se da, se da.", "There’s no need to force anything. If it happens, it happens.", ["no hay que forzar nada"]),
      message("m21", "sofia", "Que se vaya dando, pero con la cabeza clara.", "Let it develop naturally, but with a clear head.", ["que se vaya dando"]),
      message("m22", "diego", "Entonces pongámoslo sencillo: hasta donde los dos queramos.", "Then let’s keep it simple: only as far as we both want.", ["hasta donde los dos queramos"]),
      message("m23", "sofia", "Y si cambias de idea, me dices. También aplica para ti.", "And if you change your mind, tell me. That applies to you too.", ["si cambias de idea, me dices"]),
      message("m24", "sofia", "Si algo no nos late, paramos y ya. Nomás si los dos queremos.", "If something doesn’t feel right, we stop. Only if we both want to.", ["si algo no nos late, paramos y ya", "nomás si los dos queremos"], "voice-note", `${storyAudioBase}/m24.mp3`),
      message("m25", "diego", "Me gusta esa seguridad tuya.", "I like that confidence of yours.", []),
      message("m26", "sofia", "No es frialdad. Es que no me quiero clavar de más tan rápido.", "It’s not coldness. It’s that I don’t want to get too emotionally invested too fast.", ["no me quiero clavar de más", "clavarse"]),
      message("m27", "diego", "Tiene sentido. Yo también prefiero no hacer promesas por pura emoción.", "Makes sense. I also prefer not to make promises just because of emotion.", []),
      message("m28", "sofia", "Entonces sí: me gustas, y me late ver qué pasa.", "Then yes: I like you, and I’m into seeing what happens.", ["me gustas", "te late"]),
      message("m29", "diego", "A mí también. A ver qué se da, sin brincar pasos.", "Me too. Let’s see what happens, without skipping steps.", ["a ver qué se da"]),
      message("m30", "sofia", "Va. Me acerco tantito, y seguimos hablando claro.", "Okay. I’ll come a little closer, and we keep speaking clearly.", [], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `mexican-c2-attraction-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: attractionVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: attractionVocab.map((item) => item.term),
      grammarPatterns: [
        "Checking assumptions: no quiero asumir de más, mejor te pregunto directo.",
        "Consent and pacing: si te late, tú marca el ritmo, hasta donde los dos queramos.",
        "Open-ended attraction: que se vaya dando, a ver qué se da, no hay que forzar nada.",
      ],
      speakingPrompts: [
        "Tell someone you like them while making refusal easy.",
        "Ask for permission before moving closer.",
        "Explain that you feel chemistry but do not want to rush.",
      ],
    },
    completionTask: {
      title: "Your ethical attraction voice note",
      instructions: "Record a 60-second Mexican Spanish voice note where you say you like someone, check whether they feel the same, and make it clear there is no pressure.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una conversación de atracción, el español mexicano puede sonar directo sin volverse invasivo. «Tirar la onda» sirve para nombrar el coqueteo, pero «me estás tirando la onda» funciona mejor cuando el tono ya es juguetón. La clave C2 no es decir la frase más intensa, sino leer si la otra persona está cómoda con que la tensión se nombre.", translation: "In a conversation about attraction, Mexican Spanish can sound direct without becoming invasive. Tirar la onda names flirtation, but me estás tirando la onda works best when the tone is already playful. The C2 key is not saying the most intense phrase, but reading whether the other person is comfortable with naming the tension.", highlights: highlights(["tirar la onda", "me estás tirando la onda"]), shadowLine: "¿Me estás tirando la onda o estoy asumiendo de más?" },
  { id: "p2", text: "Cuando alguien dice «me moviste el tapete», no está hablando de gusto superficial. Está diciendo que algo se movió por dentro. Por eso conviene equilibrarlo con frases como «no quiero asumir de más» y «mejor te pregunto directo». La atracción ética no adivina: pregunta.", translation: "When someone says me moviste el tapete, they are not talking about superficial liking. They are saying something moved inside. That is why it helps to balance it with no quiero asumir de más and mejor te pregunto directo. Ethical attraction does not guess: it asks.", highlights: highlights(["me moviste el tapete", "no quiero asumir de más", "mejor te pregunto directo"]), shadowLine: "Me moviste el tapete, pero no quiero asumir de más." },
  { id: "p3", text: "«Nos traemos ganas» y «se nota que nos traemos ganas» nombran deseo mutuo, pero siguen siendo interpretaciones. Aunque haya química, todavía hace falta escuchar. «Se siente que hay química» abre una puerta; no firma un contrato. En C2, esa diferencia social importa muchísimo.", translation: "Nos traemos ganas and se nota que nos traemos ganas name mutual desire, but they are still interpretations. Even if there is chemistry, listening is still necessary. Se siente que hay química opens a door; it does not sign a contract. At C2, that social difference matters a lot.", highlights: highlights(["nos traemos ganas", "se nota que nos traemos ganas", "se siente que hay química"]), shadowLine: "Se siente que hay química, pero no hay que correr." },
  { id: "p4", text: "«Darle entrada a alguien» significa mostrar apertura, pero una entrada no es permiso para avanzar sin preguntar. Si dices «te di entrada», también puedes aclarar el límite. Y si no quieres crear expectativas falsas, «no quiero darte alas de más» es una frase honesta, cuidadosa y madura.", translation: "Darle entrada a alguien means showing openness, but an opening is not permission to move forward without asking. If you say te di entrada, you can also clarify the limit. And if you do not want to create false expectations, no quiero darte alas de más is honest, careful, and mature.", highlights: highlights(["darle entrada a alguien", "te di entrada", "no quiero darte alas de más", "darle alas a alguien"]), shadowLine: "Te di entrada, pero no quiero darte alas de más." },
  { id: "p5", text: "La frase «traigo ganas de besarte» es intensa y clara. Por eso necesita una salida igual de clara: «si te late, me acerco», «sin presión, eh» o «si no te late, todo bien». Lo atractivo aquí no es presionar; es tener deseo y autocontrol al mismo tiempo.", translation: "Traigo ganas de besarte is intense and clear. That is why it needs an equally clear exit: si te late, me acerco, sin presión, eh, or si no te late, todo bien. What is attractive here is not pressure; it is having desire and self-control at the same time.", highlights: highlights(["traigo ganas de besarte", "si te late, me acerco", "sin presión, eh", "si no te late, todo bien", "te late"]), shadowLine: "Traigo ganas de besarte; si te late, me acerco." },
  { id: "p6", text: "Para bajar la intensidad sin apagarla, sirven «que se vaya dando» y «no hay que forzar nada». Estas frases dicen: sí hay interés, pero no necesitamos fabricar una escena. También protegen la dignidad de los dos, porque nadie queda atrapado en una promesa hecha por impulso.", translation: "To lower the intensity without killing it, que se vaya dando and no hay que forzar nada are useful. These phrases say: yes, there is interest, but we do not need to manufacture a scene. They also protect both people’s dignity, because nobody gets trapped in a promise made on impulse.", highlights: highlights(["que se vaya dando", "no hay que forzar nada"]), shadowLine: "Que se vaya dando; no hay que forzar nada." },
  { id: "p7", text: "La seguridad real aparece cuando el consentimiento se mantiene reversible. «Hasta donde los dos queramos», «si algo no nos late, paramos y ya», «si cambias de idea, me dices» y «nomás si los dos queremos» convierten la atracción en un diálogo. No rompen la química; la hacen más limpia.", translation: "Real safety appears when consent stays reversible. Hasta donde los dos queramos, si algo no nos late, paramos y ya, si cambias de idea, me dices, and nomás si los dos queremos turn attraction into a dialogue. They do not break chemistry; they make it cleaner.", highlights: highlights(["hasta donde los dos queramos", "si algo no nos late, paramos y ya", "si cambias de idea, me dices", "nomás si los dos queremos"]), shadowLine: "Hasta donde los dos queramos, y si algo no late, paramos." },
  { id: "p8", text: "Finalmente, «clavarse», «no me quiero clavar de más», «a ver qué se da» y «me gustas» ayudan a hablar de deseo sin vender una historia falsa. Puedes decir «me gustas» con mucha claridad y aun así dejar que el vínculo respire. Esa mezcla de honestidad, paciencia y lectura social es lo avanzado.", translation: "Finally, clavarse, no me quiero clavar de más, a ver qué se da, and me gustas help talk about desire without selling a false story. You can say me gustas very clearly and still let the connection breathe. That mix of honesty, patience, and social reading is the advanced part.", highlights: highlights(["clavarse", "no me quiero clavar de más", "a ver qué se da", "me gustas"]), shadowLine: "Me gustas, pero no me quiero clavar de más." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "mexican-c2-attraction-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Expressing attraction while checking comfort and consent", "Complaining about poor service", "Giving transport directions", "Debating office politics"], correctAnswer: "Expressing attraction while checking comfort and consent", explanation: "The reading focuses on attraction, directness, pacing, and consent-forward language.", points: 1, skillTag: "gist" },
  { id: "mexican-c2-attraction-reading-q2", type: "multiple-choice", prompt: "Which phrase means “I don’t want to assume too much”?", options: ["No quiero asumir de más", "Me estás tentando", "A ver qué se da", "Te di entrada"], correctAnswer: "No quiero asumir de más", explanation: "This phrase checks interpretation instead of guessing.", points: 1, skillTag: "meaning" },
  { id: "mexican-c2-attraction-reading-q3", type: "true-false", prompt: "True or false: The reading says an opening is not automatic permission to move forward without asking.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explains that darle entrada is openness, but you still need to check in.", points: 1, skillTag: "consent" },
  { id: "mexican-c2-attraction-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "If you’re into it, I’ll come closer.", wordBank: ["Si", "te", "late,", "me", "acerco."], correctAnswer: "Si te late, me acerco.", explanation: "This phrase asks for opt-in before moving closer.", points: 1, skillTag: "phrase-building" },
  { id: "mexican-c2-attraction-reading-q5", type: "multiple-choice", prompt: "Which phrase keeps consent reversible?", options: ["Si cambias de idea, me dices", "Me moviste el tapete", "Nos traemos ganas", "Me estás tentando"], correctAnswer: "Si cambias de idea, me dices", explanation: "It explicitly says the other person can change their mind and say so.", points: 1, skillTag: "safety" },
];

export const mexicanSpanishC2AdvancedEthicalAttractionSeductionReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Mexican C2 Reading: Atracción con Claridad y Cero Presión",
  subtitle: "A synced Mexican Spanish reading on attraction, chemistry, direct questions, consent, pacing, and emotional honesty.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "reading", "attraction", "consent"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: attractionVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Mexican C2 ethical-attraction vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const mexicanSpanishC2AdvancedEthicalAttractionSeductionQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Mexican Spanish C2: Advanced Ethical Attraction and Seduction Quiz",
  subtitle: "Choose the right Mexican phrase for chemistry, directness, consent, boundaries, and low-pressure attraction.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Mexican Spanish", "C2", "quiz", "attraction", "consent"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice C2 Mexican Spanish phrases for expressing attraction clearly while preserving consent, comfort, and emotional honesty.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "mexican-c2-attraction-quiz-1", type: "multiple-choice", prompt: "You want to ask if someone is flirting with you. What fits?", options: ["¿Me estás tirando la onda?", "No hay que forzar nada", "A ver qué se da", "Si cambias de idea"], correctAnswer: "¿Me estás tirando la onda?", explanation: "This directly asks whether someone is flirting.", points: 1, skillTag: "flirting" },
      { id: "mexican-c2-attraction-quiz-2", type: "fill-blank", prompt: "Complete: Me moviste el ____.", nativePrompt: "You really got to me.", correctAnswer: "tapete", explanation: "Me moviste el tapete means you stirred something in me.", points: 1, skillTag: "emotion" },
      { id: "mexican-c2-attraction-quiz-3", type: "multiple-choice", prompt: "You feel mutual attraction but want to be careful. What fits?", options: ["Se nota que nos traemos ganas, pero no hay que forzar nada", "Ni sus luces", "Se hicieron bolas", "Me cobraron de más"], correctAnswer: "Se nota que nos traemos ganas, pero no hay que forzar nada", explanation: "This names chemistry while avoiding pressure.", points: 1, skillTag: "tone" },
      { id: "mexican-c2-attraction-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I don’t want to lead you on.", wordBank: ["No", "quiero", "darte", "alas", "de", "más."], correctAnswer: "No quiero darte alas de más.", explanation: "This is a clear boundary around romantic expectations.", points: 1, skillTag: "expectations" },
      { id: "mexican-c2-attraction-quiz-5", type: "true-false", prompt: "True or false: “si te late, me acerco” asks for consent before moving closer.", options: ["True", "False"], correctAnswer: "True", explanation: "It makes moving closer conditional on the other person being into it.", points: 1, skillTag: "consent" },
      { id: "mexican-c2-attraction-quiz-6", type: "multiple-choice", prompt: "You want the other person to control the pace. What do you say?", options: ["Tú marca el ritmo", "Me estás tentando", "Nos traemos ganas", "Me gustas"], correctAnswer: "Tú marca el ritmo", explanation: "This means you set the pace.", points: 1, skillTag: "pacing" },
      { id: "mexican-c2-attraction-quiz-7", type: "fill-blank", prompt: "Complete: No quiero asumir de ____.", nativePrompt: "I don’t want to assume too much.", correctAnswer: "más", explanation: "No quiero asumir de más is used before checking directly.", points: 1, skillTag: "clarity" },
      { id: "mexican-c2-attraction-quiz-8", type: "multiple-choice", prompt: "You want to make consent reversible. Which phrase fits best?", options: ["Si cambias de idea, me dices", "Me traes pensando de más", "Me estás tentando", "Te di entrada"], correctAnswer: "Si cambias de idea, me dices", explanation: "This tells the other person they can change their mind.", points: 1, skillTag: "safety" },
      { id: "mexican-c2-attraction-quiz-9", type: "true-false", prompt: "True or false: “nomás si los dos queremos” means only if both people want to.", options: ["True", "False"], correctAnswer: "True", explanation: "It is a simple mutual-consent phrase.", points: 1, skillTag: "mutuality" },
      { id: "mexican-c2-attraction-quiz-10", type: "multiple-choice", prompt: "You like someone but do not want to get too attached too fast. What fits?", options: ["No me quiero clavar de más", "Te di entrada", "Me estás tirando la onda", "Me estás tentando"], correctAnswer: "No me quiero clavar de más", explanation: "Clavarse means getting emotionally invested or attached.", points: 1, skillTag: "emotional-boundary" },
      pairQuestion("mexican-c2-attraction-pairs-1", "Match direct attraction phrases.", attractionVocab.slice(0, 10)),
      pairQuestion("mexican-c2-attraction-pairs-2", "Match consent and pacing phrases.", attractionVocab.slice(10, 23)),
      pairQuestion("mexican-c2-attraction-pairs-3", "Match emotional-boundary phrases.", attractionVocab.slice(23)),
    ],
  },
};
