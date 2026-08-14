import type { ComponentManifest } from "@/lib/registry/types";

export const dashboardActivityListManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "dashboard-activity-list",
  name: "Daftar Aktivitas",
  category: "dashboard",
  scope: "dashboard",
  description: "Daftar pembaruan terbaru dengan inisial, waktu, dan status yang mudah dipindai.",
  tier: "free",
  priceKey: "dashboard-activity-list",
  version: "2.0.0",
  defaultProps: {
    title: "Aktivitas terbaru",
    description: "Pembaruan yang perlu diketahui tim hari ini.",
    items: [
      { initials: "NA", title: "Nadia mengundang anggota baru", description: "Tim desain sekarang memiliki akses ke workspace utama.", time: "Baru saja", status: "success" },
      { initials: "RP", title: "Laporan penjualan siap ditinjau", description: "Ringkasan periode Juli sudah diperbarui dengan data terbaru.", time: "12 menit lalu", status: "pending" },
      { initials: "DK", title: "Ada pembayaran yang perlu dicek", description: "Satu transaksi menunggu konfirmasi dari tim keuangan.", time: "1 jam lalu", status: "warning" },
      { initials: "SM", title: "Salsa menyelesaikan catatan proyek", description: "Semua perubahan pada brief kampanye sudah tersimpan.", time: "Kemarin", status: "success" },
    ],
  },
  contentControls: [
    { key: "title", label: "Judul daftar", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "text" },
    { key: "items", label: "Aktivitas", group: "Daftar aktivitas", type: "array", itemSchema: [
      { key: "initials", label: "Inisial", type: "text" },
      { key: "title", label: "Judul aktivitas", type: "text" },
      { key: "description", label: "Penjelasan", type: "textarea" },
      { key: "time", label: "Waktu", type: "text" },
      { key: "status", label: "Status", type: "select", options: [
        { value: "success", label: "Selesai" },
        { value: "pending", label: "Menunggu" },
        { value: "warning", label: "Perlu perhatian" },
      ] },
    ] },
  ],
};
