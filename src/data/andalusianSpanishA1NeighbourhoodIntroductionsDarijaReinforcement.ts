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
};

const courseId = "andalusian-spanish-a1-neighbourhood-introductions-darija";
const sectionName = "الإسبانية الأندلسية A1 - التعارف الأول فالحومة";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const neighbourhoodVocab: VocabItem[] = [
  { id: "buenas", term: "Buenas", meaning: "سلام / أهلا", note: "تحية قصيرة وطبيعية مع الجيران.", example: "Buenas, ¿qué tal?", translation: "سلام، كيداير؟" },
  { id: "que-tal", term: "¿Qué tal?", meaning: "كيداير؟ / لاباس؟", note: "سؤال خفيف من بعد التحية.", example: "Buenas, ¿qué tal?", translation: "سلام، لاباس؟" },
  { id: "me-llamo", term: "Me llamo…", meaning: "سميتي…", note: "باش تقدّم راسك بالاسم.", example: "Me llamo Adam.", translation: "سميتي آدم." },
  { id: "como-te-llamas", term: "¿Cómo te llamas?", meaning: "شنو سميتك؟", note: "باش تسول على الاسم بطريقة عادية.", example: "Yo me llamo Lucía. ¿Cómo te llamas?", translation: "أنا سميتي لوسيا. شنو سميتك؟" },
  { id: "encantao", term: "Encantao / Encantá", meaning: "متشرف / متشرفة", note: "نطق أندلسي دارج لـ encantado أو encantada.", example: "Encantao, Lucía.", translation: "متشرف، لوسيا." },
  { id: "soy-marruecos", term: "Soy de Marruecos", meaning: "أنا من المغرب", note: "باش تقول الأصل ديالك.", example: "Me llamo Adam y soy de Marruecos.", translation: "سميتي آدم وأنا من المغرب." },
  { id: "de-donde", term: "¿De dónde eres?", meaning: "منين نتا؟", note: "سؤال على البلاد أو المدينة الأصلية.", example: "¿De dónde eres, Adam?", translation: "منين نتا، آدم؟" },
  { id: "nuevo", term: "¿Eres nuevo por aquí?", meaning: "واش نتا جديد هنا؟", note: "سؤال طبيعي ملي كتشوف جار جديد.", example: "¿Eres nuevo por aquí?", translation: "واش نتا جديد هنا؟" },
  { id: "si-nuevo", term: "Sí, soy nuevo por aquí", meaning: "إييه، أنا جديد هنا", note: "جواب مباشر على سؤال واش نتا جديد.", example: "Sí, soy nuevo por aquí. Llegué hace poco.", translation: "إييه، أنا جديد هنا. جيت هادي شوية." },
  { id: "vives", term: "¿Vives por aquí?", meaning: "واش ساكن هنا؟", note: "باش تسول واش الشخص ساكن فالحومة.", example: "¿Vives por aquí o estás de visita?", translation: "واش ساكن هنا ولا غير جاي تزور؟" },
  { id: "al-lao", term: "Vivo aquí al lao", meaning: "ساكن هنا حدّاكم", note: "al lao نطق أندلسي دارج لـ al lado.", example: "Vivo aquí al lao, en el número doce.", translation: "ساكن هنا حدّاكم، فالرقم 12." },
  { id: "aprendiendo", term: "Estoy aprendiendo español", meaning: "كنتعلّم الإسبانية", note: "كتشرح بلي مازال كتتعلم اللغة.", example: "Estoy aprendiendo español poquito a poco.", translation: "كنتعلّم الإسبانية بشوية بشوية." },
  { id: "hablas", term: "¿Hablas español?", meaning: "كاتهضر الإسبانية؟", note: "سؤال بسيط على القدرة فاللغة.", example: "¿Hablas español?", translation: "كاتهضر الإسبانية؟" },
  { id: "poquito", term: "Un poquito", meaning: "غير شوية", note: "جواب متواضع إلى كنت كتهضر غير شوية.", example: "Sí, un poquito.", translation: "إييه، غير شوية." },
  { id: "poco-poco", term: "Poquito a poco", meaning: "بشوية بشوية", note: "كتبيّن التقدم بالتدريج.", example: "Poquito a poco hablo mejor.", translation: "بشوية بشوية كنهضر حسن." },
  { id: "para-que", term: "¿Y pa’ qué aprendes español?", meaning: "وعلاش كاتتعلّم الإسبانية؟", note: "pa’ اختصار منطوق ديال para.", example: "¿Y pa’ qué aprendes español?", translation: "وعلاش كاتتعلّم الإسبانية؟" },
  { id: "hablar-gente", term: "Pa’ hablar con la gente", meaning: "باش نهضر مع الناس", note: "سبب عملي لتعلم اللغة.", example: "Aprendo español pa’ hablar con la gente.", translation: "كنتعلّم الإسبانية باش نهضر مع الناس." },
  { id: "porque-vivo", term: "Porque vivo aquí", meaning: "حيت ساكن هنا", note: "كتعطي السبب باستعمال porque.", example: "Aprendo español porque vivo aquí.", translation: "كنتعلّم الإسبانية حيت ساكن هنا." },
  { id: "que-bien", term: "Qué bien", meaning: "زوين / مزيان", note: "رد إيجابي قصير.", example: "—Estoy aprendiendo español. —¡Qué bien!", translation: "—كنتعلّم الإسبانية. —زوين!" },
  { id: "bienvenido", term: "Bienvenido al barrio", meaning: "مرحبا بيك فالحومة", note: "ترحيب مباشر بالجار الجديد.", example: "Bienvenido al barrio, Adam.", translation: "مرحبا بيك فالحومة، آدم." },
  { id: "aqui-estamos", term: "Si necesitas algo, aquí estamos", meaning: "إلا احتجتي شي حاجة، حنا هنا", note: "عرض ودّي للمساعدة بين الجيران.", example: "Si necesitas algo, aquí estamos.", translation: "إلا احتجتي شي حاجة، حنا هنا." },
  { id: "no-pasa-na", term: "No pasa ná", meaning: "ما كاين باس", note: "نطق أندلسي دارج لـ no pasa nada.", example: "No pasa ná, yo te ayudo.", translation: "ما كاين باس، أنا نعاونك." },
  { id: "muy-amable", term: "Muchas gracias, muy amable", meaning: "شكرا بزاف، الله يخليك", note: "شكر مهذب على المساعدة أو الترحيب.", example: "Muchas gracias, muy amable.", translation: "شكرا بزاف، الله يخليك." },
  { id: "cuanto-tiempo", term: "¿Cuánto tiempo llevas aquí?", meaning: "شحال هادي وانت هنا؟", note: "سؤال على المدة اللي دازها الشخص فالبلاصة.", example: "¿Cuánto tiempo llevas aquí en el barrio?", translation: "شحال هادي وانت هنا فالحومة؟" },
  { id: "un-mes", term: "Llevo un mes aquí", meaning: "عندي شهر هنا", note: "جواب على المدة باستعمال llevo.", example: "Llevo un mes aquí, nada más.", translation: "عندي غير شهر هنا." },
  { id: "gusta-barrio", term: "Me gusta el barrio", meaning: "عاجبني الحي / الحومة", note: "كتعطي رأيك الإيجابي فالحومة.", example: "Me gusta el barrio, es tranquilo.", translation: "عاجبني الحي، راه هادئ." },
  { id: "gente-amable", term: "La gente es muy amable", meaning: "الناس مزيانين فالمعاملة", note: "وصف إيجابي للناس ديال الحومة.", example: "La gente es muy amable por aquí.", translation: "الناس هنا مزيانين فالمعاملة." },
  { id: "te-gusta", term: "¿Te gusta el barrio?", meaning: "واش عاجباك الحومة؟", note: "سؤال على الرأي فالحومة.", example: "¿Te gusta el barrio de momento?", translation: "واش عاجباك الحومة حتى لدابا؟" },
  { id: "nos-vemos", term: "Pues nada, nos vemos", meaning: "إيوا صافي، نشوفوك", note: "طريقة طبيعية باش تسالي محادثة قصيرة.", example: "Pues nada, nos vemos luego.", translation: "إيوا صافي، نشوفوك من بعد." },
  { id: "de-na", term: "De ná, mi arma", meaning: "على والو، آ الحبيب / آ العزيز", note: "رد أندلسي دافئ على الشكر.", example: "—Muchas gracias. —De ná, mi arma.", translation: "—شكرا بزاف. —على والو، آ العزيز." },
  { id: "veremos", term: "Ya nos veremos", meaning: "غادي نتلاقاو / نشوفوك من بعد", note: "وداع كيعني باللي غادي تشوفو بعضياتكم من بعد.", example: "Vivimos cerca; ya nos veremos.", translation: "ساكنين قراب؛ غادي نتلاقاو من بعد." },
  { id: "aro", term: "Aro", meaning: "طبعا / أكيد", note: "نطق أندلسي دارج لـ claro.", example: "—¿Vives aquí? —Aro.", translation: "—واش ساكن هنا؟ —طبعا." },
];

