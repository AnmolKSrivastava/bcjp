import { useState, useEffect } from 'react';

export type Language = 'hi' | 'en';

const STORAGE_KEY = 'kaamsetu-lang';

/**
 * Custom hook for managing language selection
 * Handles localStorage persistence and provides language toggle
 */
export function useLanguage() {
  const [lang, setLang] = useState<Language | null>(null);

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && (saved === 'hi' || saved === 'en')) {
      setLang(saved);
    }
  }, []);

  // Update language and persist to localStorage
  const updateLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  // Toggle between Hindi and English
  const toggleLanguage = () => {
    const next: Language = lang === 'hi' ? 'en' : 'hi';
    updateLanguage(next);
  };

  return {
    lang,
    setLang: updateLanguage,
    toggleLang: toggleLanguage,
    activeLang: lang ?? 'en',
  };
}
