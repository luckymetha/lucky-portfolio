"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Printer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  EDUCATION,
  EXPERIENCES,
  PROFILE,
  PROJECTS,
} from "@/data/portfolio-data";

export default function ResumePage() {
  const { lang, setLang, t, tList } = useLanguage();
  const featured = PROJECTS.filter((p) => p.section === "featured");

  return (
    <div className="min-h-screen bg-zinc-100 py-8 px-4 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 print:bg-white print:p-0">
      {/* Action Bar (hidden when printing) */}
      <div className="no-print mx-auto mb-6 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{lang === "id" ? "Kembali ke Portofolio" : "Back to Portfolio"}</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-zinc-200 bg-white p-0.5 font-mono text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900">
            {(["id", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`rounded-lg px-2.5 py-1 uppercase transition-colors ${
                  lang === code
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href="/CV_Lucky_Metha_Purnomo.pdf"
            download="CV_Lucky_Metha_Purnomo.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <span>{lang === "id" ? "Unduh CV V14 (PDF)" : "Download CV V14 (PDF)"} ↓</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
          >
            <Printer className="h-4 w-4" />
            <span>{lang === "id" ? "Cetak / Simpan PDF" : "Print / Save PDF"}</span>
          </button>
        </div>
      </div>

      {/* ATS-Friendly A4 Paper Sheet */}
      <article className="mx-auto max-w-4xl rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-900 shadow-xl sm:p-12 print:max-w-none print:rounded-none print:border-none print:p-6 print:shadow-none">
        {/* Header */}
        <header className="flex flex-col justify-between gap-5 border-b-2 border-zinc-900 pb-6 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950 uppercase sm:text-3xl">
              {PROFILE.name}
            </h1>
            <p className="mt-1.5 text-sm font-semibold text-blue-700">
              {t(PROFILE.roleTagline)}
            </p>
            <p className="mt-2.5 text-xs text-zinc-600">
              {PROFILE.location} &nbsp;|&nbsp; {PROFILE.phoneDisplay} &nbsp;|&nbsp;{" "}
              <a href={`mailto:${PROFILE.email}`} className="underline">
                {PROFILE.email}
              </a>
            </p>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600">
              {PROFILE.linkedinUrl && (
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-700 underline"
                >
                  {PROFILE.linkedinDisplay}
                </a>
              )}
              {PROFILE.githubUrl && (
                <>
                  <span>|</span>
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    {PROFILE.githubDisplay}
                  </a>
                </>
              )}
              {PROFILE.portfolioUrl && (
                <>
                  <span>|</span>
                  <a
                    href={PROFILE.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-700 underline"
                  >
                    {PROFILE.portfolioUrl.replace(/^https?:\/\//, "")}
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg border border-zinc-300 bg-zinc-100">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mt-6">
          <h2 className="border-b border-zinc-200 pb-1.5 text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            {lang === "id" ? "Ringkasan Profesional" : "Professional Summary"}
          </h2>
          <p className="mt-2.5 text-xs leading-relaxed text-zinc-700 sm:text-[13px]">
            {t(PROFILE.summaryForResume)}
          </p>
        </section>

        {/* Work Experience */}
        <section className="mt-6">
          <h2 className="border-b border-zinc-200 pb-1.5 text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            {lang === "id" ? "Pengalaman Kerja" : "Work Experience"}
          </h2>
          <div className="mt-3 space-y-4">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-zinc-950">
                    {t(exp.role)} — {exp.company}
                  </h3>
                  <span className="font-mono text-xs font-semibold text-zinc-600">
                    {t(exp.period)}
                  </span>
                </div>
                <p className="text-xs font-medium text-zinc-500">
                  {t(exp.division)}
                </p>
                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-zinc-700 sm:text-[13px]">
                  {tList(exp.bullets).map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Projects */}
        <section className="mt-6">
          <h2 className="border-b border-zinc-200 pb-1.5 text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            {lang === "id" ? "Proyek Pilihan" : "Selected Projects"}
          </h2>
          <div className="mt-3 space-y-4">
            {featured.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-zinc-950">
                    {proj.title}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500">
                    {proj.year}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span>{t(proj.role)}</span>
                  {proj.liveUrl && (
                    <>
                      <span>|</span>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                      >
                        <span>{proj.liveUrl}</span>
                        <ExternalLink className="no-print h-3 w-3" />
                      </a>
                    </>
                  )}
                </div>
                <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs leading-relaxed text-zinc-700 sm:text-[13px]">
                  {tList(proj.highlights)
                    .slice(0, 2)
                    .map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mt-6">
          <h2 className="border-b border-zinc-200 pb-1.5 text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            {lang === "id" ? "Keahlian Teknis" : "Technical Skills"}
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-700 sm:grid-cols-[180px_1fr] sm:text-[13px]">
            <div className="font-bold text-zinc-900">
              {lang === "id" ? "Bahasa & Framework" : "Languages & Frameworks"}
            </div>
            <div>
              TypeScript, JavaScript, React, Next.js, PHP (Laravel, CodeIgniter),
              Flutter, HTML/CSS, Tailwind CSS, Vue 3, Three.js, Python, Odoo, MQL5
            </div>

            <div className="font-bold text-zinc-900">
              {lang === "id" ? "Database & Tools" : "Database & Tools"}
            </div>
            <div>PostgreSQL, MySQL, SQLite, Git, GitHub, Vercel, GA4 &amp; Meta Pixel</div>

            <div className="font-bold text-zinc-900">
              {lang === "id" ? "Kompetensi Inti" : "Core Competencies"}
            </div>
            <div>
              UI/UX Development, Full-Stack Web Development, REST API Integration,
              Database Design, AI-Assisted Workflow
            </div>
          </div>
        </section>

        {/* Education & Certification */}
        <section className="mt-6">
          <h2 className="border-b border-zinc-200 pb-1.5 text-xs font-extrabold tracking-widest text-blue-800 uppercase">
            {lang === "id" ? "Pendidikan & Sertifikasi" : "Education & Certification"}
          </h2>
          <div className="mt-3 space-y-3">
            {EDUCATION.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-zinc-950">
                    {t(edu.degree)} — {edu.institution}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500">
                    {edu.period}
                  </span>
                </div>
                {edu.note && (
                  <p className="mt-0.5 text-xs italic text-zinc-500">
                    *{t(edu.note)}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
