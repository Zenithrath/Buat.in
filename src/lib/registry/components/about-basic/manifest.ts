import type { ComponentManifest } from "@/lib/registry/types";

export const aboutManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "about-basic",
  name: "Tentang Dasar",
  category: "about",
  description: "Dua kolom: gambar dan teks cerita bisnis dengan statistik.",
  tier: "free",
  priceKey: "about-basic",
  version: "1.0.0",
  defaultProps: {
    eyebrow: "Tentang Kami",
    title: "Cerita di balik bisnis kami",
    content: "Ceritakan kisah, visi, dan nilai dari bisnis Anda di sini.",
    imageUrl: "",
    imageAlt: "",
    stat1Value: "10+",
    stat1Label: "Tahun pengalaman",
    stat2Value: "500+",
    stat2Label: "Pelanggan puas",
    stat3Value: "50+",
    stat3Label: "Produk pilihan",
  },
  contentControls: [
    { key: "eyebrow", label: "Label Atas", group: "Umum", type: "text" },
    { key: "title", label: "Judul", group: "Umum", type: "text" },
    { key: "content", label: "Isi Cerita", group: "Umum", type: "textarea" },
    { key: "imageUrl", label: "URL Gambar", group: "Gambar", type: "image" },
    { key: "imageAlt", label: "Teks Alternatif", group: "Gambar", type: "text" },
    { key: "stat1Value", label: "Angka", group: "Statistik 1", type: "text" },
    { key: "stat1Label", label: "Label", group: "Statistik 1", type: "text" },
    { key: "stat2Value", label: "Angka", group: "Statistik 2", type: "text" },
    { key: "stat2Label", label: "Label", group: "Statistik 2", type: "text" },
    { key: "stat3Value", label: "Angka", group: "Statistik 3", type: "text" },
    { key: "stat3Label", label: "Label", group: "Statistik 3", type: "text" },
  ],
};