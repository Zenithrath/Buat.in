import type { RawTemplateNode } from "@/templates";

/** Nonprofit landing for a social foundation with real programs and impact numbers. */
export function createNonprofitLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: "nonprofit-nav",
      componentType: "navbar-centered",
      name: "Navigasi Yayasan",
      props: {
        logoText: "Peduli Sesama",
        link1Text: "Beranda",
        link1Url: "#",
        link2Text: "Program",
        link2Url: "#program",
        link3Text: "Tentang",
        link3Url: "#tentang",
        link4Text: "Kontak",
        link4Url: "#kontak",
        ctaText: "Donasi",
        ctaUrl: "#donasi",
      },
      styles: { padding: "none" },
    },
    {
      id: "nonprofit-hero",
      componentType: "hero-centered",
      name: "Hero Yayasan",
      props: {
        badgeText: "Yayasan Peduli Sesama",
        title: "Setiap anak berhak belajar dan makan di rumah yang aman.",
        description:
          "Kami mendampingi 4.200 anak dari keluarga prasejahtera di Jawa Barat dan Lampung lewat program pendidikan, air bersih, dan dapur umum.",
        primaryCtaText: "Donasi",
        primaryCtaUrl: "#donasi",
        secondaryCtaText: "Tentang kami",
        secondaryCtaUrl: "#tentang",
        imageUrl:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=88",
        imageAlt: "Relawan mendampingi anak-anak belajar di ruang kelas sederhana",
        imageBadgeText: "BERGERAK SEJAK 2012",
        supportingText:
          "Terdaftar di Kemenkumham No. AHU-0012345.AH.01.04 Tahun 2012.",
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-stats",
      componentType: "stats-banner",
      name: "Dampak Yayasan",
      props: {
        eyebrow: "Dampak yang terukur",
        title: "Bantuan kecil yang berulang mengubah hidup.",
        sectionBg: "primary",
        stats: [
          { value: "12.400", suffix: "+", label: "penerima manfaat" },
          { value: "3.850", suffix: "", label: "donatur aktif" },
          { value: "27", suffix: "", label: "program berjalan" },
          { value: "640", suffix: "", label: "relawan terdaftar" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-program-grid",
      componentType: "grid-container",
      name: "Program Yayasan",
      props: { columns: "3", gap: "md" },
      styles: { padding: "xl", background: "muted" },
      children: [
        {
          id: "nonprofit-program-1",
          componentType: "card-feature",
          name: "Program Pendidikan Anak",
          props: {
            icon: "globe",
            eyebrow: "Program utama",
            title: "Beasiswa dan pendampingan belajar",
            description:
              "Menanggung biaya sekolah, seragam, dan bimbingan belajar untuk 1.100 anak dari SD hingga SMA.",
            linkText: "Lihat program",
            linkUrl: "#program",
          },
        },
        {
          id: "nonprofit-program-2",
          componentType: "card-feature",
          name: "Program Air Bersih",
          props: {
            icon: "sparkles",
            eyebrow: "Kesehatan",
            title: "Sumur dan pipanisasi desa",
            description:
              "Membangun akses air bersih untuk 3.200 rumah tangga di desa yang kekeringan saat musim kemarau.",
            linkText: "Lihat program",
            linkUrl: "#program",
          },
        },
        {
          id: "nonprofit-program-3",
          componentType: "card-feature",
          name: "Program Dapur Umum",
          props: {
            icon: "zap",
            eyebrow: "Pangan",
            title: "Dapur umum saat bencana",
            description:
              "Menyiapkan 2.500 porsi makanan hangat setiap hari saat banjir melanda tiga kecamatan pada awal 2026.",
            linkText: "Lihat program",
            linkUrl: "#program",
          },
        },
      ],
    },
    {
      id: "nonprofit-about",
      componentType: "about-basic",
      name: "Tentang Yayasan",
      props: {
        sectionId: "tentang",
        eyebrow: "Tentang kami",
        title: "Kami bergerak karena tetangga, bukan karena berita.",
        description:
          "Berawal dari 12 warga di Kelurahan Sukamaju, yayasan ini kini berjejaring di 14 kabupaten. Semua program dikelola relawan dan tiga tim lapangan, dengan audit dana tahunan yang dibuka untuk umum.",
        imageUrl:
          "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=88",
        imageAlt: "Relawan yayasan membagikan paket bantuan di lapangan",
        imageNoteLabel: "Cara kami bekerja",
        imageNoteText: "Setiap donasi Rp100.000 dipertanggungjawabkan lewat laporan bulanan ke donatur.",
        stat1Number: "12.400+",
        stat1Label: "penerima manfaat",
        stat2Number: "27",
        stat2Label: "program aktif",
        stat3Number: "14",
        stat3Label: "kabupaten dampingan",
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-gallery",
      componentType: "gallery-grid",
      name: "Dokumentasi Kegiatan",
      props: {
        eyebrow: "Dokumentasi",
        title: "Kegiatan yang berjalan di lapangan.",
        description: "Pembagian beasiswa, peresmian sumur, dan dapur umum saat banjir awal 2026.",
        columns: "3",
        images: [
          {
            url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=88",
            alt: "Pembagian beasiswa sekolah",
            title: "Beasiswa 120 anak diterima",
            caption: "Pendidikan",
          },
          {
            url: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=88",
            alt: "Pemasangan pompa air bersih",
            title: "Sumur bor ketiga diresmikan",
            caption: "Air bersih",
          },
          {
            url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=88",
            alt: "Dapur umum menyiapkan makanan",
            title: "2.500 porsi per hari",
            caption: "Dapur umum",
          },
          {
            url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=900&q=88",
            alt: "Kelas bimbingan belajar",
            title: "Bimbel sore tiap pekan",
            caption: "Pendidikan",
          },
          {
            url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=88",
            alt: "Relawan menyalurkan bantuan",
            title: "Relawan dari 6 kota",
            caption: "Kegiatan",
          },
          {
            url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=88",
            alt: "Anak-anak belajar di ruang kelas",
            title: "Anak-anak binaan kelas 4",
            caption: "Pendidikan",
          },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-team",
      componentType: "team-grid",
      name: "Pengurus Yayasan",
      props: {
        eyebrow: "Pengurus",
        title: "Empat orang yang bertanggung jawab atas setiap rupiah.",
        description: "Pengurus terpilih lewat musyawarah anggota setiap tiga tahun.",
        columns: "4",
        members: [
          { name: "H. Abdullah Syarif", role: "Ketua Yayasan", initials: "AS", imageUrl: "", socialUrl: "#" },
          { name: "Siti Nurhaliza", role: "Sekretaris", initials: "SN", imageUrl: "", socialUrl: "#" },
          { name: "Bayu Wicaksono", role: "Bendahara", initials: "BW", imageUrl: "", socialUrl: "#" },
          { name: "dr. Ratna Kusuma", role: "Ketua Program Kesehatan", initials: "RK", imageUrl: "", socialUrl: "#" },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "nonprofit-stories",
      componentType: "testimonial-grid",
      name: "Kata Penerima Manfaat",
      props: {
        eyebrow: "Kata penerima manfaat",
        title: "Cerita yang membuat kami terus bekerja.",
        description: "Bantuan rutin yang sampai, bukan janji yang menggantung.",
        columns: "3",
        items: [
          {
            quote: "Anak saya bisa lanjut SMA karena beasiswa yayasan. Ia sekarang jadi juara kelas.",
            name: "Wati Suhendar",
            role: "Ibu penerima beasiswa, Bandung Barat",
            initials: "WS",
          },
          {
            quote: "Sumur ini pertama kali kami punya. Anak-anak tidak lagi jalan dua kilometer ambil air.",
            name: "Karsono",
            role: "Kepala dusun, Lampung Tengah",
            initials: "KK",
          },
          {
            quote: "Saat banjir, dapur umum buka sebelum bantuan pemerintah tiba. Kami tidak kelaparan.",
            name: "Mimin Sari",
            role: "Warga terdampak banjir, Cianjur",
            initials: "MS",
          },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-cta",
      componentType: "cta-basic",
      name: "Ajakan Donasi",
      props: {
        title: "Bantu satu anak hari ini.",
        description:
          "Rp150.000 cukup untuk beasiswa dan makan siang satu anak selama sebulan.",
        buttonText: "Donasi sekarang",
        buttonUrl: "#donasi",
        secondaryText: "Hubungi kami",
        secondaryUrl: "#kontak",
      },
      styles: { padding: "xl" },
    },
    {
      id: "nonprofit-footer",
      componentType: "footer-basic",
      name: "Footer Yayasan",
      props: {
        brandName: "Yayasan Peduli Sesama",
        brandUrl: "#",
        tagline: "Pendidikan, air bersih, dan pangan untuk keluarga prasejahtera.",
        copyrightText: "© 2026 Yayasan Peduli Sesama. Terdaftar di Kemenkumham.",
        linksJson: JSON.stringify([
          { label: "Program", url: "#program" },
          { label: "Tentang", url: "#tentang" },
          { label: "donasi@pedulisesama.id", url: "mailto:donasi@pedulisesama.id" },
        ]),
      },
      styles: { padding: "none" },
    },
  ];
}
