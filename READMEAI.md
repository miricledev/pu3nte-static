# READMEAI — PU3NTE Static Lesson-Pack Playbook

This file is for any AI agent or developer continuing work on this repository from a fresh conversation, another account, or without the original chat history. It explains exactly how PU3NTE lesson reinforcement packs are built, registered, voiced, validated, and handed back to the user.

The project is a static React/Vite learning site. The user usually creates the main speaking lesson/video in Lesson Studio, then asks the AI to create the surrounding interactive activities for the same topic. The AI should create those activities in the static site without interrupting any ongoing MP4/render process.

## Core Mental Model

Each new topic usually needs a complete reinforcement pack:

1. Flashcards
2. Sentence Builder
3. Text Message / WhatsApp Story
4. Synced Audio Reading
5. Final Quiz

The user may also ask for special packs like regional sayings stories/quizzes, prompt-builder edits, or audio/reading fixes. The most common request is: “I just made [dialect/language] [level] - [topic]. Here is the vocab. Make the rest.”

When that happens, create a new `src/data/*Reinforcement.ts` file, register its exports in `src/data/index.ts`, generate audio under `public/audio`, validate counts and URLs, run `npm run build`, and return links plus git commands.

## Repository Basics

Working directory:

```powershell
C:\Users\rohan\Documents\react\pu3nte-static
```

Common commands:

```powershell
npm run build
npm run lesson:studio
npm run align:readings -- --all --dry-run
npm run align:readings -- --all --regenerate-with-timestamps
```

Important scripts:

- `npm run build` runs TypeScript, Vite, and SPA 404 copy.
- `npm run lesson:studio` starts the local lesson studio.
- `npm run align:readings` detects and fixes drift-prone reading timing files.

Never tell the user to run `npm run lesson-studio` or `npm run studio`; those scripts do not exist.

## Do Not Interrupt MP4 / Lesson Studio

The user’s computer struggles during MP4 rendering. Many requests include: “don’t affect the current MP4 process in studio.”

This means:

- Do not restart Lesson Studio unless the user specifically asks.
- Do not kill Node, ffmpeg, Remotion, Vite, or browser processes.
- Do not run heavy video-render commands.
- It is okay to write static lesson files and generate ElevenLabs audio files.
- It is okay to run `npm run build` after changes, unless the user explicitly says not to.
- Avoid broad background process cleanup.

## Content Standards

The user wants the activities to feel interesting, useful, and level-appropriate. Avoid generic, bland dialogues. Each story should have a mini-plot, social tension, decisions, and a natural resolution.

For dialect lessons, use the supplied vocab. Use all of it when practical. If the vocab list is huge, at least cover every major target phrase across the flashcards, builder, story, reading, and quiz.

For Spanish dialect lessons:

- The learning target is Spanish.
- Story chat text is in Spanish.
- Reading text must be entirely in Spanish.
- Reading audio must be in Spanish with the matching dialect accent.
- English can appear in translations, definitions, prompts, explanations, and quiz answer options.

For English lessons:

- The learning target is English.
- Reading text/audio should be entirely in English.
- Spanish can appear in translations, explanations, or learner-facing instructions where appropriate.

## Activity Pack Shape

Create one new file per topic:

```text
src/data/[dialectLanguageLevelTopic]Reinforcement.ts
```

Examples:

- `src/data/colombianSpanishB2FlirtyBanterReadingInterestReinforcement.ts`
- `src/data/argentinianSpanishB2FlirtyBanterReadingInterestReinforcement.ts`
- `src/data/dominicanSpanishB2FlirtyBanterReadingInterestReinforcement.ts`

Use a stable `courseId` slug:

```ts
const courseId = "dominican-spanish-b2-flirty-banter-reading-interest";
```

Then every activity uses predictable IDs:

```ts
id: `${courseId}-flashcards`
id: `${courseId}-sentence-builder`
id: `${courseId}-story`
id: `${courseId}-reading`
id: `${courseId}-quiz`
```

The live URL pattern is:

```text
https://pu3nte-static.vercel.app/flashcards/[activity-id]
https://pu3nte-static.vercel.app/sentence-builder/[activity-id]
https://pu3nte-static.vercel.app/stories/[activity-id]
https://pu3nte-static.vercel.app/reading/[activity-id]
https://pu3nte-static.vercel.app/quiz/[activity-id]
```

## Type Imports

