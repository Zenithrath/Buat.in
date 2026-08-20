import type { ComponentRegistryItem } from "@/lib/registry/types";
import {
  importedElementExport,
  importedPageExport,
  importedTextExport,
} from "./export";
import {
  importedElementManifest,
  importedPageManifest,
  importedTextManifest,
} from "./manifest";
import {
  ImportedElementPreview,
  ImportedPagePreview,
  ImportedTextPreview,
} from "./preview";

export const importedPageComponent: ComponentRegistryItem = {
  ...importedPageManifest,
  previewRenderer: ImportedPagePreview,
  exportAdapter: importedPageExport,
};

export const importedElementComponent: ComponentRegistryItem = {
  ...importedElementManifest,
  previewRenderer: ImportedElementPreview,
  exportAdapter: importedElementExport,
};

export const importedTextComponent: ComponentRegistryItem = {
  ...importedTextManifest,
  previewRenderer: ImportedTextPreview,
  exportAdapter: importedTextExport,
};
