import type { ComponentRegistryItem } from "@/lib/registry/types";
import { dataTableManifest } from "./manifest";
import { DataTablePreview } from "./preview";
import { dataTableExport } from "./export";

export const dataTableComponent: ComponentRegistryItem = {
  ...dataTableManifest,
  previewRenderer: DataTablePreview,
  exportAdapter: dataTableExport,
};
