"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { MoreHorizontal } from "lucide-react";

interface RowItem {
  id: string;
  customer: string;
  amount: string;
  status: string;
  date: string;
}

export function DataTablePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Transaksi Terbaru";
  const subtitle = propString(node, "subtitle") || "Daftar pesanan dan transaksi pelanggan";

  let rows: RowItem[] = [];
  try {
    rows = JSON.parse(propString(node, "rowsJson"));
  } catch {
    rows = [
      { id: "TRX-001", customer: "Budi Santoso", amount: "Rp 1.250.000", status: "Selesai", date: "14 Agu 2026" },
      { id: "TRX-002", customer: "Siti Rahma", amount: "Rp 850.000", status: "Proses", date: "14 Agu 2026" },
      { id: "TRX-003", customer: "Dewi Lestari", amount: "Rp 2.400.000", status: "Selesai", date: "13 Agu 2026" },
      { id: "TRX-004", customer: "Andi Wijaya", amount: "Rp 450.000", status: "Batal", date: "12 Agu 2026" },
    ];
  }

  return (
    <div
      className="bi-data-table flex flex-col rounded-xl border bg-card p-5 shadow-sm transition-all overflow-hidden"
      style={themeTokenStyle(tokens)}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
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
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-3.5 py-2.5 font-mono text-[11px] font-bold text-foreground">
                  {row.id}
                </td>
                <td className="px-3.5 py-2.5 font-medium text-foreground">
                  {row.customer}
                </td>
                <td className="px-3.5 py-2.5 text-muted-foreground">{row.date}</td>
                <td className="px-3.5 py-2.5 font-mono font-semibold text-foreground">
                  {row.amount}
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
                    {row.status}
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
