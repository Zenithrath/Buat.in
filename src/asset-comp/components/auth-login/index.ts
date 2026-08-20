import type { ComponentRegistryItem } from "@/lib/registry/types";
import { authLoginExport } from "./export";
import { authLoginManifest } from "./manifest";
import { AuthLoginPreview } from "./preview";
export const authLoginComponent: ComponentRegistryItem = {
  ...authLoginManifest,
  previewRenderer: AuthLoginPreview,
  exportAdapter: authLoginExport,
};