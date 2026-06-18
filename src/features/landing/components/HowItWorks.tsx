import React from "react";
import { Mic, Sparkles, Briefcase, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  lang: "hi" | "en";
}

const stepIcons: {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}[] = [
  { Icon: Mic, iconBg: "bg-blue-50", iconColor: "text-[#2563EB]" },
  { Icon: Sparkles, iconBg: "bg-orange-50", iconColor: "text-[#F97316]" },
  { Icon: Briefcase, iconBg: "bg-green-50", iconColor: "text-[#22C55E]" },
];

const t = {
  en: {
    title: "How It Works",
    subtitle: "Get hired in 3 simple steps — no typing, no paperwork",
    steps: [
      {
        num: "01",
        title: "Speak",
        desc: "Tell us about yourself in Hindi or English. Just talk naturally — like you would to a friend.",
      },
      {
        num: "02",
        title: "AI Creates Resume",
        desc: "Our AI instantly builds a professional resume from your voice. No writing needed.",
      },
      {
        num: "03",
        title: "Get Hired",
        desc: "Apply to jobs with one tap and receive interview calls directly on your phone.",
      },
    ],
  },
  hi: {
    title: "यह कैसे काम करता है",
    subtitle: "3 आसान चरणों में नौकरी पाएं — कोई टाइपिंग नहीं, कोई कागज़ी काम नहीं",
    steps: [
      {
        num: "01",
        title: "बोलें",
        desc: "हिंदी या अंग्रेज़ी में अपने बारे में बताएं। बस स्वाभाविक रूप से बोलें।",
      },
      {
        num: "02",
        title: "AI रेज़्यूमे बनाता है",
        desc: "हमारा AI आपकी आवाज़ से तुरंत एक पेशेवर रेज़्यूमे बनाता है।",
      },
      {
        num: "03",
        title: "नौकरी पाएं",
        desc: "एक टैप से नौकरी के लिए आवेदन करें और सीधे अपने फ़ोन पर इंटरव्यू कॉल पाएं।",
      },
    ],
  },
};

export function HowItWorks({ lang }: Props) {
  const txt = t[lang];

  return (
    <section className="bg-[#F8FAFC] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-50 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-blue-100">
            Simple Process
          </span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-3">{txt.title}</h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">{txt.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#2563EB] via-[#F97316] to-[#22C55E] opacity-30 z-0" />

          {txt.steps.map((step, i) => {
            const { Icon, iconBg, iconColor } = stepIcons[i];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0] hover:shadow-md hover:-translate-y-1 transition-all duration-300 z-10"
              >
                <div className="absolute -top-4 left-8 bg-[#2563EB] text-white text-xs font-black px-3 py-1 rounded-full">
                  {step.num}
                </div>
                <div
                  className={`mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}
                >
                  <Icon size={28} className={iconColor} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{step.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
