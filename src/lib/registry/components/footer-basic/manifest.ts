import type { ComponentManifest } from "@/lib/registry/types";

export const footerManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "footer-basic",
  name: "Footer Dasar",
  category: "footer",
  description: "Footer dengan brand, tagline, tautan, dan hak cipta.",
  tier: "free",
  priceKey: "footer-basic",
  version: "1.0.0",
  defaultProps: {
    brandName: "Nama Brand",
    tagline: "Deskripsi singkat brand Anda.",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Tentang",
    link2Url: "#tentang",
    link3Text: "Kontak",
    link3Url: "#kontak",
    copyright: "© 2026. Semua hak dilindungi.",
  },
  contentControls: [
    { key: "brandName", label: "Nama Brand", group: "Umum", type: "text" },
    { key: "tagline", label: "Tagline", group: "Umum", type: "textarea" },
    { key: "link1Text", label: "Tautan 1", group: "Tautan", type: "text" },
    { key: "link1Url", label: "URL 1", group: "Tautan", type: "link" },
    { key: "link2Text", label: "Tautan 2", group: "Tautan", type: "text" },
    { key: "link2Url", label: "URL 2", group: "Tautan", type: "link" },
    { key: "link3Text", label: "Tautan 3", group: "Tautan", type: "text" },
    { key: "link3Url", label: "URL 3", group: "Tautan", type: "link" },
    { key: "copyright", label: "Teks Hak Cipta", group: "Umum", type: "text" },
  ],
};