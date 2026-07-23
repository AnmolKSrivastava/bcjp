/**
 * Google Cloud Text-to-Speech (server-side only).
 * Uses REST + API key — never expose GOOGLE_TTS_API_KEY to the Vite client.
 */

/**
 * Prefer language-specific Wavenet/Standard for Indic languages (reliable native speech).
 * Chirp3 as secondary. Tamil has no Neural2 voices.
 */
const VOICE_CANDIDATES = {
  en: [
    { languageCode: "en-IN", name: "en-IN-Wavenet-A" },
    { languageCode: "en-IN", name: "en-IN-Neural2-A" },
    { languageCode: "en-IN", name: "en-IN-Chirp3-HD-Aoede" }
  ],
  hi: [
    { languageCode: "hi-IN", name: "hi-IN-Wavenet-A" },
    { languageCode: "hi-IN", name: "hi-IN-Neural2-A" },
    { languageCode: "hi-IN", name: "hi-IN-Chirp3-HD-Aoede" }
  ],
  bn: [
    { languageCode: "bn-IN", name: "bn-IN-Wavenet-A" },
    { languageCode: "bn-IN", name: "bn-IN-Standard-A" },
    { languageCode: "bn-IN", name: "bn-IN-Chirp3-HD-Aoede" }
  ],
  mr: [
    { languageCode: "mr-IN", name: "mr-IN-Wavenet-A" },
    { languageCode: "mr-IN", name: "mr-IN-Standard-A" },
    { languageCode: "mr-IN", name: "mr-IN-Chirp3-HD-Aoede" }
  ],
  ta: [
    { languageCode: "ta-IN", name: "ta-IN-Wavenet-A" },
    { languageCode: "ta-IN", name: "ta-IN-Standard-A" },
    { languageCode: "ta-IN", name: "ta-IN-Chirp3-HD-Aoede" }
  ]
};

function clampSpeakingRate(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0.85;
  return Math.min(1.0, Math.max(0.6, n));
}

function prepareSpeechText(text) {
  return String(text || "")
    .trim()
    .replace(/\s+/g, " ");
}

function normalizeLanguage(language) {
  const raw = String(language || "en").trim().toLowerCase();
  // Guard: "bengali" contains "eng" — never treat that as English
  if (raw === "bn" || raw.startsWith("bn-") || raw.includes("beng") || raw.includes("bangla")) {
    return "bn";
  }
  if (VOICE_CANDIDATES[raw]) return raw;
  if (raw.startsWith("en") || raw === "english") return "en";
  if (raw.startsWith("hi") || raw.includes("hindi")) return "hi";
  if (raw.startsWith("mr") || raw.includes("marathi")) return "mr";
  if (raw.startsWith("ta") || raw.includes("tamil")) return "ta";
  return "en";
}

async function synthesizeWithVoice({ input, voice, speakingRate, apiKey }) {
  const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      input: { text: input },
      voice: {
        languageCode: voice.languageCode,
        name: voice.name
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate,
        pitch: 0,
        volumeGainDb: 0
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail =
      data?.error?.message ||
      data?.error?.status ||
      `Google TTS HTTP ${response.status}`;
    const err = new Error(detail);
    err.status = response.status;
    throw err;
  }

  if (!data.audioContent) {
    throw new Error("Google TTS returned empty audio.");
  }

  return Buffer.from(data.audioContent, "base64");
}

/**
 * @param {{ text: string, language?: string }} params
 * @returns {Promise<Buffer>} MP3 audio
 */
async function synthesizeSpeech({ text, language = "en" }) {
  const input = prepareSpeechText(text);
  if (!input) {
    throw new Error("Text is required for speech.");
  }
  if (input.length > 2000) {
    throw new Error("Text is too long for speech.");
  }

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GOOGLE_TTS_API_KEY is not configured. Add it to functions/.env"
    );
  }

  const lang = normalizeLanguage(language);
  const speakingRate = clampSpeakingRate(
    process.env.GOOGLE_TTS_SPEAKING_RATE ?? 0.85
  );
  const candidates = VOICE_CANDIDATES[lang] || VOICE_CANDIDATES.en;

  console.log(
    `[tts] lang=${lang} (from "${language}") voice=${candidates[0].name} text="${input.slice(0, 48)}"`
  );

  let lastError = null;
  for (const voice of candidates) {
    try {
      return await synthesizeWithVoice({
        input,
        voice,
        speakingRate,
        apiKey
      });
    } catch (err) {
      lastError = err;
      console.warn(
        `Google TTS voice failed (${lang} / ${voice.name}):`,
        err.message
      );
    }
  }

  throw lastError || new Error("Google TTS failed for all voice candidates.");
}

module.exports = {
  synthesizeSpeech,
  prepareSpeechText,
  normalizeLanguage,
  VOICE_CANDIDATES
};
