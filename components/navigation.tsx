"use client";

import Link from "next/link";

interface NavigationProps {
  activeSection: string;
  isScrolling: boolean;
}

export function Navigation({ activeSection, isScrolling }: NavigationProps) {
  const sections = [
    { id: "/#about", label: "About" },
    { id: "/#experience", label: "Experience" },
    { id: "/#skills", label: "Skills" },
    { id: "/#projects", label: "Projects" },
    { id: "/#contact", label: "Contact" }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolling
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="text-xl font-bold">HK</div>
        <div className="hidden md:flex items-center gap-8">
          {sections.map((section) => (
            <Link href={section.id} key={section.id}>
              <button
                className={`text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.label}
              </button>
            </Link>
          ))}
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors text-muted-foreground hover:text-foreground`}
          >
            Blog
          </Link>
        </div>
        <div className="md:hidden">
          <select className="bg-transparent border border-border rounded px-3 py-1 text-sm">
            <option value="">Menu</option>
            {sections.map((section) => (
              <Link href={section.id} key={section.id}>
                <option value={section.id}>{section.label}</option>
              </Link>
            ))}
            <Link href={"/blog"}>
              <option value="blog">Blog</option>
            </Link>
          </select>
        </div>
      </div>
    </nav>
  );
}
