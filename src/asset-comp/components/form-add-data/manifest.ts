import type { ComponentManifest } from "@/lib/registry/types";

export const formAddDataManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "form-add-data",
  name: "Form Tambah Data",
  category: "form",
  scope: "dashboard",
  description: "Formulir ringkas untuk menambah satu data baru dengan kolom yang bisa diatur jenis inputnya.",
  tier: "free",
  priceKey: "form-add-data",
  version: "1.0.0",
  canContainChildren: false,
  defaultProps: {
    title: "Tambah data baru",
    description: "Lengkapi kolom di bawah lalu simpan.",
    fieldsJson: JSON.stringify([
      { label: "Nama pelanggan", placeholder: "Nama lengkap pelanggan", type: "text" },
      { label: "Kategori", placeholder: "Pelanggan baru", type: "text" },
      { label: "Jumlah transaksi", placeholder: "Rp", type: "number" },
      { label: "Tanggal", placeholder: "2026-08-15", type: "date" },
    ]),
    submitText: "Simpan data",
  },
  contentControls: [
    { key: "title", label: "Judul Formulir", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    {
      key: "fieldsJson",
      label: "Kolom Formulir",
      group: "Kolom",
      type: "array",
      itemSchema: [
        { key: "label", label: "Label", type: "text" },
        { key: "placeholder", label: "Placeholder", type: "text" },
        {
          key: "type",
          label: "Jenis Input",
          type: "select",
          options: [
            { value: "text", label: "Teks" },
            { value: "date", label: "Tanggal" },
            { value: "number", label: "Angka" },
          ],
        },
      ],
    },
    { key: "submitText", label: "Teks Tombol Simpan", group: "Aksi", type: "text" },
  ],
};
