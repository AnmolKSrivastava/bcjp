import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Briefcase,
  Loader2,
  MapPin,
  IndianRupee,
  Users,
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
import {
  TaxonomySelects,
  displayIndustryLabel,
  displayRoleLabel,
  labelOf,
  resolveTaxonomy
} from "@/features/taxonomy";
import { createJobOpening, updateJobOpening, jobToForm } from "../services/jobService";
import { fetchOrganization } from "../services/organizationService";

const EMPLOYMENT_TYPES = [
  { en: "Full Time", hi: "पूर्णकालिक" },
  { en: "Part Time", hi: "अंशकालिक" },
  { en: "Contract", hi: "कॉन्ट्रैक्ट" },
  { en: "Daily Wage", hi: "दैनिक मजदूरी" }
];

const EXPERIENCE_OPTIONS = [
  { en: "Any / Fresher", hi: "कोई भी / फ्रेशर" },
  { en: "Less than 1 year", hi: "1 साल से कम" },
  { en: "1–3 years", hi: "1–3 साल" },
  { en: "3–5 years", hi: "3–5 साल" },
  { en: "5+ years", hi: "5+ साल" }
];

const EMPTY_FORM = {
  industryId: "",
  departmentId: "",
  roleId: "",
  employmentType: "",
  location: "",
  salaryMin: "",
  salaryMax: "",
  openings: "1",
  experienceRequired: "",
  skills: "",
  description: ""
};

const t = {
  en: {
    title: "Post a Job",
    editTitle: "Edit Job",
    subtitle: "Fill in the details so workers can find and apply.",
    editSubtitle: "Update the job details and save changes.",
    previewTitle: "Review Job Posting",
    previewSubtitle: "Check everything before publishing.",
    editPreviewSubtitle: "Check everything before saving.",
    successTitle: "Job Posted!",
    editSuccessTitle: "Job Updated!",
    successSubtitle: "Workers can now see and apply to this job.",
    editSuccessSubtitle: "Your job changes have been saved.",
    industry: "Industry",
    industryPlaceholder: "Select industry",
    department: "Department",
    departmentPlaceholder: "Select department",
    role: "Job Role",
    rolePlaceholder: "Select job role",
    employmentType: "Job Type",
    employmentTypePlaceholder: "Select type",
    location: "Work Location",
    locationPlaceholder: "e.g. Pune, Mumbai",
    salaryMin: "Min Salary (₹/month)",
    salaryMax: "Max Salary (₹/month)",
    salaryPlaceholder: "e.g. 18000",
    openings: "Number of Openings",
    experience: "Experience Required",
    experiencePlaceholder: "Select experience",
    skills: "Skills Required",
    skillsPlaceholder: "e.g. House Wiring, Panel Installation",
    skillsHint: "Separate skills with commas",
    description: "Job Description",
    descriptionPlaceholder: "Describe the work, shift timings, and requirements...",
    continue: "Continue",
    back: "Back",
    publish: "Publish Job",
    saveChanges: "Save Changes",
    publishing: "Publishing...",
    saving: "Saving...",
    jobId: "Job ID",
    done: "Done",
    postAnother: "Post Another Job",
    stepForm: "Details",
    stepReview: "Review",
    stepDone: "Done",
    loginRequired: "Please log in first.",
    employerOnly: "Only employers can post jobs.",
    companyRequired: "Please set up your company first.",
    required: "Please fill all required fields.",
    salaryInvalid: "Max salary should be greater than or equal to min salary.",
    saveError: "Could not post job. Please try again.",
    updateError: "Could not update job. Please try again."
  },
  hi: {
    title: "नौकरी पोस्ट करें",
    editTitle: "नौकरी संपादित करें",
    subtitle: "विवरण भरें ताकि कर्मचारी ढूंढ सकें और आवेदन कर सकें।",
    editSubtitle: "नौकरी का विवरण अपडेट करें और सेव करें।",
    previewTitle: "नौकरी विवरण देखें",
    previewSubtitle: "प्रकाशित करने से पहले सब कुछ जाँच लें।",
    editPreviewSubtitle: "सेव करने से पहले सब कुछ जाँच लें।",
    successTitle: "नौकरी पोस्ट हो गई!",
    editSuccessTitle: "नौकरी अपडेट हो गई!",
    successSubtitle: "अब कर्मचारी इस नौकरी को देख और आवेदन कर सकते हैं।",
    editSuccessSubtitle: "आपके बदलाव सेव हो गए हैं।",
    industry: "उद्योग",
    industryPlaceholder: "उद्योग चुनें",
    department: "विभाग",
    departmentPlaceholder: "विभाग चुनें",
    role: "नौकरी की भूमिका",
    rolePlaceholder: "भूमिका चुनें",
    employmentType: "नौकरी का प्रकार",
    employmentTypePlaceholder: "प्रकार चुनें",
    location: "काम की जगह",
    locationPlaceholder: "जैसे पुणे, मुंबई",
    salaryMin: "न्यूनतम वेतन (₹/माह)",
    salaryMax: "अधिकतम वेतन (₹/माह)",
    salaryPlaceholder: "जैसे 18000",
    openings: "खाली पदों की संख्या",
    experience: "आवश्यक अनुभव",
    experiencePlaceholder: "अनुभव चुनें",
    skills: "आवश्यक कौशल",
    skillsPlaceholder: "जैसे हाउस वायरिंग, पैनल इंस्टॉलेशन",
    skillsHint: "कौशल को अलग करने के लिए कॉमा लगाएँ",
    description: "नौकरी का विवरण",
    descriptionPlaceholder: "काम, शिफ्ट समय और आवश्यकताओं का वर्णन करें...",
    continue: "आगे बढ़ें",
    back: "वापस",
    publish: "नौकरी प्रकाशित करें",
    saveChanges: "बदलाव सेव करें",
    publishing: "प्रकाशित हो रहा है...",
    saving: "सेव हो रहा है...",
    jobId: "नौकरी ID",
    done: "हो गया",
    postAnother: "और नौकरी पोस्ट करें",
    stepForm: "विवरण",
    stepReview: "जाँच",
    stepDone: "पूर्ण",
    loginRequired: "कृपया पहले लॉगिन करें।",
    employerOnly: "केवल नियोक्ता नौकरी पोस्ट कर सकते हैं।",
    companyRequired: "कृपया पहले अपनी कंपनी सेटअप करें।",
    required: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    salaryInvalid: "अधिकतम वेतन न्यूनतम वेतन से कम नहीं होना चाहिए।",
    saveError: "नौकरी पोस्ट नहीं हो सकी। कृपया पुनः प्रयास करें।",
    updateError: "नौकरी अपडेट नहीं हो सकी। कृपया पुनः प्रयास करें।"
  }
};

