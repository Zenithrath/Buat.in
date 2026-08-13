import type { Node } from "@/lib/schema/types";
import { escapeHtml, sanitizeUrl, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const CTA_CSS = `.bi-cta-card {
  background: var(--bi-primary);
  color: var(--bi-primary-fg);
  border-radius: var(--bi-radius);
  padding: clamp(32px, 6vw, 64px);
  box-shadow: var(--bi-shadow);
}

.bi-cta-card .bi-title {
  color: var(--bi-primary-fg);
}

.bi-cta-card .bi-subtitle {
  color: color-mix(in srgb, var(--bi-primary-fg) 80%, transparent);
  margin-bottom: 32px;
}

.bi-cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.bi-btn-on-primary {
  background: var(--bi-primary-fg);
  color: var(--bi-primary);
}

.bi-btn-on-primary-outline {
  background: transparent;
  color: var(--bi-primary-fg);
  border: 1px solid color-mix(in srgb, var(--bi-primary-fg) 40%, transparent);
}`;

export function ctaExportAdapter(node: Node, ctx: ExportContext): ExportResult {
  const { html: wrapper, css } = sectionWrapper(node, ctx, "", "bi-section");

  const title = escapeHtml(node.props.title || "Ajakan bertindak");
  const subtitle = escapeHtml(
    node.props.subtitle || "Tulis pesan ajakan Anda di sini."
  );
  const cta = `<a class="bi-btn bi-btn-on-primary" href="${sanitizeUrl(
    node.props.ctaUrl
  )}">${escapeHtml(node.props.ctaText || "Hubungi Kami")}</a>`;
  const secondary = node.props.secondaryText
    ? `<a class="bi-btn bi-btn-on-primary-outline" href="${sanitizeUrl(
        node.props.secondaryUrl
      )}">${escapeHtml(node.props.secondaryText)}</a>`
    : "";

  const inner = `<div class="bi-container">
  <div class="bi-cta-card">
    <h2 class="bi-title">${title}</h2>
    <p class="bi-subtitle">${subtitle}</p>
    <div class="bi-cta-actions">
      ${cta}
      ${secondary}
    </div>
  </div>
</div>`;

  return {
    html: wrapper.replace("</section>", `${inner}</section>`),
    css: CTA_CSS + "\n" + css,
  };
}