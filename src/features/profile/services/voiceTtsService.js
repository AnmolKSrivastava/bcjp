import { getFirebaseAuth } from "@/lib/firebase";

const DEFAULT_TTS_URL = "/api/voice-tts";
const cache = new Map();

let activeAudio = null;
let activeObjectUrl = null;
let activePlayToken = 0;

function cacheKey(text, language) {
  return `${language}::${String(text || "").trim()}`;
}

function stopOpenAiSpeech() {
  activePlayToken += 1;
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.src = "";
    } catch {
      // ignore
    }
    activeAudio = null;
  }
  // Don't revoke cached object URLs — only revoke one-off play URLs that aren't cached
  if (activeObjectUrl && ![...cache.values()].includes(activeObjectUrl)) {
    URL.revokeObjectURL(activeObjectUrl);
  }
  activeObjectUrl = null;
}

async function getAuthHeaders(idToken) {
  let token = idToken;
  if (!token) {
    const user = getFirebaseAuth().currentUser;
    if (user) token = await user.getIdToken();
  }
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Fetch (and cache) TTS audio. Prefetch during listening to cut delay on the next question.
 */
async function fetchTtsObjectUrl(text, language = "en", idToken) {
  const key = cacheKey(text, language);
  if (cache.has(key)) return cache.get(key);

  const url = import.meta.env.VITE_VOICE_TTS_API_URL || DEFAULT_TTS_URL;
  const headers = await getAuthHeaders(idToken);

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ text, language })
  });

  if (!response.ok) {
    let message = "Could not play AI voice.";
    try {
      const data = await response.json();
      if (data?.error) message = data.error;
    } catch {
      // non-JSON
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  cache.set(key, objectUrl);
  return objectUrl;
}

function prefetchOpenAiTts(text, language = "en") {
  if (!text) return;
  fetchTtsObjectUrl(text, language).catch(() => {
    // prefetch is best-effort
  });
}

/**
 * Speak interview text with OpenAI TTS (server-side key).
 * Uses cache when available so the next question starts with less delay.
 */
async function speakWithOpenAiTts(text, language = "en", idToken) {
  stopOpenAiSpeech();
  const playToken = activePlayToken;

  const objectUrl = await fetchTtsObjectUrl(text, language, idToken);
  if (playToken !== activePlayToken) return;

  activeObjectUrl = objectUrl;
  const audio = new Audio(objectUrl);
  // Speed is controlled by Google TTS speakingRate on the server
  audio.playbackRate = 1;
  activeAudio = audio;

  await new Promise((resolve, reject) => {
    audio.onended = () => {
      if (playToken === activePlayToken) {
        activeAudio = null;
      }
      resolve();
    };
    audio.onerror = () => {
      if (playToken === activePlayToken) {
        activeAudio = null;
      }
      reject(new Error("Audio playback failed."));
    };
    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch((err) => {
        if (playToken === activePlayToken) {
          activeAudio = null;
        }
        reject(err);
      });
    }
  });
}

function clearTtsCache() {
  stopOpenAiSpeech();
  for (const url of cache.values()) {
    URL.revokeObjectURL(url);
  }
  cache.clear();
}

export { speakWithOpenAiTts, stopOpenAiSpeech, prefetchOpenAiTts, clearTtsCache };
