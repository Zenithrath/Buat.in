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

function propBoolean(node: Node, key: string, fallback: boolean): boolean {
  const value = node.props[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return fallback;
}

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function parseData(raw: string): number[] {
  return raw
    .split(",")
    .map((part) => Number(part.trim().replace(",", ".")))
    .filter((value) => Number.isFinite(value));
}

function sparkGeometry(values: number[], height: number) {
  const width = 100;
  const pad = 3;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = pad + (1 - (value - min) / range) * (height - pad * 2);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  return {
    line: points.join(" "),
    area: `0,${height} ${points.join(" ")} ${width},${height}`,
  };
}

export function sparklineExport(node: Node): ExportResult {
  const label = textOrFallback(node, "label", "Penjualan minggu ini");
  const value = textOrFallback(node, "value", "Rp 24,5 juta");
  const trend = textOrFallback(node, "trend", "+12%");
  const up = propBoolean(node, "up", true);
  const chartHeight = Math.max(24, Math.min(96, Math.round(propNumber(node, "height", 48))));
  const data = parseData(propString(node, "data"));
  const hasData = data.length >= 2;
  const geometry = hasData ? sparkGeometry(data, chartHeight) : null;

  const chart = hasData && geometry
    ? `<svg class="bi-sparkline-chart" viewBox="0 0 100 ${chartHeight}" style="height:${chartHeight}px" preserveAspectRatio="none" role="img" aria-label="Tren ${escapeHtml(label)}"><polygon fill="currentColor" opacity="0.12" points="${geometry.area}"/><polyline class="bi-sparkline-line" points="${geometry.line}"/></svg>`
    : `<div class="bi-sparkline-empty" style="height:${chartHeight}px">Belum ada data</div>`;

  const html = `<article class="bi-sparkline">
  <div class="bi-sparkline-head">
    <p class="bi-sparkline-label">${escapeHtml(label)}</p>
    <span class="bi-sparkline-trend ${up ? "is-up" : "is-down"}"><span aria-hidden="true">${up ? "▲" : "▼"}</span>${escapeHtml(trend)}</span>
  </div>
  <p class="bi-sparkline-value">${escapeHtml(value)}</p>
  ${chart}
</article>`;

  const css = `.bi-sparkline { display: flex; min-width: 0; flex-direction: column; box-sizing: border-box; padding: 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); font-family: var(--bi-font-body); }
.bi-sparkline-head { display: flex; min-width: 0; align-items: flex-start; justify-content: space-between; gap: 0.5rem; }
.bi-sparkline-label { overflow: hidden; margin: 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.08em; line-height: 1.35; text-overflow: ellipsis; text-transform: uppercase; white-space: nowrap; }
.bi-sparkline-trend { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 0.2rem; border-radius: 999px; padding: 0.22rem 0.45rem; font-size: 0.625rem; font-weight: 800; line-height: 1; }
.bi-sparkline-trend.is-up { background: rgba(16, 185, 129, 0.12); color: #059669; }
.bi-sparkline-trend.is-down { background: rgba(244, 63, 94, 0.12); color: #e11d48; }
.bi-sparkline-value { overflow: hidden; margin: 0.5rem 0 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 1.25rem; font-weight: 850; letter-spacing: -0.03em; line-height: 1.1; text-overflow: ellipsis; white-space: nowrap; }
.bi-sparkline-chart { display: block; width: 100%; margin-top: 0.75rem; overflow: visible; color: var(--bi-primary); }
.bi-sparkline-line { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.bi-sparkline-empty { display: grid; width: 100%; margin-top: 0.75rem; place-items: center; box-sizing: border-box; border: 1px dashed var(--bi-border); border-radius: calc(var(--bi-radius) * 0.75); color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 600; }`;

  return { html, css };
}
