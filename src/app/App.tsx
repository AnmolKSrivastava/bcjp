import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { LanguageModal } from "@/shared/common/LanguageModal";
import { LoginModal } from "@/features/auth";
import { CreateProfileModal } from "@/features/profile";
import { Navbar } from "@/shared/layout/Navbar";
import { Footer } from "@/shared/layout/Footer";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { JobCategories } from "@/features/landing/components/JobCategories";
import { FeaturedJobs, type JobBrowseMode } from "@/features/landing/components/FeaturedJobs";
import { LanguageSection } from "@/features/landing/components/LanguageSection";
import { EmployerSection } from "@/features/landing/components/EmployerSection";
import { SuccessStories } from "@/features/landing/components/SuccessStories";
import { CTABanner } from "@/features/landing/components/CTABanner";

export default function App() {
  const [lang, setLang] = useState<"hi" | "en" | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [jobBrowseMode, setJobBrowseMode] = useState<JobBrowseMode>(null);

  const scrollToJobs = (mode: JobBrowseMode) => {
    setJobBrowseMode(mode);
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToEmployers = () => {
    document.getElementById("employers")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLangSelect = (selected: "hi" | "en") => {
    setLang(selected);
    localStorage.setItem("kaamsetu-lang", selected);
  };

  const toggleLang = () => {
    const next = lang === "hi" ? "en" : "hi";
    setLang(next);
    localStorage.setItem("kaamsetu-lang", next);
  };

  // Check if language was previously chosen
  useEffect(() => {
    const saved = localStorage.getItem("kaamsetu-lang") as "hi" | "en" | null;
    if (saved) setLang(saved);
  }, []);

  const activeLang = lang ?? "en";

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <AnimatePresence>
        {!lang && (
          <LanguageModal key="modal" onSelect={handleLangSelect} />
        )}
      </AnimatePresence>

      {lang && (
        <>
          <Navbar
            lang={activeLang}
            onLangToggle={toggleLang}
            onLoginClick={() => setLoginOpen(true)}
            onCreateProfileClick={() => setProfileOpen(true)}
          />
          <LoginModal
            open={loginOpen}
            onOpenChange={setLoginOpen}
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
              onCreateProfileClick={() => setProfileOpen(true)}
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
              onCreateProfileClick={() => setProfileOpen(true)}
            />
          </main>
          <Footer lang={activeLang} />
        </>
      )}
    </div>
  );
}
