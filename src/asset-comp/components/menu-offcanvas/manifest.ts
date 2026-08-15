import type { ComponentManifest } from "@/lib/registry/types";

export const menuOffcanvasManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "menu-offcanvas",
  name: "Menu Panel Geser",
  category: "navigation",
  scope: "landing",
  description: "Tombol yang membuka panel menu dari kiri atau kanan dengan latar pelindung.",
  tier: "free",
  priceKey: "menu-offcanvas",
  version: "2.0.0",
  defaultProps: {
    triggerText: "Buka navigasi",
    title: "Semua halaman penting dalam satu panel.",
    description: "Semua halaman penting tersusun dalam satu panel yang ringkas.",
    side: "right",
    links: [
      { label: "Beranda", url: "#" },
      { label: "Layanan", url: "#layanan" },
      { label: "Karya", url: "#karya" },
      { label: "Kontak", url: "#kontak" },
    ],
    ctaText: "Mulai proyek", ctaUrl: "#kontak",
  },
  contentControls: [
    { key: "triggerText", label: "Teks tombol pembuka", group: "Tombol", type: "text" },
    { key: "title", label: "Judul panel", group: "Panel", type: "text" },
    { key: "description", label: "Penjelasan singkat", group: "Panel", type: "textarea" },
    { key: "side", label: "Sisi panel", group: "Tata letak", type: "select", options: [
      { value: "left", label: "Dari kiri" }, { value: "right", label: "Dari kanan" },
    ] },
    { key: "links", label: "Daftar menu", group: "Isi menu", type: "array", itemSchema: [
      { key: "label", label: "Nama menu", type: "text" }, { key: "url", label: "Tujuan menu", type: "link" },
    ] },
    { key: "ctaText", label: "Teks tombol akhir", group: "Tombol", type: "text" }, { key: "ctaUrl", label: "Tujuan tombol akhir", group: "Tombol", type: "link" },
  ],
};
