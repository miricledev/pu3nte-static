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

const courseId = "peruvian-spanish-c1-reading-the-room-at-a-party";
const skoolSectionName = "Peruvian Spanish - C1 Reading the Room at a Party";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const partyVocab: VocabItem[] = [
  { id: "ambiente-medio-cortado", term: "como que el ambiente está medio cortado", meaning: "the vibe feels a bit awkward / the atmosphere feels stilted", matchingMeaning: "the vibe feels awkward", note: "Useful when the party feels tense or socially frozen.", example: "Como que el ambiente está medio cortado desde que llegó Raúl.", translation: "The vibe feels a bit awkward since Raúl arrived.", starred: true },
  { id: "darle-bola-a-alguien", term: "darle bola a alguien", meaning: "to pay attention to someone / give someone attention", matchingMeaning: "give someone attention", note: "Informal social phrase for attention or interest.", example: "Nadie quiere darle bola a ese comentario.", translation: "Nobody wants to give that comment attention.", starred: true },
  { id: "nadie-le-esta-dando-mucha-bola", term: "nadie le está dando mucha bola", meaning: "nobody is paying them much attention", matchingMeaning: "nobody is paying them much attention", note: "Describes someone being ignored without saying it too harshly.", example: "Nadie le está dando mucha bola a la chica nueva.", translation: "Nobody is paying the new girl much attention.", starred: true },
  { id: "hacerle-el-habla-a-alguien", term: "hacerle el habla a alguien", meaning: "to strike up a conversation with someone", matchingMeaning: "strike up a conversation", note: "Natural Peruvian way to describe initiating contact.", example: "Bruno fue a hacerle el habla a Daniela.", translation: "Bruno went to strike up a conversation with Daniela.", starred: true },
  { id: "le-hizo-el-habla", term: "le hizo el habla", meaning: "they went over and started talking to them", matchingMeaning: "started talking to them", note: "Past form of hacerle el habla.", example: "Al final, le hizo el habla sin hacer roche.", translation: "In the end, he started talking to her without making it awkward.", starred: true },
  { id: "dar-sajiro", term: "dar sajiro", meaning: "to give someone an opening / encouraging signal", matchingMeaning: "give someone an opening", note: "Advanced local social-reading phrase for a green light.", example: "Ella le dio sajiro con una sonrisa.", translation: "She gave him an opening with a smile.", starred: true },
  { id: "le-dio-sajiro", term: "le dio sajiro", meaning: "they gave them an opening / green light", matchingMeaning: "gave them a green light", note: "Use when someone subtly makes room for contact.", example: "Creo que le dio sajiro para acercarse.", translation: "I think she gave him a green light to approach.", starred: true },
  { id: "estar-midiendose", term: "estar midiéndose", meaning: "to be sizing each other up", matchingMeaning: "be sizing each other up", note: "Describes mutual caution or assessment.", example: "Los dos están midiéndose antes de hablar claro.", translation: "The two of them are sizing each other up before speaking clearly.", starred: true },
  { id: "como-que-se-estan-midiendo", term: "como que se están midiendo", meaning: "it looks like they’re sizing each other up", matchingMeaning: "they are sizing each other up", note: "Soft observation rather than a direct accusation.", example: "Como que se están midiendo hace rato.", translation: "It looks like they’ve been sizing each other up for a while.", starred: true },
  { id: "ahi-hay-algo", term: "ahí hay algo", meaning: "there’s definitely something going on there", matchingMeaning: "something is going on there", note: "Social inference phrase when chemistry or tension is obvious.", example: "Entre esos dos, ahí hay algo.", translation: "Between those two, there’s definitely something going on.", starred: true },
  { id: "tirarle-flores-a-alguien", term: "tirarle flores a alguien", meaning: "to flatter someone / shower them with compliments", matchingMeaning: "flatter someone", note: "Often playful, sometimes too obvious.", example: "Se pasó tirándole flores toda la noche.", translation: "He went too far flattering her all night.", starred: true },
  { id: "le-esta-tirando-flores", term: "le está tirando flores", meaning: "they’re flattering them", matchingMeaning: "they are flattering them", note: "Present-progressive social observation.", example: "Le está tirando flores delante de todos.", translation: "He is flattering her in front of everyone.", starred: true },
  { id: "hacer-click", term: "hacer click", meaning: "to click / immediately connect with someone", matchingMeaning: "click with someone", note: "Borrowed but common in social chemistry talk.", example: "A veces haces click con alguien al toque.", translation: "Sometimes you click with someone right away.", starred: true },
  { id: "hicieron-click", term: "hicieron click", meaning: "they clicked / hit it off", matchingMeaning: "they clicked", note: "Past form for instant connection.", example: "Se notó que hicieron click.", translation: "You could tell they clicked.", starred: true },
  { id: "hacerle-el-bajo-a-alguien", term: "hacerle el bajo a alguien", meaning: "to help someone out, especially socially or romantically", matchingMeaning: "help someone socially", note: "Means quietly assisting someone’s social move.", example: "Le voy a hacer el bajo para que no entre solo.", translation: "I’ll help him out so he doesn’t come in alone.", starred: true },
  { id: "le-hizo-el-bajo", term: "le hizo el bajo", meaning: "they helped their friend make the connection", matchingMeaning: "helped make the connection", note: "Past form of social wingman help.", example: "Su amiga le hizo el bajo con mucho tacto.", translation: "Her friend helped her make the connection with a lot of tact.", starred: true },
  { id: "tirarle-arroz-a-alguien", term: "tirarle arroz a alguien", meaning: "to reject / snub someone", matchingMeaning: "reject someone", note: "Local social phrase for brushing someone off.", example: "No le tires arroz tan fuerte si solo está nervioso.", translation: "Don’t reject him so harshly if he’s just nervous.", starred: true },
  { id: "le-tiro-arroz", term: "le tiró arroz", meaning: "they rejected / brushed them off", matchingMeaning: "brushed them off", note: "Past form of rejection or snub.", example: "Le tiró arroz delante de todos.", translation: "She brushed him off in front of everyone.", starred: true },
  { id: "hacerse-el-loco-la-loca", term: "hacerse el loco / la loca", meaning: "to pretend not to notice / act like you don’t know what’s going on", matchingMeaning: "pretend not to notice", note: "Common social avoidance phrase.", example: "Se hizo la loca para no contestar.", translation: "She pretended not to notice so she didn’t have to answer.", starred: true },
  { id: "se-hizo-el-loco", term: "se hizo el loco", meaning: "he pretended not to notice", matchingMeaning: "he pretended not to notice", note: "Masculine past form.", example: "Cuando lo miraron, se hizo el loco.", translation: "When they looked at him, he pretended not to notice.", starred: true },
  { id: "seguirle-la-cuerda-a-alguien", term: "seguirle la cuerda a alguien", meaning: "to play along with someone", matchingMeaning: "play along with someone", note: "Can be playful or strategic.", example: "Le siguió la cuerda para no cortarle el ánimo.", translation: "She played along so she wouldn’t kill his mood.", starred: true },
  { id: "le-sigue-la-cuerda", term: "le sigue la cuerda", meaning: "they’re playing along with them", matchingMeaning: "they are playing along", note: "Present form of playing along.", example: "Ella le sigue la cuerda, pero tranquila.", translation: "She’s playing along with him, but calmly.", starred: true },
  { id: "hasta-ahi-nomas", term: "hasta ahí nomás", meaning: "only up to that point / no further than that", matchingMeaning: "only up to that point", note: "Boundary phrase for playful but limited engagement.", example: "Bromea un poco, pero hasta ahí nomás.", translation: "She jokes a little, but only up to that point.", starred: true },
  { id: "sigue-cuerda-hasta-ahi", term: "le sigue la cuerda, pero hasta ahí nomás", meaning: "they play along, but only to a point", matchingMeaning: "play along only to a point", note: "Shows interest or politeness with a clear limit.", example: "Le sigue la cuerda, pero hasta ahí nomás.", translation: "She plays along, but only to a point.", starred: true },
  { id: "tirarle-lente-a-alguien", term: "tirarle lente a alguien", meaning: "to check someone out / look at them with obvious interest", matchingMeaning: "check someone out", note: "Visual interest that other people can notice.", example: "Está tirándole lente desde la cocina.", translation: "He’s checking her out from the kitchen.", starred: true },
  { id: "le-esta-tirando-lente", term: "le está tirando lente", meaning: "they’re checking them out", matchingMeaning: "they are checking them out", note: "Present observation of obvious looking.", example: "Le está tirando lente hace rato.", translation: "He’s been checking her out for a while.", starred: true },
  { id: "aplicarle-ley-hielo", term: "aplicarle la ley del hielo a alguien", meaning: "to give someone the silent treatment", matchingMeaning: "give someone the silent treatment", note: "Known idiom used across Spanish, natural in Peruvian social drama.", example: "Después del comentario, le aplicaron la ley del hielo.", translation: "After the comment, they gave him the silent treatment.", starred: true },
  { id: "le-aplicaron-ley-hielo", term: "le aplicaron la ley del hielo", meaning: "they gave them the silent treatment", matchingMeaning: "they gave them the silent treatment", note: "Past form for group exclusion or coldness.", example: "En la reunión le aplicaron la ley del hielo.", translation: "At the gathering they gave him the silent treatment.", starred: true },
  { id: "dejar-tirando-cintura", term: "dejar a alguien tirando cintura", meaning: "to leave someone hanging / leave them expecting something that never happens", matchingMeaning: "leave someone hanging", note: "Vivid phrase for social or romantic expectation that goes nowhere.", example: "No lo dejes tirando cintura si no vas a volver.", translation: "Don’t leave him hanging if you’re not coming back.", starred: true },
  { id: "lo-dejaron-tirando-cintura", term: "lo dejaron tirando cintura", meaning: "they left him hanging", matchingMeaning: "they left him hanging", note: "Past form of being left waiting or exposed.", example: "Lo dejaron tirando cintura cerca de la mesa.", translation: "They left him hanging near the table.", starred: true },
  { id: "estar-palteado", term: "estar palteado/a", meaning: "to feel awkward, embarrassed, nervous, or self-conscious", matchingMeaning: "feel awkward or embarrassed", note: "Very useful Peruvian emotion word.", example: "Está palteada porque no conoce a nadie.", translation: "She feels awkward because she doesn’t know anyone.", starred: true },
  { id: "se-nota-que-esta-palteado", term: "se nota que está palteado", meaning: "you can tell they feel awkward / embarrassed", matchingMeaning: "you can tell they feel awkward", note: "Useful observation when someone’s discomfort is visible.", example: "Se nota que está palteado, mejor no lo presiones.", translation: "You can tell he feels awkward; better not pressure him.", starred: true },
  { id: "hacer-roche", term: "hacer roche", meaning: "to make an embarrassing scene / create an awkward situation", matchingMeaning: "make an awkward scene", note: "Roche is a key Peruvian word for awkward embarrassment.", example: "No hagas roche delante de todos.", translation: "Don’t make an awkward scene in front of everyone.", starred: true },
  { id: "no-quiere-hacer-roche", term: "no quiere hacer roche", meaning: "they don’t want to make things awkward / embarrass themselves", matchingMeaning: "doesn’t want to make things awkward", note: "Explains restraint or silence at a party.", example: "No se acerca porque no quiere hacer roche.", translation: "He doesn’t approach because he doesn’t want to make things awkward.", starred: true },
  { id: "tension-medio-rara", term: "se armó una tensión medio rara", meaning: "a weird tension developed", matchingMeaning: "a weird tension developed", note: "Names a subtle social shift after a bad moment.", example: "Después del chiste, se armó una tensión medio rara.", translation: "After the joke, a weird tension developed.", starred: true },
  { id: "tantear-el-terreno", term: "tantear el terreno", meaning: "to test the waters / feel out the situation", matchingMeaning: "test the waters", note: "Advanced phrase for cautious social probing.", example: "Primero voy a tantear el terreno.", translation: "First I’m going to test the waters.", starred: true },
  { id: "esta-tanteando-el-terreno", term: "está tanteando el terreno", meaning: "they’re testing the waters", matchingMeaning: "they are testing the waters", note: "Present observation of cautious interest.", example: "Está tanteando el terreno antes de invitarla.", translation: "He’s testing the waters before inviting her.", starred: true },
  { id: "entrar-en-la-conversa", term: "entrar en la conversa", meaning: "to engage in / get involved in the conversation", matchingMeaning: "engage in the conversation", note: "Conversa is natural informal Spanish for conversation.", example: "Si entra en la conversa, ahí recién invítala.", translation: "If she engages in the conversation, then invite her.", starred: true },
  { id: "no-esta-entrando-mucho", term: "no está entrando mucho en la conversa", meaning: "they’re not really engaging in the conversation", matchingMeaning: "not really engaging in conversation", note: "A key cue that someone may not be interested or comfortable.", example: "No está entrando mucho en la conversa; dale espacio.", translation: "She’s not really engaging in the conversation; give her space.", starred: true },
  { id: "darle-su-espacio", term: "darle su espacio a alguien", meaning: "to give someone their space", matchingMeaning: "give someone space", note: "Respectful boundary phrase.", example: "Mejor hay que darle su espacio.", translation: "It’s better to give her space.", starred: true },
  { id: "mejor-dale-su-espacio", term: "mejor dale su espacio, nomás", meaning: "better just give them some space", matchingMeaning: "better give them some space", note: "Direct advice when someone seems uncomfortable.", example: "Mejor dale su espacio, nomás.", translation: "Better just give her some space.", starred: true },
  { id: "hace-rato", term: "hace rato", meaning: "for a while now / for some time", matchingMeaning: "for a while now", note: "Useful time marker for ongoing social cues.", example: "Hace rato que no entra en la conversa.", translation: "For a while now she hasn’t engaged in the conversation.", starred: true },
  { id: "clarisimo", term: "clarísimo", meaning: "extremely obvious / crystal clear", matchingMeaning: "crystal clear", note: "Strong emphasis that a cue is obvious.", example: "Está clarísimo que quiere irse.", translation: "It’s crystal clear that she wants to leave.", starred: true },
];

