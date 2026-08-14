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

export function heroExport(node: Node): ExportResult {
  const badgeText = firstProp(node, "badgeText", "eyebrow") || "Studio kreatif independen";
  const title = firstProp(node, "title") || "Membuat kehadiran digital yang terasa manusiawi.";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Kami menyatukan strategi, identitas, dan website yang memudahkan orang memahami bisnis Anda.";
  const primaryCtaText =
    firstProp(node, "primaryCtaText", "ctaText", "buttonText") || "Mulai percakapan";
  const primaryCtaUrl = firstProp(node, "primaryCtaUrl", "ctaUrl", "buttonUrl") || "#kontak";
  const secondaryCtaText = firstProp(node, "secondaryCtaText", "secondaryText");
  const secondaryCtaUrl = firstProp(node, "secondaryCtaUrl", "secondaryUrl") || "#layanan";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Kolaborasi tim kreatif";
  const imageBadgeText = firstProp(node, "imageBadgeText") || "EST. 2018";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Studio note";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "Dari arah besar sampai detail yang siap dipakai.";
  const supportingText =
    firstProp(node, "supportingText") || "Strategi, identitas, dan situs yang terhubung.";

  const media = imageUrl
    ? `<img src="${escapeHtml(sanitizeUrl(imageUrl))}" alt="${escapeHtml(imageAlt)}" />`
    : `<div class="bi-hero-art" aria-hidden="true"><div><span>${escapeHtml(imageNoteLabel)}</span><strong>${escapeHtml(imageNoteText)}</strong></div></div>`;

  const html = `
<section class="bi-hero-company">
  <div class="bi-container bi-hero-layout">
    <div class="bi-hero-copy">
      ${badgeText ? `<p class="bi-hero-kicker">${escapeHtml(badgeText)}</p>` : ""}
      <h1 class="bi-title bi-hero-title">${escapeHtml(title)}</h1>
      <p class="bi-hero-description">${escapeHtml(description)}</p>
      <div class="bi-hero-actions">
        ${primaryCtaText ? `<a class="bi-btn bi-btn-primary" href="${escapeHtml(sanitizeUrl(primaryCtaUrl))}">${escapeHtml(primaryCtaText)} <span aria-hidden="true">↗</span></a>` : ""}
        ${secondaryCtaText ? `<a class="bi-btn bi-btn-outline" href="${escapeHtml(sanitizeUrl(secondaryCtaUrl))}">${escapeHtml(secondaryCtaText)}</a>` : ""}
      </div>
      <p class="bi-hero-proof"><span></span>${escapeHtml(supportingText)}</p>
    </div>
    <figure class="bi-hero-media">
      ${media}
      <span class="bi-hero-stamp">${escapeHtml(imageBadgeText)}</span>
      <span class="bi-hero-arrow" aria-hidden="true">↗</span>
    </figure>
  </div>
</section>`;

  const css = `
.bi-hero-company { overflow: hidden; padding-block: clamp(3.5rem, 8vw, 7rem); background: var(--bi-bg); }
.bi-hero-layout { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(2rem, 6vw, 5rem); text-align: left; }
.bi-hero-copy { min-width: min(100%, 17rem); flex: 1 1 25rem; }
.bi-hero-kicker { display: inline-flex; align-items: center; margin: 0 0 1.25rem; padding: 0.4rem 0.75rem; border: 1px solid var(--bi-border); border-radius: 999px; background: var(--bi-secondary); color: var(--bi-secondary-fg); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; }
.bi-hero-title { max-width: 44rem; font-size: clamp(2.5rem, 5.5vw, 5rem); }
.bi-hero-description { max-width: 38rem; margin: 1.35rem 0 0; color: var(--bi-muted-fg); font-size: clamp(1rem, 2vw, 1.125rem); line-height: 1.72; }
.bi-hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 2rem; }
.bi-hero-proof { display: flex; align-items: center; gap: 0.75rem; margin: 2.5rem 0 0; color: var(--bi-muted-fg); font-size: 0.78rem; }
.bi-hero-proof span { width: 2.25rem; height: 1px; background: var(--bi-border); }
.bi-hero-media { position: relative; min-width: min(100%, 15rem); flex: 1 1 22rem; min-height: 18rem; margin: 0; overflow: hidden; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-card); box-shadow: var(--bi-shadow); }
.bi-hero-media img { width: 100%; min-height: 18rem; height: 100%; object-fit: cover; }
.bi-hero-stamp { position: absolute; top: 1.25rem; left: 1.25rem; padding: 0.45rem 0.7rem; border: 1px solid rgba(255,255,255,0.35); border-radius: 999px; background: rgba(0,0,0,0.25); color: #fff; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; backdrop-filter: blur(8px); }
.bi-hero-arrow { position: absolute; right: 1.25rem; bottom: 1.25rem; display: grid; width: 2.75rem; height: 2.75rem; place-items: center; border-radius: 999px; background: var(--bi-primary); color: var(--bi-primary-fg); font-size: 1.2rem; box-shadow: var(--bi-shadow); }
.bi-hero-art { display: flex; min-height: 18rem; align-items: flex-end; padding: 1.25rem; background: radial-gradient(circle at 15% 10%, var(--bi-primary), transparent 46%), var(--bi-secondary); }
.bi-hero-art > div { max-width: 18rem; padding: 1.25rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: color-mix(in srgb, var(--bi-bg) 88%, transparent); box-shadow: var(--bi-shadow); }
.bi-hero-art span { display: block; color: var(--bi-primary); font-size: 0.65rem; font-weight: 700; letter-spacing: 0.13em; }
.bi-hero-art strong { display: block; margin-top: 0.55rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.35rem; line-height: 1.2; }
@media (max-width: 560px) { .bi-hero-company { padding-block: 3.5rem; } .bi-hero-media { flex-basis: 100%; } }
`;

  return { html, css };
}
