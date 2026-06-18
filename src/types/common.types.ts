// Common types used across the application

export type Language = 'hi' | 'en';

export interface TranslatedText {
  en: string;
  hi: string;
}

export interface ComponentProps {
  lang: Language;
}

// Job-related types
export interface Job {
  id: string;
  title: TranslatedText;
  company: string;
  location: TranslatedText;
  salary: string;
  type: TranslatedText;
  icon: string;
  badge?: TranslatedText;
}

export interface JobCategory {
  name: TranslatedText;
  count: string;
  img: string;
  color: string;
}

// User-related types
export interface UserProfile {
  id: string;
  name: string;
  role: string;
  experience?: number;
  location?: string;
  phone?: string;
  email?: string;
}

// Success story type
export interface SuccessStory {
  name: string;
  role: TranslatedText;
  city: TranslatedText;
  days: number;
  salary: string;
  quote: TranslatedText;
  img: string;
  color: string;
}
