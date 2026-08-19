import type { ComponentManifest } from "@/lib/registry/types";

export const statsBannerManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "stats-banner",
  name: "Banner Statistik",
  category: "content",
  scope: "both",
  description: "Baris angka pencapaian untuk menambah kepercayaan pada halaman atau dashboard.",
  tier: "free",
  priceKey: "stats-banner",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Dibangun bersama mitra kami",
    title: "Bukti kerja yang bisa dilihat, bukan sekadar janji.",
    sectionBg: "primary",
    stats: [
      { value: "74", suffix: "+", label: "proyek diluncurkan" },
      { value: "8", suffix: " tahun", label: "beroperasi dari Yogyakarta" },
      { value: "96", suffix: "%", label: "klien kembali bekerja sama" },
      { value: "12", suffix: " kota", label: "kolaborasi lintas Indonesia" },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul", group: "Header", type: "text" },
    { key: "sectionBg", label: "Latar banner", group: "Tampilan", type: "select", options: [
      { value: "primary", label: "Warna utama" }, { value: "default", label: "Putih / dasar" }, { value: "muted", label: "Lembut" }, { value: "foreground", label: "Gelap" },
    ] },
    { key: "stats", label: "Angka statistik", group: "Statistik", type: "array", itemSchema: [
      { key: "value", label: "Angka", type: "text" },
      { key: "suffix", label: "Akhiran", type: "text" },
      { key: "label", label: "Keterangan", type: "text" },
    ] },
  ],
};
