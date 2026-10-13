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

const courseId = "andalusian-spanish-a1-ordering-coffee-breakfast-darija";
const sectionName = "الإسبانية الأندلسية A1 - طلب القهوة والفطور";
const specialCharacters = ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"];

const coffeeVocab: VocabItem[] = [
  { id: "que-te-pongo", term: "¿Qué te pongo?", meaning: "شنو نحطّ ليك؟ / شنو بغيتي؟", note: "سؤال عادي كيسولو النادل باش يعرف الطلب.", example: "Buenas, ¿qué te pongo?", translation: "سلام، شنو بغيتي؟" },
  { id: "cafe-con-leche", term: "Ponme un café con leche, porfa", meaning: "عطيني قهوة بالحليب عافاك", note: "طلب يومي وبسيط فالقهوة.", example: "Ponme un café con leche, porfa.", translation: "عطيني قهوة بالحليب عافاك." },
  { id: "cafe-solo", term: "Un café solo", meaning: "قهوة بوحدها / قهوة كحلة", note: "قهوة بلا حليب.", example: "Para mí, un café solo.", translation: "بالنسبة ليا، قهوة كحلة." },
  { id: "cortado", term: "Un cortado", meaning: "قهوة بشوية ديال الحليب", note: "قهوة قصيرة فيها شوية ديال الحليب.", example: "Yo quiero un cortado.", translation: "أنا بغيت قهوة بشوية ديال الحليب." },
  { id: "vaso-agua", term: "Un vaso de agua", meaning: "كاس ديال الما", note: "كاس واحد ديال الما.", example: "Y un vaso de agua, porfa.", translation: "وزيد كاس ديال الما عافاك." },
  { id: "botella-agua", term: "Una botella de agua", meaning: "بوطيلة ديال الما", note: "بوطيلة كاملة ديال الما.", example: "Ponme una botella de agua.", translation: "عطيني بوطيلة ديال الما." },
  { id: "media-tostada", term: "Media tostada", meaning: "نص توسطادا", note: "نص حصة ديال الخبز المحمّر.", example: "Quiero media tostada.", translation: "بغيت نص توسطادا." },
  { id: "tostada-entera", term: "Una tostada entera", meaning: "توسطادا كاملة", note: "الحصة كاملة ديال الخبز المحمّر.", example: "Ponme una tostada entera.", translation: "عطيني توسطادا كاملة." },
  { id: "aceite-tomate", term: "Con aceite y tomate", meaning: "بالزيت والطماطم", note: "طريقة فطور معروفة بزاف فالأندلس.", example: "La tostada, con aceite y tomate.", translation: "التوسطادا بالزيت والطماطم." },
  { id: "churros", term: "Unos churros", meaning: "شوروس", note: "كتطلب كمية صغيرة باستعمال unos.", example: "También quiero unos churros.", translation: "بغيت حتى شوية ديال الشوروس." },
  { id: "mollete", term: "Un mollete con aceite y tomate", meaning: "مولّيتي بالزيت والطماطم", note: "mollete خبز أندلسي طري كيتاكل بزاف فالفطور.", example: "Ponme un mollete con aceite y tomate.", translation: "عطيني مولّيتي بالزيت والطماطم." },
  { id: "bocadillo", term: "Un bocadillo", meaning: "بوكاديو / ساندويتش فالخبز", note: "ساندويتش فالخبز الطويل.", example: "Para después, un bocadillo.", translation: "لمن بعد، بغيت بوكاديو." },
  { id: "quiero-entera", term: "La quiero entera", meaning: "بغيتها كاملة", note: "La كترجع للحاجة المؤنثة بحال tostada.", example: "La tostada la quiero entera.", translation: "التوسطادا بغيتها كاملة." },
  { id: "entera-media", term: "¿Entera o media?", meaning: "كاملة ولا نص؟", note: "النادل كيتأكد من الحجم.", example: "¿La tostada entera o media?", translation: "التوسطادا كاملة ولا نص؟" },
  { id: "media-porfa", term: "Media, porfa", meaning: "نص عافاك", note: "جواب قصير وطبيعي.", example: "Media, porfa, que no tengo mucha hambre.", translation: "نص عافاك، ما فياش الجوع بزاف." },
  { id: "algo-mas", term: "¿Algo más?", meaning: "شي حاجة أخرى؟", note: "سؤال باش يكمل النادل الطلب.", example: "¿Algo más para desayunar?", translation: "شي حاجة أخرى للفطور؟" },
  { id: "esto-na-mas", term: "No, esto na' más", meaning: "لا، غير هادا", note: "na' más نطق أندلسي دارج لـ nada más.", example: "No, esto na' más, gracias.", translation: "لا، غير هادا، شكرا." },
  { id: "zumo-naranja", term: "Un zumo de naranja", meaning: "عصير البرتقال", note: "طلب شائع مع الفطور.", example: "Y un zumo de naranja.", translation: "وزيد عصير البرتقال." },
  { id: "sin-azucar", term: "Sin azúcar", meaning: "بلا السكر", note: "كتحدد بلي ما بغيتيش السكر.", example: "El café, sin azúcar.", translation: "القهوة بلا السكر." },
  { id: "con-azucar", term: "Con azúcar", meaning: "بالسكر", note: "كتحدد بلي بغيتي السكر.", example: "Para ella, con azúcar.", translation: "بالنسبة ليها، بالسكر." },
  { id: "aro", term: "Aro", meaning: "طبعا / أكيد", note: "نطق أندلسي دارج لـ claro.", example: "—¿Aquí? —Aro.", translation: "—هنا؟ —طبعا." },
  { id: "ahora-mismo", term: "Ahora mismo", meaning: "دابا / دابا دابا", note: "كتعني أن الخدمة غادي تكون دابا.", example: "Te lo pongo ahora mismo.", translation: "غادي نوجدها ليك دابا." },
  { id: "enseguida", term: "Enseguida", meaning: "دابا نجيبه ليك / فالحين", note: "وعد بخدمة سريعة.", example: "Enseguida te traigo el café.", translation: "فالحين نجيب ليك القهوة." },
  { id: "aqui-llevar", term: "¿Aquí o pa' llevar?", meaning: "هنا ولا غادي تاخدو معاك؟", note: "pa' هي طريقة نطق سريعة لـ para.", example: "¿El bocadillo aquí o pa' llevar?", translation: "البوكاديو هنا ولا غادي تاخدو معاك؟" },
  { id: "aqui", term: "Aquí", meaning: "هنا", note: "جواب قصير باش تقول غادي تاكل فالمحل.", example: "Aquí, por favor.", translation: "هنا عافاك." },
  { id: "pa-llevar", term: "Pa' llevar", meaning: "ناخدو معايا / للتيك أواي", note: "كتقولها ملي بغيتي الطلب معاك.", example: "El bocadillo, pa' llevar.", translation: "البوكاديو ناخدو معايا." },
  { id: "momentito", term: "Un momentito", meaning: "غير واحد اللحظة", note: "تصغير ودّي لـ un momento.", example: "Un momentito y sale la tostada.", translation: "غير واحد اللحظة وتوجد التوسطادا." },
  { id: "aproveche", term: "Que aproveche", meaning: "بالصحة", note: "كتتقال ملي كيتقدم الماكلة.", example: "Aquí tienes. Que aproveche.", translation: "ها هي. بالصحة." },
  { id: "muy-bueno", term: "Está muy bueno", meaning: "راه بنين بزاف", note: "كتعبّر على الإعجاب بالماكلة أو الشراب.", example: "El mollete está muy bueno.", translation: "المولّيتي بنين بزاف." },
  { id: "poquito-mas", term: "Un poquito más, porfa", meaning: "شوية زيادة عافاك", note: "طلب صغير ومؤدب لزيادة شي حاجة.", example: "Un poquito más de tomate, porfa.", translation: "شوية زيادة ديال الطماطم عافاك." },
  { id: "aqui-tienes", term: "Aquí tienes", meaning: "ها هو / تفضل", note: "كتتقال ملي كتعطي شي حاجة.", example: "Aquí tienes el café.", translation: "ها هي القهوة." },
  { id: "cuenta", term: "La cuenta, porfa", meaning: "الحساب عافاك", note: "طلب الحساب بطريقة يومية.", example: "Cuando puedas, la cuenta, porfa.", translation: "ملي تقدر، الحساب عافاك." },
  { id: "cuanto-es", term: "¿Cuánto es?", meaning: "شحال المجموع؟", note: "سؤال على المجموع النهائي.", example: "La cuenta, porfa. ¿Cuánto es?", translation: "الحساب عافاك. شحال المجموع؟" },
  { id: "tarjeta", term: "¿Puedo pagar con tarjeta?", meaning: "نقدر نخلص بالكارت؟", note: "كتسول واش الأداء بالكارت ممكن.", example: "¿Puedo pagar con tarjeta aquí?", translation: "نقدر نخلص بالكارت هنا؟" },
  { id: "efectivo", term: "Pago en efectivo", meaning: "غادي نخلص بالكاش", note: "en efectivo كتعني بالنقود.", example: "Si quieres, pago en efectivo.", translation: "إلا بغيتي، نخلص بالكاش." },
  { id: "gracias", term: "Muchas gracias", meaning: "شكرا بزاف", note: "شكر واضح ومؤدب.", example: "Muchas gracias por todo.", translation: "شكرا بزاف على كلشي." },
  { id: "de-na", term: "De ná", meaning: "على والو", note: "نطق أندلسي دارج لـ de nada.", example: "—Muchas gracias. —De ná.", translation: "—شكرا بزاف. —على والو." },
  { id: "mi-arma", term: "Mi arma", meaning: "آ الحبيب / آ العزيز", note: "نداء أندلسي دافئ جاي من mi alma.", example: "De ná, mi arma.", translation: "على والو، آ العزيز." },
  { id: "que-va", term: "Qué va", meaning: "لا لا / ماشي هكا / بالعكس", note: "رد طبيعي للنفي أو لتصحيح فكرة.", example: "—¿Es mucha molestia? —Qué va.", translation: "—غادي نعطلك؟ —لا لا." },
  { id: "vaya-bien", term: "Que vaya bien", meaning: "نهارك مبروك / الله يعاونك / دوز مزيان", note: "تحية وداع طبيعية.", example: "Muchas gracias. Que vaya bien.", translation: "شكرا بزاف. نهارك مبروك." },
];

