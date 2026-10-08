# PU3NTE Audio/Video Speaking Lesson Generator

This is a local-only content production tool for generating PU3NTE listen-and-respond speaking lessons. It reads a structured JSON script and produces an MP4 video, MP3 audio, synced SRT subtitles, a Markdown transcript, timeline metadata, and cached ElevenLabs audio clips.

It is intentionally separate from the public static site. Do not deploy this folder or put API keys in frontend code.

## Ten-minute grammar videos

In the prompt selector, choose **Speaking / grammar lesson format → 10-min Grammar lab**. This opens a dedicated course, level and topic selector:

- English → Spanish: English explanation, native Spanish examples.
- Moroccan Darija → Andalusian Spanish: Arabic-script Darija explanation and instructions, Andalusian Spanish examples.
- British English → Moroccan Darija: English explanation, Arabic-script Darija examples with visible Latin transliteration and English meaning.

Each course has eight ordered grammar focuses per level, A1–C2 (48 per course). The two Spanish courses share grammar focuses but have different narration, instructions and voices. You can replace the selected topic with a custom focus. Both copy-prompt buttons use the same standalone grammar contract; they do not append the 15- or 30-minute speaking rules. Topic labels in the admin remain English.

Workflow: select a topic, copy the prompt to ChatGPT, paste the complete JSON into Studio, run **Dry Run**, resolve any blockers, then generate MP4 + Audio. No new voice variables are needed beyond the existing English narrator, Spanish pair, Darija narrator/pair and Andalusian pair. Grammar uses ElevenLabs narration throughout; it does not use the speaking-mode local/hybrid narrator selector.

The teaching sequence is a practical hook, noticing a pattern, worked examples, guided retrieval, a useful exception, independent practice and a recap. Aim at ten minutes; estimated and measured duration must fall between nine and eleven minutes. Before TTS, an out-of-range estimate stops generation. If measured speech pushes the result outside the window, audio/timeline files are retained, video rendering is stopped, and unchanged clips can be reused after script revision. A duration field alone cannot control actual audio length.

### Speech and visual notation

`text` contains only natural spoken sentences. `grammarBoard` is display-only. To teach an ending, show `-as` on the board, have the English narrator explain “Add the letters a and s”, then use a separate native segment to model “Tú hablas español.” Do not send isolated endings, formulas, phoneme tags, slash alternatives or Latin Darija transliterations to TTS. Arabic-script Darija instruction is required for Moroccan learners.

This follows ElevenLabs' guidance to use natural contextualised text and avoid confusing languages within one clip. Pronunciation cannot be guaranteed; listen to generated audio before publication. References: [TTS best practices](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices) and [language and accent selection](https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/how-do-i-select-the-language-and-accent).

### Script contract

Set `lessonFormat: "grammar"`, `estimatedMinutes: 10`, and `durationGoalMinutes: 10`. Every segment has a board from these layouts:

- `table`: `columns` (2–3 strings), `rows` (up to six arrays of plain phrase objects; up to four when cells include transliterations or meanings), optional zero-based `highlightRow`.
- `pattern`: `parts` (2–5 phrases), optional `result`, optional `highlightPart`.
- `contrast`: exactly two `cards`, each with `label` and `phrase`.
- `timeline`: 2–3 chronological `events`, each with `label` and `phrase`, optional `highlightEvent`.
- `example`: one `phrase`, optional `choices` (2–3 phrases).

All boards have `kind`, `title`, optional `note`. A phrase has `text`, optional `latin`, optional `meaning`. For English → Darija, every Arabic target phrase needs both support fields. Keep table cells concise: 45 characters for text, 50 for transliteration, 60 for meaning. Split large tables. Use successive segments to highlight different rows alongside the relevant spoken explanation. Arrays preserve column and timeline order; Arabic phrases use automatic text direction and Arabic sentence patterns flow right-to-left.

Include at least six `prompt` or `final_challenge` segments, each with an `example` board, `showTimer: true`, and `responsePauseMs` of 6000–20000. The next segment must be `answer`. Only unanswered questions or unmarked choices appear before the answer. Do not leak the solution through captions or board notes. The countdown begins after the prompt audio; the answer begins after the countdown. These are prerecorded pauses, not speech recognition or automatic grading.

The schema validates malformed boards, missing answer pairs, unsafe speech notation, script requirements, and important language constraints. Generated prompts embed the actual JSON schema from `validateScript.ts`; keep prose constraints aligned with it. Validation does not replace reviewing grammar accuracy, natural dialect usage, pronunciation or final visual layout. Existing speaking scripts omit `lessonFormat` and keep the original renderer.

Implementation: `src/grammarLessons.ts` (topics and prompts), `src/grammarSchema.ts` (boards and speech checks), `src/validateScript.ts`, `src/buildTimeline.ts`, and `remotion/GrammarLessonVideo.tsx` with `remotion/components/GrammarBoard.tsx`.

## Output files

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

Each segment requires `id`, `type`, `role`, and `text`. Optional fields include `voiceId`, `subtitle`, `visualTitle`, `visualSubtitle`, `visualMode`, `pauseAfterMs`, `responsePauseMs`, `showTimer`, `timerLabel`, `speakerName`, `showOnScreenText`, `targetAnswer`, `nativePrompt`, and `speed`. Use `voiceId` only for a per-segment override, such as ElevenLabs intro narration while the rest of the narrator role stays local TTS.

## Timing

The generator never asks ElevenLabs to create long pauses. It generates each spoken segment as an MP3 clip, measures the clip with ffprobe, and inserts exact silence with FFmpeg.

For 10-minute cumulative sentence-builder speaking lessons, model the answer once at normal speed, then add a `repeat` or `shadow` segment with the same `targetAnswer`, `speed: 0.75`, `showTimer: true`, and `timerLabel: "Repeat it"`. The generator slows that second audio clip with FFmpeg, measures the real slowed duration, then gives the learner a separate timer pause after it.

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
