import type { ComponentManifest } from "@/lib/registry/types";

export const bannerPromoManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "banner-promo",
  name: "Banner Promo",
  category: "content",
  scope: "landing",
  description: "Spanduk lebar berisi penawaran promo dengan lencana, keterangan, dan tombol klaim.",
  tier: "free",
  priceKey: "banner-promo",
  version: "1.0.0",
  defaultProps: {
    badge: "Promo bulan ini",
    heading: "Potongan 20% untuk langganan tahunan",
    description: "Berlaku untuk pendaftaran baru hingga akhir bulan.",
    ctaText: "Klaim promo",
    ctaUrl: "#promo",
  },
  contentControls: [
    { key: "badge", label: "Lencana promo", group: "Banner", type: "text" },
    { key: "heading", label: "Judul", group: "Banner", type: "text" },
    { key: "description", label: "Deskripsi", group: "Banner", type: "textarea" },
    { key: "ctaText", label: "Teks tombol", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "Tujuan tombol", group: "Tombol", type: "link" },
  ],
};
