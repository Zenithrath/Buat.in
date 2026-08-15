import type { ComponentRegistryItem } from "@/lib/registry/types";
import { backToTopExport } from "./export";
import { backToTopManifest } from "./manifest";
import { BackToTopPreview } from "./preview";

export const backToTopComponent: ComponentRegistryItem = {
  ...backToTopManifest,
  previewRenderer: BackToTopPreview,
  exportAdapter: backToTopExport,
};