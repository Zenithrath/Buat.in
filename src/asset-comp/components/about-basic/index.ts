import type { ComponentRegistryItem } from "@/lib/registry/types";
import { aboutManifest } from "./manifest";
import { AboutPreview } from "./preview";
import { aboutExport } from "./export";

export const aboutBasicComponent: ComponentRegistryItem = {
  ...aboutManifest,
  previewRenderer: AboutPreview,
  exportAdapter: aboutExport,
};
