"use client";

import React, { useMemo } from "react";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, UI_COPY } from "@/data/portfolio-data";
import type { ProjectItem } from "@/types/portfolio";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";

interface LabsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function LabsSection({ onSelectProject }: LabsSectionProps) {
  const { t } = useLanguage();

  const labProjects = useMemo(
    () => PROJECTS.filter((p) => p.section === "labs"),
    []
  );

  return (
    <section
      id="labs"
      className="scroll-mt-24 border-y border-zinc-200/80 bg-zinc-100/55 py-20 sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950/60"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-amber-600 uppercase dark:text-amber-400">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>{t(UI_COPY.labs.eyebrow)}</span>
          </div>
          <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {t(UI_COPY.labs.title)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            {t(UI_COPY.labs.subtitle)}
          </p>
        </div>

        {/* 5 Lab Projects Grid (Top 2 wide + Bottom 3 crisp) */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-6">
          {labProjects.map((project, idx) => {
            const spanClass = idx < 2 ? "md:col-span-3" : "md:col-span-2";
            const labNumber = String(idx + 1).padStart(2, "0");

            return (
              <Reveal key={project.id} delay={idx * 0.05} className={`flex ${spanClass}`}>
                <article
                  onClick={() => onSelectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  className="group flex w-full cursor-pointer flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-800/90 dark:bg-zinc-900/75 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:shadow-black/50"
                >
                  <div>
                    <ProjectVisual project={project} compact />

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                        LAB {labNumber} · {t(project.categoryLabel)}
                      </span>
                      <span className="font-mono text-[11px] text-zinc-400">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-blue-600 sm:text-lg dark:text-zinc-50 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                      {t(project.subtitle)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10.5px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-blue-400">
                        <span>{t(UI_COPY.labs.inspectLab)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        {project.client}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