const highlightMap = Object.fromEntries(coffeeVocab.map((item) => [item.term, { phrase: item.term, meaning: item.meaning, note: item.note }]));
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

export const andalusianSpanishA1OrderingCoffeeBreakfastDarijaFlashcardDeck: FlashcardDeck = {
  id: `${courseId}-flashcards`,
  title: "بطاقات A1: طلب القهوة والفطور",
  subtitle: "راجع كيفاش تطلب القهوة، الفطور، الحساب والخلاص بالإسبانية الأندلسية.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "coffee", "breakfast"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "flashcards",
  data: { cards: coffeeVocab.map(cardFromVocab), specialCharacters },
};

const sentenceStages: SentenceStage[] = [
  { id: "stage-1", title: "طلب القهوة", newVocab: ["¿Qué te pongo? = شنو بغيتي؟", "Ponme un café con leche, porfa = عطيني قهوة بالحليب عافاك", "Un café solo = قهوة كحلة", "Un cortado = قهوة بشوية حليب"], fullVocab: ["¿Qué te pongo?", "Ponme un café con leche, porfa", "Un café solo", "Un cortado"], prompt: "قول: عطيني قهوة بالحليب وقهوة كحلة عافاك.", targetAnswer: "Ponme un café con leche y un café solo, porfa.", acceptedAnswers: ["Un café con leche y un café solo, porfa."], explanation: "Ponme كتستعملها بزاف فالطلبات اليومية.", audioUrl: `/audio/sentence-builder/${courseId}/stage-1.mp3`, wordBreakdown: [{ source: "Ponme", target: "عطيني" }, { source: "un café con leche", target: "قهوة بالحليب" }, { source: "porfa", target: "عافاك" }] },
  { id: "stage-2", title: "الما والسكر", newVocab: ["Un vaso de agua = كاس ديال الما", "Una botella de agua = بوطيلة ديال الما", "Sin azúcar = بلا السكر", "Con azúcar = بالسكر"], fullVocab: ["Un vaso de agua", "Una botella de agua", "Sin azúcar", "Con azúcar"], prompt: "قول: بغيت قهوة بلا السكر وبوطيلة ديال الما.", targetAnswer: "Quiero un café sin azúcar y una botella de agua.", acceptedAnswers: ["Un café sin azúcar y una botella de agua, porfa."], explanation: "sin كتعني بلا، وcon كتعني بـ.", audioUrl: `/audio/sentence-builder/${courseId}/stage-2.mp3`, wordBreakdown: [{ source: "sin azúcar", target: "بلا السكر" }, { source: "una botella", target: "بوطيلة" }, { source: "de agua", target: "ديال الما" }] },
  { id: "stage-3", title: "التوسطادا", newVocab: ["Media tostada = نص توسطادا", "Una tostada entera = توسطادا كاملة", "Con aceite y tomate = بالزيت والطماطم"], fullVocab: ["Media tostada", "Una tostada entera", "Con aceite y tomate"], prompt: "قول: عطيني نص توسطادا بالزيت والطماطم.", targetAnswer: "Ponme media tostada con aceite y tomate.", acceptedAnswers: ["Media tostada con aceite y tomate, porfa."], explanation: "كتقدر تزيد con باش تحدد شنو بغيتي فوق التوسطادا.", audioUrl: `/audio/sentence-builder/${courseId}/stage-3.mp3`, wordBreakdown: [{ source: "media tostada", target: "نص توسطادا" }, { source: "con aceite", target: "بالزيت" }, { source: "y tomate", target: "والطماطم" }] },
  { id: "stage-4", title: "فطور أندلسي", newVocab: ["Unos churros = شوروس", "Un mollete con aceite y tomate = مولّيتي بالزيت والطماطم", "Un bocadillo = بوكاديو", "Un zumo de naranja = عصير البرتقال"], fullVocab: ["Unos churros", "Un mollete con aceite y tomate", "Un bocadillo", "Un zumo de naranja"], prompt: "قول: بغيت مولّيتي بالزيت والطماطم وعصير البرتقال.", targetAnswer: "Quiero un mollete con aceite y tomate y un zumo de naranja.", acceptedAnswers: ["Ponme un mollete con aceite y tomate y un zumo de naranja."], explanation: "هاد تركيب بسيط باش تجمع جوج طلبات بـ y.", audioUrl: `/audio/sentence-builder/${courseId}/stage-4.mp3`, wordBreakdown: [{ source: "un mollete", target: "مولّيتي" }, { source: "con aceite y tomate", target: "بالزيت والطماطم" }, { source: "un zumo de naranja", target: "عصير البرتقال" }] },
  { id: "stage-5", title: "كاملة ولا نص", newVocab: ["¿Entera o media? = كاملة ولا نص؟", "La quiero entera = بغيتها كاملة", "Media, porfa = نص عافاك"], fullVocab: ["¿Entera o media?", "La quiero entera", "Media, porfa"], prompt: "جاوب: بغيت التوسطادا كاملة.", targetAnswer: "La tostada la quiero entera, porfa.", acceptedAnswers: ["La quiero entera, porfa.", "Entera, porfa."], explanation: "La كترجع لـ la tostada بلا ما تعاود الاسم كامل.", audioUrl: `/audio/sentence-builder/${courseId}/stage-5.mp3`, wordBreakdown: [{ source: "La tostada", target: "التوسطادا" }, { source: "la quiero", target: "بغيتها" }, { source: "entera", target: "كاملة" }] },
  { id: "stage-6", title: "هنا ولا معاك", newVocab: ["¿Aquí o pa' llevar? = هنا ولا معاك؟", "Aquí = هنا", "Pa' llevar = ناخدو معايا", "¿Algo más? = شي حاجة أخرى؟", "No, esto na' más = لا غير هادا"], fullVocab: ["¿Aquí o pa' llevar?", "Aquí", "Pa' llevar", "¿Algo más?", "No, esto na' más"], prompt: "قول: القهوة هنا، والبوكاديو ناخدو معايا. لا، غير هادا.", targetAnswer: "El café aquí y el bocadillo pa' llevar. No, esto na' más.", acceptedAnswers: ["Aquí el café y el bocadillo para llevar. Nada más."], explanation: "pa' llevar هي الصيغة السريعة والعامية ديال para llevar.", audioUrl: `/audio/sentence-builder/${courseId}/stage-6.mp3`, wordBreakdown: [{ source: "aquí", target: "هنا" }, { source: "pa' llevar", target: "ناخدو معايا" }, { source: "na' más", target: "غير هادا" }] },
  { id: "stage-7", title: "الخدمة والأكل", newVocab: ["Ahora mismo = دابا", "Enseguida = فالحين", "Un momentito = غير واحد اللحظة", "Que aproveche = بالصحة", "Está muy bueno = بنين بزاف", "Un poquito más, porfa = شوية زيادة عافاك"], fullVocab: ["Ahora mismo", "Enseguida", "Un momentito", "Que aproveche", "Está muy bueno", "Un poquito más, porfa", "Aquí tienes"], prompt: "قول: المولّيتي بنين بزاف. شوية زيادة ديال الطماطم عافاك.", targetAnswer: "El mollete está muy bueno. Un poquito más de tomate, porfa.", acceptedAnswers: ["Está muy bueno. Un poquito más de tomate, porfa."], explanation: "un poquito más كتطلب بها زيادة صغيرة وبأدب.", audioUrl: `/audio/sentence-builder/${courseId}/stage-7.mp3`, wordBreakdown: [{ source: "está muy bueno", target: "بنين بزاف" }, { source: "un poquito más", target: "شوية زيادة" }, { source: "de tomate", target: "ديال الطماطم" }] },
  { id: "stage-8", title: "الحساب والوداع", newVocab: ["La cuenta, porfa = الحساب عافاك", "¿Cuánto es? = شحال المجموع؟", "¿Puedo pagar con tarjeta? = نقدر نخلص بالكارت؟", "Pago en efectivo = نخلص بالكاش", "De ná, mi arma = على والو آ العزيز", "Que vaya bien = نهارك مبروك"], fullVocab: coffeeVocab.map((item) => `${item.term} = ${item.meaning}`), prompt: "قول: الحساب عافاك. شحال المجموع؟ نقدر نخلص بالكارت؟ شكرا بزاف.", targetAnswer: "La cuenta, porfa. ¿Cuánto es? ¿Puedo pagar con tarjeta? Muchas gracias.", acceptedAnswers: ["La cuenta, por favor. ¿Cuánto es? ¿Puedo pagar con tarjeta? Gracias."], explanation: "هاد المرحلة كتجمع نهاية طبيعية ديال الطلب من الحساب حتى الشكر.", audioUrl: `/audio/sentence-builder/${courseId}/stage-8.mp3`, wordBreakdown: [{ source: "La cuenta", target: "الحساب" }, { source: "¿Cuánto es?", target: "شحال المجموع؟" }, { source: "pagar con tarjeta", target: "نخلص بالكارت" }] },
];

