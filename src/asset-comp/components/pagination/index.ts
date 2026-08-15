import type { ComponentRegistryItem } from "@/lib/registry/types";
import { paginationManifest } from "./manifest";
import { PaginationPreview } from "./preview";
import { paginationExport } from "./export";

export const paginationComponent: ComponentRegistryItem = {
  ...paginationManifest,
  previewRenderer: PaginationPreview,
  exportAdapter: paginationExport,
};
