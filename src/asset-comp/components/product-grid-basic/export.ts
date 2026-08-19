import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

interface ProductItem {
  id: string;
  name: string;
  price: string;
  tag: string;
  imageUrl: string;
  description: string;
  actionText: string;
  actionUrl: string;
}

const FALLBACK_PRODUCTS: ProductItem[] = [
  { id: "strategy", name: "Arah & Strategi Brand", price: "Riset, positioning, dan pesan utama", tag: "Fondasi", imageUrl: "", description: "Keputusan awal yang membuat komunikasi bisnis terasa konsisten.", actionText: "Pelajari layanan", actionUrl: "#kontak" },
  { id: "identity", name: "Identitas Visual", price: "Sistem visual untuk setiap titik temu", tag: "Identitas", imageUrl: "", description: "Logo dan bahasa visual yang dapat dipakai tim setiap hari.", actionText: "Lihat ruang lingkup", actionUrl: "#kontak" },
  { id: "website", name: "Website Perusahaan", price: "Struktur konten dan desain responsif", tag: "Digital", imageUrl: "", description: "Situs yang memudahkan calon pelanggan menemukan alasan untuk percaya.", actionText: "Diskusikan website", actionUrl: "#kontak" },
];

function text(value: unknown) {
  return value == null ? "" : String(value).trim();
}

function anchorId(value: string, fallback: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || fallback;
}

function parseProducts(value: unknown): ProductItem[] {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.flatMap((entry, index): ProductItem[] => {
    if (!entry || typeof entry !== "object") return [];
    const item = entry as Record<string, unknown>;
    const name = text(item.name);
    if (!name) return [];
    return [{ id: text(item.id) || `service-${index + 1}`, name, price: text(item.price), tag: text(item.tag), imageUrl: text(item.imageUrl ?? item.image), description: text(item.description), actionText: text(item.actionText), actionUrl: text(item.actionUrl ?? item.url) || "#" }];
  });
}

function legacyProducts(node: Node): ProductItem[] {
  return Array.from({ length: 4 }, (_, index) => index + 1).flatMap((position) => {
    const name = propString(node, `product${position}Name`).trim();
    if (!name) return [];
    return [{ id: `service-${position}`, name, price: propString(node, `product${position}Price`).trim(), tag: propString(node, `product${position}Tag`).trim(), imageUrl: propString(node, `product${position}ImageUrl`).trim(), description: propString(node, `product${position}Description`).trim(), actionText: propString(node, `product${position}ActionText`).trim(), actionUrl: propString(node, `product${position}ActionUrl`).trim() || "#" }];
  });
}

function getProducts(node: Node) {
  const fromJson = parseProducts(node.props.productsJson);
  if (fromJson.length) return fromJson;
  const fromArray = parseProducts(node.props.products);
  if (fromArray.length) return fromArray;
  const fromLegacy = legacyProducts(node);
  return fromLegacy.length ? fromLegacy : FALLBACK_PRODUCTS;
}

