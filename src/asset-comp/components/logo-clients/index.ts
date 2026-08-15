import type { ComponentRegistryItem } from "@/lib/registry/types";
import { logoClientsExport } from "./export";
import { logoClientsManifest } from "./manifest";
import { LogoClientsPreview } from "./preview";

export const logoClientsComponent: ComponentRegistryItem = {
  ...logoClientsManifest,
  previewRenderer: LogoClientsPreview,
  exportAdapter: logoClientsExport,
};