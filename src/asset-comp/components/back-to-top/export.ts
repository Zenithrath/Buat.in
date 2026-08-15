import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

export function backToTopExport(node: Node): ExportResult {
  const label = propString(node, "label").trim() || "Kembali ke atas";
  const position = propString(node, "position").trim() || "right";
  const variant = propString(node, "variant").trim() || "solid";
  const showAfter = Math.max(0, Math.round(propNumber(node, "showAfter", 320)));
  const instance = `bi-back-to-top-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;

  return {
    html: `<button class="bi-back-to-top ${variant}" type="button" data-bi-back-to-top="${instance}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" data-offset="${showAfter}" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
</button>`,
    css: `.bi-back-to-top{position:fixed;z-index:80;${position}:1.5rem;bottom:1.5rem;display:grid;width:2.75rem;height:2.75rem;place-items:center;border-radius:999px;cursor:pointer;opacity:0;pointer-events:none;transform:translateY(0.5rem);transition:opacity .25s ease,transform .25s ease,background .15s ease,color .15s ease}.bi-back-to-top[aria-hidden="false"]{opacity:1;pointer-events:auto;transform:translateY(0)}.bi-back-to-top svg{width:1.1rem;height:1.1rem}.bi-back-to-top.solid{background:var(--bi-primary);color:var(--bi-primary-fg);box-shadow:0 10px 24px color-mix(in srgb,var(--bi-primary) 40%,transparent)}.bi-back-to-top.solid:hover{opacity:.9}.bi-back-to-top.outline{border:1px solid var(--bi-border);background:var(--bi-card);color:var(--bi-fg);box-shadow:0 6px 18px color-mix(in srgb,var(--bi-fg) 12%,transparent)}.bi-back-to-top.outline:hover{background:var(--bi-muted)}.bi-back-to-top.ghost{background:color-mix(in srgb,var(--bi-muted) 75%,transparent);color:var(--bi-fg)}.bi-back-to-top.ghost:hover{background:var(--bi-muted)}@media (max-width:640px){.bi-back-to-top{bottom:1rem;${position}:1rem}}`,
    js: `(function(){var button=document.querySelector('[data-bi-back-to-top="${instance}"]');if(!button)return;var offset=parseInt(button.getAttribute('data-offset')||'320',10)||320;function onScroll(){var shown=window.scrollY>offset;button.setAttribute('aria-hidden',String(!shown));}onScroll();window.addEventListener('scroll',onScroll,{passive:true});button.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});}());`,
  };
}
