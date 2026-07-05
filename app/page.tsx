"use client";

import { Navigation } from "@/components/internal/navigation";
import { Footer } from "@/components/internal/footer";
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
      <Navigation activeSection={activeSection} isScrolling={isScrolling} />

      <HeroSection />

      <div id="main" className="md:ml-[50%]">
        <AboutSection />
        <ExperienceSection data={portfolioData.experience} />
        <SkillsSection data={portfolioData.skills} />
        <FlagshipProjectsSection data={portfolioData.flagshipProjects} />
        <ProjectsSection data={portfolioData.projects} />
        <BlogSection data={portfolioData.blog} />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
