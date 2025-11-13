import { ExternalLink, GithubIcon, Linkedin, MailIcon } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative md:fixed md:left-0 md:top-0 md:w-1/2 md:h-full flex items-center justify-center px-4 md:px-8 py-20 md:py-0 border-b md:border-b-0 md:border-r border-border">
      <div className="max-w-md w-full">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
            Harish Kumar
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Senior Frontend Developer
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Specialized in TypeScript, React, and AWS. I build high-performance,
            scalable interfaces that drive measurable results.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <div className="text-2xl font-bold text-accent">150%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Conversion Increase
            </div>
          </div>
          <div className="border border-border rounded-lg p-4 bg-card/50">
            <div className="text-2xl font-bold text-accent">55%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Cost Reduction
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="mailto:harishkumar.vellore@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Email"
          >
            <MailIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/harishkumark025"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/thelonewolf123"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>

        {/* CTA Button */}
        <a
          href="mailto:harishkumar.vellore@gmail.com"
          className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
