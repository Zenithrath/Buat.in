import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function copy(node: Node, key: string, fallback: string) {
  return propString(node, key).trim() || fallback;
}

function iconMarkup(icon: string) {
  if (icon === "trash") return "&#128465;";
  if (icon === "archive") return "&#9635;";
  if (icon === "logout") return "&#8618;";
  return "!";
}

export function modalConfirmExport(node: Node): ExportResult {
  const eyebrow = copy(node, "eyebrow", "Aksi yang jelas");
  const heading = copy(node, "heading", "Beri ruang untuk memastikan pilihan sebelum tindakan dijalankan.");
  const triggerText = copy(node, "triggerText", "Tampilkan konfirmasi");
  const title = copy(node, "title", "Lanjutkan perubahan ini?");
  const description = copy(
    node,
    "description",
    "Pastikan semua detail sudah sesuai sebelum melanjutkan ke langkah berikutnya."
  );
  const confirmText = copy(node, "confirmText", "Ya, lanjutkan");
  const cancelText = copy(node, "cancelText", "Periksa lagi");
  const statusMessage = copy(node, "statusMessage", "Pilihan Anda berhasil dikonfirmasi.");
  const icon = iconMarkup(propString(node, "icon").trim());
  const instance = `modal-confirm-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;

  return {
    html: `<section class="bi-modal-confirm-showcase" data-bi-confirm-showcase="${instance}">
  <div>
    <p>${escapeHtml(eyebrow)}</p>
    <h3>${escapeHtml(heading)}</h3>
    <button type="button" data-bi-confirm-open="${instance}" aria-controls="${instance}" aria-expanded="false">${escapeHtml(triggerText)}</button>
    <p class="bi-modal-confirm-status" data-bi-confirm-status="${instance}" hidden aria-live="polite">&#10003; ${escapeHtml(statusMessage)}</p>
  </div>
  <div class="bi-modal-confirm-overlay" data-bi-confirm="${instance}" data-open="false" aria-hidden="true">
    <section class="bi-modal-confirm-dialog" id="${instance}" role="alertdialog" aria-modal="true" aria-labelledby="${instance}-title" aria-describedby="${instance}-description">
      <div class="bi-modal-confirm-top"><span aria-hidden="true">${icon}</span><button type="button" data-bi-confirm-close aria-label="${escapeHtml(cancelText)}">&times;</button></div>
      <h2 id="${instance}-title">${escapeHtml(title)}</h2>
      <p id="${instance}-description">${escapeHtml(description)}</p>
      <div class="bi-modal-confirm-actions"><button type="button" data-bi-confirm-close>${escapeHtml(cancelText)}</button><button type="button" data-bi-confirm-accept>${escapeHtml(confirmText)}</button></div>
    </section>
  </div>
</section>`,
    css: `.bi-modal-confirm-showcase{position:relative;display:flex;min-height:16rem;align-items:center;overflow:hidden;padding:2.5rem max(1.5rem,calc((100% - 72rem)/2));border-block:1px solid var(--bi-border);background:color-mix(in srgb,var(--bi-secondary) 30%,var(--bi-bg));color:var(--bi-fg);font-family:var(--bi-font-body)}.bi-modal-confirm-showcase>div:first-child{max-width:34rem}.bi-modal-confirm-showcase>div:first-child>p:not(.bi-modal-confirm-status){margin:0;color:var(--bi-primary);font-size:.65rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.bi-modal-confirm-showcase h3{margin:.6rem 0 0;font:800 clamp(1.5rem,3vw,2.2rem)/1.1 var(--bi-font-heading);letter-spacing:-.055em}.bi-modal-confirm-showcase>div:first-child>button{min-height:2.75rem;margin-top:1.4rem;padding:.65rem 1rem;border:0;border-radius:999px;background:var(--bi-fg);color:var(--bi-bg);font:700 .9rem var(--bi-font-body);cursor:pointer;transition:transform .2s ease}.bi-modal-confirm-showcase>div:first-child>button:hover{transform:translateY(-2px)}.bi-modal-confirm-status{display:inline-flex;align-items:center;gap:.4rem;margin:.8rem 0 0;padding:.4rem .7rem;border-radius:999px;background:color-mix(in srgb,var(--bi-primary) 10%,transparent);color:var(--bi-fg);font-size:.75rem;font-weight:700}.bi-modal-confirm-overlay{position:fixed;z-index:90;inset:0;display:flex;align-items:center;justify-content:center;padding:1rem;background:color-mix(in srgb,var(--bi-fg) 45%,transparent);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity .2s ease}.bi-modal-confirm-overlay[data-open="true"]{opacity:1;pointer-events:auto}.bi-modal-confirm-dialog{width:min(26rem,100%);padding:1.25rem;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * 1.15);background:var(--bi-card);color:var(--bi-fg);box-shadow:0 24px 60px color-mix(in srgb,var(--bi-fg) 30%,transparent);transform:translateY(.75rem) scale(.985);transition:transform .2s ease}.bi-modal-confirm-overlay[data-open="true"] .bi-modal-confirm-dialog{transform:translateY(0) scale(1)}.bi-modal-confirm-top{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem}.bi-modal-confirm-top>span{display:grid;width:2.75rem;height:2.75rem;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--bi-primary) 10%,transparent);color:var(--bi-primary);font-size:1.25rem;font-weight:900}.bi-modal-confirm-top>button{display:grid;width:2.25rem;height:2.25rem;place-items:center;border:1px solid var(--bi-border);border-radius:50%;background:transparent;color:var(--bi-muted-fg);font-size:1.2rem;cursor:pointer}.bi-modal-confirm-top>button:hover{background:var(--bi-muted);color:var(--bi-fg)}.bi-modal-confirm-dialog h2{margin:1.25rem 0 0;font:800 1.55rem/1.12 var(--bi-font-heading);letter-spacing:-.05em}.bi-modal-confirm-dialog>p{margin:.75rem 0 0;color:var(--bi-muted-fg);font-size:.9rem;line-height:1.7}.bi-modal-confirm-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem;margin-top:1.5rem}.bi-modal-confirm-actions button{min-height:2.75rem;padding:.5rem;border:1px solid var(--bi-border);border-radius:calc(var(--bi-radius) * .75);background:var(--bi-card);color:var(--bi-fg);font:700 .85rem var(--bi-font-body);cursor:pointer}.bi-modal-confirm-actions button:last-child{border-color:var(--bi-primary);background:var(--bi-primary);color:var(--bi-primary-fg)}`,
    js: `(function(){var overlay=document.querySelector('[data-bi-confirm="${instance}"]');var trigger=document.querySelector('[data-bi-confirm-open="${instance}"]');var status=document.querySelector('[data-bi-confirm-status="${instance}"]');if(!overlay||!trigger)return;function setOpen(open){overlay.dataset.open=String(open);overlay.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));}trigger.addEventListener('click',function(){if(status)status.hidden=true;setOpen(true);});overlay.querySelectorAll('[data-bi-confirm-close]').forEach(function(button){button.addEventListener('click',function(){setOpen(false);});});var accept=overlay.querySelector('[data-bi-confirm-accept]');if(accept)accept.addEventListener('click',function(){setOpen(false);if(status)status.hidden=false;});overlay.addEventListener('click',function(event){if(event.target===overlay)setOpen(false);});document.addEventListener('keydown',function(event){if(event.key==='Escape')setOpen(false);});}());`,
  };
}
