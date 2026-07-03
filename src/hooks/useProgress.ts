import { useEffect, useMemo, useState } from "react";
import { getProgress, importProgress, resetProgress, saveProgress } from "../utils/progress";
import type { ProgressRecord } from "../types";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressRecord>(() => getProgress());

  useEffect(() => {
    const refresh = () => setProgress(getProgress());
    window.addEventListener("storage", refresh);
    window.addEventListener("pu3nte-progress", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("pu3nte-progress", refresh);
    };
  }, []);

  return useMemo(
    () => ({
      progress,
      save: (next: ProgressRecord) => setProgress(saveProgress(next)),
      reset: () => setProgress(resetProgress()),
      importJson: (json: string) => setProgress(importProgress(json)),
    }),
    [progress],
  );
}
