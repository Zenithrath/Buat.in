import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarManifest } from "./manifest";
import { NavbarPreview } from "./preview";
import { navbarExport } from "./export";

export const navbarMinimalComponent: ComponentRegistryItem = {
  ...navbarManifest,
  previewRenderer: NavbarPreview,
  exportAdapter: navbarExport,
};
