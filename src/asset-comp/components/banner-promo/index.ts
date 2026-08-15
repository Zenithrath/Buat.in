import type { ComponentRegistryItem } from "@/lib/registry/types";
import { bannerPromoManifest } from "./manifest";
import { BannerPromoPreview } from "./preview";
import { bannerPromoExport } from "./export";

export const bannerPromoComponent: ComponentRegistryItem = {
  ...bannerPromoManifest,
  previewRenderer: BannerPromoPreview,
  exportAdapter: bannerPromoExport,
};
