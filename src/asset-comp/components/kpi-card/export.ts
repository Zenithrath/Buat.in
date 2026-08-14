import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function resolvePeriod(node: Node): string {
  return propString(node, "subtitle").trim() || propString(node, "period").trim() || "dibandingkan bulan lalu";
}

function resolveTrend(node: Node): "up" | "down" | "neutral" {
  const value = propString(node, "trend").trim().toLowerCase();
  return value === "down" || value === "neutral" ? value : "up";
}

function trendIcon(trend: "up" | "down" | "neutral"): string {
  if (trend === "up") return "↑";
  if (trend === "down") return "↓";
  return "−";
}

export function kpiCardExport(node: Node): ExportResult {
  const title = textOrFallback(node, "title", "Total Revenue");
  const value = textOrFallback(node, "value", "Rp 128.450.000");
  const change = textOrFallback(node, "change", "+14.2%");
  const trend = resolveTrend(node);
  const period = resolvePeriod(node);
  const sparkline = trend === "down" ? "2,18 10,14 18,16 26,10 34,12 42,7 50,9 58,3" : "2,18 10,15 18,16 26,11 34,12 42,8 50,9 58,3";

  const html = `<article class="bi-kpi-card bi-kpi-card--${trend}">
  <div class="bi-kpi-head">
    <p class="bi-kpi-title">${escapeHtml(title)}</p>
    <span class="bi-kpi-badge" aria-label="Tren ${trend}"><span aria-hidden="true">${trendIcon(trend)}</span>${escapeHtml(change)}</span>
  </div>
  <div class="bi-kpi-body">
    <p class="bi-kpi-value">${escapeHtml(value)}</p>
    <p class="bi-kpi-period">${escapeHtml(period)}</p>
  </div>
  <svg class="bi-kpi-sparkline" viewBox="0 0 60 22" aria-hidden="true" focusable="false"><polyline points="${sparkline}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</article>`;

  const css = `.bi-kpi-card { position: relative; display: flex; min-width: 0; min-height: 8.875rem; flex-direction: column; justify-content: space-between; overflow: hidden; box-sizing: border-box; padding: 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); box-shadow: var(--bi-shadow); font-family: var(--bi-font-body); }
.bi-kpi-head { display: flex; min-width: 0; align-items: flex-start; justify-content: space-between; gap: 0.5rem; }
.bi-kpi-title { overflow: hidden; margin: 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.08em; line-height: 1.35; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
.bi-kpi-badge { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 0.2rem; border-radius: 999px; padding: 0.22rem 0.45rem; background: var(--bi-muted); color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 800; line-height: 1; }
.bi-kpi-card--up .bi-kpi-badge { background: rgba(16, 185, 129, 0.12); color: #059669; }
.bi-kpi-card--down .bi-kpi-badge { background: rgba(244, 63, 94, 0.12); color: #e11d48; }
.bi-kpi-body { position: relative; z-index: 1; min-width: 0; margin-top: 0.75rem; }
.bi-kpi-value { overflow: hidden; margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: clamp(1.35rem, 2vw, 1.65rem); font-weight: 850; letter-spacing: -0.04em; line-height: 1.05; text-overflow: ellipsis; white-space: nowrap; }
.bi-kpi-period { overflow: hidden; margin: 0.4rem 0 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.bi-kpi-sparkline { position: absolute; right: 0.75rem; bottom: 0.75rem; width: 5.25rem; height: 2rem; color: var(--bi-primary); opacity: 0.28; }
.bi-kpi-card--down .bi-kpi-sparkline { color: #f43f5e; }
.bi-kpi-card--neutral .bi-kpi-sparkline { color: var(--bi-muted-fg); }
@media (max-width: 420px) { .bi-kpi-card { min-height: 8.25rem; } .bi-kpi-sparkline { opacity: 0.18; } }`;

  return { html, css };
}
