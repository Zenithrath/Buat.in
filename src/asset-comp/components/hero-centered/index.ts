import type { ComponentRegistryItem } from "@/lib/registry/types";
import { heroManifest } from "./manifest";
import { HeroPreview } from "./preview";
import { heroExport } from "./export";

export const heroCenteredComponent: ComponentRegistryItem = {
  ...heroManifest,
  previewRenderer: HeroPreview,
  exportAdapter: heroExport,
};
