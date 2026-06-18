// Application constants

export const APP_NAME = 'KaamSetu';
export const APP_TAGLINE = "India's Voice-First Job Portal";

export const STORAGE_KEYS = {
  LANGUAGE: 'kaamsetu-lang',
  USER_TOKEN: 'kaamsetu-token',
  USER_PROFILE: 'kaamsetu-profile',
} as const;

export const LANGUAGES = {
  HINDI: 'hi',
  ENGLISH: 'en',
} as const;

export const COLORS = {
  PRIMARY_BLUE: '#2563EB',
  ORANGE: '#F97316',
  GREEN: '#22C55E',
  DARK_GRAY: '#0F172A',
  LIGHT_GRAY: '#F8FAFC',
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export const SECTION_IDS = {
  HERO: 'hero',
  HOW_IT_WORKS: 'how-it-works',
  CATEGORIES: 'categories',
  JOBS: 'jobs',
  EMPLOYERS: 'employers',
  STORIES: 'stories',
  CTA: 'cta',
} as const;

export const API_ENDPOINTS = {
  // Future API endpoints will go here
  JOBS: '/api/jobs',
  AUTH: '/api/auth',
  RESUME: '/api/resume',
  APPLICATIONS: '/api/applications',
} as const;
