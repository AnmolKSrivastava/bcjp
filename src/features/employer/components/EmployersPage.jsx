import { Link } from "react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  MapPin,
  Phone,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import { getIndustries, labelOf } from "@/features/taxonomy";
import { Footer } from "@/shared/layout/Footer";

const copy = {
  en: {
    badge: "For Employers",
    brand: "BharatGig",
    title: "Hire frontline workers with clear roles and a simple dashboard",
    lead:
      "Set up your company, post jobs using Industry → Department → Role, and manage applicants from one place — built for India's seven core employment industries.",
    ctaPost: "Post a job",
    ctaAbout: "About Bharat Gig",
    whyBadge: "Why employers use Bharat Gig",
    whyTitle: "Hiring that matches how frontline work is organized",
    whyBody:
      "Workers often arrive without a typed resume. You get structured profiles from voice onboarding, jobs tagged to the right role, and applicants you can call and move through a clear hiring pipeline.",
    stepsBadge: "How hiring works",
    stepsTitle: "From phone login to your first hire",
    steps: [
      {
        title: "Sign in with your phone",
        desc: "Use OTP login, then choose “I want to hire” so we set up an employer account."
      },
      {
        title: "Create your company profile",
        desc: "Add company name, industry, city, and a contact person. Your organization starts as pending verification."
      },
      {
        title: "Post a structured job",
        desc: "Pick industry, department, and role, then add location, salary, experience, skills, openings, and description."
      },
      {
        title: "Manage applicants on your dashboard",
        desc: "Track applications, call candidates, update status from applied to hired, and edit or close jobs anytime."
      }
    ],
    companyBadge: "Company setup",
    companyTitle: "What you share when you join",
    companyItems: [
      "Company name",
      "Industry (one of seven)",
      "City",
      "Contact person",
      "Optional company description"
    ],
    jobBadge: "Job posting",
    jobTitle: "What goes into every opening",
    jobItems: [
      "Industry → Department → Role",
      "Employment type (full time, part time, contract, daily wage)",
      "Location and salary range",
      "Experience required and number of openings",
      "Skills and job description"
    ],
    dashBadge: "Employer dashboard",
    dashTitle: "Stay on top of every application",
    dashItems: [
      {
        icon: LayoutDashboard,
        title: "Live hiring stats",
        desc: "See applications, shortlisted, and hired counts from your real jobs — not estimates."
      },
      {
        icon: ClipboardList,
        title: "Applicant pipeline",
        desc: "Move candidates through applied, reviewing, shortlisted, rejected, and hired."
      },
      {
        icon: Phone,
        title: "Call from the dashboard",
        desc: "Reach workers directly on their phone number when you're ready to interview."
      },
      {
        icon: Briefcase,
        title: "Edit and close jobs",
        desc: "Update openings as needs change, or close and reopen roles when hiring pauses."
      }
    ],
    industriesBadge: "Supported industries",
    industriesTitle: "Hire within seven focused verticals",
    industriesBody:
      "Keeping scope tight means every job maps to a known department and role — easier for workers to find you, and clearer for you to post.",
    viewIndustries: "Browse industries",
    closeTitle: "Ready to post your next opening?",
    closeBody: "Sign in with your phone, set up your company once, and publish a job in minutes.",
    closePost: "Post a job",
    closeJobs: "See open jobs on Bharat Gig"
  },
  hi: {
    badge: "नियोक्ताओं के लिए",
    brand: "भारतगिग",
    title: "स्पष्ट भूमिकाओं और आसान डैशबोर्ड के साथ फ्रंटलाइन कामगारों को हायर करें",
    lead:
      "कंपनी सेटअप करें, उद्योग → विभाग → भूमिका के साथ नौकरियाँ पोस्ट करें, और एक जगह से आवेदकों को मैनेज करें — भारत के सात मुख्य रोज़गार उद्योगों के लिए।",
    ctaPost: "नौकरी पोस्ट करें",
    ctaAbout: "भारत गिग के बारे में",
    whyBadge: "नियोक्ता भारत गिग क्यों चुनते हैं",
    whyTitle: "भर्ती जो फ्रंटलाइन काम के तरीके से मेल खाती है",
    whyBody:
      "कामगार अक्सर टाइप किया हुआ रेज़्यूमे लेकर नहीं आते। आपको वॉयस ऑनबोर्डिंग से व्यवस्थित प्रोफाइल, सही भूमिका पर टैग नौकरियाँ, और एक स्पष्ट पाइपलाइन मिलती है — कॉल करें और हायर तक ले जाएँ।",
    stepsBadge: "भर्ती कैसे काम करती है",
    stepsTitle: "फ़ोन लॉगिन से पहली हायरिंग तक",
    steps: [
      {
        title: "फ़ोन से साइन इन करें",
        desc: "OTP से लॉगिन करें, फिर “मैं हायर करना चाहता/चाहती हूँ” चुनें ताकि नियोक्ता खाता बने।"
      },
      {
        title: "कंपनी प्रोफाइल बनाएं",
        desc: "कंपनी का नाम, उद्योग, शहर और संपर्क व्यक्ति जोड़ें। संगठन सत्यापन के लिए पेंडिंग रहता है।"
      },
      {
        title: "व्यवस्थित नौकरी पोस्ट करें",
        desc: "उद्योग, विभाग और भूमिका चुनें; फिर स्थान, वेतन, अनुभव, कौशल, ओपनिंग्स और विवरण जोड़ें।"
      },
      {
        title: "डैशबोर्ड पर आवेदक मैनेज करें",
        desc: "आवेदन ट्रैक करें, उम्मीदवारों को कॉल करें, स्थिति अपडेट करें, और नौकरियाँ संपादित या बंद करें।"
      }
    ],
    companyBadge: "कंपनी सेटअप",
    companyTitle: "जॉइन करते समय आप क्या बताते हैं",
    companyItems: [
      "कंपनी का नाम",
      "उद्योग (सात में से एक)",
      "शहर",
      "संपर्क व्यक्ति",
      "वैकल्पिक कंपनी विवरण"
    ],
    jobBadge: "नौकरी पोस्टिंग",
    jobTitle: "हर ओपनिंग में क्या जाता है",
    jobItems: [
      "उद्योग → विभाग → भूमिका",
      "रोज़गार प्रकार (पूर्णकालिक, अंशकालिक, कॉन्ट्रैक्ट, दैनिक मजदूरी)",
      "स्थान और वेतन सीमा",
      "आवश्यक अनुभव और ओपनिंग्स की संख्या",
      "कौशल और जॉब विवरण"
    ],
    dashBadge: "नियोक्ता डैशबोर्ड",
    dashTitle: "हर आवेदन पर नज़र रखें",
    dashItems: [
      {
        icon: LayoutDashboard,
        title: "लाइव हायरिंग आँकड़े",
        desc: "आपकी असली नौकरियों से आवेदन, शॉर्टलिस्ट और हायर्ड की गिनती देखें।"
      },
      {
        icon: ClipboardList,
        title: "आवेदक पाइपलाइन",
        desc: "आवेदित, समीक्षा, शॉर्टलिस्ट, अस्वीकृत और हायर्ड तक स्थिति बदलें।"
      },
      {
        icon: Phone,
        title: "डैशबोर्ड से कॉल",
        desc: "इंटरव्यू के लिए कामगारों को सीधे उनके नंबर पर कॉल करें।"
      },
      {
        icon: Briefcase,
        title: "नौकरी संपादित और बंद करें",
        desc: "ज़रूरत बदलने पर ओपनिंग अपडेट करें, या हायरिंग रुकने पर बंद/फिर खोलें।"
      }
    ],
    industriesBadge: "समर्थित उद्योग",
    industriesTitle: "सात फोकस्ड वर्टिकल्स में हायर करें",
    industriesBody:
      "सीमित दायरा रखने से हर नौकरी ज्ञात विभाग और भूमिका से जुड़ती है — कामगार आपको आसानी से पाते हैं, और पोस्ट करना स्पष्ट रहता है।",
    viewIndustries: "उद्योग देखें",
    closeTitle: "अगली ओपनिंग पोस्ट करने के लिए तैयार?",
    closeBody: "फ़ोन से साइन इन करें, एक बार कंपनी सेटअप करें, और कुछ ही मिनटों में नौकरी प्रकाशित करें।",
    closePost: "नौकरी पोस्ट करें",
    closeJobs: "भारत गिग पर खुली नौकरियाँ देखें"
  }
};

