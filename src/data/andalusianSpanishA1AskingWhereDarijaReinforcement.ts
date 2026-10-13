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

const courseId = "andalusian-spanish-a1-asking-where-something-is-darija";
const sectionName = "الإسبانية الأندلسية A1 - السؤال على المكان والاتجاهات";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const directionsVocab: VocabItem[] = [
  { id: "perdona", term: "Perdona", meaning: "سمح ليا", note: "كتستعملها باش توقف شي واحد بأدب قبل السؤال.", example: "Perdona, ¿sabes dónde está la estación?", translation: "سمح ليا، واش عارف فين كاينة المحطة؟" },
  { id: "donde-estacion", term: "¿Dónde está la estación?", meaning: "فين كاينة المحطة؟", note: "سؤال مباشر على مكان المحطة.", example: "Perdona, ¿dónde está la estación?", translation: "سمح ليا، فين كاينة المحطة؟" },
  { id: "sabes-estacion", term: "¿Sabes dónde está la estación?", meaning: "واش عارف فين كاينة المحطة؟", note: "طريقة طبيعية ومؤدبة أكثر للسؤال.", example: "¿Sabes dónde está la estación de tren?", translation: "واش عارف فين كاينة محطة القطار؟" },
  { id: "parada-autobus", term: "¿Hay una parada de autobús por aquí?", meaning: "واش كاينة محطة ديال الطوبيس هنا قريب؟", note: "por aquí كتعني هنا قريب.", example: "¿Hay una parada de autobús por aquí?", translation: "واش كاينة محطة ديال الطوبيس هنا قريب؟" },
  { id: "donde-bano", term: "¿Dónde está el baño?", meaning: "فين كاين الحمّام؟", note: "سؤال مهم فالمحطة أو المطعم أو المتجر.", example: "Perdona, ¿dónde está el baño?", translation: "سمح ليا، فين كاين الحمّام؟" },
  { id: "donde-farmacia", term: "¿Dónde está la farmacia?", meaning: "فين كاينة الصيدلية؟", note: "farmacia مؤنث، لذلك كنقول está بلا تغيير فالفعل.", example: "¿Dónde está la farmacia más cercana?", translation: "فين كاينة أقرب صيدلية؟" },
  { id: "donde-mezquita", term: "¿Dónde está la mezquita?", meaning: "فين كاين الجامع؟", note: "سؤال على مكان الجامع.", example: "¿Sabes dónde está la mezquita?", translation: "واش عارف فين كاين الجامع؟" },
  { id: "donde-tienda", term: "¿Dónde está la tienda?", meaning: "فين كاين الحانوت؟", note: "tienda كتقدر تكون حانوت أو متجر حسب السياق.", example: "¿Dónde está la tienda del barrio?", translation: "فين كاين حانوت الحومة؟" },
  { id: "donde-oficina", term: "¿Dónde está la oficina?", meaning: "فين كاين المكتب؟", note: "سؤال على مكتب أو إدارة.", example: "¿Dónde está la oficina de información?", translation: "فين كاين مكتب المعلومات؟" },
  { id: "esta-lejos", term: "¿Está lejos?", meaning: "واش بعيدة؟", note: "سؤال واش المكان بعيد.", example: "¿La estación está lejos?", translation: "واش المحطة بعيدة؟" },
  { id: "esta-cerca", term: "Está cerca", meaning: "راه قريبة", note: "جواب بسيط كيعني المكان قريب.", example: "No te preocupes, está cerca.", translation: "ما تقلقش، راه قريبة." },
  { id: "cerquita", term: "Está cerquita", meaning: "راه قريبة بزاف", note: "cerquita تصغير ودّي كيشدد على القرب.", example: "La parada está cerquita.", translation: "المحطة قريبة بزاف." },
  { id: "aqui-al-lado", term: "Está aquí al lado", meaning: "راه هنا حدانا", note: "الصيغة العادية باش تقول قريبة بزاف.", example: "La farmacia está aquí al lado.", translation: "الصيدلية هنا حدانا." },
  { id: "aqui-al-lao", term: "Está aquí al lao", meaning: "راه هنا حدانا", note: "نطق أندلسي دارج لـ al lado.", example: "La tienda está aquí al lao.", translation: "الحانوت هنا حدانا." },
  { id: "ahi-mismo", term: "Está ahí mismo", meaning: "راه تما بالضبط", note: "كتشير لمكان واضح وقريب.", example: "La oficina está ahí mismo.", translation: "المكتب راه تما بالضبط." },
  { id: "sigue-recto", term: "Sigue todo recto", meaning: "بقا غادي نيشان", note: "تعليمات باش تكمل بلا ما تدور.", example: "Sigue todo recto dos minutos.", translation: "بقا غادي نيشان جوج دقايق." },
  { id: "tira-recto", term: "Tira todo recto", meaning: "كمل غادي نيشان", note: "صيغة محلية وعامية شائعة فالأندلس.", example: "Tira todo recto hasta el semáforo.", translation: "كمل غادي نيشان حتى للسينيال." },
  { id: "derecha", term: "Gira a la derecha", meaning: "دور على اليمين", note: "تعليمات للدوران على اليمين.", example: "En la esquina, gira a la derecha.", translation: "فالزاوية، دور على اليمين." },
  { id: "izquierda", term: "Gira a la izquierda", meaning: "دور على اليسار", note: "تعليمات للدوران على اليسار.", example: "Después, gira a la izquierda.", translation: "من بعد، دور على اليسار." },
  { id: "cruza-calle", term: "Cruza la calle", meaning: "قطع الزنقة", note: "تعليمات لعبور الطريق.", example: "Cruza la calle con cuidado.", translation: "قطع الزنقة بالرد بالك." },
  { id: "esquina", term: "Está en la esquina", meaning: "راه فالزاوية", note: "كتحدد المكان فالزاوية ديال الشارع.", example: "La farmacia está en la esquina.", translation: "الصيدلية فالزاوية." },
  { id: "enfrente-farmacia", term: "Está enfrente de la farmacia", meaning: "راه مقابل الصيدلية", note: "enfrente de كتعني مقابل.", example: "La parada está enfrente de la farmacia.", translation: "محطة الطوبيس مقابل الصيدلية." },
  { id: "lado-farmacia", term: "Está al lado de la farmacia", meaning: "راه حدا الصيدلية", note: "al lado de كتعني حدا.", example: "La tienda está al lado de la farmacia.", translation: "الحانوت حدا الصيدلية." },
  { id: "detras-oficina", term: "Está detrás de la oficina", meaning: "راه مور المكتب", note: "detrás de كتعني مور.", example: "El baño está detrás de la oficina.", translation: "الحمّام مور المكتب." },
  { id: "delante-estacion", term: "Está delante de la estación", meaning: "راه قدّام المحطة", note: "delante de كتعني قدّام.", example: "La parada está delante de la estación.", translation: "محطة الطوبيس قدّام المحطة." },
  { id: "final-calle", term: "Está al final de la calle", meaning: "راه فآخر الزنقة", note: "كتحدد المكان فالنهاية ديال الشارع.", example: "La estación está al final de la calle.", translation: "المحطة فآخر الزنقة." },
  { id: "hasta-semaforo", term: "Sigue recto hasta el semáforo", meaning: "بقا غادي نيشان حتى للسينيال", note: "hasta كتعطي النقطة اللي خاصك توقف أو تبدل فيها الاتجاه.", example: "Sigue recto hasta el semáforo y gira.", translation: "بقا غادي نيشان حتى للسينيال ومن بعد دور." },
  { id: "cinco-minutos", term: "Está a cinco minutos andando", meaning: "راه على خمس دقايق بالمشي", note: "طريقة باش تقول المسافة بالوقت والمشي.", example: "La estación está a cinco minutos andando.", translation: "المحطة على خمس دقايق بالمشي." },
  { id: "ir-andando", term: "¿Se puede ir andando?", meaning: "واش نقدر نمشي ليها على رجلي؟", note: "سؤال واش المسافة مناسبة للمشي.", example: "¿Se puede ir andando desde aquí?", translation: "واش نقدر نمشي ليها على رجلي من هنا؟" },
  { id: "voy-bien", term: "¿Voy bien para la estación?", meaning: "واش أنا غادي مزيان للمحطة؟", note: "كتتأكد بلي ماشي فالطريق الصحيح.", example: "Perdona, ¿voy bien para la estación?", translation: "سمح ليا، واش أنا غادي مزيان للمحطة؟" },
  { id: "por-donde", term: "¿Por dónde se va a la estación?", meaning: "منين كيمشيو للمحطة؟", note: "سؤال عام على الطريق للمحطة.", example: "¿Por dónde se va a la estación desde aquí?", translation: "منين كيمشيو للمحطة من هنا؟" },
  { id: "para-ir", term: "¿Para ir a la estación?", meaning: "باش نمشي للمحطة؟", note: "سؤال مختصر وطبيعي مع الإشارة أو السياق.", example: "Perdona, ¿para ir a la estación?", translation: "سمح ليا، باش نمشي للمحطة؟" },
  { id: "por-aqui", term: "Por aquí", meaning: "من هنا", note: "كتشير للطريق القريب منك.", example: "Sí, por aquí.", translation: "إييه، من هنا." },
  { id: "por-ahi", term: "Por ahí", meaning: "من تما", note: "كتشير لطريق بعيد شوية عليك.", example: "No, es por ahí.", translation: "لا، من تما." },
  { id: "mas-adelante", term: "Un poquito más adelante", meaning: "شوية القدّام", note: "كتقول للشخص يزيد شوية فالطريق.", example: "La entrada está un poquito más adelante.", translation: "الدخلة شوية القدّام." },
  { id: "te-has-pasado", term: "Te has pasado", meaning: "راك فتيها", note: "كتعني الشخص داز من المكان اللي كان خاصو يوقف فيه.", example: "La farmacia queda atrás; te has pasado.", translation: "الصيدلية بقات اللور؛ راك فتيها." },
  { id: "que-va", term: "¡Qué va!", meaning: "لا أبدا / لا لا، ماشي بعيد", note: "رد عامي قوي للنفي أو الطمأنة.", example: "—¿Está lejos? —¡Qué va!", translation: "—واش بعيدة؟ —لا لا، ماشي بعيد." },
  { id: "sin-perdida", term: "No tiene pérdida", meaning: "سهلة تلقاها / ما غاديش تضيع", note: "كتعني الطريق واضح وساهل.", example: "Sigue recto; no tiene pérdida.", translation: "بقا نيشان؛ سهلة تلقاها." },
  { id: "vas-bien", term: "Vas bien", meaning: "راك غادي مزيان", note: "كتأكد للشخص أنه فالطريق الصحيح.", example: "Sí, vas bien para la estación.", translation: "إييه، راك غادي مزيان للمحطة." },
  { id: "gracias", term: "Muchas gracias", meaning: "شكرا بزاف", note: "شكر واضح ومؤدب.", example: "Muchas gracias por la ayuda.", translation: "شكرا بزاف على المساعدة." },
  { id: "de-nada", term: "De nada", meaning: "بلا جميل", note: "جواب عادي على الشكر.", example: "—Muchas gracias. —De nada.", translation: "—شكرا بزاف. —بلا جميل." },
];

