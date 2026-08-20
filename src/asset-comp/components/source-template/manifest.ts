import type { ComponentManifest } from "@/lib/registry/types";

export const sourceTemplateManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "source-template",
  name: "Imported ZIP Template",
  category: "content",
  scope: "both",
  description:
    "Template HTML/CSS/aset hasil impor ZIP. Struktur visual asli dipertahankan dan teks, gambar, tautan, serta input dapat diedit.",
  tier: "free",
  priceKey: "source-template",
  version: "1.0.0",
  defaultProps: {
    sourceTemplateId: "",
  },
  contentControls: [],
  canContainChildren: false,
};
