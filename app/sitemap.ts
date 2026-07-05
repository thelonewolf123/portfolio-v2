import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import { getDocPages } from "@/lib/docs";

const SITE_URL = "https://harishkumar.info";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, docPages] = await Promise.all([
    getAllBlogPosts(),
    getDocPages()
  ]);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/docs/`,
      changeFrequency: "monthly",
      priority: 0.7
    },
    ...docPages.map((page) => ({
      ...page,
      url: `${SITE_URL}${page.url}`
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }))
  ];
}
