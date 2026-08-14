import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function heroExport(node: Node): ExportResult {
  const badgeText = propString(node, "badgeText") || "";
  const title = propString(node, "title") || "Hero Title";
  const description = propString(node, "description") || "";
  const primaryCtaText = propString(node, "primaryCtaText") || "";
  const primaryCtaUrl = propString(node, "primaryCtaUrl") || "#";

  const html = `
<section class="bi-hero">
  ${badgeText ? `<span class="bi-hero-badge">${badgeText}</span>` : ""}
  <h1 class="bi-hero-title">${title}</h1>
  <p class="bi-hero-desc">${description}</p>
  ${primaryCtaText ? `<a href="${primaryCtaUrl}" class="bi-hero-cta">${primaryCtaText}</a>` : ""}
</section>`;

  const css = `
.bi-hero {
  text-align: center;
  padding: 5rem 1.5rem;
  background-color: var(--background);
}
.bi-hero-badge {
  display: inline-block;
  background: rgba(var(--primary-rgb, 99, 102, 241), 0.1);
  color: var(--primary);
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.bi-hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--foreground);
  margin: 0 0 1rem 0;
}
.bi-hero-desc {
  font-size: 1.125rem;
  color: var(--muted-foreground);
  max-width: 600px;
  margin: 0 auto 2rem auto;
}
.bi-hero-cta {
  display: inline-block;
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  font-weight: 700;
  text-decoration: none;
}
`;

  return { html, css };
}
