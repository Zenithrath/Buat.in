import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { propString } from "@/lib/registry/shared";

interface TableRow {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
}

export function dataTableExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Transaksi Terbaru";
  const subtitle = propString(node, "subtitle") || "Daftar pesanan dan transaksi pelanggan";

  let rows: TableRow[] = [];
  try {
    rows = JSON.parse(propString(node, "rowsJson"));
  } catch {
    rows = [
      { id: "TRX-001", customer: "Budi Santoso", amount: "Rp 1.250.000", status: "Selesai", date: "14 Agu 2026" },
      { id: "TRX-002", customer: "Siti Rahma", amount: "Rp 850.000", status: "Proses", date: "14 Agu 2026" },
    ];
  }

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td class="bi-td-mono">${r.id}</td>
        <td>${r.customer}</td>
        <td>${r.date}</td>
        <td class="bi-td-mono">${r.amount}</td>
        <td><span class="bi-badge ${r.status.toLowerCase()}">${r.status}</span></td>
      </tr>`
    )
    .join("\n");

  const html = `
<div class="bi-data-table">
  <div class="bi-table-header">
    <h3 class="bi-table-title">${title}</h3>
    <p class="bi-table-sub">${subtitle}</p>
  </div>
  <table class="bi-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Pelanggan</th>
        <th>Tanggal</th>
        <th>Total</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</div>`;

  const css = `
.bi-data-table {
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.25rem;
  box-sizing: border-box;
}
.bi-table-title { font-size: 0.875rem; font-weight: 700; margin: 0; }
.bi-table-sub { font-size: 0.6875rem; color: var(--muted-foreground); margin: 0.25rem 0 1rem 0; }
.bi-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
.bi-table th { background: var(--muted); padding: 0.5rem 0.75rem; text-align: left; font-size: 0.6875rem; }
.bi-table td { padding: 0.625rem 0.75rem; border-bottom: 1px solid var(--border); }
.bi-td-mono { font-family: monospace; font-weight: 600; }
.bi-badge { font-size: 0.625rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px; }
.bi-badge.selesai { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.bi-badge.proses { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.bi-badge.batal { background: rgba(244, 63, 94, 0.1); color: #f43f5e; }
`;

  return { html, css };
}
