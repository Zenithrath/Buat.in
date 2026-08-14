import type { ComponentManifest } from "@/lib/registry/types";

export const appSidebarManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "app-sidebar",
  name: "App Sidebar",
  category: "dashboard",
  description: "Navigasi samping khusus dashboard dengan logo, menu reorderable, dan profil pengguna.",
  tier: "free",
  priceKey: "app-sidebar",
  version: "1.0.0",
  defaultProps: {
    brandName: "Acme Analytics",
    brandTag: "PRO",
    userName: "Alex Rivers",
    userRole: "Administrator",
    linksJson: JSON.stringify([
      { id: "s1", label: "Overview", icon: "layout-dashboard", active: true },
      { id: "s2", label: "Analytics", icon: "bar-chart-3", active: false },
      { id: "s3", label: "Transaksi", icon: "credit-card", active: false },
      { id: "s4", label: "Pengguna", icon: "users", active: false },
      { id: "s5", label: "Pengaturan", icon: "settings", active: false },
    ]),
  },
  contentControls: [
    { key: "brandName", label: "Nama Brand / App", group: "Header", type: "text" },
    { key: "brandTag", label: "Label Badge", group: "Header", type: "text" },
    { key: "userName", label: "Nama User", group: "User", type: "text" },
    { key: "userRole", label: "Peran User", group: "User", type: "text" },
    {
      key: "linksJson",
      label: "Menu Navigasi (JSON)",
      group: "Menu",
      type: "json",
    },
  ],
};
