import React from "react";
import { Mic } from "lucide-react";
import { motion } from "motion/react";
import languageSectionImage from "@/assets/Language_Section.webp";

interface Props {
  lang: "hi" | "en";
}

const languages = [
  { flag: "🇮🇳", name: "हिन्दी", english: "Hindi" },
  { flag: "🇬🇧", name: "English", english: "English" },
  { flag: "🇮🇳", name: "मराठी", english: "Marathi" },
  { flag: "🇮🇳", name: "বাংলা", english: "Bengali" },
  { flag: "🇮🇳", name: "தமிழ்", english: "Tamil" },
  { flag: "🇮🇳", name: "తెలుగు", english: "Telugu" },
];

export function LanguageSection({ lang }: Props) {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-orange-50 text-[#F97316] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-orange-100">
              Multilingual Support
            </span>
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
              {lang === "hi" ? "अपनी भाषा में बोलें" : "Speak Your Language"}
            </h2>
            <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
              {lang === "hi"
                ? "अपनी पसंदीदा भाषा चुनें। आप इसे कभी भी बदल सकते हैं।"
                : "Choose your preferred language. You can change it anytime."}
            </p>

            <div className="flex flex-wrap gap-3">
              {languages.map((l, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2 bg-[#F8FAFC] hover:bg-[#737373] hover:text-white text-[#0F172A] font-semibold text-lg px-5 py-3 rounded-2xl border-2 border-[#E5E5E5] hover:border-[#737373] transition-all duration-200 hover:shadow-lg hover:shadow-neutral-200 hover:-translate-y-0.5"
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </motion.button>
              ))}
            </div>

            <p className="mt-6 text-sm text-[#94A3B8]">
              {lang === "hi" ? "और भाषाएँ जल्द आ रही हैं..." : "More languages coming soon..."}
            </p>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center pb-8 pr-8"
          >
            <div className="relative">
              {/* Animated voice wave rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {[1, 2, 3].map((ring) => (
                  <div
                    key={ring}
                    className="absolute rounded-full border-2 border-[#D4D4D4] opacity-40 animate-ping"
                    style={{
                      width: `${ring * 80 + 120}px`,
                      height: `${ring * 80 + 120}px`,
                      animationDelay: `${ring * 0.4}s`,
                      animationDuration: "2.5s",
                    }}
                  />
                ))}
              </div>

              {/* Phone mockup */}
              <div className="relative z-[1] rounded-3xl overflow-hidden shadow-2xl w-72 h-96 bg-neutral-200">
                <img
                  src={languageSectionImage}
                  alt="Worker speaking on smartphone"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-6 flex justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
                    <p className="text-[#0F172A] font-bold text-sm">🎤 Listening...</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {[3, 6, 4, 8, 5, 7, 3, 6, 4].map((h, j) => (
                        <div
                          key={j}
                          className="w-1 rounded-full animate-pulse bg-[#737373]"
                          style={{
                            height: `${h * 3}px`,
                            animationDelay: `${j * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mic button — above image (was z-[3] vs image z-10) */}
              <button
                type="button"
                aria-label={lang === "hi" ? "बोलना शुरू करें" : "Start speaking"}
                className="absolute -bottom-2 -right-2 z-[2] flex h-16 w-16 items-center justify-center rounded-full bg-[#F97316] shadow-xl shadow-orange-200 transition-transform hover:scale-110"
              >
                <Mic size={26} className="text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
