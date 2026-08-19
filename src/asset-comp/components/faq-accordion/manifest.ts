import type { ComponentManifest } from "@/lib/registry/types";

export const faqAccordionManifest: Omit<ComponentManifest, "previewRenderer" | "exportAdapter"> = {
  id: "faq-accordion",
  name: "FAQ Akordeon",
  category: "content",
  scope: "landing",
  description: "Pertanyaan umum dalam akordeon ringan yang tetap bekerja tanpa JavaScript saat diekspor.",
  tier: "free",
  priceKey: "faq-accordion",
  version: "2.0.0",
  defaultProps: {
    eyebrow: "Pertanyaan yang sering muncul",
    title: "Semua yang perlu Anda tahu sebelum mulai.",
    description: "Jika jawabannya belum ada di sini, Anda selalu bisa menghubungi kami untuk berdiskusi.",
    items: [
      { question: "Berapa lama proses pembuatan website?", answer: "Ruang lingkup sederhana biasanya dapat selesai dalam 2–4 minggu. Kami menyepakati jadwal yang jelas sebelum pekerjaan dimulai." },
      { question: "Apakah saya bisa mengubah isi setelah website selesai?", answer: "Bisa. Anda dapat mengubah teks, gambar, tautan, warna, dan susunan bagian langsung dari builder tanpa menulis kode." },
      { question: "Apakah website ini nyaman dibuka dari ponsel?", answer: "Ya. Setiap bagian sudah dirancang responsif, lalu dapat diperiksa kembali melalui mode desktop, tablet, dan ponsel di kanvas." },
      { question: "Bagaimana jika kebutuhan saya bertambah?", answer: "Mulai dari struktur yang paling penting terlebih dahulu. Bagian baru dapat ditambahkan kapan saja saat proyek Anda berkembang." },
    ],
  },
  contentControls: [
    { key: "eyebrow", label: "Label kecil", group: "Header", type: "text" },
    { key: "title", label: "Judul bagian", group: "Header", type: "text" },
    { key: "description", label: "Penjelasan", group: "Header", type: "textarea" },
    { key: "items", label: "Pertanyaan & jawaban", group: "FAQ", type: "array", itemSchema: [
      { key: "question", label: "Pertanyaan", type: "text" },
      { key: "answer", label: "Jawaban", type: "textarea" },
    ] },
  ],
};
