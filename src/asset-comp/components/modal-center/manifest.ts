import type { ComponentManifest } from "@/lib/registry/types";

export const modalCenterManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "modal-center",
  name: "Dialog Tengah",
  category: "content",
  scope: "both",
  description: "Tombol yang membuka dialog fokus di tengah layar. Isi tambahan dapat ditempatkan di dalam dialog.",
  tier: "free",
  priceKey: "modal-center",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Dialog interaktif",
    heading: "Semua detail penting tetap dekat tanpa memindahkan pengunjung dari halaman ini.",
    triggerText: "Lihat detail layanan",
    dialogEyebrow: "Informasi tambahan",
    title: "Diskusikan proyek Anda.",
    description: "Tambahkan formulir, kartu, atau informasi lain ke dalam dialog ini dari kanvas.",
    emptyMessage: "Tambahkan komponen ke dalam dialog ini untuk menampilkan formulir atau penawaran khusus.",
    closeText: "Tutup dialog",
  },
  contentControls: [
    { key: "eyebrow", label: "Label pengantar", group: "Pengantar", type: "text" },
    { key: "heading", label: "Judul pengantar", group: "Pengantar", type: "textarea" },
    { key: "triggerText", label: "Teks tombol pembuka", group: "Tombol", type: "text" },
    { key: "dialogEyebrow", label: "Label dialog", group: "Dialog", type: "text" },
    { key: "title", label: "Judul dialog", group: "Dialog", type: "text" },
    { key: "description", label: "Penjelasan", group: "Dialog", type: "textarea" },
    { key: "emptyMessage", label: "Pesan saat dialog kosong", group: "Dialog", type: "textarea" },
    { key: "closeText", label: "Label tombol tutup", group: "Dialog", type: "text" },
  ],
};
