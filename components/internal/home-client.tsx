"use client";

import type { ReactNode } from "react";
import { Navigation } from "@/components/internal/navigation";
import { useScrollTracking } from "@/hooks/use-scroll-tracking";

interface HomeClientProps {
  children: ReactNode;
}

export function HomeClient({ children }: HomeClientProps) {
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
      {children}
    </div>
  );
}
