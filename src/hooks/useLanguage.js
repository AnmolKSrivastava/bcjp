import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "@/utils/constants";
function useLanguage() {
  const [lang, setLang] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (saved && (saved === "hi" || saved === "en")) {
      setLang(saved);
    }
  }, []);
  const updateLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLang);
  };
  const toggleLanguage = () => {
    const next = lang === "hi" ? "en" : "hi";
    updateLanguage(next);
  };
  return {
    lang,
    setLang: updateLanguage,
    toggleLang: toggleLanguage,
    activeLang: lang ?? "en"
  };
}
export {
  useLanguage
};
