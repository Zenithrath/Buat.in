import type { ComponentManifest } from "@/lib/registry/types";
import { dashboardHeaderManifest } from "./manifest";
import { dashboardHeaderExportAdapter } from "./export";
import { DashboardHeaderPreview } from "./preview";

export const dashboardHeader: ComponentManifest = {
  ...dashboardHeaderManifest,
  previewRenderer: DashboardHeaderPreview,
  exportAdapter: dashboardHeaderExportAdapter,
};
