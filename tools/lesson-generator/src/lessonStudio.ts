import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { generatorRoot, getElevenLabsModelId, loadLocalEnv, outputRoot } from "./config";
import { generateLessonFromScript } from "./generateLesson";
import { validateLessonScript, type LessonScript } from "./validateScript";
import type { GenerateLessonResult } from "./generateLesson";
import type { GeneratorOptions, GeneratorProgressEvent, LessonTimeline } from "./types";
import { ensureDir, formatDuration } from "./utils";

type StudioRequest = {
  scriptJson: string;
  mode: "dry-run" | "audio-only" | "video-only" | "full-video";
  forceTts?: boolean;
  skipTts?: boolean;
};

type StudioJobStatus = "queued" | "running" | "completed" | "failed";

type StudioJob = {
  id: string;
  status: StudioJobStatus;
  mode: StudioRequest["mode"];
  title: string;
  stage: string;
  message: string;
  percent: number;
  startedAt: number;
  updatedAt: number;
  completedAt?: number;
  etaSeconds?: number | null;
  logs: string[];
  rawLogs: string[];
  result?: StudioResult;
  error?: string;
};

type StudioResult = {
  ok: true;
  mode: StudioRequest["mode"];
  title: string;
  duration: string;
  segments: number;
  readiness: ReturnType<typeof getReadiness>;
  scriptPath: string;
  outputDirectory: string;
  files: GenerateLessonResult["files"];
};

const host = "127.0.0.1";
const port = Number.parseInt(process.env.LESSON_STUDIO_PORT ?? "4783", 10);
const jobs = new Map<string, StudioJob>();

function jsonResponse(response: http.ServerResponse, statusCode: number, body: unknown): void {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(JSON.stringify(body, null, 2));
}

