import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  User,
  Loader2,
  MapPin,
  Briefcase,
  IndianRupee,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Mic,
  Keyboard
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/lib/ui/dialog";
import { Input } from "@/lib/ui/input";
import { Label } from "@/lib/ui/label";
import { useAuth } from "@/features/auth";
import {
  TaxonomySelects,
  displayIndustryLabel,
  displayRoleLabel,
  labelOf,
  resolveTaxonomy
} from "@/features/taxonomy";
import { saveCandidateProfile, candidateToForm } from "../services/candidateService";
import { VoiceInterviewPanel } from "./VoiceInterviewPanel";

const EXPERIENCE_OPTIONS = [
  { en: "Less than 1 year", hi: "1 साल से कम" },
  { en: "1–3 years", hi: "1–3 साल" },
  { en: "3–5 years", hi: "3–5 साल" },
  { en: "5–10 years", hi: "5–10 साल" },
  { en: "10+ years", hi: "10+ साल" }
];

const AVAILABILITY_OPTIONS = [
  { en: "Immediate", hi: "तुरंत" },
  { en: "Within 1 week", hi: "1 सप्ताह में" },
  { en: "Within 1 month", hi: "1 महीने में" }
];

const LANGUAGE_OPTIONS = [
  { en: "Hindi", hi: "हिंदी" },
  { en: "English", hi: "अंग्रेज़ी" },
  { en: "Bengali", hi: "बंगाली" },
  { en: "Tamil", hi: "तमिल" },
  { en: "Marathi", hi: "मराठी" },
  { en: "Telugu", hi: "तेलुगु" },
  { en: "Gujarati", hi: "गुजराती" },
  { en: "Punjabi", hi: "पंजाबी" }
];

const EMPTY_FORM = {
  fullName: "",
  industryId: "",
  departmentId: "",
  roleId: "",
  yearsOfExperience: "",
  preferredWorkLocation: "",
  expectedSalary: "",
  availability: "",
  skills: "",
  languages: [],
  resumeFile: null
};

