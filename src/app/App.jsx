import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { AnimatePresence } from "motion/react";
import { LanguageModal } from "@/shared/common/LanguageModal";
import { LoginModal, RoleSelectionModal, useAuth } from "@/features/auth";
import { RECAPTCHA_CONTAINER_ID } from "@/features/auth/hooks/usePhoneAuth";
import { CreateProfileModal, WorkerDashboard } from "@/features/profile";
import { CreateCompanyModal, PostJobModal, EmployerDashboard } from "@/features/employer";
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
  jobBrowseMode,
  setJobBrowseMode,
  onLoginClick
}) {
  const scrollToJobs = (mode) => {
    setJobBrowseMode(mode);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>
      <main>
        <HeroSection
          lang={lang}
          onCreateProfileClick={onCreateProfileClick}
          onPostJobClick={onPostJobClick}
          onBrowseJobsClick={() => scrollToJobs("type")}
          onVoiceBrowseClick={() => scrollToJobs("voice")}
        />
        <HowItWorks lang={lang} />
        <JobCategories lang={lang} />
        <FeaturedJobs
          lang={lang}
          browseMode={jobBrowseMode}
          onBrowseModeHandled={() => setJobBrowseMode(null)}
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

function App() {
  const navigate = useNavigate();
  const { user, profile, needsOnboarding, needsCandidateProfile, needsEmployerProfile } = useAuth();
  const [lang, setLang] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [jobBrowseMode, setJobBrowseMode] = useState(null);

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
    setPostJobOpen(true);
  };

  const handleDashboardClick = () => {
    if (!user) {
      setLoginOpen(true);
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
            showPostJob={profile?.role === USER_ROLES.EMPLOYER && profile.onboardingComplete}
            showDashboard={
              (profile?.role === USER_ROLES.EMPLOYER || profile?.role === USER_ROLES.WORKER) &&
              Boolean(profile?.onboardingComplete)
            }
          />
          <LoginModal open={loginOpen} onOpenChange={setLoginOpen} lang={activeLang} />
          <RoleSelectionModal open={needsOnboarding} lang={activeLang} />
          <CreateProfileModal open={profileOpen} onOpenChange={setProfileOpen} lang={activeLang} />
          <CreateCompanyModal open={companyOpen} onOpenChange={setCompanyOpen} lang={activeLang} />
          <PostJobModal open={postJobOpen} onOpenChange={setPostJobOpen} lang={activeLang} />

          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  lang={activeLang}
                  onCreateProfileClick={handleCreateProfileClick}
                  onPostJobClick={handlePostJobClick}
                  jobBrowseMode={jobBrowseMode}
                  setJobBrowseMode={setJobBrowseMode}
                  onLoginClick={() => setLoginOpen(true)}
                />
              }
            />
            <Route
              path="/employer/dashboard"
              element={
                <EmployerDashboard
                  lang={activeLang}
                  onPostJobClick={handlePostJobClick}
                  onSetupCompanyClick={handleSetupCompanyClick}
                />
              }
            />
            <Route
              path="/worker/dashboard"
              element={
                <WorkerDashboard
                  lang={activeLang}
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
