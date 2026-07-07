import { readFile, readdir } from "fs/promises";
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
  const files = await readdir(blogDir);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map((file) => getBlogPostBySlug(file.replace(".md", "")))
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(blogDir, `${slug}.md`);
  const fileContent = await readFile(filePath, "utf-8");

  let data: Record<string, unknown> = {};
  let content = "";
  try {
    const parsed = matter(fileContent);
    data = parsed.data;
    content = parsed.content;
  } catch {
    // fall through with defaults
  }

  return {
    slug,
    title: typeof data.title === "string" ? data.title : "Untitled",
    description: typeof data.description === "string" ? data.description : "",
    date: typeof data.date === "string" ? data.date : new Date().toISOString(),
    author: typeof data.author === "string" ? data.author : "Harish Kumar",
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    content,
    image: typeof data.image === "string" ? data.image : undefined
  };
}
