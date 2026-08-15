import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function parseLogos(node: Node): { id: string; name: string; url: string }[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "logosJson"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `logo-${index + 1}`),
        name: String(item.name ?? "").trim(),
        url: String(item.url ?? "").trim(),
      }))
      .filter((item) => item.name.length > 0);
  } catch {
    return [];
  }
}

export function logoClientsExport(node: Node): ExportResult {
  const eyebrow = propString(node, "eyebrow").trim() || "Dipercaya oleh";
  const logos = parseLogos(node);

  const logosHtml = logos
    .map((logo) => {
      const label = escapeHtml(logo.name);
      const classes = "bi-logo-client";
      if (logo.url && logo.url !== "#") {
        return `<a class="${classes}" href="${escapeHtml(logo.url)}">${label}</a>`;
      }
      return `<span class="${classes}">${label}</span>`;
    })
    .join("\n    ");

  return {
    html: `<section class="bi-logo-clients">
  <p>${escapeHtml(eyebrow)}</p>
  <div class="bi-logo-clients-row">
    ${logosHtml}
  </div>
</section>`,
    css: `.bi-logo-clients{padding:2.5rem max(1.25rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:color-mix(in srgb,var(--bi-muted) 30%,transparent);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-logo-clients>p{margin:0;text-align:center;color:var(--bi-muted-fg);font-size:.625rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.bi-logo-clients-row{display:grid;max-width:64rem;grid-template-columns:repeat(2,1fr);align-items:center;gap:1.25rem 1.5rem;margin:1.5rem auto 0}.bi-logo-client{display:flex;align-items:center;justify-content:center;padding:.5rem .75rem;border-radius:0.5rem;color:var(--bi-muted-fg);font:800 .875rem/1.2 var(--bi-font-heading);letter-spacing:-.02em;text-align:center;text-decoration:none;opacity:.72;filter:grayscale(1);transition:opacity .2s ease,filter .2s ease,color .2s ease}.bi-logo-client:hover{color:var(--bi-fg);opacity:1;filter:grayscale(0)}@media (min-width:640px){.bi-logo-clients-row{grid-template-columns:repeat(3,1fr)}}@media (min-width:1024px){.bi-logo-clients-row{grid-template-columns:repeat(6,1fr)}}`,
  };
}
