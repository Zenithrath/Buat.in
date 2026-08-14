import type { ComponentManifest } from "@/lib/registry/types";

export const chartCardManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "chart-card",
  name: "Chart & Analytics Card",
  category: "dashboard",
  description: "Grafik statistik interaktif (Area, Line, Bar, Pie, Donut) dengan dataset JSON editable.",
  tier: "free",
  priceKey: "chart-card",
  version: "1.0.0",
  defaultProps: {
    title: "Tren Pendapatan & Pengguna",
    subtitle: "Ringkasan 7 bulan terakhir",
    chartType: "area",
    dataJson: JSON.stringify([
      { label: "Jan", val1: 45, val2: 28 },
      { label: "Feb", val1: 52, val2: 31 },
      { label: "Mar", val1: 48, val2: 35 },
      { label: "Apr", val1: 61, val2: 42 },
      { label: "Mei", val1: 75, val2: 53 },
      { label: "Jun", val1: 92, val2: 68 },
      { label: "Jul", val1: 128, val2: 84 },
    ]),
  },
  contentControls: [
    { key: "title", label: "Judul Grafik", group: "Data", type: "text" },
    { key: "subtitle", label: "Subjudul / Periode", group: "Data", type: "text" },
    {
      key: "chartType",
      label: "Tipe Grafik",
      group: "Tampilan",
      type: "select",
      options: [
        { value: "area", label: "Area Chart" },
        { value: "line", label: "Line Chart" },
        { value: "bar", label: "Bar Chart" },
        { value: "donut", label: "Donut / Pie Chart" },
      ],
    },
    {
      key: "dataJson",
      label: "Data Seri (JSON)",
      group: "Data",
      type: "json",
    },
  ],
};
