import { access, readdir, stat } from "fs/promises";
import path from "path";

interface DocBuild {
  baseUrl: string;
  buildDir: string;
  exclude: string[];
}

const DOC_BUILDS: DocBuild[] = [
  {
    baseUrl: "/docs/aegis",
    buildDir: path.join(process.cwd(), "aegis.docs", "build"),
    exclude: ["markdown-page", "index.html", "404.html", "sitemap.xml"]
  },
  {
    baseUrl: "/docs/stardust",
    buildDir: path.join(process.cwd(), "stardust.docs", "build"),
    exclude: ["blog", "index.html", "404.html", "sitemap.xml"]
  }
];

export interface DocPage {
  url: string;
  lastModified: Date;
  changeFrequency: "monthly";
  priority: number;
}

async function walkIndexHtml(
  root: string,
  currentRel: string,
  results: Array<{ relPath: string; mtime: Date }>
): Promise<void> {
  const abs = path.join(root, currentRel);
  try {
    await access(abs);
  } catch {
    return;
  }
  const entries = await readdir(abs, { withFileTypes: true });
  for (const entry of entries) {
    const childRel = currentRel
      ? path.join(currentRel, entry.name)
      : entry.name;
    const childAbs = path.join(abs, entry.name);
    if (entry.isDirectory()) {
      await walkIndexHtml(root, childRel, results);
    } else if (entry.isFile() && entry.name === "index.html") {
      const s = await stat(childAbs);
      results.push({ relPath: currentRel, mtime: s.mtime });
    }
  }
}

export async function getDocPages(): Promise<DocPage[]> {
  const pages: DocPage[] = [];
  for (const build of DOC_BUILDS) {
    try {
      await access(build.buildDir);
    } catch {
      continue;
    }

    for (const sub of ["docs", "blog"]) {
      const found: Array<{ relPath: string; mtime: Date }> = [];
      await walkIndexHtml(build.buildDir, sub, found);
      for (const { relPath, mtime } of found) {
        const topSegment = relPath.split(path.sep)[0];
        if (
          build.exclude.includes(relPath) ||
          build.exclude.includes(topSegment)
        ) {
          continue;
        }
        pages.push({
          url: `${build.baseUrl}/${relPath}/`,
          lastModified: mtime,
          changeFrequency: "monthly",
          priority: 0.5
        });
      }
    }
  }
  return pages;
}
