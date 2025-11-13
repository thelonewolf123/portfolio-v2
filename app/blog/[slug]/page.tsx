import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { Navigation } from "@/components/internal/navigation";
import { Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactMarkdown } from "@/components/internal/markdown-renderer";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  try {
    const post = getBlogPostBySlug(slug);
    return {
      title: `${post.title} - Harish Kumar`,
      description: post.description
    };
  } catch {
    return {
      title: "Post Not Found"
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;

  try {
    post = await getBlogPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation activeSection="blog" isScrolling={true} />

      <main className="pt-24 pb-16">
        <article className="px-4 md:px-8 max-w-2xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <Link
              href="/blog"
              className="text-accent hover:underline text-sm mb-6 inline-block"
            >
              ← Back to Blog
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 rounded-lg overflow-hidden bg-muted aspect-video">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown content={post.content} />
          </div>
        </article>
      </main>
    </div>
  );
}
