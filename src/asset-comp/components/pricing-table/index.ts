import type { ComponentRegistryItem } from "@/lib/registry/types";
import { pricingTableExport } from "./export";
import { pricingTableManifest } from "./manifest";
import { PricingTablePreview } from "./preview";

export const pricingTableComponent: ComponentRegistryItem = {
  ...pricingTableManifest,
  previewRenderer: PricingTablePreview,
  exportAdapter: pricingTableExport,
};
