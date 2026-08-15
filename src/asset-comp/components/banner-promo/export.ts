import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

export function bannerPromoExport(node: Node): ExportResult {
  const badge = propString(node, "badge").trim() || "Promo bulan ini";
  const heading =
    propString(node, "heading").trim() || "Potongan 20% untuk langganan tahunan";
  const description =
    propString(node, "description").trim() || "Berlaku untuk pendaftaran baru hingga akhir bulan.";
  const ctaText = propString(node, "ctaText").trim() || "Klaim promo";
  const ctaUrl = sanitizeUrl(propString(node, "ctaUrl").trim() || "#promo");

  return {
    html: `<section class="bi-bp">
  <div class="bi-bp-inner">
    <div class="bi-bp-panel">
      <span class="bi-bp-badge">${escapeHtml(badge)}</span>
      <h2 class="bi-bp-title">${escapeHtml(heading)}</h2>
      <p class="bi-bp-desc">${escapeHtml(description)}</p>
      <div class="bi-bp-actions">
        <a href="${escapeHtml(ctaUrl)}" class="bi-bp-cta">${escapeHtml(ctaText)} <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
</section>`,
    css: `.bi-bp{padding:3rem max(1.25rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-bp-inner{max-width:64rem;margin-inline:auto}.bi-bp-panel{position:relative;overflow:hidden;padding:2.5rem 1.5rem;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * 1.6);background:linear-gradient(120deg,color-mix(in srgb,var(--bi-primary) 10%,transparent),transparent 65%);text-align:center}.bi-bp-badge{display:inline-flex;padding:.3rem .75rem;border:1px solid color-mix(in srgb,var(--bi-primary) 30%,transparent);border-radius:999px;background:color-mix(in srgb,var(--bi-primary) 10%,transparent);color:var(--bi-primary);font-size:.6875rem;font-weight:700}.bi-bp-title{margin:1rem auto 0;max-width:34rem;font:800 clamp(1.5rem,3.5vw,2rem)/1.15 var(--bi-font-heading);letter-spacing:-.04em}.bi-bp-desc{margin:1rem auto 0;max-width:28rem;color:var(--bi-muted-fg);font-size:.9375rem;line-height:1.7}.bi-bp-actions{display:flex;justify-content:center;margin-top:1.75rem}.bi-bp-cta{display:inline-flex;min-height:2.75rem;align-items:center;gap:.5rem;padding:.625rem 1.5rem;border-radius:var(--bi-radius);background:var(--bi-primary);color:var(--bi-primary-fg);font-size:.875rem;font-weight:700;text-decoration:none;box-shadow:0 4px 14px color-mix(in srgb,var(--bi-primary) 30%,transparent);transition:transform .15s ease,box-shadow .15s ease}.bi-bp-cta:hover{transform:translateY(-2px);box-shadow:0 6px 18px color-mix(in srgb,var(--bi-primary) 40%,transparent)}@media (min-width:640px){.bi-bp{padding-block:4rem}.bi-bp-panel{padding:3.5rem 2.5rem}}`,
  };
}
