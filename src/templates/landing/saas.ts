import type { RawTemplateNode } from "@/templates";
import { uid } from "@/lib/utils";

/** SaaS/Landing Page template nodes */
export function createSaasLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: uid(),
      componentType: "navbar-minimal",
      name: "Navbar",
      props: {
        logoText: "SaaSify",
        link1Text: "Fitur",
        link1Url: "#fitur",
        link2Text: "Harga",
        link2Url: "#harga",
        link3Text: "Blog",
        link3Url: "#blog",
        ctaText: "Daftar Gratis",
        ctaUrl: "#",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "hero-centered",
      name: "Hero Section",
      props: {
        badgeText: "🚀 Platform SaaS No-Code #1 di Indonesia",
        title: "Rancang Produk Digital Lebih Cepat",
        description:
          "Platform visual builder untuk startup dan tim produk yang ingin bergerak cepat tanpa koding dari nol.",
        primaryCtaText: "Mulai Gratis Sekarang",
        primaryCtaUrl: "#",
        secondaryCtaText: "Lihat Demo →",
        secondaryCtaUrl: "#demo",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "about-basic",
      name: "Tentang Kami",
      props: {
        title: "Dipercaya oleh Ribuan Tim Produk",
        description:
          "SaaSify hadir untuk menyederhanakan proses perancangan dan peluncuran produk digital Anda dengan antarmuka visual yang mudah digunakan.",
        stat1Number: "12K+",
        stat1Label: "Pengguna Aktif",
        stat2Number: "99.7%",
        stat2Label: "Uptime SLA",
        stat3Number: "4.9★",
        stat3Label: "Rating Pengguna",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "cta-basic",
      name: "Call to Action",
      props: {
        title: "Siap Memulai Proyek Pertama Anda?",
        description:
          "Bergabung dengan ribuan developer dan desainer yang menggunakan SaaSify.",
        buttonText: "Buat Akun Gratis",
        buttonUrl: "#",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "footer-basic",
      name: "Footer",
      props: {
        copyrightText: "© 2026 SaaSify. All rights reserved.",
        link1Text: "Privasi",
        link1Url: "#",
        link2Text: "Syarat Penggunaan",
        link2Url: "#",
        link3Text: "Hubungi Kami",
        link3Url: "#",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
  ];
}
