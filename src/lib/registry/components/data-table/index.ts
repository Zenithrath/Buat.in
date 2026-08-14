import type { ComponentManifest } from "@/lib/registry/types";
import { dataTableManifest } from "./manifest";
import { dataTableExportAdapter } from "./export";
import { DataTablePreview } from "./preview";

export const dataTable: ComponentManifest = {
  ...dataTableManifest,
  previewRenderer: DataTablePreview,
  exportAdapter: dataTableExportAdapter,
};
