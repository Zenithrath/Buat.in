import type { ComponentManifest } from "@/lib/registry/types";
import { aboutManifest } from "./manifest";
import { aboutExportAdapter } from "./export";
import { AboutPreview } from "./preview";

export const aboutBasic: ComponentManifest = {
  ...aboutManifest,
  previewRenderer: AboutPreview,
  exportAdapter: aboutExportAdapter,
};