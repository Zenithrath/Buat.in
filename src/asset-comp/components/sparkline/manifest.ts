import type { ComponentManifest } from "@/lib/registry/types";

export const sparklineManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "sparkline",
  name: "Sparkline",
  category: "data",
  scope: "dashboard",
  description: "Kartu kecil berisi garis tren, nilai utama, dan arah perubahan persentase untuk satu metrik.",
  tier: "free",
  priceKey: "sparkline",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    label: "Penjualan minggu ini",
    value: "Rp 24,5 juta",
    trend: "+12%",
    up: true,
    data: "12,18,14,22,20,27,24",
    height: 48,
  },
  contentControls: [
    { key: "label", label: "Label Metrik", group: "Sparkline", type: "text" },
    { key: "value", label: "Nilai Utama", group: "Sparkline", type: "text" },
    { key: "trend", label: "Perubahan", group: "Sparkline", type: "text" },
    { key: "up", label: "Tren Naik", group: "Sparkline", type: "boolean" },
    { key: "data", label: "Data (dipisah koma)", group: "Sparkline", type: "text" },
    { key: "height", label: "Tinggi Grafik (px)", group: "Sparkline", type: "number" },
  ],
};
