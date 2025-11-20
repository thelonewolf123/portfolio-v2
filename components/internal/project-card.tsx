import { ExternalLink, Github, Calendar } from "lucide-react";
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
    <SpotlightCard className="border border-border rounded-xl overflow-hidden bg-card/30 hover:bg-card/50 transition-all group h-full flex flex-col">
      {imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Project content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold group-hover:text-accent transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground ml-4 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        {stats && (
          <p className="text-xs text-accent mb-4 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {stats}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {(liveUrl || githubUrl) && (
          <div className="flex gap-3 mt-auto pt-4 border-t border-border/50">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors shadow-sm hover:shadow-md hover:shadow-accent/20"
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
                className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
