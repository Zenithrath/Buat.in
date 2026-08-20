import type { RawTemplateNode } from "@/templates";

/** Halaman masuk minimalis — terinspirasi dari template "login-form-02". */
export function createLoginMinimalNodes(): RawTemplateNode[] {
  return [
    {
      id: "login-minimal-card",
      componentType: "auth-login",
      name: "Masuk — Kartu Tengah",
      props: {
        layout: "centered",
        logoText: "Bersama",
        heading: "Selamat datang kembali.",
        subtitle: "Masuk untuk melanjutkan pekerjaan Anda di dasbor Bersama.",
        emailPlaceholder: "nama@perusahaan.com",
        passwordPlaceholder: "Masukkan kata sandi",
        buttonText: "Masuk",
        rememberText: "Ingat saya di perangkat ini",
        forgotText: "Lupa kata sandi?",
        footerText: "Belum punya akun?",
        footerLinkText: "Daftar gratis",
        footerLinkUrl: "#",
      },
      styles: { padding: "none" },
    },
  ];
}