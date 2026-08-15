import type { ComponentManifest } from "@/lib/registry/types";

export const dataTableManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "data-table",
  name: "Data Table",
  category: "dashboard",
  description: "Tabel data interaktif dengan header, badge status, baris transaksi, dan navigasi halaman.",
  tier: "free",
  priceKey: "data-table",
  version: "1.0.0",
  defaultProps: {
    title: "Transaksi Terbaru",
    subtitle: "Daftar 5 transaksi pelanggan terbaru",
    rowsJson: JSON.stringify([
      { id: "TX101", customer: "Budi Santoso", item: "Paket Premium", amount: "Rp 499.000", status: "Selesai", date: "14 Aug 2026" },
      { id: "TX102", customer: "Siti Rahma", item: "Paket Hemat", amount: "Rp 99.000", status: "Proses", date: "14 Aug 2026" },
      { id: "TX103", customer: "Dewi Lestari", item: "Paket Keluarga", amount: "Rp 249.000", status: "Selesai", date: "13 Aug 2026" },
      { id: "TX104", customer: "Andi Wijaya", item: "Paket Spesial", amount: "Rp 799.000", status: "Batal", date: "12 Aug 2026" },
      { id: "TX105", customer: "Rian Hidayat", item: "Paket Hemat", amount: "Rp 99.000", status: "Selesai", date: "11 Aug 2026" },
    ]),
  },
  contentControls: [
    { key: "title", label: "Judul Tabel", group: "Header", type: "text" },
    { key: "subtitle", label: "Subjudul Tabel", group: "Header", type: "text" },
    { key: "rowsJson", label: "Baris Data (JSON)", group: "Data", type: "json" },
  ],
};
