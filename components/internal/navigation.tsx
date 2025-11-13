"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" }
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
              onClick={() => {
                if (pathname !== "/") {
                  // If not on home page, navigate to home page with anchor
                  router.push(`/#${section.id}`);
                } else if (section.id === "blog") {
                  // Special handling for blog - it can either scroll to section or go to page
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  const element = document.getElementById(section.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
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
            href="/blog"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
          >
            All Articles
          </Link>
        </div>
        <div className="md:hidden">
          <select
            className="bg-transparent border border-border rounded px-3 py-1 text-sm"
            value={activeSection}
            onChange={(e) => {
              if (e.target.value && e.target.value !== "blog-page") {
                if (pathname !== "/") {
                  // If not on home page, navigate to home page with anchor
                  router.push(`/#${e.target.value}`);
                } else {
                  const element = document.getElementById(e.target.value);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              } else if (e.target.value === "blog-page") {
                router.push("/blog");
              }
            }}
          >
            <option value="">Menu</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
            <option value="blog-page">All Articles</option>
          </select>
        </div>
      </div>
    </nav>
  );
}
