import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { homeImages } from "@/assets/Home";
import { getIndustries } from "@/features/taxonomy";

const INDUSTRY_VISUALS = {
  construction: { img: homeImages.constructionWorker, color: "#FEF3C7" },
  manufacturing: { img: homeImages.manufacturingIndustries, color: "#FEE2E2" },
  showroom: { img: homeImages.showroomAndMallExecutives, color: "#DBEAFE" },
  retail: { img: homeImages.retailShopWorkers, color: "#FCE7F3" },
  hospital: { img: homeImages.hospitalStaff, color: "#D1FAE5" },
  "elderly-care": { img: homeImages.elderlyCare, color: "#EDE9FE" },
  restaurant: { img: homeImages.restaurantStaff, color: "#FFEDD5" }
};

function JobCategories({ lang, onIndustryClick }) {
  const industries = getIndustries().map((industry) => {
    const visual = INDUSTRY_VISUALS[industry.id] ?? {
      img: homeImages.constructionWorker,
      color: "#F1F5F9"
    };
    const deptCount = industry.departments.length;
    return {
      id: industry.id,
      name: { en: industry.en, hi: industry.hi },
      count:
        lang === "hi"
          ? `${deptCount} विभाग`
          : `${deptCount} Departments`,
      img: visual.img,
      color: visual.color
    };
  });

  return (
    <section id="categories" className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-block bg-orange-50 text-[#F97316] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-orange-100">
              Explore Categories
            </span>
            <h2 className="text-4xl font-extrabold text-[#0F172A]">
              {lang === "hi" ? "सात मुख्य उद्योग" : "Seven Core Industries"}
            </h2>
            <p className="text-[#64748B] mt-2">
              {lang === "hi" ? "अपना उद्योग चुनें" : "Find jobs in your industry"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center gap-2 text-[#2563EB] font-semibold hover:gap-3 transition-all text-sm whitespace-nowrap"
          >
            {lang === "hi" ? "सभी देखें" : "View All"} <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {industries.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => onIndustryClick?.(cat.id)}
              className="group relative rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-56 sm:h-60 lg:h-64 bg-gray-100">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { JobCategories };
