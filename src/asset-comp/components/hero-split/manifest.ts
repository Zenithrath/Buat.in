import type { ComponentManifest } from "@/lib/registry/types";

export const heroSplitManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "hero-split",
  name: "Hero Terbelah (Split)",
  category: "hero",
  scope: "landing",
  description: "Hero dua kolom: teks di kiri, gambar tinggi di kanan dengan kartu statistik menyilang.",
  tier: "free",
  priceKey: "hero-split",
  version: "1.0.0",
  defaultProps: {
    badgeText: "Kegiatan berjalan",
    title: "Setiap angka di sini berasal dari catatan nyata.",
    description:
      "Kolom kanan menampilkan satu gambar tinggi; kartu kecil di bawahnya menyimpan statistik yang bisa diganti dari panel isi.",
    primaryCtaText: "Lihat laporan",
    primaryCtaUrl: "#kontak",
    secondaryCtaText: "Cara kami bekerja",
    secondaryCtaUrl: "#layanan",
    imageUrl: "",
    imageAlt: "Kegiatan yang didokumentasikan",
    imageBadgeText: "SEJAK 2018",
    imageNoteLabel: "Catatan",
    imageNoteText: "74 proyek selesai, 96% klien kembali bekerja sama.",
    supportingText: "Angka diperbarui tiap akhir kuartal.",
  },
  contentControls: [
    { key: "badgeText", label: "Teks Badge", group: "Hero", type: "text" },
    { key: "title", label: "Judul Utama", group: "Hero", type: "text" },
    { key: "description", label: "Deskripsi Singkat", group: "Hero", type: "textarea" },
    { key: "primaryCtaText", label: "Tombol Utama", group: "Tombol", type: "text" },
    { key: "primaryCtaUrl", label: "Tujuan tombol utama", group: "Tombol", type: "link" },
    { key: "secondaryCtaText", label: "Tombol Sekunder", group: "Tombol", type: "text" },
    { key: "secondaryCtaUrl", label: "Tujuan tombol sekunder", group: "Tombol", type: "link" },
    { key: "imageUrl", label: "Gambar Hero", group: "Media", type: "image" },
    { key: "imageAlt", label: "Deskripsi Gambar", group: "Media", type: "text" },
    { key: "imageBadgeText", label: "Label di Gambar", group: "Media", type: "text" },
    { key: "imageNoteLabel", label: "Label Kartu Statistik", group: "Media", type: "text" },
    { key: "imageNoteText", label: "Isi Kartu Statistik", group: "Media", type: "textarea" },
    { key: "supportingText", label: "Teks Pendukung", group: "Hero", type: "text" },
  ],
};