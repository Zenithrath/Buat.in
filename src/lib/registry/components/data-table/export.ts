import type { Node } from "@/lib/schema/types";
import type { ExportContext, ExportResult } from "@/lib/registry/types";
import { propString, escapeHtml } from "@/lib/registry/shared";

export function dataTableExportAdapter(
  node: Node,
  _ctx: ExportContext
): ExportResult {
  const title = propString(node, "title") || "Transaksi Terbaru";
  const subtitle = propString(node, "subtitle") || "Daftar transaksi pelanggan";

  let rows: { id: string; customer: string; item?: string; amount: string; status: string }[] = [];
  try {
    const raw = propString(node, "rowsJson");
    rows = raw ? JSON.parse(raw) : [];
  } catch {
    rows = [];
  }

  const rowsHtml = rows
    .map(
      (r) => `<tr>
  <td>${escapeHtml(r.id)}</td>
  <td><strong>${escapeHtml(r.customer)}</strong></td>
  <td>${escapeHtml(r.item ?? "")}</td>
  <td>${escapeHtml(r.amount)}</td>
  <td><span className="bi-status ${escapeHtml(r.status)}">${escapeHtml(r.status)}</span></td>
</tr>`
    )
    .join("\n");

  const html = `<div className="bi-data-table">
  <div className="bi-table-header">
    <div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(subtitle)}</p>
    </div>
  </div>
  <table className="bi-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Pelanggan</th>
        <th>Item</th>
        <th>Nominal</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`;

  const css = `.bi-data-table { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.bi-table-header { padding: 1.25rem; border-bottom: 1px solid var(--border); }
.bi-table-header h3 { font-size: 0.95rem; font-weight: 700; color: var(--foreground); margin: 0; }
.bi-table-header p { font-size: 0.75rem; color: var(--muted-foreground); margin-top: 0.25rem; }
.bi-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.8rem; }
.bi-table th { background: var(--muted); padding: 0.75rem 1rem; color: var(--muted-foreground); font-weight: 600; font-size: 0.7rem; text-transform: uppercase; }
.bi-table td { padding: 0.75rem 1rem; border-top: 1px solid var(--border); color: var(--foreground); }
.bi-status { padding: 2px 8px; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; }
.bi-status.Selesai { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.bi-status.Proses { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.bi-status.Batal { background: rgba(239, 68, 68, 0.1); color: #ef4444; }`;

  return { html, css };
}
