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

export function heroSplitExport(node: Node): ExportResult {
  const badgeText = firstProp(node, "badgeText", "eyebrow") || "Kegiatan berjalan";
  const title = firstProp(node, "title") || "Setiap angka di sini berasal dari catatan nyata.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Kolom kanan menampilkan satu gambar tinggi; kartu kecil di bawahnya menyimpan statistik yang bisa diganti dari panel isi.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Lihat laporan";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Kegiatan yang didokumentasikan";
  const imageBadgeText = firstProp(node, "imageBadgeText") || "SEJAK 2018";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Catatan";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "74 proyek selesai, 96% klien kembali bekerja sama.";
  const supportingText =
    firstProp(node, "supportingText") || "Angka diperbarui tiap akhir kuartal.";

  const media = imageUrl
    ? `<img src="${escapeHtml(sanitizeUrl(imageUrl))}" alt="${escapeHtml(imageAlt)}" />`
    : `<div class="bi-hero-split-art" aria-hidden="true"><span>${escapeHtml(imageNoteLabel)}</span><strong>${escapeHtml(imageNoteText)}</strong></div>`;

  const html = `
<section class="bi-hero-split">
  <div class="bi-container bi-hero-split-layout">
    <div class="bi-hero-split-copy">
      ${badgeText ? `<p class="bi-hero-split-kicker"><span aria-hidden="true"></span>${escapeHtml(badgeText)}</p>` : ""}
      <h1 class="bi-title bi-hero-split-title">${escapeHtml(title)}</h1>
      <p class="bi-hero-split-description">${escapeHtml(description)}</p>
      <div class="bi-hero-split-actions">
        ${primaryCtaText ? `<a class="bi-btn bi-btn-primary" href="${escapeHtml(sanitizeUrl(primaryCtaUrl))}">${escapeHtml(primaryCtaText)} <span aria-hidden="true">↗</span></a>` : ""}
        ${secondaryCtaText ? `<a class="bi-btn bi-btn-outline" href="${escapeHtml(sanitizeUrl(secondaryCtaUrl))}">${escapeHtml(secondaryCtaText)}</a>` : ""}
      </div>
      <p class="bi-hero-split-proof"><span></span>${escapeHtml(supportingText)}</p>
    </div>
    <figure class="bi-hero-split-media">
      ${media}
      <span class="bi-hero-split-stamp">${escapeHtml(imageBadgeText)}</span>
      <figcaption class="bi-hero-split-note">
        <span>${escapeHtml(imageNoteLabel)}</span>
        <strong>${escapeHtml(imageNoteText)}</strong>
      </figcaption>
    </figure>
  </div>
</section>`;

  const css = `
.bi-hero-split { overflow: hidden; padding-block: clamp(3.5rem, 8vw, 7rem); background: var(--bi-bg); }
.bi-hero-split-layout { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(2rem, 5vw, 4.5rem); align-items: stretch; text-align: left; }
.bi-hero-split-copy { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
.bi-hero-split-kicker { display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content; margin: 0 0 1.25rem; padding: 0.4rem 0.75rem; border: 1px solid var(--bi-border); border-radius: 999px; background: var(--bi-secondary); color: var(--bi-secondary-fg); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; }
.bi-hero-split-kicker span { width: 0.4rem; height: 0.4rem; border-radius: 999px; background: var(--bi-primary); }
.bi-hero-split-title { max-width: 42rem; font-size: clamp(2.5rem, 5.5vw, 4.75rem); }
.bi-hero-split-description { max-width: 36rem; margin: 1.35rem 0 0; color: var(--bi-muted-fg); font-size: clamp(1rem, 2vw, 1.125rem); line-height: 1.72; }
.bi-hero-split-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; }
.bi-hero-split-proof { display: flex; align-items: center; gap: 0.75rem; margin: 2.5rem 0 0; color: var(--bi-muted-fg); font-size: 0.78rem; }
.bi-hero-split-proof span { width: 2.25rem; height: 1px; background: var(--bi-border); }
.bi-hero-split-media { position: relative; min-height: 32rem; margin: 0; overflow: hidden; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-secondary); box-shadow: var(--bi-shadow); }
.bi-hero-split-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.bi-hero-split-stamp { position: absolute; top: 1.25rem; right: 1.25rem; padding: 0.45rem 0.7rem; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.25); color: #fff; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; backdrop-filter: blur(8px); }
.bi-hero-split-note { position: absolute; bottom: 1.25rem; left: 1.25rem; max-width: 16rem; padding: 1rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: color-mix(in srgb, var(--bi-bg) 92%, transparent); box-shadow: var(--bi-shadow); backdrop-filter: blur(8px); }
.bi-hero-split-note span { display: block; color: var(--bi-primary); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em; }
.bi-hero-split-note strong { display: block; margin-top: 0.45rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.9rem; line-height: 1.4; }
.bi-hero-split-art { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 1.25rem; background: radial-gradient(circle at 15% 10%, var(--bi-primary), transparent 46%), var(--bi-secondary); }
.bi-hero-split-art span { display: block; color: var(--bi-primary); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.13em; }
.bi-hero-split-art strong { display: block; max-width: 16rem; margin-top: 0.55rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.25rem; line-height: 1.25; }
@media (max-width: 860px) { .bi-hero-split-layout { grid-template-columns: 1fr; } .bi-hero-split-media { min-height: 22rem; } .bi-hero-split-media img { position: static; height: 22rem; } }
@media (max-width: 560px) { .bi-hero-split { padding-block: 3rem; } .bi-hero-split-media { min-height: 18rem; } .bi-hero-split-media img { height: 18rem; } }
`;

  return { html, css };
}