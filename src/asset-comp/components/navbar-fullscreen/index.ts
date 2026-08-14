import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarFullscreenExport } from "./export";
import { navbarFullscreenManifest } from "./manifest";
import { NavbarFullscreenPreview } from "./preview";

export const navbarFullscreenComponent: ComponentRegistryItem = {
  ...navbarFullscreenManifest,
  previewRenderer: NavbarFullscreenPreview,
  exportAdapter: navbarFullscreenExport,
};
