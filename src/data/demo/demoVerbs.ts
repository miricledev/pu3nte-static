import type { SpanishPerson, SpanishTense, SpanishVerb, VerbTrainerSet } from "../../types";

const finitePersons = ["yo", "tu", "elEllaUsted", "nosotros", "vosotros", "ellosEllasUstedes"] as const satisfies readonly SpanishPerson[];
const imperativePersons = ["tu", "elEllaUsted", "nosotros", "vosotros", "ellosEllasUstedes"] as const satisfies readonly SpanishPerson[];
const formOnly = ["form"] as const satisfies readonly SpanishPerson[];

type SixForms = [string, string, string, string, string, string];
type FiveCommandForms = [string, string, string, string, string];
type Group = "ar" | "er" | "ir";
type ConjugationOverrides = Partial<Record<SpanishTense, Partial<Record<SpanishPerson, string>>>>;

function mapFinite(values: SixForms): Partial<Record<SpanishPerson, string>> {
  return Object.fromEntries(finitePersons.map((person, index) => [person, values[index]])) as Partial<Record<SpanishPerson, string>>;
}

function mapImperative(values: FiveCommandForms): Partial<Record<SpanishPerson, string>> {
  return Object.fromEntries(imperativePersons.map((person, index) => [person, values[index]])) as Partial<Record<SpanishPerson, string>>;
}

function mapForm(value: string): Partial<Record<SpanishPerson, string>> {
  return { form: value };
}

function finiteFromEndings(stem: string, endings: SixForms): Partial<Record<SpanishPerson, string>> {
  return mapFinite(endings.map((ending) => `${stem}${ending}`) as SixForms);
}

function futureLike(stem: string, endings: SixForms): Partial<Record<SpanishPerson, string>> {
  return mapFinite(endings.map((ending) => `${stem}${ending}`) as SixForms);
}

function perfect(auxiliaries: SixForms, participle: string): Partial<Record<SpanishPerson, string>> {
  return mapFinite(auxiliaries.map((auxiliary) => `${auxiliary} ${participle}`) as SixForms);
}

function accentLastVowel(value: string): string {
  const vowels: Record<string, string> = { a: "á", e: "é", i: "í", o: "ó", u: "ú" };
  for (let index = value.length - 1; index >= 0; index -= 1) {
    const replacement = vowels[value[index]];
    if (replacement) return `${value.slice(0, index)}${replacement}${value.slice(index + 1)}`;
  }
  return value;
}

function deriveImperfectSubjunctive(ellosPreterite: string, endings: SixForms): Partial<Record<SpanishPerson, string>> {
  const stem = ellosPreterite.replace(/ron$/, "");
  return mapFinite(endings.map((ending, index) => `${index === 3 ? accentLastVowel(stem) : stem}${ending}`) as SixForms);
}

function mergeConjugations(base: ConjugationOverrides, overrides: ConjugationOverrides): ConjugationOverrides {
  const merged: ConjugationOverrides = { ...base };
  for (const [tense, forms] of Object.entries(overrides) as Array<[SpanishTense, Partial<Record<SpanishPerson, string>>]>) {
    merged[tense] = { ...(merged[tense] ?? {}), ...forms };
  }
  return merged;
}

