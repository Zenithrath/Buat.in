import type { ComponentRegistryItem } from "@/lib/registry/types";
import { chartCardManifest } from "./manifest";
import { ChartCardPreview } from "./preview";
import { chartCardExport } from "./export";

export const chartCardComponent: ComponentRegistryItem = {
  ...chartCardManifest,
  previewRenderer: ChartCardPreview,
  exportAdapter: chartCardExport,
};