function htmlResponse(response: http.ServerResponse, body: string): void {
  response.writeHead(200, {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(body);
}

async function readRequestBody(request: http.IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

function getGeneratorOptions(requestBody: StudioRequest): Partial<GeneratorOptions> {
  return {
    dryRun: requestBody.mode === "dry-run",
    audioOnly: requestBody.mode === "audio-only",
    videoOnly: requestBody.mode === "video-only",
    forceTts: requestBody.forceTts ?? false,
    skipTts: requestBody.skipTts ?? false,
  };
}

async function saveStudioScript(scriptJson: string, outputSlug: string): Promise<string> {
  const directory = path.join(generatorRoot, "sample-lessons", "studio-generated");
  await ensureDir(directory);

  const scriptPath = path.join(directory, `${outputSlug}.json`);
  await fs.writeFile(scriptPath, `${JSON.stringify(JSON.parse(scriptJson), null, 2)}\n`, "utf8");
  return scriptPath;
}

function createStudioResult(
  mode: StudioRequest["mode"],
  result: GenerateLessonResult,
  scriptPath: string,
): StudioResult {
  return {
    ok: true,
    mode,
    title: result.script.title,
    duration: formatDuration(result.timeline.totalDurationMs),
    segments: result.timeline.segments.length,
    readiness: getReadiness(result.script, result.timeline),
    scriptPath,
    outputDirectory: result.outputDirectory,
    files: result.files,
  };
}

function makeJobId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function pushLimited(items: string[], item: string, limit = 500): void {
  items.push(item);

  if (items.length > limit) {
    items.splice(0, items.length - limit);
  }
}

function formatLogLine(message: string): string {
  return `[${new Date().toLocaleTimeString()}] ${message}`;
}

function updateJob(job: StudioJob, event: GeneratorProgressEvent): void {
  const now = Date.now();
  const percent = Math.max(job.percent, Math.min(100, Math.round(event.percent ?? job.percent)));
  const elapsedSeconds = (now - job.startedAt) / 1000;
  const etaSeconds = percent > 2 && percent < 100 ? Math.round((elapsedSeconds / percent) * (100 - percent)) : null;

  job.status = job.status === "queued" ? "running" : job.status;
  job.stage = event.stage;
  job.message = event.message;
  job.percent = percent;
  job.updatedAt = now;
  job.etaSeconds = etaSeconds;

  const countLabel =
    event.current !== undefined && event.total !== undefined ? ` (${event.current}/${event.total})` : "";
  pushLimited(job.logs, formatLogLine(`${event.stage}: ${event.message}${countLabel}`));

  if (event.raw) {
    pushLimited(job.rawLogs, formatLogLine(event.raw));
  }
}

function serializeJob(job: StudioJob) {
  return {
    ...job,
    elapsedSeconds: Math.round(((job.completedAt ?? Date.now()) - job.startedAt) / 1000),
  };
}

type LessonTopic = {
  id: string;
  priority?: number;
  language: "English" | "Spanish";
  level: "A1-A2" | "B1-B2" | "C1-C2";
  topic: string;
  objective: string;
};

type SpecialCourse = {
  id: string;
  label: string;
  family: "spanish-dialect" | "english-accent";
  variety: string;
  learnerNativeLanguage: "english" | "spanish";
  targetLanguage: "spanish" | "english";
  narratorEnv: string;
  maleVoiceEnv: string;
  femaleVoiceEnv: string;
  researchFocus: string;
  culturalGuardrails: string;
};

type SpecialCourseLevel = "B1" | "B2" | "C1" | "C2";

type SpecialCourseTopic = {
  id: string;
  courseId: string;
  level: SpecialCourseLevel;
  topic: string;
  objective: string;
};

function topicId(language: LessonTopic["language"], level: LessonTopic["level"], index: number, topic: string): string {
  return `${language.toLowerCase()}-${level.toLowerCase()}-${index}-${topic
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function slugText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getSpecialCourses(): SpecialCourse[] {
  return [
    {
      id: "colombian-spanish",
      label: "Colombian Spanish",
      family: "spanish-dialect",
      variety: "Colombian Spanish",
      learnerNativeLanguage: "english",
      targetLanguage: "spanish",
      narratorEnv: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_COLOMBIAN_SPANISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_COLOMBIAN_SPANISH_FEMALE_VOICE_ID",
      researchFocus: "Colombian everyday speech, friendly softening, parce, listo, dale, qué pena, bacano, de una, and natural regional phrasing without overdoing caricature.",
      culturalGuardrails: "Prefer warm Colombian urban everyday Spanish. Avoid narco stereotypes, violent clichés, or treating one city as the whole country.",
    },
    {
      id: "argentinian-spanish",
      label: "Argentinian Spanish",
      family: "spanish-dialect",
      variety: "Argentinian Spanish",
      learnerNativeLanguage: "english",
      targetLanguage: "spanish",
      narratorEnv: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_ARGENTINIAN_SPANISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_ARGENTINIAN_SPANISH_FEMALE_VOICE_ID",
      researchFocus: "Argentinian everyday speech, voseo, che, boludo used carefully, re, laburo, quilombo, dale, posta, and natural Buenos Aires-style rhythm.",
      culturalGuardrails: "Teach voseo clearly and mark register. Avoid insults as default speech and avoid flattening Argentina to one stereotype.",
    },
    {
      id: "mexican-spanish",
      label: "Mexican Spanish",
      family: "spanish-dialect",
      variety: "Mexican Spanish",
      learnerNativeLanguage: "english",
      targetLanguage: "spanish",
      narratorEnv: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_MEXICAN_SPANISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_MEXICAN_SPANISH_FEMALE_VOICE_ID",
      researchFocus: "Mexican everyday speech, qué padre, órale, ahorita, no manches, neta, chido, güey register warnings, and polite Mexican phrasing.",
      culturalGuardrails: "Explain register and avoid making the lesson sound like a meme. Keep phrases useful, respectful, and context-aware.",
    },
    {
      id: "dominican-spanish",
      label: "Dominican Spanish",
      family: "spanish-dialect",
      variety: "Dominican Spanish",
      learnerNativeLanguage: "english",
      targetLanguage: "spanish",
      narratorEnv: "ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_DOMINICAN_SPANISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_DOMINICAN_SPANISH_FEMALE_VOICE_ID",
      researchFocus: "Dominican everyday speech, qué lo qué, vaina, coro, tigre, jevi, ahora/ahorita usage, fast Caribbean rhythm, and pronunciation awareness.",
      culturalGuardrails: "Teach slang with context and respect. Avoid caricaturing accent or making everything extremely informal.",
    },
    {
      id: "british-english",
      label: "British English",
      family: "english-accent",
      variety: "British English",
      learnerNativeLanguage: "spanish",
      targetLanguage: "english",
      narratorEnv: "ELEVENLABS_SPANISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_BRITISH_ENGLISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_BRITISH_ENGLISH_FEMALE_VOICE_ID",
      researchFocus: "British everyday English, cheers, mate, fancy, brilliant, gutted, knackered, sorted, queue, lift, and polite understatement.",
      culturalGuardrails: "Prefer widely useful modern UK English. Explain register and regional variation without forcing exaggerated posh slang.",
    },
    {
      id: "american-english",
      label: "American English",
      family: "english-accent",
      variety: "American English",
      learnerNativeLanguage: "spanish",
      targetLanguage: "english",
      narratorEnv: "ELEVENLABS_SPANISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_AMERICAN_ENGLISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_AMERICAN_ENGLISH_FEMALE_VOICE_ID",
      researchFocus: "American everyday English, casual reductions, gonna/wanna/gotta, awesome, no worries, I'm down, sounds good, errands, and direct but friendly phrasing.",
      culturalGuardrails: "Use broad modern American English, not a narrow regional stereotype. Explain casual reductions as speech, not formal writing.",
    },
    {
      id: "irish-english",
      label: "Irish English",
      family: "english-accent",
      variety: "Irish English",
      learnerNativeLanguage: "spanish",
      targetLanguage: "english",
      narratorEnv: "ELEVENLABS_SPANISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_IRISH_ENGLISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_IRISH_ENGLISH_FEMALE_VOICE_ID",
      researchFocus: "Irish everyday English, grand, craic, sound, no bother, cheers, fair play, giving out, and natural friendly Irish phrasing.",
      culturalGuardrails: "Use common approachable Irish English. Avoid stage-Irish caricature, heavy dialect spelling, or confusing learners with rare forms.",
    },
    {
      id: "australian-english",
      label: "Australian English",
      family: "english-accent",
      variety: "Australian English",
      learnerNativeLanguage: "spanish",
      targetLanguage: "english",
      narratorEnv: "ELEVENLABS_SPANISH_NARRATOR_VOICE_ID",
      maleVoiceEnv: "ELEVENLABS_AUSTRALIAN_ENGLISH_MALE_VOICE_ID",
      femaleVoiceEnv: "ELEVENLABS_AUSTRALIAN_ENGLISH_FEMALE_VOICE_ID",
      researchFocus: "Australian everyday English, no worries, mate, reckon, heaps, arvo, brekkie, keen, servo, and relaxed friendly phrasing.",
      culturalGuardrails: "Teach useful contemporary Australian English. Avoid cartoonish slang overload and explain informal register clearly.",
    },
  ];
}

function getSpecialCourseTopics(): SpecialCourseTopic[] {
  const byLevel: Record<SpecialCourseLevel, Array<[string, string]>> = {
    B1: [
      ["Core sentence building with local flavour", "Build practical local sentences from a small word bank, adding grammar and vocabulary step by step."],
      ["Introductions and small talk builder", "Build natural local sentences for introductions, basic small talk, and simple follow-up questions."],
      ["Plans and invitations builder", "Build sentences for making plans, inviting someone, accepting, refusing softly, and suggesting alternatives."],
      ["Food, shops, and prices builder", "Build sentences for ordering, asking prices, choosing items, paying, and reacting naturally."],
      ["Transport and being late builder", "Build sentences for locations, delays, directions, transport problems, and being on the way."],
      ["Work and daily routine builder", "Build sentences about work, study, daily routines, responsibilities, and simple problems."],
      ["Opinions and preferences builder", "Build sentences for likes, dislikes, preferences, simple opinions, and polite agreement/disagreement."],
      ["Complete B1 local sentence builder", "Combine introductions, plans, food, transport, work, opinions, and simple problem-solving in one cumulative speaking drill."],
    ],
    B2: [
      ["Natural storytelling with local flavour", "Tell what happened, add reactions, use connectors, and include common local discourse markers."],
      ["Solving a problem calmly", "Explain a problem, ask for help, clarify what happened, and negotiate a practical solution."],
      ["Social invitations and soft refusals", "Handle plans, invitations, pressure, nerves, excuses, and friendly refusal using local tone."],
      ["Workplace and interview language", "Talk about responsibilities, experience, strengths, goals, and workplace small talk with local phrasing."],
      ["Opinions, agreement, and disagreement", "Express views, agree, disagree softly, hedge, and respond without sounding rude."],
      ["Complaints and customer service", "Complain politely about service, housing, food, transport, payments, or delays with local expressions."],
      ["Phone calls and voice notes", "Start calls, clarify, leave messages, ask someone to repeat, and sound natural in spoken chat."],
      ["Complete B2 local conversation", "Combine stories, opinions, plans, complaints, work, emotions, and problem-solving in one drill."],
    ],
    C1: [
      ["Advanced slang, nuance, and register", "Use slang, idioms, hedging, humour, and register shifts appropriately without sounding forced."],
      ["Diplomatic disagreement", "Disagree, challenge ideas, soften criticism, and keep rapport in a culturally natural way."],
      ["Professional boundaries and negotiation", "Discuss scope, salary/price, expectations, compromise, and limits with mature local phrasing."],
      ["Emotional honesty and difficult conversations", "Express vulnerability, regret, boundaries, closure, and care without sounding dramatic or cold."],
      ["Reading the room socially", "Notice tone, humour, indirect meaning, teasing, seriousness, and when a local phrase is too casual."],
      ["Local workplace rapport", "Build trust, joke lightly, soften requests, handle feedback, and sound natural with colleagues or clients."],
      ["Texting, voice notes, and casual replies", "Use natural short replies, reactions, fillers, and informal local phrasing in chat-style speech."],
      ["Complete C1 local conversation", "Combine slang, register, social nuance, work tone, emotion, and natural replies in one drill."],
    ],
    C2: [
      ["Advanced slang, nuance, and register under pressure", "Use slang, idioms, hedging, humour, and register shifts with near-native control."],
      ["Diplomatic disagreement with subtle tone", "Challenge ideas, push back, tease lightly, soften criticism, and keep rapport in a culturally natural way."],
      ["Professional negotiation and boundaries", "Discuss scope, money, expectations, compromise, and limits with mature local phrasing."],
      ["Difficult emotional conversations", "Express vulnerability, regret, boundaries, closure, and care with precise tone and register."],
      ["Persuasion and handling objections", "Sell an idea, explain value, respond to pushback, and create urgency without pressure."],
      ["Conflict resolution and de-escalation", "Acknowledge tension, clarify intention, repair misunderstandings, and propose a path forward."],
      ["Powerful personal/professional storytelling", "Tell a nuanced story with pacing, emotion, humour, reflection, and local rhetorical style."],
      ["Complete C2 local fluency simulation", "Combine slang, nuance, diplomacy, persuasion, conflict, emotion, humour, and mature register control."],
    ],
  };

  return getSpecialCourses().flatMap((course) =>
    (Object.entries(byLevel) as Array<[SpecialCourseLevel, Array<[string, string]>]>).flatMap(([level, topics]) =>
      topics.map(([topic, objective], index) => ({
        id: `${course.id}-${level.toLowerCase()}-${index + 1}-${slugText(topic)}`,
        courseId: course.id,
        level,
        topic,
        objective,
      })),
    ),
  );
}

function getTopicMap(): LessonTopic[] {
  const priorityByTopic = new Map<string, number>([
    ["English|A1-A2|Presentarte desde cero", 1],
    ["Spanish|A1-A2|Introduce yourself in Spanish", 2],
    ["English|A1-A2|Pedir ayuda cuando no entiendes", 3],
    ["Spanish|A1-A2|Asking for repetition", 4],
    ["English|A1-A2|Primer día de trabajo", 5],
    ["Spanish|A1-A2|Say what you want, need, and can do", 6],
    ["English|A1-A2|Hablar de tu rutina diaria", 7],
    ["Spanish|A1-A2|Daily routine", 8],
    ["English|A1-A2|Gustos y preferencias", 9],
    ["Spanish|A1-A2|Likes and dislikes", 10],
    ["English|A1-A2|Pedir comida y bebida", 11],
    ["Spanish|A1-A2|Ordering food and coffee", 12],
    ["English|A1-A2|Hacer planes simples", 13],
    ["Spanish|A1-A2|Meeting a friend", 14],
    ["English|B1-B2|Prepararte para una entrevista", 15],
    ["Spanish|B1-B2|Last-minute invitation", 16],
    ["English|B1-B2|Problema con compañero de piso", 17],
    ["Spanish|B1-B2|Apartment without water", 18],
    ["English|C1-C2|Comunicación diplomática", 19],
    ["Spanish|C1-C2|Advanced nuance in Spanish", 20],
  ]);
  const rows: Array<Omit<LessonTopic, "id" | "priority">> = [
    { language: "English", level: "A1-A2", topic: "Presentarte desde cero", objective: "Say name, country, city, job/studies, and why you are learning English." },
    { language: "English", level: "A1-A2", topic: "Primer día de trabajo", objective: "Introduce yourself, say you are new, ask where to go, ask for help." },
    { language: "English", level: "A1-A2", topic: "Pedir ayuda cuando no entiendes", objective: "Say \"I do not understand\", \"Can you repeat?\", \"Can you speak slowly?\"" },
    { language: "English", level: "A1-A2", topic: "Hablar de tu rutina diaria", objective: "Say what you do every day, morning, afternoon, night." },
    { language: "English", level: "A1-A2", topic: "Gustos y preferencias", objective: "Say what you like, do not like, prefer, and enjoy doing." },
    { language: "English", level: "A1-A2", topic: "Pedir comida y bebida", objective: "Order food, ask prices, say what you want, say allergies/preferences." },
    { language: "English", level: "A1-A2", topic: "Hacer planes simples", objective: "Say \"I am going to...\", \"Do you want to...?\", \"Let us meet...\"" },
    { language: "English", level: "A1-A2", topic: "Transporte y direcciones", objective: "Ask where something is, say you are lost, understand basic directions." },
    { language: "English", level: "A1-A2", topic: "El bus equivocado", objective: "Explain where you are, say you made a mistake, ask what to do." },
    { language: "English", level: "A1-A2", topic: "En el aeropuerto", objective: "Say where you are going, ask about gate, baggage, passport, delays." },
    { language: "English", level: "A1-A2", topic: "En el hotel", objective: "Check in, ask for your room, say there is a problem." },
    { language: "English", level: "A1-A2", topic: "Comprar algo en una tienda", objective: "Ask price, size, colour, say \"I will take it\", \"I am just looking.\"" },
    { language: "English", level: "A1-A2", topic: "Hablar de tu familia", objective: "Say who is in your family, describe people simply." },
    { language: "English", level: "A1-A2", topic: "Hablar de tu casa y ciudad", objective: "Describe where you live, your neighbourhood, what is nearby." },
    { language: "English", level: "A1-A2", topic: "Hablar de tu trabajo o estudios", objective: "Say what you do, where you work/study, what you need English for." },
    { language: "English", level: "A1-A2", topic: "Problemas básicos", objective: "Say \"I have a problem\", \"My phone does not work\", \"I need help.\"" },
    { language: "English", level: "A1-A2", topic: "Citas y quedar con alguien", objective: "Arrange a time/place, say you are late, say you are on your way." },
    { language: "English", level: "A1-A2", topic: "Hablar de ayer", objective: "Use simple past for yesterday: went, ate, watched, worked, studied." },
    { language: "English", level: "A1-A2", topic: "Hablar del fin de semana", objective: "Say what you did and what you are going to do." },
    { language: "English", level: "A1-A2", topic: "Preguntas básicas de conversación", objective: "Ask and answer \"Where are you from?\", \"What do you do?\", \"Do you like...?\"" },
    { language: "English", level: "A1-A2", topic: "Inglés de supervivencia", objective: "Essential emergency phrases for travel, shops, transport, problems." },
    { language: "English", level: "A1-A2", topic: "Frases para sonar educado", objective: "Please, thank you, sorry, excuse me, could you, would you." },
    { language: "English", level: "A1-A2", topic: "Hablar de objetivos", objective: "Say what you want, need, can, and are going to do." },
    { language: "English", level: "A1-A2", topic: "Mini conversación completa A1-A2", objective: "Combine introduction, routine, likes, plans, problems, and past." },
    { language: "English", level: "B1-B2", topic: "Contar una historia simple", objective: "Explain what happened, where, when, who was there, and why." },
    { language: "English", level: "B1-B2", topic: "Explicar un problema con calma", objective: "Describe a problem clearly without panicking." },
    { language: "English", level: "B1-B2", topic: "Problema con compañero de piso", objective: "Make a polite complaint and suggest a solution." },
    { language: "English", level: "B1-B2", topic: "Prepararte para una entrevista", objective: "Talk about experience, strengths, responsibilities, and goals." },
    { language: "English", level: "B1-B2", topic: "Hablar de experiencia laboral", objective: "Use present perfect and past simple to describe work history." },
    { language: "English", level: "B1-B2", topic: "Dar opiniones naturales", objective: "Say \"I think\", \"In my opinion\", \"I agree\", \"I am not sure.\"" },
    { language: "English", level: "B1-B2", topic: "Dar consejos", objective: "Use should, should not, could, if I were you." },
    { language: "English", level: "B1-B2", topic: "Hacer una queja educada", objective: "Complain politely in a hotel, restaurant, apartment, or service situation." },
    { language: "English", level: "B1-B2", topic: "Reprogramar planes", objective: "Cancel, postpone, reschedule, explain why, apologise naturally." },
    { language: "English", level: "B1-B2", topic: "Hablar de salud y sintomas", objective: "Explain how you feel, pain, symptoms, pharmacy/doctor phrases." },
    { language: "English", level: "B1-B2", topic: "Explicar una confusion", objective: "Say what you thought, what happened, and what you realised." },
    { language: "English", level: "B1-B2", topic: "Small talk natural", objective: "Keep a casual conversation going with follow-up questions." },
    { language: "English", level: "B1-B2", topic: "Inglés para llamadas", objective: "Start calls, ask for clarification, repeat information, end politely." },
    { language: "English", level: "B1-B2", topic: "Inglés para reuniones", objective: "Give updates, ask questions, agree, disagree, clarify tasks." },
    { language: "English", level: "B1-B2", topic: "Pedir favores", objective: "Ask someone to help you without sounding demanding." },
    { language: "English", level: "B1-B2", topic: "Hablar de planes futuros", objective: "Use going to, will, might, probably, hopefully." },
    { language: "English", level: "B1-B2", topic: "Expresar emociones", objective: "Say you are stressed, excited, worried, disappointed, relieved." },
    { language: "English", level: "B1-B2", topic: "Hablar de dinero y precios", objective: "Explain budget, costs, payments, discounts, affordability." },
    { language: "English", level: "B1-B2", topic: "Resolver un malentendido", objective: "Explain what you meant, apologise, correct the misunderstanding." },
    { language: "English", level: "B1-B2", topic: "Defender tu punto de vista", objective: "Explain your opinion clearly and respond to disagreement." },
    { language: "English", level: "B1-B2", topic: "Narrar una experiencia de viaje", objective: "Tell a travel story with problems, surprises, and reactions." },
    { language: "English", level: "B1-B2", topic: "Pedir feedback", objective: "Ask how to improve, respond to criticism, clarify next steps." },
    { language: "English", level: "B1-B2", topic: "Inglés para networking", objective: "Introduce yourself professionally and explain what you do." },
    { language: "English", level: "B1-B2", topic: "Mini conversación completa B1-B2", objective: "Combine problems, advice, opinions, past experiences, and plans." },
    { language: "English", level: "C1-C2", topic: "Comunicación diplomática", objective: "Say difficult things politely and professionally." },
    { language: "English", level: "C1-C2", topic: "Cliente difícil freelance", objective: "Set boundaries, explain scope, budget, quality, and expectations." },
    { language: "English", level: "C1-C2", topic: "Conversación difícil emocional", objective: "Be honest, set boundaries, avoid sounding aggressive." },
    { language: "English", level: "C1-C2", topic: "Negociar precio o salario", objective: "Discuss money, value, compromise, and conditions." },
    { language: "English", level: "C1-C2", topic: "Soft disagreement", objective: "Disagree without sounding rude or direct." },
    { language: "English", level: "C1-C2", topic: "Expresar matices", objective: "Say \"partly\", \"to some extent\", \"it depends\", \"not necessarily.\"" },
    { language: "English", level: "C1-C2", topic: "Liderar una reunion", objective: "Open, guide, summarise, challenge ideas, close with action points." },
    { language: "English", level: "C1-C2", topic: "Dar feedback delicado", objective: "Give criticism without damaging the relationship." },
    { language: "English", level: "C1-C2", topic: "Recibir crítica", objective: "Respond calmly, clarify, accept, disagree, or defend respectfully." },
    { language: "English", level: "C1-C2", topic: "Contar una historia con impacto", objective: "Tell an advanced personal/professional story with emotion and structure." },
    { language: "English", level: "C1-C2", topic: "Persuasión y ventas", objective: "Explain value, handle objections, create urgency without pressure." },
    { language: "English", level: "C1-C2", topic: "Hablar de ambición y futuro", objective: "Discuss freedom, risk, stability, long-term goals, trade-offs." },
    { language: "English", level: "C1-C2", topic: "Resolver conflicto", objective: "De-escalate, acknowledge, clarify, propose a way forward." },
    { language: "English", level: "C1-C2", topic: "Inglés para entrevistas avanzadas", objective: "Give sophisticated answers about leadership, mistakes, goals, pressure." },
    { language: "English", level: "C1-C2", topic: "Lenguaje emocional avanzado", objective: "Express regret, uncertainty, boundaries, vulnerability, closure." },
    { language: "English", level: "C1-C2", topic: "Mini conversación completa C1-C2", objective: "Combine diplomacy, nuance, disagreement, boundaries, and persuasion." },
    { language: "Spanish", level: "A1-A2", topic: "Introduce yourself in Spanish", objective: "Say name, nationality, city, age, job/studies, and why you are learning Spanish." },
    { language: "Spanish", level: "A1-A2", topic: "First conversation with a Spanish speaker", objective: "Greet, ask simple questions, answer naturally." },
    { language: "Spanish", level: "A1-A2", topic: "Say what you want, need, and can do", objective: "Practise quiero, necesito, puedo + infinitive." },
    { language: "Spanish", level: "A1-A2", topic: "Daily routine", objective: "Talk about what you do every day using present tense." },
    { language: "Spanish", level: "A1-A2", topic: "Likes and dislikes", objective: "Use me gusta, no me gusta, prefiero, me encanta." },
    { language: "Spanish", level: "A1-A2", topic: "Ordering food and coffee", objective: "Ask for food, drinks, prices, and say what you want." },
    { language: "Spanish", level: "A1-A2", topic: "Meeting a friend", objective: "Arrange time, place, say you are late, say you are on the way." },
    { language: "Spanish", level: "A1-A2", topic: "Directions and location", objective: "Use estoy en, cerca de, lejos de, al lado de, enfrente de." },
    { language: "Spanish", level: "A1-A2", topic: "The wrong cafe", objective: "Explain you are in the wrong place and fix the plan." },
    { language: "Spanish", level: "A1-A2", topic: "At the supermarket", objective: "Ask for things, quantities, prices, bags, payment." },
    { language: "Spanish", level: "A1-A2", topic: "At the gym", objective: "Say what you train, ask where things are, talk about routine." },
    { language: "Spanish", level: "A1-A2", topic: "At the hotel", objective: "Check in, ask for room, Wi-Fi, towels, problems." },
    { language: "Spanish", level: "A1-A2", topic: "In a taxi or Uber", objective: "Say destination, ask price/time, give basic directions." },
    { language: "Spanish", level: "A1-A2", topic: "Talking about family", objective: "Describe family members and simple personality." },
    { language: "Spanish", level: "A1-A2", topic: "Talking about your city", objective: "Say where you live, what it is like, what there is nearby." },
    { language: "Spanish", level: "A1-A2", topic: "Asking for repetition", objective: "Say \"I do not understand\", \"repeat please\", \"slower please.\"" },
    { language: "Spanish", level: "A1-A2", topic: "Simple past: yesterday", objective: "Use fui, hice, comí, vi, trabajé, estudié." },
    { language: "Spanish", level: "A1-A2", topic: "Weekend plans", objective: "Use voy a + infinitive for future plans." },
    { language: "Spanish", level: "A1-A2", topic: "Travel survival Spanish", objective: "Airport, bus, hotel, food, help, emergency basics." },
    { language: "Spanish", level: "A1-A2", topic: "Apologies and politeness", objective: "perdón, disculpa, gracias, con permiso, me puedes ayudar." },
    { language: "Spanish", level: "A1-A2", topic: "Describe people", objective: "Use ser, estar, tener, adjectives, personality, appearance." },
    { language: "Spanish", level: "A1-A2", topic: "Basic questions", objective: "Practise qué, dónde, cuándo, por qué, cómo, cuánto." },
    { language: "Spanish", level: "A1-A2", topic: "Voice note challenge", objective: "Build confidence sending a simple Spanish voice note." },
    { language: "Spanish", level: "A1-A2", topic: "Complete A1-A2 mini conversation", objective: "Combine intro, routine, likes, plans, location, food, help." },
    { language: "Spanish", level: "B1-B2", topic: "Tell a past story", objective: "Explain what happened using preterite and imperfect." },
    { language: "Spanish", level: "B1-B2", topic: "Explain a problem", objective: "Use no hay, tengo un problema, desde, acabo de, necesito." },
    { language: "Spanish", level: "B1-B2", topic: "Apartment without water", objective: "Message a host politely and negotiate a solution." },
    { language: "Spanish", level: "B1-B2", topic: "Last-minute invitation", objective: "Talk about nerves, plans, social pressure, and deciding to go." },
    { language: "Spanish", level: "B1-B2", topic: "Give advice in Spanish", objective: "Use deberías, podrías, yo que tú, si fuera tú." },
    { language: "Spanish", level: "B1-B2", topic: "Express opinions", objective: "Use creo que, pienso que, me parece que, no estoy seguro." },
    { language: "Spanish", level: "B1-B2", topic: "Agree and disagree", objective: "Use tienes razón, no necesariamente, depende, no lo veo así." },
    { language: "Spanish", level: "B1-B2", topic: "Make polite complaints", objective: "Complain about service, food, room, noise, payment." },
    { language: "Spanish", level: "B1-B2", topic: "Talk about health", objective: "Explain symptoms, pain, medicine, doctor/pharmacy situations." },
    { language: "Spanish", level: "B1-B2", topic: "Talk about work", objective: "Explain job, responsibilities, schedule, problems, goals." },
    { language: "Spanish", level: "B1-B2", topic: "Make phone calls", objective: "Start calls, ask for someone, clarify, leave a message." },
    { language: "Spanish", level: "B1-B2", topic: "Explain a misunderstanding", objective: "Say what you meant, apologise, clarify intention." },
    { language: "Spanish", level: "B1-B2", topic: "Talk about money", objective: "Prices, budget, expensive/cheap, discounts, payment problems." },
    { language: "Spanish", level: "B1-B2", topic: "Talk about progress", objective: "Say what you have improved, what is still hard, what you need to practise." },
    { language: "Spanish", level: "B1-B2", topic: "Tell someone how you feel", objective: "Nervous, stressed, excited, worried, embarrassed, relieved." },
    { language: "Spanish", level: "B1-B2", topic: "Make and change plans", objective: "Cancel, postpone, reschedule, suggest alternatives." },
    { language: "Spanish", level: "B1-B2", topic: "Describe a difficult day", objective: "Use connectors: aunque, entonces, por eso, sin embargo." },
    { language: "Spanish", level: "B1-B2", topic: "Ask for favours", objective: "Ask naturally without sounding too direct." },
    { language: "Spanish", level: "B1-B2", topic: "Language exchange conversation", objective: "Ask questions, keep conversation going, correct each other politely." },
    { language: "Spanish", level: "B1-B2", topic: "Job interview in Spanish", objective: "Talk about experience, strengths, goals, and motivation." },
    { language: "Spanish", level: "B1-B2", topic: "Tell a travel story", objective: "Describe a trip, problem, surprise, and lesson learned." },
    { language: "Spanish", level: "B1-B2", topic: "Debate simple topics", objective: "Give reasons, examples, contrast, and conclusions." },
    { language: "Spanish", level: "B1-B2", topic: "Colombian social Spanish", objective: "Natural friendly phrases, invitations, casual plans, soft refusal." },
    { language: "Spanish", level: "B1-B2", topic: "Complete B1-B2 conversation", objective: "Combine stories, opinions, advice, problems, and social Spanish." },
    { language: "Spanish", level: "C1-C2", topic: "Advanced nuance in Spanish", objective: "Use subtle phrases like hasta cierto punto, depende, en parte." },
    { language: "Spanish", level: "C1-C2", topic: "Startup offer", objective: "Discuss risk, freedom, stability, growth, and long-term decisions." },
    { language: "Spanish", level: "C1-C2", topic: "Message that changed everything", objective: "Talk about boundaries, closure, honesty, and emotional nuance." },
    { language: "Spanish", level: "C1-C2", topic: "Diplomatic disagreement", objective: "Disagree without sounding aggressive." },
    { language: "Spanish", level: "C1-C2", topic: "Professional boundaries", objective: "Say no, define scope, discuss expectations, keep tone respectful." },
    { language: "Spanish", level: "C1-C2", topic: "Negotiate price or salary", objective: "Discuss value, conditions, compromise, and limits." },
    { language: "Spanish", level: "C1-C2", topic: "Give delicate feedback", objective: "Criticise with tact and suggest improvements." },
    { language: "Spanish", level: "C1-C2", topic: "Receive criticism", objective: "Respond calmly, clarify, accept, defend, or disagree." },
    { language: "Spanish", level: "C1-C2", topic: "Emotional honesty", objective: "Express complicated feelings without sounding dramatic or harsh." },
    { language: "Spanish", level: "C1-C2", topic: "Conflict resolution", objective: "Acknowledge, clarify, de-escalate, propose next steps." },
    { language: "Spanish", level: "C1-C2", topic: "Persuasion in Spanish", objective: "Sell an idea, handle objections, explain value." },
    { language: "Spanish", level: "C1-C2", topic: "Tell a powerful personal story", objective: "Use advanced connectors, emotion, pacing, and reflection." },
    { language: "Spanish", level: "C1-C2", topic: "Discuss identity and change", objective: "Talk about growth, discipline, fear, ambition, and self-image." },
    { language: "Spanish", level: "C1-C2", topic: "Advanced interview Spanish", objective: "Discuss leadership, pressure, mistakes, lessons, future goals." },
    { language: "Spanish", level: "C1-C2", topic: "Speak like a natural adult", objective: "Avoid textbook Spanish and use mature, smooth phrasing." },
    { language: "Spanish", level: "C1-C2", topic: "Complete C1-C2 conversation", objective: "Combine nuance, emotion, persuasion, disagreement, and boundaries." },
  ];

  return rows.map((row, index) => ({
    ...row,
    id: topicId(row.language, row.level, index + 1, row.topic),
    priority: priorityByTopic.get(`${row.language}|${row.level}|${row.topic}`),
  }));
}

function hasLikelyQuotedOrColonTargetLanguage(text: string, language: "english" | "spanish"): boolean {
  const quotedParts = [...text.matchAll(/["“”']([^"“”']+)["“”']/g)].map((match) => match[1]);
  const colonParts = text.includes(":") ? [text.split(":").slice(1).join(":")] : [];
  const riskyParts = [...quotedParts, ...colonParts].join(" ");

  if (!riskyParts.trim()) {
    return false;
  }

  if (language === "english") {
    return /\b(i|i'm|you|you're|we|they|want|need|can|should|will|don't|hello|hi|work|learn|speak|coffee|bus)\b/i.test(
      riskyParts,
    );
  }

  return /[áéíóúñ¿¡]|\b(quiero|necesito|puedo|puedes|hola|gracias|por favor|estoy|tengo|vamos|cafe|español)\b/i.test(
    riskyParts,
  );
}

function hasMojibake(text: string): boolean {
  return /(?:Ã.|Â[¿¡]|�)/.test(text);
}

function isSentenceBuilderScript(script: LessonScript): boolean {
  return /builder/i.test(`${script.id} ${script.title} ${script.outputSlug}`) && (script.durationGoalMinutes ?? 0) <= 11;
}

function getReadiness(script: LessonScript, timeline: LessonTimeline) {
  const warnings: string[] = [];
  const blockers: string[] = [];
  const elevenLabsSegments = timeline.segments.filter((segment) => !segment.voiceId.startsWith("local:"));
  const localSegments = timeline.segments.length - elevenLabsSegments.length;
  const paidCharacterCount = elevenLabsSegments.reduce((total, segment) => total + segment.text.length, 0);
  const modelId = getElevenLabsModelId();
  const creditRate = getCreditRateForModel(modelId);
  const estimatedCredits = Math.ceil(paidCharacterCount * creditRate);
  const timerSegments = timeline.segments.filter((segment) => segment.showTimer).length;
  const answerSegments = timeline.segments.filter((segment) => segment.type === "answer").length;
  const promptSegments = timeline.segments.filter(
    (segment) => segment.type === "prompt" || segment.type === "review" || segment.type === "final_challenge",
  ).length;
  const mojibakeSegments = script.segments.filter((segment) =>
    [segment.text, segment.subtitle, segment.showOnScreenText, segment.targetAnswer, segment.nativePrompt]
      .filter(Boolean)
      .some((value) => hasMojibake(value ?? "")),
  );

  if (timeline.segments.length === 0) {
    blockers.push("The lesson has no segments.");
  }

  if (elevenLabsSegments.length === 0) {
    blockers.push("No ElevenLabs voice segments were found. Check the voice roles in your JSON.");
  }

  if (answerSegments === 0) {
    warnings.push("No answer segments found. Listen-and-respond lessons usually need native answer clips.");
  }

  if (timerSegments === 0) {
    warnings.push("No countdown timers found. Add showTimer/responsePauseMs to prompt or repeat segments.");
  }

  if (mojibakeSegments.length > 0) {
    blockers.push(
      `Text encoding looks broken in ${mojibakeSegments
        .slice(0, 8)
        .map((segment) => segment.id)
        .join(", ")}. Fix characters like Ã±/Â¿ before generating, otherwise audio and subtitles will be wrong.`,
    );
  }

  if ((script.durationGoalMinutes ?? 0) < 9 || (script.estimatedMinutes ?? 0) < 9) {
    warnings.push("This script is configured below the current PU3NTE minimum target. Use 10 minutes for sentence-builder speaking lessons or 15 minutes for standard listen-and-respond lessons.");
  }

  if (isSentenceBuilderScript(script)) {
    const slowRepeatSegments = script.segments.filter(
      (segment) => (segment.type === "repeat" || segment.type === "shadow") && segment.speed === 0.75 && segment.showTimer,
    );

    if (slowRepeatSegments.length < 6) {
      warnings.push(
        "Sentence-builder pacing looks too fast: add repeat/shadow segments with speed 0.75 and showTimer true after answer segments so learners hear a slower model and get a separate repeat pause.",
      );
    }
  }

  const riskyLocalNarratorSegments = timeline.segments.filter((segment) => {
    if (segment.role !== "narrator") return false;
    if (segment.voiceId === "local:spanish") return hasLikelyQuotedOrColonTargetLanguage(segment.text, "english");
    if (segment.voiceId === "local:english") return hasLikelyQuotedOrColonTargetLanguage(segment.text, "spanish");
    return false;
  });

  if (riskyLocalNarratorSegments.length > 0) {
    warnings.push(
      `Possible mixed-language local narrator lines: ${riskyLocalNarratorSegments
        .slice(0, 5)
        .map((segment) => segment.id)
        .join(", ")}. Keep local narrator text monolingual; put target phrases in showOnScreenText/targetAnswer and pronounce them with a native ElevenLabs answer/repeat role.`,
    );
  }

  if (script.durationGoalMinutes) {
    const generatedMinutes = timeline.totalDurationMs / 60_000;
    const difference = Math.abs(generatedMinutes - script.durationGoalMinutes);

    if (difference >= Math.max(2, script.durationGoalMinutes * 0.15)) {
      warnings.push(
        `Duration target is ${script.durationGoalMinutes} min, but dry-run estimates ${formatDuration(
          timeline.totalDurationMs,
        )}.`,
      );
    }
  }

  if (timeline.segments.length > 250) {
    warnings.push("This is a large lesson. MP4 rendering and ElevenLabs generation may take a while.");
  }

  if (timeline.totalDurationMs > 18 * 60_000) {
    warnings.push("Lesson is over 18 minutes. The current PU3NTE target is about 15 minutes, so review pacing before generating.");
  }

  const state = blockers.length > 0 ? "blocked" : warnings.length > 0 ? "review" : "ready";

  return {
    state,
    headline:
      state === "ready"
        ? "Ready to generate"
        : state === "review"
          ? "Looks valid, review notes first"
          : "Fix blockers before generating",
    nextStep:
      state === "blocked"
        ? "Fix the blockers in the JSON, then run Dry Run again."
        : "If this pacing looks right, click Generate MP4 + Audio. You do not need to generate audio first.",
    warnings,
    blockers,
    stats: {
      duration: formatDuration(timeline.totalDurationMs),
      segments: timeline.segments.length,
      promptSegments,
      answerSegments,
      timerSegments,
      elevenLabsSegments: elevenLabsSegments.length,
      localTtsSegments: localSegments,
      estimatedPaidClips: elevenLabsSegments.length,
      paidCharacterCount,
      estimatedElevenLabsCredits: estimatedCredits,
      elevenLabsModelId: modelId,
      creditRate,
      creditRateLabel: `${creditRate} credit${creditRate === 1 ? "" : "s"} per character`,
      targetMinutes: script.durationGoalMinutes ?? null,
    },
  };
}

function getCreditRateForModel(modelId: string): number {
  const normalized = modelId.toLowerCase();

  if (normalized.includes("flash") || normalized.includes("turbo")) {
    return 0.5;
  }

  return 1;
}

async function handleGenerate(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
  const body = JSON.parse(await readRequestBody(request)) as StudioRequest;

  if (!body.scriptJson?.trim()) {
    jsonResponse(response, 400, { ok: false, error: "Paste a lesson JSON script before generating." });
    return;
  }

  const parsed = JSON.parse(body.scriptJson);
  const script = validateLessonScript(parsed);
  const scriptPath = await saveStudioScript(body.scriptJson, script.outputSlug);
  const job: StudioJob = {
    id: makeJobId(),
    status: "queued",
    mode: body.mode,
    title: script.title,
    stage: "queued",
    message: "Queued generation job",
    percent: 0,
    startedAt: Date.now(),
    updatedAt: Date.now(),
    etaSeconds: null,
    logs: [formatLogLine(`Queued ${body.mode} for ${script.title}`)],
    rawLogs: [],
  };

  jobs.set(job.id, job);
  jsonResponse(response, 202, { ok: true, jobId: job.id });

  void (async () => {
    try {
      updateJob(job, {
        stage: "start",
        message: "Starting lesson generation",
        percent: 1,
        raw: `mode=${body.mode} outputSlug=${script.outputSlug}`,
      });
      const result = await generateLessonFromScript(script, getGeneratorOptions(body), {
        onProgress: (event) => updateJob(job, event),
      });

      job.result = createStudioResult(body.mode, result, scriptPath);
      job.status = "completed";
      job.stage = "done";
      job.message = body.mode === "dry-run" ? "Dry run complete" : "Generation complete";
      job.percent = 100;
      job.completedAt = Date.now();
      job.updatedAt = job.completedAt;
      job.etaSeconds = 0;
      pushLimited(job.logs, formatLogLine(job.message));
    } catch (error) {
      job.status = "failed";
      job.stage = "error";
      job.message = "Generation failed";
      job.error = (error as Error).message;
      job.completedAt = Date.now();
      job.updatedAt = job.completedAt;
      job.etaSeconds = null;
      pushLimited(job.logs, formatLogLine(`ERROR: ${job.error}`));
      pushLimited(job.rawLogs, formatLogLine((error as Error).stack ?? (error as Error).message));
    }
  })();
}

function getChatGptPrompt(): string {
  return `You are creating a PU3NTE local speaking lesson JSON script.

Return ONLY valid JSON. Do not wrap it in markdown. Do not add comments.

Purpose:
- Generate a listen-and-respond speaking lesson for the local PU3NTE lesson generator.
- If you have web access, first check publicly available descriptions of how audio-based spaced-recall language lessons such as Pimsleur are structured. Use that research only to understand pacing, recall, prompt/response flow, and graduated repetition. Do not copy proprietary scripts, wording, course names, or branded language.
- The lesson will become MP4, MP3, SRT subtitles, transcript, timeline, and metadata.
- Do not call it Pimsleur-style or mention Pimsleur in the generated lesson content.

Required JSON shape:
{
  "id": "kebab-case-lesson-id",
  "title": "Spanish A1 Speaking Drill: Topic",
  "subtitle": "Short learner-facing subtitle.",
  "course": "Spanish Speaking Drills",
  "level": "A1-A2",
  "targetLanguage": "spanish",
  "learnerNativeLanguage": "english",
  "estimatedMinutes": 15,
  "durationGoalMinutes": 15,
  "outputSlug": "same-kebab-case-lesson-id",
  "branding": {
    "logoText": "PU3NTE",
    "theme": "default",
    "showLogo": true
  },
  "voices": {
    "narrator": "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
    "native_male": "env:ELEVENLABS_SPANISH_MALE_VOICE_ID",
    "native_female": "env:ELEVENLABS_SPANISH_FEMALE_VOICE_ID"
  },
  "voiceSettings": {
    "stability": 0.55,
    "similarityBoost": 0.8,
    "style": 0.25,
    "useSpeakerBoost": true
  },
  "settings": {
    "defaultPauseAfterMs": 700,
    "defaultResponsePauseMs": 4000,
    "subtitleMode": "line",
    "videoWidth": 1920,
    "videoHeight": 1080,
    "fps": 30,
    "backgroundMusic": false
  },
  "segments": []
}

Hard duration requirements:
- This must be a real 15-minute lesson. 5 minutes is invalid.
- estimatedMinutes MUST be exactly 15.
- durationGoalMinutes MUST be exactly 15.
- Do not use estimatedMinutes: 5 or durationGoalMinutes: 5.
- The generated timeline should dry-run around 13-16 minutes. If your draft would be under 12 minutes, add more prompt/answer/repeat groups and spaced review before returning JSON.
- Include enough content for 15 minutes: usually 24-32 prompt/answer/repeat groups, 8-12 spaced review prompts, 1 final challenge, and 1 outro.

Allowed segment types:
intro, explanation, prompt, response_pause, answer, repeat, shadow, dialogue, review, final_challenge, outro

Allowed roles:
narrator, native_male, native_female, english_male, english_female, spanish_male, spanish_female, speaker_1, speaker_2

Allowed visual modes:
intro, listen, your_turn, answer, repeat, shadow, dialogue, review, final_challenge, outro

Each segment must include:
- id: unique string
- type: one allowed segment type
- role: one allowed role
- text: spoken text

Useful optional segment fields:
- voiceId: optional per-segment voice override, e.g. use this only when the selected prompt asks for ElevenLabs intro narration with local TTS for the rest
- subtitle
- visualTitle
- visualSubtitle
- visualMode
- pauseAfterMs
- responsePauseMs
- showTimer
- timerLabel
- speakerName
- showOnScreenText
- targetAnswer
- nativePrompt
- speed

Timing rules:
- Prompt, review, and final_challenge segments with learner response time should have showTimer: true.
- Usually omit responsePauseMs on learner response prompts. The PU3NTE generator dynamically scales learner repeat time from targetAnswer/showOnScreenText length.
- Only set responsePauseMs manually when you intentionally need an override. Short phrases need about 2400-3500ms, medium sentences about 4500-7500ms, and long final challenges about 8000-12000ms.
- Answer segments should usually have showTimer: false and pauseAfterMs between 600 and 1200.
- Explanation, intro, and outro segments should usually use pauseAfterMs between 500 and 900.
- Do not rely on TTS for silence; pauses are generated by the tool.
- Include review prompts later in the lesson for spaced recall.

Voice rules:
- For English-speaker-learning-Spanish lessons, use the narrator voice requested by the selected prompt setting, plus native_male/native_female env Spanish voices.
- For Spanish-speaker-learning-English lessons, use the narrator voice requested by the selected prompt setting, plus english_male/english_female env English voices.
- If narrator is local TTS, use "local:english" or "local:spanish" to save credits and keep narrator lines mostly in that language.
- If narrator is ElevenLabs, use "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID" or "env:ELEVENLABS_SPANISH_NARRATOR_VOICE_ID"; these narrator voices should be bilingual if narrator lines mix both languages.
- IMPORTANT: Never make a narrator voice pronounce the target-language answer inside the same spoken line.
- Bad for Spanish narrator: "Ahora di: I want coffee." A Spanish narrator voice can mispronounce the English.
- Bad for English narrator: "Say: Quiero cafe." An English narrator voice can mispronounce the Spanish.
- Good pattern: narrator text says only the instruction in the learner's native language, e.g. "Ahora di esta frase en inglés." Put the target phrase in showOnScreenText/nativePrompt/targetAnswer, then use an answer or repeat segment with an English/Spanish ElevenLabs native voice to pronounce it.
- Keep narrator segments monolingual whenever possible when using local TTS. If using ElevenLabs bilingual narrator, occasional mixed-language narrator lines are allowed, but target answers should still be modeled by the target-language voice roles.

Content rules:
- Make it a serious PU3NTE Speaking Drill / Listen & Respond Lesson.
- Use clear prompt -> pause -> answer -> repeat flows.
- Create a focused 15-minute lesson, not a 5-minute or 30-minute lesson.
- Include intro, 24-32 prompt/answer/repeat groups, 8-12 spaced review prompts, final_challenge, and outro.
- Before returning JSON, do a mental duration check. If the lesson has fewer than about 80 total segments, it is probably too short for 15 minutes.
- Keep the target language natural, beginner-appropriate, and useful.
- Set outputSlug equal to id.
- Return only the JSON object.`;
}

function getDetailedChatGptPrompt(): string {
  return `${getChatGptPrompt()}

DETAILED GENERATION BRIEF FOR A CONTEXTLESS CHATGPT CHAT

You are generating JSON for a local PU3NTE speaking lesson generator. The style is a listen-and-respond audio lesson inspired by proven audio-course principles: the learner hears a prompt, gets time to answer out loud, hears the correct native answer, then repeats or shadows it. The lesson should feel like a serious guided audio speaking drill, not a video lecture and not a vocabulary list.

Before writing the JSON, if you have internet/web access, check publicly available descriptions of how Pimsleur-style audio language lessons are structured. Use the research only to understand the method: graduated interval recall, listen-and-respond prompts, native-speaker modeling, spaced review, short explanations, learner pauses, and cumulative phrase building. Do not copy proprietary scripts, exact wording, lesson content, trademarks, course titles, or branded phrasing. Do not mention Pimsleur in the lesson title, subtitles, transcript text, narrator text, or any JSON field intended for the learner.

Return ONLY one valid JSON object. No markdown, no explanation, no comments, no trailing prose.

The lesson must be around 15 minutes. Do not make a 5-minute lesson. Do not make a 30-minute lesson. Use "estimatedMinutes": 15 and "durationGoalMinutes": 15. If you are tempted to output 5, that is wrong.

HARD DURATION REQUIREMENTS
- estimatedMinutes must be exactly 15.
- durationGoalMinutes must be exactly 15.
- A lesson under 12 minutes is invalid.
- Aim for a dry-run estimate of roughly 13-16 minutes.
- To reach 15 minutes, create enough actual practice, not filler.
- Use about 24-32 main prompt/answer/repeat groups.
- Use about 8-12 spaced review prompts with answer clips.
- Use 1 final challenge with a longer response pause.
- Use at least about 80 total segments unless there is a very good reason.
- Before returning JSON, mentally estimate duration from spoken segments + responsePauseMs + pauseAfterMs. If the estimate is under 13 minutes, add more groups.

LANGUAGE AND VOICE RULES
- Choose the target language and learner native language from the user's request.
- If English speakers are learning Spanish, use:
  "voices": {
    "narrator": "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
    "native_male": "env:ELEVENLABS_SPANISH_MALE_VOICE_ID",
    "native_female": "env:ELEVENLABS_SPANISH_FEMALE_VOICE_ID"
  }
- If Spanish speakers are learning English, use:
  "voices": {
    "narrator": "env:ELEVENLABS_SPANISH_NARRATOR_VOICE_ID",
    "english_male": "env:ELEVENLABS_ENGLISH_MALE_VOICE_ID",
    "english_female": "env:ELEVENLABS_ENGLISH_FEMALE_VOICE_ID"
  }
- The selected prompt setting decides whether narrator is local TTS or ElevenLabs. Local TTS saves credits; ElevenLabs narrator should use a bilingual voice if narrator lines mix languages.
- Never make a narrator pronounce the target-language answer inside the same line.
- Bad: "Ahora di: I want coffee."
- Good: narrator says "Ahora di esta frase en inglés." and the target phrase appears in showOnScreenText/targetAnswer, then an English ElevenLabs answer segment says "I want coffee."
- Use the correct target-language ElevenLabs role for answer/repeat/dialogue clips.
- If the selected prompt appendix says local narrator, override the narrator mapping to local:english or local:spanish exactly as requested.
- If the selected prompt appendix says ElevenLabs narrator, use the narrator env voice exactly as requested.

TIMING RULES
- Use "settings.defaultPauseAfterMs": 700.
- Use "settings.defaultResponsePauseMs": 4000.
- Prompt/review/final_challenge segments with learner response time should have "showTimer": true.
- Do not hard-code responsePauseMs on normal learner prompts. Leave it blank so PU3NTE gives short phrases short pauses and longer sentences longer pauses based on targetAnswer/showOnScreenText.
- Only override responsePauseMs when necessary: short phrases 2400-3500, medium sentences 4500-7500, long final challenges 8000-12000.
- Answer/repeat segments: "pauseAfterMs": 600-1200.
- Do not add silence text. The generator creates pauses from pauseAfterMs/responsePauseMs.

SEGMENT FLOW
Use this pattern repeatedly:
1. Short narrator setup in learner native language only.
2. Narrator asks the learner to say something, but does not pronounce the target-language answer if the narrator voice is the wrong language.
3. Prompt segment shows the target phrase on screen via showOnScreenText/targetAnswer and gives responsePauseMs with showTimer true.
4. Native answer voice says the correct target answer clearly.
5. Native repeat/shadow segment says the same answer again naturally, sometimes slightly slower.
6. Narrator gives a very short explanation only when needed.
7. Later review segments recall older phrases at increasing intervals.
8. End with a final challenge combining several phrases.

Recommended 15-minute structure:
- 1 intro segment.
- 2-4 short explanation segments, no long lectures.
- 24-32 prompt/answer/repeat groups.
- 8-12 spaced review prompts that bring back earlier phrases after several new items.
- 1 final challenge with a longer response pause.
- 1 outro.

SPACED-RECALL DESIGN
- Introduce phrase A, model it, repeat it.
- Introduce phrase B, model it, repeat it.
- Ask for phrase A again without showing too much help.
- Introduce phrase C.
- Ask learners to combine A + C.
- Bring back phrase B later.
- Use small transformations: I want -> Do you want? -> I don't want -> I wanted.
- Use substitutions: coffee -> water -> help -> more time.
- Keep the learner active every 20-45 seconds.
- Avoid long narrator explanations that turn the lesson into a lecture.
- The learner should speak frequently, not just listen.

PROMPT STYLE EXAMPLES
For Spanish speakers learning English:
- Narrator text: "Ahora dilo en inglés."
- showOnScreenText: "Quiero café."
- targetAnswer: "I want coffee."
- English answer text: "I want coffee."

For English speakers learning Spanish:
- Narrator text: "Now say it in Spanish."
- showOnScreenText: "I want coffee."
- targetAnswer: "Quiero café."
- Spanish answer text: "Quiero café."

Do not put "Ahora di: I want coffee" in a Spanish narrator segment.
Do not put "Say: Quiero café" in an English narrator segment.

JSON SHAPE
Use exactly this shape, adapting the values:
{
  "id": "kebab-case-lesson-id",
  "title": "Clear Lesson Title",
  "subtitle": "Short learner-facing subtitle.",
  "course": "PU3NTE Speaking Drills",
  "level": "A1-A2",
  "targetLanguage": "english or spanish",
  "learnerNativeLanguage": "spanish or english",
  "estimatedMinutes": 15,
  "durationGoalMinutes": 15,
  "outputSlug": "same-kebab-case-lesson-id",
  "branding": {
    "logoText": "PU3NTE",
    "theme": "default",
    "showLogo": true
  },
  "voices": {},
  "voiceSettings": {
    "stability": 0.55,
    "similarityBoost": 0.8,
    "style": 0.25,
    "useSpeakerBoost": true
  },
  "settings": {
    "defaultPauseAfterMs": 700,
    "defaultResponsePauseMs": 4000,
    "subtitleMode": "line",
    "videoWidth": 1920,
    "videoHeight": 1080,
    "fps": 30,
    "backgroundMusic": false
  },
  "segments": []
}

SEGMENT FORMAT
Every segment must include:
- "id": unique string like "001-intro"
- "type": one of intro, explanation, prompt, response_pause, answer, repeat, shadow, dialogue, review, final_challenge, outro
- "role": one of narrator, native_male, native_female, english_male, english_female, spanish_male, spanish_female, speaker_1, speaker_2
- "text": spoken text

Optional segment field:
- "voiceId": per-segment voice override. Use it only when the selected prompt setting explicitly asks for intro-only ElevenLabs narration; otherwise rely on the voices mapping.

Useful optional fields:
- "subtitle"
- "visualTitle"
- "visualSubtitle"
- "visualMode"
- "pauseAfterMs"
- "responsePauseMs"
- "showTimer"
- "timerLabel"
- "speakerName"
- "showOnScreenText"
- "targetAnswer"
- "nativePrompt"
- "speed"

VISUAL RULES
- Use visualMode "your_turn" for prompts with timers.
- Use visualMode "answer" for native answer segments.
- Use visualMode "repeat" or "shadow" for repetition.
- Put the learner-facing prompt in showOnScreenText when narrator text avoids the target-language phrase.
- Put the correct target phrase in targetAnswer for answer/repeat/shadow.

QUALITY RULES
- Make the lesson useful, natural, and practical.
- Teach chunks, not isolated words.
- Recycle phrases with spaced recall.
- Keep beginner target-language phrases short.
- Include polite, real-life communication.
- Avoid robotic textbook dialogue.
- Avoid literal Spanish-to-English or English-to-Spanish translations.
- Keep the rhythm active: prompt, pause, answer, repeat, recall.
- Build confidence through repetition without sounding childish.
- Use natural native-speaker answers, not overformal translations.
- Make each new phrase useful in real conversation.
- Final self-check before returning JSON:
  1. estimatedMinutes is 15.
  2. durationGoalMinutes is 15.
  3. There are enough segments for a 13-16 minute lesson.
  4. Local narrator text is monolingual.
  5. Target-language answers are pronounced by the correct ElevenLabs role.
  6. Output is only valid JSON.
- Return only the JSON object.`;
}

function pageHtml(): string {
  const samplePath = path.join(generatorRoot, "sample-lessons", "spanish-a1-want-need-can.json");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PU3NTE Lesson Studio</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #050814;
        --panel: rgba(255, 255, 255, 0.075);
        --panel-strong: rgba(255, 255, 255, 0.12);
        --line: rgba(255, 255, 255, 0.16);
        --text: #ffffff;
        --muted: rgba(255, 255, 255, 0.68);
        --red: #ee2c36;
        --yellow: #ffd447;
        --cyan: #00baf2;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at 12% 18%, rgba(238, 44, 54, 0.18), transparent 28%),
          radial-gradient(circle at 86% 12%, rgba(0, 186, 242, 0.16), transparent 30%),
          linear-gradient(135deg, #050814 0%, #07111f 50%, #02030a 100%);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .shell {
        width: min(1440px, calc(100vw - 48px));
        margin: 0 auto;
        padding: 34px 0 42px;
      }

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
        margin-bottom: 28px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 18px;
      }

      .logo {
        border: 1px solid var(--line);
        background: var(--panel-strong);
        border-radius: 8px;
        padding: 12px 16px;
        font-weight: 900;
        font-size: 24px;
      }

      h1 {
        margin: 0;
        font-size: clamp(28px, 3vw, 44px);
        line-height: 1.05;
      }

      .sub {
        color: var(--muted);
        margin-top: 7px;
        font-size: 15px;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 390px;
        gap: 22px;
      }

      .panel {
        border: 1px solid var(--line);
        background: linear-gradient(135deg, rgba(255,255,255,0.105), rgba(255,255,255,0.035));
        border-radius: 8px;
        box-shadow: 0 28px 90px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      }

      .toolbar {
        display: flex;
        gap: 12px;
        justify-content: space-between;
        align-items: center;
        padding: 14px;
        border-bottom: 1px solid var(--line);
        background: rgba(255,255,255,0.045);
      }

      .btns {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      button {
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.09);
        color: white;
        border-radius: 8px;
        padding: 10px 13px;
        font-weight: 800;
        cursor: pointer;
      }

      button.primary {
        color: #06101f;
        background: linear-gradient(90deg, var(--yellow), var(--cyan));
        border-color: transparent;
      }

      button.danger {
        background: rgba(238,44,54,0.15);
        border-color: rgba(238,44,54,0.42);
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }

      textarea {
        width: 100%;
        height: calc(100vh - 220px);
        min-height: 560px;
        resize: vertical;
        border: 0;
        outline: 0;
        padding: 22px;
        background: rgba(0,0,0,0.28);
        color: #f8fbff;
        font: 14px/1.55 "Cascadia Code", "SFMono-Regular", Consolas, monospace;
      }

      aside {
        display: grid;
        gap: 16px;
        align-content: start;
      }

      .card {
        padding: 18px;
      }

      .card h2 {
        margin: 0 0 8px;
        font-size: 18px;
      }

      .card p {
        color: var(--muted);
        margin: 0 0 14px;
        line-height: 1.45;
      }

      .steps {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }

      .step {
        display: grid;
        grid-template-columns: 28px 1fr;
        gap: 10px;
        color: rgba(255,255,255,0.82);
        font-size: 14px;
        line-height: 1.4;
      }

      .step span {
        display: grid;
        place-items: center;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        color: #06101f;
        background: var(--yellow);
        font-weight: 900;
      }

      .hint {
        margin-top: 14px;
        padding: 12px;
        border-radius: 8px;
        background: rgba(0, 186, 242, 0.12);
        border: 1px solid rgba(0, 186, 242, 0.24);
        color: rgba(255,255,255,0.82);
        font-size: 13px;
        line-height: 1.45;
      }

      label {
        display: flex;
        gap: 10px;
        color: var(--muted);
        font-size: 14px;
        margin-top: 12px;
      }

      pre {
        margin: 0;
        padding: 16px;
        max-height: 330px;
        overflow: auto;
        background: rgba(0,0,0,0.32);
        border-top: 1px solid var(--line);
        color: #e9f8ff;
        font: 13px/1.5 "Cascadia Code", Consolas, monospace;
        white-space: pre-wrap;
      }

      .status {
        border-left: 4px solid var(--cyan);
      }

      .status.error {
        border-left-color: var(--red);
      }

      .result {
        padding: 16px;
        display: grid;
        gap: 14px;
      }

      .badge {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        gap: 9px;
        border-radius: 8px;
        padding: 9px 12px;
        font-weight: 900;
      }

      .badge.ready {
        color: #06101f;
        background: #38e38b;
      }

      .badge.review {
        color: #06101f;
        background: var(--yellow);
      }

      .badge.blocked,
      .badge.error {
        color: white;
        background: var(--red);
      }

      .metrics {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .metric {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px;
        background: rgba(0,0,0,0.22);
      }

      .metric strong {
        display: block;
        font-size: 22px;
        line-height: 1;
        margin-bottom: 6px;
      }

      .metric span {
        color: var(--muted);
        font-size: 12px;
      }

      .notes {
        display: grid;
        gap: 8px;
      }

      .note {
        border-radius: 8px;
        padding: 10px 12px;
        background: rgba(255,255,255,0.075);
        color: rgba(255,255,255,0.84);
        font-size: 13px;
        line-height: 1.42;
      }

      .note.warn {
        border-left: 3px solid var(--yellow);
      }

      .note.block {
        border-left: 3px solid var(--red);
      }

      .raw-label {
        color: var(--muted);
        font-size: 12px;
        text-transform: uppercase;
      }

      .progress-wrap {
        width: 100%;
        height: 14px;
        border-radius: 8px;
        background: rgba(255,255,255,0.12);
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, var(--red), var(--yellow), var(--cyan));
        transition: width 300ms ease;
      }

      .log-box {
        max-height: 300px;
        border-top: 0;
        border-radius: 8px;
        border: 1px solid var(--line);
      }

      .mini {
        color: var(--muted);
        font-size: 13px;
        line-height: 1.45;
      }

      .prompt-copy {
        margin-top: 22px;
      }

      .prompt-copy pre {
        max-height: 340px;
        white-space: pre-wrap;
        overflow: auto;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(0,0,0,0.22);
        padding: 14px;
        color: rgba(255,255,255,0.78);
        font-size: 12px;
        line-height: 1.45;
      }

      .topic-controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin: 12px 0;
      }

      .topic-controls select,
      .topic-search {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 10px 12px;
        background: rgba(255,255,255,0.075);
        color: var(--text);
      }

      .topic-list {
        max-height: 420px;
        overflow: auto;
        display: grid;
        gap: 8px;
        padding-right: 4px;
      }

      .topic-row {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 10px;
        align-items: start;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 10px;
        background: rgba(255,255,255,0.045);
      }

      .topic-row input {
        margin-top: 4px;
      }

      .topic-title {
        font-weight: 800;
        color: var(--text);
      }

      .topic-meta {
        margin-top: 3px;
        color: var(--muted);
        font-size: 12px;
      }

      .topic-objective {
        margin-top: 5px;
        color: rgba(255,255,255,0.74);
        font-size: 12px;
        line-height: 1.35;
      }

      .selector-summary {
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 12px;
        background: rgba(14, 165, 233, 0.08);
        padding: 12px;
        margin: 12px 0;
        color: rgba(255,255,255,0.84);
        line-height: 1.45;
      }

      .selector-modal {
        position: fixed;
        inset: 0;
        z-index: 50;
        display: none;
        background: rgba(2, 6, 23, 0.92);
        backdrop-filter: blur(10px);
        padding: 24px;
        overflow: auto;
      }

      .selector-modal.open {
        display: block;
      }

      .selector-modal-panel {
        max-width: 1180px;
        margin: 0 auto;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: linear-gradient(135deg, rgba(15,23,42,0.98), rgba(8,47,73,0.96));
        box-shadow: 0 28px 90px rgba(0,0,0,0.45);
        padding: 24px;
      }

      .selector-modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
      }

      .selector-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 16px;
      }

      .selector-field {
        display: grid;
        gap: 7px;
        margin-bottom: 12px;
      }

      .selector-field label {
        color: var(--muted);
        font-size: 13px;
        font-weight: 700;
      }

      .selector-field select,
      .selector-field input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 10px;
        padding: 12px;
        background: rgba(255,255,255,0.075);
        color: var(--text);
      }

      .selector-controls {
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 16px;
        background: rgba(255,255,255,0.045);
      }

      .selector-controls.hidden {
        display: none;
      }

      @media (max-width: 980px) {
        .grid {
          grid-template-columns: 1fr;
        }

        textarea {
          height: 58vh;
          min-height: 420px;
        }

        header {
          align-items: flex-start;
          flex-direction: column;
        }

        .selector-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <header>
        <div class="brand">
          <div class="logo">PU3NTE</div>
          <div>
            <h1>Lesson Studio</h1>
            <div class="sub">Local-only JSON to MP4/MP3 generator. API keys stay in Node, not the browser.</div>
          </div>
        </div>
        <button id="copyPrompt">Copy ChatGPT JSON Prompt</button>
      </header>

      <div class="grid">
        <section class="panel">
          <div class="toolbar">
            <div class="btns">
              <button id="loadSample">Load Spanish Sample</button>
              <button id="formatJson">Format JSON</button>
              <button id="copyJson">Copy JSON</button>
              <button id="dryRun">Dry Run</button>
              <button id="audioOnly">Generate Audio Only</button>
              <button id="videoOnly">Render Video Only</button>
              <button id="fullVideo" class="primary">Generate MP4 + Audio</button>
            </div>
          </div>
          <textarea id="scriptBox" spellcheck="false" placeholder="Paste lesson JSON here..."></textarea>
        </section>

        <aside>
          <section class="panel card">
            <h2>What To Do</h2>
            <p>You do not need to generate audio first if you want the video.</p>
            <div class="steps">
              <div class="step"><span>1</span><div>Paste JSON, or click <strong>Copy ChatGPT JSON Prompt</strong> and ask ChatGPT to make a lesson.</div></div>
              <div class="step"><span>2</span><div>Click <strong>Dry Run</strong>. This validates the JSON and checks the timing without spending ElevenLabs credits.</div></div>
              <div class="step"><span>3</span><div>Click <strong>Generate MP4 + Audio</strong> when you want the final lesson. It creates the MP4, MP3, SRT, transcript, timeline, and metadata in one run.</div></div>
            </div>
            <div class="hint"><strong>Generate Audio Only</strong> is optional. Use it when you want to test voices/audio before rendering the video. <strong>Render Video Only</strong> uses existing final-audio.mp3 and timeline.json, so it is best after audio is already fixed/generated.</div>
          </section>

          <section class="panel card">
            <h2>Lesson Prompt Selector</h2>
            <p>One selector controls the copied ChatGPT prompt. Generic topics and dialect/accent courses cannot both be active at once.</p>
            <div id="selectedPromptSummary" class="selector-summary">No lesson selected yet. The prompt will ask ChatGPT to choose from your written request.</div>
            <div class="btns">
              <button id="openLessonSelector" class="primary">Open Full-Screen Selector</button>
              <button id="clearLessonSelection">Clear Selection</button>
            </div>
          </section>

          <section class="panel card">
            <h2>Generation Options</h2>
            <p>Use dry run first. Audio/video calls ElevenLabs only for non-local voices.</p>
            <label><input id="forceTts" type="checkbox" /> Regenerate TTS clips</label>
            <label><input id="skipTts" type="checkbox" /> Use cached clips only</label>
          </section>

          <section class="panel card">
            <h2>Output</h2>
            <p>Generated files are written under:</p>
            <div class="mini">${outputRoot.replace(/\\/g, "\\\\")}</div>
          </section>

          <section id="statusCard" class="panel status">
            <div class="toolbar">
              <div class="mini">Status</div>
              <button id="copyStatus">Copy Status</button>
            </div>
            <div id="visualStatus" class="result">
              <div class="badge ready">Ready for JSON</div>
              <div class="mini">Paste JSON or load the sample, then run Dry Run.</div>
            </div>
            <pre id="status">Ready. Paste JSON or load the sample.</pre>
          </section>

          <section class="panel card">
            <h2>Live Logs</h2>
            <p>Shows the current stage, friendly events, raw TTS/cache/render logs, and renderer progress while a job is running.</p>
            <pre id="liveLogs" class="log-box">No job running.</pre>
          </section>
        </aside>
      </div>
      <section class="panel card prompt-copy">
        <div class="toolbar">
          <div>
            <h2>Detailed Prompt For A New ChatGPT Chat</h2>
            <p>Copy this when you want a contextless ChatGPT chat to generate a 15-minute PU3NTE speaking lesson JSON in the exact format.</p>
          </div>
          <button id="copyDetailedPrompt">Copy Detailed Prompt</button>
        </div>
        <pre id="detailedPromptText"></pre>
      </section>
    </div>

    <div id="lessonSelectorModal" class="selector-modal" aria-hidden="true">
      <div class="selector-modal-panel">
        <div class="selector-modal-header">
          <div>
            <h2>Choose What The Prompt Should Generate</h2>
            <p>Pick either a normal lesson topic or a dialect/accent course. Only one selection is active, so the copied prompt stays clean.</p>
          </div>
          <button id="closeLessonSelector">Close</button>
        </div>

        <div class="selector-field">
          <label for="selectorModeSelect">1. Lesson type</label>
          <select id="selectorModeSelect">
            <option value="general">Normal speaking lesson topic</option>
            <option value="special">Dialect / accent special course</option>
          </select>
        </div>

        <div class="selector-field">
          <label for="speakingFormatSelect">2. Speaking lesson format</label>
          <select id="speakingFormatSelect">
            <option value="listen-respond">15-min Listen & Respond speaking drill</option>
            <option value="sentence-builder">10-min Cumulative Sentence Builder speaking drill</option>
          </select>
          <p class="mini">Sentence Builder speaking lessons introduce words in chunks, repeat each word aloud, then build longer spoken sentences without typing.</p>
        </div>

        <div class="selector-field">
          <label for="narratorModeSelect">3. Narrator voice mode</label>
          <select id="narratorModeSelect">
            <option value="local">Local TTS narrator - cheaper, usually 0 narrator credits</option>
            <option value="hybrid-intro">ElevenLabs intro only, then local TTS narrator</option>
            <option value="elevenlabs">ElevenLabs bilingual narrator - better pronunciation, spends narrator credits</option>
          </select>
          <p class="mini">Hybrid gives the opening a polished bilingual ElevenLabs voice, then saves credits by switching the rest of narration to local TTS.</p>
        </div>

        <div class="selector-grid">
          <section id="generalSelectorControls" class="selector-controls">
            <h3>Normal Lesson Topic</h3>
            <p class="mini">Use this for regular English/Spanish speaking drills across A1-A2, B1-B2, and C1-C2.</p>
            <div class="topic-controls">
              <div class="selector-field">
                <label for="topicLanguageFilter">Language direction</label>
                <select id="topicLanguageFilter">
                  <option value="all">All languages</option>
                  <option value="English">English for Spanish speakers</option>
                  <option value="Spanish">Spanish for English speakers</option>
                </select>
              </div>
              <div class="selector-field">
                <label for="topicLevelFilter">Level</label>
                <select id="topicLevelFilter">
                  <option value="all">All levels</option>
                  <option value="A1-A2">A1-A2</option>
                  <option value="B1-B2">B1-B2</option>
                  <option value="C1-C2">C1-C2</option>
                </select>
              </div>
            </div>
            <div class="selector-field">
              <label for="topicSearch">Search normal topics</label>
              <input id="topicSearch" type="search" placeholder="Search topics..." />
            </div>
            <label><input id="priorityOnly" type="checkbox" /> Show priority 20 only</label>
            <div class="selector-field">
              <label for="generalTopicSelect">Lesson topic</label>
              <select id="generalTopicSelect"></select>
            </div>
            <div id="topicList" class="topic-list" hidden></div>
          </section>

          <section id="specialSelectorControls" class="selector-controls hidden">
            <h3>Dialect / Accent Special Course</h3>
            <p class="mini">Use this for B2, C1, and C2 country/accent courses with heavy local slang, sayings, idioms, and natural phrasing. B1 appears only for the 10-min Sentence Builder speaking format.</p>
            <div class="topic-controls">
              <div class="selector-field">
                <label for="specialCourseSelect">Course</label>
                <select id="specialCourseSelect"></select>
              </div>
              <div class="selector-field">
                <label for="specialLevelFilter">Level</label>
                <select id="specialLevelFilter">
                  <option value="all">All levels</option>
                  <option value="B1">B1 sentence-builder only</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>
            </div>
            <div class="selector-field">
              <label for="specialTopicSearch">Search special lessons</label>
              <input id="specialTopicSearch" type="search" placeholder="Search dialect/accent lessons..." />
            </div>
            <div class="selector-field">
              <label for="specialTopicSelect">Lesson</label>
              <select id="specialTopicSelect"></select>
            </div>
            <div id="specialTopicList" class="topic-list" hidden></div>
          </section>
        </div>

        <div id="selectorModeSummary" class="selector-summary">No lesson selected yet.</div>
        <div class="btns">
          <button id="applyLessonSelector" class="primary">Use This Prompt Setting</button>
          <button id="clearLessonSelectionModal">Clear Selection</button>
        </div>
      </div>
    </div>

    <script>
      const scriptBox = document.getElementById("scriptBox");
      const statusBox = document.getElementById("status");
      const visualStatus = document.getElementById("visualStatus");
      const liveLogs = document.getElementById("liveLogs");
      const statusCard = document.getElementById("statusCard");
      const buttons = [...document.querySelectorAll("button")];
      let activeJobTimer = null;

      const chatGptPrompt = ${JSON.stringify(getChatGptPrompt())};
      const detailedChatGptPrompt = ${JSON.stringify(getDetailedChatGptPrompt())};
      const topicMap = ${JSON.stringify(getTopicMap())};
      const specialCourses = ${JSON.stringify(getSpecialCourses())};
      const specialCourseTopics = ${JSON.stringify(getSpecialCourseTopics())};
      let activePromptKind = "none";
      let speakingFormat = "listen-respond";
      let narratorMode = "local";
      let selectedTopicId = null;
      let selectedSpecialCourseId = specialCourses[0] ? specialCourses[0].id : null;
      let selectedSpecialTopicId = null;
      document.getElementById("detailedPromptText").textContent = detailedChatGptPrompt;

      function getSelectedTopic() {
        return topicMap.find((topic) => topic.id === selectedTopicId) || null;
      }

      function getSelectedSpecialCourse() {
        return specialCourses.find((course) => course.id === selectedSpecialCourseId) || null;
      }

      function getSelectedSpecialTopic() {
        return specialCourseTopics.find((topic) => topic.id === selectedSpecialTopicId) || null;
      }

      function getActiveTopic() {
        return activePromptKind === "general" ? getSelectedTopic() : null;
      }

      function getActiveSpecialCourse() {
        return activePromptKind === "special" ? getSelectedSpecialCourse() : null;
      }

      function getActiveSpecialTopic() {
        return activePromptKind === "special" ? getSelectedSpecialTopic() : null;
      }

      function getNarratorVoiceForLanguage(language) {
        if (narratorMode === "elevenlabs") {
          return language === "spanish" ? "env:ELEVENLABS_SPANISH_NARRATOR_VOICE_ID" : "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID";
        }

        return language === "spanish" ? "local:spanish" : "local:english";
      }

      function getIntroNarratorVoiceForLanguage(language) {
        if (narratorMode !== "hybrid-intro") return null;
        return language === "spanish" ? "env:ELEVENLABS_SPANISH_NARRATOR_VOICE_ID" : "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID";
      }

      function getNarratorModeLabel() {
        return narratorMode === "elevenlabs"
          ? "ElevenLabs bilingual narrator. Better for mixed-language narrator lines, but narrator text spends credits."
          : narratorMode === "hybrid-intro"
            ? "Hybrid narrator. Intro uses ElevenLabs bilingual narrator; all later narrator segments use local TTS to save credits."
          : "Local TTS narrator. Cheaper/free for narrator, but keep narrator lines mostly in the learner's native language.";
      }

      function getSpeakingFormatLabel() {
        return speakingFormat === "sentence-builder"
          ? "10-min cumulative Sentence Builder speaking drill"
          : "15-min Listen & Respond speaking drill";
      }

      function getSpeakingFormatPromptAppendix() {
        if (speakingFormat !== "sentence-builder") {
          return [
            "",
            "",
            "SPEAKING LESSON FORMAT",
            "Use the standard 15-minute Listen & Respond format described above.",
            "Keep estimatedMinutes: 15 and durationGoalMinutes: 15.",
            "Use prompt/answer/repeat/review/final_challenge flow with spaced recall."
          ].join("\\n");
        }

        return [
          "",
          "",
          "SPEAKING LESSON FORMAT OVERRIDE - CUMULATIVE SENTENCE BUILDER SPEAKING DRILL",
          "This is NOT the standard 15-minute Listen & Respond lesson. Generate a 10-minute speaking lesson that feels like the PU3NTE Sentence Builder activity, but spoken out loud instead of typed.",
          "Set estimatedMinutes: 10 and durationGoalMinutes: 10. Aim for a dry-run estimate of roughly 9-11 minutes.",
          "Use the same valid JSON schema and existing segment types only. Do not invent new segment types.",
          "",
          "Core method:",
          "- Choose about 20-22 target words/chunks total, appropriate to the selected topic, level, language direction, and special dialect/accent if selected.",
          "- Start by introducing 4-5 useful target words/chunks one by one.",
          "- For each new word/chunk: narrator gives a very short native-language meaning, target voice models it, learner repeats it out loud.",
          "- After the first 4-5 words, start building short sentences using only those words/chunks plus necessary tiny grammar words.",
          "- Ask: How do you say this? / ¿Cómo se dice esto? Then show the native-language prompt in showOnScreenText/nativePrompt and put the target sentence in targetAnswer.",
          "- Learner answers out loud during a timer pause. Then the target-language ElevenLabs voice gives the answer once at normal speed in an answer segment.",
          "- Immediately after each answer segment, add a second native model as a repeat or shadow segment with the exact same target phrase. Set speed to 0.75, showTimer to true, timerLabel to Repeat it, and use the same targetAnswer. This creates a slower second repetition plus a separate learner repeat pause after it.",
          "- Add another 2-3 words/chunks, repeat each one, then build new sentences using all available words.",
          "- Keep adding 2-3 words/chunks per round and keep recombining older words with newer ones.",
          "- By the final third, build longer sentences around 16-22 words long.",
          "- End with a final challenge where the learner says a 20-22 word sentence or a two-sentence mini-response using the full word bank.",
          "",
          "Suggested 10-minute structure:",
          "- 1 intro segment explaining this is a spoken sentence-building drill.",
          "- Round 1: introduce 4-5 words/chunks; repeat each; build 3 short sentences.",
          "- Round 2: add 3 words/chunks; repeat each; build 4 sentences mixing old + new material.",
          "- Round 3: add 3 words/chunks; repeat each; build 4 medium sentences.",
          "- Round 4: add 3 words/chunks; repeat each; build 3 longer sentences.",
          "- Round 5: add 3-4 final words/chunks; build 2-3 long sentences around 18-22 words.",
          "- 1 final challenge and 1 short outro.",
          "",
          "Timing rules for this format:",
          "- Keep narrator explanations extremely short. The learner should speak constantly.",
          "- Use prompt segments with showTimer: true for every sentence-building question.",
          "- Usually omit responsePauseMs so PU3NTE dynamically scales the speaking pause from targetAnswer length.",
          "- For sentence-building answers, use this pacing: answer segment at normal speed, then repeat/shadow segment with speed set to 0.75 and showTimer true so the learner gets a separate repeat timer.",
          "- Do not create fake silence audio. Use pauseAfterMs/responsePauseMs only.",
          "",
          "Voice rules for this format:",
          "- New target words/chunks and all target sentences must be pronounced by the target-language ElevenLabs voice, not the narrator.",
          "- Narrator should speak only the learner's native language unless the selected narrator mode explicitly uses a bilingual ElevenLabs narrator.",
          "- For dialect/accent special courses, target voices must use the selected local dialect/accent env voice IDs.",
          "",
          "Special-course B1 rule:",
          "- If selected level is B1 in a dialect/accent special course, this sentence-builder speaking format is REQUIRED and allowed.",
          "- B1 special-course lessons must teach practical local phrases gently: useful everyday words/chunks, local greetings/reactions, and simple sentence patterns. Do not overload B1 learners with C1/C2 slang density.",
          "- B1 special-course lessons should still sound local, but explain register clearly and keep sentences manageable."
        ].join("\\n");
      }

      function getTopicDirection(topic) {
        if (!topic) {
          return "No topic selected yet. The prompt will ask ChatGPT to choose based on your written request.";
        }

        if (topic.language === "English") {
          return "English for Spanish speakers · narrator language: Spanish · target language: English · learnerNativeLanguage: spanish · level: " + topic.level;
        }

        return "Spanish for English speakers · narrator language: English · target language: Spanish · learnerNativeLanguage: english · level: " + topic.level;
      }

      function getTopicPromptAppendix(topic) {
        if (!topic) return "";
        const isEnglishTarget = topic.language === "English";
        const targetLanguage = isEnglishTarget ? "english" : "spanish";
        const learnerNativeLanguage = isEnglishTarget ? "spanish" : "english";
        const narratorLanguageCode = isEnglishTarget ? "spanish" : "english";
        const narratorVoice = getNarratorVoiceForLanguage(narratorLanguageCode);
        const introNarratorVoice = getIntroNarratorVoiceForLanguage(narratorLanguageCode);
        const course = isEnglishTarget ? "English Speaking Drills" : "Spanish Speaking Drills";
        const voiceBlock = isEnglishTarget
          ? '"voices": {\\n  "narrator": "' + narratorVoice + '",\\n  "english_male": "env:ELEVENLABS_ENGLISH_MALE_VOICE_ID",\\n  "english_female": "env:ELEVENLABS_ENGLISH_FEMALE_VOICE_ID"\\n}'
          : '"voices": {\\n  "narrator": "' + narratorVoice + '",\\n  "native_male": "env:ELEVENLABS_SPANISH_MALE_VOICE_ID",\\n  "native_female": "env:ELEVENLABS_SPANISH_FEMALE_VOICE_ID"\\n}';

        return [
          "",
          "",
          "SELECTED LESSON TOPIC - USE THIS EXACT BRIEF",
          "Topic: " + topic.topic,
          "Level: " + topic.level,
          "Priority number: " + (topic.priority || "not priority 20"),
          "Main speaking objective: " + topic.objective,
          "Course: " + course,
          "targetLanguage: " + targetLanguage,
          "learnerNativeLanguage: " + learnerNativeLanguage,
          "Narrator language: " + (isEnglishTarget ? "Spanish" : "English"),
          "Narrator voice: " + narratorVoice,
          introNarratorVoice ? "Intro narrator override: add voiceId \\\"" + introNarratorVoice + "\\\" only to the intro segment or intro segments." : "",
          "Narrator mode: " + getNarratorModeLabel(),
          "Voice mapping to use:",
          voiceBlock,
          "",
          speakingFormat === "sentence-builder"
            ? "Generate exactly one complete 10-minute Cumulative Sentence Builder speaking lesson for this selected topic and level."
            : "Generate exactly one complete 15-minute Listen & Respond lesson for this selected topic and level.",
          "The lesson title, subtitle, outputSlug, segment content, review prompts, final challenge, and examples must all match this selected topic.",
          speakingFormat === "sentence-builder"
            ? "Do not switch to another topic. Do not create a generic lesson. Do not make a 5-minute draft or a 15-minute standard drill."
            : "Do not switch to another topic. Do not create a generic lesson. Do not make a 5-minute draft.",
          narratorMode === "elevenlabs"
            ? "Because the narrator is ElevenLabs, choose a bilingual narrator voice ID in your env so occasional mixed English/Spanish narrator lines can be pronounced naturally."
            : narratorMode === "hybrid-intro"
              ? "Because narrator mode is hybrid, set voices.narrator to local TTS, then add voiceId \\\"" + introNarratorVoice + "\\\" only on type intro segment(s). Do not add this voiceId to later narrator explanations, prompts, reviews, final_challenge, or outro."
            : "Because the narrator is local TTS, avoid mixed-language narrator lines. Put target-language phrases in showOnScreenText/targetAnswer and pronounce them in answer/repeat segments with ElevenLabs target voices."
        ].filter(Boolean).join("\\n");
      }

      function getSpecialCourseDirection(course, topic) {
        if (!course) {
          return "Choose a course and lesson to add a dialect/accent brief to the prompt.";
        }

        const direction = course.family === "spanish-dialect"
          ? "Spanish dialect course for native English speakers"
          : "English accent course for native Spanish speakers";
        const topicLabel = topic ? " · selected lesson: " + topic.topic + " · " + topic.level : " · choose one lesson below";
        return course.label + " · " + direction + " · narrator env: " + course.narratorEnv + topicLabel;
      }

      function getSpecialCoursePromptAppendix(course, topic) {
        if (!course || !topic) return "";
        const isSpanishDialect = course.family === "spanish-dialect";
        const narratorLanguage = course.learnerNativeLanguage === "english" ? "English" : "Spanish";
        const narratorVoice = narratorMode === "elevenlabs"
          ? "env:" + course.narratorEnv
          : getNarratorVoiceForLanguage(course.learnerNativeLanguage);
        const introNarratorVoice = narratorMode === "hybrid-intro" ? "env:" + course.narratorEnv : null;
        const roleMale = isSpanishDialect ? "native_male" : "english_male";
        const roleFemale = isSpanishDialect ? "native_female" : "english_female";
        const voiceBlock = '{\\n' +
          '  "narrator": "' + narratorVoice + '",\\n' +
          '  "' + roleMale + '": "env:' + course.maleVoiceEnv + '",\\n' +
          '  "' + roleFemale + '": "env:' + course.femaleVoiceEnv + '"\\n' +
          '}';

        return [
          "",
          "",
          "SELECTED DIALECT / ACCENT COURSE - USE THIS EXACT BRIEF",
          "Course: " + course.label,
          "Variety/accent: " + course.variety,
          speakingFormat === "sentence-builder"
            ? "Course design: B1 sentence-builder lessons are allowed only in this cumulative speaking-builder format. Standard dialect/accent lessons remain B2, C1, and C2."
            : "Course design: 8 speaking lessons per advanced level, 24 total lessons for this variety/accent. Levels are B2, C1, and C2 only. No A1-A2 or B1 lessons: this course is intended for B2 upward learners who already know general basics.",
          "Selected lesson topic: " + topic.topic,
          "Selected level: " + topic.level,
          "Main speaking objective: " + topic.objective,
          "targetLanguage: " + course.targetLanguage,
          "learnerNativeLanguage: " + course.learnerNativeLanguage,
          "Narrator language: " + narratorLanguage,
          "Narrator voice: " + narratorVoice,
          introNarratorVoice ? "Intro narrator override: add voiceId \\\"" + introNarratorVoice + "\\\" only to the intro segment or intro segments." : "",
          "Narrator mode: " + getNarratorModeLabel(),
          "Voice mapping to use exactly:",
          voiceBlock,
          "",
          "Research requirement:",
          "Before generating the JSON, if web access is available, actively research how real speakers from the selected course/dialect/accent speak in the selected context: " + course.variety + ". Do not research Colombian speakers unless the selected course is Colombian Spanish. If the selected course is Argentinian Spanish, research Argentinian speakers; if Mexican Spanish, research Mexican speakers; if American/British/Irish/Australian English, research speakers from that accent/community. Do not rely on memory, generic slang lists, or examples from this prompt. Look for natural speech from that selected community in interviews, podcasts, street interviews, TikTok/YouTube/Instagram clips, comments, informal explainers, comedians, musicians, artists, influencers, streamers, local creators, and everyday conversation transcripts where possible.",
          "Analyse patterns from those sources: greetings/openers, ways to say goodbye, reactions, weather sayings, food/drink words, transport words, money/time phrases, texting/voice-note phrases, filler phrases, discourse markers, idioms, informal contractions/reductions, politeness formulas, teasing/banter, softeners, pronunciation/intonation notes, and real-life register.",
          "Build a fresh internal phrase bank of at least 25 useful " + course.variety + " local expressions from that research before writing the lesson. Use at least 15-20 of them naturally across prompts, answers, repeats, mini-dialogues, reviews, and the final challenge. Do not output the phrase bank separately; weave it into the JSON lesson.",
          "Important freshness rule: do not lean on example phrases, famous stereotype phrases, dictionary-style lists, or vocabulary from previous PU3NTE lessons unless the selected topic genuinely requires them. Prefer newly researched local expressions that fit this exact topic and situation.",
          course.id === "colombian-spanish"
            ? "Colombian anti-repetition rule: do not default to the usual PU3NTE Colombian starter-pack vocabulary such as qué más, parce/parcero, listo, de una, qué pena, bacano, tinto, hacer una vuelta, me cogió la tarde, or se está cayendo un aguacero. You may use at most 2 of those if they are truly necessary for the selected topic. Do not use se está cayendo un aguacero unless the selected topic is specifically weather, rain, delays, or storytelling about rain."
            : "",
          "For every selected country/accent, research broad local expression categories across many situations: greetings, reactions, softeners, shop/service language, weather, plans, food, transport, money, time, being late, being tired, being annoyed, flirting/banter, work, texting, reacting to stories, and casual problem-solving. Choose the expressions from your research, not from examples in this prompt.",
          "Use the research to make the lesson sound unmistakably local, informal, and alive. Do not cite sources in the JSON. Return only valid JSON.",
          "Research focus: " + course.researchFocus,
          "Cultural guardrails: " + course.culturalGuardrails,
          "",
          "Content requirements for this selected course:",
          speakingFormat === "sentence-builder"
            ? "- Generate exactly one complete 10-minute Cumulative Sentence Builder speaking lesson for this selected topic and level."
            : "- Generate exactly one complete 15-minute Listen & Respond lesson for this selected topic and level.",
          "- Make the lesson heavily natural/local/informal, not generic standard textbook language.",
          speakingFormat === "sentence-builder" && topic.level === "B1"
            ? "- For B1 sentence-builder lessons, use local flavour gently: local greetings, reactions, common everyday chunks, and natural phrasing. Do not force dense slang into every sentence."
            : "- At least 75-85% of target-language prompts, answers, repeats, and dialogues should include local sayings, slang, idioms, greetings, reactions, discourse markers, politeness formulas, reductions, or phrasing that is strongly associated with " + course.variety + ".",
          "- Every mini-dialogue should sound like real friends, coworkers, neighbours, classmates, drivers, shop staff, or voice-note conversations from the selected country/accent. Avoid stiff classroom dialogue.",
          "- Include local greetings/openers early in the lesson and reuse them later. Avoid generic greetings if a local opener would sound more natural.",
          "- Include at least one everyday situational saying or phrase for ordinary life, such as weather, traffic, food, money, time, plans, being late, being tired, being annoyed, or reacting to a story.",
          "- Prefer informal, spoken phrasing over formal written phrasing unless the lesson explicitly teaches register contrast.",
          "- B2 should use practical everyday local expressions and informal phrasing, but explain them clearly and avoid overwhelming learners.",
          "- C1 should be deeply local: greetings, sayings, slang, register shifts, diplomacy, idioms, humour, subtle tone, and when not to use certain expressions.",
          "- C2 should aim for near-native control: layered slang, humour, double meanings, indirectness, subtext, social risk, regional nuance, and precise register choice.",
          narratorMode === "elevenlabs"
            ? "- Narrator segments use role narrator with the selected ElevenLabs narrator env voice. The narrator voice ID should be bilingual because occasional mixed English/Spanish narrator lines may be needed."
            : narratorMode === "hybrid-intro"
              ? "- Narrator segments use local TTS by default to save credits. Only type intro segment(s) should include voiceId \\\"" + introNarratorVoice + "\\\" for a polished bilingual ElevenLabs opening. Do not add voiceId to later narrator explanations, prompts, reviews, final_challenge, or outro."
            : "- Narrator segments use role narrator with local TTS. To save credits and avoid bad pronunciation, keep narrator lines mostly in the learner's native language and do not make local TTS pronounce long target-language phrases.",
          "- Target-language answers, repeat lines, native models, and mini-dialogues must use " + roleMale + " and " + roleFemale + " with the selected local accent/dialect.",
          "- Explain slang/register briefly before asking the learner to use it. Mark risky, rude, or very informal expressions clearly.",
          "- Do not create fake silence segments. Use responsePauseMs and pauseAfterMs for learner pauses so the generator can keep audio/video sync exact.",
          "- Do not make a generic country facts lesson. It must be a spoken drill that builds phrases the learner can say out loud."
        ].filter(Boolean).join("\\n");
      }

      function buildPrompt(basePrompt) {
        return basePrompt +
          getSpeakingFormatPromptAppendix() +
          getTopicPromptAppendix(getActiveTopic()) +
          getSpecialCoursePromptAppendix(getActiveSpecialCourse(), getActiveSpecialTopic());
      }

      function getPromptSelectionSummary() {
        const topic = getActiveTopic();
        if (topic) {
          return "Normal lesson selected: " + topic.topic + " · " + topic.language + " · " + topic.level + " · " + getSpeakingFormatLabel() + " · " + getNarratorModeLabel();
        }

        const course = getActiveSpecialCourse();
        const specialTopic = getActiveSpecialTopic();
        if (course && specialTopic) {
          return "Dialect/accent course selected: " + course.label + " · " + specialTopic.level + " · " + specialTopic.topic + " · " + getSpeakingFormatLabel() + " · " + getNarratorModeLabel();
        }

        if (activePromptKind === "special" && course) {
          return "Dialect/accent course mode: choose a " + course.label + " lesson to activate it.";
        }

        if (activePromptKind === "general") {
          return "Normal lesson mode: choose a topic to activate it.";
        }

        return "No lesson selected yet. The prompt will ask ChatGPT to choose from your written request.";
      }

      function updatePromptPreview() {
        document.getElementById("selectedPromptSummary").textContent = getPromptSelectionSummary();
        document.getElementById("selectorModeSummary").textContent = getPromptSelectionSummary();
        document.getElementById("generalSelectorControls").classList.toggle("hidden", activePromptKind === "special");
        document.getElementById("specialSelectorControls").classList.toggle("hidden", activePromptKind !== "special");
        document.getElementById("selectorModeSelect").value = activePromptKind === "special" ? "special" : "general";
        document.getElementById("speakingFormatSelect").value = speakingFormat;
        document.getElementById("narratorModeSelect").value = narratorMode;
        document.getElementById("detailedPromptText").textContent = buildPrompt(detailedChatGptPrompt);
      }

      function renderTopics() {
        const language = document.getElementById("topicLanguageFilter").value;
        const level = document.getElementById("topicLevelFilter").value;
        const search = document.getElementById("topicSearch").value.trim().toLowerCase();
        const priorityOnly = document.getElementById("priorityOnly").checked;
        const select = document.getElementById("generalTopicSelect");
        const list = document.getElementById("topicList");
        const filtered = topicMap.filter((topic) => {
          if (language !== "all" && topic.language !== language) return false;
          if (level !== "all" && topic.level !== level) return false;
          if (priorityOnly && !topic.priority) return false;
          if (search && !(topic.topic + " " + topic.objective + " " + topic.level + " " + topic.language).toLowerCase().includes(search)) return false;
          return true;
        });

        if (selectedTopicId && !filtered.some((topic) => topic.id === selectedTopicId)) {
          selectedTopicId = null;
          if (activePromptKind === "general") {
            activePromptKind = "none";
          }
        }

        select.innerHTML = '<option value="">Choose a normal lesson topic...</option>' + filtered.map((topic) => {
          const priority = topic.priority ? "Priority " + topic.priority + " Â· " : "";
          return '<option value="' + escapeHtml(topic.id) + '">' + escapeHtml(priority + topic.language + " Â· " + topic.level + " Â· " + topic.topic) + '</option>';
        }).join("");
        select.value = selectedTopicId || "";

        list.innerHTML = filtered.map((topic) => {
          const checked = topic.id === selectedTopicId ? " checked" : "";
          const priority = topic.priority ? "Priority " + topic.priority + " · " : "";
          return '<label class="topic-row">' +
            '<input type="checkbox" data-topic-id="' + escapeHtml(topic.id) + '"' + checked + ' />' +
            '<div>' +
              '<div class="topic-title">' + escapeHtml(topic.topic) + '</div>' +
              '<div class="topic-meta">' + escapeHtml(priority + topic.language + " · " + topic.level) + '</div>' +
              '<div class="topic-objective">' + escapeHtml(topic.objective) + '</div>' +
            '</div>' +
          '</label>';
        }).join("") || '<div class="note">No topics match these filters.</div>';

        list.querySelectorAll("input[data-topic-id]").forEach((checkbox) => {
          checkbox.addEventListener("change", (event) => {
            const input = event.target;
            selectedTopicId = input.checked ? input.getAttribute("data-topic-id") : null;
            if (selectedTopicId) {
              activePromptKind = "general";
              selectedSpecialTopicId = null;
            } else if (activePromptKind === "general") {
              activePromptKind = "none";
            }
            renderTopics();
            renderSpecialTopics();
            updatePromptPreview();
          });
        });
      }

      function renderSpecialCourseOptions() {
        const select = document.getElementById("specialCourseSelect");
        select.innerHTML = specialCourses.map((course) =>
          '<option value="' + escapeHtml(course.id) + '">' + escapeHtml(course.label) + '</option>'
        ).join("");
        select.value = selectedSpecialCourseId || "";
      }

      function renderSpecialTopics() {
        const course = getSelectedSpecialCourse();
        const level = document.getElementById("specialLevelFilter").value;
        const search = document.getElementById("specialTopicSearch").value.trim().toLowerCase();
        const select = document.getElementById("specialTopicSelect");
        const list = document.getElementById("specialTopicList");

        if (!course) {
          select.innerHTML = '<option value="">Choose a course first</option>';
          list.innerHTML = '<div class="note">Choose a course first.</div>';
          return;
        }

        const filtered = specialCourseTopics.filter((topic) => {
          if (topic.courseId !== course.id) return false;
          if (topic.level === "B1" && speakingFormat !== "sentence-builder") return false;
          if (level !== "all" && topic.level !== level) return false;
          if (search && !(topic.topic + " " + topic.objective + " " + topic.level + " " + course.label).toLowerCase().includes(search)) return false;
          return true;
        });

        if (selectedSpecialTopicId && !filtered.some((topic) => topic.id === selectedSpecialTopicId)) {
          selectedSpecialTopicId = null;
          if (activePromptKind === "special") {
            activePromptKind = "none";
          }
        }

        select.innerHTML = '<option value="">Choose a lesson...</option>' + filtered.map((topic) =>
          '<option value="' + escapeHtml(topic.id) + '">' + escapeHtml(topic.level + " · " + topic.topic) + '</option>'
        ).join("");
        select.value = selectedSpecialTopicId || "";

        list.innerHTML = filtered.map((topic) => {
          const checked = topic.id === selectedSpecialTopicId ? " checked" : "";
          return '<label class="topic-row">' +
            '<input type="checkbox" data-special-topic-id="' + escapeHtml(topic.id) + '"' + checked + ' />' +
            '<div>' +
              '<div class="topic-title">' + escapeHtml(topic.topic) + '</div>' +
              '<div class="topic-meta">' + escapeHtml(course.label + " · " + topic.level) + '</div>' +
              '<div class="topic-objective">' + escapeHtml(topic.objective) + '</div>' +
            '</div>' +
          '</label>';
        }).join("") || (level === "B1" && speakingFormat !== "sentence-builder"
          ? '<div class="note">B1 special-course lessons are only available when Speaking lesson format is set to 10-min Cumulative Sentence Builder speaking drill.</div>'
          : '<div class="note">No dialect/accent lessons match these filters.</div>');

        list.querySelectorAll("input[data-special-topic-id]").forEach((checkbox) => {
          checkbox.addEventListener("change", (event) => {
            const input = event.target;
            selectedSpecialTopicId = input.checked ? input.getAttribute("data-special-topic-id") : null;
            if (selectedSpecialTopicId) {
              activePromptKind = "special";
              selectedTopicId = null;
            } else if (activePromptKind === "special") {
              activePromptKind = "none";
            }
            renderTopics();
            renderSpecialTopics();
            updatePromptPreview();
          });
        });
      }

      function openLessonSelector() {
        document.getElementById("lessonSelectorModal").classList.add("open");
        document.getElementById("lessonSelectorModal").setAttribute("aria-hidden", "false");
      }

      function closeLessonSelector() {
        document.getElementById("lessonSelectorModal").classList.remove("open");
        document.getElementById("lessonSelectorModal").setAttribute("aria-hidden", "true");
      }

      function clearLessonSelection() {
        activePromptKind = "none";
        selectedTopicId = null;
        selectedSpecialTopicId = null;
        renderTopics();
        renderSpecialTopics();
        updatePromptPreview();
      }

      function setSelectorMode(mode) {
        activePromptKind = mode;
        if (mode === "general") {
          selectedSpecialTopicId = null;
        } else if (mode === "special") {
          selectedTopicId = null;
        }
        renderTopics();
        renderSpecialTopics();
        updatePromptPreview();
      }

      function setStatus(message, isError = false) {
        statusBox.textContent = typeof message === "string" ? message : JSON.stringify(message, null, 2);
        statusCard.classList.toggle("error", isError);
        if (isError) {
          visualStatus.innerHTML = '<div class="badge error">Needs Fix</div><div class="note block">' + escapeHtml(String(message)) + '</div>';
        } else if (typeof message === "string") {
          visualStatus.innerHTML = '<div class="badge ready">Working</div><div class="mini">' + escapeHtml(message) + '</div>';
        } else {
          renderVisualResult(message);
        }
      }

      function escapeHtml(value) {
        return value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function renderVisualResult(result) {
        const readiness = result.readiness;

        if (!readiness) {
          visualStatus.innerHTML = '<div class="badge ready">Done</div><div class="mini">Generation completed.</div>';
          return;
        }

        const badgeClass = readiness.state === "ready" ? "ready" : readiness.state === "review" ? "review" : "blocked";
        const badgeText = readiness.state === "ready" ? "OK To Move Ahead" : readiness.state === "review" ? "Review Before Generating" : "Blocked";
        const stats = readiness.stats;
        const notes = [
          ...readiness.blockers.map((note) => ({ kind: "block", text: note })),
          ...readiness.warnings.map((note) => ({ kind: "warn", text: note }))
        ];
        const noteHtml = notes.length
          ? notes.map((note) => '<div class="note ' + note.kind + '">' + escapeHtml(note.text) + '</div>').join("")
          : '<div class="note">No warnings. This lesson is ready to generate.</div>';

        visualStatus.innerHTML =
          '<div class="badge ' + badgeClass + '">' + badgeText + '</div>' +
          '<div class="mini"><strong>' + escapeHtml(result.title) + '</strong><br />' + escapeHtml(readiness.nextStep) + '</div>' +
          '<div class="metrics">' +
            '<div class="metric"><strong>' + escapeHtml(stats.duration) + '</strong><span>Estimated duration</span></div>' +
            '<div class="metric"><strong>' + stats.segments + '</strong><span>Total segments</span></div>' +
            '<div class="metric"><strong>' + stats.estimatedElevenLabsCredits.toLocaleString() + '</strong><span>Est. ElevenLabs credits</span></div>' +
            '<div class="metric"><strong>' + stats.paidCharacterCount.toLocaleString() + '</strong><span>Paid TTS characters</span></div>' +
            '<div class="metric"><strong>' + stats.estimatedPaidClips + '</strong><span>Estimated ElevenLabs clips</span></div>' +
            '<div class="metric"><strong>' + stats.localTtsSegments + '</strong><span>Local TTS clips</span></div>' +
            '<div class="metric"><strong>' + stats.timerSegments + '</strong><span>Countdown timers</span></div>' +
            '<div class="metric"><strong>' + stats.answerSegments + '</strong><span>Answer clips</span></div>' +
          '</div>' +
          '<div class="note">Credit estimate uses ' + escapeHtml(stats.elevenLabsModelId) + ' at about ' + escapeHtml(stats.creditRateLabel) + '. ElevenLabs bills from the generated text characters, so cached clips should not spend credits again unless you regenerate TTS.</div>' +
          '<div class="notes">' + noteHtml + '</div>' +
          '<div class="raw-label">Raw output below is copyable for debugging</div>';
      }

      function setBusy(busy) {
        buttons.forEach((button) => {
          button.disabled = busy;
        });
      }

      function formatEta(seconds) {
        if (seconds === null || seconds === undefined) {
          return "estimating";
        }

        if (seconds <= 0) {
          return "almost done";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return minutes > 0 ? minutes + "m " + remainingSeconds + "s" : remainingSeconds + "s";
      }

      async function generate(mode) {
        setBusy(true);
        setStatus(mode === "dry-run" ? "Starting dry run..." : "Starting generation job. Keep this tab open...");
        liveLogs.textContent = "Submitting job...";

        try {
          const response = await fetch("/api/generate", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              scriptJson: scriptBox.value,
              mode,
              forceTts: document.getElementById("forceTts").checked,
              skipTts: document.getElementById("skipTts").checked
            })
          });
          const result = await response.json();

          if (!response.ok || !result.ok) {
            throw new Error(result.error || "Generation failed.");
          }

          pollJob(result.jobId);
        } catch (error) {
          setStatus(error.message, true);
          setBusy(false);
        }
      }

      async function pollJob(jobId) {
        if (activeJobTimer) {
          clearTimeout(activeJobTimer);
        }

        try {
          const response = await fetch("/api/job?id=" + encodeURIComponent(jobId));
          const payload = await response.json();

          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || "Could not read job status.");
          }

          const job = payload.job;
          renderJob(job);

          if (job.status === "completed") {
            setStatus(job.result);
            setBusy(false);
            return;
          }

          if (job.status === "failed") {
            setStatus(job.error || "Generation failed.", true);
            liveLogs.textContent = [...job.logs, "", "RAW LOGS", ...job.rawLogs].join("\\n");
            setBusy(false);
            return;
          }

          activeJobTimer = setTimeout(() => pollJob(jobId), 1000);
        } catch (error) {
          setStatus(error.message, true);
          setBusy(false);
        }
      }

      function renderJob(job) {
        const badgeClass = job.status === "failed" ? "error" : job.status === "completed" ? "ready" : "review";
        const label = job.status === "completed" ? "Complete" : job.status === "failed" ? "Failed" : "Working";
        const percent = Math.max(0, Math.min(100, job.percent));
        const rawText = job.rawLogs.length ? job.rawLogs.join("\\n") : "Raw logs will appear here when TTS/cache/Remotion emits details.";

        visualStatus.innerHTML =
          '<div class="badge ' + badgeClass + '">' + label + '</div>' +
          '<div class="mini"><strong>' + escapeHtml(job.title) + '</strong><br />' +
          'Stage: ' + escapeHtml(job.stage) + '<br />' +
          escapeHtml(job.message) + '<br />' +
          'Elapsed: ' + formatEta(job.elapsedSeconds) + ' · ETA: ' + formatEta(job.etaSeconds) + '</div>' +
          '<div class="progress-wrap"><div class="progress-fill" style="width:' + percent + '%"></div></div>' +
          '<div class="metrics">' +
            '<div class="metric"><strong>' + Math.round(percent) + '%</strong><span>Overall progress</span></div>' +
            '<div class="metric"><strong>' + escapeHtml(job.stage) + '</strong><span>Current stage</span></div>' +
          '</div>' +
          '<div class="raw-label">Latest activity and raw logs below</div>';

        statusBox.textContent = JSON.stringify(job, null, 2);
        liveLogs.textContent = [
          "FRIENDLY LOG",
          ...job.logs,
          "",
          "RAW LOGS",
          rawText
        ].join("\\n");
      }

      document.getElementById("copyPrompt").addEventListener("click", async () => {
        await navigator.clipboard.writeText(buildPrompt(chatGptPrompt));
        setStatus(getActiveTopic() || getActiveSpecialTopic() ? "Copied the ChatGPT JSON prompt with: " + getPromptSelectionSummary() : "Copied the ChatGPT JSON prompt. Paste it into ChatGPT with your lesson topic and language direction.");
      });

      document.getElementById("copyDetailedPrompt").addEventListener("click", async () => {
        await navigator.clipboard.writeText(buildPrompt(detailedChatGptPrompt));
        setStatus(getActiveTopic() || getActiveSpecialTopic() ? "Copied the detailed 15-minute prompt with: " + getPromptSelectionSummary() : "Copied the detailed 15-minute speaking lesson prompt.");
      });

      document.getElementById("openLessonSelector").addEventListener("click", openLessonSelector);
      document.getElementById("closeLessonSelector").addEventListener("click", closeLessonSelector);
      document.getElementById("applyLessonSelector").addEventListener("click", closeLessonSelector);
      document.getElementById("clearLessonSelection").addEventListener("click", clearLessonSelection);
      document.getElementById("clearLessonSelectionModal").addEventListener("click", clearLessonSelection);
      document.getElementById("lessonSelectorModal").addEventListener("click", (event) => {
        if (event.target.id === "lessonSelectorModal") {
          closeLessonSelector();
        }
      });
      document.getElementById("selectorModeSelect").addEventListener("change", (event) => {
        setSelectorMode(event.target.value);
      });
      document.getElementById("speakingFormatSelect").addEventListener("change", (event) => {
        speakingFormat = event.target.value;
        renderSpecialTopics();
        updatePromptPreview();
      });
      document.getElementById("narratorModeSelect").addEventListener("change", (event) => {
        narratorMode = event.target.value;
        updatePromptPreview();
      });
      document.getElementById("generalTopicSelect").addEventListener("change", (event) => {
        selectedTopicId = event.target.value || null;
        if (selectedTopicId) {
          activePromptKind = "general";
          selectedSpecialTopicId = null;
        } else if (activePromptKind === "general") {
          activePromptKind = "none";
        }
        renderTopics();
        renderSpecialTopics();
        updatePromptPreview();
      });
      document.getElementById("topicLanguageFilter").addEventListener("change", () => {
        renderTopics();
        updatePromptPreview();
      });
      document.getElementById("topicLevelFilter").addEventListener("change", () => {
        renderTopics();
        updatePromptPreview();
      });
      document.getElementById("topicSearch").addEventListener("input", () => {
        renderTopics();
        updatePromptPreview();
      });
      document.getElementById("priorityOnly").addEventListener("change", () => {
        renderTopics();
        updatePromptPreview();
      });
      document.getElementById("specialCourseSelect").addEventListener("change", (event) => {
        selectedSpecialCourseId = event.target.value;
        selectedSpecialTopicId = null;
        activePromptKind = "special";
        renderSpecialTopics();
        updatePromptPreview();
      });
      document.getElementById("specialLevelFilter").addEventListener("change", () => {
        renderSpecialTopics();
        updatePromptPreview();
      });
      document.getElementById("specialTopicSearch").addEventListener("input", () => {
        renderSpecialTopics();
        updatePromptPreview();
      });
      document.getElementById("specialTopicSelect").addEventListener("change", (event) => {
        selectedSpecialTopicId = event.target.value || null;
        if (selectedSpecialTopicId) {
          activePromptKind = "special";
          selectedTopicId = null;
        } else if (activePromptKind === "special") {
          activePromptKind = "none";
        }
        renderTopics();
        renderSpecialTopics();
        updatePromptPreview();
      });

      document.getElementById("loadSample").addEventListener("click", async () => {
        const response = await fetch("/api/sample");
        scriptBox.value = JSON.stringify(await response.json(), null, 2);
        setStatus("Loaded sample JSON. Run dry-run first.");
      });

      document.getElementById("formatJson").addEventListener("click", () => {
        try {
          scriptBox.value = JSON.stringify(JSON.parse(scriptBox.value), null, 2);
          setStatus("JSON formatted.");
        } catch (error) {
          setStatus(error.message, true);
        }
      });

      document.getElementById("copyJson").addEventListener("click", async () => {
        await navigator.clipboard.writeText(scriptBox.value);
        setStatus("Copied the JSON currently in the lesson box.");
      });

      document.getElementById("copyStatus").addEventListener("click", async () => {
        await navigator.clipboard.writeText(statusBox.textContent);
        setStatus("Copied the latest status/output.");
      });

      document.getElementById("dryRun").addEventListener("click", () => generate("dry-run"));
      document.getElementById("audioOnly").addEventListener("click", () => generate("audio-only"));
      document.getElementById("videoOnly").addEventListener("click", () => generate("video-only"));
      document.getElementById("fullVideo").addEventListener("click", () => generate("full-video"));

      fetch("/api/sample")
        .then((response) => response.json())
        .then((sample) => {
          scriptBox.value = JSON.stringify(sample, null, 2);
        })
        .catch(() => {});

      renderTopics();
      renderSpecialCourseOptions();
      renderSpecialTopics();
      updatePromptPreview();
    </script>
  </body>
</html>`;
}

async function handleRequest(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
  try {
    const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);

    if (request.method === "GET" && request.url === "/") {
      htmlResponse(response, pageHtml());
      return;
    }

    if (request.method === "GET" && request.url === "/api/sample") {
      const samplePath = path.join(generatorRoot, "sample-lessons", "spanish-a1-want-need-can.json");
      jsonResponse(response, 200, JSON.parse(await fs.readFile(samplePath, "utf8")));
      return;
    }

    if (request.method === "POST" && request.url === "/api/generate") {
      await handleGenerate(request, response);
      return;
    }

    if (request.method === "GET" && requestUrl.pathname === "/api/job") {
      const jobId = requestUrl.searchParams.get("id");
      const job = jobId ? jobs.get(jobId) : null;

      if (!job) {
        jsonResponse(response, 404, { ok: false, error: "Job not found." });
        return;
      }

      jsonResponse(response, 200, { ok: true, job: serializeJob(job) });
      return;
    }

    jsonResponse(response, 404, { ok: false, error: "Not found." });
  } catch (error) {
    jsonResponse(response, 500, { ok: false, error: (error as Error).message });
  }
}

loadLocalEnv();

const server = http.createServer((request, response) => {
  void handleRequest(request, response);
});

server.listen(port, host, () => {
  console.log(`PU3NTE Lesson Studio running at http://${host}:${port}`);
  console.log("Keep this terminal open while generating lessons.");
});
