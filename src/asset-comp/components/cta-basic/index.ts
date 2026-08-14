import type { ComponentRegistryItem } from "@/lib/registry/types";
import { ctaManifest } from "./manifest";
import { CtaPreview } from "./preview";
import { ctaExport } from "./export";

export const ctaBasicComponent: ComponentRegistryItem = {
  ...ctaManifest,
  previewRenderer: CtaPreview,
  exportAdapter: ctaExport,
};
