import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";
import { listValue, nodeList } from "../_shared/content";

const DEFAULT_FILTERS = [
  "Semua",
  "Hari ini",
  "7 hari",
  "30 hari",
  "Kuartal ini",
  "Tahun ini",
];

function propNumber(node: Node, key: string, fallback: number): number {
  const value = node.props[key];
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function filters(node: Node): { label: string; index: number }[] {
  const items = nodeList(node, "filtersJson")
    .map((item, index) => ({ label: listValue(item, "label"), index }))
    .filter((item) => item.label.trim() !== "");
  if (items.length) return items;
  return DEFAULT_FILTERS.map((label, index) => ({ label, index }));
}

export function barFilterExport(node: Node): ExportResult {
  const title = propString(node, "title").trim() || "Filter data";
  const activeIndex = Math.max(0, Math.round(propNumber(node, "activeIndex", 0)));
  const chips = filters(node);
  const instance = `bi-bar-filter-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "export"}`;

  const chipsHtml = chips
    .map(
      (chip) => `<button type="button" class="bi-bar-filter-chip${chip.index === activeIndex ? " active" : ""}" aria-pressed="${chip.index === activeIndex ? "true" : "false"}">${escapeHtml(chip.label)}</button>`
    )
    .join("");

  const html = `<div class="bi-bar-filter" data-bi-bar-filter="${instance}">
  <span class="bi-bar-filter-title">${escapeHtml(title)}</span>
  <div class="bi-bar-filter-row" role="group" aria-label="${escapeHtml(title)}">${chipsHtml}</div>
</div>`;

  const css = `.bi-bar-filter { display: flex; min-width: 0; align-items: center; gap: 0.75rem; box-sizing: border-box; padding: 0.75rem 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-bar-filter-title { flex: 0 0 auto; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.8125rem; font-weight: 800; letter-spacing: -0.01em; white-space: nowrap; }
.bi-bar-filter-row { display: flex; min-width: 0; flex: 1; align-items: center; gap: 0.5rem; overflow-x: auto; scrollbar-width: none; }
.bi-bar-filter-row::-webkit-scrollbar { display: none; }
.bi-bar-filter-chip { flex: 0 0 auto; appearance: none; box-sizing: border-box; cursor: pointer; border: 1px solid var(--bi-border); border-radius: 999px; padding: 0.4rem 0.85rem; background: var(--bi-card); color: var(--bi-muted-fg); font-family: var(--bi-font-body); font-size: 0.75rem; font-weight: 600; transition: border-color .15s ease, background .15s ease, color .15s ease; }
.bi-bar-filter-chip:hover { border-color: var(--bi-primary); color: var(--bi-fg); }
.bi-bar-filter-chip.active { border-color: var(--bi-primary); background: var(--bi-primary); color: var(--bi-primary-fg); }
@media (max-width: 560px) { .bi-bar-filter { padding: 0.6rem 0.75rem; } }`;

  const js = `(function(){var root=document.querySelector('[data-bi-bar-filter="${instance}"]');if(!root)return;var chips=root.querySelectorAll('.bi-bar-filter-chip');function activate(chip){chips.forEach(function(c){var on=c===chip;c.classList.toggle('active',on);c.setAttribute('aria-pressed',String(on));});}chips.forEach(function(chip){chip.addEventListener('click',function(){activate(chip);});});}());`;

  return { html, css, js };
}
