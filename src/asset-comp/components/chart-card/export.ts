import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

type ChartType = "area" | "line" | "bar" | "donut";

interface ChartPoint {
  label: string;
  primary: number;
  secondary?: number;
}

const DEFAULT_DATA: ChartPoint[] = [
  { label: "Jan", primary: 45, secondary: 28 },
  { label: "Feb", primary: 52, secondary: 31 },
  { label: "Mar", primary: 48, secondary: 35 },
  { label: "Apr", primary: 61, secondary: 42 },
  { label: "Mei", primary: 75, secondary: 53 },
  { label: "Jun", primary: 92, secondary: 68 },
  { label: "Jul", primary: 128, secondary: 84 },
];

function textOrFallback(node: Node, key: string, fallback: string): string {
  return propString(node, key).trim() || fallback;
}

function numberValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.replace(",", "."));
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
}

function parseChartData(node: Node): ChartPoint[] {
  try {
    const parsed: unknown = JSON.parse(propString(node, "dataJson"));
    if (!Array.isArray(parsed)) return DEFAULT_DATA;

    const points = parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
      .map((item, index): ChartPoint | null => {
        const primary = numberValue(item.val1 ?? item.revenue ?? item.value ?? item.amount);
        const secondary = numberValue(item.val2 ?? item.users ?? item.secondary);
        const label = String(item.label ?? item.month ?? item.name ?? `Data ${index + 1}`).trim();
        if (!label || primary === undefined) return null;
        return secondary === undefined ? { label, primary } : { label, primary, secondary };
      })
      .filter((item): item is ChartPoint => item !== null)
      .slice(0, 12);

    return points.length ? points : DEFAULT_DATA;
  } catch {
    return DEFAULT_DATA;
  }
}

function resolveChartType(node: Node): ChartType {
  const value = propString(node, "chartType").trim().toLowerCase();
  return value === "line" || value === "bar" || value === "donut" ? value : "area";
}

