import { useCallback, useEffect, useRef, useState } from "react";

const SPEECH_LOCALES = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  mr: "mr-IN",
  ta: "ta-IN"
};

function getSpeechRecognitionConstructor() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/**
 * Browser speech-to-text for Hindi / English (Chrome, Edge, Android Chrome).
 * No API key required. Falls back gracefully when unsupported (e.g. some iOS Safari builds).
 */
function useSpeechRecognition({ lang = "en", onResult, onError } = {}) {
  const Recognition = getSpeechRecognitionConstructor();
  const supported = Boolean(Recognition);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const stop = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      setListening(false);
      return;
    }
    try {
      recognition.stop();
    } catch {
      // already stopped
    }
    setListening(false);
  }, []);

  const start = useCallback(() => {
    setError(null);
    setInterimTranscript("");

    if (!Recognition) {
      const message = "unsupported";
      setError(message);
      onErrorRef.current?.(message);
      return false;
    }

    // Stop any previous session before starting a new one
    try {
      recognitionRef.current?.stop();
    } catch {
      // ignore
    }

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = SPEECH_LOCALES[lang] ?? SPEECH_LOCALES.en;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let interim = "";
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalText += text;
        } else {
          interim += text;
        }
      }
      if (interim) setInterimTranscript(interim.trim());
      if (finalText.trim()) {
        const cleaned = finalText.trim();
        setTranscript(cleaned);
        setInterimTranscript("");
        onResultRef.current?.(cleaned);
      }
    };

    recognition.onerror = (event) => {
      const code = event.error || "unknown";
      // "aborted" / "no-speech" are common and not hard failures for UX
      if (code !== "aborted") {
        setError(code);
        onErrorRef.current?.(code);
      }
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      setInterimTranscript("");
    };

    try {
      recognition.start();
      return true;
    } catch (err) {
      console.error("Speech recognition failed to start:", err);
      setError("start-failed");
      onErrorRef.current?.("start-failed");
      setListening(false);
      return false;
    }
  }, [Recognition, lang]);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, []);

  // If language changes while listening, restart with the new locale
  useEffect(() => {
    if (!listening) return;
    stop();
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps -- only react to lang changes

  return {
    supported,
    listening,
    transcript,
    interimTranscript,
    error,
    start,
    stop
  };
}

export { useSpeechRecognition, SPEECH_LOCALES, getSpeechRecognitionConstructor };