const t = {
  en: {
    title: "Create Your Profile",
    editTitle: "Edit Your Profile",
    subtitle: "Fill in your details to start applying for jobs.",
    editSubtitle: "Update your details and save changes.",
    previewTitle: "Review Your Profile",
    previewSubtitle: "Check everything before saving.",
    successTitle: "Profile Created!",
    editSuccessTitle: "Profile Updated!",
    successSubtitle: "You're ready to apply for jobs.",
    editSuccessSubtitle: "Your changes have been saved.",
    fullName: "Full Name",
    fullNamePlaceholder: "e.g. Rajesh Kumar",
    industry: "Industry",
    industryPlaceholder: "Select industry",
    department: "Department",
    departmentPlaceholder: "Select department",
    role: "Job Role",
    rolePlaceholder: "Select job role",
    experience: "Experience",
    experiencePlaceholder: "Select experience",
    location: "Preferred Work Location",
    locationPlaceholder: "e.g. Pune, Mumbai",
    salary: "Expected Salary",
    salaryPlaceholder: "e.g. ₹18,000 – ₹25,000/month",
    availability: "When can you start?",
    availabilityPlaceholder: "Select availability",
    skills: "Skills",
    skillsPlaceholder: "e.g. House Wiring, Panel Installation",
    skillsHint: "Separate skills with commas",
    languages: "Languages you speak",
    resume: "Resume (optional)",
    resumeHint: "PDF or image, max 5 MB",
    resumeKeep: "Current resume will be kept unless you upload a new file.",
    continue: "Continue",
    back: "Back",
    createProfile: "Save Profile",
    saveChanges: "Save Changes",
    saving: "Saving profile...",
    profileId: "Profile ID",
    browseJobs: "Browse Jobs",
    done: "Done",
    stepForm: "Details",
    stepReview: "Review",
    stepDone: "Done",
    loginRequired: "Please log in first to create your profile.",
    workerOnly: "Profile creation is for job seekers only.",
    required: "Please fill all required fields.",
    saveError: "Could not save profile. Please try again.",
    chooseTitle: "How do you want to create your profile?",
    chooseSubtitle: "Speak with AI in your language, or fill the form yourself.",
    chooseVoice: "Speak with AI",
    chooseVoiceHint: "Answer a few questions by voice",
    chooseForm: "Fill form",
    chooseFormHint: "Type your details manually",
    voiceFilled: "We filled your form from the interview. Please review and edit if needed."
  },
  hi: {
    title: "अपनी प्रोफाइल बनाएं",
    editTitle: "प्रोफाइल संपादित करें",
    subtitle: "नौकरियों के लिए आवेदन शुरू करने के लिए अपनी जानकारी भरें।",
    editSubtitle: "अपनी जानकारी अपडेट करें और सेव करें।",
    previewTitle: "अपनी प्रोफाइल देखें",
    previewSubtitle: "सेव करने से पहले सब कुछ जाँच लें।",
    successTitle: "प्रोफाइल बन गई!",
    editSuccessTitle: "प्रोफाइल अपडेट हो गई!",
    successSubtitle: "अब आप नौकरियों के लिए आवेदन कर सकते हैं।",
    editSuccessSubtitle: "आपके बदलाव सेव हो गए हैं।",
    fullName: "पूरा नाम",
    fullNamePlaceholder: "जैसे राजेश कुमार",
    industry: "उद्योग",
    industryPlaceholder: "उद्योग चुनें",
    department: "विभाग",
    departmentPlaceholder: "विभाग चुनें",
    role: "नौकरी की भूमिका",
    rolePlaceholder: "भूमिका चुनें",
    experience: "अनुभव",
    experiencePlaceholder: "अनुभव चुनें",
    location: "काम की पसंदीदा जगह",
    locationPlaceholder: "जैसे पुणे, मुंबई",
    salary: "अपेक्षित वेतन",
    salaryPlaceholder: "जैसे ₹18,000 – ₹25,000/माह",
    availability: "कब शुरू कर सकते हैं?",
    availabilityPlaceholder: "उपलब्धता चुनें",
    skills: "कौशल",
    skillsPlaceholder: "जैसे हाउस वायरिंग, पैनल इंस्टॉलेशन",
    skillsHint: "कौशल को अलग करने के लिए कॉमा लगाएँ",
    languages: "आपकी भाषाएँ",
    resume: "रेज़्यूमे (वैकल्पिक)",
    resumeHint: "PDF या फ़ोटो, अधिकतम 5 MB",
    resumeKeep: "नया फ़ाइल अपलोड न करें तो मौजूदा रेज़्यूमे बना रहेगा।",
    continue: "आगे बढ़ें",
    back: "वापस",
    createProfile: "प्रोफाइल सेव करें",
    saveChanges: "बदलाव सेव करें",
    saving: "प्रोफाइल सेव हो रही है...",
    profileId: "प्रोफाइल ID",
    browseJobs: "नौकरी देखें",
    done: "हो गया",
    stepForm: "विवरण",
    stepReview: "जाँच",
    stepDone: "पूर्ण",
    loginRequired: "प्रोफाइल बनाने के लिए पहले लॉगिन करें।",
    workerOnly: "प्रोफाइल बनाना नौकरी खोजने वालों के लिए है।",
    required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    saveError: "प्रोफाइल सेव नहीं हो सकी। कृपया पुनः प्रयास करें।",
    chooseTitle: "प्रोफाइल कैसे बनाना चाहते हैं?",
    chooseSubtitle: "AI से अपनी भाषा में बोलें, या खुद फॉर्म भरें।",
    chooseVoice: "AI से बोलें",
    chooseVoiceHint: "कुछ सवालों के जवाब आवाज़ में दें",
    chooseForm: "फॉर्म भरें",
    chooseFormHint: "जानकारी खुद टाइप करें",
    voiceFilled: "इंटरव्यू से फॉर्म भर दिया गया है। जाँचें और ज़रूरत हो तो बदलें।"
  }
};

function labelFor(options, value, lang) {
  return options.find((o) => o.en === value)?.[lang] ?? value;
}

