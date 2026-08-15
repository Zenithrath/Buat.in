import type { ComponentRegistryItem } from "@/lib/registry/types";
import { processStepsManifest } from "./manifest";
import { ProcessStepsPreview } from "./preview";
import { processStepsExport } from "./export";

export const processStepsComponent: ComponentRegistryItem = {
  ...processStepsManifest,
  previewRenderer: ProcessStepsPreview,
  exportAdapter: processStepsExport,
};
