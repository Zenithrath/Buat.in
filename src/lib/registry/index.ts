import type {
  ComponentCategory,
  ComponentRegistryItem,
  ComponentScope,
} from "./types";

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
  navbarGlassComponent,
  navbarMegaComponent,
  navbarFullscreenComponent,
  navbarCenteredComponent,
  navbarSplitComponent,
  dropdownMenuComponent,
  menuOffcanvasComponent,
  menuCircleComponent,
  heroCenteredComponent,
  heroSplitComponent,
  heroBgImageComponent,
  productGridBasicComponent,
  aboutBasicComponent,
  ctaBasicComponent,
  footerBasicComponent,
  cardFeatureComponent,
  pricingTableComponent,
  testimonialGridComponent,
  teamGridComponent,
  statsBannerComponent,
  galleryGridComponent,
  faqAccordionComponent,
  formContactComponent,
  formNewsletterComponent,
  modalCenterComponent,
  modalSheetComponent,
  modalConfirmComponent,
  dashboardActivityListComponent,
  sidebarIconComponent,
  sectionBasicComponent,
  breadcrumbComponent,
  backToTopComponent,
  logoClientsComponent,
  sliderTestimonialComponent,
  socialProofComponent,
  processStepsComponent,
  bannerPromoComponent,
  stackAvatarComponent,
  progressBarComponent,
  paginationComponent,
  formAddDataComponent,
  barFilterComponent,
  sparklineComponent,
  calendarWidgetComponent,
} from "@/asset-comp";

export type { ComponentCategory };

export const componentRegistry: ComponentRegistryItem[] = [
  // Dashboard components
  appSidebarComponent,
  dashboardHeaderComponent,
  kpiCardComponent,
  chartCardComponent,
  dataTableComponent,
  dashboardActivityListComponent,
  sidebarIconComponent,
  gridContainerComponent,
  // Landing page components
  navbarMinimalComponent,
  navbarGlassComponent,
  navbarMegaComponent,
  navbarFullscreenComponent,
  navbarCenteredComponent,
  navbarSplitComponent,
  dropdownMenuComponent,
  menuOffcanvasComponent,
  menuCircleComponent,
  heroCenteredComponent,
  heroSplitComponent,
  heroBgImageComponent,
  productGridBasicComponent,
  aboutBasicComponent,
  ctaBasicComponent,
  footerBasicComponent,
  cardFeatureComponent,
  pricingTableComponent,
  testimonialGridComponent,
  teamGridComponent,
  statsBannerComponent,
  galleryGridComponent,
  faqAccordionComponent,
  formContactComponent,
  formNewsletterComponent,
  modalCenterComponent,
  modalSheetComponent,
  modalConfirmComponent,
  // Generic content
  sectionBasicComponent,
  breadcrumbComponent,
  backToTopComponent,
  logoClientsComponent,
  sliderTestimonialComponent,
  socialProofComponent,
  processStepsComponent,
  bannerPromoComponent,
  // Dashboard data & widgets
  stackAvatarComponent,
  progressBarComponent,
  paginationComponent,
  formAddDataComponent,
  barFilterComponent,
  sparklineComponent,
  calendarWidgetComponent,
];

export const componentMap: Record<string, ComponentRegistryItem> =
  Object.fromEntries(componentRegistry.map((c) => [c.id, c]));

/** Documents lama dibuat sebelum field `scope` ada. */
export function getComponentScope(component: ComponentRegistryItem): ComponentScope {
  if (component.scope) return component.scope;
  return component.category === "dashboard" ? "dashboard" : "landing";
}

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
