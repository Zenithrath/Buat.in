import type { RawTemplateNode } from "@/templates";

/** Mobile personal-finance app landing with real pricing and user proof. */
export function createAppShowcaseLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: "appshow-nav",
      componentType: "navbar-glass",
      name: "Navigasi Nura",
      props: {
        logoText: "nura",
        link1Text: "Fitur",
        link1Url: "#fitur",
        link2Text: "Harga",
        link2Url: "#harga",
        link3Text: "FAQ",
        link3Url: "#faq",
        ctaText: "Unduh aplikasi",
        ctaUrl: "#unduh",
      },
      styles: { padding: "none" },
    },
    {
      id: "appshow-hero",
      componentType: "hero-split",
      name: "Hero Nura",
      props: {
        badgeText: "Aplikasi keuangan pribadi",
        title: "Tahu ke mana uang pergi tanpa mencatat satu per satu.",
        description:
          "Nura membaca transaksi kartu dan rekening secara otomatis, lalu merangkum pengeluaranmu per kategori dalam satu tampilan yang bisa dibuka tiap pagi.",
        primaryCtaText: "Unduh di App Store",
        primaryCtaUrl: "#unduh",
        secondaryCtaText: "Lihat fitur",
        secondaryCtaUrl: "#fitur",
        imageUrl:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=88",
        imageAlt: "Pengguna memegang ponsel dengan ringkasan pengeluaran bulanan",
        imageBadgeText: "RATING 4.8",
        supportingText: "Gratis di iOS dan Android. Tanpa kartu kredit.",
        imageNoteLabel: "Pengguna Nura",
        imageNoteText: "4,8 di App Store · 100rb+ unduhan · 92% tetap aktif sebulan.",
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-stats",
      componentType: "stats-banner",
      name: "Statistik Nura",
      props: {
        eyebrow: "Nura dalam angka",
        title: "Jutaan transaksi tercatat rapi setiap bulan.",
        sectionBg: "primary",
        stats: [
          { value: "218", suffix: " rb", label: "pengguna aktif tiap bulan" },
          { value: "1,2", suffix: " jt", label: "transaksi dicatat tiap bulan" },
          { value: "4.8", suffix: "", label: "rating di App Store" },
          { value: "96", suffix: "%", label: "pengguna bertahan lebih dari 6 bulan" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-feature-grid",
      componentType: "grid-container",
      name: "Fitur Utama Nura",
      props: { columns: "3", gap: "md" },
      styles: { padding: "xl", background: "muted" },
      children: [
        {
          id: "appshow-feature-1",
          componentType: "card-feature",
          name: "Fitur Lacak Pengeluaran",
          props: {
            icon: "chart",
            eyebrow: "Kategori otomatis",
            title: "Lacak pengeluaran tanpa buku catatan",
            description:
              "Setiap transaksi digolongkan ke kategori seperti Makan, Transportasi, dan Langganan secara otomatis, bahkan dari nama toko saja.",
            linkText: "Lihat cara kerja",
            linkUrl: "#fitur",
          },
        },
        {
          id: "appshow-feature-2",
          componentType: "card-feature",
          name: "Fitur Budget Bulanan",
          props: {
            icon: "shield",
            eyebrow: "Batas yang diingatkan",
            title: "Budget bulanan yang mengingatkanmu",
            description:
              "Tentukan batas tiap kategori. Nura memberi tahu saat pengeluaran mendekati batas, bukan setelah lewat.",
            linkText: "Atur budget",
            linkUrl: "#fitur",
          },
        },
        {
          id: "appshow-feature-3",
          componentType: "card-feature",
          name: "Fitur Laporan Otomatis",
          props: {
            icon: "zap",
            eyebrow: "Ringkasan siap baca",
            title: "Laporan bulanan otomatis",
            description:
              "Setiap awal bulan, laporan pengeluaran tersusun rapi dan siap dibagikan ke pasangan atau keluarga.",
            linkText: "Lihat contoh laporan",
            linkUrl: "#fitur",
          },
        },
      ],
    },
    {
      id: "appshow-process",
      componentType: "process-steps",
      name: "Cara Mulai Nura",
      props: {
        eyebrow: "Cara mulai",
        heading: "Tiga langkah dari nol ke kebiasaan.",
        stepsJson: JSON.stringify([
          {
            id: "p1",
            title: "Unduh aplikasi",
            description: "Nura tersedia gratis di App Store dan Google Play.",
          },
          {
            id: "p2",
            title: "Buat akun",
            description: "Daftar dengan email atau nomor HP dalam waktu kurang dari satu menit.",
          },
          {
            id: "p3",
            title: "Lacak pengeluaran",
            description: "Hubungkan satu rekening atau kartu, lalu biarkan Nura mencatat sisanya.",
          },
        ]),
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-pricing",
      componentType: "pricing-table",
      name: "Harga Nura",
      props: {
        eyebrow: "Harga jujur",
        title: "Mulai gratis, naik level saat butuh.",
        description: "Tidak ada iklan dan tidak ada biaya tersembunyi.",
        plans: [
          {
            name: "Gratis",
            price: "Rp0",
            period: "/selamanya",
            description: "Untuk mulai mencatat dan memahami pengeluaran.",
            features: ["Pencatatan otomatis", "Kategori transaksi", "Laporan bulanan"],
            buttonText: "Unduh gratis",
            buttonUrl: "#unduh",
            highlighted: false,
          },
          {
            name: "Pro",
            price: "Rp 49.000",
            period: "/bulan",
            description: "Untuk pengguna yang ingin budget dan laporan lebih lengkap.",
            features: ["Semua fitur Gratis", "Budget tanpa batas", "Laporan mingguan", "Sinkronisasi 2 perangkat"],
            buttonText: "Coba Pro",
            buttonUrl: "#harga",
            highlighted: true,
          },
          {
            name: "Keluarga",
            price: "Rp 99.000",
            period: "/bulan",
            description: "Untuk mengelola keuangan rumah tangga bersama.",
            features: ["Semua fitur Pro", "6 akun anggota", "Anggaran bersama", "Dukungan prioritas"],
            buttonText: "Pilih Keluarga",
            buttonUrl: "#harga",
            highlighted: false,
          },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-stories",
      componentType: "testimonial-grid",
      name: "Cerita Pengguna Nura",
      props: {
        eyebrow: "Kata pengguna",
        title: "Dari bingung akhir bulan jadi tahu persis angkanya.",
        description: "Dengar langsung dari orang-orang yang memakai Nura setiap hari.",
        columns: "3",
        items: [
          {
            quote:
              "Dulu akhir bulan selalu gelap. Sekarang saya tahu persis Rp 800 ribu tiap bulan bocor ke jajan, dan saya bisa menahannya.",
            name: "Nadia Salsabila",
            role: "Guru, Depok",
            initials: "NS",
          },
          {
            quote:
              "Saya pakai untuk memantau anggaran dapur dan sekolah anak. Satu aplikasi cukup untuk semuanya.",
            name: "Rina Maharani",
            role: "Ibu dua anak, Bandung",
            initials: "RM",
          },
          {
            quote:
              "Karena laporannya otomatis, saya dan suami tidak perlu duduk berdebat soal belanja.",
            name: "Dita Ayu",
            role: "Ilustrator lepas, Jakarta",
            initials: "DA",
          },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "appshow-faq",
      componentType: "faq-accordion",
      name: "FAQ Nura",
      props: {
        eyebrow: "Pertanyaan sebelum unduh",
        title: "Hal yang biasanya ditanyakan calon pengguna.",
        description: "Kalau jawabannya belum ada di sini, kirim email ke halo@nura.id.",
        items: [
          {
            question: "Bagaimana keamanan data keuangan saya?",
            answer:
              "Seluruh transaksi dienkripsi dan tidak pernah dijual ke pihak lain. Anda bisa menghapus semua data kapan pun dari pengaturan akun.",
          },
          {
            question: "Apakah bisa dipakai di dua ponsel sekaligus?",
            answer:
              "Paket Gratis menyinkronkan satu perangkat. Paket Pro dan Keluarga mendukung beberapa perangkat dengan akun yang sama.",
          },
          {
            question: "Bagaimana kalau saya ingin berhenti berlangganan?",
            answer:
              "Pembatalan dilakukan dari pengaturan akun dalam dua ketukan. Akses Pro tetap berlaku sampai akhir periode yang sudah dibayar.",
          },
          {
            question: "Apakah Nura melihat isi transaksi saya?",
            answer:
              "Kami hanya membaca tanggal, nominal, dan nama merchant untuk menyusun kategori. Sandi dan PIN kartu tidak pernah diminta.",
          },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-cta",
      componentType: "cta-basic",
      name: "Ajakan Unduh Nura",
      props: {
        title: "Mulai tahu uangmu minggu ini juga.",
        description:
          "Unduh Nura gratis, hubungkan satu rekening, dan lihat ringkasan pengeluaranmu malam ini.",
        buttonText: "Unduh di App Store",
        buttonUrl: "#unduh",
        secondaryText: "Lihat harga",
        secondaryUrl: "#harga",
      },
      styles: { padding: "xl" },
    },
    {
      id: "appshow-footer",
      componentType: "footer-basic",
      name: "Footer Nura",
      props: {
        brandName: "nura",
        brandUrl: "#",
        tagline: "Aplikasi keuangan pribadi untuk mencatat, memahami, dan menahan pengeluaran.",
        copyrightText: "© 2026 Nura. Dibuat di Indonesia.",
        linksJson: JSON.stringify([
          { label: "Fitur", url: "#fitur" },
          { label: "Harga", url: "#harga" },
          { label: "halo@nura.id", url: "mailto:halo@nura.id" },
        ]),
      },
      styles: { padding: "none" },
    },
  ];
}
