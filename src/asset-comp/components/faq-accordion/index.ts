import type { ComponentRegistryItem } from "@/lib/registry/types";
import { faqAccordionExport } from "./export";
import { faqAccordionManifest } from "./manifest";
import { FaqAccordionPreview } from "./preview";
export const faqAccordionComponent:ComponentRegistryItem={...faqAccordionManifest,previewRenderer:FaqAccordionPreview,exportAdapter:faqAccordionExport};
