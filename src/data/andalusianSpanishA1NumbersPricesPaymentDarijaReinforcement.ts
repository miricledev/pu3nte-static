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

const courseId = "andalusian-spanish-a1-numbers-prices-payment-darija";
const sectionName = "الإسبانية الأندلسية A1 - الأرقام، الثمن والخلص";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const paymentVocab: VocabItem[] = [
  { id: "one-euro", term: "Un euro", meaning: "أورو واحد", note: "العدد واحد مع euro كيجي مفرد.", example: "Esto cuesta un euro.", translation: "هادا بأورو واحد." },
  { id: "two-euros", term: "Dos euros", meaning: "جوج أورو", note: "من جوج وفوق كنستعمل euros بالجمع.", example: "Son dos euros.", translation: "المجموع جوج أورو." },
  { id: "five-euros", term: "Cinco euros", meaning: "خمسة أورو", note: "ثمن بسيط ومهم فالمعاملات اليومية.", example: "Esto cuesta cinco euros.", translation: "هادا بخمسة أورو." },
  { id: "ten-euros", term: "Diez euros", meaning: "عشرة أورو", note: "كتستعملها فالثمن أو باش تقول شحال عندك.", example: "Tengo diez euros.", translation: "عندي عشرة أورو." },
  { id: "cuanto-cuesta", term: "¿Cuánto cuesta?", meaning: "شحال هادا؟ / شحال الثمن؟", note: "سؤال على ثمن حاجة وحدة.", example: "Perdona, ¿cuánto cuesta esto?", translation: "سمح ليا، شحال هادا؟" },
  { id: "cuanto-es", term: "¿Cuánto es?", meaning: "شحال المجموع؟", note: "كتسول بها على المجموع النهائي.", example: "¿Cuánto es en total?", translation: "شحال المجموع كامل؟" },
  { id: "costs-five", term: "Esto cuesta cinco euros", meaning: "هادا بخمسة أورو", note: "جواب كامل على سؤال الثمن.", example: "Esto cuesta cinco euros, señora.", translation: "هادا بخمسة أورو، لالة." },
  { id: "two-fifty", term: "Dos euros con cincuenta", meaning: "جوج أورو ونص", note: "con cincuenta كتعني خمسين سنتيم.", example: "El pan cuesta dos euros con cincuenta.", translation: "الخبز بجوج أورو ونص." },
  { id: "five-twenty", term: "Cinco euros con veinte", meaning: "خمسة أورو وعشرين سنتيم", note: "كتقرا الثمن: euros con céntimos.", example: "La caja cuesta cinco euros con veinte.", translation: "العلبة بخمسة أورو وعشرين سنتيم." },
  { id: "put-this", term: "Ponme esto, porfa", meaning: "عطيني هادا عافاك", note: "طريقة يومية وغير رسمية باش تطلب سلعة.", example: "Ponme esto, porfa.", translation: "عطيني هادا عافاك." },
  { id: "anything-else", term: "¿Algo más?", meaning: "شي حاجة أخرى؟", note: "البائع كيسول واش بغيتي تزيد شي حاجة.", example: "¿Algo más o ya está?", translation: "شي حاجة أخرى ولا صافي؟" },
  { id: "only-this", term: "No, esto na' más", meaning: "لا، غير هادا", note: "na' más نطق أندلسي خفيف لـ nada más.", example: "No, esto na' más, gracias.", translation: "لا، غير هادا، شكرا." },
  { id: "want-both", term: "Quiero los dos", meaning: "بغيت بجوج", note: "كتستعملها ملي بغيتي جوج اختيارات.", example: "Me gustan. Quiero los dos.", translation: "عجبوني. بغيت بجوج." },
  { id: "put-both", term: "Ponme los dos, porfa", meaning: "عطيني بجوج عافاك", note: "طلب طبيعي لجوج ديال الحوايج.", example: "Ponme los dos, porfa.", translation: "عطيني بجوج عافاك." },
  { id: "pay-card", term: "¿Puedo pagar con tarjeta?", meaning: "نقدر نخلص بالكارت؟", note: "سؤال مهم قبل الخلاص بالكارت.", example: "¿Puedo pagar con tarjeta aquí?", translation: "نقدر نخلص بالكارت هنا؟" },
  { id: "pay-cash", term: "Pago en efectivo", meaning: "غادي نخلص بالكاش", note: "en efectivo كتعني بالنقود.", example: "No uso tarjeta; pago en efectivo.", translation: "ما غاديش نستعمل الكارت؛ غادي نخلص بالكاش." },
  { id: "pay-here", term: "¿Pago aquí?", meaning: "نخلص هنا؟", note: "باش تتأكد فين خاصك تخلص.", example: "Perdona, ¿pago aquí?", translation: "سمح ليا، نخلص هنا؟" },
  { id: "have-ten", term: "Tengo diez euros", meaning: "عندي عشرة أورو", note: "كتقول شحال عندك باش تختار طريقة الخلاص.", example: "Tengo diez euros en efectivo.", translation: "عندي عشرة أورو بالكاش." },
  { id: "change-twenty", term: "¿Tienes cambio de veinte?", meaning: "عندك الفكة ديال عشرين؟", note: "كتسول واش البائع يقدر يصرف ورقة عشرين.", example: "Solo tengo veinte. ¿Tienes cambio de veinte?", translation: "عندي غير عشرين. عندك الفكة ديال عشرين؟" },
  { id: "as-you-want", term: "Como tú quieras", meaning: "كيف ما بغيتي", note: "كتعطي الاختيار للشخص الآخر.", example: "Tarjeta o efectivo, como tú quieras.", translation: "الكارت ولا الكاش، كيف ما بغيتي." },
  { id: "your-change", term: "Aquí tienes la vuelta", meaning: "ها هو الصرف ديالك", note: "la vuelta فإسبانيا كتستعمل بمعنى الصرف.", example: "Aquí tienes la vuelta: dos euros.", translation: "ها هو الصرف ديالك: جوج أورو." },
  { id: "missing-one", term: "Me falta un euro", meaning: "ناقصني أورو واحد", note: "كتوضح بلي خاصك أورو واحد آخر.", example: "Me falta un euro para pagar.", translation: "ناقصني أورو واحد باش نخلص." },
  { id: "missing-change", term: "Perdona, creo que falta cambio", meaning: "سمح ليا، كنظن الصرف ناقص", note: "تصحيح مؤدب إلى بان ليك الصرف ناقص.", example: "Perdona, creo que falta cambio.", translation: "سمح ليا، كنظن الصرف ناقص." },
  { id: "missing-change-euro", term: "Me falta un euro de cambio", meaning: "ناقصني أورو واحد فالصرف", note: "كتحدد بالضبط شحال ناقص فالصرف.", example: "Me falta un euro de cambio, por favor.", translation: "ناقصني أورو واحد فالصرف، عافاك." },
  { id: "now-right", term: "Ahora sí", meaning: "دابا مزيان / هكا مزيان", note: "كتأكد بلي المشكل تصلح.", example: "Ahora sí, está bien.", translation: "دابا مزيان، هكا صحيح." },
  { id: "take", term: "Toma", meaning: "هاك", note: "كتعطي بها حاجة لشخص بطريقة عادية.", example: "Toma, aquí tienes un euro.", translation: "هاك، أورو واحد." },
  { id: "eurillos", term: "Dos eurillos", meaning: "جوج أوريّات / جوج أورو صغار", note: "تصغير ودّي وغير رسمي لـ euros.", example: "Son dos eurillos na' más.", translation: "غير جوج أوريّات." },
  { id: "thanks-end", term: "Pues nada, gracias", meaning: "إيوا صافي، شكرا", note: "طريقة طبيعية باش تسالي المعاملة.", example: "Pues nada, gracias. Hasta luego.", translation: "إيوا صافي، شكرا. حتى من بعد." },
  { id: "aro", term: "Aro", meaning: "طبعا / أكيد", note: "نطق أندلسي دارج لـ claro.", example: "—¿Puedo pagar aquí? —Aro.", translation: "—نقدر نخلص هنا؟ —طبعا." },
  { id: "de-na", term: "De ná", meaning: "على والو", note: "نطق أندلسي دارج لـ de nada.", example: "—Gracias. —De ná.", translation: "—شكرا. —على والو." },
  { id: "mi-arma", term: "mi arma", meaning: "آ الحبيب / آ العزيز", note: "نداء أندلسي دافئ جاي من mi alma.", example: "De ná, mi arma.", translation: "على والو، آ العزيز." },
];

