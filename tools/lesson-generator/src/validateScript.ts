import { z } from "zod";

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
