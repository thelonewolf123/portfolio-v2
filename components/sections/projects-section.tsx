import { ProjectCard } from "@/components/internal/project-card";

interface Project {
  title: string;
  date: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  stats?: string;
}

interface ProjectsData {
  title: string;
  projects: Project[];
}

interface ProjectsSectionProps {
  data: ProjectsData;
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t justify-around border-border"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{data.title}</h2>
        <div className="space-y-8">
          {data.projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              date={project.date}
              description={project.description}
              tags={project.tags}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              imageUrl={project.imageUrl}
              stats={project.stats}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
