const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { parseVoiceProfileAnswers } = require("./parseProfile");
const { synthesizeSpeech } = require("./tts");

initializeApp();

const openaiApiKey = defineSecret("OPENAI_API_KEY");
const googleTtsApiKey = defineSecret("GOOGLE_TTS_API_KEY");

async function verifyBearer(req) {
  const header = req.get("Authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    const err = new Error("Missing Authorization bearer token.");
    err.status = 401;
    throw err;
  }
  try {
    return await getAuth().verifyIdToken(match[1]);
  } catch {
    const err = new Error("Invalid or expired auth token.");
    err.status = 401;
    throw err;
  }
}

/**
 * Parse interview answers with OpenAI (Hosting rewrite → /api/voice-profile).
 */
exports.parseVoiceProfileHttp = onRequest(
  {
    region: "asia-south1",
    secrets: [openaiApiKey],
    cors: true,
    timeoutSeconds: 60,
    memory: "256MiB"
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      process.env.OPENAI_API_KEY = openaiApiKey.value();
      await verifyBearer(req);

      const { interviewLanguage, siteLanguage, answers } = req.body || {};
      const profile = await parseVoiceProfileAnswers({
        interviewLanguage,
        siteLanguage,
        answers
      });
      res.status(200).json({ profile });
    } catch (err) {
      console.error("parseVoiceProfileHttp failed:", err);
      const status = err.status || 500;
      res.status(status).json({
        error: err.message || "Failed to parse voice profile."
      });
    }
  }
);

/**
 * Google Cloud Text-to-Speech for interview questions (Hosting rewrite → /api/voice-tts).
 */
exports.synthesizeVoiceTtsHttp = onRequest(
  {
    region: "asia-south1",
    secrets: [googleTtsApiKey],
    cors: true,
    timeoutSeconds: 60,
    memory: "256MiB"
  },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    try {
      process.env.GOOGLE_TTS_API_KEY = googleTtsApiKey.value();
      await verifyBearer(req);

      const { text, language } = req.body || {};
      const audio = await synthesizeSpeech({ text, language });
      res.set({
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      });
      res.status(200).send(audio);
    } catch (err) {
      console.error("synthesizeVoiceTtsHttp failed:", err);
      const status = err.status || 500;
      res.status(status).json({
        error: err.message || "Failed to synthesize speech."
      });
    }
  }
);
