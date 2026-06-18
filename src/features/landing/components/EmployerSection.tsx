import React from "react";
import { CheckCircle2, Users, Mic, Video, Package } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";

interface Props {
  lang: "hi" | "en";
}

const features = [
  { icon: <Users size={20} />, en: "AI Matching", hi: "AI मिलान" },
  { icon: <Mic size={20} />, en: "Voice Resumes", hi: "वॉयस रेज़्यूमे" },
  { icon: <Video size={20} />, en: "Video Introductions", hi: "वीडियो परिचय" },
  { icon: <Package size={20} />, en: "Bulk Hiring", hi: "बल्क हायरिंग" },
];

export function EmployerSection({ lang }: Props) {
  return (
    <section id="employers" className="bg-[#F8FAFC] py-20 px-4 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative pb-6 sm:pb-0"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-[#F1F5F9] px-3 sm:px-4 py-3 flex items-center gap-2 border-b border-[#E2E8F0] min-w-0">
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 min-w-0 bg-white rounded-lg text-xs text-[#94A3B8] px-3 py-1 sm:ml-2 truncate">
                  kaamsetu.in/employer/dashboard
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
                  <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">Employer Dashboard</h4>
                  <span className="shrink-0 text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-semibold border border-green-100">
                    ● Live
                  </span>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5 sm:mb-6">
                  {[
                    { label: "Applications", value: "248", color: "#2563EB" },
                    { label: "Shortlisted", value: "42", color: "#22C55E" },
                    { label: "Hired", value: "12", color: "#F97316" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[#F8FAFC] rounded-xl p-3 sm:p-4 text-center border border-[#E2E8F0]"
                    >
                      <p className="text-xl sm:text-2xl font-extrabold" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-[#64748B] mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Candidate list */}
                <div className="space-y-3">
                  {[
                    { name: "Ramesh K.", role: "Electrician", match: "98%", img: homeImages.electrician },
                    { name: "Sunil P.", role: "Plumber", match: "94%", img: homeImages.plumber },
                    { name: "Meena D.", role: "Housekeeping", match: "91%", img: homeImages.housekeeping },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#0F172A] truncate">{c.name}</p>
                          <p className="text-xs text-[#64748B]">{c.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                        <div className="text-left sm:text-right">
                          <span className="text-sm font-bold text-[#22C55E]">{c.match}</span>
                          <p className="text-xs text-[#94A3B8]">AI Match</p>
                        </div>
                        <button className="bg-[#2563EB] text-white text-xs font-bold px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0">
                          Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-4 sm:-right-4 inline-flex bg-[#22C55E] text-white text-sm font-bold px-4 py-2 rounded-2xl shadow-lg">
              🚀 10x Faster Hiring
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-blue-50 text-[#2563EB] text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-100">
              For Employers
            </span>
            <h2 className="text-4xl font-extrabold text-[#0F172A] mb-4">
              {lang === "hi" ? "सही कर्मचारी खोजें, तेज़ी से" : "Find the Right Workers, Fast"}
            </h2>
            <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
              {lang === "hi"
                ? "AI की मदद से सैकड़ों सत्यापित कामगारों तक पहुँचें। वॉयस रेज़्यूमे सुनें और सही उम्मीदवार चुनें।"
                : "Access thousands of verified blue-collar workers through AI matching. Listen to voice resumes and hire the right candidate."}
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#2563EB]">
                    {feat.icon}
                  </div>
                  <span className="text-base font-semibold text-[#0F172A]">
                    {lang === "hi" ? feat.hi : feat.en}
                  </span>
                  <CheckCircle2 size={18} className="text-[#22C55E] ml-auto" />
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 bg-[#2563EB] text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-blue-700 transition-all hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-0.5">
              {lang === "hi" ? "अभी नौकरी पोस्ट करें" : "Post a Job Now"} →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
