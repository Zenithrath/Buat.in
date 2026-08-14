import type { ExportResult } from "@/lib/registry/types";
import type { Node } from "@/lib/schema/types";
import { escapeHtml, propString } from "@/lib/registry/shared";

interface TableRow {
  id: string;
  customer: string;
  item: string;
  amount: string;
  status: string;
  date: string;
}

const FALLBACK_ROWS: TableRow[] = [
  {
    id: "TRX-001",
    customer: "Budi Santoso",
    item: "Paket konsultasi brand",
    amount: "Rp 1.250.000",
    status: "Selesai",
    date: "14 Agu 2026",
  },
  {
    id: "TRX-002",
    customer: "Siti Rahma",
    item: "Website company profile",
    amount: "Rp 850.000",
    status: "Proses",
    date: "14 Agu 2026",
  },
];

function normalizeRows(value: unknown): TableRow[] {
  if (!Array.isArray(value)) return FALLBACK_ROWS;

  const rows = value.flatMap((item, index): TableRow[] => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const customer = String(row.customer ?? row.client ?? "").trim();
    const id = String(row.id ?? `TRX-${String(index + 1).padStart(3, "0")}`).trim();
    if (!id || !customer) return [];

    return [
      {
        id,
        customer,
        item: String(row.item ?? row.project ?? row.description ?? "").trim(),
        amount: String(row.amount ?? row.total ?? "-").trim() || "-",
        status: String(row.status ?? "Proses").trim() || "Proses",
        date: String(row.date ?? row.createdAt ?? "-").trim() || "-",
      },
    ];
  });

  return rows.length > 0 ? rows : FALLBACK_ROWS;
}

function statusTone(status: string): "success" | "warning" | "danger" | "neutral" {
  const normalized = status.toLocaleLowerCase("id-ID");
  if (normalized.includes("selesai") || normalized.includes("lunas")) return "success";
  if (normalized.includes("batal") || normalized.includes("gagal")) return "danger";
  if (normalized.includes("proses") || normalized.includes("tunda")) return "warning";
  return "neutral";
}

export function dataTableExport(node: Node): ExportResult {
  const title = propString(node, "title") || "Aktivitas Terbaru";
  const subtitle =
    propString(node, "subtitle") || "Daftar pekerjaan dan transaksi yang perlu dipantau";

  let parsedRows: unknown = [];
  try {
    const raw = propString(node, "rowsJson");
    parsedRows = raw ? JSON.parse(raw) : [];
  } catch {
    parsedRows = [];
  }
  const rows = normalizeRows(parsedRows);

  const rowsHtml = rows
    .map((row) => {
      const searchable = [
        row.id,
        row.customer,
        row.item,
        row.amount,
        row.status,
        row.date,
      ].join(" ");

      return `<tr data-dashboard-row data-search-text="${escapeHtml(searchable)}">
        <td class="bi-td-mono">${escapeHtml(row.id)}</td>
        <td>
          <span class="bi-table-customer">${escapeHtml(row.customer)}</span>
          ${row.item ? `<span class="bi-table-item">${escapeHtml(row.item)}</span>` : ""}
        </td>
        <td class="bi-table-date">${escapeHtml(row.date)}</td>
        <td class="bi-td-mono">${escapeHtml(row.amount)}</td>
        <td><span class="bi-badge bi-badge--${statusTone(row.status)}">${escapeHtml(row.status)}</span></td>
      </tr>`;
    })
    .join("\n");

  const html = `<section class="bi-data-table" aria-label="${escapeHtml(title)}">
  <div class="bi-table-header">
    <div>
      <h3 class="bi-table-title">${escapeHtml(title)}</h3>
      <p class="bi-table-sub">${escapeHtml(subtitle)}</p>
    </div>
    <span class="bi-table-count">${rows.length} data</span>
  </div>
  <div class="bi-table-scroll">
    <table class="bi-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Klien & pekerjaan</th>
          <th>Tanggal</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>
  </div>
</section>`;

  const css = `.bi-data-table {
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid var(--bi-border);
  border-radius: calc(var(--bi-radius) + 2px);
  background: var(--bi-card);
  color: var(--bi-fg);
  box-shadow: var(--bi-shadow);
  font-family: var(--bi-font-body);
}
.bi-table-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 1rem 1rem 0.875rem; }
.bi-table-title { margin: 0; color: var(--bi-fg); font-family: var(--bi-font-heading); font-size: 0.9375rem; font-weight: 800; letter-spacing: -0.02em; }
.bi-table-sub { margin: 0.3rem 0 0; color: var(--bi-muted-fg); font-size: 0.6875rem; line-height: 1.45; }
.bi-table-count { flex: 0 0 auto; border: 1px solid var(--bi-border); border-radius: 999px; background: var(--bi-muted); color: var(--bi-muted-fg); padding: 0.28rem 0.5rem; font: 700 0.625rem var(--bi-font-mono); }
.bi-table-scroll { overflow-x: auto; border-top: 1px solid var(--bi-border); }
.bi-table { width: 100%; min-width: 42rem; border-collapse: collapse; color: var(--bi-fg); font-size: 0.75rem; }
.bi-table th { background: color-mix(in srgb, var(--bi-muted) 74%, transparent); color: var(--bi-muted-fg); padding: 0.625rem 0.875rem; text-align: left; font-size: 0.625rem; font-weight: 800; letter-spacing: 0.075em; text-transform: uppercase; white-space: nowrap; }
.bi-table td { padding: 0.75rem 0.875rem; border-top: 1px solid var(--bi-border); vertical-align: middle; }
.bi-table tbody tr { transition: background 150ms ease; }
.bi-table tbody tr:hover { background: color-mix(in srgb, var(--bi-primary) 5%, transparent); }
.bi-table tbody tr[hidden] { display: none; }
.bi-td-mono { color: var(--bi-fg); font-family: var(--bi-font-mono); font-size: 0.6875rem; font-weight: 700; white-space: nowrap; }
.bi-table-customer { display: block; color: var(--bi-fg); font-weight: 700; }
.bi-table-item, .bi-table-date { color: var(--bi-muted-fg); font-size: 0.6875rem; }
.bi-table-item { display: block; margin-top: 0.15rem; }
.bi-badge { display: inline-flex; align-items: center; border-radius: 999px; padding: 0.24rem 0.5rem; font-size: 0.625rem; font-weight: 800; line-height: 1; white-space: nowrap; }
.bi-badge--success { background: color-mix(in srgb, #10b981 14%, transparent); color: #047857; }
.bi-badge--warning { background: color-mix(in srgb, #f59e0b 16%, transparent); color: #b45309; }
.bi-badge--danger { background: color-mix(in srgb, #ef4444 13%, transparent); color: #b91c1c; }
.bi-badge--neutral { background: var(--bi-muted); color: var(--bi-muted-fg); }
@media (max-width: 640px) { .bi-table-header { padding-inline: 0.875rem; } .bi-table { min-width: 36rem; } .bi-table th, .bi-table td { padding-inline: 0.625rem; } }`;

  return { html, css };
}