export const andalusianSpanishA1OrderingCoffeeBreakfastDarijaSentenceBuilder: SentenceBuilderLesson = {
  id: `${courseId}-sentence-builder`,
  title: "بنّي الجمل: طلب الفطور من البداية للنهاية",
  subtitle: "ركّب الطلب ديالك، اختار الحجم، وحدد هنا ولا معاك، ومن بعد طلب الحساب.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "sentence builder", "coffee"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "sentence-builder",
  data: { stages: sentenceStages, finalChallenge: "دير طلب كامل بالإسبانية: اختار القهوة والفطور، جاوب واش كاملة ولا نص، قول هنا ولا معاك، وطلب الحساب وطريقة الخلاص." },
};

const storyQuestions: CheckpointQuestion[] = [
  { id: "coffee-story-q1", type: "multiple-choice", prompt: "شنو طلب يوسف فالبداية؟", options: ["قهوة بالحليب وكاس ديال الما", "قهوة كحلة وشوروس", "غير عصير البرتقال"], correctAnswer: "قهوة بالحليب وكاس ديال الما", explanation: "فالرسالتين 2 و3 طلب café con leche وvaso de agua.", points: 1, skillTag: "الطلب الأول" },
  { id: "coffee-story-q2", type: "multiple-choice", prompt: "كيفاش طلب يوسف التوسطادا؟", options: ["نص وبالزيت والطماطم", "كاملة وبلا طماطم", "ناخدها معايا"], correctAnswer: "نص وبالزيت والطماطم", explanation: "قال Media, porfa وCon aceite y tomate.", points: 1, skillTag: "الفطور" },
  { id: "coffee-story-q3", type: "true-false", prompt: "صح ولا خطأ: يوسف زاد عصير البرتقال فالطلب.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "فالرسالة 8 طلب un zumo de naranja.", points: 1, skillTag: "فهم الطلب" },
  { id: "coffee-story-q4", type: "multiple-choice", prompt: "شنو الحاجة اللي بغا يوسف ياخد معاه؟", options: ["البوكاديو", "القهوة", "كاس الما"], correctAnswer: "البوكاديو", explanation: "قال El bocadillo, pa' llevar.", points: 1, skillTag: "هنا ولا معاك" },
  { id: "coffee-story-q5", type: "multiple-choice", prompt: "شنو قالت كارمن على وقت تحضير الطلب؟", options: ["غير واحد اللحظة وغادي توجد دابا", "خاصو يرجع غدا", "ما كاينش الفطور"], correctAnswer: "غير واحد اللحظة وغادي توجد دابا", explanation: "استعملات Un momentito وAhora mismo.", points: 1, skillTag: "الخدمة" },
  { id: "coffee-story-q6", type: "multiple-choice", prompt: "شنو عجب يوسف بزاف؟", options: ["المولّيتي", "الحساب", "البوطيلة"], correctAnswer: "المولّيتي", explanation: "قال El mollete está muy bueno.", points: 1, skillTag: "رد الفعل" },
  { id: "coffee-story-q7", type: "true-false", prompt: "صح ولا خطأ: يوسف طلب الحساب من بعد ما كمل الفطور.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "فالرسالة 20 قال La cuenta, porfa.", points: 1, skillTag: "الحساب" },
  { id: "coffee-story-q8", type: "multiple-choice", prompt: "كيفاش خلص يوسف؟", options: ["بالكاش", "بالكارت", "ما خلصش"], correctAnswer: "بالكاش", explanation: "قال Pago en efectivo من بعد ما ما خدمتش الكارت.", points: 1, skillTag: "الخلاص" },
  { id: "coffee-story-q9", type: "multiple-choice", prompt: "علاش عيطات كارمن ليوسف قبل ما يخرج؟", options: ["نسي بوطيلة الما", "نسي يطلب القهوة", "بغا يزيد شوروس"], correctAnswer: "نسي بوطيلة الما", explanation: "فالرسالة 26 قالت بلي البوطيلة بقات فوق البار.", points: 1, skillTag: "تفصيل القصة" },
  { id: "coffee-story-q10", type: "multiple-choice", prompt: "كيفاش سالات المحادثة؟", options: ["بالشكر وتحية الوداع", "بمشكل فالثمن", "بطلب جديد"], correctAnswer: "بالشكر وتحية الوداع", explanation: "يوسف شكر وكارمن قالت De ná, mi arma. Que vaya bien.", points: 1, skillTag: "النهاية" },
];

export const andalusianSpanishA1OrderingCoffeeBreakfastDarijaWhatsAppStory: WhatsAppStory = {
  id: `${courseId}-story`,
  title: "القصة: الفطور قبل أول نهار فالخدمة",
  subtitle: "يوسف داخل مستعجل لقهوة أندلسية، كيدير طلب كامل وكيلحق ياخد البوكاديو معاه.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "story", "breakfast"],
  estimatedMinutes: 18,
  skoolSectionName: sectionName,
  relatedCourse: `${courseId}-flashcards`,
  activityType: "story",
  data: {
    targetLanguage: "spanish",
    nativeLanguage: "darija",
    characters: [
      { id: "youssef", name: "Youssef", initials: "YO", side: "right", color: "cyan" },
      { id: "carmen", name: "Carmen", initials: "CA", side: "left", color: "violet" },
    ],
    messages: [
      message("m1", "carmen", "Buenas, ¿qué te pongo?", "سلام، شنو بغيتي؟", ["¿Qué te pongo?"]),
      message("m2", "youssef", "Ponme un café con leche, porfa.", "عطيني قهوة بالحليب عافاك.", ["Ponme un café con leche, porfa"]),
      message("m3", "youssef", "Y un vaso de agua, porfa.", "وزيد كاس ديال الما عافاك.", ["Un vaso de agua"], "voice-note"),
      message("m4", "carmen", "Aro. ¿Quieres algo de comer?", "طبعا. بغيتي شي حاجة تاكل؟", ["Aro"]),
      message("m5", "youssef", "Sí. Media tostada, porfa.", "إييه. نص توسطادا عافاك.", ["Media tostada", "Media, porfa"]),
      message("m6", "youssef", "Con aceite y tomate.", "بالزيت والطماطم.", ["Con aceite y tomate"], "voice-note"),
      message("m7", "carmen", "También tenemos churros y zumo.", "عندنا حتى الشوروس والعصير.", ["Unos churros"]),
      message("m8", "youssef", "Entonces, un zumo de naranja.", "إيوا زيد عصير البرتقال.", ["Un zumo de naranja"]),
      message("m9", "carmen", "¿Con azúcar o sin azúcar?", "بالسكر ولا بلا السكر؟", ["Con azúcar", "Sin azúcar"]),
      message("m10", "youssef", "El café sin azúcar, porfa.", "القهوة بلا السكر عافاك.", ["Sin azúcar"]),
      message("m11", "youssef", "Y ponme un bocadillo para después.", "وزيد عطيني بوكاديو لمن بعد.", ["Un bocadillo"]),
      message("m12", "carmen", "¿El bocadillo aquí o pa' llevar?", "البوكاديو هنا ولا غادي تاخدو معاك؟", ["¿Aquí o pa' llevar?"], "voice-note"),
      message("m13", "youssef", "El café aquí y el bocadillo pa' llevar.", "القهوة هنا والبوكاديو ناخدو معايا.", ["Aquí", "Pa' llevar"]),
      message("m14", "carmen", "Perfecto. ¿Algo más?", "مزيان. شي حاجة أخرى؟", ["¿Algo más?"]),
      message("m15", "youssef", "No, esto na' más.", "لا، غير هادا.", ["No, esto na' más"]),
      message("m16", "carmen", "Un momentito. La tostada sale ahora mismo.", "غير واحد اللحظة. التوسطادا غادي توجد دابا.", ["Un momentito", "Ahora mismo"]),
      message("m17", "carmen", "Aquí tienes el café y el zumo.", "ها هي القهوة والعصير.", ["Aquí tienes"]),
      message("m18", "carmen", "Enseguida te traigo la tostada. Que aproveche.", "فالحين نجيب ليك التوسطادا. بالصحة.", ["Enseguida", "Que aproveche"], "voice-note"),
      message("m19", "youssef", "El mollete está muy bueno. Un poquito más de tomate, porfa.", "المولّيتي بنين بزاف. شوية زيادة ديال الطماطم عافاك.", ["Está muy bueno", "Un poquito más, porfa"]),
      message("m20", "youssef", "Cuando puedas, la cuenta, porfa.", "ملي تقدري، الحساب عافاك.", ["La cuenta, porfa"]),
      message("m21", "carmen", "Aro. Son nueve euros. ¿Tarjeta o efectivo?", "طبعا. تسعة أورو. الكارت ولا الكاش؟", ["Aro"]),
      message("m22", "youssef", "¿Puedo pagar con tarjeta?", "نقدر نخلص بالكارت؟", ["¿Puedo pagar con tarjeta?"]),
      message("m23", "carmen", "Qué va, hoy no funciona la máquina.", "لا لا، اليوم الماكينة ما خداماش.", ["Qué va"]),
      message("m24", "youssef", "No pasa nada. Pago en efectivo. ¿Cuánto es?", "ما كاين باس. غادي نخلص بالكاش. شحال المجموع؟", ["Pago en efectivo", "¿Cuánto es?"], "voice-note"),
      message("m25", "carmen", "Nueve euros. Aquí tienes el bocadillo.", "تسعة أورو. ها هو البوكاديو.", ["Aquí tienes"]),
      message("m26", "carmen", "¡Un momentito! Tu botella de agua está en la barra.", "غير واحد اللحظة! بوطيلة الما ديالك باقية فوق البار.", ["Un momentito", "Una botella de agua"]),
      message("m27", "youssef", "Es verdad. Muchas gracias.", "صح. شكرا بزاف.", ["Muchas gracias"]),
      message("m28", "carmen", "¿Te la llevas también?", "غادي تاخدها حتى هي معاك؟", []),
      message("m29", "youssef", "Sí, pa' llevar. Gracias otra vez.", "إييه، ناخدها معايا. شكرا مرة أخرى.", ["Pa' llevar"]),
      message("m30", "carmen", "De ná, mi arma. Que vaya bien.", "على والو، آ العزيز. نهارك مبروك.", ["De ná", "Mi arma", "Que vaya bien"], "voice-note"),
    ],
    comprehensionChecks: storyQuestions.map((question, index) => ({ id: `coffee-story-check-${index + 1}`, afterMessageId: `m${(index + 1) * 3}`, question })),
    endQuiz: storyQuestions,
    learnedVocab: coffeeVocab.map((item) => item.term),
    finalReview: {
      keyPhrases: ["¿Qué te pongo?", "Ponme un café con leche, porfa", "¿Aquí o pa' llevar?", "La cuenta, porfa", "¿Puedo pagar con tarjeta?"],
      grammarPatterns: ["Ponme + طلب", "con / sin + مكوّن", "¿Aquí o pa' llevar?"],
      speakingPrompts: ["طلب قهوة وفطور.", "حدد كاملة ولا نص.", "قول هنا ولا معاك وطلب الحساب."],
    },
    completionTask: { title: "طلب كامل فالقهوة", instructions: "سجّل 45 ثانية بالإسبانية: سلّم، طلب قهوة وفطور، جاوب هنا ولا معاك، وطلب الحساب وطريقة الخلاص." },
  },
};

const readingParagraphs = [
  { id: "p1", text: "Youssef entra en una cafetería temprano. Carmen lo saluda y pregunta: “¿Qué te pongo?”. Él responde: “Ponme un café con leche, porfa, y un vaso de agua”.", translation: "يوسف دخل بكري لقهوة. كارمن سلمت عليه وسولاتو شنو بغا. هو طلب قهوة بالحليب وكاس ديال الما.", highlights: highlights(["¿Qué te pongo?", "Ponme un café con leche, porfa", "Un vaso de agua"]), shadowLine: "Ponme un café con leche, porfa, y un vaso de agua." },
  { id: "p2", text: "Para desayunar, Youssef pide: “Media tostada con aceite y tomate”. Carmen también le ofrece unos churros, un mollete y un zumo de naranja.", translation: "فالفطور، يوسف طلب نص توسطادا بالزيت والطماطم. كارمن عرضات عليه حتى الشوروس والمولّيتي وعصير البرتقال.", highlights: highlights(["Media tostada", "Con aceite y tomate", "Unos churros", "Un mollete con aceite y tomate", "Un zumo de naranja"]), shadowLine: "Media tostada con aceite y tomate." },
  { id: "p3", text: "Carmen pregunta: “¿Entera o media?”. Youssef confirma: “Media, porfa”. Después aclara que quiere el café sin azúcar.", translation: "كارمن سولاتو كاملة ولا نص. يوسف أكد بلي بغا نص، ومن بعد وضح بلي بغا القهوة بلا السكر.", highlights: highlights(["¿Entera o media?", "Media, porfa", "Sin azúcar"]), shadowLine: "¿Entera o media? Media, porfa." },
  { id: "p4", text: "Youssef necesita un bocadillo para más tarde. Carmen pregunta: “¿Aquí o pa' llevar?”. Él contesta: “El café aquí y el bocadillo pa' llevar”.", translation: "يوسف محتاج بوكاديو لمن بعد. كارمن سولاتو هنا ولا ياخدو معاه. هو قال القهوة هنا والبوكاديو معاه.", highlights: highlights(["Un bocadillo", "¿Aquí o pa' llevar?", "Aquí", "Pa' llevar"]), shadowLine: "El café aquí y el bocadillo pa' llevar." },
  { id: "p5", text: "Cuando Carmen pregunta “¿Algo más?”, Youssef responde: “No, esto na' más”. Ella dice: “Un momentito. Enseguida te lo traigo”.", translation: "ملي كارمن سولاتو واش بغا شي حاجة أخرى، يوسف قال لا غير هادا. هي قالت ليه غير واحد اللحظة وغادي تجيبو فالحين.", highlights: highlights(["¿Algo más?", "No, esto na' más", "Un momentito", "Enseguida"]), shadowLine: "No, esto na' más. Un momentito." },
  { id: "p6", text: "Carmen sirve el desayuno y dice: “Aquí tienes. Que aproveche”. Youssef prueba el mollete y responde: “Está muy bueno. Un poquito más de tomate, porfa”.", translation: "كارمن قدمات الفطور وقالت بالصحة. يوسف داق المولّيتي وقال بنين بزاف وطلب شوية زيادة ديال الطماطم.", highlights: highlights(["Aquí tienes", "Que aproveche", "Está muy bueno", "Un poquito más, porfa"]), shadowLine: "Está muy bueno. Un poquito más de tomate, porfa." },
  { id: "p7", text: "Al terminar, Youssef pide: “La cuenta, porfa. ¿Cuánto es? ¿Puedo pagar con tarjeta?”. La máquina no funciona, así que dice: “Pago en efectivo”.", translation: "ملي سالا، يوسف طلب الحساب وسول شحال المجموع وواش يقدر يخلص بالكارت. الماكينة ما خداماش وقرر يخلص بالكاش.", highlights: highlights(["La cuenta, porfa", "¿Cuánto es?", "¿Puedo pagar con tarjeta?", "Pago en efectivo"]), shadowLine: "La cuenta, porfa. ¿Puedo pagar con tarjeta?" },
  { id: "p8", text: "Antes de salir, Carmen le recuerda la botella de agua. Youssef dice: “Muchas gracias”. Ella responde: “De ná, mi arma. Que vaya bien”.", translation: "قبل ما يخرج، كارمن فكراتو فبوطيلة الما. يوسف شكرها وهي جاوباتو على والو آ العزيز ونهارك مبروك.", highlights: highlights(["Una botella de agua", "Muchas gracias", "De ná", "Mi arma", "Que vaya bien"]), shadowLine: "De ná, mi arma. Que vaya bien." },
];

const readingQuestions: CheckpointQuestion[] = [
  { id: "coffee-reading-q1", type: "multiple-choice", prompt: "شنو طلب يوسف يشرب فالبداية؟", options: ["قهوة بالحليب وكاس ديال الما", "قهوة كحلة فقط", "شوروس"], correctAnswer: "قهوة بالحليب وكاس ديال الما", explanation: "هاد الطلب مذكور فالفقرة اللولة.", points: 1, skillTag: "الفكرة الرئيسية" },
  { id: "coffee-reading-q2", type: "multiple-choice", prompt: "كيفاش بغا يوسف التوسطادا؟", options: ["نص وبالزيت والطماطم", "كاملة وبالسكر", "ناخدها معاه"], correctAnswer: "نص وبالزيت والطماطم", explanation: "قال Media tostada con aceite y tomate.", points: 1, skillTag: "تفاصيل الطلب" },
  { id: "coffee-reading-q3", type: "true-false", prompt: "صح ولا خطأ: يوسف بغا البوكاديو ياكلو تما.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "قال البوكاديو pa' llevar.", points: 1, skillTag: "هنا ولا معاك" },
  { id: "coffee-reading-q4", type: "multiple-choice", prompt: "علاش خلص يوسف بالكاش؟", options: ["الماكينة ما خداماش", "ما عندوش الكارت", "الحساب مجاني"], correctAnswer: "الماكينة ما خداماش", explanation: "النص كيقول بوضوح أن الماكينة ما خداماش.", points: 1, skillTag: "السبب" },
  { id: "coffee-reading-q5", type: "multiple-choice", prompt: "شنو فكرات كارمن يوسف قبل ما يخرج؟", options: ["بوطيلة الما", "التوسطادا", "السكر"], correctAnswer: "بوطيلة الما", explanation: "فكراتو فالبوطيلة قبل تحية الوداع.", points: 1, skillTag: "تفصيل النهاية" },
];

export const andalusianSpanishA1OrderingCoffeeBreakfastDarijaReading: ReadingComprehension = {
  id: `${courseId}-reading`,
  title: "القراءة بالصوت: فطور كامل فقهوة أندلسية",
  subtitle: "سمع وتبع الكلمات المضيئة فطلب طبيعي من السلام حتى الحساب والوداع.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "reading", "coffee"],
  estimatedMinutes: 14,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "reading",
  data: {
    targetLanguage: "spanish",
    audioUrl: `/audio/readings/${courseId}/full.mp3`,
    audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
    paragraphs: readingParagraphs,
    glossary: coffeeVocab.map((item) => ({ phrase: item.term, meaning: item.meaning, note: item.note })),
    questions: readingQuestions,
  },
};

function pairQuestion(id: string, prompt: string, items: VocabItem[]): CheckpointQuestion {
  return { id, type: "match-pairs", prompt, pairs: items.map((item) => ({ left: item.term, right: item.meaning })), explanation: "ربط كل عبارة إسبانية بالمعنى الصحيح ديالها بالدارجة.", points: items.length, skillTag: "ربط العبارات" };
}

export const andalusianSpanishA1OrderingCoffeeBreakfastDarijaQuiz: CheckpointQuiz = {
  id: `${courseId}-quiz`,
  title: "الكويز النهائي: طلب القهوة والفطور",
  subtitle: "اختار العبارة الصحيحة فمواقف جديدة داخل القهوة.",
  languageTarget: "spanish",
  learnerNativeLanguage: "darija",
  level: "beginner",
  tags: ["Andalusian Spanish", "A1", "Darija", "quiz", "breakfast"],
  estimatedMinutes: 15,
  skoolSectionName: sectionName,
  relatedCourse: courseId,
  activityType: "quiz",
  data: {
    description: "هاد الكويز كيشوف واش تقدر تطلب القهوة والفطور وتخلص فمواقف جديدة، ماشي غير تحفظ القصة.",
    passScore: 75,
    feedbackMode: "immediate",
    questions: [
      { id: "coffee-quiz-1", type: "multiple-choice", prompt: "النادل سولك شنو بغيتي. شنو يقدر يقول؟", options: ["¿Qué te pongo?", "¿Cuánto es?", "Que vaya bien", "La cuenta, porfa"], correctAnswer: "¿Qué te pongo?", explanation: "هاد السؤال كيبدا به النادل الطلب.", points: 1, skillTag: "بداية الطلب" },
      { id: "coffee-quiz-2", type: "multiple-choice", prompt: "بغيتي قهوة بشوية ديال الحليب. شنو تطلب؟", options: ["Un cortado", "Un café solo", "Un vaso de agua", "Un zumo"], correctAnswer: "Un cortado", explanation: "cortado هي قهوة فيها شوية ديال الحليب.", points: 1, skillTag: "القهوة" },
      { id: "coffee-quiz-3", type: "order-words", prompt: "رتّب: عطيني نص توسطادا بالزيت والطماطم.", wordBank: ["Ponme", "media", "tostada", "con", "aceite", "y", "tomate"], correctAnswer: "Ponme media tostada con aceite y tomate", explanation: "الطلب كيبدا بـ Ponme ومن بعد الحاجة والمكونات.", points: 1, skillTag: "بناء الجملة" },
      { id: "coffee-quiz-4", type: "true-false", prompt: "صح ولا خطأ: “La quiero entera” كتعني بغيتها كاملة.", options: ["صح", "خطأ"], correctAnswer: "صح", explanation: "entera كتعني كاملة.", points: 1, skillTag: "الحجم" },
      { id: "coffee-quiz-5", type: "multiple-choice", prompt: "بغيتي البوكاديو معاك. شنو تقول؟", options: ["Pa' llevar", "Aquí", "Sin azúcar", "Ahora mismo"], correctAnswer: "Pa' llevar", explanation: "كتعني غادي تاخدو معاك.", points: 1, skillTag: "الخدمة" },
      { id: "coffee-quiz-6", type: "fill-blank", prompt: "كمّل: El café, sin ______.", nativePrompt: "القهوة بلا السكر", correctAnswer: "azúcar", explanation: "sin azúcar كتعني بلا السكر.", points: 1, skillTag: "المكونات" },
      { id: "coffee-quiz-7", type: "multiple-choice", prompt: "بغيتي النادل يزيد ليك شوية طماطم. شنو تقول؟", options: ["Un poquito más, porfa", "No, esto na' más", "Que aproveche", "Qué va"], correctAnswer: "Un poquito más, porfa", explanation: "كتطلب بها زيادة صغيرة بأدب.", points: 1, skillTag: "طلب زيادة" },
      { id: "coffee-quiz-8", type: "multiple-choice", prompt: "ساليتي وبغيتي الحساب. شنو تقول؟", options: ["La cuenta, porfa", "¿Algo más?", "Aquí tienes", "Un momentito"], correctAnswer: "La cuenta, porfa", explanation: "هاد هي العبارة اليومية لطلب الحساب.", points: 1, skillTag: "الحساب" },
      { id: "coffee-quiz-9", type: "true-false", prompt: "صح ولا خطأ: “Pago en efectivo” كتعني غادي نخلص بالكارت.", options: ["صح", "خطأ"], correctAnswer: "خطأ", explanation: "en efectivo كتعني بالكاش.", points: 1, skillTag: "الخلاص" },
      { id: "coffee-quiz-10", type: "multiple-choice", prompt: "بغيتي تسول واش تقدر تخلص بالكارت. شنو تقول؟", options: ["¿Puedo pagar con tarjeta?", "¿Entera o media?", "¿Qué te pongo?", "¿Algo más?"], correctAnswer: "¿Puedo pagar con tarjeta?", explanation: "هاد السؤال كيتأكد واش الأداء بالكارت ممكن.", points: 1, skillTag: "طريقة الخلاص" },
      pairQuestion("coffee-quiz-11", "ربط أنواع القهوة والشراب بالمعاني ديالها.", [coffeeVocab[2], coffeeVocab[3], coffeeVocab[4], coffeeVocab[17]]),
      pairQuestion("coffee-quiz-12", "ربط عبارات الحجم والخدمة بالمعاني ديالها.", [coffeeVocab[13], coffeeVocab[14], coffeeVocab[23], coffeeVocab[25]]),
      pairQuestion("coffee-quiz-13", "ربط عبارات الحساب والوداع بالمعاني ديالها.", [coffeeVocab[31], coffeeVocab[33], coffeeVocab[36], coffeeVocab[39]]),
    ],
  },
};
