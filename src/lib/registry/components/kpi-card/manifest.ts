import type { ComponentManifest } from "@/lib/registry/types";

export const kpiCardManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "kpi-card",
  name: "KPI Metric Card",
  category: "dashboard",
  description: "Kartu indikator performa utama dengan nilai, persentase perubahan, dan indikator tren.",
  tier: "free",
  priceKey: "kpi-card",
  version: "1.0.0",
  defaultProps: {
    title: "Total Revenue",
    value: "Rp 128.450.000",
    change: "+14.2%",
    trend: "up",
    subtitle: "dibandingkan bulan lalu",
  },
  contentControls: [
    { key: "title", label: "Judul Metrik", group: "Data", type: "text" },
    { key: "value", label: "Nilai Utama", group: "Data", type: "text" },
    { key: "change", label: "Perubahan (%)", group: "Data", type: "text" },
    {
      key: "trend",
      label: "Arah Tren",
      group: "Data",
      type: "select",
      options: [
        { value: "up", label: "Naik (Hijau)" },
        { value: "down", label: "Turun (Merah)" },
        { value: "neutral", label: "Netral (Abu-abu)" },
      ],
    },
    { key: "subtitle", label: "Keterangan Waktu", group: "Data", type: "text" },
    { key: "period", label: "Keterangan Lama (compatibility)", group: "Data", type: "text" },
  ],
};
