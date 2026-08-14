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

const statValue = (node: Node, index: number, fallback: string) =>
  firstProp(node, `stat${index}Number`, `stat${index}Value`) || fallback;

function anchorId(value: string, fallback: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || fallback;
}

export function aboutExport(node: Node): ExportResult {
  const eyebrow = firstProp(node, "eyebrow") || "Tentang kami";
  const title = firstProp(node, "title") || "Strategi yang berpijak pada manusia, bukan tren sesaat.";
  const description =
    firstProp(node, "description", "content") ||
    "Kami membantu bisnis menerjemahkan cerita dan ambisinya menjadi identitas yang utuh dan mudah dipahami.";
  const imageUrl = firstProp(node, "imageUrl", "image");
  const imageAlt = firstProp(node, "imageAlt") || "Tim berdiskusi di studio";
  const imageNoteLabel = firstProp(node, "imageNoteLabel") || "Cara kami bekerja";
  const imageNoteText =
    firstProp(node, "imageNoteText") || "Mendengar dengan saksama sebelum membuat apa pun.";
  const sectionId = anchorId(firstProp(node, "sectionId"), "tentang");
  const stats = [
    { value: statValue(node, 1, "8+"), label: firstProp(node, "stat1Label") || "tahun berkarya" },
    { value: statValue(node, 2, "74"), label: firstProp(node, "stat2Label") || "proyek selesai" },
    { value: statValue(node, 3, "18"), label: firstProp(node, "stat3Label") || "mitra aktif" },
  ];

  const media = imageUrl
    ? `<img src="${escapeHtml(sanitizeUrl(imageUrl))}" alt="${escapeHtml(imageAlt)}" />`
    : `<div class="bi-about-art" aria-hidden="true"><div><span>${escapeHtml(imageNoteLabel)}</span><strong>${escapeHtml(imageNoteText)}</strong></div></div>`;

  const statsHtml = stats
    .map(
      (stat) => `<div class="bi-about-stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`
    )
    .join("");

  const html = `
<section id="${escapeHtml(sectionId)}" class="bi-about-company">
  <div class="bi-container bi-about-layout">
    <figure class="bi-about-media">
      ${media}
      <span class="bi-about-arrow" aria-hidden="true">↗</span>
    </figure>
    <div class="bi-about-copy">
      <p class="bi-eyebrow">${escapeHtml(eyebrow)}</p>
      <h2 class="bi-title bi-about-title">${escapeHtml(title)}</h2>
      <p class="bi-about-description">${escapeHtml(description)}</p>
      <div class="bi-about-stats">${statsHtml}</div>
    </div>
  </div>
</section>`;

  const css = `
.bi-about-company { padding-block: clamp(3.5rem, 8vw, 6.5rem); border-block: 1px solid var(--bi-border); background: var(--bi-bg); }
.bi-about-layout { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(2rem, 6vw, 5rem); text-align: left; }
.bi-about-media { position: relative; min-width: min(100%, 15rem); flex: 1 1 22rem; min-height: 19rem; margin: 0; overflow: hidden; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-card); box-shadow: var(--bi-shadow); }
.bi-about-media img { width: 100%; min-height: 19rem; height: 100%; object-fit: cover; }
.bi-about-copy { min-width: min(100%, 17rem); flex: 1 1 25rem; }
.bi-about-title { max-width: 40rem; font-size: clamp(2rem, 4vw, 3.25rem); }
.bi-about-description { max-width: 40rem; margin: 1.25rem 0 0; color: var(--bi-muted-fg); font-size: 1rem; line-height: 1.75; }
.bi-about-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(7.2rem, 1fr)); gap: 1px; margin-top: 2rem; overflow: hidden; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-border); }
.bi-about-stat { min-width: 0; padding: 1.15rem; background: var(--bi-card); }
.bi-about-stat strong { display: block; color: var(--bi-fg); font-family: var(--bi-font-mono); font-size: 1.6rem; letter-spacing: -0.06em; }
.bi-about-stat span { display: block; margin-top: 0.3rem; color: var(--bi-muted-fg); font-size: 0.72rem; line-height: 1.45; }
.bi-about-arrow { position: absolute; top: 1.25rem; right: 1.25rem; display: grid; width: 2.5rem; height: 2.5rem; place-items: center; border-radius: 999px; background: color-mix(in srgb, var(--bi-bg) 88%, transparent); color: var(--bi-primary); box-shadow: var(--bi-shadow); }
.bi-about-art { display: flex; min-height: 19rem; align-items: flex-end; padding: 1.25rem; background: linear-gradient(145deg, var(--bi-secondary), var(--bi-muted)); }
.bi-about-art > div { max-width: 15rem; padding: 1.25rem; border: 1px solid var(--bi-border); border-radius: var(--bi-radius); background: var(--bi-bg); box-shadow: var(--bi-shadow); }
.bi-about-art span { display: block; color: var(--bi-primary); font-size: 0.62rem; font-weight: 700; letter-spacing: 0.14em; }
.bi-about-art strong { display: block; margin-top: 0.6rem; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.25rem; line-height: 1.25; }
@media (max-width: 560px) { .bi-about-media { flex-basis: 100%; } .bi-about-stat { padding: 1rem; } }
`;

  return { html, css };
}
