import type { ComponentRegistryItem } from "@/lib/registry/types";
import { stackAvatarManifest } from "./manifest";
import { StackAvatarPreview } from "./preview";
import { stackAvatarExport } from "./export";

export const stackAvatarComponent: ComponentRegistryItem = {
  ...stackAvatarManifest,
  previewRenderer: StackAvatarPreview,
  exportAdapter: stackAvatarExport,
};
