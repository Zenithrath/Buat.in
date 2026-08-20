import type { ComponentManifest } from "@/lib/registry/types";
import { NAV_HOVER_STYLE_CONTROL } from "../_shared/navigation";

export const navbarGlassManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "navbar-glass",
  name: "Navbar Kaca",
  category: "navbar",
  scope: "landing",
  description: "Navigasi pil mengambang dengan transparansi lembut dan menu ponsel.",
  tier: "free",
  priceKey: "navbar-glass",
  version: "2.0.0",
  defaultProps: {
    logoText: "Nawala",
    logoImageUrl: "",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Karya",
    link2Url: "#karya",
    link3Text: "Tentang",
    link3Url: "#tentang",
    ctaText: "Konsultasi gratis",
    ctaUrl: "#kontak",
  },
  contentControls: [
    { key: "logoText", label: "Nama brand", group: "Brand", type: "text" },
    { key: "logoImageUrl", label: "Logo Gambar (opsional)", group: "Brand", type: "image" },
    { key: "link1Text", label: "Menu 1", group: "Menu", type: "text" },
    { key: "link1Url", label: "Tujuan menu 1", group: "Menu", type: "link" },
    { key: "link2Text", label: "Menu 2", group: "Menu", type: "text" },
    { key: "link2Url", label: "Tujuan menu 2", group: "Menu", type: "link" },
    { key: "link3Text", label: "Menu 3", group: "Menu", type: "text" },
    { key: "link3Url", label: "Tujuan menu 3", group: "Menu", type: "link" },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
  styleControls: [NAV_HOVER_STYLE_CONTROL],
};
