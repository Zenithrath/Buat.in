import type { ComponentManifest } from "@/lib/registry/types";

export const dataTableManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "data-table",
  name: "Data Table",
  category: "dashboard",
  description: "Tabel data admin/dashboard dengan status badge, pencarian, dan pagination.",
  tier: "pro",
  priceKey: "data-table",
  version: "1.0.0",
  defaultProps: {
    title: "Transaksi Terbaru",
    subtitle: "Daftar pesanan dan transaksi pelanggan",
    rowsJson: JSON.stringify([
      { id: "TRX-001", customer: "Budi Santoso", amount: "Rp 1.250.000", status: "Selesai", date: "14 Agu 2026" },
      { id: "TRX-002", customer: "Siti Rahma", amount: "Rp 850.000", status: "Proses", date: "14 Agu 2026" },
      { id: "TRX-003", customer: "Dewi Lestari", amount: "Rp 2.400.000", status: "Selesai", date: "13 Agu 2026" },
      { id: "TRX-004", customer: "Andi Wijaya", amount: "Rp 450.000", status: "Batal", date: "12 Agu 2026" },
    ]),
  },
  contentControls: [
    { key: "title", label: "Judul Tabel", group: "Header", type: "text" },
    { key: "subtitle", label: "Deskripsi Sub-header", group: "Header", type: "text" },
    { key: "rowsJson", label: "Baris Data (JSON)", group: "Data", type: "json" },
  ],
};
