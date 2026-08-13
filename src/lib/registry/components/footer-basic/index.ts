import type { ComponentManifest } from "@/lib/registry/types";
import { footerManifest } from "./manifest";
import { footerExportAdapter } from "./export";
import { FooterPreview } from "./preview";

export const footerBasic: ComponentManifest = {
  ...footerManifest,
  previewRenderer: FooterPreview,
  exportAdapter: footerExportAdapter,
};