import {
  ExternalLink,
  Github,
  BookOpen,
  MessageSquare,
  GitBranch,
  Shield,
  Radio,
  Server,
  Search,
  Rocket,
  Cloud,
  Terminal,
  Monitor,
  RefreshCw,
  Save,
  Building2,
  Brain,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

import { SpotlightCard } from "@/components/ui/spotlight-card";

interface DocSection {
  label: string;
  href: string;
}

interface FlagshipProjectCardProps {
  title: string;
  tagline: string;
  date: string;
  description: string;
  features: string[];
  techStack: string[];
  stats: string;
  liveUrl?: string;
  githubUrl?: string;
  docsUrl: string;
  docSections: DocSection[];
  imageUrl: string;
}

const docIcons: Record<string, typeof Building2> = {
  Architecture: Building2,
  "Agent System": Brain,
  "Security Model": Shield,
  "Design Patterns": Layers,
  Deployment: Rocket,
  Infrastructure: Cloud,
  Microservices: Server,
  "CLI Tool": Terminal,
};

function getFeatureIcon(
  feature: string,
  index: number
): typeof MessageSquare {
  const iconMap = [
    MessageSquare,
    GitBranch,
    Shield,
    Radio,
    Server,
    Search,
    Rocket,
    Cloud,
    Terminal,
    Monitor,
    RefreshCw,
    Save,
  ];
  return iconMap[index % iconMap.length];
}

function getDocIcon(label: string): typeof Building2 {
  return docIcons[label] || Building2;
}

export function FlagshipProjectCard({
  title,
  tagline,
  description,
  features,
  techStack,
  stats,
  liveUrl,
  githubUrl,
  docsUrl,
  docSections,
  imageUrl,
}: FlagshipProjectCardProps) {
  return (
    <SpotlightCard className="border border-border rounded-xl overflow-hidden bg-card/30 hover:bg-card/50 transition-all group">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent font-medium">{stats}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
              {title}
            </h3>
            <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 shrink-0 ml-4">
              Flagship
            </span>
          </div>
          <p className="text-accent font-medium text-sm mb-4">{tagline}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Key Features
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, index) => {
              const Icon = getFeatureIcon(feature, index);
              return (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-accent/5 border border-accent/10"
                >
                  <Icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    {feature}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground text-xs font-medium border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Explore the Docs
          </h4>
          <div className="flex flex-wrap gap-2">
            {docSections.map((section) => {
              const Icon = getDocIcon(section.label);
              return (
                <a
                  key={section.label}
                  href={section.href}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {section.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
          {docsUrl && (
            <a
              href={docsUrl}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm hover:shadow-md hover:shadow-accent/20 min-w-[120px]"
            >
              <BookOpen className="w-4 h-4" />
              Docs
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 text-primary border border-primary/30 text-sm font-medium hover:bg-primary/20 transition-colors min-w-[120px]"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors min-w-[120px]"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
