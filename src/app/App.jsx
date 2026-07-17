import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { LanguageModal } from "@/shared/common/LanguageModal";
import { LoginModal, RoleSelectionModal, useAuth } from "@/features/auth";
import { RECAPTCHA_CONTAINER_ID } from "@/features/auth/hooks/usePhoneAuth";
import { CreateProfileModal } from "@/features/profile";
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

function App() {
  const { user, profile, needsOnboarding, needsCandidateProfile } = useAuth();
  const [lang, setLang] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [jobBrowseMode, setJobBrowseMode] = useState(null);
  const scrollToJobs = (mode) => {
    setJobBrowseMode(mode);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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

  const handleCreateProfileClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (profile?.role === USER_ROLES.EMPLOYER) return;
    setProfileOpen(true);
  };

  const activeLang = lang ?? "en";
  return <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {
    /* Invisible reCAPTCHA host — must exist in DOM; never use display:none */
  }
      <div
    id={RECAPTCHA_CONTAINER_ID}
    aria-hidden="true"
    className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0"
  />
      <AnimatePresence>
        {!lang && <LanguageModal key="modal" onSelect={handleLangSelect} />}
      </AnimatePresence>

      {lang && <>
          <Navbar
    lang={activeLang}
    onLangToggle={toggleLang}
    onLoginClick={() => setLoginOpen(true)}
    onCreateProfileClick={handleCreateProfileClick}
    showCreateProfile={!profile || profile.role === USER_ROLES.WORKER}
  />
          <LoginModal
    open={loginOpen}
    onOpenChange={setLoginOpen}
    lang={activeLang}
  />
          <RoleSelectionModal
    open={needsOnboarding}
    lang={activeLang}
  />
          <CreateProfileModal
    open={profileOpen}
    onOpenChange={setProfileOpen}
    lang={activeLang}
  />
          <main>
            <HeroSection
    lang={activeLang}
    onCreateProfileClick={handleCreateProfileClick}
    onPostJobClick={scrollToEmployers}
    onBrowseJobsClick={() => scrollToJobs("type")}
    onVoiceBrowseClick={() => scrollToJobs("voice")}
  />
            <HowItWorks lang={activeLang} />
            <JobCategories lang={activeLang} />
            <FeaturedJobs
    lang={activeLang}
    browseMode={jobBrowseMode}
    onBrowseModeHandled={() => setJobBrowseMode(null)}
  />
            <LanguageSection lang={activeLang} />
            <EmployerSection lang={activeLang} />
            <SuccessStories lang={activeLang} />
            <CTABanner
    lang={activeLang}
    onCreateProfileClick={handleCreateProfileClick}
  />
          </main>
          <Footer lang={activeLang} />
        </>}
    </div>;
}
export {
  App as default
};
