import type { ComponentManifest } from "@/lib/registry/types";

export const dropdownMenuManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "dropdown-menu",
  name: "Menu Dropdown",
  category: "navigation",
  scope: "landing",
  description: "Tombol menu kecil dengan daftar tautan yang muncul saat dipilih.",
  tier: "free",
  priceKey: "dropdown-menu",
  version: "2.0.0",
  canContainChildren: false,
  defaultProps: {
    buttonText: "Lihat pilihan",
    align: "left",
    items: [
      { label: "Layanan kami", url: "#layanan" },
      { label: "Karya terbaru", url: "#karya" },
      { label: "Tentang studio", url: "#tentang" },
    ],
  },
  contentControls: [
    { key: "buttonText", label: "Teks tombol", group: "Tombol", type: "text" },
    { key: "align", label: "Posisi daftar", group: "Tata letak", type: "select", options: [
      { value: "left", label: "Sejajar kiri" },
      { value: "right", label: "Sejajar kanan" },
    ] },
    { key: "items", label: "Daftar pilihan", group: "Isi menu", type: "array", itemSchema: [
      { key: "label", label: "Nama pilihan", type: "text" },
      { key: "url", label: "Tujuan pilihan", type: "link" },
    ] },
  ],
};
