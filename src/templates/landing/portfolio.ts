import type { RawTemplateNode } from "@/templates";

/** Editorial portfolio: generous type, image-led work, and a dark art-direction. */
export function createPortfolioLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: "portfolio-nav",
      componentType: "navbar-fullscreen",
      name: "Navigasi Titik Temu",
      props: {
        logoText: "TITIK TEMU",
        eyebrow: "Pilih arah",
        links: [
          { label: "Karya terpilih", url: "#karya" },
          { label: "Tentang studio", url: "#tentang" },
          { label: "Cara bekerja", url: "#cara-kerja" },
          { label: "Mulai percakapan", url: "#kontak" },
        ],
        ctaText: "Mulai percakapan",
        ctaUrl: "#kontak",
      },
      styles: { padding: "none" },
    },
    {
      id: "portfolio-hero",
      componentType: "hero-centered",
      name: "Hero Portofolio",
      props: {
        badgeText: "Independent creative practice · Jakarta / Bali",
        title: "Kami memberi bentuk pada cerita yang layak diingat.",
        description:
          "Titik Temu adalah studio kecil untuk identitas, web, dan pengalaman digital yang terasa dekat sekaligus jelas arahnya.",
        primaryCtaText: "Lihat karya",
        primaryCtaUrl: "#karya",
        secondaryCtaText: "Kenal lebih dekat",
        secondaryCtaUrl: "#tentang",
        imageUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=88",
        imageAlt: "Studio kreatif dengan monitor dan material desain",
        supportingText: "Brand, digital, dan pengalaman yang bertahan lebih lama dari tren.",
        imageBadgeText: "SELECTED WORK",
      },
      styles: { padding: "xl", contentWidth: "default" },
    },
    {
      id: "portfolio-gallery",
      componentType: "gallery-grid",
      name: "Karya Terpilih",
      props: {
        eyebrow: "Karya terpilih",
        title: "Masing-masing dimulai dari percakapan yang sangat berbeda.",
        description: "Arah visual mengikuti karakter bisnis, bukan formula yang sama untuk semua orang.",
        columns: "3",
        images: [
          {
            url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85",
            alt: "Eksplorasi identitas visual dengan bentuk grafis",
            title: "Rona / brand system",
            caption: "Identity",
          },
          {
            url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1000&q=85",
            alt: "Meja kerja kreatif dengan buku dan laptop",
            title: "Nara / digital home",
            caption: "Website",
          },
          {
            url: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",
            alt: "Kemasan produk dengan komposisi artistik",
            title: "Sura / packaging",
            caption: "Packaging",
          },
          {
            url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
            alt: "Tim kreatif berdiskusi dalam studio",
            title: "Karsa / new direction",
            caption: "Strategy",
          },
          {
            url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
            alt: "Interior studio modern dengan tanaman",
            title: "Rumah Sela / place",
            caption: "Environment",
          },
          {
            url: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85",
            alt: "Sketsa dan material desain di atas meja",
            title: "Ombak / campaign",
            caption: "Editorial",
          },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "portfolio-about",
      componentType: "about-basic",
      name: "Tentang Titik Temu",
      props: {
        sectionId: "tentang",
        eyebrow: "Tentang studio",
        title: "Rasa ingin tahu adalah alat kerja kami yang paling penting.",
        description:
          "Kami tidak datang dengan jawaban yang sudah jadi. Kami mendengar konteks, mencari ketegangan yang menarik, lalu menerjemahkannya menjadi sistem yang bisa dipakai orang setiap hari.",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Ruang kerja studio dengan papan ide dan cahaya sore",
        stat1Number: "11",
        stat1Label: "tahun menaruh perhatian pada detail",
        stat2Number: "64",
        stat2Label: "kolaborasi lintas disiplin",
        stat3Number: "5",
        stat3Label: "orang inti di meja kerja kami",
      },
      styles: { padding: "xl" },
    },
    {
      id: "portfolio-testimonials",
      componentType: "testimonial-grid",
      name: "Cerita Kolaborator",
      props: {
        eyebrow: "Dari ruang kerja bersama",
        title: "Kami menyukai proses yang membuat semua orang ikut mengerti arah.",
        description: "Karena hasil yang baik bukan hanya soal terlihat bagus pada hari peluncuran.",
        columns: "3",
        items: [
          {
            quote: "Mereka membantu kami menemukan kata-kata yang selama ini kami cari. Hasilnya terasa seperti kami, hanya jauh lebih jelas.",
            name: "Alya Nadine",
            role: "Founder, Nara House",
            initials: "AN",
          },
          {
            quote: "Diskusinya tajam, eksekusinya tenang. Setiap keputusan visual punya alasan yang bisa kami pegang.",
            name: "Rio Wicaksono",
            role: "Director, Sura Goods",
            initials: "RW",
          },
          {
            quote: "Website baru kami tidak terasa seperti template. Ia benar-benar menceritakan cara kami bekerja.",
            name: "Fina Lestari",
            role: "Co-founder, Rona",
            initials: "FL",
          },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "portfolio-cta",
      componentType: "cta-basic",
      name: "Ajakan Kolaborasi",
      props: {
        title: "Ada sesuatu yang sedang ingin Anda bawa ke dunia?",
        description: "Ceritakan konteksnya. Kami akan mulai dari percakapan singkat, bukan presentasi yang terlalu cepat.",
        buttonText: "Mulai percakapan",
        buttonUrl: "mailto:halo@titiktemu.studio",
        secondaryText: "Lihat karya lagi",
        secondaryUrl: "#karya",
      },
      styles: { padding: "xl" },
    },
    {
      id: "portfolio-footer",
      componentType: "footer-basic",
      name: "Footer Titik Temu",
      props: {
        brandName: "TITIK TEMU",
        tagline: "Studio independen untuk cerita, sistem, dan pengalaman digital yang punya tempat di ingatan.",
        link1Text: "Karya",
        link1Url: "#karya",
        link2Text: "Tentang",
        link2Url: "#tentang",
        link3Text: "halo@titiktemu.studio",
        link3Url: "mailto:halo@titiktemu.studio",
        copyrightText: "© 2026 Titik Temu Studio. Semua hak dilindungi.",
      },
      styles: { padding: "none" },
    },
  ];
}
