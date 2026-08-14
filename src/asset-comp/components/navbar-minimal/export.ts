import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function navbarExport(node: Node): ExportResult {
  const logoText = propString(node, "logoText") || "Logo Saya";
  const link1Text = propString(node, "link1Text") || "Beranda";
  const link1Url = propString(node, "link1Url") || "#";
  const link2Text = propString(node, "link2Text") || "Tentang";
  const link2Url = propString(node, "link2Url") || "#tentang";
  const link3Text = propString(node, "link3Text") || "Kontak";
  const link3Url = propString(node, "link3Url") || "#kontak";
  const ctaText = propString(node, "ctaText") || "Mulai";
  const ctaUrl = propString(node, "ctaUrl") || "#";

  const linksHtml = [
    link1Text ? `<a href="${link1Url}" class="bi-nav-link">${link1Text}</a>` : "",
    link2Text ? `<a href="${link2Url}" class="bi-nav-link">${link2Text}</a>` : "",
    link3Text ? `<a href="${link3Url}" class="bi-nav-link">${link3Text}</a>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  const html = `
<nav class="bi-navbar">
  <div class="bi-nav-logo">${logoText}</div>
  <div class="bi-nav-links">
    ${linksHtml}
  </div>
  ${ctaText ? `<a href="${ctaUrl}" class="bi-nav-cta">${ctaText}</a>` : ""}
</nav>`;

  const css = `
.bi-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
}
.bi-nav-logo {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--foreground);
}
.bi-nav-links {
  display: flex;
  gap: 1.5rem;
}
.bi-nav-link {
  color: var(--muted-foreground);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
}
.bi-nav-link:hover { color: var(--foreground); }
.bi-nav-cta {
  background: var(--primary);
  color: var(--primary-foreground);
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
}
`;

  return { html, css };
}
