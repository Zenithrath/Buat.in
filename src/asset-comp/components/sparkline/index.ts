import type { ComponentRegistryItem } from "@/lib/registry/types";
import { sparklineManifest } from "./manifest";
import { SparklinePreview } from "./preview";
import { sparklineExport } from "./export";

export const sparklineComponent: ComponentRegistryItem = {
  ...sparklineManifest,
  previewRenderer: SparklinePreview,
  exportAdapter: sparklineExport,
};
