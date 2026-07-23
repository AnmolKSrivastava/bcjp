/**
 * Local OpenAI / Google TTS proxy for development.
 * Secrets live in functions/.env.local (gitignored) — never VITE_*.
 * Non-secret config can live in functions/.env (also gitignored).
 *
 * Run: npm --prefix functions run local
 * Vite proxies /api/* → http://localhost:8787
 */
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
  override: true
});
require("dotenv").config({
  path: path.join(__dirname, ".env.local"),
  override: true
});
const express = require("express");
const cors = require("cors");
const { parseVoiceProfileAnswers } = require("./parseProfile");
const { synthesizeSpeech } = require("./tts");

const app = express();
const port = Number(process.env.LOCAL_API_PORT) || 8787;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
    googleTtsConfigured: Boolean(process.env.GOOGLE_TTS_API_KEY)
  });
});

app.post("/api/voice-profile", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      res.status(500).json({
        error: "OPENAI_API_KEY missing. Add it to functions/.env.local"
      });
      return;
    }

    const { interviewLanguage, siteLanguage, answers } = req.body || {};
    const profile = await parseVoiceProfileAnswers({
      interviewLanguage,
      siteLanguage,
      answers
    });
    res.status(200).json({ profile });
  } catch (err) {
    console.error("Local voice-profile failed:", err);
    res.status(500).json({
      error: err.message || "Failed to parse voice profile."
    });
  }
});

app.post("/api/voice-tts", async (req, res) => {
  try {
    if (!process.env.GOOGLE_TTS_API_KEY) {
      res.status(500).json({
        error: "GOOGLE_TTS_API_KEY missing. Add it to functions/.env.local"
      });
      return;
    }

    const { text, language } = req.body || {};
    const audio = await synthesizeSpeech({ text, language });
    res.set({
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store"
    });
    res.status(200).send(audio);
  } catch (err) {
    console.error("Local voice-tts failed:", err);
    res.status(500).json({
      error: err.message || "Failed to synthesize speech."
    });
  }
});

app.listen(port, () => {
  console.log(`Voice profile local API on http://localhost:${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
  if (!process.env.OPENAI_API_KEY) {
    console.warn("WARNING: OPENAI_API_KEY is not set in functions/.env.local");
  }
  if (!process.env.GOOGLE_TTS_API_KEY) {
    console.warn("WARNING: GOOGLE_TTS_API_KEY is not set in functions/.env.local");
  }
});