const highlightMap = Object.fromEntries(partyVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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

const sentenceVocab = partyVocab.map((item) => `${item.term} = ${item.meaning}`);

export const peruvianSpanishC1ReadingRoomPartyFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "Peruvian Spanish C1: Reading the Room at a Party Flashcards",
  subtitle: "Advanced Peruvian social-reading phrases for awkward vibes, interest, rejection, wingman help, and giving space.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "flashcards", "party", "social cues"],
  estimatedMinutes: 22,
  skoolSectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { specialCharacters, cards: partyVocab.map(cardFromVocab) },
};

export const peruvianSpanishC1ReadingRoomPartySentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "C1 Sentence Builder: Peruvian Party Social Cues",
  subtitle: "Build nuanced Peruvian Spanish for reading awkwardness, interest, rejection, and boundaries at a party.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["peruvian-spanish", "c1", "sentence-builder", "social cues", "party"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 75-second Peruvian Spanish voice note describing a party scene: who is interested, who is awkward, who needs space, and how to avoid making roche.",
    stages: [
      stage("stage-1", "Read the vibe", sentenceVocab.slice(0, 3), sentenceVocab.slice(0, 3), "The vibe feels awkward, and nobody is paying him much attention.", "Como que el ambiente está medio cortado y nadie le está dando mucha bola.", "This observes the room without blaming anyone directly.", breakdown([["The vibe feels awkward", "Como que el ambiente está medio cortado"], ["nobody is paying him much attention", "nadie le está dando mucha bola"]])),
      stage("stage-2", "Start contact", sentenceVocab.slice(3, 7), sentenceVocab.slice(0, 7), "She started talking to him because he gave her an opening.", "Ella le hizo el habla porque él le dio sajiro.", "This describes a subtle invitation and response.", breakdown([["started talking to him", "le hizo el habla"], ["because", "porque"], ["he gave her an opening", "él le dio sajiro"]])),
      stage("stage-3", "Spot chemistry", sentenceVocab.slice(7, 14), sentenceVocab.slice(0, 14), "It looks like they’re sizing each other up; there’s something going on and they clicked.", "Como que se están midiendo; ahí hay algo e hicieron click.", "Use this for chemistry that is visible but still indirect.", breakdown([["they’re sizing each other up", "se están midiendo"], ["there’s something going on", "ahí hay algo"], ["they clicked", "hicieron click"]])),
      stage("stage-4", "Flattery and help", sentenceVocab.slice(10, 16), sentenceVocab.slice(0, 16), "He is flattering her, and his friend helped him make the connection.", "Él le está tirando flores y su pata le hizo el bajo.", "This combines visible flirting with wingman support.", breakdown([["he is flattering her", "le está tirando flores"], ["his friend", "su pata"], ["helped him make the connection", "le hizo el bajo"]])),
      stage("stage-5", "Rejection and avoidance", sentenceVocab.slice(16, 21), sentenceVocab.slice(0, 21), "She brushed him off, and he pretended not to notice.", "Ella le tiró arroz y él se hizo el loco.", "This describes rejection plus face-saving avoidance.", breakdown([["she brushed him off", "le tiró arroz"], ["he pretended not to notice", "se hizo el loco"]])),
      stage("stage-6", "Play along with limits", sentenceVocab.slice(21, 27), sentenceVocab.slice(0, 27), "She’s playing along, but only to a point; he has been checking her out for a while.", "Ella le sigue la cuerda, pero hasta ahí nomás; él le está tirando lente hace rato.", "This separates playful engagement from full interest.", breakdown([["she’s playing along", "le sigue la cuerda"], ["only to a point", "hasta ahí nomás"], ["checking her out", "tirando lente"]])),
      stage("stage-7", "Awkward fallout", sentenceVocab.slice(27, 36), sentenceVocab.slice(0, 36), "They gave him the silent treatment, left him hanging, and a weird tension developed.", "Le aplicaron la ley del hielo, lo dejaron tirando cintura y se armó una tensión medio rara.", "This captures the social fallout after someone mishandles the room.", breakdown([["gave him the silent treatment", "le aplicaron la ley del hielo"], ["left him hanging", "lo dejaron tirando cintura"], ["a weird tension developed", "se armó una tensión medio rara"]])),
      stage("stage-8", "Give space", sentenceVocab.slice(31), sentenceVocab, "You can tell she feels awkward; she is not really engaging, so better just give her some space.", "Se nota que está palteada; no está entrando mucho en la conversa, así que mejor dale su espacio, nomás.", "This is the respectful C1 move: read discomfort and stop pushing.", breakdown([["you can tell she feels awkward", "se nota que está palteada"], ["not really engaging", "no está entrando mucho en la conversa"], ["give her some space", "dale su espacio"]])),
    ],
  },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-party-story-q1", type: "multiple-choice", prompt: "After message 3, what does Valeria notice about the room?", options: ["The vibe is awkward and Nico is not getting much attention", "Everyone is dancing with Nico", "The party already ended", "Nico is arguing about money"], correctAnswer: "The vibe is awkward and Nico is not getting much attention", explanation: "Valeria says the ambiente está medio cortado and nobody is giving him much bola.", points: 1, skillTag: "social-cues" },
  { id: "peruvian-c1-party-story-q2", type: "multiple-choice", prompt: "After message 6, what does Diego think Nico should do?", options: ["Start a conversation carefully", "Leave immediately", "Make a scene", "Ignore everyone"], correctAnswer: "Start a conversation carefully", explanation: "Diego suggests hacerle el habla only if there is an opening.", points: 1, skillTag: "approach" },
  { id: "peruvian-c1-party-story-q3", type: "true-false", prompt: "After message 9, true or false: Valeria thinks there may be chemistry between Nico and Lucía.", options: ["True", "False"], correctAnswer: "True", explanation: "She says como que se están midiendo and ahí hay algo.", points: 1, skillTag: "chemistry" },
  { id: "peruvian-c1-party-story-q4", type: "multiple-choice", prompt: "After message 12, what is Diego trying to avoid?", options: ["Making things awkward by exaggerating the help", "Paying for dinner", "Losing his phone", "Changing the music"], correctAnswer: "Making things awkward by exaggerating the help", explanation: "He says he can help, but not hacer roche.", points: 1, skillTag: "tact" },
  { id: "peruvian-c1-party-story-q5", type: "multiple-choice", prompt: "After message 15, what did Lucía do when Nico got too intense?", options: ["She brushed him off", "She invited him to dance", "She left with Diego", "She sent him money"], correctAnswer: "She brushed him off", explanation: "Valeria says Lucía le tiró arroz.", points: 1, skillTag: "rejection" },
  { id: "peruvian-c1-party-story-q6", type: "multiple-choice", prompt: "After message 18, how far is Lucía willing to play along?", options: ["Only to a point", "Without any limits", "Not at all from the start", "Only if Valeria pays"], correctAnswer: "Only to a point", explanation: "Diego says she follows the thread, but hasta ahí nomás.", points: 1, skillTag: "boundary" },
  { id: "peruvian-c1-party-story-q7", type: "true-false", prompt: "After message 21, true or false: Nico’s behavior created a weird tension.", options: ["True", "False"], correctAnswer: "True", explanation: "Valeria says se armó una tensión medio rara.", points: 1, skillTag: "tension" },
  { id: "peruvian-c1-party-story-q8", type: "multiple-choice", prompt: "After message 24, why should Nico stop pushing?", options: ["Lucía is not really engaging in the conversation", "Lucía asked him for a job", "The party is out of food", "Diego wants to sing"], correctAnswer: "Lucía is not really engaging in the conversation", explanation: "Diego says she no está entrando mucho en la conversa.", points: 1, skillTag: "respect" },
  { id: "peruvian-c1-party-story-q9", type: "multiple-choice", prompt: "After message 27, what does Valeria say is crystal clear?", options: ["Lucía needs space", "Nico should talk louder", "Diego should leave", "The music is too slow"], correctAnswer: "Lucía needs space", explanation: "Valeria says está clarísimo and tells him to give her space.", points: 1, skillTag: "inference" },
  { id: "peruvian-c1-party-story-q10", type: "multiple-choice", prompt: "By message 30, what is the main social lesson?", options: ["Read the room and give space before making things awkward", "Keep pushing until someone answers", "Ignore awkwardness at parties", "Always flatter people in public"], correctAnswer: "Read the room and give space before making things awkward", explanation: "They decide Nico should breathe, test the waters, and avoid making roche.", points: 1, skillTag: "summary" },
];

