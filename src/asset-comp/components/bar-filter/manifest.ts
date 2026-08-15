import type { ComponentManifest } from "@/lib/registry/types";

export const barFilterManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "bar-filter",
  name: "Bar Filter",
  category: "data",
  scope: "dashboard",
  description: "Baris chip filter yang bisa digulir untuk mempersempit data berdasarkan rentang waktu di dashboard.",
  tier: "free",
  priceKey: "bar-filter",
  version: "1.0.0",
  defaultProps: {
    title: "Filter data",
    filtersJson: [
      { label: "Semua" },
      { label: "Hari ini" },
      { label: "7 hari" },
      { label: "30 hari" },
      { label: "Kuartal ini" },
      { label: "Tahun ini" },
    ],
    activeIndex: 0,
  },
  contentControls: [
    { key: "title", label: "Judul Filter", group: "Filter", type: "text" },
    {
      key: "filtersJson",
      label: "Opsi Filter",
      group: "Filter",
      type: "array",
      itemSchema: [{ key: "label", label: "Label", type: "text" }],
    },
    { key: "activeIndex", label: "Chip Aktif (indeks)", group: "Filter", type: "number" },
  ],
};
