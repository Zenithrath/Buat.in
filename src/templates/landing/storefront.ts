import type { RawTemplateNode } from "@/templates";
import { uid } from "@/lib/utils";

/** Storefront / e-commerce landing page template */
export function createStorefrontNodes(): RawTemplateNode[] {
  return [
    {
      id: uid(),
      componentType: "navbar-minimal",
      name: "Navbar Toko",
      props: {
        logoText: "Tokoku.id",
        link1Text: "Produk",
        link1Url: "#produk",
        link2Text: "Tentang",
        link2Url: "#tentang",
        link3Text: "Kontak",
        link3Url: "#kontak",
        ctaText: "Keranjang (0)",
        ctaUrl: "#",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "hero-centered",
      name: "Hero Toko",
      props: {
        badgeText: "🛍️ Free Ongkir Untuk Pembelian di Atas Rp 150.000",
        title: "Fashion Berkualitas Premium, Harga Terjangkau",
        description:
          "Temukan koleksi pakaian & aksesori pilihan yang cocok untuk setiap kesempatan.",
        primaryCtaText: "Belanja Sekarang",
        primaryCtaUrl: "#produk",
        secondaryCtaText: "Lihat Koleksi Terbaru",
        secondaryCtaUrl: "#produk",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "product-grid-basic",
      name: "Katalog Produk",
      props: {
        sectionTitle: "Koleksi Pilihan",
        sectionSubtitle: "Item bestseller bulan ini",
        productsJson: JSON.stringify([
          { id: "p1", name: "Kemeja Batik Premium", price: "Rp 299.000", tag: "Terlaris" },
          { id: "p2", name: "Celana Chino Slim Fit", price: "Rp 249.000", tag: "Baru" },
          { id: "p3", name: "Dress Floral Casual", price: "Rp 329.000", tag: "Diskon 20%" },
          { id: "p4", name: "Jaket Denim Classic", price: "Rp 489.000", tag: "" },
          { id: "p5", name: "Sepatu Sneaker Low", price: "Rp 399.000", tag: "Terlaris" },
          { id: "p6", name: "Tas Selempang Canvas", price: "Rp 199.000", tag: "Baru" },
        ]),
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "about-basic",
      name: "Tentang Toko",
      props: {
        title: "Lebih dari 10 Tahun Melayani Pelanggan Setia",
        description:
          "Kami berkomitmen menghadirkan pilihan fashion berkualitas dengan pengiriman cepat ke seluruh Indonesia.",
        stat1Number: "50K+",
        stat1Label: "Pelanggan Puas",
        stat2Number: "2 Hari",
        stat2Label: "Estimasi Pengiriman",
        stat3Number: "100%",
        stat3Label: "Original Produk",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "cta-basic",
      name: "CTA Newsletter",
      props: {
        title: "Dapatkan Penawaran Eksklusif!",
        description: "Daftar sekarang dan dapatkan diskon 15% untuk pembelian pertama Anda.",
        buttonText: "Daftar Sekarang",
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
        copyrightText: "© 2026 Tokoku.id — Fashion Berkualitas",
        link1Text: "Kebijakan Privasi",
        link1Url: "#",
        link2Text: "Syarat Pembelian",
        link2Url: "#",
        link3Text: "Pusat Bantuan",
        link3Url: "#",
      },
      styles: {},
      tabletOverride: {},
      mobileOverride: {},
    },
  ];
}
