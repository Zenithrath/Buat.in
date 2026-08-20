import type { ComponentManifest } from "@/lib/registry/types";

export const stackAvatarManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "stack-avatar",
  name: "Stack Avatar",
  category: "content",
  scope: "dashboard",
  description: "Tumpukan avatar lingkaran berisi inisial nama anggota dengan penanda jumlah tambahan.",
  tier: "free",
  priceKey: "stack-avatar",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    avatarsJson: JSON.stringify([
      { name: "Ayu Lestari" },
      { name: "Bayu Pratama" },
      { name: "Citra Dewi" },
      { name: "Dimas Arya" },
      { name: "Elsa Putri" },
    ]),
    extraCount: "+12",
    showExtra: true,
  },
  contentControls: [
    {
      key: "avatarsJson",
      label: "Daftar Avatar",
      group: "Avatar",
      type: "array",
      itemSchema: [{ key: "name", label: "Nama", type: "text" }],
    },
    { key: "extraCount", label: "Teks Jumlah Tambahan", group: "Avatar", type: "text" },
    { key: "showExtra", label: "Tampilkan Jumlah Tambahan", group: "Avatar", type: "boolean" },
  ],
};
