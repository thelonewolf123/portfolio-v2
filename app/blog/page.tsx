import { getAllBlogPosts } from "@/lib/blog";
import { BlogCard } from "@/components/internal/blog-card";
import { Navigation } from "@/components/internal/navigation";

export const metadata = {
  title: "Blog - Harish Kumar",
  description: "Articles about web development, TypeScript, React, and more."
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navigation activeSection="blog" isScrolling={true} />

      <main className="pt-24 pb-12">
        <div className="px-4 md:px-8 max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Thoughts and insights on web development, architecture, and
              building scalable applications.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts yet.</p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new articles!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
