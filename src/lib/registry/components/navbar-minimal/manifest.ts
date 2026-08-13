import type { ComponentManifest } from "@/lib/registry/types";

export const navbarManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "navbar-minimal",
  name: "Navbar Minimal",
  category: "navbar",
  description: "Navigasi atas sederhana dengan logo, tautan, dan tombol CTA.",
  tier: "free",
  priceKey: "navbar-minimal",
  version: "1.0.0",
  defaultProps: {
    logoText: "Logo Saya",
    link1Text: "Beranda",
    link1Url: "#",
    link2Text: "Tentang",
    link2Url: "#tentang",
    link3Text: "Kontak",
    link3Url: "#kontak",
    ctaText: "Mulai",
    ctaUrl: "#",
  },
  contentControls: [
    { key: "logoText", label: "Nama Logo", group: "Umum", type: "text" },
    { key: "link1Text", label: "Tautan 1", group: "Navigasi", type: "text" },
    { key: "link1Url", label: "URL 1", group: "Navigasi", type: "link" },
    { key: "link2Text", label: "Tautan 2", group: "Navigasi", type: "text" },
    { key: "link2Url", label: "URL 2", group: "Navigasi", type: "link" },
    { key: "link3Text", label: "Tautan 3", group: "Navigasi", type: "text" },
    { key: "link3Url", label: "URL 3", group: "Navigasi", type: "link" },
    { key: "ctaText", label: "Teks Tombol CTA", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "URL Tombol CTA", group: "Tombol", type: "link" },
  ],
};