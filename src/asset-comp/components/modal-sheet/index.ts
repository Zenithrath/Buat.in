import type { ComponentRegistryItem } from "@/lib/registry/types";
import { modalSheetExport } from "./export";
import { modalSheetManifest } from "./manifest";
import { ModalSheetPreview } from "./preview";

export const modalSheetComponent: ComponentRegistryItem = {
  ...modalSheetManifest,
  previewRenderer: ModalSheetPreview,
  exportAdapter: modalSheetExport,
};