const highlights = (phrases: string[]) => phrases.map((phrase) => ({ phrase }));
const storyAudioBase = `/audio/stories/${courseId}`;

function flashcard(item: VocabItem): FlashcardItem {
  return {
    id: item.id,
    term: item.term,
    definition: item.meaning,
    exampleSentence: item.example,
    exampleTranslation: item.translation,
    acceptedAnswers: item.meaning.split("/").map((answer) => answer.trim()),
    languageFrom: "spanish",
    languageTo: "mixed",
    difficulty: "easy",
    notes: item.note,
    starred: true,
    specialCharacters,
  };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return {
    id,
    speakerId,
    text,
    translation,
    vocabHighlights: highlights(phrases),
    messageType,
    audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined,
  };
}

export const andalusianSpanishA1NeighbourhoodIntroductionsDarijaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "بطاقات A1: التعارف الأول فالحومة",
  subtitle: "راجع عبارات التحية، التعارف، السكن والكلام مع الجيران بالإسبانية الأندلسية.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "neighbourhood", "introductions"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards",
  data: { cards: neighbourhoodVocab.map(flashcard), specialCharacters },
};

const sentenceStages: SentenceStage[] = [
  { id: "stage-1", title: "التحية والاسم", newVocab: ["Buenas = سلام", "¿Qué tal? = كيداير؟", "Me llamo… = سميتي…"], fullVocab: ["Buenas", "¿Qué tal?", "Me llamo…", "¿Cómo te llamas?"], prompt: "قول: سلام، كيداير؟ سميتي آدم. شنو سميتك؟", targetAnswer: "Buenas, ¿qué tal? Me llamo Adam. ¿Cómo te llamas?", acceptedAnswers: ["Buenas. ¿Qué tal? Me llamo Adam. ¿Cómo te llamas?"], explanation: "بدا بالتحية، قدّم الاسم ديالك، ومن بعد سول على اسم الشخص الآخر.", audioUrl: `/audio/sentence-builder/${courseId}/stage-1.mp3`, wordBreakdown: [{ source: "Buenas", target: "سلام" }, { source: "Me llamo", target: "سميتي" }, { source: "¿Cómo te llamas?", target: "شنو سميتك؟" }] },
  { id: "stage-2", title: "الأصل والتشرف", newVocab: ["Encantao / Encantá = متشرف / متشرفة", "Soy de Marruecos = أنا من المغرب", "¿De dónde eres? = منين نتا؟"], fullVocab: ["Encantao", "Soy de Marruecos", "¿De dónde eres?"], prompt: "قول: متشرف. أنا من المغرب. منين نتا؟", targetAnswer: "Encantao. Soy de Marruecos. ¿De dónde eres?", acceptedAnswers: ["Encantado. Soy de Marruecos. ¿De dónde eres?"], explanation: "Encantao هو النطق الأندلسي الخفيف ديال encantado.", audioUrl: `/audio/sentence-builder/${courseId}/stage-2.mp3`, wordBreakdown: [{ source: "Encantao", target: "متشرف" }, { source: "Soy de", target: "أنا من" }, { source: "¿De dónde eres?", target: "منين نتا؟" }] },
  { id: "stage-3", title: "جار جديد", newVocab: ["¿Eres nuevo por aquí? = واش نتا جديد هنا؟", "Sí, soy nuevo por aquí = إييه، أنا جديد هنا", "¿Vives por aquí? = واش ساكن هنا؟"], fullVocab: ["¿Eres nuevo por aquí?", "Sí, soy nuevo por aquí", "¿Vives por aquí?"], prompt: "قول: إييه، أنا جديد هنا. واش نتا ساكن هنا؟", targetAnswer: "Sí, soy nuevo por aquí. ¿Vives por aquí?", acceptedAnswers: ["Sí, soy nuevo por aquí. ¿Tú vives por aquí?"], explanation: "por aquí كتدل على هاد المنطقة أو الحومة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-3.mp3`, wordBreakdown: [{ source: "soy nuevo", target: "أنا جديد" }, { source: "por aquí", target: "هنا فهاد المنطقة" }, { source: "¿Vives...?", target: "واش ساكن...؟" }] },
  { id: "stage-4", title: "فين ساكن", newVocab: ["Vivo aquí al lao = ساكن هنا حدّاكم", "Porque vivo aquí = حيت ساكن هنا"], fullVocab: ["Vivo aquí al lao", "Porque vivo aquí"], prompt: "قول: ساكن هنا حدّاكم وكنتعلّم الإسبانية حيت ساكن هنا.", targetAnswer: "Vivo aquí al lao y estoy aprendiendo español porque vivo aquí.", acceptedAnswers: ["Vivo aquí al lado y estoy aprendiendo español porque vivo aquí."], explanation: "al lao نطق أندلسي طبيعي ديال al lado.", audioUrl: `/audio/sentence-builder/${courseId}/stage-4.mp3`, wordBreakdown: [{ source: "Vivo", target: "ساكن" }, { source: "aquí al lao", target: "هنا حدّاكم" }, { source: "porque", target: "حيت" }] },
  { id: "stage-5", title: "تعلم اللغة", newVocab: ["¿Hablas español? = كاتهضر الإسبانية؟", "Un poquito = غير شوية", "Poquito a poco = بشوية بشوية"], fullVocab: ["Estoy aprendiendo español", "¿Hablas español?", "Un poquito", "Poquito a poco"], prompt: "قول: كاتهضر الإسبانية؟ غير شوية. كنتعلّم بشوية بشوية.", targetAnswer: "¿Hablas español? Un poquito. Estoy aprendiendo poquito a poco.", acceptedAnswers: ["¿Hablas español? Un poquito, poquito a poco."], explanation: "Un poquito جواب قصير، وpoquito a poco كيبين التقدم بالتدريج.", audioUrl: `/audio/sentence-builder/${courseId}/stage-5.mp3`, wordBreakdown: [{ source: "¿Hablas español?", target: "كاتهضر الإسبانية؟" }, { source: "Un poquito", target: "غير شوية" }, { source: "Poquito a poco", target: "بشوية بشوية" }] },
  { id: "stage-6", title: "علاش كتتعلم", newVocab: ["¿Y pa’ qué aprendes español? = وعلاش كاتتعلم الإسبانية؟", "Pa’ hablar con la gente = باش نهضر مع الناس"], fullVocab: ["¿Y pa’ qué aprendes español?", "Pa’ hablar con la gente", "Porque vivo aquí"], prompt: "قول: وعلاش كاتتعلم الإسبانية؟ باش نهضر مع الناس وحيت ساكن هنا.", targetAnswer: "¿Y pa’ qué aprendes español? Pa’ hablar con la gente y porque vivo aquí.", acceptedAnswers: ["¿Para qué aprendes español? Para hablar con la gente y porque vivo aquí."], explanation: "pa’ هي اختصار منطوق ديال para فالكلام اليومي.", audioUrl: `/audio/sentence-builder/${courseId}/stage-6.mp3`, wordBreakdown: [{ source: "pa’ qué", target: "علاش" }, { source: "pa’ hablar", target: "باش نهضر" }, { source: "con la gente", target: "مع الناس" }] },
  { id: "stage-7", title: "المدة والرأي", newVocab: ["¿Cuánto tiempo llevas aquí? = شحال هادي وانت هنا؟", "Llevo un mes aquí = عندي شهر هنا", "¿Te gusta el barrio? = واش عاجباك الحومة؟"], fullVocab: ["¿Cuánto tiempo llevas aquí?", "Llevo un mes aquí", "Me gusta el barrio", "La gente es muy amable", "¿Te gusta el barrio?"], prompt: "قول: عندي شهر هنا. عاجبني الحي والناس مزيانين فالمعاملة.", targetAnswer: "Llevo un mes aquí. Me gusta el barrio y la gente es muy amable.", acceptedAnswers: ["Llevo un mes aquí, me gusta el barrio y la gente es muy amable."], explanation: "Llevo un mes هنا كتجاوب على المدة اللي دوزتي فالحومة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-7.mp3`, wordBreakdown: [{ source: "Llevo un mes", target: "عندي شهر" }, { source: "Me gusta", target: "عاجبني" }, { source: "muy amable", target: "مزيانين فالمعاملة" }] },
  { id: "stage-8", title: "الترحيب والوداع", newVocab: ["Bienvenido al barrio = مرحبا بيك فالحومة", "Si necesitas algo, aquí estamos = إلا احتجتي شي حاجة حنا هنا", "Pues nada, nos vemos = إيوا صافي نشوفوك"], fullVocab: neighbourhoodVocab.map((item) => `${item.term} = ${item.meaning}`), prompt: "قول: شكرا بزاف، الله يخليك. إيوا صافي، نشوفوك من بعد.", targetAnswer: "Muchas gracias, muy amable. Pues nada, nos vemos. Ya nos veremos.", acceptedAnswers: ["Muchas gracias, muy amable. Nos vemos. Ya nos veremos."], explanation: "هاد النهاية كتجمع الشكر والوداع بطريقة طبيعية بين الجيران.", audioUrl: `/audio/sentence-builder/${courseId}/stage-8.mp3`, wordBreakdown: [{ source: "Muchas gracias", target: "شكرا بزاف" }, { source: "nos vemos", target: "نشوفوك" }, { source: "Ya nos veremos", target: "غادي نتلاقاو" }] },
];

export const andalusianSpanishA1NeighbourhoodIntroductionsDarijaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "بنّي الجمل: أول تعارف مع الجيران", subtitle: "ركّب جمل بسيطة باش تسلّم، تقدّم راسك وتهضر على السكن واللغة.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "sentence builder", "neighbourhood"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "sentence-builder",
  data: { stages: sentenceStages, finalChallenge: "قدّم راسك لجار جديد: الاسم، البلاد، فين ساكن، شحال هادي وانت هنا وعلاش كتتعلم الإسبانية." },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "neighbourhood-story-q1", type: "multiple-choice", prompt: "شنو سميت الجار الجديد؟", options: ["Adam", "Carlos", "Youssef"], correctAnswer: "Adam", explanation: "فالرسالة 3 قال: Me llamo Adam.", points: 1, skillTag: "الاسم" },
  { id: "neighbourhood-story-q2", type: "multiple-choice", prompt: "فين ساكنة لوسيا؟", options: ["هنا حدّاه", "فمدينة أخرى", "فالمغرب"], correctAnswer: "هنا حدّاه", explanation: "قالت: Vivo aquí al lao.", points: 1, skillTag: "السكن" },
  { id: "neighbourhood-story-q3", type: "true-false", prompt: "صح ولا خطأ: آدم جديد فالحومة.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "قال بوضوح: Sí, soy nuevo por aquí.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "neighbourhood-story-q4", type: "multiple-choice", prompt: "شحال كيهضر آدم بالإسبانية؟", options: ["غير شوية", "بطلاقة", "ما كيهضرش نهائيا"], correctAnswer: "غير شوية", explanation: "جاوب: Un poquito، وقال كيتعلم بشوية بشوية.", points: 1, skillTag: "اللغة" },
  { id: "neighbourhood-story-q5", type: "multiple-choice", prompt: "علاش كيتعلم آدم الإسبانية؟", options: ["باش يهضر مع الناس وحيت ساكن هنا", "باش يسافر لليابان", "باش يخدم فالمطار"], correctAnswer: "باش يهضر مع الناس وحيت ساكن هنا", explanation: "هاد السببين باينين فالرسالتين 14 و15.", points: 1, skillTag: "السبب" },
  { id: "neighbourhood-story-q6", type: "multiple-choice", prompt: "شحال هادي وآدم ساكن فالحومة؟", options: ["شهر واحد", "عامين", "نهار واحد"], correctAnswer: "شهر واحد", explanation: "قال: Llevo un mes aquí.", points: 1, skillTag: "المدة" },
  { id: "neighbourhood-story-q7", type: "true-false", prompt: "صح ولا خطأ: آدم عاجباه الحومة.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "قال: Me gusta el barrio، وشكر لوسيا على المعاملة.", points: 1, skillTag: "الرأي" },
  { id: "neighbourhood-story-q8", type: "multiple-choice", prompt: "فين كاين السوبرمارشي؟", options: ["هنا حدّاه، من بعد المخبزة", "داخل المطار", "بعيد بزاف"], correctAnswer: "هنا حدّاه، من بعد المخبزة", explanation: "لوسيا شرحات الطريق فالرسالة 24.", points: 1, skillTag: "المكان" },
  { id: "neighbourhood-story-q9", type: "multiple-choice", prompt: "شنو العبارة اللي استعمل آدم باش يبدا يسالي المحادثة؟", options: ["Pues nada, nos vemos", "¿Cómo te llamas?", "Un poquito"], correctAnswer: "Pues nada, nos vemos", explanation: "فالرسالة 27 بدا الوداع بهاد العبارة.", points: 1, skillTag: "الوداع" },
  { id: "neighbourhood-story-q10", type: "multiple-choice", prompt: "كيفاش سالات المحادثة؟", options: ["لوسيا رحّبات بآدم مرة أخرى", "آدم قال ما عجباتوش الحومة", "تخاصمو على السوبرمارشي"], correctAnswer: "لوسيا رحّبات بآدم مرة أخرى", explanation: "فالرسالة الأخيرة قالت: Aro. Bienvenido al barrio.", points: 1, skillTag: "النهاية" },
];

export const andalusianSpanishA1NeighbourhoodIntroductionsDarijaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "القصة: أول نهار مع الجيران", subtitle: "آدم كيتعارف مع لوسيا وكيكتاشف أول بلاصة مهمة فالحومة.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "story", "neighbourhood"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "darija",
    characters: [{ id: "adam", name: "Adam", initials: "AD", side: "right", color: "cyan" }, { id: "lucia", name: "Lucía", initials: "LU", side: "left", color: "violet" }],
    messages: [
      message("m1", "lucia", "Buenas, ¿qué tal? ¿Eres nuevo por aquí?", "سلام، كيداير؟ واش نتا جديد هنا؟", ["Buenas", "¿Qué tal?", "¿Eres nuevo por aquí?"]),
      message("m2", "adam", "Buenas. Sí, soy nuevo por aquí.", "سلام. إييه، أنا جديد هنا.", ["Buenas", "Sí, soy nuevo por aquí"]),
      message("m3", "adam", "Me llamo Adam y soy de Marruecos.", "سميتي آدم وأنا من المغرب.", ["Me llamo…", "Soy de Marruecos"], "voice-note"),
      message("m4", "lucia", "Yo soy Lucía. Encantá, Adam.", "أنا لوسيا. متشرفة، آدم.", ["Encantao / Encantá"]),
      message("m5", "adam", "Encantao, Lucía. ¿De dónde eres?", "متشرف، لوسيا. منين نتي؟", ["Encantao / Encantá", "¿De dónde eres?"]),
      message("m6", "lucia", "Soy de Málaga y vivo aquí al lao.", "أنا من مالقة وساكنة هنا حدّاك.", ["Vivo aquí al lao"], "voice-note"),
      message("m7", "lucia", "¿Y tú? ¿Vives por aquí?", "ونتا؟ واش ساكن هنا؟", ["¿Vives por aquí?"]),
      message("m8", "adam", "Aro. Vivo en el número doce.", "طبعا. ساكن فالرقم 12.", ["Aro"]),
      message("m9", "adam", "Sí, soy nuevo por aquí. Llegué hace un mes.", "إييه، أنا جديد هنا. جيت هادا شهر.", ["Sí, soy nuevo por aquí", "Llevo un mes aquí"]),
      message("m10", "lucia", "Qué bien. ¿Hablas español?", "زوين. كاتهضر الإسبانية؟", ["Qué bien", "¿Hablas español?"]),
      message("m11", "adam", "Un poquito. Estoy aprendiendo español.", "غير شوية. كنتعلّم الإسبانية.", ["Un poquito", "Estoy aprendiendo español"]),
      message("m12", "adam", "Poquito a poco. Cada día entiendo más.", "بشوية بشوية. كل نهار كنفهم كثر.", ["Poquito a poco"], "voice-note"),
      message("m13", "lucia", "¿Y pa’ qué aprendes español?", "وعلاش كاتتعلّم الإسبانية؟", ["¿Y pa’ qué aprendes español?"]),
      message("m14", "adam", "Pa’ hablar con la gente.", "باش نهضر مع الناس.", ["Pa’ hablar con la gente"]),
      message("m15", "adam", "Y porque vivo aquí. Me gusta el barrio.", "وحيت ساكن هنا. عاجبني الحي.", ["Porque vivo aquí", "Me gusta el barrio"]),
      message("m16", "lucia", "¿Cuánto tiempo llevas aquí exactamente?", "بالضبط شحال هادي وانت هنا؟", ["¿Cuánto tiempo llevas aquí?"]),
      message("m17", "adam", "Llevo un mes aquí.", "عندي شهر هنا.", ["Llevo un mes aquí"]),
      message("m18", "lucia", "Aro. ¿Y te gusta el barrio?", "طبعا. وواش عاجباك الحومة؟", ["Aro", "¿Te gusta el barrio?"], "voice-note"),
      message("m19", "adam", "Sí, me gusta el barrio. Es tranquilo.", "إييه، عاجبني الحي. راه هادئ.", ["Me gusta el barrio"]),
      message("m20", "lucia", "Y la gente es muy amable, ya verás.", "والناس مزيانين فالمعاملة، غادي تشوف.", ["La gente es muy amable"]),
      message("m21", "adam", "Sí. Muchas gracias, muy amable.", "إييه. شكرا بزاف، الله يخليك.", ["Muchas gracias, muy amable"]),
      message("m22", "lucia", "Bienvenido al barrio. Si necesitas algo, aquí estamos.", "مرحبا بيك فالحومة. إلا احتجتي شي حاجة، حنا هنا.", ["Bienvenido al barrio", "Si necesitas algo, aquí estamos"]),
      message("m23", "adam", "Gracias. No conozco el supermercado.", "شكرا. ما كنعرفش السوبرمارشي.", []),
      message("m24", "lucia", "No pasa ná. Está aquí al lao, después de la panadería.", "ما كاين باس. راه هنا حدّاك، من بعد المخبزة.", ["No pasa ná", "Vivo aquí al lao"], "voice-note"),
      message("m25", "adam", "¿Está cerca entonces?", "واش قريب إيوا؟", []),
      message("m26", "lucia", "Aro. Dos minutos andando.", "طبعا. جوج دقايق على رجليك.", ["Aro"]),
      message("m27", "adam", "Perfecto. Pues nada, nos vemos.", "مزيان. إيوا صافي، نشوفوك.", ["Pues nada, nos vemos"]),
      message("m28", "lucia", "De ná, mi arma.", "على والو، آ العزيز.", ["De ná, mi arma"]),
      message("m29", "adam", "Ya nos veremos por el barrio.", "غادي نتلاقاو من بعد فالحومة.", ["Ya nos veremos"]),
      message("m30", "lucia", "Aro. ¡Bienvenido al barrio otra vez!", "طبعا. مرحبا بيك فالحومة مرة أخرى!", ["Aro", "Bienvenido al barrio"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `neighbourhood-story-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: neighbourhoodVocab.map((item) => item.term),
    finalReview: { keyPhrases: ["Buenas, ¿qué tal?", "Me llamo…", "¿Eres nuevo por aquí?", "Estoy aprendiendo español", "Bienvenido al barrio"], grammarPatterns: ["Me llamo + nombre", "Soy de + lugar", "Vivo en + lugar", "Llevo + tiempo + aquí"], speakingPrompts: ["قدّم راسك لجار جديد.", "قول منين نتا وفين ساكن.", "شرح علاش كتتعلم الإسبانية."] },
    completionTask: { title: "تعارف قصير مع جار", instructions: "سجّل 45 ثانية بالإسبانية: سلّم، قدّم الاسم والبلاد، قول بلي جديد فالحومة، شرح علاش كتتعلم الإسبانية وسالي المحادثة بأدب." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Adam sale de su edificio y ve a una vecina. Ella sonríe y dice: “Buenas, ¿qué tal? ¿Eres nuevo por aquí?”. Adam responde: “Sí, soy nuevo por aquí”.", translation: "آدم خرج من العمارة وشاف وحدة الجارة. هي ابتسمات وسلمات عليه وسولاتو واش جديد فالحومة. هو قال ليها إييه، جديد هنا.", highlights: highlights(["Buenas", "¿Qué tal?", "¿Eres nuevo por aquí?", "Sí, soy nuevo por aquí"]), shadowLine: "Buenas, ¿qué tal? Sí, soy nuevo por aquí." },
  { id: "p2", text: "Adam se presenta: “Me llamo Adam y soy de Marruecos”. La vecina dice: “Yo soy Lucía. Encantá”. Adam contesta: “Encantao. ¿De dónde eres?”.", translation: "آدم قدّم راسو وقال سميتو ومن المغرب. الجارة قالت سميتها لوسيا ومتشرفة. هو حتى هو قال متشرف وسولها منين هي.", highlights: highlights(["Me llamo…", "Soy de Marruecos", "Encantao / Encantá", "¿De dónde eres?"]), shadowLine: "Me llamo Adam, soy de Marruecos. Encantao." },
  { id: "p3", text: "Lucía es de Málaga y vive aquí al lao. Pregunta: “¿Vives por aquí?”. Adam vive en el número doce y lleva un mes en el barrio.", translation: "لوسيا من مالقة وساكنة حدا آدم. سولات واش ساكن هنا. آدم ساكن فالرقم 12 وعندو شهر فالحومة.", highlights: highlights(["Vivo aquí al lao", "¿Vives por aquí?", "Llevo un mes aquí"]), shadowLine: "Vivo aquí al lao. Llevo un mes aquí." },
  { id: "p4", text: "Lucía quiere saber si Adam habla español. Él responde: “Un poquito. Estoy aprendiendo español, poquito a poco”. Todavía comete errores, pero cada día entiende más.", translation: "لوسيا بغات تعرف واش آدم كيهضر الإسبانية. هو قال غير شوية وراه كيتعلم بشوية بشوية. مازال كيغلط ولكن كل نهار كيفهم كثر.", highlights: highlights(["¿Hablas español?", "Un poquito", "Estoy aprendiendo español", "Poquito a poco"]), shadowLine: "Estoy aprendiendo español, poquito a poco." },
  { id: "p5", text: "Después, Lucía pregunta: “¿Y pa’ qué aprendes español?”. Adam explica: “Pa’ hablar con la gente y porque vivo aquí”. Quiere conocer bien a sus vecinos.", translation: "من بعد، لوسيا سولاتو علاش كيتعلم الإسبانية. آدم شرح بلي باغي يهضر مع الناس وحيت ساكن هنا وباغي يتعرف على الجيران.", highlights: highlights(["¿Y pa’ qué aprendes español?", "Pa’ hablar con la gente", "Porque vivo aquí"]), shadowLine: "Aprendo español pa’ hablar con la gente." },
  { id: "p6", text: "Adam dice: “Me gusta el barrio”. Para él, la gente es muy amable. Lucía pregunta: “¿Te gusta el barrio?” y él responde que sí.", translation: "آدم قال بلي عاجبو الحي وبالنسبة ليه الناس مزيانين فالمعاملة. لوسيا سولات واش عاجباه الحومة وهو جاوب بنعم.", highlights: highlights(["Me gusta el barrio", "La gente es muy amable", "¿Te gusta el barrio?"]), shadowLine: "Me gusta el barrio. La gente es muy amable." },
  { id: "p7", text: "Lucía le dice: “Bienvenido al barrio. Si necesitas algo, aquí estamos”. Adam responde: “Muchas gracias, muy amable”. Ahora ya sabe que puede pedir ayuda.", translation: "لوسيا رحبات بيه وقالت ليه إلا احتاج شي حاجة راه هما هنا. آدم شكرها ودابا عرف بلي يقدر يطلب المساعدة.", highlights: highlights(["Bienvenido al barrio", "Si necesitas algo, aquí estamos", "Muchas gracias, muy amable"]), shadowLine: "Si necesitas algo, aquí estamos." },
  { id: "p8", text: "Antes de irse, Lucía le explica dónde está el supermercado. Adam dice: “Pues nada, nos vemos”. Ella responde: “De ná, mi arma. Ya nos veremos”. Adam continúa su paseo más tranquilo.", translation: "قبل ما تمشي، لوسيا شرحات ليه فين كاين السوبرمارشي. آدم بدا الوداع وهي جاوباتو بطريقة أندلسية دافئة. من بعد كمّل دورتو وهو مرتاح.", highlights: highlights(["Pues nada, nos vemos", "De ná, mi arma", "Ya nos veremos"]), shadowLine: "Pues nada, nos vemos. Ya nos veremos." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "neighbourhood-reading-q1", type: "multiple-choice", prompt: "شكون بدا المحادثة؟", options: ["لوسيا", "آدم", "مول السوبرمارشي"], correctAnswer: "لوسيا", explanation: "هي اللي سلمت وسولات واش آدم جديد.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "neighbourhood-reading-q2", type: "multiple-choice", prompt: "آدم جاي منين؟", options: ["من المغرب", "من إسبانيا", "من فرنسا"], correctAnswer: "من المغرب", explanation: "قال: Soy de Marruecos.", points: 1, skillTag: "التفاصيل" },
  { id: "neighbourhood-reading-q3", type: "true-false", prompt: "صح ولا خطأ: آدم كيهضر الإسبانية بطلاقة.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "قال Un poquito وراه مازال كيتعلم.", points: 1, skillTag: "الفهم" },
  { id: "neighbourhood-reading-q4", type: "multiple-choice", prompt: "علاش كيتعلم آدم الإسبانية؟", options: ["باش يهضر مع الناس وحيت ساكن هنا", "باش يدوز امتحان فالمدرسة", "باش يسافر للمغرب"], correctAnswer: "باش يهضر مع الناس وحيت ساكن هنا", explanation: "هاد الشي قالو بوضوح فالنص.", points: 1, skillTag: "السبب" },
  { id: "neighbourhood-reading-q5", type: "multiple-choice", prompt: "شنو عطاتو لوسيا لآدم فآخر اللقاء؟", options: ["معلومة على السوبرمارشي وترحيب", "تذكرة طيارة", "خدمة جديدة"], correctAnswer: "معلومة على السوبرمارشي وترحيب", explanation: "عاوناتو يعرف السوبرمارشي ورحبات بيه فالحومة.", points: 1, skillTag: "الخلاصة" },
];

export const andalusianSpanishA1NeighbourhoodIntroductionsDarijaReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "القراءة بالصوت: أول لقاء فالحومة", subtitle: "سمع وقرا تعارف بسيط بين آدم وجارتو لوسيا بالإسبانية الأندلسية.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "reading", "neighbourhood"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: neighbourhoodVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "ربط كل عبارة إسبانية بالمعنى الصحيح ديالها بالدارجة.", points: items.length, skillTag: "ربط العبارات" };
}

export const andalusianSpanishA1NeighbourhoodIntroductionsDarijaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "الكويز النهائي: التعارف الأول فالحومة", subtitle: "اختار العبارة الصحيحة فمواقف جديدة ديال التعارف والكلام مع الجيران.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "quiz", "neighbourhood"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "quiz",
  data: {
    description: "هاد الكويز كيشوف واش تقدر تختار عبارات التعارف الصحيحة مع الجيران فمواقف جديدة.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "neighbourhood-quiz-1", type: "multiple-choice", prompt: "بغيتي تقول سميتك. شنو تقول؟", options: ["Me llamo…", "¿Qué tal?", "No pasa ná", "Aro"], correctAnswer: "Me llamo…", explanation: "Me llamo كتقدم بها الاسم ديالك.", points: 1, skillTag: "التعارف" },
      { id: "neighbourhood-quiz-2", type: "multiple-choice", prompt: "بغيتي تعرف اسم الجار. شنو تسول؟", options: ["¿Cómo te llamas?", "¿Vives por aquí?", "¿Te gusta el barrio?", "¿Hablas español?"], correctAnswer: "¿Cómo te llamas?", explanation: "هاد هو السؤال المباشر على الاسم.", points: 1, skillTag: "الاسم" },
      { id: "neighbourhood-quiz-3", type: "order-words", prompt: "رتّب: أنا من المغرب.", wordBank: ["Soy", "de", "Marruecos"], correctAnswer: "Soy de Marruecos", explanation: "Soy de + البلاد كتقول بها الأصل.", points: 1, skillTag: "بناء الجملة" },
      { id: "neighbourhood-quiz-4", type: "true-false", prompt: "صح ولا خطأ: “Vivo aquí al lao” كتعني ساكن هنا حدّاكم.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "al lao هو النطق الأندلسي ديال al lado.", points: 1, skillTag: "اللهجة" },
      { id: "neighbourhood-quiz-5", type: "multiple-choice", prompt: "شي واحد سولاك واش كاتهضر الإسبانية، ولكن كاتهضر غير شوية. شنو تجاوب؟", options: ["Un poquito", "Bienvenido al barrio", "Ya nos veremos", "Qué bien"], correctAnswer: "Un poquito", explanation: "كتعني غير شوية.", points: 1, skillTag: "اللغة" },
      { id: "neighbourhood-quiz-6", type: "fill-blank", prompt: "كمّل: Estoy aprendiendo ______.", nativePrompt: "كنتعلّم الإسبانية", correctAnswer: "español", explanation: "Estoy aprendiendo español هي الجملة الكاملة.", points: 1, skillTag: "الكلمات" },
      { id: "neighbourhood-quiz-7", type: "multiple-choice", prompt: "بغيتي تسول شحال هادي وهو ساكن هنا. شنو تقول؟", options: ["¿Cuánto tiempo llevas aquí?", "¿De dónde eres?", "¿Qué tal?", "¿Cómo te llamas?"], correctAnswer: "¿Cuánto tiempo llevas aquí?", explanation: "هاد السؤال كيسول على المدة.", points: 1, skillTag: "المدة" },
      { id: "neighbourhood-quiz-8", type: "multiple-choice", prompt: "بغيتي تقول عندك شهر هنا. شنو تقول؟", options: ["Llevo un mes aquí", "Vivo aquí al lao", "Un poquito", "Aro"], correctAnswer: "Llevo un mes aquí", explanation: "Llevo + المدة + aquí.", points: 1, skillTag: "المدة" },
      { id: "neighbourhood-quiz-9", type: "true-false", prompt: "صح ولا خطأ: “Si necesitas algo, aquí estamos” عرض للمساعدة.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "كتقول للجار بلي يقدر يعتمد عليك إلى احتاج شي حاجة.", points: 1, skillTag: "المساعدة" },
      { id: "neighbourhood-quiz-10", type: "multiple-choice", prompt: "بغيتي تسالي محادثة قصيرة بطريقة طبيعية. شنو تقول؟", options: ["Pues nada, nos vemos", "¿Eres nuevo por aquí?", "Me llamo…", "¿Hablas español?"], correctAnswer: "Pues nada, nos vemos", explanation: "هاد العبارة كتدخل للوداع بطريقة طبيعية.", points: 1, skillTag: "الوداع" },
      pairQuestion("neighbourhood-quiz-11", "ربط عبارات التعارف بالمعاني ديالها.", neighbourhoodVocab.slice(2, 6)),
      pairQuestion("neighbourhood-quiz-12", "ربط عبارات اللغة والسكن بالمعاني ديالها.", neighbourhoodVocab.slice(9, 13)),
      pairQuestion("neighbourhood-quiz-13", "ربط عبارات الترحيب والوداع بالمعاني ديالها.", neighbourhoodVocab.slice(19, 23)),
    ],
  },
};
