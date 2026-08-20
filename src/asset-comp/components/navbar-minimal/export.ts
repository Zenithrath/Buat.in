import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";
import { logoMarkHtml } from "../_shared/logo-export";

export function navbarExport(node: Node): ExportResult {
  const logoText = propString(node, "logoText") || "Logo Saya";
  const link1Text = propString(node, "link1Text") || "Beranda";
  const link1Url = sanitizeUrl(propString(node, "link1Url"));
  const link2Text = propString(node, "link2Text") || "Tentang";
  const link2Url = sanitizeUrl(propString(node, "link2Url"));
  const link3Text = propString(node, "link3Text") || "Kontak";
  const link3Url = sanitizeUrl(propString(node, "link3Url"));
  const ctaText = propString(node, "ctaText") || "Mulai";
  const ctaUrl = sanitizeUrl(propString(node, "ctaUrl"));
  const menuId = `bi-nav-menu-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "main"}`;

  const linksHtml = [
    link1Text ? `<a href="${escapeHtml(link1Url)}" class="bi-nav-link">${escapeHtml(link1Text)}</a>` : "",
    link2Text ? `<a href="${escapeHtml(link2Url)}" class="bi-nav-link">${escapeHtml(link2Text)}</a>` : "",
    link3Text ? `<a href="${escapeHtml(link3Url)}" class="bi-nav-link">${escapeHtml(link3Text)}</a>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  const html = `
<nav class="bi-navbar bi-nav" data-nav-open="false" aria-label="Navigasi utama">
  <a href="#" class="bi-nav-logo">${logoMarkHtml(node, logoText, "bi-nav-logo-img", "", undefined, true)}${escapeHtml(logoText)}</a>
  <button class="bi-nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-label="Buka menu" aria-controls="${menuId}">
    <span></span><span></span><span></span>
  </button>
  <div class="bi-nav-links" id="${menuId}">
    ${linksHtml}
    ${ctaText ? `<a href="${escapeHtml(ctaUrl)}" class="bi-nav-cta bi-nav-cta--mobile">${escapeHtml(ctaText)}</a>` : ""}
  </div>
  ${ctaText ? `<a href="${escapeHtml(ctaUrl)}" class="bi-nav-cta bi-nav-cta--desktop">${escapeHtml(ctaText)}</a>` : ""}
</nav>`;

  const css = `
.bi-navbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--bi-bg);
  border-bottom: 1px solid var(--bi-border);
  color: var(--bi-fg);
  font-family: var(--bi-font-body);
}
.bi-nav-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--bi-fg);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
}
.bi-nav-logo-img {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--bi-radius);
  object-fit: cover;
}
.bi-nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.bi-nav-link {
  color: var(--bi-muted-fg);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 150ms ease, background 150ms ease;
}
.bi-nav-link:hover { color: var(--bi-fg); }
.bi-nav-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--bi-primary);
  color: var(--bi-primary-fg);
  padding: 0.5rem 1rem;
  border-radius: var(--bi-radius);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--bi-primary) 20%, transparent);
}
.bi-nav-cta:hover { opacity: 0.9; }
.bi-nav-toggle { display: none; width: 2.25rem; height: 2.25rem; align-items: center; justify-content: center; gap: 0.22rem; flex-direction: column; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) - 2px); background: var(--bi-card); color: var(--bi-fg); cursor: pointer; }
.bi-nav-toggle span { display: block; width: 1rem; height: 1.5px; border-radius: 99px; background: currentColor; }
.bi-nav-cta--mobile { display: none; }
@media (max-width: 720px) {
  .bi-navbar { flex-wrap: wrap; padding: 0.875rem 1rem; }
  .bi-nav-toggle { display: inline-flex; }
  .bi-nav-links { display: none; order: 3; width: 100%; flex-direction: column; align-items: stretch; gap: 0.125rem; margin-top: 0.15rem; padding-top: 0.625rem; border-top: 1px solid var(--bi-border); }
  .bi-nav[data-nav-open="true"] .bi-nav-links { display: flex; }
  .bi-nav-link { padding: 0.625rem 0.5rem; border-radius: calc(var(--bi-radius) - 2px); }
  .bi-nav-link:hover { background: var(--bi-muted); }
  .bi-nav-cta--desktop { display: none; }
  .bi-nav-cta--mobile { display: inline-flex; margin-top: 0.375rem; }
}
`;

  return { html, css };
}
