import type { RawTemplateNode } from "@/templates";

/** Halaman masuk dua kolom dengan gambar — terinspirasi dari template "login-form-20". */
export function createLoginSplitNodes(): RawTemplateNode[] {
  return [
    {
      id: "login-split-card",
      componentType: "auth-login",
      name: "Masuk — Dua Kolom",
      props: {
        layout: "split",
        logoText: "Nusa Finance",
        heading: "Masuk ke akun Anda.",
        subtitle: "Kelola aset, transaksi, dan laporan dari satu dasbor yang aman.",
        emailPlaceholder: "nama@perusahaan.com",
        passwordPlaceholder: "Masukkan kata sandi",
        buttonText: "Masuk dengan aman",
        rememberText: "Ingat saya di perangkat ini",
        forgotText: "Lupa kata sandi?",
        footerText: "Belum punya akun?",
        footerLinkText: "Daftar perusahaan",
        footerLinkUrl: "#",
        splitImageUrl:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=88",
        splitImageAlt: "Tim keuangan berdiskusi di depan layar laporan",
        splitTitle: "Kendali penuh atas arus keuangan perusahaan Anda.",
        splitText:
          "Nusa Finance dipakai 1.200+ tim keuangan di Indonesia untuk memantau kas, menyetujui pengeluaran, dan menyusun laporan tanpa menunggu akhir bulan.",
      },
      styles: { padding: "none" },
    },
  ];
}