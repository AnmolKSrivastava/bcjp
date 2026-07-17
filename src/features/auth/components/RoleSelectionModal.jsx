import { useState, useEffect } from "react";
import { HardHat, Building2, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/lib/ui/dialog";
import { useAuth } from "../context/AuthContext";
import { USER_ROLES } from "@/utils/constants";
const t = {
  en: {
    title: "Welcome to Bharat Gig!",
    subtitle: "Tell us who you are so we can set up your account.",
    workerTitle: "I'm looking for work",
    workerDesc: "Create a profile and apply for jobs near you.",
    employerTitle: "I want to hire",
    employerDesc: "Post jobs and find skilled workers fast.",
    continue: "Continue",
    saving: "Setting up your account...",
    error: "Something went wrong. Please try again."
  },
  hi: {
    title: "Bharat Gig में आपका स्वागत है!",
    subtitle: "बताएं आप कौन हैं ताकि हम आपका खाता तैयार कर सकें।",
    workerTitle: "मुझे काम चाहिए",
    workerDesc: "प्रोफाइल बनाएं और अपने पास की नौकरियों के लिए आवेदन करें।",
    employerTitle: "मुझे कर्मचारी चाहिए",
    employerDesc: "नौकरी पोस्ट करें और कुशल कर्मचारी जल्दी पाएं।",
    continue: "आगे बढ़ें",
    saving: "आपका खाता तैयार हो रहा है...",
    error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।"
  }
};
const roleOptions = [
  {
    role: USER_ROLES.WORKER,
    icon: HardHat,
    titleKey: "workerTitle",
    descKey: "workerDesc",
    accent: "#2563EB",
    bg: "bg-blue-50"
  },
  {
    role: USER_ROLES.EMPLOYER,
    icon: Building2,
    titleKey: "employerTitle",
    descKey: "employerDesc",
    accent: "#F97316",
    bg: "bg-orange-50"
  }
];
function RoleSelectionModal({ open, lang, onComplete }) {
  const txt = t[lang];
  const { completeOnboarding } = useAuth();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (open) {
      setSelected(null);
      setError(null);
      setSaving(false);
    }
  }, [open]);
  
  const handleContinue = async () => {
    if (!selected || saving) return;
    setSaving(true);
    setError(null);
    try {
      console.log("Creating user profile with role:", selected);
      const profile = await completeOnboarding({ role: selected, language: lang });
      console.log("Profile created successfully:", profile);
      onComplete?.(profile);
    } catch (err) {
      console.error("Onboarding failed:", err);
      setError(txt.error);
      setSaving(false);
    }
  };
  return <Dialog open={open}>
      <DialogContent
    className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-md [&>button]:hidden"
    onInteractOutside={(e) => e.preventDefault()}
    onEscapeKeyDown={(e) => e.preventDefault()}
  >
        <div className="space-y-4 sm:space-y-5">
          <DialogHeader className="text-center px-8 sm:px-6">
            <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
              {txt.title}
            </DialogTitle>
            <DialogDescription className="text-[#64748B]">
              {txt.subtitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2.5 sm:space-y-3">
          {roleOptions.map(({ role, icon: Icon, titleKey, descKey, accent, bg }) => {
    const isActive = selected === role;
    return <motion.button
    key={role}
    type="button"
    whileTap={{ scale: 0.98 }}
    onClick={() => {
      setSelected(role);
      setError(null);
    }}
    className={`relative flex w-full items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 p-3 sm:p-4 text-left transition-colors ${isActive ? "bg-white" : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"}`}
    style={isActive ? { borderColor: accent } : void 0}
  >
                <div className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl ${bg}`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: accent }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-bold text-[#0F172A]">{txt[titleKey]}</p>
                  <p className="text-xs sm:text-sm text-[#64748B]">{txt[descKey]}</p>
                </div>
                {isActive && <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: accent }} />}
              </motion.button>;
  })}
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

          <button
    type="button"
    onClick={handleContinue}
    disabled={!selected || saving}
    className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-[#E2E8F0] disabled:text-[#94A3B8]"
  >
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {saving ? txt.saving : txt.continue}
          </button>
        </div>
      </DialogContent>
    </Dialog>;
}
export {
  RoleSelectionModal
};
