import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Loader2,
  MapPin,
  Send,
  Trash2,
  User
} from "lucide-react";
import { useAuth } from "@/features/auth";
import {
  applyToJob,
  listCandidateApplications,
  listSavedJobs,
  unsaveJob
} from "../services/applicationService";
import { fetchJobOpening } from "@/features/employer/services/jobService";
import { USER_ROLES } from "@/utils/constants";

const APPLICATION_STATUSES = [
  { value: "applied", en: "Applied", hi: "आवेदन", className: "bg-blue-50 text-blue-700" },
  { value: "reviewing", en: "Reviewing", hi: "समीक्षा", className: "bg-amber-50 text-amber-700" },
  { value: "shortlisted", en: "Shortlisted", hi: "शॉर्टलिस्ट", className: "bg-violet-50 text-violet-700" },
  { value: "rejected", en: "Rejected", hi: "अस्वीकृत", className: "bg-red-50 text-red-700" },
  { value: "hired", en: "Hired", hi: "चयनित", className: "bg-green-50 text-green-700" }
];

const t = {
  en: {
    title: "My Dashboard",
    subtitle: "Track your applications and saved jobs",
    backHome: "Back to Home",
    browseJobs: "Browse Jobs",
    applications: "My Applications",
    savedJobs: "Saved Jobs",
    noApplications: "You haven't applied to any jobs yet.",
    noSaved: "No saved jobs yet.",
    loading: "Loading dashboard…",
    loadError: "Could not load dashboard. Please refresh.",
    company: "Company",
    location: "Location",
    status: "Status",
    appliedOn: "Applied on",
    savedOn: "Saved on",
    remove: "Remove",
    jobClosed: "This job is no longer open",
    workerOnly: "This dashboard is for job seekers only.",
    profileRequired: "Please create your profile first.",
    createProfile: "Create Profile",
    editProfile: "Edit Profile",
    profileSummary: "Your Profile",
    statApplications: "Applications",
    statShortlisted: "Shortlisted",
    statSaved: "Saved Jobs",
    apply: "Apply",
    applied: "Applied"
  },
  hi: {
    title: "मेरा डैशबोर्ड",
    subtitle: "अपने आवेदन और सेव की गई नौकरियाँ देखें",
    backHome: "होम पर वापस",
    browseJobs: "नौकरियाँ देखें",
    applications: "मेरे आवेदन",
    savedJobs: "सेव की गई नौकरियाँ",
    noApplications: "आपने अभी किसी नौकरी के लिए आवेदन नहीं किया है।",
    noSaved: "अभी कोई सेव की गई नौकरी नहीं है।",
    loading: "डैशबोर्ड लोड हो रहा है…",
    loadError: "डैशबोर्ड लोड नहीं हो सका। कृपया रिफ्रेश करें।",
    company: "कंपनी",
    location: "स्थान",
    status: "स्थिति",
    appliedOn: "आवेदन तिथि",
    savedOn: "सेव तिथि",
    remove: "हटाएँ",
    jobClosed: "यह नौकरी अब खुली नहीं है",
    workerOnly: "यह डैशबोर्ड केवल नौकरी खोजने वालों के लिए है।",
    profileRequired: "कृपया पहले अपनी प्रोफाइल बनाएं।",
    createProfile: "प्रोफाइल बनाएं",
    editProfile: "प्रोफाइल संपादित करें",
    profileSummary: "आपकी प्रोफाइल",
    statApplications: "आवेदन",
    statShortlisted: "शॉर्टलिस्ट",
    statSaved: "सेव की गई",
    apply: "आवेदन करें",
    applied: "आवेदन किया"
  }
};

function statusMeta(value, lang) {
  const found = APPLICATION_STATUSES.find((s) => s.value === value);
  return {
    label: found?.[lang] ?? value,
    className: found?.className ?? "bg-slate-100 text-slate-700"
  };
}

