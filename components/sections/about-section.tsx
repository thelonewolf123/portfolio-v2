interface AboutData {
  title: string;
  paragraphs: string[];
}

interface AboutSectionProps {
  data: AboutData;
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 justify-around"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{data.title}</h2>
        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
