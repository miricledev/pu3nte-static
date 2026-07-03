import type { SpanishPerson, SpanishVerb, VerbTrainerSet } from "../../types";

const demoPersons = ["yo", "tu", "elEllaUsted", "nosotros", "ellosEllasUstedes"] as const satisfies readonly SpanishPerson[];
type FiveForms = [string, string, string, string, string];

function mapForms(values: FiveForms) {
  return Object.fromEntries(demoPersons.map((person, index) => [person, values[index]])) as Partial<Record<SpanishPerson, string>>;
}

function verb(
  infinitive: string,
  translation: string,
  regularity: SpanishVerb["regularity"],
  endingsGroup: SpanishVerb["endingsGroup"],
  present: FiveForms,
  preterite: FiveForms,
  notes?: string[],
): SpanishVerb {
  return {
    infinitive,
    translation,
    language: "spanish",
    regularity,
    endingsGroup,
    conjugations: {
      present: mapForms(present),
      preterite: mapForms(preterite),
    },
    notes,
    examples: [`Yo ${present[0]} cada semana.`, `Ayer yo ${preterite[0]}.`],
  };
}

function regularVerb(infinitive: string, translation: string, endingsGroup: "ar" | "er" | "ir") {
  const stem = infinitive.slice(0, -2);
  const presentEndings = endingsGroup === "ar" ? ["o", "as", "a", "amos", "an"] : endingsGroup === "er" ? ["o", "es", "e", "emos", "en"] : ["o", "es", "e", "imos", "en"];
  const preteriteEndings = endingsGroup === "ar" ? ["é", "aste", "ó", "amos", "aron"] : ["í", "iste", "ió", "imos", "ieron"];
  return verb(
    infinitive,
    translation,
    "regular",
    endingsGroup,
    presentEndings.map((ending) => `${stem}${ending}`) as FiveForms,
    preteriteEndings.map((ending) => `${stem}${ending}`) as FiveForms,
  );
}

