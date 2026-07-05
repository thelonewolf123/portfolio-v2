"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Navigation } from "@/components/internal/navigation";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation activeSection="" isScrolling={false} />

      <main id="main" className="pt-24 pb-16">
        <div className="px-4 md:px-8 max-w-2xl mx-auto text-center">
          <AlertTriangle className="w-12 h-12 text-accent mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            An unexpected error occurred. You can try again, or head back home.
          </p>

          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono mb-6">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
