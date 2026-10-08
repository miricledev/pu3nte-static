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

const courseId = "andalusian-spanish-a1-airport-arrival-darija";
const sectionName = "الإسبانية الأندلسية A1 - الوصول للمطار";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const airportVocab: VocabItem[] = [
  { id: "buenas", term: "Buenas", meaning: "سلام / أهلا", note: "تحية قصيرة وطبيعية ملي كتدخل لشي بلاصة ولا كتهضر مع شي واحد.", example: "Buenas, ¿todo bien?", translation: "سلام، كلشي مزيان؟", starred: true },
  { id: "todo-bien", term: "¿Todo bien?", meaning: "كلشي مزيان؟", note: "سؤال بسيط باش تطمّن على شي واحد.", example: "Buenas, ¿todo bien?", translation: "سلام، كلشي مزيان؟", starred: true },
  { id: "acabo-llegar", term: "Acabo de llegar", meaning: "دابا غير وصلت", note: "كتستعملها مباشرة من بعد الوصول.", example: "Acabo de llegar al aeropuerto.", translation: "دابا غير وصلت للمطار.", starred: true },
  { id: "soy-marruecos", term: "Soy de Marruecos", meaning: "أنا من المغرب", note: "كتقول الأصل ديالك باستعمال soy de.", example: "Soy de Marruecos.", translation: "أنا من المغرب.", starred: true },
  { id: "vengo-marruecos", term: "Vengo de Marruecos", meaning: "جيت من المغرب", note: "كتقول منين جيتي فهاد الرحلة.", example: "Vengo de Marruecos y acabo de llegar.", translation: "جيت من المغرب ودابا غير وصلت.", starred: true },
  { id: "echas-mano", term: "¿Me echas una mano?", meaning: "تقدر تعاونّي؟", note: "طريقة ودّية وطبيعية باش تطلب المساعدة.", example: "Perdona, ¿me echas una mano?", translation: "سمح ليا، تقدر تعاونّي؟", starred: true },
  { id: "necesito-ayuda", term: "Necesito ayuda", meaning: "خاصني المساعدة", note: "جملة مباشرة إلى كنت محتاج المساعدة.", example: "Necesito ayuda con mi maleta.", translation: "خاصني المساعدة مع الماليتة ديالي.", starred: true },
  { id: "no-entiendo", term: "No entiendo bien", meaning: "ما كنفهمش مزيان", note: "كتوضح بأدب بلي ما فهمتيش كلشي.", example: "Perdona, no entiendo bien.", translation: "سمح ليا، ما كنفهمش مزيان.", starred: true },
  { id: "mas-despacio", term: "Más despacio, por favor", meaning: "بشوية عافاك", note: "باش تطلب من الشخص يهضر بشوية.", example: "Más despacio, por favor. No entiendo bien.", translation: "بشوية عافاك. ما كنفهمش مزيان.", starred: true },
  { id: "me-lo-repites", term: "¿Me lo repites?", meaning: "تقدر تعاودها ليا؟", note: "كتطلب إعادة الكلام.", example: "Perdona, ¿me lo repites?", translation: "سمح ليا، تقدر تعاودها ليا؟", starred: true },
  { id: "no-pasa-na", term: "No pasa ná", meaning: "ما كاين باس", note: "نطق أندلسي دارج لـ no pasa nada.", example: "No pasa ná, te lo repito.", translation: "ما كاين باس، نعاودها ليك.", starred: true },
  { id: "donde-salida", term: "¿Dónde está la salida?", meaning: "فين كاينة الخرجة؟", note: "سؤال مباشر على باب الخروج.", example: "¿Dónde está la salida, por favor?", translation: "فين كاينة الخرجة، عافاك؟", starred: true },
  { id: "por-donde-sale", term: "¿Por dónde se sale?", meaning: "منين كنخرجو؟", note: "طريقة طبيعية أخرى باش تسول على طريق الخروج.", example: "Perdona, ¿por dónde se sale?", translation: "سمح ليا، منين كنخرجو؟", starred: true },
  { id: "por-aqui", term: "Por aquí", meaning: "من هنا", note: "جواب قصير كيبين الطريق.", example: "La salida está por aquí.", translation: "الخرجة من هنا.", starred: true },
  { id: "todo-recto", term: "Tira todo recto", meaning: "سير نيشان", note: "تعبير دارج فالأندلس بمعنى كمّل نيشان.", example: "Tira todo recto hasta la salida.", translation: "سير نيشان حتى للخرجة.", starred: true },
  { id: "derecha", term: "A la derecha", meaning: "لليمين", note: "باش تعطي الاتجاه لليمين.", example: "Los taxis están a la derecha.", translation: "الطاكسيات كاينين لليمين.", starred: true },
  { id: "izquierda", term: "A la izquierda", meaning: "لليسار", note: "باش تعطي الاتجاه لليسار.", example: "La parada está a la izquierda.", translation: "المحطة كاينة لليسار.", starred: true },
  { id: "al-lao", term: "Está aquí al lao", meaning: "راه هنا حدّاك", note: "نطق أندلسي دارج لـ está aquí al lado.", example: "La salida está aquí al lao.", translation: "الخرجة راه هنا حدّاك.", starred: true },
  { id: "sin-perdida", term: "No tiene pérdida", meaning: "ما تقدرش تضيع / راه سهلة تلقاها", note: "كتعني الطريق واضحة وسهلة.", example: "Tira todo recto. No tiene pérdida.", translation: "سير نيشان. راه سهلة تلقاها.", starred: true },
  { id: "donde-taxis", term: "¿Dónde están los taxis?", meaning: "فين كاينين الطاكسيات؟", note: "سؤال على بلاصة الطاكسيات.", example: "¿Dónde están los taxis, por favor?", translation: "فين كاينين الطاكسيات، عافاك؟", starred: true },
  { id: "donde-parada", term: "¿Dónde está la parada?", meaning: "فين كاينة المحطة؟", note: "كتسول على محطة الطوبيس.", example: "¿Dónde está la parada para el centro?", translation: "فين كاينة المحطة ديال الوسط؟", starred: true },
  { id: "va-pal-centro", term: "¿Esto va pa’l centro?", meaning: "واش هادا غادي للوسط؟", note: "pa’l هي para el فالنطق الدارج.", example: "Perdona, ¿esto va pa’l centro?", translation: "سمح ليا، واش هادا غادي للوسط؟", starred: true },
  { id: "voy-pal-centro", term: "Voy pa’l centro", meaning: "أنا غادي للوسط", note: "كتقول الوجهة ديالك بطريقة دارجة.", example: "Voy pa’l centro de Málaga.", translation: "أنا غادي لوسط مالقة.", starred: true },
  { id: "cerquita", term: "Está cerquita", meaning: "راه قريب بزاف", note: "تصغير حميمي وطبيعي ديال cerca.", example: "La parada está cerquita.", translation: "المحطة راه قريبة بزاف.", starred: true },
  { id: "que-va", term: "Qué va", meaning: "لا لا / بالعكس / ماشي هكا", note: "رد دارج كينفي فكرة ولا كيصححها.", example: "¿Está lejos? Qué va, está cerquita.", translation: "واش بعيدة؟ لا لا، راه قريبة بزاف.", starred: true },
  { id: "recojo-maleta", term: "¿Dónde recojo la maleta?", meaning: "فين ناخد الماليتة ديالي؟", note: "كتسول على استلام الأمتعة.", example: "¿Dónde recojo la maleta del vuelo de Tánger?", translation: "فين ناخد الماليتة ديال الرحلة من طنجة؟", starred: true },
  { id: "tengo-maleta", term: "Tengo una maleta", meaning: "عندي ماليتة وحدة", note: "كتوضح شحال من ماليتة عندك.", example: "Tengo una maleta azul.", translation: "عندي ماليتة زرقا وحدة.", starred: true },
  { id: "control-pasaportes", term: "¿Dónde está el control de pasaportes?", meaning: "فين كاين كونطرول ديال الباسبور؟", note: "سؤال أساسي من بعد الوصول الدولي.", example: "¿Dónde está el control de pasaportes?", translation: "فين كاين كونطرول ديال الباسبور؟", starred: true },
  { id: "aduana", term: "¿Dónde está la aduana?", meaning: "فين كاينة الديوانة؟", note: "كتسول على الديوانة.", example: "Después de la maleta, ¿dónde está la aduana?", translation: "من بعد الماليتة، فين كاينة الديوانة؟", starred: true },
  { id: "donde-ir", term: "¿Dónde tengo que ir?", meaning: "فين خاصني نمشي؟", note: "سؤال عام إلى ما عرفتيش المرحلة الجاية.", example: "Tengo una maleta. ¿Dónde tengo que ir?", translation: "عندي ماليتة وحدة. فين خاصني نمشي؟", starred: true },
  { id: "muchas-gracias", term: "Muchas gracias", meaning: "شكرا بزاف", note: "شكر واضح ومهذب.", example: "Muchas gracias por la ayuda.", translation: "شكرا بزاف على المساعدة.", starred: true },
  { id: "de-na-mi-arma", term: "De ná, mi arma", meaning: "على والو، آ الحبيب / آ العزيز", note: "رد أندلسي دافئ؛ mi arma كتجي من mi alma فالنطق الشعبي.", example: "De ná, mi arma. Buen viaje.", translation: "على والو آ العزيز. رحلة موفقة.", starred: true },
  { id: "aro", term: "Aro", meaning: "طبعا / أكيد", note: "نطق أندلسي دارج لكلمة claro.", example: "¿Me echas una mano? Aro.", translation: "تقدر تعاونّي؟ طبعا.", starred: true },
];

