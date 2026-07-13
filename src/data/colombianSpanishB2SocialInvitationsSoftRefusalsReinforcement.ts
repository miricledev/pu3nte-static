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

const socialInvitationsVocab: VocabItem[] = [
  { id: "todo-bien", term: "¿Todo bien?", meaning: "All good? / Everything okay?", note: "Warm Colombian check-in before a social invitation.", example: "¿Todo bien? Te iba a proponer algo suave.", translation: "All good? I was going to suggest something chill.", starred: true },
  { id: "como-va-todo", term: "¿Cómo va todo?", meaning: "How’s everything going?", note: "Friendly opener that feels natural before asking about plans.", example: "¿Cómo va todo? ¿Te animas esta noche?", translation: "How’s everything going? Are you up for tonight?", starred: true },
  { id: "te-animas", term: "¿Te animas?", meaning: "Are you up for it? / Do you feel like it?", note: "Soft invitation question, less pushy than a direct command.", example: "Vamos a hacer algo suave, ¿te animas?", translation: "We’re going to do something chill, are you up for it?", starred: true },
  { id: "animarse-a-algo", term: "animarse a algo", meaning: "to be up for something", note: "Reflexive verb used for deciding to join a plan.", example: "Si te animas a algo tranquilo, me avisas.", translation: "If you’re up for something calm, let me know.", starred: true },
  { id: "caer", term: "caer", meaning: "to show up / come over / drop by", note: "Very common Colombian verb for joining a place or plan.", example: "Puedes caer un ratico si quieres.", translation: "You can drop by for a little while if you want.", starred: true },
  { id: "caigo", term: "caigo", meaning: "I’ll drop by / I’ll come over", note: "First-person form of caer in social plans.", example: "Si me queda tiempo, caigo.", translation: "If I have time, I’ll drop by.", starred: true },
  { id: "caes", term: "caes", meaning: "you drop by / you come over", note: "Invitation form: caes a la casa, caes un ratico.", example: "Si hoy te da, caes un ratico.", translation: "If you can manage today, come over for a little while.", starred: true },
  { id: "caer-un-ratico", term: "caer un ratico", meaning: "to drop by for a little while", note: "Softens the plan because it does not sound like a huge commitment.", example: "No tienes que quedarte mucho; puedes caer un ratico.", translation: "You don’t have to stay long; you can drop by for a little while.", starred: true },
  { id: "un-ratico", term: "un ratico", meaning: "a little while / a short bit of time", note: "Very Colombian diminutive that makes time feel light and flexible.", example: "Solo vamos a vernos un ratico.", translation: "We’re just going to see each other for a little while.", starred: true },
  { id: "cuadrar", term: "cuadrar", meaning: "to arrange / sort out / plan", note: "Core Colombian planning verb.", example: "Toca cuadrar algo que no sea pesado.", translation: "We need to arrange something that isn’t too heavy.", starred: true },
  { id: "cuadramos", term: "cuadramos", meaning: "we’ll sort it out / we’ll arrange it", note: "Useful for keeping plans open.", example: "Si no se puede hoy, cuadramos.", translation: "If today doesn’t work, we’ll sort it out.", starred: true },
  { id: "cuadrar-algo", term: "cuadrar algo", meaning: "to arrange something / make plans", note: "General planning chunk.", example: "Podemos cuadrar algo para el sábado.", translation: "We can arrange something for Saturday.", starred: true },
  { id: "cuadramos-despues", term: "cuadramos después", meaning: "we’ll sort it out later", note: "Polite way to postpone without rejecting the person.", example: "Hoy no me da, pero cuadramos después.", translation: "I can’t manage today, but we’ll sort it out later.", starred: true },
  { id: "cuadramos-con-calma", term: "cuadramos con calma", meaning: "we’ll arrange it calmly / no rush", note: "Friendly low-pressure planning phrase.", example: "Tranqui, cuadramos con calma.", translation: "No worries, we’ll arrange it calmly.", starred: true },
  { id: "me-queda-complicado", term: "me queda complicado", meaning: "it’s difficult for me / it doesn’t really work for me", note: "Soft refusal that avoids sounding blunt.", example: "A esa hora me queda complicado.", translation: "That time doesn’t really work for me.", starred: true },
  { id: "hoy-me-queda-complicado", term: "hoy me queda complicado", meaning: "today doesn’t really work for me", note: "Natural polite refusal for same-day invitations.", example: "Hoy me queda complicado, pero gracias.", translation: "Today doesn’t really work for me, but thanks.", starred: true },
  { id: "estoy-alcanzado-de-tiempo", term: "estoy alcanzado de tiempo", meaning: "I’m short on time / I’m tight for time", note: "Useful explanation when you cannot commit.", example: "Estoy alcanzado de tiempo y no quiero llegar a medias.", translation: "I’m tight for time and I don’t want to half-show-up.", starred: true },
  { id: "tranqui", term: "tranqui", meaning: "no worries / relax / it’s all good", note: "Short informal reassurance.", example: "Tranqui, no quiero presionarte.", translation: "No worries, I don’t want to pressure you.", starred: true },
  { id: "no-quiero-presionarte", term: "no quiero presionarte", meaning: "I don’t want to pressure you", note: "Very clear pressure-softening phrase.", example: "Te invito, pero no quiero presionarte.", translation: "I’m inviting you, but I don’t want to pressure you.", starred: true },
  { id: "me-suena", term: "me suena", meaning: "sounds good to me / I’m interested", note: "Soft acceptance without overcommitting.", example: "Me suena, pero déjame mirar la hora.", translation: "Sounds good to me, but let me check the time.", starred: true },
  { id: "me-suena-el-plan", term: "me suena el plan", meaning: "the plan sounds good to me", note: "Positive but still flexible response.", example: "Me suena el plan si es algo suave.", translation: "The plan sounds good to me if it’s something chill.", starred: true },
  { id: "algo-suave", term: "algo suave", meaning: "something chill / something low-key", note: "Important Colombian social-planning phrase.", example: "Hagamos algo suave, sin trasnochar.", translation: "Let’s do something chill, without staying out late.", starred: true },
  { id: "quedamos-pendientes", term: "quedamos pendientes", meaning: "let’s keep it pending / let’s leave it open", note: "Keeps a plan alive without forcing a yes.", example: "Mejor quedamos pendientes y miramos mañana.", translation: "Better to leave it open and see tomorrow.", starred: true },
  { id: "me-da-cosita", term: "me da cosita", meaning: "I feel bad / it feels awkward / I feel a bit uncomfortable", note: "Soft emotional phrase for social discomfort.", example: "Me da cosita porque ya te había dicho que sí.", translation: "I feel bad because I had already told you yes.", starred: true },
  { id: "me-da-cosita-decir-que-no", term: "me da cosita decir que no", meaning: "I feel bad saying no", note: "Vulnerable soft-refusal phrase.", example: "Me da cosita decir que no, pero hoy no me da.", translation: "I feel bad saying no, but I can’t manage today.", starred: true },
  { id: "no-quiero-quedar-mal", term: "no quiero quedar mal", meaning: "I don’t want to let you down / I don’t want to look bad", note: "Used when the speaker cares about the relationship.", example: "No quiero quedar mal y prometer algo que no cumplo.", translation: "I don’t want to let you down and promise something I won’t do.", starred: true },
  { id: "quedar-mal", term: "quedar mal", meaning: "to look bad / let someone down / fail socially", note: "Key social concept in Colombian refusals.", example: "Prefiero decirte de una para no quedar mal.", translation: "I’d rather tell you directly so I don’t let you down.", starred: true },
  { id: "se-me-cruza-otro-plan", term: "se me cruza otro plan", meaning: "another plan clashes with it", note: "Soft reason for not attending.", example: "Se me cruza otro plan a esa hora.", translation: "Another plan clashes with it at that time.", starred: true },
  { id: "se-me-cruza-otra-cosa", term: "se me cruza otra cosa", meaning: "something else clashes with it", note: "Vaguer version when you do not want to explain everything.", example: "Creo que se me cruza otra cosa.", translation: "I think something else clashes with it.", starred: true },
  { id: "estoy-fundido", term: "estoy fundido", meaning: "I’m exhausted / I’m wiped out", note: "Masculine form.", example: "Estoy fundido; hoy no salgo.", translation: "I’m wiped out; I’m not going out today.", starred: true },
  { id: "estoy-fundida", term: "estoy fundida", meaning: "I’m exhausted / I’m wiped out, feminine form", note: "Feminine form.", example: "Estoy fundida y me toca madrugar.", translation: "I’m wiped out and I have to get up early.", starred: true },
  { id: "hoy-no-me-da", term: "hoy no me da", meaning: "I can’t manage it today / today doesn’t work for me", note: "Very natural refusal, especially with time/energy.", example: "Hoy no me da, pero gracias por invitarme.", translation: "I can’t manage it today, but thanks for inviting me.", starred: true },
  { id: "me-toca-madrugar", term: "me toca madrugar", meaning: "I have to get up early", note: "Common reason for refusing night plans.", example: "Me toca madrugar, entonces mejor no me comprometo.", translation: "I have to get up early, so I’d better not commit.", starred: true },
  { id: "que-embarrada", term: "qué embarrada", meaning: "what a shame / that sucks / what a mess", note: "Reaction to an unfortunate clash or cancellation.", example: "Qué embarrada, justo se me cruza otra cosa.", translation: "What a shame, something else clashes right then.", starred: true },
  { id: "sin-compromiso", term: "sin compromiso", meaning: "no pressure / no obligation", note: "Softens invitations and offers.", example: "Caes si quieres, sin compromiso.", translation: "Come by if you want, no pressure.", starred: true },
  { id: "sin-presion", term: "sin presión", meaning: "no pressure", note: "Direct pressure-remover.", example: "Te aviso el plan, pero sin presión.", translation: "I’m letting you know the plan, but no pressure.", starred: true },
  { id: "ahi-miramos", term: "ahí miramos", meaning: "we’ll see / we’ll figure it out", note: "Flexible closing when plans are uncertain.", example: "Si te queda tiempo, ahí miramos.", translation: "If you have time, we’ll see.", starred: true },
  { id: "nos-pillamos", term: "nos pillamos", meaning: "we’ll see each other / catch you later", note: "Informal Colombian goodbye or future meetup phrase.", example: "Nos pillamos otro día con calma.", translation: "We’ll see each other another day, no rush.", starred: true },
  { id: "me-avisas-cualquier-cosa", term: "me avisas cualquier cosa", meaning: "let me know if anything changes / keep me posted", note: "Keeps the channel open.", example: "Me avisas cualquier cosa y ahí miramos.", translation: "Let me know if anything changes and we’ll see.", starred: true },
  { id: "si-me-queda-tiempo", term: "si me queda tiempo", meaning: "if I have time / if time allows", note: "Soft non-commitment phrase.", example: "Si me queda tiempo, caigo un ratico.", translation: "If I have time, I’ll drop by for a little while.", starred: true },
  { id: "si-hoy-no-le-da", term: "si hoy no le da", meaning: "if you can’t manage it today", note: "Empathetic way to give the other person an exit.", example: "Si hoy no le da, tranqui.", translation: "If you can’t manage it today, no worries.", starred: true },
  { id: "ahi-miramos-otro-dia", term: "ahí miramos otro día", meaning: "we’ll figure out another day", note: "Low-pressure rescheduling close.", example: "Si hoy no le da, ahí miramos otro día.", translation: "If today doesn’t work, we’ll figure out another day.", starred: true },
  { id: "vea", term: "Vea", meaning: "look / listen / hey — used to get attention", note: "Common Colombian discourse marker.", example: "Vea, no quiero quedar mal.", translation: "Listen, I don’t want to let you down.", starred: true },
  { id: "gracias-de-verdad", term: "Gracias, de verdad", meaning: "thanks, seriously / genuinely, thanks", note: "Warm gratitude after someone removes pressure.", example: "Gracias, de verdad, por entender.", translation: "Thanks, seriously, for understanding.", starred: true },
  { id: "mejor-quedamos-pendientes", term: "Mejor quedamos pendientes", meaning: "better to leave it pending / let’s keep it open", note: "Clean soft-refusal plus future possibility.", example: "Mejor quedamos pendientes para no quedar mal.", translation: "Better to leave it open so I don’t let you down.", starred: true },
  { id: "para-el-sabado", term: "para el sábado", meaning: "for Saturday / let’s leave it for Saturday", note: "Alternative date phrase.", example: "Si quieres, lo dejamos para el sábado.", translation: "If you want, we’ll leave it for Saturday.", starred: true },
  { id: "con-calma", term: "con calma", meaning: "calmly / no rush / without pressure", note: "Pressure-softener used in planning.", example: "Cuadramos con calma para el sábado.", translation: "We’ll arrange it calmly for Saturday.", starred: true },
];

