import type { ComponentManifest } from "@/lib/registry/types";
import { heroManifest } from "./manifest";
import { heroExportAdapter } from "./export";
import { HeroPreview } from "./preview";

export const heroCentered: ComponentManifest = {
  ...heroManifest,
  previewRenderer: HeroPreview,
  exportAdapter: heroExportAdapter,
};