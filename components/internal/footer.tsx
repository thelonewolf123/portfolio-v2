import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-8 py-10 border-t border-border">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {year} Harish Kumar. Built with Next.js.</p>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/thelonewolf123"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-accent/10 hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="https://linkedin.com/in/harishkumark025"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-accent/10 hover:text-foreground transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            href="mailto:harishkumar.vellore@gmail.com"
            aria-label="Email"
            className="w-9 h-9 inline-flex items-center justify-center rounded-md hover:bg-accent/10 hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
