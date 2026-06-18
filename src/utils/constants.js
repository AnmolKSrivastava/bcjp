const APP_NAME = "KaamSetu";
const APP_TAGLINE = "India's Voice-First Job Portal";
const STORAGE_KEYS = {
  LANGUAGE: "kaamsetu-lang",
  USER_TOKEN: "kaamsetu-token",
  USER_PROFILE: "kaamsetu-profile"
};
const LANGUAGES = {
  HINDI: "hi",
  ENGLISH: "en"
};
const COLORS = {
  PRIMARY_BLUE: "#2563EB",
  ORANGE: "#F97316",
  GREEN: "#22C55E",
  DARK_GRAY: "#0F172A",
  LIGHT_GRAY: "#F8FAFC"
};
const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536
};
const SECTION_IDS = {
  HERO: "hero",
  HOW_IT_WORKS: "how-it-works",
  CATEGORIES: "categories",
  JOBS: "jobs",
  EMPLOYERS: "employers",
  STORIES: "stories",
  CTA: "cta"
};
const API_ENDPOINTS = {
  // Future API endpoints will go here
  JOBS: "/api/jobs",
  AUTH: "/api/auth",
  RESUME: "/api/resume",
  APPLICATIONS: "/api/applications"
};
export {
  API_ENDPOINTS,
  APP_NAME,
  APP_TAGLINE,
  BREAKPOINTS,
  COLORS,
  LANGUAGES,
  SECTION_IDS,
  STORAGE_KEYS
};
