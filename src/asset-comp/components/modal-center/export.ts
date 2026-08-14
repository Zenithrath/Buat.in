import type { ExportContext, ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { componentMap } from "@/lib/registry";
import { escapeHtml, propString } from "@/lib/registry/shared";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

function renderChildren(node: Node, ctx: ExportContext) {
  const css = new Set<string>();
  const js = new Set<string>();
  const html = (node.children ?? [])
    .map((child) => {
      const component = componentMap[child.componentType];
      if (!component) return "";
      const result = component.exportAdapter(child, ctx);
      if (result.css) css.add(result.css);
      if (result.js) js.add(result.js);
      return result.html;
    })
    .filter(Boolean)
    .join("\n");
  return { html, css: [...css], js: [...js] };
}

export function modalCenterExport(node: Node, ctx: ExportContext): ExportResult {
  const eyebrow = copy(node, "eyebrow", "Dialog interaktif");
  const heading = copy(node, "heading", "Semua detail penting tetap dekat tanpa memindahkan pengunjung dari halaman ini.");
  const triggerText = copy(node, "triggerText", "Lihat detail layanan");
  const dialogEyebrow = copy(node, "dialogEyebrow", "Informasi tambahan");
  const title = copy(node, "title", "Mari bicarakan kebutuhan Anda.");
  const description = copy(node, "description", "Tambahkan formulir, kartu, atau informasi lain ke dalam dialog ini dari kanvas.");
  const emptyMessage = copy(node, "emptyMessage", "Tambahkan komponen ke dalam dialog ini untuk menampilkan formulir, penawaran, atau langkah berikutnya.");
  const closeText = copy(node, "closeText", "Tutup dialog");
  const instance = `modal-center-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;
  const child = renderChildren(node, ctx);

  return {
    html: `<section class="bi-modal-center-showcase">
  <div>
    <p>${escapeHtml(eyebrow)}</p>
    <h3>${escapeHtml(heading)}</h3>
    <button type="button" data-bi-modal-open="${instance}" aria-controls="${instance}" aria-expanded="false">${escapeHtml(triggerText)} <span aria-hidden="true">↗</span></button>
  </div>
  <div class="bi-modal-center-overlay" data-bi-modal="${instance}" data-open="false" aria-hidden="true">
    <section class="bi-modal-center-dialog" id="${instance}" role="dialog" aria-modal="true" aria-labelledby="${instance}-title">
      <div class="bi-modal-center-heading"><div><p>${escapeHtml(dialogEyebrow)}</p><h2 id="${instance}-title">${escapeHtml(title)}</h2></div><button type="button" data-bi-modal-close aria-label="${escapeHtml(closeText)}">×</button></div>
      <p class="bi-modal-center-description">${escapeHtml(description)}</p>
      ${child.html ? `<div class="bi-modal-center-children">${child.html}</div>` : `<div class="bi-modal-center-empty">${escapeHtml(emptyMessage)}</div>`}
      <div class="bi-modal-center-footer"><button type="button" data-bi-modal-close>${escapeHtml(closeText)}</button></div>
    </section>
  </div>
</section>`,
    css: `.bi-modal-center-showcase{position:relative;display:flex;min-height:16rem;align-items:center;overflow:hidden;padding:2.5rem max(1.5rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:color-mix(in srgb,var(--bi-secondary) 30%,var(--bi-bg));color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-modal-center-showcase>div:first-child{max-width:34rem}.bi-modal-center-showcase>div:first-child>p,.bi-modal-center-heading p{margin:0;color:var(--bi-primary);font-size:.65rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.bi-modal-center-showcase h3{margin:.6rem 0 0;font:800 clamp(1.5rem,3vw,2.2rem)/1.1 var(--bi-font-heading);letter-spacing:-.055em}.bi-modal-center-showcase>div:first-child>button{display:inline-flex;min-height:2.75rem;align-items:center;gap:.5rem;margin-top:1.4rem;padding:.65rem 1rem;border:0;border-radius:999px;background:var(--bi-primary);color:var(--bi-primary-fg);font:700 .9rem var(--bi-font-body);box-shadow:0 4px 12px color-mix(in srgb,var(--bi-primary) 18%,transparent);cursor:pointer;transition:transform .2s ease}.bi-modal-center-showcase>div:first-child>button:hover{transform:translateY(-2px)}.bi-modal-center-overlay{position:fixed;z-index:90;inset:0;display:flex;align-items:center;justify-content:center;padding:1rem;background:color-mix(in srgb,var(--bi-fg) 45%,transparent);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .2s ease}.bi-modal-center-overlay[data-open="true"]{opacity:1;pointer-events:auto}.bi-modal-center-dialog{width:min(34rem,100%);max-height:calc(100vh - 2rem);overflow:auto;padding:1.25rem;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * 1.15);background:var(--bi-card);color:var(--bi-fg);box-shadow:0 24px 60px color-mix(in srgb,var(--bi-fg) 30%,transparent);transform:translateY(.75rem) scale(.985);transition:transform .2s ease}.bi-modal-center-overlay[data-open="true"] .bi-modal-center-dialog{transform:translateY(0) scale(1)}.bi-modal-center-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.bi-modal-center-heading>div{min-width:0}.bi-modal-center-heading h2{margin:.55rem 0 0;font:800 1.55rem/1.12 var(--bi-font-heading);letter-spacing:-.05em}.bi-modal-center-heading>button{display:grid;width:2.25rem;height:2.25rem;flex:none;place-items:center;border:1px solid var(--bi-border);border-radius:50%;background:transparent;color:var(--bi-muted-fg);font-size:1.2rem;cursor:pointer}.bi-modal-center-heading>button:hover{background:var(--bi-muted);color:var(--bi-fg)}.bi-modal-center-description{margin:1rem 0 0;color:var(--bi-muted-fg);font-size:.9rem;line-height:1.7}.bi-modal-center-children{display:grid;gap:1rem;margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--bi-border)}.bi-modal-center-empty{margin-top:1.5rem;padding:1rem;border:1px dashed var(--bi-border);border-radius:calc(var(--bi-radius) * .8);background:color-mix(in srgb,var(--bi-muted) 45%,transparent);color:var(--bi-muted-fg);font-size:.85rem;line-height:1.6}.bi-modal-center-footer{display:flex;justify-content:flex-end;margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--bi-border)}.bi-modal-center-footer button{padding:.65rem 1rem;border:0;border-radius:calc(var(--bi-radius) * .75);background:var(--bi-fg);color:var(--bi-bg);font:700 .85rem var(--bi-font-body);cursor:pointer}@media(max-width:560px){.bi-modal-center-dialog{padding:1rem}.bi-modal-center-heading h2{font-size:1.3rem}}\n${child.css.join("\n")}`,
    js: `${child.js.join("\n")}\n(function(){var overlay=document.querySelector('[data-bi-modal="${instance}"]');var trigger=document.querySelector('[data-bi-modal-open="${instance}"]');if(!overlay||!trigger)return;function setOpen(open){overlay.dataset.open=String(open);overlay.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));}trigger.addEventListener('click',function(){setOpen(true);});overlay.querySelectorAll('[data-bi-modal-close]').forEach(function(button){button.addEventListener('click',function(){setOpen(false);});});overlay.addEventListener('click',function(event){if(event.target===overlay)setOpen(false);});document.addEventListener('keydown',function(event){if(event.key==='Escape')setOpen(false);});}());`,
  };
}
