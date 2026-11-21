"use client";

import React from "react";
import { Lock, Globe } from "lucide-react";
import type { ProjectItem } from "@/types/portfolio";
import { ProjectMockup } from "./ProjectMockups";

interface ProjectVisualProps {
  project: ProjectItem;
  className?: string;
  compact?: boolean;
}

export function ProjectVisual({
  project,
  className = "",
  compact = false,
}: ProjectVisualProps) {
  return (
    <div
      className={`group/frame relative overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-100 shadow-sm transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {/* Minimal Browser / Window Chrome */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/95 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-300 transition-colors group-hover/frame:bg-rose-400 dark:bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-300 transition-colors group-hover/frame:bg-amber-400 dark:bg-zinc-700" />
          <span className="h-2 w-2 rounded-full bg-zinc-300 transition-colors group-hover/frame:bg-emerald-400 dark:bg-zinc-700" />
        </div>
        <div className="flex max-w-[68%] items-center gap-1.5 rounded-md border border-zinc-200/80 bg-white px-2.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {project.liveUrl ? (
            <Globe className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
          ) : (
            <Lock className="h-2.5 w-2.5 shrink-0 text-zinc-400" />
          )}
          <span className="truncate">{project.displayUrl}</span>
        </div>
        <div className="w-8 text-right font-mono text-[9px] text-zinc-400">
          {project.year.slice(-4)}
        </div>
      </div>

      {/* Content Area (16:10 aspect ratio) */}
      <div
        className={`relative w-full overflow-hidden bg-zinc-950 ${
          compact ? "aspect-[16/10]" : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/frame:scale-[1.03]"
          />
        ) : project.mockupType ? (
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover/frame:scale-[1.015]">
            <ProjectMockup type={project.mockupType} />
          </div>
        ) : null}

        {/* Subtle sheen overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100" />
      </div>
    </div>
  );
}
