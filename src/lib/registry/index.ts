import type { ComponentCategory, ComponentRegistryItem } from "./types";

// ═══════════════════════════════════════════════════════════════
// Registry now sources from /src/asset-comp/ (canonical location)
// Old /src/lib/registry/components/ kept for backward compat only
// ═══════════════════════════════════════════════════════════════

import {
  appSidebarComponent,
  dashboardHeaderComponent,
  kpiCardComponent,
  chartCardComponent,
  dataTableComponent,
  gridContainerComponent,
  navbarMinimalComponent,
  heroCenteredComponent,
  productGridBasicComponent,
  aboutBasicComponent,
  ctaBasicComponent,
  footerBasicComponent,
} from "@/asset-comp";

export type { ComponentCategory };

export const componentRegistry: ComponentRegistryItem[] = [
  // Dashboard components
  appSidebarComponent,
  dashboardHeaderComponent,
  kpiCardComponent,
  chartCardComponent,
  dataTableComponent,
  gridContainerComponent,
  // Landing page components
  navbarMinimalComponent,
  heroCenteredComponent,
  productGridBasicComponent,
  aboutBasicComponent,
  ctaBasicComponent,
  footerBasicComponent,
];

export const componentMap: Record<string, ComponentRegistryItem> =
  Object.fromEntries(componentRegistry.map((c) => [c.id, c]));

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  dashboard: "Dashboard",
  landing: "Landing Page",
  layout: "Tata Letak",
  navigation: "Navigasi",
  typography: "Tipografi",
  actions: "Aksi / Tombol",
  media: "Media & Gambar",
  content: "Konten & Kartu",
  form: "Formulir",
  data: "Data & Grafik",
  navbar: "Navigasi",
  hero: "Hero",
  product: "Produk",
  about: "Tentang",
  cta: "Ajakan",
  footer: "Footer",
};

export function getComponent(id: string): ComponentRegistryItem | undefined {
  return componentMap[id];
}