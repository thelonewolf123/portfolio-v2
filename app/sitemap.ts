import { getAllBlogPosts } from "@/lib/blog";
import { getDocPages } from "@/lib/docs";
import type { MetadataRoute } from "next";

const SITE_URL = "https://harishkumar.info";

function withSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: withSlash(`${SITE_URL}/blog`), changeFrequency: "weekly", priority: 0.8 },
    { url: withSlash(`${SITE_URL}/docs`), changeFrequency: "monthly", priority: 0.7 },
  ];

  try {
    for (const post of await getAllBlogPosts()) {
      entries.push({
        url: withSlash(`${SITE_URL}/blog/${post.slug}`),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (e) {
    console.error("Sitemap: getAllBlogPosts failed", e);
  }

  try {
    for (const page of await getDocPages()) {
      entries.push({
        url: `${SITE_URL}${page.url}`,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  } catch (e) {
    console.error("Sitemap: getDocPages failed", e);
  }

  return entries;
}
