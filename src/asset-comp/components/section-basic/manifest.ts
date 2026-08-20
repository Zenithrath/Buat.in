import type { ComponentManifest } from "@/lib/registry/types";

export const sectionBasicManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "section-basic",
  name: "Section Kosong",
  category: "content",
  scope: "both",
  description: "Section polos tanpa gaya untuk dibangun dari nol: judul, paragraf, dan slot untuk komponen lain.",
  tier: "free",
  priceKey: "section-basic",
  version: "1.0.0",
  internalChildren: true,
  defaultProps: {
    heading: "Judul section Anda",
    paragraph: "Tulis deskripsi singkat di sini, lalu seret komponen lain ke dalam section ini untuk memperkaya halaman.",
  },
  contentControls: [
    { key: "heading", label: "Judul", group: "Teks", type: "text" },
    { key: "paragraph", label: "Paragraf", group: "Teks", type: "textarea" },
  ],
};
