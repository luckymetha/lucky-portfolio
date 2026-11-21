"use client";

import React from "react";
import { Award, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { EDUCATION, EXPERIENCES, UI_COPY } from "@/data/portfolio-data";
import { Reveal } from "./Reveal";

export function ExperienceSection() {
  const { t, tList } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
            {t(UI_COPY.experience.eyebrow)}
          </div>
          <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {t(UI_COPY.experience.title)}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          {/* Left: Work Experience */}
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              <Briefcase className="h-4 w-4 text-blue-500" />
              <span>{t(UI_COPY.experience.workHeading)}</span>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <Reveal key={exp.id}>
                  <div className="relative rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs sm:p-7 dark:border-zinc-800/90 dark:bg-zinc-900/60">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-zinc-950 sm:text-xl dark:text-zinc-50">
                          {t(exp.role)}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            {exp.company}
                          </span>
                          <span className="text-zinc-300 dark:text-zinc-700">•</span>
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {t(exp.division)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end">
                        <span className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {t(exp.period)}
                        </span>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {t(exp.summary)}
                    </p>

                    <ul className="mt-5 space-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800/80">
                      {tList(exp.bullets).map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {exp.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Education & Certification */}
          <div>
            <div className="mb-5 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              <GraduationCap className="h-4 w-4 text-blue-500" />
              <span>{t(UI_COPY.experience.eduHeading)}</span>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <Reveal key={edu.id} delay={idx * 0.06}>
                  <div className="rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-xs dark:border-zinc-800/90 dark:bg-zinc-900/60">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-400">
                        {edu.type === "degree" ? (
                          <GraduationCap className="h-4 w-4" />
                        ) : (
                          <Award className="h-4 w-4" />
                        )}
                      </div>
                      <span className="rounded-lg bg-zinc-100 px-2.5 py-1 font-mono text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                      {t(edu.degree)}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-blue-600 sm:text-sm dark:text-blue-400">
                      {edu.institution}
                    </p>
                    {edu.note && (
                      <p className="mt-3 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
                        {t(edu.note)}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
