import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString, sanitizeUrl } from "@/lib/registry/shared";
import { listBoolean, listValue, nodeList, stringList, uniqueId } from "../_shared/content";

interface Plan { id: string; name: string; price: string; period: string; description: string; features: string[]; buttonText: string; buttonUrl: string; highlighted: boolean; }

const FALLBACK: Plan[] = [
  { id: "start", name: "Mulai", price: "Rp1,2jt", period: "/bulan", description: "Untuk bisnis kecil yang ingin hadir dengan rapi.", features: ["1 halaman utama", "Form kontak", "Dukungan email"], buttonText: "Pilih Mulai", buttonUrl: "#kontak", highlighted: false },
  { id: "grow", name: "Bertumbuh", price: "Rp3,5jt", period: "/bulan", description: "Pilihan paling seimbang untuk tim yang aktif.", features: ["Hingga 8 halaman", "SEO dasar", "Analitik ringkas", "Dukungan prioritas"], buttonText: "Pilih Bertumbuh", buttonUrl: "#kontak", highlighted: true },
  { id: "custom", name: "Kustom", price: "Mari bicara", period: "", description: "Untuk kebutuhan yang perlu dirancang lebih khusus.", features: ["Arsitektur konten", "Komponen khusus", "Sesi strategi", "Pendampingan tim"], buttonText: "Hubungi kami", buttonUrl: "#kontak", highlighted: false },
];

function plans(node: Node): Plan[] {
  const items = nodeList(node, "plans").map((item, index) => {
    const name = listValue(item, "name");
    if (!name) return null;
    return { id: uniqueId("plan", index, name), name, price: listValue(item, "price"), period: listValue(item, "period"), description: listValue(item, "description"), features: stringList(item.features), buttonText: listValue(item, "buttonText"), buttonUrl: listValue(item, "buttonUrl", "#"), highlighted: listBoolean(item, "highlighted") };
  }).filter((item): item is Plan => item !== null);
  return items.length ? items : FALLBACK;
}

export function pricingTableExport(node: Node): ExportResult {
  const eyebrow = propString(node, "eyebrow").trim() || "Pilihan yang fleksibel";
  const title = propString(node, "title").trim() || "Pilih langkah yang sesuai ritme bisnis Anda.";
  const description = propString(node, "description").trim() || "Mulai dari fondasi yang jelas, lalu bertumbuh saat kebutuhan Anda berubah.";
  const cards = plans(node).map((plan) => `<article class="bi-price-card${plan.highlighted ? " is-featured" : ""}">
    ${plan.highlighted ? '<span class="bi-price-badge">Paling dipilih</span>' : ""}
    <h3>${escapeHtml(plan.name)}</h3>
    <p class="bi-price-value">${escapeHtml(plan.price)}<small>${escapeHtml(plan.period)}</small></p>
    <p class="bi-price-copy">${escapeHtml(plan.description)}</p>
    <ul>${plan.features.map((feature) => `<li><span aria-hidden="true">✓</span>${escapeHtml(feature)}</li>`).join("")}</ul>
    <a href="${escapeHtml(sanitizeUrl(plan.buttonUrl))}" class="bi-price-button">${escapeHtml(plan.buttonText || "Pilih paket")} <span aria-hidden="true">↗</span></a>
  </article>`).join("\n");

  return { html: `<section class="bi-pricing"><div class="bi-container"><header class="bi-pricing-head"><p>${escapeHtml(eyebrow)}</p><h2 class="bi-title">${escapeHtml(title)}</h2><span>${escapeHtml(description)}</span></header><div class="bi-pricing-grid">${cards}</div></div></section>`, css: `.bi-pricing { padding-block: clamp(3.5rem, 8vw, 6.5rem); background: var(--bi-bg); color: var(--bi-fg); }
.bi-pricing-head { max-width: 42rem; margin: 0 auto; text-align: center; }.bi-pricing-head > p { margin: 0; color: var(--bi-primary); font-size: .68rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }.bi-pricing-head h2 { margin: .75rem 0 0; }.bi-pricing-head > span { display: block; margin-top: 1rem; color: var(--bi-muted-fg); font-size: .95rem; line-height: 1.7; }
.bi-pricing-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch; gap: 1rem; margin-top: 2.5rem; }.bi-price-card { position: relative; display: flex; min-width: 0; flex-direction: column; padding: 1.4rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-card); box-shadow: 0 1px 2px rgba(0,0,0,.04); }.bi-price-card.is-featured { border-color: var(--bi-primary); background: var(--bi-primary); color: var(--bi-primary-fg); box-shadow: var(--bi-shadow); }.bi-price-badge { position: absolute; top: -0.8rem; left: 50%; padding: .35rem .7rem; border-radius: 999px; transform: translateX(-50%); background: var(--bi-bg); color: var(--bi-fg); box-shadow: 0 2px 8px rgba(0,0,0,.12); font-size: .62rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; white-space: nowrap; }.bi-price-card h3 { margin: 0; font-size: 1rem; }.bi-price-value { margin: 1rem 0 0; font: 800 clamp(1.8rem,3vw,2.3rem)/1 var(--bi-font-heading); letter-spacing: -.04em; }.bi-price-value small { margin-left: .25rem; font: 500 .75rem/1 var(--bi-font-body); letter-spacing: normal; opacity: .7; }.bi-price-copy { min-height: 3.2rem; margin: 1rem 0 0; color: var(--bi-muted-fg); font-size: .88rem; line-height: 1.6; }.is-featured .bi-price-copy { color: color-mix(in srgb, var(--bi-primary-fg) 80%, transparent); }.bi-price-card ul { display: grid; gap: .75rem; margin: 1.5rem 0 0; padding: 0; list-style: none; font-size: .88rem; }.bi-price-card li { display: flex; gap: .5rem; align-items: flex-start; }.bi-price-card li span { color: var(--bi-primary); font-weight: 800; }.is-featured li span { color: var(--bi-primary-fg); }.bi-price-button { display: inline-flex; min-height: 2.75rem; align-items: center; justify-content: center; gap: .5rem; margin-top: 1.75rem; padding: 0 .9rem; border-radius: calc(var(--bi-radius) * .8); background: var(--bi-fg); color: var(--bi-bg); font-size: .88rem; font-weight: 800; text-decoration: none; transition: transform .2s ease; }.bi-price-button:hover { transform: translateY(-2px); }.is-featured .bi-price-button { background: var(--bi-bg); color: var(--bi-fg); } @media (max-width: 760px) { .bi-pricing-grid { grid-template-columns: 1fr; } }` };
}
