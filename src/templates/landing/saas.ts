import type { RawTemplateNode } from "@/templates";
import { uid } from "@/lib/utils";

/** A static, editorial company profile rather than a SaaS product page. */
export function createSaasLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: uid(),
      componentType: "navbar-minimal",
      name: "Navigasi Karsa Studio",
      props: {
        logoText: "Karsa Studio",
        link1Text: "Layanan",
        link1Url: "#layanan",
        link2Text: "Profil",
        link2Url: "#profil",
        link3Text: "Kontak",
        link3Url: "#kontak",
        ctaText: "Mulai Proyek",
        ctaUrl: "#kontak",
      },
      styles: { padding: "none", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "hero-centered",
      name: "Hero Company Profile",
      props: {
        badgeText: "Karsa Studio - Brand & Digital",
        title: "Kami merancang brand dan website yang terasa tepat.",
        description:
          "Partner kreatif untuk bisnis yang ingin hadir lebih jelas, lebih dipercaya, dan lebih mudah diingat.",
        primaryCtaText: "Diskusikan Proyek",
        primaryCtaUrl: "#kontak",
        secondaryCtaText: "Lihat Layanan",
        secondaryCtaUrl: "#layanan",
        imageUrl:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
        imageAlt:
          "Ruang kerja kreatif Karsa Studio dengan meja kolaborasi dan cahaya alami",
      },
      styles: { padding: "xl", contentWidth: "default", textAlign: "center" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "about-basic",
      name: "Profil Karsa Studio",
      props: {
        sectionId: "profil",
        eyebrow: "Tentang Studio",
        title: "Strategi yang berpijak pada manusia, bukan tren sesaat.",
        description:
          "Karsa Studio membantu pemilik bisnis menerjemahkan cerita dan ambisinya menjadi identitas yang utuh. Dari arah brand sampai website, setiap keputusan kami buat agar mudah dipahami pelanggan dan mudah dijalankan tim Anda.",
        imageUrl:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Tim kreatif berdiskusi di ruang kerja terbuka",
        stat1Number: "8+",
        stat1Label: "tahun membangun brand",
        stat2Number: "74",
        stat2Label: "proyek selesai dengan rapi",
        stat3Number: "18",
        stat3Label: "mitra aktif tahun ini",
      },
      styles: { padding: "xl", contentWidth: "default", textAlign: "left" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "product-grid-basic",
      name: "Layanan Utama",
      props: {
        sectionTitle: "Layanan yang menyatukan gambaran besar dan detail kecil.",
        sectionSubtitle:
          "Pilih pendampingan yang sesuai tahap bisnis Anda, atau susun ruang lingkup proyek bersama kami.",
        productsJson: JSON.stringify([
          {
            id: "strategy",
            name: "Arah & Strategi Brand",
            price: "Riset, positioning, dan pesan utama",
            description: "Fondasi keputusan agar brand bergerak ke arah yang sama.",
            actionText: "Pelajari layanan",
            imageUrl:
              "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "identity",
            name: "Identitas Visual",
            price: "Logo, sistem visual, dan panduan aplikasi",
            description: "Sistem yang konsisten, mudah dipakai, dan terasa khas.",
            actionText: "Pelajari layanan",
            imageUrl:
              "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "website",
            name: "Website Perusahaan",
            price: "Struktur konten dan desain responsif yang jelas",
            description: "Situs yang menjelaskan nilai bisnis sebelum menjualnya.",
            actionText: "Pelajari layanan",
            imageUrl:
              "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
          },
          {
            id: "launch",
            name: "Kampanye Peluncuran",
            price: "Materi komunikasi untuk momen yang penting",
            description: "Pesan dan materi yang membuat peluncuran terasa terarah.",
            actionText: "Pelajari layanan",
            imageUrl:
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
          },
        ]),
      },
      styles: { padding: "xl", contentWidth: "default", background: "muted" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "cta-basic",
      name: "Ajakan Konsultasi",
      props: {
        title: "Punya cerita yang perlu disampaikan dengan lebih baik?",
        description:
          "Ceritakan konteks bisnis Anda dalam sesi perkenalan singkat. Kami akan membantu memetakan langkah yang paling masuk akal.",
        buttonText: "Jadwalkan Konsultasi",
        buttonUrl: "mailto:halo@karsastudio.id",
        secondaryText: "Lihat Layanan",
        secondaryUrl: "#layanan",
      },
      styles: { padding: "xl", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
    {
      id: uid(),
      componentType: "footer-basic",
      name: "Footer Karsa Studio",
      props: {
        brandName: "Karsa Studio",
        tagline:
          "Studio brand dan digital untuk bisnis yang ingin tumbuh dengan arah yang jelas.",
        link1Text: "Layanan",
        link1Url: "#layanan",
        link2Text: "Profil",
        link2Url: "#profil",
        link3Text: "Halo@karsastudio.id",
        link3Url: "mailto:halo@karsastudio.id",
        copyrightText: "© 2026 Karsa Studio. Semua hak dilindungi.",
      },
      styles: { padding: "none", contentWidth: "default" },
      tabletOverride: {},
      mobileOverride: {},
    },
  ];
}
