import type { ComponentRegistryItem } from "@/lib/registry/types";
import { formContactExport } from "./export";
import { formContactManifest } from "./manifest";
import { FormContactPreview } from "./preview";
export const formContactComponent:ComponentRegistryItem={...formContactManifest,previewRenderer:FormContactPreview,exportAdapter:formContactExport};
