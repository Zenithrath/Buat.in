"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { MoreHorizontal } from "lucide-react";
import { InlineEditableText } from "@/components/preview/InlineEditable";
import { nodeList } from "../_shared/content";
import { useRepeaterEditor } from "../_shared/inline";

interface RowItem {
  id: string;
  customer: string;
  item: string;
  amount: string;
  status: string;
  date: string;
}

const FALLBACK_ROWS: RowItem[] = [
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
  {
    id: "TRX-003",
    customer: "Dewi Lestari",
    item: "Audit identitas visual",
    amount: "Rp 2.400.000",
    status: "Selesai",
    date: "13 Agu 2026",
  },
  {
    id: "TRX-004",
    customer: "Andi Wijaya",
    item: "Workshop arah brand",
    amount: "Rp 450.000",
    status: "Batal",
    date: "12 Agu 2026",
  },
];

function normalizeRows(value: unknown): RowItem[] {
  if (!Array.isArray(value)) return FALLBACK_ROWS;

  const rows = value.flatMap((item, index): RowItem[] => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const id = String(row.id ?? `TRX-${String(index + 1).padStart(3, "0")}`).trim();
    const customer = String(row.customer ?? row.client ?? "").trim();
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

export function DataTablePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const { setValue } = useRepeaterEditor(node, "rowsJson");
  const title = propString(node, "title").trim() || "Transaksi Terbaru";
  const subtitle = propString(node, "subtitle").trim() || "Daftar pesanan dan transaksi pelanggan";
  const rows = normalizeRows(nodeList(node, "rowsJson"));

  return (
    <div
      className="bi-data-table flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all overflow-hidden"
      style={themeTokenStyle(tokens)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground"><InlineEditableText node={node} propKey="title" fallback="Transaksi Terbaru" value={title} /></h3>
          <p className="text-[11px] text-muted-foreground"><InlineEditableText node={node} propKey="subtitle" fallback="Daftar pesanan dan transaksi pelanggan" value={subtitle} /></p>
        </div>
        <span className="rounded bg-muted px-2 py-1 font-mono text-[10px] font-bold text-muted-foreground">
          {rows.length} Total Data
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-muted/50 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="px-3.5 py-2.5">ID Transaksi</th>
              <th className="px-3.5 py-2.5">Pelanggan</th>
              <th className="px-3.5 py-2.5">Tanggal</th>
              <th className="px-3.5 py-2.5">Total</th>
              <th className="px-3.5 py-2.5">Status</th>
              <th className="px-3.5 py-2.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row, index) => (
              <tr
                key={row.id}
                data-dashboard-row
                data-search-text={[row.id, row.customer, row.item, row.amount, row.status, row.date].join(" ")}
                className="hover:bg-muted/30 transition-colors"
              >
                <td className="px-3.5 py-2.5 font-mono text-[11px] font-bold text-foreground">
                  <InlineEditableText node={node} propKey="rowsJson" value={row.id} onCommit={(next) => setValue(index, "id", next)} />
                </td>
                <td className="px-3.5 py-2.5 font-medium text-foreground">
                  <InlineEditableText node={node} propKey="rowsJson" value={row.customer} onCommit={(next) => setValue(index, "customer", next)} />
                  {row.item ? (
                    <span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">
                      <InlineEditableText node={node} propKey="rowsJson" value={row.item} onCommit={(next) => setValue(index, "item", next)} />
                    </span>
                  ) : null}
                </td>
                <td className="px-3.5 py-2.5 text-muted-foreground"><InlineEditableText node={node} propKey="rowsJson" value={row.date} onCommit={(next) => setValue(index, "date", next)} /></td>
                <td className="px-3.5 py-2.5 font-mono font-semibold text-foreground">
                  <InlineEditableText node={node} propKey="rowsJson" value={row.amount} onCommit={(next) => setValue(index, "amount", next)} />
                </td>
                <td className="px-3.5 py-2.5">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      row.status === "Selesai"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : row.status === "Proses"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    <InlineEditableText node={node} propKey="rowsJson" value={row.status} onCommit={(next) => setValue(index, "status", next)} />
                  </span>
                </td>
                <td className="px-3.5 py-2.5 text-right">
                  <button
                    type="button"
                    className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
