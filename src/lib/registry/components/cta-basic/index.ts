import type { ComponentManifest } from "@/lib/registry/types";
import { ctaManifest } from "./manifest";
import { ctaExportAdapter } from "./export";
import { CtaPreview } from "./preview";

export const ctaBasic: ComponentManifest = {
  ...ctaManifest,
  previewRenderer: CtaPreview,
  exportAdapter: ctaExportAdapter,
};