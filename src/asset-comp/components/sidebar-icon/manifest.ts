import type { ComponentManifest } from "@/lib/registry/types";

export const sidebarIconManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "sidebar-icon",
  name: "Sidebar Ikon",
  category: "dashboard",
  scope: "dashboard",
  description: "Navigasi dashboard hemat ruang yang dapat dibuka atau diciutkan tanpa menghilangkan akses menu.",
  tier: "free",
  priceKey: "sidebar-icon",
  version: "2.0.0",
  defaultProps: {
    logoText: "B",
    workspaceLabel: "Workspace",
    statusLabel: "Terhubung",
    defaultOpen: true,
    links: [
      { icon: "home", label: "Ringkasan", url: "#ringkasan" },
      { icon: "chart", label: "Analitik", url: "#analitik" },
      { icon: "folder", label: "Proyek", url: "#proyek" },
      { icon: "users", label: "Tim", url: "#tim" },
      { icon: "settings", label: "Pengaturan", url: "#pengaturan" },
    ],
  },
  contentControls: [
    { key: "logoText", label: "Teks logo", group: "Header", type: "text" },
    { key: "workspaceLabel", label: "Nama ruang kerja", group: "Header", type: "text" },
    { key: "statusLabel", label: "Label status", group: "Status", type: "text" },
    { key: "defaultOpen", label: "Buka sidebar saat pertama tampil", group: "Tata letak", type: "boolean" },
    { key: "links", label: "Menu sidebar", group: "Navigasi", type: "array", itemSchema: [
      { key: "icon", label: "Ikon", type: "select", options: [
        { value: "home", label: "Rumah" },
        { value: "chart", label: "Grafik" },
        { value: "folder", label: "Folder" },
        { value: "users", label: "Tim" },
        { value: "card", label: "Kartu" },
        { value: "bell", label: "Notifikasi" },
        { value: "settings", label: "Pengaturan" },
      ] },
      { key: "label", label: "Nama menu", type: "text" },
      { key: "url", label: "Tujuan menu", type: "link" },
    ] },
  ],
};
