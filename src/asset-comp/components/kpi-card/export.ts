import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

export function kpiCardExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Total Revenue";
  const value = propString(node, "value") || "Rp 128.450.000";
  const change = propString(node, "change") || "+14.2%";
  const trend = propString(node, "trend") || "up";
  const period = propString(node, "period") || "vs bulan lalu";

  const html = `
<div class="bi-kpi-card">
  <div class="bi-kpi-head">
    <span class="bi-kpi-title">${title}</span>
    <span class="bi-kpi-badge ${trend}">${change}</span>
  </div>
  <div class="bi-kpi-value">${value}</div>
  <div class="bi-kpi-period">${period}</div>
</div>`;

  const css = `
.bi-kpi-card {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-sizing: border-box;
}
.bi-kpi-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.bi-kpi-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--muted-foreground);
}
.bi-kpi-badge {
  font-size: 0.6875rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 9999px;
}
.bi-kpi-badge.up {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}
.bi-kpi-badge.down {
  background: rgba(244, 63, 94, 0.1);
  color: #f43f5e;
}
.bi-kpi-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--foreground);
}
.bi-kpi-period {
  font-size: 0.6875rem;
  color: var(--muted-foreground);
  margin-top: 0.25rem;
}
`;

  return { html, css };
}
