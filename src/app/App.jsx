import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";
import { AnimatePresence } from "motion/react";
import { LanguageModal } from "@/shared/common/LanguageModal";
import { LoginModal, RoleSelectionModal, useAuth } from "@/features/auth";
import { RECAPTCHA_CONTAINER_ID } from "@/features/auth/hooks/usePhoneAuth";
import { CreateProfileModal, WorkerDashboard } from "@/features/profile";
import { CreateCompanyModal, PostJobModal, EmployerDashboard } from "@/features/employer";
import { AdminDashboard, AdminLoginPage } from "@/features/admin";
import { JobDetailsPage, JobsPage } from "@/features/jobs";
import { IndustriesPage, IndustryDetailPage } from "@/features/industries";
import { Navbar } from "@/shared/layout/Navbar";
import { Footer } from "@/shared/layout/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { JobCategories } from "@/features/landing/components/JobCategories";
import { FeaturedJobs } from "@/features/landing/components/FeaturedJobs";
import { LanguageSection } from "@/features/landing/components/LanguageSection";
import { EmployerSection } from "@/features/landing/components/EmployerSection";
import { SuccessStories } from "@/features/landing/components/SuccessStories";
import { CTABanner } from "@/features/landing/components/CTABanner";
import { STORAGE_KEYS, USER_ROLES } from "@/utils/constants";

