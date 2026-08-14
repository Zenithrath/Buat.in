import type { ComponentManifest } from "@/lib/registry/types";

export const aboutManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "about-basic",
  name: "Tentang Kami",
  category: "about",
  description: "Bagian informasi perusahaan, statistik, dan cerita singkat brand.",
  tier: "free",
  priceKey: "about-basic",
  version: "1.0.0",
  defaultProps: {
    title: "Membangun Masa Depan Antarmuka Digital",
    description: "Kami percaya bahwa membuat website & dashboard harusnya mudah, cepat, dan menyenangkan tanpa hambatan koding.",
    stat1Number: "10K+",
    stat1Label: "Pengguna Aktif",
    stat2Number: "99.9%",
    stat2Label: "Uptime SLA",
    stat3Number: "24/7",
    stat3Label: "Dukungan CS",
  },
  contentControls: [
    { key: "title", label: "Judul Utama", group: "Tentang", type: "text" },
    { key: "description", label: "Deskripsi Lengkap", group: "Tentang", type: "textarea" },
    { key: "stat1Number", label: "Angka Stat 1", group: "Statistik", type: "text" },
    { key: "stat1Label", label: "Label Stat 1", group: "Statistik", type: "text" },
    { key: "stat2Number", label: "Angka Stat 2", group: "Statistik", type: "text" },
    { key: "stat2Label", label: "Label Stat 2", group: "Statistik", type: "text" },
    { key: "stat3Number", label: "Angka Stat 3", group: "Statistik", type: "text" },
    { key: "stat3Label", label: "Label Stat 3", group: "Statistik", type: "text" },
  ],
};
