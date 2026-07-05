"use client";

import { Navigation } from "@/components/internal/navigation";
import {
  AboutSection,
  ExperienceSection,
  SkillsSection,
  FlagshipProjectsSection,
  ProjectsSection,
  BlogSection,
  HeroSection,
  ContactSection
} from "@/components/sections";
import { useScrollTracking } from "@/hooks/use-scroll-tracking";
import portfolioData from "@/data/portfolio.json";

export default function Home() {
  const sections = [
    "about",
    "experience",
    "skills",
    "flagship-projects",
    "projects",
    "blog",
    "contact"
  ];

  const { activeSection, isScrolling } = useScrollTracking({
    sections,
    scrollThreshold: 50,
    visibilityThreshold: 0.5
  });

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <Navigation activeSection={activeSection} isScrolling={isScrolling} />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Section */}
      <div className="md:ml-[50%]">
        {/* About */}
        <AboutSection />

        {/* Experience */}
        <ExperienceSection data={portfolioData.experience} />

        {/* Skills */}
        <SkillsSection data={portfolioData.skills} />

        {/* Flagship Projects */}
        <FlagshipProjectsSection data={portfolioData.flagshipProjects} />

        {/* Projects */}
        <ProjectsSection data={portfolioData.projects} />

        {/* Blog Section */}
        <BlogSection data={portfolioData.blog} />

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <footer className="px-4 md:px-8 py-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Harish Kumar. Built with Next.js and React.</p>
        </footer>
      </div>
    </div>
  );
}