const highlightMap = Object.fromEntries(paymentVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
const highlights = (phrases: string[]) => phrases.map((phrase) => highlightMap[phrase]).filter((item): item is { phrase: string; meaning: string; note: string } => Boolean(item));
const storyAudioBase = `/audio/stories/${courseId}`;

function cardFromVocab(item: VocabItem): FlashcardItem {
  return {
    id: item.id, term: item.term, definition: item.meaning, exampleSentence: item.example, exampleTranslation: item.translation,
    acceptedAnswers: item.meaning.split("/").map((answer) => answer.trim()), languageFrom: "spanish", languageTo: "mixed",
    difficulty: "easy", notes: item.note, specialCharacters, starred: true,
  };
}

function message(id: string, speakerId: string, text: string, translation: string, phrases: string[], messageType: StoryMessage["messageType"] = "text"): StoryMessage {
  return { id, speakerId, text, translation, vocabHighlights: highlights(phrases), messageType, audioUrl: messageType === "voice-note" ? `${storyAudioBase}/${id}.mp3` : undefined };
}

export const andalusianSpanishA1NumbersPricesPaymentDarijaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`, title: "بطاقات A1: الأرقام، الثمن والخلص", subtitle: "راجع الأثمنة، طرق الخلاص والصرف بالإسبانية الأندلسية مع المعنى بالدارجة.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "prices", "payment"], estimatedMinutes: 15,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "flashcards", data: { cards: paymentVocab.map(cardFromVocab), specialCharacters },
};

const sentenceStages: SentenceStage[] = [
  { id: "stage-1", title: "الأثمنة البسيطة", newVocab: ["Un euro = أورو واحد", "Dos euros = جوج أورو", "Cinco euros = خمسة أورو", "Diez euros = عشرة أورو"], fullVocab: ["Un euro", "Dos euros", "Cinco euros", "Diez euros"], prompt: "قول: هادا بخمسة أورو وعندي عشرة أورو.", targetAnswer: "Esto cuesta cinco euros y tengo diez euros.", acceptedAnswers: ["Esto cuesta cinco euros. Tengo diez euros."], explanation: "من جوج وفوق كنستعمل euros بالجمع.", audioUrl: `/audio/sentence-builder/${courseId}/stage-1.mp3`, wordBreakdown: [{ source: "cuesta", target: "الثمن ديالو" }, { source: "cinco euros", target: "خمسة أورو" }, { source: "tengo", target: "عندي" }] },
  { id: "stage-2", title: "السؤال على الثمن", newVocab: ["¿Cuánto cuesta? = شحال هادا؟", "¿Cuánto es? = شحال المجموع؟"], fullVocab: ["¿Cuánto cuesta?", "¿Cuánto es?", "Esto cuesta cinco euros"], prompt: "قول: سمح ليا، شحال هادا؟ وشحال المجموع؟", targetAnswer: "Perdona, ¿cuánto cuesta esto? ¿Cuánto es en total?", acceptedAnswers: ["¿Cuánto cuesta esto? ¿Cuánto es?"], explanation: "¿Cuánto cuesta? للحاجة، و¿Cuánto es? للمجموع.", audioUrl: `/audio/sentence-builder/${courseId}/stage-2.mp3`, wordBreakdown: [{ source: "¿Cuánto cuesta?", target: "شحال الثمن؟" }, { source: "esto", target: "هادا" }, { source: "en total", target: "فالمجموع" }] },
  { id: "stage-3", title: "الأورو والسنتيم", newVocab: ["Dos euros con cincuenta = جوج أورو ونص", "Cinco euros con veinte = خمسة أورو وعشرين سنتيم"], fullVocab: ["Dos euros con cincuenta", "Cinco euros con veinte"], prompt: "قول: هادا بجوج أورو ونص وهادا بخمسة أورو وعشرين سنتيم.", targetAnswer: "Esto cuesta dos euros con cincuenta y esto cuesta cinco euros con veinte.", acceptedAnswers: ["Son dos euros con cincuenta y cinco euros con veinte."], explanation: "من بعد con كنقول عدد السنتيمات.", audioUrl: `/audio/sentence-builder/${courseId}/stage-3.mp3`, wordBreakdown: [{ source: "con cincuenta", target: "ونص / خمسين سنتيم" }, { source: "con veinte", target: "وعشرين سنتيم" }] },
  { id: "stage-4", title: "طلب السلعة", newVocab: ["Ponme esto, porfa = عطيني هادا عافاك", "Quiero los dos = بغيت بجوج", "Ponme los dos, porfa = عطيني بجوج عافاك"], fullVocab: ["Ponme esto, porfa", "Quiero los dos", "Ponme los dos, porfa", "¿Algo más?", "No, esto na' más"], prompt: "قول: بغيت بجوج. عطيني بجوج عافاك. لا، غير هادا.", targetAnswer: "Quiero los dos. Ponme los dos, porfa. No, esto na' más.", acceptedAnswers: ["Quiero los dos, por favor. No, nada más."], explanation: "na' más هي طريقة أندلسية خفيفة فالنطق.", audioUrl: `/audio/sentence-builder/${courseId}/stage-4.mp3`, wordBreakdown: [{ source: "Ponme", target: "عطيني" }, { source: "los dos", target: "بجوج" }, { source: "na' más", target: "غير" }] },
  { id: "stage-5", title: "طريقة الخلاص", newVocab: ["¿Puedo pagar con tarjeta? = نقدر نخلص بالكارت؟", "Pago en efectivo = غادي نخلص بالكاش", "¿Pago aquí? = نخلص هنا؟"], fullVocab: ["¿Puedo pagar con tarjeta?", "Pago en efectivo", "¿Pago aquí?", "Como tú quieras"], prompt: "قول: نخلص هنا؟ نقدر نخلص بالكارت ولا نخلص بالكاش؟", targetAnswer: "¿Pago aquí? ¿Puedo pagar con tarjeta o pago en efectivo?", acceptedAnswers: ["¿Puedo pagar aquí con tarjeta o en efectivo?"], explanation: "con tarjeta بالكارت، وen efectivo بالكاش.", audioUrl: `/audio/sentence-builder/${courseId}/stage-5.mp3`, wordBreakdown: [{ source: "¿Puedo pagar...?", target: "نقدر نخلص...؟" }, { source: "con tarjeta", target: "بالكارت" }, { source: "en efectivo", target: "بالكاش" }] },
  { id: "stage-6", title: "الفكة والصرف", newVocab: ["¿Tienes cambio de veinte? = عندك الفكة ديال عشرين؟", "Aquí tienes la vuelta = ها هو الصرف ديالك"], fullVocab: ["Tengo diez euros", "¿Tienes cambio de veinte?", "Aquí tienes la vuelta"], prompt: "قول: عندي غير عشرين. عندك الفكة ديال عشرين؟", targetAnswer: "Solo tengo veinte euros. ¿Tienes cambio de veinte?", acceptedAnswers: ["Tengo veinte euros. ¿Tienes cambio de veinte?"], explanation: "cambio هي الفكة، وla vuelta هي الصرف اللي كيرجع ليك.", audioUrl: `/audio/sentence-builder/${courseId}/stage-6.mp3`, wordBreakdown: [{ source: "Solo tengo", target: "عندي غير" }, { source: "cambio", target: "الفكة" }, { source: "de veinte", target: "ديال عشرين" }] },
  { id: "stage-7", title: "الصرف ناقص", newVocab: ["Perdona, creo que falta cambio = سمح ليا، كنظن الصرف ناقص", "Me falta un euro de cambio = ناقصني أورو فالصرف", "Ahora sí = دابا مزيان"], fullVocab: ["Me falta un euro", "Perdona, creo que falta cambio", "Me falta un euro de cambio", "Ahora sí", "Toma"], prompt: "قول: سمح ليا، كنظن الصرف ناقص. ناقصني أورو واحد فالصرف.", targetAnswer: "Perdona, creo que falta cambio. Me falta un euro de cambio.", acceptedAnswers: ["Perdona, me falta un euro de cambio."], explanation: "بدا بـ Perdona باش تصحح الغلط بأدب.", audioUrl: `/audio/sentence-builder/${courseId}/stage-7.mp3`, wordBreakdown: [{ source: "creo que", target: "كنظن" }, { source: "falta", target: "ناقص" }, { source: "de cambio", target: "فالصرف" }] },
  { id: "stage-8", title: "المعاملة كاملة", newVocab: ["Dos eurillos = جوج أوريّات", "Pues nada, gracias = إيوا صافي شكرا", "De ná, mi arma = على والو آ العزيز"], fullVocab: paymentVocab.map((item) => `${item.term} = ${item.meaning}`), prompt: "قول: دابا مزيان. إيوا صافي، شكرا. على والو، آ العزيز.", targetAnswer: "Ahora sí. Pues nada, gracias. De ná, mi arma.", acceptedAnswers: ["Ahora sí, gracias. De ná, mi arma."], explanation: "هاد النهاية كتأكد التصحيح وكتسالي المعاملة بطريقة أندلسية دافئة.", audioUrl: `/audio/sentence-builder/${courseId}/stage-8.mp3`, wordBreakdown: [{ source: "Ahora sí", target: "دابا مزيان" }, { source: "Pues nada", target: "إيوا صافي" }, { source: "De ná", target: "على والو" }] },
];

export const andalusianSpanishA1NumbersPricesPaymentDarijaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`, title: "بنّي الجمل: شري وخلّص بلا مشكل", subtitle: "ركّب جمل باش تسول على الثمن، تختار السلعة، تخلص وتراجع الصرف.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "sentence builder", "payment"], estimatedMinutes: 16,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "sentence-builder",
  data: { stages: sentenceStages, finalChallenge: "دير معاملة كاملة: سول على جوج أثمنة، اختار، سول على طريقة الخلاص، ومن بعد صحح الصرف الناقص بأدب." },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "payment-story-q1", type: "multiple-choice", prompt: "شنو سولات سارة فالبداية؟", options: ["على ثمن السلعة", "على الطريق", "على الاسم"], correctAnswer: "على ثمن السلعة", explanation: "قالت: ¿Cuánto cuesta esto?", points: 1, skillTag: "الثمن" },
  { id: "payment-story-q2", type: "multiple-choice", prompt: "شحال ثمن الحاجة اللولة؟", options: ["جوج أورو ونص", "عشرة أورو", "أورو واحد"], correctAnswer: "جوج أورو ونص", explanation: "البائع قال: Dos euros con cincuenta.", points: 1, skillTag: "فهم الثمن" },
  { id: "payment-story-q3", type: "multiple-choice", prompt: "شنو سول البائع من بعد ما اختارت سارة بجوج؟", options: ["واش بغات شي حاجة أخرى", "واش ساكنة هنا", "واش كتفهم الإسبانية"], correctAnswer: "واش بغات شي حاجة أخرى", explanation: "فالرسالة 9 قال: ¿Algo más?", points: 1, skillTag: "الشراء" },
  { id: "payment-story-q4", type: "multiple-choice", prompt: "كيفاش بغات سارة تخلص فاللول؟", options: ["بالكارت", "بالكاش", "ما بغاتش تخلص"], correctAnswer: "بالكارت", explanation: "سولات: ¿Puedo pagar con tarjeta?", points: 1, skillTag: "الخلاص" },
  { id: "payment-story-q5", type: "true-false", prompt: "صح ولا خطأ: سارة خلصات بالكاش حيث الكارت ما خدمش.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "قالت: Tengo diez euros. Pago en efectivo.", points: 1, skillTag: "طريقة الخلاص" },
  { id: "payment-story-q6", type: "multiple-choice", prompt: "شنو المشكل اللي لقات سارة فالصرف؟", options: ["ناقص أورو واحد", "زايد عشرة أورو", "ما عطاها حتى صرف"], correctAnswer: "ناقص أورو واحد", explanation: "قالت: Me falta un euro de cambio.", points: 1, skillTag: "الصرف" },
  { id: "payment-story-q7", type: "true-false", prompt: "صح ولا خطأ: البائع صلح الغلط وعطاها الأورو الناقص.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "قال Toma، ومن بعد سارة قالت Ahora sí.", points: 1, skillTag: "حل المشكل" },
  { id: "payment-story-q8", type: "multiple-choice", prompt: "شنو العرض الجديد اللي قال البائع؟", options: ["جوج عصائر بجوج أوريّات", "خبزة بعشرة أورو", "ثلاثة ديال الكارطات"], correctAnswer: "جوج عصائر بجوج أوريّات", explanation: "فالرسالة 24 أكد بلي جوج العصائر بجوج أورو.", points: 1, skillTag: "العرض" },
  { id: "payment-story-q9", type: "multiple-choice", prompt: "شنو سول البائع من بعد الطلب الثاني؟", options: ["¿Algo más?", "¿Cuánto cuesta?", "¿Pago aquí?"], correctAnswer: "¿Algo más?", explanation: "فالرسالة 27 رجع سول واش بغيتي شي حاجة أخرى.", points: 1, skillTag: "العبارة المناسبة" },
  { id: "payment-story-q10", type: "multiple-choice", prompt: "كيفاش سالات المعاملة؟", options: ["سارة شكرات والبائع قال على والو", "سارة خلات السلع", "البائع طلب البطاقة"], correctAnswer: "سارة شكرات والبائع قال على والو", explanation: "فالرسالتين 29 و30 سالاو بالشكر وDe ná, mi arma.", points: 1, skillTag: "النهاية" },
];

export const andalusianSpanishA1NumbersPricesPaymentDarijaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`, title: "القصة: الأورو اللي كان ناقص", subtitle: "سارة كتشري من دكان صغير، ولكن خاصها تراجع الصرف قبل ما تمشي.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "story", "payment"], estimatedMinutes: 18,
  skoolSectionName: sectionName, relatedCourse: `${courseId}-flashcards`, activityType: "story",
  data: {
    targetLanguage: "spanish", nativeLanguage: "darija",
    characters: [{ id: "sara", name: "Sara", initials: "SA", side: "right", color: "cyan" }, { id: "antonio", name: "Antonio", initials: "AN", side: "left", color: "violet" }],
    messages: [
      message("m1", "antonio", "Buenas. ¿Qué te pongo?", "سلام. شنو نعطيك؟", []),
      message("m2", "sara", "Buenas. Estoy mirando estas dos cosas.", "سلام. كنشوف هاد الجوج حوايج.", []),
      message("m3", "sara", "¿Cuánto cuesta esto?", "شحال الثمن ديال هادا؟", ["¿Cuánto cuesta?"], "voice-note"),
      message("m4", "antonio", "Esto cuesta cinco euros.", "هادا بخمسة أورو.", ["Esto cuesta cinco euros", "Cinco euros"]),
      message("m5", "sara", "¿Y estas dos cosas pequeñas?", "وهاد الجوج حوايج الصغار؟", []),
      message("m6", "antonio", "El primero, dos euros con cincuenta. El otro, cinco euros con veinte.", "اللّول بجوج أورو ونص. والآخر بخمسة أورو وعشرين سنتيم.", ["Dos euros con cincuenta", "Cinco euros con veinte"], "voice-note"),
      message("m7", "sara", "Me gustan. Quiero los dos.", "عجبوني. بغيت بجوج.", ["Quiero los dos"]),
      message("m8", "sara", "Ponme los dos, porfa.", "عطيني بجوج عافاك.", ["Ponme los dos, porfa"]),
      message("m9", "antonio", "Aro. ¿Algo más?", "طبعا. شي حاجة أخرى؟", ["Aro", "¿Algo más?"]),
      message("m10", "sara", "No, esto na' más. ¿Cuánto es?", "لا، غير هادا. شحال المجموع؟", ["No, esto na' más", "¿Cuánto es?"]),
      message("m11", "antonio", "Son siete euros con setenta. Puedes pagar aquí.", "المجموع سبعة أورو وسبعين سنتيم. تقدري تخلصي هنا.", []),
      message("m12", "sara", "Aro. ¿Puedo pagar con tarjeta?", "طبعا. نقدر نخلص بالكارت؟", ["Aro", "¿Puedo pagar con tarjeta?"], "voice-note"),
      message("m13", "antonio", "Ahora mismo no hay conexión. ¿Tienes efectivo?", "دابا ما كايناش الشبكة. عندك الكاش؟", []),
      message("m14", "sara", "Sí. Tengo diez euros. Pago en efectivo.", "إييه. عندي عشرة أورو. غادي نخلص بالكاش.", ["Tengo diez euros", "Pago en efectivo"]),
      message("m15", "antonio", "Como tú quieras. Toma tu compra.", "كيف ما بغيتي. هاك الشرا ديالك.", ["Como tú quieras", "Toma"]),
      message("m16", "antonio", "Aquí tienes la vuelta: un euro con treinta.", "ها هو الصرف ديالك: أورو وثلاثين سنتيم.", ["Aquí tienes la vuelta", "Un euro"]),
      message("m17", "sara", "Un momento... Estoy contando.", "تسنا شوية... كنحسب.", []),
      message("m18", "sara", "Perdona, creo que falta cambio. Me falta un euro de cambio.", "سمح ليا، كنظن الصرف ناقص. ناقصني أورو واحد فالصرف.", ["Perdona, creo que falta cambio", "Me falta un euro de cambio"], "voice-note"),
      message("m19", "antonio", "Déjame mirar el ticket...", "خليني نشوف التيكي...", []),
      message("m20", "antonio", "Tienes razón. Toma, un euro.", "عندك الحق. هاك، أورو واحد.", ["Toma", "Un euro"]),
      message("m21", "sara", "Ahora sí. Gracias.", "دابا مزيان. شكرا.", ["Ahora sí"]),
      message("m22", "antonio", "Espera. Tenemos dos zumos de oferta.", "تسناي. عندنا جوج عصائر فالعرض.", []),
      message("m23", "sara", "¿Dos zumos? ¿Cuánto cuestan?", "جوج عصائر؟ شحال الثمن ديالهم؟", ["¿Cuánto cuesta?"]),
      message("m24", "antonio", "Dos eurillos los dos. Na' más.", "جوج أوريّات بجوج. غير هكا.", ["Dos eurillos"], "voice-note"),
      message("m25", "sara", "Vale, quiero los dos.", "واخا، بغيت بجوج.", ["Quiero los dos"]),
      message("m26", "sara", "Ponme los dos, porfa.", "عطيني بجوج عافاك.", ["Ponme los dos, porfa"]),
      message("m27", "antonio", "Aro. ¿Algo más?", "طبعا. شي حاجة أخرى؟", ["Aro", "¿Algo más?"]),
      message("m28", "sara", "No, esto na' más.", "لا، غير هادا.", ["No, esto na' más"]),
      message("m29", "sara", "Pues nada, gracias.", "إيوا صافي، شكرا.", ["Pues nada, gracias"]),
      message("m30", "antonio", "De ná, mi arma. ¡Hasta luego!", "على والو، آ العزيزة. حتى من بعد!", ["De ná", "mi arma"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `payment-story-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions, learnedVocab: paymentVocab.map((item) => item.term),
    finalReview: { keyPhrases: ["¿Cuánto cuesta?", "¿Cuánto es?", "¿Puedo pagar con tarjeta?", "Aquí tienes la vuelta", "Me falta un euro de cambio"], grammarPatterns: ["cuesta + precio", "pagar con + método", "me falta + cantidad"], speakingPrompts: ["سول على ثمن جوج حوايج.", "اختار طريقة الخلاص.", "صحح الصرف الناقص بأدب."] },
    completionTask: { title: "معاملة كاملة فالدكان", instructions: "سجّل 45 ثانية بالإسبانية: سول على الثمن، اختار جوج حوايج، سول على الخلاص بالكارت، ومن بعد قول بأدب بلي ناقصك أورو فالصرف." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Sara entra en una tienda pequeña y saluda. Ve dos productos y pregunta: “¿Cuánto cuesta?”. El primero cuesta dos euros con cincuenta y el segundo cuesta cinco euros con veinte.", translation: "سارة دخلات لدكان صغير وسلمات. شافت جوج ديال الحوايج وسولات على الثمن. اللول بجوج أورو ونص والثاني بخمسة أورو وعشرين سنتيم.", highlights: highlights(["¿Cuánto cuesta?", "Dos euros con cincuenta", "Cinco euros con veinte"]), shadowLine: "¿Cuánto cuesta? Dos euros con cincuenta." },
  { id: "p2", text: "Sara no quiere elegir solo uno. Dice: “Quiero los dos. Ponme los dos, porfa”. El vendedor prepara la compra y pregunta: “¿Algo más?”.", translation: "سارة ما بغاتش تختار غير واحد. قالت بغات بجوج وطلبات يعطيها بجوج. البائع وجد الشرا وسولها واش بغات شي حاجة أخرى.", highlights: highlights(["Quiero los dos", "Ponme los dos, porfa", "¿Algo más?"]), shadowLine: "Quiero los dos. Ponme los dos, porfa." },
  { id: "p3", text: "Ella responde: “No, esto na' más”. Después pregunta: “¿Cuánto es?”. El total es siete euros con setenta.", translation: "هي جاوبات لا، غير هادا. من بعد سولات شحال المجموع. المجموع سبعة أورو وسبعين سنتيم.", highlights: highlights(["No, esto na' más", "¿Cuánto es?"]), shadowLine: "No, esto na' más. ¿Cuánto es?" },
  { id: "p4", text: "Sara quiere pagar y pregunta: “¿Pago aquí? ¿Puedo pagar con tarjeta?”. La máquina no tiene conexión, así que Sara dice: “Tengo diez euros. Pago en efectivo”.", translation: "سارة بغات تخلص وسولات واش تخلص هنا وواش تقدر بالكارت. الماكينة ما فيهاش الشبكة، وداكشي علاش قالت عندها عشرة أورو وغادي تخلص بالكاش.", highlights: highlights(["¿Pago aquí?", "¿Puedo pagar con tarjeta?", "Tengo diez euros", "Pago en efectivo"]), shadowLine: "¿Puedo pagar con tarjeta? Pago en efectivo." },
  { id: "p5", text: "El vendedor contesta: “Como tú quieras”. Recibe los diez euros y dice: “Aquí tienes la vuelta”. Sara mira las monedas con calma.", translation: "البائع قال ليها كيف ما بغات. خذا عشرة أورو وقال ليها ها هو الصرف ديالك. سارة شافت الفلوس بشوية.", highlights: highlights(["Como tú quieras", "Aquí tienes la vuelta", "Diez euros"]), shadowLine: "Aquí tienes la vuelta." },
  { id: "p6", text: "Sara nota un problema. Dice: “Perdona, creo que falta cambio. Me falta un euro de cambio”. No se enfada; explica el error con educación.", translation: "سارة لاحظات مشكل. قالت بأدب بلي كتظن الصرف ناقص وناقصها أورو واحد. ما تعصباتش وشرحات الغلط مزيان.", highlights: highlights(["Perdona, creo que falta cambio", "Me falta un euro de cambio"]), shadowLine: "Perdona, me falta un euro de cambio." },
  { id: "p7", text: "El vendedor comprueba el ticket y responde: “Aro, tienes razón. Toma, un euro”. Sara vuelve a contar y dice: “Ahora sí”.", translation: "البائع راجع التيكي وقال طبعا عندك الحق وهاك أورو واحد. سارة عاودات حسبات وقالت دابا مزيان.", highlights: highlights(["Aro", "Toma", "Un euro", "Ahora sí"]), shadowLine: "Toma, un euro. Ahora sí." },
  { id: "p8", text: "Antes de salir, Sara compra dos zumos por dos eurillos. Luego termina la compra: “Pues nada, gracias”. El vendedor responde: “De ná, mi arma”.", translation: "قبل ما تخرج، سارة شرات جوج عصائر بجوج أوريّات. من بعد سالات الشرا بالشكر والبائع جاوبها على والو آ العزيزة.", highlights: highlights(["Dos eurillos", "Pues nada, gracias", "De ná", "mi arma"]), shadowLine: "Pues nada, gracias. De ná, mi arma." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "payment-reading-q1", type: "multiple-choice", prompt: "شنو شرات سارة فاللول؟", options: ["جوج ديال الحوايج", "حاجة وحدة", "ما شرات والو"], correctAnswer: "جوج ديال الحوايج", explanation: "قالت Quiero los dos.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "payment-reading-q2", type: "multiple-choice", prompt: "علاش ما خلصاتش سارة بالكارت؟", options: ["الماكينة ما فيهاش الشبكة", "ما عندهاش الكارت", "البائع ما كياخدش الفلوس"], correctAnswer: "الماكينة ما فيهاش الشبكة", explanation: "النص كيقول بلي الماكينة ما عندهاش الاتصال.", points: 1, skillTag: "السبب" },
  { id: "payment-reading-q3", type: "true-false", prompt: "صح ولا خطأ: سارة خلصات بعشرة أورو كاش.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "قالت Tengo diez euros وPago en efectivo.", points: 1, skillTag: "الخلاص" },
  { id: "payment-reading-q4", type: "multiple-choice", prompt: "شحال كان ناقص فالصرف؟", options: ["أورو واحد", "جوج أورو", "خمسة أورو"], correctAnswer: "أورو واحد", explanation: "قالت Me falta un euro de cambio.", points: 1, skillTag: "الصرف" },
  { id: "payment-reading-q5", type: "multiple-choice", prompt: "شنو دارت سارة ملي لاحظات الغلط؟", options: ["شرحات المشكل بأدب", "خرجات بلا ما تقول والو", "بدلات الدكان"], correctAnswer: "شرحات المشكل بأدب", explanation: "بدات بـ Perdona ووضحات شحال ناقص.", points: 1, skillTag: "التصرف المناسب" },
];

export const andalusianSpanishA1NumbersPricesPaymentDarijaReading: ReadingComprehension = {
  id: `${courseId}-reading`, title: "القراءة بالصوت: راجع الصرف قبل ما تمشي", subtitle: "سمع وقرا معاملة كاملة فيها الأثمنة، الكارت، الكاش وتصحيح الصرف.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "reading", "payment"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "reading",
  data: { targetLanguage: "spanish", audioUrl: `/audio/readings/${courseId}/full.mp3`, audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`, paragraphs: readingParagraphs, glossary: paymentVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })), questions: readingQuestions },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "ربط كل عبارة إسبانية بالمعنى الصحيح ديالها بالدارجة.", points: items.length, skillTag: "ربط العبارات" };
}

export const andalusianSpanishA1NumbersPricesPaymentDarijaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`, title: "الكويز النهائي: الأرقام، الثمن والخلص", subtitle: "اختار العبارة الصحيحة فمواقف جديدة ديال الشرا والخلاص والصرف.",
  languageTarget: "spanish", learnerNativeLanguage: "darija", level: "beginner", tags: ["Andalusian Spanish", "A1", "Darija", "quiz", "payment"], estimatedMinutes: 14,
  skoolSectionName: sectionName, relatedCourse: courseId, activityType: "quiz",
  data: {
    description: "هاد الكويز كيشوف واش تقدر تفهم الأثمنة وتتصرف فالدكان بلا ما يعتمد على أحداث القصة.", passScore: 75, feedbackMode: "immediate",
    questions: [
      { id: "payment-quiz-1", type: "multiple-choice", prompt: "بغيتي تعرف ثمن حاجة وحدة. شنو تسول؟", options: ["¿Cuánto cuesta?", "¿Algo más?", "¿Pago aquí?", "Ahora sí"], correctAnswer: "¿Cuánto cuesta?", explanation: "هاد السؤال كيسول على ثمن حاجة.", points: 1, skillTag: "الثمن" },
      { id: "payment-quiz-2", type: "multiple-choice", prompt: "بغيتي تعرف المجموع النهائي. شنو تسول؟", options: ["¿Cuánto es?", "¿Tienes cambio?", "¿Algo más?", "Toma"], correctAnswer: "¿Cuánto es?", explanation: "كتعني شحال المجموع.", points: 1, skillTag: "المجموع" },
      { id: "payment-quiz-3", type: "order-words", prompt: "رتّب: هادا بخمسة أورو.", wordBank: ["Esto", "cuesta", "cinco", "euros"], correctAnswer: "Esto cuesta cinco euros", explanation: "cuesta كتربط الحاجة بالثمن.", points: 1, skillTag: "بناء الجملة" },
      { id: "payment-quiz-4", type: "true-false", prompt: "صح ولا خطأ: “Dos euros con cincuenta” هي جوج أورو ونص.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "cincuenta هي خمسين سنتيم.", points: 1, skillTag: "الأرقام" },
      { id: "payment-quiz-5", type: "multiple-choice", prompt: "بغيتي جوج ديال الحوايج. شنو تقول؟", options: ["Ponme los dos, porfa", "No, esto na' más", "Me falta un euro", "De ná"], correctAnswer: "Ponme los dos, porfa", explanation: "كتطلب يعطيك بجوج.", points: 1, skillTag: "الطلب" },
      { id: "payment-quiz-6", type: "multiple-choice", prompt: "بغيتي تخلص بالكارت. شنو تسول؟", options: ["¿Puedo pagar con tarjeta?", "¿Tienes cambio de veinte?", "¿Cuánto cuesta?", "¿Algo más?"], correctAnswer: "¿Puedo pagar con tarjeta?", explanation: "هاد السؤال كيتأكد واش الكارت مقبولة.", points: 1, skillTag: "الخلاص" },
      { id: "payment-quiz-7", type: "fill-blank", prompt: "كمّل: Pago en ______.", nativePrompt: "غادي نخلص بالكاش", correctAnswer: "efectivo", explanation: "en efectivo كتعني بالكاش.", points: 1, skillTag: "الكلمات" },
      { id: "payment-quiz-8", type: "multiple-choice", prompt: "عندك ورقة عشرين وبغيتي الفكة. شنو تقول؟", options: ["¿Tienes cambio de veinte?", "Tengo diez euros", "¿Pago aquí?", "Como tú quieras"], correctAnswer: "¿Tienes cambio de veinte?", explanation: "كتسول واش يقدر يصرف ليك عشرين.", points: 1, skillTag: "الفكة" },
      { id: "payment-quiz-9", type: "true-false", prompt: "صح ولا خطأ: “Aquí tienes la vuelta” كتعني ها هو الصرف ديالك.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "la vuelta هي الصرف فهاد السياق.", points: 1, skillTag: "الصرف" },
      { id: "payment-quiz-10", type: "multiple-choice", prompt: "لقيتي الصرف ناقص. شنو أحسن بداية مؤدبة؟", options: ["Perdona, creo que falta cambio", "Quiero los dos", "¿Algo más?", "Dos eurillos"], correctAnswer: "Perdona, creo que falta cambio", explanation: "Perdona كتخلي التصحيح مؤدب وهادئ.", points: 1, skillTag: "تصحيح الغلط" },
      pairQuestion("payment-quiz-11", "ربط الأثمنة بالمعاني ديالها.", paymentVocab.slice(0, 4)),
      pairQuestion("payment-quiz-12", "ربط عبارات الطلب والخلاص بالمعاني ديالها.", [paymentVocab[9], paymentVocab[10], paymentVocab[14], paymentVocab[15]]),
      pairQuestion("payment-quiz-13", "ربط عبارات الصرف وتصحيح الغلط بالمعاني ديالها.", [paymentVocab[20], paymentVocab[22], paymentVocab[23], paymentVocab[24]]),
    ],
  },
};
