import type { ComponentManifest } from "@/lib/registry/types";

export const sliderTestimonialManifest: Omit<
  ComponentManifest,
  "previewRenderer" | "exportAdapter"
> = {
  id: "slider-testimonial",
  name: "Slider Testimoni",
  category: "content",
  scope: "landing",
  description: "Carousel kartu testimoni pelanggan dengan navigasi panah, titik indikator, dan auto-putar saat ekspor.",
  tier: "free",
  priceKey: "slider-testimonial",
  version: "1.0.0",
  defaultProps: {
    heading: "Kata mereka yang sudah memakai",
    autoplay: true,
    interval: 5,
    showArrows: true,
    showDots: true,
    testimonialsJson: JSON.stringify([
      { id: "t1", quote: "Halaman baru kami jadi 3x lebih cepat dimuat dan penampilannya langsung terasa lebih profesional.", author: "Rina Wijaya", role: "Pemilik Toko Online" },
      { id: "t2", quote: "Tanpa menulis kode, kami bisa mengubah tampilan sesuai identitas brand dalam hitungan menit.", author: "Budi Santoso", role: "Kepala Pemasaran" },
      { id: "t3", quote: "Hasil ekspornya rapi dan mudah dipasang tim developer kami. Prosesnya sangat hemat waktu.", author: "Sari Handayani", role: "Founder Startup" },
    ]),
  },
  contentControls: [
    { key: "heading", label: "Judul", group: "Slider", type: "text" },
    { key: "autoplay", label: "Auto-putar (saat ekspor)", group: "Slider", type: "boolean" },
    { key: "interval", label: "Interval (detik)", group: "Slider", type: "number" },
    { key: "showArrows", label: "Tampilkan Panah", group: "Slider", type: "boolean" },
    { key: "showDots", label: "Tampilkan Titik", group: "Slider", type: "boolean" },
    {
      key: "testimonialsJson",
      label: "Testimoni",
      group: "Kartu",
      type: "array",
      itemSchema: [
        { key: "quote", label: "Kutipan", type: "textarea" },
        { key: "author", label: "Nama", type: "text" },
        { key: "role", label: "Peran / Perusahaan", type: "text" },
      ],
    },
  ],
};
