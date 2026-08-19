import type { ComponentManifest } from "@/lib/registry/types";

export const dashboardHeaderManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "dashboard-header",
  name: "Dashboard Header",
  category: "dashboard",
  scope: "dashboard",
  description: "Header navigasi atas dashboard dengan breadcrumbs, pencarian global, notifikasi, dan tombol aksi.",
  tier: "free",
  priceKey: "dashboard-header",
  version: "1.1.0",
  defaultProps: {
    title: "Ringkasan",
    breadcrumb: "Dashboard / Ringkasan",
    searchPlaceholder: "Cari data, laporan, atau transaksi...",
    showSearch: true,
    showNotifications: true,
    notificationsMode: "panel",
    notificationsJson: JSON.stringify([
      { id: "n1", title: "Laporan bulanan siap diunduh", time: "5 menit lalu" },
      { id: "n2", title: "Pembayaran baru diterima", time: "1 jam lalu" },
      { id: "n3", title: "Pengingat: rapat tim 14.00", time: "3 jam lalu" },
    ]),
    actionText: "Unduh Laporan",
  },
  contentControls: [
    { key: "title", label: "Judul Halaman", group: "Header", type: "text" },
    { key: "breadcrumb", label: "Breadcrumb Text", group: "Header", type: "text" },
    { key: "searchPlaceholder", label: "Placeholder Search", group: "Header", type: "text" },
    { key: "showSearch", label: "Tampilkan Pencarian", group: "Search", type: "boolean" },
    { key: "showNotifications", label: "Tampilkan Notifikasi", group: "Notifikasi", type: "boolean" },
    {
      key: "notificationsMode",
      label: "Tampilan Notifikasi",
      group: "Notifikasi",
      type: "select",
      options: [
        { value: "panel", label: "Panel dropdown" },
        { value: "modal", label: "Dialog modal" },
      ],
    },
    {
      key: "notificationsJson",
      label: "Daftar Notifikasi",
      group: "Notifikasi",
      type: "array",
      itemSchema: [
        { key: "title", label: "Judul", type: "text" },
        { key: "time", label: "Waktu", type: "text" },
      ],
    },
    { key: "actionText", label: "Label Tombol Aksi", group: "Header", type: "text" },
  ],
};
