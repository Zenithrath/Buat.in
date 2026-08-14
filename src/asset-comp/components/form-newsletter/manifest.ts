import type { ComponentManifest } from "@/lib/registry/types";

export const formNewsletterManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "form-newsletter",
  name: "Form Newsletter",
  category: "form",
  scope: "landing",
  description: "Ajakan berlangganan yang ringkas untuk ditempatkan sebelum footer atau di tengah halaman.",
  tier: "free",
  priceKey: "form-newsletter",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Catatan kecil untuk bisnis yang bertumbuh",
    heading: "Dapatkan ide yang benar-benar bisa dipakai.",
    description: "Satu email ringkas setiap beberapa minggu, berisi pelajaran dari proyek, brand, dan pengalaman digital.",
    placeholder: "Email terbaik Anda",
    buttonText: "Berlangganan",
    note: "Tanpa spam. Berhenti kapan saja.",
    successText: "Terima kasih—Anda sudah masuk ke daftar kami.",
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "heading", label: "Judul", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    { key: "placeholder", label: "Contoh email", group: "Formulir", type: "text" },
    { key: "buttonText", label: "Teks tombol", group: "Formulir", type: "text" },
    { key: "note", label: "Catatan kecil", group: "Formulir", type: "text" },
    { key: "successText", label: "Pesan berhasil", group: "Formulir", type: "text" },
  ],
};