function LandingPage({
  lang,
  onCreateProfileClick,
  onPostJobClick,
  onLoginClick
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasJobFilters =
      params.has("industry") ||
      params.has("department") ||
      params.has("role") ||
      params.has("city") ||
      params.has("experience");
    if (hasJobFilters || location.hash === "#jobs") {
      navigate(`/jobs${location.search}`, { replace: true });
      return;
    }
    if (location.hash === "#categories") {
      navigate("/industries", { replace: true });
    }
  }, [location.search, location.hash, navigate]);

  const goToJobs = (mode) => {
    navigate("/jobs", { state: mode ? { browseMode: mode } : undefined });
  };
  const handleIndustryClick = (industryId) => {
    navigate(`/industries/${industryId}`);
  };
  return (
    <>
      <main>
        <HeroSection
          lang={lang}
          onCreateProfileClick={onCreateProfileClick}
          onPostJobClick={onPostJobClick}
          onBrowseJobsClick={() => goToJobs("type")}
          onVoiceBrowseClick={() => goToJobs("voice")}
          onIndustryClick={handleIndustryClick}
        />
        <HowItWorks lang={lang} />
        <JobCategories lang={lang} />
        <FeaturedJobs
          lang={lang}
          onLoginClick={onLoginClick}
          onCreateProfileClick={onCreateProfileClick}
        />
        <LanguageSection lang={lang} />
        <EmployerSection lang={lang} />
        <SuccessStories lang={lang} />
        <CTABanner lang={lang} onCreateProfileClick={onCreateProfileClick} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

function JobsRoute({ lang, onLoginClick, onCreateProfileClick }) {
  const location = useLocation();
  const [browseMode, setBrowseMode] = useState(location.state?.browseMode ?? null);

  useEffect(() => {
    if (location.state?.browseMode) {
      setBrowseMode(location.state.browseMode);
    }
  }, [location.state]);

  return (
    <>
      <JobsPage
        lang={lang}
        browseMode={browseMode}
        onBrowseModeHandled={() => setBrowseMode(null)}
        onLoginClick={onLoginClick}
        onCreateProfileClick={onCreateProfileClick}
      />
      <Footer lang={lang} />
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const { user, profile, needsOnboarding, needsCandidateProfile, needsEmployerProfile } = useAuth();
  const [lang, setLang] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobsVersion, setJobsVersion] = useState(0);

  const scrollToEmployers = () => {
    document.getElementById("employers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLangSelect = (selected) => {
    setLang(selected);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, selected);
  };

  const toggleLang = () => {
    const next = lang === "hi" ? "en" : "hi";
    setLang(next);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, next);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    if (needsCandidateProfile && !needsOnboarding) {
      setProfileOpen(true);
    }
  }, [needsCandidateProfile, needsOnboarding]);

  useEffect(() => {
    if (needsEmployerProfile && !needsOnboarding) {
      setCompanyOpen(true);
    }
  }, [needsEmployerProfile, needsOnboarding]);

  const handleCreateProfileClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (profile?.role === USER_ROLES.EMPLOYER) return;
    setProfileOpen(true);
  };

  const handleSetupCompanyClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (profile?.role !== USER_ROLES.EMPLOYER) return;
    setCompanyOpen(true);
  };

  const handlePostJobClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (profile?.role !== USER_ROLES.EMPLOYER) {
      scrollToEmployers();
      return;
    }
    if (!profile.onboardingComplete) {
      setCompanyOpen(true);
      return;
    }
    setEditingJob(null);
    setPostJobOpen(true);
  };

  const handleEditJobClick = (job) => {
    if (!user || profile?.role !== USER_ROLES.EMPLOYER) return;
    setEditingJob(job);
    setPostJobOpen(true);
  };

  const handlePostJobOpenChange = (open) => {
    setPostJobOpen(open);
    if (!open) setEditingJob(null);
  };

  const handleJobSaved = () => {
    setJobsVersion((v) => v + 1);
  };

  const handleDashboardClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (profile?.role === USER_ROLES.ADMIN) {
      navigate("/admin");
      return;
    }
    if (profile?.role === USER_ROLES.EMPLOYER) {
      navigate("/employer/dashboard");
      return;
    }
    if (profile?.role === USER_ROLES.WORKER) {
      navigate("/worker/dashboard");
    }
  };

  const activeLang = lang ?? "en";

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <div
        id={RECAPTCHA_CONTAINER_ID}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0"
      />
      <AnimatePresence>
        {!lang && <LanguageModal key="modal" onSelect={handleLangSelect} />}
      </AnimatePresence>

      {lang && (
        <>
          <Navbar
            lang={activeLang}
            onLangToggle={toggleLang}
            onLoginClick={() => setLoginOpen(true)}
            onCreateProfileClick={handleCreateProfileClick}
            onSetupCompanyClick={handleSetupCompanyClick}
            onPostJobClick={handlePostJobClick}
            onDashboardClick={handleDashboardClick}
            showCreateProfile={!profile || profile.role === USER_ROLES.WORKER}
            showSetupCompany={profile?.role === USER_ROLES.EMPLOYER && !profile.onboardingComplete}
            showPostJob={!profile || (profile?.role === USER_ROLES.EMPLOYER && profile.onboardingComplete)}
            showDashboard={
              (profile?.role === USER_ROLES.EMPLOYER ||
                profile?.role === USER_ROLES.WORKER ||
                profile?.role === USER_ROLES.ADMIN) &&
              Boolean(profile?.onboardingComplete || profile?.role === USER_ROLES.ADMIN)
            }
            profileComplete={
              profile?.role === USER_ROLES.WORKER && Boolean(profile?.onboardingComplete)
            }
          />
          <LoginModal open={loginOpen} onOpenChange={setLoginOpen} lang={activeLang} />
          <RoleSelectionModal open={needsOnboarding} lang={activeLang} />
          <CreateProfileModal open={profileOpen} onOpenChange={setProfileOpen} lang={activeLang} />
          <CreateCompanyModal open={companyOpen} onOpenChange={setCompanyOpen} lang={activeLang} />
          <PostJobModal
            open={postJobOpen}
            onOpenChange={handlePostJobOpenChange}
            lang={activeLang}
            job={editingJob}
            onComplete={handleJobSaved}
          />

          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  lang={activeLang}
                  onCreateProfileClick={handleCreateProfileClick}
                  onPostJobClick={handlePostJobClick}
                  onLoginClick={() => setLoginOpen(true)}
                />
              }
            />
            <Route
              path="/industries"
              element={<IndustriesPage lang={activeLang} />}
            />
            <Route
              path="/industries/:industryId"
              element={<IndustryDetailPage lang={activeLang} />}
            />
            <Route
              path="/admin/login"
              element={<AdminLoginPage lang={activeLang} />}
            />
            <Route
              path="/admin"
              element={<AdminDashboard lang={activeLang} />}
            />
            <Route
              path="/employer/dashboard"
              element={
                <EmployerDashboard
                  lang={activeLang}
                  onPostJobClick={handlePostJobClick}
                  onSetupCompanyClick={handleSetupCompanyClick}
                  onEditJobClick={handleEditJobClick}
                  jobsVersion={jobsVersion}
                />
              }
            />
            <Route
              path="/worker/dashboard"
              element={
                <WorkerDashboard
                  lang={activeLang}
                  onCreateProfileClick={handleCreateProfileClick}
                  onEditProfileClick={handleCreateProfileClick}
                />
              }
            />
            <Route
              path="/jobs"
              element={
                <JobsRoute
                  lang={activeLang}
                  onLoginClick={() => setLoginOpen(true)}
                  onCreateProfileClick={handleCreateProfileClick}
                />
              }
            />
            <Route
              path="/jobs/:jobId"
              element={
                <JobDetailsPage
                  lang={activeLang}
                  onLoginClick={() => setLoginOpen(true)}
                  onCreateProfileClick={handleCreateProfileClick}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
