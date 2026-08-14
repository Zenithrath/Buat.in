import type { ComponentManifest } from "@/lib/registry/types";

export const heroManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "hero-centered",
  name: "Hero Company Profile",
  category: "hero",
  scope: "landing",
  description: "Hero perusahaan dengan pesan utama, dua aksi, dan visual editorial.",
  tier: "free",
  priceKey: "hero-centered",
  version: "1.1.0",
  defaultProps: {
    badgeText: "Studio kreatif independen",
    title: "Membuat kehadiran digital yang terasa manusiawi.",
    description:
      "Kami menyatukan strategi, identitas, dan website yang memudahkan orang memahami bisnis Anda.",
    primaryCtaText: "Mulai percakapan",
    primaryCtaUrl: "#kontak",
    secondaryCtaText: "Lihat layanan",
    secondaryCtaUrl: "#layanan",
    imageUrl: "",
    imageAlt: "Kolaborasi tim kreatif",
    imageBadgeText: "EST. 2018",
    imageNoteLabel: "Studio note",
    imageNoteText: "Dari arah besar sampai detail yang siap dipakai.",
    supportingText: "Strategi, identitas, dan situs yang terhubung.",
  },
  contentControls: [
    { key: "badgeText", label: "Teks Badge", group: "Hero", type: "text" },
    { key: "title", label: "Judul Utama", group: "Hero", type: "text" },
    { key: "description", label: "Deskripsi Singkat", group: "Hero", type: "textarea" },
    { key: "imageUrl", label: "Gambar Hero", group: "Media", type: "image" },
    { key: "imageAlt", label: "Deskripsi Gambar", group: "Media", type: "text" },
    { key: "imageBadgeText", label: "Label di Gambar", group: "Media", type: "text" },
    { key: "imageNoteLabel", label: "Label Tanpa Gambar", group: "Media", type: "text" },
    { key: "imageNoteText", label: "Pesan Tanpa Gambar", group: "Media", type: "textarea" },
    { key: "primaryCtaText", label: "Tombol Utama", group: "Tombol", type: "text" },
    { key: "primaryCtaUrl", label: "Tujuan tombol utama", group: "Tombol", type: "link" },
    { key: "secondaryCtaText", label: "Tombol Sekunder", group: "Tombol", type: "text" },
    { key: "secondaryCtaUrl", label: "Tujuan tombol sekunder", group: "Tombol", type: "link" },
    { key: "supportingText", label: "Teks Pendukung", group: "Hero", type: "text" },
  ],
};