Most reinforcement files import these types:

```ts
import type {
  CheckpointQuestion,
  CheckpointQuiz,
  FlashcardDeck,
  FlashcardItem,
  ReadingComprehension,
  SentenceBuilderLesson,
  SentenceStage,
  StoryMessage,
  WhatsAppStory,
} from "../types";
```

Story characters currently use this shape:

```ts
{ id: "ana", name: "Ana", initials: "AN", side: "right", color: "violet" }
```

Do not use unsupported fields like `role` or `avatarColor` unless the type changes.

## Flashcards

Create one flashcard for every supplied target phrase.

Flashcard requirements:

- `languageFrom: "spanish"` and `languageTo: "english"` for Spanish lessons.
- `languageFrom: "english"` and `languageTo: "spanish"` for English lessons, if the lesson tests English-to-Spanish meaning; match nearby patterns for English packs.
- Include `term`, `definition`, `exampleSentence`, `exampleTranslation`, `acceptedAnswers`, `notes`, `difficulty`, and `specialCharacters`.
- Mark important cards as `starred: true`.

The user likes compact but useful notes, especially when a phrase is informal, regional, risky, playful, flirtatious, or register-sensitive.

## Sentence Builder

Sentence Builder usually has 8 stages.

Each stage should include:

- `id`, usually `stage-1` through `stage-8`.
- `title`
- `newVocab`
- `fullVocab`
- `prompt`
- `targetAnswer`
- `acceptedAnswers`
- `explanation`
- `wordBreakdown`
- `audioUrl`

Audio URL pattern:

```ts
audioUrl: `/audio/sentence-builder/${courseId}/${id}.mp3`
```

Important sentence-builder rule:

- For Spanish lessons, do not accidentally ask the user to translate English to English.
- The `prompt` can be English, but the `targetAnswer` must be the target language.
- For English lessons, the `prompt` may be Spanish and `targetAnswer` should be English, depending on the surrounding lesson style.

For regional/dialect terms that ElevenLabs pronounces badly when isolated, generate audio from full `targetAnswer` sentences rather than bare single-word clips wherever possible. Single isolated slang words like `dale`, `parcero`, `jevi`, etc. can be mispronounced by TTS; sentence context helps.

## Text Message / WhatsApp Stories

The standard story format for newer packs:

- Exactly 30 messages.
- Exactly 6 voice notes.
- A comprehension check every 3 messages.
- Checks after: `m3`, `m6`, `m9`, `m12`, `m15`, `m18`, `m21`, `m24`, `m27`, `m30`.
- Conversations are usually between two people.
- The story should have a believable plot and a clear social situation.
- Questions must only ask about information already revealed before or at the checkpoint message.

This question order rule is extremely important. The user specifically complained about questions appearing before the context. Do not ask about something that happens later in the chat.

Example checkpoint mapping:

```ts
comprehensionChecks: storyQuestions.map((question, index) => ({
  id: `dominican-b2-flirty-check-${index + 1}`,
  afterMessageId: `m${(index + 1) * 3}`,
  question,
})),
endQuiz: storyQuestions,
```

Each `storyQuestions` item should use supported question types. For true/false questions, always include options:

```ts
{
  type: "true-false",
  options: ["True", "False"],
  correctAnswer: "True",
}
```

If true/false options are missing, the user can get stuck and cannot proceed.

Voice note URL pattern:

```ts
const storyAudioBase = `/audio/stories/${courseId}`;
message("m3", "ana", "...", "...", ["target phrase"], "voice-note", `${storyAudioBase}/m3.mp3`)
```

Use 6 voice notes, commonly at:

```text
m3, m6, m10, m15, m21 or m22, m27
```

But questions still happen after every third message.

## Synced Audio Reading

The reading is not an explanatory article in English. It is a target-language audio reading.

For Spanish lessons:

- Full paragraph `text` is Spanish.
- Use regional wording naturally.
- Include stylish quotation marks around target phrases inside the reading text, e.g. `“dar cotorra”`, `“no dé papaya”`.
- Avoid unquoted target phrases inside explanatory prose, because learners get confused.
- `translation` can be English.
- `shadowLine` should be in Spanish.

For English lessons:

- Full paragraph `text` is English.
- Translation can be Spanish.

A reading usually has:

- 8 paragraphs.
- 5 comprehension questions.
- `audioUrl`
- `audioAlignmentUrl`
- `glossary`

