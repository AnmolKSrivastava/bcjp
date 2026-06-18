import { useEffect, useId, useState } from "react";
import { Phone, ArrowLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/lib/ui/dialog";
import { Input } from "@/lib/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/lib/ui/input-otp";
import { isFirebaseConfigured } from "@/lib/firebase";
import { formatIndianPhone, usePhoneAuth } from "../hooks/usePhoneAuth";
const t = {
  en: {
    title: "Login to KaamSetu",
    subtitle: "Enter your mobile number to receive a one-time password.",
    phoneLabel: "Mobile number",
    phonePlaceholder: "10-digit mobile number",
    sendOtp: "Send OTP",
    verifyOtp: "Verify & Login",
    otpTitle: "Enter OTP",
    otpSubtitle: "We sent a 6-digit code to",
    changeNumber: "Change number",
    resend: "Resend OTP",
    configError: "Firebase is not configured. Add your credentials to .env",
    invalidPhone: "Please enter a valid 10-digit mobile number.",
    invalidOtp: "Please enter the 6-digit OTP."
  },
  hi: {
    title: "KaamSetu में लॉगिन करें",
    subtitle: "OTP पाने के लिए अपना मोबाइल नंबर दर्ज करें।",
    phoneLabel: "मोबाइल नंबर",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर",
    sendOtp: "OTP भेजें",
    verifyOtp: "सत्यापित करें और लॉगिन करें",
    otpTitle: "OTP दर्ज करें",
    otpSubtitle: "हमने 6 अंकों का कोड भेजा है",
    changeNumber: "नंबर बदलें",
    resend: "OTP दोबारा भेजें",
    configError: "Firebase कॉन्फ़िगर नहीं है। .env में credentials जोड़ें",
    invalidPhone: "कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें।",
    invalidOtp: "कृपया 6 अंकों का OTP दर्ज करें।"
  }
};
function LoginModal({ open, onOpenChange, lang, onSuccess }) {
  const txt = t[lang];
  const recaptchaId = useId().replace(/:/g, "");
  const [step, setStep] = useState("phone");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [otp, setOtp] = useState("");
  const { loading, error, setError, sendOtp, verifyOtp, reset } = usePhoneAuth(lang);
  useEffect(() => {
    if (!open) {
      setStep("phone");
      setPhoneDigits("");
      setOtp("");
      reset();
    }
  }, [open, reset]);
  const handlePhoneChange = (value) => {
    setPhoneDigits(value.replace(/\D/g, "").slice(0, 10));
    setError(null);
  };
  const handleSendOtp = async () => {
    const phone = formatIndianPhone(phoneDigits);
    if (!phone) {
      setError(txt.invalidPhone);
      return;
    }
    if (!isFirebaseConfigured) {
      setError(txt.configError);
      return;
    }
    try {
      await sendOtp(phone, recaptchaId);
      setStep("otp");
      setOtp("");
    } catch {
    }
  };
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError(txt.invalidOtp);
      return;
    }
    try {
      const user = await verifyOtp(otp);
      onSuccess?.(user);
      onOpenChange(false);
    } catch {
    }
  };
  const handleBack = () => {
    setStep("phone");
    setOtp("");
    reset();
  };
  const handleResend = async () => {
    setOtp("");
    await handleSendOtp();
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-md">
        <DialogHeader className="text-center px-8 sm:px-6">
          <div className="mx-auto mb-1 hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Phone className="h-7 w-7 text-[#2563EB]" />
          </div>
          <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
            {step === "phone" ? txt.title : txt.otpTitle}
          </DialogTitle>
          <DialogDescription className="text-[#64748B] line-clamp-2 sm:line-clamp-none">
            {step === "phone" ? txt.subtitle : <>
                {txt.otpSubtitle}{" "}
                <span className="font-semibold text-[#0F172A]">
                  +91 {phoneDigits}
                </span>
              </>}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "phone" ? <motion.div
    key="phone"
    initial={{ opacity: 0, x: -12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 12 }}
    className="space-y-2.5 sm:space-y-4"
  >
              <div className="space-y-1.5 sm:space-y-2">
                <label htmlFor="phone" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.phoneLabel}
                </label>
                <div className="flex overflow-hidden rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 focus-within:border-[#2563EB]">
                  <span className="flex items-center bg-[#F8FAFC] px-2.5 sm:px-4 text-xs sm:text-sm font-semibold text-[#64748B] shrink-0">
                    +91
                  </span>
                  <Input
    id="phone"
    type="tel"
    inputMode="numeric"
    autoComplete="tel-national"
    placeholder={txt.phonePlaceholder}
    value={phoneDigits}
    onChange={(e) => handlePhoneChange(e.target.value)}
    className="h-9 sm:h-12 min-w-0 rounded-none border-0 text-sm sm:text-base focus-visible:ring-0"
  />
                </div>
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <button
    type="button"
    onClick={handleSendOtp}
    disabled={loading || phoneDigits.length !== 10}
    className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
  >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {txt.sendOtp}
              </button>
            </motion.div> : <motion.div
    key="otp"
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -12 }}
    className="space-y-2.5 sm:space-y-4"
  >
              <div className="flex justify-center w-full px-0.5">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-0.5 sm:gap-1.5">
                    {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot
    key={i}
    index={i}
    className="h-8 w-7 sm:h-12 sm:w-11 rounded-md sm:rounded-xl border text-sm sm:text-lg"
  />)}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <button
    type="button"
    onClick={handleVerifyOtp}
    disabled={loading || otp.length !== 6}
    className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#F97316] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
  >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {txt.verifyOtp}
              </button>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
                <button
    type="button"
    onClick={handleBack}
    className="flex items-center justify-center sm:justify-start gap-1 font-semibold text-[#64748B] hover:text-[#2563EB]"
  >
                  <ArrowLeft className="h-4 w-4" />
                  {txt.changeNumber}
                </button>
                <button
    type="button"
    onClick={handleResend}
    disabled={loading}
    className="font-semibold text-[#2563EB] hover:underline disabled:opacity-50 text-center sm:text-right"
  >
                  {txt.resend}
                </button>
              </div>
            </motion.div>}
        </AnimatePresence>

        <div id={recaptchaId} className="hidden" aria-hidden="true" />
      </DialogContent>
    </Dialog>;
}
export {
  LoginModal
};
