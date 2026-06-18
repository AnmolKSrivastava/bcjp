import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Mic,
  MicOff,
  Loader2,
  Sparkles,
  MapPin,
  Briefcase,
  IndianRupee,
  Phone,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/lib/ui/dialog";
import {
  getMockProfile,
  mockVoiceTranscripts,
  MOCK_RECORDING_MS
} from "../data/mockProfile";
const t = {
  en: {
    title: "Create Your Profile",
    subtitle: "Speak naturally — AI will build your resume from your voice.",
    tapToSpeak: "Tap to start speaking",
    listening: "Listening...",
    processing: "AI is building your profile...",
    transcriptLabel: "What we heard",
    continue: "Continue",
    previewTitle: "Your AI Resume",
    previewSubtitle: "Review your profile before saving.",
    experience: "Experience",
    location: "Location",
    salary: "Expected Salary",
    availability: "Availability",
    skills: "Skills",
    languages: "Languages",
    aiBadge: "Generated from your voice",
    createProfile: "Create Profile",
    saving: "Creating profile...",
    successTitle: "Profile Created!",
    successSubtitle: "You're ready to apply for jobs.",
    profileId: "Profile ID",
    matchingJobs: "matching jobs found for you",
    browseJobs: "Browse Jobs",
    done: "Done",
    stepSpeak: "Speak",
    stepReview: "Review",
    stepDone: "Done"
  },
  hi: {
    title: "अपनी प्रोफाइल बनाएं",
    subtitle: "स्वाभाविक रूप से बोलें — AI आपकी आवाज़ से रेज़्यूमे बनाएगा।",
    tapToSpeak: "बोलना शुरू करने के लिए टैप करें",
    listening: "सुन रहे हैं...",
    processing: "AI आपकी प्रोफाइल बना रहा है...",
    transcriptLabel: "हमने यह सुना",
    continue: "आगे बढ़ें",
    previewTitle: "आपका AI रेज़्यूमे",
    previewSubtitle: "सेव करने से पहले अपनी प्रोफाइल देखें।",
    experience: "अनुभव",
    location: "स्थान",
    salary: "अपेक्षित वेतन",
    availability: "उपलब्धता",
    skills: "कौशल",
    languages: "भाषाएँ",
    aiBadge: "आपकी आवाज़ से बनाया गया",
    createProfile: "प्रोफाइल बनाएं",
    saving: "प्रोफाइल बन रही है...",
    successTitle: "प्रोफाइल बन गई!",
    successSubtitle: "अब आप नौकरियों के लिए आवेदन कर सकते हैं।",
    profileId: "प्रोफाइल ID",
    matchingJobs: "नौकरियाँ आपके लिए मिलीं",
    browseJobs: "नौकरी देखें",
    done: "हो गया",
    stepSpeak: "बोलें",
    stepReview: "देखें",
    stepDone: "पूर्ण"
  }
};
const steps = ["voice", "preview", "success"];
function CreateProfileModal({ open, onOpenChange, lang, onComplete }) {
  const txt = t[lang];
  const [step, setStep] = useState("voice");
  const [voiceState, setVoiceState] = useState("idle");
  const [saving, setSaving] = useState(false);
  const profile = getMockProfile(lang);
  useEffect(() => {
    if (!open) {
      setStep("voice");
      setVoiceState("idle");
      setSaving(false);
    }
  }, [open]);
  useEffect(() => {
    if (voiceState !== "listening") return;
    const timer = setTimeout(() => {
      setVoiceState("processing");
      setTimeout(() => setVoiceState("done"), 1200);
    }, MOCK_RECORDING_MS);
    return () => clearTimeout(timer);
  }, [voiceState]);
  useEffect(() => {
    if (step !== "success" || !open) return;
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#2563EB", "#F97316", "#22C55E"]
    });
  }, [step, open]);
  const handleStartSpeaking = () => {
    if (voiceState === "listening" || voiceState === "processing") return;
    setVoiceState("listening");
  };
  const handleContinueToPreview = () => {
    setStep("preview");
  };
  const handleCreateProfile = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    setStep("success");
    onComplete?.(profile);
  };
  const handleBrowseJobs = () => {
    onOpenChange(false);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
  };
  const stepIndex = steps.indexOf(step);
  const stepLabels = [txt.stepSpeak, txt.stepReview, txt.stepDone];
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-lg">
        <DialogHeader className="text-center px-8 sm:px-6">
          <div className="mx-auto mb-1 hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
            <Mic className="h-7 w-7 text-[#F97316]" />
          </div>
          <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
            {step === "voice" && txt.title}
            {step === "preview" && txt.previewTitle}
            {step === "success" && txt.successTitle}
          </DialogTitle>
          <DialogDescription className="text-[#64748B] line-clamp-2 sm:line-clamp-none">
            {step === "voice" && txt.subtitle}
            {step === "preview" && txt.previewSubtitle}
            {step === "success" && txt.successSubtitle}
          </DialogDescription>
        </DialogHeader>

        {
    /* Step indicator — compact on mobile */
  }
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {stepLabels.map((label, i) => <div key={label} className="flex items-center gap-1 sm:gap-2">
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <div
    className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold transition-colors ${i <= stepIndex ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}
  >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className="hidden sm:block text-[10px] font-semibold text-[#64748B]">
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && <div
    className={`h-0.5 w-3 sm:w-8 shrink-0 transition-colors ${i < stepIndex ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`}
  />}
            </div>)}
        </div>

        <AnimatePresence mode="wait">
          {step === "voice" && <motion.div
    key="voice"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    className="space-y-2.5 sm:space-y-5"
  >
              <div className="flex flex-col items-center py-1 sm:py-4">
                <button
    type="button"
    onClick={handleStartSpeaking}
    disabled={voiceState === "processing"}
    className="relative flex h-16 w-16 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-lg sm:shadow-xl shadow-blue-200 transition-transform hover:scale-105 disabled:opacity-80"
  >
                  {voiceState === "listening" && <>
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#2563EB] opacity-30" />
                      <span className="absolute inset-2 animate-pulse rounded-full bg-[#2563EB] opacity-20" />
                    </>}
                  {voiceState === "processing" ? <Loader2 className="h-7 w-7 sm:h-10 sm:w-10 animate-spin" /> : voiceState === "listening" ? <MicOff className="h-7 w-7 sm:h-10 sm:w-10" /> : <Mic className="h-7 w-7 sm:h-10 sm:w-10" />}
                </button>
                <p className="mt-2 sm:mt-4 text-xs sm:text-sm font-semibold text-[#64748B] text-center">
                  {voiceState === "idle" && txt.tapToSpeak}
                  {voiceState === "listening" && txt.listening}
                  {voiceState === "processing" && txt.processing}
                  {voiceState === "done" && txt.transcriptLabel}
                </p>
              </div>

              {voiceState === "done" && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    className="rounded-lg sm:rounded-2xl border border-blue-100 sm:border-2 bg-blue-50 p-2.5 sm:p-4 max-h-24 sm:max-h-none overflow-y-auto"
  >
                  <p className="text-xs sm:text-sm leading-relaxed text-[#0F172A] italic line-clamp-4 sm:line-clamp-none">
                    "{mockVoiceTranscripts[lang]}"
                  </p>
                </motion.div>}

              {voiceState === "done" && <button
    type="button"
    onClick={handleContinueToPreview}
    className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-blue-700"
  >
                  {txt.continue}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>}
            </motion.div>}

          {step === "preview" && <motion.div
    key="preview"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    className="space-y-2.5 sm:space-y-4"
  >
              <div className="rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 bg-[#F8FAFC] p-3 sm:p-5">
                <div className="mb-2 sm:mb-4 flex items-start gap-2.5 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-[#2563EB] text-base sm:text-xl font-bold text-white">
                    {profile.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-xl font-bold text-[#0F172A] break-words">{profile.name}</h3>
                    <span className="mt-0.5 sm:mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs sm:text-sm font-semibold text-[#2563EB]">
                      {profile.role}
                    </span>
                    <div className="mt-1 hidden sm:flex items-center gap-1 text-xs font-semibold text-[#F97316]">
                      <Sparkles className="h-3.5 w-3.5" />
                      {txt.aiBadge}
                    </div>
                  </div>
                </div>

                <div className="mb-2 sm:mb-4 grid grid-cols-2 gap-2 sm:gap-3">
                  {[
    { icon: Briefcase, label: txt.experience, value: profile.experience },
    { icon: MapPin, label: txt.location, value: profile.location },
    { icon: IndianRupee, label: txt.salary, value: profile.expectedSalary },
    { icon: Phone, label: txt.availability, value: profile.availability }
  ].map(({ icon: Icon, label, value }) => <div key={label} className="rounded-lg sm:rounded-xl bg-white p-2 sm:p-3 min-w-0">
                      <div className="mb-0.5 flex items-center gap-1 text-[10px] sm:text-xs text-[#64748B]">
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                        <span className="truncate">{label}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F172A] break-words leading-tight">{value}</p>
                    </div>)}
                </div>

                <div className="mb-2 sm:mb-3">
                  <p className="mb-1 sm:mb-2 text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.skills}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {profile.skills.map((skill) => <span
    key={skill}
    className="rounded-full bg-green-50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-green-700"
  >
                        {skill}
                      </span>)}
                  </div>
                </div>

                <div className="hidden sm:block">
                  <p className="mb-2 text-xs font-semibold text-[#64748B]">{txt.languages}</p>
                  <p className="text-sm font-semibold text-[#0F172A]">
                    {profile.languages.join(" \xB7 ")}
                  </p>
                </div>
              </div>

              <button
    type="button"
    onClick={handleCreateProfile}
    disabled={saving}
    className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#F97316] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-orange-500 disabled:opacity-70"
  >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {saving ? txt.saving : txt.createProfile}
              </button>
            </motion.div>}

          {step === "success" && <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-2.5 sm:space-y-5 text-center"
  >
              <div className="mx-auto flex h-12 w-12 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-8 w-8 sm:h-12 sm:w-12 text-[#22C55E]" />
              </div>

              <div className="rounded-lg sm:rounded-2xl border border-green-100 sm:border-2 bg-green-50 p-3 sm:p-4">
                <p className="text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.profileId}</p>
                <p className="text-lg sm:text-2xl font-bold text-[#0F172A]">{profile.id}</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-[#22C55E]">
                  {profile.matchingJobs}+ {txt.matchingJobs}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
    type="button"
    onClick={handleBrowseJobs}
    className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-xs sm:text-base font-bold text-white hover:bg-blue-700"
  >
                  {txt.browseJobs}
                </button>
                <button
    type="button"
    onClick={() => onOpenChange(false)}
    className="flex flex-1 items-center justify-center rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 py-2.5 sm:py-4 text-xs sm:text-base font-bold text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]"
  >
                  {txt.done}
                </button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </DialogContent>
    </Dialog>;
}
export {
  CreateProfileModal
};
