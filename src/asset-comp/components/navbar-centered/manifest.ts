import type { ComponentManifest } from "@/lib/registry/types";
import { NAV_HOVER_STYLE_CONTROL } from "../_shared/navigation";

export const navbarCenteredManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "navbar-centered",
  name: "Navbar Logo Tengah",
  category: "navbar",
  scope: "landing",
  description: "Navigasi berlapis dengan brand di tengah dan menu yang tenang di bawahnya.",
  tier: "free",
  priceKey: "navbar-centered",
  version: "2.0.0",
  defaultProps: {
    logoText: "Aruna Studio",
    link1Text: "Beranda", link1Url: "#",
    link2Text: "Layanan", link2Url: "#layanan",
    link3Text: "Cerita", link3Url: "#tentang",
    link4Text: "Kontak", link4Url: "#kontak",
    ctaText: "Mulai proyek", ctaUrl: "#kontak",
  },
  contentControls: [
    { key: "logoText", label: "Nama brand", group: "Brand", type: "text" },
    { key: "link1Text", label: "Menu 1", group: "Menu", type: "text" }, { key: "link1Url", label: "Tujuan menu 1", group: "Menu", type: "link" },
    { key: "link2Text", label: "Menu 2", group: "Menu", type: "text" }, { key: "link2Url", label: "Tujuan menu 2", group: "Menu", type: "link" },
    { key: "link3Text", label: "Menu 3", group: "Menu", type: "text" }, { key: "link3Url", label: "Tujuan menu 3", group: "Menu", type: "link" },
    { key: "link4Text", label: "Menu 4", group: "Menu", type: "text" }, { key: "link4Url", label: "Tujuan menu 4", group: "Menu", type: "link" },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" }, { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
  styleControls: [NAV_HOVER_STYLE_CONTROL],
};