const highlightMap = Object.fromEntries(airportVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const storyAudioBase = `/audio/stories/${courseId}`;

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
    acceptedAnswers: item.meaning.split("/").map((answer) => answer.trim()),
    languageFrom: "spanish",
    languageTo: "mixed",
    difficulty: item.starred ? "medium" : "easy",
    notes: item.note,
    starred: item.starred,
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

export const andalusianSpanishA1AirportArrivalDarijaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "بطاقات A1: الوصول لمطار مالقة",
  subtitle: "راجع العبارات الإسبانية الأندلسية ديال الوصول، الماليتة، الاتجاهات والنقل، مع المعنى بالدارجة.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "airport", "Málaga"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  activityType: "flashcards",
  data: { cards: airportVocab.map(cardFromVocab), specialCharacters },
};

const sentenceStages: SentenceStage[] = [
  {
    id: "stage-1", title: "التحية والوصول", newVocab: ["Buenas = سلام", "Acabo de llegar = دابا غير وصلت", "¿Todo bien? = كلشي مزيان؟"], fullVocab: ["Buenas", "¿Todo bien?", "Acabo de llegar"],
    prompt: "قول بالإسبانية: سلام، كلشي مزيان؟ دابا غير وصلت.", targetAnswer: "Buenas, ¿todo bien? Acabo de llegar.", acceptedAnswers: ["Buenas. ¿Todo bien? Acabo de llegar."], explanation: "بدا بتحية قصيرة، سول واش كلشي مزيان، ومن بعد قول بلي دابا غير وصلتي.", audioUrl: `/audio/sentence-builder/${courseId}/stage-1.mp3`, wordBreakdown: [{ source: "Buenas", target: "سلام" }, { source: "¿Todo bien?", target: "كلشي مزيان؟" }, { source: "Acabo de llegar", target: "دابا غير وصلت" }],
  },
  {
    id: "stage-2", title: "منين جيتي", newVocab: ["Soy de Marruecos = أنا من المغرب", "Vengo de Marruecos = جيت من المغرب"], fullVocab: ["Buenas", "Acabo de llegar", "Soy de Marruecos", "Vengo de Marruecos"],
    prompt: "قول: أنا من المغرب وجيت من المغرب.", targetAnswer: "Soy de Marruecos y vengo de Marruecos.", acceptedAnswers: ["Soy de Marruecos. Vengo de Marruecos."], explanation: "soy de كتقول الأصل، وvengo de كتقول منين جيتي فهاد الرحلة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-2.mp3`, wordBreakdown: [{ source: "Soy de", target: "أنا من" }, { source: "Vengo de", target: "جيت من" }, { source: "Marruecos", target: "المغرب" }],
  },
  {
    id: "stage-3", title: "طلب المساعدة", newVocab: ["¿Me echas una mano? = تقدر تعاونّي؟", "Necesito ayuda = خاصني المساعدة"], fullVocab: ["¿Me echas una mano?", "Necesito ayuda", "Tengo una maleta"],
    prompt: "قول: سمح ليا، تقدر تعاونّي؟ خاصني المساعدة مع الماليتة ديالي.", targetAnswer: "Perdona, ¿me echas una mano? Necesito ayuda con mi maleta.", acceptedAnswers: ["¿Me echas una mano? Necesito ayuda con mi maleta."], explanation: "¿Me echas una mano? ودّية، وNecesito ayuda واضحة ومباشرة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-3.mp3`, wordBreakdown: [{ source: "Perdona", target: "سمح ليا" }, { source: "¿me echas una mano?", target: "تقدر تعاونّي؟" }, { source: "con mi maleta", target: "مع الماليتة ديالي" }],
  },
  {
    id: "stage-4", title: "إلى ما فهمتيش", newVocab: ["No entiendo bien = ما كنفهمش مزيان", "Más despacio, por favor = بشوية عافاك", "¿Me lo repites? = تقدر تعاودها ليا؟"], fullVocab: ["No entiendo bien", "Más despacio, por favor", "¿Me lo repites?", "No pasa ná"],
    prompt: "قول: ما كنفهمش مزيان. بشوية عافاك. تقدر تعاودها ليا؟", targetAnswer: "No entiendo bien. Más despacio, por favor. ¿Me lo repites?", acceptedAnswers: ["No entiendo bien, más despacio, por favor. ¿Me lo repites?"], explanation: "هاد الثلاثة كيعاونوك توقف السرعة وتطلب الإعادة بلا توتر.", audioUrl: `/audio/sentence-builder/${courseId}/stage-4.mp3`, wordBreakdown: [{ source: "No entiendo bien", target: "ما كنفهمش مزيان" }, { source: "Más despacio", target: "بشوية" }, { source: "¿Me lo repites?", target: "تقدر تعاودها ليا؟" }],
  },
  {
    id: "stage-5", title: "الماليتة والباسبور", newVocab: ["¿Dónde recojo la maleta? = فين ناخد الماليتة؟", "¿Dónde está el control de pasaportes? = فين كونطرول الباسبور؟", "¿Dónde está la aduana? = فين الديوانة؟"], fullVocab: ["Tengo una maleta", "¿Dónde recojo la maleta?", "¿Dónde está el control de pasaportes?", "¿Dónde está la aduana?"],
    prompt: "قول: عندي ماليتة وحدة. فين ناخدها وفين كاينة الديوانة؟", targetAnswer: "Tengo una maleta. ¿Dónde recojo la maleta y dónde está la aduana?", acceptedAnswers: ["Tengo una maleta. ¿Dónde recojo la maleta? ¿Dónde está la aduana?"], explanation: "كتستعمل recojo باش تسول فين غادي تستلم الماليتة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-5.mp3`, wordBreakdown: [{ source: "Tengo", target: "عندي" }, { source: "¿Dónde recojo...?", target: "فين ناخد...؟" }, { source: "la aduana", target: "الديوانة" }],
  },
  {
    id: "stage-6", title: "الاتجاهات", newVocab: ["Tira todo recto = سير نيشان", "A la derecha = لليمين", "Está aquí al lao = راه هنا حدّاك", "No tiene pérdida = راه سهلة تلقاها"], fullVocab: ["Por aquí", "Tira todo recto", "A la derecha", "A la izquierda", "Está aquí al lao", "No tiene pérdida"],
    prompt: "قول: سير نيشان ومن بعد لليمين. راه هنا حدّاك وسهلة تلقاها.", targetAnswer: "Tira todo recto y después a la derecha. Está aquí al lao y no tiene pérdida.", acceptedAnswers: ["Tira todo recto. Después, a la derecha. Está aquí al lao. No tiene pérdida."], explanation: "جمع الاتجاه مع تطمين بسيط باش تكون التعليمات واضحة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-6.mp3`, wordBreakdown: [{ source: "todo recto", target: "نيشان" }, { source: "a la derecha", target: "لليمين" }, { source: "al lao", target: "حدّاك" }],
  },
  {
    id: "stage-7", title: "النقل للوسط", newVocab: ["¿Dónde está la parada? = فين المحطة؟", "¿Esto va pa’l centro? = واش هادا غادي للوسط؟", "Voy pa’l centro = أنا غادي للوسط", "Está cerquita = راه قريب بزاف"], fullVocab: ["¿Dónde están los taxis?", "¿Dónde está la parada?", "¿Esto va pa’l centro?", "Voy pa’l centro", "Está cerquita", "Qué va"],
    prompt: "قول: فين كاينة المحطة؟ واش هادا غادي للوسط؟ أنا غادي للوسط.", targetAnswer: "¿Dónde está la parada? ¿Esto va pa’l centro? Voy pa’l centro.", acceptedAnswers: ["¿Dónde está la parada para el centro? Voy pa’l centro."], explanation: "pa’l هي الطريقة الدارجة فالنطق ديال para el.", audioUrl: `/audio/sentence-builder/${courseId}/stage-7.mp3`, wordBreakdown: [{ source: "la parada", target: "المحطة" }, { source: "va pa’l centro", target: "غادي للوسط" }, { source: "Voy pa’l centro", target: "أنا غادي للوسط" }],
  },
  {
    id: "stage-8", title: "الموقف كامل", newVocab: ["¿Dónde tengo que ir? = فين خاصني نمشي؟", "Muchas gracias = شكرا بزاف", "De ná, mi arma = على والو آ العزيز", "Aro = طبعا"], fullVocab: airportVocab.map((item) => `${item.term} = ${item.meaning}`),
    prompt: "قول: دابا غير وصلت من المغرب وما كنفهمش مزيان. تقدر تعاونّي؟ فين خاصني نمشي باش ناخد الماليتة ومن بعد نمشي للوسط؟", targetAnswer: "Acabo de llegar de Marruecos y no entiendo bien. ¿Me echas una mano? ¿Dónde tengo que ir para recoger la maleta y después ir pa’l centro?", acceptedAnswers: ["Acabo de llegar de Marruecos. No entiendo bien. ¿Me echas una mano? ¿Dónde recojo la maleta y cómo voy pa’l centro?"], explanation: "هاد الجملة كتجمع الوصول، المشكل، طلب المساعدة، الماليتة والوجهة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-8.mp3`, wordBreakdown: [{ source: "Acabo de llegar", target: "دابا غير وصلت" }, { source: "¿Me echas una mano?", target: "تقدر تعاونّي؟" }, { source: "¿Dónde tengo que ir?", target: "فين خاصني نمشي؟" }, { source: "ir pa’l centro", target: "نمشي للوسط" }],
  },
];

