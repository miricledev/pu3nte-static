# PU3NTE Interactive Lab

PU3NTE Interactive Lab is a premium static front-end practice site for a Spanish-English learning community hosted on Skool. Skool can link directly to activity URLs here, while this app stays simple: no backend, no login, no database, and no paid APIs.

The app is built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Router, and localStorage progress.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## Deploy As Static Site

Use any static host:

- Vercel: import the repo, build command `npm run build`, output directory `dist`.
- Netlify: build command `npm run build`, publish directory `dist`.
- GitHub Pages: build locally or in Actions, then publish `dist`.
- Any static server: upload the contents of `dist`.

For direct nested URLs like `/flashcards/demo-spanish-foundations-flashcards`, configure your host to serve `index.html` as the fallback.

## Project Structure

```text
src/
  components/       Reusable layout, UI, and activity components
  data/demo/        Tiny placeholder demo content
  data/schemas/     Re-exported content/progress schema types
  hooks/            React hooks
  pages/            Route-level pages
  styles/           Global Tailwind and PU3NTE theme styles
  types/            Core TypeScript content models
  utils/            Answer checking, study helpers, localStorage progress
```

## Add A New Flashcard Deck

Add a `FlashcardDeck` object to `src/data/demo/demoFlashcards.ts` or create a new data file and export it through `src/data/index.ts`.

```ts
export const spanishModule1Lesson1Flashcards = {
  id: "spanish-foundations-lesson-1-flashcards",
  title: "Lesson 1 Flashcards",
  activityType: "flashcards",
  data: { cards: [] },
};
```

Then link from Skool to:

```text
/flashcards/spanish-foundations-lesson-1-flashcards
```

## Add A Sentence Builder Lesson

Add a `SentenceBuilderLesson` object with staged `newVocab`, randomized-display `fullVocab`, prompts, target answers, hints, and word breakdowns. Export it through `src/data/index.ts`, then link to:

```text
/sentence-builder/your-lesson-id
```

## Add A Verb Trainer Set

Add a `VerbTrainerSet` with Spanish or English verb objects. Spanish verbs support regular, irregular, stem-changing, reflexive, and mixed metadata plus tense/person conjugations. English verbs support forms and tense patterns. Link to:

```text
/verbs/your-set-id
```

## Add A WhatsApp Story

Add a `WhatsAppStory` with characters and messages. Messages can include translations, vocab highlights, grammar highlights, choices, and challenges. Link to:

```text
/stories/your-story-id
```

## Add A Checkpoint Quiz

Add a `CheckpointQuiz` with a `passScore`, feedback mode, and typed or choice-based questions. Link to:

```text
/quiz/your-quiz-id
```

## Add A Reading Comprehension

Add a `ReadingComprehension` with paragraphs, glossary highlights, questions, optional translations, and shadowing lines. Link to:

```text
/reading/your-reading-id
```

## Add A Grammar Mastery Lesson

Grammar Mastery is a reusable grammar practice engine for pattern explanation, recognition, production, correction, transformation, word order, matching, and mixed review. It supports Spanish and English lessons through hard-coded TypeScript data.

Add a `GrammarMasteryLesson` object and export it through `src/data/index.ts`.

```ts
export const spanishSerEstarGrammar = {
  id: "spanish-ser-vs-estar",
  title: "Ser vs Estar",
  subtitle: "Identity vs state and location",
  languageTarget: "spanish",
  learnerNativeLanguage: "english",
  level: "beginner",
  activityType: "grammar",
  tags: ["grammar", "ser", "estar"],
  estimatedMinutes: 8,
  skoolReturnUrl: "https://www.skool.com/your-community/lesson-post",
  data: {
    grammarTopic: "Ser vs Estar",
    intro: {
      shortExplanation: "Use ser for identity and estar for states or location.",
      pattern: "ser = identity · estar = state/location",
      examples: [{ targetText: "Estoy cansado.", translation: "I am tired." }],
    },
    sections: [
      {
        id: "recognise",
        title: "Recognise the Pattern",
        instructions: "Choose why the form is used.",
        type: "choose-explanation",
        items: [],
      },
    ],
  },
};
```

Exercise section types include `recognition`, `multiple-choice`, `fill-blank`, `typed-answer`, `sentence-transform`, `error-correction`, `word-order`, `match-pairs`, `choose-explanation`, `mini-translation`, `context-choice`, `dialogue-completion`, `tense-shift`, `pronoun-swap`, `negative-question-transform`, `speed-drill`, and `mixed-review`.

Typed answers use the shared answer checker with accepted answers, case-insensitive matching, whitespace normalization, accent/punctuation forgiveness, and almost-correct feedback. Spanish/French/Portuguese special-character keyboards are available for typed grammar exercises.

Link from Skool to:

```text
/grammar/spanish-ser-vs-estar
```

## localStorage Progress

Progress is stored under `pu3nte-progress-v1` and is designed to fail safely if data is missing or corrupt.

It tracks:

- Completed activities and recently opened activities
- Activity completion percentages
- Flashcard card states, mastered counts, and learning counts
- Quiz and reading scores
- Grammar Mastery lesson state, scores, attempts, weak skill tags, and weak grammar focus areas
- Sentence builder attempts and completed stages
- Verb trainer correct/incorrect counts, weak verbs, and weak tenses
- WhatsApp story progress
- Simple daily activity counts

The app keeps progress internally for activity behavior, but no learner-facing progress tab is exposed.

## Theme Colours

Edit brand colours in:

- `tailwind.config.ts`
- `src/styles/index.css`

The design follows the PU3NTE logo direction: very dark cinematic navy, white type, Spanish red/yellow energy, English blue/cyan energy, subtle bridge gradients, speech-bubble-inspired interaction surfaces, and premium glass panels.

## Linking From Skool

Each Skool lesson can link directly to a specific static route:

```text
https://your-domain.com/flashcards/demo-spanish-foundations-flashcards
https://your-domain.com/sentence-builder/demo-sentence-builder-cafe
https://your-domain.com/verbs/demo-core-verbs
https://your-domain.com/stories/demo-whatsapp-cafe-story
https://your-domain.com/quiz/demo-checkpoint-quiz
https://your-domain.com/reading/demo-reading-bridge
https://your-domain.com/grammar/demo-spanish-ser-estar
https://your-domain.com/grammar/demo-english-present-simple
```

Each activity can also define a lesson-specific return URL:

```ts
skoolReturnUrl: "https://www.skool.com/your-community/lesson-post"
```

The completion page uses that URL for `Return to Skool`; if omitted, it falls back to the generic Skool placeholder.

## Logo And Brand Assets

Place the official PU3NTE logo and future brand assets in `public/brand/` when available. The current UI uses the logo brief as the visual system reference and renders a text-based PU3NTE wordmark with a gradient `3`.
