import type { ComponentManifest } from "@/lib/registry/types";

export const footerManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "footer-basic",
  name: "Footer Perusahaan",
  category: "footer",
  scope: "landing",
  description: "Footer perusahaan dengan ringkasan brand, navigasi, dan hak cipta.",
  tier: "free",
  priceKey: "footer-basic",
  version: "1.1.0",
  defaultProps: {
    brandName: "Karsa Studio",
    logoImageUrl: "",
    brandUrl: "#",
    tagline: "Studio identitas dan situs di Yogyakarta — mengerjakan proyek nyata sejak 2018.",
    copyrightText: "© 2026 Karsa Studio. Semua hak dilindungi.",
    linksJson: JSON.stringify([
      { label: "Layanan", url: "#layanan" },
      { label: "Tentang", url: "#tentang" },
      { label: "Hubungi kami", url: "#kontak" },
    ]),
    link1Text: "Layanan",
    link1Url: "#layanan",
    link2Text: "Tentang",
    link2Url: "#tentang",
    link3Text: "Hubungi kami",
    link3Url: "#kontak",
  },
  contentControls: [
    { key: "brandName", label: "Nama Brand", group: "Brand", type: "text" },
    { key: "logoImageUrl", label: "Logo Gambar (opsional)", group: "Brand", type: "image" },
    { key: "brandUrl", label: "Tujuan nama brand", group: "Brand", type: "link" },
    { key: "tagline", label: "Tagline", group: "Brand", type: "textarea" },
    { key: "copyrightText", label: "Teks Hak Cipta", group: "Footer", type: "text" },
    {
      key: "linksJson",
      label: "Tautan Footer",
      group: "Tautan",
      type: "array",
      itemSchema: [
        { key: "label", label: "Teks tautan", type: "text" },
        { key: "url", label: "Tujuan tautan", type: "link" },
      ],
    },
  ],
};
