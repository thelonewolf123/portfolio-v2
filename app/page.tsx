"use client";

import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { SkillBadge } from "@/components/skill-badge";
import { Navigation } from "@/components/navigation";
import { useScrollTracking } from "@/hooks/use-scroll-tracking";
import { ExternalLink, GithubIcon, Linkedin, MailIcon } from "lucide-react";

export default function Home() {
  const sections = [
    "about",
    "experience",
    "skills",
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
      {/* Navigation */}
      <Navigation activeSection={activeSection} isScrolling={isScrolling} />

      {/* Hero Section */}
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
              Specialized in TypeScript, React, and AWS. I build
              high-performance, scalable interfaces that drive measurable
              results.
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

      {/* Content Section */}
      <div className="md:ml-[50%]">
        {/* About */}
        <section
          id="about"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
            <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a Senior Frontend Developer with expertise in building
                scalable, high-performance web applications. My passion lies in
                crafting elegant solutions to complex problems, with a focus on
                user experience and technical excellence.
              </p>
              <p>
                At Pickyourtrail, I led the redesign of our hotel booking flow,
                resulting in a 150% increase in conversions. This experience
                reinforced my belief that performance optimization and
                thoughtful UX design go hand-in-hand.
              </p>
              <p>
                Beyond frontend development, I have fullstack capabilities
                including Node.js, database design, and cloud infrastructure.
                I'm committed to staying current with emerging technologies and
                best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Experience</h2>
            <div className="space-y-8">
              <ExperienceCard
                date="09/2024 - Current"
                title="Frontend Developer - SDE II"
                company="Pickyourtrail"
                location="Chennai, India"
                highlights={[
                  "Directed development and delivery of major features including Static Reports and Ledger module",
                  "Revamped hotel search and booking flow on web and mobile, resulting in 150% increase in bookings",
                  "Shipped cross-platform capabilities for Preferred Hotels and Cirium integration"
                ]}
              />
              <ExperienceCard
                date="11/2023 - 11/2024"
                title="Fullstack Developer (Consultant)"
                company="BahiKhata Inc"
                location="Noida, India"
                highlights={[
                  "Enabled offline sync functionality for Bahikhata mobile app",
                  "Implemented multi-session sync to help MSMEs organize transactions across multiple devices",
                  "Developed SMS parsing to automatically fetch and record transactions"
                ]}
              />
              <ExperienceCard
                date="02/2023 - 11/2023"
                title="Fullstack Developer"
                company="Klenty soft. inc."
                location="Chennai, India"
                highlights={[
                  "Implemented Zipkin distributed tracing to enhance performance measurement",
                  "Created instant mail tracking feature, reducing latency from 15 minutes to five seconds",
                  "Designed slow query tracking pipeline for infrastructure optimization"
                ]}
              />
              <ExperienceCard
                date="08/2022 - 02/2023"
                title="Senior IDE Engineer"
                company="Codedamn"
                location="Bangalore, India"
                highlights={[
                  "Optimized container allocation pipeline, achieving 55% reduction in operational costs",
                  "Boosted productivity by implementing autocomplete and intellisense features",
                  "Collaborated with instructors to develop data structure and algorithm code execution stack"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "TypeScript",
                    "JavaScript",
                    "React",
                    "React Native",
                    "Next.js",
                    "GraphQL",
                    "Performance Optimization"
                  ].map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Backend & DevOps</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Node.js",
                    "PostgreSQL",
                    "MongoDB",
                    "Redis",
                    "AWS",
                    "CI/CD",
                    "GitHub Actions",
                    "Cloud Infrastructure"
                  ].map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Other</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "API Integration",
                    "Caching Solutions",
                    "API Design",
                    "System Architecture"
                  ].map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Projects</h2>
            <div className="space-y-8">
              <ProjectCard
                title="Job Genie"
                date="November 2025 – Present"
                description="AI-powered toolkit designed to help job seekers apply smarter, not harder. Includes tools for generating personalized cover letters, email builder, and resume optimization for senior roles."
                tags={["AI", "Job Search", "Automation"]}
                liveUrl="https://main.d1jgytnx6kv0u.amplifyapp.com"
                imageUrl="/job-genie.png"
              />
              <ProjectCard
                title="Artemis"
                date="October 2025 – Present"
                description="Personal productivity assistant built on n8n and Telegram. Integrates task management, note-taking, reminders, and Perplexity-powered research with voice interaction and calendar sync."
                tags={["Telegram Bot", "n8n", "Productivity"]}
                githubUrl="https://github.com/thelonewolf123/artemis-ai"
                liveUrl="https://artemis-ai-beta.vercel.app"
                imageUrl="/artemis.png"
              />
              <ProjectCard
                title="WatchWithMe.in"
                date="April 2024 – Present"
                description="Chrome extension and mobile app providing a theater-like movie-watching experience for long-distance couples. Features synchronized video playback with integrated voice and video chat."
                tags={["Chrome Extension", "React Native", "WebRTC"]}
                stats="3,000+ monthly active users • 12,500+ watch hours"
                liveUrl="https://www.watchwithme.in"
                imageUrl="/watchwithme.png"
              />
              <ProjectCard
                title="Stardust.app"
                date="April 2023 – Present"
                description="Proof-of-concept container deployment platform built on AWS Spot Instances. Added support for disaster management and one-command infrastructure provisioning with Pulumi."
                tags={["AWS", "Containers", "Infrastructure"]}
                githubUrl="https://github.com/thelonewolf123/stardust.app"
                imageUrl="/architecture.png"
              />
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          id="blog"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Blog</h2>
            <p className="text-lg text-muted-foreground mb-12">
              I share my insights on frontend development, performance
              optimization, and building scalable applications.
            </p>
            <a
              href="/blog"
              className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Read All Articles
            </a>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
        >
          <div className="max-w-2xl w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              I'm always interested in hearing about interesting projects and
              opportunities. Feel free to reach out!
            </p>
            <div className="space-y-6">
              <a
                href="mailto:harishkumar.vellore@gmail.com"
                className="flex items-center gap-3 text-lg hover:text-accent transition-colors group"
              >
                <MailIcon className="w-6 h-6" />
                <span>harishkumar.vellore@gmail.com</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com/in/harishkumark025"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-accent transition-colors group"
              >
                <Linkedin className="w-6 h-6" />
                <span>linkedin.com/in/harishkumark025</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/thelonewolf123"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg hover:text-accent transition-colors group"
              >
                <GithubIcon className="w-6 h-6" />
                <span>github.com/thelonewolf123</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-4 md:px-8 py-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Harish Kumar. Built with Next.js and React.</p>
        </footer>
      </div>
    </div>
  );
}
