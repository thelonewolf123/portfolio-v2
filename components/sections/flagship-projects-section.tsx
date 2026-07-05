import { FlagshipProjectCard } from "@/components/internal/flagship-project-card";

interface DocSection {
  label: string;
  href: string;
}

interface FlagshipProject {
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

interface FlagshipProjectsData {
  title: string;
  subtitle: string;
  projects: FlagshipProject[];
}

interface FlagshipProjectsSectionProps {
  data: FlagshipProjectsData;
}

export function FlagshipProjectsSection({ data }: FlagshipProjectsSectionProps) {
  return (
    <section
      id="flagship-projects"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{data.title}</h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            {data.subtitle}
          </p>
        </div>
        <div className="space-y-10">
          {data.projects.map((project) => (
            <FlagshipProjectCard
              key={project.title}
              title={project.title}
              tagline={project.tagline}
              date={project.date}
              description={project.description}
              features={project.features}
              techStack={project.techStack}
              stats={project.stats}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              docsUrl={project.docsUrl}
              docSections={project.docSections}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
