import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Briefcase, ChevronDown, Layers, Search } from "lucide-react";
import { motion } from "motion/react";
import { homeImages } from "@/assets/Home";
import { getIndustry, labelOf } from "@/features/taxonomy";
import { Footer } from "@/shared/layout/Footer";

const INDUSTRY_VISUALS = {
  construction: {
    img: homeImages.constructionWorker,
    color: "#FEF3C7",
    accent: "#F97316",
    position: "center 12%"
  },
  manufacturing: {
    img: homeImages.manufacturingIndustries,
    color: "#FEE2E2",
    accent: "#EF4444",
    position: "center 18%"
  },
  showroom: {
    img: homeImages.showroomAndMallExecutives,
    color: "#DBEAFE",
    accent: "#2563EB",
    position: "center 15%"
  },
  retail: {
    img: homeImages.retailShopWorkers,
    color: "#FCE7F3",
    accent: "#DB2777",
    position: "center 10%"
  },
  hospital: {
    img: homeImages.hospitalStaff,
    color: "#D1FAE5",
    accent: "#22C55E",
    position: "center 20%"
  },
  "elderly-care": {
    img: homeImages.elderlyCare,
    color: "#EDE9FE",
    accent: "#7C3AED",
    position: "center 14%"
  },
  restaurant: {
    img: homeImages.restaurantStaff,
    color: "#FFEDD5",
    accent: "#EA580C",
    position: "center 12%"
  }
};

const copy = {
  en: {
    back: "All industries",
    badge: "Industry",
    departments: "Departments",
    roles: "Roles",
    selectRole: "Select a job role",
    browseJobs: "Browse jobs in this industry",
    browseRole: "Find jobs for this role",
    pickRole: "Choose a role from the dropdown to continue",
    notFound: "This industry was not found.",
    allIndustries: "All industries"
  },
  hi: {
    back: "सभी उद्योग",
    badge: "उद्योग",
    departments: "विभाग",
    roles: "भूमिकाएँ",
    selectRole: "नौकरी की भूमिका चुनें",
    browseJobs: "इस उद्योग की नौकरियाँ देखें",
    browseRole: "इस भूमिका की नौकरियाँ खोजें",
    pickRole: "आगे बढ़ने के लिए ड्रॉपडाउन से भूमिका चुनें",
    notFound: "यह उद्योग नहीं मिला।",
    allIndustries: "सभी उद्योग"
  }
};

function IndustryDetailPage({ lang = "en" }) {
  const txt = copy[lang] ?? copy.en;
  const navigate = useNavigate();
  const { industryId } = useParams();
  const industry = getIndustry(industryId);
  const visual = INDUSTRY_VISUALS[industryId] ?? INDUSTRY_VISUALS.construction;
  const [selectedByDept, setSelectedByDept] = useState({});

  const totalRoles = useMemo(() => {
    if (!industry) return 0;
    return industry.departments.reduce((sum, d) => sum + d.roles.length, 0);
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-[60vh] bg-[#F8FAFC] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-[#0F172A]">{txt.notFound}</p>
          <Link
            to="/industries"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
          >
            <ArrowLeft size={16} />
            {txt.back}
          </Link>
        </div>
      </div>
    );
  }

  const goToJobs = (departmentId, roleId) => {
    const params = new URLSearchParams();
    params.set("industry", industry.id);
    if (departmentId) params.set("department", departmentId);
    if (roleId) params.set("role", roleId);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8FAFC]">
        <div
          className="relative overflow-hidden border-b border-[#E2E8F0]"
          style={{ background: `linear-gradient(135deg, ${visual.color} 0%, #ffffff 55%)` }}
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-14">
            <div>
              <button
                type="button"
                onClick={() => navigate("/industries")}
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:gap-3 transition-all"
              >
                <ArrowLeft size={16} />
                {txt.back}
              </button>
              <span className="inline-block rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-[#F97316]">
                {txt.badge}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold text-[#0F172A] sm:text-4xl lg:text-5xl">
                {labelOf(industry, lang)}
              </h1>
              <p className="mt-3 max-w-xl text-[#64748B]">
                {lang === "hi"
                  ? "विभाग कार्ड चुनें और ड्रॉपडाउन से अपनी भूमिका चुनें।"
                  : "Explore department cards and pick your job role from each dropdown."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-semibold text-[#0F172A]">
                  <Layers size={16} className="text-[#F97316]" />
                  {industry.departments.length} {txt.departments}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm font-semibold text-[#0F172A]">
                  <Briefcase size={16} className="text-[#2563EB]" />
                  {totalRoles} {txt.roles}
                </span>
              </div>
              <button
                type="button"
                onClick={() => goToJobs()}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
              >
                <Search size={18} />
                {txt.browseJobs}
              </button>
            </div>
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gray-100 shadow-sm">
              {/* Same image height as home industry cards */}
              <div className="relative h-56 sm:h-60 lg:h-64">
                <img
                  src={visual.img}
                  alt={labelOf(industry, "en")}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: visual.position ?? "center top" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                  {labelOf(industry, lang)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0F172A]">{txt.departments}</h2>
              <p className="mt-1 text-sm text-[#64748B]">{txt.pickRole}</p>
            </div>
            <Link to="/industries" className="text-sm font-semibold text-[#2563EB] hover:underline">
              {txt.allIndustries}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industry.departments.map((department, index) => {
              const selectedRole = selectedByDept[department.id] || "";
              return (
                <motion.div
                  key={department.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
                  className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-extrabold text-white"
                    style={{ background: visual.accent }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{labelOf(department, lang)}</h3>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {department.roles.length} {txt.roles}
                  </p>

                  <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                    {txt.selectRole}
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      value={selectedRole}
                      onChange={(e) =>
                        setSelectedByDept((prev) => ({
                          ...prev,
                          [department.id]: e.target.value
                        }))
                      }
                      className="h-11 w-full appearance-none rounded-xl border-2 border-[#E2E8F0] bg-[#F8FAFC] px-3 pr-10 text-sm font-semibold text-[#0F172A] outline-none transition-colors focus:border-[#2563EB] focus:bg-white"
                    >
                      <option value="">{txt.selectRole}</option>
                      {department.roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {labelOf(role, lang)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!selectedRole}
                    onClick={() => goToJobs(department.id, selectedRole)}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1E293B] disabled:cursor-not-allowed disabled:bg-[#CBD5E1]"
                  >
                    {txt.browseRole}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  );
}

export { IndustryDetailPage };
