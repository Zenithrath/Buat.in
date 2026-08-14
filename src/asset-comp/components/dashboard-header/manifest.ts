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
  version: "1.0.0",
  defaultProps: {
    title: "Overview Dashboard",
    breadcrumb: "Dashboard / Analytics",
    searchPlaceholder: "Cari data...",
    showSearch: true,
    showNotifications: true,
    actionText: "Export Laporan",
  },
  contentControls: [
    { key: "title", label: "Judul Halaman", group: "Header", type: "text" },
    { key: "breadcrumb", label: "Breadcrumb Text", group: "Header", type: "text" },
    { key: "searchPlaceholder", label: "Placeholder Search", group: "Header", type: "text" },
    { key: "showSearch", label: "Tampilkan Pencarian", group: "Search", type: "boolean" },
    { key: "showNotifications", label: "Tampilkan Notifikasi", group: "Aksi", type: "boolean" },
    { key: "actionText", label: "Label Tombol Aksi", group: "Header", type: "text" },
  ],
};
