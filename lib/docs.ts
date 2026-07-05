import { access, readdir, stat } from "fs/promises";
import path from "path";

const DOCS_PROJECTS_DIR = path.join(process.cwd(), "docs-projects");

const COMMON_EXCLUDE = new Set(["index.html", "404.html", "sitemap.xml"]);

export interface DocPage {
  url: string;
  lastModified: Date;
  changeFrequency: "monthly";
  priority: number;
}

async function discoverDocProjects(): Promise<
  Array<{ baseUrl: string; buildDir: string }>
> {
  const projects: Array<{ baseUrl: string; buildDir: string }> = [];
  try {
    const entries = await readdir(DOCS_PROJECTS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
      const buildDir = path.join(DOCS_PROJECTS_DIR, entry.name, "build");
      try {
        await access(buildDir);
        projects.push({ baseUrl: `/docs/${entry.name}`, buildDir });
      } catch {
        // No build dir yet — skip
      }
    }
  } catch {
    // docs-projects dir doesn't exist; empty list
  }
  return projects;
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
  const projects = await discoverDocProjects();
  const pages: DocPage[] = [];
  for (const project of projects) {
    for (const sub of ["docs", "blog"]) {
      const found: Array<{ relPath: string; mtime: Date }> = [];
      await walkIndexHtml(project.buildDir, sub, found);
      for (const { relPath, mtime } of found) {
        const topSegment = relPath.split(path.sep)[0];
        if (COMMON_EXCLUDE.has(relPath) || COMMON_EXCLUDE.has(topSegment)) {
          continue;
        }
        pages.push({
          url: `${project.baseUrl}/${relPath}/`,
          lastModified: mtime,
          changeFrequency: "monthly",
          priority: 0.5
        });
      }
    }
  }
  return pages;
}
