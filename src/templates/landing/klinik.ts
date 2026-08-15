import type { RawTemplateNode } from "@/templates";

/** Klinik kesehatan keluarga dengan dokter umum & gigi, layanan, tim, dan FAQ pasien. */
export function createKlinikLandingNodes(): RawTemplateNode[] {
  return [
    {
      id: "klinik-nav",
      componentType: "navbar-minimal",
      name: "Navigasi Klinik Sehat Keluarga",
      props: {
        logoText: "Sehat Keluarga",
        link1Text: "Layanan",
        link1Url: "#layanan",
        link2Text: "Dokter",
        link2Url: "#dokter",
        link3Text: "Kontak",
        link3Url: "#kontak",
        ctaText: "Jadwal konsultasi",
        ctaUrl: "#kontak",
      },
      styles: { padding: "none" },
    },
    {
      id: "klinik-hero",
      componentType: "hero-centered",
      name: "Hero Klinik Sehat Keluarga",
      props: {
        badgeText: "Praktek dokter umum & gigi",
        title: "Pemeriksaan yang sabar untuk setiap usia, tanpa antre berlarut.",
        description:
          "Klinik Sehat Keluarga melayani konsultasi umum, perawatan gigi, imunisasi anak, dan tes laboratorium di Kebayoran Baru. Buka setiap hari, pasien BPJS diterima.",
        primaryCtaText: "Jadwal konsultasi",
        primaryCtaUrl: "#kontak",
        secondaryCtaText: "Lihat layanan",
        secondaryCtaUrl: "#layanan",
        imageUrl:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=88",
        imageAlt: "Dokter memeriksa pasien dengan tablet di ruang konsultasi",
        supportingText: "Senin–Sabtu 08.00–20.00 · Minggu 08.00–14.00",
        imageBadgeText: "BUKA SETIAP HARI",
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-about",
      componentType: "about-basic",
      name: "Profil Klinik Sehat Keluarga",
      props: {
        sectionId: "tentang",
        eyebrow: "Tentang klinik",
        title: "Lima belas tahun melayani warga Kebayoran Baru dan sekitarnya.",
        description:
          "Klinik Sehat Keluarga berdiri sejak 2011 dengan tiga dokter tetap yang berpraktik setiap hari. Kami menerima pasien umum dan BPJS, menyediakan apotek mini, serta menjadwalkan imunisasi rutin sesuai jadwal Kemenkes. Pendaftaran dilakukan di loket atau lewat WhatsApp sebelum datang.",
        imageUrl:
          "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85",
        imageAlt: "Ruangan pemeriksaan klinik yang bersih dan rapi",
        imageNoteLabel: "Jam buka",
        imageNoteText: "Senin–Sabtu 08.00–20.00 · Minggu 08.00–14.00",
        stat1Number: "15+",
        stat1Label: "tahun melayani Kebayoran Baru",
        stat2Number: "12.000+",
        stat2Label: "kunjungan pasien per tahun",
        stat3Number: "3",
        stat3Label: "dokter tetap yang berpraktik",
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-layanan",
      componentType: "grid-container",
      name: "Layanan Klinik",
      props: { columns: "3", gap: "md" },
      styles: { padding: "xl", background: "muted" },
      children: [
        {
          id: "klinik-layanan-1",
          componentType: "card-feature",
          name: "Konsultasi Umum",
          props: {
            icon: "zap",
            eyebrow: "01 / Layanan",
            title: "Konsultasi dokter umum setiap hari.",
            description:
              "Pemeriksaan kesehatan, penanganan demam, dan rujukan dilayani 08.00–20.00 tanpa perlu janji di hari sebelumnya.",
            linkText: "Lihat jadwal",
            linkUrl: "#kontak",
          },
        },
        {
          id: "klinik-layanan-2",
          componentType: "card-feature",
          name: "Imunisasi Anak",
          props: {
            icon: "shield",
            eyebrow: "02 / Layanan",
            title: "Imunisasi rutin dan kejar sesuai kalender.",
            description:
              "BCG, DPT, campak, hingga imunisasi lanjutan sekolah. Vaksin disimpan sesuai standar rantai dingin dan dicatat di buku KIA.",
            linkText: "Cek jadwal imunisasi",
            linkUrl: "#kontak",
          },
        },
        {
          id: "klinik-layanan-3",
          componentType: "card-feature",
          name: "Tes Laboratorium",
          props: {
            icon: "chart",
            eyebrow: "03 / Layanan",
            title: "Cek darah, gula, kolesterol, dan urin.",
            description:
              "Pengambilan sampel setiap pagi, hasil umumnya keluar di hari yang sama dan dijelaskan dokter saat konsultasi.",
            linkText: "Lihat daftar pemeriksaan",
            linkUrl: "#kontak",
          },
        },
      ],
    },
    {
      id: "klinik-stats",
      componentType: "stats-banner",
      name: "Statistik Klinik",
      props: {
        eyebrow: "Kenapa banyak keluarga memilih kami",
        title: "Pelayanan yang tertib dan penjelasan yang sabar.",
        sectionBg: "primary",
        stats: [
          { value: "12.000", suffix: "+", label: "kunjungan pasien per tahun" },
          { value: "3", suffix: " dokter", label: "umum & gigi yang berpraktik" },
          { value: "98", suffix: "%", label: "pasien merekomendasikan kami" },
          { value: "15", suffix: " tahun", label: "melayani Kebayoran Baru" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-team",
      componentType: "team-grid",
      name: "Dokter Klinik",
      props: {
        eyebrow: "Tim medis",
        title: "Dokter yang hadir setiap hari, bukan bergantian tanpa jadwal.",
        description:
          "Ketiga dokter kami memiliki jadwal tetap dan saling berbagi catatan pasien sehingga pemeriksaan lanjutan tetap nyambung.",
        columns: "3",
        members: [
          { name: "dr. Rina Anggraini, Sp.PD", role: "Dokter Penyakit Dalam", initials: "RA", imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
          { name: "drg. Budi Hartono", role: "Dokter Gigi", initials: "BH", imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
          { name: "dr. Sari Wulandari", role: "Dokter Umum", initials: "SW", imageUrl: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80", socialUrl: "#" },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-testimoni",
      componentType: "testimonial-grid",
      name: "Testimoni Pasien",
      props: {
        eyebrow: "Kata pasien",
        title: "Catatan yang biasa kami terima di buku tamu.",
        description: "Kami membaca setiap saran pasien dan membahasnya dalam rapat tim setiap Senin pagi.",
        columns: "3",
        items: [
          { quote: "Anak saya diimunisasi rutin di sini. Jadwalnya tertib dan mereka ingat tanggal lanjutan tanpa kami harus bertanya.", name: "Ratna Dewi", role: "Warga Kebayoran Lama", initials: "RD" },
          { quote: "Dokter giginya menjelaskan sebelum tindakan, jadi tidak ada yang mendadak. Biayanya juga wajar.", name: "Farhan Maulana", role: "Karyawan swasta", initials: "FM" },
          { quote: "Pernah datang malam hari karena anak demam, tetap dilayani ramah. Pasien BPJS diproses lancar.", name: "Susi Amelia", role: "Ibu rumah tangga", initials: "SA" },
        ],
      },
      styles: { padding: "xl", background: "muted" },
    },
    {
      id: "klinik-faq",
      componentType: "faq-accordion",
      name: "FAQ Klinik",
      props: {
        eyebrow: "Pertanyaan umum",
        title: "Yang biasanya ditanyakan sebelum berkunjung.",
        description: "Jika jawabannya belum ada, hubungi kami lewat telepon atau WhatsApp.",
        items: [
          { question: "Jam buka klinik sampai jam berapa?", answer: "Senin–Sabtu 08.00–20.00 dan Minggu 08.00–14.00. Pendaftaran loket ditutup 30 menit sebelum jam tutup." },
          { question: "Apakah klinik menerima BPJS?", answer: "Ya. Pasien BPJS diterima untuk poli umum dan gigi. Bawa kartu BPJS aktif dan fotokopi KTP saat pendaftaran." },
          { question: "Apakah perlu membuat janji sebelum datang?", answer: "Tidak wajib, tapi kami sarankan daftar lewat WhatsApp di pagi hari agar dapat nomor antrean dan estimasi waktu tunggu." },
          { question: "Apakah tersedia rujukan ke rumah sakit?", answer: "Tersedia. Dokter kami menerbitkan surat rujukan ke RS Mitra Keluarga dan RS Fatmawati bila pemeriksaan lanjutan diperlukan." },
        ],
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-cta",
      componentType: "cta-basic",
      name: "Ajakan Konsultasi Klinik",
      props: {
        title: "Jadwalkan konsultasi hari ini, tanpa perlu menunggu giliran panjang.",
        description: "Telepon (021) 7590-8877 atau kirim pesan WhatsApp untuk mendaftar. Kami balas dalam 15 menit selama jam buka.",
        buttonText: "Jadwal konsultasi",
        buttonUrl: "tel:+622175908877",
        secondaryText: "Lihat layanan",
        secondaryUrl: "#layanan",
      },
      styles: { padding: "xl" },
    },
    {
      id: "klinik-footer",
      componentType: "footer-basic",
      name: "Footer Klinik",
      props: {
        brandName: "KLINIK SEHAT KELUARGA",
        tagline: "Praktek dokter umum & gigi di Jl. Melati Raya No. 12, Kebayoran Baru, Jakarta Selatan. Buka setiap hari.",
        link1Text: "Layanan",
        link1Url: "#layanan",
        link2Text: "Dokter",
        link2Url: "#dokter",
        link3Text: "(021) 7590-8877",
        link3Url: "tel:+622175908877",
        copyrightText: "© 2026 Klinik Sehat Keluarga. Pasien BPJS diterima.",
      },
      styles: { padding: "none" },
    },
  ];
}
