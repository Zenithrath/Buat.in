import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function ctaExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Siap Membangun Website?";
  const description = propString(node, "description") || "";
  const buttonText = propString(node, "buttonText") || "Mulai";

  const html = `
<section class="bi-cta">
  <div class="bi-cta-box">
    <h2>${title}</h2>
    <p>${description}</p>
    <a href="#" class="bi-cta-btn">${buttonText}</a>
  </div>
</section>`;

  const css = `
.bi-cta { padding: 4rem 1.5rem; text-align: center; }
.bi-cta-box { background: var(--primary); color: var(--primary-foreground); padding: 3rem 2rem; border-radius: var(--radius); max-width: 900px; margin: 0 auto; }
.bi-cta-box h2 { font-size: 2rem; font-weight: 800; margin: 0 0 1rem 0; }
.bi-cta-box p { font-size: 1rem; opacity: 0.9; margin-bottom: 2rem; }
.bi-cta-btn { background: var(--background); color: var(--foreground); padding: 0.75rem 1.5rem; border-radius: var(--radius); font-weight: 700; text-decoration: none; display: inline-block; }
`;

  return { html, css };
}
