import { GithubIcon, Linkedin, MailIcon } from "lucide-react";
import Image from "next/image";

import { GetInTouchCTA } from "@/components/internal/get-in-touch-cta";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden md:fixed md:left-0 md:top-0 md:w-1/2 md:h-full flex items-center justify-center px-4 md:px-8 py-20 md:py-0 border-b md:border-b-0 md:border-r border-border">
      {/* Ambient gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -left-20 w-72 h-72 bg-linear-to-br from-blue-600/40 via-purple-600/25 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -right-10 w-80 h-80 bg-linear-to-tl from-purple-500/20 via-blue-500/10 to-transparent blur-3xl" />
      </div>

      <div className="flex justify-between">
        <div className="relative max-w-md w-full flex flex-col items-center md:items-start gap-8 text-center md:text-left">
          {/* Name and Title */}
          <div className="space-y-4 w-full">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Harish Kumar
              </h1>
              <div className="h-1 w-24 bg-linear-to-r from-blue-500 via-purple-500 to-transparent mx-auto md:mx-0 rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl font-semibold text-foreground/90">
              Senior Frontend Developer
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              Specialized in TypeScript, React, and AWS. I build
              high-performance, scalable interfaces that drive measurable
              results.
            </p>
          </div>

          {/* Contact Links */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <a
              href="mailto:harishkumar.vellore@gmail.com"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:border-foreground/50 hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-all duration-300"
              title="Email"
            >
              <MailIcon className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/harishkumark025"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:border-foreground/50 hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/thelonewolf123"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-border hover:border-foreground/50 hover:bg-accent/10 text-muted-foreground hover:text-foreground transition-all duration-300"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>

          {/* CTA Button */}
          <GetInTouchCTA />
        </div>

        {/* Profile Photo with Gradient Ring */}
        <div className="relative w-44 aspect-square self-center md:self-start shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-linear-to-br from-blue-500/60 via-purple-500/30 to-transparent blur-2xl"
            aria-hidden
          />
          <div className="relative w-full h-full rounded-full p-[3px] bg-linear-to-br from-blue-500/50 via-purple-500/30 to-blue-900/10 shadow-[0_15px_45px_rgba(0,0,0,0.35)]">
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10">
              <Image
                src="/profile.jpeg"
                alt="Harish Kumar"
                fill
                sizes="(min-width: 768px) 176px, 50vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