function CreateProfileModal({ open, onOpenChange, lang, onComplete }) {
  const txt = t[lang];
  const { user, profile, candidateProfile, refreshProfile, refreshCandidateProfile } = useAuth();
  const isEdit = Boolean(candidateProfile && profile?.onboardingComplete);
  const [step, setStep] = useState("choose");
  const [form, setForm] = useState(EMPTY_FORM);
  const [savedProfile, setSavedProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [voiceBanner, setVoiceBanner] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("choose");
      setForm(EMPTY_FORM);
      setSavedProfile(null);
      setSaving(false);
      setError(null);
      setVoiceBanner(false);
      return;
    }

    if (candidateProfile && profile?.onboardingComplete) {
      const prefill = candidateToForm(candidateProfile);
      setForm(prefill || EMPTY_FORM);
      setStep("form");
      setVoiceBanner(false);
      setSavedProfile(null);
      setError(null);
      return;
    }

    setStep("choose");
    setForm(EMPTY_FORM);
    setSavedProfile(null);
    setError(null);
    setVoiceBanner(false);
  }, [open, candidateProfile, profile?.onboardingComplete]);

  useEffect(() => {
    if (step !== "success" || !open) return;
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#2563EB", "#F97316", "#22C55E"]
    });
  }, [step, open]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleLanguage = (langEn) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(langEn)
        ? prev.languages.filter((l) => l !== langEn)
        : [...prev.languages, langEn]
    }));
    setError(null);
  };

  const handleVoiceComplete = (parsed) => {
    setForm((prev) => ({
      ...prev,
      fullName: parsed.fullName || "",
      industryId: parsed.industryId || "",
      departmentId: parsed.departmentId || "",
      roleId: parsed.roleId || "",
      yearsOfExperience: parsed.yearsOfExperience || "",
      preferredWorkLocation: parsed.preferredWorkLocation || "",
      expectedSalary: parsed.expectedSalary || "",
      availability: parsed.availability || "",
      skills: parsed.skills || "",
      languages: Array.isArray(parsed.languages) ? parsed.languages : [],
      resumeFile: null
    }));
    setVoiceBanner(true);
    setError(null);
    setStep("form");
  };

  const isFormValid = () =>
    form.fullName.trim() &&
    form.industryId &&
    form.departmentId &&
    form.roleId &&
    form.yearsOfExperience &&
    form.preferredWorkLocation.trim() &&
    form.expectedSalary.trim() &&
    form.availability &&
    form.skills.trim() &&
    form.languages.length > 0;

  const handleContinueToPreview = () => {
    if (!isFormValid()) {
      setError(txt.required);
      return;
    }
    setStep("preview");
  };

  const handleSaveProfile = async () => {
    if (!user) {
      setError(txt.loginRequired);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const saved = await saveCandidateProfile(user.uid, form, user.phoneNumber);
      await refreshProfile();
      await refreshCandidateProfile();
      setSavedProfile(saved);
      setStep("success");
      onComplete?.(saved);
    } catch (err) {
      console.error("Save profile failed:", err);
      setError(txt.saveError);
    } finally {
      setSaving(false);
    }
  };

  const handleBrowseJobs = () => {
    onOpenChange(false);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  const previewSkills = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const profileId = savedProfile?.id
    ? `BG-${savedProfile.id.slice(0, 6).toUpperCase()}`
    : "";

  const progressSteps = ["form", "preview", "success"];
  const progressIndex = Math.max(0, progressSteps.indexOf(step === "voice" || step === "choose" ? "form" : step));
  const stepLabels = [txt.stepForm, txt.stepReview, txt.stepDone];

  const selectClass =
    "flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-[#E2E8F0] sm:border-2 bg-white px-3 text-sm sm:text-base text-[#0F172A] focus:border-[#2563EB] focus:outline-none";

  if (open && user && profile?.role === "employer") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-[#0F172A]">{txt.workerOnly}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  const headerTitle =
    step === "choose"
      ? txt.chooseTitle
      : step === "voice"
        ? txt.chooseVoice
        : step === "form"
          ? isEdit
            ? txt.editTitle
            : txt.title
          : step === "preview"
            ? txt.previewTitle
            : isEdit
              ? txt.editSuccessTitle
              : txt.successTitle;

  const headerSubtitle =
    step === "choose"
      ? txt.chooseSubtitle
      : step === "voice"
        ? txt.chooseVoiceHint
        : step === "form"
          ? isEdit
            ? txt.editSubtitle
            : txt.subtitle
          : step === "preview"
            ? txt.previewSubtitle
            : isEdit
              ? txt.editSuccessSubtitle
              : txt.successSubtitle;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center px-4 sm:px-6">
          <div className="mx-auto mb-1 hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <User className="h-7 w-7 text-[#2563EB]" />
          </div>
          <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
            {headerTitle}
          </DialogTitle>
          <DialogDescription className="text-[#64748B]">
            {headerSubtitle}
          </DialogDescription>
        </DialogHeader>

        {step !== "choose" && step !== "voice" && (
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <div
                    className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold transition-colors ${i <= progressIndex ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}
                  >
                    {i < progressIndex ? "✓" : i + 1}
                  </div>
                  <span className="hidden sm:block text-[10px] font-semibold text-[#64748B]">{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`h-0.5 w-3 sm:w-8 shrink-0 transition-colors ${i < progressIndex ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`} />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3"
            >
              <button
                type="button"
                onClick={() => setStep("voice")}
                className="flex w-full items-start gap-3 rounded-2xl border-2 border-[#F97316] bg-orange-50 p-4 text-left hover:bg-orange-100 transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F97316] text-white">
                  <Mic className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#0F172A]">{txt.chooseVoice}</p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">{txt.chooseVoiceHint}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setVoiceBanner(false);
                  setStep("form");
                }}
                className="flex w-full items-start gap-3 rounded-2xl border-2 border-[#E2E8F0] bg-white p-4 text-left hover:border-[#2563EB] transition-colors"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                  <Keyboard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-[#0F172A]">{txt.chooseForm}</p>
                  <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">{txt.chooseFormHint}</p>
                </div>
              </button>
            </motion.div>
          )}

          {step === "voice" && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <VoiceInterviewPanel
                siteLang={lang}
                onComplete={handleVoiceComplete}
                onCancel={() => setStep("choose")}
              />
            </motion.div>
          )}

          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3 sm:space-y-4"
            >
              {voiceBanner && (
                <p className="rounded-xl bg-green-50 border border-green-100 px-3 py-2 text-xs sm:text-sm font-semibold text-green-700">
                  {txt.voiceFilled}
                </p>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.fullName} *
                </Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder={txt.fullNamePlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <TaxonomySelects
                form={form}
                lang={lang}
                labels={{
                  industry: txt.industry,
                  industryPlaceholder: txt.industryPlaceholder,
                  department: txt.department,
                  departmentPlaceholder: txt.departmentPlaceholder,
                  role: txt.role,
                  rolePlaceholder: txt.rolePlaceholder
                }}
                onChange={(next) => {
                  setForm((prev) => ({ ...prev, ...next }));
                  setError(null);
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="experience" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.experience} *
                  </Label>
                  <select
                    id="experience"
                    value={form.yearsOfExperience}
                    onChange={(e) => updateField("yearsOfExperience", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">{txt.experiencePlaceholder}</option>
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <option key={o.en} value={o.en}>{o[lang]}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="availability" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.availability} *
                  </Label>
                  <select
                    id="availability"
                    value={form.availability}
                    onChange={(e) => updateField("availability", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">{txt.availabilityPlaceholder}</option>
                    {AVAILABILITY_OPTIONS.map((o) => (
                      <option key={o.en} value={o.en}>{o[lang]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.location} *
                </Label>
                <Input
                  id="location"
                  value={form.preferredWorkLocation}
                  onChange={(e) => updateField("preferredWorkLocation", e.target.value)}
                  placeholder={txt.locationPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="salary" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.salary} *
                </Label>
                <Input
                  id="salary"
                  value={form.expectedSalary}
                  onChange={(e) => updateField("expectedSalary", e.target.value)}
                  placeholder={txt.salaryPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="skills" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.skills} *
                </Label>
                <Input
                  id="skills"
                  value={form.skills}
                  onChange={(e) => updateField("skills", e.target.value)}
                  placeholder={txt.skillsPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
                <p className="text-[10px] sm:text-xs text-[#64748B]">{txt.skillsHint}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-[#0F172A]">{txt.languages} *</Label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_OPTIONS.map((o) => {
                    const active = form.languages.includes(o.en);
                    return (
                      <button
                        key={o.en}
                        type="button"
                        onClick={() => toggleLanguage(o.en)}
                        className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${active ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] hover:border-[#2563EB]"}`}
                      >
                        {o[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resume" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.resume}
                </Label>
                <label
                  htmlFor="resume"
                  className="flex cursor-pointer items-center gap-2 rounded-lg sm:rounded-xl border border-dashed border-[#E2E8F0] sm:border-2 px-3 py-3 text-sm text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                >
                  <Upload className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {form.resumeFile ? form.resumeFile.name : txt.resumeHint}
                  </span>
                </label>
                <input
                  id="resume"
                  type="file"
                  accept="application/pdf,image/*"
                  className="sr-only"
                  onChange={(e) => updateField("resumeFile", e.target.files?.[0] ?? null)}
                />
                {isEdit && candidateProfile?.resumeUrl && !form.resumeFile && (
                  <p className="text-[10px] sm:text-xs text-[#64748B]">{txt.resumeKeep}</p>
                )}
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <button
                type="button"
                onClick={handleContinueToPreview}
                className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-blue-700"
              >
                {txt.continue}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-2.5 sm:space-y-4"
            >
              <div className="rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 bg-[#F8FAFC] p-3 sm:p-5">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-[#2563EB] text-base sm:text-xl font-bold text-white">
                    {form.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-xl font-bold text-[#0F172A] break-words">{form.fullName}</h3>
                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs sm:text-sm font-semibold text-[#2563EB]">
                      {displayRoleLabel(form, lang)}
                    </span>
                    <p className="mt-1 text-[10px] sm:text-xs text-[#64748B]">
                      {displayIndustryLabel(form, lang)}
                      {resolveTaxonomy(form)
                        ? ` · ${labelOf(resolveTaxonomy(form).department, lang)}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { icon: Briefcase, label: txt.experience, value: labelFor(EXPERIENCE_OPTIONS, form.yearsOfExperience, lang) },
                    { icon: MapPin, label: txt.location, value: form.preferredWorkLocation },
                    { icon: IndianRupee, label: txt.salary, value: form.expectedSalary },
                    { icon: Clock, label: txt.availability, value: labelFor(AVAILABILITY_OPTIONS, form.availability, lang) }
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="rounded-lg sm:rounded-xl bg-white p-2 sm:p-3 min-w-0">
                      <div className="mb-0.5 flex items-center gap-1 text-[10px] sm:text-xs text-[#64748B]">
                        <Icon className="h-3 w-3 shrink-0" />
                        <span className="truncate">{label}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#0F172A] break-words leading-tight">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <p className="mb-1.5 text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.skills}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {previewSkills.map((skill) => (
                      <span key={skill} className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-green-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.languages}</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {form.languages.map((l) => labelFor(LANGUAGE_OPTIONS, l, lang)).join(" · ")}
                  </p>
                </div>
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 py-2.5 sm:py-4 text-sm font-bold text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {txt.back}
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#F97316] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-orange-500 disabled:opacity-70"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  {saving ? txt.saving : isEdit ? txt.saveChanges : txt.createProfile}
                </button>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
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
                <p className="text-lg sm:text-2xl font-bold text-[#0F172A]">{profileId}</p>
                {savedProfile?.profileCompletionPercent != null && (
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-[#22C55E]">
                    {savedProfile.profileCompletionPercent}% {lang === "hi" ? "प्रोफाइल पूर्ण" : "profile complete"}
                  </p>
                )}
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
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export { CreateProfileModal };
