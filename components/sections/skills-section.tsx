import { SkillBadge } from "@/components/internal/skill-badge";

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsData {
  title: string;
  categories: SkillCategory[];
}

interface SkillsSectionProps {
  data: SkillsData;
}

export function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section
      id="skills"
      className="min-h-screen flex justify-around items-center px-4 md:px-8 py-20 md:py-32 border-t border-border"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{data.title}</h2>
        <div className="space-y-8">
          {data.categories.map((category, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
