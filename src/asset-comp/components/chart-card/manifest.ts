import type { ComponentManifest } from "@/lib/registry/types";

export const chartCardManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "chart-card",
  name: "Analytics Chart Card",
  category: "dashboard",
  scope: "dashboard",
  description: "Kartu visualisasi grafik interaktif (Area, Line, Bar, Donut) menggunakan token grafik tema.",
  tier: "pro",
  priceKey: "chart-card",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    title: "Pendapatan & Pengunjung",
    subtitle: "Tren 6 bulan terakhir",
    chartType: "area",
    dataJson: JSON.stringify([
      { label: "Jan", val1: 40, val2: 24 },
      { label: "Feb", val1: 55, val2: 32 },
      { label: "Mar", val1: 75, val2: 45 },
      { label: "Apr", val1: 60, val2: 38 },
      { label: "Mei", val1: 90, val2: 60 },
      { label: "Jun", val1: 110, val2: 78 },
    ]),
  },
  contentControls: [
    { key: "title", label: "Judul Grafik", group: "Header", type: "text" },
    { key: "subtitle", label: "Sub-judul / Periode", group: "Header", type: "text" },
    {
      key: "chartType",
      label: "Tipe Visualisasi",
      group: "Chart",
      type: "select",
      options: [
        { value: "area", label: "Area Chart" },
        { value: "line", label: "Line Chart" },
        { value: "bar", label: "Bar Chart" },
        { value: "donut", label: "Donut Chart" },
      ],
    },
    {
      key: "dataJson",
      label: "Data grafik",
      group: "Chart",
      type: "array",
      itemSchema: [
        { key: "label", label: "Label", type: "text" },
        { key: "val1", label: "Nilai utama", type: "number" },
        { key: "val2", label: "Nilai pembanding", type: "number" },
      ],
    },
  ],
};
