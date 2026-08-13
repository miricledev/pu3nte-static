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

const courseId = "colombian-spanish-b2-flirty-banter-reading-interest";
const sectionName = "Colombian Spanish - B2 Flirty Banter and Reading Interest";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const flirtingVocab: VocabItem[] = [
  { id: "echarle-los-perros", term: "echarle los perros a alguien", meaning: "to flirt with someone / hit on someone", matchingMeaning: "flirt with someone", note: "Very Colombian and informal; can be playful or too direct depending on tone.", example: "Ese man me está echando los perros.", translation: "That guy is flirting with me.", starred: true },
  { id: "caerle-a-alguien", term: "caerle a alguien", meaning: "to make a move on someone / pursue someone", matchingMeaning: "make a move on someone", note: "Informal way to talk about approaching someone romantically.", example: "De pronto le caigo, pero con calma.", translation: "Maybe I’ll make a move, but calmly.", starred: true },
  { id: "me-copia", term: "me copia", meaning: "he/she responds to me / seems receptive / gives me attention", matchingMeaning: "seems receptive", note: "Used when someone gives attention or responds to your vibe.", example: "Yo creo que ella me copia.", translation: "I think she’s receptive.", starred: true },
  { id: "seguirle-el-cuento", term: "seguirle el cuento", meaning: "to go along with someone’s flirting or playful talk", matchingMeaning: "go along with the flirting", note: "Can be flirting, joking, or playful conversational momentum.", example: "Me está siguiendo el cuento.", translation: "She’s going along with my flirting.", starred: true },
  { id: "echar-labia", term: "echar labia", meaning: "to smooth-talk / charm someone with words", matchingMeaning: "smooth-talk", note: "Can sound charming or manipulative depending on context.", example: "Le está echando labia.", translation: "He’s smooth-talking her.", starred: true },
  { id: "me-trama", term: "me trama", meaning: "I like him/her / he/she appeals to me", matchingMeaning: "I like him/her", note: "Colombian way to say someone or something attracts you.", example: "Sí me trama.", translation: "Yeah, I like him.", starred: true },
  { id: "estar-encarretado", term: "estar encarretado", meaning: "to be really into someone / getting emotionally invested", matchingMeaning: "be getting emotionally invested", note: "Suggests interest is moving beyond casual curiosity.", example: "Estoy medio encarretado.", translation: "I’m getting pretty into her.", starred: true },
  { id: "estar-tragado", term: "estar tragado", meaning: "to be head over heels / seriously into someone", matchingMeaning: "be head over heels", note: "Stronger than encarretado; more emotionally intense.", example: "Está tragado.", translation: "He’s head over heels.", starred: true },
  { id: "darle-entrada", term: "darle entrada", meaning: "to give someone an opening / encourage their interest", matchingMeaning: "give someone an opening", note: "Useful for reading whether someone is inviting more flirting.", example: "Le está dando entrada.", translation: "She’s giving him an opening.", starred: true },
  { id: "darle-alas", term: "darle alas", meaning: "to encourage someone’s romantic hopes", matchingMeaning: "get someone’s hopes up", note: "Often used negatively when you don’t want to create false hope.", example: "No quiero darle alas.", translation: "I don’t want to get his hopes up.", starred: true },
  { id: "pararle-bolas", term: "pararle bolas", meaning: "to pay attention to someone", matchingMeaning: "pay attention to someone", note: "Very Colombian; not always romantic, but can signal interest.", example: "Le para muchas bolas.", translation: "She gives him a lot of attention.", starred: true },
  { id: "cuadrarse-con-alguien", term: "cuadrarse con alguien", meaning: "to become an official couple with someone", matchingMeaning: "become an official couple", note: "Colombian relationship-status phrase.", example: "¿Ya se van a cuadrar o qué?", translation: "So are you two becoming official now or what?", starred: true },
  { id: "darse-picos", term: "darse picos", meaning: "to kiss / exchange little kisses", matchingMeaning: "kiss a bit", note: "Informal; usually light kisses, not a formal phrase.", example: "Se dieron unos picos.", translation: "They kissed a bit.", starred: true },
  { id: "plan-arrunche", term: "plan arrunche", meaning: "cozy cuddle-at-home type plan/date", matchingMeaning: "cozy cuddle date", note: "Informal and intimate; use only where the vibe clearly fits.", example: "Hacemos plan arrunche.", translation: "Let’s have a cozy cuddle-type date.", starred: true },
  { id: "arrocito-en-bajo", term: "arrocito en bajo", meaning: "backup romantic option / someone kept on the side", matchingMeaning: "backup romantic option", note: "Warning phrase: nobody wants to feel like the backup option.", example: "No voy a ser su arrocito en bajo.", translation: "I’m not going to be your backup option.", starred: true },
  { id: "hacerse-el-interesante", term: "hacerse el interesante", meaning: "to act hard to get / pretend to be less interested", matchingMeaning: "act hard to get", note: "Can be playful or immature depending on the situation.", example: "Se está haciendo el interesante.", translation: "He’s acting hard to get.", starred: true },
  { id: "fresco-todo-bien", term: "fresco, todo bien", meaning: "relax, it’s all good / no worries", matchingMeaning: "no worries", note: "Colombian reassurance when someone sets a limit or says no.", example: "Fresca, todo bien.", translation: "No worries, it’s all good.", starred: true },
  { id: "no-se-me-vaya-a-emocionar", term: "no se me vaya a emocionar", meaning: "don’t get too excited / don’t get carried away", matchingMeaning: "don’t get carried away", note: "Playful warning; can sound flirtatious or teasing.", example: "No se me vaya a emocionar.", translation: "Don’t get carried away now.", starred: true },
  { id: "no-quiero-ilusionarlo", term: "no quiero ilusionarlo", meaning: "I don’t want to lead you on / give you false hope", matchingMeaning: "I don’t want to lead you on", note: "Important respectful boundary phrase.", example: "No quiero ilusionarlo.", translation: "I don’t want to lead you on.", starred: true },
  { id: "vamos-suave", term: "vamos suave", meaning: "let’s take it slowly / easy", matchingMeaning: "let’s take it slowly", note: "Keeps interest alive while slowing the pace.", example: "Mejor vamos suave.", translation: "Better if we take it slowly.", starred: true },
  { id: "no-confunda-amabilidad", term: "no confunda amabilidad con coqueteo", meaning: "don’t confuse friendliness with flirting", matchingMeaning: "don’t confuse friendliness with flirting", note: "Clear boundary when someone reads too much into kindness.", example: "No confunda amabilidad con coqueteo.", translation: "Don’t mistake friendliness for flirting.", starred: true },
];

