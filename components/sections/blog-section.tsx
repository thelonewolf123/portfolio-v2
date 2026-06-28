import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface FeaturedPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

interface BlogData {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  featuredPosts?: FeaturedPost[];
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h2>
        <p className="text-lg text-muted-foreground mb-10">
          {data.description}
        </p>

        {data.featuredPosts && data.featuredPosts.length > 0 && (
          <div className="space-y-6 mb-10">
            {data.featuredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group rounded-lg border border-border hover:border-accent/50 bg-accent/5 p-5 transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <h3 className="text-lg font-semibold group-hover:text-accent transition-colors mb-1">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        <a
          href={data.buttonUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {data.buttonText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
