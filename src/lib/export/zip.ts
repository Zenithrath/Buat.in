import JSZip from "jszip";
import type { ProjectDocument } from "@/lib/schema/types";
import { buildExportFiles } from "./html";

export async function buildProjectZip(doc: ProjectDocument): Promise<Blob> {
  const zip = new JSZip();
  const projectFolder = zip.folder(doc.name || "project")!;

  const files = buildExportFiles(doc);
  for (const file of files) {
    const parts = file.path.split("/");
    let folder = projectFolder;
    for (const part of parts.slice(0, -1)) {
      folder = folder.folder(part)!;
    }
    folder.file(parts[parts.length - 1], file.content);
  }

  return zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}

export function downloadZip(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}