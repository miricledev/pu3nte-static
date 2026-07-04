import { getElevenLabsModelId, requireElevenLabsApiKey } from "./config";
import type { VoiceSettings } from "./types";

type TextToSpeechOptions = {
  text: string;
  voiceId: string;
  voiceSettings?: VoiceSettings;
  modelId?: string;
};

export async function textToSpeechMp3({
  text,
  voiceId,
  voiceSettings,
  modelId = getElevenLabsModelId(),
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
