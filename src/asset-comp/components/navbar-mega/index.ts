import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarMegaExport } from "./export";
import { navbarMegaManifest } from "./manifest";
import { NavbarMegaPreview } from "./preview";

export const navbarMegaComponent: ComponentRegistryItem = {
  ...navbarMegaManifest,
  previewRenderer: NavbarMegaPreview,
  exportAdapter: navbarMegaExport,
};
