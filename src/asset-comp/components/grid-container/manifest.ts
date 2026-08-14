import type { ComponentManifest } from "@/lib/registry/types";

export const gridContainerManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "grid-container",
  name: "Grid Container",
  category: "layout",
  scope: "both",
  description: "Kontainer kolom grid responsif (1, 2, 3, atau 4 kolom) untuk menyusun widget/kartu secara berdampingan.",
  tier: "free",
  priceKey: "grid-container",
  version: "1.0.0",
  defaultProps: {
    columns: "4",
    gap: "md",
  },
  contentControls: [
    {
      key: "columns",
      label: "Jumlah Kolom (Desktop)",
      group: "Layout Grid",
      type: "select",
      options: [
        { value: "1", label: "1 Kolom" },
        { value: "2", label: "2 Kolom" },
        { value: "3", label: "3 Kolom" },
        { value: "4", label: "4 Kolom" },
      ],
    },
    {
      key: "gap",
      label: "Jarak Antar Kartu",
      group: "Layout Grid",
      type: "select",
      options: [
        { value: "sm", label: "Kecil (8px)" },
        { value: "md", label: "Sedang (16px)" },
        { value: "lg", label: "Besar (24px)" },
      ],
    },
  ],
};
