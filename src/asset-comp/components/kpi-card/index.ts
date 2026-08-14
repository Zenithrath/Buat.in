import type { ComponentRegistryItem } from "@/lib/registry/types";
import { kpiCardManifest } from "./manifest";
import { KpiCardPreview } from "./preview";
import { kpiCardExport } from "./export";

export const kpiCardComponent: ComponentRegistryItem = {
  ...kpiCardManifest,
  previewRenderer: KpiCardPreview,
  exportAdapter: kpiCardExport,
};
