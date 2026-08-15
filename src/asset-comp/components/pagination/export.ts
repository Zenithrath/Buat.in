import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml } from "@/lib/registry/shared";

function numberProp(node: Node, key: string, fallback: number): number {
  const raw = node.props[key];
  const parsed = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(",", "."));
  return Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : fallback;
}

function booleanProp(node: Node, key: string, fallback = false): boolean {
  const raw = node.props[key];
  if (typeof raw === "boolean") return raw;
  return raw === "true" ? true : raw === "false" ? false : fallback;
}

function pageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 2);
  const end = Math.min(total - 1, current + 2);
  if (start > 2) items.push("ellipsis");
  for (let i = start; i <= end; i += 1) items.push(i);
  if (end < total - 1) items.push("ellipsis");
  items.push(total);
  return items;
}

export function paginationExport(node: Node): ExportResult {
  const total = numberProp(node, "totalPages", 5);
  if (total <= 0) return { html: "", css: "" };

  const current = Math.min(numberProp(node, "currentPage", 1), total);
  const showPrevNext = booleanProp(node, "showPrevNext", true);
  const instance = node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "pagination";
  const pages = pageWindow(current, total);

  const pageButtons = pages
    .map((page) =>
      page === "ellipsis"
        ? `<span class="bi-pagination-ellipsis" aria-hidden="true">…</span>`
        : `<button type="button" class="bi-pagination-page${page === current ? " active" : ""}" data-bi-page="${page}"${page === current ? ' aria-current="page"' : ""}>${page}</button>`
    )
    .join("\n");

  const prev = showPrevNext ? `<button type="button" class="bi-pagination-page bi-pagination-nav" data-bi-prev aria-label="Halaman sebelumnya">‹</button>` : "";
  const next = showPrevNext ? `<button type="button" class="bi-pagination-page bi-pagination-nav" data-bi-next aria-label="Halaman berikutnya">›</button>` : "";

  const html = `<nav class="bi-pagination" data-bi-pagination="${escapeHtml(instance)}" data-current="${current}" data-total="${total}" aria-label="Navigasi halaman">
${prev}
${pageButtons}
${next}
</nav>`;

  const css = `.bi-pagination { display: flex; align-items: center; justify-content: center; gap: 0.375rem; color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-pagination-page { display: grid; width: 2rem; height: 2rem; place-items: center; box-sizing: border-box; border: 0; border-radius: calc(var(--bi-radius) * 0.65); background: transparent; color: var(--bi-muted-fg); font: 750 0.75rem/1 var(--bi-font-body); cursor: pointer; transition: background .15s ease, color .15s ease; }
.bi-pagination-page:hover { background: var(--bi-muted); color: var(--bi-fg); }
.bi-pagination-page.active { background: var(--bi-primary); color: var(--bi-primary-fg); box-shadow: 0 1px 2px color-mix(in srgb, var(--bi-fg) 12%, transparent); }
.bi-pagination-ellipsis { display: grid; width: 2rem; height: 2rem; place-items: center; color: var(--bi-muted-fg); font-size: 0.75rem; font-weight: 700; }
.bi-pagination-nav { font-size: 1.1rem; }
@media (max-width: 640px) { .bi-pagination { gap: 0.25rem; } .bi-pagination-page, .bi-pagination-ellipsis { width: 1.75rem; height: 1.75rem; } }`;

  const js = `(function(){var root=document.querySelector('[data-bi-pagination="${instance}"]');if(!root)return;var pages=root.querySelectorAll('[data-bi-page]');var prev=root.querySelector('[data-bi-prev]');var next=root.querySelector('[data-bi-next]');var total=parseInt(root.getAttribute('data-total')||'1',10)||1;var current=Math.min(Math.max(parseInt(root.getAttribute('data-current')||'1',10)||1,1),total);function render(){pages.forEach(function(btn){var page=parseInt(btn.getAttribute('data-page'),10);var on=page===current;btn.classList.toggle('active',on);if(on){btn.setAttribute('aria-current','page');}else{btn.removeAttribute('aria-current');}});}render();if(prev)prev.addEventListener('click',function(){if(current>1){current-=1;render();}});if(next)next.addEventListener('click',function(){if(current<total){current+=1;render();}});}());`;

  return { html, css, js };
}
