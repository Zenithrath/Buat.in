import type { ComponentRegistryItem } from "@/lib/registry/types";
import { dashboardActivityListExport } from "./export";
import { dashboardActivityListManifest } from "./manifest";
import { DashboardActivityListPreview } from "./preview";

export const dashboardActivityListComponent: ComponentRegistryItem = {
  ...dashboardActivityListManifest,
  previewRenderer: DashboardActivityListPreview,
  exportAdapter: dashboardActivityListExport,
};
