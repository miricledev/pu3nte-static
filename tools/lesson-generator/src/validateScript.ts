import { z } from "zod";
import { grammarBoardSchema, getGrammarSpeechIssue } from "./grammarSchema";

export const segmentTypes = [
  "intro",
  "explanation",
  "prompt",
  "response_pause",
  "answer",
  "repeat",
  "shadow",
  "dialogue",
  "review",
  "final_challenge",
  "outro",
] as const;

export const segmentRoles = [
  "narrator",
  "native_male",
  "native_female",
  "english_male",
  "english_female",
  "spanish_male",
  "spanish_female",
  "speaker_1",
  "speaker_2",
] as const;

export const visualModes = [
  "intro",
  "listen",
  "your_turn",
  "answer",
  "repeat",
  "shadow",
  "dialogue",
  "review",
  "final_challenge",
  "outro",
] as const;

const voiceSettingsSchema = z
  .object({
    stability: z.number().min(0).max(1).optional(),
    similarityBoost: z.number().min(0).max(1).optional(),
    style: z.number().min(0).max(1).optional(),
    useSpeakerBoost: z.boolean().optional(),
  })
  .strict();

const segmentSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum(segmentTypes),
    role: z.enum(segmentRoles),
    voiceId: z.string().min(1).optional(),
    text: z.string().min(1),
    subtitle: z.string().optional(),
    visualTitle: z.string().optional(),
    visualSubtitle: z.string().optional(),
    visualMode: z.enum(visualModes).optional(),
    pauseAfterMs: z.number().int().min(0).optional(),
    responsePauseMs: z.number().int().min(0).optional(),
    showTimer: z.boolean().optional(),
    timerLabel: z.string().optional(),
    speakerName: z.string().optional(),
    showOnScreenText: z.string().optional(),
    targetAnswer: z.string().optional(),
    nativePrompt: z.string().optional(),
    grammarBoard: grammarBoardSchema.optional(),
    notes: z.string().optional(),
    speed: z.number().positive().optional(),
    stability: z.number().min(0).max(1).optional(),
    similarityBoost: z.number().min(0).max(1).optional(),
    style: z.number().min(0).max(1).optional(),
    useSpeakerBoost: z.boolean().optional(),
    voiceSettings: voiceSettingsSchema.optional(),
  })
  .strict();