export function productGridExport(node: Node): ExportResult {
  const sectionTitle =
    propString(node, "sectionTitle").trim() ||
    propString(node, "title").trim() ||
    "Layanan yang menyatukan gambaran besar dan detail kecil.";
  const sectionSubtitle =
    propString(node, "sectionSubtitle").trim() ||
    propString(node, "subtitle").trim() ||
    "Pilih pendampingan yang sesuai tahap bisnis Anda, atau susun ruang lingkup bersama kami.";
  const sectionId = anchorId(propString(node, "sectionId"), "layanan");
  const products = getProducts(node);

  const cards = products
    .map((item, index) => {
      const media = item.imageUrl
        ? `<img src="${escapeHtml(sanitizeUrl(item.imageUrl))}" alt="${escapeHtml(item.name)}" />`
        : `<div class="bi-service-art" aria-hidden="true">0${index + 1}</div>`;
      return `<article class="bi-service-card">
        <div class="bi-service-media">${media}${item.tag ? `<span class="bi-service-tag">${escapeHtml(item.tag)}</span>` : ""}</div>
        <div class="bi-service-body">
          <h3>${escapeHtml(item.name)}</h3>
          ${item.description ? `<p class="bi-service-description">${escapeHtml(item.description)}</p>` : ""}
          ${item.price ? `<p class="bi-service-price">${escapeHtml(item.price)}</p>` : ""}
          <a class="bi-service-action-link" href="${escapeHtml(sanitizeUrl(item.actionUrl))}">
          <span class="bi-service-action">${escapeHtml(item.actionText || "Pelajari layanan")} <b aria-hidden="true">↗</b></span>
          </a>
        </div>
      </article>`;
    })
    .join("\n");

  const html = `
<section id="${escapeHtml(sectionId)}" class="bi-services-company">
  <div class="bi-container">
    <div class="bi-services-heading">
      <div><p class="bi-eyebrow">Layanan utama</p><h2 class="bi-title">${escapeHtml(sectionTitle)}</h2></div>
      <p>${escapeHtml(sectionSubtitle)}</p>
    </div>
    <div class="bi-services-grid">${cards}</div>
  </div>
</section>`;

  const css = `
.bi-services-company { padding-block: clamp(3.5rem, 8vw, 6.5rem); background: color-mix(in srgb, var(--bi-secondary) 38%, var(--bi-bg)); }
.bi-services-heading { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.25rem 3rem; text-align: left; }
.bi-services-heading h2 { max-width: 42rem; font-size: clamp(2rem, 4vw, 3.25rem); }
.bi-services-heading > p { max-width: 28rem; margin: 0; color: var(--bi-muted-fg); font-size: 0.95rem; line-height: 1.65; }
.bi-services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(13.125rem, 1fr)); gap: 1rem; margin-top: 2.25rem; text-align: left; }
.bi-service-card { min-width: 0; overflow: hidden; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-card); box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: transform .2s ease, box-shadow .2s ease; }
.bi-service-card:hover { transform: translateY(-4px); box-shadow: var(--bi-shadow); }
.bi-service-media { position: relative; height: 10rem; overflow: hidden; background: var(--bi-secondary); }
.bi-service-media img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s ease; }
.bi-service-card:hover .bi-service-media img { transform: scale(1.05); }
.bi-service-art { display: flex; height: 100%; align-items: end; padding: 1rem; background: radial-gradient(circle at 18% 15%, var(--bi-primary), transparent 55%); color: var(--bi-primary-fg); font-family: var(--bi-font-mono); font-size: 2.5rem; font-weight: 800; letter-spacing: -0.1em; }
.bi-service-tag { position: absolute; top: 0.75rem; left: 0.75rem; padding: 0.35rem 0.55rem; border-radius: 999px; background: color-mix(in srgb, var(--bi-bg) 90%, transparent); color: var(--bi-fg); font-size: 0.65rem; font-weight: 700; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.bi-service-body { padding: 1.15rem; }
.bi-service-body h3 { margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1rem; line-height: 1.35; }
.bi-service-description, .bi-service-price { margin: 0.6rem 0 0; color: var(--bi-muted-fg); font-size: 0.75rem; line-height: 1.55; }
.bi-service-price { font-weight: 600; }
.bi-service-action { display: inline-flex; align-items: center; gap: 0.35rem; margin-top: 1.25rem; color: var(--bi-primary); font-size: 0.75rem; font-weight: 700; }
.bi-service-action-link { color: inherit; text-decoration: none; }
.bi-service-action b { font-size: 0.95rem; }

@media (max-width: 640px) {
  .bi-services-grid { grid-template-columns: 1fr; }
  .bi-service-media { height: 8.5rem; }
  .bi-services-heading h2 { font-size: 1.75rem; }
  .bi-service-body { padding: 1rem; }
}
`;

  return { html, css };
}
