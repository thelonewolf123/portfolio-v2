import fs from "fs";
import path from "path";

import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  image?: string;
}

const blogDir = path.join(process.cwd(), "content", "blogs");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      return getBlogPostBySlug(slug);
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const filePath = path.join(blogDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? "Untitled",
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    author: data.author ?? "Harish Kumar",
    tags: data.tags ?? [],
    content,
    image: data.image
  };
}
