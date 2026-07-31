import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Loader2,
  MapPin,
  RotateCcw,
  Shield,
  User,
  Users,
  XCircle
} from "lucide-react";
import { useAuth } from "@/features/auth";
import { displayIndustryLabel, displayRoleLabel } from "@/features/taxonomy";
import { USER_ROLES } from "@/utils/constants";
import {
  adminCloseJob,
  adminReopenJob,
  listAllApplications,
  listAllCandidates,
  listAllJobs,
  listAllOrganizations,
  reactivateOrganization,
  suspendOrganization,
  verifyOrganization
} from "../services/adminService";

const t = {
  en: {
    title: "Platform Admin",
    subtitle: "Moderate organizations, jobs, and worker profiles",
    backHome: "Back to Home",
    loading: "Loading admin data…",
    loadError: "Could not load admin data. Check your admin role and Firestore rules.",
    adminOnly: "This area is for platform administrators only.",
    loginRequired: "Please log in as an admin.",
    tabOrgs: "Organizations",
    tabJobs: "Jobs",
    tabWorkers: "Workers",
    statOrgs: "Organizations",
    statJobs: "Open Jobs",
    statWorkers: "Workers",
    statApps: "Applications",
    verify: "Verify",
    suspend: "Suspend",
    reactivate: "Reactivate",
    closeJob: "Close",
    reopenJob: "Reopen",
    verified: "Verified",
    pending: "Pending",
    active: "Active",
    suspended: "Suspended",
    open: "Open",
    closed: "Closed",
    noOrgs: "No organizations yet.",
    noJobs: "No jobs yet.",
    noWorkers: "No worker profiles yet.",
    city: "City",
    location: "Location",
    phone: "Phone",
    role: "Role",
    company: "Company",
    howToAdmin:
      "To grant access: in Firebase Console → Firestore → users/{yourUid} set role to \"admin\" and onboardingComplete to true."
  },
  hi: {
    title: "प्लेटफ़ॉर्म एडमिन",
    subtitle: "संगठन, नौकरियाँ और वर्कर प्रोफाइल प्रबंधित करें",
    backHome: "होम पर वापस",
    loading: "एडमिन डेटा लोड हो रहा है…",
    loadError: "एडमिन डेटा लोड नहीं हो सका। एडमिन रोल और नियमों की जाँच करें।",
    adminOnly: "यह क्षेत्र केवल प्लेटफ़ॉर्म एडमिन के लिए है।",
    loginRequired: "कृपया एडमिन के रूप में लॉगिन करें।",
    tabOrgs: "संगठन",
    tabJobs: "नौकरियाँ",
    tabWorkers: "वर्कर्स",
    statOrgs: "संगठन",
    statJobs: "खुली नौकरियाँ",
    statWorkers: "वर्कर्स",
    statApps: "आवेदन",
    verify: "वेरिफ़ाय",
    suspend: "सस्पेंड",
    reactivate: "फिर सक्रिय",
    closeJob: "बंद करें",
    reopenJob: "फिर खोलें",
    verified: "वेरिफ़ाइड",
    pending: "लंबित",
    active: "सक्रिय",
    suspended: "सस्पेंडेड",
    open: "खुली",
    closed: "बंद",
    noOrgs: "अभी कोई संगठन नहीं।",
    noJobs: "अभी कोई नौकरी नहीं।",
    noWorkers: "अभी कोई वर्कर प्रोफाइल नहीं।",
    city: "शहर",
    location: "स्थान",
    phone: "फ़ोन",
    role: "भूमिका",
    company: "कंपनी",
    howToAdmin:
      "एक्सेस देने के लिए: Firebase Console → Firestore → users/{yourUid} में role = \"admin\" और onboardingComplete = true सेट करें।"
  }
};

