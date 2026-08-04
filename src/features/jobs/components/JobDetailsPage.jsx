import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Share2,
  Users,
  Wallet
} from "lucide-react";
import { useAuth } from "@/features/auth";
import { fetchJobOpening } from "@/features/employer/services/jobService";
import {
  applyToJob,
  findApplication,
  findSavedJob,
  saveJob,
  unsaveJob
} from "@/features/profile/services/applicationService";
import { USER_ROLES } from "@/utils/constants";
import { displayIndustryLabel, displayRoleLabel } from "@/features/taxonomy";

const TYPE_LABELS = {
  "Full Time": { en: "Full Time", hi: "पूर्णकालिक" },
  "Part Time": { en: "Part Time", hi: "अंशकालिक" },
  Contract: { en: "Contract", hi: "कॉन्ट्रैक्ट" },
  "Daily Wage": { en: "Daily Wage", hi: "दैनिक मजदूरी" }
};

const INDUSTRY_VISUALS = {
  construction: { icon: "🏗️", color: "#FEF3C7" },
  manufacturing: { icon: "🏭", color: "#FEE2E2" },
  showroom: { icon: "🏬", color: "#DBEAFE" },
  retail: { icon: "🛒", color: "#FCE7F3" },
  hospital: { icon: "🏥", color: "#D1FAE5" },
  "elderly-care": { icon: "💙", color: "#EDE9FE" },
  restaurant: { icon: "🍽️", color: "#FFEDD5" },
  legacy: { icon: "💼", color: "#F1F5F9" }
};

const t = {
  en: {
    backHome: "Back to Home",
    loading: "Loading job…",
    notFound: "This job is no longer available.",
    browseJobs: "Browse Jobs",
    jobClosed: "This job is closed and no longer accepting applications.",
    overview: "Overview",
    description: "Job Description",
    noDescription: "No description provided.",
    skills: "Skills Required",
    location: "Location",
    salary: "Salary",
    jobType: "Job Type",
    experience: "Experience",
    openings: "Openings",
    perMonth: "/month",
    apply: "Apply Now",
    applied: "Applied",
    applying: "Applying…",
    save: "Save",
    saved: "Saved",
    share: "Share",
    shared: "Link copied!",
    workerOnly: "Only job seekers can apply.",
    applyError: "Could not apply. Please try again.",
    saveError: "Could not save job. Please try again."
  },
  hi: {
    backHome: "होम पर वापस",
    loading: "नौकरी लोड हो रही है…",
    notFound: "यह नौकरी अब उपलब्ध नहीं है।",
    browseJobs: "नौकरियाँ देखें",
    jobClosed: "यह नौकरी बंद है और अब आवेदन स्वीकार नहीं कर रही।",
    overview: "अवलोकन",
    description: "नौकरी का विवरण",
    noDescription: "कोई विवरण नहीं दिया गया।",
    skills: "आवश्यक कौशल",
    location: "स्थान",
    salary: "वेतन",
    jobType: "नौकरी का प्रकार",
    experience: "अनुभव",
    openings: "खाली पद",
    perMonth: "/माह",
    apply: "अभी आवेदन करें",
    applied: "आवेदन हो गया",
    applying: "आवेदन हो रहा है…",
    save: "सहेजें",
    saved: "सहेजा गया",
    share: "शेयर करें",
    shared: "लिंक कॉपी हो गया!",
    workerOnly: "केवल नौकरी खोजने वाले आवेदन कर सकते हैं।",
    applyError: "आवेदन नहीं हो सका। कृपया पुनः प्रयास करें।",
    saveError: "नौकरी सेव नहीं हो सकी। कृपया पुनः प्रयास करें।"
  }
};

function jobTypeLabel(type, lang) {
  return TYPE_LABELS[type]?.[lang] ?? type;
}

function jobVisual(job) {
  if (job?.industryId && INDUSTRY_VISUALS[job.industryId]) {
    return INDUSTRY_VISUALS[job.industryId];
  }
  return INDUSTRY_VISUALS.legacy;
}

function formatSalary(job) {
  const min = Number(job.salaryMin) || 0;
  const max = Number(job.salaryMax) || 0;
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  if (max) return fmt(max);
  return "—";
}