const storyAudioBase = `/audio/stories/${courseId}`;

export const peruvianSpanishC1ReadingRoomPartyWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "Peruvian C1 Story: The Party Signals",
  subtitle: "Valeria and Diego read the room when a friend keeps missing the social cues at a party.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "WhatsApp", "party", "social cues"],
  estimatedMinutes: 20,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "valeria", name: "Valeria", initials: "VA", side: "right", color: "violet" },
      { id: "diego", name: "Diego", initials: "DI", side: "left", color: "blue" },
    ],
    messages: [
      message("m1", "valeria", "Diego, mira la sala. Como que el ambiente está medio cortado.", "Diego, look at the room. The vibe feels a bit awkward.", ["como que el ambiente está medio cortado"]),
      message("m2", "diego", "Sí, Nico llegó con toda la energía, pero nadie le está dando mucha bola.", "Yeah, Nico arrived with full energy, but nobody is paying him much attention.", ["nadie le está dando mucha bola", "darle bola a alguien"]),
      message("m3", "valeria", "Hace rato intenta entrar en la conversa y no engancha con nadie.", "He’s been trying to get into the conversation for a while and he’s not connecting with anyone.", ["hace rato", "entrar en la conversa"], "voice-note", `${storyAudioBase}/m3.mp3`),
      message("m4", "diego", "Capaz debería hacerle el habla a Lucía, pero suave.", "Maybe he should strike up a conversation with Lucía, but gently.", ["hacerle el habla a alguien"]),
      message("m5", "valeria", "No sé. Ella le dio sajiro cuando se rió, pero fue chiquito.", "I don’t know. She gave him an opening when she laughed, but it was small.", ["le dio sajiro", "dar sajiro"]),
      message("m6", "diego", "Entonces que tantee el terreno primero, no que entre como animador de quinceañero.", "Then he should test the waters first, not come in like a party host.", ["tantear el terreno"], "voice-note", `${storyAudioBase}/m6.mp3`),
      message("m7", "valeria", "Míralos. Como que se están midiendo.", "Look at them. It looks like they’re sizing each other up.", ["como que se están midiendo", "estar midiéndose"]),
      message("m8", "diego", "Ahí hay algo, ¿no? Ella no se ha ido.", "There’s something going on there, right? She hasn’t left.", ["ahí hay algo"]),
      message("m9", "valeria", "Sí, pero Nico ya empezó a tirarle flores demasiado rápido.", "Yes, but Nico already started flattering her too quickly.", ["tirarle flores a alguien"]),
      message("m10", "diego", "Le está tirando flores delante de todos. Eso puede hacer roche.", "He’s flattering her in front of everyone. That can make things awkward.", ["le está tirando flores", "hacer roche"]),
      message("m11", "valeria", "Tu pata Mateo le hizo el bajo, pero también exageró.", "Your friend Mateo helped him make the connection, but he also exaggerated.", ["le hizo el bajo", "hacerle el bajo a alguien"]),
      message("m12", "diego", "Claro. Una cosa es ayudarlo y otra ponerla incómoda.", "Of course. Helping him is one thing; making her uncomfortable is another.", [], "voice-note", `${storyAudioBase}/m12.mp3`),
      message("m13", "valeria", "Uy, Lucía le tiró arroz cuando él quiso bailar.", "Oof, Lucía brushed him off when he wanted to dance.", ["le tiró arroz", "tirarle arroz a alguien"]),
      message("m14", "diego", "Y él se hizo el loco, como si no hubiera entendido.", "And he pretended not to notice, as if he hadn’t understood.", ["se hizo el loco", "hacerse el loco / la loca"]),
      message("m15", "valeria", "Pobre, pero se nota que está palteado.", "Poor guy, but you can tell he feels awkward.", ["se nota que está palteado", "estar palteado/a"]),
      message("m16", "diego", "Ella le sigue la cuerda un poco para no ser fría.", "She’s playing along with him a little so she doesn’t seem cold.", ["le sigue la cuerda", "seguirle la cuerda a alguien"]),
      message("m17", "valeria", "Sí, pero hasta ahí nomás. No quiere abrir más puerta.", "Yes, but only to a point. She doesn’t want to open the door further.", ["hasta ahí nomás"]),
      message("m18", "diego", "Exacto: le sigue la cuerda, pero hasta ahí nomás.", "Exactly: she plays along, but only to a point.", ["le sigue la cuerda, pero hasta ahí nomás"], "voice-note", `${storyAudioBase}/m18.mp3`),
      message("m19", "valeria", "Encima él le está tirando lente hace rato.", "On top of that, he has been checking her out for a while.", ["le está tirando lente", "tirarle lente a alguien", "hace rato"]),
      message("m20", "diego", "Eso ya todos lo vieron. Clarísimo.", "Everyone has already seen that. Crystal clear.", ["clarísimo"]),
      message("m21", "valeria", "Después del chiste sobre su ex, se armó una tensión medio rara.", "After the joke about her ex, a weird tension developed.", ["se armó una tensión medio rara"]),
      message("m22", "diego", "Si sigue así, le aplican la ley del hielo.", "If he keeps going like that, they’ll give him the silent treatment.", ["aplicarle la ley del hielo a alguien"]),
      message("m23", "valeria", "Ya medio le aplicaron la ley del hielo en la cocina.", "They already kind of gave him the silent treatment in the kitchen.", ["le aplicaron la ley del hielo"]),
      message("m24", "diego", "Porque ella no está entrando mucho en la conversa. Hay que leer eso.", "Because she’s not really engaging in the conversation. He needs to read that.", ["no está entrando mucho en la conversa"]),
      message("m25", "valeria", "Nico se quedó cerca de la mesa esperando otra señal.", "Nico stayed near the table waiting for another signal.", []),
      message("m26", "diego", "Lo dejaron tirando cintura, pero tampoco lo hicieron con mala onda.", "They left him hanging, but they didn’t do it with bad vibes either.", ["lo dejaron tirando cintura", "dejar a alguien tirando cintura"]),
      message("m27", "valeria", "Está clarísimo: mejor dale su espacio, nomás.", "It’s crystal clear: better just give her some space.", ["clarísimo", "mejor dale su espacio, nomás", "darle su espacio a alguien"], "voice-note", `${storyAudioBase}/m27.mp3`),
      message("m28", "diego", "Voy a jalarlo un toque sin hacerlo quedar mal.", "I’m going to pull him aside for a moment without making him look bad.", []),
      message("m29", "valeria", "Dile que respire, que tantee el terreno y que no haga roche.", "Tell him to breathe, test the waters, and not make things awkward.", ["tantear el terreno", "hacer roche"]),
      message("m30", "diego", "Listo. Leer el cuarto primero, flores después. Si no, espacio nomás.", "Done. Read the room first, compliments later. If not, just space.", ["darle su espacio a alguien"], "voice-note", `${storyAudioBase}/m30.mp3`),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `peruvian-c1-party-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: partyVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: partyVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft observations: como que..., como que se están midiendo, como que el ambiente está medio cortado.",
        "Social inference: ahí hay algo, clarísimo, se nota que está palteado.",
        "Respectful boundaries: hasta ahí nomás, no está entrando mucho en la conversa, dale su espacio.",
      ],
      speakingPrompts: [
        "Describe a party where the atmosphere feels awkward.",
        "Explain who is interested, who is uncomfortable, and why.",
        "Tell a friend when to test the waters and when to give space.",
      ],
    },
    completionTask: {
      title: "Your Peruvian C1 party read voice note",
      instructions: "Record a 75-second Peruvian Spanish voice note reading the room at a party. Mention attention, awkwardness, interest, rejection, and when someone should give space.",
    },
  },
};

const readingParagraphs = [
  { id: "p1", text: "En una fiesta, no todo se dice de frente. A veces basta mirar la sala y pensar: “como que el ambiente está medio cortado”. Esa frase sirve cuando la energía está rara, la conversa no fluye y la gente está cuidando demasiado lo que dice.", translation: "At a party, not everything is said directly. Sometimes it is enough to look around and think: como que el ambiente está medio cortado. That phrase works when the energy is strange, conversation does not flow, and people are watching what they say too much.", highlights: highlights(["como que el ambiente está medio cortado", "entrar en la conversa"]), shadowLine: "Como que el ambiente está medio cortado." },
  { id: "p2", text: "La atención también se lee. Si “nadie le está dando mucha bola” a alguien, conviene no empujarlo al centro. “Darle bola a alguien” puede ser interés, cortesía o simple atención social. En C1, la habilidad está en no confundir esas señales.", translation: "Attention can also be read. If nobody is paying someone much attention, it is better not to push them into the center. Darle bola a alguien can be interest, politeness, or simple social attention. At C1, the skill is not confusing those signals.", highlights: highlights(["nadie le está dando mucha bola", "darle bola a alguien"]), shadowLine: "Nadie le está dando mucha bola." },
  { id: "p3", text: "Cuando alguien quiere acercarse, puede “hacerle el habla” a otra persona. Pero antes conviene “tantear el terreno”. Si la otra persona “le dio sajiro”, hay una pequeña apertura. Si no, entrar con demasiada fuerza puede hacer roche.", translation: "When someone wants to approach, they can strike up a conversation with another person. But first it is wise to test the waters. If the other person gave them an opening, there is a small opening. If not, coming in too strongly can make things awkward.", highlights: highlights(["hacerle el habla a alguien", "tantear el terreno", "le dio sajiro", "hacer roche"]), shadowLine: "Primero tantea el terreno; después hazle el habla." },
  { id: "p4", text: "Dos personas pueden estar “midiéndose” sin decir nada claro. Si “como que se están midiendo” y “ahí hay algo”, quizá hay interés. Si además “hicieron click”, la conexión se nota. Pero incluso ahí, no todo permiso es una invitación abierta.", translation: "Two people can be sizing each other up without saying anything clearly. If it looks like they are sizing each other up and there is something going on, maybe there is interest. If they also clicked, the connection is visible. But even there, not every permission is an open invitation.", highlights: highlights(["estar midiéndose", "como que se están midiendo", "ahí hay algo", "hicieron click", "hacer click"]), shadowLine: "Como que se están midiendo; ahí hay algo." },
  { id: "p5", text: "Los cumplidos pueden ayudar o incomodar. “Tirarle flores a alguien” suena bonito, pero si “le está tirando flores” delante de todo el mundo, puede ser demasiado. Un amigo puede “hacerle el bajo” a otro, pero con tacto, no convirtiendo la escena en espectáculo.", translation: "Compliments can help or make people uncomfortable. Tirarle flores a alguien sounds nice, but if someone is flattering another person in front of everyone, it can be too much. A friend can help someone socially, but with tact, not turning the scene into a show.", highlights: highlights(["tirarle flores a alguien", "le está tirando flores", "hacerle el bajo a alguien", "le hizo el bajo"]), shadowLine: "Le está tirando flores, pero su pata le hizo el bajo." },
  { id: "p6", text: "Cuando alguien rechaza, puede “tirarle arroz” a la otra persona. Si “le tiró arroz” y él “se hizo el loco”, quizá está tratando de salvar cara. A veces la persona “le sigue la cuerda”, pero “hasta ahí nomás”: juega un poco, sin abrir más puerta.", translation: "When someone rejects, they can brush the other person off. If she brushed him off and he pretended not to notice, maybe he is trying to save face. Sometimes the person plays along, but only to a point: they play a little without opening the door further.", highlights: highlights(["tirarle arroz a alguien", "le tiró arroz", "se hizo el loco", "hacerse el loco / la loca", "le sigue la cuerda", "hasta ahí nomás", "le sigue la cuerda, pero hasta ahí nomás"]), shadowLine: "Le sigue la cuerda, pero hasta ahí nomás." },
  { id: "p7", text: "Hay señales que piden distancia. Si alguien “le está tirando lente” hace rato y la otra persona “no está entrando mucho en la conversa”, puede aparecer incomodidad. Si “se nota que está palteado” o “se armó una tensión medio rara”, mejor no insistir.", translation: "Some signals call for distance. If someone has been checking another person out for a while and the other person is not really engaging in the conversation, discomfort can appear. If you can tell someone feels awkward or a weird tension developed, it is better not to insist.", highlights: highlights(["le está tirando lente", "tirarle lente a alguien", "hace rato", "no está entrando mucho en la conversa", "se nota que está palteado", "se armó una tensión medio rara"]), shadowLine: "No está entrando mucho en la conversa." },
  { id: "p8", text: "El peor cierre es dejar a alguien “tirando cintura” o aplicarle “la ley del hielo” sin manejar la situación. Pero tampoco hay que forzar cercanía. Si está “clarísimo” que alguien necesita aire, la frase más madura es: “mejor dale su espacio, nomás”.", translation: "The worst ending is leaving someone hanging or giving them the silent treatment without handling the situation. But you should not force closeness either. If it is crystal clear that someone needs air, the most mature phrase is: mejor dale su espacio, nomás.", highlights: highlights(["dejar a alguien tirando cintura", "lo dejaron tirando cintura", "aplicarle la ley del hielo a alguien", "le aplicaron la ley del hielo", "clarísimo", "mejor dale su espacio, nomás", "darle su espacio a alguien"]), shadowLine: "Está clarísimo: mejor dale su espacio, nomás." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "peruvian-c1-party-reading-q1", type: "multiple-choice", prompt: "What is the reading mainly about?", options: ["Reading subtle social cues at a Peruvian party", "Negotiating professional fees", "Splitting a restaurant bill", "Giving transport directions"], correctAnswer: "Reading subtle social cues at a Peruvian party", explanation: "The reading explains attention, awkwardness, interest, rejection, and giving space.", points: 1, skillTag: "gist" },
  { id: "peruvian-c1-party-reading-q2", type: "multiple-choice", prompt: "Which phrase means the vibe feels awkward?", options: ["Como que el ambiente está medio cortado", "Le dio sajiro", "Hicieron click", "Le hizo el bajo"], correctAnswer: "Como que el ambiente está medio cortado", explanation: "This describes an awkward or stilted atmosphere.", points: 1, skillTag: "vibe" },
  { id: "peruvian-c1-party-reading-q3", type: "true-false", prompt: "True or false: “le sigue la cuerda, pero hasta ahí nomás” means someone plays along without fully opening the door.", options: ["True", "False"], correctAnswer: "True", explanation: "The reading explains that this means playing along only to a point.", points: 1, skillTag: "boundary" },
  { id: "peruvian-c1-party-reading-q4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "Better just give them some space.", wordBank: ["Mejor", "dale", "su", "espacio,", "nomás."], correctAnswer: "Mejor dale su espacio, nomás.", explanation: "This is the respectful phrase when someone seems uncomfortable.", points: 1, skillTag: "phrase-building" },
  { id: "peruvian-c1-party-reading-q5", type: "multiple-choice", prompt: "Which phrase means someone is not really engaging in the conversation?", options: ["No está entrando mucho en la conversa", "Le está tirando lente", "Le aplicaron la ley del hielo", "Ahí hay algo"], correctAnswer: "No está entrando mucho en la conversa", explanation: "This phrase says the person is not really participating or engaging.", points: 1, skillTag: "engagement" },
];

export const peruvianSpanishC1ReadingRoomPartyReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "Peruvian C1 Reading: Leyendo la Sala en una Fiesta",
  subtitle: "A synced Spanish reading about reading attention, awkwardness, attraction, rejection, and boundaries at a party.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "reading", "party", "social cues"],
  estimatedMinutes: 16,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: partyVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.matchingMeaning ?? item.meaning })), explanation: "These pairs come from the Peruvian C1 reading-the-room-at-a-party vocabulary.", points: items.length, skillTag: "vocab-matching" };
}

export const peruvianSpanishC1ReadingRoomPartyQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "Peruvian Spanish C1: Reading the Room at a Party Quiz",
  subtitle: "Choose the right Peruvian phrase for social cues, attraction, awkwardness, rejection, and respectful distance.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "advanced",
  tags: ["Peruvian Spanish", "C1", "quiz", "party", "social cues"],
  estimatedMinutes: 18,
  skoolSectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "quiz",
  data: {
    description: "Practice Peruvian C1 phrases for reading the room at a party: awkward vibes, attention, flirting signals, rejection, and giving space.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "peruvian-c1-party-quiz-1", type: "multiple-choice", prompt: "The atmosphere feels awkward and stiff. What fits?", options: ["Como que el ambiente está medio cortado", "Le hizo el bajo", "Tirarle flores", "Hicieron click"], correctAnswer: "Como que el ambiente está medio cortado", explanation: "This phrase describes an awkward or stilted vibe.", points: 1, skillTag: "vibe" },
      { id: "peruvian-c1-party-quiz-2", type: "fill-blank", prompt: "Complete: Nadie le está dando mucha ____.", nativePrompt: "Nobody is paying them much attention.", correctAnswer: "bola", explanation: "Darle bola means to give attention.", points: 1, skillTag: "attention" },
      { id: "peruvian-c1-party-quiz-3", type: "multiple-choice", prompt: "Someone cautiously checks whether an approach is welcome. Which phrase fits?", options: ["Tantear el terreno", "Aplicarle la ley del hielo", "Dejarlo tirando cintura", "Hacer roche"], correctAnswer: "Tantear el terreno", explanation: "Tantear el terreno means to test the waters.", points: 1, skillTag: "testing" },
      { id: "peruvian-c1-party-quiz-4", type: "order-words", prompt: "Order the phrase.", nativePrompt: "They clicked.", wordBank: ["Hicieron", "click."], correctAnswer: "Hicieron click.", explanation: "Hicieron click means they immediately connected or hit it off.", points: 1, skillTag: "chemistry" },
      { id: "peruvian-c1-party-quiz-5", type: "true-false", prompt: "True or false: “le tiró arroz” means they brushed someone off.", options: ["True", "False"], correctAnswer: "True", explanation: "Tirarle arroz a alguien means to reject or snub someone.", points: 1, skillTag: "rejection" },
      { id: "peruvian-c1-party-quiz-6", type: "multiple-choice", prompt: "A friend helps someone make a social connection. Which phrase fits?", options: ["Le hizo el bajo", "Se hizo el loco", "Le tiró arroz", "Está palteado"], correctAnswer: "Le hizo el bajo", explanation: "Hacerle el bajo means to help someone socially or romantically.", points: 1, skillTag: "help" },
      { id: "peruvian-c1-party-quiz-7", type: "fill-blank", prompt: "Complete: Se nota que está ____.", nativePrompt: "You can tell they feel awkward.", correctAnswer: "palteado", explanation: "Estar palteado means to feel awkward, embarrassed, or self-conscious.", points: 1, skillTag: "awkwardness" },
      { id: "peruvian-c1-party-quiz-8", type: "multiple-choice", prompt: "Someone is playing along but clearly not inviting more. What fits?", options: ["Le sigue la cuerda, pero hasta ahí nomás", "Ahí hay algo", "Le está tirando flores", "Clarísimo"], correctAnswer: "Le sigue la cuerda, pero hasta ahí nomás", explanation: "This means the person plays along only up to a point.", points: 1, skillTag: "boundary" },
      { id: "peruvian-c1-party-quiz-9", type: "true-false", prompt: "True or false: “no está entrando mucho en la conversa” is a sign you may need to stop pushing.", options: ["True", "False"], correctAnswer: "True", explanation: "If someone is not engaging, the respectful move is to give space.", points: 1, skillTag: "respect" },
      { id: "peruvian-c1-party-quiz-10", type: "multiple-choice", prompt: "The room gets tense after a bad joke. Which phrase fits?", options: ["Se armó una tensión medio rara", "Le dio sajiro", "Hicieron click", "Le está tirando lente"], correctAnswer: "Se armó una tensión medio rara", explanation: "This names the weird tension that appears after an awkward moment.", points: 1, skillTag: "tension" },
      pairQuestion("peruvian-c1-party-pairs-1", "Match vibe, attention, and approach phrases.", partyVocab.slice(0, 15)),
      pairQuestion("peruvian-c1-party-pairs-2", "Match rejection, playing along, and visible-interest phrases.", partyVocab.slice(15, 30)),
      pairQuestion("peruvian-c1-party-pairs-3", "Match awkwardness, tension, conversation, and space phrases.", partyVocab.slice(30)),
    ],
  },
};
