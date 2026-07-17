import { useState } from "react";
import { Mic, Menu, User, LogOut, Building2, Briefcase, LayoutDashboard } from "lucide-react";
import logo from "@/assets/Just_logo.jpg";
import { useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/lib/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/lib/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/lib/ui/avatar";
import { useAuth } from "@/features/auth";
const t = {
  en: {
    findJobs: "Find Jobs",
    categories: "Categories",
    forEmployers: "For Employers",
    successStories: "Success Stories",
    aboutUs: "About Us",
    login: "Login",
    createProfile: "Create Profile",
    setupCompany: "Setup Company",
    postJob: "Post a Job",
    dashboard: "Dashboard",
    menu: "Menu",
    switchLang: "Switch to Hindi",
    myAccount: "My Account",
    logout: "Logout",
    roleWorker: "Job Seeker",
    roleEmployer: "Employer"
  },
  hi: {
    findJobs: "नौकरी खोजें",
    categories: "श्रेणियाँ",
    forEmployers: "नियोक्ताओं के लिए",
    successStories: "सफलता की कहानियाँ",
    aboutUs: "हमारे बारे में",
    login: "लॉगिन",
    createProfile: "प्रोफाइल बनाएं",
    setupCompany: "कंपनी सेटअप",
    postJob: "नौकरी पोस्ट करें",
    dashboard: "डैशबोर्ड",
    menu: "मेनू",
    switchLang: "अंग्रेज़ी में बदलें",
    myAccount: "मेरा खाता",
    logout: "लॉगआउट",
    roleWorker: "नौकरी खोजने वाले",
    roleEmployer: "नियोक्ता"
  }
};
const navLinks = [
  { key: "findJobs", id: "jobs" },
  { key: "categories", id: "categories" },
  { key: "forEmployers", id: "employers" },
  { key: "successStories", id: "stories" },
  { key: "aboutUs", id: "cta" }
];
function AccountMenu({ txt, phone, roleLabel, onSignOut, onDashboardClick, showDashboard, triggerClassName }) {
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" aria-label={txt.myAccount} className={triggerClassName}>
          <Avatar className="size-9">
            <AvatarFallback className="bg-[#2563EB] text-white">
              <User size={18} />
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-bold text-[#0F172A]">{phone}</p>
          {roleLabel && <p className="text-xs font-medium text-[#64748B]">{roleLabel}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {showDashboard && <DropdownMenuItem
    onClick={onDashboardClick}
    className="cursor-pointer"
  >
          <LayoutDashboard className="size-4" />
          {txt.dashboard}
        </DropdownMenuItem>}
        <DropdownMenuItem
    onClick={onSignOut}
    className="cursor-pointer text-red-600 focus:text-red-600"
  >
          <LogOut className="size-4" />
          {txt.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}
function Navbar({ lang, onLangToggle, onLoginClick, onCreateProfileClick, onSetupCompanyClick, onPostJobClick, onDashboardClick, showCreateProfile = true, showSetupCompany = false, showPostJob = false, showDashboard = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const txt = t[lang];
  const { user, profile, signOut } = useAuth();
  const isLoggedIn = Boolean(user);
  const roleLabel = profile?.role === "employer" ? txt.roleEmployer : profile?.role === "worker" ? txt.roleWorker : null;
  const scrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };
  const goHome = () => {
    navigate("/");
    setMenuOpen(false);
  };
  const handleLangToggle = () => {
    onLangToggle();
    setMenuOpen(false);
  };
  return <>
      <nav className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {
    /* Left: hamburger (mobile) + logo */
  }
            <div className="flex items-center gap-1 sm:gap-2 min-w-0">
              <button
    type="button"
    aria-label={txt.menu}
    aria-expanded={menuOpen}
    aria-controls="mobile-nav-menu"
    className="lg:hidden shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-[#0F172A] hover:bg-[#F8FAFC] transition-colors"
    onClick={() => setMenuOpen(true)}
  >
                <Menu size={22} />
              </button>

              <div
    className="flex items-center gap-2 cursor-pointer min-w-0"
    onClick={goHome}
  >
                <img
    src={logo}
    alt="Bharat Gig"
    className="h-9 w-auto shrink-0 block -translate-y-1"
  />
                <span className="text-xl font-bold text-[#0F172A] truncate">
                  Bharat<span className="text-[#2563EB]">Gig</span>
                </span>
              </div>
            </div>

            {
    /* Desktop nav — unchanged */
  }
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((item) => <button
    key={item.id}
    onClick={() => scrollTo(item.id)}
    className="text-[#64748B] hover:text-[#2563EB] font-medium text-sm transition-colors"
  >
                  {txt[item.key]}
                </button>)}
            </div>

            {
    /* Desktop actions — unchanged */
  }
            <div className="hidden lg:flex items-center gap-3">
              <button
    onClick={onLangToggle}
    className="flex items-center gap-1 text-sm font-medium text-[#64748B] hover:text-[#2563EB] border border-[#E2E8F0] rounded-full px-3 py-1.5 transition-colors"
  >
                🌐 {lang === "hi" ? "हिन्दी | EN" : "हिन्दी | EN"}
              </button>
              {isLoggedIn ? <AccountMenu
    txt={txt}
    phone={user.phoneNumber}
    roleLabel={roleLabel}
    onSignOut={signOut}
    onDashboardClick={onDashboardClick}
    showDashboard={showDashboard}
    triggerClassName="flex items-center justify-center rounded-full transition-transform hover:scale-105"
  /> : <button
    onClick={onLoginClick}
    className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors px-3 py-2"
  >
                {txt.login}
              </button>}
              {showCreateProfile && <button
    onClick={onCreateProfileClick}
    className="flex items-center gap-2 bg-[#F97316] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-500 transition-all hover:shadow-lg hover:shadow-orange-200"
  >
                🎤 {txt.createProfile}
              </button>}
              {showSetupCompany && <button
    onClick={onSetupCompanyClick}
    className="flex items-center gap-2 bg-[#2563EB] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
  >
                <Building2 className="h-4 w-4" />
                {txt.setupCompany}
              </button>}
              {showPostJob && <button
    onClick={onPostJobClick}
    className="flex items-center gap-2 bg-[#2563EB] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
  >
                <Briefcase className="h-4 w-4" />
                {txt.postJob}
              </button>}
            </div>

            {
    /* Mobile actions — always visible */
  }
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">
              {isLoggedIn ? <AccountMenu
    txt={txt}
    phone={user.phoneNumber}
    roleLabel={roleLabel}
    onSignOut={signOut}
    onDashboardClick={onDashboardClick}
    showDashboard={showDashboard}
    triggerClassName="flex items-center justify-center w-10 h-10 rounded-full"
  /> : <button
    type="button"
    aria-label={txt.login}
    onClick={onLoginClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
  >
                <User size={20} />
              </button>}
              {showCreateProfile && <button
    type="button"
    aria-label={txt.createProfile}
    onClick={onCreateProfileClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F97316] text-white hover:bg-orange-500 transition-colors shadow-sm"
  >
                <Mic size={20} />
              </button>}
              {showSetupCompany && <button
    type="button"
    aria-label={txt.setupCompany}
    onClick={onSetupCompanyClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 transition-colors shadow-sm"
  >
                <Building2 size={20} />
              </button>}
              {showPostJob && <button
    type="button"
    aria-label={txt.postJob}
    onClick={onPostJobClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 transition-colors shadow-sm"
  >
                <Briefcase size={20} />
              </button>}
            </div>
          </div>
        </div>
      </nav>

      {
    /* Mobile slide-out menu — rendered outside nav to avoid z-index / portal issues */
  }
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
    id="mobile-nav-menu"
    side="left"
    aria-describedby={void 0}
    className="p-0 flex flex-col gap-0 h-dvh max-h-dvh overflow-hidden w-[min(100vw,20rem)] sm:max-w-xs [&>button]:top-4 [&>button]:right-4"
  >
          <SheetHeader className="shrink-0 border-b border-[#E2E8F0] px-5 py-4 pr-12 text-left space-y-0">
            <div className="flex items-center gap-2">
              <img
    src={logo}
    alt="Bharat Gig"
    className="h-9 w-auto shrink-0 block -translate-y-1"
  />
              <SheetTitle className="text-lg font-bold text-[#0F172A]">
                Bharat<span className="text-[#2563EB]">Gig</span>
              </SheetTitle>
            </div>
          </SheetHeader>

          <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-3">
            <ul className="flex flex-col gap-0.5">
              {navLinks.map((item) => <li key={item.id}>
                  <button
    type="button"
    onClick={() => scrollTo(item.id)}
    className="w-full text-left text-[#0F172A] font-semibold text-base py-3 px-3 rounded-xl hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
  >
                    {txt[item.key]}
                  </button>
                </li>)}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-[#E2E8F0] p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <button
    type="button"
    onClick={handleLangToggle}
    className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-[#64748B] border-2 border-[#E2E8F0] rounded-xl px-4 py-3 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
  >
              🌐 {txt.switchLang}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>;
}
export {
  Navbar
};
