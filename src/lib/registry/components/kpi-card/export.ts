import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { propString, escapeHtml } from "@/lib/registry/shared";

export function kpiCardExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const title = propString(node, "title") || "Total Revenue";
  const value = propString(node, "value") || "Rp 128.450.000";
  const change = propString(node, "change") || "+14.2%";
  const trend = propString(node, "trend") || "up";
  const subtitle = propString(node, "subtitle") || "dibandingkan bulan lalu";

  const html = `<div className="bi-kpi-card">
  <div className="bi-kpi-header">
    <span className="bi-kpi-title">${escapeHtml(title)}</span>
    <span className="bi-kpi-badge ${escapeHtml(trend)}">${escapeHtml(change)}</span>
  </div>
  <div className="bi-kpi-value">${escapeHtml(value)}</div>
  <div className="bi-kpi-subtitle">${escapeHtml(subtitle)}</div>
</div>`;

  const css = `.bi-kpi-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.bi-kpi-header { display: flex; justify-content: space-between; align-items: center; }
.bi-kpi-title { font-size: 0.8rem; color: var(--muted-foreground); font-weight: 500; }
.bi-kpi-badge { font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 9999px; }
.bi-kpi-badge.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.bi-kpi-badge.down { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
.bi-kpi-badge.neutral { background: var(--muted); color: var(--muted-foreground); }
.bi-kpi-value { font-size: 1.5rem; font-weight: 700; color: var(--foreground); margin-top: 0.75rem; }
.bi-kpi-subtitle { font-size: 0.75rem; color: var(--muted-foreground); margin-top: 0.25rem; }`;

  return { html, css };
}
