import type { Node } from "@/lib/schema/types";
import { escapeHtml, sanitizeUrl, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const FOOTER_CSS = `.bi-footer {
  border-top: 1px solid var(--bi-border);
}

.bi-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  text-align: left;
  padding-block: 48px;
}

.bi-footer-brand strong {
  font-family: var(--bi-font-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--bi-fg);
}

.bi-footer-brand p {
  color: var(--bi-muted);
  margin: 8px 0 0;
  max-width: 340px;
  line-height: 1.6;
}

.bi-footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bi-footer-links a {
  color: var(--bi-muted);
  font-size: 0.95rem;
  transition: color 0.15s ease;
}

.bi-footer-links a:hover {
  color: var(--bi-fg);
}

.bi-footer-bottom {
  border-top: 1px solid var(--bi-border);
  padding-block: 20px;
  text-align: left;
}

.bi-footer-bottom p {
  margin: 0;
  color: var(--bi-muted);
  font-size: 0.875rem;
}

@container (max-width: 640px) {
  .bi-footer-grid {
    grid-template-columns: 1fr;
  }
}`;

export function footerExportAdapter(
  node: Node,
  ctx: ExportContext
): ExportResult {
  const { html: wrapper, css } = sectionWrapper(
    node,
    ctx,
    "",
    "bi-footer bi-section",
    "footer"
  );

  const brand = escapeHtml(node.props.brandName || "Nama Brand");
  const tagline = escapeHtml(node.props.tagline || "");
  const copyright = escapeHtml(
    node.props.copyright || "© 2026. Semua hak dilindungi."
  );

  const links = [1, 2, 3]
    .map((i) => {
      const text = node.props[`link${i}Text`];
      if (!text) return "";
      return `<a href="${sanitizeUrl(
        node.props[`link${i}Url`]
      )}">${escapeHtml(text)}</a>`;
    })
    .join("\n    ");

  const inner = `<div class="bi-container bi-footer-grid">
  <div class="bi-footer-brand">
    <strong>${brand}</strong>
    <p>${tagline}</p>
  </div>
  <nav class="bi-footer-links">
    ${links}
  </nav>
</div>
<div class="bi-container bi-footer-bottom">
  <p>${copyright}</p>
</div>`;

  return {
    html: wrapper.replace("</footer>", `${inner}</footer>`),
    css: FOOTER_CSS + "\n" + css,
  };
}