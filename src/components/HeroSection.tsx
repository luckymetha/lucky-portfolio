"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  Check,
  Clock,
  Copy,
  FileText,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROFILE, UI_COPY } from "@/data/portfolio-data";

export function HeroSection() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState<string>("--:-- WIB");

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("id-ID", {
          timeZone: PROFILE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        setLocalTime(`${formatted} WIB`);
      } catch {
        setLocalTime("UTC+7 WIB");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-zinc-200/80 pt-28 pb-16 sm:pt-36 sm:pb-24 dark:border-zinc-800/80"
    >
      {/* Architectural Grid + Soft Ambient Glow */}
      <div className="bg-architectural-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_45%,transparent_85%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-3xl dark:bg-blue-500/[0.12]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.28fr_0.72fr] lg:gap-12">
          {/* Left Editorial Column */}
          <div className="min-w-0">
            {/* Availability Pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="truncate">{t(PROFILE.availability)}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 text-[2.15rem] font-extrabold leading-[1.1] tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem] dark:text-zinc-50"
            >
              {t(PROFILE.heroTitlePrefix)}{" "}
              <span className="font-serif text-[1.12em] font-normal italic text-blue-600 dark:text-blue-400">
                {t(PROFILE.heroTitleAccent)}
              </span>{" "}
              {t(PROFILE.heroTitleSuffix)}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400"
            >
              {t(PROFILE.heroSubtitle)}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <span>{t(UI_COPY.hero.ctaPrimary)}</span>
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                <span>{t(UI_COPY.hero.ctaSecondary)}</span>
              </a>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                <FileText className="h-4 w-4" />
                <span>{t(UI_COPY.hero.ctaResume)}</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Developer Profile & Live Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="min-w-0 rounded-2xl border border-zinc-200/90 bg-white/90 p-5 shadow-xl shadow-zinc-950/[0.04] backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-900/75 dark:shadow-black/40"
          >
            {/* Identity Header */}
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-xs dark:border-zinc-700 dark:bg-zinc-800">
                <img
                  src={PROFILE.photo}
                  alt={PROFILE.name}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {PROFILE.name}
                </h2>
                <p className="mt-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                  UI Specialist &amp; Full-Stack Dev
                </p>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{PROFILE.location}</span>
                </div>
              </div>
            </div>

            {/* Live Metadata Rows */}
            <div className="mt-5 space-y-2.5 border-y border-zinc-200/80 py-4 text-xs dark:border-zinc-800/80">
              <div className="flex items-center justify-between gap-3">
                <span className="flex shrink-0 items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Clock className="h-3.5 w-3.5" />
                  {t(UI_COPY.hero.localTimeLabel)}
                </span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  {localTime}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex shrink-0 items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t(UI_COPY.hero.focusLabel)}
                </span>
                <span className="min-w-0 truncate text-right font-medium text-zinc-900 dark:text-zinc-200">
                  {t(UI_COPY.hero.focusValue)}
                </span>
              </div>
            </div>

            {/* Core Stack Mini Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["TypeScript", "React", "Next.js", "Laravel", "Tailwind", "Flutter"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {t(UI_COPY.hero.copied)}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t(UI_COPY.hero.copyEmail)}</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/${PROFILE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{t(UI_COPY.hero.chatWhatsapp)}</span>
              </a>
            </div>

            {(PROFILE.linkedinUrl || PROFILE.githubUrl) && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {PROFILE.linkedinUrl && (
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/[0.06] hover:text-[#0A66C2] dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-sky-500/40 dark:hover:bg-sky-500/10 dark:hover:text-sky-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5 shrink-0 text-[#0A66C2] dark:text-sky-400"
                      aria-hidden="true"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    <span>LinkedIn ↗</span>
                  </a>
                )}
                {PROFILE.githubUrl && (
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-3.5 w-3.5 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                    <span>GitHub ↗</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Minimalist 4-Column Metric Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 lg:grid-cols-4"
        >
          {PROFILE.metrics.map((m) => (
            <div
              key={m.value}
              className="rounded-2xl border border-zinc-200/80 bg-white/75 p-4 backdrop-blur-xs transition-colors hover:border-zinc-300 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-zinc-700"
            >
              <div className="font-mono text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl dark:text-zinc-50">
                {m.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                {t(m.label)}
              </div>
              <div className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                {t(m.detail)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
