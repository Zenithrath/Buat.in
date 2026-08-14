import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function aboutExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Tentang Kami";
  const description = propString(node, "description") || "";

  const html = `
<section class="bi-about">
  <h2>${title}</h2>
  <p>${description}</p>
</section>`;

  const css = `
.bi-about { padding: 4rem 1.5rem; text-align: left; max-width: 800px; margin: 0 auto; }
.bi-about h2 { font-size: 2rem; font-weight: 700; margin-bottom: 1rem; }
.bi-about p { font-size: 1rem; color: var(--muted-foreground); line-height: 1.6; }
`;

  return { html, css };
}
