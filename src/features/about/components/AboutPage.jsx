import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Languages,
  Mic,
  Phone,
  Sparkles,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { getIndustries, labelOf } from "@/features/taxonomy";
import { Footer } from "@/shared/layout/Footer";

const copy = {
  en: {
    badge: "About Bharat Gig",
    title: "India's voice-first job portal for frontline workers",
    lead:
      "Bharat Gig helps workers get hired by speaking — not typing — and helps employers in seven core industries find the right people faster.",
    ctaJobs: "Browse jobs",
    ctaProfile: "Create profile",
    ctaEmployer: "Post a job",
    missionBadge: "Our mission",
    missionTitle: "Make hiring work for people who don't start with a resume",
    missionBody:
      "Millions of workers find jobs through WhatsApp groups, contractors, and word of mouth. That leaves little structure for workers or employers. Bharat Gig brings that journey online — starting with registration and hiring, with a longer path toward workforce tools within our focus industries.",
    whoBadge: "Who it's for",
    whoTitle: "Built for two sides of every hire",
    workersTitle: "Job seekers",
    workersBody:
      "Create a profile with your voice, browse roles by industry, apply in one tap, and save jobs you care about — free for workers.",
    employersTitle: "Employers",
    employersBody:
      "Set up your company, post openings with clear industry → department → role structure, and review applicants from a simple dashboard.",
    howBadge: "How it works",
    howTitle: "Three steps from voice to hire",
    steps: [
      {
        title: "Speak",
        desc: "Tell us about your skills and experience in a language you're comfortable with."
      },
      {
        title: "AI builds your profile",
        desc: "We turn your answers into a structured worker profile — no typing a resume from scratch."
      },
      {
        title: "Apply and get called",
        desc: "Browse open roles, apply with one tap, and take interview calls on your phone."
      }
    ],
    industriesBadge: "Focus industries",
    industriesTitle: "Seven industries, one clear hierarchy",
    industriesBody:
      "Every job and profile follows Industry → Department → Role. We stay focused so matching stays relevant.",
    viewAllIndustries: "View all industries",
    langBadge: "Languages",
    langTitle: "Speak in your language",
    langBody:
      "The app interface is available in English and Hindi. Voice onboarding supports English, Hindi, Marathi, Bengali, and Tamil — with more languages planned.",
    featuresBadge: "What you can do today",
    featuresTitle: "Practical tools for real hiring",
    features: [
      {
        icon: Mic,
        title: "Voice-first onboarding",
        desc: "Answer questions out loud; we structure your skills, experience, and preferences."
      },
      {
        icon: Briefcase,
        title: "Job search & filters",
        desc: "Find openings by industry, department, role, city, and experience — or search by voice."
      },
      {
        icon: Phone,
        title: "Phone-based accounts",
        desc: "Sign in with your mobile number. Workers and employers each get a role-fit dashboard."
      },
      {
        icon: Sparkles,
        title: "Save and apply",
        desc: "Keep jobs for later and apply when you're ready, with application tracking in your dashboard."
      }
    ],
    closeTitle: "Your next job can start with a conversation",
    closeBody: "Browse open roles or create a free worker profile in minutes.",
    closeJobs: "Find jobs",
    closeProfile: "Get started"
  },
  hi: {
    badge: "भारत गिग के बारे में",
    title: "फ्रंटलाइन कामगारों के लिए भारत का वॉयस-फर्स्ट जॉब पोर्टल",
    lead:
      "भारत गिग कामगारों को बोलकर नौकरी पाने में मदद करता है — टाइपिंग नहीं — और सात मुख्य उद्योगों के नियोक्ताओं को सही लोग जल्दी खोजने में मदद करता है।",
    ctaJobs: "नौकरियाँ देखें",
    ctaProfile: "प्रोफाइल बनाएं",
    ctaEmployer: "नौकरी पोस्ट करें",
    missionBadge: "हमारा उद्देश्य",
    missionTitle: "उन लोगों के लिए भर्ती आसान बनाएं जिनके पास रेज़्यूमे नहीं है",
    missionBody:
      "लाखों कामगार WhatsApp ग्रुप, ठेकेदारों और परिचय से नौकरी पाते हैं। इसमें कामगारों और नियोक्ताओं दोनों के लिए कम व्यवस्था रहती है। भारत गिग इस सफर को ऑनलाइन लाता है — पंजीकरण और भर्ती से शुरू करके, आगे हमारी चुनी हुई इंडस्ट्रीज़ में वर्कफोर्स टूल्स तक।",
    whoBadge: "यह किसके लिए है",
    whoTitle: "हर भर्ती के दोनों पक्षों के लिए",
    workersTitle: "नौकरी खोजने वाले",
    workersBody:
      "आवाज़ से प्रोफाइल बनाएं, उद्योग के अनुसार भूमिकाएँ देखें, एक टैप से आवेदन करें और पसंदीदा नौकरियाँ सहेजें — कामगारों के लिए मुफ़्त।",
    employersTitle: "नियोक्ता",
    employersBody:
      "कंपनी सेटअप करें, उद्योग → विभाग → भूमिका के साथ नौकरियाँ पोस्ट करें, और डैशबोर्ड से आवेदकों को देखें।",
    howBadge: "यह कैसे काम करता है",
    howTitle: "आवाज़ से नौकरी तक तीन चरण",
    steps: [
      {
        title: "बोलें",
        desc: "अपने कौशल और अनुभव के बारे में उस भाषा में बताएं जिसमें आप सहज हों।"
      },
      {
        title: "AI प्रोफाइल बनाता है",
        desc: "हम आपके जवाबों से एक व्यवस्थित प्रोफाइल बनाते हैं — पूरा रेज़्यूमे टाइप करने की ज़रूरत नहीं।"
      },
      {
        title: "आवेदन करें और कॉल पाएं",
        desc: "खुली नौकरियाँ देखें, एक टैप से आवेदन करें, और अपने फ़ोन पर इंटरव्यू कॉल लें।"
      }
    ],
    industriesBadge: "मुख्य उद्योग",
    industriesTitle: "सात उद्योग, एक साफ़ संरचना",
    industriesBody:
      "हर नौकरी और प्रोफाइल उद्योग → विभाग → भूमिका पर चलती है। फोकस रखने से मैचिंग प्रासंगिक रहती है।",
    viewAllIndustries: "सभी उद्योग देखें",
    langBadge: "भाषाएँ",
    langTitle: "अपनी भाषा में बोलें",
    langBody:
      "ऐप इंटरफ़ेस अंग्रेज़ी और हिंदी में उपलब्ध है। वॉयस ऑनबोर्डिंग अंग्रेज़ी, हिंदी, मराठी, बंगाली और तमिल में काम करती है — और भाषाएँ जोड़ने की योजना है।",
    featuresBadge: "आज आप क्या कर सकते हैं",
    featuresTitle: "असली भर्ती के लिए व्यावहारिक टूल",
    features: [
      {
        icon: Mic,
        title: "वॉयस-फर्स्ट ऑनबोर्डिंग",
        desc: "ज़ोर से जवाब दें; हम आपके कौशल, अनुभव और पसंद को व्यवस्थित करते हैं।"
      },
      {
        icon: Briefcase,
        title: "नौकरी खोज और फ़िल्टर",
        desc: "उद्योग, विभाग, भूमिका, शहर और अनुभव से खोजें — या आवाज़ से खोजें।"
      },
      {
        icon: Phone,
        title: "फ़ोन से खाता",
        desc: "मोबाइल नंबर से साइन इन करें। कामगार और नियोक्ता दोनों को अपने रोल के अनुसार डैशबोर्ड मिलता है।"
      },
      {
        icon: Sparkles,
        title: "सेव और आवेदन",
        desc: "नौकरियाँ बाद के लिए सहेजें और तैयार होने पर आवेदन करें; डैशबोर्ड में ट्रैक करें।"
      }
    ],
    closeTitle: "अगली नौकरी एक बातचीत से शुरू हो सकती है",
    closeBody: "खुली नौकरियाँ देखें या कुछ ही मिनटों में मुफ़्त प्रोफाइल बनाएं।",
    closeJobs: "नौकरी खोजें",
    closeProfile: "शुरू करें"
  }
};