const steps = ["form", "preview", "success"];

function labelFor(options, value, lang) {
  return options.find((o) => o.en === value)?.[lang] ?? value;
}

function formatSalaryRange(min, max, lang) {
  const minN = Number(String(min).replace(/[^\d]/g, "")) || 0;
  const maxN = Number(String(max).replace(/[^\d]/g, "")) || 0;
  if (!minN && !maxN) return "—";
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  if (minN && maxN) return `${fmt(minN)} – ${fmt(maxN)}${lang === "hi" ? "/माह" : "/month"}`;
  if (minN) return `${fmt(minN)}+${lang === "hi" ? "/माह" : "/month"}`;
  return `${fmt(maxN)}${lang === "hi" ? "/माह तक" : " max/month"}`;
}

function PostJobModal({ open, onOpenChange, lang, onComplete, job = null }) {
  const txt = t[lang];
  const { user, profile, organization } = useAuth();
  const isEdit = Boolean(job?.id);
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(EMPTY_FORM);
  const [savedJob, setSavedJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm(EMPTY_FORM);
      setSavedJob(null);
      setSaving(false);
      setError(null);
      return;
    }

    if (job?.id) {
      const prefill = jobToForm(job);
      setForm(prefill || EMPTY_FORM);
      setStep("form");
      setSavedJob(null);
      setError(null);
      return;
    }

    setStep("form");
    setForm(EMPTY_FORM);
    setSavedJob(null);
    setError(null);
  }, [open, job]);

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
    form.industryId &&
    form.departmentId &&
    form.roleId &&
    form.employmentType &&
    form.location.trim() &&
    form.salaryMin.trim() &&
    form.salaryMax.trim() &&
    form.experienceRequired &&
    form.skills.trim() &&
    form.description.trim() &&
    Number(form.openings) >= 1;

  const handleContinue = () => {
    if (!isFormValid()) {
      setError(txt.required);
      return;
    }
    const min = Number(String(form.salaryMin).replace(/[^\d]/g, "")) || 0;
    const max = Number(String(form.salaryMax).replace(/[^\d]/g, "")) || 0;
    if (max < min) {
      setError(txt.salaryInvalid);
      return;
    }
    setStep("preview");
  };

  const handlePublish = async () => {
    if (!user) {
      setError(txt.loginRequired);
      return;
    }
    setSaving(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await updateJobOpening(job.id, form);
      } else {
        let org = organization;
        if (!org?.id && profile?.organizationId) {
          org = await fetchOrganization(profile.organizationId);
        }
        if (!org?.id) {
          setError(txt.companyRequired);
          setSaving(false);
          return;
        }
        result = await createJobOpening({
          userId: user.uid,
          organization: org,
          formData: form
        });
      }
      setSavedJob(result);
      setStep("success");
      onComplete?.(result);
    } catch (err) {
      console.error(isEdit ? "Update job failed:" : "Post job failed:", err);
      setError(isEdit ? txt.updateError : txt.saveError);
    } finally {
      setSaving(false);
    }
  };

  const handlePostAnother = () => {
    setStep("form");
    setForm(EMPTY_FORM);
    setSavedJob(null);
    setError(null);
  };

  const stepIndex = steps.indexOf(step);
  const stepLabels = [txt.stepForm, txt.stepReview, txt.stepDone];
  const selectClass =
    "flex h-10 sm:h-12 w-full rounded-lg sm:rounded-xl border border-[#E2E8F0] sm:border-2 bg-white px-3 text-sm sm:text-base text-[#0F172A] focus:border-[#2563EB] focus:outline-none";

  const jobId = savedJob?.id ? `JOB-${savedJob.id.slice(0, 6).toUpperCase()}` : "";
  const previewSkills = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
          <div className="mx-auto mb-1 hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Briefcase className="h-7 w-7 text-[#2563EB]" />
          </div>
          <DialogTitle className="text-base sm:text-2xl font-bold text-[#0F172A]">
            {step === "form" && (isEdit ? txt.editTitle : txt.title)}
            {step === "preview" && txt.previewTitle}
            {step === "success" && (isEdit ? txt.editSuccessTitle : txt.successTitle)}
          </DialogTitle>
          <DialogDescription className="text-[#64748B]">
            {step === "form" && (isEdit ? txt.editSubtitle : txt.subtitle)}
            {step === "preview" && (isEdit ? txt.editPreviewSubtitle : txt.previewSubtitle)}
            {step === "success" && (isEdit ? txt.editSuccessSubtitle : txt.successSubtitle)}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-1 sm:gap-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-1 sm:gap-2">
              <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <div
                  className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full text-[10px] sm:text-xs font-bold transition-colors ${i <= stepIndex ? "bg-[#2563EB] text-white" : "bg-[#E2E8F0] text-[#94A3B8]"}`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className="hidden sm:block text-[10px] font-semibold text-[#64748B]">{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className={`h-0.5 w-3 sm:w-8 shrink-0 transition-colors ${i < stepIndex ? "bg-[#2563EB]" : "bg-[#E2E8F0]"}`} />
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
              {organization?.name && (
                <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs sm:text-sm font-semibold text-[#2563EB]">
                  {organization.name}
                </p>
              )}

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
                  <Label htmlFor="employmentType" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.employmentType} *
                  </Label>
                  <select
                    id="employmentType"
                    value={form.employmentType}
                    onChange={(e) => updateField("employmentType", e.target.value)}
                    className={selectClass}
                  >
                    <option value="">{txt.employmentTypePlaceholder}</option>
                    {EMPLOYMENT_TYPES.map((o) => (
                      <option key={o.en} value={o.en}>{o[lang]}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="openings" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.openings} *
                  </Label>
                  <Input
                    id="openings"
                    type="number"
                    min={1}
                    value={form.openings}
                    onChange={(e) => updateField("openings", e.target.value)}
                    className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.location} *
                </Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder={txt.locationPlaceholder}
                  className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="salaryMin" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.salaryMin} *
                  </Label>
                  <Input
                    id="salaryMin"
                    inputMode="numeric"
                    value={form.salaryMin}
                    onChange={(e) => updateField("salaryMin", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder={txt.salaryPlaceholder}
                    className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="salaryMax" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {txt.salaryMax} *
                  </Label>
                  <Input
                    id="salaryMax"
                    inputMode="numeric"
                    value={form.salaryMax}
                    onChange={(e) => updateField("salaryMax", e.target.value.replace(/[^\d]/g, ""))}
                    placeholder={txt.salaryPlaceholder}
                    className="h-10 sm:h-12 rounded-lg sm:rounded-xl border-[#E2E8F0] sm:border-2 text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="experience" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.experience} *
                </Label>
                <select
                  id="experience"
                  value={form.experienceRequired}
                  onChange={(e) => updateField("experienceRequired", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{txt.experiencePlaceholder}</option>
                  {EXPERIENCE_OPTIONS.map((o) => (
                    <option key={o.en} value={o.en}>{o[lang]}</option>
                  ))}
                </select>
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

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {txt.description} *
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
                  <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-2xl bg-[#2563EB] text-white">
                    <Briefcase className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-xl font-bold text-[#0F172A] break-words">
                      {displayRoleLabel(form, lang)}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#64748B]">{organization?.name}</p>
                    <p className="mt-0.5 text-[10px] sm:text-xs text-[#64748B]">
                      {displayIndustryLabel(form, lang)}
                      {resolveTaxonomy(form)
                        ? ` · ${labelOf(resolveTaxonomy(form).department, lang)}`
                        : ""}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs sm:text-sm font-semibold text-[#2563EB]">
                      {labelFor(EMPLOYMENT_TYPES, form.employmentType, lang)}
                    </span>
                  </div>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 sm:gap-3">
                  {[
                    { icon: MapPin, label: txt.location, value: form.location },
                    { icon: IndianRupee, label: lang === "hi" ? "वेतन" : "Salary", value: formatSalaryRange(form.salaryMin, form.salaryMax, lang) },
                    { icon: Users, label: txt.openings, value: form.openings },
                    { icon: Briefcase, label: txt.experience, value: labelFor(EXPERIENCE_OPTIONS, form.experienceRequired, lang) }
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

                <div className="rounded-lg bg-white p-2 sm:p-3">
                  <p className="mb-1 text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.description}</p>
                  <p className="text-xs sm:text-sm text-[#0F172A] whitespace-pre-wrap">{form.description}</p>
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
                  onClick={handlePublish}
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-2xl bg-[#F97316] py-2.5 sm:py-4 text-sm sm:text-lg font-bold text-white transition-all hover:bg-orange-500 disabled:opacity-70"
                >
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                  {saving
                    ? isEdit
                      ? txt.saving
                      : txt.publishing
                    : isEdit
                      ? txt.saveChanges
                      : txt.publish}
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
                <p className="text-[10px] sm:text-xs font-semibold text-[#64748B]">{txt.jobId}</p>
                <p className="text-lg sm:text-2xl font-bold text-[#0F172A]">{jobId}</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-[#0F172A]">
                  {displayRoleLabel(savedJob, lang)}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                {!isEdit && (
                  <button
                    type="button"
                    onClick={handlePostAnother}
                    className="flex flex-1 items-center justify-center rounded-lg sm:rounded-2xl border border-[#E2E8F0] sm:border-2 py-2.5 sm:py-4 text-xs sm:text-base font-bold text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]"
                  >
                    {txt.postAnother}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="flex flex-1 items-center justify-center rounded-lg sm:rounded-2xl bg-[#2563EB] py-2.5 sm:py-4 text-xs sm:text-base font-bold text-white hover:bg-blue-700"
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

export { PostJobModal };