function pointsFor(data: ChartPoint[], maxValue: number, key: "primary" | "secondary"): string {
  return data
    .map((point, index) => {
      const value = key === "primary" ? point.primary : point.secondary ?? 0;
      const x = 16 + (index / Math.max(data.length - 1, 1)) * 368;
      const y = 156 - (Math.max(value, 0) / maxValue) * 128;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildLineChart(data: ChartPoint[], maxValue: number, type: "area" | "line", hasSecondary: boolean, id: string): string {
  const primary = pointsFor(data, maxValue, "primary");
  const secondary = pointsFor(data, maxValue, "secondary");
  const grid = [28, 70, 112, 156]
    .map((y) => `<line x1="16" x2="384" y1="${y}" y2="${y}" class="bi-chart-gridline"/>`)
    .join("");
  const markers = primary
    .split(" ")
    .map((point) => {
      const [x, y] = point.split(",");
      return `<circle cx="${x}" cy="${y}" r="3" class="bi-chart-marker"/>`;
    })
    .join("");

  return `<svg class="bi-chart-svg" viewBox="0 0 400 176" preserveAspectRatio="none" role="img" aria-label="Grafik data">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--bi-chart-1)" stop-opacity="0.32"/><stop offset="100%" stop-color="var(--bi-chart-1)" stop-opacity="0"/></linearGradient></defs>
    ${grid}
    ${type === "area" ? `<polygon fill="url(#${id})" points="16,156 ${primary} 384,156"/>` : ""}
    <polyline class="bi-chart-line bi-chart-line-primary" points="${primary}"/>
    ${hasSecondary ? `<polyline class="bi-chart-line bi-chart-line-secondary" points="${secondary}"/>` : ""}
    ${markers}
  </svg>`;
}

function buildBarChart(data: ChartPoint[], maxValue: number, hasSecondary: boolean): string {
  const slot = 368 / data.length;
  const barWidth = Math.max(5, Math.min(hasSecondary ? 14 : 22, slot * (hasSecondary ? 0.28 : 0.5)));

  const bars = data
    .map((point, index) => {
      const center = 16 + index * slot + slot / 2;
      const primaryHeight = Math.max((Math.max(point.primary, 0) / maxValue) * 128, 2);
      const secondaryHeight = Math.max(((point.secondary ?? 0) / maxValue) * 128, 0);
      const primaryX = hasSecondary ? center - barWidth - 2 : center - barWidth / 2;
      const primary = `<rect class="bi-chart-bar bi-chart-bar-primary" x="${primaryX.toFixed(1)}" y="${(156 - primaryHeight).toFixed(1)}" width="${barWidth.toFixed(1)}" height="${primaryHeight.toFixed(1)}" rx="3"/>`;
      const secondary = hasSecondary && secondaryHeight > 0 ? `<rect class="bi-chart-bar bi-chart-bar-secondary" x="${(center + 2).toFixed(1)}" y="${(156 - secondaryHeight).toFixed(1)}" width="${barWidth.toFixed(1)}" height="${secondaryHeight.toFixed(1)}" rx="3"/>` : "";
      return `${primary}${secondary}`;
    })
    .join("");

  return `<svg class="bi-chart-svg" viewBox="0 0 400 176" preserveAspectRatio="none" role="img" aria-label="Grafik batang">
    ${[28, 70, 112, 156].map((y) => `<line x1="16" x2="384" y1="${y}" y2="${y}" class="bi-chart-gridline"/>`).join("")}
    ${bars}
  </svg>`;
}

function buildDonutChart(data: ChartPoint[]): string {
  const total = Math.max(data.reduce((sum, point) => sum + Math.max(point.primary, 0), 0), 1);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const segments = data
    .map((point, index) => {
      const portion = Math.max(point.primary, 0) / total;
      const length = portion * circumference;
      const segment = `<circle cx="60" cy="60" r="${radius}" class="bi-donut-segment bi-donut-segment-${index % 5}" stroke-dasharray="${length.toFixed(2)} ${(circumference - length).toFixed(2)}" stroke-dashoffset="${(-offset * circumference).toFixed(2)}"/>`;
      offset += portion;
      return segment;
    })
    .join("");

  return `<svg class="bi-donut-svg" viewBox="0 0 120 120" role="img" aria-label="Grafik donat">
    <circle cx="60" cy="60" r="${radius}" class="bi-donut-track"/>
    ${segments}
    <text x="60" y="57" text-anchor="middle" class="bi-donut-total">${data.length}</text>
    <text x="60" y="70" text-anchor="middle" class="bi-donut-caption">SUMBER</text>
  </svg>`;
}

export function chartCardExport(node: Node): ExportResult {
  const title = textOrFallback(node, "title", "Tren Pendapatan & Pengguna");
  const subtitle = textOrFallback(node, "subtitle", "Ringkasan 7 bulan terakhir");
  const type = resolveChartType(node);
  const data = parseChartData(node);
  const hasSecondary = data.some((point) => point.secondary !== undefined);
  const maxValue = Math.max(...data.flatMap((point) => [point.primary, point.secondary ?? 0]), 1);
  const id = `bi-chart-gradient-${node.id.replace(/[^a-zA-Z0-9_-]/g, "") || "chart"}`;
  const chart = type === "donut" ? buildDonutChart(data) : type === "bar" ? buildBarChart(data, maxValue, hasSecondary) : buildLineChart(data, maxValue, type, hasSecondary, id);
  const labels = type === "donut" ? "" : `<div class="bi-chart-xlabels">${data.map((point) => `<span>${escapeHtml(point.label)}</span>`).join("")}</div>`;
  const legend = type === "donut"
    ? `<div class="bi-chart-donut-legend">${data.slice(0, 5).map((point, index) => `<div><i class="bi-chart-dot bi-chart-dot-${index % 5}"></i><span>${escapeHtml(point.label)}</span><strong>${Math.round((Math.max(point.primary, 0) / Math.max(data.reduce((sum, item) => sum + Math.max(item.primary, 0), 0), 1)) * 100)}%</strong></div>`).join("")}</div>`
    : `<div class="bi-chart-legend"><span><i class="bi-chart-dot bi-chart-dot-0"></i>Nilai utama</span>${hasSecondary ? `<span><i class="bi-chart-dot bi-chart-dot-1"></i>Nilai kedua</span>` : ""}</div>`;

  const html = `<article class="bi-chart-card bi-chart-card--${type}">
  <header class="bi-chart-header">
    <div class="bi-chart-copy">
      <h3 class="bi-chart-title">${escapeHtml(title)}</h3>
      <p class="bi-chart-subtitle">${escapeHtml(subtitle)}</p>
    </div>
    ${type === "donut" ? "" : legend}
  </header>
  <div class="bi-chart-content">
    <div class="bi-chart-visual">${chart}</div>
    ${type === "donut" ? legend : labels}
  </div>
</article>`;

  const css = `.bi-chart-card { min-width: 0; overflow: hidden; box-sizing: border-box; padding: 1rem; border: 1px solid var(--bi-border); border-radius: calc(var(--bi-radius) + 2px); background: var(--bi-card); color: var(--bi-fg); box-shadow: var(--bi-shadow); font-family: var(--bi-font-body); }
.bi-chart-header { display: flex; min-width: 0; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.875rem; padding-bottom: 0.875rem; border-bottom: 1px solid var(--bi-border); }
.bi-chart-copy { min-width: 0; }
.bi-chart-title { overflow: hidden; margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.875rem; font-weight: 800; letter-spacing: -0.015em; text-overflow: ellipsis; white-space: nowrap; }
.bi-chart-subtitle { overflow: hidden; margin: 0.25rem 0 0; color: var(--bi-muted-fg); font-size: 0.6875rem; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
.bi-chart-legend { display: flex; flex: 0 0 auto; align-items: center; gap: 0.75rem; padding-top: 0.1rem; color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 600; }
.bi-chart-legend span { display: inline-flex; align-items: center; gap: 0.3rem; white-space: nowrap; }
.bi-chart-dot { display: inline-block; width: 0.5rem; height: 0.5rem; flex: 0 0 auto; border-radius: 999px; background: var(--bi-chart-1); }
.bi-chart-dot-1, .bi-donut-segment-1 { background: var(--bi-chart-2); stroke: var(--bi-chart-2); }
.bi-chart-dot-2, .bi-donut-segment-2 { background: var(--bi-chart-3); stroke: var(--bi-chart-3); }
.bi-chart-dot-3, .bi-donut-segment-3 { background: var(--bi-chart-4); stroke: var(--bi-chart-4); }
.bi-chart-dot-4, .bi-donut-segment-4 { background: var(--bi-chart-5); stroke: var(--bi-chart-5); }
.bi-chart-content { min-width: 0; }
.bi-chart-visual { height: 12rem; min-width: 0; }
.bi-chart-svg { display: block; width: 100%; height: 100%; overflow: visible; }
.bi-chart-gridline { stroke: var(--bi-border); stroke-width: 1; stroke-dasharray: 3 5; }
.bi-chart-line { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.bi-chart-line-primary { stroke: var(--bi-chart-1); stroke-width: 3; }
.bi-chart-line-secondary { stroke: var(--bi-chart-2); stroke-width: 2.25; stroke-dasharray: 5 5; }
.bi-chart-marker { fill: var(--bi-card); stroke: var(--bi-chart-1); stroke-width: 2; }
.bi-chart-bar-primary { fill: var(--bi-chart-1); }
.bi-chart-bar-secondary { fill: var(--bi-chart-2); opacity: 0.7; }
.bi-chart-xlabels { display: flex; justify-content: space-between; gap: 0.25rem; margin-top: 0.4rem; color: var(--bi-muted-fg); font-size: 0.625rem; font-weight: 600; }
.bi-chart-xlabels span { min-width: 0; overflow: hidden; text-align: center; text-overflow: ellipsis; white-space: nowrap; }
.bi-chart-card--donut .bi-chart-content { display: flex; min-height: 12rem; align-items: center; justify-content: center; gap: 1.25rem; }
.bi-chart-card--donut .bi-chart-visual { width: 9rem; height: 9rem; flex: 0 0 auto; }
.bi-donut-svg { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
.bi-donut-track { fill: none; stroke: var(--bi-muted); stroke-width: 13; }
.bi-donut-segment { fill: none; stroke: var(--bi-chart-1); stroke-width: 13; stroke-linecap: butt; }
.bi-donut-total, .bi-donut-caption { transform: rotate(90deg); transform-origin: 60px 60px; fill: var(--bi-fg); font-family: var(--bi-font-heading); font-weight: 800; }
.bi-donut-total { font-size: 18px; }
.bi-donut-caption { fill: var(--bi-muted-fg); font-family: var(--bi-font-body); font-size: 7px; letter-spacing: 0.08em; }
.bi-chart-donut-legend { display: grid; min-width: 0; gap: 0.5rem; }
.bi-chart-donut-legend div { display: grid; min-width: 0; grid-template-columns: 0.5rem minmax(0, 1fr) auto; align-items: center; gap: 0.45rem; color: var(--bi-muted-fg); font-size: 0.6875rem; }
.bi-chart-donut-legend span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.bi-chart-donut-legend strong { color: var(--bi-fg); font-size: 0.625rem; }
@media (max-width: 560px) { .bi-chart-legend { display: none; } .bi-chart-card--donut .bi-chart-content { gap: 0.75rem; } .bi-chart-card--donut .bi-chart-visual { width: 7.5rem; height: 7.5rem; } .bi-chart-donut-legend { gap: 0.4rem; } }`;

  return { html, css };
}
