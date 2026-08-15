import type { ComponentRegistryItem } from "@/lib/registry/types";
import { breadcrumbExport } from "./export";
import { breadcrumbManifest } from "./manifest";
import { BreadcrumbPreview } from "./preview";

export const breadcrumbComponent: ComponentRegistryItem = {
  ...breadcrumbManifest,
  previewRenderer: BreadcrumbPreview,
  exportAdapter: breadcrumbExport,
};