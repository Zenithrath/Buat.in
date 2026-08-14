import type { ComponentRegistryItem } from "@/lib/registry/types";
import { gridContainerManifest } from "./manifest";
import { GridContainerPreview } from "./preview";
import { gridContainerExport } from "./export";

export const gridContainerComponent: ComponentRegistryItem = {
  ...gridContainerManifest,
  previewRenderer: GridContainerPreview,
  exportAdapter: gridContainerExport,
};
