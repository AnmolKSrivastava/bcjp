import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";
const stories = [
  {
    name: "Ramesh Kumar",
    role: { en: "Electrician", hi: "इलेक्ट्रिशियन" },
    city: { en: "Pune", hi: "पुणे" },
    days: 5,
    salary: "₹28,000/mo",
    quote: {
      en: "I just spoke for 5 minutes and KaamSetu created my resume. Got hired in just 5 days!",
      hi: "मैंने सिर्फ 5 मिनट बोला और KaamSetu ने मेरा रेज़्यूमे बना दिया। 5 दिन में नौकरी मिली!"
    },
    img: homeImages.electrician,
    color: "#FEF3C7"
  },
  {
    name: "Sunita Devi",
    role: { en: "Housekeeping", hi: "हाउसकीपिंग" },
    city: { en: "Delhi", hi: "दिल्ली" },
    days: 8,
    salary: "₹20,000/mo",
    quote: {
      en: "I didn't know how to write a resume. Now I have a job at a hotel, thanks to KaamSetu!",
      hi: "मुझे रेज़्यूमे लिखना नहीं आता था। अब होटल में नौकरी मिली, KaamSetu का शुक्रिया!"
    },
    img: homeImages.housekeeping,
    color: "#DBEAFE"
  },
  {
    name: "Imran Khan",
    role: { en: "Driver", hi: "ड्राइवर" },
    city: { en: "Lucknow", hi: "लखनऊ" },
    days: 6,
    salary: "₹30,000/mo",
    quote: {
      en: "The voice resume was a game changer. Companies called me directly. Hired in 6 days!",
      hi: "वॉयस रेज़्यूमे ने सब बदल दिया। कंपनियाँ सीधे कॉल करने लगीं। 6 दिन में नौकरी!"
    },
    img: homeImages.driver,
    color: "#D1FAE5"
  }
];
function SuccessStories({ lang }) {
  return <section id="stories" className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-green-50 text-[#22C55E] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-green-100">
            Real Stories
          </span>
          <h2 className="text-4xl font-extrabold text-[#0F172A] mb-3">
            {lang === "hi" ? "सफलता की कहानियाँ" : "Success Stories"}
          </h2>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            {lang === "hi" ? "हज़ारों मज़दूरों ने KaamSetu से अपनी नई नौकरी पाई" : "Thousands of workers found their next job through KaamSetu"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: i * 0.12 }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
              {
    /* Quote */
  }
              <Quote size={28} className="text-[#E2E8F0] mb-4" />
              <p className="text-[#0F172A] mb-6 leading-relaxed font-medium">
                "{story.quote[lang]}"
              </p>

              {
    /* Stars */
  }
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="#F97316" stroke="none" />)}
              </div>

              {
    /* Profile */
  }
              <div className="flex items-center gap-3">
                <img
    src={story.img}
    alt={story.name}
    className="w-12 h-12 rounded-full object-cover border-2 border-[#E2E8F0]"
  />
                <div className="flex-1">
                  <p className="font-bold text-[#0F172A]">{story.name}</p>
                  <p className="text-sm text-[#64748B]">
                    {story.role[lang]} · {story.city[lang]}
                  </p>
                </div>
                <div
    className="text-right px-3 py-1.5 rounded-xl text-sm font-bold"
    style={{ background: story.color }}
  >
                  <p className="text-[#0F172A]">🎯 {story.days} Days</p>
                </div>
              </div>

              {
    /* Salary badge */
  }
              <div className="mt-4 pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-sm text-[#64748B]">
                  {lang === "hi" ? "नई सैलरी" : "New Salary"}
                </span>
                <span className="text-base font-bold text-[#22C55E]">{story.salary}</span>
              </div>
            </motion.div>)}
        </div>

        {
    /* Stats bar */
  }
        <div className="mt-14 bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
    { value: "50,000+", label: { en: "Workers Hired", hi: "मज़दूर नियुक्त" } },
    { value: "6 Days", label: { en: "Avg. Hire Time", hi: "औसत नियुक्ति समय" } },
    { value: "10,000+", label: { en: "Employers", hi: "नियोक्ता" } },
    { value: "98%", label: { en: "Satisfaction Rate", hi: "संतुष्टि दर" } }
  ].map((stat, i) => <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-[#2563EB] mb-1">{stat.value}</p>
                <p className="text-sm text-[#64748B] font-medium">{stat.label[lang]}</p>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
}
export {
  SuccessStories
};
