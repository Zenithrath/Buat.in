import type { ComponentRegistryItem } from "@/lib/registry/types";
import { galleryGridExport } from "./export";
import { galleryGridManifest } from "./manifest";
import { GalleryGridPreview } from "./preview";
export const galleryGridComponent: ComponentRegistryItem={...galleryGridManifest,previewRenderer:GalleryGridPreview,exportAdapter:galleryGridExport};
