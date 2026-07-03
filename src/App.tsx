import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { CompletionPage } from "./pages/CompletionPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { GrammarMasteryPage } from "./pages/GrammarMasteryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuizPage } from "./pages/QuizPage";
import { ReadingPage } from "./pages/ReadingPage";
import { SentenceBuilderPage } from "./pages/SentenceBuilderPage";
import { StoryPage } from "./pages/StoryPage";
import { VerbTrainerPage } from "./pages/VerbTrainerPage";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/flashcards/:deckId" element={<FlashcardsPage />} />
        <Route path="/grammar/:lessonId" element={<GrammarMasteryPage />} />
        <Route path="/sentence-builder/:lessonId" element={<SentenceBuilderPage />} />
        <Route path="/verbs/:setId" element={<VerbTrainerPage />} />
        <Route path="/stories/:storyId" element={<StoryPage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/reading/:readingId" element={<ReadingPage />} />
        <Route path="/complete/:activityId" element={<CompletionPage />} />
        <Route path="/" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
