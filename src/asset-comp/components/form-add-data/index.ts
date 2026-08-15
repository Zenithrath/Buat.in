import type { ComponentRegistryItem } from "@/lib/registry/types";
import { formAddDataManifest } from "./manifest";
import { FormAddDataPreview } from "./preview";
import { formAddDataExport } from "./export";

export const formAddDataComponent: ComponentRegistryItem = {
  ...formAddDataManifest,
  previewRenderer: FormAddDataPreview,
  exportAdapter: formAddDataExport,
};