function formatDate(value) {
  if (!value) return "—";
  const date = value?.toDate?.() ?? (value?.seconds ? new Date(value.seconds * 1000) : null);
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function AdminDashboard({ lang = "en" }) {
  const txt = t[lang] || t.en;
  const { user, profile, loading: authLoading, profileLoading } = useAuth();
  const [tab, setTab] = useState("orgs");
  const [orgs, setOrgs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [appCount, setAppCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [orgList, jobList, workerList, apps] = await Promise.all([
        listAllOrganizations(),
        listAllJobs(),
        listAllCandidates(),
        listAllApplications()
      ]);
      setOrgs(orgList);
      setJobs(jobList);
      setWorkers(workerList);
      setAppCount(apps.length);
    } catch (err) {
      console.error("Admin load failed:", err);
      setError(txt.loadError);
    } finally {
      setLoading(false);
    }
  }, [txt.loadError]);

  useEffect(() => {
    if (authLoading || profileLoading) return;
    if (profile?.role === USER_ROLES.ADMIN) {
      loadAdmin();
    }
  }, [authLoading, profileLoading, profile?.role, loadAdmin]);

  const stats = useMemo(
    () => [
      { key: "orgs", label: txt.statOrgs, value: orgs.length, color: "#2563EB" },
      {
        key: "jobs",
        label: txt.statJobs,
        value: jobs.filter((j) => j.status === "open").length,
        color: "#22C55E"
      },
      { key: "workers", label: txt.statWorkers, value: workers.length, color: "#F97316" },
      { key: "apps", label: txt.statApps, value: appCount, color: "#7C3AED" }
    ],
    [orgs.length, jobs, workers.length, appCount, txt]
  );

  const runAction = async (id, fn, updater) => {
    setBusyId(id);
    setError(null);
    try {
      await fn();
      updater();
    } catch (err) {
      console.error("Admin action failed:", err);
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

  if (profile?.role !== USER_ROLES.ADMIN) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <Shield className="mx-auto mb-4 h-12 w-12 text-[#F97316]" />
        <p className="text-lg font-bold text-[#0F172A]">{txt.adminOnly}</p>
        <p className="mt-3 text-sm text-[#64748B]">{txt.howToAdmin}</p>
        <Link to="/" className="mt-6 inline-block font-semibold text-[#2563EB]">
          {txt.backHome}
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: "orgs", label: txt.tabOrgs },
    { id: "jobs", label: txt.tabJobs },
    { id: "workers", label: txt.tabWorkers }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <Link
            to="/"
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-[#64748B] hover:text-[#2563EB]"
          >
            <ArrowLeft className="h-4 w-4" />
            {txt.backHome}
          </Link>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">{txt.title}</h1>
              <p className="mt-1 text-sm text-[#64748B]">{txt.subtitle}</p>
            </div>
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
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
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

            <div className="flex gap-2 border-b border-[#E2E8F0]">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`px-4 py-2.5 text-sm font-bold transition-colors ${
                    tab === item.id
                      ? "border-b-2 border-[#2563EB] text-[#2563EB]"
                      : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {tab === "orgs" && (
              <section className="space-y-3">
                {orgs.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                    {txt.noOrgs}
                  </p>
                ) : (
                  orgs.map((org) => {
                    const verified = org.verificationStatus === "verified";
                    const suspended = org.status === "suspended";
                    return (
                      <div
                        key={org.id}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <Building2 className="h-4 w-4 text-[#2563EB]" />
                              <h3 className="text-base font-bold text-[#0F172A]">{org.name}</h3>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                  verified
                                    ? "bg-green-50 text-green-700"
                                    : "bg-amber-50 text-amber-700"
                                }`}
                              >
                                {verified ? txt.verified : txt.pending}
                              </span>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                  suspended
                                    ? "bg-red-50 text-red-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {suspended ? txt.suspended : txt.active}
                              </span>
                            </div>
                            <p className="text-sm text-[#64748B]">
                              {displayIndustryLabel(org, lang) || org.industryName || org.industry} ·{" "}
                              {txt.city}: {org.city || "—"} · {formatDate(org.createdAt)}
                            </p>
                            {org.contactPhone ? (
                              <p className="mt-1 text-xs text-[#94A3B8]">
                                {txt.phone}: {org.contactPhone}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {!verified && (
                              <button
                                type="button"
                                disabled={busyId === org.id}
                                onClick={() =>
                                  runAction(org.id, () => verifyOrganization(org.id), () =>
                                    setOrgs((prev) =>
                                      prev.map((o) =>
                                        o.id === org.id
                                          ? { ...o, verificationStatus: "verified" }
                                          : o
                                      )
                                    )
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl bg-[#22C55E] px-3 py-2 text-xs font-bold text-white hover:bg-green-600 disabled:opacity-60"
                              >
                                {busyId === org.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                )}
                                {txt.verify}
                              </button>
                            )}
                            {suspended ? (
                              <button
                                type="button"
                                disabled={busyId === org.id}
                                onClick={() =>
                                  runAction(org.id, () => reactivateOrganization(org.id), () =>
                                    setOrgs((prev) =>
                                      prev.map((o) =>
                                        o.id === org.id ? { ...o, status: "active" } : o
                                      )
                                    )
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#2563EB] hover:border-[#2563EB] disabled:opacity-60"
                              >
                                {busyId === org.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <RotateCcw className="h-3.5 w-3.5" />
                                )}
                                {txt.reactivate}
                              </button>
                            ) : (
                              <button
                                type="button"
                                disabled={busyId === org.id}
                                onClick={() =>
                                  runAction(org.id, () => suspendOrganization(org.id), () =>
                                    setOrgs((prev) =>
                                      prev.map((o) =>
                                        o.id === org.id ? { ...o, status: "suspended" } : o
                                      )
                                    )
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-red-600 hover:border-red-300 disabled:opacity-60"
                              >
                                {busyId === org.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <XCircle className="h-3.5 w-3.5" />
                                )}
                                {txt.suspend}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </section>
            )}

            {tab === "jobs" && (
              <section className="space-y-3">
                {jobs.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                    {txt.noJobs}
                  </p>
                ) : (
                  jobs.map((job) => {
                    const isOpen = job.status === "open";
                    return (
                      <div
                        key={job.id}
                        className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="mb-1 flex flex-wrap items-center gap-2">
                              <Briefcase className="h-4 w-4 text-[#F97316]" />
                              <h3 className="text-base font-bold text-[#0F172A]">
                                {displayRoleLabel(job, lang)}
                              </h3>
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                  isOpen
                                    ? "bg-green-50 text-green-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {isOpen ? txt.open : txt.closed}
                              </span>
                            </div>
                            <p className="text-sm text-[#64748B]">
                              {txt.company}: {job.organizationName || "—"} ·{" "}
                              {displayIndustryLabel(job, lang)}
                            </p>
                            <p className="mt-1 flex items-center gap-1 text-xs text-[#94A3B8]">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location || "—"} · {formatDate(job.createdAt)}
                            </p>
                          </div>
                          {isOpen ? (
                            <button
                              type="button"
                              disabled={busyId === job.id}
                              onClick={() =>
                                runAction(job.id, () => adminCloseJob(job.id), () =>
                                  setJobs((prev) =>
                                    prev.map((j) =>
                                      j.id === job.id ? { ...j, status: "closed" } : j
                                    )
                                  )
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-red-600 hover:border-red-300 disabled:opacity-60"
                            >
                              {busyId === job.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <XCircle className="h-3.5 w-3.5" />
                              )}
                              {txt.closeJob}
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busyId === job.id}
                              onClick={() =>
                                runAction(job.id, () => adminReopenJob(job.id), () =>
                                  setJobs((prev) =>
                                    prev.map((j) =>
                                      j.id === job.id ? { ...j, status: "open" } : j
                                    )
                                  )
                                )
                              }
                              className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#2563EB] hover:border-[#2563EB] disabled:opacity-60"
                            >
                              {busyId === job.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <RotateCcw className="h-3.5 w-3.5" />
                              )}
                              {txt.reopenJob}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </section>
            )}

            {tab === "workers" && (
              <section className="space-y-3">
                {workers.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-10 text-center text-[#64748B]">
                    {txt.noWorkers}
                  </p>
                ) : (
                  workers.map((worker) => (
                    <div
                      key={worker.id}
                      className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                    >
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <User className="h-4 w-4 text-[#2563EB]" />
                        <h3 className="text-base font-bold text-[#0F172A]">
                          {worker.fullName || "—"}
                        </h3>
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                          {displayRoleLabel(worker, lang) || worker.occupation || txt.role}
                        </span>
                      </div>
                      <p className="text-sm text-[#64748B]">
                        {displayIndustryLabel(worker, lang)} · {txt.location}:{" "}
                        {worker.preferredWorkLocation || "—"}
                      </p>
                      <p className="mt-1 flex items-center gap-3 text-xs text-[#94A3B8]">
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {worker.yearsOfExperience || "—"}
                        </span>
                        {worker.phone ? (
                          <span>
                            {txt.phone}: {worker.phone}
                          </span>
                        ) : null}
                        <span>{formatDate(worker.createdAt)}</span>
                      </p>
                    </div>
                  ))
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { AdminDashboard };