function buildConjugations(infinitive: string, group: Group, overrides: ConjugationOverrides = {}) {
  const stem = infinitive.slice(0, -2);
  const presentEndings: Record<Group, SixForms> = {
    ar: ["o", "as", "a", "amos", "áis", "an"],
    er: ["o", "es", "e", "emos", "éis", "en"],
    ir: ["o", "es", "e", "imos", "ís", "en"],
  };
  const preteriteEndings: Record<Group, SixForms> = {
    ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
    er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
    ir: ["í", "iste", "ió", "imos", "isteis", "ieron"],
  };
  const imperfectEndings: Record<Group, SixForms> = {
    ar: ["aba", "abas", "aba", "ábamos", "abais", "aban"],
    er: ["ía", "ías", "ía", "íamos", "íais", "ían"],
    ir: ["ía", "ías", "ía", "íamos", "íais", "ían"],
  };
  const presentSubjunctiveEndings: Record<Group, SixForms> = {
    ar: ["e", "es", "e", "emos", "éis", "en"],
    er: ["a", "as", "a", "amos", "áis", "an"],
    ir: ["a", "as", "a", "amos", "áis", "an"],
  };
  const participle = overrides.pastParticiple?.form ?? `${stem}${group === "ar" ? "ado" : "ido"}`;

  const conjugations = mergeConjugations(
    {
      present: finiteFromEndings(stem, presentEndings[group]),
      preterite: finiteFromEndings(stem, preteriteEndings[group]),
      imperfect: finiteFromEndings(stem, imperfectEndings[group]),
      future: futureLike(infinitive, ["é", "ás", "á", "emos", "éis", "án"]),
      conditional: futureLike(infinitive, ["ía", "ías", "ía", "íamos", "íais", "ían"]),
      presentSubjunctive: finiteFromEndings(stem, presentSubjunctiveEndings[group]),
      imperative: group === "ar"
        ? mapImperative([`${stem}a`, `${stem}e`, `${stem}emos`, `${stem}ad`, `${stem}en`])
        : mapImperative([`${stem}e`, `${stem}a`, `${stem}amos`, `${stem}${group === "er" ? "ed" : "id"}`, `${stem}an`]),
      gerund: mapForm(`${stem}${group === "ar" ? "ando" : "iendo"}`),
      pastParticiple: mapForm(participle),
    },
    overrides,
  );

  conjugations.imperfectSubjunctive = overrides.imperfectSubjunctive ?? deriveImperfectSubjunctive(
    conjugations.preterite?.ellosEllasUstedes ?? "",
    ["ra", "ras", "ra", "ramos", "rais", "ran"],
  );
  conjugations.presentPerfect = perfect(["he", "has", "ha", "hemos", "habéis", "han"], conjugations.pastParticiple?.form ?? participle);
  conjugations.pastPerfect = perfect(["había", "habías", "había", "habíamos", "habíais", "habían"], conjugations.pastParticiple?.form ?? participle);

  const imperfectSubjunctiveAlternatives = deriveImperfectSubjunctive(
    conjugations.preterite?.ellosEllasUstedes ?? "",
    ["se", "ses", "se", "semos", "seis", "sen"],
  );
  const acceptedAlternatives = Object.fromEntries(
    Object.entries(imperfectSubjunctiveAlternatives).map(([person, value]) => [`imperfectSubjunctive:${person}`, [value]]),
  );

  return { conjugations, acceptedAlternatives };
}

function verb(
  infinitive: string,
  translation: string,
  regularity: SpanishVerb["regularity"],
  group: Group,
  overrides: ConjugationOverrides = {},
  notes: string[] = [],
): SpanishVerb {
  const { conjugations, acceptedAlternatives } = buildConjugations(infinitive, group, overrides);

  return {
    infinitive,
    translation,
    language: "spanish",
    regularity,
    endingsGroup: group,
    conjugations,
    acceptedAlternatives,
    notes,
    examples: [
      `Yo ${conjugations.present?.yo ?? infinitive}.`,
      `Ayer yo ${conjugations.preterite?.yo ?? infinitive}.`,
    ],
  };
}