function formatDate(value) {
  if (!value) return "—";
  const date = value?.toDate?.() ?? (value?.seconds ? new Date(value.seconds * 1000) : null);
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function WorkerDashboard({ lang = "en", onCreateProfileClick, onEditProfileClick }) {
  const txt = t[lang];
  const navigate = useNavigate();
  const { user, profile, candidateProfile, loading: authLoading, profileLoading } = useAuth();
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadDashboard = useCallback(async () => {
    if (!user?.uid) {
      setApplications([]);
      setSavedJobs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [apps, saved] = await Promise.all([
        listCandidateApplications(user.uid),
        listSavedJobs(user.uid)
      ]);
      setApplications(apps);
      setSavedJobs(saved);

      const jobIds = [
        ...new Set([
          ...apps.map((a) => a.jobId),
          ...saved.map((s) => s.jobId)
        ].filter(Boolean))
      ];
      const details = {};
      await Promise.all(
        jobIds.map(async (jobId) => {
          try {
            const job = await fetchJobOpening(jobId);
            if (job) details[jobId] = job;
          } catch {
            // ignore missing jobs
          }
        })
      );
      setJobDetails(details);
    } catch (err) {
      console.error("Worker dashboard load failed:", err);
      setError(txt.loadError);
    } finally {
      setLoading(false);
    }
  }, [user?.uid, txt.loadError]);

  useEffect(() => {
    if (authLoading || profileLoading) return;
    loadDashboard();
  }, [authLoading, profileLoading, loadDashboard]);

  const appliedJobIds = useMemo(
    () => new Set(applications.map((a) => a.jobId).filter(Boolean)),
    [applications]
  );

  const stats = useMemo(() => {
    const total = applications.length;
    const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
    return [
      { key: "applications", label: txt.statApplications, value: total, color: "#2563EB" },
      { key: "shortlisted", label: txt.statShortlisted, value: shortlisted, color: "#22C55E" },
      { key: "saved", label: txt.statSaved, value: savedJobs.length, color: "#F97316" }
    ];
  }, [applications, savedJobs.length, txt.statApplications, txt.statShortlisted, txt.statSaved]);

  const handleApplySaved = async (saved) => {
    const job = jobDetails[saved.jobId];
    if (!job || !user?.uid) return;
    setBusyId(saved.id);
    try {
      const result = await applyToJob({
        candidateId: user.uid,
        job: { id: saved.jobId, ...job },
        candidateName: candidateProfile?.fullName || "",
        candidatePhone: user.phoneNumber || candidateProfile?.phone || ""
      });
      setApplications((prev) => {
        if (prev.some((a) => a.jobId === saved.jobId)) return prev;
        return [result, ...prev];
      });
    } catch (err) {
      console.error("Apply from saved failed:", err);
      setError(txt.loadError);
    } finally {
      setBusyId(null);
    }
  };

  const handleRemoveSaved = async (savedDocId) => {
    setBusyId(savedDocId);
    try {
      await unsaveJob(savedDocId);
      setSavedJobs((prev) => prev.filter((s) => s.id !== savedDocId));
    } catch (err) {
      console.error("Unsave failed:", err);
      setError(txt.loadError);
    } finally {
      setBusyId(null);
    }
  };

  const goBrowseJobs = () => {
    navigate("/");
    window.setTimeout(() => {
      document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-2 text-[#64748B]">
        <Loader2 className="h-5 w-5 animate-spin text-[#2563EB]" />
        {txt.loading}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (profile?.role !== USER_ROLES.WORKER) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-lg font-bold text-[#0F172A]">{txt.workerOnly}</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-[#2563EB]">
          {txt.backHome}
        </Link>
      </div>
    );
  }

  if (!profile?.onboardingComplete) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <User className="mx-auto mb-4 h-12 w-12 text-[#F97316]" />
        <p className="text-lg font-bold text-[#0F172A]">{txt.profileRequired}</p>
        <button
          type="button"
          onClick={onCreateProfileClick}
          className="mt-4 rounded-xl bg-[#F97316] px-5 py-3 text-sm font-bold text-white hover:bg-orange-500"
        >
          {txt.createProfile}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-[#64748B] hover:text-[#2563EB]">
              <ArrowLeft className="h-4 w-4" />
              {txt.backHome}
            </Link>
            <h1 className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">{txt.title}</h1>
            <p className="mt-1 text-sm text-[#64748B]">
              {candidateProfile?.fullName
                ? `${txt.profileSummary}: ${candidateProfile.fullName}`
                : txt.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onEditProfileClick || onCreateProfileClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-5 py-3 text-sm font-bold text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <User className="h-4 w-4" />
              {txt.editProfile}
            </button>
            <button
              type="button"
              onClick={goBrowseJobs}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <Briefcase className="h-4 w-4" />
              {txt.browseJobs}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white py-16 text-[#64748B]">
            <Loader2 className="h-5 w-5 animate-spin text-[#2563EB]" />
            {txt.loading}
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center shadow-sm"
                >
                  <p className="text-3xl font-extrabold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold text-[#0F172A]">{txt.applications}</h2>
              {applications.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                  {txt.noApplications}
                </p>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => {
                    const job = jobDetails[app.jobId];
                    const status = statusMeta(app.status || "applied", lang);
                    const closed = job && job.status !== "open";
                    return (
                      <div
                        key={app.id}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-[#0F172A]">
                              {app.jobTitle || job?.title || "—"}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                              {app.organizationName || job?.organizationName || txt.company}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#64748B]">
                              {(app.location || job?.location) && (
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {app.location || job?.location}
                                </span>
                              )}
                              <span>
                                {txt.appliedOn}: {formatDate(app.createdAt)}
                              </span>
                              {closed && (
                                <span className="font-semibold text-amber-700">{txt.jobClosed}</span>
                              )}
                            </div>
                          </div>
                          <span className={`shrink-0 self-start rounded-full px-3 py-1 text-xs font-bold ${status.className}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0F172A]">
                <Bookmark className="h-5 w-5 text-[#2563EB]" />
                {txt.savedJobs}
              </h2>
              {savedJobs.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                  {txt.noSaved}
                </p>
              ) : (
                <div className="space-y-3">
                  {savedJobs.map((saved) => {
                    const job = jobDetails[saved.jobId];
                    const closed = job && job.status !== "open";
                    const hasApplied = appliedJobIds.has(saved.jobId);
                    const canApply = job && !closed && !hasApplied;
                    return (
                      <div
                        key={saved.id}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-[#0F172A]">
                              {saved.jobTitle || job?.title || "—"}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                              {saved.organizationName || job?.organizationName || txt.company}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#64748B]">
                              {(saved.location || job?.location) && (
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {saved.location || job?.location}
                                </span>
                              )}
                              <span>
                                {txt.savedOn}: {formatDate(saved.createdAt)}
                              </span>
                              {closed && (
                                <span className="font-semibold text-amber-700">{txt.jobClosed}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
                            {canApply ? (
                              <button
                                type="button"
                                onClick={() => handleApplySaved(saved)}
                                disabled={busyId === saved.id}
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                              >
                                {busyId === saved.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Send className="h-3.5 w-3.5" />
                                )}
                                {txt.apply}
                              </button>
                            ) : hasApplied ? (
                              <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-3 py-2 text-xs font-bold text-green-700">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {txt.applied}
                              </span>
                            ) : null}
                            <button
                              type="button"
                              onClick={() => handleRemoveSaved(saved.id)}
                              disabled={busyId === saved.id}
                              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#64748B] hover:border-red-300 hover:text-red-600 disabled:opacity-60"
                            >
                              {busyId === saved.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                              {txt.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export { WorkerDashboard };
