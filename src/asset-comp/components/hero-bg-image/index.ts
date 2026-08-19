import type { ComponentRegistryItem } from "@/lib/registry/types";
import { heroBgImageManifest } from "./manifest";
import { HeroBgImagePreview } from "./preview";
import { heroBgImageExport } from "./export";

export const heroBgImageComponent: ComponentRegistryItem = {
  ...heroBgImageManifest,
  previewRenderer: HeroBgImagePreview,
  exportAdapter: heroBgImageExport,
};