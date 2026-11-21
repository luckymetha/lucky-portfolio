"use client";

import React from "react";
import { Cpu, Database, Layout, Server, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SKILL_GROUPS, UI_COPY } from "@/data/portfolio-data";
import type { SkillGroup } from "@/types/portfolio";
import { Reveal } from "./Reveal";

function GroupIcon({ icon }: { icon: SkillGroup["icon"] }) {
  switch (icon) {
    case "layout":
      return <Layout className="h-5 w-5" />;
    case "server":
      return <Server className="h-5 w-5" />;
    case "database":
      return <Database className="h-5 w-5" />;
    case "sparkles":
      return <Sparkles className="h-5 w-5" />;
  }
}

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-y border-zinc-200/80 bg-zinc-100/55 py-20 sm:py-28 dark:border-zinc-800/80 dark:bg-zinc-950/60"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold tracking-widest text-blue-600 uppercase dark:text-blue-400">
            {t(UI_COPY.skills.eyebrow)}
          </div>
          <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {t(UI_COPY.skills.title)}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            {t(UI_COPY.skills.subtitle)}
          </p>
        </div>

        {/* 4 Capability Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {SKILL_GROUPS.map((group, idx) => (
            <Reveal key={group.id} delay={idx * 0.05} className="flex">
              <div className="w-full rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-xs transition-colors hover:border-zinc-300 dark:border-zinc-800/90 dark:bg-zinc-900/70 dark:hover:border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-blue-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-blue-400">
                    <GroupIcon icon={group.icon} />
                  </div>
                  <h3 className="text-base font-bold tracking-tight text-zinc-950 sm:text-lg dark:text-zinc-50">
                    {t(group.title)}
                  </h3>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                  {t(group.description)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-zinc-200/90 bg-zinc-50 px-2.5 py-1 font-mono text-xs font-medium text-zinc-800 transition-colors hover:border-blue-400/50 hover:bg-blue-50/50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-950/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* AI-Augmented Engineering Highlight Strip */}
        <Reveal delay={0.1} className="mt-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/[0.06] via-sky-500/[0.05] to-emerald-500/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between dark:border-blue-400/20 dark:from-blue-500/[0.1] dark:via-sky-500/[0.07] dark:to-emerald-500/[0.08]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {t(UI_COPY.skills.aiStripTitle)}
                </h3>
                <p className="mt-1 max-w-3xl text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
                  {t(UI_COPY.skills.aiStripDesc)}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