const highlightMap = Object.fromEntries(socialInvitationsVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));

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
  return { id, title, newVocab, fullVocab, prompt, targetAnswer, acceptedAnswers, hints, explanation, wordBreakdown };
}

export const colombianSpanishB2SocialInvitationsSoftRefusalsFlashcardDeck: FlashcardDeck = {
  id: "colombian-spanish-b2-social-invitations-soft-refusals-flashcards",
  title: "Colombian Spanish B2: Social Invitations & Soft Refusals Flashcards",
  subtitle: "Colombian phrases for inviting, accepting softly, refusing without sounding cold, and keeping plans open.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "flashcards", "invitations", "soft refusals"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Social Invitations and Soft Refusals",
  relatedCourse: "colombian-spanish-b2-social-invitations-soft-refusals",
  activityType: "flashcards",
  data: {
    specialCharacters,
    cards: socialInvitationsVocab.map(cardFromVocab),
  },
};

const sentenceVocab = [
  "¿Todo bien? = All good?",
  "¿Cómo va todo? = How’s everything going?",
  "¿Te animas? = Are you up for it?",
  "caer un ratico = drop by for a little while",
  "me suena el plan = the plan sounds good to me",
  "algo suave = something chill",
  "hoy me queda complicado = today doesn’t really work for me",
  "estoy alcanzado de tiempo = I’m tight for time",
  "me da cosita decir que no = I feel bad saying no",
  "no quiero quedar mal = I don’t want to let you down",
  "se me cruza otra cosa = something else clashes",
  "estoy fundida = I’m wiped out",
  "hoy no me da = I can’t manage it today",
  "me toca madrugar = I have to get up early",
  "sin compromiso = no pressure",
  "me avisas cualquier cosa = keep me posted",
  "quedamos pendientes = let’s leave it open",
  "ahí miramos otro día = we’ll figure out another day",
  "Gracias, de verdad = thanks, seriously",
  "cuadramos con calma = we’ll arrange it calmly",
];

