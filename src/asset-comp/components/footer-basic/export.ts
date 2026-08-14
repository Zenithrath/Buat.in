import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

interface FooterLink {
  label: string;
  url: string;
}

function text(value: unknown) {
  return value == null ? "" : String(value).trim();
}

function parseLinks(value: unknown): FooterLink[] {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.flatMap((entry): FooterLink[] => {
    if (!entry || typeof entry !== "object") return [];
    const link = entry as Record<string, unknown>;
    const label = text(link.label ?? link.text ?? link.name);
    if (!label) return [];
    return [{ label, url: text(link.url ?? link.href) || "#" }];
  });
}

function getLinks(node: Node): FooterLink[] {
  const direct = parseLinks(node.props.links);
  if (direct.length) return direct;
  const json = parseLinks(node.props.linksJson);
  if (json.length) return json;
  return Array.from({ length: 3 }, (_, index) => index + 1).flatMap((position) => {
    const label = propString(node, `link${position}Text`).trim();
    if (!label) return [];
    return [{ label, url: propString(node, `link${position}Url`).trim() || "#" }];
  });
}

export function footerExport(node: Node): ExportResult {
  const brandName = propString(node, "brandName").trim() || "Buat.in";
  const brandUrl = propString(node, "brandUrl").trim() || "#";
  const tagline =
    propString(node, "tagline").trim() ||
    "Membuat kehadiran digital yang jelas, hangat, dan siap bertumbuh.";
  const copyrightText =
    propString(node, "copyrightText").trim() ||
    propString(node, "copyright").trim() ||
    `© 2026 ${brandName}. Semua hak dilindungi.`;
  const links = getLinks(node);
  const linksHtml = links
    .map(
      (link) => `<a href="${escapeHtml(sanitizeUrl(link.url))}">${escapeHtml(link.label)} <span aria-hidden="true">↗</span></a>`
    )
    .join("");

  const html = `
<footer class="bi-footer-company">
  <div class="bi-container">
    <div class="bi-footer-top">
      <div class="bi-footer-brand">
        <a class="bi-footer-logo" href="${escapeHtml(sanitizeUrl(brandUrl))}"><span aria-hidden="true">B</span>${escapeHtml(brandName)}</a>
        <p>${escapeHtml(tagline)}</p>
      </div>
      ${linksHtml ? `<nav class="bi-footer-links" aria-label="Footer">${linksHtml}</nav>` : ""}
    </div>
    <div class="bi-footer-bottom"><p>${escapeHtml(copyrightText)}</p><span>BUILT WITH CARE</span></div>
  </div>
</footer>`;

  const css = `
.bi-footer-company { padding-block: 2.75rem 1.5rem; border-top: 1px solid var(--bi-border); background: var(--bi-card); color: var(--bi-fg); }
.bi-footer-top { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: 2rem 4rem; text-align: left; }
.bi-footer-brand { min-width: min(100%, 12rem); max-width: 23rem; }
.bi-footer-logo { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.1rem; font-weight: 800; letter-spacing: -0.035em; }
.bi-footer-logo span { display: grid; width: 1.75rem; height: 1.75rem; place-items: center; border-radius: var(--bi-radius); background: var(--bi-primary); color: var(--bi-primary-fg); font-family: var(--bi-font-mono); font-size: 0.75rem; }
.bi-footer-brand p { margin: 0.8rem 0 0; color: var(--bi-muted-fg); font-size: 0.86rem; line-height: 1.6; }
.bi-footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.75rem 1.25rem; padding-top: 0.25rem; }
.bi-footer-links a { display: inline-flex; align-items: center; gap: 0.22rem; color: var(--bi-fg); font-size: 0.82rem; font-weight: 600; }
.bi-footer-links a:hover { color: var(--bi-primary); }
.bi-footer-bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--bi-border); color: var(--bi-muted-fg); font-size: 0.68rem; text-align: left; }
.bi-footer-bottom p { margin: 0; }
.bi-footer-bottom span { font-family: var(--bi-font-mono); letter-spacing: 0.12em; }
@media (max-width: 560px) { .bi-footer-links { justify-content: flex-start; } }
`;

  return { html, css };
}
