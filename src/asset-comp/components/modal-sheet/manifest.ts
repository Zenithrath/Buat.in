import type { ComponentManifest } from "@/lib/registry/types";

export const modalSheetManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "modal-sheet",
  name: "Panel Geser",
  category: "content",
  scope: "both",
  description: "Tombol yang membuka panel dari bawah di ponsel dan dari samping di layar besar.",
  tier: "free",
  priceKey: "modal-sheet",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Aksi cepat",
    heading: "Ringkas untuk ponsel, tetap leluasa saat dibuka dari desktop.",
    triggerText: "Buka panel cepat",
    panelEyebrow: "Panel cepat",
    title: "Pilih aksi berikutnya.",
    description: "Buat penawaran, ringkasan, atau formulir tetap mudah dijangkau tanpa meninggalkan halaman.",
    emptyMessage: "Tambahkan komponen ke dalam panel ini untuk membuat aksi lanjutan terasa lebih mudah.",
    closeText: "Selesai",
  },
  contentControls: [
    { key: "eyebrow", label: "Label pengantar", group: "Pengantar", type: "text" },
    { key: "heading", label: "Judul pengantar", group: "Pengantar", type: "textarea" },
    { key: "triggerText", label: "Teks tombol pembuka", group: "Tombol", type: "text" },
    { key: "panelEyebrow", label: "Label panel", group: "Panel", type: "text" },
    { key: "title", label: "Judul panel", group: "Panel", type: "text" },
    { key: "description", label: "Penjelasan", group: "Panel", type: "textarea" },
    { key: "emptyMessage", label: "Pesan saat panel kosong", group: "Panel", type: "textarea" },
    { key: "closeText", label: "Teks tombol akhir", group: "Panel", type: "text" },
  ],
};
