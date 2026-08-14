import type { ComponentManifest } from "@/lib/registry/types";

export const productGridManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "product-grid-basic",
  name: "Product Grid",
  category: "product",
  description: "Katalog produk responsif dengan gambar, nama, harga, dan tombol beli.",
  tier: "free",
  priceKey: "product-grid-basic",
  version: "1.0.0",
  defaultProps: {
    sectionTitle: "Produk Unggulan",
    sectionSubtitle: "Pilihan produk terbaik untuk Anda",
    productsJson: JSON.stringify([
      { id: "p1", name: "Kemeja Casual Premium", price: "Rp 249.000", tag: "Terlaris" },
      { id: "p2", name: "Celana Chino Slim", price: "Rp 299.000", tag: "Baru" },
      { id: "p3", name: "Jaket Denim Classic", price: "Rp 399.000", tag: "Diskon" },
    ]),
  },
  contentControls: [
    { key: "sectionTitle", label: "Judul Bagian", group: "Header", type: "text" },
    { key: "sectionSubtitle", label: "Sub-judul Bagian", group: "Header", type: "text" },
    { key: "productsJson", label: "Daftar Produk (JSON)", group: "Produk", type: "json" },
  ],
};
