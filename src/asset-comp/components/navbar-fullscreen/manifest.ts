import type { ComponentManifest } from "@/lib/registry/types";

export const navbarFullscreenManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "navbar-fullscreen",
  name: "Navbar Layar Penuh",
  category: "navbar",
  scope: "landing",
  description: "Navigasi editorial dengan menu layar penuh dan urutan kemunculan yang halus.",
  tier: "free",
  priceKey: "navbar-fullscreen",
  version: "2.0.0",
  defaultProps: {
    logoText: "TITIK TEMU",
    logoImageUrl: "",
    eyebrow: "Menu",
    links: [
      { label: "Beranda", url: "#" },
      { label: "Karya terpilih", url: "#karya" },
      { label: "Tentang studio", url: "#tentang" },
      { label: "Hubungi kami", url: "#kontak" },
    ],
    ctaText: "Mulai percakapan", ctaUrl: "#kontak",
  },
  contentControls: [
    { key: "logoText", label: "Nama brand", group: "Brand", type: "text" },
    { key: "logoImageUrl", label: "Logo Gambar (opsional)", group: "Brand", type: "image" },
    { key: "eyebrow", label: "Label menu", group: "Menu", type: "text" },
    { key: "links", label: "Daftar menu", group: "Menu", type: "array", itemSchema: [
      { key: "label", label: "Nama menu", type: "text" },
      { key: "url", label: "Tujuan menu", type: "link" },
    ] },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
};
