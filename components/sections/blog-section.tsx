interface BlogData {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

interface BlogSectionProps {
  data: BlogData;
}

export function BlogSection({ data }: BlogSectionProps) {
  return (
    <section
      id="blog"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t border-border justify-around"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{data.title}</h2>
        <p className="text-lg text-muted-foreground mb-12">
          {data.description}
        </p>
        <a
          href={data.buttonUrl}
          className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {data.buttonText}
        </a>
      </div>
    </section>
  );
}
