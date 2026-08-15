import type { RawTemplateNode } from "@/templates";

/** Sekolah dasar & menengah dengan program, statistik, guru, dan FAQ orang tua. */
export function createSekolahLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: "sekolah-nav",
      componentType: "navbar-split",
      name: "Navigasi Citra Insan",
      props: {
        logoText: "CITRA INSAN",
        link1Text: "Program",
        link1Url: "#program",
        link2Text: "Tentang",
        link2Url: "#tentang",
        link3Text: "Penerimaan",
        link3Url: "#daftar",
        ctaText: "Daftar sekarang",
        ctaUrl: "#daftar",
      },
      styles: { padding: "none" },
    },
    {
      id: "sekolah-hero",
      componentType: "hero-centered",
      name: "Hero Citra Insan",
      props: {
        badgeText: "Penerimaan murid baru 2026/2027",
        title: "Sekolah dasar & menengah dengan kelas yang tidak ramai.",
        description:
          "Maksimal 24 siswa per kelas, guru yang mengenal nama setiap murid, dan kurikulum yang mengimbangi akademik dengan karakter. Pendaftaran dibuka Januari–Juni 2026.",
        primaryCtaText: "Daftar sekarang",
        primaryCtaUrl: "#daftar",
        secondaryCtaText: "Tur sekolah",
        secondaryCtaUrl: "#tur",
        imageUrl:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1600&q=88",
        imageAlt: "Siswa belajar di dalam kelas dengan meja kayu yang rapi",
        supportingText: "SD & SMP · Duren Sawit, Jakarta Timur",
        imageBadgeText: "TP. 2026/2027",
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-stats",
      componentType: "stats-banner",
      name: "Statistik Citra Insan",
      props: {
        eyebrow: "Angka dari laporan tahunan sekolah",
        title: "Pertumbuhan yang bisa dilihat orang tua, bukan hanya di brosur.",
        sectionBg: "primary",
        stats: [
          { value: "740", suffix: " siswa", label: "aktif di SD dan SMP" },
          { value: "1.900", suffix: "+", label: "alumni sejak 1998" },
          { value: "87,4", suffix: "", label: "rata-rata nilai rapor 2025" },
          { value: "62", suffix: "%", label: "siswa menerima beasiswa atau KJP" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-program",
      componentType: "grid-container",
      name: "Program Sekolah",
      props: { columns: "3", gap: "md" },
      styles: { padding: "xl", background: "muted" },
      children: [
        {
          id: "sekolah-program-1",
          componentType: "card-feature",
          name: "Akademik",
          props: {
            icon: "layers",
            eyebrow: "01 / Program",
            title: "Kelas kecil, guru pengampu tetap.",
            description:
              "Maksimal 24 siswa per kelas dengan jam belajar terstruktur dan evaluasi mingguan yang dilaporkan ke orang tua.",
            linkText: "Lihat kurikulum",
            linkUrl: "#tentang",
          },
        },
        {
          id: "sekolah-program-2",
          componentType: "card-feature",
          name: "Seni & Olahraga",
          props: {
            icon: "sparkles",
            eyebrow: "02 / Program",
            title: "Ekstrakurikuler yang benar-benar berjalan.",
            description:
              "Paduan suara, futsal, tari tradisional, dan robotik. Setiap siswa wajib memilih minimal dua kegiatan per semester.",
            linkText: "Lihat jadwal ekskul",
            linkUrl: "#tentang",
          },
        },
        {
          id: "sekolah-program-3",
          componentType: "card-feature",
          name: "Karakter",
          props: {
            icon: "shield",
            eyebrow: "03 / Program",
            title: "Pembiasaan, bukan sekadar ceramah.",
            description:
              "Piket harian, program literasi pagi 15 menit, dan pendampingan ibadah sesuai keyakinan masing-masing.",
            linkText: "Baca pendekatan kami",
            linkUrl: "#tentang",
          },
        },
      ],
    },
    {
      id: "sekolah-about",
      componentType: "about-basic",
      name: "Visi Misi Citra Insan",
      props: {
        sectionId: "tentang",
        eyebrow: "Visi & misi",
        title: "Menumbuhkan anak yang tenang, percaya diri, dan rajin bertanya.",
        description:
          "Visi kami sederhana: lulusan yang siap melanjutkan ke jenjang berikutnya dengan karakter yang tertib. Kami mempraktikkannya lewat tiga hal—kelas kecil, guru yang mengenal nama setiap murid, dan laporan kemajuan ke orang tua setiap bulan.",
        imageUrl:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Anak-anak tersenyum sambil belajar bersama di kelas",
        imageNoteLabel: "Program unggulan",
        imageNoteText: "Robotik, paduan suara, dan literasi pagi 15 menit setiap hari.",
        stat1Number: "24",
        stat1Label: "siswa maksimal per kelas",
        stat2Number: "28",
        stat2Label: "tahun berkarya sejak 1998",
        stat3Number: "98",
        stat3Label: "orang tua puas dengan laporan bulanan",
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-guru",
      componentType: "team-grid",
      name: "Guru Pengajar",
      props: {
        eyebrow: "Guru pengajar",
        title: "Guru tetap yang mengajar, bukan bergantian antar cabang.",
        description: "Sebagian besar guru kami mengajar di Citra Insan lebih dari lima tahun dan tinggal di sekitar Duren Sawit.",
        columns: "4",
        members: [
          { name: "Sri Handayani, M.Pd.", role: "Kepala Sekolah", initials: "SH", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
          { name: "Agus Wibowo, S.Pd.", role: "Guru Matematika", initials: "AW", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
          { name: "Dewi Larasati, S.Pd.", role: "Guru Bahasa Indonesia", initials: "DL", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
          { name: "Rizky Hidayat, S.T.", role: "Guru IPA & Robotik", initials: "RH", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-testimoni",
      componentType: "testimonial-grid",
      name: "Testimoni Orang Tua",
      props: {
        eyebrow: "Kata orang tua",
        title: "Hal-hal kecil yang mereka ceritakan di grup WhatsApp kelas.",
        description: "Kami menampilkan beberapa catatan orang tua dengan izin tertulis.",
        columns: "3",
        items: [
          { quote: "Anak saya yang awalnya pemalu sekarang berani maju tampil di pentas seni. Gurunya sabar sekali.", name: "Yuni Rahmawati", role: "Orang tua siswa kelas 5", initials: "YR" },
          { quote: "Setiap bulan selalu ada laporan perkembangan. Kami tidak perlu menebak-nebak.", name: "Hendra Gunawan", role: "Orang tua siswa kelas 8", initials: "HG" },
          { quote: "Jemputannya tepat waktu dan anak-anak diberi ruang mengobrol santai dengan penjaga.", name: "Citra Melati", role: "Orang tua siswa kelas 1", initials: "CM" },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "sekolah-faq",
      componentType: "faq-accordion",
      name: "FAQ Citra Insan",
      props: {
        eyebrow: "Pertanyaan umum",
        title: "Biaya, transportasi, dan seragam.",
        description: "Pertanyaan lain silakan hubungi bagian penerimaan di (021) 8612-3344.",
        items: [
          { question: "Berapa biaya sekolah per bulan?", answer: "SPP SD mulai Rp 950.000 dan SMP Rp 1.150.000 per bulan, sudah termasuk seragam batik dan buku paket. Tersedia beasiswa KJP serta potongan 10% untuk saudara kandung." },
          { question: "Apakah ada layanan antar-jemput?", answer: "Ada. Enam rute melayani Duren Sawit, Pondok Kelapa, Jatinegara, dan Kalimalang dengan tarif Rp 350.000 per bulan." },
          { question: "Apakah seragam wajib dibeli di sekolah?", answer: "Tidak. Seragam putih-merah dan batik bisa dibeli di koperasi atau di luar, asalkan sesuai ketentuan." },
          { question: "Bagaimana proses pendaftarannya?", answer: "Isi formulir daring, lalu ikuti sesi observasi singkat di sekolah. Pengumuman dikirim lewat email maksimal 7 hari setelah observasi." },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-cta",
      componentType: "cta-basic",
      name: "Ajakan Daftar Citra Insan",
      props: {
        title: "Kunjungi sekolah sebelum mendaftar.",
        description: "Tur sekolah tiap Sabtu 08.00–11.00 bersama kepala sekolah. Tanpa biaya pendaftaran sampai anak diterima.",
        buttonText: "Daftar sekarang",
        buttonUrl: "#daftar",
        secondaryText: "Tur sekolah",
        secondaryUrl: "#tur",
      },
      styles: { padding: "xl" },
    },
    {
      id: "sekolah-footer",
      componentType: "footer-basic",
      name: "Footer Citra Insan",
      props: {
        brandName: "CITRA INSAN",
        tagline: "SD & SMP di Jl. Raya Duren Sawit No. 88, Jakarta Timur. Menerima murid baru untuk tahun ajaran 2026/2027.",
        link1Text: "Program",
        link1Url: "#program",
        link2Text: "Penerimaan",
        link2Url: "#daftar",
        link3Text: "(021) 8612-3344",
        link3Url: "tel:+622186123344",
        copyrightText: "© 2026 Sekolah Citra Insan.",
      },
      styles: { padding: "none" },
    },
  ];
}
