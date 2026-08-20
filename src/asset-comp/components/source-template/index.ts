import type { ComponentRegistryItem } from "@/lib/registry/types";
import { sourceTemplateExport } from "./export";
import { sourceTemplateManifest } from "./manifest";
import { SourceTemplatePreview } from "./preview";

export const sourceTemplateComponent: ComponentRegistryItem = {
  ...sourceTemplateManifest,
  previewRenderer: SourceTemplatePreview,
  exportAdapter: sourceTemplateExport,
};
