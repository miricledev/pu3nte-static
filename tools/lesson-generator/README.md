# PU3NTE Audio/Video Speaking Lesson Generator

This is a local-only content production tool for generating PU3NTE listen-and-respond speaking lessons. It reads a structured JSON script and produces an MP4 video, MP3 audio, synced SRT subtitles, a Markdown transcript, timeline metadata, and cached ElevenLabs audio clips.

It is intentionally separate from the public static site. Do not deploy this folder or put API keys in frontend code.

## Outputs

For a lesson with `outputSlug: "spanish-a1-want-need-can"`, files are written to:

```text
tools/lesson-generator/output/spanish-a1-want-need-can/
  final-video.mp4
  final-audio.mp3
  subtitles.srt
  transcript.md
  timeline.json
  metadata.json
```

Generated TTS clips are cached in:

```text
tools/lesson-generator/cache/audio/{lessonId}/{segmentId}-{hash}.mp3
```

The cache hash includes the text, voice ID, model ID, and voice settings, so unchanged clips are reused.

## Requirements

- Node.js and npm
- FFmpeg and ffprobe available on your PATH
- ElevenLabs API key and voice IDs

Install FFmpeg locally before generating audio or video. On Windows, common options are `winget install Gyan.FFmpeg` or a manual install from the FFmpeg website.

## Environment

Copy `.env.lesson-generator.example` to `.env.lesson-generator` or add these values to your local `.env`:

```text
ELEVENLABS_API_KEY=
ELEVENLABS_MODEL_ID=eleven_multilingual_v2
ELEVENLABS_SPANISH_MALE_VOICE_ID=
ELEVENLABS_SPANISH_FEMALE_VOICE_ID=
ELEVENLABS_ENGLISH_MALE_VOICE_ID=
ELEVENLABS_ENGLISH_FEMALE_VOICE_ID=
ELEVENLABS_SPANISH_NARRATOR_VOICE_ID=
ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID=
ELEVENLABS_COLOMBIAN_SPANISH_MALE_VOICE_ID=
ELEVENLABS_COLOMBIAN_SPANISH_FEMALE_VOICE_ID=
ELEVENLABS_ARGENTINIAN_SPANISH_MALE_VOICE_ID=
ELEVENLABS_ARGENTINIAN_SPANISH_FEMALE_VOICE_ID=
ELEVENLABS_MEXICAN_SPANISH_MALE_VOICE_ID=
ELEVENLABS_MEXICAN_SPANISH_FEMALE_VOICE_ID=
ELEVENLABS_DOMINICAN_SPANISH_MALE_VOICE_ID=
ELEVENLABS_DOMINICAN_SPANISH_FEMALE_VOICE_ID=
ELEVENLABS_BRITISH_ENGLISH_MALE_VOICE_ID=
ELEVENLABS_BRITISH_ENGLISH_FEMALE_VOICE_ID=
ELEVENLABS_AMERICAN_ENGLISH_MALE_VOICE_ID=
ELEVENLABS_AMERICAN_ENGLISH_FEMALE_VOICE_ID=
ELEVENLABS_IRISH_ENGLISH_MALE_VOICE_ID=
ELEVENLABS_IRISH_ENGLISH_FEMALE_VOICE_ID=
ELEVENLABS_AUSTRALIAN_ENGLISH_MALE_VOICE_ID=
ELEVENLABS_AUSTRALIAN_ENGLISH_FEMALE_VOICE_ID=
LOCAL_TTS_ENGLISH_VOICE_NAME=
LOCAL_TTS_SPANISH_VOICE_NAME=
```

Never commit real API keys. The generator reads env values only in local Node.js scripts.

Narrator segments default to ElevenLabs env voices in the Lesson Studio copied prompts. If you want to save credits for a generic lesson, you can still use local system TTS:

```json
"voices": {
  "narrator": "local:english"
}
```

Use `local:english` for English narration and `local:spanish` for Spanish narration. On Windows, the generator chooses the first installed matching speech voice. If you want a specific installed voice, set `LOCAL_TTS_ENGLISH_VOICE_NAME` or `LOCAL_TTS_SPANISH_VOICE_NAME` in `.env.lesson-generator`.

Keep local narrator lines monolingual. For example, avoid Spanish local TTS saying `Ahora di: I want coffee` or English local TTS saying `Say: Quiero café`, because system voices pronounce the other language badly. Instead:

- Narrator text: `Ahora di esta frase en inglés.`
- `showOnScreenText` / `targetAnswer`: `I want coffee.`
- Answer or repeat segment: use an English ElevenLabs voice to pronounce `I want coffee.`

This keeps narrator clips free/local while only the native answer clips use ElevenLabs.

Dialect/accent lessons use ElevenLabs narrator voices too. The Lesson Studio dialect/accent picker maps narrator and speaker roles to env variables like this:

```json
"voices": {
  "narrator": "env:ELEVENLABS_ENGLISH_NARRATOR_VOICE_ID",
  "native_male": "env:ELEVENLABS_COLOMBIAN_SPANISH_MALE_VOICE_ID",
  "native_female": "env:ELEVENLABS_COLOMBIAN_SPANISH_FEMALE_VOICE_ID"
}
```

