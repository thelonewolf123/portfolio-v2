"use client";

import { useEffect, useState } from "react";

interface UseScrollTrackingOptions {
  sections: string[];
  scrollThreshold?: number;
  visibilityThreshold?: number;
}

interface UseScrollTrackingResult {
  activeSection: string;
  isScrolling: boolean;
}

export function useScrollTracking({
  sections,
  scrollThreshold = 50,
  visibilityThreshold = 0.5
}: UseScrollTrackingOptions): UseScrollTrackingResult {
  const [activeSection, setActiveSection] = useState(sections[0] || "");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolling(scrollPosition > scrollThreshold);

      // Get all section elements
      const sectionElements = sections.map((id) => document.getElementById(id));

      // Find the current section based on scroll position
      let currentSection = sections[0] || "";

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          // Consider a section active when it's at least visibilityThreshold% visible or when it's at the top
          if (rect.top <= window.innerHeight * visibilityThreshold) {
            currentSection = sections[i];
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, scrollThreshold, visibilityThreshold]);

  return { activeSection, isScrolling };
}
