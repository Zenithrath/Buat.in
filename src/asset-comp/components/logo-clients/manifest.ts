import type { ComponentManifest } from "@/lib/registry/types";

export const logoClientsManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "logo-clients",
  name: "Logo Klien",
  category: "content",
  scope: "landing",
  description: "Baris logo perusahaan klien atau partner, bisa diedit namanya, tampil grayscale dan berwarna saat disorot.",
  tier: "free",
  priceKey: "logo-clients",
  version: "1.0.0",
  defaultProps: {
    eyebrow: "Dipercaya oleh",
    logosJson: JSON.stringify([
      { id: "l1", name: "Nusantara" },
      { id: "l2", name: "KaryaDigital" },
      { id: "l3", name: "Aruna Group" },
      { id: "l4", name: "Solusi Prima" },
      { id: "l5", name: "Biru Langit" },
      { id: "l6", name: "Tunas Muda" },
    ]),
  },
  contentControls: [
    { key: "eyebrow", label: "Teks Pengantar", group: "Logo", type: "text" },
    {
      key: "logosJson",
      label: "Daftar Logo",
      group: "Logo",
      type: "array",
      itemSchema: [
        { key: "name", label: "Nama perusahaan", type: "text" },
        { key: "url", label: "Tautan (opsional)", type: "link" },
      ],
    },
  ],
};
