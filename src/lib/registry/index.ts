import type { ComponentManifest, ComponentCategory } from "./types";
import { navbarMinimal } from "./components/navbar-minimal";
import { heroCentered } from "./components/hero-centered";
import { productGridBasic } from "./components/product-grid-basic";
import { aboutBasic } from "./components/about-basic";
import { ctaBasic } from "./components/cta-basic";
import { footerBasic } from "./components/footer-basic";

export type { ComponentCategory };

export const componentRegistry: ComponentManifest[] = [
  navbarMinimal,
  heroCentered,
  productGridBasic,
  aboutBasic,
  ctaBasic,
  footerBasic,
];

export const componentMap: Record<string, ComponentManifest> =
  Object.fromEntries(componentRegistry.map((c) => [c.id, c]));

export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  navbar: "Navigasi",
  hero: "Hero",
  product: "Produk",
  about: "Tentang",
  cta: "Ajakan",
  footer: "Footer",
};

export function getComponent(id: string): ComponentManifest | undefined {
  return componentMap[id];
}