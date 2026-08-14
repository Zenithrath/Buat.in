import type { ComponentRegistryItem } from "@/lib/registry/types";
import { productGridManifest } from "./manifest";
import { ProductGridPreview } from "./preview";
import { productGridExport } from "./export";

export const productGridBasicComponent: ComponentRegistryItem = {
  ...productGridManifest,
  previewRenderer: ProductGridPreview,
  exportAdapter: productGridExport,
};
