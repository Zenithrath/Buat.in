import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getTemplateSource } from "@/templates";

const MIME_TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  woff: "font/woff",
  woff2: "font/woff2",
  zip: "application/zip",
};

function contentType(filePath: string) {
  const extension = path.extname(filePath).slice(1).toLowerCase();
  return MIME_TYPES[extension] ?? "application/octet-stream";
}

export async function GET(
  request: Request,
  context: { params: Promise<{ templateId: string; path: string[] }> }
) {
  const { templateId, path: pathParts = [] } = await context.params;
  const source = getTemplateSource(templateId);
  if (!source) return new NextResponse("Template source tidak ditemukan", { status: 404 });

  const sourceRoot = path.resolve(
    process.cwd(),
    "src",
    "templates",
    "imported-assets",
    source.folder
  );
  const requestedPath = pathParts.join("/") || source.entry;
  const filePath = requestedPath === "source.zip"
    ? path.resolve(process.cwd(), "src", source.archive)
    : path.resolve(sourceRoot, requestedPath);
  if (requestedPath !== "source.zip" && filePath !== sourceRoot && !filePath.startsWith(`${sourceRoot}${path.sep}`)) {
    return new NextResponse("Path tidak valid", { status: 400 });
  }

  try {
    const file = await readFile(filePath);
    const headers = new Headers({ "Content-Type": contentType(filePath), "Cache-Control": "no-store" });
    if (filePath.endsWith(".zip")) headers.set("Content-Disposition", `attachment; filename="${source.archive}"`);
    return new NextResponse(file, { headers });
  } catch {
    return new NextResponse("File template tidak ditemukan", { status: 404 });
  }
}
