import { NextRequest, NextResponse } from "next/server";
import { access, readFile, readdir, stat } from "fs/promises";
import path from "path";

const DOCS_PROJECTS_DIR = path.join(process.cwd(), "docs-projects");

async function loadProjects(): Promise<Map<string, string>> {
  const projects = new Map<string, string>();
  try {
    const entries = await readdir(DOCS_PROJECTS_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
      const buildDir = path.join(DOCS_PROJECTS_DIR, entry.name, "build");
      try {
        await access(buildDir);
        projects.set(entry.name, buildDir);
      } catch {
        // No build dir yet — skip
      }
    }
  } catch {
    // docs-projects dir doesn't exist; empty project set
  }
  return projects;
}

const PROJECTS = await loadProjects();

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".map": "application/json",
  ".pdf": "application/pdf"
};

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const project = slug[0];
  const buildDir = PROJECTS.get(project);

  if (!buildDir) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const restPath = slug.slice(1).join("/");
  let filePath = path.join(buildDir, restPath);

  if (!filePath.startsWith(buildDir)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Fallback: if the direct path doesn't exist, try with `docs/` prefix.
  // Docusaurus's preset-classic defaults to routeBasePath "/docs", so
  // canonical URLs are /docs/<project>/docs/<page>/. This makes the shorter
  // /docs/<project>/<page>/ form also work.
  if (!(await pathExists(filePath))) {
    const docsPrefixed = path.join(buildDir, "docs", restPath);
    if (await pathExists(docsPrefixed)) {
      filePath = docsPrefixed;
    }
  }

  let finalPath = filePath;
  if (!(await pathExists(finalPath))) {
    const indexPath = path.join(filePath, "index.html");
    if (await pathExists(indexPath)) {
      finalPath = indexPath;
    }
  }

  const finalStat = await stat(finalPath).catch(() => null);
  if (!finalStat) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (finalStat.isDirectory()) {
    const indexPath = path.join(finalPath, "index.html");
    if (await pathExists(indexPath)) {
      finalPath = indexPath;
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } else if (!finalStat.isFile()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const content = await readFile(finalPath);
  const contentType = getContentType(finalPath);

  return new NextResponse(content, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, immutable"
    }
  });
}