export const colombianSpanishB2SocialInvitationsSoftRefusalsSentenceBuilder: SentenceBuilderLesson = {
  id: "colombian-spanish-b2-social-invitations-soft-refusals-sentence-builder",
  title: "B2 Sentence Builder: Social Invitations & Soft Refusals",
  subtitle: "Build Colombian Spanish sentences for inviting warmly, refusing gently, and protecting the relationship.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["colombian-spanish", "b2", "sentence-builder", "invitations", "soft-refusals"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Social Invitations and Soft Refusals",
  relatedCourse: "colombian-spanish-b2-social-invitations-soft-refusals",
  activityType: "sentence-builder",
  data: {
    finalChallenge: "Record a 60-second Colombian voice note inviting someone to a low-key plan, giving them an easy out, and rescheduling kindly if they cannot make it.",
    stages: [
      stage(
        "stage-1",
        "Stage 1: Invite gently",
        sentenceVocab.slice(0, 4),
        sentenceVocab.slice(0, 4),
        "All good? How’s everything going? Are you up for dropping by for a little while?",
        "¿Todo bien? ¿Cómo va todo? ¿Te animas a caer un ratico?",
        "This opens warmly and makes the invitation sound light, not demanding.",
        breakdown([["All good?", "¿Todo bien?"], ["How’s everything going?", "¿Cómo va todo?"], ["Are you up for", "¿Te animas a"], ["dropping by for a little while", "caer un ratico"]]),
      ),
      stage(
        "stage-2",
        "Stage 2: Accept softly",
        sentenceVocab.slice(4, 6),
        sentenceVocab.slice(0, 6),
        "The plan sounds good to me if it’s something chill.",
        "Me suena el plan si es algo suave.",
        "Me suena is positive but not too intense; algo suave sets a low-pressure expectation.",
        breakdown([["The plan sounds good to me", "Me suena el plan"], ["if it’s", "si es"], ["something chill", "algo suave"]]),
      ),
      stage(
        "stage-3",
        "Stage 3: Refuse with time pressure",
        sentenceVocab.slice(6, 8),
        sentenceVocab.slice(0, 8),
        "Today doesn’t really work for me because I’m tight for time.",
        "Hoy me queda complicado porque estoy alcanzado de tiempo.",
        "This gives a clear reason without sounding cold.",
        breakdown([["Today doesn’t really work for me", "Hoy me queda complicado"], ["because", "porque"], ["I’m tight for time", "estoy alcanzado de tiempo"]]),
      ),
      stage(
        "stage-4",
        "Stage 4: Protect the relationship",
        sentenceVocab.slice(8, 10),
        sentenceVocab.slice(0, 10),
        "I feel bad saying no, but I don’t want to let you down.",
        "Me da cosita decir que no, pero no quiero quedar mal.",
        "This is emotionally honest and socially careful.",
        breakdown([["I feel bad saying no", "Me da cosita decir que no"], ["but", "pero"], ["I don’t want to let you down", "no quiero quedar mal"]]),
      ),
      stage(
        "stage-5",
        "Stage 5: Explain the clash",
        sentenceVocab.slice(10, 14),
        sentenceVocab.slice(0, 14),
        "Something else clashes with it, I’m wiped out, and I have to get up early, so I can’t manage today.",
        "Se me cruza otra cosa, estoy fundida y me toca madrugar, entonces hoy no me da.",
        "This gives a realistic refusal with stacked reasons and a clear no.",
        breakdown([["Something else clashes", "Se me cruza otra cosa"], ["I’m wiped out", "estoy fundida"], ["I have to get up early", "me toca madrugar"], ["I can’t manage today", "hoy no me da"]]),
        ["Use fundido if the speaker is male.", "Use fundida if the speaker is female."],
        ["Se me cruza otra cosa, estoy fundido y me toca madrugar, entonces hoy no me da."],
      ),
      stage(
        "stage-6",
        "Stage 6: Give no-pressure permission",
        sentenceVocab.slice(14, 16),
        sentenceVocab.slice(0, 16),
        "No pressure. Keep me posted if anything changes.",
        "Sin compromiso. Me avisas cualquier cosa.",
        "This keeps the plan open and removes pressure.",
        breakdown([["No pressure", "Sin compromiso"], ["Keep me posted", "Me avisas cualquier cosa"]]),
      ),
      stage(
        "stage-7",
        "Stage 7: Leave it open",
        sentenceVocab.slice(16, 18),
        sentenceVocab.slice(0, 18),
        "Let’s leave it open, and we’ll figure out another day.",
        "Quedamos pendientes y ahí miramos otro día.",
        "A soft refusal often ends with a future door left open.",
        breakdown([["Let’s leave it open", "Quedamos pendientes"], ["we’ll figure out another day", "ahí miramos otro día"]]),
      ),
      stage(
        "stage-8",
        "Stage 8: Warm reschedule",
        sentenceVocab.slice(18, 20),
        sentenceVocab,
        "Thanks, seriously. We’ll arrange it calmly for Saturday.",
        "Gracias, de verdad. Cuadramos con calma para el sábado.",
        "This closes warmly and offers a calmer alternative.",
        breakdown([["Thanks, seriously", "Gracias, de verdad"], ["We’ll arrange it calmly", "Cuadramos con calma"], ["for Saturday", "para el sábado"]]),
      ),
    ].map((builderStage) => ({
      ...builderStage,
      audioUrl: `/audio/sentence-builder/colombian-spanish-b2-social-invitations-soft-refusals/${builderStage.id}.mp3`,
    })),
  },
};

const storyQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b2-social-invites-story-q1",
    type: "multiple-choice",
    prompt: "What does Santi invite Lina to do?",
    options: ["Drop by for a low-key birthday plan", "Go to an early work meeting", "Take a bus trip", "Study for an exam"],
    correctAnswer: "Drop by for a low-key birthday plan",
    explanation: "Santi invites Lina to caer un ratico for algo suave.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-b2-social-invites-story-q2",
    type: "multiple-choice",
    prompt: "Why does Lina hesitate?",
    options: ["She is short on time, tired, and another plan clashes", "She dislikes Santi", "She is already at the party", "She lost her phone"],
    correctAnswer: "She is short on time, tired, and another plan clashes",
    explanation: "Lina mentions being alcanzada de tiempo, fundida, and having another clash.",
    points: 1,
    skillTag: "reason",
  },
  {
    id: "colombian-b2-social-invites-story-q3",
    type: "multiple-choice",
    prompt: "What does Santi do to avoid pressuring her?",
    options: ["He says sin compromiso and no quiero presionarte", "He demands an answer", "He cancels their friendship", "He changes the topic completely"],
    correctAnswer: "He says sin compromiso and no quiero presionarte",
    explanation: "Those phrases explicitly remove pressure.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "colombian-b2-social-invites-story-q4",
    type: "multiple-choice",
    prompt: "What alternative do they choose?",
    options: ["Leave it open and maybe arrange calmly for Saturday", "Meet immediately for five hours", "Never meet again", "Invite the whole office"],
    correctAnswer: "Leave it open and maybe arrange calmly for Saturday",
    explanation: "They use quedamos pendientes, ahí miramos otro día, and para el sábado.",
    points: 1,
    skillTag: "resolution",
  },
  {
    id: "colombian-b2-social-invites-story-q5",
    type: "multiple-choice",
    prompt: "What is the main social skill in the conversation?",
    options: ["Refusing softly while keeping rapport", "Winning an argument", "Giving formal directions", "Ordering food"],
    correctAnswer: "Refusing softly while keeping rapport",
    explanation: "The story models a warm invitation, a careful refusal, and low-pressure rescheduling.",
    points: 1,
    skillTag: "pragmatics",
  },
];

