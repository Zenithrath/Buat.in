import type { ComponentManifest } from "@/lib/registry/types";

export const teamGridManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "team-grid",
  name: "Grid Tim",
  category: "content",
  scope: "landing",
  description: "Profil anggota tim dengan foto opsional, peran, dan tautan sosial.",
  tier: "free",
  priceKey: "team-grid",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Orang di balik pekerjaan",
    title: "Tim kecil dengan perhatian besar pada detail.",
    description: "Kami menggabungkan sudut pandang strategis, desain, dan teknologi dalam satu meja kerja.",
    columns: "4",
    members: [
      { name: "Alya Ramadhani", role: "Creative Director", initials: "AR", imageUrl: "", socialUrl: "#" },
      { name: "Dimas Pratama", role: "Brand Strategist", initials: "DP", imageUrl: "", socialUrl: "#" },
      { name: "Kezia Hartono", role: "Product Designer", initials: "KH", imageUrl: "", socialUrl: "#" },
      { name: "Faris Putra", role: "Web Developer", initials: "FP", imageUrl: "", socialUrl: "#" },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul bagian", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    { key: "columns", label: "Jumlah kolom", group: "Tata letak", type: "select", options: [
      { value: "2", label: "2 kolom" }, { value: "3", label: "3 kolom" }, { value: "4", label: "4 kolom" },
    ] },
    { key: "members", label: "Anggota tim", group: "Tim", type: "array", itemSchema: [
      { key: "name", label: "Nama", type: "text" },
      { key: "role", label: "Peran", type: "text" },
      { key: "initials", label: "Inisial avatar", type: "text" },
      { key: "imageUrl", label: "Foto", type: "image" },
      { key: "socialUrl", label: "Tautan profil", type: "link" },
    ] },
  ],
};
