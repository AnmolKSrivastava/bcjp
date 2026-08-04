/** Shared job-posting / job-filter option lists (English values are stored in Firestore). */

const EMPLOYMENT_TYPES = [
  { en: "Full Time", hi: "पूर्णकालिक" },
  { en: "Part Time", hi: "अंशकालिक" },
  { en: "Contract", hi: "कॉन्ट्रैक्ट" },
  { en: "Daily Wage", hi: "दैनिक मजदूरी" }
];

const EXPERIENCE_OPTIONS = [
  { en: "Any / Fresher", hi: "कोई भी / फ्रेशर" },
  { en: "Less than 1 year", hi: "1 साल से कम" },
  { en: "1–3 years", hi: "1–3 साल" },
  { en: "3–5 years", hi: "3–5 साल" },
  { en: "5+ years", hi: "5+ साल" }
];

export { EMPLOYMENT_TYPES, EXPERIENCE_OPTIONS };
