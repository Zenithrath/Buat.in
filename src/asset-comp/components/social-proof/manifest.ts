import type { ComponentManifest } from "@/lib/registry/types";

export const socialProofManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "social-proof",
  name: "Bukti Sosial",
  category: "content",
  scope: "landing",
  description: "Bagian bukti sosial yang menampilkan rating bintang, jumlah pelanggan aktif, dan catatan singkat bisnis.",
  tier: "free",
  priceKey: "social-proof",
  version: "1.0.0",
  defaultProps: {
    rating: 5,
    ratingText: "4,9 dari 5",
    countText: "1.200+ pelanggan aktif",
    note: "Berdiri sejak 2019 dengan ulasan asli dari toko-toko kecil hingga ritel nasional.",
  },
  contentControls: [
    { key: "rating", label: "Rating (0–5 bintang)", group: "Rating", type: "number" },
    { key: "ratingText", label: "Teks rating", group: "Rating", type: "text" },
    { key: "countText", label: "Jumlah pelanggan", group: "Rating", type: "text" },
    { key: "note", label: "Catatan", group: "Rating", type: "textarea" },
  ],
};
