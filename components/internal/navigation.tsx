"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { MobileNav } from "@/components/internal/mobile-nav";

interface NavigationProps {
  activeSection: string;
  isScrolling: boolean;
}

export function Navigation({ activeSection, isScrolling }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "flagship-projects", label: "Flagship" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" }
  ];

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolling
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link
          href="/"
          className="text-xl font-bold hover:text-grey-100 transition-colors p-1 bg-accent hover:bg-accent/90 rounded-md active:bg-accent/50"
        >
          Hk
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.label}
            </button>
          ))}
          <Link
            href="/blog/"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            Articles
          </Link>
          <Link
            href="/docs/"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            Docs
          </Link>
        </div>
        <MobileNav activeSection={activeSection} />
      </div>
    </nav>
  );
}
