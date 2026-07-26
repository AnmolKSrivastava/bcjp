import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Loader2,
  MapPin,
  Phone,
  Users,
  XCircle,
  RotateCcw
} from "lucide-react";
import { useAuth } from "@/features/auth";
import { displayIndustryLabel, displayRoleLabel } from "@/features/taxonomy";
import {
  closeJobOpening,
  listOrganizationJobs,
  reopenJobOpening
} from "../services/jobService";
import {
  listOrganizationApplications,
  updateApplicationStatus
} from "@/features/profile/services/applicationService";
import { fetchCandidateProfile } from "@/features/profile/services/candidateService";
import { USER_ROLES } from "@/utils/constants";

const APPLICATION_STATUSES = [
  { value: "applied", en: "Applied", hi: "आवेदन" },
  { value: "reviewing", en: "Reviewing", hi: "समीक्षा" },
  { value: "shortlisted", en: "Shortlisted", hi: "शॉर्टलिस्ट" },
  { value: "rejected", en: "Rejected", hi: "अस्वीकृत" },
  { value: "hired", en: "Hired", hi: "चयनित" }
];

const t = {
  en: {
    title: "Employer Dashboard",
    subtitle: "Manage your jobs and applicants",
    backHome: "Back to Home",
    postJob: "Post a Job",
    myJobs: "My Jobs",
    applicants: "Applicants",
    allJobs: "All jobs",
    open: "Open",
    closed: "Closed",
    closeJob: "Close job",
    reopenJob: "Reopen",
    noJobs: "No jobs posted yet.",
    noApplicants: "No applicants for this selection.",
    loading: "Loading dashboard…",
    loadError: "Could not load dashboard. Please refresh.",
    company: "Company",
    openings: "Openings",
    location: "Location",
    status: "Status",
    candidate: "Candidate",
    job: "Job",
    phone: "Phone",
    updateStatus: "Update status",
    employerOnly: "This dashboard is for employers only.",
    setupCompany: "Please set up your company first.",
    goSetup: "Setup Company",
    statApplications: "Applications",
    statShortlisted: "Shortlisted",
    statHired: "Hired",
    call: "Call"
  },
  hi: {
    title: "नियोक्ता डैशबोर्ड",
    subtitle: "अपनी नौकरियाँ और आवेदक प्रबंधित करें",
    backHome: "होम पर वापस",
    postJob: "नौकरी पोस्ट करें",
    myJobs: "मेरी नौकरियाँ",
    applicants: "आवेदक",
    allJobs: "सभी नौकरियाँ",
    open: "खुली",
    closed: "बंद",
    closeJob: "नौकरी बंद करें",
    reopenJob: "फिर खोलें",
    noJobs: "अभी कोई नौकरी पोस्ट नहीं हुई।",
    noApplicants: "इस चयन के लिए कोई आवेदक नहीं।",
    loading: "डैशबोर्ड लोड हो रहा है…",
    loadError: "डैशबोर्ड लोड नहीं हो सका। कृपया रिफ्रेश करें।",
    company: "कंपनी",
    openings: "पद",
    location: "स्थान",
    status: "स्थिति",
    candidate: "उम्मीदवार",
    job: "नौकरी",
    phone: "फ़ोन",
    updateStatus: "स्थिति अपडेट करें",
    employerOnly: "यह डैशबोर्ड केवल नियोक्ताओं के लिए है।",
    setupCompany: "कृपया पहले अपनी कंपनी सेटअप करें।",
    goSetup: "कंपनी सेटअप",
    statApplications: "आवेदन",
    statShortlisted: "शॉर्टलिस्ट",
    statHired: "चयनित",
    call: "कॉल"
  }
};

function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function statusLabel(value, lang) {
  return APPLICATION_STATUSES.find((s) => s.value === value)?.[lang] ?? value;
}

