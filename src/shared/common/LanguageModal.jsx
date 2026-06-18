import { useState } from "react";
import { motion } from "motion/react";
import languageModalBg from "@/assets/Language_Section.webp";
function LanguageModal({ onSelect }) {
  const [selected, setSelected] = useState(null);
  const handleContinue = () => {
    if (selected) onSelect(selected);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center">
      {
    /* Collage background */
  }
      <div className="absolute inset-0 bg-neutral-900">
        <img
    src={languageModalBg}
    alt="Workers background"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
  />
        {
    /* White/grey overlay */
  }
        <div className="absolute inset-0 bg-gray-100/30" />
      </div>

      <motion.div
    initial={{ opacity: 0, scale: 0.92, y: 24 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="relative z-10 bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md mx-4 text-center"
  >
        <div className="text-5xl mb-3">👋</div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-1">Welcome</h1>
        <h2 className="text-2xl font-semibold text-[#2563EB] mb-2">Choose Your Language</h2>
        <p className="text-lg font-medium text-[#64748B] mb-1">अपनी भाषा चुनें</p>
        <p className="text-sm text-[#94A3B8] mb-8">
          Continue in your preferred language. You can change it anytime.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          <button
    onClick={() => setSelected("hi")}
    className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-xl font-semibold border-2 transition-all duration-200 ${selected === "hi" ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg scale-105" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB] hover:bg-blue-50 hover:scale-102"}`}
  >
            🇮🇳 <span>हिन्दी</span>
          </button>
          <button
    onClick={() => setSelected("en")}
    className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-xl font-semibold border-2 transition-all duration-200 ${selected === "en" ? "bg-[#2563EB] border-[#2563EB] text-white shadow-lg scale-105" : "bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB] hover:bg-blue-50"}`}
  >
            🇬🇧 <span>English</span>
          </button>
        </div>

        <button
    onClick={handleContinue}
    disabled={!selected}
    className={`w-full py-4 rounded-2xl text-lg font-bold transition-all duration-200 ${selected ? "bg-[#F97316] text-white hover:bg-orange-500 shadow-lg shadow-orange-200 hover:scale-105" : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"}`}
  >
          Continue →
        </button>
      </motion.div>
    </div>;
}
export {
  LanguageModal
};
