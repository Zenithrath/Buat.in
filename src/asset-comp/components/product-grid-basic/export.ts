import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  tag?: string;
}

export function productGridExport(node: Node): ExportResult {
  const sectionTitle = propString(node, "sectionTitle") || "Produk Unggulan";

  let products: ProductItem[] = [];
  try {
    products = JSON.parse(propString(node, "productsJson"));
  } catch {
    products = [{ id: "p1", name: "Produk 1", price: "Rp 100.000" }];
  }

  const itemsHtml = products
    .map(
      (p) => `
      <div class="bi-product-card">
        <div class="bi-product-img">[Foto]</div>
        <h4 class="bi-product-name">${p.name}</h4>
        <p class="bi-product-price">${p.price}</p>
      </div>`
    )
    .join("\n");

  const html = `
<section class="bi-product-grid">
  <h2>${sectionTitle}</h2>
  <div class="bi-products-wrapper">
    ${itemsHtml}
  </div>
</section>`;

  const css = `
.bi-product-grid { padding: 4rem 1.5rem; text-align: center; }
.bi-products-wrapper { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.bi-product-card { background: var(--card); border: 1px solid var(--border); padding: 1rem; border-radius: var(--radius); text-align: left; }
.bi-product-img { height: 160px; background: var(--muted); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
.bi-product-name { font-size: 0.875rem; font-weight: 700; margin: 0 0 0.5rem 0; }
.bi-product-price { font-size: 0.875rem; font-weight: 800; color: var(--primary); margin: 0; }
`;

  return { html, css };
}
