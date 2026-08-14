import type { ComponentRegistryItem } from "@/lib/registry/types";
import { navbarCenteredExport } from "./export";
import { navbarCenteredManifest } from "./manifest";
import { NavbarCenteredPreview } from "./preview";

export const navbarCenteredComponent: ComponentRegistryItem = {
  ...navbarCenteredManifest,
  previewRenderer: NavbarCenteredPreview,
  exportAdapter: navbarCenteredExport,
};
