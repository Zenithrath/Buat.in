import type { ComponentManifest } from "@/lib/registry/types";

export const productGridManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "product-grid-basic",
  name: "Grid Layanan",
  category: "product",
  scope: "landing",
  description: "Kartu layanan atau produk dengan media, detail, label, dan aksi ringan.",
  tier: "free",
  priceKey: "product-grid-basic",
  version: "1.1.0",
  defaultProps: {
    sectionId: "layanan",
    sectionTitle: "Layanan yang menyatukan gambaran besar dan detail kecil.",
    sectionSubtitle:
      "Pilih pendampingan yang sesuai lingkup proyek Anda, atau susun ruang lingkup bersama kami.",
    productsJson: JSON.stringify([
      {
        id: "strategy",
        name: "Arah & Strategi Brand",
        price: "Riset, positioning, dan pesan utama",
        tag: "Fondasi",
        description: "Keputusan awal yang membuat komunikasi bisnis terasa konsisten.",
        actionText: "Pelajari layanan",
        actionUrl: "#kontak",
      },
      {
        id: "identity",
        name: "Identitas Visual",
        price: "Sistem visual untuk setiap titik temu",
        tag: "Identitas",
        description: "Logo dan bahasa visual yang dapat dipakai tim setiap hari.",
        actionText: "Lihat ruang lingkup",
        actionUrl: "#kontak",
      },
      {
        id: "website",
        name: "Website Perusahaan",
        price: "Struktur konten dan desain responsif",
        tag: "Digital",
        description: "Situs yang memudahkan calon pelanggan menemukan alasan untuk percaya.",
        actionText: "Diskusikan website",
        actionUrl: "#kontak",
      },
    ]),
  },
  contentControls: [
    { key: "sectionId", label: "Nama bagian untuk menu", group: "Header", type: "text" },
    { key: "sectionTitle", label: "Judul Bagian", group: "Header", type: "text" },
    { key: "sectionSubtitle", label: "Subjudul Bagian", group: "Header", type: "textarea" },
    {
      key: "productsJson",
      label: "Daftar Layanan",
      group: "Layanan",
      type: "array",
      itemSchema: [
        { key: "name", label: "Nama layanan", type: "text" },
        { key: "price", label: "Ringkasan", type: "text" },
        { key: "tag", label: "Label", type: "text" },
        { key: "imageUrl", label: "Gambar kartu", type: "image" },
        { key: "description", label: "Deskripsi", type: "textarea" },
        { key: "actionText", label: "Teks tombol", type: "text" },
        { key: "actionUrl", label: "Tujuan tombol", type: "link" },
      ],
    },
  ],
};
