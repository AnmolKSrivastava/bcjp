import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { MapPin, Briefcase, ArrowRight, Search, Mic, MicOff, Loader2, Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "motion/react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { useAuth } from "@/features/auth";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { listOpenJobs } from "@/features/employer/services/jobService";
import { EXPERIENCE_OPTIONS } from "@/features/employer/data/jobOptions";
import {
  applyToJob,
  listCandidateApplications,
  listSavedJobIds,
  saveJob,
  unsaveJob
} from "@/features/profile/services/applicationService";
import { USER_ROLES } from "@/utils/constants";
import {
  TaxonomySelects,
  displayIndustryLabel,
  displayRoleLabel,
  getDepartment,
  getIndustry,
  getRole,
  labelOf,
  taxonomySearchText
} from "@/features/taxonomy";

const copy = {
  en: {
    badge: "Open Roles",
    title: "Find Jobs",
    subtitle: "Filter by industry, city, and experience — or search by voice",
    results: "jobs found",
    searchPlaceholder: "Search by job, company, or keyword…",
    voiceSearch: "Voice Search",
    listening: "Listening…",
    stopListening: "Stop",
    voiceHint: 'Try saying "electrician jobs in Pune"',
    voiceUnsupported: "Voice search needs Chrome or Edge. Please type your search.",
    voicePermission: "Microphone permission is needed for voice search.",
    voiceNoSpeech: "Didn't catch that. Tap Voice Search and try again.",
    voiceError: "Voice search failed. Please type your search.",
    filters: "Filters",
    city: "City",
    cityPlaceholder: "e.g. Pune, Mumbai",
    experience: "Experience",
    experienceAll: "Any experience",
    clearFilters: "Clear filters",
    noResults: "No jobs match your filters.",
    noJobs: "No open jobs yet. Check back soon.",
    loading: "Loading jobs…",
    loadError: "Could not load jobs. Please refresh.",
    apply: "Apply Now",
    applied: "Applied",
    applying: "Applying…",
    save: "Save",
    saved: "Saved",
    viewDetails: "View Details",
    loginToApply: "Please log in to apply.",
    workerOnly: "Only job seekers can apply.",
    profileRequired: "Please create your profile first.",
    applyError: "Could not apply. Please try again.",
    saveError: "Could not save job. Please try again."
  },
  hi: {
    badge: "खुली नौकरियाँ",
    title: "नौकरी खोजें",
    subtitle: "उद्योग, शहर और अनुभव से फ़िल्टर करें — या आवाज़ से खोजें",
    results: "नौकरियाँ मिलीं",
    searchPlaceholder: "नौकरी, कंपनी या कीवर्ड खोजें…",
    voiceSearch: "आवाज़ से खोजें",
    listening: "सुन रहे हैं…",
    stopListening: "रोकें",
    voiceHint: '"पुणे में इलेक्ट्रिशियन की नौकरी" जैसे बोलें',
    voiceUnsupported: "आवाज़ खोज Chrome या Edge में काम करती है। कृपया टाइप करें।",
    voicePermission: "आवाज़ खोज के लिए माइक की अनुमति दें।",
    voiceNoSpeech: "सुनाई नहीं दिया। फिर से आवाज़ खोज दबाएँ।",
    voiceError: "आवाज़ खोज असफल। कृपया टाइप करें।",
    filters: "फ़िल्टर",
    city: "शहर",
    cityPlaceholder: "जैसे पुणे, मुंबई",
    experience: "अनुभव",
    experienceAll: "कोई भी अनुभव",
    clearFilters: "फ़िल्टर हटाएँ",
    noResults: "आपके फ़िल्टर से कोई नौकरी मेल नहीं खाती।",
    noJobs: "अभी कोई खुली नौकरी नहीं है। जल्द वापस देखें।",
    loading: "नौकरियाँ लोड हो रही हैं…",
    loadError: "नौकरियाँ लोड नहीं हो सकीं। कृपया रिफ्रेश करें।",
    apply: "अभी आवेदन करें",
    applied: "आवेदन हो गया",
    applying: "आवेदन हो रहा है…",
    save: "सहेजें",
    saved: "सहेजा गया",
    viewDetails: "विवरण देखें",
    loginToApply: "आवेदन के लिए लॉगिन करें।",
    workerOnly: "केवल नौकरी खोजने वाले आवेदन कर सकते हैं।",
    profileRequired: "कृपया पहले अपनी प्रोफाइल बनाएं।",
    applyError: "आवेदन नहीं हो सका। कृपया पुनः प्रयास करें।",
    saveError: "नौकरी सेव नहीं हो सकी। कृपया पुनः प्रयास करें।"
  }
};

/** Common spoken filler words that shouldn't block keyword matching */
const VOICE_FILLER = new Set([
  "jobs", "job", "in", "at", "for", "near", "the", "a", "an", "please", "find", "search",
  "नौकरी", "नौकरियाँ", "में", "की", "के", "का", "पास", "खोजो", "दिखाओ", "मुझे", "चाहिए"
]);

function normalizeSearchQuery(raw) {
  return String(raw ?? "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term && !VOICE_FILLER.has(term))
    .join(" ");
}

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

const LEGACY_TITLE_VISUALS = {
  Electrician: INDUSTRY_VISUALS.construction,
  Plumber: INDUSTRY_VISUALS.construction,
  Welder: INDUSTRY_VISUALS.construction,
  "Factory Worker": INDUSTRY_VISUALS.manufacturing,
  Cook: INDUSTRY_VISUALS.restaurant,
  Housekeeping: INDUSTRY_VISUALS.hospital,
  "Delivery Executive": INDUSTRY_VISUALS.retail,
  Driver: INDUSTRY_VISUALS.legacy,
  "Security Guard": INDUSTRY_VISUALS.legacy,
  Other: INDUSTRY_VISUALS.legacy
};

function formatSalary(job, lang) {
  const min = Number(job.salaryMin) || 0;
  const max = Number(job.salaryMax) || 0;
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `${fmt(min)}+`;
  if (max) return fmt(max);
  return "—";
}

function jobTypeLabel(type, lang) {
  return TYPE_LABELS[type]?.[lang] ?? type;
}

function jobVisual(job) {
  if (job?.industryId && INDUSTRY_VISUALS[job.industryId]) {
    return INDUSTRY_VISUALS[job.industryId];
  }
  return LEGACY_TITLE_VISUALS[job?.title] ?? INDUSTRY_VISUALS.legacy;
}

function buildJobSearchParams({ industryId, departmentId, roleId, city, experience }) {
  const next = {};
  if (industryId) next.industry = industryId;
  if (departmentId) next.department = departmentId;
  if (roleId) next.role = roleId;
  if (city) next.city = city;
  if (experience) next.experience = experience;
  return next;
}

function JobsPage({
  lang,
  browseMode = null,
  onBrowseModeHandled,
  onLoginClick,
  onCreateProfileClick
}) {
  const txt = copy[lang];
  const { user, profile, candidateProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const industryFilter = searchParams.get("industry") || "";
  const departmentFilter = searchParams.get("department") || "";
  const roleFilter = searchParams.get("role") || "";
  const cityFilter = searchParams.get("city") || "";
  const experienceFilter = searchParams.get("experience") || "";
  const searchInputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [cityInput, setCityInput] = useState(cityFilter);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [savedByJobId, setSavedByJobId] = useState({});
  const [actionJobId, setActionJobId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [voiceError, setVoiceError] = useState(null);

  useEffect(() => {
    setCityInput(cityFilter);
  }, [cityFilter]);

  const handleVoiceResult = useCallback((text) => {
    setQuery(text);
    setVoiceError(null);
  }, []);

  const handleVoiceError = useCallback(
    (code) => {
      if (code === "unsupported" || code === "start-failed") {
        setVoiceError(txt.voiceUnsupported);
      } else if (code === "not-allowed" || code === "service-not-allowed") {
        setVoiceError(txt.voicePermission);
      } else if (code === "no-speech") {
        setVoiceError(txt.voiceNoSpeech);
      } else {
        setVoiceError(txt.voiceError);
      }
    },
    [txt.voiceUnsupported, txt.voicePermission, txt.voiceNoSpeech, txt.voiceError]
  );

  const {
    supported: voiceSupported,
    listening: voiceListening,
    interimTranscript,
    start: startSpeech,
    stop: stopSpeech
  } = useSpeechRecognition({
    lang,
    onResult: handleVoiceResult,
    onError: handleVoiceError
  });

  const loadJobs = useCallback(async () => {
    if (!isFirebaseConfigured) {
      setJobs([]);
      setLoading(false);
      setLoadError(txt.loadError);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const openJobs = await listOpenJobs();
      setJobs(openJobs);
    } catch (err) {
      console.error("Failed to load jobs:", err);
      setLoadError(txt.loadError);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [txt.loadError]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    let cancelled = false;
    async function loadWorkerState() {
      if (!user || profile?.role !== USER_ROLES.WORKER) {
        setAppliedJobIds(new Set());
        setSavedByJobId({});
        return;
      }
      try {
        const [apps, saved] = await Promise.all([
          listCandidateApplications(user.uid),
          listSavedJobIds(user.uid)
        ]);
        if (cancelled) return;
        setAppliedJobIds(new Set(apps.map((a) => a.jobId)));
        const map = {};
        saved.forEach((s) => {
          map[s.jobId] = s.id;
        });
        setSavedByJobId(map);
      } catch (err) {
        console.error("Failed to load worker job state:", err);
      }
    }
    loadWorkerState();
    return () => {
      cancelled = true;
    };
  }, [user, profile?.role]);

  useEffect(() => {
    if (!browseMode) return;
    const timer = window.setTimeout(() => {
      if (browseMode === "type") {
        searchInputRef.current?.focus({ preventScroll: true });
      } else if (browseMode === "voice") {
        setVoiceError(null);
        startSpeech();
      }
      onBrowseModeHandled?.();
    }, 400);
    return () => window.clearTimeout(timer);
  }, [browseMode, onBrowseModeHandled, startSpeech]);

  const toggleVoiceSearch = () => {
    setVoiceError(null);
    if (voiceListening) {
      stopSpeech();
      return;
    }
    startSpeech();
  };

  const handleApply = async (job) => {
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
    setActionJobId(job.id);
    try {
      const result = await applyToJob({
        candidateId: user.uid,
        job,
        candidateName: candidateProfile?.fullName || profile?.displayName || "",
        candidatePhone: user.phoneNumber || candidateProfile?.phone || ""
      });
      setAppliedJobIds((prev) => new Set([...prev, job.id]));
      if (result.alreadyApplied) {
        // already marked applied
      }
    } catch (err) {
      console.error("Apply failed:", err);
      setActionError(txt.applyError);
    } finally {
      setActionJobId(null);
    }
  };

  const handleSaveToggle = async (job) => {
    setActionError(null);
    if (!user) {
      onLoginClick?.();
      return;
    }
    if (profile?.role !== USER_ROLES.WORKER) {
      setActionError(txt.workerOnly);
      return;
    }
    setActionJobId(`save-${job.id}`);
    try {
      const existingId = savedByJobId[job.id];
      if (existingId) {
        await unsaveJob(existingId);
        setSavedByJobId((prev) => {
          const next = { ...prev };
          delete next[job.id];
          return next;
        });
      } else {
        const saved = await saveJob({ candidateId: user.uid, job });
        setSavedByJobId((prev) => ({ ...prev, [job.id]: saved.id }));
      }
    } catch (err) {
      console.error("Save failed:", err);
      setActionError(txt.saveError);
    } finally {
      setActionJobId(null);
    }
  };

  const updateFilters = (patch) => {
    setSearchParams(
      buildJobSearchParams({
        industryId: industryFilter,
        departmentId: departmentFilter,
        roleId: roleFilter,
        city: cityFilter,
        experience: experienceFilter,
        ...patch
      }),
      { replace: true }
    );
  };

  const clearAllFilters = () => {
    setCityInput("");
    setQuery("");
    setSearchParams({}, { replace: true });
  };

  const handleCityCommit = () => {
    const city = cityInput.trim();
    updateFilters({ city });
  };

  const hasActiveFilters = Boolean(
    industryFilter || departmentFilter || roleFilter || cityFilter || experienceFilter || query.trim()
  );

  const normalizedQuery = normalizeSearchQuery(query);
  const normalizedCity = cityFilter.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    if (industryFilter && job.industryId !== industryFilter) return false;
    if (departmentFilter && job.departmentId !== departmentFilter) return false;
    if (roleFilter && job.roleId !== roleFilter) return false;
    if (experienceFilter && job.experienceRequired !== experienceFilter) return false;
    if (normalizedCity) {
      const loc = String(job.location || "").toLowerCase();
      if (!loc.includes(normalizedCity)) return false;
    }
    if (!normalizedQuery) return true;
    const haystack = [
      taxonomySearchText(job, lang),
      taxonomySearchText(job, "en"),
      job.organizationName,
      job.location,
      job.employmentType,
      job.experienceRequired,
      ...(job.skills ?? [])
    ]
      .join(" ")
      .toLowerCase();
    return normalizedQuery.split(/\s+/).every((term) => haystack.includes(term));
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="px-4 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="inline-block bg-blue-50 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-100">
            {txt.badge}
          </span>
          <h1 className="text-4xl font-extrabold text-[#0F172A]">{txt.title}</h1>
          <p className="text-[#64748B] mt-2">{txt.subtitle}</p>
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {industryFilter && (
                <span className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-sm font-semibold text-[#F97316]">
                  {labelOf(getIndustry(industryFilter), lang)}
                </span>
              )}
              {departmentFilter && (
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-semibold text-[#2563EB]">
                  {labelOf(getDepartment(industryFilter, departmentFilter), lang) || departmentFilter}
                </span>
              )}
              {roleFilter && (
                <span className="rounded-full border border-green-100 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {labelOf(getRole(industryFilter, departmentFilter, roleFilter), lang) || roleFilter}
                </span>
              )}
              {cityFilter && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-[#0F172A]">
                  {cityFilter}
                </span>
              )}
              {experienceFilter && (
                <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
                  {EXPERIENCE_OPTIONS.find((o) => o.en === experienceFilter)?.[lang] || experienceFilter}
                </span>
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-sm font-semibold text-[#2563EB] hover:underline"
              >
                {txt.clearFilters}
              </button>
            </div>
          )}
          {!loading && !loadError && (
            <p className="mt-3 text-sm font-semibold text-[#64748B]">
              {filteredJobs.length} {txt.results}
            </p>
          )}
        </div>

        <div className="mb-10 space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={20}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={txt.searchPlaceholder}
                className="w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] py-3.5 pl-12 pr-4 text-base text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-colors focus:border-[#2563EB] focus:bg-white"
              />
            </div>
            <button
              type="button"
              onClick={toggleVoiceSearch}
              aria-pressed={voiceListening}
              className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold text-white transition-all sm:min-w-[11rem] ${
                voiceListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-[#F97316] hover:bg-orange-500"
              }`}
            >
              {voiceListening ? <MicOff size={20} /> : <Mic size={20} />}
              {voiceListening ? txt.stopListening : txt.voiceSearch}
            </button>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#94A3B8]">
              {txt.filters}
            </p>
            <TaxonomySelects
              form={{
                industryId: industryFilter,
                departmentId: departmentFilter,
                roleId: roleFilter
              }}
              onChange={({ industryId, departmentId, roleId }) =>
                updateFilters({ industryId, departmentId, roleId })
              }
              lang={lang}
              optional
              layout="row"
              idPrefix="jobFilter"
            />
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="jobFilterCity" className="text-xs font-semibold text-[#0F172A] sm:text-sm">
                  {txt.city}
                </label>
                <input
                  id="jobFilterCity"
                  type="text"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onBlur={handleCityCommit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCityCommit();
                    }
                  }}
                  placeholder={txt.cityPlaceholder}
                  className="flex h-11 w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#2563EB] focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="jobFilterExperience"
                  className="text-xs font-semibold text-[#0F172A] sm:text-sm"
                >
                  {txt.experience}
                </label>
                <select
                  id="jobFilterExperience"
                  value={experienceFilter}
                  onChange={(e) => updateFilters({ experience: e.target.value })}
                  className="flex h-11 w-full rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 text-sm text-[#0F172A] outline-none transition-colors focus:border-[#2563EB] focus:bg-white"
                >
                  <option value="">{txt.experienceAll}</option>
                  {EXPERIENCE_OPTIONS.map((option) => (
                    <option key={option.en} value={option.en}>
                      {option[lang] || option.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {voiceListening && (
            <p className="flex items-center gap-2 text-sm font-medium text-[#F97316]">
              <Loader2 size={14} className="animate-spin" />
              {txt.listening}
              {interimTranscript ? ` “${interimTranscript}”` : ""}
            </p>
          )}
          {!voiceListening && (
            <p className="text-sm text-[#94A3B8]">
              {voiceSupported ? txt.voiceHint : txt.voiceUnsupported}
            </p>
          )}
          {voiceError && <p className="text-sm text-red-600">{voiceError}</p>}
        </div>

        {actionError && (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{actionError}</p>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-6 py-16 text-[#64748B]">
            <Loader2 className="h-5 w-5 animate-spin text-[#2563EB]" />
            {txt.loading}
          </div>
        ) : loadError ? (
          <p className="rounded-2xl border border-dashed border-red-200 bg-white px-6 py-12 text-center text-red-600">
            {loadError}
          </p>
        ) : filteredJobs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-12 text-center text-[#64748B]">
            {jobs.length === 0 ? txt.noJobs : txt.noResults}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredJobs.map((job, i) => {
              const visual = jobVisual(job);
              const isApplied = appliedJobIds.has(job.id);
              const isSaved = Boolean(savedByJobId[job.id]);
              const applying = actionJobId === job.id;
              const saving = actionJobId === `save-${job.id}`;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="flex items-center gap-4 min-w-0"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: visual.color }}
                      >
                        {visual.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                          {displayRoleLabel(job, lang)}
                        </h3>
                        <p className="text-sm text-[#64748B] truncate">{job.organizationName}</p>
                        {displayIndustryLabel(job, lang) && (
                          <p className="text-xs text-[#94A3B8] truncate">
                            {displayIndustryLabel(job, lang)}
                          </p>
                        )}
                      </div>
                    </Link>
                    <span className="shrink-0 text-xs font-bold px-3 py-1 rounded-full border bg-green-50 text-green-600 border-green-100">
                      {jobTypeLabel(job.employmentType, lang)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                      <MapPin size={14} className="text-[#2563EB]" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                      <Briefcase size={14} className="text-[#F97316]" />
                      {jobTypeLabel(job.employmentType, lang)}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#22C55E]">
                      {formatSalary(job, lang)}
                      {lang === "hi" ? "/माह" : "/mo"}
                    </div>
                  </div>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB] hover:gap-2 transition-all"
                  >
                    {txt.viewDetails} <ArrowRight size={14} />
                  </Link>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleApply(job)}
                      disabled={isApplied || applying}
                      className="flex-1 flex items-center justify-center gap-2 bg-[#2563EB] text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors hover:shadow-lg hover:shadow-blue-200 disabled:cursor-not-allowed disabled:bg-[#94A3B8]"
                    >
                      {applying ? <Loader2 size={16} className="animate-spin" /> : null}
                      {isApplied ? txt.applied : applying ? txt.applying : txt.apply}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveToggle(job)}
                      disabled={saving}
                      className={`px-4 py-3 border-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${isSaved ? "border-[#2563EB] text-[#2563EB] bg-blue-50" : "border-[#E2E8F0] text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB]"}`}
                    >
                      {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : isSaved ? (
                        <BookmarkCheck size={16} />
                      ) : (
                        <Bookmark size={16} />
                      )}
                      {isSaved ? txt.saved : txt.save}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      </section>
    </div>
  );
}

export { JobsPage };
