import type { ComponentManifest } from "@/lib/registry/types";

export const backToTopManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "back-to-top",
  name: "Back to Top",
  category: "actions",
  scope: "landing",
  description: "Tombol melayang untuk kembali ke atas halaman; muncul setelah pengguna menggulir cukup jauh.",
  tier: "free",
  priceKey: "back-to-top",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    label: "Kembali ke atas",
    position: "right",
    showAfter: 320,
    variant: "solid",
  },
  contentControls: [
    { key: "label", label: "Label (aksesibilitas)", group: "Tombol", type: "text" },
    {
      key: "position",
      label: "Posisi",
      group: "Tombol",
      type: "select",
      options: [
        { value: "right", label: "Kanan bawah" },
        { value: "left", label: "Kiri bawah" },
      ],
    },
    { key: "showAfter", label: "Muncul setelah (px gulir)", group: "Perilaku", type: "number" },
    {
      key: "variant",
      label: "Gaya",
      group: "Tombol",
      type: "select",
      options: [
        { value: "solid", label: "Solid" },
        { value: "outline", label: "Outline" },
        { value: "ghost", label: "Transparan" },
      ],
    },
  ],
};
