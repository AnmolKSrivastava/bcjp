import React from "react";
import { Mic } from "lucide-react";

interface Props {
  lang: "hi" | "en";
}

export function Footer({ lang }: Props) {
  return (
    <footer className="bg-[#0F172A] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <Mic size={20} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold">Setu<span className="text-[#2563EB]">App</span></span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed mb-4 max-w-xs">
              {lang === "hi"
                ? "भारत का वॉयस-फर्स्ट जॉब पोर्टल। बोलें और नौकरी पाएं।"
                : "India's voice-first job portal. Speak and get hired."}
            </p>
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2563EB] transition-colors cursor-pointer">📘</div>
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2563EB] transition-colors cursor-pointer">🐦</div>
              <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F97316] transition-colors cursor-pointer">▶️</div>
            </div>
          </div>

          <div>
            <p className="font-bold text-white mb-4">
              {lang === "hi" ? "कामगारों के लिए" : "For Workers"}
            </p>
            <ul className="space-y-2">
              {[
                { en: "Create Resume", hi: "रेज़्यूमे बनाएं" },
                { en: "Browse Jobs", hi: "नौकरी देखें" },
                { en: "Success Stories", hi: "सफलता की कहानियाँ" },
                { en: "FAQs", hi: "सामान्य प्रश्न" },
              ].map((item) => (
                <li key={item.en}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                    {item[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-white mb-4">
              {lang === "hi" ? "नियोक्ताओं के लिए" : "For Employers"}
            </p>
            <ul className="space-y-2">
              {[
                { en: "Post a Job", hi: "नौकरी पोस्ट करें" },
                { en: "Browse Candidates", hi: "उम्मीदवार खोजें" },
                { en: "Pricing", hi: "मूल्य निर्धारण" },
                { en: "Contact Us", hi: "संपर्क करें" },
              ].map((item) => (
                <li key={item.en}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                    {item[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            © 2025 KaamSetu. {lang === "hi" ? "सभी अधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-sm text-[#64748B]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