export const colombianSpanishB2SocialInvitationsSoftRefusalsWhatsAppStory: WhatsAppStory = {
  id: "colombian-spanish-b2-social-invitations-soft-refusals",
  title: "Colombian B2 Story: The Low-Pressure Birthday",
  subtitle: "A WhatsApp-style story about inviting someone warmly and refusing without damaging the relationship.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "WhatsApp", "invitations", "soft refusals"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - B2 Social Invitations and Soft Refusals",
  relatedCourse: "colombian-spanish-b2-social-invitations-soft-refusals-flashcards",
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "english",
    characters: [
      { id: "santi", name: "Santi", initials: "S", side: "right", color: "blue" },
      { id: "lina", name: "Lina", initials: "L", side: "left", color: "green" },
    ],
    messages: [
      message("n1", "narrator", "Story guide: Santi is organizing a low-key birthday plan. Lina wants to be kind, but today is complicated.", "Guide: Santi is organizing a low-key birthday plan. Lina wants to be kind, but today is complicated.", [], "narrator"),
      message("m1", "santi", "¿Todo bien, Lina? ¿Cómo va todo?", "All good, Lina? How’s everything going?", ["¿Todo bien?", "¿Cómo va todo?"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m1.mp3"),
      message("m2", "lina", "Bien, cansada, pero viva. ¿Qué pasó?", "Good, tired, but alive. What happened?", []),
      message("m3", "santi", "Vea, estamos cuadrando algo suave para el cumple de Vale.", "Listen, we’re arranging something chill for Vale’s birthday.", ["Vea", "cuadrar", "algo suave"]),
      message("m4", "santi", "Nada grande: pizza, música bajita y hablar un ratico.", "Nothing big: pizza, quiet music, and talking for a little while.", ["un ratico"]),
      message("m5", "santi", "¿Te animas a caer un ratico?", "Are you up for dropping by for a little while?", ["¿Te animas?", "caer un ratico", "caer"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m5.mp3"),
      message("m6", "lina", "Ay, me suena el plan. De verdad.", "Aw, the plan sounds good to me. Seriously.", ["me suena el plan", "me suena"]),
      message("m7", "lina", "Pero hoy me queda complicado.", "But today doesn’t really work for me.", ["hoy me queda complicado", "me queda complicado"]),
      message("m8", "santi", "Tranqui. No quiero presionarte.", "No worries. I don’t want to pressure you.", ["tranqui", "no quiero presionarte"]),
      message("m9", "santi", "Si te queda tiempo, caes; si no, cero lío.", "If you have time, you come over; if not, no problem.", ["si me queda tiempo", "caes"]),
      message("m10", "lina", "Gracias. Me da cosita decir que no porque Vale me cae súper bien.", "Thanks. I feel bad saying no because I really like Vale.", ["Gracias, de verdad", "me da cosita decir que no", "me da cosita"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m10.mp3"),
      message("m11", "lina", "Además, no quiero quedar mal diciendo que sí y llegando destruida.", "Also, I don’t want to let you down by saying yes and arriving destroyed.", ["no quiero quedar mal", "quedar mal"]),
      message("m12", "santi", "Eso sí, mejor decirlo claro que quedar mal después.", "Exactly, better to say it clearly than let people down later.", ["quedar mal"]),
      message("m13", "lina", "Se me cruza otro plan familiar y estoy alcanzada de tiempo.", "Another family plan clashes with it and I’m tight for time.", ["se me cruza otro plan", "estoy alcanzado de tiempo"]),
      message("m14", "lina", "Y para completar, estoy fundida.", "And on top of that, I’m wiped out.", ["estoy fundida"]),
      message("m15", "santi", "Qué embarrada, pero en serio: sin compromiso.", "What a shame, but seriously: no pressure.", ["qué embarrada", "sin compromiso"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m15.mp3"),
      message("m16", "santi", "Si hoy no le da, ahí miramos otro día.", "If you can’t manage it today, we’ll figure out another day.", ["si hoy no le da", "ahí miramos otro día"]),
      message("m17", "lina", "Gracias, de verdad. Me baja mucho la presión que lo digas así.", "Thanks, seriously. It lowers the pressure a lot that you say it that way.", ["Gracias, de verdad", "sin presión"]),
      message("m18", "santi", "Claro. La idea es vernos, no ponerle tarea a nadie.", "Of course. The idea is to see each other, not give anyone homework.", []),
      message("m19", "lina", "Hoy no me da. Me toca madrugar y no quiero ir por cumplir.", "I can’t manage today. I have to get up early and I don’t want to go just to comply.", ["hoy no me da", "me toca madrugar"]),
      message("m20", "santi", "Perfecto. Quedamos pendientes, entonces.", "Perfect. Let’s leave it open, then.", ["quedamos pendientes"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m20.mp3"),
      message("m21", "lina", "Mejor quedamos pendientes y cuadramos con calma.", "Better to leave it open and arrange it calmly.", ["Mejor quedamos pendientes", "cuadramos con calma", "con calma"]),
      message("m22", "santi", "O lo dejamos para el sábado, si te suena.", "Or we leave it for Saturday, if that sounds good to you.", ["para el sábado", "me suena"]),
      message("m23", "lina", "Para el sábado sí me suena más. Algo suave y temprano.", "Saturday sounds better to me. Something chill and early.", ["para el sábado", "me suena", "algo suave"]),
      message("m24", "santi", "Listo. Ahí miramos bien mañana.", "Done. We’ll figure it out properly tomorrow.", ["ahí miramos"]),
      message("m25", "lina", "Me avisas cualquier cosa y yo miro si caigo antes donde Vale.", "Keep me posted and I’ll see if I drop by Vale’s earlier.", ["me avisas cualquier cosa", "caigo"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m25.mp3"),
      message("m26", "santi", "De una. Y si se te cruza otra cosa, también tranqui.", "For sure. And if something else clashes, that’s also okay.", ["se me cruza otra cosa", "tranqui"]),
      message("m27", "lina", "Jajaja gracias por no hacerme sentir culpable.", "Haha thanks for not making me feel guilty.", []),
      message("m28", "santi", "Obvio. La amistad no se cae por una pizza.", "Obviously. Friendship doesn’t fall apart over one pizza.", []),
      message("m29", "lina", "Entonces nos pillamos el sábado, con calma.", "Then we’ll see each other on Saturday, no rush.", ["nos pillamos", "con calma"]),
      message("m30", "santi", "Nos pillamos. Y hoy descansa, que estás fundida.", "Catch you later. And rest today, because you’re wiped out.", ["nos pillamos", "estoy fundida"], "voice-note", "/audio/stories/colombian-spanish-b2-social-invitations-soft-refusals/m30.mp3"),
    ],
    comprehensionChecks: [
      { id: "colombian-b2-social-invites-check-1", afterMessageId: "m5", question: storyQuestions[0] },
      { id: "colombian-b2-social-invites-check-2", afterMessageId: "m10", question: storyQuestions[1] },
      { id: "colombian-b2-social-invites-check-3", afterMessageId: "m15", question: storyQuestions[2] },
      { id: "colombian-b2-social-invites-check-4", afterMessageId: "m23", question: storyQuestions[3] },
      { id: "colombian-b2-social-invites-check-5", afterMessageId: "m30", question: storyQuestions[4] },
    ],
    endQuiz: storyQuestions,
    learnedVocab: socialInvitationsVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: socialInvitationsVocab.map((item) => item.term),
      grammarPatterns: [
        "Soft invitation: ¿Te animas a...? + infinitive.",
        "Soft refusal: me queda complicado / hoy no me da + reason.",
        "Pressure relief: sin compromiso, sin presión, no quiero presionarte.",
        "Open-ended rescheduling: quedamos pendientes, ahí miramos otro día, cuadramos con calma.",
      ],
      speakingPrompts: [
        "Invite a friend to algo suave using ¿Te animas? and caer un ratico.",
        "Refuse kindly because you are short on time and tired.",
        "Give someone an easy exit using sin compromiso and no quiero presionarte.",
      ],
    },
    completionTask: {
      title: "Your soft invitation voice note",
      instructions: "Record a Colombian Spanish voice note inviting a friend to a chill plan. Include one warm opener, one low-pressure invitation, one soft refusal, and one reschedule phrase.",
    },
  },
};

const readingParagraphs = [
  {
    id: "p1",
    text:
      "En Colombia, una invitación no siempre busca un sí inmediato. Muchas veces empieza con algo suave: ¿todo bien?, ¿cómo va todo?, ¿te animas? Esas frases hacen que la otra persona sienta que tiene espacio para responder de verdad. Si alguien dice: caes un ratico, la invitación suena más ligera que si dijera: tienes que venir toda la noche.",
    translation:
      "In Colombia, an invitation does not always seek an immediate yes. Many times it starts with something soft: all good?, how’s everything going?, are you up for it? Those phrases make the other person feel they have space to answer honestly. If someone says: drop by for a little while, the invitation sounds lighter than saying: you have to come all night.",
    highlights: highlights(["¿Todo bien?", "¿Cómo va todo?", "¿Te animas?", "caes", "un ratico"]),
    shadowLine: "¿Te animas a caer un ratico?",
  },
  {
    id: "p2",
    text:
      "El verbo caer es clave para planes sociales. Uno puede decir caigo, caes o caer un ratico para hablar de llegar a un lugar sin hacerlo sonar demasiado formal. También aparece cuadrar: cuadramos, cuadramos después o cuadramos con calma. Es una forma de mantener la puerta abierta sin cerrar un plan a la fuerza.",
    translation:
      "The verb caer is key for social plans. You can say I’ll drop by, you drop by, or drop by for a little while to talk about arriving somewhere without making it sound too formal. Cuadrar also appears: we’ll sort it out, we’ll sort it out later, or we’ll arrange it calmly. It is a way to keep the door open without forcing a plan.",
    highlights: highlights(["caer", "caigo", "caes", "caer un ratico", "cuadrar", "cuadramos", "cuadramos después", "cuadramos con calma"]),
    shadowLine: "Si no se puede hoy, cuadramos con calma.",
  },
  {
    id: "p3",
    text:
      "Para aceptar sin comprometerse demasiado, me suena y me suena el plan son perfectas. No prometen asistencia absoluta, pero muestran interés. Si el plan es algo suave, la invitación también baja de intensidad. En cambio, si la persona no puede, una respuesta como hoy me queda complicado o estoy alcanzado de tiempo suena más amable que un no seco.",
    translation:
      "To accept without overcommitting, sounds good to me and the plan sounds good to me are perfect. They do not promise absolute attendance, but they show interest. If the plan is something chill, the invitation also lowers in intensity. By contrast, if the person cannot go, a reply like today doesn’t really work for me or I’m tight for time sounds kinder than a dry no.",
    highlights: highlights(["me suena", "me suena el plan", "algo suave", "hoy me queda complicado", "estoy alcanzado de tiempo"]),
    shadowLine: "Me suena el plan si es algo suave.",
  },
  {
    id: "p4",
    text:
      "Muchas negativas suaves tienen una parte emocional. Me da cosita decir que no significa que la persona no quiere sonar fría. No quiero quedar mal muestra que le importa la relación. Si dice se me cruza otra cosa, estoy fundida, hoy no me da o me toca madrugar, no está inventando drama: está explicando límites de tiempo, energía o agenda.",
    translation:
      "Many soft refusals have an emotional part. I feel bad saying no means the person does not want to sound cold. I don’t want to let you down shows the relationship matters. If they say something else clashes, I’m wiped out, I can’t manage today, or I have to get up early, they are not creating drama: they are explaining limits of time, energy, or schedule.",
    highlights: highlights(["me da cosita decir que no", "no quiero quedar mal", "se me cruza otra cosa", "estoy fundida", "hoy no me da", "me toca madrugar"]),
    shadowLine: "Me da cosita decir que no, pero hoy no me da.",
  },
  {
    id: "p5",
    text:
      "La persona que invita también tiene responsabilidad. Puede decir tranqui, sin compromiso, sin presión o no quiero presionarte. Esas frases protegen la confianza porque le dan permiso al otro de decir la verdad. Si la respuesta es no, no hace falta insistir; basta con decir qué embarrada, me avisas cualquier cosa o ahí miramos.",
    translation:
      "The person inviting also has responsibility. They can say no worries, no obligation, no pressure, or I don’t want to pressure you. Those phrases protect trust because they give the other person permission to tell the truth. If the answer is no, there is no need to insist; it is enough to say what a shame, keep me posted, or we’ll see.",
    highlights: highlights(["tranqui", "sin compromiso", "sin presión", "no quiero presionarte", "qué embarrada", "me avisas cualquier cosa", "ahí miramos"]),
    shadowLine: "Tranqui, sin presión; me avisas cualquier cosa.",
  },
  {
    id: "p6",
    text:
      "Una buena conversación termina dejando la relación intacta. Quedamos pendientes, mejor quedamos pendientes, ahí miramos otro día, nos pillamos, para el sábado y con calma sirven para cerrar sin cerrar del todo. La idea no es evitar todos los no; la idea es decirlos de una forma que suene humana, clara y colombiana.",
    translation:
      "A good conversation ends with the relationship intact. Let’s keep it pending, better to leave it pending, we’ll figure out another day, catch you later, for Saturday, and no rush help close without closing completely. The idea is not to avoid every no; the idea is to say them in a way that sounds human, clear, and Colombian.",
    highlights: highlights(["quedamos pendientes", "Mejor quedamos pendientes", "ahí miramos otro día", "nos pillamos", "para el sábado", "con calma"]),
    shadowLine: "Mejor quedamos pendientes y ahí miramos otro día.",
  },
];

const readingQuestions: CheckpointQuestion[] = [
  {
    id: "colombian-b2-social-invites-reading-q1",
    type: "multiple-choice",
    prompt: "What is the reading mainly about?",
    options: ["Inviting and refusing softly in Colombian Spanish", "Ordering in a restaurant", "Giving formal business presentations", "Describing weather"],
    correctAnswer: "Inviting and refusing softly in Colombian Spanish",
    explanation: "The reading explains how invitations, refusals, and rescheduling can sound warm and low-pressure.",
    points: 1,
    skillTag: "gist",
  },
  {
    id: "colombian-b2-social-invites-reading-q2",
    type: "multiple-choice",
    prompt: "Why is 'caer un ratico' softer than a direct demand?",
    options: ["It makes the visit sound short and flexible", "It means the person must stay all night", "It is only used at work", "It cancels the invitation"],
    correctAnswer: "It makes the visit sound short and flexible",
    explanation: "Un ratico makes the plan feel lighter and less demanding.",
    points: 1,
    skillTag: "tone",
  },
  {
    id: "colombian-b2-social-invites-reading-q3",
    type: "true-false",
    prompt: "True or false: 'No quiero quedar mal' shows that the speaker cares about the relationship.",
    options: ["True", "False"],
    correctAnswer: "True",
    explanation: "The reading says this phrase shows that the relationship matters.",
    points: 1,
    skillTag: "pragmatics",
  },
  {
    id: "colombian-b2-social-invites-reading-q4",
    type: "order-words",
    prompt: "Order the words to make a soft refusal.",
    wordBank: ["Me", "da", "cosita", "decir", "que", "no"],
    correctAnswer: "Me da cosita decir que no",
    explanation: "This phrase means I feel bad saying no.",
    points: 2,
    skillTag: "sentence-order",
  },
  {
    id: "colombian-b2-social-invites-reading-q5",
    type: "fill-blank",
    prompt: "Complete: Mejor quedamos ______.",
    nativePrompt: "Better to leave it pending / open.",
    correctAnswer: "pendientes",
    explanation: "Mejor quedamos pendientes leaves the plan open without forcing a commitment.",
    points: 1,
    skillTag: "rescheduling",
  },
];

export const colombianSpanishB2SocialInvitationsSoftRefusalsReading: ReadingComprehension = {
  id: "colombian-spanish-b2-social-invitations-soft-refusals-reading",
  title: "Colombian B2 Reading: Decir que no sin quedar mal",
  subtitle: "A reading about low-pressure invitations, soft refusals, and keeping rapport in Colombian Spanish.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "reading", "invitations", "soft refusals"],
  estimatedMinutes: 18,
  skoolSectionName: "Colombian Spanish - B2 Social Invitations and Soft Refusals",
  relatedCourse: "colombian-spanish-b2-social-invitations-soft-refusals",
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: "/audio/readings/colombian-spanish-b2-social-invitations-soft-refusals/full.mp3",
    audioAlignmentUrl: "/audio/readings/colombian-spanish-b2-social-invitations-soft-refusals/timings.json",
    paragraphs: readingParagraphs,
    glossary: socialInvitationsVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return {
    id,
    type: "match-pairs",
    prompt,
    pairs: items.map((item) => ({ left: item.term, right: item.meaning })),
    explanation: "These pairs come directly from the B2 social invitations and soft refusals vocabulary.",
    points: items.length,
    skillTag: "vocab-matching",
  };
}

const vocabChunks = [
  socialInvitationsVocab.slice(0, 8),
  socialInvitationsVocab.slice(8, 16),
  socialInvitationsVocab.slice(16, 24),
  socialInvitationsVocab.slice(24, 32),
  socialInvitationsVocab.slice(32, 40),
  socialInvitationsVocab.slice(40),
];

export const colombianSpanishB2SocialInvitationsSoftRefusalsQuiz: CheckpointQuiz = {
  id: "colombian-spanish-b2-social-invitations-soft-refusals-quiz",
  title: "Colombian Spanish B2: Social Invitations & Soft Refusals Quiz",
  subtitle: "Practice choosing Colombian phrases for invitations, pressure-free responses, soft refusals, and rescheduling.",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "upper-intermediate",
  tags: ["Colombian Spanish", "B2", "quiz", "invitations", "soft refusals"],
  estimatedMinutes: 20,
  skoolSectionName: "Colombian Spanish - B2 Social Invitations and Soft Refusals",
  relatedCourse: "colombian-spanish-b2-social-invitations-soft-refusals",
  activityType: "quiz",
  data: {
    description: "Use this after the speaking class and surrounding activities to test social invitations and soft refusals in Colombian Spanish.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      {
        id: "colombian-b2-social-invites-quiz-1",
        type: "multiple-choice",
        prompt: "Which phrase is the best low-pressure invitation?",
        options: ["¿Te animas a caer un ratico?", "Estoy fundida", "Hoy no me da", "Me toca madrugar"],
        correctAnswer: "¿Te animas a caer un ratico?",
        explanation: "It asks if the person is up for dropping by briefly.",
        points: 1,
        skillTag: "invitation",
      },
      {
        id: "colombian-b2-social-invites-quiz-2",
        type: "multiple-choice",
        prompt: "You want to refuse softly because today is hard. Which phrase fits?",
        options: ["Hoy me queda complicado", "Me suena el plan", "Caigo", "Nos pillamos"],
        correctAnswer: "Hoy me queda complicado",
        explanation: "This is a soft way to say today does not really work.",
        points: 1,
        skillTag: "soft-refusal",
      },
      {
        id: "colombian-b2-social-invites-quiz-3",
        type: "fill-blank",
        prompt: "Complete: Me da cosita decir que ______.",
        nativePrompt: "I feel bad saying no.",
        correctAnswer: "no",
        explanation: "Me da cosita decir que no is a vulnerable soft refusal.",
        points: 1,
        skillTag: "emotion",
      },
      {
        id: "colombian-b2-social-invites-quiz-4",
        type: "true-false",
        prompt: "True or false: 'sin compromiso' removes pressure from an invitation.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Sin compromiso means no pressure or no obligation.",
        points: 1,
        skillTag: "pressure",
      },
      {
        id: "colombian-b2-social-invites-quiz-5",
        type: "order-words",
        prompt: "Order the words.",
        nativePrompt: "We’ll arrange it calmly.",
        wordBank: ["Cuadramos", "con", "calma"],
        correctAnswer: "Cuadramos con calma",
        explanation: "This phrase keeps the future plan open and relaxed.",
        points: 2,
        skillTag: "reschedule",
      },
      {
        id: "colombian-b2-social-invites-quiz-6",
        type: "multiple-choice",
        prompt: "Someone says they are exhausted. Which phrase fits a female speaker?",
        options: ["Estoy fundida", "Estoy fundido", "¿Te animas?", "Sin presión"],
        correctAnswer: "Estoy fundida",
        explanation: "Fundida is the feminine form.",
        points: 1,
        skillTag: "gender-agreement",
      },
      {
        id: "colombian-b2-social-invites-quiz-7",
        type: "multiple-choice",
        prompt: "Which phrase means something else clashes with the plan?",
        options: ["Se me cruza otra cosa", "Me suena", "Caigo", "Con calma"],
        correctAnswer: "Se me cruza otra cosa",
        explanation: "This explains a schedule conflict.",
        points: 1,
        skillTag: "schedule-conflict",
      },
      {
        id: "colombian-b2-social-invites-quiz-8",
        type: "fill-blank",
        prompt: "Complete: No quiero quedar ______.",
        nativePrompt: "I don’t want to let you down / look bad.",
        correctAnswer: "mal",
        explanation: "Quedar mal means to look bad or let someone down socially.",
        points: 1,
        skillTag: "rapport",
      },
      {
        id: "colombian-b2-social-invites-quiz-9",
        type: "order-words",
        prompt: "Order the words to make the future-open phrase.",
        wordBank: ["Ahí", "miramos", "otro", "día"],
        correctAnswer: "Ahí miramos otro día",
        explanation: "This means we’ll figure out another day.",
        points: 2,
        skillTag: "rescheduling",
      },
      ...vocabChunks.map((chunk, index) =>
        pairQuestion(`colombian-b2-social-invites-match-${index + 1}`, `Match social invitations and soft refusals set ${index + 1}.`, chunk),
      ),
    ],
  },
};
