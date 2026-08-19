import type { ComponentManifest } from "@/lib/registry/types";

export const kpiCardManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "kpi-card",
  name: "KPI Metric Card",
  category: "dashboard",
  scope: "dashboard",
  description: "Kartu indikator performa utama (KPI) dengan metrik angka, tren persentase naik/turun, dan deskripsi.",
  tier: "free",
  priceKey: "kpi-card",
  version: "1.0.0",
  defaultProps: {
    title: "Total Pendapatan",
    value: "Rp 128.450.000",
    change: "+14.2%",
    trend: "up",
    period: "vs bulan lalu",
    subtitle: "vs bulan lalu",
  },
  contentControls: [
    { key: "title", label: "Judul Metrik", group: "KPI", type: "text" },
    { key: "value", label: "Nilai Utama", group: "KPI", type: "text" },
    { key: "change", label: "Persentase Perubahan", group: "KPI", type: "text" },
    {
      key: "trend",
      label: "Arah Tren",
      group: "KPI",
      type: "select",
      options: [
        { value: "up", label: "Naik (Hijau)" },
        { value: "down", label: "Turun (Merah)" },
        { value: "neutral", label: "Netral (Abu-abu)" },
      ],
    },
    { key: "period", label: "Keterangan Periode", group: "KPI", type: "text" },
    { key: "subtitle", label: "Keterangan Waktu", group: "KPI", type: "text" },
  ],
};