export const lessonScriptSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    course: z.string().min(1),
    level: z.string().min(1),
    targetLanguage: z.string().min(1),
    learnerNativeLanguage: z.string().min(1),
    lessonFormat: z.enum(["speaking", "grammar"]).optional(),
    estimatedMinutes: z.number().positive().optional(),
    durationGoalMinutes: z.number().positive().optional(),
    outputSlug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    branding: z
      .object({
        logoText: z.string().default("PU3NTE"),
        theme: z.string().default("default"),
        showLogo: z.boolean().default(true),
      })
      .default({ logoText: "PU3NTE", theme: "default", showLogo: true }),
    voices: z.record(z.string(), z.string().min(1)),
    voiceSettings: voiceSettingsSchema.optional(),
    settings: z
      .object({
        defaultPauseAfterMs: z.number().int().min(0).default(1000),
        defaultResponsePauseMs: z.number().int().min(0).default(5000),
        subtitleMode: z.enum(["line"]).default("line"),
        videoWidth: z.number().int().positive().default(1920),
        videoHeight: z.number().int().positive().default(1080),
        fps: z.number().int().positive().default(30),
        backgroundMusic: z.boolean().default(false),
        includePauseSubtitles: z.boolean().default(false),
      })
      .default({
        defaultPauseAfterMs: 1000,
        defaultResponsePauseMs: 5000,
        subtitleMode: "line",
        videoWidth: 1920,
        videoHeight: 1080,
        fps: 30,
        backgroundMusic: false,
        includePauseSubtitles: false,
      }),
    segments: z.array(segmentSchema).min(1),
  })
  .strict()
  .superRefine((script, context) => {
    const ids = new Set<string>();

    if (script.lessonFormat !== "grammar" && script.segments.some((segment) => segment.grammarBoard)) {
      context.addIssue({ code: "custom", message: "Scripts with grammarBoard must set lessonFormat: grammar.", path: ["lessonFormat"] });
    }

    if (script.lessonFormat === "grammar") {
      const issue = (message: string, path: (string | number)[] = []) => context.addIssue({ code: "custom", message, path });
      if (script.estimatedMinutes !== 10 || script.durationGoalMinutes !== 10) {
        issue("Grammar lessons require estimatedMinutes: 10 and durationGoalMinutes: 10.");
      }
      const practices = script.segments.filter((segment) => ["prompt", "final_challenge"].includes(segment.type));
      if (script.title.length > 110) issue("Keep the video title under 110 characters for readability.", ["title"]);
      if (practices.length < 6) issue("Include at least six timed practice questions, with a separate answer immediately after each.");
      for (const [index, segment] of script.segments.entries()) {
        const basePath = ["segments", index];
        if (!segment.grammarBoard) issue("Every grammar segment needs a grammarBoard.", [...basePath, "grammarBoard"]);
        if ((segment.subtitle ?? segment.text).length > 280) issue("Split this explanation into shorter segments or provide a concise subtitle under 280 characters.", [...basePath, "subtitle"]);
        const speechIssue = getGrammarSpeechIssue(segment.text);
        if (speechIssue) issue(speechIssue, [...basePath, "text"]);
        if (segment.text.trim().split(/\s+/).length < 2) issue("Model a complete word in a short sentence, not an isolated sound or suffix.", [...basePath, "text"]);
        if ((segment.voiceId ?? script.voices[segment.role] ?? "").startsWith("local:")) issue("Grammar lessons use configured ElevenLabs voices for narration and examples.", basePath);
        if (["prompt", "final_challenge"].includes(segment.type)) {
          if (!segment.showTimer || (segment.responsePauseMs ?? 0) < 6000 || (segment.responsePauseMs ?? 0) > 20000) {
            issue("Practice needs showTimer: true and responsePauseMs between 6000 and 20000.", basePath);
          }
          if (segment.grammarBoard?.kind !== "example") issue("Use an example board for practice; reveal the solution only on the following answer segment.", basePath);
          if (script.segments[index + 1]?.type !== "answer") issue("The next segment must be an answer, after the response timer finishes.", basePath);
          if (segment.targetAnswer && JSON.stringify([segment.grammarBoard, segment.subtitle, segment.visualTitle]).includes(segment.targetAnswer)) issue("The practice board or caption exposes targetAnswer before the learner responds.", basePath);
        }
        if (script.learnerNativeLanguage === "darija" && segment.role === "narrator" && !/[\u0600-\u06ff]/u.test(segment.text)) {
          issue("Darija narrator text must use Arabic script.", [...basePath, "text"]);
        }
        if (script.targetLanguage === "darija" && segment.role !== "narrator" && /[a-z]/i.test(segment.text)) {
          issue("Darija speech must use Arabic script only. Put Latin transliteration in grammarBoard phrase.latin.", [...basePath, "text"]);
        }
        if (script.targetLanguage === "darija" && script.learnerNativeLanguage === "english" && segment.grammarBoard) {
          const inspectPhrase = (value: unknown): void => {
            if (!value || typeof value !== "object") return;
            const record = value as Record<string, unknown>;
            if (typeof record.text === "string" && /[\u0600-\u06ff]/u.test(record.text) && (!record.latin || !record.meaning)) {
              issue("Every Arabic target phrase needs latin transliteration and an English meaning.", [...basePath, "grammarBoard"]);
            }
            Object.values(record).forEach(inspectPhrase);
          };
          inspectPhrase(segment.grammarBoard);
        }
      }
    }

    for (const segment of script.segments) {
      if (ids.has(segment.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate segment id "${segment.id}". Segment IDs must be unique.`,
          path: ["segments"],
        });
      }

      ids.add(segment.id);

      if (!script.voices[segment.role]) {
        context.addIssue({
          code: "custom",
          message: `Missing voice mapping for role "${segment.role}". Add it to the lesson voices object.`,
          path: ["voices", segment.role],
        });
      }
    }
  });

export type LessonScript = z.infer<typeof lessonScriptSchema>;
export type LessonSegment = LessonScript["segments"][number];
export type SegmentType = (typeof segmentTypes)[number];
export type SegmentRole = (typeof segmentRoles)[number];
export type VisualMode = (typeof visualModes)[number];

export function validateLessonScript(value: unknown): LessonScript {
  const result = lessonScriptSchema.safeParse(value);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const path = issue.path.length ? issue.path.join(".") : "script";
        return `- ${path}: ${issue.message}`;
      })
      .join("\n");

    throw new Error(`Invalid lesson script:\n${details}`);
  }

  return result.data;
}
