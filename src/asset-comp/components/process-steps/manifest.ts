import type { ComponentManifest } from "@/lib/registry/types";

export const processStepsManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "process-steps",
  name: "Proses",
  category: "content",
  scope: "landing",
  description: "Alur kerja bisnis dalam tiga langkah bernomor dengan garis penghubung pada layar lebar.",
  tier: "free",
  priceKey: "process-steps",
  version: "1.0.0",
  defaultProps: {
    eyebrow: "Cara kerja",
    heading: "Mulai dari tiga langkah sederhana",
    stepsJson: JSON.stringify([
      {
        id: "s1",
        title: "Isi data bisnis",
        description: "Lengkapi nama toko, alamat, dan kontak yang akan tampil di halaman Anda.",
      },
      {
        id: "s2",
        title: "Pilih template dan warna",
        description: "Pilih tata letak yang sesuai lalu sesuaikan warnanya dengan identitas merek.",
      },
      {
        id: "s3",
        title: "Ekspor dan terbitkan",
        description: "Unduh hasilnya dan pasang di hosting Anda sendiri tanpa biaya langganan.",
      },
    ]),
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Proses", type: "text" },
    { key: "heading", label: "Judul", group: "Proses", type: "text" },
    {
      key: "stepsJson",
      label: "Langkah",
      group: "Langkah",
      type: "array",
      itemSchema: [
        { key: "title", label: "Judul langkah", type: "text" },
        { key: "description", label: "Penjelasan", type: "textarea" },
      ],
    },
  ],
};
