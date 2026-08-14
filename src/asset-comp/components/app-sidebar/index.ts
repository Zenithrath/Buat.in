import type { ComponentRegistryItem } from "@/lib/registry/types";
import { appSidebarManifest } from "./manifest";
import { AppSidebarPreview } from "./preview";
import { appSidebarExport } from "./export";

export const appSidebarComponent: ComponentRegistryItem = {
  ...appSidebarManifest,
  previewRenderer: AppSidebarPreview,
  exportAdapter: appSidebarExport,
};