Spanish dialect courses use an English narrator plus `native_male` / `native_female` Spanish voices. English accent courses use a Spanish narrator plus `english_male` / `english_female` English voices. Changing voice IDs does not change video timing logic: the generator measures each rendered clip duration, builds the timeline from the real durations, and inserts exact FFmpeg silence for pauses.

## Commands

Launch the local browser studio:

```bash
npm run lesson:studio
```

Then open:

```text
http://127.0.0.1:4783
```

The studio has a JSON paste box, dry-run/audio/video generation buttons, and a copy button for a ChatGPT prompt that describes the exact JSON format.

Validate a script without calling ElevenLabs or generating media:

```bash
npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json --dry-run
```

Generate audio, subtitles, transcript, timeline, and metadata only:

```bash
npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json --audio-only
```

Generate the full MP4 and MP3 package:

```bash
npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json
```

Run directly with `tsx`:

```bash
npx tsx tools/lesson-generator/src/generateLesson.ts tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json
```

Regenerate all TTS clips even if cached:

```bash
npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json --force-tts
```

Render video from an existing `timeline.json` and `final-audio.mp3`:

```bash
npm run generate:lesson -- tools/lesson-generator/sample-lessons/spanish-a1-want-need-can.json --video-only
```

## Lesson Scripts

Scripts are JSON, not free-form text. This keeps timing, roles, voice IDs, subtitles, and visual modes exact.

Core fields:

- `id`, `title`, `course`, `level`, `targetLanguage`, `learnerNativeLanguage`
- `outputSlug` for the output folder
- `voices` mapping segment roles to voice IDs or `env:VARIABLE_NAME`
- `settings` for pauses, FPS, and video size
- `segments` for the actual lesson flow

Supported segment types:

```text
intro, explanation, prompt, response_pause, answer, repeat, shadow,
dialogue, review, final_challenge, outro
```

Supported visual modes:

```text
intro, listen, your_turn, answer, repeat, shadow, dialogue,
review, final_challenge, outro
```

Supported roles:

```text
narrator, native_male, native_female, english_male, english_female,
spanish_male, spanish_female, speaker_1, speaker_2
```

Each segment requires `id`, `type`, `role`, and `text`. Optional fields include `voiceId`, `subtitle`, `visualTitle`, `visualSubtitle`, `visualMode`, `pauseAfterMs`, `responsePauseMs`, `showTimer`, `timerLabel`, `speakerName`, `showOnScreenText`, and `targetAnswer`. Use `voiceId` only for a per-segment override, such as ElevenLabs intro narration while the rest of the narrator role stays local TTS.

## Timing

The generator never asks ElevenLabs to create long pauses. It generates each spoken segment as an MP3 clip, measures the clip with ffprobe, and inserts exact silence with FFmpeg.

Timeline per segment:

```text
spoken audio duration + pauseAfterMs or responsePauseMs
```

When `showTimer` is true, the countdown appears during the pause portion. If `responsePauseMs` is set, that exact value is used. If `responsePauseMs` is omitted, the generator automatically scales the learner repeat time from `targetAnswer`, `showOnScreenText`, or the previous answer/repeat line.

If pacing needs a manual override, edit JSON pauses rather than editing audio manually. Good starting ranges:

- `defaultPauseAfterMs`: 500-900
- short prompt `responsePauseMs`: 2400-3500
- medium sentence `responsePauseMs`: 4500-7500
- longer final challenge `responsePauseMs`: 8000-12000
- answer/repeat `pauseAfterMs`: 600-1200

## Subtitles And Transcript

`subtitles.srt` is generated from `timeline.json`. Spoken segments use `subtitle` when present, otherwise `text`.

`transcript.md` includes title, level, language direction, timestamps, speaker labels, prompt text, answers, and response pauses.

## Video Template

The Remotion template renders a dark PU3NTE-branded lesson video with:

- PU3NTE logo text, lesson title, and level badge
- mode labels like `YOUR TURN`, `ANSWER`, `REPEAT`, and `LISTEN`
- large readable prompt or answer text
- animated countdown circle for response pauses
- red, yellow, and cyan progress bar
- subtle bridge-line motif and clean glass panels

The final audio track is attached during Remotion rendering, so the MP4 should not be silent.

## Common Errors

- `Missing ELEVENLABS_API_KEY`: add it to `.env.lesson-generator` or `.env`.
- `Missing ELEVENLABS_*_VOICE_ID`: the script references an env voice ID that is empty.
- `Local system TTS failed`: install a matching Windows speech voice or set `LOCAL_TTS_ENGLISH_VOICE_NAME` / `LOCAL_TTS_SPANISH_VOICE_NAME`.
- `FFmpeg and ffprobe are required`: install FFmpeg and make sure both commands are on PATH.
- `Invalid lesson script`: fix the listed JSON schema errors.
- `Missing cached audio`: you used `--skip-tts` before generating the needed clip.

## Uploading To Skool

After generation, review `final-video.mp4` locally, then manually upload it to Skool. Keep `timeline.json`, `subtitles.srt`, and `transcript.md` with your lesson production files for future edits.
