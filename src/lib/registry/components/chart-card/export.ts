import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { propString, escapeHtml } from "@/lib/registry/shared";

export function chartCardExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const title = propString(node, "title") || "Analytics Overview";
  const chartType = propString(node, "chartType") || "area";

  const html = `<div className="bi-chart-card">
  <div className="bi-chart-header">
    <h3>${escapeHtml(title)}</h3>
    <span className="bi-chart-type">${escapeHtml(chartType)}</span>
  </div>
  <div className="bi-chart-container">
    <div className="bi-chart-placeholder">
      <!-- SVG / Chart Canvas generated here -->
      <div className="bi-chart-bar-mock">
        <div className="bi-bar" style="height: 60%;"></div>
        <div className="bi-bar" style="height: 85%;"></div>
        <div className="bi-bar" style="height: 45%;"></div>
        <div className="bi-bar" style="height: 100%;"></div>
      </div>
    </div>
  </div>
</div>`;

  const css = `.bi-chart-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.25rem; }
.bi-chart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; margin-bottom: 1rem; }
.bi-chart-header h3 { font-size: 0.95rem; font-weight: 700; color: var(--foreground); margin: 0; }
.bi-chart-type { font-size: 0.7rem; text-transform: uppercase; color: var(--muted-foreground); background: var(--muted); padding: 2px 6px; border-radius: 4px; }
.bi-chart-container { height: 180px; position: relative; }
.bi-chart-bar-mock { display: flex; align-items: flex-end; gap: 0.75rem; height: 100%; justify-content: space-around; }
.bi-bar { width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; }`;

  return { html, css };
}
