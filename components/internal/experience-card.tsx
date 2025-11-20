interface ExperienceCardProps {
  date: string;
  title: string;
  company: string;
  location: string;
  highlights: string[];
}

import { Calendar, MapPin, Briefcase } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function ExperienceCard({
  date,
  title,
  company,
  location,
  highlights
}: ExperienceCardProps) {
  return (
    <SpotlightCard className="border border-border rounded-xl p-6 bg-card/30 hover:bg-card/50 transition-colors relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-accent font-medium">
            <Briefcase className="w-4 h-4" />
            <span>{company}</span>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <ul className="space-y-3">
        {highlights.map((highlight, index) => (
          <li key={index} className="text-sm text-muted-foreground flex gap-3 items-start">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
