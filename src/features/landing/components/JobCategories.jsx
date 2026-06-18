import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { homeImages } from "@/assets/Home";
const categories = [
  {
    name: { en: "Electrician", hi: "इलेक्ट्रिशियन" },
    count: "2,340+ Jobs",
    img: homeImages.electrician,
    color: "#FEF3C7"
  },
  {
    name: { en: "Plumber", hi: "प्लम्बर" },
    count: "1,820+ Jobs",
    img: homeImages.plumber,
    color: "#DBEAFE"
  },
  {
    name: { en: "Driver", hi: "ड्राइवर" },
    count: "3,100+ Jobs",
    img: homeImages.driver,
    color: "#D1FAE5"
  },
  {
    name: { en: "Delivery Executive", hi: "डिलीवरी एग्जीक्यूटिव" },
    count: "4,200+ Jobs",
    img: homeImages.deliveryAgent,
    color: "#FCE7F3"
  },
  {
    name: { en: "Security Guard", hi: "सुरक्षा गार्ड" },
    count: "1,540+ Jobs",
    img: homeImages.securityGuard,
    color: "#EDE9FE"
  },
  {
    name: { en: "Factory Worker", hi: "कारखाना कर्मी" },
    count: "2,890+ Jobs",
    img: homeImages.factoryWorker,
    color: "#FEE2E2"
  }
];
function JobCategories({ lang }) {
  return <section id="categories" className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-orange-50 text-[#F97316] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
              Explore Categories
            </span>
            <h2 className="text-4xl font-extrabold text-[#0F172A]">
              {lang === "hi" ? "लोकप्रिय नौकरी श्रेणियाँ" : "Popular Job Categories"}
            </h2>
            <p className="text-[#64748B] mt-2">
              {lang === "hi" ? "अपनी पसंद की श्रेणी चुनें" : "Find jobs in your field"}
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all text-sm whitespace-nowrap">
            {lang === "hi" ? "सभी देखें" : "View All"} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: i * 0.08 }}
    className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
  >
              <div className="relative h-48 bg-gray-100">
                <img
    src={cat.img}
    alt={cat.name.en}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1">{cat.name[lang]}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm font-medium">{cat.count}</span>
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#F97316] transition-colors">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}
export {
  JobCategories
};
