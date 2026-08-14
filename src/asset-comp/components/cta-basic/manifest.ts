import type { ComponentManifest } from "@/lib/registry/types";

export const ctaManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "cta-basic",
  name: "Ajakan Konsultasi",
  category: "cta",
  scope: "landing",
  description: "Penutup landing page yang terarah dengan aksi utama dan opsional kedua.",
  tier: "free",
  priceKey: "cta-basic",
  version: "1.1.0",
  defaultProps: {
    title: "Punya cerita yang perlu disampaikan dengan lebih baik?",
    description:
      "Ceritakan konteks bisnis Anda dalam sesi perkenalan singkat. Kami bantu memetakan langkah yang paling masuk akal.",
    buttonText: "Jadwalkan konsultasi",
    buttonUrl: "#kontak",
    secondaryText: "Lihat layanan",
    secondaryUrl: "#layanan",
  },
  contentControls: [
    { key: "title", label: "Judul CTA", group: "CTA", type: "text" },
    { key: "description", label: "Deskripsi", group: "CTA", type: "textarea" },
    { key: "buttonText", label: "Tombol Utama", group: "Tombol", type: "text" },
    { key: "buttonUrl", label: "Tujuan tombol utama", group: "Tombol", type: "link" },
    { key: "secondaryText", label: "Tombol Sekunder", group: "Tombol", type: "text" },
    { key: "secondaryUrl", label: "Tujuan tombol sekunder", group: "Tombol", type: "link" },
  ],
};
