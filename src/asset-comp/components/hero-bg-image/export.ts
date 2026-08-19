import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

function firstProp(node: Node, ...keys: string[]) {
  for (const key of keys) {
    const value = propString(node, key).trim();
    if (value) return value;
  }
  return "";
}

export function heroBgImageExport(node: Node): ExportResult {
  const badgeText = firstProp(node, "badgeText", "eyebrow") || "FOTO OLEH TIM LAPANGAN";
  const title = firstProp(node, "title") || "Satu momen, ribuan cerita yang ikut bergerak.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Foto latar penuh memberi kesan pertama yang kuat. Ganti gambarnya dari panel isi, lalu padukan dengan tombol aksi di tengah.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Ikut serta";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Momen kegiatan di lokasi";
  const imageBadgeText = firstProp(node, "imageBadgeText") || "EST. 2018";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Keterangan";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "Foto diambil di lapangan, bukan stok.";
  const supportingText =
    firstProp(node, "supportingText") || "Dokumentasi langsung dari lokasi kegiatan.";

  const media = imageUrl
    ? `<img src="${escapeHtml(sanitizeUrl(imageUrl))}" alt="${escapeHtml(imageAlt)}" />`
    : `<div class="bi-hero-bg-art" aria-hidden="true"><div><span>${escapeHtml(imageNoteLabel)}</span><strong>${escapeHtml(imageNoteText)}</strong></div></div>`;

  const html = `
<section class="bi-hero-bg">
  <div class="bi-hero-bg-media">${media}</div>
  <div class="bi-hero-bg-scrim" aria-hidden="true"></div>
  <div class="bi-container bi-hero-bg-content">
    ${badgeText ? `<p class="bi-hero-bg-kicker">${escapeHtml(badgeText)}</p>` : ""}
    <h1 class="bi-title bi-hero-bg-title">${escapeHtml(title)}</h1>
    <p class="bi-hero-bg-description">${escapeHtml(description)}</p>
    <div class="bi-hero-bg-actions">
      ${primaryCtaText ? `<a class="bi-btn bi-hero-bg-primary" href="${escapeHtml(sanitizeUrl(primaryCtaUrl))}">${escapeHtml(primaryCtaText)} <span aria-hidden="true">↗</span></a>` : ""}
      ${secondaryCtaText ? `<a class="bi-btn bi-hero-bg-outline" href="${escapeHtml(sanitizeUrl(secondaryCtaUrl))}">${escapeHtml(secondaryCtaText)}</a>` : ""}
    </div>
    <p class="bi-hero-bg-proof"><span></span>${escapeHtml(supportingText)}<span></span></p>
  </div>
  <span class="bi-hero-bg-stamp">${escapeHtml(imageBadgeText)}</span>
</section>`;

  const css = `
.bi-hero-bg { position: relative; min-height: clamp(32rem, 80vh, 44rem); display: flex; align-items: center; overflow: hidden; background: var(--bi-fg); color: #fff; }
.bi-hero-bg-media { position: absolute; inset: 0; }
.bi-hero-bg-media img { width: 100%; height: 100%; object-fit: cover; }
.bi-hero-bg-scrim { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.72)); }
.bi-hero-bg-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; padding-block: clamp(4rem, 9vw, 7rem); }
.bi-hero-bg-kicker { margin: 0; padding: 0.45rem 0.8rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; background: rgba(255,255,255,0.1); color: #fff; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; backdrop-filter: blur(8px); }
.bi-hero-bg-title { max-width: 48rem; margin: 1.5rem 0 0; color: #fff; font-size: clamp(2.5rem, 6vw, 5.5rem); }
.bi-hero-bg-description { max-width: 40rem; margin: 1.5rem 0 0; color: rgba(255,255,255,0.85); font-size: clamp(1rem, 2vw, 1.125rem); line-height: 1.75; }
.bi-hero-bg-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-top: 2.25rem; }
.bi-hero-bg-primary { background: #fff; color: #000; }
.bi-hero-bg-primary:hover { opacity: 0.92; }
.bi-hero-bg-outline { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.1); color: #fff; backdrop-filter: blur(8px); }
.bi-hero-bg-outline:hover { background: rgba(255,255,255,0.2); }
.bi-hero-bg-proof { display: flex; align-items: center; gap: 0.75rem; margin: 2.5rem 0 0; color: rgba(255,255,255,0.7); font-size: 0.78rem; }
.bi-hero-bg-proof span { width: 2.25rem; height: 1px; background: rgba(255,255,255,0.4); }
.bi-hero-bg-stamp { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 2; padding: 0.45rem 0.7rem; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.25); color: #fff; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; backdrop-filter: blur(8px); }
.bi-hero-bg-art { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 2rem; background: radial-gradient(circle at 20% 15%, var(--bi-primary), transparent 48%), var(--bi-secondary); }
.bi-hero-bg-art > div { max-width: 20rem; padding: 1.5rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: color-mix(in srgb, var(--bi-bg) 90%, transparent); text-align: left; box-shadow: var(--bi-shadow); }
.bi-hero-bg-art span { display: block; color: var(--bi-primary); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.13em; }
.bi-hero-bg-art strong { display: block; margin-top: 0.55rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.35rem; line-height: 1.2; }
@media (max-width: 560px) { .bi-hero-bg { min-height: 34rem; } .bi-hero-bg-stamp { top: 1rem; right: 1rem; } }
`;

  return { html, css };
}