export const andalusianSpanishA1AirportArrivalDarijaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "بنّي الجمل: من الطيارة حتى لوسط مالقة",
  subtitle: "ركّب جمل قصيرة ومفيدة باش تطلب المساعدة، تلقى الماليتة وتوصل للوسط.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "sentence builder", "airport"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "sentence-builder",
  data: { stages: sentenceStages, finalChallenge: "قول بلا ما تشوف: دابا غير وصلتي من المغرب، ما فهمتيش مزيان، بغيتي الماليتة ومن بعد بغيتي تمشي للوسط." },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "airport-story-q1", type: "multiple-choice", prompt: "فين وصل ياسين؟", options: ["لمطار مالقة", "لمحطة القطار", "للفندق"], correctAnswer: "لمطار مالقة", explanation: "فأول ثلاث رسائل قال بلي دابا غير وصل للمطار.", points: 1, skillTag: "بداية القصة" },
  { id: "airport-story-q2", type: "true-false", prompt: "صح ولا خطأ: ياسين فهم كلام الموظفة مزيان من المرة اللولة.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "قال: No entiendo bien وطلب منها تهضر بشوية وتعاود.", points: 1, skillTag: "طلب الإعادة" },
  { id: "airport-story-q3", type: "multiple-choice", prompt: "شنو كيقلب عليه ياسين دابا؟", options: ["الماليتة ديالو", "شي مطعم", "التذكرة"], correctAnswer: "الماليتة ديالو", explanation: "حتى للرسالة 9 كان كيسول فين ياخد الماليتة.", points: 1, skillTag: "الأمتعة" },
  { id: "airport-story-q4", type: "multiple-choice", prompt: "فين كانت الماليتة الزرقا؟", options: ["فالسير رقم جوج", "حدّ الطاكسيات", "فالطوبيس"], correctAnswer: "فالسير رقم جوج", explanation: "الموظف قال ليه باللي الماليتة فالجهة اليسرى فالسير رقم جوج.", points: 1, skillTag: "التفاصيل" },
  { id: "airport-story-q5", type: "true-false", prompt: "صح ولا خطأ: ياسين لقا الماليتة قبل الرسالة 15.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "فالرسالة 15 قال: Ya tengo la maleta.", points: 1, skillTag: "تسلسل الأحداث" },
  { id: "airport-story-q6", type: "multiple-choice", prompt: "من بعد الماليتة، فين بغا يمشي ياسين؟", options: ["للخرجة", "للطائرة", "للمطعم"], correctAnswer: "للخرجة", explanation: "سول على الخرجة وخذا الاتجاه: نيشان ومن بعد لليمين.", points: 1, skillTag: "الاتجاهات" },
  { id: "airport-story-q7", type: "multiple-choice", prompt: "شنو اختار ياسين باش يمشي للوسط؟", options: ["الطوبيس", "الطاكسي", "يمشي على رجليه"], correctAnswer: "الطوبيس", explanation: "قال غادي يجرب الطوبيس حيث المحطة قريبة.", points: 1, skillTag: "النقل" },
  { id: "airport-story-q8", type: "multiple-choice", prompt: "شنو سَوّل ياسين للشيفور؟", options: ["واش هاد الطوبيس غادي للوسط", "واش يقدر يبدّل الماليتة", "واش المطار غادي يسد"], correctAnswer: "واش هاد الطوبيس غادي للوسط", explanation: "فالرسالة 24 سَوّل: ¿Esto va pa’l centro? الجواب ديال الشيفور غادي يبان من بعد.", points: 1, skillTag: "سؤال الوجهة" },
  { id: "airport-story-q9", type: "multiple-choice", prompt: "شنو طلبات سلمى من ياسين يدير؟", options: ["يقول ليها ملي يركب", "يرجع للمطار", "يبدّل الماليتة"], correctAnswer: "يقول ليها ملي يركب", explanation: "قالت ليه يصيفط ليها خبر ملي يركب الطوبيس.", points: 1, skillTag: "الخطة" },
  { id: "airport-story-q10", type: "multiple-choice", prompt: "كيفاش سالات القصة؟", options: ["ياسين ركب وسلمى غادي تستناه فالوسط", "ضاع الباسبور", "رجع ياسين للمغرب"], correctAnswer: "ياسين ركب وسلمى غادي تستناه فالوسط", explanation: "فالرسائل الأخيرة ركب الطوبيس وشكر الناس وسلمى قالت غادي تستناه فالوسط.", points: 1, skillTag: "نهاية القصة" },
];

export const andalusianSpanishA1AirportArrivalDarijaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "القصة: الماليتة الزرقا فين مشات؟",
  subtitle: "ياسين وصل لمطار مالقة، ولكن خاصو يلقى الماليتة ويعرف كيفاش يوصل للوسط.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "story", "airport"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "darija",
    characters: [{ id: "yassine", name: "Yassine", initials: "YA", side: "right", color: "cyan" }, { id: "salma", name: "Salma", initials: "SA", side: "left", color: "violet" }],
    messages: [
      message("m1", "yassine", "Buenas, Salma. ¿Todo bien?", "سلام سلمى، كلشي مزيان؟", ["Buenas", "¿Todo bien?"]),
      message("m2", "salma", "¡Yassine! Todo bien. ¿Ya estás en Málaga?", "ياسين! كلشي مزيان. واش وصلتي لمالقة؟", []),
      message("m3", "yassine", "Sí, acabo de llegar. Vengo de Marruecos.", "إييه، دابا غير وصلت. جيت من المغرب.", ["Acabo de llegar", "Vengo de Marruecos"], "voice-note"),
      message("m4", "salma", "Perfecto. Primero, el control de pasaportes.", "مزيان. اللول كونطرول ديال الباسبور.", ["¿Dónde está el control de pasaportes?"]),
      message("m5", "yassine", "Una mujer habla muy rápido. No entiendo bien.", "واحد السيدة كتهضر بزربة. ما كنفهمش مزيان.", ["No entiendo bien"]),
      message("m6", "yassine", "Le digo: “Más despacio, por favor. ¿Me lo repites?”", "غادي نقول ليها: بشوية عافاك. تقدر تعاودها ليا؟", ["Más despacio, por favor", "¿Me lo repites?"], "voice-note"),
      message("m7", "salma", "Muy bien. Seguro que te dice: “No pasa ná”.", "مزيان بزاف. أكيد غادي تقول ليك: ما كاين باس.", ["No pasa ná"]),
      message("m8", "yassine", "Ya está. Ahora tengo una pregunta: ¿dónde recojo la maleta?", "صافي. دابا عندي سؤال: فين ناخد الماليتة ديالي؟", ["¿Dónde recojo la maleta?"]),
      message("m9", "salma", "Pregunta también: “¿Dónde tengo que ir?”", "سول حتى: فين خاصني نمشي؟", ["¿Dónde tengo que ir?"]),
      message("m10", "yassine", "He preguntado. Tengo una maleta azul.", "سولت. عندي ماليتة زرقا وحدة.", ["Tengo una maleta"]),
      message("m11", "salma", "¿Y qué te dicen?", "وشنو قالو ليك؟", []),
      message("m12", "yassine", "“Por aquí, a la izquierda. Cinta número dos.”", "من هنا، لليسار. السير رقم جوج.", ["Por aquí", "A la izquierda"], "voice-note"),
      message("m13", "salma", "Perfecto. ¿Ves tu maleta?", "مزيان. واش شفتي الماليتة ديالك؟", []),
      message("m14", "yassine", "Un momento... Hay muchas maletas negras.", "تسنا شوية... كاينين بزاف ديال الماليتات كحلين.", []),
      message("m15", "yassine", "¡Ya está! Ya tengo la maleta azul.", "ها هي! دابا عندي الماليتة الزرقا.", ["Tengo una maleta"]),
      message("m16", "salma", "¡Bien! Ahora la aduana y después la salida.", "مزيان! دابا الديوانة ومن بعد الخرجة.", ["¿Dónde está la aduana?", "¿Dónde está la salida?"]),
      message("m17", "yassine", "¿Por dónde se sale? No veo la salida.", "منين كنخرجو؟ ما شايفش الخرجة.", ["¿Por dónde se sale?", "¿Dónde está la salida?"]),
      message("m18", "salma", "Pregunta y escucha: “Tira todo recto y después a la derecha”.", "سول وسمع: سير نيشان ومن بعد لليمين.", ["Tira todo recto", "A la derecha"], "voice-note"),
      message("m19", "yassine", "Sí. Me dicen: “Está aquí al lao. No tiene pérdida”.", "إييه. قالو ليا: راه هنا حدّاك وسهلة تلقاها.", ["Está aquí al lao", "No tiene pérdida"]),
      message("m20", "salma", "¿Vas a coger un taxi?", "واش غادي تشد طاكسي؟", ["¿Dónde están los taxis?"]),
      message("m21", "yassine", "Qué va. Voy a probar el autobús. La parada está cerquita, ¿no?", "لا لا. غادي نجرب الطوبيس. المحطة قريبة بزاف، ماشي؟", ["Qué va", "¿Dónde está la parada?", "Está cerquita"]),
      message("m22", "salma", "Sí, está cerca. Pregunta: “¿Dónde está la parada?”", "إييه، راه قريبة. سول: فين كاينة المحطة؟", ["¿Dónde está la parada?"]),
      message("m23", "yassine", "Ya la veo. Pero hay dos autobuses.", "دابا شفتها. ولكن كاينين جوج طوبيسات.", []),
      message("m24", "yassine", "Le pregunto al conductor: “¿Esto va pa’l centro?”", "غادي نسول الشيفور: واش هادا غادي للوسط؟", ["¿Esto va pa’l centro?"], "voice-note"),
      message("m25", "salma", "¿Qué dice?", "شنو قال؟", []),
      message("m26", "yassine", "Dice: “Aro, va pa’l centro”.", "قال: طبعا، غادي للوسط.", ["Aro", "¿Esto va pa’l centro?"]),
      message("m27", "salma", "Perfecto. Dime cuando subas. Yo te espero en el centro.", "مزيان. قول ليا ملي تركب. أنا غادي نستناك فالوسط.", ["Voy pa’l centro"]),
      message("m28", "yassine", "Ya estoy dentro. Voy pa’l centro.", "دابا ركبت. أنا غادي للوسط.", ["Voy pa’l centro"]),
      message("m29", "yassine", "Muchas gracias por ayudarme, Salma.", "شكرا بزاف على المساعدة، سلمى.", ["Muchas gracias"]),
      message("m30", "salma", "De ná, mi arma. ¡Nos vemos ahora!", "على والو آ العزيز. نتلاقاو دابا!", ["De ná, mi arma"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `airport-story-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: airportVocab.map((item) => item.term),
    finalReview: { keyPhrases: ["Acabo de llegar", "¿Me echas una mano?", "No entiendo bien", "¿Dónde recojo la maleta?", "¿Esto va pa’l centro?"], grammarPatterns: ["¿Dónde está...?", "¿Dónde tengo que...?", "Voy pa’l..."], speakingPrompts: ["شرح بلي دابا غير وصلتي من المغرب.", "طلب يعاودو ليك بشوية.", "سول على الماليتة وعلى النقل للوسط."] },
    completionTask: { title: "رسالة صوتية من المطار", instructions: "سجّل 45 ثانية بالإسبانية: سلّم، قول بلي دابا وصلتي من المغرب، طلب المساعدة، سول على الماليتة وعلى الطريق للوسط، ومن بعد شكر الشخص." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Buenas. Me llamo Yassine, soy de Marruecos y acabo de llegar al aeropuerto de Málaga. Es mi primera vez aquí. Todo es nuevo, pero estoy tranquilo.", translation: "سلام. سميتي ياسين، أنا من المغرب ودابا غير وصلت لمطار مالقة. هادي أول مرة ليا هنا. كلشي جديد ولكن أنا هاني.", highlights: highlights(["Buenas", "Soy de Marruecos", "Acabo de llegar"]), shadowLine: "Buenas, soy de Marruecos y acabo de llegar." },
  { id: "p2", text: "Primero busco el control de pasaportes. Una trabajadora habla rápido. Le digo: “No entiendo bien. Más despacio, por favor. ¿Me lo repites?”. Ella sonríe y responde: “No pasa ná”.", translation: "اللول كنقلب على كونطرول الباسبور. الموظفة كتهضر بزربة. كنقول ليها ما كنفهمش مزيان، بشوية عافاك، وواش تقدر تعاود. هي كتبتسم وكتقول ما كاين باس.", highlights: highlights(["¿Dónde está el control de pasaportes?", "No entiendo bien", "Más despacio, por favor", "¿Me lo repites?", "No pasa ná"]), shadowLine: "No entiendo bien. Más despacio, por favor." },
  { id: "p3", text: "Después necesito mi equipaje. Tengo una maleta azul. Pregunto: “¿Dónde recojo la maleta?” y “¿Dónde tengo que ir?”. Un trabajador me dice: “Por aquí, a la izquierda”.", translation: "من بعد خاصني الباگاج. عندي ماليتة زرقا. كنسول فين ناخد الماليتة وفين خاصني نمشي. الموظف كيقول ليا من هنا لليسار.", highlights: highlights(["Tengo una maleta", "¿Dónde recojo la maleta?", "¿Dónde tengo que ir?", "Por aquí", "A la izquierda"]), shadowLine: "Tengo una maleta azul. ¿Dónde la recojo?" },
  { id: "p4", text: "En la cinta hay muchas maletas. Al principio no veo la mía, pero al final aparece. Cojo la maleta y pregunto: “¿Dónde está la aduana?”. La aduana está justo delante.", translation: "فالسير كاينين بزاف ديال الماليتات. فاللول ما شفتش ديالي، ولكن فالآخر بانت. خديتها وسولت فين كاينة الديوانة. كانت قدّامي نيشان.", highlights: highlights(["¿Dónde está la aduana?"]), shadowLine: "Cojo mi maleta y busco la aduana." },
  { id: "p5", text: "Ahora quiero salir. Pregunto: “¿Por dónde se sale?”. Me explican: “Tira todo recto y después a la derecha. La salida está aquí al lao. No tiene pérdida”.", translation: "دابا بغيت نخرج. كنسول منين كنخرجو. كيشرحوا ليا: سير نيشان ومن بعد لليمين. الخرجة راه هنا حدّاك وسهلة تلقاها.", highlights: highlights(["¿Por dónde se sale?", "Tira todo recto", "A la derecha", "Está aquí al lao", "No tiene pérdida"]), shadowLine: "Tira todo recto y después a la derecha." },
  { id: "p6", text: "Fuera del aeropuerto veo los taxis. Puedo preguntar “¿Dónde están los taxis?”, pero prefiero el autobús. La parada está cerquita, a la izquierda de la salida.", translation: "برا المطار شفت الطاكسيات. نقدر نسول فين كاينين، ولكن فضّلت الطوبيس. المحطة قريبة بزاف، فاليسار ديال الخرجة.", highlights: highlights(["¿Dónde están los taxis?", "¿Dónde está la parada?", "Está cerquita", "A la izquierda"]), shadowLine: "La parada está cerquita, a la izquierda." },
  { id: "p7", text: "Hay dos autobuses y no sé cuál necesito. Le digo al conductor: “Voy pa’l centro. ¿Esto va pa’l centro?”. Él responde: “Aro”. Ya sé que es mi autobús.", translation: "كاينين جوج طوبيسات وما عرفت شكون اللي خاصني. قلت للشيفور أنا غادي للوسط، واش هادا غادي للوسط؟ جاوبني طبعا. دابا عرفت بلي هادا هو الطوبيس ديالي.", highlights: highlights(["Voy pa’l centro", "¿Esto va pa’l centro?", "Aro"]), shadowLine: "Voy pa’l centro. ¿Esto va pa’l centro?" },
  { id: "p8", text: "Subo al autobús y mando un mensaje a Salma. Todo ha salido bien. Digo “Muchas gracias” al conductor. Él sonríe y contesta: “De ná, mi arma”. Mi primera conversación en Andalucía termina bien.", translation: "ركبت الطوبيس وصيفطت مساج لسلمى. كلشي داز مزيان. قلت شكرا بزاف للشيفور. هو ابتسم وجاوبني على والو آ العزيز. أول محادثة ليا فالأندلس سالات مزيان.", highlights: highlights(["Muchas gracias", "De ná, mi arma"]), shadowLine: "Muchas gracias. De ná, mi arma." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "airport-reading-q1", type: "multiple-choice", prompt: "ياسين جاي منين؟", options: ["من المغرب", "من فرنسا", "من إيطاليا"], correctAnswer: "من المغرب", explanation: "فالبداية قال: Soy de Marruecos وVengo de Marruecos.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "airport-reading-q2", type: "multiple-choice", prompt: "شنو قال ياسين ملي الموظفة هضرات بزربة؟", options: ["Más despacio, por favor", "Voy pa’l centro", "Muchas gracias"], correctAnswer: "Más despacio, por favor", explanation: "طلب منها تهضر بشوية حيث ما فهمش مزيان.", points: 1, skillTag: "العبارة المناسبة" },
  { id: "airport-reading-q3", type: "true-false", prompt: "صح ولا خطأ: الماليتة ديال ياسين زرقا.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "النص كيقول: Tengo una maleta azul.", points: 1, skillTag: "التفاصيل" },
  { id: "airport-reading-q4", type: "multiple-choice", prompt: "فين كاينة المحطة بالنسبة للخرجة؟", options: ["قريبة وفاليسار", "بعيدة وفاليمين", "داخل الديوانة"], correctAnswer: "قريبة وفاليسار", explanation: "النص كيقول المحطة cerquita وa la izquierda de la salida.", points: 1, skillTag: "المكان" },
  { id: "airport-reading-q5", type: "multiple-choice", prompt: "شنو معنى “Aro” فجواب الشيفور؟", options: ["طبعا", "ما عرفتش", "تسنا"], correctAnswer: "طبعا", explanation: "Aro هي طريقة أندلسية دارجة فالنطق ديال claro.", points: 1, skillTag: "اللهجة" },
];

export const andalusianSpanishA1AirportArrivalDarijaReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "القراءة بالصوت: أول وصول لمالقة", subtitle: "قرا وسمع قصة A1 كاملة من كونطرول الباسبور حتى للطوبيس ديال الوسط.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "reading", "airport"], estimatedMinutes: 15,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: airportVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "ربط كل عبارة إسبانية بالمعنى الصحيح ديالها بالدارجة.", points: items.length, skillTag: "ربط العبارات" };
}

export const andalusianSpanishA1AirportArrivalDarijaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "الكويز النهائي: الوصول لمطار مالقة", subtitle: "اختار العبارة الأندلسية الصحيحة فمواقف جديدة ديال الوصول، الاتجاهات والنقل.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "quiz", "airport"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "quiz",
  data: {
    description: "هاد الكويز كيشوف واش تقدر تختار العبارة الصحيحة فالمطار بلا ما يعتمد على أحداث القصة.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "airport-quiz-1", type: "multiple-choice", prompt: "دابا غير هبطتي من الطيارة. شنو تقول؟", options: ["Acabo de llegar", "Está cerquita", "Qué va", "A la derecha"], correctAnswer: "Acabo de llegar", explanation: "Acabo de llegar كتعني دابا غير وصلت.", points: 1, skillTag: "الوصول" },
      { id: "airport-quiz-2", type: "multiple-choice", prompt: "بغيتي تطلب المساعدة بطريقة ودّية. شنو الأنسب؟", options: ["¿Me echas una mano?", "¿Todo bien?", "Por aquí", "Aro"], correctAnswer: "¿Me echas una mano?", explanation: "هاد العبارة كتطلب المساعدة بطريقة طبيعية.", points: 1, skillTag: "طلب المساعدة" },
      { id: "airport-quiz-3", type: "order-words", prompt: "رتّب الجملة اللي كتعني: بشوية عافاك.", wordBank: ["Más", "despacio,", "por", "favor"], correctAnswer: "Más despacio, por favor", explanation: "هاد الجملة كتطلب من الشخص ينقص السرعة.", points: 1, skillTag: "الفهم" },
      { id: "airport-quiz-4", type: "true-false", prompt: "صح ولا خطأ: “No pasa ná” كتعني ما كاين باس.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "هاد نطق أندلسي دارج لـ no pasa nada.", points: 1, skillTag: "اللهجة" },
      { id: "airport-quiz-5", type: "multiple-choice", prompt: "بغيتي تعرف فين تستلم الباگاج. شنو تسول؟", options: ["¿Dónde recojo la maleta?", "¿Dónde están los taxis?", "¿Todo bien?", "¿Esto va pa’l centro?"], correctAnswer: "¿Dónde recojo la maleta?", explanation: "recojo هنا هي ناخد أو نستلم.", points: 1, skillTag: "الأمتعة" },
      { id: "airport-quiz-6", type: "multiple-choice", prompt: "شي واحد قال ليك “Tira todo recto”. فين خاصك تمشي؟", options: ["نيشان", "لليسار", "رجع للور", "وقف"], correctAnswer: "نيشان", explanation: "Tira todo recto كتعني سير نيشان.", points: 1, skillTag: "الاتجاهات" },
      { id: "airport-quiz-7", type: "fill-blank", prompt: "كمّل: Está aquí al ____.", nativePrompt: "راه هنا حدّاك", correctAnswer: "lao", explanation: "al lao هي الطريقة الدارجة فالنطق ديال al lado.", points: 1, skillTag: "اللهجة" },
      { id: "airport-quiz-8", type: "multiple-choice", prompt: "بغيتي تعرف واش الطوبيس غادي للوسط. شنو تسول؟", options: ["¿Esto va pa’l centro?", "¿Dónde está la aduana?", "¿Me lo repites?", "Tengo una maleta"], correctAnswer: "¿Esto va pa’l centro?", explanation: "هاد هو السؤال المباشر على الوجهة.", points: 1, skillTag: "النقل" },
      { id: "airport-quiz-9", type: "true-false", prompt: "صح ولا خطأ: “Está cerquita” كتعني راه بعيدة بزاف.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "cerquita كتعني قريبة بزاف.", points: 1, skillTag: "المسافة" },
      { id: "airport-quiz-10", type: "multiple-choice", prompt: "شي واحد شكرك. بغيتي تجاوب بطريقة أندلسية دافئة. شنو تقول؟", options: ["De ná, mi arma", "No entiendo bien", "Voy pa’l centro", "Necesito ayuda"], correctAnswer: "De ná, mi arma", explanation: "هاد رد أندلسي دافئ بمعنى على والو آ العزيز.", points: 1, skillTag: "الرد على الشكر" },
      pairQuestion("airport-quiz-11", "ربط عبارات الوصول بالمعنى ديالها.", airportVocab.slice(0, 5)),
      pairQuestion("airport-quiz-12", "ربط عبارات الفهم والمساعدة بالمعنى ديالها.", airportVocab.slice(5, 10)),
      pairQuestion("airport-quiz-13", "ربط عبارات الاتجاه والنقل بالمعنى ديالها.", [airportVocab[14], airportVocab[15], airportVocab[16], airportVocab[21], airportVocab[22]]),
    ],
  },
};