const highlightMap = Object.fromEntries(directionsVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
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
    specialCharacters,
    starred: true,
  };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return { id, speakerId, text, translation, vocabHighlights: highlights(phrases), messageType, audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined };
}

export const andalusianSpanishA1AskingWhereDarijaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "بطاقات A1: السؤال على المكان والاتجاهات",
  subtitle: "راجع كيفاش تسول على بلاصة وتفهم الطريق بالإسبانية الأندلسية.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "directions", "places"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { cards: directionsVocab.map(cardFromVocab), specialCharacters },
};

const sentenceStages: SentenceStage[] = [
  { id: "stage-1", title: "بدا السؤال بأدب", newVocab: ["Perdona = سمح ليا", "¿Dónde está la estación? = فين كاينة المحطة؟", "¿Sabes dónde está la estación? = واش عارف فين كاينة المحطة؟"], fullVocab: ["Perdona", "¿Dónde está la estación?", "¿Sabes dónde está la estación?"], prompt: "قول: سمح ليا، واش عارف فين كاينة المحطة؟", targetAnswer: "Perdona, ¿sabes dónde está la estación?", acceptedAnswers: ["Perdona, ¿dónde está la estación?"], explanation: "Perdona كتخلي السؤال مؤدب، و¿sabes dónde está...? كتجي طبيعية فالهضرة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-1.mp3`, wordBreakdown: [{ source: "Perdona", target: "سمح ليا" }, { source: "¿sabes...?", target: "واش عارف...؟" }, { source: "la estación", target: "المحطة" }] },
  { id: "stage-2", title: "بلاصات مهمة", newVocab: ["¿Dónde está el baño? = فين كاين الحمام؟", "¿Dónde está la farmacia? = فين كاينة الصيدلية؟", "¿Dónde está la mezquita? = فين كاين الجامع؟", "¿Dónde está la oficina? = فين كاين المكتب؟"], fullVocab: ["¿Dónde está el baño?", "¿Dónde está la farmacia?", "¿Dónde está la mezquita?", "¿Dónde está la tienda?", "¿Dónde está la oficina?"], prompt: "قول: فين كاينة الصيدلية وفين كاين الحمّام؟", targetAnswer: "¿Dónde está la farmacia y dónde está el baño?", acceptedAnswers: ["¿Dónde están la farmacia y el baño?"], explanation: "¿Dónde está...? كتخدم مع بلاصة وحدة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-2.mp3`, wordBreakdown: [{ source: "¿Dónde está...?", target: "فين كاين...؟" }, { source: "la farmacia", target: "الصيدلية" }, { source: "el baño", target: "الحمام" }] },
  { id: "stage-3", title: "قريب ولا بعيد", newVocab: ["¿Está lejos? = واش بعيدة؟", "Está cerca = راه قريبة", "Está cerquita = راه قريبة بزاف", "Está aquí al lao = راه هنا حدانا", "Está ahí mismo = راه تما بالضبط"], fullVocab: ["¿Está lejos?", "Está cerca", "Está cerquita", "Está aquí al lado", "Está aquí al lao", "Está ahí mismo"], prompt: "قول: واش المحطة بعيدة؟ لا لا، راه هنا حدانا.", targetAnswer: "¿La estación está lejos? ¡Qué va! Está aquí al lao.", acceptedAnswers: ["¿Está lejos la estación? No, está aquí al lado."], explanation: "¡Qué va! كتجي كجواب طبيعي باش تنفي بلي بعيدة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-3.mp3`, wordBreakdown: [{ source: "¿Está lejos?", target: "واش بعيدة؟" }, { source: "¡Qué va!", target: "لا لا" }, { source: "aquí al lao", target: "هنا حدانا" }] },
  { id: "stage-4", title: "نيشان ومن بعد دور", newVocab: ["Sigue todo recto = بقا غادي نيشان", "Tira todo recto = كمل غادي نيشان", "Gira a la derecha = دور على اليمين", "Gira a la izquierda = دور على اليسار", "Cruza la calle = قطع الزنقة"], fullVocab: ["Sigue todo recto", "Tira todo recto", "Gira a la derecha", "Gira a la izquierda", "Cruza la calle"], prompt: "قول: كمل نيشان، قطع الزنقة، ومن بعد دور على اليمين.", targetAnswer: "Tira todo recto, cruza la calle y gira a la derecha.", acceptedAnswers: ["Sigue todo recto, cruza la calle y gira a la derecha."], explanation: "رتب التعليمات بالأفعال ومن بعد اربطها بـ y.", audioUrl: `/audio/sentence-builder/${courseId}/stage-4.mp3`, wordBreakdown: [{ source: "Tira todo recto", target: "كمل نيشان" }, { source: "cruza la calle", target: "قطع الزنقة" }, { source: "gira a la derecha", target: "دور على اليمين" }] },
  { id: "stage-5", title: "حدد المكان", newVocab: ["Está en la esquina = راه فالزاوية", "Está enfrente de la farmacia = مقابل الصيدلية", "Está al lado de la farmacia = حدا الصيدلية", "Está detrás de la oficina = مور المكتب", "Está delante de la estación = قدام المحطة"], fullVocab: ["Está en la esquina", "Está enfrente de la farmacia", "Está al lado de la farmacia", "Está detrás de la oficina", "Está delante de la estación", "Está al final de la calle"], prompt: "قول: الحانوت فالزاوية، حدا الصيدلية.", targetAnswer: "La tienda está en la esquina, al lado de la farmacia.", acceptedAnswers: ["Está en la esquina, al lado de la farmacia."], explanation: "كتقدر تجمع جوج علامات باش الطريق يكون واضح.", audioUrl: `/audio/sentence-builder/${courseId}/stage-5.mp3`, wordBreakdown: [{ source: "en la esquina", target: "فالزاوية" }, { source: "al lado de", target: "حدا" }, { source: "la farmacia", target: "الصيدلية" }] },
  { id: "stage-6", title: "المسافة بالمشي", newVocab: ["Está a cinco minutos andando = على خمس دقايق بالمشي", "¿Se puede ir andando? = واش نقدر نمشي على رجلي؟", "Sigue recto hasta el semáforo = بقا نيشان حتى للسينيال"], fullVocab: ["Está a cinco minutos andando", "¿Se puede ir andando?", "Sigue recto hasta el semáforo"], prompt: "قول: واش نقدر نمشي ليها على رجلي؟ راه على خمس دقايق بالمشي.", targetAnswer: "¿Se puede ir andando? Está a cinco minutos andando.", acceptedAnswers: ["¿Puedo ir andando? Está a cinco minutos."], explanation: "andando كتدل على المشي.", audioUrl: `/audio/sentence-builder/${courseId}/stage-6.mp3`, wordBreakdown: [{ source: "¿Se puede ir...?", target: "واش نقدر نمشي...؟" }, { source: "a cinco minutos", target: "على خمس دقايق" }, { source: "andando", target: "بالمشي" }] },
  { id: "stage-7", title: "تأكد من الطريق", newVocab: ["¿Voy bien para la estación? = واش غادي مزيان للمحطة؟", "¿Por dónde se va a la estación? = منين كيمشيو للمحطة؟", "¿Para ir a la estación? = باش نمشي للمحطة؟", "Por aquí = من هنا", "Por ahí = من تما", "Vas bien = راك غادي مزيان"], fullVocab: ["¿Voy bien para la estación?", "¿Por dónde se va a la estación?", "¿Para ir a la estación?", "Por aquí", "Por ahí", "Vas bien"], prompt: "قول: سمح ليا، واش غادي مزيان للمحطة؟", targetAnswer: "Perdona, ¿voy bien para la estación?", acceptedAnswers: ["¿Voy bien para la estación?"], explanation: "هاد السؤال مفيد ملي تكون بديتي الطريق وبغيتي غير تتأكد.", audioUrl: `/audio/sentence-builder/${courseId}/stage-7.mp3`, wordBreakdown: [{ source: "¿Voy bien...?", target: "واش غادي مزيان...؟" }, { source: "para", target: "نحو / باش نمشي لـ" }, { source: "la estación", target: "المحطة" }] },
  { id: "stage-8", title: "صحح الطريق وسالي", newVocab: ["Un poquito más adelante = شوية القدام", "Te has pasado = راك فتيها", "No tiene pérdida = سهلة تلقاها", "Muchas gracias = شكرا بزاف", "De nada = بلا جميل"], fullVocab: directionsVocab.map((item) => `${item.term} = ${item.meaning}`), prompt: "قول: شوية القدام. سهلة تلقاها. شكرا بزاف.", targetAnswer: "Un poquito más adelante. No tiene pérdida. Muchas gracias.", acceptedAnswers: ["Está un poquito más adelante. No tiene pérdida. Gracias."], explanation: "هاد العبارات كتوضح آخر جزء فالطريق وكتسالي بالشكر.", audioUrl: `/audio/sentence-builder/${courseId}/stage-8.mp3`, wordBreakdown: [{ source: "más adelante", target: "القدام" }, { source: "No tiene pérdida", target: "سهلة تلقاها" }, { source: "Muchas gracias", target: "شكرا بزاف" }] },
];

export const andalusianSpanishA1AskingWhereDarijaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "بنّي الجمل: سول على الطريق وفهم الجواب",
  subtitle: "ركّب أسئلة على البلايص وتدرّب على القرب، الاتجاهات والعلامات فالشارع.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "sentence builder", "directions"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: { stages: sentenceStages, finalChallenge: "سول على المحطة، تأكد واش قريبة، ومن بعد عاود الطريق باستعمال نيشان واليمين وعلامة الصيدلية." },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "where-story-q1", type: "multiple-choice", prompt: "على شنو سولات أمينة فالبداية؟", options: ["على المحطة", "على الثمن", "على القهوة"], correctAnswer: "على المحطة", explanation: "قالت: ¿Sabes dónde está la estación?", points: 1, skillTag: "بداية القصة" },
  { id: "where-story-q2", type: "true-false", prompt: "صح ولا خطأ: المحطة بعيدة بزاف.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "بابلو قال Está cerca وEstá a cinco minutos andando.", points: 1, skillTag: "المسافة" },
  { id: "where-story-q3", type: "multiple-choice", prompt: "فين خاص أمينة تدور من بعد السينيال؟", options: ["على اليمين", "على اليسار", "ما تدورش"], correctAnswer: "على اليمين", explanation: "بابلو قال gira a la derecha.", points: 1, skillTag: "الاتجاه" },
  { id: "where-story-q4", type: "multiple-choice", prompt: "شنو العلامة اللي خاص أمينة تشوف؟", options: ["الصيدلية", "الجامع", "الحانوت"], correctAnswer: "الصيدلية", explanation: "بابلو قال المحطة مقابل الصيدلية.", points: 1, skillTag: "العلامة" },
  { id: "where-story-q5", type: "true-false", prompt: "صح ولا خطأ: أمينة تقدر توصل للمحطة بالمشي.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "بابلو قال Aro وVas bien.", points: 1, skillTag: "المشي" },
  { id: "where-story-q6", type: "multiple-choice", prompt: "شنو قال بابلو ملي وصلات أمينة للسينيال؟", options: ["زيدي شوية القدام", "رجعي للدار", "ركبي الطوبيس"], correctAnswer: "زيدي شوية القدام", explanation: "قال Un poquito más adelante.", points: 1, skillTag: "تكملة الطريق" },
  { id: "where-story-q7", type: "multiple-choice", prompt: "شنو وقع لأمينة من بعد؟", options: ["فاتت الدخلة", "وصلات للجامع", "لقات الطوبيس"], correctAnswer: "فاتت الدخلة", explanation: "بابلو قال Te has pasado.", points: 1, skillTag: "خطأ فالطريق" },
  { id: "where-story-q8", type: "multiple-choice", prompt: "فين كانت المحطة فآخر التعليمات؟", options: ["فآخر الزنقة", "مور الجامع", "حدا دار أمينة"], correctAnswer: "فآخر الزنقة", explanation: "بابلو قال Está al final de la calle.", points: 1, skillTag: "الموقع النهائي" },
  { id: "where-story-q9", type: "multiple-choice", prompt: "على شنو سولات أمينة داخل المحطة؟", options: ["على الحمّام", "على القهوة", "على الصيدلية"], correctAnswer: "على الحمّام", explanation: "فالرسالة 26 سولات ¿Dónde está el baño?", points: 1, skillTag: "مكان داخل المحطة" },
  { id: "where-story-q10", type: "multiple-choice", prompt: "كيفاش سالات المحادثة؟", options: ["أمينة شكرات وبابلو جاوب بلا جميل", "أمينة بقات ضايعة", "بابلو طلب منها الفلوس"], correctAnswer: "أمينة شكرات وبابلو جاوب بلا جميل", explanation: "الرسالة الأخيرة هي De nada. Buen viaje.", points: 1, skillTag: "النهاية" },
];

export const andalusianSpanishA1AskingWhereDarijaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "القصة: أمينة خاصها تلحق القطار",
  subtitle: "أمينة ضايعة فالحومة وبابلو كيوجهها للمحطة قبل ما يفوتها القطار.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "story", "directions"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "darija",
    characters: [
      { id: "amina", name: "Amina", initials: "AM", side: "right", color: "cyan" },
      { id: "pablo", name: "Pablo", initials: "PA", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "amina", "Perdona.", "سمح ليا.", ["Perdona"]),
      message("m2", "amina", "Creo que estoy perdida.", "كنظن راني ضايعة.", []),
      message("m3", "amina", "¿Sabes dónde está la estación?", "واش عارف فين كاينة المحطة؟", ["¿Sabes dónde está la estación?"], "voice-note"),
      message("m4", "pablo", "Aro. ¿Estás cerca de la oficina de información?", "طبعا. واش نتا قريبة من مكتب المعلومات؟", []),
      message("m5", "amina", "Sí, estoy delante de la oficina.", "إييه، راني قدام المكتب.", []),
      message("m6", "pablo", "La estación está cerca, a cinco minutos andando.", "المحطة قريبة، على خمس دقايق بالمشي.", ["Está cerca", "Está a cinco minutos andando"], "voice-note"),
      message("m7", "pablo", "Tira todo recto hasta el semáforo.", "كملي غادية نيشان حتى للسينيال.", ["Tira todo recto", "Sigue recto hasta el semáforo"]),
      message("m8", "amina", "Vale, ya veo el semáforo.", "واخا، دابا بان ليا السينيال.", []),
      message("m9", "pablo", "Allí gira a la derecha y cruza la calle.", "تما دوري على اليمين وقطعي الزنقة.", ["Gira a la derecha", "Cruza la calle"]),
      message("m10", "amina", "¿Hay alguna señal?", "واش كاينة شي علامة؟", []),
      message("m11", "pablo", "Sí. Hay una farmacia en la esquina.", "إييه. كاينة صيدلية فالزاوية.", ["Está en la esquina"]),
      message("m12", "pablo", "La estación está enfrente de la farmacia.", "المحطة مقابلة الصيدلية.", ["Está enfrente de la farmacia"], "voice-note"),
      message("m13", "amina", "¿Se puede ir andando todo el camino?", "واش نقدر نمشي الطريق كاملة على رجلي؟", ["¿Se puede ir andando?"]),
      message("m14", "pablo", "Aro. No tiene pérdida.", "طبعا. سهلة تلقايها.", ["No tiene pérdida"]),
      message("m15", "amina", "Entonces, ¿voy bien para la estación?", "إيوا واش أنا غادية مزيان للمحطة؟", ["¿Voy bien para la estación?"]),
      message("m16", "pablo", "Sí, vas bien. Sigue todo recto.", "إييه، راكي غادية مزيان. بقاي غادية نيشان.", ["Vas bien", "Sigue todo recto"]),
      message("m17", "amina", "Ya estoy en el semáforo.", "دابا راني فالسينيال.", []),
      message("m18", "pablo", "Perfecto. Un poquito más adelante.", "مزيان. زيدي شوية القدام.", ["Un poquito más adelante"], "voice-note"),
      message("m19", "amina", "Ahora veo una tienda, pero no la estación.", "دابا بان ليا حانوت، ولكن ما بانتش المحطة.", ["¿Dónde está la tienda?"]),
      message("m20", "pablo", "¿La tienda está al lado de la farmacia?", "واش الحانوت حدا الصيدلية؟", ["Está al lado de la farmacia"]),
      message("m21", "pablo", "Si la tienda queda detrás, te has pasado.", "إلا بقا الحانوت اللور، راكي فتيها.", ["Te has pasado"]),
      message("m22", "amina", "Uy, sí. ¿Por dónde se va ahora?", "آه، إييه. منين نمشي دابا؟", ["¿Por dónde se va a la estación?"]),
      message("m23", "pablo", "Vuelve a la esquina y gira a la izquierda.", "رجعي للزاوية ودوري على اليسار.", ["Gira a la izquierda"]),
      message("m24", "pablo", "La estación está al final de la calle, ahí mismo.", "المحطة فآخر الزنقة، تما بالضبط.", ["Está al final de la calle", "Está ahí mismo"], "voice-note"),
      message("m25", "amina", "¡Ya la veo! Muchas gracias.", "دابا بانت ليا! شكرا بزاف.", ["Muchas gracias"]),
      message("m26", "amina", "Una cosa más: ¿dónde está el baño?", "حاجة أخرى: فين كاين الحمّام؟", ["¿Dónde está el baño?"]),
      message("m27", "pablo", "Está detrás de la oficina, al lado de la entrada.", "راه مور المكتب، حدا الدخلة.", ["Está detrás de la oficina"]),
      message("m28", "amina", "Perfecto. He llegado a tiempo.", "مزيان. وصلت فالوقت.", []),
      message("m29", "amina", "Muchas gracias por ayudarme.", "شكرا بزاف حيث عاونتيني.", ["Muchas gracias"]),
      message("m30", "pablo", "De nada. Buen viaje.", "بلا جميل. سفر موفق.", ["De nada"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `where-story-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: directionsVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["¿Dónde está la estación?", "¿Está lejos?", "Tira todo recto", "Gira a la derecha", "¿Voy bien para la estación?"],
      grammarPatterns: ["¿Dónde está + مكان?", "Está + تحديد المكان", "فعل الأمر + الاتجاه"],
      speakingPrompts: ["سول على المحطة.", "عطي طريق فيه نيشان واليمين.", "حدد المكان باستعمال الصيدلية كعلامة."],
    },
    completionTask: { title: "سول وعطي الطريق", instructions: "سجّل 45 ثانية بالإسبانية: سول على المحطة، ومن بعد جاوب بتعليمات فيها نيشان، السينيال، اليمين والصيدلية." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Amina tiene que coger un tren, pero no conoce bien el barrio. Se acerca a Pablo y dice: “Perdona, ¿sabes dónde está la estación?”.", translation: "أمينة خاصها تشد القطار ولكن ما عارفاش الحومة مزيان. قربات لبابلو وسولاتو بأدب واش عارف فين كاينة المحطة.", highlights: highlights(["Perdona", "¿Sabes dónde está la estación?"]), shadowLine: "Perdona, ¿sabes dónde está la estación?" },
  { id: "p2", text: "Pablo le explica que la estación “está cerca” y “está a cinco minutos andando”. Amina pregunta: “¿Se puede ir andando?”, y él confirma que sí.", translation: "بابلو شرح ليها بلي المحطة قريبة وعلى خمس دقايق بالمشي. أمينة سولات واش تقدر تمشي ليها على رجليها وهو أكد ليها.", highlights: highlights(["Está cerca", "Está a cinco minutos andando", "¿Se puede ir andando?"]), shadowLine: "Está cerca, a cinco minutos andando." },
  { id: "p3", text: "La primera instrucción es: “Tira todo recto hasta el semáforo”. Después, Amina tiene que “girar a la derecha” y “cruzar la calle”.", translation: "أول تعليمات هي تكمل نيشان حتى للسينيال. من بعد خاص أمينة تدور على اليمين وتقطع الزنقة.", highlights: highlights(["Tira todo recto", "Sigue recto hasta el semáforo", "Gira a la derecha", "Cruza la calle"]), shadowLine: "Tira todo recto, gira a la derecha y cruza la calle." },
  { id: "p4", text: "Pablo usa una farmacia como referencia. Dice: “La farmacia está en la esquina” y “la estación está enfrente de la farmacia”. Así, Amina sabe qué edificio debe buscar.", translation: "بابلو استعمل الصيدلية كعلامة. قال الصيدلية فالزاوية والمحطة مقابلة ليها. هكا أمينة عرفت شنو خاصها تقلب عليه.", highlights: highlights(["Está en la esquina", "Está enfrente de la farmacia"]), shadowLine: "La estación está enfrente de la farmacia." },
  { id: "p5", text: "Amina quiere comprobar la ruta y pregunta: “¿Voy bien para la estación?”. Pablo responde: “Vas bien. Sigue todo recto. No tiene pérdida”.", translation: "أمينة بغات تتأكد من الطريق وسولات واش غادية مزيان للمحطة. بابلو قال ليها راكي غادية مزيان وبقاي نيشان والطريق سهلة.", highlights: highlights(["¿Voy bien para la estación?", "Vas bien", "Sigue todo recto", "No tiene pérdida"]), shadowLine: "¿Voy bien para la estación? Sí, vas bien." },
  { id: "p6", text: "Al llegar al semáforo, Pablo le dice: “Un poquito más adelante”. Sin embargo, Amina camina demasiado y él tiene que avisarle: “Te has pasado”.", translation: "ملي وصلات للسينيال، بابلو قال ليها تزيد شوية القدام. ولكن أمينة زادت بزاف واضطر يقول ليها راكي فتيها.", highlights: highlights(["Un poquito más adelante", "Te has pasado"]), shadowLine: "Un poquito más adelante. Te has pasado." },
  { id: "p7", text: "Para corregir el camino, Amina vuelve a la esquina y gira a la izquierda. Pablo aclara: “La estación está al final de la calle. Está ahí mismo”.", translation: "باش تصلح الطريق، أمينة رجعات للزاوية ودارت على اليسار. بابلو وضح ليها بلي المحطة فآخر الزنقة وتما بالضبط.", highlights: highlights(["Gira a la izquierda", "Está al final de la calle", "Está ahí mismo"]), shadowLine: "La estación está al final de la calle. Está ahí mismo." },
  { id: "p8", text: "Amina llega a tiempo y pregunta también: “¿Dónde está el baño?”. El baño está detrás de la oficina. Ella termina con “Muchas gracias”, y Pablo responde: “De nada”.", translation: "أمينة وصلات فالوقت وسولات حتى على الحمّام. الحمّام مور المكتب. هي سالات بالشكر وبابلو جاوب بلا جميل.", highlights: highlights(["¿Dónde está el baño?", "Está detrás de la oficina", "Muchas gracias", "De nada"]), shadowLine: "¿Dónde está el baño? Está detrás de la oficina." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "where-reading-q1", type: "multiple-choice", prompt: "علاش كانت أمينة كتقلب على المحطة؟", options: ["خاصها تشد القطار", "بغات تشري الدوا", "بغات تشرب القهوة"], correctAnswer: "خاصها تشد القطار", explanation: "هاد السبب مذكور فالفقرة اللولة.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "where-reading-q2", type: "true-false", prompt: "صح ولا خطأ: المحطة على خمس دقايق بالمشي.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "بابلو قال Está a cinco minutos andando.", points: 1, skillTag: "المسافة" },
  { id: "where-reading-q3", type: "multiple-choice", prompt: "شنو كانت العلامة المهمة فالطريق؟", options: ["الصيدلية", "المطار", "الشاطئ"], correctAnswer: "الصيدلية", explanation: "المحطة مقابلة الصيدلية.", points: 1, skillTag: "العلامة" },
  { id: "where-reading-q4", type: "multiple-choice", prompt: "شنو الغلط اللي دارت أمينة؟", options: ["فاتت المكان", "دارت على اليمين بكري", "ركبات الطوبيس"], correctAnswer: "فاتت المكان", explanation: "بابلو قال ليها Te has pasado.", points: 1, skillTag: "تسلسل الأحداث" },
  { id: "where-reading-q5", type: "multiple-choice", prompt: "فين كان الحمّام؟", options: ["مور المكتب", "مقابل الصيدلية", "فآخر الزنقة"], correctAnswer: "مور المكتب", explanation: "النص كيقول Está detrás de la oficina.", points: 1, skillTag: "تحديد المكان" },
];

export const andalusianSpanishA1AskingWhereDarijaReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "القراءة بالصوت: الطريق للمحطة",
  subtitle: "سمع وتبع الكلمات المضيئة فشرح واضح للطريق بالإسبانية الأندلسية.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "reading", "directions"],
  estimatedMinutes: 14,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: directionsVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "ربط كل عبارة إسبانية بالمعنى الصحيح ديالها بالدارجة.", points: items.length, skillTag: "ربط العبارات" };
}

export const andalusianSpanishA1AskingWhereDarijaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "الكويز النهائي: السؤال على المكان والاتجاهات",
  subtitle: "اختار العبارة الصحيحة باش تسول على البلايص وتفهم الطريق فمواقف جديدة.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "quiz", "directions"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "هاد الكويز كيشوف واش تقدر تسول على بلاصة، تفهم الاتجاهات وتتأكد من الطريق بلا ما يعتمد على قصة أمينة.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "where-quiz-1", type: "multiple-choice", prompt: "بغيتي توقف شي واحد بأدب قبل السؤال. شنو تقول؟", options: ["Perdona", "Por ahí", "Vas bien", "De nada"], correctAnswer: "Perdona", explanation: "Perdona كتفتح السؤال بأدب.", points: 1, skillTag: "الأدب" },
      { id: "where-quiz-2", type: "multiple-choice", prompt: "بغيتي تعرف فين كاينة الصيدلية. شنو تسول؟", options: ["¿Dónde está la farmacia?", "¿Está lejos?", "¿Se puede ir andando?", "¿Algo más?"], correctAnswer: "¿Dónde está la farmacia?", explanation: "¿Dónde está...? هو السؤال المباشر على المكان.", points: 1, skillTag: "السؤال على المكان" },
      { id: "where-quiz-3", type: "order-words", prompt: "رتّب: واش عارف فين كاينة المحطة؟", wordBank: ["¿Sabes", "dónde", "está", "la", "estación?"], correctAnswer: "¿Sabes dónde está la estación?", explanation: "من بعد ¿Sabes? كتجي الجملة dónde está la estación.", points: 1, skillTag: "بناء السؤال" },
      { id: "where-quiz-4", type: "true-false", prompt: "صح ولا خطأ: “Está cerquita” كتعني راه بعيدة.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "cerquita كتعني قريبة بزاف.", points: 1, skillTag: "القرب" },
      { id: "where-quiz-5", type: "multiple-choice", prompt: "خاص الشخص يكمل نيشان حتى للسينيال. شنو تقول؟", options: ["Sigue recto hasta el semáforo", "Gira a la izquierda", "Te has pasado", "Está en la esquina"], correctAnswer: "Sigue recto hasta el semáforo", explanation: "هاد العبارة كتعطي الاتجاه والنقطة اللي يوصل ليها.", points: 1, skillTag: "التعليمات" },
      { id: "where-quiz-6", type: "fill-blank", prompt: "كمّل: Gira a la ______.", nativePrompt: "دور على اليمين", correctAnswer: "derecha", explanation: "derecha هي اليمين.", points: 1, skillTag: "الاتجاهات" },
      { id: "where-quiz-7", type: "multiple-choice", prompt: "المكان مقابل الصيدلية. شنو تقول؟", options: ["Está enfrente de la farmacia", "Está detrás de la oficina", "Está al final de la calle", "Está aquí al lao"], correctAnswer: "Está enfrente de la farmacia", explanation: "enfrente de كتعني مقابل.", points: 1, skillTag: "تحديد المكان" },
      { id: "where-quiz-8", type: "multiple-choice", prompt: "بغيتي تعرف واش تقدر توصل بالمشي. شنو تسول؟", options: ["¿Se puede ir andando?", "¿Voy bien?", "¿Está ahí mismo?", "¿Dónde está la tienda?"], correctAnswer: "¿Se puede ir andando?", explanation: "هاد السؤال كيتأكد واش المشي ممكن ومناسب.", points: 1, skillTag: "المسافة" },
      { id: "where-quiz-9", type: "true-false", prompt: "صح ولا خطأ: “Te has pasado” كتقال ملي الشخص فات المكان.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "كتعني راك دزتي من المكان.", points: 1, skillTag: "تصحيح الطريق" },
      { id: "where-quiz-10", type: "multiple-choice", prompt: "شخص سولك واش ماشي مزيان للمحطة وهو فالطريق الصحيح. شنو تجاوب؟", options: ["Vas bien", "Por ahí no", "Te has pasado", "Está lejos"], correctAnswer: "Vas bien", explanation: "كتأكد ليه بلي راه فالطريق الصحيح.", points: 1, skillTag: "التأكيد" },
      pairQuestion("where-quiz-11", "ربط أسئلة البلايص بالمعاني ديالها.", [directionsVocab[1], directionsVocab[4], directionsVocab[5], directionsVocab[8]]),
      pairQuestion("where-quiz-12", "ربط الاتجاهات بالمعاني ديالها.", [directionsVocab[15], directionsVocab[17], directionsVocab[18], directionsVocab[19]]),
      pairQuestion("where-quiz-13", "ربط تحديد المكان والتأكد من الطريق بالمعاني ديالها.", [directionsVocab[20], directionsVocab[23], directionsVocab[29], directionsVocab[38]]),
    ],
  },
};
