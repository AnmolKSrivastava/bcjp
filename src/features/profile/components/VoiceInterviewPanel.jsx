import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Volume2 } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import {
  INTERVIEW_LANGUAGES,
  LANGUAGE_PROMPT,
  PROFILE_QUESTIONS,
  getInterviewLanguage,
  getQuestionText
} from "../data/voiceInterview";
import { parseVoiceProfileAnswers } from "../services/voiceProfileService";
import { speakWithOpenAiTts, stopOpenAiSpeech, prefetchOpenAiTts, clearTtsCache } from "../services/voiceTtsService";

const ADVANCE_DELAY_MS = 1200;
const LISTEN_AFTER_TTS_MS = 700;
const RETRY_LISTEN_MS = 700;

const copy = {
  en: {
    listening: "Listening… speak now",
    heard: "Got it",
    movingOn: "Next question…",
    building: "Building your profile with AI…",
    speakLanguage: "Say your language clearly",
    speaking: "AI is speaking…",
    askAgain: "Didn't catch that — listening again…",
    voiceUnsupported: "Voice not supported. Use the buttons below.",
    voicePermission: "Allow microphone, then we continue automatically.",
    voiceError: "Couldn't hear you — listening again…",
    ttsError: "Could not play AI voice. Check the local API and try again.",
    parseError: "Could not build profile. Tap retry or fill the form.",
    retry: "Try again",
    backToChoice: "Back",
    tapFallback: "Or tap a language",
    statusReady: "Speak after the question",
    questionOf: (n, total) => `${n} / ${total}`,
    typeHint: "Typing is optional — only if voice fails"
  },
  hi: {
    listening: "सुन रहे हैं… अब बोलें",
    heard: "समझ गए",
    movingOn: "अगला सवाल…",
    building: "AI आपकी प्रोफाइल बना रहा है…",
    speakLanguage: "अपनी भाषा साफ़ बोलें",
    speaking: "AI बोल रहा है…",
    askAgain: "सुनाई नहीं दिया — फिर सुन रहे हैं…",
    voiceUnsupported: "आवाज़ उपलब्ध नहीं। नीचे बटन दबाएँ।",
    voicePermission: "माइक की अनुमति दें, फिर अपने आप चलेगा।",
    voiceError: "सुनाई नहीं दिया — फिर सुन रहे हैं…",
    ttsError: "AI आवाज़ नहीं चली। लोकल API जाँचें और फिर कोशिश करें।",
    parseError: "प्रोफाइल नहीं बनी। फिर कोशिश करें या फॉर्म भरें।",
    retry: "फिर कोशिश",
    backToChoice: "वापस",
    tapFallback: "या भाषा टैप करें",
    statusReady: "सवाल के बाद बोलें",
    questionOf: (n, total) => `${n} / ${total}`,
    typeHint: "टाइप वैकल्पिक है — सिर्फ आवाज़ न चले तो"
  }
};

