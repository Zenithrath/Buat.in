import type { ComponentRegistryItem } from "@/lib/registry/types";
import { modalConfirmExport } from "./export";
import { modalConfirmManifest } from "./manifest";
import { ModalConfirmPreview } from "./preview";

export const modalConfirmComponent: ComponentRegistryItem = {
  ...modalConfirmManifest,
  previewRenderer: ModalConfirmPreview,
  exportAdapter: modalConfirmExport,
};
