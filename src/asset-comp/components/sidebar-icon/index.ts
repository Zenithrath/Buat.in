import type { ComponentRegistryItem } from "@/lib/registry/types";
import { sidebarIconExport } from "./export";
import { sidebarIconManifest } from "./manifest";
import { SidebarIconPreview } from "./preview";

export const sidebarIconComponent: ComponentRegistryItem = {
  ...sidebarIconManifest,
  previewRenderer: SidebarIconPreview,
  exportAdapter: sidebarIconExport,
};