Audio URL pattern:

```ts
audioUrl: `/audio/readings/${courseId}/full.mp3`,
audioAlignmentUrl: `/audio/readings/${courseId}/timings.json`,
```

### Reading Word Tracker Drift

Do not create rough `timings.json` by evenly dividing audio duration across words. That drifts behind the audio gradually.

Use timestamped TTS or the reusable aligner instead:

```powershell
npm run align:readings -- --all --dry-run
npm run align:readings -- --all --regenerate-with-timestamps
```

Notes:

- The current ElevenLabs API key may not have `forced_alignment` permission.
- The fallback uses ElevenLabs TTS-with-timestamps, which regenerates the reading audio and writes real word timings.
- This keeps links the same while replacing `full.mp3` and `timings.json`.

If generating a new reading from scratch, prefer timestamped TTS immediately for `full.mp3` and `timings.json`.

## Final Quiz

Final quizzes test phrase usage in fresh contexts, not just memory from the story.

The quiz should:

- Use the same target vocabulary from the lesson.
- Ask which phrase fits which social situation.
- Avoid questions requiring context the learner has not seen.
- Include immediate feedback.
- Usually have 10 individual questions plus 3 `match-pairs` questions.

Supported useful types:

- `multiple-choice`
- `fill-blank`
- `true-false` with options
- `order-words`
- `match-pairs`

Avoid unsupported lesson/question types. The user previously said they can use all quiz lesson types except `self-check` and `typed` for sayings quizzes.

For final lesson quizzes, follow existing `CheckpointQuiz` patterns in nearby reinforcement files.

## Regional / Dialect Voice Envs

Voice env names used by Lesson Studio and audio generation:

```text
ELEVENLABS_COLOMBIAN_SPANISH_MALE_VOICE_ID
ELEVENLABS_COLOMBIAN_SPANISH_FEMALE_VOICE_ID
ELEVENLABS_ARGENTINIAN_SPANISH_MALE_VOICE_ID
ELEVENLABS_ARGENTINIAN_SPANISH_FEMALE_VOICE_ID
ELEVENLABS_MEXICAN_SPANISH_MALE_VOICE_ID
ELEVENLABS_MEXICAN_SPANISH_FEMALE_VOICE_ID
ELEVENLABS_DOMINICAN_SPANISH_MALE_VOICE_ID
ELEVENLABS_DOMINICAN_SPANISH_FEMALE_VOICE_ID
ELEVENLABS_PERUVIAN_SPANISH_MALE_VOICE_ID
ELEVENLABS_PERUVIAN_SPANISH_FEMALE_VOICE_ID
ELEVENLABS_AMERICAN_ENGLISH_MALE_VOICE_ID
ELEVENLABS_AMERICAN_ENGLISH_FEMALE_VOICE_ID
ELEVENLABS_BRITISH_ENGLISH_MALE_VOICE_ID
ELEVENLABS_BRITISH_ENGLISH_FEMALE_VOICE_ID
ELEVENLABS_IRISH_ENGLISH_MALE_VOICE_ID
ELEVENLABS_IRISH_ENGLISH_FEMALE_VOICE_ID
ELEVENLABS_AUSTRALIAN_ENGLISH_MALE_VOICE_ID
ELEVENLABS_AUSTRALIAN_ENGLISH_FEMALE_VOICE_ID
```

Env files:

```text
.env.lesson-generator
.env.lesson.generator
.env.local
.env
```

Never print secrets.

## Audio Generation Pattern

For new static packs, previous work used temporary TypeScript scripts run with `npx tsx`. The script should:

1. Import `loadLocalEnv` and `projectRoot`.
2. Import `textToSpeechMp3`.
3. Import `textToSpeechWithTimestampsMp3` for readings.
4. Import the new lesson exports.
5. Generate each sentence-builder `stage.audioUrl` from `stage.targetAnswer`.
6. Generate story voice notes from message text and speaker voice.
7. Generate reading `full.mp3` with timestamped TTS.
8. Convert timestamped character alignment to word timings.
9. Write `public/audio/readings/[courseId]/timings.json`.

Prefer full-sentence audio for slang pronunciation. If a phrase is repeatedly mispronounced when isolated, embed it in a natural sentence for the TTS call.

## Registering in `src/data/index.ts`

Every new pack must be imported and added to all relevant arrays:

