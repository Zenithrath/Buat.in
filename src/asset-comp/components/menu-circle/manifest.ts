import type { ComponentManifest } from "@/lib/registry/types";

export const menuCircleManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "menu-circle",
  name: "Menu Lingkaran",
  category: "navigation",
  scope: "landing",
  description: "Tombol bundar yang membuka pilihan cepat mengelilinginya.",
  tier: "free",
  priceKey: "menu-circle",
  version: "2.0.0",
  defaultProps: {
    buttonText: "Jelajahi",
    title: "Akses cepat tanpa memenuhi layar.",
    description: "Cocok untuk aksi kecil, navigasi kreatif, atau halaman portofolio.",
    items: [
      { label: "Karya", url: "#karya" },
      { label: "Profil", url: "#tentang" },
      { label: "Layanan", url: "#layanan" },
      { label: "Kontak", url: "#kontak" },
    ],
  },
  contentControls: [
    { key: "buttonText", label: "Label tombol tengah", group: "Tombol", type: "text" },
    { key: "title", label: "Judul pendamping", group: "Tampilan", type: "text" },
    { key: "description", label: "Penjelasan singkat", group: "Tampilan", type: "textarea" },
    { key: "items", label: "Pilihan cepat", group: "Isi menu", type: "array", itemSchema: [
      { key: "label", label: "Nama pilihan", type: "text" }, { key: "url", label: "Tujuan pilihan", type: "link" },
    ] },
  ],
};
