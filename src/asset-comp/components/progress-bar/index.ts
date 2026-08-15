import type { ComponentRegistryItem } from "@/lib/registry/types";
import { progressBarManifest } from "./manifest";
import { ProgressBarPreview } from "./preview";
import { progressBarExport } from "./export";

export const progressBarComponent: ComponentRegistryItem = {
  ...progressBarManifest,
  previewRenderer: ProgressBarPreview,
  exportAdapter: progressBarExport,
};
