import type { ComponentManifest } from "@/lib/registry/types";

export const cardFeatureManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "card-feature",
  name: "Kartu Fitur",
  category: "content",
  scope: "both",
  description: "Kartu ringkas untuk menjelaskan satu layanan, keunggulan, atau langkah kerja.",
  tier: "free",
  priceKey: "card-feature",
  version: "2.0.0",
  defaultProps: {
    icon: "sparkles",
    eyebrow: "Keunggulan",
    title: "Satu fokus, satu keputusan yang jelas",
    description:
      "Setiap kartu menjelaskan satu hal: apa yang dikerjakan, untuk siapa, dan apa hasilnya. Tanpa jargon.",
    linkText: "Pelajari lebih lanjut",
    linkUrl: "#",
  },
  contentControls: [
    {
      key: "icon",
      label: "Ikon",
      group: "Kartu",
      type: "select",
      options: [
        { value: "sparkles", label: "Kilau" },
        { value: "zap", label: "Petir" },
        { value: "layers", label: "Lapisan" },
        { value: "chart", label: "Grafik" },
        { value: "shield", label: "Perisai" },
        { value: "globe", label: "Globe" },
      ],
    },
    { key: "eyebrow", label: "Label kecil", group: "Kartu", type: "text" },
    { key: "title", label: "Judul", group: "Kartu", type: "text" },
    { key: "description", label: "Deskripsi", group: "Kartu", type: "textarea" },
    { key: "linkText", label: "Teks tautan", group: "Tautan", type: "text" },
    { key: "linkUrl", label: "Tujuan tautan", group: "Tautan", type: "link" },
  ],
};
