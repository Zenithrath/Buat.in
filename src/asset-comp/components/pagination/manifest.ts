import type { ComponentManifest } from "@/lib/registry/types";

export const paginationManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "pagination",
  name: "Pagination",
  category: "actions",
  scope: "dashboard",
  description: "Navigasi antar halaman dengan tombol nomor, elipsis, dan kontrol sebelumnya/berikutnya.",
  tier: "free",
  priceKey: "pagination",
  version: "1.0.0",
  defaultProps: {
    currentPage: 1,
    totalPages: 5,
    showPrevNext: true,
  },
  contentControls: [
    { key: "currentPage", label: "Halaman Aktif", group: "Navigasi", type: "number" },
    { key: "totalPages", label: "Total Halaman", group: "Navigasi", type: "number" },
    { key: "showPrevNext", label: "Tampilkan Sebelumnya/Berikutnya", group: "Navigasi", type: "boolean" },
  ],
};
