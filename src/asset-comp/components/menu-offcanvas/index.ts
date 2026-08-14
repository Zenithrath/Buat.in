import type { ComponentRegistryItem } from "@/lib/registry/types";
import { menuOffcanvasExport } from "./export";
import { menuOffcanvasManifest } from "./manifest";
import { MenuOffcanvasPreview } from "./preview";

export const menuOffcanvasComponent: ComponentRegistryItem = {
  ...menuOffcanvasManifest,
  previewRenderer: MenuOffcanvasPreview,
  exportAdapter: menuOffcanvasExport,
};
