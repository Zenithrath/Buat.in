import type { ComponentRegistryItem } from "@/lib/registry/types";
import { barFilterManifest } from "./manifest";
import { BarFilterPreview } from "./preview";
import { barFilterExport } from "./export";

export const barFilterComponent: ComponentRegistryItem = {
  ...barFilterManifest,
  previewRenderer: BarFilterPreview,
  exportAdapter: barFilterExport,
};
