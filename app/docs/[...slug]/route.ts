import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BUILD_DIRS: Record<string, string> = {
  aegis: path.join(process.cwd(), "aegis.docs", "build"),
  stardust: path.join(process.cwd(), "stardust.docs", "build"),
};

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
  ".pdf": "application/pdf",
};

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const project = slug[0];
  const buildDir = BUILD_DIRS[project];

  if (!buildDir) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const restPath = slug.slice(1).join("/");
  const filePath = path.join(buildDir, restPath);

  if (!filePath.startsWith(buildDir)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  let finalPath = filePath;
  if (!fs.existsSync(finalPath)) {
    const indexPath = path.join(filePath, "index.html");
    if (fs.existsSync(indexPath)) {
      finalPath = indexPath;
    }
  }

  if (fs.statSync(finalPath).isDirectory()) {
    const indexPath = path.join(finalPath, "index.html");
    if (fs.existsSync(indexPath)) {
      finalPath = indexPath;
    }
  }

  if (!fs.existsSync(finalPath) || !fs.statSync(finalPath).isFile()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const content = fs.readFileSync(finalPath);
  const contentType = getContentType(finalPath);

  return new NextResponse(content, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
