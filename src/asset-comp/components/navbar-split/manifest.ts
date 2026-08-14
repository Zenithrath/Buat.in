import type { ComponentManifest } from "@/lib/registry/types";
import { NAV_HOVER_STYLE_CONTROL } from "../_shared/navigation";

export const navbarSplitManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "navbar-split",
  name: "Navbar Split",
  category: "navbar",
  scope: "landing",
  description: "Navigasi editorial: brand di kiri, menu dan ajakan di sisi kanan.",
  tier: "free",
  priceKey: "navbar-split",
  version: "2.0.0",
  defaultProps: {
    logoText: "Ruang Rasa",
    link1Text: "Koleksi", link1Url: "#koleksi",
    link2Text: "Cerita", link2Url: "#tentang",
    link3Text: "Kunjungi", link3Url: "#kontak",
    ctaText: "Belanja sekarang", ctaUrl: "#koleksi",
  },
  contentControls: [
    { key: "logoText", label: "Nama brand", group: "Brand", type: "text" },
    { key: "link1Text", label: "Menu 1", group: "Menu", type: "text" }, { key: "link1Url", label: "Tujuan menu 1", group: "Menu", type: "link" },
    { key: "link2Text", label: "Menu 2", group: "Menu", type: "text" }, { key: "link2Url", label: "Tujuan menu 2", group: "Menu", type: "link" },
    { key: "link3Text", label: "Menu 3", group: "Menu", type: "text" }, { key: "link3Url", label: "Tujuan menu 3", group: "Menu", type: "link" },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" }, { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
  styleControls: [NAV_HOVER_STYLE_CONTROL],
};