const VOICE_LANGS = {
  en: ["English", "Hindi", "Marathi", "Bengali", "Tamil"],
  hi: ["अंग्रेज़ी", "हिंदी", "मराठी", "बंगाली", "तमिल"]
};

const stepIcons = [
  { Icon: Mic, color: "text-[#2563EB]", bg: "bg-blue-50" },
  { Icon: Sparkles, color: "text-[#F97316]", bg: "bg-orange-50" },
  { Icon: Briefcase, color: "text-[#22C55E]", bg: "bg-green-50" }
];

function AboutPage({ lang = "en", onCreateProfileClick }) {
  const txt = copy[lang] ?? copy.en;
  const industries = getIndustries();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-gradient-to-br from-[#EFF6FF] via-white to-[#FFF7ED]">
          <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-3xl"
            >
              <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
                {txt.badge}
              </span>
              <p className="text-sm font-bold tracking-wide text-[#2563EB]">
                Bharat<span className="text-[#0F172A]">Gig</span>
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                {txt.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#64748B]">{txt.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  {txt.ctaJobs} <ArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => onCreateProfileClick?.()}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#E2E8F0] bg-white px-5 py-3 text-sm font-bold text-[#0F172A] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  {txt.ctaProfile}
                </button>
                <Link
                  to="/employers"
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-[#F97316] transition-colors hover:bg-orange-50"
                >
                  {txt.ctaEmployer}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
              {txt.missionBadge}
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">{txt.missionTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#64748B]">{txt.missionBody}</p>
          </div>
        </section>

        {/* Who */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
                {txt.whoBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.whoTitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                  <Users size={22} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{txt.workersTitle}</h3>
                <p className="mt-2 leading-relaxed text-[#64748B]">{txt.workersBody}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#F97316]">
                  <Building2 size={22} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">{txt.employersTitle}</h3>
                <p className="mt-2 leading-relaxed text-[#64748B]">{txt.employersBody}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How */}
        <section className="border-y border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-sm font-semibold text-[#22C55E]">
                {txt.howBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.howTitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {txt.steps.map((step, i) => {
                const { Icon, color, bg } = stepIcons[i];
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-7 shadow-sm"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color}`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-black text-[#94A3B8]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
                {txt.industriesBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.industriesTitle}</h2>
              <p className="mt-3 text-[#64748B]">{txt.industriesBody}</p>
            </div>
            <ul className="flex flex-wrap gap-3">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    to={`/industries/${industry.id}`}
                    className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB] hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    {labelOf(industry, lang)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all"
              >
                {txt.viewAllIndustries} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section className="border-y border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
                <Languages size={16} />
                {txt.langBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.langTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-[#64748B]">{txt.langBody}</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {(VOICE_LANGS[lang] ?? VOICE_LANGS.en).map((name) => (
                <li
                  key={name}
                  className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-bold text-[#0F172A] shadow-sm"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
                {txt.featuresBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.featuresTitle}</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {txt.features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.05, 0.2) }}
                    className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] text-[#2563EB]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A]">{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Close CTA */}
        <section className="bg-gradient-to-r from-[#1e40af] via-[#2563EB] to-[#3b82f6] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{txt.closeTitle}</h2>
            <p className="mt-3 text-lg text-blue-100">{txt.closeBody}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#2563EB] transition-colors hover:bg-blue-50"
              >
                {txt.closeJobs} <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={() => onCreateProfileClick?.()}
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {txt.closeProfile}
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </>
  );
}

export { AboutPage };
