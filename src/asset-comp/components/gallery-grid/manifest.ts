import type { ComponentManifest } from "@/lib/registry/types";

export const galleryGridManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "gallery-grid",
  name: "Galeri Karya",
  category: "content",
  scope: "landing",
  description: "Galeri responsif dengan gambar, judul, deskripsi, dan fallback visual bila foto belum diisi.",
  tier: "free",
  priceKey: "gallery-grid",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Pilihan karya",
    title: "Ruang untuk cerita yang punya karakter sendiri.",
    description: "Ganti gambar dan keterangannya langsung dari daftar visual di panel ini.",
    columns: "3",
    images: [
      { url: "", alt: "Proyek identitas visual", title: "Identitas yang mudah diingat", caption: "Brand system" },
      { url: "", alt: "Proyek website", title: "Website yang terasa hidup", caption: "Digital experience" },
      { url: "", alt: "Proyek editorial", title: "Cerita dalam bentuk editorial", caption: "Campaign" },
      { url: "", alt: "Proyek kemasan", title: "Kemasan untuk disentuh", caption: "Packaging" },
      { url: "", alt: "Proyek ruang", title: "Ruang yang konsisten", caption: "Environment" },
      { url: "", alt: "Proyek produk", title: "Produk yang punya bahasa", caption: "Product" },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul bagian", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    { key: "columns", label: "Jumlah kolom", group: "Tata letak", type: "select", options: [
      { value: "2", label: "2 kolom" }, { value: "3", label: "3 kolom" }, { value: "4", label: "4 kolom" },
    ] },
    { key: "images", label: "Item galeri", group: "Galeri", type: "array", itemSchema: [
      { key: "url", label: "Gambar", type: "image" },
      { key: "title", label: "Judul", type: "text" },
      { key: "caption", label: "Kategori", type: "text" },
      { key: "alt", label: "Deskripsi gambar", type: "text" },
    ] },
  ],
};
