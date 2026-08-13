import type { ComponentManifest } from "@/lib/registry/types";
import { productGridManifest } from "./manifest";
import { productGridExportAdapter } from "./export";
import { ProductGridPreview } from "./preview";

export const productGridBasic: ComponentManifest = {
  ...productGridManifest,
  previewRenderer: ProductGridPreview,
  exportAdapter: productGridExportAdapter,
};