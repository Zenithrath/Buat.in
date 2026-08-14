import type { ComponentManifest } from "@/lib/registry/types";
import { kpiCardManifest } from "./manifest";
import { kpiCardExportAdapter } from "./export";
import { KpiCardPreview } from "./preview";

export const kpiCard: ComponentManifest = {
  ...kpiCardManifest,
  previewRenderer: KpiCardPreview,
  exportAdapter: kpiCardExportAdapter,
};
