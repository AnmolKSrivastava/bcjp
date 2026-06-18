import { useState, useEffect } from "react";
const STORAGE_KEY = "kaamsetu-lang";
function useLanguage() {
  const [lang, setLang] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "hi" || saved === "en")) {
      setLang(saved);
    }
  }, []);
  const updateLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
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
