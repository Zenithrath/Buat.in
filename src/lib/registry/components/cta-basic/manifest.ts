import type { ComponentManifest } from "@/lib/registry/types";

export const ctaManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "cta-basic",
  name: "Ajakan Bertindak",
  category: "cta",
  description: "Kartu ajakan dengan warna utama dan dua tombol.",
  tier: "free",
  priceKey: "cta-basic",
  version: "1.0.0",
  defaultProps: {
    title: "Siap memulai?",
    subtitle: "Hubungi kami untuk konsultasi gratis.",
    ctaText: "Hubungi Kami",
    ctaUrl: "#",
    secondaryText: "",
    secondaryUrl: "#",
  },
  contentControls: [
    { key: "title", label: "Judul", group: "Umum", type: "textarea" },
    { key: "subtitle", label: "Subjudul", group: "Umum", type: "textarea" },
    { key: "ctaText", label: "Teks Tombol Utama", group: "Tombol", type: "text" },
    { key: "ctaUrl", label: "URL Tombol Utama", group: "Tombol", type: "link" },
    {
      key: "secondaryText",
      label: "Teks Tombol Kedua (opsional)",
      group: "Tombol",
      type: "text",
    },
    {
      key: "secondaryUrl",
      label: "URL Tombol Kedua",
      group: "Tombol",
      type: "link",
    },
  ],
};