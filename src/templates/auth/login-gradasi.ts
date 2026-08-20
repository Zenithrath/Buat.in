import type { RawTemplateNode } from "@/templates";

/** Halaman masuk dengan latar gradasi — terinspirasi dari template "login-form-v16". */
export function createLoginGradasiNodes(): RawTemplateNode[] {
  return [
    {
      id: "login-gradasi-card",
      componentType: "auth-login",
      name: "Masuk — Latar Gradasi",
      props: {
        layout: "gradient",
        logoText: "Cahaya Studio",
        heading: "Lanjutkan berkarya.",
        subtitle: "Masuk untuk mengakses proyek, arsip, dan kolaborasi tim Cahaya Studio.",
        emailPlaceholder: "nama@perusahaan.com",
        passwordPlaceholder: "Masukkan kata sandi",
        buttonText: "Masuk",
        rememberText: "Ingat saya di perangkat ini",
        forgotText: "Lupa kata sandi?",
        footerText: "Belum punya akun?",
        footerLinkText: "Undang saya bergabung",
        footerLinkUrl: "#",
      },
      styles: { padding: "none" },
    },
  ];
}