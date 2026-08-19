import type { ComponentManifest } from "@/lib/registry/types";

const COLUMN_FIELDS = [
  { key: "heading", label: "Judul kolom", type: "text" as const },
  { key: "link1Label", label: "Tautan 1", type: "text" as const },
  { key: "link1Url", label: "Tujuan tautan 1", type: "link" as const },
  { key: "link2Label", label: "Tautan 2", type: "text" as const },
  { key: "link2Url", label: "Tujuan tautan 2", type: "link" as const },
  { key: "link3Label", label: "Tautan 3", type: "text" as const },
  { key: "link3Url", label: "Tujuan tautan 3", type: "link" as const },
];

export const navbarMegaManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "navbar-mega",
  name: "Navbar Mega Menu",
  category: "navbar",
  scope: "landing",
  description: "Navigasi dengan panel kategori lebar untuk banyak halaman atau layanan.",
  tier: "free",
  priceKey: "navbar-mega",
  version: "2.0.0",
  defaultProps: {
    logoText: "SORA",
    menuText: "Lihat Semua",
    linkText: "Tentang kami",
    linkUrl: "#tentang",
    ctaText: "Jadwalkan demo",
    ctaUrl: "#kontak",
    columns: [
      { heading: "Untuk bisnis", link1Label: "Profil perusahaan", link1Url: "#profil", link2Label: "Toko online", link2Url: "#toko", link3Label: "Portofolio", link3Url: "#karya" },
      { heading: "Solusi", link1Label: "Mulai dari nol", link1Url: "#mulai", link2Label: "Rancang ulang", link2Url: "#desain", link3Label: "Konsultasi", link3Url: "#konsultasi" },
      { heading: "Sumber daya", link1Label: "Panduan singkat", link1Url: "#panduan", link2Label: "Kisah pelanggan", link2Url: "#cerita", link3Label: "Hubungi tim", link3Url: "#kontak" },
    ],
  },
  contentControls: [
    { key: "logoText", label: "Nama brand", group: "Brand", type: "text" },
    { key: "menuText", label: "Teks menu utama", group: "Navigasi", type: "text" },
    { key: "linkText", label: "Tautan samping", group: "Navigasi", type: "text" },
    { key: "linkUrl", label: "Tujuan tautan samping", group: "Navigasi", type: "link" },
    { key: "columns", label: "Kolom menu", group: "Isi menu", type: "array", itemSchema: COLUMN_FIELDS },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
};
