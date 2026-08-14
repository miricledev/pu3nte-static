import { getElevenLabsModelId, requireElevenLabsApiKey } from "./config";
import type { VoiceSettings } from "./types";

type TextToSpeechOptions = {
  text: string;
  voiceId: string;
  voiceSettings?: VoiceSettings;
  modelId?: string;
  previousText?: string;
  nextText?: string;
};

type TextToSpeechWithTimestampsResponse = {
  audioBase64: string;
  alignment?: CharacterAlignment;
  normalizedAlignment?: CharacterAlignment;
};

export type CharacterAlignment = {
  characters?: string[];
  chars?: string[];
  character_start_times_seconds?: number[];
  character_end_times_seconds?: number[];
  char_start_times_ms?: number[];
  char_end_times_ms?: number[];
};

export async function textToSpeechMp3({
  text,
  voiceId,
  voiceSettings,
  modelId = getElevenLabsModelId(),
  previousText,
  nextText,
}: TextToSpeechOptions): Promise<ArrayBuffer> {
  const apiKey = requireElevenLabsApiKey();
  const url = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`);
  url.searchParams.set("output_format", "mp3_44100_128");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "content-type": "application/json",
      accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      previous_text: previousText,
      next_text: nextText,
      voice_settings: voiceSettings
        ? {
            stability: voiceSettings.stability,
            similarity_boost: voiceSettings.similarityBoost,
            style: voiceSettings.style,
            use_speaker_boost: voiceSettings.useSpeakerBoost,
          }
        : undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`ElevenLabs TTS failed for voice ${voiceId}: ${response.status} ${response.statusText}\n${body}`);
  }

  return response.arrayBuffer();
}

export async function textToSpeechWithTimestampsMp3({
  text,
  voiceId,
  voiceSettings,
  modelId = getElevenLabsModelId(),
  previousText,
  nextText,
}: TextToSpeechOptions): Promise<TextToSpeechWithTimestampsResponse> {
  const apiKey = requireElevenLabsApiKey();
  const url = new URL(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps`);
  url.searchParams.set("output_format", "mp3_44100_128");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      previous_text: previousText,
      next_text: nextText,
      voice_settings: voiceSettings
        ? {
            stability: voiceSettings.stability,
            similarity_boost: voiceSettings.similarityBoost,
            style: voiceSettings.style,
            use_speaker_boost: voiceSettings.useSpeakerBoost,
          }
        : undefined,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`ElevenLabs TTS with timestamps failed for voice ${voiceId}: ${response.status} ${response.statusText}\n${body}`);
  }

  const payload = (await response.json()) as {
    audio_base64?: string;
    alignment?: CharacterAlignment;
    normalized_alignment?: CharacterAlignment;
  };

  if (!payload.audio_base64) {
    throw new Error(`ElevenLabs TTS with timestamps did not return audio_base64 for voice ${voiceId}.`);
  }

  return {
    audioBase64: payload.audio_base64,
    alignment: payload.alignment,
    normalizedAlignment: payload.normalized_alignment,
  };
}
