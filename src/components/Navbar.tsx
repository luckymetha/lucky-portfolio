"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE, UI_COPY } from "@/data/portfolio-data";

const NAV_ITEMS = [
  { id: "work", key: "work" as const },
  { id: "labs", key: "labs" as const },
  { id: "experience", key: "experience" as const },
  { id: "skills", key: "skills" as const },
  { id: "contact", key: "contact" as const },
];

const emptySubscribe = () => () => {};

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("work");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 140) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0] && offsets[0].top < 600) {
        setActiveSection(offsets[0].id);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <header className="no-print fixed inset-x-0 top-0 z-40">
      {/* Hairline Reading Progress */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] origin-left bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500"
      />

      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
        <nav
          aria-label="Primary Navigation"
          className={`flex items-center justify-between rounded-2xl border px-3.5 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "border-zinc-200/80 bg-white/85 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-zinc-800/90 dark:bg-zinc-950/80 dark:shadow-black/30"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Brand Monogram */}
          <a
            href="#top"
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-950 font-mono text-xs font-bold tracking-tight text-white transition-transform duration-200 group-hover:scale-105 dark:border-zinc-700 dark:bg-white dark:text-zinc-950">
              {PROFILE.monogram}.
            </span>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {PROFILE.shortName}
              </div>
              <div className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                UI · Full-Stack
              </div>
            </div>
          </a>

          {/* Desktop Center Links */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-xl bg-zinc-950/[0.06] dark:bg-white/[0.08]"
                    />
                  )}
                  {t(UI_COPY.nav[item.key])}
                </a>
              );
            })}
          </div>

          {/* Right Controls: Language Switcher + Theme Toggle + Resume */}
          <div className="flex items-center gap-2">
            {/* Bilingual Switcher */}
            <div
              role="group"
              aria-label="Language switcher"
              className="flex items-center rounded-xl border border-zinc-200/90 bg-zinc-100/80 p-0.5 font-mono text-[11px] font-semibold dark:border-zinc-800 dark:bg-zinc-900"
            >
              {(["id", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`relative rounded-lg px-2 py-1 uppercase transition-colors ${
                    lang === code
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {lang === code && (
                    <motion.span
                      layoutId="lang-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-zinc-800"
                    />
                  )}
                  <span className="relative z-10">{code}</span>
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200/90 bg-white text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:text-white"
            >
              {mounted ? (
                isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <span className="h-4 w-4" />
              )}
            </button>

            {/* Printable Resume Route */}
            <Link
              href="/resume"
              className="hidden items-center gap-1.5 rounded-xl border border-zinc-900 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800 sm:inline-flex dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
            >
              <FileText className="h-3.5 w-3.5" />
              {t(UI_COPY.nav.resume)}
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-800 md:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl md:hidden dark:border-zinc-800 dark:bg-zinc-950/95"
            >
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                  >
                    {t(UI_COPY.nav[item.key])}
                  </a>
                ))}
                <Link
                  href="/resume"
                  onClick={() => setMobileOpen(false)}
                  className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-3.5 py-2.5 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-950"
                >
                  <FileText className="h-4 w-4" />
                  {t(UI_COPY.hero.ctaResume)}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
