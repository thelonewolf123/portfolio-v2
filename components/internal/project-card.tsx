import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

import { SpotlightCard } from "@/components/ui/spotlight-card";

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  tags: string[];
  stats?: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

export function ProjectCard({
  title,
  date,
  description,
  tags,
  stats,
  liveUrl,
  githubUrl,
  imageUrl
}: ProjectCardProps) {
  return (
    <SpotlightCard className="border border-border rounded-lg overflow-hidden bg-card/30 hover:bg-card/50 transition-colors group">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Project content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
            {title}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
            {date}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        {stats && (
          <p className="text-xs text-accent mb-4 font-medium">{stats}</p>
        )}

        {(liveUrl || githubUrl) && (
          <div className="flex gap-3 mb-4">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Live Demo
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded bg-accent/10 text-accent text-xs font-medium hover:bg-accent/20 transition-colors"
              >
                <Github className="w-3 h-3" />
                GitHub
              </a>
            )}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
