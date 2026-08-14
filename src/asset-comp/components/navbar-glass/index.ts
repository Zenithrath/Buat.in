import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarGlassExport } from "./export";
import { navbarGlassManifest } from "./manifest";
import { NavbarGlassPreview } from "./preview";

export const navbarGlassComponent: ComponentRegistryItem = {
  ...navbarGlassManifest,
  previewRenderer: NavbarGlassPreview,
  exportAdapter: navbarGlassExport,
};
