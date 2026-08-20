import type { ComponentManifest } from "@/lib/registry/types";

export const appSidebarManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "app-sidebar",
  name: "App Sidebar",
  category: "dashboard",
  scope: "dashboard",
  description: "Navigasi samping khusus dashboard dengan logo, menu reorderable, dan profil pengguna.",
  tier: "free",
  priceKey: "app-sidebar",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    brandName: "Dasbor Tim",
    brandTag: "PRO",
    logoImageUrl: "",
    userName: "Alex Rivanto",
    userRole: "Admin",
    linksJson: JSON.stringify([
      { id: "s1", label: "Ringkasan", url: "/", icon: "layout-dashboard", active: true },
      { id: "s2", label: "Analitik", url: "#analitik", icon: "bar-chart-3", active: false },
      { id: "s3", label: "Transaksi", url: "#transaksi", icon: "credit-card", active: false },
      { id: "s4", label: "Pengguna", url: "#pengguna", icon: "users", active: false },
      { id: "s5", label: "Pengaturan", url: "#pengaturan", icon: "settings", active: false },
    ]),
  },
  contentControls: [
    { key: "brandName", label: "Nama Brand / App", group: "Header", type: "text" },
    { key: "brandTag", label: "Label Badge", group: "Header", type: "text" },
    { key: "logoImageUrl", label: "Logo Gambar (opsional)", group: "Header", type: "image" },
    { key: "userName", label: "Nama User", group: "User", type: "text" },
    { key: "userRole", label: "Peran User", group: "User", type: "text" },
    {
      key: "linksJson",
      label: "Menu Navigasi",
      group: "Menu",
      type: "array",
      itemSchema: [
        { key: "label", label: "Nama menu", type: "text" },
        { key: "url", label: "Tautan (URL atau #bagian)", type: "link" },
        { key: "icon", label: "Ikon", type: "text" },
        { key: "active", label: "Menu aktif", type: "boolean" },
      ],
    },
  ],
};
