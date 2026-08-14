import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";

const ICONS: Record<string, string> = {
  sparkles: "✦",
  zap: "ϟ",
  layers: "▱",
  chart: "↗",
  shield: "◈",
  globe: "◌",
};

export function cardFeatureExport(node: Node): ExportResult {
  const icon = ICONS[propString(node, "icon").trim()] ?? ICONS.sparkles;
  const eyebrow = propString(node, "eyebrow").trim();
  const title = propString(node, "title").trim() || "Dibuat untuk bergerak lebih cepat";
  const description =
    propString(node, "description").trim() ||
    "Struktur yang rapi membantu tim dan pelanggan memahami langkah berikutnya tanpa kebingungan.";
  const linkText = propString(node, "linkText").trim();
  const linkUrl = propString(node, "linkUrl").trim() || "#";

  return {
    html: `<article class="bi-feature-card">
  <span class="bi-feature-icon" aria-hidden="true">${icon}</span>
  ${eyebrow ? `<p class="bi-feature-kicker">${escapeHtml(eyebrow)}</p>` : ""}
  <h3>${escapeHtml(title)}</h3>
  <p class="bi-feature-copy">${escapeHtml(description)}</p>
  ${linkText ? `<a class="bi-feature-link" href="${escapeHtml(sanitizeUrl(linkUrl))}">${escapeHtml(linkText)} <span aria-hidden="true">↗</span></a>` : ""}
</article>`,
    css: `.bi-feature-card { position: relative; display: flex; min-height: 14rem; height: 100%; flex-direction: column; overflow: hidden; padding: 1.35rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-card); color: var(--bi-fg); box-shadow: 0 1px 2px rgba(0,0,0,.04); transition: transform .25s ease, box-shadow .25s ease; }
.bi-feature-card::before { position: absolute; inset: 0 0 auto; height: 3px; transform: scaleX(0); transform-origin: left; background: var(--bi-primary); content: ""; transition: transform .25s ease; }
.bi-feature-card:hover { transform: translateY(-4px); box-shadow: var(--bi-shadow); }
.bi-feature-card:hover::before { transform: scaleX(1); }
.bi-feature-icon { display: grid; width: 2.7rem; height: 2.7rem; place-items: center; border-radius: calc(var(--bi-radius) * .8); background: color-mix(in srgb, var(--bi-primary) 12%, transparent); color: var(--bi-primary); font-size: 1.3rem; font-weight: 700; }
.bi-feature-kicker { margin: 1.15rem 0 0; color: var(--bi-primary); font-size: .65rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
.bi-feature-card h3 { margin: .4rem 0 0; font: 700 1.15rem/1.3 var(--bi-font-heading); letter-spacing: -.02em; }
.bi-feature-copy { margin: .7rem 0 0; color: var(--bi-muted-fg); font-size: .9rem; line-height: 1.65; }
.bi-feature-link { display: inline-flex; align-items: center; gap: .35rem; margin-top: auto; padding-top: 1.25rem; color: var(--bi-fg); font-size: .9rem; font-weight: 700; text-decoration: none; }
.bi-feature-link:hover { color: var(--bi-primary); }`,
  };
}
