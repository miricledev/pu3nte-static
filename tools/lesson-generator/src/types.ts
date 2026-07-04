import type { LessonScript, SegmentRole, SegmentType, VisualMode } from "./validateScript";

export type VoiceSettings = {
  stability?: number;
  similarityBoost?: number;
  style?: number;
  useSpeakerBoost?: boolean;
};

export type GeneratedAudioClip = {
  segmentId: string;
  voiceId: string;
  filePath: string;
  durationMs: number;
  cacheHit: boolean;
};

export type TimelineSegment = {
  id: string;
  type: SegmentType;
  role: SegmentRole;
  text: string;
  subtitle: string;
  voiceId: string;
  audioFilePath: string;
  audioStartMs: number;
  audioEndMs: number;
  pauseStartMs: number;
  pauseEndMs: number;
  segmentStartMs: number;
  segmentEndMs: number;
  showTimer: boolean;
  timerStartMs: number | null;
  timerEndMs: number | null;
  visualMode: VisualMode;
  visualTitle?: string;
  visualSubtitle?: string;
  timerLabel?: string;
  speakerName?: string;
  showOnScreenText?: string;
  targetAnswer?: string;
  nativePrompt?: string;
};

export type LessonTimeline = {
  lesson: Pick<
    LessonScript,
    | "id"
    | "title"
    | "subtitle"
    | "course"
    | "level"
    | "targetLanguage"
    | "learnerNativeLanguage"
    | "estimatedMinutes"
    | "outputSlug"
    | "branding"
  >;
  totalDurationMs: number;
  fps: number;
  videoWidth: number;
  videoHeight: number;
  segments: TimelineSegment[];
};

export type GeneratorOptions = {
  dryRun: boolean;
  audioOnly: boolean;
  videoOnly: boolean;
  skipTts: boolean;
  forceTts: boolean;
};

export type GeneratorProgressEvent = {
  stage: string;
  message: string;
  percent?: number;
  current?: number;
  total?: number;
  raw?: string;
};

export type GeneratorCallbacks = {
  onProgress?: (event: GeneratorProgressEvent) => void;
};
