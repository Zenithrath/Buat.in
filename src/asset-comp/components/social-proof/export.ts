import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function ratingNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  const parsed = typeof value === "number" ? value : Number(String(value ?? ""));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.min(5, Math.round(parsed)));
}

const STAR_PATH =
  "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

export function socialProofExport(node: Node): ExportResult {
  const rating = ratingNumber(node, "rating", 5);
  const ratingText = propString(node, "ratingText").trim() || "4,9 dari 5";
  const countText =
    propString(node, "countText").trim() || "1.200+ pelanggan aktif";
  const note =
    propString(node, "note").trim() ||
    "Berdiri sejak 2019 dengan ulasan asli dari toko-toko kecil hingga ritel nasional.";

  const starsHtml = [0, 1, 2, 3, 4]
    .map(
      (index) =>
        `<svg class="bi-sp-star${index < rating ? " bi-sp-star-on" : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${STAR_PATH}"/></svg>`
    )
    .join("");

  return {
    html: `<section class="bi-sp">
  <div class="bi-sp-inner">
    <div class="bi-sp-stars" role="img" aria-label="Rating ${rating} dari 5 bintang">${starsHtml}</div>
    <p class="bi-sp-rating">${escapeHtml(ratingText)}</p>
    <p class="bi-sp-count">${escapeHtml(countText)}</p>
    <p class="bi-sp-note">${escapeHtml(note)}</p>
  </div>
</section>`,
    css: `.bi-sp{padding:3rem max(1.25rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-sp-inner{max-width:36rem;margin-inline:auto;text-align:center}.bi-sp-stars{display:flex;justify-content:center;gap:.35rem}.bi-sp-star{width:1.375rem;height:1.375rem;color:color-mix(in srgb,var(--bi-muted-fg) 30%,transparent);fill:color-mix(in srgb,var(--bi-muted-fg) 30%,transparent)}.bi-sp-star-on{color:#f59e0b;fill:#f59e0b}.bi-sp-rating{margin:1rem 0 0;font:800 clamp(1.375rem,3vw,1.75rem)/1.15 var(--bi-font-heading);letter-spacing:-.04em}.bi-sp-count{margin:.25rem 0 0;font-size:.875rem;font-weight:600}.bi-sp-note{max-width:30rem;margin:1rem auto 0;color:var(--bi-muted-fg);font-size:.875rem;line-height:1.6}@media (min-width:640px){.bi-sp{padding-block:3.5rem}}`,
  };
}
