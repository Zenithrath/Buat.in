import type { ComponentRegistryItem } from "@/lib/registry/types";
import { modalCenterExport } from "./export";
import { modalCenterManifest } from "./manifest";
import { ModalCenterPreview } from "./preview";

export const modalCenterComponent: ComponentRegistryItem = {
  ...modalCenterManifest,
  previewRenderer: ModalCenterPreview,
  exportAdapter: modalCenterExport,
};
