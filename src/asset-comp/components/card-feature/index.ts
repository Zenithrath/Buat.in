import type { ComponentRegistryItem } from "@/lib/registry/types";
import { cardFeatureExport } from "./export";
import { cardFeatureManifest } from "./manifest";
import { CardFeaturePreview } from "./preview";

export const cardFeatureComponent: ComponentRegistryItem = {
  ...cardFeatureManifest,
  previewRenderer: CardFeaturePreview,
  exportAdapter: cardFeatureExport,
};
