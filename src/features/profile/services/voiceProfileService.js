import { getFirebaseAuth } from "@/lib/firebase";

const DEFAULT_API_URL = "/api/voice-profile";

/**
 * Sends interview Q&A to the server-side OpenAI proxy.
 * The OpenAI key never leaves the backend (functions/.env or Secret Manager).
 */
async function parseVoiceProfileAnswers({ interviewLanguage, siteLanguage, answers, idToken }) {
  const url = import.meta.env.VITE_VOICE_PROFILE_API_URL || DEFAULT_API_URL;

  let token = idToken;
  if (!token) {
    const user = getFirebaseAuth().currentUser;
    if (user) {
      token = await user.getIdToken();
    }
  }

  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      interviewLanguage,
      siteLanguage,
      answers
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Could not build profile from your answers.");
  }
  if (!data.profile) {
    throw new Error("Server returned an empty profile.");
  }
  return data.profile;
}

export { parseVoiceProfileAnswers };
