import { Mic, Search, CheckCircle2, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";
const t = {
  en: {
    badge: "🇮🇳 India's Voice-First Job Portal",
    headline1: "Get Hired",
    headline2: "Using Only",
    headline3: "Your Voice",
    sub: "Speak in your native language. AI creates your resume instantly and helps you find the right job.",
    btn1: "Create Profile Now",
    btnEmployer: "Post a Job",
    btn2: "Browse Jobs",
    btn3: "Search by Voice",
    feat1: "No Resume Required",
    feat2: "5+ Languages",
    feat3: "Free for Workers"
  },
  hi: {
    badge: "🇮🇳 भारत का वॉयस-फर्स्ट जॉब पोर्टल",
    headline1: "नौकरी पाएं",
    headline2: "सिर्फ अपनी",
    headline3: "आवाज़ से",
    sub: "अपनी मूल भाषा में बोलें। AI तुरंत आपका रेज़्यूमे बनाता है और सही नौकरी ढूंढने में मदद करता है।",
    btn1: "अभी प्रोफाइल बनाएं",
    btnEmployer: "नौकरी पोस्ट करें",
    btn2: "नौकरी देखें",
    btn3: "आवाज़ से खोजें",
    feat1: "रेज़्यूमे की ज़रूरत नहीं",
    feat2: "5+ भाषाएं",
    feat3: "मज़दूरों के लिए मुफ़्त"
  }
};
const workerImages = [
  {
    src: homeImages.electrician,
    alt: "Indian electrician",
    label: "Electrician",
    rotate: "-2deg"
  },
  {
    src: homeImages.housekeeping,
    alt: "Indian housekeeping professional",
    label: "Housekeeping",
    rotate: "2deg"
  },
  {
    src: homeImages.driver,
    alt: "Indian truck driver",
    label: "Driver",
    rotate: "-1deg"
  },
  {
    src: homeImages.deliveryAgent,
    alt: "Indian delivery executive",
    label: "Delivery",
    rotate: "1.5deg"
  }
];
function HeroSection({ lang, onCreateProfileClick, onPostJobClick, onBrowseJobsClick, onVoiceBrowseClick }) {
  const txt = t[lang];
  return <section
    id="hero"
    className="relative min-h-[calc(100dvh-4rem)] bg-white overflow-hidden flex items-center"
  >
      {
    /* Background decorations */
  }
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-50 rounded-full opacity-60 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-50 rounded-full opacity-50 blur-3xl" />
        {
    /* Dots grid */
  }
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#2563EB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {
    /* Left */
  }
        <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
          {
    /* Badge */
  }
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-blue-100">
            {txt.badge}
          </div>

          {
    /* Headline */
  }
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#0F172A] leading-[1.12] mb-4">
            {txt.headline1}<br />
            {txt.headline2}<br />
            <span className="text-[#2563EB] relative">
              {txt.headline3}
              <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#F97316" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg text-[#64748B] mb-5 leading-snug max-w-xl">
            {txt.sub}
          </p>

          {
    /* CTA Buttons */
  }
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
    type="button"
    onClick={onCreateProfileClick}
    className="flex flex-1 items-center justify-center gap-2 bg-[#2563EB] text-white font-bold px-6 py-4 rounded-2xl text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5"
  >
                <Mic size={22} />
                {txt.btn1}
              </button>
              <button
    type="button"
    onClick={onPostJobClick}
    className="flex flex-1 items-center justify-center gap-2 bg-[#22C55E] text-white font-bold px-6 py-4 rounded-2xl text-lg hover:bg-green-600 transition-all hover:shadow-xl hover:shadow-green-200 hover:-translate-y-0.5"
  >
                <Briefcase size={20} />
                {txt.btnEmployer}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
    type="button"
    onClick={onBrowseJobsClick}
    className="flex flex-1 items-center justify-center gap-2 bg-[#0F172A] text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-[#1E293B] transition-all hover:shadow-xl hover:shadow-slate-300 hover:-translate-y-0.5"
  >
                <Search size={20} />
                {txt.btn2}
              </button>
              <button
    type="button"
    onClick={onVoiceBrowseClick}
    className="flex flex-1 items-center justify-center gap-2 bg-[#F97316] text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-500 transition-all hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
  >
                <Mic size={20} />
                {txt.btn3}
              </button>
            </div>
          </div>

          {
    /* Feature chips */
  }
          <div className="flex flex-wrap gap-3">
            {[txt.feat1, txt.feat2, txt.feat3].map((feat) => <div
    key={feat}
    className="flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full border border-green-100"
  >
                <CheckCircle2 size={16} className="text-[#22C55E]" />
                {feat}
              </div>)}
          </div>
        </motion.div>

        {
    /* Right */
  }
        <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="relative min-h-[500px]"
  >
          {
    /* Worker image collage */
  }
          <div className="grid grid-cols-2 gap-3 mb-4 relative z-0">
            {workerImages.map((img, i) => <div
    key={i}
    className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100"
    style={{ transform: `rotate(${img.rotate})` }}
  >
                <img
    src={img.src}
    alt={img.alt}
    className="w-full h-44 object-cover"
  />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-white text-xs font-semibold">{img.label}</span>
                </div>
              </div>)}
          </div>
        </motion.div>
      </div>
    </section>;
}
export {
  HeroSection
};
