import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

interface Step {
  id: string;
  title: string;
  description: string;
}

function parseSteps(node: Node): Step[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "stepsJson"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `step-${index + 1}`),
        title: String(item.title ?? "").trim(),
        description: String(item.description ?? "").trim(),
      }))
      .filter((item) => item.title.length > 0);
  } catch {
    return [];
  }
}

export function processStepsExport(node: Node): ExportResult {
  const eyebrow = propString(node, "eyebrow").trim() || "Cara kerja";
  const heading =
    propString(node, "heading").trim() || "Mulai dari tiga langkah sederhana";
  const steps = parseSteps(node);

  const stepsHtml = steps.length
    ? steps
        .map(
          (step, index) => `<li class="bi-ps-step">
    <span class="bi-ps-num" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
    <h3>${escapeHtml(step.title)}</h3>
    ${step.description ? `<p>${escapeHtml(step.description)}</p>` : ""}
  </li>`
        )
        .join("\n  ")
    : "";

  return {
    html: `<section class="bi-ps">
  <div class="bi-ps-inner">
    <p class="bi-ps-eyebrow">${escapeHtml(eyebrow)}</p>
    <h2 class="bi-ps-title">${escapeHtml(heading)}</h2>
    <ol class="bi-ps-grid">
  ${stepsHtml}
    </ol>
  </div>
</section>`,
    css: `.bi-ps{padding:3.5rem max(1.25rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-ps-inner{max-width:56rem;margin-inline:auto}.bi-ps-eyebrow{margin:0;text-align:center;color:var(--bi-muted-fg);font-size:.625rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.bi-ps-title{margin:.5rem auto 0;max-width:32rem;text-align:center;font:800 clamp(1.5rem,3.5vw,2rem)/1.15 var(--bi-font-heading);letter-spacing:-.05em}.bi-ps-grid{position:relative;display:grid;grid-template-columns:1fr;gap:2.5rem 2rem;margin:3rem 0 0;padding:0;list-style:none}.bi-ps-grid::before{content:"";position:absolute;top:1.75rem;left:16.6667%;right:16.6667%;display:none;border-top:2px dashed var(--bi-border)}.bi-ps-step{position:relative;text-align:center}.bi-ps-num{display:inline-grid;width:3.5rem;height:3.5rem;place-items:center;border:1px solid var(--bi-border);border-radius:999px;background:var(--bi-card);color:var(--bi-primary);font:800 1.25rem/1 var(--bi-font-heading);box-shadow:0 2px 8px color-mix(in srgb,var(--bi-fg) 5%,transparent)}.bi-ps-step h3{margin:1rem 0 0;font:700 1rem/1.3 var(--bi-font-heading);letter-spacing:-.02em}.bi-ps-step p{margin:.5rem auto 0;max-width:16rem;color:var(--bi-muted-fg);font-size:.875rem;line-height:1.6}@media (min-width:640px){.bi-ps{padding-block:4rem}}@media (min-width:768px){.bi-ps-grid{grid-template-columns:repeat(3,1fr)}.bi-ps-grid::before{display:block}}`,
  };
}
