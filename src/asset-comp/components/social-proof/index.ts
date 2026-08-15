import type { ComponentRegistryItem } from "@/lib/registry/types";
import { socialProofManifest } from "./manifest";
import { SocialProofPreview } from "./preview";
import { socialProofExport } from "./export";

export const socialProofComponent: ComponentRegistryItem = {
  ...socialProofManifest,
  previewRenderer: SocialProofPreview,
  exportAdapter: socialProofExport,
};
