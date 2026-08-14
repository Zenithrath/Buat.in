import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { propString, escapeHtml } from "@/lib/registry/shared";

export function dashboardHeaderExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const title = propString(node, "title") || "Overview Dashboard";
  const breadcrumb = propString(node, "breadcrumb") || "Dashboard / Analytics";
  const searchPlaceholder = propString(node, "searchPlaceholder") || "Cari data...";

  const html = `<header className="bi-dash-header">
  <div>
    <div className="bi-breadcrumb">${escapeHtml(breadcrumb)}</div>
    <h2>${escapeHtml(title)}</h2>
  </div>
  <div className="bi-dash-header-actions">
    <input type="text" placeholder="${escapeHtml(searchPlaceholder)}" className="bi-search-input" />
    <button className="bi-btn-export">Export Laporan</button>
  </div>
</header>`;

  const css = `.bi-dash-header { display: flex; justify-content: space-between; align-items: center; background: var(--card); border-bottom: 1px solid var(--border); padding: 1rem 1.5rem; }
.bi-breadcrumb { font-size: 0.75rem; color: var(--muted-foreground); }
.bi-dash-header h2 { font-size: 1.1rem; font-weight: 700; color: var(--foreground); margin: 0.25rem 0 0 0; }
.bi-dash-header-actions { display: flex; gap: 0.75rem; align-items: center; }
.bi-search-input { background: var(--muted); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.4rem 0.75rem; font-size: 0.8rem; color: var(--foreground); width: 220px; }
.bi-btn-export { background: var(--primary); color: var(--primary-foreground); border: none; border-radius: var(--radius); padding: 0.4rem 0.85rem; font-size: 0.8rem; font-weight: 600; cursor: pointer; }`;

  return { html, css };
}
