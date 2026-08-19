import type { RawTemplateNode } from "@/templates";
import { uid } from "@/lib/utils";

/** Curated retail landing page template with static, export-ready content. */
export function createStorefrontNodes(): RawTemplateNode[] {
  return [
    {
      id: uid(),
      componentType: "navbar-minimal",
      name: "Navigasi Ruang Rasa",
      props: {
        logoText: "Ruang Rasa",
        link1Text: "Koleksi",
        link1Url: "#koleksi",
        link2Text: "Cerita Kami",
        link2Url: "#tentang",
        link3Text: "Bantuan",
        link3Url: "#kontak",
        ctaText: "Lihat Koleksi",
        ctaUrl: "#koleksi",
      },
      styles: { padding: "none", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "hero-centered",
      name: "Hero Ruang Rasa",
      props: {
        badgeText: "Koleksi Pilihan untuk Rumah yang Dihuni",
        title: "Benda-benda baik untuk ritme sehari-hari.",
        description:
          "Ruang Rasa merangkum peralatan rumah, tekstil, dan hadiah kecil yang dibuat untuk dipakai lama dan dinikmati pelan-pelan.",
        primaryCtaText: "Lihat Katalog",
        primaryCtaUrl: "#koleksi",
        secondaryCtaText: "Cerita Ruang Rasa",
        secondaryCtaUrl: "#tentang",
        imageUrl:
          "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=85",
        imageAlt: "Ruang keluarga hangat dengan koleksi dekorasi rumah minimalis",
      },
      styles: { padding: "xl", contentWidth: "default", textAlign: "center" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "product-grid-basic",
      name: "Koleksi Pilihan",
      props: {
        sectionId: "koleksi",
        sectionTitle: "Pilihan yang paling sering kembali dicari.",
        sectionSubtitle:
          "Empat benda sederhana dengan material yang jujur dan warna yang mudah tinggal di rumah mana pun.",
        productsJson: JSON.stringify([
          {
            id: "linen",
            name: "Linen Table Set",
            price: "Rp 325.000",
            tag: "Pilihan",
            imageUrl:
              "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "ceramic",
            name: "Keramik Pagi",
            price: "Rp 185.000",
            tag: "Baru",
            imageUrl:
              "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "lamp",
            name: "Lampu Meja Sore",
            price: "Rp 460.000",
            imageUrl:
              "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "aroma",
            name: "Aroma Rumah No. 03",
            price: "Rp 215.000",
            imageUrl:
              "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
          },
        ]),
      },
      styles: { padding: "xl", contentWidth: "default", background: "muted" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "about-basic",
      name: "Cerita Ruang Rasa",
      props: {
        eyebrow: "Tentang Ruang Rasa",
        title: "Kami percaya rumah tumbuh dari benda yang dipilih dengan sadar.",
        description:
          "Kami bekerja dengan perajin dan studio kecil untuk menghadirkan koleksi rumah yang fungsional, tenang, dan mudah dipadukan. Setiap produk dipilih dalam jumlah terbatas agar kualitas, proses, dan orang di baliknya tetap terasa dekat.",
        imageUrl:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Interior rumah minimalis bernuansa hangat",
        stat1Number: "32",
        stat1Label: "koleksi dikurasi setiap musim",
        stat2Number: "18",
        stat2Label: "mitra perajin lokal",
        stat3Number: "4,9/5",
        stat3Label: "rata-rata ulasan pelanggan",
      },
      styles: { padding: "xl", contentWidth: "default", textAlign: "left" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "cta-basic",
      name: "Ajakan Koleksi Baru",
      props: {
        title: "Dapatkan kabar koleksi berikutnya lebih dulu.",
        description:
          "Satu email singkat saat koleksi baru hadir, cerita perajin, dan pilihan hadiah musiman dibuka.",
        buttonText: "Ikuti Kabar Kami",
        buttonUrl: "#kontak",
        secondaryText: "Lihat Koleksi",
        secondaryUrl: "#koleksi",
      },
      styles: { padding: "xl", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "footer-basic",
      name: "Footer Ruang Rasa",
      props: {
        brandName: "Ruang Rasa",
        tagline:
          "Pilihan rumah yang dibuat dengan perhatian pada fungsi, rasa, dan orang di balik prosesnya.",
        link1Text: "Koleksi",
        link1Url: "#koleksi",
        link2Text: "Cerita Kami",
        link2Url: "#tentang",
        link3Text: "Hubungi Kami",
        link3Url: "#kontak",
        copyrightText: "© 2026 Ruang Rasa. Semua hak dilindungi.",
      },
      styles: { padding: "none", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
  ];
}
