import JSZip from "jszip";
import { getTemplateSource } from "@/templates";
import type { ProjectDocument } from "@/lib/schema/types";

function applySourceEdits(html: string, edits: ProjectDocument["sourceEdits"]): string {
  if (!edits || typeof DOMParser === "undefined") return html;
  const parsed = new DOMParser().parseFromString(html, "text/html");
  for (const [selector, edit] of Object.entries(edits)) {
    const element = parsed.querySelector(selector);
    if (!element) continue;
    if (typeof edit.text === "string") element.textContent = edit.text;
    if (typeof edit.src === "string") element.setAttribute("src", edit.src);
    if (typeof edit.href === "string") element.setAttribute("href", edit.href);
  }
  return `<!doctype html>\n${parsed.documentElement.outerHTML}`;
}

export async function buildSourceProjectZip(document: ProjectDocument): Promise<Blob> {
  const templateId = document.sourceTemplateId;
  if (!templateId) throw new Error("Project ini bukan source template");
  const source = getTemplateSource(templateId);
  if (!source) throw new Error("Source template tidak ditemukan");

  const response = await fetch(`/api/template-source/${templateId}/source.zip`);
  if (!response.ok) throw new Error("ZIP source tidak dapat dimuat");
  const zip = await JSZip.loadAsync(await response.blob());
  const entry = zip.file(source.entry);
  if (!entry) throw new Error(`File ${source.entry} tidak ditemukan di ZIP source`);

  const html = await entry.async("string");
  zip.file(source.entry, applySourceEdits(html, document.sourceEdits));
  return zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
}
