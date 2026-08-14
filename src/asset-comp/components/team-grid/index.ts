import type { ComponentRegistryItem } from "@/lib/registry/types";
import { teamGridExport } from "./export";
import { teamGridManifest } from "./manifest";
import { TeamGridPreview } from "./preview";
export const teamGridComponent: ComponentRegistryItem = { ...teamGridManifest, previewRenderer: TeamGridPreview, exportAdapter: teamGridExport };
