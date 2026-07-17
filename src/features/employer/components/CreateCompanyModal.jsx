import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Building2,
  Loader2,
  MapPin,
  User,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
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
import { Textarea } from "@/lib/ui/textarea";
import { useAuth } from "@/features/auth";
import { saveOrganizationProfile } from "../services/organizationService";

const INDUSTRIES = [
  { en: "Manufacturing", hi: "विनिर्माण" },
  { en: "Construction", hi: "निर्माण" },
  { en: "Logistics & Delivery", hi: "लॉजिस्टिक्स और डिलीवरी" },
  { en: "Retail", hi: "खुदरा" },
  { en: "Healthcare", hi: "स्वास्थ्य सेवा" },
  { en: "Hospitality", hi: "होटल और रेस्तरां" },
  { en: "Security Services", hi: "सुरक्षा सेवाएँ" },
  { en: "Facility Management", hi: "फैसिलिटी प्रबंधन" },
  { en: "Staffing Agency", hi: "स्टाफिंग एजेंसी" },
  { en: "Other", hi: "अन्य" }
];

const EMPTY_FORM = {
  companyName: "",
  industry: "",
  city: "",
  contactPersonName: "",
  description: ""
};

const t = {
  en: {
    title: "Setup Your Company",
    subtitle: "Tell us about your business so you can start hiring.",
    previewTitle: "Review Company Details",
    previewSubtitle: "Check everything before saving.",
    successTitle: "Company Registered!",
    successSubtitle: "You're ready to post jobs and hire workers.",
    companyName: "Company Name",
    companyNamePlaceholder: "e.g. PowerFix Solutions",
    industry: "Industry",
    industryPlaceholder: "Select industry",
    city: "City",
    cityPlaceholder: "e.g. Pune, Mumbai",
    contactPerson: "Contact Person",
    contactPersonPlaceholder: "e.g. Amit Sharma",
    description: "About the company (optional)",
    descriptionPlaceholder: "Brief description of your business...",
    continue: "Continue",
    back: "Back",
    save: "Save Company Profile",
    saving: "Saving...",
    companyId: "Company ID",
    done: "Done",
    stepForm: "Details",
    stepReview: "Review",
    stepDone: "Done",
    loginRequired: "Please log in first.",
    employerOnly: "Company setup is for employers only.",
    required: "Please fill all required fields.",
    saveError: "Could not save company profile. Please try again."
  },
  hi: {
    title: "अपनी कंपनी सेटअप करें",
    subtitle: "भर्ती शुरू करने के लिए अपने व्यवसाय के बारे में बताएं।",
    previewTitle: "कंपनी विवरण देखें",
    previewSubtitle: "सेव करने से पहले सब कुछ जाँच लें।",
    successTitle: "कंपनी पंजीकृत!",
    successSubtitle: "अब आप नौकरियाँ पोस्ट कर और कर्मचारी हायर कर सकते हैं।",
    companyName: "कंपनी का नाम",
    companyNamePlaceholder: "जैसे PowerFix Solutions",
    industry: "उद्योग",
    industryPlaceholder: "उद्योग चुनें",
    city: "शहर",
    cityPlaceholder: "जैसे पुणे, मुंबई",
    contactPerson: "संपर्क व्यक्ति",
    contactPersonPlaceholder: "जैसे अमित शर्मा",
    description: "कंपनी के बारे में (वैकल्पिक)",
    descriptionPlaceholder: "अपने व्यवसाय का संक्षिप्त विवरण...",
    continue: "आगे बढ़ें",
    back: "वापस",
    save: "कंपनी प्रोफाइल सेव करें",
    saving: "सेव हो रहा है...",
    companyId: "कंपनी ID",
    done: "हो गया",
    stepForm: "विवरण",
    stepReview: "जाँच",
    stepDone: "पूर्ण",
    loginRequired: "कृपया पहले लॉगिन करें।",
    employerOnly: "कंपनी सेटअप केवल नियोक्ताओं के लिए है।",
    required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    saveError: "कंपनी प्रोफाइल सेव नहीं हो सकी। कृपया पुनः प्रयास करें।"
  }
};

const steps = ["form", "preview", "success"];

function labelFor(options, value, lang) {
  return options.find((o) => o.en === value)?.[lang] ?? value;
}