const stepIcons = [Phone, Building2, Briefcase, Users];

function EmployersPage({ lang = "en", onPostJobClick }) {
  const txt = copy[lang] ?? copy.en;
  const industries = getIndustries();

  return (
    <>
      <div className="min-h-screen bg-white">
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
                <button
                  type="button"
                  onClick={() => onPostJobClick?.()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700"
                >
                  {txt.ctaPost} <ArrowRight size={16} />
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#E2E8F0] bg-white px-5 py-3 text-sm font-bold text-[#0F172A] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
                >
                  {txt.ctaAbout}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
              {txt.whyBadge}
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] sm:text-4xl">{txt.whyTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#64748B]">{txt.whyBody}</p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-[#2563EB]">
                {txt.stepsBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.stepsTitle}</h2>
            </div>
            <ol className="grid gap-5 md:grid-cols-2">
              {txt.steps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.06, 0.24) }}
                    className="flex gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#94A3B8]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-[#0F172A]">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{step.desc}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="border-y border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm"
            >
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#F97316]">
                <Building2 size={14} />
                {txt.companyBadge}
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">{txt.companyTitle}</h2>
              <ul className="mt-5 space-y-3">
                {txt.companyItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#22C55E]" />
                    <span className="font-medium text-[#0F172A]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm"
            >
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                <MapPin size={14} />
                {txt.jobBadge}
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">{txt.jobTitle}</h2>
              <ul className="mt-5 space-y-3">
                {txt.jobItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#2563EB]" />
                    <span className="font-medium text-[#0F172A]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <span className="mb-4 inline-block rounded-full border border-green-100 bg-green-50 px-4 py-1.5 text-sm font-semibold text-[#22C55E]">
                {txt.dashBadge}
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A]">{txt.dashTitle}</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {txt.dashItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
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
                      <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#64748B]">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-[#E2E8F0] bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
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
                    className="inline-flex rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB] hover:bg-blue-50 hover:text-[#2563EB]"
                  >
                    {labelOf(industry, lang)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-all hover:gap-3"
              >
                {txt.viewIndustries} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-[#1e40af] via-[#2563EB] to-[#3b82f6] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{txt.closeTitle}</h2>
            <p className="mt-3 text-lg text-blue-100">{txt.closeBody}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onPostJobClick?.()}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[#2563EB] transition-colors hover:bg-blue-50"
              >
                {txt.closePost} <ArrowRight size={16} />
              </button>
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                {txt.closeJobs}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </>
  );
}

export { EmployersPage };
