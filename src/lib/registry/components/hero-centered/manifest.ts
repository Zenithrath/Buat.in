import type { ComponentManifest } from "@/lib/registry/types";

export const heroManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "hero-centered",
  name: "Hero Centered",
  category: "hero",
  description: "Hero teks di tengah dengan tombol aksi dan gambar opsional.",
  tier: "free",
  priceKey: "hero-centered",
  version: "1.0.0",
  defaultProps: {
    eyebrow: "",
    title: "Judul hero Anda",
    subtitle: "Subjudul singkat yang menjelaskan nilai utama Anda.",
    ctaText: "Mulai Sekarang",
    ctaUrl: "#",
    secondaryText: "Pelajari Lebih Lanjut",
    secondaryUrl: "#",
    imageUrl: "",
    imageAlt: "",
  },
  contentControls: [
    { key: "eyebrow", label: "Label Atas", group: "Umum", type: "text" },
    { key: "title", label: "Judul", group: "Umum", type: "textarea" },
    { key: "subtitle", label: "Subjudul", group: "Umum", type: "textarea" },
    { key: "ctaText", label: "Teks Tombol Utama", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "URL Tombol Utama", group: "Tombol", type: "link" },
    {
      key: "secondaryText",
      label: "Teks Tombol Kedua",
      group: "Tombol",
      type: "text",
    },
    {
      key: "secondaryUrl",
      label: "URL Tombol Kedua",
      group: "Tombol",
      type: "link",
    },
    { key: "imageUrl", label: "URL Gambar", group: "Gambar", type: "image" },
    { key: "imageAlt", label: "Teks Alternatif", group: "Gambar", type: "text" },
  ],
};