const highlightMap = Object.fromEntries(flirtingVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = flirtingVocab.map((item) => `${item.term} = ${item.meaning}`);

export const colombianSpanishB2FlirtyBanterReadingInterestFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Colombian Spanish B2: Flirty Banter & Reading Interest Flashcards",
  subtitle: "Colombian phrases for playful flirting, reading interest, soft boundaries, and not leading someone on.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "flashcards", "flirting", "boundaries"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: flirtingVocab.map(cardFromVocab) },
};

export const colombianSpanishB2FlirtyBanterReadingInterestSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "B2 Sentence Builder: Colombian Flirty Banter",
  subtitle: "Build Colombian Spanish sentences for flirting, noticing interest, slowing things down, and setting respectful limits.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["colombian-spanish", "b2", "sentence-builder", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Colombian Spanish voice note about someone flirting: say whether they seem receptive, whether you are interested, and how you would keep things respectful.",
    stages: [
      stage("stage-1", "Notice flirting", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "That guy is flirting with me, and I think she is receptive.", "Ese man me está echando los perros, y yo creo que ella me copia.", "Echarle los perros names the flirtation. Me copia means the person seems receptive.", breakdown([["That guy", "Ese man"], ["is flirting with me", "me está echando los perros"], ["I think", "yo creo"], ["she is receptive", "ella me copia"]])),
      stage("stage-2", "Make a move slowly", sentenceVocab.slice(1, 6), sentenceVocab.slice(0, 6), "Maybe I’ll make a move, but calmly, because I like her.", "De pronto le caigo, pero con calma, porque sí me trama.", "Caerle means making a move. Me trama keeps the interest casual, not dramatic.", breakdown([["Maybe", "De pronto"], ["I’ll make a move", "le caigo"], ["but calmly", "pero con calma"], ["I like her", "sí me trama"]])),
      stage("stage-3", "Playful talk", sentenceVocab.slice(3, 6), sentenceVocab.slice(0, 6), "She is going along with my flirting, but I don’t want to smooth-talk too much.", "Me está siguiendo el cuento, pero no quiero echar tanta labia.", "Seguirle el cuento signals playful back-and-forth. Echar labia can become too much if overused.", breakdown([["She is going along", "Me está siguiendo"], ["with my flirting", "el cuento"], ["I don’t want", "no quiero"], ["to smooth-talk too much", "echar tanta labia"]])),
      stage("stage-4", "Interest getting stronger", sentenceVocab.slice(6, 9), sentenceVocab.slice(0, 9), "I’m getting pretty into her, but I don’t want to act head over heels.", "Estoy medio encarretado, pero no quiero actuar como si estuviera tragado.", "Encarretado is interest growing; tragado is much more intense.", breakdown([["I’m getting pretty into her", "Estoy medio encarretado"], ["I don’t want", "no quiero"], ["to act as if", "actuar como si"], ["I were head over heels", "estuviera tragado"]])),
      stage("stage-5", "Openings and hope", sentenceVocab.slice(8, 11), sentenceVocab.slice(0, 11), "She is giving him an opening, but I don’t want to get his hopes up.", "Ella le está dando entrada, pero no quiero darle alas.", "Darle entrada can invite more interest; darle alas can create false hope.", breakdown([["She is giving him an opening", "Ella le está dando entrada"], ["but", "pero"], ["I don’t want", "no quiero"], ["to get his hopes up", "darle alas"]])),
      stage("stage-6", "Attention and couple status", sentenceVocab.slice(10, 13), sentenceVocab.slice(0, 13), "She gives him a lot of attention, but that doesn’t mean they are becoming a couple.", "Ella le para muchas bolas, pero eso no significa que se vayan a cuadrar.", "Pararle bolas can show attention, but it is not the same as becoming official.", breakdown([["She gives him a lot of attention", "Ella le para muchas bolas"], ["that doesn’t mean", "eso no significa"], ["they are becoming a couple", "se vayan a cuadrar"]])),
      stage("stage-7", "Cozy plan or backup option", sentenceVocab.slice(12, 16), sentenceVocab.slice(0, 16), "They kissed a bit, but I’m not going to be your backup option for a cuddle plan.", "Se dieron unos picos, pero no voy a ser su arrocito en bajo para un plan arrunche.", "This keeps the language playful but adds a clear self-respecting limit.", breakdown([["They kissed a bit", "Se dieron unos picos"], ["I’m not going to be", "no voy a ser"], ["your backup option", "su arrocito en bajo"], ["for a cozy date", "para un plan arrunche"]])),
      stage("stage-8", "Respectful boundary", sentenceVocab.slice(16), sentenceVocab, "No worries, but don’t get carried away. I don’t want to lead you on, so let’s take it slowly.", "Fresco, todo bien, pero no se me vaya a emocionar. No quiero ilusionarlo, entonces vamos suave.", "This final stage models flirtation with pressure removed and boundaries made clear.", breakdown([["No worries", "Fresco, todo bien"], ["don’t get carried away", "no se me vaya a emocionar"], ["I don’t want to lead you on", "No quiero ilusionarlo"], ["let’s take it slowly", "vamos suave"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "colombian-b2-flirty-story-q1", type: "multiple-choice", prompt: "After message 3, what does Nico think is happening?", options: ["Mateo is flirting with Isa", "Mateo is asking for directions", "Isa is cancelling a class", "Lina is ordering food"], correctAnswer: "Mateo is flirting with Isa", explanation: "Nico says Mateo le está echando los perros to Isa.", points: 1, skillTag: "gist" },
  { id: "colombian-b2-flirty-story-q2", type: "multiple-choice", prompt: "After message 6, why does Isa think Mateo may be receptive?", options: ["He responds fast and follows the playful conversation", "He blocks her", "He says he has a girlfriend", "He leaves the party"], correctAnswer: "He responds fast and follows the playful conversation", explanation: "Isa says Mateo me copia and me sigue el cuento.", points: 1, skillTag: "detail" },
  { id: "colombian-b2-flirty-story-q3", type: "true-false", prompt: "After message 9, true or false: Isa says Mateo appeals to her, but she is not head over heels.", options: ["True", "False"], correctAnswer: "True", explanation: "She says sí me trama, but also says no estoy tragada.", points: 1, skillTag: "interest-level" },
  { id: "colombian-b2-flirty-story-q4", type: "multiple-choice", prompt: "After message 12, what does Isa want to avoid?", options: ["Giving Mateo false romantic hope", "Paying for coffee", "Speaking Colombian Spanish", "Inviting Nico"], correctAnswer: "Giving Mateo false romantic hope", explanation: "Isa says she does not want to darle alas.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-flirty-story-q5", type: "multiple-choice", prompt: "After message 15, what does Isa reject?", options: ["Being someone’s backup romantic option", "Going to the movies", "Answering a voice note", "Talking to Lina"], correctAnswer: "Being someone’s backup romantic option", explanation: "She says she will not be his arrocito en bajo.", points: 1, skillTag: "self-respect" },
  { id: "colombian-b2-flirty-story-q6", type: "multiple-choice", prompt: "After message 18, what plan does Mateo suggest?", options: ["A calm coffee first", "Moving in together", "A secret trip", "Ignoring Isa"], correctAnswer: "A calm coffee first", explanation: "Nico reports that Mateo suggested coffee first, without pressure.", points: 1, skillTag: "date-plan" },
  { id: "colombian-b2-flirty-story-q7", type: "true-false", prompt: "After message 21, true or false: Isa clearly says she does not want to lead Mateo on.", options: ["True", "False"], correctAnswer: "True", explanation: "Isa says no quiero ilusionarlo.", points: 1, skillTag: "respect" },
  { id: "colombian-b2-flirty-story-q8", type: "multiple-choice", prompt: "After message 24, what boundary does Isa explain?", options: ["Friendliness is not always flirting", "Coffee is never romantic", "Voice notes are forbidden", "Mateo must stop speaking"], correctAnswer: "Friendliness is not always flirting", explanation: "She says no confunda amabilidad con coqueteo.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-flirty-story-q9", type: "multiple-choice", prompt: "After message 27, how does Nico describe Mateo’s behavior?", options: ["He is acting hard to get", "He is angry", "He is lost", "He is asleep"], correctAnswer: "He is acting hard to get", explanation: "Nico says Mateo se está haciendo el interesante.", points: 1, skillTag: "reading-interest" },
  { id: "colombian-b2-flirty-story-q10", type: "multiple-choice", prompt: "By message 30, what is Isa’s final approach?", options: ["Take it slowly and keep things honest", "Lead Mateo on for fun", "Become official immediately", "Stop being friendly to everyone"], correctAnswer: "Take it slowly and keep things honest", explanation: "Isa ends with vamos suave and keeping the vibe clear.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const colombianSpanishB2FlirtyBanterReadingInterestWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Colombian B2 Story: Is He Flirting or Just Friendly?",
  subtitle: "A playful but respectful chat where Isa and Nico read signals, jokes, interest, and boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "WhatsApp", "flirting", "interest"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "isa", name: "Isa", initials: "I", side: "right", color: "red" },
      { id: "nico", name: "Nico", initials: "N", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "nico", "Isa, pregunta seria: ¿Mateo le está escribiendo otra vez?", "Isa, serious question: is Mateo writing to you again?", []),
      message("m2", "isa", "Jajaja sí. ¿Por qué tan investigador?", "Haha yes. Why so investigative?", []),
      message("m3", "nico", "Porque ese man le está echando los perros desde el viernes.", "Because that guy has been flirting with you since Friday.", ["echarle los perros a alguien"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "isa", "Pues... de pronto le caigo un poquito también.", "Well... maybe I’m making a tiny move too.", ["caerle a alguien"]),
      message("m5", "nico", "¿Y él sí le copia o está de adorno?", "And does he actually respond to you, or is he just decorative?", ["me copia"]),
      message("m6", "isa", "Me copia. Responde rápido y me sigue el cuento con los chistes.", "He’s receptive. He answers fast and goes along with my jokes/flirting.", ["me copia", "seguirle el cuento"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "nico", "Entonces hay partido. Pero pilas con la labia.", "Then there’s a match. But careful with smooth talk.", ["echar labia"]),
      message("m8", "isa", "Sí, le está echando labia, pero no de una forma cansona.", "Yeah, he’s smooth-talking, but not in an annoying way.", ["echar labia"]),
      message("m9", "isa", "Sí me trama, pero tampoco estoy tragada. No exagere.", "Yeah, I like him, but I’m not head over heels either. Don’t exaggerate.", ["me trama", "estar tragado"]),
      message("m10", "nico", "Uy, esa frase suena a que ya está medio encarretada.", "Oof, that sentence sounds like you’re already getting pretty into him.", ["estar encarretado"], "voice-note", `${storyAudioBase}/m10.mp3`),
      message("m11", "isa", "No se me vaya a emocionar usted también.", "Don’t you get carried away too.", ["no se me vaya a emocionar"]),
      message("m12", "isa", "Le doy entrada para conversar, pero no quiero darle alas si no estoy segura.", "I give him an opening to talk, but I don’t want to get his hopes up if I’m not sure.", ["darle entrada", "darle alas"]),
      message("m13", "nico", "Eso sí. Una cosa es pararle bolas y otra prometer novela.", "Exactly. Paying attention is one thing; promising a whole drama is another.", ["pararle bolas"]),
      message("m14", "isa", "Además, Lina dice que él todavía habla con la ex.", "Also, Lina says he still talks to his ex.", []),
      message("m15", "isa", "Y yo no voy a ser su arrocito en bajo. Qué pereza.", "And I’m not going to be his backup option. How annoying.", ["arrocito en bajo"], "voice-note", `${storyAudioBase}/m15.mp3`),
      message("m16", "nico", "Bien. ¿Pero ya se dieron picos o todo es chat?", "Good. But have you kissed a bit yet, or is it all chat?", ["darse picos"]),
      message("m17", "isa", "Nos dimos unos picos en la fiesta, pero tranqui.", "We kissed a bit at the party, but relax.", ["darse picos"]),
      message("m18", "nico", "Me escribió que quería café primero, sin presión. Eso suena decente.", "He wrote that he wanted coffee first, no pressure. That sounds decent.", []),
      message("m19", "isa", "Sí. Plan arrunche de una me parecería muy lanzado.", "Yeah. A cuddle-at-home date right away would feel too forward to me.", ["plan arrunche"]),
      message("m20", "nico", "Total. Café primero, arrunche después si la vibra da.", "Totally. Coffee first, cuddle plan later if the vibe is there.", ["plan arrunche"]),
      message("m21", "isa", "Exacto. No quiero ilusionarlo ni ilusionarme sola.", "Exactly. I don’t want to lead him on or get my own hopes up alone.", ["no quiero ilusionarlo"]),
      message("m22", "nico", "Fresca, todo bien. Usted está leyendo la situación, no jugando con él.", "No worries, it’s all good. You’re reading the situation, not playing with him.", ["fresco, todo bien"], "voice-note", `${storyAudioBase}/m22.mp3`),
      message("m23", "isa", "Igual le voy a decir claro: vamos suave.", "Still, I’m going to tell him clearly: let’s take it slowly.", ["vamos suave"]),
      message("m24", "isa", "Y si se confunde, pues: no confunda amabilidad con coqueteo.", "And if he gets confused, then: don’t confuse friendliness with flirting.", ["no confunda amabilidad con coqueteo"]),
      message("m25", "nico", "Muy diplomática. Yo habría dicho: parcero, bájele.", "Very diplomatic. I would’ve said: bro, tone it down.", []),
      message("m26", "isa", "Por eso no le pido consejos románticos.", "That’s why I don’t ask you for romantic advice.", []),
      message("m27", "nico", "Bueno, igual Mateo se está haciendo el interesante. Subió historia y no respondió.", "Well, still, Mateo is acting hard to get. He posted a story and didn’t reply.", ["hacerse el interesante"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "isa", "Jajaja. Entonces yo también respiro y no me acelero.", "Haha. Then I’ll breathe too and not rush myself.", []),
      message("m29", "nico", "Eso: si le copia, bien; si no, fresco, todo bien.", "Exactly: if he responds, good; if not, no worries, it’s all good.", ["me copia", "fresco, todo bien"]),
      message("m30", "isa", "Tal cual. Vamos suave, con la vibra clara y sin ilusionar a nadie.", "Exactly. Let’s take it slowly, with the vibe clear and without leading anyone on.", ["vamos suave", "no quiero ilusionarlo"]),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({
      id: `colombian-b2-flirty-check-${index + 1}`,
      afterMessageId: `m${(index + 1) * 3}`,
      question,
    })),
    endQuiz: storyQuestions,
    learnedVocab: flirtingVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: flirtingVocab.map((item) => item.term),
      grammarPatterns: [
        "Reading interest: me copia, me sigue el cuento, le para bolas.",
        "Interest levels: me trama, estar encarretado, estar tragado.",
        "Boundaries: no quiero darle alas, no quiero ilusionarlo, vamos suave.",
      ],
      speakingPrompts: [
        "Describe someone flirting without sounding crude.",
        "Say you like someone but want to take things slowly.",
        "Set a respectful boundary when someone confuses friendliness with flirting.",
      ],
    },
    completionTask: {
      title: "Your Colombian B2 flirty banter voice note",
      instructions: "Record a 60-second Colombian Spanish voice note explaining whether someone is flirting, whether the other person is receptive, and what boundary would keep it respectful.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En Colombia, decir que alguien “le está echando los perros” significa que está coqueteando o intentando acercarse románticamente. También se puede decir “caerle a alguien” cuando una persona decide hacer un movimiento. La clave está en el tono: puede sonar juguetón, pero también puede sonar intenso si la otra persona no ha dado señales.", translation: "In Colombia, saying someone is flirting means they are trying to approach romantically. You can also say caerle a alguien when someone decides to make a move. The key is tone: it can sound playful, but it can also sound intense if the other person has not given signals.", highlights: highlights(["echarle los perros a alguien", "caerle a alguien"]), shadowLine: "Ese man me está echando los perros." },
  { id: "p2", text: "Para leer interés, las frases pequeñas importan. Si alguien “me copia”, responde, presta atención o parece receptivo. Si además “me sigue el cuento”, entra en el juego de la conversación. Eso no siempre significa amor; a veces solo significa que hay química o confianza para bromear.", translation: "To read interest, small phrases matter. If someone me copia, they respond, pay attention, or seem receptive. If they also go along with the playful talk, they enter the conversational game. It does not always mean love; sometimes it only means there is chemistry or trust to joke.", highlights: highlights(["me copia", "seguirle el cuento"]), shadowLine: "Yo creo que ella me copia y me sigue el cuento." },
  { id: "p3", text: "“Echar labia” puede ser encanto, pero también puede ser demasiado. Una persona que solo habla bonito sin escuchar puede cansar. Por eso, en coqueteo real, no basta con echar labia: hay que mirar si la otra persona también da entrada, responde y se siente cómoda.", translation: "Smooth-talking can be charm, but it can also be too much. A person who only speaks nicely without listening can become tiring. That is why, in real flirting, smooth talk is not enough: you have to see whether the other person also gives an opening, responds, and feels comfortable.", highlights: highlights(["echar labia", "darle entrada"]), shadowLine: "Le está echando labia, pero ella también le está dando entrada." },
  { id: "p4", text: "El interés tiene niveles. “Me trama” suena como me gusta o me llama la atención. “Estoy encarretado” ya suena más emocional, como cuando uno se está metiendo en la historia. “Estar tragado” es más fuerte: estar muy metido, casi sin disimulo.", translation: "Interest has levels. Me trama sounds like I like them or they appeal to me. Estoy encarretado already sounds more emotional, like you are getting into the story. Estar tragado is stronger: being very into someone, almost unable to hide it.", highlights: highlights(["me trama", "estar encarretado", "estar tragado"]), shadowLine: "Sí me trama, pero no estoy tragada." },
  { id: "p5", text: "También hay que cuidar las expectativas. “Darle alas” es alimentar esperanzas románticas; por eso alguien puede decir “no quiero darle alas” o “no quiero ilusionarlo”. Es una forma responsable de decir: me gusta la conversación, pero no quiero prometer algo que todavía no siento.", translation: "You also need to care for expectations. Darle alas means feeding romantic hopes; that is why someone can say they do not want to get someone’s hopes up or lead them on. It is a responsible way to say: I like the conversation, but I do not want to promise something I do not yet feel.", highlights: highlights(["darle alas", "no quiero ilusionarlo"]), shadowLine: "No quiero darle alas ni ilusionarlo." },
  { id: "p6", text: "Algunas frases hablan de señales más concretas. “Pararle bolas” es prestarle atención a alguien; “darse picos” es besarse un poco; y “cuadrarse con alguien” ya es volverse pareja oficial. No conviene mezclar esos niveles: atención no siempre significa relación.", translation: "Some phrases talk about more concrete signals. Pararle bolas means paying attention to someone; darse picos means kissing a bit; and cuadrarse con alguien means becoming an official couple. It is not good to mix those levels: attention does not always mean relationship.", highlights: highlights(["pararle bolas", "darse picos", "cuadrarse con alguien"]), shadowLine: "Le para bolas, pero eso no significa que se vayan a cuadrar." },
  { id: "p7", text: "El coqueteo también necesita límites. “Plan arrunche” puede sonar tierno si los dos quieren algo íntimo, pero puede ser demasiado rápido si apenas se están conociendo. Y nadie quiere sentirse como “arrocito en bajo”, es decir, una opción guardada por si otra cosa no funciona.", translation: "Flirting also needs limits. Plan arrunche can sound sweet if both people want something intimate, but it can be too fast if they are just getting to know each other. And nobody wants to feel like arrocito en bajo, meaning a side option kept in case something else does not work.", highlights: highlights(["plan arrunche", "arrocito en bajo"]), shadowLine: "No voy a ser su arrocito en bajo." },
  { id: "p8", text: "Las mejores frases para cerrar son claras y suaves: “fresco, todo bien”, “vamos suave” y “no confunda amabilidad con coqueteo”. Así la persona puede mantener el respeto sin apagar la conversación. Coquetear no es presionar; es leer si el interés va y viene con comodidad.", translation: "The best closing phrases are clear and gentle: no worries, let’s take it slowly, and do not confuse friendliness with flirting. This way the person can maintain respect without shutting down the conversation. Flirting is not pressuring; it is reading whether interest moves back and forth comfortably.", highlights: highlights(["fresco, todo bien", "vamos suave", "no confunda amabilidad con coqueteo"]), shadowLine: "Vamos suave: no confunda amabilidad con coqueteo." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "colombian-b2-flirty-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Reading Colombian flirting signals while keeping boundaries respectful", "Formal office emails", "Ordering food in Bogotá", "Complaining about transport"], correctAnswer: "Reading Colombian flirting signals while keeping boundaries respectful", explanation: "The reading explains flirting, interest levels, signals, and respectful limits.", points: 1, skillTag: "gist" },
  { id: "colombian-b2-flirty-reading-q2", type: "multiple-choice", prompt: "Why is “me copia” not automatically the same as love?", options: ["It can simply mean the person responds or seems receptive", "It always means marriage", "It means the person is angry", "It only refers to copying homework"], correctAnswer: "It can simply mean the person responds or seems receptive", explanation: "The reading says it may show attention or chemistry, not necessarily love.", points: 1, skillTag: "meaning" },
  { id: "colombian-b2-flirty-reading-q3", type: "true-false", prompt: "True or false: “estar tragado” is stronger than “me trama.”", options: ["True", "False"], correctAnswer: "True", explanation: "The reading says estar tragado is a stronger level of interest.", points: 1, skillTag: "levels" },
  { id: "colombian-b2-flirty-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "I don’t want to lead him on.", wordBank: ["No", "quiero", "ilusionarlo."], correctAnswer: "No quiero ilusionarlo.", explanation: "This phrase sets a respectful boundary around expectations.", points: 1, skillTag: "boundary" },
  { id: "colombian-b2-flirty-reading-q5", type: "multiple-choice", prompt: "Which phrase means a backup romantic option?", options: ["arrocito en bajo", "me copia", "darse picos", "echar labia"], correctAnswer: "arrocito en bajo", explanation: "Arrocito en bajo means someone kept as a backup romantic option.", points: 1, skillTag: "vocab" },
];

export const colombianSpanishB2FlirtyBanterReadingInterestReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Colombian B2 Reading: Coqueteo sin Presión",
  subtitle: "A synced Spanish reading about Colombian flirting phrases, reading interest, soft boundaries, and taking things slowly.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "reading", "flirting", "interest"],
  estimatedMinutes: 16,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: flirtingVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Colombian B2 flirty banter and reading interest vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const colombianSpanishB2FlirtyBanterReadingInterestQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Colombian Spanish B2: Flirty Banter & Reading Interest Quiz",
  subtitle: "Choose the right Colombian phrase for flirting, reading signals, interest levels, and respectful boundaries.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "quiz", "flirting", "boundaries"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice choosing Colombian B2 phrases for playful flirting, reading interest, and avoiding mixed signals.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "colombian-b2-flirty-quiz-1", type: "multiple-choice", prompt: "Someone is clearly flirting with you. Which phrase fits?", options: ["Me está echando los perros", "Vamos suave", "No confunda amabilidad con coqueteo", "Se dieron picos"], correctAnswer: "Me está echando los perros", explanation: "Echarle los perros means to flirt with or hit on someone.", points: 1, skillTag: "flirting" },
      { id: "colombian-b2-flirty-quiz-2", type: "fill-blank", prompt: "Complete: Yo creo que ella me ____.", nativePrompt: "I think she is receptive.", correctAnswer: "copia", explanation: "Me copia means the person responds or seems receptive.", points: 1, skillTag: "signal" },
      { id: "colombian-b2-flirty-quiz-3", type: "multiple-choice", prompt: "You like someone casually. Which phrase fits?", options: ["Sí me trama", "Estoy tragado", "No quiero ilusionarlo", "Arrocito en bajo"], correctAnswer: "Sí me trama", explanation: "Me trama means I like him/her or they appeal to me.", points: 1, skillTag: "interest" },
      { id: "colombian-b2-flirty-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Let’s take it slowly.", wordBank: ["Mejor", "vamos", "suave."], correctAnswer: "Mejor vamos suave.", explanation: "Vamos suave slows the pace without killing the vibe.", points: 1, skillTag: "pace" },
      { id: "colombian-b2-flirty-quiz-5", type: "true-false", prompt: "True or false: “darle alas” can mean encouraging someone’s romantic hopes.", options: ["True", "False"], correctAnswer: "True", explanation: "Darle alas means encouraging someone’s hopes or expectations.", points: 1, skillTag: "expectations" },
      { id: "colombian-b2-flirty-quiz-6", type: "multiple-choice", prompt: "You don’t want someone to think your kindness is flirting. What do you say?", options: ["No confunda amabilidad con coqueteo", "Hacemos plan arrunche", "Se está haciendo el interesante", "Le está echando labia"], correctAnswer: "No confunda amabilidad con coqueteo", explanation: "This directly clarifies that friendliness is not flirting.", points: 1, skillTag: "boundary" },
      { id: "colombian-b2-flirty-quiz-7", type: "fill-blank", prompt: "Complete: No quiero ____.", nativePrompt: "I don’t want to lead him on.", correctAnswer: "ilusionarlo", explanation: "No quiero ilusionarlo means I don’t want to lead him on.", points: 1, skillTag: "respect" },
      { id: "colombian-b2-flirty-quiz-8", type: "multiple-choice", prompt: "Someone is kept as a backup romantic option. Which phrase names that?", options: ["arrocito en bajo", "me copia", "plan arrunche", "darse picos"], correctAnswer: "arrocito en bajo", explanation: "Arrocito en bajo is the backup romantic option.", points: 1, skillTag: "self-respect" },
      { id: "colombian-b2-flirty-quiz-9", type: "true-false", prompt: "True or false: “cuadrarse con alguien” means becoming an official couple.", options: ["True", "False"], correctAnswer: "True", explanation: "Cuadrarse con alguien means becoming official as a couple.", points: 1, skillTag: "relationship-status" },
      { id: "colombian-b2-flirty-quiz-10", type: "multiple-choice", prompt: "Which phrase means acting hard to get?", options: ["hacerse el interesante", "pararle bolas", "darse picos", "darle entrada"], correctAnswer: "hacerse el interesante", explanation: "Hacerse el interesante means acting hard to get.", points: 1, skillTag: "signals" },
      pairQuestion("colombian-b2-flirty-pairs-1", "Match flirting and receptive-signal phrases.", flirtingVocab.slice(0, 7)),
      pairQuestion("colombian-b2-flirty-pairs-2", "Match interest-level and relationship phrases.", flirtingVocab.slice(7, 14)),
      pairQuestion("colombian-b2-flirty-pairs-3", "Match boundary and expectation phrases.", flirtingVocab.slice(14)),
    ],
  },
};
