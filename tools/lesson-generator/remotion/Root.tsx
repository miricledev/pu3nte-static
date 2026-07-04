import { Composition, getInputProps } from "remotion";
import { Pu3nteLessonVideo } from "./Pu3nteLessonVideo";
import type { LessonTimeline } from "../src/types";

export type RemotionLessonProps = {
  timeline: LessonTimeline;
  audioSrc: string;
};

const fallbackTimeline: LessonTimeline = {
  lesson: {
    id: "preview",
    title: "PU3NTE Speaking Drill",
    subtitle: "Preview",
    course: "PU3NTE",
    level: "A1",
    targetLanguage: "spanish",
    learnerNativeLanguage: "english",
    outputSlug: "preview",
    branding: {
      logoText: "PU3NTE",
      theme: "default",
      showLogo: true,
    },
  },
  totalDurationMs: 10_000,
  fps: 30,
  videoWidth: 1920,
  videoHeight: 1080,
  segments: [
    {
      id: "preview",
      type: "intro",
      role: "narrator",
      text: "PU3NTE speaking drill preview.",
      subtitle: "PU3NTE speaking drill preview.",
      voiceId: "preview",
      audioFilePath: "",
      audioStartMs: 0,
      audioEndMs: 4000,
      pauseStartMs: 4000,
      pauseEndMs: 10_000,
      segmentStartMs: 0,
      segmentEndMs: 10_000,
      showTimer: true,
      timerStartMs: 4000,
      timerEndMs: 10_000,
      visualMode: "intro",
      visualTitle: "PU3NTE Speaking Drill",
      visualSubtitle: "Listen & Respond Lesson",
    },
  ],
};

const inputProps = getInputProps<Partial<RemotionLessonProps>>();
const timeline = inputProps.timeline ?? fallbackTimeline;
const durationInFrames = Math.max(1, Math.ceil((timeline.totalDurationMs / 1000) * timeline.fps));

export const RemotionRoot = () => {
  return (
    <Composition
      id="Pu3nteLessonVideo"
      component={Pu3nteLessonVideo}
      durationInFrames={durationInFrames}
      fps={timeline.fps}
      width={timeline.videoWidth}
      height={timeline.videoHeight}
      defaultProps={{
        timeline,
        audioSrc: inputProps.audioSrc ?? "",
      }}
    />
  );
};
