import { useCallback, useRef, useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

function getAuthErrorMessage(code: string, lang: "hi" | "en"): string {
  const messages: Record<string, { en: string; hi: string }> = {
    "auth/invalid-phone-number": {
      en: "Please enter a valid 10-digit mobile number.",
      hi: "कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।",
    },
    "auth/too-many-requests": {
      en: "Too many attempts. Please try again later.",
      hi: "बहुत अधिक प्रयास। कृपया बाद में पुनः प्रयास करें।",
    },
    "auth/invalid-verification-code": {
      en: "Invalid OTP. Please check and try again.",
      hi: "गलत OTP। कृपया जाँच करें और पुनः प्रयास करें।",
    },
    "auth/code-expired": {
      en: "OTP has expired. Please request a new one.",
      hi: "OTP समाप्त हो गया है। कृपया नया OTP मँगवाएँ।",
    },
    "auth/captcha-check-failed": {
      en: "Verification failed. Please refresh and try again.",
      hi: "सत्यापन विफल। कृपया रिफ्रेश करें और पुनः प्रयास करें।",
    },
  };

  return messages[code]?.[lang] ?? (lang === "hi" ? "कुछ गलत हो गया। पुनः प्रयास करें।" : "Something went wrong. Please try again.");
}

export function formatIndianPhone(digits: string): string {
  const cleaned = digits.replace(/\D/g, "").slice(-10);
  return cleaned.length === 10 ? `+91${cleaned}` : "";
}

export function usePhoneAuth(lang: "hi" | "en") {
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearRecaptcha = useCallback(() => {
    if (recaptchaRef.current) {
      recaptchaRef.current.clear();
      recaptchaRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearRecaptcha();
    confirmationRef.current = null;
    setError(null);
    setLoading(false);
  }, [clearRecaptcha]);

  const setupRecaptcha = useCallback(
    async (containerId: string) => {
      clearRecaptcha();
      recaptchaRef.current = new RecaptchaVerifier(getFirebaseAuth(), containerId, {
        size: "invisible",
      });
      await recaptchaRef.current.render();
      return recaptchaRef.current;
    },
    [clearRecaptcha],
  );

  const sendOtp = useCallback(
    async (phoneNumber: string, containerId: string) => {
      setLoading(true);
      setError(null);
      try {
        const verifier = await setupRecaptcha(containerId);
        confirmationRef.current = await signInWithPhoneNumber(getFirebaseAuth(), phoneNumber, verifier);
      } catch (err: unknown) {
        clearRecaptcha();
        const code = (err as { code?: string })?.code ?? "";
        const message = getAuthErrorMessage(code, lang);
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [clearRecaptcha, lang, setupRecaptcha],
  );

  const verifyOtp = useCallback(
    async (code: string): Promise<User> => {
      if (!confirmationRef.current) {
        const message =
          lang === "hi"
            ? "पहले OTP भेजें।"
            : "Please send an OTP first.";
        setError(message);
        throw new Error(message);
      }

      setLoading(true);
      setError(null);
      try {
        const result = await confirmationRef.current.confirm(code);
        return result.user;
      } catch (err: unknown) {
        const errorCode = (err as { code?: string })?.code ?? "";
        const message = getAuthErrorMessage(errorCode, lang);
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [lang],
  );

  return {
    loading,
    error,
    setError,
    sendOtp,
    verifyOtp,
    reset,
    clearRecaptcha,
  };
}
