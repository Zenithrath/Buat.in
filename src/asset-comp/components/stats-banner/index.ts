import type { ComponentRegistryItem } from "@/lib/registry/types";
import { statsBannerExport } from "./export";
import { statsBannerManifest } from "./manifest";
import { StatsBannerPreview } from "./preview";
export const statsBannerComponent: ComponentRegistryItem = { ...statsBannerManifest, previewRenderer: StatsBannerPreview, exportAdapter: statsBannerExport };
