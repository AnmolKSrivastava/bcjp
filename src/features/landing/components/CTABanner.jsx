import { Mic } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";
function CTABanner({ lang, onCreateProfileClick }) {
  return <section id="cta" className="relative overflow-hidden py-20 px-4">
      {
    /* Blue gradient background */
  }
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#2563EB] to-[#3b82f6]" />
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaDots" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaDots)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {
    /* Left */
  }
          <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              {lang === "hi" ? "आपकी अगली नौकरी बस एक बातचीत दूर है" : "Your Next Job Is One Conversation Away"}
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {lang === "hi" ? "अभी बोलें और AI आपका रेज़्यूमे मुफ़्त में बनाए।" : "Speak now and let AI create your resume for FREE."}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
    onClick={onCreateProfileClick}
    className="flex items-center gap-2 bg-[#F97316] text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-orange-500 transition-all hover:shadow-2xl hover:shadow-orange-800/30 hover:-translate-y-0.5"
  >
                <Mic size={22} />
                {lang === "hi" ? "अभी प्रोफाइल बनाएं" : "Create Profile Now"}
              </button>
              <button className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
                {lang === "hi" ? "और जानें" : "Learn More"}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mt-8 text-blue-100">
              {[
    { en: "✓ 100% Free", hi: "✓ पूरी तरह मुफ़्त" },
    { en: "✓ No Resume Needed", hi: "✓ रेज़्यूमे की ज़रूरत नहीं" },
    { en: "✓ Get Hired in Days", hi: "✓ दिनों में नौकरी" }
  ].map((item, i) => <span key={i} className="text-sm font-semibold">{item[lang]}</span>)}
            </div>
          </motion.div>

          {
    /* Right — Worker image */
  }
          <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="relative hidden lg:block"
  >
            <div className="relative rounded-3xl overflow-hidden h-80 shadow-2xl">
              <img
    src={homeImages.electrician}
    alt="Indian electrician with mobile phone smiling"
    className="w-full h-full object-cover"
  />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>

            {
    /* Floating card */
  }
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <div>
                <p className="text-xs text-[#64748B]">Just now</p>
                <p className="text-sm font-bold text-[#0F172A]">Suresh got hired!</p>
                <p className="text-xs text-[#22C55E] font-semibold">Driver · ₹30k/mo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
export {
  CTABanner
};
