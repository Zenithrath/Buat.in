import type { ComponentManifest } from "@/lib/registry/types";

const PLAN_ITEM_SCHEMA = [
  { key: "name", label: "Nama paket", type: "text" as const },
  { key: "price", label: "Harga", type: "text" as const },
  { key: "period", label: "Periode", type: "text" as const },
  { key: "description", label: "Penjelasan", type: "textarea" as const },
  { key: "features", label: "Fitur (satu per baris)", type: "textarea" as const },
  { key: "buttonText", label: "Teks tombol", type: "text" as const },
  { key: "buttonUrl", label: "Tujuan tombol", type: "link" as const },
  { key: "highlighted", label: "Tandai populer", type: "select" as const, options: [
    { value: "false", label: "Tidak" },
    { value: "true", label: "Ya" },
  ] },
];

export const pricingTableManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "pricing-table",
  name: "Tabel Harga",
  category: "content",
  scope: "landing",
  description: "Tiga paket harga dengan fitur, paket unggulan, dan tombol tindakan.",
  tier: "free",
  priceKey: "pricing-table",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Pilihan yang fleksibel",
    title: "Tiga cara kami bekerja sama.",
    description: "Mulai dari paket terkecil, lalu naik kapan saja sesuai proyek yang masuk.",
    plans: [
      {
        name: "Mulai",
        price: "Rp1,2jt",
        period: "/bulan",
        description: "Untuk usaha baru yang butuh identitas dan situs pertama.",
        features: ["1 halaman utama", "Form kontak", "Dukungan email"],
        buttonText: "Pilih Mulai",
        buttonUrl: "#kontak",
        highlighted: false,
      },
      {
        name: "Bertumbuh",
        price: "Rp3,5jt",
        period: "/bulan",
        description: "Pilihan paling seimbang untuk tim yang aktif.",
        features: ["Hingga 8 halaman", "SEO dasar", "Analitik ringkas", "Dukungan prioritas"],
        buttonText: "Pilih Bertumbuh",
        buttonUrl: "#kontak",
        highlighted: true,
      },
      {
        name: "Kustom",
        price: "Sesuai lingkup",
        period: "",
        description: "Untuk kebutuhan yang perlu dirancang lebih khusus.",
        features: ["Arsitektur konten", "Komponen khusus", "Sesi strategi", "Pendampingan tim"],
        buttonText: "Hubungi kami",
        buttonUrl: "#kontak",
        highlighted: false,
      },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul bagian", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    {
      key: "plans",
      label: "Paket harga",
      group: "Paket",
      type: "array",
      itemSchema: PLAN_ITEM_SCHEMA,
    },
  ],
};
