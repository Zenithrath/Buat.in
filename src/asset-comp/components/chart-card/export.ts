import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

interface DataPoint {
  label: string;
  val1: number;
  val2?: number;
}

function parseData(node: Node): DataPoint[] {
  try {
    const parsed = JSON.parse(propString(node, "dataJson"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildLineChartSvg(data: DataPoint[], maxVal: number, filled: boolean): string {
  if (data.length === 0) return "";
  const step = 300 / Math.max(data.length - 1, 1);
  const points = data
    .map((d, i) => `${(i * step).toFixed(1)},${(120 - (d.val1 / maxVal) * 100).toFixed(1)}`)
    .join(" ");
  const val2Points = data
    .map((d, i) => `${(i * step).toFixed(1)},${(120 - ((d.val2 ?? 0) / maxVal) * 100).toFixed(1)}`)
    .join(" ");

  return `
      <svg class="bi-chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
        ${
          filled
            ? `<polygon fill="var(--primary)" fill-opacity="0.15" points="0,120 ${points} 300,120"/>`
            : ""
        }
        <polyline fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}"/>
        ${
          data.some((d) => d.val2 !== undefined)
            ? `<polyline fill="none" stroke="var(--chart-2)" stroke-width="2.5" stroke-dasharray="4 4" stroke-linecap="round" stroke-linejoin="round" points="${val2Points}"/>`
            : ""
        }
      </svg>`;
}

function buildBarChartSvg(data: DataPoint[], maxVal: number): string {
  const slots = data.length || 1;
  const slotW = 300 / slots;
  const barW = Math.min(14, slotW * 0.32);
  const gap = 3;

  return `
      <svg class="bi-chart-svg" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
        ${data
          .map((d, i) => {
            const x = i * slotW + slotW / 2;
            const h1 = Math.max((d.val1 / maxVal) * 100, 1);
            const h2 = d.val2 !== undefined ? Math.max((d.val2 / maxVal) * 100, 1) : 0;
            return `
            <rect x="${(x - barW - gap / 2).toFixed(1)}" y="${(120 - h1).toFixed(1)}" width="${barW}" height="${h1.toFixed(1)}" fill="var(--primary)" rx="2"/>
            ${
              h2 > 0
                ? `<rect x="${(x + gap / 2).toFixed(1)}" y="${(120 - h2).toFixed(1)}" width="${barW}" height="${h2.toFixed(1)}" fill="var(--chart-2)" rx="2"/>`
                : ""
            }`;
          })
          .join("")}
      </svg>`;
}

function buildDonutSvg(data: DataPoint[]): string {
  const total = data.reduce((sum, d) => sum + Math.max(d.val1, 0), 0) || 1;
  const r = 40;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const segments = data
    .map((d, i) => {
      const frac = Math.max(d.val1, 0) / total;
      const len = frac * c;
      const seg = `
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--chart-${(i % 5) + 1})" stroke-width="12"
          stroke-dasharray="${len.toFixed(1)} ${(c - len).toFixed(1)}"
          stroke-dashoffset="${(-offset).toFixed(1)}"/>`;
      offset += len;
      return seg;
    })
    .join("");

  return `
      <svg class="bi-chart-svg" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--muted)" stroke-width="12"/>
        ${segments}
        <text x="60" y="64" text-anchor="middle" font-size="14" font-weight="800" fill="var(--foreground)">${data.length}K</text>
      </svg>`;
}

export function chartCardExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Pendapatan & Pengunjung";
  const subtitle = propString(node, "subtitle") || "Tren 6 bulan terakhir";
  const chartType = propString(node, "chartType") || "area";
  const data = parseData(node);
  const maxVal = Math.max(...data.map((d) => Math.max(d.val1, d.val2 ?? 0)), 1);

  let chartBody = "";
  if (chartType === "bar") {
    chartBody = buildBarChartSvg(data, maxVal);
  } else if (chartType === "donut") {
    chartBody = buildDonutSvg(data);
  } else {
    chartBody = buildLineChartSvg(data, maxVal, chartType === "area");
  }

  const labelsHtml = data
    .map((d) => `<span class="bi-chart-xlabel">${d.label}</span>`)
    .join("");

  const html = `
<div class="bi-chart-card">
  <div class="bi-chart-header">
    <div>
      <h3 class="bi-chart-title">${title}</h3>
      <p class="bi-chart-sub">${subtitle}</p>
    </div>
    <div class="bi-chart-legend">
      <span class="bi-chart-legend-item"><i class="bi-chart-dot bi-chart-dot-primary"></i>Penjualan</span>
      <span class="bi-chart-legend-item"><i class="bi-chart-dot bi-chart-dot-chart2"></i>Pengunjung</span>
    </div>
  </div>
  <div class="bi-chart-body">
    ${chartBody}
    ${chartType === "donut" ? "" : `<div class="bi-chart-xlabels">${labelsHtml}</div>`}
  </div>
</div>`;

  const css = `
.bi-chart-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-sizing: border-box;
  font-family: inherit;
}
.bi-chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.bi-chart-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--foreground);
  margin: 0;
}
.bi-chart-sub {
  font-size: 0.6875rem;
  color: var(--muted-foreground);
  margin: 0.25rem 0 0 0;
}
.bi-chart-legend {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}
.bi-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.625rem;
  color: var(--muted-foreground);
  font-weight: 500;
}
.bi-chart-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  display: inline-block;
}
.bi-chart-dot-primary { background: var(--primary); }
.bi-chart-dot-chart2 { background: var(--chart-2); }
.bi-chart-body {
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
}
.bi-chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.bi-chart-xlabels {
  display: flex;
  justify-content: space-between;
}
.bi-chart-xlabel {
  font-size: 0.625rem;
  color: var(--muted-foreground);
  font-weight: 500;
}
`;

  return { html, css };
}