function formatDate(value) {
  if (!value) return "—";
  const date = value?.toDate?.() ?? (value?.seconds ? new Date(value.seconds * 1000) : null);
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function EmployerDashboard({ lang = "en", onPostJobClick, onSetupCompanyClick }) {
  const txt = t[lang];
  const { user, profile, organization, loading: authLoading, profileLoading } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [candidateCache, setCandidateCache] = useState({});

  const orgId = profile?.organizationId || organization?.id;

  const loadDashboard = useCallback(async () => {
    if (!orgId) {
      setJobs([]);
      setApplications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [orgJobs, orgApps] = await Promise.all([
        listOrganizationJobs(orgId),
        listOrganizationApplications(orgId)
      ]);
      setJobs(orgJobs);
      setApplications(orgApps);
    } catch (err) {
      console.error("Dashboard load failed:", err);
      setError(txt.loadError);
    } finally {
      setLoading(false);
    }
  }, [orgId, txt.loadError]);

  useEffect(() => {
    if (authLoading || profileLoading) return;
    loadDashboard();
  }, [authLoading, profileLoading, loadDashboard]);

  useEffect(() => {
    let cancelled = false;
    async function hydrateCandidates() {
      const ids = [...new Set(applications.map((a) => a.candidateId).filter(Boolean))];
      const missing = ids.filter((id) => {
        const app = applications.find((a) => a.candidateId === id);
        return !app?.candidateName && !candidateCache[id];
      });
      if (missing.length === 0) return;
      const entries = {};
      await Promise.all(
        missing.map(async (id) => {
          try {
            const candidate = await fetchCandidateProfile(id);
            if (candidate) entries[id] = candidate;
          } catch {
            // ignore individual failures
          }
        })
      );
      if (!cancelled && Object.keys(entries).length > 0) {
        setCandidateCache((prev) => ({ ...prev, ...entries }));
      }
    }
    hydrateCandidates();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when applications change
  }, [applications]);

  const filteredApplications = useMemo(() => {
    if (selectedJobId === "all") return applications;
    return applications.filter((a) => a.jobId === selectedJobId);
  }, [applications, selectedJobId]);

  const applicantCountByJob = useMemo(() => {
    const map = {};
    applications.forEach((a) => {
      map[a.jobId] = (map[a.jobId] || 0) + 1;
    });
    return map;
  }, [applications]);

  const stats = useMemo(() => {
    const total = applications.length;
    const shortlisted = applications.filter((a) => a.status === "shortlisted").length;
    const hired = applications.filter((a) => a.status === "hired").length;
    return [
      { key: "applications", label: txt.statApplications, value: total, color: "#2563EB" },
      { key: "shortlisted", label: txt.statShortlisted, value: shortlisted, color: "#22C55E" },
      { key: "hired", label: txt.statHired, value: hired, color: "#F97316" }
    ];
  }, [applications, txt.statApplications, txt.statShortlisted, txt.statHired]);

  const handleCloseJob = async (jobId) => {
    setBusyId(jobId);
    try {
      await closeJobOpening(jobId);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "closed" } : j)));
    } catch (err) {
      console.error("Close job failed:", err);
      setError(txt.loadError);
    } finally {
      setBusyId(null);
    }
  };

  const handleReopenJob = async (jobId) => {
    setBusyId(jobId);
    try {
      await reopenJobOpening(jobId);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status: "open" } : j)));
    } catch (err) {
      console.error("Reopen job failed:", err);
      setError(txt.loadError);
    } finally {
      setBusyId(null);
    }
  };

  const handleStatusChange = async (applicationId, status) => {
    setBusyId(applicationId);
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
      );
    } catch (err) {
      console.error("Status update failed:", err);
      setError(txt.loadError);
    } finally {
      setBusyId(null);
    }
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

  if (profile?.role !== USER_ROLES.EMPLOYER) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-lg font-bold text-[#0F172A]">{txt.employerOnly}</p>
        <Link to="/" className="mt-4 inline-block font-semibold text-[#2563EB]">
          {txt.backHome}
        </Link>
      </div>
    );
  }

  if (!profile?.onboardingComplete || !orgId) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Building2 className="mx-auto mb-4 h-12 w-12 text-[#F97316]" />
        <p className="text-lg font-bold text-[#0F172A]">{txt.setupCompany}</p>
        <button
          type="button"
          onClick={onSetupCompanyClick}
          className="mt-4 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          {txt.goSetup}
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
              {organization?.name ? `${txt.company}: ${organization.name}` : txt.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onPostJobClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            <Briefcase className="h-4 w-4" />
            {txt.postJob}
          </button>
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
              <h2 className="mb-4 text-lg font-bold text-[#0F172A]">{txt.myJobs}</h2>
              {jobs.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                  {txt.noJobs}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {jobs.map((job) => {
                    const isOpen = job.status === "open";
                    const count = applicantCountByJob[job.id] || 0;
                    const selected = selectedJobId === job.id;
                    return (
                      <div
                        key={job.id}
                        className={`rounded-2xl border bg-white p-5 shadow-sm transition-colors ${selected ? "border-[#2563EB]" : "border-[#E2E8F0]"}`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedJobId(job.id)}
                          className="w-full text-left"
                        >
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <h3 className="text-base font-bold text-[#0F172A]">
                              {displayRoleLabel(job, lang)}
                            </h3>
                            {displayIndustryLabel(job, lang) ? (
                              <p className="text-xs text-[#94A3B8]">{displayIndustryLabel(job, lang)}</p>
                            ) : null}
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${isOpen ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}
                            >
                              {isOpen ? txt.open : txt.closed}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-[#64748B]">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {count} {txt.applicants}
                            </span>
                            <span>
                              {txt.openings}: {job.openings}
                            </span>
                          </div>
                        </button>
                        <div className="mt-4 flex gap-2">
                          {isOpen ? (
                            <button
                              type="button"
                              onClick={() => handleCloseJob(job.id)}
                              disabled={busyId === job.id}
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#64748B] hover:border-red-300 hover:text-red-600 disabled:opacity-60"
                            >
                              {busyId === job.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                              {txt.closeJob}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleReopenJob(job.id)}
                              disabled={busyId === job.id}
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#2563EB] hover:border-[#2563EB] disabled:opacity-60"
                            >
                              {busyId === job.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                              {txt.reopenJob}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section>
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#0F172A]">{txt.applicants}</h2>
                <select
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="h-10 rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm text-[#0F172A]"
                >
                  <option value="all">{txt.allJobs}</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {displayRoleLabel(job, lang)}
                    </option>
                  ))}
                </select>
              </div>

              {filteredApplications.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                  {txt.noApplicants}
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredApplications.map((app) => {
                    const candidate = candidateCache[app.candidateId];
                    const name =
                      app.candidateName ||
                      candidate?.fullName ||
                      app.candidateId?.slice(0, 8) ||
                      "—";
                    const phone =
                      app.candidatePhone || candidate?.phone || "";
                    return (
                      <div
                        key={app.id}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[#2563EB]">
                              {initials(name)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-base font-bold text-[#0F172A]">{name}</p>
                              <p className="text-sm text-[#64748B]">
                                {txt.job}: {app.jobTitle}
                                {app.location ? ` · ${app.location}` : ""}
                              </p>
                              {phone && (
                                <p className="mt-1 inline-flex items-center gap-1 text-sm text-[#64748B]">
                                  <Phone className="h-3.5 w-3.5" />
                                  {phone}
                                </p>
                              )}
                              <p className="mt-1 text-xs text-[#94A3B8]">{formatDate(app.createdAt)}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            {phone && (
                              <a
                                href={`tel:${phone}`}
                                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                              >
                                <Phone className="h-4 w-4" />
                                {txt.call}
                              </a>
                            )}
                            <label className="text-xs font-semibold text-[#64748B]">
                              {txt.updateStatus}
                            </label>
                            <select
                              value={app.status || "applied"}
                              onChange={(e) => handleStatusChange(app.id, e.target.value)}
                              disabled={busyId === app.id}
                              className="h-10 min-w-[10rem] rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-semibold text-[#0F172A] disabled:opacity-60"
                            >
                              {APPLICATION_STATUSES.map((s) => (
                                <option key={s.value} value={s.value}>
                                  {statusLabel(s.value, lang)}
                                </option>
                              ))}
                            </select>
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

export { EmployerDashboard };
