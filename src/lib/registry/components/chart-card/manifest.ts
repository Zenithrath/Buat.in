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
    chartType: "area",
    dataJson: JSON.stringify([
      { month: "Jan", revenue: 45000, users: 1200 },
      { month: "Feb", revenue: 52000, users: 1400 },
      { month: "Mar", revenue: 48000, users: 1350 },
      { month: "Apr", revenue: 61000, users: 1800 },
      { month: "Mei", revenue: 75000, users: 2200 },
      { month: "Jun", revenue: 92000, users: 2700 },
      { month: "Jul", revenue: 128450, users: 3400 },
    ]),
  },
  contentControls: [
    { key: "title", label: "Judul Grafik", group: "Data", type: "text" },
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
