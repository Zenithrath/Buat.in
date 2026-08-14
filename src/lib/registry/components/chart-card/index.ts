import type { ComponentManifest } from "@/lib/registry/types";
import { chartCardManifest } from "./manifest";
import { chartCardExportAdapter } from "./export";
import { ChartCardPreview } from "./preview";

export const chartCard: ComponentManifest = {
  ...chartCardManifest,
  previewRenderer: ChartCardPreview,
  exportAdapter: chartCardExportAdapter,
};
