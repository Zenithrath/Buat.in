import type { ComponentRegistryItem } from "@/lib/registry/types";
import { testimonialGridExport } from "./export";
import { testimonialGridManifest } from "./manifest";
import { TestimonialGridPreview } from "./preview";

export const testimonialGridComponent: ComponentRegistryItem = {
  ...testimonialGridManifest,
  previewRenderer: TestimonialGridPreview,
  exportAdapter: testimonialGridExport,
};
