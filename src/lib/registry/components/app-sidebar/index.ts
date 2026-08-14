import type { ComponentManifest } from "@/lib/registry/types";
import { appSidebarManifest } from "./manifest";
import { appSidebarExportAdapter } from "./export";
import { AppSidebarPreview } from "./preview";

export const appSidebar: ComponentManifest = {
  ...appSidebarManifest,
  previewRenderer: AppSidebarPreview,
  exportAdapter: appSidebarExportAdapter,
};
