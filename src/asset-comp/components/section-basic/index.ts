import type { ComponentRegistryItem } from "@/lib/registry/types";
import { sectionBasicExport } from "./export";
import { sectionBasicManifest } from "./manifest";
import { SectionBasicPreview } from "./preview";

export const sectionBasicComponent: ComponentRegistryItem = {
  ...sectionBasicManifest,
  previewRenderer: SectionBasicPreview,
  exportAdapter: sectionBasicExport,
};
