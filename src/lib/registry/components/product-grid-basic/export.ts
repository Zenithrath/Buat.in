import type { Node } from "@/lib/schema/types";
import { escapeHtml, sectionWrapper } from "@/lib/registry/shared";
import type { ExportContext, ExportResult } from "@/lib/registry/types";

export const PRODUCT_CSS = `.bi-product-grid-title {
  margin-bottom: 8px;
}

.bi-product-grid-subtitle {
  margin-bottom: 40px;
}

.bi-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.bi-product-card {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 12px;
}

.bi-product-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: calc(var(--bi-radius) - 4px);
  margin-bottom: 16px;
}

.bi-product-card h3 {
  margin: 0 0 4px;
  font-family: var(--bi-font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--bi-fg);
}

.bi-product-price {
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--bi-primary);
}`;

export function productGridExportAdapter(
  node: Node,
  ctx: ExportContext
): ExportResult {
  const { html: wrapper, css } = sectionWrapper(node, ctx, "", "bi-section");
  const title = escapeHtml(node.props.title || "Produk Unggulan");
  const subtitle = escapeHtml(node.props.subtitle || "");

  const cards = [1, 2, 3, 4]
    .map((i) => {
      const name = node.props[`product${i}Name`];
      const price = node.props[`product${i}Price`];
      const imageUrl = node.props[`product${i}ImageUrl`];
      if (!name && !price && !imageUrl) return "";
      const img = imageUrl
        ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(
            name || "Produk"
          )}" loading="lazy" />`
        : "";
      return `<article class="bi-card bi-product-card">
    ${img}
    <h3>${escapeHtml(name || "Nama Produk")}</h3>
    <p class="bi-product-price">${escapeHtml(price || "")}</p>
  </article>`;
    })
    .join("\n  ");

  const inner = `<div class="bi-container">
  <h2 class="bi-title bi-product-grid-title">${title}</h2>
  <p class="bi-subtitle bi-product-grid-subtitle">${subtitle}</p>
  <div class="bi-product-grid">
  ${cards}
  </div>
</div>`;

  return {
    html: wrapper.replace("</section>", `${inner}</section>`),
    css: PRODUCT_CSS + "\n" + css,
  };
}