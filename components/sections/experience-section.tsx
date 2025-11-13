import { ExperienceCard } from "@/components/internal/experience-card";

interface Experience {
  date: string;
  title: string;
  company: string;
  location: string;
  highlights: string[];
}

interface ExperienceData {
  title: string;
  experiences: Experience[];
}

interface ExperienceSectionProps {
  data: ExperienceData;
}

export function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border justify-around"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{data.title}</h2>
        <div className="space-y-8">
          {data.experiences.map((experience, index) => (
            <ExperienceCard
              key={index}
              date={experience.date}
              title={experience.title}
              company={experience.company}
              location={experience.location}
              highlights={experience.highlights}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
