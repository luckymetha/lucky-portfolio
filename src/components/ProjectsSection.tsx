"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, UI_COPY } from "@/data/portfolio-data";
import type { ProjectCategory, ProjectItem } from "@/types/portfolio";
import { ProjectVisual } from "./ProjectVisual";

type FilterValue = "all" | ProjectCategory;

const FILTER_OPTIONS: FilterValue[] = [
  "all",
  "enterprise",
  "ecommerce",
  "public-service",
  "app",
];

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterValue>("all");

  const featuredProjects = useMemo(
    () => PROJECTS.filter((p) => p.section === "featured"),
    []
  );

  const visibleProjects = useMemo(() => {
    if (filter === "all") return featuredProjects;
    return featuredProjects.filter((p) => p.category === filter);
  }, [featuredProjects, filter]);

  const countFor = (cat: FilterValue) =>
    cat === "all"
      ? featuredProjects.length
      : featuredProjects.filter((p) => p.category === cat).length;

  return (
    <section
      id="work"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
              {t(UI_COPY.work.eyebrow)}
            </div>
            <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
              {t(UI_COPY.work.title)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
              {t(UI_COPY.work.subtitle)}
            </p>
          </div>
        </div>

        {/* Animated Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {FILTER_OPTIONS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                  active
                    ? "border-transparent text-white dark:text-zinc-950"
                    : "border-zinc-200/90 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-zinc-950 dark:bg-zinc-100"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{t(UI_COPY.work.filters[cat])}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      active
                        ? "text-zinc-300 dark:text-zinc-600"
                        : "text-zinc-400 dark:text-zinc-500"
                    }`}
                  >
                    {countFor(cat)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, idx) => {
              const isHeroFeature = filter === "all" && idx === 0;
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
                  onClick={() => onSelectProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  className={`group cursor-pointer rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:p-5 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:shadow-black/50 ${
                    isHeroFeature
                      ? "md:col-span-2 md:grid md:grid-cols-[1.18fr_0.82fr] md:items-center md:gap-7"
                      : "flex flex-col justify-between"
                  }`}
                >
                  {/* Preview Browser Frame */}
                  <ProjectVisual project={project} />

                  {/* Text Details */}
                  <div className={isHeroFeature ? "mt-5 md:mt-0" : "mt-5 flex flex-1 flex-col justify-between"}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 font-mono text-[11px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                            {t(project.categoryLabel)}
                          </span>
                          {project.featuredBadge && (
                            <span className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-blue-600 dark:text-blue-400">
                              <Sparkles className="h-3 w-3" />
                              {t(project.featuredBadge)}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-zinc-400">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold tracking-tight text-zinc-950 transition-colors group-hover:text-blue-600 sm:text-xl dark:text-zinc-50 dark:group-hover:text-blue-400">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {t(project.subtitle)}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, isHeroFeature ? 6 : 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {!isHeroFeature && project.techStack.length > 4 && (
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[11px] text-zinc-500 dark:bg-zinc-800/90 dark:text-zinc-400">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3.5 dark:border-zinc-800/80">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                        <span>{t(UI_COPY.work.viewCaseStudy)}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                        >
                          <span>{t(UI_COPY.work.liveDemo)}</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
