import type { Node } from "@/lib/schema/types";
import { escapeHtml, sanitizeUrl, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const HERO_CSS = `.bi-hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0 0 16px;
  max-width: 820px;
  margin-inline: auto;
}

.bi-hero-subtitle {
  margin-bottom: 32px;
}

.bi-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 48px;
}

.bi-hero-image {
  border-radius: var(--bi-radius);
  box-shadow: var(--bi-shadow);
  max-width: 960px;
  width: 100%;
  margin-inline: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`;

export function heroExportAdapter(
  node: Node,
  ctx: ExportContext
): ExportResult {
  const { html: wrapper, css } = sectionWrapper(node, ctx, "", "bi-section");

  const eyebrow = node.props.eyebrow
    ? `<p class="bi-eyebrow">${escapeHtml(node.props.eyebrow)}</p>`
    : "";
  const title = escapeHtml(node.props.title || "Judul hero Anda");
  const subtitle = escapeHtml(
    node.props.subtitle || "Subjudul singkat yang menjelaskan nilai utama Anda."
  );
  const cta = node.props.ctaText
    ? `<a class="bi-btn bi-btn-primary" href="${sanitizeUrl(
        node.props.ctaUrl
      )}">${escapeHtml(node.props.ctaText)}</a>`
    : "";
  const secondary = node.props.secondaryText
    ? `<a class="bi-btn bi-btn-outline" href="${sanitizeUrl(
        node.props.secondaryUrl
      )}">${escapeHtml(node.props.secondaryText)}</a>`
    : "";
  const image = node.props.imageUrl
    ? `<img class="bi-hero-image" src="${escapeHtml(
        node.props.imageUrl
      )}" alt="${escapeHtml(node.props.imageAlt || "Gambar hero")}" loading="lazy" />`
    : "";

  const inner = `<div class="bi-container">
  ${eyebrow}
  <h1 class="bi-title bi-hero-title">${title}</h1>
  <p class="bi-subtitle bi-hero-subtitle">${subtitle}</p>
  <div class="bi-hero-actions">
    ${cta}
    ${secondary}
  </div>
  ${image}
</div>`;

  return {
    html: wrapper.replace("</section>", `${inner}</section>`),
    css: HERO_CSS + "\n" + css,
  };
}