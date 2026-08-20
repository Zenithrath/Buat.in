import type { ComponentManifest } from "@/lib/registry/types";

const base = {
  tier: "free" as const,
  version: "1.0.0",
  scope: "both" as const,
};

export const importedPageManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  ...base,
  id: "imported-page",
  name: "Imported Page",
  category: "layout",
  description: "Halaman hasil konversi penuh dari file HTML ZIP ke node Buat.in.",
  priceKey: "imported-page",
  defaultProps: { stylesheets: [], inlineStyles: [], sourcePath: "" },
  contentControls: [],
  canContainChildren: false,
  internalChildren: true,
};

export const importedElementManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  ...base,
  id: "imported-element",
  name: "Imported Element",
  category: "content",
  description: "Elemen HTML hasil konversi ZIP yang dapat dipilih dan diedit.",
  priceKey: "imported-element",
  defaultProps: {
    tag: "div",
    attributes: {},
    src: "",
    alt: "",
    href: "",
    value: "",
  },
  contentControls: [
    { key: "text", label: "Teks", group: "Konten", type: "textarea" },
    { key: "src", label: "Gambar / sumber", group: "Media", type: "image" },
    { key: "alt", label: "Alt gambar", group: "Media", type: "text" },
    { key: "href", label: "Tautan", group: "Link", type: "link" },
    { key: "value", label: "Nilai input", group: "Form", type: "text" },
  ],
  canContainChildren: false,
  internalChildren: true,
};

export const importedTextManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  ...base,
  id: "imported-text",
  name: "Imported Text",
  category: "typography",
  description: "Teks asli dari template ZIP yang dapat diedit langsung di kanvas.",
  priceKey: "imported-text",
  defaultProps: { text: "", editable: true },
  contentControls: [
    { key: "text", label: "Teks", group: "Konten", type: "textarea" },
  ],
  canContainChildren: false,
};
