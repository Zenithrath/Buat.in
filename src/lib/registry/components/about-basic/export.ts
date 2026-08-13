import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const ABOUT_CSS = `.bi-about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  text-align: left;
}

.bi-about-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--bi-radius);
  box-shadow: var(--bi-shadow);
}

.bi-about-content .bi-subtitle {
  margin-inline: 0;
}

.bi-about-text {
  color: var(--bi-fg);
  font-size: 1.05rem;
  line-height: 1.75;
  margin: 20px 0 28px;
}

.bi-about-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.bi-about-stat strong {
  display: block;
  font-family: var(--bi-font-heading);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--bi-primary);
}

.bi-about-stat span {
  color: var(--bi-muted);
  font-size: 0.9rem;
}

@container (max-width: 820px) {
  .bi-about {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}`;

export function aboutExportAdapter(
  node: Node,
  ctx: ExportContext
): ExportResult {
  const { html: wrapper, css } = sectionWrapper(node, ctx, "", "bi-section");

  const eyebrow = node.props.eyebrow
    ? `<p class="bi-eyebrow">${escapeHtml(node.props.eyebrow)}</p>`
    : "";
  const title = escapeHtml(node.props.title || "Tentang Kami");
  const content = escapeHtml(
    node.props.content ||
      "Ceritakan kisah, visi, dan nilai dari bisnis Anda di sini."
  );
  const image = node.props.imageUrl
    ? `<img class="bi-about-img" src="${escapeHtml(
        propString(node, "imageUrl")
      )}" alt="${escapeHtml(node.props.imageAlt || "Tentang kami")}" loading="lazy" />`
    : "";

  const stats = [1, 2, 3]
    .map((i) => {
      const value = node.props[`stat${i}Value`];
      const label = node.props[`stat${i}Label`];
      if (!value && !label) return "";
      return `<div class="bi-about-stat">
      <strong>${escapeHtml(value || "")}</strong>
      <span>${escapeHtml(label || "")}</span>
    </div>`;
    })
    .join("\n  ");

  const inner = `<div class="bi-container bi-about">
  ${image}
  <div class="bi-about-content">
    ${eyebrow}
    <h2 class="bi-title">${title}</h2>
    <p class="bi-about-text">${content}</p>
    <div class="bi-about-stats">
    ${stats}
    </div>
  </div>
</div>`;

  return {
    html: wrapper.replace("</section>", `${inner}</section>`),
    css: ABOUT_CSS + "\n" + css,
  };
}