import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function booleanProp(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return !["false", "0", "off", "no"].includes(value.trim().toLowerCase());
  return fallback;
}

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function parseTestimonials(node: Node): { id: string; quote: string; author: string; role: string }[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "testimonialsJson"));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index) => ({
        id: String(item.id ?? `testimonial-${index + 1}`),
        quote: String(item.quote ?? "").trim(),
        author: String(item.author ?? "Pelanggan").trim(),
        role: String(item.role ?? "").trim(),
      }))
      .filter((item) => item.quote.length > 0);
  } catch {
    return [];
  }
}

export function sliderTestimonialExport(node: Node): ExportResult {
  const heading = propString(node, "heading").trim() || "Kata mereka yang sudah memakai";
  const autoplay = booleanProp(node, "autoplay", true);
  const interval = Math.max(2, Math.round(propNumber(node, "interval", 5)));
  const showArrows = booleanProp(node, "showArrows", true);
  const showDots = booleanProp(node, "showDots", true);
  const testimonials = parseTestimonials(node);
  const instance = `bi-testi-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;

  const slidesHtml = testimonials
    .map(
      (item) => `<figure class="bi-testi-slide">
  <svg class="bi-testi-quote" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M9.6 5C6 7 4 10 4 14.2c0 3 2 5 4.6 5 2.3 0 4-1.7 4-3.9 0-2-1.5-3.5-3.5-3.5-.4 0-1 0-1.2.1.3-1.8 1.6-3.6 3.2-4.6L9.6 5Zm10 0C16 7 14 10 14 14.2c0 3 2 5 4.6 5 2.3 0 4-1.7 4-3.9 0-2-1.5-3.5-3.5-3.5-.4 0-1 0-1.2.1.3-1.8 1.6-3.6 3.2-4.6L19.6 5Z"/></svg>
  <blockquote>${escapeHtml(item.quote)}</blockquote>
  <figcaption><strong>${escapeHtml(item.author)}</strong>${item.role ? `<span>${escapeHtml(item.role)}</span>` : ""}</figcaption>
</figure>`
    )
    .join("\n  ");

  const dotsHtml = showDots
    ? `<div class="bi-testi-dots" role="tablist" aria-label="Pilih testimoni">
    ${testimonials.map((item, dotIndex) => `<button type="button" role="tab" aria-selected="${dotIndex === 0}" aria-label="Testimoni ${dotIndex + 1}" data-bi-testi-dot="${dotIndex}"></button>`).join("\n    ")}
  </div>`
    : "";

  const arrowsHtml = showArrows
    ? `<button class="bi-testi-arrow prev" type="button" data-bi-testi-prev aria-label="Testimoni sebelumnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m15 18-6-6 6-6"/></svg></button>
  <button class="bi-testi-arrow next" type="button" data-bi-testi-next aria-label="Testimoni berikutnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6"/></svg></button>`
    : "";

  return {
    html: `<section class="bi-testi" id="${instance}">
  <h2>${escapeHtml(heading)}</h2>
  <div class="bi-testi-viewport" role="region" aria-roledescription="carousel" aria-label="Testimoni pelanggan">
    <div class="bi-testi-track" data-bi-testi-track>
      ${slidesHtml}
    </div>
    ${arrowsHtml}
  </div>
  ${dotsHtml}
</section>`,
    css: `.bi-testi{padding:3.5rem max(1.25rem,calc((100% - 72rem)/2));overflow:hidden;border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-testi>h2{margin:0;text-align:center;font:800 clamp(1.25rem,3vw,1.75rem)/1.15 var(--bi-font-heading);letter-spacing:-.05em}.bi-testi-viewport{position:relative;max-width:48rem;margin:2.5rem auto 0}.bi-testi-track{display:flex;overflow:hidden;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * 1.6);background:var(--bi-card);box-shadow:0 10px 30px color-mix(in srgb,var(--bi-fg) 6%,transparent);transition:transform .5s cubic-bezier(.3,.7,.3,1)}.bi-testi-slide{width:100%;flex:0 0 100%;box-sizing:border-box;padding:2rem 1.5rem;text-align:center}.bi-testi-quote{width:1.75rem;height:1.75rem;margin:0 auto;color:color-mix(in srgb,var(--bi-primary) 60%,transparent)}.bi-testi-slide blockquote{margin:1rem auto 0;max-width:34rem;font-size:clamp(.95rem,1.5vw,1.05rem);font-weight:500;line-height:1.75}.bi-testi-slide figcaption{margin-top:1.5rem}.bi-testi-slide figcaption strong{display:block;font-size:.875rem;font-weight:800}.bi-testi-slide figcaption span{display:block;margin-top:.15rem;color:var(--bi-muted-fg);font-size:.75rem}.bi-testi-arrow{position:absolute;top:50%;z-index:2;display:grid;width:2.5rem;height:2.5rem;place-items:center;border:1px solid var(--bi-border);border-radius:999px;background:var(--bi-card);color:var(--bi-fg);cursor:pointer;box-shadow:0 6px 16px color-mix(in srgb,var(--bi-fg) 12%,transparent);transform:translateY(-50%);transition:background .15s ease}.bi-testi-arrow:hover{background:var(--bi-muted)}.bi-testi-arrow svg{width:1.1rem;height:1.1rem}.bi-testi-arrow.prev{left:-1rem}.bi-testi-arrow.next{right:-1rem}.bi-testi-dots{display:flex;justify-content:center;gap:.5rem;margin-top:1.75rem}.bi-testi-dots button{width:.5rem;height:.5rem;border:0;border-radius:999px;background:color-mix(in srgb,var(--bi-muted-fg) 35%,transparent);cursor:pointer;transition:width .2s ease,background .2s ease}.bi-testi-dots button[aria-selected="true"]{width:1.5rem;background:var(--bi-primary)}@media (max-width:640px){.bi-testi-arrow.prev{left:0}.bi-testi-arrow.next{right:0}.bi-testi-arrow{width:2.25rem;height:2.25rem}}@media (prefers-reduced-motion:reduce){.bi-testi-track{transition:none}}`,
    js: `(function(){var root=document.getElementById('${instance}');if(!root)return;var track=root.querySelector('[data-bi-testi-track]');var slides=track.querySelectorAll('.bi-testi-slide');var count=slides.length;if(count<2){return;}var index=0;var timer=null;var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;var autoplay=${autoplay ? "true" : "false"};var interval=${interval}*1000;function render(){track.style.transform='translateX(-'+(index*100)+'%)';root.querySelectorAll('[data-bi-testi-dot]').forEach(function(dot,i){dot.setAttribute('aria-selected',String(i===index));});}function go(next){index=(next+count)%count;render();restart();}function restart(){if(!autoplay||reduced)return;clearTimeout(timer);timer=setTimeout(function(){go(index+1);},interval);}var prev=root.querySelector('[data-bi-testi-prev]');var next=root.querySelector('[data-bi-testi-next]');if(prev)prev.addEventListener('click',function(){go(index-1);});if(next)next.addEventListener('click',function(){go(index+1);});root.querySelectorAll('[data-bi-testi-dot]').forEach(function(dot){dot.addEventListener('click',function(){go(parseInt(dot.dataset.biTestiDot,10));});});root.addEventListener('pointerenter',function(){clearTimeout(timer);});root.addEventListener('pointerleave',function(){restart();});render();restart();}());`,
  };
}
