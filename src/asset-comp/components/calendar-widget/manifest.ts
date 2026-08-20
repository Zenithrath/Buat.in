import type { ComponentManifest } from "@/lib/registry/types";

export const calendarWidgetManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "calendar-widget",
  name: "Kalender",
  category: "data",
  scope: "dashboard",
  description: "Widget kalender bulanan dengan penanda tanggal penting dan tanggal hari ini di dashboard.",
  tier: "free",
  priceKey: "calendar-widget",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    monthLabel: "Agustus 2026",
    daysJson: [3, 8, 12, 17, 21, 25],
    todayDay: 15,
  },
  contentControls: [
    { key: "monthLabel", label: "Nama Bulan", group: "Kalender", type: "text" },
    {
      key: "daysJson",
      label: "Tanggal Penting",
      group: "Kalender",
      type: "array",
      itemSchema: [{ key: "day", label: "Tanggal", type: "number" }],
    },
    { key: "todayDay", label: "Tanggal Hari Ini", group: "Kalender", type: "number" },
  ],
};
