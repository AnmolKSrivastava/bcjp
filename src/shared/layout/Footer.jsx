import { Mic, Facebook, Instagram, Linkedin } from "lucide-react";

function XIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    Icon: Linkedin,
    hoverClass: "hover:bg-[#0A66C2] hover:text-white",
  },
  {
    label: "X",
    href: "#",
    Icon: XIcon,
    filled: true,
    hoverClass: "hover:bg-white hover:text-[#0F172A]",
  },
  {
    label: "Facebook",
    href: "#",
    Icon: Facebook,
    hoverClass: "hover:bg-[#1877F2] hover:text-white",
  },
  {
    label: "Instagram",
    href: "#",
    Icon: Instagram,
    hoverClass: "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white",
  },
];

function Footer({ lang }) {
  return <footer className="bg-[#0F172A] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {
    /* Brand */
  }
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                <Mic size={20} className="text-white" />
              </div>
              <span className="text-2xl font-extrabold">Setu<span className="text-[#2563EB]">App</span></span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed mb-4 max-w-xs">
              {lang === "hi" ? "भारत का वॉयस-फर्स्ट जॉब पोर्टल। बोलें और नौकरी पाएं।" : "India's voice-first job portal. Speak and get hired."}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon, filled, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition-all duration-200 hover:scale-110 ${hoverClass}`}
                >
                  {filled ? (
                    <Icon size={18} />
                  ) : (
                    <Icon size={18} strokeWidth={1.75} />
                  )}
                </a>
              ))}
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
    { en: "FAQs", hi: "सामान्य प्रश्न" }
  ].map((item) => <li key={item.en}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                    {item[lang]}
                  </a>
                </li>)}
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
    { en: "Contact Us", hi: "संपर्क करें" }
  ].map((item) => <li key={item.en}>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors text-sm">
                    {item[lang]}
                  </a>
                </li>)}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#64748B] text-sm">
            © 2026 KaamSetu. {lang === "hi" ? "सभी अधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          <div className="flex gap-6 text-sm text-[#64748B]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>;
}
export {
  Footer
};
