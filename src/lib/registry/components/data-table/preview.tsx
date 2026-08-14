"use client";

import type { Node, Theme } from "@/lib/schema/types";
import { resolveTheme } from "@/lib/theme/presets";
import { propString, themeTokenStyle } from "@/lib/registry/shared";
import { CheckCircle2, Clock, XCircle, MoreHorizontal } from "lucide-react";

interface RowData {
  id: string;
  customer: string;
  item: string;
  amount: string;
  status: string;
  date: string;
}

export function DataTablePreview({ node, theme }: { node: Node; theme: Theme }) {
  const tokens = resolveTheme(theme);
  const title = propString(node, "title") || "Transaksi Terbaru";
  const subtitle = propString(node, "subtitle") || "Daftar transaksi pelanggan";

  let rows: RowData[] = [];
  try {
    const raw = propString(node, "rowsJson");
    rows = raw ? JSON.parse(raw) : [];
  } catch {
    rows = [
      { id: "TX101", customer: "Budi Santoso", item: "Paket Premium", amount: "Rp 499.000", status: "Selesai", date: "14 Aug 2026" },
      { id: "TX102", customer: "Siti Rahma", item: "Paket Hemat", amount: "Rp 99.000", status: "Proses", date: "14 Aug 2026" },
    ];
  }

  return (
    <div
      className="bi-data-table flex flex-col rounded-xl border bg-card shadow-sm overflow-hidden"
      style={themeTokenStyle(tokens)}
    >
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h3 className="text-sm font-bold tracking-tight text-foreground">{title}</h3>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
        </div>
        <button
          type="button"
          className="rounded-md border px-3 py-1 text-xs font-semibold text-foreground hover:bg-muted"
        >
          Lihat Semua
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b bg-muted/40 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Pelanggan</th>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Nominal</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, idx) => {
              const isDone = r.status === "Selesai";
              const isPending = r.status === "Proses";
              return (
                <tr key={r.id || idx} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-muted-foreground">
                    {r.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {r.customer}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{r.item}</td>
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {r.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        isDone
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : isPending
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={12} />
                      ) : isPending ? (
                        <Clock size={12} />
                      ) : (
                        <XCircle size={12} />
                      )}
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
