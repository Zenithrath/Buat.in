import type { ComponentRegistryItem } from "@/lib/registry/types";
import { footerManifest } from "./manifest";
import { FooterPreview } from "./preview";
import { footerExport } from "./export";

export const footerBasicComponent: ComponentRegistryItem = {
  ...footerManifest,
  previewRenderer: FooterPreview,
  exportAdapter: footerExport,
};
