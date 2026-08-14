import type { ComponentManifest } from "@/lib/registry/types";

export const footerManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "footer-basic",
  name: "Footer Basic",
  category: "footer",
  description: "Bagian kaki halaman sederhana dengan hak cipta dan tautan nav.",
  tier: "free",
  priceKey: "footer-basic",
  version: "1.0.0",
  defaultProps: {
    copyrightText: "© 2026 Buat.in — Visual Website Builder. Hak cipta dilindungi.",
    link1Text: "Privasi",
    link1Url: "#",
    link2Text: "Syarat & Ketentuan",
    link2Url: "#",
    link3Text: "Bantuan",
    link3Url: "#",
  },
  contentControls: [
    { key: "copyrightText", label: "Teks Hak Cipta", group: "Footer", type: "text" },
    { key: "link1Text", label: "Tautan 1", group: "Tautan", type: "text" },
    { key: "link1Url", label: "URL 1", group: "Tautan", type: "link" },
    { key: "link2Text", label: "Tautan 2", group: "Tautan", type: "text" },
    { key: "link2Url", label: "URL 2", group: "Tautan", type: "link" },
    { key: "link3Text", label: "Tautan 3", group: "Tautan", type: "text" },
    { key: "link3Url", label: "URL 3", group: "Tautan", type: "link" },
  ],
};
