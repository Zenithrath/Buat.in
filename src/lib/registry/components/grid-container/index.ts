import type { ComponentManifest } from "@/lib/registry/types";
import { gridContainerManifest } from "./manifest";
import { gridContainerExportAdapter } from "./export";
import { GridContainerPreview } from "./preview";

export const gridContainer: ComponentManifest = {
  ...gridContainerManifest,
  previewRenderer: GridContainerPreview,
  exportAdapter: gridContainerExportAdapter,
};
