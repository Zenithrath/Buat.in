import type { ComponentManifest } from "@/lib/registry/types";

export const aboutManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "about-basic",
  name: "Tentang Perusahaan",
  category: "about",
  scope: "landing",
  description: "Cerita perusahaan dengan visual, statistik, dan pesan yang mudah dipindai.",
  tier: "free",
  priceKey: "about-basic",
  version: "1.1.0",
  defaultProps: {
    sectionId: "tentang",
    eyebrow: "Tentang kami",
    title: "Strategi yang berpijak pada manusia, bukan tren sesaat.",
    description:
      "Kami membantu bisnis menerjemahkan cerita dan ambisinya menjadi identitas yang utuh dan mudah dipahami.",
    imageUrl: "",
    imageAlt: "Tim berdiskusi di studio",
    imageNoteLabel: "Cara kami bekerja",
    imageNoteText: "Mendengar dengan saksama sebelum membuat apa pun.",
    stat1Number: "8+",
    stat1Label: "tahun berkarya",
    stat2Number: "74",
    stat2Label: "proyek selesai",
    stat3Number: "18",
    stat3Label: "mitra aktif",
  },
  contentControls: [
    { key: "sectionId", label: "Nama bagian untuk menu", group: "Tentang", type: "text" },
    { key: "eyebrow", label: "Label Kecil", group: "Tentang", type: "text" },
    { key: "title", label: "Judul Utama", group: "Tentang", type: "text" },
    { key: "description", label: "Deskripsi Lengkap", group: "Tentang", type: "textarea" },
    { key: "imageUrl", label: "Gambar", group: "Media", type: "image" },
    { key: "imageAlt", label: "Deskripsi Gambar", group: "Media", type: "text" },
    { key: "imageNoteLabel", label: "Label Tanpa Gambar", group: "Media", type: "text" },
    { key: "imageNoteText", label: "Pesan Tanpa Gambar", group: "Media", type: "textarea" },
    { key: "stat1Number", label: "Angka Stat 1", group: "Statistik", type: "text" },
    { key: "stat1Label", label: "Label Stat 1", group: "Statistik", type: "text" },
    { key: "stat2Number", label: "Angka Stat 2", group: "Statistik", type: "text" },
    { key: "stat2Label", label: "Label Stat 2", group: "Statistik", type: "text" },
    { key: "stat3Number", label: "Angka Stat 3", group: "Statistik", type: "text" },
    { key: "stat3Label", label: "Label Stat 3", group: "Statistik", type: "text" },
  ],
};