const spanishVerbs: SpanishVerb[] = [
  verb("hablar", "to speak", "regular", "ar"),
  verb("comer", "to eat", "regular", "er"),
  verb("vivir", "to live", "regular", "ir"),
  verb("buscar", "to look for", "mixed", "ar", {
    preterite: { yo: "busqué" },
    presentSubjunctive: mapFinite(["busque", "busques", "busque", "busquemos", "busquéis", "busquen"]),
    imperative: mapImperative(["busca", "busque", "busquemos", "buscad", "busquen"]),
  }, ["Spelling change: c becomes qu before e: busqué, busque."]),
  verb("pagar", "to pay", "mixed", "ar", {
    preterite: { yo: "pagué" },
    presentSubjunctive: mapFinite(["pague", "pagues", "pague", "paguemos", "paguéis", "paguen"]),
    imperative: mapImperative(["paga", "pague", "paguemos", "pagad", "paguen"]),
  }, ["Spelling change: g becomes gu before e: pagué, pague."]),
  verb("empezar", "to start", "stem-changing", "ar", {
    present: mapFinite(["empiezo", "empiezas", "empieza", "empezamos", "empezáis", "empiezan"]),
    preterite: { yo: "empecé" },
    presentSubjunctive: mapFinite(["empiece", "empieces", "empiece", "empecemos", "empecéis", "empiecen"]),
    imperative: mapImperative(["empieza", "empiece", "empecemos", "empezad", "empiecen"]),
  }, ["Stem change e → ie; z becomes c before e: empecé, empiece."]),
  verb("jugar", "to play", "stem-changing", "ar", {
    present: mapFinite(["juego", "juegas", "juega", "jugamos", "jugáis", "juegan"]),
    preterite: { yo: "jugué" },
    presentSubjunctive: mapFinite(["juegue", "juegues", "juegue", "juguemos", "juguéis", "jueguen"]),
    imperative: mapImperative(["juega", "juegue", "juguemos", "jugad", "jueguen"]),
  }, ["Stem change u → ue; g becomes gu before e: jugué, juegue."]),
  verb("pensar", "to think / plan", "stem-changing", "ar", {
    present: mapFinite(["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"]),
    presentSubjunctive: mapFinite(["piense", "pienses", "piense", "pensemos", "penséis", "piensen"]),
    imperative: mapImperative(["piensa", "piense", "pensemos", "pensad", "piensen"]),
  }, ["Stem change e → ie except nosotros/vosotros in present and present subjunctive."]),
  verb("poder", "to be able to", "irregular", "er", {
    present: mapFinite(["puedo", "puedes", "puede", "podemos", "podéis", "pueden"]),
    preterite: mapFinite(["pude", "pudiste", "pudo", "pudimos", "pudisteis", "pudieron"]),
    future: futureLike("podr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("podr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["pueda", "puedas", "pueda", "podamos", "podáis", "puedan"]),
  }, ["Irregular preterite stem pud- and future/conditional stem podr-."]),
  verb("pedir", "to ask for / order", "stem-changing", "ir", {
    present: mapFinite(["pido", "pides", "pide", "pedimos", "pedís", "piden"]),
    preterite: mapFinite(["pedí", "pediste", "pidió", "pedimos", "pedisteis", "pidieron"]),
    presentSubjunctive: mapFinite(["pida", "pidas", "pida", "pidamos", "pidáis", "pidan"]),
    imperative: mapImperative(["pide", "pida", "pidamos", "pedid", "pidan"]),
    gerund: mapForm("pidiendo"),
  }, ["Stem change e → i; -ir stem change also appears in gerund and preterite third person."]),
  verb("dormir", "to sleep", "stem-changing", "ir", {
    present: mapFinite(["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"]),
    preterite: mapFinite(["dormí", "dormiste", "durmió", "dormimos", "dormisteis", "durmieron"]),
    presentSubjunctive: mapFinite(["duerma", "duermas", "duerma", "durmamos", "durmáis", "duerman"]),
    imperative: mapImperative(["duerme", "duerma", "durmamos", "dormid", "duerman"]),
    gerund: mapForm("durmiendo"),
  }, ["Stem changes o → ue and o → u depending on tense/person."]),
  verb("leer", "to read", "mixed", "er", {
    preterite: mapFinite(["leí", "leíste", "leyó", "leímos", "leísteis", "leyeron"]),
    gerund: mapForm("leyendo"),
  }, ["Preterite and gerund add y between vowels: leyó, leyendo."]),
  verb("oír", "to hear", "irregular", "ir", {
    present: mapFinite(["oigo", "oyes", "oye", "oímos", "oís", "oyen"]),
    preterite: mapFinite(["oí", "oíste", "oyó", "oímos", "oísteis", "oyeron"]),
    presentSubjunctive: mapFinite(["oiga", "oigas", "oiga", "oigamos", "oigáis", "oigan"]),
    imperative: mapImperative(["oye", "oiga", "oigamos", "oíd", "oigan"]),
    gerund: mapForm("oyendo"),
  }, ["Uses y between vowels and keeps written accents: oí, oyó, oímos."]),
  verb("ser", "to be", "irregular", "er", {
    present: mapFinite(["soy", "eres", "es", "somos", "sois", "son"]),
    preterite: mapFinite(["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"]),
    imperfect: mapFinite(["era", "eras", "era", "éramos", "erais", "eran"]),
    future: futureLike("ser", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("ser", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["sea", "seas", "sea", "seamos", "seáis", "sean"]),
    imperative: mapImperative(["sé", "sea", "seamos", "sed", "sean"]),
    gerund: mapForm("siendo"),
    pastParticiple: mapForm("sido"),
  }, ["Ser and ir share the same preterite forms."]),
  verb("estar", "to be", "irregular", "ar", {
    present: mapFinite(["estoy", "estás", "está", "estamos", "estáis", "están"]),
    preterite: mapFinite(["estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron"]),
    presentSubjunctive: mapFinite(["esté", "estés", "esté", "estemos", "estéis", "estén"]),
    imperative: mapImperative(["está", "esté", "estemos", "estad", "estén"]),
  }, ["Irregular present yo, preterite stem estuv-, and accented present subjunctive."]),
  verb("ir", "to go", "irregular", "ir", {
    present: mapFinite(["voy", "vas", "va", "vamos", "vais", "van"]),
    preterite: mapFinite(["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"]),
    imperfect: mapFinite(["iba", "ibas", "iba", "íbamos", "ibais", "iban"]),
    future: futureLike("ir", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("ir", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["vaya", "vayas", "vaya", "vayamos", "vayáis", "vayan"]),
    imperative: mapImperative(["ve", "vaya", "vayamos", "id", "vayan"]),
    gerund: mapForm("yendo"),
    pastParticiple: mapForm("ido"),
  }, ["Ir has several unrelated stems: voy, fui, iba, vaya, yendo."]),
  verb("tener", "to have", "irregular", "er", {
    present: mapFinite(["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"]),
    preterite: mapFinite(["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"]),
    future: futureLike("tendr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("tendr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["tenga", "tengas", "tenga", "tengamos", "tengáis", "tengan"]),
    imperative: mapImperative(["ten", "tenga", "tengamos", "tened", "tengan"]),
  }, ["Combines yo-go, stem change, irregular preterite, and irregular future stem."]),
  verb("hacer", "to do / make", "irregular", "er", {
    present: mapFinite(["hago", "haces", "hace", "hacemos", "hacéis", "hacen"]),
    preterite: mapFinite(["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"]),
    future: futureLike("har", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("har", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["haga", "hagas", "haga", "hagamos", "hagáis", "hagan"]),
    imperative: mapImperative(["haz", "haga", "hagamos", "haced", "hagan"]),
    gerund: mapForm("haciendo"),
    pastParticiple: mapForm("hecho"),
  }, ["Notice hice but hizo, and the irregular participle hecho."]),
  verb("decir", "to say / tell", "irregular", "ir", {
    present: mapFinite(["digo", "dices", "dice", "decimos", "decís", "dicen"]),
    preterite: mapFinite(["dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron"]),
    future: futureLike("dir", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("dir", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["diga", "digas", "diga", "digamos", "digáis", "digan"]),
    imperative: mapImperative(["di", "diga", "digamos", "decid", "digan"]),
    gerund: mapForm("diciendo"),
    pastParticiple: mapForm("dicho"),
  }, ["Decir has digo, dije/dijeron, dir-, diciendo, and dicho."]),
  verb("venir", "to come", "irregular", "ir", {
    present: mapFinite(["vengo", "vienes", "viene", "venimos", "venís", "vienen"]),
    preterite: mapFinite(["vine", "viniste", "vino", "vinimos", "vinisteis", "vinieron"]),
    future: futureLike("vendr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("vendr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["venga", "vengas", "venga", "vengamos", "vengáis", "vengan"]),
    imperative: mapImperative(["ven", "venga", "vengamos", "venid", "vengan"]),
    gerund: mapForm("viniendo"),
  }, ["Venir follows the tener family but with its own preterite stem vin-."]),
  verb("poner", "to put", "irregular", "er", {
    present: mapFinite(["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"]),
    preterite: mapFinite(["puse", "pusiste", "puso", "pusimos", "pusisteis", "pusieron"]),
    future: futureLike("pondr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("pondr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["ponga", "pongas", "ponga", "pongamos", "pongáis", "pongan"]),
    imperative: mapImperative(["pon", "ponga", "pongamos", "poned", "pongan"]),
    pastParticiple: mapForm("puesto"),
  }, ["Poner has pongo, puse, pondr-, and puesto."]),
  verb("salir", "to leave / go out", "irregular", "ir", {
    present: mapFinite(["salgo", "sales", "sale", "salimos", "salís", "salen"]),
    future: futureLike("saldr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("saldr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["salga", "salgas", "salga", "salgamos", "salgáis", "salgan"]),
    imperative: mapImperative(["sal", "salga", "salgamos", "salid", "salgan"]),
  }, ["Salir has salgo, salga, and the future/conditional stem saldr-."]),
  verb("traer", "to bring", "irregular", "er", {
    present: mapFinite(["traigo", "traes", "trae", "traemos", "traéis", "traen"]),
    preterite: mapFinite(["traje", "trajiste", "trajo", "trajimos", "trajisteis", "trajeron"]),
    presentSubjunctive: mapFinite(["traiga", "traigas", "traiga", "traigamos", "traigáis", "traigan"]),
    imperative: mapImperative(["trae", "traiga", "traigamos", "traed", "traigan"]),
    gerund: mapForm("trayendo"),
  }, ["Traer has traigo, traje/trajeron, traiga, and trayendo."]),
  verb("saber", "to know", "irregular", "er", {
    present: mapFinite(["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"]),
    preterite: mapFinite(["supe", "supiste", "supo", "supimos", "supisteis", "supieron"]),
    future: futureLike("sabr", ["é", "ás", "á", "emos", "éis", "án"]),
    conditional: futureLike("sabr", ["ía", "ías", "ía", "íamos", "íais", "ían"]),
    presentSubjunctive: mapFinite(["sepa", "sepas", "sepa", "sepamos", "sepáis", "sepan"]),
  }, ["Saber has sé, supe, sabr-, and sepa."]),
  verb("ver", "to see", "irregular", "er", {
    present: mapFinite(["veo", "ves", "ve", "vemos", "veis", "ven"]),
    preterite: mapFinite(["vi", "viste", "vio", "vimos", "visteis", "vieron"]),
    imperfect: mapFinite(["veía", "veías", "veía", "veíamos", "veíais", "veían"]),
    presentSubjunctive: mapFinite(["vea", "veas", "vea", "veamos", "veáis", "vean"]),
    imperative: mapImperative(["ve", "vea", "veamos", "ved", "vean"]),
    pastParticiple: mapForm("visto"),
  }, ["Ver is short but exception-heavy: vi, veía, vea, visto."]),
  verb("dar", "to give", "irregular", "ar", {
    present: mapFinite(["doy", "das", "da", "damos", "dais", "dan"]),
    preterite: mapFinite(["di", "diste", "dio", "dimos", "disteis", "dieron"]),
    presentSubjunctive: mapFinite(["dé", "des", "dé", "demos", "deis", "den"]),
    imperative: mapImperative(["da", "dé", "demos", "dad", "den"]),
  }, ["Dar behaves like an -er/-ir verb in the preterite and has accented subjunctive dé."]),
  verb("abrir", "to open", "regular", "ir", {
    pastParticiple: mapForm("abierto"),
  }, ["Irregular past participle: abierto."]),
  verb("escribir", "to write", "regular", "ir", {
    pastParticiple: mapForm("escrito"),
  }, ["Irregular past participle: escrito."]),
  verb("volver", "to return", "stem-changing", "er", {
    present: mapFinite(["vuelvo", "vuelves", "vuelve", "volvemos", "volvéis", "vuelven"]),
    presentSubjunctive: mapFinite(["vuelva", "vuelvas", "vuelva", "volvamos", "volváis", "vuelvan"]),
    imperative: mapImperative(["vuelve", "vuelva", "volvamos", "volved", "vuelvan"]),
    pastParticiple: mapForm("vuelto"),
  }, ["Stem-changing verb with irregular participle vuelto."]),
  verb("morir", "to die", "stem-changing", "ir", {
    present: mapFinite(["muero", "mueres", "muere", "morimos", "morís", "mueren"]),
    preterite: mapFinite(["morí", "moriste", "murió", "morimos", "moristeis", "murieron"]),
    presentSubjunctive: mapFinite(["muera", "mueras", "muera", "muramos", "muráis", "mueran"]),
    imperative: mapImperative(["muere", "muera", "muramos", "morid", "mueran"]),
    gerund: mapForm("muriendo"),
    pastParticiple: mapForm("muerto"),
  }, ["Stem-changing verb with gerund muriendo and participle muerto."]),
  verb("romper", "to break", "regular", "er", {
    pastParticiple: mapForm("roto"),
  }, ["Irregular past participle: roto."]),
  verb("cubrir", "to cover", "regular", "ir", {
    pastParticiple: mapForm("cubierto"),
  }, ["Irregular past participle: cubierto."]),
];

function hasForms(verbItem: SpanishVerb, tense: SpanishTense, persons: readonly SpanishPerson[]) {
  return persons.every((person) => Boolean(verbItem.conjugations[tense]?.[person]));
}

function makeSet(
  id: string,
  title: string,
  subtitle: string,
  tense: SpanishTense,
  persons: readonly SpanishPerson[],
  estimatedMinutes = 12,
): VerbTrainerSet {
  return {
    id,
    title,
    subtitle,
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["spanish", "verbs", "conjugation", tense],
    estimatedMinutes,
    activityType: "verb-trainer",
    data: {
      tenses: [tense],
      persons: [...persons],
      verbs: spanishVerbs.filter((verbItem) => hasForms(verbItem, tense, persons)),
    },
  };
}

export const demoVerbSets: VerbTrainerSet[] = [
  {
    id: "demo-core-verbs",
    title: "Spanish Verb Lab: Present + Preterite",
    subtitle: "Legacy mixed lab with regular, stem-changing, spelling-change, and irregular verbs.",
    languageTarget: "spanish",
    learnerNativeLanguage: "english",
    level: "beginner",
    tags: ["demo", "verbs", "conjugation"],
    estimatedMinutes: 15,
    activityType: "verb-trainer",
    data: {
      tenses: ["present", "preterite"],
      persons: [...finitePersons],
      verbs: spanishVerbs.filter((verbItem) => hasForms(verbItem, "present", finitePersons) && hasForms(verbItem, "preterite", finitePersons)),
    },
  },
  makeSet("spanish-present-tense-practice", "Spanish Present Tense Practice", "Regulars, stem-changers, yo-go verbs, and core irregulars in the present.", "present", finitePersons),
  makeSet("spanish-preterite-tense-practice", "Spanish Preterite Practice", "Completed past actions with regulars, spelling changes, y-changes, and strong irregular stems.", "preterite", finitePersons),
  makeSet("spanish-imperfect-tense-practice", "Spanish Imperfect Practice", "Habitual/background past forms, including the three major imperfect irregulars.", "imperfect", finitePersons),
  makeSet("spanish-future-tense-practice", "Spanish Future Practice", "Regular infinitive-based future plus irregular future stems.", "future", finitePersons),
  makeSet("spanish-conditional-tense-practice", "Spanish Conditional Practice", "Would-forms using regular infinitives and irregular conditional stems.", "conditional", finitePersons),
  makeSet("spanish-present-perfect-practice", "Spanish Present Perfect Practice", "Haber in the present plus regular and irregular past participles.", "presentPerfect", finitePersons),
  makeSet("spanish-past-perfect-practice", "Spanish Past Perfect Practice", "Imperfect haber plus regular and irregular past participles.", "pastPerfect", finitePersons),
  makeSet("spanish-present-subjunctive-practice", "Spanish Present Subjunctive Practice", "Opposite-vowel endings, stem changes, spelling changes, and irregular subjunctive stems.", "presentSubjunctive", finitePersons),
  makeSet("spanish-imperfect-subjunctive-practice", "Spanish Imperfect Subjunctive Practice", "The -ra imperfect subjunctive with accepted -se alternatives.", "imperfectSubjunctive", finitePersons),
  makeSet("spanish-imperative-practice", "Spanish Imperative Practice", "Affirmative tú, usted, nosotros, vosotros, and ustedes commands.", "imperative", imperativePersons),
  makeSet("spanish-gerund-practice", "Spanish Gerund Practice", "Regular gerunds plus important irregular forms like yendo, diciendo, pidiendo, and durmiendo.", "gerund", formOnly, 8),
  makeSet("spanish-past-participle-practice", "Spanish Past Participle Practice", "Regular participles plus common irregulars like hecho, dicho, visto, puesto, abierto, and roto.", "pastParticiple", formOnly, 8),
];
