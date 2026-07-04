type SpeakTextOptions = {
  lang: string;
  rate?: number;
  onDone?: () => void;
  fallbackDelayMs?: number;
};

let voicesReady: Promise<SpeechSynthesisVoice[]> | undefined;

export function canUseSpeech() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function stopSpeech() {
  if (!canUseSpeech()) return;
  window.speechSynthesis.cancel();
}

export function primeSpeech() {
  if (!canUseSpeech()) return false;
  window.speechSynthesis.getVoices();
  window.speechSynthesis.resume();
  return true;
}

function loadVoices() {
  if (!canUseSpeech()) return Promise.resolve([]);
  if (voicesReady) return voicesReady;

  voicesReady = new Promise((resolve) => {
    const existingVoices = window.speechSynthesis.getVoices();
    if (existingVoices.length) {
      resolve(existingVoices);
      return;
    }

    const timeout = window.setTimeout(() => resolve(window.speechSynthesis.getVoices()), 800);
    window.speechSynthesis.onvoiceschanged = () => {
      window.clearTimeout(timeout);
      resolve(window.speechSynthesis.getVoices());
    };
  });

  return voicesReady;
}

function findVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const baseLang = lang.split("-")[0];
  return voices.find((voice) => voice.lang === lang) ?? voices.find((voice) => voice.lang.startsWith(baseLang)) ?? null;
}

export function speakText(text: string, options: SpeakTextOptions) {
  if (!canUseSpeech()) {
    if (options.onDone) {
      const fallbackTimer = window.setTimeout(options.onDone, options.fallbackDelayMs ?? 0);
      return () => window.clearTimeout(fallbackTimer);
    }
    return undefined;
  }

  let fallbackTimer: number | undefined;
  let cancelled = false;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    options.onDone?.();
  };

  window.speechSynthesis.cancel();
  window.speechSynthesis.resume();

  void loadVoices().then((voices) => {
    if (cancelled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang;
    utterance.rate = options.rate ?? 0.85;
    utterance.voice = findVoice(voices, options.lang);
    utterance.onend = finish;
    utterance.onerror = finish;

    window.setTimeout(() => {
      if (cancelled) return;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);
    }, 60);
  });

  if (options.onDone) {
    fallbackTimer = window.setTimeout(finish, options.fallbackDelayMs ?? Math.max(3500, text.length * 120));
  }

  return () => {
    cancelled = true;
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    stopSpeech();
  };
}
