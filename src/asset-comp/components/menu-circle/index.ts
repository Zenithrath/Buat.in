import type { ComponentRegistryItem } from "@/lib/registry/types";
import { menuCircleExport } from "./export";
import { menuCircleManifest } from "./manifest";
import { MenuCirclePreview } from "./preview";

export const menuCircleComponent: ComponentRegistryItem = {
  ...menuCircleManifest,
  previewRenderer: MenuCirclePreview,
  exportAdapter: menuCircleExport,
};
