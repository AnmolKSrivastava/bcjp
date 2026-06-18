import { useState } from "react";
import { Mic, Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/lib/ui/sheet";
const t = {
  en: {
    findJobs: "Find Jobs",
    categories: "Categories",
    forEmployers: "For Employers",
    successStories: "Success Stories",
    aboutUs: "About Us",
    login: "Login",
    createProfile: "Create Profile",
    menu: "Menu",
    switchLang: "Switch to Hindi"
  },
  hi: {
    findJobs: "नौकरी खोजें",
    categories: "श्रेणियाँ",
    forEmployers: "नियोक्ताओं के लिए",
    successStories: "सफलता की कहानियाँ",
    aboutUs: "हमारे बारे में",
    login: "लॉगिन",
    createProfile: "प्रोफाइल बनाएं",
    menu: "मेनू",
    switchLang: "अंग्रेज़ी में बदलें"
  }
};
const navLinks = [
  { key: "findJobs", id: "jobs" },
  { key: "categories", id: "categories" },
  { key: "forEmployers", id: "employers" },
  { key: "successStories", id: "stories" },
  { key: "aboutUs", id: "cta" }
];
function Navbar({ lang, onLangToggle, onLoginClick, onCreateProfileClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const txt = t[lang];
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
    onClick={() => scrollTo("hero")}
  >
                <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center shrink-0">
                  <Mic size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-[#0F172A] truncate">
                  Setu<span className="text-[#2563EB]">App</span>
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
              <button
    onClick={onLoginClick}
    className="text-sm font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors px-3 py-2"
  >
                {txt.login}
              </button>
              <button
    onClick={onCreateProfileClick}
    className="flex items-center gap-2 bg-[#F97316] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-500 transition-all hover:shadow-lg hover:shadow-orange-200"
  >
                🎤 {txt.createProfile}
              </button>
            </div>

            {
    /* Mobile actions — always visible */
  }
            <div className="flex lg:hidden items-center gap-1.5 shrink-0">
              <button
    type="button"
    aria-label={txt.login}
    onClick={onLoginClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl text-[#0F172A] hover:bg-[#F8FAFC] hover:text-[#2563EB] transition-colors"
  >
                <User size={20} />
              </button>
              <button
    type="button"
    aria-label={txt.createProfile}
    onClick={onCreateProfileClick}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F97316] text-white hover:bg-orange-500 transition-colors shadow-sm"
  >
                <Mic size={20} />
              </button>
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
              <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center shrink-0">
                <Mic size={18} className="text-white" />
              </div>
              <SheetTitle className="text-lg font-bold text-[#0F172A]">
                Kaam<span className="text-[#2563EB]">Setu</span>
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
