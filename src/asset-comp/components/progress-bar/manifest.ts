import type { ComponentManifest } from "@/lib/registry/types";

export const progressBarManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "progress-bar",
  name: "Progress Bar",
  category: "data",
  scope: "dashboard",
  description: "Bilah kemajuan dengan label, nilai persentase, dan warna status sesuai varian pilihan.",
  tier: "free",
  priceKey: "progress-bar",
  version: "1.0.0",
  defaultProps: {
    label: "Target penjualan",
    value: 68,
    showValue: true,
    variant: "primary",
    hint: "Tersisa 32% menuju target bulan ini",
  },
  contentControls: [
    { key: "label", label: "Label", group: "Bilah", type: "text" },
    { key: "value", label: "Nilai (0–100)", group: "Bilah", type: "number" },
    { key: "showValue", label: "Tampilkan Persentase", group: "Bilah", type: "boolean" },
    {
      key: "variant",
      label: "Warna Status",
      group: "Bilah",
      type: "select",
      options: [
        { value: "primary", label: "Utama (Tema)" },
        { value: "success", label: "Sukses (Hijau)" },
        { value: "warning", label: "Peringatan (Kuning)" },
        { value: "danger", label: "Bahaya (Merah)" },
      ],
    },
    { key: "hint", label: "Keterangan", group: "Bilah", type: "text" },
  ],
};
