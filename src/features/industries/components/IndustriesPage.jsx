import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";
import { getIndustries } from "@/features/taxonomy";
import { Footer } from "@/shared/layout/Footer";

const INDUSTRY_VISUALS = {
  construction: { img: homeImages.constructionWorker, color: "#FEF3C7" },
  manufacturing: { img: homeImages.manufacturingIndustries, color: "#FEE2E2" },
  showroom: { img: homeImages.showroomAndMallExecutives, color: "#DBEAFE" },
  retail: { img: homeImages.retailShopWorkers, color: "#FCE7F3" },
  hospital: { img: homeImages.hospitalStaff, color: "#D1FAE5" },
  "elderly-care": { img: homeImages.elderlyCare, color: "#EDE9FE" },
  restaurant: { img: homeImages.restaurantStaff, color: "#FFEDD5" }
};

const copy = {
  en: {
    badge: "Explore Industries",
    title: "Seven Core Industries",
    subtitle: "Pick your industry to browse departments, roles, and open jobs",
    departments: "Departments",
    browseJobs: "Browse jobs"
  },
  hi: {
    badge: "उद्योग देखें",
    title: "सात मुख्य उद्योग",
    subtitle: "विभाग, भूमिकाएँ और नौकरियाँ देखने के लिए अपना उद्योग चुनें",
    departments: "विभाग",
    browseJobs: "नौकरियाँ देखें"
  }
};

function IndustriesPage({ lang = "en" }) {
  const txt = copy[lang] ?? copy.en;
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
          ? `${deptCount} ${txt.departments}`
          : `${deptCount} ${txt.departments}`,
      img: visual.img,
      color: visual.color
    };
  });

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC]">
        <section className="px-4 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <span className="mb-4 inline-block rounded-full border border-orange-100 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-[#F97316]">
                {txt.badge}
              </span>
              <h1 className="text-4xl font-extrabold text-[#0F172A]">{txt.title}</h1>
              <p className="mt-2 text-[#64748B]">{txt.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
              {industries.map((cat, i) => (
                <Link
                  key={cat.id}
                  to={`/industries/${cat.id}`}
                  className="group relative block overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.35) }}
                  >
                    <div className="relative h-56 bg-gray-100 sm:h-60 lg:h-64">
                      <img
                        src={cat.img}
                        alt={cat.name.en}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className="mb-1 text-xl font-bold text-white">{cat.name[lang]}</h2>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/80">{cat.count}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-[#F97316]">
                          <ArrowRight size={14} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer lang={lang} />
    </>
  );
}

export { IndustriesPage };