function CreateCompanyModal({ open, onOpenChange, lang, onComplete }) {
  const txt = t[lang];
  const { user, profile, refreshProfile, refreshOrganization } = useAuth();
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(EMPTY_FORM);
  const [savedOrg, setSavedOrg] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm(EMPTY_FORM);
      setSavedOrg(null);
      setSaving(false);
      setError(null);
    }
  }, [open]);

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

  const isFormValid = () =>
    form.companyName.trim() &&
    form.industry &&
    form.city.trim() &&
    form.contactPersonName.trim();

  const handleContinue = () => {
    if (!isFormValid()) {
      setError(txt.required);
      return;
    }
    setStep("preview");
  };

  const handleSave = async () => {
    if (!user) {
      setError(txt.loginRequired);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const org = await saveOrganizationProfile(user.uid, form, user.phoneNumber);
      await refreshProfile();
      await refreshOrganization();
      setSavedOrg(org);
      setStep("success");
      onComplete?.(org);
    } catch (err) {
      console.error("Save company failed:", err);
      setError(txt.saveError);
    } finally {
      setSaving(false);
    }
  };

  const stepIndex = steps.indexOf(step);
  const stepLabels = [txt.stepForm, txt.stepReview, txt.stepDone];
  const selectClass =
    "flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-[#E2E8F0] sm:border-2 bg-white px-3 text-sm sm:text-base text-[#0F172A] focus:border-[#2563EB] focus:outline-none";

  const companyId = savedOrg?.id
    ? `ORG-${savedOrg.id.slice(0, 6).toUpperCase()}`
    : "";

  if (open && user && profile?.role !== "employer") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-[#0F172A]">{txt.employerOnly}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#E2E8F0] sm:rounded-3xl sm:p-8 sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center px-4 sm:px-6">
          <div className="mx-auto mb-1 hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50">
            <Building2 className="h-7 w-7 text-[#F97316]" />
          </div>
          <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
            {step === "form" && txt.title}
            {step === "preview" && txt.previewTitle}
            {step === "success" && txt.successTitle}
          </DialogTitle>
          <DialogDescription className="text-[#64748B]">
            {step === "form" && txt.subtitle}
            {step === "preview" && txt.previewSubtitle}
            {step === "success" && txt.successSubtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-1 sm:gap-2">
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <div
                  className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold transition-colors ${i <= stepIndex ? "bg-[#F97316] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className="hidden sm:block text-[10px] font-semibold text-[#64748B]">{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`h-0.5 w-3 sm:w-8 shrink-0 transition-colors ${i < stepIndex ? "bg-[#F97316]" : "bg-[#E2E8F0]"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="space-y-1.5">
                <Label htmlFor="companyName" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.companyName} *
                </Label>
                <Input
                  id="companyName"
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder={txt.companyNamePlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="industry" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.industry} *
                </Label>
                <select
                  id="industry"
                  value={form.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{txt.industryPlaceholder}</option>
                  {INDUSTRIES.map((o) => (
                    <option key={o.en} value={o.en}>{o[lang]}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.city} *
                </Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder={txt.cityPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contactPerson" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.contactPerson} *
                </Label>
                <Input
                  id="contactPerson"
                  value={form.contactPersonName}
                  onChange={(e) => updateField("contactPersonName", e.target.value)}
                  placeholder={txt.contactPersonPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.description}
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder={txt.descriptionPlaceholder}
                  rows={3}
                  className="rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base resize-none"
                />
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <button
                type="button"
                onClick={handleContinue}
                className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#F97316] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-orange-500"
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
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-[#F97316] text-base sm:text-xl font-bold text-white">
                    {form.companyName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-xl font-bold text-[#0F172A] break-words">{form.companyName}</h3>
                    <span className="mt-1 inline-block rounded-full bg-orange-100 px-2 py-0.5 text-xs sm:text-sm font-semibold text-[#F97316]">
                      {labelFor(INDUSTRIES, form.industry, lang)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: txt.city, value: form.city },
                    { icon: User, label: txt.contactPerson, value: form.contactPersonName },
                    { icon: Briefcase, label: txt.industry, value: labelFor(INDUSTRIES, form.industry, lang) }
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

                {form.description.trim() && (
                  <div className="mt-3 rounded-lg bg-white p-2 sm:p-3">
                    <p className="mb-1 text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.description}</p>
                    <p className="text-xs sm:text-sm text-[#0F172A]">{form.description}</p>
                  </div>
                )}
              </div>

              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs sm:text-sm text-red-600">{error}</p>}

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 py-2.5 sm:py-4 text-sm font-bold text-[#0F172A] hover:border-[#F97316] hover:text-[#F97316]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {txt.back}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-70"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  {saving ? txt.saving : txt.save}
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
                <p className="text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.companyId}</p>
                <p className="text-lg sm:text-2xl font-bold text-[#0F172A]">{companyId}</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-[#0F172A]">{savedOrg?.name}</p>
              </div>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex w-full items-center justify-center rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-xs sm:text-base font-bold text-white hover:bg-blue-700"
              >
                {txt.done}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export { CreateCompanyModal };
