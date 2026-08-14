import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarSplitExport } from "./export";
import { navbarSplitManifest } from "./manifest";
import { NavbarSplitPreview } from "./preview";

export const navbarSplitComponent: ComponentRegistryItem = {
  ...navbarSplitManifest,
  previewRenderer: NavbarSplitPreview,
  exportAdapter: navbarSplitExport,
};
