"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

interface MobileNavProps {
  activeSection: string;
}

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "flagship-projects", label: "Flagship" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" }
];

export function MobileNav({ activeSection }: MobileNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSectionClick = (id: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push(`/#${id}`);
      return;
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handlePageNav = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border hover:border-foreground/50 hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-6">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
                activeSection === section.id
                  ? "text-accent bg-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
              )}
            >
              {section.label}
            </button>
          ))}
          <div className="h-px bg-border my-2" />
          <button
            type="button"
            onClick={() => handlePageNav("/blog/")}
            className="text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
          >
            Articles
          </button>
          <button
            type="button"
            onClick={() => handlePageNav("/docs/")}
            className="text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-colors"
          >
            Docs
          </button>
        </nav>
        <div className="mt-6 pt-6 border-t border-border">
          <Link
            href="/Harish_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen(false)}
          >
            Download Resume (PDF)
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
