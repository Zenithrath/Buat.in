import type { ComponentManifest } from "@/lib/registry/types";
import { navbarManifest } from "./manifest";
import { navbarExportAdapter } from "./export";
import { NavbarPreview } from "./preview";

export const navbarMinimal: ComponentManifest = {
  ...navbarManifest,
  previewRenderer: NavbarPreview,
  exportAdapter: navbarExportAdapter,
};