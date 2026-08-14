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

export function ctaExport(node: Node): ExportResult {
  const title = firstProp(node, "title") || "Punya cerita yang perlu disampaikan dengan lebih baik?";
  const description =
    firstProp(node, "description", "subtitle") ||
    "Ceritakan konteks bisnis Anda dalam sesi perkenalan singkat. Kami bantu memetakan langkah yang paling masuk akal.";
  const buttonText =
    firstProp(node, "buttonText", "ctaText", "primaryCtaText") || "Jadwalkan konsultasi";
  const buttonUrl = firstProp(node, "buttonUrl", "ctaUrl", "primaryCtaUrl") || "#kontak";
  const secondaryText = firstProp(node, "secondaryText", "secondaryCtaText");
  const secondaryUrl = firstProp(node, "secondaryUrl", "secondaryCtaUrl") || "#layanan";

  const html = `
<section id="kontak" class="bi-cta-company">
  <div class="bi-container">
    <div class="bi-cta-panel">
      <div class="bi-cta-orb bi-cta-orb-left" aria-hidden="true"></div>
      <div class="bi-cta-orb bi-cta-orb-right" aria-hidden="true"></div>
      <div class="bi-cta-content">
        <p class="bi-cta-kicker">Mari berbincang</p>
        <h2 class="bi-title">${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
        <div class="bi-cta-actions">
          ${buttonText ? `<a href="${escapeHtml(sanitizeUrl(buttonUrl))}" class="bi-btn bi-cta-primary">${escapeHtml(buttonText)} <span aria-hidden="true">↗</span></a>` : ""}
          ${secondaryText ? `<a href="${escapeHtml(sanitizeUrl(secondaryUrl))}" class="bi-btn bi-cta-secondary">${escapeHtml(secondaryText)}</a>` : ""}
        </div>
      </div>
    </div>
  </div>
</section>`;

  const css = `
.bi-cta-company { padding-block: clamp(3.5rem, 8vw, 6.5rem); background: var(--bi-bg); }
.bi-cta-panel { position: relative; overflow: hidden; padding: clamp(2.5rem, 6vw, 4.5rem) 1.5rem; border-radius: var(--bi-radius); background: var(--bi-primary); color: var(--bi-primary-fg); text-align: center; box-shadow: var(--bi-shadow); }
.bi-cta-content { position: relative; z-index: 1; max-width: 44rem; margin-inline: auto; }
.bi-cta-kicker { display: inline-flex; margin: 0; padding: 0.4rem 0.75rem; border: 1px solid color-mix(in srgb, var(--bi-primary-fg) 35%, transparent); border-radius: 999px; background: color-mix(in srgb, var(--bi-primary-fg) 10%, transparent); font-size: 0.72rem; font-weight: 700; }
.bi-cta-panel h2 { max-width: 38rem; margin: 1.2rem auto 0; color: var(--bi-primary-fg); font-size: clamp(2rem, 4vw, 3.25rem); }
.bi-cta-panel .bi-cta-content > p:not(.bi-cta-kicker) { max-width: 36rem; margin: 1.1rem auto 0; color: color-mix(in srgb, var(--bi-primary-fg) 86%, transparent); font-size: 1rem; line-height: 1.7; }
.bi-cta-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; margin-top: 2rem; }
.bi-cta-primary { background: var(--bi-bg); color: var(--bi-fg); box-shadow: 0 2px 8px rgba(0,0,0,.12); }
.bi-cta-secondary { border: 1px solid color-mix(in srgb, var(--bi-primary-fg) 45%, transparent); color: var(--bi-primary-fg); }
.bi-cta-orb { position: absolute; border-radius: 999px; pointer-events: none; }
.bi-cta-orb-left { top: -4.5rem; left: -4.5rem; width: 12rem; height: 12rem; background: color-mix(in srgb, var(--bi-primary-fg) 14%, transparent); filter: blur(18px); }
.bi-cta-orb-right { right: -3.5rem; bottom: -5rem; width: 15rem; height: 15rem; border: 1.25rem solid color-mix(in srgb, var(--bi-primary-fg) 12%, transparent); }
`;

  return { html, css };
}
