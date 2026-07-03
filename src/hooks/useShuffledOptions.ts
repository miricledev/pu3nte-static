import { useMemo } from "react";
import { shuffleArray } from "../utils/study";

export function useShuffledOptions(options: string[] = [], shuffleKey: string) {
  return useMemo(() => shuffleArray(options), [shuffleKey, options.join("|")]);
}
