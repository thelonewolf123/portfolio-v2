import { getAllBlogPosts } from "@/lib/blog";
import { getDocPages } from "@/lib/docs";

const SITE_URL = "https://harishkumar.info";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function lastmod(d: Date): string {
  return d.toISOString();
}

interface Entry {
  loc: string;
  lastmod: Date;
  changefreq: string;
  priority: number;
}

export async function GET() {
  const entries: Entry[] = [];

  entries.push({
    loc: SITE_URL + "/",
    lastmod: new Date(),
    changefreq: "monthly",
    priority: 1
  });
  entries.push({
    loc: SITE_URL + "/blog/",
    lastmod: new Date(),
    changefreq: "weekly",
    priority: 0.8
  });
  entries.push({
    loc: SITE_URL + "/docs/",
    lastmod: new Date(),
    changefreq: "monthly",
    priority: 0.7
  });

  let blogErr = false;
  try {
    const posts = await getAllBlogPosts();
    for (const post of posts) {
      entries.push({
        loc: SITE_URL + "/blog/" + post.slug + "/",
        lastmod: new Date(post.date),
        changefreq: "monthly",
        priority: 0.6
      });
    }
  } catch (e) {
    console.error("Sitemap: getAllBlogPosts failed", e);
    blogErr = true;
  }

  let docsErr = false;
  try {
    const docPages = await getDocPages();
    for (const page of docPages) {
      entries.push({
        loc: SITE_URL + page.url,
        lastmod: page.lastModified,
        changefreq: page.changeFrequency,
        priority: page.priority
      });
    }
  } catch (e) {
    console.error("Sitemap: getDocPages failed", e);
    docsErr = true;
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(
      (e) =>
        "  <url>\n" +
        "    <loc>" +
        esc(e.loc) +
        "</loc>\n" +
        "    <lastmod>" +
        lastmod(e.lastmod) +
        "</lastmod>\n" +
        "    <changefreq>" +
        e.changefreq +
        "</changefreq>\n" +
        "    <priority>" +
        e.priority.toFixed(1) +
        "</priority>\n" +
        "  </url>"
    ),
    "</urlset>"
  ].join("\n");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "noindex"
    }
  });
}
