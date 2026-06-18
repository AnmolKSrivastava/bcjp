import React, { useEffect, useRef, useState } from "react";
import { MapPin, Briefcase, ArrowRight, Search, Mic, Loader2 } from "lucide-react";
import { motion } from "motion/react";

export type JobBrowseMode = "type" | "voice" | null;

interface Props {
  lang: "hi" | "en";
  browseMode?: JobBrowseMode;
  onBrowseModeHandled?: () => void;
}

const copy = {
  en: {
    badge: "Featured Openings",
    title: "Featured Jobs",
    subtitle: "Apply now and start working soon",
    viewAll: "View All Jobs",
    searchPlaceholder: "Search by job, company, or city…",
    voiceSearch: "Voice Search",
    listening: "Listening…",
    voiceHint: 'Try saying "electrician jobs in Pune"',
    noResults: "No jobs match your search.",
    apply: "Apply Now",
    save: "Save",
  },
  hi: {
    badge: "फ़ीचर्ड नौकरियाँ",
    title: "टॉप नौकरियाँ",
    subtitle: "अभी आवेदन करें और जल्दी काम शुरू करें",
    viewAll: "सभी नौकरियाँ देखें",
    searchPlaceholder: "नौकरी, कंपनी या शहर खोजें…",
    voiceSearch: "आवाज़ से खोजें",
    listening: "सुन रहे हैं…",
    voiceHint: '"पुणे में इलेक्ट्रिशियन की नौकरी" जैसे बोलें',
    noResults: "आपकी खोज से कोई नौकरी मेल नहीं खाती।",
    apply: "अभी आवेदन करें",
    save: "सहेजें",
  },
};

const mockVoiceQueries = {
  en: "electrician pune",
  hi: "इलेक्ट्रिशियन पुणे",
};

const jobs = [
  {
    title: { en: "Electrician", hi: "इलेक्ट्रिशियन" },
    company: "PowerFix Solutions",
    location: { en: "Pune", hi: "पुणे" },
    salary: "₹22k - ₹30k",
    type: { en: "Full Time", hi: "पूर्णकालिक" },
    icon: "⚡",
    color: "#FEF3C7",
    iconBg: "#F97316",
    badge: { en: "Urgent", hi: "अर्जेंट" },
    badgeColor: "bg-red-50 text-red-600 border-red-100",
    keywords: "electrician pune powerfix",
  },
  {
    title: { en: "Delivery Executive", hi: "डिलीवरी एग्जीक्यूटिव" },
    company: "QuickShip India",
    location: { en: "Mumbai", hi: "मुंबई" },
    salary: "₹18k - ₹28k",
    type: { en: "Part Time", hi: "अंशकालिक" },
    icon: "🚴",
    color: "#DBEAFE",
    iconBg: "#2563EB",
    badge: { en: "New", hi: "नई" },
    badgeColor: "bg-green-50 text-green-600 border-green-100",
    keywords: "delivery mumbai quickship",
  },
  {
    title: { en: "Driver", hi: "ड्राइवर" },
    company: "SafeRide Logistics",
    location: { en: "Bangalore", hi: "बैंगलोर" },
    salary: "₹25k - ₹35k",
    type: { en: "Full Time", hi: "पूर्णकालिक" },
    icon: "🚗",
    color: "#D1FAE5",
    iconBg: "#22C55E",
    badge: { en: "Top Pay", hi: "टॉप पे" },
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    keywords: "driver bangalore logistics",
  },
  {
    title: { en: "Welder", hi: "वेल्डर" },
    company: "MetalCraft Industries",
    location: { en: "Hyderabad", hi: "हैदराबाद" },
    salary: "₹24k - ₹32k",
    type: { en: "Full Time", hi: "पूर्णकालिक" },
    icon: "🔧",
    color: "#EDE9FE",
    iconBg: "#7C3AED",
    badge: { en: "Hot", hi: "हॉट" },
    badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
    keywords: "welder hyderabad metalcraft",
  },
];

export function FeaturedJobs({ lang, browseMode = null, onBrowseModeHandled }: Props) {
  const txt = copy[lang];
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [voiceListening, setVoiceListening] = useState(false);

  useEffect(() => {
    if (!browseMode) return;

    const timer = window.setTimeout(() => {
      if (browseMode === "type") {
        searchInputRef.current?.focus({ preventScroll: true });
      } else if (browseMode === "voice") {
        setVoiceListening(true);
        window.setTimeout(() => {
          setQuery(mockVoiceQueries[lang]);
          setVoiceListening(false);
        }, 1800);
      }
      onBrowseModeHandled?.();
    }, 400);

    return () => window.clearTimeout(timer);
  }, [browseMode, onBrowseModeHandled, lang]);

  const startVoiceSearch = () => {
    if (voiceListening) return;
    setVoiceListening(true);
    window.setTimeout(() => {
      setQuery(mockVoiceQueries[lang]);
      setVoiceListening(false);
    }, 1800);
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredJobs = normalizedQuery
    ? jobs.filter((job) => {
        const haystack = [
          job.title.en,
          job.title.hi,
          job.company,
          job.location.en,
          job.location.hi,
          job.keywords,
        ]
          .join(" ")
          .toLowerCase();
        return normalizedQuery.split(/\s+/).every((term) => haystack.includes(term));
      })
    : jobs;

  return (
    <section id="jobs" className="bg-[#F8FAFC] py-20 px-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block bg-blue-50 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-100">
              {txt.badge}
            </span>
            <h2 className="text-4xl font-extrabold text-[#0F172A]">{txt.title}</h2>
            <p className="text-[#64748B] mt-2">{txt.subtitle}</p>
          </div>
          <button className="flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all text-sm">
            {txt.viewAll} <ArrowRight size={16} />
          </button>
        </div>

        {/* Job search — type or voice */}
        <div className="mb-10 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
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
              onClick={startVoiceSearch}
              disabled={voiceListening}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3.5 text-base font-bold text-white transition-all hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[11rem]"
            >
              {voiceListening ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Mic size={20} />
              )}
              {voiceListening ? txt.listening : txt.voiceSearch}
            </button>
          </div>
          <p className="mt-3 text-sm text-[#94A3B8]">{txt.voiceHint}</p>
        </div>

        {filteredJobs.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white px-6 py-12 text-center text-[#64748B]">
            {txt.noResults}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.company + job.title.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: job.color }}
                    >
                      {job.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                        {job.title[lang]}
                      </h3>
                      <p className="text-sm text-[#64748B]">{job.company}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${job.badgeColor}`}>
                    {job.badge[lang]}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                    <MapPin size={14} className="text-[#2563EB]" />
                    {job.location[lang]}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                    <Briefcase size={14} className="text-[#F97316]" />
                    {job.type[lang]}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#22C55E]">
                    {job.salary}/mo
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-[#2563EB] text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors hover:shadow-lg hover:shadow-blue-200">
                    {txt.apply}
                  </button>
                  <button className="px-4 py-3 border-2 border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#64748B] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                    {txt.save}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
