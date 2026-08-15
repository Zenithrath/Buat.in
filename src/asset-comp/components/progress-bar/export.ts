import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

type Variant = "primary" | "success" | "warning" | "danger";

function copy(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function clampedValue(node: Node): number {
  const raw = node.props.value;
  const parsed = typeof raw === "number" ? raw : Number(String(raw ?? "").replace(",", "."));
  const value = Number.isFinite(parsed) ? parsed : 68;
  return Math.max(0, Math.min(100, value));
}

function booleanProp(node: Node, key: string, fallback = false): boolean {
  const raw = node.props[key];
  if (typeof raw === "boolean") return raw;
  return raw === "true" ? true : raw === "false" ? false : fallback;
}

function resolveVariant(node: Node): Variant {
  const value = propString(node, "variant").trim().toLowerCase();
  return value === "success" || value === "warning" || value === "danger" ? value : "primary";
}

function variantColor(variant: Variant): string {
  switch (variant) {
    case "success":
      return "#10b981";
    case "warning":
      return "#f59e0b";
    case "danger":
      return "#f43f5e";
    default:
      return "var(--bi-primary)";
  }
}

export function progressBarExport(node: Node): ExportResult {
  const label = copy(node, "label", "Target penjualan");
  const value = clampedValue(node);
  const showValue = booleanProp(node, "showValue", true);
  const variant = resolveVariant(node);
  const hint = copy(node, "hint", "Tersisa 32% menuju target bulan ini");
  const fillColor = variantColor(variant);

  const valueBadge = showValue ? `<span class="bi-progress-value">${Math.round(value)}%</span>` : "";

  const html = `<div class="bi-progress">
  <div class="bi-progress-head">
    <span class="bi-progress-label">${escapeHtml(label)}</span>
    ${valueBadge}
  </div>
  <div class="bi-progress-track" role="progressbar" aria-valuenow="${Math.round(value)}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(label)}">
    <span class="bi-progress-fill bi-progress-fill--${variant}" style="width:${value}%"></span>
  </div>
  ${hint ? `<p class="bi-progress-hint">${escapeHtml(hint)}</p>` : ""}
</div>`;

  const css = `.bi-progress { min-width: 0; box-sizing: border-box; padding: 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-progress-head { display: flex; min-width: 0; align-items: center; justify-content: space-between; gap: 0.75rem; }
.bi-progress-label { min-width: 0; overflow: hidden; color: var(--bi-fg); font-size: 0.75rem; font-weight: 750; text-overflow: ellipsis; white-space: nowrap; }
.bi-progress-value { flex: 0 0 auto; border-radius: 999px; padding: 0.22rem 0.5rem; background: var(--bi-muted); color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 850; font-variant-numeric: tabular-nums; }
.bi-progress-track { width: 100%; height: 0.5rem; overflow: hidden; margin-top: 0.625rem; border-radius: 999px; background: var(--bi-muted); }
.bi-progress-fill { display: block; height: 100%; border-radius: 999px; background: ${fillColor}; transition: width .3s ease; }
.bi-progress-fill--primary { background: var(--bi-primary); }
.bi-progress-hint { margin: 0.375rem 0 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 500; }
@media (max-width: 640px) { .bi-progress { padding: 0.875rem; } .bi-progress-hint { font-size: 0.625rem; } }`;

  return { html, css };
}
