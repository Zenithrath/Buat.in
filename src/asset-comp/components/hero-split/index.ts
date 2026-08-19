import type { ComponentRegistryItem } from "@/lib/registry/types";
import { heroSplitManifest } from "./manifest";
import { HeroSplitPreview } from "./preview";
import { heroSplitExport } from "./export";

export const heroSplitComponent: ComponentRegistryItem = {
  ...heroSplitManifest,
  previewRenderer: HeroSplitPreview,
  exportAdapter: heroSplitExport,
};