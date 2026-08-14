import type { ComponentRegistryItem } from "@/lib/registry/types";
import { dropdownMenuExport } from "./export";
import { dropdownMenuManifest } from "./manifest";
import { DropdownMenuPreview } from "./preview";

export const dropdownMenuComponent: ComponentRegistryItem = {
  ...dropdownMenuManifest,
  previewRenderer: DropdownMenuPreview,
  exportAdapter: dropdownMenuExport,
};
