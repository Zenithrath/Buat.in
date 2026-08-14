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

export function modalSheetExport(node: Node, ctx: ExportContext): ExportResult {
  const eyebrow = copy(node, "eyebrow", "Aksi cepat");
  const heading = copy(node, "heading", "Ringkas untuk ponsel, tetap leluasa saat dibuka dari desktop.");
  const triggerText = copy(node, "triggerText", "Buka panel cepat");
  const panelEyebrow = copy(node, "panelEyebrow", "Panel cepat");
  const title = copy(node, "title", "Pilih langkah berikutnya.");
  const description = copy(
    node,
    "description",
    "Buat penawaran, ringkasan, atau formulir tetap mudah dijangkau tanpa meninggalkan halaman."
  );
  const emptyMessage = copy(
    node,
    "emptyMessage",
    "Tambahkan komponen ke dalam panel ini untuk membuat aksi lanjutan terasa lebih mudah."
  );
  const closeText = copy(node, "closeText", "Selesai");
  const instance = `modal-sheet-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;
  const child = renderChildren(node, ctx);

  return {
    html: `<section class="bi-modal-sheet-showcase">
  <div>
    <p>${escapeHtml(eyebrow)}</p>
    <h3>${escapeHtml(heading)}</h3>
    <button type="button" data-bi-sheet-open="${instance}" aria-controls="${instance}" aria-expanded="false">${escapeHtml(triggerText)} <span aria-hidden="true">&#8599;</span></button>
  </div>
  <div class="bi-modal-sheet-overlay" data-bi-sheet="${instance}" data-open="false" aria-hidden="true">
    <section class="bi-modal-sheet-panel" id="${instance}" role="dialog" aria-modal="true" aria-labelledby="${instance}-title">
      <i class="bi-modal-sheet-handle" aria-hidden="true"></i>
      <div class="bi-modal-sheet-heading"><div><p>${escapeHtml(panelEyebrow)}</p><h2 id="${instance}-title">${escapeHtml(title)}</h2></div><button type="button" data-bi-sheet-close aria-label="${escapeHtml(closeText)}">&times;</button></div>
      <p class="bi-modal-sheet-description">${escapeHtml(description)}</p>
      ${child.html ? `<div class="bi-modal-sheet-children">${child.html}</div>` : `<div class="bi-modal-sheet-empty">${escapeHtml(emptyMessage)}</div>`}
      <div class="bi-modal-sheet-footer"><button type="button" data-bi-sheet-close>${escapeHtml(closeText)}</button></div>
    </section>
  </div>
</section>`,
    css: `.bi-modal-sheet-showcase{position:relative;display:flex;min-height:16rem;align-items:center;overflow:hidden;padding:2.5rem max(1.5rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:var(--bi-bg);color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-modal-sheet-showcase>div:first-child{max-width:34rem}.bi-modal-sheet-showcase>div:first-child>p,.bi-modal-sheet-heading p{margin:0;color:var(--bi-primary);font-size:.65rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.bi-modal-sheet-showcase h3{margin:.6rem 0 0;font:800 clamp(1.5rem,3vw,2.2rem)/1.1 var(--bi-font-heading);letter-spacing:-.055em}.bi-modal-sheet-showcase>div:first-child>button{display:inline-flex;min-height:2.75rem;align-items:center;gap:.5rem;margin-top:1.4rem;padding:.65rem 1rem;border:1px solid var(--bi-border);border-radius:999px;background:var(--bi-card);color:var(--bi-fg);font:700 .9rem var(--bi-font-body);box-shadow:0 2px 8px color-mix(in srgb,var(--bi-fg) 8%,transparent);cursor:pointer;transition:transform .2s ease,border-color .2s ease,color .2s ease}.bi-modal-sheet-showcase>div:first-child>button:hover{border-color:var(--bi-primary);color:var(--bi-primary);transform:translateY(-2px)}.bi-modal-sheet-overlay{position:fixed;z-index:90;inset:0;background:color-mix(in srgb,var(--bi-fg) 45%,transparent);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .2s ease}.bi-modal-sheet-overlay[data-open="true"]{opacity:1;pointer-events:auto}.bi-modal-sheet-panel{position:absolute;right:0;top:0;bottom:0;display:flex;width:min(28rem,92vw);flex-direction:column;overflow:auto;padding:1.5rem;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * 1.15) 0 0 calc(var(--bi-radius) * 1.15);background:var(--bi-card);color:var(--bi-fg);box-shadow:-20px 0 60px color-mix(in srgb,var(--bi-fg) 25%,transparent);transform:translateX(100%);transition:transform .28s cubic-bezier(.2,.8,.2,1)}.bi-modal-sheet-overlay[data-open="true"] .bi-modal-sheet-panel{transform:translateX(0)}.bi-modal-sheet-handle{display:none}.bi-modal-sheet-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.bi-modal-sheet-heading>div{min-width:0}.bi-modal-sheet-heading h2{margin:.55rem 0 0;font:800 1.55rem/1.12 var(--bi-font-heading);letter-spacing:-.05em}.bi-modal-sheet-heading>button{display:grid;width:2.25rem;height:2.25rem;flex:none;place-items:center;border:1px solid var(--bi-border);border-radius:50%;background:transparent;color:var(--bi-muted-fg);font-size:1.2rem;cursor:pointer}.bi-modal-sheet-heading>button:hover{background:var(--bi-muted);color:var(--bi-fg)}.bi-modal-sheet-description{margin:1rem 0 0;color:var(--bi-muted-fg);font-size:.9rem;line-height:1.7}.bi-modal-sheet-children{display:grid;gap:1rem;margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--bi-border)}.bi-modal-sheet-empty{margin-top:1.5rem;padding:1rem;border:1px dashed var(--bi-border);border-radius:calc(var(--bi-radius) * .8);background:color-mix(in srgb,var(--bi-muted) 45%,transparent);color:var(--bi-muted-fg);font-size:.85rem;line-height:1.6}.bi-modal-sheet-footer{display:flex;justify-content:flex-end;margin-top:auto;padding-top:1.5rem;border-top:1px solid var(--bi-border)}.bi-modal-sheet-footer button{padding:.65rem 1rem;border:0;border-radius:calc(var(--bi-radius) * .75);background:var(--bi-primary);color:var(--bi-primary-fg);font:700 .85rem var(--bi-font-body);cursor:pointer}@media(max-width:700px){.bi-modal-sheet-panel{top:auto;left:0;right:0;bottom:0;width:auto;max-height:85vh;border-radius:calc(var(--bi-radius) * 1.15) calc(var(--bi-radius) * 1.15) 0 0;box-shadow:0 -20px 60px color-mix(in srgb,var(--bi-fg) 25%,transparent);transform:translateY(100%)}.bi-modal-sheet-overlay[data-open="true"] .bi-modal-sheet-panel{transform:translateY(0)}.bi-modal-sheet-handle{display:block;width:2.75rem;height:.3rem;flex:none;margin:0 auto .75rem;border-radius:999px;background:var(--bi-border)}}\n${child.css.join("\n")}`,
    js: `${child.js.join("\n")}\n(function(){var overlay=document.querySelector('[data-bi-sheet="${instance}"]');var trigger=document.querySelector('[data-bi-sheet-open="${instance}"]');if(!overlay||!trigger)return;function setOpen(open){overlay.dataset.open=String(open);overlay.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));}trigger.addEventListener('click',function(){setOpen(true);});overlay.querySelectorAll('[data-bi-sheet-close]').forEach(function(button){button.addEventListener('click',function(){setOpen(false);});});overlay.addEventListener('click',function(event){if(event.target===overlay)setOpen(false);});document.addEventListener('keydown',function(event){if(event.key==='Escape')setOpen(false);});}());`,
  };
}
