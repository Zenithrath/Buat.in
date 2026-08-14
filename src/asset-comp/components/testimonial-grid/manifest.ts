import type { ComponentManifest } from "@/lib/registry/types";

export const testimonialGridManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "testimonial-grid",
  name: "Grid Testimoni",
  category: "content",
  scope: "landing",
  description: "Kumpulan testimoni pelanggan dengan kutipan, nama, jabatan, dan inisial.",
  tier: "free",
  priceKey: "testimonial-grid",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Cerita dari mereka",
    title: "Keputusan kecil yang membuat pekerjaan terasa lebih ringan.",
    description: "Dengar langsung dari orang-orang yang menjalankan bisnisnya setiap hari.",
    columns: "3",
    items: [
      { quote: "Prosesnya terasa jernih sejak awal. Tim kami akhirnya punya bahasa yang sama untuk menjelaskan arah brand.", name: "Nadia Kurnia", role: "Founder, Rona Studio", initials: "NK" },
      { quote: "Bukan hanya terlihat lebih baik—website ini membuat calon klien jauh lebih cepat memahami apa yang kami tawarkan.", name: "Rangga Pratama", role: "Direktur, Karsa", initials: "RP" },
      { quote: "Kami suka karena semuanya terasa sangat manusiawi: rapi, tidak berlebihan, dan mudah diteruskan oleh tim internal.", name: "Salsa Mutiara", role: "Marketing Lead, Foli", initials: "SM" },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul bagian", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    { key: "columns", label: "Jumlah kolom", group: "Tata letak", type: "select", options: [
      { value: "1", label: "1 kolom" }, { value: "2", label: "2 kolom" }, { value: "3", label: "3 kolom" },
    ] },
    { key: "items", label: "Daftar testimoni", group: "Testimoni", type: "array", itemSchema: [
      { key: "quote", label: "Kutipan", type: "textarea" },
      { key: "name", label: "Nama", type: "text" },
      { key: "role", label: "Peran atau perusahaan", type: "text" },
      { key: "initials", label: "Inisial avatar", type: "text" },
    ] },
  ],
};