- `flashcardDecks`
- `sentenceBuilderLessons`
- `whatsappStories`
- `checkpointQuizzes`
- `readingComprehensions`

If registration is missing, the link will show “lesson not found” even if the file exists.

If audio files are missing from git, links can load but audio will fail.

If the data file is imported but not committed, Vercel build can fail with:

```text
Cannot find module './someReinforcementFile'
```

## Validation Checklist

Before final response:

1. Run a data-level check that all IDs resolve.
2. Confirm counts:
   - flashcard count equals supplied vocab count where practical.
   - sentence builder has 8 stages.
   - story has 30 messages.
   - story has 6 voice notes.
   - story has 10 inline checks.
   - inline checks are after `m3`, `m6`, `m9`, `m12`, `m15`, `m18`, `m21`, `m24`, `m27`, `m30`.
   - reading has 8 paragraphs.
   - reading has 5 questions.
   - quiz has around 13 questions.
3. Run:

```powershell
npm run build
```

4. Check:

```powershell
git status --short
```

Do not include unrelated local changes in git commands. `.gitignore` has often been locally modified and should be left out unless the user specifically asks.

## Link Handoff Format

The user likes a concise list with title, link, and short description. Include all five activities.

Example:

```text
- Dominican B2 | Flashcards - [open](https://pu3nte-static.vercel.app/flashcards/dominican-spanish-b2-flirty-banter-reading-interest-flashcards) - Sweet talk, signs of interest, boundaries, and vivid Dominican reactions.
- Dominican B2 | Sentence Builder - [open](https://pu3nte-static.vercel.app/sentence-builder/dominican-spanish-b2-flirty-banter-reading-interest-sentence-builder) - Build phrases for cotorra, signals, and backing off.
- Dominican B2 | Cotorra or Real Signs? - [open](https://pu3nte-static.vercel.app/stories/dominican-spanish-b2-flirty-banter-reading-interest-story) - Ana and Leo decode whether Rafa’s charm is real interest or just talk.
- Dominican B2 | Cotorra con Banda - [open](https://pu3nte-static.vercel.app/reading/dominican-spanish-b2-flirty-banter-reading-interest-reading) - Spanish synced reading on sweet talk, gufeo, and respecting space.
- Dominican B2 | Final Quiz - [open](https://pu3nte-static.vercel.app/quiz/dominican-spanish-b2-flirty-banter-reading-interest-quiz) - Tests picking the right Dominican phrase for flirting, excitement, and limits.
```

Use Markdown links in Codex desktop responses.

## Git Command Handoff

The user often asks for git commands and runs them manually in PowerShell. Give PowerShell-friendly single-line `git add` commands. Do not use trailing backticks, Unix line continuations, or `^` unless explicitly writing for CMD.

Safe pattern:

```powershell
cd C:\Users\rohan\Documents\react\pu3nte-static
git add src/data/index.ts src/data/[newFile].ts public/audio/readings/[slug] public/audio/sentence-builder/[slug] public/audio/stories/[slug]
git commit -m "Add [lesson name] activities"
git push origin main
```

Warn if `.gitignore` or other unrelated files are modified but intentionally excluded.

## Common User Workflows

### “I just made [topic], here is vocab”

Do:

1. Create full reinforcement file.
2. Register all exports.
3. Generate audio with correct regional voices.
4. Use timestamped TTS for reading sync.
5. Validate counts and URLs.
6. Run build.
7. Return links, descriptions, git commands.

### “The link says lesson not found”

Check:

- Activity ID in URL.
- Export import in `src/data/index.ts`.
- Activity was added to correct array.
- File was committed/pushed.
- Vercel build succeeded.

### “Vercel build failed”

Run local:

```powershell
npm run build
```

Fix the exact TypeScript error. Common causes:

- Imported a file that was not added/committed.
- Character object has unsupported fields.
- True/false question lacks options.
- Wrong type names.
- Accidentally used `cards` instead of `data.cards`.

### “Story questions are out of sync”

Inspect `comprehensionChecks`. Make sure each question only asks about information available by its `afterMessageId`. If in doubt, rewrite questions to explicitly say “After message X…” and make them local to that chunk.

### “True/false has no options”

Add:

```ts
options: ["True", "False"]
```

### “Reading audio word tracker drifts”

Run:

```powershell
npm run align:readings -- --all --dry-run
npm run align:readings -- --all --regenerate-with-timestamps
```