const spanishDemoVerbs: SpanishVerb[] = [
  regularVerb("hablar", "to speak", "ar"),
  regularVerb("estudiar", "to study", "ar"),
  regularVerb("trabajar", "to work", "ar"),
  regularVerb("comprar", "to buy", "ar"),
  regularVerb("escuchar", "to listen", "ar"),
  regularVerb("mirar", "to look at", "ar"),
  regularVerb("necesitar", "to need", "ar"),
  regularVerb("tomar", "to take / drink", "ar"),
  regularVerb("cocinar", "to cook", "ar"),
  regularVerb("comer", "to eat", "er"),
  regularVerb("beber", "to drink", "er"),
  regularVerb("aprender", "to learn", "er"),
  regularVerb("vender", "to sell", "er"),
  regularVerb("correr", "to run", "er"),
  regularVerb("vivir", "to live", "ir"),
  regularVerb("escribir", "to write", "ir"),
  regularVerb("abrir", "to open", "ir"),
  regularVerb("recibir", "to receive", "ir"),
  verb("llegar", "to arrive", "mixed", "ar", ["llego", "llegas", "llega", "llegamos", "llegan"], ["llegué", "llegaste", "llegó", "llegamos", "llegaron"], ["Preterite yo keeps the hard g sound: llegué."]),
  verb("leer", "to read", "mixed", "er", ["leo", "lees", "lee", "leemos", "leen"], ["leí", "leíste", "leyó", "leímos", "leyeron"], ["Preterite third-person forms add y: leyó, leyeron."]),
  verb("ser", "to be", "irregular", "er", ["soy", "eres", "es", "somos", "son"], ["fui", "fuiste", "fue", "fuimos", "fueron"]),
  verb("ir", "to go", "irregular", "ir", ["voy", "vas", "va", "vamos", "van"], ["fui", "fuiste", "fue", "fuimos", "fueron"]),
  verb("estar", "to be", "irregular", "ar", ["estoy", "estás", "está", "estamos", "están"], ["estuve", "estuviste", "estuvo", "estuvimos", "estuvieron"]),
  verb("tener", "to have", "irregular", "er", ["tengo", "tienes", "tiene", "tenemos", "tienen"], ["tuve", "tuviste", "tuvo", "tuvimos", "tuvieron"]),
  verb("hacer", "to do / make", "irregular", "er", ["hago", "haces", "hace", "hacemos", "hacen"], ["hice", "hiciste", "hizo", "hicimos", "hicieron"]),
  verb("poder", "to be able to", "stem-changing", "er", ["puedo", "puedes", "puede", "podemos", "pueden"], ["pude", "pudiste", "pudo", "pudimos", "pudieron"]),
  verb("querer", "to want / love", "stem-changing", "er", ["quiero", "quieres", "quiere", "queremos", "quieren"], ["quise", "quisiste", "quiso", "quisimos", "quisieron"]),
  verb("venir", "to come", "irregular", "ir", ["vengo", "vienes", "viene", "venimos", "vienen"], ["vine", "viniste", "vino", "vinimos", "vinieron"]),
  verb("decir", "to say / tell", "irregular", "ir", ["digo", "dices", "dice", "decimos", "dicen"], ["dije", "dijiste", "dijo", "dijimos", "dijeron"]),
  verb("dar", "to give", "irregular", "ar", ["doy", "das", "da", "damos", "dan"], ["di", "diste", "dio", "dimos", "dieron"]),
  verb("ver", "to see", "irregular", "er", ["veo", "ves", "ve", "vemos", "ven"], ["vi", "viste", "vio", "vimos", "vieron"]),
  verb("saber", "to know", "irregular", "er", ["sé", "sabes", "sabe", "sabemos", "saben"], ["supe", "supiste", "supo", "supimos", "supieron"]),
  verb("poner", "to put", "irregular", "er", ["pongo", "pones", "pone", "ponemos", "ponen"], ["puse", "pusiste", "puso", "pusimos", "pusieron"]),
  verb("salir", "to leave / go out", "irregular", "ir", ["salgo", "sales", "sale", "salimos", "salen"], ["salí", "saliste", "salió", "salimos", "salieron"]),
  verb("traer", "to bring", "irregular", "er", ["traigo", "traes", "trae", "traemos", "traen"], ["traje", "trajiste", "trajo", "trajimos", "trajeron"]),
  verb("dormir", "to sleep", "stem-changing", "ir", ["duermo", "duermes", "duerme", "dormimos", "duermen"], ["dormí", "dormiste", "durmió", "dormimos", "durmieron"]),
  verb("pedir", "to ask for / order", "stem-changing", "ir", ["pido", "pides", "pide", "pedimos", "piden"], ["pedí", "pediste", "pidió", "pedimos", "pidieron"]),
  verb("jugar", "to play", "stem-changing", "ar", ["juego", "juegas", "juega", "jugamos", "juegan"], ["jugué", "jugaste", "jugó", "jugamos", "jugaron"]),
  verb("empezar", "to start", "stem-changing", "ar", ["empiezo", "empiezas", "empieza", "empezamos", "empiezan"], ["empecé", "empezaste", "empezó", "empezamos", "empezaron"]),
  verb("pensar", "to think / plan", "stem-changing", "ar", ["pienso", "piensas", "piensa", "pensamos", "piensan"], ["pensé", "pensaste", "pensó", "pensamos", "pensaron"]),
  verb("volver", "to return", "stem-changing", "er", ["vuelvo", "vuelves", "vuelve", "volvemos", "vuelven"], ["volví", "volviste", "volvió", "volvimos", "volvieron"]),
  verb("encontrar", "to find", "stem-changing", "ar", ["encuentro", "encuentras", "encuentra", "encontramos", "encuentran"], ["encontré", "encontraste", "encontró", "encontramos", "encontraron"]),
  verb("sentir", "to feel", "stem-changing", "ir", ["siento", "sientes", "siente", "sentimos", "sienten"], ["sentí", "sentiste", "sintió", "sentimos", "sintieron"]),
  verb("seguir", "to follow / continue", "irregular", "ir", ["sigo", "sigues", "sigue", "seguimos", "siguen"], ["seguí", "seguiste", "siguió", "seguimos", "siguieron"]),
  verb("conocer", "to know / meet", "irregular", "er", ["conozco", "conoces", "conoce", "conocemos", "conocen"], ["conocí", "conociste", "conoció", "conocimos", "conocieron"]),
  verb("conducir", "to drive", "irregular", "ir", ["conduzco", "conduces", "conduce", "conducimos", "conducen"], ["conduje", "condujiste", "condujo", "condujimos", "condujeron"]),
  verb("traducir", "to translate", "irregular", "ir", ["traduzco", "traduces", "traduce", "traducimos", "traducen"], ["traduje", "tradujiste", "tradujo", "tradujimos", "tradujeron"]),
  verb("oír", "to hear", "irregular", "ir", ["oigo", "oyes", "oye", "oímos", "oyen"], ["oí", "oíste", "oyó", "oímos", "oyeron"]),
  verb("caer", "to fall", "irregular", "er", ["caigo", "caes", "cae", "caemos", "caen"], ["caí", "caíste", "cayó", "caímos", "cayeron"]),
  verb("construir", "to build", "irregular", "ir", ["construyo", "construyes", "construye", "construimos", "construyen"], ["construí", "construiste", "construyó", "construimos", "construyeron"]),
];

export const demoVerbSets: VerbTrainerSet[] = [
  {
    id: "demo-core-verbs",
    title: "Demo Spanish Verb Lab",
    subtitle: "50 regular, irregular, and stem-changing verbs across present and preterite forms.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "verbs", "conjugation"],
    estimatedMinutes: 12,
    activityType: "verb-trainer",
    data: {
      tenses: ["present", "preterite"],
      persons: [...demoPersons],
      verbs: spanishDemoVerbs,
    },
  },
];
