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

  if (timeline.totalDurationMs > 30 * 60_000) {
    warnings.push("Lesson is over 30 minutes. That is OK, but review pacing before generating.");
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
- The lesson will become MP4, MP3, SRT subtitles, transcript, timeline, and metadata.
- Do not call it Pimsleur-style.

Required JSON shape:
{
  "id": "kebab-case-lesson-id",
  "title": "Spanish A1 Speaking Drill: Topic",
  "subtitle": "Short learner-facing subtitle.",
  "course": "Spanish Speaking Drills",
  "level": "A1-A2",
  "targetLanguage": "spanish",
  "learnerNativeLanguage": "english",
  "estimatedMinutes": 5,
  "durationGoalMinutes": 5,
  "outputSlug": "same-kebab-case-lesson-id",
  "branding": {
    "logoText": "PU3NTE",
    "theme": "default",
    "showLogo": true
  },
  "voices": {
    "narrator": "local:english",
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
    "defaultPauseAfterMs": 1000,
    "defaultResponsePauseMs": 5000,
    "subtitleMode": "line",
    "videoWidth": 1920,
    "videoHeight": 1080,
    "fps": 30,
    "backgroundMusic": false
  },
  "segments": []
}

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

Timing rules:
- Prompt and repeat segments should usually have showTimer: true and responsePauseMs between 4000 and 10000.
- Answer segments should usually have showTimer: false and pauseAfterMs between 1000 and 1800.
- Do not rely on TTS for silence; pauses are generated by the tool.
- Include review prompts later in the lesson for spaced recall.

Voice rules:
- For English-speaker-learning-Spanish lessons, use narrator: "local:english", native_male/native_female env Spanish voices.
- For Spanish-speaker-learning-English lessons, use narrator: "local:spanish", english_male/english_female env English voices.

Content rules:
- Make it a serious PU3NTE Speaking Drill / Listen & Respond Lesson.
- Use clear prompt -> pause -> answer -> repeat flows.
- Include intro, 5-10 prompt/answer/repeat groups, a short review, final_challenge, and outro.
- Keep the target language natural, beginner-appropriate, and useful.
- Set outputSlug equal to id.
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
            '<div class="metric"><strong>' + stats.localTtsSegments + '</strong><span>Free local narrator clips</span></div>' +
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
        await navigator.clipboard.writeText(chatGptPrompt);
        setStatus("Copied the ChatGPT JSON prompt. Paste it into ChatGPT with your lesson topic and language direction.");
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