Then:

```powershell
npm run build
```

### “Start Lesson Studio”

Use:

```powershell
cd C:\Users\rohan\Documents\react\pu3nte-static
npm run lesson:studio
```

## Sayings Story Packs

The user created Colombian and Argentinian sayings sections. For sayings packs:

- Split 50 sayings into 10 stories.
- Story 1 uses sayings 1–5, story 2 uses 6–10, etc.
- Each story should say which 5 sayings it uses when handing off.
- Conversations are between a man and a woman.
- Stories use the same text-message format but with 30 messages, 6 voice notes, and questions every 3 messages.
- Create one flashcard deck with all 50 sayings.
- Create 10 quizzes, one per group of 5 sayings.
- Each quiz tests using the correct saying in a new situation, not story recall.
- Do not include sayings from later groups in earlier quizzes.
- The flashcard link at the end of each sayings story should point to the main deck:

```text
https://pu3nte-static.vercel.app/flashcards/colombian-sayings-50-flashcards
```

or the equivalent Argentinian deck if applicable.

For Skool page titles, the user wanted simple titles like:

```text
Sayings Story 1: ...
Sayings Quiz 1
```

## Advanced Dialect Prompting Rule

The user noticed that generic AI prompts overuse famous beginner slang for Dominican/Colombian/etc. Advanced local lessons should not recycle obvious phrases as target vocab.

For C1/C2 dialect topics:

- Assume learners already know famous beginner regional words.
- Do not make basic phrases the target vocab unless necessary.
- They may appear incidentally if natural.
- Target chunks should emphasize nuance, idioms, social risk, register, subtext, indirectness, humor, or layered meanings.
- At least 80% of target chunks should be phrases unlikely to appear in a beginner slang list.

Level guidance:

- B1: accessible local flavor and everyday practical phrases.
- B2: practical everyday local speech, social situations, opinions, plans, dating, conflict, transport, errands.
- C1: nuanced idioms, register shifts, social reading, interpersonal language, less-obvious colloquial expressions.
- C2: layered meanings, irony, emotional precision, double meanings, indirectness, social risk, rare-but-natural idioms.

This applies to every dialect, not only Dominican Spanish.

## Special Dialects / Courses

Special Spanish dialects include:

- Colombian
- Argentinian
- Mexican
- Dominican
- Peruvian

Special English dialects include:

- American
- British
- Irish
- Australian

The prompt-builder / lesson-studio config should include the special dialects and their voice envs. Check `tools/lesson-generator/src/lessonStudio.ts` for dialect definitions before changing.

## Current Content Style Examples

Recent successful packs:

- Colombian B2 Flirty Banter and Reading Interest
- Colombian B2 Teasing Without Crossing the Line
- Argentinian B2 Flirty Banter and Reading Interest
- Dominican B2 Flirty Banter and Reading Interest
- Colombian C1 Emotional Honesty and Difficult Conversations
- Dominican C2 Emotional Conversations
- Peruvian B1 Plans and Social Invitations

Use these as nearby structure references.

## Final Response Style

Be concise but complete. For a new pack, include:

- Confirmation that build passed.
- Files added/registered with line references.
- Links with short descriptions.
- Git commands.
- Note about excluded unrelated local changes if any.

Example:

```text
Done — build passes with `npm run build`.

**Added**
- `C:\Users\rohan\Documents\react\pu3nte-static\src\data\...\Reinforcement.ts:24`
- Registered in `C:\Users\rohan\Documents\react\pu3nte-static\src\data\index.ts:167`
- Story has 30 messages, 6 voice notes, and checks after `m3/m6/m9/.../m30`.

**Links**
- ...

**Git Commands**
```powershell
...
```

Note: `.gitignore` is still modified locally, but I left it out.
```

## Absolute Don’ts

- Do not invent fake URLs; verify IDs in `src/data/index.ts`.
- Do not ask story questions before the relevant context appears.
- Do not omit true/false options.
- Do not generate Spanish reading audio from English explanatory text.
- Do not use rough evenly spaced reading timings for new synced readings.
- Do not interrupt MP4 rendering or restart Studio unless asked.
- Do not include `.gitignore` or unrelated files in git commands unless asked.
- Do not print ElevenLabs API keys or env secrets.
- Do not commit or push unless the user explicitly asks you to do it.
