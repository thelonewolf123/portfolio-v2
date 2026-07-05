import Link from "next/link";
import { ArrowLeft, BookOpen, FileText, Home } from "lucide-react";

import { Navigation } from "@/components/internal/navigation";

export const metadata = {
  title: "Page Not Found - Harish Kumar",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation activeSection="" isScrolling={false} />

      <main id="main" className="pt-24 pb-16">
        <div className="px-4 md:px-8 max-w-2xl mx-auto text-center">
          <p className="text-7xl md:text-8xl font-bold text-accent mb-4">404</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Page not found
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            The link you followed may be broken, or the page may have been
            moved. Here are a few places that might help.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/blog/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Blog
            </Link>
            <Link
              href="/docs/aegis/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Aegis docs
            </Link>
            <Link
              href="/docs/stardust/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Stardust docs
            </Link>
          </div>

          <p className="text-xs text-muted-foreground mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to homepage
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
