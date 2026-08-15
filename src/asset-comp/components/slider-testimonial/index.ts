import type { ComponentRegistryItem } from "@/lib/registry/types";
import { sliderTestimonialExport } from "./export";
import { sliderTestimonialManifest } from "./manifest";
import { SliderTestimonialPreview } from "./preview";

export const sliderTestimonialComponent: ComponentRegistryItem = {
  ...sliderTestimonialManifest,
  previewRenderer: SliderTestimonialPreview,
  exportAdapter: sliderTestimonialExport,
};