async function speakText(text, langCode) {
  await speakWithOpenAiTts(text, langCode);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Match spoken/typed language choice.
 * IMPORTANT: do not use bare "eng" — it matches inside "bengali".
 */
function matchInterviewLanguage(transcript) {
  const t = String(transcript || "")
    .trim()
    .toLowerCase()
    .replace(/[।.!,?]/g, " ")
    .replace(/\s+/g, " ");

  if (!t) return null;

  // Exact / numbered choices first
  const numbered = {
    "1": "en",
    "2": "hi",
    "3": "bn",
    "4": "mr",
    "5": "ta",
    one: "en",
    two: "hi",
    three: "bn",
    four: "mr",
    five: "ta",
    first: "en",
    second: "hi",
    third: "bn",
    fourth: "mr",
    fifth: "ta"
  };
  if (numbered[t]) return numbered[t];

  // Longer / specific names before short English aliases
  const rules = [
    { code: "bn", needles: ["bengali", "bangla", "বাংলা", "बंगाली"] },
    { code: "mr", needles: ["marathi", "मराठी"] },
    { code: "ta", needles: ["tamil", "தமிழ்", "तमिल"] },
    { code: "hi", needles: ["hindi", "हिंदी", "हिन्दी"] },
    { code: "en", needles: ["english", "अंग्रेज़ी", "अंग्रेजी"] }
  ];

  for (const rule of rules) {
    for (const needle of rule.needles) {
      const n = needle.toLowerCase();
      if (t === n) return rule.code;
      // word-boundary style match (handles "I want Bengali")
      const re = new RegExp(`(?:^|\\s)${escapeRegExp(n)}(?:\\s|$)`, "i");
      if (re.test(t)) return rule.code;
      // native-script needles may not use spaces the same way
      if (/[^\u0000-\u007f]/.test(needle) && t.includes(n)) return rule.code;
    }
  }
  return null;
}

function isSkipAnswer(text) {
  return /^(skip|स्किप|স্কিপ|ஸ்கிப்|no|नहीं|না|नाही|இல்லை)$/i.test(
    String(text || "").trim()
  );
}

function VoiceInterviewPanel({ siteLang = "en", onComplete, onCancel }) {
  const ui = copy[siteLang] || copy.en;
  const [phase, setPhase] = useState("language"); // language | questions | parsing
  const [interviewLang, setInterviewLang] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [heard, setHeard] = useState("");
  const [status, setStatus] = useState(ui.statusReady);
  const [error, setError] = useState(null);
  const [showLangButtons, setShowLangButtons] = useState(false);

  const phaseRef = useRef(phase);
  const interviewLangRef = useRef(interviewLang);
  const questionIndexRef = useRef(questionIndex);
  const answersRef = useRef(answers);
  const advancingRef = useRef(false);
  const retryCountRef = useRef(0);
  const timersRef = useRef([]);

  const speechLang = interviewLang || (siteLang === "hi" ? "hi" : "en");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    interviewLangRef.current = interviewLang;
  }, [interviewLang]);
  useEffect(() => {
    questionIndexRef.current = questionIndex;
  }, [questionIndex]);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const later = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const stopSpeech = useCallback(() => {
    stopOpenAiSpeech();
  }, []);

  const finishInterview = useCallback(
    async (finalAnswers, langCode) => {
      setPhase("parsing");
      setStatus(ui.building);
      try {
        const profile = await parseVoiceProfileAnswers({
          interviewLanguage: langCode,
          siteLanguage: siteLang,
          answers: finalAnswers
        });
        onComplete?.(profile);
      } catch (err) {
        console.error("Voice profile parse failed:", err);
        setError(ui.parseError);
        setPhase("questions");
        setStatus(ui.statusReady);
        advancingRef.current = false;
      }
    },
    [onComplete, siteLang, ui.building, ui.parseError, ui.statusReady]
  );

  const commitAnswer = useCallback(
    async (rawAnswer) => {
      if (advancingRef.current) return;
      advancingRef.current = true;

      const langCode = interviewLangRef.current;
      const index = questionIndexRef.current;
      const question = PROFILE_QUESTIONS[index];
      if (!question || !langCode) {
        advancingRef.current = false;
        return;
      }

      const trimmed = String(rawAnswer || "").trim();
      const isLast = index >= PROFILE_QUESTIONS.length - 1;
      const skip = question.id === "extra" && (!trimmed || isSkipAnswer(trimmed));

      if (!trimmed && question.id !== "extra") {
        advancingRef.current = false;
        setStatus(ui.askAgain);
        retryCountRef.current += 1;
        later(() => startListeningRef.current?.(), RETRY_LISTEN_MS);
        return false;
      }

      const entry = {
        id: question.id,
        question: getQuestionText(question, langCode),
        answer: skip ? "" : trimmed
      };
      const nextAnswers = [...answersRef.current, entry];
      setAnswers(nextAnswers);
      setHeard(trimmed || (skip ? "skip" : ""));
      setStatus(isLast ? ui.building : ui.movingOn);
      setError(null);
      retryCountRef.current = 0;

      if (isLast) {
        await finishInterview(nextAnswers, langCode);
        return true;
      }

      later(() => {
        setHeard("");
        setCurrentQuestionAndSpeak(index + 1, langCode);
        advancingRef.current = false;
      }, ADVANCE_DELAY_MS);
      return true;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setCurrentQuestionAndSpeak defined below via ref pattern
    [finishInterview, later, ui.askAgain, ui.building, ui.movingOn]
  );

  const startListeningRef = useRef(null);
  const commitAnswerRef = useRef(commitAnswer);
  useEffect(() => {
    commitAnswerRef.current = commitAnswer;
  }, [commitAnswer]);

  const handleSpeechResult = useCallback(
    (text) => {
      const cleaned = String(text || "").trim();
      if (!cleaned || advancingRef.current) return;

      setHeard(cleaned);
      setError(null);

      if (phaseRef.current === "language") {
        const matched = matchInterviewLanguage(cleaned);
        if (!matched) {
          setStatus(ui.askAgain);
          later(() => startListeningRef.current?.(), RETRY_LISTEN_MS);
          return;
        }
        advancingRef.current = true;
        setStatus(ui.heard);
        later(() => {
          beginQuestions(matched);
        }, ADVANCE_DELAY_MS);
        return;
      }

      if (phaseRef.current === "questions") {
        setStatus(ui.heard);
        later(() => {
          commitAnswerRef.current?.(cleaned);
        }, ADVANCE_DELAY_MS);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [later, ui.askAgain, ui.heard]
  );

  const handleSpeechError = useCallback(
    (code) => {
      if (advancingRef.current || phaseRef.current === "parsing") return;

      if (code === "unsupported" || code === "start-failed") {
        setError(ui.voiceUnsupported);
        setShowLangButtons(true);
        setStatus(ui.tapFallback);
        return;
      }
      if (code === "not-allowed" || code === "service-not-allowed") {
        setError(ui.voicePermission);
        setShowLangButtons(true);
        return;
      }

      // Auto-retry listening on silence / transient errors
      setStatus(ui.askAgain);
      retryCountRef.current += 1;
      if (retryCountRef.current >= 3) {
        setShowLangButtons(phaseRef.current === "language");
        setError(ui.voiceError);
      }
      later(() => startListeningRef.current?.(), RETRY_LISTEN_MS);
    },
    [later, ui.askAgain, ui.tapFallback, ui.voiceError, ui.voicePermission, ui.voiceUnsupported]
  );

  const { supported, listening, interimTranscript, start, stop } = useSpeechRecognition({
    lang: speechLang,
    onResult: handleSpeechResult,
    onError: handleSpeechError
  });

  const startListeningSoon = useCallback(() => {
    later(() => {
      if (advancingRef.current || phaseRef.current === "parsing") return;
      setStatus(ui.listening);
      start();

      // Prefetch next question audio while the user answers (cuts delay)
      const langCode = interviewLangRef.current;
      const nextIndex = questionIndexRef.current + 1;
      if (langCode && nextIndex < PROFILE_QUESTIONS.length) {
        const nextQ = PROFILE_QUESTIONS[nextIndex];
        prefetchOpenAiTts(getQuestionText(nextQ, langCode), langCode);
      }
    }, LISTEN_AFTER_TTS_MS);
  }, [later, start, ui.listening]);

  useEffect(() => {
    startListeningRef.current = () => {
      if (advancingRef.current || phaseRef.current === "parsing") return;
      setStatus(ui.listening);
      start();
    };
  }, [start, ui.listening]);

  const setCurrentQuestionAndSpeak = useCallback(
    async (index, langCode) => {
      clearTimers();
      stop();
      stopSpeech();
      setQuestionIndex(index);
      questionIndexRef.current = index;
      setHeard("");
      setError(null);
      setStatus(ui.speaking);

      const question = PROFILE_QUESTIONS[index];
      if (!question) return;
      const text = getQuestionText(question, langCode);
      try {
        await speakText(text, langCode);
      } catch (err) {
        console.error("TTS failed:", err);
        setError(ui.ttsError);
        setStatus(ui.statusReady);
        return;
      }
      if (phaseRef.current !== "questions") return;
      startListeningSoon();
    },
    [clearTimers, startListeningSoon, stop, stopSpeech, ui.speaking, ui.statusReady, ui.ttsError]
  );

  const beginQuestions = useCallback(
    (langCode) => {
      clearTimers();
      stop();
      stopSpeech();
      clearTtsCache();
      setInterviewLang(langCode);
      interviewLangRef.current = langCode;
      setAnswers([]);
      answersRef.current = [];
      setQuestionIndex(0);
      questionIndexRef.current = 0;
      setHeard("");
      setError(null);
      setShowLangButtons(false);
      setPhase("questions");
      phaseRef.current = "questions";
      advancingRef.current = false;
      retryCountRef.current = 0;
      // Warm first question while we prepare to speak it
      const first = PROFILE_QUESTIONS[0];
      if (first) prefetchOpenAiTts(getQuestionText(first, langCode), langCode);
      later(() => {
        setCurrentQuestionAndSpeak(0, langCode);
      }, 80);
    },
    [clearTimers, later, setCurrentQuestionAndSpeak, stop, stopSpeech]
  );

  // Kick off language prompt automatically with OpenAI TTS
  useEffect(() => {
    let cancelled = false;
    async function boot() {
      clearTimers();
      stop();
      stopSpeech();
      clearTtsCache();
      advancingRef.current = false;
      retryCountRef.current = 0;
      setPhase("language");
      phaseRef.current = "language";
      setStatus(ui.speaking);
      const prompt = LANGUAGE_PROMPT[siteLang] || LANGUAGE_PROMPT.en;
      try {
        await speakText(prompt, siteLang === "hi" ? "hi" : "en");
      } catch (err) {
        console.error("TTS failed:", err);
        if (!cancelled) {
          setError(ui.ttsError);
          setShowLangButtons(true);
          setStatus(ui.tapFallback);
        }
        return;
      }
      if (cancelled) return;
      startListeningSoon();
    }
    boot();
    return () => {
      cancelled = true;
      clearTimers();
      stop();
      stopSpeech();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteLang]);

  const handleManualLanguage = (code) => {
    advancingRef.current = false;
    beginQuestions(code);
  };

  const handleRetry = () => {
    setError(null);
    retryCountRef.current = 0;
    advancingRef.current = false;
    if (phase === "language") {
      setStatus(ui.speaking);
      const prompt = LANGUAGE_PROMPT[siteLang] || LANGUAGE_PROMPT.en;
      speakText(prompt, siteLang === "hi" ? "hi" : "en")
        .then(() => startListeningSoon())
        .catch(() => {
          setError(ui.ttsError);
          setShowLangButtons(true);
        });
      return;
    }
    if (interviewLang != null) {
      setCurrentQuestionAndSpeak(questionIndex, interviewLang);
    }
  };

  const languagePrompt = LANGUAGE_PROMPT[siteLang] || LANGUAGE_PROMPT.en;
  const currentQuestion = PROFILE_QUESTIONS[questionIndex];
  const questionText =
    currentQuestion && interviewLang
      ? getQuestionText(currentQuestion, interviewLang)
      : languagePrompt;

  const displayHeard = heard || (listening ? interimTranscript : "");

  if (phase === "parsing") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <Loader2 className="h-9 w-9 animate-spin text-[#F97316]" />
        <p className="text-sm font-semibold text-[#0F172A]">{ui.building}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {phase === "questions" && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-bold text-[#F97316]">
            {ui.questionOf(questionIndex + 1, PROFILE_QUESTIONS.length)}
          </p>
          <span className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-0.5 text-[10px] font-semibold text-[#64748B]">
            {getInterviewLanguage(interviewLang)[siteLang === "hi" ? "hi" : "en"]}
          </span>
        </div>
      )}

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <div className="mb-2 flex items-center gap-2 text-[#2563EB]">
          <Volume2 className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-wide">
            {phase === "language" ? ui.speakLanguage : ui.statusReady}
          </span>
        </div>
        <p className="text-sm font-bold leading-relaxed text-[#0F172A] sm:text-base">
          {questionText}
        </p>
      </div>

      <div
        className={`rounded-2xl border-2 px-4 py-5 text-center transition-colors ${
          listening
            ? "border-[#F97316] bg-orange-50"
            : heard
              ? "border-green-200 bg-green-50"
              : "border-[#E2E8F0] bg-white"
        }`}
      >
        <div className="mb-2 flex items-center justify-center gap-2">
          {listening ? (
            <Mic className="h-5 w-5 animate-pulse text-[#F97316]" />
          ) : (
            <MicOff className="h-5 w-5 text-[#94A3B8]" />
          )}
          <p className="text-sm font-bold text-[#0F172A]">{status}</p>
        </div>
        {displayHeard ? (
          <p className="text-base font-semibold text-[#0F172A]">“{displayHeard}”</p>
        ) : (
          <p className="text-xs text-[#94A3B8]">{ui.typeHint}</p>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
      )}

      <div className="flex gap-2">
        {listening ? (
          <button
            type="button"
            onClick={() => {
              stop();
              setStatus(ui.askAgain);
              later(() => startListeningSoon(), 400);
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600"
          >
            <MicOff className="h-4 w-4" />
            {siteLang === "hi" ? "रोकें" : "Stop"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRetry}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#F97316] py-3 text-sm font-bold text-white hover:bg-orange-500"
          >
            <Mic className="h-4 w-4" />
            {ui.retry}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            clearTimers();
            stop();
            stopSpeech();
            onCancel?.();
          }}
          className="rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm font-semibold text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"
        >
          {ui.backToChoice}
        </button>
      </div>

      {(phase === "language" && (showLangButtons || !supported)) && (
        <div className="space-y-2 border-t border-[#E2E8F0] pt-3">
          <p className="text-xs font-semibold text-[#64748B]">{ui.tapFallback}</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {INTERVIEW_LANGUAGES.map((item, index) => (
              <button
                key={item.code}
                type="button"
                onClick={() => handleManualLanguage(item.code)}
                className="rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-left text-sm font-bold text-[#0F172A] hover:border-[#F97316]"
              >
                <span className="mr-2 text-[#F97316]">{index + 1}.</span>
                {siteLang === "hi" ? item.hi : item.en}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { VoiceInterviewPanel };
