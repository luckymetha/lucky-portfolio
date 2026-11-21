"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import type { Language, LocalizedList, LocalizedText } from "@/types/portfolio";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (text: LocalizedText) => string;
  tList: (list: LocalizedList) => string[];
}

const STORAGE_KEY = "lucky_portfolio_lang";
const LANG_EVENT = "lucky-portfolio-lang-change";

function subscribeLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_EVENT, callback);
  };
}

function getClientLanguage(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" ? "en" : "id";
}

function getServerLanguage(): Language {
  return "id";
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(
    subscribeLanguage,
    getClientLanguage,
    getServerLanguage
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Language) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  const t = (text: LocalizedText) => text[lang];
  const tList = (list: LocalizedList) => list[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tList }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
