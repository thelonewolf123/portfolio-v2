interface ExperienceCardProps {
  date: string;
  title: string;
  company: string;
  location: string;
  highlights: string[];
}

export function ExperienceCard({
  date,
  title,
  company,
  location,
  highlights
}: ExperienceCardProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card/30 hover:bg-card/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-accent text-sm font-medium">{company}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
          {date}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-4">{location}</p>
      <ul className="space-y-2">
        {highlights.map((highlight, index) => (
          <li key={index} className="text-sm text-muted-foreground flex gap-2">
            <span className="text-accent shrink-0">•</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
