import type { ComponentManifest } from "@/lib/registry/types";

export const heroBgImageManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "hero-bg-image",
  name: "Hero Gambar Latar",
  category: "hero",
  scope: "landing",
  description: "Hero layar penuh dengan foto latar, lapisan gelap, dan pesan di tengah.",
  tier: "free",
  priceKey: "hero-bg-image",
  version: "1.0.0",
  defaultProps: {
    badgeText: "FOTO OLEH TIM LAPANGAN",
    title: "Satu momen, ribuan cerita yang ikut bergerak.",
    description:
      "Foto latar penuh memberi kesan pertama yang kuat. Ganti gambarnya dari panel isi, lalu padukan dengan tombol aksi di tengah.",
    primaryCtaText: "Ikut serta",
    primaryCtaUrl: "#kontak",
    secondaryCtaText: "Lihat dokumentasi",
    secondaryCtaUrl: "#layanan",
    imageUrl: "",
    imageAlt: "Momen kegiatan di lokasi",
    imageBadgeText: "EST. 2018",
    imageNoteLabel: "Keterangan",
    imageNoteText: "Foto diambil di lapangan, bukan stok.",
    supportingText: "Dokumentasi langsung dari lokasi kegiatan.",
  },
  contentControls: [
    { key: "badgeText", label: "Teks Badge", group: "Hero", type: "text" },
    { key: "title", label: "Judul Utama", group: "Hero", type: "text" },
    { key: "description", label: "Deskripsi Singkat", group: "Hero", type: "textarea" },
    { key: "primaryCtaText", label: "Tombol Utama", group: "Tombol", type: "text" },
    { key: "primaryCtaUrl", label: "Tujuan tombol utama", group: "Tombol", type: "link" },
    { key: "secondaryCtaText", label: "Tombol Sekunder", group: "Tombol", type: "text" },
    { key: "secondaryCtaUrl", label: "Tujuan tombol sekunder", group: "Tombol", type: "link" },
    { key: "imageUrl", label: "Gambar Latar", group: "Media", type: "image" },
    { key: "imageAlt", label: "Deskripsi Gambar", group: "Media", type: "text" },
    { key: "imageBadgeText", label: "Label di Atas", group: "Media", type: "text" },
    { key: "imageNoteLabel", label: "Label Tanpa Gambar", group: "Media", type: "text" },
    { key: "imageNoteText", label: "Pesan Tanpa Gambar", group: "Media", type: "textarea" },
    { key: "supportingText", label: "Teks Pendukung", group: "Hero", type: "text" },
  ],
};