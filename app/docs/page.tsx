import Link from "next/link";
import { Navigation } from "@/components/internal/navigation";
import { Footer } from "@/components/internal/footer";
import { BookOpen, ArrowRight, FileText, Layers } from "lucide-react";

export const metadata = {
  title: "Documentation - Harish Kumar",
  description:
    "Technical documentation for Aegis and Stardust — architecture, design patterns, and system details.",
  alternates: { canonical: "/docs/" }
};

const docProjects = [
  {
    title: "Aegis",
    tagline: "AI-powered production debugging system",
    description:
      "Complete technical documentation for the Aegis Agent — a dual-mode AI data analysis system. Covers architecture, agent system, tools, sandbox, security, API, frontend, deployment, and 12 design patterns.",
    href: "/docs/aegis/",
    docCount: "13 documents",
    features: ["System Architecture", "Agent System", "Security Model", "API Reference"],
    icon: FileText,
  },
  {
    title: "Stardust",
    tagline: "Container provisioning engine",
    description:
      "Technical architecture documentation for Stardust — a container deployment platform from GitHub commit to running container on AWS. Covers frontend, backend, infrastructure, messaging, and microservices.",
    href: "/docs/stardust/",
    docCount: "27 documents across 9 categories",
    features: ["Architecture Overview", "Infrastructure as Code", "Microservices", "Real-time Systems"],
    icon: Layers,
  },
];

export default function DocsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation activeSection="" isScrolling={true} />

      <main id="main" className="pt-24 pb-16">
        <div className="px-4 md:px-8 max-w-5xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              In-depth technical documentation for my open-source projects — architecture
              decisions, design patterns, deployment guides, and system internals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {docProjects.map((project) => {
              const Icon = project.icon;
              return (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card/30 hover:bg-card/50 hover:border-accent/50 transition-all duration-200 flex flex-col"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-accent/5 border border-border">
                        {project.docCount}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-accent mb-4">{project.tagline}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all mt-auto pt-4 border-t border-border/50">
                      <BookOpen className="w-4 h-4" />
                      Browse Documentation
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
