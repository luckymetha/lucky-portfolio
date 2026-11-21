"use client";

import React, { useState } from "react";
import type { ProjectItem } from "@/types/portfolio";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ProjectsSection } from "./ProjectsSection";
import { LabsSection } from "./LabsSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { ContactSection } from "./ContactSection";
import { CaseStudyModal } from "./CaseStudyModal";

export function PortfolioClient() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection onSelectProject={setSelectedProject} />
        <LabsSection onSelectProject={setSelectedProject} />
        <ExperienceSection />
        <SkillsSection />
      </main>
      <ContactSection />
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={(next) => setSelectedProject(next)}
      />
    </div>
  );
}
