import type { ComponentManifest } from "@/lib/registry/types";

export const heroManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "hero-centered",
  name: "Hero Centered",
  category: "hero",
  description: "Bagian hero terpusat dengan judul & teks, sub-judul, tombol aksi utama, dan badge penawaran.",
  tier: "free",
  priceKey: "hero-centered",
  version: "1.0.0",
  defaultProps: {
    badgeText: "🚀 Platform Builder No-Code Terbaik",
    title: "Rancang Antarmuka Website & Dashboard Visual",
    description: "Buat website profesional dan dashboard interaktif dalam hitungan menit tanpa koding.",
    primaryCtaText: "Coba Gratis Sekarang",
    primaryCtaUrl: "#",
    secondaryCtaText: "Lihat Demo",
    secondaryCtaUrl: "#",
  },
  contentControls: [
    { key: "badgeText", label: "Teks Badge", group: "Hero", type: "text" },
    { key: "title", label: "Judul Utama", group: "Hero", type: "text" },
    { key: "description", label: "Deskripsi Singkat", group: "Hero", type: "textarea" },
    { key: "primaryCtaText", label: "Tombol Utama", group: "Tombol", type: "text" },
    { key: "primaryCtaUrl", label: "URL Utama", group: "Tombol", type: "link" },
    { key: "secondaryCtaText", label: "Tombol Sekunder", group: "Tombol", type: "text" },
    { key: "secondaryCtaUrl", label: "URL Sekunder", group: "Tombol", type: "link" },
  ],
};
