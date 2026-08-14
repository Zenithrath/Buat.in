import type { ComponentManifest } from "@/lib/registry/types";

export const ctaManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "cta-basic",
  name: "Call to Action",
  category: "cta",
  description: "Banjir konversi dengan spanduk ajakan bertindak yang mencolok.",
  tier: "free",
  priceKey: "cta-basic",
  version: "1.0.0",
  defaultProps: {
    title: "Siap Membangun Website Pertama Anda?",
    description: "Daftar sekarang dan nikmati akses penuh ke seluruh komponen & template pro.",
    buttonText: "Mulai Buat Gratis",
    buttonUrl: "#",
  },
  contentControls: [
    { key: "title", label: "Judul CTA", group: "CTA", type: "text" },
    { key: "description", label: "Deskripsi", group: "CTA", type: "textarea" },
    { key: "buttonText", label: "Teks Tombol", group: "Tombol", type: "text" },
    { key: "buttonUrl", label: "URL Tombol", group: "Tombol", type: "link" },
  ],
};
