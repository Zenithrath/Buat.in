import type { ComponentRegistryItem } from "@/lib/registry/types";
import { formNewsletterExport } from "./export";
import { formNewsletterManifest } from "./manifest";
import { FormNewsletterPreview } from "./preview";
export const formNewsletterComponent:ComponentRegistryItem={...formNewsletterManifest,previewRenderer:FormNewsletterPreview,exportAdapter:formNewsletterExport};
