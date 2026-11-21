"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  Globe,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECTS, UI_COPY } from "@/data/portfolio-data";
import type { ProjectItem } from "@/types/portfolio";
import { ProjectVisual } from "./ProjectVisual";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (project: ProjectItem) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onNavigate,
}: CaseStudyModalProps) {
  const { t, tList } = useLanguage();
  const [liveProjectId, setLiveProjectId] = useState<string | null>(null);
  const previewMode: "visual" | "live" =
    project && liveProjectId === project.id ? "live" : "visual";

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && currentIdx >= 0) {
        onNavigate(PROJECTS[(currentIdx + 1) % PROJECTS.length]);
      }
      if (e.key === "ArrowLeft" && currentIdx >= 0) {
        onNavigate(
          PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length]
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose, onNavigate]);

  const currentIdx = project
    ? PROJECTS.findIndex((p) => p.id === project.id)
    : -1;
  const prevProject =
    currentIdx >= 0
      ? PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length]
      : null;
  const nextProject =
    currentIdx >= 0 ? PROJECTS[(currentIdx + 1) % PROJECTS.length] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
          >
            {/* Modal Sticky Header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-7 dark:border-zinc-800/80 dark:bg-zinc-950/95">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  <span>{t(project.categoryLabel)}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {project.year}
                  </span>
                </div>
                <h3 className="mt-0.5 truncate text-base font-bold tracking-tight text-zinc-950 sm:text-lg dark:text-zinc-50">
                  {project.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 sm:inline-flex dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white"
                  >
                    <span>{t(UI_COPY.modal.openExternal)}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              {/* Preview Mode Toggle (when live embeddable) */}
              {project.embeddable && project.liveUrl && (
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100/80 p-1 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900">
                    <button
                      type="button"
                      onClick={() => setLiveProjectId(null)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                        previewMode === "visual"
                          ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>{t(UI_COPY.modal.visualMode)}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLiveProjectId(project.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-colors ${
                        previewMode === "live"
                          ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                      }`}
                    >
                      <Globe className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{t(UI_COPY.modal.liveMode)}</span>
                    </button>
                  </div>

                  {previewMode === "live" && (
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t(UI_COPY.modal.iframeHint)}
                    </span>
                  )}
                </div>
              )}

              {/* Visual or Live Embed Showcase */}
              {previewMode === "live" && project.embeddable && project.liveUrl ? (
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-inner dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-3.5 py-2 dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {project.liveUrl}
                    </span>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] font-semibold text-blue-600 hover:underline dark:text-blue-400"
                    >
                      ↗
                    </a>
                  </div>
                  <iframe
                    src={project.liveUrl}
                    title={`Live preview — ${project.title}`}
                    className="h-[460px] w-full bg-white"
                    loading="lazy"
                  />
                </div>
              ) : (
                <ProjectVisual project={project} />
              )}

              {/* Mobile Live Button */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white sm:hidden dark:bg-zinc-100 dark:text-zinc-950"
                >
                  <span>{t(UI_COPY.modal.openExternal)}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}

              {/* Metadata Strip */}
              <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:grid-cols-3 dark:border-zinc-800/80 dark:bg-zinc-900/50">
                <div>
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    {t(UI_COPY.modal.role)}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-zinc-900 sm:text-sm dark:text-zinc-100">
                    {t(project.role)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    {t(UI_COPY.modal.client)}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-zinc-900 sm:text-sm dark:text-zinc-100">
                    {project.client}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    {t(UI_COPY.modal.year)}
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-zinc-900 sm:text-sm dark:text-zinc-100">
                    {project.year}
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  {t(UI_COPY.modal.overview)}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                  {t(project.summary)}
                </p>
              </div>

              {/* Challenge & Solution Split */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
                  <h4 className="font-mono text-xs font-semibold tracking-wider text-rose-600 uppercase dark:text-rose-400">
                    {t(UI_COPY.modal.challenge)}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {t(project.challenge)}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40">
                  <h4 className="font-mono text-xs font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                    {t(UI_COPY.modal.solution)}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                    {t(project.solution)}
                  </p>
                </div>
              </div>

              {/* Engineering Highlights */}
              <div className="mt-6">
                <h4 className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  <Layers className="h-3.5 w-3.5 text-blue-500" />
                  <span>{t(UI_COPY.modal.highlights)}</span>
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {tList(project.highlights).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-700 sm:text-sm dark:text-zinc-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact & Tech Stack */}
              <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.05] p-4 dark:border-blue-400/20 dark:bg-blue-500/[0.08]">
                <div className="flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-blue-700 uppercase dark:text-blue-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t(UI_COPY.modal.impact)}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-700 sm:text-sm dark:text-zinc-200">
                  {t(project.impact)}
                </p>
              </div>

              <div className="mt-6">
                <div className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  {t(UI_COPY.modal.stack)}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer: Prev / Next */}
            <div className="flex items-center justify-between border-t border-zinc-200/80 bg-zinc-50/80 px-5 py-3.5 sm:px-7 dark:border-zinc-800/80 dark:bg-zinc-900/70">
              {prevProject ? (
                <button
                  type="button"
                  onClick={() => onNavigate(prevProject)}
                  className="inline-flex max-w-[46%] items-center gap-2 text-left text-xs font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0" />
                  <span className="truncate">{prevProject.title}</span>
                </button>
              ) : (
                <span />
              )}

              {nextProject ? (
                <button
                  type="button"
                  onClick={() => onNavigate(nextProject)}
                  className="inline-flex max-w-[46%] items-center gap-2 text-right text-xs font-semibold text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  <span className="truncate">{nextProject.title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              ) : (
                <span />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
