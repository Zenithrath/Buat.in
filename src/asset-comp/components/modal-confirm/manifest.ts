import type { ComponentManifest } from "@/lib/registry/types";

export const modalConfirmManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "modal-confirm",
  name: "Dialog Konfirmasi",
  category: "content",
  scope: "both",
  description: "Dialog konfirmasi ringan untuk aksi penting, dengan pilihan kembali atau melanjutkan.",
  tier: "free",
  priceKey: "modal-confirm",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Aksi yang jelas",
    heading: "Beri ruang untuk memastikan pilihan sebelum tindakan dijalankan.",
    triggerText: "Tampilkan konfirmasi",
    icon: "alert",
    title: "Lanjutkan perubahan ini?",
    description: "Pastikan semua detail sudah sesuai sebelum melanjutkan ke langkah berikutnya.",
    confirmText: "Ya, lanjutkan",
    cancelText: "Periksa lagi",
    statusMessage: "Pilihan Anda berhasil dikonfirmasi.",
  },
  contentControls: [
    { key: "eyebrow", label: "Label pengantar", group: "Pengantar", type: "text" },
    { key: "heading", label: "Judul pengantar", group: "Pengantar", type: "textarea" },
    { key: "triggerText", label: "Teks tombol pembuka", group: "Tombol", type: "text" },
    { key: "icon", label: "Ikon konfirmasi", group: "Dialog", type: "select", options: [
      { value: "alert", label: "Peringatan" },
      { value: "trash", label: "Hapus" },
      { value: "archive", label: "Arsip" },
      { value: "logout", label: "Keluar" },
    ] },
    { key: "title", label: "Judul dialog", group: "Dialog", type: "text" },
    { key: "description", label: "Penjelasan", group: "Dialog", type: "textarea" },
    { key: "confirmText", label: "Teks tombol lanjut", group: "Tombol", type: "text" },
    { key: "cancelText", label: "Teks tombol kembali", group: "Tombol", type: "text" },
    { key: "statusMessage", label: "Pesan setelah dikonfirmasi", group: "Tombol", type: "text" },
  ],
};