function JobDetailsPage({ lang = "en", onLoginClick, onCreateProfileClick }) {
  const txt = t[lang];
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, profile, candidateProfile } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [savedDocId, setSavedDocId] = useState(null);
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [shared, setShared] = useState(false);
  const [actionError, setActionError] = useState(null);

  const loadJob = useCallback(async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const data = await fetchJobOpening(jobId);
      if (!data) {
        setNotFound(true);
        setJob(null);
      } else {
        setJob(data);
      }
    } catch (err) {
      console.error("Failed to load job:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadJob();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [loadJob]);

  useEffect(() => {
    let cancelled = false;
    async function loadWorkerState() {
      if (!user || profile?.role !== USER_ROLES.WORKER || !jobId) {
        setIsApplied(false);
        setSavedDocId(null);
        return;
      }
      try {
        const [application, saved] = await Promise.all([
          findApplication(user.uid, jobId),
          findSavedJob(user.uid, jobId)
        ]);
        if (cancelled) return;
        setIsApplied(Boolean(application));
        setSavedDocId(saved?.id ?? null);
      } catch (err) {
        console.error("Failed to load worker job state:", err);
      }
    }
    loadWorkerState();
    return () => {
      cancelled = true;
    };
  }, [user, profile?.role, jobId]);

  const handleApply = async () => {
    setActionError(null);
    if (!user) {
      onLoginClick?.();
      return;
    }
    if (profile?.role !== USER_ROLES.WORKER) {
      setActionError(txt.workerOnly);
      return;
    }
    if (!profile?.onboardingComplete && !candidateProfile) {
      onCreateProfileClick?.();
      return;
    }
    setApplying(true);
    try {
      await applyToJob({
        candidateId: user.uid,
        job,
        candidateName: candidateProfile?.fullName || profile?.displayName || "",
        candidatePhone: user.phoneNumber || candidateProfile?.phone || ""
      });
      setIsApplied(true);
    } catch (err) {
      console.error("Apply failed:", err);
      setActionError(txt.applyError);
    } finally {
      setApplying(false);
    }
  };

  const handleSaveToggle = async () => {
    setActionError(null);
    if (!user) {
      onLoginClick?.();
      return;
    }
    if (profile?.role !== USER_ROLES.WORKER) {
      setActionError(txt.workerOnly);
      return;
    }
    setSaving(true);
    try {
      if (savedDocId) {
        await unsaveJob(savedDocId);
        setSavedDocId(null);
      } else {
        const saved = await saveJob({ candidateId: user.uid, job });
        setSavedDocId(saved.id);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setActionError(txt.saveError);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = job ? `${displayRoleLabel(job, lang)} · ${job.organizationName}` : "Bharat Gig";
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2000);
    } catch {
      // user dismissed the share sheet — ignore
    }
  };

  const goBrowseJobs = () => {
    navigate("/jobs");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-[#64748B]">
        <Loader2 className="h-5 w-5 animate-spin text-[#2563EB]" />
        {txt.loading}
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <Briefcase className="mx-auto mb-4 h-12 w-12 text-[#94A3B8]" />
        <p className="text-lg font-bold text-[#0F172A]">{txt.notFound}</p>
        <button
          type="button"
          onClick={goBrowseJobs}
          className="mt-4 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          {txt.browseJobs}
        </button>
      </div>
    );
  }

  const visual = jobVisual(job);
  const closed = job.status !== "open";
  const skills = Array.isArray(job.skills) ? job.skills : [];

  const overviewItems = [
    { icon: MapPin, label: txt.location, value: job.location || "—" },
    { icon: Wallet, label: txt.salary, value: `${formatSalary(job)} ${txt.perMonth}` },
    { icon: Briefcase, label: txt.jobType, value: jobTypeLabel(job.employmentType, lang) },
    { icon: Clock, label: txt.experience, value: job.experienceRequired || "—" },
    { icon: Users, label: txt.openings, value: String(job.openings ?? 1) }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-[#64748B] hover:text-[#2563EB]"
          >
            <ArrowLeft className="h-4 w-4" />
            {txt.backHome}
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ background: visual.color }}
            >
              {visual.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                {displayRoleLabel(job, lang)}
                {displayIndustryLabel(job, lang) ? (
                  <span className="mt-1 block text-base font-semibold text-[#64748B]">
                    {displayIndustryLabel(job, lang)}
                    {job.departmentName ? ` · ${job.departmentName}` : ""}
                  </span>
                ) : null}
              </h1>
              <p className="mt-1 text-base text-[#64748B]">{job.organizationName}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                  {jobTypeLabel(job.employmentType, lang)}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] px-3 py-1 text-xs font-semibold text-[#64748B]">
                  <MapPin className="h-3.5 w-3.5 text-[#2563EB]" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#E2E8F0] px-3 py-1 text-xs font-bold text-[#22C55E]">
                  {formatSalary(job)} {txt.perMonth}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        {closed && (
          <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
            {txt.jobClosed}
          </p>
        )}
        {actionError && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{actionError}</p>
        )}

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-[#0F172A]">{txt.overview}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {overviewItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#2563EB]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[#94A3B8]">{item.label}</p>
                  <p className="truncate text-sm font-bold text-[#0F172A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
          <h2 className="mb-3 text-lg font-bold text-[#0F172A]">{txt.description}</h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#475569]">
            {job.description?.trim() || txt.noDescription}
          </p>
        </section>

        {skills.length > 0 && (
          <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-bold text-[#0F172A]">{txt.skills}</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-[#2563EB]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4">
          <button
            type="button"
            onClick={handleApply}
            disabled={isApplied || applying || closed}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-[#94A3B8]"
          >
            {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : isApplied ? <CheckCircle2 className="h-4 w-4" /> : null}
            {isApplied ? txt.applied : applying ? txt.applying : txt.apply}
          </button>
          <button
            type="button"
            onClick={handleSaveToggle}
            disabled={saving}
            className={`flex items-center justify-center gap-1.5 rounded-xl border-2 px-4 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60 ${savedDocId ? "border-[#2563EB] bg-blue-50 text-[#2563EB]" : "border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"}`}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : savedDocId ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{savedDocId ? txt.saved : txt.save}</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-[#E2E8F0] px-4 py-3.5 text-sm font-semibold text-[#64748B] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">{shared ? txt.shared : txt.share}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { JobDetailsPage };
