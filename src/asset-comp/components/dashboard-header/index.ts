import type { ComponentRegistryItem } from "@/lib/registry/types";
import { dashboardHeaderManifest } from "./manifest";
import { DashboardHeaderPreview } from "./preview";
import { dashboardHeaderExport } from "./export";

export const dashboardHeaderComponent: ComponentRegistryItem = {
  ...dashboardHeaderManifest,
  previewRenderer: DashboardHeaderPreview,
  exportAdapter: dashboardHeaderExport,
};
