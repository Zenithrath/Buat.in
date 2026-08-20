import type { ComponentManifest } from "@/lib/registry/types";

export const breadcrumbManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "breadcrumb",
  name: "Breadcrumb",
  category: "navigation",
  scope: "both",
  description: "Jalur navigasi hierarki halaman dengan ikon rumah di awal dan tautan yang bisa diedit.",
  tier: "free",
  priceKey: "breadcrumb",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    homeUrl: "/",
    separator: "/",
    showHome: true,
    itemsJson: JSON.stringify([
      { id: "b1", label: "Produk", url: "#produk" },
      { id: "b2", label: "Aksesori", url: "#aksesori" },
      { id: "b3", label: "Tas Kulit", url: "" },
    ]),
  },
  contentControls: [
    { key: "showHome", label: "Tampilkan Ikon Rumah", group: "Breadcrumb", type: "boolean" },
    { key: "separator", label: "Pemisah", group: "Breadcrumb", type: "select", options: [{ value: "/", label: "Garis miring ( / )" }, { value: "›", label: "Panah ( › )" }, { value: ">", label: "Lebih besar ( > )" }, { value: "•", label: "Titik ( • )" }] },
    {
      key: "itemsJson",
      label: "Tingkat Halaman",
      group: "Breadcrumb",
      type: "array",
      itemSchema: [
        { key: "label", label: "Nama halaman", type: "text" },
        { key: "url", label: "Tautan (kosongkan untuk halaman aktif)", type: "link" },
      ],
    },
  ],
};
